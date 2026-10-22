/* resources/modules/sharedFiles.js
 * Shared Files viewer: recursively fetch folder listings from GitHub by TOPIC.
 * Provides a split-view layout: list on the left, dynamic preview on the right.
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
    // Make sure these match the exact case of your GitHub folders!
    const TOPICS = ['BGP-DS', 'BGP-MuKb', 'BGP-WiSo', 'BQSM-PrjktMngt', 'ITT_Spech'];

    const sharedFilesCache = {};

    async function bootstrap() {
        const listEl = document.getElementById('sharedFileList');
        if (listEl) {
            listEl.innerHTML = '<div class="p-4 text-center text-[var(--text-muted)] text-sm animate-pulse">Loading repository…</div>';
        }

        await Promise.all(TOPICS.map(fetchFilesForTopic));
        updateSharedTabCounts();
        renderSharedFileList('all');
    }

    function iconForFile(name) {
        const n = name.toLowerCase();
        if (n.endsWith('.pdf'))  return '<i class="fa-solid fa-file-pdf text-red-400"></i>';
        if (n.endsWith('.ppt') || n.endsWith('.pptx')) return '<i class="fa-solid fa-file-powerpoint text-orange-400"></i>';
        if (n.endsWith('.html') || n.endsWith('.htm')) return '<i class="fa-brands fa-html5 text-blue-400"></i>';
        if (n.endsWith('.doc') || n.endsWith('.docx')) return '<i class="fa-solid fa-file-word text-blue-600"></i>';
        if (n.endsWith('.xls') || n.endsWith('.xlsx') || n.endsWith('.csv')) return '<i class="fa-solid fa-file-excel text-green-500"></i>';
        if (/\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i.test(n)) return '<i class="fa-solid fa-image text-emerald-400"></i>';
        if (n.endsWith('.md') || n.endsWith('.txt')) return '<i class="fa-solid fa-file-lines text-gray-400"></i>';
        return '<i class="fa-solid fa-file text-[var(--text-muted)]"></i>';
    }

    async function fetchFilesForTopic(topic) {
        if (sharedFilesCache[topic]) return sharedFilesCache[topic];

        const rootFolder = `${SHARED_ROOT}/${topic}`;
        let allFiles = [];

        async function fetchFolderRecursive(folderPath) {
            try {
                // Log the exact URL to the console for debugging
                const apiUrl = `${constants.GH_API}/contents/${folderPath}?ref=${constants.GH_BRANCH || 'main'}`;
                console.log(`[SharedFiles] Fetching: ${apiUrl}`);
                
                const data = await ghFetch(folderPath);
                
                if (!Array.isArray(data)) {
                    console.warn(`[SharedFiles] API did not return an array for ${folderPath}. Response:`, data);
                    return;
                }

                const fetchPromises = [];

                for (const item of data) {
                    if (item.type === 'file') {
                        allFiles.push({
                            name: item.name,
                            path: item.path,
                            topic: topic,
                            folder: folderPath.replace(`${SHARED_ROOT}/`, ''),
                            size: item.size || 0,
                            url: `${constants.GH_RAW}/${item.path.split('/').map(encodeURIComponent).join('/')}`,
                            htmlUrl: item.html_url
                        });
                    } else if (item.type === 'dir') {
                        fetchPromises.push(fetchFolderRecursive(item.path));
                    }
                }
                await Promise.all(fetchPromises);
            } catch (e) {
                console.warn(`[SharedFiles] Fetch failed for ${folderPath}:`, e);
            }
        }

        await fetchFolderRecursive(rootFolder);
        allFiles.sort((a, b) => a.name.localeCompare(b.name));
        
        console.log(`[SharedFiles] Total files found for ${topic}:`, allFiles.length);
        sharedFilesCache[topic] = allFiles;
        return allFiles;
    }

    function getAllSharedFiles() {
        const seen = new Set();
        const out = [];
        TOPICS.forEach(topic => {
            (sharedFilesCache[topic] || []).forEach(f => {
                if (seen.has(f.path)) return;
                seen.add(f.path);
                out.push(f);
            });
        });
        out.sort((a, b) => {
            if (a.topic !== b.topic) return a.topic.localeCompare(b.topic);
            return a.name.localeCompare(b.name);
        });
        return out;
    }

    function updateSharedTabCounts() {
        document.querySelectorAll('.tab-count').forEach(el => {
            const key = el.dataset.count;
            if (key === 'all') el.textContent = getAllSharedFiles().length;
            else el.textContent = (sharedFilesCache[key] || []).length;
        });
    }

    function switchTab(type) {
        state.currentSharedType = type;
        document.querySelectorAll('.shared-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.sharedType === type);
        });
        renderSharedFileList(type);
        clearPreview();
        if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
            App.i18n.applyLangToDOM();
        }
    }

    function onSearch(val) {
        state.sharedSearchQuery = (val || '').trim().toLowerCase();
        renderSharedFileList(state.currentSharedType);
    }

    function renderSharedFileList(type) {
        const listEl = document.getElementById('sharedFileList');
        if (!listEl) return;
        listEl.innerHTML = '';

        let files = type === 'all' ? getAllSharedFiles() : (sharedFilesCache[type] || []);

        if (state.sharedSearchQuery) {
            files = files.filter(f => {
                const hay = (f.name + ' ' + f.topic + ' ' + f.folder).toLowerCase();
                return hay.includes(state.sharedSearchQuery);
            });
        }

        if (!files.length) {
            const msg = state.sharedSearchQuery
                ? `<span data-lang-de>Keine Treffer für „${escapeHtml(state.sharedSearchQuery)}“.</span><span data-lang-en style="display:none;">No matches for "${escapeHtml(state.sharedSearchQuery)}".</span>`
                : '<span data-lang-de>Keine Dateien gefunden.</span><span data-lang-en style="display:none;">No files found.</span>';
            listEl.innerHTML = '<div class="p-4 text-[var(--text-muted)] text-sm">' + msg + '</div>';
            if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') App.i18n.applyLangToDOM();
            return;
        }

        const groups = {};
        files.forEach(f => {
            if (!groups[f.folder]) groups[f.folder] = [];
            groups[f.folder].push(f);
        });

        Object.keys(groups).sort().forEach(folderName => {
            const header = document.createElement('div');
            header.className = 'file-tree-group';
            header.innerHTML = `<i class="fa-solid fa-folder"></i> ${escapeHtml(folderName)} <span class="opacity-60">(${groups[folderName].length})</span>`;
            listEl.appendChild(header);
            groups[folderName].forEach(file => listEl.appendChild(buildSharedFileItem(file)));
        });
    }

    function buildSharedFileItem(file) {
        const item = document.createElement('div');
        item.className = 'shared-file-item';

        const sizeStr = formatSize(file.size);
        item.innerHTML = `
            <div class="file-icon">${iconForFile(file.name)}</div>
            <div class="file-info">
                <div class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</div>
                <div class="file-path">${escapeHtml(file.topic)} · ${sizeStr}</div>
            </div>
            <div class="file-actions">
                <a class="file-action-btn" href="${file.url}" download title="Download" onclick="event.stopPropagation();"><i class="fa-solid fa-download"></i></a>
                <a class="file-action-btn" href="${file.htmlUrl}" target="_blank" title="GitHub" onclick="event.stopPropagation();"><i class="fa-brands fa-github"></i></a>
            </div>`;

        item.addEventListener('click', () => {
            document.querySelectorAll('.shared-file-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            loadPreview(file);
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
       PREVIEW WRAPPER
       ---------------------------------------------------------- */
    function clearPreview() {
        const header = document.getElementById('sharedPreviewHeader');
        const content = document.getElementById('sharedPreviewContent');
        if (header) header.style.display = 'none';
        if (content) {
            content.innerHTML = `
                <div class="mt-8 text-center text-[var(--text-muted)] h-full flex flex-col justify-center items-center">
                    <i class="fa-regular fa-folder-open text-5xl mb-4 opacity-50"></i>
                    <div class="text-lg"><span data-lang-de>Datei auswählen</span><span data-lang-en style="display:none;">Select a file</span></div>
                </div>`;
        }
        if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') App.i18n.applyLangToDOM();
    }

    async function loadPreview(file) {
        const header = document.getElementById('sharedPreviewHeader');
        const title = document.getElementById('sharedPreviewTitle');
        const dlBtn = document.getElementById('sharedPreviewDownload');
        const content = document.getElementById('sharedPreviewContent');

        if (!header || !content) return;

        header.style.display = 'flex';
        title.textContent = file.name;
        dlBtn.href = file.url;
        dlBtn.setAttribute('download', file.name);
        
        content.innerHTML = `<div class="p-8 text-center text-[var(--text-muted)] animate-pulse"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading preview…</div>`;

        const ext = file.name.split('.').pop().toLowerCase();

        try {
            if (ext === 'html' || ext === 'htm') {
                const htmlText = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', file.url, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) resolve(xhr.responseText);
                            else reject(new Error('Failed to fetch HTML: ' + xhr.status));
                        }
                    };
                    xhr.send();
                });

                const baseUrl = file.url.substring(0, file.url.lastIndexOf('/') + 1);
                const injectedHtml = htmlText.replace(/<head>/i, `<head><base href="${baseUrl}">`);

                content.innerHTML = `<iframe style="width: 100%; height: 100%; border: none; background: white;"></iframe>`;
                content.querySelector('iframe').srcdoc = injectedHtml;
            } 
            else if (ext === 'pdf') {
                if (!window.pdfjsLib) throw new Error('PDF engine missing');
                content.innerHTML = ''; 
                const canvasContainer = document.createElement('div');
                canvasContainer.style.display = 'flex';
                canvasContainer.style.flexDirection = 'column';
                canvasContainer.style.alignItems = 'center';
                canvasContainer.style.gap = '1rem';
                canvasContainer.style.padding = '1rem';
                content.appendChild(canvasContainer);

                const pdf = await pdfjsLib.getDocument(file.url).promise;
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement('canvas');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    canvas.style.maxWidth = '100%';
                    canvas.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                    canvasContainer.appendChild(canvas);
                    const ctx = canvas.getContext('2d');
                    await page.render({ canvasContext: ctx, viewport }).promise;
                }
            } 
            else if (ext === 'docx') {
                if (!window.mammoth) throw new Error('Mammoth engine missing');
                const arrayBuffer = await fetchRawBuffer(file.url);
                const result = await window.mammoth.convertToHtml({ arrayBuffer });
                content.innerHTML = `<div class="p-8" style="background: white; color: black; border-radius: 0.5rem; min-height: 100%;">${result.value || '<p style="font-style: italic; color: #666;">[Empty Document]</p>'}</div>`;
            } 
            else if (ext === 'pptx') {
                if (!window.JSZip) throw new Error('JSZip engine missing');
                const arrayBuffer = await fetchRawBuffer(file.url);
                const zip = await JSZip.loadAsync(arrayBuffer);
                let slideFiles = Object.keys(zip.files).filter(f => f.match(/^ppt\/slides\/slide\d+\.xml$/));
                slideFiles.sort((a, b) => parseInt(a.match(/slide(\d+)/)[1]) - parseInt(b.match(/slide(\d+)/)[1]));
                
                content.innerHTML = '';
                if (!slideFiles.length) {
                    content.innerHTML = '<div class="p-8 text-center text-[var(--text-muted)] italic">No text slides found.</div>';
                } else {
                    for (let i = 0; i < slideFiles.length; i++) {
                        const slideXml = await zip.files[slideFiles[i]].async('string');
                        const texts = (slideXml.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || []).map(t => t.replace(/<[^>]*>/g, '')).filter(Boolean);
                        const slideDiv = document.createElement('div');
                        slideDiv.className = 'p-6 mb-4 rounded bg-[var(--panel-color)] border border-[var(--panel-border)]';
                        slideDiv.innerHTML = `
                            <div class="text-xs font-bold text-orange-500 mb-2 uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Slide ${i+1}</div>
                            ${texts.length ? texts.map(t => `<p class="mb-2 text-sm text-[var(--text-color)]">${escapeHtml(t)}</p>`).join('') : '<span class="text-[var(--text-muted)] italic">[Graphical slide]</span>'}
                        `;
                        content.appendChild(slideDiv);
                    }
                }
            } 
            else if (/\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i.test(ext)) {
                content.innerHTML = `<div class="flex items-center justify-center h-full p-4"><img src="${file.url}" style="max-width: 100%; max-height: 100%; object-fit: contain;"></div>`;
            }
            else {
                content.innerHTML = `
                    <div class="p-8 flex flex-col items-center justify-center text-center h-full">
                        <div class="text-6xl mb-4 opacity-50">${iconForFile(file.name)}</div>
                        <div class="text-lg font-bold mb-2">${escapeHtml(file.name)}</div>
                        <div class="text-sm text-[var(--text-muted)] mb-6">Preview not supported for this file type.</div>
                        <a href="${file.url}" download class="ctrl-btn px-6 py-2 bg-[var(--info-box)] border border-[var(--border-color)] rounded text-sm"><i class="fa-solid fa-download"></i> Download File</a>
                    </div>
                `;
            }
        } catch (err) {
            console.error(err);
            content.innerHTML = `<div class="p-8 text-center text-red-500"><i class="fa-solid fa-triangle-exclamation text-2xl mb-2"></i><br>Failed to load preview.<br><span class="text-xs">${escapeHtml(err.message)}</span></div>`;
        }
    }

    function refresh() {
        Object.keys(sharedFilesCache).forEach(k => { delete sharedFilesCache[k]; });
        bootstrap();
    }

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
        clearPreview();
    }

    App.sharedFiles = {
        open,
        close,
        bootstrap,
        refresh,
        switchTab,
        onSearch,
        renderSharedFileList,
        loadPreview,
        clearPreview,
        getAllSharedFiles
    };
})();