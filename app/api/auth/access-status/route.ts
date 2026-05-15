import { NextResponse } from "next/server";

import {
  isFailure as isPaidAppAuthFailure,
  requirePaidAppUser,
  resolveAppAccessStateForUser,
} from "@/lib/copecart-subscriptions";
import {
  getServiceRoleClientInitError,
  getSupabaseServerClient,
  getSupabaseServerClientInitError,
  getSupabaseServiceRoleClient,
} from "@/lib/supabase-server";

export async function GET(request: Request) {
  const authorizationHeader = request.headers.get("authorization");
  const authResult = await requirePaidAppUser(authorizationHeader);

  if (!isPaidAppAuthFailure(authResult)) {
    return NextResponse.json({
      allowed: true,
      organizationId: null,
    });
  }

  if (authResult.status !== 403) {
    return NextResponse.json(
      { code: authResult.code, error: authResult.error },
      { status: authResult.status }
    );
  }

  const accessToken = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.slice("Bearer ".length)
    : undefined;

  if (!accessToken) {
    return NextResponse.json(
      { code: authResult.code, error: authResult.error },
      { status: authResult.status }
    );
  }

  const supabase = getSupabaseServerClient(accessToken);
  const serviceRoleClient = getSupabaseServiceRoleClient();

  if (!supabase || !serviceRoleClient) {
    return NextResponse.json(
      {
        code: authResult.code,
        error:
          getSupabaseServerClientInitError() ??
          getServiceRoleClientInitError() ??
          authResult.error,
      },
      { status: 500 }
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { code: authResult.code, error: authResult.error },
      { status: authResult.status }
    );
  }

  const accessState = await resolveAppAccessStateForUser({
    serviceRoleClient,
    userId: user.id,
  });

  return NextResponse.json(
    {
      allowed: accessState.allowed,
      code: accessState.code,
      error: accessState.message,
      organizationId: accessState.organizationId,
      subscriptionStatus: accessState.subscription?.subscription_status ?? null,
      usedLegacyFallback: accessState.usedLegacyFallback,
    },
    { status: accessState.allowed ? 200 : 403 }
  );
}
