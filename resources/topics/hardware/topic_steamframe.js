// resources/topics/topic_steamframe.js
// Registers the Steam Frame reference topic. Loaded via <script> injection.

/* ==================================================================
   STEAM FRAME CODE-BLOCK COPY CONTROLLER
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
    id: 'Steam Frame Overview',
    icon: 'fa-vr-cardboard',
    titleDe: 'Steam Frame',
    titleEn: 'Steam Frame',
    descDe: 'Valves Standalone-VR-Headset & Streaming-Brille',
    descEn: 'Valve\'s Standalone VR Headset & Streaming Glasses',

    sidebarTitleDe: 'Steam Frame',
    sidebarTitleEn: 'Steam Frame',
    sidebarSubtitleDe: '2026 Edition',
    sidebarSubtitleEn: '2026 Edition',
    sidebarVersion: 'SteamOS 0.3.0+',

    hero: {
        titleDe: 'Steam Frame: Valves Einstieg in Standalone-VR',
        titleEn: 'Steam Frame: Valve\'s Entry into Standalone VR',
        introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> ist Valves <strong>erstes eigenständiges VR-Headset</strong> und gleichzeitig eine Streaming-Brille für PC-VR. Angetrieben von einem <a href="https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform" target="_blank" class="topic-link">Snapdragon 8 Gen 3</a> und 16 GB RAM läuft sie auf <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a> und kann über <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">Proton</a> + <a href="https://github.com/FEX-Emu/FEX" target="_blank" class="topic-link">FEX</a>-Emulation sowohl x86-Steam-Spiele als auch Android-APKs ausführen. Der Preis von <strong>1.059 $ (256 GB) und 1.299 $ (1 TB)</strong> liegt deutlich über dem der Meta Quest 3 – dafür bekommt man ein vollwertiges Linux-Desktop-System, Eye-Tracking und optionales Farb-Passthrough. Dieser Guide deckt alles ab: Hardware, Streaming, Verifizierungsprogramm, Standalone-Betrieb und Zubehör .',
        introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> is Valve\'s <strong>first standalone VR headset</strong> and simultaneously a streaming device for PC VR. Powered by a <a href="https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform" target="_blank" class="topic-link">Snapdragon 8 Gen 3</a> and 16 GB RAM, it runs <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a> and can execute both x86 Steam games and Android APKs via <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">Proton</a> + <a href="https://github.com/FEX-Emu/FEX" target="_blank" class="topic-link">FEX</a> emulation. The <strong>$1,059 (256 GB) and $1,299 (1 TB)</strong> price is significantly above the Meta Quest 3 – but you get a full Linux desktop system, eye tracking, and optional color passthrough. This guide covers everything: hardware, streaming, verification program, standalone operation, and accessories .'
    },

    quickLinks: [
        { icon: 'fa-microchip',         href: '#section1', switchToDoc: true, labelDe: 'Hardware',        labelEn: 'Hardware' },
        { icon: 'fa-tag',               href: '#section2', switchToDoc: true, labelDe: 'Preis & Modelle', labelEn: 'Price & Models' },
        { icon: 'fa-wifi',              href: '#section3', switchToDoc: true, labelDe: 'Streaming',       labelEn: 'Streaming' },
        { icon: 'fa-eye',               href: '#section4', switchToDoc: true, labelDe: 'Foveated Rendering', labelEn: 'Foveated Rendering' },
        { icon: 'fa-check-circle',      href: '#section5', switchToDoc: true, labelDe: 'Verifizierung',   labelEn: 'Verification' },
        { icon: 'fa-sd-card',           href: '#section6', switchToDoc: true, labelDe: 'Zubehör',         labelEn: 'Accessories' },
        { icon: 'fa-external-link-alt', href: 'https://store.steampowered.com/steamdeck', target: '_blank', labelDe: 'Steam Store', labelEn: 'Steam Store' }
    ],

    sections: [
        /* ============ 1. HARDWARE ============ */
        {
            id: 'section1',
            titleDe: '1. Hardware & Architektur',
            titleEn: '1. Hardware & Architecture',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> ist ein <strong>komplett eigenständiger Computer im Brillenformat</strong>. Herzstück ist ein <a href="https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform" target="_blank" class="topic-link">Qualcomm Snapdragon 8 Gen 3</a> – kein XR-optimierter Chip, sondern ein Flaggschiff-Smartphone-SoC aus 2023. Das klingt alt, reicht aber laut Tests für Quest-3-ähnliche Leistung. Die beiden <strong>2160×2160 LCD-Panels</strong> (pro Auge) bieten 72–120 Hz, experimentell bis 144 Hz. Eye-Tracking ermöglicht <strong>Foveated Rendering</strong> und <strong>Foveated Streaming</strong> – die Auflösung wird dort reduziert, wo man nicht hinschaut, um Bandbreite und Rechenleistung zu sparen .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> is a <strong>completely standalone computer in glasses form</strong>. At its heart is a <a href="https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform" target="_blank" class="topic-link">Qualcomm Snapdragon 8 Gen 3</a> – not an XR-optimized chip, but a flagship smartphone SoC from 2023. That sounds old, but tests show it delivers Quest 3-like performance. The two <strong>2160×2160 LCD panels</strong> (per eye) offer 72–120 Hz, experimentally up to 144 Hz. Eye tracking enables <strong>foveated rendering</strong> and <strong>foveated streaming</strong> – resolution is reduced where you\'re not looking, saving bandwidth and processing power .',
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
                    <tr><td><strong>SoC</strong></td><td class="text-[var(--text-muted)]">4 nm <a href="https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform" target="_blank" class="topic-link">Qualcomm Snapdragon 8 Gen 3</a> (ARM64)</td></tr>
                    <tr><td><strong>RAM</strong></td><td class="text-[var(--text-muted)]">16 GB Unified LPDDR5X</td></tr>
                    <tr><td><strong>Speicher</strong></td><td class="text-[var(--text-muted)]">256 GB oder 1 TB UFS, microSD-Kartensteckplatz</td></tr>
                    <tr><td><strong>Display</strong></td><td class="text-[var(--text-muted)]">2× 2160×2160 LCD (pro Auge), 72–120 Hz, experimentell 144 Hz</td></tr>
                    <tr><td><strong>Linsen</strong></td><td class="text-[var(--text-muted)]">Pancake-Linsen, bis 110° horizontales FOV</td></tr>
                    <tr><td><strong>Tracking</strong></td><td class="text-[var(--text-muted)]">Inside-Out 6DoF (4 Schwarz-Weiß-Kameras) + 2 Eye-Tracking-Kameras</td></tr>
                    <tr><td><strong>Akku</strong></td><td class="text-[var(--text-muted)]">21,6 Wh Li-Ion im hinteren Kopfbügel, 1–2 h Spielzeit</td></tr>
                    <tr><td><strong>Gewicht</strong></td><td class="text-[var(--text-muted)]">~440 g (mit Akku als Gegengewicht)</td></tr>
                    <tr><td><strong>Konnektivität</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Wi-Fi_7" target="_blank" class="topic-link">Wi-Fi 7</a>, <a href="https://en.wikipedia.org/wiki/Bluetooth#Bluetooth_5.4" target="_blank" class="topic-link">Bluetooth 5.4</a>, USB-C (am Akku)</td></tr>
                    <tr><td><strong>Betriebssystem</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a> (Arch Linux + KDE Plasma)</td></tr>
                    <tr><td><strong>Lieferumfang</strong></td><td class="text-[var(--text-muted)]">Headset, 2 Controller, Wi-Fi 6E-Adapter, <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a></td></tr>
                    <tr><td><strong>Nicht enthalten</strong></td><td class="text-[var(--text-muted)]"><strong>Netzteil</strong> (separat 29 $, mind. 45 W USB-C)</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Component</th><th>Specification</th></tr>
                    <tr><td><strong>SoC</strong></td><td class="text-[var(--text-muted)]">4 nm <a href="https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform" target="_blank" class="topic-link">Qualcomm Snapdragon 8 Gen 3</a> (ARM64)</td></tr>
                    <tr><td><strong>RAM</strong></td><td class="text-[var(--text-muted)]">16 GB Unified LPDDR5X</td></tr>
                    <tr><td><strong>Storage</strong></td><td class="text-[var(--text-muted)]">256 GB or 1 TB UFS, microSD card slot</td></tr>
                    <tr><td><strong>Display</strong></td><td class="text-[var(--text-muted)]">2× 2160×2160 LCD (per eye), 72–120 Hz, experimentally 144 Hz</td></tr>
                    <tr><td><strong>Lenses</strong></td><td class="text-[var(--text-muted)]">Pancake lenses, up to 110° horizontal FOV</td></tr>
                    <tr><td><strong>Tracking</strong></td><td class="text-[var(--text-muted)]">Inside-out 6DoF (4 black-and-white cameras) + 2 eye-tracking cameras</td></tr>
                    <tr><td><strong>Battery</strong></td><td class="text-[var(--text-muted)]">21.6 Wh Li-ion in rear headstrap, 1–2 h playtime</td></tr>
                    <tr><td><strong>Weight</strong></td><td class="text-[var(--text-muted)]">~440 g (with battery as counterweight)</td></tr>
                    <tr><td><strong>Connectivity</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Wi-Fi_7" target="_blank" class="topic-link">Wi-Fi 7</a>, <a href="https://en.wikipedia.org/wiki/Bluetooth#Bluetooth_5.4" target="_blank" class="topic-link">Bluetooth 5.4</a>, USB-C (on battery)</td></tr>
                    <tr><td><strong>Operating System</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a> (Arch Linux + KDE Plasma)</td></tr>
                    <tr><td><strong>In the Box</strong></td><td class="text-[var(--text-muted)]">Headset, 2 controllers, Wi-Fi 6E adapter, <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a></td></tr>
                    <tr><td><strong>Not Included</strong></td><td class="text-[var(--text-muted)]"><strong>Power supply</strong> (sold separately for $29, requires at least 45W USB-C)</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Standalone oder Streaming?',
                    titleEn: 'Standalone or Streaming?',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Die Steam Frame ist beides – und das ist ihr größter Vorteil:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Standalone:</strong> Spiele laufen direkt auf dem Snapdragon 8 Gen 3. Über 130 Titel sind bereits „Frame Verified“ – darunter <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a> als Portierung. Performance liegt laut CNET auf Quest-3-Niveau .</li>
                    <li><strong>Streaming:</strong> Über den mitgelieferten <strong>Wi-Fi 6E-Adapter</strong> (6 GHz) wird PC-VR oder der komplette Steam-Desktop auf die Brille gestreamt. Ohne PC-Leistung keine Einschränkungen – der Host-PC rendert, die Frame zeigt nur an .</li>
                    <li><strong>Hybrid:</strong> Man kann auch einen 2D-Steam-Desktop in einer virtuellen Leinwand anzeigen und mit Maus/Tastatur/Controller bedienen – die Frame wird so zum tragbaren Monitor.</li>
                    <li><strong>Linux-Desktop:</strong> Im Desktop-Modus läuft ein vollständiges <a href="https://kde.org/plasma-desktop/" target="_blank" class="topic-link">KDE Plasma</a> mit Firefox, Chromium und anderen Linux-Apps. Man kann sogar YouTube schauen, während man im Fenster ein Steam-Spiel spielt .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>The Steam Frame is both – and that's its biggest advantage:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Standalone:</strong> Games run directly on the Snapdragon 8 Gen 3. Over 130 titles are already "Frame Verified" – including <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a> as a port. Performance is roughly Quest 3 level according to CNET .</li>
                    <li><strong>Streaming:</strong> Via the included <strong>Wi-Fi 6E adapter</strong> (6 GHz), PC VR or the complete Steam desktop is streamed to the glasses. No limitations from PC performance – the host PC renders, the Frame just displays .</li>
                    <li><strong>Hybrid:</strong> You can also display a 2D Steam desktop on a virtual screen and control it with mouse/keyboard/controller – the Frame becomes a portable monitor.</li>
                    <li><strong>Linux desktop:</strong> Desktop mode runs a full <a href="https://kde.org/plasma-desktop/" target="_blank" class="topic-link">KDE Plasma</a> with Firefox, Chromium, and other Linux apps. You can even watch YouTube while playing a Steam game in a window .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. PREIS & MODELLE ============ */
        {
            id: 'section2',
            titleDe: '2. Preis & Modelle',
            titleEn: '2. Price & Models',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> ist in zwei Varianten erhältlich – <strong>256 GB für 1.059 $</strong> und <strong>1 TB für 1.299 $</strong>. Beide enthalten die Controller, den Wi-Fi-Adapter und <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a>. Ein <strong>Netzteil ist nicht enthalten</strong> – das ist ungewöhnlich und ein zusätzlicher Kostenpunkt .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> is available in two variants – <strong>256 GB for $1,059</strong> and <strong>1 TB for $1,299</strong>. Both include the controllers, the Wi-Fi adapter, and <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a>. A <strong>power supply is not included</strong> – which is unusual and an additional cost .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Preisübersicht',
                    titleEn: 'Price Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Artikel</th><th class="w-1/4">Preis (USD)</th><th>Enthalten?</th></tr>
                    <tr><td><strong>Steam Frame (256 GB)</strong></td><td class="text-[var(--text-muted)]">$1.059</td><td class="text-[var(--text-muted)]">Basis-Kit</td></tr>
                    <tr><td><strong>Steam Frame (1 TB)</strong></td><td class="text-[var(--text-muted)]">$1.299</td><td class="text-[var(--text-muted)]">Größerer Speicher</td></tr>
                    <tr><td><strong>Steam Frame Controller</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">Ja (beide Kits)</td></tr>
                    <tr><td><strong>Wi-Fi 6E-Adapter</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">Ja (beide Kits)</td></tr>
                    <tr><td><strong>Half-Life: Alyx</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">Ja (beide Kits)</td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/USB-C" target="_blank" class="topic-link">USB-C 45W Netzteil</a></strong></td><td class="text-[var(--text-muted)]">$29</td><td class="text-[var(--text-muted)]"><strong>Nein</strong> (separat)</td></tr>
                    <tr><td><strong>Ergonomic Accessories Kit</strong></td><td class="text-[var(--text-muted)]">$59</td><td class="text-[var(--text-muted)]">Nein (separat)</td></tr>
                    <tr><td><strong>Arcturus Vision Kamera (Farb-Passthrough)</strong></td><td class="text-[var(--text-muted)]">$149</td><td class="text-[var(--text-muted)]">Nein (separat)</td></tr>
                    <tr><td><strong>Zenni Sehstärken-Linsen</strong></td><td class="text-[var(--text-muted)]">ab $68</td><td class="text-[var(--text-muted)]">Nein (separat)</td></tr>
                    <tr><td><strong>Accessory Replacement Kit</strong></td><td class="text-[var(--text-muted)]">$49</td><td class="text-[var(--text-muted)]">Nein (separat)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Mit Farbkamera, Ergo-Kit und Linsen landet man schnell bei <strong>über 1.500 $</strong> für das 1-TB-Kit – das ist deutlich mehr als eine <a href="https://www.meta.com/quest/quest-3/" target="_blank" class="topic-link">Meta Quest 3</a> (ab 499 $) .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Item</th><th class="w-1/4">Price (USD)</th><th>Included?</th></tr>
                    <tr><td><strong>Steam Frame (256 GB)</strong></td><td class="text-[var(--text-muted)]">$1,059</td><td class="text-[var(--text-muted)]">Base kit</td></tr>
                    <tr><td><strong>Steam Frame (1 TB)</strong></td><td class="text-[var(--text-muted)]">$1,299</td><td class="text-[var(--text-muted)]">Larger storage</td></tr>
                    <tr><td><strong>Steam Frame Controllers</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">Yes (both kits)</td></tr>
                    <tr><td><strong>Wi-Fi 6E adapter</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">Yes (both kits)</td></tr>
                    <tr><td><strong>Half-Life: Alyx</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">Yes (both kits)</td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/USB-C" target="_blank" class="topic-link">USB-C 45W power supply</a></strong></td><td class="text-[var(--text-muted)]">$29</td><td class="text-[var(--text-muted)]"><strong>No</strong> (separate)</td></tr>
                    <tr><td><strong>Ergonomic Accessories Kit</strong></td><td class="text-[var(--text-muted)]">$59</td><td class="text-[var(--text-muted)]">No (separate)</td></tr>
                    <tr><td><strong>Arcturus Vision camera (color passthrough)</strong></td><td class="text-[var(--text-muted)]">$149</td><td class="text-[var(--text-muted)]">No (separate)</td></tr>
                    <tr><td><strong>Zenni prescription lenses</strong></td><td class="text-[var(--text-muted)]">from $68</td><td class="text-[var(--text-muted)]">No (separate)</td></tr>
                    <tr><td><strong>Accessory Replacement Kit</strong></td><td class="text-[var(--text-muted)]">$49</td><td class="text-[var(--text-muted)]">No (separate)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">With color camera, ergo kit, and lenses, you quickly land at <strong>over $1,500</strong> for the 1 TB kit – significantly more than a <a href="https://www.meta.com/quest/quest-3/" target="_blank" class="topic-link">Meta Quest 3</a> (from $499) .</p>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Reservierungssystem',
                    titleEn: 'Reservation System',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Um Reseller und Bots zu bekämpfen, nutzt Valve ein Reservierungssystem mit Randomisierung.</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li>Anmeldung nur mit <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>-Accounts, die vor dem <strong>27. April 2026</strong> mindestens einen Kauf getätigt haben.</li>
                    <li>Maximal eine Anmeldung pro Haushalt.</li>
                    <li>Nach Ablauf der Anmeldefrist werden die Einträge <strong>randomisiert</strong> – man erhält eine E-Mail, ob man in der Reservierungsschlange oder auf der Warteliste steht.</li>
                    <li>Bei erfolgreicher Reservierung hat man <strong>72 Stunden</strong>, um den Kauf abzuschließen.</li>
                    <li>Der erste Batch von Kauf-E-Mails ging am <strong>18. September 2026</strong> raus.</li>
                    </ul>
                    <p class="mt-3"><strong>Verfügbare Regionen:</strong> USA, Kanada, Europa, Australien. Japan, Taiwan, Hongkong über Partner <a href="https://www.komodo.com/" target="_blank" class="topic-link">Komodo</a> .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>To combat resellers and bots, Valve uses a reservation system with randomization.</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li>Sign-up only with <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a> accounts that made at least one purchase before <strong>April 27, 2026</strong>.</li>
                    <li>Maximum one sign-up per household.</li>
                    <li>After the sign-up deadline, entries are <strong>randomized</strong> – you receive an email whether you're in the reservation queue or on the waitlist.</li>
                    <li>If successfully reserved, you have <strong>72 hours</strong> to complete the purchase.</li>
                    <li>The first batch of purchase emails went out on <strong>September 18, 2026</strong>.</li>
                    </ul>
                    <p class="mt-3"><strong>Available regions:</strong> US, Canada, Europe, Australia. Japan, Taiwan, Hong Kong via partner <a href="https://www.komodo.com/" target="_blank" class="topic-link">Komodo</a> .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. STREAMING ============ */
        {
            id: 'section3',
            titleDe: '3. Streaming & Wi-Fi 6E-Adapter',
            titleEn: '3. Streaming & Wi-Fi 6E Adapter',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> ist primär eine <strong>Streaming-Brille</strong>. Der mitgelieferte <a href="https://en.wikipedia.org/wiki/Wi-Fi_6E" target="_blank" class="topic-link">Wi-Fi 6E</a>-Adapter arbeitet auf dem <strong>6-GHz-Band</strong> und bietet eine eigene drahtlose Verbindung zum PC – unabhängig vom Heimnetzwerk. Das reduziert Latenz und Interferenzen deutlich .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> is primarily a <strong>streaming device</strong>. The included <a href="https://en.wikipedia.org/wiki/Wi-Fi_6E" target="_blank" class="topic-link">Wi-Fi 6E</a> adapter operates on the <strong>6 GHz band</strong> and provides a dedicated wireless connection to the PC – independent of the home network. This significantly reduces latency and interference .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Wie das Streaming funktioniert',
                    titleEn: 'How Streaming Works',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Zwei Streaming-Modi:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mt-3 mb-3">
                    <li><strong>Über den mitgelieferten Dongle:</strong> Der Adapter wird an den PC angeschlossen und erstellt ein eigenes 6-GHz-Netzwerk. Die Frame verbindet sich direkt – keine Konfiguration nötig.</li>
                    <li><strong>Über Standard-WLAN:</strong> Die Frame kann sich auch mit dem regulären Heimnetzwerk verbinden und über <a href="https://store.steampowered.com/remoteplay" target="_blank" class="topic-link">Steam Remote Play</a> streamen – flexibler, aber potenziell anfälliger für Störungen.</li>
                    </ol>
                    <p class="mb-2"><strong>Was gestreamt werden kann:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>PC-VR-Titel:</strong> Volle SteamVR-Bibliothek, gerendert vom PC.</li>
                    <li><strong>2D-Steam-Spiele:</strong> Kompletter Steam-Desktop in einer virtuellen Leinwand.</li>
                    <li><strong>Linux-Desktop:</strong> Der gesamte Desktop-Modus kann gestreamt werden.</li>
                    </ul>
                    <p class="mt-3"><strong>Wichtig:</strong> Beim Streaming gibt es <strong>kein Verified-Programm</strong> – Valve sagt, wenn das Spiel auf dem Host-PC gut läuft, läuft es auch auf der Frame .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Two streaming modes:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mt-3 mb-3">
                    <li><strong>Via included dongle:</strong> The adapter is plugged into the PC and creates its own 6 GHz network. The Frame connects directly – no configuration needed.</li>
                    <li><strong>Via standard Wi-Fi:</strong> The Frame can also connect to the regular home network and stream via <a href="https://store.steampowered.com/remoteplay" target="_blank" class="topic-link">Steam Remote Play</a> – more flexible, but potentially more prone to interference.</li>
                    </ol>
                    <p class="mb-2"><strong>What can be streamed:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>PC VR titles:</strong> Full SteamVR library, rendered by the PC.</li>
                    <li><strong>2D Steam games:</strong> Complete Steam desktop on a virtual screen.</li>
                    <li><strong>Linux desktop:</strong> The entire desktop mode can be streamed.</li>
                    </ul>
                    <p class="mt-3"><strong>Important:</strong> There is <strong>no Verified program</strong> for streaming – Valve says if the game runs well on the host PC, it runs well on the Frame .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Voraussetzungen & Empfehlungen',
                    titleEn: 'Requirements & Recommendations',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Aspekt</th><th>Empfehlung</th></tr>
                    <tr><td><strong>PC-Anforderung</strong></td><td class="text-[var(--text-muted)]">Kein „VR-Ready-PC“ nötig – die Frame läuft auch komplett ohne PC. Für Streaming: ein PC mit Steam, der Spiele rendern kann .</td></tr>
                    <tr><td><strong>GPU</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.nvidia.com/en-us/geforce/" target="_blank" class="topic-link">NVIDIA</a> oder <a href="https://www.amd.com/en/graphics" target="_blank" class="topic-link">AMD</a> – NVIDIA wird offiziell unterstützt (im Gegensatz zu SteamOS auf Desktop) .</td></tr>
                    <tr><td><strong>Netzwerk</strong></td><td class="text-[var(--text-muted)]">Der Dongle ist die zuverlässigste Option. 6 GHz vermeidet Interferenzen mit 2,4/5-GHz-Geräten.</td></tr>
                    <tr><td><strong>Linux</strong></td><td class="text-[var(--text-muted)]">Streaming von Linux-PCs funktioniert ebenfalls – Steam Remote Play ist plattformunabhängig.</td></tr>
                    <tr><td><strong>Steam Deck</strong></td><td class="text-[var(--text-muted)]">Kann als Host dienen, ist aber deutlich schwächer als ein Gaming-PC.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Aspect</th><th>Recommendation</th></tr>
                    <tr><td><strong>PC requirement</strong></td><td class="text-[var(--text-muted)]">No "VR-ready PC" needed – the Frame runs completely without a PC. For streaming: a PC with Steam that can render games .</td></tr>
                    <tr><td><strong>GPU</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.nvidia.com/en-us/geforce/" target="_blank" class="topic-link">NVIDIA</a> or <a href="https://www.amd.com/en/graphics" target="_blank" class="topic-link">AMD</a> – NVIDIA is officially supported (unlike SteamOS on desktop) .</td></tr>
                    <tr><td><strong>Network</strong></td><td class="text-[var(--text-muted)]">The dongle is the most reliable option. 6 GHz avoids interference with 2.4/5 GHz devices.</td></tr>
                    <tr><td><strong>Linux</strong></td><td class="text-[var(--text-muted)]">Streaming from Linux PCs also works – Steam Remote Play is platform-independent.</td></tr>
                    <tr><td><strong>Steam Deck</strong></td><td class="text-[var(--text-muted)]">Can serve as a host, but is significantly weaker than a gaming PC.</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. FOVEATED RENDERING ============ */
        {
            id: 'section4',
            titleDe: '4. Eye-Tracking & Foveated Rendering',
            titleEn: '4. Eye Tracking & Foveated Rendering',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> hat <strong>zwei Eye-Tracking-Kameras</strong> – aber nicht zur Steuerung. Stattdessen nutzt Valve sie für <strong>Foveated Rendering</strong> und <strong>Foveated Streaming</strong>: Die Auflösung wird dort reduziert, wo man gerade nicht hinschaut. Das spart Rechenleistung und Bandbreite .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> has <strong>two eye-tracking cameras</strong> – but not for control. Instead, Valve uses them for <strong>foveated rendering</strong> and <strong>foveated streaming</strong>: resolution is reduced where you\'re not looking. This saves processing power and bandwidth .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Wie Foveated Rendering funktioniert',
                    titleEn: 'How Foveated Rendering Works',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Das Konzept:</strong></p>
                    <p class="mb-2">Das menschliche Auge sieht nur im Zentrum (Fovea) scharf – alles außerhalb wird unscharf wahrgenommen. Foveated Rendering nutzt das aus, indem es nur den zentralen Bereich in voller Auflösung rendert und die Peripherie reduziert. Die Frame passt das <strong>live an die Augenbewegung an</strong>.</p>
                    <p class="mb-2 mt-3"><strong>Vorteile:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Standalone:</strong> Bis zu 30 % mehr Performance in unterstützten Spielen – <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a> und <a href="https://store.steampowered.com/app/1566690/Dungeons_of_Eternity/" target="_blank" class="topic-link">Dungeons of Eternity</a> zeigen deutliche Verbesserungen .</li>
                    <li><strong>Streaming:</strong> Reduziert die benötigte Bandbreite – weniger Kompression, weniger Artefakte, niedrigere Latenz.</li>
                    <li><strong>Zukunftssicher:</strong> Mehr Spiele werden Foveated Rendering unterstützen, je mehr Headsets es bieten.</li>
                    </ul>
                    <p class="mt-3"><strong>Einschränkung:</strong> Noch nutzen nur wenige Spiele Foveated Rendering aktiv. Ohne Spiele-Support bringt das Eye-Tracking keinen Performance-Vorteil .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The concept:</strong></p>
                    <p class="mb-2">The human eye only sees sharply in the center (fovea) – everything outside is perceived blurry. Foveated rendering exploits this by rendering only the central area at full resolution and reducing the periphery. The Frame adapts this <strong>live to eye movement</strong>.</p>
                    <p class="mb-2 mt-3"><strong>Advantages:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Standalone:</strong> Up to 30% more performance in supported games – <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a> and <a href="https://store.steampowered.com/app/1566690/Dungeons_of_Eternity/" target="_blank" class="topic-link">Dungeons of Eternity</a> show clear improvements .</li>
                    <li><strong>Streaming:</strong> Reduces required bandwidth – less compression, fewer artifacts, lower latency.</li>
                    <li><strong>Future-proof:</strong> More games will support foveated rendering as more headsets offer it.</li>
                    </ul>
                    <p class="mt-3"><strong>Limitation:</strong> Only a few games currently use foveated rendering actively. Without game support, eye tracking brings no performance advantage .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Kein Hand-Tracking',
                    titleEn: 'No Hand Tracking',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Frame hat – anders als Quest 3, Vision Pro oder Galaxy XR – KEIN Hand-Tracking.</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li>Man muss die <strong>Controller verwenden</strong> oder eine <a href="https://en.wikipedia.org/wiki/Bluetooth" target="_blank" class="topic-link">Bluetooth</a>-Tastatur, Maus oder ein Trackpad koppeln.</li>
                    <li>Valve plant, Hand-Tracking <strong>nachzuliefern</strong> – aber es ist zum Launch nicht verfügbar.</li>
                    <li>Das ist ein klarer Nachteil gegenüber der Konkurrenz, besonders für soziale VR-Erfahrungen.</li>
                    <li>Die Controller haben aber <strong>kapazitive Finger-Tracking-Sensoren</strong> – sie erkennen, wie nah die Finger an den Buttons sind, und können Gesten interpretieren.</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Wer Hand-Tracking braucht, sollte zur Quest 3 greifen. Wer die beste PC-VR-Integration und ein offenes Linux-System will, ist mit der Frame besser bedient .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Unlike the Quest 3, Vision Pro, or Galaxy XR, the Frame has NO hand tracking.</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li>You must use the <strong>controllers</strong> or pair a <a href="https://en.wikipedia.org/wiki/Bluetooth" target="_blank" class="topic-link">Bluetooth</a> keyboard, mouse, or trackpad.</li>
                    <li>Valve plans to <strong>add hand tracking</strong> later – but it's not available at launch.</li>
                    <li>This is a clear disadvantage compared to competitors, especially for social VR experiences.</li>
                    <li>However, the controllers have <strong>capacitive finger-tracking sensors</strong> – they detect how close your fingers are to the buttons and can interpret gestures.</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> If you need hand tracking, get the Quest 3. If you want the best PC VR integration and an open Linux system, the Frame is better .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. VERIFIZIERUNG ============ */
        {
            id: 'section5',
            titleDe: '5. Steam Frame Verified-Programm',
            titleEn: '5. Steam Frame Verified Program',
            introDe: 'Valve hat auf der <a href="https://gdconf.com/" target="_blank" class="topic-link">GDC 2026</a> die Anforderungen für das <strong>Steam Frame Verified</strong>-Programm vorgestellt. Es gibt kein „Verified“ für Streaming – nur für <strong>Standalone-Spiele</strong>. Die Anforderungen sind strenger als beim <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> .',
            introEn: 'At <a href="https://gdconf.com/" target="_blank" class="topic-link">GDC 2026</a>, Valve presented the requirements for the <strong>Steam Frame Verified</strong> program. There is no "Verified" for streaming – only for <strong>standalone games</strong>. The requirements are stricter than for the <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Anforderungen',
                    titleEn: 'Requirements',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Kategorie</th><th>Anforderung</th></tr>
                    <tr><td><strong>VR-Spiele (Standalone)</strong></td><td class="text-[var(--text-muted)]">Stabile <strong>90 FPS</strong>, keine feste Auflösung. Volle Controller-Unterstützung. UI lesbar .</td></tr>
                    <tr><td><strong>2D-Spiele (Standalone)</strong></td><td class="text-[var(--text-muted)]">Stabile <strong>30 FPS bei 720p</strong>. Volle Controller-Unterstützung. UI lesbar .</td></tr>
                    <tr><td><strong>Streaming</strong></td><td class="text-[var(--text-muted)]"><strong>Kein Verified</strong> – Host-PC entscheidet. Wenn es auf dem PC läuft, läuft es auf der Frame .</td></tr>
                    <tr><td><strong>Abzeichen</strong></td><td class="text-[var(--text-muted)]">Nur <strong>Frame Test</strong> und <strong>Frame Unsupported</strong> – kein „Frame Verified“ wie beim Deck .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Warum 90 FPS?</strong> Valve folgt dem Industriestandard für VR – 90 Hz reduziert das Risiko von Motion Sickness und gilt als Benchmark für flüssige VR .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Category</th><th>Requirement</th></tr>
                    <tr><td><strong>VR games (standalone)</strong></td><td class="text-[var(--text-muted)]">Stable <strong>90 FPS</strong>, no fixed resolution. Full controller support. Readable UI .</td></tr>
                    <tr><td><strong>2D games (standalone)</strong></td><td class="text-[var(--text-muted)]">Stable <strong>30 FPS at 720p</strong>. Full controller support. Readable UI .</td></tr>
                    <tr><td><strong>Streaming</strong></td><td class="text-[var(--text-muted)]"><strong>No Verified</strong> – host PC decides. If it runs on the PC, it runs on the Frame .</td></tr>
                    <tr><td><strong>Badges</strong></td><td class="text-[var(--text-muted)]">Only <strong>Frame Test</strong> and <strong>Frame Unsupported</strong> – no "Frame Verified" like the Deck .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Why 90 FPS?</strong> Valve follows the industry standard for VR – 90 Hz reduces the risk of motion sickness and is considered the benchmark for smooth VR .</p>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Entwickler-Empfehlungen',
                    titleEn: 'Developer Recommendations',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve empfiehlt Entwicklern zwei Wege:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>x86-Software:</strong> Windows-Code wird über <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">Proton</a> nach Linux und dann über <a href="https://github.com/FEX-Emu/FEX" target="_blank" class="topic-link">FEX</a> nach ARM übersetzt. Funktioniert, kostet aber Performance.</li>
                    <li><strong>Android-APKs:</strong> Android-Apps werden über <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">Lepton</a> direkt auf SteamOS portiert. <strong>Deutlich effizienter</strong> – Meta-Quest-Ports laufen mit minimalem Aufwand.</li>
                    <li><strong>Empfehlung:</strong> Wenn ein Quest-Port existiert, diesen verwenden. Die Leistung ist besser und der Portierungsaufwand geringer.</li>
                    </ul>
                    <p class="mt-3"><strong>Die Frame unterstützt Android-APKs</strong> – das ist einzigartig unter SteamOS-Geräten und öffnet die Tür zu hunderten bestehenden Quest-Titeln .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve recommends two paths for developers:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>x86 software:</strong> Windows code is translated to Linux via <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">Proton</a> and then to ARM via <a href="https://github.com/FEX-Emu/FEX" target="_blank" class="topic-link">FEX</a>. Works, but costs performance.</li>
                    <li><strong>Android APKs:</strong> Android apps are ported directly to SteamOS via <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">Lepton</a>. <strong>Significantly more efficient</strong> – Meta Quest ports run with minimal effort.</li>
                    <li><strong>Recommendation:</strong> If a Quest port exists, use it. Performance is better and porting effort is lower.</li>
                    </ul>
                    <p class="mt-3"><strong>The Frame supports Android APKs</strong> – unique among SteamOS devices and opens the door to hundreds of existing Quest titles .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. ZUBEHÖR ============ */
        {
            id: 'section6',
            titleDe: '6. Zubehör & Erweiterbarkeit',
            titleEn: '6. Accessories & Expandability',
            introDe: 'Die <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> ist <strong>modular aufgebaut</strong> – fast alles lässt sich abnehmen, austauschen oder erweitern. Valve hat einen <strong>Expansion Bay</strong> am Kopf des Headsets vorgesehen, der zukünftige Module aufnehmen kann .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> is <strong>modularly built</strong> – almost everything can be removed, swapped, or expanded. Valve has provided an <strong>expansion bay</strong> at the top of the headset that can accommodate future modules .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Offizielles Zubehör',
                    titleEn: 'Official Accessories',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Zubehör</th><th class="w-1/4">Preis</th><th>Beschreibung</th></tr>
                    <tr><td><strong>USB-C 45W Netzteil</strong></td><td class="text-[var(--text-muted)]">$29</td><td class="text-[var(--text-muted)]">Mindestens 45 W erforderlich. Nicht im Lieferumfang .</td></tr>
                    <tr><td><strong>Ergonomic Accessories Kit</strong></td><td class="text-[var(--text-muted)]">$59</td><td class="text-[var(--text-muted)]">Top-Strap, größerer Lichtblocker, Velcro-Griffe für Controller .</td></tr>
                    <tr><td><strong>Arcturus Vision Kamera</strong></td><td class="text-[var(--text-muted)]">$149</td><td class="text-[var(--text-muted)]">Farb-Passthrough-Modul. Die Standard-Passthrough-Kameras sind nur Schwarz-Weiß .</td></tr>
                    <tr><td><strong>Zenni Sehstärken-Linsen</strong></td><td class="text-[var(--text-muted)]">ab $68</td><td class="text-[var(--text-muted)]">Individuelle Brillengläser zum Einsetzen. Erfordert Sehstärken-Rezept .</td></tr>
                    <tr><td><strong>Accessory Replacement Kit</strong></td><td class="text-[var(--text-muted)]">$49</td><td class="text-[var(--text-muted)]">Ersatz-Gesichtspolster und Zubehör .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tipp:</strong> Das <a href="https://www.zennioptical.com/" target="_blank" class="topic-link">Zenni</a>-Linsen-Set ist besonders für Brillenträger sinnvoll – man kann die Frame dann ohne Brille tragen .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Accessory</th><th class="w-1/4">Price</th><th>Description</th></tr>
                    <tr><td><strong>USB-C 45W power supply</strong></td><td class="text-[var(--text-muted)]">$29</td><td class="text-[var(--text-muted)]">At least 45W required. Not included .</td></tr>
                    <tr><td><strong>Ergonomic Accessories Kit</strong></td><td class="text-[var(--text-muted)]">$59</td><td class="text-[var(--text-muted)]">Top strap, larger light blocker, velcro grips for controllers .</td></tr>
                    <tr><td><strong>Arcturus Vision camera</strong></td><td class="text-[var(--text-muted)]">$149</td><td class="text-[var(--text-muted)]">Color passthrough module. Standard passthrough cameras are black-and-white only .</td></tr>
                    <tr><td><strong>Zenni prescription lenses</strong></td><td class="text-[var(--text-muted)]">from $68</td><td class="text-[var(--text-muted)]">Custom prescription lenses to insert. Requires prescription .</td></tr>
                    <tr><td><strong>Accessory Replacement Kit</strong></td><td class="text-[var(--text-muted)]">$49</td><td class="text-[var(--text-muted)]">Replacement face foam and accessories .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tip:</strong> The <a href="https://www.zennioptical.com/" target="_blank" class="topic-link">Zenni</a> lens set is especially useful for glasses wearers – you can then wear the Frame without glasses .</p>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Modularität & Expansion Bay',
                    titleEn: 'Modularity & Expansion Bay',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Frame ist so modular wie kaum ein anderes VR-Headset:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Gesichtspolster:</strong> Magnetisch, leicht abnehmbar, waschbar. Ersatz für $59 .</li>
                    <li><strong>Kopfbügel:</strong> Drei Schalter lösen die gesamte Bügeleinheit – Headset lässt sich auf Linsen + Display reduzieren .</li>
                    <li><strong>Akku:</strong> Sitzt im hinteren Bügel, USB-C-Port direkt am Akku – kein Kabelsalat .</li>
                    <li><strong>Expansion Bay:</strong> Freier Modul-Slot am Kopf des Headsets. Valve hat noch nicht verraten, was dort alles reinpasst – aber Kamera-Module sind bestätigt .</li>
                    <li><strong>microSD:</strong> Slot an der Unterseite für Speichererweiterung .</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Die Frame ist reparierbarer und erweiterbarer als Quest 3 oder Vision Pro – ein echtes „PC-artiges“ Gerät .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The Frame is more modular than almost any other VR headset:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Face foam:</strong> Magnetic, easily removable, washable. Replacement for $59 .</li>
                    <li><strong>Headstrap:</strong> Three switches release the entire strap assembly – headset can be reduced to lenses + display .</li>
                    <li><strong>Battery:</strong> Sits in the rear strap, USB-C port directly on the battery – no cable mess .</li>
                    <li><strong>Expansion Bay:</strong> Free module slot at the top of the headset. Valve hasn't revealed everything that fits – but camera modules are confirmed .</li>
                    <li><strong>microSD:</strong> Slot on the bottom for storage expansion .</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> The Frame is more repairable and expandable than Quest 3 or Vision Pro – a truly "PC-like" device .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Frame</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Snapdragon 8 Gen 3, 16 GB RAM, 2160×2160 LCD pro Auge, 72–120 Hz (144 Hz experimentell), Eye-Tracking.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tag opacity-70"></i><span>2. Preis</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">$1.059 (256 GB) / $1.299 (1 TB). Netzteil NICHT enthalten. Mit Zubehör schnell >$1.500.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-wifi opacity-70"></i><span>3. Streaming</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Wi-Fi 6E-Adapter (6 GHz) für PC-VR und 2D-Steam-Desktop. Kein VR-Ready-PC nötig – läuft auch standalone.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-eye opacity-70"></i><span>4. Foveated Rendering</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Eye-Tracking für Foveated Rendering/Streaming. Bis zu 30% mehr Performance in unterstützten Spielen. Kein Hand-Tracking.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Snapdragon 8 Gen 3, 16 GB RAM, 2160×2160 LCD per eye, 72–120 Hz (144 Hz experimental), eye tracking.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tag opacity-70"></i><span>2. Price</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">$1,059 (256 GB) / $1,299 (1 TB). Power supply NOT included. With accessories quickly >$1,500.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-wifi opacity-70"></i><span>3. Streaming</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Wi-Fi 6E adapter (6 GHz) for PC VR and 2D Steam desktop. No VR-ready PC needed – runs standalone too.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-eye opacity-70"></i><span>4. Foveated Rendering</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Eye tracking for foveated rendering/streaming. Up to 30% more performance in supported games. No hand tracking.</p>
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
            { icon: 'fa-gamepad',  href: 'https://store.steampowered.com/app/546560/HalfLife_Alyx/', target: '_blank', labelDe: 'Half-Life: Alyx',         labelEn: 'Half-Life: Alyx' },
            { icon: 'fa-balance-scale', href: 'https://www.protondb.com/',                         target: '_blank', labelDe: 'ProtonDB (Kompatibilität)', labelEn: 'ProtonDB (Compatibility)' },
            { icon: 'fa-eye',      href: 'https://github.com/ValveSoftware/Proton',                 target: '_blank', labelDe: 'Proton (GitHub)',          labelEn: 'Proton (GitHub)' },
            { icon: 'fa-microchip', href: 'https://www.qualcomm.com/products/mobile/snapdragon/smartphones/snapdragon-8-series-mobile-platforms/snapdragon-8-gen-3-mobile-platform', target: '_blank', labelDe: 'Snapdragon 8 Gen 3', labelEn: 'Snapdragon 8 Gen 3' }
        ]
    },

    footer: {
        textDe: 'Steam Frame Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Steam Frame Reference · v1.0 · Dual Lang · 2026'
    }
});