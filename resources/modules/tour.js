/* resources/modules/tour.js
 * Guided tour (Steam-like): spotlight overlay, step card, LMB/RMB handling.
 * Depends on: state.js (App.state.isGerman, App.state.tourActive,
 *                       App.state.tourIndex, App.state.tourAutoStarted)
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[tour] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;

    /* ----------------------------------------------------------
       Step definitions
       ---------------------------------------------------------- */
    const TOUR_STEPS = [
        {
            target: null,
            titleDe: 'Willkommen im neuen Update!',
            titleEn: 'Welcome to the new update!',
            bodyDe: 'Diese kurze Tour zeigt dir die wichtigsten Neuerungen.<br><br><b>Linke Maustaste</b> → weiter &nbsp;·&nbsp; <b>Rechte Maustaste</b> → Tour überspringen.',
            bodyEn: 'This short tour shows you the most important features.<br><br><b>Left mouse button</b> → next &nbsp;·&nbsp; <b>Right mouse button</b> → skip tour.'
        },
        {
            target: '#dashboard-container',
            titleDe: 'Dashboard — Themen',
            titleEn: 'Dashboard — Topics',
            bodyDe: 'Hier findest du alle Themen als übersichtliche Kacheln. Klicke auf eine Kachel, um das Thema zu öffnen.',
            bodyEn: 'Here you find all topics as clear tiles. Click a tile to open the topic.'
        },
        {
            target: '#sidebarToggleBtn',
            titleDe: 'Sidebar ein-/ausklappen',
            titleEn: 'Toggle the sidebar',
            bodyDe: 'Blende die Seitenleiste ein oder aus, um mehr Platz für den Inhalt zu gewinnen.',
            bodyEn: 'Show or hide the sidebar to gain more space for content.'
        },
        {
            target: '#themeToggleBtn',
            titleDe: 'Hell / Dunkel',
            titleEn: 'Light / Dark',
            bodyDe: 'Wechsle blitzschnell zwischen hellem und dunklem Erscheinungsbild.',
            bodyEn: 'Quickly switch between light and dark appearance.'
        },
        {
            target: 'button[onclick="App.sharedFiles.open()"]',
            titleDe: 'Freigegebene Dateien',
            titleEn: 'Shared Files',
            bodyDe: 'Öffne die Übersicht aller freigegebenen PDFs, PPTs, HTMLs, DOCs und XLSs.',
            bodyEn: 'Open the overview of all shared PDFs, PPTs, HTMLs, DOCs and XLSs.'
        },
        {
            target: 'button[onclick="App.settings.open()"]',
            titleDe: 'Einstellungen',
            titleEn: 'Settings',
            bodyDe: 'Hier kannst du Sprache, Farbschema und weitere Optionen anpassen.',
            bodyEn: 'Customize language, color scheme and other options here.'
        }
    ];

    /* ----------------------------------------------------------
       Module-local runtime fields
       ---------------------------------------------------------- */
    let tourTargetEl = null;
    let tourRAF = 0;

    /* ----------------------------------------------------------
       DOM element lookup
       ---------------------------------------------------------- */
    function tourEls() {
        return {
            overlay:   document.getElementById('tourOverlay'),
            spotlight: document.getElementById('tourSpotlight'),
            card:      document.getElementById('tourCard'),
            title:     document.getElementById('tourTitle'),
            body:      document.getElementById('tourBody'),
            label:     document.getElementById('tourStepLabel'),
            progress:  document.getElementById('tourProgress')
        };
    }

    /* ----------------------------------------------------------
       Spotlight pre-positioning (before the overlay fades in)
       ---------------------------------------------------------- */
    function prePositionSpotlight() {
        const el = tourEls();
        if (!el.spotlight) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        for (let i = 0; i < TOUR_STEPS.length; i++) {
            if (!TOUR_STEPS[i].target) continue;
            const t = document.querySelector(TOUR_STEPS[i].target);
            if (!t) continue;

            const r = t.getBoundingClientRect();
            const pad = 8;
            el.spotlight.classList.remove('is-full-dim');
            el.spotlight.style.left   = (r.left - pad) + 'px';
            el.spotlight.style.top    = (r.top - pad) + 'px';
            el.spotlight.style.width  = (r.width + pad * 2) + 'px';
            el.spotlight.style.height = (r.height + pad * 2) + 'px';
            return;
        }

        el.spotlight.classList.add('is-full-dim');
        el.spotlight.style.left   = (vw / 2) + 'px';
        el.spotlight.style.top    = (vh / 2) + 'px';
        el.spotlight.style.width  = '0px';
        el.spotlight.style.height = '0px';
    }

    /* ----------------------------------------------------------
       Start / end
       ---------------------------------------------------------- */
    function start() {
        if (state.tourActive) return;

        const el = tourEls();
        if (!el.overlay || !el.spotlight || !el.card) return;

        state.tourActive = true;
        state.tourIndex = 0;

        el.spotlight.style.transition = 'none';
        el.card.style.transition = 'none';
        prePositionSpotlight();
        el.spotlight.style.opacity = '0';

        el.overlay.classList.add('open');
        el.overlay.setAttribute('aria-hidden', 'false');

        showStep(0);

        requestAnimationFrame(() => {
            el.spotlight.style.transition = '';
            el.card.style.transition = '';
        });
    }

    function end() {
        if (!state.tourActive) return;
        state.tourActive = false;
        tourTargetEl = null;

        const el = tourEls();
        if (el.overlay) {
            el.overlay.classList.remove('open');
            el.overlay.setAttribute('aria-hidden', 'true');
        }
    }

    /* ----------------------------------------------------------
       Step navigation
       ---------------------------------------------------------- */
    function next() {
        if (!state.tourActive) return;
        if (state.tourIndex >= TOUR_STEPS.length - 1) { end(); return; }
        state.tourIndex++;
        showStep(state.tourIndex);
    }

    function showStep(i) {
        const step = TOUR_STEPS[i];
        const el = tourEls();
        if (!step || !el.overlay) return;

        el.title.textContent = state.isGerman ? step.titleDe : step.titleEn;
        el.body.innerHTML = state.isGerman ? step.bodyDe : step.bodyEn;
        el.label.textContent = (i === 0)
            ? (state.isGerman ? 'Einführung' : 'Introduction')
            : (state.isGerman
                ? 'Feature ' + i + ' von ' + (TOUR_STEPS.length - 1)
                : 'Feature ' + i + ' of ' + (TOUR_STEPS.length - 1));
        el.progress.textContent = (i + 1) + ' / ' + TOUR_STEPS.length;

        tourTargetEl = step.target ? document.querySelector(step.target) : null;

        positionElements();
    }

    /* ----------------------------------------------------------
       Positioning (spotlight + card)
       ---------------------------------------------------------- */
    function positionElements() {
        const el = tourEls();
        if (!el.spotlight || !el.card) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pad = 8;

        // --- Spotlight ---
        if (!tourTargetEl) {
            el.spotlight.classList.add('is-full-dim');
            el.spotlight.style.left   = (vw / 2) + 'px';
            el.spotlight.style.top    = (vh / 2) + 'px';
            el.spotlight.style.width  = '0px';
            el.spotlight.style.height = '0px';
            el.spotlight.style.opacity = '1';
        } else {
            el.spotlight.classList.remove('is-full-dim');
            const r = tourTargetEl.getBoundingClientRect();
            el.spotlight.style.left   = (r.left - pad) + 'px';
            el.spotlight.style.top    = (r.top - pad) + 'px';
            el.spotlight.style.width  = (r.width + pad * 2) + 'px';
            el.spotlight.style.height = (r.height + pad * 2) + 'px';
            el.spotlight.style.opacity = '1';
        }

        // --- Card ---
        const cw = Math.min(380, vw - 32);
        el.card.style.width = cw + 'px';

        const cardH = el.card.offsetHeight || 200;
        const gap = 18;

        let left, top;

        if (!tourTargetEl) {
            left = (vw - cw) / 2;
            top = (vh - cardH) / 2;
        } else {
            const r = tourTargetEl.getBoundingClientRect();
            const spaceRight = vw - r.right;
            const spaceLeft  = r.left;
            const spaceBelow = vh - r.bottom;
            const spaceAbove = r.top;

            if (spaceRight >= cw + gap + 16) {
                left = r.right + gap;
                top = r.top;
            } else if (spaceBelow >= cardH + gap + 16) {
                left = r.left;
                top = r.bottom + gap;
            } else if (spaceLeft >= cw + gap + 16) {
                left = r.left - cw - gap;
                top = r.top;
            } else if (spaceAbove >= cardH + gap + 16) {
                left = r.left;
                top = r.top - cardH - gap;
            } else {
                left = (vw - cw) / 2;
                top = (vh - cardH) / 2;
            }
        }

        left = Math.max(12, Math.min(left, vw - cw - 12));
        top  = Math.max(12, Math.min(top,  vh - cardH - 12));

        el.card.style.transform = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
        el.card.style.opacity = '1';
    }

    /* ----------------------------------------------------------
       Reposition on scroll / resize (throttled via rAF)
       ---------------------------------------------------------- */
    function scheduleReposition() {
        if (!state.tourActive || tourRAF) return;
        tourRAF = requestAnimationFrame(() => {
            tourRAF = 0;
            if (state.tourActive) positionElements();
        });
    }

    /* ----------------------------------------------------------
       Restart (called from the Help button in settings)
       ---------------------------------------------------------- */
    function restart() {
        if (App.settings && typeof App.settings.close === 'function') App.settings.close();
        if (App.themes && typeof App.themes.closeModal === 'function') App.themes.closeModal();
        if (App.settings && typeof App.settings.closeImpressum === 'function') App.settings.closeImpressum();
        if (App.calendar && typeof App.calendar.close === 'function') App.calendar.close();
        if (App.dashboard && typeof App.dashboard.closeModal === 'function') App.dashboard.closeModal();
        if (App.sharedFiles && typeof App.sharedFiles.close === 'function') App.sharedFiles.close();
        if (App.reports && typeof App.reports.closeModal === 'function') App.reports.closeModal();

        if (state.tourActive) end();

        window.scrollTo(0, 0);
        setTimeout(() => start(), 60);
    }

    /* ----------------------------------------------------------
       Event listeners
       ---------------------------------------------------------- */
    function setupListeners() {
        const overlay = document.getElementById('tourOverlay');
        if (!overlay) {
            console.warn('[tour] Overlay missing');
            return;
        }

        overlay.addEventListener('mousedown', (e) => {
            if (!state.tourActive) return;
            e.preventDefault();
            e.stopPropagation();
            if (e.button === 2) end();
            else if (e.button === 0) next();
        }, { passive: false });

        overlay.addEventListener('contextmenu', (e) => {
            if (!state.tourActive) return;
            e.preventDefault();
            e.stopPropagation();
            end();
        }, { passive: false });

        overlay.addEventListener('wheel', (e) => {
            if (!state.tourActive) return;
            e.preventDefault();
        }, { passive: false });

        overlay.addEventListener('touchmove', (e) => {
            if (!state.tourActive) return;
            e.preventDefault();
        }, { passive: false });

        document.addEventListener('keydown', (e) => {
            if (!state.tourActive) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                end();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                next();
            }
        });

        window.addEventListener('scroll', scheduleReposition, { passive: true });
        window.addEventListener('resize', scheduleReposition, { passive: true });
    }

    /* ----------------------------------------------------------
       Shift+F5 restarts the tour (capture phase so it wins)
       ---------------------------------------------------------- */
    function setupShiftF5() {
        window.addEventListener('keydown', (e) => {
            const isF5 = (e.key === 'F5') || (e.code === 'F5');
            if (isF5 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                e.stopPropagation();
                restart();
            }
        }, true);
    }

    /* ----------------------------------------------------------
       Auto-start on first load
       ---------------------------------------------------------- */
    function maybeAutoStart() {
        if (state.tourAutoStarted) return;
        state.tourAutoStarted = true;
        start();
    }

    function scheduleAutoStart() {
        if (document.readyState === 'complete') {
            setTimeout(maybeAutoStart, 300);
        } else {
            window.addEventListener('load', () => setTimeout(maybeAutoStart, 300));
            // Safety net in case `load` never fires (e.g. a hanging resource).
            setTimeout(maybeAutoStart, 2200);
        }
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.tour = {
        start,
        end,
        next,
        restart,
        showStep,
        positionElements
    };

    /* ----------------------------------------------------------
       Bootstrap listeners + auto-start once the DOM is ready
       ---------------------------------------------------------- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupListeners();
            setupShiftF5();
            scheduleAutoStart();
        });
    } else {
        setupListeners();
        setupShiftF5();
        scheduleAutoStart();
    }
})();