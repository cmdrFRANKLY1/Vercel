// resources/topics/dataprotection/services/law-data.js
// Module-scoped cache. Survives for the lifetime of the page load.
// Deduplicates concurrent fetches via inFlightFetch.

import { LAW_CONFIGS } from '../data/law-configs.js';
import { fetchLawXmlWithFallback } from './law-fetcher.js';
import { parseLawXml } from './law-parser.js';

let cachedPayload = null;    // { allNorms, anyFallback, fetchedAt }
let inFlightFetch = null;

async function fetchAllLegalData() {
    const allNorms = {};
    let anyFallback = false;

    await Promise.allSettled(
        LAW_CONFIGS.map(async (law) => {
            try {
                const { xmlText, isMock } = await fetchLawXmlWithFallback(law.code);
                const norms = parseLawXml(xmlText);
                allNorms[law.code] = norms;
                if (isMock && law.code !== 'dsgvo_2018') anyFallback = true;
            } catch (err) {
                console.warn(`Failed to fetch ${law.code}:`, err);
                allNorms[law.code] = {};
            }
        })
    );

    return { allNorms, anyFallback };
}

export async function ensureLegalData() {
    if (cachedPayload) return cachedPayload;
    if (inFlightFetch) return inFlightFetch;

    inFlightFetch = (async () => {
        const { allNorms, anyFallback } = await fetchAllLegalData();
        cachedPayload = { allNorms, anyFallback, fetchedAt: Date.now() };
        inFlightFetch = null;
        return cachedPayload;
    })();

    return inFlightFetch;
}

export function hasCachedLegalData() {
    return cachedPayload !== null;
}