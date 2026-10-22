// resources/topics/mukb/controllers/mukb-interactions.js
// MuKb side-effect controller:
//   - persists notes fields (data-save) to localStorage
//   - export / reset notes (Kundenakte section)
//   - evaluates inline quizzes (data-mukb-quiz="…")
// Idempotent: safe against re-renders, guarded by per-element flags.

(function () {
    'use strict';
    var KEY = 'mukb-notes-v1';
    var state = {};
    try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) { state = {}; }

    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    }

    // ---------- quiz answer keys ----------
    var ANSWERS = {
        'lasten-pflichten': [
            { answer: 0, explanation: 'Der Auftraggeber verantwortet den Bedarf und die Anforderungen; Unterstützung ist möglich.' },
            { answer: 1, explanation: 'Der Auftragnehmer beschreibt die Lösung und stimmt sie mit dem Auftraggeber ab.' },
            { answer: 2, explanation: 'Das Erfassen einer Rückgabe ist eine Funktion. Antwortzeit beschreibt Qualität; Budget ist eine Randbedingung.' },
            { answer: 0, explanation: 'Einfach ist auslegbar. Kläre Nutzende, Aufgabe und messbare Erfolgskriterien.' },
            { answer: 1, explanation: 'Lösungsneutralität ist sinnvoll; feststehende technische Randbedingungen dürfen dennoch vorgegeben werden.' },
            { answer: 2, explanation: 'Annahmen dürfen nicht mit bestätigten Anforderungen verwechselt werden.' },
            { answer: 0, explanation: 'Eindeutige Zuordnungen zeigen, warum etwas umgesetzt und wie es geprüft wird.' },
            { answer: 1, explanation: 'Danach entscheiden die zuständigen Beteiligten; neue Versionen und Tests folgen bei Zustimmung.' },
            { answer: 2, explanation: 'Ein Testergebnis liefert einen Nachweis, ersetzt aber nicht die Abnahmeentscheidung.' },
            { answer: 0, explanation: 'Mindestens 95 von 100 müssen die Grenze unter den vereinbarten Bedingungen erfüllen.' },
            { answer: 1, explanation: 'Die Prioritätsbegriffe werden ausdrücklich vereinbart; Soll ist hier keine freie Streichoption.' },
            { answer: 2, explanation: '„Vielleicht“ begründet noch keine abgestimmte Anforderung. Nutzen, Umfang und Folgen müssen geklärt werden.' }
        ],
        'soll-ist': [
            { answer: 0, explanation: 'Die 10 Stunden sind gemessene Daten. Die 4 Stunden sind ein Ziel; die Einführung ist eine Maßnahme.' },
            { answer: 1, explanation: '30 h − 18 h = +12 h. Die Einheit bleibt Stunden. +66,67 % wäre die relative Abweichung.' },
            { answer: 2, explanation: '144 ÷ 200 × 100 = 72 %. 72 % − 90 % = −18 Prozentpunkte. Relativ zum Soll wären es −20 %.' },
            { answer: 0, explanation: 'Die Gliederung des Leistungsumfangs gehört zum PSP. Zeitliche Lage und Abhängigkeiten werden zusätzlich geplant.' },
            { answer: 1, explanation: 'FAZ(D) = max(4,5) = 5. Beide Voraussetzungen müssen erfüllt sein.' },
            { answer: 2, explanation: 'GP = 0 bedeutet keinen zeitlichen Spielraum gegenüber dem Projektende. Eine Verzögerung ohne Ausgleich verschiebt das Ende.' },
            { answer: 0, explanation: '5 − 2 = 3 Arbeitstage. Die belegten Intervalle sind 2–3, 3–4 und 4–5.' },
            { answer: 1, explanation: 'Das künftige Ende bei 14 ist geschätzt. Der tatsächliche Abschluss von A und die bisher verbrauchten Kosten sind Ist-Daten.' },
            { answer: 2, explanation: '2.550 − 2.700 = −150 €. Da geplante Arbeit fehlt, ist weniger Geldabfluss noch kein Nachweis einer Einsparung.' },
            { answer: 0, explanation: 'Der Test mit zehn unterschiedlichen Nummern prüft die geforderte Funktion unmittelbar. Die anderen Aussagen prüfen keine eindeutige Nummerierung.' },
            { answer: 0, explanation: 'GP = SAZ − FAZ = 3 − 2 = 1. FP = FAZ des unmittelbaren Nachfolgers − FEZ = 5 − 4 = 1.' },
            { answer: 1, explanation: 'Die Wirkungskontrolle misst die tatsächlichen Supportkennzahlen. Technische Funktionsprüfung allein belegt keine Prozessverbesserung.' }
        ]
    };

    // ---------- notes ----------
    function initNotes() {
        var fields = document.querySelectorAll('[data-save]');
        fields.forEach(function (el) {
            if (el.__mukbSave) return;
            el.__mukbSave = true;
            if (typeof state[el.id] === 'string') el.value = state[el.id];
            el.addEventListener('input', function () {
                state[el.id] = el.value;
                save();
                setStatus('Ungespeicherte Änderungen.');
            });
        });

        var saveBtn = document.getElementById('mukb-save');
        if (saveBtn && !saveBtn.__mukbBound) {
            saveBtn.__mukbBound = true;
            saveBtn.addEventListener('click', function () {
                save();
                setStatus('Lokal gespeichert: ' + new Date().toLocaleString('de-DE'));
            });
        }

        var exportBtn = document.getElementById('mukb-export');
        if (exportBtn && !exportBtn.__mukbBound) {
            exportBtn.__mukbBound = true;
            exportBtn.addEventListener('click', function () {
                var parts = ['# Kanzlei Bergmann – Projektnotizen', 'Stand: ' + new Date().toLocaleString('de-DE'), ''];
                fields.forEach(function (el) {
                    var label = document.querySelector('label[for="' + el.id + '"]');
                    parts.push('## ' + (label ? label.textContent : el.id), el.value, '');
                });
                var blob = new Blob([parts.join('\n')], { type: 'text/markdown;charset=utf-8' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'Kanzlei_Bergmann_Notizen.md';
                a.click();
                setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
                setStatus('Download angestoßen. Bitte sicher ablegen.');
            });
        }

        var printBtn = document.getElementById('mukb-print');
        if (printBtn && !printBtn.__mukbBound) {
            printBtn.__mukbBound = true;
            printBtn.addEventListener('click', function () { window.print(); });
        }

        var resetBtn = document.getElementById('mukb-reset');
        if (resetBtn && !resetBtn.__mukbBound) {
            resetBtn.__mukbBound = true;
            resetBtn.addEventListener('click', function () {
                if (!confirm('Lokale Projektnotizen löschen? Vorher gegebenenfalls exportieren.')) return;
                fields.forEach(function (el) { el.value = ''; });
                state = {};
                try { localStorage.removeItem(KEY); } catch (_) {}
                setStatus('Arbeitsbereich geleert.');
            });
        }
    }

    function setStatus(msg) {
        var el = document.getElementById('mukb-status');
        if (el) el.textContent = msg;
    }

    // ---------- quizzes ----------
    function initQuiz(name) {
        var root = document.querySelector('[data-mukb-quiz="' + name + '"]');
        if (!root || root.__mukbQuizBound) return;
        root.__mukbQuizBound = true;

        var answerKey = ANSWERS[name] || [];
        var feedback = root.querySelector('.mukb-quiz-feedback');
        var totalEl = root.querySelector('.mukb-quiz-total');

        var checkBtn = root.querySelector('[data-mukb-check="' + name + '"]');
        if (checkBtn) {
            checkBtn.addEventListener('click', function () {
                var fields = root.querySelectorAll('[data-q]');
                var correct = 0, missing = 0;
                var out = [];
                fields.forEach(function (f) {
                    var idx = Number(f.getAttribute('data-q'));
                    var picked = f.querySelector('input:checked');
                    var msg;
                    if (!picked) {
                        missing++;
                        msg = '<div class="p-2 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--accent-amber)]/10 text-xs">Frage ' + (idx + 1) + ': Bitte eine Antwort auswählen.</div>';
                        out.push(msg);
                        return;
                    }
                    var ok = Number(picked.value) === answerKey[idx].answer;
                    if (ok) correct++;
                    msg = '<div class="p-2 rounded border-l-4 ' + (ok ? 'border-[var(--accent-green)] bg-[var(--accent-green)]/10' : 'border-[var(--accent-red)] bg-[var(--accent-red)]/10') + ' text-xs">' +
                        'Frage ' + (idx + 1) + ': ' + (ok ? 'Richtig. ' : 'Noch nicht richtig. ') + answerKey[idx].explanation + '</div>';
                    out.push(msg);
                });
                if (feedback) feedback.innerHTML = out.join('');
                if (totalEl) totalEl.textContent = correct + ' / ' + fields.length + ' richtig.' + (missing ? ' ' + missing + ' noch unbeantwortet.' : '');
            });
        }

        var resetQuizBtn = root.querySelector('[data-mukb-reset="' + name + '"]');
        if (resetQuizBtn) {
            resetQuizBtn.addEventListener('click', function () {
                root.querySelectorAll('input[type="radio"]').forEach(function (x) { x.checked = false; });
                if (feedback) feedback.innerHTML = '';
                if (totalEl) totalEl.textContent = 'Zurückgesetzt.';
            });
        }
    }

    // ---------- scan / start ----------
    function scan() {
        initNotes();
        initQuiz('lasten-pflichten');
        initQuiz('soll-ist');
    }

    function start() {
        scan();
        setInterval(scan, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();