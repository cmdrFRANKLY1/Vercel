(function() {
    const PACKAGE_NAME = 'pdfviewer';
    const VERSION = '1.0.1';

    // Check if we are running in the main terminal environment to register the package
    const isTerminalEnv = typeof window !== 'undefined' && typeof window.packagesRegistry !== 'undefined';
    
    // Check if we are inside an iframe (which is how kde.js launches apps) or standalone window
    const isIframe = typeof window !== 'undefined' && window !== window.parent;
    const isStandaloneWindow = typeof window !== 'undefined' && !window.opener && window === window.parent && !window.packagesRegistry;
    
    // Allow rendering if body exists and we are not strictly in the terminal wrapper, 
    // or if the body is completely empty (standard app launch scenario in kde.js).
    const shouldRenderUI = isIframe || isStandaloneWindow || (document.body && document.body.innerHTML.trim() === '');

    if (isTerminalEnv) {
        window.packagesRegistry[PACKAGE_NAME] = {
            name: 'KDE PDF Viewer',
            version: VERSION,
            description: 'A native PDF viewer perfectly tuned for the kde.js color API.',
            commands: {
                pdfviewer: function(args) {
                    if (typeof window.createWrapperTab !== 'undefined') {
                        // Create a fallback blob URL referencing the specific app path 
                        // in case it's launched outside of kde.js
                        const htmlContent = `<!DOCTYPE html><html><head><title>PDF Viewer</title><script src="packages/apps/pdfviewer.js"></script></head><body></body></html>`;
                        const blob = new Blob([htmlContent], { type: 'text/html' });
                        window.createWrapperTab('pdfviewer', URL.createObjectURL(blob));
                    } else {
                        console.log("PDF Viewer registered. Launching via the kde.js desktop environment is recommended.");
                    }
                }
            }
        };
    }

    if (shouldRenderUI) {
        // Prevent running if we just registered in the terminal and shouldn't hijack the UI
        if (isTerminalEnv && !isIframe && document.body.innerHTML.trim() !== '') {
            return;
        }
        
        // Wait for DOM to be ready if it's not already
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initPdfViewer);
        } else {
            initPdfViewer();
        }
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                /* Utilizing the exact color variables exported by colorsKde.js inside kde.js */
                --theme-bg: var(--color-kde-window-bg, #31363b);
                --theme-panel: var(--color-kde-panel, rgba(35, 38, 41, 0.95));
                --theme-panel-hover: var(--color-kde-panel-hover, rgba(255, 255, 255, 0.1));
                --theme-accent: var(--color-kde-accent, #3daee9);
                --theme-text: var(--color-kde-text, #eff0f1);
                --theme-canvas-bg: var(--color-kde-bg, #1a1b1e);
                --theme-border: var(--color-kde-window-border, #1d2023);
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }
            
            body, html {
                height: 100%;
                width: 100%;
                overflow: hidden;
                font-family: 'Noto Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--theme-bg);
                color: var(--theme-text);
            }

            .pdf-app-container {
                display: flex;
                flex-direction: column;
                height: 100vh;
                width: 100vw;
            }

            .pdf-toolbar {
                height: 48px;
                background-color: var(--theme-panel);
                border-bottom: 1px solid var(--theme-border);
                display: flex;
                align-items: center;
                padding: 0 16px;
                gap: 12px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                z-index: 10;
            }

            .pdf-btn {
                background: transparent;
                color: var(--theme-text);
                border: 1px solid transparent;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 13px;
                transition: all 0.15s ease;
            }

            .pdf-btn:hover:not(:disabled) {
                background-color: var(--theme-panel-hover);
                border-color: var(--theme-border);
            }
            
            .pdf-btn:active:not(:disabled) {
                background-color: rgba(0,0,0,0.2);
            }

            .pdf-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .pdf-btn.primary {
                border-color: var(--theme-accent);
                color: var(--theme-accent);
            }

            .pdf-btn.primary:hover {
                background-color: var(--theme-accent);
                color: #ffffff;
            }

            .pdf-separator {
                width: 1px;
                height: 24px;
                background-color: var(--theme-border);
                margin: 0 4px;
            }

            .pdf-page-info {
                font-size: 13px;
                opacity: 0.9;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .pdf-page-input {
                background-color: var(--theme-bg);
                color: var(--theme-text);
                border: 1px solid var(--theme-border);
                border-radius: 3px;
                width: 45px;
                text-align: center;
                padding: 2px;
                font-size: 13px;
            }
            
            .pdf-page-input:focus {
                outline: none;
                border-color: var(--theme-accent);
            }

            .pdf-viewer-area {
                flex-grow: 1;
                background-color: var(--theme-canvas-bg);
                overflow: auto;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                padding: 24px;
                position: relative;
            }

            .pdf-canvas-wrapper {
                position: relative;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                transition: transform 0.2s ease;
            }

            #pdf-canvas {
                display: block;
                max-width: none;
            }

            /* Empty state and Loading state */
            .pdf-message-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
                color: var(--theme-text);
                opacity: 0.6;
                text-align: center;
            }

            .pdf-message-overlay i {
                font-size: 48px;
                color: var(--theme-accent);
                opacity: 0.8;
            }
            
            .pdf-message-overlay i.text-red-500 {
                color: #ef5b6b; /* Red fallback color compatible with kde.js alert styling */
            }

            .hidden {
                display: none !important;
            }
            
            .spacer {
                flex-grow: 1;
            }
        `;
        document.head.appendChild(style);
    }

    function buildUI() {
        const container = document.createElement('div');
        container.className = 'pdf-app-container';

        container.innerHTML = `
            <div class="pdf-toolbar">
                <button id="btn-open" class="pdf-btn primary" title="Open PDF Document">
                    <i class="fa-solid fa-folder-open"></i> Open File
                </button>
                <input type="file" id="file-input" accept="application/pdf" class="hidden">
                
                <div class="pdf-separator"></div>
                
                <button id="btn-prev" class="pdf-btn" disabled title="Previous Page">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                
                <div class="pdf-page-info">
                    Page <input type="number" id="page-input" class="pdf-page-input" value="0" min="1" disabled> / <span id="page-count">0</span>
                </div>
                
                <button id="btn-next" class="pdf-btn" disabled title="Next Page">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                
                <div class="spacer"></div>
                
                <button id="btn-zoom-out" class="pdf-btn" disabled title="Zoom Out">
                    <i class="fa-solid fa-magnifying-glass-minus"></i>
                </button>
                <span id="zoom-val" style="font-size: 13px; width: 45px; text-align: center;">100%</span>
                <button id="btn-zoom-in" class="pdf-btn" disabled title="Zoom In">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                </button>
            </div>
            
            <div class="pdf-viewer-area" id="viewer-area">
                <div class="pdf-message-overlay" id="empty-state">
                    <i class="fa-regular fa-file-pdf"></i>
                    <div>
                        <h3 style="margin-bottom: 4px; font-weight: 600;">No Document Loaded</h3>
                        <p style="font-size: 14px;">Click "Open File" to view a PDF.</p>
                    </div>
                </div>
                
                <div class="pdf-message-overlay hidden" id="loading-state">
                    <i class="fa-solid fa-circle-notch fa-spin"></i>
                    <p>Processing Document...</p>
                </div>
                
                <div class="pdf-canvas-wrapper hidden" id="canvas-wrapper">
                    <canvas id="pdf-canvas"></canvas>
                </div>
            </div>
        `;

        document.body.appendChild(container);
    }

    function initPdfViewer() {
        if (document.body) document.body.innerHTML = '';
        
        injectStyles();
        buildUI();

        // Application State
        let pdfDoc = null;
        let pageNum = 1;
        let pageIsRendering = false;
        let pageNumIsPending = null;
        let scale = 1.0;
        
        // Element References
        const elements = {
            btnOpen: document.getElementById('btn-open'),
            fileInput: document.getElementById('file-input'),
            btnPrev: document.getElementById('btn-prev'),
            btnNext: document.getElementById('btn-next'),
            pageInput: document.getElementById('page-input'),
            pageCount: document.getElementById('page-count'),
            btnZoomIn: document.getElementById('btn-zoom-in'),
            btnZoomOut: document.getElementById('btn-zoom-out'),
            zoomVal: document.getElementById('zoom-val'),
            canvas: document.getElementById('pdf-canvas'),
            canvasWrapper: document.getElementById('canvas-wrapper'),
            emptyState: document.getElementById('empty-state'),
            loadingState: document.getElementById('loading-state'),
            viewerArea: document.getElementById('viewer-area')
        };
        
        const ctx = elements.canvas.getContext('2d');

        const loadPdfJs = new Promise((resolve, reject) => {
            if (window.pdfjsLib) { resolve(); return; }
            
            const script = document.createElement('script');
            // Using a universally compatible stable 2.x version to avoid Module loading issues in dynamic contexts
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
            script.onload = () => {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
                resolve();
            };
            script.onerror = () => reject(new Error('Failed to load PDF.js'));
            document.head.appendChild(script);
        });

        const renderPage = (num) => {
            pageIsRendering = true;

            pdfDoc.getPage(num).then(page => {
                // High-DPI handling with CSS scaling
                const dpr = window.devicePixelRatio || 1;
                const baseViewport = page.getViewport({ scale: scale });
                
                // Set actual canvas size considering scale and DPR
                elements.canvas.height = baseViewport.height * dpr;
                elements.canvas.width = baseViewport.width * dpr;
                
                // Set CSS display size to visual size
                elements.canvas.style.width = `${baseViewport.width}px`;
                elements.canvas.style.height = `${baseViewport.height}px`;

                // Scale context to match DPR
                ctx.scale(dpr, dpr);

                const renderContext = {
                    canvasContext: ctx,
                    viewport: baseViewport
                };

                const renderTask = page.render(renderContext);

                renderTask.promise.then(() => {
                    pageIsRendering = false;
                    if (pageNumIsPending !== null) {
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                }).catch(err => {
                    console.error('Page render error:', err);
                    pageIsRendering = false;
                });

                elements.pageInput.value = num;
                updateControlsState();
            });
        };

        const queueRenderPage = (num) => {
            if (pageIsRendering) {
                pageNumIsPending = num;
            } else {
                renderPage(num);
            }
        };

        const updateControlsState = () => {
            const hasDoc = pdfDoc !== null;
            elements.btnPrev.disabled = !hasDoc || pageNum <= 1;
            elements.btnNext.disabled = !hasDoc || pageNum >= pdfDoc.numPages;
            elements.btnZoomIn.disabled = !hasDoc || scale >= 3.0;
            elements.btnZoomOut.disabled = !hasDoc || scale <= 0.5;
            elements.pageInput.disabled = !hasDoc;
            elements.zoomVal.textContent = hasDoc ? `${Math.round(scale * 100)}%` : '100%';
        };

        const showLoading = (show) => {
            elements.emptyState.classList.add('hidden');
            if (show) {
                elements.loadingState.classList.remove('hidden');
                elements.canvasWrapper.classList.add('hidden');
            } else {
                elements.loadingState.classList.add('hidden');
                elements.canvasWrapper.classList.remove('hidden');
            }
        };

        const showError = (message) => {
            showLoading(false);
            elements.emptyState.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
                <div>
                    <h3 style="margin-bottom: 4px; font-weight: 600;">Error Loading Document</h3>
                    <p style="font-size: 14px; opacity: 0.8;">${message}</p>
                </div>
            `;
            elements.emptyState.classList.remove('hidden');
            pdfDoc = null;
            updateControlsState();
        };

        elements.btnOpen.addEventListener('click', () => {
            elements.fileInput.click();
        });

        elements.fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file || file.type !== 'application/pdf') return;

            try {
                await loadPdfJs; 
                showLoading(true);
                
                const fileReader = new FileReader();
                fileReader.onload = function() {
                    const typedarray = new Uint8Array(this.result);
                    window.pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                        pdfDoc = pdf;
                        elements.pageCount.textContent = pdf.numPages;
                        pageNum = 1;
                        scale = 1.0; 
                        
                        showLoading(false);
                        renderPage(pageNum);
                        
                    }).catch(err => {
                        console.error('Error opening PDF:', err);
                        showError('The document might be corrupted or encrypted.');
                    });
                };
                fileReader.readAsArrayBuffer(file);
                
            } catch (err) {
                console.error(err);
                showError('Failed to initialize the PDF engine.');
            }
        });

        elements.btnPrev.addEventListener('click', () => {
            if (pageNum <= 1) return;
            pageNum--;
            queueRenderPage(pageNum);
        });

        elements.btnNext.addEventListener('click', () => {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            queueRenderPage(pageNum);
        });

        elements.pageInput.addEventListener('change', (e) => {
            let num = parseInt(e.target.value);
            if (isNaN(num) || num < 1) num = 1;
            if (num > pdfDoc.numPages) num = pdfDoc.numPages;
            
            pageNum = num;
            elements.pageInput.value = pageNum;
            queueRenderPage(pageNum);
        });

        elements.btnZoomIn.addEventListener('click', () => {
            if (scale >= 3.0) return;
            scale += 0.25;
            queueRenderPage(pageNum);
        });

        elements.btnZoomOut.addEventListener('click', () => {
            if (scale <= 0.5) return;
            scale -= 0.25;
            queueRenderPage(pageNum);
        });
    }

})();