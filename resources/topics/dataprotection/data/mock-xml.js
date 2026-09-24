// resources/topics/dataprotection/data/mock-xml.js
// Offline fallback XML blobs. Used only when every CORS proxy fails,
// and always for the DSGVO section (which is deliberately offline-only).

const MOCK_XML = {
    dsgvo_2018: `<?xml version="1.0" encoding="UTF-8"?><dokumente>…</dokumente>`,
    bdsg_2018:  `<?xml version="1.0" encoding="UTF-8"?><dokumente>…</dokumente>`,
    ttdsg:      `<?xml version="1.0" encoding="UTF-8"?><dokumente>…</dokumente>`,
    tkg_2021:   `<?xml version="1.0" encoding="UTF-8"?><dokumente>…</dokumente>`
};

export function getOfflineMockXml(code) {
    return MOCK_XML[code] || '<dokumente></dokumente>';
}