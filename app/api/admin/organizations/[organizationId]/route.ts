import { NextResponse } from "next/server";

import { isAdminAuthFailure, requireMasterAdmin } from "@/lib/admin-server";
import {
  FRANCHISE_VERTICAL_KEYS,
  normalizeFranchiseVerticalKey,
  INDUSTRY_KEYS,
  normalizeIndustryKey,
} from "@/lib/industries";

type OrganizationRecord = {
  franchise_vertical: string | null;
  id: string;
  industry_key: string | null;
  industry_locked: boolean | null;
  prompt_profile_key: string | null;
};

type PatchRequestBody = {
  franchiseVertical?: string | null;
  industryKey?: string;
  industryLocked?: boolean;
  promptProfileKey?: string | null;
};

export async function DELETE(
  request: Request,
  context: { params: Promise<{ organizationId: string }> }
) {
  try {
    const adminAuth = await requireMasterAdmin(
      request.headers.get("authorization")
    );

    if (isAdminAuthFailure(adminAuth)) {
      return NextResponse.json(
        { error: adminAuth.error },
        { status: adminAuth.status }
      );
    }

    const { organizationId } = await context.params;

    const { data: organization, error: organizationError } =
      await adminAuth.serviceRoleClient
        .from("organizations")
        .select("id")
        .eq("id", organizationId)
        .maybeSingle<OrganizationRecord>();

    if (organizationError) {
      return NextResponse.json(
        { error: organizationError.message },
        { status: 500 }
      );
    }

    if (!organization) {
      return NextResponse.json(
        { error: "Organisation nicht gefunden." },
        { status: 404 }
      );
    }

    const { error: deleteError } = await adminAuth.serviceRoleClient
      .from("organizations")
      .delete()
      .eq("id", organizationId);

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      organizationId,
      success: true,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Organisation konnte nicht gelöscht werden.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ organizationId: string }> }
) {
  try {
    const adminAuth = await requireMasterAdmin(
      request.headers.get("authorization")
    );

    if (isAdminAuthFailure(adminAuth)) {
      return NextResponse.json(
        { error: adminAuth.error },
        { status: adminAuth.status }
      );
    }

    const { organizationId } = await context.params;
    const { franchiseVertical, industryKey, industryLocked, promptProfileKey } =
      (await request.json()) as PatchRequestBody;

    const { data: organization, error: organizationError } =
      await adminAuth.serviceRoleClient
        .from("organizations")
        .select("id, industry_key, prompt_profile_key, industry_locked, franchise_vertical")
        .eq("id", organizationId)
        .maybeSingle<OrganizationRecord>();

    if (organizationError) {
      return NextResponse.json(
        { error: organizationError.message },
        { status: 500 }
      );
    }

    if (!organization) {
      return NextResponse.json(
        { error: "Organisation nicht gefunden." },
        { status: 404 }
      );
    }

    const normalizedPromptProfileKey = promptProfileKey?.trim() || null;

    if (
      typeof industryKey === "string" &&
      !(INDUSTRY_KEYS as readonly string[]).includes(industryKey)
    ) {
      return NextResponse.json(
        { error: "industryKey ist ungueltig." },
        { status: 400 }
      );
    }

    const nextIndustryKey =
      typeof industryKey === "string"
        ? normalizeIndustryKey(industryKey)
        : normalizeIndustryKey(organization.industry_key);
    const normalizedFranchiseVertical =
      typeof franchiseVertical === "string"
        ? normalizeFranchiseVerticalKey(franchiseVertical)
        : null;

    const updatePayload: {
      franchise_vertical?: string | null;
      industry_key?: string;
      industry_locked?: boolean;
      prompt_profile_key?: string | null;
    } = {};

    if (typeof industryKey === "string") {
      updatePayload.industry_key = nextIndustryKey;
      if (nextIndustryKey !== "franchise") {
        updatePayload.franchise_vertical = null;
      }
    }

    if (typeof industryLocked === "boolean") {
      updatePayload.industry_locked = industryLocked;
    }

    if (promptProfileKey !== undefined) {
      updatePayload.prompt_profile_key = normalizedPromptProfileKey;
    }

    if (
      franchiseVertical !== undefined &&
      !(franchiseVertical === null || (FRANCHISE_VERTICAL_KEYS as readonly string[]).includes(franchiseVertical))
    ) {
      return NextResponse.json(
        { error: "franchiseVertical ist ungueltig." },
        { status: 400 }
      );
    }

    if (franchiseVertical !== undefined) {
      updatePayload.franchise_vertical =
        nextIndustryKey === "franchise"
          ? normalizedFranchiseVertical ?? normalizeFranchiseVerticalKey(organization.franchise_vertical)
          : null;
    }

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({
        franchiseVertical:
          nextIndustryKey === "franchise"
            ? normalizeFranchiseVerticalKey(organization.franchise_vertical)
            : null,
        industryKey: normalizeIndustryKey(organization.industry_key),
        industryLocked: organization.industry_locked ?? true,
        organizationId,
        promptProfileKey: organization.prompt_profile_key ?? null,
        success: true,
      });
    }

    const { data: updatedOrganization, error: updateError } =
      await adminAuth.serviceRoleClient
        .from("organizations")
        .update(updatePayload)
        .eq("id", organizationId)
        .select("id, industry_key, prompt_profile_key, industry_locked, franchise_vertical")
        .single<OrganizationRecord>();

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      franchiseVertical:
        normalizeIndustryKey(updatedOrganization.industry_key) === "franchise"
          ? normalizeFranchiseVerticalKey(updatedOrganization.franchise_vertical)
          : null,
      industryKey: normalizeIndustryKey(updatedOrganization.industry_key),
      industryLocked: updatedOrganization.industry_locked ?? true,
      organizationId,
      promptProfileKey: updatedOrganization.prompt_profile_key ?? null,
      success: true,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Organisation konnte nicht aktualisiert werden.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
