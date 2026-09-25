// resources/topics/topic_steamdeck.js
// Registers the Steam Deck reference topic. Loaded via <script> injection.

/* ==================================================================
   STEAM DECK CODE-BLOCK COPY CONTROLLER
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
    id: 'Steam Deck Overview',
    icon: 'fa-gamepad',
    titleDe: 'Steam Deck',
    titleEn: 'Steam Deck',
    descDe: 'Handheld-PC & SteamOS-Guide',
    descEn: 'Handheld PC & SteamOS Guide',

    sidebarTitleDe: 'Steam Deck',
    sidebarTitleEn: 'Steam Deck',
    sidebarSubtitleDe: '2026 Edition',
    sidebarSubtitleEn: '2026 Edition',
    sidebarVersion: 'OLED / SteamOS 3.7+',

    hero: {
        titleDe: 'Steam Deck: Der komplette 2026-Guide',
        titleEn: 'Steam Deck: The Complete 2026 Guide',
        introDe: '<a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> ist Valves <strong>Handheld-PC für PC-Spiele</strong>, der SteamOS mit einer konsolenähnlichen Oberfläche kombiniert. Seit dem Launch 2022 hat sich das Gerät von einer Nischen-Hardware zu einer ganzen Produktfamilie entwickelt – mit <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">LCD- und OLED-Modellen</a>, dem offiziellen <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a> und einer wachsenden Zahl von SteamOS-Handhelds anderer Hersteller. Dieser Guide deckt alles ab: Hardware-Generationen, Software-Optimierung, Community-Plugins über <a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a> und alternative Betriebssysteme wie <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> und <a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a>.',
        introEn: '<a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> is Valve\'s <strong>handheld PC for PC games</strong>, combining SteamOS with a console-like interface. Since its 2022 launch, the device has grown from niche hardware into a whole product family – with <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">LCD and OLED models</a>, the official <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Machine</a>, and a growing number of SteamOS handhelds from other manufacturers. This guide covers everything: hardware generations, software optimization, community plugins via <a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a>, and alternative operating systems like <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> and <a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a>.'
    },

    quickLinks: [
        { icon: 'fa-microchip',         href: '#section1', switchToDoc: true, labelDe: 'Hardware',       labelEn: 'Hardware' },
        { icon: 'fa-paint-brush',       href: '#section2', switchToDoc: true, labelDe: 'Modelle',        labelEn: 'Models' },
        { icon: 'fa-puzzle-piece',      href: '#section3', switchToDoc: true, labelDe: 'Decky Loader',   labelEn: 'Decky Loader' },
        { icon: 'fa-tachometer-alt',    href: '#section4', switchToDoc: true, labelDe: 'Tweaks & Config', labelEn: 'Tweaks & Config' },
        { icon: 'fa-linux',             href: '#section5', switchToDoc: true, labelDe: 'Alternative OS', labelEn: 'Alternative OS' },
        { icon: 'fa-forward',           href: '#section6', switchToDoc: true, labelDe: 'Zukunft',        labelEn: 'Future' },
        { icon: 'fa-external-link-alt', href: 'https://www.steamdeck.com/', target: '_blank', labelDe: 'Offizielle Seite', labelEn: 'Official Site' }
    ],

    sections: [
        /* ============ 1. HARDWARE ============ */
        {
            id: 'section1',
            titleDe: '1. Hardware & Architektur',
            titleEn: '1. Hardware & Architecture',
            introDe: 'Der <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> basiert auf einem <strong>kundenspezifischen AMD-APU</strong> (Zen 2 CPU + RDNA 2 GPU) und läuft mit <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a>, einer <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a>-basierten Distribution mit <a href="https://kde.org/plasma-desktop/" target="_blank" class="topic-link">KDE Plasma</a> im Desktop-Modus. Die Hardware wurde für <strong>4–15 W TDP</strong> optimiert – ein Kompromiss zwischen Leistung und Akkulaufzeit, der die gesamte Design-Philosophie prägt [citation:6][citation:14].',
            introEn: 'The <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> is built on a <strong>custom AMD APU</strong> (Zen 2 CPU + RDNA 2 GPU) and runs <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS 3</a>, an <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a>-based distribution with <a href="https://kde.org/plasma-desktop/" target="_blank" class="topic-link">KDE Plasma</a> in desktop mode. The hardware is optimized for <strong>4–15W TDP</strong> – a compromise between performance and battery life that defines the entire design philosophy [citation:6][citation:14].',
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
                    <tr><th class="w-1/4">Komponente</th><th class="w-1/3">LCD (2022)</th><th class="w-1/3">OLED (2023)</th></tr>
                    <tr><td><strong>APU</strong></td><td class="text-[var(--text-muted)]">7 nm AMD Zen 2 (4c/8t) + RDNA 2 (8 CU)</td><td class="text-[var(--text-muted)]">6 nm AMD Zen 2 (4c/8t) + RDNA 2 (8 CU)</td></tr>
                    <tr><td><strong>RAM</strong></td><td class="text-[var(--text-muted)]">16 GB LPDDR5 (6400 MT/s)</td><td class="text-[var(--text-muted)]">16 GB LPDDR5 (6400 MT/s)</td></tr>
                    <tr><td><strong>Display</strong></td><td class="text-[var(--text-muted)]">7" LCD, 1280×800, bis 60 Hz</td><td class="text-[var(--text-muted)]">7,4" <a href="https://en.wikipedia.org/wiki/OLED" target="_blank" class="topic-link">HDR OLED</a>, 1280×800, bis 90 Hz, 1000 nits</td></tr>
                    <tr><td><strong>Speicher</strong></td><td class="text-[var(--text-muted)]">256 GB / 512 GB NVMe SSD</td><td class="text-[var(--text-muted)]">512 GB / 1 TB NVMe SSD</td></tr>
                    <tr><td><strong>Akku</strong></td><td class="text-[var(--text-muted)]">40 Wh, 2–8 h Spielzeit</td><td class="text-[var(--text-muted)]">50 Wh, 3–12 h Spielzeit</td></tr>
                    <tr><td><strong>WLAN</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Wi-Fi_5" target="_blank" class="topic-link">Wi-Fi 5</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Wi-Fi_6E" target="_blank" class="topic-link">Wi-Fi 6E</a> (bis 3× schneller)</td></tr>
                    <tr><td><strong>Bluetooth</strong></td><td class="text-[var(--text-muted)]">5.0</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Bluetooth#Bluetooth_5.3" target="_blank" class="topic-link">5.3</a></td></tr>
                    <tr><td><strong>Gewicht</strong></td><td class="text-[var(--text-muted)]">~669 g</td><td class="text-[var(--text-muted)]">~640 g (30 g leichter)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Alle Modelle verfügen über einen <strong>microSD-Kartensteckplatz</strong>, USB-C mit DisplayPort 1.4 (bis 8K@60Hz), 3,5-mm-Klinkenbuchse und zwei Trackpads mit haptischem Feedback [citation:6][citation:14].</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Component</th><th class="w-1/3">LCD (2022)</th><th class="w-1/3">OLED (2023)</th></tr>
                    <tr><td><strong>APU</strong></td><td class="text-[var(--text-muted)]">7 nm AMD Zen 2 (4c/8t) + RDNA 2 (8 CU)</td><td class="text-[var(--text-muted)]">6 nm AMD Zen 2 (4c/8t) + RDNA 2 (8 CU)</td></tr>
                    <tr><td><strong>RAM</strong></td><td class="text-[var(--text-muted)]">16 GB LPDDR5 (6400 MT/s)</td><td class="text-[var(--text-muted)]">16 GB LPDDR5 (6400 MT/s)</td></tr>
                    <tr><td><strong>Display</strong></td><td class="text-[var(--text-muted)]">7" LCD, 1280×800, up to 60 Hz</td><td class="text-[var(--text-muted)]">7.4" <a href="https://en.wikipedia.org/wiki/OLED" target="_blank" class="topic-link">HDR OLED</a>, 1280×800, up to 90 Hz, 1000 nits</td></tr>
                    <tr><td><strong>Storage</strong></td><td class="text-[var(--text-muted)]">256 GB / 512 GB NVMe SSD</td><td class="text-[var(--text-muted)]">512 GB / 1 TB NVMe SSD</td></tr>
                    <tr><td><strong>Battery</strong></td><td class="text-[var(--text-muted)]">40 Wh, 2–8 h gameplay</td><td class="text-[var(--text-muted)]">50 Wh, 3–12 h gameplay</td></tr>
                    <tr><td><strong>Wi-Fi</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Wi-Fi_5" target="_blank" class="topic-link">Wi-Fi 5</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Wi-Fi_6E" target="_blank" class="topic-link">Wi-Fi 6E</a> (up to 3× faster)</td></tr>
                    <tr><td><strong>Bluetooth</strong></td><td class="text-[var(--text-muted)]">5.0</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Bluetooth#Bluetooth_5.3" target="_blank" class="topic-link">5.3</a></td></tr>
                    <tr><td><strong>Weight</strong></td><td class="text-[var(--text-muted)]">~669 g</td><td class="text-[var(--text-muted)]">~640 g (30 g lighter)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">All models feature a <strong>microSD card slot</strong>, USB-C with DisplayPort 1.4 (up to 8K@60Hz), 3.5mm headphone jack, and two trackpads with haptic feedback [citation:6][citation:14].</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'SteamOS 3 Architektur',
                    titleEn: 'SteamOS 3 Architecture',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Kernkomponenten von SteamOS 3:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Basis:</strong> <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a> mit <a href="https://www.freedesktop.org/wiki/Software/systemd/" target="_blank" class="topic-link">systemd</a> – rolling release, aber Valve kontrolliert die Updates.</li>
                    <li><strong>Gamescope:</strong> Wayland-Compositor, der Gaming Mode rendert. Ermöglicht FSR, HDR und Frame-Limiting auf Compositor-Ebene.</li>
                    <li><strong>Proton:</strong> Valves <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">Kompatibilitätsschicht</a> für Windows-Spiele. Basiert auf <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> + <a href="https://github.com/doitsujin/dxvk" target="_blank" class="topic-link">DXVK</a> + <a href="https://github.com/HansKristian-Work/vkd3d-proton" target="_blank" class="topic-link">VKD3D-Proton</a>.</li>
                    <li><strong>Gaming Mode:</strong> Konsolenähnliche Oberfläche auf <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>-Basis, startet direkt in den Big Picture-Modus.</li>
                    <li><strong>Desktop Mode:</strong> Vollständiges <a href="https://kde.org/plasma-desktop/" target="_blank" class="topic-link">KDE Plasma</a> mit <a href="https://apps.kde.org/dolphin/" target="_blank" class="topic-link">Dolphin</a>, <a href="https://konsole.kde.org/" target="_blank" class="topic-link">Konsole</a> und <a href="https://discover.kde.org/" target="_blank" class="topic-link">Discover</a> (Paketmanager).</li>
                    <li><strong>Gamescope Session:</strong> Kann auch im Desktop Mode gestartet werden für FSR und HDR auf externen Displays.</li>
                    </ul>
                    <p class="mt-3">Die aktuelle stabile Version ist <strong>SteamOS 3.7.20</strong> (März 2026), die unter anderem den <code>ntsync</code>-Treiber für bessere Windows-Kompatibilität mitbringt [citation:7].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Core components of SteamOS 3:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Base:</strong> <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a> with <a href="https://www.freedesktop.org/wiki/Software/systemd/" target="_blank" class="topic-link">systemd</a> – rolling release, but Valve controls updates.</li>
                    <li><strong>Gamescope:</strong> Wayland compositor that renders Gaming Mode. Enables FSR, HDR, and frame limiting at compositor level.</li>
                    <li><strong>Proton:</strong> Valve's <a href="https://github.com/ValveSoftware/Proton" target="_blank" class="topic-link">compatibility layer</a> for Windows games. Based on <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> + <a href="https://github.com/doitsujin/dxvk" target="_blank" class="topic-link">DXVK</a> + <a href="https://github.com/HansKristian-Work/vkd3d-proton" target="_blank" class="topic-link">VKD3D-Proton</a>.</li>
                    <li><strong>Gaming Mode:</strong> Console-like interface on <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a> basis, boots directly into Big Picture mode.</li>
                    <li><strong>Desktop Mode:</strong> Full <a href="https://kde.org/plasma-desktop/" target="_blank" class="topic-link">KDE Plasma</a> with <a href="https://apps.kde.org/dolphin/" target="_blank" class="topic-link">Dolphin</a>, <a href="https://konsole.kde.org/" target="_blank" class="topic-link">Konsole</a>, and <a href="https://discover.kde.org/" target="_blank" class="topic-link">Discover</a> (package manager).</li>
                    <li><strong>Gamescope Session:</strong> Can also be started in Desktop Mode for FSR and HDR on external displays.</li>
                    </ul>
                    <p class="mt-3">The current stable version is <strong>SteamOS 3.7.20</strong> (March 2026), which brings the <code>ntsync</code> driver for better Windows compatibility, among other things [citation:7].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. MODELLE ============ */
        {
            id: 'section2',
            titleDe: '2. Modelle & Generationen',
            titleEn: '2. Models & Generations',
            introDe: 'Der <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> ist in zwei Hauptgenerationen erhältlich: dem ursprünglichen <strong>LCD-Modell</strong> (2022) und dem <strong>OLED-Modell</strong> (2023). Daneben gibt es SteamOS-Handhelds von Drittanbietern wie das <a href="https://www.lenovo.com/" target="_blank" class="topic-link">Lenovo Legion Go S</a> [citation:15].',
            introEn: 'The <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> is available in two main generations: the original <strong>LCD model</strong> (2022) and the <strong>OLED model</strong> (2023). There are also third-party SteamOS handhelds like the <a href="https://www.lenovo.com/" target="_blank" class="topic-link">Lenovo Legion Go S</a> [citation:15].',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'LCD vs. OLED',
                    titleEn: 'LCD vs. OLED',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Merkmal</th><th class="w-1/3">LCD (2022)</th><th class="w-1/3">OLED (2023)</th></tr>
                    <tr><td><strong>Display</strong></td><td class="text-[var(--text-muted)]">7" LCD, 60 Hz</td><td class="text-[var(--text-muted)]">7,4" HDR OLED, 90 Hz</td></tr>
                    <tr><td><strong>Helligkeit</strong></td><td class="text-[var(--text-muted)]">~400 nits</td><td class="text-[var(--text-muted)]">1000 nits (HDR), 600 nits (SDR)</td></tr>
                    <tr><td><strong>Kontrast</strong></td><td class="text-[var(--text-muted)]">~1000:1</td><td class="text-[var(--text-muted)]">&gt;1.000.000:1</td></tr>
                    <tr><td><strong>APU</strong></td><td class="text-[var(--text-muted)]">7 nm (weniger effizient)</td><td class="text-[var(--text-muted)]">6 nm (30–50 % bessere Akkulaufzeit)</td></tr>
                    <tr><td><strong>Akku</strong></td><td class="text-[var(--text-muted)]">40 Wh</td><td class="text-[var(--text-muted)]">50 Wh (+25 %)</td></tr>
                    <tr><td><strong>WLAN</strong></td><td class="text-[var(--text-muted)]">Wi-Fi 5</td><td class="text-[var(--text-muted)]">Wi-Fi 6E (3× schnellere Downloads)</td></tr>
                    <tr><td><strong>Gewicht</strong></td><td class="text-[var(--text-muted)]">~669 g</td><td class="text-[var(--text-muted)]">~640 g</td></tr>
                    <tr><td><strong>Preis (UVP)</strong></td><td class="text-[var(--text-muted)]">ab 419 €</td><td class="text-[var(--text-muted)]">ab 569 €</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Empfehlung 2026:</strong> Das OLED-Modell ist die klar bessere Wahl – besseres Display, längere Akkulaufzeit, schnellere Downloads. Das LCD-Modell bleibt eine solide Budget-Option, besonders gebraucht.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th class="w-1/3">LCD (2022)</th><th class="w-1/3">OLED (2023)</th></tr>
                    <tr><td><strong>Display</strong></td><td class="text-[var(--text-muted)]">7" LCD, 60 Hz</td><td class="text-[var(--text-muted)]">7.4" HDR OLED, 90 Hz</td></tr>
                    <tr><td><strong>Brightness</strong></td><td class="text-[var(--text-muted)]">~400 nits</td><td class="text-[var(--text-muted)]">1000 nits (HDR), 600 nits (SDR)</td></tr>
                    <tr><td><strong>Contrast</strong></td><td class="text-[var(--text-muted)]">~1000:1</td><td class="text-[var(--text-muted)]">&gt;1,000,000:1</td></tr>
                    <tr><td><strong>APU</strong></td><td class="text-[var(--text-muted)]">7 nm (less efficient)</td><td class="text-[var(--text-muted)]">6 nm (30–50% better battery life)</td></tr>
                    <tr><td><strong>Battery</strong></td><td class="text-[var(--text-muted)]">40 Wh</td><td class="text-[var(--text-muted)]">50 Wh (+25%)</td></tr>
                    <tr><td><strong>Wi-Fi</strong></td><td class="text-[var(--text-muted)]">Wi-Fi 5</td><td class="text-[var(--text-muted)]">Wi-Fi 6E (3× faster downloads)</td></tr>
                    <tr><td><strong>Weight</strong></td><td class="text-[var(--text-muted)]">~669 g</td><td class="text-[var(--text-muted)]">~640 g</td></tr>
                    <tr><td><strong>Price (MSRP)</strong></td><td class="text-[var(--text-muted)]">from $399</td><td class="text-[var(--text-muted)]">from $549</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>2026 recommendation:</strong> The OLED model is clearly the better choice – better display, longer battery life, faster downloads. The LCD model remains a solid budget option, especially used.</p>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Steam Machine & SteamOS-Handhelds',
                    titleEn: 'Steam Machine & SteamOS Handhelds',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Steam Machine (2026):</strong></p>
                    <p class="mb-2">Valves stationäre Konsole im Konsolenformat. Erhältlich in zwei Varianten:</p>
                    <ul class="list-disc pl-4 space-y-1 mt-1 mb-3">
                    <li><strong>512 GB:</strong> 1.049 $</li>
                    <li><strong>2 TB:</strong> 1.349 $</li>
                    <li><strong>Hardware:</strong> Custom AMD Zen 4 (6 Kerne) + RDNA 3 GPU (28 CUs)</li>
                    <li><strong>Betriebssystem:</strong> SteamOS 3 (identisch zum Deck)</li>
                    </ul>
                    <p class="mb-2"><strong>SteamOS-Handhelds von Drittanbietern:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong><a href="https://www.lenovo.com/" target="_blank" class="topic-link">Lenovo Legion Go S</a></strong> – erstes Nicht-Valve-Gerät mit offizieller SteamOS-Lizenz („Powered by SteamOS“). Preis ab 1.199 $, Release Juni 2026 [citation:15].</li>
                    <li><strong><a href="https://rog.asus.com/" target="_blank" class="topic-link">ASUS ROG Ally</a></strong> – offiziell nur Windows, aber Bazzite/CachyOS laufen darauf hervorragend [citation:4].</li>
                    <li><strong>Weitere:</strong> AYANEO, GPD, OneXPlayer – meist Windows, teilweise mit SteamOS-Community-Builds.</li>
                    </ul>
                    <p class="mt-3">Die „Powered by SteamOS“-Zertifizierung ist Valves Weg, das Ökosystem zu öffnen, ohne die Kontrolle über die Software abzugeben [citation:18].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Steam Machine (2026):</strong></p>
                    <p class="mb-2">Valve's stationary console. Available in two variants:</p>
                    <ul class="list-disc pl-4 space-y-1 mt-1 mb-3">
                    <li><strong>512 GB:</strong> $1,049</li>
                    <li><strong>2 TB:</strong> $1,349</li>
                    <li><strong>Hardware:</strong> Custom AMD Zen 4 (6 cores) + RDNA 3 GPU (28 CUs)</li>
                    <li><strong>OS:</strong> SteamOS 3 (identical to Deck)</li>
                    </ul>
                    <p class="mb-2"><strong>Third-party SteamOS handhelds:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong><a href="https://www.lenovo.com/" target="_blank" class="topic-link">Lenovo Legion Go S</a></strong> – first non-Valve device with official SteamOS license ("Powered by SteamOS"). Price from $1,199, release June 2026 [citation:15].</li>
                    <li><strong><a href="https://rog.asus.com/" target="_blank" class="topic-link">ASUS ROG Ally</a></strong> – officially Windows-only, but Bazzite/CachyOS run excellently on it [citation:4].</li>
                    <li><strong>Others:</strong> AYANEO, GPD, OneXPlayer – mostly Windows, some with SteamOS community builds.</li>
                    </ul>
                    <p class="mt-3">The "Powered by SteamOS" certification is Valve's way of opening up the ecosystem without giving up software control [citation:18].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. DECKY LOADER ============ */
        {
            id: 'section3',
            titleDe: '3. Decky Loader & Plugins',
            titleEn: '3. Decky Loader & Plugins',
            introDe: '<a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a> ist ein <strong>Community-Plugin-Manager</strong> für <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a> und <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a>. Er fügt einen Plugin-Store direkt ins Quick Access Menu ein und ermöglicht System-Tweaks, Performance-Tools und Quality-of-Life-Features ohne tiefe Systemkenntnisse [citation:3][citation:11].',
            introEn: '<a href="https://decky.xyz/" target="_blank" class="topic-link">Decky Loader</a> is a <strong>community plugin manager</strong> for <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a> and <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a>. It adds a plugin store directly to the Quick Access Menu and enables system tweaks, performance tools, and quality-of-life features without deep system knowledge [citation:3][citation:11].',
            subtopics: [
                {
                    id: 'subsection3_1',
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
                    <p class="mt-2">Bazzite hat einen eigenen Befehl, der die Integration testet und sicherstellt, dass Decky korrekt in die Gaming-Oberfläche eingebunden wird [citation:13].</p>
                    <p class="mt-3"><strong>Wichtige Warnungen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Nur von <strong>decky.xyz</strong> oder <strong>deckbrew.xyz</strong> herunterladen – andere Domains sind nicht offiziell [citation:13].</li>
                    <li>Nach einem <strong>SteamOS-Update</strong> kann Decky verschwinden. Einfach den Installer erneut ausführen – er repariert die Integration [citation:13].</li>
                    <li>Keine Plugins aus unsicheren Quellen installieren – der offizielle Plugin-Store hat eine Code-Überprüfung [citation:13].</li>
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
                    <p class="mt-2">Bazzite has its own command that tests the integration and ensures Decky is correctly embedded in the gaming interface [citation:13].</p>
                    <p class="mt-3"><strong>Important warnings:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Only download from <strong>decky.xyz</strong> or <strong>deckbrew.xyz</strong> – other domains are not official [citation:13].</li>
                    <li>After a <strong>SteamOS update</strong>, Decky may disappear. Simply run the installer again – it repairs the integration [citation:13].</li>
                    <li>Don't install plugins from untrusted sources – the official plugin store has code review [citation:13].</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Empfohlene Plugins',
                    titleEn: 'Recommended Plugins',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Funktion</th></tr>
                    <tr><td><strong><a href="https://github.com/DeckThemes/CSSLoader-Desktop" target="_blank" class="topic-link">CSS Loader</a></strong></td><td class="text-[var(--text-muted)]">Themes und UI-Anpassungen für SteamOS. Abgerundete Ecken, Batterie-Prozente statt Icon, benutzerdefinierte Layouts [citation:11].</td></tr>
                    <tr><td><strong><a href="https://github.com/NGnius/PowerTools" target="_blank" class="topic-link">PowerTools</a></strong></td><td class="text-[var(--text-muted)]">CPU-Threads begrenzen, Taktraten deckeln, SMT togglen. Pro Spiel speicherbar – essenziell für Akku-Optimierung [citation:11].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">HLTB (How Long to Beat)</a></strong></td><td class="text-[var(--text-muted)]">Zeigt durchschnittliche Spielzeit direkt auf der Bibliotheksseite – hilfreich bei Backlog-Entscheidungen [citation:3][citation:11].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamGridDB/decky-steamgriddb" target="_blank" class="topic-link">SteamGridDB</a></strong></td><td class="text-[var(--text-muted)]">Fehlende Artworks, Logos und Grid-Bilder für Nicht-Steam-Spiele [citation:3].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">ProtonDB Badges</a></strong></td><td class="text-[var(--text-muted)]">Zeigt ProtonDB-Kompatibilitätsbewertungen direkt auf der Spielseite [citation:19].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">Storage Cleaner</a></strong></td><td class="text-[var(--text-muted)]">Shader-Cache und Kompatibilitätsdaten visualisieren und löschen – spart Speicherplatz [citation:19].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">VPN Deck</a></strong></td><td class="text-[var(--text-muted)]">WireGuard/OpenVPN direkt aus dem Gaming Mode steuern [citation:19].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">NonSteamLaunchers</a></strong></td><td class="text-[var(--text-muted)]">Epic, GOG, Battle.net und andere Launcher in SteamOS integrieren [citation:3].</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tipp:</strong> Nicht zu viele Plugins installieren – jedes Plugin läuft im Hintergrund und kann die Akkulaufzeit beeinflussen. Qualität vor Quantität [citation:11].</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Function</th></tr>
                    <tr><td><strong><a href="https://github.com/DeckThemes/CSSLoader-Desktop" target="_blank" class="topic-link">CSS Loader</a></strong></td><td class="text-[var(--text-muted)]">Themes and UI tweaks for SteamOS. Rounded corners, battery percentage instead of icon, custom layouts [citation:11].</td></tr>
                    <tr><td><strong><a href="https://github.com/NGnius/PowerTools" target="_blank" class="topic-link">PowerTools</a></strong></td><td class="text-[var(--text-muted)]">Limit CPU threads, cap clock speeds, toggle SMT. Save per game – essential for battery optimization [citation:11].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">HLTB (How Long to Beat)</a></strong></td><td class="text-[var(--text-muted)]">Shows average playtime directly on library page – helpful for backlog decisions [citation:3][citation:11].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamGridDB/decky-steamgriddb" target="_blank" class="topic-link">SteamGridDB</a></strong></td><td class="text-[var(--text-muted)]">Missing artwork, logos, and grid images for non-Steam games [citation:3].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">ProtonDB Badges</a></strong></td><td class="text-[var(--text-muted)]">Shows ProtonDB compatibility ratings directly on game page [citation:19].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">Storage Cleaner</a></strong></td><td class="text-[var(--text-muted)]">Visualize and clear shader cache and compatibility data – saves storage space [citation:19].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">VPN Deck</a></strong></td><td class="text-[var(--text-muted)]">Control WireGuard/OpenVPN directly from Gaming Mode [citation:19].</td></tr>
                    <tr><td><strong><a href="https://github.com/SteamDeckHomebrew/decky-loader" target="_blank" class="topic-link">NonSteamLaunchers</a></strong></td><td class="text-[var(--text-muted)]">Integrate Epic, GOG, Battle.net and other launchers into SteamOS [citation:3].</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tip:</strong> Don't install too many plugins – each runs in the background and can affect battery life. Quality over quantity [citation:11].</p>
                    `
                }
            ]
        },

        /* ============ 4. TWEAKS & CONFIG ============ */
        {
            id: 'section4',
            titleDe: '4. Tweaks & Konfiguration',
            titleEn: '4. Tweaks & Configuration',
            introDe: 'Die wichtigsten Optimierungen für <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> betreffen <strong>TDP, FPS-Limits und Display-Einstellungen</strong>. Richtig eingestellt kann man 20–40 % mehr Akkulaufzeit herausholen, ohne die Spielbarkeit zu opfern [citation:5].',
            introEn: 'The most important optimizations for <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> concern <strong>TDP, FPS limits, and display settings</strong>. Configured correctly, you can get 20–40% more battery life without sacrificing playability [citation:5].',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Performance-Tuning',
                    titleEn: 'Performance Tuning',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Die 9 Schritte zur optimalen Konfiguration:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2">
                    <li><strong>TDP-Limit setzen:</strong> 8–10 W für Indies, 12–15 W für AAA-Titel. Über das Quick Access Menu (Batterie-Symbol).</li>
                    <li><strong>FPS-Limit aktivieren:</strong> 40 FPS für AAA, 60 FPS für Indies. 40 Hz + 40 FPS ist der beste Kompromiss aus Flüssigkeit und Akku.</li>
                    <li><strong>Refresh-Rate anpassen:</strong> 40 Hz bei 40 FPS-Limit, 60 Hz bei 60 FPS. Kein Vielfaches = Micro-Tearing [citation:5].</li>
                    <li><strong>FSR nutzen:</strong> In-Game FSR bevorzugen, wenn verfügbar. System-FSR nur für Spiele ohne eigene Skalierung [citation:5].</li>
                    <li><strong>Auflösung skalieren:</strong> 800p nativ, oder 720p mit FSR. Nie unter 540p – sonst zu unscharf.</li>
                    <li><strong>GPU-Clock manuell:</strong> Nur bei Problemen. Meist schlägt die automatische Verwaltung manuelle Werte [citation:5].</li>
                    <li><strong>Helligkeit reduzieren:</strong> OLED bei 50–70 % statt 100 % – spart massiv Akku.</li>
                    <li><strong>WLAN/Bluetooth aus:</strong> Wenn nicht gebraucht, ausschalten. Beide ziehen konstant Strom.</li>
                    <li><strong>Ladelimit 80 %:</strong> In den Einstellungen aktivieren für längere Akku-Lebensdauer [citation:5].</li>
                    </ol>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>The 9 steps to optimal configuration:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2">
                    <li><strong>Set TDP limit:</strong> 8–10W for indies, 12–15W for AAA titles. Via Quick Access Menu (battery icon).</li>
                    <li><strong>Enable FPS limit:</strong> 40 FPS for AAA, 60 FPS for indies. 40 Hz + 40 FPS is the best compromise between smoothness and battery.</li>
                    <li><strong>Adjust refresh rate:</strong> 40 Hz at 40 FPS limit, 60 Hz at 60 FPS. Non-multiple = micro-tearing [citation:5].</li>
                    <li><strong>Use FSR:</strong> Prefer in-game FSR when available. System FSR only for games without their own scaling [citation:5].</li>
                    <li><strong>Scale resolution:</strong> 800p native, or 720p with FSR. Never below 540p – too blurry.</li>
                    <li><strong>Manual GPU clock:</strong> Only when troubleshooting. Auto management usually beats manual values [citation:5].</li>
                    <li><strong>Reduce brightness:</strong> OLED at 50–70% instead of 100% – massive battery savings.</li>
                    <li><strong>Turn off Wi-Fi/Bluetooth:</strong> When not needed, disable both. They draw constant power.</li>
                    <li><strong>Set charge limit to 80%:</strong> Enable in settings for longer battery lifespan [citation:5].</li>
                    </ol>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Häufige Probleme & Lösungen',
                    titleEn: 'Common Issues & Solutions',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Problem</th><th>Lösung</th></tr>
                    <tr><td><strong>Tearing trotz Refresh-Sync</strong></td><td class="text-[var(--text-muted)]">Refresh-Rate muss ein exaktes Vielfaches des FPS-Limits sein. 40 FPS → 40 Hz (nicht 60 Hz) [citation:5].</td></tr>
                    <tr><td><strong>Bild unscharf nach FSR</strong></td><td class="text-[var(--text-muted)]">Schärfe auf 1–2 reduzieren oder interne Auflösung erhöhen. Zu aggressives Upscaling verschlechtert die Qualität [citation:5].</td></tr>
                    <tr><td><strong>Profil wird nicht gespeichert</strong></td><td class="text-[var(--text-muted)]">Spiel komplett beenden (nicht nur minimieren), damit SteamOS die Konfiguration auf die Festplatte schreibt [citation:5].</td></tr>
                    <tr><td><strong>Akku entlädt schneller als erwartet</strong></td><td class="text-[var(--text-muted)]">WLAN/Bluetooth prüfen, Helligkeit reduzieren. OLED bei 100 % Helligkeit zieht mehr als jedes TDP-Limit spart [citation:5].</td></tr>
                    <tr><td><strong>Spiel crasht nach GPU-Clock</strong></td><td class="text-[var(--text-muted)]">Manuellen GPU-Clock deaktivieren. Nicht alle Spiele vertragen feste Taktraten [citation:5].</td></tr>
                    <tr><td><strong>Overlay erscheint nicht</strong></td><td class="text-[var(--text-muted)]">Overlay-Level in Performance-Einstellungen prüfen. Manche Spiele verstecken es im Exklusiv-Vollbild [citation:5].</td></tr>
                    <tr><td><strong>Einstellungen nach Update zurückgesetzt</strong></td><td class="text-[var(--text-muted)]">Bekanntes Verhalten nach Major-Updates. Profil neu erstellen und „Use per-game profile“ erneut aktivieren [citation:5].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Problem</th><th>Solution</th></tr>
                    <tr><td><strong>Tearing despite refresh sync</strong></td><td class="text-[var(--text-muted)]">Refresh rate must be an exact multiple of FPS limit. 40 FPS → 40 Hz (not 60 Hz) [citation:5].</td></tr>
                    <tr><td><strong>Image blurry after FSR</strong></td><td class="text-[var(--text-muted)]">Reduce sharpness to 1–2 or increase internal resolution. Too aggressive upscaling worsens quality [citation:5].</td></tr>
                    <tr><td><strong>Profile not saving</strong></td><td class="text-[var(--text-muted)]">Fully exit game (not just minimize) so SteamOS writes config to disk [citation:5].</td></tr>
                    <tr><td><strong>Battery drains faster than expected</strong></td><td class="text-[var(--text-muted)]">Check Wi-Fi/Bluetooth, reduce brightness. OLED at 100% brightness draws more than any TDP limit saves [citation:5].</td></tr>
                    <tr><td><strong>Game crashes after GPU clock</strong></td><td class="text-[var(--text-muted)]">Disable manual GPU clock. Not all games tolerate fixed clock speeds [citation:5].</td></tr>
                    <tr><td><strong>Overlay not appearing</strong></td><td class="text-[var(--text-muted)]">Check overlay level in performance settings. Some games hide it in exclusive fullscreen [citation:5].</td></tr>
                    <tr><td><strong>Settings reset after update</strong></td><td class="text-[var(--text-muted)]">Known behavior after major updates. Recreate profile and re-enable "Use per-game profile" [citation:5].</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. ALTERNATIVE OS ============ */
        {
            id: 'section5',
            titleDe: '5. Alternative Betriebssysteme',
            titleEn: '5. Alternative Operating Systems',
            introDe: 'Obwohl <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a> für die meisten Nutzer die beste Wahl ist, gibt es <strong>zwei ernstzunehmende Alternativen</strong>: <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> für maximale Stabilität und <a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a> für maximale Performance [citation:4][citation:12].',
            introEn: 'Although <a href="https://store.steampowered.com/steamos" target="_blank" class="topic-link">SteamOS</a> is the best choice for most users, there are <strong>two serious alternatives</strong>: <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> for maximum stability and <a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a> for maximum performance [citation:4][citation:12].',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Bazzite',
                    titleEn: 'Bazzite',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong><a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> – der SteamOS-Klon mit Extras:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Basis:</strong> <a href="https://fedoraproject.org/atomic-desktops/" target="_blank" class="topic-link">Fedora Atomic</a> (immutable) mit <a href="https://universal-blue.org/" target="_blank" class="topic-link">Universal Blue</a>-Tooling.</li>
                    <li><strong>Zielgruppe:</strong> Linux-Einsteiger, die ein „einfach funktionierendes“ System wollen [citation:4].</li>
                    <li><strong>Vorteile:</strong> Automatisches Rollback bei Problemen, vorinstallierte Gaming-Tools (Steam, Lutris, Heroic, MangoHud), HDR-Support, Decky Loader per <code>ujust setup-decky</code> [citation:13].</li>
                    <li><strong>Nvidia-Support:</strong> Dedizierte Images mit proprietärem Treiber – besser als SteamOS für Nvidia-GPUs [citation:4].</li>
                    <li><strong>Formfaktoren:</strong> <code>bazzite-deck</code> (Handheld), <code>bazzite-deck-gnome</code> (HTPC), Desktop-Varianten (KDE/GNOME) [citation:4].</li>
                    <li><strong>Nachteil:</strong> Weniger Kontrolle über Kernel/Desktop als CachyOS.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong><a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> – the SteamOS clone with extras:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Base:</strong> <a href="https://fedoraproject.org/atomic-desktops/" target="_blank" class="topic-link">Fedora Atomic</a> (immutable) with <a href="https://universal-blue.org/" target="_blank" class="topic-link">Universal Blue</a> tooling.</li>
                    <li><strong>Target audience:</strong> Linux beginners who want a "just works" system [citation:4].</li>
                    <li><strong>Advantages:</strong> Automatic rollback on issues, pre-installed gaming tools (Steam, Lutris, Heroic, MangoHud), HDR support, Decky Loader via <code>ujust setup-decky</code> [citation:13].</li>
                    <li><strong>Nvidia support:</strong> Dedicated images with proprietary driver – better than SteamOS for Nvidia GPUs [citation:4].</li>
                    <li><strong>Form factors:</strong> <code>bazzite-deck</code> (handheld), <code>bazzite-deck-gnome</code> (HTPC), desktop variants (KDE/GNOME) [citation:4].</li>
                    <li><strong>Downside:</strong> Less control over kernel/desktop than CachyOS.</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'CachyOS',
                    titleEn: 'CachyOS',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong><a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a> – der Performance-König:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Basis:</strong> <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a> mit optimierten Paketen (x86-64-v3/v4).</li>
                    <li><strong>Zielgruppe:</strong> Fortgeschrittene Nutzer, die maximale FPS und 1 % Low-Werte wollen [citation:4].</li>
                    <li><strong>Vorteile:</strong> <a href="https://github.com/CachyOS/proton-cachyos" target="_blank" class="topic-link">Proton-CachyOS</a> (optimierter Wine-Build), LAVD-Scheduler für Handhelds, 17+ Desktop-Umgebungen, voller <a href="https://aur.archlinux.org/" target="_blank" class="topic-link">AUR</a>-Zugang [citation:4].</li>
                    <li><strong>Handheld Edition:</strong> Speziell für ROG Ally, Legion Go und Steam Deck – mit Firmware-Updates und angepasstem Scheduler [citation:4].</li>
                    <li><strong>Steam-Statistik:</strong> 13,36 % Linux-Anteil (Mai 2026), nur noch ~10 % hinter SteamOS Holo [citation:12].</li>
                    <li><strong>Nachteil:</strong> Mehr Wartung nötig, nicht so „plug and play“ wie Bazzite.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong><a href="https://cachyos.org/" target="_blank" class="topic-link">CachyOS</a> – the performance king:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Base:</strong> <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a> with optimized packages (x86-64-v3/v4).</li>
                    <li><strong>Target audience:</strong> Advanced users who want maximum FPS and 1% low values [citation:4].</li>
                    <li><strong>Advantages:</strong> <a href="https://github.com/CachyOS/proton-cachyos" target="_blank" class="topic-link">Proton-CachyOS</a> (optimized Wine build), LAVD scheduler for handhelds, 17+ desktop environments, full <a href="https://aur.archlinux.org/" target="_blank" class="topic-link">AUR</a> access [citation:4].</li>
                    <li><strong>Handheld Edition:</strong> Specifically for ROG Ally, Legion Go, and Steam Deck – with firmware updates and custom scheduler [citation:4].</li>
                    <li><strong>Steam stats:</strong> 13.36% Linux share (May 2026), only ~10% behind SteamOS Holo [citation:12].</li>
                    <li><strong>Downside:</strong> More maintenance required, not as "plug and play" as Bazzite.</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. ZUKUNFT ============ */
        {
            id: 'section6',
            titleDe: '6. Zukunft: Steam Deck 2',
            titleEn: '6. Future: Steam Deck 2',
            introDe: 'Valve hat bestätigt, dass an einem <strong>Steam Deck 2</strong> gearbeitet wird – aber ohne Zeitplan. Die Philosophie: <strong>keine kleinen Updates, nur echte Generationensprünge</strong> [citation:2][citation:16].',
            introEn: 'Valve has confirmed that a <strong>Steam Deck 2</strong> is in development – but without a timeline. The philosophy: <strong>no small updates, only true generational leaps</strong> [citation:2][citation:16].',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Was wir wissen',
                    titleEn: 'What We Know',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Aspekt</th><th>Status</th></tr>
                    <tr><td><strong>Bestätigung</strong></td><td class="text-[var(--text-muted)]">Ja – Pierre-Loup Griffais (Valve): „Wir arbeiten intensiv daran“ [citation:16].</td></tr>
                    <tr><td><strong>Zeitplan</strong></td><td class="text-[var(--text-muted)]">Keiner. Gerüchte deuten auf <strong>2027–2028</strong> [citation:2][citation:8].</td></tr>
                    <tr><td><strong>Kriterium</strong></td><td class="text-[var(--text-muted)]">Valve wartet auf einen Chip mit <strong>echtem Generationssprung bei Performance/Watt</strong>. 20–50 % mehr Leistung reichen nicht [citation:2].</td></tr>
                    <tr><td><strong>Aktueller Fokus</strong></td><td class="text-[var(--text-muted)]">Steam Machine (Juni 2026), Steam Controller, Steam Frame VR [citation:2][citation:8].</td></tr>
                    <tr><td><strong>Formfaktor</strong></td><td class="text-[var(--text-muted)]">Bleibt bestehen – Dual-Trackpads und SteamOS sind gesetzt [citation:18].</td></tr>
                    <tr><td><strong>RAM/NAND-Krise</strong></td><td class="text-[var(--text-muted)]">Verzögert alles – Valve kämpft bereits mit Nachschub für aktuelle Modelle [citation:16].</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Realistische Erwartung:</strong> Das Steam Deck OLED bleibt bis mindestens 2027 das Flaggschiff. Wer jetzt kauft, bekommt ein ausgereiftes System mit jahrelangem Support [citation:18].</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Aspect</th><th>Status</th></tr>
                    <tr><td><strong>Confirmation</strong></td><td class="text-[var(--text-muted)]">Yes – Pierre-Loup Griffais (Valve): "We're working hard on it" [citation:16].</td></tr>
                    <tr><td><strong>Timeline</strong></td><td class="text-[var(--text-muted)]">None. Rumors point to <strong>2027–2028</strong> [citation:2][citation:8].</td></tr>
                    <tr><td><strong>Criterion</strong></td><td class="text-[var(--text-muted)]">Valve is waiting for a chip with a <strong>true generational leap in performance/watt</strong>. 20–50% more performance isn't enough [citation:2].</td></tr>
                    <tr><td><strong>Current focus</strong></td><td class="text-[var(--text-muted)]">Steam Machine (June 2026), Steam Controller, Steam Frame VR [citation:2][citation:8].</td></tr>
                    <tr><td><strong>Form factor</strong></td><td class="text-[var(--text-muted)]">Remains – dual trackpads and SteamOS are set [citation:18].</td></tr>
                    <tr><td><strong>RAM/NAND crisis</strong></td><td class="text-[var(--text-muted)]">Delays everything – Valve already struggles with supply for current models [citation:16].</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Realistic expectation:</strong> The Steam Deck OLED remains the flagship until at least 2027. Buying now gets you a mature system with years of support [citation:18].</p>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Kaufempfehlung 2026',
                    titleEn: '2026 Buying Recommendation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Wer sollte jetzt kaufen?</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Ja, kaufen:</strong> Wer PC-Spiele unterwegs oder auf dem Sofa spielen will und ein ausgereiftes System sucht. Das OLED-Modell ist 2026 die beste Handheld-Wahl [citation:18].</li>
                    <li><strong>Ja, aber LCD:</strong> Wer sparen will und gebraucht ein LCD-Modell findet. Das Display ist schlechter, aber die Spiele laufen identisch.</li>
                    <li><strong>Warten:</strong> Wer bereits ein Steam Deck hat und nur ein besseres Display will. Der Sprung ist nicht groß genug.</li>
                    <li><strong>Warten auf Deck 2:</strong> Wer maximale Leistung für AAA-Titel will. Aber: Das kann bis 2028 dauern [citation:2][citation:8].</li>
                    <li><strong>Alternative:</strong> Wer Windows-Spiele mit Anti-Cheat braucht, ist mit einem <a href="https://rog.asus.com/" target="_blank" class="topic-link">ROG Ally</a> + <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a> besser bedient.</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Das Steam Deck OLED ist 2026 kein Kompromiss mehr – es ist die ausgereifteste Handheld-Plattform auf dem Markt. Wer jetzt kauft, macht nichts falsch [citation:18].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Who should buy now?</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Yes, buy:</strong> Anyone who wants to play PC games on the go or on the couch and is looking for a mature system. The OLED model is the best handheld choice in 2026 [citation:18].</li>
                    <li><strong>Yes, but LCD:</strong> Anyone looking to save money and finds a used LCD model. The display is worse, but games run identically.</li>
                    <li><strong>Wait:</strong> Anyone who already has a Steam Deck and just wants a better display. The leap isn't big enough.</li>
                    <li><strong>Wait for Deck 2:</strong> Anyone who wants maximum performance for AAA titles. But: That could take until 2028 [citation:2][citation:8].</li>
                    <li><strong>Alternative:</strong> Anyone who needs Windows games with anti-cheat is better served with a <a href="https://rog.asus.com/" target="_blank" class="topic-link">ROG Ally</a> + <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a>.</li>
                    </ul>
                    <p class="mt-3"><strong>Conclusion:</strong> The Steam Deck OLED is no longer a compromise in 2026 – it's the most mature handheld platform on the market. Buying now is a safe bet [citation:18].</p>
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
            introDe: 'Die wichtigsten <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. OLED ist 2026 die Wahl</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">90 Hz OLED, 50 Wh Akku (3–12 h), Wi-Fi 6E, 30 g leichter. LCD nur als Budget-Option.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>2. Decky Loader ist Pflicht</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">CSS Loader, PowerTools, HLTB, SteamGridDB, ProtonDB Badges. Installation in Desktop Mode.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>3. 40 Hz + 40 FPS</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Bester Kompromiss aus Flüssigkeit und Akku. TDP 8–10 W für Indies, 12–15 W für AAA. Helligkeit senken.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-linux opacity-70"></i><span>4. Bazzite oder CachyOS</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Bazzite für Einsteiger (Rollback, alles vorinstalliert). CachyOS für maximale FPS (Proton-CachyOS, LAVD).</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. OLED is the 2026 choice</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">90 Hz OLED, 50 Wh battery (3–12 h), Wi-Fi 6E, 30 g lighter. LCD only as budget option.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>2. Decky Loader is essential</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">CSS Loader, PowerTools, HLTB, SteamGridDB, ProtonDB Badges. Install in Desktop Mode.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>3. 40 Hz + 40 FPS</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Best compromise between smoothness and battery. TDP 8–10W for indies, 12–15W for AAA. Lower brightness.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-linux opacity-70"></i><span>4. Bazzite or CachyOS</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Bazzite for beginners (rollback, everything pre-installed). CachyOS for max FPS (Proton-CachyOS, LAVD).</p>
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
            { icon: 'fa-globe',    href: 'https://www.steamdeck.com/',                              target: '_blank', labelDe: 'Offizielle Steam Deck-Seite',  labelEn: 'Official Steam Deck Site' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/steamdeck',               target: '_blank', labelDe: 'Steam Store',              labelEn: 'Steam Store' },
            { icon: 'fa-download', href: 'https://decky.xyz/',                                    target: '_blank', labelDe: 'Decky Loader',             labelEn: 'Decky Loader' },
            { icon: 'fa-linux',    href: 'https://bazzite.gg/',                                   target: '_blank', labelDe: 'Bazzite',                  labelEn: 'Bazzite' },
            { icon: 'fa-linux',    href: 'https://cachyos.org/',                                  target: '_blank', labelDe: 'CachyOS',                  labelEn: 'CachyOS' },
            { icon: 'fa-book',     href: 'https://github.com/SteamDeckHomebrew/decky-loader/wiki', target: '_blank', labelDe: 'Decky Loader Wiki',        labelEn: 'Decky Loader Wiki' }
        ]
    },

    footer: {
        textDe: 'Steam Deck Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Steam Deck Reference · v1.0 · Dual Lang · 2026'
    }
});