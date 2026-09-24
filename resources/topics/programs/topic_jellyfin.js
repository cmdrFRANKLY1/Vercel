// resources/topics/topic_jellyfin.js
// Registers the Jellyfin media server reference topic. Loaded via <script> injection.

/* ==================================================================
   JELLYFIN CODE-BLOCK COPY CONTROLLER
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
    id: 'Jellyfin Overview',
    icon: 'fa-play-circle',
    titleDe: 'Jellyfin',
    titleEn: 'Jellyfin',
    descDe: 'Jellyfin Media Server & Client',
    descEn: 'Jellyfin Media Server & Client',

    sidebarTitleDe: 'Jellyfin',
    sidebarTitleEn: 'Jellyfin',
    sidebarSubtitleDe: 'Open-Source Media Server',
    sidebarSubtitleEn: 'Open-Source Media Server',
    sidebarVersion: 'v10.11+',

    hero: {
        titleDe: 'Jellyfin: Der freie Media Server',
        titleEn: 'Jellyfin: The Free Media Server',
        introDe: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> ist ein <strong>kostenloses Open-Source-Media-System</strong>, mit dem Sie Ihre Medienbibliothek verwalten und auf alle Ihre Geräte streamen können. Es ist eine Alternative zu den proprietären Lösungen <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a> und <a href="https://www.plex.tv/" target="_blank" class="topic-link">Plex</a> – <strong>ohne Premium-Lizenzen, ohne versteckte Kosten und ohne Einschränkungen</strong>. <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> entstand als Fork von <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a> 3.5.2 und wurde auf das <a href="https://dotnet.microsoft.com/" target="_blank" class="topic-link">.NET</a>-Core-Framework portiert, um vollständige plattformübergreifende Unterstützung zu ermöglichen. <a href="https://jellyfin.org/docs/" target="_blank" class="topic-link">Zur offiziellen Dokumentation</a>.',
        introEn: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> is a <strong>free and open-source media system</strong> that puts you in control of managing and streaming your media. It is an alternative to the proprietary <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a> and <a href="https://www.plex.tv/" target="_blank" class="topic-link">Plex</a> – <strong>with no premium licenses, no hidden costs, and no strings attached</strong>. <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> is descended from <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a>\'s 3.5.2 release and ported to the <a href="https://dotnet.microsoft.com/" target="_blank" class="topic-link">.NET</a> Core framework to enable full cross-platform support. <a href="https://jellyfin.org/docs/" target="_blank" class="topic-link">Visit the official documentation</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-tv',                href: '#section3', switchToDoc: true, labelDe: 'Clients',        labelEn: 'Clients' },
        { icon: 'fa-microchip',         href: '#section4', switchToDoc: true, labelDe: 'Transcoding',    labelEn: 'Transcoding' },
        { icon: 'fa-puzzle-piece',      href: '#section5', switchToDoc: true, labelDe: 'Plugins',        labelEn: 'Plugins' },
        { icon: 'fa-cog',               href: '#section6', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://jellyfin.org/docs/', target: '_blank', labelDe: 'Offizielle Doku', labelEn: 'Official Docs' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Philosophie',
            titleEn: '1. Overview & Philosophy',
            introDe: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> ist ein Media-Server, der Ihre persönliche Mediensammlung organisiert, katalogisiert und auf Ihre Geräte streamt. Der entscheidende Unterschied zu <a href="https://www.plex.tv/" target="_blank" class="topic-link">Plex</a> und <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a>: <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> ist <strong>vollständig kostenlos und Open Source</strong>. Mehr dazu im <a href="https://jellyfin.org/docs/general/about/" target="_blank" class="topic-link">offiziellen About-Bereich</a>.',
            introEn: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> is a media server that organizes, catalogs, and streams your personal media collection to your devices. The key difference from <a href="https://www.plex.tv/" target="_blank" class="topic-link">Plex</a> and <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a>: <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> is <strong>completely free and open source</strong>. Learn more in the <a href="https://jellyfin.org/docs/general/about/" target="_blank" class="topic-link">official About section</a>.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Jellyfin?',
                    titleEn: 'What is Jellyfin?',
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
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Open-Source Media Server (Fork von <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a> 3.5.2).</td></tr>
                    <tr><td><strong>Lizenz</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a> – vollständig frei, keine Premium-Tier.</td></tr>
                    <tr><td><strong>Kosten</strong></td><td class="text-[var(--text-muted)]">Immer 0 € – es gibt keine Bezahlversion.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>, NAS-Systeme.</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Streaming von Filmen, Serien, Musik, Fotos und Live-TV.</td></tr>
                    <tr><td><strong>Transcoding</strong></td><td class="text-[var(--text-muted)]">Hardware-Beschleunigung mit <a href="https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-general.html" target="_blank" class="topic-link">Intel QSV</a>, <a href="https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new" target="_blank" class="topic-link">NVIDIA NVENC</a>, <a href="https://www.amd.com/en/technologies/amd-media-framework" target="_blank" class="topic-link">AMD AMF</a>, <a href="https://en.wikipedia.org/wiki/Video_Acceleration_API" target="_blank" class="topic-link">VA-API</a>, <a href="https://developer.apple.com/documentation/videotoolbox" target="_blank" class="topic-link">VideoToolbox</a>, <a href="https://en.wikipedia.org/wiki/Rockchip" target="_blank" class="topic-link">Rockchip</a> RKMPP.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Open-source media server (fork of <a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a> 3.5.2).</td></tr>
                    <tr><td><strong>License</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a> – fully free, no premium tier.</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">Always $0 – there is no paid version.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>, NAS systems.</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Streaming movies, TV shows, music, photos, and Live TV.</td></tr>
                    <tr><td><strong>Transcoding</strong></td><td class="text-[var(--text-muted)]">Hardware acceleration with <a href="https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-general.html" target="_blank" class="topic-link">Intel QSV</a>, <a href="https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new" target="_blank" class="topic-link">NVIDIA NVENC</a>, <a href="https://www.amd.com/en/technologies/amd-media-framework" target="_blank" class="topic-link">AMD AMF</a>, <a href="https://en.wikipedia.org/wiki/Video_Acceleration_API" target="_blank" class="topic-link">VA-API</a>, <a href="https://developer.apple.com/documentation/videotoolbox" target="_blank" class="topic-link">VideoToolbox</a>, <a href="https://en.wikipedia.org/wiki/Rockchip" target="_blank" class="topic-link">Rockchip</a> RKMPP.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Jellyfin vs. Plex vs. Emby',
                    titleEn: 'Jellyfin vs. Plex vs. Emby',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/4"><a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a></th><th class="w-1/4"><a href="https://www.plex.tv/" target="_blank" class="topic-link">Plex</a></th><th class="w-1/4"><a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a></th></tr>
                    <tr><td><strong>Preis</strong></td><td class="text-[var(--text-muted)]">Immer kostenlos</td><td class="text-[var(--text-muted)]"><a href="https://www.plex.tv/plex-pass/" target="_blank" class="topic-link">Plex Pass</a> ab ~3 €/Monat oder 750 € Lifetime</td><td class="text-[var(--text-muted)]"><a href="https://emby.media/premiere.html" target="_blank" class="topic-link">Emby Premiere</a> ~5 €/Monat oder 119 € Lifetime</td></tr>
                    <tr><td><strong>Open Source</strong></td><td class="text-[var(--text-muted)]">Ja (<a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a>)</td><td class="text-[var(--text-muted)]">Nein</td><td class="text-[var(--text-muted)]">Teilweise (Kern)</td></tr>
                    <tr><td><strong>Remote-Zugriff</strong></td><td class="text-[var(--text-muted)]">Manuell (<a href="https://tailscale.com/" target="_blank" class="topic-link">Mesh-VPN</a>, Tunnel, <a href="https://en.wikipedia.org/wiki/Dynamic_DNS" target="_blank" class="topic-link">DynDNS</a>)</td><td class="text-[var(--text-muted)]">Automatisch (Plex Relay) – teils kostenpflichtig</td><td class="text-[var(--text-muted)]">Manuell (Netzwerk-Konfiguration nötig)</td></tr>
                    <tr><td><strong>Datenschutz</strong></td><td class="text-[var(--text-muted)]">Vollständig lokal – keine Cloud</td><td class="text-[var(--text-muted)]">Cloud-Backend für Login & Metadaten</td><td class="text-[var(--text-muted)]">Teilweise Cloud</td></tr>
                    <tr><td><strong>Einrichtung</strong></td><td class="text-[var(--text-muted)]">Mehr technisches Know-how nötig</td><td class="text-[var(--text-muted)]">Sehr einfach, geführter Assistent</td><td class="text-[var(--text-muted)]">Mittelweg</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> gibt maximale Kontrolle und Privatsphäre, erfordert aber mehr Eigeninitiative bei Netzwerk und Remote-Zugriff.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/4"><a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a></th><th class="w-1/4"><a href="https://www.plex.tv/" target="_blank" class="topic-link">Plex</a></th><th class="w-1/4"><a href="https://www.emby.media/" target="_blank" class="topic-link">Emby</a></th></tr>
                    <tr><td><strong>Price</strong></td><td class="text-[var(--text-muted)]">Always free</td><td class="text-[var(--text-muted)]"><a href="https://www.plex.tv/plex-pass/" target="_blank" class="topic-link">Plex Pass</a> from ~$3/mo or $750 lifetime</td><td class="text-[var(--text-muted)]"><a href="https://emby.media/premiere.html" target="_blank" class="topic-link">Emby Premiere</a> ~$5/mo or $119 lifetime</td></tr>
                    <tr><td><strong>Open Source</strong></td><td class="text-[var(--text-muted)]">Yes (<a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a>)</td><td class="text-[var(--text-muted)]">No</td><td class="text-[var(--text-muted)]">Partial (core)</td></tr>
                    <tr><td><strong>Remote Access</strong></td><td class="text-[var(--text-muted)]">Manual (<a href="https://tailscale.com/" target="_blank" class="topic-link">mesh VPN</a>, tunnel, <a href="https://en.wikipedia.org/wiki/Dynamic_DNS" target="_blank" class="topic-link">DynDNS</a>)</td><td class="text-[var(--text-muted)]">Automatic (Plex Relay) – partly paid</td><td class="text-[var(--text-muted)]">Manual (network config required)</td></tr>
                    <tr><td><strong>Privacy</strong></td><td class="text-[var(--text-muted)]">Fully local – no cloud</td><td class="text-[var(--text-muted)]">Cloud backend for login & metadata</td><td class="text-[var(--text-muted)]">Partially cloud</td></tr>
                    <tr><td><strong>Setup</strong></td><td class="text-[var(--text-muted)]">More technical know-how needed</td><td class="text-[var(--text-muted)]">Very easy, guided wizard</td><td class="text-[var(--text-muted)]">Middle ground</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> gives maximum control and privacy, but requires more initiative for networking and remote access.</p>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> kann nativ, über <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> oder als portable Version installiert werden. Für <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Server ist <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> die empfohlene Methode. Die vollständige Übersicht finden Sie in der <a href="https://jellyfin.org/docs/general/installation/" target="_blank" class="topic-link">offiziellen Installationsanleitung</a>.',
            introEn: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> can be installed natively, via <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>, or as a portable version. For <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> servers, <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> is the recommended method. See the <a href="https://jellyfin.org/docs/general/installation/" target="_blank" class="topic-link">official installation guide</a> for a full overview.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/container/" target="_blank" class="topic-link">Docker (empfohlen)</a></strong></td><td class="text-[var(--text-muted)]">Offizielles Image <code>jellyfin/jellyfin</code> oder <code>ghcr.io/jellyfin/jellyfin</code>. Einfachste Möglichkeit für <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Server.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank" class="topic-link">Linux-Pakete</a></strong></td><td class="text-[var(--text-muted)]">Offizielle Repositories für <a href="https://www.debian.org/" target="_blank" class="topic-link">Debian</a>/<a href="https://ubuntu.com/" target="_blank" class="topic-link">Ubuntu</a>, <a href="https://fedoraproject.org/" target="_blank" class="topic-link">Fedora</a>, <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch</a>. Installation via <code>apt</code>, <code>dnf</code> oder <code>pacman</code>.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/windows/" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer oder portable Version. Tray-App für Systemstart.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG-Installer oder portable Version.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/" target="_blank" class="topic-link">NAS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.synology.com/" target="_blank" class="topic-link">Synology</a>, <a href="https://www.qnap.com/" target="_blank" class="topic-link">QNAP</a>, <a href="https://www.truenas.com/" target="_blank" class="topic-link">TrueNAS</a> über <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> oder native Pakete.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/container/" target="_blank" class="topic-link">Docker (recommended)</a></strong></td><td class="text-[var(--text-muted)]">Official image <code>jellyfin/jellyfin</code> or <code>ghcr.io/jellyfin/jellyfin</code>. Easiest option for <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> servers.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank" class="topic-link">Linux packages</a></strong></td><td class="text-[var(--text-muted)]">Official repos for <a href="https://www.debian.org/" target="_blank" class="topic-link">Debian</a>/<a href="https://ubuntu.com/" target="_blank" class="topic-link">Ubuntu</a>, <a href="https://fedoraproject.org/" target="_blank" class="topic-link">Fedora</a>, <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch</a>. Install via <code>apt</code>, <code>dnf</code>, or <code>pacman</code>.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/windows/" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer or portable version. Tray app for startup.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG installer or portable version.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/" target="_blank" class="topic-link">NAS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.synology.com/" target="_blank" class="topic-link">Synology</a>, <a href="https://www.qnap.com/" target="_blank" class="topic-link">QNAP</a>, <a href="https://www.truenas.com/" target="_blank" class="topic-link">TrueNAS</a> via <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> or native packages.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Docker-Installation (empfohlen)',
                    titleEn: 'Docker Installation (Recommended)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Schritte:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mb-3">
                    <li>Image herunterladen: <code>docker pull jellyfin/jellyfin</code></li>
                    <li>Persistente Ordner erstellen: <code>config</code> und <code>cache</code>.</li>
                    <li>Container starten:</li>
                    </ol>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -d \
  --name jellyfin \
  --user 1000:1000 \
  -p 8096:8096/tcp \
  -p 7359:7359/udp \
  --volume /path/to/config:/config \
  --volume /path/to/cache:/cache \
  --mount type=bind,source=/path/to/media,target=/media \
  --restart=unless-stopped \
  jellyfin/jellyfin</pre>
                    </div>
                    <p class="mt-3"><strong>Hardware-Transcoding:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Intel QSV
--device /dev/dri:/dev/dri

# NVIDIA
--runtime=nvidia --gpus all</pre>
                    </div>
                    <p class="mt-2">Für <a href="https://en.wikipedia.org/wiki/Digital_Living_Network_Alliance" target="_blank" class="topic-link">DLNA</a> wird <code>--net=host</code> benötigt. Weitere Details in der <a href="https://jellyfin.org/docs/general/installation/container/" target="_blank" class="topic-link">offiziellen Container-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Steps:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mb-3">
                    <li>Pull the image: <code>docker pull jellyfin/jellyfin</code></li>
                    <li>Create persistent folders: <code>config</code> and <code>cache</code>.</li>
                    <li>Start the container:</li>
                    </ol>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -d \
  --name jellyfin \
  --user 1000:1000 \
  -p 8096:8096/tcp \
  -p 7359:7359/udp \
  --volume /path/to/config:/config \
  --volume /path/to/cache:/cache \
  --mount type=bind,source=/path/to/media,target=/media \
  --restart=unless-stopped \
  jellyfin/jellyfin</pre>
                    </div>
                    <p class="mt-3"><strong>Hardware Transcoding:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Intel QSV
--device /dev/dri:/dev/dri

# NVIDIA
--runtime=nvidia --gpus all</pre>
                    </div>
                    <p class="mt-2">For <a href="https://en.wikipedia.org/wiki/Digital_Living_Network_Alliance" target="_blank" class="topic-link">DLNA</a>, <code>--net=host</code> is required. See the <a href="https://jellyfin.org/docs/general/installation/container/" target="_blank" class="topic-link">official container documentation</a> for more details.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_3',
                    titleDe: 'Debian / Ubuntu Installation',
                    titleEn: 'Debian / Ubuntu Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Empfohlen: Offizielles Installations-Skript</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">curl -s https://repo.jellyfin.org/install-debuntu.sh -O \
  && curl -s https://repo.jellyfin.org/install-debuntu.sh.sha256sum -O \
  && sha256sum -c install-debuntu.sh.sha256sum \
  && sudo bash install-debuntu.sh</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Manuelle Installation (APT-Repository):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo apt install apt-transport-https

wget -O - https://repo.jellyfin.org/jellyfin_team.gpg.key \
  | sudo apt-key add -

echo "deb [arch=$(dpkg --print-architecture)] https://repo.jellyfin.org/$(awk -F'=' '/^ID=/{print $NF}' /etc/os-release) $(awk -F'=' '/^VERSION_CODENAME=/{print $NF}' /etc/os-release) main" \
  | sudo tee /etc/apt/sources.list.d/jellyfin.list

sudo apt update
sudo apt install jellyfin

sudo systemctl enable --now jellyfin</pre>
                    </div>
                    <p class="mt-3">Nach der Installation: <code>http://localhost:8096</code> im Browser öffnen. Weitere Details in der <a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank" class="topic-link">offiziellen Linux-Anleitung</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Recommended: Official installation script</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">curl -s https://repo.jellyfin.org/install-debuntu.sh -O \
  && curl -s https://repo.jellyfin.org/install-debuntu.sh.sha256sum -O \
  && sha256sum -c install-debuntu.sh.sha256sum \
  && sudo bash install-debuntu.sh</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Manual installation (APT repository):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo apt install apt-transport-https

wget -O - https://repo.jellyfin.org/jellyfin_team.gpg.key \
  | sudo apt-key add -

echo "deb [arch=$(dpkg --print-architecture)] https://repo.jellyfin.org/$(awk -F'=' '/^ID=/{print $NF}' /etc/os-release) $(awk -F'=' '/^VERSION_CODENAME=/{print $NF}' /etc/os-release) main" \
  | sudo tee /etc/apt/sources.list.d/jellyfin.list

sudo apt update
sudo apt install jellyfin

sudo systemctl enable --now jellyfin</pre>
                    </div>
                    <p class="mt-3">After installation: open <code>http://localhost:8096</code> in your browser. See the <a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank" class="topic-link">official Linux guide</a> for more details.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_4',
                    titleDe: 'Arch Linux Installation',
                    titleEn: 'Arch Linux Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Installation aus dem offiziellen Repository (AUR):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo pacman -S jellyfin-server jellyfin-web jellyfin-ffmpeg</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Dienst aktivieren und starten:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo systemctl enable --now jellyfin</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Hardware-Transcoding (Intel QSV):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo pacman -S vpl-gpu-rt</pre>
                    </div>
                    <p class="mt-3">Nach dem Start ist <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> unter <code>http://localhost:8096</code> erreichbar. Weitere Details im <a href="https://wiki.archlinux.org/title/Jellyfin" target="_blank" class="topic-link">ArchWiki-Artikel zu Jellyfin</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Installation from the official repository (AUR):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo pacman -S jellyfin-server jellyfin-web jellyfin-ffmpeg</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Enable and start the service:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo systemctl enable --now jellyfin</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Hardware Transcoding (Intel QSV):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo pacman -S vpl-gpu-rt</pre>
                    </div>
                    <p class="mt-3">After starting, <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> is available at <code>http://localhost:8096</code>. See the <a href="https://wiki.archlinux.org/title/Jellyfin" target="_blank" class="topic-link">ArchWiki Jellyfin article</a> for more details.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_5',
                    titleDe: 'Red Hat / Fedora / CentOS Installation',
                    titleEn: 'Red Hat / Fedora / CentOS Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Fedora / RHEL 8+ / CentOS Stream:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo dnf install -y epel-release

sudo dnf install -y --nogpgcheck \
  https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-$(rpm -E %rhel).noarch.rpm

sudo dnf config-manager --set-enabled crb

sudo dnf install -y jellyfin

sudo systemctl enable --now jellyfin</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Firewall konfigurieren (optional):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo firewall-cmd --zone=public --add-port=8096/tcp
sudo firewall-cmd --runtime-to-permanent</pre>
                    </div>
                    <p class="mt-3">Nach dem Start ist <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> unter <code>http://localhost:8096</code> erreichbar. Weitere Details in der <a href="https://docs.rockylinux.org/guides/file_sharing/jellyfin/" target="_blank" class="topic-link">Rocky Linux-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Fedora / RHEL 8+ / CentOS Stream:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo dnf install -y epel-release

sudo dnf install -y --nogpgcheck \
  https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-$(rpm -E %rhel).noarch.rpm

sudo dnf config-manager --set-enabled crb

sudo dnf install -y jellyfin

sudo systemctl enable --now jellyfin</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Configure firewall (optional):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo firewall-cmd --zone=public --add-port=8096/tcp
sudo firewall-cmd --runtime-to-permanent</pre>
                    </div>
                    <p class="mt-3">After starting, <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> is available at <code>http://localhost:8096</code>. See the <a href="https://docs.rockylinux.org/guides/file_sharing/jellyfin/" target="_blank" class="topic-link">Rocky Linux documentation</a> for more details.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. CLIENTS ============ */
        {
            id: 'section3',
            titleDe: '3. Clients & Apps',
            titleEn: '3. Clients & Apps',
            introDe: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> bietet eine breite Palette an offiziellen und Community-Clients für praktisch jedes Gerät. Eine vollständige Liste finden Sie auf der <a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">offiziellen Download-Seite</a>.',
            introEn: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> offers a wide range of official and community clients for practically every device. See the full list on the <a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">official downloads page</a>.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Offizielle Clients',
                    titleEn: 'Official Clients',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Client</th></tr>
                    <tr><td><strong>Web</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin Web</a> (Standard) & Jellyfin Vue (Beta, modernes UI).</td></tr>
                    <tr><td><strong><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Android</a> (offiziell).</td></tr>
                    <tr><td><strong><a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a> / <a href="https://www.apple.com/ipados/" target="_blank" class="topic-link">iPadOS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for iOS</a> & Swiftfin (moderner Swift-Client).</td></tr>
                    <tr><td><strong>Android TV / Fire TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Android TV</a> (offiziell).</td></tr>
                    <tr><td><strong><a href="https://www.roku.com/" target="_blank" class="topic-link">Roku</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Roku</a> (trotz Store-Meldung ohne Abo nutzbar).</td></tr>
                    <tr><td><strong><a href="https://www.samsung.com/" target="_blank" class="topic-link">Samsung TV</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Tizen</a>.</td></tr>
                    <tr><td><strong><a href="https://www.lg.com/" target="_blank" class="topic-link">LG TV</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for WebOS</a>.</td></tr>
                    <tr><td><strong><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Xbox</a>.</td></tr>
                    <tr><td><strong><a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">JellyCon</a> (leichtgewichtig) & Jellyfin for Kodi (sync).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Client</th></tr>
                    <tr><td><strong>Web</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin Web</a> (default) & Jellyfin Vue (beta, modern UI).</td></tr>
                    <tr><td><strong><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Android</a> (official).</td></tr>
                    <tr><td><strong><a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a> / <a href="https://www.apple.com/ipados/" target="_blank" class="topic-link">iPadOS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for iOS</a> & Swiftfin (modern Swift client).</td></tr>
                    <tr><td><strong>Android TV / Fire TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Android TV</a> (official).</td></tr>
                    <tr><td><strong><a href="https://www.roku.com/" target="_blank" class="topic-link">Roku</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Roku</a> (no subscription needed despite store message).</td></tr>
                    <tr><td><strong><a href="https://www.samsung.com/" target="_blank" class="topic-link">Samsung TV</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Tizen</a>.</td></tr>
                    <tr><td><strong><a href="https://www.lg.com/" target="_blank" class="topic-link">LG TV</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for WebOS</a>.</td></tr>
                    <tr><td><strong><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">Jellyfin for Xbox</a>.</td></tr>
                    <tr><td><strong><a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank" class="topic-link">JellyCon</a> (lightweight) & Jellyfin for Kodi (sync).</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Beliebte Community-Clients',
                    titleEn: 'Popular Community Clients',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Client</th><th>Plattform & Besonderheit</th></tr>
                    <tr><td><strong><a href="https://github.com/UnicornsOnLSD/finamp" target="_blank" class="topic-link">Finamp</a></strong></td><td class="text-[var(--text-muted)]">Musik-Client für <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>/<a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>. Modernes UI, Offline-Modus, Lyrics, Radio-Modus.</td></tr>
                    <tr><td><strong><a href="https://github.com/Fladderapp/Fladder" target="_blank" class="topic-link">Fladder</a></strong></td><td class="text-[var(--text-muted)]">Cross-Platform (<a href="https://flutter.dev/" target="_blank" class="topic-link">Flutter</a>). Trickplay, Intro-Skip, Downloads, Seerr-Integration.</td></tr>
                    <tr><td><strong><a href="https://github.com/jeffvli/feishin" target="_blank" class="topic-link">Feishin</a></strong></td><td class="text-[var(--text-muted)]">Desktop-Musik-Client im <a href="https://www.spotify.com/" target="_blank" class="topic-link">Spotify</a>-Stil. Auto-DJ, Lyrics, OpenSubsonic-Support.</td></tr>
                    <tr><td><strong><a href="https://github.com/fredrikburmester/streamyfin" target="_blank" class="topic-link">Streamyfin</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>/<a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>. Offline-Modus, Casting, Intro-Skip, Seerr.</td></tr>
                    <tr><td><strong><a href="https://github.com/jarnedemeulemeester/findroid" target="_blank" class="topic-link">Findroid</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>-Client mit nativer UI.</td></tr>
                    <tr><td><strong><a href="https://github.com/jellybook-org/jellybook" target="_blank" class="topic-link">JellyBook</a></strong></td><td class="text-[var(--text-muted)]">Für Bücher & Comics.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Client</th><th>Platform & Feature</th></tr>
                    <tr><td><strong><a href="https://github.com/UnicornsOnLSD/finamp" target="_blank" class="topic-link">Finamp</a></strong></td><td class="text-[var(--text-muted)]">Music client for <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>/<a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>. Modern UI, offline mode, lyrics, radio mode.</td></tr>
                    <tr><td><strong><a href="https://github.com/Fladderapp/Fladder" target="_blank" class="topic-link">Fladder</a></strong></td><td class="text-[var(--text-muted)]">Cross-platform (<a href="https://flutter.dev/" target="_blank" class="topic-link">Flutter</a>). Trickplay, intro skip, downloads, Seerr integration.</td></tr>
                    <tr><td><strong><a href="https://github.com/jeffvli/feishin" target="_blank" class="topic-link">Feishin</a></strong></td><td class="text-[var(--text-muted)]">Desktop music client, <a href="https://www.spotify.com/" target="_blank" class="topic-link">Spotify</a>-style. Auto-DJ, lyrics, OpenSubsonic support.</td></tr>
                    <tr><td><strong><a href="https://github.com/fredrikburmester/streamyfin" target="_blank" class="topic-link">Streamyfin</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>/<a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>. Offline mode, casting, intro skip, Seerr.</td></tr>
                    <tr><td><strong><a href="https://github.com/jarnedemeulemeester/findroid" target="_blank" class="topic-link">Findroid</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a> client with native UI.</td></tr>
                    <tr><td><strong><a href="https://github.com/jellybook-org/jellybook" target="_blank" class="topic-link">JellyBook</a></strong></td><td class="text-[var(--text-muted)]">For books & comics.</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. TRANSCODING ============ */
        {
            id: 'section4',
            titleDe: '4. Transcoding & Hardware-Beschleunigung',
            titleEn: '4. Transcoding & Hardware Acceleration',
            introDe: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> nutzt eine modifizierte Version von <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> (<code>jellyfin-ffmpeg</code>), um Video-Transcoding auf der <a href="https://en.wikipedia.org/wiki/Central_processing_unit" target="_blank" class="topic-link">CPU</a> oder <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a> durchzuführen. Hardware-Beschleunigung entlastet die CPU erheblich. Weitere Informationen in der <a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/" target="_blank" class="topic-link">offiziellen Hardware-Acceleration-Dokumentation</a>.',
            introEn: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> uses a modified version of <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> (<code>jellyfin-ffmpeg</code>) to perform video transcoding on the <a href="https://en.wikipedia.org/wiki/Central_processing_unit" target="_blank" class="topic-link">CPU</a> or <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank" class="topic-link">GPU</a>. Hardware acceleration significantly offloads the CPU. See the <a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/" target="_blank" class="topic-link">official Hardware Acceleration documentation</a> for more information.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Unterstützte Hardware-Beschleunigung',
                    titleEn: 'Supported Hardware Acceleration',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Hersteller</th><th class="w-1/4">Technologie</th><th>Plattform</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/intel/" target="_blank" class="topic-link">Intel</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-general.html" target="_blank" class="topic-link">Quick Sync Video (QSV)</a></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/nvidia/" target="_blank" class="topic-link">NVIDIA</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new" target="_blank" class="topic-link">NVDEC / NVENC</a></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/amd/" target="_blank" class="topic-link">AMD</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.amd.com/en/technologies/amd-media-framework" target="_blank" class="topic-link">AMF</a> (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>), <a href="https://en.wikipedia.org/wiki/Video_Acceleration_API" target="_blank" class="topic-link">VA-API</a> (<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>)</td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/apple/" target="_blank" class="topic-link">Apple</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://developer.apple.com/documentation/videotoolbox" target="_blank" class="topic-link">Video Toolbox</a></td><td class="text-[var(--text-muted)]"><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/rockchip/" target="_blank" class="topic-link">Rockchip</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Rockchip" target="_blank" class="topic-link">RKMPP</a></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> (RK3588/3576)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Vollständige Beschleunigung wird für Intel & NVIDIA (Win/Linux), AMD Polaris+ (Linux), Rockchip RK3588 und Apple Silicon (macOS 12+) unterstützt. Bei anderen Kombinationen kann es zu teilweiser Beschleunigung kommen.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Vendor</th><th class="w-1/4">Technology</th><th>Platform</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/intel/" target="_blank" class="topic-link">Intel</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-general.html" target="_blank" class="topic-link">Quick Sync Video (QSV)</a></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/nvidia/" target="_blank" class="topic-link">NVIDIA</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new" target="_blank" class="topic-link">NVDEC / NVENC</a></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/amd/" target="_blank" class="topic-link">AMD</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.amd.com/en/technologies/amd-media-framework" target="_blank" class="topic-link">AMF</a> (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>), <a href="https://en.wikipedia.org/wiki/Video_Acceleration_API" target="_blank" class="topic-link">VA-API</a> (<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>)</td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/apple/" target="_blank" class="topic-link">Apple</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://developer.apple.com/documentation/videotoolbox" target="_blank" class="topic-link">Video Toolbox</a></td><td class="text-[var(--text-muted)]"><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/rockchip/" target="_blank" class="topic-link">Rockchip</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Rockchip" target="_blank" class="topic-link">RKMPP</a></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> (RK3588/3576)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Full acceleration is supported for Intel & NVIDIA (Win/Linux), AMD Polaris+ (Linux), Rockchip RK3588, and Apple Silicon (macOS 12+). Other combinations may result in partial acceleration.</p>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Hinweise & Einschränkungen',
                    titleEn: 'Notes & Limitations',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>H.264 10-bit (High 10):</strong> Wird von <em>keiner</em> Intel-, NVIDIA- oder AMD-GPU hardwarebeschleunigt dekodiert. Nur Apple Silicon und Rockchip können das. Fallback ist Software-Decoding.</li>
                    <li><strong>Jellyfin-FFmpeg:</strong> Verwenden Sie immer die mitgelieferte <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a>-Version (Version-String enthält <code>-Jellyfin</code>). Fremde FFmpeg-Binaries führen zu <em>teilweiser</em> Beschleunigung.</li>
                    <li><strong>HDR-Tonemapping:</strong> Hardware-beschleunigtes Tone-Mapping von <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR10/HLG</a> nach <a href="https://en.wikipedia.org/wiki/Standard-dynamic-range_video" target="_blank" class="topic-link">SDR</a> wird unterstützt. <a href="https://en.wikipedia.org/wiki/Dolby_Vision" target="_blank" class="topic-link">Dolby Vision</a> (P5/P8) ab <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> 10.8.</li>
                    <li><strong>Remote-Transcoding:</strong> Falls der Server keine GPU hat, kann <a href="https://github.com/jellyfin/jellyfin-plugin-rffmpeg" target="_blank" class="topic-link">rffmpeg</a> das Transcoding an eine andere Maschine delegieren (Linux-only, <a href="https://en.wikipedia.org/wiki/Secure_Shell" target="_blank" class="topic-link">SSH</a> erforderlich).</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>H.264 10-bit (High 10):</strong> Is <em>not</em> hardware-decoded by any Intel, NVIDIA, or AMD GPU. Only Apple Silicon and Rockchip can. Fallback is software decoding.</li>
                    <li><strong>Jellyfin-FFmpeg:</strong> Always use the bundled <a href="https://ffmpeg.org/" target="_blank" class="topic-link">FFmpeg</a> version (version string contains <code>-Jellyfin</code>). Third-party FFmpeg binaries result in <em>partial</em> acceleration.</li>
                    <li><strong>HDR Tonemapping:</strong> Hardware-accelerated tone-mapping of <a href="https://en.wikipedia.org/wiki/High-dynamic-range_video" target="_blank" class="topic-link">HDR10/HLG</a> to <a href="https://en.wikipedia.org/wiki/Standard-dynamic-range_video" target="_blank" class="topic-link">SDR</a> is supported. <a href="https://en.wikipedia.org/wiki/Dolby_Vision" target="_blank" class="topic-link">Dolby Vision</a> (P5/P8) from <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> 10.8.</li>
                    <li><strong>Remote Transcoding:</strong> If the server has no GPU, <a href="https://github.com/jellyfin/jellyfin-plugin-rffmpeg" target="_blank" class="topic-link">rffmpeg</a> can delegate transcoding to another machine (Linux-only, <a href="https://en.wikipedia.org/wiki/Secure_Shell" target="_blank" class="topic-link">SSH</a> required).</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. PLUGINS ============ */
        {
            id: 'section5',
            titleDe: '5. Plugins',
            titleEn: '5. Plugins',
            introDe: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> bietet zahlreiche optionale Plugins zur Erweiterung der Funktionalität. Sie können direkt aus dem Plugin-Katalog installiert werden. Die offizielle Plugin-Dokumentation finden Sie unter <a href="https://jellyfin.org/docs/general/server/plugins/" target="_blank" class="topic-link">jellyfin.org/docs/general/server/plugins</a>.',
            introEn: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> offers numerous optional plugins to extend functionality. They can be installed directly from the plugin catalog. The official plugin documentation is available at <a href="https://jellyfin.org/docs/general/server/plugins/" target="_blank" class="topic-link">jellyfin.org/docs/general/server/plugins</a>.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Plugin-Kategorien',
                    titleEn: 'Plugin Categories',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Kategorie</th><th>Beschreibung & Beispiele</th></tr>
                    <tr><td><strong>Metadaten</strong></td><td class="text-[var(--text-muted)]"><a href="https://anilist.co/" target="_blank" class="topic-link">Anilist</a>, <a href="https://anidb.net/" target="_blank" class="topic-link">Anidb</a>, <a href="https://www.anisearch.com/" target="_blank" class="topic-link">Anisearch</a>, Bookshelf, <a href="https://kitsu.io/" target="_blank" class="topic-link">Kitsu</a>, <a href="https://www.themoviedb.org/" target="_blank" class="topic-link">TMDb</a> Collections, <a href="https://www.fanart.tv/" target="_blank" class="topic-link">Fanart</a>.</td></tr>
                    <tr><td><strong>Authentifizierung</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol" target="_blank" class="topic-link">LDAP</a> (Verzeichnisdienst-Integration).</td></tr>
                    <tr><td><strong>Live-TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.nextpvr.com/" target="_blank" class="topic-link">NextPVR</a>, <a href="https://tvheadend.org/" target="_blank" class="topic-link">TVHeadend</a>, <a href="https://www.silicondust.com/" target="_blank" class="topic-link">HDHomeRun</a>.</td></tr>
                    <tr><td><strong>Untertitel</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.opensubtitles.org/" target="_blank" class="topic-link">Open Subtitles</a>, Subtitle Extract (eingebettete Untertitel extrahieren).</td></tr>
                    <tr><td><strong>Benachrichtigungen</strong></td><td class="text-[var(--text-muted)]"><a href="https://gotify.net/" target="_blank" class="topic-link">Gotify</a>, <a href="https://slack.com/" target="_blank" class="topic-link">Slack</a>, E-Mail, Webhooks.</td></tr>
                    <tr><td><strong>Sync / Scrobble</strong></td><td class="text-[var(--text-muted)]"><a href="https://trakt.tv/" target="_blank" class="topic-link">Trakt</a>, Ani-Sync (<a href="https://myanimelist.net/" target="_blank" class="topic-link">MAL</a>, <a href="https://anilist.co/" target="_blank" class="topic-link">AniList</a>, <a href="https://kitsu.io/" target="_blank" class="topic-link">Kitsu</a>), <a href="https://www.last.fm/" target="_blank" class="topic-link">Last.FM</a>.</td></tr>
                    <tr><td><strong>Berichte</strong></td><td class="text-[var(--text-muted)]">Playback Reporting, Reports (Mediathek-Statistiken).</td></tr>
                    <tr><td><strong>Skin / Themes</strong></td><td class="text-[var(--text-muted)]">Skin Manager, Themerr (Theme-Musik für Filme/Serien).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Category</th><th>Description & Examples</th></tr>
                    <tr><td><strong>Metadata</strong></td><td class="text-[var(--text-muted)]"><a href="https://anilist.co/" target="_blank" class="topic-link">Anilist</a>, <a href="https://anidb.net/" target="_blank" class="topic-link">Anidb</a>, <a href="https://www.anisearch.com/" target="_blank" class="topic-link">Anisearch</a>, Bookshelf, <a href="https://kitsu.io/" target="_blank" class="topic-link">Kitsu</a>, <a href="https://www.themoviedb.org/" target="_blank" class="topic-link">TMDb</a> Collections, <a href="https://www.fanart.tv/" target="_blank" class="topic-link">Fanart</a>.</td></tr>
                    <tr><td><strong>Authentication</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol" target="_blank" class="topic-link">LDAP</a> (directory service integration).</td></tr>
                    <tr><td><strong>Live TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.nextpvr.com/" target="_blank" class="topic-link">NextPVR</a>, <a href="https://tvheadend.org/" target="_blank" class="topic-link">TVHeadend</a>, <a href="https://www.silicondust.com/" target="_blank" class="topic-link">HDHomeRun</a>.</td></tr>
                    <tr><td><strong>Subtitles</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.opensubtitles.org/" target="_blank" class="topic-link">Open Subtitles</a>, Subtitle Extract (extract embedded subtitles).</td></tr>
                    <tr><td><strong>Notifications</strong></td><td class="text-[var(--text-muted)]"><a href="https://gotify.net/" target="_blank" class="topic-link">Gotify</a>, <a href="https://slack.com/" target="_blank" class="topic-link">Slack</a>, email, webhooks.</td></tr>
                    <tr><td><strong>Sync / Scrobble</strong></td><td class="text-[var(--text-muted)]"><a href="https://trakt.tv/" target="_blank" class="topic-link">Trakt</a>, Ani-Sync (<a href="https://myanimelist.net/" target="_blank" class="topic-link">MAL</a>, <a href="https://anilist.co/" target="_blank" class="topic-link">AniList</a>, <a href="https://kitsu.io/" target="_blank" class="topic-link">Kitsu</a>), <a href="https://www.last.fm/" target="_blank" class="topic-link">Last.FM</a>.</td></tr>
                    <tr><td><strong>Reports</strong></td><td class="text-[var(--text-muted)]">Playback Reporting, Reports (library statistics).</td></tr>
                    <tr><td><strong>Skin / Themes</strong></td><td class="text-[var(--text-muted)]">Skin Manager, Themerr (theme music for movies/shows).</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Plugin-Installation',
                    titleEn: 'Plugin Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p><strong>Installationspfade:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (direkt):</strong> <code>%UserProfile%\\AppData\\Local\\jellyfin\\plugins</code></li>
                    <li><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (Tray):</strong> <code>%ProgramData%\\Jellyfin\\Server\\plugins</code></li>
                    <li><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>:</strong> <code>/var/lib/jellyfin/plugins/</code></li>
                    <li><strong><a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>:</strong> <code>/config/plugins/</code></li>
                    </ul>
                    <p class="mt-2">Installation über <strong>Dashboard → Plugins → Catalog</strong>. Nach der Installation ist ein Neustart erforderlich.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p><strong>Installation paths:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (direct):</strong> <code>%UserProfile%\\AppData\\Local\\jellyfin\\plugins</code></li>
                    <li><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (tray):</strong> <code>%ProgramData%\\Jellyfin\\Server\\plugins</code></li>
                    <li><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>:</strong> <code>/var/lib/jellyfin/plugins/</code></li>
                    <li><strong><a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>:</strong> <code>/config/plugins/</code></li>
                    </ul>
                    <p class="mt-2">Install via <strong>Dashboard → Plugins → Catalog</strong>. Restart required after installation.</p>
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
            introDe: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> verwendet verschiedene Verzeichnisse für Daten, Konfiguration und Cache. Diese können über Kommandozeilenoptionen oder Umgebungsvariablen angepasst werden. Weitere Details in der <a href="https://jellyfin.org/docs/general/administration/configuration/" target="_blank" class="topic-link">offiziellen Konfigurationsdokumentation</a>.',
            introEn: '<a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> uses various directories for data, configuration, and cache. These can be adjusted via command-line options or environment variables. See the <a href="https://jellyfin.org/docs/general/administration/configuration/" target="_blank" class="topic-link">official configuration documentation</a> for details.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Standard-Verzeichnisse',
                    titleEn: 'Default Directories',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Verzeichnis</th><th class="w-1/4"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></th><th><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></th></tr>
                    <tr><td><strong>Data</strong></td><td class="text-[var(--text-muted)]"><code>%LocalAppData%\\jellyfin</code></td><td class="text-[var(--text-muted)]"><code>$HOME/.local/share/jellyfin</code></td></tr>
                    <tr><td><strong>Config</strong></td><td class="text-[var(--text-muted)]"><code>%ProgramData%\\Jellyfin\\Server\\config</code></td><td class="text-[var(--text-muted)]"><code>$HOME/.config/jellyfin</code></td></tr>
                    <tr><td><strong>Cache</strong></td><td class="text-[var(--text-muted)]"><code>%LocalAppData%\\jellyfin\\cache</code></td><td class="text-[var(--text-muted)]"><code>$HOME/.cache/jellyfin</code></td></tr>
                    <tr><td><strong>Log</strong></td><td class="text-[var(--text-muted)]"><code>&lt;Data&gt;/log</code></td><td class="text-[var(--text-muted)]"><code>&lt;Data&gt;/log</code></td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Directory</th><th class="w-1/4"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></th><th><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></th></tr>
                    <tr><td><strong>Data</strong></td><td class="text-[var(--text-muted)]"><code>%LocalAppData%\\jellyfin</code></td><td class="text-[var(--text-muted)]"><code>$HOME/.local/share/jellyfin</code></td></tr>
                    <tr><td><strong>Config</strong></td><td class="text-[var(--text-muted)]"><code>%ProgramData%\\Jellyfin\\Server\\config</code></td><td class="text-[var(--text-muted)]"><code>$HOME/.config/jellyfin</code></td></tr>
                    <tr><td><strong>Cache</strong></td><td class="text-[var(--text-muted)]"><code>%LocalAppData%\\jellyfin\\cache</code></td><td class="text-[var(--text-muted)]"><code>$HOME/.cache/jellyfin</code></td></tr>
                    <tr><td><strong>Log</strong></td><td class="text-[var(--text-muted)]"><code>&lt;Data&gt;/log</code></td><td class="text-[var(--text-muted)]"><code>&lt;Data&gt;/log</code></td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Ports & Netzwerk',
                    titleEn: 'Ports & Network',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Port</th><th class="w-1/4">Protokoll</th><th>Verwendung</th></tr>
                    <tr><td><strong>8096</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a> (<a href="https://en.wikipedia.org/wiki/HTTP" target="_blank" class="topic-link">HTTP</a>)</td><td class="text-[var(--text-muted)]">Web-Interface & API.</td></tr>
                    <tr><td><strong>8920</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a> (<a href="https://en.wikipedia.org/wiki/HTTPS" target="_blank" class="topic-link">HTTPS</a>)</td><td class="text-[var(--text-muted)]">Sichere Web-Oberfläche (optional).</td></tr>
                    <tr><td><strong>1900</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Digital_Living_Network_Alliance" target="_blank" class="topic-link">DLNA</a> Service Discovery.</td></tr>
                    <tr><td><strong>7359</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a></td><td class="text-[var(--text-muted)]">Client Discovery (Auto-Discovery im LAN).</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> benötigt <code>--net=host</code> oder explizite Port-Freigaben für <a href="https://en.wikipedia.org/wiki/Digital_Living_Network_Alliance" target="_blank" class="topic-link">DLNA</a>/Discovery. Für Remote-Zugriff empfiehlt sich ein <a href="https://en.wikipedia.org/wiki/Reverse_proxy" target="_blank" class="topic-link">Reverse-Proxy</a> (<a href="https://nginx.org/" target="_blank" class="topic-link">Nginx</a>, <a href="https://caddyserver.com/" target="_blank" class="topic-link">Caddy</a>, <a href="https://traefik.io/" target="_blank" class="topic-link">Traefik</a>) mit <a href="https://en.wikipedia.org/wiki/HTTPS" target="_blank" class="topic-link">HTTPS</a>. Weitere Informationen im <a href="https://jellyfin.org/docs/general/networking/" target="_blank" class="topic-link">offiziellen Networking-Guide</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Port</th><th class="w-1/4">Protocol</th><th>Purpose</th></tr>
                    <tr><td><strong>8096</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a> (<a href="https://en.wikipedia.org/wiki/HTTP" target="_blank" class="topic-link">HTTP</a>)</td><td class="text-[var(--text-muted)]">Web interface & API.</td></tr>
                    <tr><td><strong>8920</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a> (<a href="https://en.wikipedia.org/wiki/HTTPS" target="_blank" class="topic-link">HTTPS</a>)</td><td class="text-[var(--text-muted)]">Secure web interface (optional).</td></tr>
                    <tr><td><strong>1900</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Digital_Living_Network_Alliance" target="_blank" class="topic-link">DLNA</a> service discovery.</td></tr>
                    <tr><td><strong>7359</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a></td><td class="text-[var(--text-muted)]">Client discovery (auto-discovery on LAN).</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> requires <code>--net=host</code> or explicit port mappings for <a href="https://en.wikipedia.org/wiki/Digital_Living_Network_Alliance" target="_blank" class="topic-link">DLNA</a>/discovery. For remote access, a <a href="https://en.wikipedia.org/wiki/Reverse_proxy" target="_blank" class="topic-link">reverse proxy</a> (<a href="https://nginx.org/" target="_blank" class="topic-link">Nginx</a>, <a href="https://caddyserver.com/" target="_blank" class="topic-link">Caddy</a>, <a href="https://traefik.io/" target="_blank" class="topic-link">Traefik</a>) with <a href="https://en.wikipedia.org/wiki/HTTPS" target="_blank" class="topic-link">HTTPS</a> is recommended. See the <a href="https://jellyfin.org/docs/general/networking/" target="_blank" class="topic-link">official networking guide</a> for more information.</p>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://jellyfin.org/" target="_blank" class="topic-link">Jellyfin</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Kostenlos & Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Immer 0 €, <a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a>-Lizenz. Keine Premium-Tier, keine Cloud-Abhängigkeit. Volle Kontrolle über Daten und Server.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tv opacity-70"></i><span>2. Clients für alles</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Web, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, Android TV, <a href="https://www.roku.com/" target="_blank" class="topic-link">Roku</a>, <a href="https://www.samsung.com/" target="_blank" class="topic-link">Samsung</a>, <a href="https://www.lg.com/" target="_blank" class="topic-link">LG</a>, <a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox</a>, <a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a>. Plus Community-Clients wie <a href="https://github.com/UnicornsOnLSD/finamp" target="_blank" class="topic-link">Finamp</a>, <a href="https://github.com/Fladderapp/Fladder" target="_blank" class="topic-link">Fladder</a>, <a href="https://github.com/fredrikburmester/streamyfin" target="_blank" class="topic-link">Streamyfin</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>3. Hardware-Transcoding</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-general.html" target="_blank" class="topic-link">Intel QSV</a>, <a href="https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new" target="_blank" class="topic-link">NVIDIA NVENC</a>, <a href="https://www.amd.com/en/technologies/amd-media-framework" target="_blank" class="topic-link">AMD AMF</a>, <a href="https://en.wikipedia.org/wiki/Video_Acceleration_API" target="_blank" class="topic-link">VA-API</a>, <a href="https://developer.apple.com/documentation/videotoolbox" target="_blank" class="topic-link">VideoToolbox</a>, Rockchip RKMPP. <a href="https://ffmpeg.org/" target="_blank" class="topic-link">Jellyfin-FFmpeg</a> für volle Beschleunigung nötig.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>4. Plugin-System</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Metadaten (<a href="https://anilist.co/" target="_blank" class="topic-link">AniList</a>, <a href="https://www.themoviedb.org/" target="_blank" class="topic-link">TMDb</a>), <a href="https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol" target="_blank" class="topic-link">LDAP</a>-Auth, Untertitel, <a href="https://trakt.tv/" target="_blank" class="topic-link">Trakt</a>-Sync, Live-TV, Benachrichtigungen, Themes. Installation über Dashboard-Katalog.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Free & Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Always $0, <a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html" target="_blank" class="topic-link">GPLv2</a> license. No premium tier, no cloud dependency. Full control over data and server.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tv opacity-70"></i><span>2. Clients for everything</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Web, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, Android TV, <a href="https://www.roku.com/" target="_blank" class="topic-link">Roku</a>, <a href="https://www.samsung.com/" target="_blank" class="topic-link">Samsung</a>, <a href="https://www.lg.com/" target="_blank" class="topic-link">LG</a>, <a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox</a>, <a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a>. Plus community clients like <a href="https://github.com/UnicornsOnLSD/finamp" target="_blank" class="topic-link">Finamp</a>, <a href="https://github.com/Fladderapp/Fladder" target="_blank" class="topic-link">Fladder</a>, <a href="https://github.com/fredrikburmester/streamyfin" target="_blank" class="topic-link">Streamyfin</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>3. Hardware Transcoding</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-general.html" target="_blank" class="topic-link">Intel QSV</a>, <a href="https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new" target="_blank" class="topic-link">NVIDIA NVENC</a>, <a href="https://www.amd.com/en/technologies/amd-media-framework" target="_blank" class="topic-link">AMD AMF</a>, <a href="https://en.wikipedia.org/wiki/Video_Acceleration_API" target="_blank" class="topic-link">VA-API</a>, <a href="https://developer.apple.com/documentation/videotoolbox" target="_blank" class="topic-link">VideoToolbox</a>, Rockchip RKMPP. <a href="https://ffmpeg.org/" target="_blank" class="topic-link">Jellyfin-FFmpeg</a> required for full acceleration.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>4. Plugin System</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Metadata (<a href="https://anilist.co/" target="_blank" class="topic-link">AniList</a>, <a href="https://www.themoviedb.org/" target="_blank" class="topic-link">TMDb</a>), <a href="https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol" target="_blank" class="topic-link">LDAP</a> auth, subtitles, <a href="https://trakt.tv/" target="_blank" class="topic-link">Trakt</a> sync, Live TV, notifications, themes. Install via dashboard catalog.</p>
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
            { icon: 'fa-globe',        href: 'https://jellyfin.org/docs/',              target: '_blank', labelDe: 'Offizielle Dokumentation', labelEn: 'Official Documentation' },
            { icon: 'fa-download',     href: 'https://jellyfin.org/downloads/',         target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-github',       href: 'https://github.com/jellyfin/jellyfin',    target: '_blank', labelDe: 'GitHub Repository',         labelEn: 'GitHub Repository' },
            { icon: 'fa-comments',     href: 'https://forum.jellyfin.org/',             target: '_blank', labelDe: 'Community Forum',           labelEn: 'Community Forum' },
            { icon: 'fa-book',         href: 'https://jellyfin.org/docs/general/quick-start/', target: '_blank', labelDe: 'Quick Start Guide',   labelEn: 'Quick Start Guide' }
        ]
    },

    footer: {
        textDe: 'Jellyfin Referenz · v1.2 · Dual Lang',
        textEn: 'Jellyfin Reference · v1.2 · Dual Lang'
    }
});