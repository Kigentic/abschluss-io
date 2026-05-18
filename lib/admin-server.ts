import {
  getServiceRoleClientInitError,
  getSupabaseServerClient,
  getSupabaseServerClientInitError,
  getSupabaseServiceRoleClient,
  type SupabaseServerClient,
} from "@/lib/supabase-server";
import { logSystemEvent } from "@/lib/system-monitoring";

type AdminProfile = {
  is_active: boolean;
  role: string | null;
};

type AdminAuthSuccess = {
  serviceRoleClient: SupabaseServerClient;
  supabase: SupabaseServerClient;
  userId: string;
};

type AdminAuthFailure = {
  error: string;
  status: number;
};

export type AdminAuthResult = AdminAuthFailure | AdminAuthSuccess;

function isFailure(result: AdminAuthResult): result is AdminAuthFailure {
  return "status" in result;
}

function normalizeEmail(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase();
}

export async function requireMasterAdmin(
  authorizationHeader: string | null
): Promise<AdminAuthResult> {
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
      message: "Master admin auth could not initialize Supabase clients",
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
    .maybeSingle<AdminProfile>();

  if (profileError) {
    await logSystemEvent({
      message: "Master admin profile lookup failed",
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

  const isMasterAdmin = profile.role === "master_admin";
  const isPrimaryPlatformAdmin = normalizeEmail(user.email) === "io@abschluss-io.de";

  if (!isMasterAdmin && isPrimaryPlatformAdmin) {
    const { data: promotedProfile, error: promoteError } = await serviceRoleClient
      .from("profiles")
      .update({ role: "master_admin", is_active: true })
      .eq("id", user.id)
      .select("role, is_active")
      .maybeSingle<AdminProfile>();

    if (promoteError) {
      return {
        error: promoteError.message,
        status: 500,
      };
    }

    if (promotedProfile?.role === "master_admin" && promotedProfile.is_active) {
      return {
        serviceRoleClient,
        supabase,
        userId: user.id,
      };
    }
  }

  if (!isMasterAdmin) {
    return {
      error: "Kein Zugriff auf diese Verwaltung.",
      status: 403,
    };
  }

  return {
    serviceRoleClient,
    supabase,
    userId: user.id,
  };
}

export function isAdminAuthFailure(
  result: AdminAuthResult
): result is AdminAuthFailure {
  return isFailure(result);
}
