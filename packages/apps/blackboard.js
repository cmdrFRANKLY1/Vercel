(function() {
    "use strict";

    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['blackboard'] = {
            name: 'Virtual Whiteboard',
            version: '2.6.0',
            description: 'A KDE-themed virtual whiteboard with shape tools, canvas dark mode, i18n, and PNG export',
            preInstalledOn: ['default'],
            translations: {},
            commands: {
                blackboard: function(args) {
                    console.log("Whiteboard launched.");
                }
            },
            commandInfo: {
                blackboard: "what is this command?\nblackboard\n\nwhat is it used for?\nOpens the Virtual Whiteboard drawing application featuring a KDE-inspired visual theme, drawing tools, shapes, and image search."
            }
        };
    }

    const i18n = {
        en: {
            menuFile: "File", menuEdit: "Edit", menuView: "View",
            undoTitle: "Undo (Ctrl+Z)", redoTitle: "Redo (Ctrl+Y)",
            clearBtn: "Clear", clearTitle: "Clear Board",
            saveBtn: "Save PNG", saveTitle: "Export as PNG",
            insertBtn: "Insert Image...", insertTitle: "Insert Image from Web",
            canvasThemeTitle: "Toggle Canvas Dark/Light",
            langTitle: "Switch Language (DE)",
            sizeText: "Size:",
            toolPen: "Pencil/Marker", toolEraser: "Eraser",
            toolRect: "Rectangle", toolCircle: "Circle", toolLine: "Line",
            statusReady: "Ready", statusExporting: "Preparing PNG export...", statusExported: "Board exported as PNG",
            statusCleared: "Whiteboard cleared", statusInserted: "Image inserted", statusStamped: "Image stamped to board",
            searchHeader: "Insert Web Image", searchPlaceholder: "Search Wikimedia Commons...", searchBtn: "Search",
            searchEmpty: "Search to insert an image onto the whiteboard.", searchLoading: "Searching...",
            searchNoResults: "No results found.", searchError: "Error fetching results.",
            stampBtn: "Stamp", stampTitle: "Lock in place and flatten onto whiteboard",
            colorWhiteTitle: "White (Whiteout)"
        },
        de: {
            menuFile: "Datei", menuEdit: "Bearbeiten", menuView: "Ansicht",
            undoTitle: "Rückgängig (Strg+Z)", redoTitle: "Wiederholen (Strg+Y)",
            clearBtn: "Leeren", clearTitle: "Tafel leeren",
            saveBtn: "Als PNG", saveTitle: "Als PNG exportieren",
            insertBtn: "Bild einfügen...", insertTitle: "Bild aus dem Web einfügen",
            canvasThemeTitle: "Leinwand Hell/Dunkel",
            langTitle: "Sprache wechseln (EN)",
            sizeText: "Größe:",
            toolPen: "Stift/Marker", toolEraser: "Radiergummi",
            toolRect: "Rechteck", toolCircle: "Kreis", toolLine: "Linie",
            statusReady: "Bereit", statusExporting: "PNG-Export wird vorbereitet...", statusExported: "Tafel als PNG exportiert",
            statusCleared: "Whiteboard geleert", statusInserted: "Bild eingefügt", statusStamped: "Bild auf die Tafel gestempelt",
            searchHeader: "Web-Bild einfügen", searchPlaceholder: "Wikimedia Commons durchsuchen...", searchBtn: "Suchen",
            searchEmpty: "Suchen Sie, um ein Bild auf das Whiteboard einzufügen.", searchLoading: "Suchen...",
            searchNoResults: "Keine Ergebnisse gefunden.", searchError: "Fehler beim Abrufen der Ergebnisse.",
            stampBtn: "Stempeln", stampTitle: "Sperren und auf die Tafel flachen",
            colorWhiteTitle: "Weiß (Korrektur)"
        }
    };
    let currentLang = 'en';

    const style = document.createElement('style');
    style.textContent = `
        :root {
            /* Safely inherit KDE Plasma variables from the wrapper environment */
            --color-kde-bg: var(--color-kde-bg, #1a1b1e);
            --color-kde-panel: var(--color-kde-panel, rgba(35, 38, 41, 0.85));
            --color-kde-panel-hover: var(--color-kde-panel-hover, rgba(255, 255, 255, 0.1));
            --color-kde-accent: var(--color-kde-accent, #3daee9);
            --color-kde-text: var(--color-kde-text, #eff0f1);
            --color-kde-window-bg: var(--color-kde-window-bg, #31363b);
            --color-kde-window-border: var(--color-kde-window-border, #1d2023);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-user-select: none; }
        input, textarea { user-select: text !important; -webkit-user-select: text !important; }
        
        body, html {
            height: 100%;
            width: 100%;
            background-color: var(--color-kde-bg);
            color: var(--color-kde-text);
            font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            font-size: 13px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        #menu-bar {
            background-color: var(--color-kde-window-bg);
            border-bottom: 1px solid var(--color-kde-window-border);
            display: flex;
            padding: 0 4px;
            height: 28px;
            align-items: center;
        }
        .menu-item {
            padding: 4px 8px;
            border-radius: 3px;
            cursor: pointer;
            transition: background 0.1s;
        }
        .menu-item:hover { background-color: var(--color-kde-panel-hover); }

        #tool-bar {
            background-color: var(--color-kde-window-bg);
            border-bottom: 1px solid var(--color-kde-window-border);
            display: flex;
            padding: 6px 8px;
            gap: 12px;
            align-items: center;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        
        .toolbar-btn {
            background: transparent;
            border: 1px solid transparent;
            color: var(--color-kde-text);
            border-radius: 4px;
            padding: 4px 8px;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.15s;
        }
        .toolbar-btn:hover {
            background-color: var(--color-kde-panel-hover);
            border-color: rgba(127,127,127,0.2);
        }
        .toolbar-btn.active {
            background-color: rgba(61, 174, 233, 0.3);
            border-color: rgba(61, 174, 233, 0.5);
        }
        
        .toolbar-separator {
            width: 1px;
            height: 20px;
            background-color: var(--color-kde-window-border);
        }

        #main-area {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        #sidebar {
            width: 52px;
            background-color: var(--color-kde-window-bg);
            border-right: 1px solid var(--color-kde-window-border);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 8px;
            gap: 4px;
            z-index: 10;
        }

        .side-tool {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
            border: 1px solid transparent;
            color: var(--color-kde-text);
            transition: all 0.1s;
        }
        .side-tool:hover { background-color: var(--color-kde-panel-hover); }
        .side-tool.active {
            background-color: rgba(61, 174, 233, 0.3);
            border-color: var(--color-kde-accent);
        }

        #color-palette {
            display: flex;
            flex-wrap: wrap;
            width: 44px;
            gap: 2px;
            justify-content: center;
            margin-top: auto;
            margin-bottom: 12px;
            padding-top: 8px;
            border-top: 1px solid var(--color-kde-window-border);
        }
        .color-btn {
            width: 18px;
            height: 18px;
            cursor: pointer;
            border: 1px solid rgba(0,0,0,0.5);
            box-sizing: border-box;
            transition: transform 0.1s;
        }
        .color-btn:hover { transform: scale(1.15); z-index: 10; }
        .color-btn.active { border: 2px solid var(--color-kde-accent); box-shadow: 0 0 4px var(--color-kde-accent); }
        input[type="color"]#color-picker {
            -webkit-appearance: none;
            appearance: none;
            border: 1px solid rgba(127,127,127,0.5);
            width: 38px;
            height: 24px;
            padding: 0;
            background: transparent;
            cursor: pointer;
            margin-top: 4px;
        }
        input[type="color"]#color-picker::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]#color-picker::-webkit-color-swatch { border: none; }

        #workspace-container {
            flex-grow: 1;
            position: relative;
            background-color: rgba(0,0,0,0.1);
            cursor: crosshair;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px; 
        }
        
        .canvas-wrapper {
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            position: relative;
            height: 100%;
            max-width: 100%;
            aspect-ratio: 16 / 9;
            flex-shrink: 0; 
        }

        canvas {
            display: block;
            touch-action: none;
            width: 100%;
            height: 100%;
        }

        #status-bar {
            background-color: var(--color-kde-window-bg);
            border-top: 1px solid var(--color-kde-window-border);
            height: 24px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            font-size: 11px;
            color: var(--color-kde-text);
            opacity: 0.8;
            gap: 16px;
        }

        #image-search-panel {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 400px;
            background-color: var(--color-kde-window-bg);
            border: 1px solid var(--color-kde-window-border);
            border-radius: 6px;
            display: none;
            flex-direction: column;
            z-index: 1500;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            overflow: hidden;
        }
        
        .modal-header {
            background-color: var(--color-kde-panel);
            padding: 8px 12px;
            border-bottom: 1px solid var(--color-kde-window-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
        }
        .modal-close {
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        .modal-close:hover { background-color: rgba(218, 68, 83, 0.8); color: white; }

        .search-controls {
            display: flex;
            padding: 12px;
            gap: 8px;
            background: var(--color-kde-bg);
        }
        .search-controls input {
            background: var(--color-kde-window-bg);
            border: 1px solid var(--color-kde-window-border);
            color: var(--color-kde-text);
            padding: 6px 10px;
            border-radius: 4px;
            flex-grow: 1;
            outline: none;
        }
        .search-controls input:focus { border-color: var(--color-kde-accent); }
        
        #image-search-results {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            padding: 12px;
            overflow-y: auto;
            flex-grow: 1;
            align-content: flex-start;
            background: rgba(0,0,0,0.05);
        }
        .search-result-img {
            max-height: 90px;
            cursor: pointer;
            border: 2px solid transparent;
            border-radius: 4px;
            transition: transform 0.15s, border-color 0.15s;
        }
        .search-result-img:hover { transform: scale(1.05); border-color: var(--color-kde-accent); }

        input[type=range] {
            -webkit-appearance: none;
            width: 100px;
            background: transparent;
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background: rgba(127,127,127,0.3);
            border-radius: 2px;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 12px;
            width: 12px;
            background: var(--color-kde-accent);
            border-radius: 50%;
            margin-top: -4px;
            cursor: pointer;
        }
        
        .floating-img-wrapper {
            position: absolute;
            border: 1px dashed var(--color-kde-accent);
            box-sizing: border-box;
            z-index: 100;
        }
        .floating-img-wrapper.locked { border: 1px solid transparent; }
        .floating-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: fill;
            pointer-events: none;
            display: block;
        }
        .floating-controls {
            position: absolute;
            top: -24px; right: -1px;
            display: flex;
            gap: 4px;
            pointer-events: auto;
        }
        .floating-btn {
            background: var(--color-kde-window-bg);
            color: var(--color-kde-text);
            border: 1px solid var(--color-kde-window-border);
            font-size: 10px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
        }
        .floating-btn:hover { background: var(--color-kde-panel-hover); }
        .floating-btn.delete-btn:hover { background: #da4453; color: white; }
        
        .resize-handle {
            position: absolute;
            bottom: -6px; right: -6px;
            width: 12px; height: 12px;
            background: var(--color-kde-accent);
            border: 1px solid #fff;
            border-radius: 50%;
            cursor: se-resize;
            pointer-events: auto;
        }
        .drag-area {
            position: absolute;
            inset: 0;
            cursor: move;
            z-index: 1;
            pointer-events: auto;
        }
        .floating-img-wrapper.locked .resize-handle,
        .floating-img-wrapper.locked .drag-area,
        .floating-img-wrapper.locked .delete-btn { display: none; }
        .floating-img-wrapper.locked .floating-controls { opacity: 0; transition: opacity 0.2s; }
        .floating-img-wrapper.locked:hover .floating-controls { opacity: 1; }
    `;
    document.head.appendChild(style);

    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    document.body.innerHTML = `
        <div id="menu-bar">
            <div class="menu-item" id="menu-file" data-i18n="menuFile">File</div>
            <div class="menu-item" id="menu-edit" data-i18n="menuEdit">Edit</div>
            <div class="menu-item" id="menu-view" data-i18n="menuView">View</div>
        </div>
        
        <div id="tool-bar">
            <button id="undo-btn" class="toolbar-btn" data-i18n-title="undoTitle"><i class="fa-solid fa-rotate-left"></i></button>
            <button id="redo-btn" class="toolbar-btn" data-i18n-title="redoTitle"><i class="fa-solid fa-rotate-right"></i></button>
            <div class="toolbar-separator"></div>
            <button id="clear-btn" class="toolbar-btn" data-i18n-title="clearTitle"><i class="fa-solid fa-chalkboard"></i> <span data-i18n="clearBtn">Clear</span></button>
            <button id="download-btn" class="toolbar-btn" data-i18n-title="saveTitle"><i class="fa-solid fa-download"></i> <span data-i18n="saveBtn">Save PNG</span></button>
            <div class="toolbar-separator"></div>
            <button id="import-btn" class="toolbar-btn" data-i18n-title="insertTitle"><i class="fa-solid fa-image"></i> <span data-i18n="insertBtn">Insert Image...</span></button>
            
            <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
                <button id="canvas-theme-toggle" class="toolbar-btn" data-i18n-title="canvasThemeTitle">
                    <i class="fa-solid fa-circle-half-stroke"></i>
                </button>
                <button id="lang-toggle" class="toolbar-btn font-bold" data-i18n-title="langTitle">
                    DE
                </button>
                <div class="toolbar-separator"></div>
                <i class="fa-solid fa-weight-hanging text-[10px]"></i> <span data-i18n="sizeText">Size:</span>
                <input type="range" id="size-slider" min="1" max="50" value="4">
                <span id="size-display" style="width: 24px; text-align: right;">4</span>
            </div>
        </div>

        <div id="main-area">
            <div id="sidebar">
                <div class="side-tool active main-tool" data-tool="pen" data-i18n-title="toolPen"><i class="fa-solid fa-pen"></i></div>
                <div class="side-tool main-tool" data-tool="eraser" data-i18n-title="toolEraser"><i class="fa-solid fa-eraser"></i></div>
                <div class="side-tool main-tool" data-tool="rect" data-i18n-title="toolRect"><i class="fa-regular fa-square"></i></div>
                <div class="side-tool main-tool" data-tool="circle" data-i18n-title="toolCircle"><i class="fa-regular fa-circle"></i></div>
                <div class="side-tool main-tool" data-tool="line" data-i18n-title="toolLine"><i class="fa-solid fa-minus"></i></div>
                
                <div id="color-palette">
                    <!-- Standard Whiteboard Marker Colors -->
                    <div class="color-btn active" style="background:#000000;" data-color="#000000" title="Black"></div>
                    <div class="color-btn" style="background:#ed1c24;" data-color="#ed1c24" title="Red"></div>
                    <div class="color-btn" style="background:#22b14c;" data-color="#22b14c" title="Green"></div>
                    <div class="color-btn" style="background:#3f48cc;" data-color="#3f48cc" title="Blue"></div>
                    <div class="color-btn" style="background:#ffc90e;" data-color="#ffc90e" title="Yellow"></div>
                    <div class="color-btn" style="background:#a349a4;" data-color="#a349a4" title="Purple"></div>
                    <div class="color-btn" style="background:#ff7f27;" data-color="#ff7f27" title="Orange"></div>
                    <div class="color-btn" id="whiteout-btn" style="background:#ffffff;" data-color="#ffffff" data-i18n-title="colorWhiteTitle"></div>
                    <input type="color" id="color-picker" title="Custom Color" value="#000000">
                </div>
            </div>
            
            <div id="workspace-container">
                <div class="canvas-wrapper" id="canvas-wrapper">
                    <canvas id="board" width="1920" height="1080"></canvas>
                </div>
            </div>
        </div>

        <div id="status-bar">
            <span id="coords-display"><i class="fa-solid fa-location-crosshairs"></i> 0, 0px</span>
            <div class="toolbar-separator" style="height: 12px;"></div>
            <span id="canvas-size-display"><i class="fa-solid fa-maximize"></i> 1920 x 1080px</span>
            <div class="toolbar-separator" style="height: 12px;"></div>
            <span id="status-msg" data-i18n="statusReady">Ready</span>
        </div>

        <div id="image-search-panel">
            <div class="modal-header">
                <span data-i18n="searchHeader">Insert Web Image</span>
                <div class="modal-close" id="image-search-close"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div class="search-controls">
                <input type="text" id="image-search-input" data-i18n-placeholder="searchPlaceholder" placeholder="Search Wikimedia Commons...">
                <button id="image-search-btn" class="toolbar-btn" style="background: var(--color-kde-panel-hover);"><span data-i18n="searchBtn">Search</span></button>
            </div>
            <div id="image-search-results">
                <div style="color: rgba(127,127,127,0.8); width: 100%; text-align: center; margin-top: 40px;" data-i18n="searchEmpty">
                    Search to insert an image onto the whiteboard.
                </div>
            </div>
        </div>
    `;

    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const container = document.getElementById('workspace-container');
    const canvasWrapper = document.getElementById('canvas-wrapper');
    const coordsDisplay = document.getElementById('coords-display');
    const statusMsg = document.getElementById('status-msg');
    
    let isDrawing = false, lastX = 0, lastY = 0, startX = 0, startY = 0;
    let draftState = null;
    let currentTool = 'pen';
    let currentColor = '#000000'; 
    let currentSize = 4;
    let undoStack = [], redoStack = [];
    
    // Canvas dark mode variables
    let isCanvasDark = false;
    let canvasBgColor = '#ffffff';

    function applyLanguage() {
        const dict = i18n[currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = dict[el.dataset.i18n];
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = dict[el.dataset.i18nTitle];
        });
        const searchInput = document.getElementById('image-search-input');
        if (searchInput && dict.searchPlaceholder) {
            searchInput.placeholder = dict.searchPlaceholder;
        }
        
        const langBtn = document.getElementById('lang-toggle');
        if(langBtn) {
            langBtn.textContent = currentLang === 'en' ? 'DE' : 'EN';
        }
    }

    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        applyLanguage();
    });

    function initCanvas() {
        ctx.fillStyle = canvasBgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
        
        applyLanguage();
    }

    function setStatus(msgKey) {
        const msg = i18n[currentLang][msgKey] || msgKey;
        statusMsg.textContent = msg;
        setTimeout(() => { if (statusMsg.textContent === msg) statusMsg.textContent = i18n[currentLang].statusReady; }, 4000);
    }
    
    function saveState() {
        if (undoStack.length > 25) undoStack.shift(); 
        undoStack.push(canvas.toDataURL());
        redoStack = [];
    }
    
    function restoreState(dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.restore();
        };
    }
    
    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return { 
            x: (e.clientX - rect.left) * scaleX, 
            y: (e.clientY - rect.top) * scaleY 
        };
    }

    container.addEventListener('pointermove', (e) => {
        if (e.target === canvas || canvasWrapper.contains(e.target)) {
            const c = getCoords(e);
            coordsDisplay.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> ${Math.round(c.x)}, ${Math.round(c.y)}px`;
        }
    });
    
    function applyBrush() {
        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (currentTool === 'eraser') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = canvasBgColor; 
            ctx.fillStyle = canvasBgColor;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
            ctx.fillStyle = currentColor;
        }
    }
    
    function startDrawing(e) {
        if (e.target !== canvas || e.button === 2) return;
        isDrawing = true;
        const c = getCoords(e);
        startX = c.x; startY = c.y; lastX = c.x; lastY = c.y;
        
        draftState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        
        if (['pen', 'eraser'].includes(currentTool)) {
            ctx.lineTo(lastX, lastY);
            applyBrush();
            ctx.stroke();
        }
    }
    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const c = getCoords(e);
        
        if (['pen', 'eraser'].includes(currentTool)) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(c.x, c.y);
            applyBrush();
            ctx.stroke();
            lastX = c.x; lastY = c.y;
        } else {
            ctx.putImageData(draftState, 0, 0);
            ctx.beginPath();
            applyBrush();
            
            const dx = c.x - startX;
            const dy = c.y - startY;
            
            if (currentTool === 'rect') {
                ctx.rect(startX, startY, dx, dy);
            } else if (currentTool === 'circle') {
                const rx = Math.abs(dx) / 2;
                const ry = Math.abs(dy) / 2;
                const cx = startX + dx / 2;
                const cy = startY + dy / 2;
                ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
            } else if (currentTool === 'line') {
                ctx.moveTo(startX, startY);
                ctx.lineTo(c.x, c.y);
            }
            ctx.stroke();
        }
    }
    
    function stopDrawing() {
        if (isDrawing) { 
            isDrawing = false; 
            saveState(); 
        }
    }
    
    canvas.addEventListener('pointerdown', startDrawing);
    window.addEventListener('pointermove', draw);
    window.addEventListener('pointerup', stopDrawing);
    window.addEventListener('pointercancel', stopDrawing);
    
    const colorPicker = document.getElementById('color-picker');
    
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            colorPicker.classList.remove('active');
            this.classList.add('active');
            currentColor = this.dataset.color;
            if (currentTool === 'eraser') { document.querySelector('[data-tool="pen"]')?.click(); }
        });
    });
    
    colorPicker.addEventListener('input', function(e) {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentColor = e.target.value;
        if (currentTool === 'eraser') { document.querySelector('[data-tool="pen"]')?.click(); }
    });
    
    const sizeDisplay = document.getElementById('size-display');
    document.getElementById('size-slider').addEventListener('input', e => {
        currentSize = parseFloat(e.target.value);
        sizeDisplay.textContent = Math.round(currentSize);
    });
    
    document.querySelectorAll('.main-tool').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.main-tool').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTool = this.dataset.tool;
            const dict = i18n[currentLang];
            const toolNameKey = 'tool' + currentTool.charAt(0).toUpperCase() + currentTool.slice(1);
            setStatus(dict[toolNameKey] ? dict[toolNameKey] : currentTool);
        });
    });
    
    function undo() {
        if (undoStack.length > 1) {
            redoStack.push(undoStack.pop());
            restoreState(undoStack[undoStack.length - 1]);
        }
    }
    function redo() {
        if (redoStack.length > 0) {
            const state = redoStack.pop();
            undoStack.push(state);
            restoreState(state);
        }
    }
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);
    
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z') { e.preventDefault(); undo(); }
            if (e.key === 'y') { e.preventDefault(); redo(); }
        }
        if (e.key === 'Escape') {
            document.getElementById('image-search-panel').style.display = 'none';
        }
    });
    
    document.getElementById('clear-btn').addEventListener('click', () => {
        ctx.fillStyle = canvasBgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
        document.querySelectorAll('.floating-img-wrapper').forEach(el => el.remove());
        setStatus('statusCleared');
    });

    const canvasThemeBtn = document.getElementById('canvas-theme-toggle');
    canvasThemeBtn.addEventListener('click', () => {
        isCanvasDark = !isCanvasDark;
        canvasBgColor = isCanvasDark ? '#1a1b1e' : '#ffffff';
        canvasWrapper.style.backgroundColor = canvasBgColor;

        // Invert current drawn canvas pixels
        const tmp = document.createElement('canvas');
        tmp.width = canvas.width; tmp.height = canvas.height;
        const tctx = tmp.getContext('2d');
        tctx.drawImage(canvas, 0, 0);
        
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.filter = 'invert(1)';
        ctx.drawImage(tmp, 0, 0);
        ctx.restore();

        // Hex inversion helper
        function invertHex(hex) {
            if (!hex) return '#ffffff';
            let h = hex.replace('#', '');
            if (h.length === 3) h = h.split('').map(x => x + x).join('');
            const r = (255 - parseInt(h.slice(0, 2), 16)).toString(16).padStart(2, '0');
            const g = (255 - parseInt(h.slice(2, 4), 16)).toString(16).padStart(2, '0');
            const b = (255 - parseInt(h.slice(4, 6), 16)).toString(16).padStart(2, '0');
            return '#' + r + g + b;
        }

        // Invert palette buttons logic
        document.querySelectorAll('.color-btn').forEach(btn => {
            const currentHex = btn.dataset.color;
            const newHex = invertHex(currentHex);
            btn.dataset.color = newHex;
            btn.style.background = newHex;
        });

        colorPicker.value = invertHex(colorPicker.value);
        currentColor = invertHex(currentColor);

        // Reset undo history to prevent mismatch bugs 
        undoStack = [];
        redoStack = [];
        saveState();
    });
    
    document.getElementById('download-btn').addEventListener('click', () => {
        setStatus('statusExporting');
        const tmp = document.createElement('canvas');
        tmp.width = canvas.width; 
        tmp.height = canvas.height;
        const tctx = tmp.getContext('2d');
        
        tctx.drawImage(canvas, 0, 0);
        
        const cRect = canvas.getBoundingClientRect();
        document.querySelectorAll('.floating-img-wrapper').forEach(f => {
            const img = f.querySelector('img');
            const left = parseFloat(f.style.left) || 0;
            const top = parseFloat(f.style.top) || 0;
            const w = parseFloat(f.style.width) || 0;
            const h = parseFloat(f.style.height) || 0;
            
            const scaleX = canvas.width / cRect.width;
            const scaleY = canvas.height / cRect.height;
            
            tctx.drawImage(img, left * scaleX, top * scaleY, w * scaleX, h * scaleY);
        });
        
        const link = document.createElement('a');
        link.download = 'Virtual_Whiteboard_Export.png';
        link.href = tmp.toDataURL('image/png');
        link.click();
        setStatus('statusExported');
    });
    
    const searchPanel = document.getElementById('image-search-panel');
    const searchInput = document.getElementById('image-search-input');
    
    document.getElementById('import-btn').addEventListener('click', () => {
        searchPanel.style.display = 'flex';
        searchInput.focus();
    });
    
    document.getElementById('image-search-close').addEventListener('click', () => {
        searchPanel.style.display = 'none';
    });

    async function searchImages(query) {
        if (!query.trim()) return;
        const resultsDiv = document.getElementById('image-search-results');
        const loadingMsg = i18n[currentLang].searchLoading;
        resultsDiv.innerHTML = `<div style="width:100%; text-align:center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin text-2xl"></i><br>${loadingMsg}</div>`;
        
        try {
            const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(query) + '&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|dimensions&iiurlwidth=200&format=json&origin=*';
            const res = await fetch(url);
            const data = await res.json();
            
            resultsDiv.innerHTML = '';
            if (data.query && data.query.pages) {
                Object.values(data.query.pages).forEach(page => {
                    if (page.imageinfo && page.imageinfo[0]) {
                        const info = page.imageinfo[0];
                        const thumbUrl = info.thumburl || info.url;
                        const fullUrl = info.url;
                        const img = document.createElement('img');
                        img.crossOrigin = 'Anonymous';
                        img.src = thumbUrl;
                        img.className = 'search-result-img';
                        img.title = 'Click to insert';
                        
                        img.addEventListener('click', () => {
                            const rect = canvasWrapper.getBoundingClientRect();
                            const maxDim = Math.min(rect.width, rect.height) / 2;
                            let w = info.width || 200, h = info.height || 200;
                            
                            if (w > maxDim || h > maxDim) {
                                const ratio = Math.min(maxDim / w, maxDim / h);
                                w *= ratio; h *= ratio;
                            }
                            
                            const wrapper = document.createElement('div');
                            wrapper.className = 'floating-img-wrapper';
                            wrapper.style.width = w + 'px';
                            wrapper.style.height = h + 'px';
                            const centerLeft = (rect.width / 2) - (w / 2);
                            const centerTop = (rect.height / 2) - (h / 2);
                            wrapper.style.left = centerLeft + 'px';
                            wrapper.style.top = centerTop + 'px';
                            
                            const innerImg = document.createElement('img');
                            innerImg.crossOrigin = 'Anonymous';
                            innerImg.src = fullUrl;
                            
                            const dragArea = document.createElement('div');
                            dragArea.className = 'drag-area';
                            const resizeHandle = document.createElement('div');
                            resizeHandle.className = 'resize-handle';
                            const controls = document.createElement('div');
                            controls.className = 'floating-controls';
                            
                            const lockBtn = document.createElement('button');
                            lockBtn.className = 'floating-btn lock-btn';
                            lockBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i> <span>${i18n[currentLang].stampBtn}</span>`;
                            lockBtn.title = i18n[currentLang].stampTitle;
                            
                            const delBtn = document.createElement('button');
                            delBtn.className = 'floating-btn delete-btn';
                            delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                            
                            controls.appendChild(lockBtn);
                            controls.appendChild(delBtn);
                            wrapper.appendChild(innerImg);
                            wrapper.appendChild(dragArea);
                            wrapper.appendChild(resizeHandle);
                            wrapper.appendChild(controls);
                            canvasWrapper.appendChild(wrapper);
                            
                            let isDragging = false, startX, startY, initL, initT;
                            dragArea.addEventListener('pointerdown', e => {
                                isDragging = true;
                                startX = e.clientX; startY = e.clientY;
                                initL = parseFloat(wrapper.style.left) || 0;
                                initT = parseFloat(wrapper.style.top) || 0;
                                dragArea.setPointerCapture(e.pointerId);
                                e.stopPropagation();
                            });
                            dragArea.addEventListener('pointermove', e => {
                                if (!isDragging) return;
                                wrapper.style.left = (initL + (e.clientX - startX)) + 'px';
                                wrapper.style.top = (initT + (e.clientY - startY)) + 'px';
                                e.stopPropagation();
                            });
                            dragArea.addEventListener('pointerup', e => {
                                isDragging = false;
                                dragArea.releasePointerCapture(e.pointerId);
                                e.stopPropagation();
                            });
                            
                            let isResizing = false, initW, initH;
                            resizeHandle.addEventListener('pointerdown', e => {
                                isResizing = true;
                                startX = e.clientX; startY = e.clientY;
                                initW = parseFloat(wrapper.style.width) || 0;
                                initH = parseFloat(wrapper.style.height) || 0;
                                resizeHandle.setPointerCapture(e.pointerId);
                                e.stopPropagation();
                            });
                            resizeHandle.addEventListener('pointermove', e => {
                                if (!isResizing) return;
                                wrapper.style.width = Math.max(20, initW + (e.clientX - startX)) + 'px';
                                wrapper.style.height = Math.max(20, initH + (e.clientY - startY)) + 'px';
                                e.stopPropagation();
                            });
                            resizeHandle.addEventListener('pointerup', e => {
                                isResizing = false;
                                resizeHandle.releasePointerCapture(e.pointerId);
                                e.stopPropagation();
                            });
                            
                            lockBtn.addEventListener('click', e => {
                                // Fetch a fresh bounding rect in case the window was resized
                                const currentRect = canvasWrapper.getBoundingClientRect();
                                const currentScaleX = canvas.width / currentRect.width;
                                const currentScaleY = canvas.height / currentRect.height;
                                ctx.drawImage(
                                    innerImg, 
                                    parseFloat(wrapper.style.left) * currentScaleX, 
                                    parseFloat(wrapper.style.top) * currentScaleY, 
                                    parseFloat(wrapper.style.width) * currentScaleX, 
                                    parseFloat(wrapper.style.height) * currentScaleY
                                );
                                saveState();
                                wrapper.remove();
                                setStatus('statusStamped');
                                e.stopPropagation();
                            });
                            
                            delBtn.addEventListener('click', e => {
                                wrapper.remove();
                                e.stopPropagation();
                            });
                            
                            searchPanel.style.display = 'none';
                            setStatus('statusInserted');
                        });
                        resultsDiv.appendChild(img);
                    }
                });
            } else {
                resultsDiv.innerHTML = `<div style="width:100%; text-align:center; padding: 20px;">${i18n[currentLang].searchNoResults}</div>`;
            }
        } catch (e) {
            resultsDiv.innerHTML = `<div style="width:100%; text-align:center; padding: 20px; color:#da4453;">${i18n[currentLang].searchError}</div>`;
        }
    }
    
    document.getElementById('image-search-btn').addEventListener('click', () => searchImages(searchInput.value));
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchImages(searchInput.value); });
    
    document.getElementById('menu-file').addEventListener('click', () => document.getElementById('download-btn').click());
    
    initCanvas();
    console.log("Virtual Whiteboard initialized successfully.");
})();