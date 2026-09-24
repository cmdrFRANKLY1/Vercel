/* resources/modules/reports.js
 * Work reports: fetch .doc/.docx from Reports/ on GitHub, parse weekday text,
 * populate App.state.workReportEntries, open report modal on chip click.
 * Depends on: util.js (ymd, escapeHtml, ghFetch, fetchRawBuffer)
 *             state.js (App.state.workReportEntries, App.state.workReportsLoaded,
 *                       App.state.isGerman)
 *             calendar.js (App.calendar.updateAll) — called after load.
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[reports] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;
    const util = App.util;
    const { ymd, escapeHtml, ghFetch, fetchRawBuffer } = util;

    const REPORTS_FOLDER = 'Reports';

    const PARSE_DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    const STOP_DAY_NAMES  = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

    /* ----------------------------------------------------------
       Text extraction from a single weekday block
       ---------------------------------------------------------- */
    function extractDayContentFromText(text, dayName) {
        const patterns = [
            new RegExp(dayName + '[\\s\\-:;]*([\\s\\S]*?)(?=\\n\\s*(?:' + STOP_DAY_NAMES.join('|') + ')|$)', 'i'),
            new RegExp('\\|\\s*' + dayName + '\\s*\\|([^|]*)\\|', 'i'),
            new RegExp(dayName + '\\s*[-–]\\s*([\\s\\S]*?)(?=\\n\\s*(?:' + STOP_DAY_NAMES.join('|') + ')|$)', 'i')
        ];

        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (!match) continue;

            let content = match[1].trim();
            content = content
                .replace(/(?:\n|^)\s*(?:Samstag|Sonntag)\b[\s\S]*$/i, '')
                .replace(/\b\d+\s*(?:h|Std\.|Stunden)\b/gi, '')
                .replace(/[–\-]\s*Selbständig.*$/gim, '')
                .replace(/\d{2}\.\d{2}\.\d{4}\s*$/g, '')
                .replace(/\s+\b8\b.*$/gm, '')
                .replace(/\|\s*$/, '')
                .replace(/^[•\-*+]\s*/, '')
                .trim();

            const lines = content
                .split('\n')
                .map(l => l.trim())
                .filter(l => l && !l.match(/^[-–]{3,}$/))
                .map(l => l.replace(/^[-*•+]\s*/, '• '));

            const hasHO = lines.some(l => /^HO$/i.test(l) || /home office/i.test(l));
            const filteredLines = lines.filter(l => !/^HO$/i.test(l) && !/home office/i.test(l));

            if (filteredLines.length === 0 && hasHO) {
                return { content: '🏠 Home Office', isHO: true };
            }
            return { content: filteredLines.join('\n') || '—', isHO: hasHO };
        }

        return { content: '—', isHO: false };
    }

    /* ----------------------------------------------------------
       Main loader
       ---------------------------------------------------------- */
    async function loadWorkReports() {
        try {
            const data = await ghFetch(REPORTS_FOLDER);
            if (!Array.isArray(data)) throw new Error('Not an array');

            const docFiles = data.filter(i => i.type === 'file' && /\.docx?$/i.test(i.name));

            await Promise.all(docFiles.map(async item => {
                const rawUrl = `${App.constants.GH_RAW}/${REPORTS_FOLDER}/${encodeURIComponent(item.name)}`;
                try {
                    const buf = await fetchRawBuffer(rawUrl);
                    const zip = await JSZip.loadAsync(buf);
                    const docFile = zip.file('word/document.xml');
                    if (!docFile) return;

                    const xml = await docFile.async('string');
                    const pRegex = /<w:p[^>]*>([\s\S]*?)<\/w:p>/g;
                    const paragraphs = [];
                    let m;
                    while ((m = pRegex.exec(xml)) !== null) {
                        const tc = (m[1].match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [])
                            .map(x => x.replace(/<[^>]*>/g, '').trim())
                            .filter(Boolean);
                        if (tc.length) paragraphs.push(tc.join(' '));
                    }
                    const fullText = paragraphs.join('\n');

                    // Try to get a Monday anchor from the filename (dd.mm.yyyy or d/m/yy)
                    let mondayDate = null;
                    const dm = item.name.match(/(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/);
                    if (dm) {
                        let d  = parseInt(dm[1]);
                        let mo = parseInt(dm[2]) - 1;
                        let y  = parseInt(dm[3]);
                        if (y < 100) y += 2000;

                        const parsed = new Date(y, mo, d);
                        if (!isNaN(parsed.getTime())) {
                            const day = parsed.getDay();
                            const diff = parsed.getDate() - day + (day === 0 ? -6 : 1);
                            mondayDate = new Date(parsed.setDate(diff));
                        }
                    }
                    if (!mondayDate) return;

                    for (let i = 0; i < PARSE_DAY_NAMES.length; i++) {
                        const parsed = extractDayContentFromText(fullText, PARSE_DAY_NAMES[i]);
                        if (parsed.content && parsed.content !== '—') {
                            const date = new Date(mondayDate);
                            date.setDate(date.getDate() + i);
                            state.workReportEntries[ymd(date)] = {
                                content: parsed.content,
                                isHO: parsed.isHO,
                                reportName: item.name
                            };
                        }
                    }
                } catch (e) {
                    console.warn('Report parse failed:', item.name, e);
                }
            }));

            state.workReportsLoaded = true;

            // Refresh calendar so the report chips show up.
            if (App.calendar && typeof App.calendar.updateAll === 'function') {
                App.calendar.updateAll();
            }

            console.log(
                `[Reports] Loaded ${Object.keys(state.workReportEntries).length} day entries ` +
                `from ${docFiles.length} reports.`
            );
        } catch (err) {
            console.warn('Could not load work reports:', err);
            state.workReportsLoaded = true;
            if (App.calendar && typeof App.calendar.updateAll === 'function') {
                App.calendar.updateAll();
            }
        }
    }

    /* ----------------------------------------------------------
       Report modal
       ---------------------------------------------------------- */
    function openForKey(key) {
        const entry = state.workReportEntries[key];
        if (!entry) return;

        const parts = key.split('-').map(Number);
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        const dateStr = date.toLocaleDateString(
            state.isGerman ? 'de-DE' : 'en-US',
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        );

        const titleEl = document.getElementById('reportModalTitle');
        if (titleEl) {
            titleEl.innerHTML =
                `<span data-lang-de>Bericht — ${escapeHtml(dateStr)}</span>` +
                `<span data-lang-en style="display:none;">Report — ${escapeHtml(dateStr)}</span>`;
        }

        const metaEl = document.getElementById('reportModalMeta');
        if (metaEl) {
            metaEl.textContent = (entry.reportName || '') + (entry.isHO ? ' · HO' : '');
        }

        const bodyEl = document.getElementById('reportModalBody');
        if (bodyEl) {
            bodyEl.textContent = entry.content || '';
        }

        openModal();
        // Ensure the freshly-injected data-lang spans respect the current language.
        if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
            App.i18n.applyLangToDOM();
        }
    }

    function openModal() {
        const m = document.getElementById('reportModal');
        if (m) m.classList.add('open');
    }

    function closeModal() {
        const m = document.getElementById('reportModal');
        if (m) m.classList.remove('open');
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.reports = {
        loadWorkReports,
        extractDayContentFromText,
        openForKey,
        openModal,
        closeModal
    };
})();