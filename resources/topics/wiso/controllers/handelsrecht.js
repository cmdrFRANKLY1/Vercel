// resources/topics/wiso/controllers/handelsrecht.js
// WiSo Handelsrecht section controller:
//   - multiple-choice tasks (data-wiso-question)
//   - reveal solutions (data-wiso-target)
//   - textareas with localStorage (data-wiso-save)
//   - Firmenbaukasten (wisoFirmBase / wisoFirmForm / wisoFirmOutput)
//   - final quiz (wisoHrQuiz)
// Robust against re-renders via periodic re-scan.
//
// Loaded as a side-effect module from topic_wiso.js. No exports needed.

import { QA, QUIZ_QUESTIONS } from '../data/quiz-data.js';

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

    /* ---- Green/red feedback that resets after 3 seconds ---- */
    function flashChoice(btn, ok, feedbackEl, msg) {
        btn.classList.remove('border-[var(--border-color)]', 'border-[var(--accent-green)]', 'border-[var(--accent-red)]',
                              'bg-[var(--accent-green)]/10', 'bg-[var(--accent-red)]/10');
        btn.classList.add(ok ? 'border-[var(--accent-green)]' : 'border-[var(--accent-red)]');
        btn.classList.add(ok ? 'bg-[var(--accent-green)]/10' : 'bg-[var(--accent-red)]/10');

        feedbackEl.classList.remove('hidden');
        feedbackEl.className = 'wiso-feedback mt-3 p-3 rounded text-sm ' +
            (ok ? 'bg-[var(--accent-green)]/10 border-l-4 border-[var(--accent-green)] text-[var(--text-color)]'
                : 'bg-[var(--accent-red)]/10 border-l-4 border-[var(--accent-red)] text-[var(--text-color)]');
        feedbackEl.textContent = (ok ? '✓ ' : 'Noch nicht. ') + msg;

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
            quiz.__questions = QUIZ_QUESTIONS;
            QUIZ_QUESTIONS.forEach(function (q, i) {
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