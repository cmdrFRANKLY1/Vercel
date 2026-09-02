(function() {
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['textureeditor'] = {
            name: 'Texture Editor',
            version: '1.0.0',
            description: 'Advanced procedural texture generation with real-time preview and export',
            preInstalledOn: ['default'],
            commands: {
                textureeditor: function(args) {
                    const htmlContent = generateTextureEditorHTML();
                    
                    try {
                        if (typeof window.createWrapperTab !== 'undefined') {
                            const blob = new Blob([htmlContent], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            window.createWrapperTab('textureeditor', url);
                        } else if (typeof window.openWrapperWindow !== 'undefined') {
                            const blob = new Blob([htmlContent], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            window.openWrapperWindow('textureeditor', url);
                        } else {
                            const win = window.open('', '_blank');
                            if (win) {
                                win.document.write(htmlContent);
                                win.document.close();
                            }
                        }
                    } catch (e) {
                        const win = window.open('', '_blank');
                        if (win) {
                            win.document.write(htmlContent);
                            win.document.close();
                        }
                    }
                }
            },
            commandInfo: {
                textureeditor: "what is this command?\ntextureeditor\n\nwhat is it used for?\nProcedural texture generator with 18+ pattern styles, real-time editing, and PNG export at multiple resolutions."
            }
        };
    }

    function generateTextureEditorHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Texture Editor</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --bg-color: #f2f5f9;
            --text-color: #1e293b;
            --sub-color: #475569;
            --border-color: #cbd5e1;
            --border-hover: #2563eb;
            --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
            --btn-bg: #e2e8f0;
            --btn-border: #cbd5e1;
            --btn-hover-border: #94a3b8;
            --btn-text: #1e293b;
            --hover-bg: #d8e2ee;
            --input-bg: #e8ecf2;
            --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.18);
            --card-radius: 12px;
            --toggle-radius: 12px;
            --modal-bg: #ffffff;
            --dropdown-bg: #ffffff;
        }

        [data-theme="dark"] {
            --bg-color: #121212;
            --text-color: #e8eaed;
            --sub-color: #9aa0a6;
            --border-color: #3c4043;
            --border-hover: #8ab4f8;
            --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
            --btn-bg: #303134;
            --btn-border: #3c4043;
            --btn-hover-border: #5f6368;
            --btn-text: #e8eaed;
            --hover-bg: #3c4043;
            --input-bg: #202124;
            --focus-ring: 0 0 0 3px rgba(138, 180, 248, 0.25);
            --modal-bg: #1e1e1e;
            --dropdown-bg: #2a2b2e;
        }

        * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
        }
        
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: var(--bg-color);
            font-family: "Segoe UI", Roboto, Arial, sans-serif;
            color: var(--text-color);
            user-select: none;
            -webkit-user-select: none;
        }
        
        input {
            user-select: text;
            -webkit-user-select: text;
        }

        .main-layout {
            display: flex;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            position: relative;
        }

        .sidebar-left {
            width: 280px;
            min-width: 280px;
            max-width: 280px;
            background: var(--bg-color);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 16px;
            overflow: hidden;
            flex-shrink: 0;
            z-index: 10;
        }

        .sidebar-right {
            width: 280px;
            min-width: 280px;
            max-width: 280px;
            background: var(--bg-color);
            border-left: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 16px;
            overflow-y: auto;
            flex-shrink: 0;
            z-index: 10;
            direction: rtl;
        }
        .sidebar-right > * {
            direction: ltr;
        }

        .panel-box {
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--card-radius);
            padding: 14px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
            width: 100%;
        }

        .panel-title {
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--sub-color);
            margin-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 6px;
        }

        .section-subhdr {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--sub-color);
            margin: 8px 0 4px 0;
        }
        .section-subhdr:first-child { margin-top: 0; }

        .viewport-center {
            flex: 1;
            background: var(--input-bg);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: grab;
        }
        .viewport-center.grabbing { cursor: grabbing; }

        #dazzleCanvas {
            position: absolute;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform-origin: center center;
        }

        .zoom-indicator {
            position: absolute;
            bottom: 16px;
            left: 16px;
            background: var(--btn-bg);
            border: 1px solid var(--btn-border);
            color: var(--text-color);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-family: monospace;
            font-weight: bold;
            pointer-events: none;
            z-index: 15;
            box-shadow: var(--box-shadow);
        }

        .floating-toolbar {
            position: absolute;
            top: 16px;
            left: 16px;
            display: flex;
            gap: 8px;
            z-index: 25;
        }

        .float-icon-btn {
            background: var(--dropdown-bg);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            width: 40px;
            height: 40px;
            border-radius: var(--toggle-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--box-shadow);
            transition: all 0.15s;
        }
        .float-icon-btn:hover { background: var(--hover-bg); border-color: var(--border-hover); }
        .float-icon-btn svg { width: 18px; height: 18px; fill: currentColor; }

        .dropdown-menu {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            background: var(--dropdown-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--card-radius);
            box-shadow: var(--box-shadow);
            padding: 6px;
            min-width: 160px;
            display: none;
            flex-direction: column;
            gap: 2px;
            z-index: 30;
        }
        .dropdown-menu.show { display: flex; }
        .dropdown-item {
            padding: 8px 12px;
            font-size: 12px;
            color: var(--text-color);
            text-decoration: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
        }
        .dropdown-item:hover { background: var(--hover-bg); }

        .style-btn {
            width: 100%;
            text-align: left;
            background: transparent;
            border: 1px solid transparent;
            border-radius: 6px;
            padding: 5px 8px;
            font-size: 11px;
            font-weight: 500;
            color: var(--text-color);
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .style-btn:hover { background: var(--hover-bg); border-color: var(--btn-hover-border); }
        .style-btn.active { background: var(--hover-bg); border-color: var(--border-hover); font-weight: 600; }

        .slider-group {
            margin-bottom: 10px;
        }
        .slider-group:last-child { margin-bottom: 0; }
        .slider-label {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            font-weight: 600;
            color: var(--sub-color);
            margin-bottom: 3px;
        }
        .slider-label span { color: var(--text-color); font-family: monospace; }
        input[type="range"] {
            width: 100%;
            accent-color: var(--border-hover);
            cursor: pointer;
        }

        .checkbox-row, .select-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
            font-weight: 500;
            color: var(--text-color);
            margin-bottom: 8px;
            cursor: pointer;
        }
        .checkbox-row input {
            cursor: pointer;
            accent-color: var(--border-hover);
            width: 15px;
            height: 15px;
        }
        .select-row select {
            background: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 11px;
            outline: none;
            cursor: pointer;
        }
        .select-row select:focus { border-color: var(--border-hover); }

        .info-row {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            margin-bottom: 3px;
            font-family: monospace;
        }
        .info-row span:first-child { color: var(--sub-color); font-weight: 600; }
        .info-row span:last-child { color: var(--text-color); font-weight: 700; }

        .cfcc-input {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            border-radius: 6px;
            padding: 6px 10px;
            width: 100%;
            outline: none;
            font-size: 12px;
        }
        .cfcc-input:focus { border-color: var(--border-hover); box-shadow: var(--focus-ring); }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
    </style>
