// resources/topics/topic_yt-dlp.js
// Registers the yt-dlp downloader reference topic. Loaded via <script> injection.

/* ==================================================================
   YT-DLP CODE-BLOCK COPY CONTROLLER
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
    id: 'yt-dlp Overview',
    icon: 'fa-download',
    titleDe: 'YT-DLP',
    titleEn: 'YT-DLP',
    descDe: 'Feature-reicher CLI Audio/Video Downloader',
    descEn: 'Feature-Rich CLI Audio/Video Downloader',

    sidebarTitleDe: 'yt-dlp',
    sidebarTitleEn: 'yt-dlp',
    sidebarSubtitleDe: 'Fork von youtube-dl',
    sidebarSubtitleEn: 'Fork of youtube-dl',
    sidebarVersion: 'v2026.07+',

    hero: {
        titleDe: 'yt-dlp: Der moderne Video-Downloader',
        titleEn: 'yt-dlp: The Modern Video Downloader',
        introDe: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> ist ein <strong>feature-reicher Kommandozeilen-Downloader für Audio und Video</strong> mit Unterstützung für tausende Websites. Das Projekt ist ein Fork von <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> und basiert auf dem inzwischen inaktiven <a href="https://github.com/blackjack4494/yt-dlc" target="_blank" class="topic-link">youtube-dlc</a>. <a href="https://github.com/yt-dlp/yt-dlp/wiki" target="_blank" class="topic-link">Zur offiziellen Wiki</a>.',
        introEn: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> is a <strong>feature-rich command-line audio/video downloader</strong> with support for thousands of sites. The project is a fork of <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> based on the now inactive <a href="https://github.com/blackjack4494/yt-dlc" target="_blank" class="topic-link">youtube-dlc</a>. <a href="https://github.com/yt-dlp/yt-dlp/wiki" target="_blank" class="topic-link">Visit the official Wiki</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-list',              href: '#section3', switchToDoc: true, labelDe: 'Formate',        labelEn: 'Formats' },
        { icon: 'fa-magic',             href: '#section4', switchToDoc: true, labelDe: 'Post-Processing', labelEn: 'Post-Processing' },
        { icon: 'fa-cog',               href: '#section5', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-file',              href: '#section6', switchToDoc: true, labelDe: 'Ausgabe',        labelEn: 'Output' },
        { icon: 'fa-external-link-alt', href: 'https://github.com/yt-dlp/yt-dlp', target: '_blank', labelDe: 'GitHub Repository', labelEn: 'GitHub Repository' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Features',
            titleEn: '1. Overview & Features',
            introDe: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> ist ein <strong>Kommandozeilen-Tool zum Herunterladen von Audio und Video</strong> von tausenden Websites. Es ist ein Fork von <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> mit zusätzlichen Features und Fixes. Die wichtigsten Verbesserungen gegenüber <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> sind schnellere Updates, bessere Format-Auswahl, mehr Extractors und <a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a>-Integration [citation:10].',
            introEn: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> is a <strong>command-line tool for downloading audio and video</strong> from thousands of sites. It is a fork of <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> with additional features and fixes. The key improvements over <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> are faster updates, better format selection, more extractors, and <a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a> integration [citation:10].',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist yt-dlp?',
                    titleEn: 'What is yt-dlp?',
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
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Kommandozeilen Audio/Video Downloader.</td></tr>
                    <tr><td><strong>Herkunft</strong></td><td class="text-[var(--text-muted)]">Fork von <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a>, basierend auf <a href="https://github.com/blackjack4494/yt-dlc" target="_blank" class="topic-link">youtube-dlc</a> [citation:11].</td></tr>
                    <tr><td><strong>Lizenz</strong></td><td class="text-[var(--text-muted)]"><a href="https://github.com/yt-dlp/yt-dlp/blob/master/LICENSE" target="_blank" class="topic-link">Unlicense</a> – vollständig frei und quelloffen.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.freebsd.org/" target="_blank" class="topic-link">FreeBSD</a> [citation:11].</td></tr>
                    <tr><td><strong>Abhängigkeiten</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.python.org/" target="_blank" class="topic-link">Python</a> 3.10+, <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> (empfohlen), <a href="https://deno.land/" target="_blank" class="topic-link">Deno</a>/<a href="https://nodejs.org/" target="_blank" class="topic-link">Node.js</a> für YouTube [citation:1].</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Download von tausenden Websites, Format-Auswahl, Post-Processing, Metadaten.</td></tr>
                    <tr><td><strong>Besonderheiten</strong></td><td class="text-[var(--text-muted)]"><a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a>, <a href="https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp" target="_blank" class="topic-link">Browser-Cookies</a>, <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a>-Integration [citation:7].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Command-line audio/video downloader.</td></tr>
                    <tr><td><strong>Origin</strong></td><td class="text-[var(--text-muted)]">Fork of <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a>, based on <a href="https://github.com/blackjack4494/yt-dlc" target="_blank" class="topic-link">youtube-dlc</a> [citation:11].</td></tr>
                    <tr><td><strong>License</strong></td><td class="text-[var(--text-muted)]"><a href="https://github.com/yt-dlp/yt-dlp/blob/master/LICENSE" target="_blank" class="topic-link">Unlicense</a> – fully free and open source.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.freebsd.org/" target="_blank" class="topic-link">FreeBSD</a> [citation:11].</td></tr>
                    <tr><td><strong>Dependencies</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.python.org/" target="_blank" class="topic-link">Python</a> 3.10+, <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> (recommended), <a href="https://deno.land/" target="_blank" class="topic-link">Deno</a>/<a href="https://nodejs.org/" target="_blank" class="topic-link">Node.js</a> for YouTube [citation:1].</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Download from thousands of sites, format selection, post-processing, metadata.</td></tr>
                    <tr><td><strong>Specialties</strong></td><td class="text-[var(--text-muted)]"><a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a>, <a href="https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp" target="_blank" class="topic-link">browser cookies</a>, <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> integration [citation:7].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'yt-dlp vs. youtube-dl',
                    titleEn: 'yt-dlp vs. youtube-dl',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/3"><a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a></th><th class="w-1/3"><a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a></th></tr>
                    <tr><td><strong>Entwicklung</strong></td><td class="text-[var(--text-muted)]">Aktiv, tägliche Updates [citation:10]</td><td class="text-[var(--text-muted)]">Langsamer, weniger Updates</td></tr>
                    <tr><td><strong>Format-Auswahl</strong></td><td class="text-[var(--text-muted)]">Erweitert, <code>-S</code> Sorting [citation:4]</td><td class="text-[var(--text-muted)]">Basis</td></tr>
                    <tr><td><strong>SponsorBlock</strong></td><td class="text-[var(--text-muted)]">Integriert [citation:5]</td><td class="text-[var(--text-muted)]">Nicht verfügbar</td></tr>
                    <tr><td><strong>Extractors</strong></td><td class="text-[var(--text-muted)]">Mehr Sites, schnellere Fixes [citation:10]</td><td class="text-[var(--text-muted)]">Weniger</td></tr>
                    <tr><td><strong>Playlists</strong></td><td class="text-[var(--text-muted)]">Besseres Handling [citation:10]</td><td class="text-[var(--text-muted)]">Grundlegend</td></tr>
                    <tr><td><strong>Python</strong></td><td class="text-[var(--text-muted)]">3.10+ [citation:10]</td><td class="text-[var(--text-muted)]">2.7+</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/3"><a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a></th><th class="w-1/3"><a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a></th></tr>
                    <tr><td><strong>Development</strong></td><td class="text-[var(--text-muted)]">Active, daily updates [citation:10]</td><td class="text-[var(--text-muted)]">Slower, fewer updates</td></tr>
                    <tr><td><strong>Format selection</strong></td><td class="text-[var(--text-muted)]">Advanced, <code>-S</code> sorting [citation:4]</td><td class="text-[var(--text-muted)]">Basic</td></tr>
                    <tr><td><strong>SponsorBlock</strong></td><td class="text-[var(--text-muted)]">Integrated [citation:5]</td><td class="text-[var(--text-muted)]">Not available</td></tr>
                    <tr><td><strong>Extractors</strong></td><td class="text-[var(--text-muted)]">More sites, faster fixes [citation:10]</td><td class="text-[var(--text-muted)]">Fewer</td></tr>
                    <tr><td><strong>Playlists</strong></td><td class="text-[var(--text-muted)]">Better handling [citation:10]</td><td class="text-[var(--text-muted)]">Basic</td></tr>
                    <tr><td><strong>Python</strong></td><td class="text-[var(--text-muted)]">3.10+ [citation:10]</td><td class="text-[var(--text-muted)]">2.7+</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> kann als Standalone-Binary, über <a href="https://pypi.org/project/yt-dlp/" target="_blank" class="topic-link">pip</a> oder Paketmanager installiert werden. Für <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> und <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> wird das zipimport-Binary empfohlen, für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> die .exe-Datei [citation:11].',
            introEn: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> can be installed as a standalone binary, via <a href="https://pypi.org/project/yt-dlp/" target="_blank" class="topic-link">pip</a>, or through package managers. For <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> and <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, the zipimport binary is recommended; for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, the .exe file [citation:11].',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://github.com/yt-dlp/yt-dlp#release-files" target="_blank" class="topic-link">Standalone Binary</a></strong></td><td class="text-[var(--text-muted)]">Empfohlen für <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (zipimport) und <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (.exe) [citation:11].</td></tr>
                    <tr><td><strong><a href="https://pypi.org/project/yt-dlp/" target="_blank" class="topic-link">pip</a></strong></td><td class="text-[var(--text-muted)]"><code>pip install yt-dlp</code> – erfordert <a href="https://www.python.org/" target="_blank" class="topic-link">Python</a> 3.10+ [citation:10].</td></tr>
                    <tr><td><strong><a href="https://github.com/yt-dlp/yt-dlp/wiki/Installation" target="_blank" class="topic-link">Paketmanager</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://brew.sh/" target="_blank" class="topic-link">Homebrew</a>, <a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a>, <a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a>, <a href="https://winget.run/" target="_blank" class="topic-link">winget</a> [citation:10].</td></tr>
                    <tr><td><strong><a href="https://github.com/yt-dlp/yt-dlp#dependencies" target="_blank" class="topic-link">Abhängigkeiten</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> für Merging/Post-Processing, <a href="https://deno.land/" target="_blank" class="topic-link">Deno</a> für YouTube [citation:1].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://github.com/yt-dlp/yt-dlp#release-files" target="_blank" class="topic-link">Standalone Binary</a></strong></td><td class="text-[var(--text-muted)]">Recommended for <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (zipimport) and <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (.exe) [citation:11].</td></tr>
                    <tr><td><strong><a href="https://pypi.org/project/yt-dlp/" target="_blank" class="topic-link">pip</a></strong></td><td class="text-[var(--text-muted)]"><code>pip install yt-dlp</code> – requires <a href="https://www.python.org/" target="_blank" class="topic-link">Python</a> 3.10+ [citation:10].</td></tr>
                    <tr><td><strong><a href="https://github.com/yt-dlp/yt-dlp/wiki/Installation" target="_blank" class="topic-link">Package managers</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://brew.sh/" target="_blank" class="topic-link">Homebrew</a>, <a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a>, <a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a>, <a href="https://winget.run/" target="_blank" class="topic-link">winget</a> [citation:10].</td></tr>
                    <tr><td><strong><a href="https://github.com/yt-dlp/yt-dlp#dependencies" target="_blank" class="topic-link">Dependencies</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> for merging/post-processing, <a href="https://deno.land/" target="_blank" class="topic-link">Deno</a> for YouTube [citation:1].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Linux / macOS Installation',
                    titleEn: 'Linux / macOS Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Standalone Binary installieren:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Linux/macOS (zipimport)
sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Aktualisieren:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Stable
yt-dlp --update

# Nightly (empfohlen für häufige Nutzung) [citation:10]
yt-dlp --update-to nightly</pre>
                    </div>
                    <p class="mt-3">Nightly-Builds werden täglich aktualisiert und sind für häufig wechselnde Websites wie <a href="https://www.youtube.com/" target="_blank" class="topic-link">YouTube</a> zuverlässiger [citation:10].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Install standalone binary:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Linux/macOS (zipimport)
sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Update:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Stable
yt-dlp --update

# Nightly (recommended for frequent use) [citation:10]
yt-dlp --update-to nightly</pre>
                    </div>
                    <p class="mt-3">Nightly builds are updated daily and are more reliable for frequently changing sites like <a href="https://www.youtube.com/" target="_blank" class="topic-link">YouTube</a> [citation:10].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. FORMATE ============ */
        {
            id: 'section3',
            titleDe: '3. Format-Auswahl',
            titleEn: '3. Format Selection',
            introDe: 'Die Format-Auswahl ist eines der mächtigsten Features von <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a>. Mit <code>-f</code> werden Formate nach Kriterien wie Qualität, Codec und Auflösung gefiltert; <code>-S</code> sortiert die verfügbaren Formate [citation:4].',
            introEn: 'Format selection is one of <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a>\'s most powerful features. Use <code>-f</code> to filter formats by criteria like quality, codec, and resolution; <code>-S</code> sorts the available formats [citation:4].',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Format-Selektoren',
                    titleEn: 'Format Selectors',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Selektor</th><th>Bedeutung</th></tr>
                    <tr><td><code>bv</code></td><td class="text-[var(--text-muted)]">Best video-only format [citation:4].</td></tr>
                    <tr><td><code>ba</code></td><td class="text-[var(--text-muted)]">Best audio-only format [citation:4].</td></tr>
                    <tr><td><code>bv*+ba/b</code></td><td class="text-[var(--text-muted)]">Best video + best audio, or best combined [citation:4].</td></tr>
                    <tr><td><code>bestvideo[ext=mp4]</code></td><td class="text-[var(--text-muted)]">Best video in MP4 container [citation:10].</td></tr>
                    <tr><td><code>bv[height<=720]</code></td><td class="text-[var(--text-muted)]">Video bis max. 720p [citation:4].</td></tr>
                    <tr><td><code>all[vcodec=none]</code></td><td class="text-[var(--text-muted)]">Alle audio-only Formate [citation:16].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Selector</th><th>Meaning</th></tr>
                    <tr><td><code>bv</code></td><td class="text-[var(--text-muted)]">Best video-only format [citation:4].</td></tr>
                    <tr><td><code>ba</code></td><td class="text-[var(--text-muted)]">Best audio-only format [citation:4].</td></tr>
                    <tr><td><code>bv*+ba/b</code></td><td class="text-[var(--text-muted)]">Best video + best audio, or best combined [citation:4].</td></tr>
                    <tr><td><code>bestvideo[ext=mp4]</code></td><td class="text-[var(--text-muted)]">Best video in MP4 container [citation:10].</td></tr>
                    <tr><td><code>bv[height<=720]</code></td><td class="text-[var(--text-muted)]">Video up to 720p [citation:4].</td></tr>
                    <tr><td><code>all[vcodec=none]</code></td><td class="text-[var(--text-muted)]">All audio-only formats [citation:16].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Praxis-Beispiele',
                    titleEn: 'Practical Examples',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Häufige Download-Szenarien:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Beste Qualität (Video+Audio merged) [citation:10]
yt-dlp -f "bestvideo+bestaudio" URL

# Bestes MP4 (kompatibel) [citation:10]
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" URL

# Audio extrahieren als MP3 [citation:10]
yt-dlp -x --audio-format mp3 URL

# Max. 720p
yt-dlp -f "bv[height<=720]+ba/b[height<=720]" URL

# Playlist herunterladen [citation:10]
yt-dlp PLAYLIST_URL</pre>
                    </div>
                    <p class="mt-3"><strong>Tipp:</strong> <code>yt-dlp -F URL</code> listet alle verfügbaren Formate mit ID, Auflösung und Codec auf [citation:8].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Common download scenarios:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Best quality (video+audio merged) [citation:10]
yt-dlp -f "bestvideo+bestaudio" URL

# Best MP4 (compatible) [citation:10]
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" URL

# Extract audio as MP3 [citation:10]
yt-dlp -x --audio-format mp3 URL

# Max 720p
yt-dlp -f "bv[height<=720]+ba/b[height<=720]" URL

# Download playlist [citation:10]
yt-dlp PLAYLIST_URL</pre>
                    </div>
                    <p class="mt-3"><strong>Tip:</strong> <code>yt-dlp -F URL</code> lists all available formats with ID, resolution, and codec [citation:8].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. POST-PROCESSING ============ */
        {
            id: 'section4',
            titleDe: '4. Post-Processing & SponsorBlock',
            titleEn: '4. Post-Processing & SponsorBlock',
            introDe: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> bietet umfangreiche Post-Processing-Optionen über <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a>. Die <a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a>-Integration kann Sponsor-Segmente automatisch markieren oder entfernen [citation:5].',
            introEn: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> offers extensive post-processing options via <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a>. The <a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a> integration can automatically mark or remove sponsor segments [citation:5].',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'SponsorBlock',
                    titleEn: 'SponsorBlock',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Sponsor-Segmente markieren:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Sponsor-Segmente als Kapitel markieren [citation:5]
yt-dlp --sponsorblock-mark sponsor URL

# Intro und Outro ebenfalls markieren
yt-dlp --sponsorblock-mark "sponsor,intro,outro" URL</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Sponsor-Segmente entfernen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Sponsor-Segmente aus dem Video schneiden [citation:5]
yt-dlp --sponsorblock-remove sponsor URL

# Sponsor und Intro entfernen
yt-dlp --sponsorblock-remove "sponsor,intro" URL</pre>
                    </div>
                    <p class="mt-3"><strong>Verfügbare Kategorien:</strong> sponsor, intro, outro, selfpromo, preview, filler, interaction, music_offtopic, poi_highlight, chapter, all, default [citation:5].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Mark sponsor segments:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Mark sponsor segments as chapters [citation:5]
yt-dlp --sponsorblock-mark sponsor URL

# Also mark intro and outro
yt-dlp --sponsorblock-mark "sponsor,intro,outro" URL</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Remove sponsor segments:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Cut sponsor segments from video [citation:5]
yt-dlp --sponsorblock-remove sponsor URL

# Remove sponsor and intro
yt-dlp --sponsorblock-remove "sponsor,intro" URL</pre>
                    </div>
                    <p class="mt-3"><strong>Available categories:</strong> sponsor, intro, outro, selfpromo, preview, filler, interaction, music_offtopic, poi_highlight, chapter, all, default [citation:5].</p>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Remuxing & Re-Encoding',
                    titleEn: 'Remuxing & Re-Encoding',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Option</th><th>Beschreibung</th></tr>
                    <tr><td><code>--remux-video mkv</code></td><td class="text-[var(--text-muted)]">Container in MKV ändern (verlustfrei, schnell) [citation:5].</td></tr>
                    <tr><td><code>--remux-video mp4</code></td><td class="text-[var(--text-muted)]">Container in MP4 ändern [citation:5].</td></tr>
                    <tr><td><code>--recode-video mp4</code></td><td class="text-[var(--text-muted)]">Video neu kodieren (langsamer, Codec-Änderung) [citation:5].</td></tr>
                    <tr><td><code>--split-chapters</code></td><td class="text-[var(--text-muted)]">Video anhand Kapitel in separate Dateien aufteilen [citation:5].</td></tr>
                    <tr><td><code>--embed-chapters</code></td><td class="text-[var(--text-muted)]">Kapitelmarker in die Datei einbetten [citation:5].</td></tr>
                    <tr><td><code>--embed-thumbnail</code></td><td class="text-[var(--text-muted)]">Vorschaubild einbetten [citation:1].</td></tr>
                    <tr><td><code>--embed-metadata</code></td><td class="text-[var(--text-muted)]">Metadaten (inkl. Kapitel) einbetten [citation:5].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Option</th><th>Description</th></tr>
                    <tr><td><code>--remux-video mkv</code></td><td class="text-[var(--text-muted)]">Change container to MKV (lossless, fast) [citation:5].</td></tr>
                    <tr><td><code>--remux-video mp4</code></td><td class="text-[var(--text-muted)]">Change container to MP4 [citation:5].</td></tr>
                    <tr><td><code>--recode-video mp4</code></td><td class="text-[var(--text-muted)]">Re-encode video (slower, codec change) [citation:5].</td></tr>
                    <tr><td><code>--split-chapters</code></td><td class="text-[var(--text-muted)]">Split video into separate files by chapters [citation:5].</td></tr>
                    <tr><td><code>--embed-chapters</code></td><td class="text-[var(--text-muted)]">Embed chapter markers into the file [citation:5].</td></tr>
                    <tr><td><code>--embed-thumbnail</code></td><td class="text-[var(--text-muted)]">Embed thumbnail [citation:1].</td></tr>
                    <tr><td><code>--embed-metadata</code></td><td class="text-[var(--text-muted)]">Embed metadata (includes chapters by default) [citation:5].</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. KONFIGURATION ============ */
        {
            id: 'section5',
            titleDe: '5. Konfiguration & Cookies',
            titleEn: '5. Configuration & Cookies',
            introDe: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> kann über eine Konfigurationsdatei (<code>yt-dlp.conf</code>) und <a href="https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp" target="_blank" class="topic-link">Browser-Cookies</a> gesteuert werden. Cookies sind für altersbeschränkte oder private Inhalte erforderlich [citation:7].',
            introEn: '<a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> can be controlled via a configuration file (<code>yt-dlp.conf</code>) and <a href="https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp" target="_blank" class="topic-link">browser cookies</a>. Cookies are required for age-restricted or private content [citation:7].',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Cookies aus Browser',
                    titleEn: 'Cookies from Browser',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Cookies automatisch aus Browser extrahieren:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Cookies aus Chrome [citation:7]
yt-dlp --cookies-from-browser chrome URL

# Cookies aus Firefox
yt-dlp --cookies-from-browser firefox URL

# Mit spezifischem Profil
yt-dlp --cookies-from-browser "chrome:Profile 1" URL

# Cookies in Datei speichern (für spätere Nutzung)
yt-dlp --cookies-from-browser chrome --cookies cookies.txt URL</pre>
                    </div>
                    <p class="mt-3">Unter <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> wird für <a href="https://www.gnome.org/" target="_blank" class="topic-link">Gnome</a>-Keyring <code>secretstorage</code> benötigt [citation:1].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Extract cookies from browser automatically:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Cookies from Chrome [citation:7]
yt-dlp --cookies-from-browser chrome URL

# Cookies from Firefox
yt-dlp --cookies-from-browser firefox URL

# With specific profile
yt-dlp --cookies-from-browser "chrome:Profile 1" URL

# Save cookies to file (for later use)
yt-dlp --cookies-from-browser chrome --cookies cookies.txt URL</pre>
                    </div>
                    <p class="mt-3">On <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <code>secretstorage</code> is required for <a href="https://www.gnome.org/" target="_blank" class="topic-link">Gnome</a> keyring [citation:1].</p>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Konfigurationsdatei',
                    titleEn: 'Configuration File',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Speicherorte für yt-dlp.conf:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>: <code>~/.config/yt-dlp/config</code></li>
                    <li><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>: <code>%APPDATA%\\yt-dlp\\config.txt</code></li>
                    </ul>
                    <p class="mb-2 mt-3"><strong>Beispiel-Konfiguration:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Immer beste Qualität
-f bestvideo+bestaudio/best

# SponsorBlock aktivieren
--sponsorblock-remove sponsor

# Metadaten einbetten
--embed-metadata
--embed-thumbnail

# Ausgabe-Template
-o "%(title)s [%(id)s].%(ext)s"</pre>
                    </div>
                    <p class="mt-3">Optionen in der Konfigurationsdatei werden ohne das <code>--</code>-Präfix geschrieben.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Locations for yt-dlp.conf:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>: <code>~/.config/yt-dlp/config</code></li>
                    <li><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>: <code>%APPDATA%\\yt-dlp\\config.txt</code></li>
                    </ul>
                    <p class="mb-2 mt-3"><strong>Example configuration:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Always best quality
-f bestvideo+bestaudio/best

# Enable SponsorBlock
--sponsorblock-remove sponsor

# Embed metadata
--embed-metadata
--embed-thumbnail

# Output template
-o "%(title)s [%(id)s].%(ext)s"</pre>
                    </div>
                    <p class="mt-3">Options in the config file are written without the <code>--</code> prefix.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. AUSGABE ============ */
        {
            id: 'section6',
            titleDe: '6. Ausgabe-Templates & Archiv',
            titleEn: '6. Output Templates & Archive',
            introDe: 'Mit <code>-o</code> kann der Dateiname über ein <a href="https://github.com/yt-dlp/yt-dlp#output-template" target="_blank" class="topic-link">Output-Template</a> gesteuert werden. Die <code>--download-archive</code>-Option verhindert das erneute Herunterladen bereits archivierter Videos [citation:17].',
            introEn: 'Use <code>-o</code> to control the filename via an <a href="https://github.com/yt-dlp/yt-dlp#output-template" target="_blank" class="topic-link">output template</a>. The <code>--download-archive</code> option prevents re-downloading already archived videos [citation:17].',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Output-Template Variablen',
                    titleEn: 'Output Template Variables',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Variable</th><th>Beschreibung</th></tr>
                    <tr><td><code>%(title)s</code></td><td class="text-[var(--text-muted)]">Video-Titel.</td></tr>
                    <tr><td><code>%(id)s</code></td><td class="text-[var(--text-muted)]">Video-ID.</td></tr>
                    <tr><td><code>%(ext)s</code></td><td class="text-[var(--text-muted)]">Dateiendung.</td></tr>
                    <tr><td><code>%(upload_date)s</code></td><td class="text-[var(--text-muted)]">Upload-Datum (YYYYMMDD).</td></tr>
                    <tr><td><code>%(channel)s</code></td><td class="text-[var(--text-muted)]">Kanalname.</td></tr>
                    <tr><td><code>%(resolution)s</code></td><td class="text-[var(--text-muted)]">Auflösung (z.B. 1920x1080).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Variable</th><th>Description</th></tr>
                    <tr><td><code>%(title)s</code></td><td class="text-[var(--text-muted)]">Video title.</td></tr>
                    <tr><td><code>%(id)s</code></td><td class="text-[var(--text-muted)]">Video ID.</td></tr>
                    <tr><td><code>%(ext)s</code></td><td class="text-[var(--text-muted)]">File extension.</td></tr>
                    <tr><td><code>%(upload_date)s</code></td><td class="text-[var(--text-muted)]">Upload date (YYYYMMDD).</td></tr>
                    <tr><td><code>%(channel)s</code></td><td class="text-[var(--text-muted)]">Channel name.</td></tr>
                    <tr><td><code>%(resolution)s</code></td><td class="text-[var(--text-muted)]">Resolution (e.g., 1920x1080).</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Archiv & Batch-Downloads',
                    titleEn: 'Archive & Batch Downloads',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Download-Archiv verwenden:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Archivdatei anlegen (verhindert erneutes Herunterladen) [citation:17]
yt-dlp --download-archive archive.txt PLAYLIST_URL

# Kanal abonnieren (nur neue Videos) [citation:17]
yt-dlp --download-archive archive.txt --output "%(upload_date)s - %(title)s.%(ext)s" CHANNEL_URL</pre>
                    </div>
                    <p class="mt-3"><strong>Tipp:</strong> Mit <code>--playlist-items 1-10</code> können nur bestimmte Einträge einer Playlist heruntergeladen werden [citation:2].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Use download archive:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Create archive file (prevents re-downloading) [citation:17]
yt-dlp --download-archive archive.txt PLAYLIST_URL

# Subscribe to channel (new videos only) [citation:17]
yt-dlp --download-archive archive.txt --output "%(upload_date)s - %(title)s.%(ext)s" CHANNEL_URL</pre>
                    </div>
                    <p class="mt-3"><strong>Tip:</strong> Use <code>--playlist-items 1-10</code> to download only specific items from a playlist [citation:2].</p>
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
            introDe: 'Die wichtigsten <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" class="topic-link">yt-dlp</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-download opacity-70"></i><span>1. Feature-reich</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Tausende Websites, erweiterte Format-Auswahl, aktive Entwicklung. Fork von <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> [citation:10].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-magic opacity-70"></i><span>2. SponsorBlock</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Sponsor-Segmente automatisch markieren oder entfernen. Unterstützt alle <a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a>-Kategorien [citation:5].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cog opacity-70"></i><span>3. Post-Processing</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a>-Integration: Remuxing, Re-Encoding, Metadaten, Thumbnails, Kapitel [citation:5].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cookie opacity-70"></i><span>4. Browser-Cookies</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Cookies aus Chrome, Firefox, Edge automatisch extrahieren für altersbeschränkte Inhalte [citation:7].</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-download opacity-70"></i><span>1. Feature-rich</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Thousands of sites, advanced format selection, active development. Fork of <a href="https://github.com/ytdl-org/youtube-dl" target="_blank" class="topic-link">youtube-dl</a> [citation:10].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-magic opacity-70"></i><span>2. SponsorBlock</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Automatically mark or remove sponsor segments. Supports all <a href="https://sponsor.ajay.app/" target="_blank" class="topic-link">SponsorBlock</a> categories [citation:5].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cog opacity-70"></i><span>3. Post-Processing</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> integration: remuxing, re-encoding, metadata, thumbnails, chapters [citation:5].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cookie opacity-70"></i><span>4. Browser Cookies</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Extract cookies from Chrome, Firefox, Edge automatically for age-restricted content [citation:7].</p>
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
            { icon: 'fa-globe',    href: 'https://github.com/yt-dlp/yt-dlp',                target: '_blank', labelDe: 'GitHub Repository',         labelEn: 'GitHub Repository' },
            { icon: 'fa-download', href: 'https://github.com/yt-dlp/yt-dlp/releases',       target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-book',     href: 'https://github.com/yt-dlp/yt-dlp/wiki',          target: '_blank', labelDe: 'Offizielle Wiki',           labelEn: 'Official Wiki' },
            { icon: 'fa-file-alt', href: 'https://github.com/yt-dlp/yt-dlp#readme',         target: '_blank', labelDe: 'README',                     labelEn: 'README' },
            { icon: 'fa-comments', href: 'https://github.com/yt-dlp/yt-dlp/discussions',   target: '_blank', labelDe: 'Discussions',               labelEn: 'Discussions' }
        ]
    },

    footer: {
        textDe: 'yt-dlp Referenz · v1.0 · Dual Lang',
        textEn: 'yt-dlp Reference · v1.0 · Dual Lang'
    }
});