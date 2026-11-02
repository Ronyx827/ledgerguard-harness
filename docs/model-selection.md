

# Modellvergleich und Modellauswahl (K2)



## 1. Ziel



Für unseren Coding-Agent-Harness **LedgerGuard** vergleichen wir drei KI-Modelle hinsichtlich Qualität, Kosten, Latenz, Lizenz und Datenschutz.



Ziel ist die Auswahl eines geeigneten Modells für die Entwicklung und Verifikation unserer Finanz-Webanwendung **Ledgerly**.



## 2. Testumgebung



Alle drei Modelle wurden mit derselben Coding-Aufgabe getestet:



- Coding-Agent: OpenCode 1.19.3, Build

- Harness: LedgerGuard mit `AGENTS.md` und `ledger_verify`

- Aufgabe: Einen Unit-Test für ein Monatsbudget von 10.000 Cent ohne Ausgaben ergänzen

- Ausgangspunkt: Getrennte Kopien derselben Ledgerly-Version

- Verifikation: TypeScript, Server-Finanztests und Client-Geldtests

- Modellkonfiguration: Standard/Default



Die Modelle wurden über die kostenlosen OpenCode-Angebote verwendet. Der angeforderte OpenCode-Go-Key war für diese Tests nicht erforderlich.



## 3. Kriterien und Gewichtung



Die Gewichtungen wurden anhand unserer Projektanforderungen festgelegt.



| Kriterium | Gewichtung | Begründung |

|---|---:|---|

| Qualität | 35 % | Korrekte Codeänderungen und zuverlässige Tool-Nutzung |

| Kosten | 25 % | Begrenztes Projektbudget |

| Latenz | 15 % | Schnelle Entwicklungs- und Verifikationszyklen |

| Lizenz | 10 % | Rechtlich zulässige Nutzung |

| Datenschutz | 15 % | Schutz von Quellcode und Finanzdaten |

| **Gesamt** | **100 %** | |



## 4. Praktischer Modellvergleich



| Messwert | Big Pickle | DeepSeek V4.1 Flash | GLM-5.3-Flash |

|---|---|---|---|

| Coding-Aufgabe | Erfolgreich | Erfolgreich | Erfolgreich |

| Laufzeit | 34,4 s | 357 s | 37,5 s |

| TypeScript | Bestanden | Bestanden | Bestanden |

| Server-Finanztests | 14/14 | 14/14 | 14/14 |

| Client-Geldtests | 9/9 | 9/9 | 9/9 |

| Custom Tool | Regulär aufgerufen | Funktion direkt ausgeführt | Regulär aufgerufen |

| Angezeigte Kosten | $0,00 | $0,00 | $0,00 |

| Probleme | Keine gemeldet | Workspace-/Tool-Registrierungsprobleme | Keine gemeldet |



Alle Modelle implementierten einen sinnvollen Test für `computeBudgetStatus(10000, 0)`.



Der Test überprüft:



- Status `ok`

- Restbudget von 10.000 Cent

- Verbrauch von 0 %

- Keine Budgetüberschreitung



**Besonderheit bei DeepSeek:** Das Modell meldete Schwierigkeiten mit dem Arbeitsverzeichnis und der Registrierung des Custom Tools. Es führte die exportierte Verifikationsfunktion direkt aus. Die Prüfungen bestanden, aber der reguläre Tool-Aufruf wurde nicht nachgewiesen.



Die Laufzeiten beziehen sich auf den gesamten Agentenlauf einschließlich Codebearbeitung und Verifikation, nicht auf die reine Modelllatenz.



## 5. Vergleich der weiteren Kriterien



| Kriterium | Big Pickle | DeepSeek V4.1 Flash | GLM-5.3-Flash |

|---|---|---|---|

| Qualität | Aufgabe und reguläre Tool-Nutzung erfolgreich | Aufgabe erfolgreich, Tool-Integration problematisch | Aufgabe und reguläre Tool-Nutzung erfolgreich |

| Kosten | Kostenloser Testzugang | Kostenloser Testzugang | Kostenloser Testzugang |

| Latenz | 34,4 s | 357 s | 37,5 s |

| Lizenz | Zugrunde liegendes Modell nicht offengelegt; OpenCode-Nutzungsbedingungen | Offene Modellgewichte; konkrete Lizenz der Modellversion separat zu prüfen | Konkrete Modelllizenz separat zu prüfen |

