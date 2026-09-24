// resources/topics/topic_notepad.js
// Registers the Notepad++ text editor reference topic. Loaded via <script> injection.

/* ==================================================================
   NOTEPAD++ CODE-BLOCK COPY CONTROLLER
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
    id: 'Notepad++ Overview',
    icon: 'fa-file-code',
    titleDe: 'Notepad++',
    titleEn: 'Notepad++',
    descDe: 'Quelloffener Text- und Code-Editor für Windows',
    descEn: 'Open-Source Text and Code Editor for Windows',

    sidebarTitleDe: 'Notepad++',
    sidebarTitleEn: 'Notepad++',
    sidebarSubtitleDe: 'Der Klassiker unter den Code-Editoren',
    sidebarSubtitleEn: 'The Classic Among Code Editors',
    sidebarVersion: 'v8.9+',

    hero: {
        titleDe: 'Notepad++: Der freie Code-Editor für Windows',
        titleEn: 'Notepad++: The Free Code Editor for Windows',
        introDe: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> ist ein <strong>kostenloser, quelloffener <a href="https://en.wikipedia.org/wiki/Text_editor" target="_blank" class="topic-link">Text- und Quellcode-Editor</a> für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong>, der seit 2003 aktiv entwickelt wird. Basierend auf der <a href="https://www.scintilla.org/" target="_blank" class="topic-link">Scintilla</a>-Komponente bietet er Syntax-Hervorhebung für über 80 Sprachen, Tab-basiertes Editing, Makro-Aufzeichnung und eine riesige Plugin-Community. <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Zur offiziellen Website</a>.',
        introEn: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> is a <strong>free, open-source <a href="https://en.wikipedia.org/wiki/Text_editor" target="_blank" class="topic-link">text and source code editor</a> for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong>, actively developed since 2003. Based on the <a href="https://www.scintilla.org/" target="_blank" class="topic-link">Scintilla</a> component, it offers syntax highlighting for over 80 languages, tabbed editing, macro recording, and a huge plugin community. <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Visit the official website</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-terminal',          href: '#section3', switchToDoc: true, labelDe: 'CLI-Argumente',  labelEn: 'CLI Arguments' },
        { icon: 'fa-puzzle-piece',      href: '#section4', switchToDoc: true, labelDe: 'Plugins',        labelEn: 'Plugins' },
        { icon: 'fa-code',              href: '#section5', switchToDoc: true, labelDe: 'Funktionen',     labelEn: 'Features' },
        { icon: 'fa-cog',               href: '#section6', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://notepad-plus-plus.org/', target: '_blank', labelDe: 'Offizielle Website', labelEn: 'Official Website' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Geschichte',
            titleEn: '1. Overview & History',
            introDe: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> wurde von <strong>Don Ho</strong> im September 2003 entwickelt und ist seitdem einer der beliebtesten Code-Editoren für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>. Der Name leitet sich vom <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank" class="topic-link">C</a>-Inkrement-Operator <code>++</code> ab. Die Software wurde über 28 Millionen Mal von <a href="https://sourceforge.net/projects/notepad-plus/" target="_blank" class="topic-link">SourceForge</a> heruntergeladen und zweimal mit dem SourceForge Community Choice Award ausgezeichnet. Die <a href="https://npp-user-manual.org/" target="_blank" class="topic-link">offizielle Benutzerdokumentation</a> wird kollaborativ gepflegt und deckt alle Versionen ab.',
            introEn: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> was developed by <strong>Don Ho</strong> in September 2003 and has since become one of the most popular code editors for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>. The name derives from the <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank" class="topic-link">C</a> increment operator <code>++</code>. The software has been downloaded over 28 million times from <a href="https://sourceforge.net/projects/notepad-plus/" target="_blank" class="topic-link">SourceForge</a> and has twice won the SourceForge Community Choice Award. The <a href="https://npp-user-manual.org/" target="_blank" class="topic-link">official user manual</a> is maintained collaboratively and covers all versions.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Notepad++?',
                    titleEn: 'What is Notepad++?',
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
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Quelloffener Text- und Quellcode-Editor.</td></tr>
                    <tr><td><strong>Plattform</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (nativ). Linux/macOS via <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> oder <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a>.</td></tr>
                    <tr><td><strong>Basis</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.scintilla.org/" target="_blank" class="topic-link">Scintilla</a>-Editor-Komponente, <a href="https://en.wikipedia.org/wiki/C%2B%2B" target="_blank" class="topic-link">C++</a> mit <a href="https://en.wikipedia.org/wiki/Windows_API" target="_blank" class="topic-link">Win32 API</a>.</td></tr>
                    <tr><td><strong>Lizenz</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" class="topic-link">GPLv3</a> – vollständig frei und quelloffen.</td></tr>
                    <tr><td><strong>Sprachen</strong></td><td class="text-[var(--text-muted)]">Syntax-Hervorhebung für über 80 Programmiersprachen.</td></tr>
                    <tr><td><strong>Erweiterbarkeit</strong></td><td class="text-[var(--text-muted)]">Plugin-System mit hunderten Erweiterungen. Die <a href="https://github.com/sitedata/nppPluginList" target="_blank" class="topic-link">offizielle Plugin-Liste</a> wird im <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a>-Format bereitgestellt.</td></tr>
                    <tr><td><strong>Aktuelle Version</strong></td><td class="text-[var(--text-muted)]">v8.9.6.4 (Juni 2026). Siehe <a href="https://notepad-plus-plus.org/downloads/" target="_blank" class="topic-link">offizielle Downloads</a>.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Open-source text and source code editor.</td></tr>
                    <tr><td><strong>Platform</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (native). Linux/macOS via <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> or <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a>.</td></tr>
                    <tr><td><strong>Basis</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.scintilla.org/" target="_blank" class="topic-link">Scintilla</a> editor component, <a href="https://en.wikipedia.org/wiki/C%2B%2B" target="_blank" class="topic-link">C++</a> with <a href="https://en.wikipedia.org/wiki/Windows_API" target="_blank" class="topic-link">Win32 API</a>.</td></tr>
                    <tr><td><strong>License</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" class="topic-link">GPLv3</a> – fully free and open source.</td></tr>
                    <tr><td><strong>Languages</strong></td><td class="text-[var(--text-muted)]">Syntax highlighting for over 80 programming languages.</td></tr>
                    <tr><td><strong>Extensibility</strong></td><td class="text-[var(--text-muted)]">Plugin system with hundreds of extensions. The <a href="https://github.com/sitedata/nppPluginList" target="_blank" class="topic-link">official plugin list</a> is provided in <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a> format.</td></tr>
                    <tr><td><strong>Current version</strong></td><td class="text-[var(--text-muted)]">v8.9.6.4 (June 2026). See <a href="https://notepad-plus-plus.org/downloads/" target="_blank" class="topic-link">official downloads</a>.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Notepad++ vs. VS Code vs. Sublime Text',
                    titleEn: 'Notepad++ vs. VS Code vs. Sublime Text',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/4"><a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a></th><th class="w-1/4"><a href="https://code.visualstudio.com/" target="_blank" class="topic-link">VS Code</a></th><th class="w-1/4"><a href="https://www.sublimetext.com/" target="_blank" class="topic-link">Sublime Text</a></th></tr>
                    <tr><td><strong>Plattform</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (nativ)</td><td class="text-[var(--text-muted)]">Alle</td><td class="text-[var(--text-muted)]">Alle</td></tr>
                    <tr><td><strong>Preis</strong></td><td class="text-[var(--text-muted)]">Kostenlos</td><td class="text-[var(--text-muted)]">Kostenlos</td><td class="text-[var(--text-muted)]">$99 (unbegrenzt testbar)</td></tr>
                    <tr><td><strong>Ressourcen</strong></td><td class="text-[var(--text-muted)]">Sehr gering</td><td class="text-[var(--text-muted)]">Hoch (<a href="https://www.electronjs.org/" target="_blank" class="topic-link">Electron</a>)</td><td class="text-[var(--text-muted)]">Gering</td></tr>
                    <tr><td><strong>Sprachen</strong></td><td class="text-[var(--text-muted)]">80+ (eingebaut)</td><td class="text-[var(--text-muted)]">Hunderte (Extensions)</td><td class="text-[var(--text-muted)]">Hunderte (Packages)</td></tr>
                    <tr><td><strong>Plugins</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/C%2B%2B" target="_blank" class="topic-link">C++</a>/<a href="https://en.wikipedia.org/wiki/Dynamic-link_library" target="_blank" class="topic-link">DLL</a>-basiert</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JS</a>/<a href="https://www.typescriptlang.org/" target="_blank" class="topic-link">TS</a>-basiert</td><td class="text-[var(--text-muted)]"><a href="https://www.python.org/" target="_blank" class="topic-link">Python</a>-basiert</td></tr>
                    <tr><td><strong>Lernkurve</strong></td><td class="text-[var(--text-muted)]">Sehr niedrig</td><td class="text-[var(--text-muted)]">Mittel</td><td class="text-[var(--text-muted)]">Mittel</td></tr>
                    <tr><td><strong>IDE-Funktionen</strong></td><td class="text-[var(--text-muted)]">Begrenzt</td><td class="text-[var(--text-muted)]">Umfangreich</td><td class="text-[var(--text-muted)]">Mittel</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> ist ideal für schnelles Bearbeiten, Log-Analyse und ressourcenschonendes Arbeiten. <a href="https://code.visualstudio.com/" target="_blank" class="topic-link">VS Code</a> und <a href="https://www.sublimetext.com/" target="_blank" class="topic-link">Sublime Text</a> bieten mehr IDE-Funktionen für größere Projekte.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/4"><a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a></th><th class="w-1/4"><a href="https://code.visualstudio.com/" target="_blank" class="topic-link">VS Code</a></th><th class="w-1/4"><a href="https://www.sublimetext.com/" target="_blank" class="topic-link">Sublime Text</a></th></tr>
                    <tr><td><strong>Platform</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (native)</td><td class="text-[var(--text-muted)]">All</td><td class="text-[var(--text-muted)]">All</td></tr>
                    <tr><td><strong>Price</strong></td><td class="text-[var(--text-muted)]">Free</td><td class="text-[var(--text-muted)]">Free</td><td class="text-[var(--text-muted)]">$99 (unlimited trial)</td></tr>
                    <tr><td><strong>Resources</strong></td><td class="text-[var(--text-muted)]">Very low</td><td class="text-[var(--text-muted)]">High (<a href="https://www.electronjs.org/" target="_blank" class="topic-link">Electron</a>)</td><td class="text-[var(--text-muted)]">Low</td></tr>
                    <tr><td><strong>Languages</strong></td><td class="text-[var(--text-muted)]">80+ (built-in)</td><td class="text-[var(--text-muted)]">Hundreds (extensions)</td><td class="text-[var(--text-muted)]">Hundreds (packages)</td></tr>
                    <tr><td><strong>Plugins</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/C%2B%2B" target="_blank" class="topic-link">C++</a>/<a href="https://en.wikipedia.org/wiki/Dynamic-link_library" target="_blank" class="topic-link">DLL</a>-based</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" class="topic-link">JS</a>/<a href="https://www.typescriptlang.org/" target="_blank" class="topic-link">TS</a>-based</td><td class="text-[var(--text-muted)]"><a href="https://www.python.org/" target="_blank" class="topic-link">Python</a>-based</td></tr>
                    <tr><td><strong>Learning curve</strong></td><td class="text-[var(--text-muted)]">Very low</td><td class="text-[var(--text-muted)]">Medium</td><td class="text-[var(--text-muted)]">Medium</td></tr>
                    <tr><td><strong>IDE features</strong></td><td class="text-[var(--text-muted)]">Limited</td><td class="text-[var(--text-muted)]">Extensive</td><td class="text-[var(--text-muted)]">Medium</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> is ideal for quick editing, log analysis, and resource-efficient work. <a href="https://code.visualstudio.com/" target="_blank" class="topic-link">VS Code</a> and <a href="https://www.sublimetext.com/" target="_blank" class="topic-link">Sublime Text</a> offer more IDE features for larger projects.</p>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> ist ausschließlich für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> verfügbar. Die Installation erfolgt über den <a href="https://notepad-plus-plus.org/downloads/" target="_blank" class="topic-link">offiziellen Installer</a> oder portable Varianten. Unter <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> kann <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> über <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> oder <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a> genutzt werden.',
            introEn: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> is available exclusively for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>. Installation is done via the <a href="https://notepad-plus-plus.org/downloads/" target="_blank" class="topic-link">official installer</a> or portable versions. On <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> can be used via <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> or <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a>.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Methode</th></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Offizieller Installer (.exe) von <a href="https://notepad-plus-plus.org/downloads/" target="_blank" class="topic-link">notepad-plus-plus.org</a>. x64, x86 und <a href="https://en.wikipedia.org/wiki/AArch64" target="_blank" class="topic-link">ARM64</a> verfügbar.</td></tr>
                    <tr><td><strong>Windows (Portable)</strong></td><td class="text-[var(--text-muted)]">ZIP-Download, keine Installation nötig. Ideal für USB-Sticks.</td></tr>
                    <tr><td><strong>Windows (Scoop)</strong></td><td class="text-[var(--text-muted)]"><code>scoop install notepadplusplus</code> via <a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a></td></tr>
                    <tr><td><strong>Windows (Chocolatey)</strong></td><td class="text-[var(--text-muted)]"><code>choco install notepadplusplus</code> via <a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a></td></tr>
                    <tr><td><strong>Linux (Snap)</strong></td><td class="text-[var(--text-muted)]"><code>sudo snap install notepad-plus-plus</code> via <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snapcraft</a></td></tr>
                    <tr><td><strong>Linux (Wine)</strong></td><td class="text-[var(--text-muted)]">Windows-Installer unter <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> ausführen.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Method</th></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Official installer (.exe) from <a href="https://notepad-plus-plus.org/downloads/" target="_blank" class="topic-link">notepad-plus-plus.org</a>. x64, x86, and <a href="https://en.wikipedia.org/wiki/AArch64" target="_blank" class="topic-link">ARM64</a> available.</td></tr>
                    <tr><td><strong>Windows (Portable)</strong></td><td class="text-[var(--text-muted)]">ZIP download, no installation required. Ideal for USB sticks.</td></tr>
                    <tr><td><strong>Windows (Scoop)</strong></td><td class="text-[var(--text-muted)]"><code>scoop install notepadplusplus</code> via <a href="https://scoop.sh/" target="_blank" class="topic-link">Scoop</a></td></tr>
                    <tr><td><strong>Windows (Chocolatey)</strong></td><td class="text-[var(--text-muted)]"><code>choco install notepadplusplus</code> via <a href="https://chocolatey.org/" target="_blank" class="topic-link">Chocolatey</a></td></tr>
                    <tr><td><strong>Linux (Snap)</strong></td><td class="text-[var(--text-muted)]"><code>sudo snap install notepad-plus-plus</code> via <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snapcraft</a></td></tr>
                    <tr><td><strong>Linux (Wine)</strong></td><td class="text-[var(--text-muted)]">Run Windows installer under <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a>.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Linux-Installation via Snap',
                    titleEn: 'Linux Installation via Snap',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong><a href="https://snapcraft.io/" target="_blank" class="topic-link">Snap</a> installieren und <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> einrichten:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Snapd installieren (falls nicht vorhanden)
sudo apt install snapd

# Snapd aktivieren
sudo systemctl enable --now snapd.socket

# Notepad++ installieren
sudo snap install notepad-plus-plus

# Starten
notepad-plus-plus</pre>
                    </div>
                    <p class="mt-3">Nach der Installation ist <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> über das Anwendungsmenü oder den Befehl <code>notepad-plus-plus</code> startbar. Plugins werden im <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a>-Verzeichnis gespeichert. Weitere Details auf <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snapcraft</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Install <a href="https://snapcraft.io/" target="_blank" class="topic-link">Snap</a> and set up <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Install snapd (if not present)
sudo apt install snapd

# Enable snapd
sudo systemctl enable --now snapd.socket

# Install Notepad++
sudo snap install notepad-plus-plus

# Launch
notepad-plus-plus</pre>
                    </div>
                    <p class="mt-3">After installation, <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> is available via the application menu or the <code>notepad-plus-plus</code> command. Plugins are stored in the <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a> directory. More details on <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snapcraft</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. CLI-ARGUMENTE ============ */
        {
            id: 'section3',
            titleDe: '3. Kommandozeilen-Argumente',
            titleEn: '3. Command Line Arguments',
            introDe: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> unterstützt eine Vielzahl von <a href="https://en.wikipedia.org/wiki/Command-line_interface" target="_blank" class="topic-link">Kommandozeilen</a>-Argumenten zur Steuerung des Startverhaltens. Die Argumente sind case-sensitive und können mit Dateipfaden kombiniert werden. Die vollständige Liste finden Sie im <a href="https://npp-user-manual.org/docs/command-prompt/" target="_blank" class="topic-link">offiziellen Benutzerhandbuch</a>.',
            introEn: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> supports a variety of <a href="https://en.wikipedia.org/wiki/Command-line_interface" target="_blank" class="topic-link">command line</a> arguments to control startup behavior. Arguments are case-sensitive and can be combined with file paths. See the <a href="https://npp-user-manual.org/docs/command-prompt/" target="_blank" class="topic-link">official user manual</a> for the full list.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Häufige Argumente',
                    titleEn: 'Common Arguments',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Argument</th><th>Beschreibung</th></tr>
                    <tr><td><code>-multiInst</code></td><td class="text-[var(--text-muted)]">Startet eine weitere <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>-Instanz.</td></tr>
                    <tr><td><code>-noPlugin</code></td><td class="text-[var(--text-muted)]">Startet ohne Plugins zu laden.</td></tr>
                    <tr><td><code>-l&lt;Language&gt;</code></td><td class="text-[var(--text-muted)]">Öffnet Datei mit Syntax-Hervorhebung für die Sprache (z.B. <code>-lphp</code> für <a href="https://www.php.net/" target="_blank" class="topic-link">PHP</a>).</td></tr>
                    <tr><td><code>-n&lt;line&gt;</code></td><td class="text-[var(--text-muted)]">Scrollt zur angegebenen Zeilennummer.</td></tr>
                    <tr><td><code>-c&lt;column&gt;</code></td><td class="text-[var(--text-muted)]">Scrollt zur angegebenen Spalte.</td></tr>
                    <tr><td><code>-nosession</code></td><td class="text-[var(--text-muted)]">Startet ohne vorherige Sitzung wiederherzustellen.</td></tr>
                    <tr><td><code>-notabbar</code></td><td class="text-[var(--text-muted)]">Startet ohne Tab-Leiste.</td></tr>
                    <tr><td><code>-ro</code></td><td class="text-[var(--text-muted)]">Öffnet die Datei schreibgeschützt.</td></tr>
                    <tr><td><code>-fullReadOnly</code></td><td class="text-[var(--text-muted)]">Öffnet alle Dateien schreibgeschützt (Speichern erlaubt).</td></tr>
                    <tr><td><code>-alwaysOnTop</code></td><td class="text-[var(--text-muted)]">Fenster bleibt immer im Vordergrund.</td></tr>
                    <tr><td><code>-monitor</code></td><td class="text-[var(--text-muted)]">Öffnet Datei mit Dateiüberwachung.</td></tr>
                    <tr><td><code>-loadingTime</code></td><td class="text-[var(--text-muted)]">Zeigt die Ladezeit an.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Argument</th><th>Description</th></tr>
                    <tr><td><code>-multiInst</code></td><td class="text-[var(--text-muted)]">Launches another <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> instance.</td></tr>
                    <tr><td><code>-noPlugin</code></td><td class="text-[var(--text-muted)]">Launches without loading plugins.</td></tr>
                    <tr><td><code>-l&lt;Language&gt;</code></td><td class="text-[var(--text-muted)]">Opens file with syntax highlighting for the language (e.g., <code>-lphp</code> for <a href="https://www.php.net/" target="_blank" class="topic-link">PHP</a>).</td></tr>
                    <tr><td><code>-n&lt;line&gt;</code></td><td class="text-[var(--text-muted)]">Scrolls to the specified line number.</td></tr>
                    <tr><td><code>-c&lt;column&gt;</code></td><td class="text-[var(--text-muted)]">Scrolls to the specified column.</td></tr>
                    <tr><td><code>-nosession</code></td><td class="text-[var(--text-muted)]">Starts without restoring previous session.</td></tr>
                    <tr><td><code>-notabbar</code></td><td class="text-[var(--text-muted)]">Starts without tab bar.</td></tr>
                    <tr><td><code>-ro</code></td><td class="text-[var(--text-muted)]">Opens the file read-only.</td></tr>
                    <tr><td><code>-fullReadOnly</code></td><td class="text-[var(--text-muted)]">Opens all files read-only (saving allowed).</td></tr>
                    <tr><td><code>-alwaysOnTop</code></td><td class="text-[var(--text-muted)]">Window always stays on top.</td></tr>
                    <tr><td><code>-monitor</code></td><td class="text-[var(--text-muted)]">Opens file with file monitoring enabled.</td></tr>
                    <tr><td><code>-loadingTime</code></td><td class="text-[var(--text-muted)]">Displays loading time.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Praktische Beispiele',
                    titleEn: 'Practical Examples',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong><a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> über die Kommandozeile starten:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Datei mit PHP-Syntax hervorheben
notepad++ -lphp C:\\projekt\\index.php

# Datei schreibgeschützt öffnen, Zeile 42
notepad++ -ro -n42 C:\\logs\\app.log

# Ohne Session und ohne Plugins (schneller Start)
notepad++ -nosession -noPlugin

# Portabel starten mit eigenem Settings-Ordner
notepad++ -settingsDir="D:\\NPP_Config"</pre>
                    </div>
                    <p class="mt-3"><strong>Tipp:</strong> Die <code>-loadingTime</code>-Option zeigt an, wie lange <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> zum Starten gebraucht hat – nützlich zur Fehlersuche bei langsamen Startzeiten. Weitere Beispiele im <a href="https://npp-user-manual.org/docs/command-prompt/" target="_blank" class="topic-link">offiziellen Handbuch</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Launch <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> from the command line:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># Open file with PHP syntax highlighting
notepad++ -lphp C:\\project\\index.php

# Open file read-only, line 42
notepad++ -ro -n42 C:\\logs\\app.log

# Without session and plugins (faster start)
notepad++ -nosession -noPlugin

# Portable start with custom settings folder
notepad++ -settingsDir="D:\\NPP_Config"</pre>
                    </div>
                    <p class="mt-3"><strong>Tip:</strong> The <code>-loadingTime</code> option shows how long <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> took to start – useful for troubleshooting slow startup times. More examples in the <a href="https://npp-user-manual.org/docs/command-prompt/" target="_blank" class="topic-link">official manual</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. PLUGINS ============ */
        {
            id: 'section4',
            titleDe: '4. Plugins & Erweiterungen',
            titleEn: '4. Plugins & Extensions',
            introDe: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> verfügt über ein umfangreiches Plugin-System. Plugins können über den eingebauten <a href="https://npp-user-manual.org/docs/plugins/" target="_blank" class="topic-link">Plugin-Manager</a> oder manuell installiert werden. Die <a href="https://github.com/sitedata/nppPluginList" target="_blank" class="topic-link">offizielle Plugin-Liste</a> wird im <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a>-Format bereitgestellt.',
            introEn: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> has an extensive plugin system. Plugins can be installed via the built-in <a href="https://npp-user-manual.org/docs/plugins/" target="_blank" class="topic-link">plugin manager</a> or manually. The <a href="https://github.com/sitedata/nppPluginList" target="_blank" class="topic-link">official plugin list</a> is provided in <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a> format.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Beliebte Plugins',
                    titleEn: 'Popular Plugins',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Funktion</th></tr>
                    <tr><td><strong><a href="https://github.com/pnedev/comparePlus" target="_blank" class="topic-link">ComparePlus</a></strong></td><td class="text-[var(--text-muted)]">Vergleicht zwei Dateien nebeneinander. Zeigt Unterschiede farblich markiert. Kann auch <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a>/<a href="https://subversion.apache.org/" target="_blank" class="topic-link">SVN</a>-Diffs und Clipboard-Vergleiche.</td></tr>
                    <tr><td><strong><a href="https://github.com/ashkulz/NppFTP" target="_blank" class="topic-link">NppFTP</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/File_Transfer_Protocol" target="_blank" class="topic-link">FTP</a>/<a href="https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol" target="_blank" class="topic-link">SFTP</a>-Client direkt in <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>. Dateien auf Remote-Servern bearbeiten und speichern.</td></tr>
                    <tr><td><strong><a href="https://github.com/NPP-JSONViewer/JSON-Viewer" target="_blank" class="topic-link">JSON Viewer</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a>-Dateien formatieren, validieren und mit Syntax-Hervorhebung anzeigen.</td></tr>
                    <tr><td><strong><a href="https://github.com/nea/MarkdownViewerPlusPlus" target="_blank" class="topic-link">MarkdownViewer++</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a>-Vorschau direkt in <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>.</td></tr>
                    <tr><td><strong><a href="https://github.com/morbac/xmltools" target="_blank" class="topic-link">XML Tools</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/XML" target="_blank" class="topic-link">XML</a>-Formatierung, Validierung und <a href="https://en.wikipedia.org/wiki/XPath" target="_blank" class="topic-link">XPath</a>-Abfragen.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plugin</th><th>Function</th></tr>
                    <tr><td><strong><a href="https://github.com/pnedev/comparePlus" target="_blank" class="topic-link">ComparePlus</a></strong></td><td class="text-[var(--text-muted)]">Compares two files side by side. Shows differences color-coded. Also supports <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a>/<a href="https://subversion.apache.org/" target="_blank" class="topic-link">SVN</a> diffs and clipboard comparison.</td></tr>
                    <tr><td><strong><a href="https://github.com/ashkulz/NppFTP" target="_blank" class="topic-link">NppFTP</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/File_Transfer_Protocol" target="_blank" class="topic-link">FTP</a>/<a href="https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol" target="_blank" class="topic-link">SFTP</a> client directly in <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>. Edit and save files on remote servers.</td></tr>
                    <tr><td><strong><a href="https://github.com/NPP-JSONViewer/JSON-Viewer" target="_blank" class="topic-link">JSON Viewer</a></strong></td><td class="text-[var(--text-muted)]">Format, validate, and display <a href="https://en.wikipedia.org/wiki/JSON" target="_blank" class="topic-link">JSON</a> files with syntax highlighting.</td></tr>
                    <tr><td><strong><a href="https://github.com/nea/MarkdownViewerPlusPlus" target="_blank" class="topic-link">MarkdownViewer++</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" class="topic-link">Markdown</a> preview directly in <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>.</td></tr>
                    <tr><td><strong><a href="https://github.com/morbac/xmltools" target="_blank" class="topic-link">XML Tools</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/XML" target="_blank" class="topic-link">XML</a> formatting, validation, and <a href="https://en.wikipedia.org/wiki/XPath" target="_blank" class="topic-link">XPath</a> queries.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Plugin-Installation',
                    titleEn: 'Plugin Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Methode 1: Plugin-Manager (empfohlen)</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1 mb-3">
                    <li><strong>Plugins → Plugin-Verwaltung → Plugin-Manager anzeigen</strong></li>
                    <li>Im Tab <strong>Available</strong> das gewünschte Plugin auswählen</li>
                    <li><strong>Installieren</strong> klicken und <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> neu starten</li>
                    </ol>
                    <p class="mb-2"><strong>Methode 2: Manuelle Installation</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li>Plugin-ZIP von <a href="https://github.com/sitedata/nppPluginList" target="_blank" class="topic-link">GitHub</a> oder <a href="https://sourceforge.net/projects/notepad-plus/" target="_blank" class="topic-link">SourceForge</a> herunterladen</li>
                    <li>In den Ordner <code>Plugins</code> im <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>-Programmverzeichnis entpacken</li>
                    <li><a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> neu starten</li>
                    </ol>
                    <p class="mt-3"><strong>Wichtig:</strong> Die Plugin-Architektur (32-bit, 64-bit, <a href="https://en.wikipedia.org/wiki/AArch64" target="_blank" class="topic-link">ARM64</a>) muss zur <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>-Version passen. Siehe <a href="https://npp-user-manual.org/docs/plugins/" target="_blank" class="topic-link">Plugin-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Method 1: Plugin Manager (recommended)</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1 mb-3">
                    <li><strong>Plugins → Plugin Admin → Show Plugin Manager</strong></li>
                    <li>In the <strong>Available</strong> tab, select the desired plugin</li>
                    <li>Click <strong>Install</strong> and restart <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a></li>
                    </ol>
                    <p class="mb-2"><strong>Method 2: Manual installation</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li>Download plugin ZIP from <a href="https://github.com/sitedata/nppPluginList" target="_blank" class="topic-link">GitHub</a> or <a href="https://sourceforge.net/projects/notepad-plus/" target="_blank" class="topic-link">SourceForge</a></li>
                    <li>Extract to the <code>Plugins</code> folder in the <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> program directory</li>
                    <li>Restart <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a></li>
                    </ol>
                    <p class="mt-3"><strong>Important:</strong> The plugin architecture (32-bit, 64-bit, <a href="https://en.wikipedia.org/wiki/AArch64" target="_blank" class="topic-link">ARM64</a>) must match the <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> version. See <a href="https://npp-user-manual.org/docs/plugins/" target="_blank" class="topic-link">plugin documentation</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. FUNKTIONEN ============ */
        {
            id: 'section5',
            titleDe: '5. Kernfunktionen',
            titleEn: '5. Core Features',
            introDe: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> bietet eine breite Palette an Funktionen, die es zu einem vielseitigen Werkzeug für Entwickler, Systemadministratoren und Autoren machen. Von Syntax-Hervorhebung über Makro-Aufzeichnung bis hin zu Suchen-und-Ersetzen mit <a href="https://en.wikipedia.org/wiki/Regular_expression" target="_blank" class="topic-link">regulären Ausdrücken</a>.',
            introEn: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> offers a wide range of features that make it a versatile tool for developers, system administrators, and writers. From syntax highlighting to macro recording to search-and-replace with <a href="https://en.wikipedia.org/wiki/Regular_expression" target="_blank" class="topic-link">regular expressions</a>.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Hauptfunktionen',
                    titleEn: 'Main Features',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Funktion</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Syntax-Hervorhebung</strong></td><td class="text-[var(--text-muted)]">Über 80 Sprachen, plus benutzerdefinierte Hervorhebung.</td></tr>
                    <tr><td><strong>Tab-Editing</strong></td><td class="text-[var(--text-muted)]">Mehrere Dateien in Tabs öffnen und wechseln.</td></tr>
                    <tr><td><strong>Split-Screen</strong></td><td class="text-[var(--text-muted)]">Editor horizontal oder vertikal teilen für Vergleich.</td></tr>
                    <tr><td><strong>Makro-Aufzeichnung</strong></td><td class="text-[var(--text-muted)]">Wiederkehrende Aufgaben aufzeichnen und abspielen.</td></tr>
                    <tr><td><strong>RegEx-Suche</strong></td><td class="text-[var(--text-muted)]">Suchen und Ersetzen mit <a href="https://en.wikipedia.org/wiki/Regular_expression" target="_blank" class="topic-link">regulären Ausdrücken</a>.</td></tr>
                    <tr><td><strong>Bookmarks</strong></td><td class="text-[var(--text-muted)]">Zeilen markieren und schnell dorthin springen.</td></tr>
                    <tr><td><strong>Dateiüberwachung</strong></td><td class="text-[var(--text-muted)]">Automatisches Neuladen bei externen Änderungen.</td></tr>
                    <tr><td><strong>Spaltenmodus</strong></td><td class="text-[var(--text-muted)]">Spaltenweise Bearbeitung mehrerer Zeilen.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Description</th></tr>
                    <tr><td><strong>Syntax highlighting</strong></td><td class="text-[var(--text-muted)]">Over 80 languages, plus custom highlighting.</td></tr>
                    <tr><td><strong>Tab editing</strong></td><td class="text-[var(--text-muted)]">Open multiple files in tabs and switch between them.</td></tr>
                    <tr><td><strong>Split-screen</strong></td><td class="text-[var(--text-muted)]">Split editor horizontally or vertically for comparison.</td></tr>
                    <tr><td><strong>Macro recording</strong></td><td class="text-[var(--text-muted)]">Record and replay repetitive tasks.</td></tr>
                    <tr><td><strong>RegEx search</strong></td><td class="text-[var(--text-muted)]">Search and replace with <a href="https://en.wikipedia.org/wiki/Regular_expression" target="_blank" class="topic-link">regular expressions</a>.</td></tr>
                    <tr><td><strong>Bookmarks</strong></td><td class="text-[var(--text-muted)]">Mark lines and jump back to them quickly.</td></tr>
                    <tr><td><strong>File monitoring</strong></td><td class="text-[var(--text-muted)]">Automatic reload on external changes.</td></tr>
                    <tr><td><strong>Column mode</strong></td><td class="text-[var(--text-muted)]">Column-wise editing of multiple lines.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Dateien vergleichen mit ComparePlus',
                    titleEn: 'Comparing Files with ComparePlus',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Dateien vergleichen:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1 mb-3">
                    <li>Beide Dateien in <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> öffnen (je als eigener Tab)</li>
                    <li><strong>Plugins → ComparePlus → Compare</strong> wählen</li>
                    <li>Oder Tastenkombination <code>Strg + Alt + C</code> drücken</li>
                    </ol>
                    <p class="mb-2"><strong>Farbcodes:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><span style="color: #10b981;">Grün</span> – neue/hinzugefügte Zeilen</li>
                    <li><span style="color: #ef4444;">Rot</span> – gelöschte Zeilen</li>
                    <li>Weitere Farben in <strong>Plugins → ComparePlus → Settings</strong> anpassbar</li>
                    </ul>
                    <p class="mt-3"><strong>Erweiterte Funktionen von <a href="https://github.com/pnedev/comparePlus" target="_blank" class="topic-link">ComparePlus</a>:</strong> Nur Unterschiede anzeigen, Auswahl vergleichen, <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a>/<a href="https://subversion.apache.org/" target="_blank" class="topic-link">SVN</a>-Diffs, Clipboard-Vergleich.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Compare files:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1 mb-3">
                    <li>Open both files in <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> (each as its own tab)</li>
                    <li>Select <strong>Plugins → ComparePlus → Compare</strong></li>
                    <li>Or press <code>Ctrl + Alt + C</code></li>
                    </ol>
                    <p class="mb-2"><strong>Color codes:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><span style="color: #10b981;">Green</span> – new/added lines</li>
                    <li><span style="color: #ef4444;">Red</span> – deleted lines</li>
                    <li>Other colors adjustable in <strong>Plugins → ComparePlus → Settings</strong></li>
                    </ul>
                    <p class="mt-3"><strong>Advanced features of <a href="https://github.com/pnedev/comparePlus" target="_blank" class="topic-link">ComparePlus</a>:</strong> Show only differences, compare selections, <a href="https://git-scm.com/" target="_blank" class="topic-link">Git</a>/<a href="https://subversion.apache.org/" target="_blank" class="topic-link">SVN</a> diffs, clipboard comparison.</p>
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
            introDe: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> speichert seine Konfiguration in <a href="https://en.wikipedia.org/wiki/XML" target="_blank" class="topic-link">XML</a>-Dateien. Die Pfade variieren je nach Installationsart (normal, portable, <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a>). Details zu den Konfigurationsdateien finden Sie im <a href="https://npp-user-manual.org/docs/config-files/" target="_blank" class="topic-link">offiziellen Benutzerhandbuch</a>.',
            introEn: '<a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> stores its configuration in <a href="https://en.wikipedia.org/wiki/XML" target="_blank" class="topic-link">XML</a> files. Paths vary depending on installation type (normal, portable, <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a>). Details on configuration files can be found in the <a href="https://npp-user-manual.org/docs/config-files/" target="_blank" class="topic-link">official user manual</a>.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Konfigurationspfade',
                    titleEn: 'Configuration Paths',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Installationsart</th><th>Pfad</th></tr>
                    <tr><td><strong>Windows (normal)</strong></td><td class="text-[var(--text-muted)]"><code>%APPDATA%\\Notepad++\\</code></td></tr>
                    <tr><td><strong>Windows (portable)</strong></td><td class="text-[var(--text-muted)]"><code>&lt;Installationsordner&gt;\\Notepad++\\</code></td></tr>
                    <tr><td><strong>Snap (Linux)</strong></td><td class="text-[var(--text-muted)]"><code>~/snap/notepad-plus-plus/current/.config/</code></td></tr>
                    <tr><td><strong>Wine (Linux)</strong></td><td class="text-[var(--text-muted)]"><code>~/.wine/drive_c/Users/&lt;user&gt;/AppData/Roaming/Notepad++/</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wichtige Konfigurationsdateien:</strong> <code>config.xml</code> (allgemeine Einstellungen), <code>stylers.xml</code> (Syntax-Farben), <code>shortcuts.xml</code> (Tastenkürzel), <code>session.xml</code> (letzte Sitzung). Siehe <a href="https://npp-user-manual.org/docs/config-files/" target="_blank" class="topic-link">Config-Files-Dokumentation</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Installation type</th><th>Path</th></tr>
                    <tr><td><strong>Windows (normal)</strong></td><td class="text-[var(--text-muted)]"><code>%APPDATA%\\Notepad++\\</code></td></tr>
                    <tr><td><strong>Windows (portable)</strong></td><td class="text-[var(--text-muted)]"><code>&lt;install folder&gt;\\Notepad++\\</code></td></tr>
                    <tr><td><strong>Snap (Linux)</strong></td><td class="text-[var(--text-muted)]"><code>~/snap/notepad-plus-plus/current/.config/</code></td></tr>
                    <tr><td><strong>Wine (Linux)</strong></td><td class="text-[var(--text-muted)]"><code>~/.wine/drive_c/Users/&lt;user&gt;/AppData/Roaming/Notepad++/</code></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Key config files:</strong> <code>config.xml</code> (general settings), <code>stylers.xml</code> (syntax colors), <code>shortcuts.xml</code> (keybindings), <code>session.xml</code> (last session). See <a href="https://npp-user-manual.org/docs/config-files/" target="_blank" class="topic-link">config files documentation</a>.</p>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Netzwerkfreigaben & Samba',
                    titleEn: 'Network Shares & Samba',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Problem: Dateiberechtigungen auf <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a>-Freigaben</strong></p>
                    <p class="mb-2">Beim Speichern auf <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a>-Freigaben kann <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> das DOS-Archiv-Attribut setzen, was von <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> standardmäßig in Unix-Ausführungsrechte übersetzt wird. Dadurch können Dateien plötzlich ausführbar werden.</p>
                    <p class="mb-2 mt-3"><strong>Lösung: <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a>-Konfiguration anpassen</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># In /etc/samba/smb.conf, [global] Sektion:
map archive = no</pre>
                    </div>
                    <p class="mt-3">Nach der Änderung <code>sudo systemctl restart smbd</code> ausführen. Das Archiv-Attribut wird dann nicht mehr auf Unix-Rechte abgebildet. Siehe <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf-Manpage</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Issue: File permissions on <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> shares</strong></p>
                    <p class="mb-2">When saving to <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> shares, <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> may set the DOS archive attribute, which <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> by default translates to Unix execute permissions. This can cause files to suddenly become executable.</p>
                    <p class="mb-2 mt-3"><strong>Solution: Adjust <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> configuration</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># In /etc/samba/smb.conf, [global] section:
map archive = no</pre>
                    </div>
                    <p class="mt-3">After the change, run <code>sudo systemctl restart smbd</code>. The archive attribute will then no longer be mapped to Unix permissions. See the <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf manpage</a>.</p>
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
            introDe: 'Die wichtigsten <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://notepad-plus-plus.org/" target="_blank" class="topic-link">Notepad++</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-file-code opacity-70"></i><span>1. Leichtgewichtiger Klassiker</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Seit 2003 aktiv entwickelt. Geringer Ressourcenverbrauch, sofort startklar. Ideal für Logs und schnelles Editing.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>2. Plugin-Ökosystem</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://github.com/pnedev/comparePlus" target="_blank" class="topic-link">ComparePlus</a>, <a href="https://github.com/ashkulz/NppFTP" target="_blank" class="topic-link">NppFTP</a>, <a href="https://github.com/NPP-JSONViewer/JSON-Viewer" target="_blank" class="topic-link">JSON Viewer</a>, <a href="https://github.com/nea/MarkdownViewerPlusPlus" target="_blank" class="topic-link">MarkdownViewer++</a>. Installation über Plugin-Manager oder manuell.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-terminal opacity-70"></i><span>3. CLI-Steuerung</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">-l (Sprache), -n (Zeile), -ro (schreibgeschützt), -nosession. Nützlich für Skripte und Automatisierung.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-windows opacity-70"></i><span>4. Windows-only (nativ)</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Keine native Linux/macOS-Version. Via <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> oder <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a> nutzbar. Für Linux: <a href="https://code.visualstudio.com/" target="_blank" class="topic-link">VS Code</a>, <a href="https://kate-editor.org/" target="_blank" class="topic-link">Kate</a>, <a href="https://www.sublimetext.com/" target="_blank" class="topic-link">Sublime Text</a>.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-file-code opacity-70"></i><span>1. Lightweight Classic</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Actively developed since 2003. Low resource consumption, instantly ready. Ideal for logs and quick editing.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>2. Plugin Ecosystem</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://github.com/pnedev/comparePlus" target="_blank" class="topic-link">ComparePlus</a>, <a href="https://github.com/ashkulz/NppFTP" target="_blank" class="topic-link">NppFTP</a>, <a href="https://github.com/NPP-JSONViewer/JSON-Viewer" target="_blank" class="topic-link">JSON Viewer</a>, <a href="https://github.com/nea/MarkdownViewerPlusPlus" target="_blank" class="topic-link">MarkdownViewer++</a>. Install via plugin manager or manually.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-terminal opacity-70"></i><span>3. CLI Control</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">-l (language), -n (line), -ro (read-only), -nosession. Useful for scripts and automation.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-windows opacity-70"></i><span>4. Windows-only (native)</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">No native Linux/macOS version. Usable via <a href="https://www.winehq.org/" target="_blank" class="topic-link">Wine</a> or <a href="https://snapcraft.io/notepad-plus-plus" target="_blank" class="topic-link">Snap</a>. For Linux: <a href="https://code.visualstudio.com/" target="_blank" class="topic-link">VS Code</a>, <a href="https://kate-editor.org/" target="_blank" class="topic-link">Kate</a>, <a href="https://www.sublimetext.com/" target="_blank" class="topic-link">Sublime Text</a>.</p>
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
            { icon: 'fa-globe',    href: 'https://notepad-plus-plus.org/',                     target: '_blank', labelDe: 'Offizielle Website',        labelEn: 'Official Website' },
            { icon: 'fa-download', href: 'https://notepad-plus-plus.org/downloads/',           target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-book',     href: 'https://npp-user-manual.org/',                       target: '_blank', labelDe: 'Benutzerhandbuch',          labelEn: 'User Manual' },
            { icon: 'fa-github',   href: 'https://github.com/notepad-plus-plus/notepad-plus-plus', target: '_blank', labelDe: 'GitHub Repository',       labelEn: 'GitHub Repository' },
            { icon: 'fa-comments', href: 'https://community.notepad-plus-plus.org/',           target: '_blank', labelDe: 'Community Forum',           labelEn: 'Community Forum' }
        ]
    },

    footer: {
        textDe: 'Notepad++ Referenz · v1.0 · Dual Lang',
        textEn: 'Notepad++ Reference · v1.0 · Dual Lang'
    }
});