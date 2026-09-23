// resources/topics/topic_template.js
// Registers a generic template topic. Loaded via <script> injection.

registerTopic({
    id: 'Template Topic 1',
    // ── SUB-CATEGORY (OPTIONAL) ─────────────────────────────────
    // Set `parentId` to the `id` of another registered topic to nest
    // this topic as a child inside that parent's dashboard card.
    // Leave undefined (or remove) to keep this topic at top level.
    // Example: parentId: 'Linux',
    // parentId: 'Linux',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-cube',
    titleDe: 'Template Thema',
    titleEn: 'Template Topic',
    descDe: 'Dies ist ein generisches Template-Thema.',
    descEn: 'This is a generic template topic.',

    // Sidebar header panel
    sidebarTitleDe: 'Template Titel',
    sidebarTitleEn: 'Template Title',
    sidebarSubtitleDe: 'Template Untertitel',
    sidebarSubtitleEn: 'Template Subtitle',
    sidebarVersion: 'Template v1.0',

    // Hero / intro panel at the top of the topic view
    hero: {
        titleDe: 'Template Hauptüberschrift',
        titleEn: 'Template Main Headline',
        introDe: 'Dies ist der generische Einleitungstext für das Template. Hier können Sie die wichtigsten Informationen und übergreifenden Zusammenhänge zusammenfassen. Ein Beispiel für eine <a href="#subsection4_1">interne Referenz</a> finden Sie hier.',
        introEn: 'This is the generic introductory text for the template. Here you can summarize the most important information and overarching context. An example of an <a href="#subsection4_1">internal reference</a> can be found here.'
    },

    // Quick-links grid
    quickLinks: [
        { icon: 'fa-bookmark',            href: '#section1', switchToDoc: true, labelDe: 'Bereich 1', labelEn: 'Section 1' },
        { icon: 'fa-layer-group',         href: '#section2', switchToDoc: true, labelDe: 'Bereich 2', labelEn: 'Section 2' },
        { icon: 'fa-chart-pie',           href: '#section3', switchToDoc: true, labelDe: 'Bereich 3', labelEn: 'Section 3' },
        { icon: 'fa-external-link-alt',   href: 'https://example.com', target: '_blank', labelDe: 'Extern',  labelEn: 'External' }
    ],

    // Content sections
    sections: [
        {
            id: 'section1',
            titleDe: 'Template Abschnitt Eins',
            titleEn: 'Template Section One',
            introDe: 'Hier beginnt der erste thematische Hauptabschnitt im Template. Nutzen Sie diesen Bereich für allgemeine Informationen.',
            introEn: 'This marks the beginning of the first main thematic section in the template. Use this space for general information.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Template Unterpunkt 1.1',
                    titleEn: 'Template Subtopic 1.1',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/3">Spalte 1</th>
                    <th>Spalte 2</th>
                    </tr>
                    <tr>
                    <td><strong>Merkmal 1</strong></td>
                    <td class="text-[var(--text-muted)]">Generische Beschreibung für Merkmal 1.</td>
                    </tr>
                    <tr>
                    <td><strong>Merkmal 2</strong></td>
                    <td class="text-[var(--text-muted)]">Generische Beschreibung für Merkmal 2.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/3">Column 1</th>
                    <th>Column 2</th>
                    </tr>
                    <tr>
                    <td><strong>Feature 1</strong></td>
                    <td class="text-[var(--text-muted)]">Generic description for Feature 1.</td>
                    </tr>
                    <tr>
                    <td><strong>Feature 2</strong></td>
                    <td class="text-[var(--text-muted)]">Generic description for Feature 2.</td>
                    </tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Template Unterpunkt 1.2',
                    titleEn: 'Template Subtopic 1.2',
                    htmlDe: `
                    <p class="text-xs">Ein generischer Unterpunkt mit einer Aufzählung:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Listenpunkt 1:</strong> Template Information 1.</li>
                    <li><strong>Listenpunkt 2:</strong> Template Information 2.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs">A generic subtopic featuring a list:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>List item 1:</strong> Template information 1.</li>
                    <li><strong>List item 2:</strong> Template information 2.</li>
                    </ul>
                    `
                }
            ]
        },

        {
            id: 'section2',
            titleDe: 'Template Abschnitt Zwei',
            titleEn: 'Template Section Two',
            subtopics: [
                {
                    id: 'subsection2_1',
              titleDe: 'Template Unterpunkt 2.1',
              titleEn: 'Template Subtopic 2.1',
              htmlDe: `
              <div class="overflow-x-auto w-full">
              <table class="wikitable">
              <tr><th class="w-1/4">Kategorie</th><th>Details</th></tr>
              <tr>
              <td><strong>Kategorie 1</strong></td>
              <td class="text-[var(--text-muted)]">Spezifische Platzhalter-Daten zu Kategorie 1.</td>
              </tr>
              </table>
              </div>
              `,
              htmlEn: `
              <div class="overflow-x-auto w-full">
              <table class="wikitable">
              <tr><th class="w-1/4">Category</th><th>Details</th></tr>
              <tr>
              <td><strong>Category 1</strong></td>
              <td class="text-[var(--text-muted)]">Specific placeholder data regarding Category 1.</td>
              </tr>
              </table>
              </div>
              `
                },
              {
                  id: 'subsection2_2',
              titleDe: 'Template Unterpunkt 2.2',
              titleEn: 'Template Subtopic 2.2',
              htmlDe: `
              <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
              <ul class="list-disc pl-4 space-y-1">
              <li><strong>Konzept 1:</strong> Dies ist ein generischer, hervorgehobener Block für wichtige Hinweise.</li>
              </ul>
              </div>
              `,
              htmlEn: `
              <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
              <ul class="list-disc pl-4 space-y-1">
              <li><strong>Concept 1:</strong> This is a generic highlighted block for important notes.</li>
              </ul>
              </div>
              `
              }
            ]
        },

        {
            id: 'section3',
            titleDe: 'Template Abschnitt Drei',
            titleEn: 'Template Section Three',
            subtopics: [
                {
                    id: 'subsection3_1',
              titleDe: 'Template Unterpunkt 3.1',
              titleEn: 'Template Subtopic 3.1',
              htmlDe: `
              <div class="overflow-x-auto w-full">
              <table class="wikitable">
              <tr><th class="w-[20%]">Feld</th><th>Werte</th></tr>
              <tr>
              <td><strong>Parameter 1</strong></td>
              <td class="text-[var(--text-muted)]">Generische Beschreibung des ersten Parameters.</td>
              </tr>
              </table>
              </div>
              `,
              htmlEn: `
              <div class="overflow-x-auto w-full">
              <table class="wikitable">
              <tr><th class="w-[20%]">Field</th><th>Values</th></tr>
              <tr>
              <td><strong>Parameter 1</strong></td>
              <td class="text-[var(--text-muted)]">Generic description of the first parameter.</td>
              </tr>
              </table>
              </div>
              `
                }
            ]
        },

        {
            id: 'section4',
            titleDe: 'Template Abschnitt Vier',
            titleEn: 'Template Section Four',
            subtopics: [
                {
                    id: 'subsection4_1',
              titleDe: 'Template Referenzen',
              titleEn: 'Template References',
              htmlDe: `<p class="text-xs">Wir können uns direkt auf Inhalte aus <a href="#subsection2_2">Unterpunkt 2.2</a> beziehen.</p>`,
              htmlEn: `<p class="text-xs">We can directly refer to content from <a href="#subsection2_2">Subtopic 2.2</a>.</p>`
                }
            ]
        },

        {
            id: 'section5',
            titleDe: 'Template Abschnitt Fünf',
            titleEn: 'Template Section Five',
            subtopics: [
                {
                    id: 'subsection5_1',
              titleDe: 'Template Fazit',
              titleEn: 'Template Conclusion',
              htmlDe: `<p class="text-xs">Dies markiert das Ende des Template-Inhalts. Gehen Sie nach <a href="#top">oben</a> für einen Neuanfang.</p>`,
              htmlEn: `<p class="text-xs">This marks the end of the template content. Go to the <a href="#top">top</a> for a fresh start.</p>`
                }
            ]
        },

        // --- TLDR TEMPLATE SECTION ---
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Eine kurze, einfache Zusammenfaßung der Template-Inhalte.',
            introEn: 'A short, easy summary of the template contents.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-cube opacity-70"></i>
                                <span>1. Info in Einfach 1</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Dies ist das erste Panel, in dem die obigen Informationen einfach und verständlich zusammengefasst werden.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-layer-group opacity-70"></i>
                                <span>2. Info in Einfach 2</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Dies ist das zweite Panel für die einfache Zusammenfassung der Themen von oben.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-shapes opacity-70"></i>
                                <span>3. Info in Einfach 3</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Dies ist das dritte Panel, das die vorherigen Abschnitte kurz und bündig auf den Punkt bringt.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-puzzle-piece opacity-70"></i>
                                <span>4. Info in Einfach 4</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Dies ist das vierte und letzte Panel für den leicht verständlichen Überblick der obigen Informationen.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-cube opacity-70"></i>
                                <span>1. Above Info in Easy 1</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                This is the first panel where all the information above gets explained in an easy way.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-layer-group opacity-70"></i>
                                <span>2. Above Info in Easy 2</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                This is the second panel for the simple summary of the topics above.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-shapes opacity-70"></i>
                                <span>3. Above Info in Easy 3</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                This is the third panel that concisely summarizes the previous sections.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-puzzle-piece opacity-70"></i>
                                <span>4. Above Info in Easy 4</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                This is the fourth and final panel for the easy-to-understand overview of the information above.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    // Animated illustrations
    illustrations: {
        titleDe: 'Template Illustrationen',
        titleEn: 'Template Illustrations',
        introDe: 'Hier ist Platz für generischen Beschreibungstext zu den nachfolgenden Animationen.',
        introEn: 'Space for generic descriptive text about the following animations here.',
        animations: [
            {
                id: 'illustration-1',
              type: 'packet-flow',
              titleDe: 'Template Animation 1',
              titleEn: 'Template Animation 1',
              descDe: 'Dies ist der Template-Text für die erste Animation. Erklären Sie hier einen generischen Prozess.',
              descEn: 'This is the template text for the first animation. Explain a generic process here.'
            },
            {
                id: 'illustration-2',
              type: 'template-layering',
              titleDe: 'Template Animation 2',
              titleEn: 'Template Animation 2',
              descDe: 'Dies ist der Template-Text für die zweite Animation. Erklären Sie hier einen strukturellen Aufbau.',
              descEn: 'This is the template text for the second animation. Explain a structural build-up here.'
            }
        ]
    },

    // External links block
    links: {
        titleDe: 'Template Links',
        titleEn: 'Template Links',
        items: [
            { icon: 'fa-globe',         href: '#', target: '_blank', labelDe: 'Template Link 1', labelEn: 'Template Link 1' },
            { icon: 'fa-link',          href: '#', target: '_blank', labelDe: 'Template Link 2', labelEn: 'Template Link 2' },
            { icon: 'fa-external-link', href: '#', target: '_blank', labelDe: 'Template Link 3', labelEn: 'Template Link 3' },
            { icon: 'fa-paperclip',     href: '#', target: '_blank', labelDe: 'Template Link 4', labelEn: 'Template Link 4' }
        ]
    },

    footer: {
        textDe: 'Template Autor 2026',
        textEn: 'Template Author 2026'
    }
});