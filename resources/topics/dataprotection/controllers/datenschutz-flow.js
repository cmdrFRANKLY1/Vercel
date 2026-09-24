// resources/topics/dataprotection/controllers/datenschutz-flow.js
// Custom canvas animation — "Der Weg des Datenschutzes".
// Extracted verbatim from the original module-scoped IIFE.

const STEPS = [
    { title_de: 'EU',              title_en: 'EU',                  sub_de: 'Macht die DSGVO',       sub_en: 'Creates the GDPR',     color: '#2563eb', icon: 'stars' },
    { title_de: 'Deutschland',     title_en: 'Germany',             sub_de: 'Macht das BDSG',        sub_en: 'Creates the BDSG',     color: '#d97706', icon: 'paragraph' },
    { title_de: 'Firmen & Ämter',  title_en: 'Companies',           sub_de: 'Müssen sich dran halten', sub_en: 'Must comply',        color: '#7c3aed', icon: 'building' },
    { title_de: 'Bürger',          title_en: 'Citizens',            sub_de: 'Können sich beschweren', sub_en: 'Can file complaints', color: '#059669', icon: 'person' },
    { title_de: 'Aufsichtsbehörde', title_en: 'Data Protection Auth', sub_de: 'Prüft und bestraft',   sub_en: 'Inspects and fines',  color: '#ea580c', icon: 'eye' },
    { title_de: 'Bußgeld',         title_en: 'Fines',               sub_de: 'Bis zu 20 Mio. €',      sub_en: 'Up to €20 million',   color: '#dc2626', icon: 'euro' }
];

const CYCLE      = 16.0;
const STEP_TIMES = [0.5, 2.5, 4.5, 6.5, 8.5, 10.5];
const HOLD_END   = 14.0;

const layout = { positions: [], nodeR: 16, isVert: false };

let rafId = null;
let canvas = null, ctx = null, wrapper = null;
let canvasWidth = 0, canvasHeight = 0;
let resizeObs = null;
let cycleTime = 0, lastTs = 0;

/* ---------- helpers ---------- */
function hexA(hex, a) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function easeOutBack(t)    { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

/* ---------- icon drawing ---------- */
function drawStar(c, cx, cy, outer, inner, points) {
    c.beginPath();
    for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = i / (points * 2) * Math.PI * 2 - Math.PI / 2;
        if (i === 0) c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        else         c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    c.closePath(); c.fill();
}
function drawStars(c, x, y, r) {
    for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2 - Math.PI / 2;
        drawStar(c, x + Math.cos(a) * r * 0.68, y + Math.sin(a) * r * 0.68, r * 0.20, r * 0.085, 5);
    }
}
function drawParagraph(c, x, y, r) {
    c.font = `800 ${Math.round(r * 1.95)}px Georgia, "Times New Roman", serif`;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('§', x, y + r * 0.10);
}
function drawBuilding(c, x, y, r) {
    const bw = r * 1.10, bh = r * 1.55, bx = x - bw / 2, by = y - bh / 2 + r * 0.12;
    c.beginPath(); c.rect(bx, by, bw, bh); c.stroke();
    c.beginPath(); c.moveTo(bx - r * 0.10, by); c.lineTo(x, by - r * 0.38); c.lineTo(bx + bw + r * 0.10, by); c.stroke();
    const ww = bw * 0.20, wh = bh * 0.15;
    [-bw * 0.24, bw * 0.24].forEach(dx => {
        [-bh * 0.26, 0, bh * 0.26].forEach(dy => {
            c.beginPath();
            c.rect(x + dx - ww / 2, by + bh * 0.5 + dy - wh / 2, ww, wh);
            c.fill();
        });
    });
}
function drawPerson(c, x, y, r) {
    c.beginPath(); c.arc(x, y - r * 0.42, r * 0.32, 0, Math.PI * 2); c.fill();
    c.beginPath();
    c.moveTo(x - r * 0.58, y + r * 0.85);
    c.quadraticCurveTo(x - r * 0.58, y + r * 0.05, x, y + r * 0.05);
    c.quadraticCurveTo(x + r * 0.58, y + r * 0.05, x + r * 0.58, y + r * 0.85);
    c.closePath(); c.fill();
}
function drawEye(c, x, y, r) {
    const w = r * 0.88, h = r * 0.68;
    c.beginPath();
    c.moveTo(x - w, y);
    c.quadraticCurveTo(x, y - h, x + w, y);
    c.quadraticCurveTo(x, y + h, x - w, y);
    c.closePath(); c.stroke();
    c.beginPath(); c.arc(x, y, r * 0.30, 0, Math.PI * 2); c.fill();
}
function drawEuro(c, x, y, r) {
    c.beginPath(); c.arc(x, y, r * 0.90, 0, Math.PI * 2); c.stroke();
    c.font = `800 ${Math.round(r * 1.30)}px Inter, sans-serif`;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('€', x, y + r * 0.06);
}
function drawIcon(name, c, x, y, r) {
    switch (name) {
        case 'stars':     drawStars(c, x, y, r); break;
        case 'paragraph': drawParagraph(c, x, y, r); break;
        case 'building':  drawBuilding(c, x, y, r); break;
        case 'person':    drawPerson(c, x, y, r); break;
        case 'eye':       drawEye(c, x, y, r); break;
        case 'euro':      drawEuro(c, x, y, r); break;
    }
}

