# LedgerGuard – OpenCode Harness



## Projektbeschreibung



LedgerGuard ist ein selbst entwickelter Harness für den KI-Coding-Agenten **OpenCode**.



Er unterstützt die Entwicklung unserer Finanz-Webanwendung **Ledgerly** durch projektspezifische Entwicklungsregeln und automatische Code-Verifikation.



Das Projekt entsteht im Modul *AI in Software Development* (WS 2026/27).



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

- OpenCode

- Lokales Ledgerly-Projekt



Im Ledgerly-Projekt die Abhängigkeiten installieren:



```powershell

npm install

npm install --save-dev @opencode-ai/plugin

```



Anschließend die Dateien `AGENTS.md`, `opencode.json` und `.opencode/tools/ledger_verify.ts` im Ledgerly-Projekt an den entsprechenden Stellen ablegen.



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



## Weiterentwicklung



In den nächsten Meilensteinen erweitern wir LedgerGuard um zusätzliche domänenspezifische Tools, einen Verifikations- und Korrekturprozess, automatisierte Evaluationen und technische Sicherheitsmaßnahmen.


