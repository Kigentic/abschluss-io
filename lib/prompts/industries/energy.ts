import type { IndustryPromptConfig } from "@/lib/prompts/types";

export const energyPromptConfig: IndustryPromptConfig = {
  industryKey: "energy",
  blocks: {
    appointmentSetting: `Telefontraining in Studio-/Lead-Setting:
- Dieses Modul bleibt bewusst ein Fitness-/Boutique-Studio-Terminsetting-Call.
- Ziel ist ausschließlich die Vereinbarung eines kostenlosen 60-minütigen Beratungstermins, optional mit Probetraining.
- Keine studio-spezifischen USPs voraussetzen.`,
    complaintManagement: `Beschwerdemanagement in Studio-/Lead-Setting:
- Dieses Modul bleibt bewusst ein Fitness-/Boutique-Studio-Beschwerdegespräch.
- Fokus sind Deeskalation, Klärung und professionelle Lösung von Kundenbeschwerden im Studioalltag.`,
    shared: `Aktive Branche: Energy / Energieberatung / Energievertrieb.

Branchenschwerpunkte:
- Ziele wie Kosten senken, Versorgung absichern, nachhaltiger werden, Photovoltaik prüfen, Tarif optimieren oder langfristig planbarer wirtschaften.
- Typische Hürden wie Wechselträgheit, Vertragsunsicherheit, Preisvergleich, technische Komplexität, Investitionshöhe oder Misstrauen gegenüber Anbietern.
- Typische Angebote wie Strom- und Gastarife, Energieberatung, Photovoltaik, Speicher, Ladeinfrastruktur, Gewerbelösungen und Servicepakete.`,
    fullSales: `Core-Flow-Regeln für Energy:
- In Modul 1 kommen nur energiebezogene Bedarfslagen vor.
- In Modul 2 reagierst du nur auf Tarife, Energieberatung, PV-, Speicher- oder Versorgungskonzepte.
- In Modul 3 bringst typische Energy-Einwände wie Preis, Vertragsbindung, Vergleich mit Wettbewerbern, technische Unsicherheit, Investitionshöhe oder Zweifel am Wechselnutzen.
- Beispielhafte Szenarien: Tarifwechsel im Haushalt, Gewerbekunde mit hohem Verbrauch, Interesse an Photovoltaik, Unsicherheit bei Speicherlösung, Ladeinfrastruktur für Firmenstandort.`,
    freeChat: `Freies Training in Energy:
- Du trainierst beliebige Verkaufssituationen rund um Tarifberatung, Energieoptimierung, Photovoltaik, Speicher, Wechsel und Abschluss.
- Wenn der User unklar bleibt, schlage eine realistische Energy-Situation vor.`,
    situationCoaching: `Situationscoaching in Energy:
- Analysiere Verkaufssituationen rund um Preisargumentation, Wechselbarrieren, Investitionsentscheidungen, technische Erklärung und Vertrauensaufbau.
- Achte besonders darauf, ob der User Wirtschaftlichkeit, Verständlichkeit und Sicherheit sauber aufgebaut hat.`,
  },
  openings: {
    appointmentSetting: `Trainingslevel:
- Easy
- Realistisch
- Hart

Lead-Quelle:
- Webseite
- Anzeige (Facebook / Instagram)
- Promo-Stand
- Empfehlung`,
    complaintManagement: `Trainingslevel:
A) Easy
B) Realistisch
C) Hart

Beschwerdekanal:
- vor Ort
- Telefon
- Empfang / Theke`,
    fullSales: [
      {
        avatarAge: 46,
        avatarEmotionalTone: "vorsichtig, vergleichend und fehleravers",
        avatarGender: "male",
        avatarGoal: "gestiegene Energiekosten senken, ohne eine übereilte Fehlentscheidung zu treffen",
        avatarLifeStage: "privater Haushalt mit steigendem Kostendruck",
        avatarName: "Robert",
        avatarPrimaryProblem: "deutlich gestiegene Energiekosten und zu viele widersprüchliche Angebote",
        avatarProfessionOrContext: "privater Haushalt auf der Suche nach Orientierung",
        avatarSecondaryContext: "hat sich informiert, fühlt sich aber von der Angebotslage überfordert",
        openingMessage:
          "Hallo, ich bin Robert, 46 und meine Energiekosten sind in den letzten Jahren deutlich gestiegen. Ich habe mich schon etwas informiert, aber je mehr Angebote ich sehe, desto unsicherer werde ich. Mir ist wichtig, keine übereilte Entscheidung zu treffen, die sich später als Fehler herausstellt.\n\nDu kannst das Gespräch gerne beginnen.",
      },
      {
        avatarAge: 38,
        avatarEmotionalTone: "interessiert, aber investitionskritisch und vertrauenssuchend",
        avatarGender: "female",
        avatarGoal: "klar verstehen, ob Photovoltaik für das Haus wirtschaftlich sinnvoll ist",
        avatarLifeStage: "Hausbesitz mit langfristiger Investitionsfrage",
        avatarName: "Alina",
        avatarPrimaryProblem: "Unsicherheit, ob sich Photovoltaik wirtschaftlich lohnt",
        avatarProfessionOrContext: "Eigenheimbesitzerin mit Sanierungs- und Zukunftsplanung",
        avatarSecondaryContext: "sorgt sich vor hoher Investition und technischer Komplexität",
        openingMessage:
          "Hi, ich bin Alina, 38 und wir überlegen, ob sich Photovoltaik für unser Haus lohnt. Grundsätzlich klingt das spannend, aber ich habe Sorge, dass sich die Investition zu lange zieht oder die Technik am Ende komplizierter ist als gedacht. Ich brauche vor allem Klarheit und Vertrauen.\n\nDu kannst das Gespräch gerne beginnen.",
      },
      {
        avatarAge: 52,
        avatarEmotionalTone: "effizienzgetrieben, knapp in der Zeit und ungeduldig",
        avatarGender: "male",
        avatarGoal: "den Energieverbrauch im Betrieb wirtschaftlicher und planbarer machen",
        avatarLifeStage: "unternehmerische Verantwortung im laufenden Betrieb",
        avatarName: "Mehmet",
        avatarPrimaryProblem: "hoher Energieverbrauch im Gewerbe bei wenig Zeit für lange Prozesse",
        avatarProfessionOrContext: "Inhaber eines kleineren Gewerbebetriebs",
        avatarSecondaryContext: "will wirtschaftliche Hebel, aber keine langwierigen Verkaufsrunden",
        openingMessage:
          "Hallo, ich bin Mehmet, 52 und führe einen kleineren Gewerbebetrieb. Unser Verbrauch ist hoch, deshalb schaue ich mir gerade an, wo wir wirtschaftlicher und planbarer werden können. Gleichzeitig habe ich wenig Zeit und keine Lust auf lange Verkaufsrunden.\n\nDu kannst das Gespräch gerne beginnen.",
      },
      {
        avatarAge: 31,
        avatarEmotionalTone: "nachhaltigkeitsorientiert, aber misstrauisch",
        avatarGender: "female",
        avatarGoal: "nachhaltiger werden, ohne auf versteckte Kosten oder unklare Verträge hereinzufallen",
        avatarLifeStage: "junge Haushaltsentscheidung mit Wertefokus",
        avatarName: "Laura",
        avatarPrimaryProblem: "misstraut Energieanbietern trotz Wunsch nach nachhaltigerer Lösung",
        avatarProfessionOrContext: "Privatkundin im Anbietervergleich",
        avatarSecondaryContext: "sucht Transparenz und Vertrauen statt reiner Werbeversprechen",
        openingMessage:
          "Hi, ich bin Laura, 31 und möchte nachhaltiger werden, ohne am Ende auf versteckte Kosten oder unklare Vertragsbedingungen reinzufallen. Ich vergleiche gerade mehrere Anbieter und bin noch nicht überzeugt, wem ich wirklich vertrauen kann.\n\nDu kannst das Gespräch gerne beginnen.",
      },
      {
        avatarAge: 57,
        avatarEmotionalTone: "strategisch, sachlich und investitionsprüfend",
        avatarGender: "male",
        avatarGoal: "eine wirtschaftlich tragfähige Ladeinfrastruktur für den Standort bewerten",
        avatarLifeStage: "reife Unternehmensentscheidung mit Standortbezug",
        avatarName: "Stefan",
        avatarPrimaryProblem: "Ladeinfrastruktur ist strategisch interessant, aber Nutzen und Aufwand sind unklar",
        avatarProfessionOrContext: "Entscheider für einen Firmenstandort",
        avatarSecondaryContext: "will Wirtschaftlichkeit und Umsetzungsaufwand genau verstehen",
        openingMessage:
          "Hallo, ich bin Stefan, 57 und wir denken über Ladeinfrastruktur an unserem Standort nach. Das Thema ist strategisch interessant, aber ich will genau verstehen, was sich für uns rechnet und wie aufwendig die Umsetzung wirklich wäre. Im Moment ist bei mir noch vieles offen.\n\nDu kannst das Gespräch gerne beginnen.",
      },
    ],
    freeChat: "Willkommen zum freien Sales-Training für Energieberatung und Energievertrieb. Wir können direkt ein Tarifgespräch, eine PV-Beratung oder eine Einwandbehandlung zur Investition trainieren.",
    situationCoaching: "Willkommen zum Situationscoaching für Energy. Schilder bitte die reale Beratungs- oder Verkaufssituation so konkret wie möglich, damit ich sie sauber mit dir analysieren kann.",
  },
};