/* ---------- layout ---------- */
function computeLayout() {
    const n = STEPS.length;
    const isVert = canvasWidth < 780;
    layout.isVert = isVert;

    let nodeR;
    if (isVert) nodeR = Math.max(20, Math.min(canvasWidth * 0.10, canvasHeight / (n * 3.0), 40));
    else        nodeR = Math.max(28, Math.min(canvasWidth / (n * 3.0), canvasHeight * 0.11, 55));
    layout.nodeR = nodeR;

    const positions = [];
    if (isVert) {
        const padTop = 64 + nodeR;
        const padBot = 64 + nodeR;
        const topY = padTop;
        const botY = canvasHeight - padBot;
        const stepY = (botY - topY) / (n - 1);
        for (let i = 0; i < n; i++) positions.push({ x: canvasWidth * 0.24, y: topY + stepY * i });
    } else {
        const padX = 74 + nodeR;
        const startX = padX;
        const endX = canvasWidth - padX;
        const stepX = (endX - startX) / (n - 1);
        const baseY = canvasHeight * 0.44;
        for (let i = 0; i < n; i++) positions.push({ x: startX + stepX * i, y: baseY });
    }
    layout.positions = positions;
}

function posAt(p) {
    const n = STEPS.length;
    const idx = Math.max(0, Math.min(1, p)) * (n - 1);
    const i = Math.min(Math.floor(idx), n - 2);
    const k = idx - i;
    const a = layout.positions[i], b = layout.positions[i + 1];
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
}

function cometProgress(t) {
    const n = STEPS.length;
    if (t <= STEP_TIMES[0]) return 0;
    if (t >= STEP_TIMES[n - 1]) return 1;
    for (let i = 0; i < n - 1; i++) {
        if (t >= STEP_TIMES[i] && t < STEP_TIMES[i + 1]) {
            const k = (t - STEP_TIMES[i]) / (STEP_TIMES[i + 1] - STEP_TIMES[i]);
            return (i + easeInOutCubic(k)) / (n - 1);
        }
    }
    return 1;
}

