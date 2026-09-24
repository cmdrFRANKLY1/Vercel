// resources/topics/topic_jellyfin.js
// Registers the Jellyfin media server reference topic. Loaded via <script> injection.

/* ==================================================================
   JELLYFIN CODE-BLOCK COPY CONTROLLER
   ------------------------------------------------------------------
   Adds a "Copy" button to every .jf-code block. Because <script> tags
   inside injected innerHTML are not executed, we wire everything via
   a top-level IIFE that scans the DOM (incl. shadow roots) and adds
   hover-based copy buttons. Robust against re-renders.
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
        introDe: 'Jellyfin ist ein <strong>kostenloses Open-Source-Media-System</strong>, mit dem Sie Ihre Medienbibliothek verwalten und auf alle Ihre Geräte streamen können. Es ist eine Alternative zu den proprietären Lösungen Emby und Plex – <strong>ohne Premium-Lizenzen, ohne versteckte Kosten und ohne Einschränkungen</strong>. Jellyfin entstand als Fork von Emby 3.5.2 und wurde auf das .NET-Core-Framework portiert, um vollständige plattformübergreifende Unterstützung zu ermöglichen. <a href="https://jellyfin.org/docs/" target="_blank">Zur offiziellen Dokumentation</a>.',
        introEn: 'Jellyfin is a <strong>free and open-source media system</strong> that puts you in control of managing and streaming your media. It is an alternative to the proprietary Emby and Plex – <strong>with no premium licenses, no hidden costs, and no strings attached</strong>. Jellyfin is descended from Emby\'s 3.5.2 release and ported to the .NET Core framework to enable full cross-platform support. <a href="https://jellyfin.org/docs/" target="_blank">Visit the official documentation</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',     href: '#section1',  switchToDoc: true, labelDe: 'Überblick',        labelEn: 'Overview' },
        { icon: 'fa-download',        href: '#section2',  switchToDoc: true, labelDe: 'Installation',     labelEn: 'Installation' },
        { icon: 'fa-tv',              href: '#section3',  switchToDoc: true, labelDe: 'Clients',          labelEn: 'Clients' },
        { icon: 'fa-microchip',       href: '#section4',  switchToDoc: true, labelDe: 'Transcoding',      labelEn: 'Transcoding' },
        { icon: 'fa-puzzle-piece',    href: '#section5',  switchToDoc: true, labelDe: 'Plugins',          labelEn: 'Plugins' },
        { icon: 'fa-cog',             href: '#section6',  switchToDoc: true, labelDe: 'Konfiguration',    labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://jellyfin.org/docs/', target: '_blank', labelDe: 'Offizielle Doku', labelEn: 'Official Docs' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Philosophie',
            titleEn: '1. Overview & Philosophy',
            introDe: 'Jellyfin ist ein Media-Server, der Ihre persönliche Mediensammlung organisiert, katalogisiert und auf Ihre Geräte streamt. Der entscheidende Unterschied zu Plex und Emby: Jellyfin ist <strong>vollständig kostenlos und Open Source</strong>. Mehr dazu im <a href="https://jellyfin.org/docs/general/about/" target="_blank">offiziellen About-Bereich</a>.',
            introEn: 'Jellyfin is a media server that organizes, catalogs, and streams your personal media collection to your devices. The key difference from Plex and Emby: Jellyfin is <strong>completely free and open source</strong>. Learn more in the <a href="https://jellyfin.org/docs/general/about/" target="_blank">official About section</a>.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Jellyfin?',
                    titleEn: 'What is Jellyfin?',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Open-Source Media Server (Fork von Emby 3.5.2).</td></tr>
                    <tr><td><strong>Lizenz</strong></td><td class="text-[var(--text-muted)]">GPLv2 – vollständig frei, keine Premium-Tier.</td></tr>
                    <tr><td><strong>Kosten</strong></td><td class="text-[var(--text-muted)]">Immer 0 € – es gibt keine Bezahlversion.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]">Windows, Linux, macOS, Docker, NAS-Systeme.</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Streaming von Filmen, Serien, Musik, Fotos und Live-TV.</td></tr>
                    <tr><td><strong>Transcoding</strong></td><td class="text-[var(--text-muted)]">Hardware-Beschleunigung mit Intel QSV, NVIDIA NVENC, AMD AMF, VA-API, VideoToolbox, Rockchip RKMPP.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Open-source media server (fork of Emby 3.5.2).</td></tr>
                    <tr><td><strong>License</strong></td><td class="text-[var(--text-muted)]">GPLv2 – fully free, no premium tier.</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">Always $0 – there is no paid version.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]">Windows, Linux, macOS, Docker, NAS systems.</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Streaming movies, TV shows, music, photos, and Live TV.</td></tr>
                    <tr><td><strong>Transcoding</strong></td><td class="text-[var(--text-muted)]">Hardware acceleration with Intel QSV, NVIDIA NVENC, AMD AMF, VA-API, VideoToolbox, Rockchip RKMPP.</td></tr>
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
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/4">Jellyfin</th><th class="w-1/4">Plex</th><th class="w-1/4">Emby</th></tr>
                    <tr><td><strong>Preis</strong></td><td class="text-[var(--text-muted)]">Immer kostenlos</td><td class="text-[var(--text-muted)]">Plex Pass ab ~3 €/Monat oder 750 € Lifetime</td><td class="text-[var(--text-muted)]">Emby Premiere ~5 €/Monat oder 119 € Lifetime</td></tr>
                    <tr><td><strong>Open Source</strong></td><td class="text-[var(--text-muted)]">Ja (GPLv2)</td><td class="text-[var(--text-muted)]">Nein</td><td class="text-[var(--text-muted)]">Teilweise (Kern) </td></tr>
                    <tr><td><strong>Remote-Zugriff</strong></td><td class="text-[var(--text-muted)]">Manuell (Mesh-VPN, Tunnel, DynDNS)</td><td class="text-[var(--text-muted)]">Automatisch (Plex Relay) – teils kostenpflichtig</td><td class="text-[var(--text-muted)]">Manuell (Netzwerk-Konfiguration nötig)</td></tr>
                    <tr><td><strong>Datenschutz</strong></td><td class="text-[var(--text-muted)]">Vollständig lokal – keine Cloud</td><td class="text-[var(--text-muted)]">Cloud-Backend für Login & Metadaten</td><td class="text-[var(--text-muted)]">Teilweise Cloud</td></tr>
                    <tr><td><strong>Einrichtung</strong></td><td class="text-[var(--text-muted)]">Mehr technisches Know-how nötig</td><td class="text-[var(--text-muted)]">Sehr einfach, geführter Assistent</td><td class="text-[var(--text-muted)]">Mittelweg</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Jellyfin gibt maximale Kontrolle und Privatsphäre, erfordert aber mehr Eigeninitiative bei Netzwerk und Remote-Zugriff.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/4">Jellyfin</th><th class="w-1/4">Plex</th><th class="w-1/4">Emby</th></tr>
                    <tr><td><strong>Price</strong></td><td class="text-[var(--text-muted)]">Always free</td><td class="text-[var(--text-muted)]">Plex Pass from ~$3/mo or $750 lifetime</td><td class="text-[var(--text-muted)]">Emby Premiere ~$5/mo or $119 lifetime</td></tr>
                    <tr><td><strong>Open Source</strong></td><td class="text-[var(--text-muted)]">Yes (GPLv2)</td><td class="text-[var(--text-muted)]">No</td><td class="text-[var(--text-muted)]">Partial (core)</td></tr>
                    <tr><td><strong>Remote Access</strong></td><td class="text-[var(--text-muted)]">Manual (mesh VPN, tunnel, DynDNS)</td><td class="text-[var(--text-muted)]">Automatic (Plex Relay) – partly paid</td><td class="text-[var(--text-muted)]">Manual (network config required)</td></tr>
                    <tr><td><strong>Privacy</strong></td><td class="text-[var(--text-muted)]">Fully local – no cloud</td><td class="text-[var(--text-muted)]">Cloud backend for login & metadata</td><td class="text-[var(--text-muted)]">Partially cloud</td></tr>
                    <tr><td><strong>Setup</strong></td><td class="text-[var(--text-muted)]">More technical know-how needed</td><td class="text-[var(--text-muted)]">Very easy, guided wizard</td><td class="text-[var(--text-muted)]">Middle ground</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Jellyfin gives maximum control and privacy, but requires more initiative for networking and remote access.</p>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: 'Jellyfin kann nativ, über Docker oder als portable Version installiert werden. Für Linux-Server ist Docker die empfohlene Methode. Die vollständige Übersicht finden Sie in der <a href="https://jellyfin.org/docs/general/installation/" target="_blank">offiziellen Installationsanleitung</a>.',
            introEn: 'Jellyfin can be installed natively, via Docker, or as a portable version. For Linux servers, Docker is the recommended method. See the <a href="https://jellyfin.org/docs/general/installation/" target="_blank">official installation guide</a> for a full overview.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <style>
                        /* ---------- scoped Jellyfin code block styles ---------- */
                        /* Each command block is its own embedded terminal panel:  */
                        /* darker background + its own border + rounded corners.  */
                        .jf-code {
                            position: relative;
                            background: #06080b;                       /* very dark, per-command */
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
                            white-space: pre;                  /* preserve line breaks */
                            overflow-x: auto;
                            margin: 0;
                            tab-size: 4;
                            background: transparent;           /* let .jf-code bg show */
                        }
                        /* Fenced command: one line per command for readability */
                        .jf-code-inner .cmd {
                            display: block;
                            padding: 0.05rem 0;
                        }
                        .jf-code-inner .cmt {
                            display: block;
                            color: var(--text-muted);
                            opacity: 0.75;
                            font-style: italic;
                        }
                        .jf-code-inner .blank {
                            display: block;
                            height: 0.6rem;
                        }
                        /* Copy button: hidden, fades in on hover */
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
                        .jf-copy-btn:active {
                            transform: translateY(1px);
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
                        /* Ensure code blocks are readable on small screens */
                        @media (max-width: 560px) {
                            .jf-code-inner { font-size: 0.66rem; padding: 0.7rem 0.8rem; }
                            .jf-copy-btn { opacity: 1; transform: translateY(0); }
                        }
                    </style>

                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/container/" target="_blank">Docker (empfohlen)</a></strong></td><td class="text-[var(--text-muted)]">Offizielles Image <code>jellyfin/jellyfin</code> oder <code>ghcr.io/jellyfin/jellyfin</code>. Einfachste Möglichkeit für Linux-Server.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank">Linux-Pakete</a></strong></td><td class="text-[var(--text-muted)]">Offizielle Repositories für Debian/Ubuntu, Fedora, Arch. Installation via <code>apt</code>, <code>dnf</code> oder <code>pacman</code>.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/windows/" target="_blank">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer oder portable Version. Tray-App für Systemstart.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/macos/" target="_blank">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG-Installer oder portable Version.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/" target="_blank">NAS</a></strong></td><td class="text-[var(--text-muted)]">Synology, QNAP, TrueNAS über Docker oder native Pakete.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <style>
                        /* ---------- scoped Jellyfin code block styles ---------- */
                        /* Each command block is its own embedded terminal panel:  */
                        /* darker background + its own border + rounded corners.  */
                        .jf-code {
                            position: relative;
                            background: #06080b;                       /* very dark, per-command */
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
                        .jf-code-inner .cmd {
                            display: block;
                            padding: 0.05rem 0;
                        }
                        .jf-code-inner .cmt {
                            display: block;
                            color: var(--text-muted);
                            opacity: 0.75;
                            font-style: italic;
                        }
                        .jf-code-inner .blank {
                            display: block;
                            height: 0.6rem;
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
                        .jf-copy-btn:active { transform: translateY(1px); }
                        .jf-copy-btn.is-copied { background: #10b981; border-color: #10b981; color: #fff; }
                        .jf-copy-btn.is-failed { background: #ef4444; border-color: #ef4444; color: #fff; }
                        @media (max-width: 560px) {
                            .jf-code-inner { font-size: 0.66rem; padding: 0.7rem 0.8rem; }
                            .jf-copy-btn { opacity: 1; transform: translateY(0); }
                        }
                    </style>

                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/container/" target="_blank">Docker (recommended)</a></strong></td><td class="text-[var(--text-muted)]">Official image <code>jellyfin/jellyfin</code> or <code>ghcr.io/jellyfin/jellyfin</code>. Easiest option for Linux servers.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank">Linux packages</a></strong></td><td class="text-[var(--text-muted)]">Official repos for Debian/Ubuntu, Fedora, Arch. Install via <code>apt</code>, <code>dnf</code>, or <code>pacman</code>.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/windows/" target="_blank">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer or portable version. Tray app for startup.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/macos/" target="_blank">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG installer or portable version.</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/installation/" target="_blank">NAS</a></strong></td><td class="text-[var(--text-muted)]">Synology, QNAP, TrueNAS via Docker or native packages.</td></tr>
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
                    <p class="mt-2">Für DLNA wird <code>--net=host</code> benötigt. Weitere Details in der <a href="https://jellyfin.org/docs/general/installation/container/" target="_blank">offiziellen Container-Dokumentation</a>.</p>
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
                    <p class="mt-2">For DLNA, <code>--net=host</code> is required. See the <a href="https://jellyfin.org/docs/general/installation/container/" target="_blank">official container documentation</a> for more details.</p>
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
                    <p class="mt-3">Nach der Installation: <code>http://localhost:8096</code> im Browser öffnen. Weitere Details in der <a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank">offiziellen Linux-Anleitung</a>.</p>
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
                    <p class="mt-3">After installation: open <code>http://localhost:8096</code> in your browser. See the <a href="https://jellyfin.org/docs/general/installation/linux/" target="_blank">official Linux guide</a> for more details.</p>
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
                    <p class="mt-3">Nach dem Start ist Jellyfin unter <code>http://localhost:8096</code> erreichbar. Weitere Details im <a href="https://wiki.archlinux.org/title/Jellyfin" target="_blank">ArchWiki-Artikel zu Jellyfin</a>.</p>
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
                    <p class="mt-3">After starting, Jellyfin is available at <code>http://localhost:8096</code>. See the <a href="https://wiki.archlinux.org/title/Jellyfin" target="_blank">ArchWiki Jellyfin article</a> for more details.</p>
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
                    <p class="mt-3">Nach dem Start ist Jellyfin unter <code>http://localhost:8096</code> erreichbar. Weitere Details in der <a href="https://docs.rockylinux.org/guides/file_sharing/jellyfin/" target="_blank">Rocky Linux-Dokumentation</a>.</p>
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
                    <p class="mt-3">After starting, Jellyfin is available at <code>http://localhost:8096</code>. See the <a href="https://docs.rockylinux.org/guides/file_sharing/jellyfin/" target="_blank">Rocky Linux documentation</a> for more details.</p>
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
            introDe: 'Jellyfin bietet eine breite Palette an offiziellen und Community-Clients für praktisch jedes Gerät. Eine vollständige Liste finden Sie auf der <a href="https://jellyfin.org/downloads/clients/all/" target="_blank">offiziellen Download-Seite</a>.',
            introEn: 'Jellyfin offers a wide range of official and community clients for practically every device. See the full list on the <a href="https://jellyfin.org/downloads/clients/all/" target="_blank">official downloads page</a>.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Offizielle Clients',
                    titleEn: 'Official Clients',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Client</th></tr>
                    <tr><td><strong>Web</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin Web</a> (Standard) & Jellyfin Vue (Beta, modernes UI).</td></tr>
                    <tr><td><strong>Android</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Android</a> (offiziell).</td></tr>
                    <tr><td><strong>iOS / iPadOS</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for iOS</a> & Swiftfin (moderner Swift-Client).</td></tr>
                    <tr><td><strong>Android TV / Fire TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Android TV</a> (offiziell).</td></tr>
                    <tr><td><strong>Roku</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Roku</a> (trotz Store-Meldung ohne Abo nutzbar).</td></tr>
                    <tr><td><strong>Samsung TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Tizen</a>.</td></tr>
                    <tr><td><strong>LG TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for WebOS</a>.</td></tr>
                    <tr><td><strong>Xbox</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Xbox</a>.</td></tr>
                    <tr><td><strong>Kodi</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">JellyCon</a> (leichtgewichtig) & Jellyfin for Kodi (sync).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Client</th></tr>
                    <tr><td><strong>Web</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin Web</a> (default) & Jellyfin Vue (beta, modern UI).</td></tr>
                    <tr><td><strong>Android</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Android</a> (official).</td></tr>
                    <tr><td><strong>iOS / iPadOS</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for iOS</a> & Swiftfin (modern Swift client).</td></tr>
                    <tr><td><strong>Android TV / Fire TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Android TV</a> (official).</td></tr>
                    <tr><td><strong>Roku</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Roku</a> (no subscription needed despite store message).</td></tr>
                    <tr><td><strong>Samsung TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Tizen</a>.</td></tr>
                    <tr><td><strong>LG TV</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for WebOS</a>.</td></tr>
                    <tr><td><strong>Xbox</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">Jellyfin for Xbox</a>.</td></tr>
                    <tr><td><strong>Kodi</strong></td><td class="text-[var(--text-muted)]"><a href="https://jellyfin.org/downloads/clients/all/" target="_blank">JellyCon</a> (lightweight) & Jellyfin for Kodi (sync).</td></tr>
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
                    <tr><td><strong><a href="https://github.com/UnicornsOnLSD/finamp" target="_blank">Finamp</a></strong></td><td class="text-[var(--text-muted)]">Musik-Client für Android/iOS. Modernes UI, Offline-Modus, Lyrics, Radio-Modus.</td></tr>
                    <tr><td><strong><a href="https://github.com/Fladderapp/Fladder" target="_blank">Fladder</a></strong></td><td class="text-[var(--text-muted)]">Cross-Platform (Flutter). Trickplay, Intro-Skip, Downloads, Seerr-Integration.</td></tr>
                    <tr><td><strong><a href="https://github.com/jeffvli/feishin" target="_blank">Feishin</a></strong></td><td class="text-[var(--text-muted)]">Desktop-Musik-Client im Spotify-Stil. Auto-DJ, Lyrics, OpenSubsonic-Support.</td></tr>
                    <tr><td><strong><a href="https://github.com/fredrikburmester/streamyfin" target="_blank">Streamyfin</a></strong></td><td class="text-[var(--text-muted)]">iOS/Android. Offline-Modus, Casting, Intro-Skip, Seerr.</td></tr>
                    <tr><td><strong><a href="https://github.com/jarnedemeulemeester/findroid" target="_blank">Findroid</a></strong></td><td class="text-[var(--text-muted)]">Android-Client mit nativer UI.</td></tr>
                    <tr><td><strong><a href="https://github.com/jellybook-org/jellybook" target="_blank">JellyBook</a></strong></td><td class="text-[var(--text-muted)]">Für Bücher & Comics.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Client</th><th>Platform & Feature</th></tr>
                    <tr><td><strong><a href="https://github.com/UnicornsOnLSD/finamp" target="_blank">Finamp</a></strong></td><td class="text-[var(--text-muted)]">Music client for Android/iOS. Modern UI, offline mode, lyrics, radio mode.</td></tr>
                    <tr><td><strong><a href="https://github.com/Fladderapp/Fladder" target="_blank">Fladder</a></strong></td><td class="text-[var(--text-muted)]">Cross-platform (Flutter). Trickplay, intro skip, downloads, Seerr integration.</td></tr>
                    <tr><td><strong><a href="https://github.com/jeffvli/feishin" target="_blank">Feishin</a></strong></td><td class="text-[var(--text-muted)]">Desktop music client, Spotify-style. Auto-DJ, lyrics, OpenSubsonic support.</td></tr>
                    <tr><td><strong><a href="https://github.com/fredrikburmester/streamyfin" target="_blank">Streamyfin</a></strong></td><td class="text-[var(--text-muted)]">iOS/Android. Offline mode, casting, intro skip, Seerr.</td></tr>
                    <tr><td><strong><a href="https://github.com/jarnedemeulemeester/findroid" target="_blank">Findroid</a></strong></td><td class="text-[var(--text-muted)]">Android client with native UI.</td></tr>
                    <tr><td><strong><a href="https://github.com/jellybook-org/jellybook" target="_blank">JellyBook</a></strong></td><td class="text-[var(--text-muted)]">For books & comics.</td></tr>
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
            introDe: 'Jellyfin nutzt eine modifizierte Version von FFmpeg (<code>jellyfin-ffmpeg</code>), um Video-Transcoding auf der CPU oder GPU durchzuführen. Hardware-Beschleunigung entlastet die CPU erheblich. Weitere Informationen in der <a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/" target="_blank">offiziellen Hardware-Acceleration-Dokumentation</a>.',
            introEn: 'Jellyfin uses a modified version of FFmpeg (<code>jellyfin-ffmpeg</code>) to perform video transcoding on the CPU or GPU. Hardware acceleration significantly offloads the CPU. See the <a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/" target="_blank">official Hardware Acceleration documentation</a> for more information.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Unterstützte Hardware-Beschleunigung',
                    titleEn: 'Supported Hardware Acceleration',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Hersteller</th><th class="w-1/4">Technologie</th><th>Plattform</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/intel/" target="_blank">Intel</a></strong></td><td class="text-[var(--text-muted)]">Quick Sync Video (QSV)</td><td class="text-[var(--text-muted)]">Windows, Linux</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/nvidia/" target="_blank">NVIDIA</a></strong></td><td class="text-[var(--text-muted)]">NVDEC / NVENC</td><td class="text-[var(--text-muted)]">Windows, Linux</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/amd/" target="_blank">AMD</a></strong></td><td class="text-[var(--text-muted)]">AMF (Windows), VA-API (Linux)</td><td class="text-[var(--text-muted)]">Windows, Linux</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/apple/" target="_blank">Apple</a></strong></td><td class="text-[var(--text-muted)]">Video Toolbox</td><td class="text-[var(--text-muted)]">macOS</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/rockchip/" target="_blank">Rockchip</a></strong></td><td class="text-[var(--text-muted)]">RKMPP</td><td class="text-[var(--text-muted)]">Linux (RK3588/3576)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Vollständige Beschleunigung wird für Intel & NVIDIA (Win/Linux), AMD Polaris+ (Linux), Rockchip RK3588 und Apple Silicon (macOS 12+) unterstützt. Bei anderen Kombinationen kann es zu teilweiser Beschleunigung kommen.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Vendor</th><th class="w-1/4">Technology</th><th>Platform</th></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/intel/" target="_blank">Intel</a></strong></td><td class="text-[var(--text-muted)]">Quick Sync Video (QSV)</td><td class="text-[var(--text-muted)]">Windows, Linux</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/nvidia/" target="_blank">NVIDIA</a></strong></td><td class="text-[var(--text-muted)]">NVDEC / NVENC</td><td class="text-[var(--text-muted)]">Windows, Linux</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/amd/" target="_blank">AMD</a></strong></td><td class="text-[var(--text-muted)]">AMF (Windows), VA-API (Linux)</td><td class="text-[var(--text-muted)]">Windows, Linux</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/apple/" target="_blank">Apple</a></strong></td><td class="text-[var(--text-muted)]">Video Toolbox</td><td class="text-[var(--text-muted)]">macOS</td></tr>
                    <tr><td><strong><a href="https://jellyfin.org/docs/general/administration/hardware-acceleration/rockchip/" target="_blank">Rockchip</a></strong></td><td class="text-[var(--text-muted)]">RKMPP</td><td class="text-[var(--text-muted)]">Linux (RK3588/3576)</td></tr>
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
                    <li><strong>Jellyfin-FFmpeg:</strong> Verwenden Sie immer die mitgelieferte Version (Version-String enthält <code>-Jellyfin</code>). Fremde FFmpeg-Binaries führen zu <em>teilweiser</em> Beschleunigung.</li>
                    <li><strong>HDR-Tonemapping:</strong> Hardware-beschleunigtes Tone-Mapping von HDR10/HLG nach SDR wird unterstützt. Dolby Vision (P5/P8) ab Jellyfin 10.8.</li>
                    <li><strong>Remote-Transcoding:</strong> Falls der Server keine GPU hat, kann <a href="https://github.com/jellyfin/jellyfin-plugin-rffmpeg" target="_blank">rffmpeg</a> das Transcoding an eine andere Maschine delegieren (Linux-only, SSH erforderlich).</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>H.264 10-bit (High 10):</strong> Is <em>not</em> hardware-decoded by any Intel, NVIDIA, or AMD GPU. Only Apple Silicon and Rockchip can. Fallback is software decoding.</li>
                    <li><strong>Jellyfin-FFmpeg:</strong> Always use the bundled version (version string contains <code>-Jellyfin</code>). Third-party FFmpeg binaries result in <em>partial</em> acceleration.</li>
                    <li><strong>HDR Tonemapping:</strong> Hardware-accelerated tone-mapping of HDR10/HLG to SDR is supported. Dolby Vision (P5/P8) from Jellyfin 10.8.</li>
                    <li><strong>Remote Transcoding:</strong> If the server has no GPU, <a href="https://github.com/jellyfin/jellyfin-plugin-rffmpeg" target="_blank">rffmpeg</a> can delegate transcoding to another machine (Linux-only, SSH required).</li>
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
            introDe: 'Jellyfin bietet zahlreiche optionale Plugins zur Erweiterung der Funktionalität. Sie können direkt aus dem Plugin-Katalog installiert werden. Die offizielle Plugin-Dokumentation finden Sie unter <a href="https://jellyfin.org/docs/general/server/plugins/" target="_blank">jellyfin.org/docs/general/server/plugins</a>.',
            introEn: 'Jellyfin offers numerous optional plugins to extend functionality. They can be installed directly from the plugin catalog. The official plugin documentation is available at <a href="https://jellyfin.org/docs/general/server/plugins/" target="_blank">jellyfin.org/docs/general/server/plugins</a>.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Plugin-Kategorien',
                    titleEn: 'Plugin Categories',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Kategorie</th><th>Beschreibung & Beispiele</th></tr>
                    <tr><td><strong>Metadaten</strong></td><td class="text-[var(--text-muted)]">Anilist, Anidb, Anisearch, Bookshelf, Kitsu, TMDb Collections, Fanart.</td></tr>
                    <tr><td><strong>Authentifizierung</strong></td><td class="text-[var(--text-muted)]">LDAP (Verzeichnisdienst-Integration).</td></tr>
                    <tr><td><strong>Live-TV</strong></td><td class="text-[var(--text-muted)]">NextPVR, TVHeadend, HDHomeRun.</td></tr>
                    <tr><td><strong>Untertitel</strong></td><td class="text-[var(--text-muted)]">Open Subtitles, Subtitle Extract (eingebettete Untertitel extrahieren).</td></tr>
                    <tr><td><strong>Benachrichtigungen</strong></td><td class="text-[var(--text-muted)]">Gotify, Slack, E-Mail, Webhooks.</td></tr>
                    <tr><td><strong>Sync / Scrobble</strong></td><td class="text-[var(--text-muted)]">Trakt, Ani-Sync (MAL, AniList, Kitsu), Last.FM.</td></tr>
                    <tr><td><strong>Berichte</strong></td><td class="text-[var(--text-muted)]">Playback Reporting, Reports (Mediathek-Statistiken).</td></tr>
                    <tr><td><strong>Skin / Themes</strong></td><td class="text-[var(--text-muted)]">Skin Manager, Themerr (Theme-Musik für Filme/Serien).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Category</th><th>Description & Examples</th></tr>
                    <tr><td><strong>Metadata</strong></td><td class="text-[var(--text-muted)]">Anilist, Anidb, Anisearch, Bookshelf, Kitsu, TMDb Collections, Fanart.</td></tr>
                    <tr><td><strong>Authentication</strong></td><td class="text-[var(--text-muted)]">LDAP (directory service integration).</td></tr>
                    <tr><td><strong>Live TV</strong></td><td class="text-[var(--text-muted)]">NextPVR, TVHeadend, HDHomeRun.</td></tr>
                    <tr><td><strong>Subtitles</strong></td><td class="text-[var(--text-muted)]">Open Subtitles, Subtitle Extract (extract embedded subtitles).</td></tr>
                    <tr><td><strong>Notifications</strong></td><td class="text-[var(--text-muted)]">Gotify, Slack, email, webhooks.</td></tr>
                    <tr><td><strong>Sync / Scrobble</strong></td><td class="text-[var(--text-muted)]">Trakt, Ani-Sync (MAL, AniList, Kitsu), Last.FM.</td></tr>
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
                    <li><strong>Windows (direkt):</strong> <code>%UserProfile%\\AppData\\Local\\jellyfin\\plugins</code></li>
                    <li><strong>Windows (Tray):</strong> <code>%ProgramData%\\Jellyfin\\Server\\plugins</code></li>
                    <li><strong>Linux:</strong> <code>/var/lib/jellyfin/plugins/</code></li>
                    <li><strong>Docker:</strong> <code>/config/plugins/</code></li>
                    </ul>
                    <p class="mt-2">Installation über <strong>Dashboard → Plugins → Catalog</strong>. Nach der Installation ist ein Neustart erforderlich.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p><strong>Installation paths:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Windows (direct):</strong> <code>%UserProfile%\\AppData\\Local\\jellyfin\\plugins</code></li>
                    <li><strong>Windows (tray):</strong> <code>%ProgramData%\\Jellyfin\\Server\\plugins</code></li>
                    <li><strong>Linux:</strong> <code>/var/lib/jellyfin/plugins/</code></li>
                    <li><strong>Docker:</strong> <code>/config/plugins/</code></li>
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
            introDe: 'Jellyfin verwendet verschiedene Verzeichnisse für Daten, Konfiguration und Cache. Diese können über Kommandozeilenoptionen oder Umgebungsvariablen angepasst werden. Weitere Details in der <a href="https://jellyfin.org/docs/general/administration/configuration/" target="_blank">offiziellen Konfigurationsdokumentation</a>.',
            introEn: 'Jellyfin uses various directories for data, configuration, and cache. These can be adjusted via command-line options or environment variables. See the <a href="https://jellyfin.org/docs/general/administration/configuration/" target="_blank">official configuration documentation</a> for details.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Standard-Verzeichnisse',
                    titleEn: 'Default Directories',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Verzeichnis</th><th class="w-1/4">Windows</th><th>Linux</th></tr>
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
                    <tr><th class="w-1/4">Directory</th><th class="w-1/4">Windows</th><th>Linux</th></tr>
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
                    <tr><td><strong>8096</strong></td><td class="text-[var(--text-muted)]">TCP (HTTP)</td><td class="text-[var(--text-muted)]">Web-Interface & API.</td></tr>
                    <tr><td><strong>8920</strong></td><td class="text-[var(--text-muted)]">TCP (HTTPS)</td><td class="text-[var(--text-muted)]">Sichere Web-Oberfläche (optional).</td></tr>
                    <tr><td><strong>1900</strong></td><td class="text-[var(--text-muted)]">UDP</td><td class="text-[var(--text-muted)]">DLNA Service Discovery.</td></tr>
                    <tr><td><strong>7359</strong></td><td class="text-[var(--text-muted)]">UDP</td><td class="text-[var(--text-muted)]">Client Discovery (Auto-Discovery im LAN).</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Docker benötigt <code>--net=host</code> oder explizite Port-Freigaben für DLNA/Discovery. Für Remote-Zugriff empfiehlt sich ein Reverse-Proxy (Nginx, Caddy, Traefik) mit HTTPS. Weitere Informationen im <a href="https://jellyfin.org/docs/general/networking/" target="_blank">offiziellen Networking-Guide</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Port</th><th class="w-1/4">Protocol</th><th>Purpose</th></tr>
                    <tr><td><strong>8096</strong></td><td class="text-[var(--text-muted)]">TCP (HTTP)</td><td class="text-[var(--text-muted)]">Web interface & API.</td></tr>
                    <tr><td><strong>8920</strong></td><td class="text-[var(--text-muted)]">TCP (HTTPS)</td><td class="text-[var(--text-muted)]">Secure web interface (optional).</td></tr>
                    <tr><td><strong>1900</strong></td><td class="text-[var(--text-muted)]">UDP</td><td class="text-[var(--text-muted)]">DLNA service discovery.</td></tr>
                    <tr><td><strong>7359</strong></td><td class="text-[var(--text-muted)]">UDP</td><td class="text-[var(--text-muted)]">Client discovery (auto-discovery on LAN).</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Docker requires <code>--net=host</code> or explicit port mappings for DLNA/discovery. For remote access, a reverse proxy (Nginx, Caddy, Traefik) with HTTPS is recommended. See the <a href="https://jellyfin.org/docs/general/networking/" target="_blank">official networking guide</a> for more information.</p>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten Jellyfin-Aspekte auf einen Blick.',
            introEn: 'The key Jellyfin aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Kostenlos & Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Immer 0 €, GPLv2-Lizenz. Keine Premium-Tier, keine Cloud-Abhängigkeit. Volle Kontrolle über Daten und Server.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tv opacity-70"></i><span>2. Clients für alles</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Web, Android, iOS, Android TV, Roku, Samsung, LG, Xbox, Kodi. Plus Community-Clients wie Finamp, Fladder, Streamyfin.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>3. Hardware-Transcoding</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Intel QSV, NVIDIA NVENC, AMD AMF, VA-API, VideoToolbox, Rockchip RKMPP. Jellyfin-FFmpeg für volle Beschleunigung nötig.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>4. Plugin-System</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Metadaten (AniList, TMDb), LDAP-Auth, Untertitel, Trakt-Sync, Live-TV, Benachrichtigungen, Themes. Installation über Dashboard-Katalog.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Free & Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Always $0, GPLv2 license. No premium tier, no cloud dependency. Full control over data and server.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tv opacity-70"></i><span>2. Clients for everything</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Web, Android, iOS, Android TV, Roku, Samsung, LG, Xbox, Kodi. Plus community clients like Finamp, Fladder, Streamyfin.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>3. Hardware Transcoding</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Intel QSV, NVIDIA NVENC, AMD AMF, VA-API, VideoToolbox, Rockchip RKMPP. Jellyfin-FFmpeg required for full acceleration.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>4. Plugin System</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Metadata (AniList, TMDb), LDAP auth, subtitles, Trakt sync, Live TV, notifications, themes. Install via dashboard catalog.</p>
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