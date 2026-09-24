/* resources/modules/settings.js
 * Settings modal, temp debug toggle, fullscreen, Impressum modal.
 * Depends on: state.js (App.state.isGerman, App.state.debugMode,
 *                       App.state.tempDebug)
 *             themes.js (App.themes.openModal, App.themes.applyColorScheme — via applySettings)
 *             tour.js   (App.tour.restart)
 *             dashboard.js (App.dashboard.updateAll) — called on debug change.
 *             i18n (App.i18n.applyLang, App.i18n.applyLangToDOM)
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[settings] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;

    /* ----------------------------------------------------------
       Temp debug toggle (staging value inside the settings modal)
       ---------------------------------------------------------- */
    function toggleTempDebug() {
        state.tempDebug = !state.tempDebug;
        updateTempDebugLabel();
    }

    function updateTempDebugLabel() {
        const l = document.getElementById('tempDebugLabel');
        if (l) l.textContent = state.tempDebug ? 'On' : 'Off';
    }

    /* ----------------------------------------------------------
       Settings modal open / close / apply
       ---------------------------------------------------------- */
    function open() {
        const m = document.getElementById('settingsModal');
        if (!m) return;

        // Sync the language dropdown with the current language.
        const ls = document.getElementById('tempLangSelect');
        if (ls) ls.value = state.isGerman ? 'de' : 'en';

        // Sync the temp debug toggle with the applied debug mode.
        state.tempDebug = state.debugMode;
        updateTempDebugLabel();

        m.classList.add('open');
    }

    function close() {
        const m = document.getElementById('settingsModal');
        if (m) m.classList.remove('open');
    }

    function apply() {
        // --- Language ---
        const ls = document.getElementById('tempLangSelect');
        if (ls) {
            const wantGerman = (ls.value === 'de');
            if (wantGerman !== state.isGerman) {
                state.isGerman = wantGerman;
                if (App.i18n && typeof App.i18n.applyLang === 'function') {
                    App.i18n.applyLang();
                } else if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
                    App.i18n.applyLangToDOM();
                }
            }
        }

        // --- Debug mode ---
        if (state.tempDebug !== state.debugMode) {
            state.debugMode = state.tempDebug;
            if (App.dashboard && typeof App.dashboard.updateAll === 'function') {
                App.dashboard.updateAll();
            }
        }

        close();
    }

    /* ----------------------------------------------------------
       Fullscreen
       ---------------------------------------------------------- */
    function toggleFullscreen() {
        const icon = document.getElementById('fullscreenIcon');
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error(err));
            if (icon) icon.className = 'fa-solid fa-compress';
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            if (icon) icon.className = 'fa-solid fa-expand';
        }
    }

    // Keep the icon in sync if the user leaves fullscreen via Esc / browser UI.
    document.addEventListener('fullscreenchange', () => {
        const icon = document.getElementById('fullscreenIcon');
        if (icon) {
            icon.className = document.fullscreenElement
                ? 'fa-solid fa-compress'
                : 'fa-solid fa-expand';
        }
    });

    /* ----------------------------------------------------------
       Impressum modal
       ---------------------------------------------------------- */
    function openImpressum() {
        const m = document.getElementById('impressumModal');
        if (m) m.classList.add('open');
    }

    function closeImpressum() {
        const m = document.getElementById('impressumModal');
        if (m) m.classList.remove('open');
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.settings = {
        open,
        close,
        apply,
        toggleTempDebug,
        updateTempDebugLabel,
        toggleFullscreen,
        openImpressum,
        closeImpressum
    };
})();