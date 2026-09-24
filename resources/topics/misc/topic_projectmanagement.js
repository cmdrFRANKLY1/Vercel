// resources/topics/topic_projectmanagement.js
// Registers the Project Management topic — modern PM practice (2026).

registerTopic({
    id: 'Project Management',

    // ── SUB-CATEGORY (OPTIONAL) ─────────────────────────────────
    // Set `parentId` to the `id` of another registered topic to nest
    // this topic as a child inside that parent's dashboard card.
    // Leave undefined (or remove) to keep this topic at top level.
    //
    // Examples:
    //   parentId: 'management',   // → nested under a "Management" parent
    //   parentId: 'work',         // → nested under a "Work & Methods" parent
    // parentId: 'management',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-project-diagram',
    titleDe: 'Projekt Management',
    titleEn: 'Project Management',
    descDe: 'Moderne Praktiken, Modelle und Werkzeuge für Projekte im Jahr 2026.',
    descEn: 'Modern practices, models, and tools for projects in 2026.',

    // Sidebar header panel
    sidebarTitleDe: 'Projektmanagement',
    sidebarTitleEn: 'Project Management',
    sidebarSubtitleDe: 'Moderne Praxis',
    sidebarSubtitleEn: 'Modern Practice',
    sidebarVersion: '2026',

    // Hero / intro panel at the top of the topic view
    hero: {
        titleDe: 'Projektmanagement im Jahr 2026',
        titleEn: 'Project Management in 2026',
        introDe: 'Ein Projekt ist ein einmaliges, zeitlich begrenztes und zielgerichtetes Vorhaben (<a href="https://de.wikipedia.org/wiki/Projektmanagement#DIN_69901" target="_blank" class="text-blue-400 hover:underline">DIN 69901</a>). Was sich seit den klassischen Modellen verändert hat: Teams arbeiten verteilt, Anforderungen ändern sich schnell, KI-Werkzeuge übernehmen Planung und Reporting, und reine Wasserfall- oder <a href="https://scrumguides.org/" target="_blank" class="text-blue-400 hover:underline">Scrum</a>-Modelle werden zunehmend durch hybride Ansätze ersetzt.',
        introEn: 'A project is a unique, time-bound, and goal-oriented undertaking (<a href="https://en.wikipedia.org/wiki/Project_management#Standards" target="_blank" class="text-blue-400 hover:underline">DIN 69901</a>). What has changed since the classical models: teams work distributed, requirements shift quickly, AI tools handle planning and reporting, and pure waterfall or <a href="https://scrumguides.org/" target="_blank" class="text-blue-400 hover:underline">Scrum</a> models are increasingly replaced by hybrid approaches.'
    },

    // Quick-links grid
    quickLinks: [
        { icon: 'fa-draw-polygon',      href: '#section1', switchToDoc: true, labelDe: 'Grundlagen', labelEn: 'Basics' },
        { icon: 'fa-layer-group',       href: '#section2', switchToDoc: true, labelDe: 'Phasen', labelEn: 'Phases' },
        { icon: 'fa-recycle',           href: '#section3', switchToDoc: true, labelDe: 'Modelle', labelEn: 'Models' },
        { icon: 'fa-network-wired',     href: '#section4', switchToDoc: true, labelDe: 'Planung',  labelEn: 'Planning' },
        { icon: 'fa-palette',           href: '#section-illustrations', switchToDoc: true, labelDe: 'Visualisierungen', labelEn: 'Visuals' }
    ],

    // Content sections (Text & Tables)
    sections: [
        {
            id: 'section1',
            titleDe: 'Grundlagen & Dokumentation',
            titleEn: 'Basics & Documentation',
            introDe: 'Die Basis eines jeden Projekts sind klare Ziele und sauber definierte Erwartungen. Dazu gehören das Spannungsdreieck aus Zeit, Kosten und Umfang sowie die Unterscheidung zwischen Anforderungs- und Umsetzungsdokument.',
            introEn: 'The foundation of any project is clear goals and cleanly defined expectations. This includes the tension triangle of time, cost, and scope, as well as the distinction between requirements and implementation documents.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Das Spannungsdreieck',
                    titleEn: 'The Tension Triangle',
                    htmlDe: `
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                        body, h1, h2, h3, h4, h5, h6, p, span, div, a, li, td, th {
                            font-family: 'Inter', sans-serif !important;
                        }
                        [class^="fa-"], [class*=" fa-"], .fa, .fas, .far, .fab, .fa-solid, .fa-regular, .fa-brands {
                            font-family: "Font Awesome 6 Free", "Font Awesome 5 Free", "Font Awesome 6 Brands", "FontAwesome" !important;
                        }
                    </style>
                    <p class="text-xs mb-2">Das Spannungsdreieck beschreibt die drei konkurrierenden Hauptziele in einem Projekt. Verändert sich eine Dimension, wirkt sich das zwangsläufig auf mindestens eine der anderen aus. (Siehe Visualisierung unten)</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Dimension</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Zeit (Time)</strong></td><td class="text-[var(--text-muted)]">Projektdauer, Termine, Meilensteine. Starker Zeitdruck führt oft zu höheren Kosten oder geringerer Qualität.</td></tr>
                    <tr><td><strong>Kosten (Cost)</strong></td><td class="text-[var(--text-muted)]">Budget, Hard-/Software-Kosten, Personalaufwand.</td></tr>
                    <tr><td><strong>Umfang / Qualität (Scope)</strong></td><td class="text-[var(--text-muted)]">Projektinhalt, funktionale und nicht-funktionale Anforderungen.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                        body, h1, h2, h3, h4, h5, h6, p, span, div, a, li, td, th {
                            font-family: 'Inter', sans-serif !important;
                        }
                        [class^="fa-"], [class*=" fa-"], .fa, .fas, .far, .fab, .fa-solid, .fa-regular, .fa-brands {
                            font-family: "Font Awesome 6 Free", "Font Awesome 5 Free", "Font Awesome 6 Brands", "FontAwesome" !important;
                        }
                    </style>
                    <p class="text-xs mb-2">The tension triangle describes the three competing main goals in a project. If one dimension changes, it inevitably affects at least one of the others. (See visual below)</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Dimension</th><th>Description</th></tr>
                    <tr><td><strong>Time</strong></td><td class="text-[var(--text-muted)]">Project duration, deadlines, milestones. Severe time pressure often leads to higher cost or lower quality.</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">Budget, hardware/software costs, personnel expenses.</td></tr>
                    <tr><td><strong>Scope / Quality</strong></td><td class="text-[var(--text-muted)]">Project content, functional and non-functional requirements.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Anforderungs- vs. Umsetzungsdokument',
                    titleEn: 'Requirements vs. Implementation Document',
                    htmlDe: `
                    <p class="text-xs mb-2">Die beiden wichtigsten Dokumente in der Initiierungs- und Planungsphase:</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] shadow-[var(--control-shadow)]">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong class="text-blue-500">Anforderungsdokument (Lastenheft):</strong> Definiert <em>WAS</em> und <em>WOFÜR</em> gemacht werden soll. Wird vom <strong>Auftraggeber</strong> erstellt und beschreibt die Gesamtheit der Forderungen an Lieferungen und Leistungen.</li>
                    <li><strong class="text-green-500">Umsetzungsdokument (Pflichtenheft):</strong> Definiert <em>WIE</em> und <em>WOMIT</em> die Anforderungen umgesetzt werden. Wird vom <strong>Auftragnehmer</strong> auf Basis des Anforderungsdokuments erstellt. Nach beidseitiger Freigabe ist es die bindende Grundlage.</li>
                    </ul>
                    <p class="mt-2 text-[11px] italic">In der Praxis 2026 werden diese Dokumente oft durch <a href="https://www.atlassian.com/agile/project-management/user-stories" target="_blank" class="text-blue-400 hover:underline">User Stories</a>, <strong>Akzeptanzkriterien</strong> und ein <a href="https://scrumguides.org/scrum-guide.html#product-backlog" target="_blank" class="text-blue-400 hover:underline">Product Backlog</a> ersetzt oder ergänzt — die Grundidee bleibt aber dieselbe: <em>Was</em> und <em>Wie</em> müssen getrennt und explizit sein.</p>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The two most important documents in the initiation and planning phase:</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] shadow-[var(--control-shadow)]">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong class="text-blue-500">Requirements Document (Lastenheft):</strong> Defines <em>WHAT</em> and <em>WHAT FOR</em> is to be done. Created by the <strong>client</strong> and describes all demands regarding deliverables.</li>
                    <li><strong class="text-green-500">Implementation Document (Pflichtenheft):</strong> Defines <em>HOW</em> and <em>WITH WHAT</em> the requirements will be implemented. Created by the <strong>contractor</strong> based on the requirements document. Once both sides sign off, it forms the binding basis.</li>
                    </ul>
                    <p class="mt-2 text-[11px] italic">In 2026 practice these documents are often replaced or supplemented by <a href="https://www.atlassian.com/agile/project-management/user-stories" target="_blank" class="text-blue-400 hover:underline">user stories</a>, <strong>acceptance criteria</strong>, and a <a href="https://scrumguides.org/scrum-guide.html#product-backlog" target="_blank" class="text-blue-400 hover:underline">product backlog</a> — but the underlying idea stays the same: <em>what</em> and <em>how</em> must be separated and made explicit.</p>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section2',
            titleDe: 'Die 4 Projektphasen',
            titleEn: 'The 4 Project Phases',
            introDe: 'Klassisch durchläuft ein Projekt vier aufeinanderfolgende Phasen. In modernen Modellen überlappen sie sich, laufen iterativ oder werden mehrfach durchlaufen. (Siehe Zeitstrahl unter Visualisierungen)',
            introEn: 'Classically a project goes through four consecutive phases. In modern models they overlap, run iteratively, or are traversed multiple times. (See timeline in Visuals)',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Phasen im Detail',
                    titleEn: 'Phases in Detail',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Phase</th><th>Aktivitäten & Dokumente / Meilensteine</th></tr>
                    <tr>
                    <td><strong>1. Initiierung</strong></td>
                    <td class="text-[var(--text-muted)]">Projektidee, Machbarkeit, Risikoanalyse, Projektsteckbrief, Benennung der Projektleitung. <em>Meilenstein: Kick-off</em>.</td>
                    </tr>
                    <tr>
                    <td><strong>2. Planung</strong></td>
                    <td class="text-[var(--text-muted)]">Anforderungs- und Umsetzungsdokument, Projektstrukturplan (<a href="https://de.wikipedia.org/wiki/Projektstrukturplan" target="_blank" class="text-blue-400 hover:underline">WBS</a>), Zeit- und Ressourcenplanung (<a href="https://de.wikipedia.org/wiki/Gantt-Diagramm" target="_blank" class="text-blue-400 hover:underline">Gantt</a>, Netzplan, <a href="https://kanbanize.com/de/kanban-ressourcen/kanban-erste-schritte/was-ist-kanban" target="_blank" class="text-blue-400 hover:underline">Kanban</a>), Kosten- und Risikoplanung.</td>
                    </tr>
                    <tr>
                    <td><strong>3. Durchführung</strong></td>
                    <td class="text-[var(--text-muted)]">Umsetzung: Beschaffung, Entwicklung, Integration, Deployment. Steuerung und Controlling laufen parallel — in agilen Setups in Form von Sprints und Reviews.</td>
                    </tr>
                    <tr>
                    <td><strong>4. Abschluss</strong></td>
                    <td class="text-[var(--text-muted)]">Abnahme, Übergabe, Dokumentation, Schulung der Nutzer, Retrospektive (Lessons Learned), Auflösung des Teams.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Phase</th><th>Activities & Documents / Milestones</th></tr>
                    <tr>
                    <td><strong>1. Initiation</strong></td>
                    <td class="text-[var(--text-muted)]">Project idea, feasibility, risk analysis, project brief, naming the project lead. <em>Milestone: Kick-off</em>.</td>
                    </tr>
                    <tr>
                    <td><strong>2. Planning</strong></td>
                    <td class="text-[var(--text-muted)]">Requirements and implementation documents, Work Breakdown Structure (<a href="https://en.wikipedia.org/wiki/Work_breakdown_structure" target="_blank" class="text-blue-400 hover:underline">WBS</a>), schedule and resource planning (<a href="https://en.wikipedia.org/wiki/Gantt_chart" target="_blank" class="text-blue-400 hover:underline">Gantt</a>, network diagram, <a href="https://kanbanize.com/kanban-resources/getting-started/what-is-kanban" target="_blank" class="text-blue-400 hover:underline">Kanban</a>), cost and risk planning.</td>
                    </tr>
                    <tr>
                    <td><strong>3. Execution</strong></td>
                    <td class="text-[var(--text-muted)]">Implementation: procurement, development, integration, deployment. Monitoring and controlling run in parallel — in agile setups as sprints and reviews.</td>
                    </tr>
                    <tr>
                    <td><strong>4. Closure</strong></td>
                    <td class="text-[var(--text-muted)]">Sign-off, handover, documentation, user training, retrospective (lessons learned), team dissolution.</td>
                    </tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section3',
            titleDe: 'Vorgehensmodelle im Vergleich',
            titleEn: 'Process Models Compared',
            introDe: 'Wasserfall, Scrum und hybride Modelle lösen unterschiedliche Probleme. Die Wahl hängt von Komplexität, Änderungsrate und Risikoprofil ab. (Siehe Vergleichsgrafik unter Visualisierungen)',
            introEn: 'Waterfall, Scrum, and hybrid models solve different problems. The choice depends on complexity, rate of change, and risk profile. (See comparison graphic in Visuals)',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Klassisch vs. Agil vs. Hybrid',
                    titleEn: 'Classic vs. Agile vs. Hybrid',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[20%]">Kriterium</th><th>Wasserfall (Klassisch)</th><th><a href="https://scrumguides.org/" target="_blank" class="text-blue-400 hover:underline">Scrum</a> (Agil)</th><th>Hybrid</th></tr>
                    <tr>
                    <td><strong>Ablauf</strong></td>
                    <td class="text-[var(--text-muted)]">Linear, Phasen nacheinander.</td>
                    <td class="text-[var(--text-muted)]">Iterativ (<a href="https://scrumguides.org/scrum-guide.html#sprint" target="_blank" class="text-blue-400 hover:underline">Sprints</a>, 1–4 Wochen), fertiges Inkrement pro Sprint.</td>
                    <td class="text-[var(--text-muted)]">Kombination, z.B. klassische Planung + agile Umsetzung.</td>
                    </tr>
                    <tr>
                    <td><strong>Anforderungen</strong></td>
                    <td class="text-[var(--text-muted)]">Zu Beginn vollständig definiert.</td>
                    <td class="text-[var(--text-muted)]">Wachsen mit der Zeit (Backlog).</td>
                    <td class="text-[var(--text-muted)]">Grob vorab, Details iterativ.</td>
                    </tr>
                    <tr>
                    <td><strong>Rollen</strong></td>
                    <td class="text-[var(--text-muted)]">Auftraggeber, Projektleitung, Team.</td>
                    <td class="text-[var(--text-muted)]"><a href="https://scrumguides.org/scrum-guide.html#product-owner" target="_blank" class="text-blue-400 hover:underline">Product Owner</a>, <a href="https://scrumguides.org/scrum-guide.html#scrum-master" target="_blank" class="text-blue-400 hover:underline">Scrum Master</a>, <a href="https://scrumguides.org/scrum-guide.html#developers" target="_blank" class="text-blue-400 hover:underline">Developer</a>.</td>
                    <td class="text-[var(--text-muted)]">Projektleitung plus agiles Kernteam.</td>
                    </tr>
                    <tr>
                    <td><strong>Passt zu...</strong></td>
                    <td class="text-[var(--text-muted)]">Stabilen Rahmenbedingungen (Infrastruktur, Rollouts).</td>
                    <td class="text-[var(--text-muted)]">Unklarer Zielsetzung, hoher Änderungsrate (Produktentwicklung).</td>
                    <td class="text-[var(--text-muted)]">Regulierten Umgebungen mit agilem Kern (Regulated Industries, Plattformteams).</td>
                    </tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">In der Praxis dominiert 2026 der <strong>hybride Ansatz</strong>: außen klassisch (Budget, Compliance, Stakeholder), innen agil (Team, Umsetzung, Feedback).</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[20%]">Criterion</th><th>Waterfall (Classic)</th><th><a href="https://scrumguides.org/" target="_blank" class="text-blue-400 hover:underline">Scrum</a> (Agile)</th><th>Hybrid</th></tr>
                    <tr>
                    <td><strong>Process</strong></td>
                    <td class="text-[var(--text-muted)]">Linear, phases one after another.</td>
                    <td class="text-[var(--text-muted)]">Iterative (<a href="https://scrumguides.org/scrum-guide.html#sprint" target="_blank" class="text-blue-400 hover:underline">sprints</a>, 1–4 weeks), working increment per sprint.</td>
                    <td class="text-[var(--text-muted)]">Combination, e.g. classic planning + agile execution.</td>
                    </tr>
                    <tr>
                    <td><strong>Requirements</strong></td>
                    <td class="text-[var(--text-muted)]">Fully defined at start.</td>
                    <td class="text-[var(--text-muted)]">Grow over time (backlog).</td>
                    <td class="text-[var(--text-muted)]">Rough upfront, detailed iteratively.</td>
                    </tr>
                    <tr>
                    <td><strong>Roles</strong></td>
                    <td class="text-[var(--text-muted)]">Client, project lead, team.</td>
                    <td class="text-[var(--text-muted)]"><a href="https://scrumguides.org/scrum-guide.html#product-owner" target="_blank" class="text-blue-400 hover:underline">Product Owner</a>, <a href="https://scrumguides.org/scrum-guide.html#scrum-master" target="_blank" class="text-blue-400 hover:underline">Scrum Master</a>, <a href="https://scrumguides.org/scrum-guide.html#developers" target="_blank" class="text-blue-400 hover:underline">Developer</a>.</td>
                    <td class="text-[var(--text-muted)]">Project lead plus agile core team.</td>
                    </tr>
                    <tr>
                    <td><strong>Fits...</strong></td>
                    <td class="text-[var(--text-muted)]">Stable environments (infrastructure, rollouts).</td>
                    <td class="text-[var(--text-muted)]">Unclear goals, high rate of change (product development).</td>
                    <td class="text-[var(--text-muted)]">Regulated environments with an agile core (regulated industries, platform teams).</td>
                    </tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">In 2026 practice, the <strong>hybrid approach</strong> dominates: classic on the outside (budget, compliance, stakeholders), agile on the inside (team, execution, feedback).</p>
                    `
                }
            ]
        },

        {
            id: 'section4',
            titleDe: 'Planungstechnik',
            titleEn: 'Planning Technique',
            introDe: 'Die Netzplantechnik hilft, Gesamtdauer und kritische Aufgaben zu bestimmen. Jeder Vorgangsknoten enthält spezifische Zeiten. (Beispielknoten unter Visualisierungen).',
            introEn: 'Network diagram technique helps determine total duration and critical tasks. Each task node contains specific times. (Example node in Visuals).',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Wichtige Begriffe & Berechnung',
                    titleEn: 'Important Terms & Calculation',
                    htmlDe: `
                    <ul class="list-disc pl-4 mt-1.5 mb-3 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong>FAZ (Frühester Anfangszeitpunkt):</strong> Wann kann frühestens begonnen werden? (ermittelt durch <em>Vorwärtsrechnung</em>)</li>
                        <li><strong>FEZ (Frühester Endzeitpunkt):</strong> <code class="bg-[var(--code-bg)] border-[var(--border-color)] px-1 rounded text-[var(--text-color)]">FAZ + Dauer</code></li>
                        <li><strong>SEZ (Spätester Endzeitpunkt):</strong> Wann muss spätestens beendet werden, um das Projekt nicht zu verzögern? (ermittelt durch <em>Rückwärtsrechnung</em>)</li>
                        <li><strong>SAZ (Spätester Anfangszeitpunkt):</strong> <code class="bg-[var(--code-bg)] border-[var(--border-color)] px-1 rounded text-[var(--text-color)]">SEZ - Dauer</code></li>
                        <li><strong>Pufferzeit (GP - Gesamtpuffer):</strong> <code class="bg-[var(--code-bg)] border-[var(--border-color)] px-1 rounded text-[var(--text-color)]">SAZ - FAZ</code> (oder SEZ - FEZ). Zeitlicher Spielraum eines Vorgangs.</li>
                    </ul>
                    <div class="bg-red-500/10 p-3 border border-red-500/30 rounded text-xs text-[var(--text-color)] shadow-[var(--control-shadow)]">
                        <i class="fa-solid fa-triangle-exclamation text-red-500 mr-1"></i> <strong>Der Kritische Pfad:</strong> Die Kette von Vorgängen mit Pufferzeit <strong>Null (0)</strong>. Verzögert sich ein Vorgang auf diesem Pfad, verzögert sich unweigerlich das gesamte Projekt.
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Moderne Planungstools (<a href="https://www.atlassian.com/software/jira" target="_blank" class="text-blue-400 hover:underline">Jira</a>, <a href="https://linear.app/" target="_blank" class="text-blue-400 hover:underline">Linear</a>, <a href="https://www.microsoft.com/microsoft-365/project/project-management-software" target="_blank" class="text-blue-400 hover:underline">MS Project</a>, <a href="https://www.smartsheet.com/" target="_blank" class="text-blue-400 hover:underline">Smartsheet</a>, <a href="https://clickup.com/" target="_blank" class="text-blue-400 hover:underline">ClickUp</a>) berechnen den kritischen Pfad automatisch. Das Verständnis der Logik bleibt aber wichtig — besonders bei Konflikten zwischen Teams und beim Priorisieren unter Druck.</p>
                    `,
                    htmlEn: `
                    <ul class="list-disc pl-4 mt-1.5 mb-3 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong>EST (Earliest Start Time):</strong> Earliest possible start? (calculated via <em>forward pass</em>)</li>
                        <li><strong>EFT (Earliest Finish Time):</strong> <code class="bg-[var(--code-bg)] border-[var(--border-color)] px-1 rounded text-[var(--text-color)]">EST + Duration</code></li>
                        <li><strong>LFT (Latest Finish Time):</strong> Latest it must end without delaying the project? (calculated via <em>backward pass</em>)</li>
                        <li><strong>LST (Latest Start Time):</strong> <code class="bg-[var(--code-bg)] border-[var(--border-color)] px-1 rounded text-[var(--text-color)]">LFT - Duration</code></li>
                        <li><strong>Float/Slack (Total Float):</strong> <code class="bg-[var(--code-bg)] border-[var(--border-color)] px-1 rounded text-[var(--text-color)]">LST - EST</code> (or LFT - EFT). Flexibility of a task.</li>
                    </ul>
                    <div class="bg-red-500/10 p-3 border border-red-500/30 rounded text-xs text-[var(--text-color)] shadow-[var(--control-shadow)]">
                        <i class="fa-solid fa-triangle-exclamation text-red-500 mr-1"></i> <strong>The Critical Path:</strong> The chain of tasks whose float is exactly <strong>Zero (0)</strong>. If a task on this path is delayed, the entire project is delayed.
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Modern planning tools (<a href="https://www.atlassian.com/software/jira" target="_blank" class="text-blue-400 hover:underline">Jira</a>, <a href="https://linear.app/" target="_blank" class="text-blue-400 hover:underline">Linear</a>, <a href="https://www.microsoft.com/microsoft-365/project/project-management-software" target="_blank" class="text-blue-400 hover:underline">MS Project</a>, <a href="https://www.smartsheet.com/" target="_blank" class="text-blue-400 hover:underline">Smartsheet</a>, <a href="https://clickup.com/" target="_blank" class="text-blue-400 hover:underline">ClickUp</a>) compute the critical path automatically. Understanding the underlying logic still matters — especially when teams conflict and priorities must be set under pressure.</p>
                    `
                }
            ]
        },

        // --- TLDR SECTION ---
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten Punkte zum Projektmanagement auf einen Blick.',
            introEn: 'The most important points about project management at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-draw-polygon text-lg opacity-90"></i>
                                <span>1. Spannungsdreieck</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Zeit, Kosten, Umfang:</strong> Die drei Dimensionen, die sich gegenseitig beeinflussen. Ändert sich eine, müssen die anderen angepasst werden.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-file-contract text-lg opacity-90"></i>
                                <span>2. Dokumente</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Anforderung (Kunde):</strong> Was soll gemacht werden?<br><strong>Umsetzung (Auftragnehmer):</strong> Wie wird es umgesetzt (verbindliche Grundlage)?
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-rotate text-lg opacity-90"></i>
                                <span>3. Modelle</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Wasserfall:</strong> Starr, phasenbasiert, gut planbar.<br><strong>Scrum:</strong> Iterativ (Sprints), flexibel.<br><strong>Hybrid:</strong> Klassisch außen, agil innen — der Standard 2026.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-network-wired text-lg opacity-90"></i>
                                <span>4. Kritischer Pfad</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Im <strong>Netzplan</strong> der Weg mit <strong>Pufferzeit = 0</strong>. Eine Verzögerung hier verzögert das gesamte Projekt.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-draw-polygon text-lg opacity-90"></i>
                                <span>1. Tension Triangle</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Time, Cost, Scope:</strong> The three dimensions that influence each other. Changing one forces adjustments in the others.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-file-contract text-lg opacity-90"></i>
                                <span>2. Documents</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Requirements (client):</strong> What is to be done?<br><strong>Implementation (contractor):</strong> How will it be built (binding basis)?
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-rotate text-lg opacity-90"></i>
                                <span>3. Models</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Waterfall:</strong> Rigid, phase-based, predictable.<br><strong>Scrum:</strong> Iterative (sprints), flexible.<br><strong>Hybrid:</strong> Classic outside, agile inside — the 2026 default.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-network-wired text-lg opacity-90"></i>
                                <span>4. Critical Path</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                In the <strong>network diagram</strong>, the path with <strong>float = 0</strong>. A delay here delays the entire project.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    // Animated illustrations / Visuals placed entirely at the bottom
    illustrations: {
        titleDe: 'Visualisierungen & Grafiken',
        titleEn: 'Visualizations & Graphics',
        introDe: 'Die folgenden interaktiven Animationen dienen dem besseren Verständnis der wichtigsten Projektmanagement-Konzepte.',
        introEn: 'The following interactive animations serve to better understand the most important project management concepts.',
        animations: [

            /* ============================================================
               ANIMATION 1 — TENSION TRIANGLE
               ============================================================ */
            {
                id: 'vis-magic-triangle',
                titleDe: 'Das Spannungsdreieck',
                titleEn: 'The Tension Triangle',
                descDe: 'Die drei Zieldimensionen stehen in ständiger Wechselwirkung. Jede pulsiert nacheinander.',
                descEn: 'The three target dimensions are in constant tension. Each pulses in sequence.',
                html: `
                <style>
                    .pm-tri-stage {
                        position: relative;
                        width: 100%;
                        max-width: 380px;
                        height: 260px;
                        margin: 0.75rem auto;
                    }
                    .pm-tri-stage svg {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        overflow: visible;
                    }
                    .pm-tri-outline {
                        fill: none;
                        stroke: var(--border-color);
                        stroke-width: 2;
                        stroke-dasharray: 6 6;
                        vector-effect: non-scaling-stroke;
                        animation: pm-tri-dash 12s linear infinite;
                    }
                    @keyframes pm-tri-dash {
                        to { stroke-dashoffset: -100; }
                    }
                    .pm-tri-glow-line {
                        fill: none;
                        stroke: var(--link-color);
                        stroke-width: 2;
                        stroke-opacity: 0.35;
                        stroke-dasharray: 20 240;
                        vector-effect: non-scaling-stroke;
                        animation: pm-tri-run 6s ease-in-out infinite;
                    }
                    @keyframes pm-tri-run {
                        0%   { stroke-dashoffset: 260; }
                        100% { stroke-dashoffset: 0; }
                    }
                    .pm-tri-node {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.15rem;
                        transform: translate(-50%, -50%);
                        padding: 0.5rem 0.85rem;
                        border-radius: 0.55rem;
                        background: var(--panel-color);
                        border: 1px solid var(--border-color);
                        box-shadow: var(--control-shadow);
                        font-size: 0.62rem;
                        font-weight: 700;
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                        white-space: nowrap;
                        will-change: transform, box-shadow, border-color;
                    }
                    .pm-tri-node i {
                        font-size: 1.05rem;
                        line-height: 1;
                    }
                    .pm-tri-top   { top: 10%; left: 50%; color: #3b82f6; animation: pm-tri-pop-blue  6s ease-in-out infinite; }
                    .pm-tri-left  { top: 90%; left: 14%; color: #10b981; animation: pm-tri-pop-green 6s ease-in-out infinite; animation-delay: 2s; }
                    .pm-tri-right { top: 90%; left: 86%; color: #a855f7; animation: pm-tri-pop-purple 6s ease-in-out infinite; animation-delay: 4s; }

                    @keyframes pm-tri-pop-blue {
                        0%, 100% { transform: translate(-50%, -50%) scale(1);     border-color: var(--border-color); box-shadow: var(--control-shadow); }
                        12%, 28% { transform: translate(-50%, -50%) scale(1.14);  border-color: #3b82f6; box-shadow: 0 0 22px -2px rgba(59, 130, 246, 0.85); }
                        40%      { transform: translate(-50%, -50%) scale(1);     border-color: var(--border-color); box-shadow: var(--control-shadow); }
                    }
                    @keyframes pm-tri-pop-green {
                        0%, 100% { transform: translate(-50%, -50%) scale(1);     border-color: var(--border-color); box-shadow: var(--control-shadow); }
                        12%, 28% { transform: translate(-50%, -50%) scale(1.14);  border-color: #10b981; box-shadow: 0 0 22px -2px rgba(16, 185, 129, 0.85); }
                        40%      { transform: translate(-50%, -50%) scale(1);     border-color: var(--border-color); box-shadow: var(--control-shadow); }
                    }
                    @keyframes pm-tri-pop-purple {
                        0%, 100% { transform: translate(-50%, -50%) scale(1);     border-color: var(--border-color); box-shadow: var(--control-shadow); }
                        12%, 28% { transform: translate(-50%, -50%) scale(1.14);  border-color: #a855f7; box-shadow: 0 0 22px -2px rgba(168, 85, 247, 0.85); }
                        40%      { transform: translate(-50%, -50%) scale(1);     border-color: var(--border-color); box-shadow: var(--control-shadow); }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .pm-tri-node, .pm-tri-outline, .pm-tri-glow-line { animation: none !important; }
                    }
                </style>
                <div class="pm-tri-stage">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <polygon class="pm-tri-outline" points="50,10 86,90 14,90" />
                        <polygon class="pm-tri-glow-line" points="50,10 86,90 14,90" />
                    </svg>
                    <div class="pm-tri-node pm-tri-top">
                        <i class="fa-regular fa-clock"></i>
                        <span data-lang-de>Zeit</span><span data-lang-en style="display:none;">Time</span>
                    </div>
                    <div class="pm-tri-node pm-tri-left">
                        <i class="fa-solid fa-coins"></i>
                        <span data-lang-de>Kosten</span><span data-lang-en style="display:none;">Cost</span>
                    </div>
                    <div class="pm-tri-node pm-tri-right">
                        <i class="fa-solid fa-star"></i>
                        <span data-lang-de>Umfang</span><span data-lang-en style="display:none;">Scope</span>
                    </div>
                </div>
                `
            },

            /* ============================================================
               ANIMATION 2 — TIMELINE (4 PROJECT PHASES)
               ============================================================ */
            {
                id: 'vis-timeline',
                titleDe: 'Visueller Projektverlauf (4 Phasen)',
                titleEn: 'Visual Project Timeline (4 Phases)',
                descDe: 'Eine Welle läuft durch die 4 Phasen und hebt jede kurz hervor.',
                descEn: 'A wave travels through the 4 phases, briefly highlighting each.',
                html: `
                <style>
                    .pm-tl-stage {
                        position: relative;
                        width: 100%;
                        padding: 2.4rem 0 0.75rem;
                    }
                    .pm-tl-track {
                        position: absolute;
                        top: calc(2.4rem + 7px);
                        left: 12.5%;
                        right: 12.5%;
                        height: 3px;
                        background: var(--border-color);
                        border-radius: 2px;
                        overflow: hidden;
                    }
                    .pm-tl-fill {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(90deg, #3b82f6, #f59e0b, #a855f7, #10b981);
                        transform-origin: left center;
                        transform: scaleX(0);
                        animation: pm-tl-fill 8s ease-in-out infinite;
                        will-change: transform;
                    }
                    @keyframes pm-tl-fill {
                        0%, 4%   { transform: scaleX(0); }
                        88%, 94% { transform: scaleX(1); }
                        100%     { transform: scaleX(0); }
                    }
                    .pm-tl-grid {
                        position: relative;
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 0.4rem;
                    }
                    .pm-tl-phase {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.7rem;
                    }
                    .pm-tl-dot {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: var(--panel-color);
                        border: 2px solid var(--border-color);
                        position: relative;
                        z-index: 1;
                        will-change: transform, background, border-color, box-shadow;
                    }
                    .pm-tl-phase:nth-child(1) .pm-tl-dot { animation: pm-tl-dot-blue   8s ease-in-out infinite; animation-delay: 0.3s; }
                    .pm-tl-phase:nth-child(2) .pm-tl-dot { animation: pm-tl-dot-orange 8s ease-in-out infinite; animation-delay: 1.9s; }
                    .pm-tl-phase:nth-child(3) .pm-tl-dot { animation: pm-tl-dot-purple 8s ease-in-out infinite; animation-delay: 3.5s; }
                    .pm-tl-phase:nth-child(4) .pm-tl-dot { animation: pm-tl-dot-green  8s ease-in-out infinite; animation-delay: 5.1s; }

                    @keyframes pm-tl-dot-blue {
                        0%, 100% { transform: scale(1);   background: var(--panel-color); border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: scale(1.55); background: #3b82f6;           border-color: #3b82f6; box-shadow: 0 0 14px #3b82f6; }
                        34%      { transform: scale(1);   background: #3b82f6;           border-color: #3b82f6; box-shadow: 0 0 4px rgba(59,130,246,0.4); }
                    }
                    @keyframes pm-tl-dot-orange {
                        0%, 100% { transform: scale(1);   background: var(--panel-color); border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: scale(1.55); background: #f59e0b;           border-color: #f59e0b; box-shadow: 0 0 14px #f59e0b; }
                        34%      { transform: scale(1);   background: #f59e0b;           border-color: #f59e0b; box-shadow: 0 0 4px rgba(245,158,11,0.4); }
                    }
                    @keyframes pm-tl-dot-purple {
                        0%, 100% { transform: scale(1);   background: var(--panel-color); border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: scale(1.55); background: #a855f7;           border-color: #a855f7; box-shadow: 0 0 14px #a855f7; }
                        34%      { transform: scale(1);   background: #a855f7;           border-color: #a855f7; box-shadow: 0 0 4px rgba(168,85,247,0.4); }
                    }
                    @keyframes pm-tl-dot-green {
                        0%, 100% { transform: scale(1);   background: var(--panel-color); border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: scale(1.55); background: #10b981;           border-color: #10b981; box-shadow: 0 0 14px #10b981; }
                        34%      { transform: scale(1);   background: #10b981;           border-color: #10b981; box-shadow: 0 0 4px rgba(16,185,129,0.4); }
                    }

                    .pm-tl-card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.15rem;
                        padding: 0.55rem 0.45rem;
                        border-radius: 0.5rem;
                        background: var(--code-bg);
                        border: 1px solid var(--border-color);
                        width: 100%;
                        min-width: 0;
                        text-align: center;
                        will-change: transform, opacity, border-color, box-shadow;
                    }
                    .pm-tl-phase:nth-child(1) .pm-tl-card { animation: pm-tl-card-blue   8s ease-in-out infinite; animation-delay: 0.3s; }
                    .pm-tl-phase:nth-child(2) .pm-tl-card { animation: pm-tl-card-orange 8s ease-in-out infinite; animation-delay: 1.9s; }
                    .pm-tl-phase:nth-child(3) .pm-tl-card { animation: pm-tl-card-purple 8s ease-in-out infinite; animation-delay: 3.5s; }
                    .pm-tl-phase:nth-child(4) .pm-tl-card { animation: pm-tl-card-green  8s ease-in-out infinite; animation-delay: 5.1s; }

                    @keyframes pm-tl-card-blue {
                        0%, 100% { transform: translateY(6px); opacity: 0.35; border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: translateY(0);   opacity: 1;    border-color: #3b82f6; box-shadow: 0 0 18px -6px #3b82f6; }
                        40%      { transform: translateY(0);   opacity: 1;    border-color: var(--border-color); box-shadow: none; }
                    }
                    @keyframes pm-tl-card-orange {
                        0%, 100% { transform: translateY(6px); opacity: 0.35; border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: translateY(0);   opacity: 1;    border-color: #f59e0b; box-shadow: 0 0 18px -6px #f59e0b; }
                        40%      { transform: translateY(0);   opacity: 1;    border-color: var(--border-color); box-shadow: none; }
                    }
                    @keyframes pm-tl-card-purple {
                        0%, 100% { transform: translateY(6px); opacity: 0.35; border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: translateY(0);   opacity: 1;    border-color: #a855f7; box-shadow: 0 0 18px -6px #a855f7; }
                        40%      { transform: translateY(0);   opacity: 1;    border-color: var(--border-color); box-shadow: none; }
                    }
                    @keyframes pm-tl-card-green {
                        0%, 100% { transform: translateY(6px); opacity: 0.35; border-color: var(--border-color); box-shadow: none; }
                        6%, 22%  { transform: translateY(0);   opacity: 1;    border-color: #10b981; box-shadow: 0 0 18px -6px #10b981; }
                        40%      { transform: translateY(0);   opacity: 1;    border-color: var(--border-color); box-shadow: none; }
                    }

                    .pm-tl-card i { font-size: 0.9rem; line-height: 1; }
                    .pm-tl-card strong { font-size: 0.7rem; color: var(--heading-color); line-height: 1.1; }
                    .pm-tl-card span { font-size: 0.58rem; color: var(--text-muted); line-height: 1.2; }
                    .pm-tl-phase:nth-child(1) .pm-tl-card i { color: #3b82f6; }
                    .pm-tl-phase:nth-child(2) .pm-tl-card i { color: #f59e0b; }
                    .pm-tl-phase:nth-child(3) .pm-tl-card i { color: #a855f7; }
                    .pm-tl-phase:nth-child(4) .pm-tl-card i { color: #10b981; }

                    @media (prefers-reduced-motion: reduce) {
                        .pm-tl-fill, .pm-tl-dot, .pm-tl-card { animation: none !important; }
                    }
                </style>
                <div class="pm-tl-stage">
                    <div class="pm-tl-track"><div class="pm-tl-fill"></div></div>
                    <div class="pm-tl-grid">
                        <div class="pm-tl-phase">
                            <div class="pm-tl-dot"></div>
                            <div class="pm-tl-card">
                                <i class="fa-solid fa-lightbulb"></i>
                                <strong data-lang-de>Init</strong><strong data-lang-en style="display:none;">Init</strong>
                                <span data-lang-de>Kick-off</span><span data-lang-en style="display:none;">Kick-off</span>
                            </div>
                        </div>
                        <div class="pm-tl-phase">
                            <div class="pm-tl-dot"></div>
                            <div class="pm-tl-card">
                                <i class="fa-solid fa-map"></i>
                                <strong data-lang-de>Planung</strong><strong data-lang-en style="display:none;">Planning</strong>
                                <span data-lang-de>WBS & Gantt</span><span data-lang-en style="display:none;">WBS & Gantt</span>
                            </div>
                        </div>
                        <div class="pm-tl-phase">
                            <div class="pm-tl-dot"></div>
                            <div class="pm-tl-card">
                                <i class="fa-solid fa-hammer"></i>
                                <strong data-lang-de>Ausführung</strong><strong data-lang-en style="display:none;">Execution</strong>
                                <span data-lang-de>Umsetzung</span><span data-lang-en style="display:none;">Build</span>
                            </div>
                        </div>
                        <div class="pm-tl-phase">
                            <div class="pm-tl-dot"></div>
                            <div class="pm-tl-card">
                                <i class="fa-solid fa-flag-checkered"></i>
                                <strong data-lang-de>Abschluss</strong><strong data-lang-en style="display:none;">Closure</strong>
                                <span data-lang-de>Abnahme</span><span data-lang-en style="display:none;">Sign-off</span>
                            </div>
                        </div>
                    </div>
                </div>
                `
            },

            /* ============================================================
               ANIMATION 3 — WATERFALL vs SCRUM
               ============================================================ */
            {
                id: 'vis-process-models',
                titleDe: 'Vergleich: Wasserfall vs. Scrum',
                titleEn: 'Comparison: Waterfall vs. Scrum',
                descDe: 'Klassischer, sequenzieller Ablauf im Vergleich zum agilen Sprint-Zyklus.',
                descEn: 'Classic sequential flow compared to the agile sprint cycle.',
                html: `
                <style>
                    .pm-vs-stage {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 1rem;
                        margin: 0.5rem 0;
                    }
                    @media (max-width: 640px) {
                        .pm-vs-stage { grid-template-columns: 1fr; }
                    }
                    .pm-vs-col {
                        background: var(--panel-color);
                        border: 1px solid var(--panel-border);
                        border-radius: 0.6rem;
                        padding: 1rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.75rem;
                        overflow: hidden;
                        position: relative;
                        box-shadow: var(--control-shadow);
                    }
                    .pm-vs-title {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.4rem;
                        font-size: 0.72rem;
                        font-weight: 800;
                        letter-spacing: 0.06em;
                        text-transform: uppercase;
                        color: var(--heading-color);
                    }
                    .pm-vs-title i { font-size: 0.85rem; }
                    .pm-vs-col:first-child .pm-vs-title i { color: #3b82f6; }
                    .pm-vs-col:last-child  .pm-vs-title i { color: #a855f7; }

                    .pm-vs-stack {
                        display: flex;
                        flex-direction: column;
                        gap: 0.3rem;
                        width: 100%;
                        max-width: 220px;
                    }
                    .pm-vs-block {
                        padding: 0.5rem 0.6rem;
                        border-radius: 0.35rem;
                        background: var(--code-bg);
                        border-left: 4px solid #3b82f6;
                        font-size: 0.7rem;
                        font-weight: 600;
                        color: var(--text-color);
                        will-change: transform, opacity;
                        animation: pm-vs-slide 8s ease-in-out infinite;
                    }
                    .pm-vs-block:nth-child(1) { animation-delay: 0.2s; }
                    .pm-vs-block:nth-child(2) { animation-delay: 0.9s; }
                    .pm-vs-block:nth-child(3) { animation-delay: 1.6s; }
                    .pm-vs-block:nth-child(4) { animation-delay: 2.3s; }

                    @keyframes pm-vs-slide {
                        0%, 100% { transform: translateX(-14px); opacity: 0.25; }
                        12%, 60% { transform: translateX(0);     opacity: 1; }
                        80%      { transform: translateX(0);     opacity: 1; }
                    }

                    .pm-vs-loop-wrap {
                        position: relative;
                        width: 170px;
                        height: 170px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .pm-vs-loop {
                        position: absolute;
                        inset: 22px;
                        border-radius: 50%;
                        border: 2px dashed var(--border-color);
                    }
                    .pm-vs-rotor {
                        position: absolute;
                        inset: 22px;
                        will-change: transform;
                        animation: pm-vs-rotate 4s linear infinite;
                    }
                    .pm-vs-comet {
                        position: absolute;
                        top: -7px;
                        left: 50%;
                        width: 14px;
                        height: 14px;
                        margin-left: -7px;
                        border-radius: 50%;
                        background: #a855f7;
                        box-shadow: 0 0 14px #a855f7, 0 0 30px rgba(168, 85, 247, 0.55);
                    }
                    @keyframes pm-vs-rotate {
                        to { transform: rotate(360deg); }
                    }
                    .pm-vs-center {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.15rem;
                        color: #a855f7;
                        font-size: 0.72rem;
                        font-weight: 800;
                        letter-spacing: 0.05em;
                    }
                    .pm-vs-center i {
                        font-size: 1.8rem;
                        animation: pm-vs-pulse 2s ease-in-out infinite;
                        will-change: transform;
                    }
                    @keyframes pm-vs-pulse {
                        0%, 100% { transform: scale(1); }
                        50%      { transform: scale(1.12); }
                    }
                    .pm-vs-label {
                        position: absolute;
                        font-size: 0.6rem;
                        font-weight: 700;
                        padding: 0.15rem 0.4rem;
                        border-radius: 0.3rem;
                        background: var(--code-bg);
                        border: 1px solid var(--border-color);
                        color: var(--text-color);
                        white-space: nowrap;
                        box-shadow: var(--control-shadow);
                    }
                    .pm-vs-l1 { top: 0;    left: 50%; transform: translateX(-50%); }
                    .pm-vs-l2 { top: 50%;  right: -6px; transform: translateY(-50%); }
                    .pm-vs-l3 { bottom: 0; left: 50%; transform: translateX(-50%); }
                    .pm-vs-l4 { top: 50%;  left: -6px;  transform: translateY(-50%); }

                    @media (prefers-reduced-motion: reduce) {
                        .pm-vs-block, .pm-vs-rotor, .pm-vs-center i { animation: none !important; }
                    }
                </style>
                <div class="pm-vs-stage">
                    <div class="pm-vs-col">
                        <div class="pm-vs-title">
                            <i class="fa-solid fa-water"></i>
                            <span data-lang-de>Wasserfall</span><span data-lang-en style="display:none;">Waterfall</span>
                        </div>
                        <div class="pm-vs-stack">
                            <div class="pm-vs-block"><span data-lang-de>Anforderungen</span><span data-lang-en style="display:none;">Requirements</span></div>
                            <div class="pm-vs-block"><span data-lang-de>Design</span><span data-lang-en style="display:none;">Design</span></div>
                            <div class="pm-vs-block"><span data-lang-de>Umsetzung</span><span data-lang-en style="display:none;">Implementation</span></div>
                            <div class="pm-vs-block"><span data-lang-de>Test & Betrieb</span><span data-lang-en style="display:none;">Test & Ops</span></div>
                        </div>
                    </div>
                    <div class="pm-vs-col">
                        <div class="pm-vs-title">
                            <i class="fa-solid fa-rotate"></i>
                            <span data-lang-de>Scrum (Agil)</span><span data-lang-en style="display:none;">Scrum (Agile)</span>
                        </div>
                        <div class="pm-vs-loop-wrap">
                            <div class="pm-vs-loop"></div>
                            <div class="pm-vs-rotor"><div class="pm-vs-comet"></div></div>
                            <div class="pm-vs-center">
                                <i class="fa-solid fa-arrows-rotate"></i>
                                <span>Sprint</span>
                            </div>
                            <div class="pm-vs-label pm-vs-l1"><span data-lang-de>Planning</span><span data-lang-en style="display:none;">Planning</span></div>
                            <div class="pm-vs-label pm-vs-l2">Daily</div>
                            <div class="pm-vs-label pm-vs-l3">Review</div>
                            <div class="pm-vs-label pm-vs-l4">Retro</div>
                        </div>
                    </div>
                </div>
                `
            },

            /* ============================================================
               ANIMATION 4 — NETWORK NODE (FORWARD + BACKWARD PASS)
               ============================================================ */
            {
                id: 'vis-network-node',
                titleDe: 'Aufbau eines Netzplanknotens',
                titleEn: 'Structure of a Network Node',
                descDe: 'Vorwärtsrechnung (blau: FAZ, Dauer, FEZ) und Rückwärtsrechnung (rot: SAZ, GP, SEZ) werden nacheinander hervorgehoben.',
                descEn: 'Forward pass (blue: EST, Dur, EFT) and backward pass (red: LST, Float, LFT) are highlighted in sequence.',
                html: `
                <style>
                    .pm-np-stage {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.6rem;
                        padding: 0.75rem 0.25rem;
                    }
                    .pm-np-hint {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        font-size: 0.6rem;
                        font-weight: 700;
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                    }
                    .pm-np-hint span { display: inline-flex; align-items: center; gap: 0.35rem; }
                    .pm-np-hint .pm-np-dot {
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                    }
                    .pm-np-hint .pm-np-dot.blue { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
                    .pm-np-hint .pm-np-dot.red  { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
                    .pm-np-hint .pm-np-lbl-blue { color: #3b82f6; }
                    .pm-np-hint .pm-np-lbl-red  { color: #ef4444; }

                    .pm-np-node {
                        width: 100%;
                        max-width: 380px;
                        border: 2px solid var(--border-color);
                        border-radius: 0.6rem;
                        overflow: hidden;
                        background: var(--bg-color);
                        box-shadow: var(--card-shadow);
                    }
                    .pm-np-row {
                        display: grid;
                    }
                    .pm-np-top, .pm-np-bot { grid-template-columns: repeat(3, 1fr); }
                    .pm-np-cell {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.1rem;
                        padding: 0.55rem 0.3rem;
                        border-right: 1px solid var(--border-color);
                        font-family: 'Fira Code', monospace;
                    }
                    .pm-np-cell:last-child { border-right: none; }
                    .pm-np-top { border-bottom: 1px solid var(--border-color); background: var(--info-box); }
                    .pm-np-bot { background: var(--info-box); }
                    .pm-np-mid {
                        grid-template-columns: 1fr;
                        padding: 0.6rem 0.4rem;
                        text-align: center;
                        font-weight: 800;
                        letter-spacing: 0.04em;
                        font-size: 0.78rem;
                        color: var(--heading-color);
                        border-bottom: 1px solid var(--border-color);
                    }
                    .pm-np-lbl {
                        font-size: 0.58rem;
                        font-weight: 700;
                        letter-spacing: 0.06em;
                        text-transform: uppercase;
                        color: var(--text-muted);
                    }
                    .pm-np-val {
                        font-size: 0.95rem;
                        font-weight: 800;
                        color: var(--heading-color);
                        will-change: transform, text-shadow, color;
                    }

                    .pm-np-top .pm-np-cell:nth-child(1) .pm-np-val { animation: pm-np-blue 6s ease-in-out infinite; animation-delay: 0.2s; }
                    .pm-np-top .pm-np-cell:nth-child(2) .pm-np-val { animation: pm-np-blue 6s ease-in-out infinite; animation-delay: 0.8s; }
                    .pm-np-top .pm-np-cell:nth-child(3) .pm-np-val { animation: pm-np-blue 6s ease-in-out infinite; animation-delay: 1.4s; }

                    .pm-np-bot .pm-np-cell:nth-child(1) .pm-np-val { animation: pm-np-red 6s ease-in-out infinite; animation-delay: 2.8s; }
                    .pm-np-bot .pm-np-cell:nth-child(2) .pm-np-val { animation: pm-np-red 6s ease-in-out infinite; animation-delay: 3.4s; }
                    .pm-np-bot .pm-np-cell:nth-child(3) .pm-np-val { animation: pm-np-red 6s ease-in-out infinite; animation-delay: 4.0s; }

                    @keyframes pm-np-blue {
                        0%, 100% { color: var(--heading-color); transform: scale(1);    text-shadow: none; }
                        8%, 20%  { color: #3b82f6;             transform: scale(1.25); text-shadow: 0 0 14px rgba(59, 130, 246, 0.95); }
                        32%      { color: var(--heading-color); transform: scale(1);   text-shadow: none; }
                    }
                    @keyframes pm-np-red {
                        0%, 100% { color: var(--heading-color); transform: scale(1);    text-shadow: none; }
                        8%, 20%  { color: #ef4444;             transform: scale(1.25); text-shadow: 0 0 14px rgba(239, 68, 68, 0.95); }
                        32%      { color: var(--heading-color); transform: scale(1);    text-shadow: none; }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .pm-np-val { animation: none !important; }
                    }
                </style>
                <div class="pm-np-stage">
                    <div class="pm-np-hint">
                        <span class="pm-np-dot blue"></span>
                        <span class="pm-np-lbl-blue" data-lang-de>Vorwärtsrechnung</span>
                        <span class="pm-np-lbl-blue" data-lang-en style="display:none;">Forward Pass</span>
                        <span class="pm-np-dot red"></span>
                        <span class="pm-np-lbl-red" data-lang-de>Rückwärtsrechnung</span>
                        <span class="pm-np-lbl-red" data-lang-en style="display:none;">Backward Pass</span>
                    </div>
                    <div class="pm-np-node">
                        <div class="pm-np-row pm-np-top">
                            <div class="pm-np-cell">
                                <span class="pm-np-lbl"><span data-lang-de>FAZ</span><span data-lang-en style="display:none;">EST</span></span>
                                <span class="pm-np-val">0</span>
                            </div>
                            <div class="pm-np-cell">
                                <span class="pm-np-lbl"><span data-lang-de>Dauer</span><span data-lang-en style="display:none;">Dur</span></span>
                                <span class="pm-np-val">5</span>
                            </div>
                            <div class="pm-np-cell">
                                <span class="pm-np-lbl"><span data-lang-de>FEZ</span><span data-lang-en style="display:none;">EFT</span></span>
                                <span class="pm-np-val">5</span>
                            </div>
                        </div>
                        <div class="pm-np-row pm-np-mid">
                            <span data-lang-de>Vorgang A (Nr.)</span>
                            <span data-lang-en style="display:none;">Task A (No.)</span>
                        </div>
                        <div class="pm-np-row pm-np-bot">
                            <div class="pm-np-cell">
                                <span class="pm-np-lbl"><span data-lang-de>SAZ</span><span data-lang-en style="display:none;">LST</span></span>
                                <span class="pm-np-val">0</span>
                            </div>
                            <div class="pm-np-cell">
                                <span class="pm-np-lbl"><span data-lang-de>GP</span><span data-lang-en style="display:none;">Float</span></span>
                                <span class="pm-np-val">0</span>
                            </div>
                            <div class="pm-np-cell">
                                <span class="pm-np-lbl"><span data-lang-de>SEZ</span><span data-lang-en style="display:none;">LFT</span></span>
                                <span class="pm-np-val">5</span>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }
        ]
    },

    // External links block
    links: {
        titleDe: 'Weiterführende Ressourcen',
        titleEn: 'Further Resources',
        items: [
            { icon: 'fa-globe',         href: 'https://scrumguides.org/scrum-guide.html', target: '_blank', labelDe: 'Der offizielle Scrum Guide', labelEn: 'The Official Scrum Guide' },
            { icon: 'fa-wikipedia-w',   href: 'https://de.wikipedia.org/wiki/Netzplantechnik', target: '_blank', labelDe: 'Wikipedia: Netzplantechnik', labelEn: 'Wikipedia: Network Diagrams' },
            { icon: 'fa-book-open',     href: 'https://de.wikipedia.org/wiki/Projektmanagement', target: '_blank', labelDe: 'Wikipedia: Projektmanagement', labelEn: 'Wikipedia: Project Management' }
        ]
    },

    footer: {
        textDe: 'Projektmanagement · Moderne Praxis 2026',
        textEn: 'Project Management · Modern Practice 2026'
    }
});