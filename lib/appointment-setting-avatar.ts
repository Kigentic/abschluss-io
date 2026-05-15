import type { AppointmentLeadSource } from "@/lib/training-session-config";
import {
  calculateSimulationAvatarDifference,
  describeDifferenceDimensions,
  formatDiscType,
  formatFamilySituation,
  formatFinancialBudget,
  formatJobSituation,
  formatObjectionType,
  formatTimeBudget,
  getDifficultyPromptGuidance,
  getDiscPromptGuidance,
  getProfileSummaryLines,
  maybeUseAlternativeName,
  pickAvatarName,
  selectDiverseSimulationAvatarProfile,
  type SessionDifficulty,
  type SimulationAvatarDifference,
  type SimulationAvatarProfile,
} from "@/lib/simulation-avatar";

export type AppointmentAvatar = SimulationAvatarProfile & {
  leadContext: string;
  leadGoal: string;
  leadName: string;
  leadSource: AppointmentLeadSource;
  leadTone: string;
  openingMessage: string;
};

export type AppointmentAvatarSnapshot = AppointmentAvatar & {
  createdAt: string;
  id: string;
  organizationId: string | null;
  previousAvatarSnapshotId: string | null;
  sessionId: string;
  userId: string;
};

export type AppointmentAvatarPromptContext = {
  currentAvatar: AppointmentAvatar | AppointmentAvatarSnapshot;
  previousAvatar?: AppointmentAvatar | AppointmentAvatarSnapshot | null;
};

type AppointmentSeed = {
  leadContext: string;
  leadGoal: string;
  leadSource: AppointmentLeadSource;
};

type AppointmentAvatarSelection = {
  avatar: AppointmentAvatar;
  comparison: SimulationAvatarDifference | null;
};

const APPOINTMENT_SEEDS: readonly AppointmentSeed[] = [
  {
    leadSource: "Webseite",
    leadContext:
      "hat sich ueber die Website eingetragen, weil das Thema Gesundheit und Alltagsenergie gerade wieder mehr Druck macht",
    leadGoal:
      "will herausfinden, ob ein Termin wirklich hilfreich ist oder nur der Einstieg in eine Verkaufsschleife",
  },
  {
    leadSource: "Anzeige",
    leadContext:
      "kam ueber eine Anzeige auf das Angebot und filtert gerade streng, was echte Substanz hat und was nur Marketing ist",
    leadGoal:
      "will schnell erkennen, ob sich ein Termin lohnt und ob der Nutzen fuer die eigene Situation konkret ist",
  },
  {
    leadSource: "Promo-Stand",
    leadContext:
      "hat die Nummer eher spontan am Promo-Stand dagelassen und erinnert sich nur teilweise an das urspruengliche Gespraech",
    leadGoal:
      "will verstehen, warum sich ein Termin jetzt konkret lohnt und ob das in die eigene Woche passt",
  },
  {
    leadSource: "Empfehlung",
    leadContext:
      "kam ueber eine Empfehlung, will aber trotzdem selbst pruefen, ob der Termin wirklich individuell passt",
    leadGoal:
      "will keine Standardberatung, sondern einen nachvollziehbaren Grund, warum das fuer die eigene Lage sinnvoll ist",
  },
];

function getRandomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildLeadTone(profile: SimulationAvatarProfile) {
  const parts = [
    profile.avatarDifficulty === "easy"
      ? "grundsaetzlich offen"
      : profile.avatarDifficulty === "medium"
        ? "vorsichtig interessiert"
        : profile.avatarDifficulty === "hard"
          ? "skeptisch und pruefend"
          : "extrem schwer zu binden",
    profile.avatarDiscType === "dominant"
      ? "direkt"
      : profile.avatarDiscType === "analytical"
        ? "sachlich"
        : profile.avatarDiscType === "steady"
          ? "zurueckhaltend"
          : "sprunghaft",
  ];

  if (
    profile.avatarTimeBudget === "very_limited" ||
    profile.avatarTimeBudget === "limited"
  ) {
    parts.push("zeitlich knapp");
  }

  return parts.join(", ");
}

function buildOpeningMessage(params: {
  leadName: string;
  profile: SimulationAvatarProfile;
}) {
  const { leadName, profile } = params;

  if (profile.avatarDifficulty === "easy") {
    return `Hallo, hier ist ${leadName}. Ich hatte mich eingetragen und wollte kurz verstehen, worum es bei dem Termin genau geht.`;
  }

  if (profile.avatarDifficulty === "medium") {
    return `Ja, hallo, ${leadName} hier. Ich hatte mich mal eingetragen, bin aber noch nicht sicher, ob so ein Termin fuer mich gerade wirklich Sinn macht.`;
  }

  if (profile.avatarDifficulty === "hard") {
    return `${leadName} hier. Ich habe nicht viel Zeit, also bitte direkt: Worum geht es genau und warum sollte ich dafuer jetzt einen Termin machen?`;
  }

  return `${leadName} hier. Ich sage direkt dazu: Ich bin bei sowas eher raus. Wenn das nur der naechste Standard-Pitch ist, koennen wir es auch kurz machen.`;
}

