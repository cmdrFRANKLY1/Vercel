// resources/topics/topic_obsidian.js
// Registers the Obsidian knowledge base reference topic. Loaded via <script> injection.

/* ==================================================================
   OBSIDIAN CODE-BLOCK COPY CONTROLLER
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
    id: 'Obsidian Overview',
    icon: 'fa-gem',
    titleDe: 'Obsidian',
    titleEn: 'Obsidian',
    descDe: 'Lokale Wissensdatenbank auf Markdown-Basis',
    descEn: 'Local-first Knowledge Base on Markdown',

    sidebarTitleDe: 'Obsidian',
    sidebarTitleEn: 'Obsidian',
    sidebarSubtitleDe: 'Dein zweites Gehirn, deine Daten',
    sidebarSubtitleEn: 'Your Second Brain, Your Data',
    sidebarVersion: 'v1.10+',

    hero: {
        titleDe: 'Obsidian: Dein zweites Gehirn, deine Daten',
        titleEn: 'Obsidian: Your Second Brain, Your Data',
        introDe: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> ist eine <strong>leistungsstarke, lokal-first Wissensmanagement-App</strong>, die deine Notizen als einfache <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a>-Dateien speichert. Keine proprietären Formate, kein Cloud-Lock-in. Mit bidirektionalen Links, Graph View und über 1.000 Community-Plugins baust du eine persönliche Wissensdatenbank auf, die mit dir wächst. <a href="https://help.obsidian.md/" target="_blank" class="topic-link">Zur offiziellen Hilfe</a>.',
        introEn: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> is a <strong>powerful, local-first knowledge management app</strong> that stores your notes as plain <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a> files. No proprietary formats, no cloud lock-in. With bidirectional links, graph view, and over 1,000 community plugins, you build a personal knowledge base that grows with you. <a href="https://help.obsidian.md/" target="_blank" class="topic-link">Visit the official help</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-link',              href: '#section3', switchToDoc: true, labelDe: 'Linking',        labelEn: 'Linking' },
        { icon: 'fa-puzzle-piece',      href: '#section4', switchToDoc: true, labelDe: 'Plugins',        labelEn: 'Plugins' },
        { icon: 'fa-database',          href: '#section5', switchToDoc: true, labelDe: 'Bases',          labelEn: 'Bases' },
        { icon: 'fa-sync',              href: '#section6', switchToDoc: true, labelDe: 'Sync',           labelEn: 'Sync' },
        { icon: 'fa-external-link-alt', href: 'https://help.obsidian.md/', target: '_blank', labelDe: 'Offizielle Hilfe', labelEn: 'Official Help' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Philosophie',
            titleEn: '1. Overview & Philosophy',
            introDe: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> wurde um eine einfache Idee herum gebaut: <strong>Deine Notizen gehören dir</strong>. Alle Daten werden als einfache <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a>-Dateien auf deinem Gerät gespeichert. Du kannst sie mit jedem <a href="https://en.wikipedia.org/wiki/Text_editor" target="_blank" class="topic-link">Texteditor</a> öffnen, mit <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a> versionieren oder jederzeit zu einem anderen Tool migrieren. <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a> und <a href="https://obsidian.md/publish" target="_blank" class="topic-link">Obsidian Publish</a> sind optionale Zusatzdienste. Alle Details in der <a href="https://help.obsidian.md/" target="_blank" class="topic-link">offiziellen Hilfe</a>.',
            introEn: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> was built around a simple idea: <strong>your notes belong to you</strong>. All data is stored as plain <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a> files on your device. You can open them in any <a href="https://en.wikipedia.org/wiki/Text_editor" target="_blank" class="topic-link">text editor</a>, version them with <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a>, or migrate to any other tool at any time. <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a> and <a href="https://obsidian.md/publish" target="_blank" class="topic-link">Obsidian Publish</a> are optional add-on services. Full details in the <a href="https://help.obsidian.md/" target="_blank" class="topic-link">official help</a>.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Obsidian?',
                    titleEn: 'What is Obsidian?',
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
                        .wikitable a[href^="http"],
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"],
                        .grid a[href^="http"] {
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
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"]:hover,
                        .grid a[href^="http"]:hover {
                            color: var(--link-hover-color, var(--link-color));
                            background: color-mix(in srgb, var(--link-color) 18%, transparent);
                            text-decoration-thickness: 3px;
                        }
                        .wikitable a[href^="http"]:visited,
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"]:visited {
                            color: var(--link-color);
                            opacity: 0.85;
                        }

                        /* External links (target="_blank") get a small arrow */
                        a[target="_blank"].topic-link::after,
                        .wikitable a[target="_blank"]::after,
                        .grid a[target="_blank"]::after {
                            content: "\\2197";              /* ↗ */
                            display: inline-block;
                            margin-left: 0.2em;
                            font-size: 0.75em;
                            opacity: 0.75;
                            transition: transform 0.15s ease, opacity 0.15s ease;
                        }
                        a[target="_blank"].topic-link:hover::after,
                        .wikitable a[target="_blank"]:hover::after,
                        .grid a[target="_blank"]:hover::after {
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
                            .jf-code-inner { font-size: 0.66rem; padding: 0.8rem; }
                            .jf-copy-btn { opacity: 1; transform: translateY(0); }
                        }
                    </style>

                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Lokale Wissensdatenbank & <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a>-Editor.</td></tr>
                    <tr><td><strong>Datenspeicherung</strong></td><td class="text-[var(--text-muted)]">Einfache <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link"><code>.md</code></a>-Dateien in einem lokalen Ordner (Vault). Siehe <a href="https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data" target="_blank" class="topic-link">Datenspeicherung</a>.</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Bidirektionale Links, <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a>, <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">Backlinks</a>, <a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a>.</td></tr>
                    <tr><td><strong>Erweiterbarkeit</strong></td><td class="text-[var(--text-muted)]">Über 1.000 <a href="https://obsidian.md/plugins" target="_blank" class="topic-link">Community-Plugins</a>, hunderte Themes.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>. Siehe <a href="https://obsidian.md/download" target="_blank" class="topic-link">Download-Seite</a>.</td></tr>
                    <tr><td><strong>Preis</strong></td><td class="text-[var(--text-muted)]">Kern-App kostenlos, auch für kommerzielle Nutzung. <a href="https://obsidian.md/pricing" target="_blank" class="topic-link">Sync ab $4/Monat</a>.</td></tr>
                    <tr><td><strong>Offline</strong></td><td class="text-[var(--text-muted)]">Funktioniert vollständig offline. Kein Account für Kernfunktionen nötig.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Local knowledge base & <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a> editor.</td></tr>
                    <tr><td><strong>Data storage</strong></td><td class="text-[var(--text-muted)]">Plain <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link"><code>.md</code></a> files in a local folder (vault). See <a href="https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data" target="_blank" class="topic-link">data storage</a>.</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Bidirectional links, <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a>, <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">backlinks</a>, <a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a>.</td></tr>
                    <tr><td><strong>Extensibility</strong></td><td class="text-[var(--text-muted)]">Over 1,000 <a href="https://obsidian.md/plugins" target="_blank" class="topic-link">community plugins</a>, hundreds of themes.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>. See <a href="https://obsidian.md/download" target="_blank" class="topic-link">download page</a>.</td></tr>
                    <tr><td><strong>Price</strong></td><td class="text-[var(--text-muted)]">Core app free, even for commercial use. <a href="https://obsidian.md/pricing" target="_blank" class="topic-link">Sync from $4/month</a>.</td></tr>
                    <tr><td><strong>Offline</strong></td><td class="text-[var(--text-muted)]">Works fully offline. No account required for core features.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Warum Obsidian?',
                    titleEn: 'Why Obsidian?',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-lock opacity-70"></i><span>Deine Daten bleiben deine</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed">Alles als einfache <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link"><code>.md</code></a>-Dateien in einem Ordner, den du kontrollierst. Kein proprietäres Format, kein Cloud-Lock-in. Mehr dazu in der <a href="https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data" target="_blank" class="topic-link">Dokumentation zur Datenspeicherung</a>.</p>
                        </div>
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-wifi-slash opacity-70"></i><span>Offline by default</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed"><a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> läuft vollständig auf deinem Gerät. Kein Account für die Kern-App nötig. <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Sync</a> und <a href="https://obsidian.md/publish" target="_blank" class="topic-link">Publish</a> sind optional.</p>
                        </div>
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>Hochgradig erweiterbar</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed">Über 1.000 <a href="https://obsidian.md/plugins" target="_blank" class="topic-link">Community-Plugins</a> und hunderte Themes. Passt sich an deinen Workflow an – ob Autor, Entwickler oder Forscher.</p>
                        </div>
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-diagram-project opacity-70"></i><span>Für vernetztes Denken</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed">Bidirektionale Links, <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a> und <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">Backlinks</a> helfen dir, Beziehungen zwischen Notizen zu entdecken.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-lock opacity-70"></i><span>Your data stays yours</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed">Everything as plain <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link"><code>.md</code></a> files in a folder you control. No proprietary format, no cloud lock-in. Learn more in the <a href="https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data" target="_blank" class="topic-link">data storage documentation</a>.</p>
                        </div>
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-wifi-slash opacity-70"></i><span>Offline by default</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed"><a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> runs entirely on your device. No account required for the core app. <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Sync</a> and <a href="https://obsidian.md/publish" target="_blank" class="topic-link">Publish</a> are optional.</p>
                        </div>
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>Highly extensible</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed">Over 1,000 <a href="https://obsidian.md/plugins" target="_blank" class="topic-link">community plugins</a> and hundreds of themes. Adapts to your workflow – writer, developer, or researcher.</p>
                        </div>
                        <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)]">
                            <div class="flex items-center gap-2 mb-2 font-semibold text-xs"><i class="fa-solid fa-diagram-project opacity-70"></i><span>Built for connected thinking</span></div>
                            <p class="text-[0.68rem] text-[var(--text-muted)] leading-relaxed">Bidirectional links, <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a>, and <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">backlinks</a> help you discover relationships between your notes.</p>
                        </div>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation & Erste Schritte',
            titleEn: '2. Installation & Getting Started',
            introDe: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> ist für alle gängigen Plattformen verfügbar. Nach der Installation erstellst du einen <strong>Vault</strong> – einen einfachen Ordner mit <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a>-Dateien. Kein Account erforderlich, keine Cloud-Anbindung für die Kernfunktionen. Alle Downloads findest du auf der <a href="https://obsidian.md/download" target="_blank" class="topic-link">offiziellen Download-Seite</a>.',
            introEn: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> is available for all common platforms. After installation, you create a <strong>vault</strong> – a simple folder of <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a> files. No account required, no cloud connection for core features. All downloads are on the <a href="https://obsidian.md/download" target="_blank" class="topic-link">official download page</a>.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Download</th></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer (.exe) von <a href="https://obsidian.md/download" target="_blank" class="topic-link">obsidian.md</a>, oder <code>scoop install obsidian</code> via <a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG-Installer, oder <code>brew install --cask obsidian</code> via <a href="https://brew.sh/" target="_blank" class="topic-link">Homebrew</a></td></tr>
                    <tr><td><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://appimage.org/" target="_blank" class="topic-link">AppImage</a>, <a href="https://snapcraft.io/obsidian" target="_blank" class="topic-link">Snap</a>, <a href="https://flathub.org/apps/md.obsidian.Obsidian" target="_blank" class="topic-link">Flatpak</a>, oder Distribution-spezifische Pakete. Siehe <a href="https://obsidian.md/download" target="_blank" class="topic-link">Download-Seite</a>.</td></tr>
                    <tr><td><strong><a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS / iPadOS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://apps.apple.com/app/obsidian-connected-notes/id1557175442" target="_blank" class="topic-link">App Store</a> – kostenlos</td></tr>
                    <tr><td><strong><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://play.google.com/store/apps/details?id=md.obsidian" target="_blank" class="topic-link">Google Play</a> – kostenlos</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Download</th></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer (.exe) from <a href="https://obsidian.md/download" target="_blank" class="topic-link">obsidian.md</a>, or <code>scoop install obsidian</code> via <a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a></td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG installer, or <code>brew install --cask obsidian</code> via <a href="https://brew.sh/" target="_blank" class="topic-link">Homebrew</a></td></tr>
                    <tr><td><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://appimage.org/" target="_blank" class="topic-link">AppImage</a>, <a href="https://snapcraft.io/obsidian" target="_blank" class="topic-link">Snap</a>, <a href="https://flathub.org/apps/md.obsidian.Obsidian" target="_blank" class="topic-link">Flatpak</a>, or distro-specific packages. See <a href="https://obsidian.md/download" target="_blank" class="topic-link">download page</a>.</td></tr>
                    <tr><td><strong><a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS / iPadOS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://apps.apple.com/app/obsidian-connected-notes/id1557175442" target="_blank" class="topic-link">App Store</a> – free</td></tr>
                    <tr><td><strong><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://play.google.com/store/apps/details?id=md.obsidian" target="_blank" class="topic-link">Google Play</a> – free</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Ersten Vault erstellen',
                    titleEn: 'Create Your First Vault',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Schritte:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mb-3">
                    <li><a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> starten und <strong>"Create new vault"</strong> wählen.</li>
                    <li>Namen eingeben (z.B. <code>MeinWissen</code>) und Speicherort wählen.</li>
                    <li><strong>"Create"</strong> klicken – der Vault ist bereit.</li>
                    </ol>
                    <p class="mb-2"><strong>Struktur eines Vaults:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">MeinWissen/
