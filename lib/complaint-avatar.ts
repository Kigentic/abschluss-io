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
      "der Monatsbeitrag wurde doppelt abgebucht und seitdem kam keine klare Rueckmeldung",
    avatarComplaintGoal:
      "eine verbindliche Korrektur und das Gefuehl, dass jemand das Thema wirklich uebernimmt",
    avatarComplaintHistory:
      "hat bereits nachgehakt und nur ausweichende Standardantworten bekommen",
    avatarComplaintTopic: "Doppelte Abbuchung",
    avatarComplaintType: "organisatorische Enttaeuschung",
    avatarInnerAmplifiers: [
      "fuehlt sich mit Standardantworten abgespeist",
      "hat kaum Zeit fuer weiteren Orga-Aufwand",
    ],
    avatarLifeContext: "balanciert Beruf und privaten Alltag mit wenig Puffer",
    avatarMembershipContext:
      "ist eigentlich regelmaessig im Studio und erwartet saubere Prozesse",
  },
  {
    avatarComplaintContext:
      "mehrere Geraete sind seit Tagen ausser Betrieb und stoeren die Trainingsroutine massiv",
    avatarComplaintGoal:
      "eine belastbare Aussage, wann sich wirklich etwas aendert",
    avatarComplaintHistory:
      "hat schon mehrfach gehoert, dass sich jemand kuemmert, ohne sichtbare Wirkung",
    avatarComplaintTopic: "Kaputte Geraete",
    avatarComplaintType: "leistungsbezogene Frustration",
    avatarInnerAmplifiers: [
      "zahlt vollen Beitrag fuer eingeschraenkte Leistung",
      "trainiert mit engem Zeitfenster und klarer Routine",
    ],
    avatarLifeContext: "strukturiert den Alltag eng um fixe Trainingseinheiten herum",
    avatarMembershipContext:
      "nutzt vor allem die Flaeche und bewertet das Studio stark ueber Verlaesslichkeit",
  },
  {
    avatarComplaintContext:
      "es gab widerspruechliche Aussagen zu Vertrag und Zusatzkosten",
    avatarComplaintGoal:
      "klare Verantwortung und eine faire Klaerung statt weiterer Ausreden",
    avatarComplaintHistory:
      "hat schon beim Abschluss nach Transparenz gefragt und fuehlt sich jetzt getaeuscht",
    avatarComplaintTopic: "Unklare Vertragskosten",
    avatarComplaintType: "Vertrauensbruch",
    avatarInnerAmplifiers: [
      "ist bei Geldthemen besonders sensibel",
      "hat schlechte Erfahrungen mit frueheren Studios",
    ],
    avatarLifeContext: "muss finanzielle Entscheidungen gerade besonders sauber abwaegen",
    avatarMembershipContext:
      "ist noch nicht lange dabei und prueft, ob das Studio ueberhaupt passt",
  },
  {
    avatarComplaintContext:
      "mehrfach versprochene Rueckrufe sind ausgeblieben und jede Person sagt etwas anderes",
    avatarComplaintGoal:
      "eine verbindliche Entscheidung statt weiterer Vertroestung",
    avatarComplaintHistory:
      "hat schon mehrere Kontakte hinter sich, ohne dass jemand sichtbar Ownership uebernommen hat",
    avatarComplaintTopic: "Rueckruf nie erfolgt",
    avatarComplaintType: "Kommunikationschaos",
    avatarInnerAmplifiers: [
      "fuehlt sich herumgeschoben",
      "hat fuer solche Prozesse kaum Geduld",
    ],
    avatarLifeContext: "hat einen dichten Alltag und wenig Toleranz fuer Organisationsfehler",
    avatarMembershipContext:
      "war eigentlich loyal, denkt inzwischen aber ueber einen Absprung nach",
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
          ? "spuerbar gereizt"
          : "nahe an Gespraechsabbruch",
    profile.avatarDiscType === "dominant"
      ? "druckvoll"
      : profile.avatarDiscType === "analytical"
        ? "kuehl und pruefend"
        : profile.avatarDiscType === "steady"
          ? "empfindlich und verletzt"
          : "sprunghaft und wechselhaft",
  ];

  return parts.join(", ");
}

function buildOpeningMessage(avatar: ComplaintAvatarCandidate) {
  if (avatar.avatarDifficulty === "easy") {
    return `Guten Tag, hier ist ${avatar.avatarName}. Ich moechte ein Anliegen einmal sauber klaeren: ${avatar.avatarComplaintContext}.`;
  }

  if (avatar.avatarDifficulty === "medium") {
    return `Hallo, ${avatar.avatarName} hier. Ich spreche das jetzt nochmal an, weil ${avatar.avatarComplaintContext} und ich bisher keine wirklich klare Antwort bekommen habe.`;
  }

  if (avatar.avatarDifficulty === "hard") {
    return `${avatar.avatarName} hier. Ich sage es direkt: ${avatar.avatarComplaintContext} und langsam habe ich wirklich das Gefuehl, dass mich hier niemand sauber ernst nimmt.`;
  }

  return `Hallo, hier ist ${avatar.avatarName}. Ehrlich gesagt bin ich kurz davor, das Gespraech gleich wieder zu beenden, weil ${avatar.avatarComplaintContext} und ich seit Laengerem nur vertroestet werde.`;
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
    `- Konkreter Ausloeser: ${avatar.avatarComplaintContext}`,
    `- Mitgliedskontext: ${avatar.avatarMembershipContext}`,
    `- Alltagskontext: ${avatar.avatarLifeContext}`,
    `- Frustrationsverstaerker: ${avatar.avatarInnerAmplifiers.join("; ")}`,
    `- Vorgeschichte: ${avatar.avatarComplaintHistory}`,
    `- Erwartung an das Gespraech: ${avatar.avatarComplaintGoal}`,
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
    `AVATAR-VORGABE FUER DIESE BESCHWERDE-SESSION:
Bleibe exakt bei diesem Kundenprofil. Veraendere weder Kanal, Beschwerdebild, Historie noch Temperament.

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
- Typische Einwaende und Friktionen: ${currentAvatar.avatarObjections
      .map((entry) => formatObjectionType(entry))
      .join(", ")}

Die Difficulty muss sich real zeigen in Geduld, Haerte, Abbruchneigung, Vertrauen und Loesungswahrscheinlichkeit.
Der Disc-Typ muss Verhalten, Sprache und Reaktionstempo sichtbar praegen.`,
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
- Zielwert ist eine spuerbare Abweichung von rund 70 Prozent.
- Bereits bewusst veraenderte Profil-Dimensionen: ${describeDifferenceDimensions(
        difference
      )}.
- Wiederhole nicht denselben Grundkonflikt mit nur leicht veraenderten Details.`);
  }

  return blocks.join("\n\n");
}
