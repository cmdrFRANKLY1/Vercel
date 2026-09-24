// resources/topics/dataprotection/services/law-fetcher.js
// Fetches a law's XML ZIP through a CORS proxy waterfall, with mock fallback.

import { GII_BASE } from '../data/law-configs.js';
import { getOfflineMockXml } from '../data/mock-xml.js';
import { loadJSZip } from './jszip-loader.js';

export async function fetchLawXmlWithFallback(code) {
    if (code === 'dsgvo_2018') {
        return { xmlText: getOfflineMockXml(code), isMock: true };
    }

    await loadJSZip();

    const cb = Math.random().toString(36).substring(7);
    const urlsToTry = [];
    if (code === 'ttdsg') {
        urlsToTry.push(`${GII_BASE}/tdddg/xml.zip?cb=${cb}`);
        urlsToTry.push(`${GII_BASE}/ttdsg/xml.zip?cb=${cb}`);
    } else {
        urlsToTry.push(`${GII_BASE}/${code}/xml.zip?cb=${cb}`);
    }

    const proxies = [
        (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
        (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
    ];

    for (const zipUrl of urlsToTry) {
        for (const proxy of proxies) {
            try {
                const targetUrl = proxy(zipUrl);
                const res = await fetch(targetUrl, { signal: AbortSignal.timeout(10000) });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const buf  = await res.arrayBuffer();
                const view = new Uint8Array(buf);
                if (view.length < 4 || view[0] !== 0x50 || view[1] !== 0x4B) {
                    throw new Error('Proxy returned non-ZIP data');
                }

                const zip = await window.JSZip.loadAsync(buf);
                const xmlFileName = Object.keys(zip.files).find(n => n.endsWith('.xml'));
                if (!xmlFileName) throw new Error('No XML inside ZIP');

                const xmlText = await zip.files[xmlFileName].async('string');
                return { xmlText, isMock: false };
            } catch (e) {
                console.warn(`Fetch failed for ${zipUrl} via proxy:`, e.message || e);
            }
        }
    }

    console.warn(`All proxies failed for ${code}. Using embedded fallback.`);
    return { xmlText: getOfflineMockXml(code), isMock: true };
}