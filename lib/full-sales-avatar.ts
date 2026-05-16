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

export type FullSalesAvatarHistoryEntry = {
  avatarAge: number;
  avatarGender: "male" | "female";
  avatarName: string;
  avatarProfessionOrContext: string;
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
    return `Hallo, ich bin ${avatar.avatarName}. Ich schaue mich um, weil ${avatar.avatarPrimaryProblem.toLowerCase()}. Grundsätzlich bin ich offen, will aber verstehen, ob das diesmal wirklich zu mir passt.`;
  }

  if (avatar.avatarDifficulty === "medium") {
    return `Hi, ${avatar.avatarName} hier. ${avatar.avatarPrimaryProblem} ist gerade wirklich ein Thema, aber ich bin noch unsicher, ob ich das diesmal sauber umsetze und ob das in meinen Alltag passt.`;
  }

  if (avatar.avatarDifficulty === "hard") {
    return `Hallo, ${avatar.avatarName} hier. Ich schaue zwar nach einer Lösung für ${avatar.avatarPrimaryProblem.toLowerCase()}, aber ehrlich gesagt bin ich bei ${objectionHint || "dem Ganzen"} ziemlich skeptisch.`;
  }

  return `Hallo, ich bin ${avatar.avatarName}. Ich will direkt ehrlich sein: ${avatar.avatarPrimaryProblem} nervt mich zwar, aber ich bin gerade kaum überzeugt, dass so ein Gespräch für mich wirklich etwas verändert.`;
}

export function selectFullSalesAvatar(params: {
  candidates: readonly FullSalesAvatarCandidate[];
  difficulty: SessionDifficulty;
  previousAvatar?: FullSalesAvatarSnapshot | null;
  sessionHistory?: FullSalesAvatarHistoryEntry[];
}): FullSalesAvatarSelection {
  const history = params.sessionHistory ?? [];
  const blockedNames = new Set(history.map((h) => h.avatarName));
  const blockedProfessions = new Set(history.map((h) => h.avatarProfessionOrContext));

  function tryBuildAvatar(): { avatar: FullSalesAvatar; comparison: SimulationAvatarDifference | null } {
    const selection = selectDiverseSimulationAvatarProfile({
      module: "full_sales",
      previousAvatar: params.previousAvatar ?? null,
      preferredDifficulty: params.difficulty,
    });
    const selectedGender = selection.profile.avatarGender;

    // PROBLEM 1: only use candidates that match the selected gender
    const genderMatchingCandidates = params.candidates.filter(
      (c) => c.avatarGender === selectedGender
    );
    const candidatePool =
      genderMatchingCandidates.length > 0 ? genderMatchingCandidates : params.candidates;

    // PROBLEM 2: exclude blocked names and scenarios from session history
    const availableCandidates = candidatePool.filter(
      (c) => !blockedNames.has(c.avatarName) && !blockedProfessions.has(c.avatarProfessionOrContext)
    );
    const effectiveCandidates = availableCandidates.length > 0 ? availableCandidates : candidatePool;

    const scenarioSeed = getRandomItem(effectiveCandidates);
    const avatarName = maybeUseAlternativeName(
      selectedGender,
      pickAvatarName(selectedGender)
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
    return { avatar, comparison: selection.comparison };
  }

  const first = tryBuildAvatar();

  // PROBLEM 2: age±5 + gender collision → retry once
  const hasAgeGenderCollision = history.some(
    (h) =>
      h.avatarGender === first.avatar.avatarGender &&
      Math.abs(h.avatarAge - first.avatar.avatarAge) <= 5
  );

  if (!hasAgeGenderCollision) {
    return { avatar: first.avatar, comparison: first.comparison };
  }

  const second = tryBuildAvatar();
  return { avatar: second.avatar, comparison: second.comparison };
}

function formatAvatarSummaryLines(avatar: FullSalesAvatar | FullSalesAvatarSnapshot) {
  return [
    `- Name: ${avatar.avatarName}`,
    getProfileSummaryLines(avatar),
    `- Lebensphase / Rolle: ${avatar.avatarLifeStage}`,
    `- Beruf / Kontext: ${avatar.avatarProfessionOrContext}`,
    `- Hauptproblem: ${avatar.avatarPrimaryProblem}`,
    `- Sekundärer Kontext: ${avatar.avatarSecondaryContext}`,
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
    `AVATAR-VORGABE FÜR DIESE SESSION:
Bleibe exakt bei diesem Interessentenprofil. Erfinde keinen ähnlichen Ersatz und wechsle weder Alter, Lebensphase, Problem noch Motivation.

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
- Wahrscheinliche Einwände: ${currentAvatar.avatarObjections
      .map((entry) => formatObjectionType(entry))
      .join(", ")}

Die Difficulty muss sich konkret auf Offenheit, Widerstand, Geduld, Gesprächsabbruchneigung, Bullshit-Bingo-Empfindlichkeit und Abschlusswahrscheinlichkeit auswirken.
Der Disc-Typ und die Einwände müssen sich spürbar im Verhalten zeigen.`,
  ];

  blocks.push(`DIFFICULTY-VERHALTEN (VERBINDLICH):
- easy: kooperativ bleiben, kurze subtile Regieanweisungen nur selten.
- medium: spürbar mehr Unsicherheit/Zögern/Skepsis, Regieanweisungen regelmäßiger, mindestens eine vertiefende Rückfrage.
- hard: deutlich skeptischer und emotionaler, vergleicht Alternativen, challenged schwache Claims (Preis, Vertrauen, Differenzierung, Dringlichkeit), Regieanweisungen häufig aber kurz.
- Pro Kundenantwort maximal eine kursiv gesetzte Regieanweisung und nur wenn sie natürlich passt.`);

  if (context.previousAvatar) {
    const difference = calculateSimulationAvatarDifference(
      context.previousAvatar,
      currentAvatar
    );

    blocks.push(`AVATAR-MEMORY ZUR ABGRENZUNG:
Der zuletzt verwendete Avatar war:

${formatAvatarSummaryLines(context.previousAvatar)}

Der neue Avatar wurde bewusst als Gegenpol ausgewählt.
- Zielwert ist eine spürbare Abweichung von rund 70 Prozent.
- Bereits bewusst veränderte Profil-Dimensionen: ${describeDifferenceDimensions(
        difference
      )}.
- Übernimm nicht dieselbe Grundfigur mit nur leicht geändertem Detail.`);
  }

  return blocks.join("\n\n");
}