| Datenschutz | Externe API; Daten können während der kostenlosen Phase zur Modellverbesserung verwendet werden | Externe API; OpenCode dokumentiert keine Nutzung zum Modelltraining und Zero-Retention für den Free-Endpunkt | Externe API; OpenCode dokumentiert keine Nutzung zum Modelltraining und Zero-Retention für den Free-Endpunkt |



Die kostenlose Verfügbarkeit kann zeitlich begrenzt sein. Lizenz und Datenschutz des Modells sind von den Nutzungsbedingungen des API-Anbieters zu unterscheiden.



## 6. Gewichtete Bewertung



Für die praktische Vorauswahl verwenden wir eine Skala von 1 bis 5:



- 1 = ungünstig

- 3 = mittel

- 5 = günstig



Die Bewertung ist eine projektspezifische Einschätzung, kein allgemeines Modellranking.



| Kriterium | Gewicht | Big Pickle | DeepSeek | GLM |

|---|---:|---:|---:|---:|

| Qualität und Tool-Nutzung | 35 % | 5 | 3 | 5 |

| Kosten | 25 % | 5 | 5 | 5 |

| Latenz | 15 % | 5 | 1 | 5 |

| Lizenztransparenz | 10 % | 2 | 3 | 3 |

| Datenschutz | 15 % | 2 | 4 | 4 |

| **Gewichteter Score** | **100 %** | **4,25/5** | **3,10/5** | **4,60/5** |



Berechnung: Summe aus Bewertung × Gewichtung.



Die Punkte für Qualität und Latenz basieren auf einem einzigen Testlauf pro Modell. Lizenz- und Datenschutzpunkte sind vorläufige qualitative Einschätzungen, keine Messwerte.



## 7. Modellauswahl



Für Milestone 1 verwenden wir weiterhin **Big Pickle über OpenCode Zen**.



Gründe:



1\. Big Pickle hat Ledgerly bereits erfolgreich entwickelt.

2\. Es hat unsere Coding-Aufgabe und den regulären Tool-Aufruf bestanden.

3\. Mit 34,4 Sekunden war es in unserem Test knapp am schnellsten.

4\. Es war kostenlos verfügbar und bereits in unseren Entwicklungsprozess integriert.



**GLM-5.3-Flash ist jedoch eine sehr gute Alternative.** Es löste dieselbe Aufgabe in 37,5 Sekunden und erreichte in unserer vorläufigen gewichteten Bewertung aufgrund der dokumentierten Datenschutzbedingungen sogar einen höheren Score.



Deshalb ist Big Pickle unsere **praktische M1-Auswahl aufgrund der bisherigen Projekterfahrung**, nicht der eindeutige Gesamtsieger aller Kriterien.



## 8. Einschränkungen und Ausblick



Jedes Modell wurde nur einmal getestet. Die Ergebnisse reichen für einen ersten praktischen Vergleich, aber nicht für statistisch belastbare Aussagen über die allgemeine Modellqualität oder Geschwindigkeit.



Die Schwierigkeiten bei DeepSeek könnten teilweise auf die Testumgebung zurückzuführen sein.



Weitere Tests mit mehreren Aufgaben und Wiederholungen sind für eine belastbarere Bewertung sinnvoll.



Unser Team hat zusätzlich einen OpenCode-Go-Key beim Professor angefordert. Nach Erhalt können wir weitere Modelle und Anbieter vergleichen.



## 9. Quellen



1\. Hinderks, A. (2026): *The Model Landscape and How to Choose*, Hochschule Hannover, K2-Vorlesungsfolien. Insbesondere Kriteriengewichtung, Modell-/Infrastruktur-/Harness-Trennung und Benchmarkmethodik.

2\. Eigene OpenCode-Testläufe vom 02.11.2026: Big Pickle, DeepSeek V4.1 Flash und GLM-5.3-Flash.

3\. OpenCode Zen – Modelle, Kosten und Datenschutz:

&#x20;  https://opencode.ai/zen

4\. OpenCode – Modelle und kostenlose Zugänge:

&#x20;  https://opencode.ai/docs/zen

5\. OpenCode Go – Datenschutzbedingungen:

&#x20;  https://opencode.ai/docs/go

6\. DeepSeek – Modellinformationen:

&#x20;  https://www.deepseek.com/



**Stand: 02.11.2026**



