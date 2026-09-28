// resources/topics/topic_stalker.js
// Registers the complete S.T.A.L.K.E.R. franchise reference topic.
// Covers the original trilogy, the Legends of the Zone collection,
// S.T.A.L.K.E.R. 2: Heart of Chornobyl, and the series legacy.
// Loaded via <script> injection.

/* ==================================================================
   S.T.A.L.K.E.R. (SERIES) CODE-BLOCK COPY CONTROLLER
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
    id: 'S.T.A.L.K.E.R. Series Overview',
    icon: 'fa-radiation',
    titleDe: 'S.T.A.L.K.E.R.',
    titleEn: 'S.T.A.L.K.E.R.',
    descDe: 'Die komplette S.T.A.L.K.E.R.-Saga von 2007 bis heute',
    descEn: 'The Complete S.T.A.L.K.E.R. Saga from 2007 to Today',

    sidebarTitleDe: 'S.T.A.L.K.E.R.',
    sidebarTitleEn: 'S.T.A.L.K.E.R.',
    sidebarSubtitleDe: '2007–2026 · GSC Game World · X-Ray, Unreal Engine 5',
    sidebarSubtitleEn: '2007–2026 · GSC Game World · X-Ray, Unreal Engine 5',
    sidebarVersion: 'Zone Trilogy + Heart of Chornobyl',

    hero: {
        titleDe: 'S.T.A.L.K.E.R.: Überleben in der Todeszone',
        titleEn: 'S.T.A.L.K.E.R.: Survival in the Death Zone',
        introDe: `<a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R.</a> ist eine der einzigartigsten Shooter-Serien überhaupt. Seit <strong>2007</strong> erkundet sie die fiktive <strong>Zone von Tschernobyl</strong> – ein Gebiet voller Anomalien, Mutanten, Artefakte und Fraktionen. Entwickelt von <a href="https://www.gsc-game.com/" target="_blank" class="topic-link">GSC Game World</a> in der Ukraine, verbindet die Serie <strong>Ego-Shooter, Survival-Horror, Rollenspiel-Elemente und eine lebendige Spielwelt</strong>. Nach der gefeierten Trilogie (Shadow of Chornobyl, Clear Sky, Call of Prypiat) folgte 2024 der lang erwartete <a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2: Heart of Chornobyl</a> auf Unreal Engine 5. Dieser Guide deckt die komplette Saga ab .`,
        introEn: `<a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R.</a> is one of the most unique shooter series ever created. Since <strong>2007</strong>, it has explored the fictional <strong>Chornobyl Exclusion Zone</strong> – an area full of anomalies, mutants, artifacts, and factions. Developed by <a href="https://www.gsc-game.com/" target="_blank" class="topic-link">GSC Game World</a> in Ukraine, the series blends <strong>first-person shooting, survival horror, RPG elements, and a living game world</strong>. After the acclaimed trilogy (Shadow of Chornobyl, Clear Sky, Call of Prypiat), the long-awaited <a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2: Heart of Chornobyl</a> arrived in 2024 on Unreal Engine 5. This guide covers the complete saga .`
    },

    quickLinks: [
        { icon: 'fa-list',              href: '#section1', switchToDoc: true, labelDe: 'Serie-Überblick', labelEn: 'Series Overview' },
        { icon: 'fa-skull',             href: '#section2', switchToDoc: true, labelDe: 'Shadow of Chornobyl', labelEn: 'Shadow of Chornobyl' },
        { icon: 'fa-cloud-sun',         href: '#section3', switchToDoc: true, labelDe: 'Clear Sky', labelEn: 'Clear Sky' },
        { icon: 'fa-helicopter',        href: '#section4', switchToDoc: true, labelDe: 'Call of Prypiat', labelEn: 'Call of Prypiat' },
        { icon: 'fa-bolt',              href: '#section5', switchToDoc: true, labelDe: 'S.T.A.L.K.E.R. 2', labelEn: 'S.T.A.L.K.E.R. 2' },
        { icon: 'fa-microchip',         href: '#section6', switchToDoc: true, labelDe: 'Engines & Technik', labelEn: 'Engines & Tech' },
        { icon: 'fa-play',              href: '#section7', switchToDoc: true, labelDe: 'Heute spielen', labelEn: 'Playing Today' }
    ],

    sections: [
        /* ============ 1. SERIE-ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Serie-Überblick',
            titleEn: '1. Series Overview',
            introDe: `Die S.T.A.L.K.E.R.-Serie spielt in einer alternativen Realität, in der ein <strong>zweiter nuklearer Unfall 2006</strong> in Tschernobyl die <strong>Zone</strong> erschuf – ein Gebiet voller Anomalien, Mutanten und wertvoller Artefakte . Die Serie umfasst die <strong>Original-Trilogie</strong> (2007–2009), die 2024 als <strong>Legends of the Zone Trilogy</strong> erstmals für Konsolen erschien , und <strong>S.T.A.L.K.E.R. 2: Heart of Chornobyl</strong> (2024), das die Geschichte auf Unreal Engine 5 fortsetzt . Alle Spiele wurden von <a href="https://www.gsc-game.com/" target="_blank" class="topic-link">GSC Game World</a> entwickelt .`,
            introEn: `The S.T.A.L.K.E.R. series is set in an alternate reality where a <strong>second nuclear disaster in 2006</strong> at Chornobyl created <strong>The Zone</strong> – an area full of anomalies, mutants, and valuable artifacts . The series comprises the <strong>original trilogy</strong> (2007–2009), released in 2024 as the <strong>Legends of the Zone Trilogy</strong> for consoles for the first time , and <strong>S.T.A.L.K.E.R. 2: Heart of Chornobyl</strong> (2024), which continues the story on Unreal Engine 5 . All games were developed by <a href="https://www.gsc-game.com/" target="_blank" class="topic-link">GSC Game World</a> .`,
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Die komplette Serie im Überblick',
                    titleEn: 'The Complete Series at a Glance',
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
                    <tr><th class="w-1/5">Spiel</th><th class="w-1/5">Jahr</th><th class="w-1/5">Engine</th><th>Status</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">Shadow of Chornobyl</a></strong></td><td class="text-[var(--text-muted)]">2007</td><td class="text-[var(--text-muted)]">X-Ray 1.0</td><td class="text-[var(--text-muted)]">Kultklassiker, Enhanced Edition (2025)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">Clear Sky</a></strong></td><td class="text-[var(--text-muted)]">2008</td><td class="text-[var(--text-muted)]">X-Ray 1.5</td><td class="text-[var(--text-muted)]">Prequel, Enhanced Edition (2025)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">Call of Prypiat</a></strong></td><td class="text-[var(--text-muted)]">2009</td><td class="text-[var(--text-muted)]">X-Ray 1.6</td><td class="text-[var(--text-muted)]">Abschluss der Trilogie, Enhanced Edition (2025)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2</a></strong></td><td class="text-[var(--text-muted)]">2024</td><td class="text-[var(--text-muted)]">Unreal Engine 5</td><td class="text-[var(--text-muted)]">Über 1 Mio. verkaufte Einheiten </td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Konsolen:</strong> Die Trilogie erschien 2024 als <strong>Legends of the Zone Trilogy</strong> für PS4, Xbox One und Switch . S.T.A.L.K.E.R. 2 erschien 2024 für PC und Xbox Series X/S, <strong>PS5-Version folgte am 20. November 2025</strong> .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Game</th><th class="w-1/5">Year</th><th class="w-1/5">Engine</th><th>Status</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">Shadow of Chornobyl</a></strong></td><td class="text-[var(--text-muted)]">2007</td><td class="text-[var(--text-muted)]">X-Ray 1.0</td><td class="text-[var(--text-muted)]">Cult classic, Enhanced Edition (2025)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">Clear Sky</a></strong></td><td class="text-[var(--text-muted)]">2008</td><td class="text-[var(--text-muted)]">X-Ray 1.5</td><td class="text-[var(--text-muted)]">Prequel, Enhanced Edition (2025)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">Call of Prypiat</a></strong></td><td class="text-[var(--text-muted)]">2009</td><td class="text-[var(--text-muted)]">X-Ray 1.6</td><td class="text-[var(--text-muted)]">Trilogy conclusion, Enhanced Edition (2025)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2</a></strong></td><td class="text-[var(--text-muted)]">2024</td><td class="text-[var(--text-muted)]">Unreal Engine 5</td><td class="text-[var(--text-muted)]">Over 1 million copies sold </td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Consoles:</strong> The trilogy was released in 2024 as the <strong>Legends of the Zone Trilogy</strong> for PS4, Xbox One, and Switch . S.T.A.L.K.E.R. 2 launched in 2024 for PC and Xbox Series X/S, with the <strong>PS5 version following on November 20, 2025</strong> .</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Die wichtigsten Fraktionen',
                    titleEn: 'The Main Factions',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Fraktion</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Loners" target="_blank" class="topic-link">Loners (Einzelgänger)</a></strong></td><td class="text-[var(--text-muted)]">Unabhängige Stalker ohne feste Fraktion. Die häufigste Gruppe in der Zone .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Duty" target="_blank" class="topic-link">Duty (Pflicht)</a></strong></td><td class="text-[var(--text-muted)]">Militärisch organisierte Fraktion, die die Zone vernichten will. Feinde der Freedom .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Freedom" target="_blank" class="topic-link">Freedom (Freiheit)</a></strong></td><td class="text-[var(--text-muted)]">Anarchistische Fraktion, die die Zone erforschen und erhalten will. Gegner von Duty .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Clear_Sky" target="_blank" class="topic-link">Clear Sky</a></strong></td><td class="text-[var(--text-muted)]">Wissenschaftler-Fraktion, die die Emissionen der Zone erforscht. Protagonist in Clear Sky .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Monolith" target="_blank" class="topic-link">Monolith</a></strong></td><td class="text-[var(--text-muted)]">Fanatische Fraktion, die den „Wish Granter" anbetet. Feinde aller anderen Fraktionen .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Bandits" target="_blank" class="topic-link">Banditen</a></strong></td><td class="text-[var(--text-muted)]">Kriminelle, die Stalker ausrauben. Feinde der meisten Fraktionen .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Mercenaries" target="_blank" class="topic-link">Söldner</a></strong></td><td class="text-[var(--text-muted)]">Professionelle Kämpfer, oft im Auftrag externer Interessen .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Military" target="_blank" class="topic-link">Militär</a></strong></td><td class="text-[var(--text-muted)]">Ukrainische Streitkräfte, die die Zone abschirmen. Feinde aller Stalker .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Faction</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Loners" target="_blank" class="topic-link">Loners</a></strong></td><td class="text-[var(--text-muted)]">Independent stalkers without a fixed faction. The most common group in the Zone .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Duty" target="_blank" class="topic-link">Duty</a></strong></td><td class="text-[var(--text-muted)]">Militarily organized faction that wants to destroy the Zone. Enemies of Freedom .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Freedom" target="_blank" class="topic-link">Freedom</a></strong></td><td class="text-[var(--text-muted)]">Anarchist faction that wants to research and preserve the Zone. Opponents of Duty .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Clear_Sky" target="_blank" class="topic-link">Clear Sky</a></strong></td><td class="text-[var(--text-muted)]">Scientist faction that researches the Zone's emissions. Protagonist in Clear Sky .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Monolith" target="_blank" class="topic-link">Monolith</a></strong></td><td class="text-[var(--text-muted)]">Fanatic faction that worships the "Wish Granter." Enemies of all other factions .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Bandits" target="_blank" class="topic-link">Bandits</a></strong></td><td class="text-[var(--text-muted)]">Criminals who rob stalkers. Enemies of most factions .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Mercenaries" target="_blank" class="topic-link">Mercenaries</a></strong></td><td class="text-[var(--text-muted)]">Professional fighters, often working for outside interests .</td></tr>
                    <tr><td><strong><a href="https://stalker.fandom.com/wiki/Military" target="_blank" class="topic-link">Military</a></strong></td><td class="text-[var(--text-muted)]">Ukrainian armed forces cordoning off the Zone. Enemies of all stalkers .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. SHADOW OF CHORNOBYL ============ */
        {
            id: 'section2',
            titleDe: '2. Shadow of Chornobyl (2007)',
            titleEn: '2. Shadow of Chornobyl (2007)',
            introDe: `<a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R.: Shadow of Chornobyl</a> erschien am <strong>20. März 2007</strong> und legte den Grundstein für die Serie. Man spielt den <strong>„Marked One"</strong> – einen Stalker mit Amnesie, dessen einzige Spur ein PDA-Eintrag ist: <strong>„Töte Strelok"</strong> . Das Spiel spielt im Jahr <strong>2012</strong>, sechs Jahre nach dem zweiten Unfall . Die <strong>X-Ray-Engine</strong> mit ihrer <strong>A-Life-Simulation</strong> revolutionierte die Spielwelt: NPCs leben ihr eigenes Leben, kämpfen, patrouillieren und sterben auch ohne den Spieler .`,
            introEn: `<a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R.: Shadow of Chornobyl</a> was released on <strong>March 20, 2007</strong> and laid the foundation for the series. You play the <strong>"Marked One"</strong> – a stalker with amnesia whose only clue is a PDA entry: <strong>"Kill Strelok"</strong> . The game is set in <strong>2012</strong>, six years after the second disaster . The <strong>X-Ray engine</strong> with its <strong>A-Life simulation</strong> revolutionized the game world: NPCs live their own lives, fight, patrol, and die without the player .`,
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Story & Kern',
                    titleEn: 'Story & Core',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Handlung:</strong> Der Marked One erwacht in einem Konvoi voller toter Stalker. Sidorovich, ein Händler, findet einen PDA mit der Nachricht „Töte Strelok" . Die Reise führt durch die Zone: <strong>Agroprom</strong>, <strong>Lab X-18</strong> (Brain Scorcher), <strong>Lab X-16</strong>, <strong>Yantar</strong>, bis zum <strong>Tschernobyl-Kraftwerk</strong>. Am Ende offenbart sich der <strong>„Common Consciousness"</strong> – eine Intelligenz, die die Experimente der Zone steuert. Der Marked One ist in Wahrheit <strong>Strelok</strong> selbst .</p>
                    <p class="mb-2 mt-3"><strong>Die wichtigsten Features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>A-Life-Simulation:</strong> NPCs und Mutanten existieren unabhängig vom Spieler </li>
                    <li><strong>Anomalien & Artefakte:</strong> Gefährliche Zonen, die wertvolle Gegenstände freigeben</li>
                    <li><strong>Survival-Mechaniken:</strong> Hunger, Strahlung, Blutung, Müdigkeit</li>
                    <li><strong>Nichtlineare Erkundung:</strong> Große Karten, freies Gameplay</li>
                    </ul>
                    <p class="mt-3"><strong>Legacy:</strong> Shadow of Chornobyl wurde zum <strong>Kultklassiker</strong>, war aber berüchtigt für seine <strong>Bugs</strong> . Die Community entwickelte zahlreiche Mods, die das Spiel bis heute am Leben halten .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The plot:</strong> The Marked One wakes up in a convoy full of dead stalkers. Sidorovich, a trader, finds a PDA with the message "Kill Strelok" . The journey leads through the Zone: <strong>Agroprom</strong>, <strong>Lab X-18</strong> (Brain Scorcher), <strong>Lab X-16</strong>, <strong>Yantar</strong>, to the <strong>Chornobyl Nuclear Power Plant</strong>. At the end, the <strong>"Common Consciousness"</strong> reveals itself – an intelligence that controls the Zone's experiments. The Marked One is actually <strong>Strelok</strong> himself .</p>
                    <p class="mb-2 mt-3"><strong>The key features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>A-Life simulation:</strong> NPCs and mutants exist independently of the player </li>
                    <li><strong>Anomalies & Artifacts:</strong> Dangerous zones that release valuable items</li>
                    <li><strong>Survival mechanics:</strong> Hunger, radiation, bleeding, fatigue</li>
                    <li><strong>Non-linear exploration:</strong> Large maps, free gameplay</li>
                    </ul>
                    <p class="mt-3"><strong>Legacy:</strong> Shadow of Chornobyl became a <strong>cult classic</strong> but was infamous for its <strong>bugs</strong> . The community developed numerous mods that keep the game alive to this day .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Warum es heute noch wichtig ist',
                    titleEn: 'Why It Still Matters Today',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Shadow of Chornobyl ist mehr als ein Shooter:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Atmosphäre:</strong> Die Zone ist kein Level, sondern ein <strong>Ort</strong> – mit Wetter, Tageszeiten, Geräuschen und einer ständigen Bedrohung .</li>
                    <li><strong>A-Life:</strong> Die Simulation war 2007 einzigartig. Sie macht jede Spielsession anders .</li>
                    <li><strong>Fotorealistische Texturen:</strong> GSC nutzte <strong>echte Fotos</strong> aus Tschernobyl für die Umgebung – Jahre vor dem Begriff „Photogrammetrie" .</li>
                    <li><strong>Modding:</strong> Die <strong>S.T.A.L.K.E.R.-Modding-Szene</strong> ist eine der aktivsten überhaupt. Mods wie <em>Anomaly</em>, <em>G.A.M.M.A.</em> oder <em>Radiophobia</em> erweitern das Spiel massiv .</li>
                    <li><strong>Enhanced Edition (2025):</strong> Die <strong>Legends of the Zone Trilogy – Enhanced Edition</strong> brachte 64-Bit-Support, moderne Shader und DX11/12-Kompatibilität .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Shadow of Chornobyl is more than a shooter:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Atmosphere:</strong> The Zone is not a level but a <strong>place</strong> – with weather, day-night cycles, sounds, and a constant threat .</li>
                    <li><strong>A-Life:</strong> The simulation was unique in 2007. It makes every play session different .</li>
                    <li><strong>Photorealistic textures:</strong> GSC used <strong>real photos</strong> from Chornobyl for the environment – years before the term "photogrammetry" .</li>
                    <li><strong>Modding:</strong> The <strong>S.T.A.L.K.E.R. modding scene</strong> is one of the most active ever. Mods like <em>Anomaly</em>, <em>G.A.M.M.A.</em>, or <em>Radiophobia</em> massively expand the game .</li>
                    <li><strong>Enhanced Edition (2025):</strong> The <strong>Legends of the Zone Trilogy – Enhanced Edition</strong> brought 64-bit support, modern shaders, and DX11/12 compatibility .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. CLEAR SKY ============ */
        {
            id: 'section3',
            titleDe: '3. Clear Sky (2008)',
            titleEn: '3. Clear Sky (2008)',
            introDe: `<a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">S.T.A.L.K.E.R.: Clear Sky</a> erschien am <strong>15. September 2008</strong> und ist ein <strong>Prequel</strong> zu Shadow of Chornobyl . Man spielt <strong>Scar</strong>, einen Söldner, der von der Fraktion <strong>Clear Sky</strong> rekrutiert wird, um die <strong>Emissionen</strong> der Zone zu erforschen . Das Spiel führt ein <strong>Fraktionskrieg-System</strong> ein: Fraktionen kämpfen um Territorien, und der Spieler kann sich anschließen .`,
            introEn: `<a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">S.T.A.L.K.E.R.: Clear Sky</a> was released on <strong>September 15, 2008</strong> and is a <strong>prequel</strong> to Shadow of Chornobyl . You play <strong>Scar</strong>, a mercenary recruited by the <strong>Clear Sky</strong> faction to research the Zone's <strong>emissions</strong> . The game introduces a <strong>faction war system</strong>: factions fight over territories, and the player can join them .`,
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Story & Neuerungen',
                    titleEn: 'Story & Innovations',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Handlung:</strong> Scar begleitet Wissenschaftler durch die Sümpfe, als eine <strong>Emission</strong> ausbricht – alle sterben, nur Scar überlebt. Clear Sky rekrutiert ihn, um herauszufinden, warum die Emissionen häufiger werden. Die Spur führt zu <strong>Strelok</strong>, der versucht, das Zentrum der Zone zu erreichen .</p>
                    <p class="mb-2 mt-3"><strong>Neue Features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Fraktionskrieg:</strong> Fraktionen kämpfen um Kontrollpunkte und Basen </li>
                    <li><strong>Waffen- und Rüstungs-Upgrades:</strong> Erstmals können Ausrüstungsteile verbessert werden</li>
                    <li><strong>X-Ray 1.5:</strong> Volumetrisches Licht, dynamischer Rauch, weiches Wasser, Sonnenstrahlen </li>
                    <li><strong>Neue Gebiete:</strong> Sümpfe, Roter Wald, Limansk</li>
                    </ul>
                    <p class="mt-3"><strong>Kritik:</strong> Clear Sky war technisch ehrgeizig, aber <strong>noch buggy</strong> als der Vorgänger und wurde etwas weniger positiv aufgenommen . Die Fraktionskrieg-Mechanik war innovativ, aber nicht immer ausgereift .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The plot:</strong> Scar escorts scientists through the swamps when an <strong>emission</strong> occurs – everyone dies, only Scar survives. Clear Sky recruits him to find out why the emissions are becoming more frequent. The trail leads to <strong>Strelok</strong>, who is trying to reach the center of the Zone .</p>
                    <p class="mb-2 mt-3"><strong>New features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Faction war:</strong> Factions fight over checkpoints and bases </li>
                    <li><strong>Weapon and armor upgrades:</strong> For the first time, equipment can be improved</li>
                    <li><strong>X-Ray 1.5:</strong> Volumetric light, dynamic smoke, soft water, sunbeams </li>
                    <li><strong>New areas:</strong> Swamps, Red Forest, Limansk</li>
                    </ul>
                    <p class="mt-3"><strong>Criticism:</strong> Clear Sky was technically ambitious but <strong>even buggier</strong> than its predecessor and was received slightly less favorably . The faction war mechanic was innovative but not always polished .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. CALL OF PRYPIAT ============ */
        {
            id: 'section4',
            titleDe: '4. Call of Prypiat (2009)',
            titleEn: '4. Call of Prypiat (2009)',
            introDe: `<a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">S.T.A.L.K.E.R.: Call of Prypiat</a> erschien am <strong>2. Oktober 2009</strong> (Steam: 11. Februar 2010 ) und ist der <strong>direkte Nachfolger</strong> von Shadow of Chornobyl . Man spielt <strong>Major Alexander Degtyarev</strong>, der den Absturz von Militärhubschraubern in der Zone untersucht . Viele Fans betrachten es als das <strong>beste Spiel der Trilogie</strong> – stabiler, offener und mit ausgereifteren Mechaniken .`,
            introEn: `<a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">S.T.A.L.K.E.R.: Call of Prypiat</a> was released on <strong>October 2, 2009</strong> (Steam: February 11, 2010 ) and is the <strong>direct sequel</strong> to Shadow of Chornobyl . You play <strong>Major Alexander Degtyarev</strong>, who investigates the crash of military helicopters in the Zone . Many fans consider it the <strong>best game in the trilogy</strong> – more stable, more open, and with more refined mechanics .`,
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Story & Verbesserungen',
                    titleEn: 'Story & Improvements',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Handlung:</strong> Degtyarev infiltriert die Zone undercover, um den Absturz von fünf Militärhubschraubern zu untersuchen – Teil der Operation <strong>„Fairway"</strong>. Die Suche führt ihn durch <strong>Zaton</strong>, <strong>Jupiter</strong> und <strong>Pripyat</strong> .</p>
                    <p class="mb-2 mt-3"><strong>Verbesserungen gegenüber den Vorgängern:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Stabiler:</strong> Weniger Bugs, bessere Performance </li>
                    <li><strong>Überarbeitete UI:</strong> Moderneres Interface, klarer </li>
                    <li><strong>Safe Zones:</strong> Bereiche, in denen Gewalt verboten ist, als Quest-Hubs </li>
                    <li><strong>Neue Gebiete:</strong> Zaton, Jupiter, Pripyat (die Stadt!)</li>
                    <li><strong>X-Ray 1.6:</strong> DirectX 11, HDAO, volumetrisches Licht </li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Call of Prypiat gilt als <strong>technisch ausgereiftester Teil</strong> der Trilogie und als <strong>bester Einstiegspunkt</strong> für Neueinsteiger, die nicht mit den Bugs von 2007 kämpfen wollen .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The plot:</strong> Degtyarev infiltrates the Zone undercover to investigate the crash of five military helicopters – part of Operation <strong>"Fairway."</strong> The search leads him through <strong>Zaton</strong>, <strong>Jupiter</strong>, and <strong>Pripyat</strong> .</p>
                    <p class="mb-2 mt-3"><strong>Improvements over predecessors:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>More stable:</strong> Fewer bugs, better performance </li>
                    <li><strong>Overhauled UI:</strong> More modern interface, clearer </li>
                    <li><strong>Safe Zones:</strong> Areas where violence is prohibited, acting as quest hubs </li>
                    <li><strong>New areas:</strong> Zaton, Jupiter, Pripyat (the city!)</li>
                    <li><strong>X-Ray 1.6:</strong> DirectX 11, HDAO, volumetric lighting </li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Call of Prypiat is considered the <strong>technically most refined part</strong> of the trilogy and the <strong>best entry point</strong> for newcomers who don't want to deal with the bugs of 2007 .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. S.T.A.L.K.E.R. 2 ============ */
        {
            id: 'section5',
            titleDe: '5. S.T.A.L.K.E.R. 2: Heart of Chornobyl (2024)',
            titleEn: '5. S.T.A.L.K.E.R. 2: Heart of Chornobyl (2024)',
            introDe: `<a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2: Heart of Chornobyl</a> erschien am <strong>20. November 2024</strong> – <strong>15 Jahre nach dem letzten Serienteil</strong> . Die Entwicklung war von <strong>Pandemie, Umzug, Cyberangriffen</strong> und dem <strong>Krieg in der Ukraine</strong> geprägt . Das Spiel wechselte von der <strong>X-Ray-Engine</strong> zu <strong>Unreal Engine 5</strong> und bietet eine <strong>64 km² große, nahtlose Open World</strong> . Über <strong>1 Million Einheiten</strong> wurden verkauft .`,
            introEn: `<a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2: Heart of Chornobyl</a> was released on <strong>November 20, 2024</strong> – <strong>15 years after the last series entry</strong> . Development was shaped by <strong>the pandemic, relocation, cyberattacks</strong>, and the <strong>war in Ukraine</strong> . The game switched from the <strong>X-Ray engine</strong> to <strong>Unreal Engine 5</strong> and offers a <strong>64 km² seamless open world</strong> . Over <strong>1 million copies</strong> were sold .`,
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Story & Features',
                    titleEn: 'Story & Features',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Handlung:</strong> Man spielt <strong>Skif</strong>, einen einsamen Stalker, der durch unvorhergesehene Ereignisse in die Zone gezogen wird. Auf dem Weg zum <strong>Herz von Tschernobyl</strong> deckt er die Geheimnisse der Zone auf, erkundet das Machtgleichgewicht der Fraktionen und kämpft ums Überleben . Die Geschichte ist <strong>nichtlinear</strong> mit <strong>mehreren Enden</strong> .</p>
                    <p class="mb-2 mt-3"><strong>Key Features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Unreal Engine 5:</strong> Nanite, Lumen, World Partition für fotorealistische Grafik </li>
                    <li><strong>A-Life 2.0:</strong> Weiterentwickelte Simulation für lebendige Welt </li>
                    <li><strong>64 km² Open World:</strong> Nahtlose Zone ohne Ladebildschirme </li>
                    <li><strong>30+ Waffen:</strong> Hunderte Modifikationskombinationen </li>
                    <li><strong>Legendäre Mutanten:</strong> Verschiedene Untertypen mit unterschiedlichem Verhalten </li>
                    <li><strong>Survival-Mechaniken:</strong> Hunger, Schlaf, Blutung, Strahlung </li>
                    <li><strong>Mod-Support:</strong> Offiziell unterstützt </li>
                    <li><strong>Multiplayer:</strong> Wird als kostenloses Update nachgereicht </li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The plot:</strong> You play <strong>Skif</strong>, a lone stalker drawn into the Zone by unforeseen events. On the way to the <strong>Heart of Chornobyl</strong>, he uncovers the Zone's secrets, explores the balance of power between factions, and fights to survive . The story is <strong>non-linear</strong> with <strong>multiple endings</strong> .</p>
                    <p class="mb-2 mt-3"><strong>Key Features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Unreal Engine 5:</strong> Nanite, Lumen, World Partition for photorealistic graphics </li>
                    <li><strong>A-Life 2.0:</strong> Evolved simulation for a living world </li>
                    <li><strong>64 km² open world:</strong> Seamless Zone without loading screens </li>
                    <li><strong>30+ weapons:</strong> Hundreds of modification combinations </li>
                    <li><strong>Legendary mutants:</strong> Different subtypes with varied behavior </li>
                    <li><strong>Survival mechanics:</strong> Hunger, sleep, bleeding, radiation </li>
                    <li><strong>Mod support:</strong> Officially supported </li>
                    <li><strong>Multiplayer:</strong> To be added as a free update </li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Technische Entwicklung & Update 2.0',
                    titleEn: 'Technical Evolution & Update 2.0',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Von X-Ray zu Unreal Engine 5:</strong> Nach drei Spielen auf der eigenen <strong>X-Ray-Engine</strong> wechselte GSC für S.T.A.L.K.E.R. 2 zu <strong>Unreal Engine 5</strong> . Die Entwickler nutzten <strong>Nanite</strong> für Geometrie, <strong>Lumen</strong> für Beleuchtung und <strong>World Partition</strong> für die nahtlose Open World .</p>
                    <p class="mb-2 mt-3"><strong>Update 2.0 (2026):</strong> Im August 2026 veröffentlichte GSC ein großes technisches Update:</p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Umstieg auf Unreal Engine 5.5:</strong> Verbesserte Shader-Kompilierung und Performance </li>
                    <li><strong>Riesiger Download:</strong> 117 GB auf Steam – praktisch eine Neuinstallation </li>
                    <li><strong>A-Life 2.0-Fixes:</strong> KI-Verhalten und Speicherlecks behoben </li>
                    <li><strong>PS5-Version:</strong> Erschien am 20. November 2025 </li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>From X-Ray to Unreal Engine 5:</strong> After three games on its own <strong>X-Ray engine</strong>, GSC switched to <strong>Unreal Engine 5</strong> for S.T.A.L.K.E.R. 2 . The developers used <strong>Nanite</strong> for geometry, <strong>Lumen</strong> for lighting, and <strong>World Partition</strong> for the seamless open world .</p>
                    <p class="mb-2 mt-3"><strong>Update 2.0 (2026):</strong> In August 2026, GSC released a major technical update:</p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Upgrade to Unreal Engine 5.5:</strong> Improved shader compilation and performance </li>
                    <li><strong>Massive download:</strong> 117 GB on Steam – practically a reinstall </li>
                    <li><strong>A-Life 2.0 fixes:</strong> AI behavior and memory leaks addressed </li>
                    <li><strong>PS5 version:</strong> Released on November 20, 2025 </li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. ENGINES & TECHNIK ============ */
        {
            id: 'section6',
            titleDe: '6. Engines & Technik',
            titleEn: '6. Engines & Tech',
            introDe: `Die S.T.A.L.K.E.R.-Serie wurde auf <strong>zwei Engines</strong> entwickelt: <strong>X-Ray</strong> für die Original-Trilogie (2007–2009) und <strong>Unreal Engine 5</strong> für S.T.A.L.K.E.R. 2 (2024). Jede Engine brachte eigene technische Besonderheiten mit sich .`,
            introEn: `The S.T.A.L.K.E.R. series was developed on <strong>two engines</strong>: <strong>X-Ray</strong> for the original trilogy (2007–2009) and <strong>Unreal Engine 5</strong> for S.T.A.L.K.E.R. 2 (2024). Each engine brought its own technical characteristics .`,
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'X-Ray Engine (2007–2009)',
                    titleEn: 'X-Ray Engine (2007–2009)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>GSCs eigene Engine, entwickelt für Shadow of Chornobyl.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>X-Ray 1.0 (2007):</strong> HDR-Rendering, Parallax- und Normal-Mapping, weiche Schatten, Motion Blur, Wettereffekte, Tag/Nacht-Zyklus </li>
                    <li><strong>X-Ray 1.5 (2008):</strong> Volumetrisches Licht, dynamischer Rauch, volumetrisches Feuer, weiches Wasser, Depth of Field, SSAO, DirectX 10 </li>
                    <li><strong>X-Ray 1.6 (2009):</strong> DirectX 11, HDAO (verbessertes SSAO), partielle Tessellation, volumetrische Beleuchtung </li>
                    <li><strong>A-Life:</strong> Die Kern-Technologie der Serie. NPCs existieren außerhalb des Spieler-Sichtfelds und interagieren miteinander </li>
                    <li><strong>Enhanced Edition (2025):</strong> 64-Bit-Support, moderne Shader, DX11/12-Kompatibilität für die Legends of the Zone Trilogy </li>
                    </ul>
                    <p class="mt-3"><strong>Verwendet für:</strong> Shadow of Chornobyl, Clear Sky, Call of Prypiat .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>GSC's own engine, developed for Shadow of Chornobyl.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>X-Ray 1.0 (2007):</strong> HDR rendering, parallax and normal mapping, soft shadows, motion blur, weather effects, day/night cycle </li>
                    <li><strong>X-Ray 1.5 (2008):</strong> Volumetric light, dynamic smoke, volumetric fire, soft water, depth of field, SSAO, DirectX 10 </li>
                    <li><strong>X-Ray 1.6 (2009):</strong> DirectX 11, HDAO (improved SSAO), partial tessellation, volumetric lighting </li>
                    <li><strong>A-Life:</strong> The series' core technology. NPCs exist outside the player's view and interact with each other </li>
                    <li><strong>Enhanced Edition (2025):</strong> 64-bit support, modern shaders, DX11/12 compatibility for the Legends of the Zone Trilogy </li>
                    </ul>
                    <p class="mt-3"><strong>Used for:</strong> Shadow of Chornobyl, Clear Sky, Call of Prypiat .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Unreal Engine 5 (2024)',
                    titleEn: 'Unreal Engine 5 (2024)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Epic Games' moderne Engine, verwendet für S.T.A.L.K.E.R. 2.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Nanite:</strong> Virtuelle Geometrie für extreme Detaildichte ohne Performance-Verlust </li>
                    <li><strong>Lumen:</strong> Dynamische globale Beleuchtung und Reflexionen </li>
                    <li><strong>World Partition:</strong> Nahtlose Open World ohne Ladebildschirme </li>
                    <li><strong>Photogrammetrie:</strong> Echte Fotos aus der Tschernobyl-Zone für authentische Umgebungen </li>
                    <li><strong>A-Life 2.0:</strong> Weiterentwickelte Simulation für lebendigere Welt </li>
                    <li><strong>Update 2.0 (2026):</strong> Umstieg auf UE 5.5 für bessere Stabilität und Performance </li>
                    </ul>
                    <p class="mt-3"><strong>Verwendet für:</strong> S.T.A.L.K.E.R. 2: Heart of Chornobyl .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Epic Games' modern engine, used for S.T.A.L.K.E.R. 2.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Nanite:</strong> Virtualized geometry for extreme detail density without performance loss </li>
                    <li><strong>Lumen:</strong> Dynamic global illumination and reflections </li>
                    <li><strong>World Partition:</strong> Seamless open world without loading screens </li>
                    <li><strong>Photogrammetry:</strong> Real photos from the Chornobyl Zone for authentic environments </li>
                    <li><strong>A-Life 2.0:</strong> Evolved simulation for a more living world </li>
                    <li><strong>Update 2.0 (2026):</strong> Upgrade to UE 5.5 for better stability and performance </li>
                    </ul>
                    <p class="mt-3"><strong>Used for:</strong> S.T.A.L.K.E.R. 2: Heart of Chornobyl .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 7. HEUTE SPIELEN ============ */
        {
            id: 'section7',
            titleDe: '7. S.T.A.L.K.E.R. heute spielen',
            titleEn: '7. Playing S.T.A.L.K.E.R. Today',
            introDe: `Alle S.T.A.L.K.E.R.-Spiele sind auf <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>, GOG und Epic Games Store erhältlich . Die Original-Trilogie ist dank der <strong>Legends of the Zone Trilogy</strong> auch auf Konsolen (PS4, Xbox One, Switch) spielbar . S.T.A.L.K.E.R. 2 ist auf PC, Xbox Series X/S und seit November 2025 auch auf PS5 verfügbar . Die Serie ist für ihre <strong>Modding-Szene</strong> berühmt – unzählige Mods erweitern die Spiele erheblich .`,
            introEn: `All S.T.A.L.K.E.R. games are available on <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>, GOG, and Epic Games Store . The original trilogy is also playable on consoles (PS4, Xbox One, Switch) thanks to the <strong>Legends of the Zone Trilogy</strong> . S.T.A.L.K.E.R. 2 is available on PC, Xbox Series X/S, and since November 2025 also on PS5 . The series is famous for its <strong>modding scene</strong> – countless mods significantly expand the games .`,
            subtopics: [
                {
                    id: 'subsection7_1',
                    titleDe: 'Kaufempfehlung',
                    titleEn: 'Buying Recommendation',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Spiel</th><th>Empfehlung</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">Shadow of Chornobyl</a></strong></td><td class="text-[var(--text-muted)]">Der Klassiker, der alles begann. Atmosphärisch, aber buggy. Mit Mods heute noch großartig .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">Clear Sky</a></strong></td><td class="text-[var(--text-muted)]">Prequel mit Fraktionskrieg. Wichtig für die Lore, aber der schwächste Teil der Trilogie .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">Call of Prypiat</a></strong></td><td class="text-[var(--text-muted)]">Technisch ausgereiftester Teil. <strong>Bester Einstieg</strong> für Neueinsteiger .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2</a></strong></td><td class="text-[var(--text-muted)]">Modernes Erlebnis auf UE5. Über 1 Mio. verkauft. Mit Update 2.0 deutlich verbessert .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Game</th><th>Recommendation</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">Shadow of Chornobyl</a></strong></td><td class="text-[var(--text-muted)]">The classic that started it all. Atmospheric but buggy. Still great with mods today .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">Clear Sky</a></strong></td><td class="text-[var(--text-muted)]">Prequel with faction war. Important for lore but the weakest entry in the trilogy .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">Call of Prypiat</a></strong></td><td class="text-[var(--text-muted)]">Technically most refined entry. <strong>Best starting point</strong> for newcomers .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/" target="_blank" class="topic-link">S.T.A.L.K.E.R. 2</a></strong></td><td class="text-[var(--text-muted)]">Modern experience on UE5. Over 1M sold. Significantly improved with Update 2.0 .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection7_2',
                    titleDe: 'Spielreihenfolge',
                    titleEn: 'Play Order',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Empfohlene Reihenfolge (Release-Order):</strong></p>
                    <ol class="list-decimal pl-4 space-y-1 mt-1">
                    <li><strong>Shadow of Chornobyl (2007):</strong> Bietet die beste Einführung in Setting und Fraktionen </li>
                    <li><strong>Clear Sky (2008):</strong> Prequel, das den Kontext erweitert </li>
                    <li><strong>Call of Prypiat (2009):</strong> Schließt die Trilogie ab </li>
                    <li><strong>S.T.A.L.K.E.R. 2 (2024):</strong> Setzt die Geschichte fort</li>
                    </ol>
                    <p class="mt-3"><strong>Alternative (chronologisch):</strong> Clear Sky → Shadow of Chornobyl → Call of Prypiat → S.T.A.L.K.E.R. 2 </p>
                    <p class="mt-3"><strong>Warnung:</strong> Nicht mit Call of Prypiat beginnen – wichtige Story-Elemente ergeben ohne Shadow of Chornobyl wenig Sinn  .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Recommended order (release order):</strong></p>
                    <ol class="list-decimal pl-4 space-y-1 mt-1">
                    <li><strong>Shadow of Chornobyl (2007):</strong> Offers the best introduction to setting and factions </li>
                    <li><strong>Clear Sky (2008):</strong> Prequel that expands context </li>
                    <li><strong>Call of Prypiat (2009):</strong> Concludes the trilogy </li>
                    <li><strong>S.T.A.L.K.E.R. 2 (2024):</strong> Continues the story</li>
                    </ol>
                    <p class="mt-3"><strong>Alternative (chronological):</strong> Clear Sky → Shadow of Chornobyl → Call of Prypiat → S.T.A.L.K.E.R. 2 </p>
                    <p class="mt-3"><strong>Warning:</strong> Don't start with Call of Prypiat – key story elements make little sense without Shadow of Chornobyl  .</p>
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
            introDe: `Die wichtigsten S.T.A.L.K.E.R.-Aspekte auf einen Blick.`,
            introEn: `The key S.T.A.L.K.E.R. aspects at a glance.`,
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-radiation opacity-70"></i><span>1. Die Zone</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Fiktive Tschernobyl-Zone mit Anomalien, Mutanten und Artefakten. Ein Ort, der lebt und tötet .</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-skull opacity-70"></i><span>2. Die Trilogie</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">Shadow of Chornobyl</a> (2007), <a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">Clear Sky</a> (2008), <a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">Call of Prypiat</a> (2009). X-Ray-Engine, A-Life-Simulation .</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-bolt opacity-70"></i><span>3. S.T.A.L.K.E.R. 2</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">2024 auf Unreal Engine 5. 64 km² Open World, A-Life 2.0, über 1 Mio. verkauft .</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>4. Spielen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Trilogie auf PC, PS4, Xbox One, Switch . S.T.A.L.K.E.R. 2 auf PC, Xbox Series, PS5 . Modding-Szene riesig .</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-radiation opacity-70"></i><span>1. The Zone</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Fictional Chornobyl Zone with anomalies, mutants, and artifacts. A place that lives and kills .</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-skull opacity-70"></i><span>2. The Trilogy</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/" target="_blank" class="topic-link">Shadow of Chornobyl</a> (2007), <a href="https://store.steampowered.com/app/20510/STALKER_Clear_Sky/" target="_blank" class="topic-link">Clear Sky</a> (2008), <a href="https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/" target="_blank" class="topic-link">Call of Prypiat</a> (2009). X-Ray engine, A-Life simulation .</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-bolt opacity-70"></i><span>3. S.T.A.L.K.E.R. 2</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">2024 on Unreal Engine 5. 64 km² open world, A-Life 2.0, over 1M copies sold .</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>4. Playing</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Trilogy on PC, PS4, Xbox One, Switch . S.T.A.L.K.E.R. 2 on PC, Xbox Series, PS5 . Huge modding scene .</p>
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
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/4500/STALKER_Shadow_of_Chernobyl/',     target: '_blank', labelDe: 'Shadow of Chornobyl auf Steam',     labelEn: 'Shadow of Chornobyl on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/20510/STALKER_Clear_Sky/',               target: '_blank', labelDe: 'Clear Sky auf Steam',                 labelEn: 'Clear Sky on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/41700/STALKER_Call_of_Pripyat/',         target: '_blank', labelDe: 'Call of Prypiat auf Steam',           labelEn: 'Call of Prypiat on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/',  target: '_blank', labelDe: 'S.T.A.L.K.E.R. 2 auf Steam',          labelEn: 'S.T.A.L.K.E.R. 2 on Steam' },
            { icon: 'fa-globe',    href: 'https://www.gsc-game.com/',                                                  target: '_blank', labelDe: 'GSC Game World',                      labelEn: 'GSC Game World' },
            { icon: 'fa-book',     href: 'https://stalker.fandom.com/',                                                target: '_blank', labelDe: 'S.T.A.L.K.E.R. Wiki',                 labelEn: 'S.T.A.L.K.E.R. Wiki' },
            { icon: 'fa-code',     href: 'https://github.com/topics/stalker',                                          target: '_blank', labelDe: 'S.T.A.L.K.E.R. Mods (GitHub)',        labelEn: 'S.T.A.L.K.E.R. Mods (GitHub)' }
        ]
    },

    footer: {
        textDe: 'S.T.A.L.K.E.R. Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'S.T.A.L.K.E.R. Reference · v1.0 · Dual Lang · 2026'
    }
});