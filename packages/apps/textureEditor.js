(function() {
    "use strict";

    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['textureeditor'] = {
            name: 'Texture Editor',
            version: '1.1.0',
            description: 'Advanced procedural texture generation with real-time preview and export',
            preInstalledOn: ['default'],
            commands: {
                textureeditor: function(args) {
                    console.log("Texture Editor launched.");
                }
            },
            commandInfo: {
                textureeditor: "what is this command?\ntextureeditor\n\nwhat is it used for?\nProcedural texture generator with 19+ pattern styles, real-time editing, and PNG export at multiple resolutions."
            }
        };
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

        input, textarea, select {
            user-select: text !important;
            -webkit-user-select: text !important;
        }

        :root {
            --bg-color: #1a1b1e;
            --panel-bg: #232629;
            --toolbar-bg: #31363b;
            --text-color: #eff0f1;
            --text-muted: #888888;
            --accent-color: #3daee9;
            --accent-hover: #1d99d6;
            --border-color: #1d2023;
            --hover-bg: rgba(61, 174, 233, 0.15);
            --card-radius: 6px;
            --font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
        }

        body, html {
            height: 100vh;
            width: 100vw;
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: 13px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-color); }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }

        #texture-editor-app {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: var(--bg-color);
        }

        /* Toolbar */
        #toolbar {
            height: 44px;
            background-color: var(--toolbar-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 10px;
            gap: 6px;
            flex-shrink: 0;
        }

        .tool-btn {
            background: transparent;
            border: 1px solid transparent;
            color: var(--text-color);
            border-radius: 4px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            flex-shrink: 0;
        }

        .tool-btn:hover:not(:disabled) {
            background-color: var(--hover-bg);
            border-color: var(--accent-color);
        }

        .tool-btn svg {
            width: 16px;
            height: 16px;
            stroke: currentColor;
            stroke-width: 2;
            fill: none;
        }

        .toolbar-separator {
            width: 1px;
            height: 20px;
            background-color: var(--border-color);
            margin: 0 4px;
        }

        /* Layout */
        .editor-layout {
            display: flex;
            flex-grow: 1;
            overflow: hidden;
            position: relative;
        }

        .sidebar {
            width: 260px;
            min-width: 260px;
            background: var(--panel-bg);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            overflow-y: auto;
            flex-shrink: 0;
        }

        .sidebar.right {
            border-right: none;
            border-left: 1px solid var(--border-color);
        }

        .panel-box {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: var(--card-radius);
            padding: 10px;
        }

        .panel-title {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            margin-bottom: 8px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 4px;
        }

        .section-subhdr {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            color: var(--text-muted);
            margin: 6px 0 2px 0;
        }

        .style-btn {
            width: 100%;
            text-align: left;
            background: transparent;
            border: 1px solid transparent;
            border-radius: 4px;
            padding: 5px 8px;
            font-size: 12px;
            color: var(--text-color);
            cursor: pointer;
            transition: all 0.15s;
        }
        .style-btn:hover { background: var(--hover-bg); border-color: var(--accent-color); }
        .style-btn.active { background: var(--hover-bg); border-color: var(--accent-color); font-weight: bold; }

        .slider-group { margin-bottom: 8px; }
        .slider-label {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: var(--text-muted);
            margin-bottom: 2px;
        }
        .slider-label span { color: var(--text-color); font-family: monospace; }
        input[type="range"] {
            width: 100%;
            accent-color: var(--accent-color);
            cursor: pointer;
        }

        .checkbox-row, .select-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: var(--text-color);
            margin-bottom: 6px;
            cursor: pointer;
        }
        .checkbox-row input {
            cursor: pointer;
            accent-color: var(--accent-color);
            width: 14px;
            height: 14px;
        }
        .select-row select {
            background: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 12px;
            outline: none;
            cursor: pointer;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            margin-bottom: 2px;
            font-family: monospace;
        }
        .info-row span:first-child { color: var(--text-muted); }
        .info-row span:last-child { color: var(--text-color); font-weight: bold; }

        /* Workspace Viewport */
        #workspace {
            flex-grow: 1;
            background-color: #121212;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: grab;
        }
        #workspace.grabbing { cursor: grabbing; }

        #dazzleCanvas {
            position: absolute;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transform-origin: center center;
        }

        .zoom-indicator {
            position: absolute;
            bottom: 12px;
            left: 12px;
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-family: monospace;
            pointer-events: none;
        }

        /* Dropdown */
        .dropdown-menu {
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--card-radius);
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
            padding: 4px;
            min-width: 150px;
            display: none;
            flex-direction: column;
            gap: 2px;
            z-index: 30;
        }
        .dropdown-menu.show { display: flex; }
        .dropdown-item {
            padding: 6px 10px;
            font-size: 12px;
            color: var(--text-color);
            border-radius: 4px;
            cursor: pointer;
        }
        .dropdown-item:hover { background: var(--hover-bg); color: var(--accent-color); }

        /* Status Bar */
        #status-bar {
            height: 22px;
            background-color: var(--panel-bg);
            border-top: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-size: 11px;
            color: var(--text-muted);
            flex-shrink: 0;
        }
    `;
    document.head.appendChild(style);

    function applyKDEColors() {
        const kdeColors = window.kdeThemeColors || window.parent?.kdeThemeColors || {
            'kde-bg': '#1a1b1e',
            'kde-panel': '#232629',
            'kde-accent': '#3daee9',
            'kde-text': '#eff0f1',
            'kde-window-border': '#1d2023',
        };

        const root = document.documentElement;
        root.style.setProperty('--bg-color', kdeColors['kde-bg']);
        root.style.setProperty('--panel-bg', kdeColors['kde-panel']);
        root.style.setProperty('--text-color', kdeColors['kde-text']);
        root.style.setProperty('--border-color', kdeColors['kde-window-border']);
        root.style.setProperty('--accent-color', kdeColors['kde-accent']);
    }
    applyKDEColors();

    document.body.innerHTML = `
    <div id="texture-editor-app">
        <!-- Toolbar -->
        <div id="toolbar">
            <button class="tool-btn" id="reloadBtn" title="Regenerate Texture">
                <svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
            </button>
            <div class="toolbar-separator"></div>
            <div style="position:relative;" id="downloadContainer">
                <button class="tool-btn" id="downloadDropdownBtn" title="Export PNG Options">
                    <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                </button>
                <div id="downloadMenu" class="dropdown-menu">
                    <div style="padding:4px 8px; font-size:10px; font-weight:bold; color:var(--text-muted); text-transform:uppercase;">Resolutions</div>
                    <a class="dropdown-item dl-opt" data-res="current">Viewport Size</a>
                    <a class="dropdown-item dl-opt" data-res="1280x720">720p HD</a>
                    <a class="dropdown-item dl-opt" data-res="1920x1080">1080p FHD</a>
                    <a class="dropdown-item dl-opt" data-res="2560x1440">1440p QHD</a>
                </div>
            </div>
        </div>

        <!-- Main Workspace Layout -->
        <div class="editor-layout">
            <!-- Left Sidebar -->
            <div class="sidebar">
                <div class="panel-box" style="flex:1; display:flex; flex-direction:column; min-height:0;">
                    <div class="panel-title">Generator Controls</div>
                    <div style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:2px; padding-right:2px;">
                        <div class="section-subhdr">Camouflage</div>
                        <button data-style="wwi" class="style-btn active">WWI Dazzle</button>
                        <button data-style="splinter" class="style-btn">Splinter Tarn</button>
                        <button data-style="tiger" class="style-btn">Tiger Stripe</button>
                        <button data-style="digital" class="style-btn">Digital MARPAT</button>
                        <button data-style="flecktarn" class="style-btn">Flecktarn</button>
                        
                        <div class="section-subhdr">Abstract</div>
                        <button data-style="cubist" class="style-btn">Cubist Abstract</button>
                        <button data-style="hex" class="style-btn">Hex Tactical</button>
                        <button data-style="brushstroke" class="style-btn">Brushstroke</button>
                        <button data-style="topographic" class="style-btn">Topographic</button>
                        <button data-style="shapes" class="style-btn">Geometric Shapes</button>
                        
                        <div class="section-subhdr">Organic</div>
                        <button data-style="zebra" class="style-btn">Zebra Stripes</button>
                        <button data-style="leopard" class="style-btn">Leopard Print</button>
                        <button data-style="rust" class="style-btn">Rust & Patina</button>
                        <button data-style="wood" class="style-btn">Wood Grain</button>
                        
                        <div class="section-subhdr">Tech & Industrial</div>
                        <button data-style="warning" class="style-btn">Warning Sign</button>
                        <button data-style="wireframe" class="style-btn">Cyber Wireframe</button>
                        <button data-style="carbon" class="style-btn">Carbon Fibre</button>
                        <button data-style="circuit" class="style-btn">Circuit Board</button>
                        <button data-style="glitch" class="style-btn">Data Glitch</button>
                        
                        <div class="section-subhdr">Novelty</div>
                        <button data-style="emojis" class="style-btn">Emoji Pattern</button>
                    </div>
                </div>

                <div class="panel-box" style="flex-shrink:0;">
                    <div class="panel-title">Texture Info</div>
                    <div class="info-row"><span>Active Style:</span><span id="infoStyleName">WWI Dazzle</span></div>
                    <div class="info-row"><span>Palette Colors:</span><span id="infoColors">5</span></div>
                    <div class="info-row"><span>Background:</span><span id="infoBg">#101010</span></div>
                    <div class="info-row"><span>Viewport Res:</span><span id="infoRes">1200 x 800</span></div>
                    <div class="info-row"><span>Seed Value:</span><span id="infoSeedDisp">1234</span></div>
                    <div class="info-row"><span>Est. File Size:</span><span id="infoFileSize">-- MB</span></div>
                </div>
            </div>

            <!-- Viewport Center -->
            <div id="workspace">
                <canvas id="dazzleCanvas" width="1200" height="800"></canvas>
                <div class="zoom-indicator" id="zoomIndicator">100%</div>
            </div>

            <!-- Right Sidebar -->
            <div class="sidebar right">
                <div class="panel-box">
                    <div class="panel-title">Fine Tuning</div>
                    
                    <div class="slider-group">
                        <div class="slider-label"><span>Seed Value</span> <span id="valSeed">1234</span></div>
                        <input type="range" id="rangeSeed" min="1" max="9999" value="1234">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Scale / Density</span> <span id="valScale">50</span></div>
                        <input type="range" id="rangeScale" min="10" max="100" value="50">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Complexity</span> <span id="valComplexity">5</span></div>
                        <input type="range" id="rangeComplexity" min="1" max="10" value="5">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Hue Shift</span> <span id="valHue">0°</span></div>
                        <input type="range" id="rangeHue" min="0" max="360" value="0">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Saturation</span> <span id="valSaturation">100%</span></div>
                        <input type="range" id="rangeSaturation" min="0" max="200" value="100">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Contrast</span> <span id="valContrast">100%</span></div>
                        <input type="range" id="rangeContrast" min="50" max="150" value="100">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Brightness</span> <span id="valBrightness">100%</span></div>
                        <input type="range" id="rangeBrightness" min="50" max="150" value="100">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Softness / Blur</span> <span id="valBlur">0px</span></div>
                        <input type="range" id="rangeBlur" min="0" max="10" value="0">
                    </div>
                </div>

                <div class="panel-box">
                    <div class="panel-title">Options</div>
                    
                    <label class="checkbox-row">
                        <span>Enable Outlines</span>
                        <input type="checkbox" id="chkOutline" checked>
                    </label>

                    <label class="checkbox-row">
                        <span>Randomize Palettes</span>
                        <input type="checkbox" id="chkRandomPalette" checked>
                    </label>

                    <label class="checkbox-row">
                        <span>Invert Colors</span>
                        <input type="checkbox" id="chkInvert">
                    </label>

                    <label class="checkbox-row">
                        <span>Vignette Effect</span>
                        <input type="checkbox" id="chkVignette" checked>
                    </label>

                    <div class="select-row mt-2">
                        <span>Blend Mode</span>
                        <select id="selectBlend">
                            <option value="normal">Normal</option>
                            <option value="multiply">Multiply</option>
                            <option value="screen">Screen</option>
                            <option value="overlay">Overlay</option>
                        </select>
                    </div>

                    <div class="slider-group mt-2">
                        <div class="slider-label"><span>Roughness / Noise</span> <span id="valNoise">0%</span></div>
                        <input type="range" id="rangeNoise" min="0" max="50" value="0">
                    </div>

                    <div class="slider-group">
                        <div class="slider-label"><span>Stroke Width</span> <span id="valStroke">2px</span></div>
                        <input type="range" id="rangeStroke" min="0" max="10" value="2">
                    </div>
                </div>
            </div>
        </div>

        <!-- Status Bar -->
        <div id="status-bar">
            <span>Ready for procedural texture generation</span>
        </div>
    </div>
    `;

    const canvas = document.getElementById('dazzleCanvas');
    const ctx = canvas.getContext('2d');
    const workspace = document.getElementById('workspace');
    const zoomIndicator = document.getElementById('zoomIndicator');

    let scale = 0.75;
    let panX = 0;
    let panY = 0;
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    const baseW = 1200;
    const baseH = 800;
    canvas.width = baseW;
    canvas.height = baseH;

    function updateCanvasTransform() {
        canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
        zoomIndicator.textContent = `${Math.round(scale * 100)}%`;
    }
    updateCanvasTransform();

    workspace.addEventListener('mousedown', (e) => {
        if (e.button === 0 && (e.target === workspace || e.target === canvas)) {
            isPanning = true;
            workspace.classList.add('grabbing');
            startX = e.clientX - panX;
            startY = e.clientY - panY;
        }
    });
    window.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        updateCanvasTransform();
    });
    window.addEventListener('mouseup', () => {
        isPanning = false;
        workspace.classList.remove('grabbing');
    });
    workspace.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = 1.1;
        let newScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
        newScale = Math.max(0.1, Math.min(10, newScale));
        scale = newScale;
        updateCanvasTransform();
    }, { passive: false });

    let currentStyle = 'wwi';
    let seedValue = 1234;
    let scaleDensity = 50;
    let complexityVal = 5;
    let hueShiftVal = 0;
    let saturationVal = 100;
    let contrastVal = 100;
    let brightnessVal = 100;
    let blurVal = 0;
    let noiseVal = 0;
    let strokeWidthVal = 2;
    let enableOutline = true;
    let randomizePalette = true;
    let invertColors = false;
    let vignetteEffect = true;
    let blendMode = 'normal';

    const stylePalettes = {
        wwi: [['#101010', '#F0F0F0', '#404040', '#808080', '#C0C0C0'], ['#050505', '#B0B5B9', '#556370', '#2B3948', '#FFFFFF']],
        splinter: [['#4A5320', '#3B4219', '#2E3414', '#D4C5A9', '#1C200C'], ['#313B2E', '#505E4C', '#72816D', '#222821', '#C5CFC3']],
        tiger: [['#2D3822', '#4B5C3C', '#6B7A59', '#182012', '#939E83'], ['#1E2229', '#3D4654', '#5D6B80', '#101317', '#8894A6']],
        digital: [['#3F4433', '#5D664D', '#2B2F23', '#8C9479', '#1C1F16'], ['#222B36', '#3B4B5E', '#5D7491', '#141A21', '#859AB5']],
        cubist: [['#1A2530', '#34495E', '#1ABC9C', '#E74C3C', '#ECF0F1'], ['#111111', '#333333', '#E74C3C', '#F1C40F', '#3498DB']],
        flecktarn: [['#3B4232', '#2E3524', '#596547', '#1A1E14', '#7A6246'], ['#545148', '#3F3D36', '#727464', '#26241F', '#8C775D']],
        hex: [['#1E2226', '#2C3539', '#44535C', '#5F7380', '#0F1113'], ['#726C60', '#8F897B', '#A8A295', '#4A463D', '#C4BDB1']],
        brushstroke: [['#474B32', '#2F3420', '#63503B', '#1E2114', '#8B9467'], ['#2D2E30', '#4A4C4F', '#1F2021', '#74777C', '#0A0A0A']],
        topographic: [['#151C15', '#243024', '#3E503E', '#8F998F'], ['#0D1117', '#1A232E', '#2B394A', '#536E8C']],
        zebra: [['#F2F2F2', '#1A1A1A'], ['#E5D3B3', '#402619']],
        leopard: [['#E0B876', '#BA7A3A', '#201812'], ['#7B8C70', '#4A5D23', '#1F2416']],
        rust: [['#2C2621', '#5B3322', '#8F4321', '#C26331', '#1A1513', '#4A2A18']],
        wood: [['#C19A6B', '#966F33', '#6F4E37', '#4A3219'], ['#A89689', '#786C63', '#4A413A', '#241E1A']],
        shapes: [['#1A2530', '#34495E', '#1ABC9C', '#E74C3C'], ['#2C3E50', '#8E44AD', '#3498DB', '#E67E22']],
        emojis: [['#111827', '#1F2937', '#374151']],
        warning: [['#FFCC00', '#000000'], ['#F5D300', '#0A0A0A'], ['#E5A900', '#111111', '#333333']],
        wireframe: [['#050505', '#00ffff', '#ff00ff'], ['#0a0a1a', '#4444ff', '#00ffaa']],
        carbon: [['#111111', '#1f1f1f', '#2a2a2a', '#050505']],
        circuit: [['#003300', '#00ff00', '#00aa00', '#c0c0c0'], ['#001133', '#00ffff', '#0066aa', '#ffd700']],
        glitch: [['#0f0f0f', '#ff0055', '#00ffff', '#ffffff', '#222222'], ['#000022', '#ff00ff', '#00ffaa', '#ffff00', '#222255']]
    };

    let activePalette = stylePalettes.wwi[0];
    let currentSeedTracker = seedValue;

    function random() {
        const x = Math.sin(currentSeedTracker++) * 10000;
        return x - Math.floor(x);
    }
    function randomInt(min, max) { return Math.floor(random() * (max - min + 1) + min); }
    function randomChoice(arr) { return arr[Math.floor(random() * arr.length)]; }
    function getContrastingColors() {
        const color1 = randomChoice(activePalette);
        let color2 = randomChoice(activePalette);
        while (color2 === color1) color2 = randomChoice(activePalette);
        return [color1, color2];
    }

    function createRandomPolygon(cx, cy, minRadius, maxRadius, verticesCount) {
        const vertices = [];
        let angleStart = random() * Math.PI * 2;
        for (let i = 0; i < verticesCount; i++) {
            const angle = angleStart + (i / verticesCount) * Math.PI * 2 + (random() - 0.5) * (Math.PI / verticesCount);
            const r = minRadius + random() * (maxRadius - minRadius);
            vertices.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
        }
        return vertices;
    }

    function createIntersectingBand(width, height) {
        const cx = width / 2;
        const cy = height / 2;
        const maxDimension = Math.max(width, height);
        const angle = random() * Math.PI;
        const thickness = randomInt(50, 300);
        const length = maxDimension * 3;
        const offsetX = (random() - 0.5) * width;
        const offsetY = (random() - 0.5) * height;
        const dx = Math.cos(angle) * (length / 2);
        const dy = Math.sin(angle) * (length / 2);
        const tx = Math.cos(angle + Math.PI/2) * (thickness / 2);
        const ty = Math.sin(angle + Math.PI/2) * (thickness / 2);
        return [
            {x: cx + offsetX - dx + tx, y: cy + offsetY - dy + ty},
            {x: cx + offsetX + dx + tx, y: cy + offsetY + dy + ty},
            {x: cx + offsetX + dx - tx, y: cy + offsetY + dy - tx},
            {x: cx + offsetX - dx - tx, y: cy + offsetY - dy - ty}
        ];
    }

    function drawStripes(tCtx, w, h, color1, color2, angle, stripeWidth) {
        const diag = Math.sqrt(w * w + h * h) * 1.5;
        tCtx.save();
        tCtx.translate(w / 2, h / 2);
        tCtx.rotate(angle);
        const startY = -diag / 2;
        const endY = diag / 2;
        tCtx.fillStyle = color1;
        tCtx.fillRect(-diag/2, -diag/2, diag, diag);
        tCtx.fillStyle = color2;
        for (let y = startY; y < endY; y += stripeWidth * 2) {
            const currentWidth = random() > 0.9 ? stripeWidth * 1.5 : stripeWidth;
            tCtx.fillRect(-diag / 2, y, diag, currentWidth);
        }
        tCtx.restore();
    }

    function applyPolygonPath(tCtx, vertices) {
        tCtx.beginPath();
        tCtx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) tCtx.lineTo(vertices[i].x, vertices[i].y);
        tCtx.closePath();
    }

    function strokeCheck(tCtx) {
        if (enableOutline && strokeWidthVal > 0) {
            tCtx.lineWidth = strokeWidthVal;
            tCtx.stroke();
        }
    }

    function generateWWIDazzle(tCtx, w, h) {
        const scaleFactor = Math.max(w, h) / 1500;
        const s = (val) => val * (scaleFactor > 0.5 ? scaleFactor : 1);
        const [c1, c2] = getContrastingColors();
        drawStripes(tCtx, w, h, c1, c2, random() * Math.PI, s(randomInt(40, 150)));

        const numBands = randomInt(4, 10) * (complexityVal/5);
        for (let i = 0; i < numBands; i++) {
            tCtx.save();
            applyPolygonPath(tCtx, createIntersectingBand(w, h));
            tCtx.clip();
            const [ac1, ac2] = getContrastingColors();
            if (random() < 0.3) { tCtx.fillStyle = ac1; tCtx.fill(); }
            else { drawStripes(tCtx, w, h, ac1, ac2, random() * Math.PI, s(randomInt(15, 80))); }
            tCtx.restore();
        }

        const numBlocks = randomInt(8, 25) * (scaleDensity/50);
        for (let i = 0; i < numBlocks; i++) {
            tCtx.save();
            applyPolygonPath(tCtx, createRandomPolygon(random()*w, random()*h, s(randomInt(50, 150)), s(randomInt(100, 450)), randomInt(3, 6)));
            tCtx.clip();
            const [bc1, bc2] = getContrastingColors();
            if (random() < 0.4) { tCtx.fillStyle = bc1; tCtx.fill(); }
            else { drawStripes(tCtx, w, h, bc1, bc2, random() * Math.PI, s(randomInt(20, 60))); }
            tCtx.restore();
        }
    }

    function generateSplinter(tCtx, w, h) {
        const cols = Math.floor(9 * (scaleDensity/50));
        const rows = Math.floor(9 * (scaleDensity/50));
        const cellW = w / cols;
        const cellH = h / rows;
        for (let y = 0; y <= rows; y++) {
            for (let x = 0; x <= cols; x++) {
                const cx = x * cellW + (random() - 0.5) * cellW;
                const cy = y * cellH + (random() - 0.5) * cellH;
                applyPolygonPath(tCtx, createRandomPolygon(cx, cy, cellW * 0.4, cellW * 1.3, randomInt(4, 7)));
                tCtx.fillStyle = randomChoice(activePalette);
                tCtx.fill();
                tCtx.strokeStyle = randomChoice(activePalette);
                strokeCheck(tCtx);
            }
        }
    }

    function generateTigerStripe(tCtx, w, h) {
        const numStripes = Math.floor(45 * (scaleDensity/50));
        tCtx.save();
        tCtx.translate(w/2, h/2);
        tCtx.rotate((random() - 0.5) * 0.4);
        tCtx.translate(-w/2, -h/2);
        const stepY = h / numStripes;
        for (let i = -10; i < numStripes + 10; i++) {
            let y = i * stepY;
            tCtx.beginPath();
            tCtx.moveTo(-100, y);
            let cx = -100;
            while (cx < w + 200) { cx += randomInt(40, 140); y += (random() - 0.5) * 100; tCtx.lineTo(cx, y); }
            tCtx.lineTo(w + 200, y + randomInt(40, 100));
            let bx = w + 200;
            while (bx > -100) { bx -= randomInt(40, 140); y -= (random() - 0.5) * 100; tCtx.lineTo(bx, y); }
            tCtx.closePath();
            tCtx.fillStyle = randomChoice(activePalette);
            tCtx.fill();
        }
        tCtx.restore();
    }

    function generateDigital(tCtx, w, h) {
        const blockSize = Math.max(5, Math.floor(Math.min(w, h) / (scaleDensity * 1.5)));
        const cols = Math.ceil(w / blockSize);
        const rows = Math.ceil(h / blockSize);
        const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) grid[r][c] = Math.floor(random() * activePalette.length);
        }
        for (let iter = 0; iter < Math.floor(complexityVal/2); iter++) {
            for (let r = 1; r < rows - 1; r++) {
                for (let c = 1; c < cols - 1; c++) {
                    if (random() < 0.35) grid[r][c] = grid[r + (random() > 0.5 ? 1 : -1)][c + (random() > 0.5 ? 1 : -1)];
                }
            }
        }
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                tCtx.fillStyle = activePalette[grid[r][c]];
                tCtx.fillRect(c * blockSize, r * blockSize, blockSize + 0.5, blockSize + 0.5);
            }
        }
    }

    function generateCubist(tCtx, w, h) {
        const shapes = Math.floor(randomInt(45, 85) * (scaleDensity/50));
        for (let i = 0; i < shapes; i++) {
            tCtx.save();
            const cx = random() * w, cy = random() * h;
            const size = randomInt(80, Math.max(w, h) * 0.45);
            tCtx.beginPath();
            if (random() < 0.5) applyPolygonPath(tCtx, createRandomPolygon(cx, cy, size * 0.2, size, 3));
            else {
                tCtx.translate(cx, cy); tCtx.rotate(random() * Math.PI); tCtx.rect(-size/2, -size/4, size, size/2);
            }
            tCtx.fillStyle = randomChoice(activePalette);
            tCtx.globalAlpha = 0.8 + random() * 0.2;
            tCtx.fill();
            tCtx.strokeStyle = '#000000';
            strokeCheck(tCtx);
            tCtx.restore();
        }
    }

    function generateFlecktarn(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        const numClusters = Math.floor((w * h) / 8000 * (scaleDensity/50));
        for (let i = 0; i < numClusters; i++) {
            const cx = random() * w;
            const cy = random() * h;
            const color = randomChoice(activePalette.slice(1));
            const numDots = randomInt(8, 30);
            tCtx.fillStyle = color;
            for (let j = 0; j < numDots; j++) {
                const angle = random() * Math.PI * 2;
                const dist = random() * randomInt(5, 80);
                const radius = randomInt(2, 12);
                tCtx.beginPath();
                tCtx.arc(cx + Math.cos(angle)*dist, cy + Math.sin(angle)*dist, radius, 0, Math.PI*2);
                tCtx.fill();
            }
        }
    }

    function generateHex(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        const r = randomInt(15, 35);
        const dx = r * 1.5;
        const dy = r * Math.sqrt(3);
        tCtx.lineWidth = strokeWidthVal > 0 ? strokeWidthVal : 1.5;
        for (let y = -dy; y < h + dy; y += dy) {
            for (let x = -dx; x < w + dx; x += dx * 2) {
                for (let offset of [0, 1]) {
                    const cx = x + (offset * dx);
                    const cy = y + (offset * (dy / 2));
                    tCtx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 180) * (60 * i);
                        const px = cx + r * Math.cos(angle);
                        const py = cy + r * Math.sin(angle);
                        if (i === 0) tCtx.moveTo(px, py); else tCtx.lineTo(px, py);
                    }
                    tCtx.closePath();
                    tCtx.fillStyle = randomChoice(activePalette);
                    tCtx.fill();
                    if(enableOutline) { tCtx.strokeStyle = 'rgba(0,0,0,0.2)'; tCtx.stroke(); }
                }
            }
        }
    }

    function generateBrushstroke(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        const numStrokes = Math.floor((w * h) / 4000 * (scaleDensity/50));
        for (let i = 0; i < numStrokes; i++) {
            const cx = random() * w, cy = random() * h;
            const length = randomInt(40, 200);
            const thickness = randomInt(8, 30);
            tCtx.beginPath();
            tCtx.moveTo(cx, cy);
            let px = cx, py = cy;
            for (let j = 0; j < 3; j++) {
                const dx = (length / 3) * (random() > 0.5 ? 1 : -1);
                const dy = (random() - 0.5) * 50;
                px += dx; py += dy;
                tCtx.lineTo(px, py);
            }
            tCtx.lineWidth = thickness;
            tCtx.lineCap = 'round';
            tCtx.strokeStyle = randomChoice(activePalette.slice(1));
            tCtx.stroke();
        }
    }

    function generateTopographic(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        const numPeaks = randomInt(4, 10);
        tCtx.lineWidth = strokeWidthVal > 0 ? strokeWidthVal : 1.5;
        for(let i = 0; i < numPeaks; i++) {
            const cx = random() * w, cy = random() * h;
            const maxRad = randomInt(150, Math.max(w,h) * 0.8);
            const rings = randomInt(8, 25);
            for(let r = rings; r >= 1; r--) {
                const baseRadius = (r / rings) * maxRad;
                tCtx.beginPath();
                const points = 30;
                for(let p = 0; p <= points; p++) {
                    const angle = (p / points) * Math.PI * 2;
                    const noise = Math.sin(angle * 3 + currentSeedTracker) * (baseRadius * 0.15);
                    const finalR = Math.max(1, baseRadius + noise);
                    const px = cx + Math.cos(angle) * finalR;
                    const py = cy + Math.sin(angle) * finalR;
                    if (p === 0) tCtx.moveTo(px, py); else tCtx.lineTo(px, py);
                }
                tCtx.closePath();
                tCtx.fillStyle = randomChoice(activePalette);
                tCtx.fill();
                if(enableOutline) { tCtx.strokeStyle = 'rgba(0,0,0,0.3)'; tCtx.stroke(); }
            }
        }
    }

    function generateZebra(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        tCtx.fillStyle = activePalette[1] || '#1a1a1a';
        const numStripes = Math.floor(w / 35);
        for(let i = -10; i < numStripes + 10; i++) {
            let x = i * 45;
            tCtx.beginPath();
            let cx = x;
            for(let y = 0; y <= h + 50; y += 20) {
                cx += Math.sin(y * 0.015 + i) * 20;
                tCtx.lineTo(cx, y);
            }
            for(let y = h + 50; y >= 0; y -= 20) {
                tCtx.lineTo(cx + 25, y);
            }
            tCtx.closePath();
            tCtx.fill();
        }
    }

    function generateLeopard(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        const numSpots = Math.floor(w * h / 3500);
        for(let i=0; i<numSpots; i++) {
            const cx = random() * w, cy = random() * h;
            const r = randomInt(12, 35);
            tCtx.fillStyle = activePalette[1] || '#BA7A3A';
            tCtx.beginPath();
            tCtx.arc(cx, cy, r, 0, Math.PI*2);
            tCtx.fill();
            tCtx.strokeStyle = activePalette[2] || '#201812';
            tCtx.lineWidth = r * 0.35;
            tCtx.beginPath();
            tCtx.arc(cx, cy, r*1.05, 0, Math.PI*1.2);
            tCtx.stroke();
        }
    }

    function generateRust(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        for(let i=0; i<150; i++) {
            tCtx.fillStyle = randomChoice(activePalette.slice(1));
            tCtx.globalAlpha = 0.1 + random()*0.2;
            tCtx.beginPath();
            tCtx.arc(random()*w, random()*h, randomInt(50, 250), 0, Math.PI*2);
            tCtx.fill();
        }
        tCtx.globalAlpha = 1.0;
    }

    function generateWoodGrain(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        for(let i=0; i<w; i+=4) {
            tCtx.fillStyle = randomChoice(activePalette.slice(1));
            const noise = Math.sin(i * 0.05) * 20;
            tCtx.fillRect(i + noise, 0, randomInt(1,3), h);
        }
    }

    function generateEmojis(tCtx, w, h) {
        tCtx.fillStyle = '#111827';
        tCtx.fillRect(0, 0, w, h);
        const emojis = ['🪖', '🌿', '💥', '🚁', '🎖️', '🔥', '⚙️', '💎', '🚀', '⭐'];
        for(let i=0; i<80; i++) {
            tCtx.font = `${randomInt(20, 60)}px sans-serif`;
            tCtx.fillText(randomChoice(emojis), random()*w, random()*h);
        }
    }

    function generateShapes(tCtx, w, h) {
        tCtx.fillStyle = activePalette[0];
        tCtx.fillRect(0, 0, w, h);
        for(let i=0; i<60; i++) {
            tCtx.fillStyle = randomChoice(activePalette);
            tCtx.beginPath();
            tCtx.arc(random()*w, random()*h, randomInt(20, 80), 0, Math.PI*2);
            tCtx.fill();
        }
    }

    function generateWarningSign(tCtx, w, h) {
        const pal = activePalette.length >= 2 ? activePalette : ['#FFCC00', '#000000'];
        tCtx.fillStyle = pal[0]; // Usually Yellow
        tCtx.fillRect(0, 0, w, h);

        tCtx.fillStyle = pal[1]; // Usually Black
        
        // Use scale density to define stripe width
        const stripeWidth = Math.max(10, 80 * (scaleDensity / 50));
        const diag = Math.sqrt(w*w + h*h) * 2; 

        tCtx.save();
        tCtx.translate(w/2, h/2);
        
        // Base diagonal angle around 45 degrees, slightly randomized by seed
        const isFlipped = random() > 0.5 ? 1 : -1;
        const angle = (Math.PI / 4) * isFlipped + (random() - 0.5) * 0.1;
        
        tCtx.rotate(angle);
        tCtx.translate(-diag/2, -diag/2);

        for(let x = 0; x < diag; x += stripeWidth * 2) {
            tCtx.fillRect(x, 0, stripeWidth, diag);
        }
        tCtx.restore();

        // Introduce procedural grime and hazard markings based on complexity slider
        const grungeLevel = complexityVal;
        if (grungeLevel > 1) {
            const numScratches = Math.floor((w * h) / 10000 * grungeLevel);
            
            // Yellow scratches/chips over the black stripes
            tCtx.fillStyle = pal[0];
            for(let i = 0; i < numScratches; i++) {
                tCtx.globalAlpha = 0.4 + random() * 0.6;
                tCtx.beginPath();
                tCtx.arc(random()*w, random()*h, randomInt(1, 4), 0, Math.PI*2);
                tCtx.fill();
            }
            
            // Black grime/dirt over the yellow
            tCtx.fillStyle = pal[1];
            for(let i = 0; i < numScratches; i++) {
                tCtx.globalAlpha = 0.4 + random() * 0.6;
                tCtx.beginPath();
                tCtx.arc(random()*w, random()*h, randomInt(1, 4), 0, Math.PI*2);
                tCtx.fill();
            }
            tCtx.globalAlpha = 1.0;
            
            // Occasionally add hazard triangle decals based on seed complexity
            if (random() > 0.5 && grungeLevel >= 3) {
                tCtx.lineWidth = strokeWidthVal > 0 ? strokeWidthVal * 3 : 5;
                tCtx.strokeStyle = pal[1];
                tCtx.fillStyle = pal[0];
                tCtx.beginPath();
                const cx = w / 2 + (random() - 0.5) * (w/2);
                const cy = h / 2 + (random() - 0.5) * (h/2);
                const r = 50 + random() * 80;
                
                // Draw Warning Triangle
                tCtx.moveTo(cx, cy - r);
                tCtx.lineTo(cx + r, cy + r - 15);
                tCtx.lineTo(cx - r, cy + r - 15);
                tCtx.closePath();
                tCtx.fill();
                tCtx.stroke();
                
                // Exclamation mark inside the triangle
                tCtx.fillStyle = pal[1];
                tCtx.fillRect(cx - r*0.1, cy - r*0.3, r*0.2, r*0.7);
                tCtx.beginPath();
                tCtx.arc(cx, cy + r*0.6, r*0.1, 0, Math.PI*2);
                tCtx.fill();
            }
        }
    }

    function generateWireframe(tCtx, w, h) {
        const pal = activePalette.length >= 3 ? activePalette : ['#050505', '#00ffff', '#ff00ff'];
        tCtx.fillStyle = pal[0];
        tCtx.fillRect(0, 0, w, h);
        const cell = 50;
        const cols = Math.ceil(w / cell) + 1;
        const rows = Math.ceil(h / cell) + 1;
        tCtx.lineWidth = strokeWidthVal > 0 ? strokeWidthVal : 1.5;
        tCtx.lineJoin = 'round';
        tCtx.lineCap = 'round';
        const nodes = [];
        for (let r = 0; r < rows; r++) {
            nodes[r] = [];
            for (let c = 0; c < cols; c++) {
                const noiseX = Math.sin(r * 0.4 + currentSeedTracker) * 20;
                const noiseY = Math.cos(c * 0.4 + currentSeedTracker) * 20;
                nodes[r][c] = { x: c * cell + noiseX, y: r * cell + noiseY };
            }
        }
        tCtx.strokeStyle = pal[1];
        tCtx.beginPath();
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (c < cols - 1) { tCtx.moveTo(nodes[r][c].x, nodes[r][c].y); tCtx.lineTo(nodes[r][c+1].x, nodes[r][c+1].y); }
                if (r < rows - 1) { tCtx.moveTo(nodes[r][c].x, nodes[r][c].y); tCtx.lineTo(nodes[r+1][c].x, nodes[r+1][c].y); }
            }
        }
        tCtx.stroke();
    }

    function generateCarbonFibre(tCtx, w, h) {
        const pal = activePalette.length >= 4 ? activePalette : ['#111111', '#1f1f1f', '#2a2a2a', '#050505'];
        tCtx.fillStyle = pal[0];
        tCtx.fillRect(0, 0, w, h);
        const weaveSize = 20;
        const cols = Math.ceil(w / weaveSize);
        const rows = Math.ceil(h / weaveSize);
        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < cols; c++) {
                const x = c * weaveSize, y = r * weaveSize;
                const isVertical = (r + c) % 2 === 0;
                tCtx.fillStyle = isVertical ? pal[1] : pal[2];
                tCtx.fillRect(x, y, weaveSize, weaveSize);
                if (enableOutline && strokeWidthVal > 0) {
                    tCtx.lineWidth = strokeWidthVal;
                    tCtx.strokeStyle = pal[3];
                    tCtx.beginPath();
                    if (isVertical) {
                        for(let i=3; i<weaveSize; i+=5) { tCtx.moveTo(x + i, y); tCtx.lineTo(x + i, y + weaveSize); }
                    } else {
                        for(let i=3; i<weaveSize; i+=5) { tCtx.moveTo(x, y + i); tCtx.lineTo(x + weaveSize, y + i); }
                    }
                    tCtx.stroke();
                }
            }
        }
    }

    function generateCircuit(tCtx, w, h) {
        const pal = activePalette.length >= 4 ? activePalette : ['#003300', '#00ff00', '#00aa00', '#c0c0c0'];
        tCtx.fillStyle = pal[0];
        tCtx.fillRect(0, 0, w, h);
        const cell = 25;
        const cols = Math.floor(w / cell), rows = Math.floor(h / cell);
        const numTraces = Math.floor((cols * rows) * 0.12);
        tCtx.lineCap = 'round'; tCtx.lineJoin = 'round';
        for (let i = 0; i < numTraces; i++) {
            let currC = randomInt(1, cols - 2), currR = randomInt(1, rows - 2);
            tCtx.beginPath(); tCtx.moveTo(currC * cell, currR * cell);
            let len = randomInt(4, 18);
            let dir = randomInt(0, 7);
            const dx = [0, 1, 1, 1, 0, -1, -1, -1];
            const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
            for (let j = 0; j < len; j++) {
                if (random() > 0.65) dir = (dir + (random() > 0.5 ? 1 : -1) + 8) % 8;
                currC += dx[dir]; currR += dy[dir];
                if (currC < 0 || currC >= cols || currR < 0 || currR >= rows) break;
                tCtx.lineTo(currC * cell, currR * cell);
            }
            tCtx.lineWidth = strokeWidthVal > 0 ? strokeWidthVal * 1.5 : 3;
            tCtx.strokeStyle = random() > 0.6 ? pal[2] : pal[1];
            tCtx.stroke();
            if (random() > 0.4) {
                tCtx.fillStyle = pal[3];
                tCtx.beginPath();
                tCtx.arc(currC * cell, currR * cell, 5, 0, Math.PI*2);
                tCtx.fill();
            }
        }
    }

    function generateGlitch(tCtx, w, h) {
        const pal = activePalette.length >= 5 ? activePalette : ['#0f0f0f', '#ff0055', '#00ffff', '#ffffff', '#222222'];
        tCtx.fillStyle = pal[0];
        tCtx.fillRect(0, 0, w, h);
        const numBlocks = randomInt(30, 70);
        for(let i=0; i<numBlocks; i++) {
            tCtx.fillStyle = pal[4] || pal[1];
            tCtx.fillRect(random()*w, random()*h, random()*300, random()*80);
        }
        for(let i=0; i<45; i++) {
            const x = random() * w, y = random() * h;
            const bw = random() * 250 + 50, bh = random() * 60 + 10;
            tCtx.globalCompositeOperation = 'screen';
            tCtx.fillStyle = pal[1];
            tCtx.fillRect(x - 15, y, bw, bh);
            tCtx.fillStyle = pal[2];
            tCtx.fillRect(x + 15, y, bw, bh);
            tCtx.globalCompositeOperation = 'source-over';
        }
        for(let i=0; i<100; i++) {
            tCtx.fillStyle = randomChoice(pal);
            tCtx.fillRect(0, random()*h, w, random()*4);
        }
    }

    function renderPatternToContext(tCtx, w, h) {
        currentSeedTracker = seedValue;
        
        if (randomizePalette) {
            const keys = Object.keys(stylePalettes);
            const styleList = stylePalettes[keys[Math.floor(random() * keys.length)]];
            activePalette = randomChoice(styleList) || stylePalettes.wwi[0];
        } else {
            const styleList = stylePalettes[currentStyle] || stylePalettes.wwi;
            activePalette = styleList[0];
        }

        let filterStr = `hue-rotate(${hueShiftVal}deg) saturate(${saturationVal}%) contrast(${contrastVal}%) brightness(${brightnessVal}%) blur(${blurVal}px)`;
        if (invertColors) filterStr += ` invert(100%)`;
        tCtx.filter = filterStr;
        
        if(currentStyle==='wwi') generateWWIDazzle(tCtx, w, h);
        else if(currentStyle==='splinter') generateSplinter(tCtx, w, h);
        else if(currentStyle==='tiger') generateTigerStripe(tCtx, w, h);
        else if(currentStyle==='digital') generateDigital(tCtx, w, h);
        else if(currentStyle==='cubist') generateCubist(tCtx, w, h);
        else if(currentStyle==='flecktarn') generateFlecktarn(tCtx, w, h);
        else if(currentStyle==='hex') generateHex(tCtx, w, h);
        else if(currentStyle==='brushstroke') generateBrushstroke(tCtx, w, h);
        else if(currentStyle==='topographic') generateTopographic(tCtx, w, h);
        else if(currentStyle==='zebra') generateZebra(tCtx, w, h);
        else if(currentStyle==='leopard') generateLeopard(tCtx, w, h);
        else if(currentStyle==='rust') generateRust(tCtx, w, h);
        else if(currentStyle==='wood') generateWoodGrain(tCtx, w, h);
        else if(currentStyle==='emojis') generateEmojis(tCtx, w, h);
        else if(currentStyle==='shapes') generateShapes(tCtx, w, h);
        else if(currentStyle==='warning') generateWarningSign(tCtx, w, h);
        else if(currentStyle==='wireframe') generateWireframe(tCtx, w, h);
        else if(currentStyle==='carbon') generateCarbonFibre(tCtx, w, h);
        else if(currentStyle==='circuit') generateCircuit(tCtx, w, h);
        else if(currentStyle==='glitch') generateGlitch(tCtx, w, h);
        else generateCubist(tCtx, w, h);

        if (noiseVal > 0) {
            tCtx.filter = 'none';
            const imgData = tCtx.getImageData(0, 0, w, h);
            const data = imgData.data;
            const intensity = noiseVal * 2.5;
            for (let i = 0; i < data.length; i += 4) {
                const randNoise = (random() - 0.5) * intensity;
                data[i] = Math.min(255, Math.max(0, data[i] + randNoise));
                data[i+1] = Math.min(255, Math.max(0, data[i+1] + randNoise));
                data[i+2] = Math.min(255, Math.max(0, data[i+2] + randNoise));
            }
            tCtx.putImageData(imgData, 0, 0);
        }

        if (vignetteEffect) {
            tCtx.save();
            const gradient = tCtx.createRadialGradient(w/2, h/2, Math.max(w,h)*0.3, w/2, h/2, Math.max(w,h)*0.75);
            gradient.addColorStop(0, 'rgba(0,0,0,0)');
            gradient.addColorStop(1, 'rgba(0,0,0,0.65)');
            tCtx.fillStyle = gradient;
            tCtx.fillRect(0, 0, w, h);
            tCtx.restore();
        }
    }

    function generateMainTexture() {
        ctx.globalCompositeOperation = blendMode === 'normal' ? 'source-over' : blendMode;
        renderPatternToContext(ctx, baseW, baseH);
        
        const activeBtn = document.querySelector('.style-btn.active');
        document.getElementById('infoStyleName').textContent = activeBtn ? activeBtn.textContent : currentStyle;
        document.getElementById('infoColors').textContent = activePalette.length;
        document.getElementById('infoBg').textContent = activePalette[0];
        document.getElementById('infoSeedDisp').textContent = seedValue;
        
        const rawBytes = baseW * baseH * 4;
        const estKb = Math.round((rawBytes * 0.35) / 1024);
        document.getElementById('infoFileSize').textContent = estKb > 1024 ? (estKb / 1024).toFixed(2) + ' MB' : estKb + ' KB';
    }

    document.getElementById('reloadBtn').addEventListener('click', () => {
        seedValue = Math.floor(Math.random() * 9999) + 1;
        document.getElementById('rangeSeed').value = seedValue;
        document.getElementById('valSeed').textContent = seedValue;
        generateMainTexture();
    });

    const styleButtons = document.querySelectorAll('.style-btn');
    styleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            styleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStyle = btn.getAttribute('data-style');
            generateMainTexture();
        });
    });

    ['Seed', 'Scale', 'Complexity', 'Noise', 'Stroke'].forEach(key => {
        document.getElementById(`range${key}`).addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            document.getElementById(`val${key}`).textContent = key === 'Stroke' ? `${val}px` : (key === 'Noise' ? `${val}%` : val);
            if(key==='Seed') seedValue = val;
            if(key==='Scale') scaleDensity = val;
            if(key==='Complexity') complexityVal = val;
            if(key==='Noise') noiseVal = val;
            if(key==='Stroke') strokeWidthVal = val;
            generateMainTexture();
        });
    });

    ['Hue', 'Saturation', 'Contrast', 'Brightness', 'Blur'].forEach(key => {
        document.getElementById(`range${key}`).addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            document.getElementById(`val${key}`).textContent = key === 'Hue' ? `${val}°` : (key === 'Blur' ? `${val}px` : `${val}%`);
            if(key==='Hue') hueShiftVal = val;
            if(key==='Saturation') saturationVal = val;
            if(key==='Contrast') contrastVal = val;
            if(key==='Brightness') brightnessVal = val;
            if(key==='Blur') blurVal = val;
            generateMainTexture();
        });
    });

    document.getElementById('chkOutline').addEventListener('change', (e) => { enableOutline = e.target.checked; generateMainTexture(); });
    document.getElementById('chkRandomPalette').addEventListener('change', (e) => { randomizePalette = e.target.checked; generateMainTexture(); });
    document.getElementById('chkInvert').addEventListener('change', (e) => { invertColors = e.target.checked; generateMainTexture(); });
    document.getElementById('chkVignette').addEventListener('change', (e) => { vignetteEffect = e.target.checked; generateMainTexture(); });
    document.getElementById('selectBlend').addEventListener('change', (e) => { blendMode = e.target.value; generateMainTexture(); });

    const downloadDropdownBtn = document.getElementById('downloadDropdownBtn');
    const downloadMenu = document.getElementById('downloadMenu');
    const downloadOptions = document.querySelectorAll('.dl-opt');
    
    downloadDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadMenu.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        downloadMenu.classList.remove('show');
    });

    function executeDownload(width, height) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = width;
        offCanvas.height = height;
        const offCtx = offCanvas.getContext('2d');
        renderPatternToContext(offCtx, width, height);
        
        const link = document.createElement('a');
        link.download = `texture-${currentStyle}-${width}x${height}.png`;
        link.href = offCanvas.toDataURL('image/png');
        link.click();
    }

    downloadOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const res = e.currentTarget.getAttribute('data-res');
            if (res) {
                if (res === 'current') {
                    executeDownload(baseW, baseH);
                } else {
                    const [w, h] = res.split('x').map(Number);
                    executeDownload(w, h);
                }
            }
        });
    });

    generateMainTexture();
    console.log("Texture Editor initialized successfully.");

})();