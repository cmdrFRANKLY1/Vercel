/**
 * Viona - Combined PDF Viewer, PowerPoint Viewer, HTMLs Viewer, Berichtsheft Viewer, and DOCs Viewer
 * Single JavaScript file that can be loaded into any HTML page
 */

(function() {
    "use strict";

    let pdfjsLib = window.pdfjsLib;
    if (typeof pdfjsLib === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
        script.onload = function() {
            pdfjsLib = window['pdfjs-dist/build/pdf'];
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
            console.log('PDF.js loaded');
            initViona();
        };
        script.onerror = function() {
            console.error('PDF.js load failed');
            document.body.innerHTML = '<div style="color:red;padding:20px;">PDF.js load failed. Please check network.</div>';
        };
        document.head.appendChild(script);
    } else {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        initViona();
    }

    let JSZip = window.JSZip;
    if (typeof JSZip === 'undefined') {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        s.onload = function() {
            JSZip = window.JSZip;
            console.log('JSZip loaded');
        };
        s.onerror = function() {
            console.error('JSZip load failed');
        };
        document.head.appendChild(s);
    } else {
        JSZip = window.JSZip;
    }

    let mammoth = window.mammoth;
    if (typeof mammoth === 'undefined') {
        const mScript = document.createElement('script');
        mScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
        mScript.onload = function() {
            mammoth = window.mammoth;
            console.log('Mammoth.js loaded');
        };
        mScript.onerror = function() {
            console.error('Mammoth.js load failed');
        };
        document.head.appendChild(mScript);
    } else {
        mammoth = window.mammoth;
    }

    function initViona() {
        if (!document.getElementById('app')) {
            buildVionaUI();
        }

        // DOM refs
        const $ = id => document.getElementById(id);
        const pagesContainer = $('pages-container');
        const statusOverlay = $('statusOverlay');
        const statusText = $('statusText');
        const viewerContainer = $('viewer-container');
        const fileListContainer = $('fileListContainer');
        const sidebarHeader = $('sidebarHeader');
        const searchInput = $('searchInput');
        const searchClear = $('searchClear');
        const searchCount = $('searchCount');
        const refreshBtn = $('refreshBtn');
        const btnPrev = $('btnPrev'),
            btnNext = $('btnNext'),
            btnZoomIn = $('btnZoomIn'),
            btnZoomOut = $('btnZoomOut');
        const overlayPrev = $('overlayPrev'),
            overlayNext = $('overlayNext');
        const numDisplay = $('pageNum'),
            countDisplay = $('pageCount');
        const pdfNavGroup = $('pdfNavGroup');
        const viewPdfBtn = $('viewPdfBtn'),
            viewPptBtn = $('viewPptBtn'),
            viewHtmlBtn = $('viewHtmlBtn'),
            viewDocBtn = $('viewDocBtn'),
            viewReportBtn = $('viewReportBtn'),
            viewCalBtn = $('viewCalBtn'),
            viewDetailBtn = $('viewDetailBtn'),
            viewTimelineBtn = $('viewTimelineBtn');
        const terminalGrid = $('terminal-grid');
        const workspace = $('workspace');
        const outputArea = $('outputArea');
        const mainPane = $('mainPane');

        let activeTab = 'detailed'; // 'pdf', 'ppt', 'htmls', 'docs', 'report', 'calendar', 'detailed', 'timeline'
        let pdfFiles = [];
        let pptFiles = [];
        let htmlFiles = [];
        let docFiles = [];
        
        let currentPdfDoc = null;
        let pageNum = 1;
        let scale = 1.2;
        let viewMode = 'single';
        let pageObserver = null;
        let zoomTimeout = null;

        // Berichtsheft state
        let allReports = [];
        let expandedCards = new Set();
        let searchTerm = '';
        let isLoading = false;
        const PARSE_DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
        const STOP_DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
        const strings = {
            daysList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            monthNames: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
            noReports: "NO REPORTS FOUND",
            searchResults: "results",
            noSearchResults: "no results",
            ho: "HOME OFFICE",
            fetching: "Fetching repository files...",
            parsing: "Parsing structures...",
            done: "Loading complete."
        };
        const germanHolidays = {
            '2024-01-01': 'New Year', '2024-05-01': 'Labor Day', '2024-10-03': 'German Unity', '2024-12-25': 'Christmas',
            '2025-01-01': 'New Year', '2025-05-01': 'Labor Day', '2025-10-03': 'German Unity', '2025-12-25': 'Christmas',
            '2026-01-01': 'New Year', '2026-05-01': 'Labor Day', '2026-10-03': 'German Unity', '2026-12-25': 'Christmas'
        };

        function setStatus(msg, show) {
            if (show) {
                statusOverlay.style.display = 'block';
                pagesContainer.style.display = 'none';
                statusText.innerHTML = msg;
            } else {
                statusOverlay.style.display = 'none';
                pagesContainer.style.display = 'flex';
            }
        }

        function createVisibilityObserver() {
            if (pageObserver) pageObserver.disconnect();
            pageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const canvas = entry.target;
                        const pNum = parseInt(canvas.dataset.page);
                        const renderKey = `${pNum}-${scale}`;
                        if (canvas.dataset.renderedKey !== renderKey) {
                            renderCanvas(pNum, canvas).then(() => {
                                canvas.dataset.renderedKey = renderKey;
                            });
                        }
                        if (entry.intersectionRatio > 0.4 || (entry.isIntersecting && viewMode !== 'single')) {
                            pageNum = pNum;
                            numDisplay.textContent = pageNum;
                            updateNavButtons();
                        }
                    }
                });
            }, {
                root: viewerContainer,
                threshold: [0.1, 0.5]
            });
        }

        async function renderCanvas(num, canvas) {
            try {
                const page = await currentPdfDoc.getPage(num);
                const viewport = page.getViewport({ scale: scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                canvas.style.width = viewport.width + 'px';
                canvas.style.height = viewport.height + 'px';
                const ctx = canvas.getContext('2d');
                await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            } catch (err) {
                console.error('Render error', num, err);
            }
        }

        function updateNavButtons() {
            if (!currentPdfDoc) return;
            btnPrev.disabled = pageNum <= 1;
            btnNext.disabled = pageNum >= currentPdfDoc.numPages;
            overlayPrev.disabled = pageNum <= 1;
            overlayNext.disabled = (viewMode === 'facing') ? pageNum >= currentPdfDoc.numPages - 1 : pageNum >= currentPdfDoc.numPages;
            
            const isPdfView = activeTab === 'pdf';
            overlayPrev.style.display = (isPdfView && viewMode !== 'continuous') ? 'flex' : 'none';
            overlayNext.style.display = (isPdfView && viewMode !== 'continuous') ? 'flex' : 'none';
        }

        function renderPdfView() {
            if (!currentPdfDoc) return;
            setStatus('', false);
            pagesContainer.innerHTML = '';
            pagesContainer.className = `mode-${viewMode}`;
            if (viewMode === 'continuous') {
                createVisibilityObserver();
                for (let i = 1; i <= currentPdfDoc.numPages; i++) {
                    const canvas = document.createElement('canvas');
                    canvas.className = 'pdf-page-canvas';
                    canvas.dataset.page = i;
                    canvas.style.height = (800 * scale) + 'px';
                    canvas.style.width = (600 * scale) + 'px';
                    pagesContainer.appendChild(canvas);
                    pageObserver.observe(canvas);
                }
            } else {
                if (pageObserver) pageObserver.disconnect();
                numDisplay.textContent = pageNum;
                const canvas = document.createElement('canvas');
                canvas.className = 'pdf-page-canvas';
                pagesContainer.appendChild(canvas);
                renderCanvas(pageNum, canvas);
                updateNavButtons();
            }
        }

        function loadPDF(url, fileName) {
            setStatus('Loading PDF...<br>' + fileName, true);
            btnZoomIn.disabled = false;
            btnZoomOut.disabled = false;
            const loadingTask = pdfjsLib.getDocument(url);
            loadingTask.promise.then(function(pdfDoc_) {
                currentPdfDoc = pdfDoc_;
                countDisplay.textContent = currentPdfDoc.numPages;
                pageNum = 1;
                btnPrev.disabled = false;
                btnNext.disabled = false;
                scale = 1.2;
                renderPdfView();
            }).catch(function(err) {
                console.error('PDF load error', err);
                setStatus('Failed to load PDF.<br>CORS or Network Error.', true);
                btnZoomIn.disabled = true;
                btnZoomOut.disabled = true;
            });
        }

        async function loadPPTX(url, fileName) {
            setStatus('Parsing PowerPoint presentation...<br>' + fileName, true);
            btnZoomIn.disabled = true;
            btnZoomOut.disabled = true;
            
            try {
                let resp = await fetch(url);
                if (!resp.ok) resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
                if (!resp.ok) throw new Error('Failed to download PPTX file.');
                const arrayBuffer = await resp.arrayBuffer();
                const zip = await JSZip.loadAsync(arrayBuffer);
                
                let slideFiles = Object.keys(zip.files).filter(f => f.match(/^ppt\/slides\/slide\d+\.xml$/));
                slideFiles.sort((a, b) => {
                    const numA = parseInt(a.match(/slide(\d+)\.xml/)[1]);
                    const numB = parseInt(b.match(/slide(\d+)\.xml/)[1]);
                    return numA - numB;
                });

                pagesContainer.innerHTML = '';
                pagesContainer.className = 'mode-single';
                setStatus('', false);

                if (slideFiles.length === 0) {
                    pagesContainer.innerHTML = '<div style="padding:30px;color:var(--sub-color);text-align:center;">No slides found in presentation.</div>';
                    return;
                }

                for (let i = 0; i < slideFiles.length; i++) {
                    const slideXml = await zip.files[slideFiles[i]].async('string');
                    const textMatches = slideXml.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || [];
                    const slideTexts = textMatches.map(t => t.replace(/<[^>]*>/g, '')).filter(Boolean);

                    const slideCard = document.createElement('div');
                    slideCard.className = 'pptx-slide-card';
                    slideCard.innerHTML = `
                        <div class="slide-header">SLIDE ${i + 1} / ${slideFiles.length}</div>
                        <div class="slide-body">
                            ${slideTexts.length ? slideTexts.map(txt => `<p>${escapeHTML(txt)}</p>`).join('') : '<span style="color:var(--sub-color);font-style:italic;">[Graphical Slide / No text payload]</span>'}
                        </div>
                    `;
                    pagesContainer.appendChild(slideCard);
                }
            } catch (err) {
                console.error('PPTX parse error', err);
                setStatus('Failed to parse PowerPoint file.<br>' + err.message, true);
            }
        }

        async function loadHTMLPreview(url, fileName) {
            setStatus('Loading HTML document...<br>' + fileName, true);
            pagesContainer.innerHTML = '';
            pagesContainer.className = 'mode-single';
            btnZoomIn.disabled = true;
            btnZoomOut.disabled = true;
            
            try {
                let resp = await fetch(url);
                if (!resp.ok) resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
                if (!resp.ok) throw new Error('Failed to fetch HTML document.');
                const htmlText = await resp.text();
                
                const iframe = document.createElement('iframe');
                iframe.className = 'html-preview-frame';
                iframe.sandbox = 'allow-scripts allow-same-origin allow-forms';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.background = '#ffffff';
                iframe.style.minHeight = '750px';
                iframe.style.borderRadius = '4px';
                
                pagesContainer.appendChild(iframe);
                
                // Write via srcdoc or blob for reliable rendering
                iframe.srcdoc = htmlText;
                
                setTimeout(() => setStatus('', false), 300);
            } catch (err) {
                console.error('HTML preview error', err);
                setStatus('Failed to load HTML file.<br>' + err.message, true);
            }
        }

        async function loadDOCPreview(url, fileName) {
            setStatus('Rendering Word Document...<br>' + fileName, true);
            pagesContainer.innerHTML = '';
            pagesContainer.className = 'mode-single';
            btnZoomIn.disabled = true;
            btnZoomOut.disabled = true;

            try {
                let resp = await fetch(url);
                if (!resp.ok) resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
                if (!resp.ok) throw new Error('Failed to fetch document file.');
                const arrayBuffer = await resp.arrayBuffer();

                if (window.mammoth) {
                    const result = await window.mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
                    const docContainer = document.createElement('div');
                    docContainer.className = 'doc-preview-container';
                    docContainer.innerHTML = result.value || '<p style="color:var(--sub-color);">[Empty document]</p>';
                    pagesContainer.appendChild(docContainer);
                    setStatus('', false);
                } else {
                    throw new Error('Mammoth.js parser not loaded yet.');
                }
            } catch (err) {
                console.error('DOC parse error', err);
                setStatus('Failed to render Word document.<br>' + err.message, true);
            }
        }

        async function fetchRepoDirectory(folderName) {
            let resp = await fetch(`https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/${folderName}`);
            if (!resp.ok) resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(`https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/${folderName}`));
            if (!resp.ok) throw new Error(`GitHub API error for ${folderName}`);
            return await resp.json();
        }

        async function fetchAllRepos() {
            try {
                fileListContainer.innerHTML = '<div style="padding:15px;color:var(--sub-color);text-align:center;">Fetching files...</div>';
                setStatus('Connecting to GitHub repository...', true);

                try {
                    const pdfData = await fetchRepoDirectory('BGP-DS');
                    pdfFiles = pdfData.filter(i => i.name.toLowerCase().endsWith('.pdf'));
                } catch(e) { console.warn('PDF fetch warning', e); }

                try {
                    const pptData = await fetchRepoDirectory('PowerPoint');
                    pptFiles = pptData.filter(i => {
                        const ext = i.name.toLowerCase();
                        return ext.endsWith('.pptx') || ext.endsWith('.ppt');
                    });
                } catch(e) { console.warn('PPT fetch warning', e); }

                try {
                    const htmlData = await fetchRepoDirectory('HTMLs');
                    htmlFiles = htmlData.filter(i => i.name.toLowerCase().endsWith('.html') || i.name.toLowerCase().endsWith('.htm'));
                } catch(e) { console.warn('HTML fetch warning', e); }

                try {
                    const docData = await fetchRepoDirectory('DOCs');
                    docFiles = docData.filter(i => {
                        const ext = i.name.toLowerCase();
                        return ext.endsWith('.doc') || ext.endsWith('.docx');
                    });
                } catch(e) { console.warn('DOC fetch warning', e); }

                renderSidebarList();
                setStatus('Select a file from sidebar', true);
            } catch (err) {
                fileListContainer.innerHTML = '<div style="padding:15px;color:var(--danger-color);text-align:center;">Error loading repo lists.</div>';
                setStatus('Connection Error: ' + err.message, true);
                console.error(err);
            }
        }

        function renderSidebarList(filterTerm = '') {
            fileListContainer.innerHTML = '';
            let currentList = [];
            let headerTitle = '';
            let fileIconSvg = '';

            if (activeTab === 'pdf') {
                currentList = pdfFiles;
                headerTitle = 'BGP-DS Documents (.pdf)';
                fileIconSvg = '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>';
            } else if (activeTab === 'ppt') {
                currentList = pptFiles;
                headerTitle = 'PowerPoint Presentations (.pptx)';
                fileIconSvg = '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>';
            } else if (activeTab === 'htmls') {
                currentList = htmlFiles;
                headerTitle = 'HTML Files (.html)';
                fileIconSvg = '<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
            } else if (activeTab === 'docs') {
                currentList = docFiles;
                headerTitle = 'Word Documents (.doc/.docx)';
                fileIconSvg = '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>';
            } else {
                return;
            }

            sidebarHeader.textContent = headerTitle;
            const term = filterTerm.toLowerCase();
            const filtered = currentList.filter(f => f.name.toLowerCase().includes(term));
            
            if (!filtered.length) {
                fileListContainer.innerHTML = '<div style="padding:15px;color:var(--sub-color);font-size:12px;">No matches found.</div>';
                return;
            }

            filtered.forEach(file => {
                const el = document.createElement('div');
                el.className = 'pdf-item';
                el.title = file.name;
                el.innerHTML = `<div class="pdf-icon">${fileIconSvg}</div><div class="pdf-name">${file.name}</div>`;
                
                el.addEventListener('click', () => {
                    document.querySelectorAll('.pdf-item').forEach(i => i.classList.remove('active'));
                    el.classList.add('active');
                    
                    if (activeTab === 'pdf') {
                        const rawUrl = `https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/BGP-DS/${encodeURIComponent(file.name)}`;
                        loadPDF(rawUrl, file.name);
                    } else if (activeTab === 'ppt') {
                        const rawUrl = `https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/PowerPoint/${encodeURIComponent(file.name)}`;
                        loadPPTX(rawUrl, file.name);
                    } else if (activeTab === 'htmls') {
                        const rawUrl = `https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/HTMLs/${encodeURIComponent(file.name)}`;
                        loadHTMLPreview(rawUrl, file.name);
                    } else if (activeTab === 'docs') {
                        const rawUrl = `https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/DOCs/${encodeURIComponent(file.name)}`;
                        loadDOCPreview(rawUrl, file.name);
                    }
                });
                fileListContainer.appendChild(el);
            });
        }

        function escapeHTML(str) {
            if (!str) return '';
            const d = document.createElement('div');
            d.textContent = str;
            return d.innerHTML;
        }

        function printHTML(html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            outputArea.appendChild(div);
            mainPane.scrollTop = mainPane.scrollHeight;
        }

        function clearOutput() {
            outputArea.innerHTML = '';
        }

        function extractDayContent(text, dayName) {
            const patterns = [
                new RegExp(dayName + '[\\s\\-:;]*([\\s\\S]*?)(?=\\n\\s*(?:' + STOP_DAY_NAMES.join('|') + ')|$)', 'i'),
                new RegExp('\\|\\s*' + dayName + '\\s*\\|([^|]*)\\|', 'i')
            ];
            for (const pattern of patterns) {
                const match = text.match(pattern);
                if (match) {
                    let content = match[1].trim()
                        .replace(/(?:\n|^)\s*(?:Samstag|Sonntag)\b[\s\S]*$/i, '')
                        .replace(/\b\d+\s*(?:h|Std\.|Stunden)\b/gi, '')
                        .replace(/[–\-]\s*Selbständig.*$/gim, '')
                        .replace(/^[•\-*+]\s*/, '');
                    const lines = content.split('\n').map(l => l.trim()).filter(l => l && !l.match(/^[-–]{3,}$/));
                    const hasHO = lines.some(l => /^HO$/i.test(l) || /home office/i.test(l));
                    const filteredLines = lines.filter(l => !/^HO$/i.test(l) && !/home office/i.test(l));
                    if (filteredLines.length === 0 && hasHO) return { content: '🏠 ' + strings.ho, isHO: true };
                    return { content: filteredLines.join('\n') || '—', isHO: hasHO };
                }
            }
            return { content: '—', isHO: false };
        }

        async function fetchAndParseDocx(report) {
            try {
                let attempts = 0;
                while (typeof JSZip === 'undefined' && attempts < 50) {
                    await new Promise(r => setTimeout(r, 100));
                    attempts++;
                }
                if (typeof JSZip === 'undefined') return;
                let resp = await fetch(report.url);
                if (!resp.ok) resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(report.url));
                if (!resp.ok) return;
                const arrayBuffer = await resp.arrayBuffer();
                if (!arrayBuffer || arrayBuffer.byteLength === 0) return;
                const zip = await JSZip.loadAsync(arrayBuffer);
                const docFile = zip.file('word/document.xml');
                if (!docFile) return;
                const xml = await docFile.async('string');
                const pRegex = /<w:p[^>]*>([\s\S]*?)<\/w:p>/g;
                let paragraphs = [], pMatch;
                while ((pMatch = pRegex.exec(xml)) !== null) {
                    const textContent = (pMatch[1].match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [])
                        .map(x => x.replace(/<[^>]*>/g, '').trim()).filter(Boolean);
                    if (textContent.length) paragraphs.push(textContent.join(' '));
                }
                const fullText = paragraphs.join('\n');
                const days = {};
                for (const dn of PARSE_DAY_NAMES) {
                    days[dn] = extractDayContent(fullText, dn);
                }
                report.days = days;
                const dateMatch = fullText.match(/(?:vom|Ausbildungswoche vom)[:\s]*(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/i) ||
                    fullText.match(/(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/);
                if (dateMatch) {
                    let d = parseInt(dateMatch[1]), mo = parseInt(dateMatch[2]) - 1, y = parseInt(dateMatch[3]);
                    if (y < 100) y += 2000;
                    const parsed = new Date(y, mo, d);
                    if (!isNaN(parsed.getTime())) {
                        const day = parsed.getDay();
                        const diff = parsed.getDate() - day + (day === 0 ? -6 : 1);
                        report.mondayDate = new Date(parsed.setDate(diff));
                    }
                }
            } catch (e) {
                console.warn('Parse error', report.name, e);
            }
        }

        function performSearch(term) {
            if (!term || term.trim().length < 2) return allReports;
            const lowerTerm = term.toLowerCase().trim();
            return allReports.filter(r => {
                if (r.days) {
                    for (const [dn, d] of Object.entries(r.days)) {
                        if (d && d.content && d.content !== '—' && d.content.toLowerCase().includes(lowerTerm)) return true;
                    }
                }
                return r.name && r.name.toLowerCase().includes(lowerTerm);
            });
        }

        function highlightText(text, term) {
            if (!term || term.trim().length < 2 || !text) return escapeHTML(text);
            const lowerText = text.toLowerCase(), lowerTerm = term.toLowerCase().trim();
            const idx = lowerText.indexOf(lowerTerm);
            if (idx === -1) return escapeHTML(text);
            return escapeHTML(text.substring(0, idx)) +
                `<span class="highlight">${escapeHTML(text.substring(idx, idx + lowerTerm.length))}</span>` +
                escapeHTML(text.substring(idx + lowerTerm.length));
        }

        function renderListView() {
            clearOutput();
            let reports = allReports;
            let searchActive = false;
            if (searchTerm && searchTerm.trim().length >= 2) {
                reports = performSearch(searchTerm);
                searchActive = true;
                printHTML(`<div class="search-info">&gt; ${reports.length} ${strings.searchResults} for "${escapeHTML(searchTerm)}"</div>`);
            }
            if (!reports.length) {
                printHTML('<div class="empty-state"><div style="font-size:24px;">📁</div><div>' + strings.noReports + '</div></div>');
                return;
            }
            for (const r of reports) {
                const collapsed = expandedCards.has(r.name) ? '' : 'collapsed';
                let title = r.name.replace(/\.docx?$/i, '');
                if (r.mondayDate) {
                    const end = new Date(r.mondayDate);
                    end.setDate(end.getDate() + 4);
                    const fmt = (d) => String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getDate()).padStart(2, '0') + '/' + String(d.getFullYear()).slice(-2);
                    title = 'Week: ' + fmt(r.mondayDate) + ' → ' + fmt(end);
                }
                let html = '<div class="report-card ' + collapsed + '" data-name="' + escapeHTML(r.name) + '">' +
                    '<div class="card-header"><div class="card-title"><span style="color:var(--accent-color);">📄</span> ' + escapeHTML(title) + '</div>' +
                    '<div class="card-badges">' + (r.isFisi ? '<span class="badge">[FISI]</span>' : '') + '<span class="chevron"></span></div></div>' +
                    '<div class="card-body"><div class="day-grid">';
                for (let i = 0; i < PARSE_DAY_NAMES.length; i++) {
                    const dayName = PARSE_DAY_NAMES[i];
                    const d = r.days ? r.days[dayName] : null;
                    const has = d && d.content && d.content !== '—';
                    let dateSub = '';
                    if (r.mondayDate) {
                        const dd = new Date(r.mondayDate);
                        dd.setDate(dd.getDate() + i);
                        dateSub = String(dd.getMonth() + 1).padStart(2, '0') + '/' + String(dd.getDate()).padStart(2, '0') + '/' + String(dd.getFullYear()).slice(-2);
                    }
                    let contentHTML = has ? ((searchActive && searchTerm) ? highlightText(d.content, searchTerm) : escapeHTML(d.content)) : '<span class="day-empty">NO ENTRY</span>';
                    const isHO = d && d.isHO;
                    html += `<div class="day-card ${isHO ? 'ho-day' : ''}"><div class="day-name"><span>[${strings.daysList[i].toUpperCase()}]</span>${dateSub ? '<span class="day-date-sub">' + dateSub + '</span>' : ''}</div>${isHO ? '<span class="badge-ho">[HO]</span>' : ''}<div class="day-content">${contentHTML}</div></div>`;
                }
                html += '</div></div></div>';
                printHTML(html);
            }
            document.querySelectorAll('.card-header').forEach(h => {
                h.addEventListener('click', function() {
                    const card = this.closest('.report-card');
                    const name = card.dataset.name;
                    if (card.classList.contains('collapsed')) {
                        document.querySelectorAll('.report-card').forEach(c => c.classList.add('collapsed'));
                        expandedCards.clear();
                        card.classList.remove('collapsed');
                        expandedCards.add(name);
                    } else {
                        card.classList.add('collapsed');
                        expandedCards.delete(name);
                    }
                });
            });
        }

        function renderCalendarView() {
            clearOutput();
            const monthsWithData = new Map();
            for (const r of allReports) {
                if (!r.mondayDate || !r.days) continue;
                PARSE_DAY_NAMES.forEach((dn, di) => {
                    const d = r.days[dn];
                    if (d && d.content && d.content !== '—') {
                        const exact = new Date(r.mondayDate);
                        exact.setDate(exact.getDate() + di);
                        monthsWithData.set(exact.getFullYear() + '-' + exact.getMonth(), { year: exact.getFullYear(), month: exact.getMonth() });
                    }
                });
            }
            if (!monthsWithData.size) {
                printHTML('<div class="empty-state"><div style="font-size:24px;">📅</div><div>NO CALENDAR DATA FOUND</div></div>');
                return;
            }
            Array.from(monthsWithData.values()).forEach(({ year, month }) => {
                const container = document.createElement('div');
                container.className = 'calendar-container';
                outputArea.appendChild(container);
                container.innerHTML = `<div class="calendar-header-controls"><span>&gt; ${strings.monthNames[month]} ${year} &lt;</span></div><div class="calendar-grid" id="cal-${year}-${month}"></div>`;
                const grid = container.querySelector('.calendar-grid');
                
                const firstDayOfMonth = new Date(year, month, 1).getDay();
                const emptySlots = (firstDayOfMonth === 0 || firstDayOfMonth === 6) ? 5 : (firstDayOfMonth - 1);
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                let html = strings.daysList.map(d => '<div class="cal-day-header">' + d.toUpperCase() + '</div>').join('');
                for (let e = 0; e < emptySlots; e++) html += '<div class="cal-cell empty"></div>';
                
                for (let i = 1; i <= daysInMonth; i++) {
                    const dateObj = new Date(year, month, i);
                    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) continue;
                    
                    // Check if report entry exists for this exact date
                    let matchContent = null;
                    for (const r of allReports) {
                        if (!r.mondayDate || !r.days) continue;
                        PARSE_DAY_NAMES.forEach((dn, di) => {
                            const exact = new Date(r.mondayDate);
                            exact.setDate(exact.getDate() + di);
                            if (exact.getFullYear() === year && exact.getMonth() === month && exact.getDate() === i) {
                                const d = r.days[dn];
                                if (d && d.content && d.content !== '—') matchContent = d.content;
                            }
                        });
                    }

                    html += `<div class="cal-cell ${matchContent ? 'has-entry' : ''}" ${matchContent ? 'data-content="' + escapeHTML(matchContent) + '"' : ''}><div class="cal-date">${i < 10 ? '0' + i : i}</div>${matchContent ? '<div class="cal-preview">' + escapeHTML(matchContent.substring(0, 30)) + '...</div>' : ''}</div>`;
                }
                grid.innerHTML = html;
            });

            // Click listener for calendar day entries
            outputArea.querySelectorAll('.cal-cell.has-entry').forEach(cell => {
                cell.addEventListener('click', () => {
                    const text = cell.getAttribute('data-content');
                    $('modalTitle').textContent = "DAY ENTRY DETAIL";
                    $('modalContent').textContent = text;
                    $('calendarModal').style.display = 'flex';
                });
            });
        }

        function renderDetailedStatsView() {
            clearOutput();
            const container = document.createElement('div');
            container.className = 'detailed-container';
            const totalWeeks = allReports.length;
            const totalEntries = allReports.reduce((acc, r) => acc + Object.values(r.days || {}).filter(d => d && d.content && d.content !== '—').length, 0);
            const maxPossible = totalWeeks * 5;
            const completionRate = maxPossible > 0 ? Math.round((totalEntries / maxPossible) * 100) : 0;
            const progress = totalWeeks > 0 ? Math.min(100, Math.round((totalWeeks / 104) * 100)) : 0;

            container.innerHTML = `
                <div style="font-size:12px;font-weight:700;color:var(--sub-color);text-transform:uppercase;margin-bottom:12px;">&gt; STATISTICS & METRICS</div>
                <div class="analytics-grid" style="margin-bottom:20px;">
                    <div class="analytics-card"><h3>TOTAL WEEKS</h3><div class="timer-display">${totalWeeks}</div><div class="stat-progress"><div class="stat-progress-fill" style="width:${progress}%"></div></div></div>
                    <div class="analytics-card"><h3>COMPLETION RATE</h3><div class="timer-display">${completionRate}%</div><div class="stat-progress"><div class="stat-progress-fill" style="width:${completionRate}%"></div></div></div>
                </div>
            `;
            outputArea.appendChild(container);
        }

        function renderTimelineView() {
            clearOutput();
            const allEntries = [];
            allReports.forEach(r => {
                if (!r.mondayDate || !r.days) return;
                PARSE_DAY_NAMES.forEach((dn, di) => {
                    const dayData = r.days[dn];
                    if (dayData && dayData.content && dayData.content !== '—') {
                        const date = new Date(r.mondayDate);
                        date.setDate(date.getDate() + di);
                        allEntries.push({ date, report: r, content: dayData.content, isHO: dayData.isHO || false });
                    }
                });
            });
            allEntries.sort((a, b) => b.date.getTime() - a.date.getTime());

            if (!allEntries.length) {
                printHTML('<div class="empty-state"><div style="font-size:24px;">⏱️</div><div>NO TIMELINE ENTRIES FOUND</div></div>');
                return;
            }

            const container = document.createElement('div');
            container.className = 'detailed-container';
            container.innerHTML = `<div style="font-size:14px;font-weight:700;margin-bottom:12px;">&gt; TIMELINE FEED</div>`;
            
            let filteredEntries = allEntries;
            if (searchTerm && searchTerm.trim().length >= 2) {
                const lowerTerm = searchTerm.toLowerCase().trim();
                filteredEntries = allEntries.filter(e => e.content.toLowerCase().includes(lowerTerm));
            }

            filteredEntries.slice(0, 40).forEach(entry => {
                const dateStr = entry.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
                const card = document.createElement('div');
                card.style.cssText = 'background:#232629;border:1px solid var(--border-solid);padding:12px;margin-bottom:10px;border-radius:4px;border-left:3px solid var(--accent-color);';
                card.innerHTML = `<div style="font-size:11px;color:var(--accent-color);margin-bottom:6px;font-weight:600;">[${dateStr}] ${escapeHTML(entry.report.name)} ${entry.isHO ? '🏠 [HO]' : ''}</div><div style="font-size:12px;color:#d1d2d3;white-space:pre-wrap;line-height:1.4;">${escapeHTML(entry.content)}</div>`;
                container.appendChild(card);
            });
            outputArea.appendChild(container);
        }

        async function fetchReportFiles() {
            let resp = await fetch('https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/Reports');
            if (!resp.ok) resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/Reports'));
            if (!resp.ok) throw new Error('API error');
            const data = await resp.json();
            return data.filter(i => i.type === 'file' && /\.docx?$/i.test(i.name)).map(item => {
                const rawUrl = 'https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/Reports/' + encodeURIComponent(item.name);
                let mondayDate = null;
                const m = item.name.match(/(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/);
                if (m) {
                    let d = parseInt(m[1]), mo = parseInt(m[2]) - 1, y = parseInt(m[3]);
                    if (y < 100) y += 2000;
                    const parsed = new Date(y, mo, d);
                    if (!isNaN(parsed.getTime())) {
                        const day = parsed.getDay();
                        const diff = parsed.getDate() - day + (day === 0 ? -6 : 1);
                        mondayDate = new Date(parsed.setDate(diff));
                    }
                }
                return { name: item.name, url: rawUrl, mondayDate, isFisi: /fisi/i.test(item.name), days: {} };
            }).sort((a, b) => (a.mondayDate?.getTime() || 0) - (b.mondayDate?.getTime() || 0));
        }

        async function loadReportData() {
            if (isLoading) return;
            isLoading = true;
            try {
                clearOutput();
                printHTML('<div style="color:var(--accent-color);">&gt; ' + strings.fetching + '</div>');
                const reports = await fetchReportFiles();
                if (!reports.length) throw new Error('No reports found');
                allReports = reports;
                for (let i = 0; i < allReports.length; i++) {
                    await fetchAndParseDocx(allReports[i]);
                }
                printHTML('<div style="color:var(--success-color);font-weight:700;">&gt; ' + strings.done + '</div>');
                switchView(activeTab);
            } catch (err) {
                clearOutput();
                printHTML('<div style="color:var(--danger-color);font-weight:700;">&gt; ERROR: ' + escapeHTML(err.message) + '</div>');
            } finally {
                isLoading = false;
            }
        }

        function switchView(tab) {
            activeTab = tab;
            const isDocViewer = (tab === 'pdf' || tab === 'ppt' || tab === 'htmls' || tab === 'docs');
            
            workspace.style.display = isDocViewer ? 'flex' : 'none';
            terminalGrid.style.display = isDocViewer ? 'none' : 'flex';
            
            [viewPdfBtn, viewPptBtn, viewHtmlBtn, viewDocBtn, viewReportBtn, viewCalBtn, viewDetailBtn, viewTimelineBtn].forEach(b => b.classList.remove('view-btn-active'));
            if (tab === 'pdf') viewPdfBtn.classList.add('view-btn-active');
            else if (tab === 'ppt') viewPptBtn.classList.add('view-btn-active');
            else if (tab === 'htmls') viewHtmlBtn.classList.add('view-btn-active');
            else if (tab === 'docs') viewDocBtn.classList.add('view-btn-active');
            else if (tab === 'report') viewReportBtn.classList.add('view-btn-active');
            else if (tab === 'calendar') viewCalBtn.classList.add('view-btn-active');
            else if (tab === 'detailed') viewDetailBtn.classList.add('view-btn-active');
            else if (tab === 'timeline') viewTimelineBtn.classList.add('view-btn-active');
            
            if (pdfNavGroup) {
                pdfNavGroup.style.display = (tab === 'pdf') ? 'flex' : 'none';
            }
            
            if (isDocViewer) {
                renderSidebarList(searchTerm);
            } else {
                if (!allReports.length) {
                    loadReportData();
                    return;
                }
                if (tab === 'report') renderListView();
                else if (tab === 'calendar') renderCalendarView();
                else if (tab === 'detailed') renderDetailedStatsView();
                else if (tab === 'timeline') renderTimelineView();
            }
        }

        btnPrev.addEventListener('click', () => {
            pageNum = Math.max(1, pageNum - 1);
            renderPdfView();
        });
        btnNext.addEventListener('click', () => {
            if (currentPdfDoc) pageNum = Math.min(currentPdfDoc.numPages, pageNum + 1);
            renderPdfView();
        });
        btnZoomIn.addEventListener('click', () => {
            scale = Math.min(scale * 1.25, 5.0);
            renderPdfView();
        });
        btnZoomOut.addEventListener('click', () => {
            scale = Math.max(scale / 1.25, 0.25);
            renderPdfView();
        });
        overlayPrev.addEventListener('click', () => {
            pageNum = Math.max(1, pageNum - 1);
            renderPdfView();
        });
        overlayNext.addEventListener('click', () => {
            if (currentPdfDoc) pageNum = Math.min(currentPdfDoc.numPages, pageNum + 1);
            renderPdfView();
        });

        viewPdfBtn.addEventListener('click', () => switchView('pdf'));
        viewPptBtn.addEventListener('click', () => { switchView('ppt'); fetchAllRepos(); });
        viewHtmlBtn.addEventListener('click', () => { switchView('htmls'); fetchAllRepos(); });
        viewDocBtn.addEventListener('click', () => { switchView('docs'); fetchAllRepos(); });
        viewReportBtn.addEventListener('click', () => switchView('report'));
        viewCalBtn.addEventListener('click', () => switchView('calendar'));
        viewDetailBtn.addEventListener('click', () => switchView('detailed'));
        viewTimelineBtn.addEventListener('click', () => switchView('timeline'));

        refreshBtn.addEventListener('click', () => {
            if (activeTab === 'pdf' || activeTab === 'ppt' || activeTab === 'htmls' || activeTab === 'docs') fetchAllRepos();
            else loadReportData();
        });

        searchInput.addEventListener('input', () => {
            searchTerm = searchInput.value;
            searchClear.style.display = searchTerm ? 'inline' : 'none';
            if (activeTab === 'pdf' || activeTab === 'ppt' || activeTab === 'htmls' || activeTab === 'docs') renderSidebarList(searchTerm);
            else switchView(activeTab);
        });

        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchTerm = '';
            searchClear.style.display = 'none';
            if (activeTab === 'pdf' || activeTab === 'ppt' || activeTab === 'htmls' || activeTab === 'docs') renderSidebarList();
            else switchView(activeTab);
        });

        // Modal close bindings
        const closeModal = () => { $('calendarModal').style.display = 'none'; };
        $('closeModalBtn').addEventListener('click', closeModal);
        $('calendarModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });
        $('copyModalBtn').addEventListener('click', () => {
            navigator.clipboard.writeText($('modalContent').textContent).catch(() => {});
        });

        fetchAllRepos();
        loadReportData();
    }

    function buildVionaUI() {
        const style = document.createElement('style');
        style.textContent = `
            * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
            input, textarea, .day-content, .slide-body, .doc-preview-container, iframe { user-select: text !important; }
            :root {
                --bg-color: #31363b; --text-color: #eff0f1; --font-family: 'Noto Sans', 'Segoe UI', sans-serif;
                --border-solid: #1d2023; --accent-color: #3daee9; --warning-color: #f67400;
                --danger-color: #da4453; --success-color: #27ae60; --sub-color: #888888;
                --panel-bg: #2a2e32; --sidebar-bg: #232629; --viewer-bg: #1a1c1e;
            }
            body, html { height: 100vh; background: var(--bg-color); color: var(--text-color); font-family: var(--font-family); font-size: 13px; overflow: hidden; }
            #app { display: flex; flex-direction: column; height: 100vh; width: 100vw; background: var(--bg-color); overflow: hidden; }
            #waybar { height: 38px; min-height: 38px; background: var(--panel-bg); display: flex; justify-content: space-between; align-items: center; padding: 0 12px; border-bottom: 1px solid var(--border-solid); z-index: 100; flex-wrap: nowrap; overflow-x: auto; }
            .waybar-group { display: flex; align-items: center; gap: 6px; height: 100%; }
            .waybar-btn { cursor: pointer; padding: 0 10px; height: 28px; display: flex; align-items: center; gap: 6px; font-weight: 500; color: var(--text-color); background: transparent; border: 1px solid transparent; border-radius: 4px; font-size: 12px; transition: all 0.15s ease; white-space: nowrap; }
            .waybar-btn:hover { background: rgba(61, 174, 233, 0.15); border-color: rgba(61, 174, 233, 0.3); }
            .waybar-btn svg { width: 14px; height: 14px; fill: currentColor; }
            .view-btn-active { background: var(--accent-color); color: #fff; border-color: #2980b9; }
            .waybar-btn:disabled { opacity: 0.3; cursor: not-allowed; }
            #searchContainer { display: flex; align-items: center; gap: 6px; padding: 0 8px; background: #232629; border: 1px solid #4d5052; border-radius: 4px; height: 26px; }
            #searchInput { background: transparent; border: none; color: var(--text-color); font-size: 12px; outline: none; width: 120px; }
            .search-clear { cursor: pointer; color: var(--sub-color); display: none; }
            .page-info { font-size: 11px; color: var(--sub-color); font-family: monospace; }
            
            #workspace { display: flex; flex: 1; overflow: hidden; background: var(--viewer-bg); }
            #sidebar { width: 260px; background: var(--sidebar-bg); border-right: 1px solid var(--border-solid); display: flex; flex-direction: column; overflow-y: auto; flex-shrink: 0; }
            .sidebar-header { padding: 10px 14px; font-weight: 700; font-size: 11px; color: var(--sub-color); text-transform: uppercase; border-bottom: 1px solid var(--border-solid); }
            .pdf-item { padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.02); cursor: pointer; display: flex; align-items: center; gap: 10px; }
            .pdf-item:hover { background: rgba(61, 174, 233, 0.1); }
            .pdf-item.active { background: rgba(61, 174, 233, 0.15); border-left: 3px solid var(--accent-color); }
            .pdf-icon { color: var(--accent-color); display: flex; }
            .pdf-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .pdf-name { font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

            #viewer-wrapper { flex: 1; position: relative; display: flex; background: var(--viewer-bg); overflow: hidden; }
            #viewer-container { flex: 1; overflow: auto; display: flex; justify-content: center; padding: 20px; position: relative; width: 100%; height: 100%; }
            #pages-container { display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%; }
            .pdf-page-canvas { box-shadow: 0 8px 24px rgba(0,0,0,0.6); border: 1px solid #000; background: #fff; }
            
            /* Slide & Doc card styling */
            .pptx-slide-card { background: var(--panel-bg); border: 1px solid var(--border-solid); border-top: 3px solid var(--warning-color); border-radius: 6px; width: 100%; max-width: 720px; padding: 20px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
            .slide-header { font-size: 11px; font-weight: 700; color: var(--warning-color); margin-bottom: 10px; text-transform: uppercase; border-bottom: 1px solid var(--border-solid); padding-bottom: 6px; }
            .slide-body { font-size: 13px; color: var(--text-color); line-height: 1.6; }
            .slide-body p { margin-bottom: 8px; }

            .doc-preview-container { background: #ffffff; color: #222222; width: 100%; max-width: 800px; padding: 40px; margin: 20px auto; border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); min-height: 800px; font-family: 'Calibri', 'Segoe UI', sans-serif; font-size: 14px; line-height: 1.6; }
            .doc-preview-container h1, .doc-preview-container h2, .doc-preview-container h3 { margin-bottom: 12px; color: #111; }
            .doc-preview-container p { margin-bottom: 10px; }

            .status-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--viewer-bg); color: var(--sub-color); font-family: monospace; font-size: 13px; display: flex; align-items: center; justify-content: center; z-index: 40; }
            .overlay-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(42, 46, 50, 0.7); color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; width: 44px; height: 44px; display: none; align-items: center; justify-content: center; cursor: pointer; z-index: 50; }
            .prev-btn { left: 16px; } .next-btn { right: 16px; }

            #terminal-grid { flex: 1; display: flex; flex-direction: column; background: #232629; padding: 12px; overflow: hidden; display: none; }
            .term-pane { background: var(--bg-color); border: 1px solid var(--border-solid); border-radius: 6px; display: flex; flex-direction: column; overflow-y: auto; padding: 16px; height: 100%; }
            .output-area { display: flex; flex-direction: column; gap: 12px; flex: 1; }
            .report-card { background: var(--panel-bg); border: 1px solid var(--border-solid); border-left: 3px solid var(--accent-color); border-radius: 4px; margin-bottom: 12px; }
            .card-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; cursor: pointer; background: rgba(255,255,255,0.02); }
            .card-title { display: flex; align-items: center; gap: 8px; font-weight: 600; }
            .card-badges { display: flex; gap: 6px; align-items: center; }
            .badge { font-size: 10px; font-weight: 700; color: var(--accent-color); background: rgba(61, 174, 233, 0.1); border: 1px solid rgba(61, 174, 233, 0.3); padding: 1px 6px; border-radius: 3px; }
            .badge-ho { color: var(--warning-color); background: rgba(246, 116, 0, 0.1); border: 1px solid rgba(246, 116, 0, 0.3); padding: 1px 6px; border-radius: 3px; font-size: 10px; font-weight: 700; }
            .chevron::after { content: "▼"; font-family: monospace; color: var(--sub-color); font-size: 11px; }
            .report-card.collapsed .chevron::after { content: "▶"; }
            .report-card.collapsed .card-body { display: none; }
            .card-body { padding: 12px; }
            .day-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
            .day-card { background: #232629; border: 1px solid var(--border-solid); border-radius: 4px; padding: 10px; }
            .day-name { font-weight: 700; font-size: 11px; color: var(--accent-color); border-bottom: 1px solid var(--border-solid); padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; }
            .day-content { font-size: 12px; color: #d1d2d3; white-space: pre-wrap; line-height: 1.4; }
            .day-empty { color: var(--sub-color); font-style: italic; }
            
            .calendar-container { background: var(--panel-bg); border: 1px solid var(--border-solid); border-radius: 6px; padding: 16px; margin-bottom: 16px; }
            .calendar-header-controls { text-align: center; font-weight: 700; margin-bottom: 14px; font-size: 13px; color: var(--accent-color); }
            .calendar-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; background: var(--border-solid); border-radius: 4px; overflow: hidden; }
            .cal-day-header { text-align: center; font-weight: 700; font-size: 11px; background: #2980b9; color: #fff; padding: 6px 0; }
            .cal-cell { background: #232629; min-height: 80px; padding: 6px; position: relative; }
            .cal-cell.has-entry { cursor: pointer; }
            .cal-cell.has-entry:hover { background: rgba(61, 174, 233, 0.15); }
            .cal-date { font-weight: 700; font-size: 12px; }
            .cal-preview { font-size: 10px; color: var(--sub-color); margin-top: 4px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

            .detailed-container { background: var(--panel-bg); border: 1px solid var(--border-solid); border-radius: 6px; padding: 16px; }
            .analytics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .analytics-card { background: #232629; border: 1px solid var(--border-solid); border-left: 3px solid var(--accent-color); padding: 12px; border-radius: 4px; }
            .analytics-card h3 { font-size: 11px; color: var(--sub-color); margin-bottom: 6px; }
            .timer-display { font-family: monospace; font-size: 15px; font-weight: 700; }
            .stat-progress { margin-top: 8px; height: 4px; background: var(--border-solid); border-radius: 2px; overflow: hidden; }
            .stat-progress-fill { height: 100%; background: var(--accent-color); border-radius: 2px; }

            #calendarModal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 2000; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
            .modal-box { background: var(--bg-color); border: 1px solid var(--border-solid); border-radius: 6px; width: 100%; max-width: 520px; max-height: 80vh; display: flex; flex-direction: column; box-shadow: 0 12px 36px rgba(0,0,0,0.6); }
            .modal-header { padding: 10px 14px; background: var(--panel-bg); border-bottom: 1px solid var(--border-solid); display: flex; justify-content: space-between; align-items: center; }
            .modal-header h3 { font-size: 13px; font-weight: 700; }
            .modal-actions { display: flex; gap: 6px; align-items: center; }
            .modal-actions button { background: #232629; border: 1px solid #4d5052; color: var(--text-color); padding: 3px 8px; font-size: 11px; font-weight: 600; cursor: pointer; border-radius: 3px; }
            .modal-actions button:hover { background: rgba(61, 174, 233, 0.15); border-color: var(--accent-color); }
            .modal-body { padding: 16px; overflow-y: auto; font-size: 13px; line-height: 1.5; white-space: pre-wrap; }
        `;
        document.head.appendChild(style);

        const app = document.createElement('div');
        app.id = 'app';
        app.innerHTML = `
            <div id="waybar">
                <div class="waybar-group">
                    <button class="waybar-btn" id="viewPdfBtn"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> PDF</button>
                    <button class="waybar-btn" id="viewPptBtn"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg> PPT</button>
                    <button class="waybar-btn" id="viewHtmlBtn"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> HTMLs</button>
                    <button class="waybar-btn" id="viewDocBtn"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> DOCs</button>
                    <button class="waybar-btn" id="viewReportBtn"><svg viewBox="0 0 24 24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg> REPORT</button>
                    <button class="waybar-btn" id="viewCalBtn"><svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg> CAL</button>
                    <button class="waybar-btn view-btn-active" id="viewDetailBtn"><svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg> TIMERS</button>
                    <button class="waybar-btn" id="viewTimelineBtn"><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/></svg> TIMELINE</button>
                    <div style="width:1px;height:20px;background:#4d5052;margin:0 4px;"></div>
                    <div id="pdfNavGroup" style="display:none;align-items:center;gap:4px;">
                        <button class="waybar-btn" id="btnPrev" disabled><svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg></button>
                        <div class="page-info"><span id="pageNum">0</span>/<span id="pageCount">0</span></div>
                        <button class="waybar-btn" id="btnNext" disabled><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg></button>
                        <button class="waybar-btn" id="btnZoomOut" disabled><svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg></button>
                        <button class="waybar-btn" id="btnZoomIn" disabled><svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button>
                    </div>
                </div>
                <div class="waybar-group">
                    <div id="searchContainer">
                        <svg style="width:13px;height:13px;fill:var(--sub-color);" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/></svg>
                        <input type="text" id="searchInput" placeholder="search files...">
                        <span class="search-clear" id="searchClear">×</span>
                    </div>
                    <button class="waybar-btn" id="refreshBtn"><svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg></button>
                </div>
            </div>

            <div id="workspace">
                <div id="sidebar">
                    <div class="sidebar-header" id="sidebarHeader">Repository Files</div>
                    <div id="fileListContainer"></div>
                </div>
                <div id="viewer-wrapper">
                    <button class="overlay-nav-btn prev-btn" id="overlayPrev"><svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg></button>
                    <button class="overlay-nav-btn next-btn" id="overlayNext"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg></button>
                    <div id="viewer-container">
                        <div id="statusOverlay" class="status-overlay"><span id="statusText">Select a document</span></div>
                        <div id="pages-container"></div>
                    </div>
                </div>
            </div>

            <div id="terminal-grid">
                <div class="term-pane" id="mainPane">
                    <div class="output-area" id="outputArea"></div>
                </div>
            </div>
        `;
        document.body.appendChild(app);

        const modal = document.createElement('div');
        modal.id = 'calendarModal';
        modal.innerHTML = `
            <div class="modal-box">
                <div class="modal-header"><h3 id="modalTitle">Entry Details</h3><div class="modal-actions"><button id="copyModalBtn">Copy</button><button id="closeModalBtn">Close</button></div></div>
                <div class="modal-body" id="modalContent"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

})();