</head>
<body data-theme="dark">

<div class="main-layout">
  <div class="sidebar-left">
    <div class="panel-box" style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
      <div class="panel-title" id="lblGenControls">Generator Controls</div>
      <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; padding-right: 4px;">
        <div class="section-subhdr" id="lblCatCamo">Camouflage</div>
        <button data-style="wwi" class="style-btn active">WWI Dazzle</button>
        <button data-style="splinter" class="style-btn">Splinter Tarn</button>
        <button data-style="tiger" class="style-btn">Tiger Stripe</button>
        <button data-style="digital" class="style-btn">Digital MARPAT</button>
        <button data-style="flecktarn" class="style-btn">Flecktarn</button>
        
        <div class="section-subhdr" id="lblCatAbstract">Abstract</div>
        <button data-style="cubist" class="style-btn">Cubist Abstract</button>
        <button data-style="hex" class="style-btn">Hex Tactical</button>
        <button data-style="brushstroke" class="style-btn">Brushstroke</button>
        <button data-style="topographic" class="style-btn">Topographic</button>
        <button data-style="shapes" class="style-btn">Geometric Shapes</button>
        
        <div class="section-subhdr" id="lblCatOrganic">Organic</div>
        <button data-style="zebra" class="style-btn">Zebra Stripes</button>
        <button data-style="leopard" class="style-btn">Leopard Print</button>
        <button data-style="rust" class="style-btn">Rust & Patina</button>
        <button data-style="wood" class="style-btn">Wood Grain</button>
        
        <div class="section-subhdr" id="lblCatTech">Tech / Synth</div>
        <button data-style="wireframe" class="style-btn">Cyber Wireframe</button>
        <button data-style="carbon" class="style-btn">Carbon Fibre</button>
        <button data-style="circuit" class="style-btn">Circuit Board</button>
        <button data-style="glitch" class="style-btn">Data Glitch</button>
        
        <div class="section-subhdr" id="lblCatNovelty">Novelty</div>
        <button data-style="emojis" class="style-btn">Emoji Pattern</button>
      </div>
    </div>

    <div class="panel-box" style="flex-shrink: 0;">
      <div class="panel-title" id="lblTextureInfo">Texture Info</div>
      <div class="info-row"><span id="lblActiveStyle">Active Style:</span><span id="infoStyleName">WWI Dazzle</span></div>
      <div class="info-row"><span id="lblPaletteColors">Palette Colors:</span><span id="infoColors">5</span></div>
      <div class="info-row"><span id="lblBackground">Background:</span><span id="infoBg">#101010</span></div>
      <div class="info-row"><span id="lblViewportRes">Viewport Res:</span><span id="infoRes">1200 x 800</span></div>
      <div class="info-row"><span id="lblColorDepth">Color Depth:</span><span>32-bit RGBA</span></div>
      <div class="info-row"><span id="lblSeedVal">Seed Value:</span><span id="infoSeedDisp">1234</span></div>
      <div class="info-row mt-1"><span id="lblEstSize">Est. File Size:</span><span id="infoFileSize">-- MB</span></div>
      <div class="info-row"><span id="lblRawMem">Raw Memory:</span><span id="infoMemory">-- MB</span></div>
    </div>
  </div>

  <div class="viewport-center" id="viewport">
    <div class="floating-toolbar">
      <button id="reloadBtn" class="float-icon-btn" title="Regenerate Texture">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
      </button>

      <div class="relative" id="downloadContainer">
        <button id="downloadDropdownBtn" class="float-icon-btn" title="Export PNG Options">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        </button>
        <div id="downloadMenu" class="dropdown-menu">
          <div class="px-3 py-1 text-[10px] font-bold text-[var(--sub-color)] uppercase tracking-wider" id="lblExportRes">Resolutions</div>
          <a class="dropdown-item dl-opt" data-res="current">Viewport Size</a>
          <a class="dropdown-item dl-opt" data-res="1280x720">720p HD</a>
          <a class="dropdown-item dl-opt" data-res="1920x1080">1080p FHD</a>
          <a class="dropdown-item dl-opt" data-res="2560x1440">1440p QHD</a>
          <div class="border-t border-[var(--border-color)] my-1"></div>
          <a class="dropdown-item dl-opt" id="customResBtn">Custom X by X...</a>
        </div>
      </div>
    </div>

    <canvas id="dazzleCanvas" width="1200" height="800"></canvas>
    <div class="zoom-indicator" id="zoomIndicator">100%</div>
  </div>

  <div class="sidebar-right">
    <div class="panel-box">
      <div class="panel-title" id="lblFineTuning">Fine Tuning</div>
      
      <div class="slider-group">
        <div class="slider-label"><span id="lblSeed">Seed Value</span> <span id="valSeed">1234</span></div>
        <input type="range" id="rangeSeed" min="1" max="9999" value="1234">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblScale">Scale / Density</span> <span id="valScale">50</span></div>
        <input type="range" id="rangeScale" min="10" max="100" value="50">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblComplexity">Complexity</span> <span id="valComplexity">5</span></div>
        <input type="range" id="rangeComplexity" min="1" max="10" value="5">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblHue">Hue Shift</span> <span id="valHue">0°</span></div>
        <input type="range" id="rangeHue" min="0" max="360" value="0">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblSaturation">Saturation</span> <span id="valSaturation">100%</span></div>
        <input type="range" id="rangeSaturation" min="0" max="200" value="100">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblContrast">Contrast</span> <span id="valContrast">100%</span></div>
        <input type="range" id="rangeContrast" min="50" max="150" value="100">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblBrightness">Brightness</span> <span id="valBrightness">100%</span></div>
        <input type="range" id="rangeBrightness" min="50" max="150" value="100">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblBlur">Softness / Blur</span> <span id="valBlur">0px</span></div>
        <input type="range" id="rangeBlur" min="0" max="10" value="0">
      </div>
    </div>

    <div class="panel-box">
      <div class="panel-title" id="lblOptionsMenu">Options</div>
      
      <label class="checkbox-row">
        <span id="lblEnableOutlines">Enable Outlines</span>
        <input type="checkbox" id="chkOutline" checked>
      </label>

      <label class="checkbox-row">
        <span id="lblRandomPalette">Randomize Palettes</span>
        <input type="checkbox" id="chkRandomPalette" checked>
      </label>

      <label class="checkbox-row">
        <span id="lblInvertColors">Invert Colors</span>
        <input type="checkbox" id="chkInvert">
      </label>

      <label class="checkbox-row">
        <span id="lblVignette">Vignette Effect</span>
        <input type="checkbox" id="chkVignette" checked>
      </label>

      <div class="select-row mt-2">
        <span id="lblBlendMode">Blend Mode</span>
        <select id="selectBlend">
          <option value="normal">Normal</option>
          <option value="multiply">Multiply</option>
          <option value="screen">Screen</option>
          <option value="overlay">Overlay</option>
        </select>
      </div>

      <div class="slider-group mt-2">
        <div class="slider-label"><span id="lblRoughness">Roughness / Noise</span> <span id="valNoise">0%</span></div>
        <input type="range" id="rangeNoise" min="0" max="50" value="0">
      </div>

      <div class="slider-group">
        <div class="slider-label"><span id="lblStrokeWidth">Stroke Width</span> <span id="valStroke">2px</span></div>
        <input type="range" id="rangeStroke" min="0" max="10" value="2">
      </div>
    </div>
  </div>
