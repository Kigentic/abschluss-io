import type { IndustryKey } from "@/lib/industries";
import type { ComplaintChannelOption } from "@/lib/training-session-config";
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

export type ComplaintAvatarCore = SimulationAvatarProfile & {
  avatarChannel: ComplaintChannelOption;
  avatarComplaintContext: string;
  avatarComplaintGoal: string;
  avatarComplaintHistory: string;
  avatarComplaintTopic: string;
  avatarComplaintType: string;
  avatarEmotionalTone: string;
  avatarInnerAmplifiers: string[];
  avatarLifeContext: string;
  avatarMembershipContext: string;
  avatarName: string;
};

export type ComplaintAvatarCandidate = ComplaintAvatarCore & {
  openingMessage: string;
};

export type ComplaintAvatarSnapshot = ComplaintAvatarCore & {
  createdAt: string;
  id: string;
  industryKey: IndustryKey;
  openingMessage: string;
  organizationId: string | null;
  previousAvatarSnapshotId: string | null;
  sessionId: string;
  userId: string;
};

export type ComplaintAvatarPromptContext = {
  currentAvatar: ComplaintAvatarCandidate | ComplaintAvatarSnapshot;
  previousAvatar?: ComplaintAvatarCandidate | ComplaintAvatarSnapshot | null;
};

type ComplaintSeed = {
  avatarComplaintContext: string;
  avatarComplaintGoal: string;
  avatarComplaintHistory: string;
  avatarComplaintTopic: string;
  avatarComplaintType: string;
  avatarInnerAmplifiers: string[];
  avatarLifeContext: string;
  avatarMembershipContext: string;
};

type ComplaintAvatarSelection = {
  avatar: ComplaintAvatarCandidate;
  comparison: SimulationAvatarDifference | null;
};

const COMPLAINT_SEEDS: readonly ComplaintSeed[] = [
  {
    avatarComplaintContext:
      "der Monatsbeitrag wurde doppelt abgebucht und seitdem kam keine klare Rückmeldung",
    avatarComplaintGoal:
      "eine verbindliche Korrektur und das Gefühl, dass jemand das Thema wirklich übernimmt",
    avatarComplaintHistory:
      "hat bereits nachgehakt und nur ausweichende Standardantworten bekommen",
    avatarComplaintTopic: "Doppelte Abbuchung",
    avatarComplaintType: "organisatorische Enttäuschung",
    avatarInnerAmplifiers: [
      "fühlt sich mit Standardantworten abgespeist",
      "hat kaum Zeit für weiteren Orga-Aufwand",
    ],
    avatarLifeContext: "balanciert Beruf und privaten Alltag mit wenig Puffer",
    avatarMembershipContext:
      "ist eigentlich regelmäßig im Studio und erwartet saubere Prozesse",
  },
  {
    avatarComplaintContext:
      "mehrere Geräte sind seit Tagen außer Betrieb und stören die Trainingsroutine massiv",
    avatarComplaintGoal:
      "eine belastbare Aussage, wann sich wirklich etwas ändert",
    avatarComplaintHistory:
      "hat schon mehrfach gehört, dass sich jemand kümmert, ohne sichtbare Wirkung",
    avatarComplaintTopic: "Kaputte Geräte",
    avatarComplaintType: "leistungsbezogene Frustration",
    avatarInnerAmplifiers: [
      "zahlt vollen Beitrag für eingeschränkte Leistung",
      "trainiert mit engem Zeitfenster und klarer Routine",
    ],
    avatarLifeContext: "strukturiert den Alltag eng um fixe Trainingseinheiten herum",
    avatarMembershipContext:
      "nutzt vor allem die Fläche und bewertet das Studio stark über Verlässlichkeit",
  },
  {
    avatarComplaintContext:
      "es gab widerspruechliche Aussagen zu Vertrag und Zusatzkosten",
    avatarComplaintGoal:
      "klare Verantwortung und eine faire Klärung statt weiterer Ausreden",
    avatarComplaintHistory:
      "hat schon beim Abschluss nach Transparenz gefragt und fühlt sich jetzt getäuscht",
    avatarComplaintTopic: "Unklare Vertragskosten",
    avatarComplaintType: "Vertrauensbruch",
    avatarInnerAmplifiers: [
      "ist bei Geldthemen besonders sensibel",
      "hat schlechte Erfahrungen mit früheren Studios",
    ],
    avatarLifeContext: "muss finanzielle Entscheidungen gerade besonders sauber abwägen",
    avatarMembershipContext:
      "ist noch nicht lange dabei und prüft, ob das Studio überhaupt passt",
  },
  {
    avatarComplaintContext:
      "mehrfach versprochene Rückrufe sind ausgeblieben und jede Person sagt etwas anderes",
    avatarComplaintGoal:
      "eine verbindliche Entscheidung statt weiterer Vertröstung",
    avatarComplaintHistory:
      "hat schon mehrere Kontakte hinter sich, ohne dass jemand sichtbar Ownership übernommen hat",
    avatarComplaintTopic: "Rückruf nie erfolgt",
    avatarComplaintType: "Kommunikationschaos",
    avatarInnerAmplifiers: [
      "fühlt sich herumgeschoben",
      "hat für solche Prozesse kaum Geduld",
    ],
    avatarLifeContext: "hat einen dichten Alltag und wenig Toleranz für Organisationsfehler",
    avatarMembershipContext:
      "war eigentlich loyal, denkt inzwischen aber über einen Absprung nach",
  },
];

function getRandomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildComplaintTone(profile: SimulationAvatarProfile) {
  const parts = [
    profile.avatarDifficulty === "easy"
      ? "noch kontrolliert"
      : profile.avatarDifficulty === "medium"
        ? "klar genervt"
        : profile.avatarDifficulty === "hard"
          ? "spürbar gereizt"
          : "nahe an Gesprächsabbruch",
    profile.avatarDiscType === "dominant"
      ? "druckvoll"
      : profile.avatarDiscType === "analytical"
        ? "kühl und prüfend"
        : profile.avatarDiscType === "steady"
          ? "empfindlich und verletzt"
          : "sprunghaft und wechselhaft",
  ];

  return parts.join(", ");
}

function buildOpeningMessage(avatar: ComplaintAvatarCandidate) {
  if (avatar.avatarDifficulty === "easy") {
    return `Guten Tag, hier ist ${avatar.avatarName}. Ich möchte ein Anliegen einmal sauber klären: ${avatar.avatarComplaintContext}.`;
  }

  if (avatar.avatarDifficulty === "medium") {
    return `Hallo, ${avatar.avatarName} hier. Ich spreche das jetzt nochmal an, weil ${avatar.avatarComplaintContext} und ich bisher keine wirklich klare Antwort bekommen habe.`;
  }

  if (avatar.avatarDifficulty === "hard") {
    return `${avatar.avatarName} hier. Ich sage es direkt: ${avatar.avatarComplaintContext} und langsam habe ich wirklich das Gefühl, dass mich hier niemand sauber ernst nimmt.`;
  }

  return `Hallo, hier ist ${avatar.avatarName}. Ehrlich gesagt bin ich kurz davor, das Gespräch gleich wieder zu beenden, weil ${avatar.avatarComplaintContext} und ich seit Längerem nur vertröstet werde.`;
}

export function selectComplaintAvatar(params: {
  channel: ComplaintChannelOption;
  difficulty: SessionDifficulty;
  previousAvatar?: ComplaintAvatarSnapshot | null;
}) {
  const seed = getRandomItem(COMPLAINT_SEEDS);
  const selection = selectDiverseSimulationAvatarProfile({
    module: "complaint_management",
    previousAvatar: params.previousAvatar ?? null,
    preferredDifficulty: params.difficulty,
  });
  const avatarName = maybeUseAlternativeName(
    selection.profile.avatarGender,
    pickAvatarName(selection.profile.avatarGender)
  );
  const avatar = {
    ...selection.profile,
    ...seed,
    avatarChannel: params.channel,
    avatarEmotionalTone: buildComplaintTone(selection.profile),
    avatarName,
    openingMessage: "",
  } satisfies ComplaintAvatarCandidate;

  avatar.openingMessage = buildOpeningMessage(avatar);

  return {
    avatar,
    comparison: selection.comparison,
  } satisfies ComplaintAvatarSelection;
}

