// resources/topics/topic_counterstrike.js
// Registers the Counter-Strike series reference topic. Loaded via <script> injection.

/* ==================================================================
   COUNTER-STRIKE CODE-BLOCK COPY CONTROLLER
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
    parentId: 'Games',
    id: 'Counter-Strike Overview',
    icon: 'fa-crosshairs',
    titleDe: 'Counter-Strike',
    titleEn: 'Counter-Strike',
    descDe: 'Die komplette CS-Serie von 1999 bis heute',
    descEn: 'The Complete CS Series from 1999 to Today',

    sidebarTitleDe: 'Counter-Strike',
    sidebarTitleEn: 'Counter-Strike',
    sidebarSubtitleDe: '1999–2026 · Valve · Source',
    sidebarSubtitleEn: '1999–2026 · Valve · Source',
    sidebarVersion: 'CS2 (2023)',

    hero: {
        titleDe: 'Counter-Strike: Vom Half-Life-Mod zur E-Sport-Legende',
        titleEn: 'Counter-Strike: From Half-Life Mod to Esports Legend',
        introDe: '<a href="https://store.steampowered.com/app/10/CounterStrike/" target="_blank" class="topic-link">Counter-Strike</a> begann 1999 als <strong>kostenlose Half-Life-Mod</strong> von Minh Le („Gooseman") und Jess Cliffe. Aus dem Freizeitprojekt wurde eine der einflussreichsten Spieleserien aller Zeiten – mit über <strong>25 Jahren Geschichte</strong>, mehreren Engine-Wechseln und einer weltweiten E-Sport-Szene. Dieser Guide deckt <strong>alle Versionen</strong> ab: von der Beta 1999 über 1.6, Condition Zero, Source, Global Offensive bis zu <strong>Counter-Strike 2</strong> (2023) .',
        introEn: '<a href="https://store.steampowered.com/app/10/CounterStrike/" target="_blank" class="topic-link">Counter-Strike</a> began in 1999 as a <strong>free Half-Life mod</strong> by Minh Le ("Gooseman") and Jess Cliffe. What started as a hobby project became one of the most influential game series of all time – with over <strong>25 years of history</strong>, multiple engine changes, and a global esports scene. This guide covers <strong>all versions</strong>: from the 1999 beta through 1.6, Condition Zero, Source, Global Offensive, to <strong>Counter-Strike 2</strong> (2023) .'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',       labelEn: 'Overview' },
        { icon: 'fa-history',           href: '#section2', switchToDoc: true, labelDe: 'Alle Versionen',  labelEn: 'All Versions' },
        { icon: 'fa-crosshairs',        href: '#section3', switchToDoc: true, labelDe: 'Gameplay',        labelEn: 'Gameplay' },
        { icon: 'fa-trophy',            href: '#section4', switchToDoc: true, labelDe: 'E-Sport',         labelEn: 'Esports' },
        { icon: 'fa-wrench',            href: '#section5', switchToDoc: true, labelDe: 'Mods & Community', labelEn: 'Mods & Community' },
        { icon: 'fa-play',              href: '#section6', switchToDoc: true, labelDe: 'Heute spielen',   labelEn: 'Playing Today' },
        { icon: 'fa-external-link-alt', href: 'https://store.steampowered.com/app/730/CounterStrike_2/', target: '_blank', labelDe: 'Steam Store', labelEn: 'Steam Store' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Geschichte',
            titleEn: '1. Overview & History',
            introDe: '<a href="https://store.steampowered.com/app/10/CounterStrike/" target="_blank" class="topic-link">Counter-Strike</a> wurde 1999 als <strong>Modifikation für Half-Life</strong> veröffentlicht. Die ursprüngliche Idee stammte von Minh Le („Gooseman") und Jess Cliffe („Cliffe") – sie wollten ein <strong>taktisches Team-Shooter-Erlebnis</strong> schaffen, in dem Terroristen und Counter-Terroristen gegeneinander antreten. Valve übernahm das Projekt 2000 und veröffentlichte es als eigenständiges Spiel. Über die Jahre entstanden mehrere Nachfolger, die auf verschiedenen Engines basieren .',
            introEn: '<a href="https://store.steampowered.com/app/10/CounterStrike/" target="_blank" class="topic-link">Counter-Strike</a> was released in 1999 as a <strong>modification for Half-Life</strong>. The original idea came from Minh Le ("Gooseman") and Jess Cliffe ("Cliffe") – they wanted to create a <strong>tactical team shooter experience</strong> where terrorists and counter-terrorists face off. Valve acquired the project in 2000 and released it as a standalone game. Over the years, several sequels were created, based on different engines .',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Die Ursprünge',
                    titleEn: 'The Origins',
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
                    <tr><th class="w-1/4">Jahr</th><th>Ereignis</th></tr>
                    <tr><td><strong>1999</strong></td><td class="text-[var(--text-muted)]">Erste Beta von Counter-Strike als Half-Life-Mod veröffentlicht. Minh Le und Jess Cliffe entwickeln das Spiel in ihrer Freizeit .</td></tr>
                    <tr><td><strong>2000</strong></td><td class="text-[var(--text-muted)]">Valve übernimmt das Projekt. Counter-Strike 1.0 wird als eigenständiges Spiel veröffentlicht .</td></tr>
                    <tr><td><strong>2000</strong></td><td class="text-[var(--text-muted)]">Counter-Strike 1.6 erscheint – die Version, die die E-Sport-Szene prägen wird .</td></tr>
                    <tr><td><strong>2003</strong></td><td class="text-[var(--text-muted)]">Xbox-Portierung von Counter-Strike 1.6 .</td></tr>
                    <tr><td><strong>2004</strong></td><td class="text-[var(--text-muted)]">Condition Zero und Counter-Strike: Source erscheinen .</td></tr>
                    <tr><td><strong>2012</strong></td><td class="text-[var(--text-muted)]">Counter-Strike: Global Offensive (CS:GO) wird veröffentlicht .</td></tr>
                    <tr><td><strong>2023</strong></td><td class="text-[var(--text-muted)]">Counter-Strike 2 ersetzt CS:GO auf Steam .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Year</th><th>Event</th></tr>
                    <tr><td><strong>1999</strong></td><td class="text-[var(--text-muted)]">First beta of Counter-Strike released as a Half-Life mod. Minh Le and Jess Cliffe develop the game in their spare time .</td></tr>
                    <tr><td><strong>2000</strong></td><td class="text-[var(--text-muted)]">Valve acquires the project. Counter-Strike 1.0 is released as a standalone game .</td></tr>
                    <tr><td><strong>2000</strong></td><td class="text-[var(--text-muted)]">Counter-Strike 1.6 is released – the version that will shape the esports scene .</td></tr>
                    <tr><td><strong>2003</strong></td><td class="text-[var(--text-muted)]">Xbox port of Counter-Strike 1.6 .</td></tr>
                    <tr><td><strong>2004</strong></td><td class="text-[var(--text-muted)]">Condition Zero and Counter-Strike: Source are released .</td></tr>
                    <tr><td><strong>2012</strong></td><td class="text-[var(--text-muted)]">Counter-Strike: Global Offensive (CS:GO) is released .</td></tr>
                    <tr><td><strong>2023</strong></td><td class="text-[var(--text-muted)]">Counter-Strike 2 replaces CS:GO on Steam .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Warum Counter-Strike so wichtig ist',
                    titleEn: 'Why Counter-Strike Matters',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Counter-Strike ist mehr als ein Spiel – es ist ein Stück Gaming-Geschichte:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Definition des taktischen Shooters:</strong> Rundenbasiertes Gameplay, Ökonomie-System, Team-Koordination – alles wurde von CS geprägt .</li>
                    <li><strong>E-Sport-Pionier:</strong> CS war eines der ersten Spiele, das professionelle Ligen und Turniere etablierte (CPL, CAL, ESWC) .</li>
                    <li><strong>Community-getrieben:</strong> Von einer Mod zu einem der meistgespielten Spiele der Welt – ohne Marketing-Kampagne.</li>
                    <li><strong>25+ Jahre Aktivität:</strong> Keine andere Shooter-Serie hat eine so lange, ununterbrochene Geschichte.</li>
                    <li><strong>Kultureller Einfluss:</strong> „Rush B", „Eco-Round", „AWP" – Begriffe, die aus der Gaming-Kultur nicht mehr wegzudenken sind.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Counter-Strike is more than a game – it's a piece of gaming history:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Definition of the tactical shooter:</strong> Round-based gameplay, economy system, team coordination – all shaped by CS .</li>
                    <li><strong>Esports pioneer:</strong> CS was one of the first games to establish professional leagues and tournaments (CPL, CAL, ESWC) .</li>
                    <li><strong>Community-driven:</strong> From a mod to one of the most-played games in the world – without a marketing campaign.</li>
                    <li><strong>25+ years of activity:</strong> No other shooter series has such a long, unbroken history.</li>
                    <li><strong>Cultural impact:</strong> "Rush B," "Eco round," "AWP" – terms that are indispensable in gaming culture.</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. ALLE VERSIONEN ============ */
        {
            id: 'section2',
            titleDe: '2. Alle Versionen im Überblick',
            titleEn: '2. All Versions Overview',
            introDe: 'Die Counter-Strike-Serie umfasst <strong>mehrere Hauptversionen</strong>, die auf verschiedenen Engines basieren. Von der ursprünglichen Half-Life-Mod über die Source-Engine bis zu Source 2 hat sich das Spiel technisch ständig weiterentwickelt – während das Kern-Gameplay erhalten blieb .',
            introEn: 'The Counter-Strike series includes <strong>several main versions</strong> based on different engines. From the original Half-Life mod through the Source engine to Source 2, the game has continuously evolved technically – while the core gameplay remained intact .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Counter-Strike 1.6 (2000)',
                    titleEn: 'Counter-Strike 1.6 (2000)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Version, die die E-Sport-Szene prägte.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> 2000 (Version 1.6 im September 2003) [citation:18].</li>
                    <li><strong>Engine:</strong> GoldSrc (Half-Life-Engine).</li>
                    <li><strong>Plattformen:</strong> Windows, macOS, Linux, Xbox.</li>
                    <li><strong>Besonderheit:</strong> Die am längsten gespielte Version. Grundlage für die ersten großen E-Sport-Turniere .</li>
                    <li><strong>Status:</strong> Noch auf Steam verfügbar (als Teil des CS-Pakets).</li>
                    </ul>
                    <p class="mt-3"><strong>Warum 1.6 so wichtig war:</strong> Einfacheres Gameplay, weniger Waffen als spätere Versionen, aber perfekt ausbalanciert. Die „Goldene Ära" des E-Sports (2000–2007) fand fast ausschließlich auf 1.6 statt .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The version that shaped the esports scene.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> 2000 (version 1.6 in September 2003) [citation:18].</li>
                    <li><strong>Engine:</strong> GoldSrc (Half-Life engine).</li>
                    <li><strong>Platforms:</strong> Windows, macOS, Linux, Xbox.</li>
                    <li><strong>Specialty:</strong> The longest-played version. Foundation for the first major esports tournaments .</li>
                    <li><strong>Status:</strong> Still available on Steam (as part of the CS package).</li>
                    </ul>
                    <p class="mt-3"><strong>Why 1.6 was so important:</strong> Simpler gameplay, fewer weapons than later versions, but perfectly balanced. The "Golden Age" of esports (2000–2007) took place almost exclusively on 1.6 .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Counter-Strike: Condition Zero (2004)',
                    titleEn: 'Counter-Strike: Condition Zero (2004)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Eine Singleplayer-fokussierte Variante mit verbesserter Grafik.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> 23. März 2004 [citation:20].</li>
                    <li><strong>Engine:</strong> GoldSrc (verbessert).</li>
                    <li><strong>Besonderheit:</strong> Enthält <strong>Condition Zero: Deleted Scenes</strong> – 19 Singleplayer-Missionen, die später entfernt wurden [citation:6].</li>
                    <li><strong>Enthält:</strong> Counter-Strike 1.6 als Beigabe .</li>
                    <li><strong>Status:</strong> Auf Steam verfügbar, aber wenig gespielt.</li>
                    </ul>
                    <p class="mt-3"><strong>Warum Condition Zero scheiterte:</strong> Die Singleplayer-Missionen waren linear und wenig innovativ. Die Multiplayer-Community blieb bei 1.6 .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>A singleplayer-focused variant with improved graphics.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> March 23, 2004 [citation:20].</li>
                    <li><strong>Engine:</strong> GoldSrc (improved).</li>
                    <li><strong>Specialty:</strong> Includes <strong>Condition Zero: Deleted Scenes</strong> – 19 singleplayer missions that were later removed [citation:6].</li>
                    <li><strong>Includes:</strong> Counter-Strike 1.6 as a bonus .</li>
                    <li><strong>Status:</strong> Available on Steam, but rarely played.</li>
                    </ul>
                    <p class="mt-3"><strong>Why Condition Zero failed:</strong> The singleplayer missions were linear and uninspired. The multiplayer community stayed with 1.6 .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_3',
                    titleDe: 'Counter-Strike: Source (2004)',
                    titleEn: 'Counter-Strike: Source (2004)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der Neuanfang auf der Source-Engine.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> 7. Oktober 2004 (Windows), 1. November 2004 (Steam) [citation:4][citation:17][citation:20].</li>
                    <li><strong>Engine:</strong> Source (Half-Life 2-Engine).</li>
                    <li><strong>Besonderheit:</strong> Verbesserte Grafik, Physik und Ragdolls. Aber: Die Community spaltete sich zwischen 1.6 und Source .</li>
                    <li><strong>Status:</strong> Auf Steam verfügbar, noch aktiv, aber weniger professionell gespielt.</li>
                    </ul>
                    <p class="mt-3"><strong>Warum Source umstritten war:</strong> Die Source-Engine veränderte die Physik und das Spielgefühl. Viele 1.6-Spieler empfanden Source als „anders" und blieben beim Original .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>A fresh start on the Source engine.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> October 7, 2004 (Windows), November 1, 2004 (Steam) [citation:4][citation:17][citation:20].</li>
                    <li><strong>Engine:</strong> Source (Half-Life 2 engine).</li>
                    <li><strong>Specialty:</strong> Improved graphics, physics, and ragdolls. But: The community split between 1.6 and Source .</li>
                    <li><strong>Status:</strong> Available on Steam, still active, but less played professionally.</li>
                    </ul>
                    <p class="mt-3"><strong>Why Source was controversial:</strong> The Source engine changed physics and game feel. Many 1.6 players found Source "different" and stayed with the original .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_4',
                    titleDe: 'Counter-Strike: Global Offensive (2012)',
                    titleEn: 'Counter-Strike: Global Offensive (2012)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der Neustart, der CS zum Massenphänomen machte.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> 21. August 2012 [citation:8][citation:20].</li>
                    <li><strong>Engine:</strong> Source (stark modifiziert).</li>
                    <li><strong>Entwickler:</strong> Valve und <a href="https://en.wikipedia.org/wiki/Hidden_Path_Entertainment" target="_blank" class="topic-link">Hidden Path Entertainment</a> .</li>
                    <li><strong>Plattformen:</strong> Windows, macOS, Linux, PlayStation 3, Xbox 360 .</li>
                    <li><strong>Besonderheit:</strong> Einführung von <strong>Prime-Status</strong>, <strong>Skins</strong> und <strong>Skin-Handel</strong>. Das Spiel wurde durch das Skin-Ökosystem zum Massenphänomen .</li>
                    <li><strong>Status:</strong> Am 1. Januar 2024 <strong>offiziell eingestellt</strong>. Nur noch über die <code>csgo_legacy</code>-Beta spielbar, ohne Multiplayer-Support [citation:1][citation:3][citation:16].</li>
                    </ul>
                    <p class="mt-3"><strong>Warum CS:GO so erfolgreich war:</strong> Die Kombination aus kostenlosem Einstieg (Prime-Upgrade optional), Skin-Ökosystem und regelmäßigen Updates (Operations) machte CS:GO zu einem der meistgespielten Spiele auf Steam .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The restart that made CS a mass phenomenon.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Release:</strong> August 21, 2012 [citation:8][citation:20].</li>
                    <li><strong>Engine:</strong> Source (heavily modified).</li>
                    <li><strong>Developer:</strong> Valve and <a href="https://en.wikipedia.org/wiki/Hidden_Path_Entertainment" target="_blank" class="topic-link">Hidden Path Entertainment</a> .</li>
                    <li><strong>Platforms:</strong> Windows, macOS, Linux, PlayStation 3, Xbox 360 .</li>
                    <li><strong>Specialty:</strong> Introduction of <strong>Prime status</strong>, <strong>skins</strong>, and <strong>skin trading</strong>. The game became a mass phenomenon through the skin ecosystem .</li>
                    <li><strong>Status:</strong> <strong>Officially discontinued</strong> on January 1, 2024. Only playable via the <code>csgo_legacy</code> beta, without multiplayer support [citation:1][citation:3][citation:16].</li>
                    </ul>
                    <p class="mt-3"><strong>Why CS:GO was so successful:</strong> The combination of free entry (optional Prime upgrade), skin ecosystem, and regular updates (Operations) made CS:GO one of the most-played games on Steam .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_5',
                    titleDe: 'Counter-Strike 2 (2023)',
                    titleEn: 'Counter-Strike 2 (2023)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der technische Sprung auf Source 2.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Ankündigung:</strong> 22. März 2023 .</li>
                    <li><strong>Limited Test:</strong> März–September 2023 (nur mit Einladung) .</li>
                    <li><strong>Release:</strong> 27. September 2023 [citation:1][citation:14][citation:20].</li>
                    <li><strong>Engine:</strong> <strong>Source 2</strong> – komplett neue Engine .</li>
                    <li><strong>Besonderheit:</strong> Ersetzt CS:GO <strong>vollständig</strong> auf Steam. Kostenloses Upgrade für alle CS:GO-Besitzer .</li>
                    <li><strong>Neue Features:</strong> Dynamische Rauchgranaten, Tick-Rate-unabhängiges Gameplay, Premier-Modus mit CS-Rating, überarbeitete Maps .</li>
                    <li><strong>Status:</strong> Aktiv, aber mit anfänglicher Kritik (Performance, entfernte Features, macOS-Support eingestellt) .</li>
                    </ul>
                    <p class="mt-3"><strong>Warum CS2 umstritten war:</strong> Zum Launch fehlten viele CS:GO-Features. Die Performance war auf älteren PCs schlechter. macOS wurde nicht mehr unterstützt. Valve hat seitdem viele Probleme behoben .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The technical leap to Source 2.</strong></p>
                    <p class="mb-2 mt-3"><strong>Details:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Announcement:</strong> March 22, 2023 .</li>
                    <li><strong>Limited Test:</strong> March–September 2023 (invite only) .</li>
                    <li><strong>Release:</strong> September 27, 2023 [citation:1][citation:14][citation:20].</li>
                    <li><strong>Engine:</strong> <strong>Source 2</strong> – completely new engine .</li>
                    <li><strong>Specialty:</strong> Replaces CS:GO <strong>completely</strong> on Steam. Free upgrade for all CS:GO owners .</li>
                    <li><strong>New features:</strong> Dynamic smoke grenades, tick-rate-independent gameplay, Premier mode with CS Rating, overhauled maps .</li>
                    <li><strong>Status:</strong> Active, but with initial criticism (performance, removed features, macOS support discontinued) .</li>
                    </ul>
                    <p class="mt-3"><strong>Why CS2 was controversial:</strong> At launch, many CS:GO features were missing. Performance was worse on older PCs. macOS was no longer supported. Valve has since fixed many issues .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_6',
                    titleDe: 'Weitere Versionen',
                    titleEn: 'Other Versions',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Version</th><th class="w-1/4">Jahr</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Counter-Strike Neo</strong></td><td class="text-[var(--text-muted)]">2003</td><td class="text-[var(--text-muted)]">Japan-exklusive Arcade-Version. Nie im Westen veröffentlicht [citation:20].</td></tr>
                    <tr><td><strong>Counter-Strike Online</strong></td><td class="text-[var(--text-muted)]">2008</td><td class="text-[var(--text-muted)]">Asien-exklusive Free-to-Play-Version. Von Nexon entwickelt [citation:20].</td></tr>
                    <tr><td><strong>Counter-Strike Online 2</strong></td><td class="text-[var(--text-muted)]">2013</td><td class="text-[var(--text-muted)]">Nachfolger der Asia-Version. Ebenfalls von Nexon [citation:20].</td></tr>
                    <tr><td><strong>Counter-Strike Nexon: Zombies</strong></td><td class="text-[var(--text-muted)]">2014</td><td class="text-[var(--text-muted)]">Zombie-fokussierte Free-to-Play-Version. Wenig erfolgreich im Westen [citation:20].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Version</th><th class="w-1/4">Year</th><th>Description</th></tr>
                    <tr><td><strong>Counter-Strike Neo</strong></td><td class="text-[var(--text-muted)]">2003</td><td class="text-[var(--text-muted)]">Japan-exclusive arcade version. Never released in the West [citation:20].</td></tr>
                    <tr><td><strong>Counter-Strike Online</strong></td><td class="text-[var(--text-muted)]">2008</td><td class="text-[var(--text-muted)]">Asia-exclusive free-to-play version. Developed by Nexon [citation:20].</td></tr>
                    <tr><td><strong>Counter-Strike Online 2</strong></td><td class="text-[var(--text-muted)]">2013</td><td class="text-[var(--text-muted)]">Sequel to the Asia version. Also by Nexon [citation:20].</td></tr>
                    <tr><td><strong>Counter-Strike Nexon: Zombies</strong></td><td class="text-[var(--text-muted)]">2014</td><td class="text-[var(--text-muted)]">Zombie-focused free-to-play version. Not very successful in the West [citation:20].</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. GAMEPLAY ============ */
        {
            id: 'section3',
            titleDe: '3. Gameplay & Kernmechaniken',
            titleEn: '3. Gameplay & Core Mechanics',
            introDe: 'Counter-Strike hat ein <strong>einzigartiges Gameplay</strong>, das sich über 25 Jahre kaum verändert hat. Zwei Teams – <strong>Terroristen</strong> und <strong>Counter-Terroristen</strong> – treten in rundenbasierten Matches gegeneinander an. Jede Runde beginnt mit einer <strong>Kaufphase</strong>, in der Spieler Waffen und Ausrüstung mit Geld erwerben, das sie durch Erfolge in vorherigen Runden verdient haben .',
            introEn: 'Counter-Strike has a <strong>unique gameplay</strong> that has barely changed in over 25 years. Two teams – <strong>Terrorists</strong> and <strong>Counter-Terrorists</strong> – face off in round-based matches. Each round begins with a <strong>buy phase</strong>, where players purchase weapons and equipment with money earned through successes in previous rounds .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Kernmechaniken',
                    titleEn: 'Core Mechanics',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Mechanik</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Rundenbasiertes Gameplay</strong></td><td class="text-[var(--text-muted)]">Jede Runde dauert 1:55 Minuten. Ziel: Alle Gegner töten oder Missionsziel erreichen (Bombe entschärfen, Geiseln retten) .</td></tr>
                    <tr><td><strong>Ökonomie-System</strong></td><td class="text-[var(--text-muted)]">Geld wird durch Kills, Rundenziele und Bombenlegung verdient. Kaufphase am Rundenbeginn .</td></tr>
                    <tr><td><strong>Waffen-Kategorien</strong></td><td class="text-[var(--text-muted)]">Pistolen, SMGs, Gewehre, Scharfschützengewehre, Schrotflinten, Maschinengewehre, Granaten, Messer .</td></tr>
                    <tr><td><strong>Headshot-Mechanik</strong></td><td class="text-[var(--text-muted)]">Kopftreffer verursachen massiven Schaden. Die meisten Waffen töten mit einem Headshot .</td></tr>
                    <tr><td><strong>Rüstung</strong></td><td class="text-[var(--text-muted)]">Kevlar und Helm reduzieren Schaden. Helm schützt vor Headshots .</td></tr>
                    <tr><td><strong>Bewegung & Genauigkeit</strong></td><td class="text-[var(--text-muted)]">Waffen sind ungenauer, während man sich bewegt. Counter-Strafing ist eine Kernfähigkeit .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Mechanic</th><th>Description</th></tr>
                    <tr><td><strong>Round-based gameplay</strong></td><td class="text-[var(--text-muted)]">Each round lasts 1:55 minutes. Goal: Kill all enemies or complete mission objective (defuse bomb, rescue hostages) .</td></tr>
                    <tr><td><strong>Economy system</strong></td><td class="text-[var(--text-muted)]">Money earned through kills, round objectives, and bomb plants. Buy phase at round start .</td></tr>
                    <tr><td><strong>Weapon categories</strong></td><td class="text-[var(--text-muted)]">Pistols, SMGs, rifles, sniper rifles, shotguns, machine guns, grenades, knife .</td></tr>
                    <tr><td><strong>Headshot mechanic</strong></td><td class="text-[var(--text-muted)]">Headshots deal massive damage. Most weapons kill with one headshot .</td></tr>
                    <tr><td><strong>Armor</strong></td><td class="text-[var(--text-muted)]">Kevlar and helmet reduce damage. Helmet protects against headshots .</td></tr>
                    <tr><td><strong>Movement & accuracy</strong></td><td class="text-[var(--text-muted)]">Weapons are less accurate while moving. Counter-strafing is a core skill .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Spielmodi',
                    titleEn: 'Game Modes',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Counter-Strike bietet verschiedene Spielmodi:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Competitive (Premier):</strong> 5v5, Ranked, Map-Veto. Der Standard-E-Sport-Modus .</li>
                    <li><strong>Wingman:</strong> 2v2, kleinere Maps, schnelleres Gameplay .</li>
                    <li><strong>Casual:</strong> 10v10, lockere Regeln, kein Ranked .</li>
                    <li><strong>Deathmatch:</strong> Freies Respawn, keine Runden, Waffenwahl per Menü .</li>
                    <li><strong>Arms Race:</strong> Jeder Kill schaltet eine neue Waffe frei. Ziel: Goldene Messer-Kill .</li>
                    <li><strong>Demolition:</strong> Waffen werden durch Kills freigeschaltet. Zwei Teams, Bombenmodus .</li>
                    <li><strong>Hostage Rescue:</strong> CTs müssen Geiseln retten, Ts müssen sie verteidigen .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Counter-Strike offers various game modes:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Competitive (Premier):</strong> 5v5, ranked, map veto. The standard esports mode .</li>
                    <li><strong>Wingman:</strong> 2v2, smaller maps, faster gameplay .</li>
                    <li><strong>Casual:</strong> 10v10, relaxed rules, no ranked .</li>
                    <li><strong>Deathmatch:</strong> Free respawn, no rounds, weapon selection via menu .</li>
                    <li><strong>Arms Race:</strong> Each kill unlocks a new weapon. Goal: Golden knife kill .</li>
                    <li><strong>Demolition:</strong> Weapons unlocked through kills. Two teams, bomb mode .</li>
                    <li><strong>Hostage Rescue:</strong> CTs must rescue hostages, Ts must defend them .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. E-SPORT ============ */
        {
            id: 'section4',
            titleDe: '4. E-Sport & Community',
            titleEn: '4. Esports & Community',
            introDe: 'Counter-Strike ist <strong>einer der ältesten und wichtigsten E-Sports</strong> überhaupt. Seit 2000 werden professionelle Turniere ausgetragen – von der <strong>Cyberathlete Professional League (CPL)</strong> über die <strong>ESL</strong> bis zu den heutigen <strong>Majors</strong>. Die „Goldene Ära" (2000–2007) fand fast ausschließlich auf <strong>Counter-Strike 1.6</strong> statt .',
            introEn: 'Counter-Strike is <strong>one of the oldest and most important esports</strong> ever. Professional tournaments have been held since 2000 – from the <strong>Cyberathlete Professional League (CPL)</strong> through the <strong>ESL</strong> to today\'s <strong>Majors</strong>. The "Golden Age" (2000–2007) took place almost exclusively on <strong>Counter-Strike 1.6</strong> .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Die Goldene Ära (2000–2007)',
                    titleEn: 'The Golden Age (2000–2007)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die ersten großen E-Sport-Ligen und Turniere:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>CPL (Cyberathlete Professional League):</strong> Die wichtigste Turnierserie. Sommer- und Winter-Events in Dallas .</li>
                    <li><strong>CAL (Cyberathlete Amateur League):</strong> Die größte Online-Liga. Fünf Divisionen (Open, Intermediate, Main, Premier, Invite) .</li>
                    <li><strong>ESWC (Electronic Sports World Cup):</strong> Internationales Turnier mit Länderteams .</li>
                    <li><strong>WCG (World Cyber Games):</strong> „Olympische Spiele" des E-Sports .</li>
                    </ul>
                    <p class="mt-3"><strong>Legendäre Teams:</strong> 3D, SK Gaming, NiP, fnatic, MYM, coL, NoA, MiBR, PGS .</p>
                    <p class="mt-2"><strong>Legendäre Spieler:</strong> Ksharp, HeatoN, potti, element, f0rest, fr0d, sunman, tr1p .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The first major esports leagues and tournaments:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>CPL (Cyberathlete Professional League):</strong> The most important tournament series. Summer and winter events in Dallas .</li>
                    <li><strong>CAL (Cyberathlete Amateur League):</strong> The largest online league. Five divisions (Open, Intermediate, Main, Premier, Invite) .</li>
                    <li><strong>ESWC (Electronic Sports World Cup):</strong> International tournament with national teams .</li>
                    <li><strong>WCG (World Cyber Games):</strong> The "Olympics" of esports .</li>
                    </ul>
                    <p class="mt-3"><strong>Legendary teams:</strong> 3D, SK Gaming, NiP, fnatic, MYM, coL, NoA, MiBR, PGS .</p>
                    <p class="mt-2"><strong>Legendary players:</strong> Ksharp, HeatoN, potti, element, f0rest, fr0d, sunman, tr1p .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Moderne Ära (2012–heute)',
                    titleEn: 'Modern Era (2012–Today)',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Turnier</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Majors</strong></td><td class="text-[var(--text-muted)]">Von Valve gesponserte Turniere mit <strong>1.000.000 $+ Preispool</strong>. Die wichtigsten Turniere der Szene .</td></tr>
                    <tr><td><strong>ESL Pro League</strong></td><td class="text-[var(--text-muted)]">Regelmäßige Liga mit Saison-Finals .</td></tr>
                    <tr><td><strong>BLAST Premier</strong></td><td class="text-[var(--text-muted)]">Turnierserie mit Spring/Fall Finals und World Final .</td></tr>
                    <tr><td><strong>IEM (Intel Extreme Masters)</strong></td><td class="text-[var(--text-muted)]">Internationale Turnierserie mit Events in Katowice, Cologne und anderen Städten .</td></tr>
                    <tr><td><strong>PGL Major</strong></td><td class="text-[var(--text-muted)]">Von PGL organisierte Majors. Höchste Zuschauerzahlen .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Tournament</th><th>Description</th></tr>
                    <tr><td><strong>Majors</strong></td><td class="text-[var(--text-muted)]">Valve-sponsored tournaments with <strong>$1,000,000+ prize pools</strong>. The most important tournaments in the scene .</td></tr>
                    <tr><td><strong>ESL Pro League</strong></td><td class="text-[var(--text-muted)]">Regular league with season finals .</td></tr>
                    <tr><td><strong>BLAST Premier</strong></td><td class="text-[var(--text-muted)]">Tournament series with Spring/Fall Finals and World Final .</td></tr>
                    <tr><td><strong>IEM (Intel Extreme Masters)</strong></td><td class="text-[var(--text-muted)]">International tournament series with events in Katowice, Cologne, and other cities .</td></tr>
                    <tr><td><strong>PGL Major</strong></td><td class="text-[var(--text-muted)]">PGL-organized Majors. Highest viewership numbers .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. MODS & COMMUNITY ============ */
        {
            id: 'section5',
            titleDe: '5. Mods & Community',
            titleEn: '5. Mods & Community',
            introDe: 'Counter-Strike begann als <strong>Community-Mod</strong> – und diese Kultur ist bis heute erhalten. Von <strong>Custom-Maps</strong> über <strong>Surf- und KZ-Maps</strong> bis zu <strong>Zombie-Mods</strong> hat die Community das Spiel über Jahre hinweg erweitert. Der <a href="https://steamcommunity.com/workshop/browse/?appid=730" target="_blank" class="topic-link">Steam Workshop</a> für CS2 enthält tausende Custom-Maps und Skins .',
            introEn: 'Counter-Strike began as a <strong>community mod</strong> – and that culture persists to this day. From <strong>custom maps</strong> to <strong>surf and KZ maps</strong> to <strong>zombie mods</strong>, the community has expanded the game over the years. The <a href="https://steamcommunity.com/workshop/browse/?appid=730" target="_blank" class="topic-link">Steam Workshop</a> for CS2 contains thousands of custom maps and skins .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Beliebte Mods & Map-Typen',
                    titleEn: 'Popular Mods & Map Types',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Typ</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Surf Maps</strong></td><td class="text-[var(--text-muted)]">Spieler „surfen" auf schrägen Flächen durch die Map. Erfordert präzise Bewegungskontrolle .</td></tr>
                    <tr><td><strong>KZ (Kreedz) Maps</strong></td><td class="text-[var(--text-muted)]">Jump- und Kletter-Herausforderungen. Ziel: Die Map so schnell wie möglich abschließen .</td></tr>
                    <tr><td><strong>Bhop Maps</strong></td><td class="text-[var(--text-muted)]">Bunny-Hopping durch die Map. Erfordert Timing und Geschwindigkeit .</td></tr>
                    <tr><td><strong>Zombie Escape</strong></td><td class="text-[var(--text-muted)]">Spieler müssen vor einer Zombie-Horde fliehen und Maps abschließen .</td></tr>
                    <tr><td><strong>Gun Game</strong></td><td class="text-[var(--text-muted)]">Jeder Kill schaltet eine neue Waffe frei. Erster Spieler mit Messer-Kill gewinnt .</td></tr>
                    <tr><td><strong>Custom Maps</strong></td><td class="text-[var(--text-muted)]">Tausende von Community-erstellten Maps für alle Spielmodi .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Type</th><th>Description</th></tr>
                    <tr><td><strong>Surf Maps</strong></td><td class="text-[var(--text-muted)]">Players "surf" on sloped surfaces through the map. Requires precise movement control .</td></tr>
                    <tr><td><strong>KZ (Kreedz) Maps</strong></td><td class="text-[var(--text-muted)]">Jump and climbing challenges. Goal: Complete the map as fast as possible .</td></tr>
                    <tr><td><strong>Bhop Maps</strong></td><td class="text-[var(--text-muted)]">Bunny-hopping through the map. Requires timing and speed .</td></tr>
                    <tr><td><strong>Zombie Escape</strong></td><td class="text-[var(--text-muted)]">Players must flee from a zombie horde and complete maps .</td></tr>
                    <tr><td><strong>Gun Game</strong></td><td class="text-[var(--text-muted)]">Each kill unlocks a new weapon. First player with a knife kill wins .</td></tr>
                    <tr><td><strong>Custom Maps</strong></td><td class="text-[var(--text-muted)]">Thousands of community-created maps for all game modes .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Steam Workshop',
                    titleEn: 'Steam Workshop',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der Steam Workshop für CS2 enthält:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Custom Maps:</strong> Tausende von Maps für alle Modi .</li>
                    <li><strong>Weapon Skins:</strong> Community-erstellte Skins (nur inoffiziell) .</li>
                    <li><strong>Sticker:</strong> Community-Sticker .</li>
                    <li><strong>Agents:</strong> Charakter-Modelle .</li>
                    </ul>
                    <p class="mt-3"><strong>Wichtig:</strong> In CS2 sind Custom-Skins <strong>nicht</strong> im offiziellen Matchmaking sichtbar. Nur Vanilla-Waffen und offizielle Skins .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The Steam Workshop for CS2 contains:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Custom Maps:</strong> Thousands of maps for all modes .</li>
                    <li><strong>Weapon Skins:</strong> Community-created skins (unofficial only) .</li>
                    <li><strong>Stickers:</strong> Community stickers .</li>
                    <li><strong>Agents:</strong> Character models .</li>
                    </ul>
                    <p class="mt-3"><strong>Important:</strong> In CS2, custom skins are <strong>not</strong> visible in official matchmaking. Only vanilla weapons and official skins .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. HEUTE SPIELEN ============ */
        {
            id: 'section6',
            titleDe: '6. Counter-Strike heute spielen',
            titleEn: '6. Playing Counter-Strike Today',
            introDe: 'Counter-Strike 2 ist <strong>die aktuelle Version</strong> der Serie. Es ist kostenlos auf Steam spielbar (Prime-Upgrade optional). Ältere Versionen wie <strong>1.6</strong> und <strong>Source</strong> sind weiterhin auf Steam verfügbar – mit aktiven Community-Servern. <strong>CS:GO</strong> ist offiziell eingestellt, kann aber über die <code>csgo_legacy</code>-Beta gestartet werden (ohne Multiplayer) .',
            introEn: 'Counter-Strike 2 is <strong>the current version</strong> of the series. It is free to play on Steam (optional Prime upgrade). Older versions like <strong>1.6</strong> and <strong>Source</strong> are still available on Steam – with active community servers. <strong>CS:GO</strong> is officially discontinued but can be launched via the <code>csgo_legacy</code> beta (without multiplayer) .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Systemanforderungen',
                    titleEn: 'System Requirements',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Version</th><th>Minimum</th></tr>
                    <tr><td><strong>Counter-Strike 2</strong></td><td class="text-[var(--text-muted)]">Windows 10, Intel Core i5 750, 8 GB RAM, 1 GB GPU (DirectX 11), 85 GB Speicher [citation:15].</td></tr>
                    <tr><td><strong>CS:GO (Legacy)</strong></td><td class="text-[var(--text-muted)]">Windows XP, Intel Core 2 Duo E6600, 2 GB RAM, DirectX 9.0c, 15 GB Speicher [citation:12].</td></tr>
                    <tr><td><strong>CS: Source</strong></td><td class="text-[var(--text-muted)]">1,7 GHz CPU, 512 MB RAM, DirectX 8.1 GPU, 4 GB Speicher [citation:11].</td></tr>
                    <tr><td><strong>CS 1.6</strong></td><td class="text-[var(--text-muted)]">500 MHz CPU, 96 MB RAM, 16 MB GPU [citation:13].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Version</th><th>Minimum</th></tr>
                    <tr><td><strong>Counter-Strike 2</strong></td><td class="text-[var(--text-muted)]">Windows 10, Intel Core i5 750, 8 GB RAM, 1 GB GPU (DirectX 11), 85 GB storage [citation:15].</td></tr>
                    <tr><td><strong>CS:GO (Legacy)</strong></td><td class="text-[var(--text-muted)]">Windows XP, Intel Core 2 Duo E6600, 2 GB RAM, DirectX 9.0c, 15 GB storage [citation:12].</td></tr>
                    <tr><td><strong>CS: Source</strong></td><td class="text-[var(--text-muted)]">1.7 GHz CPU, 512 MB RAM, DirectX 8.1 GPU, 4 GB storage [citation:11].</td></tr>
                    <tr><td><strong>CS 1.6</strong></td><td class="text-[var(--text-muted)]">500 MHz CPU, 96 MB RAM, 16 MB GPU [citation:13].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Was sollte man 2026 spielen?',
                    titleEn: 'What Should You Play in 2026?',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Empfehlung je nach Vorliebe:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Counter-Strike 2:</strong> Die aktuelle Version. Beste Grafik, aktive Updates, größte Spielerbasis. Kostenlos .</li>
                    <li><strong>Counter-Strike 1.6:</strong> Für Nostalgiker und E-Sport-Historiker. Aktive Community-Server, aber veraltete Grafik .</li>
                    <li><strong>Counter-Strike: Source:</strong> Guter Kompromiss zwischen 1.6 und CS:GO. Weniger aktiv als CS2, aber spielbar .</li>
                    <li><strong>CS:GO (Legacy):</strong> Nur für Offline-Spieler oder Sammler. Multiplayer funktioniert nicht mehr .</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Counter-Strike 2 ist die beste Wahl für neue Spieler. Wer die Geschichte erleben will, kann 1.6 und Source auf Steam ausprobieren – beide sind noch verfügbar .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Recommendation by preference:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Counter-Strike 2:</strong> The current version. Best graphics, active updates, largest player base. Free .</li>
                    <li><strong>Counter-Strike 1.6:</strong> For nostalgics and esports historians. Active community servers, but outdated graphics .</li>
                    <li><strong>Counter-Strike: Source:</strong> Good compromise between 1.6 and CS:GO. Less active than CS2, but playable .</li>
                    <li><strong>CS:GO (Legacy):</strong> Only for offline players or collectors. Multiplayer no longer works .</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Counter-Strike 2 is the best choice for new players. Those who want to experience the history can try 1.6 and Source on Steam – both are still available .</p>
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
            introDe: 'Die wichtigsten Counter-Strike-Aspekte auf einen Blick.',
            introEn: 'The key Counter-Strike aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-crosshairs opacity-70"></i><span>1. Ursprung & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">1999 als Half-Life-Mod. Von Valve übernommen 2000. Eine der einflussreichsten Shooter-Serien aller Zeiten.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-history opacity-70"></i><span>2. Alle Versionen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">1.6 (2000), Condition Zero (2004), Source (2004), Global Offensive (2012), Counter-Strike 2 (2023).</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-trophy opacity-70"></i><span>3. E-Sport</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">CPL, CAL, ESWC in der goldenen Ära. Majors, ESL Pro League, BLAST Premier heute. Millionenpreispools.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>4. Heute spielen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">CS2 ist kostenlos und aktiv. 1.6 und Source noch auf Steam. CS:GO offiziell eingestellt (Legacy-Branch).</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-crosshairs opacity-70"></i><span>1. Origin & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">1999 as a Half-Life mod. Acquired by Valve in 2000. One of the most influential shooter series of all time.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-history opacity-70"></i><span>2. All Versions</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">1.6 (2000), Condition Zero (2004), Source (2004), Global Offensive (2012), Counter-Strike 2 (2023).</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-trophy opacity-70"></i><span>3. Esports</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">CPL, CAL, ESWC in the golden age. Majors, ESL Pro League, BLAST Premier today. Million-dollar prize pools.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>4. Playing Today</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">CS2 is free and active. 1.6 and Source still on Steam. CS:GO officially discontinued (legacy branch).</p>
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
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/730/CounterStrike_2/',              target: '_blank', labelDe: 'Counter-Strike 2 auf Steam',  labelEn: 'Counter-Strike 2 on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/10/CounterStrike/',                target: '_blank', labelDe: 'Counter-Strike 1.6 auf Steam', labelEn: 'Counter-Strike 1.6 on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/240/CounterStrike_Source/',        target: '_blank', labelDe: 'Counter-Strike: Source',      labelEn: 'Counter-Strike: Source' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/80/CounterStrike_Condition_Zero/', target: '_blank', labelDe: 'Condition Zero',             labelEn: 'Condition Zero' },
            { icon: 'fa-book',     href: 'https://blog.counter-strike.net/',                                    target: '_blank', labelDe: 'Counter-Strike Blog',         labelEn: 'Counter-Strike Blog' },
            { icon: 'fa-wrench',   href: 'https://steamcommunity.com/workshop/browse/?appid=730',                target: '_blank', labelDe: 'Steam Workshop',             labelEn: 'Steam Workshop' }
        ]
    },

    footer: {
        textDe: 'Counter-Strike Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Counter-Strike Reference · v1.0 · Dual Lang · 2026'
    }
});