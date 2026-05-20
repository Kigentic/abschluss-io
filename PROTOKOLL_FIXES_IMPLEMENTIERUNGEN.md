# Protokoll: Fixes & Implementierungen

Stand: 20.05.2026
Projekt: `abschluss-io`
Branch: `main`

## 1) Branchen & Prompt-Architektur

### 1.1 Register-Branchen auf neue Liste umgestellt
- Commit: `990357b`
- Betroffene Dateien:
  - `app/register/...` (branchenbezogene Auswahl-Logik)
- Änderung:
  - Branchenliste auf `Fitness`, `Finanzen`, `Franchise`, `Energie` angepasst.
  - Grundlage für konsistente Industry-Keys im gesamten Flow geschaffen.

### 1.2 Legacy-Type-Mismatch bei Branchenprompts behoben
- Commit: `c3af00d`
- Betroffene Dateien:
  - `lib/prompts/industries/automotive.ts` (und zugehörige Typquellen)
- Änderung:
  - Build-Fehler durch nicht mehr gültigen Industry-Key behoben.
  - Typkonsistenz mit zulässigen Branchen hergestellt.

### 1.3 Energie-Struktur 1:1 auf Basis Fitness aufgebaut (sauber getrennt)
- Commit: `b6f7a61`
- Betroffene Dateien:
  - `lib/prompts/industries/energy.ts`
- Änderung:
  - Eigenständige Energie-Promptstruktur angelegt.
  - Keine Vermischung mit Fitness-Inhalten.

### 1.4 Energie-Chatflow erweitert (Themen, Pain Points, Einwände)
- Commit: `aa99958`
- Betroffene Dateien:
  - `lib/prompts/industries/energy.ts`
- Änderung:
  - Inhalte ergänzt für: Wärmepumpe, Photovoltaik-Anlage, Wallbox, Energiespeicher.
  - Pain Points ergänzt: Heiz-/Energiekosten, Umweltbewusstsein, Wertsteigerung.
  - Einwandkatalog ergänzt (z. B. Bank, intern besprechen, zu teuer, Garantie, Service/Wartung, Anbietervergleich).
  - Regel ergänzt, bei zu vielen Fachbegriffen Verständnisfragen zu stellen.

## 2) Avatar-Logik (Full Sales)

### 2.1 3x-Sperr-Regel / 80%-Divergenz umgesetzt
- Commit: `e0a2d80`
- Betroffene Dateien:
  - `app/api/sessions/start/route.ts`
  - `lib/full-sales-avatar.ts` (und verknüpfte Avatar-Logik)
- Änderung:
  - Letzten Snapshot als Ausschlussbasis berücksichtigt.
  - Hohe Wiederholungsnähe verhindert (Ziel: deutliche Differenz zum vorherigen Avatar).

### 2.2 Energie-spezifische Avatarprofile (B2C/B2B, Eigentümer-Szenarien)
- Commit: `f447e8b`
- Betroffene Dateien:
  - `lib/prompts/industries/energy.ts`
  - `lib/full-sales-avatar.ts` (Mapping/Selektion)
- Änderung:
  - Zielgruppen für Eigenheim- und Mehrfamilienhausbesitzer ergänzt.
  - Alters-, Kontext-, Einwand- und Prioritätenprofile ergänzt.
  - DISG-/Persönlichkeitsbezug in Verhalten und Argumentation verankert.

## 3) Admin Panel / Rollen / Zugriff

### 3.1 Admin-Button-Sichtbarkeit stabilisiert
- Commits (Auszug):
  - `40c1ca0`, `ddfb02b`, `4cf2bb7`, `45d1e56`, `351a3f8`
- Betroffene Dateien:
  - `components/internal-app-shell.tsx`
  - `lib/admin-server.ts`
  - `app/admin/page.tsx`
- Änderung:
  - Rendering-Logik für Admin-Navigation robust gemacht.
  - Master-Admin-Erkennung über zuverlässige Guards abgesichert.

### 3.2 3-Ebenen-Verwaltung wieder strikt hergestellt
- Commit: `be83434`
- Betroffene Dateien:
  - `lib/admin-server.ts`
  - `lib/organization-admin-server.ts`
  - `components/internal-app-shell.tsx`
- Änderung:
  - Plattform-, Organisations- und Zugangs-/Abo-Ebene konsistent abgesichert.
  - Server-Guards und UI-Zugriffslogik synchronisiert.

