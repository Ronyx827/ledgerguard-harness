
# LedgerGuard – OpenCode Harness

## Projektbeschreibung

## Projektbeschreibung

LedgerGuard ist ein selbst entwickelter Harness für den KI-Coding-Agenten **OpenCode**.

Er unterstützt die Entwicklung unserer Finanz-Webanwendung **Ledgerly** durch projektspezifische Entwicklungsregeln und das eigene Verifikationstool `ledger_verify`. Damit können Codeänderungen durch TypeScript-Prüfungen, automatisierte Tests und Builds überprüft werden.


## Technologie und Agent

- **Coding-Agent:** OpenCode
- **OpenCode-Version:** 1.19.3
- **Standard-Agent:** Build
- **KI-Modell:** Big Pickle über OpenCode Zen
- **Zielsoftware:** Ledgerly (React, TypeScript, Express, SQLite, Prisma)

## Bestandteile

- `AGENTS.md` – Projektspezifische Entwicklungs- und Verifikationsregeln.
- `opencode.json` – OpenCode-Konfiguration.
- `.opencode/tools/ledger_verify.ts` – Selbst entwickeltes Verifikationstool.
- `docs/target-specification.md` – Beschreibung der Zielsoftware.
- `docs/model-selection.md` – Vergleich und Begründung der Modellauswahl.

## Installation

Voraussetzungen:

- Node.js und npm
- OpenCode 1.19.3
- Lokales Ledgerly-Projekt

### 1. Harness herunterladen

Das LedgerGuard-Repository klonen:

```powershell
git clone https://github.com/Ronyx827/ledgerguard-harness.git
```

### 2. Harness-Dateien kopieren

Die folgenden Dateien aus dem LedgerGuard-Repository in das Hauptverzeichnis von Ledgerly kopieren:

- `AGENTS.md`
- `opencode.json`
- `.opencode/tools/ledger_verify.ts`

Die Verzeichnisstruktur muss erhalten bleiben.

### 3. Abhängigkeiten installieren

Im Hauptverzeichnis von Ledgerly folgende Befehle ausführen:

```powershell
npm install
npm install --save-dev @opencode-ai/plugin@1.19.3 --legacy-peer-deps
```

Die Option `--legacy-peer-deps` war in unserer Testumgebung erforderlich, um einen Abhängigkeitskonflikt zu umgehen.

### 4. Prisma Client generieren

```powershell
npx prisma generate --schema=server/prisma/schema.prisma
```

Dieser Schritt stellt sicher, dass die benötigten Prisma-Typen für die TypeScript-Prüfung vorhanden sind.

## Verwendung

OpenCode im Hauptverzeichnis von Ledgerly starten:

```powershell
opencode
```

Beispiel-Prompt:

> Run the custom ledger_verify tool in quick mode. Do not modify any files. Report the verification results.

## Verifikation

Unser selbst entwickeltes Tool `ledger_verify` bietet zwei Modi.

**Quick-Modus:**

- TypeScript-Typprüfung
- Server-Finanztests
- Client-Geldtests

**Full-Modus:**

- TypeScript-Typprüfung
- Gesamte Testsuite
- Produktions-Build

Das Tool liefert strukturierte Ergebnisse mit Status, Laufzeit und Fehlermeldungen.

## Bisherige Ergebnisse

Der Agent hat erfolgreich einen zusätzlichen Finanztest implementiert und anschließend `ledger_verify` im Quick-Modus aufgerufen.

Ergebnis:

- TypeScript-Prüfung bestanden.
- 13 von 13 Server-Finanztests bestanden.
- 9 von 9 Client-Geldtests bestanden.
- Insgesamt 3 von 3 Prüfungen erfolgreich.

Zusätzlich haben wir die Installation des Harness in einer frischen Ledgerly-Testumgebung überprüft.

Dabei wurde `ledger_verify` erfolgreich erkannt und ausgeführt. Nach der Generierung des Prisma Clients bestanden ebenfalls alle drei Prüfungen.

## Einschränkungen

LedgerGuard ist derzeit auf die Projektstruktur und die Testskripte von Ledgerly abgestimmt.

Die Verifikation wird durch die Agent-Anweisungen ausgelöst. Eine technisch erzwungene automatische Fehlerkorrektur mit Abbruchkriterien ist für Milestone 2 vorgesehen.

## Weiterentwicklung

In den nächsten Meilensteinen erweitern wir LedgerGuard um zusätzliche domänenspezifische Tools, einen Verifikations- und Korrekturprozess, automatisierte Evaluationen und technische Sicherheitsmaßnahmen.
