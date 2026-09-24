// resources/topics/topic_autohotkey.js
// Registers the AutoHotkey v2 reference topic. Loaded via <script> injection.

/* ==================================================================
   AUTOHOTKEY CODE-BLOCK COPY CONTROLLER
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
    id: 'AutoHotkey v2 Overview',
    icon: 'fa-keyboard',
    titleDe: 'AutoHotkey v2',
    titleEn: 'AutoHotkey v2',
    descDe: 'Windows-Automatisierung & Skripting',
    descEn: 'Windows Automation & Scripting',

    sidebarTitleDe: 'AutoHotkey v2',
    sidebarTitleEn: 'AutoHotkey v2',
    sidebarSubtitleDe: 'Skriptsprache für Windows',
    sidebarSubtitleEn: 'Scripting Language for Windows',
    sidebarVersion: 'v2.0+',

    hero: {
        titleDe: 'AutoHotkey v2: Windows-Automatisierung neu gedacht',
        titleEn: 'AutoHotkey v2: Windows Automation Redefined',
        introDe: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> ist eine <strong>kostenlose, quelloffene <a href="https://en.wikipedia.org/wiki/Scripting_language" target="_blank" class="topic-link">Skriptsprache</a> für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong>, mit der sich Tastenkürzel, Makros und Automatisierungen erstellen lassen. Die <strong>Version 2.0</strong> ist eine komplette Überarbeitung mit expression-basierter Syntax, echter <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">Objektorientierung</a> und strikter Fehlerbehandlung. Sie ersetzt das seit März 2024 nicht mehr gepflegte v1.1. <a href="https://www.autohotkey.com/docs/v2/" target="_blank" class="topic-link">Zur offiziellen Dokumentation</a>.',
        introEn: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> is a <strong>free, open-source <a href="https://en.wikipedia.org/wiki/Scripting_language" target="_blank" class="topic-link">scripting language</a> for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong> that lets you create hotkeys, macros, and automations. <strong>Version 2.0</strong> is a complete rewrite with expression-based syntax, true <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">object orientation</a>, and strict error handling. It replaces v1.1, which reached end-of-life in March 2024. <a href="https://www.autohotkey.com/docs/v2/" target="_blank" class="topic-link">Visit the official documentation</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-code',              href: '#section3', switchToDoc: true, labelDe: 'Syntax',         labelEn: 'Syntax' },
        { icon: 'fa-keyboard',          href: '#section4', switchToDoc: true, labelDe: 'Hotkeys',        labelEn: 'Hotkeys' },
        { icon: 'fa-cube',              href: '#section5', switchToDoc: true, labelDe: 'Objekte',        labelEn: 'Objects' },
        { icon: 'fa-cog',               href: '#section6', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://www.autohotkey.com/docs/v2/', target: '_blank', labelDe: 'Offizielle Doku', labelEn: 'Official Docs' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Versionen',
            titleEn: '1. Overview & Versions',
            introDe: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 ist die <strong>aktiv entwickelte Version</strong> der Skriptsprache. Sie wurde von Grund auf neu geschrieben, um Konsistenz, Sicherheit und Wartbarkeit zu verbessern. Der wichtigste Unterschied zu v1.1: <strong>Alles ist ein Ausdruck (Expression)</strong>, es gibt keine Legacy-Befehle mehr, und Variablen sind nicht mehr global per Default.',
            introEn: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 is the <strong>actively developed version</strong> of the scripting language. It was rewritten from scratch to improve consistency, safety, and maintainability. The key difference from v1.1: <strong>everything is an expression</strong>, there are no legacy commands, and variables are no longer global by default.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'v2 vs. v1.1',
                    titleEn: 'v2 vs. v1.1',
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
                        /* Navigation anchors (href="#sectionN") are excluded   */
                        /* so the "Inhaltsverzeichnis" / quickLinks stay plain. */
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
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/3">v1.1 (Legacy)</th><th class="w-1/3">v2.0 (Aktiv)</th></tr>
                    <tr><td><strong>Status</strong></td><td class="text-[var(--text-muted)]">End-of-Life seit März 2024</td><td class="text-[var(--text-muted)]">Aktiv entwickelt, empfohlen</td></tr>
                    <tr><td><strong>Syntax</strong></td><td class="text-[var(--text-muted)]">Befehle + Legacy-Syntax</td><td class="text-[var(--text-muted)]">Rein expression-basiert</td></tr>
                    <tr><td><strong>Variablen</strong></td><td class="text-[var(--text-muted)]">Global by default</td><td class="text-[var(--text-muted)]">Lokal in Funktionen, explizit <code>global</code></td></tr>
                    <tr><td><strong>Funktionen</strong></td><td class="text-[var(--text-muted)]">Befehle mit OutputVar</td><td class="text-[var(--text-muted)]">Echte Funktionen mit Rückgabewert</td></tr>
                    <tr><td><strong>Fehlerbehandlung</strong></td><td class="text-[var(--text-muted)]">ErrorLevel-Variable</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Exception_handling" target="_blank" class="topic-link">Exceptions</a> mit try/catch</td></tr>
                    <tr><td><strong>Objekte</strong></td><td class="text-[var(--text-muted)]">Eingeschränkt</td><td class="text-[var(--text-muted)]">Volle <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">OOP</a> mit Klassen, Properties, Vererbung</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">v1.1-Skripte laufen nicht in v2. Die Migration erfordert manuelle Anpassung. <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 bietet einen <a href="https://www.autohotkey.com/docs/v2/v2-changes.htm" target="_blank" class="topic-link">Changes-Guide</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/3">v1.1 (Legacy)</th><th class="w-1/3">v2.0 (Active)</th></tr>
                    <tr><td><strong>Status</strong></td><td class="text-[var(--text-muted)]">End-of-life since March 2024</td><td class="text-[var(--text-muted)]">Actively developed, recommended</td></tr>
                    <tr><td><strong>Syntax</strong></td><td class="text-[var(--text-muted)]">Commands + legacy syntax</td><td class="text-[var(--text-muted)]">Purely expression-based</td></tr>
                    <tr><td><strong>Variables</strong></td><td class="text-[var(--text-muted)]">Global by default</td><td class="text-[var(--text-muted)]">Local in functions, explicit <code>global</code></td></tr>
                    <tr><td><strong>Functions</strong></td><td class="text-[var(--text-muted)]">Commands with OutputVar</td><td class="text-[var(--text-muted)]">True functions with return values</td></tr>
                    <tr><td><strong>Error handling</strong></td><td class="text-[var(--text-muted)]">ErrorLevel variable</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Exception_handling" target="_blank" class="topic-link">Exceptions</a> with try/catch</td></tr>
                    <tr><td><strong>Objects</strong></td><td class="text-[var(--text-muted)]">Limited</td><td class="text-[var(--text-muted)]">Full <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">OOP</a> with classes, properties, inheritance</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">v1.1 scripts do not run in v2. Migration requires manual adaptation. <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 offers a <a href="https://www.autohotkey.com/docs/v2/v2-changes.htm" target="_blank" class="topic-link">Changes guide</a>.</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Anwendungsfälle',
                    titleEn: 'Use Cases',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Bereich</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Hotkeys & Remapping</strong></td><td class="text-[var(--text-muted)]">Globale Tastenkürzel, Tastenbelegung ändern (z.B. <a href="https://en.wikipedia.org/wiki/Caps_Lock" target="_blank" class="topic-link">CapsLock</a> zu Escape).</td></tr>
                    <tr><td><strong>Text-Expansion</strong></td><td class="text-[var(--text-muted)]">Hotstrings für häufige Textbausteine, E-Mail-Vorlagen, Code-Snippets.</td></tr>
                    <tr><td><strong>Fenster-Management</strong></td><td class="text-[var(--text-muted)]">Fenster verschieben, Größe ändern, anordnen, virtuelle Desktops.</td></tr>
                    <tr><td><strong>GUI-Automatisierung</strong></td><td class="text-[var(--text-muted)]">Buttons klicken, Formulare ausfüllen, Menüs navigieren in anderen Programmen.</td></tr>
                    <tr><td><strong>Datei-Operationen</strong></td><td class="text-[var(--text-muted)]">Batch-Verarbeitung, Umbenennen, Kopieren, Inhalte durchsuchen.</td></tr>
                    <tr><td><strong>Clipboard-Verwaltung</strong></td><td class="text-[var(--text-muted)]">Clipboard-Historie, Text-Transformation, Zwischenablage überwachen.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Area</th><th>Description</th></tr>
                    <tr><td><strong>Hotkeys & Remapping</strong></td><td class="text-[var(--text-muted)]">Global shortcuts, remap keys (e.g., <a href="https://en.wikipedia.org/wiki/Caps_Lock" target="_blank" class="topic-link">CapsLock</a> to Escape).</td></tr>
                    <tr><td><strong>Text Expansion</strong></td><td class="text-[var(--text-muted)]">Hotstrings for common phrases, email templates, code snippets.</td></tr>
                    <tr><td><strong>Window Management</strong></td><td class="text-[var(--text-muted)]">Move, resize, arrange windows, virtual desktops.</td></tr>
                    <tr><td><strong>GUI Automation</strong></td><td class="text-[var(--text-muted)]">Click buttons, fill forms, navigate menus in other programs.</td></tr>
                    <tr><td><strong>File Operations</strong></td><td class="text-[var(--text-muted)]">Batch processing, renaming, copying, searching contents.</td></tr>
                    <tr><td><strong>Clipboard Management</strong></td><td class="text-[var(--text-muted)]">Clipboard history, text transformation, monitor clipboard.</td></tr>
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
            introDe: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 ist ausschließlich für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> verfügbar. Es gibt keine native <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>- oder <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>-Version, da die Sprache auf Windows-APIs wie Low-Level-Keyboard-Hooks und Window-Messages aufbaut. Für Linux gibt es Alternativen wie <a href="https://github.com/autokey/autokey" target="_blank" class="topic-link">AutoKey</a> (X11-only) oder <a href="https://espanso.org/" target="_blank" class="topic-link">Espanso</a> (Cross-Platform).',
            introEn: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 is available exclusively for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>. There is no native <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> or <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> version, as the language is built on Windows APIs like low-level keyboard hooks and window messages. For Linux, alternatives include <a href="https://github.com/autokey/autokey" target="_blank" class="topic-link">AutoKey</a> (X11-only) or <a href="https://espanso.org/" target="_blank" class="topic-link">Espanso</a> (cross-platform).',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://www.autohotkey.com/" target="_blank" class="topic-link">Offizieller Installer</a></strong></td><td class="text-[var(--text-muted)]">Download von <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">autohotkey.com</a>. Wählt zwischen v1.1 und v2 bei der Installation.</td></tr>
                    <tr><td><strong><a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a></strong></td><td class="text-[var(--text-muted)]"><code>choco install autohotkey</code> – installiert die aktuelle Version.</td></tr>
                    <tr><td><strong>Portable</strong></td><td class="text-[var(--text-muted)]">ZIP-Download, keine Installation nötig. Manuelle .ahk-Zuordnung.</td></tr>
                    <tr><td><strong><a href="https://github.com/Keysharp/Keysharp" target="_blank" class="topic-link">Keysharp</a> (Cross-Platform)</strong></td><td class="text-[var(--text-muted)]">Experimentelle <a href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)" target="_blank" class="topic-link">C#</a>-Implementierung für Windows, Linux, macOS. <em>Nicht für Produktion empfohlen.</em></td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://www.autohotkey.com/" target="_blank" class="topic-link">Official Installer</a></strong></td><td class="text-[var(--text-muted)]">Download from <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">autohotkey.com</a>. Choose between v1.1 and v2 during setup.</td></tr>
                    <tr><td><strong><a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a></strong></td><td class="text-[var(--text-muted)]"><code>choco install autohotkey</code> – installs the current version.</td></tr>
                    <tr><td><strong>Portable</strong></td><td class="text-[var(--text-muted)]">ZIP download, no installation required. Manual .ahk association.</td></tr>
                    <tr><td><strong><a href="https://github.com/Keysharp/Keysharp" target="_blank" class="topic-link">Keysharp</a> (Cross-Platform)</strong></td><td class="text-[var(--text-muted)]">Experimental <a href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)" target="_blank" class="topic-link">C#</a> implementation for Windows, Linux, macOS. <em>Not recommended for production.</em></td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Erstes Skript',
                    titleEn: 'First Script',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Minimales v2-Skript:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">#Requires AutoHotkey v2.0
