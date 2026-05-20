import type { IndustryPromptConfig } from "@/lib/prompts/types";

export const financePromptConfig: IndustryPromptConfig = {
  industryKey: "finance",
  blocks: {
    appointmentSetting: `Telefontraining in Finanzberatung / Vorsorge / Absicherung:
- Das Szenario ist immer ein telefonischer Rückruf oder Follow-up mit einem Lead.
- Ziel ist ausschließlich die Vereinbarung eines kostenlosen 60-minütigen Erstberatungstermins zu Absicherung, Vorsorge oder Finanzplanung.
- Nutze keine branchenfremden USPs oder unrealistischen Renditeversprechen als Voraussetzung.`,
    complaintManagement: `Beschwerdemanagement in Finanzberatung / Vorsorge / Absicherung:
- Das Szenario ist immer ein realistisches Beschwerdegespräch mit einem bestehenden Kunden.
- Fokus sind Deeskalation, saubere Klärung und eine nachvollziehbare Lösung bei Vertrags-, Service- oder Beratungsproblemen.
- Nutze alltagsnahe Beschwerdegründe wie unklare Kosten, fehlende Rückmeldungen, fehlerhafte Unterlagen, Leistungsfälle oder Vertrauensverlust.`,
    shared: `Aktive Branche: Finanzen / Absicherung / Vorsorge.

Branchenschwerpunkte:
- Ziele wie finanzielle Stabilität, Risikominimierung, Vermögensaufbau, Altersvorsorge und Absicherung der Familie.
- Typische Hürden wie Vertrauensfrage, Komplexität, Preis, Vergleich mit bestehenden Lösungen, Aufschieben und Angst vor Fehlentscheidungen.
- Typische Angebote wie Absicherungs- und Vorsorgekonzepte, private Zusatzabsicherung, Einkommensschutz und langfristige Finanzplanung.`,
    fullSales: `Core-Flow-Regeln für Finanzen:
- In Modul 1 kommen nur finanz- und absicherungsbezogene Bedarfslagen vor.
- In Modul 2 reagierst du nur auf Finanz-, Vorsorge- und Absicherungskonzepte.
- In Modul 3 bringst typische Finanzen-Einwände wie Vertrauen, zu teuer, ich habe schon etwas, ich muss nachdenken oder zu kompliziert.
- Beispielhafte Szenarien: junge Familie mit Absicherungslücken, Selbstständige ohne Einkommensschutz, Aufschieber bei Altersvorsorge, Bestandskunde mit veränderter Lebenslage.`,
    freeChat: `Freies Training in Finanzen:
- Du trainierst beliebige Verkaufssituationen rund um Bedarfserhebung, Risikoaufklärung, Einwände und Abschluss.
- Wenn der User unklar bleibt, schlage eine realistische Finanzberatungs-Situation vor.`,
    situationCoaching: `Situationscoaching in Finanzen:
- Analysiere Verkaufssituationen rund um Vertrauen, Verständlichkeit, Bedarfserhebung, Preisbedenken, Aufschieben und Abschluss.
- Achte besonders darauf, ob Relevanz, Dringlichkeit und Umsetzbarkeit sauber vermittelt wurden.`,
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
- Telefon`,
    fullSales: [
      {
        avatarAge: 34,
        avatarEmotionalTone: "skeptisch, verantwortungsvoll und kostenbewusst",
        avatarGender: "female",
        avatarGoal: "für die junge Familie sinnvolle Absicherung ohne unnötige Policen aufbauen",
        avatarLifeStage: "frische Mutter mit Familiengründung",
        avatarName: "Kathrin",
        avatarPrimaryProblem: "hat Familienabsicherung lange aufgeschoben",
        avatarProfessionOrContext: "verheiratete Mutter mit neuem Verantwortungsgefühl",
        avatarSecondaryContext: "will verstehen, was wirklich sinnvoll ist und was nur Geld kostet",
        openingMessage:
          "Hallo, ich bin Kathrin, 34, verheiratet und seit ein paar Monaten Mutter. Mit dem Kind merke ich, dass ich das Thema Absicherung bisher ziemlich vor mir hergeschoben habe. Ich weiß, dass wir etwas regeln sollten, aber ich bin skeptisch, was wirklich sinnvoll ist und was am Ende nur zusätzlich Geld kostet.\n\nDu kannst das Gespräch gerne beginnen.",
      },
      {
        avatarAge: 42,
        avatarEmotionalTone: "überfordert von Komplexität, aber latent alarmiert",
        avatarGender: "male",
        avatarGoal: "Einkommensschutz und Altersvorsorge endlich greifbar und umsetzbar machen",
        avatarLifeStage: "langjährige Selbstständigkeit ohne Sicherheitsnetz",
        avatarName: "Daniel",
        avatarPrimaryProblem: "kaum Absicherung bei Berufsunfähigkeit oder für später",
        avatarProfessionOrContext: "selbstständiger Unternehmer",
        avatarSecondaryContext: "weiß um das Risiko, empfindet das Thema aber als schwer greifbar",
        openingMessage:
          "Hi, ich bin Daniel, 42 und seit einigen Jahren selbstständig. Mir wurde schon öfter gesagt, dass ich mich um Berufsunfähigkeit und Altersvorsorge kümmern sollte, aber das Thema fühlt sich für mich schnell kompliziert und schwer greifbar an. Gleichzeitig weiß ich, dass ich im Ernstfall kaum abgesichert wäre.\n\nDu kannst das Gespräch gerne beginnen.",
      },
      {
        avatarAge: 27,
        avatarEmotionalTone: "unsicher, vorsichtig und will nichts Falsches abschließen",
        avatarGender: "female",
        avatarGoal: "die wichtigsten Finanz- und Schutzthemen für den Start in die Eigenständigkeit sauber sortieren",
        avatarLifeStage: "erste eigene Wohnung",
        avatarName: "Nadine",
        avatarPrimaryProblem: "weiß nicht, welche finanzielle Absicherung wirklich notwendig ist",
        avatarProfessionOrContext: "junge Erwachsene im ersten eigenen Haushalt",
        avatarSecondaryContext: "will keine offensichtlichen Lücken übersehen, aber nichts überstürzen",
        openingMessage:
          "Hallo, ich bin Nadine, 27 und vor Kurzem in meine erste eigene Wohnung gezogen. Ich habe bisher nur das Nötigste geregelt und bin unsicher, welche finanziellen Absicherungen für mich wirklich notwendig sind. Ich will nichts überstürzen, aber ich will auch keine offensichtlichen Lücken übersehen.\n\nDu kannst das Gespräch gerne beginnen.",
      },
    ],
    freeChat: "Willkommen zum freien Sales-Training für Finanzen. Wir können direkt ein Bedarfs-, Einwand- oder Abschlussgespräch trainieren.",
    situationCoaching: "Willkommen zum Situationscoaching für Finanzen. Schilder bitte die reale Situation so konkret wie möglich, damit ich sie sauber mit dir analysieren kann.",
  },
};
