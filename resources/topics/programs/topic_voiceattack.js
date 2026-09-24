// resources/topics/topic_voiceattack.js
// Registers the VoiceAttack voice control reference topic. Loaded via <script> injection.

/* ==================================================================
   VOICEATTACK CODE-BLOCK COPY CONTROLLER
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
    id: 'VoiceAttack Overview',
    icon: 'fa-microphone',
    titleDe: 'VoiceAttack',
    titleEn: 'VoiceAttack',
    descDe: 'Sprachsteuerung & Makro-Erstellung für Windows',
    descEn: 'Voice Control & Macro Creation for Windows',

    sidebarTitleDe: 'VoiceAttack',
    sidebarTitleEn: 'VoiceAttack',
    sidebarSubtitleDe: 'Sprachsteuerung für Spiele & Apps',
    sidebarSubtitleEn: 'Voice Control for Games & Apps',
    sidebarVersion: 'v2.x',

    hero: {
        titleDe: 'VoiceAttack: Sprachsteuerung für Windows',
        titleEn: 'VoiceAttack: Voice Control for Windows',
        introDe: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> ist ein <strong>Sprachsteuerungs- und Makro-Erstellungssystem für Windows</strong>, das Ihre Stimme als zusätzlichen Controller für Spiele und Anwendungen nutzt. Mit umfangreichen Skripting-Möglichkeiten können Sie eigene Makros erstellen und praktisch alle Aspekte Ihrer Windows-Erfahrung steuern. <a href="https://voiceattack.com/" target="_blank" class="topic-link">Zur offiziellen Website</a>.',
        introEn: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> is a <strong>voice control and macro creation system for Windows</strong> that uses your voice as an additional controller for games and applications. With comprehensive scripting capabilities, you can create custom macros and control virtually all aspects of your Windows experience. <a href="https://voiceattack.com/" target="_blank" class="topic-link">Visit the official website</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-microphone',        href: '#section3', switchToDoc: true, labelDe: 'Profil & Befehle', labelEn: 'Profile & Commands' },
        { icon: 'fa-bolt',              href: '#section4', switchToDoc: true, labelDe: 'Aktionen',       labelEn: 'Actions' },
        { icon: 'fa-puzzle-piece',      href: '#section5', switchToDoc: true, labelDe: 'VoicePacks',     labelEn: 'VoicePacks' },
        { icon: 'fa-cog',               href: '#section6', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://voiceattack.com/', target: '_blank', labelDe: 'Offizielle Website', labelEn: 'Official Website' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Philosophie',
            titleEn: '1. Overview & Philosophy',
            introDe: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> ist ein <strong>Sprachsteuerungs- und Makro-Erstellungssystem</strong>, das Ihre Stimme als zusätzlichen Controller für Windows-Spiele und -Anwendungen nutzt. Es ist besonders beliebt in der Simulations-Community (<a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a>) und ermöglicht es, komplexe Tastenkombinationen und Makros per Sprachbefehl auszulösen [citation:5].',
            introEn: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> is a <strong>voice control and macro creation system</strong> that uses your voice as an additional controller for Windows games and applications. It is especially popular in the simulation community (<a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a>) and allows complex key combinations and macros to be triggered by voice command [citation:5].',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist VoiceAttack?',
                    titleEn: 'What is VoiceAttack?',
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
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Sprachsteuerungs- und Makro-Erstellungssystem.</td></tr>
                    <tr><td><strong>Plattform</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 10/11 (64-bit) [citation:5].</td></tr>
                    <tr><td><strong>Speech API</strong></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms723627(v=vs.85)" target="_blank" class="topic-link">SAPI</a> (Speech API) – nicht zu verwechseln mit der Windows Speech Recognition App [citation:7].</td></tr>
                    <tr><td><strong>Preis</strong></td><td class="text-[var(--text-muted)]">Demo kostenlos (1 Profil, 20 Befehle). Vollversion ca. 12 $ [citation:3][citation:19].</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Sprachbefehle, Hotkeys, Joystick-Buttons, Makros, Text-to-Speech.</td></tr>
                    <tr><td><strong>Erweiterbarkeit</strong></td><td class="text-[var(--text-muted)]">Plugins, <a href="https://www.hcsvoicepacks.com/" target="_blank" class="topic-link">HCS VoicePacks</a> mit professionellen Sprechern.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Voice control and macro creation system.</td></tr>
                    <tr><td><strong>Platform</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 10/11 (64-bit) [citation:5].</td></tr>
                    <tr><td><strong>Speech API</strong></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms723627(v=vs.85)" target="_blank" class="topic-link">SAPI</a> (Speech API) – not to be confused with the Windows Speech Recognition app [citation:7].</td></tr>
                    <tr><td><strong>Price</strong></td><td class="text-[var(--text-muted)]">Demo free (1 profile, 20 commands). Full version ~$12 [citation:3][citation:19].</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Voice commands, hotkeys, joystick buttons, macros, text-to-speech.</td></tr>
                    <tr><td><strong>Extensibility</strong></td><td class="text-[var(--text-muted)]">Plugins, <a href="https://www.hcsvoicepacks.com/" target="_blank" class="topic-link">HCS VoicePacks</a> with professional voice actors.</td></tr>
                    </table>
                    </div>
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
                    <tr><td><strong>Simulationen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a>, <a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> – komplexe Raumschiff- und Kampfsteuerung per Sprache [citation:4][citation:11].</td></tr>
                    <tr><td><strong>Allgemeine PC-Steuerung</strong></td><td class="text-[var(--text-muted)]">Apps öffnen, Fenster verschieben, Systemfunktionen (Shutdown, Sleep) [citation:15][citation:19].</td></tr>
                    <tr><td><strong>Barrierefreiheit</strong></td><td class="text-[var(--text-muted)]">Steuerung ohne Tastatur/Maus – nützlich bei eingeschränkter Mobilität.</td></tr>
                    <tr><td><strong>Streaming</strong></td><td class="text-[var(--text-muted)]">Szenenwechsel, Chat-Befehle, Sound-Effekte per Sprachbefehl.</td></tr>
                    <tr><td><strong>Produktivität</strong></td><td class="text-[var(--text-muted)]">Makros für wiederkehrende Aufgaben, Textbausteine, Workflow-Automatisierung.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Area</th><th>Description</th></tr>
                    <tr><td><strong>Simulations</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a>, <a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> – complex spaceship and combat control by voice [citation:4][citation:11].</td></tr>
                    <tr><td><strong>General PC control</strong></td><td class="text-[var(--text-muted)]">Open apps, move windows, system functions (shutdown, sleep) [citation:15][citation:19].</td></tr>
                    <tr><td><strong>Accessibility</strong></td><td class="text-[var(--text-muted)]">Control without keyboard/mouse – useful for limited mobility.</td></tr>
                    <tr><td><strong>Streaming</strong></td><td class="text-[var(--text-muted)]">Scene switching, chat commands, sound effects via voice command.</td></tr>
                    <tr><td><strong>Productivity</strong></td><td class="text-[var(--text-muted)]">Macros for repetitive tasks, text snippets, workflow automation.</td></tr>
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
            introDe: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> ist ausschließlich für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (10/11, 64-bit) verfügbar. Die Installation erfolgt über die offizielle Website oder <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>. Eine kostenlose Demo-Version ist verfügbar [citation:3][citation:5].',
            introEn: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> is available exclusively for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> (10/11, 64-bit). Installation is done via the official website or <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>. A free demo version is available [citation:3][citation:5].',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://voiceattack.com/" target="_blank" class="topic-link">Offizielle Website</a></strong></td><td class="text-[var(--text-muted)]">Direkter Download von <a href="https://voiceattack.com/" target="_blank" class="topic-link">voiceattack.com</a>. Kostenlose Demo und Vollversion [citation:19].</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/3046550/VoiceAttack_v2/" target="_blank" class="topic-link">Steam</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/app/3046550/VoiceAttack_v2/" target="_blank" class="topic-link">VoiceAttack v2 auf Steam</a> – Demo kostenlos, Vollversion ca. 12 $ [citation:3].</td></tr>
                    <tr><td><strong><a href="https://www.hcsvoicepacks.com/" target="_blank" class="topic-link">HCS VoicePacks Bundle</a></strong></td><td class="text-[var(--text-muted)]">VoiceAttack ist in vielen VoicePack-Bundles enthalten (z.B. <a href="https://www.hcsvoicepacks.com/collections/first-person-shooters/products/helldivers-starter-pack-1-voiceattack-hux" target="_blank" class="topic-link">Helldivers Ripley</a>, <a href="https://www.hcsvoicepacks.com/products/star-citizen-astra-2-starter-bundle" target="_blank" class="topic-link">Star Citizen Astra</a>) [citation:4][citation:11].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://voiceattack.com/" target="_blank" class="topic-link">Official website</a></strong></td><td class="text-[var(--text-muted)]">Direct download from <a href="https://voiceattack.com/" target="_blank" class="topic-link">voiceattack.com</a>. Free demo and full version [citation:19].</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/3046550/VoiceAttack_v2/" target="_blank" class="topic-link">Steam</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/app/3046550/VoiceAttack_v2/" target="_blank" class="topic-link">VoiceAttack v2 on Steam</a> – demo free, full version ~$12 [citation:3].</td></tr>
                    <tr><td><strong><a href="https://www.hcsvoicepacks.com/" target="_blank" class="topic-link">HCS VoicePacks bundle</a></strong></td><td class="text-[var(--text-muted)]">VoiceAttack is included in many VoicePack bundles (e.g., <a href="https://www.hcsvoicepacks.com/collections/first-person-shooters/products/helldivers-starter-pack-1-voiceattack-hux" target="_blank" class="topic-link">Helldivers Ripley</a>, <a href="https://www.hcsvoicepacks.com/products/star-citizen-astra-2-starter-bundle" target="_blank" class="topic-link">Star Citizen Astra</a>) [citation:4][citation:11].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Demo-Version',
                    titleEn: 'Demo Version',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Funktionsumfang der kostenlosen Demo:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>1 Profil</li>
                    <li>Bis zu 20 Sprachbefehle [citation:19]</li>
                    <li>Alle Kernfunktionen zum Testen</li>
                    </ul>
                    <p class="mt-3"><strong>Tipp:</strong> Die Demo reicht für viele einfache Anwendungsfälle aus (z.B. grundlegende Sprachsteuerung in Spielen). Für komplexe Profile und VoicePacks ist die Vollversion erforderlich [citation:19].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Free demo feature set:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>1 profile</li>
                    <li>Up to 20 voice commands [citation:19]</li>
                    <li>All core features for testing</li>
                    </ul>
                    <p class="mt-3"><strong>Tip:</strong> The demo is sufficient for many simple use cases (e.g., basic voice control in games). For complex profiles and VoicePacks, the full version is required [citation:19].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. PROFILE & BEFEHLE ============ */
        {
            id: 'section3',
            titleDe: '3. Profile & Befehle',
            titleEn: '3. Profiles & Commands',
            introDe: 'Ein <strong>Profil</strong> ist eine Sammlung von Befehlen, die Sie definieren. Jeder Befehl kann durch Sprache, Tastatur-Hotkey, Joystick-Button oder Mausklick ausgelöst werden. Profile können für bestimmte Spiele oder allgemeine Aufgaben erstellt werden [citation:1][citation:2].',
            introEn: 'A <strong>profile</strong> is a collection of commands that you define. Each command can be triggered by voice, keyboard hotkey, joystick button, or mouse click. Profiles can be created for specific games or general tasks [citation:1][citation:2].',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Befehlsauslöser',
                    titleEn: 'Command Triggers',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Auslöser</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Sprache</strong></td><td class="text-[var(--text-muted)]">"When I say..." – Sprachbefehl eingeben. Mehrere Phrasen mit Semikolon trennen: <code>Fire;Open Fire;Fire Weapons</code> [citation:2].</td></tr>
                    <tr><td><strong>Hotkey</strong></td><td class="text-[var(--text-muted)]">Tastenkombination (z.B. <code>Ctrl + M</code>) [citation:2].</td></tr>
                    <tr><td><strong>Joystick</strong></td><td class="text-[var(--text-muted)]">Bis zu zwei Buttons gleichzeitig, auch auf verschiedenen Sticks [citation:8].</td></tr>
                    <tr><td><strong>Maus</strong></td><td class="text-[var(--text-muted)]">Mausklick oder Tastenkombination [citation:2].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Trigger</th><th>Description</th></tr>
                    <tr><td><strong>Voice</strong></td><td class="text-[var(--text-muted)]">"When I say..." – enter voice command. Separate multiple phrases with semicolon: <code>Fire;Open Fire;Fire Weapons</code> [citation:2].</td></tr>
                    <tr><td><strong>Hotkey</strong></td><td class="text-[var(--text-muted)]">Key combination (e.g., <code>Ctrl + M</code>) [citation:2].</td></tr>
                    <tr><td><strong>Joystick</strong></td><td class="text-[var(--text-muted)]">Up to two buttons simultaneously, even on different sticks [citation:8].</td></tr>
                    <tr><td><strong>Mouse</strong></td><td class="text-[var(--text-muted)]">Mouse click or key combination [citation:2].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Dynamische Befehlsabschnitte',
                    titleEn: 'Dynamic Command Sections',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Variationen eines Befehls:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># "Hello computer" oder "Greetings computer"
[Hello;Greetings]computer

# Optionaler Abschnitt (Semikolon am Ende)
[Hello;Greetings]computer[how are you;]

# Numerische Bereiche (z.B. "eject car 1" bis "eject car 100")
eject car [1..100]

# Numerischer Bereich mit Schrittweite (1, 10, 20, ... 100)
[1..100,10]</pre>
                    </div>
                    <p class="mt-3">Dynamische Abschnitte können an beliebiger Stelle im Befehl stehen [citation:2].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Command variations:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner"># "Hello computer" or "Greetings computer"
[Hello;Greetings]computer

# Optional section (semicolon at the end)
[Hello;Greetings]computer[how are you;]

# Numeric ranges (e.g., "eject car 1" to "eject car 100")
eject car [1..100]

# Numeric range with multiplier (1, 10, 20, ... 100)
[1..100,10]</pre>
                    </div>
                    <p class="mt-3">Dynamic sections can be placed anywhere in the command [citation:2].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. AKTIONEN ============ */
        {
            id: 'section4',
            titleDe: '4. Aktionen',
            titleEn: '4. Actions',
            introDe: 'Aktionen sind die Befehle, die <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> ausführt, wenn ein Auslöser erkannt wird. Sie können Tastatureingaben senden, Text-to-Speech ausgeben, Sounds abspielen, Systemfunktionen ausführen und vieles mehr [citation:15][citation:20].',
            introEn: 'Actions are the commands <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> executes when a trigger is recognized. They can send keyboard input, output text-to-speech, play sounds, execute system functions, and much more [citation:15][citation:20].',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Wichtige Aktionen',
                    titleEn: 'Key Actions',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Aktion</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Key Press</strong></td><td class="text-[var(--text-muted)]">Tastatureingabe senden (einzelne Taste oder Kombination).</td></tr>
                    <tr><td><strong>Text-to-Speech</strong></td><td class="text-[var(--text-muted)]">Text vorlesen lassen. Voice, Volume und Rate einstellbar [citation:20].</td></tr>
                    <tr><td><strong>Play a Sound</strong></td><td class="text-[var(--text-muted)]">Sounddatei abspielen (<code>.wav</code>, <code>.mp3</code>, etc.) [citation:20].</td></tr>
                    <tr><td><strong>Set Audio Level</strong></td><td class="text-[var(--text-muted)]">Lautstärke von System, Geräten oder Apps ändern [citation:15].</td></tr>
                    <tr><td><strong>System Actions</strong></td><td class="text-[var(--text-muted)]">Shutdown, Sleep, Restart, Minimize All, Run Dialog, etc. [citation:15].</td></tr>
                    <tr><td><strong>Execute Command</strong></td><td class="text-[var(--text-muted)]">Anderen Befehl per Name ausführen (auch aus anderen Profilen) [citation:16].</td></tr>
                    <tr><td><strong>Variable Set/Get</strong></td><td class="text-[var(--text-muted)]">Text, Integer, Decimal, Boolean oder Small Integer Variablen setzen und lesen [citation:9].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Action</th><th>Description</th></tr>
                    <tr><td><strong>Key Press</strong></td><td class="text-[var(--text-muted)]">Send keyboard input (single key or combination).</td></tr>
                    <tr><td><strong>Text-to-Speech</strong></td><td class="text-[var(--text-muted)]">Read text aloud. Voice, volume, and rate adjustable [citation:20].</td></tr>
                    <tr><td><strong>Play a Sound</strong></td><td class="text-[var(--text-muted)]">Play sound file (<code>.wav</code>, <code>.mp3</code>, etc.) [citation:20].</td></tr>
                    <tr><td><strong>Set Audio Level</strong></td><td class="text-[var(--text-muted)]">Change volume of system, devices, or apps [citation:15].</td></tr>
                    <tr><td><strong>System Actions</strong></td><td class="text-[var(--text-muted)]">Shutdown, Sleep, Restart, Minimize All, Run Dialog, etc. [citation:15].</td></tr>
                    <tr><td><strong>Execute Command</strong></td><td class="text-[var(--text-muted)]">Execute another command by name (even from other profiles) [citation:16].</td></tr>
                    <tr><td><strong>Variable Set/Get</strong></td><td class="text-[var(--text-muted)]">Set and read Text, Integer, Decimal, Boolean, or Small Integer variables [citation:9].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'System-Aktionen',
                    titleEn: 'System Actions',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Verfügbare System-Aktionen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Sleep/Standby</strong> – PC in den Energiesparmodus versetzen [citation:15].</li>
                    <li><strong>Hibernate</strong> – PC in den Ruhezustand versetzen [citation:15].</li>
                    <li><strong>Restart</strong> – PC neu starten (mit/ohne Speichern-Aufforderung) [citation:15].</li>
                    <li><strong>Shutdown</strong> – PC herunterfahren [citation:15].</li>
                    <li><strong>Minimize All</strong> – Alle Fenster minimieren [citation:15].</li>
                    <li><strong>Open Run Dialog</strong> – Windows-Ausführen-Dialog öffnen [citation:15].</li>
                    <li><strong>Release All Keys</strong> – Alle gedrückten Tasten freigeben [citation:15].</li>
                    </ul>
                    <p class="mt-3"><strong>Warnung:</strong> "Force"-Varianten (Force Shutdown, Force Restart) können zu Datenverlust führen [citation:15].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Available system actions:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Sleep/Standby</strong> – Put PC into power-saving mode [citation:15].</li>
                    <li><strong>Hibernate</strong> – Put PC into hibernation [citation:15].</li>
                    <li><strong>Restart</strong> – Reboot PC (with/without save prompt) [citation:15].</li>
                    <li><strong>Shutdown</strong> – Shut down PC [citation:15].</li>
                    <li><strong>Minimize All</strong> – Minimize all windows [citation:15].</li>
                    <li><strong>Open Run Dialog</strong> – Open Windows Run dialog [citation:15].</li>
                    <li><strong>Release All Keys</strong> – Release all held keys [citation:15].</li>
                    </ul>
                    <p class="mt-3"><strong>Warning:</strong> "Force" variants (Force Shutdown, Force Restart) can lead to data loss [citation:15].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. VOICEPACKS ============ */
        {
            id: 'section5',
            titleDe: '5. VoicePacks & HCS Integration',
            titleEn: '5. VoicePacks & HCS Integration',
            introDe: '<a href="https://www.hcsvoicepacks.com/" target="_blank" class="topic-link">HCS VoicePacks</a> sind professionell produzierte Sprachpakete mit tausenden von Antworten, gesprochen von bekannten Synchronsprechern. Sie erweitern <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> um immersive Charaktere für Spiele wie <a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a> und <a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> [citation:4][citation:11].',
            introEn: '<a href="https://www.hcsvoicepacks.com/" target="_blank" class="topic-link">HCS VoicePacks</a> are professionally produced voice packs with thousands of responses, spoken by well-known voice actors. They extend <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> with immersive characters for games like <a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a>, and <a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> [citation:4][citation:11].',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'HCS VoicePacks',
                    titleEn: 'HCS VoicePacks',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">VoicePack</th><th>Spiel & Besonderheit</th></tr>
                    <tr><td><strong><a href="https://www.hcsvoicepacks.com/products/star-citizen-astra-2-starter-bundle" target="_blank" class="topic-link">Astra 2.0</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a> – über 2800 neue Antworten, 10 Jahre Astra-Jubiläum [citation:11].</td></tr>
                    <tr><td><strong><a href="https://www.hcsvoicepacks.com/collections/first-person-shooters/products/helldivers-starter-pack-1-voiceattack-hux" target="_blank" class="topic-link">Lieutenant Ripley</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> – Stratagem-Befehle, Keybind-Reader, Voice Trigger Editor [citation:4].</td></tr>
                    <tr><td><strong><a href="https://shop.app/products/8380322193/alix-performed-by-alix-martin" target="_blank" class="topic-link">Alix</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a> – "Singularity"-Profil für bis zu 7 VoicePacks gleichzeitig [citation:18].</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Eine vollständig lizenzierte <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a>-Version ist für alle VoicePacks erforderlich. Viele Bundles enthalten bereits eine Lizenz [citation:4][citation:11].</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">VoicePack</th><th>Game & Feature</th></tr>
                    <tr><td><strong><a href="https://www.hcsvoicepacks.com/products/star-citizen-astra-2-starter-bundle" target="_blank" class="topic-link">Astra 2.0</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a> – over 2800 new responses, 10-year Astra anniversary [citation:11].</td></tr>
                    <tr><td><strong><a href="https://www.hcsvoicepacks.com/collections/first-person-shooters/products/helldivers-starter-pack-1-voiceattack-hux" target="_blank" class="topic-link">Lieutenant Ripley</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> – Stratagem commands, keybind reader, Voice Trigger Editor [citation:4].</td></tr>
                    <tr><td><strong><a href="https://shop.app/products/8380322193/alix-performed-by-alix-martin" target="_blank" class="topic-link">Alix</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a> – "Singularity" profile for up to 7 VoicePacks simultaneously [citation:18].</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">A fully licensed <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> version is required for all VoicePacks. Many bundles already include a license [citation:4][citation:11].</p>
                    `
                }
            ]
        },

        /* ============ 6. KONFIGURATION ============ */
        {
            id: 'section6',
            titleDe: '6. Konfiguration & Optionen',
            titleEn: '6. Configuration & Options',
            introDe: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> bietet umfangreiche Konfigurationsoptionen über die Options- und Profile-Options-Screens. Wichtige Bereiche sind Audio, Speech Recognition, Hotkeys und Joystick [citation:1][citation:6].',
            introEn: '<a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> offers extensive configuration options via the Options and Profile Options screens. Key areas include Audio, Speech Recognition, Hotkeys, and Joystick [citation:1][citation:6].',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Audio-Einstellungen',
                    titleEn: 'Audio Settings',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Einstellung</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Audio Output Type</strong></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/windows/win32/directshow/directshow" target="_blank" class="topic-link">DirectShow</a>, <a href="https://en.wikipedia.org/wiki/Media_Foundation" target="_blank" class="topic-link">Windows Media Components</a>, Legacy Audio [citation:20].</td></tr>
                    <tr><td><strong>Override Default Playback Device</strong></td><td class="text-[var(--text-muted)]">TTS und Sounds auf ein anderes Gerät routen [citation:6].</td></tr>
                    <tr><td><strong>TTS Voice</strong></td><td class="text-[var(--text-muted)]">Standard-SAPI-Stimmen oder installierte Speech Platform 11 Stimmen [citation:20].</td></tr>
                    <tr><td><strong>Volume/Rate</strong></td><td class="text-[var(--text-muted)]">Lautstärke und Sprechgeschwindigkeit pro TTS-Aktion oder global [citation:20].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Setting</th><th>Description</th></tr>
                    <tr><td><strong>Audio Output Type</strong></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/windows/win32/directshow/directshow" target="_blank" class="topic-link">DirectShow</a>, <a href="https://en.wikipedia.org/wiki/Media_Foundation" target="_blank" class="topic-link">Windows Media Components</a>, Legacy Audio [citation:20].</td></tr>
                    <tr><td><strong>Override Default Playback Device</strong></td><td class="text-[var(--text-muted)]">Route TTS and sounds to a different device [citation:6].</td></tr>
                    <tr><td><strong>TTS Voice</strong></td><td class="text-[var(--text-muted)]">Standard SAPI voices or installed Speech Platform 11 voices [citation:20].</td></tr>
                    <tr><td><strong>Volume/Rate</strong></td><td class="text-[var(--text-muted)]">Volume and speech rate per TTS action or globally [citation:20].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Speech Recognition',
                    titleEn: 'Speech Recognition',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Wichtiger Hinweis zur Windows Speech Recognition:</strong></p>
                    <p class="mb-2"><a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> nutzt die <strong>SAPI (Speech API)</strong>, nicht die Windows Speech Recognition App. Die SAPI bleibt auch in <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 11 erhalten und wird nicht entfernt – lediglich die separate Speech Recognition App wird durch "Speech Access" ersetzt [citation:7][citation:14].</p>
                    <p class="mt-3"><strong>Quelle:</strong> <a href="https://forum.voiceattack.com/smf/index.php?topic=5016.0" target="_blank" class="topic-link">VoiceAttack Forum – New Speech Recognition in Windows 11</a> [citation:7].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Important note on Windows Speech Recognition:</strong></p>
                    <p class="mb-2"><a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> uses <strong>SAPI (Speech API)</strong>, not the Windows Speech Recognition app. SAPI remains in <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 11 and is not being removed – only the separate Speech Recognition app is being replaced by "Speech Access" [citation:7][citation:14].</p>
                    <p class="mt-3"><strong>Source:</strong> <a href="https://forum.voiceattack.com/smf/index.php?topic=5016.0" target="_blank" class="topic-link">VoiceAttack Forum – New Speech Recognition in Windows 11</a> [citation:7].</p>
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
            introDe: 'Die wichtigsten <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://voiceattack.com/" target="_blank" class="topic-link">VoiceAttack</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microphone opacity-70"></i><span>1. Sprachsteuerung</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Sprache als zusätzlicher Controller für Spiele und Apps. SAPI-basiert, Windows 10/11 [citation:5].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-bolt opacity-70"></i><span>2. Makro-Erstellung</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Tastatureingaben, Text-to-Speech, Sounds, System-Aktionen, Variablen [citation:15][citation:20].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>3. HCS VoicePacks</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Professionelle Sprachpakete für <a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a>, <a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> [citation:4][citation:11].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-dollar-sign opacity-70"></i><span>4. Demo & Preis</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Kostenlose Demo (1 Profil, 20 Befehle). Vollversion ca. 12 $ auf <a href="https://store.steampowered.com/app/3046550/VoiceAttack_v2/" target="_blank" class="topic-link">Steam</a> [citation:3][citation:19].</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microphone opacity-70"></i><span>1. Voice Control</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Voice as an additional controller for games and apps. SAPI-based, Windows 10/11 [citation:5].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-bolt opacity-70"></i><span>2. Macro Creation</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Keyboard input, text-to-speech, sounds, system actions, variables [citation:15][citation:20].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>3. HCS VoicePacks</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Professional voice packs for <a href="https://www.elitedangerous.com/" target="_blank" class="topic-link">Elite Dangerous</a>, <a href="https://robertsspaceindustries.com/star-citizen" target="_blank" class="topic-link">Star Citizen</a>, <a href="https://www.helldivers2.com/" target="_blank" class="topic-link">Helldivers 2</a> [citation:4][citation:11].</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-dollar-sign opacity-70"></i><span>4. Demo & Price</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Free demo (1 profile, 20 commands). Full version ~$12 on <a href="https://store.steampowered.com/app/3046550/VoiceAttack_v2/" target="_blank" class="topic-link">Steam</a> [citation:3][citation:19].</p>
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
            { icon: 'fa-globe',    href: 'https://voiceattack.com/',                          target: '_blank', labelDe: 'Offizielle Website',        labelEn: 'Official Website' },
            { icon: 'fa-download', href: 'https://store.steampowered.com/app/3046550/VoiceAttack_v2/', target: '_blank', labelDe: 'Steam-Seite',       labelEn: 'Steam Page' },
            { icon: 'fa-file-pdf', href: 'http://www.voiceattack.com/VoiceAttackHelpV2.pdf', target: '_blank', labelDe: 'Offizielles Handbuch (PDF)', labelEn: 'Official Manual (PDF)' },
            { icon: 'fa-comments', href: 'https://forum.voiceattack.com/smf/',               target: '_blank', labelDe: 'VoiceAttack Forum',         labelEn: 'VoiceAttack Forum' },
            { icon: 'fa-headphones', href: 'https://www.hcsvoicepacks.com/',                 target: '_blank', labelDe: 'HCS VoicePacks',            labelEn: 'HCS VoicePacks' }
        ]
    },

    footer: {
        textDe: 'VoiceAttack Referenz · v1.0 · Dual Lang',
        textEn: 'VoiceAttack Reference · v1.0 · Dual Lang'
    }
});