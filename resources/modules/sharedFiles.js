/* resources/modules/sharedFiles.js
 * Shared Files viewer: fetch folder listings from GitHub, render file list,
 * preview PDFs (pdf.js), PPTX (JSZip), HTML (iframe), DOCX (mammoth).
 * Depends on: util.js (escapeHtml, ghFetch, fetchRawBuffer)
 *             state.js (App.state.sharedFilesInitialized, App.state.currentSharedType,
 *                       App.state.sharedSearchQuery, App.state.currentSharedPdfDoc,
 *                       App.state.sharedPdfScale)
 *             constants on App: App.constants.SHARED_ROOT, App.constants.SHARED_SUBFOLDERS
 *             global libs: JSZip, pdfjsLib, mammoth (loaded via CDN in index.html)
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[sharedFiles] window.App missing. Load state.js first.');
        return;
    }

    const { state, constants, util } = App;
    const { escapeHtml, ghFetch, fetchRawBuffer } = util;

    const SHARED_ROOT = constants.SHARED_ROOT;
    const SHARED_SUBFOLDERS = constants.SHARED_SUBFOLDERS;

    /* Local cache mirrors the original module-level object. We keep it here
       rather than in state.js because it's an implementation detail of this
       module and never read by others. */
    const sharedFilesCache = {
        all: null,
        pdf: null,
        ppt: null,
        html: null,
        doc: null,
        xls: null
    };

    /* ----------------------------------------------------------
       Bootstrap: fetch all five subfolders, then render "all".
       ---------------------------------------------------------- */
    async function bootstrap() {
        const listEl = document.getElementById('sharedFileList');
        if (listEl) {
            listEl.innerHTML =
                '<div class="p-4 text-center text-[var(--text-muted)] text-sm animate-pulse">Loading repository…</div>';
        }

        await Promise.all(['pdf', 'ppt', 'html', 'doc', 'xls'].map(fetchSharedFilesForType));
        updateSharedTabCounts();
        renderSharedFileList('all');
    }

    /* ----------------------------------------------------------
       Folder / extension mappings
       ---------------------------------------------------------- */
    function folderForType(type) {
        if (type === 'pdf')  return SHARED_SUBFOLDERS.pdf;
        if (type === 'ppt')  return SHARED_SUBFOLDERS.ppt;
        if (type === 'html') return SHARED_SUBFOLDERS.html;
        if (type === 'doc')  return SHARED_SUBFOLDERS.doc;
        if (type === 'xls')  return SHARED_SUBFOLDERS.xls;
        return SHARED_ROOT;
    }

    function extsForType(type) {
        if (type === 'pdf')  return ['.pdf'];
        if (type === 'ppt')  return ['.ppt', '.pptx'];
        if (type === 'html') return ['.html', '.htm'];
        if (type === 'doc')  return ['.doc', '.docx'];
        if (type === 'xls')  return ['.xls', '.xlsx', '.csv'];
        return null;
    }

    function iconForFile(name) {
        const n = name.toLowerCase();
        if (n.endsWith('.pdf'))  return '<i class="fa-solid fa-file-pdf text-red-400"></i>';
        if (n.endsWith('.ppt') || n.endsWith('.pptx')) return '<i class="fa-solid fa-file-powerpoint text-orange-400"></i>';
        if (n.endsWith('.html') || n.endsWith('.htm')) return '<i class="fa-brands fa-html5 text-blue-400"></i>';
        if (n.endsWith('.doc') || n.endsWith('.docx')) return '<i class="fa-solid fa-file-word text-blue-600"></i>';
        if (n.endsWith('.xls') || n.endsWith('.xlsx') || n.endsWith('.csv')) return '<i class="fa-solid fa-file-excel text-green-500"></i>';
        if (/\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i.test(n)) return '<i class="fa-solid fa-image text-emerald-400"></i>';
        return '<i class="fa-solid fa-file text-[var(--text-muted)]"></i>';
    }

    function categoryForFile(name) {
        const n = name.toLowerCase();
        if (n.endsWith('.pdf')) return 'pdf';
        if (n.endsWith('.ppt') || n.endsWith('.pptx')) return 'ppt';
        if (n.endsWith('.html') || n.endsWith('.htm')) return 'html';
        if (n.endsWith('.doc') || n.endsWith('.docx')) return 'doc';
        if (n.endsWith('.xls') || n.endsWith('.xlsx') || n.endsWith('.csv')) return 'xls';
        return 'other';
    }

    /* ----------------------------------------------------------
       Fetch a folder listing from GitHub
       ---------------------------------------------------------- */
    async function fetchSharedFilesForType(type) {
        if (sharedFilesCache[type]) return sharedFilesCache[type];

        const folder = folderForType(type);
        const exts = extsForType(type);
        let files = [];

        try {
            const data = await ghFetch(folder);
            if (Array.isArray(data)) {
                files = data
                    .filter(i => i.type === 'file')
                    .filter(i => !exts || exts.some(ext => i.name.toLowerCase().endsWith(ext)))
                    .map(item => ({
                        name: item.name,
                        path: item.path,
                        folder: folder,
                        size: item.size || 0,
                        url: `${constants.GH_RAW}/${item.path.split('/').map(encodeURIComponent).join('/')}`,
                        htmlUrl: item.html_url
                    }));
            }
        } catch (e) {
            console.warn('Shared folder fetch failed:', folder, e);
        }

        sharedFilesCache[type] = files;
        return files;
    }

    /* ----------------------------------------------------------
       Aggregated listing for the "All" tab
       ---------------------------------------------------------- */
    function getAllSharedFiles() {
        const seen = new Set();
        const out = [];
        ['pdf', 'ppt', 'html', 'doc', 'xls'].forEach(type => {
            (sharedFilesCache[type] || []).forEach(f => {
                if (seen.has(f.path)) return;
                seen.add(f.path);
                out.push(f);
            });
        });
        out.sort((a, b) => {
            if (a.folder !== b.folder) return a.folder.localeCompare(b.folder);
            return a.name.localeCompare(b.name);
        });
        return out;
    }

    /* ----------------------------------------------------------
       Tab counts
       ---------------------------------------------------------- */
    function updateSharedTabCounts() {
        document.querySelectorAll('.tab-count').forEach(el => {
            const key = el.dataset.count;
            if (key === 'all') el.textContent = getAllSharedFiles().length;
            else el.textContent = (sharedFilesCache[key] || []).length;
        });
    }

    /* ----------------------------------------------------------
       Tab switching
       ---------------------------------------------------------- */
    function switchTab(type) {
        state.currentSharedType = type;

        document.querySelectorAll('.shared-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.sharedType === type);
        });

        const pdfControls = document.getElementById('sharedPdfControls');
        if (pdfControls) pdfControls.classList.add('hidden');

        const previewEl = document.getElementById('sharedPreviewContent');
        if (previewEl) {
            previewEl.innerHTML = `
                <div class="mt-8 text-center text-[var(--text-muted)]">
                    <i class="fa-regular fa-folder-open text-5xl mb-4 opacity-50"></i>
                    <div class="text-lg"><span data-lang-de>Datei auswählen</span><span data-lang-en style="display:none;">Select a file</span></div>
                </div>`;
        }

        renderSharedFileList(type);
        if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
            App.i18n.applyLangToDOM();
        }
    }

    /* ----------------------------------------------------------
       Search
       ---------------------------------------------------------- */
    function onSearch(val) {
        state.sharedSearchQuery = (val || '').trim().toLowerCase();
        renderSharedFileList(state.currentSharedType);
    }

    /* ----------------------------------------------------------
       File list rendering
       ---------------------------------------------------------- */
    function renderSharedFileList(type) {
        const listEl = document.getElementById('sharedFileList');
        if (!listEl) return;
        listEl.innerHTML = '';

        let files = type === 'all'
            ? getAllSharedFiles()
            : (sharedFilesCache[type] || []);

        if (state.sharedSearchQuery) {
            files = files.filter(f => {
                const hay = (f.name + ' ' + f.folder).toLowerCase();
                return hay.includes(state.sharedSearchQuery);
            });
        }

        if (!files.length) {
            const msg = state.sharedSearchQuery
                ? '<span data-lang-de>Keine Treffer für „' + escapeHtml(state.sharedSearchQuery) + '“.</span><span data-lang-en style="display:none;">No matches for "' + escapeHtml(state.sharedSearchQuery) + '".</span>'
                : '<span data-lang-de>Keine Dateien gefunden.</span><span data-lang-en style="display:none;">No files found.</span>';
            listEl.innerHTML = '<div class="p-4 text-[var(--text-muted)] text-sm">' + msg + '</div>';
            if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
                App.i18n.applyLangToDOM();
            }
            return;
        }

        if (type === 'all') {
            const groups = {};
            files.forEach(f => {
                const key = f.folder.replace(`${SHARED_ROOT}/`, '');
                if (!groups[key]) groups[key] = [];
                groups[key].push(f);
            });
            Object.keys(groups).sort().forEach(folderName => {
                const header = document.createElement('div');
                header.className = 'file-tree-group';
                header.innerHTML =
                    `<i class="fa-solid fa-folder"></i> ${escapeHtml(folderName)} ` +
                    `<span class="opacity-60">(${groups[folderName].length})</span>`;
                listEl.appendChild(header);
                groups[folderName].forEach(file => listEl.appendChild(buildSharedFileItem(file)));
            });
        } else {
            files.forEach(file => listEl.appendChild(buildSharedFileItem(file)));
        }
    }

    function buildSharedFileItem(file) {
        const item = document.createElement('div');
        item.className = 'shared-file-item';

        const sizeStr = formatSize(file.size);
        item.innerHTML = `
            <div class="file-icon">${iconForFile(file.name)}</div>
            <div class="file-info">
                <div class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</div>
                <div class="file-path">${escapeHtml(file.folder.replace(`${SHARED_ROOT}/`, ''))} · ${sizeStr}</div>
            </div>
            <div class="file-actions">
                <a class="file-action-btn" href="${file.htmlUrl}" target="_blank" title="GitHub" onclick="event.stopPropagation();"><i class="fa-brands fa-github"></i></a>
                <a class="file-action-btn" href="${file.url}" download title="Download" onclick="event.stopPropagation();"><i class="fa-solid fa-download"></i></a>
            </div>`;

        item.addEventListener('click', () => {
            document.querySelectorAll('.shared-file-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            loadSharedFileContent(categoryForFile(file.name), file);
        });

        return item;
    }

    function formatSize(bytes) {
        if (!bytes && bytes !== 0) return '';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    }

    /* ----------------------------------------------------------
       Content dispatch
       ---------------------------------------------------------- */
    async function loadSharedFileContent(type, file) {
        const previewEl = document.getElementById('sharedPreviewContent');
        const pdfControls = document.getElementById('sharedPdfControls');
        if (!previewEl) return;

        previewEl.innerHTML =
            `<div class="mt-8 animate-pulse text-[var(--text-muted)]">` +
            `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading ${escapeHtml(file.name)}…` +
            `</div>`;
        if (pdfControls) pdfControls.classList.add('hidden');

        state.currentSharedPdfDoc = null;

        try {
            if (type === 'pdf')       await renderSharedPDF(file.url);
            else if (type === 'ppt')  await renderSharedPPTX(file.url);
            else if (type === 'html') renderSharedHTML(file.url);
            else if (type === 'doc')  await renderSharedDOCX(file.url);
            else                      renderDownloadCard(file);
        } catch (err) {
            console.error('Preview error', err);
            previewEl.innerHTML =
                `<div class="mt-8 text-red-500 border border-red-500/30 bg-red-500/10 p-4 rounded">` +
                `<i class="fa-solid fa-triangle-exclamation mr-2"></i> Failed to render preview.` +
                `<br><span class="text-xs opacity-70 mt-2 block">${escapeHtml(err.message)}</span></div>`;
        }
    }

    /* ----------------------------------------------------------
       Fallback: download card
       ---------------------------------------------------------- */
    function renderDownloadCard(file) {
        const previewEl = document.getElementById('sharedPreviewContent');
        if (!previewEl) return;
        previewEl.innerHTML = `
            <div class="shared-download-card">
                <div class="dl-icon">${iconForFile(file.name)}</div>
                <div class="dl-name">${escapeHtml(file.name)}</div>
                <div class="dl-meta">${escapeHtml(file.folder)} · ${formatSize(file.size)}</div>
                <a class="dl-btn" href="${file.url}" download><i class="fa-solid fa-download"></i> Download</a>
            </div>`;
    }

    /* ----------------------------------------------------------
       PDF renderer (pdf.js)
       ---------------------------------------------------------- */
    async function renderSharedPDF(url) {
        if (!window.pdfjsLib) throw new Error('PDF.js not loaded');

        const pdfControls = document.getElementById('sharedPdfControls');
        const loadingTask = pdfjsLib.getDocument(url);
        state.currentSharedPdfDoc = await loadingTask.promise;

        const pageCountEl = document.getElementById('sharedPageCount');
        if (pageCountEl) pageCountEl.textContent = `${state.currentSharedPdfDoc.numPages} Pages`;

        if (pdfControls) {
            pdfControls.classList.remove('hidden');
            pdfControls.classList.add('flex');
        }

        await drawAllSharedPdfPages();
    }

    async function drawAllSharedPdfPages() {
        const doc = state.currentSharedPdfDoc;
        if (!doc) return;

        const previewEl = document.getElementById('sharedPreviewContent');
        const areaEl = document.getElementById('sharedPreviewArea');
        if (!previewEl || !areaEl) return;

        previewEl.innerHTML = '';

        const containerWidth = areaEl.clientWidth - 40;

        for (let i = 1; i <= doc.numPages; i++) {
            const canvas = document.createElement('canvas');
            canvas.className = 'shared-pdf-page rounded';
            previewEl.appendChild(canvas);

            const page = await doc.getPage(i);
            const baseViewport = page.getViewport({ scale: 1 });

            let pageScale = state.sharedPdfScale;
            if (baseViewport.width * pageScale > containerWidth && containerWidth > 0) {
                pageScale = containerWidth / baseViewport.width;
            }

            const viewport = page.getViewport({ scale: pageScale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.style.width = viewport.width + 'px';
            canvas.style.maxWidth = '100%';
            canvas.style.height = 'auto';

            const ctx = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport }).promise;
        }
    }

    /* ----------------------------------------------------------
       PPTX renderer (JSZip, text-only slides)
       ---------------------------------------------------------- */
    async function renderSharedPPTX(url) {
        const previewEl = document.getElementById('sharedPreviewContent');
        if (!previewEl) return;

        const arrayBuffer = await fetchRawBuffer(url);
        const zip = await JSZip.loadAsync(arrayBuffer);

        let slideFiles = Object.keys(zip.files).filter(f => f.match(/^ppt\/slides\/slide\d+\.xml$/));
        slideFiles.sort((a, b) =>
            parseInt(a.match(/slide(\d+)/)[1]) - parseInt(b.match(/slide(\d+)/)[1])
        );

        previewEl.innerHTML = '';

        if (!slideFiles.length) {
            previewEl.innerHTML = '<div class="mt-8 text-[var(--text-muted)] italic">No text slides found.</div>';
            return;
        }

        for (let i = 0; i < slideFiles.length; i++) {
            const slideXml = await zip.files[slideFiles[i]].async('string');
            const textMatches = slideXml.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || [];
            const slideTexts = textMatches.map(t => t.replace(/<[^>]*>/g, '')).filter(Boolean);

            const slideCard = document.createElement('div');
            slideCard.className = 'shared-pptx-slide';

            const contentHTML = slideTexts.length > 0
                ? slideTexts.map(txt => `<p class="mb-2">${escapeHtml(txt)}</p>`).join('')
                : '<span class="text-[var(--text-muted)] italic">[Graphical slide]</span>';

            slideCard.innerHTML = `
                <div class="font-bold text-xs text-orange-500 mb-3 uppercase tracking-widest border-b border-[var(--panel-border)] pb-2">SLIDE ${i + 1} / ${slideFiles.length}</div>
                <div class="text-[var(--text-color)] opacity-90">${contentHTML}</div>`;
            previewEl.appendChild(slideCard);
        }
    }

    /* ----------------------------------------------------------
       HTML renderer (sandboxed iframe)
       ---------------------------------------------------------- */
    function renderSharedHTML(url) {
        const previewEl = document.getElementById('sharedPreviewContent');
        if (!previewEl) return;

        previewEl.innerHTML = '';
        previewEl.style.flex = '1';
        previewEl.style.minHeight = '0';

        const iframe = document.createElement('iframe');
        iframe.className = 'shared-html-frame';
        iframe.sandbox = 'allow-scripts allow-same-origin allow-forms';
        iframe.src = url;
        previewEl.appendChild(iframe);
    }

    /* ----------------------------------------------------------
       DOCX renderer (mammoth)
       ---------------------------------------------------------- */
    async function renderSharedDOCX(url) {
        if (!window.mammoth) throw new Error('Mammoth.js not loaded');

        const previewEl = document.getElementById('sharedPreviewContent');
        if (!previewEl) return;

        const arrayBuffer = await fetchRawBuffer(url);
        const result = await window.mammoth.convertToHtml({ arrayBuffer });

        const wrapper = document.createElement('div');
        wrapper.className = 'shared-doc-wrapper';
        wrapper.innerHTML = result.value || '<p style="color:#666;font-style:italic;">[Empty document]</p>';

        previewEl.innerHTML = '';
        previewEl.appendChild(wrapper);
    }

    /* ----------------------------------------------------------
       Refresh (clears caches, re-fetches)
       ---------------------------------------------------------- */
    function refresh() {
        Object.keys(sharedFilesCache).forEach(k => { sharedFilesCache[k] = null; });
        bootstrap();
    }

    /* ----------------------------------------------------------
       Modal controls
       ---------------------------------------------------------- */
    function open() {
        const m = document.getElementById('sharedFilesModal');
        if (!m) return;
        m.classList.add('open');

        if (!state.sharedFilesInitialized) {
            state.sharedFilesInitialized = true;
            bootstrap();
        } else {
            renderSharedFileList(state.currentSharedType);
        }
    }

    function close() {
        const m = document.getElementById('sharedFilesModal');
        if (m) m.classList.remove('open');
    }

    /* ----------------------------------------------------------
       Zoom controls (wired on module load; the buttons exist
       in index.html regardless of whether the modal is open).
       ---------------------------------------------------------- */
    function wireZoomControls() {
        const zoomIn  = document.getElementById('sharedBtnZoomIn');
        const zoomOut = document.getElementById('sharedBtnZoomOut');

        if (zoomIn) {
            zoomIn.addEventListener('click', () => {
                if (state.currentSharedPdfDoc) {
                    state.sharedPdfScale = Math.min(state.sharedPdfScale * 1.25, 3.0);
                    drawAllSharedPdfPages();
                }
            });
        }

        if (zoomOut) {
            zoomOut.addEventListener('click', () => {
                if (state.currentSharedPdfDoc) {
                    state.sharedPdfScale = Math.max(state.sharedPdfScale / 1.25, 0.5);
                    drawAllSharedPdfPages();
                }
            });
        }
    }

    let sharedResizeTimer = null;
    window.addEventListener('resize', () => {
        if (!state.currentSharedPdfDoc) return;
        clearTimeout(sharedResizeTimer);
        sharedResizeTimer = setTimeout(() => drawAllSharedPdfPages(), 200);
    });

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.sharedFiles = {
        open,
        close,
        bootstrap,
        refresh,
        switchTab,
        onSearch,
        renderSharedFileList,
        loadSharedFileContent,
        getAllSharedFiles
    };

    /* Wire zoom controls as soon as the DOM is ready (index.html loads
       this script at the end of <body>, so the buttons already exist). */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireZoomControls);
    } else {
        wireZoomControls();
    }
})();