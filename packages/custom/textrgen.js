/**
 * Texture Generator Package for sTerminal
 * Location: packages/custom/textregen.js
 * 
 * A command-line package for generating procedural textures and downloading them.
 * Adapts the core texture generation algorithms into a headless batch process.
 */

if (!window.packagesRegistry) {
    window.packagesRegistry = {};
}

// Encapsulate the core texture generation engine so it doesn't pollute the global scope
const TextureEngine = (function() {
    
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

    let seedTracker = 0;
    
    // Core Randomization Utilities
    function random() {
        const x = Math.sin(seedTracker++) * 10000;
        return x - Math.floor(x);
    }
    function randomInt(min, max) { return Math.floor(random() * (max - min + 1) + min); }
    function randomChoice(arr) { return arr[Math.floor(random() * arr.length)]; }
    
    function getContrastingColors(palette) {
        const color1 = randomChoice(palette);
        let color2 = randomChoice(palette);
        while (color2 === color1 && palette.length > 1) color2 = randomChoice(palette);
        return [color1, color2];
    }

    // Helper Path & Geometry Generators
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

    function strokeCheck(tCtx, opts) {
        if (opts.enableOutline && opts.strokeWidthVal > 0) {
            tCtx.lineWidth = opts.strokeWidthVal;
            tCtx.stroke();
        }
    }

    // Individual style generators
    const generators = {
        wwi: (tCtx, w, h, opts, pal) => {
            const scaleFactor = Math.max(w, h) / 1500;
            const s = (val) => val * (scaleFactor > 0.5 ? scaleFactor : 1);
            const [c1, c2] = getContrastingColors(pal);
            drawStripes(tCtx, w, h, c1, c2, random() * Math.PI, s(randomInt(40, 150)));

            const numBands = randomInt(4, 10) * (opts.complexityVal/5);
            for (let i = 0; i < numBands; i++) {
                tCtx.save();
                applyPolygonPath(tCtx, createIntersectingBand(w, h));
                tCtx.clip();
                const [ac1, ac2] = getContrastingColors(pal);
                if (random() < 0.3) { tCtx.fillStyle = ac1; tCtx.fill(); }
                else { drawStripes(tCtx, w, h, ac1, ac2, random() * Math.PI, s(randomInt(15, 80))); }
                tCtx.restore();
            }

            const numBlocks = randomInt(8, 25) * (opts.scaleDensity/50);
            for (let i = 0; i < numBlocks; i++) {
                tCtx.save();
                applyPolygonPath(tCtx, createRandomPolygon(random()*w, random()*h, s(randomInt(50, 150)), s(randomInt(100, 450)), randomInt(3, 6)));
                tCtx.clip();
                const [bc1, bc2] = getContrastingColors(pal);
                if (random() < 0.4) { tCtx.fillStyle = bc1; tCtx.fill(); }
                else { drawStripes(tCtx, w, h, bc1, bc2, random() * Math.PI, s(randomInt(20, 60))); }
                tCtx.restore();
            }
        },

        splinter: (tCtx, w, h, opts, pal) => {
            const cols = Math.floor(9 * (opts.scaleDensity/50));
            const rows = Math.floor(9 * (opts.scaleDensity/50));
            const cellW = w / Math.max(1, cols);
            const cellH = h / Math.max(1, rows);
            for (let y = 0; y <= rows; y++) {
                for (let x = 0; x <= cols; x++) {
                    const cx = x * cellW + (random() - 0.5) * cellW;
                    const cy = y * cellH + (random() - 0.5) * cellH;
                    applyPolygonPath(tCtx, createRandomPolygon(cx, cy, cellW * 0.4, cellW * 1.3, randomInt(4, 7)));
                    tCtx.fillStyle = randomChoice(pal);
                    tCtx.fill();
                    tCtx.strokeStyle = randomChoice(pal);
                    strokeCheck(tCtx, opts);
                }
            }
        },

        tiger: (tCtx, w, h, opts, pal) => {
            const numStripes = Math.floor(45 * (opts.scaleDensity/50));
            tCtx.save();
            tCtx.translate(w/2, h/2);
            tCtx.rotate((random() - 0.5) * 0.4);
            tCtx.translate(-w/2, -h/2);
            const stepY = h / Math.max(1, numStripes);
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
                tCtx.fillStyle = randomChoice(pal);
                tCtx.fill();
            }
            tCtx.restore();
        },

        digital: (tCtx, w, h, opts, pal) => {
            const blockSize = Math.max(5, Math.floor(Math.min(w, h) / (opts.scaleDensity * 1.5)));
            const cols = Math.ceil(w / blockSize);
            const rows = Math.ceil(h / blockSize);
            const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) grid[r][c] = Math.floor(random() * pal.length);
            }
            for (let iter = 0; iter < Math.floor(opts.complexityVal/2); iter++) {
                for (let r = 1; r < rows - 1; r++) {
                    for (let c = 1; c < cols - 1; c++) {
                        if (random() < 0.35) grid[r][c] = grid[r + (random() > 0.5 ? 1 : -1)][c + (random() > 0.5 ? 1 : -1)];
                    }
                }
            }
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    tCtx.fillStyle = pal[grid[r][c]];
                    tCtx.fillRect(c * blockSize, r * blockSize, blockSize + 0.5, blockSize + 0.5);
                }
            }
        },

        cubist: (tCtx, w, h, opts, pal) => {
            const shapes = Math.floor(randomInt(45, 85) * (opts.scaleDensity/50));
            for (let i = 0; i < shapes; i++) {
                tCtx.save();
                const cx = random() * w, cy = random() * h;
                const size = randomInt(80, Math.max(w, h) * 0.45);
                tCtx.beginPath();
                if (random() < 0.5) applyPolygonPath(tCtx, createRandomPolygon(cx, cy, size * 0.2, size, 3));
                else {
                    tCtx.translate(cx, cy); tCtx.rotate(random() * Math.PI); tCtx.rect(-size/2, -size/4, size, size/2);
                }
                tCtx.fillStyle = randomChoice(pal);
                tCtx.globalAlpha = 0.8 + random() * 0.2;
                tCtx.fill();
                tCtx.strokeStyle = '#000000';
                strokeCheck(tCtx, opts);
                tCtx.restore();
            }
        },

        flecktarn: (tCtx, w, h, opts, pal) => {
            tCtx.fillStyle = pal[0];
            tCtx.fillRect(0, 0, w, h);
            const numClusters = Math.floor((w * h) / 8000 * (opts.scaleDensity/50));
            for (let i = 0; i < numClusters; i++) {
                const cx = random() * w;
                const cy = random() * h;
                const color = randomChoice(pal.slice(1));
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
        },

        hex: (tCtx, w, h, opts, pal) => {
            tCtx.fillStyle = pal[0];
            tCtx.fillRect(0, 0, w, h);
            const r = Math.max(5, randomInt(15, 35) * (50 / opts.scaleDensity));
            const dx = r * 1.5;
            const dy = r * Math.sqrt(3);
            tCtx.lineWidth = opts.strokeWidthVal > 0 ? opts.strokeWidthVal : 1.5;
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
                        tCtx.fillStyle = randomChoice(pal);
                        tCtx.fill();
                        if (opts.enableOutline) { tCtx.strokeStyle = 'rgba(0,0,0,0.2)'; tCtx.stroke(); }
                    }
                }
            }
        },

        circuit: (tCtx, w, h, opts, pal) => {
            const p = pal.length >= 4 ? pal : ['#003300', '#00ff00', '#00aa00', '#c0c0c0'];
            tCtx.fillStyle = p[0];
            tCtx.fillRect(0, 0, w, h);
            const cell = Math.max(10, 25 * (50 / opts.scaleDensity));
            const cols = Math.floor(w / cell), rows = Math.floor(h / cell);
            const numTraces = Math.floor((cols * rows) * 0.12 * (opts.complexityVal/5));
            tCtx.lineCap = 'round'; tCtx.lineJoin = 'round';
            for (let i = 0; i < numTraces; i++) {
                let currC = randomInt(1, Math.max(2, cols - 2));
                let currR = randomInt(1, Math.max(2, rows - 2));
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
                tCtx.lineWidth = opts.strokeWidthVal > 0 ? opts.strokeWidthVal * 1.5 : 3;
                tCtx.strokeStyle = random() > 0.6 ? p[2] : p[1];
                tCtx.stroke();
                if (random() > 0.4) {
                    tCtx.fillStyle = p[3];
                    tCtx.beginPath();
                    tCtx.arc(currC * cell, currR * cell, 5, 0, Math.PI*2);
                    tCtx.fill();
                }
            }
        },
        
        glitch: (tCtx, w, h, opts, pal) => {
            const p = pal.length >= 5 ? pal : ['#0f0f0f', '#ff0055', '#00ffff', '#ffffff', '#222222'];
            tCtx.fillStyle = p[0];
            tCtx.fillRect(0, 0, w, h);
            const numBlocks = randomInt(30, 70) * (opts.complexityVal/5);
            for(let i=0; i<numBlocks; i++) {
                tCtx.fillStyle = p[4] || p[1];
                tCtx.fillRect(random()*w, random()*h, random()*300, random()*80);
            }
            for(let i=0; i<45; i++) {
                const x = random() * w, y = random() * h;
                const bw = random() * 250 + 50, bh = random() * 60 + 10;
                tCtx.globalCompositeOperation = 'screen';
                tCtx.fillStyle = p[1];
                tCtx.fillRect(x - 15, y, bw, bh);
                tCtx.fillStyle = p[2];
                tCtx.fillRect(x + 15, y, bw, bh);
                tCtx.globalCompositeOperation = 'source-over';
            }
            for(let i=0; i<100; i++) {
                tCtx.fillStyle = randomChoice(p);
                tCtx.fillRect(0, random()*h, w, random()*4);
            }
        }
    };

    // Expose main rendering method
    return {
        getAvailableStyles: () => Object.keys(stylePalettes),
        
        render: function(tCtx, w, h, opts) {
            seedTracker = opts.seedValue;
            
            let activePalette;
            if (opts.randomizePalette || opts.style === 'random') {
                const keys = Object.keys(stylePalettes);
                const styleList = stylePalettes[keys[Math.floor(random() * keys.length)]];
                activePalette = randomChoice(styleList) || stylePalettes.wwi[0];
            } else {
                const styleList = stylePalettes[opts.style] || stylePalettes.wwi;
                activePalette = styleList[0];
            }

            // CSS Filters support in canvas
            let filterStr = `hue-rotate(${opts.hueShiftVal}deg) saturate(${opts.saturationVal}%) contrast(${opts.contrastVal}%) brightness(${opts.brightnessVal}%) blur(${opts.blurVal}px)`;
            if (opts.invertColors) filterStr += ` invert(100%)`;
            tCtx.filter = filterStr;
            tCtx.globalCompositeOperation = opts.blendMode === 'normal' ? 'source-over' : opts.blendMode;
            
            // Execute pattern generator
            const styleToRun = (opts.style === 'random' || !generators[opts.style]) 
                ? randomChoice(Object.keys(generators)) 
                : opts.style;
                
            if (generators[styleToRun]) {
                generators[styleToRun](tCtx, w, h, opts, activePalette);
            } else {
                // Fallback
                generators.wwi(tCtx, w, h, opts, activePalette);
            }

            // Post-processing: Noise
            if (opts.noiseVal > 0) {
                tCtx.filter = 'none';
                const imgData = tCtx.getImageData(0, 0, w, h);
                const data = imgData.data;
                const intensity = opts.noiseVal * 2.5;
                for (let i = 0; i < data.length; i += 4) {
                    const randNoise = (random() - 0.5) * intensity;
                    data[i] = Math.min(255, Math.max(0, data[i] + randNoise));
                    data[i+1] = Math.min(255, Math.max(0, data[i+1] + randNoise));
                    data[i+2] = Math.min(255, Math.max(0, data[i+2] + randNoise));
                }
                tCtx.putImageData(imgData, 0, 0);
            }

            // Post-processing: Vignette
            if (opts.vignetteEffect) {
                tCtx.save();
                const gradient = tCtx.createRadialGradient(w/2, h/2, Math.max(w,h)*0.3, w/2, h/2, Math.max(w,h)*0.75);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(1, 'rgba(0,0,0,0.65)');
                tCtx.fillStyle = gradient;
                tCtx.fillRect(0, 0, w, h);
                tCtx.restore();
            }
            
            tCtx.filter = 'none'; // reset filter
        }
    };
})();

