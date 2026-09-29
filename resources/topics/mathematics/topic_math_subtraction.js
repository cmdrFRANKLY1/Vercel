// resources/topics/topic_maths_subtraction.js
// General subtraction (Subtraktion) with a dedicated section on written subtraction (Schriftliches Subtrahieren).
// Bilingual (DE/EN) — honours the global data-active-lang toggle.

registerTopic({
    id: 'MathsSubtraction',

    // ── SUB-CATEGORY ────────────────────────────────────────────
    parentId: 'Mathematics',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-minus',
    titleDe: 'Subtraktion',
    titleEn: 'Subtraction',
    descDe: 'Subtraktion von Kopfrechnen bis schriftlich: Begriffe, Rechengesetze, Zahlenstrahl, Entbündeln (Übertrag) und interaktive Animation.',
    descEn: 'Subtraction from mental math to written form: terms, properties, number line, borrowing, and interactive animation.',

    sidebarTitleDe: 'Subtraktion',
    sidebarTitleEn: 'Subtraction',
    sidebarSubtitleDe: 'Grundrechenarten',
    sidebarSubtitleEn: 'Basic Arithmetic',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'Subtraktion',
        titleEn: 'Subtraction',
        introDe: 'Die Subtraktion ist die Umkehrung der Addition und eine der vier Grundrechenarten. Diese Seite führt von den <strong>Begriffen</strong> (Minuend, Subtrahend, Differenz) über die <strong>Rechengesetze</strong> und den <strong>Zahlenstrahl</strong> bis zum <strong>schriftlichen Subtrahieren mit Entbündeln</strong> — inklusive <strong>interaktiver Animation</strong>, die jeden Schritt erklärt.',
        introEn: 'Subtraction is the inverse of addition and one of the four basic arithmetic operations. This page covers the <strong>terms</strong> (minuend, subtrahend, difference), the <strong>laws</strong>, the <strong>number line</strong>, and <strong>written subtraction with borrowing</strong> — including an <strong>interactive animation</strong> that explains every step.'
    },

    quickLinks: [
        { icon: 'fa-lightbulb',            href: '#section1',  switchToDoc: true, labelDe: 'Grundlagen',         labelEn: 'Basics' },
        { icon: 'fa-scale-balanced',       href: '#section2',  switchToDoc: true, labelDe: 'Rechengesetze',      labelEn: 'Properties' },
        { icon: 'fa-arrow-down',           href: '#section3',  switchToDoc: true, labelDe: 'Das Entbündeln',     labelEn: 'Borrowing' },
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
            introDe: 'Was bedeutet Subtrahieren überhaupt? Begriffe, Schreibweise und der Zahlenstrahl.',
            introEn: 'What does subtracting mean? Terms, notation, and the number line.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Subtraktion?',
                    titleEn: 'What Is Subtraction?',
                    htmlDe: `
                    <p class="text-xs mb-2">Die <strong>Subtraktion</strong> ist das Abziehen einer Zahl von einer anderen. Man schreibt sie mit dem <strong>Minuszeichen</strong> <code>−</code>. Subtrahieren heißt: von einer Zahl eine andere <em>wegnehmen</em> — die Menge wird kleiner.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        7 − 4 = 3
                    </div>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Begriff</th><th>Bedeutung</th><th>Im Beispiel 7 − 4 = 3</th></tr>
                    <tr><td><strong>Minuend</strong></td><td class="text-[var(--text-muted)]">Die Zahl, von der abgezogen wird</td><td class="text-[var(--text-muted)]">7</td></tr>
                    <tr><td><strong>Subtrahend</strong></td><td class="text-[var(--text-muted)]">Die Zahl, die abgezogen wird</td><td class="text-[var(--text-muted)]">4</td></tr>
                    <tr><td><strong>Differenz</strong></td><td class="text-[var(--text-muted)]">Das Ergebnis der Subtraktion</td><td class="text-[var(--text-muted)]">3</td></tr>
                    <tr><td><strong>Minuszeichen</strong></td><td class="text-[var(--text-muted)]">Rechenzeichen der Subtraktion</td><td class="text-[var(--text-muted)]">−</td></tr>
                    <tr><td><strong>Gleichheitszeichen</strong></td><td class="text-[var(--text-muted)]">Trennt Aufgabe und Ergebnis</td><td class="text-[var(--text-muted)]">=</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Anders als bei der Addition kann man bei der Subtraktion <strong>nicht beliebig vertauschen</strong>: <code>7 − 4 ≠ 4 − 7</code>. Die Reihenfolge ist wichtig!</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>Subtraction</strong> is taking one number away from another. It is written with the <strong>minus sign</strong> <code>−</code>. Subtracting means: <em>taking away</em> one number from another — the total shrinks.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        7 − 4 = 3
                    </div>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Term</th><th>Meaning</th><th>In the example 7 − 4 = 3</th></tr>
                    <tr><td><strong>Minuend</strong></td><td class="text-[var(--text-muted)]">The number being subtracted from</td><td class="text-[var(--text-muted)]">7</td></tr>
                    <tr><td><strong>Subtrahend</strong></td><td class="text-[var(--text-muted)]">The number being subtracted</td><td class="text-[var(--text-muted)]">4</td></tr>
                    <tr><td><strong>Difference</strong></td><td class="text-[var(--text-muted)]">The result of the subtraction</td><td class="text-[var(--text-muted)]">3</td></tr>
                    <tr><td><strong>Minus sign</strong></td><td class="text-[var(--text-muted)]">Operator of subtraction</td><td class="text-[var(--text-muted)]">−</td></tr>
                    <tr><td><strong>Equals sign</strong></td><td class="text-[var(--text-muted)]">Separates problem and result</td><td class="text-[var(--text-muted)]">=</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Unlike addition, subtraction is <strong>not commutative</strong>: <code>7 − 4 ≠ 4 − 7</code>. The order matters!</p>
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
                    <tr><td><strong>Kopfrechnen</strong></td><td class="text-[var(--text-muted)]">Ein- und kleine zweistellige Zahlen</td><td class="text-[var(--text-muted)]">8 − 3, 24 − 13</td></tr>
                    <tr><td><strong>Zerlegen / Ergänzen</strong></td><td class="text-[var(--text-muted)]">Zweistellige Zahlen geschickt umformen</td><td class="text-[var(--text-muted)]">47 − 28 = 47 − 30 + 2</td></tr>
                    <tr><td><strong>Schriftlich</strong></td><td class="text-[var(--text-muted)]">Beliebig große Zahlen</td><td class="text-[var(--text-muted)]">4873 − 1659</td></tr>
                    <tr><td><strong>Taschenrechner</strong></td><td class="text-[var(--text-muted)]">Wenn Geschwindigkeit zählt</td><td class="text-[var(--text-muted)]">große Differenzen</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">In der Schule lernst du das schriftliche Rechnen nicht, weil du keinen Taschenrechner hast, sondern weil du dadurch das <strong>Stellenwertsystem</strong> wirklich verstehst.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Depending on the size of the numbers, you pick the right method. Small numbers can be done mentally; large ones are written down.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Method</th><th>Suitable for</th><th>Example</th></tr>
                    <tr><td><strong>Mental math</strong></td><td class="text-[var(--text-muted)]">One- and small two-digit numbers</td><td class="text-[var(--text-muted)]">8 − 3, 24 − 13</td></tr>
                    <tr><td><strong>Split / adjust</strong></td><td class="text-[var(--text-muted)]">Cleverly reshape two-digit numbers</td><td class="text-[var(--text-muted)]">47 − 28 = 47 − 30 + 2</td></tr>
                    <tr><td><strong>Written</strong></td><td class="text-[var(--text-muted)]">Arbitrarily large numbers</td><td class="text-[var(--text-muted)]">4873 − 1659</td></tr>
                    <tr><td><strong>Calculator</strong></td><td class="text-[var(--text-muted)]">When speed matters</td><td class="text-[var(--text-muted)]">large differences</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">In school you learn written calculation not because you lack a calculator, but because it makes you truly understand the <strong>place value system</strong>.</p>
                    `
                },
                {
                    id: 'subsection1_3',
                    titleDe: 'Subtraktion am Zahlenstrahl',
                    titleEn: 'Subtraction on the Number Line',
                    htmlDe: `
                    <p class="text-xs mb-2">Anschaulich ist Subtrahieren ein <strong>Gehen nach links</strong> auf dem Zahlenstrahl. <code>7 − 4</code> heißt: Starte bei 7 und gehe 4 Schritte nach links — du landest bei 3.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-7 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        0 ── 1 ── 2 ── <strong>3</strong> ── 4 ── 5 ── 6 ── <strong>7</strong> ── 8<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─── −4 ────┘
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li>Startpunkt: der Minuend (hier 7).</li>
                        <li>Pfeil nach links: Länge des Subtrahenden (hier 4 Schritte).</li>
                        <li>Endpunkt: die Differenz (hier 3).</li>
                        <li>Subtraktion führt bei positiven Zahlen <strong>immer weiter nach links</strong> — die Zahl wird kleiner.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Visually, subtraction is <strong>walking left</strong> on the number line. <code>7 − 4</code> means: start at 7 and take 4 steps left — you land at 3.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-7 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        0 ── 1 ── 2 ── <strong>3</strong> ── 4 ── 5 ── 6 ── <strong>7</strong> ── 8<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─── −4 ────┘
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li>Starting point: the minuend (here 7).</li>
                        <li>Arrow to the left: length of the subtrahend (here 4 steps).</li>
                        <li>End point: the difference (here 3).</li>
                        <li>With positive numbers, subtraction <strong>always moves further left</strong> — the number gets smaller.</li>
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
            introDe: 'Welche Gesetze gelten bei der Subtraktion — und welche nicht?',
            introEn: 'Which laws apply to subtraction — and which do not?',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Kein Kommutativgesetz',
                    titleEn: 'No Commutative Law',
                    htmlDe: `
                    <p class="text-xs mb-2">Anders als bei der Addition darf man bei der Subtraktion die Zahlen <strong>nicht vertauschen</strong>.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        a − b ≠ b − a
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Beispiel: <code>7 − 4 = 3</code>, aber <code>4 − 7 = −3</code>. Die Reihenfolge von Minuend und Subtrahend ist entscheidend.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Unlike addition, subtraction does <strong>not</strong> allow swapping the numbers.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        a − b ≠ b − a
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Example: <code>7 − 4 = 3</code>, but <code>4 − 7 = −3</code>. The order of minuend and subtrahend matters.</p>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Kein Assoziativgesetz',
                    titleEn: 'No Associative Law',
                    htmlDe: `
                    <p class="text-xs mb-2">Auch Klammern darf man bei der Subtraktion <strong>nicht beliebig setzen</strong>.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        (a − b) − c ≠ a − (b − c)
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Beispiel: <code>(10 − 4) − 2 = 6 − 2 = 4</code>, aber <code>10 − (4 − 2) = 10 − 2 = 8</code>.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Parentheses also <strong>cannot</strong> be placed arbitrarily in subtraction.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        (a − b) − c ≠ a − (b − c)
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Example: <code>(10 − 4) − 2 = 6 − 2 = 4</code>, but <code>10 − (4 − 2) = 10 − 2 = 8</code>.</p>
                    `
                },
                {
                    id: 'subsection2_3',
                    titleDe: 'Null als neutrales Element',
                    titleEn: 'Zero as the Neutral Element',
                    htmlDe: `
                    <p class="text-xs mb-2">Die <strong>Null</strong> verändert eine Differenz nicht: <code>a − 0 = a</code>. Auch beim schriftlichen Subtrahieren kann eine 0 in einer Spalte stehen — sie zählt einfach mit.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        7 − 0 = 7<br>
                        25 − 0 = 25
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Achtung:</strong> <code>0 − a</code> ergibt im Allgemeinen eine negative Zahl, nicht <code>a</code>.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>Zero</strong> does not change a difference: <code>a − 0 = a</code>. Even in written subtraction a 0 can sit in a column — it simply counts along.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        7 − 0 = 7<br>
                        25 − 0 = 25
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Caution:</strong> <code>0 − a</code> generally yields a negative number, not <code>a</code>.
                    </div>
                    `
                },
                {
                    id: 'subsection2_4',
                    titleDe: 'Zusammenhang mit der Addition',
                    titleEn: 'Connection to Addition',
                    htmlDe: `
                    <p class="text-xs mb-2">Subtraktion ist die <strong>Umkehrung</strong> der Addition. Aus <code>a + b = c</code> folgt <code>c − b = a</code> und <code>c − a = b</code>.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        3 + 4 = 7 &nbsp;⟺&nbsp; 7 − 4 = 3 &nbsp;und&nbsp; 7 − 3 = 4
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Diese Beziehung nutzt man zur <strong>Kontrolle</strong>: Addiert man die Differenz zum Subtrahenden, muss der Minuend herauskommen.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Subtraction is the <strong>inverse</strong> of addition. From <code>a + b = c</code> it follows that <code>c − b = a</code> and <code>c − a = b</code>.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        3 + 4 = 7 &nbsp;⟺&nbsp; 7 − 4 = 3 &nbsp;and&nbsp; 7 − 3 = 4
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">This relationship is used for <strong>checking</strong>: add the difference to the subtrahend and you must get the minuend.</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 3 — BORROWING
           ============================================================ */
        {
            id: 'section3',
            titleDe: 'Das Entbündeln',
            titleEn: 'Borrowing',
            introDe: 'Das Herzstück des schriftlichen Subtrahierens: Was passiert, wenn die obere Ziffer kleiner ist als die untere?',
            introEn: 'The heart of written subtraction: what happens when the top digit is smaller than the bottom one?',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Was ist Entbündeln?',
                    titleEn: 'What Is Borrowing?',
                    htmlDe: `
                    <p class="text-xs mb-2">Wenn du in einer Spalte subtrahieren willst und die <strong>obere Ziffer kleiner</strong> ist als die untere, kannst du nicht direkt subtrahieren. Du leihst dir dann <strong>10 von der nächsten Spalte</strong> — das nennt man <strong>Entbündeln</strong> oder <strong>Übertrag</strong>.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← 1 von der Zehnerstelle geliehen<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        − 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Beispiel: 3 − 9 geht nicht. Also leihst du dir 10 von der Zehnerstelle: 13 − 9 = 4. Die Zehnerstelle wird dafür um 1 kleiner.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">When you want to subtract in a column and the <strong>top digit is smaller</strong> than the bottom one, you cannot subtract directly. You borrow <strong>10 from the next column</strong> — this is called <strong>borrowing</strong> or <strong>regrouping</strong>.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← 1 borrowed from the tens place<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        − 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4
                    </div>
                    <p class="text-xs text-[var(--text-muted)]">Example: 3 − 9 does not work. So you borrow 10 from the tens place: 13 − 9 = 4. The tens place becomes 1 smaller.</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Entbündeln richtig notieren',
                    titleEn: 'Notating Borrowing Correctly',
                    htmlDe: `
                    <p class="text-xs mb-2">Der geliehene Wert wird <strong>klein über die nächste Spalte</strong> geschrieben oder die obere Ziffer wird durchgestrichen und um 1 verringert. In der Animation erscheint der Übertrag in <span class="text-red-400 font-bold">rot</span>.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Immer <strong>über</strong> die obere Ziffer schreiben, nicht darunter.</li>
                        <li>Klein halten, damit er nicht mit den Ziffern verwechselt wird.</li>
                        <li>In der nächsten Spalte <strong>mitrechnen</strong> — das ist der häufigste Fehler.</li>
                        <li>Am Ende kann noch ein Übertrag übrig bleiben: Dann schreibst du ihn direkt ins Ergebnis.</li>
                    </ul>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Tipp:</strong> Den Übertrag mit Bleistift schreiben, damit du ihn nach der Kontrolle leicht wegradieren kannst.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The borrowed value is written <strong>small above the next column</strong>, or the top digit is crossed out and reduced by 1. In the animation the carry appears in <span class="text-red-400 font-bold">red</span>.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Always write it <strong>above</strong> the top digit, not below.</li>
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
            introDe: 'Das allgemeine Vorgehen beim schriftlichen Subtrahieren — in vier klaren Schritten, gefolgt von einem vollständigen Beispiel.',
            introEn: 'The general procedure for written subtraction — in four clear steps, followed by a complete example.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Die vier Schritte',
                    titleEn: 'The Four Steps',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/6">#</th><th>Schritt</th><th>Was du tust</th></tr>
                    <tr><td>1</td><td><strong>Hinschreiben</strong></td><td class="text-[var(--text-muted)]">Zahlen stellengerecht untereinander, − links, Strich darunter.</td></tr>
                    <tr><td>2</td><td><strong>Rechts beginnen</strong></td><td class="text-[var(--text-muted)]">Immer bei den Einern anfangen — nie links!</td></tr>
                    <tr><td>3</td><td><strong>Spalte subtrahieren</strong></td><td class="text-[var(--text-muted)]">Untere Ziffer von der oberen abziehen; ggf. entbündeln.</td></tr>
                    <tr><td>4</td><td><strong>Ergebnis & Übertrag</strong></td><td class="text-[var(--text-muted)]">Differenz ins Ergebnis, Übertrag in die nächste Spalte.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Am Ende: Steht noch ein Übertrag übrig, direkt ins Ergebnis schreiben — fertig.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/6">#</th><th>Step</th><th>What you do</th></tr>
                    <tr><td>1</td><td><strong>Write it down</strong></td><td class="text-[var(--text-muted)]">Numbers aligned by place value, − on the left, line below.</td></tr>
                    <tr><td>2</td><td><strong>Start on the right</strong></td><td class="text-[var(--text-muted)]">Always begin with the ones — never the left!</td></tr>
                    <tr><td>3</td><td><strong>Subtract the column</strong></td><td class="text-[var(--text-muted)]">Subtract the bottom digit from the top; borrow if needed.</td></tr>
                    <tr><td>4</td><td><strong>Result & carry</strong></td><td class="text-[var(--text-muted)]">Difference into the result, carry into the next column.</td></tr>
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
                        <strong class="text-[var(--text-color)]">Merksatz:</strong> Beim schriftlichen Subtrahieren subtrahierst du <em>immer nur Ziffern mit demselben Stellenwert</em>. Einer von Einer, Zehner von Zehner, Hunderter von Hunderter.
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
                        <strong class="text-[var(--text-color)]">Key rule:</strong> In written subtraction you <em>only ever subtract digits of the same place value</em>. Ones from ones, tens from tens, hundreds from hundreds.
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
                         − 1 6 5 9<br>
                         ─────────
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mt-3">
                        <li>Beide Zahlen rechtsbündig ausrichten.</li>
                        <li>Das <strong>−</strong>-Zeichen steht links vor der zweiten Zahl.</li>
                        <li>Der Strich trennt Aufgabe und Ergebnis.</li>
                        <li>Bei unterschiedlich langen Zahlen: kürzere Zahl rechtsbündig unter die längere setzen.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Before calculating, write the numbers <strong>aligned by place value</strong> — ones under ones, tens under tens, and so on. This is the most common source of errors.</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)]">
                         &nbsp;&nbsp;4 8 7 3<br>
                         − 1 6 5 9<br>
                         ─────────
                    </div>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mt-3">
                        <li>Align both numbers to the right.</li>
                        <li>The <strong>−</strong> sign goes to the left of the second number.</li>
                        <li>The line separates problem and result.</li>
                        <li>If numbers differ in length: place the shorter one right-aligned under the longer one.</li>
                    </ul>
                    `
                },
                {
                    id: 'subsection4_4',
                    titleDe: 'Vollständiges Beispiel: 4873 − 1659',
                    titleEn: 'Complete Example: 4873 − 1659',
                    htmlDe: `
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;1 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Überträge<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        − 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;3 2 1 4
                    </div>
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Einer:</strong> 3 − 9 geht nicht → 13 − 9 = 4, Übertrag 1.</li>
                        <li><strong class="text-[var(--text-color)]">Zehner:</strong> 7 − (5 + 1) = 7 − 6 = 1, kein Übertrag.</li>
                        <li><strong class="text-[var(--text-color)]">Hunderter:</strong> 8 − 6 = 2, kein Übertrag.</li>
                        <li><strong class="text-[var(--text-color)]">Tausender:</strong> 4 − 1 = 3, kein Übertrag.</li>
                    </ul>
                    <p class="text-xs mt-3">Ergebnis: <strong class="text-green-400">3214</strong></p>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] shadow-[var(--control-shadow)] mb-3">
                        &nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← borrowings<br>
                        &nbsp;&nbsp;4 8 7 3<br>
                        − 1 6 5 9<br>
                        ─────────<br>
                        &nbsp;&nbsp;3 2 1 4
                    </div>
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Ones:</strong> 3 − 9 does not work → 13 − 9 = 4, carry 1.</li>
                        <li><strong class="text-[var(--text-color)]">Tens:</strong> 7 − (5 + 1) = 7 − 6 = 1, no carry.</li>
                        <li><strong class="text-[var(--text-color)]">Hundreds:</strong> 8 − 6 = 2, no carry.</li>
                        <li><strong class="text-[var(--text-color)]">Thousands:</strong> 4 − 1 = 3, no carry.</li>
                    </ul>
                    <p class="text-xs mt-3">Result: <strong class="text-green-400">3214</strong></p>
                    `
                },
                {
                    id: 'subsection4_5',
                    titleDe: 'Ausführungsreihenfolge beim Rechnen',
                    titleEn: 'Execution Order While Calculating',
                    htmlDe: `
                    <p class="text-xs mb-2">Die Reihenfolge, in der du die Spalten abarbeitest, ist <strong>nicht</strong> beliebig. Nur von rechts nach links funktioniert das Entbündeln korrekt.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Schritt</th><th>Was passiert</th></tr>
                    <tr><td>1</td><td><code>Einer</code></td><td class="text-[var(--text-muted)]">Rechte Spalte subtrahieren, Übertrag ggf. notieren</td></tr>
                    <tr><td>2</td><td><code>Zehner</code></td><td class="text-[var(--text-muted)]">Nächste Spalte inkl. Übertrag subtrahieren</td></tr>
                    <tr><td>3</td><td><code>Hunderter</code></td><td class="text-[var(--text-muted)]">Nächste Spalte inkl. Übertrag subtrahieren</td></tr>
                    <tr><td>4</td><td><code>Tausender</code></td><td class="text-[var(--text-muted)]">Letzte Spalte inkl. Übertrag subtrahieren</td></tr>
                    <tr><td>5</td><td><code>Letzter Übertrag</code></td><td class="text-[var(--text-muted)]">Falls noch ein Übertrag übrig ist, direkt ins Ergebnis</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The order in which you process the columns is <strong>not</strong> arbitrary. Only right-to-left makes borrowing work correctly.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Step</th><th>What happens</th></tr>
                    <tr><td>1</td><td><code>Ones</code></td><td class="text-[var(--text-muted)]">Subtract the rightmost column, note any carry</td></tr>
                    <tr><td>2</td><td><code>Tens</code></td><td class="text-[var(--text-muted)]">Subtract the next column including carry</td></tr>
                    <tr><td>3</td><td><code>Hundreds</code></td><td class="text-[var(--text-muted)]">Subtract the next column including carry</td></tr>
                    <tr><td>4</td><td><code>Thousands</code></td><td class="text-[var(--text-muted)]">Subtract the last column including carry</td></tr>
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
                        <td class="text-[var(--text-muted)]">Übertrag sichtbar notieren und beim Subtrahieren mitzählen.</td>
                    </tr>
                    <tr>
                        <td><strong>Minuend und Subtrahend vertauscht</strong></td>
                        <td class="text-[var(--text-muted)]">Falsche Reihenfolge → falsches Vorzeichen oder falsches Ergebnis.</td>
                        <td class="text-[var(--text-muted)]">Immer die größere Zahl oben, die kleinere unten.</td>
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
                        <td class="text-[var(--text-muted)]">Borrowing only works from right to left.</td>
                        <td class="text-[var(--text-muted)]">Always start with the ones column.</td>
                    </tr>
                    <tr>
                        <td><strong>Forgetting the carry</strong></td>
                        <td class="text-[var(--text-muted)]">Next column is calculated without the carry.</td>
                        <td class="text-[var(--text-muted)]">Write the carry visibly and include it when subtracting.</td>
                    </tr>
                    <tr>
                        <td><strong>Minuend and subtrahend swapped</strong></td>
                        <td class="text-[var(--text-muted)]">Wrong order → wrong sign or wrong result.</td>
                        <td class="text-[var(--text-muted)]">Always put the larger number on top, the smaller one below.</td>
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
            introDe: 'Die interaktive Animation führt Schritt für Schritt durch eine zufällige Subtraktionsaufgabe — jeder Rechenschritt wird links erklärt und rechts in der Rechnung hervorgehoben.',
            introEn: 'The interactive animation walks you through a random subtraction problem, step by step — each calculation step is explained on the left and highlighted in the calculation on the right.',
            subtopics: [
                {
                    id: 'subtraction-interactive',
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

                    <div id="maths-sub-app" class="maths-sub-app">
                    <style>
                        .maths-sub-app {
                            font-family: 'Inter', system-ui, sans-serif;
                            color: var(--text-color);
                        }
                        .maths-sub-app .controls {
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
                        .maths-sub-app .controls .title {
                            font-weight: 800;
                            font-size: 0.85rem;
                            color: var(--heading-color);
                            letter-spacing: 0.02em;
                        }
                        .maths-sub-app .btn-row {
                            display: flex;
                            gap: 0.4rem;
                            flex-wrap: wrap;
                            align-items: center;
                        }
                        .maths-sub-app button {
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
                        .maths-sub-app button:hover {
                            background: var(--code-bg);
                            border-color: var(--link-color);
                        }
                        .maths-sub-app button.primary {
                            background: var(--link-color);
                            border-color: var(--link-color);
                            color: #fff;
                        }
                        .maths-sub-app button.primary:hover {
                            filter: brightness(1.15);
                        }
                        .maths-sub-app button.auto.on {
                            background: rgba(202,138,4,0.2);
                            border-color: #eab308;
                            color: #facc15;
                        }
                        .maths-sub-app button:disabled {
                            opacity: 0.4;
                            cursor: not-allowed;
                        }

                        .maths-sub-app .panels {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 0.75rem;
                            height: 520px;
                        }
                        @media (max-width: 720px) {
                            .maths-sub-app .panels { grid-template-columns: 1fr; height: auto; }
                            .maths-sub-app .panels > div { height: 520px; }
                        }

                        .maths-sub-app .card {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.75rem;
                            padding: 1rem;
                            position: relative;
                            overflow: hidden;
                            box-shadow: var(--control-shadow);
                        }
                        .maths-sub-app .card .label {
                            position: absolute;
                            top: 0.6rem;
                            left: 0.8rem;
                            font-size: 0.6rem;
                            font-weight: 800;
                            letter-spacing: 0.15em;
                            text-transform: uppercase;
                            color: var(--text-muted);
                        }
                        .maths-sub-app .explain {
                            overflow-y: auto;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 1.25rem;
                            line-height: 1.8;
                            padding-top: 1.5rem;
                        }
                        .maths-sub-app .explain::-webkit-scrollbar { width: 8px; }
                        .maths-sub-app .explain::-webkit-scrollbar-thumb {
                            background: var(--panel-border);
                            border-radius: 10px;
                        }
                        .maths-sub-app .calc {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-top: 1.5rem;
                        }

                        .maths-sub-app .math-grid {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 2.4rem;
                            font-weight: 600;
                            display: grid;
                            gap: 0.15rem;
                            letter-spacing: 0.05em;
                            color: var(--text-color);
                        }
                        .maths-sub-app .cell {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                            border-radius: 0.5rem;
                        }
                        .maths-sub-app .cell.minus { color: var(--link-color); }
                        /* Carry row sits ABOVE the minuend row, no bottom border here */
                        .maths-sub-app .cell.carry-wrap {
                            height: 28px;
                            align-items: flex-end;
                            padding-bottom: 0;
                        }
                        .maths-sub-app .cell.carry {
                            font-size: 1.1rem;
                            color: #f87171;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(6px);
                            transition: all 0.5s ease;
                        }
                        .maths-sub-app .cell.carry.show { opacity: 1; transform: translateY(0); }
                        /* Line under the subtrahend row */
                        .maths-sub-app .cell.r1-line {
                            border-bottom: 3px solid var(--panel-border);
                        }
                        .maths-sub-app .cell.res {
                            color: #4ade80;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(8px);
                            transition: all 0.5s ease;
                        }
                        .maths-sub-app .cell.res.show { opacity: 1; transform: translateY(0); }

                        .maths-sub-app .hl-col   { background: rgba(127,127,127,0.12); }
                        .maths-sub-app .hl-carry { background: rgba(248,113,113,0.18); }
                        .maths-sub-app .hl-cell  { background: rgba(127,127,127,0.20); }
                        .maths-sub-app .hl-border { border-bottom-color: var(--link-color) !important; }

                        .maths-sub-app .step { margin-bottom: 1.4rem; display: none; }
                        .maths-sub-app .step.visible { display: block; }
                        .maths-sub-app .step .title {
                            font-weight: 700;
                            font-size: 1.65rem;
                            color: var(--heading-color);
                            margin-bottom: 0.3rem;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                        .maths-sub-app .step .body { color: var(--text-color); }
                        .maths-sub-app .step .action { color: var(--link-color); margin-top: 0.4rem; }
                        .maths-sub-app .anim-el {
                            display: inline-block;
                            opacity: 0;
                            clip-path: inset(0 100% 0 0);
                            white-space: nowrap;
                        }
                        .maths-sub-app .anim-el.revealed {
                            opacity: 1;
                            clip-path: inset(0 0 0 0);
                            transition: clip-path 0.6s cubic-bezier(0.4,0,0.2,1);
                        }
                        .maths-sub-app .anim-el.fast.revealed { transition-duration: 0.3s; }
                        .maths-sub-app .hl-text {
                            background: rgba(59,130,246,0.22);
                            border-radius: 0.25rem;
                        }
                        .maths-sub-app .inline-eq {
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
                            gap: 0.1rem;
                        }
                        .maths-sub-app .inline-eq span {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                    </style>

                    <div class="controls">
                        <div class="title" data-lang-de>Schriftliches Subtrahieren</div>
                        <div class="title" data-lang-en style="display:none;">Written Subtraction</div>
                        <div class="btn-row">
                            <button onclick="MathsSub.newProblem()">
                                <span data-lang-de>Neue Zahlen</span><span data-lang-en style="display:none;">New Numbers</span>
                            </button>
                            <button id="mathssub-auto" class="auto" onclick="MathsSub.toggleAuto()">▶ Auto</button>
                            <button id="mathssub-prev" onclick="MathsSub.prev()" disabled>← <span data-lang-de>Zurück</span><span data-lang-en style="display:none;">Back</span></button>
                            <button id="mathssub-next" class="primary" onclick="MathsSub.next()">
                                <span data-lang-de>Start</span><span data-lang-en style="display:none;">Start</span> →
                            </button>
                        </div>
                    </div>

                    <div class="panels">
                        <div class="card explain">
                            <div class="label" data-lang-de>Erklärungen</div>
                            <div class="label" data-lang-en style="display:none;">Explanations</div>
                            <div id="mathssub-explain"></div>
                        </div>
                        <div class="card calc">
                            <div class="label" data-lang-de>Rechnung</div>
                            <div class="label" data-lang-en style="display:none;">Calculation</div>
                            <div id="mathssub-grid" class="math-grid"></div>
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

                    <div id="maths-sub-app" class="maths-sub-app">
                    <style>
                        .maths-sub-app {
                            font-family: 'Inter', system-ui, sans-serif;
                            color: var(--text-color);
                        }
                        .maths-sub-app .controls {
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
                        .maths-sub-app .controls .title {
                            font-weight: 800;
                            font-size: 0.85rem;
                            color: var(--heading-color);
                            letter-spacing: 0.02em;
                        }
                        .maths-sub-app .btn-row {
                            display: flex;
                            gap: 0.4rem;
                            flex-wrap: wrap;
                            align-items: center;
                        }
                        .maths-sub-app button {
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
                        .maths-sub-app button:hover {
                            background: var(--code-bg);
                            border-color: var(--link-color);
                        }
                        .maths-sub-app button.primary {
                            background: var(--link-color);
                            border-color: var(--link-color);
                            color: #fff;
                        }
                        .maths-sub-app button.primary:hover {
                            filter: brightness(1.15);
                        }
                        .maths-sub-app button.auto.on {
                            background: rgba(202,138,4,0.2);
                            border-color: #eab308;
                            color: #facc15;
                        }
                        .maths-sub-app button:disabled {
                            opacity: 0.4;
                            cursor: not-allowed;
                        }

                        .maths-sub-app .panels {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 0.75rem;
                            height: 520px;
                        }
                        @media (max-width: 720px) {
                            .maths-sub-app .panels { grid-template-columns: 1fr; height: auto; }
                            .maths-sub-app .panels > div { height: 520px; }
                        }

                        .maths-sub-app .card {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.75rem;
                            padding: 1rem;
                            position: relative;
                            overflow: hidden;
                            box-shadow: var(--control-shadow);
                        }
                        .maths-sub-app .card .label {
                            position: absolute;
                            top: 0.6rem;
                            left: 0.8rem;
                            font-size: 0.6rem;
                            font-weight: 800;
                            letter-spacing: 0.15em;
                            text-transform: uppercase;
                            color: var(--text-muted);
                        }
                        .maths-sub-app .explain {
                            overflow-y: auto;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 1.25rem;
                            line-height: 1.8;
                            padding-top: 1.5rem;
                        }
                        .maths-sub-app .explain::-webkit-scrollbar { width: 8px; }
                        .maths-sub-app .explain::-webkit-scrollbar-thumb {
                            background: var(--panel-border);
                            border-radius: 10px;
                        }
                        .maths-sub-app .calc {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-top: 1.5rem;
                        }

                        .maths-sub-app .math-grid {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                            font-size: 2.4rem;
                            font-weight: 600;
                            display: grid;
                            gap: 0.15rem;
                            letter-spacing: 0.05em;
                            color: var(--text-color);
                        }
                        .maths-sub-app .cell {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                            border-radius: 0.5rem;
                        }
                        .maths-sub-app .cell.minus { color: var(--link-color); }
                        .maths-sub-app .cell.carry-wrap {
                            height: 28px;
                            align-items: flex-end;
                            padding-bottom: 0;
                        }
                        .maths-sub-app .cell.carry {
                            font-size: 1.1rem;
                            color: #f87171;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(6px);
                            transition: all 0.5s ease;
                        }
                        .maths-sub-app .cell.carry.show { opacity: 1; transform: translateY(0); }
                        .maths-sub-app .cell.r1-line {
                            border-bottom: 3px solid var(--panel-border);
                        }
                        .maths-sub-app .cell.res {
                            color: #4ade80;
                            font-weight: 700;
                            opacity: 0;
                            transform: translateY(8px);
                            transition: all 0.5s ease;
                        }
                        .maths-sub-app .cell.res.show { opacity: 1; transform: translateY(0); }

                        .maths-sub-app .hl-col   { background: rgba(127,127,127,0.12); }
                        .maths-sub-app .hl-carry { background: rgba(248,113,113,0.18); }
                        .maths-sub-app .hl-cell  { background: rgba(127,127,127,0.20); }
                        .maths-sub-app .hl-border { border-bottom-color: var(--link-color) !important; }

                        .maths-sub-app .step { margin-bottom: 1.4rem; display: none; }
                        .maths-sub-app .step.visible { display: block; }
                        .maths-sub-app .step .title {
                            font-weight: 700;
                            font-size: 1.65rem;
                            color: var(--heading-color);
                            margin-bottom: 0.3rem;
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                        .maths-sub-app .step .body { color: var(--text-color); }
                        .maths-sub-app .step .action { color: var(--link-color); margin-top: 0.4rem; }
                        .maths-sub-app .anim-el {
                            display: inline-block;
                            opacity: 0;
                            clip-path: inset(0 100% 0 0);
                            white-space: nowrap;
                        }
                        .maths-sub-app .anim-el.revealed {
                            opacity: 1;
                            clip-path: inset(0 0 0 0);
                            transition: clip-path 0.6s cubic-bezier(0.4,0,0.2,1);
                        }
                        .maths-sub-app .anim-el.fast.revealed { transition-duration: 0.3s; }
                        .maths-sub-app .hl-text {
                            background: rgba(59,130,246,0.22);
                            border-radius: 0.25rem;
                        }
                        .maths-sub-app .inline-eq {
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
                            gap: 0.1rem;
                        }
                        .maths-sub-app .inline-eq span {
                            font-family: 'Caveat', cursive, 'Inter', sans-serif;
                        }
                    </style>

                    <div class="controls">
                        <div class="title">Written Subtraction</div>
                        <div class="btn-row">
                            <button onclick="MathsSub.newProblem()">New Numbers</button>
                            <button id="mathssub-auto" class="auto" onclick="MathsSub.toggleAuto()">▶ Auto</button>
                            <button id="mathssub-prev" onclick="MathsSub.prev()" disabled>← Back</button>
                            <button id="mathssub-next" class="primary" onclick="MathsSub.next()">Start →</button>
                        </div>
                    </div>

                    <div class="panels">
                        <div class="card explain">
                            <div class="label">Explanations</div>
                            <div id="mathssub-explain"></div>
                        </div>
                        <div class="card calc">
                            <div class="label">Calculation</div>
                            <div id="mathssub-grid" class="math-grid"></div>
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
                                <i class="fa-solid fa-minus text-lg opacity-90"></i>
                                <span>1. Begriffe</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Minuend − Subtrahend = Differenz</strong>. Das Minuszeichen <code>−</code> verbindet die Zahlen.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-scale-balanced text-lg opacity-90"></i>
                                <span>2. Rechengesetze</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Kein</strong> Kommutativ- und <strong>kein</strong> Assoziativgesetz. <strong>Null</strong> als neutrales Element (nur rechts).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-arrow-down text-lg opacity-90"></i>
                                <span>3. Entbündeln</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Obere Ziffer &lt; untere Ziffer → <strong>10 von der nächsten Spalte leihen</strong> und dort mitrechnen.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-circle-check text-lg opacity-90"></i>
                                <span>4. Kontrolle</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Erst <strong>überschlagen</strong>, dann schriftlich rechnen. Zur Kontrolle: <strong>Differenz + Subtrahend = Minuend</strong>.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-minus text-lg opacity-90"></i>
                                <span>1. Terms</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Minuend − subtrahend = difference</strong>. The minus sign <code>−</code> connects the numbers.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-scale-balanced text-lg opacity-90"></i>
                                <span>2. Properties</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>No</strong> commutative and <strong>no</strong> associative law. <strong>Zero</strong> as neutral element (only on the right).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-arrow-down text-lg opacity-90"></i>
                                <span>3. Borrowing</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Top digit &lt; bottom digit → <strong>borrow 10 from the next column</strong> and include it there.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-circle-check text-lg opacity-90"></i>
                                <span>4. Check</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                First <strong>estimate</strong>, then calculate on paper. To check: <strong>difference + subtrahend = minuend</strong>.
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
            { icon: 'fa-wikipedia-w',    href: 'https://de.wikipedia.org/wiki/Subtraktion', target: '_blank', labelDe: 'Wikipedia: Subtraktion', labelEn: 'Wikipedia: Subtraction' },
            { icon: 'fa-wikipedia-w',    href: 'https://de.wikipedia.org/wiki/Schriftliche_Subtraktion', target: '_blank', labelDe: 'Wikipedia: Schriftliche Subtraktion', labelEn: 'Wikipedia: Written Subtraction' },
            { icon: 'fa-graduation-cap', href: 'https://www.mathematik.de/', target: '_blank', labelDe: 'Mathematik.de — Grundrechenarten', labelEn: 'Mathematik.de — Basic Arithmetic' },
            { icon: 'fa-calculator',     href: 'https://www.arndt-bruenner.de/mathe/scripts/schriftlichsubtrahieren.htm', target: '_blank', labelDe: 'Übungsaufgaben schriftliches Subtrahieren', labelEn: 'Written Subtraction Practice' }
        ]
    },

    footer: {
        textDe: 'Mathematik · Subtraktion · 2026',
        textEn: 'Mathematics · Subtraction · 2026'
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
        const btn = $('mathssub-auto');
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
        const next = $('mathssub-next');
        const prev = $('mathssub-prev');
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
        document.querySelectorAll('.maths-sub-app .hl-col, .maths-sub-app .hl-carry, .maths-sub-app .hl-cell, .maths-sub-app .hl-border, .maths-sub-app .hl-text')
            .forEach(e => e.classList.remove('hl-col', 'hl-carry', 'hl-cell', 'hl-border', 'hl-text'));
    }

    // ──────────────────────────────────────────────────────────────
    // GRID RENDERING
    // Row order (top → bottom):
    //   0: carry row   (Übertrag / borrow)  — sits ABOVE the minuend
    //   1: minuend     (num1)               — id col-{i}-r0
    //   2: subtrahend  (num2, with −)       — id col-{i}-r1, bottom border
    //   3: result      (Differenz)          — id col-{i}-res
    // ──────────────────────────────────────────────────────────────
    function renderGrid() {
        const grid = $('mathssub-grid');
        if (!grid) return;
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${state.cols}, minmax(2.5rem, 3.5rem))`;

        // Row 0: carry (Übertrag) — above the minuend
        for (let i = 0; i < state.cols; i++) {
            grid.innerHTML += `
                <div class="cell carry-wrap" id="col-${i}-carry-wrap">
                    <span class="carry" id="col-${i}-carry"></span>
                </div>`;
        }
        // Row 1: minuend
        for (let i = 0; i < state.cols; i++) {
            const v = state.aArr[i] === ' ' ? '&nbsp;' : state.aArr[i];
            grid.innerHTML += `<div class="cell" id="col-${i}-r0">${v}</div>`;
        }
        // Row 2: subtrahend (with − sign), carries the underline
        for (let i = 0; i < state.cols; i++) {
            const raw = state.bArr[i];
            const v = raw === ' ' ? '&nbsp;' : raw;
            const cls = raw === '−' ? 'cell r1-line minus' : 'cell r1-line';
            grid.innerHTML += `<div class="${cls}" id="col-${i}-r1">${v}</div>`;
        }
        // Row 3: result
        for (let i = 0; i < state.cols; i++) {
            grid.innerHTML += `<div class="cell res" id="col-${i}-res"></div>`;
        }
    }

    function renderExplanations() {
        const box = $('mathssub-explain');
        if (!box) return;
        box.innerHTML = '';

        box.innerHTML += `
            <div class="step" id="mathssub-step-0">
                <div class="title">
                    <span data-lang-de>Aufgabe</span><span data-lang-en style="display:none;">Task</span>
                </div>
                <div class="body">
                    <span data-lang-de>Subtrahiere</span><span data-lang-en style="display:none;">Subtract</span>
                    <strong>${state.num2}</strong>
                    <span data-lang-de>von</span><span data-lang-en style="display:none;">from</span>
                    <strong>${state.num1}</strong>.
                </div>
                <div class="action">
                    <span data-lang-de>Wir beginnen immer ganz rechts! 👉</span>
                    <span data-lang-en style="display:none;">We always start on the far right! 👉</span>
                </div>
            </div>`;

        state.steps.forEach((step, i) => {
            const id = i + 1;
            box.innerHTML += `
                <div class="step" id="mathssub-step-${id}">
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
        state.bArr.unshift('−');

        state.steps = [];
        let carry = 0;
        let stepIdx = 1;

        const wrapCell = (text, col, rowStr, cls) =>
            `<span class="${cls}">${text}</span>`;
        const wrapCol = (text, col, cls) =>
            `<span class="${cls}">${text}</span>`;

        for (let c = state.cols - 1; c > 0; c--) {
            let digitA = parseInt(state.aArr[c]) || 0;
            const raw = state.bArr[c];
            let digitB = parseInt(raw === ' ' || raw === '−' ? 0 : raw);
            let subVal = digitB + carry;
            let borrow = 0;
            let nextCarry = 0;
            let effectiveA = digitA;

            if (digitA < subVal) {
                borrow = 10;
                nextCarry = 1;
                effectiveA = digitA + 10;
            }

            const resDigit = effectiveA - subVal;
            const placeName = placeNames[(state.cols - 1) - c] || "nächste Stelle";

            const placeTitle = wrapCol(placeName, c, 'text-blue-300');
            const spanA = wrapCell(state.aArr[c] === ' ' ? '0' : state.aArr[c], c, 'r0', 'hover:text-white');
            const spanB = wrapCell(digitB, c, 'r1', 'hover:text-white');
            const spanC = carry > 0 ? wrapCell(carry, c, 'carry-wrap', 'text-red-400') : '';
            const spanSub = wrapCell(subVal, c, 'res', 'font-bold text-blue-400');
            const spanRes = wrapCell(resDigit, c, 'res', 'text-green-400');

            let eq = `<div class="inline-eq">`;
            if (carry > 0) {
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="first">Zuerst: </span>`;
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="r1">${spanB}</span>`;
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="plus">+</span>`;
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="carry-wrap">${spanC} <small style="color:var(--text-muted);">(Ü)</small></span>`;
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="eq">=</span>`;
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="col">${spanSub}</span>`;
                eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="then">Dann: </span>`;
            }
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="from">Von </span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="r0">${spanA}</span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="bis">bis </span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="col">${spanSub}</span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-op="sind">sind </span>`;
            eq += `<span class="anim-el fast" data-hl-clear="1" data-hl-col="${c}" data-hl-row="col">${spanRes}</span>`;
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
                // Übertrag belongs in the SAME column c (above the minuend digit we borrowed from)
                const spanNextC = wrapCell(nextCarry, c, 'carry-wrap', 'text-red-400');
                const carryTitle = wrapCol("Entbündeln", c, 'text-red-400');

                state.steps.push({
                    type: 'calc_carry',
                    targetCarryCol: c,
                    carryDigit: nextCarry,
                    expTitle: `<div class="title"><span data-lang-de>Schritt ${stepIdx}:</span><span data-lang-en style="display:none;">Step ${stepIdx}:</span> ${carryTitle}</div>`,
                    expText: `<div class="body"><span data-lang-de>Die</span><span data-lang-en style="display:none;">The</span> ${spanSub} <span data-lang-de>ist größer als die obere Ziffer.</span><span data-lang-en style="display:none;">is larger than the top digit.</span></div>`,
                    expAction: `<div class="action"><span data-lang-de>Schreibe</span><span data-lang-en style="display:none;">Write</span> ${spanNextC} <span data-lang-de>als Übertrag über die obere Ziffer!</span><span data-lang-en style="display:none;">as a carry above the top digit!</span></div>`
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
            expText: `<div class="body"><span data-lang-de>Die Differenz ist</span><span data-lang-en style="display:none;">The difference is</span> <strong style="color:#4ade80;">${state.num1 - state.num2}</strong>.</div>`,
            expAction: `<div class="action"><span data-lang-de>Sehr gut gemacht!</span><span data-lang-en style="display:none;">Well done!</span></div>`
        });
    }

    function newProblem() {
        if (state.isAnimating && !state.isAutoPlaying) return;
        if (!state.isAutoPlaying) stopAuto();

        state.num1 = Math.floor(Math.random() * 8999) + 1000;
        state.num2 = Math.floor(Math.random() * (state.num1 - 100)) + 10;

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

        const container = $(`mathssub-step-${state.currentStep}`);
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
            $(`mathssub-step-${state.currentStep}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            $('mathssub-explain')?.scrollTo({ top: 0, behavior: 'smooth' });
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
        const btnNext = $('mathssub-next');
        const btnPrev = $('mathssub-prev');
        if (btnNext) btnNext.disabled = true;
        if (btnPrev) btnPrev.disabled = true;

        clearHighlights();

        const container = $(`mathssub-step-${stepIndex}`);
        if (!container) { state.isAnimating = false; return; }
        container.classList.add('visible');

        const elements = Array.from(container.querySelectorAll('.anim-el'));

        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            el.classList.add('revealed');

            if (el.dataset.hlClear === '1') {
                document.querySelectorAll('.maths-sub-app .hl-cell, .maths-sub-app .hl-border, .maths-sub-app .hl-text')
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
        const app = document.getElementById('maths-sub-app');
        if (!app) return;
        if (state.initialised) return;
        state.initialised = true;
        newProblem();
    }

    window.MathsSub = {
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
        const app = document.getElementById('maths-sub-app');
        if (app && !state.initialised) {
            state.initialised = false;
            init();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();