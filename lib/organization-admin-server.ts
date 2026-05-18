import {
  getServiceRoleClientInitError,
  getSupabaseServerClient,
  getSupabaseServerClientInitError,
  getSupabaseServiceRoleClient,
  type SupabaseServerClient,
} from "@/lib/supabase-server";
import { resolveAppAccessStateForUser } from "@/lib/copecart-subscriptions";
import { logSystemEvent } from "@/lib/system-monitoring";

type MembershipRecord = {
  organization_id: string;
  role_in_org: string;
  organizations: {
    id: string;
    industry_key: string | null;
    industry_locked: boolean | null;
    is_active: boolean;
    organization_name: string;
    prompt_profile_key: string | null;
    seat_limit: number;
  } | null;
};

type ProfileRecord = {
  is_active: boolean;
  role: string | null;
};

type OrganizationAdminAuthSuccess = {
  membership: MembershipRecord;
  serviceRoleClient: SupabaseServerClient;
  supabase: SupabaseServerClient;
  userId: string;
};

type OrganizationAdminAuthFailure = {
  error: string;
  status: number;
};

export type OrganizationAdminAuthResult =
  | OrganizationAdminAuthFailure
  | OrganizationAdminAuthSuccess;

function normalizeEmail(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase();
}

export async function requireOrganizationAdmin(
  authorizationHeader: string | null
): Promise<OrganizationAdminAuthResult> {
  const accessToken = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.slice("Bearer ".length)
    : undefined;

  if (!accessToken) {
    return {
      error: "Nicht autorisiert.",
      status: 401,
    };
  }

  const supabase = getSupabaseServerClient(accessToken);
  const serviceRoleClient = getSupabaseServiceRoleClient();

  if (!supabase || !serviceRoleClient) {
    const errorMessage =
      getSupabaseServerClientInitError() ??
      getServiceRoleClientInitError() ??
      "Supabase Server Client konnte nicht initialisiert werden.";

    await logSystemEvent({
      forceNotify: true,
      message: "Organization admin auth could not initialize Supabase clients",
      metadata: {
        error: errorMessage,
      },
      severity: "critical",
      source: "auth",
    });

    return {
      error: errorMessage,
      status: 500,
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Nicht autorisiert.",
      status: 401,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, is_active")
    .eq("id", user.id)
    .maybeSingle<ProfileRecord>();

  if (profileError) {
    await logSystemEvent({
      message: "Organization admin profile lookup failed",
      metadata: {
        error: profileError.message,
        userId: user.id,
      },
      severity: "error",
      source: "auth",
    });

    return {
      error: profileError.message,
      status: 500,
    };
  }

  if (!profile?.is_active) {
    return {
      error: "Dieser Account ist derzeit deaktiviert.",
      status: 403,
    };
  }

  const isPrimaryPlatformAdmin = normalizeEmail(user.email) === "io@abschluss-io.de";
  let isMasterAdmin = profile.role === "master_admin";

  if (!isMasterAdmin && isPrimaryPlatformAdmin) {
    const { data: promotedProfile, error: promoteError } = await serviceRoleClient
      .from("profiles")
      .update({ role: "master_admin", is_active: true })
      .eq("id", user.id)
      .select("role, is_active")
      .maybeSingle<ProfileRecord>();

    if (promoteError) {
      return {
        error: promoteError.message,
        status: 500,
      };
    }

    isMasterAdmin = promotedProfile?.role === "master_admin";
  }

  if (!isMasterAdmin) {
    const accessState = await resolveAppAccessStateForUser({
      serviceRoleClient,
      userId: user.id,
    });

    if (!accessState.allowed) {
      return {
        error: accessState.message,
        status: 403,
      };
    }
  }

  const membershipQuery = supabase
    .from("organization_members")
    .select(
      "organization_id, role_in_org, organizations!inner(id, organization_name, seat_limit, is_active, industry_key, prompt_profile_key, industry_locked)"
    )
    .eq("user_id", user.id);

  const { data: membership, error: membershipError } = await (isMasterAdmin
    ? membershipQuery.limit(1).maybeSingle<MembershipRecord>()
    : membershipQuery.eq("role_in_org", "admin").limit(1).maybeSingle<MembershipRecord>());

  if (membershipError) {
    await logSystemEvent({
      message: "Organization admin membership lookup failed",
      metadata: {
        error: membershipError.message,
        userId: user.id,
      },
      severity: "error",
      source: "auth",
    });

    return {
      error: membershipError.message,
      status: 500,
    };
  }

  if (!membership?.organizations && isPrimaryPlatformAdmin) {
    const { data: recoveredMembership, error: recoveredMembershipError } =
      await serviceRoleClient
        .from("organization_members")
        .select(
          "organization_id, role_in_org, organizations!inner(id, organization_name, seat_limit, is_active, industry_key, prompt_profile_key, industry_locked)"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle<MembershipRecord>();

    if (recoveredMembershipError) {
      return {
        error: recoveredMembershipError.message,
        status: 500,
      };
    }

    if (recoveredMembership?.organizations?.is_active) {
      return {
        membership: recoveredMembership,
        serviceRoleClient,
        supabase,
        userId: user.id,
      };
    }
  }

  if (!membership?.organizations) {
    return {
      error: "Kein Zugriff auf diese Organisations-Verwaltung.",
      status: 403,
    };
  }

  if (!membership.organizations.is_active) {
    return {
      error: "Diese Organisation ist derzeit deaktiviert.",
      status: 403,
    };
  }

  return {
    membership,
    serviceRoleClient,
    supabase,
    userId: user.id,
  };
}

export function isOrganizationAdminAuthFailure(
  result: OrganizationAdminAuthResult
): result is OrganizationAdminAuthFailure {
  return "status" in result;
}
