# Modellvergleich und Modellauswahl (K2)

## 1. Ziel

Für unseren OpenCode-Harness **LedgerGuard** vergleichen wir drei KI-Modelle hinsichtlich ihrer Eignung für die Softwareentwicklung.

Die Auswahl erfolgt anhand der fünf Kriterien: Qualität, Kosten, Latenz, Lizenz und Datenschutz.

## 2. Vergleichsmatrix

| Kriterium | Big Pickle (OpenCode Zen) | Claude Sonnet (Anthropic) | GPT-Coding-Modell (OpenAI) |
|---|---|---|---|
| Qualität | Ledgerly erfolgreich entwickelt und eigenes Tool verwendet | Coding-Alternative; nicht selbst getestet | Coding-Alternative; nicht selbst getestet |
| Kosten | Während unserer Tests kostenlos | API-Nutzung kostenpflichtig | API-Nutzung kostenpflichtig |
| Latenz | 32 Min. 26 Sek. für die gesamte App-Entwicklung | Nicht gemessen | Nicht gemessen |
| Lizenz | Nutzungsbedingungen noch zu prüfen | Proprietär | Proprietär |
| Datenschutz | OpenCode-Zen-Bedingungen noch zu prüfen | Anthropic-API-Bedingungen | OpenAI-API-Bedingungen |

## 3. Praktische Erfahrungen mit Big Pickle

Wir haben Big Pickle mit dem Build-Agenten von OpenCode für die Entwicklung unserer Webanwendung **Ledgerly** verwendet.

Bisherige Ergebnisse:

- Entwicklung der vollständigen Webanwendung in **32 Minuten und 26 Sekunden**.
- Erfolgreiche Implementierung von Frontend, Backend und Datenbankanbindung.
- Erfolgreicher Aufruf unseres selbst entwickelten Tools `ledger_verify`.
- Alle drei Prüfungen bestanden: TypeScript, Server-Finanztests und Client-Geldtests.
- Erfolgreiche Ergänzung eines weiteren Finanztests.

Die 32 Minuten und 26 Sekunden beschreiben die gesamte Entwicklungsdauer und nicht die reine Modelllatenz.

## 4. Begründung der Modellauswahl

Wir entscheiden uns vorläufig für **Big Pickle über OpenCode Zen**.

Die wichtigsten Gründe:

1. Das Modell war während unserer bisherigen Nutzung kostenlos verfügbar.
2. Es hat unsere Entwicklungsaufgaben erfolgreich bearbeitet.
3. Es konnte unser eigenes Tool `ledger_verify` aufrufen und die Ergebnisse verarbeiten.
4. Es lässt sich direkt in OpenCode integrieren.

Für unseren ersten Meilenstein bietet Big Pickle damit ein geeignetes Verhältnis zwischen Funktionalität und Kosten.

## 5. Grenzen des Vergleichs

Die drei Modelle wurden nicht unter identischen Bedingungen getestet. Deshalb können wir noch keine zuverlässige Rangfolge hinsichtlich Qualität und Geschwindigkeit erstellen.

Die genauen Modellversionen sowie Lizenz- und Datenschutzbedingungen müssen vor der endgültigen Abgabe noch überprüft werden.

## 6. Quellen

- OpenCode: https://opencode.ai/docs/
- OpenCode Zen: https://opencode.ai/zen
- Anthropic: https://docs.anthropic.com/
- OpenAI: https://platform.openai.com/docs/

**Stand:** 02.11.2026
