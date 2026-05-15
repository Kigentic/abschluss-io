import type { AppointmentAvatarPromptContext } from "@/lib/appointment-setting-avatar";
import { buildAppointmentAvatarPrompt } from "@/lib/appointment-setting-avatar";
import type { IndustryKey } from "@/lib/industries";
import type { ComplaintAvatarPromptContext } from "@/lib/complaint-avatar";
import { buildComplaintAvatarPrompt } from "@/lib/complaint-avatar";
import type { FullSalesAvatarPromptContext } from "@/lib/full-sales-avatar";
import { buildFullSalesAvatarPrompt } from "@/lib/full-sales-avatar";
import { resolveSessionFlow, type StoredSessionType } from "@/lib/chat-session";
import { BASE_APPOINTMENT_SETTING_PROMPT } from "@/lib/prompts/base/appointment-setting";
import { BASE_COMPLAINT_MANAGEMENT_PROMPT } from "@/lib/prompts/base/complaint-management";
import { BASE_FREE_CHAT_PROMPT } from "@/lib/prompts/base/free-chat";
import { BASE_FULL_SALES_PROMPT } from "@/lib/prompts/base/full-sales";
import { BASE_SHARED_PROMPT } from "@/lib/prompts/base/shared";
import { BASE_SITUATION_COACHING_PROMPT } from "@/lib/prompts/base/situation-coaching";
import { getIndustryPromptConfig } from "@/lib/prompts/industries";

type GetSystemPromptParams = {
  appointmentAvatarContext?: AppointmentAvatarPromptContext | null;
  complaintAvatarContext?: ComplaintAvatarPromptContext | null;
  fullSalesAvatarContext?: FullSalesAvatarPromptContext | null;
  industryKey: IndustryKey;
  sessionId?: string;
  sessionTitle?: string | null;
  sessionType: StoredSessionType;
};

export function getSystemPrompt({
  appointmentAvatarContext,
  complaintAvatarContext,
  fullSalesAvatarContext,
  industryKey,
  sessionTitle,
  sessionType,
}: GetSystemPromptParams) {
  const flow = resolveSessionFlow(sessionType, sessionTitle);
  const industryConfig = getIndustryPromptConfig(industryKey);

  const promptParts = [BASE_SHARED_PROMPT, industryConfig.blocks.shared];

  switch (flow) {
    case "appointment_setting":
      promptParts.push(
        BASE_APPOINTMENT_SETTING_PROMPT,
        industryConfig.blocks.appointmentSetting
      );
      if (appointmentAvatarContext) {
        promptParts.push(buildAppointmentAvatarPrompt(appointmentAvatarContext));
      }
      break;
    case "complaint_management":
      promptParts.push(
        BASE_COMPLAINT_MANAGEMENT_PROMPT,
        industryConfig.blocks.complaintManagement
      );
      if (complaintAvatarContext) {
        promptParts.push(buildComplaintAvatarPrompt(complaintAvatarContext));
      }
      break;
    case "free_chat":
      promptParts.push(BASE_FREE_CHAT_PROMPT, industryConfig.blocks.freeChat);
      break;
    case "full_sales":
      promptParts.push(BASE_FULL_SALES_PROMPT, industryConfig.blocks.fullSales);
      if (fullSalesAvatarContext) {
        promptParts.push(buildFullSalesAvatarPrompt(fullSalesAvatarContext));
      }
      break;
    case "situation_coaching":
    default:
      promptParts.push(
        BASE_SITUATION_COACHING_PROMPT,
        industryConfig.blocks.situationCoaching
      );
      break;
  }

  return promptParts.join("\n\n");
}
