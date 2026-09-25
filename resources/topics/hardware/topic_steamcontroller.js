// resources/topics/topic_steamcontroller.js
// Registers the Steam Controller (2026) reference topic. Loaded via <script> injection.

/* ==================================================================
   STEAM CONTROLLER CODE-BLOCK COPY CONTROLLER
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
    parentId: 'Hardware',
    id: 'Steam Controller Overview',
    icon: 'fa-gamepad',
    titleDe: 'Steam Controller',
    titleEn: 'Steam Controller',
    descDe: 'Valves PC-Gamepad mit Trackpads & TMR-Sticks',
    descEn: 'Valve\'s PC Gamepad with Trackpads & TMR Sticks',

    sidebarTitleDe: 'Steam Controller',
    sidebarTitleEn: 'Steam Controller',
    sidebarSubtitleDe: '2026 Edition',
    sidebarSubtitleEn: '2026 Edition',
    sidebarVersion: 'v2.0 (Mai 2026)',

    hero: {
        titleDe: 'Steam Controller: Valves PC-Gamepad kehrt zurück',
        titleEn: 'Steam Controller: Valve\'s PC Gamepad Returns',
        introDe: 'Elf Jahre nach dem polarisierenden Original hat <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Valve</a> am <strong>4. Mai 2026</strong> den neuen <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> veröffentlicht. Der zweite Versuch setzt auf einen <strong>konventionelleren Aufbau mit zwei TMR-Magnet-Thumbsticks</strong> – aber behält die beiden <strong>34,5-mm-Haptic-Trackpads</strong>, die den Vorgänger einst auszeichneten. Mit <strong>99 € / $99</strong>, 35+ Stunden Akkulaufzeit, Gyro, Grip Sense und dem magnetischen <strong>Steam Controller Puck</strong> ist er die dritte Säule von Valves Hardware-Trilogie aus Steam Machine, Steam Frame und eben diesem Controller. Die erste Charge war in unter 30 Minuten ausverkauft – dieser Guide deckt alles ab: Spezifikationen, Vergleiche, Verbindungsarten, Firmware-Updates und die wichtigsten Plattform-Besonderheiten .',
        introEn: 'Eleven years after the polarizing original, <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Valve</a> released the new <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> on <strong>May 4, 2026</strong>. The second attempt opts for a <strong>more conventional layout with two TMR magnetic thumbsticks</strong> – but keeps the two <strong>34.5 mm haptic trackpads</strong> that distinguished its predecessor. At <strong>$99 / €99</strong>, with 35+ hours of battery life, gyro, Grip Sense, and the magnetic <strong>Steam Controller Puck</strong>, it is the third pillar of Valve\'s hardware trilogy alongside the Steam Machine and Steam Frame. The first batch sold out in under 30 minutes – this guide covers everything: specs, comparisons, connection methods, firmware updates, and the key platform quirks .'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',       labelEn: 'Overview' },
        { icon: 'fa-microchip',         href: '#section2', switchToDoc: true, labelDe: 'Hardware',        labelEn: 'Hardware' },
        { icon: 'fa-tag',               href: '#section3', switchToDoc: true, labelDe: 'Preis & Verfügbarkeit', labelEn: 'Price & Availability' },
        { icon: 'fa-balance-scale',     href: '#section4', switchToDoc: true, labelDe: 'Vergleich',       labelEn: 'Comparison' },
        { icon: 'fa-bolt',              href: '#section5', switchToDoc: true, labelDe: 'Steam Input',     labelEn: 'Steam Input' },
        { icon: 'fa-plug',              href: '#section6', switchToDoc: true, labelDe: 'Verbindung',      labelEn: 'Connection' },
        { icon: 'fa-external-link-alt', href: 'https://store.steampowered.com/', target: '_blank', labelDe: 'Steam Store', labelEn: 'Steam Store' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Philosophie',
            titleEn: '1. Overview & Philosophy',
            introDe: 'Der neue <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> ist kein „Controller 2“ im klassischen Sinne – Valve hat den Namen bewusst beibehalten, um einen <strong>Neuanfang</strong> zu signalisieren. Der ursprüngliche Controller von 2015 war polarisierend: Nur ein Thumbstick, zwei große runde Trackpads, kein echtes D-Pad. Der neue Ansatz kombiniert <strong>konventionelle Bedienelemente mit den Trackpads</strong>, die PC-Spieler für Maus-lastige Spiele brauchen. Das Design folgt direkt dem <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a>: zwei Sticks, zwei Trackpads, vier Back-Buttons, Gyro .',
            introEn: 'The new <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> is not a "Controller 2" in the classic sense – Valve deliberately kept the name to signal a <strong>fresh start</strong>. The original 2015 controller was polarizing: only one thumbstick, two large round trackpads, no real D-pad. The new approach combines <strong>conventional controls with the trackpads</strong> that PC players need for mouse-heavy games. The design follows the <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a> directly: two sticks, two trackpads, four back buttons, gyro .',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist der neue Steam Controller?',
                    titleEn: 'What is the New Steam Controller?',
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
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">PC-Gamepad mit Trackpads und TMR-Magnetsticks.</td></tr>
                    <tr><td><strong>Vorgänger</strong></td><td class="text-[var(--text-muted)]">Original <a href="https://en.wikipedia.org/wiki/Steam_Controller" target="_blank" class="topic-link">Steam Controller</a> (2015, eingestellt 2019).</td></tr>
                    <tr><td><strong>Preis</strong></td><td class="text-[var(--text-muted)]">$99 / €99 / £85 / $149 CAD / $149 AUD .</td></tr>
                    <tr><td><strong>Release</strong></td><td class="text-[var(--text-muted)]">4. Mai 2026, exklusiv über den <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam Store</a> .</td></tr>
                    <tr><td><strong>Verfügbarkeit</strong></td><td class="text-[var(--text-muted)]">Erste Charge in unter 30 Minuten ausverkauft. Limit von 2 Stück pro Steam-Account .</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Maus-Emulation über Trackpads für PC-Spiele, Steam Input-Integration .</td></tr>
                    <tr><td><strong>Kompatibilität</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>, <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a>, Steam Machine, Steam Frame, PC .</td></tr>
                    <tr><td><strong>Nicht kompatibel</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.playstation.com/" target="_blank" class="topic-link">PS5</a>, <a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox</a>, <a href="https://www.nintendo.com/" target="_blank" class="topic-link">Switch</a> – Steam-exklusiv .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">PC gamepad with trackpads and TMR magnetic sticks.</td></tr>
                    <tr><td><strong>Predecessor</strong></td><td class="text-[var(--text-muted)]">Original <a href="https://en.wikipedia.org/wiki/Steam_Controller" target="_blank" class="topic-link">Steam Controller</a> (2015, discontinued 2019).</td></tr>
                    <tr><td><strong>Price</strong></td><td class="text-[var(--text-muted)]">$99 / €99 / £85 / $149 CAD / $149 AUD .</td></tr>
                    <tr><td><strong>Release</strong></td><td class="text-[var(--text-muted)]">May 4, 2026, exclusively via the <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam Store</a> .</td></tr>
                    <tr><td><strong>Availability</strong></td><td class="text-[var(--text-muted)]">First batch sold out in under 30 minutes. Limit of 2 per Steam account .</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Mouse emulation via trackpads for PC games, Steam Input integration .</td></tr>
                    <tr><td><strong>Compatibility</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam</a>, <a href="https://www.steamdeck.com/" target="_blank" class="topic-link">Steam Deck</a>, Steam Machine, Steam Frame, PC .</td></tr>
                    <tr><td><strong>Not compatible</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.playstation.com/" target="_blank" class="topic-link">PS5</a>, <a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox</a>, <a href="https://www.nintendo.com/" target="_blank" class="topic-link">Switch</a> – Steam-exclusive .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Warum ein zweiter Versuch?',
                    titleEn: 'Why a Second Attempt?',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Der ursprüngliche Steam Controller von 2015 war ein Experiment:</strong> Nur ein Thumbstick, zwei große kreisförmige Trackpads, kein echtes Steuerkreuz. Er wurde 2019 eingestellt und für 5 $ verramscht.</p>
                    <p class="mb-2 mt-3"><strong>Was sich geändert hat:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Steam Deck als Vorlage:</strong> Das Deck bewies, dass Trackpads + konventionelle Sticks funktionieren. Der neue Controller übernimmt dieses Layout .</li>
                    <li><strong>Steam Input ist ausgereift:</strong> Die Software-Infrastruktur für Controller-Profile ist heute deutlich besser als 2015.</li>
                    <li><strong>Ökosystem-Strategie:</strong> Der Controller ist der günstigste Einstieg in Valves Hardware-Trilogie (Machine, Frame, Controller) .</li>
                    <li><strong>2026er Marktlücke:</strong> Kein Mainstream-Controller bietet Trackpads für Maus-Emulation. Valve füllt diese Nische .</li>
                    </ul>
                    <p class="mt-3"><strong>Linus Sebastian:</strong> „Das ist die beste Maus-Emulationserfahrung, die es auf dem Markt gibt.“</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>The original 2015 Steam Controller was an experiment:</strong> only one thumbstick, two large circular trackpads, no real D-pad. It was discontinued in 2019 and dumped for $5.</p>
                    <p class="mb-2 mt-3"><strong>What changed:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Steam Deck as blueprint:</strong> The Deck proved that trackpads + conventional sticks work. The new controller adopts this layout .</li>
                    <li><strong>Steam Input has matured:</strong> The software infrastructure for controller profiles is far better than in 2015.</li>
                    <li><strong>Ecosystem strategy:</strong> The controller is the cheapest entry point into Valve's hardware trilogy (Machine, Frame, Controller) .</li>
                    <li><strong>2026 market gap:</strong> No mainstream controller offers trackpads for mouse emulation. Valve fills this niche .</li>
                    </ul>
                    <p class="mt-3"><strong>Linus Sebastian:</strong> "This is the best mouse emulation experience available on the market."</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. HARDWARE ============ */
        {
            id: 'section2',
            titleDe: '2. Hardware & Spezifikationen',
            titleEn: '2. Hardware & Specifications',
            introDe: 'Der <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> kombiniert <strong>konventionelle Bedienelemente mit den Trackpads des Steam Deck</strong>. Die <strong>TMR-Magnetsticks</strong> eliminieren Stick-Drift vollständig, die <strong>34,5-mm-Trackpads</strong> sind größer als die des Deck (32,5 mm) und bieten LRA-Haptik. Mit 35+ Stunden Akkulaufzeit ist er einer der ausdauerndsten Pro-Controller auf dem Markt .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> combines <strong>conventional controls with the Steam Deck\'s trackpads</strong>. The <strong>TMR magnetic sticks</strong> completely eliminate stick drift, the <strong>34.5 mm trackpads</strong> are larger than the Deck\'s (32.5 mm) and offer LRA haptics. With 35+ hours of battery life, it is one of the most enduring pro controllers on the market .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Technische Spezifikationen',
                    titleEn: 'Technical Specifications',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Komponente</th><th>Spezifikation</th></tr>
                    <tr><td><strong>Thumbsticks</strong></td><td class="text-[var(--text-muted)]">2× <a href="https://en.wikipedia.org/wiki/Tunnel_magnetoresistance" target="_blank" class="topic-link">TMR</a>-Magnetsticks (kontaktlos, driftfrei)</td></tr>
                    <tr><td><strong>Trackpads</strong></td><td class="text-[var(--text-muted)]">2× 34,5 mm druckempfindlich, LRA-Haptik (größer als Steam Deck: 32,5 mm) .</td></tr>
                    <tr><td><strong>Buttons</strong></td><td class="text-[var(--text-muted)]">A/B/X/Y (Silent-Membrane), D-Pad, 2 analoge Trigger, 2 Bumper, 4 Back-Buttons .</td></tr>
                    <tr><td><strong>Gyro</strong></td><td class="text-[var(--text-muted)]">6-Achsen-IMU für Motion-Aiming .</td></tr>
                    <tr><td><strong>Grip Sense</strong></td><td class="text-[var(--text-muted)]">Kapazitive Sensoren an den Griffen für zusätzliche Eingaben .</td></tr>
                    <tr><td><strong>Akku</strong></td><td class="text-[var(--text-muted)]">8,39 Wh Li-Ion, <strong>35+ Stunden</strong> Laufzeit .</td></tr>
                    <tr><td><strong>Verbindung</strong></td><td class="text-[var(--text-muted)]">2,4 GHz (Puck), <a href="https://en.wikipedia.org/wiki/Bluetooth" target="_blank" class="topic-link">Bluetooth</a>, USB-C .</td></tr>
                    <tr><td><strong>Latenz</strong></td><td class="text-[var(--text-muted)]">~8 ms Ende-zu-Ende, 4 ms Polling bei 5 m .</td></tr>
                    <tr><td><strong>Puck</strong></td><td class="text-[var(--text-muted)]">Magnetische Ladestation + 2,4-GHz-Sender, bis zu 4 Controller gleichzeitig .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Component</th><th>Specification</th></tr>
                    <tr><td><strong>Thumbsticks</strong></td><td class="text-[var(--text-muted)]">2× <a href="https://en.wikipedia.org/wiki/Tunnel_magnetoresistance" target="_blank" class="topic-link">TMR</a> magnetic sticks (contactless, drift-free)</td></tr>
                    <tr><td><strong>Trackpads</strong></td><td class="text-[var(--text-muted)]">2× 34.5 mm pressure-sensitive, LRA haptics (larger than Steam Deck: 32.5 mm) .</td></tr>
                    <tr><td><strong>Buttons</strong></td><td class="text-[var(--text-muted)]">A/B/X/Y (silent membrane), D-pad, 2 analog triggers, 2 bumpers, 4 back buttons .</td></tr>
                    <tr><td><strong>Gyro</strong></td><td class="text-[var(--text-muted)]">6-axis IMU for motion aiming .</td></tr>
                    <tr><td><strong>Grip Sense</strong></td><td class="text-[var(--text-muted)]">Capacitive sensors on handles for additional inputs .</td></tr>
                    <tr><td><strong>Battery</strong></td><td class="text-[var(--text-muted)]">8.39 Wh Li-ion, <strong>35+ hours</strong> runtime .</td></tr>
                    <tr><td><strong>Connection</strong></td><td class="text-[var(--text-muted)]">2.4 GHz (Puck), <a href="https://en.wikipedia.org/wiki/Bluetooth" target="_blank" class="topic-link">Bluetooth</a>, USB-C .</td></tr>
                    <tr><td><strong>Latency</strong></td><td class="text-[var(--text-muted)]">~8 ms end-to-end, 4 ms polling at 5 m .</td></tr>
                    <tr><td><strong>Puck</strong></td><td class="text-[var(--text-muted)]">Magnetic charging dock + 2.4 GHz transmitter, up to 4 controllers simultaneously .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'TMR vs. Hall-Effekt',
                    titleEn: 'TMR vs. Hall Effect',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Was ist TMR?</strong></p>
                    <p class="mb-2"><a href="https://en.wikipedia.org/wiki/Tunnel_magnetoresistance" target="_blank" class="topic-link">Tunneling Magnetoresistance</a> (TMR) ist eine Weiterentwicklung des Hall-Effekts. Statt eines Hall-Sensors nutzt TMR einen <strong>magnetischen Tunnelwiderstand</strong> – die Widerstandsänderung durch ein Magnetfeld ist deutlich größer.</p>
                    <p class="mb-2 mt-3"><strong>Vorteile gegenüber Hall-Effekt:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Höhere Präzision:</strong> Kleinere Bewegungen werden erkannt.</li>
                    <li><strong>Bessere Temperaturstabilität:</strong> Weniger Drift bei Hitze/Kälte.</li>
                    <li><strong>Geringerer Stromverbrauch:</strong> Wichtig für die 35+ Stunden Akkulaufzeit.</li>
                    <li><strong>Keine mechanische Abnutzung:</strong> Kontaktloses Magnetfeld, kein Verschleiß .</li>
                    </ul>
                    <p class="mt-3"><strong>Nachteil:</strong> Teurer in der Herstellung – mit ein Grund für den $99-Preis.</p>
                    <p class="mt-2"><strong>Realitätscheck:</strong> TMR ist dasselbe System wie im Steam Deck OLED, das nach einem Jahr intensiver Nutzung keine Drift zeigt .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>What is TMR?</strong></p>
                    <p class="mb-2"><a href="https://en.wikipedia.org/wiki/Tunnel_magnetoresistance" target="_blank" class="topic-link">Tunneling Magnetoresistance</a> (TMR) is an evolution of the Hall effect. Instead of a Hall sensor, TMR uses a <strong>magnetic tunnel resistance</strong> – the resistance change from a magnetic field is significantly greater.</p>
                    <p class="mb-2 mt-3"><strong>Advantages over Hall effect:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li><strong>Higher precision:</strong> Smaller movements are detected.</li>
                    <li><strong>Better temperature stability:</strong> Less drift in heat/cold.</li>
                    <li><strong>Lower power consumption:</strong> Important for the 35+ hour battery life.</li>
                    <li><strong>No mechanical wear:</strong> Contactless magnetic field, no wear .</li>
                    </ul>
                    <p class="mt-3"><strong>Downside:</strong> More expensive to manufacture – one reason for the $99 price.</p>
                    <p class="mt-2"><strong>Reality check:</strong> TMR is the same system as in the Steam Deck OLED, which shows no drift after a year of intensive use .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. PREIS & VERFÜGBARKEIT ============ */
        {
            id: 'section3',
            titleDe: '3. Preis & Verfügbarkeit',
            titleEn: '3. Price & Availability',
            introDe: 'Der <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> kostet <strong>99 € / $99</strong> und ist exklusiv über den <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam Store</a> erhältlich. Die erste Charge war <strong>in unter 30 Minuten ausverkauft</strong> – eBay-Preise erreichten schnell 300 $ (200 % Aufschlag). Valve hat bestätigt, die Produktion hochzufahren, aber keinen konkreten Restock-Termin genannt .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> costs <strong>$99 / €99</strong> and is available exclusively via the <a href="https://store.steampowered.com/" target="_blank" class="topic-link">Steam Store</a>. The first batch <strong>sold out in under 30 minutes</strong> – eBay prices quickly reached $300 (200% markup). Valve has confirmed it will ramp up production but hasn\'t announced a specific restock date .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Preisübersicht',
                    titleEn: 'Price Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Region</th><th>Preis</th></tr>
                    <tr><td><strong>USA</strong></td><td class="text-[var(--text-muted)]">$99 USD</td></tr>
                    <tr><td><strong>Europa</strong></td><td class="text-[var(--text-muted)]">€99 EUR</td></tr>
                    <tr><td><strong>UK</strong></td><td class="text-[var(--text-muted)]">£85 GBP</td></tr>
                    <tr><td><strong>Kanada</strong></td><td class="text-[var(--text-muted)]">$149 CAD</td></tr>
                    <tr><td><strong>Australien</strong></td><td class="text-[var(--text-muted)]">$149 AUD</td></tr>
                    <tr><td><strong>Japan</strong></td><td class="text-[var(--text-muted)]">¥17.800 (ca. $115)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Limit:</strong> 2 Controller pro Steam-Account. Exklusiv über Steam – kein Amazon, kein Einzelhandel .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Region</th><th>Price</th></tr>
                    <tr><td><strong>USA</strong></td><td class="text-[var(--text-muted)]">$99 USD</td></tr>
                    <tr><td><strong>Europe</strong></td><td class="text-[var(--text-muted)]">€99 EUR</td></tr>
                    <tr><td><strong>UK</strong></td><td class="text-[var(--text-muted)]">£85 GBP</td></tr>
                    <tr><td><strong>Canada</strong></td><td class="text-[var(--text-muted)]">$149 CAD</td></tr>
                    <tr><td><strong>Australia</strong></td><td class="text-[var(--text-muted)]">$149 AUD</td></tr>
                    <tr><td><strong>Japan</strong></td><td class="text-[var(--text-muted)]">¥17,800 (approx. $115)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Limit:</strong> 2 controllers per Steam account. Exclusively via Steam – no Amazon, no retail .</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Kauf-Tipps & Resale',
                    titleEn: 'Buying Tips & Resale',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Kauf-Tipps für Restocks:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Steam Wallet vorladen:</strong> Manuelle Kreditkarteneingabe während Launch-Fenstern kostet wertvolle Sekunden. Valve-Veteranen empfehlen, Guthaben vorher einzuzahlen .</li>
                    <li><strong>Benachrichtigungen aktivieren:</strong> Valve kündigt Restocks über Steam an. Newsletter und Steam-Benachrichtigungen aktivieren.</li>
                    <li><strong>Nicht auf eBay kaufen:</strong> Resale-Preise lagen bei $300 – dreimal so hoch wie MSRP. Warten lohnt sich .</li>
                    <li><strong>Verfügbarkeit bis Ende 2026:</strong> Analysten erwarten, dass Restocks knapp bleiben – die DRAM/NAND-Krise hält bis 2027 an .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Buying tips for restocks:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-3">
                    <li><strong>Pre-load Steam Wallet:</strong> Manual credit card entry during launch windows costs valuable seconds. Valve veterans recommend topping up balance beforehand .</li>
                    <li><strong>Enable notifications:</strong> Valve announces restocks via Steam. Enable newsletters and Steam notifications.</li>
                    <li><strong>Don't buy on eBay:</strong> Resale prices were at $300 – three times MSRP. Waiting pays off .</li>
                    <li><strong>Availability through 2026:</strong> Analysts expect restocks to remain scarce – the DRAM/NAND crisis persists into 2027 .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. VERGLEICH ============ */
        {
            id: 'section4',
            titleDe: '4. Vergleich mit DualSense Edge & Xbox Elite',
            titleEn: '4. Comparison with DualSense Edge & Xbox Elite',
            introDe: 'Der <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> ist nicht der einzige Premium-Controller auf dem Markt. Die Wahl hängt vom <strong>Einsatzzweck</strong> ab: Trackpads für Strategie und Maus-Emulation, adaptive Trigger für Shooter, oder native Xbox-Integration .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> is not the only premium controller on the market. The choice depends on <strong>use case</strong>: trackpads for strategy and mouse emulation, adaptive triggers for shooters, or native Xbox integration .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Direkter Vergleich',
                    titleEn: 'Direct Comparison',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/4"><a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a></th><th class="w-1/4"><a href="https://www.playstation.com/" target="_blank" class="topic-link">DualSense Edge</a></th><th class="w-1/4"><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox Elite Series 2</a></th></tr>
                    <tr><td><strong>Preis</strong></td><td class="text-[var(--text-muted)]">$99</td><td class="text-[var(--text-muted)]">$199</td><td class="text-[var(--text-muted)]">$179</td></tr>
                    <tr><td><strong>Sticks</strong></td><td class="text-[var(--text-muted)]">TMR (driftfrei)</td><td class="text-[var(--text-muted)]">Potentiometer (austauschbar)</td><td class="text-[var(--text-muted)]">Potentiometer (austauschbar)</td></tr>
                    <tr><td><strong>Akkulaufzeit</strong></td><td class="text-[var(--text-muted)]"><strong>35+ h</strong></td><td class="text-[var(--text-muted)]">5–7 h</td><td class="text-[var(--text-muted)]"><strong>40 h</strong></td></tr>
                    <tr><td><strong>Trackpads</strong></td><td class="text-[var(--text-muted)]"><strong>2× 34,5 mm</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">–</td></tr>
                    <tr><td><strong>Adaptive Trigger</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]"><strong>Ja</strong></td><td class="text-[var(--text-muted)]">–</td></tr>
                    <tr><td><strong>Back-Buttons</strong></td><td class="text-[var(--text-muted)]">4</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">4</td></tr>
                    <tr><td><strong>Gyro</strong></td><td class="text-[var(--text-muted)]"><strong>Ja</strong></td><td class="text-[var(--text-muted)]">Nein</td><td class="text-[var(--text-muted)]">Nein</td></tr>
                    <tr><td><strong>Plattform</strong></td><td class="text-[var(--text-muted)]">Steam-exklusiv</td><td class="text-[var(--text-muted)]">PS5/PC</td><td class="text-[var(--text-muted)]">Xbox/PC</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/4"><a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a></th><th class="w-1/4"><a href="https://www.playstation.com/" target="_blank" class="topic-link">DualSense Edge</a></th><th class="w-1/4"><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox Elite Series 2</a></th></tr>
                    <tr><td><strong>Price</strong></td><td class="text-[var(--text-muted)]">$99</td><td class="text-[var(--text-muted)]">$199</td><td class="text-[var(--text-muted)]">$179</td></tr>
                    <tr><td><strong>Sticks</strong></td><td class="text-[var(--text-muted)]">TMR (drift-free)</td><td class="text-[var(--text-muted)]">Potentiometer (swappable)</td><td class="text-[var(--text-muted)]">Potentiometer (swappable)</td></tr>
                    <tr><td><strong>Battery life</strong></td><td class="text-[var(--text-muted)]"><strong>35+ h</strong></td><td class="text-[var(--text-muted)]">5–7 h</td><td class="text-[var(--text-muted)]"><strong>40 h</strong></td></tr>
                    <tr><td><strong>Trackpads</strong></td><td class="text-[var(--text-muted)]"><strong>2× 34.5 mm</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]">–</td></tr>
                    <tr><td><strong>Adaptive trigger</strong></td><td class="text-[var(--text-muted)]">–</td><td class="text-[var(--text-muted)]"><strong>Yes</strong></td><td class="text-[var(--text-muted)]">–</td></tr>
                    <tr><td><strong>Back buttons</strong></td><td class="text-[var(--text-muted)]">4</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">4</td></tr>
                    <tr><td><strong>Gyro</strong></td><td class="text-[var(--text-muted)]"><strong>Yes</strong></td><td class="text-[var(--text-muted)]">No</td><td class="text-[var(--text-muted)]">No</td></tr>
                    <tr><td><strong>Platform</strong></td><td class="text-[var(--text-muted)]">Steam-exclusive</td><td class="text-[var(--text-muted)]">PS5/PC</td><td class="text-[var(--text-muted)]">Xbox/PC</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Empfehlung nach Einsatzzweck',
                    titleEn: 'Recommendation by Use Case',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Szenario</th><th>Empfehlung</th></tr>
                    <tr><td><strong>Strategie & Aufbau vom Sofa</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> – Trackpads ersetzen die Maus .</td></tr>
                    <tr><td><strong>Kompetitive Shooter</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.playstation.com/" target="_blank" class="topic-link">DualSense Edge</a> – adaptive Trigger, Trigger-Stops .</td></tr>
                    <tr><td><strong>Fighting Games</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox Elite</a> – facettiertes D-Pad, 4 Paddles .</td></tr>
                    <tr><td><strong>Barrierefreies Spielen</strong></td><td class="text-[var(--text-muted)]">Alle drei – frei belegbare Tasten. Steam Controller mit Gyro als Stick-Ersatz .</td></tr>
                    <tr><td><strong>Lange Reisen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox Elite</a> (40 h) oder <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> (35 h) .</td></tr>
                    <tr><td><strong>Emulation & Retro</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> oder <a href="https://www.playstation.com/" target="_blank" class="topic-link">DualSense Edge</a> – Gyro für Bewegungssteuerung .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Scenario</th><th>Recommendation</th></tr>
                    <tr><td><strong>Strategy & couch play</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> – trackpads replace the mouse .</td></tr>
                    <tr><td><strong>Competitive shooters</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.playstation.com/" target="_blank" class="topic-link">DualSense Edge</a> – adaptive triggers, trigger stops .</td></tr>
                    <tr><td><strong>Fighting games</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox Elite</a> – faceted D-pad, 4 paddles .</td></tr>
                    <tr><td><strong>Accessibility</strong></td><td class="text-[var(--text-muted)]">All three – freely mappable buttons. Steam Controller with gyro as stick replacement .</td></tr>
                    <tr><td><strong>Long travels</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.xbox.com/" target="_blank" class="topic-link">Xbox Elite</a> (40 h) or <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> (35 h) .</td></tr>
                    <tr><td><strong>Emulation & retro</strong></td><td class="text-[var(--text-muted)]"><a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> or <a href="https://www.playstation.com/" target="_blank" class="topic-link">DualSense Edge</a> – gyro for motion controls .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. STEAM INPUT ============ */
        {
            id: 'section5',
            titleDe: '5. Steam Input & Konfiguration',
            titleEn: '5. Steam Input & Configuration',
            introDe: 'Der <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> lebt von <strong>Steam Input</strong> – Valves Software-Schicht für Controller-Profile. Jede Taste, jedes Trackpad und der Gyro lassen sich pro Spiel konfigurieren. Die Community teilt Profile über <a href="https://www.steaminputdb.com/" target="_blank" class="topic-link">SteamInputDB</a> .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> thrives on <strong>Steam Input</strong> – Valve\'s software layer for controller profiles. Every button, every trackpad, and the gyro can be configured per game. The community shares profiles via <a href="https://www.steaminputdb.com/" target="_blank" class="topic-link">SteamInputDB</a> .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Trackpad-Modi',
                    titleEn: 'Trackpad Modes',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Modus</th><th>Verwendung</th></tr>
                    <tr><td><strong>Mouse</strong></td><td class="text-[var(--text-muted)]">Trackpad als Maus – für Strategie, Point-and-Click, Desktop .</td></tr>
                    <tr><td><strong>Mouse Region</strong></td><td class="text-[var(--text-muted)]">Trackpad steuert nur einen Bereich des Bildschirms – für Menüs .</td></tr>
                    <tr><td><strong>Joystick</strong></td><td class="text-[var(--text-muted)]">Trackpad als virtueller Joystick – für Spiele mit Analogsteuerung .</td></tr>
                    <tr><td><strong>D-Pad</strong></td><td class="text-[var(--text-muted)]">Trackpad als Steuerkreuz – für Menünavigation .</td></tr>
                    <tr><td><strong>Scroll Wheel</strong></td><td class="text-[var(--text-muted)]">Trackpad als Scrollrad – für Dokumente, Browser .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Mode</th><th>Use</th></tr>
                    <tr><td><strong>Mouse</strong></td><td class="text-[var(--text-muted)]">Trackpad as mouse – for strategy, point-and-click, desktop .</td></tr>
                    <tr><td><strong>Mouse Region</strong></td><td class="text-[var(--text-muted)]">Trackpad controls only a region of the screen – for menus .</td></tr>
                    <tr><td><strong>Joystick</strong></td><td class="text-[var(--text-muted)]">Trackpad as virtual joystick – for games with analog control .</td></tr>
                    <tr><td><strong>D-Pad</strong></td><td class="text-[var(--text-muted)]">Trackpad as D-pad – for menu navigation .</td></tr>
                    <tr><td><strong>Scroll Wheel</strong></td><td class="text-[var(--text-muted)]">Trackpad as scroll wheel – for documents, browsers .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Grip Sense & Gyro',
                    titleEn: 'Grip Sense & Gyro',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Grip Sense:</strong> Kapazitive Sensoren an den Griffen erkennen, ob man den Controller festhält oder nur berührt. Man kann sie als zusätzliche Eingabe mappen – z.B. Gyro nur aktivieren, wenn der Griff gedrückt wird.</p>
                    <p class="mb-2 mt-3"><strong>Gyro-Kalibrierung:</strong> In <code>Steam → Einstellungen → Controller → Details → Kalibrierung & Erweitert</code> kann die Gyro-Schwelle angepasst werden. Valve hat die Standard-Schwelle auf 50 % reduziert, um versehentliche Auslösung zu verhindern .</p>
                    <p class="mb-2 mt-3"><strong>Firmware-Updates:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li>Puck per USB-C anschließen – Puck wird zuerst aktualisiert.</li>
                    <li>USB-Kabel vom Puck abziehen und direkt an den Controller anschließen.</li>
                    <li>Controller-Update startet automatisch.</li>
                    <li>Kabel zurück zum Puck für kabellosen Betrieb .</li>
                    </ol>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Grip Sense:</strong> Capacitive sensors on the handles detect whether you\'re holding the controller firmly or just touching it. They can be mapped as additional input – e.g., only activate gyro when grip is pressed.</p>
                    <p class="mb-2 mt-3"><strong>Gyro calibration:</strong> In <code>Steam → Settings → Controller → Details → Calibration & Advanced</code>, the gyro threshold can be adjusted. Valve reduced the default threshold to 50% to prevent accidental triggering .</p>
                    <p class="mb-2 mt-3"><strong>Firmware updates:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li>Connect Puck via USB-C – Puck is updated first.</li>
                    <li>Unplug USB cable from Puck and connect directly to controller.</li>
                    <li>Controller update starts automatically.</li>
                    <li>Cable back to Puck for wireless operation .</li>
                    </ol>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. VERBINDUNG ============ */
        {
            id: 'section6',
            titleDe: '6. Verbindungsarten & Plattform-Besonderheiten',
            titleEn: '6. Connection Methods & Platform Quirks',
            introDe: 'Der <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> unterstützt <strong>drei Verbindungsarten</strong>: 2,4 GHz über den Puck, Bluetooth und USB-C. Die schnellste und zuverlässigste ist der Puck. Unter Linux gibt es derzeit noch einen <strong>Bug in Desktop Mode</strong>, der den Trackpad-Maus-Modus betrifft .',
            introEn: 'The <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> supports <strong>three connection methods</strong>: 2.4 GHz via Puck, Bluetooth, and USB-C. The fastest and most reliable is the Puck. On Linux, there is currently still a <strong>bug in Desktop Mode</strong> affecting the trackpad mouse mode .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Verbindungsarten',
                    titleEn: 'Connection Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th class="w-1/4">LED</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Puck (2,4 GHz)</strong></td><td class="text-[var(--text-muted)]">Weiß</td><td class="text-[var(--text-muted)]">Puck in PC einstecken, <code>A + R1 + Steam</code> drücken. Beste Latenz (~8 ms) .</td></tr>
                    <tr><td><strong>Bluetooth</strong></td><td class="text-[var(--text-muted)]">Blau</td><td class="text-[var(--text-muted)]">Bluetooth am PC aktivieren, <code>B + R1 + Steam</code> drücken. BlueZ erforderlich .</td></tr>
                    <tr><td><strong>USB-C</strong></td><td class="text-[var(--text-muted)]">Grün</td><td class="text-[var(--text-muted)]">Kabel einstecken, fertig. Lädt gleichzeitig .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th class="w-1/4">LED</th><th>Description</th></tr>
                    <tr><td><strong>Puck (2.4 GHz)</strong></td><td class="text-[var(--text-muted)]">White</td><td class="text-[var(--text-muted)]">Plug Puck into PC, press <code>A + R1 + Steam</code>. Best latency (~8 ms) .</td></tr>
                    <tr><td><strong>Bluetooth</strong></td><td class="text-[var(--text-muted)]">Blue</td><td class="text-[var(--text-muted)]">Enable Bluetooth on PC, press <code>B + R1 + Steam</code>. Requires BlueZ .</td></tr>
                    <tr><td><strong>USB-C</strong></td><td class="text-[var(--text-muted)]">Green</td><td class="text-[var(--text-muted)]">Plug in cable, done. Charges simultaneously .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Linux Desktop Mode Bug',
                    titleEn: 'Linux Desktop Mode Bug',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Bekanntes Problem (Stand Mai 2026):</strong></p>
                    <p class="mb-2">Unter <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> im Desktop Mode funktioniert das Trackpad <strong>nicht als System-Maus</strong>. Steam identifiziert den Controller fälschlich als Steam Deck und scheitert bei der Registrierung:</p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">Deck Controller PCB Serial# invalid: NA
BYieldingCompleteSteamControllerRegistration - Error... Invalid Parameter</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Auswirkungen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Der unsichtbare Cursor bewegt sich, aber der sichtbare System-Cursor bleibt stehen.</li>
                    <li>Betrifft <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch</a>, <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a>, <a href="https://hyprland.org/" target="_blank" class="topic-link">Hyprland</a>.</li>
                    <li><strong>Workaround:</strong> <a href="https://github.com/Supreeeme/extest" target="_blank" class="topic-link">Extest</a> kompilieren und Steam mit <code>LD_PRELOAD=/path/to/libextest.so steam</code> starten .</li>
                    </ul>
                    <p class="mt-3"><strong>Status:</strong> SteamOS und Gaming Mode sind nicht betroffen. In Spielen funktioniert der Controller einwandfrei. Valve hat das Problem noch nicht offiziell bestätigt .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Known issue (as of May 2026):</strong></p>
                    <p class="mb-2">On <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> in Desktop Mode, the trackpad <strong>does not work as a system mouse</strong>. Steam incorrectly identifies the controller as a Steam Deck and fails registration:</p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">Deck Controller PCB Serial# invalid: NA
BYieldingCompleteSteamControllerRegistration - Error... Invalid Parameter</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Impact:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>The invisible cursor moves, but the visible system cursor stays put.</li>
                    <li>Affects <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch</a>, <a href="https://bazzite.gg/" target="_blank" class="topic-link">Bazzite</a>, <a href="https://hyprland.org/" target="_blank" class="topic-link">Hyprland</a>.</li>
                    <li><strong>Workaround:</strong> Compile <a href="https://github.com/Supreeeme/extest" target="_blank" class="topic-link">Extest</a> and launch Steam with <code>LD_PRELOAD=/path/to/libextest.so steam</code> .</li>
                    </ul>
                    <p class="mt-3"><strong>Status:</strong> SteamOS and Gaming Mode are unaffected. The controller works perfectly in games. Valve has not yet officially confirmed the issue .</p>
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
            introDe: 'Die wichtigsten <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://store.steampowered.com/steamdeck" target="_blank" class="topic-link">Steam Controller</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">TMR-Magnetsticks (driftfrei), 34,5-mm-Trackpads, 4 Back-Buttons, Gyro, Grip Sense. 35+ Stunden Akku.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tag opacity-70"></i><span>2. Preis</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">$99 / €99. Exklusiv über Steam. Limit 2 pro Account. Erste Charge in 30 Minuten ausverkauft.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-balance-scale opacity-70"></i><span>3. Vergleich</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Günstiger als DualSense Edge ($199) und Xbox Elite ($179). Einzigartige Trackpads. Kein adaptiver Trigger.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-plug opacity-70"></i><span>4. Verbindung</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Puck (2,4 GHz, weiß) für beste Latenz, Bluetooth (blau), USB-C (grün). Linux Desktop Mode Bug bei Trackpad-Maus.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">TMR magnetic sticks (drift-free), 34.5 mm trackpads, 4 back buttons, gyro, Grip Sense. 35+ hours battery.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tag opacity-70"></i><span>2. Price</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">$99 / €99. Exclusively via Steam. Limit 2 per account. First batch sold out in 30 minutes.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-balance-scale opacity-70"></i><span>3. Comparison</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Cheaper than DualSense Edge ($199) and Xbox Elite ($179). Unique trackpads. No adaptive trigger.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-plug opacity-70"></i><span>4. Connection</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Puck (2.4 GHz, white) for best latency, Bluetooth (blue), USB-C (green). Linux Desktop Mode bug with trackpad mouse.</p>
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
            { icon: 'fa-store',    href: 'https://store.steampowered.com/',                        target: '_blank', labelDe: 'Steam Store',              labelEn: 'Steam Store' },
            { icon: 'fa-gamepad',  href: 'https://store.steampowered.com/steamdeck',              target: '_blank', labelDe: 'Steam Deck',               labelEn: 'Steam Deck' },
            { icon: 'fa-book',     href: 'https://en.wikipedia.org/wiki/Steam_Controller',        target: '_blank', labelDe: 'Wikipedia (Steam Controller)', labelEn: 'Wikipedia (Steam Controller)' },
            { icon: 'fa-download', href: 'https://github.com/Supreeeme/extest',                   target: '_blank', labelDe: 'Extest (Linux Workaround)', labelEn: 'Extest (Linux Workaround)' },
            { icon: 'fa-gamepad',  href: 'https://www.steaminputdb.com/',                          target: '_blank', labelDe: 'SteamInputDB',             labelEn: 'SteamInputDB' }
        ]
    },

    footer: {
        textDe: 'Steam Controller Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Steam Controller Reference · v1.0 · Dual Lang · 2026'
    }
});