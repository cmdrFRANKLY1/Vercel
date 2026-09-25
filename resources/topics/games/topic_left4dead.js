// resources/topics/topic_left4dead.js
// Registers the complete Left 4 Dead franchise reference topic.
// Covers Left 4 Dead 1, Left 4 Dead 2, all DLCs, campaigns,
// Infected, game modes, and the entire L4D legacy.
// Loaded via <script> injection.

/* ==================================================================
   LEFT 4 DEAD (SERIES) CODE-BLOCK COPY CONTROLLER
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
    id: 'Left 4 Dead Series Overview',
    icon: 'fa-biohazard',
    titleDe: 'Left 4 Dead',
    titleEn: 'Left 4 Dead',
    descDe: 'Die komplette L4D-Saga von 2008 bis heute',
    descEn: 'The Complete L4D Saga from 2008 to Today',

    sidebarTitleDe: 'Left 4 Dead',
    sidebarTitleEn: 'Left 4 Dead',
    sidebarSubtitleDe: '2008–2026 · Valve · Source',
    sidebarSubtitleEn: '2008–2026 · Valve · Source',
    sidebarVersion: 'Complete Saga',

    hero: {
        titleDe: 'Left 4 Dead: Die Koop-Zombie-Saga, die Maßstäbe setzte',
        titleEn: 'Left 4 Dead: The Co-op Zombie Saga That Set New Standards',
        introDe: '<a href="https://store.steampowered.com/app/500/Left_4_Dead/" target="_blank" class="topic-link">Left 4 Dead</a> erschien am <strong>17. November 2008</strong> und revolutionierte den Koop-Shooter. Valve kombinierte <strong>Team-basiertes Gameplay, den AI Director und die Source-Engine</strong> zu einem Erlebnis, das bis heute seinesgleichen sucht. Der Nachfolger <a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">Left 4 Dead 2</a> (2009) erweiterte das Konzept um neue Kampagnen, Waffen und Infizierte. Mit dem <strong>Last Stand Update</strong> (2020) erhielt L4D2 ein massives Community-Update. Dieser Guide deckt die komplette Saga ab: beide Spiele, alle Kampagnen, Infizierte, Spielmodi, Server-Hosting und die moderne Wiedergabe .',
        introEn: '<a href="https://store.steampowered.com/app/500/Left_4_Dead/" target="_blank" class="topic-link">Left 4 Dead</a> was released on <strong>November 17, 2008</strong> and revolutionized the co-op shooter. Valve combined <strong>team-based gameplay, the AI Director, and the Source engine</strong> into an experience that remains unmatched to this day. The sequel <a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">Left 4 Dead 2</a> (2009) expanded the concept with new campaigns, weapons, and Infected. With the <strong>Last Stand Update</strong> (2020), L4D2 received a massive community update. This guide covers the complete saga: both games, all campaigns, Infected, game modes, server hosting, and modern playback .'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',       labelEn: 'Overview' },
        { icon: 'fa-list',              href: '#section2', switchToDoc: true, labelDe: 'Kampagnen',       labelEn: 'Campaigns' },
        { icon: 'fa-skull',             href: '#section3', switchToDoc: true, labelDe: 'Infizierte',      labelEn: 'Infected' },
        { icon: 'fa-users',             href: '#section4', switchToDoc: true, labelDe: 'Überlebende',     labelEn: 'Survivors' },
        { icon: 'fa-gamepad',           href: '#section5', switchToDoc: true, labelDe: 'Spielmodi',       labelEn: 'Game Modes' },
        { icon: 'fa-server',            href: '#section6', switchToDoc: true, labelDe: 'Server & Mods',   labelEn: 'Server & Mods' },
        { icon: 'fa-play',              href: '#section7', switchToDoc: true, labelDe: 'Heute spielen',   labelEn: 'Playing Today' },
        { icon: 'fa-external-link-alt', href: 'https://store.steampowered.com/app/550/Left_4_Dead_2/', target: '_blank', labelDe: 'Steam Store', labelEn: 'Steam Store' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Geschichte',
            titleEn: '1. Overview & History',
            introDe: '<a href="https://store.steampowered.com/app/500/Left_4_Dead/" target="_blank" class="topic-link">Left 4 Dead</a> wurde von <a href="https://www.turtle-rock-studios.com/" target="_blank" class="topic-link">Turtle Rock Studios</a> entwickelt und von Valve veröffentlicht. Ursprünglich als Counter-Strike-Mod konzipiert, bei der Wellen von Messer-schwingenden Terroristen ein Team von vier Spielern überwältigen sollten, entstand daraus die Idee für ein Zombie-Koop-Spiel. Valve kaufte Turtle Rock Studios auf und integrierte den <strong>AI Director</strong> aus der Half-Life-2-Entwicklung. Die Reihe umfasst zwei Spiele: das Original (2008) und den Nachfolger (2009) .',
            introEn: '<a href="https://store.steampowered.com/app/500/Left_4_Dead/" target="_blank" class="topic-link">Left 4 Dead</a> was developed by <a href="https://www.turtle-rock-studios.com/" target="_blank" class="topic-link">Turtle Rock Studios</a> and published by Valve. Originally conceived as a Counter-Strike mod where waves of knife-wielding terrorists overwhelmed a team of four players, the idea evolved into a zombie co-op game. Valve acquired Turtle Rock Studios and integrated the <strong>AI Director</strong> from Half-Life 2 development. The series comprises two games: the original (2008) and the sequel (2009) .',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Die Spiele',
                    titleEn: 'The Games',
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
                    <tr><th class="w-1/5">Spiel</th><th class="w-1/5">Release</th><th class="w-1/5">Kampagnen</th><th>Besonderheit</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/500/Left_4_Dead/" target="_blank" class="topic-link">Left 4 Dead</a></strong></td><td class="text-[var(--text-muted)]">17. November 2008</td><td class="text-[var(--text-muted)]">4 + 2 DLC</td><td class="text-[var(--text-muted)]">Das Original. Vier Überlebende: Bill, Zoey, Louis, Francis. Grundstein für das AI-Director-Konzept .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">Left 4 Dead 2</a></strong></td><td class="text-[var(--text-muted)]">17. November 2009</td><td class="text-[var(--text-muted)]">5 + 3 DLC</td><td class="text-[var(--text-muted)]">Der Nachfolger. Neue Kampagnen, Nahkampfwaffen, Uncommon Common, drei neue Special Infected. Enthält alle L4D1-Kampagnen .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>AI Director:</strong> Das Kernstück beider Spiele. Ein serverseitiges KI-System, das Gegner-Spawns, Waffen, Items und Musik dynamisch an die Spielerleistung anpasst – für ein einzigartiges Erlebnis in jedem Durchlauf .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Game</th><th class="w-1/5">Release</th><th class="w-1/5">Campaigns</th><th>Specialty</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/500/Left_4_Dead/" target="_blank" class="topic-link">Left 4 Dead</a></strong></td><td class="text-[var(--text-muted)]">November 17, 2008</td><td class="text-[var(--text-muted)]">4 + 2 DLC</td><td class="text-[var(--text-muted)]">The original. Four survivors: Bill, Zoey, Louis, Francis. Foundation for the AI Director concept .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">Left 4 Dead 2</a></strong></td><td class="text-[var(--text-muted)]">November 17, 2009</td><td class="text-[var(--text-muted)]">5 + 3 DLC</td><td class="text-[var(--text-muted)]">The sequel. New campaigns, melee weapons, Uncommon Common, three new Special Infected. Includes all L4D1 campaigns .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>AI Director:</strong> The core of both games. A server-side AI system that dynamically adjusts enemy spawns, weapons, items, and music based on player performance – for a unique experience in every playthrough .</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Warum Left 4 Dead so wichtig ist',
                    titleEn: 'Why Left 4 Dead Matters',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Left 4 Dead ist ein Stück Gaming-Geschichte:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Definition des Koop-Shooters:</strong> Vier Spieler, ein Team, kein Lone Wolf – das war 2008 revolutionär .</li>
                    <li><strong>AI Director:</strong> Ein System, das jedes Spiel einzigartig macht – heute Standard in vielen Koop-Titeln.</li>
                    <li><strong>Zombie-Kultur:</strong> L4D popularisierte das „Fast Zombie"-Konzept, das später in vielen Spielen übernommen wurde.</li>
                    <li><strong>Community-Mods:</strong> Über 2.500 Custom-Kampagnen halten das Spiel seit 15+ Jahren am Leben.</li>
                    <li><strong>Esport-Ansatz:</strong> Versus-Modus als kompetitive 4v4-Erfahrung – einzigartig in der Shooter-Landschaft.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Left 4 Dead is a piece of gaming history:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Definition of the co-op shooter:</strong> Four players, one team, no lone wolf – that was revolutionary in 2008 .</li>
                    <li><strong>AI Director:</strong> A system that makes every game unique – now standard in many co-op titles.</li>
                    <li><strong>Zombie culture:</strong> L4D popularized the "fast zombie" concept that was later adopted in many games.</li>
                    <li><strong>Community mods:</strong> Over 2,500 custom campaigns have kept the game alive for 15+ years.</li>
                    <li><strong>Esports approach:</strong> Versus mode as a competitive 4v4 experience – unique in the shooter landscape.</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. KAMPAGNEN ============ */
        {
            id: 'section2',
            titleDe: '2. Kampagnen',
            titleEn: '2. Campaigns',
            introDe: 'Beide Spiele bestehen aus <strong>Kampagnen</strong>, die in mehrere Kapitel unterteilt sind. Jede Kampagne folgt einem „Film"-Format mit Intro, mehreren Maps und einem Finale mit Rettungsfahrzeug. L4D1 hat vier Kampagnen, L4D2 hat fünf – plus die DLC-Kampagnen und die L4D1-Kampagnen, die in L4D2 integriert wurden .',
            introEn: 'Both games consist of <strong>campaigns</strong> divided into multiple chapters. Each campaign follows a "movie" format with an intro, multiple maps, and a finale with an escape vehicle. L4D1 has four campaigns, L4D2 has five – plus the DLC campaigns and the L4D1 campaigns integrated into L4D2 .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Left 4 Dead Kampagnen',
                    titleEn: 'Left 4 Dead Campaigns',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Kampagne</th><th>Setting & Finale</th></tr>
                    <tr><td><strong>No Mercy</strong></td><td class="text-[var(--text-muted)]">Stadtgebiet, Krankenhaus. Finale auf dem Dach – Rettung per Helikopter .</td></tr>
                    <tr><td><strong>Death Toll</strong></td><td class="text-[var(--text-muted)]">Kleinstadt, Wald, Fluss. Finale in einem alten Haus – Rettung per Boot .</td></tr>
                    <tr><td><strong>Dead Air</strong></td><td class="text-[var(--text-muted)]">Flughafen. Finale auf dem Rollfeld – Rettung per Flugzeug .</td></tr>
                    <tr><td><strong>Blood Harvest</strong></td><td class="text-[var(--text-muted)]">Ländliches Gebiet, Farm. Finale in einem Bauernhaus – Rettung per Militärfahrzeug .</td></tr>
                    <tr><td><strong>Crash Course</strong> (DLC)</td><td class="text-[var(--text-muted)]">Industriegebiet. Kurze Kampagne, verbindet No Mercy und Death Toll .</td></tr>
                    <tr><td><strong>The Sacrifice</strong> (DLC)</td><td class="text-[var(--text-muted)]">Brücke, Kraftwerk. Prequel zu L4D2. Bill opfert sich, um die anderen zu retten .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Campaign</th><th>Setting & Finale</th></tr>
                    <tr><td><strong>No Mercy</strong></td><td class="text-[var(--text-muted)]">Urban area, hospital. Finale on the roof – helicopter rescue .</td></tr>
                    <tr><td><strong>Death Toll</strong></td><td class="text-[var(--text-muted)]">Small town, forest, river. Finale in an old house – boat rescue .</td></tr>
                    <tr><td><strong>Dead Air</strong></td><td class="text-[var(--text-muted)]">Airport. Finale on the runway – plane rescue .</td></tr>
                    <tr><td><strong>Blood Harvest</strong></td><td class="text-[var(--text-muted)]">Rural area, farm. Finale in a farmhouse – military vehicle rescue .</td></tr>
                    <tr><td><strong>Crash Course</strong> (DLC)</td><td class="text-[var(--text-muted)]">Industrial area. Short campaign connecting No Mercy and Death Toll .</td></tr>
                    <tr><td><strong>The Sacrifice</strong> (DLC)</td><td class="text-[var(--text-muted)]">Bridge, power plant. Prequel to L4D2. Bill sacrifices himself to save the others .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Left 4 Dead 2 Kampagnen',
                    titleEn: 'Left 4 Dead 2 Campaigns',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Kampagne</th><th>Setting & Besonderheit</th></tr>
                    <tr><td><strong>Dead Center</strong></td><td class="text-[var(--text-muted)]">Savannah, Einkaufszentrum, Hotel. Finale im Mall-Atrium. Erstes Auftreten der <strong>Riot Infected</strong> .</td></tr>
                    <tr><td><strong>Dark Carnival</strong></td><td class="text-[var(--text-muted)]">Vergnügungspark „Whispering Oaks". Finale auf der Bühne. Erstes Auftreten der <strong>Clown Infected</strong> .</td></tr>
                    <tr><td><strong>Swamp Fever</strong></td><td class="text-[var(--text-muted)]">Sumpf und verlassene Plantage. Finale im Herrenhaus. Erstes Auftreten der <strong>Mudmen</strong> .</td></tr>
                    <tr><td><strong>Hard Rain</strong></td><td class="text-[var(--text-muted)]">Zuckerrohrfelder, Burger Tank, Regen. <strong>Regen als Gameplay-Mechanik:</strong> Die Sicht wird eingeschränkt, die Horden werden größer .</td></tr>
                    <tr><td><strong>The Parish</strong></td><td class="text-[var(--text-muted)]">New Orleans, französisches Viertel, Friedhof. Finale auf der Brücke. Erstes Auftreten der <strong>Worker Infected</strong> .</td></tr>
                    <tr><td><strong>The Passing</strong> (DLC)</td><td class="text-[var(--text-muted)]">Kanalisation, Brücke. <strong>Crossover-Kampagne:</strong> Die L4D2-Überlebenden treffen auf die L4D1-Überlebenden. Erklärt den Tod von Bill .</td></tr>
                    <tr><td><strong>Cold Stream</strong> (DLC)</td><td class="text-[var(--text-muted)]">Wald, Fluss, Tempel. Ursprünglich Community-Kampagne, später offiziell integriert .</td></tr>
                    <tr><td><strong>The Last Stand</strong> (Update)</td><td class="text-[var(--text-muted)]">Leuchtturm bei Nacht. <strong>Community-Update 2020:</strong> Kostenlos, von Fans erstellt, von Valve offiziell integriert .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wichtig:</strong> Left 4 Dead 2 enthält <strong>alle L4D1-Kampagnen</strong> (No Mercy, Death Toll, Dead Air, Blood Harvest, Crash Course, The Sacrifice) – spielbar mit den L4D2-Überlebenden oder den Originalen .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Campaign</th><th>Setting & Specialty</th></tr>
                    <tr><td><strong>Dead Center</strong></td><td class="text-[var(--text-muted)]">Savannah, shopping mall, hotel. Finale in the mall atrium. First appearance of <strong>Riot Infected</strong> .</td></tr>
                    <tr><td><strong>Dark Carnival</strong></td><td class="text-[var(--text-muted)]">Amusement park "Whispering Oaks." Finale on stage. First appearance of <strong>Clown Infected</strong> .</td></tr>
                    <tr><td><strong>Swamp Fever</strong></td><td class="text-[var(--text-muted)]">Swamp and abandoned plantation. Finale in the mansion. First appearance of <strong>Mudmen</strong> .</td></tr>
                    <tr><td><strong>Hard Rain</strong></td><td class="text-[var(--text-muted)]">Sugarcane fields, Burger Tank, rain. <strong>Rain as a gameplay mechanic:</strong> Visibility is reduced, hordes become larger .</td></tr>
                    <tr><td><strong>The Parish</strong></td><td class="text-[var(--text-muted)]">New Orleans, French Quarter, cemetery. Finale on the bridge. First appearance of <strong>Worker Infected</strong> .</td></tr>
                    <tr><td><strong>The Passing</strong> (DLC)</td><td class="text-[var(--text-muted)]">Sewers, bridge. <strong>Crossover campaign:</strong> The L4D2 survivors meet the L4D1 survivors. Explains Bill's death .</td></tr>
                    <tr><td><strong>Cold Stream</strong> (DLC)</td><td class="text-[var(--text-muted)]">Forest, river, temple. Originally a community campaign, later officially integrated .</td></tr>
                    <tr><td><strong>The Last Stand</strong> (Update)</td><td class="text-[var(--text-muted)]">Lighthouse at night. <strong>Community update 2020:</strong> Free, made by fans, officially integrated by Valve .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Important:</strong> Left 4 Dead 2 includes <strong>all L4D1 campaigns</strong> (No Mercy, Death Toll, Dead Air, Blood Harvest, Crash Course, The Sacrifice) – playable with the L4D2 survivors or the originals .</p>
                    `
                }
            ]
        },

        /* ============ 3. INFIZIERTE ============ */
        {
            id: 'section3',
            titleDe: '3. Infizierte',
            titleEn: '3. Infected',
            introDe: 'Die Infizierten sind in drei Kategorien unterteilt: <strong>Common Infected</strong> (normale Zombies, die in Horden angreifen), <strong>Uncommon Common Infected</strong> (regionale Varianten, eingeführt in L4D2) und <strong>Special Infected</strong> (mutierte Zombies mit einzigartigen Fähigkeiten). L4D2 fügt <strong>drei neue Special Infected</strong> hinzu: Charger, Jockey und Spitter .',
            introEn: 'The Infected are divided into three categories: <strong>Common Infected</strong> (normal zombies that attack in hordes), <strong>Uncommon Common Infected</strong> (regional variants introduced in L4D2), and <strong>Special Infected</strong> (mutated zombies with unique abilities). L4D2 adds <strong>three new Special Infected</strong>: Charger, Jockey, and Spitter .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Special Infected',
                    titleEn: 'Special Infected',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Infizierter</th><th>Fähigkeit</th></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Boomer" target="_blank" class="topic-link">Boomer</a></strong></td><td class="text-[var(--text-muted)]">Erbricht Gallenflüssigkeit auf Überlebende. Blendet sie und lockt eine Horde Common Infected an. Schwach (50 HP), aber extrem gefährlich .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Hunter" target="_blank" class="topic-link">Hunter</a></strong></td><td class="text-[var(--text-muted)]">Springt auf Überlebende und reißt sie zu Boden. Kann nur von Teamkollegen befreit werden. Schnell und tödlich .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Smoker" target="_blank" class="topic-link">Smoker</a></strong></td><td class="text-[var(--text-muted)]">Zieht Überlebende mit seiner Zunge durch die Luft. Isoliert sie vom Team. Kann durch Nahkampf oder Schießen unterbrochen werden .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Charger" target="_blank" class="topic-link">Charger</a></strong> <strong>(L4D2)</strong></td><td class="text-[var(--text-muted)]">Rammt Überlebende und schleudert sie durch die Gegend. Kann einzelne Überlebende von der Gruppe trennen .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Jockey" target="_blank" class="topic-link">Jockey</a></strong> <strong>(L4D2)</strong></td><td class="text-[var(--text-muted)]">Springt auf den Rücken eines Überlebenden und steuert ihn in Gefahrenzonen (Spikes, Klippen, Säure) .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Spitter" target="_blank" class="topic-link">Spitter</a></strong> <strong>(L4D2)</strong></td><td class="text-[var(--text-muted)]">Spuckt Säure, die auf dem Boden liegen bleibt und Schaden verursacht. Zwingt Überlebende, ihre Position zu verlassen .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Tank" target="_blank" class="topic-link">Tank</a></strong></td><td class="text-[var(--text-muted)]">Der Boss-Infizierte. Extrem stark, wirft Felsen, schlägt Autos. Erfordert koordinierte Teamarbeit .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Witch" target="_blank" class="topic-link">Witch</a></strong></td><td class="text-[var(--text-muted)]">Neutral, bis sie gestört wird. Dann greift sie mit tödlicher Präzision an. Kann mit einem Headshot getötet werden .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Infected</th><th>Ability</th></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Boomer" target="_blank" class="topic-link">Boomer</a></strong></td><td class="text-[var(--text-muted)]">Vomits bile on Survivors. Blinds them and attracts a horde of Common Infected. Weak (50 HP) but extremely dangerous .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Hunter" target="_blank" class="topic-link">Hunter</a></strong></td><td class="text-[var(--text-muted)]">Pounces on Survivors and pins them down. Can only be freed by teammates. Fast and deadly .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Smoker" target="_blank" class="topic-link">Smoker</a></strong></td><td class="text-[var(--text-muted)]">Pulls Survivors through the air with its tongue. Isolates them from the team. Can be interrupted by melee or shooting .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Charger" target="_blank" class="topic-link">Charger</a></strong> <strong>(L4D2)</strong></td><td class="text-[var(--text-muted)]">Charges into Survivors and slams them away. Can separate individual Survivors from the group .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Jockey" target="_blank" class="topic-link">Jockey</a></strong> <strong>(L4D2)</strong></td><td class="text-[var(--text-muted)]">Jumps on a Survivor's back and steers them into danger zones (spikes, cliffs, acid) .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Spitter" target="_blank" class="topic-link">Spitter</a></strong> <strong>(L4D2)</strong></td><td class="text-[var(--text-muted)]">Spits acid that pools on the ground and deals damage. Forces Survivors to leave their position .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Tank" target="_blank" class="topic-link">Tank</a></strong></td><td class="text-[var(--text-muted)]">The boss Infected. Extremely strong, throws rocks, smashes cars. Requires coordinated teamwork .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Witch" target="_blank" class="topic-link">Witch</a></strong></td><td class="text-[var(--text-muted)]">Neutral until disturbed. Then attacks with deadly precision. Can be killed with a headshot .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Uncommon Common Infected',
                    titleEn: 'Uncommon Common Infected',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Uncommon Common Infected sind regionale Varianten mit speziellen Eigenschaften. Jede L4D2-Kampagne hat ihre eigenen.</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Riot Infected (Dead Center):</strong> Tragen Schutzausrüstung. Immun gegen Schüsse von vorne. Müssen von hinten oder mit Nahkampf getötet werden .</li>
                    <li><strong>Clown Infected (Dark Carnival):</strong> Quietschende Schuhe locken andere Infizierte an. Werden schneller, wenn sie getroffen werden .</li>
                    <li><strong>Mudmen (Swamp Fever):</strong> Verstecken sich im Schlamm. Stehen auf und greifen an, wenn man vorbeigeht .</li>
                    <li><strong>Worker Infected (Hard Rain):</strong> Tragen Schutzhelme und Gehörschutz. Widerstandsfähiger gegen Schüsse .</li>
                    <li><strong>Fallen Survivor (The Passing):</strong> Tragen Gegenstände (Medkits, Waffen), die man aufsammeln kann. Greifen aggressiv an .</li>
                    <li><strong>Jimmy Gibbs Jr. (The Passing):</strong> Ein einmaliger Uncommon Infected im Cadillac-Hotel-Safe-Room. Trägt einen CEDA-Anzug und hat 1.000 HP .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Uncommon Common Infected are regional variants with special properties. Each L4D2 campaign has its own.</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Riot Infected (Dead Center):</strong> Wear protective gear. Immune to shots from the front. Must be killed from behind or with melee .</li>
                    <li><strong>Clown Infected (Dark Carnival):</strong> Squeaky shoes attract other Infected. Become faster when hit .</li>
                    <li><strong>Mudmen (Swamp Fever):</strong> Hide in mud. Stand up and attack when you pass by .</li>
                    <li><strong>Worker Infected (Hard Rain):</strong> Wear hard hats and ear protection. More resistant to gunfire .</li>
                    <li><strong>Fallen Survivor (The Passing):</strong> Carry items (medkits, weapons) that can be picked up. Attack aggressively .</li>
                    <li><strong>Jimmy Gibbs Jr. (The Passing):</strong> A one-of-a-kind Uncommon Infected in the Cadillac Hotel safe room. Wears a CEDA suit and has 1,000 HP .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. ÜBERLEBENDE ============ */
        {
            id: 'section4',
            titleDe: '4. Die Überlebenden',
            titleEn: '4. The Survivors',
            introDe: 'Beide Spiele haben <strong>vier Überlebende</strong> als spielbare Charaktere. L4D1 hat Bill, Zoey, Louis und Francis. L4D2 hat Coach, Nick, Ellis und Rochelle. Seit dem <strong>Last Stand Update</strong> sind auch die L4D1-Überlebenden in allen L4D1-Kampagnen in L4D2 spielbar – als eigene Fraktion mit eigenen Dialogen .',
            introEn: 'Both games have <strong>four survivors</strong> as playable characters. L4D1 has Bill, Zoey, Louis, and Francis. L4D2 has Coach, Nick, Ellis, and Rochelle. Since the <strong>Last Stand Update</strong>, the L4D1 survivors are also playable in all L4D1 campaigns in L4D2 – as their own faction with their own dialogue .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'L4D1-Überlebende',
                    titleEn: 'L4D1 Survivors',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Figur</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Bill" target="_blank" class="topic-link">Bill</a></strong></td><td class="text-[var(--text-muted)]">Der alte Kriegsveteran. Anführer der Gruppe. Pragmatisch, erfahren, stirbt in <a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">The Sacrifice</a> .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Zoey" target="_blank" class="topic-link">Zoey</a></strong></td><td class="text-[var(--text-muted)]">Die College-Studentin. Horrorfilm-Fan, wird zur Kämpferin. Verliert ihre Familie an die Infektion .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Louis" target="_blank" class="topic-link">Louis</a></strong></td><td class="text-[var(--text-muted)]">Der Geschäftsmann. Optimistisch, IT-Spezialist. Hält die Gruppe moralisch zusammen .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Francis" target="_blank" class="topic-link">Francis</a></strong></td><td class="text-[var(--text-muted)]">Der Biker. Rebelliert gegen alles, hasst Zombies, hasst Vampire, hasst alles. Herz aus Gold .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Character</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Bill" target="_blank" class="topic-link">Bill</a></strong></td><td class="text-[var(--text-muted)]">The old war veteran. Leader of the group. Pragmatic, experienced, dies in <a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">The Sacrifice</a> .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Zoey" target="_blank" class="topic-link">Zoey</a></strong></td><td class="text-[var(--text-muted)]">The college student. Horror movie fan, becomes a fighter. Loses her family to the infection .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Louis" target="_blank" class="topic-link">Louis</a></strong></td><td class="text-[var(--text-muted)]">The businessman. Optimistic, IT specialist. Holds the group together morally .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Francis" target="_blank" class="topic-link">Francis</a></strong></td><td class="text-[var(--text-muted)]">The biker. Rebels against everything, hates zombies, hates vampires, hates everything. Heart of gold .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'L4D2-Überlebende',
                    titleEn: 'L4D2 Survivors',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Figur</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Coach" target="_blank" class="topic-link">Coach</a></strong></td><td class="text-[var(--text-muted)]">Football-Coach. Anführer der Gruppe. Beschützend, pragmatisch, immer hungrig. Hat ein gutes Herz .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Nick" target="_blank" class="topic-link">Nick</a></strong></td><td class="text-[var(--text-muted)]">Spieler und Betrüger. Zynisch, egoistisch, aber im Kern loyal. Trägt einen weißen Anzug .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Ellis" target="_blank" class="topic-link">Ellis</a></strong></td><td class="text-[var(--text-muted)]">Mechaniker aus Savannah. Redneck, optimistisch, erzählt ständig Anekdoten über seinen Freund Keith .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Rochelle" target="_blank" class="topic-link">Rochelle</a></strong></td><td class="text-[var(--text-muted)]">Produktionsassistentin für eine Nachrichtensendung. Ruhig, kompetent, oft unterschätzt .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Character</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Coach" target="_blank" class="topic-link">Coach</a></strong></td><td class="text-[var(--text-muted)]">Football coach. Leader of the group. Protective, pragmatic, always hungry. Has a good heart .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Nick" target="_blank" class="topic-link">Nick</a></strong></td><td class="text-[var(--text-muted)]">Gambler and con man. Cynical, selfish, but loyal at heart. Wears a white suit .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Ellis" target="_blank" class="topic-link">Ellis</a></strong></td><td class="text-[var(--text-muted)]">Mechanic from Savannah. Redneck, optimistic, constantly tells anecdotes about his friend Keith .</td></tr>
                    <tr><td><strong><a href="https://left4dead.fandom.com/wiki/Rochelle" target="_blank" class="topic-link">Rochelle</a></strong></td><td class="text-[var(--text-muted)]">Production assistant for a news broadcast. Calm, competent, often underestimated .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. SPIELMODI ============ */
        {
            id: 'section5',
            titleDe: '5. Spielmodi',
            titleEn: '5. Game Modes',
            introDe: 'Die Left 4 Dead-Reihe bietet eine Vielzahl von Spielmodi – von der klassischen <strong>Kampagne</strong> über den kompetitiven <strong>Versus-Modus</strong> bis zum wellenbasierten <strong>Survival</strong>. L4D2 erweitert das Angebot um <strong>Scavenge</strong>, <strong>Realism</strong> und <strong>Mutations</strong>. Der Last Stand Update fügte <strong>26 neue Survival-Maps</strong> und <strong>4 Scavenge-Arenas</strong> hinzu .',
            introEn: 'The Left 4 Dead series offers a variety of game modes – from the classic <strong>Campaign</strong> to the competitive <strong>Versus mode</strong> to the wave-based <strong>Survival</strong>. L4D2 expands the offering with <strong>Scavenge</strong>, <strong>Realism</strong>, and <strong>Mutations</strong>. The Last Stand Update added <strong>26 new Survival maps</strong> and <strong>4 Scavenge arenas</strong> .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Spielmodi-Übersicht',
                    titleEn: 'Game Mode Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Modus</th><th>Verfügbar in</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Campaign</strong></td><td class="text-[var(--text-muted)]">L4D1, L4D2</td><td class="text-[var(--text-muted)]">Klassischer Koop-Modus. 1–4 Spieler, Bots füllen Plätze auf .</td></tr>
                    <tr><td><strong>Versus</strong></td><td class="text-[var(--text-muted)]">L4D1, L4D2</td><td class="text-[var(--text-muted)]">Kompetitiver 4v4-Modus. Ein Team spielt Überlebende, das andere Infizierte. Wechsel nach jedem Kapitel .</td></tr>
                    <tr><td><strong>Survival</strong></td><td class="text-[var(--text-muted)]">L4D1 (DLC), L4D2</td><td class="text-[var(--text-muted)]">Wellenbasiert. Überlebe so lange wie möglich. Bronze/Silber/Gold-Medaillen .</td></tr>
                    <tr><td><strong>Scavenge</strong></td><td class="text-[var(--text-muted)]">Nur L4D2</td><td class="text-[var(--text-muted)]">4v4-Modus. Überlebende müssen Benzinkanister sammeln, Infizierte müssen sie aufhalten. Kurze, intensive Matches .</td></tr>
                    <tr><td><strong>Realism</strong></td><td class="text-[var(--text-muted)]">Nur L4D2</td><td class="text-[var(--text-muted)]">Hardcore-Modus. Keine Glow-Effekte für Items, weniger Munition, keine Wiederbelebung durch Defibrillator .</td></tr>
                    <tr><td><strong>Realism Versus</strong></td><td class="text-[var(--text-muted)]">Nur L4D2</td><td class="text-[var(--text-muted)]">Kombination aus Realism und Versus. Der härteste Modus – nur für Experten .</td></tr>
                    <tr><td><strong>Mutations</strong></td><td class="text-[var(--text-muted)]">Nur L4D2</td><td class="text-[var(--text-muted)]">Community-erstellte Spielmodi. Über 100 verfügbar – von Rocketdude bis Tank Run .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Mode</th><th>Available in</th><th>Description</th></tr>
                    <tr><td><strong>Campaign</strong></td><td class="text-[var(--text-muted)]">L4D1, L4D2</td><td class="text-[var(--text-muted)]">Classic co-op mode. 1–4 players, bots fill empty slots .</td></tr>
                    <tr><td><strong>Versus</strong></td><td class="text-[var(--text-muted)]">L4D1, L4D2</td><td class="text-[var(--text-muted)]">Competitive 4v4 mode. One team plays Survivors, the other Infected. Switch after each chapter .</td></tr>
                    <tr><td><strong>Survival</strong></td><td class="text-[var(--text-muted)]">L4D1 (DLC), L4D2</td><td class="text-[var(--text-muted)]">Wave-based. Survive as long as possible. Bronze/Silver/Gold medals .</td></tr>
                    <tr><td><strong>Scavenge</strong></td><td class="text-[var(--text-muted)]">L4D2 only</td><td class="text-[var(--text-muted)]">4v4 mode. Survivors must collect gas cans, Infected must stop them. Short, intense matches .</td></tr>
                    <tr><td><strong>Realism</strong></td><td class="text-[var(--text-muted)]">L4D2 only</td><td class="text-[var(--text-muted)]">Hardcore mode. No glow effects for items, less ammo, no defibrillator revives .</td></tr>
                    <tr><td><strong>Realism Versus</strong></td><td class="text-[var(--text-muted)]">L4D2 only</td><td class="text-[var(--text-muted)]">Combination of Realism and Versus. The hardest mode – experts only .</td></tr>
                    <tr><td><strong>Mutations</strong></td><td class="text-[var(--text-muted)]">L4D2 only</td><td class="text-[var(--text-muted)]">Community-created game modes. Over 100 available – from Rocketdude to Tank Run .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Versus-Community',
                    titleEn: 'Versus Community',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der Versus-Modus hat die aktivste – und umstrittenste – Community.</strong></p>
                    <p class="mb-2 mt-3"><strong>Die zwei Fraktionen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Casuals:</strong> Wollen Spaß haben, experimentieren, lachen. Nehmen das Spiel nicht zu ernst .</li>
                    <li><strong>Competitives:</strong> Wollen gewinnen, optimieren, ranken. Spielen oft mit Custom-Configs und auf spezialisierten Servern .</li>
                    </ul>
                    <p class="mt-3"><strong>Die Probleme:</strong> Public Matchmaking mischt beide Gruppen – was zu Toxizität, Votekicks und Frustration führt. Viele Competitives sind auf <a href="https://l4d2center.com/" target="_blank" class="topic-link">L4D2Center</a> oder <a href="https://cedapug.com/" target="_blank" class="topic-link">CEDAPug</a> ausgewichen .</p>
                    <p class="mt-2"><strong>Empfehlung:</strong> Wer Competitives Versus spielen will, sollte sich L4D2Center anschauen. Wer Casual spielen will, sollte Public Lobbies meiden und mit Freunden spielen .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The Versus mode has the most active – and most controversial – community.</strong></p>
                    <p class="mb-2 mt-3"><strong>The two factions:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Casuals:</strong> Want to have fun, experiment, laugh. Don't take the game too seriously .</li>
                    <li><strong>Competitives:</strong> Want to win, optimize, rank. Often play with custom configs and on specialized servers .</li>
                    </ul>
                    <p class="mt-3"><strong>The problems:</strong> Public matchmaking mixes both groups – leading to toxicity, vote kicks, and frustration. Many competitives have moved to <a href="https://l4d2center.com/" target="_blank" class="topic-link">L4D2Center</a> or <a href="https://cedapug.com/" target="_blank" class="topic-link">CEDAPug</a> .</p>
                    <p class="mt-2"><strong>Recommendation:</strong> Those who want competitive Versus should check out L4D2Center. Those who want casual should avoid public lobbies and play with friends .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. SERVER & MODS ============ */
        {
            id: 'section6',
            titleDe: '6. Server & Mods',
            titleEn: '6. Server & Mods',
            introDe: 'Left 4 Dead 2 hat eine <strong>riesige Modding-Community</strong>. Der <a href="https://steamcommunity.com/workshop/browse/?appid=550" target="_blank" class="topic-link">Steam Workshop</a> enthält über <strong>2.500 Custom-Kampagnen</strong> sowie Skins, Waffen und Mutationen. Für eigene Server nutzt man <a href="https://www.sourcemod.net/" target="_blank" class="topic-link">SourceMod</a> und <a href="https://www.metamodsource.net/" target="_blank" class="topic-link">MetaMod</a> – oder Docker-Container für einfaches Hosting .',
            introEn: 'Left 4 Dead 2 has a <strong>huge modding community</strong>. The <a href="https://steamcommunity.com/workshop/browse/?appid=550" target="_blank" class="topic-link">Steam Workshop</a> contains over <strong>2,500 custom campaigns</strong> plus skins, weapons, and mutations. For custom servers, you use <a href="https://www.sourcemod.net/" target="_blank" class="topic-link">SourceMod</a> and <a href="https://www.metamodsource.net/" target="_blank" class="topic-link">MetaMod</a> – or Docker containers for easy hosting .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Steam Workshop',
                    titleEn: 'Steam Workshop',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Kategorie</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Custom Campaigns</strong></td><td class="text-[var(--text-muted)]">Über 2.500 Kampagnen. Von kurzen 10-Minuten-Maps bis zu 5-Kapitel-Epen .</td></tr>
                    <tr><td><strong>Skins</strong></td><td class="text-[var(--text-muted)]">Waffen-Skins, Charakter-Skins, UI-Anpassungen .</td></tr>
                    <tr><td><strong>Mutations</strong></td><td class="text-[var(--text-muted)]">Community-erstellte Spielmodi. Über 100 verfügbar .</td></tr>
                    <tr><td><strong>Scripts</strong></td><td class="text-[var(--text-muted)]">Erweiterte Spielmechaniken, die die Engine nutzen .</td></tr>
                    <tr><td><strong>Weapons</strong></td><td class="text-[var(--text-muted)]">Neue Waffen und Waffen-Skins. Erfordern meist Scripting .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Empfehlung:</strong> Vor dem Spielen von Custom-Kampagnen immer <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2893097407" target="_blank" class="topic-link">Valve's Missing Content Fix</a> installieren – sonst erscheinen lila/rosa Texturen .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Category</th><th>Description</th></tr>
                    <tr><td><strong>Custom Campaigns</strong></td><td class="text-[var(--text-muted)]">Over 2,500 campaigns. From short 10-minute maps to 5-chapter epics .</td></tr>
                    <tr><td><strong>Skins</strong></td><td class="text-[var(--text-muted)]">Weapon skins, character skins, UI modifications .</td></tr>
                    <tr><td><strong>Mutations</strong></td><td class="text-[var(--text-muted)]">Community-created game modes. Over 100 available .</td></tr>
                    <tr><td><strong>Scripts</strong></td><td class="text-[var(--text-muted)]">Advanced game mechanics utilizing the engine .</td></tr>
                    <tr><td><strong>Weapons</strong></td><td class="text-[var(--text-muted)]">New weapons and weapon skins. Usually require scripting .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Recommendation:</strong> Always install <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2893097407" target="_blank" class="topic-link">Valve's Missing Content Fix</a> before playing custom campaigns – otherwise purple/pink textures appear .</p>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Dedicated Server',
                    titleEn: 'Dedicated Server',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Mit Docker lässt sich ein L4D2-Server in Minuten aufsetzen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -d \\
  --name l4d2server \\
  --restart unless-stopped \\
  -p 27015:27015/udp \\
  -p 27015:27015/tcp \\
  xmb233/l4d2server:ubuntu24.04</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Server-Konfiguration (server.cfg):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">hostname "My L4D2 Server"
sv_lan 0
sv_region 4
sv_allow_lobby_connect_only 0</pre>
                    </div>
                    <p class="mt-3"><strong>Mods:</strong> SourceMod + MetaMod für Plugins. Workshop-Content muss manuell extrahiert und in den Server-Ordner kopiert werden .</p>
                    <p class="mt-2"><strong>Plugins:</strong> Über <a href="https://forums.alliedmods.net/forumdisplay.php?f=154" target="_blank" class="topic-link">AlliedMods</a> findet man Plugins für Custom-Waffen, Infizierte-Spawns und mehr .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>With Docker, an L4D2 server can be set up in minutes:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -d \\
  --name l4d2server \\
  --restart unless-stopped \\
  -p 27015:27015/udp \\
  -p 27015:27015/tcp \\
  xmb233/l4d2server:ubuntu24.04</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Server configuration (server.cfg):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">hostname "My L4D2 Server"
sv_lan 0
sv_region 4
sv_allow_lobby_connect_only 0</pre>
                    </div>
                    <p class="mt-3"><strong>Mods:</strong> SourceMod + MetaMod for plugins. Workshop content must be manually extracted and copied to the server folder .</p>
                    <p class="mt-2"><strong>Plugins:</strong> Find plugins for custom weapons, infected spawns, and more via <a href="https://forums.alliedmods.net/forumdisplay.php?f=154" target="_blank" class="topic-link">AlliedMods</a> .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 7. HEUTE SPIELEN ============ */
        {
            id: 'section7',
            titleDe: '7. Left 4 Dead heute spielen',
            titleEn: '7. Playing Left 4 Dead Today',
            introDe: 'Auch <strong>17 Jahre nach dem ersten Release</strong> ist <a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">Left 4 Dead 2</a> noch aktiv. Der <strong>Last Stand Update</strong> (2020) hat der Community neuen Content gegeben, und der Steam Workshop hält das Spiel am Leben. Mit einer <strong>aktiven Spielerbasis von 10.000–20.000 gleichzeitigen Spielern</strong> auf Steam ist es eines der langlebigsten Multiplayer-Spiele aller Zeiten .',
            introEn: '<strong>17 years after the first release</strong>, <a href="https://store.steampowered.com/app/550/Left_4_Dead_2/" target="_blank" class="topic-link">Left 4 Dead 2</a> is still active. The <strong>Last Stand Update</strong> (2020) gave the community new content, and the Steam Workshop keeps the game alive. With an <strong>active player base of 10,000–20,000 concurrent players</strong> on Steam, it is one of the longest-lasting multiplayer games of all time .',
            subtopics: [
                {
                    id: 'subsection7_1',
                    titleDe: 'Systemanforderungen (Steam)',
                    titleEn: 'System Requirements (Steam)',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Minimum</th></tr>
                    <tr><td><strong>Windows</strong></td><td class="text-[var(--text-muted)]">Intel Core 2 Duo 2,4 GHz, 2 GB RAM, DirectX 9 GPU (NVIDIA 7600 / ATI X1600), 13 GB Speicher, Windows 7+ (Steam-Client: Windows 10+) .</td></tr>
                    <tr><td><strong>macOS</strong></td><td class="text-[var(--text-muted)]">OS X 10.6.4+, Intel Core Duo 2,0 GHz, 2 GB RAM, NVIDIA 8600M / ATI HD 2400 .</td></tr>
                    <tr><td><strong>SteamOS + Linux</strong></td><td class="text-[var(--text-muted)]">Ubuntu 12.04, Dual-Core 2,8 GHz, 2 GB RAM, NVIDIA 8600/9600GT / ATI HD2600/3600 .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wichtig:</strong> Ab 1. Januar 2024 unterstützt der Steam-Client nur noch Windows 10+. Ab 15. Februar 2024 keine 32-Bit-Spiele und kein macOS 10.14 oder niedriger .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Minimum</th></tr>
                    <tr><td><strong>Windows</strong></td><td class="text-[var(--text-muted)]">Intel Core 2 Duo 2.4 GHz, 2 GB RAM, DirectX 9 GPU (NVIDIA 7600 / ATI X1600), 13 GB storage, Windows 7+ (Steam client: Windows 10+) .</td></tr>
                    <tr><td><strong>macOS</strong></td><td class="text-[var(--text-muted)]">OS X 10.6.4+, Intel Core Duo 2.0 GHz, 2 GB RAM, NVIDIA 8600M / ATI HD 2400 .</td></tr>
                    <tr><td><strong>SteamOS + Linux</strong></td><td class="text-[var(--text-muted)]">Ubuntu 12.04, dual-core 2.8 GHz, 2 GB RAM, NVIDIA 8600/9600GT / ATI HD2600/3600 .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Important:</strong> From January 1, 2024, the Steam client only supports Windows 10+. From February 15, 2024, no 32-bit games and no macOS 10.14 or lower .</p>
                    `
                },
                {
                    id: 'subsection7_2',
                    titleDe: 'Warum 2026 noch spielen?',
                    titleEn: 'Why Play in 2026?',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Left 4 Dead ist zeitlos:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>AI Director:</strong> Kein Durchlauf ist wie der andere. Das Spiel passt sich an die Spieler an .</li>
                    <li><strong>Koop-Fokus:</strong> Teamwork ist überlebenswichtig. Lone Wolves werden bestraft .</li>
                    <li><strong>Community:</strong> Über 2.500 Custom-Kampagnen. Der Workshop hält das Spiel am Leben .</li>
                    <li><strong>Last Stand Update:</strong> 2020 von der Community erstellt. Neue Kampagne, 26 Survival-Maps, 4 Scavenge-Arenas, neue Waffen .</li>
                    <li><strong>Preis:</strong> Regelmäßig für 1,99 $ im Sale. Eines der besten Preis-Leistungs-Verhältnisse überhaupt .</li>
                    <li><strong>Steam Deck:</strong> Läuft dank Proton hervorragend. Perfekt für unterwegs .</li>
                    <li><strong>Mods:</strong> Von <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1294097476" target="_blank" class="topic-link">Deathcraft II</a> bis <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1302744774" target="_blank" class="topic-link">Warcelona</a> – die Community liefert endlosen Content .</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Left 4 Dead 2 ist kein Retro-Spiel – es ist ein <strong>Klassiker</strong>, der auch 2026 noch Spaß macht. Wer Koop-Shooter mag und es noch nie gespielt hat, verpasst eines der besten Spiele aller Zeiten .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Left 4 Dead is timeless:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>AI Director:</strong> No playthrough is the same. The game adapts to the players .</li>
                    <li><strong>Co-op focus:</strong> Teamwork is essential for survival. Lone wolves are punished .</li>
                    <li><strong>Community:</strong> Over 2,500 custom campaigns. The Workshop keeps the game alive .</li>
                    <li><strong>Last Stand Update:</strong> Created by the community in 2020. New campaign, 26 Survival maps, 4 Scavenge arenas, new weapons .</li>
                    <li><strong>Price:</strong> Regularly $1.99 in sales. One of the best value-for-money ratios ever .</li>
                    <li><strong>Steam Deck:</strong> Runs excellently thanks to Proton. Perfect for on the go .</li>
                    <li><strong>Mods:</strong> From <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1294097476" target="_blank" class="topic-link">Deathcraft II</a> to <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1302744774" target="_blank" class="topic-link">Warcelona</a> – the community delivers endless content .</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Left 4 Dead 2 is not a retro game – it is a <strong>classic</strong> that is still fun in 2026. If you like co-op shooters and have never played it, you're missing one of the best games of all time .</p>
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
            introDe: 'Die wichtigsten Left 4 Dead-Aspekte auf einen Blick.',
            introEn: 'The key Left 4 Dead aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-biohazard opacity-70"></i><span>1. Release & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">L4D1: November 2008. L4D2: November 2009. Revolutionierte den Koop-Shooter mit AI Director und Team-Fokus.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-list opacity-70"></i><span>2. Kampagnen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">L4D1: 4 Kampagnen + 2 DLC. L4D2: 5 Kampagnen + 3 DLC. L4D2 enthält alle L4D1-Kampagnen.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-skull opacity-70"></i><span>3. Infizierte & Modi</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">8 Special Infected (Boomer, Hunter, Smoker, Charger, Jockey, Spitter, Tank, Witch). 7 Spielmodi.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>4. Heute spielen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Last Stand Update (2020). Über 2.500 Custom-Kampagnen. Läuft auf Steam Deck. Regelmäßig für 1,99 $ im Sale.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-biohazard opacity-70"></i><span>1. Release & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">L4D1: November 2008. L4D2: November 2009. Revolutionized the co-op shooter with AI Director and team focus.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-list opacity-70"></i><span>2. Campaigns</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">L4D1: 4 campaigns + 2 DLC. L4D2: 5 campaigns + 3 DLC. L4D2 includes all L4D1 campaigns.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-skull opacity-70"></i><span>3. Infected & Modes</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">8 Special Infected (Boomer, Hunter, Smoker, Charger, Jockey, Spitter, Tank, Witch). 7 game modes.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>4. Playing Today</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Last Stand Update (2020). Over 2,500 custom campaigns. Runs on Steam Deck. Regularly $1.99 in sales.</p>
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
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/500/Left_4_Dead/',                    target: '_blank', labelDe: 'Left 4 Dead auf Steam',       labelEn: 'Left 4 Dead on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/550/Left_4_Dead_2/',                  target: '_blank', labelDe: 'Left 4 Dead 2 auf Steam',     labelEn: 'Left 4 Dead 2 on Steam' },
            { icon: 'fa-wrench',   href: 'https://steamcommunity.com/workshop/browse/?appid=550',                  target: '_blank', labelDe: 'Steam Workshop',             labelEn: 'Steam Workshop' },
            { icon: 'fa-server',   href: 'https://hub.docker.com/r/xmb233/l4d2server',                             target: '_blank', labelDe: 'Docker L4D2 Server',         labelEn: 'Docker L4D2 Server' },
            { icon: 'fa-code',     href: 'https://github.com/modcommunity/how-to-make-a-l4d2-server-with-mods',    target: '_blank', labelDe: 'Server mit Mods (GitHub)',   labelEn: 'Server with Mods (GitHub)' },
            { icon: 'fa-book',     href: 'https://left4dead.fandom.com/',                                          target: '_blank', labelDe: 'Left 4 Dead Wiki',           labelEn: 'Left 4 Dead Wiki' },
            { icon: 'fa-users',    href: 'https://l4d2center.com/',                                                target: '_blank', labelDe: 'L4D2Center (Versus)',        labelEn: 'L4D2Center (Versus)' }
        ]
    },

    footer: {
        textDe: 'Left 4 Dead Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Left 4 Dead Reference · v1.0 · Dual Lang · 2026'
    }
});