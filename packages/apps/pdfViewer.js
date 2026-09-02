(function() {
    "use strict";

    if (typeof window.pdfjsLib === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
        script.onload = function() {
            window.pdfjsLib = window['pdfjs-dist/build/pdf'];
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
            console.log('PDF.js library loaded successfully');
            initializeApp();
        };
        script.onerror = function() {
            console.error('Failed to load PDF.js library');
            document.body.innerHTML = '<div style="color:red; padding: 20px;">Failed to load PDF.js renderer. Please check your network.</div>';
        };
        document.head.appendChild(script);
    } else {
        initializeApp();
    }

    const style = document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }
        
        :root {
            --bg-color: #31363b;
            --text-color: #eff0f1;
            --font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            --font-size: 13px;
            --border-solid: #1d2023;
            --accent-color: #3daee9;
            --warning-color: #f67400;
            --danger-color: #da4453;
            --success-color: #27ae60;
            --sub-color: #888888;
            --panel-bg: #2a2e32;
            --sidebar-bg: #232629;
            --viewer-bg: #1a1c1e;
        }

        body, html {
            height: 100vh;
            background: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: var(--font-size);
            line-height: 1.5;
            overflow: hidden;
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #232629; }
        ::-webkit-scrollbar-thumb { background: #4d5052; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }
        
        #app {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            background: var(--bg-color);
        }

        /* Waybar KDE Plasma Header */
        #waybar {
            height: 40px;
            min-height: 40px;
            width: 100%;
            background: var(--panel-bg);
            color: var(--text-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px solid var(--border-solid);
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            flex-shrink: 0;
            z-index: 100;
        }

        .waybar-group {
            display: flex;
            align-items: center;
            gap: 6px;
            height: 100%;
        }

        .waybar-btn {
            cursor: pointer;
            padding: 0 10px;
            height: 28px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 600;
            color: var(--text-color);
            background: #31363b;
            border: 1px solid #4d5052;
            border-radius: 4px;
            font-family: inherit;
            font-size: 12px;
            transition: all 0.15s ease;
        }
        .waybar-btn:hover:not(:disabled) {
            background: rgba(61, 174, 233, 0.15);
            border-color: rgba(61, 174, 233, 0.5);
            color: var(--accent-color);
        }
        .waybar-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: transparent;
        }
        .waybar-btn svg {
            width: 14px;
            height: 14px;
            fill: currentColor;
        }

        .page-info {
            font-size: 12px;
            color: var(--sub-color);
            margin: 0 10px;
            font-family: 'JetBrains Mono', monospace;
            min-width: 70px;
            text-align: center;
        }

        /* Search input KDE Plasma style */
        #searchContainer {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 0 8px;
            background: #232629;
            border: 1px solid #4d5052;
            border-radius: 4px;
            height: 28px;
            min-width: 180px;
            transition: border-color 0.15s, box-shadow 0.15s;
        }
        #searchContainer:focus-within {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 1px var(--accent-color);
        }
        #searchInput {
            background: transparent;
            border: none;
            color: var(--text-color);
            font-family: inherit;
            font-size: 12px;
            outline: none;
            width: 100%;
            user-select: text !important;
            -webkit-user-select: text !important;
        }
        #searchInput::placeholder { color: var(--sub-color); }

        /* Workspace Area (Sidebar + Viewer) */
        #workspace {
            display: flex;
            flex: 1;
            overflow: hidden;
            background: var(--viewer-bg);
        }

        /* Sidebar list of PDFs */
        #sidebar {
            width: 280px;
            min-width: 280px;
            background: var(--sidebar-bg);
            border-right: 1px solid var(--border-solid);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }
        .sidebar-header {
            padding: 10px 14px;
            font-weight: 700;
            font-size: 11px;
            color: var(--sub-color);
            text-transform: uppercase;
            border-bottom: 1px solid var(--border-solid);
            letter-spacing: 0.5px;
        }
        
        .pdf-item {
            padding: 12px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.02);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: background 0.1s;
        }
        .pdf-item:hover {
            background: rgba(61, 174, 233, 0.1);
        }
        .pdf-item.active {
            background: rgba(61, 174, 233, 0.15);
            border-left: 3px solid var(--accent-color);
            padding-left: 11px;
        }
        .pdf-icon {
            color: var(--danger-color);
            display: flex;
        }
        .pdf-icon svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }
        .pdf-name {
            font-size: 13px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Main PDF Viewer Area */
        #viewer-container {
            flex: 1;
            overflow: auto;
            display: flex;
            justify-content: center;
            padding: 24px;
            background: var(--viewer-bg);
            position: relative;
        }
        
        #pages-container {
            display: flex;
            transition: all 0.2s ease;
            width: 100%;
        }

        #pages-container.mode-single {
            flex-direction: column;
            align-items: center;
        }

        #pages-container.mode-continuous {
            flex-direction: column;
            align-items: center;
            gap: 24px;
        }

        #pages-container.mode-facing {
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            gap: 16px;
        }
        
        .pdf-page-canvas {
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            border: 1px solid #000;
            max-width: 100%;
            height: auto !important; 
            background: #fff;
        }

        .status-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--sub-color);
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            text-align: center;
            display: none;
        }
        
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }
        .empty-state svg { width: 48px; height: 48px; fill: var(--sub-color); opacity: 0.5; }

        /* Overlay Navigation Buttons */
        .overlay-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(42, 46, 50, 0.6);
            color: var(--text-color);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 50;
            transition: all 0.2s ease;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        .overlay-nav-btn:hover:not(:disabled) {
            background: var(--accent-color);
            color: #fff;
            border-color: transparent;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .overlay-nav-btn:disabled {
            opacity: 0;
            pointer-events: none;
        }
        .prev-btn { left: 24px; }
        .next-btn { right: 24px; }
        
        #viewer-wrapper {
            flex: 1;
            position: relative;
            display: flex;
            overflow: hidden;
            background: var(--viewer-bg);
        }
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
    <div id="app">
        <div id="waybar">
            <div class="waybar-group">
                <button class="waybar-btn" id="btnPrev" disabled title="Previous Page">
                    <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
                </button>
                <div class="page-info"><span id="pageNum">0</span> / <span id="pageCount">0</span></div>
                <button class="waybar-btn" id="btnNext" disabled title="Next Page">
                    <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </button>
                <div style="width: 1px; height: 16px; background: #4d5052; margin: 0 6px;"></div>
                <button class="waybar-btn" id="btnZoomOut" disabled title="Zoom Out">
                    <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
                </button>
                <button class="waybar-btn" id="btnZoomIn" disabled title="Zoom In">
                    <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </button>
                <div style="width: 1px; height: 16px; background: #4d5052; margin: 0 6px;"></div>
                <button class="waybar-btn" id="btnModeSingle" disabled title="Single Page View">
                    <svg viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm0 2h7v5h5v11H6V4z"/></svg>
                </button>
                <button class="waybar-btn" id="btnModeContinuous" disabled title="Continuous Scrolling">
                    <svg viewBox="0 0 24 24"><path d="M6 2h12v6H6z M6 10h12v6H6z M6 18h12v6H6z"/></svg>
                </button>
                <button class="waybar-btn" id="btnModeFacing" disabled title="Side by Side">
                    <svg viewBox="0 0 24 24"><path d="M4 2h7v20H4z M13 2h7v20h-7z"/></svg>
                </button>
            </div>
            
            <div class="waybar-group">
                <div id="searchContainer">
                    <svg style="width:13px;height:13px;fill:var(--sub-color);" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <input type="text" id="searchInput" placeholder="Filter PDFs..." />
                </div>
                <button class="waybar-btn" id="btnRefresh" title="Refresh Directory">
                    <svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                </button>
            </div>
        </div>

        <div id="workspace">
            <div id="sidebar">
                <div class="sidebar-header">BGP-DS Documents</div>
                <div id="pdfListContainer"></div>
            </div>
            <div id="viewer-wrapper">
                <button class="overlay-nav-btn prev-btn" id="overlayPrev" disabled title="Previous Page">
                    <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
                </button>
                <button class="overlay-nav-btn next-btn" id="overlayNext" disabled title="Next Page">
                    <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </button>
                <div id="viewer-container">
                    <div id="statusOverlay" class="status-overlay">
                        <div class="empty-state">
                            <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                            <span id="statusText">Select a PDF to view</span>
                        </div>
                    </div>
                    <div id="pages-container" class="mode-single"></div>
                </div>
            </div>
        </div>
    </div>
    `;

    function initializeApp() {
        const REPO_URL = 'https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/BGP-DS';
        
        let pdfFiles = [];
        let currentPdfDoc = null;
        let pageNum = 1;
        let scale = 1.2;
        let viewMode = 'single'; // 'single', 'continuous', 'facing'
        let renderedCanvases = new Map();
        let pageObserver = null;

        const pagesContainer = document.getElementById('pages-container');
        const statusOverlay = document.getElementById('statusOverlay');
        const statusText = document.getElementById('statusText');
        const viewerContainer = document.getElementById('viewer-container');
        const pdfListContainer = document.getElementById('pdfListContainer');
        const searchInput = document.getElementById('searchInput');

        // Waybar Controls
        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');
        const btnZoomIn = document.getElementById('btnZoomIn');
        const btnZoomOut = document.getElementById('btnZoomOut');
        const btnModeSingle = document.getElementById('btnModeSingle');
        const btnModeContinuous = document.getElementById('btnModeContinuous');
        const btnModeFacing = document.getElementById('btnModeFacing');
        const btnRefresh = document.getElementById('btnRefresh');
        const numDisplay = document.getElementById('pageNum');
        const countDisplay = document.getElementById('pageCount');

        // Overlay Controls
        const overlayPrev = document.getElementById('overlayPrev');
        const overlayNext = document.getElementById('overlayNext');

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
                        
                        // Render if not already rendered at current scale
                        const renderKey = `${pNum}-${scale}`;
                        if (canvas.dataset.renderedKey !== renderKey) {
                            renderCanvas(pNum, canvas).then(() => {
                                canvas.dataset.renderedKey = renderKey;
                            });
                        }
                        
                        // Update active page number based on visibility
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
                const viewport = page.getViewport({scale: scale});
                
                // Set canvas physical size
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Set fixed CSS size so layout doesn't jump aggressively
                canvas.style.width = viewport.width + 'px';
                canvas.style.height = viewport.height + 'px';

                const ctx = canvas.getContext('2d');
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                await page.render(renderContext).promise;
            } catch (err) {
                console.error('Error rendering page ' + num + ':', err);
            }
        }

        function updateNavButtons() {
            btnPrev.disabled = pageNum <= 1;
            btnNext.disabled = pageNum >= currentPdfDoc.numPages;
            
            if (viewMode === 'continuous') {
                overlayPrev.style.display = 'none';
                overlayNext.style.display = 'none';
            } else {
                overlayPrev.style.display = 'flex';
                overlayNext.style.display = 'flex';
                overlayPrev.disabled = pageNum <= 1;
                overlayNext.disabled = (viewMode === 'facing') ? pageNum >= currentPdfDoc.numPages - 1 : pageNum >= currentPdfDoc.numPages;
            }

            // Update active state of mode buttons
            btnModeSingle.style.color = viewMode === 'single' ? 'var(--accent-color)' : '';
            btnModeContinuous.style.color = viewMode === 'continuous' ? 'var(--accent-color)' : '';
            btnModeFacing.style.color = viewMode === 'facing' ? 'var(--accent-color)' : '';
        }

        function renderView() {
            if (!currentPdfDoc) return;
            
            setStatus('', false);
            pagesContainer.innerHTML = '';
            pagesContainer.className = `mode-${viewMode}`;
            renderedCanvases.clear();
            
            if (viewMode === 'continuous') {
                createVisibilityObserver();
                for (let i = 1; i <= currentPdfDoc.numPages; i++) {
                    const canvas = document.createElement('canvas');
                    canvas.className = 'pdf-page-canvas';
                    canvas.dataset.page = i;
                    // Provide a placeholder height based on scale to avoid jumping
                    canvas.style.height = (800 * scale) + 'px';
                    canvas.style.width = (600 * scale) + 'px';
                    
                    pagesContainer.appendChild(canvas);
                    pageObserver.observe(canvas);
                }
            } else if (viewMode === 'facing') {
                if (pageObserver) pageObserver.disconnect();
                
                // Normalize pageNum to odd (left page) if it's not 1
                let leftPage = pageNum;
                if (leftPage > 1 && leftPage % 2 === 0) leftPage--;
                pageNum = leftPage;
                numDisplay.textContent = pageNum;
                
                const canvas1 = document.createElement('canvas');
                canvas1.className = 'pdf-page-canvas';
                pagesContainer.appendChild(canvas1);
                renderCanvas(leftPage, canvas1);
                
                if (leftPage + 1 <= currentPdfDoc.numPages) {
                    const canvas2 = document.createElement('canvas');
                    canvas2.className = 'pdf-page-canvas';
                    pagesContainer.appendChild(canvas2);
                    renderCanvas(leftPage + 1, canvas2);
                }
                updateNavButtons();
            } else { // single
                if (pageObserver) pageObserver.disconnect();
                numDisplay.textContent = pageNum;
                
                const canvas = document.createElement('canvas');
                canvas.className = 'pdf-page-canvas';
                pagesContainer.appendChild(canvas);
                renderCanvas(pageNum, canvas);
                updateNavButtons();
            }
        }

        function onPrevPage() {
            if (viewMode === 'continuous') {
                viewerContainer.scrollBy({ top: -viewerContainer.clientHeight * 0.8, behavior: 'smooth' });
            } else {
                let step = viewMode === 'facing' ? 2 : 1;
                pageNum = Math.max(1, pageNum - step);
                renderView();
            }
        }

        function onNextPage() {
            if (viewMode === 'continuous') {
                viewerContainer.scrollBy({ top: viewerContainer.clientHeight * 0.8, behavior: 'smooth' });
            } else {
                let step = viewMode === 'facing' ? 2 : 1;
                pageNum = Math.min(currentPdfDoc.numPages, pageNum + step);
                renderView();
            }
        }

        function onZoomIn() {
            scale *= 1.25;
            scale = Math.min(scale, 5.0);
            renderView();
        }

        function onZoomOut() {
            scale /= 1.25;
            scale = Math.max(scale, 0.25);
            renderView();
        }

        function loadPDF(url, fileName) {
            setStatus('Loading Document...<br><br>' + fileName, true);
            
            // Enable zoom controls
            btnZoomIn.disabled = false;
            btnZoomOut.disabled = false;

            // Fetch via allorigins if CORS issues arise, but GitHub raw usually supports CORS.
            const loadingTask = pdfjsLib.getDocument(url);
            
            loadingTask.promise.then(function(pdfDoc_) {
                currentPdfDoc = pdfDoc_;
                countDisplay.textContent = currentPdfDoc.numPages;
                pageNum = 1;
                
                // Enable view mode buttons
                btnModeSingle.disabled = false;
                btnModeContinuous.disabled = false;
                btnModeFacing.disabled = false;
                
                scale = 1.2;
                renderView();
            }).catch(function(err) {
                console.error('Error loading PDF:', err);
                setStatus('Failed to load PDF.<br>CORS or Network Error.', true);
                
                // Disable controls
                btnZoomIn.disabled = true;
                btnZoomOut.disabled = true;
                btnModeSingle.disabled = true;
                btnModeContinuous.disabled = true;
                btnModeFacing.disabled = true;
                btnPrev.disabled = true;
                btnNext.disabled = true;
                overlayPrev.disabled = true;
                overlayNext.disabled = true;
            });
        }

        async function fetchRepoContents() {
            try {
                pdfListContainer.innerHTML = '<div style="padding:15px; color:var(--sub-color); text-align:center;">Fetching...</div>';
                setStatus('Connecting to GitHub API...', true);
                
                let resp = await fetch(REPO_URL);
                if (!resp.ok) {
                    // Try CORS proxy if direct fails
                    resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(REPO_URL));
                }
                
                if (!resp.ok) throw new Error('Failed to fetch repository contents');
                
                const data = await resp.json();
                
                // Filter only PDFs
                pdfFiles = data.filter(item => item.name.toLowerCase().endsWith('.pdf'));
                
                renderSidebarList();
                
                if (pdfFiles.length > 0) {
                    setStatus('Select a PDF from the sidebar to view', true);
                } else {
                    pdfListContainer.innerHTML = '<div style="padding:15px; color:var(--danger-color); text-align:center;">No PDFs found in BGP-DS</div>';
                    setStatus('No PDF files located.', true);
                }
                
            } catch (err) {
                pdfListContainer.innerHTML = '<div style="padding:15px; color:var(--danger-color); text-align:center;">Error loading list.</div>';
                setStatus('Connection Error:<br>' + err.message, true);
                console.error(err);
            }
        }

        function renderSidebarList(filterTerm = '') {
            pdfListContainer.innerHTML = '';
            
            const term = filterTerm.toLowerCase();
            const filtered = pdfFiles.filter(f => f.name.toLowerCase().includes(term));
            
            if (filtered.length === 0) {
                pdfListContainer.innerHTML = '<div style="padding:15px; color:var(--sub-color); font-size: 12px;">No matches found.</div>';
                return;
            }
            
            filtered.forEach(file => {
                const el = document.createElement('div');
                el.className = 'pdf-item';
                el.title = file.name;
                
                // SVG PDF Icon
                el.innerHTML = `
                    <div class="pdf-icon">
                        <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                    </div>
                    <div class="pdf-name">${file.name}</div>
                `;
                
                el.addEventListener('click', () => {
                    // Update active styling
                    document.querySelectorAll('.pdf-item').forEach(i => i.classList.remove('active'));
                    el.classList.add('active');
                    
                    // GitHub Raw URL for loading the PDF blob
                    const rawUrl = `https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/BGP-DS/${encodeURIComponent(file.name)}`;
                    loadPDF(rawUrl, file.name);
                });
                
                pdfListContainer.appendChild(el);
            });
        }

        // View Mode Event Listeners
        btnModeSingle.addEventListener('click', () => { viewMode = 'single'; renderView(); });
        btnModeContinuous.addEventListener('click', () => { viewMode = 'continuous'; renderView(); });
        btnModeFacing.addEventListener('click', () => { viewMode = 'facing'; renderView(); });

        btnPrev.addEventListener('click', onPrevPage);
        btnNext.addEventListener('click', onNextPage);
        btnZoomIn.addEventListener('click', onZoomIn);
        btnZoomOut.addEventListener('click', onZoomOut);
        
        overlayPrev.addEventListener('click', onPrevPage);
        overlayNext.addEventListener('click', onNextPage);
        
        // Mousewheel Zoom (Ctrl + Wheel)
        viewerContainer.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault(); // Prevent standard browser zoom
                if (!currentPdfDoc) return;
                
                // Zoom in or out based on scroll direction
                if (e.deltaY < 0) {
                    scale *= 1.1; // Smoother zoom in
                } else {
                    scale /= 1.1; // Smoother zoom out
                }
                
                // Constrain scale to avoid crashes and excessive zooming
                scale = Math.min(Math.max(scale, 0.25), 5.0);
                
                // Use requestAnimationFrame to throttle re-renders during fast scrolling
                if (window.zoomTimeout) clearTimeout(window.zoomTimeout);
                window.zoomTimeout = setTimeout(() => {
                    renderView();
                }, 100);
            }
        }, { passive: false });
        
        btnRefresh.addEventListener('click', fetchRepoContents);
        
        searchInput.addEventListener('input', (e) => {
            renderSidebarList(e.target.value);
        });

        // Initialize state
        setStatus('Initializing...', true);
        fetchRepoContents();
    }

})();