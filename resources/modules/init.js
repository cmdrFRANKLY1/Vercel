/* resources/modules/init.js
 * Bootstrap for cmdrFRANKLYs EpicSpace.
 * Loads color schemes + topics, initializes theme, wires global listeners.
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[init] window.App missing. Check that state.js loaded before init.js.');
        return;
    }

    async function bootstrap() {
        // --- Debug always starts OFF on every page load. Session-only toggle. ---
        App.state.debugMode = false;
        App.state.tempDebug = false;
        try { localStorage.removeItem('cheatSheetDebug'); } catch (_) {}
        if (App.settings && typeof App.settings.updateTempDebugLabel === 'function') {
            App.settings.updateTempDebugLabel();
        }

        // --- Language + home view first, so tour targets have dimensions ---
        App.i18n.applyLang();
        App.nav.showHomeView();

        // --- Load schemes + topics in parallel ---
        await Promise.all([
            App.themes.loadColorSchemes(),
            App.topics.loadAllTopics()
        ]);
        App.themes.initTheme();

        // --- Rebuild dashboards now that TEMPLATE_TOPICS is populated ---
        App.dashboard.updateAll();

        wireTOCClicks();
        wireModalBackdropClose();
        wireEscapeKey();

        // --- Load work reports (async, does not block UI) ---
        App.reports.loadWorkReports();
    }

    /* ----------------------------------------------------------
       TOC click: if on home view with a topic still loaded,
       jump back to doc-view + scroll.
       ---------------------------------------------------------- */
    function wireTOCClicks() {
        const tocPanel = document.getElementById('toc-container-panel');
        if (!tocPanel) return;

        tocPanel.addEventListener('click', (e) => {
            const link = e.target.closest('.toc-link, .ext-link, .switch-to-doc');
            if (!link) return;

            if (App.dashboard && typeof App.dashboard.closeModal === 'function') {
                App.dashboard.closeModal();
            }

            const docView  = document.getElementById('doc-view');
            const homeView = document.getElementById('home-view');
            const inHome   = homeView && homeView.style.display !== 'none';
            const currentTopicId = App.state.currentTopicId;

            if (inHome && currentTopicId && docView && docView.dataset.topicId === currentTopicId) {
                e.preventDefault();
                const href = link.getAttribute('href') || '';

                document.body.classList.add('has-topic');
                homeView.style.display = 'none';
                docView.style.display = 'block';

                if (href.startsWith('#') && href.length > 1) {
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        const target = document.querySelector(href);
                        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        else window.scrollTo(0, 0);
                    }));
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
    }

    /* ----------------------------------------------------------
       Click outside a modal to close it.
       ---------------------------------------------------------- */
    function wireModalBackdropClose() {
        const modals = [
            ['impressumModal',   () => App.settings.closeImpressum()],
            ['settingsModal',    () => App.settings.close()],
            ['themesModal',      () => App.themes.closeModal()],
            ['calendarModal',    () => App.calendar.close()],
            ['dashboardModal',   () => App.dashboard.closeModal()],
            ['sharedFilesModal', () => App.sharedFiles.close()],
            ['reportModal',      () => App.reports.closeModal()]
        ];

        document.addEventListener('click', (e) => {
            modals.forEach(([id, fn]) => {
                const m = document.getElementById(id);
                if (m && m.classList.contains('open') && e.target === m) fn();
            });

            // Close floating search when clicking outside it (and outside the trigger button)
            const floatSearch = document.getElementById('floatingSearch');
            const searchBtn = document.querySelector('.sidebar-search-icon-btn');
            if (floatSearch && !floatSearch.classList.contains('hidden')) {
                if (!floatSearch.contains(e.target) && (!searchBtn || !searchBtn.contains(e.target))) {
                    floatSearch.classList.add('hidden');
                }
            }
        });
    }

    /* ----------------------------------------------------------
       Escape closes modals + floating search.
       ---------------------------------------------------------- */
    function wireEscapeKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;

            App.themes.closeModal();
            App.settings.close();
            App.settings.closeImpressum();
            App.calendar.close();
            App.dashboard.closeModal();
            App.sharedFiles.close();
            App.reports.closeModal();

            const fs = document.getElementById('floatingSearch');
            if (fs && !fs.classList.contains('hidden')) fs.classList.add('hidden');
        });
    }

    /* ----------------------------------------------------------
       Kick off after DOM is ready.
       ---------------------------------------------------------- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }
})();