</div>

<div id="customResModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
    <div class="panel-box !w-auto min-w-[320px]" id="customResContent">
        <h3 class="text-[var(--text-color)] text-lg font-bold mb-4" id="lblCustomModalTitle">Custom Download Size</h3>
        <div class="flex items-center gap-4 mb-2">
            <div class="flex-1">
                <label class="block text-xs text-[var(--sub-color)] mb-1 font-semibold uppercase" id="lblWidth">Width (px)</label>
                <input type="number" id="customW" value="3840" class="cfcc-input" />
            </div>
            <span class="text-[var(--sub-color)] mt-5 font-bold">X</span>
            <div class="flex-1">
                <label class="block text-xs text-[var(--sub-color)] mb-1 font-semibold uppercase" id="lblHeight">Height (px)</label>
                <input type="number" id="customH" value="2160" class="cfcc-input" />
            </div>
        </div>
        <p id="customError" class="text-red-500 text-xs h-4 mb-4 font-semibold"></p>
        <div class="flex justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
            <button id="cancelCustom" class="px-4 py-2 text-sm font-semibold text-[var(--sub-color)] hover:text-[var(--text-color)] transition-colors">Cancel</button>
            <button id="downloadCustom" class="float-btn !bg-[var(--border-hover)] !text-white !border-transparent hover:!opacity-90 px-4 py-2 rounded-lg text-sm font-semibold">Download</button>
        </div>
    </div>
