// resources/topics/topic_sql.js
// SQL & databases. Bilingual (DE/EN) — honours the global data-active-lang toggle.
// Includes normal forms, anomalies, full SQL command reference, and visualizations.

registerTopic({
    id: 'SQL',

    // ── SUB-CATEGORY ────────────────────────────────────────────
    parentId: 'Computer',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-database',
    titleDe: 'SQL',
    titleEn: 'SQL',
    descDe: 'Relationale Datenbanken, SQL-Syntax, Joins, Aggregation, Normalisierung und Transaktionen.',
    descEn: 'Relational databases, SQL syntax, joins, aggregation, normalization, and transactions.',

    sidebarTitleDe: 'SQL & Datenbanken',
    sidebarTitleEn: 'SQL & Databases',
    sidebarSubtitleDe: 'Theorie & Praxis',
    sidebarSubtitleEn: 'Theory & Practice',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'SQL & Datenbanken',
        titleEn: 'SQL & Databases',
        introDe: 'SQL ist die Lingua franca relationaler Datenbanken. Diese Referenz führt von den Grundlagen (Tabellen, Schlüssel, Datentypen) über die tägliche Arbeit mit SELECT, JOIN, GROUP BY und Unterabfragen bis hin zu DDL, Indexen, Transaktionen, Normalisierung und einer vollständigen Befehlsreferenz.',
        introEn: 'SQL is the lingua franca of relational databases. This reference walks from the basics (tables, keys, data types) through day-to-day work with SELECT, JOIN, GROUP BY, and subqueries, up to DDL, indexes, transactions, normalization, and a complete command reference.'
    },

    quickLinks: [
        { icon: 'fa-cubes',            href: '#section1', switchToDoc: true, labelDe: 'Grundlagen',           labelEn: 'Foundations' },
        { icon: 'fa-magnifying-glass', href: '#section2', switchToDoc: true, labelDe: 'SELECT & Filter',      labelEn: 'SELECT & Filter' },
        { icon: 'fa-diagram-project',  href: '#section3', switchToDoc: true, labelDe: 'Joins',                labelEn: 'Joins' },
        { icon: 'fa-chart-simple',     href: '#section4', switchToDoc: true, labelDe: 'Aggregation',          labelEn: 'Aggregation' },
        { icon: 'fa-table',            href: '#section5', switchToDoc: true, labelDe: 'DDL & DML',            labelEn: 'DDL & DML' },
        { icon: 'fa-shield-halved',    href: '#section6', switchToDoc: true, labelDe: 'Transaktionen',        labelEn: 'Transactions' },
        { icon: 'fa-triangle-exclamation', href: '#section7', switchToDoc: true, labelDe: 'Anomalien',        labelEn: 'Anomalies' },
        { icon: 'fa-layer-group',      href: '#section8', switchToDoc: true, labelDe: 'Normalformen',         labelEn: 'Normal Forms' },
        { icon: 'fa-book',             href: '#section9', switchToDoc: true, labelDe: 'SQL-Befehlsreferenz',  labelEn: 'SQL Command Reference' },
        { icon: 'fa-film',             href: '#section10', switchToDoc: true, labelDe: 'Visualisierungen',    labelEn: 'Visualizations' }
    ],

    sections: [

        /* ============================================================
           SECTION 1 — RELATIONAL FOUNDATIONS
           ============================================================ */
        {
            id: 'section1',
            titleDe: 'Relationale Grundlagen',
            titleEn: 'Relational Foundations',
            introDe: 'Tabellen, Schlüssel, Datentypen und das relationale Modell — die Basis, auf der alles andere aufbaut.',
            introEn: 'Tables, keys, data types, and the relational model — the basis everything else builds on.',
            subtopics: [

                {
                    id: 'subsection1_1',
                    titleDe: 'Tabelle, Zeile, Spalte, Schlüssel',
                    titleEn: 'Table, Row, Column, Key',
                    htmlDe: `
                    <p class="text-xs mb-2">Eine <strong>Relation</strong> ist eine Tabelle. Jede <strong>Zeile</strong> (Tupel) ist ein Datensatz, jede <strong>Spalte</strong> (Attribut) ein Feld. Der <strong>Primärschlüssel</strong> identifiziert jede Zeile eindeutig, der <strong>Fremdschlüssel</strong> verweist auf einen Primärschlüssel einer anderen Tabelle.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Begriff</th><th>Bedeutung</th><th>Beispiel</th></tr>
                    <tr><td><strong>Relation</strong></td><td class="text-[var(--text-muted)]">Tabelle</td><td class="text-[var(--text-muted)]"><code>kunden</code></td></tr>
                    <tr><td><strong>Tupel</strong></td><td class="text-[var(--text-muted)]">Zeile / Datensatz</td><td class="text-[var(--text-muted)]"><code>(101, 'Kellner', 'Sabine', ...)</code></td></tr>
                    <tr><td><strong>Attribut</strong></td><td class="text-[var(--text-muted)]">Spalte / Feld</td><td class="text-[var(--text-muted)]"><code>name</code></td></tr>
                    <tr><td><strong>Primärschlüssel</strong></td><td class="text-[var(--text-muted)]">Eindeutig, nie NULL</td><td class="text-[var(--text-muted)]"><code>k_nr</code></td></tr>
                    <tr><td><strong>Fremdschlüssel</strong></td><td class="text-[var(--text-muted)]">Verweis auf andere Tabelle</td><td class="text-[var(--text-muted)]"><code>bestellungen.k_nr → kunden.k_nr</code></td></tr>
                    <tr><td><strong>Kandidatenschlüssel</strong></td><td class="text-[var(--text-muted)]">Eindeutig, aber nicht gewählt</td><td class="text-[var(--text-muted)]"><code>email</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">Ein Primärschlüssel kann aus mehreren Spalten bestehen (<em>zusammengesetzter Schlüssel</em>), z.B. <code>(rechnung_nr, position)</code>.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">A <strong>relation</strong> is a table. Each <strong>row</strong> (tuple) is a record, each <strong>column</strong> (attribute) a field. The <strong>primary key</strong> uniquely identifies each row, the <strong>foreign key</strong> references a primary key in another table.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Term</th><th>Meaning</th><th>Example</th></tr>
                    <tr><td><strong>Relation</strong></td><td class="text-[var(--text-muted)]">Table</td><td class="text-[var(--text-muted)]"><code>kunden</code></td></tr>
                    <tr><td><strong>Tuple</strong></td><td class="text-[var(--text-muted)]">Row / record</td><td class="text-[var(--text-muted)]"><code>(101, 'Kellner', 'Sabine', ...)</code></td></tr>
                    <tr><td><strong>Attribute</strong></td><td class="text-[var(--text-muted)]">Column / field</td><td class="text-[var(--text-muted)]"><code>name</code></td></tr>
                    <tr><td><strong>Primary key</strong></td><td class="text-[var(--text-muted)]">Unique, never NULL</td><td class="text-[var(--text-muted)]"><code>k_nr</code></td></tr>
                    <tr><td><strong>Foreign key</strong></td><td class="text-[var(--text-muted)]">References another table</td><td class="text-[var(--text-muted)]"><code>bestellungen.k_nr → kunden.k_nr</code></td></tr>
                    <tr><td><strong>Candidate key</strong></td><td class="text-[var(--text-muted)]">Unique, but not chosen</td><td class="text-[var(--text-muted)]"><code>email</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">A primary key may span several columns (<em>composite key</em>), e.g. <code>(invoice_nr, position)</code>.</p>
                    `
                },

                {
                    id: 'subsection1_2',
                    titleDe: 'Datentypen',
                    titleEn: 'Data Types',
                    htmlDe: `
                    <p class="text-xs mb-2">Datentypen legen fest, was in einer Spalte stehen darf. Die Namen können je nach DBMS leicht variieren, die Konzepte sind überall gleich.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Typ</th><th>Bedeutung</th><th>Beispiel</th></tr>
                    <tr><td><code>INT</code></td><td class="text-[var(--text-muted)]">Ganze Zahlen</td><td class="text-[var(--text-muted)]">42, -7, 1000</td></tr>
                    <tr><td><code>DECIMAL(p,s)</code></td><td class="text-[var(--text-muted)]">Dezimalzahl fester Genauigkeit</td><td class="text-[var(--text-muted)]">123.45 (p=5, s=2)</td></tr>
                    <tr><td><code>FLOAT</code></td><td class="text-[var(--text-muted)]">Gleitkommazahl (ungenau)</td><td class="text-[var(--text-muted)]">3.14159</td></tr>
                    <tr><td><code>CHAR(n)</code></td><td class="text-[var(--text-muted)]">Feste Länge, immer n Zeichen</td><td class="text-[var(--text-muted)]">'DE'</td></tr>
                    <tr><td><code>VARCHAR(n)</code></td><td class="text-[var(--text-muted)]">Variable Länge, max. n Zeichen</td><td class="text-[var(--text-muted)]">'Regensburg'</td></tr>
                    <tr><td><code>TEXT</code></td><td class="text-[var(--text-muted)]">Beliebig lange Zeichenkette</td><td class="text-[var(--text-muted)]">Ein Artikel</td></tr>
                    <tr><td><code>DATE</code></td><td class="text-[var(--text-muted)]">Datum (Jahr, Monat, Tag)</td><td class="text-[var(--text-muted)]">'2024-03-03'</td></tr>
                    <tr><td><code>TIME</code></td><td class="text-[var(--text-muted)]">Uhrzeit</td><td class="text-[var(--text-muted)]">'14:30:00'</td></tr>
                    <tr><td><code>DATETIME</code></td><td class="text-[var(--text-muted)]">Datum und Uhrzeit</td><td class="text-[var(--text-muted)]">'2024-03-03 14:30:00'</td></tr>
                    <tr><td><code>BOOLEAN</code></td><td class="text-[var(--text-muted)]">Wahrheitswert</td><td class="text-[var(--text-muted)]">TRUE, FALSE</td></tr>
                    <tr><td><code>BLOB</code></td><td class="text-[var(--text-muted)]">Binäre Daten</td><td class="text-[var(--text-muted)]">Ein JPEG</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Faustregel für Geldbeträge:</strong> immer <code>DECIMAL</code>, nie <code>FLOAT</code>. FLOAT rundet binär und produziert Cent-Fehler.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Data types define what a column may hold. Names vary slightly between DBMS; concepts are the same everywhere.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Type</th><th>Meaning</th><th>Example</th></tr>
                    <tr><td><code>INT</code></td><td class="text-[var(--text-muted)]">Whole numbers</td><td class="text-[var(--text-muted)]">42, -7, 1000</td></tr>
                    <tr><td><code>DECIMAL(p,s)</code></td><td class="text-[var(--text-muted)]">Fixed-precision decimal</td><td class="text-[var(--text-muted)]">123.45 (p=5, s=2)</td></tr>
                    <tr><td><code>FLOAT</code></td><td class="text-[var(--text-muted)]">Floating point (imprecise)</td><td class="text-[var(--text-muted)]">3.14159</td></tr>
                    <tr><td><code>CHAR(n)</code></td><td class="text-[var(--text-muted)]">Fixed length, always n chars</td><td class="text-[var(--text-muted)]">'DE'</td></tr>
                    <tr><td><code>VARCHAR(n)</code></td><td class="text-[var(--text-muted)]">Variable length, max n chars</td><td class="text-[var(--text-muted)]">'Regensburg'</td></tr>
                    <tr><td><code>TEXT</code></td><td class="text-[var(--text-muted)]">Arbitrary length string</td><td class="text-[var(--text-muted)]">An article</td></tr>
                    <tr><td><code>DATE</code></td><td class="text-[var(--text-muted)]">Date (year, month, day)</td><td class="text-[var(--text-muted)]">'2024-03-03'</td></tr>
                    <tr><td><code>TIME</code></td><td class="text-[var(--text-muted)]">Time of day</td><td class="text-[var(--text-muted)]">'14:30:00'</td></tr>
                    <tr><td><code>DATETIME</code></td><td class="text-[var(--text-muted)]">Date and time</td><td class="text-[var(--text-muted)]">'2024-03-03 14:30:00'</td></tr>
                    <tr><td><code>BOOLEAN</code></td><td class="text-[var(--text-muted)]">Truth value</td><td class="text-[var(--text-muted)]">TRUE, FALSE</td></tr>
                    <tr><td><code>BLOB</code></td><td class="text-[var(--text-muted)]">Binary data</td><td class="text-[var(--text-muted)]">A JPEG</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Rule of thumb for money:</strong> always <code>DECIMAL</code>, never <code>FLOAT</code>. FLOAT rounds in binary and produces cent errors.
                    </div>
                    `
                },

                {
                    id: 'subsection1_3',
                    titleDe: 'Constraints',
                    titleEn: 'Constraints',
                    htmlDe: `
                    <p class="text-xs mb-2">Constraints sind Regeln, die die Datenbank selbst durchsetzt — nicht die Anwendung. Genau das ist der Vorteil gegenüber dateibasierter Haltung.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Constraint</th><th>Bedeutung</th></tr>
                    <tr><td><code>PRIMARY KEY</code></td><td class="text-[var(--text-muted)]">Eindeutig und nie NULL.</td></tr>
                    <tr><td><code>FOREIGN KEY</code></td><td class="text-[var(--text-muted)]">Verweis auf einen Primärschlüssel einer anderen Tabelle.</td></tr>
                    <tr><td><code>NOT NULL</code></td><td class="text-[var(--text-muted)]">Wert darf nicht leer sein.</td></tr>
                    <tr><td><code>UNIQUE</code></td><td class="text-[var(--text-muted)]">Wert muss eindeutig sein.</td></tr>
                    <tr><td><code>CHECK</code></td><td class="text-[var(--text-muted)]">Wert muss eine Bedingung erfüllen, z.B. <code>preis &gt; 0</code>.</td></tr>
                    <tr><td><code>DEFAULT</code></td><td class="text-[var(--text-muted)]">Standardwert, falls nichts angegeben wird.</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Fremdschlüssel schützt vor Waisen:</strong> Ein <code>INSERT</code> in <code>bestellungen</code> mit einer <code>k_nr</code>, die in <code>kunden</code> nicht existiert, wird abgelehnt.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Constraints are rules the database enforces itself — not the application. That is exactly the advantage over file-based storage.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Constraint</th><th>Meaning</th></tr>
                    <tr><td><code>PRIMARY KEY</code></td><td class="text-[var(--text-muted)]">Unique and never NULL.</td></tr>
                    <tr><td><code>FOREIGN KEY</code></td><td class="text-[var(--text-muted)]">References a primary key in another table.</td></tr>
                    <tr><td><code>NOT NULL</code></td><td class="text-[var(--text-muted)]">Value may not be empty.</td></tr>
                    <tr><td><code>UNIQUE</code></td><td class="text-[var(--text-muted)]">Value must be unique.</td></tr>
                    <tr><td><code>CHECK</code></td><td class="text-[var(--text-muted)]">Value must satisfy a condition, e.g. <code>price &gt; 0</code>.</td></tr>
                    <tr><td><code>DEFAULT</code></td><td class="text-[var(--text-muted)]">Default value when none is given.</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Foreign keys prevent orphans:</strong> an <code>INSERT</code> into <code>orders</code> with a <code>customer_id</code> that doesn't exist in <code>customers</code> is rejected.
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 2 — SELECT & FILTER
           ============================================================ */
        {
            id: 'section2',
            titleDe: 'SELECT & Filter',
            titleEn: 'SELECT & Filter',
            introDe: 'Das Herz von SQL: Zeilen auswählen, filtern, sortieren, begrenzen.',
            introEn: 'The heart of SQL: choose rows, filter, sort, limit.',
            subtopics: [

                {
                    id: 'subsection2_1',
                    titleDe: 'Grundform und Spaltenwahl',
                    titleEn: 'Basic Form and Column Selection',
                    htmlDe: `
                    <p class="text-xs mb-2"><code>SELECT</code> liest Spalten aus einer Tabelle. Mit <code>*</code> wählt man alle Spalten, mit <code>DISTINCT</code> entfernt man Duplikate, mit <code>AS</code> vergibt man Aliase.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><code>SELECT</code> reads columns from a table. <code>*</code> selects all columns, <code>DISTINCT</code> removes duplicates, <code>AS</code> assigns aliases.</p>
                    `
                },

                {
                    id: 'subsection2_2',
                    titleDe: 'Filtern mit WHERE',
                    titleEn: 'Filtering with WHERE',
                    htmlDe: `
                    <p class="text-xs mb-2"><code>WHERE</code> filtert Zeilen <em>vor</em> jeder Gruppierung. Die wichtigsten Operatoren:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Operator</th><th>Bedeutung</th><th>Beispiel</th></tr>
                    <tr><td><code>=</code></td><td class="text-[var(--text-muted)]">Gleich</td><td class="text-[var(--text-muted)]"><code>WHERE ort = 'Berlin'</code></td></tr>
                    <tr><td><code>&lt;&gt;</code> / <code>!=</code></td><td class="text-[var(--text-muted)]">Ungleich</td><td class="text-[var(--text-muted)]"><code>WHERE ort &lt;&gt; 'Berlin'</code></td></tr>
                    <tr><td><code>&gt;</code>, <code>&lt;</code></td><td class="text-[var(--text-muted)]">Größer, kleiner</td><td class="text-[var(--text-muted)]"><code>WHERE summe &gt; 50</code></td></tr>
                    <tr><td><code>BETWEEN</code></td><td class="text-[var(--text-muted)]">Bereich (inklusive)</td><td class="text-[var(--text-muted)]"><code>WHERE summe BETWEEN 10 AND 50</code></td></tr>
                    <tr><td><code>IN</code></td><td class="text-[var(--text-muted)]">In einer Liste</td><td class="text-[var(--text-muted)]"><code>WHERE ort IN ('Berlin','Hamburg')</code></td></tr>
                    <tr><td><code>LIKE</code></td><td class="text-[var(--text-muted)]">Muster</td><td class="text-[var(--text-muted)]"><code>WHERE name LIKE 'K%'</code></td></tr>
                    <tr><td><code>IS NULL</code></td><td class="text-[var(--text-muted)]">Ist leer</td><td class="text-[var(--text-muted)]"><code>WHERE email IS NULL</code></td></tr>
                    <tr><td><code>AND</code>, <code>OR</code>, <code>NOT</code></td><td class="text-[var(--text-muted)]">Verknüpfung</td><td class="text-[var(--text-muted)]"><code>WHERE ort='Berlin' AND plz='10115'</code></td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">NULL-Falle:</strong> <code>WHERE email = NULL</code> liefert niemals Zeilen. Immer <code>IS NULL</code> verwenden.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><code>WHERE</code> filters rows <em>before</em> any grouping. The most important operators:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
                    <tr><td><code>=</code></td><td class="text-[var(--text-muted)]">Equals</td><td class="text-[var(--text-muted)]"><code>WHERE city = 'Berlin'</code></td></tr>
                    <tr><td><code>&lt;&gt;</code> / <code>!=</code></td><td class="text-[var(--text-muted)]">Not equal</td><td class="text-[var(--text-muted)]"><code>WHERE city &lt;&gt; 'Berlin'</code></td></tr>
                    <tr><td><code>&gt;</code>, <code>&lt;</code></td><td class="text-[var(--text-muted)]">Greater, less</td><td class="text-[var(--text-muted)]"><code>WHERE amount &gt; 50</code></td></tr>
                    <tr><td><code>BETWEEN</code></td><td class="text-[var(--text-muted)]">Range (inclusive)</td><td class="text-[var(--text-muted)]"><code>WHERE amount BETWEEN 10 AND 50</code></td></tr>
                    <tr><td><code>IN</code></td><td class="text-[var(--text-muted)]">In a list</td><td class="text-[var(--text-muted)]"><code>WHERE city IN ('Berlin','Hamburg')</code></td></tr>
                    <tr><td><code>LIKE</code></td><td class="text-[var(--text-muted)]">Pattern</td><td class="text-[var(--text-muted)]"><code>WHERE last_name LIKE 'K%'</code></td></tr>
                    <tr><td><code>IS NULL</code></td><td class="text-[var(--text-muted)]">Is empty</td><td class="text-[var(--text-muted)]"><code>WHERE email IS NULL</code></td></tr>
                    <tr><td><code>AND</code>, <code>OR</code>, <code>NOT</code></td><td class="text-[var(--text-muted)]">Combine</td><td class="text-[var(--text-muted)]"><code>WHERE city='Berlin' AND zip='10115'</code></td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">NULL trap:</strong> <code>WHERE email = NULL</code> never returns rows. Always use <code>IS NULL</code>.
                    </div>
                    `
                },

                {
                    id: 'subsection2_3',
                    titleDe: 'Sortieren und Begrenzen',
                    titleEn: 'Sorting and Limiting',
                    htmlDe: `
                    <p class="text-xs mb-2"><code>ORDER BY</code> sortiert das Ergebnis, <code>LIMIT</code> begrenzt die Zahl der zurückgegebenen Zeilen, <code>OFFSET</code> überspringt die ersten N Zeilen (für Pagination).</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><code>ORDER BY</code> sorts the result, <code>LIMIT</code> caps the number of returned rows, <code>OFFSET</code> skips the first N rows (for pagination).</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 3 — JOINS
           ============================================================ */
        {
            id: 'section3',
            titleDe: 'Joins — Tabellen verknüpfen',
            titleEn: 'Joins — Combining Tables',
            introDe: 'Getrennte Tabellen werden über gemeinsame Schlüssel wieder zusammengeführt. Vier Join-Typen, klar unterschieden.',
            introEn: 'Separated tables are recombined over shared keys. Four join types, clearly distinguished.',
            subtopics: [

                {
                    id: 'subsection3_1',
                    titleDe: 'INNER JOIN',
                    titleEn: 'INNER JOIN',
                    htmlDe: `
                    <p class="text-xs mb-2">Gibt nur Zeilen zurück, bei denen es in <strong>beiden</strong> Tabellen einen passenden Partner gibt.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Returns only rows where a matching partner exists in <strong>both</strong> tables.</p>
                    `
                },

                {
                    id: 'subsection3_2',
                    titleDe: 'LEFT JOIN und RIGHT JOIN',
                    titleEn: 'LEFT JOIN and RIGHT JOIN',
                    htmlDe: `
                    <p class="text-xs mb-2"><strong>LEFT JOIN</strong> gibt alle Zeilen der linken Tabelle zurück, auch wenn rechts kein Partner existiert — fehlende Werte werden mit <code>NULL</code> gefüllt. <strong>RIGHT JOIN</strong> ist das Spiegelbild.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>LEFT JOIN</strong> returns all rows from the left table, even when no partner exists on the right — missing values are filled with <code>NULL</code>. <strong>RIGHT JOIN</strong> is the mirror image.</p>
                    `
                },

                {
                    id: 'subsection3_3',
                    titleDe: 'FULL JOIN und SELF JOIN',
                    titleEn: 'FULL JOIN and SELF JOIN',
                    htmlDe: `
                    <p class="text-xs mb-2"><strong>FULL OUTER JOIN</strong> gibt alle Zeilen aus beiden Tabellen zurück, fehlende Seiten mit <code>NULL</code>. In MySQL fehlt der Befehl. <strong>SELF JOIN</strong> verknüpft eine Tabelle mit sich selbst.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>FULL OUTER JOIN</strong> returns all rows from both tables, with <code>NULL</code> on the missing side. MySQL lacks this command. <strong>SELF JOIN</strong> joins a table with itself.</p>
                    `
                },

                {
                    id: 'subsection3_4',
                    titleDe: 'Join-Typen visuell',
                    titleEn: 'Join Types Visually',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Join</th><th>Linke Zeilen</th><th>Rechte Zeilen</th><th>Ergebnis</th></tr>
                    <tr><td><strong>INNER</strong></td><td class="text-[var(--text-muted)]">nur mit Partner</td><td class="text-[var(--text-muted)]">nur mit Partner</td><td class="text-[var(--text-muted)]">Schnittmenge</td></tr>
                    <tr><td><strong>LEFT</strong></td><td class="text-[var(--text-muted)]">alle</td><td class="text-[var(--text-muted)]">nur mit Partner</td><td class="text-[var(--text-muted)]">links vollständig</td></tr>
                    <tr><td><strong>RIGHT</strong></td><td class="text-[var(--text-muted)]">nur mit Partner</td><td class="text-[var(--text-muted)]">alle</td><td class="text-[var(--text-muted)]">rechts vollständig</td></tr>
                    <tr><td><strong>FULL</strong></td><td class="text-[var(--text-muted)]">alle</td><td class="text-[var(--text-muted)]">alle</td><td class="text-[var(--text-muted)]">Vereinigung</td></tr>
                    <tr><td><strong>CROSS</strong></td><td class="text-[var(--text-muted)]">alle</td><td class="text-[var(--text-muted)]">alle</td><td class="text-[var(--text-muted)]">Kreuzprodukt (n × m)</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Join</th><th>Left rows</th><th>Right rows</th><th>Result</th></tr>
                    <tr><td><strong>INNER</strong></td><td class="text-[var(--text-muted)]">only with match</td><td class="text-[var(--text-muted)]">only with match</td><td class="text-[var(--text-muted)]">intersection</td></tr>
                    <tr><td><strong>LEFT</strong></td><td class="text-[var(--text-muted)]">all</td><td class="text-[var(--text-muted)]">only with match</td><td class="text-[var(--text-muted)]">left complete</td></tr>
                    <tr><td><strong>RIGHT</strong></td><td class="text-[var(--text-muted)]">only with match</td><td class="text-[var(--text-muted)]">all</td><td class="text-[var(--text-muted)]">right complete</td></tr>
                    <tr><td><strong>FULL</strong></td><td class="text-[var(--text-muted)]">all</td><td class="text-[var(--text-muted)]">all</td><td class="text-[var(--text-muted)]">union</td></tr>
                    <tr><td><strong>CROSS</strong></td><td class="text-[var(--text-muted)]">all</td><td class="text-[var(--text-muted)]">all</td><td class="text-[var(--text-muted)]">cross product (n × m)</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 4 — AGGREGATION
           ============================================================ */
        {
            id: 'section4',
            titleDe: 'Aggregatfunktionen & Gruppierung',
            titleEn: 'Aggregate Functions & Grouping',
            introDe: 'Zeilen zu Werten zusammenfassen, Gruppen bilden und filtern — die Grundlage jeder Auswertung.',
            introEn: 'Collapse rows into values, form groups and filter them — the basis of any report.',
            subtopics: [

                {
                    id: 'subsection4_1',
                    titleDe: 'Aggregatfunktionen',
                    titleEn: 'Aggregate Functions',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Funktion</th><th>Bedeutung</th></tr>
                    <tr><td><code>COUNT(*)</code></td><td class="text-[var(--text-muted)]">Anzahl Zeilen</td></tr>
                    <tr><td><code>COUNT(spalte)</code></td><td class="text-[var(--text-muted)]">Anzahl <em>nicht-leerer</em> Werte</td></tr>
                    <tr><td><code>SUM(spalte)</code></td><td class="text-[var(--text-muted)]">Summe</td></tr>
                    <tr><td><code>AVG(spalte)</code></td><td class="text-[var(--text-muted)]">Durchschnitt</td></tr>
                    <tr><td><code>MIN(spalte)</code></td><td class="text-[var(--text-muted)]">Kleinster Wert</td></tr>
                    <tr><td><code>MAX(spalte)</code></td><td class="text-[var(--text-muted)]">Größter Wert</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><code>COUNT(*)</code> zählt Zeilen, <code>COUNT(spalte)</code> ignoriert NULL-Werte. Diese Unterscheidung ist eine der häufigsten Fehlerquellen in Reports.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Function</th><th>Meaning</th></tr>
                    <tr><td><code>COUNT(*)</code></td><td class="text-[var(--text-muted)]">Row count</td></tr>
                    <tr><td><code>COUNT(column)</code></td><td class="text-[var(--text-muted)]">Count of <em>non-null</em> values</td></tr>
                    <tr><td><code>SUM(column)</code></td><td class="text-[var(--text-muted)]">Sum</td></tr>
                    <tr><td><code>AVG(column)</code></td><td class="text-[var(--text-muted)]">Average</td></tr>
                    <tr><td><code>MIN(column)</code></td><td class="text-[var(--text-muted)]">Smallest value</td></tr>
                    <tr><td><code>MAX(column)</code></td><td class="text-[var(--text-muted)]">Largest value</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><code>COUNT(*)</code> counts rows, <code>COUNT(column)</code> ignores NULLs. That distinction is one of the most common sources of reporting bugs.</p>
                    `
                },

                {
                    id: 'subsection4_2',
                    titleDe: 'GROUP BY',
                    titleEn: 'GROUP BY',
                    htmlDe: `
                    <p class="text-xs mb-2"><code>GROUP BY</code> fasst Zeilen mit gleichem Wert in einer Spalte zusammen und wendet Aggregatfunktionen auf jede Gruppe an.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Regel:</strong> Jede Spalte in <code>SELECT</code>, die nicht in einer Aggregatfunktion steht, muss in <code>GROUP BY</code> auftauchen.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><code>GROUP BY</code> collapses rows with the same value in a column and applies aggregate functions to each group.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Rule:</strong> every column in <code>SELECT</code> that is not inside an aggregate function must appear in <code>GROUP BY</code>.
                    </div>
                    `
                },

                {
                    id: 'subsection4_3',
                    titleDe: 'HAVING vs. WHERE',
                    titleEn: 'HAVING vs. WHERE',
                    htmlDe: `
                    <p class="text-xs mb-2"><code>WHERE</code> filtert <em>Zeilen vor</em> der Gruppierung, <code>HAVING</code> filtert <em>Gruppen nach</em> der Gruppierung. Aggregatfunktionen sind in <code>HAVING</code> erlaubt, in <code>WHERE</code> nicht.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th>Klausel</th><th>Filtert</th><th>Wann ausgeführt</th><th>Aggregate erlaubt?</th></tr>
                    <tr><td><code>WHERE</code></td><td class="text-[var(--text-muted)]">einzelne Zeilen</td><td class="text-[var(--text-muted)]">vor <code>GROUP BY</code></td><td>Nein</td></tr>
                    <tr><td><code>HAVING</code></td><td class="text-[var(--text-muted)]">Gruppen</td><td class="text-[var(--text-muted)]">nach <code>GROUP BY</code></td><td>Ja</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><code>WHERE</code> filters <em>rows before</em> grouping, <code>HAVING</code> filters <em>groups after</em> grouping. Aggregates are allowed in <code>HAVING</code>, not in <code>WHERE</code>.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th>Clause</th><th>Filters</th><th>When it runs</th><th>Aggregates allowed?</th></tr>
                    <tr><td><code>WHERE</code></td><td class="text-[var(--text-muted)]">individual rows</td><td class="text-[var(--text-muted)]">before <code>GROUP BY</code></td><td>No</td></tr>
                    <tr><td><code>HAVING</code></td><td class="text-[var(--text-muted)]">groups</td><td class="text-[var(--text-muted)]">after <code>GROUP BY</code></td><td>Yes</td></tr>
                    </table>
                    </div>
                    `
                },

                {
                    id: 'subsection4_4',
                    titleDe: 'Ausführungsreihenfolge',
                    titleEn: 'Execution Order',
                    htmlDe: `
                    <p class="text-xs mb-2">Die Reihenfolge, in der die Datenbank eine <code>SELECT</code>-Abfrage abarbeitet, ist <strong>nicht</strong> die Reihenfolge, in der man sie schreibt.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Klausel</th><th>Was passiert</th></tr>
                    <tr><td>1</td><td><code>FROM</code> / <code>JOIN</code></td><td class="text-[var(--text-muted)]">Tabellen laden und verknüpfen</td></tr>
                    <tr><td>2</td><td><code>WHERE</code></td><td class="text-[var(--text-muted)]">Zeilen filtern</td></tr>
                    <tr><td>3</td><td><code>GROUP BY</code></td><td class="text-[var(--text-muted)]">Zeilen gruppieren</td></tr>
                    <tr><td>4</td><td><code>HAVING</code></td><td class="text-[var(--text-muted)]">Gruppen filtern</td></tr>
                    <tr><td>5</td><td><code>SELECT</code></td><td class="text-[var(--text-muted)]">Spalten auswählen und berechnen</td></tr>
                    <tr><td>6</td><td><code>ORDER BY</code></td><td class="text-[var(--text-muted)]">Ergebnis sortieren</td></tr>
                    <tr><td>7</td><td><code>LIMIT</code> / <code>OFFSET</code></td><td class="text-[var(--text-muted)]">Ergebnis begrenzen</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The order in which the database executes a <code>SELECT</code> query is <strong>not</strong> the order in which you write it.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>Clause</th><th>What happens</th></tr>
                    <tr><td>1</td><td><code>FROM</code> / <code>JOIN</code></td><td class="text-[var(--text-muted)]">Load and join tables</td></tr>
                    <tr><td>2</td><td><code>WHERE</code></td><td class="text-[var(--text-muted)]">Filter rows</td></tr>
                    <tr><td>3</td><td><code>GROUP BY</code></td><td class="text-[var(--text-muted)]">Group rows</td></tr>
                    <tr><td>4</td><td><code>HAVING</code></td><td class="text-[var(--text-muted)]">Filter groups</td></tr>
                    <tr><td>5</td><td><code>SELECT</code></td><td class="text-[var(--text-muted)]">Select and compute columns</td></tr>
                    <tr><td>6</td><td><code>ORDER BY</code></td><td class="text-[var(--text-muted)]">Sort result</td></tr>
                    <tr><td>7</td><td><code>LIMIT</code> / <code>OFFSET</code></td><td class="text-[var(--text-muted)]">Limit result</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 5 — DDL & DML
           ============================================================ */
        {
            id: 'section5',
            titleDe: 'DDL & DML',
            titleEn: 'DDL & DML',
            introDe: 'DDL definiert die Struktur (CREATE, ALTER, DROP). DML verändert die Daten (INSERT, UPDATE, DELETE).',
            introEn: 'DDL defines the structure (CREATE, ALTER, DROP). DML modifies the data (INSERT, UPDATE, DELETE).',
            subtopics: [

                {
                    id: 'subsection5_1',
                    titleDe: 'CREATE TABLE',
                    titleEn: 'CREATE TABLE',
                    htmlDe: `
                    <p class="text-xs mb-2">Beim Erstellen einer Tabelle legt man Spalten, Datentypen und Constraints fest. <code>PRIMARY KEY</code> impliziert <code>NOT NULL</code> und <code>UNIQUE</code>.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Creating a table defines columns, data types, and constraints. <code>PRIMARY KEY</code> implies <code>NOT NULL</code> and <code>UNIQUE</code>.</p>
                    `
                },

                {
                    id: 'subsection5_2',
                    titleDe: 'ALTER TABLE',
                    titleEn: 'ALTER TABLE',
                    htmlDe: `
                    <p class="text-xs mb-2"><code>ALTER TABLE</code> ändert eine bestehende Tabelle: Spalten hinzufügen, Datentypen ändern, Constraints ergänzen. <code>DROP COLUMN</code> entfernt eine Spalte samt Daten.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><code>ALTER TABLE</code> modifies an existing table: add columns, change data types, add constraints. <code>DROP COLUMN</code> removes a column including its data.</p>
                    `
                },

                {
                    id: 'subsection5_3',
                    titleDe: 'Indexe',
                    titleEn: 'Indexes',
                    htmlDe: `
                    <p class="text-xs mb-2">Ein <strong>Index</strong> beschleunigt das Suchen — auf Kosten von Speicher und Schreibgeschwindigkeit.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th>Situation</th><th>Index sinnvoll?</th></tr>
                    <tr><td class="text-[var(--text-muted)]">Spalte wird oft in <code>WHERE</code> gefiltert</td><td>Ja</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Spalte wird oft für <code>JOIN</code> verwendet</td><td>Ja</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Spalte wird oft sortiert</td><td>Ja</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Tabelle hat sehr viele <code>INSERT</code>/<code>UPDATE</code></td><td>Eher nein</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Spalte hat nur wenige verschiedene Werte</td><td>Eher nein</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">An <strong>index</strong> speeds up lookups — at the cost of storage and write performance.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th>Situation</th><th>Index worth it?</th></tr>
                    <tr><td class="text-[var(--text-muted)]">Column often filtered in <code>WHERE</code></td><td>Yes</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Column often used for <code>JOIN</code></td><td>Yes</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Column often sorted</td><td>Yes</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Table has heavy <code>INSERT</code>/<code>UPDATE</code></td><td>Probably not</td></tr>
                    <tr><td class="text-[var(--text-muted)]">Column has few distinct values</td><td>Probably not</td></tr>
                    </table>
                    </div>
                    `
                },

                {
                    id: 'subsection5_4',
                    titleDe: 'INSERT, UPDATE, DELETE',
                    titleEn: 'INSERT, UPDATE, DELETE',
                    htmlDe: `
                    <p class="text-xs mb-2"><code>INSERT</code> fügt neue Zeilen ein (mehrere auf einmal sind schneller als viele Einzelbefehle). <code>UPDATE</code> ändert bestehende Zeilen — <strong>ohne WHERE werden alle Zeilen getroffen</strong>. <code>DELETE</code> löscht Zeilen — <strong>ohne WHERE wird die ganze Tabelle geleert</strong>.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><code>INSERT</code> adds new rows (multiple at once is faster than many singles). <code>UPDATE</code> modifies existing rows — <strong>without WHERE, all rows are hit</strong>. <code>DELETE</code> removes rows — <strong>without WHERE, the whole table is emptied</strong>.</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 6 — TRANSACTIONS
           ============================================================ */
        {
            id: 'section6',
            titleDe: 'Transaktionen',
            titleEn: 'Transactions',
            introDe: 'Mehrere Befehle als eine untrennbare Einheit — ganz oder gar nicht. Die Grundlage jeder zuverlässigen Datenbank.',
            introEn: 'Several statements as one indivisible unit — all or nothing. The foundation of any reliable database.',
            subtopics: [

                {
                    id: 'subsection6_1',
                    titleDe: 'BEGIN, COMMIT, ROLLBACK',
                    titleEn: 'BEGIN, COMMIT, ROLLBACK',
                    htmlDe: `
                    <p class="text-xs mb-2">Eine Transaktion klammert mehrere Befehle zusammen. Entweder alle werden wirksam, oder keiner.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th>Befehl</th><th>Wirkung</th></tr>
                    <tr><td><code>BEGIN</code> / <code>START TRANSACTION</code></td><td class="text-[var(--text-muted)]">Transaktion starten</td></tr>
                    <tr><td><code>COMMIT</code></td><td class="text-[var(--text-muted)]">Alle Änderungen dauerhaft übernehmen</td></tr>
                    <tr><td><code>ROLLBACK</code></td><td class="text-[var(--text-muted)]">Alle Änderungen seit <code>BEGIN</code> verwerfen</td></tr>
                    <tr><td><code>SAVEPOINT name</code></td><td class="text-[var(--text-muted)]">Zwischenmarke, zu der man zurückrollen kann</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">A transaction groups multiple statements. Either all become effective, or none.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th>Command</th><th>Effect</th></tr>
                    <tr><td><code>BEGIN</code> / <code>START TRANSACTION</code></td><td class="text-[var(--text-muted)]">Start a transaction</td></tr>
                    <tr><td><code>COMMIT</code></td><td class="text-[var(--text-muted)]">Make all changes permanent</td></tr>
                    <tr><td><code>ROLLBACK</code></td><td class="text-[var(--text-muted)]">Discard all changes since <code>BEGIN</code></td></tr>
                    <tr><td><code>SAVEPOINT name</code></td><td class="text-[var(--text-muted)]">Intermediate marker you can roll back to</td></tr>
                    </table>
                    </div>
                    `
                },

                {
                    id: 'subsection6_2',
                    titleDe: 'ACID-Eigenschaften',
                    titleEn: 'ACID Properties',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Buchstabe</th><th>Eigenschaft</th><th>Bedeutung</th></tr>
                    <tr><td><strong>A</strong></td><td>Atomicity</td><td class="text-[var(--text-muted)]">Ganz oder gar nicht — eine Transaktion ist unteilbar.</td></tr>
                    <tr><td><strong>C</strong></td><td>Consistency</td><td class="text-[var(--text-muted)]">Die Datenbank wechselt von einem gültigen Zustand in einen anderen.</td></tr>
                    <tr><td><strong>I</strong></td><td>Isolation</td><td class="text-[var(--text-muted)]">Parallele Transaktionen stören sich nicht.</td></tr>
                    <tr><td><strong>D</strong></td><td>Durability</td><td class="text-[var(--text-muted)]">Nach <code>COMMIT</code> sind die Daten dauerhaft — auch bei Stromausfall.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Letter</th><th>Property</th><th>Meaning</th></tr>
                    <tr><td><strong>A</strong></td><td>Atomicity</td><td class="text-[var(--text-muted)]">All or nothing — a transaction is indivisible.</td></tr>
                    <tr><td><strong>C</strong></td><td>Consistency</td><td class="text-[var(--text-muted)]">The database moves from one valid state to another.</td></tr>
                    <tr><td><strong>I</strong></td><td>Isolation</td><td class="text-[var(--text-muted)]">Parallel transactions don't interfere.</td></tr>
                    <tr><td><strong>D</strong></td><td>Durability</td><td class="text-[var(--text-muted)]">After <code>COMMIT</code>, data is permanent — even across power loss.</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 7 — ANOMALIES (NEW)
           ============================================================ */
        {
            id: 'section7',
            titleDe: 'Anomalien',
            titleEn: 'Anomalies',
            introDe: 'Redundanz in einer schlecht strukturierten Tabelle führt zu drei klassischen Anomalien: Einfüge-, Änderungs- und Lösch-Anomalie. Genau sie machen Normalisierung notwendig.',
            introEn: 'Redundancy in a poorly structured table leads to three classic anomalies: insert, update, and delete anomaly. They are exactly what makes normalization necessary.',
            subtopics: [

                {
                    id: 'subsection7_1',
                    titleDe: 'Ausgangsproblem: redundante Tabelle',
                    titleEn: 'Source Problem: Redundant Table',
                    htmlDe: `
                    <p class="text-xs mb-2">Stellen Sie sich eine einzige, flache Tabelle vor, die <strong>Bestellungen UND Kundendaten</strong> in einer Zeile mischt. So sahen viele alte, dateibasierte Systeme aus.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Bestell-Nr</th><th>Kunde</th><th>Kunden-Adresse</th><th>Artikel</th></tr>
                    <tr style="background: rgba(239,68,68,0.12)"><td>1001</td><td>Meier GmbH</td><td>Musterstr. 1, München</td><td>Laptop</td></tr>
                    <tr style="background: rgba(239,68,68,0.12)"><td>1002</td><td>Meier GmbH</td><td>Musterstr. 1, München</td><td>Monitor</td></tr>
                    <tr><td>1003</td><td>Schmidt AG</td><td>Bahnhofstr. 5, Berlin</td><td>Tastatur</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">Der Name und die Adresse von „Meier GmbH" stehen <strong>doppelt</strong> (rot markiert). Aus dieser Redundanz entstehen die drei folgenden Anomalien.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Imagine a single, flat table that mixes <strong>orders AND customer data</strong> in one row. That is what many old, file-based systems looked like.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Order No</th><th>Customer</th><th>Customer Address</th><th>Item</th></tr>
                    <tr style="background: rgba(239,68,68,0.12)"><td>1001</td><td>Meier GmbH</td><td>Musterstr. 1, Munich</td><td>Laptop</td></tr>
                    <tr style="background: rgba(239,68,68,0.12)"><td>1002</td><td>Meier GmbH</td><td>Musterstr. 1, Munich</td><td>Monitor</td></tr>
                    <tr><td>1003</td><td>Schmidt AG</td><td>Bahnhofstr. 5, Berlin</td><td>Keyboard</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">The name and address of "Meier GmbH" appear <strong>twice</strong> (highlighted in red). This redundancy is the source of the three anomalies below.</p>
                    `
                },

                {
                    id: 'subsection7_2',
                    titleDe: 'Einfüge-Anomalie (Insert)',
                    titleEn: 'Insert Anomaly',
                    htmlDe: `
                    <div class="bg-[rgba(16,185,129,0.10)] border-l-4 border-[#10b981] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Einfüge-Anomalie</div>
                        <p class="text-[var(--text-muted)] m-0">Ein neuer Kunde, der <strong>noch keine Bestellung</strong> aufgegeben hat, kann gar nicht erfasst werden — weil die Tabelle nur über Bestellungen funktioniert. Es gibt keine Zeile ohne Artikel, in die man den Kunden allein eintragen könnte.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Folge: Kundendaten gehen verloren, bis der erste Kauf stattfindet. In der Praxis führt das zu „Geisterkunden" und unvollständigen Stammdaten.</p>
                    `,
                    htmlEn: `
                    <div class="bg-[rgba(16,185,129,0.10)] border-l-4 border-[#10b981] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Insert Anomaly</div>
                        <p class="text-[var(--text-muted)] m-0">A new customer who has <strong>not yet placed an order</strong> cannot be recorded — because the table only works via orders. There is no row without an item where you could enter the customer alone.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Consequence: customer data is lost until the first purchase. In practice this leads to "ghost customers" and incomplete master data.</p>
                    `
                },

                {
                    id: 'subsection7_3',
                    titleDe: 'Änderungs-Anomalie (Update)',
                    titleEn: 'Update Anomaly',
                    htmlDe: `
                    <div class="bg-[rgba(245,158,11,0.10)] border-l-4 border-[#f59e0b] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Änderungs-Anomalie</div>
                        <p class="text-[var(--text-muted)] m-0">Zieht „Meier GmbH" um, muss die Adresse in <strong>jeder Zeile</strong> geändert werden, in der der Kunde vorkommt. Wird nur eine Zeile aktualisiert, widersprechen sich die Daten sofort — Zeile 1001 und 1002 zeigen dann unterschiedliche Adressen.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Folge: Inkonsistenz. Die Datenbank kennt keine einzige Wahrheit mehr. Je häufiger der Kunde bestellt, desto mehr Zeilen müssen angefasst werden.</p>
                    `,
                    htmlEn: `
                    <div class="bg-[rgba(245,158,11,0.10)] border-l-4 border-[#f59e0b] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Update Anomaly</div>
                        <p class="text-[var(--text-muted)] m-0">If "Meier GmbH" moves, the address must be changed in <strong>every row</strong> where the customer appears. If only one row is updated, the data immediately contradicts itself — rows 1001 and 1002 then show different addresses.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Consequence: inconsistency. The database no longer knows a single truth. The more often the customer orders, the more rows must be touched.</p>
                    `
                },

                {
                    id: 'subsection7_4',
                    titleDe: 'Lösch-Anomalie (Delete)',
                    titleEn: 'Delete Anomaly',
                    htmlDe: `
                    <div class="bg-[rgba(239,68,68,0.10)] border-l-4 border-[#ef4444] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Lösch-Anomalie</div>
                        <p class="text-[var(--text-muted)] m-0">Storniert „Schmidt AG" ihre <strong>einzige Bestellung 1003</strong> und die Zeile wird gelöscht, verschwinden damit ungewollt auch alle Informationen über die Kundin selbst — obwohl sie weiterhin Kundin bleiben könnte.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Folge: unbeabsichtigter Datenverlust. Bestell- und Stammdaten hängen zu eng zusammen, ein Löschen reißt beides mit.</p>
                    `,
                    htmlEn: `
                    <div class="bg-[rgba(239,68,68,0.10)] border-l-4 border-[#ef4444] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Delete Anomaly</div>
                        <p class="text-[var(--text-muted)] m-0">If "Schmidt AG" cancels their <strong>only order 1003</strong> and the row is deleted, all information about the customer is unintentionally lost as well — even though they might remain a customer.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Consequence: unintended data loss. Order and master data are too tightly coupled, deleting one drags the other with it.</p>
                    `
                },

                {
                    id: 'subsection7_5',
                    titleDe: 'Lösung: Aufteilen in getrennte Tabellen',
                    titleEn: 'Solution: Split into Separate Tables',
                    htmlDe: `
                    <p class="text-xs mb-2">Kunden- und Bestelldaten werden in <strong>getrennte Tabellen</strong> aufgeteilt, verknüpft über einen Schlüssel und bei Bedarf per <code>JOIN</code> wieder zusammengeführt.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div class="p-3 border-2 border-[#3b82f6] rounded-lg bg-[rgba(59,130,246,0.08)]">
                            <div class="font-bold text-xs mb-1" style="color:#3b82f6;">KUNDEN</div>
                            <div class="text-[11px] text-[var(--text-muted)] font-mono">k_nr · Name · Adresse</div>
                            <p class="text-[11px] text-[var(--text-muted)] mt-2 mb-0">Jeder Kunde steht genau <strong>einmal</strong>.</p>
                        </div>
                        <div class="p-3 border-2 border-[#f59e0b] rounded-lg bg-[rgba(245,158,11,0.08)]">
                            <div class="font-bold text-xs mb-1" style="color:#f59e0b;">BESTELLUNGEN</div>
                            <div class="text-[11px] text-[var(--text-muted)] font-mono">bestell_nr · Artikel · <strong>k_nr (FK)</strong></div>
                            <p class="text-[11px] text-[var(--text-muted)] mt-2 mb-0">Jede Bestellung verweist auf ihren Kunden.</p>
                        </div>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Verknüpft über einen gemeinsamen Schlüssel (<code>k_nr</code>). Damit sind alle drei Anomalien beseitigt: neue Kunden ohne Bestellung erfassbar, Adressänderung trifft nur eine Zeile, Löschen einer Bestellung lässt den Kunden bestehen.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Weiterführend:</strong> Wie man systematisch zu dieser Aufteilung kommt, zeigt der Abschnitt <a href="#section8" class="underline">Normalformen</a>.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Customer and order data are split into <strong>separate tables</strong>, linked via a key and recombined via <code>JOIN</code> when needed.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div class="p-3 border-2 border-[#3b82f6] rounded-lg bg-[rgba(59,130,246,0.08)]">
                            <div class="font-bold text-xs mb-1" style="color:#3b82f6;">CUSTOMERS</div>
                            <div class="text-[11px] text-[var(--text-muted)] font-mono">customer_id · name · address</div>
                            <p class="text-[11px] text-[var(--text-muted)] mt-2 mb-0">Each customer appears exactly <strong>once</strong>.</p>
                        </div>
                        <div class="p-3 border-2 border-[#f59e0b] rounded-lg bg-[rgba(245,158,11,0.08)]">
                            <div class="font-bold text-xs mb-1" style="color:#f59e0b;">ORDERS</div>
                            <div class="text-[11px] text-[var(--text-muted)] font-mono">order_nr · item · <strong>customer_id (FK)</strong></div>
                            <p class="text-[11px] text-[var(--text-muted)] mt-2 mb-0">Each order references its customer.</p>
                        </div>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Linked via a shared key (<code>customer_id</code>). This eliminates all three anomalies: new customers without orders can be recorded, an address change touches only one row, deleting an order leaves the customer intact.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Next step:</strong> How to reach this split systematically is covered in the <a href="#section8" class="underline">normal forms</a> section.
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 8 — NORMAL FORMS (NEW)
           ============================================================ */
        {
            id: 'section8',
            titleDe: 'Normalformen',
            titleEn: 'Normal Forms',
            introDe: 'Normalisierung ist die Aufteilung von Attributen in mehrere Relationen nach festen Regeln, sodass am Ende keine vermeidbaren Redundanzen mehr übrig bleiben. Jede Stufe baut auf der vorherigen auf.',
            introEn: 'Normalization is the process of splitting attributes into several relations according to fixed rules, so that no avoidable redundancy remains. Each stage builds on the previous one.',
            subtopics: [

                {
                    id: 'subsection8_overview',
                    titleDe: 'Überblick: 0NF bis 3NF',
                    titleEn: 'Overview: 0NF to 3NF',
                    htmlDe: `
                    <p class="text-xs mb-2">Es gibt insgesamt fünf Normalformen. In der Praxis reicht die <strong>3. Normalform (3NF)</strong> fast immer aus, um Redundanzfreiheit und Performance in Balance zu halten.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Stufe</th><th>Forderung</th><th>Löst welches Problem?</th></tr>
                    <tr><td><strong>0NF</strong></td><td class="text-[var(--text-muted)]">Alle Daten unstrukturiert in einer Tabelle (Ausgangszustand).</td><td class="text-[var(--text-muted)]">nichts — Redundanz überall</td></tr>
                    <tr><td><strong>1NF</strong></td><td class="text-[var(--text-muted)]">Alle Attributwerte sind atomar; keine Wiederholungsgruppen.</td><td class="text-[var(--text-muted)]">mehrere Informationen in einer Zelle</td></tr>
                    <tr><td><strong>2NF</strong></td><td class="text-[var(--text-muted)]">1NF + jedes Nicht-Schlüssel-Attribut hängt voll vom <em>gesamten</em> Primärschlüssel ab.</td><td class="text-[var(--text-muted)]">partielle Abhängigkeiten bei zusammengesetzten Schlüsseln</td></tr>
                    <tr><td><strong>3NF</strong></td><td class="text-[var(--text-muted)]">2NF + keine transitiven Abhängigkeiten zwischen Nicht-Schlüssel-Attributen.</td><td class="text-[var(--text-muted)]">ein Attribut hängt indirekt über ein anderes vom Schlüssel ab</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Merksatz:</strong> Jede Stufe setzt die vorherige voraus — 2NF erfordert 1NF, 3NF erfordert 2NF. Wer die 3NF erfüllt, erfüllt automatisch auch die 1NF und 2NF.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">There are five normal forms in total. In practice the <strong>3rd normal form (3NF)</strong> is almost always enough to balance redundancy-freedom and performance.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Stage</th><th>Requirement</th><th>Problem it solves</th></tr>
                    <tr><td><strong>0NF</strong></td><td class="text-[var(--text-muted)]">All data unstructured in one table (initial state).</td><td class="text-[var(--text-muted)]">nothing — redundancy everywhere</td></tr>
                    <tr><td><strong>1NF</strong></td><td class="text-[var(--text-muted)]">All attribute values are atomic; no repeating groups.</td><td class="text-[var(--text-muted)]">multiple pieces of info in one cell</td></tr>
                    <tr><td><strong>2NF</strong></td><td class="text-[var(--text-muted)]">1NF + every non-key attribute fully depends on the <em>entire</em> primary key.</td><td class="text-[var(--text-muted)]">partial dependencies with composite keys</td></tr>
                    <tr><td><strong>3NF</strong></td><td class="text-[var(--text-muted)]">2NF + no transitive dependencies between non-key attributes.</td><td class="text-[var(--text-muted)]">attribute depends indirectly via another one</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Mnemonic:</strong> each stage requires the previous one — 2NF requires 1NF, 3NF requires 2NF. Meeting 3NF automatically satisfies 1NF and 2NF.
                    </div>
                    `
                },

                {
                    id: 'subsection8_1nf',
                    titleDe: '1. Normalform (1NF)',
                    titleEn: 'First Normal Form (1NF)',
                    htmlDe: `
                    <p class="text-xs mb-2">Eine Tabelle ist in der 1NF, wenn die Wertebereiche aller Attribute <strong>atomar</strong> sind — d.h. jede Information hat eine eigene Spalte, keine Zelle enthält mehrere Werte.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Verstoß</th><th>Lösung</th></tr>
                    <tr><td class="text-[var(--text-muted)]"><code>'Sabine Kellner'</code> in einer Zelle</td><td class="text-[var(--text-muted)]">Aufteilen in <code>vorname</code> und <code>name</code></td></tr>
                    <tr><td class="text-[var(--text-muted)]"><code>'Ahornweg 4'</code> in einer Zelle</td><td class="text-[var(--text-muted)]">Aufteilen in <code>strasse</code> und <code>hausnr</code></td></tr>
                    <tr><td class="text-[var(--text-muted)]"><code>'93047 Regensburg'</code> in einer Zelle</td><td class="text-[var(--text-muted)]">Aufteilen in <code>plz</code> und <code>ort</code></td></tr>
                    <tr><td class="text-[var(--text-muted)]">Mehrere Artikel in einer Zelle (Wiederholungsgruppe)</td><td class="text-[var(--text-muted)]">In eigene Zeilen oder eigene Tabelle auslagern</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Prüffrage:</strong> Enthält eine Zelle mehr als eine Information? Wenn ja → 1NF verletzt.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">A table is in 1NF if the value ranges of all attributes are <strong>atomic</strong> — i.e. each piece of information has its own column, no cell contains multiple values.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Violation</th><th>Fix</th></tr>
                    <tr><td class="text-[var(--text-muted)]"><code>'Sabine Kellner'</code> in one cell</td><td class="text-[var(--text-muted)]">Split into <code>first_name</code> and <code>last_name</code></td></tr>
                    <tr><td class="text-[var(--text-muted)]"><code>'Ahornweg 4'</code> in one cell</td><td class="text-[var(--text-muted)]">Split into <code>street</code> and <code>house_no</code></td></tr>
                    <tr><td class="text-[var(--text-muted)]"><code>'93047 Regensburg'</code> in one cell</td><td class="text-[var(--text-muted)]">Split into <code>zip</code> and <code>city</code></td></tr>
                    <tr><td class="text-[var(--text-muted)]">Multiple items in one cell (repeating group)</td><td class="text-[var(--text-muted)]">Split into separate rows or a separate table</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Check question:</strong> Does a cell contain more than one piece of information? If yes → 1NF violated.
                    </div>
                    `
                },

                {
                    id: 'subsection8_2nf',
                    titleDe: '2. Normalform (2NF)',
                    titleEn: 'Second Normal Form (2NF)',
                    htmlDe: `
                    <p class="text-xs mb-2">Die 2NF ist erfüllt, wenn die Tabelle in der 1NF ist <strong>und</strong> jedes Nicht-Schlüssel-Attribut vom <em>gesamten</em> Primärschlüssel voll funktional abhängig ist — nicht nur von einem Teil davon.</p>
                    <p class="text-xs mb-2">Diese Regel wird erst wichtig, wenn der Primärschlüssel aus <strong>mehreren Spalten</strong> besteht. Dann prüft man: Hängt ein Attribut nur von einem <em>Teil</em> des Schlüssels ab? Wenn ja, liegt eine <strong>partielle Abhängigkeit</strong> vor.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Beispiel:</strong> Tabelle <code>Rechnungsposition (rechnung_nr, artikel_nr, artikelname, anzahl)</code>. <code>artikelname</code> hängt nur von <code>artikel_nr</code> ab, nicht von <code>rechnung_nr</code> → 2NF verletzt.<br>
                        <strong>Lösung:</strong> <code>artikelname</code> in eine eigene Tabelle <code>Artikel</code> mit Primärschlüssel <code>artikel_nr</code> auslagern.
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Prüffrage:</strong> Besteht der Primärschlüssel aus mehreren Spalten? Wenn nein → 2NF automatisch erfüllt. Wenn ja → hängt jedes Attribut vom <em>gesamten</em> Schlüssel ab?
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">2NF is met when the table is in 1NF <strong>and</strong> every non-key attribute fully depends on the <em>entire</em> primary key — not just part of it.</p>
                    <p class="text-xs mb-2">This rule only becomes relevant when the primary key consists of <strong>multiple columns</strong>. Then you check: does an attribute depend on only <em>part</em> of the key? If yes, you have a <strong>partial dependency</strong>.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Example:</strong> table <code>InvoiceLine (invoice_nr, item_nr, item_name, qty)</code>. <code>item_name</code> depends only on <code>item_nr</code>, not on <code>invoice_nr</code> → 2NF violated.<br>
                        <strong>Fix:</strong> move <code>item_name</code> into a separate table <code>Item</code> with primary key <code>item_nr</code>.
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Check question:</strong> Does the primary key span several columns? If no → 2NF is automatically satisfied. If yes → does every attribute depend on the <em>entire</em> key?
                    </div>
                    `
                },

                {
                    id: 'subsection8_3nf',
                    titleDe: '3. Normalform (3NF)',
                    titleEn: 'Third Normal Form (3NF)',
                    htmlDe: `
                    <p class="text-xs mb-2">Die 3NF ist erfüllt, wenn die Tabelle in der 2NF ist <strong>und</strong> kein Nicht-Schlüssel-Attribut transitiv von einem anderen Nicht-Schlüssel-Attribut abhängt.</p>
                    <p class="text-xs mb-2"><strong>Transitiv</strong> heißt: Attribut B hängt nicht direkt vom Primärschlüssel ab, sondern über ein anderes Nicht-Schlüssel-Attribut A. Kette: <code>Primärschlüssel → A → B</code>.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Beispiel:</strong> Tabelle <code>Kunde (k_nr, name, plz, ort)</code>. <code>ort</code> hängt nicht von <code>k_nr</code> ab, sondern von <code>plz</code> — Kette: <code>k_nr → plz → ort</code> → 3NF verletzt.<br>
                        <strong>Lösung:</strong> Eigene Tabelle <code>Postleitzahl (plz, ort)</code> mit Primärschlüssel <code>plz</code>. In <code>Kunde</code> bleibt <code>plz</code> als Fremdschlüssel.
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Prüffrage:</strong> Folgt aus einem Nicht-Schlüssel-Attribut A ein weiteres Nicht-Schlüssel-Attribut B? Wenn ja → 3NF verletzt.
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Praxis:</strong> Die 3NF ist in der Praxis das übliche Ziel. Sie vermeidet Anomalien und Redundanzen zuverlässig und behält genug Performance für SQL-Abfragen. Höhere Normalformen (4NF, 5NF) bleiben Sonderfällen vorbehalten.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">3NF is met when the table is in 2NF <strong>and</strong> no non-key attribute transitively depends on another non-key attribute.</p>
                    <p class="text-xs mb-2"><strong>Transitive</strong> means: attribute B does not depend directly on the primary key, but via another non-key attribute A. Chain: <code>primary key → A → B</code>.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Example:</strong> table <code>Customer (customer_id, name, zip, city)</code>. <code>city</code> doesn't depend on <code>customer_id</code> but on <code>zip</code> — chain: <code>customer_id → zip → city</code> → 3NF violated.<br>
                        <strong>Fix:</strong> separate table <code>PostalCode (zip, city)</code> with primary key <code>zip</code>. In <code>Customer</code>, <code>zip</code> remains as a foreign key.
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Check question:</strong> Does a non-key attribute A imply another non-key attribute B? If yes → 3NF violated.
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">In practice:</strong> 3NF is the usual target. It reliably avoids anomalies and redundancy and keeps enough performance for SQL queries. Higher normal forms (4NF, 5NF) remain special cases.
                    </div>
                    `
                },

                {
                    id: 'subsection8_denorm',
                    titleDe: 'Denormalisierung',
                    titleEn: 'Denormalization',
                    htmlDe: `
                    <div class="bg-[rgba(245,158,11,0.10)] border-l-4 border-[#f59e0b] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Denormalisierung</div>
                        <p class="text-[var(--text-muted)] m-0">Die bewusste <strong>Rücknahme</strong> der Normalisierung, um Leseperformance zu verbessern — meist im Data-Warehouse-Umfeld (OLAP), wo Abfragen dominieren und Schreibvorgänge selten sind. Redundanz wird dort in Kauf genommen, um teure JOINs zu vermeiden.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Denormalisierung ist also kein Fehler, sondern eine bewusste Entscheidung — vorausgesetzt, die Konsequenzen (Redundanz, Anomaliegefahr) sind bekannt und kontrolliert.</p>
                    `,
                    htmlEn: `
                    <div class="bg-[rgba(245,158,11,0.10)] border-l-4 border-[#f59e0b] p-3 rounded-r-lg text-xs">
                        <div class="font-bold text-[var(--heading-color)] mb-1">Denormalization</div>
                        <p class="text-[var(--text-muted)] m-0">The deliberate <strong>reversal</strong> of normalization to improve read performance — mostly in data warehouse contexts (OLAP), where queries dominate and writes are rare. Redundancy is accepted there to avoid expensive JOINs.</p>
                    </div>
                    <p class="text-xs mt-3 text-[var(--text-muted)]">Denormalization is thus not a mistake but a deliberate decision — provided the consequences (redundancy, anomaly risk) are known and controlled.</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 9 — SQL COMMAND REFERENCE
           ============================================================ */
        {
            id: 'section9',
            titleDe: 'SQL-Befehlsreferenz',
            titleEn: 'SQL Command Reference',
            introDe: 'Alle wichtigen SQL-Befehle an einem Ort — gruppiert nach Kategorien (DDL, DML, DQL, DCL, TCL).',
            introEn: 'Every important SQL command in one place — grouped by category (DDL, DML, DQL, DCL, TCL).',
            subtopics: [

                {
                    id: 'subsection9_ddl',
                    titleDe: 'DDL — Data Definition Language',
                    titleEn: 'DDL — Data Definition Language',
                    htmlDe: `
                    <p class="text-xs mb-2">DDL beschreibt die <strong>Struktur</strong>: Datenbanken, Tabellen, Spalten, Indexe, Views. Die Datenbank führt DDL-Änderungen sofort und dauerhaft aus.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Befehl</th><th>Zweck</th></tr>
                    <tr><td><code>CREATE DATABASE name;</code></td><td class="text-[var(--text-muted)]">Datenbank anlegen</td></tr>
                    <tr><td><code>DROP DATABASE name;</code></td><td class="text-[var(--text-muted)]">Datenbank löschen</td></tr>
                    <tr><td><code>USE name;</code></td><td class="text-[var(--text-muted)]">Datenbank auswählen</td></tr>
                    <tr><td><code>CREATE TABLE name (...);</code></td><td class="text-[var(--text-muted)]">Tabelle anlegen</td></tr>
                    <tr><td><code>ALTER TABLE ... ADD/MODIFY/DROP;</code></td><td class="text-[var(--text-muted)]">Tabelle ändern</td></tr>
                    <tr><td><code>DROP TABLE name;</code></td><td class="text-[var(--text-muted)]">Tabelle löschen (Struktur + Daten)</td></tr>
                    <tr><td><code>TRUNCATE TABLE name;</code></td><td class="text-[var(--text-muted)]">Tabelle leeren (nur Daten)</td></tr>
                    <tr><td><code>CREATE INDEX idx ON t(c);</code></td><td class="text-[var(--text-muted)]">Index anlegen</td></tr>
                    <tr><td><code>DROP INDEX idx;</code></td><td class="text-[var(--text-muted)]">Index löschen</td></tr>
                    <tr><td><code>CREATE VIEW name AS SELECT ...;</code></td><td class="text-[var(--text-muted)]">View anlegen</td></tr>
                    <tr><td><code>DROP VIEW name;</code></td><td class="text-[var(--text-muted)]">View löschen</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">DDL describes the <strong>structure</strong>: databases, tables, columns, indexes, views. The database applies DDL changes immediately and permanently.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Command</th><th>Purpose</th></tr>
                    <tr><td><code>CREATE DATABASE name;</code></td><td class="text-[var(--text-muted)]">Create a database</td></tr>
                    <tr><td><code>DROP DATABASE name;</code></td><td class="text-[var(--text-muted)]">Drop a database</td></tr>
                    <tr><td><code>USE name;</code></td><td class="text-[var(--text-muted)]">Select a database</td></tr>
                    <tr><td><code>CREATE TABLE name (...);</code></td><td class="text-[var(--text-muted)]">Create a table</td></tr>
                    <tr><td><code>ALTER TABLE ... ADD/MODIFY/DROP;</code></td><td class="text-[var(--text-muted)]">Modify a table</td></tr>
                    <tr><td><code>DROP TABLE name;</code></td><td class="text-[var(--text-muted)]">Drop a table (structure + data)</td></tr>
                    <tr><td><code>TRUNCATE TABLE name;</code></td><td class="text-[var(--text-muted)]">Empty a table (data only)</td></tr>
                    <tr><td><code>CREATE INDEX idx ON t(c);</code></td><td class="text-[var(--text-muted)]">Create an index</td></tr>
                    <tr><td><code>DROP INDEX idx;</code></td><td class="text-[var(--text-muted)]">Drop an index</td></tr>
                    <tr><td><code>CREATE VIEW name AS SELECT ...;</code></td><td class="text-[var(--text-muted)]">Create a view</td></tr>
                    <tr><td><code>DROP VIEW name;</code></td><td class="text-[var(--text-muted)]">Drop a view</td></tr>
                    </table>
                    </div>
                    `
                },

                {
                    id: 'subsection9_dml',
                    titleDe: 'DML — Data Manipulation Language',
                    titleEn: 'DML — Data Manipulation Language',
                    htmlDe: `
                    <p class="text-xs mb-2">DML verändert die <strong>Daten</strong> selbst. Alle DML-Befehle laufen innerhalb einer Transaktion und können mit <code>ROLLBACK</code> zurückgenommen werden.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Befehl</th><th>Zweck</th></tr>
                    <tr><td><code>INSERT INTO t (c1, c2) VALUES (v1, v2);</code></td><td class="text-[var(--text-muted)]">Eine Zeile einfügen</td></tr>
                    <tr><td><code>INSERT INTO t (c1, c2) VALUES (v1, v2), (v3, v4);</code></td><td class="text-[var(--text-muted)]">Mehrere Zeilen auf einmal</td></tr>
                    <tr><td><code>INSERT INTO t (c1) SELECT c1 FROM other;</code></td><td class="text-[var(--text-muted)]">Aus anderer Tabelle einfügen</td></tr>
                    <tr><td><code>UPDATE t SET c = v WHERE bedingung;</code></td><td class="text-[var(--text-muted)]">Zeilen ändern</td></tr>
                    <tr><td><code>DELETE FROM t WHERE bedingung;</code></td><td class="text-[var(--text-muted)]">Zeilen löschen</td></tr>
                    <tr><td><code>DELETE FROM t;</code></td><td class="text-[var(--text-muted)]">Alle Zeilen löschen (Vorsicht)</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Warnung:</strong> <code>UPDATE</code> und <code>DELETE</code> ohne <code>WHERE</code> treffen <em>jede</em> Zeile der Tabelle. Immer erst mit einem <code>SELECT</code> mit demselben Filter prüfen.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">DML modifies the <strong>data</strong> itself. All DML commands run inside a transaction and can be undone with <code>ROLLBACK</code>.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Command</th><th>Purpose</th></tr>
                    <tr><td><code>INSERT INTO t (c1, c2) VALUES (v1, v2);</code></td><td class="text-[var(--text-muted)]">Insert one row</td></tr>
                    <tr><td><code>INSERT INTO t (c1, c2) VALUES (v1, v2), (v3, v4);</code></td><td class="text-[var(--text-muted)]">Insert multiple rows at once</td></tr>
                    <tr><td><code>INSERT INTO t (c1) SELECT c1 FROM other;</code></td><td class="text-[var(--text-muted)]">Insert from another table</td></tr>
                    <tr><td><code>UPDATE t SET c = v WHERE condition;</code></td><td class="text-[var(--text-muted)]">Update rows</td></tr>
                    <tr><td><code>DELETE FROM t WHERE condition;</code></td><td class="text-[var(--text-muted)]">Delete rows</td></tr>
                    <tr><td><code>DELETE FROM t;</code></td><td class="text-[var(--text-muted)]">Delete all rows (caution)</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Warning:</strong> <code>UPDATE</code> and <code>DELETE</code> without <code>WHERE</code> hit <em>every</em> row of the table. Always check first with a <code>SELECT</code> using the same filter.
                    </div>
                    `
                },

                {
                    id: 'subsection9_dql',
                    titleDe: 'DQL — Data Query Language',
                    titleEn: 'DQL — Data Query Language',
                    htmlDe: `
                    <p class="text-xs mb-2">DQL liest Daten. In der Praxis ist das fast immer <code>SELECT</code> mit seinen Klauseln und Funktionen.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Baustein</th><th>Zweck</th></tr>
                    <tr><td><code>SELECT spalten FROM tabelle;</code></td><td class="text-[var(--text-muted)]">Spalten auswählen</td></tr>
                    <tr><td><code>SELECT DISTINCT spalte FROM t;</code></td><td class="text-[var(--text-muted)]">Duplikate entfernen</td></tr>
                    <tr><td><code>SELECT c AS alias FROM t;</code></td><td class="text-[var(--text-muted)]">Spalten umbenennen</td></tr>
                    <tr><td><code>WHERE bedingung</code></td><td class="text-[var(--text-muted)]">Zeilen filtern</td></tr>
                    <tr><td><code>GROUP BY spalten</code></td><td class="text-[var(--text-muted)]">Gruppieren</td></tr>
                    <tr><td><code>HAVING bedingung</code></td><td class="text-[var(--text-muted)]">Gruppen filtern</td></tr>
                    <tr><td><code>ORDER BY spalte ASC|DESC</code></td><td class="text-[var(--text-muted)]">Sortieren</td></tr>
                    <tr><td><code>LIMIT n OFFSET m</code></td><td class="text-[var(--text-muted)]">Begrenzen und überspringen</td></tr>
                    <tr><td><code>COUNT / SUM / AVG / MIN / MAX</code></td><td class="text-[var(--text-muted)]">Aggregatfunktionen</td></tr>
                    <tr><td><code>INNER / LEFT / RIGHT / FULL JOIN</code></td><td class="text-[var(--text-muted)]">Tabellen verknüpfen</td></tr>
                    <tr><td><code>IN / NOT IN / EXISTS</code></td><td class="text-[var(--text-muted)]">Unterabfragen</td></tr>
                    <tr><td><code>UNION / UNION ALL / INTERSECT / EXCEPT</code></td><td class="text-[var(--text-muted)]">Mengenoperationen</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">DQL reads data. In practice it's almost always <code>SELECT</code> with its clauses and functions.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Building block</th><th>Purpose</th></tr>
                    <tr><td><code>SELECT columns FROM table;</code></td><td class="text-[var(--text-muted)]">Choose columns</td></tr>
                    <tr><td><code>SELECT DISTINCT column FROM t;</code></td><td class="text-[var(--text-muted)]">Remove duplicates</td></tr>
                    <tr><td><code>SELECT c AS alias FROM t;</code></td><td class="text-[var(--text-muted)]">Rename columns</td></tr>
                    <tr><td><code>WHERE condition</code></td><td class="text-[var(--text-muted)]">Filter rows</td></tr>
                    <tr><td><code>GROUP BY columns</code></td><td class="text-[var(--text-muted)]">Group</td></tr>
                    <tr><td><code>HAVING condition</code></td><td class="text-[var(--text-muted)]">Filter groups</td></tr>
                    <tr><td><code>ORDER BY column ASC|DESC</code></td><td class="text-[var(--text-muted)]">Sort</td></tr>
                    <tr><td><code>LIMIT n OFFSET m</code></td><td class="text-[var(--text-muted)]">Limit and skip</td></tr>
                    <tr><td><code>COUNT / SUM / AVG / MIN / MAX</code></td><td class="text-[var(--text-muted)]">Aggregate functions</td></tr>
                    <tr><td><code>INNER / LEFT / RIGHT / FULL JOIN</code></td><td class="text-[var(--text-muted)]">Combine tables</td></tr>
                    <tr><td><code>IN / NOT IN / EXISTS</code></td><td class="text-[var(--text-muted)]">Subqueries</td></tr>
                    <tr><td><code>UNION / UNION ALL / INTERSECT / EXCEPT</code></td><td class="text-[var(--text-muted)]">Set operations</td></tr>
                    </table>
                    </div>
                    `
                },

                {
                    id: 'subsection9_dcl',
                    titleDe: 'DCL — Data Control Language',
                    titleEn: 'DCL — Data Control Language',
                    htmlDe: `
                    <p class="text-xs mb-2">DCL steuert <strong>Berechtigungen</strong>: Wer darf welche Tabellen lesen, schreiben oder löschen. Least-Privilege-Prinzip: jeder Nutzer nur die nötigen Rechte.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Befehl</th><th>Zweck</th></tr>
                    <tr><td><code>GRANT SELECT ON t TO user;</code></td><td class="text-[var(--text-muted)]">Leserecht erteilen</td></tr>
                    <tr><td><code>GRANT INSERT, UPDATE ON t TO user;</code></td><td class="text-[var(--text-muted)]">Schreibrechte erteilen</td></tr>
                    <tr><td><code>GRANT ALL PRIVILEGES ON t TO user;</code></td><td class="text-[var(--text-muted)]">Alle Rechte erteilen</td></tr>
                    <tr><td><code>REVOKE INSERT ON t FROM user;</code></td><td class="text-[var(--text-muted)]">Recht entziehen</td></tr>
                    <tr><td><code>CREATE ROLE reporting;</code></td><td class="text-[var(--text-muted)]">Rolle anlegen</td></tr>
                    <tr><td><code>GRANT reporting TO alice;</code></td><td class="text-[var(--text-muted)]">Rolle zuweisen</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">DCL controls <strong>permissions</strong>: who may read, write, or delete which tables. Least-privilege principle: each user only gets the necessary rights.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Command</th><th>Purpose</th></tr>
                    <tr><td><code>GRANT SELECT ON t TO user;</code></td><td class="text-[var(--text-muted)]">Grant read access</td></tr>
                    <tr><td><code>GRANT INSERT, UPDATE ON t TO user;</code></td><td class="text-[var(--text-muted)]">Grant write access</td></tr>
                    <tr><td><code>GRANT ALL PRIVILEGES ON t TO user;</code></td><td class="text-[var(--text-muted)]">Grant all rights</td></tr>
                    <tr><td><code>REVOKE INSERT ON t FROM user;</code></td><td class="text-[var(--text-muted)]">Revoke a right</td></tr>
                    <tr><td><code>CREATE ROLE reporting;</code></td><td class="text-[var(--text-muted)]">Create a role</td></tr>
                    <tr><td><code>GRANT reporting TO alice;</code></td><td class="text-[var(--text-muted)]">Assign a role</td></tr>
                    </table>
                    </div>
                    `
                },

                {
                    id: 'subsection9_tcl',
                    titleDe: 'TCL — Transaction Control Language',
                    titleEn: 'TCL — Transaction Control Language',
                    htmlDe: `
                    <p class="text-xs mb-2">TCL steuert <strong>Transaktionen</strong>: mehrere Befehle als eine untrennbare Einheit ausführen oder verwerfen.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Befehl</th><th>Zweck</th></tr>
                    <tr><td><code>BEGIN;</code> / <code>START TRANSACTION;</code></td><td class="text-[var(--text-muted)]">Transaktion starten</td></tr>
                    <tr><td><code>COMMIT;</code></td><td class="text-[var(--text-muted)]">Alle Änderungen dauerhaft übernehmen</td></tr>
                    <tr><td><code>ROLLBACK;</code></td><td class="text-[var(--text-muted)]">Alle Änderungen seit <code>BEGIN</code> verwerfen</td></tr>
                    <tr><td><code>SAVEPOINT sp1;</code></td><td class="text-[var(--text-muted)]">Zwischenmarke setzen</td></tr>
                    <tr><td><code>ROLLBACK TO sp1;</code></td><td class="text-[var(--text-muted)]">Zur Zwischenmarke zurückrollen</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">TCL controls <strong>transactions</strong>: run several statements as one indivisible unit, or discard them.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Command</th><th>Purpose</th></tr>
                    <tr><td><code>BEGIN;</code> / <code>START TRANSACTION;</code></td><td class="text-[var(--text-muted)]">Start a transaction</td></tr>
                    <tr><td><code>COMMIT;</code></td><td class="text-[var(--text-muted)]">Make all changes permanent</td></tr>
                    <tr><td><code>ROLLBACK;</code></td><td class="text-[var(--text-muted)]">Discard all changes since <code>BEGIN</code></td></tr>
                    <tr><td><code>SAVEPOINT sp1;</code></td><td class="text-[var(--text-muted)]">Set an intermediate marker</td></tr>
                    <tr><td><code>ROLLBACK TO sp1;</code></td><td class="text-[var(--text-muted)]">Roll back to the marker</td></tr>
                    </table>
                    </div>
                    `
                },

                {
                    id: 'subsection9_funcs',
                    titleDe: 'Funktionen & Operatoren',
                    titleEn: 'Functions & Operators',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Kategorie</th><th>Funktionen / Operatoren</th></tr>
                    <tr><td><strong>String</strong></td><td><code>UPPER</code>, <code>LOWER</code>, <code>LENGTH</code>, <code>TRIM</code>, <code>CONCAT</code>, <code>SUBSTRING</code>, <code>REPLACE</code>, <code>LEFT</code>, <code>RIGHT</code></td></tr>
                    <tr><td><strong>Numerisch</strong></td><td><code>ROUND</code>, <code>CEIL</code>, <code>FLOOR</code>, <code>ABS</code>, <code>MOD</code>, <code>POWER</code>, <code>SQRT</code></td></tr>
                    <tr><td><strong>Datum &amp; Zeit</strong></td><td><code>NOW</code>, <code>CURDATE</code>, <code>YEAR</code>, <code>MONTH</code>, <code>DAY</code>, <code>DATEDIFF</code>, <code>DATE_ADD</code></td></tr>
                    <tr><td><strong>NULL &amp; Cast</strong></td><td><code>COALESCE</code>, <code>NULLIF</code>, <code>ISNULL</code>, <code>CAST</code>, <code>CONVERT</code></td></tr>
                    <tr><td><strong>Bedingt</strong></td><td><code>CASE WHEN ... THEN ... ELSE ... END</code></td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Category</th><th>Functions / operators</th></tr>
                    <tr><td><strong>String</strong></td><td><code>UPPER</code>, <code>LOWER</code>, <code>LENGTH</code>, <code>TRIM</code>, <code>CONCAT</code>, <code>SUBSTRING</code>, <code>REPLACE</code>, <code>LEFT</code>, <code>RIGHT</code></td></tr>
                    <tr><td><strong>Numeric</strong></td><td><code>ROUND</code>, <code>CEIL</code>, <code>FLOOR</code>, <code>ABS</code>, <code>MOD</code>, <code>POWER</code>, <code>SQRT</code></td></tr>
                    <tr><td><strong>Date &amp; time</strong></td><td><code>NOW</code>, <code>CURDATE</code>, <code>YEAR</code>, <code>MONTH</code>, <code>DAY</code>, <code>DATEDIFF</code>, <code>DATE_ADD</code></td></tr>
                    <tr><td><strong>NULL &amp; cast</strong></td><td><code>COALESCE</code>, <code>NULLIF</code>, <code>ISNULL</code>, <code>CAST</code>, <code>CONVERT</code></td></tr>
                    <tr><td><strong>Conditional</strong></td><td><code>CASE WHEN ... THEN ... ELSE ... END</code></td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 10 — VISUALIZATIONS
           ============================================================ */
        {
            id: 'section10',
            titleDe: 'Visualisierungen',
            titleEn: 'Visualizations',
            introDe: 'Kurze CSS-Animationen, die die Kernkonzepte von SQL greifbar machen: Schlüssel, Ausführungsreihenfolge, Join-Typen und ACID.',
            introEn: 'Short CSS animations that make the core concepts of SQL tangible: keys, execution order, join types, and ACID.',
            subtopics: [

                                {
                    id: 'subsection10_keys',
                    titleDe: 'SQL-Schlüssel',
                    titleEn: 'SQL Keys',
                    htmlDe: `
                    <p class="text-xs mb-2">Datenbanken extrem einfach erklärt! Jeder Schlüssel hat eine feste Rolle. Folge der Geschichte von Tom und seinem Hund.</p>
                    <div class="pm-keys-story" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;max-width:680px;margin:0 auto;">
                        <style>
                            .pm-keys-story .card { background:var(--panel-color); border:2px solid var(--border-color); border-radius:0.75rem; padding:1rem; position:relative; overflow:hidden; transition:transform 0.3s, border-color 0.3s; display:flex; flex-direction:column; }
                            .pm-keys-story .card:hover { transform:translateY(-3px); }
                            .pm-keys-story .card.step1:hover { border-color:#ef4444; box-shadow:0 8px 24px -8px rgba(239,68,68,0.4); }
                            .pm-keys-story .card.step2:hover { border-color:#f59e0b; box-shadow:0 8px 24px -8px rgba(245,158,11,0.4); }
                            .pm-keys-story .card.step3:hover { border-color:#3b82f6; box-shadow:0 8px 24px -8px rgba(59,130,246,0.4); }
                            .pm-keys-story .card.step4:hover { border-color:#10b981; box-shadow:0 8px 24px -8px rgba(16,185,129,0.4); }
                            .pm-keys-story .head { display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; font-weight:800; color:var(--heading-color); margin-bottom:0.5rem; }
                            .pm-keys-story .desc { font-size:0.72rem; color:var(--text-muted); margin-bottom:0.75rem; line-height:1.4; flex-grow:1; }
                            .pm-keys-story table { width:100%; border-collapse:collapse; font-size:0.72rem; background:var(--bg-color); border-radius:0.5rem; overflow:hidden; }
                            .pm-keys-story th, .pm-keys-story td { padding:0.35rem 0.5rem; border:1px solid var(--panel-border); text-align:left; }
                            .pm-keys-story th { background:rgba(255,255,255,0.03); color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; font-size:0.6rem; }
                            .pm-keys-story .err { background:rgba(239,68,68,0.15); color:#fca5a5; animation:pm-shake 2s infinite; }
                            .pm-keys-story .pk { background:rgba(245,158,11,0.15); color:#fcd34d; font-weight:700; }
                            .pm-keys-story .ck { background:rgba(59,130,246,0.15); color:#93c5fd; }
                            .pm-keys-story .fk { background:rgba(16,185,129,0.15); color:#6ee7b7; font-weight:700; }
                            .pm-keys-story .badge { display:inline-block; padding:2px 6px; border-radius:4px; font-size:0.5rem; font-weight:900; text-transform:uppercase; margin-left:4px; }
                            .pm-keys-story .badge.pk { background:#f59e0b; color:#000; }
                            .pm-keys-story .badge.ck { background:#3b82f6; color:#fff; }
                            .pm-keys-story .badge.fk { background:#10b981; color:#000; }
                            @keyframes pm-shake { 0%,100% { transform:translateX(0); } 10%,30%,50%,70%,90% { transform:translateX(-2px); } 20%,40%,60%,80% { transform:translateX(2px); } }
                            .pm-keys-story .split-tables { display:flex; gap:0.35rem; align-items:center; }
                            @media (max-width: 480px) { .pm-keys-story { grid-template-columns:1fr !important; } .pm-keys-story .split-tables { flex-direction:column; } .pm-keys-story .split-tables .link-arrow { transform:rotate(90deg); } }
                        </style>

                        <!-- Step 1 -->
                        <div class="card step1">
                            <div class="head">🤷‍♂️ 1. Das Chaos (Duplikate)</div>
                            <div class="desc">Zwei Freunde heißen "Tom" und beide mögen Pizza. Wie weiß der Computer, wen wir meinen? Sie sehen für ihn exakt gleich aus!</div>
                            <table>
                                <tr><th>Name</th><th>Essen</th></tr>
                                <tr><td>Tom</td><td>Pizza 🍕</td></tr>
                                <tr class="err"><td>Tom</td><td>Pizza 🍕</td></tr>
                            </table>
                        </div>

                        <!-- Step 2 -->
                        <div class="card step2">
                            <div class="head">👑 2. Der Boss (Primary Key)</div>
                            <div class="desc">Wir verteilen eine einzigartige Nummer an jeden. Diese Nummer ist der "Primärschlüssel". Jede Nummer darf es in der Liste nur ein einziges Mal geben!</div>
                            <table>
                                <tr><th>ID <span class="badge pk">PK 👑</span></th><th>Name</th><th>Essen</th></tr>
                                <tr><td class="pk">1</td><td>Tom</td><td>Pizza 🍕</td></tr>
                                <tr><td class="pk">2</td><td>Tom</td><td>Pizza 🍕</td></tr>
                            </table>
                        </div>

                        <!-- Step 3 -->
                        <div class="card step3">
                            <div class="head">🔵 3. Der Ersatz-Boss (Candidate Key)</div>
                            <div class="desc">Toms E-Mail-Adresse ist auch einzigartig. Sie wäre ein super "Kandidat" für den Boss-Posten, aber der Datenbank-Bauer hat sich für die ID-Nummer entschieden.</div>
                            <table>
                                <tr><th>ID <span class="badge pk">PK</span></th><th>E-Mail <span class="badge ck">CK 🔵</span></th><th>Name</th></tr>
                                <tr><td class="pk">1</td><td class="ck">tom1@mail.de</td><td>Tom</td></tr>
                                <tr><td class="pk">2</td><td class="ck">tom2@mail.de</td><td>Tom</td></tr>
                            </table>
                        </div>

                        <!-- Step 4 -->
                        <div class="card step4">
                            <div class="head">🔗 4. Der Wegweiser (Foreign Key)</div>
                            <div class="desc">Tom (ID 1) kauft einen Hund! In der getrennten Hunde-Tabelle kleben wir einen grünen Pfeil (Fremdschlüssel) an den Hund, der genau auf Toms ID-Nummer zurückzeigt.</div>
                            <div class="split-tables">
                                <table style="flex:1;">
                                    <tr><th colspan="2">👦 Menschen</th></tr>
                                    <tr><th>ID <span class="badge pk">PK</span></th><th>Name</th></tr>
                                    <tr><td class="pk">1</td><td>Tom</td></tr>
                                </table>
                                <div class="link-arrow" style="color:#10b981; font-weight:bold; font-size:1.1rem;">←</div>
                                <table style="flex:1.4;">
                                    <tr><th colspan="2">🐶 Hunde</th></tr>
                                    <tr><th>Hund</th><th>Besitzer-ID <span class="badge fk">FK</span></th></tr>
                                    <tr><td>Bello 🐕</td><td class="fk">1</td></tr>
                                </table>
                            </div>
                        </div>

                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Databases explained for kids! Every key has a fixed role. Follow the story of Tom and his dog.</p>
                    <div class="pm-keys-story" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;max-width:680px;margin:0 auto;">
                        <style>
                            .pm-keys-story .card { background:var(--panel-color); border:2px solid var(--border-color); border-radius:0.75rem; padding:1rem; position:relative; overflow:hidden; transition:transform 0.3s, border-color 0.3s; display:flex; flex-direction:column; }
                            .pm-keys-story .card:hover { transform:translateY(-3px); }
                            .pm-keys-story .card.step1:hover { border-color:#ef4444; box-shadow:0 8px 24px -8px rgba(239,68,68,0.4); }
                            .pm-keys-story .card.step2:hover { border-color:#f59e0b; box-shadow:0 8px 24px -8px rgba(245,158,11,0.4); }
                            .pm-keys-story .card.step3:hover { border-color:#3b82f6; box-shadow:0 8px 24px -8px rgba(59,130,246,0.4); }
                            .pm-keys-story .card.step4:hover { border-color:#10b981; box-shadow:0 8px 24px -8px rgba(16,185,129,0.4); }
                            .pm-keys-story .head { display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; font-weight:800; color:var(--heading-color); margin-bottom:0.5rem; }
                            .pm-keys-story .desc { font-size:0.72rem; color:var(--text-muted); margin-bottom:0.75rem; line-height:1.4; flex-grow:1; }
                            .pm-keys-story table { width:100%; border-collapse:collapse; font-size:0.72rem; background:var(--bg-color); border-radius:0.5rem; overflow:hidden; }
                            .pm-keys-story th, .pm-keys-story td { padding:0.35rem 0.5rem; border:1px solid var(--panel-border); text-align:left; }
                            .pm-keys-story th { background:rgba(255,255,255,0.03); color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; font-size:0.6rem; }
                            .pm-keys-story .err { background:rgba(239,68,68,0.15); color:#fca5a5; animation:pm-shake 2s infinite; }
                            .pm-keys-story .pk { background:rgba(245,158,11,0.15); color:#fcd34d; font-weight:700; }
                            .pm-keys-story .ck { background:rgba(59,130,246,0.15); color:#93c5fd; }
                            .pm-keys-story .fk { background:rgba(16,185,129,0.15); color:#6ee7b7; font-weight:700; }
                            .pm-keys-story .badge { display:inline-block; padding:2px 6px; border-radius:4px; font-size:0.5rem; font-weight:900; text-transform:uppercase; margin-left:4px; }
                            .pm-keys-story .badge.pk { background:#f59e0b; color:#000; }
                            .pm-keys-story .badge.ck { background:#3b82f6; color:#fff; }
                            .pm-keys-story .badge.fk { background:#10b981; color:#000; }
                            @keyframes pm-shake { 0%,100% { transform:translateX(0); } 10%,30%,50%,70%,90% { transform:translateX(-2px); } 20%,40%,60%,80% { transform:translateX(2px); } }
                            .pm-keys-story .split-tables { display:flex; gap:0.35rem; align-items:center; }
                            @media (max-width: 480px) { .pm-keys-story { grid-template-columns:1fr !important; } .pm-keys-story .split-tables { flex-direction:column; } .pm-keys-story .split-tables .link-arrow { transform:rotate(90deg); } }
                        </style>

                        <!-- Step 1 -->
                        <div class="card step1">
                            <div class="head">🤷‍♂️ 1. The Chaos (Duplicates)</div>
                            <div class="desc">Two friends are named "Tom" and both love pizza. How does the computer know who we mean? They look exactly the same to it!</div>
                            <table>
                                <tr><th>Name</th><th>Food</th></tr>
                                <tr><td>Tom</td><td>Pizza 🍕</td></tr>
                                <tr class="err"><td>Tom</td><td>Pizza 🍕</td></tr>
                            </table>
                        </div>

                        <!-- Step 2 -->
                        <div class="card step2">
                            <div class="head">👑 2. The Boss (Primary Key)</div>
                            <div class="desc">We hand out a unique ID number to everyone. This number is the "Primary Key". Every number can only exist once in the list!</div>
                            <table>
                                <tr><th>ID <span class="badge pk">PK 👑</span></th><th>Name</th><th>Food</th></tr>
                                <tr><td class="pk">1</td><td>Tom</td><td>Pizza 🍕</td></tr>
                                <tr><td class="pk">2</td><td>Tom</td><td>Pizza 🍕</td></tr>
                            </table>
                        </div>

                        <!-- Step 3 -->
                        <div class="card step3">
                            <div class="head">🔵 3. The Backup Boss (Candidate Key)</div>
                            <div class="desc">Tom's email address is also unique. It would be a great "Candidate" to be the boss, but the database builder chose the ID number instead.</div>
                            <table>
                                <tr><th>ID <span class="badge pk">PK</span></th><th>Email <span class="badge ck">CK 🔵</span></th><th>Name</th></tr>
                                <tr><td class="pk">1</td><td class="ck">tom1@mail.com</td><td>Tom</td></tr>
                                <tr><td class="pk">2</td><td class="ck">tom2@mail.com</td><td>Tom</td></tr>
                            </table>
                        </div>

                        <!-- Step 4 -->
                        <div class="card step4">
                            <div class="head">🔗 4. The Signpost (Foreign Key)</div>
                            <div class="desc">Tom (ID 1) buys a dog! In the separate dog list, we stick a green arrow (Foreign Key) onto the dog that points directly back to Tom's ID number.</div>
                            <div class="split-tables">
                                <table style="flex:1;">
                                    <tr><th colspan="2">👦 Humans</th></tr>
                                    <tr><th>ID <span class="badge pk">PK</span></th><th>Name</th></tr>
                                    <tr><td class="pk">1</td><td>Tom</td></tr>
                                </table>
                                <div class="link-arrow" style="color:#10b981; font-weight:bold; font-size:1.1rem;">←</div>
                                <table style="flex:1.4;">
                                    <tr><th colspan="2">🐶 Dogs</th></tr>
                                    <tr><th>Dog</th><th>Owner-ID <span class="badge fk">FK</span></th></tr>
                                    <tr><td>Buster 🐕</td><td class="fk">1</td></tr>
                                </table>
                            </div>
                        </div>

                    </div>
                    `
                },

                {
                    id: 'subsection10_1',
                    titleDe: 'Ausführungsreihenfolge',
                    titleEn: 'Execution Order',
                    htmlDe: `
                    <p class="text-xs mb-2">Die Datenbank liest eine Abfrage nicht so, wie man sie schreibt. Sie arbeitet die Klauseln in einer festen Reihenfolge ab — von <code>FROM</code> bis <code>LIMIT</code>.</p>
                    <div class="pm-exec-stage" style="max-width:520px;margin:0 auto;padding:1rem 0.75rem;display:flex;flex-direction:column;gap:6px;">
                        <style>
                            .pm-exec-stage .step { display:flex; align-items:center; gap:0.75rem; padding:0.55rem 0.85rem; border-radius:0.5rem; background:var(--bg-color); border:1px solid var(--border-color); font-size:0.75rem; }
                            .pm-exec-stage .num { flex-shrink:0; width:1.5rem; height:1.5rem; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-family:'Fira Code',monospace; font-size:0.65rem; font-weight:800; color:#fff; background:#64748b; }
                            .pm-exec-stage .code { font-family:'Fira Code',monospace; font-size:0.72rem; font-weight:700; color:var(--heading-color); min-width:5.5rem; }
                            .pm-exec-stage .desc { color:var(--text-muted); font-size:0.68rem; }
                            .pm-exec-stage .step:nth-child(1) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 0.0s; }
                            .pm-exec-stage .step:nth-child(2) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 1.0s; }
                            .pm-exec-stage .step:nth-child(3) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 2.0s; }
                            .pm-exec-stage .step:nth-child(4) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 3.0s; }
                            .pm-exec-stage .step:nth-child(5) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 4.0s; }
                            .pm-exec-stage .step:nth-child(6) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 5.0s; }
                            .pm-exec-stage .step:nth-child(7) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 6.0s; }
                            @keyframes pm-exec-step { 0%,100% { background:var(--bg-color); border-color:var(--border-color); box-shadow:none; transform:translateX(0); } 4%,10% { background:var(--code-bg); border-color:var(--link-color); box-shadow:0 0 18px -6px var(--link-color); transform:translateX(6px); } 14% { background:var(--bg-color); border-color:var(--border-color); box-shadow:none; transform:translateX(0); } }
                        </style>
                        <div class="step"><span class="num">1</span><span class="code">FROM / JOIN</span><span class="desc" data-lang-de>Tabellen laden und verknüpfen</span><span class="desc" data-lang-en style="display:none;">Load and join tables</span></div>
                        <div class="step"><span class="num">2</span><span class="code">WHERE</span><span class="desc" data-lang-de>Zeilen filtern</span><span class="desc" data-lang-en style="display:none;">Filter rows</span></div>
                        <div class="step"><span class="num">3</span><span class="code">GROUP BY</span><span class="desc" data-lang-de>Zeilen gruppieren</span><span class="desc" data-lang-en style="display:none;">Group rows</span></div>
                        <div class="step"><span class="num">4</span><span class="code">HAVING</span><span class="desc" data-lang-de>Gruppen filtern</span><span class="desc" data-lang-en style="display:none;">Filter groups</span></div>
                        <div class="step"><span class="num">5</span><span class="code">SELECT</span><span class="desc" data-lang-de>Spalten auswählen und berechnen</span><span class="desc" data-lang-en style="display:none;">Select and compute columns</span></div>
                        <div class="step"><span class="num">6</span><span class="code">ORDER BY</span><span class="desc" data-lang-de>Ergebnis sortieren</span><span class="desc" data-lang-en style="display:none;">Sort result</span></div>
                        <div class="step"><span class="num">7</span><span class="code">LIMIT</span><span class="desc" data-lang-de>Ergebnis begrenzen</span><span class="desc" data-lang-en style="display:none;">Limit result</span></div>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The database doesn't read a query the way you write it. It processes the clauses in a fixed order — from <code>FROM</code> to <code>LIMIT</code>.</p>
                    <div class="pm-exec-stage" style="max-width:520px;margin:0 auto;padding:1rem 0.75rem;display:flex;flex-direction:column;gap:6px;">
                        <style>
                            .pm-exec-stage .step { display:flex; align-items:center; gap:0.75rem; padding:0.55rem 0.85rem; border-radius:0.5rem; background:var(--bg-color); border:1px solid var(--border-color); font-size:0.75rem; }
                            .pm-exec-stage .num { flex-shrink:0; width:1.5rem; height:1.5rem; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-family:'Fira Code',monospace; font-size:0.65rem; font-weight:800; color:#fff; background:#64748b; }
                            .pm-exec-stage .code { font-family:'Fira Code',monospace; font-size:0.72rem; font-weight:700; color:var(--heading-color); min-width:5.5rem; }
                            .pm-exec-stage .desc { color:var(--text-muted); font-size:0.68rem; }
                            .pm-exec-stage .step:nth-child(1) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 0.0s; }
                            .pm-exec-stage .step:nth-child(2) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 1.0s; }
                            .pm-exec-stage .step:nth-child(3) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 2.0s; }
                            .pm-exec-stage .step:nth-child(4) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 3.0s; }
                            .pm-exec-stage .step:nth-child(5) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 4.0s; }
                            .pm-exec-stage .step:nth-child(6) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 5.0s; }
                            .pm-exec-stage .step:nth-child(7) { animation: pm-exec-step 7s ease-in-out infinite; animation-delay: 6.0s; }
                            @keyframes pm-exec-step { 0%,100% { background:var(--bg-color); border-color:var(--border-color); box-shadow:none; transform:translateX(0); } 4%,10% { background:var(--code-bg); border-color:var(--link-color); box-shadow:0 0 18px -6px var(--link-color); transform:translateX(6px); } 14% { background:var(--bg-color); border-color:var(--border-color); box-shadow:none; transform:translateX(0); } }
                        </style>
                        <div class="step"><span class="num">1</span><span class="code">FROM / JOIN</span><span class="desc">Load and join tables</span></div>
                        <div class="step"><span class="num">2</span><span class="code">WHERE</span><span class="desc">Filter rows</span></div>
                        <div class="step"><span class="num">3</span><span class="code">GROUP BY</span><span class="desc">Group rows</span></div>
                        <div class="step"><span class="num">4</span><span class="code">HAVING</span><span class="desc">Filter groups</span></div>
                        <div class="step"><span class="num">5</span><span class="code">SELECT</span><span class="desc">Select and compute columns</span></div>
                        <div class="step"><span class="num">6</span><span class="code">ORDER BY</span><span class="desc">Sort result</span></div>
                        <div class="step"><span class="num">7</span><span class="code">LIMIT</span><span class="desc">Limit result</span></div>
                    </div>
                    `
                },

                {
                    id: 'subsection10_2',
                    titleDe: 'Join-Typen als Venn-Diagramme',
                    titleEn: 'Join Types as Venn Diagrams',
                    htmlDe: `
                    <div class="pm-venn-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;max-width:560px;margin:0 auto;padding:0.75rem 0.5rem;">
                        <style>
                            .pm-venn-grid .item { display:flex; flex-direction:column; align-items:center; gap:0.4rem; padding:0.75rem 0.5rem; border-radius:0.5rem; background:var(--panel-color); border:1px solid var(--panel-border); }
                            .pm-venn-grid svg { width:100%; max-width:140px; }
                            .pm-venn-grid .a { fill:none; stroke:#3b82f6; stroke-width:2.5; }
                            .pm-venn-grid .b { fill:none; stroke:#f59e0b; stroke-width:2.5; }
                            .pm-venn-grid .fa { fill:rgba(59,130,246,0.35); }
                            .pm-venn-grid .fb { fill:rgba(245,158,11,0.35); }
                            .pm-venn-grid .fi { fill:rgba(168,85,247,0.55); animation: pm-venn-pulse 4s ease-in-out infinite; }
                            @keyframes pm-venn-pulse { 0%,100% { opacity:0.55; } 50% { opacity:1; } }
                            .pm-venn-grid .title { font-size:0.68rem; font-weight:800; letter-spacing:0.05em; text-transform:uppercase; color:var(--heading-color); }
                            .pm-venn-grid .sub { font-size:0.6rem; color:var(--text-muted); text-align:center; }
                        </style>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="a" cx="55" cy="40" r="28"/><circle class="b" cx="85" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/></svg>
                            <div class="title">INNER JOIN</div>
                            <div class="sub" data-lang-de>Nur die Schnittmenge</div>
                            <div class="sub" data-lang-en style="display:none;">Only the intersection</div>
                        </div>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="fa" cx="55" cy="40" r="28"/><circle class="a" cx="55" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/><circle class="b" cx="85" cy="40" r="28"/></svg>
                            <div class="title">LEFT JOIN</div>
                            <div class="sub" data-lang-de>Alles links + Schnittmenge</div>
                            <div class="sub" data-lang-en style="display:none;">All left + intersection</div>
                        </div>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="fb" cx="85" cy="40" r="28"/><circle class="a" cx="55" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/><circle class="b" cx="85" cy="40" r="28"/></svg>
                            <div class="title">RIGHT JOIN</div>
                            <div class="sub" data-lang-de>Alles rechts + Schnittmenge</div>
                            <div class="sub" data-lang-en style="display:none;">All right + intersection</div>
                        </div>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="fa" cx="55" cy="40" r="28"/><circle class="fb" cx="85" cy="40" r="28"/><circle class="a" cx="55" cy="40" r="28"/><circle class="b" cx="85" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/></svg>
                            <div class="title">FULL JOIN</div>
                            <div class="sub" data-lang-de>Alles aus beiden</div>
                            <div class="sub" data-lang-en style="display:none;">All from both</div>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="pm-venn-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;max-width:560px;margin:0 auto;padding:0.75rem 0.5rem;">
                        <style>
                            .pm-venn-grid .item { display:flex; flex-direction:column; align-items:center; gap:0.4rem; padding:0.75rem 0.5rem; border-radius:0.5rem; background:var(--panel-color); border:1px solid var(--panel-border); }
                            .pm-venn-grid svg { width:100%; max-width:140px; }
                            .pm-venn-grid .a { fill:none; stroke:#3b82f6; stroke-width:2.5; }
                            .pm-venn-grid .b { fill:none; stroke:#f59e0b; stroke-width:2.5; }
                            .pm-venn-grid .fa { fill:rgba(59,130,246,0.35); }
                            .pm-venn-grid .fb { fill:rgba(245,158,11,0.35); }
                            .pm-venn-grid .fi { fill:rgba(168,85,247,0.55); animation: pm-venn-pulse 4s ease-in-out infinite; }
                            @keyframes pm-venn-pulse { 0%,100% { opacity:0.55; } 50% { opacity:1; } }
                            .pm-venn-grid .title { font-size:0.68rem; font-weight:800; letter-spacing:0.05em; text-transform:uppercase; color:var(--heading-color); }
                            .pm-venn-grid .sub { font-size:0.6rem; color:var(--text-muted); text-align:center; }
                        </style>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="a" cx="55" cy="40" r="28"/><circle class="b" cx="85" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/></svg>
                            <div class="title">INNER JOIN</div>
                            <div class="sub">Only the intersection</div>
                        </div>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="fa" cx="55" cy="40" r="28"/><circle class="a" cx="55" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/><circle class="b" cx="85" cy="40" r="28"/></svg>
                            <div class="title">LEFT JOIN</div>
                            <div class="sub">All left + intersection</div>
                        </div>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="fb" cx="85" cy="40" r="28"/><circle class="a" cx="55" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/><circle class="b" cx="85" cy="40" r="28"/></svg>
                            <div class="title">RIGHT JOIN</div>
                            <div class="sub">All right + intersection</div>
                        </div>
                        <div class="item">
                            <svg viewBox="0 0 140 80"><circle class="fa" cx="55" cy="40" r="28"/><circle class="fb" cx="85" cy="40" r="28"/><circle class="a" cx="55" cy="40" r="28"/><circle class="b" cx="85" cy="40" r="28"/><path class="fi" d="M70,16 A28,28 0 0,1 70,64 A28,28 0 0,1 70,16 Z"/></svg>
                            <div class="title">FULL JOIN</div>
                            <div class="sub">All from both</div>
                        </div>
                    </div>
                    `
                },

                {
                    id: 'subsection10_3',
                    titleDe: 'ACID-Eigenschaften',
                    titleEn: 'ACID Properties',
                    htmlDe: `
                    <div class="pm-acid-stage" style="max-width:560px;margin:0 auto;padding:1rem 0.5rem;display:grid;grid-template-columns:repeat(2,1fr);gap:0.65rem;">
                        <style>
                            .pm-acid-stage .card { display:flex; flex-direction:column; align-items:center; gap:0.35rem; padding:0.9rem 0.7rem; border-radius:0.6rem; background:var(--panel-color); border:2px solid var(--border-color); text-align:center; }
                            .pm-acid-stage .letter { width:2.1rem; height:2.1rem; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-family:'Lora',serif; font-size:1.15rem; font-weight:800; color:#fff; background:var(--accent-color); }
                            .pm-acid-stage .title { font-size:0.72rem; font-weight:800; color:var(--heading-color); }
                            .pm-acid-stage .desc { font-size:0.6rem; color:var(--text-muted); line-height:1.35; }
                            .pm-acid-stage .card:nth-child(1) { --accent-color:#3b82f6; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 0.0s; }
                            .pm-acid-stage .card:nth-child(2) { --accent-color:#a855f7; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 1.5s; }
                            .pm-acid-stage .card:nth-child(3) { --accent-color:#f59e0b; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 3.0s; }
                            .pm-acid-stage .card:nth-child(4) { --accent-color:#10b981; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 4.5s; }
                            @keyframes pm-acid-glow { 0%,100% { border-color:var(--border-color); box-shadow:none; transform:scale(1); background:var(--panel-color); } 8%,20% { border-color:var(--accent-color); box-shadow:0 0 22px -6px var(--accent-color); transform:scale(1.04); background:var(--code-bg); } 28% { border-color:var(--border-color); box-shadow:none; transform:scale(1); background:var(--panel-color); } }
                        </style>
                        <div class="card"><div class="letter">A</div><div class="title">Atomicity</div><div class="desc" data-lang-de>Ganz oder gar nicht — eine Transaktion ist unteilbar.</div><div class="desc" data-lang-en style="display:none;">All or nothing — a transaction is indivisible.</div></div>
                        <div class="card"><div class="letter">C</div><div class="title">Consistency</div><div class="desc" data-lang-de>Die Datenbank wechselt nur zwischen gültigen Zuständen.</div><div class="desc" data-lang-en style="display:none;">The database moves only between valid states.</div></div>
                        <div class="card"><div class="letter">I</div><div class="title">Isolation</div><div class="desc" data-lang-de>Parallele Transaktionen stören sich nicht.</div><div class="desc" data-lang-en style="display:none;">Parallel transactions don't interfere.</div></div>
                        <div class="card"><div class="letter">D</div><div class="title">Durability</div><div class="desc" data-lang-de>Nach COMMIT sind die Daten dauerhaft — auch bei Stromausfall.</div><div class="desc" data-lang-en style="display:none;">After COMMIT, data is permanent — even across power loss.</div></div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="pm-acid-stage" style="max-width:560px;margin:0 auto;padding:1rem 0.5rem;display:grid;grid-template-columns:repeat(2,1fr);gap:0.65rem;">
                        <style>
                            .pm-acid-stage .card { display:flex; flex-direction:column; align-items:center; gap:0.35rem; padding:0.9rem 0.7rem; border-radius:0.6rem; background:var(--panel-color); border:2px solid var(--border-color); text-align:center; }
                            .pm-acid-stage .letter { width:2.1rem; height:2.1rem; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-family:'Lora',serif; font-size:1.15rem; font-weight:800; color:#fff; background:var(--accent-color); }
                            .pm-acid-stage .title { font-size:0.72rem; font-weight:800; color:var(--heading-color); }
                            .pm-acid-stage .desc { font-size:0.6rem; color:var(--text-muted); line-height:1.35; }
                            .pm-acid-stage .card:nth-child(1) { --accent-color:#3b82f6; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 0.0s; }
                            .pm-acid-stage .card:nth-child(2) { --accent-color:#a855f7; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 1.5s; }
                            .pm-acid-stage .card:nth-child(3) { --accent-color:#f59e0b; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 3.0s; }
                            .pm-acid-stage .card:nth-child(4) { --accent-color:#10b981; animation: pm-acid-glow 6s ease-in-out infinite; animation-delay: 4.5s; }
                            @keyframes pm-acid-glow { 0%,100% { border-color:var(--border-color); box-shadow:none; transform:scale(1); background:var(--panel-color); } 8%,20% { border-color:var(--accent-color); box-shadow:0 0 22px -6px var(--accent-color); transform:scale(1.04); background:var(--code-bg); } 28% { border-color:var(--border-color); box-shadow:none; transform:scale(1); background:var(--panel-color); } }
                        </style>
                        <div class="card"><div class="letter">A</div><div class="title">Atomicity</div><div class="desc">All or nothing — a transaction is indivisible.</div></div>
                        <div class="card"><div class="letter">C</div><div class="title">Consistency</div><div class="desc">The database moves only between valid states.</div></div>
                        <div class="card"><div class="letter">I</div><div class="title">Isolation</div><div class="desc">Parallel transactions don't interfere.</div></div>
                        <div class="card"><div class="letter">D</div><div class="title">Durability</div><div class="desc">After COMMIT, data is permanent — even across power loss.</div></div>
                    </div>
                    `
                }
            ]
        }
    ],

    footer: {
        textDe: 'SQL & Datenbanken · IBB AnwP-DBSQL · 2026',
        textEn: 'SQL & Databases · IBB AnwP-DBSQL · 2026'
    }
});