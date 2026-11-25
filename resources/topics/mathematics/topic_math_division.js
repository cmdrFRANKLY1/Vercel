registerTopic({
    id: 'MathsDivision',
    parentId: 'Mathematics',
    icon: 'fa-divide',
    titleDe: 'Division',
    titleEn: 'Division',
    descDe: 'Division verstehen und schriftlich dividieren – mit einer interaktiven handschriftlichen Schritt-für-Schritt-Animation.',
    descEn: 'Understand division and learn the written method with an interactive handwritten, step-by-step animation.',

    sidebarTitleDe: 'Division',
    sidebarTitleEn: 'Division',
    sidebarSubtitleDe: 'Grundrechenarten',
    sidebarSubtitleEn: 'Basic Arithmetic',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'Division',
        titleEn: 'Division',
        introDe: 'Die Division verteilt eine Menge gleichmäßig oder bestimmt, wie oft eine Zahl in eine andere passt. Hier lernst du die Grundlagen und kannst das schriftliche Dividieren Schritt für Schritt handschriftlich animiert nachvollziehen.',
        introEn: 'Division shares a quantity equally or tells how many times one number fits into another. Learn the basics and follow written division step by step with a handwritten animation.'
    },

    quickLinks: [
        { icon: 'fa-lightbulb', href: '#section1', switchToDoc: true, labelDe: 'Grundlagen', labelEn: 'Basics' },
        { icon: 'fa-list-ol', href: '#section2', switchToDoc: true, labelDe: 'Schriftlich dividieren', labelEn: 'Written division' },
        { icon: 'fa-film', href: '#section3', switchToDoc: true, labelDe: 'Animation', labelEn: 'Animation' }
    ],

    sections: [
        {
            id: 'section1',
            titleDe: 'Grundlagen',
            titleEn: 'Basics',
            introDe: 'Division ist die Umkehroperation der Multiplikation.',
            introEn: 'Division is the inverse operation of multiplication.',
            subtopics: [
                {
                    id: 'division-meaning',
                    titleDe: 'Was bedeutet Dividieren?',
                    titleEn: 'What does division mean?',
                    htmlDe: '<p class="text-xs mb-2">Bei <code>12 ÷ 3 = 4</code> werden zwölf Elemente in drei gleich große Gruppen verteilt – oder gefragt, wie oft 3 in 12 passt. Die 12 heißt <strong>Dividend</strong>, die 3 <strong>Divisor</strong> und das Ergebnis <strong>Quotient</strong>.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">12 ÷ 3 = 4<br>Dividend ÷ Divisor = Quotient</div><p class="text-xs text-[var(--text-muted)]">Probe: Multipliziere Quotient und Divisor. Hier gilt <code>4 × 3 = 12</code>.</p>',
                    htmlEn: '<p class="text-xs mb-2">In <code>12 ÷ 3 = 4</code>, twelve items are shared equally among three groups—or we ask how many times 3 fits into 12. The 12 is the <strong>dividend</strong>, 3 is the <strong>divisor</strong>, and the result is the <strong>quotient</strong>.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">12 ÷ 3 = 4<br>Dividend ÷ Divisor = Quotient</div><p class="text-xs text-[var(--text-muted)]">Check by multiplying the quotient by the divisor: <code>4 × 3 = 12</code>.</p>'
                }
            ]
        },
        {
            id: 'section2',
            titleDe: 'Schriftlich dividieren',
            titleEn: 'Written division',
            introDe: 'Beim schriftlichen Dividieren werden die Ziffern des Dividenden nacheinander verarbeitet.',
            introEn: 'Written division processes the digits of the dividend from left to right.',
            subtopics: [
                {
                    id: 'division-method',
                    titleDe: 'Teilen, multiplizieren, subtrahieren',
                    titleEn: 'Divide, multiply, subtract',
                    htmlDe: '<p class="text-xs">Bestimme für jede Teilzahl, wie oft der Divisor hineinpasst. Schreibe diese Ziffer in den Quotienten, multipliziere zurück und ziehe das Produkt ab. Der Rest wird mit der nächsten Ziffer heruntergeholt.</p>',
                    htmlEn: '<p class="text-xs">For each partial dividend, find how many times the divisor fits. Write that digit in the quotient, multiply back, and subtract the product. Bring down the next digit to continue.</p>'
                }
            ]
        },
        {
            id: 'section3',
            titleDe: 'Handschriftliche Animation',
            titleEn: 'Handwritten animation',
            introDe: 'Gehe mit Weiter oder Auto durch eine zufällige Aufgabe. Die Teilrechnungen, Zwischenergebnisse und der Quotient werden Schritt für Schritt hervorgehoben.',
            introEn: 'Use Next or Auto to follow a randomly generated problem. Partial calculations, intermediate results, and the quotient are highlighted step by step.',
            subtopics: [
                {
                    id: 'division-animation',
                    titleDe: 'Schriftliches Dividieren – Animation',
                    titleEn: 'Written division – animation',
                    htmlDe: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handschriftliche Animation zum schriftlichen Dividieren" src="resources/animations/maths_division_rc.htm?lang=de" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div><p class="text-xs mt-2 text-[var(--text-muted)]">Die Animation verwendet Divisionen ohne Rest, damit jeder Schritt eindeutig nachvollziehbar bleibt.</p>',
                    htmlEn: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handwritten written-division animation" src="resources/animations/maths_division_rc.htm?lang=en" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div><p class="text-xs mt-2 text-[var(--text-muted)]">The animation uses divisions with no remainder so every step is easy to follow.</p>'
                }
            ]
        }
    ],

    footer: {
        textDe: 'Mathematik · Division · 2026',
        textEn: 'Mathematics · Division · 2026'
    }
});
