// resources/topics/dataprotection/meta.js

export const meta = {
    id: 'datenschutz',

    // ── SUB-CATEGORY (OPTIONAL) ─────────────────────────────────
    // Set `parentId` to the `id` of another registered topic to nest
    // this topic as a child inside that parent's dashboard card.
    //
    // Examples:
    //   parentId: 'recht',
    //   parentId: 'viona',
    //   parentId: 'it-security',
    // parentId: 'recht',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-shield-halved',
    titleDe: 'Datenschutz',
    titleEn: 'Data Protection',
    descDe: 'Rechtsdatenbank für DSGVO, BDSG, TTDSG & TKG',
    descEn: 'Legal database: GDPR, BDSG, TTDSG & TKG',

    sidebarTitleDe: 'Datenschutz',
    sidebarTitleEn: 'Date Protection',
    sidebarSubtitleDe: 'Live-Rechtsdaten',
    sidebarSubtitleEn: 'Live legal data',
    sidebarVersion: 'v3.1 — Live-Fetch (cached)',

    hero: {
        titleDe: 'Datenschutz-Wissen (Live)',
        titleEn: 'Data Protection Knowledge (Live)',
        introDe: 'Diese Seite lädt beim ersten Öffnen aktuelle Rechtsdaten (DSGVO, BDSG, TTDSG, TKG) direkt aus <a href="https://www.gesetze-im-internet.de/" target="_blank" class="text-[var(--link-color)] hover:text-[var(--link-hover)] underline">gesetze-im-internet.de</a> und hält sie für die Dauer dieser Sitzung im Cache. Beim erneuten Öffnen des Themas werden die Daten sofort aus dem Cache geladen. Bei Netzwerkproblemen wird automatisch auf lokale Backup-Daten zurückgegriffen.',
        introEn: 'This page loads current legal data (GDPR, BDSG, TTDSG, TKG) from <a href="https://www.gesetze-im-internet.de/" target="_blank" class="text-[var(--link-color)] hover:text-[var(--link-hover)] underline">gesetze-im-internet.de</a> on first open and keeps it cached for the duration of this session. Reopening the topic loads the cached data instantly. If the network fails, embedded backup data is used automatically.'
    },

    quickLinks: [
        { icon: 'fa-list-check',      href: '#dsgvo-grundlagen',   switchToDoc: true, labelDe: 'DSGVO Grundsätze',    labelEn: 'GDPR Principles' },
        { icon: 'fa-user-shield',     href: '#dsgvo-rechte',       switchToDoc: true, labelDe: 'Betroffenenrechte',   labelEn: 'Subject Rights' },
        { icon: 'fa-clipboard-check', href: '#dsgvo-pflichten',    switchToDoc: true, labelDe: 'TOMs & Pflichten',    labelEn: 'TOMs & Duties' },
        { icon: 'fa-book',            href: '#vvt-uebersicht',     switchToDoc: true, labelDe: 'VVT (Verzeichnis)',   labelEn: 'ROPA (Records)' },
        { icon: 'fa-users',           href: '#bdsg-beschaeftigte', switchToDoc: true, labelDe: 'Beschäftigtenschutz', labelEn: 'Employee Privacy' }
    ],

    // Left empty on purpose — filled dynamically in onRender.
    sections: [],

    illustrations: {
        titleDe: 'Illustration — Der Weg des Datenschutzes',
        titleEn: 'Illustration — The Path of Data Protection',
        introDe: 'Beispielhafter Verlauf: Wer macht die Regeln, wer muss sie befolgen, wer prüft und wer bestraft? Sechs Stationen in Endlosschleife.',
        introEn: 'A sample flow: who makes the rules, who must comply, who inspects, and who fines? Six stations on repeat.',
        animations: [
            {
                id: 'illustration-dsg-flow',
                type: 'custom',
                titleDe: 'Der Datenfluss in 6 Schritten',
                titleEn: 'The Data Flow in 6 Steps',
                descDe: 'Von der EU-Gesetzgebung bis zum Bußgeld — die komplette Kette in einer Endlosschleife.',
                descEn: 'From EU legislation to fines — the complete chain in one continuous loop.',
                html: '' // filled in by lifecycle from data/illustrations.js
            }
        ]
    },

    links: {
        titleDe: 'Links & Quellen',
        titleEn: 'Links & Sources',
        items: [
            { icon: 'fa-scale-balanced', href: 'https://dsgvo-gesetz.de/',                       target: '_blank', labelDe: 'DSGVO Gesetzestext',           labelEn: 'GDPR Full Text' },
            { icon: 'fa-gavel',          href: 'https://www.gesetze-im-internet.de/bdsg_2018/',  target: '_blank', labelDe: 'BDSG Gesetzestext',            labelEn: 'BDSG Full Text' },
            { icon: 'fa-shield-halved',  href: 'https://www.bsi.bund.de/',                       target: '_blank', labelDe: 'BSI (Bundesamt für Sicherheit)', labelEn: 'BSI (Federal Cyber Authority)' },
            { icon: 'fa-user-tie',       href: 'https://www.bfdi.bund.de/',                      target: '_blank', labelDe: 'BfDI (Datenschutz-Behörde)',     labelEn: 'BfDI (DPA)' }
        ]
    },

    footer: {
        textDe: 'Datenschutz HowTo 2026/2027 · Live-Rechtsdaten (IHK FiSi Prüfungsvorbereitung)',
        textEn: 'Data Protection HowTo 2026/2027 · Live legal data (IHK FiSi Exam Prep)'
    }
};