// resources/topics/mukb/data/sections/04-soll-ist.js

export const section = {
    id: 'soll-ist',
    titleDe: '4. Soll-Ist-Analyse & Projektplanung',
    titleEn: '4. Variance Analysis & Project Planning',
    introDe: 'Ist verstehen, Soll begründen und Verbesserungen planbar umsetzen.',
    introEn: 'Understand the actual, justify the target and implement improvements planfully.',
    subtopics: [
        {
            id: 'lernziele-grundbegriffe',
            titleDe: '4.1 Lernziele & Grundbegriffe',
            titleEn: '4.1 Learning Objectives & Core Terms',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Fachziel</h4>
                <p class="text-sm text-[var(--text-muted)]">Du vergleichst Ist und Soll, bewertest Abweichungen und unterscheidest Daten, Ursachenhypothesen und Prognosen.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Methodenziel</h4>
                <p class="text-sm text-[var(--text-muted)]">Du erstellst eine Konzeption mit Ablaufplan, Netzplan und Gantt-Diagramm und prüfst ihre Konsistenz.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Transferziel</h4>
                <p class="text-sm text-[var(--text-muted)]">Du begründest eine Maßnahme mit Wirkung auf Termin, Kosten und Qualität.</p>
              </div>
            </div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Leitfrage:</strong> Wie verbessern wir den Support messbar und halten die Einführung im Plan?
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Ist-Zustand</h4>
                <p class="text-sm text-[var(--text-muted)]">Der tatsächlich erhobene Zustand zu einem bestimmten Zeitpunkt oder Zeitraum.</p>
                <p class="text-xs text-[var(--text-muted)]"><strong>IT-Beispiel:</strong> Die mittlere Erstreaktionszeit lag im letzten Monat bei 10 Stunden.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Soll-Zustand</h4>
                <p class="text-sm text-[var(--text-muted)]">Ein festgelegter, prüfbarer Zielzustand.</p>
                <p class="text-xs text-[var(--text-muted)]"><strong>IT-Beispiel:</strong> Die mittlere Erstreaktion soll höchstens 4 Stunden dauern.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Soll-Ist-Analyse</h4>
                <p class="text-sm text-[var(--text-muted)]">Systematischer Vergleich von Ziel oder Plan mit erhobenen Daten, gefolgt von Bewertung und Ursachenprüfung.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">KPI und Bezugsgröße</h4>
                <p class="text-sm text-[var(--text-muted)]">Eine Kennzahl misst einen relevanten Sachverhalt. Die Bezugsgröße legt fest, worauf sich der Wert bezieht.</p>
                <p class="text-xs text-[var(--text-muted)]"><strong>IT-Beispiel:</strong> 144 von 200 Anfragen wurden fristgerecht gelöst: 72 %.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Baseline und Stichtag</h4>
                <p class="text-sm text-[var(--text-muted)]">Die Baseline ist der freigegebene Vergleichsplan. Der Stichtag begrenzt die erhobenen Ist-Daten.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Prognose</h4>
                <p class="text-sm text-[var(--text-muted)]">Eine begründete Schätzung eines zukünftigen Zustands auf Basis aktueller Informationen.</p>
              </div>
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Subject objective</h4>
                <p class="text-sm text-[var(--text-muted)]">Compare actual and target, assess deviations, and distinguish data, causal hypotheses and forecasts.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Method objective</h4>
                <p class="text-sm text-[var(--text-muted)]">Create a concept with process flow, network plan and Gantt chart, and check their consistency.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Transfer objective</h4>
                <p class="text-sm text-[var(--text-muted)]">Justify a measure with impact on schedule, cost and quality.</p>
              </div>
            </div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Guiding question:</strong> How do we improve support measurably and keep the introduction on plan?
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">As-is state</h4>
                <p class="text-sm text-[var(--text-muted)]">The actually measured state at a particular time or period.</p>
                <p class="text-xs text-[var(--text-muted)]"><strong>IT example:</strong> Mean first response time last month was 10 hours.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">To-be state</h4>
                <p class="text-sm text-[var(--text-muted)]">A defined, verifiable target state.</p>
                <p class="text-xs text-[var(--text-muted)]"><strong>IT example:</strong> Mean first response should be at most 4 hours.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Variance analysis</h4>
                <p class="text-sm text-[var(--text-muted)]">Systematic comparison of target or plan with measured data, followed by assessment and causal investigation.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">KPI and reference base</h4>
                <p class="text-sm text-[var(--text-muted)]">A metric measures a relevant fact. The reference base defines what the value relates to.</p>
                <p class="text-xs text-[var(--text-muted)]"><strong>IT example:</strong> 144 of 200 requests solved on time: 72 %.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Baseline and cut-off</h4>
                <p class="text-sm text-[var(--text-muted)]">The baseline is the approved comparison plan. The cut-off date bounds the measured actual data.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Forecast</h4>
                <p class="text-sm text-[var(--text-muted)]">A reasoned estimate of a future state based on current information.</p>
              </div>
            </div>`
        },
        {
            id: 'rechenregeln',
            titleDe: '4.2 Rechenregeln & Beispiele',
            titleEn: '4.2 Calculation Rules & Examples',
            htmlDe: `
            <div class="space-y-4 mt-3">
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Absolute und relative Abweichung zum Soll</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">Δ = I − S &nbsp;&nbsp;·&nbsp;&nbsp; a<sub>rel</sub> = (I − S) / S · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">I = Istwert; S = Sollwert. Absolute Abweichung in der ursprünglichen Einheit; relative Abweichung in Prozent.</p>
                <p class="text-xs text-[var(--text-muted)] mt-1">Konvention Ist minus Soll. Vorzeichen bleibt erhalten. Bei S = 0 ist die relative Abweichung nicht definiert.</p>
              </div>
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Erforderliche Senkung gegenüber dem heutigen Ist</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">r<sub>Senkung</sub> = (I − S) / I · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">Voraussetzung I &gt; 0 und 0 ≤ S ≤ I. Die Senkung bezieht sich auf den heutigen Istwert, nicht auf den Sollwert.</p>
              </div>
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Veränderung gegenüber einem Ausgangswert</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">r = (x<sub>neu</sub> − x<sub>alt</sub>) / x<sub>alt</sub> · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">Prozentpunkte sind die Differenz zweier bereits als Prozentzahl angegebener Anteile: 72 % − 90 % = −18 Prozentpunkte.</p>
              </div>
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Prozentanteil</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">q = N<sub>Teilmenge</sub> / N<sub>Gesamt</sub> · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">Für eine echte Anteilsquote gilt 0 ≤ Teilmenge ≤ Gesamtmenge und Gesamtmenge &gt; 0.</p>
              </div>
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">Rechenbeispiele</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>Situation</th><th>Rechnung Ist minus Soll</th><th>Deutung</th></tr>
            <tr><td>Reaktionszeit 3 h statt höchstens 4 h</td><td class="text-[var(--text-muted)]">3 − 4 = −1 h; −1/4 · 100 = −25 %</td><td class="text-[var(--text-muted)]">Günstig: Reaktion schneller als gefordert.</td></tr>
            <tr><td>Fristgerechte Fälle 95 % statt mind. 90 %</td><td class="text-[var(--text-muted)]">95 − 90 = +5 Prozentpunkte</td><td class="text-[var(--text-muted)]">Günstig: Mindestziel übertroffen.</td></tr>
            <tr><td>Zufriedenheit 3,2 statt mind. 4,2 Punkte</td><td class="text-[var(--text-muted)]">3,2 − 4,2 = −1,0 Skalenpunkte</td><td class="text-[var(--text-muted)]">Ungünstig: Mindestziel verfehlt.</td></tr>
            <tr><td>Keine Ausfälle vorgesehen, tatsächlich 2</td><td class="text-[var(--text-muted)]">2 − 0 = +2 Ausfälle</td><td class="text-[var(--text-muted)]">Relative Abweichung nicht definiert (Division durch 0).</td></tr>
            </table></div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Prüfroutine:</strong> Was ist die Frage? Welche Werte und Einheiten gehören dazu? Welcher Wert steht im Nenner? Passt das Vorzeichen zur Aussage? Vergleichen wir dieselbe Leistung? Ist das Ergebnis ein Istwert oder eine Prognose?
            </div>`,
            htmlEn: `
            <div class="space-y-4 mt-3">
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Absolute and relative deviation from target</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">Δ = I − S &nbsp;&nbsp;·&nbsp;&nbsp; a<sub>rel</sub> = (I − S) / S · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">I = actual; S = target. Absolute deviation in the original unit; relative deviation in percent.</p>
                <p class="text-xs text-[var(--text-muted)] mt-1">Actual-minus-target convention. Sign retained. At S = 0 the relative deviation is undefined.</p>
              </div>
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Required reduction relative to current actual</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">r<sub>red</sub> = (I − S) / I · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">Conditions I &gt; 0 and 0 ≤ S ≤ I. Reduction relates to the current actual, not the target.</p>
              </div>
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Change from a reference value</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">r = (x<sub>new</sub> − x<sub>old</sub>) / x<sub>old</sub> · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">Percentage points are the difference of two shares already stated as percentages: 72 % − 90 % = −18 percentage points.</p>
              </div>
              <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)]">
                <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Percentage share</p>
                <p class="font-mono text-center text-[var(--text-color)] my-2">q = N<sub>part</sub> / N<sub>total</sub> · 100 %</p>
                <p class="text-xs text-[var(--text-muted)]">For a genuine share 0 ≤ part ≤ total and total &gt; 0.</p>
              </div>
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">Calculation examples</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>Situation</th><th>Actual − target</th><th>Interpretation</th></tr>
            <tr><td>Response 3 h vs. max 4 h</td><td class="text-[var(--text-muted)]">3 − 4 = −1 h; −1/4 · 100 = −25 %</td><td class="text-[var(--text-muted)]">Favourable: response faster than required.</td></tr>
            <tr><td>On-time cases 95 % vs. min. 90 %</td><td class="text-[var(--text-muted)]">95 − 90 = +5 percentage points</td><td class="text-[var(--text-muted)]">Favourable: minimum exceeded.</td></tr>
            <tr><td>Satisfaction 3.2 vs. min. 4.2 points</td><td class="text-[var(--text-muted)]">3.2 − 4.2 = −1.0 scale points</td><td class="text-[var(--text-muted)]">Unfavourable: minimum missed.</td></tr>
            <tr><td>No outages planned, 2 actually</td><td class="text-[var(--text-muted)]">2 − 0 = +2 outages</td><td class="text-[var(--text-muted)]">Relative deviation undefined (division by 0).</td></tr>
            </table></div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Check routine:</strong> What is the question? Which values and units belong to it? Which value goes in the denominator? Does the sign match the statement? Are we comparing the same service? Is the result an actual or a forecast?
            </div>`
        },
        {
            id: 'konzeption',
            titleDe: '4.3 Konzeption & Nutzwertanalyse',
            titleEn: '4.3 Concept & Weighted Scoring',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">SMART-Ziel</h4>
                <p class="text-sm text-[var(--text-muted)]">Spezifisch, messbar, akzeptiert/attraktiv, realistisch, terminiert.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Muss / Kann</h4>
                <p class="text-sm text-[var(--text-muted)]">Muss-Anforderungen sind verbindlich; Kann-Anforderungen erhöhen den Nutzen, sind aber optional.</p>
              </div>
            </div>
            <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)] mt-4">
              <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Gewichtete Nutzwertanalyse</p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">T<sub>ij</sub> = (g<sub>i</sub> / 100) · b<sub>ij</sub> &nbsp;&nbsp;·&nbsp;&nbsp; N<sub>j</sub> = Σ T<sub>ij</sub> &nbsp;&nbsp;·&nbsp;&nbsp; Σ g<sub>i</sub> = 100</p>
              <p class="text-xs text-[var(--text-muted)]">g<sub>i</sub> = Prozentzahl des Gewichts (z.B. 20 für 20 %); b<sub>ij</sub> = Bewertung der Alternative j beim Kriterium i; T<sub>ij</sub> = gewichteter Teilnutzwert; N<sub>j</sub> = Gesamtnutzwert. Bei Skala 1–5 liegt N ebenfalls zwischen 1 und 5.</p>
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">Die vollständige Konzeptgliederung</h4>
            <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 space-y-1 mt-2">
              <li>Auftrag, Ausgangslage, Stakeholder und Abgrenzung</li>
              <li>Ist-Daten, Soll-Ist-Tabelle und Ursachenprüfung</li>
              <li>Ziele, Anforderungen und Abnahmekriterien</li>
              <li>Variantenvergleich und begründete Lösungsentscheidung</li>
              <li>Soll-Prozess, Projektstruktur und Arbeitspakete</li>
              <li>Vorgänge, Netzplan, Gantt-Plan und Meilensteine</li>
              <li>Rollen, Ressourcen und Budget einschließlich Reserve</li>
              <li>Risiken, Kommunikation und Eskalationsregeln</li>
              <li>Status, Prognose und Steuerungsmaßnahme</li>
              <li>Abnahme, Übergabe und spätere Erfolgsmessung</li>
            </ol>
            <div class="mt-3 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              Ein hoher Nutzwert darf eine verletzte Muss-Anforderung nicht ausgleichen. Prüfe Ausschlusskriterien vor der gewichteten Auswahl.
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">SMART goal</h4>
                <p class="text-sm text-[var(--text-muted)]">Specific, measurable, accepted/attractive, realistic, time-bound.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Must / Could</h4>
                <p class="text-sm text-[var(--text-muted)]">Must requirements are binding; could requirements increase benefit but are optional.</p>
              </div>
            </div>
            <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)] mt-4">
              <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Weighted scoring</p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">T<sub>ij</sub> = (g<sub>i</sub> / 100) · b<sub>ij</sub> &nbsp;&nbsp;·&nbsp;&nbsp; N<sub>j</sub> = Σ T<sub>ij</sub> &nbsp;&nbsp;·&nbsp;&nbsp; Σ g<sub>i</sub> = 100</p>
              <p class="text-xs text-[var(--text-muted)]">g<sub>i</sub> = weight as percentage (e.g. 20 for 20 %); b<sub>ij</sub> = rating of alternative j on criterion i; T<sub>ij</sub> = weighted partial score; N<sub>j</sub> = total score. With a 1–5 scale, N also lies between 1 and 5.</p>
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">The complete concept outline</h4>
            <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 space-y-1 mt-2">
              <li>Assignment, starting situation, stakeholders and boundary</li>
              <li>As-is data, target-actual table and causal investigation</li>
              <li>Goals, requirements and acceptance criteria</li>
              <li>Variant comparison and reasoned solution decision</li>
              <li>To-be process, project structure and work packages</li>
              <li>Activities, network plan, Gantt chart and milestones</li>
              <li>Roles, resources and budget incl. reserve</li>
              <li>Risks, communication and escalation rules</li>
              <li>Status, forecast and control measure</li>
              <li>Acceptance, handover and later success measurement</li>
            </ol>
            <div class="mt-3 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              A high score may not compensate for a violated must requirement. Check exclusion criteria before weighted selection.
            </div>`
        },
        {
            id: 'netzplan-gantt',
            titleDe: '4.4 Netzplan & Gantt',
            titleEn: '4.4 Network Plan & Gantt',
            htmlDe: `
            <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)] mt-3">
              <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Netzplan: früheste und späteste Zeitpunkte</p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">FAZ<sub>i</sub> = max(FEZ<sub>Vorgänger</sub>) &nbsp;·&nbsp; FEZ<sub>i</sub> = FAZ<sub>i</sub> + d<sub>i</sub></p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">SEZ<sub>i</sub> = min(SAZ<sub>Nachfolger</sub>) &nbsp;·&nbsp; SAZ<sub>i</sub> = SEZ<sub>i</sub> − d<sub>i</sub></p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">GP<sub>i</sub> = SAZ<sub>i</sub> − FAZ<sub>i</sub> &nbsp;·&nbsp; FP<sub>i</sub> = min(FAZ<sub>Nachfolger</sub>) − FEZ<sub>i</sub></p>
              <p class="text-xs text-[var(--text-muted)]">Start bei Zeitpunkt 0. GP = 0 kennzeichnet kritische Vorgänge. Kalender, Ressourcen und geänderte Abhängigkeiten können den Plan verändern.</p>
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">Lernbeispiel X → Y → Z</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>ID</th><th>Dauer</th><th>FAZ</th><th>FEZ</th><th>SAZ</th><th>SEZ</th><th>GP</th><th>FP</th></tr>
            <tr><td>X</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">0</td></tr>
            <tr><td>Y</td><td class="text-[var(--text-muted)]">3</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">0</td></tr>
            <tr><td>Z</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">6</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">6</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">0</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-2">Projektdauer 6. Alle drei Vorgänge sind kritisch: X → Y → Z.</p>`,
            htmlEn: `
            <div class="bg-[var(--code-bg)] p-4 rounded border border-[var(--border-color)] mt-3">
              <p class="font-semibold text-[var(--link-color)] text-sm mb-2">Network plan: earliest and latest times</p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">EAS<sub>i</sub> = max(EAF<sub>predecessor</sub>) &nbsp;·&nbsp; EAF<sub>i</sub> = EAS<sub>i</sub> + d<sub>i</sub></p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">LFF<sub>i</sub> = min(LFS<sub>successor</sub>) &nbsp;·&nbsp; LFS<sub>i</sub> = LFF<sub>i</sub> − d<sub>i</sub></p>
              <p class="font-mono text-center text-[var(--text-color)] my-2">TF<sub>i</sub> = LFS<sub>i</sub> − EAS<sub>i</sub> &nbsp;·&nbsp; FF<sub>i</sub> = min(EAS<sub>successor</sub>) − EAF<sub>i</sub></p>
              <p class="text-xs text-[var(--text-muted)]">Start at time 0. TF = 0 marks critical activities. Calendars, resources and changed dependencies can alter the plan.</p>
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">Learning example X → Y → Z</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>ID</th><th>Duration</th><th>EAS</th><th>EAF</th><th>LFS</th><th>LFF</th><th>TF</th><th>FF</th></tr>
            <tr><td>X</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">0</td></tr>
            <tr><td>Y</td><td class="text-[var(--text-muted)]">3</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">0</td></tr>
            <tr><td>Z</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">6</td><td class="text-[var(--text-muted)]">5</td><td class="text-[var(--text-muted)]">6</td><td class="text-[var(--text-muted)]">0</td><td class="text-[var(--text-muted)]">0</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-2">Project duration 6. All three activities are critical: X → Y → Z.</p>`
        },
        {
            id: 'fallstudie-nordlicht',
            titleDe: '4.5 Fallstudie: Nordlicht IT Service',
            titleEn: '4.5 Case Study: Nordlicht IT Service',
            htmlDe: `
            <div class="p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              Bearbeite A1 bis A6. Öffne die Stichtagsmeldung A7 erst, wenn euer Basisplan fertig ist. Die offenen Aufgaben haben mehrere begründbare Lösungen.
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">A1 Ausgangslage</h4>
            <p class="text-[var(--text-muted)]">Supportanfragen per E-Mail und Telefon. Übertragung in gemeinsame Tabelle; Dringlichkeit, Bearbeitungsstand und Zuständigkeit uneinheitlich. Kunden fragen wiederholt nach. Fehlende Fristenüberwachung.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Kennzahl</th><th>Ist</th><th>Soll</th><th>Datengrundlage</th></tr>
            <tr><td>Mittlere Erstreaktionszeit</td><td class="text-[var(--text-muted)]">10 h</td><td class="text-[var(--text-muted)]">≤ 4 h</td><td class="text-[var(--text-muted)]">200 Anfragen</td></tr>
            <tr><td>Fristgerecht gelöste Fälle</td><td class="text-[var(--text-muted)]">72 %</td><td class="text-[var(--text-muted)]">≥ 90 %</td><td class="text-[var(--text-muted)]">144 von 200</td></tr>
            <tr><td>Dokumentationsaufwand</td><td class="text-[var(--text-muted)]">30 h / Monat</td><td class="text-[var(--text-muted)]">≤ 18 h</td><td class="text-[var(--text-muted)]">200 Anfragen</td></tr>
            <tr><td>Kundenzufriedenheit</td><td class="text-[var(--text-muted)]">3,2 / 5</td><td class="text-[var(--text-muted)]">≥ 4,2 / 5</td><td class="text-[var(--text-muted)]">50 freiwillige Rückmeldungen</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">A5 Vorgangsliste (Auszug)</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>ID</th><th>Vorgang</th><th>Dauer</th><th>Vorgänger</th><th>Planbudget</th></tr>
            <tr><td>A</td><td class="text-[var(--text-muted)]">Ist-Aufnahme und Zielklärung</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">—</td><td class="text-[var(--text-muted)]">800 €</td></tr>
            <tr><td>B</td><td class="text-[var(--text-muted)]">Anforderungen freigeben</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">A</td><td class="text-[var(--text-muted)]">600 €</td></tr>
            <tr><td>C</td><td class="text-[var(--text-muted)]">Testumgebung bereitstellen</td><td class="text-[var(--text-muted)]">3</td><td class="text-[var(--text-muted)]">A</td><td class="text-[var(--text-muted)]">900 €</td></tr>
            <tr><td>D</td><td class="text-[var(--text-muted)]">Ticketsystem konfigurieren</td><td class="text-[var(--text-muted)]">4</td><td class="text-[var(--text-muted)]">B, C</td><td class="text-[var(--text-muted)]">1.600 €</td></tr>
            <tr><td>E</td><td class="text-[var(--text-muted)]">Funktion und Berechtigungen testen</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">D</td><td class="text-[var(--text-muted)]">800 €</td></tr>
            <tr><td>F</td><td class="text-[var(--text-muted)]">Mitarbeitende schulen</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">D</td><td class="text-[var(--text-muted)]">600 €</td></tr>
            <tr><td>G</td><td class="text-[var(--text-muted)]">Pilot auswerten und Start freigeben</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">E, F</td><td class="text-[var(--text-muted)]">400 €</td></tr>
            <tr><td>H</td><td class="text-[var(--text-muted)]">Übergabe und Projektabschluss</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">G</td><td class="text-[var(--text-muted)]">300 €</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-2">Budgets sind Arbeitspaketbudgets, keine Tagessätze. Parallele Vorgänge haben getrennte Personen. Schulung F anhand eingefrorener Kopie; Freigabe G erfordert Test E.</p>
            <h4 class="mt-4 text-[var(--heading-color)]">A7 Stichtagsmeldung (Ende Tag 6)</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>Vorgang</th><th>Status</th><th>Ist-Kosten</th></tr>
            <tr><td>A</td><td class="text-[var(--text-muted)]">Fertig, 0–2</td><td class="text-[var(--text-muted)]">850 €</td></tr>
            <tr><td>B</td><td class="text-[var(--text-muted)]">Fertig, 2–4</td><td class="text-[var(--text-muted)]">600 €</td></tr>
            <tr><td>C</td><td class="text-[var(--text-muted)]">Fertig, 2–6, ein Tag länger</td><td class="text-[var(--text-muted)]">1.100 €</td></tr>
            <tr><td>D</td><td class="text-[var(--text-muted)]">bei 6 begonnen, 0 % fertig, 4 Tage Rest</td><td class="text-[var(--text-muted)]">0 €</td></tr>
            <tr><td>E–H</td><td class="text-[var(--text-muted)]">nicht begonnen, Dauer unverändert</td><td class="text-[var(--text-muted)]">0 €</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">A8 Steuerungsentscheidung</h4>
            <p class="text-[var(--text-muted)]"><strong>Option 1:</strong> Prognostizierten Endtermin übernehmen, Verschiebung früh melden.</p>
            <p class="text-[var(--text-muted)]"><strong>Option 2:</strong> Eingearbeitete zusätzliche Fachkraft: D sinkt von 4 auf 3 Tage; 300 € zusätzliche Restkosten; Qualität und Umfang erhalten.</p>
            <p class="text-[var(--text-muted)]">Rechne für beide Optionen Endtermin und Gesamtkosten. Begründe eine Empfehlung unter der Annahme, dass der ursprüngliche Endtermin verbindlich ist und höchstens 10 % Budgetreserve verfügbar sind.</p>`,
            htmlEn: `
            <div class="p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              Work through A1 to A6. Open cut-off report A7 only when your baseline plan is finished. Open tasks have several justifiable solutions.
            </div>
            <h4 class="mt-4 text-[var(--heading-color)]">A1 Starting situation</h4>
            <p class="text-[var(--text-muted)]">Support requests by email and telephone. Transfer to a shared table; urgency, status and responsibility inconsistent. Customers repeatedly ask. No systematic deadline monitoring.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>KPI</th><th>Actual</th><th>Target</th><th>Data base</th></tr>
            <tr><td>Mean first response</td><td class="text-[var(--text-muted)]">10 h</td><td class="text-[var(--text-muted)]">≤ 4 h</td><td class="text-[var(--text-muted)]">200 requests</td></tr>
            <tr><td>On-time solved cases</td><td class="text-[var(--text-muted)]">72 %</td><td class="text-[var(--text-muted)]">≥ 90 %</td><td class="text-[var(--text-muted)]">144 of 200</td></tr>
            <tr><td>Documentation effort</td><td class="text-[var(--text-muted)]">30 h / month</td><td class="text-[var(--text-muted)]">≤ 18 h</td><td class="text-[var(--text-muted)]">200 requests</td></tr>
            <tr><td>Customer satisfaction</td><td class="text-[var(--text-muted)]">3.2 / 5</td><td class="text-[var(--text-muted)]">≥ 4.2 / 5</td><td class="text-[var(--text-muted)]">50 voluntary responses</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">A5 Activity list (extract)</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>ID</th><th>Activity</th><th>Duration</th><th>Predecessors</th><th>Plan budget</th></tr>
            <tr><td>A</td><td class="text-[var(--text-muted)]">As-is capture and goal clarification</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">—</td><td class="text-[var(--text-muted)]">€800</td></tr>
            <tr><td>B</td><td class="text-[var(--text-muted)]">Approve requirements</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">A</td><td class="text-[var(--text-muted)]">€600</td></tr>
            <tr><td>C</td><td class="text-[var(--text-muted)]">Provision test environment</td><td class="text-[var(--text-muted)]">3</td><td class="text-[var(--text-muted)]">A</td><td class="text-[var(--text-muted)]">€900</td></tr>
            <tr><td>D</td><td class="text-[var(--text-muted)]">Configure ticketing system</td><td class="text-[var(--text-muted)]">4</td><td class="text-[var(--text-muted)]">B, C</td><td class="text-[var(--text-muted)]">€1,600</td></tr>
            <tr><td>E</td><td class="text-[var(--text-muted)]">Test function and permissions</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">D</td><td class="text-[var(--text-muted)]">€800</td></tr>
            <tr><td>F</td><td class="text-[var(--text-muted)]">Train staff</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">D</td><td class="text-[var(--text-muted)]">€600</td></tr>
            <tr><td>G</td><td class="text-[var(--text-muted)]">Evaluate pilot and approve go-live</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">E, F</td><td class="text-[var(--text-muted)]">€400</td></tr>
            <tr><td>H</td><td class="text-[var(--text-muted)]">Handover and project close</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">G</td><td class="text-[var(--text-muted)]">€300</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-2">Budgets are work-package budgets, not day rates. Parallel activities have separate people. Training F uses a frozen copy; go-live G requires test E.</p>
            <h4 class="mt-4 text-[var(--heading-color)]">A7 Cut-off report (end of day 6)</h4>
            <div class="overflow-x-auto w-full mt-2"><table class="wikitable">
            <tr><th>Activity</th><th>Status</th><th>Actual cost</th></tr>
            <tr><td>A</td><td class="text-[var(--text-muted)]">Done, 0–2</td><td class="text-[var(--text-muted)]">€850</td></tr>
            <tr><td>B</td><td class="text-[var(--text-muted)]">Done, 2–4</td><td class="text-[var(--text-muted)]">€600</td></tr>
            <tr><td>C</td><td class="text-[var(--text-muted)]">Done, 2–6, one day longer</td><td class="text-[var(--text-muted)]">€1,100</td></tr>
            <tr><td>D</td><td class="text-[var(--text-muted)]">started at 6, 0 % done, 4 days remaining</td><td class="text-[var(--text-muted)]">€0</td></tr>
            <tr><td>E–H</td><td class="text-[var(--text-muted)]">not started, duration unchanged</td><td class="text-[var(--text-muted)]">€0</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">A8 Control decision</h4>
            <p class="text-[var(--text-muted)]"><strong>Option 1:</strong> Accept forecast end date, report delay early.</p>
            <p class="text-[var(--text-muted)]"><strong>Option 2:</strong> Embedded additional specialist: D drops from 4 to 3 days; €300 additional remaining cost; quality and scope retained.</p>
            <p class="text-[var(--text-muted)]">Calculate end date and total cost for both options. Justify a recommendation assuming the original end date is binding and at most 10 % budget reserve is available.</p>`
        },
        {
            id: 'wissenscheck-soll-ist',
            titleDe: '4.6 Wissenscheck',
            titleEn: '4.6 Knowledge Check',
            htmlDe: `
            <div class="mt-3 space-y-4" data-mukb-quiz="soll-ist">
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="0">
                <p class="font-semibold text-[var(--text-color)]">1. Welche Angabe beschreibt einen erhobenen Ist-Zustand?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-0" value="0"> Die gemessene mittlere Erstreaktionszeit von 10 Stunden</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-0" value="1"> Die angestrebte Erstreaktionszeit von höchstens 4 Stunden</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-0" value="2"> Die geplante Einführung des Ticketsystems</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="1">
                <p class="font-semibold text-[var(--text-color)]">2. Welche absolute Abweichung ergibt sich mit Ist minus Soll?</p>
                <p class="text-xs text-[var(--text-muted)]">Ist: 30 h/Monat. Soll: höchstens 18 h bei gleicher Anfragezahl.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-1" value="0"> −12 Stunden</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-1" value="1"> +12 Stunden</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-1" value="2"> +66,67 Stunden</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="2">
                <p class="font-semibold text-[var(--text-color)]">3. Wie groß ist die absolute Abweichung der Prozentanteile?</p>
                <p class="text-xs text-[var(--text-muted)]">Ist 72 %, Soll mindestens 90 %.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-2" value="0"> −18 % relativ zum Soll</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-2" value="1"> +18 Prozentpunkte</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-2" value="2"> −18 Prozentpunkte</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="3">
                <p class="font-semibold text-[var(--text-color)]">4. Welches Werkzeug passt zu dieser Gliederung?</p>
                <p class="text-xs text-[var(--text-muted)]">Die Projektleitung zerlegt die Einführung in Konzeption, Bereitstellung, Einführung und Abschluss mit Arbeitspaketen.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-3" value="0"> Projektstrukturplan</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-3" value="1"> Gantt-Diagramm</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-3" value="2"> Abnahmeprotokoll</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="4">
                <p class="font-semibold text-[var(--text-color)]">5. Wann darf D frühestens beginnen?</p>
                <p class="text-xs text-[var(--text-muted)]">B endet frühestens bei 4, C bei 5.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-4" value="0"> Bei Zeitpunkt 4</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-4" value="1"> Bei Zeitpunkt 5</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-4" value="2"> Bei Zeitpunkt 9</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="5">
                <p class="font-semibold text-[var(--text-color)]">6. Was bedeutet Gesamtpuffer 0 für D?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-5" value="0"> D verursacht keine Kosten</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-5" value="1"> D ist bereits fertig</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-5" value="2"> D ist im berechneten Basisplan kritisch</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="6">
                <p class="font-semibold text-[var(--text-color)]">7. Wie lang ist die geplante Dauer von C?</p>
                <p class="text-xs text-[var(--text-muted)]">C beginnt am Zeitpunkt 2 und endet am Zeitpunkt 5.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-6" value="0"> 3 Arbeitstage</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-6" value="1"> 4 Arbeitstage</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-6" value="2"> 5 Arbeitstage</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="7">
                <p class="font-semibold text-[var(--text-color)]">8. Welche Aussage aus dem Bericht ist eine Prognose?</p>
                <p class="text-xs text-[var(--text-muted)]">A wurde bei 2 beendet, bisher 2.550 € verbraucht, Projektende derzeit bei 14 erwartet.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-7" value="0"> A wurde tatsächlich bei Zeitpunkt 2 beendet</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-7" value="1"> Das Projekt wird voraussichtlich bei Zeitpunkt 14 enden</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-7" value="2"> Bis zum Stichtag sind 2.550 € verbraucht</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="8">
                <p class="font-semibold text-[var(--text-color)]">9. Welche Bewertung ist durch diese Angaben gedeckt?</p>
                <p class="text-xs text-[var(--text-muted)]">Geplant 2.700 €, verbraucht 2.550 €, geplante Konfiguration fehlt teilweise.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-8" value="0"> Das Projekt ist nachweislich wirtschaftlicher</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-8" value="1"> Alle Projektziele wurden erreicht</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-8" value="2"> Der niedrigere Geldabfluss allein beweist keine Einsparung</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="9">
                <p class="font-semibold text-[var(--text-color)]">10. Welches Kriterium prüft diese Anforderung eindeutig?</p>
                <p class="text-xs text-[var(--text-muted)]">Jedes neu angelegte Ticket muss automatisch eine eindeutige Ticketnummer erhalten.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-9" value="0"> Zehn neu angelegte Testtickets erhalten jeweils eine eindeutige Nummer</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-9" value="1"> Das Ticketsystem wirkt modern</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-9" value="2"> Die Mitarbeitenden finden die Oberfläche ansprechend</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="10">
                <p class="font-semibold text-[var(--text-color)]">11. Wie groß sind GP und FP von B?</p>
                <p class="text-xs text-[var(--text-muted)]">FAZ = 2, SAZ = 3, FEZ = 4; Nachfolger D hat FAZ = 5.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-10" value="0"> GP = 1 Tag und FP = 1 Tag</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-10" value="1"> GP = 3 Tage und FP = 5 Tage</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-10" value="2"> GP = 0 Tage und FP = 1 Tag</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="11">
                <p class="font-semibold text-[var(--text-color)]">12. Welche Kontrolle zeigt, ob die Supportziele erreicht wurden?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-11" value="0"> Nur prüfen, ob sich das Ticketsystem vor dem Start öffnen lässt</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-11" value="1"> Die Kennzahlen in der festgelegten Messperiode nach dem Produktivstart auswerten</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-11" value="2"> Nach technischer Abnahme auf jede weitere Prüfung verzichten</label>
              </div>
              <button data-mukb-check="soll-ist" class="px-3 py-1.5 rounded bg-[var(--link-color)] text-white text-sm font-semibold">Antworten prüfen</button>
              <button data-mukb-reset="soll-ist" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Zurücksetzen</button>
              <div class="mukb-quiz-feedback space-y-2 mt-2"></div>
              <p class="mukb-quiz-total text-sm text-[var(--text-muted)]">Noch nicht ausgewertet.</p>
            </div>`,
            htmlEn: `
            <div class="mt-3 space-y-4" data-mukb-quiz="soll-ist">
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="0">
                <p class="font-semibold text-[var(--text-color)]">1. Which statement describes a measured actual state?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-0" value="0"> The measured mean first response of 10 hours</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-0" value="1"> The target first response of at most 4 hours</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-0" value="2"> The planned introduction of the ticketing system</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="1">
                <p class="font-semibold text-[var(--text-color)]">2. What absolute deviation results from actual minus target?</p>
                <p class="text-xs text-[var(--text-muted)]">Actual: 30 h/month. Target: max 18 h for the same number of requests.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-1" value="0"> −12 hours</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-1" value="1"> +12 hours</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-1" value="2"> +66.67 hours</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="2">
                <p class="font-semibold text-[var(--text-color)]">3. What is the absolute deviation of the percentage shares?</p>
                <p class="text-xs text-[var(--text-muted)]">Actual 72 %, target at least 90 %.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-2" value="0"> −18 % relative to target</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-2" value="1"> +18 percentage points</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-2" value="2"> −18 percentage points</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="3">
                <p class="font-semibold text-[var(--text-color)]">4. Which tool fits this outline?</p>
                <p class="text-xs text-[var(--text-muted)]">Project management divides the introduction into concept, provisioning, rollout and closure with work packages.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-3" value="0"> Work breakdown structure</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-3" value="1"> Gantt chart</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-3" value="2"> Acceptance report</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="4">
                <p class="font-semibold text-[var(--text-color)]">5. When may D start at the earliest?</p>
                <p class="text-xs text-[var(--text-muted)]">B finishes at earliest 4, C at 5.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-4" value="0"> At time 4</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-4" value="1"> At time 5</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-4" value="2"> At time 9</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="5">
                <p class="font-semibold text-[var(--text-color)]">6. What does total float 0 mean for D?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-5" value="0"> D incurs no costs</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-5" value="1"> D is already finished</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-5" value="2"> D is critical in the calculated baseline plan</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="6">
                <p class="font-semibold text-[var(--text-color)]">7. What is the planned duration of C?</p>
                <p class="text-xs text-[var(--text-muted)]">C starts at time 2 and ends at time 5.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-6" value="0"> 3 working days</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-6" value="1"> 4 working days</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-6" value="2"> 5 working days</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="7">
                <p class="font-semibold text-[var(--text-color)]">8. Which statement from the report is a forecast?</p>
                <p class="text-xs text-[var(--text-muted)]">A finished at 2, €2,550 spent so far, project end currently expected at 14.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-7" value="0"> A was actually finished at time 2</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-7" value="1"> The project is expected to end at time 14</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-7" value="2"> €2,550 spent up to the cut-off</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="8">
                <p class="font-semibold text-[var(--text-color)]">9. Which assessment is supported by these figures?</p>
                <p class="text-xs text-[var(--text-muted)]">Planned €2,700, spent €2,550, planned configuration partly missing.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-8" value="0"> The project is demonstrably more economical</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-8" value="1"> All project goals were achieved</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-8" value="2"> The lower cash outflow alone proves no saving</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="9">
                <p class="font-semibold text-[var(--text-color)]">10. Which criterion unambiguously verifies this requirement?</p>
                <p class="text-xs text-[var(--text-muted)]">Every newly created ticket must automatically receive a unique ticket number.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-9" value="0"> Ten newly created test tickets each receive a unique number</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-9" value="1"> The ticketing system looks modern</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-9" value="2"> Staff find the interface appealing</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="10">
                <p class="font-semibold text-[var(--text-color)]">11. What are TF and FF of B?</p>
                <p class="text-xs text-[var(--text-muted)]">EAS = 2, LFS = 3, EAF = 4; successor D has EAS = 5.</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-10" value="0"> TF = 1 day and FF = 1 day</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-10" value="1"> TF = 3 days and FF = 5 days</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-10" value="2"> TF = 0 days and FF = 1 day</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="11">
                <p class="font-semibold text-[var(--text-color)]">12. Which check shows whether the support goals were achieved?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-11" value="0"> Only check that the ticketing system opens before launch</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-11" value="1"> Evaluate the KPIs in the defined measurement period after go-live</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="si-11" value="2"> Dispense with any further verification after technical acceptance</label>
              </div>
              <button data-mukb-check="soll-ist" class="px-3 py-1.5 rounded bg-[var(--link-color)] text-white text-sm font-semibold">Check answers</button>
              <button data-mukb-reset="soll-ist" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Reset</button>
              <div class="mukb-quiz-feedback space-y-2 mt-2"></div>
              <p class="mukb-quiz-total text-sm text-[var(--text-muted)]">Not yet evaluated.</p>
            </div>`
        }
    ]
};