window.packagesRegistry['textrgen'] = {
    preInstalledOn: ['default', 'Ubuntu', 'Kali'],
    
    commandInfo: {
        textrgen: "what is this command?\ntextrgen\n\nwhat is it used for?\nA powerful command-line procedural texture generator. Generates random or specific pattern textures and triggers automated downloads. Great for asset generation.\n\nUsage:\n  textrgen [options]\n\nOptions:\n  -s, --style <name>     Texture style (e.g., wwi, glitch, digital). Default: random\n  -r, --res <WxH>        Resolution in pixels. Default: 1920x1080\n  -n, --amount <num>     Number of images to generate & download. Default: 1\n  -t, --tty <name>       Send console output to a specific TTY (e.g. tty2)\n  --seed <num>           Base seed for generation\n  --hue <0-360>          Hue shift degree\n  --sat <0-200>          Saturation percentage\n  --scale <10-100>       Scale/Density setting\n  --complex <1-10>       Complexity setting\n  --noise <0-50>         Add noise percentage\n  --invert               Invert the output colors\n  --no-vignette          Disable the edge vignette effect\n  --list-styles          List all available pattern styles\n  -h, --help             Show this help message"
    },
    
    autocomplete: {
        textrgen: function(args) {
            const flags = [
                '-s', '--style', '-r', '--res', '-n', '--amount', '-t', '--tty',
                '--seed', '--hue', '--sat', '--scale', '--complex', '--noise',
                '--invert', '--no-vignette', '--list-styles', '-h', '--help'
            ];
            
            const styles = TextureEngine.getAvailableStyles();
            styles.push('random');
            
            let ttys = [];
            if (typeof window.terminals !== 'undefined') {
                ttys = Object.keys(window.terminals).flatMap(t => [t, `/dev/${t}`]);
            }
            
            // Context-aware suggestions if args is an array of preceding tokens
            if (Array.isArray(args) && args.length > 0) {
                const prevWord = args[args.length - 1];
                if (prevWord === '-s' || prevWord === '--style') return styles;
                if (prevWord === '-t' || prevWord === '--tty') return ttys;
            }
            
            return [...flags, ...styles, ...ttys];
        }
    },
    
    commands: {
        textrgen: async function(args) {
            
            let opts = {
                style: 'random',
                width: 1920,
                height: 1080,
                amount: 1,
                seedValue: Math.floor(Math.random() * 9999) + 1,
                hueShiftVal: 0,
                saturationVal: 100,
                contrastVal: 100,
                brightnessVal: 100,
                scaleDensity: 50,
                complexityVal: 5,
                noiseVal: 0,
                blurVal: 0,
                strokeWidthVal: 2,
                enableOutline: true,
                randomizePalette: false, 
                invertColors: false,
                vignetteEffect: true,
                blendMode: 'normal',
                tty: null,
                help: false,
                listStyles: false
            };

            // Parse arguments
            for (let i = 0; i < args.length; i++) {
                const arg = args[i].toLowerCase();
                
                if (arg === '-h' || arg === '--help') opts.help = true;
                else if (arg === '--list-styles') opts.listStyles = true;
                else if (arg === '--invert') opts.invertColors = true;
                else if (arg === '--no-vignette') opts.vignetteEffect = false;
                else if (arg === '-t' || arg === '--tty') {
                    if (i + 1 < args.length) opts.tty = args[++i];
                }
                else if (arg === '-s' || arg === '--style') {
                    if (i + 1 < args.length) opts.style = args[++i].toLowerCase();
                } 
                else if (arg === '-r' || arg === '--res') {
                    if (i + 1 < args.length) {
                        const resSplit = args[++i].toLowerCase().split('x');
                        if (resSplit.length === 2 && !isNaN(resSplit[0]) && !isNaN(resSplit[1])) {
                            opts.width = Math.max(64, parseInt(resSplit[0]));
                            opts.height = Math.max(64, parseInt(resSplit[1]));
                        } else {
                            this.print("Error: Invalid resolution format. Use WxH (e.g. 1920x1080).", "error");
                            return;
                        }
                    }
                }
                else if (arg === '-n' || arg === '--amount') {
                    if (i + 1 < args.length) opts.amount = Math.max(1, parseInt(args[++i]) || 1);
                }
                else if (arg === '--seed') {
                    if (i + 1 < args.length) opts.seedValue = parseInt(args[++i]) || opts.seedValue;
                }
                else if (arg === '--hue') {
                    if (i + 1 < args.length) opts.hueShiftVal = Math.max(0, Math.min(360, parseInt(args[++i]) || 0));
                }
                else if (arg === '--sat') {
                    if (i + 1 < args.length) opts.saturationVal = Math.max(0, Math.min(200, parseInt(args[++i]) || 100));
                }
                else if (arg === '--scale') {
                    if (i + 1 < args.length) opts.scaleDensity = Math.max(10, Math.min(100, parseInt(args[++i]) || 50));
                }
                else if (arg === '--complex') {
                    if (i + 1 < args.length) opts.complexityVal = Math.max(1, Math.min(10, parseInt(args[++i]) || 5));
                }
                else if (arg === '--noise') {
                    if (i + 1 < args.length) opts.noiseVal = Math.max(0, Math.min(50, parseInt(args[++i]) || 0));
                }
            }

            let targetTerm = this;
            if (opts.tty) {
                // Support providing "/dev/ttyX" or simply "ttyX"
                const ttyName = opts.tty.replace('/dev/', '');
                if (window.terminals && window.terminals[ttyName] && typeof window.terminals[ttyName].print === 'function') {
                    targetTerm = window.terminals[ttyName];
                } else {
                    this.print(`[!] Warning: Target TTY '${opts.tty}' not found or invalid. Outputting to current terminal.`, 'warning');
                }
            }

            // Centralized helper functions for routing logs to the correct terminal
            const printOut = (msg, type) => targetTerm.print(msg, type);
            const scrollOut = () => { if (typeof targetTerm.scrollToBottom === 'function') targetTerm.scrollToBottom(); };

            if (opts.help) {
                printOut("Usage: textrgen [options]");
                printOut("  -s, --style <name>     Texture style (e.g., wwi, glitch, digital). Default: random");
                printOut("  -r, --res <WxH>        Resolution in pixels. Default: 1920x1080");
                printOut("  -n, --amount <num>     Number of images to generate & download. Default: 1");
                printOut("  -t, --tty <name>       Send console output to a specific TTY (e.g. tty2)");
                printOut("  --seed <num>           Base seed for generation");
                printOut("  --hue <0-360>          Hue shift degree");
                printOut("  --sat <0-200>          Saturation percentage");
                printOut("  --scale <10-100>       Scale/Density setting");
                printOut("  --complex <1-10>       Complexity setting");
                printOut("  --noise <0-50>         Add noise percentage");
                printOut("  --invert               Invert the output colors");
                printOut("  --no-vignette          Disable the edge vignette effect");
                printOut("  --list-styles          List all available pattern styles");
                scrollOut();
                return;
            }

            if (opts.listStyles) {
                printOut("Available Styles:");
                const styles = TextureEngine.getAvailableStyles();
                printOut(`  ${styles.join(', ')}`);
                scrollOut();
                return;
            }

            // Adjust default flag if they chose random
            if (opts.style === 'random') {
                opts.randomizePalette = true;
            }

            printOut(`Starting texture generation...`);
            printOut(`Resolution: ${opts.width}x${opts.height} | Mode: ${opts.style} | Batch Size: ${opts.amount}`);
            scrollOut();

            // Create offscreen canvas once
            const canvas = document.createElement('canvas');
            canvas.width = opts.width;
            canvas.height = opts.height;
            const ctx = canvas.getContext('2d');

            let baseSeed = opts.seedValue;

            for (let iter = 0; iter < opts.amount; iter++) {
                printOut(`> Processing ${iter + 1}/${opts.amount}... (Seed: ${baseSeed})`);
                scrollOut();
                
                // Allow UI to update
                await new Promise(r => setTimeout(r, 50));
                
                // Configure specific iteration settings
                let iterOpts = { ...opts, seedValue: baseSeed };
                
                // Clear and render
                ctx.clearRect(0, 0, opts.width, opts.height);
                TextureEngine.render(ctx, opts.width, opts.height, iterOpts);

                // Trigger physical download
                try {
                    const link = document.createElement('a');
                    const safeStyleName = opts.style === 'random' ? 'mix' : opts.style;
                    link.download = `texture-${safeStyleName}-${opts.width}x${opts.height}-${baseSeed}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                } catch (err) {
                    printOut(`[!] Failed to generate data URL. Is the resolution too large? (${err.message})`, "error");
                    break;
                }
                
                baseSeed += Math.floor(Math.random() * 500) + 1; // bump seed for the next iteration
            }

            printOut(`✓ Successfully generated and dispatched downloads for ${opts.amount} texture(s).`);
            scrollOut();
        }
    }
};

console.log('✅ TextRgen CLI package loaded successfully!');