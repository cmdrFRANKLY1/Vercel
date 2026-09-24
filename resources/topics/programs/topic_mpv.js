// resources/topics/topic_mpv.js
// Registers the mpv media player reference topic. Loaded via <script> injection.

/* ==================================================================
   MPV CODE-BLOCK COPY CONTROLLER
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
    parentId: 'Programme',
    id: 'mpv Overview',
    icon: 'fa-play',
    titleDe: 'MPV',
    titleEn: 'MPV',
    descDe: 'Minimalistischer Open-Source Media Player',
    descEn: 'Minimalist Open-Source Media Player',

    sidebarTitleDe: 'mpv',
    sidebarTitleEn: 'mpv',
    sidebarSubtitleDe: 'GPU-basierter Media Player',
    sidebarSubtitleEn: 'GPU-based Media Player',
    sidebarVersion: 'v0.40+',

    hero: {
        titleDe: 'mpv: Der GPU-beschleunigte Media Player',
        titleEn: 'mpv: The GPU-Accelerated Media Player',
        introDe: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> ist ein <strong>freier, quelloffener Media Player</strong>, der aus <a href="https://www.mplayerhq.hu/" target="_blank" class="topic-link">MPlayer</a> und <a href="https://en.wikipedia.org/wiki/MPlayer" target="_blank" class="topic-link">mplayer2</a> hervorgegangen ist. Seit 2012 aktiv entwickelt, verfolgt er einen radikal minimalistischen Ansatz: keine Menüs, keine Bibliotheksverwaltung, keine grafischen Einstellungen. Stattdessen setzt er auf <strong><a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>-Rendering, modernste Skalierungsalgorithmen und volle Konfigurierbarkeit über Textdateien</strong>. <a href="https://mpv.io/manual/" target="_blank" class="topic-link">Zur offiziellen Dokumentation</a>.',
        introEn: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> is a <strong>free, open-source media player</strong> derived from <a href="https://www.mplayerhq.hu/" target="_blank" class="topic-link">MPlayer</a> and <a href="https://en.wikipedia.org/wiki/MPlayer" target="_blank" class="topic-link">mplayer2</a>. Actively developed since 2012, it takes a radically minimalist approach: no menus, no library management, no graphical settings. Instead, it relies on <strong><a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> rendering, modern scaling algorithms, and full configurability via text files</strong>. <a href="https://mpv.io/manual/" target="_blank" class="topic-link">Visit the official documentation</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-tachometer-alt',    href: '#section3', switchToDoc: true, labelDe: 'HDR & GPU',      labelEn: 'HDR & GPU' },
        { icon: 'fa-keyboard',          href: '#section4', switchToDoc: true, labelDe: 'Tastenkürzel',   labelEn: 'Keybindings' },
        { icon: 'fa-scroll',            href: '#section5', switchToDoc: true, labelDe: 'Skripte',        labelEn: 'Scripts' },
        { icon: 'fa-cog',               href: '#section6', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://mpv.io/manual/', target: '_blank', labelDe: 'Offizielles Handbuch', labelEn: 'Official Manual' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Philosophie',
            titleEn: '1. Overview & Philosophy',
            introDe: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> ist kein "All-in-One"-Player wie <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>, sondern ein <strong>hochspezialisierter Wiedergabe-Kern</strong> mit einer minimalen Oberfläche. Diese Entscheidung ermöglicht es ihm, die <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> direkt für Rendering, Skalierung und Farbmanagement zu nutzen – mit sichtbar besserer Bildqualität bei <a href="https://en.wikipedia.org/wiki/4K_resolution" target="_blank" class="topic-link">4K</a>-, <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>- und hochbitratigen Inhalten.',
            introEn: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> is not an "all-in-one" player like <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>, but a <strong>highly specialized playback core</strong> with a minimal interface. This decision allows it to use the <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> directly for rendering, scaling, and color management – with visibly better image quality for <a href="https://en.wikipedia.org/wiki/4K_resolution" target="_blank" class="topic-link">4K</a>, <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>, and high-bitrate content.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist mpv?',
                    titleEn: 'What is mpv?',
                    htmlDe: `
                    <style>
                        /* ---------- scoped topic styles ---------- */
                        .jf-code {
                            position: relative;
                            background: #06080b;
                            border: 1px solid var(--border-color);
                            border-radius: 0.45rem;
                            margin: 0.55rem 0;
                            overflow: hidden;
                            box-shadow: inset 0 1px 0 rgba(255,255,255,0.04),
                                        0 1px 2px rgba(0,0,0,0.35);
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

                        /* ---------- HIGHLIGHTED HYPERLINKS ---------- */
                        /* Only EXTERNAL links (href starting with http) inside */
                        /* the topic body get the high-visibility treatment.    */
                        /* Navigation anchors (href="#sectionN") are excluded.  */
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

                        /* External links get a small arrow */
                        a[target="_blank"].topic-link::after,
                        .wikitable a[target="_blank"]::after {
                            content: "\\2197";              /* ↗ */
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

                        /* Links inside <code> keep monospace but stay clickable */
                        code a,
                        .jf-code-inner a {
                            font-family: inherit;
                            color: var(--link-color);
                            text-decoration: underline;
                            text-underline-offset: 2px;
                            font-weight: 600;
                        }

                        /* Neutralize navigation anchors */
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
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Minimalistischer Media Player mit <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>-Rendering.</td></tr>
                    <tr><td><strong>Herkunft</strong></td><td class="text-[var(--text-muted)]">Fork von <a href="https://www.mplayerhq.hu/" target="_blank" class="topic-link">MPlayer</a>/mplayer2. Aktiv seit 2012.</td></tr>
                    <tr><td><strong>Lizenz</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a>+ – vollständig frei und quelloffen.</td></tr>
                    <tr><td><strong>Kosten</strong></td><td class="text-[var(--text-muted)]">Immer 0 € – keine Pro-Version, keine Abos.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, BSD. Mobile Clients (<a href="https://iina.io/" target="_blank" class="topic-link">IINA</a>, <a href="https://github.com/mpv-android/mpv-android" target="_blank" class="topic-link">mpv-android</a>).</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Wiedergabe praktisch jedes Formats via <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a>. Hardware-Decoding, Shader, Skripte.</td></tr>
                    <tr><td><strong>Konfiguration</strong></td><td class="text-[var(--text-muted)]">Textdateien (<code>mpv.conf</code>, <code>input.conf</code>). Keine GUI-Settings.</td></tr>
                    <tr><td><strong>Scripting</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a> und <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JavaScript</a>. <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a> IPC für externe Steuerung.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Minimalist media player with <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> rendering.</td></tr>
                    <tr><td><strong>Origin</strong></td><td class="text-[var(--text-muted)]">Fork of <a href="https://www.mplayerhq.hu/" target="_blank" class="topic-link">MPlayer</a>/mplayer2. Active since 2012.</td></tr>
                    <tr><td><strong>License</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a>+ – fully free and open source.</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">Always $0 – no Pro version, no subscriptions.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, BSD. Mobile clients (<a href="https://iina.io/" target="_blank" class="topic-link">IINA</a>, <a href="https://github.com/mpv-android/mpv-android" target="_blank" class="topic-link">mpv-android</a>).</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Playback of virtually any format via <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a>. Hardware decoding, shaders, scripts.</td></tr>
                    <tr><td><strong>Configuration</strong></td><td class="text-[var(--text-muted)]">Text files (<code>mpv.conf</code>, <code>input.conf</code>). No GUI settings.</td></tr>
                    <tr><td><strong>Scripting</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a> and <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JavaScript</a>. <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a> IPC for external control.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'mpv vs. VLC',
                    titleEn: 'mpv vs. VLC',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/3"><a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a></th><th class="w-1/3"><a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a></th></tr>
                    <tr><td><strong>Philosophie</strong></td><td class="text-[var(--text-muted)]">Minimalistischer Kern, maximale Kontrolle</td><td class="text-[var(--text-muted)]">All-in-One, benutzerfreundlich</td></tr>
                    <tr><td><strong>Bildqualität</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>-Skalierung (Spline36, ewa_lanczossharp), <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>-Tonemapping</td><td class="text-[var(--text-muted)]">Bilinear-Standard, HDR-Probleme bei <a href="https://en.wikipedia.org/wiki/Standard-dynamic-range_video" target="_blank" class="topic-link">SDR</a>-Displays</td></tr>
                    <tr><td><strong>4K/HDR</strong></td><td class="text-[var(--text-muted)]">Herausragend, <code>gpu-next</code> für präzises Farbmanagement</td><td class="text-[var(--text-muted)]">Häufig Ruckler und verwaschene Farben</td></tr>
                    <tr><td><strong>Konfiguration</strong></td><td class="text-[var(--text-muted)]">Textdateien, CLI-Optionen, Skripte</td><td class="text-[var(--text-muted)]">Grafische Einstellungen, Menüs</td></tr>
                    <tr><td><strong>DVD/Blu-ray</strong></td><td class="text-[var(--text-muted)]">Keine Menü-Navigation</td><td class="text-[var(--text-muted)]">Volle Menü-Unterstützung</td></tr>
                    <tr><td><strong>Skripting</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a>/<a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JS</a>, JSON IPC, Shader-Unterstützung</td><td class="text-[var(--text-muted)]">Eingeschränkt</td></tr>
                    <tr><td><strong>Lernkurve</strong></td><td class="text-[var(--text-muted)]">Höher – Textdateien statt GUI</td><td class="text-[var(--text-muted)]">Niedrig – intuitiv bedienbar</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Die Empfehlung für Einsteiger: Beide installieren. <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> für Dateien und maximale Bildqualität, <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a> für Discs und Gelegenheitsnutzung.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/3"><a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a></th><th class="w-1/3"><a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a></th></tr>
                    <tr><td><strong>Philosophy</strong></td><td class="text-[var(--text-muted)]">Minimalist core, maximum control</td><td class="text-[var(--text-muted)]">All-in-one, user-friendly</td></tr>
                    <tr><td><strong>Image quality</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> scaling (Spline36, ewa_lanczossharp), <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a> tone mapping</td><td class="text-[var(--text-muted)]">Bilinear default, HDR issues on <a href="https://en.wikipedia.org/wiki/Standard-dynamic-range_video" target="_blank" class="topic-link">SDR</a> displays</td></tr>
                    <tr><td><strong>4K/HDR</strong></td><td class="text-[var(--text-muted)]">Outstanding, <code>gpu-next</code> for precise color management</td><td class="text-[var(--text-muted)]">Frequent stuttering and washed-out colors</td></tr>
                    <tr><td><strong>Configuration</strong></td><td class="text-[var(--text-muted)]">Text files, CLI options, scripts</td><td class="text-[var(--text-muted)]">Graphical settings, menus</td></tr>
                    <tr><td><strong>DVD/Blu-ray</strong></td><td class="text-[var(--text-muted)]">No menu navigation</td><td class="text-[var(--text-muted)]">Full menu support</td></tr>
                    <tr><td><strong>Scripting</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a>/<a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JS</a>, JSON IPC, shader support</td><td class="text-[var(--text-muted)]">Limited</td></tr>
                    <tr><td><strong>Learning curve</strong></td><td class="text-[var(--text-muted)]">Higher – text files instead of GUI</td><td class="text-[var(--text-muted)]">Low – intuitive</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">The recommendation for beginners: Install both. <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> for files and maximum image quality, <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a> for discs and casual use.</p>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> ist in den Repositories aller großen <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Distributionen enthalten und über Paketmanager für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> und <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> installierbar. Unter <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> empfiehlt sich <a href="https://scoop.sh/" target="_blank" class="topic-link">scoop</a> oder <a href="https://chocolatey.org/" target="_blank" class="topic-link">choco</a> für automatische Updates und PATH-Integration.',
            introEn: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> is included in the repositories of all major <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> distributions and can be installed via package managers on <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> and <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>. On <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://scoop.sh/" target="_blank" class="topic-link">scoop</a> or <a href="https://chocolatey.org/" target="_blank" class="topic-link">choco</a> are recommended for automatic updates and PATH integration.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Befehl / Methode</th></tr>
                    <tr><td><strong><a href="https://www.debian.org/" target="_blank" class="topic-link">Debian</a>/<a href="https://ubuntu.com/" target="_blank" class="topic-link">Ubuntu</a></strong></td><td class="text-[var(--text-muted)]"><code>sudo apt install mpv</code></td></tr>
                    <tr><td><strong><a href="https://fedoraproject.org/" target="_blank" class="topic-link">Fedora</a></strong></td><td class="text-[var(--text-muted)]"><code>sudo dnf install mpv</code></td></tr>
                    <tr><td><strong><a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a></strong></td><td class="text-[var(--text-muted)]"><code>sudo pacman -S mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (<a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a>)</strong></td><td class="text-[var(--text-muted)]"><code>scoop install extras/mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (<a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a>)</strong></td><td class="text-[var(--text-muted)]"><code>choco install mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (<a href="https://brew.sh/" target="_blank" class="topic-link">Homebrew</a>)</strong></td><td class="text-[var(--text-muted)]"><code>brew install --cask mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (<a href="https://iina.io/" target="_blank" class="topic-link">IINA</a>)</strong></td><td class="text-[var(--text-muted)]">IINA – GUI-Wrapper auf <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a>-Basis.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Command / Method</th></tr>
                    <tr><td><strong><a href="https://www.debian.org/" target="_blank" class="topic-link">Debian</a>/<a href="https://ubuntu.com/" target="_blank" class="topic-link">Ubuntu</a></strong></td><td class="text-[var(--text-muted)]"><code>sudo apt install mpv</code></td></tr>
                    <tr><td><strong><a href="https://fedoraproject.org/" target="_blank" class="topic-link">Fedora</a></strong></td><td class="text-[var(--text-muted)]"><code>sudo dnf install mpv</code></td></tr>
                    <tr><td><strong><a href="https://archlinux.org/" target="_blank" class="topic-link">Arch Linux</a></strong></td><td class="text-[var(--text-muted)]"><code>sudo pacman -S mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (<a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a>)</strong></td><td class="text-[var(--text-muted)]"><code>scoop install extras/mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (<a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a>)</strong></td><td class="text-[var(--text-muted)]"><code>choco install mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (<a href="https://brew.sh/" target="_blank" class="topic-link">Homebrew</a>)</strong></td><td class="text-[var(--text-muted)]"><code>brew install --cask mpv</code></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (<a href="https://iina.io/" target="_blank" class="topic-link">IINA</a>)</strong></td><td class="text-[var(--text-muted)]">IINA – GUI wrapper based on <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a>.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Windows-Details',
                    titleEn: 'Windows Details',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Nach der Installation (manueller Build):</strong></p>
                    <p class="mb-2">Der <code>mpv-install.bat</code>-Script aus dem <a href="https://github.com/shinchiro/mpv-winbuild-cmake" target="_blank" class="topic-link">shinchiro-Build</a> fügt den Kontextmenü-Eintrag "Open with mpv" hinzu und registriert Dateizuordnungen.</p>
                    <p class="mb-2 mt-3"><strong>Konfigurationspfad (Windows):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">%APPDATA%\\mpv\\mpv.conf</pre>
                    </div>
                    <p class="mt-3">Falls der Ordner nicht existiert, manuell anlegen. Die Konfigurationsdatei wird von <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> automatisch beim Start geladen. Weitere Details im <a href="https://mpv.io/manual/" target="_blank" class="topic-link">offiziellen Handbuch</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>After installation (manual build):</strong></p>
                    <p class="mb-2">The <code>mpv-install.bat</code> script from the <a href="https://github.com/shinchiro/mpv-winbuild-cmake" target="_blank" class="topic-link">shinchiro build</a> adds the "Open with mpv" context menu entry and registers file associations.</p>
                    <p class="mb-2 mt-3"><strong>Configuration path (Windows):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">%APPDATA%\\mpv\\mpv.conf</pre>
                    </div>
                    <p class="mt-3">If the folder does not exist, create it manually. The configuration file is loaded automatically by <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> on startup. More details in the <a href="https://mpv.io/manual/" target="_blank" class="topic-link">official manual</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. HDR & GPU ============ */
        {
            id: 'section3',
            titleDe: '3. HDR, GPU-Rendering & Bildqualität',
            titleEn: '3. HDR, GPU Rendering & Image Quality',
            introDe: 'Der größte Vorteil von <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> gegenüber <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a> liegt in der <strong><a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>-basierten Wiedergabe</strong>. Der Video-Output-Treiber <code>gpu-next</code> bietet modernes Farbmanagement, <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>-Passthrough und hochwertige Skalierungsalgorithmen. Für <a href="https://en.wikipedia.org/wiki/4K_resolution" target="_blank" class="topic-link">4K</a>- und <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>-Inhalte sind drei Zeilen in <code>mpv.conf</code> entscheidend.',
            introEn: 'The biggest advantage of <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> over <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a> is <strong><a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>-based playback</strong>. The <code>gpu-next</code> video output driver offers modern color management, <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a> passthrough, and high-quality scaling algorithms. For <a href="https://en.wikipedia.org/wiki/4K_resolution" target="_blank" class="topic-link">4K</a> and <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a> content, three lines in <code>mpv.conf</code> are critical.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'HDR-Konfiguration',
                    titleEn: 'HDR Configuration',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die drei entscheidenden HDR-Zeilen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">vo=gpu-next
target-colorspace-hint=yes
hwdec=auto</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Was die Optionen bewirken:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><code>vo=gpu-next</code>: Aktiviert den neueren Video-Output mit besserem Farbmanagement.</li>
                    <li><code>target-colorspace-hint=yes</code>: Teilt dem Display mit, in den <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>-Modus zu wechseln und die HDR-Metadaten direkt durchzureichen.</li>
                    <li><code>hwdec=auto</code>: <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>-Hardware-Decoding für ruckelfreie 4K-Wiedergabe.</li>
                    </ul>
                    <p class="mt-3"><strong>Überprüfung:</strong> Während der Wiedergabe <code>Shift+I</code> drücken. Die Statistik-Anzeige zeigt Auflösung, Codec, Framerate und Farbraum – so lässt sich prüfen, ob <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a> tatsächlich durchgereicht wird.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The three critical HDR lines:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">vo=gpu-next
target-colorspace-hint=yes
hwdec=auto</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>What the options do:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><code>vo=gpu-next</code>: Enables the newer video output with better color management.</li>
                    <li><code>target-colorspace-hint=yes</code>: Tells the display to switch into <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a> mode and passes the movie's HDR metadata straight through.</li>
                    <li><code>hwdec=auto</code>: <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> hardware decoding for smooth 4K playback.</li>
                    </ul>
                    <p class="mt-3"><strong>Verification:</strong> Press <code>Shift+I</code> during playback. The stats overlay shows resolution, codec, frame rate, and color space – so you can see <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a> being passed through rather than just hoping it is.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Skalierung & Shader',
                    titleEn: 'Scaling & Shaders',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Option</th><th>Wirkung</th></tr>
                    <tr><td><code>profile=high-quality</code></td><td class="text-[var(--text-muted)]">Aktiviert hochwertige Skalierungsalgorithmen (ewa_lanczossharp, Spline36).</td></tr>
                    <tr><td><code>video-sync=display-resample</code></td><td class="text-[var(--text-muted)]">Synchronisiert Video mit der Display-Refresh-Rate für flüssigere Wiedergabe.</td></tr>
                    <tr><td><code>interpolation=yes</code></td><td class="text-[var(--text-muted)]">Frame-Interpolation für 24fps-Inhalte auf 60Hz-Displays.</td></tr>
                    <tr><td><code>tscale=oversample</code></td><td class="text-[var(--text-muted)]">Bessere zeitliche Skalierung.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://github.com/bloc97/Anime4K" target="_blank" class="topic-link">Anime4K</a>-Shader können für Echtzeit-Upscaling von Anime-Inhalten eingesetzt werden. <a href="https://www.svp-team.com/" target="_blank" class="topic-link">SVPflow</a>/<a href="https://github.com/HomeOfVapourSynthEvolution/mvtools" target="_blank" class="topic-link">mvtools</a> für Frame-Interpolation. Diese erfordern zusätzliche Script- und Shader-Dateien. Siehe <a href="https://mpv.io/manual/" target="_blank" class="topic-link">offizielles Handbuch</a> für Details.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Option</th><th>Effect</th></tr>
                    <tr><td><code>profile=high-quality</code></td><td class="text-[var(--text-muted)]">Enables high-quality scaling algorithms (ewa_lanczossharp, Spline36).</td></tr>
                    <tr><td><code>video-sync=display-resample</code></td><td class="text-[var(--text-muted)]">Syncs video to display refresh rate for smoother playback.</td></tr>
                    <tr><td><code>interpolation=yes</code></td><td class="text-[var(--text-muted)]">Frame interpolation for 24fps content on 60Hz displays.</td></tr>
                    <tr><td><code>tscale=oversample</code></td><td class="text-[var(--text-muted)]">Better temporal scaling.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://github.com/bloc97/Anime4K" target="_blank" class="topic-link">Anime4K</a> shaders can be used for real-time upscaling of anime content. <a href="https://www.svp-team.com/" target="_blank" class="topic-link">SVPflow</a>/<a href="https://github.com/HomeOfVapourSynthEvolution/mvtools" target="_blank" class="topic-link">mvtools</a> for frame interpolation. These require additional script and shader files. See the <a href="https://mpv.io/manual/" target="_blank" class="topic-link">official manual</a> for details.</p>
                    `
                }
            ]
        },

        /* ============ 4. TASTENKÜRZEL ============ */
        {
            id: 'section4',
            titleDe: '4. Tastenkürzel & Steuerung',
            titleEn: '4. Keybindings & Control',
            introDe: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> ist <strong>tastaturzentriert</strong>. Die wichtigsten Kürzel sind fest eingebaut und können in <code>input.conf</code> angepasst werden. Für Anfänger sind besonders die Wiedergabe-, Frame-Step- und Loop-Funktionen relevant.',
            introEn: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> is <strong>keyboard-centric</strong>. The most important shortcuts are built in and can be customized in <code>input.conf</code>. For beginners, the playback, frame-step, and loop functions are particularly relevant.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Standard-Tastenkürzel',
                    titleEn: 'Default Keybindings',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Taste</th><th>Funktion</th></tr>
                    <tr><td><code>Space</code></td><td class="text-[var(--text-muted)]">Pause / Wiedergabe umschalten.</td></tr>
                    <tr><td><code>← / →</code></td><td class="text-[var(--text-muted)]">5 Sekunden zurück / vor.</td></tr>
                    <tr><td><code>↓ / ↑</code></td><td class="text-[var(--text-muted)]">60 Sekunden zurück / vor.</td></tr>
                    <tr><td><code>, / .</code></td><td class="text-[var(--text-muted)]">Ein Frame zurück / vor.</td></tr>
                    <tr><td><code>{ / }</code></td><td class="text-[var(--text-muted)]">Geschwindigkeit auf 0,5x / 2x setzen.</td></tr>
                    <tr><td><code>L</code></td><td class="text-[var(--text-muted)]">A-B-Loop setzen (wiederholter Abschnitt).</td></tr>
                    <tr><td><code>s</code></td><td class="text-[var(--text-muted)]">Screenshot mit Untertiteln.</td></tr>
                    <tr><td><code>S</code></td><td class="text-[var(--text-muted)]">Screenshot ohne Untertitel.</td></tr>
                    <tr><td><code>Shift+I</code></td><td class="text-[var(--text-muted)]">Statistik-Overlay ein/aus.</td></tr>
                    <tr><td><code>f</code></td><td class="text-[var(--text-muted)]">Vollbild umschalten.</td></tr>
                    <tr><td><code>q</code></td><td class="text-[var(--text-muted)]">Beenden.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Vollständige Liste im <a href="https://mpv.io/manual/master/#keyboard-control" target="_blank" class="topic-link">offiziellen Handbuch zur Tastatursteuerung</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Key</th><th>Function</th></tr>
                    <tr><td><code>Space</code></td><td class="text-[var(--text-muted)]">Toggle pause / play.</td></tr>
                    <tr><td><code>← / →</code></td><td class="text-[var(--text-muted)]">Seek back / forward 5 seconds.</td></tr>
                    <tr><td><code>↓ / ↑</code></td><td class="text-[var(--text-muted)]">Seek back / forward 60 seconds.</td></tr>
                    <tr><td><code>, / .</code></td><td class="text-[var(--text-muted)]">Step one frame back / forward.</td></tr>
                    <tr><td><code>{ / }</code></td><td class="text-[var(--text-muted)]">Set speed to 0.5x / 2x.</td></tr>
                    <tr><td><code>L</code></td><td class="text-[var(--text-muted)]">Set A-B loop (repeat section).</td></tr>
                    <tr><td><code>s</code></td><td class="text-[var(--text-muted)]">Screenshot with subtitles.</td></tr>
                    <tr><td><code>S</code></td><td class="text-[var(--text-muted)]">Screenshot without subtitles.</td></tr>
                    <tr><td><code>Shift+I</code></td><td class="text-[var(--text-muted)]">Toggle stats overlay.</td></tr>
                    <tr><td><code>f</code></td><td class="text-[var(--text-muted)]">Toggle fullscreen.</td></tr>
                    <tr><td><code>q</code></td><td class="text-[var(--text-muted)]">Quit.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Full list in the <a href="https://mpv.io/manual/master/#keyboard-control" target="_blank" class="topic-link">official keyboard control manual</a>.</p>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'input.conf Beispiel',
                    titleEn: 'input.conf Example',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Eigene Tastenkürzel definieren:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># input.conf – Format: KEY ACTION # comment

# Zoom-Reset auf 'z'
z reset-zoom

# Rotation um 90° auf 'r'
r cycle-values video-rotate 90 180 270 0

# Schnelles Beenden auf 'Q'
Q quit-watch-later

# Lautstärke um 5% auf 'k'/'j'
k add volume 5
j add volume -5</pre>
                    </div>
                    <p class="mt-3">Die Datei liegt neben <code>mpv.conf</code> im Konfigurationsverzeichnis. Änderungen werden beim nächsten Start wirksam. Details im <a href="https://mpv.io/manual/master/#input-conf" target="_blank" class="topic-link">offiziellen Handbuch zu input.conf</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Defining custom keybindings:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># input.conf – format: KEY ACTION # comment

# Zoom reset on 'z'
z reset-zoom

# Rotate 90° on 'r'
r cycle-values video-rotate 90 180 270 0

# Quick quit on 'Q'
Q quit-watch-later

# Volume +/- 5% on 'k'/'j'
k add volume 5
j add volume -5</pre>
                    </div>
                    <p class="mt-3">The file sits next to <code>mpv.conf</code> in the configuration directory. Changes take effect on next start. Details in the <a href="https://mpv.io/manual/master/#input-conf" target="_blank" class="topic-link">official input.conf manual</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. SKRIPTE ============ */
        {
            id: 'section5',
            titleDe: '5. Skripte & Erweiterungen',
            titleEn: '5. Scripts & Extensions',
            introDe: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> verfügt über eine <strong><a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a>- und <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JavaScript</a>-Scripting-Engine</strong>. Skripte im <code>scripts/</code>-Verzeichnis werden automatisch geladen. Die Community hat eine Vielzahl nützlicher Erweiterungen entwickelt – von Thumbnail-Generierung über automatische Untertitelwahl bis zu <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a>-Integration.',
            introEn: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> features a <strong><a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a> and <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JavaScript</a> scripting engine</strong>. Scripts in the <code>scripts/</code> directory are loaded automatically. The community has developed a wide range of useful extensions – from thumbnail generation and automatic subtitle selection to <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> integration.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Nützliche Community-Skripte',
                    titleEn: 'Useful Community Scripts',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Skript</th><th>Funktion</th></tr>
                    <tr><td><strong><a href="https://github.com/mar04/mpv_thumbnail_script" target="_blank" class="topic-link">mpv-thumbnail</a></strong></td><td class="text-[var(--text-muted)]">Erzeugt Vorschaubilder für die Seek-Leiste.</td></tr>
                    <tr><td><strong><a href="https://github.com/mpv-player/mpv/blob/master/TOOLS/lua/autoload.lua" target="_blank" class="topic-link">autoload</a></strong></td><td class="text-[var(--text-muted)]">Lädt automatisch die nächste Datei im Verzeichnis.</td></tr>
                    <tr><td><strong><a href="https://github.com/AlessandroVasques/mpv-streamlink-hook" target="_blank" class="topic-link">mpv-streamlink-hook</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://twitch.tv/" target="_blank" class="topic-link">Twitch</a>/<a href="https://kick.com/" target="_blank" class="topic-link">Kick</a>-Streams über <a href="https://streamlink.github.io/" target="_blank" class="topic-link">Streamlink</a> mit Ad-Filterung.</td></tr>
                    <tr><td><strong><a href="https://github.com/Anime4K/Anime4K" target="_blank" class="topic-link">Anime4K</a></strong></td><td class="text-[var(--text-muted)]">Echtzeit-Upscaling-Shader für Anime-Inhalte.</td></tr>
                    <tr><td><strong><a href="https://www.svp-team.com/" target="_blank" class="topic-link">SVPflow</a>/<a href="https://github.com/HomeOfVapourSynthEvolution/mvtools" target="_blank" class="topic-link">mvtools</a></strong></td><td class="text-[var(--text-muted)]">Frame-Interpolation für flüssigere Bewegung.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Skripte werden in <code>~/.config/mpv/scripts/</code> (<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>) oder <code>%APPDATA%\\mpv\\scripts\\</code> (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>) abgelegt und beim Start automatisch geladen. Weitere Skripte im <a href="https://github.com/mpv-player/mpv/wiki/User-Scripts" target="_blank" class="topic-link">mpv Wiki</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Script</th><th>Function</th></tr>
                    <tr><td><strong><a href="https://github.com/mar04/mpv_thumbnail_script" target="_blank" class="topic-link">mpv-thumbnail</a></strong></td><td class="text-[var(--text-muted)]">Generates thumbnails for the seek bar.</td></tr>
                    <tr><td><strong><a href="https://github.com/mpv-player/mpv/blob/master/TOOLS/lua/autoload.lua" target="_blank" class="topic-link">autoload</a></strong></td><td class="text-[var(--text-muted)]">Automatically loads the next file in the directory.</td></tr>
                    <tr><td><strong><a href="https://github.com/AlessandroVasques/mpv-streamlink-hook" target="_blank" class="topic-link">mpv-streamlink-hook</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://twitch.tv/" target="_blank" class="topic-link">Twitch</a>/<a href="https://kick.com/" target="_blank" class="topic-link">Kick</a> streams via <a href="https://streamlink.github.io/" target="_blank" class="topic-link">Streamlink</a> with ad filtering.</td></tr>
                    <tr><td><strong><a href="https://github.com/Anime4K/Anime4K" target="_blank" class="topic-link">Anime4K</a></strong></td><td class="text-[var(--text-muted)]">Real-time upscaling shaders for anime content.</td></tr>
                    <tr><td><strong><a href="https://www.svp-team.com/" target="_blank" class="topic-link">SVPflow</a>/<a href="https://github.com/HomeOfVapourSynthEvolution/mvtools" target="_blank" class="topic-link">mvtools</a></strong></td><td class="text-[var(--text-muted)]">Frame interpolation for smoother motion.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Scripts are placed in <code>~/.config/mpv/scripts/</code> (<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>) or <code>%APPDATA%\\mpv\\scripts\\</code> (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>) and loaded automatically on startup. More scripts in the <a href="https://github.com/mpv-player/mpv/wiki/User-Scripts" target="_blank" class="topic-link">mpv Wiki</a>.</p>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'JSON IPC für externe Steuerung',
                    titleEn: 'JSON IPC for External Control',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong><a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> mit IPC-Socket starten:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">mpv --input-ipc-server=/tmp/mpvsocket --idle</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Befehle über <a href="http://www.dest-unreach.org/socat/" target="_blank" class="topic-link">socat</a> senden:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Wiedergabezeit abfragen
echo '{ "command": ["get_property", "playback-time"] }' | socat - /tmp/mpvsocket

# Lautstärke setzen
echo '{ "command": ["set_property", "volume", 80] }' | socat - /tmp/mpvsocket

# Pause
echo '{ "command": ["set_property", "pause", true] }' | socat - /tmp/mpvsocket</pre>
                    </div>
                    <p class="mt-3"><strong>Sicherheitshinweis:</strong> IPC bietet keine Authentifizierung und keine Verschlüsselung. <code>run</code>-Befehle können beliebige Systemprogramme ausführen. Nur lokal verwenden. Siehe <a href="https://mpv.io/manual/master/#json-ipc" target="_blank" class="topic-link">JSON IPC-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Start <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> with IPC socket:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">mpv --input-ipc-server=/tmp/mpvsocket --idle</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Send commands via <a href="http://www.dest-unreach.org/socat/" target="_blank" class="topic-link">socat</a>:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Query playback time
echo '{ "command": ["get_property", "playback-time"] }' | socat - /tmp/mpvsocket

# Set volume
echo '{ "command": ["set_property", "volume", 80] }' | socat - /tmp/mpvsocket

# Pause
echo '{ "command": ["set_property", "pause", true] }' | socat - /tmp/mpvsocket</pre>
                    </div>
                    <p class="mt-3"><strong>Security note:</strong> IPC offers no authentication and no encryption. <code>run</code> commands can execute arbitrary system programs. Use locally only. See the <a href="https://mpv.io/manual/master/#json-ipc" target="_blank" class="topic-link">JSON IPC documentation</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. KONFIGURATION ============ */
        {
            id: 'section6',
            titleDe: '6. Konfiguration & Pfade',
            titleEn: '6. Configuration & Paths',
            introDe: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> liest seine Konfiguration aus Textdateien. Die Hauptdatei ist <code>mpv.conf</code> für Verhalten und Optionen, <code>input.conf</code> für Tastenkürzel. Kommandozeilen-Optionen überschreiben Config-Datei-Einstellungen.',
            introEn: '<a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> reads its configuration from text files. The main file is <code>mpv.conf</code> for behavior and options, <code>input.conf</code> for keybindings. Command-line options override config file settings.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Konfigurationspfade',
                    titleEn: 'Configuration Paths',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th class="w-1/3">mpv.conf</th><th class="w-1/3">input.conf</th></tr>
                    <tr><td><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></strong></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/input.conf</code></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/input.conf</code></td></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]"><code>%APPDATA%\\mpv\\mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>%APPDATA%\\mpv\\input.conf</code></td></tr>
                    <tr><td><strong>Portabel</strong></td><td class="text-[var(--text-muted)]"><code>portable_config\\mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>portable_config\\input.conf</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Die Umgebungsvariable <code>MPV_HOME</code> überschreibt alle anderen Pfade. Ein <code>portable_config</code>-Ordner neben <code>mpv.exe</code> hat Vorrang vor allen anderen Konfigurationen. Siehe <a href="https://mpv.io/manual/master/#files" target="_blank" class="topic-link">Datei-Dokumentation</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th class="w-1/3">mpv.conf</th><th class="w-1/3">input.conf</th></tr>
                    <tr><td><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></strong></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/input.conf</code></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>~/.config/mpv/input.conf</code></td></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]"><code>%APPDATA%\\mpv\\mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>%APPDATA%\\mpv\\input.conf</code></td></tr>
                    <tr><td><strong>Portable</strong></td><td class="text-[var(--text-muted)]"><code>portable_config\\mpv.conf</code></td><td class="text-[var(--text-muted)]"><code>portable_config\\input.conf</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">The <code>MPV_HOME</code> environment variable overrides all other paths. A <code>portable_config</code> folder next to <code>mpv.exe</code> takes precedence over all other configurations. See the <a href="https://mpv.io/manual/master/#files" target="_blank" class="topic-link">files documentation</a>.</p>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'mpv.conf Beispiel',
                    titleEn: 'mpv.conf Example',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Praktische Grundeinstellungen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Video-Output (GPU-beschleunigt)
vo=gpu-next

# Hardware-Decoding
hwdec=auto

# HDR-Passthrough
target-colorspace-hint=yes

# Hochwertige Skalierung
profile=high-quality

# Fenster nach Wiedergabe offen lassen
keep-open=yes

# Lautstärke auf 80% beim Start
volume=80

# Untertitel-Größe
sub-font-size=45

# Screenshot-Verzeichnis
screenshot-directory=~/Pictures/mpv</pre>
                    </div>
                    <p class="mt-3"><strong>Wichtig:</strong> In Config-Dateien wird das <code>--</code>-Präfix weggelassen. <code>--vo=gpu-next</code> wird zu <code>vo=gpu-next</code>. Das <code>--option=value</code>-Syntax darf hier nicht verwendet werden. Siehe <a href="https://mpv.io/manual/master/" target="_blank" class="topic-link">offizielles Handbuch</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Practical basic settings:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Video output (GPU-accelerated)
vo=gpu-next

# Hardware decoding
hwdec=auto

# HDR passthrough
target-colorspace-hint=yes

# High-quality scaling
profile=high-quality

# Keep window open after playback
keep-open=yes

# Volume at 80% on start
volume=80

# Subtitle size
sub-font-size=45

# Screenshot directory
screenshot-directory=~/Pictures/mpv</pre>
                    </div>
                    <p class="mt-3"><strong>Important:</strong> In config files, the <code>--</code> prefix is omitted. <code>--vo=gpu-next</code> becomes <code>vo=gpu-next</code>. The <code>--option=value</code> syntax must not be used here. See the <a href="https://mpv.io/manual/master/" target="_blank" class="topic-link">official manual</a>.</p>
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
            introDe: 'Die wichtigsten <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://mpv.io/" target="_blank" class="topic-link">mpv</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>1. Minimalistisch & schnell</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Keine GUI-Settings, keine Bibliothek. Nur Wiedergabe-Kern mit <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>-Rendering. Deutlich weniger Ressourcen als <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>2. HDR & GPU</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">vo=gpu-next, target-colorspace-hint, hwdec=auto. Hervorragende Bildqualität bei <a href="https://en.wikipedia.org/wiki/4K_resolution" target="_blank" class="topic-link">4K</a>/<a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>, präzises Farbmanagement.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-keyboard opacity-70"></i><span>3. Tastatur & Textdateien</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">input.conf für Kürzel, mpv.conf für Optionen. Alle Einstellungen über Textdateien – kein Menü-Wirrwarr.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-scroll opacity-70"></i><span>4. Lua-Skripte & IPC</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Erweiterbar durch <a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a>/<a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JS</a>-Skripte. <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a> IPC für externe Steuerung. <a href="https://github.com/bloc97/Anime4K" target="_blank" class="topic-link">Anime4K</a>, <a href="https://www.svp-team.com/" target="_blank" class="topic-link">SVPflow</a>, <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a>-Integration.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>1. Minimalist & fast</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">No GUI settings, no library. Just a playback core with <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> rendering. Significantly fewer resources than <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>2. HDR & GPU</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">vo=gpu-next, target-colorspace-hint, hwdec=auto. Outstanding image quality for <a href="https://en.wikipedia.org/wiki/4K_resolution" target="_blank" class="topic-link">4K</a>/<a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR</a>, precise color management.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-keyboard opacity-70"></i><span>3. Keyboard & Text Files</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">input.conf for shortcuts, mpv.conf for options. All settings via text files – no menu maze.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-scroll opacity-70"></i><span>4. Lua Scripts & IPC</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Extensible via <a href="https://www.lua.org/" target="_blank" class="topic-link">Lua</a>/<a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JS</a> scripts. <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a> IPC for external control. <a href="https://github.com/bloc97/Anime4K" target="_blank" class="topic-link">Anime4K</a>, <a href="https://www.svp-team.com/" target="_blank" class="topic-link">SVPflow</a>, <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> integration.</p>
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
            { icon: 'fa-globe',    href: 'https://mpv.io/manual/',                          target: '_blank', labelDe: 'Offizielles Handbuch',     labelEn: 'Official Manual' },
            { icon: 'fa-download', href: 'https://mpv.io/installation/',                    target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-github',   href: 'https://github.com/mpv-player/mpv',               target: '_blank', labelDe: 'GitHub Repository',         labelEn: 'GitHub Repository' },
            { icon: 'fa-book',     href: 'https://github.com/mpv-player/mpv/wiki',          target: '_blank', labelDe: 'Wiki',                      labelEn: 'Wiki' },
            { icon: 'fa-comments', href: 'https://github.com/mpv-player/mpv/discussions',   target: '_blank', labelDe: 'Discussions',               labelEn: 'Discussions' }
        ]
    },

    footer: {
        textDe: 'mpv Referenz · v1.0 · Dual Lang',
        textEn: 'mpv Reference · v1.0 · Dual Lang'
    }
});