// resources/topics/dataprotection/services/law-parser.js
// Parses a gesetze-im-internet.de XML blob into a norm map: { 'art:5': {...}, 'par:26': {...} }

export function parseLawXml(xmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const norms = {};

    doc.querySelectorAll('norm').forEach(norm => {
        const meta = norm.querySelector('metadaten');
        if (!meta) return;

        const enbez  = meta.querySelector('enbez')?.textContent?.trim()  || '';
        const jurabk = meta.querySelector('jurabk')?.textContent?.trim() || '';
        const titel  = meta.querySelector('titel')?.textContent?.trim()  || '';

        if (!enbez || enbez.includes('Abs')) return;

        let normId = '';
        const artMatch = enbez.match(/^Art\.?\s*(\d+[a-z]?)/i);
        const parMatch = enbez.match(/^§\s*(\d+[a-z]?)/);
        if (artMatch) normId = `art:${artMatch[1]}`;
        else if (parMatch) normId = `par:${parMatch[1]}`;
        else return;

        const textEl = norm.querySelector('textdaten');
        let fullText = '';
        if (textEl) {
            const paragraphs = textEl.querySelectorAll('P');
            if (paragraphs.length > 0) {
                fullText = Array.from(paragraphs).map(p => p.textContent.trim()).filter(t => t).join('\n\n');
            } else {
                fullText = textEl.textContent.trim();
            }
        }

        fullText = fullText.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
        const heading = `${enbez} ${titel || jurabk}`.trim();

        if (!norms[normId]) {
            norms[normId] = { heading, text: fullText, enbez, titel, jurabk };
        }
    });

    return norms;
}