#SingleInstance

; Einfacher Hotkey: Windows+E öffnet Explorer
#e::Run "explorer.exe"

; Hotstring: "btw" wird zu "by the way"
::btw::by the way

; MsgBox-Beispiel
F1::MsgBox "Hallo von AutoHotkey v2!"</pre>
                    </div>
                    <p class="mt-3"><strong>Wichtige Direktiven:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><code>#Requires AutoHotkey v2.0</code> – erzwingt v2, verhindert versehentlichen Start mit v1.</li>
                    <li><code>#SingleInstance</code> – verhindert mehrfache Ausführung des Skripts.</li>
                    </ul>
                    <p class="mt-3">Weitere Details im <a href="https://www.autohotkey.com/docs/v2/" target="_blank" class="topic-link">offiziellen Handbuch</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Minimal v2 script:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">#Requires AutoHotkey v2.0
#SingleInstance

; Simple hotkey: Windows+E opens Explorer
#e::Run "explorer.exe"

; Hotstring: "btw" becomes "by the way"
::btw::by the way

; MsgBox example
F1::MsgBox "Hello from AutoHotkey v2!"</pre>
                    </div>
                    <p class="mt-3"><strong>Key directives:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><code>#Requires AutoHotkey v2.0</code> – enforces v2, prevents accidental launch with v1.</li>
                    <li><code>#SingleInstance</code> – prevents multiple script instances.</li>
                    </ul>
                    <p class="mt-3">More details in the <a href="https://www.autohotkey.com/docs/v2/" target="_blank" class="topic-link">official manual</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. SYNTAX ============ */
        {
            id: 'section3',
            titleDe: '3. Syntax & Ausdrücke',
            titleEn: '3. Syntax & Expressions',
            introDe: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 verwendet <strong>durchgängig Ausdrücke (Expressions)</strong>. Die alte Befehls-Syntax aus v1.1 mit <code>%</code>-Dereferenzierung ist komplett entfernt. Variablen werden direkt referenziert, Funktionen mit Klammern aufgerufen.',
            introEn: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 uses <strong>expressions throughout</strong>. The old command syntax from v1.1 with <code>%</code> dereferencing is completely removed. Variables are referenced directly, functions are called with parentheses.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Variablen & Datentypen',
                    titleEn: 'Variables & Data Types',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Typ</th><th>Beispiel</th></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/String_(computer_science)" target="_blank" class="topic-link">String</a></strong></td><td class="text-[var(--text-muted)]"><code>Name := "AutoHotkey"</code> – Anführungszeichen erforderlich.</td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Integer" target="_blank" class="topic-link">Integer</a></strong></td><td class="text-[var(--text-muted)]"><code>Count := 42</code></td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Floating-point_arithmetic" target="_blank" class="topic-link">Float</a></strong></td><td class="text-[var(--text-muted)]"><code>Pi := 3.14159</code></td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Array_(data_structure)" target="_blank" class="topic-link">Array</a></strong></td><td class="text-[var(--text-muted)]"><code>Items := ["a", "b", "c"]</code> – 1-basiert indexiert.</td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Associative_array" target="_blank" class="topic-link">Map</a></strong></td><td class="text-[var(--text-muted)]"><code>Config := Map("key", "value")</code></td></tr>
                    <tr><td><strong>Object</strong></td><td class="text-[var(--text-muted)]"><code>Point := {x: 10, y: 20}</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wichtig:</strong> In v2 müssen Strings immer in Anführungszeichen stehen. <code>MsgBox, Hallo</code> (v1) wird zu <code>MsgBox "Hallo"</code> (v2).</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Type</th><th>Example</th></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/String_(computer_science)" target="_blank" class="topic-link">String</a></strong></td><td class="text-[var(--text-muted)]"><code>Name := "AutoHotkey"</code> – quotes required.</td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Integer" target="_blank" class="topic-link">Integer</a></strong></td><td class="text-[var(--text-muted)]"><code>Count := 42</code></td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Floating-point_arithmetic" target="_blank" class="topic-link">Float</a></strong></td><td class="text-[var(--text-muted)]"><code>Pi := 3.14159</code></td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Array_(data_structure)" target="_blank" class="topic-link">Array</a></strong></td><td class="text-[var(--text-muted)]"><code>Items := ["a", "b", "c"]</code> – 1-based indexing.</td></tr>
                    <tr><td><strong><a href="https://en.wikipedia.org/wiki/Associative_array" target="_blank" class="topic-link">Map</a></strong></td><td class="text-[var(--text-muted)]"><code>Config := Map("key", "value")</code></td></tr>
                    <tr><td><strong>Object</strong></td><td class="text-[var(--text-muted)]"><code>Point := {x: 10, y: 20}</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Important:</strong> In v2, strings must always be quoted. <code>MsgBox, Hallo</code> (v1) becomes <code>MsgBox "Hallo"</code> (v2).</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Kontrollfluss',
                    titleEn: 'Control Flow',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>If/Else mit Expression:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">if (Count > 10) {
    MsgBox "Mehr als 10"
} else if (Count = 10) {
    MsgBox "Genau 10"
} else {
    MsgBox "Weniger als 10"
}</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Loops:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">; For-Loop über Array
for Index, Value in Items {
    MsgBox "Index " Index ": " Value
}

