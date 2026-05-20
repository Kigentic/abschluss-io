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

const DEFAULT_COMPLAINT_SEEDS: readonly ComplaintSeed[] = [
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

type EnergyComplaintSeedInput = {
  avatarComplaintContext: string;
  avatarComplaintTopic: string;
  avatarComplaintType: string;
};

const ENERGY_COMPLAINT_SEED_INPUTS: readonly EnergyComplaintSeedInput[] = [
  { avatarComplaintTopic: "Stromrechnung trotz PV deutlich höher als erwartet", avatarComplaintContext: "die Stromrechnung liegt trotz PV-Anlage deutlich über den prognostizierten Werten", avatarComplaintType: "Wirtschaftlichkeitsenttäuschung" },
  { avatarComplaintTopic: "Wärmepumpe verbraucht im Winter extrem viel Strom", avatarComplaintContext: "die Wärmepumpe zieht im Winter deutlich mehr Strom als in der Beratung dargestellt", avatarComplaintType: "Betriebskosten-Schock" },
  { avatarComplaintTopic: "Speicher lädt oder entlädt nicht richtig", avatarComplaintContext: "der Speicher lädt und entlädt nicht zuverlässig und die Eigenverbrauchsquote bricht ein", avatarComplaintType: "Systemfunktion gestört" },
  { avatarComplaintTopic: "PV-App zeigt falsche oder unverständliche Daten an", avatarComplaintContext: "die App zeigt unklare oder widersprüchliche Werte und niemand erklärt die Daten verständlich", avatarComplaintType: "Transparenzproblem" },
  { avatarComplaintTopic: "Anlage produziert weniger Strom als versprochen", avatarComplaintContext: "die Anlage liefert seit Monaten spürbar weniger Ertrag als in der Verkaufspräsentation genannt", avatarComplaintType: "Leistungsabweichung" },
  { avatarComplaintTopic: "Wechselrichter fällt regelmäßig aus", avatarComplaintContext: "der Wechselrichter fällt wiederholt aus und verursacht Ertragsverluste", avatarComplaintType: "Technikausfall" },
  { avatarComplaintTopic: "Wärmepumpe ist viel zu laut", avatarComplaintContext: "die Wärmepumpe ist im Betrieb deutlich lauter als zugesagt und stört den Alltag", avatarComplaintType: "Komfortverlust" },
  { avatarComplaintTopic: "Förderungen wurden falsch beantragt oder nicht ausgezahlt", avatarComplaintContext: "bei der Förderung wurden Angaben falsch eingereicht oder Zahlungen bleiben aus", avatarComplaintType: "Förderabwicklung fehlerhaft" },
  { avatarComplaintTopic: "Kommunikation mit dem Installateur bricht nach Verkauf ab", avatarComplaintContext: "nach dem Abschluss ist der Installateur kaum erreichbar und Rückmeldungen bleiben aus", avatarComplaintType: "Serviceabriss" },
  { avatarComplaintTopic: "Wallbox lädt das Auto nicht zuverlässig", avatarComplaintContext: "die Wallbox lädt das Fahrzeug unregelmäßig oder bricht den Ladevorgang ab", avatarComplaintType: "Nutzungsstörung" },
  { avatarComplaintTopic: "Energiespeicher verliert auffällig schnell Kapazität", avatarComplaintContext: "die nutzbare Speicherkapazität sinkt schneller als erwartet", avatarComplaintType: "Alterungs-/Qualitätsproblem" },
  { avatarComplaintTopic: "Heizung wird im Haus nicht richtig warm", avatarComplaintContext: "trotz laufender Anlage werden zentrale Bereiche des Hauses nicht richtig warm", avatarComplaintType: "Versorgungslücke" },
  { avatarComplaintTopic: "Räume haben unterschiedliche Temperaturen", avatarComplaintContext: "die Temperaturverteilung im Haus ist seit der Umrüstung stark unausgeglichen", avatarComplaintType: "Regelungsproblem" },
  { avatarComplaintTopic: "Warmwasser reicht plötzlich nicht mehr aus", avatarComplaintContext: "seit der Umstellung reicht das Warmwasser im Alltag nicht mehr aus", avatarComplaintType: "Komforteinschränkung" },
  { avatarComplaintTopic: "Schimmel oder Feuchtigkeit nach Umrüstung", avatarComplaintContext: "nach der Umrüstung treten Feuchtigkeit und erste Schimmelstellen auf", avatarComplaintType: "Folgeschadenrisiko" },
  { avatarComplaintTopic: "Dach wurde bei der PV-Montage beschädigt", avatarComplaintContext: "bei der PV-Montage sind am Dach Schäden entstanden, die nicht sauber geklärt wurden", avatarComplaintType: "Montageschaden" },
  { avatarComplaintTopic: "Stromausfall trotz installiertem Speicher", avatarComplaintContext: "bei Stromausfall übernimmt der Speicher die Versorgung nicht wie zugesagt", avatarComplaintType: "Ausfallsicherheitsproblem" },
  { avatarComplaintTopic: "Anlage funktioniert nicht im Notstrombetrieb", avatarComplaintContext: "der Notstrombetrieb funktioniert im Ernstfall nicht zuverlässig", avatarComplaintType: "Resilienzversagen" },
  { avatarComplaintTopic: "Smart-Home-/App-Steuerung funktioniert nicht stabil", avatarComplaintContext: "die Steuerung per App/Smart Home ist instabil und Befehle greifen unzuverlässig", avatarComplaintType: "Automationsproblem" },
  { avatarComplaintTopic: "Lange Wartezeiten bei Service oder Reparaturen", avatarComplaintContext: "Service- und Reparaturtermine dauern zu lange und Probleme bleiben offen", avatarComplaintType: "Serviceverzug" },
  { avatarComplaintTopic: "Keine Transparenz über tatsächliche Einsparungen", avatarComplaintContext: "es gibt keine nachvollziehbare Auswertung zu realen Einsparungen", avatarComplaintType: "Controlling-Lücke" },
  { avatarComplaintTopic: "Hohe Nachzahlungen durch falsche Planung der Wärmepumpe", avatarComplaintContext: "durch fehlerhafte Planung entstehen hohe Nachzahlungen bei Strom und Betrieb", avatarComplaintType: "Planungsfehler" },
  { avatarComplaintTopic: "Netzbetreiber-Probleme oder Einspeisung blockiert", avatarComplaintContext: "die Einspeisung ist durch Netzbetreiber-Themen blockiert und niemand steuert aktiv dagegen", avatarComplaintType: "Schnittstellenproblem" },
  { avatarComplaintTopic: "Fehlermeldungen in der App ohne Erklärung", avatarComplaintContext: "die App meldet regelmäßig Fehlercodes, die niemand verständlich erklärt", avatarComplaintType: "Support-/Dokulücke" },
  { avatarComplaintTopic: "Anlage wurde falsch dimensioniert (zu klein/zu groß)", avatarComplaintContext: "die Anlage ist nicht passend dimensioniert und verfehlt den tatsächlichen Bedarf", avatarComplaintType: "Auslegungsfehler" },
  { avatarComplaintTopic: "Hohe Finanzierungskosten trotz versprochener Ersparnis", avatarComplaintContext: "die Finanzierungskosten fressen die versprochenen Einsparungen weitgehend auf", avatarComplaintType: "Wirtschaftlichkeitsbruch" },
  { avatarComplaintTopic: "Kombination aus PV, Speicher und Wärmepumpe arbeitet nicht sauber zusammen", avatarComplaintContext: "PV, Speicher und Wärmepumpe laufen nicht sauber im Verbund und erzeugen Ineffizienz", avatarComplaintType: "Systemintegration fehlerhaft" },
  { avatarComplaintTopic: "Handwerker hinterlassen Baustelle oder Schäden", avatarComplaintContext: "nach der Installation bleiben Baustellenmängel oder Schäden offen", avatarComplaintType: "Ausführungsqualität unzureichend" },
  { avatarComplaintTopic: "Ertragseinbruch durch Verschattung wurde vorher nicht erwähnt", avatarComplaintContext: "spürbare Verschattung senkt den Ertrag deutlich, obwohl das im Vorfeld nicht transparent war", avatarComplaintType: "Beratungs-/Planungslücke" },
  { avatarComplaintTopic: "Gewerbebetrieb hat Lastspitzen trotz Energiesystem nicht im Griff", avatarComplaintContext: "im Gewerbebetrieb bleiben Lastspitzen trotz Systeminvestition hoch", avatarComplaintType: "Lastmanagementversagen" },
  { avatarComplaintTopic: "Produktionsausfälle durch Stromprobleme", avatarComplaintContext: "Stromprobleme führen im Betrieb zu Produktionsunterbrechungen", avatarComplaintType: "Betriebsunterbrechung" },
  { avatarComplaintTopic: "Lastmanagement der Wallboxen funktioniert nicht", avatarComplaintContext: "das Lastmanagement der Wallboxen verteilt Leistung nicht stabil", avatarComplaintType: "Ladeinfrastrukturproblem" },
  { avatarComplaintTopic: "Zu geringe Leistung für Maschinen/Fuhrpark", avatarComplaintContext: "die verfügbare Leistung reicht für Maschinen oder Fuhrpark nicht aus", avatarComplaintType: "Leistungsunterdimensionierung" },
  { avatarComplaintTopic: "Peak-Shaving funktioniert nicht wie verkauft", avatarComplaintContext: "Peak-Shaving liefert nicht die dargestellten Effekte auf Lastspitzen", avatarComplaintType: "Leistungsversprechen verfehlt" },
  { avatarComplaintTopic: "Energiekosten sinken kaum trotz hoher Investition", avatarComplaintContext: "die Energiekosten sinken trotz hoher Investition nur minimal", avatarComplaintType: "ROI-Enttäuschung" },
  { avatarComplaintTopic: "Fehlende Fernwartung oder Monitoring", avatarComplaintContext: "Fernwartung und Monitoring sind nicht zuverlässig verfügbar", avatarComplaintType: "Betriebsführungsdefizit" },
  { avatarComplaintTopic: "Brandschutz-/Versicherungsprobleme nach Installation", avatarComplaintContext: "nach Installation gibt es offene Brandschutz- oder Versicherungsauflagen", avatarComplaintType: "Compliance-Risiko" },
  { avatarComplaintTopic: "Zu lange Amortisationszeit im Vergleich zur Verkaufspräsentation", avatarComplaintContext: "die realistische Amortisationszeit liegt deutlich über der Verkaufsaussage", avatarComplaintType: "Kalkulationsabweichung" },
  { avatarComplaintTopic: "Speicher überhitzt im Technikraum", avatarComplaintContext: "der Speicher zeigt kritische Temperaturen im Technikraum", avatarComplaintType: "Betriebssicherheitsrisiko" },
  { avatarComplaintTopic: "Komplizierte Bedienung für Mitarbeiter oder Hausverwaltung", avatarComplaintContext: "die Bedienung ist für Mitarbeiter oder Hausverwaltung zu komplex und fehleranfällig", avatarComplaintType: "Usability-/Schulungsproblem" },
];

const ENERGY_COMPLAINT_SEEDS: readonly ComplaintSeed[] = ENERGY_COMPLAINT_SEED_INPUTS.map(
  (seed) => ({
    ...seed,
    avatarComplaintGoal:
      "eine verbindliche, terminsichere Lösung mit klarer Verantwortung und transparenter Nachverfolgung",
    avatarComplaintHistory:
      "hat bereits mehrfach nachgehakt, aber nur Teilantworten oder wechselnde Zuständigkeiten erhalten",
    avatarInnerAmplifiers: [
      "fühlt sich nach der Investition mit dem Problem allein gelassen",
      "zweifelt an den ursprünglichen Leistungs- und Einsparzusagen",
    ],
    avatarLifeContext:
      "steht unter hohem Entscheidungsdruck zwischen Kosten, Betriebssicherheit und Alltagstauglichkeit",
    avatarMembershipContext:
      "ist Bestandskunde und erwartet professionellen Service über den Verkauf hinaus",
  })
);

function getComplaintSeedsForIndustry(industryKey: IndustryKey) {
  if (industryKey === "energy") {
    return ENERGY_COMPLAINT_SEEDS;
  }

  return DEFAULT_COMPLAINT_SEEDS;
}

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
  industryKey: IndustryKey;
  previousAvatar?: ComplaintAvatarSnapshot | null;
}) {
  const seed = getRandomItem(getComplaintSeedsForIndustry(params.industryKey));
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
