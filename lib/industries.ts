import type { SupabaseServerClient } from "@/lib/supabase-server";

export const INDUSTRY_KEYS = [
  "fitness",
  "automotive",
  "insurance",
  "physio",
  "energy",
] as const;

export type IndustryKey = (typeof INDUSTRY_KEYS)[number];

export const DEFAULT_INDUSTRY_KEY: IndustryKey = "fitness";

export const INDUSTRY_LABELS: Record<IndustryKey, string> = {
  automotive: "Automotive",
  energy: "Energy",
  fitness: "Fitness",
  insurance: "Insurance",
  physio: "Physio",
};

export const INDUSTRY_OPTIONS = INDUSTRY_KEYS.map((industryKey) => ({
  label: INDUSTRY_LABELS[industryKey],
  value: industryKey,
})) as ReadonlyArray<{
  label: string;
  value: IndustryKey;
}>;

export type OrganizationIndustrySettings = {
  industry_key: string | null;
  industry_locked: boolean | null;
  prompt_profile_key: string | null;
};

export function isIndustryKey(value: string): value is IndustryKey {
  return (INDUSTRY_KEYS as readonly string[]).includes(value);
}

export function normalizeIndustryKey(value: string | null | undefined): IndustryKey {
  if (!value) {
    return DEFAULT_INDUSTRY_KEY;
  }

  return isIndustryKey(value) ? value : DEFAULT_INDUSTRY_KEY;
}

export function resolvePromptProfileKey(
  settings: Partial<OrganizationIndustrySettings> | null | undefined
) {
  const promptProfileKey = settings?.prompt_profile_key?.trim();

  if (promptProfileKey) {
    return promptProfileKey;
  }

  return normalizeIndustryKey(settings?.industry_key);
}

export function resolveIndustrySettings(
  settings: Partial<OrganizationIndustrySettings> | null | undefined
) {
  const industryKey = normalizeIndustryKey(settings?.industry_key);

  return {
    industryKey,
    industryLocked: settings?.industry_locked ?? true,
    promptProfileKey: resolvePromptProfileKey(settings),
  };
}

export async function getOrganizationIndustrySettings(
  supabase: SupabaseServerClient,
  organizationId: string | null
) {
  if (!organizationId) {
    return resolveIndustrySettings(null);
  }

  const { data, error } = await supabase
    .from("organizations")
    .select("industry_key, prompt_profile_key, industry_locked")
    .eq("id", organizationId)
    .maybeSingle<OrganizationIndustrySettings>();

  if (error) {
    throw new Error(error.message);
  }

  return resolveIndustrySettings(data);
}
