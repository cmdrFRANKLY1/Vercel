// resources/topics/topic_portal.js
// Registers the complete Portal franchise reference topic.
// Covers Portal 1, Portal: Still Alive, Portal 2, all DLCs,
// spin-offs, and the entire Portal legacy.
// Loaded via <script> injection.

/* ==================================================================
   PORTAL (SERIES) CODE-BLOCK COPY CONTROLLER
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
    id: 'Portal Series Overview',
    icon: 'fa-circle-nodes',
    titleDe: 'Portal',
    titleEn: 'Portal',
    descDe: 'Die komplette Portal-Saga von 2007 bis heute',
    descEn: 'The Complete Portal Saga from 2007 to Today',

    sidebarTitleDe: 'Portal',
    sidebarTitleEn: 'Portal',
    sidebarSubtitleDe: '2007–2026 · Valve · Source, Source 2',
    sidebarSubtitleEn: '2007–2026 · Valve · Source, Source 2',
    sidebarVersion: 'Complete Saga',

    hero: {
        titleDe: 'Portal: Die Puzzle-Saga, die Gaming für immer veränderte',
        titleEn: 'Portal: The Puzzle Saga That Changed Gaming Forever',
        introDe: '<a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal</a> erschien am <strong>10. Oktober 2007</strong> als Teil von <a href="https://en.wikipedia.org/wiki/The_Orange_Box" target="_blank" class="topic-link">The Orange Box</a> und wurde zum Phänomen. Aus dem Studentenprojekt <a href="https://en.wikipedia.org/wiki/Narbacular_Drop" target="_blank" class="topic-link">Narbacular Drop</a> hervorgegangen, kombinierte Valve <strong>Portale, Physik und schwarzen Humor</strong> zu einem Erlebnis, das in wenigen Stunden mehr erzählt als andere Spiele in 40. Die KI <a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a> wurde zur Kultfigur, das Lied „Still Alive" zum Internet-Phänomen. Der Nachfolger <a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2</a> (2011) erweiterte das Konzept um neue Mechaniken, eine Co-op-Kampagne und eine der besten Storys der Gaming-Geschichte. Dieser Guide deckt die komplette Saga ab: beide Spiele, alle DLCs, Spin-offs, Mods und die moderne Wiedergabe .',
        introEn: '<a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal</a> was released on <strong>October 10, 2007</strong> as part of <a href="https://en.wikipedia.org/wiki/The_Orange_Box" target="_blank" class="topic-link">The Orange Box</a> and became a phenomenon. Born from the student project <a href="https://en.wikipedia.org/wiki/Narbacular_Drop" target="_blank" class="topic-link">Narbacular Drop</a>, Valve combined <strong>portals, physics, and dark humor</strong> into an experience that tells more in a few hours than other games do in 40. The AI <a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a> became a cult figure, the song "Still Alive" an internet phenomenon. The sequel <a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2</a> (2011) expanded the concept with new mechanics, a co-op campaign, and one of the best stories in gaming history. This guide covers the complete saga: both games, all DLCs, spin-offs, mods, and modern playback .'
    },

    quickLinks: [
        { icon: 'fa-list',              href: '#section1', switchToDoc: true, labelDe: 'Serie-Überblick', labelEn: 'Series Overview' },
        { icon: 'fa-circle-dot',        href: '#section2', switchToDoc: true, labelDe: 'Portal 1',        labelEn: 'Portal 1' },
        { icon: 'fa-plus-circle',       href: '#section3', switchToDoc: true, labelDe: 'Still Alive',     labelEn: 'Still Alive' },
        { icon: 'fa-circle-nodes',      href: '#section4', switchToDoc: true, labelDe: 'Portal 2',        labelEn: 'Portal 2' },
        { icon: 'fa-download',          href: '#section5', switchToDoc: true, labelDe: 'DLCs',            labelEn: 'DLCs' },
        { icon: 'fa-cube',              href: '#section6', switchToDoc: true, labelDe: 'Spin-offs',       labelEn: 'Spin-offs' },
        { icon: 'fa-wrench',            href: '#section7', switchToDoc: true, labelDe: 'Mods & Community', labelEn: 'Mods & Community' },
        { icon: 'fa-play',              href: '#section8', switchToDoc: true, labelDe: 'Heute spielen',   labelEn: 'Playing Today' }
    ],

    sections: [
        /* ============ 1. SERIE-ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Serie-Überblick',
            titleEn: '1. Series Overview',
            introDe: 'Die Portal-Serie erzählt die Geschichte von <strong>Chell</strong>, einer Testperson im <strong>Aperture Science Enrichment Center</strong>, die von der KI <a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a> durch Testkammern geführt wird. Die Reihe umfasst <strong>zwei Hauptspiele</strong> (Portal, Portal 2), eine Xbox-exklusive Erweiterung (Still Alive), mehrere DLCs und eine Vielzahl von Spin-offs. Portal spielt im selben Universum wie <a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a> – Aperture Science ist der Konkurrent von Black Mesa .',
            introEn: 'The Portal series tells the story of <strong>Chell</strong>, a test subject at the <strong>Aperture Science Enrichment Center</strong>, guided through test chambers by the AI <a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a>. The series comprises <strong>two main games</strong> (Portal, Portal 2), an Xbox-exclusive expansion (Still Alive), several DLCs, and numerous spin-offs. Portal takes place in the same universe as <a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank" class="topic-link">Half-Life</a> – Aperture Science is Black Mesa\'s competitor .',
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
                    <tr><th class="w-1/5">Titel</th><th class="w-1/5">Jahr</th><th class="w-1/5">Plattform</th><th>Status</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal</a></strong></td><td class="text-[var(--text-muted)]">2007</td><td class="text-[var(--text-muted)]">PC, Xbox 360, PS3, macOS, Linux</td><td class="text-[var(--text-muted)]">In The Orange Box, auf Steam verfügbar</td></tr>
                    <tr><td><strong><a href="https://developer.valvesoftware.com/wiki/Portal:_Still_Alive" target="_blank" class="topic-link">Portal: Still Alive</a></strong></td><td class="text-[var(--text-muted)]">2008</td><td class="text-[var(--text-muted)]">Xbox 360 (XBLA)</td><td class="text-[var(--text-muted)]">Xbox-exklusiv, auf neueren Xbox-Konsolen via Backward Compatibility</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2</a></strong></td><td class="text-[var(--text-muted)]">2011</td><td class="text-[var(--text-muted)]">PC, Xbox 360, PS3, macOS, Linux</td><td class="text-[var(--text-muted)]">Auf Steam verfügbar, aktive Community</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/660/Portal_2_Sixense_MotionPack_DLC/" target="_blank" class="topic-link">Portal 2: Sixense MotionPack</a></strong></td><td class="text-[var(--text-muted)]">2011</td><td class="text-[var(--text-muted)]">PC (Razer Hydra), PS3 (PS Move)</td><td class="text-[var(--text-muted)]">DLC für Motion-Controller, auf Steam verfügbar</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2: Peer Review</a></strong></td><td class="text-[var(--text-muted)]">2011</td><td class="text-[var(--text-muted)]">PC, Xbox 360, PS3, macOS</td><td class="text-[var(--text-muted)]">Kostenloser DLC, auf Steam automatisch enthalten</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2: Perpetual Testing Initiative</a></strong></td><td class="text-[var(--text-muted)]">2012</td><td class="text-[var(--text-muted)]">PC, macOS</td><td class="text-[var(--text-muted)]">Kostenloser DLC, auf Steam automatisch enthalten</td></tr>
                    <tr><td><strong>Bridge Constructor Portal</strong></td><td class="text-[var(--text-muted)]">2017</td><td class="text-[var(--text-muted)]">PC, Konsolen, Mobile</td><td class="text-[var(--text-muted)]">Lizenzierter Spin-off von Headup Games</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal Companion Collection</a></strong></td><td class="text-[var(--text-muted)]">2022</td><td class="text-[var(--text-muted)]">Nintendo Switch</td><td class="text-[var(--text-muted)]">Enthält Portal + Portal 2 + Still Alive Bonus-Level</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Title</th><th class="w-1/5">Year</th><th class="w-1/5">Platform</th><th>Status</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal</a></strong></td><td class="text-[var(--text-muted)]">2007</td><td class="text-[var(--text-muted)]">PC, Xbox 360, PS3, macOS, Linux</td><td class="text-[var(--text-muted)]">In The Orange Box, available on Steam</td></tr>
                    <tr><td><strong><a href="https://developer.valvesoftware.com/wiki/Portal:_Still_Alive" target="_blank" class="topic-link">Portal: Still Alive</a></strong></td><td class="text-[var(--text-muted)]">2008</td><td class="text-[var(--text-muted)]">Xbox 360 (XBLA)</td><td class="text-[var(--text-muted)]">Xbox-exclusive, playable on newer Xbox consoles via backward compatibility</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2</a></strong></td><td class="text-[var(--text-muted)]">2011</td><td class="text-[var(--text-muted)]">PC, Xbox 360, PS3, macOS, Linux</td><td class="text-[var(--text-muted)]">Available on Steam, active community</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/660/Portal_2_Sixense_MotionPack_DLC/" target="_blank" class="topic-link">Portal 2: Sixense MotionPack</a></strong></td><td class="text-[var(--text-muted)]">2011</td><td class="text-[var(--text-muted)]">PC (Razer Hydra), PS3 (PS Move)</td><td class="text-[var(--text-muted)]">Motion controller DLC, available on Steam</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2: Peer Review</a></strong></td><td class="text-[var(--text-muted)]">2011</td><td class="text-[var(--text-muted)]">PC, Xbox 360, PS3, macOS</td><td class="text-[var(--text-muted)]">Free DLC, automatically included on Steam</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2: Perpetual Testing Initiative</a></strong></td><td class="text-[var(--text-muted)]">2012</td><td class="text-[var(--text-muted)]">PC, macOS</td><td class="text-[var(--text-muted)]">Free DLC, automatically included on Steam</td></tr>
                    <tr><td><strong>Bridge Constructor Portal</strong></td><td class="text-[var(--text-muted)]">2017</td><td class="text-[var(--text-muted)]">PC, consoles, mobile</td><td class="text-[var(--text-muted)]">Licensed spin-off by Headup Games</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal Companion Collection</a></strong></td><td class="text-[var(--text-muted)]">2022</td><td class="text-[var(--text-muted)]">Nintendo Switch</td><td class="text-[var(--text-muted)]">Includes Portal + Portal 2 + Still Alive bonus levels</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Die Hauptfiguren',
                    titleEn: 'The Main Characters',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Figur</th><th>Rolle</th></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Chell" target="_blank" class="topic-link">Chell</a></strong></td><td class="text-[var(--text-muted)]">Protagonistin beider Spiele. Schweigsam, außergewöhnliche Ausdauer. Trägt das orange Test Subject Attire .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a></strong></td><td class="text-[var(--text-muted)]">Genetic Lifeform and Disk Operating System. Die KI, die Chell durch die Testkammern führt. Passiv-aggressiv, sarkastisch, mörderisch .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Wheatley" target="_blank" class="topic-link">Wheatley</a></strong></td><td class="text-[var(--text-muted)]">Persönlichkeitskern in Portal 2. Zunächst Verbündeter, dann Antagonist. Britisch, tollpatschig, wahnsinnig .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Cave_Johnson" target="_blank" class="topic-link">Cave Johnson</a></strong></td><td class="text-[var(--text-muted)]">Gründer von Aperture Science. Spricht zu Chell über aufgezeichnete Nachrichten. Gesprochen von J.K. Simmons .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Caroline" target="_blank" class="topic-link">Caroline</a></strong></td><td class="text-[var(--text-muted)]">Cave Johnsons Assistentin. Wird zur Grundlage für GLaDOS' Persönlichkeit .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/ATLAS_and_P-body" target="_blank" class="topic-link">ATLAS & P-body</a></strong></td><td class="text-[var(--text-muted)]">Die beiden Roboter der Co-op-Kampagne in Portal 2. Spielbar in Multiplayer-Testkammern .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Weighted_Companion_Cube" target="_blank" class="topic-link">Weighted Companion Cube</a></strong></td><td class="text-[var(--text-muted)]">Der berühmte Würfel mit Herz. Muss am Ende von Kammer 17 „euthanasiert" werden. Wurde zum Internet-Meme .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Character</th><th>Role</th></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Chell" target="_blank" class="topic-link">Chell</a></strong></td><td class="text-[var(--text-muted)]">Protagonist of both games. Silent, extraordinary stamina. Wears the orange Test Subject Attire .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/GLaDOS" target="_blank" class="topic-link">GLaDOS</a></strong></td><td class="text-[var(--text-muted)]">Genetic Lifeform and Disk Operating System. The AI guiding Chell through test chambers. Passive-aggressive, sarcastic, murderous .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Wheatley" target="_blank" class="topic-link">Wheatley</a></strong></td><td class="text-[var(--text-muted)]">Personality core in Portal 2. Initially an ally, then antagonist. British, clumsy, insane .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Cave_Johnson" target="_blank" class="topic-link">Cave Johnson</a></strong></td><td class="text-[var(--text-muted)]">Founder of Aperture Science. Speaks to Chell via recorded messages. Voiced by J.K. Simmons .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Caroline" target="_blank" class="topic-link">Caroline</a></strong></td><td class="text-[var(--text-muted)]">Cave Johnson's assistant. Becomes the basis for GLaDOS's personality .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/ATLAS_and_P-body" target="_blank" class="topic-link">ATLAS & P-body</a></strong></td><td class="text-[var(--text-muted)]">The two robots from the co-op campaign in Portal 2. Playable in multiplayer test chambers .</td></tr>
                    <tr><td><strong><a href="https://half-life.fandom.com/wiki/Weighted_Companion_Cube" target="_blank" class="topic-link">Weighted Companion Cube</a></strong></td><td class="text-[var(--text-muted)]">The famous cube with a heart. Must be "euthanized" at the end of chamber 17. Became an internet meme .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. PORTAL 1 ============ */
        {
            id: 'section2',
            titleDe: '2. Portal 1 (2007)',
            titleEn: '2. Portal 1 (2007)',
            introDe: '<a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal</a> wurde am <strong>10. Oktober 2007</strong> als Teil von <a href="https://en.wikipedia.org/wiki/The_Orange_Box" target="_blank" class="topic-link">The Orange Box</a> veröffentlicht und ist eines der einflussreichsten Puzzlespiele aller Zeiten. Aus dem Studentenprojekt <a href="https://en.wikipedia.org/wiki/Narbacular_Drop" target="_blank" class="topic-link">Narbacular Drop</a> hervorgegangen, kombinierte Valve <strong>Portale, Physik und schwarzen Humor</strong> zu einem Erlebnis, das in wenigen Stunden mehr erzählt als andere Spiele in 40. Der Abspann-Song <a href="https://www.youtube.com/watch?v=Y6ljFaKRTrI" target="_blank" class="topic-link">„Still Alive"</a> von <a href="https://en.wikipedia.org/wiki/Jonathan_Coulton" target="_blank" class="topic-link">Jonathan Coulton</a> wurde zum Internet-Phänomen .',
            introEn: '<a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal</a> was released on <strong>October 10, 2007</strong> as part of <a href="https://en.wikipedia.org/wiki/The_Orange_Box" target="_blank" class="topic-link">The Orange Box</a> and is one of the most influential puzzle games of all time. Born from the student project <a href="https://en.wikipedia.org/wiki/Narbacular_Drop" target="_blank" class="topic-link">Narbacular Drop</a>, Valve combined <strong>portals, physics, and dark humor</strong> into an experience that tells more in a few hours than other games do in 40. The credits song <a href="https://www.youtube.com/watch?v=Y6ljFaKRTrI" target="_blank" class="topic-link">"Still Alive"</a> by <a href="https://en.wikipedia.org/wiki/Jonathan_Coulton" target="_blank" class="topic-link">Jonathan Coulton</a> became an internet phenomenon .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Story & Gameplay',
                    titleEn: 'Story & Gameplay',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die Handlung:</strong> Chell erwacht im Aperture Science Enrichment Center und wird von GLaDOS durch 19 Testkammern geführt. Was als harmlose Testreihe beginnt, entwickelt sich zu einem Kampf ums Überleben – GLaDOS hat ihre eigenen Pläne, und am Ende muss Chell sie zerstören .</p>
                    <p class="mb-2 mt-3"><strong>Kernmechanik:</strong> Die <strong>Portal Gun (ASHPD)</strong> erzeugt zwei verbundene Portale – eines orange, eines blau. Alles, was durch das eine geht, kommt aus dem anderen heraus. Physik, Timing und räumliches Denken sind entscheidend .</p>
                    <p class="mb-2 mt-3"><strong>Die wichtigsten Elemente:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Weighted Cubes:</strong> Metallwürfel für Knöpfe .</li>
                    <li><strong>High Energy Pellets:</strong> Energie-Kugeln durch Portale leiten .</li>
                    <li><strong>Turrets:</strong> Automatische Geschütztürme mit Laser-Visier .</li>
                    <li><strong>Toxic Goo:</strong> Grüner Schleim, der sofort tötet .</li>
                    <li><strong>Emancipation Grid:</strong> Desintegrations-Gitter am Ende jeder Kammer .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The plot:</strong> Chell awakens in the Aperture Science Enrichment Center and is guided by GLaDOS through 19 test chambers. What begins as a harmless testing sequence evolves into a fight for survival – GLaDOS has her own plans, and in the end, Chell must destroy her .</p>
                    <p class="mb-2 mt-3"><strong>Core mechanic:</strong> The <strong>Portal Gun (ASHPD)</strong> creates two linked portals – one orange, one blue. Anything that goes through one comes out of the other. Physics, timing, and spatial thinking are essential .</p>
                    <p class="mb-2 mt-3"><strong>The most important elements:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Weighted Cubes:</strong> Metal cubes for buttons .</li>
                    <li><strong>High Energy Pellets:</strong> Guide energy balls through portals .</li>
                    <li><strong>Turrets:</strong> Automatic gun turrets with laser sights .</li>
                    <li><strong>Toxic Goo:</strong> Green slime that kills instantly .</li>
                    <li><strong>Emancipation Grid:</strong> Disintegration grid at the end of each chamber .</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Die Companion Cube-Kammer',
                    titleEn: 'The Companion Cube Chamber',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Die berühmteste Kammer in Portal 1 ist Kammer 17 – die Companion Cube-Kammer.</strong></p>
                    <p class="mb-2 mt-3"><strong>Warum ist sie so besonders?</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Der Weighted Companion Cube:</strong> Ein Würfel mit pinken Herzen auf allen sechs Seiten – der einzige Würfel mit einer solchen Markierung .</li>
                    <li><strong>GLaDOS' Psychospiel:</strong> GLaDOS zwingt Chell, den Würfel als „Freund" zu behandeln, und dann ihn zu „euthanasieren" .</li>
                    <li><strong>Die Euthanasie:</strong> Am Ende der Kammer muss Chell den Würfel in den Verbrennungsofen werfen – eine der emotionalsten Szenen des Spiels .</li>
                    <li><strong>Popkultur:</strong> Der Cube wurde zum Internet-Meme. Fan-Merch, Kuscheltiere, Tassen und sogar ein eigenes Kartenspiel in Portal 2 .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The most famous chamber in Portal 1 is chamber 17 – the Companion Cube chamber.</strong></p>
                    <p class="mb-2 mt-3"><strong>Why is it so special?</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>The Weighted Companion Cube:</strong> A cube with pink hearts on all six sides – the only cube with such a marking .</li>
                    <li><strong>GLaDOS's mind game:</strong> GLaDOS forces Chell to treat the cube as a "friend," then to "euthanize" it .</li>
                    <li><strong>The euthanasia:</strong> At the end of the chamber, Chell must throw the cube into the incinerator – one of the most emotional scenes in the game .</li>
                    <li><strong>Pop culture:</strong> The cube became an internet meme. Fan merch, plushies, mugs, and even its own card game in Portal 2 .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. STILL ALIVE ============ */
        {
            id: 'section3',
            titleDe: '3. Portal: Still Alive (2008)',
            titleEn: '3. Portal: Still Alive (2008)',
            introDe: '<a href="https://developer.valvesoftware.com/wiki/Portal:_Still_Alive" target="_blank" class="topic-link">Portal: Still Alive</a> ist eine <strong>Xbox Live Arcade-exklusive Erweiterung</strong> von Portal, die 2008 veröffentlicht wurde. Sie enthält das komplette Originalspiel plus <strong>14 neue Bonus-Level</strong>, die auf der beliebten Flash-Version <a href="https://www.newgrounds.com/portal/view/404137" target="_blank" class="topic-link">Portal: The Flash Version</a> basieren .',
            introEn: '<a href="https://developer.valvesoftware.com/wiki/Portal:_Still_Alive" target="_blank" class="topic-link">Portal: Still Alive</a> is an <strong>Xbox Live Arcade-exclusive expansion</strong> of Portal released in 2008. It includes the complete original game plus <strong>14 new bonus levels</strong> based on the popular Flash version <a href="https://www.newgrounds.com/portal/view/404137" target="_blank" class="topic-link">Portal: The Flash Version</a> .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Inhalt & Unterschiede',
                    titleEn: 'Content & Differences',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Beschreibung</th></tr>
                    <tr><td><strong>14 neue Bonus-Level</strong></td><td class="text-[var(--text-muted)]">Basiert auf Portal: The Flash Version. Neue Herausforderungen und Rätsel .</td></tr>
                    <tr><td><strong>Challenge Mode</strong></td><td class="text-[var(--text-muted)]">Die Advanced Chambers haben jetzt einen Challenge Mode – kombiniert mit den Bonus-Leveln .</td></tr>
                    <tr><td><strong>Neue Achievements</strong></td><td class="text-[var(--text-muted)]">12 neue Xbox-Achievements, andere als in der PC-Version .</td></tr>
                    <tr><td><strong>Leaderboards</strong></td><td class="text-[var(--text-muted)]">Globale Bestenlisten für Zeit-, Portal- und Schritt-Wertung .</td></tr>
                    <tr><td><strong>Trial Mode</strong></td><td class="text-[var(--text-muted)]">Kostenlose Demo bis Kammer 11, plus erste Bonus-Kammer .</td></tr>
                    <tr><td><strong>4K-Support</strong></td><td class="text-[var(--text-muted)]">Auf Xbox One X und Series X wird das Spiel in 4K gerendert .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wichtig:</strong> Portal: Still Alive ist <strong>Xbox-exklusiv</strong> und wurde nie auf PC portiert. Die Bonus-Level sind in der <a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal Companion Collection</a> für Nintendo Switch enthalten, aber ohne die neuen Achievements .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Description</th></tr>
                    <tr><td><strong>14 new bonus levels</strong></td><td class="text-[var(--text-muted)]">Based on Portal: The Flash Version. New challenges and puzzles .</td></tr>
                    <tr><td><strong>Challenge Mode</strong></td><td class="text-[var(--text-muted)]">Advanced Chambers now have a Challenge Mode – combined with bonus levels .</td></tr>
                    <tr><td><strong>New achievements</strong></td><td class="text-[var(--text-muted)]">12 new Xbox achievements, different from the PC version .</td></tr>
                    <tr><td><strong>Leaderboards</strong></td><td class="text-[var(--text-muted)]">Global leaderboards for time, portal, and step scores .</td></tr>
                    <tr><td><strong>Trial Mode</strong></td><td class="text-[var(--text-muted)]">Free demo up to chamber 11, plus first bonus chamber .</td></tr>
                    <tr><td><strong>4K support</strong></td><td class="text-[var(--text-muted)]">Rendered at 4K on Xbox One X and Series X .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Important:</strong> Portal: Still Alive is <strong>Xbox-exclusive</strong> and was never ported to PC. The bonus levels are included in the <a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal Companion Collection</a> for Nintendo Switch, but without the new achievements .</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Wie man es heute spielt',
                    titleEn: 'How to Play It Today',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Möglichkeiten, Portal: Still Alive heute zu spielen:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Xbox Series X/S oder Xbox One:</strong> Über Backward Compatibility. Kauf im Microsoft Store .</li>
                    <li><strong>Xbox 360:</strong> Der Xbox 360 Marketplace wurde geschlossen, aber wer das Spiel bereits besitzt, kann es weiterhin spielen .</li>
                    <li><strong>Nintendo Switch:</strong> Die <a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal Companion Collection</a> enthält die Bonus-Level, aber ohne die Xbox-Achievements .</li>
                    <li><strong>PC (inoffiziell):</strong> Es existiert ein Fan-Port, aber mit kleineren Änderungen an den Maps und ohne die neuen Achievements .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Ways to play Portal: Still Alive today:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Xbox Series X/S or Xbox One:</strong> Via backward compatibility. Purchase in the Microsoft Store .</li>
                    <li><strong>Xbox 360:</strong> The Xbox 360 Marketplace has shut down, but those who already own the game can still play it .</li>
                    <li><strong>Nintendo Switch:</strong> The <a href="https://store.steampowered.com/app/400/Portal/" target="_blank" class="topic-link">Portal Companion Collection</a> includes the bonus levels, but without the Xbox achievements .</li>
                    <li><strong>PC (unofficial):</strong> A fan port exists, but with minor map changes and without the new achievements .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. PORTAL 2 ============ */
        {
            id: 'section4',
            titleDe: '4. Portal 2 (2011)',
            titleEn: '4. Portal 2 (2011)',
            introDe: '<a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2</a> wurde am <strong>19. April 2011</strong> veröffentlicht und gilt als einer der besten Nachfolger der Gaming-Geschichte. Valve erweiterte die Portal-Mechanik um <strong>Liquid-Aperture-Science-Gel</strong>, <strong>Lichtbrücken</strong>, <strong>Excursion Funnels</strong> und eine <strong>eigenständige Co-op-Kampagne</strong>. Die Geschichte um Chell, GLaDOS, Wheatley und Cave Johnson ist eine der besten der Gaming-Geschichte .',
            introEn: '<a href="https://store.steampowered.com/app/620/Portal_2/" target="_blank" class="topic-link">Portal 2</a> was released on <strong>April 19, 2011</strong> and is considered one of the best sequels in gaming history. Valve expanded the Portal mechanics with <strong>Liquid Aperture Science Gel</strong>, <strong>light bridges</strong>, <strong>excursion funnels</strong>, and a <strong>standalone co-op campaign</strong>. The story around Chell, GLaDOS, Wheatley, and Cave Johnson is one of the best in gaming history .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Neue Mechaniken',
                    titleEn: 'New Mechanics',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Element</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Repulsion Gel (blaues Gel)</strong></td><td class="text-[var(--text-muted)]">Erzeugt Sprungkraft – Objekte und Chell springen höher .</td></tr>
                    <tr><td><strong>Propulsion Gel (oranges Gel)</strong></td><td class="text-[var(--text-muted)]">Erzeugt Beschleunigung – Objekte gleiten auf der Oberfläche .</td></tr>
                    <tr><td><strong>Conversion Gel (weißes Gel)</strong></td><td class="text-[var(--text-muted)]">Ermöglicht Portale auf zuvor ungeeigneten Oberflächen. Wird aus Mondstaub hergestellt .</td></tr>
                    <tr><td><strong>Light Bridge</strong></td><td class="text-[var(--text-muted)]">Ein Lichtstrahl, der als begehbare Brücke dient. Kann Portale durchqueren .</td></tr>
                    <tr><td><strong>Excursion Funnel</strong></td><td class="text-[var(--text-muted)]">Ein vertikaler Traktorstrahl, der Objekte und Chell in eine Richtung zieht .</td></tr>
                    <tr><td><strong>Aerial Faith Plate</strong></td><td class="text-[var(--text-muted)]">Eine Platte, die Chell in einem festen Bogen durch die Luft schleudert .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Element</th><th>Description</th></tr>
                    <tr><td><strong>Repulsion Gel (blue gel)</strong></td><td class="text-[var(--text-muted)]">Creates jumping force – objects and Chell jump higher .</td></tr>
                    <tr><td><strong>Propulsion Gel (orange gel)</strong></td><td class="text-[var(--text-muted)]">Creates acceleration – objects slide on the surface .</td></tr>
                    <tr><td><strong>Conversion Gel (white gel)</strong></td><td class="text-[var(--text-muted)]">Enables portals on previously unsuitable surfaces. Made from moon dust .</td></tr>
                    <tr><td><strong>Light Bridge</strong></td><td class="text-[var(--text-muted)]">A beam of light that serves as a walkable bridge. Can pass through portals .</td></tr>
                    <tr><td><strong>Excursion Funnel</strong></td><td class="text-[var(--text-muted)]">A vertical tractor beam that pulls objects and Chell in one direction .</td></tr>
                    <tr><td><strong>Aerial Faith Plate</strong></td><td class="text-[var(--text-muted)]">A plate that flings Chell through the air in a fixed arc .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Co-op-Kampagne',
                    titleEn: 'Co-op Campaign',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Portal 2 hat eine eigenständige Co-op-Kampagne mit ATLAS und P-body.</strong></p>
                    <p class="mb-2 mt-3"><strong>Die Co-op-Kapitel:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Team Building:</strong> Einführung in die Co-op-Mechanik .</li>
                    <li><strong>Mass and Velocity:</strong> Physik-Rätsel mit Würfeln und Portalen .</li>
                    <li><strong>Hard Light:</strong> Light Bridges und ihre Kombination mit Portalen .</li>
                    <li><strong>Excursion Funnels:</strong> Vertikale Traktorstrahlen und ihr Timing .</li>
                    <li><strong>Mobility Gels:</strong> Die drei Gele in Kombination mit Portalen .</li>
                    <li><strong>Art Therapy:</strong> Das Finale. GLaDOS' Rache an den Robotern .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Portal 2 has a standalone co-op campaign with ATLAS and P-body.</strong></p>
                    <p class="mb-2 mt-3"><strong>The co-op chapters:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Team Building:</strong> Introduction to co-op mechanics .</li>
                    <li><strong>Mass and Velocity:</strong> Physics puzzles with cubes and portals .</li>
                    <li><strong>Hard Light:</strong> Light bridges and their combination with portals .</li>
                    <li><strong>Excursion Funnels:</strong> Vertical tractor beams and their timing .</li>
                    <li><strong>Mobility Gels:</strong> The three gels in combination with portals .</li>
                    <li><strong>Art Therapy:</strong> The finale. GLaDOS's revenge on the robots .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. DLCS ============ */
        {
            id: 'section5',
            titleDe: '5. Portal 2-DLCs',
            titleEn: '5. Portal 2 DLCs',
            introDe: 'Portal 2 erhielt <strong>drei offizielle DLCs</strong> – zwei kostenlose Erweiterungen und ein Motion-Control-Paket. Der <strong>Peer Review</strong>-DLC (2011) erweiterte die Co-op-Kampagne, die <strong>Perpetual Testing Initiative</strong> (2012) brachte den Level-Editor, und das <strong>Sixense MotionPack</strong> (2011) war für Razer Hydra-Controller .',
            introEn: 'Portal 2 received <strong>three official DLCs</strong> – two free expansions and a motion control pack. The <strong>Peer Review</strong> DLC (2011) expanded the co-op campaign, the <strong>Perpetual Testing Initiative</strong> (2012) brought the level editor, and the <strong>Sixense MotionPack</strong> (2011) was for Razer Hydra controllers .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Peer Review (2011, kostenlos)',
                    titleEn: 'Peer Review (2011, Free)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der erste kostenlose DLC für Portal 2, veröffentlicht am 4. Oktober 2011.</strong></p>
                    <p class="mb-2 mt-3"><strong>Inhalt:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Neue Co-op-Kampagne:</strong> 6 zusätzliche Testkammern mit fortgeschrittenen Rätseln [citation:4][citation:6].</li>
                    <li><strong>Neuer Antagonist:</strong> GLaDOS wird durch ein fehlerhaftes KI-Modul gesteuert – sie versucht, die Roboter zu töten .</li>
                    <li><strong>Challenge Mode:</strong> Für Singleplayer und Co-op, mit Leaderboards [citation:10][citation:12].</li>
                    <li><strong>Leaderboards:</strong> Vergleiche Portal-Platzierung und Zeit-Scores mit der Community [citation:6].</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Peer Review erweitert die Co-op-Kampagne um etwa 2 Stunden und ist einer der besten kostenlosen DLCs der Gaming-Geschichte .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The first free DLC for Portal 2, released on October 4, 2011.</strong></p>
                    <p class="mb-2 mt-3"><strong>Contents:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>New co-op campaign:</strong> 6 additional test chambers with advanced puzzles [citation:4][citation:6].</li>
                    <li><strong>New antagonist:</strong> GLaDOS is controlled by a faulty AI module – she tries to kill the robots .</li>
                    <li><strong>Challenge Mode:</strong> For singleplayer and co-op, with leaderboards [citation:10][citation:12].</li>
                    <li><strong>Leaderboards:</strong> Compare portal placement and time scores with the community [citation:6].</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Peer Review extends the co-op campaign by about 2 hours and is one of the best free DLCs in gaming history .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Perpetual Testing Initiative (2012, kostenlos)',
                    titleEn: 'Perpetual Testing Initiative (2012, Free)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der kostenlose Level-Editor-DLC, veröffentlicht am 8. Mai 2012.</strong></p>
                    <p class="mb-2 mt-3"><strong>Inhalt:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Integrierter Puzzle Maker:</strong> Erstellen von Testkammern ohne Programmieraufwand [citation:5].</li>
                    <li><strong>Steam Workshop:</strong> Veröffentlichen, bewerten und spielen von Community-Maps [citation:5].</li>
                    <li><strong>Automatischer Download:</strong> Ausgewählte Puzzles werden automatisch in Portal 2 installiert [citation:5].</li>
                    <li><strong>Co-op-Update (August 2012):</strong> Erlaubt das Design und Teilen von Co-op-Maps [citation:11].</li>
                    <li><strong>Über 170.000 Puzzles:</strong> Innerhalb von 4 Monaten von der Community erstellt [citation:11].</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Die Perpetual Testing Initiative hat Portal 2 zu einem endlosen Puzzle-Spiel gemacht – mit hunderttausenden Community-Maps .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The free level editor DLC, released on May 8, 2012.</strong></p>
                    <p class="mb-2 mt-3"><strong>Contents:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Integrated puzzle maker:</strong> Create test chambers without programming [citation:5].</li>
                    <li><strong>Steam Workshop:</strong> Publish, rate, and play community maps [citation:5].</li>
                    <li><strong>Automatic download:</strong> Selected puzzles are automatically installed in Portal 2 [citation:5].</li>
                    <li><strong>Co-op update (August 2012):</strong> Allows designing and sharing co-op maps [citation:11].</li>
                    <li><strong>Over 170,000 puzzles:</strong> Created by the community within 4 months [citation:11].</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> The Perpetual Testing Initiative turned Portal 2 into an endless puzzle game – with hundreds of thousands of community maps .</p>
                    </div>
                    `
                },
                {
                    id: 'subsection5_3',
                    titleDe: 'Sixense MotionPack (2011)',
                    titleEn: 'Sixense MotionPack (2011)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>DLC für Motion-Controller, entwickelt für den Razer Hydra.</strong></p>
                    <p class="mb-2 mt-3"><strong>Inhalt:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Motion-Steuerung:</strong> 1:1-Objektmanipulation mit Position und Orientierung [citation:3][citation:9].</li>
                    <li><strong>Portal Surfing:</strong> Portale in exakte Positionen drehen und schieben [citation:3].</li>
                    <li><strong>Object Scaling:</strong> Größe von Würfeln ändern, um Rätsel zu lösen [citation:3].</li>
                    <li><strong>10+ neue Maps:</strong> Exklusive Testkammern nur für Motion-Controller [citation:3].</li>
                    <li><strong>Cross-Platform Co-op:</strong> Razer Hydra (PC) mit PS Move (PS3) kombinierbar [citation:3][citation:9].</li>
                    </ul>
                    <p class="mt-3"><strong>Wichtig:</strong> Das MotionPack erfordert einen Razer Hydra-Controller – ohne diesen ist es nicht spielbar. Es ist auf <a href="https://store.steampowered.com/app/660/Portal_2_Sixense_MotionPack_DLC/" target="_blank" class="topic-link">Steam</a> verfügbar [citation:3].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Motion controller DLC, developed for the Razer Hydra.</strong></p>
                    <p class="mb-2 mt-3"><strong>Contents:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Motion control:</strong> 1:1 object manipulation with position and orientation [citation:3][citation:9].</li>
                    <li><strong>Portal Surfing:</strong> Rotate and slide portals into exact positions [citation:3].</li>
                    <li><strong>Object Scaling:</strong> Resize cubes to solve puzzles [citation:3].</li>
                    <li><strong>10+ new maps:</strong> Exclusive test chambers only for motion controllers [citation:3].</li>
                    <li><strong>Cross-platform co-op:</strong> Razer Hydra (PC) can team up with PS Move (PS3) [citation:3][citation:9].</li>
                    </ul>
                    <p class="mt-3"><strong>Important:</strong> The MotionPack requires a Razer Hydra controller – without it, it is not playable. Available on <a href="https://store.steampowered.com/app/660/Portal_2_Sixense_MotionPack_DLC/" target="_blank" class="topic-link">Steam</a> [citation:3].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. SPIN-OFFS ============ */
        {
            id: 'section6',
            titleDe: '6. Spin-offs & Crossover',
            titleEn: '6. Spin-offs & Crossovers',
            introDe: 'Die Portal-Serie hat zahlreiche <strong>Spin-offs, Crossover und lizenzierte Spiele</strong> hervorgebracht. Von <strong>Bridge Constructor Portal</strong> über <strong>Lego Dimensions</strong> bis zu <strong>Aperture Desk Job</strong> – das Portal-Universum ist weit über die Hauptspiele hinausgewachsen .',
            introEn: 'The Portal series has spawned numerous <strong>spin-offs, crossovers, and licensed games</strong>. From <strong>Bridge Constructor Portal</strong> to <strong>Lego Dimensions</strong> to <strong>Aperture Desk Job</strong> – the Portal universe has grown far beyond the main games .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Lizenzierte Spiele',
                    titleEn: 'Licensed Games',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Spiel</th><th class="w-1/4">Jahr</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Bridge Constructor Portal</strong></td><td class="text-[var(--text-muted)]">2017</td><td class="text-[var(--text-muted)]">Lizenzierter Puzzle-Spin-off von Headup Games. Brücken bauen, Portal-Physik nutzen, GLaDOS kommentiert .</td></tr>
                    <tr><td><strong>Lego Dimensions</strong></td><td class="text-[var(--text-muted)]">2015</td><td class="text-[var(--text-muted)]">Portal-Level im Hauptspiel, Chell als Minifigur, GLaDOS spielt eine wichtige Rolle .</td></tr>
                    <tr><td><strong>Poker Night 2</strong></td><td class="text-[var(--text-muted)]">2013</td><td class="text-[var(--text-muted)]">GLaDOS als Dealer. Portal-Themen-Unlockables .</td></tr>
                    <tr><td><strong>Zen Pinball 2 / Pinball FX2</strong></td><td class="text-[var(--text-muted)]">2013</td><td class="text-[var(--text-muted)]">Portal-basierte Pinball-Tische .</td></tr>
                    <tr><td><strong>Defense Grid: The Awakening</strong></td><td class="text-[var(--text-muted)]">2012</td><td class="text-[var(--text-muted)]">GLaDOS als Gastcharakter in einer Story-Erweiterung .</td></tr>
                    <tr><td><strong>Rocket League</strong></td><td class="text-[var(--text-muted)]">2016</td><td class="text-[var(--text-muted)]">Portal-basierte Fahrzeug-Anpassungen .</td></tr>
                    <tr><td><strong>Escape Simulator</strong></td><td class="text-[var(--text-muted)]">2023</td><td class="text-[var(--text-muted)]">Portal Escape Chamber DLC – entkomme aus Aperture Science .</td></tr>
                    <tr><td><strong>Evil Genius 2: World Domination</strong></td><td class="text-[var(--text-muted)]">2021</td><td class="text-[var(--text-muted)]">Portal-Themen-Erweiterung mit Räumen und Fallen .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Game</th><th class="w-1/4">Year</th><th>Description</th></tr>
                    <tr><td><strong>Bridge Constructor Portal</strong></td><td class="text-[var(--text-muted)]">2017</td><td class="text-[var(--text-muted)]">Licensed puzzle spin-off by Headup Games. Build bridges, use portal physics, GLaDOS comments .</td></tr>
                    <tr><td><strong>Lego Dimensions</strong></td><td class="text-[var(--text-muted)]">2015</td><td class="text-[var(--text-muted)]">Portal level in the main game, Chell as a minifigure, GLaDOS plays a major role .</td></tr>
                    <tr><td><strong>Poker Night 2</strong></td><td class="text-[var(--text-muted)]">2013</td><td class="text-[var(--text-muted)]">GLaDOS as dealer. Portal-themed unlockables .</td></tr>
                    <tr><td><strong>Zen Pinball 2 / Pinball FX2</strong></td><td class="text-[var(--text-muted)]">2013</td><td class="text-[var(--text-muted)]">Portal-based pinball tables .</td></tr>
                    <tr><td><strong>Defense Grid: The Awakening</strong></td><td class="text-[var(--text-muted)]">2012</td><td class="text-[var(--text-muted)]">GLaDOS as guest character in a story expansion .</td></tr>
                    <tr><td><strong>Rocket League</strong></td><td class="text-[var(--text-muted)]">2016</td><td class="text-[var(--text-muted)]">Portal-based vehicle customization .</td></tr>
                    <tr><td><strong>Escape Simulator</strong></td><td class="text-[var(--text-muted)]">2023</td><td class="text-[var(--text-muted)]">Portal Escape Chamber DLC – escape from Aperture Science .</td></tr>
                    <tr><td><strong>Evil Genius 2: World Domination</strong></td><td class="text-[var(--text-muted)]">2021</td><td class="text-[var(--text-muted)]">Portal-themed expansion with rooms and traps .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Kostenlose Valve-Experimente',
                    titleEn: 'Free Valve Experiments',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve hat mehrere kostenlose Portal-Experimente veröffentlicht:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong><a href="https://store.steampowered.com/app/450390/The_Lab/" target="_blank" class="topic-link">The Lab</a> (2016):</strong> VR-Erfahrung mit 8 Mini-Spielen, darunter „Robot Repair" mit GLaDOS .</li>
                    <li><strong><a href="https://store.steampowered.com/app/845760/Aperture_Hand_Lab/" target="_blank" class="topic-link">Aperture Hand Lab</a> (2019):</strong> VR-Hand-Tracking-Tech-Demo mit Aperture-Humor .</li>
                    <li><strong><a href="https://store.steampowered.com/app/1902490/Aperture_Desk_Job/" target="_blank" class="topic-link">Aperture Desk Job</a> (2022):</strong> Steam Deck-Tech-Demo im Portal-Universum, spielt in Aperture Science .</li>
                    </ul>
                    <p class="mt-3"><strong>Wichtig:</strong> Diese Titel sind kostenlos, aber technische Demos – nicht vollwertige Spiele .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Valve has released several free Portal experiments:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong><a href="https://store.steampowered.com/app/450390/The_Lab/" target="_blank" class="topic-link">The Lab</a> (2016):</strong> VR experience with 8 mini-games, including "Robot Repair" with GLaDOS .</li>
                    <li><strong><a href="https://store.steampowered.com/app/845760/Aperture_Hand_Lab/" target="_blank" class="topic-link">Aperture Hand Lab</a> (2019):</strong> VR hand tracking tech demo with Aperture humor .</li>
                    <li><strong><a href="https://store.steampowered.com/app/1902490/Aperture_Desk_Job/" target="_blank" class="topic-link">Aperture Desk Job</a> (2022):</strong> Steam Deck tech demo set in the Portal universe, taking place at Aperture Science .</li>
                    </ul>
                    <p class="mt-3"><strong>Important:</strong> These titles are free but technical demos – not full games .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 7. MODS & COMMUNITY ============ */
        {
            id: 'section7',
            titleDe: '7. Mods & Community',
            titleEn: '7. Mods & Community',
            introDe: 'Die Portal-Serie hat eine <strong>riesige Mod-Community</strong>. Der Steam Workshop für Portal 2 enthält <strong>über 170.000 Puzzles</strong> allein aus der Perpetual Testing Initiative. Dazu kommen vollwertige Fan-Kampagnen wie <a href="https://store.steampowered.com/app/317400/Portal_Stories_Mel/" target="_blank" class="topic-link">Portal Stories: Mel</a>, <a href="https://store.steampowered.com/app/601360/Portal_2_Community_Editions/" target="_blank" class="topic-link">Portal 2: Community Editions</a> und <a href="https://www.moddb.com/mods/portal-revolution" target="_blank" class="topic-link">Portal: Revolution</a> .',
            introEn: 'The Portal series has a <strong>huge mod community</strong>. The Steam Workshop for Portal 2 contains <strong>over 170,000 puzzles</strong> from the Perpetual Testing Initiative alone. Additionally, there are full fan campaigns like <a href="https://store.steampowered.com/app/317400/Portal_Stories_Mel/" target="_blank" class="topic-link">Portal Stories: Mel</a>, <a href="https://store.steampowered.com/app/601360/Portal_2_Community_Editions/" target="_blank" class="topic-link">Portal 2: Community Editions</a>, and <a href="https://www.moddb.com/mods/portal-revolution" target="_blank" class="topic-link">Portal: Revolution</a> .',
            subtopics: [
                {
                    id: 'subsection7_1',
                    titleDe: 'Bekannte Mods',
                    titleEn: 'Known Mods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Mod</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/317400/Portal_Stories_Mel/" target="_blank" class="topic-link">Portal Stories: Mel</a></strong></td><td class="text-[var(--text-muted)]">Vollständige Fan-Kampagne in der Portal-2-Engine. 20 Testkammern, neue Charaktere, eigene Story. Kostenlos .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/601360/Portal_2_Community_Editions/" target="_blank" class="topic-link">Portal 2: Community Editions</a></strong></td><td class="text-[var(--text-muted)]">Sammlung der besten Portal-2-Workshop-Kampagnen. Über 100 Stunden Community-Content .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-revolution" target="_blank" class="topic-link">Portal: Revolution</a></strong></td><td class="text-[var(--text-muted)]">Vollständige Fan-Kampagne mit eigener Story und über 40 Testkammern .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/aperture-tag" target="_blank" class="topic-link">Aperture Tag</a></strong></td><td class="text-[var(--text-muted)]">Fan-Mod mit Gel-Gun als zentrale Mechanik. Eigenständige Kampagne mit 25 Testkammern .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/thinking-with-time-machine" target="_blank" class="topic-link">Thinking with Time Machine</a></strong></td><td class="text-[var(--text-muted)]">Mod, die eine Zeitmaschinen-Mechanik einführt – man arbeitet mit seinem zukünftigen Ich zusammen .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-prelude" target="_blank" class="topic-link">Portal: Prelude</a></strong></td><td class="text-[var(--text-muted)]">Eine der ersten großen Portal-Mods. Zeigt, was vor GLaDOS passierte. 8 Testkammern .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-stories-vr" target="_blank" class="topic-link">Portal Stories: VR</a></strong></td><td class="text-[var(--text-muted)]">VR-Fangame in der Portal-2-Engine. Kostenlos .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-reloaded" target="_blank" class="topic-link">Portal: Reloaded</a></strong></td><td class="text-[var(--text-muted)]">Fan-Mod mit Zeitreise-Mechanik, vier Portale statt zwei .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Mod</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/317400/Portal_Stories_Mel/" target="_blank" class="topic-link">Portal Stories: Mel</a></strong></td><td class="text-[var(--text-muted)]">Complete fan campaign in the Portal 2 engine. 20 test chambers, new characters, own story. Free .</td></tr>
                    <tr><td><strong><a href="https://store.steampowered.com/app/601360/Portal_2_Community_Editions/" target="_blank" class="topic-link">Portal 2: Community Editions</a></strong></td><td class="text-[var(--text-muted)]">Collection of the best Portal 2 Workshop campaigns. Over 100 hours of community content .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-revolution" target="_blank" class="topic-link">Portal: Revolution</a></strong></td><td class="text-[var(--text-muted)]">Complete fan campaign with its own story and over 40 test chambers .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/aperture-tag" target="_blank" class="topic-link">Aperture Tag</a></strong></td><td class="text-[var(--text-muted)]">Fan mod with gel gun as the central mechanic. Standalone campaign with 25 test chambers .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/thinking-with-time-machine" target="_blank" class="topic-link">Thinking with Time Machine</a></strong></td><td class="text-[var(--text-muted)]">Mod that introduces a time-machine mechanic – you work with your future self .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-prelude" target="_blank" class="topic-link">Portal: Prelude</a></strong></td><td class="text-[var(--text-muted)]">One of the first major Portal mods. Shows what happened before GLaDOS. 8 test chambers .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-stories-vr" target="_blank" class="topic-link">Portal Stories: VR</a></strong></td><td class="text-[var(--text-muted)]">VR fangame in the Portal 2 engine. Free .</td></tr>
                    <tr><td><strong><a href="https://www.moddb.com/mods/portal-reloaded" target="_blank" class="topic-link">Portal: Reloaded</a></strong></td><td class="text-[var(--text-muted)]">Fan mod with time-travel mechanic, four portals instead of two .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection7_2',
                    titleDe: 'Steam Workshop',
                    titleEn: 'Steam Workshop',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der Steam Workshop für Portal 2 enthält:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Singleplayer-Maps:</strong> Über 170.000 Puzzles allein aus der Perpetual Testing Initiative [citation:11].</li>
                    <li><strong>Co-op-Maps:</strong> Seit August 2012 auch für 2-Spieler-Maps [citation:11].</li>
                    <li><strong>Skripte:</strong> Erweiterte Spielmechaniken .</li>
                    <li><strong>Skins:</strong> Waffen- und Charakter-Skins .</li>
                    </ul>
                    <p class="mt-3"><strong>Quick Play:</strong> Valve hat eine Funktion eingeführt, die sofort in die am besten bewerteten Maps springt [citation:11].</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The Steam Workshop for Portal 2 contains:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Singleplayer maps:</strong> Over 170,000 puzzles from the Perpetual Testing Initiative alone [citation:11].</li>
                    <li><strong>Co-op maps:</strong> Since August 2012 also for 2-player maps [citation:11].</li>
                    <li><strong>Scripts:</strong> Advanced game mechanics .</li>
                    <li><strong>Skins:</strong> Weapon and character skins .</li>
                    </ul>
                    <p class="mt-3"><strong>Quick Play:</strong> Valve introduced a feature that jumps directly into the highest-rated maps [citation:11].</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 8. HEUTE SPIELEN ============ */
        {
            id: 'section8',
            titleDe: '8. Portal heute spielen',
            titleEn: '8. Playing Portal Today',
            introDe: 'Beide Portal-Spiele sind auf <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a> verfügbar – Portal 1 für ca. 10 €, Portal 2 für ca. 10 €, oft im Sale für 1–2 €. Portal 1 dauert 3–4 Stunden, Portal 2 etwa 8–10 Stunden. Mit dem Steam Workshop und den Fan-Mods sind hunderte weitere Stunden möglich .',
            introEn: 'Both Portal games are available on <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a> – Portal 1 for about $10, Portal 2 for about $10, often on sale for $1–2. Portal 1 takes 3–4 hours, Portal 2 about 8–10 hours. With the Steam Workshop and fan mods, hundreds more hours are possible .',
            subtopics: [
                {
                    id: 'subsection8_1',
                    titleDe: 'Systemanforderungen (Steam)',
                    titleEn: 'System Requirements (Steam)',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Spiel</th><th>Minimum</th></tr>
                    <tr><td><strong>Portal 1</strong></td><td class="text-[var(--text-muted)]">1,7 GHz CPU, 512 MB RAM, DirectX 8.1 GPU, 4 GB Speicher, Windows 7+ .</td></tr>
                    <tr><td><strong>Portal 2</strong></td><td class="text-[var(--text-muted)]">3,0 GHz CPU (Pentium 4), 2 GB RAM, DirectX 9 GPU (ATI Radeon X800 / NVIDIA 7600), 13 GB Speicher, Windows 7+ .</td></tr>
                    <tr><td><strong>macOS</strong></td><td class="text-[var(--text-muted)]">OS X Lion 10.7+, Intel Core Duo 2,0 GHz, 2 GB RAM .</td></tr>
                    <tr><td><strong>SteamOS + Linux</strong></td><td class="text-[var(--text-muted)]">Ubuntu 12.04, Dual-Core 3,0 GHz, 2 GB RAM .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Game</th><th>Minimum</th></tr>
                    <tr><td><strong>Portal 1</strong></td><td class="text-[var(--text-muted)]">1.7 GHz CPU, 512 MB RAM, DirectX 8.1 GPU, 4 GB storage, Windows 7+ .</td></tr>
                    <tr><td><strong>Portal 2</strong></td><td class="text-[var(--text-muted)]">3.0 GHz CPU (Pentium 4), 2 GB RAM, DirectX 9 GPU (ATI Radeon X800 / NVIDIA 7600), 13 GB storage, Windows 7+ .</td></tr>
                    <tr><td><strong>macOS</strong></td><td class="text-[var(--text-muted)]">OS X Lion 10.7+, Intel Core Duo 2.0 GHz, 2 GB RAM .</td></tr>
                    <tr><td><strong>SteamOS + Linux</strong></td><td class="text-[var(--text-muted)]">Ubuntu 12.04, dual-core 3.0 GHz, 2 GB RAM .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection8_2',
                    titleDe: 'Warum 2026 noch spielen?',
                    titleEn: 'Why Play in 2026?',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Portal ist zeitlos und in vielerlei Hinsicht einzigartig:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Perfektes Pacing:</strong> Portal 1 erzählt in 3–4 Stunden eine vollständige Geschichte mit Höhepunkt und Abspann .</li>
                    <li><strong>GLaDOS:</strong> Eine der besten Antagonisten der Gaming-Geschichte. Schwarzer Humor, der heute noch zündet .</li>
                    <li><strong>Der Companion Cube:</strong> Eine der wenigen Figuren, für die Spieler wirklich trauern – und das in einem Puzzlespiel .</li>
                    <li><strong>Innovative Rätsel:</strong> Portal-Mechanik wurde nie besser umgesetzt. Die Rätsel sind fordernd, aber nie unfair .</li>
                    <li><strong>Der Abspann:</strong> „Still Alive" und „Want You Gone" sind zwei der besten Abspänne überhaupt .</li>
                    <li><strong>Kultureller Wert:</strong> Portal ist ein Stück Gaming-Geschichte und einer der wenigen Titel, die selbst Nicht-Spieler kennen.</li>
                    <li><strong>Portal 2 Workshop:</strong> Über 170.000 Puzzles halten das Spiel endlos am Leben [citation:11].</li>
                    </ul>
                    <p class="mt-3"><strong>Fazit:</strong> Portal ist kein Retro-Spiel – es ist ein <strong>Klassiker</strong>, der auch 2026 noch Spaß macht. Wer es noch nie gespielt hat, verpasst eines der besten Spiele aller Zeiten .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Portal is timeless and unique in many ways:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Perfect pacing:</strong> Portal 1 tells a complete story in 3–4 hours with a climax and credits .</li>
                    <li><strong>GLaDOS:</strong> One of the best antagonists in gaming history. Dark humor that still lands today .</li>
                    <li><strong>The Companion Cube:</strong> One of the few characters players genuinely mourn – and that in a puzzle game .</li>
                    <li><strong>Innovative puzzles:</strong> Portal mechanics have never been better implemented. Puzzles are challenging but never unfair .</li>
                    <li><strong>The credits:</strong> "Still Alive" and "Want You Gone" are two of the best credit sequences ever .</li>
                    <li><strong>Cultural value:</strong> Portal is a piece of gaming history and one of the few titles even non-gamers know.</li>
                    <li><strong>Portal 2 Workshop:</strong> Over 170,000 puzzles keep the game alive endlessly [citation:11].</li>
                    </ul>
                    <p class="mt-3"><strong>Verdict:</strong> Portal is not a retro game – it is a <strong>classic</strong> that is still fun in 2026. If you've never played it, you're missing one of the best games of all time .</p>
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
            introDe: 'Die wichtigsten Portal-Aspekte auf einen Blick.',
            introEn: 'The key Portal aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-circle-dot opacity-70"></i><span>1. Release & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Portal 1 (2007), Portal 2 (2011). Zwei der besten Puzzlespiele aller Zeiten. GLaDOS als Kultfigur.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>2. Gameplay</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Portal Gun (blau/orange), Physik-Rätsel, Companion Cube. Portal 2: Gele, Light Bridges, Co-op-Kampagne.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-download opacity-70"></i><span>3. DLCs & Spin-offs</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Peer Review, Perpetual Testing Initiative, Sixense MotionPack. Still Alive (Xbox). Bridge Constructor Portal.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>4. Heute spielen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Beide Spiele auf Steam für ca. 10 €, oft 1–2 € im Sale. Über 170.000 Workshop-Puzzles. Läuft auf Steam Deck.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-circle-dot opacity-70"></i><span>1. Release & Impact</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Portal 1 (2007), Portal 2 (2011). Two of the best puzzle games of all time. GLaDOS as a cult figure.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>2. Gameplay</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Portal Gun (blue/orange), physics puzzles, Companion Cube. Portal 2: gels, light bridges, co-op campaign.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-download opacity-70"></i><span>3. DLCs & Spin-offs</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Peer Review, Perpetual Testing Initiative, Sixense MotionPack. Still Alive (Xbox). Bridge Constructor Portal.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>4. Playing Today</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Both games on Steam for ~$10, often $1–2 in sales. Over 170,000 Workshop puzzles. Runs on Steam Deck.</p>
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
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/400/Portal/',                        target: '_blank', labelDe: 'Portal auf Steam',           labelEn: 'Portal on Steam' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/620/Portal_2/',                      target: '_blank', labelDe: 'Portal 2 auf Steam',         labelEn: 'Portal 2 on Steam' },
            { icon: 'fa-download', href: 'https://store.steampowered.com/app/660/Portal_2_Sixense_MotionPack_DLC/', target: '_blank', labelDe: 'Sixense MotionPack DLC',     labelEn: 'Sixense MotionPack DLC' },
            { icon: 'fa-cube',     href: 'https://store.steampowered.com/app/317400/Portal_Stories_Mel/',        target: '_blank', labelDe: 'Portal Stories: Mel',       labelEn: 'Portal Stories: Mel' },
            { icon: 'fa-cube',     href: 'https://store.steampowered.com/app/601360/Portal_2_Community_Editions/', target: '_blank', labelDe: 'Portal 2: Community Editions', labelEn: 'Portal 2: Community Editions' },
            { icon: 'fa-wrench',   href: 'https://steamcommunity.com/workshop/browse/?appid=620',                target: '_blank', labelDe: 'Steam Workshop',             labelEn: 'Steam Workshop' },
            { icon: 'fa-book',     href: 'https://half-life.fandom.com/',                                          target: '_blank', labelDe: 'Portal Wiki (Fandom)',       labelEn: 'Portal Wiki (Fandom)' },
            { icon: 'fa-code',     href: 'https://developer.valvesoftware.com/wiki/Portal',                        target: '_blank', labelDe: 'Portal Developer Wiki',     labelEn: 'Portal Developer Wiki' }
        ]
    },

    footer: {
        textDe: 'Portal Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Portal Reference · v1.0 · Dual Lang · 2026'
    }
});