├── .obsidian/           # Konfiguration (wird automatisch erstellt)
├── Notizen/            # Deine Markdown-Dateien
│   ├── Projekt.md
│   └── Idee.md
└── Anhänge/            # Bilder, PDFs, etc.</pre>
                    </div>
                    <p class="mt-3">Der <code>.obsidian</code>-Ordner enthält Einstellungen, Themes und Plugin-Daten. Er sollte nicht manuell bearbeitet werden. Details in der <a href="https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data" target="_blank" class="topic-link">Dokumentation zur Datenspeicherung</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Steps:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mb-3">
                    <li>Launch <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> and select <strong>"Create new vault"</strong>.</li>
                    <li>Enter a name (e.g., <code>MyKnowledge</code>) and choose a location.</li>
                    <li>Click <strong>"Create"</strong> – the vault is ready.</li>
                    </ol>
                    <p class="mb-2"><strong>Vault structure:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">MyKnowledge/
├── .obsidian/           # Configuration (created automatically)
├── Notes/              # Your Markdown files
│   ├── Project.md
│   └── Idea.md
└── Attachments/        # Images, PDFs, etc.</pre>
                    </div>
                    <p class="mt-3">The <code>.obsidian</code> folder contains settings, themes, and plugin data. It should not be edited manually. Details in the <a href="https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data" target="_blank" class="topic-link">data storage documentation</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. LINKING ============ */
        {
            id: 'section3',
            titleDe: '3. Linking & Graph View',
            titleEn: '3. Linking & Graph View',
            introDe: 'Das Herzstück von <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> sind <strong>bidirektionale Links</strong>. Wenn du eine Notiz mit <code>[[Notizname]]</code> verlinkst, weiß <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> automatisch, welche anderen Notizen auf diese verweisen (<a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">Backlinks</a>). Die <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a> visualisiert alle Verbindungen als Netzwerk.',
            introEn: 'The heart of <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> is <strong>bidirectional linking</strong>. When you link a note with <code>[[Note Name]]</code>, <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> automatically knows which other notes reference it (<a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">backlinks</a>). <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a> visualizes all connections as a network.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Interne Links & Backlinks',
                    titleEn: 'Internal Links & Backlinks',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Interne Links erstellen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Einfacher Link
[[Notizname]]

# Link mit Anzeigetext
[[Notizname|Angezeigter Text]]

# Link mit Überschrift
[[Notizname#Überschrift]]

# Link zu einem Block
[[Notizname^block-id]]</pre>
                    </div>
                    <p class="mt-3"><strong>So funktionieren Backlinks:</strong></p>
                    <p class="mt-2">Wenn <code>Notiz B</code> auf <code>Notiz A</code> verlinkt, zeigt die Backlinks-Sektion in <code>Notiz A</code> automatisch alle Notizen an, die auf sie verweisen. Du musst nichts manuell pflegen. Siehe <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">Backlinks-Dokumentation</a>.</p>
                    <p class="mt-3"><strong>Tipp:</strong> <code>[[</code> tippen öffnet die Autovervollständigung für Notizen. <code>Ctrl/Cmd+Click</code> auf einen Link öffnet die Zielnotiz in einem neuen Tab. Weitere Details in der <a href="https://help.obsidian.md/Linking+notes+and+files/Internal+links" target="_blank" class="topic-link">Dokumentation zu internen Links</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Create internal links:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Simple link
[[Note Name]]

# Link with display text
[[Note Name|Display Text]]

# Link with heading
[[Note Name#Heading]]

# Link to a block
[[Note Name^block-id]]</pre>
                    </div>
                    <p class="mt-3"><strong>How backlinks work:</strong></p>
                    <p class="mt-2">When <code>Note B</code> links to <code>Note A</code>, the backlinks section in <code>Note A</code> automatically shows all notes that reference it. No manual maintenance required. See <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">backlinks documentation</a>.</p>
                    <p class="mt-3"><strong>Tip:</strong> Typing <code>[[</code> opens autocomplete for notes. <code>Ctrl/Cmd+Click</code> on a link opens the target note in a new tab. More details in the <a href="https://help.obsidian.md/Linking+notes+and+files/Internal+links" target="_blank" class="topic-link">internal links documentation</a>.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Graph View & Canvas',
                    titleEn: 'Graph View & Canvas',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a></strong></td><td class="text-[var(--text-muted)]">Visualisiert alle Notizen und ihre Verbindungen als interaktives Netzwerk. Filter nach Tags, Ordnern oder Suchbegriffen möglich.</td></tr>
                    <tr><td><strong>Local Graph</strong></td><td class="text-[var(--text-muted)]">Zeigt nur die direkten Nachbarn der aktuellen Notiz. Nützlich für fokussiertes Arbeiten.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a></strong></td><td class="text-[var(--text-muted)]">Unendliche Leinwand zum visuellen Anordnen von Notizen, Bildern und Textboxen. Ideal für Brainstorming und Projektplanung.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tipp:</strong> In der <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a> kannst du per Mausrad zoomen, per Drag verschieben und per Klick auf einen Knoten die Notiz öffnen. Die Farben der Knoten lassen sich nach Tags oder Ordnern gruppieren.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a></strong></td><td class="text-[var(--text-muted)]">Visualizes all notes and their connections as an interactive network. Filter by tags, folders, or search terms.</td></tr>
                    <tr><td><strong>Local Graph</strong></td><td class="text-[var(--text-muted)]">Shows only the direct neighbors of the current note. Useful for focused work.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a></strong></td><td class="text-[var(--text-muted)]">Infinite canvas for visually arranging notes, images, and text boxes. Ideal for brainstorming and project planning.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tip:</strong> In <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a> you can zoom with the mouse wheel, pan by dragging, and click a node to open the note. Node colors can be grouped by tags or folders.</p>
                    `
                }
            ]
        },

        /* ============ 4. PLUGINS ============ */
        {
            id: 'section4',
            titleDe: '4. Plugins & Erweiterungen',
            titleEn: '4. Plugins & Extensions',
            introDe: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> bietet <strong>Core-Plugins</strong> (von den Entwicklern) und <strong>Community-Plugins</strong> (von der Community). Core-Plugins sind standardmäßig verfügbar, Community-Plugins müssen in den Einstellungen aktiviert werden. Das <a href="https://obsidian.md/plugins" target="_blank" class="topic-link">Plugin-Ökosystem</a> umfasst über 1.000 Erweiterungen.',
            introEn: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> offers <strong>core plugins</strong> (by the developers) and <strong>community plugins</strong> (by the community). Core plugins are available by default; community plugins must be enabled in settings. The <a href="https://obsidian.md/plugins" target="_blank" class="topic-link">plugin ecosystem</a> includes over 1,000 extensions.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Beliebte Community-Plugins',
                    titleEn: 'Popular Community Plugins',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Funktion</th></tr>
                    <tr><td><strong><a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank" class="topic-link">Dataview</a></strong></td><td class="text-[var(--text-muted)]">Datenbank-ähnliche Abfragen über Notizen-Metadaten. Tabellen, Listen, Aufgaben aus Frontmatter und Inline-Feldern generieren.</td></tr>
                    <tr><td><strong><a href="https://github.com/obsidian-tasks-group/obsidian-tasks" target="_blank" class="topic-link">Tasks</a></strong></td><td class="text-[var(--text-muted)]">Aufgabenverwaltung mit Fälligkeitsdaten, Prioritäten und Wiederholungen. Globale Aufgabenübersicht.</td></tr>
                    <tr><td><strong><a href="https://github.com/SilentVoid13/Templater" target="_blank" class="topic-link">Templater</a></strong></td><td class="text-[var(--text-muted)]">Erweiterte Vorlagen mit JavaScript-Unterstützung. Automatische Datums-, Zeit- und Systemvariablen.</td></tr>
                    <tr><td><strong><a href="https://github.com/mgmeyers/obsidian-kanban" target="_blank" class="topic-link">Kanban</a></strong></td><td class="text-[var(--text-muted)]">Kanban-Boards in Markdown-Notizen. Karten per Drag & Drop verschieben.</td></tr>
                    <tr><td><strong><a href="https://github.com/zsviczian/obsidian-excalidraw-plugin" target="_blank" class="topic-link">Excalidraw</a></strong></td><td class="text-[var(--text-muted)]">Handgezeichnete Diagramme und Skizzen direkt in Obsidian.</td></tr>
                    <tr><td><strong><a href="https://github.com/denolehov/obsidian-git" target="_blank" class="topic-link">Obsidian Git</a></strong></td><td class="text-[var(--text-muted)]">Automatische Vault-Backups und Versionierung mit <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a>. Ideal für Power-User.</td></tr>
                    <tr><td><strong><a href="https://github.com/scambier/obsidian-omnisearch" target="_blank" class="topic-link">Omnisearch</a></strong></td><td class="text-[var(--text-muted)]">Schnellere Suche mit BM25-Ranking und Typo-Toleranz. Indexiert auch PDFs und Bilder (mit Text Extractor).</td></tr>
                    <tr><td><strong><a href="https://github.com/chhoumann/quickadd" target="_blank" class="topic-link">QuickAdd</a></strong></td><td class="text-[var(--text-muted)]">Automatisierte Workflows für Notizen-Erstellung, Captures, Makros und Multi-Aktionen.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Aktivierung:</strong> Einstellungen → Community-Plugins → "Restricted Mode" deaktivieren → "Browse" → Plugin suchen und installieren. Siehe <a href="https://help.obsidian.md/Extending+Obsidian/Community+plugins" target="_blank" class="topic-link">Community-Plugins-Dokumentation</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Function</th></tr>
                    <tr><td><strong><a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank" class="topic-link">Dataview</a></strong></td><td class="text-[var(--text-muted)]">Database-like queries over note metadata. Generate tables, lists, tasks from frontmatter and inline fields.</td></tr>
                    <tr><td><strong><a href="https://github.com/obsidian-tasks-group/obsidian-tasks" target="_blank" class="topic-link">Tasks</a></strong></td><td class="text-[var(--text-muted)]">Task management with due dates, priorities, and recurrence. Global task overview.</td></tr>
                    <tr><td><strong><a href="https://github.com/SilentVoid13/Templater" target="_blank" class="topic-link">Templater</a></strong></td><td class="text-[var(--text-muted)]">Advanced templates with JavaScript support. Automatic date, time, and system variables.</td></tr>
                    <tr><td><strong><a href="https://github.com/mgmeyers/obsidian-kanban" target="_blank" class="topic-link">Kanban</a></strong></td><td class="text-[var(--text-muted)]">Kanban boards in Markdown notes. Drag & drop cards between columns.</td></tr>
                    <tr><td><strong><a href="https://github.com/zsviczian/obsidian-excalidraw-plugin" target="_blank" class="topic-link">Excalidraw</a></strong></td><td class="text-[var(--text-muted)]">Hand-drawn diagrams and sketches directly in Obsidian.</td></tr>
                    <tr><td><strong><a href="https://github.com/denolehov/obsidian-git" target="_blank" class="topic-link">Obsidian Git</a></strong></td><td class="text-[var(--text-muted)]">Automatic vault backups and versioning with <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a>. Ideal for power users.</td></tr>
                    <tr><td><strong><a href="https://github.com/scambier/obsidian-omnisearch" target="_blank" class="topic-link">Omnisearch</a></strong></td><td class="text-[var(--text-muted)]">Faster search with BM25 ranking and typo tolerance. Indexes PDFs and images (with Text Extractor).</td></tr>
                    <tr><td><strong><a href="https://github.com/chhoumann/quickadd" target="_blank" class="topic-link">QuickAdd</a></strong></td><td class="text-[var(--text-muted)]">Automated workflows for note creation, captures, macros, and multi-actions.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Activation:</strong> Settings → Community plugins → Disable "Restricted Mode" → "Browse" → search and install plugin. See <a href="https://help.obsidian.md/Extending+Obsidian/Community+plugins" target="_blank" class="topic-link">community plugins documentation</a>.</p>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Core-Plugins',
                    titleEn: 'Core Plugins',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Funktion</th></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/daily-notes" target="_blank" class="topic-link">Daily Notes</a></strong></td><td class="text-[var(--text-muted)]">Tägliche Notiz mit Datum als Titel. Basis für Journaling und Second Brain.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/templates" target="_blank" class="topic-link">Templates</a></strong></td><td class="text-[var(--text-muted)]">Einfache Vorlagen für neue Notizen.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a></strong></td><td class="text-[var(--text-muted)]">Unendliche Leinwand für visuelles Denken.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a></strong></td><td class="text-[var(--text-muted)]">Netzwerkvisualisierung aller Notizen.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/outline" target="_blank" class="topic-link">Outline</a></strong></td><td class="text-[var(--text-muted)]">Inhaltsverzeichnis der aktuellen Notiz.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/bases" target="_blank" class="topic-link">Bases</a></strong></td><td class="text-[var(--text-muted)]">Datenbank-Ansichten aus Notiz-Eigenschaften (neu in v1.9).</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Core-Plugins können in den Einstellungen unter "Core Plugins" aktiviert/deaktiviert werden. Sie sind im Gegensatz zu Community-Plugins sicher und werden von den <a href="https://obsidian.md/about" target="_blank" class="topic-link">Obsidian-Entwicklern</a> gepflegt. Siehe <a href="https://help.obsidian.md/Extending+Obsidian/Core+plugins" target="_blank" class="topic-link">Core-Plugins-Dokumentation</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Function</th></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/daily-notes" target="_blank" class="topic-link">Daily Notes</a></strong></td><td class="text-[var(--text-muted)]">Daily note with date as title. Foundation for journaling and second brain.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/templates" target="_blank" class="topic-link">Templates</a></strong></td><td class="text-[var(--text-muted)]">Simple templates for new notes.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a></strong></td><td class="text-[var(--text-muted)]">Infinite canvas for visual thinking.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a></strong></td><td class="text-[var(--text-muted)]">Network visualization of all notes.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/plugins/outline" target="_blank" class="topic-link">Outline</a></strong></td><td class="text-[var(--text-muted)]">Table of contents for the current note.</td></tr>
                    <tr><td><strong><a href="https://help.obsidian.md/bases" target="_blank" class="topic-link">Bases</a></strong></td><td class="text-[var(--text-muted)]">Database views from note properties (new in v1.9).</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Core plugins can be enabled/disabled in Settings under "Core Plugins". Unlike community plugins, they are safe and maintained by the <a href="https://obsidian.md/about" target="_blank" class="topic-link">Obsidian developers</a>. See <a href="https://help.obsidian.md/Extending+Obsidian/Core+plugins" target="_blank" class="topic-link">core plugins documentation</a>.</p>
                    `
                }
            ]
        },

        /* ============ 5. BASES ============ */
        {
            id: 'section5',
            titleDe: '5. Bases (Datenbank-Ansichten)',
            titleEn: '5. Bases (Database Views)',
            introDe: 'Mit <strong>Bases</strong> (eingeführt in <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> 1.9) verwandelst du jede Sammlung von Notizen in eine <strong>leistungsstarke Datenbank</strong>. Filtere Notizen nach Eigenschaften, erstelle Formeln für dynamische Werte und visualisiere deine Daten in Tabellen, Listen oder Karten. Alle Daten basieren auf deinen lokalen <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a>-Dateien und <a href="https://yaml.org/" target="_blank" class="topic-link">YAML</a>-Eigenschaften. Siehe <a href="https://help.obsidian.md/bases" target="_blank" class="topic-link">Bases-Dokumentation</a>.',
            introEn: 'With <strong>Bases</strong> (introduced in <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> 1.9), you turn any set of notes into a <strong>powerful database</strong>. Filter notes by properties, create formulas for dynamic values, and visualize your data in tables, lists, or cards. All data is backed by your local <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a> files and <a href="https://yaml.org/" target="_blank" class="topic-link">YAML</a> properties. See <a href="https://help.obsidian.md/bases" target="_blank" class="topic-link">Bases documentation</a>.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Was sind Bases?',
                    titleEn: 'What are Bases?',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Dateiformat</strong></td><td class="text-[var(--text-muted)]"><code>.base</code>-Dateien definieren die Ansicht. Daten bleiben in den Notizen.</td></tr>
                    <tr><td><strong>Tabellen-Ansicht</strong></td><td class="text-[var(--text-muted)]">Notizen als Zeilen, Eigenschaften als Spalten. Sortieren, gruppieren, zusammenfassen.</td></tr>
                    <tr><td><strong>Listen-Ansicht</strong></td><td class="text-[var(--text-muted)]">Notizen als Aufzählung oder nummerierte Liste mit mehrzeiligem Inhalt.</td></tr>
                    <tr><td><strong>Karten-Ansicht</strong></td><td class="text-[var(--text-muted)]">Notizen auf einer Karte visualisieren (via <a href="https://github.com/esm7/obsidian-map-view" target="_blank" class="topic-link">Map View</a>-Plugin).</td></tr>
                    <tr><td><strong>Formeln</strong></td><td class="text-[var(--text-muted)]">Eigene dynamische Werte berechnen. Funktionen wie <code>reduce()</code>, <code>mean()</code>, <code>stddev()</code>, <code>median()</code>.</td></tr>
                    <tr><td><strong>Filter</strong></td><td class="text-[var(--text-muted)]">Notizen nach Eigenschaften, Tags, Ordnern oder Text filtern.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Description</th></tr>
                    <tr><td><strong>File format</strong></td><td class="text-[var(--text-muted)]"><code>.base</code> files define the view. Data stays in the notes.</td></tr>
                    <tr><td><strong>Table view</strong></td><td class="text-[var(--text-muted)]">Notes as rows, properties as columns. Sort, group, summarize.</td></tr>
                    <tr><td><strong>List view</strong></td><td class="text-[var(--text-muted)]">Notes as bulleted or numbered lists with multi-line content.</td></tr>
                    <tr><td><strong>Card view</strong></td><td class="text-[var(--text-muted)]">Visualize notes on a map (via <a href="https://github.com/esm7/obsidian-map-view" target="_blank" class="topic-link">Map View</a> plugin).</td></tr>
                    <tr><td><strong>Formulas</strong></td><td class="text-[var(--text-muted)]">Compute custom dynamic values. Functions like <code>reduce()</code>, <code>mean()</code>, <code>stddev()</code>, <code>median()</code>.</td></tr>
                    <tr><td><strong>Filters</strong></td><td class="text-[var(--text-muted)]">Filter notes by properties, tags, folders, or text.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Bases-Beispiel',
                    titleEn: 'Bases Example',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Einfache Projekt-Übersicht als Base:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># .base-Datei: Projekte.base

filters:
  and:
    - 'status != "done"'
    - 'type = "project"'

views:
  - type: table
    name: Aktive Projekte
    order:
      - file.name
      - status
      - priority
      - due
    sort:
      - property: priority
        direction: DESC

  - type: list
    name: Alle Projekte</pre>
                    </div>
                    <p class="mt-3">Diese Base zeigt alle Notizen mit <code>type: project</code> und <code>status</code> ungleich <code>done</code>. Die Tabelle ist nach Priorität sortiert. Weitere Ansichten können in derselben Datei definiert werden. Siehe <a href="https://help.obsidian.md/bases/syntax" target="_blank" class="topic-link">Bases-Syntax-Referenz</a>.</p>
                    <p class="mt-3"><strong>Tipp:</strong> Bases können auch mit Community-Plugins wie <a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank" class="topic-link">Dataview</a> kombiniert werden, wenn du mehr Kontrolle über die Abfragen brauchst.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Simple project overview as a base:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># .base file: Projects.base

filters:
  and:
    - 'status != "done"'
    - 'type = "project"'

views:
  - type: table
    name: Active Projects
    order:
      - file.name
      - status
      - priority
      - due
    sort:
      - property: priority
        direction: DESC

  - type: list
    name: All Projects</pre>
                    </div>
                    <p class="mt-3">This base shows all notes with <code>type: project</code> and <code>status</code> not equal to <code>done</code>. The table is sorted by priority. Additional views can be defined in the same file. See <a href="https://help.obsidian.md/bases/syntax" target="_blank" class="topic-link">Bases syntax reference</a>.</p>
                    <p class="mt-3"><strong>Tip:</strong> Bases can also be combined with community plugins like <a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank" class="topic-link">Dataview</a> if you need more control over queries.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. SYNC ============ */
        {
            id: 'section6',
            titleDe: '6. Sync & Datensicherung',
            titleEn: '6. Sync & Backup',
            introDe: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> speichert Notizen lokal auf deinem Gerät. Für den Zugriff auf mehreren Geräten gibt es mehrere Optionen: den offiziellen <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a> (Ende-zu-Ende-verschlüsselt), <a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a> (Apple-Ökosystem), <a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a> (dezentral) oder Cloud-Speicher wie <a href="https://onedrive.live.com/" target="_blank" class="topic-link">OneDrive</a> und <a href="https://drive.google.com/" target="_blank" class="topic-link">Google Drive</a>. Die Wahl hängt von deinen Geräten und deinem Sicherheitsbedürfnis ab.',
            introEn: '<a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> stores notes locally on your device. For access across multiple devices, there are several options: the official <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a> (end-to-end encrypted), <a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a> (Apple ecosystem), <a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a> (decentralized), or cloud storage like <a href="https://onedrive.live.com/" target="_blank" class="topic-link">OneDrive</a> and <a href="https://drive.google.com/" target="_blank" class="topic-link">Google Drive</a>. The choice depends on your devices and security needs.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Sync-Methoden im Vergleich',
                    titleEn: 'Sync Methods Compared',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th class="w-1/4">Plattformen</th><th>Besonderheit</th></tr>
                    <tr><td><strong><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a></strong></td><td class="text-[var(--text-muted)]">Alle</td><td class="text-[var(--text-muted)]">Offiziell, Ende-zu-Ende-verschlüsselt (AES-256), Versionsverlauf. Ab $4/Monat.</td></tr>
                    <tr><td><strong><a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a></strong></td><td class="text-[var(--text-muted)]">macOS, iOS, iPadOS</td><td class="text-[var(--text-muted)]">Nahtlos im Apple-Ökosystem. Unter Windows kann es zu Dateiduplikaten kommen.</td></tr>
                    <tr><td><strong><a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a></strong></td><td class="text-[var(--text-muted)]">Alle (mit Fork für Android)</td><td class="text-[var(--text-muted)]">Dezentral, kein Cloud-Anbieter. Erfordert mindestens ein Gerät, das immer online ist.</td></tr>
                    <tr><td><strong><a href="https://onedrive.live.com/" target="_blank" class="topic-link">OneDrive</a></strong></td><td class="text-[var(--text-muted)]">Windows, macOS</td><td class="text-[var(--text-muted)]">Auf Android eingeschränkt, iOS nicht offiziell unterstützt. Dateien offline verfügbar machen.</td></tr>
                    <tr><td><strong><a href="https://drive.google.com/" target="_blank" class="topic-link">Google Drive</a></strong></td><td class="text-[var(--text-muted)]">Windows, macOS, Android</td><td class="text-[var(--text-muted)]">iOS nicht offiziell. Erfordert manuelle Konfiguration und Offline-Verfügbarkeit.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Empfehlung:</strong> Für maximale Sicherheit und Komfort: <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a>. Für Apple-only: <a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a>. Für Selbsthoster: <a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th class="w-1/4">Platforms</th><th>Specialty</th></tr>
                    <tr><td><strong><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a></strong></td><td class="text-[var(--text-muted)]">All</td><td class="text-[var(--text-muted)]">Official, end-to-end encrypted (AES-256), version history. From $4/month.</td></tr>
                    <tr><td><strong><a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a></strong></td><td class="text-[var(--text-muted)]">macOS, iOS, iPadOS</td><td class="text-[var(--text-muted)]">Seamless in the Apple ecosystem. On Windows, file duplication can occur.</td></tr>
                    <tr><td><strong><a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a></strong></td><td class="text-[var(--text-muted)]">All (with fork for Android)</td><td class="text-[var(--text-muted)]">Decentralized, no cloud provider. Requires at least one device always online.</td></tr>
                    <tr><td><strong><a href="https://onedrive.live.com/" target="_blank" class="topic-link">OneDrive</a></strong></td><td class="text-[var(--text-muted)]">Windows, macOS</td><td class="text-[var(--text-muted)]">Limited on Android, not officially supported on iOS. Mark files as available offline.</td></tr>
                    <tr><td><strong><a href="https://drive.google.com/" target="_blank" class="topic-link">Google Drive</a></strong></td><td class="text-[var(--text-muted)]">Windows, macOS, Android</td><td class="text-[var(--text-muted)]">Not official on iOS. Requires manual setup and offline availability.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Recommendation:</strong> For maximum security and convenience: <a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a>. For Apple-only: <a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a>. For self-hosters: <a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a>.</p>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Sync-Preise & Lizenzen',
                    titleEn: 'Sync Pricing & Licenses',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Produkt</th><th class="w-1/4">Preis</th><th>Details</th></tr>
                    <tr><td><strong>Obsidian Core</strong></td><td class="text-[var(--text-muted)]">Kostenlos</td><td class="text-[var(--text-muted)]">Für immer, auch kommerziell. Keine Einschränkungen. Siehe <a href="https://obsidian.md/pricing" target="_blank" class="topic-link">Preisseite</a>.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Sync Standard</a></strong></td><td class="text-[var(--text-muted)]">$4/Monat</td><td class="text-[var(--text-muted)]">1 Vault, 1 GB Speicher, 1 Monat Versionsverlauf.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Sync Plus</a></strong></td><td class="text-[var(--text-muted)]">$8/Monat</td><td class="text-[var(--text-muted)]">10 Vaults, 10 GB Speicher, 12 Monate Versionsverlauf.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/publish" target="_blank" class="topic-link">Publish</a></strong></td><td class="text-[var(--text-muted)]">$8/Monat</td><td class="text-[var(--text-muted)]">Notizen als Website veröffentlichen.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/catalyst" target="_blank" class="topic-link">Catalyst</a></strong></td><td class="text-[var(--text-muted)]">$25 einmalig</td><td class="text-[var(--text-muted)]">Early Access, Community-Badge. Unterstützt die Entwicklung.</td></tr>
                    <tr><td><strong>Studenten/Lehrkräfte</strong></td><td class="text-[var(--text-muted)]">40% Rabatt</td><td class="text-[var(--text-muted)]">Auf Sync und Publish. Nachweis erforderlich.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Rückgabe:</strong> Volle Rückerstattung innerhalb von 7 Tagen für Sync und Publish. Catalyst und Commercial sind nicht erstattungsfähig.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Product</th><th class="w-1/4">Price</th><th>Details</th></tr>
                    <tr><td><strong>Obsidian Core</strong></td><td class="text-[var(--text-muted)]">Free</td><td class="text-[var(--text-muted)]">Forever, even commercially. No restrictions. See <a href="https://obsidian.md/pricing" target="_blank" class="topic-link">pricing page</a>.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Sync Standard</a></strong></td><td class="text-[var(--text-muted)]">$4/month</td><td class="text-[var(--text-muted)]">1 vault, 1 GB storage, 1 month version history.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Sync Plus</a></strong></td><td class="text-[var(--text-muted)]">$8/month</td><td class="text-[var(--text-muted)]">10 vaults, 10 GB storage, 12 months version history.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/publish" target="_blank" class="topic-link">Publish</a></strong></td><td class="text-[var(--text-muted)]">$8/month</td><td class="text-[var(--text-muted)]">Publish notes as a website.</td></tr>
                    <tr><td><strong><a href="https://obsidian.md/catalyst" target="_blank" class="topic-link">Catalyst</a></strong></td><td class="text-[var(--text-muted)]">$25 one-time</td><td class="text-[var(--text-muted)]">Early access, community badge. Supports development.</td></tr>
                    <tr><td><strong>Students/Faculty</strong></td><td class="text-[var(--text-muted)]">40% discount</td><td class="text-[var(--text-muted)]">On Sync and Publish. Verification required.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Refunds:</strong> Full refund within 7 days for Sync and Publish. Catalyst and Commercial are non-refundable.</p>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://obsidian.md/" target="_blank" class="topic-link">Obsidian</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-lock opacity-70"></i><span>1. Deine Daten, deine Kontrolle</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Einfache <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a>-Dateien, kein Cloud-Lock-in. Kern-App kostenlos, auch kommerziell. Sync optional ab $4/Monat.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-link opacity-70"></i><span>2. Bidirektionales Linking</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">[[Interne Links]], <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">Backlinks</a>, <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">Graph View</a>, <a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a>. Ideal für vernetztes Denken und Second Brain.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>3. Riesiges Plugin-Ökosystem</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Über 1.000 Community-Plugins: <a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank" class="topic-link">Dataview</a>, <a href="https://github.com/obsidian-tasks-group/obsidian-tasks" target="_blank" class="topic-link">Tasks</a>, <a href="https://github.com/SilentVoid13/Templater" target="_blank" class="topic-link">Templater</a>, <a href="https://github.com/mgmeyers/obsidian-kanban" target="_blank" class="topic-link">Kanban</a>, <a href="https://github.com/zsviczian/obsidian-excalidraw-plugin" target="_blank" class="topic-link">Excalidraw</a>, <a href="https://github.com/denolehov/obsidian-git" target="_blank" class="topic-link">Git</a>. Plus Core-Plugins wie <a href="https://help.obsidian.md/bases" target="_blank" class="topic-link">Bases</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-sync opacity-70"></i><span>4. Flexible Sync-Optionen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a> (E2E-verschlüsselt), <a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a>, <a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a>, <a href="https://onedrive.live.com/" target="_blank" class="topic-link">OneDrive</a>, <a href="https://drive.google.com/" target="_blank" class="topic-link">Google Drive</a>. Wahl je nach Plattform und Sicherheitsbedürfnis.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-lock opacity-70"></i><span>1. Your Data, Your Control</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Plain <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a> files, no cloud lock-in. Core app free, even commercially. Sync optional from $4/month.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-link opacity-70"></i><span>2. Bidirectional Linking</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">[[Internal Links]], <a href="https://help.obsidian.md/plugins/backlinks" target="_blank" class="topic-link">backlinks</a>, <a href="https://help.obsidian.md/plugins/graph" target="_blank" class="topic-link">graph view</a>, <a href="https://help.obsidian.md/plugins/canvas" target="_blank" class="topic-link">Canvas</a>. Ideal for connected thinking and second brain.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>3. Huge Plugin Ecosystem</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Over 1,000 community plugins: <a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank" class="topic-link">Dataview</a>, <a href="https://github.com/obsidian-tasks-group/obsidian-tasks" target="_blank" class="topic-link">Tasks</a>, <a href="https://github.com/SilentVoid13/Templater" target="_blank" class="topic-link">Templater</a>, <a href="https://github.com/mgmeyers/obsidian-kanban" target="_blank" class="topic-link">Kanban</a>, <a href="https://github.com/zsviczian/obsidian-excalidraw-plugin" target="_blank" class="topic-link">Excalidraw</a>, <a href="https://github.com/denolehov/obsidian-git" target="_blank" class="topic-link">Git</a>. Plus core plugins like <a href="https://help.obsidian.md/bases" target="_blank" class="topic-link">Bases</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-sync opacity-70"></i><span>4. Flexible Sync Options</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://obsidian.md/sync" target="_blank" class="topic-link">Obsidian Sync</a> (E2E encrypted), <a href="https://www.icloud.com/" target="_blank" class="topic-link">iCloud</a>, <a href="https://syncthing.net/" target="_blank" class="topic-link">Syncthing</a>, <a href="https://onedrive.live.com/" target="_blank" class="topic-link">OneDrive</a>, <a href="https://drive.google.com/" target="_blank" class="topic-link">Google Drive</a>. Choice depends on platform and security needs.</p>
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
            { icon: 'fa-globe',    href: 'https://obsidian.md/',                    target: '_blank', labelDe: 'Offizielle Website',        labelEn: 'Official Website' },
            { icon: 'fa-download', href: 'https://obsidian.md/download',           target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-book',     href: 'https://help.obsidian.md/',              target: '_blank', labelDe: 'Offizielle Hilfe',          labelEn: 'Official Help' },
            { icon: 'fa-puzzle-piece', href: 'https://obsidian.md/plugins',        target: '_blank', labelDe: 'Plugin-Verzeichnis',        labelEn: 'Plugin Directory' },
            { icon: 'fa-github',   href: 'https://github.com/obsidianmd',          target: '_blank', labelDe: 'GitHub Repository',         labelEn: 'GitHub Repository' },
            { icon: 'fa-comments', href: 'https://forum.obsidian.md/',              target: '_blank', labelDe: 'Community Forum',           labelEn: 'Community Forum' }
        ]
    },

    footer: {
        textDe: 'Obsidian Referenz · v1.0 · Dual Lang',
        textEn: 'Obsidian Reference · v1.0 · Dual Lang'
    }
});