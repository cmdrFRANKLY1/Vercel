// resources/topics/topic_wiso.js
// WiSo topic — v3.4
// Animations: 3×3 matrix (5 s per cell + hover to inspect), supply/demand
// scenarios (curves glide, Festpreis incl.), market power ladder.

/* ==================================================================
   WISO MATRIX HOVER CONTROLLER
   ------------------------------------------------------------------
   Drives the 3×3 market matrix:
     - auto-cycles 9 cells, 5 s each
     - mouse over a cell  → pause + highlight that cell + show its text
     - mouse leaves       → resume the cycle from that cell forward
   Robust against re-renders: uses event delegation + a global tick.
   ================================================================== */
(function () {
    'use strict';
    var SLOT = 5000;    // 5 s per cell
    var TICK = 100;     // tick interval

    /* ---------- deep query (shadow DOM + same-origin iframes) ---------- */
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

    /* ---------- per-layout init ---------- */
    function initLayout(layout) {
        if (layout.__wisoMatrix) return;
        var cells = Array.prototype.slice.call(layout.querySelectorAll('.wiso-mm-cell'));
        var descs = Array.prototype.slice.call(layout.querySelectorAll('.wiso-mm-desc'));
        if (cells.length !== 9 || descs.length !== 9) return;

        var state = {
            cells: cells,
            descs: descs,
            idx: 0,
            paused: false,
            lastAdvance: (window.performance && performance.now) ? performance.now() : Date.now()
        };
        layout.__wisoMatrix = state;

        // switch OFF the pure-CSS fallback animation
        layout.classList.add('js-driven');

        function setActive(n) {
            state.idx = n;
            state.cells.forEach(function (c, i) { c.classList.toggle('is-active', i === n); });
            state.descs.forEach(function (d, i) { d.classList.toggle('is-active', i === n); });
        }

        /* ---------- delegation: bubble-phase listener on the layout ---------- */
        layout.addEventListener('mouseover', function (e) {
            var t = e.target;
            while (t && t !== layout) {
                if (t.classList && t.classList.contains('wiso-mm-cell')) {
                    var i = state.cells.indexOf(t);
                    if (i >= 0) {
                        state.paused = true;
                        setActive(i);
                    }
                    return;
                }
                t = t.parentNode;
            }
        });
        layout.addEventListener('mousemove', function (e) {
            // some frameworks retarget events; re-verify hovered cell on move
            var t = e.target;
            while (t && t !== layout) {
                if (t.classList && t.classList.contains('wiso-mm-cell')) {
                    var i = state.cells.indexOf(t);
                    if (i >= 0 && state.idx !== i) {
                        state.paused = true;
                        setActive(i);
                    }
                    return;
                }
                t = t.parentNode;
            }
        });

        /* ---------- resume when leaving the whole layout ---------- */
        layout.addEventListener('mouseleave', function () {
            state.paused = false;
            state.lastAdvance = (window.performance && performance.now) ? performance.now() : Date.now();
        });

        /* ---------- tick callback invoked by the global loop ---------- */
        state.tick = function () {
            if (state.paused) return;
            var now = (window.performance && performance.now) ? performance.now() : Date.now();
            if (now - state.lastAdvance >= SLOT) {
                state.lastAdvance = now;
                setActive((state.idx + 1) % 9);
            }
        };

        setActive(0);
    }

    /* ---------- scan + tick ---------- */
    function scan() {
        allDocuments().forEach(function (doc) {
            deepQueryAll(doc, '.wiso-mm-layout').forEach(function (l) {
                try { initLayout(l); } catch (_) {}
            });
        });
    }
    function globalTick() {
        allDocuments().forEach(function (doc) {
            deepQueryAll(doc, '.wiso-mm-layout').forEach(function (l) {
                if (l.__wisoMatrix && l.__wisoMatrix.tick) {
                    try { l.__wisoMatrix.tick(); } catch (_) {}
                }
            });
        });
    }

    function start() {
        scan();
        setInterval(scan, 300);
        setInterval(globalTick, TICK);
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
    id: 'WiSo',
    icon: 'fa-briefcase',
    titleDe: 'Wirtschaft & Sozialkunde',
    titleEn: 'Economics & Social Studies',
    descDe: 'WiSo-Referenz für die Abschlussprüfung: Vertragsrecht, Arbeitsrecht, Mitbestimmung, Sozialversicherungen, Unternehmensformen sowie Markttypen und Angebot/Nachfrage.',
    descEn: 'WiSo reference for the final exam: contract law, labor law, co-determination, social security, corporate legal forms, plus market structures and supply/demand.',

    sidebarTitleDe: 'WiSo-Referenz',
    sidebarTitleEn: 'WiSo Cheatsheet',
    sidebarSubtitleDe: 'Wirtschaft & Sozialkunde',
    sidebarSubtitleEn: 'Economics & Social Studies',
    sidebarVersion: 'v3.4',

    hero: {
        titleDe: 'Wirtschaft & Sozialkunde (WiSo)',
        titleEn: 'Economics & Social Studies (WiSo)',
        introDe: 'Das Fach <strong>Wirtschaft und Sozialkunde</strong> ist ein zentraler Bestandteil der Abschlussprüfung für Fachinformatiker und IT-System-Elektroniker in Deutschland. Diese Referenz umfasst die prüfungsrelevanten Themenbereiche Vertragsrecht, Arbeitsrecht, betriebliche Mitbestimmung, das System der sozialen Sicherung, die wichtigsten Unternehmensrechtsformen sowie die volkswirtschaftlichen Grundlagen <a href="#markttypen">Markttypen</a> und <a href="#angebot-nachfrage">Angebot &amp; Nachfrage</a>.',
        introEn: 'The subject <strong>Economics and Social Studies (WiSo)</strong> is a central component of the final examination for IT specialists in Germany. This reference covers exam-relevant topics: contract law, labor law, co-determination, the social security system, corporate legal forms, and the economic fundamentals <a href="#markttypen">market structures</a> and <a href="#angebot-nachfrage">supply &amp; demand</a>.'
    },

    quickLinks: [
        { icon: 'fa-file-contract',  href: '#vertragsrecht',      switchToDoc: true, labelDe: 'Vertragsrecht',      labelEn: 'Contract Law' },
        { icon: 'fa-user-tie',       href: '#arbeitsrecht',       switchToDoc: true, labelDe: 'Arbeitsrecht',       labelEn: 'Labor Law' },
        { icon: 'fa-people-group',   href: '#mitbestimmung',      switchToDoc: true, labelDe: 'Mitbestimmung',      labelEn: 'Co-determination' },
        { icon: 'fa-shield-heart',   href: '#sozialversicherung', switchToDoc: true, labelDe: 'Sozialversicherung', labelEn: 'Social Security' },
        { icon: 'fa-building',       href: '#rechtsformen',       switchToDoc: true, labelDe: 'Rechtsformen',       labelEn: 'Legal Forms' },
        { icon: 'fa-chess-knight',   href: '#markttypen',         switchToDoc: true, labelDe: 'Markttypen',         labelEn: 'Market Structures' },
        { icon: 'fa-chart-line',     href: '#angebot-nachfrage',  switchToDoc: true, labelDe: 'Angebot & Nachfrage', labelEn: 'Supply & Demand' }
    ],

    sections: [
        /* ============ 1. VERTRAGSRECHT ============ */
        {
            id: 'vertragsrecht',
            titleDe: '1. Vertragsrecht (BGB)',
            titleEn: '1. Contract Law (BGB)',
            introDe: 'Grundlage für Verträge in Deutschland ist das <a href="https://de.wikipedia.org/wiki/B%C3%BCrgerliches_Gesetzbuch" target="_blank">Bürgerliche Gesetzbuch (BGB)</a>. Ein Vertrag kommt durch zwei übereinstimmende Willenserklärungen zustande: <strong>Antrag (Angebot)</strong> und <strong>Annahme</strong>.',
            introEn: 'The basis for contracts in Germany is the Civil Code (BGB). A contract is formed by two matching declarations of intent: <strong>Offer</strong> and <strong>Acceptance</strong>.',
            subtopics: [
                {
                    id: 'geschaeftsfaehigkeit',
                    titleDe: '1.1 Geschäftsfähigkeit (§§ 104 ff. BGB)',
                    titleEn: '1.1 Legal Capacity (§§ 104 ff. BGB)',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-1/4">Stufe</th><th class="w-1/4">Alter</th><th>Rechtsfolge bei Verträgen</th></tr>
                    <tr><td><strong>Geschäftsunfähigkeit</strong></td><td class="text-[var(--text-muted)]">Unter 7 Jahre</td><td class="text-[var(--text-muted)]">Willenserklärungen sind <strong>nichtig</strong>. Der gesetzliche Vertreter muss handeln.</td></tr>
                    <tr><td><strong>Beschränkte Geschäftsfähigkeit</strong></td><td class="text-[var(--text-muted)]">7 bis vollendetes 18. Lebensjahr</td><td class="text-[var(--text-muted)]">Verträge sind <strong>schwebend unwirksam</strong>.<br><em>Ausnahmen:</em> Taschengeldparagraf (§ 110 BGB).</td></tr>
                    <tr><td><strong>Volle Geschäftsfähigkeit</strong></td><td class="text-[var(--text-muted)]">Ab 18 Jahren</td><td class="text-[var(--text-muted)]">Verträge sind <strong>voll wirksam</strong>.</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-1/4">Level</th><th class="w-1/4">Age</th><th>Legal Consequence</th></tr>
                    <tr><td><strong>Incapacity</strong></td><td class="text-[var(--text-muted)]">Under 7 years</td><td class="text-[var(--text-muted)]">Declarations of intent are <strong>void</strong>.</td></tr>
                    <tr><td><strong>Limited Capacity</strong></td><td class="text-[var(--text-muted)]">7 to completed 18th year</td><td class="text-[var(--text-muted)]">Contracts are <strong>pending invalid</strong>.<br><em>Exceptions:</em> Pocket money paragraph.</td></tr>
                    <tr><td><strong>Full Capacity</strong></td><td class="text-[var(--text-muted)]">From 18 years</td><td class="text-[var(--text-muted)]">Contracts are <strong>fully valid</strong>.</td></tr>
                    </table></div>`
                },
                {
                    id: 'nichtigkeit',
                    titleDe: '1.2 Nichtigkeit und Anfechtbarkeit',
                    titleEn: '1.2 Voidability & Nullity',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Nichtige Verträge</h4>
                            <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                                <li>Geschäftsunfähigkeit des Partners.</li>
                                <li>Scherz- oder Scheingeschäfte.</li>
                                <li>Verstoß gegen gesetzliche Verbote.</li>
                                <li>Sittenwidrigkeit / Wucher.</li>
                                <li>Formmangel (z.B. Hauskauf ohne Notar).</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Anfechtbare Verträge</h4>
                            <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                                <li><strong>Inhaltsirrtum:</strong> Irrtum über die Bedeutung.</li>
                                <li><strong>Erklärungsirrtum:</strong> Verschreiben, Vertippen.</li>
                                <li><strong>Arglistige Täuschung:</strong> Bewusstes Verschweigen.</li>
                                <li><strong>Widerrechtliche Drohung:</strong> Zwang.</li>
                            </ul>
                        </div>
                    </div>`,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Void Contracts</h4>
                            <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                                <li>Incapacity of the partner.</li>
                                <li>Joke or sham transactions.</li>
                                <li>Violation of statutory prohibitions.</li>
                                <li>Immorality / Usury.</li>
                                <li>Form defect.</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Voidable Contracts</h4>
                            <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                                <li><strong>Mistake in Content.</strong></li>
                                <li><strong>Mistake in Expression.</strong></li>
                                <li><strong>Fraudulent Misrepresentation.</strong></li>
                                <li><strong>Duress.</strong></li>
                            </ul>
                        </div>
                    </div>`
                }
            ]
        },

        /* ============ 2. ARBEITSRECHT ============ */
        {
            id: 'arbeitsrecht',
            titleDe: '2. Arbeitsrecht',
            titleEn: '2. Labor Law',
            subtopics: [
                {
                    id: 'arbeitsvertrag',
                    titleDe: '2.1 Der Arbeitsvertrag',
                    titleEn: '2.1 The Employment Contract',
                    htmlDe: `<p class="mb-0">Ein Arbeitsvertrag kann grundsätzlich formfrei (auch mündlich) geschlossen werden. Gemäß Nachweisgesetz muss der Arbeitgeber die wesentlichen Bedingungen jedoch spätestens nach einem Monat schriftlich niederlegen.</p>`,
                    htmlEn: `<p class="mb-0">An employment contract can generally be concluded without any formal requirements (even verbally). However, the employer must put the essential conditions in writing no later than one month after commencement.</p>`
                },
                {
                    id: 'kuendigung',
                    titleDe: '2.2 Kündigung und Kündigungsschutz',
                    titleEn: '2.2 Termination and Dismissal Protection',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-1/4">Art der Kündigung</th><th>Voraussetzungen &amp; Fristen</th></tr>
                    <tr><td><strong>Ordentliche Kündigung</strong></td><td class="text-[var(--text-muted)]">Schriftlich. Grundfrist: 4 Wochen zum 15. oder Monatsende (§ 622 BGB).</td></tr>
                    <tr><td><strong>Außerordentliche Kündigung</strong></td><td class="text-[var(--text-muted)]">Erfordert <strong>wichtigen Grund</strong>. Innerhalb 2 Wochen nach Bekanntwerden.</td></tr>
                    <tr><td><strong>KSchG</strong></td><td class="text-[var(--text-muted)]">Ab <strong>&gt;10 MA</strong> und <strong>&gt;6 Monate</strong> Betriebszugehörigkeit. Klagefrist: 3 Wochen.</td></tr>
                    <tr><td><strong>Besonderer Kündigungsschutz</strong></td><td class="text-[var(--text-muted)]">Schwangere, Schwerbehinderte, Betriebsräte, JAV, Azubis nach Probezeit.</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-1/4">Type of Termination</th><th>Conditions &amp; Deadlines</th></tr>
                    <tr><td><strong>Ordinary Termination</strong></td><td class="text-[var(--text-muted)]">In writing. Basic period: 4 weeks to the 15th or month-end.</td></tr>
                    <tr><td><strong>Extraordinary Dismissal</strong></td><td class="text-[var(--text-muted)]">Requires <strong>important reason</strong>. Within 2 weeks of awareness.</td></tr>
                    <tr><td><strong>Dismissal Protection Act</strong></td><td class="text-[var(--text-muted)]">From <strong>&gt;10 employees</strong> and <strong>&gt;6 months</strong> tenure. Suit deadline: 3 weeks.</td></tr>
                    <tr><td><strong>Special Protection</strong></td><td class="text-[var(--text-muted)]">Pregnant women, severely disabled, works council, trainees after probation.</td></tr>
                    </table></div>`
                },
                {
                    id: 'jugendarbeit',
                    titleDe: '2.3 Jugendarbeitsschutzgesetz (JArbSchG)',
                    titleEn: '2.3 Youth Employment Act (JArbSchG)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded text-[var(--text-muted)]">
                        <p>Gilt für alle unter <strong>18 Jahren</strong>.</p>
                        <ul class="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Arbeitszeit:</strong> Max. 8 Std./Tag, max. 40 Std./Woche. Nur 5-Tage-Woche.</li>
                            <li><strong>Pausen:</strong> Min. 30 Min. bei 4,5–6 Std.; min. 60 Min. bei &gt;6 Std.</li>
                            <li><strong>Nachtruhe:</strong> Verbot von 20:00 bis 06:00 Uhr.</li>
                            <li><strong>Urlaub:</strong> min. 30 Werktage unter 16 J., min. 25 unter 18 J.</li>
                        </ul>
                    </div>`,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded text-[var(--text-muted)]">
                        <p>Applies to everyone under <strong>18 years</strong>.</p>
                        <ul class="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Hours:</strong> Max. 8 hrs/day, max. 40 hrs/week. 5-day week only.</li>
                            <li><strong>Breaks:</strong> Min. 30 mins for 4.5–6 hrs; 60 mins for &gt;6 hrs.</li>
                            <li><strong>Night Rest:</strong> Prohibited 8 PM – 6 AM.</li>
                            <li><strong>Vacation:</strong> min. 30 days under 16, min. 25 under 18.</li>
                        </ul>
                    </div>`
                }
            ]
        },

        /* ============ 3. MITBESTIMMUNG ============ */
        {
            id: 'mitbestimmung',
            titleDe: '3. Betriebliche Mitbestimmung',
            titleEn: '3. Corporate Co-determination',
            subtopics: [
                {
                    id: 'betriebsrat',
                    titleDe: '3.1 Der Betriebsrat (BetrVG)',
                    titleEn: '3.1 The Works Council (BetrVG)',
                    htmlDe: `
                    <p>Der Betriebsrat vertritt die Interessen der Arbeitnehmer. Wählbar in Betrieben mit <strong>mind. 5 ständigen wahlberechtigten Arbeitnehmern</strong>.</p>
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-1/4">Recht</th><th>Erklärung</th></tr>
                    <tr><td><strong>Mitbestimmungsrecht</strong> (stärkstes)</td><td class="text-[var(--text-muted)]">AG <em>muss</em> Zustimmung einholen (Arbeitszeit, Urlaub, Überwachung).</td></tr>
                    <tr><td><strong>Mitwirkungsrecht</strong></td><td class="text-[var(--text-muted)]">BR muss angehört werden (z.B. vor Kündigung).</td></tr>
                    <tr><td><strong>Informationsrecht</strong> (schwächstes)</td><td class="text-[var(--text-muted)]">AG muss rechtzeitig informieren.</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <p>The works council represents employee interests. Can be elected with <strong>at least 5 permanent eligible employees</strong>.</p>
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-1/4">Right</th><th>Explanation</th></tr>
                    <tr><td><strong>Co-determination</strong> (strongest)</td><td class="text-[var(--text-muted)]">Employer <em>must</em> obtain consent (working hours, vacation, monitoring).</td></tr>
                    <tr><td><strong>Participation</strong></td><td class="text-[var(--text-muted)]">Council must be heard (e.g. before dismissal).</td></tr>
                    <tr><td><strong>Information</strong> (weakest)</td><td class="text-[var(--text-muted)]">Employer must inform in a timely manner.</td></tr>
                    </table></div>`
                },
                {
                    id: 'jav',
                    titleDe: '3.2 Jugend- und Auszubildendenvertretung (JAV)',
                    titleEn: '3.2 Youth and Trainee Representation (JAV)',
                    htmlDe: `<p class="mb-0">Die JAV vertritt die Interessen der jugendlichen Arbeitnehmer (unter 18) und Azubis (unter 25). Voraussetzung: bestehender Betriebsrat und mind. 5 Jugendliche/Azubis.</p>`,
                    htmlEn: `<p class="mb-0">The JAV represents young employees (under 18) and trainees (under 25). Requires an existing works council and at least 5 young employees/trainees.</p>`
                }
            ]
        },

        /* ============ 4. SOZIALVERSICHERUNGEN ============ */
        {
            id: 'sozialversicherung',
            titleDe: '4. Das System der Sozialversicherungen',
            titleEn: '4. The Social Security System',
            introDe: 'Das deutsche Sozialversicherungssystem folgt dem Solidaritätsprinzip. Beiträge werden paritätisch (50/50) getragen (Ausnahme: Unfallversicherung).',
            introEn: 'The German social security system follows solidarity. Contributions are split 50/50 (exception: accident insurance).',
            subtopics: [
                {
                    id: 'sv-zweige',
                    titleDe: '4.1 Die 5 Säulen',
                    titleEn: '4.1 The 5 Pillars',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable min-w-[600px]">
                    <tr><th>Versicherung</th><th>Einführung</th><th>Träger</th><th>Beitragszahler</th><th>Leistungen</th></tr>
                    <tr><td><strong>Krankenversicherung (KV)</strong></td><td class="text-center font-mono">1883</td><td class="text-[var(--text-muted)]">Krankenkassen</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">Behandlung, Medikamente, Krankengeld.</td></tr>
                    <tr><td><strong>Unfallversicherung (UV)</strong></td><td class="text-center font-mono">1884</td><td class="text-[var(--text-muted)]">Berufsgenossenschaften</td><td class="text-[var(--text-muted)]"><strong>Nur Arbeitgeber</strong> (100%)</td><td class="text-[var(--text-muted)]">Arbeits- und Wegeunfälle.</td></tr>
                    <tr><td><strong>Rentenversicherung (RV)</strong></td><td class="text-center font-mono">1889</td><td class="text-[var(--text-muted)]">Deutsche Rentenversicherung</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">Altersrente, Erwerbsminderung.</td></tr>
                    <tr><td><strong>Arbeitslosenversicherung (ALV)</strong></td><td class="text-center font-mono">1927</td><td class="text-[var(--text-muted)]">Bundesagentur für Arbeit</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">ALG I, Kurzarbeitergeld.</td></tr>
                    <tr><td><strong>Pflegeversicherung (PV)</strong></td><td class="text-center font-mono">1995</td><td class="text-[var(--text-muted)]">Pflegekassen</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)*</td><td class="text-[var(--text-muted)]">Pflegegeld.</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable min-w-[600px]">
                    <tr><th>Insurance</th><th>Est.</th><th>Carrier</th><th>Payers</th><th>Benefits</th></tr>
                    <tr><td><strong>Health (KV)</strong></td><td class="text-center font-mono">1883</td><td class="text-[var(--text-muted)]">Health Funds</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">Treatment, medication.</td></tr>
                    <tr><td><strong>Accident (UV)</strong></td><td class="text-center font-mono">1884</td><td class="text-[var(--text-muted)]">Trade Associations</td><td class="text-[var(--text-muted)]"><strong>Employer only</strong></td><td class="text-[var(--text-muted)]">Work / commuting accidents.</td></tr>
                    <tr><td><strong>Pension (RV)</strong></td><td class="text-center font-mono">1889</td><td class="text-[var(--text-muted)]">German Pension Ins.</td><td class="text-[var(--text-muted)]">AG &amp; AN</td><td class="text-[var(--text-muted)]">Old-age pension.</td></tr>
                    <tr><td><strong>Unemployment (ALV)</strong></td><td class="text-center font-mono">1927</td><td class="text-[var(--text-muted)]">Federal Employment Agency</td><td class="text-[var(--text-muted)]">AG &amp; AN</td><td class="text-[var(--text-muted)]">Unemployment benefits I.</td></tr>
                    <tr><td><strong>Long-term Care (PV)</strong></td><td class="text-center font-mono">1995</td><td class="text-[var(--text-muted)]">Care Funds</td><td class="text-[var(--text-muted)]">AG &amp; AN</td><td class="text-[var(--text-muted)]">Care allowance.</td></tr>
                    </table></div>`
                },
                {
                    id: 'generationenvertrag',
                    titleDe: '4.2 Generationenvertrag (Rentenversicherung)',
                    titleEn: '4.2 Generational Contract (Pension)',
                    htmlDe: `
                    <div class="text-[var(--text-muted)] bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                        <p>Das Rentensystem basiert auf dem <strong>Umlageverfahren</strong>: Die arbeitende Generation zahlt direkt an die jetzigen Rentner.</p>
                        <p class="mb-0"><strong class="text-[var(--heading-color)] block mt-2">Problem (Demografischer Wandel):</strong> Überalterung → weniger Beitragszahler, mehr Rentner → finanzieller Druck.</p>
                    </div>`,
                    htmlEn: `
                    <div class="text-[var(--text-muted)] bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                        <p>Pension system is <strong>pay-as-you-go</strong>: the working generation pays directly to current retirees.</p>
                        <p class="mb-0"><strong class="text-[var(--heading-color)] block mt-2">Problem (Demographic Change):</strong> Aging society → fewer contributors, more retirees → financial pressure.</p>
                    </div>`
                }
            ]
        },

        /* ============ 5. RECHTSFORMEN ============ */
        {
            id: 'rechtsformen',
            titleDe: '5. Rechtsformen der Unternehmen',
            titleEn: '5. Legal Forms of Enterprises',
            introDe: 'Man unterscheidet Einzelunternehmen, Personengesellschaften und Kapitalgesellschaften.',
            introEn: 'Distinction between sole proprietorships, partnerships and corporations.',
            subtopics: [
                {
                    id: 'einzelunternehmen',
                    titleDe: '5.1 Einzelunternehmen',
                    titleEn: '5.1 Sole Proprietorship',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[20%]">Merkmal</th><th>Details</th></tr>
                    <tr><td><strong>Gründer</strong></td><td class="text-[var(--text-muted)]">Eine natürliche Person.</td></tr>
                    <tr><td><strong>Kapital</strong></td><td class="text-[var(--text-muted)]">Kein Mindestkapital.</td></tr>
                    <tr><td><strong>Haftung</strong></td><td class="text-[var(--text-muted)]"><strong>Unbeschränkt</strong> (Geschäfts- und Privatvermögen).</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[20%]">Feature</th><th>Details</th></tr>
                    <tr><td><strong>Founder</strong></td><td class="text-[var(--text-muted)]">Single natural person.</td></tr>
                    <tr><td><strong>Capital</strong></td><td class="text-[var(--text-muted)]">No minimum capital.</td></tr>
                    <tr><td><strong>Liability</strong></td><td class="text-[var(--text-muted)]"><strong>Unlimited</strong>.</td></tr>
                    </table></div>`
                },
                {
                    id: 'personengesellschaften',
                    titleDe: '5.2 Personengesellschaften (OHG, KG)',
                    titleEn: '5.2 Partnerships (OHG, KG)',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[20%]">Rechtsform</th><th>Merkmale</th></tr>
                    <tr><td><strong>OHG</strong></td><td class="text-[var(--text-muted)]">Mind. 2 Gesellschafter. Alle haften <strong>unbeschränkt</strong>.</td></tr>
                    <tr><td><strong>KG</strong></td><td class="text-[var(--text-muted)]">Komplementär (unbeschränkt) + Kommanditist (beschränkt auf Einlage).</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[20%]">Form</th><th>Features</th></tr>
                    <tr><td><strong>OHG</strong></td><td class="text-[var(--text-muted)]">Min. 2 partners. All have <strong>unlimited</strong> liability.</td></tr>
                    <tr><td><strong>KG</strong></td><td class="text-[var(--text-muted)]">General partner (unlimited) + limited partner (contribution).</td></tr>
                    </table></div>`
                },
                {
                    id: 'kapitalgesellschaften',
                    titleDe: '5.3 Kapitalgesellschaften (GmbH, AG)',
                    titleEn: '5.3 Corporations (GmbH, AG)',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Kapitalgesellschaften sind juristische Personen, Haftung auf Gesellschaftsvermögen beschränkt.</p>
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[20%]">Rechtsform</th><th>Merkmale</th></tr>
                    <tr><td><strong>GmbH</strong></td><td class="text-[var(--text-muted)]"><strong>Stammkapital:</strong> ab 25.000 €. Organe: Geschäftsführer, Gesellschafterversammlung.</td></tr>
                    <tr><td><strong>AG</strong></td><td class="text-[var(--text-muted)]"><strong>Grundkapital:</strong> ab 50.000 €. Organe: Vorstand, Aufsichtsrat, Hauptversammlung.</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">Corporations are legal entities, liability limited to corporate assets.</p>
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[20%]">Form</th><th>Features</th></tr>
                    <tr><td><strong>GmbH</strong></td><td class="text-[var(--text-muted)]"><strong>Share capital:</strong> from €25,000. Organs: MD, shareholders' meeting.</td></tr>
                    <tr><td><strong>AG</strong></td><td class="text-[var(--text-muted)]"><strong>Share capital:</strong> from €50,000. Organs: board, supervisory board, general meeting.</td></tr>
                    </table></div>`
                }
            ]
        },

        /* ============ 6. MARKTTYPEN ============ */
        {
            id: 'markttypen',
            titleDe: '6. Markttypen & Marktformen',
            titleEn: '6. Market Types & Structures',
            introDe: 'Märkte werden nach der <strong>Anzahl der Marktteilnehmer</strong> klassifiziert (Stackelberg-Matrix). Die Struktur bestimmt Marktmacht und Preisbildung.',
            introEn: 'Markets are classified by <strong>number of participants</strong> (Stackelberg matrix). Structure dictates market power and pricing.',
            subtopics: [
                {
                    id: 'markt-matrix',
                    titleDe: '6.1 Die 3×3 Markt-Matrix',
                    titleEn: '6.1 The 3×3 Market Matrix',
                    htmlDe: `
                    <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
                    <tr><th>Form</th><th>Anbieter / Nachfrager</th><th>Beispiel</th></tr>
                    <tr><td><strong>Polypol</strong></td><td>viele / viele</td><td class="text-[var(--text-muted)]">Aktienmarkt, Weizenmarkt</td></tr>
                    <tr><td><strong>Oligopol</strong></td><td>wenige / viele</td><td class="text-[var(--text-muted)]">Mobilfunk, Tankstellen</td></tr>
                    <tr><td><strong>Monopol</strong></td><td>einer / viele</td><td class="text-[var(--text-muted)]">Bahnnetz, Patentinhaber</td></tr>
                    <tr><td><strong>Monopson</strong></td><td>viele / einer</td><td class="text-[var(--text-muted)]">Staat als Rüstungskäufer</td></tr>
                    <tr><td><strong>Oligopson</strong></td><td>viele / wenige</td><td class="text-[var(--text-muted)]">Milchbauern &amp; Supermarktketten</td></tr>
                    <tr><td><strong>Bilaterales Monopol</strong></td><td>einer / einer</td><td class="text-[var(--text-muted)]">Gewerkschaft vs. AG-Verband</td></tr>
                    </table></div>`,
                    htmlEn: `
                    <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
                    <tr><th>Form</th><th>Sellers / Buyers</th><th>Example</th></tr>
                    <tr><td><strong>Perfect Competition</strong></td><td>many / many</td><td class="text-[var(--text-muted)]">Stock market, wheat market</td></tr>
                    <tr><td><strong>Oligopoly</strong></td><td>few / many</td><td class="text-[var(--text-muted)]">Telecoms, gas stations</td></tr>
                    <tr><td><strong>Monopoly</strong></td><td>one / many</td><td class="text-[var(--text-muted)]">Rail network, patents</td></tr>
                    <tr><td><strong>Monopsony</strong></td><td>many / one</td><td class="text-[var(--text-muted)]">State as arms buyer</td></tr>
                    <tr><td><strong>Oligopsony</strong></td><td>many / few</td><td class="text-[var(--text-muted)]">Dairy farmers &amp; supermarket chains</td></tr>
                    <tr><td><strong>Bilateral Monopoly</strong></td><td>one / one</td><td class="text-[var(--text-muted)]">Union vs. employers' association</td></tr>
                    </table></div>`
                },
                {
                    id: 'polypol-monopol-oligopol',
                    titleDe: '6.2 Polypol, Monopol und Oligopol',
                    titleEn: '6.2 Polypoly, Monopoly and Oligopoly',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-green)]">Polypol</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Viele Anbieter / viele Nachfrager</li>
                                <li>Homogene Güter, volle Transparenz</li>
                                <li>Freier Marktzutritt</li>
                                <li><strong>P = MC</strong></li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-red)]">Monopol</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Ein Anbieter / viele Nachfrager</li>
                                <li>Preissetzer, keine Substitute</li>
                                <li><strong>MR = MC → P(1+1/ε) = MC</strong></li>
                                <li>Wohlfahrtsverlust</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-amber)]">Oligopol</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Wenige Anbieter / viele Nachfrager</li>
                                <li>Interdependenz, Kartellgefahr</li>
                                <li>Cournot (Menge) oder Bertrand (Preis)</li>
                                <li>Spieltheorie</li>
                            </ul>
                        </div>
                    </div>`,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-green)]">Polypoly</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Many sellers / many buyers</li>
                                <li>Homogeneous goods, full transparency</li>
                                <li>Free market entry</li>
                                <li><strong>P = MC</strong></li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-red)]">Monopoly</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>One seller / many buyers</li>
                                <li>Price maker, no substitutes</li>
                                <li><strong>MR = MC → P(1+1/ε) = MC</strong></li>
                                <li>Deadweight loss</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-amber)]">Oligopoly</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Few sellers / many buyers</li>
                                <li>Interdependence, cartel risk</li>
                                <li>Cournot (quantity) or Bertrand (price)</li>
                                <li>Game theory</li>
                            </ul>
                        </div>
                    </div>`
                },
                {
                    id: 'marktmacht',
                    titleDe: '6.3 Kennzahlen der Marktmacht (Lerner, HHI)',
                    titleEn: '6.3 Market Power Metrics (Lerner, HHI)',
                    htmlDe: `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Lerner-Index (L)</h4>
                            <p class="text-sm text-[var(--text-muted)]">Misst Marktmacht: Aufschlag des Preises über die Grenzkosten.</p>
                            <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">L = (P − MC) / P = −1/ε</div>
                            <ul class="text-xs space-y-1 text-[var(--text-muted)] pl-4 list-disc">
                                <li>L = 0 → keine Marktmacht (Polypol)</li>
                                <li>L → 1 → hohe Marktmacht (Monopol)</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Herfindahl-Hirschman-Index (HHI)</h4>
                            <p class="text-sm text-[var(--text-muted)]">Misst Marktkonzentration (Kartellamt).</p>
                            <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">HHI = Σ sᵢ²</div>
                            <p class="text-xs text-[var(--text-muted)]">sᵢ = Marktanteil in %. HHI = 10.000 → Monopol. HHI &lt; 1.500 → wettbewerblich.</p>
                        </div>
                    </div>`,
                    htmlEn: `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Lerner Index (L)</h4>
                            <p class="text-sm text-[var(--text-muted)]">Measures market power: mark-up of price over marginal cost.</p>
                            <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">L = (P − MC) / P = −1/ε</div>
                            <ul class="text-xs space-y-1 text-[var(--text-muted)] pl-4 list-disc">
                                <li>L = 0 → no market power</li>
                                <li>L → 1 → high market power</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Herfindahl-Hirschman Index (HHI)</h4>
                            <p class="text-sm text-[var(--text-muted)]">Measures market concentration (antitrust).</p>
                            <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">HHI = Σ sᵢ²</div>
                            <p class="text-xs text-[var(--text-muted)]">sᵢ = market share %. HHI = 10,000 → monopoly. HHI &lt; 1,500 → competitive.</p>
                        </div>
                    </div>`
                }
            ]
        },

        /* ============ 7. ANGEBOT & NACHFRAGE ============ */
        {
            id: 'angebot-nachfrage',
            titleDe: '7. Angebot, Nachfrage & Marktgleichgewicht',
            titleEn: '7. Supply, Demand & Market Equilibrium',
            introDe: 'Das Modell von <strong>Angebot und Nachfrage</strong> ist Fundament der Mikroökonomie: Preise und Mengen entstehen durch das Zusammenspiel von Konsumenten und Unternehmen.',
            introEn: 'The model of <strong>supply and demand</strong> is the foundation of microeconomics: prices and quantities emerge from the interaction of consumers and firms.',
            subtopics: [
                {
                    id: 'nachfrage-angebot-funktionen',
                    titleDe: '7.1 Nachfrage- und Angebotsfunktion',
                    titleEn: '7.1 Demand and Supply Functions',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Nachfrage</p>
                            <div class="text-center text-xl font-mono text-[var(--accent-amber)] mb-2">Q<sub>D</sub> = a − b · P</div>
                            <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                                <li><strong>a</strong> = Maximaler Bedarf (bei P = 0)</li>
                                <li><strong>b</strong> = Preisreaktion (Käuferflucht)</li>
                                <li>Negativer Zusammenhang</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Angebot</p>
                            <div class="text-center text-xl font-mono text-[var(--accent-blue)] mb-2">Q<sub>S</sub> = c + d · P</div>
                            <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                                <li><strong>c</strong> = Fixterm (oft negativ)</li>
                                <li><strong>d</strong> = Preisreaktion (Produktionsanstieg)</li>
                                <li>Positiver Zusammenhang</li>
                            </ul>
                        </div>
                    </div>`,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Demand</p>
                            <div class="text-center text-xl font-mono text-[var(--accent-amber)] mb-2">Q<sub>D</sub> = a − b · P</div>
                            <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                                <li><strong>a</strong> = Maximum demand (at P = 0)</li>
                                <li><strong>b</strong> = Price sensitivity</li>
                                <li>Negative relationship</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Supply</p>
                            <div class="text-center text-xl font-mono text-[var(--accent-blue)] mb-2">Q<sub>S</sub> = c + d · P</div>
                            <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                                <li><strong>c</strong> = Intercept (often negative)</li>
                                <li><strong>d</strong> = Price sensitivity</li>
                                <li>Positive relationship</li>
                            </ul>
                        </div>
                    </div>`
                },
                {
                    id: 'gleichgewicht-shocks',
                    titleDe: '7.2 Marktgleichgewicht und Shocks',
                    titleEn: '7.2 Equilibrium and Shocks',
                    htmlDe: `
                    <p>Gleichgewicht: Q<sub>D</sub> = Q<sub>S</sub> ⇒ P* = (a−c)/(b+d).</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-amber)]">Nachfrageschock</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Rechtsverschiebung (Einkommen, Trends) → Preis ↑ und Menge ↑.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-blue)]">Angebotsschock</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Kostenerhöhung → Linksverschiebung → Preis ↑, Menge ↓.</p>
                        </div>
                    </div>`,
                    htmlEn: `
                    <p>Equilibrium: Q<sub>D</sub> = Q<sub>S</sub> ⇒ P* = (a−c)/(b+d).</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-amber)]">Demand Shock</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Rightward shift (income, trends) → price ↑, quantity ↑.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--accent-blue)]">Supply Shock</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Cost increase → leftward shift → price ↑, quantity ↓.</p>
                        </div>
                    </div>`
                },
                {
                    id: 'elastizitaet-rente',
                    titleDe: '7.3 Elastizität und Wohlfahrtsrenten',
                    titleEn: '7.3 Elasticity and Welfare Surpluses',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)] text-center mb-3">
                        <div class="text-xl font-mono text-[var(--accent-violet)]">ε = (% ΔQ<sub>D</sub>) / (% ΔP)</div>
                    </div>
                    <ul class="list-disc pl-5 text-sm text-[var(--text-muted)] space-y-1">
                        <li><strong>|ε| &gt; 1:</strong> elastisch – Luxusgüter</li>
                        <li><strong>|ε| &lt; 1:</strong> unelastisch – Brot, Medikamente</li>
                        <li><strong>|ε| = 1:</strong> proportional</li>
                    </ul>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Konsumentenrente (KR)</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Fläche unter Nachfragekurve, über dem Preis.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Produzentenrente (PR)</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Fläche über Angebotskurve, unter dem Preis.</p>
                        </div>
                    </div>`,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)] text-center mb-3">
                        <div class="text-xl font-mono text-[var(--accent-violet)]">ε = (% ΔQ<sub>D</sub>) / (% ΔP)</div>
                    </div>
                    <ul class="list-disc pl-5 text-sm text-[var(--text-muted)] space-y-1">
                        <li><strong>|ε| &gt; 1:</strong> elastic – luxury goods</li>
                        <li><strong>|ε| &lt; 1:</strong> inelastic – bread, medicine</li>
                        <li><strong>|ε| = 1:</strong> proportional</li>
                    </ul>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Consumer Surplus (CS)</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Area below demand, above price.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                            <h4 class="mt-0 text-[var(--link-color)]">Producer Surplus (PS)</h4>
                            <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Area above supply, below price.</p>
                        </div>
                    </div>`
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten WiSo-Themen kompakt auf einen Blick.',
            introEn: 'The most important WiSo topics compactly at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-file-contract opacity-70"></i><span>Vertragsrecht</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Vertrag = Antrag + Annahme</li>
                                <li>Unter 7: geschäftsunfähig</li>
                                <li>7–17: beschränkt geschäftsfähig</li>
                                <li>Ab 18: voll geschäftsfähig</li>
                                <li>Nichtig vs. anfechtbar</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-user-tie opacity-70"></i><span>Arbeitsrecht</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Kündigung schriftlich (§ 622 BGB)</li>
                                <li>Fristlos nur bei wichtigem Grund</li>
                                <li>KSchG: &gt;10 MA, &gt;6 Monate</li>
                                <li>JArbSchG: unter 18, max. 8h/Tag</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-heart opacity-70"></i><span>Sozialversicherung</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>KV, UV, RV, ALV, PV</li>
                                <li>UV: nur Arbeitgeber</li>
                                <li>Rest: 50/50 AG &amp; AN</li>
                                <li>Umlageverfahren</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-building opacity-70"></i><span>Rechtsformen</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Einzelunternehmen: unbeschränkt</li>
                                <li>OHG: alle Vollhafter</li>
                                <li>KG: Komplementär + Kommanditist</li>
                                <li>GmbH: ab 25.000 € Stammkapital</li>
                                <li>AG: ab 50.000 € Grundkapital</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chess-knight opacity-70"></i><span>Markttypen</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Polypol: viele/viele, P = MC</li>
                                <li>Monopol: einer/viele, MR = MC</li>
                                <li>Oligopol: wenige/viele, Spieltheorie</li>
                                <li>Monopson: viele/einer</li>
                                <li>Lerner-Index &amp; HHI</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chart-line opacity-70"></i><span>Angebot &amp; Nachfrage</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Q<sub>D</sub> = a − b·P (fallend)</li>
                                <li>Q<sub>S</sub> = c + d·P (steigend)</li>
                                <li>Gleichgewicht: Q<sub>D</sub> = Q<sub>S</sub></li>
                                <li>Elastizität ε = %ΔQ / %ΔP</li>
                                <li>KR + PR = Wohlfahrt</li>
                            </ul>
                        </div>
                    </div>`
                }
            ]
        }
    ],

    /* =============================================================
       ILLUSTRATIONS — simple CSS animations
       ============================================================= */
    illustrations: {
        titleDe: 'Visualisierungen & Grafiken',
        titleEn: 'Visualizations & Graphics',
        introDe: 'Drei einfache, animierte Grafiken zu Markttypen und Angebot/Nachfrage.',
        introEn: 'Three simple animated graphics on market structures and supply/demand.',
        animations: [

            /* ============================================================
               1) 3×3 MARKT-MATRIX — 5 s per cell, hover to inspect
               ============================================================ */
            {
                id: 'wiso-vis-matrix',
                titleDe: '3×3 Markt-Matrix',
                titleEn: '3×3 Market Matrix',
                descDe: 'Die neun Markttypen nach Stackelberg. Jede Zelle wird 5 Sekunden lang hervorgehoben und erklärt – Maus drauf halten, um sie festzuhalten.',
                descEn: 'The nine market types after Stackelberg. Each cell is highlighted and explained for 5 seconds — hover to hold it.',
                html: `
                <style>
                    .wiso-mm-layout {
                        display: grid;
                        grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
                        gap: 1rem;
                        align-items: center;
                        max-width: 820px;
                        margin: 0.5rem auto;
                    }
                    @media (max-width: 700px) {
                        .wiso-mm-layout { grid-template-columns: 1fr; gap: 0.75rem; }
                    }

                    /* ---------- 4×4 grid ---------- */
                    .wiso-mm-matrix {
                        display: grid;
                        grid-template-columns: auto repeat(3, 1fr);
                        grid-template-rows: auto repeat(3, 1fr);
                        gap: 5px;
                    }
                    .wiso-mm-corner {
                        display: flex; flex-direction: column;
                        justify-content: flex-end; align-items: flex-end;
                        text-align: right; padding: 0 0.35rem 0.1rem 0;
                        font-size: 0.52rem; font-weight: 800;
                        color: var(--text-muted); line-height: 1.25;
                        letter-spacing: 0.04em; text-transform: uppercase;
                        white-space: nowrap;
                    }
                    .wiso-mm-col, .wiso-mm-row {
                        display: flex; align-items: center; justify-content: center;
                        font-size: 0.58rem; font-weight: 800;
                        text-transform: uppercase; letter-spacing: 0.07em;
                        color: var(--text-muted);
                    }
                    .wiso-mm-row { justify-content: flex-end; padding-right: 0.35rem; }

                    /* ---------- cells ---------- */
                    .wiso-mm-cell {
                        position: relative;
                        aspect-ratio: 1.3 / 1;
                        display: flex; align-items: center; justify-content: center;
                        text-align: center; padding: 0.3rem;
                        border-radius: 0.5rem;
                        border: 1.5px solid var(--border-color);
                        background: var(--code-bg);
                        color: var(--text-color);
                        font-size: 0.66rem; font-weight: 700;
                        line-height: 1.15; overflow: hidden;
                        cursor: pointer;
                        transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
                        /* --- pure-CSS fallback: 5 s per cell --- */
                        animation: wiso-mm-cell-pulse 45s ease-in-out infinite;
                        animation-delay: calc(var(--wiso-mm-i) * 5s);
                        will-change: transform, border-color, box-shadow;
                    }
                    .wiso-mm-cell::before {
                        content: ''; position: absolute; inset: 0;
                        background: var(--wiso-mm-c, transparent);
                        opacity: 0;
                        transition: opacity 0.35s ease;
                        animation: wiso-mm-fill 45s ease-in-out infinite;
                        animation-delay: calc(var(--wiso-mm-i) * 5s);
                        pointer-events: none;
                    }
                    .wiso-mm-cell > span { position: relative; z-index: 1; }

                    /* JS-driven: disable base keyframes, rely on .is-active */
                    .wiso-mm-layout.js-driven .wiso-mm-cell,
                    .wiso-mm-layout.js-driven .wiso-mm-cell::before,
                    .wiso-mm-layout.js-driven .wiso-mm-desc { animation: none; }

                    /* active / hovered highlight */
                    .wiso-mm-cell.is-active,
                    .wiso-mm-layout:not(.js-driven) .wiso-mm-cell:hover {
                        transform: scale(1.06);
                        border-color: var(--wiso-mm-c);
                        box-shadow: 0 0 24px -4px var(--wiso-mm-c);
                    }
                    .wiso-mm-cell.is-active::before,
                    .wiso-mm-layout:not(.js-driven) .wiso-mm-cell:hover::before { opacity: 0.22; }

                    @keyframes wiso-mm-cell-pulse {
                        0%    { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
                        1.5%  { transform: scale(1.06); border-color: var(--wiso-mm-c);    box-shadow: 0 0 24px -4px var(--wiso-mm-c); }
                        9.5%  { transform: scale(1.06); border-color: var(--wiso-mm-c);    box-shadow: 0 0 24px -4px var(--wiso-mm-c); }
                        11%   { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
                        100%  { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
                    }
                    @keyframes wiso-mm-fill {
                        0%    { opacity: 0; }
                        1.5%  { opacity: 0.22; }
                        9.5%  { opacity: 0.22; }
                        11%   { opacity: 0; }
                        100%  { opacity: 0; }
                    }

                    /* ---------- description panel ---------- */
                    .wiso-mm-side { position: relative; min-height: 240px; }
                    .wiso-mm-desc {
                        position: absolute; inset: 0;
                        display: flex; flex-direction: column;
                        justify-content: center; gap: 0.4rem;
                        padding: 0.85rem 0.95rem;
                        background: var(--code-bg);
                        border: 1px solid var(--border-color);
                        border-left: 3px solid var(--wiso-mm-dc, var(--link-color));
                        border-radius: 0.5rem;
                        font-size: 0.72rem; line-height: 1.45;
                        color: var(--text-muted);
                        opacity: 0;
                        transition: opacity 0.35s ease;
                        /* --- pure-CSS fallback --- */
                        animation: wiso-mm-desc-pulse 45s linear infinite;
                        animation-delay: calc(var(--wiso-mm-i) * 5s);
                        pointer-events: none;
                    }
                    .wiso-mm-desc.is-active { opacity: 1; }

                    .wiso-mm-desc h5 {
                        font-size: 0.86rem; font-weight: 800;
                        color: var(--wiso-mm-dc, var(--heading-color));
                        margin: 0; letter-spacing: 0.01em;
                    }
                    .wiso-mm-desc .tag {
                        font-size: 0.56rem; font-weight: 700;
                        letter-spacing: 0.09em; text-transform: uppercase;
                        color: var(--text-muted); opacity: 0.7;
                    }
                    .wiso-mm-desc p { margin: 0; font-size: 0.72rem; line-height: 1.45; }
                    .wiso-mm-desc .ex {
                        color: var(--text-color); opacity: 0.75;
                        font-style: italic; font-size: 0.67rem;
                    }

                    @keyframes wiso-mm-desc-pulse {
                        0%    { opacity: 0; }
                        1.5%  { opacity: 1; }
                        9.5%  { opacity: 1; }
                        11%   { opacity: 0; }
                        100%  { opacity: 0; }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .wiso-mm-cell, .wiso-mm-cell::before, .wiso-mm-desc {
                            animation: none !important;
                        }
                        .wiso-mm-desc:not(:first-child) { display: none; }
                        .wiso-mm-desc:first-child { opacity: 1; }
                    }
                    @media (max-width: 480px) {
                        .wiso-mm-cell { font-size: 0.58rem; padding: 0.2rem; }
                        .wiso-mm-col, .wiso-mm-row { font-size: 0.52rem; }
                    }
                </style>

                <div class="wiso-mm-layout">

                    <!-- ============ LEFT: 4×4 grid ============ -->
                    <div class="wiso-mm-matrix">

                        <div class="wiso-mm-corner">
                            <span><span data-lang-de>Anbieter ↓</span><span data-lang-en style="display:none;">Sellers ↓</span></span>
                            <span><span data-lang-de>Nachfrager →</span><span data-lang-en style="display:none;">Buyers →</span></span>
                        </div>

                        <div class="wiso-mm-col"><span data-lang-de>Viele</span><span data-lang-en style="display:none;">Many</span></div>
                        <div class="wiso-mm-col"><span data-lang-de>Wenige</span><span data-lang-en style="display:none;">Few</span></div>
                        <div class="wiso-mm-col"><span data-lang-de>Einer</span><span data-lang-en style="display:none;">One</span></div>

                        <div class="wiso-mm-row"><span data-lang-de>Viele</span><span data-lang-en style="display:none;">Many</span></div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#5fd39a; --wiso-mm-i:0;">
                            <span data-lang-de>Polypol</span><span data-lang-en style="display:none;">Perfect Comp.</span>
                        </div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#5b8def; --wiso-mm-i:1;">
                            <span data-lang-de>Nachfrage-Oligopol</span><span data-lang-en style="display:none;">Oligopsony</span>
                        </div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#c58af9; --wiso-mm-i:2;">
                            <span data-lang-de>Monopson</span><span data-lang-en style="display:none;">Monopsony</span>
                        </div>

                        <div class="wiso-mm-row"><span data-lang-de>Wenige</span><span data-lang-en style="display:none;">Few</span></div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#5b8def; --wiso-mm-i:3;">
                            <span data-lang-de>Oligopol</span><span data-lang-en style="display:none;">Oligopoly</span>
                        </div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#e0b64a; --wiso-mm-i:4;">
                            <span data-lang-de>Bilaterales Oligopol</span><span data-lang-en style="display:none;">Bilateral Oligop.</span>
                        </div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#f0a35e; --wiso-mm-i:5;">
                            <span data-lang-de>Beschr. Monopson</span><span data-lang-en style="display:none;">Restr. Monopsony</span>
                        </div>

                        <div class="wiso-mm-row"><span data-lang-de>Einer</span><span data-lang-en style="display:none;">One</span></div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#e0685a; --wiso-mm-i:6;">
                            <span data-lang-de>Monopol</span><span data-lang-en style="display:none;">Monopoly</span>
                        </div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#e0685a; --wiso-mm-i:7;">
                            <span data-lang-de>Beschr. Monopol</span><span data-lang-en style="display:none;">Restr. Monopoly</span>
                        </div>
                        <div class="wiso-mm-cell" style="--wiso-mm-c:#e0685a; --wiso-mm-i:8;">
                            <span data-lang-de>Bilaterales Monopol</span><span data-lang-en style="display:none;">Bilateral Monop.</span>
                        </div>

                    </div>

                    <!-- ============ RIGHT: 9 descriptions ============ -->
                    <div class="wiso-mm-side">

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#5fd39a; --wiso-mm-i:0;">
                            <span class="tag">01 · Markt</span>
                            <h5><span data-lang-de>Polypol</span><span data-lang-en style="display:none;">Perfect Competition</span></h5>
                            <p>
                                <span data-lang-de>Viele Anbieter und viele Nachfrager. Keiner kann den Preis allein bestimmen – er bildet sich aus dem Zusammenspiel.</span>
                                <span data-lang-en style="display:none;">Many sellers and many buyers. No single player can set the price — it emerges from the interaction.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Aktienmarkt, Weizenmarkt</span><span data-lang-en style="display:none;">Example: stock market, wheat market</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#5b8def; --wiso-mm-i:1;">
                            <span class="tag">02 · Nachfrage</span>
                            <h5><span data-lang-de>Nachfrage-Oligopol (Oligopson)</span><span data-lang-en style="display:none;">Oligopsony</span></h5>
                            <p>
                                <span data-lang-de>Viele Anbieter, aber nur wenige Nachfrager. Die wenigen Käufer haben die Macht und können die Preise drücken.</span>
                                <span data-lang-en style="display:none;">Many sellers but only a few buyers. The few buyers hold the power and can push prices down.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Milchbauern ↔ Supermarktketten</span><span data-lang-en style="display:none;">Example: dairy farmers ↔ supermarket chains</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#c58af9; --wiso-mm-i:2;">
                            <span class="tag">03 · Nachfrage</span>
                            <h5><span data-lang-de>Monopson</span><span data-lang-en style="display:none;">Monopsony</span></h5>
                            <p>
                                <span data-lang-de>Viele Anbieter, aber nur <em>ein einziger</em> Nachfrager. Der eine Käufer diktiert den Preis.</span>
                                <span data-lang-en style="display:none;">Many sellers but only <em>one single</em> buyer. The sole buyer dictates the price.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Staat als einziger Rüstungskäufer</span><span data-lang-en style="display:none;">Example: state as sole arms buyer</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#5b8def; --wiso-mm-i:3;">
                            <span class="tag">04 · Angebot</span>
                            <h5><span data-lang-de>Oligopol</span><span data-lang-en style="display:none;">Oligopoly</span></h5>
                            <p>
                                <span data-lang-de>Wenige Anbieter, viele Nachfrager. Die Anbieter beobachten sich gegenseitig und reagieren aufeinander.</span>
                                <span data-lang-en style="display:none;">Few sellers, many buyers. The sellers watch each other and react to each other's moves.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Mobilfunk, Tankstellen</span><span data-lang-en style="display:none;">Example: telecoms, gas stations</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0b64a; --wiso-mm-i:4;">
                            <span class="tag">05 · Mitte</span>
                            <h5><span data-lang-de>Bilaterales Oligopol</span><span data-lang-en style="display:none;">Bilateral Oligopoly</span></h5>
                            <p>
                                <span data-lang-de>Wenige Anbieter, wenige Nachfrager. Beide Seiten sind stark und verhandeln auf Augenhöhe.</span>
                                <span data-lang-en style="display:none;">Few sellers, few buyers. Both sides are strong and negotiate on equal footing.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Flugzeugbauer ↔ Fluglinien</span><span data-lang-en style="display:none;">Example: aircraft makers ↔ airlines</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#f0a35e; --wiso-mm-i:5;">
                            <span class="tag">06 · Nachfrage</span>
                            <h5><span data-lang-de>Beschränktes Monopson</span><span data-lang-en style="display:none;">Restricted Monopsony</span></h5>
                            <p>
                                <span data-lang-de>Wenige Anbieter, ein Nachfrager. Der Käufer hat viel Macht – aber die wenigen Anbieter haben auch etwas Einfluss.</span>
                                <span data-lang-en style="display:none;">Few sellers, one buyer. The buyer has a lot of power — but the few sellers have some influence too.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Staat kauft Polizeiautos</span><span data-lang-en style="display:none;">Example: state buys police cars</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0685a; --wiso-mm-i:6;">
                            <span class="tag">07 · Angebot</span>
                            <h5><span data-lang-de>Monopol</span><span data-lang-en style="display:none;">Monopoly</span></h5>
                            <p>
                                <span data-lang-de>Ein einziger Anbieter, viele Nachfrager. Der Monopolist kann Preis oder Menge allein bestimmen – Kunden haben keine Alternative.</span>
                                <span data-lang-en style="display:none;">One single seller, many buyers. The monopolist can set price or quantity alone — customers have no alternative.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Bahnnetz, Patentinhaber</span><span data-lang-en style="display:none;">Example: rail network, patent holder</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0685a; --wiso-mm-i:7;">
                            <span class="tag">08 · Angebot</span>
                            <h5><span data-lang-de>Beschränktes Monopol</span><span data-lang-en style="display:none;">Restricted Monopoly</span></h5>
                            <p>
                                <span data-lang-de>Ein Anbieter, wenige Nachfrager. Der Anbieter hat Macht, ist aber auf die wenigen großen Kunden angewiesen.</span>
                                <span data-lang-en style="display:none;">One seller, few buyers. The seller has power but relies on the few large clients.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Spezialscanner ↔ 4 Kliniken</span><span data-lang-en style="display:none;">Example: specialised scanner ↔ 4 clinics</span></span>
                        </div>

                        <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0685a; --wiso-mm-i:8;">
                            <span class="tag">09 · Mitte</span>
                            <h5><span data-lang-de>Bilaterales Monopol</span><span data-lang-en style="display:none;">Bilateral Monopoly</span></h5>
                            <p>
                                <span data-lang-de>Ein Anbieter, ein Nachfrager. Ein reines Kräftemessen – beide Seiten sind absolut voneinander abhängig.</span>
                                <span data-lang-en style="display:none;">One seller, one buyer. A pure test of strength — both sides are absolutely mutually dependent.</span>
                            </p>
                            <span class="ex"><span data-lang-de>Beispiel: Gewerkschaft ↔ Arbeitgeberverband</span><span data-lang-en style="display:none;">Example: union ↔ employers' association</span></span>
                        </div>

                    </div>
                </div>
                `
            },

            /* ============================================================
               2) ANGEBOT & NACHFRAGE — persistent graph; curves glide.
                 8 scenarios incl. Festpreis (fixed price).
                 Full word labels on curves + spelled-out axes.
               ============================================================ */
            {
                id: 'wiso-vis-supply-demand',
                titleDe: 'Angebot & Nachfrage',
                titleEn: 'Supply & Demand',
                descDe: 'Acht typische Marktsituationen – Kurven gleiten zu neuen Positionen, inkl. Festpreis mit Über-/Unterangebot.',
                descEn: 'Eight typical market situations — curves glide to new positions, incl. fixed price with surplus/shortage.',
                html: `
                <style>
                    .wiso-sd-layout {
                        display: grid;
                        grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
                        gap: 1rem;
                        align-items: center;
                        max-width: 780px;
                        margin: 0.5rem auto;
                    }
                    @media (max-width: 700px) {
                        .wiso-sd-layout { grid-template-columns: 1fr; gap: 0.75rem; }
                    }
                    .wiso-sd-graph {
                        background: var(--code-bg);
                        border: 1px solid var(--border-color);
                        border-radius: 0.6rem;
                        padding: 0.5rem;
                        box-shadow: var(--control-shadow);
                    }
                    .wiso-sd-svg { display: block; width: 100%; height: auto; }

                    .wiso-sd-svg .ax    { stroke: var(--text-muted); stroke-width: 1.5; stroke-linecap: round; }
                    .wiso-sd-svg .arw   { fill: var(--text-muted); }
                    .wiso-sd-svg .grid  { stroke: var(--border-color); stroke-width: 0.5; stroke-dasharray: 2 3; opacity: 0.5; }
                    .wiso-sd-svg .supply{ stroke: #5b8def; stroke-width: 3; stroke-linecap: round; }
                    .wiso-sd-svg .demand{ stroke: #e0b64a; stroke-width: 3; stroke-linecap: round; }
                    .wiso-sd-svg .guide { fill: none; stroke: #10b981; stroke-width: 1.2; stroke-dasharray: 3 3; opacity: 0.55; }
                    .wiso-sd-svg .eq    { fill: #10b981; }
                    .wiso-sd-svg .eqhalo{ fill: none; stroke: #10b981; stroke-width: 1.5; opacity: 0.5; }
                    .wiso-sd-svg .festp { stroke: #c58af9; stroke-width: 2.5; stroke-dasharray: 6 4; stroke-linecap: round; }
                    .wiso-sd-svg .zone  { fill: rgba(224,104,90,0.22); stroke: #e0685a; stroke-width: 1; stroke-dasharray: 3 2; }
                    .wiso-sd-svg .xdot  { fill: #c58af9; stroke: #0e0e0e; stroke-width: 1; }
                    .wiso-sd-svg .lbl   { font: 700 9px Inter, sans-serif; }
                    .wiso-sd-svg .lblS  { fill: #5b8def; font-weight: 800; font-size: 10px; }
                    .wiso-sd-svg .lblD  { fill: #e0b64a; font-weight: 800; font-size: 10px; }
                    .wiso-sd-svg .lblF  { fill: #c58af9; font-weight: 800; }
                    .wiso-sd-svg .lblZ  { fill: #e0685a; font-weight: 800; }
                    .wiso-sd-svg .lblAx { fill: var(--text-muted); font-weight: 700; font-size: 10px; }

                    /* ---- description panel (right side) ---- */
                    .wiso-sd-side {
                        position: relative;
                        min-height: 240px;
                    }
                    .wiso-sd-desc {
                        position: absolute;
                        inset: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 0.4rem;
                        padding: 0.8rem 0.9rem;
                        background: var(--code-bg);
                        border: 1px solid var(--border-color);
                        border-left: 3px solid var(--wiso-c, var(--link-color));
                        border-radius: 0.5rem;
                        font-size: 0.72rem;
                        line-height: 1.45;
                        color: var(--text-muted);
                        opacity: 0;
                        animation: wiso-sd-show 56s linear infinite;
                        will-change: opacity;
                    }
                    .wiso-sd-desc h5 {
                        font-size: 0.82rem;
                        font-weight: 800;
                        color: var(--wiso-c, var(--heading-color));
                        margin: 0;
                        letter-spacing: 0.01em;
                    }
                    .wiso-sd-desc .wiso-sd-tag {
                        font-size: 0.58rem;
                        font-weight: 700;
                        letter-spacing: 0.08em;
                        text-transform: uppercase;
                        color: var(--text-muted);
                        opacity: 0.7;
                        margin-bottom: 0.1rem;
                    }
                    .wiso-sd-desc.s1 { animation-delay: 0s;  --wiso-c: #10b981; }
                    .wiso-sd-desc.s2 { animation-delay: 7s;  --wiso-c: #e0b64a; }
                    .wiso-sd-desc.s3 { animation-delay: 14s; --wiso-c: #a855f7; }
                    .wiso-sd-desc.s4 { animation-delay: 21s; --wiso-c: #5b8def; }
                    .wiso-sd-desc.s5 { animation-delay: 28s; --wiso-c: #e0685a; }
                    .wiso-sd-desc.s6 { animation-delay: 35s; --wiso-c: #c58af9; }
                    .wiso-sd-desc.s7 { animation-delay: 42s; --wiso-c: #c58af9; }
                    .wiso-sd-desc.s8 { animation-delay: 49s; --wiso-c: #14b8a6; }

                    @keyframes wiso-sd-show {
                        0%    { opacity: 0; }
                        1%    { opacity: 1; }
                        12%   { opacity: 1; }
                        13%   { opacity: 0; }
                        100%  { opacity: 0; }
                    }
                    /* JS-driven sync: descriptions follow the SVG's SMIL clock */
                        .wiso-sd-layout.js-driven .wiso-sd-desc {
                            animation: none;
                            opacity: 0;
                            transition: opacity 0.4s ease;
                        }
                        .wiso-sd-layout.js-driven .wiso-sd-desc.is-active {
                            opacity: 1;
                        }
                    @media (prefers-reduced-motion: reduce) {
                        .wiso-sd-desc { animation: none !important; opacity: 1; }
                        .wiso-sd-desc:not(.s1) { display: none; }
                    }
                </style>

                <div class="wiso-sd-layout">

                    <!-- ==================== GRAPH ==================== -->
                    <div class="wiso-sd-graph">
                    <svg class="wiso-sd-svg" viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

                        <!-- grid -->
                        <line class="grid" x1="100" y1="30" x2="100" y2="180"/>
                        <line class="grid" x1="170" y1="30" x2="170" y2="180"/>
                        <line class="grid" x1="240" y1="30" x2="240" y2="180"/>
                        <line class="grid" x1="40" y1="67"  x2="300" y2="67"/>
                        <line class="grid" x1="40" y1="105" x2="300" y2="105"/>
                        <line class="grid" x1="40" y1="142" x2="300" y2="142"/>

                        <!-- axes -->
                        <line class="ax" x1="40" y1="30" x2="40" y2="180"/>
                        <line class="ax" x1="40" y1="180" x2="300" y2="180"/>
                        <polygon class="arw" points="40,25 37,33 43,33"/>
                        <polygon class="arw" points="305,180 297,177 297,183"/>

                        <!-- guide (L-shape to equilibrium) -->
                        <path class="guide" d="M 40,105 L 170,105 L 170,180" fill="none">
                            <animate attributeName="d" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,92 L 194,92 L 194,180;M 40,92 L 194,92 L 194,180;M 40,110 L 160,110 L 160,180;M 40,110 L 160,110 L 160,180;M 40,119 L 195,119 L 195,180;M 40,119 L 195,119 L 195,180;M 40,98 L 157,98 L 157,180;M 40,98 L 157,98 L 157,180;M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,100 L 180,100 L 180,180;M 40,100 L 180,100 L 180,180;M 40,105 L 170,105 L 170,180"/>
                        </path>

                        <!-- surplus/shortage zone (only s6+s7 = Festpreis) -->
                        <rect class="zone" x="105" y="65" width="130" height="10" rx="3" opacity="0">
                            <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="65;65;65;65;65;65;65;65;65;65;65;65;135;135;65;65;65"/>
                            <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
                        </rect>

                        <!-- zone labels: "Überschuss" (s6) / "Mangel" (s7) -->
                        <text class="lbl lblZ" x="170" y="60" text-anchor="middle" opacity="0">
                            <tspan data-lang-de>Überschuss</tspan><tspan data-lang-en style="display:none;">Surplus</tspan>
                            <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="0;0;0;0;0;0;0;0;0;0;1;1;0;0;0;0;0"/>
                        </text>
                        <text class="lbl lblZ" x="170" y="158" text-anchor="middle" opacity="0">
                            <tspan data-lang-de>Mangel</tspan><tspan data-lang-en style="display:none;">Shortage</tspan>
                            <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="0;0;0;0;0;0;0;0;0;0;0;0;1;1;0;0;0"/>
                        </text>

                        <!-- ================= supply line ================= -->
                        <line class="supply" x1="50" y1="170" x2="290" y2="40">
                            <animate attributeName="x1" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="50;50;50;50;50;50;110;110;50;50;50;50;50;50;50;50;50"/>
                            <animate attributeName="y1" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="170;170;170;170;170;170;170;170;170;170;170;170;170;170;170;170;170"/>
                            <animate attributeName="x2" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="290;290;290;290;290;290;290;290;250;250;290;290;290;290;290;290;290"/>
                            <animate attributeName="y2" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="40;40;40;40;40;40;62;62;35;35;40;40;40;40;40;40;40"/>
                        </line>

                        <!-- ================= demand line ================= -->
                        <line class="demand" x1="50" y1="40" x2="290" y2="170">
                            <animate attributeName="x1" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="50;50;50;50;50;50;50;50;50;50;50;50;50;50;150;150;50"/>
                            <animate attributeName="y1" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="40;40;20;20;55;55;40;40;40;40;40;40;40;40;40;40;40"/>
                            <animate attributeName="x2" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="290;290;290;290;290;290;290;290;290;290;290;290;290;290;220;220;290"/>
                            <animate attributeName="y2" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="170;170;140;140;175;175;170;170;170;170;170;170;170;170;180;180;170"/>
                        </line>

                        <!-- ============ Festpreis line (only s6/s7) ============ -->
                        <line class="festp" x1="50" y1="-10" x2="290" y2="-10" opacity="0">
                            <animate attributeName="y1" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="-10;-10;-10;-10;-10;-10;-10;-10;-10;-10;70;70;140;140;-10;-10;-10"/>
                            <animate attributeName="y2" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="-10;-10;-10;-10;-10;-10;-10;-10;-10;-10;70;70;140;140;-10;-10;-10"/>
                            <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
                        </line>

                        <!-- Festpreis intersection dots -->
                        <circle class="xdot" cx="105" cy="70" r="3.5" opacity="0">
                            <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="105;105;105;105;105;105;105;105;105;105;105;105;234;234;105;105;105"/>
                            <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="70;70;70;70;70;70;70;70;70;70;70;70;140;140;70;70;70"/>
                            <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
                        </circle>
                        <circle class="xdot" cx="234" cy="70" r="3.5" opacity="0">
                            <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="234;234;234;234;234;234;234;234;234;234;234;234;105;105;234;234;234"/>
                            <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="70;70;70;70;70;70;70;70;70;70;70;70;140;140;70;70;70"/>
                            <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
                        </circle>

                        <!-- Festpreis label on y-axis -->
                        <text class="lbl lblF" x="38" y="70" text-anchor="end" opacity="0">
                            <tspan data-lang-de>Pfix</tspan><tspan data-lang-en style="display:none;">Pfix</tspan>
                            <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="70;70;70;70;70;70;70;70;70;70;70;70;140;140;70;70;70"/>
                            <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
                        </text>

                        <!-- equilibrium halo + dot -->
                        <circle class="eqhalo" cx="170" cy="105" r="6">
                            <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="170;170;194;194;160;160;195;195;157;157;170;170;170;170;180;180;170"/>
                            <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="105;105;92;92;110;110;119;119;98;98;105;105;105;105;100;100;105"/>
                            <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.55;0;0.55" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle class="eq" cx="170" cy="105" r="6">
                            <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="170;170;194;194;160;160;195;195;157;157;170;170;170;170;180;180;170"/>
                            <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="105;105;92;92;110;110;119;119;98;98;105;105;105;105;100;100;105"/>
                        </circle>

                        <!-- ============ Curve labels (full words, glide with curves) ============ -->
                        <text class="lbl lblS" x="288" y="34" text-anchor="end">
                            <tspan data-lang-de>Angebot</tspan><tspan data-lang-en style="display:none;">Supply</tspan>
                            <animate attributeName="x" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="288;288;288;288;288;288;288;288;248;248;288;288;288;288;288;288;288"/>
                            <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="34;34;34;34;34;34;56;56;29;29;34;34;34;34;34;34;34"/>
                        </text>
                        <text class="lbl lblD" x="288" y="178" text-anchor="end">
                            <tspan data-lang-de>Nachfrage</tspan><tspan data-lang-en style="display:none;">Demand</tspan>
                            <animate attributeName="x" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="288;288;288;288;288;288;288;288;288;288;288;288;288;288;218;218;288"/>
                            <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                                keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                                values="178;178;148;148;183;183;178;178;178;178;178;178;178;178;188;188;178"/>
                        </text>

                        <!-- ============ Axis labels (spelled out) ============ -->
                        <text class="lbl lblAx" x="18" y="105" text-anchor="middle" transform="rotate(-90 18 105)">
                            <tspan data-lang-de>Preis (P) →</tspan><tspan data-lang-en style="display:none;">Price (P) →</tspan>
                        </text>
                        <text class="lbl lblAx" x="170" y="200" text-anchor="middle">
                            <tspan data-lang-de>Menge (Q) →</tspan><tspan data-lang-en style="display:none;">Quantity (Q) →</tspan>
                        </text>
                    </svg>
                    </div>

                    <!-- ==================== SIDE / DESCRIPTION ==================== -->
                    <div class="wiso-sd-side">

                        <div class="wiso-sd-desc s1">
                            <span class="wiso-sd-tag">01 · Markt</span>
                            <h5><span data-lang-de>Gleichgewicht</span><span data-lang-en style="display:none;">Equilibrium</span></h5>
                            <p><span data-lang-de>Angebot und Nachfrage sind im Einklang. Der Marktpreis stellt sich genau in der Mitte ein – niemand kann ihn allein diktieren.</span><span data-lang-en style="display:none;">Supply and demand are in balance. Price settles in the middle — nobody can dictate it.</span></p>
                        </div>

                        <div class="wiso-sd-desc s2">
                            <span class="wiso-sd-tag">02 · Nachfrage</span>
                            <h5><span data-lang-de>Nachfrage-Boom</span><span data-lang-en style="display:none;">Demand Boom</span></h5>
                            <p><span data-lang-de><strong>Alle wollen kaufen.</strong> Die Nachfragekurve rückt nach rechts → Preis <em>und</em> Menge steigen. <em>Beispiel: Konzerttickets, Weihnachtsgeschenke.</em></span><span data-lang-en style="display:none;"><strong>Everyone wants to buy.</strong> Demand shifts right → price <em>and</em> quantity rise. <em>Example: concert tickets, holiday shopping.</em></span></p>
                        </div>

                        <div class="wiso-sd-desc s3">
                            <span class="wiso-sd-tag">03 · Nachfrage</span>
                            <h5><span data-lang-de>Nachfrage-Rückgang</span><span data-lang-en style="display:none;">Demand Crash</span></h5>
                            <p><span data-lang-de><strong>Das Interesse sinkt.</strong> Die Nachfragekurve rückt nach links → Preis <em>und</em> Menge fallen. <em>Beispiel: Produkte, die aus der Mode kommen.</em></span><span data-lang-en style="display:none;"><strong>Interest drops.</strong> Demand shifts left → price <em>and</em> quantity fall. <em>Example: products that went out of fashion.</em></span></p>
                        </div>

                        <div class="wiso-sd-desc s4">
                            <span class="wiso-sd-tag">04 · Angebot</span>
                            <h5><span data-lang-de>Angebots-Überfluss</span><span data-lang-en style="display:none;">Supply Surplus</span></h5>
                            <p><span data-lang-de><strong>Zu viel produziert.</strong> Die Angebotskurve rückt nach rechts → Preis fällt, Menge steigt. <em>Beispiel: Saisonschlussverkauf.</em></span><span data-lang-en style="display:none;"><strong>Overproduction.</strong> Supply shifts right → price falls, quantity rises. <em>Example: end-of-season sales.</em></span></p>
                        </div>

                        <div class="wiso-sd-desc s5">
                            <span class="wiso-sd-tag">05 · Angebot</span>
                            <h5><span data-lang-de>Angebots-Engpass</span><span data-lang-en style="display:none;">Supply Shortage</span></h5>
                            <p><span data-lang-de><strong>Rohstoffe oder Bauteile fehlen.</strong> Die Angebotskurve rückt nach links → Preis steigt, Menge sinkt. <em>Beispiel: Chip-Krise, Ernteausfall.</em></span><span data-lang-en style="display:none;"><strong>Inputs are missing.</strong> Supply shifts left → price rises, quantity falls. <em>Example: chip shortage, crop failure.</em></span></p>
                        </div>

                        <div class="wiso-sd-desc s6">
                            <span class="wiso-sd-tag">06 · Staat</span>
                            <h5><span data-lang-de>Festpreis zu hoch</span><span data-lang-en style="display:none;">Fixed Price too High</span></h5>
                            <p><span data-lang-de>Der Staat setzt einen <strong>Mindestpreis über dem Gleichgewicht</strong> (z.B. Mindestlohn). Anbieter wollen viel produzieren – aber Käufer bleiben aus. Es entsteht ein <strong class="text-red-400">Überschuss</strong> (lila Linie = Festpreis).</span><span data-lang-en style="display:none;">The state sets a <strong>minimum price above equilibrium</strong> (e.g. minimum wage). Sellers want to produce a lot — but buyers stay away. A <strong class="text-red-400">surplus</strong> appears (purple line = fixed price).</span></p>
                        </div>

                        <div class="wiso-sd-desc s7">
                            <span class="wiso-sd-tag">07 · Staat</span>
                            <h5><span data-lang-de>Festpreis zu niedrig</span><span data-lang-en style="display:none;">Fixed Price too Low</span></h5>
                            <p><span data-lang-de>Der Staat setzt einen <strong>Höchstpreis unter dem Gleichgewicht</strong> (z.B. Mietpreisbremse). Käufer wollen viel kaufen – aber Anbieter liefern zu wenig. Es entsteht ein <strong class="text-red-400">Mangel</strong>.</span><span data-lang-en style="display:none;">The state sets a <strong>maximum price below equilibrium</strong> (e.g. rent control). Buyers want a lot — but sellers supply too little. A <strong class="text-red-400">shortage</strong> appears.</span></p>
                        </div>

                        <div class="wiso-sd-desc s8">
                            <span class="wiso-sd-tag">08 · Sonderfall</span>
                            <h5><span data-lang-de>Unelastische Nachfrage</span><span data-lang-en style="display:none;">Inelastic Demand</span></h5>
                            <p><span data-lang-de><strong>Beispiel: Medikamente.</strong> Die Nachfragekurve ist steil – Käufer reagieren kaum auf den Preis. Sie zahlen fast jeden Preis.</span><span data-lang-en style="display:none;"><strong>Example: medicines.</strong> The demand curve is steep — buyers barely react to price. They will pay almost any price.</span></p>
                        </div>

                    </div>
                </div>
                `
            },

            /* ============================================================
               3) MARKTMACHT-SKALA
               ============================================================ */
            {
                id: 'wiso-vis-market-power',
                titleDe: 'Marktmacht-Skala',
                titleEn: 'Market Power Ladder',
                descDe: 'Von Polypol (viele kleine Firmen) über Oligopol (wenige große) bis Monopol (eine einzige).',
                descEn: 'From polypoly (many small firms) through oligopoly (a few big) to monopoly (one single firm).',
                html: `
                <style>
                    .wiso-mp-wrap {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 0.55rem;
                        max-width: 560px;
                        margin: 0.5rem auto;
                    }
                    .wiso-mp-card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.9rem 0.4rem 0.7rem;
                        border-radius: 0.6rem;
                        border: 1.5px solid var(--border-color);
                        background: var(--code-bg);
                        animation: wiso-mp-glow 7.2s ease-in-out infinite;
                        will-change: transform, border-color, box-shadow;
                    }
                    .wiso-mp-card:nth-child(1) { animation-delay: 0s;   --wiso-mp-c: #5fd39a; }
                    .wiso-mp-card:nth-child(2) { animation-delay: 2.4s; --wiso-mp-c: #e0b64a; }
                    .wiso-mp-card:nth-child(3) { animation-delay: 4.8s; --wiso-mp-c: #e0685a; }
                    @keyframes wiso-mp-glow {
                        0%, 100% { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
                        6%, 18%  { transform: scale(1.04); border-color: var(--wiso-mp-c);   box-shadow: 0 0 24px -6px var(--wiso-mp-c); }
                        30%      { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
                    }
                    .wiso-mp-dots {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 4px;
                        justify-content: center;
                        align-items: center;
                        min-height: 62px;
                        max-width: 88px;
                    }
                    .wiso-mp-dot {
                        background: var(--wiso-mp-c);
                        border-radius: 50%;
                        box-shadow: 0 0 6px -1px var(--wiso-mp-c);
                    }
                    .wiso-mp-card:nth-child(1) .wiso-mp-dot { width: 8px;  height: 8px; }
                    .wiso-mp-card:nth-child(2) .wiso-mp-dot { width: 18px; height: 18px; }
                    .wiso-mp-card:nth-child(3) .wiso-mp-dot { width: 52px; height: 52px; }
                    .wiso-mp-name {
                        font-size: 0.82rem;
                        font-weight: 800;
                        color: var(--wiso-mp-c);
                    }
                    .wiso-mp-sub {
                        font-size: 0.62rem;
                        font-weight: 600;
                        color: var(--text-muted);
                        text-align: center;
                        line-height: 1.25;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .wiso-mp-card { animation: none !important; }
                    }
                </style>
                <div class="wiso-mp-wrap">
                    <div class="wiso-mp-card">
                        <div class="wiso-mp-dots">
                            <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
                            <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
                            <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
                        </div>
                        <div class="wiso-mp-name">Polypol</div>
                        <div class="wiso-mp-sub">
                            <span data-lang-de>Viele kleine Firmen.<br>Keiner bestimmt den Preis.</span>
                            <span data-lang-en style="display:none;">Many small firms.<br>None sets the price.</span>
                        </div>
                    </div>
                    <div class="wiso-mp-card">
                        <div class="wiso-mp-dots">
                            <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
                        </div>
                        <div class="wiso-mp-name">Oligopol</div>
                        <div class="wiso-mp-sub">
                            <span data-lang-de>Wenige große Firmen.<br>Sie beeinflussen den Preis.</span>
                            <span data-lang-en style="display:none;">A few big firms.<br>They influence the price.</span>
                        </div>
                    </div>
                    <div class="wiso-mp-card">
                        <div class="wiso-mp-dots">
                            <div class="wiso-mp-dot"></div>
                        </div>
                        <div class="wiso-mp-name">Monopol</div>
                        <div class="wiso-mp-sub">
                            <span data-lang-de>Eine einzige Firma.<br>Sie bestimmt den Preis allein.</span>
                            <span data-lang-en style="display:none;">One single firm.<br>It sets the price alone.</span>
                        </div>
                    </div>
                </div>
                `
            }
        ]
    },

    links: {
        titleDe: 'Weiterführende Quellen',
        titleEn: 'Further Resources',
        items: [
            { icon: 'fa-book',         href: 'https://de.wikipedia.org/wiki/B%C3%BCrgerliches_Gesetzbuch', target: '_blank', labelDe: 'BGB (Wikipedia)',                 labelEn: 'BGB (Wikipedia)' },
            { icon: 'fa-gavel',        href: 'https://www.gesetze-im-internet.de/bgb/',                     target: '_blank', labelDe: 'BGB im Internet',                 labelEn: 'BGB online' },
            { icon: 'fa-user-shield',  href: 'https://www.gesetze-im-internet.de/kschg/',                    target: '_blank', labelDe: 'Kündigungsschutzgesetz (KSchG)',  labelEn: 'Dismissal Protection Act' },
            { icon: 'fa-child',        href: 'https://www.gesetze-im-internet.de/jarbschg/',                 target: '_blank', labelDe: 'Jugendarbeitsschutzgesetz',       labelEn: 'Youth Employment Act' },
            { icon: 'fa-people-group', href: 'https://www.gesetze-im-internet.de/betrvg/',                   target: '_blank', labelDe: 'Betriebsverfassungsgesetz (BetrVG)', labelEn: 'Works Constitution Act' },
            { icon: 'fa-chess-knight', href: 'https://de.wikipedia.org/wiki/Marktform',                      target: '_blank', labelDe: 'Marktformen (Wikipedia)',         labelEn: 'Market structures (Wikipedia)' },
            { icon: 'fa-chart-line',   href: 'https://de.wikipedia.org/wiki/Angebot_und_Nachfrage',          target: '_blank', labelDe: 'Angebot & Nachfrage (Wikipedia)', labelEn: 'Supply & demand (Wikipedia)' }
        ]
    },

    footer: {
        textDe: 'WiSo-Referenz · v3.4 · Dual Lang',
        textEn: 'WiSo Cheatsheet · v3.4 · Dual Lang'
    }
});