function buildAppointmentAvatar(params: {
  difficulty: SessionDifficulty;
  leadSource: AppointmentLeadSource;
  previousAvatar?: AppointmentAvatarSnapshot | null;
}): AppointmentAvatarSelection {
  const seed = getRandomItem(
    APPOINTMENT_SEEDS.filter((entry) => entry.leadSource === params.leadSource)
  );
  const selection = selectDiverseSimulationAvatarProfile({
    module: "appointment_setting",
    previousAvatar: params.previousAvatar ?? null,
    preferredDifficulty: params.difficulty,
  });
  const leadName = maybeUseAlternativeName(
    selection.profile.avatarGender,
    pickAvatarName(selection.profile.avatarGender)
  );

  return {
    avatar: {
      ...selection.profile,
      leadContext: seed.leadContext,
      leadGoal: seed.leadGoal,
      leadName,
      leadSource: params.leadSource,
      leadTone: buildLeadTone(selection.profile),
      openingMessage: buildOpeningMessage({
        leadName,
        profile: selection.profile,
      }),
    },
    comparison: selection.comparison,
  };
}

export function selectAppointmentAvatar(params: {
  difficulty: SessionDifficulty;
  leadSource: AppointmentLeadSource;
  previousAvatar?: AppointmentAvatarSnapshot | null;
}) {
  return buildAppointmentAvatar(params);
}

function formatAvatarSummaryLines(
  avatar: AppointmentAvatar | AppointmentAvatarSnapshot
) {
  return [
    `- Name: ${avatar.leadName}`,
    getProfileSummaryLines(avatar),
    `- Leadquelle: ${avatar.leadSource}`,
    `- Ausgangslage: ${avatar.leadContext}`,
    `- Ziel des Leads: ${avatar.leadGoal}`,
    `- Ton im Gespraech: ${avatar.leadTone}`,
  ].join("\n");
}

export function buildAppointmentAvatarPrompt(
  context?: AppointmentAvatarPromptContext | null
) {
  if (!context) {
    return "";
  }

  const currentAvatar = context.currentAvatar;
  const blocks = [
    `AKTIVE LEAD-VORGABE FUER DIESE SESSION:
Bleibe durchgehend bei diesem Lead-Kontext. Erfinde keinen anderen Einstieg, keine andere Ausgangslage und keinen anderen Grundkontakt.

${formatAvatarSummaryLines(currentAvatar)}

- Berufssituation praegt die Alltagshuerden: ${formatJobSituation(
      currentAvatar.avatarJobSituation
    )}
- Familiensituation praegt Verbindlichkeit und Prioritaeten: ${formatFamilySituation(
      currentAvatar.avatarFamilySituation
    )}
- Zeitbudget: ${formatTimeBudget(currentAvatar.avatarTimeBudget)}
- Finanzieller Spielraum: ${formatFinancialBudget(currentAvatar.avatarFinancialBudget)}
- Disc-Typ: ${formatDiscType(currentAvatar.avatarDiscType)} (${getDiscPromptGuidance(
      currentAvatar.avatarDiscType
    )})
- Difficulty: ${currentAvatar.avatarDifficulty} (${getDifficultyPromptGuidance(
      currentAvatar.avatarDifficulty
    )})
- Typische Einwaende: ${currentAvatar.avatarObjections
      .map((entry) => formatObjectionType(entry))
      .join(", ")}

Die Difficulty muss sich real zeigen in Offenheit, Geduld, Haerte der Einwaende, Bullshit-Bingo-Empfindlichkeit und Terminwahrscheinlichkeit.
Der Disc-Typ muss das Verhalten spuerbar praegen, nicht nur als Metadaten bestehen.`,
  ];

  if (context.previousAvatar) {
    const difference = calculateSimulationAvatarDifference(
      context.previousAvatar,
      currentAvatar
    );

    blocks.push(`AVATAR-MEMORY ZUR ABGRENZUNG:
Der letzte Lead-Avatar war:

${formatAvatarSummaryLines(context.previousAvatar)}

Der neue Avatar wurde bewusst deutlich anders gebaut.
- Zielwert ist eine spuerbare Abweichung von rund 70 Prozent.
- Bereits bewusst veraenderte Profil-Dimensionen: ${describeDifferenceDimensions(
        difference
      )}.
- Wiederhole nicht dieselbe Grundfigur mit nur kosmetischen Aenderungen.`);
  }

  return blocks.join("\n\n");
}