/* ---------- drawing ---------- */
function drawBackground(isLight) {
    const cx = canvasWidth / 2, cy = canvasHeight / 2;
    const R = Math.max(canvasWidth, canvasHeight) * 0.75;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    if (isLight) {
        grad.addColorStop(0,    'rgba(15, 23, 42, 0.05)');
        grad.addColorStop(0.55, 'rgba(15, 23, 42, 0.015)');
        grad.addColorStop(1,    'rgba(15, 23, 42, 0)');
    } else {
        grad.addColorStop(0,    'rgba(38,35,30,0.55)');
        grad.addColorStop(0.55, 'rgba(24,22,20,0.25)');
        grad.addColorStop(1,    'rgba(18,18,18,0)');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawPath(t, isLight) {
    const pos = layout.positions, n = pos.length;
    ctx.save();
    ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pos[0].x, pos[0].y);
    for (let i = 1; i < n; i++) ctx.lineTo(pos[i].x, pos[i].y);
    ctx.stroke();

    if (t > STEP_TIMES[0]) {
        const cp = cometProgress(t);
        const end = posAt(cp);
        ctx.strokeStyle = isLight ? 'rgba(37, 99, 235, 0.45)' : 'rgba(255,255,255,0.30)';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(pos[0].x, pos[0].y);
        const idxF = cp * (n - 1);
        for (let i = 1; i <= Math.floor(idxF); i++) ctx.lineTo(pos[i].x, pos[i].y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
    ctx.restore();
}

function drawBadge(num, x, y, r, active, prog, color, isLight) {
    const isVert = layout.isVert;
    const bx = isVert ? x - r - 22 : x;
    const by = isVert ? y : y - r - 26;
    const br = 13;

    ctx.save();
    ctx.globalAlpha = active ? (0.45 + 0.55 * prog) : 0.30;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fillStyle = active ? color : (isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255,255,255,0.10)');
    ctx.fill();
    ctx.fillStyle = active ? '#ffffff' : (isLight ? '#0f172a' : 'rgba(255,255,255,0.55)');
    ctx.font = '800 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(num), bx, by + 0.5);
    ctx.restore();
}

function drawLabels(nd, x, y, r, active, prog, isLight, isGerman) {
    const isVert = layout.isVert;
    const tx = isVert ? x + r + 18 : x;
    const ty = isVert ? y - 8      : y + r + 26;
    const sx = isVert ? x + r + 18 : x;
    const sy = isVert ? y + 14     : y + r + 48;

    ctx.save();
    ctx.textAlign = isVert ? 'left' : 'center';
    ctx.textBaseline = 'middle';

    ctx.globalAlpha = active ? (0.45 + 0.55 * prog) : 0.35;
    ctx.font = `700 ${isVert ? 16 : 17}px Inter, sans-serif`;
    ctx.fillStyle = active ? (isLight ? '#020617' : '#ffffff') : (isLight ? '#000000' : 'rgba(255,255,255,0.50)');
    ctx.fillText(isGerman ? nd.title_de : nd.title_en, tx, ty);

    ctx.globalAlpha = active ? (0.35 + 0.55 * prog) : 0.20;
    ctx.font = `600 ${isVert ? 12 : 12.5}px Inter, sans-serif`;
    ctx.fillStyle = nd.color;
    ctx.fillText(isGerman ? nd.sub_de : nd.sub_en, sx, sy);

    ctx.restore();
}

function drawNode(i, t, isLight, isGerman) {
    const nd = STEPS[i], p = layout.positions[i], r = layout.nodeR, x = p.x, y = p.y;
    const active = t >= STEP_TIMES[i];
    const prog = active ? Math.min(1, (t - STEP_TIMES[i]) / 0.5) : 0;
    const baseAlpha = active ? (0.38 + 0.62 * prog) : 0.22;

    if (active && prog > 0) {
        const glowR = r * 2.3;
        const grad = ctx.createRadialGradient(x, y, r * 0.7, x, y, glowR);
        grad.addColorStop(0,    hexA(nd.color, 0.42 * prog));
        grad.addColorStop(0.45, hexA(nd.color, 0.14 * prog));
        grad.addColorStop(1,    hexA(nd.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, glowR, 0, Math.PI * 2); ctx.fill();
    }

    const pop = (1 + 0.10 * easeOutBack(prog)) * (active && prog >= 1 ? (1 + 0.015 * Math.sin(t * 2.5 + i * 1.3)) : 1);
    const rr = r * pop;

    ctx.save();
    ctx.globalAlpha = baseAlpha;
    ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fillStyle = isLight ? '#ffffff' : '#1a1816'; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.strokeStyle = nd.color; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, rr * 0.86, 0, Math.PI * 2); ctx.strokeStyle = hexA(nd.color, 0.28); ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = nd.color; ctx.strokeStyle = nd.color; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (active) { ctx.shadowColor = nd.color; ctx.shadowBlur = 10 * prog; }
    drawIcon(nd.icon, ctx, x, y, rr * 0.50);
    ctx.restore();

    drawBadge(i + 1, x, y, rr, active, prog, nd.color, isLight);
    drawLabels(nd, x, y, rr, active, prog, isLight, isGerman);
}

function drawComet(t, isLight) {
    const cp = cometProgress(t), pos = posAt(cp), r = layout.nodeR;
    const trailLen = 0.07, segs = 9;
    const cometColorRGB = isLight ? '37, 99, 235' : '255, 255, 255';

    for (let i = segs; i >= 0; i--) {
        const tt = cp - (i / segs) * trailLen;
        if (tt < 0) continue;
        const p = posAt(tt);
        const a = (1 - i / segs) * 0.55;
        const rad = r * 0.16 * (1 - (i / segs) * 0.65);
        ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cometColorRGB},${a})`;
        ctx.fill();
    }
    const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 0.70);
    grad.addColorStop(0,    `rgba(${cometColorRGB},0.95)`);
    grad.addColorStop(0.35, `rgba(${cometColorRGB},0.45)`);
    grad.addColorStop(1,    `rgba(${cometColorRGB},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(pos.x, pos.y, r * 0.70, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(pos.x, pos.y, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? '#1e3a8a' : '#ffffff';
    ctx.fill();
}

function drawFrame(t) {
    if (!ctx || !canvasWidth || !canvasHeight) return;
    const isLight = document.documentElement.classList.contains('light');
    const isGerman = document.body.getAttribute('data-active-lang') !== 'en';

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground(isLight);

    let ga = 1;
    if (t < 0.5) ga = t / 0.5;
    else if (t > HOLD_END) ga = Math.max(0, 1 - (t - HOLD_END) / (CYCLE - HOLD_END));
    ctx.save();
    ctx.globalAlpha = ga;

    drawPath(t, isLight);
    drawComet(t, isLight);
    for (let i = 0; i < STEPS.length; i++) drawNode(i, t, isLight, isGerman);

    ctx.restore();
}

function loop(ts) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.1, (ts - lastTs) / 1000);
    lastTs = ts;
    cycleTime += dt;
    if (cycleTime >= CYCLE) cycleTime -= CYCLE;

    const bar = document.getElementById('dsgLoadingBar');
    if (bar) bar.style.width = ((cycleTime / CYCLE) * 100) + '%';

    drawFrame(cycleTime);
    rafId = requestAnimationFrame(loop);
}

function resizeCanvas() {
    if (!wrapper || !canvas) return;
    const rect = wrapper.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = Math.round(rect.width  * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width  = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvasWidth = rect.width;
    canvasHeight = rect.height;
    computeLayout();
}

export function startAnimation(rootEl) {
    canvas  = rootEl.querySelector('#dsgCanvas');
    wrapper = rootEl.querySelector('#dsgCanvasWrapper');
    if (!canvas || !wrapper) return;
    ctx = canvas.getContext('2d');

    cycleTime = 0;
    lastTs = 0;

    if (window.ResizeObserver) {
        resizeObs = new ResizeObserver(() => resizeCanvas());
        resizeObs.observe(wrapper);
    }
    window.addEventListener('resize', resizeCanvas);

    requestAnimationFrame(() => {
        resizeCanvas();
        rafId = requestAnimationFrame(loop);
    });
}

export function stopAnimation() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    if (resizeObs) { resizeObs.disconnect(); resizeObs = null; }
    window.removeEventListener('resize', resizeCanvas);
    canvas = null; ctx = null; wrapper = null;
    canvasWidth = 0; canvasHeight = 0;
    cycleTime = 0; lastTs = 0;
}