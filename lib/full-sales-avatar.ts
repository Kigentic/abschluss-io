import type { IndustryKey } from "@/lib/industries";
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

export type FullSalesAvatarCore = SimulationAvatarProfile & {
  avatarEmotionalTone: string;
  avatarGoal: string;
  avatarLifeStage: string;
  avatarName: string;
  avatarPrimaryProblem: string;
  avatarProfessionOrContext: string;
  avatarSecondaryContext: string;
};

export type FullSalesAvatarCandidate = {
  avatarAge: number;
  avatarEmotionalTone: string;
  avatarGender: "male" | "female" | "diverse";
  avatarGoal: string;
  avatarLifeStage: string;
  avatarName: string;
  avatarPrimaryProblem: string;
  avatarProfessionOrContext: string;
  avatarSecondaryContext: string;
  openingMessage: string;
};

export type FullSalesAvatarSnapshot = FullSalesAvatarCore & {
  createdAt: string;
  id: string;
  industryKey: IndustryKey;
  openingMessage: string;
  organizationId: string | null;
  previousAvatarSnapshotId: string | null;
  sessionId: string;
  userId: string;
};

export type FullSalesAvatarPromptContext = {
  currentAvatar: FullSalesAvatar | FullSalesAvatarSnapshot;
  previousAvatar?: FullSalesAvatar | FullSalesAvatarSnapshot | null;
};

export type FullSalesAvatar = FullSalesAvatarCore & {
  openingMessage: string;
};

export type FullSalesAvatarSelection = {
  avatar: FullSalesAvatar;
  comparison: SimulationAvatarDifference | null;
};

function getRandomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildOpeningMessage(avatar: FullSalesAvatar) {
  const objectionHint = avatar.avatarObjections
    .slice(0, 2)
    .map((entry) => formatObjectionType(entry).toLowerCase())
    .join(" und ");

  if (avatar.avatarDifficulty === "easy") {
    return `Hallo, ich bin ${avatar.avatarName}. Ich schaue mich um, weil ${avatar.avatarPrimaryProblem.toLowerCase()}. Grundsaetzlich bin ich offen, will aber verstehen, ob das diesmal wirklich zu mir passt.`;
  }

  if (avatar.avatarDifficulty === "medium") {
    return `Hi, ${avatar.avatarName} hier. ${avatar.avatarPrimaryProblem} ist gerade wirklich ein Thema, aber ich bin noch unsicher, ob ich das diesmal sauber umsetze und ob das in meinen Alltag passt.`;
  }

  if (avatar.avatarDifficulty === "hard") {
    return `Hallo, ${avatar.avatarName} hier. Ich schaue zwar nach einer Loesung fuer ${avatar.avatarPrimaryProblem.toLowerCase()}, aber ehrlich gesagt bin ich bei ${objectionHint || "dem Ganzen"} ziemlich skeptisch.`;
  }

  return `Hallo, ich bin ${avatar.avatarName}. Ich will direkt ehrlich sein: ${avatar.avatarPrimaryProblem} nervt mich zwar, aber ich bin gerade kaum ueberzeugt, dass so ein Gespraech fuer mich wirklich etwas veraendert.`;
}

export function selectFullSalesAvatar(params: {
  candidates: readonly FullSalesAvatarCandidate[];
  difficulty: SessionDifficulty;
  previousAvatar?: FullSalesAvatarSnapshot | null;
}): FullSalesAvatarSelection {
  const scenarioSeed = getRandomItem(params.candidates);
  const selection = selectDiverseSimulationAvatarProfile({
    module: "full_sales",
    previousAvatar: params.previousAvatar ?? null,
    preferredDifficulty: params.difficulty,
  });
  const avatarName = maybeUseAlternativeName(
    selection.profile.avatarGender,
    pickAvatarName(selection.profile.avatarGender)
  );
  const avatar = {
    ...selection.profile,
    avatarEmotionalTone: scenarioSeed.avatarEmotionalTone,
    avatarGoal: scenarioSeed.avatarGoal,
    avatarLifeStage: scenarioSeed.avatarLifeStage,
    avatarName,
    avatarPrimaryProblem: scenarioSeed.avatarPrimaryProblem,
    avatarProfessionOrContext: scenarioSeed.avatarProfessionOrContext,
    avatarSecondaryContext: scenarioSeed.avatarSecondaryContext,
    openingMessage: "",
  } satisfies FullSalesAvatar;

  avatar.openingMessage = buildOpeningMessage(avatar);

  return {
    avatar,
    comparison: selection.comparison,
  };
}

function formatAvatarSummaryLines(avatar: FullSalesAvatar | FullSalesAvatarSnapshot) {
  return [
    `- Name: ${avatar.avatarName}`,
    getProfileSummaryLines(avatar),
    `- Lebensphase / Rolle: ${avatar.avatarLifeStage}`,
    `- Beruf / Kontext: ${avatar.avatarProfessionOrContext}`,
    `- Hauptproblem: ${avatar.avatarPrimaryProblem}`,
    `- Sekundaerer Kontext: ${avatar.avatarSecondaryContext}`,
    `- Ziel: ${avatar.avatarGoal}`,
    `- Emotionaler Ton: ${avatar.avatarEmotionalTone}`,
  ].join("\n");
}

export function buildFullSalesAvatarPrompt(
  context?: FullSalesAvatarPromptContext | null
) {
  if (!context) {
    return "";
  }

  const currentAvatar = context.currentAvatar;
  const blocks = [
    `AVATAR-VORGABE FUER DIESE SESSION:
Bleibe exakt bei diesem Interessentenprofil. Erfinde keinen aehnlichen Ersatz und wechsle weder Alter, Lebensphase, Problem noch Motivation.

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
- Wahrscheinliche Einwaende: ${currentAvatar.avatarObjections
      .map((entry) => formatObjectionType(entry))
      .join(", ")}

Die Difficulty muss sich konkret auf Offenheit, Widerstand, Geduld, Gespraechsabbruchneigung, Bullshit-Bingo-Empfindlichkeit und Abschlusswahrscheinlichkeit auswirken.
Der Disc-Typ und die Einwaende muessen sich spuerbar im Verhalten zeigen.`,
  ];

  blocks.push(`DIFFICULTY-VERHALTEN (VERBINDLICH):
- easy: kooperativ bleiben, kurze subtile Regieanweisungen nur selten.
- medium: spuerbar mehr Unsicherheit/Zoegern/Skepsis, Regieanweisungen regelmaessiger, mindestens eine vertiefende Rueckfrage.
- hard: deutlich skeptischer und emotionaler, vergleicht Alternativen, challenged schwache Claims (Preis, Vertrauen, Differenzierung, Dringlichkeit), Regieanweisungen haeufig aber kurz.
- Pro Kundenantwort maximal eine kursiv gesetzte Regieanweisung und nur wenn sie natuerlich passt.`);

  if (context.previousAvatar) {
    const difference = calculateSimulationAvatarDifference(
      context.previousAvatar,
      currentAvatar
    );

    blocks.push(`AVATAR-MEMORY ZUR ABGRENZUNG:
Der zuletzt verwendete Avatar war:

${formatAvatarSummaryLines(context.previousAvatar)}

Der neue Avatar wurde bewusst als Gegenpol ausgewaehlt.
- Zielwert ist eine spuerbare Abweichung von rund 70 Prozent.
- Bereits bewusst veraenderte Profil-Dimensionen: ${describeDifferenceDimensions(
        difference
      )}.
- Uebernimm nicht dieselbe Grundfigur mit nur leicht geaendertem Detail.`);
  }

  return blocks.join("\n\n");
}
