// resources/topics/topic_half-life.js
// Registers the complete Half-Life franchise reference topic.
// Covers Half-Life 1, all its expansions, Half-Life 2, the Episodes,
// Half-Life: Alyx, Black Mesa, and the entire series legacy.
// Loaded via <script> injection.

/* ==================================================================
   HALF-LIFE (SERIES) CODE-BLOCK COPY CONTROLLER
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
    id: 'Half-Life Series Overview',
    icon: 'fa-atom',
    titleDe: 'Half-Life',
    titleEn: 'Half-Life',
    descDe: 'Die komplette Half-Life-Saga von 1998 bis heute',
    descEn: 'The Complete Half-Life Saga from 1998 to Today',

    sidebarTitleDe: 'Half-Life',
    sidebarTitleEn: 'Half-Life',
    sidebarSubtitleDe: '1998–2026 · Valve · GoldSrc, Source, Source 2',
    sidebarSubtitleEn: '1998–2026 · Valve · GoldSrc, Source, Source 2',
    sidebarVersion: 'Complete Saga',

    hero: {
        titleDe: 'Half-Life: Die Saga, die Gaming für immer veränderte',
        titleEn: 'Half-Life: The Saga That Changed Gaming Forever',
        introDe: '<a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a> erschien am <strong>19. November 1998</strong> und läutete eine neue Ära des Storytellings in Ego-Shootern ein. Aus dem Debüt von <a href="https://www.valvesoftware.com/" target="_blank" class="topic-link">Valve</a> entwickelte sich über <strong>25 Jahre</strong> eine der einflussreichsten Spieleserien überhaupt – mit vier Erweiterungen für Half-Life 1, dem revolutionären <a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a>, zwei Episoden, dem VR-Meilenstein <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a> und dem Fan-Remake <a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a>. Dieser Guide deckt die komplette Saga ab: alle Spiele, alle Erweiterungen, alle Engines und die Zukunft .',
        introEn: '<a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a> was released on <strong>November 19, 1998</strong> and ushered in a new era of storytelling in first-person shooters. From <a href="https://www.valvesoftware.com/" target="_blank" class="topic-link">Valve\'s</a> debut grew one of the most influential game series ever – spanning <strong>25 years</strong> with four expansions for Half-Life 1, the revolutionary <a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a>, two episodes, the VR milestone <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a>, and the fan remake <a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a>. This guide covers the complete saga: all games, all expansions, all engines, and the future .'
    },

    quickLinks: [
        { icon: 'fa-list',              href: '#section1', switchToDoc: true, labelDe: 'Serie-Überblick', labelEn: 'Series Overview' },
        { icon: 'fa-flask',             href: '#section2', switchToDoc: true, labelDe: 'Half-Life 1',     labelEn: 'Half-Life 1' },
        { icon: 'fa-puzzle-piece',      href: '#section3', switchToDoc: true, labelDe: 'HL1-Erweiterungen', labelEn: 'HL1 Expansions' },
        { icon: 'fa-shield-halved',     href: '#section4', switchToDoc: true, labelDe: 'Half-Life 2',     labelEn: 'Half-Life 2' },
        { icon: 'fa-film',              href: '#section5', switchToDoc: true, labelDe: 'Episoden',        labelEn: 'Episodes' },
        { icon: 'fa-vr-cardboard',      href: '#section6', switchToDoc: true, labelDe: 'Alyx & Black Mesa', labelEn: 'Alyx & Black Mesa' },
        { icon: 'fa-microchip',         href: '#section7', switchToDoc: true, labelDe: 'Engines',         labelEn: 'Engines' },
        { icon: 'fa-play',              href: '#section8', switchToDoc: true, labelDe: 'Heute spielen',   labelEn: 'Playing Today' }
    ],

    sections: [
        /* ============ 1. SERIE-ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Serie-Überblick',
            titleEn: '1. Series Overview',
            introDe: 'Die Half-Life-Serie erzählt die Geschichte von <strong>Dr. Gordon Freeman</strong>, einem theoretischen Physiker, der durch ein misslungenes Experiment in <strong>Black Mesa</strong> in einen intergalaktischen Konflikt verwickelt wird. Die Reihe umfasst <strong>fünf Hauptspiele</strong> (Half-Life 1, 2, Episode One, Episode Two und Alyx), <strong>vier Erweiterungen</strong> für Half-Life 1, eine Demo-Kampagne (Uplink) und ein <strong>Fan-Remake</strong> (Black Mesa). Alle Spiele spielen in derselben durchgehenden Zeitlinie und wurden von Valve entwickelt – mit Ausnahme der Gearbox-Erweiterungen und Black Mesa .',
            introEn: 'The Half-Life series tells the story of <strong>Dr. Gordon Freeman</strong>, a theoretical physicist drawn into an intergalactic conflict by a failed experiment at <strong>Black Mesa</strong>. The series comprises <strong>five main games</strong> (Half-Life 1, 2, Episode One, Episode Two, and Alyx), <strong>four expansions</strong> for Half-Life 1, a demo campaign (Uplink), and a <strong>fan remake</strong> (Black Mesa). All games take place in the same continuous timeline and were developed by Valve – except for the Gearbox expansions and Black Mesa .',
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
                    <tr><td><strong><a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a></strong></td><td class="text-[var(--text-muted)]">1998</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">25th Anniversary Update (2023)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a></strong></td><td class="text-[var(--text-muted)]">1999</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">Aktiv</td></tr>
                    <tr><td><strong><a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a></strong></td><td class="text-[var(--text-muted)]">1999</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">Im Hauptspiel integriert (2023)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a></strong></td><td class="text-[var(--text-muted)]">2001</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">Aktiv</td></tr>
                    <tr><td><strong><a href="https://developer.valvesoftware.com/wiki/Half-Life:_Decay" target="_blank" class="topic-link">Decay</a></strong></td><td class="text-[var(--text-muted)]">2001</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">PS2-exklusiv (Fan-Port verfügbar)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a></strong></td><td class="text-[var(--text-muted)]">2004</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">20th Anniversary Update (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/340/HalfLife_2_Lost_Coast/" target="_blank" class="topic-link">Lost Coast</a></strong></td><td class="text-[var(--text-muted)]">2005</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Im Hauptspiel integriert (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/380/HalfLife_2_Episode_One/" target="_blank" class="topic-link">Episode One</a></strong></td><td class="text-[var(--text-muted)]">2006</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Im Hauptspiel integriert (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/420/HalfLife_2_Episode_Two/" target="_blank" class="topic-link">Episode Two</a></strong></td><td class="text-[var(--text-muted)]">2007</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Im Hauptspiel integriert (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a></strong></td><td class="text-[var(--text-muted)]">2020</td><td class="text-[var(--text-muted)]">Source 2</td><td class="text-[var(--text-muted)]">VR-exklusiv, ARM64-Port (2026)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a></strong></td><td class="text-[var(--text-muted)]">2020</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Fan-Remake von Half-Life 1</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Nicht erschienen:</strong> <a href="https://en.wikipedia.org/wiki/Half-Life_2:_Episode_Three" target="_blank" class="topic-link">Episode Three</a> (angekündigt 2007, nie fertiggestellt) und <a href="https://en.wikipedia.org/wiki/Half-Life_3" target="_blank" class="topic-link">Half-Life 3</a> (Running Gag der Gaming-Welt). Alyx' Ende deutet an, dass die Geschichte weitergeht .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Game</th><th class="w-1/5">Year</th><th class="w-1/5">Engine</th><th>Status</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a></strong></td><td class="text-[var(--text-muted)]">1998</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">25th Anniversary Update (2023)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a></strong></td><td class="text-[var(--text-muted)]">1999</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">Active</td></tr>
                    <tr><td><strong><a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a></strong></td><td class="text-[var(--text-muted)]">1999</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">Integrated into main game (2023)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a></strong></td><td class="text-[var(--text-muted)]">2001</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">Active</td></tr>
                    <tr><td><strong><a href="https://developer.valvesoftware.com/wiki/Half-Life:_Decay" target="_blank" class="topic-link">Decay</a></strong></td><td class="text-[var(--text-muted)]">2001</td><td class="text-[var(--text-muted)]">GoldSrc</td><td class="text-[var(--text-muted)]">PS2-exclusive (fan port available)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a></strong></td><td class="text-[var(--text-muted)]">2004</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">20th Anniversary Update (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/340/HalfLife_2_Lost_Coast/" target="_blank" class="topic-link">Lost Coast</a></strong></td><td class="text-[var(--text-muted)]">2005</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Integrated into main game (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/380/HalfLife_2_Episode_One/" target="_blank" class="topic-link">Episode One</a></strong></td><td class="text-[var(--text-muted)]">2006</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Integrated into main game (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/420/HalfLife_2_Episode_Two/" target="_blank" class="topic-link">Episode Two</a></strong></td><td class="text-[var(--text-muted)]">2007</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Integrated into main game (2024)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a></strong></td><td class="text-[var(--text-muted)]">2020</td><td class="text-[var(--text-muted)]">Source 2</td><td class="text-[var(--text-muted)]">VR-exclusive, ARM64 port (2026)</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a></strong></td><td class="text-[var(--text-muted)]">2020</td><td class="text-[var(--text-muted)]">Source</td><td class="text-[var(--text-muted)]">Fan remake of Half-Life 1</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Never released:</strong> <a href="https://en.wikipedia.org/wiki/Half-Life_2:_Episode_Three" target="_blank" class="topic-link">Episode Three</a> (announced 2007, never finished) and <a href="https://en.wikipedia.org/wiki/Half-Life_3" target="_blank" class="topic-link">Half-Life 3</a> (running gag of the gaming world). Alyx's ending hints that the story continues .</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Die Hauptfiguren der Serie',
                    titleEn: 'The Main Characters of the Series',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Figur</th><th>Rolle</th></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Gordon_Freeman" target="_blank" class="topic-link">Gordon Freeman</a></strong></td><td class="text-[var(--text-muted)]">Protagonist von HL1, HL2, Episode One und Two. Theoretischer Physiker, schweigsam, Träger des HEV-Anzugs .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Alyx_Vance" target="_blank" class="topic-link">Alyx Vance</a></strong></td><td class="text-[var(--text-muted)]">Protagonistin von Alyx, zentrale Begleiterin in HL2. Tochter von Eli Vance, Hackerin und Kämpferin .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Eli_Vance" target="_blank" class="topic-link">Eli Vance</a></strong></td><td class="text-[var(--text-muted)]">Wissenschaftler, Überlebender von Black Mesa, Anführer des Widerstands. Stirbt in Episode Two, wird in Alyx gerettet .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Isaac_Kleiner" target="_blank" class="topic-link">Isaac Kleiner</a></strong></td><td class="text-[var(--text-muted)]">Wissenschaftler, ebenfalls Black-Mesa-Überlebender. Baut Teleporter-Technologie .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Barney_Calhoun" target="_blank" class="topic-link">Barney Calhoun</a></strong></td><td class="text-[var(--text-muted)]">Sicherheitsbeamter, Protagonist von Blue Shift, Undercover bei der Civil Protection in HL2 .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/The_G-Man" target="_blank" class="topic-link">G-Man</a></strong></td><td class="text-[var(--text-muted)]">Mysteriöser Beobachter in allen Spielen. Weckt Gordon, arbeitet mit Alyx, kontrolliert die Ereignisse .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a></strong></td><td class="text-[var(--text-muted)]">KI aus der Portal-Serie, spielt im selben Universum (Aperture Science) .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Wallace_Breen" target="_blank" class="topic-link">Wallace Breen</a></strong></td><td class="text-[var(--text-muted)]">Antagonist von HL2. Ehemaliger Black-Mesa-Administrator, jetzt Combine-Kollaborateur .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Wheatley" target="_blank" class="topic-link">Wheatley</a></strong></td><td class="text-[var(--text-muted)]">Persönlichkeitskern aus Portal 2, spielt im selben Universum .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Character</th><th>Role</th></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Gordon_Freeman" target="_blank" class="topic-link">Gordon Freeman</a></strong></td><td class="text-[var(--text-muted)]">Protagonist of HL1, HL2, Episode One and Two. Theoretical physicist, silent, wearer of the HEV suit .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Alyx_Vance" target="_blank" class="topic-link">Alyx Vance</a></strong></td><td class="text-[var(--text-muted)]">Protagonist of Alyx, central companion in HL2. Daughter of Eli Vance, hacker and fighter .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Eli_Vance" target="_blank" class="topic-link">Eli Vance</a></strong></td><td class="text-[var(--text-muted)]">Scientist, Black Mesa survivor, leader of the resistance. Dies in Episode Two, saved in Alyx .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Isaac_Kleiner" target="_blank" class="topic-link">Isaac Kleiner</a></strong></td><td class="text-[var(--text-muted)]">Scientist, also a Black Mesa survivor. Builds teleporter technology .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Barney_Calhoun" target="_blank" class="topic-link">Barney Calhoun</a></strong></td><td class="text-[var(--text-muted)]">Security guard, protagonist of Blue Shift, undercover with Civil Protection in HL2 .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/The_G-Man" target="_blank" class="topic-link">G-Man</a></strong></td><td class="text-[var(--text-muted)]">Mysterious observer in all games. Awakens Gordon, works with Alyx, controls events .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a></strong></td><td class="text-[var(--text-muted)]">AI from the Portal series, shares the same universe (Aperture Science) .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Wallace_Breen" target="_blank" class="topic-link">Wallace Breen</a></strong></td><td class="text-[var(--text-muted)]">Antagonist of HL2. Former Black Mesa administrator, now Combine collaborator .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Wheatley" target="_blank" class="topic-link">Wheatley</a></strong></td><td class="text-[var(--text-muted)]">Personality core from Portal 2, shares the same universe .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. HALF-LIFE 1 ============ */
        {
            id: 'section2',
            titleDe: '2. Half-Life 1 (1998)',
            titleEn: '2. Half-Life 1 (1998)',
            introDe: '<a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a> wurde am <strong>19. November 1998</strong> veröffentlicht und gilt als einer der einflussreichsten Ego-Shooter aller Zeiten. Statt linearer Level setzte Valve auf eine <strong>durchgehende, nahtlose Kampagne</strong> mit Storytelling durch Umgebung und Skript-Events – damals revolutionär. Die <strong>GoldSrc-Engine</strong> (ein stark modifizierter Quake-Engine-Fork) legte den Grundstein für Counter-Strike, Team Fortress Classic und die gesamte Valve-Ära. Das <strong>25th Anniversary Update</strong> (2023) brachte neue Maps, Bugfixes und integrierte das Demo <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a> ins Hauptspiel .',
            introEn: '<a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a> was released on <strong>November 19, 1998</strong> and is considered one of the most influential first-person shooters of all time. Instead of linear levels, Valve relied on a <strong>continuous, seamless campaign</strong> with environmental storytelling and scripted events – revolutionary at the time. The <strong>GoldSrc engine</strong> (a heavily modified Quake engine fork) laid the foundation for Counter-Strike, Team Fortress Classic, and the entire Valve era. The <strong>25th Anniversary Update</strong> (2023) brought new maps, bug fixes, and integrated the demo <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a> into the main game .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Story & Kapitel',
                    titleEn: 'Story & Chapters',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Handlung:</strong> Gordon Freeman kommt zu spät zur Arbeit in die <strong>Black Mesa Research Facility</strong>. Bei einem Experiment mit einer außerirdischen Probe kommt es zur <strong>Resonanzkaskade</strong> – die Anlage wird zerstört, Portale zu anderen Dimensionen öffnen sich. Freeman muss sich durch die überrannte Anlage kämpfen, während die Regierung HECU-Marines schickt, um alles zu säubern .</p>
                    <p class="mb-2 mt-3"><strong>Die wichtigsten Kapitel:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Anomalous Materials:</strong> Das Schicksalsexperiment .</li>
                    <li><strong>We've Got Hostiles:</strong> Die HECU-Marines werden zu Feinden .</li>
                    <li><strong>Blast Pit:</strong> Der blinde Tentakel, der auf Geräusche reagiert .</li>
                    <li><strong>Surface Tension:</strong> Kampf gegen Helikopter und Panzer an der Oberfläche .</li>
                    <li><strong>Lambda Core:</strong> Reise nach Xen durch das Lambda-Portal .</li>
                    <li><strong>Nihilanth:</strong> Finale gegen den Anführer der Xen-Invasion .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The plot:</strong> Gordon Freeman arrives late for work at the <strong>Black Mesa Research Facility</strong>. During an experiment with an alien sample, the <strong>resonance cascade</strong> occurs – the facility is destroyed, portals to other dimensions open. Freeman must fight his way through the overrun facility while the government sends HECU Marines to clean up .</p>
                    <p class="mb-2 mt-3"><strong>The most important chapters:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Anomalous Materials:</strong> The fateful experiment .</li>
                    <li><strong>We've Got Hostiles:</strong> The HECU Marines become enemies .</li>
                    <li><strong>Blast Pit:</strong> The blind tentacle that reacts to sound .</li>
                    <li><strong>Surface Tension:</strong> Combat against helicopters and tanks on the surface .</li>
                    <li><strong>Lambda Core:</strong> Journey to Xen through the Lambda portal .</li>
                    <li><strong>Nihilanth:</strong> Finale against the leader of the Xen invasion .</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: '25th Anniversary Update (2023)',
                    titleEn: '25th Anniversary Update (2023)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Am 17. November 2023 veröffentlichte Valve ein großes Update zum 25. Jubiläum.</strong></p>
                    <p class="mb-2 mt-3"><strong>Wichtigste Änderungen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Neue Maps:</strong> <code>c0a0e</code>, <code>c1a0e</code>, <code>c2a5e</code>, <code>c3a2e</code>, <code>c4a1e</code>, <code>c5a1e</code> – entfernte oder ungenutzte Level .</li>
                    <li><strong>Engine-Limits erhöht:</strong> Mehr Entities, Partikel und dynamische Soundkanäle.</li>
                    <li><strong>Widescreen (Hor+):</strong> Korrekte Darstellung auf 16:9/21:9 .</li>
                    <li><strong>Uplink integriert:</strong> Die Demo ist jetzt im Hauptspiel enthalten – über das Menü „New Game" erreichbar .</li>
                    <li><strong>Bugfixes:</strong> Zahlreiche Fixes für alte Engine-Bugs .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>On November 17, 2023, Valve released a major update for the 25th anniversary.</strong></p>
                    <p class="mb-2 mt-3"><strong>Key changes:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>New maps:</strong> <code>c0a0e</code>, <code>c1a0e</code>, <code>c2a5e</code>, <code>c3a2e</code>, <code>c4a1e</code>, <code>c5a1e</code> – removed or unused levels .</li>
                    <li><strong>Engine limits raised:</strong> More entities, particles, and dynamic sound channels.</li>
                    <li><strong>Widescreen (Hor+):</strong> Correct rendering on 16:9/21:9 .</li>
                    <li><strong>Uplink integrated:</strong> The demo is now included in the main game – accessible via the "New Game" menu .</li>
                    <li><strong>Bug fixes:</strong> Numerous fixes for old engine bugs .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. HL1-ERWEITERUNGEN ============ */
        {
            id: 'section3',
            titleDe: '3. Half-Life 1-Erweiterungen',
            titleEn: '3. Half-Life 1 Expansions',
            introDe: 'Half-Life erhielt <strong>vier offizielle Erweiterungen</strong> – drei von <a href="https://www.gearboxsoftware.com/" target="_blank" class="topic-link">Gearbox Software</a> entwickelt und eine Demo-Kampagne. Sie erzählen die Ereignisse von Black Mesa aus anderen Perspektiven: <a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a> aus Sicht eines HECU-Marines, <a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a> aus Sicht eines Sicherheitsbeamten, <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Decay" target="_blank" class="topic-link">Decay</a> als PS2-exklusive Co-op-Kampagne und <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a> als eigenständige Demo .',
            introEn: 'Half-Life received <strong>four official expansions</strong> – three developed by <a href="https://www.gearboxsoftware.com/" target="_blank" class="topic-link">Gearbox Software</a> and one demo campaign. They tell the events of Black Mesa from other perspectives: <a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a> from the view of a HECU Marine, <a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a> from the view of a security guard, <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Decay" target="_blank" class="topic-link">Decay</a> as a PS2-exclusive co-op campaign, and <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a> as a standalone demo .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Opposing Force (1999)',
                    titleEn: 'Opposing Force (1999)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der erste offizielle Expansion Pack, entwickelt von Gearbox Software.</strong></p>
                    <p class="mb-2 mt-3"><strong>Handlung:</strong> Man spielt <strong>Corporal Adrian Shephard</strong>, einen HECU-Marine. Sein Hubschrauber stürzt ab, und er muss sich mit Überlebenden verbünden, um selbst zu überleben – während er sowohl Xen-Kreaturen als auch die <strong>Black Operations</strong> und die neue Alien-Spezies <strong>Race-X</strong> bekämpft .</p>
                    <p class="mb-2 mt-3"><strong>Neue Inhalte:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Neue Fraktionen:</strong> Black Operations (Elite-Einheit) und Race-X (neue Aliens) .</li>
                    <li><strong>Neue Waffen:</strong> M-249 SAW, M-40A1 Scharfschützengewehr, Desert Eagle, Displacer, Barnacle, Spore Launcher, Shock Roach .</li>
                    <li><strong>Neue NPCs:</strong> Medics, Engineers, Squad-Management-System .</li>
                    <li><strong>Night Vision:</strong> Shephard hat keinen HEV-Anzug .</li>
                    <li><strong>13 Kapitel</strong> (14 mit Boot Camp) .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The first official expansion pack, developed by Gearbox Software.</strong></p>
                    <p class="mb-2 mt-3"><strong>Plot:</strong> You play <strong>Corporal Adrian Shephard</strong>, a HECU Marine. His helicopter crashes, and he must ally with survivors to survive himself – fighting both Xen creatures and the <strong>Black Operations</strong> and the new alien species <strong>Race-X</strong> .</p>
                    <p class="mb-2 mt-3"><strong>New content:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>New factions:</strong> Black Operations (elite unit) and Race-X (new aliens) .</li>
                    <li><strong>New weapons:</strong> M-249 SAW, M-40A1 sniper rifle, Desert Eagle, Displacer, Barnacle, Spore Launcher, Shock Roach .</li>
                    <li><strong>New NPCs:</strong> Medics, Engineers, squad management system .</li>
                    <li><strong>Night Vision:</strong> Shephard has no HEV suit .</li>
                    <li><strong>13 chapters</strong> (14 with Boot Camp) .</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Blue Shift (2001)',
                    titleEn: 'Blue Shift (2001)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der zweite offizielle Expansion Pack, ursprünglich für die Dreamcast-Version entwickelt.</strong></p>
                    <p class="mb-2 mt-3"><strong>Handlung:</strong> Man spielt <strong>Barney Calhoun</strong>, den Sicherheitsbeamten, der Gordon Freeman in Half-Life hilft. Die Geschichte spielt parallel zu den Ereignissen des Hauptspiels und zeigt, wie Barney die Evakuierung überlebt .</p>
                    <p class="mb-2 mt-3"><strong>Neue Inhalte:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>High Definition Pack:</strong> Überarbeitete Modelle und Texturen .</li>
                    <li><strong>Neue Waffen-Modelle:</strong> MP5 wird durch M4/M203 ersetzt, Glock durch Beretta 92 .</li>
                    <li><strong>7 Kapitel</strong> (9 mit Hazard Course und Deliverance) .</li>
                    <li><strong>Fokus auf NPC-Interaktion:</strong> Barney interagiert mehr mit Wissenschaftlern als Gordon .</li>
                    </ul>
                    <p class="mt-3"><strong>Besonderheit:</strong> Blue Shift war ursprünglich ein Dreamcast-exklusives Add-on. Nach der Absage der Dreamcast-Version wurde es auf PC portiert .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The second official expansion pack, originally developed for the Dreamcast version.</strong></p>
                    <p class="mb-2 mt-3"><strong>Plot:</strong> You play <strong>Barney Calhoun</strong>, the security guard who helps Gordon Freeman in Half-Life. The story runs parallel to the main game's events and shows how Barney survives the evacuation .</p>
                    <p class="mb-2 mt-3"><strong>New content:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>High Definition Pack:</strong> Revised models and textures .</li>
                    <li><strong>New weapon models:</strong> MP5 replaced by M4/M203, Glock by Beretta 92 .</li>
                    <li><strong>7 chapters</strong> (9 with Hazard Course and Deliverance) .</li>
                    <li><strong>Focus on NPC interaction:</strong> Barney interacts more with scientists than Gordon .</li>
                    </ul>
                    <p class="mt-3"><strong>Specialty:</strong> Blue Shift was originally a Dreamcast-exclusive add-on. After the Dreamcast version was cancelled, it was ported to PC .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection3_3',
                    titleDe: 'Decay (2001, PS2-exklusiv)',
                    titleEn: 'Decay (2001, PS2-exclusive)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>PS2-exklusive Co-op-Kampagne, entwickelt von Gearbox Software.</strong></p>
                    <p class="mb-2 mt-3"><strong>Handlung:</strong> Man spielt die Wissenschaftlerinnen <strong>Dr. Gina Cross</strong> und <strong>Dr. Colette Green</strong>. Sie überwachen das Equipment, das Freemans Experiment auslöst, und müssen später einen Satelliten starten, um die Resonanzkaskade abzuschwächen .</p>
                    <p class="mb-2 mt-3"><strong>Besonderheiten:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Kooperatives Gameplay:</strong> Zwei Spieler müssen zusammenarbeiten .</li>
                    <li><strong>Exklusive Inhalte:</strong> Nie auf PC erschienen. Ein Fan-Port wurde 2008 veröffentlicht .</li>
                    <li><strong>9 Kapitel</strong> + Bonus-Level „Xen Attacks" .</li>
                    <li><strong>Handlungsverbindungen:</strong> Erklärt, wie die orangen Kristalle in Half-Life 1 entstanden sind .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>PS2-exclusive co-op campaign, developed by Gearbox Software.</strong></p>
                    <p class="mb-2 mt-3"><strong>Plot:</strong> You play scientists <strong>Dr. Gina Cross</strong> and <strong>Dr. Colette Green</strong>. They monitor the equipment that triggers Freeman's experiment and must later launch a satellite to weaken the resonance cascade .</p>
                    <p class="mb-2 mt-3"><strong>Special features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Cooperative gameplay:</strong> Two players must work together .</li>
                    <li><strong>Exclusive content:</strong> Never released on PC. A fan port was released in 2008 .</li>
                    <li><strong>9 chapters</strong> + bonus level "Xen Attacks" .</li>
                    <li><strong>Story connections:</strong> Explains how the orange crystals in Half-Life 1 were created .</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection3_4',
                    titleDe: 'Uplink (1999)',
                    titleEn: 'Uplink (1999)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Eigenständige Demo mit drei exklusiven Maps.</strong></p>
                    <p class="mb-2 mt-3"><strong>Handlung:</strong> Man spielt Gordon Freeman kurz vor der Resonanzkaskade. Ziel ist es, eine Funkanlage zu justieren, um mit einem Satelliten Kontakt aufzunehmen .</p>
                    <p class="mb-2 mt-3"><strong>Besonderheiten:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Nicht aus dem Hauptspiel geschnitten:</strong> Die Levels wurden speziell für die Demo entwickelt .</li>
                    <li><strong>25th Anniversary Update:</strong> Seit November 2023 <strong>offiziell im Hauptspiel enthalten</strong> .</li>
                    <li><strong>Ursprünglich kostenlos:</strong> Wurde als Demo vertrieben .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Standalone demo with three exclusive maps.</strong></p>
                    <p class="mb-2 mt-3"><strong>Plot:</strong> You play Gordon Freeman shortly before the resonance cascade. The goal is to tune a radio system to contact a satellite .</p>
                    <p class="mb-2 mt-3"><strong>Special features:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Not cut from the main game:</strong> The levels were developed specifically for the demo .</li>
                    <li><strong>25th Anniversary Update:</strong> Since November 2023, <strong>officially included in the main game</strong> .</li>
                    <li><strong>Originally free:</strong> Distributed as a demo .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. HALF-LIFE 2 ============ */
        {
            id: 'section4',
            titleDe: '4. Half-Life 2 (2004)',
            titleEn: '4. Half-Life 2 (2004)',
            introDe: '<a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a> wurde am <strong>16. November 2004</strong> veröffentlicht und gilt als eines der besten Videospiele aller Zeiten. Die <strong>Source-Engine</strong> revolutionierte Physik, Animation und Gesichtsmimik – die <a href="https://half-life.fandom.com/wiki/Gravity_Gun" target="_blank" class="topic-link">Gravity Gun</a> wurde zum Markenzeichen. Zwanzig Jahre später, im November 2024, veröffentlichte Valve ein umfangreiches <strong>20th Anniversary Update</strong> mit allen Episoden, Developer-Kommentaren und technischen Modernisierungen .',
            introEn: '<a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a> was released on <strong>November 16, 2004</strong> and is considered one of the greatest video games of all time. The <strong>Source engine</strong> revolutionized physics, animation, and facial expressions – the <a href="https://half-life.fandom.com/wiki/Gravity_Gun" target="_blank" class="topic-link">Gravity Gun</a> became its trademark. Twenty years later, in November 2024, Valve released an extensive <strong>20th Anniversary Update</strong> with all episodes, developer commentary, and technical modernizations .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Story & Setting',
                    titleEn: 'Story & Setting',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Handlung:</strong> Gordon Freeman wird vom <a href="https://half-life.fandom.com/wiki/G-Man" target="_blank" class="topic-link">G-Man</a> aus dem Stasis-Schlaf geweckt und in <strong>City 17</strong> abgesetzt – einer osteuropäischen Stadt unter der Kontrolle der <strong>Combine</strong>. Die Erde hat den <strong>Sieben-Stunden-Krieg</strong> verloren und wird ausgebeutet. Freeman schließt sich dem Widerstand um <a href="https://half-life.fandom.com/wiki/Alyx_Vance" target="_blank" class="topic-link">Alyx Vance</a>, <a href="https://half-life.fandom.com/wiki/Eli_Vance" target="_blank" class="topic-link">Eli Vance</a> und <a href="https://half-life.fandom.com/wiki/Isaac_Kleiner" target="_blank" class="topic-link">Dr. Isaac Kleiner</a> an .</p>
                    <p class="mb-2 mt-3"><strong>Die wichtigsten Kapitel:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Point Insertion:</strong> Ankunft in City 17, Treffen mit Barney und Alyx .</li>
                    <li><strong>A Red Letter Day:</strong> Dr. Kleiners Labor, Mark V HEV-Anzug .</li>
                    <li><strong>Route Kanal / Water Hazard:</strong> Flucht mit dem Airboat .</li>
                    <li><strong>Black Mesa East:</strong> Hauptquartier des Widerstands, Gravity Gun .</li>
                    <li><strong>Ravenholm:</strong> Die Geisterstadt mit Father Grigori .</li>
                    <li><strong>Highway 17 / Sandtraps:</strong> Fahrt mit dem Buggy und Antlion-Kontrolle .</li>
                    <li><strong>Nova Prospekt / Entanglement:</strong> Rettung von Eli und Alyx .</li>
                    <li><strong>Anticitizen One / Follow Freeman!:</strong> Aufstand in City 17 .</li>
                    <li><strong>Our Benefactors / Dark Energy:</strong> Die Zitadelle und das Finale gegen Dr. Breen .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The plot:</strong> Gordon Freeman is awakened from stasis by the <a href="https://half-life.fandom.com/wiki/G-Man" target="_blank" class="topic-link">G-Man</a> and dropped into <strong>City 17</strong> – an Eastern European city under Combine control. Earth lost the <strong>Seven Hour War</strong> and is being exploited. Freeman joins the resistance around <a href="https://half-life.fandom.com/wiki/Alyx_Vance" target="_blank" class="topic-link">Alyx Vance</a>, <a href="https://half-life.fandom.com/wiki/Eli_Vance" target="_blank" class="topic-link">Eli Vance</a>, and <a href="https://half-life.fandom.com/wiki/Isaac_Kleiner" target="_blank" class="topic-link">Dr. Isaac Kleiner</a> .</p>
                    <p class="mb-2 mt-3"><strong>The most important chapters:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Point Insertion:</strong> Arrival in City 17, meeting Barney and Alyx .</li>
                    <li><strong>A Red Letter Day:</strong> Dr. Kleiner's lab, Mark V HEV suit .</li>
                    <li><strong>Route Kanal / Water Hazard:</strong> Escape with the Airboat .</li>
                    <li><strong>Black Mesa East:</strong> Resistance headquarters, Gravity Gun .</li>
                    <li><strong>Ravenholm:</strong> The ghost town with Father Grigori .</li>
                    <li><strong>Highway 17 / Sandtraps:</strong> Buggy ride and Antlion control .</li>
                    <li><strong>Nova Prospekt / Entanglement:</strong> Rescuing Eli and Alyx .</li>
                    <li><strong>Anticitizen One / Follow Freeman!:</strong> Uprising in City 17 .</li>
                    <li><strong>Our Benefactors / Dark Energy:</strong> The Citadel and the finale against Dr. Breen .</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: '20th Anniversary Update (2024)',
                    titleEn: '20th Anniversary Update (2024)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Im November 2024 veröffentlichte Valve ein großes Update zum 20. Jubiläum.</strong></p>
                    <p class="mb-2 mt-3"><strong>Wichtigste Änderungen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Alle Episoden integriert:</strong> <a href="https://store.steampowered.com/app/380/HalfLife_2_Episode_One/" target="_blank" class="topic-link">Episode One</a> und <a href="https://store.steampowered.com/app/420/HalfLife_2_Episode_Two/" target="_blank" class="topic-link">Episode Two</a> sind direkt im Hauptmenü erreichbar .</li>
                    <li><strong>Developer-Kommentare:</strong> Über 3 Stunden Audio-Kommentare von Valve-Entwicklern .</li>
                    <li><strong>Technische Modernisierung:</strong> Verbesserte Grafik, neue Beleuchtung, bessere Schatten .</li>
                    <li><strong><a href="https://store.steampowered.com/app/340/HalfLife_2_Lost_Coast/" target="_blank" class="topic-link">Lost Coast</a> integriert:</strong> Die technische Demo ist jetzt Teil des Hauptspiels .</li>
                    <li><strong>Steam Workshop:</strong> Mod-Support direkt integriert .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>In November 2024, Valve released a major update for the 20th anniversary.</strong></p>
                    <p class="mb-2 mt-3"><strong>Key changes:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>All episodes integrated:</strong> <a href="https://store.steampowered.com/app/380/HalfLife_2_Episode_One/" target="_blank" class="topic-link">Episode One</a> and <a href="https://store.steampowered.com/app/420/HalfLife_2_Episode_Two/" target="_blank" class="topic-link">Episode Two</a> are directly accessible from the main menu .</li>
                    <li><strong>Developer commentary:</strong> Over 3 hours of audio commentary from Valve developers .</li>
                    <li><strong>Technical modernization:</strong> Improved graphics, new lighting, better shadows .</li>
                    <li><strong><a href="https://store.steampowered.com/app/340/HalfLife_2_Lost_Coast/" target="_blank" class="topic-link">Lost Coast</a> integrated:</strong> The tech demo is now part of the main game .</li>
                    <li><strong>Steam Workshop:</strong> Mod support directly integrated .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. EPISODEN ============ */
        {
            id: 'section5',
            titleDe: '5. Die Episoden',
            titleEn: '5. The Episodes',
            introDe: 'Nach dem Erfolg von <a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a> entschied sich Valve für ein <strong>Episoden-Modell</strong> – kürzere, aber häufiger erscheinende Fortsetzungen. Zwei Episoden wurden veröffentlicht, eine dritte wurde angekündigt, aber nie fertiggestellt. Mit dem <strong>20th Anniversary Update</strong> sind beide Episoden jetzt direkt im Hauptspiel integriert .',
            introEn: 'After the success of <a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a>, Valve opted for an <strong>episodic model</strong> – shorter but more frequent sequels. Two episodes were released, a third was announced but never finished. With the <strong>20th Anniversary Update</strong>, both episodes are now directly integrated into the main game .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Episode One (2006)',
                    titleEn: 'Episode One (2006)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Veröffentlicht am 1. Juni 2006.</strong></p>
                    <p class="mb-2 mt-3"><strong>Handlung:</strong> Gordon und Alyx müssen aus der einstürzenden Zitadelle entkommen. Die Selbstzerstörung der Zitadelle bedroht ganz City 17. Die beiden kämpfen sich durch die Ruinen, um die Evakuierung der Bevölkerung zu unterstützen und die Kernschmelze zu verhindern .</p>
                    <p class="mb-2 mt-3"><strong>Neue Inhalte:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Fokus auf Alyx:</strong> Alyx ist fast durchgehend Begleiterin .</li>
                    <li><strong>Neue Gegner:</strong> Zombines (Zombies mit Granaten), Combine Elite .</li>
                    <li><strong>Physik-Rätsel:</strong> Stärkerer Fokus auf Umgebungsrätsel .</li>
                    </ul>
                    <p class="mt-3"><strong>Kapitel:</strong> 5 (Undue Alarm, Direct Intervention, Lowlife, Urban Flight, Exit 17).</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Released on June 1, 2006.</strong></p>
                    <p class="mb-2 mt-3"><strong>Plot:</strong> Gordon and Alyx must escape the collapsing Citadel. The Citadel's self-destruction threatens all of City 17. The two fight through the ruins to support the evacuation of the population and prevent the meltdown .</p>
                    <p class="mb-2 mt-3"><strong>New content:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Focus on Alyx:</strong> Alyx is a companion almost throughout .</li>
                    <li><strong>New enemies:</strong> Zombines (zombies with grenades), Combine Elite .</li>
                    <li><strong>Physics puzzles:</strong> Stronger focus on environmental puzzles .</li>
                    </ul>
                    <p class="mt-3"><strong>Chapters:</strong> 5 (Undue Alarm, Direct Intervention, Lowlife, Urban Flight, Exit 17).</p>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Episode Two (2007)',
                    titleEn: 'Episode Two (2007)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Veröffentlicht am 10. Oktober 2007 als Teil von <a href="https://en.wikipedia.org/wiki/The_Orange_Box" target="_blank" class="topic-link">The Orange Box</a>.</strong></p>
                    <p class="mb-2 mt-3"><strong>Handlung:</strong> Die Explosion der Zitadelle hat ein <strong>Superportal</strong> geöffnet. Gordon und Alyx müssen durch die Wälder und Berge außerhalb von City 17 reisen, um das Portal zu schließen und die Daten der Widerstandsrakete zu überbringen. Der emotionale Höhepunkt setzt die Handlung für ein nie erschienenes Episode Three fort .</p>
                    <p class="mb-2 mt-3"><strong>Neue Inhalte:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Weite Außenbereiche:</strong> Wälder, Berge, verlassene Dörfer .</li>
                    <li><strong>Neue Gegner:</strong> Hunter (schnelle, gepanzerte Synths), Antlion Worker .</li>
                    <li><strong>Neue Waffe:</strong> Magnusson Device – zerstört Striders mit einem Schlag .</li>
                    <li><strong>Die Schlacht von White Forest:</strong> Ein episches Finale mit Striders, Huntern und Rebellen .</li>
                    <li><strong>Das Ende:</strong> Eines der umstrittensten Enden der Gaming-Geschichte – ein Cliffhanger, der nie aufgelöst wurde .</li>
                    </ul>
                    <p class="mt-3"><strong>Kapitel:</strong> 7 (This Vortal Coil, Freeman Pontifex, Riding Shotgun, Under the Radar, Our Mutual Fiend, T-Minus One, und das Finale).</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Released on October 10, 2007 as part of <a href="https://en.wikipedia.org/wiki/The_Orange_Box" target="_blank" class="topic-link">The Orange Box</a>.</strong></p>
                    <p class="mb-2 mt-3"><strong>Plot:</strong> The Citadel's explosion has opened a <strong>Superportal</strong>. Gordon and Alyx must travel through the forests and mountains outside City 17 to close the portal and deliver the resistance rocket's data. The emotional climax sets up the story for a never-released Episode Three .</p>
                    <p class="mb-2 mt-3"><strong>New content:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Vast outdoor areas:</strong> Forests, mountains, abandoned villages .</li>
                    <li><strong>New enemies:</strong> Hunter (fast, armored synths), Antlion Worker .</li>
                    <li><strong>New weapon:</strong> Magnusson Device – destroys Striders in one hit .</li>
                    <li><strong>The Battle of White Forest:</strong> An epic finale with Striders, Hunters, and rebels .</li>
                    <li><strong>The ending:</strong> One of the most controversial endings in gaming history – a cliffhanger never resolved .</li>
                    </ul>
                    <p class="mt-3"><strong>Chapters:</strong> 7 (This Vortal Coil, Freeman Pontifex, Riding Shotgun, Under the Radar, Our Mutual Fiend, T-Minus One, and the finale).</p>
                    </div>
                    `
                },
                {
                    id: 'subsection5_3',
                    titleDe: 'Episode Three (nie erschienen)',
                    titleEn: 'Episode Three (never released)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der Running Gag der Gaming-Welt: „Half-Life 3 confirmed."</strong></p>
                    <p class="mb-2 mt-3"><strong>Was bekannt ist:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Geplant:</strong> Episode Three sollte die Geschichte um Alyx, Eli und das Superportal abschließen .</li>
                    <li><strong>Konzeptkunst:</strong> Einige Artworks zeigen Gordon und Alyx in verschneiten Regionen .</li>
                    <li><strong>Nie offiziell angekündigt:</strong> Valve hat Episode Three nie offiziell vorgestellt. Gabe Newell bestätigte 2011, dass die Episode „nicht vergessen" sei .</li>
                    <li><strong>Half-Life: Alyx (2020):</strong> Ein Prequel, das die Geschichte vor Half-Life 2 erzählt – und ein Ende, das die Zukunft offen lässt .</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Episode Three ist das bekannteste nie erschienene Spiel der Geschichte. Wer Half-Life 2 heute spielt, endet mit einem Cliffhanger – und das bleibt (vorerst) so .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The running gag of the gaming world: "Half-Life 3 confirmed."</strong></p>
                    <p class="mb-2 mt-3"><strong>What is known:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Planned:</strong> Episode Three was to conclude the story around Alyx, Eli, and the Superportal .</li>
                    <li><strong>Concept art:</strong> Some artwork shows Gordon and Alyx in snowy regions .</li>
                    <li><strong>Never officially announced:</strong> Valve never officially presented Episode Three. Gabe Newell confirmed in 2011 that the episode was "not forgotten" .</li>
                    <li><strong>Half-Life: Alyx (2020):</strong> A prequel telling the story before Half-Life 2 – with an ending that leaves the future open .</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Episode Three is the most famous unreleased game in history. Playing Half-Life 2 today ends on a cliffhanger – and that remains (for now) the case .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection5_4',
                    titleDe: 'Lost Coast (2005)',
                    titleEn: 'Lost Coast (2005)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Veröffentlicht am 27. Oktober 2005 – eine technische Demo, kein vollwertiges Kapitel.</strong></p>
                    <p class="mb-2 mt-3"><strong>Technische Bedeutung:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>HDR-Beleuchtung:</strong> Lost Coast war die erste Half-Life-2-Karte mit High Dynamic Range Lighting .</li>
                    <li><strong>Entwickler-Kommentare:</strong> Valve implementierte das Kommentar-System erstmals in Lost Coast .</li>
                    <li><strong>Technologie-Demo:</strong> Zeigte, was die Source-Engine grafisch leisten konnte .</li>
                    </ul>
                    <p class="mt-3"><strong>Mit dem 20th Anniversary Update:</strong> Lost Coast ist jetzt direkt im Hauptspiel enthalten .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Released on October 27, 2005 – a tech demo, not a full chapter.</strong></p>
                    <p class="mb-2 mt-3"><strong>Technical significance:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>HDR lighting:</strong> Lost Coast was the first Half-Life 2 map with High Dynamic Range lighting .</li>
                    <li><strong>Developer commentary:</strong> Valve implemented the commentary system for the first time in Lost Coast .</li>
                    <li><strong>Technology demo:</strong> Showed what the Source engine could achieve graphically .</li>
                    </ul>
                    <p class="mt-3"><strong>With the 20th Anniversary Update:</strong> Lost Coast is now included directly in the main game .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. ALYX & BLACK MESA ============ */
        {
            id: 'section6',
            titleDe: '6. Alyx & Black Mesa',
            titleEn: '6. Alyx & Black Mesa',
            introDe: 'Zwei Spiele erweitern die Half-Life-Saga auf besondere Weise: <strong>Half-Life: Alyx</strong> (2020) als VR-exklusives Prequel, das die Geschichte zwischen HL1 und HL2 erzählt und die Zukunft der Serie neu aufspannt, und <strong>Black Mesa</strong> (2020) als von Fans entwickeltes Remake des Originals in der Source-Engine .',
            introEn: 'Two games expand the Half-Life saga in special ways: <strong>Half-Life: Alyx</strong> (2020) as a VR-exclusive prequel telling the story between HL1 and HL2 and redefining the series\' future, and <strong>Black Mesa</strong> (2020) as a fan-developed remake of the original in the Source engine .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Half-Life: Alyx (2020)',
                    titleEn: 'Half-Life: Alyx (2020)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Veröffentlicht am 23. März 2020 – Valves erste vollwertige Rückkehr zur Half-Life-Serie seit 13 Jahren.</strong></p>
                    <p class="mb-2 mt-3"><strong>Handlung:</strong> Spielt <strong>fünf Jahre vor Half-Life 2</strong> in <strong>City 17</strong>. Alyx Vance und ihr Vater Eli führen den Widerstand gegen die Combine. Die Handlung beginnt mit der Entdeckung einer geheimen Combine-Waffe in einem schwebenden Tresor – doch was sie finden, ist kein Waffe, sondern der <strong>G-Man</strong> .</p>
                    <p class="mb-2 mt-3"><strong>Neue Inhalte:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>VR-exklusiv:</strong> Nutzt Hand-Tracking, Physik-Interaktionen, Klettern .</li>
                    <li><strong>Source 2-Engine:</strong> Das erste große Spiel auf Valves neuer Engine .</li>
                    <li><strong>Drei Waffen:</strong> Pistole, Schrotflinte, SMG. Dazu das Multi-Tool .</li>
                    <li><strong>Upgrades an Werkbänken:</strong> Laser Sight, Ammo-Reservoirs, Reflexvisier .</li>
                    <li><strong>Das Ende:</strong> Überschreibt Episode Two – Alyx rettet ihren Vater, G-Man deutet an, dass sie Gordons Platz einnehmen könnte .</li>
                    </ul>
                    <p class="mt-3"><strong>Steam Frame (2026):</strong> Valve portierte Alyx auf ARM64 für das Steam Frame – ohne Asset-Änderungen, mit Foveated Rendering .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Released on March 23, 2020 – Valve's first full-length return to the Half-Life series in 13 years.</strong></p>
                    <p class="mb-2 mt-3"><strong>Plot:</strong> Set <strong>five years before Half-Life 2</strong> in <strong>City 17</strong>. Alyx Vance and her father Eli lead the resistance against the Combine. The plot begins with the discovery of a secret Combine weapon in a floating vault – but what they find is not a weapon, but the <strong>G-Man</strong> .</p>
                    <p class="mb-2 mt-3"><strong>New content:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>VR-exclusive:</strong> Uses hand tracking, physics interactions, climbing .</li>
                    <li><strong>Source 2 engine:</strong> The first major game on Valve's new engine .</li>
                    <li><strong>Three weapons:</strong> Pistol, shotgun, SMG. Plus the multi-tool .</li>
                    <li><strong>Workbench upgrades:</strong> Laser sight, ammo reservoirs, reflex sight .</li>
                    <li><strong>The ending:</strong> Overwrites Episode Two – Alyx saves her father, G-Man hints she could take Gordon's place .</li>
                    </ul>
                    <p class="mt-3"><strong>Steam Frame (2026):</strong> Valve ported Alyx to ARM64 for the Steam Frame – without asset changes, with foveated rendering .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Black Mesa (2020)',
                    titleEn: 'Black Mesa (2020)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong><a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a></strong> ist ein von Fans entwickeltes Remake von Half-Life in der Source-Engine. Ursprünglich als Mod gestartet, wurde es 2015 im Early Access veröffentlicht und 2020 fertiggestellt .</p>
                    <p class="mb-2 mt-3"><strong>Wichtigste Änderungen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Modernisierte Grafik:</strong> Source-Engine mit aktuellen Shadern und Beleuchtung .</li>
                    <li><strong>Überarbeitete Xen-Level:</strong> Der umstrittenste Teil des Originals wurde komplett neu gestaltet .</li>
                    <li><strong>Neue Rätsel und Gameplay:</strong> Angepasst an moderne Standards .</li>
                    <li><strong>Half-Life 2-Physik:</strong> Objekte können realistisch manipuliert werden .</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Black Mesa ist <strong>kein Ersatz</strong> für das Original, aber eine hervorragende Ergänzung. Wer Half-Life noch nie gespielt hat, kann mit Black Mesa beginnen – wer die Geschichte von 1998 erleben will, spielt das Original .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong><a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a></strong> is a fan-developed remake of Half-Life in the Source engine. Originally started as a mod, it was released in Early Access in 2015 and completed in 2020 .</p>
                    <p class="mb-2 mt-3"><strong>Key changes:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Modernized graphics:</strong> Source engine with current shaders and lighting .</li>
                    <li><strong>Redesigned Xen levels:</strong> The most controversial part of the original was completely rebuilt .</li>
                    <li><strong>New puzzles and gameplay:</strong> Adapted to modern standards .</li>
                    <li><strong>Half-Life 2 physics:</strong> Objects can be manipulated realistically .</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Black Mesa is <strong>not a replacement</strong> for the original, but an excellent addition. If you've never played Half-Life, you can start with Black Mesa – if you want to experience the 1998 story, play the original .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 7. ENGINES ============ */
        {
            id: 'section7',
            titleDe: '7. Die Engines',
            titleEn: '7. The Engines',
            introDe: 'Die Half-Life-Serie wurde auf <strong>drei Engines</strong> entwickelt: <strong>GoldSrc</strong> für Half-Life 1 und seine Erweiterungen, <strong>Source</strong> für Half-Life 2, die Episoden und Black Mesa, sowie <strong>Source 2</strong> für Half-Life: Alyx. Jede Engine brachte technische Revolutionen mit sich .',
            introEn: 'The Half-Life series was developed on <strong>three engines</strong>: <strong>GoldSrc</strong> for Half-Life 1 and its expansions, <strong>Source</strong> for Half-Life 2, the episodes, and Black Mesa, and <strong>Source 2</strong> for Half-Life: Alyx. Each engine brought technical revolutions .',
            subtopics: [
                {
                    id: 'subsection7_1',
                    titleDe: 'GoldSrc (1998)',
                    titleEn: 'GoldSrc (1998)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Ein stark modifizierter Fork der <a href="https://en.wikipedia.org/wiki/Quake_engine" target="_blank" class="topic-link">Quake-Engine</a> von id Software.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>KI mit Task- und Schedule-System:</strong> Neu entwickelt für Half-Life .</li>
                    <li><strong>Skelettales Animationssystem:</strong> Realistischere Charakterbewegungen .</li>
                    <li><strong>Skript-Event-Infrastruktur:</strong> Die Basis für Half-Lifes cineastische Qualität .</li>
                    <li><strong>Nachfolger:</strong> Source-Engine .</li>
                    </ul>
                    <p class="mt-3"><strong>Verwendet für:</strong> Half-Life, Opposing Force, Blue Shift, Decay, Uplink, Counter-Strike 1.6, Team Fortress Classic, Day of Defeat .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>A heavily modified fork of id Software's <a href="https://en.wikipedia.org/wiki/Quake_engine" target="_blank" class="topic-link">Quake engine</a>.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>AI with task and schedule system:</strong> Newly developed for Half-Life .</li>
                    <li><strong>Skeletal animation system:</strong> More realistic character movements .</li>
                    <li><strong>Scripted event infrastructure:</strong> The basis for Half-Life's cinematic quality .</li>
                    <li><strong>Successor:</strong> Source engine .</li>
                    </ul>
                    <p class="mt-3"><strong>Used for:</strong> Half-Life, Opposing Force, Blue Shift, Decay, Uplink, Counter-Strike 1.6, Team Fortress Classic, Day of Defeat .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection7_2',
                    titleDe: 'Source (2004)',
                    titleEn: 'Source (2004)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valves eigene Engine, entwickelt für Half-Life 2.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Havok-Physik:</strong> Realistische Objektmanipulation, Ragdolls, Fahrzeuge .</li>
                    <li><strong>Faceposer:</strong> Realistische Mimik und Lippen-Synchronisation .</li>
                    <li><strong>Multi-Core:</strong> Mit The Orange Box (2007) eingeführt .</li>
                    <li><strong>Nachfolger:</strong> Source 2 .</li>
                    </ul>
                    <p class="mt-3"><strong>Verwendet für:</strong> Half-Life 2, Lost Coast, Episode One, Episode Two, Black Mesa, Portal, Portal 2, Team Fortress 2, Counter-Strike: Source, CS:GO, Left 4 Dead, Left 4 Dead 2, Dota 2 (Übergang), The Stanley Parable .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve's own engine, developed for Half-Life 2.</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Havok physics:</strong> Realistic object manipulation, ragdolls, vehicles .</li>
                    <li><strong>Faceposer:</strong> Realistic facial expressions and lip-sync .</li>
                    <li><strong>Multi-core:</strong> Introduced with The Orange Box (2007) .</li>
                    <li><strong>Successor:</strong> Source 2 .</li>
                    </ul>
                    <p class="mt-3"><strong>Used for:</strong> Half-Life 2, Lost Coast, Episode One, Episode Two, Black Mesa, Portal, Portal 2, Team Fortress 2, Counter-Strike: Source, CS:GO, Left 4 Dead, Left 4 Dead 2, Dota 2 (transition), The Stanley Parable .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection7_3',
                    titleDe: 'Source 2 (2020)',
                    titleEn: 'Source 2 (2020)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valves neueste Engine, erstmals für Dota 2 (2015) verwendet, dann für Half-Life: Alyx (2020).</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>VR-optimiert:</strong> Foveated Rendering, Depth Reprojection, Physik-Interaktionen .</li>
                    <li><strong>Vulkan:</strong> Moderne Grafik-API für bessere Performance .</li>
                    <li><strong>Hammer-Editor:</strong> Neue Level-Editor-Version .</li>
                    <li><strong>ARM64-Port:</strong> 2026 für Steam Frame .</li>
                    </ul>
                    <p class="mt-3"><strong>Verwendet für:</strong> Dota 2 (2015), Artifact (2018), Half-Life: Alyx (2020), Counter-Strike 2 (2023), Deadlock (2024) .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve's newest engine, first used for Dota 2 (2015), then for Half-Life: Alyx (2020).</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>VR-optimized:</strong> Foveated rendering, depth reprojection, physics interactions .</li>
                    <li><strong>Vulkan:</strong> Modern graphics API for better performance .</li>
                    <li><strong>Hammer editor:</strong> New level editor version .</li>
                    <li><strong>ARM64 port:</strong> 2026 for Steam Frame .</li>
                    </ul>
                    <p class="mt-3"><strong>Used for:</strong> Dota 2 (2015), Artifact (2018), Half-Life: Alyx (2020), Counter-Strike 2 (2023), Deadlock (2024) .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 8. HEUTE SPIELEN ============ */
        {
            id: 'section8',
            titleDe: '8. Half-Life heute spielen',
            titleEn: '8. Playing Half-Life Today',
            introDe: 'Alle Half-Life-Spiele sind auf <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a> verfügbar – die meisten für unter 10 €, oft im Sale für 1–2 €. Valve hat die Serie mit den <strong>Jubiläums-Updates</strong> (25th für HL1, 20th für HL2) modernisiert. Für <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> und Linux laufen alle Titel dank Proton hervorragend .',
            introEn: 'All Half-Life games are available on <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a> – most for under $10, often on sale for $1–2. Valve modernized the series with the <strong>anniversary updates</strong> (25th for HL1, 20th for HL2). For the <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> and Linux, all titles run excellently thanks to Proton .',
            subtopics: [
                {
                    id: 'subsection8_1',
                    titleDe: 'Kaufempfehlung',
                    titleEn: 'Buying Recommendation',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Spiel</th><th>Empfehlung</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life 1</a></strong></td><td class="text-[var(--text-muted)]">Pflicht für jeden Shooter-Fan. 25th Anniversary Update macht es modern spielbar .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a></strong></td><td class="text-[var(--text-muted)]">Die beste HL1-Erweiterung. Neue Waffen, Fraktionen, 13 Kapitel .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a></strong></td><td class="text-[var(--text-muted)]">Kürzer, aber erzählerisch dicht. High Definition Pack inklusive .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a></strong></td><td class="text-[var(--text-muted)]">Eines der besten Spiele aller Zeiten. 20th Anniversary Update mit Episoden .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a></strong></td><td class="text-[var(--text-muted)]">Nur mit VR-Headset spielbar. Das beste VR-Spiel aller Zeiten .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a></strong></td><td class="text-[var(--text-muted)]">Fan-Remake. Perfekt für Neueinsteiger, die Half-Life 1 nicht mögen .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Game</th><th>Recommendation</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life 1</a></strong></td><td class="text-[var(--text-muted)]">A must-play for every shooter fan. 25th Anniversary Update makes it modern .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a></strong></td><td class="text-[var(--text-muted)]">The best HL1 expansion. New weapons, factions, 13 chapters .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a></strong></td><td class="text-[var(--text-muted)]">Shorter but narratively dense. High Definition Pack included .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank" class="topic-link">Half-Life 2</a></strong></td><td class="text-[var(--text-muted)]">One of the best games of all time. 20th Anniversary Update with episodes .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a></strong></td><td class="text-[var(--text-muted)]">Only playable with a VR headset. The best VR game of all time .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a></strong></td><td class="text-[var(--text-muted)]">Fan remake. Perfect for newcomers who don't like Half-Life 1 .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection8_2',
                    titleDe: 'Warum Half-Life 2026 noch wichtig ist',
                    titleEn: 'Why Half-Life Still Matters in 2026',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Half-Life ist ein Stück Gaming-Geschichte:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Game Design:</strong> Die nahtlose Kampagne ohne Level-Übergänge war 1998 revolutionär und beeinflusst noch heute Spiele wie Portal, BioShock oder Metro .</li>
                    <li><strong>Storytelling:</strong> Die Geschichte wird komplett in Echtzeit erzählt – kein einziges Rendervideo, keine Zwischensequenz .</li>
                    <li><strong>KI und Skript-Events:</strong> Die Marines, die sich taktisch verhalten, waren damals bahnbrechend .</li>
                    <li><strong>Die Gravity Gun:</strong> Eine der kreativsten Waffen der Gaming-Geschichte .</li>
                    <li><strong>GLaDOS & der G-Man:</strong> Zwei der ikonischsten Figuren der Gaming-Geschichte .</li>
                    <li><strong>Valves Philosophie:</strong> Wer verstehen will, warum Valve heute so wichtig ist, muss Half-Life spielen .</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Half-Life ist kein „Retro-Spiel" – es ist ein <strong>Klassiker</strong>, der auch 2026 noch Maßstäbe setzt. Wer Shooter mag und es noch nie gespielt hat, verpasst ein Stück Gaming-Geschichte .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Half-Life is a piece of gaming history:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Game design:</strong> The seamless campaign without level transitions was revolutionary in 1998 and still influences games like Portal, BioShock, or Metro today .</li>
                    <li><strong>Storytelling:</strong> The story is told entirely in real-time – not a single rendered video, no cutscene .</li>
                    <li><strong>AI and scripted events:</strong> The marines who behave tactically were groundbreaking at the time .</li>
                    <li><strong>The Gravity Gun:</strong> One of the most creative weapons in gaming history .</li>
                    <li><strong>GLaDOS & the G-Man:</strong> Two of the most iconic characters in gaming history .</li>
                    <li><strong>Valve's philosophy:</strong> To understand why Valve is so important today, you have to play Half-Life .</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Half-Life is not a "retro game" – it is a <strong>classic</strong> that still sets standards in 2026. If you like shooters and have never played it, you're missing a piece of gaming history .</p>
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
            introDe: 'Die wichtigsten Half-Life-Aspekte auf einen Blick.',
            introEn: 'The key Half-Life aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-flask opacity-70"></i><span>1. Ursprung & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">1998 veröffentlicht. Revolutionierte Ego-Shooter mit nahtloser Kampagne und Storytelling durch Skript-Events. Einer der einflussreichsten Shooter aller Zeiten.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>2. Vier Erweiterungen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a>, <a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a>, <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Decay" target="_blank" class="topic-link">Decay</a> (PS2-exklusiv) und <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a> (Demo). Plus Fan-Remake <a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-halved opacity-70"></i><span>3. Half-Life 2 & Episoden</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Eines der besten Spiele aller Zeiten (2004). Zwei Episoden (2006, 2007). Episode Three nie erschienen. 20th Anniversary Update (2024).</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-vr-cardboard opacity-70"></i><span>4. Alyx & Zukunft</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a> (2020) als VR-Meilenstein. Steam Frame-Port (2026). Das Ende deutet auf eine Fortsetzung hin.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-flask opacity-70"></i><span>1. Origin & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Released 1998. Revolutionized first-person shooters with a seamless campaign and scripted-event storytelling. One of the most influential shooters of all time.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>2. Four Expansions</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank" class="topic-link">Opposing Force</a>, <a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank" class="topic-link">Blue Shift</a>, <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Decay" target="_blank" class="topic-link">Decay</a> (PS2-exclusive) and <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Uplink" target="_blank" class="topic-link">Uplink</a> (demo). Plus fan remake <a href="https://store.steampowered.com/app/362890/Black_Mesa/" target="_blank" class="topic-link">Black Mesa</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-halved opacity-70"></i><span>3. Half-Life 2 & Episodes</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">One of the best games of all time (2004). Two episodes (2006, 2007). Episode Three never released. 20th Anniversary Update (2024).</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-vr-cardboard opacity-70"></i><span>4. Alyx & The Future</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" class="topic-link">Half-Life: Alyx</a> (2020) as a VR milestone. Steam Frame port (2026). The ending hints at a continuation.</p>
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
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/70/HalfLife/',                       target: '_blank', labelDe: 'Half-Life auf Steam',         labelEn: 'Half-Life on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/220/HalfLife_2/',                     target: '_blank', labelDe: 'Half-Life 2 auf Steam',       labelEn: 'Half-Life 2 on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/546560/HalfLife_Alyx/',               target: '_blank', labelDe: 'Half-Life: Alyx auf Steam',   labelEn: 'Half-Life: Alyx on Steam' },
            { icon: 'fa-gamepad',  href: 'https://store.steampowered.com/app/50/HalfLife_Opposing_Force/',        target: '_blank', labelDe: 'Opposing Force',               labelEn: 'Opposing Force' },
            { icon: 'fa-gamepad',  href: 'https://store.steampowered.com/app/130/HalfLife_Blue_Shift/',           target: '_blank', labelDe: 'Blue Shift',                   labelEn: 'Blue Shift' },
            { icon: 'fa-wrench',   href: 'https://store.steampowered.com/app/362890/Black_Mesa/',                  target: '_blank', labelDe: 'Black Mesa (Fan-Remake)',      labelEn: 'Black Mesa (Fan Remake)' },
            { icon: 'fa-code',     href: 'https://github.com/ValveSoftware/halflife',                              target: '_blank', labelDe: 'Half-Life SDK (GitHub)',      labelEn: 'Half-Life SDK (GitHub)' },
            { icon: 'fa-book',     href: 'https://half-life.fandom.com/',                                          target: '_blank', labelDe: 'Half-Life Wiki',               labelEn: 'Half-Life Wiki' }
        ]
    },

    footer: {
        textDe: 'Half-Life Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Half-Life Reference · v1.0 · Dual Lang · 2026'
    }
});