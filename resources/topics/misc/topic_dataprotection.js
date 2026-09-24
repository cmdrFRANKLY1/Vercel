// resources/topics/topic_dataprotection.js
// IHK Datenschutz (DSGVO / BDSG) reference.
// - Content fetched LIVE from gesetze-im-internet.de (via CORS proxies + JSZip)
// - Fetched data is cached in memory for the lifetime of the page load.
//   Switching away and back to the topic is INSTANT — no refetch.
// - Falls back to embedded mock XML if all proxies fail
// - Includes a self-contained canvas animation ("Der Weg des Datenschutzes")

(function () {
    /* ============================================================
       CUSTOM ANIMATION — "Der Weg des Datenschutzes"
       Module-scoped so it never leaks into the global scope.
       ============================================================ */

    const STEPS = [
        { title_de: 'EU',              title_en: 'EU',                  sub_de: 'Macht die DSGVO',       sub_en: 'Creates the GDPR',  color: '#2563eb', icon: 'stars' },
        { title_de: 'Deutschland',     title_en: 'Germany',             sub_de: 'Macht das BDSG',        sub_en: 'Creates the BDSG',  color: '#d97706', icon: 'paragraph' },
        { title_de: 'Firmen & Ämter',  title_en: 'Companies',           sub_de: 'Müssen sich dran halten', sub_en: 'Must comply',     color: '#7c3aed', icon: 'building' },
        { title_de: 'Bürger',          title_en: 'Citizens',            sub_de: 'Können sich beschweren',  sub_en: 'Can file complaints', color: '#059669', icon: 'person' },
        { title_de: 'Aufsichtsbehörde', title_en: 'Data Protection Auth', sub_de: 'Prüft und bestraft',   sub_en: 'Inspects and fines', color: '#ea580c', icon: 'eye' },
        { title_de: 'Bußgeld',         title_en: 'Fines',               sub_de: 'Bis zu 20 Mio. €',      sub_en: 'Up to €20 million',  color: '#dc2626', icon: 'euro' }
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

    function hexA(hex, a) {
        const h = hex.replace('#', '');
        const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
        return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
    }
    function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function easeOutBack(t)    { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

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

    function startAnimation(rootEl) {
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

    function stopAnimation() {
        if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
        if (resizeObs) { resizeObs.disconnect(); resizeObs = null; }
        window.removeEventListener('resize', resizeCanvas);
        canvas = null; ctx = null; wrapper = null;
        canvasWidth = 0; canvasHeight = 0;
        cycleTime = 0; lastTs = 0;
    }

    /* ============================================================
       LAW DATA CONFIG
       ============================================================ */
    const LAW_CONFIGS = [
        {
            code: 'dsgvo_2018',
            title: { de: 'DSGVO – Datenschutz-Grundverordnung', en: 'GDPR – General Data Protection Regulation' },
            icon: 'fa-scale-balanced',
            sections: [
                { id: 'dsgvo-grundlagen', title: { de: '1. DSGVO Grundlagen & Grundsätze', en: '1. GDPR Principles' },              icon: 'fa-list-check',     norms: ['art:5', 'art:6'] },
                { id: 'dsgvo-rechte',     title: { de: '2. DSGVO Betroffenenrechte',       en: '2. GDPR Data Subject Rights' },     icon: 'fa-user-shield',    norms: ['art:15', 'art:16', 'art:17', 'art:20', 'art:21'] },
                // Added Art. 30 (VVT) here to ensure the actual legal text is displayed before our VVT Summary Section.
                { id: 'dsgvo-pflichten',  title: { de: '3. DSGVO Pflichten & Rollen',      en: '3. GDPR Duties & Roles' },          icon: 'fa-clipboard-check', norms: ['art:28', 'art:30', 'art:32', 'art:33', 'art:35'] }
            ]
        },
        {
            code: 'bdsg_2018',
            title: { de: 'BDSG – Bundesdatenschutzgesetz', en: 'BDSG – Federal Data Protection Act' },
            icon: 'fa-gavel',
            sections: [
                { id: 'bdsg-beschaeftigte', title: { de: '4. BDSG – Beschäftigtenschutz',      en: '4. BDSG – Employee Privacy' },      icon: 'fa-users',                 norms: ['par:26'] },
                { id: 'bdsg-sanktionen',    title: { de: '5. BDSG – Sanktionen & Aufsicht',    en: '5. BDSG – Sanctions & Supervision' }, icon: 'fa-triangle-exclamation', norms: ['par:38', 'par:42', 'par:43'] }
            ]
        },
        {
            code: 'ttdsg',
            title: { de: 'TTDSG – Telemedien-Datenschutz', en: 'TTDSG – Telemedia Privacy' },
            icon: 'fa-cookie',
            sections: [
                { id: 'ttdsg-cookies', title: { de: '6. TTDSG – Cookies & Telemedien', en: '6. TTDSG – Cookies & Telemedia' }, icon: 'fa-cookie', norms: ['par:1', 'par:25'] }
            ]
        },
        {
            code: 'tkg_2021',
            title: { de: 'TKG – Telekommunikationsgesetz', en: 'TKG – Telecommunications Act' },
            icon: 'fa-tower-broadcast',
            sections: [
                { id: 'tkg-schutz', title: { de: '7. TKG – Fernmeldegeheimnis', en: '7. TKG – Telecommunications Privacy' }, icon: 'fa-phone', norms: ['par:3', 'par:91'] }
            ]
        }
    ];

    const GII_BASE = 'https://www.gesetze-im-internet.de';

    /* ============================================================
       MOCK / FALLBACK DATA
       ============================================================ */
    function getOfflineMockXml(code) {
        if (code === 'dsgvo_2018') return `<?xml version="1.0" encoding="UTF-8"?><dokumente><norm><metadaten><enbez>Art. 5</enbez><titel>Grundsätze für die Verarbeitung personenbezogener Daten</titel></metadaten><textdaten><text><Content><P>Personenbezogene Daten müssen auf rechtmäßige Weise, nach Treu und Glauben und in einer für die betroffene Person nachvollziehbaren Weise verarbeitet werden ("Rechtmäßigkeit, Verarbeitung nach Treu und Glauben, Transparenz"); für festgelegte, eindeutige und legitime Zwecke erhoben werden ("Zweckbindung"); dem Zweck angemessen und erheblich sowie auf das für die Zwecke der Verarbeitung notwendige Maß beschränkt sein ("Datenminimierung"); sachlich richtig und erforderlichenfalls auf dem neuesten Stand sein ("Richtigkeit"); in einer Form gespeichert werden, die die Identifizierung der betroffenen Personen nur so lange ermöglicht, wie es für die Zwecke, für die sie verarbeitet werden, erforderlich ist ("Speicherbegrenzung"); in einer Weise verarbeitet werden, die eine angemessene Sicherheit der personenbezogenen Daten gewährleistet ("Integrität und Vertraulichkeit").</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 6</enbez><titel>Rechtmäßigkeit der Verarbeitung</titel></metadaten><textdaten><text><Content><P>Die Verarbeitung ist nur rechtmäßig, wenn mindestens eine der nachstehenden Bedingungen erfüllt ist: a) Die betroffene Person hat ihre Einwilligung gegeben, b) die Verarbeitung ist für die Erfüllung eines Vertrags erforderlich, c) die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, d) lebenswichtige Interessen, e) öffentliches Interesse, f) berechtigte Interessen des Verantwortlichen, sofern nicht die Interessen oder Grundrechte der betroffenen Person überwiegen.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 15</enbez><titel>Auskunftsrecht der betroffenen Person</titel></metadaten><textdaten><text><Content><P>Die betroffene Person hat das Recht, von dem Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden; ist dies der Fall, so hat sie ein Recht auf Auskunft über diese personenbezogenen Daten und auf weitere Informationen wie Verarbeitungszwecke und Kategorien personenbezogener Daten.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 16</enbez><titel>Recht auf Berichtigung</titel></metadaten><textdaten><text><Content><P>Die betroffene Person hat das Recht, von dem Verantwortlichen unverzüglich die Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 17</enbez><titel>Recht auf Löschung ("Recht auf Vergessenwerden")</titel></metadaten><textdaten><text><Content><P>Die betroffene Person hat das Recht, von dem Verantwortlichen zu verlangen, dass sie betreffende personenbezogene Daten unverzüglich gelöscht werden, und der Verantwortliche ist verpflichtet, personenbezogene Daten unverzüglich zu löschen, sofern einer der Gründe zutrifft (z. B. Daten sind für die Zwecke nicht mehr notwendig oder die Einwilligung wurde widerrufen).</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 20</enbez><titel>Recht auf Datenübertragbarkeit</titel></metadaten><textdaten><text><Content><P>Die betroffene Person hat das Recht, die sie betreffenden personenbezogenen Daten, die sie einem Verantwortlichen bereitgestellt hat, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 21</enbez><titel>Widerspruchsrecht</titel></metadaten><textdaten><text><Content><P>Die betroffene Person hat das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten Widerspruch einzulegen.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 28</enbez><titel>Auftragsverarbeiter</titel></metadaten><textdaten><text><Content><P>Erfolgt eine Verarbeitung im Auftrag eines Verantwortlichen, so arbeitet dieser nur mit Auftragsverarbeitern, die hinreichend Garantien dafür bieten, dass geeignete technische und organisatorische Maßnahmen so durchgeführt werden, dass die Verarbeitung im Einklang mit den Anforderungen dieser Verordnung erfolgt und den Schutz der Rechte der betroffenen Person gewährleistet.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 30</enbez><titel>Verzeichnis von Verarbeitungstätigkeiten</titel></metadaten><textdaten><text><Content><P>(1) Jeder Verantwortliche und gegebenenfalls sein Vertreter führen ein Verzeichnis aller Verarbeitungstätigkeiten, die ihrer Zuständigkeit unterliegen. Dieses Verzeichnis enthält sämtliche folgenden Angaben: a) den Namen und die Kontaktdaten des Verantwortlichen und gegebenenfalls des gemeinsam mit ihm Verantwortlichen, des Vertreters des Verantwortlichen sowie eines etwaigen Datenschutzbeauftragten; b) die Zwecke der Verarbeitung; c) eine Beschreibung der Kategorien betroffener Personen und der Kategorien personenbezogener Daten; d) die Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, einschließlich Empfänger in Drittländern oder internationalen Organisationen; e) gegebenenfalls Übermittlungen von personenbezogenen Daten an ein Drittland oder an eine internationale Organisation, einschließlich der Angabe des betreffenden Drittlands oder der betreffenden internationalen Organisation, sowie bei den in Artikel 49 Absatz 1 Unterabsatz 2 genannten Datenübermittlungen die Dokumentierung geeigneter Garantien; f) wenn möglich, die vorgesehenen Fristen für die Löschung der verschiedenen Datenkategorien; g) wenn möglich, eine allgemeine Beschreibung der technischen und organisatorischen Maßnahmen gemäß Artikel 32 Absatz 1.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 32</enbez><titel>Sicherheit der Verarbeitung</titel></metadaten><textdaten><text><Content><P>Unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und Freiheiten natürlicher Personen treffen der Verantwortliche und der Auftragsverarbeiter geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten (z.B. Pseudonymisierung, Verschlüsselung).</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 33</enbez><titel>Meldung von Verletzungen des Schutzes personenbezogener Daten</titel></metadaten><textdaten><text><Content><P>Im Falle einer Verletzung des Schutzes personenbezogener Daten meldet der Verantwortliche diese unverzüglich und möglichst binnen 72 Stunden, nachdem ihm die Verletzung bekannt wurde, der zuständigen Aufsichtsbehörde, es sei denn, dass die Verletzung voraussichtlich nicht zu einem Risiko für die Rechte und Freiheiten natürlicher Personen führt.</P></Content></text></textdaten></norm><norm><metadaten><enbez>Art. 35</enbez><titel>Datenschutz-Folgenabschätzung</titel></metadaten><textdaten><text><Content><P>Hat eine Form der Verarbeitung voraussichtlich ein hohes Risiko für die Rechte und Freiheiten natürlicher Personen zur Folge, so führt der Verantwortliche vorab eine Abschätzung der Folgen der vorgesehenen Verarbeitungsvorgänge für den Schutz personenbezogener Daten durch.</P></Content></text></textdaten></norm></dokumente>`;
        if (code === 'bdsg_2018') return `<?xml version="1.0" encoding="UTF-8"?><dokumente><norm><metadaten><enbez>§ 26</enbez><titel>Datenverarbeitung für Zwecke des Beschäftigungsverhältnisses</titel></metadaten><textdaten><text><Content><P>Personenbezogene Daten von Beschäftigten dürfen für Zwecke des Beschäftigungsverhältnisses verarbeitet werden, wenn dies für die Entscheidung über die Begründung eines Beschäftigungsverhältnisses oder nach Begründung für dessen Durchführung oder Beendigung erforderlich ist.</P></Content></text></textdaten></norm><norm><metadaten><enbez>§ 38</enbez><titel>Datenschutzbeauftragter nichtöffentlicher Stellen</titel></metadaten><textdaten><text><Content><P>Ergänzend zu Artikel 37 der Verordnung (EU) 2016/679 benennen der Verantwortliche und der Auftragsverarbeiter eine Datenschutzbeauftragte oder einen Datenschutzbeauftragten, soweit sie in der Regel mindestens 20 Personen ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigen.</P></Content></text></textdaten></norm><norm><metadaten><enbez>§ 42</enbez><titel>Strafvorschriften</titel></metadaten><textdaten><text><Content><P>Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer wissentlich nicht allgemein zugängliche personenbezogene Daten einer großen Zahl von Personen, ohne hierzu berechtigt zu sein, einem Dritten übermittelt und hierbei gewerbsmäßig handelt.</P></Content></text></textdaten></norm><norm><metadaten><enbez>§ 43</enbez><titel>Bußgeldvorschriften</titel></metadaten><textdaten><text><Content><P>Ordnungswidrig handelt, wer vorsätzlich oder fahrlässig eine Auskunft nicht, nicht richtig, nicht vollständig oder nicht rechtzeitig erteilt.</P></Content></text></textdaten></norm></dokumente>`;
        if (code === 'ttdsg') return `<?xml version="1.0" encoding="UTF-8"?><dokumente><norm><metadaten><enbez>§ 1</enbez><titel>Anwendungsbereich</titel></metadaten><textdaten><text><Content><P>Dieses Gesetz regelt den Datenschutz und den Schutz der Privatsphäre in der Telekommunikation und bei Telemedien.</P></Content></text></textdaten></norm><norm><metadaten><enbez>§ 25</enbez><titel>Schutz der Privatsphäre bei Endeinrichtungen</titel></metadaten><textdaten><text><Content><P>Die Speicherung von Informationen in der Endeinrichtung des Endnutzers oder der Zugriff auf Informationen, die bereits in der Endeinrichtung gespeichert sind, sind nur zulässig, wenn der Endnutzer auf der Grundlage von klaren und umfassenden Informationen eingewilligt hat. Die Einwilligung ist nicht erforderlich, wenn die Speicherung oder der Zugriff unbedingt erforderlich ist, um einen vom Nutzer ausdrücklich gewünschten Telemediendienst zur Verfügung zu stellen.</P></Content></text></textdaten></norm></dokumente>`;
        if (code === 'tkg_2021') return `<?xml version="1.0" encoding="UTF-8"?><dokumente><norm><metadaten><enbez>§ 3</enbez><titel>Fernmeldegeheimnis</titel></metadaten><textdaten><text><Content><P>Dem Fernmeldegeheimnis unterliegen der Inhalt der Telekommunikation und ihre näheren Umstände, insbesondere die Tatsache, ob jemand an einem Telekommunikationsvorgang beteiligt ist oder war.</P></Content></text></textdaten></norm><norm><metadaten><enbez>§ 91</enbez><titel>Sicherheitskonzept</titel></metadaten><textdaten><text><Content><P>Wer öffentliche Telekommunikationsnetze betreibt oder öffentlich zugängliche Telekommunikationsdienste erbringt, hat angemessene technische und organisatorische Maßnahmen zu ergreifen, um die Sicherheit der Telekommunikationsnetze und -dienste zu gewährleisten.</P></Content></text></textdaten></norm></dokumente>`;
        return '<dokumente></dokumente>';
    }

    /* ============================================================
       JSZIP LOADER (lazy-loaded, once)
       ============================================================ */
    let jszipPromise = null;
    function loadJSZip() {
        if (window.JSZip) return Promise.resolve(window.JSZip);
        if (jszipPromise) return jszipPromise;
        jszipPromise = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            s.onload = () => resolve(window.JSZip);
            s.onerror = () => { jszipPromise = null; reject(new Error('Failed to load JSZip')); };
            document.head.appendChild(s);
        });
        return jszipPromise;
    }

    /* ============================================================
       FETCH LAW XML (with CORS proxy waterfall + mock fallback)
       ============================================================ */
    async function fetchLawXmlWithFallback(code) {
        if (code === 'dsgvo_2018') {
            return { xmlText: getOfflineMockXml(code), isMock: true };
        }

        await loadJSZip();

        const cb = Math.random().toString(36).substring(7);
        const urlsToTry = [];
        if (code === 'ttdsg') {
            urlsToTry.push(`${GII_BASE}/tdddg/xml.zip?cb=${cb}`);
            urlsToTry.push(`${GII_BASE}/ttdsg/xml.zip?cb=${cb}`);
        } else {
            urlsToTry.push(`${GII_BASE}/${code}/xml.zip?cb=${cb}`);
        }

        const proxies = [
            (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
            (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
            (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
        ];

        for (const zipUrl of urlsToTry) {
            for (const proxy of proxies) {
                try {
                    const targetUrl = proxy(zipUrl);
                    const res = await fetch(targetUrl, { signal: AbortSignal.timeout(10000) });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);

                    const buf = await res.arrayBuffer();
                    const view = new Uint8Array(buf);
                    if (view.length < 4 || view[0] !== 0x50 || view[1] !== 0x4B) {
                        throw new Error('Proxy returned non-ZIP data');
                    }

                    const zip = await window.JSZip.loadAsync(buf);
                    const xmlFileName = Object.keys(zip.files).find(n => n.endsWith('.xml'));
                    if (!xmlFileName) throw new Error('No XML inside ZIP');

                    const xmlText = await zip.files[xmlFileName].async('string');
                    return { xmlText, isMock: false };
                } catch (e) {
                    console.warn(`Fetch failed for ${zipUrl} via proxy:`, e.message || e);
                }
            }
        }

        console.warn(`All proxies failed for ${code}. Using embedded fallback.`);
        return { xmlText: getOfflineMockXml(code), isMock: true };
    }

    function parseLawXml(xmlText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'text/xml');
        const norms = {};

        doc.querySelectorAll('norm').forEach(norm => {
            const meta = norm.querySelector('metadaten');
            if (!meta) return;

            const enbez = meta.querySelector('enbez')?.textContent?.trim() || '';
            const jurabk = meta.querySelector('jurabk')?.textContent?.trim() || '';
            const titel = meta.querySelector('titel')?.textContent?.trim() || '';

            if (!enbez || enbez.includes('Abs')) return;

            let normId = '';
            const artMatch = enbez.match(/^Art\.?\s*(\d+[a-z]?)/i);
            const parMatch = enbez.match(/^§\s*(\d+[a-z]?)/);
            if (artMatch) normId = `art:${artMatch[1]}`;
            else if (parMatch) normId = `par:${parMatch[1]}`;
            else return;

            const textEl = norm.querySelector('textdaten');
            let fullText = '';
            if (textEl) {
                const paragraphs = textEl.querySelectorAll('P');
                if (paragraphs.length > 0) {
                    fullText = Array.from(paragraphs).map(p => p.textContent.trim()).filter(t => t).join('\n\n');
                } else {
                    fullText = textEl.textContent.trim();
                }
            }

            fullText = fullText.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
            const heading = `${enbez} ${titel || jurabk}`.trim();

            if (!norms[normId]) norms[normId] = { heading, text: fullText, enbez, titel, jurabk };
        });

        return norms;
    }

    async function fetchAllLegalData() {
        const allNorms = {};
        let anyFallback = false;

        await Promise.allSettled(
            LAW_CONFIGS.map(async (law) => {
                try {
                    const { xmlText, isMock } = await fetchLawXmlWithFallback(law.code);
                    const norms = parseLawXml(xmlText);
                    allNorms[law.code] = norms;
                    if (isMock && law.code !== 'dsgvo_2018') anyFallback = true;
                } catch (err) {
                    console.warn(`Failed to fetch ${law.code}:`, err);
                    allNorms[law.code] = {};
                }
            })
        );

        return { allNorms, anyFallback };
    }

    /* ============================================================
       HTML BUILDERS
       ============================================================ */
    function escapeHtml(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderNormBody(text) {
        if (!text) return '<em>Kein Text verfügbar / No text available</em>';
        const raw = text.replace(/\s+/g, ' ').trim();
        const parts = raw.split(/(?=\(\d+\)\s)/g).filter(p => p.trim().length > 0);
        if (parts.length >= 2) {
            return parts.map(part => {
                const m = part.match(/^\((\d+)\)\s*(.*)$/s);
                const num = m ? m[1] : '';
                const body = m ? m[2].trim() : part.trim();
                return `<p class="mb-2"><strong>(${escapeHtml(num)})</strong> ${escapeHtml(body)}</p>`;
            }).join('');
        }
        return `<p class="mb-2">${escapeHtml(raw)}</p>`;
    }

    function buildSectionsDataAndHtml(allNorms) {
        const sections = [];
        let html = '';

        LAW_CONFIGS.forEach(law => {
            const lawNorms = allNorms[law.code];
            if (!lawNorms || Object.keys(lawNorms).length === 0) return;

            law.sections.forEach(section => {
                const availableNorms = section.norms.filter(n => lawNorms[n]);
                if (availableNorms.length === 0) return;

                const subtopics = availableNorms.map((normId, idx) => {
                    const norm = lawNorms[normId];
                    return {
                        id: `${section.id}-norm-${idx}`,
                        titleDe: norm.heading,
                        titleEn: norm.heading
                    };
                });
                sections.push({
                    id: section.id,
                    titleDe: section.title.de,
                    titleEn: section.title.en,
                    subtopics: subtopics
                });

                html += `<section id="${escapeHtml(section.id)}" class="scroll-mt-6 searchable-block topic-panel mt-6 dsg-injected">`;
                html += `<h2>
                    <span data-lang-de>${escapeHtml(section.title.de)}</span>
                    <span data-lang-en style="display:none;">${escapeHtml(section.title.en)}</span>
                </h2>`;

                availableNorms.forEach((normId, idx) => {
                    const norm = lawNorms[normId];
                    const subId = `${section.id}-norm-${idx}`;
                    html += `<div class="subtopic-card">
                        <h3 id="${escapeHtml(subId)}" class="scroll-mt-6 text-sm font-semibold">${escapeHtml(norm.heading)}</h3>
                        <div class="text-xs text-[var(--text-muted)] leading-relaxed">
                            ${renderNormBody(norm.text)}
                        </div>
                    </div>`;
                });

                html += `</section>`;
            });
        });

        // --- VVT SECTION (Educational & Full Subtopics) ---
        const vvtId = 'vvt-uebersicht';
        const vvtSubtopics = [
            { id: 'vvt-einfach',  titleDe: '1. VVT einfach erklärt (Das Daten-Tagebuch)', titleEn: '1. ROPA simply explained' },
            { id: 'vvt-wer',      titleDe: '2. Wer muss ein VVT führen?',                 titleEn: '2. Who needs to keep one?' },
            { id: 'vvt-inhalt',   titleDe: '3. Was muss rein? (Die Checkliste)',          titleEn: '3. What goes inside? (Checklist)' },
            { id: 'vvt-it-rolle', titleDe: '4. Was hat die IT damit zu tun?',             titleEn: '4. What is the IT role?' },
            { id: 'vvt-zweck',    titleDe: '5. Kontrolle & Warum das Ganze?',             titleEn: '5. Audits & Why we do it' }
        ];

        sections.push({
            id: vvtId,
            titleDe: 'Verzeichnis der Verarbeitungstätigkeiten',
            titleEn: 'Record of Processing Activities',
            subtopics: vvtSubtopics
        });

        html += `<section id="${vvtId}" class="scroll-mt-6 searchable-block topic-panel mt-6 dsg-injected">`;
        html += `<h2>
            <span data-lang-de>Verzeichnis der Verarbeitungstätigkeiten (VVT)</span>
            <span data-lang-en style="display:none;">Record of Processing Activities (ROPA)</span>
        </h2>`;

        html += `<div class="mb-6 text-sm text-[var(--text-muted)]">
            <p data-lang-de>Das VVT (Art. 30 DSGVO) ist das wichtigste Dokument im Datenschutz. Hier erklären wir es Schritt für Schritt, ganz einfach und verständlich.</p>
            <p data-lang-en style="display:none;">The ROPA (Art. 30 GDPR) is the most important document in data protection. Here we explain it step by step, very simply.</p>
        </div>`;

        // Subtopic 1: Einfach erklärt
        html += `<div class="subtopic-card">
            <h3 id="vvt-einfach" class="scroll-mt-6 text-sm font-semibold flex items-center gap-2">
                <i class="fa-solid fa-book-open text-[var(--link-color)] opacity-80"></i>
                <span data-lang-de>1. VVT einfach erklärt (Das Daten-Tagebuch)</span>
                <span data-lang-en style="display:none;">1. ROPA simply explained (The Data Diary)</span>
            </h3>
            <div class="text-sm text-[var(--text-muted)] leading-relaxed space-y-2 mt-2">
                <p data-lang-de><strong>Stell dir vor:</strong> Das VVT ist wie ein Rezeptbuch oder ein "Tagebuch" für eine Firma. Anstatt aufzuschreiben, was man gekocht hat, schreibt die Firma auf, <strong>was sie mit den Daten anderer Leute macht</strong>.</p>
                <p data-lang-de>Jedes Mal, wenn eine Firma Daten benutzt (z.B. um Gehalt zu überweisen, eine Werbe-E-Mail zu schreiben oder Bewerbungen zu sortieren), ist das ein "Prozess". <strong>Das VVT ist einfach nur eine große Liste all dieser Prozesse.</strong></p>
                <p data-lang-en style="display:none;"><strong>Imagine:</strong> The ROPA is like a recipe book or diary for a company. Instead of writing down what was cooked, the company writes down <strong>what it does with other people's data</strong>.</p>
            </div>
        </div>`;

        // Subtopic 2: Wer braucht das?
        html += `<div class="subtopic-card">
            <h3 id="vvt-wer" class="scroll-mt-6 text-sm font-semibold flex items-center gap-2">
                <i class="fa-solid fa-users text-[var(--link-color)] opacity-80"></i>
                <span data-lang-de>2. Wer muss ein VVT führen?</span>
                <span data-lang-en style="display:none;">2. Who has to keep one?</span>
            </h3>
            <div class="text-sm text-[var(--text-muted)] leading-relaxed space-y-2 mt-2">
                <ul class="list-disc pl-5 space-y-1">
                    <li data-lang-de><strong>Kurz gesagt: Fast jeder!</strong> Jede Organisation und jeder "Auftragsverarbeiter" (jemand, der Daten für andere verarbeitet) muss so ein Dokument haben.</li>
                    <li data-lang-de><strong>Auftragsverarbeiter haben doppelte Arbeit:</strong> Wenn eine IT-Firma z.B. Server für Kunden bereitstellt, muss sie ein VVT für ihre <em>eigenen</em> Daten (z.B. eigene Mitarbeiter) führen <strong>UND</strong> ein zweites VVT für die Daten, die sie für den Kunden verarbeitet.</li>
                    <li data-lang-de><strong>Ausreden zählen nicht:</strong> Es gibt zwar Ausnahmen für sehr kleine Firmen, aber sobald man z.B. regelmäßig Gehälter überweist, ist die Ausnahme hinfällig.</li>
                </ul>
            </div>
        </div>`;

        // Subtopic 3: Was muss rein?
        html += `<div class="subtopic-card">
            <h3 id="vvt-inhalt" class="scroll-mt-6 text-sm font-semibold flex items-center gap-2">
                <i class="fa-solid fa-list-check text-[var(--link-color)] opacity-80"></i>
                <span data-lang-de>3. Was muss rein? (Die Checkliste)</span>
                <span data-lang-en style="display:none;">3. What goes inside? (The Checklist)</span>
            </h3>
            <div class="text-sm text-[var(--text-muted)] leading-relaxed mt-2">
                <p data-lang-de class="mb-2">Das Gesetz (Art. 30 DSGVO) gibt eine feste Checkliste vor. Für jeden Prozess (z.B. "Gehaltsabrechnung") muss folgendes eingetragen werden:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li data-lang-de><strong>Wer ist verantwortlich?</strong> (Name der Firma, Chef, und der Datenschutzbeauftragte).</li>
                    <li data-lang-de><strong>Warum machen wir das? (Zweck):</strong> z.B. "Um das Gehalt der Mitarbeiter pünktlich zu überweisen".</li>
                    <li data-lang-de><strong>Wessen Daten nehmen wir?</strong> z.B. "Mitarbeiter" (Betroffenenkategorie).</li>
                    <li data-lang-de><strong>Welche Daten genau?</strong> z.B. "Name, Adresse, Steuer-ID, Kontonummer" (Datenkategorien).</li>
                    <li data-lang-de><strong>Wer bekommt die Daten noch? (Empfänger):</strong> z.B. "Das Finanzamt" oder "Cloud-Server in den USA". (Besonders wichtig: Daten, die ins Nicht-EU-Ausland gehen!).</li>
                    <li data-lang-de><strong>Wann wird gelöscht? (Löschfrist):</strong> z.B. "Wird 10 Jahre nach Vertragsende gelöscht".</li>
                    <li data-lang-de><strong>Wie schützen wir die Daten? (TOMs):</strong> z.B. "Passwörter, verschlüsselte Festplatten, Alarmanlage im Büro".</li>
                </ul>
            </div>
        </div>`;

        // Subtopic 4: Rolle der IT
        html += `<div class="subtopic-card">
            <h3 id="vvt-it-rolle" class="scroll-mt-6 text-sm font-semibold flex items-center gap-2">
                <i class="fa-solid fa-server text-[var(--link-color)] opacity-80"></i>
                <span data-lang-de>4. Was hat die IT-Abteilung damit zu tun?</span>
                <span data-lang-en style="display:none;">4. What is the IT department's role?</span>
            </h3>
            <div class="text-sm text-[var(--text-muted)] leading-relaxed mt-2">
                <p data-lang-de class="mb-2">Die IT schreibt das VVT meistens nicht selbst (das macht das Management oder der DSB). Aber die IT muss die <strong>Beweise</strong> liefern, dass das, was im VVT steht, auch wirklich stimmt!</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li data-lang-de><strong>Automatische Löschung:</strong> Wenn im VVT steht "wird nach 30 Tagen gelöscht", muss die IT ein Script schreiben, das genau das zuverlässig tut.</li>
                    <li data-lang-de><strong>Protokollierung (Logging):</strong> Die IT muss nachweisen können, wer wann auf welche Daten zugegriffen hat.</li>
                    <li data-lang-de><strong>Cloudspeicherung & Backups:</strong> Die IT muss wissen, auf welchen Servern (und in welchen Ländern) die Daten physisch liegen.</li>
                    <li data-lang-de><strong>Zugriffsrechte:</strong> Die IT stellt sicher, dass z.B. der Azubi nicht die Gehaltsliste im Ordner sehen kann (Berechtigungskonzepte).</li>
                </ul>
            </div>
        </div>`;

        // Subtopic 5: Zweck & Kontrolle
        html += `<div class="subtopic-card">
            <h3 id="vvt-zweck" class="scroll-mt-6 text-sm font-semibold flex items-center gap-2">
                <i class="fa-solid fa-magnifying-glass-chart text-[var(--link-color)] opacity-80"></i>
                <span data-lang-de>5. Kontrolle & Warum das Ganze?</span>
                <span data-lang-en style="display:none;">5. Audits & Why we do it?</span>
            </h3>
            <div class="text-sm text-[var(--text-muted)] leading-relaxed space-y-2 mt-2">
                <p data-lang-de><strong>Der DSB (Datenschutzbeauftragte) kontrolliert</strong> regelmäßig, ob das VVT aktuell ist.</p>
                <p data-lang-de><strong>Rechenschaftspflicht:</strong> Wenn die staatliche Aufsichtsbehörde bei einer Firma anklopft, heißt der erste Satz meistens: <em>"Zeigen Sie uns bitte ihr VVT!"</em>. Wer keines hat, muss sofort mit einem dicken Bußgeld rechnen.</p>
                <p data-lang-de><strong>Die Basis für alles:</strong> Ohne VVT weiß eine Firma gar nicht, welche Daten sie überhaupt hat. Wenn ein Kunde anruft und sagt: "Bitte löschen Sie alle meine Daten!", muss die Firma im VVT nachschauen, wo diese Daten überall versteckt sind.</p>
            </div>
        </div>`;

        html += `</section>`;
        // --- END OF VVT SECTION ---


        // --- NEW TLDR SECTION (CARD GRID LAYOUT) ---
        const tldrId = 'tldr-summary';
        
        sections.push({
            id: tldrId,
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            subtopics: []
        });

        html += `<section id="${tldrId}" class="scroll-mt-6 searchable-block topic-panel mt-6 dsg-injected">`;
        html += `<h2>
            <span data-lang-de>TL;DR: Datenschutz für Systemintegratoren</span>
            <span data-lang-en style="display:none;">TL;DR: Data Protection for System Integrators</span>
        </h2>`;
        
        html += `<div class="mb-6 text-sm text-[var(--text-muted)]">
            <p data-lang-de>Kurz zusammengefasst: Was bedeuten diese ganzen Gesetze ganz konkret für die tägliche Arbeit in der IT-Abteilung? Hier sind die wichtigsten Regeln für die IT-Praxis.</p>
            <p data-lang-en style="display:none;">In a nutshell: What do all these laws mean specifically for daily work in the IT department? Here are the most important practical rules.</p>
        </div>`;

        // Card Grid Container (Tailwind classes for responsive 3-column layout)
        html += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

        // Card 1
        html += `
            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-hard-drive opacity-70"></i>
                    <span data-lang-de>1. Löschen & Minimieren</span>
                    <span data-lang-en style="display:none;">1. Delete & Minimize</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Speichere nur das, was wirklich nötig ist. Wenn ein Server abgeschaltet wird oder ein Mitarbeiter geht: Daten löschen (Crypto-Erase)! <strong>Achtung bei Backups:</strong> Auch hier müssen Löschkonzepte greifen.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Only store what is truly necessary. When a server is shut down or an employee leaves: delete data (Crypto-Erase)! <strong>Careful with backups:</strong> Deletion concepts must apply here too.
                </p>
            </div>`;

        // Card 2
        html += `
            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-shield-halved opacity-70"></i>
                    <span data-lang-de>2. Security (TOMs) ist unser Job</span>
                    <span data-lang-en style="display:none;">2. Security (TOMs) is our job</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Die IT setzt "Vertraulichkeit, Integrität, Verfügbarkeit" (CIA-Triade) praktisch um. Heißt: <strong>Zutritt (Raum), Zugang (Passwort/MFA), Zugriff (NTFS/RBAC)</strong> streng regulieren.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    IT practically implements "Confidentiality, Integrity, Availability" (CIA Triad). Meaning: strictly regulate <strong>Admission (Room), Access (Password/MFA), Authorization (NTFS/RBAC)</strong>.
                </p>
            </div>`;

        // Card 3
        html += `
            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-user-cog opacity-70"></i>
                    <span data-lang-de>3. Admin-Rechte = Verantwortung</span>
                    <span data-lang-en style="display:none;">3. Admin Rights = Responsibility</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Nur weil wir Root/Domain-Admin sind, dürfen wir nicht die E-Mails oder die Surf-Historie der Kollegen mitlesen (Totalüberwachung verboten). <strong>Least Privilege</strong> Prinzip anwenden.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Just because we are root/domain admins doesn't mean we can read colleagues' emails or browsing history (total surveillance is forbidden). Apply the <strong>Least Privilege</strong> principle.
                </p>
            </div>`;

        // Card 4
        html += `
            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-server opacity-70"></i>
                    <span data-lang-de>4. IT für Betroffenenrechte</span>
                    <span data-lang-en style="display:none;">4. IT for Data Subject Rights</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Wenn ein User Auskunft will oder gelöscht werden möchte, muss die IT das technisch umsetzen. Wir müssen wissen, in welchen DBs, AD-Feldern oder Archiven diese Daten liegen.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    If a user wants information or to be deleted, IT must implement this technically. We need to know in which DBs, AD fields, or archives this data is located.
                </p>
            </div>`;

        // Card 5
        html += `
            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-cloud-arrow-up opacity-70"></i>
                    <span data-lang-de>5. Erst fragen, dann deployen</span>
                    <span data-lang-en style="display:none;">5. Ask first, then deploy</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Neue Software ausrollen? Neues SaaS-Tool anbinden? Vorher klären, ob es einen <strong>AV-Vertrag</strong> gibt. Architektur sicher designen (<strong>Privacy by Design/Default</strong>).
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Rolling out new software? Connecting a new SaaS tool? Clarify beforehand if there is a <strong>DPA (AV-Vertrag)</strong>. Design the architecture securely (<strong>Privacy by Design/Default</strong>).
                </p>
            </div>`;

        // Card 6
        html += `
            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-triangle-exclamation opacity-70"></i>
                    <span data-lang-de>6. Pannen sofort melden</span>
                    <span data-lang-en style="display:none;">6. Report incidents immediately</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    USB-Stick verloren? Ransomware hat den Server verschlüsselt? Sofort den DSB informieren! Es gilt eine <strong>72-Stunden Meldepflicht</strong> an die Behörde (LfDI).
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Lost a USB drive? Ransomware encrypted the server? Inform the DPO immediately! There is a <strong>72-hour reporting obligation</strong> to the authority.
                </p>
            </div>`;

        html += `</div></section>`;
        // --- END OF TLDR SECTION ---

        return { sections, html };
    }

    /* ============================================================
       MODULE-SCOPED CACHE
       - Lives for the lifetime of the page load.
       - Cleared automatically when the page is reloaded.
       - Deduplicates concurrent fetches via inFlightFetch.
       ============================================================ */
    let cachedPayload = null;   // { sections, html, anyFallback, fetchedAt }
    let inFlightFetch = null;   // Promise, set while a fetch is running

    async function ensureLegalData() {
        if (cachedPayload) return cachedPayload;
        if (inFlightFetch) return inFlightFetch;

        inFlightFetch = (async () => {
            const { allNorms, anyFallback } = await fetchAllLegalData();
            const { sections, html } = buildSectionsDataAndHtml(allNorms);
            const payload = { sections, html, anyFallback, fetchedAt: Date.now() };
            cachedPayload = payload;
            inFlightFetch = null;
            return payload;
        })();

        return inFlightFetch;
    }

    /* ============================================================
       DOM INJECTION (shared between cold and warm paths)
       ============================================================ */
    function injectIntoSections(rootEl, illustrationSection, payload) {
        // Remove any previously injected sections just in case
        rootEl.querySelectorAll('.dsg-injected').forEach(el => el.remove());

        if (payload.html) {
            const container = document.createElement('div');
            container.innerHTML = payload.html;
            while (container.firstChild) {
                illustrationSection.parentNode.insertBefore(container.firstChild, illustrationSection);
            }
        }

        if (typeof renderTOC === 'function') {
            const tocTopic = Object.assign({}, topicDef, { sections: payload.sections });
            try { renderTOC(tocTopic); }
            catch (e) { console.warn('TOC rebuild failed:', e); }
        }
        if (typeof applyLangToDOM === 'function') applyLangToDOM();
        if (typeof observeSections === 'function') observeSections();
    }

    /* ============================================================
       LOADING PANEL HELPER
       ============================================================ */
    function createLoadingPanel() {
        const panel = document.createElement('div');
        panel.id = 'dsg-loading-panel';
        panel.className = 'searchable-block topic-panel mt-6';
        panel.innerHTML = `
            <style>
                #dsg-loading-panel .dsg-spinner {
                    display: inline-block; width: 14px; height: 14px;
                    border: 2px solid var(--border-color);
                    border-top-color: var(--link-color);
                    border-radius: 50%;
                    animation: dsg-spin 0.7s linear infinite;
                    vertical-align: middle;
                }
                @keyframes dsg-spin { to { transform: rotate(360deg); } }
            </style>
            <h2>
                <span data-lang-de>Rechtsdaten werden geladen…</span>
                <span data-lang-en style="display:none;">Loading legal data…</span>
            </h2>
            <div class="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span class="dsg-spinner"></span>
                <span data-lang-de>Aktuelle DSGVO, BDSG, TTDSG und TKG Daten werden aus öffentlichen Quellen abgerufen..</span>
                <span data-lang-en style="display:none;">Fetching current GDPR, BDSG, TTDSG and TKG data from public sources…</span>
            </div>
        `;
        return panel;
    }

    /* ============================================================
       TOPIC DEFINITION
       ============================================================ */
    const topicDef = {
        id: 'datenschutz',

        // ── SUB-CATEGORY (OPTIONAL) ─────────────────────────────────
        // Set `parentId` to the `id` of another registered topic to nest
        // this topic as a child inside that parent's dashboard card.
        // Leave undefined (or remove) to keep this topic at top level.
        //
        // Examples:
        //   parentId: 'recht',        // → nested under a "Recht" parent topic
        //   parentId: 'viona',        // → nested under a "Viona" parent topic
        //   parentId: 'it-security',  // → nested under an "IT-Security" parent topic
        // parentId: 'recht',
        // ────────────────────────────────────────────────────────────

        icon: 'fa-shield-halved',
        titleDe: 'Datenschutz',
        titleEn: 'Data Protection',
        descDe: 'Rechtsdatenbank für DSGVO, BDSG, TTDSG & TKG',
        descEn: 'Legal database: GDPR, BDSG, TTDSG & TKG',

        sidebarTitleDe: 'Datenschutz',
        sidebarTitleEn: 'Date Protection',
        sidebarSubtitleDe: 'Live-Rechtsdaten',
        sidebarSubtitleEn: 'Live legal data',
        sidebarVersion: 'v3.0 — Live-Fetch (cached)',

        hero: {
            titleDe: 'Datenschutz-Wissen (Live)',
            titleEn: 'Data Protection Knowledge (Live)',
            introDe: 'Diese Seite lädt beim ersten Öffnen aktuelle Rechtsdaten (DSGVO, BDSG, TTDSG, TKG) direkt aus <a href="https://www.gesetze-im-internet.de/" target="_blank" class="text-[var(--link-color)] hover:text-[var(--link-hover)] underline">gesetze-im-internet.de</a> und hält sie für die Dauer dieser Sitzung im Cache. Beim erneuten Öffnen des Themas werden die Daten sofort aus dem Cache geladen. Bei Netzwerkproblemen wird automatisch auf lokale Backup-Daten zurückgegriffen.',
            introEn: 'This page loads current legal data (GDPR, BDSG, TTDSG, TKG) from <a href="https://www.gesetze-im-internet.de/" target="_blank" class="text-[var(--link-color)] hover:text-[var(--link-hover)] underline">gesetze-im-internet.de</a> on first open and keeps it cached for the duration of this session. Reopening the topic loads the cached data instantly. If the network fails, embedded backup data is used automatically.'
        },

        quickLinks: [
            { icon: 'fa-list-check',      href: '#dsgvo-grundlagen',   switchToDoc: true, labelDe: 'DSGVO Grundsätze',    labelEn: 'GDPR Principles' },
            { icon: 'fa-user-shield',     href: '#dsgvo-rechte',       switchToDoc: true, labelDe: 'Betroffenenrechte',   labelEn: 'Subject Rights' },
            { icon: 'fa-clipboard-check', href: '#dsgvo-pflichten',    switchToDoc: true, labelDe: 'TOMs & Pflichten',    labelEn: 'TOMs & Duties' },
            { icon: 'fa-book',            href: '#vvt-uebersicht',     switchToDoc: true, labelDe: 'VVT (Verzeichnis)',   labelEn: 'ROPA (Records)' },
            { icon: 'fa-users',           href: '#bdsg-beschaeftigte', switchToDoc: true, labelDe: 'Beschäftigtenschutz', labelEn: 'Employee Privacy' }
        ],

        // Left empty on purpose — filled dynamically in onRender
        sections: [],

        illustrations: {
            titleDe: 'Illustration — Der Weg des Datenschutzes',
            titleEn: 'Illustration — The Path of Data Protection',
            introDe: 'Beispielhafter Verlauf: Wer macht die Regeln, wer muss sie befolgen, wer prüft und wer bestraft? Sechs Stationen in Endlosschleife.',
            introEn: 'A sample flow: who makes the rules, who must comply, who inspects, and who fines? Six stations on repeat.',
            animations: [
                {
                    id: 'illustration-dsg-flow',
                    type: 'custom',
                    titleDe: 'Der Datenfluss in 6 Schritten',
                    titleEn: 'The Data Flow in 6 Steps',
                    descDe: 'Von der EU-Gesetzgebung bis zum Bußgeld — die komplette Kette in einer Endlosschleife.',
                    descEn: 'From EU legislation to fines — the complete chain in one continuous loop.',
                    html: `
                        <style>
                            .viz-shell { position: relative; width: 100%; height: 50vh; min-height: 400px; background: var(--bg-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; margin-top: 0.75rem; }
                            .canvas-wrap { position: absolute; inset: 0; background: var(--bg-color); }
                            .canvas-wrap canvas { display: block; width: 100%; height: 100%; }
                            .title-tag { position: absolute; top: .8rem; left: 50%; transform: translateX(-50%); padding: .45rem .9rem .5rem .9rem; background: var(--panel-color); opacity: 0.95; border: 1px solid var(--border-color); border-radius: .6rem; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 25; pointer-events: none; text-align: center; box-shadow: var(--card-shadow); white-space: nowrap; }
                            .title-tag .t1 { display: block; font-size: .8rem; font-weight: 800; color: var(--heading-color); line-height: 1.2; }
                            .title-tag .t2 { display: block; font-size: .55rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: var(--text-muted); margin-top: .2rem; }
                            .loading-bar-container { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: var(--border-color); z-index: 40; overflow: hidden; }
                            .loading-bar-fill { height: 100%; width: 0%; background: var(--link-color); transition: width 0.1s linear; }
                            @media (max-width: 600px) {
                                .title-tag { top: .6rem; padding: .4rem .7rem .45rem .7rem; }
                                .title-tag .t1 { font-size: .7rem; }
                                .title-tag .t2 { font-size: .48rem; }
                            }
                        </style>
                        <div class="viz-shell">
                            <div class="canvas-wrap" id="dsgCanvasWrapper">
                                <canvas id="dsgCanvas"></canvas>
                                <div class="title-tag">
                                    <span data-lang-de class="block">
                                        <span class="t1">Der Weg des Datenschutzes</span>
                                        <span class="t2">In 6 einfachen Schritten</span>
                                    </span>
                                    <span data-lang-en style="display:none;" class="block">
                                        <span class="t1">The Path of Data Protection</span>
                                        <span class="t2">In 6 simple steps</span>
                                    </span>
                                </div>
                            </div>
                            <div class="loading-bar-container">
                                <div class="loading-bar-fill" id="dsgLoadingBar"></div>
                            </div>
                        </div>
                    `
                }
            ]
        },

        links: {
            titleDe: 'Links & Quellen',
            titleEn: 'Links & Sources',
            items: [
                { icon: 'fa-scale-balanced', href: 'https://dsgvo-gesetz.de/',                       target: '_blank', labelDe: 'DSGVO Gesetzestext',           labelEn: 'GDPR Full Text' },
                { icon: 'fa-gavel',          href: 'https://www.gesetze-im-internet.de/bdsg_2018/',  target: '_blank', labelDe: 'BDSG Gesetzestext',            labelEn: 'BDSG Full Text' },
                { icon: 'fa-shield-halved',  href: 'https://www.bsi.bund.de/',                       target: '_blank', labelDe: 'BSI (Bundesamt für Sicherheit)', labelEn: 'BSI (Federal Cyber Authority)' },
                { icon: 'fa-user-tie',       href: 'https://www.bfdi.bund.de/',                      target: '_blank', labelDe: 'BfDI (Datenschutz-Behörde)',     labelEn: 'BfDI (DPA)' }
            ]
        },

        footer: {
            textDe: 'Datenschutz HowTo 2026/2027 · Live-Rechtsdaten (IHK FiSi Prüfungsvorbereitung)',
            textEn: 'Data Protection HowTo 2026/2027 · Live legal data (IHK FiSi Exam Prep)'
        },

        /* ============================================================
           LIFECYCLE HOOKS
           ============================================================ */
        onRender: async function (rootEl) {
            // 1. Always (re)start the animation for this fresh DOM
            startAnimation(rootEl);

            const illustrationSection = rootEl.querySelector('#section-illustrations');
            if (!illustrationSection || !illustrationSection.parentNode) return;

            // ---- FAST PATH: cached data available, inject immediately ----
            if (cachedPayload) {
                injectIntoSections(rootEl, illustrationSection, cachedPayload);
                return;
            }

            // ---- SLOW PATH: no cache yet, fetch and cache ----
            const loadingPanel = createLoadingPanel();
            illustrationSection.parentNode.insertBefore(loadingPanel, illustrationSection);

            let payload;
            try {
                payload = await ensureLegalData();
            } catch (err) {
                console.warn('Failed to load legal data:', err);
                if (loadingPanel.isConnected) {
                    loadingPanel.innerHTML = `
                        <h2>
                            <span data-lang-de>Fehler beim Laden</span>
                            <span data-lang-en style="display:none;">Loading error</span>
                        </h2>
                        <p class="text-xs text-[var(--text-muted)]">
                            <span data-lang-de>Die Rechtsdaten konnten nicht geladen werden. Bitte später erneut versuchen.</span>
                            <span data-lang-en style="display:none;">Could not load the legal data. Please try again later.</span>
                        </p>
                    `;
                }
                return;
            }

            // If the user already navigated away, don't inject. Cache still holds the payload.
            if (!rootEl.isConnected) return;

            loadingPanel.remove();
            injectIntoSections(rootEl, illustrationSection, payload);
        },

        onUnrender: function () {
            stopAnimation();
            // Note: cachedPayload and inFlightFetch deliberately survive.
            // The next time this topic is opened, the cached data is injected instantly.
            // If a fetch is still in flight, it will complete and populate the cache,
            // and its onRender callback will bail out because rootEl.isConnected will be false.
        }
    };

    registerTopic(topicDef);
})();