; Klassischer Loop
Loop 5 {
    MsgBox "Durchlauf " A_Index
}</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Try/Catch für Fehlerbehandlung:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">try {
    FileDelete "nicht_existent.txt"
} catch Error as e {
    MsgBox "Fehler: " e.Message
}</pre>
                    </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>If/Else with expression:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">if (Count > 10) {
    MsgBox "More than 10"
} else if (Count = 10) {
    MsgBox "Exactly 10"
} else {
    MsgBox "Less than 10"
}</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Loops:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">; For-loop over array
for Index, Value in Items {
    MsgBox "Index " Index ": " Value
}

; Classic loop
Loop 5 {
    MsgBox "Iteration " A_Index
}</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Try/Catch for error handling:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">try {
    FileDelete "nonexistent.txt"
} catch Error as e {
    MsgBox "Error: " e.Message
}</pre>
                    </div>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. HOTKEYS ============ */
        {
            id: 'section4',
            titleDe: '4. Hotkeys & Hotstrings',
            titleEn: '4. Hotkeys & Hotstrings',
            introDe: 'Hotkeys sind das Herzstück von <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a>. In v2 müssen <strong>mehrzeilige Hotkeys in geschweifte Klammern</strong> gesetzt werden. Die Syntax für Modifikatoren bleibt gleich: <code>^</code> (<a href="https://en.wikipedia.org/wiki/Control_key" target="_blank" class="topic-link">Ctrl</a>), <code>!</code> (<a href="https://en.wikipedia.org/wiki/Alt_key" target="_blank" class="topic-link">Alt</a>), <code>+</code> (<a href="https://en.wikipedia.org/wiki/Shift_key" target="_blank" class="topic-link">Shift</a>), <code>#</code> (<a href="https://en.wikipedia.org/wiki/Windows_key" target="_blank" class="topic-link">Win</a>).',
            introEn: 'Hotkeys are the heart of <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a>. In v2, <strong>multi-line hotkeys must be enclosed in braces</strong>. Modifier syntax stays the same: <code>^</code> (<a href="https://en.wikipedia.org/wiki/Control_key" target="_blank" class="topic-link">Ctrl</a>), <code>!</code> (<a href="https://en.wikipedia.org/wiki/Alt_key" target="_blank" class="topic-link">Alt</a>), <code>+</code> (<a href="https://en.wikipedia.org/wiki/Shift_key" target="_blank" class="topic-link">Shift</a>), <code>#</code> (<a href="https://en.wikipedia.org/wiki/Windows_key" target="_blank" class="topic-link">Win</a>).',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Hotkey-Syntax',
                    titleEn: 'Hotkey Syntax',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Syntax</th><th>Bedeutung</th></tr>
                    <tr><td><code>F1::MsgBox "Hallo"</code></td><td class="text-[var(--text-muted)]">Einzeiliger Hotkey – funktioniert ohne Klammern.</td></tr>
                    <tr><td><code>F1:: { MsgBox "Hallo" }</code></td><td class="text-[var(--text-muted)]">Mehrzeiliger Hotkey – Klammern erforderlich.</td></tr>
                    <tr><td><code>#e::Run "explorer.exe"</code></td><td class="text-[var(--text-muted)]">Windows+E.</td></tr>
                    <tr><td><code>^!s::MsgBox "Ctrl+Alt+S"</code></td><td class="text-[var(--text-muted)]">Ctrl+Alt+S.</td></tr>
                    <tr><td><code>~a::MsgBox "a gedrückt"</code></td><td class="text-[var(--text-muted)]">~ unterdrückt nicht die Originaltaste.</td></tr>
                    <tr><td><code>*space::MsgBox "Space"</code></td><td class="text-[var(--text-muted)]">* Wildcard – feuert auch mit Modifikatoren.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Syntax</th><th>Meaning</th></tr>
                    <tr><td><code>F1::MsgBox "Hello"</code></td><td class="text-[var(--text-muted)]">Single-line hotkey – works without braces.</td></tr>
                    <tr><td><code>F1:: { MsgBox "Hello" }</code></td><td class="text-[var(--text-muted)]">Multi-line hotkey – braces required.</td></tr>
                    <tr><td><code>#e::Run "explorer.exe"</code></td><td class="text-[var(--text-muted)]">Windows+E.</td></tr>
                    <tr><td><code>^!s::MsgBox "Ctrl+Alt+S"</code></td><td class="text-[var(--text-muted)]">Ctrl+Alt+S.</td></tr>
                    <tr><td><code>~a::MsgBox "a pressed"</code></td><td class="text-[var(--text-muted)]">~ does not suppress the original key.</td></tr>
                    <tr><td><code>*space::MsgBox "Space"</code></td><td class="text-[var(--text-muted)]">* wildcard – fires with modifiers too.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Hotstrings (Text-Expansion)',
                    titleEn: 'Hotstrings (Text Expansion)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Grundlegende Hotstrings:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">; Einfache Expansion
::btw::by the way

; Mit Optionen: keine Endung nötig
:*:sig::Mit freundlichen Grüßen

; Case-insensitive
:c:hotkey::Hotkey

; Innerhalb von Wörtern (z.B. nach "(")
:?:temp::temperature</pre>
                    </div>
                    <p class="mt-3"><strong>Wichtige Optionen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><code>*</code> – kein Endzeichen (Space, Enter) erforderlich.</li>
                    <li><code>?</code> – Expansion auch innerhalb von Wörtern.</li>
                    <li><code>c</code> – case-insensitive Matching.</li>
                    <li><code>o</code> – ommittiert das Endzeichen (kein Space nach Expansion).</li>
                    </ul>
                    <p class="mt-3">Weitere Details im <a href="https://www.autohotkey.com/docs/v2/Hotstrings.htm" target="_blank" class="topic-link">Hotstrings-Handbuch</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Basic hotstrings:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">; Simple expansion
::btw::by the way

; With options: no ending character needed
:*:sig::Best regards

; Case-insensitive
:c:hotkey::Hotkey

; Inside words (e.g., after "(")
:?:temp::temperature</pre>
                    </div>
                    <p class="mt-3"><strong>Key options:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><code>*</code> – no ending character (Space, Enter) required.</li>
                    <li><code>?</code> – expansion inside words too.</li>
                    <li><code>c</code> – case-insensitive matching.</li>
                    <li><code>o</code> – omits the ending character (no space after expansion).</li>
                    </ul>
                    <p class="mt-3">More details in the <a href="https://www.autohotkey.com/docs/v2/Hotstrings.htm" target="_blank" class="topic-link">Hotstrings manual</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. OBJEKTE ============ */
        {
            id: 'section5',
            titleDe: '5. Objekte & Klassen',
            titleEn: '5. Objects & Classes',
            introDe: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 bietet <strong>volle <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">Objektorientierung</a></strong> mit Klassen, Vererbung, dynamischen Properties und statischen Methoden. Properties mit <code>get</code>/<code>set</code> ermöglichen Validierung und Berechnung beim Lesen oder Schreiben.',
            introEn: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 offers <strong>full <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">object orientation</a></strong> with classes, inheritance, dynamic properties, and static methods. Properties with <code>get</code>/<code>set</code> enable validation and computation on read or write.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Klassen & Properties',
                    titleEn: 'Classes & Properties',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Klasse mit dynamischer Property:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">class Clicker {
    _speed := 10

    Speed {
        get => this._speed
        set => this._speed := value
    }

    DoubleSpeed => this._speed * 2

    Start() {
        MsgBox "Clicking at speed " this._speed
    }
}

; Verwendung
c := Clicker()
c.Speed := 20
MsgBox c.DoubleSpeed  ; 40</pre>
                    </div>
                    <p class="mt-3"><strong>Faustregel für Properties vs. Methoden:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Property:</strong> Wenn es ein Attribut repräsentiert, billig zu lesen ist und keine sichtbaren Seiteneffekte hat.</li>
                    <li><strong>Methode:</strong> Wenn es eine Aktion ist, Seiteneffekte hat oder teuer ist.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Class with dynamic property:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">class Clicker {
    _speed := 10

    Speed {
        get => this._speed
        set => this._speed := value
    }

    DoubleSpeed => this._speed * 2

    Start() {
        MsgBox "Clicking at speed " this._speed
    }
}

