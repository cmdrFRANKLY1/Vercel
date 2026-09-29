// resources/topics/topic_databases.js

registerTopic({
    id: 'Databases',

    // ── SUB-CATEGORY ────────────────────────────────────────────
    parentId: 'Informatik',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-database',
    titleDe: 'Datenbanken',
    titleEn: 'Databases',
    descDe: 'Vom ersten Entwurf bis zum laufenden Betrieb — Lebenszyklus, Anforderungsanalyse und ER-Modellierung.',
    descEn: 'From first draft to live operation — lifecycle, requirements analysis, and ER modeling.',

    sidebarTitleDe: 'Datenbanken',
    sidebarTitleEn: 'Databases',
    sidebarSubtitleDe: 'Lebenszyklus & Modellierung',
    sidebarSubtitleEn: 'Lifecycle & Modeling',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'Datenbank-Lebenszyklus & Anforderungsanalyse',
        titleEn: 'Database Lifecycle & Requirements Analysis',
        introDe: 'Eine Datenbank entsteht nicht durch drauflos programmieren. Der <strong>Datenbank-Lebenszyklus</strong> beschreibt sechs Phasen von der ersten Idee bis zum Betrieb. Am Anfang steht immer die <strong>Anforderungsanalyse</strong>: Welche Daten brauchen wir wirklich? Wer nutzt sie? Und was muss das System leisten? Diese Seite erklärt den Zyklus, die Miniwelt und den Anforderungskatalog — mit Praxisbeispiel.',
        introEn: 'A database doesn\'t come from just coding away. The <strong>database lifecycle</strong> describes six phases from first idea to operation. At the beginning there is always <strong>requirements analysis</strong>: What data do we really need? Who uses it? And what must the system deliver? This page explains the cycle, the miniworld, and the requirements catalog — with a practical example.'
    },

    quickLinks: [
        { icon: 'fa-rotate',          href: '#section1', switchToDoc: true, labelDe: 'Lebenszyklus',       labelEn: 'Lifecycle' },
        { icon: 'fa-magnifying-glass',href: '#section2', switchToDoc: true, labelDe: 'Anforderungsanalyse', labelEn: 'Requirements Analysis' },
        { icon: 'fa-globe',           href: '#section3', switchToDoc: true, labelDe: 'Miniwelt',           labelEn: 'Miniworld' },
        { icon: 'fa-list-check',      href: '#section4', switchToDoc: true, labelDe: 'Anforderungen',       labelEn: 'Requirements' },
        { icon: 'fa-sitemap',         href: '#section5', switchToDoc: true, labelDe: 'ER-Modell',          labelEn: 'ER Model' },
        { icon: 'fa-palette',         href: '#section-illustrations', switchToDoc: true, labelDe: 'Visualisierungen', labelEn: 'Visuals' }
    ],

    sections: [
        /* ============================================================
           SECTION 1 — LIFECYCLE
           ============================================================ */
        {
            id: 'section1',
            titleDe: 'Der Datenbank-Lebenszyklus',
            titleEn: 'The Database Lifecycle',
            introDe: 'Der Datenbank-Lebenszyklus beschreibt die Phasen von der ersten Idee bis zum laufenden Betrieb und zur Wartung. Jede Phase baut auf der vorherigen auf. Der Zyklus ist iterativ: neue Anforderungen im Betrieb können zu früheren Phasen zurückführen.',
            introEn: 'The database lifecycle describes the phases from first idea to live operation and maintenance. Each phase builds on the previous one. The cycle is iterative: new requirements during operation can lead back to earlier phases.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Die sechs Phasen im Überblick',
                    titleEn: 'The Six Phases at a Glance',
                    htmlDe: `
                    <p class="text-xs mb-2">Ohne dieses Vorgehen entstehen teure Fehler, vergessene Anforderungen und Systeme, die bei mehr Daten in die Knie gehen. Je später ein Fehler auffällt, desto teurer die Korrektur.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Phase</th><th>Inhalt</th></tr>
                    <tr><td>1</td><td><strong>Anforderungsanalyse</strong></td><td class="text-[var(--text-muted)]">Informationsbedarf ermitteln und dokumentieren.</td></tr>
                    <tr><td>2</td><td><strong>Konzeptioneller Entwurf</strong></td><td class="text-[var(--text-muted)]">ER-Modell mit Entitäten und Beziehungen.</td></tr>
                    <tr><td>3</td><td><strong>Logischer Entwurf</strong></td><td class="text-[var(--text-muted)]">ER-Modell → Tabellen, normalisiert.</td></tr>
                    <tr><td>4</td><td><strong>Physischer Entwurf</strong></td><td class="text-[var(--text-muted)]">Datentypen, Indizes, Speicherstrukturen fürs konkrete DBMS.</td></tr>
                    <tr><td>5</td><td><strong>Implementierung</strong></td><td class="text-[var(--text-muted)]">Datenbank anlegen per SQL (CREATE TABLE).</td></tr>
                    <tr><td>6</td><td><strong>Wartung & Betrieb</strong></td><td class="text-[var(--text-muted)]">Sicherung, Überwachung, Tuning, Weiterentwicklung.</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">Phasen 2 bis 4 sind SQL-frei. Erst ab Phase 5 kommt echtes SQL zum Einsatz.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Without this approach, you get expensive mistakes, forgotten requirements, and systems that buckle under more data. The later a mistake is discovered, the more expensive the fix.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Phase</th><th>Content</th></tr>
                    <tr><td>1</td><td><strong>Requirements analysis</strong></td><td class="text-[var(--text-muted)]">Determine and document information needs.</td></tr>
                    <tr><td>2</td><td><strong>Conceptual design</strong></td><td class="text-[var(--text-muted)]">ER model with entities and relationships.</td></tr>
                    <tr><td>3</td><td><strong>Logical design</strong></td><td class="text-[var(--text-muted)]">ER model → tables, normalized.</td></tr>
                    <tr><td>4</td><td><strong>Physical design</strong></td><td class="text-[var(--text-muted)]">Data types, indexes, storage structures for the specific DBMS.</td></tr>
                    <tr><td>5</td><td><strong>Implementation</strong></td><td class="text-[var(--text-muted)]">Create database via SQL (CREATE TABLE).</td></tr>
                    <tr><td>6</td><td><strong>Maintenance & operation</strong></td><td class="text-[var(--text-muted)]">Backup, monitoring, tuning, further development.</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">Phases 2 to 4 are SQL-free. Only from phase 5 does real SQL come into play.</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Der Zyklus ist iterativ',
                    titleEn: 'The Cycle Is Iterative',
                    htmlDe: `
                    <p class="text-xs mb-2">Der Lebenszyklus ist kein starres Einbahnstraßen-Modell. Neue Anforderungen im laufenden Betrieb (Phase 6) können dazu führen, dass frühere Phasen erneut durchlaufen werden.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Beispiel:</strong> Ein neues Berichtswesen wird gewünscht → Anforderungsanalyse (Phase 1) muss erweitert werden → ER-Modell (Phase 2) wird angepasst → Tabellen (Phase 3) ändern sich.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The lifecycle is not a rigid one-way model. New requirements during operation (phase 6) can cause earlier phases to be run through again.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Example:</strong> A new reporting system is requested → requirements analysis (phase 1) must be extended → ER model (phase 2) is adjusted → tables (phase 3) change.
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 2 — REQUIREMENTS ANALYSIS
           ============================================================ */
        {
            id: 'section2',
            titleDe: 'Phase 1: Die Anforderungsanalyse',
            titleEn: 'Phase 1: Requirements Analysis',
            introDe: 'Die Anforderungsanalyse ist die systematische Erhebung, Dokumentation und Abstimmung aller Anforderungen an ein Datenbanksystem — vor dem eigentlichen Entwurf. Das ER-Modell ist nur so gut wie diese Grundlage.',
            introEn: 'Requirements analysis is the systematic collection, documentation, and coordination of all requirements for a database system — before the actual design. The ER model is only as good as this foundation.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Zentrale Fragen',
                    titleEn: 'Central Questions',
                    htmlDe: `
                    <p class="text-xs mb-2">Zu klären ist:</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Welche Informationen werden gespeichert?</li>
                        <li>Wer nutzt das System?</li>
                        <li>Welche Auswertungen sind nötig?</li>
                        <li>Welche Rahmenbedingungen (Geschwindigkeit, Sicherheit, Nutzerzahl) gelten?</li>
                    </ul>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Merksatz:</strong> Wer ohne Anforderungen direkt Tabellen entwirft, entwirft am Bedarf vorbei.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">What needs to be clarified:</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Which information is stored?</li>
                        <li>Who uses the system?</li>
                        <li>Which evaluations are needed?</li>
                        <li>Which framework conditions (speed, security, user count) apply?</li>
                    </ul>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Key point:</strong> Anyone who designs tables directly without requirements is designing past the actual need.
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Methoden der Anforderungserhebung',
                    titleEn: 'Requirements Elicitation Methods',
                    htmlDe: `
                    <p class="text-xs mb-2">Anforderungen müssen aktiv erhoben werden. In der Praxis werden meist mehrere Methoden kombiniert:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Interviews</strong></td><td class="text-[var(--text-muted)]">Gespräche mit Fachabteilungen (z. B. Verkauf, Buchhaltung).</td></tr>
                    <tr><td><strong>Fragebögen</strong></td><td class="text-[var(--text-muted)]">Standardisierte Fragen an viele Beteiligte, schneller Überblick.</td></tr>
                    <tr><td><strong>Dokumentenanalyse</strong></td><td class="text-[var(--text-muted)]">Auswertung vorhandener Formulare, Listen, alter Systeme.</td></tr>
                    <tr><td><strong>Beobachtung</strong></td><td class="text-[var(--text-muted)]">Vor-Ort-Beobachtung, deckt Selbstverständliches auf, das in Interviews fehlt.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Requirements must be actively elicited. In practice, several methods are usually combined:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Method</th><th>Description</th></tr>
                    <tr><td><strong>Interviews</strong></td><td class="text-[var(--text-muted)]">Conversations with departments (e.g. sales, accounting).</td></tr>
                    <tr><td><strong>Questionnaires</strong></td><td class="text-[var(--text-muted)]">Standardized questions to many stakeholders, quick overview.</td></tr>
                    <tr><td><strong>Document analysis</strong></td><td class="text-[var(--text-muted)]">Evaluation of existing forms, lists, old systems.</td></tr>
                    <tr><td><strong>Observation</strong></td><td class="text-[var(--text-muted)]">On-site observation, reveals the obvious that interviews miss.</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 3 — MINIWELT
           ============================================================ */
        {
            id: 'section3',
            titleDe: 'Die Miniwelt (Diskursbereich)',
            titleEn: 'The Miniworld (Universe of Discourse)',
            introDe: 'Die Miniwelt ist der abgegrenzte Ausschnitt der realen Welt, der in der Datenbank abgebildet wird. Jede Datenbank bildet nur einen klar abgegrenzten Bereich ab, nie „die ganze Welt".',
            introEn: 'The miniworld is the delimited portion of the real world that is represented in the database. Every database represents only a clearly delimited area, never "the whole world".',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Abgrenzung als zentrale Aufgabe',
                    titleEn: 'Delimitation as a Central Task',
                    htmlDe: `
                    <p class="text-xs mb-2">Die Abgrenzung ist eine zentrale Aufgabe der Anforderungsanalyse. Zu weit gefasst: überladenes Modell. Zu eng gefasst: fehlende Informationen, ständige Nachbesserung.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Bürobedarf-Händler:</strong> Zur Miniwelt gehören Kunden, Rechnungen, Rechnungspositionen, Artikel. Nicht dazu gehören z. B. die Finanzbuchhaltung des Lieferanten oder die private Steuererklärung des Inhabers — das sind andere Miniwelten.
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Die richtige Abgrenzung ist Verhandlungssache zwischen Fachabteilung und Entwickler.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Delimitation is a central task of requirements analysis. Too broad: overloaded model. Too narrow: missing information, constant rework.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Office supplies retailer:</strong> The miniworld includes customers, invoices, invoice items, articles. It does not include, for example, the supplier's financial accounting or the owner's private tax return — those are different miniworlds.
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">The right delimitation is a matter of negotiation between the department and the developer.</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 4 — REQUIREMENTS
           ============================================================ */
        {
            id: 'section4',
            titleDe: 'Funktionale und nicht-funktionale Anforderungen',
            titleEn: 'Functional and Non-Functional Requirements',
            introDe: 'Zwei Grundtypen von Anforderungen: Funktionale Anforderungen beschreiben, WAS das System können muss. Nicht-funktionale Anforderungen beschreiben, WIE gut oder unter welchen Bedingungen.',
            introEn: 'Two basic types of requirements: Functional requirements describe WHAT the system must be able to do. Non-functional requirements describe HOW well or under what conditions.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Die Unterscheidung',
                    titleEn: 'The Distinction',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Typ</th><th>Beschreibung</th><th>Erkennungsmerkmal</th></tr>
                    <tr><td><strong>Funktional</strong></td><td class="text-[var(--text-muted)]">WAS das System können muss.</td><td class="text-[var(--text-muted)]">Verb für eine konkrete Handlung, z. B. „anlegen", „erstellen", „auswerten".</td></tr>
                    <tr><td><strong>Nicht-funktional</strong></td><td class="text-[var(--text-muted)]">WIE gut / unter welchen Bedingungen.</td><td class="text-[var(--text-muted)]">Keine Funktion selbst, sondern eine Qualität, Rahmenbedingung oder Kennzahl.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Type</th><th>Description</th><th>Identifying feature</th></tr>
                    <tr><td><strong>Functional</strong></td><td class="text-[var(--text-muted)]">WHAT the system must be able to do.</td><td class="text-[var(--text-muted)]">Verb for a concrete action, e.g. "create", "generate", "evaluate".</td></tr>
                    <tr><td><strong>Non-functional</strong></td><td class="text-[var(--text-muted)]">HOW well / under what conditions.</td><td class="text-[var(--text-muted)]">Not a function itself, but a quality, framework condition, or metric.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Beispiele für den Bürobedarf-Händler',
                    titleEn: 'Examples for the Office Supplies Retailer',
                    htmlDe: `
                    <h4 class="text-xs font-bold mt-3 mb-1">Funktionale Anforderungen</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Kundendaten (Name, Adresse) anlegen, ändern und löschen können</li>
                        <li>Rechnungen erstellen, die mehrere Artikelpositionen enthalten können</li>
                        <li>Artikelbestand und Artikelpreise pflegen können</li>
                        <li>Übersicht anzeigen, welcher Kunde welche Rechnungen erhalten hat</li>
                        <li>Monatliche Umsatzauswertung pro Kunde erzeugen können</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Nicht-funktionale Anforderungen</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Performance:</strong> Kundenabfrage unter 2 Sekunden</li>
                        <li><strong class="text-[var(--text-color)]">Sicherheit:</strong> Nur angemeldete Mitarbeiter, Passwörter verschlüsselt</li>
                        <li><strong class="text-[var(--text-color)]">Verfügbarkeit:</strong> Mo–Fr, 8–18 Uhr, 99 % erreichbar</li>
                        <li><strong class="text-[var(--text-color)]">Skalierbarkeit:</strong> Auch bei zehnfacher Kundenzahl performant</li>
                        <li><strong class="text-[var(--text-color)]">Benutzerfreundlichkeit:</strong> Rechnungen ohne Schulung erfassbar</li>
                    </ul>
                    <p class="text-xs text-[var(--text-muted)]">Nicht-funktionale Anforderungen wirken oft erst beim physischen Entwurf (Phase 4).</p>
                    `,
                    htmlEn: `
                    <h4 class="text-xs font-bold mt-3 mb-1">Functional requirements</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Create, modify, and delete customer data (name, address)</li>
                        <li>Create invoices that can contain multiple line items</li>
                        <li>Maintain article stock and article prices</li>
                        <li>Display an overview of which customer received which invoices</li>
                        <li>Generate monthly revenue evaluation per customer</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Non-functional requirements</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Performance:</strong> customer query under 2 seconds</li>
                        <li><strong class="text-[var(--text-color)]">Security:</strong> only logged-in employees, encrypted passwords</li>
                        <li><strong class="text-[var(--text-color)]">Availability:</strong> Mon–Fri, 8–18, 99% reachable</li>
                        <li><strong class="text-[var(--text-color)]">Scalability:</strong> performant even with ten times the customer count</li>
                        <li><strong class="text-[var(--text-color)]">Usability:</strong> invoices can be entered without training</li>
                    </ul>
                    <p class="text-xs text-[var(--text-muted)]">Non-functional requirements often only take effect during physical design (phase 4).</p>
                    `
                },
                {
                    id: 'subsection4_3',
                    titleDe: 'Lastenheft, Pflichtenheft und Anforderungskatalog',
                    titleEn: 'Requirements Spec, System Spec, and Requirements Catalog',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Dokument</th><th>Von</th><th>Inhalt</th></tr>
                    <tr><td><strong>Lastenheft</strong></td><td class="text-[var(--text-muted)]">Auftraggeber</td><td class="text-[var(--text-muted)]">WAS gebraucht wird und WOFÜR, fachlich, ohne technische Lösung.</td></tr>
                    <tr><td><strong>Pflichtenheft</strong></td><td class="text-[var(--text-muted)]">Auftragnehmer</td><td class="text-[var(--text-muted)]">WIE die Anforderungen technisch umgesetzt werden.</td></tr>
                    <tr><td><strong>Anforderungskatalog</strong></td><td class="text-[var(--text-muted)]">Beide</td><td class="text-[var(--text-muted)]">Strukturierte, tabellarische Liste mit Nummer, Beschreibung, Typ und Priorität.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">Priorisierung: <strong>Muss</strong> (zwingend), <strong>Soll</strong> (wichtig, verschiebbar), <strong>Kann</strong> (wünschenswert, verzichtbar).</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Document</th><th>By</th><th>Content</th></tr>
                    <tr><td><strong>Requirements spec (Lastenheft)</strong></td><td class="text-[var(--text-muted)]">Client</td><td class="text-[var(--text-muted)]">WHAT is needed and FOR WHAT, functional, without technical solution.</td></tr>
                    <tr><td><strong>System spec (Pflichtenheft)</strong></td><td class="text-[var(--text-muted)]">Contractor</td><td class="text-[var(--text-muted)]">HOW the requirements are implemented technically.</td></tr>
                    <tr><td><strong>Requirements catalog</strong></td><td class="text-[var(--text-muted)]">Both</td><td class="text-[var(--text-muted)]">Structured tabular list with number, description, type, and priority.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">Prioritization: <strong>Must</strong> (mandatory), <strong>Should</strong> (important, deferrable), <strong>Can</strong> (desirable, dispensable).</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 5 — ER MODEL
           ============================================================ */
        {
            id: 'section5',
            titleDe: 'Das Entity-Relationship-Modell',
            titleEn: 'The Entity-Relationship Model',
            introDe: 'Das ER-Modell wird benutzt, um Daten darzustellen, die bei der Datenanalyse erhoben wurden. Es dient der Verständigung zwischen Anwender und Entwickler und ist seit 1976 De-facto-Standard für die Datenmodellierung.',
            introEn: 'The ER model is used to represent data collected during data analysis. It serves communication between users and developers and has been the de-facto standard for data modeling since 1976.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Entität und Entitätstyp',
                    titleEn: 'Entity and Entity Type',
                    htmlDe: `
                    <p class="text-xs mb-2">Eine <strong>Entität</strong> (Entity) ist vergleichbar mit einem Objekt. Die konkreten Daten eines Kunden sind beispielsweise eine solche Entität. Der Datenbestand besteht aus vielen Entitäten, wobei die Entitäten gleichen Typs zu einem <strong>Entitätstyp</strong> zusammengefasst werden.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Symbol</th><th>Bedeutung</th><th>Beispiele</th></tr>
                    <tr><td>Rechteck</td><td class="text-[var(--text-muted)]">Entitätstyp</td><td class="text-[var(--text-muted)]">Person, Firma, Artikel</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">An <strong>entity</strong> is comparable to an object. The concrete data of a customer, for example, is such an entity. The data set consists of many entities, with entities of the same type grouped into an <strong>entity type</strong>.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Symbol</th><th>Meaning</th><th>Examples</th></tr>
                    <tr><td>Rectangle</td><td class="text-[var(--text-muted)]">Entity type</td><td class="text-[var(--text-muted)]">Person, Company, Article</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Attribute',
                    titleEn: 'Attributes',
                    htmlDe: `
                    <p class="text-xs mb-2">Attribute werden als „Daten" der Entität bezeichnet. Wenn die Entität ein eindeutifizierbares Attribut besitzt (z. B. Kundenummer), dann wird dieses Attribut unterstrichen. Die Attribute werden entweder den entsprechenden Entitätstypen oder auch den Beziehungen direkt zugeordnet.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Symbol</th><th>Bedeutung</th><th>Beispiele</th></tr>
                    <tr><td>Ellipse</td><td class="text-[var(--text-muted)]">Attribut</td><td class="text-[var(--text-muted)]">Name, Größe, Preis</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Attributes are referred to as the "data" of the entity. If the entity has a uniquely identifiable attribute (e.g. customer number), this attribute is underlined. Attributes are assigned either to the corresponding entity types or directly to the relationships.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Symbol</th><th>Meaning</th><th>Examples</th></tr>
                    <tr><td>Ellipse</td><td class="text-[var(--text-muted)]">Attribute</td><td class="text-[var(--text-muted)]">Name, Size, Price</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_3',
                    titleDe: 'Beziehungstyp und Kardinalitäten',
                    titleEn: 'Relationship Type and Cardinalities',
                    htmlDe: `
                    <p class="text-xs mb-2">Durch eine Beziehung, auch Relation genannt, wird eine semantische Verbindung zwischen zwei Entitätstypen dargestellt. Das ER-Modell kennzeichnet die Beziehungen der Entitätstypen mithilfe einer Raute. Im Falle einer m:n-Beziehung können der Beziehung auch Attribute direkt zugeordnet werden.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Kardinalität</th><th>Beschreibung</th><th>Beispiel</th></tr>
                    <tr><td><strong>1:1</strong></td><td class="text-[var(--text-muted)]">Ein Mitarbeiter hat genau eine Personalakte und jede Personalakte ist genau einem Mitarbeiter zugeordnet.</td><td class="text-[var(--text-muted)]">Mitarbeiter — Personalakte</td></tr>
                    <tr><td><strong>1:n</strong></td><td class="text-[var(--text-muted)]">Ein Gebäude hat einen oder mehrere Räume. Aber ein Raum kann nur in einem Gebäude sein.</td><td class="text-[var(--text-muted)]">Gebäude — Raum</td></tr>
                    <tr><td><strong>m:n</strong></td><td class="text-[var(--text-muted)]">Ein Kunde kauft mehrere Artikel. Aber ein Artikel kann auch von mehreren Kunden gekauft werden.</td><td class="text-[var(--text-muted)]">Kunde — Artikel</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">A relationship, also called a relation, represents a semantic connection between two entity types. The ER model marks the relationships of entity types using a diamond. In the case of an m:n relationship, attributes can also be assigned directly to the relationship.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Cardinality</th><th>Description</th><th>Example</th></tr>
                    <tr><td><strong>1:1</strong></td><td class="text-[var(--text-muted)]">An employee has exactly one personnel file and each personnel file is assigned to exactly one employee.</td><td class="text-[var(--text-muted)]">Employee — Personnel file</td></tr>
                    <tr><td><strong>1:n</strong></td><td class="text-[var(--text-muted)]">A building has one or more rooms. But a room can only be in one building.</td><td class="text-[var(--text-muted)]">Building — Room</td></tr>
                    <tr><td><strong>m:n</strong></td><td class="text-[var(--text-muted)]">A customer buys multiple articles. But an article can also be bought by multiple customers.</td><td class="text-[var(--text-muted)]">Customer — Article</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_4',
                    titleDe: 'Praxisbeispiel: Bürobedarf-Händler',
                    titleEn: 'Practical Example: Office Supplies Retailer',
                    htmlDe: `
                    <p class="text-xs mb-2">Ein ER-Modell für den Bürobedarf-Händler könnte wie folgt aussehen:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Entitätstyp</th><th>Attribute</th></tr>
                    <tr><td><strong>Kunde</strong></td><td class="text-[var(--text-muted)]">Kundennr, Name, Vorname, Ort, Straße, PLZ</td></tr>
                    <tr><td><strong>Rechnung</strong></td><td class="text-[var(--text-muted)]">Rechnungsnr, Datum, Betrag</td></tr>
                    <tr><td><strong>Artikel</strong></td><td class="text-[var(--text-muted)]">Artikelnummer, Bezeichnung, Preis, Bestand</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Beziehungen: Kunde <strong>erhält</strong> Rechnung (1:n), Rechnung <strong>enthält</strong> Artikel (m:n).</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">An ER model for the office supplies retailer could look like this:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Entity type</th><th>Attributes</th></tr>
                    <tr><td><strong>Customer</strong></td><td class="text-[var(--text-muted)]">Customer no., last name, first name, city, street, ZIP</td></tr>
                    <tr><td><strong>Invoice</strong></td><td class="text-[var(--text-muted)]">Invoice no., date, amount</td></tr>
                    <tr><td><strong>Article</strong></td><td class="text-[var(--text-muted)]">Article number, description, price, stock</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Relationships: Customer <strong>receives</strong> invoice (1:n), invoice <strong>contains</strong> article (m:n).</p>
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
            introDe: 'Das Wichtigste an einem Ort.',
            introEn: 'The most important points in one place.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-rotate text-lg opacity-90"></i>
                                <span>1. Lebenszyklus</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Sechs Phasen:</strong> Anforderungsanalyse → Konzeption → Logik → Physisch → Implementierung → Wartung. Iterativ, nicht linear.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-magnifying-glass text-lg opacity-90"></i>
                                <span>2. Anforderungsanalyse</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Systematische Erhebung per <strong>Interviews, Fragebögen, Dokumentenanalyse, Beobachtung</strong>. Ergebnis: Lastenheft, Pflichtenheft, Anforderungskatalog.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-globe text-lg opacity-90"></i>
                                <span>3. Miniwelt</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Der <strong>abgegrenzte Ausschnitt</strong> der realen Welt, der in der Datenbank abgebildet wird. Zu weit = überladen, zu eng = Nachbesserung.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-sitemap text-lg opacity-90"></i>
                                <span>4. ER-Modell</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Entitäten</strong> (Rechteck), <strong>Attribute</strong> (Ellipse), <strong>Beziehungen</strong> (Raute). Kardinalitäten: 1:1, 1:n, m:n.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-rotate text-lg opacity-90"></i>
                                <span>1. Lifecycle</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Six phases:</strong> requirements → conceptual → logical → physical → implementation → maintenance. Iterative, not linear.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-magnifying-glass text-lg opacity-90"></i>
                                <span>2. Requirements Analysis</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Systematic elicitation via <strong>interviews, questionnaires, document analysis, observation</strong>. Result: requirements spec, system spec, requirements catalog.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-globe text-lg opacity-90"></i>
                                <span>3. Miniworld</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                The <strong>delimited portion</strong> of the real world represented in the database. Too broad = overloaded, too narrow = rework.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-sitemap text-lg opacity-90"></i>
                                <span>4. ER Model</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>Entities</strong> (rectangle), <strong>attributes</strong> (ellipse), <strong>relationships</strong> (diamond). Cardinalities: 1:1, 1:n, m:n.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    /* ============================================================
       ILLUSTRATIONS — 4 pure-CSS animations
       ============================================================ */
    illustrations: {
        titleDe: 'Visualisierungen & Grafiken',
        titleEn: 'Visualizations & Graphics',
        introDe: 'Vier kurze Animationen zum Datenbank-Lebenszyklus, zur Anforderungsanalyse und zum ER-Modell.',
        introEn: 'Four short animations on the database lifecycle, requirements analysis, and the ER model.',
        animations: [
            /* 1 — LIFECYCLE PHASES */
            {
                id: 'vis-lifecycle-phases',
                titleDe: 'Die sechs Phasen des Lebenszyklus',
                titleEn: 'The Six Phases of the Lifecycle',
                descDe: 'Von der Anforderungsanalyse bis zur Wartung — jede Phase baut auf der vorherigen auf.',
                descEn: 'From requirements analysis to maintenance — each phase builds on the previous one.',
                html: `
                <style>
                    .pm-db-life-stage { max-width: 560px; margin: 0 auto; padding: 1rem 0.5rem; font-family: 'Inter', sans-serif; }
                    .pm-db-life-list { display: flex; flex-direction: column; gap: 5px; position: relative; padding-left: 1.8rem; }
                    .pm-db-life-list::before {
                        content: ''; position: absolute; left: 0.6rem; top: 0.5rem; bottom: 0.5rem;
                        width: 2px; background: var(--border-color); border-radius: 2px;
                    }
                    .pm-db-life-item {
                        position: relative; display: flex; align-items: center; gap: 0.6rem;
                        padding: 0.6rem 0.75rem; border-radius: 0.45rem;
                        background: var(--bg-color); border: 1px solid var(--border-color);
                        font-size: 0.7rem; color: var(--text-color);
                        will-change: transform, border-color, box-shadow;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-db-life-item::before {
                        content: ''; position: absolute; left: -1.35rem; top: 50%;
                        width: 0.55rem; height: 0.55rem; border-radius: 50%;
                        background: var(--border-color); border: 2px solid var(--bg-color);
                        box-shadow: 0 0 0 2px var(--border-color);
                        transform: translateY(-50%);
                    }
                    .pm-db-life-num {
                        flex-shrink: 0; width: 1.3rem; height: 1.3rem;
                        display: inline-flex; align-items: center; justify-content: center;
                        border-radius: 0.3rem; font-family: 'Fira Code', monospace;
                        font-size: 0.6rem; font-weight: 800; color: #fff;
                        background: #3b82f6;
                    }
                    .pm-db-life-item strong { font-weight: 700; color: var(--heading-color); font-family: 'Inter', sans-serif; }
                    .pm-db-life-item span { color: var(--text-muted); font-size: 0.62rem; margin-left: auto; font-family: 'Inter', sans-serif; }
                    .pm-db-life-item:nth-child(1) .pm-db-life-num { background: #3b82f6; }
                    .pm-db-life-item:nth-child(2) .pm-db-life-num { background: #8b5cf6; }
                    .pm-db-life-item:nth-child(3) .pm-db-life-num { background: #06b6d4; }
                    .pm-db-life-item:nth-child(4) .pm-db-life-num { background: #10b981; }
                    .pm-db-life-item:nth-child(5) .pm-db-life-num { background: #f59e0b; }
                    .pm-db-life-item:nth-child(6) .pm-db-life-num { background: #ef4444; }
                    .pm-db-life-item:nth-child(1) { animation: pm-db-life-pulse 6s ease-in-out infinite; animation-delay: 0s; }
                    .pm-db-life-item:nth-child(2) { animation: pm-db-life-pulse 6s ease-in-out infinite; animation-delay: 0.8s; }
                    .pm-db-life-item:nth-child(3) { animation: pm-db-life-pulse 6s ease-in-out infinite; animation-delay: 1.6s; }
                    .pm-db-life-item:nth-child(4) { animation: pm-db-life-pulse 6s ease-in-out infinite; animation-delay: 2.4s; }
                    .pm-db-life-item:nth-child(5) { animation: pm-db-life-pulse 6s ease-in-out infinite; animation-delay: 3.2s; }
                    .pm-db-life-item:nth-child(6) { animation: pm-db-life-pulse 6s ease-in-out infinite; animation-delay: 4.0s; }
                    @keyframes pm-db-life-pulse {
                        0%, 100% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                        6%, 18% { transform: translateX(6px); border-color: #3b82f6; box-shadow: 0 0 16px -6px #3b82f6; }
                        30% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                    }
                    @media (prefers-reduced-motion: reduce) { .pm-db-life-item { animation: none !important; } }
                </style>
                <div class="pm-db-life-stage">
                    <div class="pm-db-life-list">
                        <div class="pm-db-life-item">
                            <span class="pm-db-life-num">1</span>
                            <strong data-lang-de>Anforderungsanalyse</strong><strong data-lang-en style="display:none;">Requirements Analysis</strong>
                            <span data-lang-de>Informationsbedarf</span><span data-lang-en style="display:none;">Information needs</span>
                        </div>
                        <div class="pm-db-life-item">
                            <span class="pm-db-life-num">2</span>
                            <strong data-lang-de>Konzeptioneller Entwurf</strong><strong data-lang-en style="display:none;">Conceptual Design</strong>
                            <span data-lang-de>ER-Modell</span><span data-lang-en style="display:none;">ER model</span>
                        </div>
                        <div class="pm-db-life-item">
                            <span class="pm-db-life-num">3</span>
                            <strong data-lang-de>Logischer Entwurf</strong><strong data-lang-en style="display:none;">Logical Design</strong>
                            <span data-lang-de>Tabellen</span><span data-lang-en style="display:none;">Tables</span>
                        </div>
                        <div class="pm-db-life-item">
                            <span class="pm-db-life-num">4</span>
                            <strong data-lang-de>Physischer Entwurf</strong><strong data-lang-en style="display:none;">Physical Design</strong>
                            <span data-lang-de>Datentypen</span><span data-lang-en style="display:none;">Data types</span>
                        </div>
                        <div class="pm-db-life-item">
                            <span class="pm-db-life-num">5</span>
                            <strong data-lang-de>Implementierung</strong><strong data-lang-en style="display:none;">Implementation</strong>
                            <span>SQL</span>
                        </div>
                        <div class="pm-db-life-item">
                            <span class="pm-db-life-num">6</span>
                            <strong data-lang-de>Wartung & Betrieb</strong><strong data-lang-en style="display:none;">Maintenance & Operation</strong>
                            <span data-lang-de>Iterativ</span><span data-lang-en style="display:none;">Iterative</span>
                        </div>
                    </div>
                </div>
                `
            },

            /* 2 — REQUIREMENTS: FUNCTIONAL VS NON-FUNCTIONAL */
            {
                id: 'vis-req-types',
                titleDe: 'Funktionale vs. nicht-funktionale Anforderungen',
                titleEn: 'Functional vs. Non-Functional Requirements',
                descDe: 'WAS das System können muss gegen WIE gut es das können muss.',
                descEn: 'WHAT the system must do versus HOW well it must do it.',
                html: `
                <style>
                    .pm-req-stage { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; padding: 0.5rem 0; max-width: 560px; margin: 0 auto; font-family: 'Inter', sans-serif; }
                    @media (max-width: 560px) { .pm-req-stage { grid-template-columns: 1fr; } }
                    .pm-req-col {
                        padding: 0.85rem; border-radius: 0.55rem;
                        background: var(--panel-color); border: 1px solid var(--panel-border);
                        box-shadow: var(--control-shadow); overflow: hidden;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-req-col.func { border-top: 4px solid #3b82f6; }
                    .pm-req-col.nonfunc { border-top: 4px solid #f59e0b; }
                    .pm-req-title {
                        display: inline-flex; align-items: center; gap: 0.4rem;
                        font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em;
                        text-transform: uppercase; margin-bottom: 0.5rem;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-req-col.func .pm-req-title i { color: #3b82f6; }
                    .pm-req-col.nonfunc .pm-req-title i { color: #f59e0b; }
                    .pm-req-list { list-style: none; padding: 0; margin: 0; }
                    .pm-req-list li {
                        display: flex; align-items: flex-start; gap: 0.4rem;
                        padding: 0.35rem 0; font-size: 0.65rem;
                        color: var(--text-muted); font-family: 'Inter', sans-serif;
                        border-bottom: 1px solid var(--border-color);
                    }
                    .pm-req-list li:last-child { border-bottom: none; }
                    .pm-req-list li i { width: 0.9rem; text-align: center; opacity: 0.7; font-size: 0.55rem; margin-top: 0.15rem; }
                    .pm-req-col.func .pm-req-list li i { color: #3b82f6; }
                    .pm-req-col.nonfunc .pm-req-list li i { color: #f59e0b; }
                    .pm-req-col { animation: pm-req-fade 5s ease-in-out infinite; }
                    .pm-req-col.func { animation-delay: 0s; }
                    .pm-req-col.nonfunc { animation-delay: 1.5s; }
                    @keyframes pm-req-fade {
                        0%, 100% { opacity: 0.85; }
                        50% { opacity: 1; }
                    }
                    @media (prefers-reduced-motion: reduce) { .pm-req-col { animation: none !important; } }
                </style>
                <div class="pm-req-stage">
                    <div class="pm-req-col func">
                        <div class="pm-req-title">
                            <i class="fa-solid fa-gears"></i>
                            <span data-lang-de>Funktional</span><span data-lang-en style="display:none;">Functional</span>
                        </div>
                        <ul class="pm-req-list">
                            <li><i class="fa-solid fa-check"></i> <span data-lang-de>Kundendaten anlegen, ändern, löschen</span><span data-lang-en style="display:none;">Create, modify, delete customer data</span></li>
                            <li><i class="fa-solid fa-check"></i> <span data-lang-de>Rechnungen mit Positionen erstellen</span><span data-lang-en style="display:none;">Create invoices with line items</span></li>
                            <li><i class="fa-solid fa-check"></i> <span data-lang-de>Artikelbestand pflegen</span><span data-lang-en style="display:none;">Maintain article stock</span></li>
                            <li><i class="fa-solid fa-check"></i> <span data-lang-de>Umsatzauswertung erzeugen</span><span data-lang-en style="display:none;">Generate revenue evaluation</span></li>
                        </ul>
                    </div>
                    <div class="pm-req-col nonfunc">
                        <div class="pm-req-title">
                            <i class="fa-solid fa-gauge-high"></i>
                            <span data-lang-de>Nicht-funktional</span><span data-lang-en style="display:none;">Non-Functional</span>
                        </div>
                        <ul class="pm-req-list">
                            <li><i class="fa-solid fa-clock"></i> <span data-lang-de>Antwortzeit unter 2 Sekunden</span><span data-lang-en style="display:none;">Response time under 2 seconds</span></li>
                            <li><i class="fa-solid fa-lock"></i> <span data-lang-de>Zugriff nur für angemeldete Mitarbeiter</span><span data-lang-en style="display:none;">Access only for logged-in employees</span></li>
                            <li><i class="fa-solid fa-server"></i> <span data-lang-de>99 % Verfügbarkeit zu Geschäftszeiten</span><span data-lang-en style="display:none;">99% availability during business hours</span></li>
                            <li><i class="fa-solid fa-arrows-up-down"></i> <span data-lang-de>Skalierbar bei zehnfacher Kundenzahl</span><span data-lang-en style="display:none;">Scalable with ten times the customer count</span></li>
                        </ul>
                    </div>
                </div>
                `
            },

            /* 3 — ER MODEL SYMBOLS */
            {
                id: 'vis-er-symbols',
                titleDe: 'ER-Modell: Symbole und Kardinalitäten',
                titleEn: 'ER Model: Symbols and Cardinalities',
                descDe: 'Entitätstyp (Rechteck), Attribut (Ellipse), Beziehung (Raute) und die Kardinalitäten 1:1, 1:n, m:n.',
                descEn: 'Entity type (rectangle), attribute (ellipse), relationship (diamond), and the cardinalities 1:1, 1:n, m:n.',
                html: `
                <style>
                    .pm-er-stage { max-width: 560px; margin: 0 auto; padding: 1rem 0.5rem; font-family: 'Inter', sans-serif; }
                    .pm-er-legend { display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; font-family: 'Inter', sans-serif; }
                    .pm-er-legend-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.65rem; font-weight: 600; color: var(--text-muted); font-family: 'Inter', sans-serif; }
                    .pm-er-shape { width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.6rem; }
                    .pm-er-shape.entity { background: #3b82f6; border-radius: 2px; }
                    .pm-er-shape.attr { background: #10b981; border-radius: 50%; }
                    .pm-er-shape.rel { background: #f59e0b; transform: rotate(45deg); width: 14px; height: 14px; }
                    .pm-er-card { display: flex; flex-direction: column; gap: 0.5rem; }
                    .pm-er-row {
                        display: flex; align-items: center; gap: 0.6rem;
                        padding: 0.6rem 0.75rem; border-radius: 0.45rem;
                        background: var(--bg-color); border: 1px solid var(--border-color);
                        font-size: 0.68rem; color: var(--text-color);
                        will-change: transform, border-color, box-shadow;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-er-row i { width: 1rem; text-align: center; opacity: 0.8; color: var(--link-color); }
                    .pm-er-row strong { font-weight: 700; color: var(--heading-color); font-family: 'Inter', sans-serif; }
                    .pm-er-row .pm-er-card-badge {
                        margin-left: auto; font-family: 'Fira Code', monospace;
                        font-size: 0.6rem; font-weight: 800;
                        padding: 0.1rem 0.4rem; border-radius: 0.25rem;
                        background: var(--code-bg); color: var(--link-color);
                    }
                    .pm-er-row:nth-child(1) { animation: pm-er-pulse 6s ease-in-out infinite; animation-delay: 0s; }
                    .pm-er-row:nth-child(2) { animation: pm-er-pulse 6s ease-in-out infinite; animation-delay: 1.0s; }
                    .pm-er-row:nth-child(3) { animation: pm-er-pulse 6s ease-in-out infinite; animation-delay: 2.0s; }
                    .pm-er-row:nth-child(4) { animation: pm-er-pulse 6s ease-in-out infinite; animation-delay: 3.0s; }
                    .pm-er-row:nth-child(5) { animation: pm-er-pulse 6s ease-in-out infinite; animation-delay: 4.0s; }
                    @keyframes pm-er-pulse {
                        0%, 100% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                        6%, 18% { transform: translateX(6px); border-color: #3b82f6; box-shadow: 0 0 16px -6px #3b82f6; }
                        30% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                    }
                    @media (prefers-reduced-motion: reduce) { .pm-er-row { animation: none !important; } }
                </style>
                <div class="pm-er-stage">
                    <div class="pm-er-legend">
                        <div class="pm-er-legend-item">
                            <span class="pm-er-shape entity"></span>
                            <span data-lang-de>Entitätstyp</span><span data-lang-en style="display:none;">Entity type</span>
                        </div>
                        <div class="pm-er-legend-item">
                            <span class="pm-er-shape attr"></span>
                            <span data-lang-de>Attribut</span><span data-lang-en style="display:none;">Attribute</span>
                        </div>
                        <div class="pm-er-legend-item">
                            <span class="pm-er-shape rel"></span>
                            <span data-lang-de>Beziehung</span><span data-lang-en style="display:none;">Relationship</span>
                        </div>
                    </div>
                    <div class="pm-er-card">
                        <div class="pm-er-row">
                            <i class="fa-solid fa-user"></i>
                            <span data-lang-de><strong>Mitarbeiter</strong> — <strong>Personalakte</strong></span>
                            <span data-lang-en style="display:none;"><strong>Employee</strong> — <strong>Personnel file</strong></span>
                            <span class="pm-er-card-badge">1:1</span>
                        </div>
                        <div class="pm-er-row">
                            <i class="fa-solid fa-building"></i>
                            <span data-lang-de><strong>Gebäude</strong> — <strong>Raum</strong></span>
                            <span data-lang-en style="display:none;"><strong>Building</strong> — <strong>Room</strong></span>
                            <span class="pm-er-card-badge">1:n</span>
                        </div>
                        <div class="pm-er-row">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span data-lang-de><strong>Kunde</strong> — <strong>Artikel</strong></span>
                            <span data-lang-en style="display:none;"><strong>Customer</strong> — <strong>Article</strong></span>
                            <span class="pm-er-card-badge">m:n</span>
                        </div>
                        <div class="pm-er-row">
                            <i class="fa-solid fa-file-invoice"></i>
                            <span data-lang-de><strong>Kunde</strong> — <strong>Rechnung</strong></span>
                            <span data-lang-en style="display:none;"><strong>Customer</strong> — <strong>Invoice</strong></span>
                            <span class="pm-er-card-badge">1:n</span>
                        </div>
                        <div class="pm-er-row">
                            <i class="fa-solid fa-boxes-stacked"></i>
                            <span data-lang-de><strong>Rechnung</strong> — <strong>Artikel</strong></span>
                            <span data-lang-en style="display:none;"><strong>Invoice</strong> — <strong>Article</strong></span>
                            <span class="pm-er-card-badge">m:n</span>
                        </div>
                    </div>
                </div>
                `
            },

            /* 4 — DORA STYLE REQUIREMENTS CATALOG */
            {
                id: 'vis-req-catalog',
                titleDe: 'Anforderungskatalog',
                titleEn: 'Requirements Catalog',
                descDe: 'Strukturierte Liste mit Nummer, Beschreibung, Typ und Priorität (Muss/Soll/Kann).',
                descEn: 'Structured list with number, description, type, and priority (Must/Should/Can).',
                html: `
                <style>
                    .pm-cat-stage { max-width: 560px; margin: 0 auto; padding: 1rem 0.5rem; font-family: 'Inter', sans-serif; }
                    .pm-cat-table { width: 100%; border-collapse: collapse; font-size: 0.68rem; font-family: 'Inter', sans-serif; }
                    .pm-cat-table th {
                        background: var(--navy); color: #fff; text-align: left;
                        padding: 0.5rem 0.6rem; font-size: 0.62rem;
                        font-weight: 700; letter-spacing: 0.03em;
                        text-transform: uppercase;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-cat-table td {
                        padding: 0.5rem 0.6rem; border-bottom: 1px solid var(--border-color);
                        vertical-align: top; font-family: 'Inter', sans-serif;
                    }
                    .pm-cat-table tr:nth-child(even) td { background: var(--code-bg); }
                    .pm-cat-table td.nr { font-family: 'Fira Code', monospace; font-weight: 700; color: var(--link-color); }
                    .pm-cat-table td.type { font-weight: 700; }
                    .pm-cat-table td.type.func { color: #3b82f6; }
                    .pm-cat-table td.type.nonfunc { color: #f59e0b; }
                    .pm-cat-table td.prio { font-weight: 700; text-align: center; }
                    .pm-cat-table td.prio.muss { color: #ef4444; }
                    .pm-cat-table td.prio.soll { color: #f59e0b; }
                    .pm-cat-table td.prio.kann { color: #10b981; }
                    .pm-cat-table tr { animation: pm-cat-fade 6s ease-in-out infinite; }
                    .pm-cat-table tr:nth-child(1) { animation-delay: 0s; }
                    .pm-cat-table tr:nth-child(2) { animation-delay: 0.3s; }
                    .pm-cat-table tr:nth-child(3) { animation-delay: 0.6s; }
                    .pm-cat-table tr:nth-child(4) { animation-delay: 0.9s; }
                    .pm-cat-table tr:nth-child(5) { animation-delay: 1.2s; }
                    .pm-cat-table tr:nth-child(6) { animation-delay: 1.5s; }
                    .pm-cat-table tr:nth-child(7) { animation-delay: 1.8s; }
                    .pm-cat-table tr:nth-child(8) { animation-delay: 2.1s; }
                    @keyframes pm-cat-fade {
                        0%, 100% { opacity: 0.9; }
                        50% { opacity: 1; }
                    }
                    @media (prefers-reduced-motion: reduce) { .pm-cat-table tr { animation: none !important; } }
                </style>
                <div class="pm-cat-stage">
                    <table class="pm-cat-table">
                        <tr>
                            <th>Nr.</th>
                            <th data-lang-de>Anforderung</th><th data-lang-en style="display:none;">Requirement</th>
                            <th data-lang-de>Typ</th><th data-lang-en style="display:none;">Type</th>
                            <th data-lang-de>Prio</th><th data-lang-en style="display:none;">Prio</th>
                        </tr>
                        <tr>
                            <td class="nr">A1</td>
                            <td data-lang-de>Kundendaten erfassen, ändern, löschen</td>
                            <td data-lang-en style="display:none;">Create, modify, delete customer data</td>
                            <td class="type func" data-lang-de>funktional</td>
                            <td class="type func" data-lang-en style="display:none;">functional</td>
                            <td class="prio muss">Muss</td>
                        </tr>
                        <tr>
                            <td class="nr">A2</td>
                            <td data-lang-de>Rechnungen mit mehreren Positionen erstellen</td>
                            <td data-lang-en style="display:none;">Create invoices with multiple line items</td>
                            <td class="type func" data-lang-de>funktional</td>
                            <td class="type func" data-lang-en style="display:none;">functional</td>
                            <td class="prio muss">Muss</td>
                        </tr>
                        <tr>
                            <td class="nr">A3</td>
                            <td data-lang-de>Artikelbestand und Preise pflegen</td>
                            <td data-lang-en style="display:none;">Maintain article stock and prices</td>
                            <td class="type func" data-lang-de>funktional</td>
                            <td class="type func" data-lang-en style="display:none;">functional</td>
                            <td class="prio muss">Muss</td>
                        </tr>
                        <tr>
                            <td class="nr">A4</td>
                            <td data-lang-de>Monatliche Umsatzauswertung pro Kunde</td>
                            <td data-lang-en style="display:none;">Monthly revenue evaluation per customer</td>
                            <td class="type func" data-lang-de>funktional</td>
                            <td class="type func" data-lang-en style="display:none;">functional</td>
                            <td class="prio soll">Soll</td>
                        </tr>
                        <tr>
                            <td class="nr">A5</td>
                            <td data-lang-de>Suche nach Rechnungen über Zeitraum</td>
                            <td data-lang-en style="display:none;">Search invoices by time period</td>
                            <td class="type func" data-lang-de>funktional</td>
                            <td class="type func" data-lang-en style="display:none;">functional</td>
                            <td class="prio kann">Kann</td>
                        </tr>
                        <tr>
                            <td class="nr">A6</td>
                            <td data-lang-de>Abfragen unter 2 Sekunden</td>
                            <td data-lang-en style="display:none;">Queries under 2 seconds</td>
                            <td class="type nonfunc" data-lang-de>nicht-funktional</td>
                            <td class="type nonfunc" data-lang-en style="display:none;">non-functional</td>
                            <td class="prio muss">Muss</td>
                        </tr>
                        <tr>
                            <td class="nr">A7</td>
                            <td data-lang-de>Nur angemeldete Mitarbeiter</td>
                            <td data-lang-en style="display:none;">Only logged-in employees</td>
                            <td class="type nonfunc" data-lang-de>nicht-funktional</td>
                            <td class="type nonfunc" data-lang-en style="display:none;">non-functional</td>
                            <td class="prio muss">Muss</td>
                        </tr>
                        <tr>
                            <td class="nr">A8</td>
                            <td data-lang-de>Skalierbar bei zehnfacher Kundenzahl</td>
                            <td data-lang-en style="display:none;">Scalable with ten times the customer count</td>
                            <td class="type nonfunc" data-lang-de>nicht-funktional</td>
                            <td class="type nonfunc" data-lang-en style="display:none;">non-functional</td>
                            <td class="prio kann">Kann</td>
                        </tr>
                    </table>
                </div>
                `
            }
        ]
    },

    links: {
        titleDe: 'Weiterführende Ressourcen',
        titleEn: 'Further Resources',
        items: [
            { icon: 'fa-book',          href: 'https://de.wikipedia.org/wiki/Datenbankentwurf', target: '_blank', labelDe: 'Wikipedia: Datenbankentwurf', labelEn: 'Wikipedia: Database design' },
            { icon: 'fa-sitemap',       href: 'https://de.wikipedia.org/wiki/Entity-Relationship-Modell', target: '_blank', labelDe: 'Wikipedia: ER-Modell', labelEn: 'Wikipedia: ER model' },
            { icon: 'fa-list-check',    href: 'https://de.wikipedia.org/wiki/Anforderungsanalyse_(Informatik)', target: '_blank', labelDe: 'Wikipedia: Anforderungsanalyse', labelEn: 'Wikipedia: Requirements analysis' },
            { icon: 'fa-database',      href: 'https://www.postgresql.org/docs/current/tutorial.html', target: '_blank', labelDe: 'PostgreSQL Tutorial', labelEn: 'PostgreSQL Tutorial' },
            { icon: 'fa-graduation-cap',href: 'https://www.oracle.com/database/what-is-database/', target: '_blank', labelDe: 'Oracle: What is a Database?', labelEn: 'Oracle: What is a Database?' }
        ]
    },

    footer: {
        textDe: 'Datenbanken · Lebenszyklus & Anforderungsanalyse · 2026',
        textEn: 'Databases · Lifecycle & Requirements Analysis · 2026'
    }
});