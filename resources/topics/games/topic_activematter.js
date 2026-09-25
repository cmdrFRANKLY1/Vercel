// resources/topics/topic_activematter.js
// Registers the Active Matter extraction shooter reference topic.
// Loaded via <script> injection.

/* ==================================================================
   ACTIVE MATTER CODE-BLOCK COPY CONTROLLER
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
    id: 'Active Matter Overview',
    icon: 'fa-radiation',
    titleDe: 'Active Matter',
    titleEn: 'Active Matter',
    descDe: 'Extraction Shooter von Gaijin – Item- & Raid-Guide',
    descEn: 'Gaijin Extraction Shooter – Item & Raid Guide',

    sidebarTitleDe: 'Active Matter',
    sidebarTitleEn: 'Active Matter',
    sidebarSubtitleDe: 'Items, Loadouts & Überleben',
    sidebarSubtitleEn: 'Items, Loadouts & Survival',
    sidebarVersion: 'v0.4.0.93',

    hero: {
        titleDe: 'Active Matter: Item- und Raid-Guide',
        titleEn: 'Active Matter: Item and Raid Guide',
        introDe: '<a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> ist ein <strong>Hardcore-Extraction-Shooter</strong> von <a href="https://gaijin.net/" target="_blank" class="topic-link">Gaijin Entertainment</a>, der im September 2026 auf Steam, PlayStation 5 und Xbox Series X|S erschienen ist. Im Gegensatz zu anderen Extraction-Shootern gibt es <strong>isolierte PvE-Raids</strong> – du kannst also ohne PvP-Druck looten, Monster bekämpfen und deine Ausrüstung lernen. Dieser Guide ist kein Spielbericht, sondern eine <strong>praktische Anleitung</strong>: Welche Items du sammeln solltest, welche Waffen sich lohnen, wie du Medikamente einsetzt und welche Ausrüstung dich am Leben hält. Alle Informationen basieren auf dem Launch-Build 0.4.0.93 .',
        introEn: '<a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> is a <strong>hardcore extraction shooter</strong> by <a href="https://gaijin.net/" target="_blank" class="topic-link">Gaijin Entertainment</a>, released in September 2026 on Steam, PlayStation 5, and Xbox Series X|S. Unlike other extraction shooters, it offers <strong>isolated PvE raids</strong> – so you can loot, fight monsters, and learn your gear without PvP pressure. This guide is not a review but a <strong>practical manual</strong>: which items to collect, which weapons are worth it, how to use medicine, and which equipment keeps you alive. All information is based on launch build 0.4.0.93 .'
    },

    quickLinks: [
        { icon: 'fa-play',              href: '#section1', switchToDoc: true, labelDe: 'Erster Raid',     labelEn: 'First Raid' },
        { icon: 'fa-kit-medical',       href: '#section2', switchToDoc: true, labelDe: 'Medizin',         labelEn: 'Medicine' },
        { icon: 'fa-crosshairs',        href: '#section3', switchToDoc: true, labelDe: 'Waffen',          labelEn: 'Weapons' },
        { icon: 'fa-shield-halved',     href: '#section4', switchToDoc: true, labelDe: 'Rüstung',         labelEn: 'Armor' },
        { icon: 'fa-backpack',          href: '#section5', switchToDoc: true, labelDe: 'Ausrüstung',      labelEn: 'Gear' },
        { icon: 'fa-flask',             href: '#section6', switchToDoc: true, labelDe: 'Chronogene',      labelEn: 'Chronogens' },
        { icon: 'fa-monster',           href: '#section7', switchToDoc: true, labelDe: 'Monster',         labelEn: 'Monsters' },
        { icon: 'fa-coins',             href: '#section8', switchToDoc: true, labelDe: 'Währungen',       labelEn: 'Currencies' }
    ],

    sections: [
        /* ============ 1. ERSTER RAID ============ */
        {
            id: 'section1',
            titleDe: '1. Der erste Raid – Schritt für Schritt',
            titleEn: '1. The First Raid – Step by Step',
            introDe: 'Der Einstieg in <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> ist hart, aber es gibt einen sicheren Weg. Bevor du deine eigene Ausrüstung riskierst, solltest du <strong>isolierte PvE-Raids</strong> nutzen und mit <strong>geliehener Ausrüstung</strong> die Karte kennenlernen. Dieser Abschnitt erklärt, was du vor dem Deployment einpacken musst und welche Fehler Anfänger typischerweise machen .',
            introEn: 'Getting into <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> is tough, but there is a safe path. Before risking your own gear, you should use <strong>isolated PvE raids</strong> and learn the map with <strong>Provided Equipment</strong>. This section explains what to pack before deployment and which mistakes beginners typically make .',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Raid-Typ wählen: Isoliert vs. Offen',
                    titleEn: 'Choose Raid Type: Isolated vs. Open',
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
                    <tr><th class="w-1/4">Raid-Typ</th><th class="w-1/4">Spieler</th><th>Empfohlen für</th></tr>
                    <tr><td><strong>Isoliert (PvE)</strong></td><td class="text-[var(--text-muted)]">Keine anderen Spieler</td><td class="text-[var(--text-muted)]">Erste Schritte, Karten lernen, Loot-Routen üben. Enthält weiterhin Monster, Anomalien und Ausrüstungsverlust .</td></tr>
                    <tr><td><strong>Offen + Solo (PvPvE)</strong></td><td class="text-[var(--text-muted)]">Andere Solo-Spieler</td><td class="text-[var(--text-muted)]">Nachdem du die Karte kennst. Übergang zu PvPvE .</td></tr>
                    <tr><td><strong>Offen + Squad</strong></td><td class="text-[var(--text-muted)]">Squads</td><td class="text-[var(--text-muted)]">Mit Freunden oder Squad-Matchmaking. Squads machen Geräusche und verraten ihre Position – aber räumen KI-Gegner für dich .</td></tr>
                    <tr><td><strong>Unstable Zone</strong></td><td class="text-[var(--text-muted)]">Battle-Royale-Stil</td><td class="text-[var(--text-muted)]">Kürzerer Timer, weniger Objectives, <strong>kein PvE-Option</strong> .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wichtig:</strong> „Offen + Solo“ ist kein PvE-Modus – du triffst auf andere Spieler. Echter PvE ist nur über „Isoliert“ verfügbar .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Raid Type</th><th class="w-1/4">Players</th><th>Recommended For</th></tr>
                    <tr><td><strong>Isolated (PvE)</strong></td><td class="text-[var(--text-muted)]">No other players</td><td class="text-[var(--text-muted)]">First steps, learning maps, practicing loot routes. Still contains monsters, anomalies, and gear loss .</td></tr>
                    <tr><td><strong>Open + Solo (PvPvE)</strong></td><td class="text-[var(--text-muted)]">Other solo players</td><td class="text-[var(--text-muted)]">After you know the map. Transition to PvPvE .</td></tr>
                    <tr><td><strong>Open + Squad</strong></td><td class="text-[var(--text-muted)]">Squads</td><td class="text-[var(--text-muted)]">With friends or squad matchmaking. Squads make noise and reveal their position – but clear AI for you .</td></tr>
                    <tr><td><strong>Unstable Zone</strong></td><td class="text-[var(--text-muted)]">Battle-royale style</td><td class="text-[var(--text-muted)]">Shorter timer, fewer objectives, <strong>no PvE option</strong> .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Important:</strong> "Open + Solo" is not a PvE mode – you will encounter other players. True PvE is only available via "Isolated" .</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Der Loadout-Check vor dem Start',
                    titleEn: 'The Loadout Check Before Deployment',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Build 0.4.0.93 zeigt ein Ausrüstungs-Check-Panel über dem Body Sleeve.</strong> Lies jede Warnung – eine Waffe im richtigen Slot kann trotzdem ein leeres Magazin oder falsche Munition haben .</p>
                    <p class="mb-2 mt-3"><strong>Reihenfolge für den ersten Loadout:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li><strong>Primärwaffe wählen:</strong> Passend zu den Sichtlinien der Karte. Schrotflinte ist früh stark .</li>
                    <li><strong>Waffe laden:</strong> Magazin füllen, nicht nur einstecken .</li>
                    <li><strong>Passende Munition einpacken:</strong> Kaliber muss zur Waffe passen .</li>
                    <li><strong>Helm mit Haltbarkeit ausrüsten:</strong> Ein kaputter Helm schützt nicht .</li>
                    <li><strong>Panzerplatte in den richtigen Carrier-Slot:</strong> Slot-Größe muss zur Platte passen .</li>
                    <li><strong>Medkit mit Medications aufladen:</strong> Ein leerer Medkit heilt nicht .</li>
                    <li><strong>Medkit auf Schnellzugriff binden:</strong> Quick-Slot wechselt automatisch zum nächsten identischen Item .</li>
                    <li><strong>Alle Warnungen im Check-Panel beseitigen:</strong> Sonst startest du mit Lücken .</li>
                    </ol>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Build 0.4.0.93 shows an equipment check panel above the Body Sleeve.</strong> Read every warning – a weapon in the correct slot can still have an empty magazine or wrong ammo .</p>
                    <p class="mb-2 mt-3"><strong>Order for the first loadout:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li><strong>Choose primary weapon:</strong> Matched to the map's sightlines. Shotgun is strong early .</li>
                    <li><strong>Load the weapon:</strong> Fill the magazine, don't just slot it .</li>
                    <li><strong>Pack matching ammo:</strong> Caliber must match the weapon .</li>
                    <li><strong>Equip helmet with durability:</strong> A broken helmet doesn't protect .</li>
                    <li><strong>Armor plate in the correct carrier slot:</strong> Slot size must match the plate .</li>
                    <li><strong>Recharge medkit with Medications:</strong> An empty medkit doesn't heal .</li>
                    <li><strong>Bind medkit to quick-access:</strong> Quick-slot automatically switches to the next identical item .</li>
                    <li><strong>Clear all warnings in the check panel:</strong> Otherwise you start with gaps .</li>
                    </ol>
                    </div>
                    `
                },
                {
                    id: 'subsection1_3',
                    titleDe: 'Was du NICHT tun solltest',
                    titleEn: 'What NOT to Do',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Kein Licht:</strong> Die Beleuchtung wechselt ohne Vorwarnung, Bereiche werden stockdunkel. <strong>Immer Taschenlampe mitnehmen</strong> .</li>
                    <li><strong>Keine Beinschienen:</strong> Geliehene Kits lassen die Beine frei. Gute Spieler schießen gezielt auf Beine, um deine Bewegung zu brechen .</li>
                    <li><strong>Kein Rig:</strong> Ein kleines Rig fügt 625 Volumen hinzu – dasselbe wie ein einfacher Rucksack – und gibt schnellen Zugriff auf Magazine und Medikamente .</li>
                    <li><strong>Zu viel looten:</strong> Ein voller Rucksack ist wertlos, wenn die Zone schließt, bevor du extrahierst. Nimm lieber weniger mit und komm lebend raus .</li>
                    <li><strong>Laut sein:</strong> Schüsse locken Monster <strong>und</strong> Spieler an. Schalldämpfer und Nahkampf sind deine Freunde .</li>
                    <li><strong>Zu lange stehenbleiben:</strong> Invisibles spawnen auf Spielern, die zu lange stillstehen. Beweg dich .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>No light:</strong> Lighting changes without warning, areas go pitch black. <strong>Always bring a flashlight</strong> .</li>
                    <li><strong>No leg plates:</strong> Rented kits leave legs bare. Good players aim for legs to break your movement .</li>
                    <li><strong>No rig:</strong> A small rig adds 625 volume – the same as a basic backpack – and gives fast access to mags and meds .</li>
                    <li><strong>Over-looting:</strong> A full backpack is worthless if the zone closes before you extract. Take less and get out alive .</li>
                    <li><strong>Being loud:</strong> Gunshots attract monsters <strong>and</strong> players. Suppressors and melee are your friends .</li>
                    <li><strong>Standing still too long:</strong> Invisibles spawn on players who stand still too long. Keep moving .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. MEDIZIN ============ */
        {
            id: 'section2',
            titleDe: '2. Medizin – Was du einpacken musst',
            titleEn: '2. Medicine – What You Must Pack',
            introDe: 'Heilung funktioniert in <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> anders als in anderen Shootern. Es gibt <strong>Medkits</strong>, <strong>Medications</strong>, <strong>Injectors</strong> und <strong>Painkillers</strong> – jedes mit einem eigenen Zweck. Dieser Abschnitt erklärt, was du wann einsetzt und welche Kombination sich für Anfänger bewährt hat .',
            introEn: 'Healing in <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> works differently than in other shooters. There are <strong>medkits</strong>, <strong>Medications</strong>, <strong>injectors</strong>, and <strong>painkillers</strong> – each with a distinct purpose. This section explains what to use when and which combination works for beginners .',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Medizin-Übersicht',
                    titleEn: 'Medicine Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Item</th><th class="w-1/4">Funktion</th><th>Empfehlung</th></tr>
                    <tr><td><strong>Injector</strong></td><td class="text-[var(--text-muted)]">Schnelle Heilung im Kampf. Wirkt fast sofort, während ein Medkit Zeit braucht .</td><td class="text-[var(--text-muted)]"><strong>2–3 Stück einpacken.</strong> Unverzichtbar im Feuergefecht. Früh freischalten .</td></tr>
                    <tr><td><strong>Painkillers</strong></td><td class="text-[var(--text-muted)]">Schmerzmittel. Wahrscheinlich temporärer Buff oder Heilung über Zeit .</td><td class="text-[var(--text-muted)]"><strong>1–2 Stück einpacken.</strong> Ergänzt Injectors .</td></tr>
                    <tr><td><strong>Medkit</strong></td><td class="text-[var(--text-muted)]">Große Heilung. Muss mit Medications aufgeladen werden. Kann im Raid gefunden werden .</td><td class="text-[var(--text-muted)]"><strong>1 Stück einpacken.</strong> Nachteil: Medkits müssen im Raid gefunden werden, wenn du keine mehr hast .</td></tr>
                    <tr><td><strong>Medications</strong></td><td class="text-[var(--text-muted)]">Lädt Medkits auf. Eine Portion = 100 Medkit-Ladungen, belegt 1 Volumen .</td><td class="text-[var(--text-muted)]"><strong>Genug für den Rückweg einpacken.</strong> Nicht jeden Slot damit füllen .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wichtig:</strong> Injectors und Painkillers sind die <strong>Notfall-Heilung</strong> im Kampf. Medkits sind die <strong>große Heilung</strong> zwischen Gefechten. Beides ist notwendig .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Item</th><th class="w-1/4">Function</th><th>Recommendation</th></tr>
                    <tr><td><strong>Injector</strong></td><td class="text-[var(--text-muted)]">Fast healing in combat. Works almost instantly, while a medkit takes time .</td><td class="text-[var(--text-muted)]"><strong>Pack 2–3.</strong> Essential in firefights. Unlock early .</td></tr>
                    <tr><td><strong>Painkillers</strong></td><td class="text-[var(--text-muted)]">Pain relief. Likely temporary buff or healing over time .</td><td class="text-[var(--text-muted)]"><strong>Pack 1–2.</strong> Complements injectors .</td></tr>
                    <tr><td><strong>Medkit</strong></td><td class="text-[var(--text-muted)]">Large heal. Must be recharged with Medications. Can be found in raid .</td><td class="text-[var(--text-muted)]"><strong>Pack 1.</strong> Downside: Medkits must be found in raid if you run out .</td></tr>
                    <tr><td><strong>Medications</strong></td><td class="text-[var(--text-muted)]">Recharges medkits. One pile = 100 medkit charges, occupies 1 volume .</td><td class="text-[var(--text-muted)]"><strong>Pack enough for the trip home.</strong> Don't fill every slot .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Important:</strong> Injectors and painkillers are <strong>emergency healing</strong> in combat. Medkits are <strong>large healing</strong> between fights. Both are necessary .</p>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Medizin-Regeln (Build 0.4.0.93)',
                    titleEn: 'Medicine Rules (Build 0.4.0.93)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Medications:</strong> Eine Portion stellt <strong>100 Medkit-Ladungen</strong> wieder her und belegt <strong>1 Volumen</strong>. Du kannst Medkits über das Icon aufladen oder ein Medkit in Medications zerlegen .</p>
                    <p class="mb-2 mt-3"><strong>Heilung läuft in Zyklen:</strong> Seit dem Launch-Update heilt ein Medkit in <strong>50er-Schritten</strong> und kann jederzeit abgebrochen werden. Das bedeutet: Du kannst eine Heilung starten, unterbrechen, schießen und später fortsetzen .</p>
                    <p class="mt-3"><strong>Quick-Access-Slots:</strong> Wenn du ein Item benutzt, wechselt der Slot automatisch zum nächsten identischen Item – solange noch eins vorhanden ist. Das Icon wird dunkel, wenn das letzte Item verbraucht ist. Das macht einen gebundenen Medkit viel leichter zu verfolgen als einen ungebundenen im Inventar .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Medications:</strong> One pile restores <strong>100 medkit charges</strong> and occupies <strong>1 volume</strong>. You can recharge medkits via the icon or disassemble a medkit into Medications .</p>
                    <p class="mb-2 mt-3"><strong>Healing runs in cycles:</strong> Since the launch update, a medkit heals in <strong>50-unit increments</strong> and can be interrupted at any time. This means: You can start a heal, interrupt, shoot, and continue later .</p>
                    <p class="mt-3"><strong>Quick-access slots:</strong> When you use an item, the slot automatically switches to the next identical item – as long as one remains. The icon dims when the last item is consumed. This makes a bound medkit much easier to track than an unbound one in your inventory .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. WAFFEN ============ */
        {
            id: 'section3',
            titleDe: '3. Waffen – Was sich lohnt',
            titleEn: '3. Weapons – What\'s Worth It',
            introDe: 'In <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> gibt es zwei Wege, an Waffen zu kommen: <strong>Kaufen mit Credits</strong> oder <strong>Replizieren im Replicator</strong>. Nicht jede Waffe lohnt sich zum Kopieren – manche sind im Shop günstiger, andere nur für bestimmte Tasks sinnvoll. Dieser Abschnitt analysiert die wichtigsten Waffen und gibt klare Empfehlungen .',
            introEn: 'In <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> there are two ways to get weapons: <strong>buying with credits</strong> or <strong>replicating in the Replicator</strong>. Not every weapon is worth copying – some are cheaper in the shop, others are only useful for specific tasks. This section analyzes the most important weapons and gives clear recommendations .',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Waffen-Analyse: Kaufen vs. Replizieren',
                    titleEn: 'Weapon Analysis: Buy vs. Replicate',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Waffe</th><th class="w-1/4">Empfehlung</th><th>Begründung</th></tr>
                    <tr><td><strong>AK-103</strong></td><td class="text-[var(--text-muted)]"><strong>Kaufen, nicht replizieren</strong></td><td class="text-[var(--text-muted)]">Gute Startwaffe, aber AK-12 ist strikt besser. 15.850 Credits im Shop sind akzeptabel – aber kaufe nicht 10 Stück .</td></tr>
                    <tr><td><strong>M4</strong></td><td class="text-[var(--text-muted)]"><strong>Kaufen, nicht replizieren</strong></td><td class="text-[var(--text-muted)]">AR-416 ist die bessere Wahl, sobald verfügbar. Für den Übergang okay .</td></tr>
                    <tr><td><strong>M110</strong></td><td class="text-[var(--text-muted)]"><strong>Replizieren lohnt sich</strong></td><td class="text-[var(--text-muted)]">Shop-Preis ist etwas höher. Auf dem Schießstand testen, bevor du dich entscheidest. Zwei Körpertreffer gegen SF-Helm (220 Haltbarkeit) tödlich .</td></tr>
                    <tr><td><strong>SV-98</strong></td><td class="text-[var(--text-muted)]"><strong>Nur für Enthusiasten oder Tasks</strong></td><td class="text-[var(--text-muted)]">Replizieren ist billiger als Kaufen, aber die Waffe wird selten genutzt – es sei denn, du hast ein gutes Zielfernrohr (15x oder Wärmebild) .</td></tr>
                    <tr><td><strong>Schrotflinte (früh)</strong></td><td class="text-[var(--text-muted)]"><strong>Immer als Sekundärwaffe</strong></td><td class="text-[var(--text-muted)]">Brutal gegen PvE-Monster, stark gegen Spieler auf kurze Distanz. Günstig auf dem Monolithen freischaltbar .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Faustregel:</strong> Wenn du die Waffe häufig nutzt und der Shop-Preis hoch ist, repliziere. Wenn du sie nur kurz brauchst oder der Shop-Preis niedrig ist, kaufe. Im Zweifel: Teste auf dem Schießstand .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Weapon</th><th class="w-1/4">Recommendation</th><th>Reasoning</th></tr>
                    <tr><td><strong>AK-103</strong></td><td class="text-[var(--text-muted)]"><strong>Buy, don't replicate</strong></td><td class="text-[var(--text-muted)]">Good starter weapon, but AK-12 is strictly better. 15,850 credits in the shop is acceptable – but don't buy 10 .</td></tr>
                    <tr><td><strong>M4</strong></td><td class="text-[var(--text-muted)]"><strong>Buy, don't replicate</strong></td><td class="text-[var(--text-muted)]">AR-416 is the better choice once available. Okay as a transition .</td></tr>
                    <tr><td><strong>M110</strong></td><td class="text-[var(--text-muted)]"><strong>Replicating is worth it</strong></td><td class="text-[var(--text-muted)]">Shop price is slightly higher. Test on the shooting range before deciding. Two body shots against SF helmet (220 durability) are lethal .</td></tr>
                    <tr><td><strong>SV-98</strong></td><td class="text-[var(--text-muted)]"><strong>Enthusiasts or tasks only</strong></td><td class="text-[var(--text-muted)]">Replicating is cheaper than buying, but the weapon is rarely used – unless you have a good scope (15x or thermal) .</td></tr>
                    <tr><td><strong>Shotgun (early)</strong></td><td class="text-[var(--text-muted)]"><strong>Always as secondary</strong></td><td class="text-[var(--text-muted)]">Brutal against PvE monsters, strong against players at close range. Cheap to unlock on the Monolith .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Rule of thumb:</strong> If you use the weapon frequently and the shop price is high, replicate. If you only need it briefly or the shop price is low, buy. When in doubt: test on the shooting range .</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Ausrüstungs-Check & Reparatur',
                    titleEn: 'Gear Check & Repair',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Reparatur- und Nachlade-Buttons:</strong> In der Ecke des Lagers gibt es kleine Icons, die Anfänger oft übersehen. <strong>Drücke sie vor jedem Raid.</strong> Sie reinigen und ölen Waffen, füllen Magazine auf .</p>
                    <p class="mb-2 mt-3"><strong>Panzerplatten-Änderungen:</strong> Titan-Platten absorbieren anfangs etwas weniger Schaden als Keramik, halten aber länger und sind leichter – sie verursachen weniger Bewegungsstrafe, kosten aber mehr .</p>
                    <p class="mt-3"><strong>UHMWPE-Platten (Polyethylen):</strong> Wurden gebufft – absorbieren jetzt genauso viel Nahkampfschaden wie Stahlplatten, sind aber weniger haltbar .</p>
                    <p class="mt-2"><strong>Neue Helme mit Active Headsets:</strong> <strong>EDH-Gen V</strong> (solider Mid-Game-Helm) und <strong>TFMK-I</strong> (bester Kugelschutz im Spiel). Active Headsets dämpfen laute Geräusche (Schüsse, Explosionen) und verstärken leise (Schritte, Stimmen) .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Repair and reload buttons:</strong> In the corner of the stash there are small icons that beginners often miss. <strong>Press them before every raid.</strong> They clean and oil weapons, fill magazines .</p>
                    <p class="mb-2 mt-3"><strong>Armor plate changes:</strong> Titan plates initially absorb slightly less damage than ceramic but last longer and are lighter – they impose less movement penalty but cost more .</p>
                    <p class="mt-3"><strong>UHMWPE plates (polyethylene):</strong> Were buffed – now absorb as much melee damage as steel plates but are less durable .</p>
                    <p class="mt-2"><strong>New helmets with Active Headsets:</strong> <strong>EDH-Gen V</strong> (solid mid-game helmet) and <strong>TFMK-I</strong> (best bullet protection in the game). Active Headsets muffle loud noises (gunshots, explosions) and amplify quiet ones (footsteps, voices) .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. RÜSTUNG ============ */
        {
            id: 'section4',
            titleDe: '4. Rüstung – Was dich am Leben hält',
            titleEn: '4. Armor – What Keeps You Alive',
            introDe: 'Rüstung in <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> ist <strong>entscheidend</strong>. Ein Kopfschuss mit einem .50 BMG Barrett tötet einen voll gepanzerten Spieler nicht sofort – das Zeitfenster zum Töten (Time-to-Kill, TTK) hängt stark von der Rüstungsstufe ab. Dieser Abschnitt erklärt, was du anziehen musst und was du vermeiden solltest .',
            introEn: 'Armor in <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> is <strong>critical</strong>. A headshot with a .50 BMG Barrett does not instantly kill a fully armored player – the time-to-kill (TTK) depends heavily on the armor tier. This section explains what to wear and what to avoid .',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Rüstungs-Slots',
                    titleEn: 'Armor Slots',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Slot</th><th class="w-1/4">Empfehlung</th><th>Warum</th></tr>
                    <tr><td><strong>Helm</strong></td><td class="text-[var(--text-muted)]"><strong>Immer tragen.</strong> EDH-Gen V als Mid-Game, TFMK-I für Endgame .</td><td class="text-[var(--text-muted)]">Rüstung schützt nicht vor Kopfschüssen. Ein guter Helm ist überlebenswichtig .</td></tr>
                    <tr><td><strong>Torso</strong></td><td class="text-[var(--text-muted)]"><strong>Immer tragen.</strong> Titan für lange Kämpfe, Keramik für kurze .</td><td class="text-[var(--text-muted)]">Haupttrefferzone. Große Platten absorbieren mehr .</td></tr>
                    <tr><td><strong>Beine</strong></td><td class="text-[var(--text-muted)]"><strong>Nicht vergessen.</strong> Geliehene Kits lassen Beine frei .</td><td class="text-[var(--text-muted)]">Gute Spieler schießen gezielt auf Beine, um Bewegung zu brechen .</td></tr>
                    <tr><td><strong>Hände</strong></td><td class="text-[var(--text-muted)]">Optional, aber empfohlen .</td><td class="text-[var(--text-muted)]">Schützt Waffenhand bei Treffern .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Slot</th><th class="w-1/4">Recommendation</th><th>Why</th></tr>
                    <tr><td><strong>Helmet</strong></td><td class="text-[var(--text-muted)]"><strong>Always wear.</strong> EDH-Gen V for mid-game, TFMK-I for endgame .</td><td class="text-[var(--text-muted)]">Armor doesn't protect against headshots. A good helmet is essential .</td></tr>
                    <tr><td><strong>Torso</strong></td><td class="text-[var(--text-muted)]"><strong>Always wear.</strong> Titan for long fights, ceramic for short .</td><td class="text-[var(--text-muted)]">Main hit zone. Large plates absorb more .</td></tr>
                    <tr><td><strong>Legs</strong></td><td class="text-[var(--text-muted)]"><strong>Don't forget.</strong> Rented kits leave legs bare .</td><td class="text-[var(--text-muted)]">Good players aim for legs to break movement .</td></tr>
                    <tr><td><strong>Hands</strong></td><td class="text-[var(--text-muted)]">Optional but recommended .</td><td class="text-[var(--text-muted)]">Protects weapon hand from hits .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Rüstungs-Materialien',
                    titleEn: 'Armor Materials',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Vier Materialtypen:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-1">
                    <li><strong>UHMWPE (Polyethylen):</strong> Günstig, absorbiert jetzt Nahkampfschaden wie Stahl. Weniger haltbar als Stahl .</li>
                    <li><strong>Steel:</strong> Standard. Guter Kompromiss aus Schutz, Haltbarkeit und Gewicht .</li>
                    <li><strong>Ceramic:</strong> Absorbiert mehr Schaden als Stahl, aber schwerer und weniger haltbar in langen Kämpfen .</li>
                    <li><strong>Titan:</strong> Absorbiert anfangs etwas weniger, hält aber länger und ist leichter. Premium-Preis .</li>
                    </ul>
                    <p class="mt-3"><strong>Faustregel:</strong> Für kurze, intensive Raids Keramik. Für lange, vorsichtige Raids Titan. Für Anfänger Stahl oder UHMWPE .</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Four material types:</strong></p>
                    <ul class="list-disc pl-4 space-y-2 mt-1">
                    <li><strong>UHMWPE (polyethylene):</strong> Cheap, now absorbs melee damage like steel. Less durable than steel .</li>
                    <li><strong>Steel:</strong> Standard. Good compromise of protection, durability, and weight .</li>
                    <li><strong>Ceramic:</strong> Absorbs more damage than steel but heavier and less durable in long fights .</li>
                    <li><strong>Titan:</strong> Initially absorbs slightly less, but lasts longer and is lighter. Premium price .</li>
                    </ul>
                    <p class="mt-3"><strong>Rule of thumb:</strong> Ceramic for short, intense raids. Titan for long, cautious raids. For beginners: steel or UHMWPE .</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. AUSRÜSTUNG ============ */
        {
            id: 'section5',
            titleDe: '5. Ausrüstung – Rucksack, Rig, Container',
            titleEn: '5. Gear – Backpack, Rig, Container',
            introDe: 'Die richtige Ausrüstung entscheidet, wie viel Loot du mitnehmen kannst und wie schnell du im Kampf reagierst. Besonders wichtig: <strong>Rigs</strong> geben dir schnellen Zugriff auf Magazine und Medikamente, und <strong>Safe Container</strong> schützen deine wertvollsten Items vor dem Verlust bei Tod .',
            introEn: 'The right gear determines how much loot you can carry and how fast you react in combat. Especially important: <strong>rigs</strong> give you fast access to magazines and meds, and <strong>safe containers</strong> protect your most valuable items from loss on death .',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Ausrüstungs-Übersicht',
                    titleEn: 'Gear Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Item</th><th class="w-1/4">Funktion</th><th>Empfehlung</th></tr>
                    <tr><td><strong>Backpack</strong></td><td class="text-[var(--text-muted)]">Fügt Volumen hinzu. Small backpack = 625 Volumen .</td><td class="text-[var(--text-muted)]"><strong>Immer tragen.</strong> Ohne Rucksack kannst du kaum looten .</td></tr>
                    <tr><td><strong>Rig</strong></td><td class="text-[var(--text-muted)]">Schnellzugriff auf Magazine und Medikamente. Kleines Rig = 625 Volumen .</td><td class="text-[var(--text-muted)]"><strong>Immer tragen.</strong> Gleiches Volumen wie ein Rucksack, aber schnellere Nutzung .</td></tr>
                    <tr><td><strong>Safe Container</strong></td><td class="text-[var(--text-muted)]">Schützt Items vor Verlust bei Tod. Funktioniert nach Slots, nicht nach Volumen .</td><td class="text-[var(--text-muted)]"><strong>Schwere Waffe hineinlegen.</strong> Passt wegen Slot-System, bleibt auch bei Tod erhalten .</td></tr>
                    <tr><td><strong>Flashlight</strong></td><td class="text-[var(--text-muted)]">Beleuchtung. Bereiche werden ohne Vorwarnung stockdunkel .</td><td class="text-[var(--text-muted)]"><strong>Immer mitnehmen.</strong> Ohne Licht bist du blind .</td></tr>
                    <tr><td><strong>Beacon (Reviving)</strong></td><td class="text-[var(--text-muted)]">Respawn am Startpunkt ohne Ausrüstung. Du kannst zurücklaufen und deine Leiche looten .</td><td class="text-[var(--text-muted)]"><strong>Mitnehmen, wenn vorhanden.</strong> Second Chance .</td></tr>
                    <tr><td><strong>Kamera / Buch / Schallplatte</strong></td><td class="text-[var(--text-muted)]">Sammelobjekte für Investigation-Tasks .</td><td class="text-[var(--text-muted)]"><strong>10 Stück von jedem horten.</strong> Werden für Tasks benötigt .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Item</th><th class="w-1/4">Function</th><th>Recommendation</th></tr>
                    <tr><td><strong>Backpack</strong></td><td class="text-[var(--text-muted)]">Adds volume. Small backpack = 625 volume .</td><td class="text-[var(--text-muted)]"><strong>Always wear.</strong> Without a backpack you can barely loot .</td></tr>
                    <tr><td><strong>Rig</strong></td><td class="text-[var(--text-muted)]">Quick access to mags and meds. Small rig = 625 volume .</td><td class="text-[var(--text-muted)]"><strong>Always wear.</strong> Same volume as a backpack but faster use .</td></tr>
                    <tr><td><strong>Safe Container</strong></td><td class="text-[var(--text-muted)]">Protects items from loss on death. Works on slots, not volume .</td><td class="text-[var(--text-muted)]"><strong>Put a heavy weapon in.</strong> Fits due to slot system, survives death .</td></tr>
                    <tr><td><strong>Flashlight</strong></td><td class="text-[var(--text-muted)]">Lighting. Areas go pitch black without warning .</td><td class="text-[var(--text-muted)]"><strong>Always bring.</strong> Without light you're blind .</td></tr>
                    <tr><td><strong>Beacon (Reviving)</strong></td><td class="text-[var(--text-muted)]">Respawn at spawn point with no gear. You can run back and loot your body .</td><td class="text-[var(--text-muted)]"><strong>Bring if you have one.</strong> Second chance .</td></tr>
                    <tr><td><strong>Camera / Book / Record</strong></td><td class="text-[var(--text-muted)]">Collectibles for Investigation tasks .</td><td class="text-[var(--text-muted)]"><strong>Stockpile 10 of each.</strong> Needed for tasks .</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Der Safe-Container-Trick',
                    titleEn: 'The Safe Container Trick',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Schwere Waffen fressen normalerweise den Großteil deines Rucksackvolumens.</strong></p>
                    <p class="mb-2 mt-3"><strong>Trick:</strong> Lege die schwere Waffe in den <strong>Safe Container</strong> statt in den Rucksack. Der Container funktioniert nach <strong>Slots, nicht nach Volumen</strong> – die Waffe passt hinein, und du behältst sie auch bei Tod. Du verlierst den Container selbst, aber der Inhalt kommt mit dir heraus .</p>
                    <p class="mt-3"><strong>Was in den Safe Container gehört:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Schwere Primärwaffe, die du repliziert hast .</li>
                    <li>Wertvolle Zielfernrohre oder Aufsätze .</li>
                    <li>Seltene Munition oder Medikamente, wenn kein Platz im Rucksack ist .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Heavy weapons normally eat most of your backpack volume.</strong></p>
                    <p class="mb-2 mt-3"><strong>Trick:</strong> Put the heavy weapon in the <strong>Safe Container</strong> instead of your backpack. The container works on <strong>slots, not volume</strong> – the weapon fits, and you keep it even on death. You lose the container itself, but the contents come out with you .</p>
                    <p class="mt-3"><strong>What belongs in the Safe Container:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Heavy primary weapon you replicated .</li>
                    <li>Valuable scopes or attachments .</li>
                    <li>Rare ammo or meds if backpack space is tight .</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. CHRONOGENE ============ */
        {
            id: 'section6',
            titleDe: '6. Chronogene – Die wichtigsten Mutationen',
            titleEn: '6. Chronogens – The Key Mutations',
            introDe: '<strong>Chronogene</strong> sind biologische Modifikationen, die die physischen Fähigkeiten deines Operators verändern. Sie sind <strong>passive Buffs</strong> und funktionieren ähnlich wie Ausrüstung – aber mit einem wichtigen Prinzip: <strong>Gesetz des abnehmenden Nutzens</strong>. Mehr als zwei gleiche Chronogene sind selten sinnvoll .',
            introEn: '<strong>Chronogens</strong> are biological modifications that change your operator\'s physical abilities. They are <strong>passive buffs</strong> and work similarly to gear – but with an important principle: <strong>law of diminishing returns</strong>. More than two of the same chronogen is rarely worth it .',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Die wichtigsten Chronogene',
                    titleEn: 'The Key Chronogens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Chronogen</th><th class="w-1/4">Effekt</th><th>Empfehlung</th></tr>
                    <tr><td><strong>Speed</strong></td><td class="text-[var(--text-muted)]">Erhöht Bewegungsgeschwindigkeit. Ohne Level 3 kletterst du zu langsam Leitern hoch .</td><td class="text-[var(--text-muted)]"><strong>Must-have.</strong> Level 3 anstreben .</td></tr>
                    <tr><td><strong>Carrying Capacity</strong></td><td class="text-[var(--text-muted)]">Erhöht Traglast. Verhindert Strafen bei vollem Rucksack .</td><td class="text-[var(--text-muted)]"><strong>Sehr nützlich.</strong> Besonders für Loot-Runs .</td></tr>
                    <tr><td><strong>Jump</strong></td><td class="text-[var(--text-muted)]">Erhöht Sprungkraft .</td><td class="text-[var(--text-muted)]">Situativ. Für vertikale Karten .</td></tr>
                    <tr><td><strong>Fine Motor Skills</strong></td><td class="text-[var(--text-muted)]">Verbessert Präzision bei Interaktionen .</td><td class="text-[var(--text-muted)]">Situativ. Für Hacking oder schnelle Aktionen .</td></tr>
                    <tr><td><strong>Cold Blood</strong></td><td class="text-[var(--text-muted)]">Fragwürdiger Effekt in aktueller Meta .</td><td class="text-[var(--text-muted)]"><strong>Nicht priorisieren.</strong></td></tr>
                    <tr><td><strong>Matter Collection</strong></td><td class="text-[var(--text-muted)]">Fragwürdiger Effekt in aktueller Meta .</td><td class="text-[var(--text-muted)]"><strong>Nicht priorisieren.</strong></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Wo bekommt man Chronogene?</strong> Durch Kämpfe gegen <strong>Hellhounds</strong>, <strong>Invisibles</strong> und <strong>Dendroiden</strong>. Auch durch <strong>Zerlegen von Monsterresten</strong> im Refiner .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Chronogen</th><th class="w-1/4">Effect</th><th>Recommendation</th></tr>
                    <tr><td><strong>Speed</strong></td><td class="text-[var(--text-muted)]">Increases movement speed. Without level 3 you climb ladders too slowly .</td><td class="text-[var(--text-muted)]"><strong>Must-have.</strong> Aim for level 3 .</td></tr>
                    <tr><td><strong>Carrying Capacity</strong></td><td class="text-[var(--text-muted)]">Increases carry weight. Prevents penalties with full backpack .</td><td class="text-[var(--text-muted)]"><strong>Very useful.</strong> Especially for loot runs .</td></tr>
                    <tr><td><strong>Jump</strong></td><td class="text-[var(--text-muted)]">Increases jump height .</td><td class="text-[var(--text-muted)]">Situational. For vertical maps .</td></tr>
                    <tr><td><strong>Fine Motor Skills</strong></td><td class="text-[var(--text-muted)]">Improves precision in interactions .</td><td class="text-[var(--text-muted)]">Situational. For hacking or quick actions .</td></tr>
                    <tr><td><strong>Cold Blood</strong></td><td class="text-[var(--text-muted)]">Questionable effect in current meta .</td><td class="text-[var(--text-muted)]"><strong>Don't prioritize.</strong></td></tr>
                    <tr><td><strong>Matter Collection</strong></td><td class="text-[var(--text-muted)]">Questionable effect in current meta .</td><td class="text-[var(--text-muted)]"><strong>Don't prioritize.</strong></td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Where to get chronogens?</strong> From fighting <strong>Hellhounds</strong>, <strong>Invisibles</strong>, and <strong>Dendroids</strong>. Also from <strong>dismantling monster remains</strong> in the Refiner .</p>
                    `
                }
            ]
        },

        /* ============ 7. MONSTER ============ */
        {
            id: 'section7',
            titleDe: '7. Monster – Was sie tun und wie du sie konterst',
            titleEn: '7. Monsters – What They Do and How to Counter Them',
            introDe: 'Die Monster in <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> sind <strong>keine gewöhnlichen Zombies</strong>. Sie haben einzigartige Tracking-Methoden, Geräusche, die ihre Position verraten, und Schwächen, die du ausnutzen kannst. Dieser Abschnitt listet die wichtigsten Kreaturen und ihre Konter auf .',
            introEn: 'The monsters in <a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> are <strong>not ordinary zombies</strong>. They have unique tracking methods, sounds that reveal their position, and weaknesses you can exploit. This section lists the most important creatures and their counters .',
            subtopics: [
                {
                    id: 'subsection7_1',
                    titleDe: 'Monster-Übersicht',
                    titleEn: 'Monster Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Monster</th><th class="w-1/4">Verhalten</th><th>Konter</th></tr>
                    <tr><td><strong>Flowermen / Alpha Flowermen</strong></td><td class="text-[var(--text-muted)]">Stürmen auf dich zu. Alpha-Varianten in Park Overgrowth und Downtown .</td><td class="text-[var(--text-muted)]">Standard: Headshot-Nahkampf beim Ansturm. Alpha: Schrotflinte, Flammenwerfer oder Brandgranaten. Alphas sind auf Treppen ungeschickt – locke sie in enge Gänge .</td></tr>
                    <tr><td><strong>Mimics / Alpha Mimics</strong></td><td class="text-[var(--text-muted)]">Tarnen sich als Objekte, springen dann mit Spinnenbeinen auf .</td><td class="text-[var(--text-muted)]">Standard: Ein Nahkampfschwung. Alpha: In Gebäuden kämpfen, um Ecken schauen, Spinnen-Brut schnell töten .</td></tr>
                    <tr><td><strong>Invisibles</strong></td><td class="text-[var(--text-muted)]">Spawnen auf Spielern, die zu lange stillstehen .</td><td class="text-[var(--text-muted)]">Lautloser Nahkampf. Sie fixieren das nächste bewegte Ziel – wie ein Radar während PvP .</td></tr>
                    <tr><td><strong>Hellhounds</strong></td><td class="text-[var(--text-muted)]">Rudeljäger, spawnen aus Rissen oder Portalen .</td><td class="text-[var(--text-muted)]">Rückwärts gehen und einzeln erstechen. Nicht in Panik schießen .</td></tr>
                    <tr><td><strong>Stonemen</strong></td><td class="text-[var(--text-muted)]">Statuen-artig. Greifen an, wenn du NICHT hinschaust .</td><td class="text-[var(--text-muted)]">Rückwärts gehen und sie anstarren, um Bewegung zu blockieren. Rauchgranate oder Wand nutzen, um Sichtlinie zu brechen. Granate zum Töten .</td></tr>
                    <tr><td><strong>Shy Girls</strong></td><td class="text-[var(--text-muted)]">Das Gegenteil von Stonemen: Anstarren macht sie aggressiv .</td><td class="text-[var(--text-muted)]">Kurze Peek-Winkel nutzen. Beim Vorbeigehen auf die eigenen Stiefel schauen. Bei Aggro: Headshots .</td></tr>
                    <tr><td><strong>Electric Balls vs. Fireballs</strong></td><td class="text-[var(--text-muted)]">Energiekugeln, die durch Wände phasen .</td><td class="text-[var(--text-muted)]">Electric Balls: Aus der Distanz abschießen für Active Matter. Fireballs: Ignorieren, einfach durchlaufen .</td></tr>
                    <tr><td><strong>Seeds & Bouncy Mines</strong></td><td class="text-[var(--text-muted)]">Rote Behälter (Seeds) und unsichtbare Druckminen (Bouncy Mines) .</td><td class="text-[var(--text-muted)]">Seeds: Abschießen für Active Matter, aber Weglaufen ist sicherer. Bouncy Mines: Aus der Distanz mit Gewehr detonieren .</td></tr>
                    <tr><td><strong>Devourers</strong></td><td class="text-[var(--text-muted)]">Unterirdische Jäger .</td><td class="text-[var(--text-muted)]">Auf Geräusche achten, nicht zu lange an einer Stelle bleiben .</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Monster</th><th class="w-1/4">Behavior</th><th>Counter</th></tr>
                    <tr><td><strong>Flowermen / Alpha Flowermen</strong></td><td class="text-[var(--text-muted)]">Charge at you. Alpha variants in Park Overgrowth and Downtown .</td><td class="text-[var(--text-muted)]">Standard: Headshot melee on charge. Alpha: Shotgun, flamethrower, or incendiary grenades. Alphas are clumsy on stairs – funnel them into tight corridors .</td></tr>
                    <tr><td><strong>Mimics / Alpha Mimics</strong></td><td class="text-[var(--text-muted)]">Disguise as objects, then spring with spider legs .</td><td class="text-[var(--text-muted)]">Standard: One melee swing. Alpha: Fight inside buildings, peek around corners, kill spider spawns quickly .</td></tr>
                    <tr><td><strong>Invisibles</strong></td><td class="text-[var(--text-muted)]">Spawn on players who stand still too long .</td><td class="text-[var(--text-muted)]">Silent melee. They lock onto the nearest moving target – like a radar during PvP .</td></tr>
                    <tr><td><strong>Hellhounds</strong></td><td class="text-[var(--text-muted)]">Pack hunters, spawn from rifts or portals .</td><td class="text-[var(--text-muted)]">Walk backward and stab them one by one. Don't panic-spray bullets .</td></tr>
                    <tr><td><strong>Stonemen</strong></td><td class="text-[var(--text-muted)]">Statue-like. Attack when you're NOT looking .</td><td class="text-[var(--text-muted)]">Walk backward and stare at them to lock movement. Use smoke grenade or wall to break line of sight. Grenade to kill .</td></tr>
                    <tr><td><strong>Shy Girls</strong></td><td class="text-[var(--text-muted)]">Opposite of Stonemen: staring makes them aggressive .</td><td class="text-[var(--text-muted)]">Use quick peek angles. Look at your boots while passing. If aggroed: headshots .</td></tr>
                    <tr><td><strong>Electric Balls vs. Fireballs</strong></td><td class="text-[var(--text-muted)]">Energy orbs that phase through walls .</td><td class="text-[var(--text-muted)]">Electric Balls: Shoot from distance for Active Matter. Fireballs: Ignore, just run through .</td></tr>
                    <tr><td><strong>Seeds & Bouncy Mines</strong></td><td class="text-[var(--text-muted)]">Red containment spheres (Seeds) and invisible pressure mines (Bouncy Mines) .</td><td class="text-[var(--text-muted)]">Seeds: Shoot to harvest Active Matter, but running away is safer. Bouncy Mines: Detonate from distance with rifle .</td></tr>
                    <tr><td><strong>Devourers</strong></td><td class="text-[var(--text-muted)]">Underground hunters .</td><td class="text-[var(--text-muted)]">Listen for sounds, don't stay in one spot too long .</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============ 8. WÄHRUNGEN ============ */
        {
            id: 'section8',
            titleDe: '8. Währungen & Fortschritt',
            titleEn: '8. Currencies & Progression',
            introDe: '<a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> hat <strong>drei Währungen</strong>: Credits (Standardwährung), Monolith Tokens (Fortschritt) und Prime (Premium/Season). Dazu kommt <strong>Active Matter</strong> selbst als Ressource und Wiederbelebungswährung. Dieser Abschnitt erklärt, was du wofür ausgeben solltest .',
            introEn: '<a href="https://activematter.game/" target="_blank" class="topic-link">Active Matter</a> has <strong>three currencies</strong>: Credits (standard currency), Monolith Tokens (progression), and Prime (premium/season). Plus <strong>Active Matter</strong> itself as a resource and revive currency. This section explains what to spend where .',
            subtopics: [
                {
                    id: 'subsection8_1',
                    titleDe: 'Währungs-Übersicht',
                    titleEn: 'Currency Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Währung</th><th class="w-1/4">Quelle</th><th>Verwendung</th></tr>
                    <tr><td><strong>Credits</strong></td><td class="text-[var(--text-muted)]">Raids, Verträge, Loot-Verkauf .</td><td class="text-[var(--text-muted)]">Waffen, Munition, Ausrüstung im Shop kaufen .</td></tr>
                    <tr><td><strong>Active Matter</strong></td><td class="text-[var(--text-muted)]">Blaue Cluster am Boden, getötete Kreaturen, andere Spieler .</td><td class="text-[var(--text-muted)]"><strong>Wiederbelebung:</strong> Erster Tod = 10 AM, jeder weitere steigt. Bis zu 300 pro Raid sammelbar, jeder ~100 Credits wert .</td></tr>
                    <tr><td><strong>Monolith Tokens</strong></td><td class="text-[var(--text-muted)]">Tägliche Contracts, grüne/blaue Tasks, „Fallen's Legacy" (3 Token → 1000 Monolith) .</td><td class="text-[var(--text-muted)]">Monolith-Level freischalten, Waffen und Ausrüstung im Monolithen kaufen .</td></tr>
                    <tr><td><strong>Prime (Crystallised AM)</strong></td><td class="text-[var(--text-muted)]">Tägliche Contracts, Premium-Edition .</td><td class="text-[var(--text-muted)]">Credits, Monolith-Zugang, spezielle Items .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Fusion vs. Replikation:</strong> <strong>Fusion</strong> ist sofort, kostet aber Science Points. <strong>Replikation</strong> dauert 30 Minuten, kann aber 5 Items gleichzeitig produzieren und spart 40 Science Points und 167 Chemicals pro Batch .</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Currency</th><th class="w-1/4">Source</th><th>Use</th></tr>
                    <tr><td><strong>Credits</strong></td><td class="text-[var(--text-muted)]">Raids, contracts, loot selling .</td><td class="text-[var(--text-muted)]">Buy weapons, ammo, gear in the shop .</td></tr>
                    <tr><td><strong>Active Matter</strong></td><td class="text-[var(--text-muted)]">Blue clusters on ground, killed creatures, other players .</td><td class="text-[var(--text-muted)]"><strong>Revive:</strong> First death = 10 AM, each subsequent death increases. Up to 300 per raid, each worth ~100 credits .</td></tr>
                    <tr><td><strong>Monolith Tokens</strong></td><td class="text-[var(--text-muted)]">Daily contracts, green/blue tasks, "Fallen's Legacy" (3 tokens → 1000 Monolith) .</td><td class="text-[var(--text-muted)]">Unlock Monolith levels, buy weapons and gear in the Monolith .</td></tr>
                    <tr><td><strong>Prime (Crystallised AM)</strong></td><td class="text-[var(--text-muted)]">Daily contracts, premium edition .</td><td class="text-[var(--text-muted)]">Credits, Monolith access, special items .</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Fusion vs. Replication:</strong> <strong>Fusion</strong> is instant but costs Science Points. <strong>Replication</strong> takes 30 minutes but can produce 5 items at once and saves 40 Science Points and 167 Chemicals per batch .</p>
                    `
                },
                {
                    id: 'subsection8_2',
                    titleDe: 'Fortschritts-Tipps',
                    titleEn: 'Progression Tips',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Lager sofort erweitern:</strong> Jede Task, die neue Lagerplätze bringt, priorisieren. Sonst kannst du Fundstücke nicht abgeben .</li>
                    <li><strong>Imprägnierte Items direkt verwerten:</strong> Nicht horten – ab in den Refiner, um Materialien fürs Crafting zu bekommen .</li>
                    <li><strong>„Fallen's Legacy" täglich machen:</strong> 3 normale Token → 1000 Monolith-Token. Eine der besten Einkommensquellen .</li>
                    <li><strong>Chronogene nicht überstapeln:</strong> Mehr als 2 gleiche Chronogene lohnen selten. Setze auf Speed (Level 3) und Carrying Capacity .</li>
                    <li><strong>Sammelobjekte horten:</strong> 10 Kameras, 10 Bücher, 10 Schallplatten – für Investigation-Tasks .</li>
                    <li><strong>Kill Aufgaben nicht verbrennen:</strong> Investigation-Progress zählt NICHT in Provided Equipment-Raids. Nutze eigene Ausrüstung für Tasks .</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Expand stash immediately:</strong> Prioritize every task that grants new storage slots. Otherwise you can't hand in finds .</li>
                    <li><strong>Process enriched items directly:</strong> Don't hoard – throw them into the Refiner for crafting materials .</li>
                    <li><strong>Do "Fallen's Legacy" daily:</strong> 3 normal tokens → 1000 Monolith tokens. One of the best income sources .</li>
                    <li><strong>Don't overstack chronogens:</strong> More than 2 of the same chronogen is rarely worth it. Focus on Speed (level 3) and Carrying Capacity .</li>
                    <li><strong>Stockpile collectibles:</strong> 10 cameras, 10 books, 10 records – for Investigation tasks .</li>
                    <li><strong>Don't waste kill tasks:</strong> Investigation progress does NOT count in Provided Equipment raids. Use your own gear for tasks .</li>
                    </ul>
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
            introDe: 'Die wichtigsten Active Matter-Aspekte auf einen Blick.',
            introEn: 'The key Active Matter aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>1. Erster Raid</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Isoliert (PvE) starten. Provided Equipment zum Lernen. Eigene Ausrüstung für Tasks. Taschenlampe, Rig, Beinschienen nicht vergessen.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-kit-medical opacity-70"></i><span>2. Medizin</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">2–3 Injectors, 1–2 Painkillers, 1 Medkit, Medications zum Aufladen. Medkit heilt in 50er-Zyklen. Quick-Slots nutzen.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-crosshairs opacity-70"></i><span>3. Waffen & Rüstung</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Schrotflinte als Sekundärwaffe. AK-103 kaufen, M110 replizieren. Helm immer, Beine nicht vergessen. Titan für lange Kämpfe.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-coins opacity-70"></i><span>4. Währungen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Active Matter = Wiederbelebung (10+ pro Tod). Monolith Tokens für Fortschritt. „Fallen's Legacy" täglich für 1000 Token.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-play opacity-70"></i><span>1. First Raid</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Start Isolated (PvE). Use Provided Equipment to learn. Personal gear for tasks. Don't forget flashlight, rig, leg plates.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-kit-medical opacity-70"></i><span>2. Medicine</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">2–3 injectors, 1–2 painkillers, 1 medkit, Medications to recharge. Medkit heals in 50-unit cycles. Use quick-slots.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-crosshairs opacity-70"></i><span>3. Weapons & Armor</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Shotgun as secondary. Buy AK-103, replicate M110. Helmet always, don't forget legs. Titan for long fights.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-coins opacity-70"></i><span>4. Currencies</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Active Matter = revive (10+ per death). Monolith Tokens for progression. "Fallen's Legacy" daily for 1000 tokens.</p>
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
            { icon: 'fa-globe',    href: 'https://activematter.game/',                                target: '_blank', labelDe: 'Offizielle Website',        labelEn: 'Official Website' },
            { icon: 'fa-store',    href: 'https://store.steampowered.com/app/2887580/Active_Matter/', target: '_blank', labelDe: 'Steam-Seite',               labelEn: 'Steam Page' },
            { icon: 'fa-shopping-cart', href: 'https://shop.gaijin.net/',                             target: '_blank', labelDe: 'Gaijin Store',              labelEn: 'Gaijin Store' },
            { icon: 'fa-book',     href: 'https://activematter.game/en/news/',                        target: '_blank', labelDe: 'Offizielle News',           labelEn: 'Official News' },
            { icon: 'fa-comments', href: 'https://steamcommunity.com/app/2887580/discussions/',       target: '_blank', labelDe: 'Steam Discussions',         labelEn: 'Steam Discussions' },
            { icon: 'fa-youtube',  href: 'https://www.youtube.com/results?search_query=active+matter+guide', target: '_blank', labelDe: 'Video-Guides',       labelEn: 'Video Guides' }
        ]
    },

    footer: {
        textDe: 'Active Matter Referenz · v1.0 · Dual Lang · 2026',
        textEn: 'Active Matter Reference · v1.0 · Dual Lang · 2026'
    }
});