// resources/topics/dataprotection/data/sections.js
// Assembles the section list for the Datenschutz topic.
//
// Two kinds of sections:
//   1. Live sections — generated from fetched law norms.
//   2. Static sections — VVT, TLDR, plus future additions.

import { LAW_CONFIGS } from './law-configs.js';
import { section as vvt }  from './sections/01-static-vvt.js';
import { section as tldr } from './sections/02-static-tldr.js';

// --- Static sections in display order ---
export const staticSections = [vvt, tldr];

// --- Live sections, generated from fetched norms ---
export function buildLiveSections(allNorms) {
    const out = [];
    LAW_CONFIGS.forEach(law => {
        const lawNorms = allNorms[law.code];
        if (!lawNorms || Object.keys(lawNorms).length === 0) return;

        law.sections.forEach(section => {
            const availableNorms = section.norms.filter(n => lawNorms[n]);
            if (availableNorms.length === 0) return;

            out.push({
                id: section.id,
                titleDe: section.title.de,
                titleEn: section.title.en,
                subtopics: availableNorms.map((normId, idx) => {
                    const norm = lawNorms[normId];
                    return {
                        id: `${section.id}-norm-${idx}`,
                        titleDe: norm.heading,
                        titleEn: norm.heading
                    };
                })
            });
        });
    });
    return out;
}

// --- Section list stub for TOC ordering (subtopics filled by builder) ---
export function staticSectionDescriptors() {
    return staticSections.map(s => ({
        id: s.id,
        titleDe: s.titleDe,
        titleEn: s.titleEn,
        subtopics: s.subtopics
    }));
}