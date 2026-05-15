import type { IndustryKey } from "@/lib/industries";
import { automotivePromptConfig } from "@/lib/prompts/industries/automotive";
import { energyPromptConfig } from "@/lib/prompts/industries/energy";
import { fitnessPromptConfig } from "@/lib/prompts/industries/fitness";
import { insurancePromptConfig } from "@/lib/prompts/industries/insurance";
import { physioPromptConfig } from "@/lib/prompts/industries/physio";
import type { IndustryPromptConfig } from "@/lib/prompts/types";

const PROMPT_CONFIG_BY_INDUSTRY: Record<IndustryKey, IndustryPromptConfig> = {
  automotive: automotivePromptConfig,
  energy: energyPromptConfig,
  fitness: fitnessPromptConfig,
  insurance: insurancePromptConfig,
  physio: physioPromptConfig,
};

export function getIndustryPromptConfig(industryKey: IndustryKey) {
  return PROMPT_CONFIG_BY_INDUSTRY[industryKey];
}
