// resources/topics/topic_wiso.js
// WiSo topic — v3.5
// Animations: 3×3 matrix (5 s per cell + hover to inspect), supply/demand
// scenarios (curves glide, Festpreis incl.), market power ladder.
// Section 6: Handelsrecht & Unternehmensgründung (interactive, inline).

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
   WISO HANDELSRECHT CONTROLLER
   ------------------------------------------------------------------
   Drives the Handelsrecht section:
     - multiple-choice tasks (data-wiso-question) → green/red, reset 3s
     - reveal solutions (data-wiso-target)
     - textareas with localStorage (data-wiso-save)
     - firmenbaukasten (wisoFirmBase / wisoFirmForm / wisoFirmOutput)
     - final quiz (wisoHrQuiz)
   Robust against re-renders via periodic re-scan.
   ================================================================== */
(function () {
    'use strict';
    var KEY = 'wiso-handelsrecht-v1';
    var state = {};
    try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { state = {}; }
    state.answers = state.answers || {};
    state.text = state.text || {};

    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    }

    var QA = {
        hrHeinzGewerbe: ['b', 'Richtig. Gewerbeeigenschaft und Registereintragung sind getrennt zu prüfen. Die Markttätigkeit kann vor der Eintragung beginnen.'],
        hrK1: ['ist', 'Richtig. Umfang und Organisationskomplexität sprechen klar für ein Handelsgewerbe nach § 1 HGB.'],
        hrK2: ['kann', 'Richtig. Beim Kleingewerbe begründet die freiwillige Eintragung den Status nach § 2 HGB.'],
        hrK3: ['form', 'Richtig. Eine GmbH ist kraft Rechtsform Kaufmann.'],
        hrHgb1: ['b', 'Richtig. § 377 HGB ist als Sonderregel zu prüfen, weil auf beiden Seiten Kaufleute im betrieblichen Warenkauf handeln.'],
        hrProkura: ['nein', 'Richtig. Der Widerruf der Prokura ist eintragungspflichtig. Solange er nicht eingetragen und bekannt gemacht ist, schützt § 15 Abs. 1 HGB grundsätzlich den gutgläubigen Dritten. Kenntnis würde den Schutz ausschließen.'],
        hrHr1: ['hrb', 'Richtig. Kapitalgesellschaften wie die GmbH werden in Abteilung B geführt.'],
        hrFirma1: ['b', 'Richtig. Für eine GmbH muss die Firma den Rechtsformzusatz enthalten. Zusätzlich sind Unterscheidungskraft und Irreführungsverbot zu prüfen.']
    };

    /* ---- Green/red feedback that resets after 3 seconds ---- */
    function flashChoice(btn, ok, feedbackEl, msg) {
        // reset any previous state classes on this button
        btn.classList.remove('border-[var(--border-color)]', 'border-[var(--accent-green)]', 'border-[var(--accent-red)]',
                              'bg-[var(--accent-green)]/10', 'bg-[var(--accent-red)]/10');
        btn.classList.add(ok ? 'border-[var(--accent-green)]' : 'border-[var(--accent-red)]');
        btn.classList.add(ok ? 'bg-[var(--accent-green)]/10' : 'bg-[var(--accent-red)]/10');

        // show feedback
        feedbackEl.classList.remove('hidden');
        feedbackEl.className = 'wiso-feedback mt-3 p-3 rounded text-sm ' +
            (ok ? 'bg-[var(--accent-green)]/10 border-l-4 border-[var(--accent-green)] text-[var(--text-color)]'
                : 'bg-[var(--accent-red)]/10 border-l-4 border-[var(--accent-red)] text-[var(--text-color)]');
        feedbackEl.textContent = (ok ? '✓ ' : 'Noch nicht. ') + msg;

        // reset after 3 seconds
        clearTimeout(btn.__wisoResetTimer);
        btn.__wisoResetTimer = setTimeout(function () {
            btn.classList.remove('border-[var(--accent-green)]', 'border-[var(--accent-red)]',
                                 'bg-[var(--accent-green)]/10', 'bg-[var(--accent-red)]/10');
            btn.classList.add('border-[var(--border-color)]');
            feedbackEl.classList.add('hidden');
            feedbackEl.className = 'wiso-feedback hidden mt-3 p-3 rounded text-sm';
            feedbackEl.textContent = '';
        }, 3000);
    }

    function init() {
        /* ---- Multiple-choice tasks ---- */
        document.querySelectorAll('[data-wiso-question]').forEach(function (box) {
            if (box.__wisoQ) return;
            box.__wisoQ = true;
            var id = box.dataset.wisoQuestion;
            if (!QA[id]) return;
            box.querySelectorAll('.wiso-choice').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var ok = btn.dataset.wisoValue === QA[id][0];
                    flashChoice(btn, ok, box.querySelector('.wiso-feedback'), QA[id][1]);
                    state.answers[id] = ok;
                    save();
                });
            });
        });

        /* ---- Reveal solutions ---- */
        document.querySelectorAll('.wiso-reveal').forEach(function (b) {
            if (b.__wisoReveal) return;
            b.__wisoReveal = true;
            if (!b.dataset.wisoOriginal) b.dataset.wisoOriginal = b.textContent;
            b.addEventListener('click', function () {
                var target = document.getElementById(b.dataset.wisoTarget);
                if (!target) return;
                var wasHidden = target.classList.contains('hidden');
                target.classList.toggle('hidden');
                b.textContent = wasHidden
                    ? (b.dataset.wisoOriginalClose || 'Lösung schließen')
                    : b.dataset.wisoOriginal;
            });
        });

        /* ---- Textareas ---- */
        document.querySelectorAll('[data-wiso-save]').forEach(function (t) {
            if (t.__wisoSave) return;
            t.__wisoSave = true;
            t.value = state.text[t.dataset.wisoSave] || '';
            t.addEventListener('input', function () {
                state.text[t.dataset.wisoSave] = t.value;
                save();
            });
        });

        /* ---- Firmenbaukasten ---- */
        var fb = document.getElementById('wisoFirmBase');
        var ff = document.getElementById('wisoFirmForm');
        var fo = document.getElementById('wisoFirmOutput');
        if (fb && ff && fo && !fb.__wisoFirm) {
            fb.__wisoFirm = true;
            var update = function () {
                fo.textContent = (fb.value.trim() || '[Firmenkern]') + ' ' + ff.value;
            };
            fb.addEventListener('input', update);
            ff.addEventListener('change', update);
            update();
        }

        /* ---- Final quiz ---- */
        var quiz = document.getElementById('wisoHrQuiz');
        if (quiz && !quiz.__wisoQuiz) {
            quiz.__wisoQuiz = true;
            var questions = [
                ['Was kennzeichnet den Istkaufmann?', ['Erst die freiwillige Eintragung', 'Betrieb eines Handelsgewerbes nach § 1 HGB', 'Eine kaufmännische Ausbildung'], 1],
                ['Wo wird ein Einzelkaufmann eingetragen?', ['HRA', 'HRB', 'Vereinsregister'], 0],
                ['Welche Wirkung hat die Eintragung eines Kleingewerbetreibenden nach § 2 HGB?', ['deklaratorisch', 'konstitutiv', 'keine'], 1],
                ['Was ist die Firma?', ['der Betriebssitz', 'der Name des Kaufmanns im Geschäftsverkehr', 'jede Geschäftsbezeichnung'], 1],
                ['Wann greift § 377 HGB?', ['bei jedem Verbraucherkauf', 'bei jedem Vertrag', 'insbesondere beim beiderseitigen Handelskauf'], 2],
                ['Wer darf das Handelsregister einsehen?', ['grundsätzlich jeder zu Informationszwecken', 'nur Kaufleute', 'nur Personen mit besonderem Interesse'], 0],
                ['Was entscheidet über ein Handelsgewerbe?', ['nur der Umsatz', 'das Gesamtbild von Art und Umfang', 'nur die Zahl der Mitarbeitenden'], 1],
                ['Welche Aussage stimmt?', ['Gewerbeanmeldung ersetzt Registereintragung', 'HGB verdrängt das BGB vollständig', 'HGB ergänzt/modifiziert das BGB in seinem Sonderbereich'], 2]
            ];
            quiz.__questions = questions;
            questions.forEach(function (q, i) {
                var d = document.createElement('div');
                d.className = 'bg-[var(--code-bg)] p-3 rounded border border-[var(--border-color)]';
                d.innerHTML = '<div class="text-sm font-semibold mb-2 text-[var(--text-color)]">' + (i + 1) + '. ' + q[0] + '</div>' +
                    '<div class="space-y-1">' +
                    q[1].map(function (x, j) {
                        return '<label class="flex gap-2 items-start text-sm text-[var(--text-muted)] cursor-pointer p-2 rounded hover:bg-[var(--panel-color)]">' +
                            '<input type="radio" name="wisoHrQuiz' + i + '" value="' + j + '" class="mt-1"> ' +
                            '<span>' + x + '</span></label>';
                    }).join('') +
                    '</div>';
                quiz.appendChild(d);
            });
        }

        var gradeBtn = document.getElementById('wisoHrGradeQuiz');
        if (gradeBtn && !gradeBtn.__wisoGrade) {
            gradeBtn.__wisoGrade = true;
            gradeBtn.addEventListener('click', function () {
                var questions = quiz.__questions || [];
                var score = 0;
                questions.forEach(function (q, i) {
                    var pick = document.querySelector('input[name="wisoHrQuiz' + i + '"]:checked');
                    if (pick && +pick.value === q[2]) score++;
                });
                var f = document.getElementById('wisoHrQuizResult');
                f.classList.remove('hidden');
                var total = questions.length;
                f.className = 'wiso-feedback mt-3 p-3 rounded text-sm ' +
                    (score >= total * 0.75
                        ? 'bg-[var(--accent-green)]/10 border-l-4 border-[var(--accent-green)] text-[var(--text-color)]'
                        : 'bg-[var(--accent-amber)]/10 border-l-4 border-[var(--accent-amber)] text-[var(--text-color)]');
                f.innerHTML = '<strong>' + score + ' von ' + total + ' Punkten</strong><br>' +
                    (score === total ? 'Sicher beherrscht.' :
                     score >= total * 0.75 ? 'Gute Grundlage. Prüfe die markierten Antworten noch einmal.' :
                     'Gehe die betreffenden Lernbereiche erneut durch.');
            });
        }

        var resetBtn = document.getElementById('wisoHrReset');
        if (resetBtn && !resetBtn.__wisoReset) {
            resetBtn.__wisoReset = true;
            resetBtn.addEventListener('click', function () {
                if (confirm('Wirklich alle gespeicherten Antworten und den Lernstand löschen?')) {
                    try { localStorage.removeItem(KEY); } catch (e) {}
                    location.reload();
                }
            });
        }
    }

    function start() {
        init();
        setInterval(init, 500);
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
    id: 'WiSO',
    icon: 'fa-briefcase',
    titleDe: 'Wirtschaft & Sozialkunde',
    titleEn: 'Economics and Social Studies',
    descDe: 'WiSo-Referenz: Mitbestimmung, Sozialversicherungen, Unternehmensformen sowie Markttypen und Angebot/Nachfrage.',
    descEn: 'WiSo reference: co-determination, social security, corporate forms, plus market structures and supply/demand.',

    sidebarTitleDe: 'Wirtschaft & Sozialkunde',
    sidebarTitleEn: 'Economics & Social Studies',
    sidebarSubtitleDe: 'Wirtschaft & Sozialkunde',
    sidebarSubtitleEn: 'Economics & Social Studies',
    sidebarVersion: 'v3.5',

    hero: {
        titleDe: 'Wirtschaft & Sozialkunde (WiSo)',
        titleEn: 'Economics & Social Studies (WiSo)',
        introDe: 'Diese Referenz umfasst die Themenbereiche betriebliche Mitbestimmung, das System der sozialen Sicherung, die wichtigsten Unternehmensformen sowie die volkswirtschaftlichen Grundlagen <a href="#markttypen">Markttypen</a> und <a href="#angebot-nachfrage">Angebot &amp; Nachfrage</a>. Ergänzt durch die Selbstlerneinheit <a href="#handelsrecht">Handelsrecht &amp; Unternehmensgründung</a>.',
        introEn: 'This reference covers the topics of co-determination, the social security system, corporate forms, and the economic fundamentals of <a href="#markttypen">market structures</a> and <a href="#angebot-nachfrage">supply &amp; demand</a>. Supplemented by the self-learning unit <a href="#handelsrecht">Commercial Law &amp; Business Formation</a>.'
    },

    quickLinks: [
        { icon: 'fa-people-group',   href: '#mitbestimmung',      switchToDoc: true, labelDe: 'Mitbestimmung',      labelEn: 'Co-determination' },
        { icon: 'fa-shield-heart',   href: '#sozialversicherung', switchToDoc: true, labelDe: 'Sozialversicherung', labelEn: 'Social Security' },
        { icon: 'fa-building',       href: '#rechtsformen',       switchToDoc: true, labelDe: 'Unternehmensformen', labelEn: 'Corporate Forms' },
        { icon: 'fa-chess-knight',   href: '#markttypen',         switchToDoc: true, labelDe: 'Markttypen',         labelEn: 'Market Structures' },
        { icon: 'fa-chart-line',     href: '#angebot-nachfrage',  switchToDoc: true, labelDe: 'Angebot & Nachfrage', labelEn: 'Supply & Demand' },
        { icon: 'fa-scale-balanced', href: '#handelsrecht',       switchToDoc: true, labelDe: 'Handelsrecht',       labelEn: 'Commercial Law' }
    ],

    sections: [
        /* ============ 1. MITBESTIMMUNG ============ */
        {
            id: 'mitbestimmung',
            titleDe: '1. Betriebliche Mitbestimmung',
            titleEn: '1. Corporate Co-determination',
            subtopics: [
                {
                    id: 'betriebsrat',
                    titleDe: '1.1 Der Betriebsrat (BetrVG)',
                    titleEn: '1.1 The Works Council (BetrVG)',
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

        /* ============ 3. MITBESTIMMUNG (BETRIEBSRAT / JAV) ============ */
        {
            id: 'mitbestimmung-gremien',
            titleDe: '3. Betriebliche Mitbestimmung',
            titleEn: '3. Corporate Co-determination',
            subtopics: [
                {
                    id: 'betriebsrat-rechte',
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

        /* ============ 5. UNTERNEHMENSFORMEN ============ */
        {
            id: 'rechtsformen',
            titleDe: '5. Unternehmensformen',
            titleEn: '5. Corporate Forms',
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

        /* ============ 8. HANDELSRECHT & UNTERNEHMENSGRÜNDUNG ============ */
        {
            id: 'handelsrecht',
            titleDe: '8. Handelsrecht & Unternehmensgründung',
            titleEn: '8. Commercial Law & Business Formation',
            introDe: 'Von der Geschäftsidee über Gewerbe, Kaufmannsarten, HGB/BGB, Handelsregister und Firma bis zum Behördenweg. Mit Fallbeispielen, interaktiven Aufgaben und Lösungen.',
            introEn: 'From the business idea through trade, merchant types, HGB/BGB, commercial register and company name to the official registration path. With case studies, interactive tasks and solutions.',
            subtopics: [

                /* ---------- 8.1 Gründung ---------- */
                {
                    id: 'hr-gruendung',
                    titleDe: '8.1 Von der Idee zur Gründung',
                    titleEn: '8.1 From Idea to Formation',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Eine Geschäftsidee reicht nicht. Eine Gründungsentscheidung verbindet Marktchance, Person, Finanzierung, Organisation und Recht. Begleite den Fachinformatiker Heinz Müller auf diesem Weg.</p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div class="md:col-span-2 bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Fallsituation Heinz Müller</h4>
                            <p class="text-sm text-[var(--text-muted)]">Heinz arbeitet als Fachinformatiker in einem mittelständischen Betrieb. Kunden fragen häufig individuelle Softwarelösungen nach, doch sein Arbeitgeber hat dafür keine Kapazität. Heinz erwägt die Selbstständigkeit. Er besitzt <strong>65.000 € Eigenkapital</strong>, kennt geeignete Gewerberäume und verfügt über das technische Beschaffungswissen. Sein Bruder Karl und sein Bekannter Gerd würden als Beschäftigte einsteigen; Gabi Krüger könnte die kaufmännischen Aufgaben übernehmen.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Nach einer IHK-Beratung legt Heinz seiner Hausbank ein Konzept vor und erhält <strong>70.000 € Kredit</strong>. Er mietet Räume, bestellt Geräte, stellt die drei Personen ein und gewinnt bereits erste Aufträge. Der Mietvertrag und die operative Tätigkeit beginnen am <strong>01.06.</strong>; die Eintragung als Einzelkaufmann erfolgt erst am <strong>18.06.</strong></p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Dein Auftrag</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Gewerbe oder nicht?</li>
                                <li>Kaufmannsart?</li>
                                <li>HRA oder HRB?</li>
                                <li>zulässige Firma?</li>
                                <li>nötige Anmeldungen?</li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Entscheidungsweg</h4>
                        <div class="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2 text-xs">
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-green)] block mb-1">1 Marktchance</strong><span class="text-[var(--text-muted)]">Ungedeckte Nachfrage nach Individualsoftware</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-blue)] block mb-1">2 Eignung</strong><span class="text-[var(--text-muted)]">Fachwissen, Erfahrung, Verantwortung</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-amber)] block mb-1">3 Ressourcen</strong><span class="text-[var(--text-muted)]">Kapital, Räume, Geräte, Personal</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-violet)] block mb-1">4 Prüfung</strong><span class="text-[var(--text-muted)]">Beratung, Modell, Risiken, Rechtsform</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-red)] block mb-1">5 Umsetzung</strong><span class="text-[var(--text-muted)]">Finanzierung, Verträge, Anmeldung</span></div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Persönliche Faktoren</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>fachliche und kaufmännische Kenntnisse</li>
                                <li>Bereitschaft, Risiko und Verantwortung zu tragen</li>
                                <li>Belastbarkeit, Selbstorganisation und Führung</li>
                                <li>familiäre Situation und Einkommensbedarf</li>
                                <li>Ziele: Unabhängigkeit, Wachstum oder Sicherheit</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Wirtschaftliche Faktoren</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>Marktbedarf, Zielgruppe und Wettbewerb</li>
                                <li>Eigenkapital, Kreditbedarf und Liquiditätsreserve</li>
                                <li>Investitionen, laufende Kosten und Preisgestaltung</li>
                                <li>Haftungsrisiko und gewünschte Rechtsform</li>
                                <li>Personalbedarf, Standort und Skalierbarkeit</li>
                            </ul>
                        </div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-task>
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-pen-to-square opacity-70 mr-2"></i>Aktive Analyse: Wie tragfähig ist Heinz' Entscheidung?</div>
                        <p class="text-sm text-[var(--text-muted)]">Notiere mindestens vier Chancen bzw. Ressourcen und drei Risiken oder offene Fragen. Formuliere anschließend ein begründetes Zwischenurteil.</p>
                        <textarea data-wiso-save="hrHeinzAnalyse" aria-label="Analyse der Gründungssituation" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm" placeholder="Chancen/Ressourcen …&#10;Risiken/offene Fragen …&#10;Zwischenurteil …"></textarea>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolHeinz">Musterlösung vergleichen</button>
                        </div>
                        <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolHeinz">
                            <strong class="text-[var(--heading-color)]">Mögliche Lösung:</strong> Für die Gründung sprechen die erkennbare Nachfrage, Heinz' Fach- und Kundenwissen, 65.000 € Eigenkapital, die Kreditzusage sowie verfügbare Mitarbeitende und Räume. Zu prüfen bleiben u. a. belastbare Absatz- und Kostenplanung, Konkurrenz, Liquiditätsreserve, Abhängigkeit von wenigen Kunden, Schutz geistigen Eigentums, Datenschutz/IT-Sicherheit, Versicherungen und die passende Rechtsform. Ein positiver Gründungsentscheid ist vertretbar, wenn Businessplan und Liquiditätsplanung auch Anlaufverluste abdecken.
                        </div>
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">A business idea alone is not enough. A formation decision combines market opportunity, person, financing, organisation and law. Accompany IT specialist Heinz Müller on this path.</p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div class="md:col-span-2 bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Case: Heinz Müller</h4>
                            <p class="text-sm text-[var(--text-muted)]">Heinz works as an IT specialist in a medium-sized company. Customers frequently ask for custom software solutions, but his employer has no capacity. Heinz considers self-employment. He has <strong>€65,000 equity</strong>, knows suitable premises and has technical procurement knowledge. His brother Karl and his acquaintance Gerd would join as employees; Gabi Krüger could take over the commercial tasks.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0">After IHK advice, he presents a concept to his bank and receives a <strong>€70,000 loan</strong>. He rents premises, orders equipment, hires three people and wins first orders. Operations begin on <strong>01 June</strong>; registration as sole trader occurs only on <strong>18 June</strong>.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Your Task</h4>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Trade or not?</li>
                                <li>Merchant type?</li>
                                <li>HRA or HRB?</li>
                                <li>Admissible company name?</li>
                                <li>Required registrations?</li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Decision Path</h4>
                        <div class="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2 text-xs">
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-green)] block mb-1">1 Market</strong><span class="text-[var(--text-muted)]">Unmet demand for custom software</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-blue)] block mb-1">2 Suitability</strong><span class="text-[var(--text-muted)]">Expertise, experience, responsibility</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-amber)] block mb-1">3 Resources</strong><span class="text-[var(--text-muted)]">Capital, premises, equipment, staff</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-violet)] block mb-1">4 Review</strong><span class="text-[var(--text-muted)]">Advice, model, risks, legal form</span></div>
                            <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-red)] block mb-1">5 Execution</strong><span class="text-[var(--text-muted)]">Financing, contracts, registration</span></div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Personal Factors</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>technical and commercial knowledge</li>
                                <li>willingness to bear risk and responsibility</li>
                                <li>resilience, self-organisation and leadership</li>
                                <li>family situation and income needs</li>
                                <li>goals: independence, growth or security</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Economic Factors</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>market demand, target group and competition</li>
                                <li>equity, credit needs and liquidity reserve</li>
                                <li>investments, running costs and pricing</li>
                                <li>liability risk and desired legal form</li>
                                <li>staffing, location and scalability</li>
                            </ul>
                        </div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-task>
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-pen-to-square opacity-70 mr-2"></i>Active Analysis: How viable is Heinz's decision?</div>
                        <p class="text-sm text-[var(--text-muted)]">Note at least four opportunities/resources and three risks or open questions. Then formulate a reasoned interim assessment.</p>
                        <textarea data-wiso-save="hrHeinzAnalyse" aria-label="Analysis of the formation situation" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm" placeholder="Opportunities/resources …&#10;Risks/open questions …&#10;Interim assessment …"></textarea>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolHeinz">Compare with sample solution</button>
                        </div>
                        <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolHeinz">
                            <strong class="text-[var(--heading-color)]">Possible solution:</strong> The identifiable demand, Heinz's technical and customer knowledge, €65,000 equity, the loan commitment and available staff and premises all support the formation. Still to be examined are a robust sales and cost plan, competition, liquidity reserve, dependence on a few customers, protection of intellectual property, data protection/IT security, insurance and the appropriate legal form. A positive formation decision is defensible if the business plan and liquidity planning also cover initial losses.
                        </div>
                    </div>`
                },

                /* ---------- 8.2 Gewerbe ---------- */
                {
                    id: 'hr-gewerbe',
                    titleDe: '8.2 Gewerbe und Handelsgewerbe',
                    titleEn: '8.2 Trade and Commercial Trade',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Zuerst wird geklärt, ob eine gewerbliche Tätigkeit vorliegt. Danach folgt die Frage, ob Art oder Umfang eine kaufmännische Organisation erfordern.</p>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Stufe 1: Liegt ein Gewerbe vor?</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">selbstständig</strong><span class="text-[var(--text-muted)]">auf eigene Rechnung und Verantwortung</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">planmäßig und dauerhaft</strong><span class="text-[var(--text-muted)]">nicht bloß eine einmalige Gelegenheit</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">Gewinnerzielungsabsicht</strong><span class="text-[var(--text-muted)]">nicht nur Kostendeckung als Privatvorgang</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">nach außen</strong><span class="text-[var(--text-muted)]">Teilnahme am Markt</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">erlaubt</strong><span class="text-[var(--text-muted)]">keine verbotene Tätigkeit</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">kein freier Beruf</strong><span class="text-[var(--text-muted)]">Abgrenzung nach Gesamtbild und Steuerrecht</span></div>
                    </div>
                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-amber)] p-3 rounded-r mt-3 text-xs text-[var(--text-muted)]">
                        <strong class="text-[var(--accent-amber)]">Wichtig:</strong> „Freiberuflich oder gewerblich?" lässt sich nicht allein aus einer Berufsbezeichnung ableiten. Gerade bei IT-Beratung und Softwareentwicklung kommt es auf Ausbildung und konkrete Tätigkeit an. Im Zweifel entscheidet das Finanzamt; steuerliche Beratung ist sinnvoll.
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Stufe 2: Handelsgewerbe nach § 1 HGB</h4>
                    <p class="text-sm text-[var(--text-muted)]">Jeder Gewerbebetrieb ist grundsätzlich Handelsgewerbe, <strong>es sei denn</strong>, dass er nach Art oder Umfang keinen in kaufmännischer Weise eingerichteten Geschäftsbetrieb benötigt. Entscheidend ist das Gesamtbild. Im Streitfall muss der Gewerbetreibende darlegen, dass sein Betrieb keine kaufmännische Einrichtung erfordert.</p>
                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-blue)] p-3 rounded-r text-xs text-[var(--text-muted)]">
                        <strong class="text-[var(--accent-blue)]">§ 1 Abs. 2 HGB:</strong> Es gibt keine einzelne starre Umsatz-, Gewinn- oder Beschäftigtengrenze, die die Kaufmannseigenschaft automatisch entscheidet.
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Indizien für kaufmännische Organisation</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-sm">
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <ul class="text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>Umsatz, Kapital- und Kreditvolumen</li>
                                <li>Zahl und Qualifikation der Beschäftigten</li>
                                <li>viele oder komplexe Geschäftsvorgänge</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <ul class="text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>großes/vielfältiges Waren- oder Leistungsangebot</li>
                                <li>mehrere Standorte und großer Marktbereich</li>
                                <li>aufwendige Buchführung, Lager-, Forderungs- und Personalorganisation</li>
                            </ul>
                        </div>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">Buchführung ist ein Indiz bzw. eine Folge – ihr bloßes Fehlen beweist nicht, dass kein Handelsgewerbe vorliegt. Die Schwellen von 800.000 € Umsatzerlösen und 80.000 € Jahresüberschuss in § 241a HGB betreffen die Befreiung bestimmter Einzelkaufleute von handelsrechtlicher Buchführung und Inventar, nicht die automatische Einordnung als Kaufmann oder Nichtkaufmann.</p>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrHeinzGewerbe">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Fall: Heinz am 01.06.</div>
                        <p class="text-sm text-[var(--text-muted)]">Welche Aussage ist am besten begründet?</p>
                        <div class="wiso-choices grid gap-2 mt-2">
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="a">Heinz ist erst ab der Registereintragung Gewerbetreibender.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="b">Heinz betreibt ab Aufnahme der selbstständigen, planmäßigen und auf Gewinn gerichteten Markttätigkeit ein Gewerbe; die Registerfrage ist davon zu trennen.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="c">Softwareentwicklung ist stets ein freier Beruf.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">First, it is clarified whether a commercial activity exists. Then the question follows whether the type or scale requires a commercial organisation.</p>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Stage 1: Is there a trade?</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">self-employed</strong><span class="text-[var(--text-muted)]">on own account and responsibility</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">planned and permanent</strong><span class="text-[var(--text-muted)]">not merely a one-off opportunity</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">profit intention</strong><span class="text-[var(--text-muted)]">not just cost recovery as a private matter</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">outward-facing</strong><span class="text-[var(--text-muted)]">participation in the market</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">permitted</strong><span class="text-[var(--text-muted)]">no prohibited activity</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">not a liberal profession</strong><span class="text-[var(--text-muted)]">distinction by overall picture and tax law</span></div>
                    </div>
                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-amber)] p-3 rounded-r mt-3 text-xs text-[var(--text-muted)]">
                        <strong class="text-[var(--accent-amber)]">Important:</strong> "Liberal profession or trade?" cannot be derived from a job title alone. Especially in IT consulting and software development, training and the concrete activity matter. In doubt, the tax office decides; tax advice is advisable.
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Stage 2: Commercial trade under § 1 HGB</h4>
                    <p class="text-sm text-[var(--text-muted)]">Every trade business is in principle a commercial trade, <strong>unless</strong> it does not require a commercially organised business operation by its type or scale. The overall picture is decisive. In a dispute, the trader must show that their business does not require a commercial set-up.</p>
                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-blue)] p-3 rounded-r text-xs text-[var(--text-muted)]">
                        <strong class="text-[var(--accent-blue)]">§ 1(2) HGB:</strong> There is no single rigid revenue, profit or employee threshold that automatically determines merchant status.
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Indicators of commercial organisation</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-sm">
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <ul class="text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>revenue, capital and credit volume</li>
                                <li>number and qualification of employees</li>
                                <li>many or complex business transactions</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <ul class="text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>large/diverse range of goods or services</li>
                                <li>several locations and a large market area</li>
                                <li>extensive bookkeeping, inventory, receivables and personnel organisation</li>
                            </ul>
                        </div>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">Bookkeeping is an indicator or a consequence — its mere absence does not prove that no commercial trade exists. The thresholds of €800,000 revenue and €80,000 annual surplus in § 241a HGB concern the exemption of certain sole traders from commercial bookkeeping and inventory, not the automatic classification as merchant or non-merchant.</p>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrHeinzGewerbe">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Case: Heinz on 01 June</div>
                        <p class="text-sm text-[var(--text-muted)]">Which statement is best reasoned?</p>
                        <div class="wiso-choices grid gap-2 mt-2">
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="a">Heinz is a trader only from the register entry.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="b">Heinz operates a trade from the start of the self-employed, planned and profit-oriented market activity; the register question is separate.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="c">Software development is always a liberal profession.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`
                },

                /* ---------- 8.3 Kaufmannsarten ---------- */
                {
                    id: 'hr-kaufmann',
                    titleDe: '8.3 Die Kaufmannsarten',
                    titleEn: '8.3 Merchant Types',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Entscheidend ist, warum die Kaufmannseigenschaft entsteht: durch den tatsächlich betriebenen Umfang, durch freiwillige Eintragung oder durch die Rechtsform.</p>

                    <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
                    <tr><th class="w-1/5">Kaufmannsart</th><th class="w-1/5">Rechtsgrundlage</th><th>Merkmal</th><th class="w-1/6">Eintragung</th></tr>
                    <tr><td><strong class="text-[var(--accent-green)]">Istkaufmann</strong></td><td>§ 1 HGB</td><td class="text-[var(--text-muted)]">Handelsgewerbe nach Art/Umfang</td><td class="text-[var(--text-muted)]">deklaratorisch</td></tr>
                    <tr><td><strong class="text-[var(--accent-blue)]">Kannkaufmann</strong></td><td>§§ 2, 3 HGB</td><td class="text-[var(--text-muted)]">Kleingewerbe, freiwillige Eintragung</td><td class="text-[var(--text-muted)]">konstitutiv</td></tr>
                    <tr><td><strong class="text-[var(--accent-violet)]">Formkaufmann</strong></td><td>§ 6 HGB + Spezialgesetze</td><td class="text-[var(--text-muted)]">GmbH, UG, AG, eG kraft Rechtsform</td><td class="text-[var(--text-muted)]">konstitutiv</td></tr>
                    </table></div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-green)] border-b border-[var(--border-color)] pb-2">Istkaufmann <span class="text-xs text-[var(--text-muted)] font-normal">§ 1 HGB</span></h4>
                            <p class="text-sm text-[var(--text-muted)]">Betreibt ein Handelsgewerbe, dessen Art oder Umfang kaufmännische Organisation erfordert. Die Eigenschaft besteht bereits durch den Betrieb.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0"><strong class="text-[var(--text-color)]">Eintragung:</strong> verpflichtend, aber grundsätzlich deklaratorisch – sie bestätigt den schon bestehenden Status.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-blue)] border-b border-[var(--border-color)] pb-2">Kannkaufmann <span class="text-xs text-[var(--text-muted)] font-normal">§§ 2, 3 HGB</span></h4>
                            <p class="text-sm text-[var(--text-muted)]">Kleingewerbetreibende sowie bestimmte land-/forstwirtschaftliche Betriebe können sich freiwillig eintragen lassen.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0"><strong class="text-[var(--text-color)]">Eintragung:</strong> konstitutiv – erst sie begründet hier die Kaufmannseigenschaft.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-violet)] border-b border-[var(--border-color)] pb-2">Formkaufmann <span class="text-xs text-[var(--text-muted)] font-normal">§ 6 HGB</span></h4>
                            <p class="text-sm text-[var(--text-muted)]">Bestimmte Gesellschaften gelten unabhängig von Art und Umfang ihres Geschäfts aufgrund ihrer Rechtsform als Kaufleute, z. B. GmbH, UG, AG und eG.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0"><strong class="text-[var(--text-color)]">Eintragung:</strong> GmbH, UG und AG entstehen als solche grundsätzlich erst mit Registereintragung. Die eG wird im Genossenschaftsregister geführt.</p>
                        </div>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Falltraining</h4>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-question="hrK1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Ina betreibt ein Hotel mit 30 Beschäftigten und komplexer Personal-, Buchungs- und Einkaufsorganisation.</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="ist">Istkauffrau</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kann">Kannkauffrau</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kein">keine Kauffrau</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-question="hrK2">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Olga betreibt einen kleinen Bioladen, der keine kaufmännische Organisation erfordert. Sie lässt sich freiwillig als e.Kfr. eintragen.</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="ist">Istkauffrau</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kann">Kannkauffrau</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="form">Formkauffrau</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-question="hrK3">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Die Müller GmbH betreibt ein Softwarehaus.</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="form">Formkaufmann</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kann">Kannkaufmann</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kein">nur bei hohem Umsatz Kaufmann</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">What matters is why merchant status arises: through the scale actually operated, through voluntary registration, or through the legal form.</p>

                    <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
                    <tr><th class="w-1/5">Merchant type</th><th class="w-1/5">Legal basis</th><th>Characteristic</th><th class="w-1/6">Registration</th></tr>
                    <tr><td><strong class="text-[var(--accent-green)]">Actual merchant</strong></td><td>§ 1 HGB</td><td class="text-[var(--text-muted)]">Commercial trade by type/scale</td><td class="text-[var(--text-muted)]">declaratory</td></tr>
                    <tr><td><strong class="text-[var(--accent-blue)]">Optional merchant</strong></td><td>§§ 2, 3 HGB</td><td class="text-[var(--text-muted)]">Small trade, voluntary registration</td><td class="text-[var(--text-muted)]">constitutive</td></tr>
                    <tr><td><strong class="text-[var(--accent-violet)]">Formal merchant</strong></td><td>§ 6 HGB + special laws</td><td class="text-[var(--text-muted)]">GmbH, UG, AG, eG by legal form</td><td class="text-[var(--text-muted)]">constitutive</td></tr>
                    </table></div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-green)] border-b border-[var(--border-color)] pb-2">Actual merchant <span class="text-xs text-[var(--text-muted)] font-normal">§ 1 HGB</span></h4>
                            <p class="text-sm text-[var(--text-muted)]">Operates a commercial trade whose type or scale requires commercial organisation. The status exists already through the operation.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0"><strong class="text-[var(--text-color)]">Registration:</strong> mandatory, but generally declaratory — it confirms the status that already exists.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-blue)] border-b border-[var(--border-color)] pb-2">Optional merchant <span class="text-xs text-[var(--text-muted)] font-normal">§§ 2, 3 HGB</span></h4>
                            <p class="text-sm text-[var(--text-muted)]">Small traders and certain agricultural/forestry businesses may register voluntarily.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0"><strong class="text-[var(--text-color)]">Registration:</strong> constitutive — here it is what first establishes merchant status.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-violet)] border-b border-[var(--border-color)] pb-2">Formal merchant <span class="text-xs text-[var(--text-muted)] font-normal">§ 6 HGB</span></h4>
                            <p class="text-sm text-[var(--text-muted)]">Certain companies are merchants regardless of the type and scale of their business due to their legal form, e.g. GmbH, UG, AG and eG.</p>
                            <p class="text-sm text-[var(--text-muted)] mb-0"><strong class="text-[var(--text-color)]">Registration:</strong> GmbH, UG and AG generally come into existence as such only upon register entry. The eG is kept in the cooperative register.</p>
                        </div>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Case training</h4>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-question="hrK1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Ina runs a hotel with 30 employees and complex personnel, booking and purchasing organisation.</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="ist">Actual merchant</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kann">Optional merchant</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kein">No merchant</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-question="hrK2">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Olga runs a small organic shop that does not require commercial organisation. She registers voluntarily as e.Kfr.</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="ist">Actual merchant</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kann">Optional merchant</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="form">Formal merchant</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-question="hrK3">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Müller GmbH operates a software house.</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="form">Formal merchant</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kann">Optional merchant</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="kein">Merchant only at high revenue</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`
                },

                /* ---------- 8.4 HGB & BGB ---------- */
                {
                    id: 'hr-hgb-bgb',
                    titleDe: '8.4 HGB und BGB im Zusammenspiel',
                    titleEn: '8.4 HGB and BGB Interaction',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Das BGB ist die allgemeine Grundlage. Für Kaufleute enthält das HGB Sonderregeln, die Geschäfte beschleunigen und stärker auf kaufmännische Erfahrung setzen.</p>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Lex specialis vor lex generalis</h4>
                    <p class="text-sm text-[var(--text-muted)]">Ist ein Sachverhalt im HGB speziell geregelt, geht diese Sonderregel für ihren Anwendungsbereich der allgemeinen BGB-Regel vor. Fehlt eine handelsrechtliche Sonderregel, gilt das BGB. Hinzu kommen Rechtsformgesetze wie GmbHG oder AktG.</p>

                    <div class="grid grid-cols-1 md:grid-cols-5 gap-2 mt-3 text-xs">
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-green)] block mb-1">1 Beteiligte</strong><span class="text-[var(--text-muted)]">Wer handelt? Kaufmann/Nichtkaufmann?</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-blue)] block mb-1">2 Geschäft</strong><span class="text-[var(--text-muted)]">Gehört es zum Betrieb des Handelsgewerbes?</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-amber)] block mb-1">3 Sondernorm</strong><span class="text-[var(--text-muted)]">Regelt das HGB den konkreten Fall?</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-violet)] block mb-1">4 Grundlage</strong><span class="text-[var(--text-muted)]">Ergänzend bleibt das BGB anwendbar</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-red)] block mb-1">5 Ergebnis</strong><span class="text-[var(--text-muted)]">Normen gemeinsam auswerten</span></div>
                    </div>

                    <div class="overflow-x-auto w-full mt-4"><table class="wikitable">
                    <tr><th>Situation</th><th>BGB-Grundlage</th><th>Handelsrechtliche Besonderheit</th></tr>
                    <tr><td><strong>Mangelhafte Ware</strong></td><td class="text-[var(--text-muted)]">Gewährleistungsrechte richten sich insbesondere nach §§ 437 ff. BGB.</td><td class="text-[var(--text-muted)]">Bei einem beiderseitigen Handelskauf muss der Käufer die Ware unverzüglich untersuchen und erkennbare Mängel unverzüglich rügen (§ 377 HGB), sonst gilt sie grundsätzlich als genehmigt.</td></tr>
                    <tr><td><strong>Bürgschaft</strong></td><td class="text-[var(--text-muted)]">Grundsätzlich Schriftform (§ 766 BGB).</td><td class="text-[var(--text-muted)]">Formfreiheit nach § 350 HGB, wenn die Bürgschaft auf Seiten des Bürgen ein Handelsgeschäft ist.</td></tr>
                    <tr><td><strong>Schweigen</strong></td><td class="text-[var(--text-muted)]">Schweigen ist grundsätzlich keine Annahme.</td><td class="text-[var(--text-muted)]">Auch unter Kaufleuten nicht pauschal Annahme; nur besondere gesetzliche oder anerkannte Fallgruppen können etwas anderes ergeben.</td></tr>
                    <tr><td><strong>Geschäftsabwicklung</strong></td><td class="text-[var(--text-muted)]">Stärkerer allgemeiner Schutz und Formregeln.</td><td class="text-[var(--text-muted)]">Schnelligkeit, Verkehrsschutz und erhöhte Sorgfaltsanforderungen prägen Sonderregeln.</td></tr>
                    </table></div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-red)] p-3 rounded-r">
                            <p class="text-sm text-[var(--accent-red)] mb-1"><strong>Falsch:</strong> „Bei Kaufleuten müssen Mängel immer sofort gerügt werden."</p>
                            <p class="text-sm text-[var(--accent-green)] mb-0"><strong>Richtig:</strong> Die Untersuchungs- und Rügeobliegenheit des § 377 HGB setzt einen <strong>beiderseitigen Handelskauf</strong> voraus. Beide Parteien handeln also als Kaufleute und das Geschäft gehört jeweils zu ihrem Handelsgewerbe.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">IT-Beispiel</h4>
                            <p class="text-sm text-[var(--text-muted)]">Eine eingetragene IT-Händlerin bestellt für den Weiterverkauf 40 Monitore bei einer AG. Sichtbare Transportschäden fallen bei ordnungsgemäßer Wareneingangsprüfung auf. Werden sie nicht unverzüglich angezeigt, droht der Verlust der Mängelrechte nach § 377 HGB.</p>
                            <p class="text-xs text-[var(--text-muted)] mb-0">Bei einem privaten Käufer wäre § 377 HGB nicht anwendbar.</p>
                        </div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrHgb1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Heinz e.K. bestellt fünf Server für sein Unternehmen bei einer Hardware-GmbH. Welche Prüfung ist zentral?</div>
                        <div class="wiso-choices grid gap-2">
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="a">Nur die zweijährige Verjährungsfrist; das HGB spielt keine Rolle.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="b">Ob ein beiderseitiger Handelskauf vorliegt und Heinz Untersuchung und Mängelanzeige nach § 377 HGB rechtzeitig vorgenommen hat.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="c">Ob Heinz bar bezahlt hat.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">The BGB is the general foundation. For merchants, the HGB contains special rules that accelerate transactions and rely more on commercial experience.</p>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Lex specialis before lex generalis</h4>
                    <p class="text-sm text-[var(--text-muted)]">If a matter is specifically regulated in the HGB, that special rule takes precedence over the general BGB rule within its scope. If there is no commercial law special rule, the BGB applies. Legal form statutes such as GmbHG or AktG also apply.</p>

                    <div class="grid grid-cols-1 md:grid-cols-5 gap-2 mt-3 text-xs">
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-green)] block mb-1">1 Parties</strong><span class="text-[var(--text-muted)]">Who acts? Merchant/non-merchant?</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-blue)] block mb-1">2 Transaction</strong><span class="text-[var(--text-muted)]">Does it belong to the commercial trade?</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-amber)] block mb-1">3 Special rule</strong><span class="text-[var(--text-muted)]">Does the HGB regulate the case?</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-violet)] block mb-1">4 Foundation</strong><span class="text-[var(--text-muted)]">The BGB remains applicable</span></div>
                        <div class="bg-[var(--code-bg)] p-3 rounded border border-[var(--panel-border)]"><strong class="text-[var(--accent-red)] block mb-1">5 Result</strong><span class="text-[var(--text-muted)]">Evaluate norms together</span></div>
                    </div>

                    <div class="overflow-x-auto w-full mt-4"><table class="wikitable">
                    <tr><th>Situation</th><th>BGB basis</th><th>Commercial law special feature</th></tr>
                    <tr><td><strong>Defective goods</strong></td><td class="text-[var(--text-muted)]">Warranty rights follow in particular §§ 437 ff. BGB.</td><td class="text-[var(--text-muted)]">In a bilateral commercial purchase, the buyer must inspect the goods without delay and give notice of recognisable defects without delay (§ 377 HGB), otherwise they are generally deemed approved.</td></tr>
                    <tr><td><strong>Suretyship</strong></td><td class="text-[var(--text-muted)]">Generally written form (§ 766 BGB).</td><td class="text-[var(--text-muted)]">Freedom from form under § 350 HGB if the suretyship is a commercial transaction on the surety's side.</td></tr>
                    <tr><td><strong>Silence</strong></td><td class="text-[var(--text-muted)]">Silence is generally not acceptance.</td><td class="text-[var(--text-muted)]">Not blanket acceptance among merchants either; only special statutory or recognised case groups can produce a different result.</td></tr>
                    <tr><td><strong>Transaction handling</strong></td><td class="text-[var(--text-muted)]">Stronger general protection and form rules.</td><td class="text-[var(--text-muted)]">Speed, transaction security and increased duties of care shape the special rules.</td></tr>
                    </table></div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-red)] p-3 rounded-r">
                            <p class="text-sm text-[var(--accent-red)] mb-1"><strong>False:</strong> "Among merchants, defects must always be reported immediately."</p>
                            <p class="text-sm text-[var(--accent-green)] mb-0"><strong>Correct:</strong> The inspection and notification duty of § 377 HGB requires a <strong>bilateral commercial purchase</strong>. Both parties act as merchants and the transaction belongs to each of their commercial trades.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">IT example</h4>
                            <p class="text-sm text-[var(--text-muted)]">A registered IT dealer orders 40 monitors for resale from a public limited company. Visible transport damage is discovered during proper incoming goods inspection. If not reported without delay, the loss of defect rights under § 377 HGB threatens.</p>
                            <p class="text-xs text-[var(--text-muted)] mb-0">§ 377 HGB would not apply to a private buyer.</p>
                        </div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrHgb1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Heinz e.K. orders five servers for his business from a hardware GmbH. Which check is central?</div>
                        <div class="wiso-choices grid gap-2">
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="a">Only the two-year limitation period; the HGB plays no role.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="b">Whether a bilateral commercial purchase exists and Heinz carried out inspection and notice of defects under § 377 HGB in time.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="c">Whether Heinz paid in cash.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`
                },

                /* ---------- 8.5 Handelsregister ---------- */
                {
                    id: 'hr-register',
                    titleDe: '8.5 Das Handelsregister',
                    titleEn: '8.5 The Commercial Register',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Das Register wird elektronisch von den Gerichten geführt. Eintragungen und eingereichte Dokumente sind grundsätzlich öffentlich abrufbar.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div class="bg-[var(--panel-color)] p-5 border-2 border-[var(--accent-green)] rounded relative">
                            <span class="absolute top-2 right-4 text-4xl font-black text-[var(--accent-green)] opacity-30">A</span>
                            <h4 class="mt-0 text-[var(--accent-green)] border-b border-[var(--border-color)] pb-2">Abteilung A · HRA</h4>
                            <p class="text-sm text-[var(--text-muted)]">Insbesondere Einzelkaufleute und Personenhandelsgesellschaften.</p>
                            <div class="flex flex-wrap gap-1 mt-2">
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">e.K.</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">OHG</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">KG</span>
                            </div>
                        </div>
                        <div class="bg-[var(--panel-color)] p-5 border-2 border-[var(--accent-violet)] rounded relative">
                            <span class="absolute top-2 right-4 text-4xl font-black text-[var(--accent-violet)] opacity-30">B</span>
                            <h4 class="mt-0 text-[var(--accent-violet)] border-b border-[var(--border-color)] pb-2">Abteilung B · HRB</h4>
                            <p class="text-sm text-[var(--text-muted)]">Insbesondere Kapitalgesellschaften.</p>
                            <div class="flex flex-wrap gap-1 mt-2">
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">GmbH</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">UG</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">AG</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">KGaA</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Was wird sichtbar?</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>Firma, Sitz und Geschäftsanschrift</li>
                                <li>Rechtsform und Registerzeichen/-nummer</li>
                                <li>Inhaber, vertretungsberechtigte Organe bzw. persönlich haftende Gesellschafter</li>
                                <li>Vertretungsregelungen und Prokura</li>
                                <li>bestimmte Änderungen, Löschungen und Rechtsverhältnisse</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Wie erfolgt die Anmeldung?</h4>
                            <p class="text-sm text-[var(--text-muted)]">Registeranmeldungen werden elektronisch in öffentlich beglaubigter Form eingereicht (§ 12 HGB), regelmäßig über eine Notarin oder einen Notar. Nach dem aktuellen § 10 HGB werden Eintragungen durch ihre erstmalige Abrufbarkeit im elektronischen Registersystem bekannt gemacht.</p>
                            <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-amber)] p-3 rounded-r mt-2 text-xs text-[var(--text-muted)]">
                                <strong class="text-[var(--accent-amber)]">Hinweis:</strong> Die Altvorlage nennt Bundesanzeiger und „mindestens ein anderes Blatt". Das ist veraltet. Maßgeblich ist der aktuelle Gesetzeswortlaut.
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--code-bg)] p-4 border-l-4 border-[var(--accent-green)] rounded-r">
                            <h4 class="mt-0 text-[var(--accent-green)]">Deklaratorische Wirkung</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Die Rechtslage besteht schon vor der Eintragung; der Registereintrag bestätigt sie. Beispiel: Istkaufmann aufgrund eines Handelsgewerbes.</p>
                        </div>
                        <div class="bg-[var(--code-bg)] p-4 border-l-4 border-[var(--accent-violet)] rounded-r">
                            <h4 class="mt-0 text-[var(--accent-violet)]">Konstitutive Wirkung</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Die Rechtslage entsteht erst durch die Eintragung. Beispiele: Kaufmannseigenschaft nach § 2 HGB; Entstehung einer GmbH als solcher.</p>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Neu seit 2024: Gesellschaftsregister und eGbR</h4>
                        <p class="text-sm text-[var(--text-muted)] mb-0">Das Gesellschaftsregister ist vom Handelsregister zu unterscheiden. Eine dort eingetragene Gesellschaft bürgerlichen Rechts führt den Zusatz <strong>eGbR</strong>. Die Eintragung macht sie nicht allein deshalb zur Kauffrau und führt nicht zu einem Eintrag in HRA oder HRB. Für bestimmte registerbezogene Geschäfte, etwa Grundstücksgeschäfte oder Beteiligungen an einer GmbH, ist die vorherige Eintragung der GbR praktisch erforderlich.</p>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrProkura">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Publizität nach § 15 HGB – Fall Prokura</div>
                        <p class="text-sm text-[var(--text-muted)]">Adam Schnell e.K. widerruft die Prokura seines Mitarbeiters Alt. Das Erlöschen ist noch nicht eingetragen und bekannt gemacht. Alt bestellt bei einer Lieferantin Speziallack für 2.140 €. Die Lieferantin kennt den Widerruf nicht.</p>
                        <p class="text-sm text-[var(--text-muted)]">Kann Schnell der gutgläubigen Lieferantin den nicht eingetragenen Widerruf entgegenhalten?</p>
                        <div class="wiso-choices grid gap-2 mt-2">
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="ja">Ja, intern war die Prokura bereits beendet.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="nein">Grundsätzlich nein; eine eintragungspflichtige, nicht eingetragene Tatsache kann einem gutgläubigen Dritten regelmäßig nicht entgegengehalten werden (§ 15 Abs. 1 HGB).</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="immer">Nein, selbst wenn die Lieferantin den Widerruf kannte.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrHr1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Die Beauty Boutique GmbH: In welcher Abteilung stehen die Registerdaten?</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="hra">HRA</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="hrb">HRB</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="keine">In keiner; GmbHs stehen nicht im Handelsregister.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">The register is kept electronically by the courts. Entries and filed documents are generally publicly accessible.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div class="bg-[var(--panel-color)] p-5 border-2 border-[var(--accent-green)] rounded relative">
                            <span class="absolute top-2 right-4 text-4xl font-black text-[var(--accent-green)] opacity-30">A</span>
                            <h4 class="mt-0 text-[var(--accent-green)] border-b border-[var(--border-color)] pb-2">Section A · HRA</h4>
                            <p class="text-sm text-[var(--text-muted)]">In particular sole traders and partnerships.</p>
                            <div class="flex flex-wrap gap-1 mt-2">
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">e.K.</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">OHG</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">KG</span>
                            </div>
                        </div>
                        <div class="bg-[var(--panel-color)] p-5 border-2 border-[var(--accent-violet)] rounded relative">
                            <span class="absolute top-2 right-4 text-4xl font-black text-[var(--accent-violet)] opacity-30">B</span>
                            <h4 class="mt-0 text-[var(--accent-violet)] border-b border-[var(--border-color)] pb-2">Section B · HRB</h4>
                            <p class="text-sm text-[var(--text-muted)]">In particular corporations.</p>
                            <div class="flex flex-wrap gap-1 mt-2">
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">GmbH</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">UG</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">AG</span>
                                <span class="text-xs bg-[var(--code-bg)] border border-[var(--border-color)] px-2 py-1 rounded">KGaA</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">What becomes visible?</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>company name, registered office and business address</li>
                                <li>legal form and register reference/number</li>
                                <li>owner, authorised organs or personally liable partners</li>
                                <li>representation rules and Prokura</li>
                                <li>certain changes, deletions and legal relationships</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">How is the application made?</h4>
                            <p class="text-sm text-[var(--text-muted)]">Register applications are filed electronically in publicly certified form (§ 12 HGB), usually via a notary. Under the current § 10 HGB, entries are made known by their first retrievability in the electronic register system.</p>
                            <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-amber)] p-3 rounded-r mt-2 text-xs text-[var(--text-muted)]">
                                <strong class="text-[var(--accent-amber)]">Note:</strong> The old template mentions the Federal Gazette and "at least one other sheet". That is outdated. The current statutory wording is decisive.
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--code-bg)] p-4 border-l-4 border-[var(--accent-green)] rounded-r">
                            <h4 class="mt-0 text-[var(--accent-green)]">Declaratory effect</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">The legal position exists before the entry; the register entry confirms it. Example: actual merchant due to a commercial trade.</p>
                        </div>
                        <div class="bg-[var(--code-bg)] p-4 border-l-4 border-[var(--accent-violet)] rounded-r">
                            <h4 class="mt-0 text-[var(--accent-violet)]">Constitutive effect</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">The legal position arises only through the entry. Examples: merchant status under § 2 HGB; formation of a GmbH as such.</p>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">New since 2024: Company register and eGbR</h4>
                        <p class="text-sm text-[var(--text-muted)] mb-0">The company register is to be distinguished from the commercial register. A civil law partnership registered there bears the suffix <strong>eGbR</strong>. The entry does not by itself make it a merchant and does not lead to an entry in HRA or HRB. For certain register-related transactions, such as property transactions or shareholdings in a GmbH, prior registration of the GbR is practically required.</p>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrProkura">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Publicity under § 15 HGB – Prokura case</div>
                        <p class="text-sm text-[var(--text-muted)]">Adam Schnell e.K. revokes the Prokura of his employee Alt. The revocation is not yet entered and made known. Alt orders special lacquer for €2,140 from a supplier. The supplier does not know about the revocation.</p>
                        <p class="text-sm text-[var(--text-muted)]">Can Schnell invoke the unregistered revocation against the good-faith supplier?</p>
                        <div class="wiso-choices grid gap-2 mt-2">
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="ja">Yes, internally the Prokura had already ended.</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="nein">Generally no; a fact subject to registration but not entered cannot regularly be invoked against a good-faith third party (§ 15(1) HGB).</button>
                            <button class="wiso-choice text-left text-sm p-3 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="immer">No, even if the supplier knew about the revocation.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrHr1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Beauty Boutique GmbH: In which section are the register data?</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="hra">HRA</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="hrb">HRB</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="keine">In none; GmbHs are not in the commercial register.</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>`
                },

                /* ---------- 8.6 Firma ---------- */
                {
                    id: 'hr-firma',
                    titleDe: '8.6 Firma und Firmierung',
                    titleEn: '8.6 Company Name',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Die Firma ist nach § 17 HGB der Name, unter dem ein Kaufmann seine Geschäfte betreibt, unterschreibt sowie klagen und verklagt werden kann.</p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-green)] border-b border-[var(--border-color)] pb-2">Unternehmen</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Rechtlich-wirtschaftliche Einheit, die Ziele verfolgt und Entscheidungen trifft.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-blue)] border-b border-[var(--border-color)] pb-2">Betrieb</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Organisatorische Einheit, in der Leistungen erstellt werden; ein Unternehmen kann mehrere Betriebe haben.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-violet)] border-b border-[var(--border-color)] pb-2">Firma</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Name des Kaufmanns im Geschäftsverkehr – nicht das Gebäude und nicht die Tätigkeit selbst. Nicht im Handelsregister eingetragene Gewerbetreibende führen rechtlich keine Firma, dürfen aber zusätzlich zu ihrem bürgerlichen Namen eine Geschäftsbezeichnung verwenden.</p>
                        </div>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Firmengrundsätze und IHK-Prüfkriterien</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">Firmenwahrheit</strong><span class="text-[var(--text-muted)]">keine ersichtliche Irreführung über wesentliche geschäftliche Verhältnisse (§ 18 Abs. 2)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">Firmenklarheit</strong><span class="text-[var(--text-muted)]">kennzeichnungsgeeignet und unterscheidungskräftig (§ 18 Abs. 1)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">Firmenausschließlichkeit</strong><span class="text-[var(--text-muted)]">am selben Ort deutliche Unterscheidung von bereits registrierten Namen (§ 30)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-blue)] block">Firmenbeständigkeit</strong><span class="text-[var(--text-muted)]">Fortführung nur in gesetzlich geregelten Fällen (§§ 21–24)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-blue)] block">Firmenöffentlichkeit</strong><span class="text-[var(--text-muted)]">Anmeldung zum Register und Pflichtangaben im Geschäftsverkehr (§§ 29, 37a)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-blue)] block">Firmeneinheit</strong><span class="text-[var(--text-muted)]">ein Handelsgeschäft wird grundsätzlich unter einer einheitlichen Firma geführt</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-violet)] block">Rechtsformzusatz</strong><span class="text-[var(--text-muted)]">Haftungsverhältnisse müssen erkennbar sein, z. B. e.K., OHG, KG oder GmbH</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-violet)] block">Rechte Dritter</strong><span class="text-[var(--text-muted)]">Marken-, Namens- und Wettbewerbsrecht gesondert prüfen</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-violet)] block">Entscheidungskompetenz</strong><span class="text-[var(--text-muted)]">Die IHK kann vorprüfen; verbindlich entscheidet das Registergericht</span></div>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Firmenarten</h4>
                    <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
                    <tr><th class="w-1/4">Art</th><th class="w-1/2">Prinzip</th><th>Beispiel</th></tr>
                    <tr><td><strong>Personenfirma</strong></td><td class="text-[var(--text-muted)]">Name einer Person</td><td class="text-[var(--text-muted)]">Heinz Müller e.K.</td></tr>
                    <tr><td><strong>Sachfirma</strong></td><td class="text-[var(--text-muted)]">Hinweis auf Tätigkeit/Gegenstand</td><td class="text-[var(--text-muted)]">Rheinland Softwarelösungen e.K.</td></tr>
                    <tr><td><strong>Fantasiefirma</strong></td><td class="text-[var(--text-muted)]">erfundener, unterscheidungskräftiger Name</td><td class="text-[var(--text-muted)]">CodeHarbor e.K.</td></tr>
                    <tr><td><strong>Mischfirma</strong></td><td class="text-[var(--text-muted)]">Kombination mehrerer Elemente</td><td class="text-[var(--text-muted)]">Müller CodeWerk e.K.</td></tr>
                    </table></div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Firmenbaukasten</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <label class="text-sm font-semibold text-[var(--text-color)]">Name/Begriff
                                <input id="wisoFirmBase" value="Müller CodeWerk" class="w-full mt-1 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-2 text-sm">
                            </label>
                            <label class="text-sm font-semibold text-[var(--text-color)]">Rechtsform
                                <select id="wisoFirmForm" class="w-full mt-1 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-2 text-sm">
                                    <option>e.K.</option>
                                    <option>GmbH</option>
                                    <option>UG (haftungsbeschränkt)</option>
                                    <option>OHG</option>
                                    <option>KG</option>
                                </select>
                            </label>
                            <div id="wisoFirmOutput" class="md:col-span-2 p-4 rounded bg-[var(--code-bg)] border border-[var(--accent-green)] text-lg text-[var(--text-color)] font-mono">Müller CodeWerk e.K.</div>
                        </div>
                        <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">Der Baukasten prüft weder Unterscheidungskraft noch bestehende Register-, Marken- oder Namensrechte. Eine IHK-Voranfrage kann die registerrechtliche Einschätzung erleichtern; die endgültige Entscheidung trifft das Registergericht.</p>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrFirma1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Namensprüfung für Jana Otto: Welche Bezeichnung ist ohne Rechtsformzusatz offensichtlich unvollständig, wenn eine GmbH gegründet werden soll?</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="a">IT-Shopping GmbH</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="b">Jana Otto Internetshop</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="c">IT-Service Otto GmbH</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-amber)] p-3 rounded-r mt-4 text-sm text-[var(--text-muted)]">
                        <strong class="text-[var(--accent-amber)] block mb-1">Spezialfall Firmenfortführung und Haftung</strong>
                        Wer ein erworbenes Handelsgeschäft unter der bisherigen Firma fortführt, kann nach § 25 Abs. 1 HGB für frühere betriebliche Verbindlichkeiten haften. Ein Haftungsausschluss wirkt gegenüber Dritten nur unter den Voraussetzungen des § 25 Abs. 2 HGB, etwa durch Eintragung und Bekanntmachung oder Mitteilung. Bei der Übernahme eines Unternehmens ist der Firmenname daher keine bloße Marketingfrage, sondern kann unmittelbare Haftungsfolgen auslösen.
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">Under § 17 HGB, the company name (Firma) is the name under which a merchant conducts business, signs, and can sue and be sued.</p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-green)] border-b border-[var(--border-color)] pb-2">Enterprise</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Legal-economic unit pursuing goals and making decisions.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-blue)] border-b border-[var(--border-color)] pb-2">Establishment</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Organisational unit where services are produced; one enterprise can have several establishments.</p>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--accent-violet)] border-b border-[var(--border-color)] pb-2">Company name (Firma)</h4>
                            <p class="text-sm text-[var(--text-muted)] mb-0">Name of the merchant in business transactions — not the building and not the activity itself. Traders not entered in the commercial register legally have no Firma but may use a business designation in addition to their civil name.</p>
                        </div>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Company name principles and IHK review criteria</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">Truth</strong><span class="text-[var(--text-muted)]">no obvious misleading about essential business circumstances (§ 18(2))</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">Clarity</strong><span class="text-[var(--text-muted)]">suitable for identification and distinctive (§ 18(1))</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-green)] block">Exclusivity</strong><span class="text-[var(--text-muted)]">clear distinction from already registered names in the same place (§ 30)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-blue)] block">Continuity</strong><span class="text-[var(--text-muted)]">continuation only in legally regulated cases (§§ 21–24)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-blue)] block">Publicity</strong><span class="text-[var(--text-muted)]">registration and mandatory details in business transactions (§§ 29, 37a)</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-blue)] block">Unity</strong><span class="text-[var(--text-muted)]">a commercial business is generally conducted under one unified name</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-violet)] block">Legal form suffix</strong><span class="text-[var(--text-muted)]">liability relationships must be recognisable, e.g. e.K., OHG, KG or GmbH</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-violet)] block">Third-party rights</strong><span class="text-[var(--text-muted)]">trademark, name and competition law must be checked separately</span></div>
                        <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded"><strong class="text-[var(--accent-violet)] block">Decision competence</strong><span class="text-[var(--text-muted)]">the IHK can pre-review; the register court decides bindingly</span></div>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Company name types</h4>
                    <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
                    <tr><th class="w-1/4">Type</th><th class="w-1/2">Principle</th><th>Example</th></tr>
                    <tr><td><strong>Person name</strong></td><td class="text-[var(--text-muted)]">name of a person</td><td class="text-[var(--text-muted)]">Heinz Müller e.K.</td></tr>
                    <tr><td><strong>Descriptive name</strong></td><td class="text-[var(--text-muted)]">reference to activity/object</td><td class="text-[var(--text-muted)]">Rheinland Softwarelösungen e.K.</td></tr>
                    <tr><td><strong>Fantasy name</strong></td><td class="text-[var(--text-muted)]">invented, distinctive name</td><td class="text-[var(--text-muted)]">CodeHarbor e.K.</td></tr>
                    <tr><td><strong>Mixed name</strong></td><td class="text-[var(--text-muted)]">combination of several elements</td><td class="text-[var(--text-muted)]">Müller CodeWerk e.K.</td></tr>
                    </table></div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Company name builder</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <label class="text-sm font-semibold text-[var(--text-color)]">Name/term
                                <input id="wisoFirmBase" value="Müller CodeWerk" class="w-full mt-1 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-2 text-sm">
                            </label>
                            <label class="text-sm font-semibold text-[var(--text-color)]">Legal form
                                <select id="wisoFirmForm" class="w-full mt-1 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-2 text-sm">
                                    <option>e.K.</option>
                                    <option>GmbH</option>
                                    <option>UG (haftungsbeschränkt)</option>
                                    <option>OHG</option>
                                    <option>KG</option>
                                </select>
                            </label>
                            <div id="wisoFirmOutput" class="md:col-span-2 p-4 rounded bg-[var(--code-bg)] border border-[var(--accent-green)] text-lg text-[var(--text-color)] font-mono">Müller CodeWerk e.K.</div>
                        </div>
                        <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">The builder checks neither distinctiveness nor existing register, trademark or name rights. An IHK pre-inquiry can facilitate the register-law assessment; the final decision is made by the register court.</p>
                    </div>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-question="hrFirma1">
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-circle-question opacity-70 mr-2"></i>Name review for Jana Otto: Which designation is obviously incomplete without a legal form suffix if a GmbH is to be founded?</div>
                        <div class="wiso-choices flex flex-wrap gap-2">
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="a">IT-Shopping GmbH</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="b">Jana Otto Internetshop</button>
                            <button class="wiso-choice text-xs px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--code-bg)] hover:border-[var(--link-color)]" data-wiso-value="c">IT-Service Otto GmbH</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm"></div>
                    </div>

                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-amber)] p-3 rounded-r mt-4 text-sm text-[var(--text-muted)]">
                        <strong class="text-[var(--accent-amber)] block mb-1">Special case: continuation of company name and liability</strong>
                        Anyone who continues an acquired commercial business under the previous company name may be liable for earlier business obligations under § 25(1) HGB. A liability exclusion only takes effect against third parties under the conditions of § 25(2) HGB, e.g. by registration and publication or notification. When taking over a business, the company name is therefore not a mere marketing question but can trigger direct liability consequences.
                    </div>`
                },

                /* ---------- 8.7 Behördenweg ---------- */
                {
                    id: 'hr-behoerdenweg',
                    titleDe: '8.7 Anmeldungen und Gründungspflichten',
                    titleEn: '8.7 Registrations and Formation Obligations',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Welche Stellen zuständig sind, hängt von Tätigkeit, Rechtsform, Beschäftigten und Branche ab. Die Übersicht zeigt den typischen Weg eines gewerblichen IT-Unternehmens.</p>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Typischer Behördenweg</h4>
                    <div class="mt-3 space-y-3">
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center font-bold text-sm">1</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Rechtsform und Firma klären</strong><span class="text-sm text-[var(--text-muted)]">Haftung, Kapital, Leitung, Steuern, Formalitäten und gewünschte Außenwirkung abwägen. Firmenbezeichnung vorprüfen.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center font-bold text-sm">2</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Notar und Handelsregister – falls erforderlich</strong><span class="text-sm text-[var(--text-muted)]">Registeranmeldungen elektronisch und öffentlich beglaubigt; Kapitalgesellschaften benötigen zusätzliche Gründungsakte.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-amber)] text-white flex items-center justify-center font-bold text-sm">3</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Gewerbeamt</strong><span class="text-sm text-[var(--text-muted)]">Der Beginn eines stehenden Gewerbes ist gleichzeitig mit der Aufnahme bei der zuständigen Behörde anzuzeigen (§ 14 GewO). Die Behörde übermittelt die Daten regelmäßig unter anderem an IHK/HWK, Finanzamt, Bundesagentur für Arbeit und die DGUV zur Weiterleitung an die Berufsgenossenschaft.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-amber)] text-white flex items-center justify-center font-bold text-sm">4</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Finanzamt</strong><span class="text-sm text-[var(--text-muted)]">Der Fragebogen zur steuerlichen Erfassung ist grundsätzlich elektronisch, regelmäßig über ELSTER, zu übermitteln. Die steuerlichen Mitteilungen und Auskünfte müssen grundsätzlich innerhalb eines Monats nach Betriebseröffnung erfolgen (§ 138 Abs. 4 AO).</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-green)] text-white flex items-center justify-center font-bold text-sm">5</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Kammer und Berufsgenossenschaft</strong><span class="text-sm text-[var(--text-muted)]">Für typische IT-Gewerbe entsteht grundsätzlich IHK-Zugehörigkeit. Eine gesonderte IHK-Anmeldung ist regelmäßig nicht erforderlich. Der zuständige Unfallversicherungsträger ist zu ermitteln; die Mitteilungspflicht besteht grundsätzlich binnen einer Woche nach Beginn (§ 192 SGB VII), kann aber durch die übermittelte Gewerbeanzeige erfüllt werden.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-green)] text-white flex items-center justify-center font-bold text-sm">6</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Beschäftigte anmelden</strong><span class="text-sm text-[var(--text-muted)]">Vor der ersten Sozialversicherungsmeldung eine Betriebsnummer elektronisch beim Betriebsnummern-Service beantragen, danach Beschäftigte melden und die Lohnabrechnung organisieren.</span></div>
                        </div>
                    </div>

                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-violet)] p-3 rounded-r mt-4">
                        <strong class="text-[var(--accent-violet)] block mb-1 text-sm">Je nach Fall zusätzlich</strong>
                        <div class="flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">besondere Erlaubnisse</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">Handwerksrolle/HWK</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">Datenschutzorganisation</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">betriebliche Versicherungen</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">Bankkonto</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">Arbeits- und Gesundheitsschutz</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">Verträge, AGB, Impressum</span>
                        </div>
                        <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">Die Gewerbeanmeldung ersetzt weder eine nötige Registereintragung noch die steuerliche Erfassung.</p>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Geschäftsbriefe des Einzelkaufmanns</h4>
                    <p class="text-sm text-[var(--text-muted)]">Auf an bestimmte Empfänger gerichteten Geschäftsbriefen müssen nach § 37a HGB insbesondere Firma, Rechtsformbezeichnung nach § 19 Abs. 1 Nr. 1, Ort der Handelsniederlassung, Registergericht und Registernummer angegeben werden. Das gilt unabhängig von der Form des Geschäftsbriefs – also grundsätzlich auch elektronisch.</p>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-task>
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-pen-to-square opacity-70 mr-2"></i>Entwirf den Pflichtangaben-Block für Heinz</div>
                        <textarea data-wiso-save="hrBriefblock" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm" placeholder="Firma …&#10;Ort …&#10;Registergericht …&#10;HRA …"></textarea>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolBrief">Beispiel anzeigen</button>
                        </div>
                        <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolBrief">
                            Müller CodeWerk e.K. · Düsseldorf · Amtsgericht Düsseldorf · HRA [Registernummer]. Ergänzend gehören in der Praxis weitere Angaben in Impressum/Rechnungen, etwa Anschrift, Kontakt und steuerliche Angaben; diese folgen aus anderen Vorschriften.
                        </div>
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">Which authorities are responsible depends on the activity, legal form, employees and sector. The overview shows the typical path of a commercial IT business.</p>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Typical official path</h4>
                    <div class="mt-3 space-y-3">
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center font-bold text-sm">1</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Clarify legal form and company name</strong><span class="text-sm text-[var(--text-muted)]">Weigh liability, capital, management, taxes, formalities and desired external impact. Pre-check the company name.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center font-bold text-sm">2</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Notary and commercial register — if required</strong><span class="text-sm text-[var(--text-muted)]">Register applications electronically and publicly certified; corporations require additional formation documents.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-amber)] text-white flex items-center justify-center font-bold text-sm">3</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Trade office</strong><span class="text-sm text-[var(--text-muted)]">The start of a standing trade must be notified at the same time as commencement to the competent authority (§ 14 GewO). The authority regularly transmits the data to IHK/HWK, tax office, Federal Employment Agency and DGUV for forwarding to the professional association.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-amber)] text-white flex items-center justify-center font-bold text-sm">4</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Tax office</strong><span class="text-sm text-[var(--text-muted)]">The questionnaire for tax registration must generally be submitted electronically, usually via ELSTER. Tax notifications and information must generally be provided within one month of business commencement (§ 138(4) AO).</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-green)] text-white flex items-center justify-center font-bold text-sm">5</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Chamber and professional association</strong><span class="text-sm text-[var(--text-muted)]">Typical IT trades generally fall under IHK membership. A separate IHK registration is regularly not required. The competent accident insurance carrier must be determined; the notification duty generally exists within one week of commencement (§ 192 SGB VII) but can be fulfilled by the transmitted trade notification.</span></div>
                        </div>
                        <div class="flex gap-3 items-start bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded">
                            <div class="shrink-0 w-8 h-8 rounded-full bg-[var(--accent-green)] text-white flex items-center justify-center font-bold text-sm">6</div>
                            <div><strong class="text-[var(--heading-color)] block text-sm">Register employees</strong><span class="text-sm text-[var(--text-muted)]">Before the first social insurance report, apply for a company number electronically from the company number service; then register employees and organise payroll accounting.</span></div>
                        </div>
                    </div>

                    <div class="bg-[var(--code-bg)] border-l-4 border-[var(--accent-violet)] p-3 rounded-r mt-4">
                        <strong class="text-[var(--accent-violet)] block mb-1 text-sm">Additionally, depending on the case</strong>
                        <div class="flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">special permits</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">craft register/HWK</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">data protection organisation</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">business insurance</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">bank account</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">occupational health and safety</span>
                            <span class="bg-[var(--panel-color)] border border-[var(--border-color)] px-2 py-1 rounded">contracts, T&Cs, imprint</span>
                        </div>
                        <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">Trade registration replaces neither a necessary register entry nor tax registration.</p>
                    </div>

                    <h4 class="mt-4 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Business letters of the sole trader</h4>
                    <p class="text-sm text-[var(--text-muted)]">On business letters addressed to specific recipients, § 37a HGB requires in particular the company name, legal form designation under § 19(1) no. 1, place of the commercial establishment, register court and register number. This applies regardless of the form of the business letter — so in principle also electronically.</p>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-3" data-wiso-task>
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-pen-to-square opacity-70 mr-2"></i>Draft the mandatory details block for Heinz</div>
                        <textarea data-wiso-save="hrBriefblock" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm" placeholder="Company name …&#10;Place …&#10;Register court …&#10;HRA …"></textarea>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolBrief">Show example</button>
                        </div>
                        <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolBrief">
                            Müller CodeWerk e.K. · Düsseldorf · Amtsgericht Düsseldorf · HRA [register number]. In practice, further details also belong in the imprint/invoices, such as address, contact and tax details; these follow from other regulations.
                        </div>
                    </div>`
                },

                /* ---------- 8.8 Fallwerkstatt & Quiz ---------- */
                {
                    id: 'hr-fallwerkstatt',
                    titleDe: '8.8 Fallwerkstatt und Lernkontrolle',
                    titleEn: '8.8 Case Workshop and Learning Check',
                    htmlDe: `
                    <p class="text-[var(--text-muted)]">Jetzt verbindest du Gewerbebegriff, Kaufmannseigenschaft, Register, Firma und Gründungspflichten in vollständigen Falllösungen.</p>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-task>
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-scale-balanced opacity-70 mr-2"></i>Komplexfall Karl-Heinz Böhme</div>
                        <p class="text-sm text-[var(--text-muted)]">Karl-Heinz Böhme betreibt seit dem 01.02. in Düsseldorf einen <strong>kaufmännisch voll durchorganisierten Hard- und Softwarehandel</strong>, ist aber noch nicht im Handelsregister eingetragen. Das Registergericht fordert ihn zur Anmeldung auf.</p>
                        <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 space-y-1">
                            <li>Prüfe, ob ein Handelsgewerbe vorliegt.</li>
                            <li>Bestimme die Kaufmannsart und die Wirkung der späteren Eintragung.</li>
                            <li>Nenne die richtige Registerabteilung.</li>
                            <li>Formuliere eine zulässige Firma.</li>
                            <li>Erstelle einen vereinfachten Registereintrag.</li>
                        </ol>
                        <textarea data-wiso-save="hrBoehme" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm" placeholder="1. Handelsgewerbe …&#10;2. Kaufmannsart …"></textarea>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolBoehme">Musterlösung öffnen</button>
                        </div>
                        <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolBoehme">
                            <p><strong class="text-[var(--heading-color)]">1/2:</strong> Der selbstständig, dauerhaft und mit Gewinnerzielungsabsicht betriebene Handel ist ein Gewerbe. Weil der Betrieb ausdrücklich kaufmännisch voll organisiert ist, liegt ein Handelsgewerbe vor; Böhme ist Istkaufmann nach § 1 HGB. <strong class="text-[var(--heading-color)]">3:</strong> Als Einzelkaufmann wird er in Abteilung A (HRA) eingetragen. Die Eintragung ist deklaratorisch. <strong class="text-[var(--heading-color)]">4:</strong> z. B. „Böhme IT-Handel e.K." – vorbehaltlich Unterscheidbarkeit und Rechte Dritter. <strong class="text-[var(--heading-color)]">5:</strong> Vereinfachter Eintrag: Firma und Düsseldorf als Ort/Geschäftsanschrift; Unternehmensgegenstand Hard- und Softwarehandel; Inhaber Karl-Heinz Böhme; ggf. Prokura; Tag der Eintragung; HRA-Nummer.</p>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2"><i class="fa-solid fa-graduation-cap opacity-70 mr-2"></i>Abschlussquiz</h4>
                        <div id="wisoHrQuiz" class="mt-2 space-y-3"></div>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" id="wisoHrGradeQuiz">Quiz auswerten</button>
                            <button class="text-xs px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-muted)]" id="wisoHrReset">Lernstand zurücksetzen</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm" id="wisoHrQuizResult"></div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Selbstcheck</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>Gewerbe und Handelsgewerbe trennen.</li>
                                <li>Kaufmannsarten begründen.</li>
                                <li>deklaratorisch/konstitutiv erklären.</li>
                                <li>HRA und HRB zuordnen.</li>
                                <li>Firmengrundsätze anwenden.</li>
                                <li>typische Gründungsstellen nennen.</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Reflexion</h4>
                            <p class="text-sm text-[var(--text-muted)]">Welche drei Rechtsfehler könnten ein IT-Start-up besonders teuer zu stehen kommen? Begründe deine Auswahl.</p>
                            <textarea data-wiso-save="hrReflexion" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm"></textarea>
                            <div class="flex gap-2 flex-wrap mt-3">
                                <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolReflexion">Denkimpulse</button>
                            </div>
                            <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolReflexion">
                                Denkbar sind z. B. persönliche Haftung durch ungeeignete Rechtsform, Firmen-/Markenrechtsverletzungen, versäumte Registerpublizität, unzureichende Vertragsgestaltung, verspätete Mängelrüge beim beiderseitigen Handelskauf, Datenschutz- oder IT-Sicherheitsverstöße sowie fehlende Liquiditätsplanung. Entscheidend ist deine Begründung.
                            </div>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Rechtsgrundlagen und Quellen</h4>
                        <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                            <li><a href="https://www.gesetze-im-internet.de/hgb/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Handelsgesetzbuch – aktuelle amtliche Fassung</a> (insb. §§ 1–3, 5–6, 8–15, 17–30, 37a, 241a, 350, 377)</li>
                            <li><a href="https://www.gesetze-im-internet.de/bgb/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Bürgerliches Gesetzbuch – aktuelle amtliche Fassung</a></li>
                            <li><a href="https://www.gesetze-im-internet.de/gewo/__14.html" target="_blank" rel="noopener" class="text-[var(--link-color)]">§ 14 Gewerbeordnung – Gewerbeanzeige und Datenübermittlung</a></li>
                            <li><a href="https://www.gesetze-im-internet.de/ao_1977/__138.html" target="_blank" rel="noopener" class="text-[var(--link-color)]">§ 138 Abgabenordnung – steuerliche Anzeige und Monatsfrist</a></li>
                            <li><a href="https://www.handelsregister.de/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Gemeinsames Registerportal der Länder</a></li>
                            <li><a href="https://www.existenzgruendungsportal.de/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Existenzgründungsportal des Bundes</a></li>
                        </ul>
                        <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">Fachlich geprüft am 21.09.2026. Bei Abweichungen zwischen älteren Unterrichtsmaterialien und dem Gesetz wurde der aktuelle Gesetzeswortlaut verwendet. Die Einheit dient dem Unterricht und ersetzt keine Rechts- oder Steuerberatung.</p>
                    </div>`,
                    htmlEn: `
                    <p class="text-[var(--text-muted)]">Now you combine trade concept, merchant status, register, company name and formation obligations in complete case solutions.</p>

                    <div class="wiso-task bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4" data-wiso-task>
                        <div class="font-semibold text-sm mb-2"><i class="fa-solid fa-scale-balanced opacity-70 mr-2"></i>Complex case: Karl-Heinz Böhme</div>
                        <p class="text-sm text-[var(--text-muted)]">Karl-Heinz Böhme has operated a <strong>fully commercially organised hardware and software business</strong> in Düsseldorf since 01 February but is not yet entered in the commercial register. The register court demands registration.</p>
                        <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 space-y-1">
                            <li>Check whether a commercial trade exists.</li>
                            <li>Determine the merchant type and the effect of the later entry.</li>
                            <li>Name the correct register section.</li>
                            <li>Formulate an admissible company name.</li>
                            <li>Create a simplified register entry.</li>
                        </ol>
                        <textarea data-wiso-save="hrBoehme" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm" placeholder="1. Commercial trade …&#10;2. Merchant type …"></textarea>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolBoehme">Open sample solution</button>
                        </div>
                        <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolBoehme">
                            <p><strong class="text-[var(--heading-color)]">1/2:</strong> The independently, permanently and profit-oriented trade is a trade. Because the business is explicitly fully commercially organised, a commercial trade exists; Böhme is an actual merchant under § 1 HGB. <strong class="text-[var(--heading-color)]">3:</strong> As a sole trader he is entered in Section A (HRA). The entry is declaratory. <strong class="text-[var(--heading-color)]">4:</strong> e.g. "Böhme IT-Handel e.K." — subject to distinctiveness and third-party rights. <strong class="text-[var(--heading-color)]">5:</strong> Simplified entry: company name and Düsseldorf as place/business address; business object hardware and software trade; owner Karl-Heinz Böhme; if applicable Prokura; date of entry; HRA number.</p>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2"><i class="fa-solid fa-graduation-cap opacity-70 mr-2"></i>Final Quiz</h4>
                        <div id="wisoHrQuiz" class="mt-2 space-y-3"></div>
                        <div class="flex gap-2 flex-wrap mt-3">
                            <button class="text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" id="wisoHrGradeQuiz">Grade quiz</button>
                            <button class="text-xs px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-muted)]" id="wisoHrReset">Reset progress</button>
                        </div>
                        <div class="wiso-feedback hidden mt-3 p-3 rounded text-sm" id="wisoHrQuizResult"></div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Self-check</h4>
                            <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                                <li>Distinguish trade and commercial trade.</li>
                                <li>Justify merchant types.</li>
                                <li>Explain declaratory/constitutive.</li>
                                <li>Assign HRA and HRB.</li>
                                <li>Apply company name principles.</li>
                                <li>Name typical formation authorities.</li>
                            </ul>
                        </div>
                        <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                            <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Reflection</h4>
                            <p class="text-sm text-[var(--text-muted)]">Which three legal mistakes could be particularly expensive for an IT start-up? Justify your choice.</p>
                            <textarea data-wiso-save="hrReflexion" class="w-full mt-2 bg-[var(--code-bg)] text-[var(--text-color)] border border-[var(--border-color)] rounded p-3 text-sm"></textarea>
                            <div class="flex gap-2 flex-wrap mt-3">
                                <button class="wiso-reveal text-xs px-3 py-1.5 rounded bg-[var(--link-color)] text-white" data-wiso-target="hrSolReflexion">Thought prompts</button>
                            </div>
                            <div class="wiso-solution hidden mt-3 p-3 rounded bg-[var(--bg-color)] border-l-4 border-[var(--accent-green)] text-sm text-[var(--text-muted)]" id="hrSolReflexion">
                                Conceivable are e.g. personal liability through an unsuitable legal form, company/trademark rights infringements, missed register publicity, inadequate contract drafting, late notice of defects in a bilateral commercial purchase, data protection or IT security violations, and missing liquidity planning. Your reasoning is decisive.
                            </div>
                        </div>
                    </div>

                    <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded mt-4">
                        <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Legal bases and sources</h4>
                        <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1 mb-0">
                            <li><a href="https://www.gesetze-im-internet.de/hgb/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Commercial Code (HGB) — current official version</a> (in particular §§ 1–3, 5–6, 8–15, 17–30, 37a, 241a, 350, 377)</li>
                            <li><a href="https://www.gesetze-im-internet.de/bgb/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Civil Code (BGB) — current official version</a></li>
                            <li><a href="https://www.gesetze-im-internet.de/gewo/__14.html" target="_blank" rel="noopener" class="text-[var(--link-color)]">§ 14 Trade Regulation Act — trade notification and data transmission</a></li>
                            <li><a href="https://www.gesetze-im-internet.de/ao_1977/__138.html" target="_blank" rel="noopener" class="text-[var(--link-color)]">§ 138 Fiscal Code — tax notification and one-month deadline</a></li>
                            <li><a href="https://www.handelsregister.de/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Joint Register Portal of the Länder</a></li>
                            <li><a href="https://www.existenzgruendungsportal.de/" target="_blank" rel="noopener" class="text-[var(--link-color)]">Federal Start-up Portal</a></li>
                        </ul>
                        <p class="text-xs text-[var(--text-muted)] mt-2 mb-0">Reviewed on 21 September 2026. Where older teaching materials and the law diverge, the current statutory wording has been used. The unit serves teaching and does not replace legal or tax advice.</p>
                    </div>`
                }
            ]
        },

        /* ============ 9. TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: '9. TLDR',
            titleEn: '9. TLDR',
            introDe: 'Die wichtigsten WiSo-Themen kompakt auf einen Blick.',
            introEn: 'The most important WiSo topics compactly at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: '9.1 Auf einen Blick',
                    titleEn: '9.1 At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
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
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-building opacity-70"></i><span>Unternehmensformen</span></div>
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
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-scale-balanced opacity-70"></i><span>Handelsrecht</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Istkaufmann: § 1 HGB, deklaratorisch</li>
                                <li>Kannkaufmann: § 2 HGB, konstitutiv</li>
                                <li>Formkaufmann: § 6 HGB</li>
                                <li>HRA: Einzel/OHG/KG</li>
                                <li>HRB: GmbH/UG/AG</li>
                            </ul>
                        </div>
                    </div>`,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-heart opacity-70"></i><span>Social Security</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>KV, UV, RV, ALV, PV</li>
                                <li>UV: employer only</li>
                                <li>Rest: 50/50 employer &amp; employee</li>
                                <li>Pay-as-you-go system</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-building opacity-70"></i><span>Corporate Forms</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Sole proprietorship: unlimited</li>
                                <li>OHG: all fully liable</li>
                                <li>KG: general partner + limited partner</li>
                                <li>GmbH: from €25,000 share capital</li>
                                <li>AG: from €50,000 share capital</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chess-knight opacity-70"></i><span>Market Structures</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Polypoly: many/many, P = MC</li>
                                <li>Monopoly: one/many, MR = MC</li>
                                <li>Oligopoly: few/many, game theory</li>
                                <li>Monopsony: many/one</li>
                                <li>Lerner index &amp; HHI</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chart-line opacity-70"></i><span>Supply &amp; Demand</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Q<sub>D</sub> = a − b·P (falling)</li>
                                <li>Q<sub>S</sub> = c + d·P (rising)</li>
                                <li>Equilibrium: Q<sub>D</sub> = Q<sub>S</sub></li>
                                <li>Elasticity ε = %ΔQ / %ΔP</li>
                                <li>CS + PS = welfare</li>
                            </ul>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-scale-balanced opacity-70"></i><span>Commercial Law</span></div>
                            <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                                <li>Actual merchant: § 1 HGB, declaratory</li>
                                <li>Optional merchant: § 2 HGB, constitutive</li>
                                <li>Formal merchant: § 6 HGB</li>
                                <li>HRA: sole/OHG/KG</li>
                                <li>HRB: GmbH/UG/AG</li>
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
            { icon: 'fa-people-group', href: 'https://www.gesetze-im-internet.de/betrvg/',                   target: '_blank', labelDe: 'Betriebsverfassungsgesetz (BetrVG)', labelEn: 'Works Constitution Act' },
            { icon: 'fa-chess-knight', href: 'https://de.wikipedia.org/wiki/Marktform',                      target: '_blank', labelDe: 'Marktformen (Wikipedia)',         labelEn: 'Market structures (Wikipedia)' },
            { icon: 'fa-chart-line',   href: 'https://de.wikipedia.org/wiki/Angebot_und_Nachfrage',          target: '_blank', labelDe: 'Angebot & Nachfrage (Wikipedia)', labelEn: 'Supply & demand (Wikipedia)' },
            { icon: 'fa-scale-balanced', href: 'https://www.gesetze-im-internet.de/hgb/',                    target: '_blank', labelDe: 'Handelsgesetzbuch (HGB)',         labelEn: 'Commercial Code (HGB)' },
            { icon: 'fa-book',         href: 'https://www.gesetze-im-internet.de/bgb/',                       target: '_blank', labelDe: 'Bürgerliches Gesetzbuch (BGB)',   labelEn: 'Civil Code (BGB)' }
        ]
    },

    footer: {
        textDe: 'WiSo-Referenz · v3.5 · Dual Lang',
        textEn: 'WiSo Cheatsheet · v3.5 · Dual Lang'
    }
});