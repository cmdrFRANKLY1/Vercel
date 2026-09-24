/* resources/modules/dashboard.js
 * Dashboard: root + sub-dashboard navigation, topic cards, breadcrumbs.
 * Depends on: util.js (escapeHtml)
 *             state.js (App.state.isGerman, App.state.debugMode,
 *                       App.state.dashboardPath, App.state.dashboardSearchQuery,
 *                       App.topics)
 *             topics.js (App.nav.showDocView)
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[dashboard] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;
    const { escapeHtml } = App.util;

    const DEBUG_TOPIC_ID = 'Template Topic 1';

    /* ----------------------------------------------------------
       Public entry — rebuild both inline + modal dashboards
       ---------------------------------------------------------- */
    function updateAll() {
        buildDashboardDOM('dashboardBodyModal', true);
        buildDashboardDOM('dashboardBodyInline', false);
    }

    /* ----------------------------------------------------------
       Topic card builder
       ---------------------------------------------------------- */
    function buildTopicCard(t, isModal, hasChildren) {
        const isGerman = state.isGerman;
        const titleText = isGerman ? (t.titleDe || t.title) : (t.titleEn || t.title);
        const descText  = isGerman ? (t.descDe  || '')      : (t.descEn  || '');

        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'dashboard-card' + (hasChildren ? ' has-children' : '');
        card.innerHTML =
            `<i class="fa-solid ${escapeHtml(t.icon || 'fa-book')}"></i>` +
            `<span class="dash-title">${escapeHtml(titleText)}</span>` +
            `<span class="dash-desc">${escapeHtml(descText)}</span>`;

        if (hasChildren) {
            const count = document.createElement('span');
            count.className = 'dash-count';
            count.textContent = String(hasChildren);
            count.title = isGerman
                ? `${hasChildren} Unterthemen`
                : `${hasChildren} sub-topics`;
            card.appendChild(count);
        }

        card.addEventListener('click', () => {
            if (hasChildren) {
                state.dashboardPath.push(t.id);
                updateAll();
                App.i18n.applyLangToDOM();
            } else {
                if (isModal) closeModal();
                App.nav.showDocView(t.id);
            }
        });

        return card;
    }

    /* ----------------------------------------------------------
       Container detection — decides whether a topic should show
       as a "Section" (folder) or as a plain "Topic" card.
       ---------------------------------------------------------- */
    function isContainerTopic(t) {
        if (!t) return false;

        const hasQuickLinks     = Array.isArray(t.quickLinks) && t.quickLinks.length > 0;
        const hasIllustrations  = !!(t.illustrations && Array.isArray(t.illustrations.animations) && t.illustrations.animations.length);
        const hasLinks          = !!(t.links && Array.isArray(t.links.items) && t.links.items.length);

        const hasRealSections = Array.isArray(t.sections) && t.sections.some(sec => {
            if (!sec) return false;
            return Array.isArray(sec.subtopics) && sec.subtopics.length > 0;
        });

        return !(hasQuickLinks || hasIllustrations || hasLinks || hasRealSections);
    }

    /* ----------------------------------------------------------
       Main render
       ---------------------------------------------------------- */
    function buildDashboardDOM(targetId, isModal) {
        const body = document.getElementById(targetId);
        if (!body) return;
        body.innerHTML = '';

        const topics = App.topics.getAll();
        const isGerman = state.isGerman;
        const q = state.dashboardSearchQuery;

        const allIds = Object.keys(topics).filter(id => {
            if (id === DEBUG_TOPIC_ID && !state.debugMode) return false;
            return true;
        });

        // Build parent → children map
        const childrenOf = {};
        const topLevel = [];
        allIds.forEach(id => {
            const t = topics[id];
            const pid = t && t.parentId;
            if (pid && topics[pid] && pid !== id) {
                (childrenOf[pid] = childrenOf[pid] || []).push(id);
            } else {
                topLevel.push(id);
            }
        });

        const currentParentId = state.dashboardPath.length > 0
            ? state.dashboardPath[state.dashboardPath.length - 1]
            : null;

        // --- Inside a sub-dashboard: show all children (flat list) ---
        if (currentParentId) {
            let displayIds = childrenOf[currentParentId] || [];
            if (q) {
                displayIds = displayIds.filter(id => {
                    const t = topics[id];
                    const hay = (
                        (t.titleDe || t.title || '') + ' ' +
                        (t.titleEn || t.title || '') + ' ' +
                        (t.descDe  || '') + ' ' +
                        (t.descEn  || '')
                    ).toLowerCase();
                    return hay.includes(q);
                });
            }
            renderBreadcrumb(body);
            if (!displayIds.length) {
                body.appendChild(makeEmpty(q));
            } else {
                const grid = document.createElement('div');
                grid.className = 'dashboard-grid';
                displayIds.forEach(id => {
                    const t = topics[id];
                    const childIds = childrenOf[id] || [];
                    grid.appendChild(buildTopicCard(t, isModal, childIds.length));
                });
                body.appendChild(grid);
            }
            syncSearchInputs();
            return;
        }

        // --- Root dashboard: split into Sections + Topics ---
        let rootIds = topLevel;
        if (q) {
            rootIds = allIds.filter(id => {
                const t = topics[id];
                const hay = (
                    (t.titleDe || t.title || '') + ' ' +
                    (t.titleEn || t.title || '') + ' ' +
                    (t.descDe  || '') + ' ' +
                    (t.descEn  || '')
                ).toLowerCase();
                return hay.includes(q);
            });
        }

        const containerIds = rootIds.filter(id => {
            const t = topics[id];
            return (childrenOf[id] || []).length > 0 && isContainerTopic(t);
        });
        const regularIds = rootIds.filter(id => {
            const t = topics[id];
            return !((childrenOf[id] || []).length > 0 && isContainerTopic(t));
        });

        if (!containerIds.length && !regularIds.length) {
            body.appendChild(makeEmpty(q));
            syncSearchInputs();
            return;
        }

        if (containerIds.length) {
            const sec = document.createElement('div');
            sec.className = 'dashboard-section';
            sec.appendChild(makeSectionHeader(
                'fa-folder-tree',
                isGerman ? 'Bereiche' : 'Sections',
                containerIds.length
            ));
            const grid = document.createElement('div');
            grid.className = 'dashboard-grid';
            containerIds.forEach(id => {
                const t = topics[id];
                const childIds = childrenOf[id] || [];
                grid.appendChild(buildTopicCard(t, isModal, childIds.length));
            });
            sec.appendChild(grid);
            body.appendChild(sec);
        }

        if (regularIds.length) {
            const sec = document.createElement('div');
            sec.className = 'dashboard-section';
            sec.appendChild(makeSectionHeader(
                'fa-file-lines',
                isGerman ? 'Themen' : 'Topics',
                regularIds.length
            ));
            const grid = document.createElement('div');
            grid.className = 'dashboard-grid';
            regularIds.forEach(id => {
                const t = topics[id];
                const childIds = childrenOf[id] || [];
                grid.appendChild(buildTopicCard(t, isModal, childIds.length));
            });
            sec.appendChild(grid);
            body.appendChild(sec);
        }

        syncSearchInputs();
    }

    /* ----------------------------------------------------------
       Helpers
       ---------------------------------------------------------- */
    function makeSectionHeader(icon, label, count) {
        const h = document.createElement('div');
        h.className = 'dashboard-section-header';
        h.innerHTML =
            `<i class="fa-solid ${escapeHtml(icon)}"></i>` +
            `<span class="ds-title">${escapeHtml(label)}</span>` +
            `<span class="ds-count">${count}</span>`;
        return h;
    }

    function makeEmpty(query) {
        const empty = document.createElement('p');
        empty.className = 'dashboard-empty';
        if (query) {
            empty.textContent = state.isGerman
                ? `Keine Treffer für „${query}“.`
                : `No matches for "${query}".`;
        } else {
            empty.textContent = state.isGerman
                ? 'Keine Themen verfügbar.'
                : 'No topics available.';
        }
        return empty;
    }

    function syncSearchInputs() {
        const a = document.getElementById('dashboardSearchInline');
        const b = document.getElementById('dashboardSearchModal');
        if (a && a.value !== state.dashboardSearchQuery) a.value = state.dashboardSearchQuery;
        if (b && b.value !== state.dashboardSearchQuery) b.value = state.dashboardSearchQuery;
    }

    /* ----------------------------------------------------------
       Breadcrumb bar for sub-dashboards
       ---------------------------------------------------------- */
    function renderBreadcrumb(body) {
        const topics = App.topics.getAll();
        const bar = document.createElement('div');
        bar.className = 'dashboard-breadcrumb';

        // Back button
        const backBtn = document.createElement('button');
        backBtn.type = 'button';
        backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> <span data-lang-de>Zurück</span><span data-lang-en style="display:none;">Back</span>';
        backBtn.addEventListener('click', () => {
            state.dashboardPath.pop();
            updateAll();
            App.i18n.applyLangToDOM();
        });
        bar.appendChild(backBtn);

        // Trail: Root > Parent > ... > Current
        const trail = document.createElement('div');
        trail.className = 'bc-trail';

        const rootBtn = document.createElement('button');
        rootBtn.type = 'button';
        rootBtn.className = 'bc-crumb';
        rootBtn.innerHTML = '<i class="fa-solid fa-house"></i> <span data-lang-de>Themen</span><span data-lang-en style="display:none;">Topics</span>';
        rootBtn.addEventListener('click', () => {
            state.dashboardPath = [];
            updateAll();
            App.i18n.applyLangToDOM();
        });
        trail.appendChild(rootBtn);

        state.dashboardPath.forEach((pid, idx) => {
            const pt = topics[pid];
            const nmDe = pt ? (pt.titleDe || pt.title) : pid;
            const nmEn = pt ? (pt.titleEn || pt.title) : pid;
            const isLast = idx === state.dashboardPath.length - 1;

            const sep = document.createElement('span');
            sep.className = 'bc-sep';
            sep.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
            trail.appendChild(sep);

            if (isLast) {
                const cur = document.createElement('span');
                cur.className = 'bc-current';
                cur.innerHTML =
                    `<span data-lang-de>${escapeHtml(nmDe)}</span>` +
                    `<span data-lang-en style="display:none;">${escapeHtml(nmEn)}</span>`;
                trail.appendChild(cur);
            } else {
                const crumb = document.createElement('button');
                crumb.type = 'button';
                crumb.className = 'bc-crumb';
                crumb.innerHTML =
                    `<span data-lang-de>${escapeHtml(nmDe)}</span>` +
                    `<span data-lang-en style="display:none;">${escapeHtml(nmEn)}</span>`;
                crumb.addEventListener('click', () => {
                    state.dashboardPath = state.dashboardPath.slice(0, idx + 1);
                    updateAll();
                    App.i18n.applyLangToDOM();
                });
                trail.appendChild(crumb);
            }
        });

        bar.appendChild(trail);
        body.appendChild(bar);
    }

    /* ----------------------------------------------------------
       Search input handler (shared by inline + modal)
       ---------------------------------------------------------- */
    function onSearch(val) {
        state.dashboardSearchQuery = (val || '').trim().toLowerCase();

        const a = document.getElementById('dashboardSearchInline');
        const b = document.getElementById('dashboardSearchModal');
        if (a && a.value !== val) a.value = val;
        if (b && b.value !== val) b.value = val;

        updateAll();
        App.i18n.applyLangToDOM();
    }

    /* ----------------------------------------------------------
       Modal controls
       ---------------------------------------------------------- */
    function openModal() {
        const m = document.getElementById('dashboardModal');
        if (m) m.classList.add('open');
    }

    function closeModal() {
        const m = document.getElementById('dashboardModal');
        if (m) m.classList.remove('open');
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.dashboard = {
        updateAll,
        buildDashboardDOM,
        buildTopicCard,
        isContainerTopic,
        onSearch,
        openModal,
        closeModal
    };
})();