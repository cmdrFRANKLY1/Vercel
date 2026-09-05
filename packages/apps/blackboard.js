(function() {
    "use strict";

    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['blackboard'] = {
            name: 'Blackboard',
            version: '1.3.0',
            description: 'A drawing board with shape tools and image search (KDE Edition)',
            preInstalledOn: ['default'],
            translations: {},
            commands: {
                blackboard: function(args) {
                    console.log("Blackboard launched.");
                }
            },
            commandInfo: {
                blackboard: "what is this command?\nblackboard\n\nwhat is it used for?\nOpens the Blackboard drawing application featuring a KDE-inspired visual theme, drawing tools, shapes, and image search."
            }
        };
    }

    const style = document.createElement('style');
    style.textContent = `
        :root {
            --bg-color: #31363b;
            --text-color: #eff0f1;
            --font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            --font-size: 13px;
            --panel-bg: #2a2e32;
            --sidebar-bg: #232629;
            --border-solid: #1d2023;
            --accent-color: #3daee9;
            --warning-color: #f67400;
            --danger-color: #da4453;
            --success-color: #27ae60;
            --sub-color: #888888;
        }
        body.inverted {
            --bg-color: #eff0f1;
            --text-color: #31363b;
            --panel-bg: #fcfcfc;
            --sidebar-bg: #f0f0f0;
            --border-solid: #bdc3c7;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-user-select: none; }
        input, textarea { user-select: text !important; -webkit-user-select: text !important; }
        body, html {
            height: 100%;
            width: 100%;
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: var(--font-size);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        #waybar {
            height: 36px;
            min-height: 36px;
            background-color: var(--panel-bg);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px solid var(--border-solid);
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            flex-shrink: 0;
        }
        .waybar-group { display: flex; align-items: center; gap: 4px; height: 100%; }
        .waybar-btn {
            cursor: pointer;
            padding: 0 10px;
            height: 28px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 500;
            color: var(--text-color);
            background: transparent;
            border: 1px solid transparent;
            border-radius: 4px;
            font-family: inherit;
            font-size: 12px;
            transition: all 0.15s ease;
        }
        .waybar-btn:hover { background: rgba(61, 174, 233, 0.15); border-color: rgba(61, 174, 233, 0.3); }
        .waybar-btn.active, .waybar-btn:active { background: var(--accent-color); color: #fff; border-color: #2980b9; }
        .waybar-btn svg { width: 14px; height: 14px; fill: currentColor; }
        
        #workspace-container {
            flex-grow: 1;
            position: relative;
            background-color: #1a1c1e;
            cursor: crosshair;
            overflow: hidden;
            min-height: 0;
        }
        canvas {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            touch-action: none;
        }
        #tabs-bar {
            height: 42px;
            min-height: 42px;
            background-color: var(--panel-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 12px;
            border-top: 1px solid var(--border-solid);
            z-index: 101;
            gap: 12px;
            flex-shrink: 0;
        }
        .toolbar-group {
            display: flex;
            align-items: center;
            height: 28px;
            padding: 0 8px;
            background: var(--sidebar-bg);
            border: 1px solid var(--border-solid);
            border-radius: 4px;
            gap: 8px;
        }
        input[type=range] {
            -webkit-appearance: none;
            appearance: none;
            width: 80px;
            background: transparent;
            height: 16px;
        }
        input[type=range]:focus { outline: none; }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background: var(--border-solid);
            border-radius: 2px;
            cursor: pointer;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 12px;
            width: 12px;
            background: var(--accent-color);
            border-radius: 50%;
            cursor: pointer;
            margin-top: -4px;
        }
        .color-btn {
            width: 16px;
            height: 16px;
            cursor: pointer;
            border: 2px solid transparent;
            border-radius: 3px;
            box-sizing: border-box;
            transition: transform 0.1s;
        }
        .color-btn:hover { transform: scale(1.15); }
        .color-btn.active { border-color: #fff; box-shadow: 0 0 4px var(--accent-color); }
        input[type="color"]#color-picker {
            -webkit-appearance: none;
            appearance: none;
            border: 1px solid var(--border-solid);
            width: 18px;
            height: 18px;
            padding: 0;
            background: transparent;
            cursor: pointer;
            border-radius: 3px;
        }
        input[type="color"]#color-picker::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]#color-picker::-webkit-color-swatch { border: none; border-radius: 2px; }
        
        #shape-context-menu {
            position: fixed;
            display: none;
            flex-direction: column;
            background-color: var(--panel-bg);
            border: 1px solid var(--border-solid);
            border-radius: 6px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
            z-index: 2000;
            min-width: 140px;
            overflow: hidden;
        }
        .ctx-item {
            padding: 8px 14px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            border-bottom: 1px solid var(--border-solid);
            transition: background 0.1s;
        }
        .ctx-item:last-child { border-bottom: none; }
        .ctx-item:hover, .ctx-item.active { background-color: var(--accent-color); color: #fff; }

        #image-search-panel {
            position: absolute;
            bottom: 42px;
            left: 0;
            width: 100%;
            height: 280px;
            background-color: var(--panel-bg);
            border-top: 1px solid var(--border-solid);
            display: none;
            flex-direction: column;
            z-index: 1500;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.4);
        }
        .search-header {
            display: flex;
            padding: 10px 14px;
            border-bottom: 1px solid var(--border-solid);
            gap: 10px;
            align-items: center;
            background: var(--sidebar-bg);
        }
        .search-header input {
            background: var(--bg-color);
            border: 1px solid var(--border-solid);
            color: var(--text-color);
            font-family: inherit;
            font-size: inherit;
            padding: 6px 10px;
            border-radius: 4px;
            flex-grow: 1;
            outline: none;
        }
        .search-header input:focus { border-color: var(--accent-color); }
        #image-search-results {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            padding: 14px;
            overflow-y: auto;
            flex-grow: 1;
            justify-content: center;
            align-content: flex-start;
        }
        .search-result-img {
            max-height: 110px;
            cursor: pointer;
            border: 2px solid transparent;
            border-radius: 4px;
            transition: transform 0.15s, border-color 0.15s;
        }
        .search-result-img:hover {
            transform: scale(1.03);
            border-color: var(--accent-color);
        }
        
        .floating-img-wrapper {
            position: absolute;
            border: 1px dashed var(--accent-color);
            box-sizing: border-box;
            z-index: 100;
            background: rgba(0,0,0,0.1);
        }
        .floating-img-wrapper.locked { border: 1px solid transparent; }
        .floating-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: fill;
            pointer-events: none;
            display: block;
        }
        body.inverted .floating-img-wrapper img { filter: invert(1); }
        .floating-controls {
            position: absolute;
            top: -22px; right: -1px;
            display: flex;
            gap: 2px;
            pointer-events: auto;
        }
        .floating-btn {
            background: var(--panel-bg);
            color: var(--text-color);
            border: 1px solid var(--border-solid);
            font-family: inherit;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
            padding: 2px 6px;
            border-radius: 3px 3px 0 0;
        }
        .floating-btn:hover { background: var(--accent-color); color: #fff; }
        .resize-handle {
            position: absolute;
            bottom: -6px; right: -6px;
            width: 12px; height: 12px;
            background: var(--accent-color);
            border: 1px solid var(--panel-bg);
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
        .floating-img-wrapper.locked .floating-controls { opacity: 0.2; transition: opacity 0.2s; }
        .floating-img-wrapper.locked:hover .floating-controls { opacity: 1; }
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
        <div id="waybar">
            <div class="waybar-group">
                <button id="theme-toggle" class="waybar-btn" title="Toggle Theme">INV</button>
                <button id="undo-btn" class="waybar-btn" title="Undo">UNDO</button>
                <button id="redo-btn" class="waybar-btn" title="Redo">REDO</button>
                <button id="clear-btn" class="waybar-btn" title="Clear Board">CLR</button>
                <button id="download-btn" class="waybar-btn" title="Save Image">SAVE</button>
                <button id="close-app-btn" class="waybar-btn" title="Close">CLOSE</button>
            </div>
            <div class="waybar-group">
                <span id="msg-text" style="font-family: monospace; font-size: 11px; color: var(--sub-color); padding-right: 8px;">SYSTEM.READY</span>
            </div>
        </div>
        <div id="workspace-container">
            <canvas id="board"></canvas>
        </div>
        <div id="shape-context-menu">
            <div class="ctx-item" data-tool="pen">PENCIL</div>
            <div class="ctx-item" data-tool="rect">RECTANGLE</div>
            <div class="ctx-item" data-tool="square">SQUARE</div>
            <div class="ctx-item" data-tool="circle">CIRCLE</div>
            <div class="ctx-item" data-tool="triangle">TRIANGLE</div>
            <div class="ctx-item" id="ctx-pictures">PICTURES</div>
        </div>
        <div id="image-search-panel">
            <div class="search-header">
                <span style="font-weight:700;font-size:11px;color:var(--sub-color);">IMG_SEARCH:</span>
                <input type="text" id="image-search-input" placeholder="Search Wikimedia Commons...">
                <button id="image-search-btn" class="waybar-btn">SEARCH</button>
                <button id="image-search-close" class="waybar-btn">CLOSE</button>
            </div>
            <div id="image-search-results"></div>
        </div>
        <div id="tabs-bar">
            <button class="waybar-btn main-tool active" data-tool="pen">PEN</button>
            <button class="waybar-btn main-tool" data-tool="eraser">ERASE</button>
            <div class="toolbar-group" title="Stroke Width">
                <span style="font-size:11px;font-weight:700;color:var(--sub-color);">SZ:</span>
                <input type="range" id="size-slider" min="1" max="50" value="3">
                <span id="size-display" style="width: 2ch; text-align: right; font-family: monospace; font-size: 11px;">03</span>
            </div>
            <div class="toolbar-group" id="color-palette">
                <div class="color-btn active" style="background:#ffffff;" data-color="#ffffff" title="White"></div>
                <div class="color-btn" style="background:#ff0000;" data-color="#ff0000" title="Red"></div>
                <div class="color-btn" style="background:#00ff00;" data-color="#00ff00" title="Green"></div>
                <div class="color-btn" style="background:#0000ff;" data-color="#0000ff" title="Blue"></div>
                <div class="color-btn" style="background:#ffff00;" data-color="#ffff00" title="Yellow"></div>
                <div class="color-btn" style="background:#ff00ff;" data-color="#ff00ff" title="Magenta"></div>
                <div class="color-btn" style="background:#00ffff;" data-color="#00ffff" title="Cyan"></div>
                <div style="width: 1px; height: 14px; background: var(--border-solid); margin: 0 2px;"></div>
                <input type="color" id="color-picker" title="Custom Color" value="#ff0000">
            </div>
        </div>
    `;

    // --- Application Logic ---
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const container = document.getElementById('workspace-container');
    const msgText = document.getElementById('msg-text');
    let isDrawing = false, lastX = 0, lastY = 0, startX = 0, startY = 0;
    let draftState = null, currentTool = 'pen', currentColor = '#ffffff', currentSize = 3;
    let undoStack = [], redoStack = [], msgTimer = null;
    
    function updateClock() {
        if (msgTimer !== null) return;
        const now = new Date();
        msgText.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).toUpperCase();
    }
    
    function showMessage(msg) {
        msgText.textContent = msg.toUpperCase();
        clearTimeout(msgTimer);
        msgTimer = setTimeout(() => { msgTimer = null; updateClock(); }, 2000);
    }
    
    setInterval(updateClock, 1000);
    updateClock();
    
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        let tempCanvas = null;
        if (canvas.width > 0 && canvas.height > 0) {
            tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
        }
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (tempCanvas) {
            ctx.save();
            ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
            ctx.restore();
        } else if (undoStack.length === 0) { 
            saveState(); 
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    setTimeout(resizeCanvas, 50);
    let resizeTimeout;
    window.addEventListener('resize', () => { 
        clearTimeout(resizeTimeout); 
        resizeTimeout = setTimeout(resizeCanvas, 150); 
    });
    
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
        const rect = container.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    
    function applyBrush() {
        ctx.lineWidth = currentSize;
        if (currentTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
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
            const dx = c.x - startX, dy = c.y - startY;
            if (currentTool === 'rect') {
                ctx.rect(startX, startY, dx, dy);
            } else if (currentTool === 'square') {
                const side = Math.max(Math.abs(dx), Math.abs(dy));
                const signX = dx < 0 ? -1 : 1, signY = dy < 0 ? -1 : 1;
                ctx.rect(startX, startY, side * signX, side * signY);
            } else if (currentTool === 'circle') {
                const radius = Math.hypot(dx, dy);
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            } else if (currentTool === 'triangle') {
                ctx.moveTo(startX + dx / 2, startY);
                ctx.lineTo(startX, startY + dy);
                ctx.lineTo(startX + dx, startY + dy);
                ctx.closePath();
            }
            ctx.stroke();
        }
    }
    
    function stopDrawing() {
        if (isDrawing) { isDrawing = false; saveState(); }
    }
    
    canvas.addEventListener('pointerdown', startDrawing);
    window.addEventListener('pointermove', draw);
    window.addEventListener('pointerup', stopDrawing);
    window.addEventListener('pointercancel', stopDrawing);
    
    const ctxMenu = document.getElementById('shape-context-menu');
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        ctxMenu.style.display = 'flex';
        let left = e.clientX, top = e.clientY;
        if (left + ctxMenu.offsetWidth > window.innerWidth) left = window.innerWidth - ctxMenu.offsetWidth;
        if (top + ctxMenu.offsetHeight > window.innerHeight) top = window.innerHeight - ctxMenu.offsetHeight;
        ctxMenu.style.left = left + 'px';
        ctxMenu.style.top = top + 'px';
    });
    
    window.addEventListener('pointerdown', (e) => {
        if (e.button !== 2 && !ctxMenu.contains(e.target)) { ctxMenu.style.display = 'none'; }
    });
    
    document.querySelectorAll('.ctx-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.id === 'ctx-pictures') {
                document.getElementById('image-search-panel').style.display = 'flex';
                ctxMenu.style.display = 'none';
                document.getElementById('image-search-input').focus();
                return;
            }
            document.querySelectorAll('.main-tool').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.ctx-item').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTool = this.dataset.tool;
            showMessage('TOOL:' + currentTool.toUpperCase());
            ctxMenu.style.display = 'none';
        });
    });
    
    const colorPicker = document.getElementById('color-picker');
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            colorPicker.classList.remove('active');
            this.classList.add('active');
            currentColor = this.dataset.color;
            if (currentTool === 'eraser') { document.querySelector('[data-tool="pen"]')?.click(); }
            showMessage('COLOR:' + currentColor);
        });
    });
    
    colorPicker.addEventListener('input', function(e) {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentColor = e.target.value;
        if (currentTool === 'eraser') { document.querySelector('[data-tool="pen"]')?.click(); }
        showMessage('COLOR:' + currentColor);
    });
    
    const sizeDisplay = document.getElementById('size-display');
    document.getElementById('size-slider').addEventListener('input', e => {
        currentSize = parseFloat(e.target.value);
        sizeDisplay.textContent = Math.round(currentSize).toString().padStart(2, '0');
    });
    
    document.querySelectorAll('.main-tool').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.main-tool').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.ctx-item').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTool = this.dataset.tool;
            showMessage('TOOL:' + currentTool.toUpperCase());
        });
    });
    
    function undo() {
        if (undoStack.length > 1) {
            redoStack.push(undoStack.pop());
            restoreState(undoStack[undoStack.length - 1]);
            showMessage('ACTION:UNDO');
        }
    }
    
    function redo() {
        if (redoStack.length > 0) {
            const state = redoStack.pop();
            undoStack.push(state);
            restoreState(state);
            showMessage('ACTION:REDO');
        }
    }
    
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);
    
    document.getElementById('close-app-btn').addEventListener('click', () => {
        const parentContainer = document.getElementById('app-container-blackboard');
        if (parentContainer) parentContainer.remove();
        else if (window.parent && window.parent !== window) {
            try {
                if (typeof window.parent.closeWrapperTab === 'function') {
                    window.parent.closeWrapperTab();
                } else if (typeof window.parent.closeWrapperWindow === 'function') {
                    window.parent.closeWrapperWindow();
                }
            } catch(e) {}
        } else {
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#232629;color:#eff0f1;font-family:sans-serif;">Blackboard Closed</div>';
        }
    });
    
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z') { e.preventDefault(); undo(); }
            if (e.key === 'y') { e.preventDefault(); redo(); }
        }
        if (e.key === 'Escape') {
            const searchPanel = document.getElementById('image-search-panel');
            if (searchPanel.style.display === 'flex') searchPanel.style.display = 'none';
            if (ctxMenu.style.display === 'flex') ctxMenu.style.display = 'none';
        }
    });
    
    document.getElementById('clear-btn').addEventListener('click', () => {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        saveState();
        document.querySelectorAll('.floating-img-wrapper').forEach(el => el.remove());
        showMessage('MEM:FLUSHED');
    });
    
    document.getElementById('download-btn').addEventListener('click', () => {
        const tmp = document.createElement('canvas');
        tmp.width = canvas.width; tmp.height = canvas.height;
        const tctx = tmp.getContext('2d');
        const bg = window.getComputedStyle(document.body).getPropertyValue('--bg-color').trim();
        tctx.fillStyle = bg || '#31363b';
        tctx.fillRect(0, 0, tmp.width, tmp.height);
        tctx.drawImage(canvas, 0, 0);
        const dpr = window.devicePixelRatio || 1;
        const cRect = canvas.getBoundingClientRect();
        document.querySelectorAll('.floating-img-wrapper').forEach(f => {
            const img = f.querySelector('img');
            const rect = f.getBoundingClientRect();
            const x = (rect.left - cRect.left) * dpr;
            const y = (rect.top - cRect.top) * dpr;
            const w = rect.width * dpr, h = rect.height * dpr;
            tctx.filter = document.body.classList.contains('inverted') ? 'invert(1)' : 'none';
            tctx.drawImage(img, x, y, w, h);
        });
        const link = document.createElement('a');
        link.download = 'BLACKBOARD_' + Math.floor(Date.now() / 1000) + '.png';
        link.href = tmp.toDataURL('image/png');
        link.click();
        showMessage('DATA:EXPORTED');
    });
    
    const searchInput = document.getElementById('image-search-input');
    const searchBtn = document.getElementById('image-search-btn');
    const searchClose = document.getElementById('image-search-close');
    const searchResults = document.getElementById('image-search-results');
    
    async function searchImages(query) {
        if (!query.trim()) return;
        searchResults.innerHTML = '<span style="padding:12px;color:var(--sub-color);">SEARCHING...</span>';
        try {
            const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(query) + '&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|dimensions&iiurlwidth=200&format=json&origin=*';
            const res = await fetch(url);
            const data = await res.json();
            searchResults.innerHTML = '';
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
                            const rect = container.getBoundingClientRect();
                            const maxDim = Math.min(rect.width, rect.height) / 2;
                            let w = info.width || 100, h = info.height || 100;
                            if (w > maxDim || h > maxDim) {
                                const ratio = Math.min(maxDim / w, maxDim / h);
                                w *= ratio; h *= ratio;
                            }
                            const wrapper = document.createElement('div');
                            wrapper.className = 'floating-img-wrapper';
                            wrapper.style.width = w + 'px';
                            wrapper.style.height = h + 'px';
                            wrapper.style.left = (rect.width / 2 - w / 2) + 'px';
                            wrapper.style.top = (rect.height / 2 - h / 2) + 'px';
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
                            lockBtn.innerText = 'LOCK';
                            const delBtn = document.createElement('button');
                            delBtn.className = 'floating-btn delete-btn';
                            delBtn.innerText = 'DEL';
                            controls.appendChild(lockBtn);
                            controls.appendChild(delBtn);
                            wrapper.appendChild(innerImg);
                            wrapper.appendChild(dragArea);
                            wrapper.appendChild(resizeHandle);
                            wrapper.appendChild(controls);
                            container.appendChild(wrapper);
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
                                wrapper.style.width = Math.max(40, initW + (e.clientX - startX)) + 'px';
                                wrapper.style.height = Math.max(40, initH + (e.clientY - startY)) + 'px';
                                e.stopPropagation();
                            });
                            resizeHandle.addEventListener('pointerup', e => {
                                isResizing = false;
                                resizeHandle.releasePointerCapture(e.pointerId);
                                e.stopPropagation();
                            });
                            let isLocked = false;
                            lockBtn.addEventListener('click', e => {
                                isLocked = !isLocked;
                                wrapper.classList.toggle('locked', isLocked);
                                lockBtn.innerText = isLocked ? 'UNLOCK' : 'LOCK';
                                e.stopPropagation();
                            });
                            delBtn.addEventListener('click', e => {
                                wrapper.remove();
                                e.stopPropagation();
                            });
                            showMessage('PICTURE:ADDED');
                        });
                        searchResults.appendChild(img);
                    }
                });
            } else {
                searchResults.innerHTML = '<span style="padding:12px;color:var(--sub-color);">NO RESULTS FOUND.</span>';
            }
        } catch (e) {
            searchResults.innerHTML = '<span style="padding:12px;color:var(--danger-color);">ERROR FETCHING RESULTS.</span>';
        }
    }
    
    searchBtn.addEventListener('click', () => searchImages(searchInput.value));
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') searchImages(searchInput.value);
    });
    
    searchClose.addEventListener('click', () => {
        document.getElementById('image-search-panel').style.display = 'none';
    });
    
    const themeToggle = document.getElementById('theme-toggle');
    let inverted = false;
    themeToggle.addEventListener('click', function() {
        inverted = !inverted;
        document.body.classList.toggle('inverted', inverted);
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
        
        function invertHex(hex) {
            if (!hex) return '#ffffff';
            let h = hex.replace('#', '');
            if (h.length === 3) h = h.split('').map(x => x + x).join('');
            const r = (255 - parseInt(h.slice(0, 2), 16)).toString(16).padStart(2, '0');
            const g = (255 - parseInt(h.slice(2, 4), 16)).toString(16).padStart(2, '0');
            const b = (255 - parseInt(h.slice(4, 6), 16)).toString(16).padStart(2, '0');
            return '#' + r + g + b;
        }
        
        document.querySelectorAll('.color-btn').forEach(btn => {
            const baseColor = btn.dataset.color;
            btn.style.background = inverted ? invertHex(baseColor) : baseColor;
        });
        
        colorPicker.value = invertHex(colorPicker.value);
        currentColor = invertHex(currentColor);
        while (undoStack.length > 0) undoStack.pop();
        saveState();
    });

    console.log("Blackboard initialized successfully.");
})();