; Usage
c := Clicker()
c.Speed := 20
MsgBox c.DoubleSpeed  ; 40</pre>
                    </div>
                    <p class="mt-3"><strong>Rule of thumb for properties vs. methods:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Property:</strong> When it represents an attribute, is cheap to read, and has no visible side effects.</li>
                    <li><strong>Method:</strong> When it's an action, has side effects, or is expensive.</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Statische Members',
                    titleEn: 'Static Members',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Statische Properties & Methoden:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">class Config {
    static Version := "2.0"
    static DebugMode := false

    static ShowInfo() {
        MsgBox "Version " this.Version
    }
}

; Zugriff über die Klasse selbst
Config.ShowInfo()
MsgBox Config.Version</pre>
                    </div>
                    <p class="mt-3">Statische Members gehören zur Klasse, nicht zu Instanzen. Sie werden oft für Konfiguration, Konstanten und Utility-Funktionen verwendet.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Static properties & methods:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">class Config {
    static Version := "2.0"
    static DebugMode := false

    static ShowInfo() {
        MsgBox "Version " this.Version
    }
}

; Access via the class itself
Config.ShowInfo()
MsgBox Config.Version</pre>
                    </div>
                    <p class="mt-3">Static members belong to the class, not to instances. They're often used for configuration, constants, and utility functions.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. KONFIGURATION ============ */
        {
            id: 'section6',
            titleDe: '6. Konfiguration & Performance',
            titleEn: '6. Configuration & Performance',
            introDe: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 bietet verschiedene <strong>Direktiven</strong> zur Konfiguration des Skriptverhaltens sowie <strong>Performance-Optionen</strong> für Send-Befehle und Key-Delays.',
            introEn: '<a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 offers various <strong>directives</strong> for configuring script behavior as well as <strong>performance options</strong> for send commands and key delays.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Wichtige Direktiven',
                    titleEn: 'Key Directives',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Direktive</th><th>Funktion</th></tr>
                    <tr><td><code>#Requires AutoHotkey v2.0</code></td><td class="text-[var(--text-muted)]">Erzwingt v2, Fehler bei falscher Version.</td></tr>
                    <tr><td><code>#SingleInstance Force</code></td><td class="text-[var(--text-muted)]">Ersetzt laufende Instanz automatisch.</td></tr>
                    <tr><td><code>#NoTrayIcon</code></td><td class="text-[var(--text-muted)]">Blendet das Tray-Icon aus.</td></tr>
                    <tr><td><code>#HotIf</code></td><td class="text-[var(--text-muted)]">Kontextabhängige Hotkeys (z.B. nur in bestimmten Programmen).</td></tr>
                    <tr><td><code>Persistent</code></td><td class="text-[var(--text-muted)]">Hält das Skript am Leben, auch ohne Hotkeys.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Directive</th><th>Function</th></tr>
                    <tr><td><code>#Requires AutoHotkey v2.0</code></td><td class="text-[var(--text-muted)]">Enforces v2, errors on wrong version.</td></tr>
                    <tr><td><code>#SingleInstance Force</code></td><td class="text-[var(--text-muted)]">Automatically replaces running instance.</td></tr>
                    <tr><td><code>#NoTrayIcon</code></td><td class="text-[var(--text-muted)]">Hides the tray icon.</td></tr>
                    <tr><td><code>#HotIf</code></td><td class="text-[var(--text-muted)]">Context-sensitive hotkeys (e.g., only in specific programs).</td></tr>
                    <tr><td><code>Persistent</code></td><td class="text-[var(--text-muted)]">Keeps script alive even without hotkeys.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Send-Modi & Performance',
                    titleEn: 'Send Modes & Performance',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Modus</th><th>Beschreibung</th></tr>
                    <tr><td><strong>SendInput</strong></td><td class="text-[var(--text-muted)]">Standard in v2. Schnellste Methode für Tastatureingaben. Umgeht teilweise Keyboard-Hooks.</td></tr>
                    <tr><td><strong>SendEvent</strong></td><td class="text-[var(--text-muted)]">Zuverlässiger bei Problemen mit SendInput. Langsamer, aber kompatibler.</td></tr>
                    <tr><td><strong>SendText</strong></td><td class="text-[var(--text-muted)]">Sendet Text als einzelne Zeichen. Nützlich für Sonderzeichen.</td></tr>
                    <tr><td><strong>SendPlay</strong></td><td class="text-[var(--text-muted)]">Umgeht Keyboard-Hooks vollständig. Nur für spezielle Fälle.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tipp:</strong> Bei großen Textmengen ist Clipboard-Paste (<code>A_Clipboard</code> + <code>Send "^v"</code>) oft schneller und zuverlässiger als zeichenweises Senden. Siehe <a href="https://www.autohotkey.com/docs/v2/lib/Send.htm" target="_blank" class="topic-link">Send-Dokumentation</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Mode</th><th>Description</th></tr>
                    <tr><td><strong>SendInput</strong></td><td class="text-[var(--text-muted)]">Default in v2. Fastest method for keyboard input. Bypasses keyboard hooks partially.</td></tr>
                    <tr><td><strong>SendEvent</strong></td><td class="text-[var(--text-muted)]">More reliable when SendInput has issues. Slower but more compatible.</td></tr>
                    <tr><td><strong>SendText</strong></td><td class="text-[var(--text-muted)]">Sends text as individual characters. Useful for special characters.</td></tr>
                    <tr><td><strong>SendPlay</strong></td><td class="text-[var(--text-muted)]">Bypasses keyboard hooks entirely. For special cases only.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Tip:</strong> For large amounts of text, clipboard-paste (<code>A_Clipboard</code> + <code>Send "^v"</code>) is often faster and more reliable than character-by-character sending. See the <a href="https://www.autohotkey.com/docs/v2/lib/Send.htm" target="_blank" class="topic-link">Send documentation</a>.</p>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://www.autohotkey.com/" target="_blank" class="topic-link">AutoHotkey</a> v2 aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-keyboard opacity-70"></i><span>1. Expression-basiert</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Alles ist ein Ausdruck. Strings in Anführungszeichen, Funktionen mit Klammern. Keine Legacy-Befehle mehr.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield opacity-70"></i><span>2. Strenge Fehlerbehandlung</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Try/Catch mit <a href="https://en.wikipedia.org/wiki/Exception_handling" target="_blank" class="topic-link">Exceptions</a> statt ErrorLevel. Variablen müssen initialisiert werden. Weniger stille Fehler.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cube opacity-70"></i><span>3. Volle OOP</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Klassen, Vererbung, Properties mit get/set, statische Members. Moderne <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">Objektorientierung</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-windows opacity-70"></i><span>4. Windows-only</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Native <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-APIs. Keine Linux/macOS-Version. Alternativen: <a href="https://github.com/autokey/autokey" target="_blank" class="topic-link">AutoKey</a> (X11), <a href="https://espanso.org/" target="_blank" class="topic-link">Espanso</a> (Cross-Platform).</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-keyboard opacity-70"></i><span>1. Expression-based</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Everything is an expression. Strings in quotes, functions with parentheses. No legacy commands.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield opacity-70"></i><span>2. Strict Error Handling</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Try/Catch with <a href="https://en.wikipedia.org/wiki/Exception_handling" target="_blank" class="topic-link">exceptions</a> instead of ErrorLevel. Variables must be initialized. Fewer silent errors.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cube opacity-70"></i><span>3. Full OOP</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Classes, inheritance, properties with get/set, static members. Modern <a href="https://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank" class="topic-link">object orientation</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-windows opacity-70"></i><span>4. Windows-only</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Native <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> APIs. No Linux/macOS version. Alternatives: <a href="https://github.com/autokey/autokey" target="_blank" class="topic-link">AutoKey</a> (X11), <a href="https://espanso.org/" target="_blank" class="topic-link">Espanso</a> (cross-platform).</p>
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
            { icon: 'fa-globe',    href: 'https://www.autohotkey.com/docs/v2/',                        target: '_blank', labelDe: 'Offizielle Dokumentation', labelEn: 'Official Documentation' },
            { icon: 'fa-download', href: 'https://www.autohotkey.com/',                                target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-github',   href: 'https://github.com/AutoHotkey/AutoHotkey',                   target: '_blank', labelDe: 'GitHub Repository',         labelEn: 'GitHub Repository' },
            { icon: 'fa-book',     href: 'https://www.autohotkey.com/docs/v2/v2-changes.htm',          target: '_blank', labelDe: 'v1 zu v2 Änderungen',       labelEn: 'v1 to v2 Changes' },
            { icon: 'fa-comments', href: 'https://www.autohotkey.com/boards/',                         target: '_blank', labelDe: 'Community Forum',           labelEn: 'Community Forum' }
        ]
    },

    footer: {
        textDe: 'AutoHotkey v2 Referenz · v1.0 · Dual Lang',
        textEn: 'AutoHotkey v2 Reference · v1.0 · Dual Lang'
    }
});