function formatAvatarSummaryLines(
  avatar: ComplaintAvatarCandidate | ComplaintAvatarSnapshot
) {
  return [
    `- Name: ${avatar.avatarName}`,
    getProfileSummaryLines(avatar),
    `- Kanal: ${avatar.avatarChannel}`,
    `- Beschwerdetyp: ${avatar.avatarComplaintType}`,
    `- Beschwerdeanlass: ${avatar.avatarComplaintTopic}`,
    `- Konkreter Auslöser: ${avatar.avatarComplaintContext}`,
    `- Mitgliedskontext: ${avatar.avatarMembershipContext}`,
    `- Alltagskontext: ${avatar.avatarLifeContext}`,
    `- Frustrationsverstärker: ${avatar.avatarInnerAmplifiers.join("; ")}`,
    `- Vorgeschichte: ${avatar.avatarComplaintHistory}`,
    `- Erwartung an das Gespräch: ${avatar.avatarComplaintGoal}`,
    `- Emotionaler Ton: ${avatar.avatarEmotionalTone}`,
  ].join("\n");
}

export function buildComplaintAvatarPrompt(
  context?: ComplaintAvatarPromptContext | null
) {
  if (!context) {
    return "";
  }

  const currentAvatar = context.currentAvatar;
  const blocks = [
    `AVATAR-VORGABE FÜR DIESE BESCHWERDE-SESSION:
Bleibe exakt bei diesem Kundenprofil. Verändere weder Kanal, Beschwerdebild, Historie noch Temperament.

${formatAvatarSummaryLines(currentAvatar)}

- Berufssituation: ${formatJobSituation(currentAvatar.avatarJobSituation)}
- Familiensituation: ${formatFamilySituation(currentAvatar.avatarFamilySituation)}
- Zeitbudget: ${formatTimeBudget(currentAvatar.avatarTimeBudget)}
- Finanzieller Spielraum: ${formatFinancialBudget(currentAvatar.avatarFinancialBudget)}
- Disc-Typ: ${formatDiscType(currentAvatar.avatarDiscType)} (${getDiscPromptGuidance(
      currentAvatar.avatarDiscType
    )})
- Difficulty: ${currentAvatar.avatarDifficulty} (${getDifficultyPromptGuidance(
      currentAvatar.avatarDifficulty
    )})
- Typische Einwände und Friktionen: ${currentAvatar.avatarObjections
      .map((entry) => formatObjectionType(entry))
      .join(", ")}

Die Difficulty muss sich real zeigen in Geduld, Härte, Abbruchneigung, Vertrauen und Lösungswahrscheinlichkeit.
Der Disc-Typ muss Verhalten, Sprache und Reaktionstempo sichtbar prägen.`,
  ];

  if (context.previousAvatar) {
    const difference = calculateSimulationAvatarDifference(
      context.previousAvatar,
      currentAvatar
    );

    blocks.push(`AVATAR-MEMORY ZUR ABGRENZUNG:
Der letzte Beschwerde-Avatar war:

${formatAvatarSummaryLines(context.previousAvatar)}

Die neue Session wurde bewusst deutlich anders angelegt.
- Zielwert ist eine spürbare Abweichung von rund 70 Prozent.
- Bereits bewusst veränderte Profil-Dimensionen: ${describeDifferenceDimensions(
        difference
      )}.
- Wiederhole nicht denselben Grundkonflikt mit nur leicht veränderten Details.`);
  }

  return blocks.join("\n\n");
}
