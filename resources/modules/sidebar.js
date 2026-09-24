/* resources/modules/sidebar.js
 * Sidebar: collapse/expand, floating search expansion, header click.
 * Depends on: state.js (App.state.sidebarCollapsed)
 *             topics.js (App.nav.showDocView) — via handleHeaderClick
 *             dashboard.js (App.dashboard.openModal) — via handleHeaderClick
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[sidebar] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;

    /* ----------------------------------------------------------
       Collapse / expand
       ---------------------------------------------------------- */
    function toggle() {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        applyState();

        // When expanding the sidebar, hide the floating search popover —
        // the inline search input is visible again.
        const fs = document.getElementById('floatingSearch');
        if (fs && !state.sidebarCollapsed) fs.classList.add('hidden');
    }

    function applyState() {
        const aside = document.getElementById('appSidebar');
        const btn = document.getElementById('sidebarToggleBtn');
        const icon = document.getElementById('sidebarToggleIcon');

        if (aside) aside.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
        if (btn) btn.setAttribute('aria-expanded', state.sidebarCollapsed ? 'false' : 'true');
        if (icon) {
            icon.className = state.sidebarCollapsed
                ? 'fa-solid fa-arrow-right'
                : 'fa-solid fa-arrow-left';
        }
    }

    /* ----------------------------------------------------------
       Floating search (only relevant when the sidebar is collapsed)
       ---------------------------------------------------------- */
    function expandSearch(e) {
        if (!state.sidebarCollapsed) return;

        const floater = document.getElementById('floatingSearch');
        const btn = e
            ? e.currentTarget
            : document.querySelector('.sidebar-search-icon-btn');

        if (btn && floater) {
            const rect = btn.getBoundingClientRect();
            floater.style.top = rect.top + 'px';
            floater.style.left = (rect.right + 12) + 'px';
            floater.classList.remove('hidden');

            const fi = document.getElementById('floatingWikiSearch');
            if (fi) fi.focus();
        }

        if (e) e.stopPropagation();
    }

    /* ----------------------------------------------------------
       Clicking the sidebar header panel
         - If the doc view is visible → open the dashboard modal.
         - Otherwise → show the doc view for the current topic.
       ---------------------------------------------------------- */
    function handleHeaderClick() {
        const dv = document.getElementById('doc-view');
        const inDoc = dv && dv.style.display !== 'none';

        if (inDoc) {
            if (App.dashboard && typeof App.dashboard.openModal === 'function') {
                App.dashboard.openModal();
            }
        } else {
            if (App.nav && typeof App.nav.showDocView === 'function') {
                App.nav.showDocView();
            }
        }
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.sidebar = {
        toggle,
        applyState,
        expandSearch,
        handleHeaderClick
    };

    /* Initialise aria-expanded / icon on load (in case the sidebar was
       pre-collapsed via persisted state — currently always false). */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyState);
    } else {
        applyState();
    }
})();