// resources/topics/dataprotection/render/html-builders.js
// Turns parsed law data + static sections into section descriptors and HTML.

import { LAW_CONFIGS } from '../data/law-configs.js';
import { staticSections } from '../data/sections.js';

export function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function renderNormBody(text) {
    if (!text) return '<em>Kein Text verfügbar / No text available</em>';
    const raw = text.replace(/\s+/g, ' ').trim();
    const parts = raw.split(/(?=\(\d+\)\s)/g).filter(p => p.trim().length > 0);

    if (parts.length >= 2) {
        return parts.map(part => {
            const m = part.match(/^\((\d+)\)\s*(.*)$/s);
            const num = m ? m[1] : '';
            const body = m ? m[2].trim() : part.trim();
            return `<p class="mb-2"><strong>(${escapeHtml(num)})</strong> ${escapeHtml(body)}</p>`;
        }).join('');
    }
    return `<p class="mb-2">${escapeHtml(raw)}</p>`;
}

// Renders one static section (VVT, TLDR, future additions) to HTML.
function renderStaticSection(sec) {
    const headingDe = sec.headingDe || sec.titleDe;
    const headingEn = sec.headingEn || sec.titleEn;

    let html = `<section id="${escapeHtml(sec.id)}" class="scroll-mt-6 searchable-block topic-panel mt-6 dsg-injected">`;
    html += `<h2>
        <span data-lang-de>${escapeHtml(headingDe)}</span>
        <span data-lang-en style="display:none;">${escapeHtml(headingEn)}</span>
    </h2>`;

    if (sec.introDe || sec.introEn) {
        html += `<div class="mb-6 text-sm text-[var(--text-muted)]">
            <p data-lang-de>${escapeHtml(sec.introDe || '')}</p>
            <p data-lang-en style="display:none;">${escapeHtml(sec.introEn || '')}</p>
        </div>`;
    }

    html += sec.html || '';
    html += `</section>`;
    return html;
}

export function buildSectionsDataAndHtml(allNorms, anyFallback) {
    const sections = [];
    let html = '';

    // --- 1) Live law sections (DSGVO, BDSG, TTDSG, TKG) ---
    LAW_CONFIGS.forEach(law => {
        const lawNorms = allNorms[law.code];
        if (!lawNorms || Object.keys(lawNorms).length === 0) return;

        law.sections.forEach(section => {
            const availableNorms = section.norms.filter(n => lawNorms[n]);
            if (availableNorms.length === 0) return;

            const subtopics = availableNorms.map((normId, idx) => {
                const norm = lawNorms[normId];
                return {
                    id: `${section.id}-norm-${idx}`,
                    titleDe: norm.heading,
                    titleEn: norm.heading
                };
            });
            sections.push({
                id: section.id,
                titleDe: section.title.de,
                titleEn: section.title.en,
                subtopics
            });

            html += `<section id="${escapeHtml(section.id)}" class="scroll-mt-6 searchable-block topic-panel mt-6 dsg-injected">`;
            html += `<h2>
                <span data-lang-de>${escapeHtml(section.title.de)}</span>
                <span data-lang-en style="display:none;">${escapeHtml(section.title.en)}</span>
            </h2>`;

            availableNorms.forEach((normId, idx) => {
                const norm = lawNorms[normId];
                const subId = `${section.id}-norm-${idx}`;
                html += `<div class="subtopic-card">
                    <h3 id="${escapeHtml(subId)}" class="scroll-mt-6 text-sm font-semibold">${escapeHtml(norm.heading)}</h3>
                    <div class="text-xs text-[var(--text-muted)] leading-relaxed">
                        ${renderNormBody(norm.text)}
                    </div>
                </div>`;
            });

            html += `</section>`;
        });
    });

    // --- 2) Static sections (VVT, TLDR, future additions) ---
    staticSections.forEach(sec => {
        sections.push({
            id: sec.id,
            titleDe: sec.titleDe,
            titleEn: sec.titleEn,
            subtopics: sec.subtopics
        });
        html += renderStaticSection(sec);
    });

    return { sections, html, anyFallback };
}