// resources/topics/topic_maths_addition.js
// General addition (Addition) with a dedicated section on written addition (Schriftliches Addieren).
// Bilingual (DE/EN) — honours the global data-active-lang toggle.

registerTopic({
    id: 'MathsAddition',

    // ── SUB-CATEGORY ────────────────────────────────────────────
    parentId: 'Mathematics',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-plus',
    titleDe: 'Addition',
    titleEn: 'Addition',
    descDe: 'Addition von Kopfrechnen bis schriftlich: Begriffe, Rechengesetze, Zahlenstrahl, Übertrag und interaktive Animation.',
    descEn: 'Addition from mental math to written form: terms, properties, number line, carrying, and interactive animation.',

    sidebarTitleDe: 'Addition',
    sidebarTitleEn: 'Addition',
    sidebarSubtitleDe: 'Grundrechenarten',
    sidebarSubtitleEn: 'Basic Arithmetic',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'Addition',
        titleEn: 'Addition',
        introDe: 'Die Addition ist die erste und grundlegendste der vier Grundrechenarten. Diese Seite führt von den <strong>Begriffen</strong> (Summand, Summe, Pluszeichen) über die <strong>Rechengesetze</strong> (Kommutativ-, Assoziativgesetz) und den <strong>Zahlenstrahl</strong> bis zum <strong>schriftlichen Addieren mit Übertrag</strong> — inklusive <strong>interaktiver Animation</strong>, die jeden Schritt erklärt.',
        introEn: 'Addition is the first and most fundamental of the four basic arithmetic operations. This page covers the <strong>terms</strong> (addend, sum, plus sign), the <strong>laws</strong> (commutative, associative), the <strong>number line</strong>, and <strong>written addition with carrying</strong> — including an <strong>interactive animation</strong> that explains every step.'
    },

    quickLinks: [
        { icon: 'fa-lightbulb',            href: '#section1',  switchToDoc: true, labelDe: 'Grundlagen',         labelEn: 'Basics' },
        { icon: 'fa-scale-balanced',       href: '#section2',  switchToDoc: true, labelDe: 'Rechengesetze',      labelEn: 'Properties' },
        { icon: 'fa-arrow-up',             href: '#section3',  switchToDoc: true, labelDe: 'Der Übertrag',       labelEn: 'Carrying' },
        { icon: 'fa-list-ol',              href: '#section4',  switchToDoc: true, labelDe: 'Schritt für Schritt', labelEn: 'Step by Step' },
        { icon: 'fa-triangle-exclamation', href: '#section5',  switchToDoc: true, labelDe: 'Häufige Fehler',     labelEn: 'Common Mistakes' },
        { icon: 'fa-film',                 href: '#section6',  switchToDoc: true, labelDe: 'Visualisierungen',   labelEn: 'Visualizations' }
    ],

    sections: [

        /* ============================================================
           SECTION 1 — BASICS
           ============================================================ */
        {
            id: 'section1',
            titleDe: 'Grundlagen',
            titleEn: 'Basics',
            introDe: 'Was bedeutet Addieren überhaupt? Begriffe, Schreibweise und der Zahlenstrahl.',
            introEn: 'What does adding mean? Terms, notation, and the number line.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Addition?',
                    titleEn: 'What Is Addition?',
                    htmlDe: `
                    <p class="text-xs mb-2">Die <strong>Addition</strong> ist das Zusammenzählen von zwei oder mehr Zahlen. Man schreibt sie mit dem <strong>Pluszeichen</strong> <code>+</code>. Addieren heißt: zu einer Zahl eine andere <em>hinzufügen</em> — die Menge wird größer.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        3 + 4 = 7
                    </div>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Begriff</th><th>Bedeutung</th><th>Im Beispiel 3 + 4 = 7</th></tr>
                    <tr><td><strong>Summand</strong></td><td class="text-[var(--text-muted)]">Eine Zahl, die addiert wird</td><td class="text-[var(--text-muted)]">3 und 4</td></tr>
                    <tr><td><strong>Summe</strong></td><td class="text-[var(--text-muted)]">Das Ergebnis der Addition</td><td class="text-[var(--text-muted)]">7</td></tr>
                    <tr><td><strong>Pluszeichen</strong></td><td class="text-[var(--text-muted)]">Rechenzeichen der Addition</td><td class="text-[var(--text-muted)]">+</td></tr>
                    <tr><td><strong>Gleichheitszeichen</strong></td><td class="text-[var(--text-muted)]">Trennt Aufgabe und Ergebnis</td><td class="text-[var(--text-muted)]">=</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Es können auch mehr als zwei Summanden addiert werden: <code>2 + 5 + 8 + 1 = 16</code>. Alle Zahlen zusammen heißen ebenfalls Summanden, das Ergebnis wieder Summe.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>Addition</strong> is the act of combining two or more numbers. It is written with the <strong>plus sign</strong> <code>+</code>. Adding means: <em>adding</em> one number to another — the total grows.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        3 + 4 = 7
                    </div>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Term</th><th>Meaning</th><th>In the example 3 + 4 = 7</th></tr>
                    <tr><td><strong>Addend</strong></td><td class="text-[var(--text-muted)]">A number that is added</td><td class="text-[var(--text-muted)]">3 and 4</td></tr>
                    <tr><td><strong>Sum</strong></td><td class="text-[var(--text-muted)]">The result of the addition</td><td class="text-[var(--text-muted)]">7</td></tr>
                    <tr><td><strong>Plus sign</strong></td><td class="text-[var(--text-muted)]">Operator of addition</td><td class="text-[var(--text-muted)]">+</td></tr>
                    <tr><td><strong>Equals sign</strong></td><td class="text-[var(--text-muted)]">Separates problem and result</td><td class="text-[var(--text-muted)]">=</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">More than two addends are possible: <code>2 + 5 + 8 + 1 = 16</code>. All numbers together are also called addends; the result is again the sum.</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Kopfrechnen vs. schriftlich',
                    titleEn: 'Mental Math vs. Written',
                    htmlDe: `
                    <p class="text-xs mb-2">Je nach Größe der Zahlen wählt man die passende Methode. Für kleine Zahlen reicht Kopfrechnen, für große wird schriftlich gerechnet.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Methode</th><th>Geeignet für</th><th>Beispiel</th></tr>
                    <tr><td><strong>Kopfrechnen</strong></td><td class="text-[var(--text-muted)]">Ein- und kleine zweistellige Zahlen</td><td class="text-[var(--text-muted)]">7 + 8, 13 + 24</td></tr>
                    <tr><td><strong>Zerlegen / Ergänzen</strong></td><td class="text-[var(--text-muted)]">Zweistellige Zahlen geschickt umformen</td><td class="text-[var(--text-muted)]">47 + 28 = 47 + 30 − 2</td></tr>
                    <tr><td><strong>Schriftlich</strong></td><td class="text-[var(--text-muted)]">Beliebig große Zahlen</td><td class="text-[var(--text-muted)]">4873 + 1659</td></tr>
                    <tr><td><strong>Taschenrechner</strong></td><td class="text-[var(--text-muted)]">Wenn Geschwindigkeit zählt</td><td class="text-[var(--text-muted)]">große Summen</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">In der Schule lernst du das schriftliche Rechnen nicht, weil du keinen Taschenrechner hast, sondern weil du dadurch das <strong>Stellenwertsystem</strong> wirklich verstehst.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Depending on the size of the numbers, you pick the right method. Small numbers can be done mentally; large ones are written down.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Method</th><th>Suitable for</th><th>Example</th></tr>
                    <tr><td><strong>Mental math</strong></td><td class="text-[var(--text-muted)]">One- and small two-digit numbers</td><td class="text-[var(--text-muted)]">7 + 8, 13 + 24</td></tr>
                    <tr><td><strong>Split / adjust</strong></td><td class="text-[var(--text-muted)]">Cleverly reshape two-digit numbers</td><td class="text-[var(--text-muted)]">47 + 28 = 47 + 30 − 2</td></tr>
                    <tr><td><strong>Written</strong></td><td class="text-[var(--text-muted)]">Arbitrarily large numbers</td><td class="text-[var(--text-muted)]">4873 + 1659</td></tr>
                    <tr><td><strong>Calculator</strong></td><td class="text-[var(--text-muted)]">When speed matters</td><td class="text-[var(--text-muted)]">large sums</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">In school you learn written calculation not because you lack a calculator, but because it makes you truly understand the <strong>place value system</strong>.</p>
                    `
                },
                {
                    id: 'subsection1_3',
                    titleDe: 'Addition am Zahlenstrahl',
                    titleEn: 'Addition on the Number Line',
                    htmlDe: `
                    <p class="text-xs mb-2">Anschaulich ist Addieren ein <strong>Weitergehen nach rechts</strong> auf dem Zahlenstrahl. <code>3 + 4</code> heißt: Starte bei 3 und gehe 4 Schritte nach rechts — du landest bei 7.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-7 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        0 ── 1 ── 2 ── <strong>3</strong> ── 4 ── 5 ── 6 ── <strong>7</strong> ── 8<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─── +4 ────┘
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li>Startpunkt: der erste Summand (hier 3).</li>
                        <li>Pfeil nach rechts: Länge des zweiten Summanden (hier 4 Schritte).</li>
                        <li>Endpunkt: die Summe (hier 7).</li>
                        <li>Addition ist die einzige der vier Grundrechenarten, die <strong>ohne Vorzeichenwechsel</strong> immer weiter nach rechts führt — solange nur positive Zahlen addiert werden.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Visually, addition is <strong>walking right</strong> on the number line. <code>3 + 4</code> means: start at 3 and take 4 steps right — you land at 7.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-7 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        0 ── 1 ── 2 ── <strong>3</strong> ── 4 ── 5 ── 6 ── <strong>7</strong> ── 8<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─── +4 ────┘
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li>Starting point: the first addend (here 3).</li>
                        <li>Arrow to the right: length of the second addend (here 4 steps).</li>
                        <li>End point: the sum (here 7).</li>
                        <li>Addition is the only one of the four basic operations that <strong>never changes sign</strong> when adding positive numbers — it always moves further right.</li>
                    </ul>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 2 — PROPERTIES
           ============================================================ */
        {
            id: 'section2',
            titleDe: 'Rechengesetze',
            titleEn: 'Properties',
            introDe: 'Drei Gesetze machen das Addieren flexibel: Vertauschungs-, Verbindungs- und die Rolle der Null.',
            introEn: 'Three laws make addition flexible: commutative, associative, and the role of zero.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Kommutativgesetz (Vertauschungsgesetz)',
                    titleEn: 'Commutative Law',
                    htmlDe: `
                    <p class="text-xs mb-2">Beim Addieren darf man die Reihenfolge der Summanden <strong>beliebig vertauschen</strong> — das Ergebnis bleibt gleich.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        a + b = b + a
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Beispiel: <code>3 + 4 = 7</code> und <code>4 + 3 = 7</code>. Praktisch beim Kopfrechnen: Oft ist <code>9 + 2</code> leichter als <code>2 + 9</code>, weil man von der größeren Zahl aus weiterzählt.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The order of addends can be <strong>swapped freely</strong> — the result stays the same.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        a + b = b + a
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Example: <code>3 + 4 = 7</code> and <code>4 + 3 = 7</code>. Useful for mental math: <code>9 + 2</code> is often easier than <code>2 + 9</code> because you count on from the larger number.</p>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Assoziativgesetz (Verbindungsgesetz)',
                    titleEn: 'Associative Law',
                    htmlDe: `
                    <p class="text-xs mb-2">Bei drei oder mehr Summanden darf man <strong>beliebig Klammern setzen</strong> — das Ergebnis bleibt gleich.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        (a + b) + c = a + (b + c)
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Beispiel: <code>(2 + 8) + 5 = 10 + 5 = 15</code> und <code>2 + (8 + 5) = 2 + 13 = 15</code>. Klammert man geschickt, kann man oft <strong>runde Zehner</strong> bilden und schneller rechnen.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">With three or more addends, you may <strong>set parentheses anywhere</strong> — the result stays the same.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        (a + b) + c = a + (b + c)
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Example: <code>(2 + 8) + 5 = 10 + 5 = 15</code> and <code>2 + (8 + 5) = 2 + 13 = 15</code>. Choosing parentheses wisely often lets you build <strong>round tens</strong> and calculate faster.</p>
                    `
                },
                {
                    id: 'subsection2_3',
                    titleDe: 'Null als neutrales Element',
                    titleEn: 'Zero as the Neutral Element',
                    htmlDe: `
                    <p class="text-xs mb-2">Die <strong>Null</strong> verändert eine Summe nicht: <code>a + 0 = a</code>. Sie ist das <em>neutrale Element</em> der Addition. Auch beim schriftlichen Addieren kann eine 0 in einer Spalte stehen — sie zählt einfach mit.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        7 + 0 = 7<br>
                        25 + 0 = 25
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Verwechslungsgefahr:</strong> Bei der <em>Multiplikation</em> ist die 1 das neutrale Element, bei der Addition ist es die 0.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>Zero</strong> does not change a sum: <code>a + 0 = a</code>. It is the <em>neutral element</em> of addition. Even in written addition a 0 can sit in a column — it simply counts along.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        7 + 0 = 7<br>
                        25 + 0 = 25
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Do not confuse:</strong> In <em>multiplication</em> the neutral element is 1; in addition it is 0.
                    </div>
                    `
                },
                {
                    id: 'subsection2_4',
                    titleDe: 'Überschlag und Kontrolle',
                    titleEn: 'Estimation and Checking',
                    htmlDe: `
                    <p class="text-xs mb-2">Bevor man schriftlich addiert, ist ein <strong>Überschlag</strong> sinnvoll. Man rundet die Summanden grob und prüft später, ob das Ergebnis in der richtigen Größenordnung liegt.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        4873 + 1659 ≈ 4900 + 1700 = 6600<br>
                        Exakt: 6532 ✓ (Größenordnung passt)
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li>Summanden auf runde Hunderter oder Tausender runden.</li>
                        <li>Überschlag mental addieren.</li>
                        <li>Nach der schriftlichen Rechnung: Liegt das exakte Ergebnis in der Nähe?</li>
                        <li>Weicht es stark ab → Rechen- oder Übertragsfehler prüfen.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Before adding on paper, an <strong>estimate</strong> is worthwhile. Round the addends roughly, then check later that the result is in the right ballpark.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        4873 + 1659 ≈ 4900 + 1700 = 6600<br>
                        Exact: 6532 ✓ (magnitude fits)
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li>Round the addends to round hundreds or thousands.</li>
                        <li>Add the estimate mentally.</li>
                        <li>After the written calculation: is the exact result close?</li>
                        <li>If it deviates strongly → look for a calculation or carry error.</li>
                    </ul>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 3 — CARRYING
           ============================================================ */
        {
            id: 'section3',
            titleDe: 'Der Übertrag',
            titleEn: 'Carrying',
            introDe: 'Das Herzstück des schriftlichen Addierens: Was passiert, wenn eine Spalte größer als 9 wird?',
            introEn: 'The heart of written addition: what happens when a column exceeds 9?',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Was ist ein Übertrag?',
                    titleEn: 'What Is a Carry?',
                    htmlDe: `
                    <p class="text-xs mb-2">Wenn du in einer Spalte zwei Ziffern addierst und das Ergebnis <strong>größer als 9</strong> ist, passt es nicht mehr in eine einzelne Ziffer. Die <strong>Zehnerstelle</strong> dieser Summe wird dann als <strong>Übertrag</strong> in die nächste Spalte geschrieben.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Übertrag<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        + 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Beispiel: 3 + 9 = 12. Die <strong>2</strong> schreibst du ins Ergebnis, die <strong>1</strong> als Übertrag in die nächste (Zehner-)Spalte.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">When you add two digits in a column and the result is <strong>greater than 9</strong>, it no longer fits in a single digit. The <strong>tens digit</strong> of that sum is written as a <strong>carry</strong> into the next column.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← carry<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        + 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Example: 3 + 9 = 12. You write the <strong>2</strong> into the result, the <strong>1</strong> as a carry into the next (tens) column.</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Übertrag richtig notieren',
                    titleEn: 'Notating the Carry Correctly',
                    htmlDe: `
                    <p class="text-xs mb-2">Der Übertrag wird <strong>klein über die nächste Spalte</strong> geschrieben. In der Animation erscheint er in <span class="text-red-400 font-bold">rot</span> oberhalb des Strichs.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Immer <strong>über</strong> den Strich schreiben, nicht darunter.</li>
                        <li>Klein halten, damit er nicht mit den Ziffern verwechselt wird.</li>
                        <li>In der nächsten Spalte <strong>mitrechnen</strong> — das ist der häufigste Fehler.</li>
                        <li>Am Ende kann noch ein Übertrag übrig bleiben: Dann schreibst du ihn direkt ins Ergebnis.</li>
                    </ul>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Tipp:</strong> Den Übertrag mit Bleistift schreiben, damit du ihn nach der Kontrolle leicht wegradieren kannst.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The carry is written <strong>small above the next column</strong>. In the animation it appears in <span class="text-red-400 font-bold">red</span> above the line.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Always write it <strong>above</strong> the line, not below.</li>
                        <li>Keep it small so it isn't confused with the digits.</li>
                        <li><strong>Include it</strong> when calculating the next column — this is the most common mistake.</li>
                        <li>At the end a carry may remain: write it directly into the result.</li>
                    </ul>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Tip:</strong> Write the carry in pencil so you can easily erase it after checking.
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 4 — STEP BY STEP (schriftlich)
           ============================================================ */
        {
            id: 'section4',
            titleDe: 'Schritt für Schritt',
            titleEn: 'Step by Step',
            introDe: 'Das allgemeine Vorgehen beim schriftlichen Addieren — in vier klaren Schritten, gefolgt von einem vollständigen Beispiel.',
            introEn: 'The general procedure for written addition — in four clear steps, followed by a complete example.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Die vier Schritte',
                    titleEn: 'The Four Steps',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/6">#</th><th>Schritt</th><th>Was du tust</th></tr>
                    <tr><td>1</td><td><strong>Hinschreiben</strong></td><td class="text-[var(--text-muted)]">Zahlen stellengerecht untereinander, + links, Strich darunter.</td></tr>
                    <tr><td>2</td><td><strong>Rechts beginnen</strong></td><td class="text-[var(--text-muted)]">Immer bei den Einern anfangen — nie links!</td></tr>
                    <tr><td>3</td><td><strong>Spalte addieren</strong></td><td class="text-[var(--text-muted)]">Ziffern der Spalte plus eventuellen Übertrag zusammenzählen.</td></tr>
                    <tr><td>4</td><td><strong>Ergebnis & Übertrag</strong></td><td class="text-[var(--text-muted)]">Einerstelle ins Ergebnis, Zehnerstelle als Übertrag in die nächste Spalte.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Am Ende: Steht noch ein Übertrag übrig, direkt ins Ergebnis schreiben — fertig.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/6">#</th><th>Step</th><th>What you do</th></tr>
                    <tr><td>1</td><td><strong>Write it down</strong></td><td class="text-[var(--text-muted)]">Numbers aligned by place value, + on the left, line below.</td></tr>
                    <tr><td>2</td><td><strong>Start on the right</strong></td><td class="text-[var(--text-muted)]">Always begin with the ones — never the left!</td></tr>
                    <tr><td>3</td><td><strong>Add the column</strong></td><td class="text-[var(--text-muted)]">Add the digits in the column plus any carry.</td></tr>
                    <tr><td>4</td><td><strong>Result & carry</strong></td><td class="text-[var(--text-muted)]">Ones digit into the result, tens digit as a carry into the next column.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">At the end: if a carry remains, write it directly into the result — done.</p>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Stellenwerte: Einer, Zehner, Hunderter',
                    titleEn: 'Place Values: Ones, Tens, Hundreds',
                    htmlDe: `
                    <p class="text-xs mb-2">Jede Ziffer in einer Zahl hat einen <strong>Stellenwert</strong>. Das ist die entscheidende Idee hinter dem schriftlichen Rechnen.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Zahl</th><th>Stelle</th><th>Wert</th></tr>
                    <tr><td>4<strong>8</strong>73</td><td class="text-[var(--text-muted)]">Zehner</td><td class="text-[var(--text-muted)]">8 × 10 = 80</td></tr>
                    <tr><td><strong>4</strong>873</td><td class="text-[var(--text-muted)]">Tausender</td><td class="text-[var(--text-muted)]">4 × 1000 = 4000</td></tr>
                    <tr><td>48<strong>7</strong>3</td><td class="text-[var(--text-muted)]">Hunderter</td><td class="text-[var(--text-muted)]">7 × 100 = 700</td></tr>
                    <tr><td>487<strong>3</strong></td><td class="text-[var(--text-muted)]">Einer</td><td class="text-[var(--text-muted)]">3 × 1 = 3</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Merksatz:</strong> Beim schriftlichen Addieren addierst du <em>immer nur Ziffern mit demselben Stellenwert</em>. Einer zu Einer, Zehner zu Zehner, Hunderter zu Hunderter.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Every digit in a number has a <strong>place value</strong>. This is the key idea behind written calculation.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Number</th><th>Place</th><th>Value</th></tr>
                    <tr><td>4<strong>8</strong>73</td><td class="text-[var(--text-muted)]">Tens</td><td class="text-[var(--text-muted)]">8 × 10 = 80</td></tr>
                    <tr><td><strong>4</strong>873</td><td class="text-[var(--text-muted)]">Thousands</td><td class="text-[var(--text-muted)]">4 × 1000 = 4000</td></tr>
                    <tr><td>48<strong>7</strong>3</td><td class="text-[var(--text-muted)]">Hundreds</td><td class="text-[var(--text-muted)]">7 × 100 = 700</td></tr>
                    <tr><td>487<strong>3</strong></td><td class="text-[var(--text-muted)]">Ones</td><td class="text-[var(--text-muted)]">3 × 1 = 3</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Key rule:</strong> In written addition you <em>only ever add digits of the same place value</em>. Ones to ones, tens to tens, hundreds to hundreds.
                    </div>
                    `
                },
                {
                    id: 'subsection4_3',
                    titleDe: 'Die richtige Schreibweise',
                    titleEn: 'The Correct Layout',
                    htmlDe: `
                    <p class="text-xs mb-2">Bevor du rechnest, schreibst du die Zahlen <strong>stellengerecht untereinander</strong> — Einer unter Einer, Zehner unter Zehner und so weiter. Das ist die häufigste Fehlerquelle.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)]">
                         &nbsp;&nbsp;4 8 7 3<br>
                         + 1 6 5 9<br>
                         ─────────
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mt-3">
                        <li>Beide Zahlen rechtsbündig ausrichten.</li>
                        <li>Das <strong>+</strong>-Zeichen steht links vor der zweiten Zahl.</li>
                        <li>Der Strich trennt Aufgabe und Ergebnis.</li>
                        <li>Bei unterschiedlich langen Zahlen: kürzere Zahl rechtsbündig unter die längere setzen.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Before calculating, write the numbers <strong>aligned by place value</strong> — ones under ones, tens under tens, and so on. This is the most common source of errors.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)]">
                         &nbsp;&nbsp;4 8 7 3<br>
                         + 1 6 5 9<br>
                         ─────────
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mt-3">
                        <li>Align both numbers to the right.</li>
                        <li>The <strong>+</strong> sign goes to the left of the second number.</li>
                        <li>The line separates problem and result.</li>
                        <li>If numbers differ in length: place the shorter one right-aligned under the longer one.</li>
                    </ul>
                    `
                },
                {
                    id: 'subsection4_4',
                    titleDe: 'Vollständiges Beispiel: 4873 + 1659',
                    titleEn: 'Complete Example: 4873 + 1659',
                    htmlDe: `
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;1 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Überträge<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        + 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;6 5 3 2
                    </div>
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Einer:</strong> 3 + 9 = 12 → 2 ins Ergebnis, 1 Übertrag.</li>
                        <li><strong class="text-[var(--text-color)]">Zehner:</strong> 7 + 5 + 1 = 13 → 3 ins Ergebnis, 1 Übertrag.</li>
                        <li><strong class="text-[var(--text-color)]">Hunderter:</strong> 8 + 6 + 1 = 15 → 5 ins Ergebnis, 1 Übertrag.</li>
                        <li><strong class="text-[var(--text-color)]">Tausender:</strong> 4 + 1 + 1 = 6 → 6 ins Ergebnis, kein Übertrag.</li>
                    </ul>
                    <p class="text-xs mt-3">Ergebnis: <strong class="text-green-400">6532</strong></p>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;1 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← carries<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        + 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;6 5 3 2
                    </div>
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Ones:</strong> 3 + 9 = 12 → 2 into result, carry 1.</li>
                        <li><strong class="text-[var(--text-color)]">Tens:</strong> 7 + 5 + 1 = 13 → 3 into result, carry 1.</li>
                        <li><strong class="text-[var(--text-color)]">Hundreds:</strong> 8 + 6 + 1 = 15 → 5 into result, carry 1.</li>
                        <li><strong class="text-[var(--text-color)]">Thousands:</strong> 4 + 1 + 1 = 6 → 6 into result, no carry.</li>
                    </ul>
                    <p class="text-xs mt-3">Result: <strong class="text-green-400">6532</strong></p>
                    `
                },
                {
                    id: 'subsection4_5',
                    titleDe: 'Ausführungsreihenfolge beim Rechnen',
                    titleEn: 'Execution Order While Calculating',
                    htmlDe: `
                    <p class="text-xs mb-2">Die Reihenfolge, in der du die Spalten abarbeitest, ist <strong>nicht</strong> beliebig. Nur von rechts nach links funktioniert der Übertrag korrekt.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Schritt</th><th>Was passiert</th></tr>
                    <tr><td>1</td><td><code>Einer</code></td><td class="text-[var(--text-muted)]">Rechte Spalte addieren, Übertrag ggf. notieren</td></tr>
                    <tr><td>2</td><td><code>Zehner</code></td><td class="text-[var(--text-muted)]">Nächste Spalte inkl. Übertrag addieren</td></tr>
                    <tr><td>3</td><td><code>Hunderter</code></td><td class="text-[var(--text-muted)]">Nächste Spalte inkl. Übertrag addieren</td></tr>
                    <tr><td>4</td><td><code>Tausender</code></td><td class="text-[var(--text-muted)]">Letzte Spalte inkl. Übertrag addieren</td></tr>
                    <tr><td>5</td><td><code>Letzter Übertrag</code></td><td class="text-[var(--text-muted)]">Falls noch ein Übertrag übrig ist, direkt ins Ergebnis</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The order in which you process the columns is <strong>not</strong> arbitrary. Only right-to-left makes carrying work correctly.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Step</th><th>What happens</th></tr>
                    <tr><td>1</td><td><code>Ones</code></td><td class="text-[var(--text-muted)]">Add the rightmost column, note any carry</td></tr>
                    <tr><td>2</td><td><code>Tens</code></td><td class="text-[var(--text-muted)]">Add the next column including carry</td></tr>
                    <tr><td>3</td><td><code>Hundreds</code></td><td class="text-[var(--text-muted)]">Add the next column including carry</td></tr>
                    <tr><td>4</td><td><code>Thousands</code></td><td class="text-[var(--text-muted)]">Add the last column including carry</td></tr>
                    <tr><td>5</td><td><code>Final carry</code></td><td class="text-[var(--text-muted)]">If a carry remains, write it directly into the result</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 5 — COMMON MISTAKES
           ============================================================ */
        {
            id: 'section5',
            titleDe: 'Häufige Fehler',
            titleEn: 'Common Mistakes',
            introDe: 'Diese Fehler passieren fast allen — und so vermeidest du sie.',
            introEn: 'These mistakes happen to almost everyone — here is how to avoid them.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Die Top 5 Fehlerquellen',
                    titleEn: 'Top 5 Sources of Error',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Fehler</th><th>Was schiefgeht</th><th>So vermeidest du ihn</th></tr>
                    <tr>
                        <td><strong>Falsch ausgerichtet</strong></td>
                        <td class="text-[var(--text-muted)]">Zahlen nicht stellengerecht untereinander → alles verschoben.</td>
                        <td class="text-[var(--text-muted)]">Rechtsbündig ausrichten, kürzere Zahl rechts unter die längere.</td>
                    </tr>
                    <tr>
                        <td><strong>Von links gerechnet</strong></td>
                        <td class="text-[var(--text-muted)]">Überträge funktionieren nur von rechts nach links.</td>
                        <td class="text-[var(--text-muted)]">Immer mit der Einer-Spalte beginnen.</td>
                    </tr>
                    <tr>
                        <td><strong>Übertrag vergessen</strong></td>
                        <td class="text-[var(--text-muted)]">Nächste Spalte wird ohne Übertrag gerechnet.</td>
                        <td class="text-[var(--text-muted)]">Übertrag sichtbar notieren und beim Addieren mitzählen.</td>
                    </tr>
                    <tr>
                        <td><strong>Übertrag doppelt gezählt</strong></td>
                        <td class="text-[var(--text-muted)]">Zahl wird einmal zu viel addiert.</td>
                        <td class="text-[var(--text-muted)]">Pro Spalte nur den Übertrag aus der direkten Vorgängerspalte addieren.</td>
                    </tr>
                    <tr>
                        <td><strong>Letzter Übertrag vergessen</strong></td>
                        <td class="text-[var(--text-muted)]">Ergebnis ist um eine Stelle zu kurz.</td>
                        <td class="text-[var(--text-muted)]">Nach der letzten Spalte prüfen, ob noch ein Übertrag übrig ist.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Mistake</th><th>What goes wrong</th><th>How to avoid it</th></tr>
                    <tr>
                        <td><strong>Misaligned</strong></td>
                        <td class="text-[var(--text-muted)]">Numbers not aligned by place value → everything shifts.</td>
                        <td class="text-[var(--text-muted)]">Align to the right; shorter number right-aligned under the longer one.</td>
                    </tr>
                    <tr>
                        <td><strong>Calculating from the left</strong></td>
                        <td class="text-[var(--text-muted)]">Carries only work from right to left.</td>
                        <td class="text-[var(--text-muted)]">Always start with the ones column.</td>
                    </tr>
                    <tr>
                        <td><strong>Forgetting the carry</strong></td>
                        <td class="text-[var(--text-muted)]">Next column is calculated without the carry.</td>
                        <td class="text-[var(--text-muted)]">Write the carry visibly and include it when adding.</td>
                    </tr>
                    <tr>
                        <td><strong>Counting the carry twice</strong></td>
                        <td class="text-[var(--text-muted)]">A number gets added one time too many.</td>
                        <td class="text-[var(--text-muted)]">Per column, add only the carry from the immediately preceding column.</td>
                    </tr>
                    <tr>
                        <td><strong>Forgetting the final carry</strong></td>
                        <td class="text-[var(--text-muted)]">The result is one digit too short.</td>
                        <td class="text-[var(--text-muted)]">After the last column, check whether a carry remains.</td>
                    </tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 6 — VISUALIZATIONS (interactive animation)
           ============================================================ */
        {
            id: 'section6',
            titleDe: 'Visualisierungen',
            titleEn: 'Visualizations',
            introDe: 'Die interaktive Animation führt Schritt für Schritt durch eine zufällige Additionsaufgabe — jeder Rechenschritt wird links erklärt und rechts in der Rechnung hervorgehoben.',
            introEn: 'The interactive animation walks you through a random addition problem, step by step — each calculation step is explained on the left and highlighted in the calculation on the right.',
            subtopics: [
                {
                    id: 'addition-interactive',
                    titleDe: 'Interaktive Animation',
                    titleEn: 'Interactive Animation',
                    htmlDe: `
                    <p class="text-xs mb-2">Klicke auf <strong>Start</strong>, um Schritt für Schritt durch die Rechnung zu gehen, oder aktiviere <strong>Auto</strong>, um die Animation automatisch ablaufen zu lassen. Mit <strong>Neue Zahlen</strong> würfelst du eine neue Aufgabe.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Start / Weiter:</strong> Nächster Schritt.</li>
                        <li><strong class="text-[var(--text-color)]">Zurück:</strong> Einen Schritt zurückgehen.</li>
                        <li><strong class="text-[var(--text-color)]">Auto:</strong> Automatische Wiedergabe aller Schritte.</li>
                        <li><strong class="text-[var(--text-color)]">Neue Zahlen:</strong> Neue Zufallsaufgabe erzeugen.</li>
                    </ul>

                    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet">

                    <div id="maths-add-app" class="maths-add-app">
                    <style>
                        .maths-add-app {
                            font-family: 'Inter', system-ui, sans-serif;
                            color: var(--text-color);
                        }
                        .maths-add-app .controls {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.75rem;
                            padding: 0.6rem 0.75rem;
                            display: flex;
                            flex-wrap: wrap;
                            gap: 0.5rem;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 0.75rem;
                            box-shadow: var(--control-shadow);
                        }
                        .maths-add-app .controls .title {
                            font-weight: 800;
                            font-size: 0.85rem;
                            color: var(--heading-color);
                            letter-spacing: 0.02em;
                        }
                        .maths-add-app .btn-row {
                            display: flex;
                            gap: 0.4rem;
                            flex-wrap: wrap;
                            align-items: center;
                        }
                        .maths-add-app button {
                            font-family: inherit;
                            font-size: 0.75rem;
                            font-weight: 700;
                            padding: 0.35rem 0.75rem;
                            border-radius: 0.5rem;
                            border: 1px solid var(--panel-border);
                            background: var(--panel-color);
                            color: var(--text-color);
                            cursor: pointer;
                            transition: all 0.15s;
                            display: inline-flex;
                            align-items: center;
                            gap: 0.35rem;
                        }
                        .maths-add-app button:hover {
                            background: var(--code-bg);
                            border-color: var(--link-color);
                        }
                        .maths-add-app button.primary {
                            background: var(--link-color);
                            border-color: var(--link-color);
                            color: #fff;
                        }
                        .maths-add-app button.primary:hover {
                            filter: brightness(1.15);
                        }
                        .maths-add-app button.auto.on {
                            background: rgba(202,138,4,0.2);
                            border-color: #eab308;
                            color: #facc15;
                        }
                        .maths-add-app button:disabled {
                            opacity: 0.4;
                            cursor: not-allowed;
                        }

                        .maths-add-app .panels {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 0.75rem;
                            height: 520px;
                        }
                        @media (max-width: 720px) {
                            .maths-add-app .panels { grid-template-columns: 1fr; height: auto; }
                            .maths-add-app .panels > div { height: 520px; }
                        }

                        .maths-add-app .card {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.75rem;
                            padding: 1rem;
                            position: relative;
                            overflow: hidden;
                            box-shadow: var(--control-shadow);
                        }
                        .maths-add-app .card .label {
                            position: absolute;
                            top: 0.6rem;
                            left: 0.8rem;
                            font-size: 0.6rem;
                            font-weight: 800;
                            letter-spacing: 0.15em;
                            text-transform: uppercase;
                            color: var(--text-muted);
                        }
                        .maths-add-app .explain {
                            overflow-y: auto;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 1.25rem;
                            line-height: 1.8;
                            padding-top: 1.5rem;
                        }
                        .maths-add-app .explain::-webkit-scrollbar { width: 8px; }
                        .maths-add-app .explain::-webkit-scrollbar-thumb {
                            background: var(--panel-border);
                            border-radius: 10px;
                        }
                        .maths-add-app .calc {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-top: 1.5rem;
                        }

                        .maths-add-app .math-grid {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 2.4rem;
                            font-weight: 600;
                            display: grid;
                            gap: 0.15rem;
                            letter-spacing: 0.05em;
                            color: var(--text-color);
                        }
                        .maths-add-app .cell {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                            border-radius: 0.5rem;
                        }
                        .maths-add-app .cell.plus { color: var(--link-color); }
                        .maths-add-app .cell.carry-wrap {
                            align-items: flex-end;
                            padding-bottom: 4px;
                            border-bottom: 3px solid var(--panel-border);
                        }
                        .maths-add-app .cell.carry {
                            font-size: 1.2rem;
                            color: #f87171;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(8px);
                            transition: all 0.5s ease;
                        }
                        .maths-add-app .cell.carry.show { opacity: 1; transform: translateY(0); }
                        .maths-add-app .cell.res {
                            color: #4ade80;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(8px);
                            transition: all 0.5s ease;
                        }
                        .maths-add-app .cell.res.show { opacity: 1; transform: translateY(0); }

                        .maths-add-app .hl-col   { background: rgba(127,127,127,0.12); }
                        .maths-add-app .hl-carry { background: rgba(248,113,113,0.18); }
                        .maths-add-app .hl-cell  { background: rgba(127,127,127,0.20); }
                        .maths-add-app .hl-border { border-bottom-color: var(--link-color) !important; }

                        .maths-add-app .step { margin-bottom: 1.4rem; display: none; }
                        .maths-add-app .step.visible { display: block; }
                        .maths-add-app .step .title {
                            font-weight: 700;
                            font-size: 1.65rem;
                            color: var(--heading-color);
                            margin-bottom: 0.3rem;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                        .maths-add-app .step .body { color: var(--text-color); }
                        .maths-add-app .step .action { color: var(--link-color); margin-top: 0.4rem; }
                        .maths-add-app .anim-el {
                            display: inline-block;
                            opacity: 0;
                            clip-path: inset(0 100% 0 0);
                            white-space: nowrap;
                        }
                        .maths-add-app .anim-el.revealed {
                            opacity: 1;
                            clip-path: inset(0 0 0 0);
                            transition: clip-path 0.6s cubic-bezier(0.4,0,0.2,1);
                        }
                        .maths-add-app .anim-el.fast.revealed { transition-duration: 0.3s; }
                        .maths-add-app .hl-text {
                            background: rgba(59,130,246,0.22);
                            border-radius: 0.25rem;
                        }
                        .maths-add-app .inline-eq {
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
                            gap: 0.1rem;
                        }
                        .maths-add-app .inline-eq span {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                    </style>

                    <div class="controls">
                        <div class="title" data-lang-de>Schriftliches Addieren</div>
                        <div class="title" data-lang-en style="display:none;">Written Addition</div>
                        <div class="btn-row">
                            <button onclick="MathsAdd.newProblem()">
                                <span data-lang-de>Neue Zahlen</span><span data-lang-en style="display:none;">New Numbers</span>
                            </button>
                            <button id="mathsadd-auto" class="auto" onclick="MathsAdd.toggleAuto()">▶ Auto</button>
                            <button id="mathsadd-prev" onclick="MathsAdd.prev()" disabled>← <span data-lang-de>Zurück</span><span data-lang-en style="display:none;">Back</span></button>
                            <button id="mathsadd-next" class="primary" onclick="MathsAdd.next()">
                                <span data-lang-de>Start</span><span data-lang-en style="display:none;">Start</span> →
                            </button>
                        </div>
                    </div>

                    <div class="panels">
                        <div class="card explain">
                            <div class="label" data-lang-de>Erklärungen</div>
                            <div class="label" data-lang-en style="display:none;">Explanations</div>
                            <div id="mathsadd-explain"></div>
                        </div>
                        <div class="card calc">
                            <div class="label" data-lang-de>Rechnung</div>
                            <div class="label" data-lang-en style="display:none;">Calculation</div>
                            <div id="mathsadd-grid" class="math-grid"></div>
                        </div>
                    </div>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Click <strong>Start</strong> to step through the calculation, or enable <strong>Auto</strong> to let the animation run by itself. Use <strong>New Numbers</strong> to roll a fresh problem.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Start / Next:</strong> Next step.</li>
                        <li><strong class="text-[var(--text-color)]">Back:</strong> Go one step back.</li>
                        <li><strong class="text-[var(--text-color)]">Auto:</strong> Automatic playback of all steps.</li>
                        <li><strong class="text-[var(--text-color)]">New Numbers:</strong> Generate a new random problem.</li>
                    </ul>

                    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet">

                    <div id="maths-add-app" class="maths-add-app">
                    <style>
                        .maths-add-app {
                            font-family: 'Inter', system-ui, sans-serif;
                            color: var(--text-color);
                        }
                        .maths-add-app .controls {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.75rem;
                            padding: 0.6rem 0.75rem;
                            display: flex;
                            flex-wrap: wrap;
                            gap: 0.5rem;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 0.75rem;
                            box-shadow: var(--control-shadow);
                        }
                        .maths-add-app .controls .title {
                            font-weight: 800;
                            font-size: 0.85rem;
                            color: var(--heading-color);
                            letter-spacing: 0.02em;
                        }
                        .maths-add-app .btn-row {
                            display: flex;
                            gap: 0.4rem;
                            flex-wrap: wrap;
                            align-items: center;
                        }
                        .maths-add-app button {
                            font-family: inherit;
                            font-size: 0.75rem;
                            font-weight: 700;
                            padding: 0.35rem 0.75rem;
                            border-radius: 0.5rem;
                            border: 1px solid var(--panel-border);
                            background: var(--panel-color);
                            color: var(--text-color);
                            cursor: pointer;
                            transition: all 0.15s;
                            display: inline-flex;
                            align-items: center;
                            gap: 0.35rem;
                        }
                        .maths-add-app button:hover {
                            background: var(--code-bg);
                            border-color: var(--link-color);
                        }
                        .maths-add-app button.primary {
                            background: var(--link-color);
                            border-color: var(--link-color);
                            color: #fff;
                        }
                        .maths-add-app button.primary:hover {
                            filter: brightness(1.15);
                        }
                        .maths-add-app button.auto.on {
                            background: rgba(202,138,4,0.2);
                            border-color: #eab308;
                            color: #facc15;
                        }
                        .maths-add-app button:disabled {
                            opacity: 0.4;
                            cursor: not-allowed;
                        }

                        .maths-add-app .panels {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 0.75rem;
                            height: 520px;
                        }
                        @media (max-width: 720px) {
                            .maths-add-app .panels { grid-template-columns: 1fr; height: auto; }
                            .maths-add-app .panels > div { height: 520px; }
                        }

                        .maths-add-app .card {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.75rem;
                            padding: 1rem;
                            position: relative;
                            overflow: hidden;
                            box-shadow: var(--control-shadow);
                        }
                        .maths-add-app .card .label {
                            position: absolute;
                            top: 0.6rem;
                            left: 0.8rem;
                            font-size: 0.6rem;
                            font-weight: 800;
                            letter-spacing: 0.15em;
                            text-transform: uppercase;
                            color: var(--text-muted);
                        }
                        .maths-add-app .explain {
                            overflow-y: auto;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 1.25rem;
                            line-height: 1.8;
                            padding-top: 1.5rem;
                        }
                        .maths-add-app .explain::-webkit-scrollbar { width: 8px; }
                        .maths-add-app .explain::-webkit-scrollbar-thumb {
                            background: var(--panel-border);
                            border-radius: 10px;
                        }
                        .maths-add-app .calc {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-top: 1.5rem;
                        }

                        .maths-add-app .math-grid {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 2.4rem;
                            font-weight: 600;
                            display: grid;
                            gap: 0.15rem;
                            letter-spacing: 0.05em;
                            color: var(--text-color);
                        }
                        .maths-add-app .cell {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                            border-radius: 0.5rem;
                        }
                        .maths-add-app .cell.plus { color: var(--link-color); }
                        .maths-add-app .cell.carry-wrap {
                            align-items: flex-end;
                            padding-bottom: 4px;
                            border-bottom: 3px solid var(--panel-border);
                        }
                        .maths-add-app .cell.carry {
                            font-size: 1.2rem;
                            color: #f87171;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(8px);
                            transition: all 0.5s ease;
                        }
                        .maths-add-app .cell.carry.show { opacity: 1; transform: translateY(0); }
                        .maths-add-app .cell.res {
                            color: #4ade80;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(8px);
                            transition: all 0.5s ease;
                        }
                        .maths-add-app .cell.res.show { opacity: 1; transform: translateY(0); }

                        .maths-add-app .hl-col   { background: rgba(127,127,127,0.12); }
                        .maths-add-app .hl-carry { background: rgba(248,113,113,0.18); }
                        .maths-add-app .hl-cell  { background: rgba(127,127,127,0.20); }
                        .maths-add-app .hl-border { border-bottom-color: var(--link-color) !important; }

                        .maths-add-app .step { margin-bottom: 1.4rem; display: none; }
                        .maths-add-app .step.visible { display: block; }
                        .maths-add-app .step .title {
                            font-weight: 700;
                            font-size: 1.65rem;
                            color: var(--heading-color);
                            margin-bottom: 0.3rem;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                        .maths-add-app .step .body { color: var(--text-color); }
                        .maths-add-app .step .action { color: var(--link-color); margin-top: 0.4rem; }
                        .maths-add-app .anim-el {
                            display: inline-block;
                            opacity: 0;
                            clip-path: inset(0 100% 0 0);
                            white-space: nowrap;
                        }
                        .maths-add-app .anim-el.revealed {
                            opacity: 1;
                            clip-path: inset(0 0 0 0);
                            transition: clip-path 0.6s cubic-bezier(0.4,0,0.2,1);
                        }
                        .maths-add-app .anim-el.fast.revealed { transition-duration: 0.3s; }
                        .maths-add-app .hl-text {
                            background: rgba(59,130,246,0.22);
                            border-radius: 0.25rem;
                        }
                        .maths-add-app .inline-eq {
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
                            gap: 0.1rem;
                        }
                        .maths-add-app .inline-eq span {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                    </style>

                    <div class="controls">
                        <div class="title">Written Addition</div>
                        <div class="btn-row">
                            <button onclick="MathsAdd.newProblem()">New Numbers</button>
                            <button id="mathsadd-auto" class="auto" onclick="MathsAdd.toggleAuto()">▶ Auto</button>
                            <button id="mathsadd-prev" onclick="MathsAdd.prev()" disabled>← Back</button>
                            <button id="mathsadd-next" class="primary" onclick="MathsAdd.next()">Start →</button>
                        </div>
                    </div>

                    <div class="panels">
                        <div class="card explain">
                            <div class="label">Explanations</div>
                            <div id="mathsadd-explain"></div>
                        </div>
                        <div class="card calc">
                            <div class="label">Calculation</div>
                            <div id="mathsadd-grid" class="math-grid"></div>
                        </div>
                    </div>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           TLDR
           ============================================================ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Das Wichtigste auf einen Blick.',
            introEn: 'The essentials at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Zusammenfassung',
                    titleEn: 'Summary',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-plus text-lg opacity-90"></i>
                                <span>1. Begriffe</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Summand + Summand = Summe</strong>. Das Pluszeichen <code>+</code> verbindet die Summanden.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-scale-balanced text-lg opacity-90"></i>
                                <span>2. Rechengesetze</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Kommutativ</strong> (a+b=b+a), <strong>assoziativ</strong> ((a+b)+c=a+(b+c)), <strong>Null</strong> als neutrales Element.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-arrow-up text-lg opacity-90"></i>
                                <span>3. Übertrag</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Spaltensumme &gt; 9 → <strong>Zehnerstelle</strong> klein über die nächste Spalte schreiben und dort mitrechnen.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-circle-check text-lg opacity-90"></i>
                                <span>4. Kontrolle</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Erst <strong>überschlagen</strong>, dann schriftlich rechnen, am Ende letzten Übertrag prüfen.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-plus text-lg opacity-90"></i>
                                <span>1. Terms</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Addend + addend = sum</strong>. The plus sign <code>+</code> connects the addends.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-scale-balanced text-lg opacity-90"></i>
                                <span>2. Properties</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Commutative</strong> (a+b=b+a), <strong>associative</strong> ((a+b)+c=a+(b+c)), <strong>zero</strong> as neutral element.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-arrow-up text-lg opacity-90"></i>
                                <span>3. Carry</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Column sum &gt; 9 → write the <strong>tens digit</strong> small above the next column and include it there.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-circle-check text-lg opacity-90"></i>
                                <span>4. Check</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                First <strong>estimate</strong>, then calculate on paper, finally check the last carry.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    links: {
        titleDe: 'Weiterführende Ressourcen',
        titleEn: 'Further Resources',
        items: [
            { icon: 'fa-wikipedia-w',    href: 'https://de.wikipedia.org/wiki/Addition', target: '_blank', labelDe: 'Wikipedia: Addition', labelEn: 'Wikipedia: Addition' },
            { icon: 'fa-wikipedia-w',    href: 'https://de.wikipedia.org/wiki/Schriftliche_Addition', target: '_blank', labelDe: 'Wikipedia: Schriftliche Addition', labelEn: 'Wikipedia: Written Addition' },
            { icon: 'fa-graduation-cap', href: 'https://www.mathematik.de/', target: '_blank', labelDe: 'Mathematik.de — Grundrechenarten', labelEn: 'Mathematik.de — Basic Arithmetic' },
            { icon: 'fa-calculator',     href: 'https://www.arndt-bruenner.de/mathe/scripts/schriftlichaddieren.htm', target: '_blank', labelDe: 'Übungsaufgaben schriftliches Addieren', labelEn: 'Written Addition Practice' }
        ]
    },

    footer: {
        textDe: 'Mathematik · Addition · 2026',
        textEn: 'Mathematics · Addition · 2026'
    }
});

/* ══════════════════════════════════════════════════════════════════
   INTERACTIVE ANIMATION ENGINE (hardcoded, no iframe)
   ══════════════════════════════════════════════════════════════════ */
(function () {
    const placeNames = ["Einer", "Zehner", "Hunderter", "Tausender", "Zehntausender", "Hunderttausender"];
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const state = {
        currentStep: -1,
        steps: [],
        isAnimating: false,
        isAutoPlaying: false,
        autoTimeout: null,
        num1: 0,
        num2: 0,
        cols: 0,
        aArr: [],
        bArr: [],
        initialised: false,
    };

    function $(id) { return document.getElementById(id); }

    function stopAuto() {
        state.isAutoPlaying = false;
        clearTimeout(state.autoTimeout);
        updateAutoBtn();
    }

    function updateAutoBtn() {
        const btn = $('mathsadd-auto');
        if (!btn) return;
        if (state.isAutoPlaying) {
            btn.classList.add('on');
            btn.innerHTML = '❚❚ Auto';
        } else {
            btn.classList.remove('on');
            btn.innerHTML = '▶ Auto';
        }
    }

    function updateButtons() {
        const next = $('mathsadd-next');
        const prev = $('mathsadd-prev');
        if (!next || !prev) return;

        prev.disabled = state.currentStep <= 0;

        if (state.currentStep >= state.steps.length) {
            next.innerHTML = '↻ <span data-lang-de>Neustart</span><span data-lang-en style="display:none;">Restart</span>';
        } else if (state.currentStep === -1) {
            next.innerHTML = '<span data-lang-de>Start</span><span data-lang-en style="display:none;">Start</span> →';
        } else {
            next.innerHTML = '<span data-lang-de>Weiter</span><span data-lang-en style="display:none;">Next</span> →';
        }
        if (window.applyLanguage) window.applyLanguage();
    }

    function clearHighlights() {
        document.querySelectorAll('.maths-add-app .hl-col, .maths-add-app .hl-carry, .maths-add-app .hl-cell, .maths-add-app .hl-border, .maths-add-app .hl-text')
            .forEach(e => e.classList.remove('hl-col', 'hl-carry', 'hl-cell', 'hl-border', 'hl-text'));
    }

    function renderGrid() {
        const grid = $('mathsadd-grid');
        if (!grid) return;
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${state.cols}, minmax(2.5rem, 3.5rem))`;

        for (let i = 0; i < state.cols; i++) {
            const v = state.aArr[i] === ' ' ? '&nbsp;' : state.aArr[i];
            grid.innerHTML += `<div class="cell" id="col-${i}-r0">${v}</div>`;
        }
        for (let i = 0; i < state.cols; i++) {
            const raw = state.bArr[i];
            const v = raw === ' ' ? '&nbsp;' : raw;
            const cls = raw === '+' ? 'cell plus' : 'cell';
            grid.innerHTML += `<div class="${cls}" id="col-${i}-r1">${v}</div>`;
        }
        for (let i = 0; i < state.cols; i++) {
            grid.innerHTML += `
                <div class="cell carry-wrap" id="col-${i}-carry-wrap">
                    <span class="carry" id="col-${i}-carry"></span>
                </div>`;
        }
        for (let i = 0; i < state.cols; i++) {
            grid.innerHTML += `<div class="cell res" id="col-${i}-res"></div>`;
        }
    }

    function renderExplanations() {
        const box = $('mathsadd-explain');
        if (!box) return;
        box.innerHTML = '';

        box.innerHTML += `
            <div class="step" id="mathsadd-step-0">
                <div class="title">
                    <span data-lang-de>Aufgabe</span><span data-lang-en style="display:none;">Task</span>
                </div>
                <div class="body">
                    <span data-lang-de>Addiere</span><span data-lang-en style="display:none;">Add</span>
                    <strong>${state.num1}</strong>
                    <span data-lang-de>und</span><span data-lang-en style="display:none;">and</span>
                    <strong>${state.num2}</strong>.
                </div>
                <div class="action">
                    <span data-lang-de>Wir beginnen immer ganz rechts! 👉</span>
                    <span data-lang-en style="display:none;">We always start on the far right! 👉</span>
                </div>
            </div>`;

        state.steps.forEach((step, i) => {
            const id = i + 1;
            box.innerHTML += `
                <div class="step" id="mathsadd-step-${id}">
                    ${step.expTitle}
                    ${step.expText}
                    ${step.expAction}
                </div>`;
        });

        if (window.applyLanguage) window.applyLanguage();
    }

    function buildSteps() {
        const aStr = state.num1.toString();
        const bStr = state.num2.toString();
        state.cols = Math.max(aStr.length, bStr.length) + 1;

        state.aArr = aStr.padStart(state.cols, ' ').split('');
        state.bArr = bStr.padStart(state.cols - 1, ' ').split('');
        state.bArr.unshift('+');

        state.steps = [];
        let carry = 0;
        let stepIdx = 1;

        const wrapCell = (text, col, rowStr, cls) =>
            `<span class="${cls}">${text}</span>`;
        const wrapCol = (text, col, cls) =>
            `<span class="${cls}">${text}</span>`;

        for (let c = state.cols - 1; c > 0; c--) {
            const digitA = parseInt(state.aArr[c]) || 0;
            const raw = state.bArr[c];
            const digitB = parseInt(raw === ' ' || raw === '+' ? 0 : raw);
            const sum = digitA + digitB + carry;
            const resDigit = sum % 10;
            const nextCarry = Math.floor(sum / 10);

            const placeName = placeNames[(state.cols - 1) - c] || "nächste Stelle";

            const placeTitle = wrapCol(placeName, c, 'text-blue-300');
            const spanA = wrapCell(digitA, c, 'r0', 'hover:text-white');
            const spanB = wrapCell(digitB, c, 'r1', 'hover:text-white');
            const spanC = carry > 0 ? wrapCell(carry, c, 'carry-wrap', 'text-red-400') : '';
            const spanSum = wrapCell(sum, c, 'res', 'font-bold text-blue-400');
            const spanRes = wrapCell(resDigit, c, 'res', 'text-green-400');

            let eq = `<div class="inline-eq">`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="r0">${spanA}</span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="plus">+</span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="r1">${spanB}</span>`;
            if (carry > 0) {
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="plus">+</span>`;
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="carry-wrap">${spanC} <small style="color:var(--text-muted);">(Ü)</small></span>`;
            }
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="eq" data-hl-col="${c}">=</span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="col">${spanSum}</span>`;
            eq += `</div>`;

            state.steps.push({
                type: 'calc_res',
                col: c,
                resDigit,
                expTitle: `<div class="title"><span data-lang-de>Schritt ${stepIdx}:</span><span data-lang-en style="display:none;">Step ${stepIdx}:</span> ${placeTitle}</div>`,
                expText: eq,
                expAction: `<div class="action"><span data-lang-de>Schreibe</span><span data-lang-en style="display:none;">Write</span> ${spanRes} <span data-lang-de>unten hin.</span><span data-lang-en style="display:none;">at the bottom.</span></div>`
            });
            stepIdx++;

            if (nextCarry > 0) {
                const spanNextC = wrapCell(nextCarry, c - 1, 'carry-wrap', 'text-red-400');
                const carryTitle = wrapCol("Übertrag", c - 1, 'text-red-400');

                state.steps.push({
                    type: 'calc_carry',
                    targetCarryCol: c - 1,
                    carryDigit: nextCarry,
                    expTitle: `<div class="title"><span data-lang-de>Schritt ${stepIdx}:</span><span data-lang-en style="display:none;">Step ${stepIdx}:</span> ${carryTitle}</div>`,
                    expText: `<div class="body"><span data-lang-de>Die</span><span data-lang-en style="display:none;">The</span> ${spanSum} <span data-lang-de>hat eine Zehnerstelle.</span><span data-lang-en style="display:none;">has a tens digit.</span></div>`,
                    expAction: `<div class="action"><span data-lang-de>Schreibe</span><span data-lang-en style="display:none;">Write</span> ${spanNextC} <span data-lang-de>als Übertrag (Ü)!</span><span data-lang-en style="display:none;">as a carry!</span></div>`
                });
                stepIdx++;
            }
            carry = nextCarry;
        }

        if (carry > 0) {
            const spanCarry = wrapCell(carry, 0, 'carry-wrap', 'text-red-400');
            const spanRes = wrapCell(carry, 0, 'res', 'text-green-400');
            const finalTitle = wrapCol("Letzter Übertrag", 0, 'text-red-400');

            state.steps.push({
                type: 'calc_final',
                col: 0,
                resDigit: carry,
                expTitle: `<div class="title"><span data-lang-de>Schritt ${stepIdx}:</span><span data-lang-en style="display:none;">Step ${stepIdx}:</span> ${finalTitle}</div>`,
                expText: `<div class="body"><span data-lang-de>Wir haben noch einen Übertrag von</span><span data-lang-en style="display:none;">We still have a carry of</span> ${spanCarry}.</div>`,
                expAction: `<div class="action"><span data-lang-de>Schreibe</span><span data-lang-en style="display:none;">Write</span> ${spanRes} <span data-lang-de>direkt ins Ergebnis.</span><span data-lang-en style="display:none;">directly into the result.</span></div>`
            });
            stepIdx++;
        }

        state.steps.push({
            type: 'done',
            expTitle: `<div class="title"><span data-lang-de>Fertig! 🎉</span><span data-lang-en style="display:none;">Done! 🎉</span></div>`,
            expText: `<div class="body"><span data-lang-de>Das Ergebnis ist</span><span data-lang-en style="display:none;">The result is</span> <strong style="color:#4ade80;">${state.num1 + state.num2}</strong>.</div>`,
            expAction: `<div class="action"><span data-lang-de>Sehr gut gemacht!</span><span data-lang-en style="display:none;">Well done!</span></div>`
        });
    }

    function newProblem() {
        if (state.isAnimating && !state.isAutoPlaying) return;
        if (!state.isAutoPlaying) stopAuto();

        state.num1 = Math.floor(Math.random() * 8999) + 100;
        state.num2 = Math.floor(Math.random() * 8999) + 100;

        buildSteps();
        renderGrid();
        renderExplanations();

        state.currentStep = -1;
        updateButtons();
    }

    function fastForwardGrid(targetStep) {
        if (targetStep <= 0) return;

        for (let i = 0; i < targetStep; i++) {
            const s = state.steps[i];
            if (s.type === 'calc_res' || s.type === 'calc_final') {
                const cell = $(`col-${s.col}-res`);
                if (cell) { cell.innerText = s.resDigit; cell.classList.add('show'); }
            } else if (s.type === 'calc_carry') {
                const cell = $(`col-${s.targetCarryCol}-carry`);
                if (cell) { cell.innerText = s.carryDigit; cell.classList.add('show'); }
            }
        }

        const active = state.steps[targetStep - 1];
        if (!active) return;

        if (active.type === 'calc_res' || active.type === 'calc_final') {
            const c = active.col;
            $(`col-${c}-r0`)?.classList.add('hl-col');
            $(`col-${c}-r1`)?.classList.add('hl-col');
            const carrySpan = $(`col-${c}-carry`);
            if (carrySpan && carrySpan.innerText.trim() !== '') $(`col-${c}-carry-wrap`)?.classList.add('hl-col');
            $(`col-${c}-res`)?.classList.add('hl-col');
        } else if (active.type === 'calc_carry') {
            $(`col-${active.targetCarryCol}-carry-wrap`)?.classList.add('hl-carry');
        }
    }

    function prev() {
        if (state.isAutoPlaying) stopAuto();
        if (state.isAnimating || state.currentStep <= 0) return;

        const container = $(`mathsadd-step-${state.currentStep}`);
        if (container) {
            container.classList.remove('visible');
            container.querySelectorAll('.anim-el').forEach(el => el.classList.remove('revealed'));
        }

        state.currentStep--;

        clearHighlights();
        for (let i = 0; i < state.cols; i++) {
            const res = $(`col-${i}-res`);
            if (res) { res.innerText = ''; res.classList.remove('show'); }
            const carry = $(`col-${i}-carry`);
            if (carry) { carry.innerText = ''; carry.classList.remove('show'); }
        }

        fastForwardGrid(state.currentStep);

        if (state.currentStep > 0) {
            $(`mathsadd-step-${state.currentStep}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            $('mathsadd-explain')?.scrollTo({ top: 0, behavior: 'smooth' });
        }

        updateButtons();
    }

    function next(fromAuto = false) {
        if (!fromAuto && state.isAutoPlaying) stopAuto();
        if (state.isAnimating) return;
        if (state.currentStep >= state.steps.length) { newProblem(); return; }
        state.currentStep++;
        animateStep(state.currentStep);
    }

    async function animateStep(stepIndex) {
        state.isAnimating = true;
        const btnNext = $('mathsadd-next');
        const btnPrev = $('mathsadd-prev');
        if (btnNext) btnNext.disabled = true;
        if (btnPrev) btnPrev.disabled = true;

        clearHighlights();

        const container = $(`mathsadd-step-${stepIndex}`);
        if (!container) { state.isAnimating = false; return; }
        container.classList.add('visible');

        const elements = Array.from(container.querySelectorAll('.anim-el'));

        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            el.classList.add('revealed');

            if (el.dataset.hlClear === '1') {
                document.querySelectorAll('.maths-add-app .hl-cell, .maths-add-app .hl-border, .maths-add-app .hl-text')
                    .forEach(e => e.classList.remove('hl-cell', 'hl-border', 'hl-text'));
            }

            if (el.dataset.hlOp === 'plus') {
                $('col-0-r1')?.classList.add('hl-cell');
                el.classList.add('hl-text');
            } else if (el.dataset.hlOp === 'eq') {
                const colIdx = el.dataset.hlCol;
                $(`col-${colIdx}-carry-wrap`)?.classList.add('hl-border');
                el.classList.add('hl-text');
            }

            if (el.dataset.hlCol) {
                if (!el.dataset.hlOp) el.classList.add('hl-text');
                const colIdx = el.dataset.hlCol;
                const rowId = el.dataset.hlRow;

                if (rowId === 'col') {
                    $(`col-${colIdx}-r0`)?.classList.add('hl-col');
                    $(`col-${colIdx}-r1`)?.classList.add('hl-col');
                    const carrySpan = $(`col-${colIdx}-carry`);
                    if (carrySpan && carrySpan.innerText.trim() !== '') $(`col-${colIdx}-carry-wrap`)?.classList.add('hl-col');
                    $(`col-${colIdx}-res`)?.classList.add('hl-col');
                } else if (rowId) {
                    $(`col-${colIdx}-${rowId}`)?.classList.add('hl-cell');
                }
            }

            const delay = state.isAutoPlaying ? 1000 : (el.classList.contains('fast') ? 300 : 400);
            await sleep(delay);
        }

        if (stepIndex > 0) {
            const s = state.steps[stepIndex - 1];

            if (s.type === 'calc_res' || s.type === 'calc_final') {
                const c = s.col;
                $(`col-${c}-r0`)?.classList.add('hl-col');
                $(`col-${c}-r1`)?.classList.add('hl-col');
                const carrySpan = $(`col-${c}-carry`);
                if (carrySpan && carrySpan.innerText.trim() !== '') $(`col-${c}-carry-wrap`)?.classList.add('hl-col');
                $(`col-${c}-res`)?.classList.add('hl-col');

                await sleep(state.isAutoPlaying ? 500 : 200);
                const cell = $(`col-${c}-res`);
                if (cell) { cell.innerText = s.resDigit; cell.classList.add('show'); }
            } else if (s.type === 'calc_carry') {
                const tc = s.targetCarryCol;
                $(`col-${tc}-carry-wrap`)?.classList.add('hl-carry');

                await sleep(state.isAutoPlaying ? 500 : 200);
                const cell = $(`col-${tc}-carry`);
                if (cell) { cell.innerText = s.carryDigit; cell.classList.add('show'); }
            }
        }

        state.isAnimating = false;
        if (btnNext) btnNext.disabled = false;
        updateButtons();

        if (state.isAutoPlaying) {
            if (state.currentStep < state.steps.length) {
                state.autoTimeout = setTimeout(() => {
                    if (state.isAutoPlaying) next(true);
                }, 1000);
            } else {
                stopAuto();
            }
        }
    }

    function toggleAuto() {
        state.isAutoPlaying = !state.isAutoPlaying;
        updateAutoBtn();

        if (state.isAutoPlaying) {
            if (!state.isAnimating) {
                if (state.currentStep >= state.steps.length) {
                    newProblem();
                    setTimeout(() => { if (state.isAutoPlaying) next(true); }, 800);
                } else {
                    next(true);
                }
            }
        } else {
            clearTimeout(state.autoTimeout);
        }
    }

    function init() {
        const app = document.getElementById('maths-add-app');
        if (!app) return;
        if (state.initialised) return;
        state.initialised = true;
        newProblem();
    }

    window.MathsAdd = {
        newProblem,
        toggleAuto,
        prev,
        next,
        init,
        _state: state,
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    const observer = new MutationObserver(() => {
        const app = document.getElementById('maths-add-app');
        if (app && !state.initialised) {
            state.initialised = false;
            init();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();