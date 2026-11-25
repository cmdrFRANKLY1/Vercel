registerTopic({
    id: 'MathsMultiplication',
    parentId: 'Mathematics',
    icon: 'fa-xmark',
    titleDe: 'Multiplikation',
    titleEn: 'Multiplication',
    descDe: 'Multiplikation verstehen und schriftlich multiplizieren – mit einer interaktiven handschriftlichen Schritt-für-Schritt-Animation.',
    descEn: 'Understand multiplication and learn the written method with an interactive handwritten, step-by-step animation.',

    sidebarTitleDe: 'Multiplikation',
    sidebarTitleEn: 'Multiplication',
    sidebarSubtitleDe: 'Grundrechenarten',
    sidebarSubtitleEn: 'Basic Arithmetic',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'Multiplikation',
        titleEn: 'Multiplication',
        introDe: 'Die Multiplikation fasst gleich große Gruppen zusammen. Hier lernst du die Grundlagen und kannst das schriftliche Multiplizieren Schritt für Schritt handschriftlich animiert nachvollziehen.',
        introEn: 'Multiplication combines equal-sized groups. Learn the basics and follow written multiplication step by step with a handwritten animation.'
    },

    quickLinks: [
        { icon: 'fa-lightbulb', href: '#section1', switchToDoc: true, labelDe: 'Grundlagen', labelEn: 'Basics' },
        { icon: 'fa-list-ol', href: '#section2', switchToDoc: true, labelDe: 'Schriftlich multiplizieren', labelEn: 'Written multiplication' },
        { icon: 'fa-film', href: '#section3', switchToDoc: true, labelDe: 'Animation', labelEn: 'Animation' }
    ],

    sections: [
        {
            id: 'section1',
            titleDe: 'Grundlagen',
            titleEn: 'Basics',
            introDe: 'Multiplikation ist wiederholte Addition gleicher Summanden.',
            introEn: 'Multiplication is repeated addition of equal addends.',
            subtopics: [
                {
                    id: 'multiplication-meaning',
                    titleDe: 'Was bedeutet Multiplizieren?',
                    titleEn: 'What does multiplication mean?',
                    htmlDe: '<p class="text-xs mb-2">Bei <code>3 × 4</code> werden drei Gruppen mit je vier Elementen zusammengefasst: <code>4 + 4 + 4 = 12</code>. Das Ergebnis heißt <strong>Produkt</strong>; die Zahlen heißen <strong>Faktoren</strong>.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">3 × 4 = 12<br>Faktor × Faktor = Produkt</div><p class="text-xs text-[var(--text-muted)]">Bei ganzen Zahlen darf man die Faktoren vertauschen: <code>3 × 4 = 4 × 3</code>.</p>',
                    htmlEn: '<p class="text-xs mb-2">In <code>3 × 4</code>, three groups of four are combined: <code>4 + 4 + 4 = 12</code>. The result is the <strong>product</strong>; the numbers are <strong>factors</strong>.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">3 × 4 = 12<br>Factor × Factor = Product</div><p class="text-xs text-[var(--text-muted)]">For whole numbers, the factors can be swapped: <code>3 × 4 = 4 × 3</code>.</p>'
                }
            ]
        },
        {
            id: 'section2',
            titleDe: 'Schriftlich multiplizieren',
            titleEn: 'Written multiplication',
            introDe: 'Mehrstellige Zahlen werden stellenweise multipliziert. Teilprodukte werden anschließend passend untereinander geschrieben und addiert.',
            introEn: 'Multiply multi-digit numbers one place at a time. Then align and add the partial products.',
            subtopics: [
                {
                    id: 'multiplication-method',
                    titleDe: 'Teilprodukte bilden',
                    titleEn: 'Build partial products',
                    htmlDe: '<p class="text-xs">Bei jeder Ziffer des zweiten Faktors multiplizierst du den ersten Faktor. Das jeweilige Teilprodukt rückt entsprechend der Stellenwertigkeit nach links. Überträge werden in der nächsten Stelle berücksichtigt.</p>',
                    htmlEn: '<p class="text-xs">For each digit of the second factor, multiply the first factor. Shift each partial product according to its place value, carrying into the next place when needed.</p>'
                }
            ]
        },
        {
            id: 'section3',
            titleDe: 'Handschriftliche Animation',
            titleEn: 'Handwritten animation',
            introDe: 'Gehe mit Weiter oder Auto durch eine zufällige Aufgabe. Die Ziffern und Erklärungen werden passend zum Rechenschritt hervorgehoben.',
            introEn: 'Use Next or Auto to follow a randomly generated problem. Digits and explanations are highlighted as each step is written.',
            subtopics: [
                {
                    id: 'multiplication-animation',
                    titleDe: 'Schriftliches Multiplizieren – Animation',
                    titleEn: 'Written multiplication – animation',
                    htmlDe: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handschriftliche Animation zum schriftlichen Multiplizieren" src="resources/animations/maths_multiplication_rc.htm?lang=de" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div><p class="text-xs mt-2 text-[var(--text-muted)]">Die Animation verwendet ganze Zahlen und zeigt die Teilprodukte einschließlich Überträgen.</p>',
                    htmlEn: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handwritten written-multiplication animation" src="resources/animations/maths_multiplication_rc.htm?lang=en" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div><p class="text-xs mt-2 text-[var(--text-muted)]">The animation uses whole numbers and shows partial products, including carries.</p>'
                }
            ]
        }
    ],

    footer: {
        textDe: 'Mathematik · Multiplikation · 2026',
        textEn: 'Mathematics · Multiplication · 2026'
    }
});