</div>

<script>
  (function(){
    "use strict";

    const canvas = document.getElementById('dazzleCanvas');
    const ctx = canvas.getContext('2d');
    const viewport = document.getElementById('viewport');
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
      canvas.style.transform = \`translate(\${panX}px, \${panY}px) scale(\${scale})\`;
      zoomIndicator.textContent = \`\${Math.round(scale * 100)}%\`;
    }
    updateCanvasTransform();

    viewport.addEventListener('mousedown', (e) => {
      if (e.button === 0 && (e.target === viewport || e.target === canvas)) {
        isPanning = true;
        viewport.classList.add('grabbing');
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
      viewport.classList.remove('grabbing');
    });
    viewport.addEventListener('wheel', (e) => {
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
            tCtx.font = \`\${randomInt(20, 60)}px sans-serif\`;
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

        let filterStr = \`hue-rotate(\${hueShiftVal}deg) saturate(\${saturationVal}%) contrast(\${contrastVal}%) brightness(\${brightnessVal}%) blur(\${blurVal}px)\`;
        if (invertColors) filterStr += \` invert(100%)\`;
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
        document.getElementById('infoMemory').textContent = (rawBytes / (1024 * 1024)).toFixed(2) + ' MB';
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
        document.getElementById(\`range\${key}\`).addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            document.getElementById(\`val\${key}\`).textContent = key === 'Stroke' ? \`\${val}px\` : (key === 'Noise' ? \`\${val}%\` : val);
            if(key==='Seed') seedValue = val;
            if(key==='Scale') scaleDensity = val;
            if(key==='Complexity') complexityVal = val;
            if(key==='Noise') noiseVal = val;
            if(key==='Stroke') strokeWidthVal = val;
            generateMainTexture();
        });
    });

    ['Hue', 'Saturation', 'Contrast', 'Brightness', 'Blur'].forEach(key => {
        document.getElementById(\`range\${key}\`).addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            document.getElementById(\`val\${key}\`).textContent = key === 'Hue' ? \`\${val}°\` : (key === 'Blur' ? \`\${val}px\` : \`\${val}%\`);
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
    const customResBtn = document.getElementById('customResBtn');
    const customResModal = document.getElementById('customResModal');
    
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
        link.download = \`texture-\${currentStyle}-\${width}x\${height}.png\`;
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

    customResBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        customResModal.classList.remove('hidden');
    });

    document.getElementById('cancelCustom').addEventListener('click', () => { customResModal.classList.add('hidden'); });
    document.getElementById('customResContent').addEventListener('click', (e) => e.stopPropagation());

    document.getElementById('downloadCustom').addEventListener('click', () => {
        const w = parseInt(document.getElementById('customW').value);
        const h = parseInt(document.getElementById('customH').value);
        if(w > 0 && h > 0) {
            customResModal.classList.add('hidden');
            executeDownload(w, h);
        } else {
            document.getElementById('customError').textContent = 'Invalid dimensions';
        }
    });

    generateMainTexture();

  })();
</script>
</body>
</html>`;
    }
})();