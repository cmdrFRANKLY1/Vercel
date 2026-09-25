// resources/topics/topic_steammachine.js
// Registers the Steam Machine reference topic. Loaded via <script> injection.

/* ==================================================================
   STEAM MACHINE CODE-BLOCK COPY CONTROLLER
   ================================================================== */
(function () {
    'use strict';

    function deepQueryAll(root, selector, out) {
        out = out || [];
        try {
            root.querySelectorAll(selector).forEach(function (el) { out.push(el); });
            var all = root.querySelectorAll('*');
            for (var i = 0; i < all.length; i++) {
                if (all[i].shadowRoot) deepQueryAll(all[i].shadowRoot, selector, out);
            }
        } catch (_) {}
        return out;
    }
    function allDocuments() {
        var docs = [document];
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            try {
                if (iframes[i].contentDocument) docs.push(iframes[i].contentDocument);
            } catch (_) {}
        }
        return docs;
    }

    function flashButton(btn, ok) {
        var original = btn.getAttribute('data-label') || 'Copy';
        btn.textContent = ok ? '✓ Copied!' : '⚠ Failed';
        btn.classList.add(ok ? 'is-copied' : 'is-failed');
        setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove('is-copied', 'is-failed');
        }, 1500);
    }

    function attachCopyButton(block) {
        if (!block || block.__jfWired) return;
        block.__jfWired = true;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'jf-copy-btn';
        btn.setAttribute('data-label', 'Copy');
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        block.appendChild(btn);

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var target = block.querySelector('pre, code, .jf-code-inner');
            var text = target ? (target.innerText || target.textContent || '') : '';
            text = text.replace(/\s+$/, '');

            var done = function (ok) { flashButton(btn, ok); };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(function () { done(true); })
                    .catch(function () { fallbackCopy(text, done); });
            } else {
                fallbackCopy(text, done);
            }
        });
    }

    function fallbackCopy(text, done) {
        try {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, 99999);
            var ok = document.execCommand('copy');
            document.body.removeChild(ta);
            done(ok);
        } catch (_) {
            done(false);
        }
    }

    function scan() {
        allDocuments().forEach(function (doc) {
            try {
                deepQueryAll(doc, '.jf-code').forEach(attachCopyButton);
            } catch (_) {}
        });
    }

    function start() {
        scan();
        setInterval(scan, 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();


/* ==================================================================
   TOPIC REGISTRATION
   ================================================================== */
registerTopic({
    parentId: 'Hardware',
    id: 'Steam Machine Overview',
    icon: 'fa-cube',
    titleDe: 'Steam Machine',
    titleEn: 'Steam Machine',
    descDe: 'Valves Wohnzimmer-PC & SteamOS-Konsole',
    descEn: 'Valve\'s Living Room PC & SteamOS Console',

    sidebarTitleDe: 'Steam Machine',
    sidebarTitleEn: 'Steam Machine',
    sidebarSubtitleDe: '2026 Edition',
    sidebarSubtitleEn: '2026 Edition',
    sidebarVersion: 'SteamOS 3.8+',

    hero: {
        titleDe: 'Steam Machine: Valves Wohnzimmer-PC',
        titleEn: 'Steam Machine: Valve\'s Living Room PC',
        introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> ist Valves <strong>kompakter Gaming-PC für das Wohnzimmer</strong>, der SteamOS und die Steam-Bibliothek direkt auf den Fernseher bringt. Angetrieben von einer <strong>semi-custom AMD Zen 4 CPU</strong> und einer <strong>RDNA 3 GPU mit 28 CUs</strong> bietet sie sechsmal die Leistung des Steam Deck – richtet sich aber eher an 1080p- und 1440p-Gaming als an natives 4K. Der Preis von <strong>1.049 $ für die 512-GB-Version</strong> fiel deutlich höher aus als erhofft, Grund dafür ist die aktuelle RAM- und Speicherkrise. Dieser Guide deckt alles ab: Hardware, Kompatibilität, Decky Loader, Performance-Tweaks und die besten Alternativen .',
        introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> is Valve\'s <strong>compact gaming PC for the living room</strong>, bringing SteamOS and the Steam library directly to your TV. Powered by a <strong>semi-custom AMD Zen 4 CPU</strong> and an <strong>RDNA 3 GPU with 28 CUs</strong>, it delivers six times the Steam Deck\'s performance – but targets 1080p and 1440p gaming rather than native 4K. The <strong>$1,049 price for the 512 GB model</strong> came in far higher than hoped, due to the ongoing RAM and storage crisis. This guide covers everything: hardware, compatibility, Decky Loader, performance tweaks, and the best alternatives .'
    },

    quickLinks: [
        { icon: 'fa-microchip',         href: '#section1', switchToDoc: true, labelDe: 'Hardware',        labelEn: 'Hardware' },
        { icon: 'fa-tag',               href: '#section2', switchToDoc: true, labelDe: 'Modelle & Preis', labelEn: 'Models & Price' },
        { icon: 'fa-gamepad',           href: '#section3', switchToDoc: true, labelDe: 'Kompatibilität',  labelEn: 'Compatibility' },
        { icon: 'fa-puzzle-piece',      href: '#section4', switchToDoc: true, labelDe: 'Decky Loader',    labelEn: 'Decky Loader' },
        { icon: 'fa-tachometer-alt',    href: '#section5', switchToDoc: true, labelDe: 'Tweaks',          labelEn: 'Tweaks' },
        { icon: 'fa-balance-scale',     href: '#section6', switchToDoc: true, labelDe: 'Alternativen',    labelEn: 'Alternatives' },
        { icon: 'fa-external-link-alt', href: 'https://store.steampowered.com/steamdeck', target: '_blank', labelDe: 'Steam Store', labelEn: 'Steam Store' }
    ],

    sections: [
        /* ============ 1. HARDWARE ============ */
        {
            id: 'section1',
            titleDe: '1. Hardware & Architektur',
            titleEn: '1. Hardware & Architecture',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> ist ein <strong>6-Zoll-Würfel mit semi-custom AMD-Hardware</strong>, der auf <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a> läuft. Die CPU basiert auf <strong>Zen 4 mit 6 Kernen und 12 Threads</strong> (bis 4,8 GHz Boost), die GPU auf <strong>RDNA 3 mit 28 Compute Units</strong> (bis 2,45 GHz). Anders als der Steam Deck hat die Machine <strong>16 GB DDR5 RAM und 8 GB GDDR6 VRAM</strong> – allerdings nur <strong>einen einzelnen RAM-Riegel</strong>, was die Performance im Single-Channel-Modus um bis zu 20 % drückt .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> is a <strong>6-inch cube with semi-custom AMD hardware</strong> running <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a>. The CPU is based on <strong>Zen 4 with 6 cores and 12 threads</strong> (up to 4.8 GHz boost), the GPU on <strong>RDNA 3 with 28 Compute Units</strong> (up to 2.45 GHz). Unlike the Steam Deck, the Machine has <strong>16 GB DDR5 RAM and 8 GB GDDR6 VRAM</strong> – but only <strong>a single RAM stick</strong>, which drops performance in single-channel mode by up to 20% .',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Technische Spezifikationen',
                    titleEn: 'Technical Specifications',
                    htmlDe: `
                    <style>
                        .jf-code {
                            position: relative;
                            background: #06080b;
                            border: 1px solid var(--border-color);
                            border-radius: 0.45rem;
                            margin: 0.55rem 0;
                            overflow: hidden;
                            box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.35);
                        }
                        .jf-code-inner {
                            display: block;
                            padding: 0.85rem 1rem;
                            font-family: 'Courier New', Menlo, Consolas, monospace;
                            font-size: 0.72rem;
                            line-height: 1.55;
                            color: var(--text-color);
                            white-space: pre;
                            overflow-x: auto;
                            margin: 0;
                            tab-size: 4;
                            background: transparent;
                        }
                        .jf-copy-btn {
                            position: absolute;
                            top: 0.5rem;
                            right: 0.5rem;
                            padding: 0.35rem 0.7rem;
                            font-size: 0.62rem;
                            font-weight: 800;
                            letter-spacing: 0.03em;
                            border-radius: 0.35rem;
                            border: 1px solid var(--border-color);
                            background: var(--panel-color);
                            color: var(--text-color);
                            cursor: pointer;
                            opacity: 0;
                            transform: translateY(-4px);
                            transition: opacity 0.2s ease, transform 0.2s ease, background 0.15s ease, border-color 0.15s ease;
                            z-index: 2;
                            user-select: none;
                            font-family: inherit;
                        }
                        .jf-code:hover .jf-copy-btn,
                        .jf-copy-btn:focus {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        .jf-copy-btn:hover {
                            background: color-mix(in srgb, var(--link-color) 15%, var(--panel-color));
                            border-color: var(--link-color);
                        }
                        .jf-copy-btn.is-copied {
                            background: #10b981;
                            border-color: #10b981;
                            color: #fff;
                        }
                        .jf-copy-btn.is-failed {
                            background: #ef4444;
                            border-color: #ef4444;
                            color: #fff;
                        }
                        .wikitable a[href^="http"],
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"] {
                            color: var(--link-color);
                            text-decoration: underline;
                            text-decoration-thickness: 2px;
                            text-underline-offset: 2px;
                            font-weight: 600;
                            transition: color 0.15s ease, background 0.15s ease, text-decoration-color 0.15s ease;
                            border-radius: 0.2rem;
                            padding: 0.05rem 0.15rem;
                        }
                        .wikitable a[href^="http"]:hover,
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"]:hover {
                            color: var(--link-hover-color, var(--link-color));
                            background: color-mix(in srgb, var(--link-color) 18%, transparent);
                            text-decoration-thickness: 3px;
                        }
                        .wikitable a[href^="http"]:visited,
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"]:visited {
                            color: var(--link-color);
                            opacity: 0.85;
                        }
                        a[target="_blank"].topic-link::after,
                        .wikitable a[target="_blank"]::after {
                            content: "\\2197";
                            display: inline-block;
                            margin-left: 0.2em;
                            font-size: 0.75em;
                            opacity: 0.75;
                            transition: transform 0.15s ease, opacity 0.15s ease;
                        }
                        a[target="_blank"].topic-link:hover::after,
                        .wikitable a[target="_blank"]:hover::after {
                            transform: translate(1px, -1px);
                            opacity: 1;
                        }
                        code a,
                        .jf-code-inner a {
                            font-family: inherit;
                            color: var(--link-color);
                            text-decoration: underline;
                            text-underline-offset: 2px;
                            font-weight: 600;
                        }
                        a[href^="#"] {
                            text-decoration: none;
                            background: none;
                            padding: 0;
                        }
                        @media (max-width: 560px) {
                            .jf-code-inner { font-size: 0.66rem; padding: 0.7rem 0.8rem; }
                            .jf-copy-btn { opacity: 1; transform: translateY(0); }
                        }
                    </style>

                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Komponente</th><th>Spezifikation</th></tr>
                    <tr><td><strong>CPU</strong></td><td class="text-[var(--text-muted)]">Semi-custom <a href="https://en.wikipedia.org/wiki/Zen_4" target="_blank" class="topic-link">AMD Zen 4</a>, 6 Kerne / 12 Threads, bis 4,8 GHz, 30 W TDP</td></tr>
                    <tr><td><strong>GPU</strong></td><td class="text-[var(--text-muted)]">Semi-custom <a href="https://en.wikipedia.org/wiki/RDNA_3" target="_blank" class="topic-link">AMD RDNA 3</a>, 28 CUs, bis 2,45 GHz, 110 W TDP</td></tr>
                    <tr><td><strong>RAM</strong></td><td class="text-[var(--text-muted)]">16 GB <a href="https://en.wikipedia.org/wiki/DDR5_SDRAM" target="_blank" class="topic-link">DDR5</a>-5600 SO-DIMM (<strong>Single-Channel</strong>) + 8 GB <a href="https://en.wikipedia.org/wiki/GDDR6_SDRAM" target="_blank" class="topic-link">GDDR6</a> VRAM</td></tr>
                    <tr><td><strong>Speicher</strong></td><td class="text-[var(--text-muted)]">512 GB oder 2 TB <a href="https://en.wikipedia.org/wiki/M.2" target="_blank" class="topic-link">NVMe SSD</a>, microSD-Kartensteckplatz</td></tr>
                    <tr><td><strong>Abmessungen</strong></td><td class="text-[var(--text-muted)]">152 mm hoch (148 mm ohne Füße) × 162,4 mm tief × 156 mm breit</td></tr>
                    <tr><td><strong>Gewicht</strong></td><td class="text-[var(--text-muted)]">~2,6 kg</td></tr>
                    <tr><td><strong>Betriebssystem</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a> (Arch Linux + KDE Plasma)</td></tr>
                    <tr><td><strong>Konnektivität</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Bluetooth#Bluetooth_5.3" target="_blank" class="topic-link">Bluetooth 5.3</a>, Wi-Fi (Dual-Band), HDMI 2.0, DisplayPort 1.4, USB-C</td></tr>
                    <tr><td><strong>Besonderheit</strong></td><td class="text-[var(--text-muted)]">Individuell austauschbare Frontplatten (Red Fabric, Walnut Wood bei 2-TB-Modellen)</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Component</th><th>Specification</th></tr>
                    <tr><td><strong>CPU</strong></td><td class="text-[var(--text-muted)]">Semi-custom <a href="https://en.wikipedia.org/wiki/Zen_4" target="_blank" class="topic-link">AMD Zen 4</a>, 6 cores / 12 threads, up to 4.8 GHz, 30W TDP</td></tr>
                    <tr><td><strong>GPU</strong></td><td class="text-[var(--text-muted)]">Semi-custom <a href="https://en.wikipedia.org/wiki/RDNA_3" target="_blank" class="topic-link">AMD RDNA 3</a>, 28 CUs, up to 2.45 GHz, 110W TDP</td></tr>
                    <tr><td><strong>RAM</strong></td><td class="text-[var(--text-muted)]">16 GB <a href="https://en.wikipedia.org/wiki/DDR5_SDRAM" target="_blank" class="topic-link">DDR5</a>-5600 SO-DIMM (<strong>single-channel</strong>) + 8 GB <a href="https://en.wikipedia.org/wiki/GDDR6_SDRAM" target="_blank" class="topic-link">GDDR6</a> VRAM</td></tr>
                    <tr><td><strong>Storage</strong></td><td class="text-[var(--text-muted)]">512 GB or 2 TB <a href="https://en.wikipedia.org/wiki/M.2" target="_blank" class="topic-link">NVMe SSD</a>, microSD card slot</td></tr>
                    <tr><td><strong>Dimensions</strong></td><td class="text-[var(--text-muted)]">152 mm tall (148 mm without feet) × 162.4 mm deep × 156 mm wide</td></tr>
                    <tr><td><strong>Weight</strong></td><td class="text-[var(--text-muted)]">~2.6 kg</td></tr>
                    <tr><td><strong>Operating System</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a> (Arch Linux + KDE Plasma)</td></tr>
                    <tr><td><strong>Connectivity</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Bluetooth#Bluetooth_5.3" target="_blank" class="topic-link">Bluetooth 5.3</a>, Wi-Fi (dual-band), HDMI 2.0, DisplayPort 1.4, USB-C</td></tr>
                    <tr><td><strong>Specialty</strong></td><td class="text-[var(--text-muted)]">Interchangeable front plates (red fabric, walnut wood on 2 TB models)</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Single-Channel RAM: Der Performance-Killer',
                    titleEn: 'Single-Channel RAM: The Performance Killer',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve liefert die Steam Machine mit nur einem 16-GB-Riegel aus.</strong> Das bedeutet <a href="https://en.wikipedia.org/wiki/Multi-channel_memory_architecture" target="_blank" class="topic-link">Single-Channel-Betrieb</a> – und das kostet Leistung.</p>
                    <p class="mb-2 mt-3"><strong>Gamers Nexus hat getestet, was eine zweite RAM-Stick bringt:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Getestete Spiele (Single vs. Dual Channel)
Baldur's Gate 3:     60,2 → 69,4 FPS  (+15%)
Resident Evil 4:    118,1 → 129,9 FPS (+10%)
The Outer Worlds 2:   ~55 →   ~63 FPS (+14%)
Starfield:            ~70 →   ~72 FPS  (+3%)
Black Myth: Wukong:  keine messbare Differenz
Final Fantasy XIV:   keine messbare Differenz</pre>
                    </div>
                    <p class="mt-3"><strong>Fazit:</strong> Wer das Maximum aus der Steam Machine holen will, sollte eine zweite 16-GB-DDR5-5600-SO-DIMM nachrüsten. Das bringt je nach Spiel 3–15 % mehr FPS – und in CPU-lastigen Szenarien bis zu 20 %.</p>
                    <p class="mt-2">Valve behauptet, die Unterschiede seien vernachlässigbar – die Benchmarks sagen etwas anderes .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve ships the Steam Machine with only a single 16 GB stick.</strong> This means <a href="https://en.wikipedia.org/wiki/Multi-channel_memory_architecture" target="_blank" class="topic-link">single-channel operation</a> – and that costs performance.</p>
                    <p class="mb-2 mt-3"><strong>Gamers Nexus tested what a second RAM stick actually delivers:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Tested games (single vs. dual channel)
Baldur's Gate 3:     60.2 → 69.4 FPS  (+15%)
Resident Evil 4:    118.1 → 129.9 FPS (+10%)
The Outer Worlds 2:   ~55 →   ~63 FPS (+14%)
Starfield:            ~70 →   ~72 FPS  (+3%)
Black Myth: Wukong:  no measurable difference
Final Fantasy XIV:   no measurable difference</pre>
                    </div>
                    <p class="mt-3"><strong>Verdict:</strong> To get the most out of the Steam Machine, add a second 16 GB DDR5-5600 SO-DIMM. This brings 3–15% more FPS depending on the game – and up to 20% in CPU-heavy scenarios.</p>
                    <p class="mt-2">Valve claims the differences are negligible – the benchmarks say otherwise .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. MODELLE & PREIS ============ */
        {
            id: 'section2',
            titleDe: '2. Modelle & Preis',
            titleEn: '2. Models & Price',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> ist in <strong>vier Varianten</strong> erhältlich – mit oder ohne <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a>. Die Preise fielen deutlich höher aus als erhofft, Grund dafür ist die <strong>RAM- und Speicherkrise</strong>, die die Komponentenkosten in die Höhe getrieben hat .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> is available in <strong>four variants</strong> – with or without the <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a>. Prices came in far higher than hoped due to the <strong>RAM and storage crisis</strong>, which drove component costs up .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Varianten & Preise',
                    titleEn: 'Variants & Prices',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Modell</th><th class="w-1/4">Preis (USD)</th><th class="w-1/4">Preis (EUR)</th><th>Besonderheit</th></tr>
                    <tr><td><strong>512 GB</strong></td><td class="text-[var(--text-muted)]">$1.049</td><td class="text-[var(--text-muted)]">€1.039</td><td class="text-[var(--text-muted)]">Basis-Modell, schwarz</td></tr>
                    <tr><td><strong>512 GB + Controller</strong></td><td class="text-[var(--text-muted)]">$1.128</td><td class="text-[var(--text-muted)]">€1.108</td><td class="text-[var(--text-muted)]">Bundle mit Steam Controller</td></tr>
                    <tr><td><strong>2 TB</strong></td><td class="text-[var(--text-muted)]">$1.349</td><td class="text-[var(--text-muted)]">€1.359</td><td class="text-[var(--text-muted)]">Zwei zusätzliche Frontplatten (Red Fabric, Walnut)</td></tr>
                    <tr><td><strong>2 TB + Controller</strong></td><td class="text-[var(--text-muted)]">$1.428</td><td class="text-[var(--text-muted)]">€1.428</td><td class="text-[var(--text-muted)]">Bundle mit Controller + Frontplatten</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Preise inkl. MwSt. (wo zutreffend). Der Verkauf läuft über ein <strong>Reservierungssystem</strong> mit Randomisierung, um Reseller zu bekämpfen. Bestellungen werden nach und nach abgearbeitet .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Model</th><th class="w-1/4">Price (USD)</th><th class="w-1/4">Price (EUR)</th><th>Specialty</th></tr>
                    <tr><td><strong>512 GB</strong></td><td class="text-[var(--text-muted)]">$1,049</td><td class="text-[var(--text-muted)]">€1,039</td><td class="text-[var(--text-muted)]">Base model, black</td></tr>
                    <tr><td><strong>512 GB + Controller</strong></td><td class="text-[var(--text-muted)]">$1,128</td><td class="text-[var(--text-muted)]">€1,108</td><td class="text-[var(--text-muted)]">Bundle with Steam Controller</td></tr>
                    <tr><td><strong>2 TB</strong></td><td class="text-[var(--text-muted)]">$1,349</td><td class="text-[var(--text-muted)]">€1,359</td><td class="text-[var(--text-muted)]">Two extra front plates (red fabric, walnut)</td></tr>
                    <tr><td><strong>2 TB + Controller</strong></td><td class="text-[var(--text-muted)]">$1,428</td><td class="text-[var(--text-muted)]">€1,428</td><td class="text-[var(--text-muted)]">Bundle with controller + front plates</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Prices include VAT where applicable. Sales run through a <strong>reservation system</strong> with randomization to combat resellers. Orders are fulfilled gradually .</p>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Warum ist sie so teuer?',
                    titleEn: 'Why Is It So Expensive?',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve erklärt die Preisgestaltung:</strong></p>
                    <p class="mb-2">„Unsere ursprüngliche Zielsetzung für den Preis der Steam Machine ist nicht mehr tragfähig. Die Preise spiegeln den Zustand der Welt für die Fertigung wider; genauer gesagt, den Preis der Komponenten, die wir in den letzten 6 Monaten gesichert haben.“</p>
                    <p class="mb-2 mt-3"><strong>Die Hauptgründe:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>RAM-Krise:</strong> DDR5-Preise sind durch die <a href="https://en.wikipedia.org/wiki/AI_accelerator" target="_blank" class="topic-link">KI-Datacenter-Nachfrage</a> explodiert.</li>
                    <li><strong>Speicherknappheit:</strong> NVMe-SSDs sind ebenfalls teurer geworden.</li>
                    <li><strong>Verfügbarkeit:</strong> Zeitweise konnten bestimmte Komponenten gar nicht beschafft werden.</li>
                    <li><strong>Konsequenz:</strong> Die Produktionsmenge zum Launch ist stark begrenzt.</li>
                    </ul>
                    <p class="mt-3"><strong>Realitätscheck:</strong> Für $1.049 bekommt man einen <a href="https://www.xda-developers.com/you-can-build-steam-machine-right-now-but-optimization-worth-waiting-for/" target="_blank" class="topic-link">Mini-PC mit vergleichbarer Leistung</a> – oder einen Gaming-Laptop mit <a href="https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/" target="_blank" class="topic-link">RTX 5070</a> für unter $1.000 .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve explains the pricing:</strong></p>
                    <p class="mb-2">"Our original goal for the price of Steam Machine is no longer viable. The prices reflect the state of the world for manufacturing; or, more accurately, it reflects the price of the components as we've secured them over the past 6 months."</p>
                    <p class="mb-2 mt-3"><strong>The main reasons:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>RAM crisis:</strong> DDR5 prices have exploded due to <a href="https://en.wikipedia.org/wiki/AI_accelerator" target="_blank" class="topic-link">AI datacenter demand</a>.</li>
                    <li><strong>Storage shortage:</strong> NVMe SSDs have also become more expensive.</li>
                    <li><strong>Availability:</strong> At times, certain components could not be sourced at all.</li>
                    <li><strong>Consequence:</strong> Launch production volume is severely limited.</li>
                    </ul>
                    <p class="mt-3"><strong>Reality check:</strong> For $1,049 you can get a <a href="https://www.xda-developers.com/you-can-build-steam-machine-right-now-but-optimization-worth-waiting-for/" target="_blank" class="topic-link">comparable mini-PC</a> – or a gaming laptop with an <a href="https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/" target="_blank" class="topic-link">RTX 5070</a> for under $1,000 .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. KOMPATIBILITÄT ============ */
        {
            id: 'section3',
            titleDe: '3. Kompatibilität & Spiele',
            titleEn: '3. Compatibility & Games',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> nutzt <strong>dieselbe SteamOS- und Proton-Basis wie der Steam Deck</strong>. Die Faustregel von Valve: <strong>„Was auf dem Deck läuft, läuft auch auf der Machine.“</strong> Der Unterschied liegt in der Leistung – die Machine ist etwa <strong>sechsmal so stark</strong> wie der Handheld .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> uses <strong>the same SteamOS and Proton base as the Steam Deck</strong>. Valve\'s rule of thumb: <strong>"If it runs on Deck, it runs on Machine."</strong> The difference is performance – the Machine is roughly <strong>six times more powerful</strong> than the handheld .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Verifizierungsprogramm',
                    titleEn: 'Verification Program',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Abzeichen</th><th>Bedeutung</th></tr>
                    <tr><td><strong>Verifiziert</strong></td><td class="text-[var(--text-muted)]">Läuft ohne Anpassungen, Controller-Layout optimiert, Text lesbar .</td></tr>
                    <tr><td><strong>Spielbar</strong></td><td class="text-[var(--text-muted)]">Läuft, kann aber manuelle Anpassung erfordern (z. B. Controller-Config, Grafik-Settings) .</td></tr>
                    <tr><td><strong>Nicht unterstützt</strong></td><td class="text-[var(--text-muted)]">Läuft aktuell nicht, meist wegen Anti-Cheat oder Proton-Inkompatibilität .</td></tr>
                    <tr><td><strong>Unbekannt</strong></td><td class="text-[var(--text-muted)]">Noch nicht geprüft – keine Aussage möglich .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Community-Alternative:</strong> <a href="https://www.protondb.com/" target="_blank" class="topic-link">ProtonDB</a> zeigt Nutzerberichte – oft aktueller und für mehr Titel als das offizielle Valve-Programm .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Badge</th><th>Meaning</th></tr>
                    <tr><td><strong>Verified</strong></td><td class="text-[var(--text-muted)]">Runs without tweaks, controller layout optimized, text readable .</td></tr>
                    <tr><td><strong>Playable</strong></td><td class="text-[var(--text-muted)]">Runs, but may require manual adjustments (e.g., controller config, graphics settings) .</td></tr>
                    <tr><td><strong>Unsupported</strong></td><td class="text-[var(--text-muted)]">Doesn't run currently, usually due to anti-cheat or Proton incompatibility .</td></tr>
                    <tr><td><strong>Unknown</strong></td><td class="text-[var(--text-muted)]">Not yet tested – no verdict possible .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Community alternative:</strong> <a href="https://www.protondb.com/" target="_blank" class="topic-link">ProtonDB</a> shows user reports – often more current and covering more titles than Valve's official program .</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Spiele mit Einschränkungen',
                    titleEn: 'Games with Limitations',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die 8 GB VRAM sind der limitierende Faktor.</strong> Moderne AAA-Titel laufen oft nur mit Kompromissen:</p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Black Myth: Wukong:</strong> 1080p High = ~43 FPS, nur mit aggressivem Upscaling 60 FPS. Ray-Tracing nicht spielbar .</li>
                    <li><strong>Cyberpunk 2077:</strong> 1080p Ultra = ~58 FPS, mit Ray-Tracing sofort unter 30 FPS. FSR Performance nötig .</li>
                    <li><strong>Microsoft Flight Simulator 2024:</strong> VRAM-Limit macht 1440p+ problematisch .</li>
                    </ul>
                    <p class="mt-3"><strong>Besser laufen:</strong> Indie-Titel, ältere AAA-Spiele (2018–2022), Strategie, <a href="https://en.wikipedia.org/wiki/Emulator" target="_blank" class="topic-link">Emulation</a>, <a href="https://en.wikipedia.org/wiki/Multiplayer_online_battle_arena" target="_blank" class="topic-link">MOBAs</a>, <a href="https://en.wikipedia.org/wiki/Indie_game" target="_blank" class="topic-link">Indies</a>.</p>
                    <p class="mt-2"><strong>Realitätscheck:</strong> Die Machine ist <strong>kein 4K-60-Gerät</strong> für moderne AAA-Titel. Valve hat die „4K60“-Angabe von der Produktseite entfernt .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The 8 GB VRAM is the limiting factor.</strong> Modern AAA titles often only run with compromises:</p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Black Myth: Wukong:</strong> 1080p High = ~43 FPS, only reaches 60 FPS with aggressive upscaling. Ray tracing not playable .</li>
                    <li><strong>Cyberpunk 2077:</strong> 1080p Ultra = ~58 FPS, ray tracing tanks it below 30 FPS immediately. FSR Performance required .</li>
                    <li><strong>Microsoft Flight Simulator 2024:</strong> VRAM limit makes 1440p+ problematic .</li>
                    </ul>
                    <p class="mt-3"><strong>Runs better:</strong> Indie titles, older AAA games (2018–2022), strategy, <a href="https://en.wikipedia.org/wiki/Emulator" target="_blank" class="topic-link">emulation</a>, <a href="https://en.wikipedia.org/wiki/Multiplayer_online_battle_arena" target="_blank" class="topic-link">MOBAs</a>, <a href="https://en.wikipedia.org/wiki/Indie_game" target="_blank" class="topic-link">indies</a>.</p>
                    <p class="mt-2"><strong>Reality check:</strong> The Machine is <strong>not a 4K60 device</strong> for modern AAA titles. Valve removed the "4K60" claim from the product page .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. DECKY LOADER ============ */
        {
            id: 'section4',
            titleDe: '4. Decky Loader & Plugins',
            titleEn: '4. Decky Loader & Plugins',
            introDe: '<a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a> ist ein <strong>Community-Plugin-Manager</strong> für <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a>, der auch auf der <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> funktioniert. Er fügt einen Plugin-Store direkt ins Quick Access Menu ein und ermöglicht System-Tweaks, Performance-Tools und Quality-of-Life-Features .',
            introEn: '<a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a> is a <strong>community plugin manager</strong> for <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a> that also works on the <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a>. It adds a plugin store directly to the Quick Access Menu and enables system tweaks, performance tools, and quality-of-life features .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Installation',
                    titleEn: 'Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>SteamOS:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1 mb-3">
                    <li>In den <strong>Desktop Mode</strong> wechseln (Steam-Taste → Power → Desktop Mode).</li>
                    <li><a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a> herunterladen und den Installer ausführen.</li>
                    <li>Zurück in den Gaming Mode wechseln.</li>
                    <li>Im <strong>Quick Access Menu</strong> (drei Punkte) erscheint ein neues Stecker-Symbol.</li>
                    </ol>
                    <p class="mb-2 mt-3"><strong>Bazzite:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">ujust setup-decky</pre>
                    </div>
                    <p class="mt-2">Bazzite hat einen eigenen Befehl, der die Integration testet .</p>
                    <p class="mt-3"><strong>Wichtige Warnungen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Nur von <strong>decky.xyz</strong> oder <strong>deckbrew.xyz</strong> herunterladen – andere Domains sind nicht offiziell .</li>
                    <li>Nach einem <strong>SteamOS-Update</strong> kann Decky verschwinden. Einfach den Installer erneut ausführen .</li>
                    <li>Keine Plugins aus unsicheren Quellen installieren .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>SteamOS:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1 mb-3">
                    <li>Switch to <strong>Desktop Mode</strong> (Steam button → Power → Desktop Mode).</li>
                    <li>Download <a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a> and run the installer.</li>
                    <li>Switch back to Gaming Mode.</li>
                    <li>A new plug icon appears in the <strong>Quick Access Menu</strong> (three dots).</li>
                    </ol>
                    <p class="mb-2 mt-3"><strong>Bazzite:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">ujust setup-decky</pre>
                    </div>
                    <p class="mt-2">Bazzite has its own command that tests the integration .</p>
                    <p class="mt-3"><strong>Important warnings:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Only download from <strong>decky.xyz</strong> or <strong>deckbrew.xyz</strong> – other domains are not official .</li>
                    <li>After a <strong>SteamOS update</strong>, Decky may disappear. Simply run the installer again .</li>
                    <li>Don't install plugins from untrusted sources .</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Empfohlene Plugins',
                    titleEn: 'Recommended Plugins',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Funktion</th></tr>
                    <tr><td><strong><a href="https://github.com/DeckThemes/CSSLoader-Desktop" target="_blank" class="topic-link">CSS Loader</a></strong></td><td class="text-[var(--text-muted)]">Themes und UI-Anpassungen für SteamOS .</td></tr>
                    <tr><td><strong><a href="https://github.com/NGnius/PowerTools" target="_blank" class="topic-link">PowerTools</a></strong></td><td class="text-[var(--text-muted)]">CPU-Threads begrenzen, Taktraten deckeln, SMT togglen – pro Spiel speicherbar .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamGridDB/decky-steamgriddb" target="_blank" class="topic-link">SteamGridDB</a></strong></td><td class="text-[var(--text-muted)]">Fehlende Artworks, Logos und Grid-Bilder für Nicht-Steam-Spiele .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">ProtonDB Badges</a></strong></td><td class="text-[var(--text-muted)]">Zeigt ProtonDB-Kompatibilitätsbewertungen direkt auf der Spielseite .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">Storage Cleaner</a></strong></td><td class="text-[var(--text-muted)]">Shader-Cache und Kompatibilitätsdaten visualisieren und löschen .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">NonSteamLaunchers</a></strong></td><td class="text-[var(--text-muted)]">Epic, GOG, Battle.net und andere Launcher in SteamOS integrieren .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tipp:</strong> Nicht zu viele Plugins installieren – jedes Plugin läuft im Hintergrund und kann die Performance beeinflussen .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Function</th></tr>
                    <tr><td><strong><a href="https://github.com/DeckThemes/CSSLoader-Desktop" target="_blank" class="topic-link">CSS Loader</a></strong></td><td class="text-[var(--text-muted)]">Themes and UI tweaks for SteamOS .</td></tr>
                    <tr><td><strong><a href="https://github.com/NGnius/PowerTools" target="_blank" class="topic-link">PowerTools</a></strong></td><td class="text-[var(--text-muted)]">Limit CPU threads, cap clock speeds, toggle SMT – save per game .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamGridDB/decky-steamgriddb" target="_blank" class="topic-link">SteamGridDB</a></strong></td><td class="text-[var(--text-muted)]">Missing artwork, logos, and grid images for non-Steam games .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">ProtonDB Badges</a></strong></td><td class="text-[var(--text-muted)]">Shows ProtonDB compatibility ratings directly on game page .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">Storage Cleaner</a></strong></td><td class="text-[var(--text-muted)]">Visualize and clear shader cache and compatibility data .</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">NonSteamLaunchers</a></strong></td><td class="text-[var(--text-muted)]">Integrate Epic, GOG, Battle.net and other launchers into SteamOS .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tip:</strong> Don't install too many plugins – each runs in the background and can affect performance .</p>
                    `
                }
            ]
        },

        /* ============ 5. TWEAKS ============ */
        {
            id: 'section5',
            titleDe: '5. Tweaks & Konfiguration',
            titleEn: '5. Tweaks & Configuration',
            introDe: 'Die wichtigsten Optimierungen für die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> betreffen <strong>RAM-Dual-Channel, TDP und FSR</strong>. Richtig eingestellt kann man 15–30 % mehr Performance herausholen .',
            introEn: 'The most important optimizations for the <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> concern <strong>RAM dual-channel, TDP, and FSR</strong>. Configured correctly, you can get 15–30% more performance .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Top-Tweaks',
                    titleEn: 'Top Tweaks',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ol class="list-decimal pl-5 space-y-2">
                    <li><strong>Zweiten RAM-Riegel einbauen:</strong> Der wichtigste Tweak überhaupt. 15–20 % mehr Performance in CPU-lastigen Spielen .</li>
                    <li><strong>FSR aktivieren:</strong> In-Game FSR bevorzugen, System-FSR nur als Fallback. Quality-Modus für beste Balance .</li>
                    <li><strong>Auflösung anpassen:</strong> 1080p nativ, 1440p mit FSR. 4K nur für ältere/Indie-Titel .</li>
                    <li><strong>Refresh-Rate syncen:</strong> 60 Hz bei 60 FPS, 40 Hz bei 40 FPS – kein Vielfaches = Tearing .</li>
                    <li><strong>Proton-Version wählen:</strong> <a href="https://github.com/GloriousEggroll/proton-ge-custom" target="_blank" class="topic-link">Proton-GE</a> für experimentelle Titel, Stable für den Rest .</li>
                    <li><strong>VRAM im Blick behalten:</strong> 8 GB sind schnell voll. Texturqualität senken, wenn Ruckler auftreten .</li>
                    </ol>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ol class="list-decimal pl-5 space-y-2">
                    <li><strong>Install a second RAM stick:</strong> The most important tweak of all. 15–20% more performance in CPU-heavy games .</li>
                    <li><strong>Enable FSR:</strong> Prefer in-game FSR, use system FSR only as fallback. Quality mode for best balance .</li>
                    <li><strong>Adjust resolution:</strong> 1080p native, 1440p with FSR. 4K only for older/indie titles .</li>
                    <li><strong>Sync refresh rate:</strong> 60 Hz at 60 FPS, 40 Hz at 40 FPS – non-multiple = tearing .</li>
                    <li><strong>Choose Proton version:</strong> <a href="https://github.com/GloriousEggroll/proton-ge-custom" target="_blank" class="topic-link">Proton-GE</a> for experimental titles, stable for the rest .</li>
                    <li><strong>Watch VRAM:</strong> 8 GB fills up fast. Lower texture quality when stuttering occurs .</li>
                    </ol>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Häufige Probleme',
                    titleEn: 'Common Issues',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Problem</th><th>Lösung</th></tr>
                    <tr><td><strong>Spiel läuft schlechter als auf Deck</strong></td><td class="text-[var(--text-muted)]">VRAM-Check. Texturqualität senken oder Auflösung reduzieren .</td></tr>
                    <tr><td><strong>Tearing trotz Sync</strong></td><td class="text-[var(--text-muted)]">Refresh-Rate muss exaktes Vielfaches des FPS-Limits sein .</td></tr>
                    <tr><td><strong>Overlay erscheint nicht</strong></td><td class="text-[var(--text-muted)]">Overlay-Level in Performance-Einstellungen prüfen. Manche Spiele verstecken es im Exklusiv-Vollbild .</td></tr>
                    <tr><td><strong>Steam Controller-Probleme</strong></td><td class="text-[var(--text-muted)]">Controller-Profil pro Spiel anpassen. Gyro-Mapping prüfen .</td></tr>
                    <tr><td><strong>Spiel startet nicht</strong></td><td class="text-[var(--text-muted)]">Proton-Version wechseln (GE vs. Stable). Anti-Cheat auf <a href="https://www.protondb.com/" target="_blank" class="topic-link">ProtonDB</a> prüfen .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Problem</th><th>Solution</th></tr>
                    <tr><td><strong>Game runs worse than on Deck</strong></td><td class="text-[var(--text-muted)]">VRAM check. Lower texture quality or reduce resolution .</td></tr>
                    <tr><td><strong>Tearing despite sync</strong></td><td class="text-[var(--text-muted)]">Refresh rate must be exact multiple of FPS limit .</td></tr>
                    <tr><td><strong>Overlay not appearing</strong></td><td class="text-[var(--text-muted)]">Check overlay level in performance settings. Some games hide it in exclusive fullscreen .</td></tr>
                    <tr><td><strong>Steam Controller issues</strong></td><td class="text-[var(--text-muted)]">Adjust controller profile per game. Check gyro mapping .</td></tr>
                    <tr><td><strong>Game won't start</strong></td><td class="text-[var(--text-muted)]">Switch Proton version (GE vs. stable). Check anti-cheat on <a href="https://www.protondb.com/" target="_blank" class="topic-link">ProtonDB</a> .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. ALTERNATIVEN ============ */
        {
            id: 'section6',
            titleDe: '6. Alternativen & DIY',
            titleEn: '6. Alternatives & DIY',
            introDe: 'Für $1.049 bekommt man <strong>deutlich mehr Leistung</strong>, wenn man bereit ist, selbst zu bauen oder ein anderes Gerät zu wählen. Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> ist nur dann sinnvoll, wenn man <strong>Plug-and-Play ohne Kompromisse</strong> will .',
            introEn: 'For $1,049 you get <strong>significantly more performance</strong> if you\'re willing to build your own or choose a different device. The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> only makes sense if you want <strong>plug-and-play without compromise</strong> .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'DIY Steam Machine',
                    titleEn: 'DIY Steam Machine',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Seit SteamOS 3.8 kann man SteamOS auf AMD-Desktops installieren.</strong> Das macht den DIY-Ansatz attraktiver denn je .</p>
                    <p class="mb-2 mt-3"><strong>Was man braucht:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>CPU:</strong> AMD Ryzen 5/7 7000/9000-Serie</li>
                    <li><strong>GPU:</strong> AMD RX 6000/7000/9000-Serie (NVIDIA nicht offiziell unterstützt)</li>
                    <li><strong>RAM:</strong> 16–32 GB DDR5 (Dual-Channel!)</li>
                    <li><strong>Speicher:</strong> 1 TB NVMe SSD</li>
                    <li><strong>Gehäuse:</strong> Mini-ITX oder Micro-ATX</li>
                    </ul>
                    <p class="mt-3"><strong>Kosten:</strong> Ab ~$800 für vergleichbare oder bessere Leistung .</p>
                    <p class="mt-2"><strong>Nachteil:</strong> Mehr Aufwand bei Treibern und Konfiguration. <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> ist die einfachere Alternative .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Since SteamOS 3.8, you can install SteamOS on AMD desktops.</strong> This makes the DIY approach more attractive than ever .</p>
                    <p class="mb-2 mt-3"><strong>What you need:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>CPU:</strong> AMD Ryzen 5/7 7000/9000 series</li>
                    <li><strong>GPU:</strong> AMD RX 6000/7000/9000 series (NVIDIA not officially supported)</li>
                    <li><strong>RAM:</strong> 16–32 GB DDR5 (dual-channel!)</li>
                    <li><strong>Storage:</strong> 1 TB NVMe SSD</li>
                    <li><strong>Case:</strong> Mini-ITX or Micro-ATX</li>
                    </ul>
                    <p class="mt-3"><strong>Cost:</strong> From ~$800 for comparable or better performance .</p>
                    <p class="mt-2"><strong>Downside:</strong> More effort with drivers and configuration. <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> is the easier alternative .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Bazzite vs. CachyOS vs. SteamOS',
                    titleEn: 'Bazzite vs. CachyOS vs. SteamOS',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Distribution</th><th class="w-1/4">Zielgruppe</th><th>Besonderheit</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a></strong></td><td class="text-[var(--text-muted)]">Plug-and-Play</td><td class="text-[var(--text-muted)]">Valves offizielles OS. Nur AMD. Beste Proton-Integration .</td></tr>
                    <tr><td><strong><a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a></strong></td><td class="text-[var(--text-muted)]">Einsteiger, NVIDIA</td><td class="text-[var(--text-muted)]">Fedora Atomic. Automatisches Rollback. NVIDIA-Support. Vorinstallierte Gaming-Tools .</td></tr>
                    <tr><td><strong><a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a></strong></td><td class="text-[var(--text-muted)]">Performance-Fans</td><td class="text-[var(--text-muted)]">Arch-basiert. x86-64-v3-Pakete. LAVD-Scheduler. Proton-CachyOS. Volle Kontrolle .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Empfehlung:</strong> SteamOS für maximale Einfachheit, Bazzite für NVIDIA oder mehr Flexibilität, CachyOS für maximale FPS .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Distribution</th><th class="w-1/4">Target Audience</th><th>Specialty</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a></strong></td><td class="text-[var(--text-muted)]">Plug-and-play</td><td class="text-[var(--text-muted)]">Valve's official OS. AMD only. Best Proton integration .</td></tr>
                    <tr><td><strong><a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a></strong></td><td class="text-[var(--text-muted)]">Beginners, NVIDIA</td><td class="text-[var(--text-muted)]">Fedora Atomic. Automatic rollback. NVIDIA support. Pre-installed gaming tools .</td></tr>
                    <tr><td><strong><a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a></strong></td><td class="text-[var(--text-muted)]">Performance enthusiasts</td><td class="text-[var(--text-muted)]">Arch-based. x86-64-v3 packages. LAVD scheduler. Proton-CachyOS. Full control .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Recommendation:</strong> SteamOS for maximum simplicity, Bazzite for NVIDIA or more flexibility, CachyOS for maximum FPS .</p>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Zen 4 6C/12T + RDNA 3 28 CUs. 16 GB DDR5 (Single-Channel!) + 8 GB GDDR6 VRAM. 512 GB oder 2 TB SSD.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tag opacity-70"></i><span>2. Preis</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">$1.049 (512 GB) / $1.349 (2 TB). Deutlich teurer als erhofft – RAM-Krise. Reservierungssystem mit Randomisierung.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>3. Kompatibilität</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Gleiche Proton-Basis wie Steam Deck. „Was auf Deck läuft, läuft auf Machine.“ 8 GB VRAM limitiert moderne AAA-Titel.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>4. Tweaks</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Zweiter RAM-Riegel (+15–20%), FSR Quality, 1080p/1440p, Refresh-Sync. Decky Loader für Plugins.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Zen 4 6C/12T + RDNA 3 28 CUs. 16 GB DDR5 (single-channel!) + 8 GB GDDR6 VRAM. 512 GB or 2 TB SSD.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tag opacity-70"></i><span>2. Price</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">$1,049 (512 GB) / $1,349 (2 TB). Far more expensive than hoped – RAM crisis. Reservation system with randomization.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>3. Compatibility</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Same Proton base as Steam Deck. "If it runs on Deck, it runs on Machine." 8 GB VRAM limits modern AAA titles.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>4. Tweaks</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Second RAM stick (+15–20%), FSR Quality, 1080p/1440p, refresh sync. Decky Loader for plugins.</p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    links: {
        titleDe: 'Referenzen & Downloads',
        titleEn: 'References & Downloads',
        items: [
            { icon: 'fa-store',    href: 'https://store.steampowered.com/steamdeck',               target: '_blank', labelDe: 'Steam Store',              labelEn: 'Steam Store' },
            { icon: 'fa-globe',    href: 'https://store.steampowered.com/steamos',                 target: '_blank', labelDe: 'SteamOS',                  labelEn: 'SteamOS' },
            { icon: 'fa-download', href: 'https://decky.xyz/',                                    target: '_blank', labelDe: 'Decky Loader',             labelEn: 'Decky Loader' },
            { icon: 'fa-balance-scale', href: 'https://bazzite.gg/',                              target: '_blank', labelDe: 'Bazzite (Alternative)',    labelEn: 'Bazzite (Alternative)' },
            { icon: 'fa-tachometer-alt', href: 'https://cachyos.org/',                            target: '_blank', labelDe: 'CachyOS (Alternative)',    labelEn: 'CachyOS (Alternative)' },
            { icon: 'fa-gamepad',  href: 'https://www.protondb.com/',                             target: '_blank', labelDe: 'ProtonDB (Kompatibilität)', labelEn: 'ProtonDB (Compatibility)' }
        ]
    },

    footer: {
        textDe: 'Steam Machine Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Steam Machine Reference · v1.0 · Dual Lang · 2026'
    }
});