### 3.3 Org-Zugriff für Master-Admin trotz fehlender Membership-Fälle repariert
- Commits:
  - `0048ade`, `df89d47`
- Betroffene Dateien:
  - `lib/organization-admin-server.ts`
- Änderung:
  - Fallback-Logik ergänzt, wenn direkte Membership fehlt.
  - Primäre Admin-Organisation wird belastbar aufgelöst.

### 3.4 403-Debug-Payloads für Ursachenanalyse ergänzt
- Commit: `2ca416c`
- Betroffene Dateien:
  - `app/api/admin/overview/route.ts`
  - `app/api/organization/overview/route.ts`
- Änderung:
  - Debug-Informationen bei Forbidden-Antworten ergänzt.
  - Schnellere Ursachenfindung bei Rechteproblemen.

### 3.5 Organisationsverwaltung für Non-Solo freigeschaltet
- Commit: `da09d7c`
- Betroffene Dateien:
  - `components/internal-app-shell.tsx`
  - `lib/organization-admin-server.ts`
- Änderung:
  - Zugriff auf Organisationsverwaltung für Nutzer ohne Solo-Zugang ermöglicht (gemäß gewünschter Logik).

### 3.6 Branchenänderung pro Organisation im Admin-Panel explizit speicherbar gemacht
- Commit: `c42fde7`
- Betroffene Dateien:
  - `app/admin/admin-page-view.tsx`
- Änderung:
  - Dropdown auf Draft-Auswahl umgestellt.
  - `Ändern`-Button neben Dropdown ergänzt.
  - Speichern erst per Klick; Disable-Logik bei unveränderten/ladenden Zuständen ergänzt.

## 4) Passwort-Recovery / Redirect

### 4.1 Recovery-Flow korrigiert (Hash-Token-Handling + Redirect)
- Commit: `3a6870a`
- Betroffene Dateien:
  - `app/forgot-password/page.tsx`
  - `app/reset-password/page.tsx`
- Änderung:
  - Verarbeitung von Recovery-Parametern stabilisiert.
  - Redirect-Kette für Reset-Flow korrigiert.

### 4.2 Redirect-URL dynamisch auf aktuelle Origin gestellt
- Commit: `dbd5a64`
- Betroffene Dateien:
  - `app/forgot-password/page.tsx`
- Änderung:
  - Reset-Links verwenden die aktuelle Deployment-Origin.
  - Umgebungswechsel (Preview/Prod) robuster.

### 4.3 Diagnose-Endpunkt für Supabase-Projektkonsistenz ergänzt
- Commit: `7c5e548`
- Betroffene Dateien:
  - `app/api/debug/supabase-project/route.ts`
- Änderung:
  - Prüft Konsistenz von Projekt-Ref aus URL/Key.
  - Unterstützt schnelle Fehleranalyse bei falscher Supabase-Konfiguration.

## 5) Energie-Briefing-Text im Chat

### 5.1 Umlaute im Energiebereich korrigiert
- Commit: `2d42bfa`
- Betroffene Dateien:
  - `lib/prompts/industries/energy.ts`
- Änderung:
  - ASCII-Ersatzschreibweisen (`ae/oe/ue`) in relevanten Texten auf echte Umlaute umgestellt.

### 5.2 Feldlabel im Full-Sales-Briefing branchenabhängig gemacht
- Commits:
  - `2d42bfa` (Client-Ansicht)
  - `5e4fafb` (serverseitige Session-Erzeugung)
- Betroffene Dateien:
  - `app/chat/[sessionId]/chat-session-view.tsx`
  - `app/api/sessions/start/route.ts`
- Änderung:
  - Für Branche `energy` wird statt `Beschwerdebild` jetzt `Konkretes Interesse` ausgegeben.
  - Zusätzlich Startsatz im Briefing mit echten Umlauten vereinheitlicht.
  - Hinweis: Bereits bestehende Sessions behalten alten bereits gespeicherten Briefingtext; neue Sessions zeigen die neue Fassung.

## 6) Build-/Deploy-Stabilität

- Mehrere Fixes wurden jeweils mit lokalem Build validiert (`npm run build` erfolgreich nach den jeweiligen Änderungen).
- Relevante Fix-Commits wurden direkt auf `main` gepusht.

