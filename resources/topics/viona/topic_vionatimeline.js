// resources/topics/viona/topic_vionatimeline.js
// Viona — timeline of the FISI retraining progress.
// Every entry comes from an Ausbildungsnachweis file.
//
// Layout:
//   ./meta.js           → id, icon, titles, hero, quickLinks, links, footer
//   ./data/weeks.js     → the chronological week list

import { meta } from './meta.js';
import { weeks } from './data/weeks.js';

/* ============================================================
   Rendering — turn the flat week list into month-grouped HTML
   ============================================================ */

function buildTimelineHtml(lang) {
    // Group by calendar month, preserving chronological order.
    const months = new Map();
    for (const w of weeks) {
        const monthKey = w.startIso.slice(0, 7);   // "2026-08"
        if (!months.has(monthKey)) months.set(monthKey, []);
        months.get(monthKey).push(w);
    }

    const monthLabel = (key, l) => {
        const [y, m] = key.split('-').map(Number);
        const d = new Date(y, m - 1, 1);
        return d.toLocaleString(l === 'de' ? 'de-DE' : 'en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    const typeLabel = (t, l) => {
        const map = {
            woche:   { de: 'Woche',        en: 'Week' },
            pruefung:{ de: 'Prüfung',      en: 'Exam' },
            projekt: { de: 'Projekt',      en: 'Project' },
            meilenstein: { de: 'Meilenstein', en: 'Milestone' }
        };
        return (map[t] || map.woche)[l];
    };

    let html = '';
    let weekNumber = 1;

    for (const [monthKey, list] of months) {
        html += `<div class="tl-month">`;
        html += `<div class="tl-month-header">`;
        html += `<i class="fa-regular fa-calendar"></i>`;
        html += `<span>${monthLabel(monthKey, lang)}</span>`;
        html += `<span class="tl-month-count">${list.length}</span>`;
        html += `</div>`;

        for (const w of list) {
            const title = lang === 'de' ? w.titleDe : w.titleEn;
            const topics = (lang === 'de' ? w.topicsDe : w.topicsEn) || [];

            html += `<div class="tl-entry">`;
            html += `<div class="tl-dot"><span>${weekNumber}</span></div>`;
            html += `<div class="tl-body">`;
            html += `<div class="tl-head">`;
            html += `<span class="tl-range">${w.rangeDe}</span>`;
            html += `<span class="tl-type">${typeLabel(w.type, lang)}</span>`;
            html += `</div>`;
            html += `<div class="tl-title">${title}</div>`;
            if (topics.length) {
                html += `<ul class="tl-topics">`;
                for (const t of topics) {
                    html += `<li>${t}</li>`;
                }
                html += `</ul>`;
            }
            html += `</div>`;
            html += `</div>`;

            weekNumber++;
        }

        html += `</div>`;
    }

    return html;
}

/* ============================================================
   Topic definition
   ============================================================ */

registerTopic({
    ...meta,

    hero: {
        titleDe: 'Viona — Projekt-Timeline',
        titleEn: 'Viona — Project Timeline',
        introDe: 'Ein chronologischer Überblick über alle Ausbildungswochen der Umschulung zum Fachinformatiker für Systemintegration. Jeder Eintrag fasst die Themen und Tätigkeiten einer Woche zusammen, wie sie im Ausbildungsnachweis dokumentiert sind.',
        introEn: 'A chronological overview of every week of the retraining to become an IT specialist for system integration. Each entry summarises the topics and activities of one week, as documented in the training report.'
    },

    quickLinks: [
        { icon: 'fa-calendar-week', href: '#section-timeline', switchToDoc: true, labelDe: 'Alle Wochen',   labelEn: 'All Weeks'   },
        { icon: 'fa-chart-simple',  href: '#section-stats',    switchToDoc: true, labelDe: 'Statistik',     labelEn: 'Statistics'  },
        { icon: 'fa-diagram-project', href: '#section-themes', switchToDoc: true, labelDe: 'Themenblöcke',  labelEn: 'Theme Blocks' }
    ],

    sections: [
        {
            id: 'section-timeline',
            titleDe: '1. Chronologischer Verlauf',
            titleEn: '1. Chronological Progress',
            introDe: 'Jede Woche der Umschulung, gruppiert nach Monat.',
            introEn: 'Every week of the retraining, grouped by month.',
            subtopics: [
                {
                    id: 'tl-overview',
                    titleDe: '1.1 Wochenübersicht',
                    titleEn: '1.1 Weekly Overview',
                    htmlDe: buildTimelineHtml('de'),
                    htmlEn: buildTimelineHtml('en')
                }
            ]
        },

        {
            id: 'section-stats',
            titleDe: '2. Statistik',
            titleEn: '2. Statistics',
            introDe: 'Zahlen aus den bisherigen Wochen.',
            introEn: 'Numbers from the weeks so far.',
            subtopics: [
                {
                    id: 'stats-grid',
                    titleDe: '2.1 Kennzahlen',
                    titleEn: '2.1 Key Figures',
                    htmlDe: `
                    <div class="tl-stats">
                        <div class="tl-stat"><div class="tl-stat-value">${weeks.length}</div><div class="tl-stat-label">Wochen dokumentiert</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${weeks.reduce((a, w) => a + (w.hours || 0), 0)}</div><div class="tl-stat-label">Stunden erfasst</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${new Set(weeks.flatMap(w => w.topicsDe || [])).size}</div><div class="tl-stat-label">Themenblöcke</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${weeks[0].startIso}</div><div class="tl-stat-label">Erste Woche</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${weeks[weeks.length - 1].startIso}</div><div class="tl-stat-label">Letzte Woche</div></div>
                    </div>`,
                    htmlEn: `
                    <div class="tl-stats">
                        <div class="tl-stat"><div class="tl-stat-value">${weeks.length}</div><div class="tl-stat-label">Weeks documented</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${weeks.reduce((a, w) => a + (w.hours || 0), 0)}</div><div class="tl-stat-label">Hours recorded</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${new Set(weeks.flatMap(w => w.topicsEn || [])).size}</div><div class="tl-stat-label">Topic blocks</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${weeks[0].startIso}</div><div class="tl-stat-label">First week</div></div>
                        <div class="tl-stat"><div class="tl-stat-value">${weeks[weeks.length - 1].startIso}</div><div class="tl-stat-label">Latest week</div></div>
                    </div>`
                }
            ]
        },

        {
            id: 'section-themes',
            titleDe: '3. Themenblöcke',
            titleEn: '3. Theme Blocks',
            introDe: 'Welche Themen über die bisherigen Wochen behandelt wurden.',
            introEn: 'Which topics have been covered across the weeks so far.',
            subtopics: [
                {
                    id: 'themes-list',
                    titleDe: '3.1 Übersicht',
                    titleEn: '3.1 Overview',
                    htmlDe: `
                    <div class="tl-themes">
                        <div class="tl-theme"><i class="fa-solid fa-shield-halved"></i> <strong>IT-Sicherheit</strong> — Bedrohungslagen, Systemschutz, Grundlagen</div>
                        <div class="tl-theme"><i class="fa-solid fa-user-shield"></i> <strong>Datenschutz</strong> — DSGVO, TOMs, VVT (Art. 30), Auftragsverarbeitung (Art. 28)</div>
                        <div class="tl-theme"><i class="fa-solid fa-diagram-project"></i> <strong>Projektmanagement</strong> — Vollständige Handlung, Projektrollen, Prozessanalyse (ISO 9001)</div>
                        <div class="tl-theme"><i class="fa-solid fa-network-wired"></i> <strong>Netzwerktechnik</strong> — IPv4/IPv6, Subnetmask, Router, Switch, Spanning Tree, ARP, DNS, DHCP</div>
                        <div class="tl-theme"><i class="fa-solid fa-database"></i> <strong>Datenbanken / SQL</strong> — Einführung, Normalformen, 3-Schichten-Architektur, Primary Key</div>
                        <div class="tl-theme"><i class="fa-solid fa-server"></i> <strong>IT-Infrastruktur</strong> — Hyper-V, Debian, Proxmox/KVM, Multi-Container, WordPress</div>
                        <div class="tl-theme"><i class="fa-solid fa-code"></i> <strong>Programmierung</strong> — Algorithmen, Open Roberta Lab, Codierer/Programmierer</div>
                        <div class="tl-theme"><i class="fa-solid fa-scale-balanced"></i> <strong>WiSo</strong> — Märkte, Angebot/Nachfrage, Wirtschaftlichkeit, KPIs, Gesellschaftsordnung</div>
                        <div class="tl-theme"><i class="fa-solid fa-computer"></i> <strong>EDV / Office</strong> — Microsoft 365, KI, Soziale Netzwerke, Browser-Recherche</div>
                    </div>`,
                    htmlEn: `
                    <div class="tl-themes">
                        <div class="tl-theme"><i class="fa-solid fa-shield-halved"></i> <strong>IT Security</strong> — Threat landscape, system protection, fundamentals</div>
                        <div class="tl-theme"><i class="fa-solid fa-user-shield"></i> <strong>Data Protection</strong> — GDPR, TOMs, ROPA (Art. 30), data processing agreements (Art. 28)</div>
                        <div class="tl-theme"><i class="fa-solid fa-diagram-project"></i> <strong>Project Management</strong> — Full action cycle, project roles, process analysis (ISO 9001)</div>
                        <div class="tl-theme"><i class="fa-solid fa-network-wired"></i> <strong>Network Engineering</strong> — IPv4/IPv6, subnet mask, router, switch, spanning tree, ARP, DNS, DHCP</div>
                        <div class="tl-theme"><i class="fa-solid fa-database"></i> <strong>Databases / SQL</strong> — Introduction, normal forms, 3-tier architecture, primary key</div>
                        <div class="tl-theme"><i class="fa-solid fa-server"></i> <strong>IT Infrastructure</strong> — Hyper-V, Debian, Proxmox/KVM, multi-container, WordPress</div>
                        <div class="tl-theme"><i class="fa-solid fa-code"></i> <strong>Programming</strong> — Algorithms, Open Roberta Lab, encoders/programmers</div>
                        <div class="tl-theme"><i class="fa-solid fa-scale-balanced"></i> <strong>Business Studies</strong> — Markets, supply/demand, profitability, KPIs, corporate order</div>
                        <div class="tl-theme"><i class="fa-solid fa-computer"></i> <strong>EDV / Office</strong> — Microsoft 365, AI, social networks, browser research</div>
                    </div>`
                }
            ]
        }
    ],

    links: {
        titleDe: 'Links',
        titleEn: 'Links',
        items: [
            { icon: 'fa-brands fa-github', href: 'https://github.com/cmdrFRANKLY1/Viona', target: '_blank', labelDe: 'Viona Repository', labelEn: 'Viona Repository' }
        ]
    },

    footer: {
        textDe: 'Viona Timeline · Ausbildungsnachweise 2026',
        textEn: 'Viona Timeline · Training reports 2026'
    }
});