/* resources/modules/topics.js
 * Topic registry, loader, doc rendering, TOC, sidebar header,
 * i18n, and navigation (showDocView / showHomeView / closeTopic / openHome).
 * Depends on: util.js (escapeHtml)
 *             state.js (App.state.*, App.constants, App.topics._registry,
 *                       App.nav stubs, App.i18n stubs)
 *             dashboard.js (App.dashboard.updateAll) — called on state changes
 *             search.js (App.search.removeHighlights) — called from closeTopic
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[topics] window.App missing. Load state.js first.');
        return;
    }

    const { state, constants, util } = App;
    const { escapeHtml } = util;

    /* ----------------------------------------------------------
       Topic registry (public API on App.topics)
       ---------------------------------------------------------- */
    function registerTopic(topic) {
        if (topic && topic.id) App.topics._registry[topic.id] = topic;
    }

    function getTopic(id) {
        return App.topics._registry[id] || null;
    }

    function getAllTopics() {
        return App.topics._registry;
    }

    /* Make registerTopic globally reachable BEFORE any topic is loaded,
       so dynamically imported ES modules can call it by bare name. */
    window.registerTopic = registerTopic;
    window.TEMPLATE_TOPICS = App.topics._registry;

    /* ----------------------------------------------------------
       Loading
       ---------------------------------------------------------- */
    async function loadTopicList() {
        try {
            const res = await fetch(constants.TOPIC_LIST_PATH, { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            if (Array.isArray(data)) return data;
            if (data && Array.isArray(data.topics)) return data.topics;
            return [];
        } catch (err) {
            console.warn('Topic list load failed:', err);
            return [];
        }
    }

    function loadSingleTopic(path) {
        // JSON topic definitions stay on the fetch path.
        if (/\.json(\?.*)?$/i.test(path)) {
            return fetch(path, { cache: 'no-store' })
                .then(r => {
                    if (!r.ok) throw new Error('HTTP ' + r.status);
                    return r.json();
                })
                .then(data => { registerTopic(data); });
        }

        // Everything else is loaded as an ES module via dynamic import().
        // This supports both classic-script topics (no imports) and ESM topics.
        const url = new URL(path, document.baseURI).href;
        return import(/* webpackIgnore: true */ url)
            .then(() => { /* module registered itself via registerTopic() */ })
            .catch(err => {
                console.error(`[topics] failed to import "${path}":`, err);
                throw err;
            });
    }

    async function loadAllTopics() {
        const files = await loadTopicList();
        if (!files.length) return;
        await Promise.allSettled(files.map(loadSingleTopic));
    }

    /* ----------------------------------------------------------
       Animation renderer (used by buildDocViewHtml)
       ---------------------------------------------------------- */
    function renderAnimation(anim) {
        if (!anim) return '';
        if (typeof anim === 'string') anim = { type: anim };
        if (anim.html) return anim.html;

        if (anim.type === 'packet-flow') {
            return `<div class="illus-card"><div class="illus-flow">
                <div class="illus-node"><div class="illus-node-circle"><i class="fa-solid fa-user"></i></div><span data-lang-de>Client</span><span data-lang-en style="display:none;">Client</span></div>
                <div class="illus-track"><div class="illus-packet"></div><div class="illus-packet" style="animation-delay: 1.4s;"></div></div>
                <div class="illus-node"><div class="illus-node-circle"><i class="fa-solid fa-server"></i></div><span data-lang-de>Server</span><span data-lang-en style="display:none;">Server</span></div>
                <div class="illus-track"><div class="illus-packet" style="animation-delay: 0.7s;"></div><div class="illus-packet" style="animation-delay: 2.1s;"></div></div>
                <div class="illus-node"><div class="illus-node-circle"><i class="fa-solid fa-database"></i></div><span data-lang-de>Datenbank</span><span data-lang-en style="display:none;">Database</span></div>
            </div></div>`;
        }

        if (anim.type === 'template-layering') {
            return `<div class="illus-card"><div class="tmpl-stage">
                <div class="tmpl-piece tmpl-piece-header"></div>
                <div class="tmpl-piece tmpl-piece-sidebar"></div>
                <div class="tmpl-piece tmpl-piece-main"></div>
                <div class="tmpl-piece tmpl-piece-footer"></div>
            </div></div>`;
        }

        return '';
    }

    /* ----------------------------------------------------------
       Doc view HTML builder
       ---------------------------------------------------------- */
    function buildDocViewHtml(topic) {
        let html = '';

        if (topic.hero) {
            html += `<div class="searchable-block topic-panel mt-0 mb-6">
                <h1 id="top" class="border-b-0 pb-0 mb-3 mt-0">
                    <span data-lang-de>${escapeHtml(topic.hero.titleDe)}</span>
                    <span data-lang-en style="display:none;">${escapeHtml(topic.hero.titleEn)}</span>
                </h1>
                <div class="text-sm mb-0" data-lang-de>${topic.hero.introDe || ''}</div>
                <div class="text-sm mb-0" data-lang-en style="display:none;">${topic.hero.introEn || ''}</div>
            </div>`;
        }

        if (topic.quickLinks && topic.quickLinks.length) {
            html += `<div class="searchable-block topic-panel mt-6 mb-6" id="quick-access">
                <h2 class="mb-4 text-[1.1rem]"><span data-lang-de>Schnellzugriff</span><span data-lang-en style="display:none;">Quick Links</span></h2>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">`;
            topic.quickLinks.forEach(ql => {
                const target = ql.target ? ` target="${escapeHtml(ql.target)}"` : '';
                const cls = ql.switchToDoc ? 'quick-dial-btn switch-to-doc' : 'quick-dial-btn';
                html += `<a href="${escapeHtml(ql.href)}"${target} class="${cls}">
                    <i class="fa-solid ${escapeHtml(ql.icon)}"></i>
                    <span data-lang-de>${escapeHtml(ql.labelDe)}</span>
                    <span data-lang-en style="display:none;">${escapeHtml(ql.labelEn)}</span>
                </a>`;
            });
            html += `</div></div>`;
        }

        (topic.sections || []).forEach(sec => {
            html += `<section id="${escapeHtml(sec.id)}" class="scroll-mt-6 searchable-block topic-panel mt-6">
                <h2><span data-lang-de>${escapeHtml(sec.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(sec.titleEn)}</span></h2>`;

            if (sec.introDe || sec.introEn) {
                html += `<div class="panel-intro text-sm" data-lang-de>${sec.introDe || ''}</div>
                         <div class="panel-intro text-sm" data-lang-en style="display:none;">${sec.introEn || ''}</div>`;
            }

            (sec.subtopics || []).forEach(sub => {
                const hasBoth = sub.htmlDe && sub.htmlEn;
                let body = '';
                if (hasBoth) {
                    body = `<div data-lang-de>${sub.htmlDe}</div><div data-lang-en style="display:none;">${sub.htmlEn}</div>`;
                } else if (sub.htmlDe || sub.htmlEn) {
                    body = `<div>${sub.htmlDe || sub.htmlEn}</div>`;
                }
                const animHtml = sub.animation ? renderAnimation(sub.animation) : '';
                html += `<div class="subtopic-card">
                    <h3 id="${escapeHtml(sub.id)}" class="scroll-mt-6 text-sm font-semibold">
                        <span data-lang-de>${escapeHtml(sub.titleDe)}</span>
                        <span data-lang-en style="display:none;">${escapeHtml(sub.titleEn)}</span>
                    </h3>${body}${animHtml}</div>`;
            });

            html += `</section>`;
        });

        if (topic.illustrations && (topic.illustrations.animations || []).length) {
            html += `<section id="section-illustrations" class="scroll-mt-6 searchable-block topic-panel mt-6">
                <h2><span data-lang-de>${escapeHtml(topic.illustrations.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(topic.illustrations.titleEn)}</span></h2>
                <div class="panel-intro text-sm" data-lang-de>${topic.illustrations.introDe || ''}</div>
                <div class="panel-intro text-sm" data-lang-en style="display:none;">${topic.illustrations.introEn || ''}</div>`;

            topic.illustrations.animations.forEach(anim => {
                html += `<div class="subtopic-card">
                    <h3 id="${escapeHtml(anim.id)}" class="scroll-mt-6 text-sm font-semibold">
                        <span data-lang-de>${escapeHtml(anim.titleDe)}</span>
                        <span data-lang-en style="display:none;">${escapeHtml(anim.titleEn)}</span>
                    </h3>
                    <div class="text-xs" data-lang-de>${anim.descDe || ''}</div>
                    <div class="text-xs" data-lang-en style="display:none;">${anim.descEn || ''}</div>
                    ${renderAnimation(anim)}
                </div>`;
            });

            html += `</section>`;
        }

        if (topic.links && (topic.links.items || []).length) {
            html += `<section id="section-links" class="scroll-mt-6 searchable-block topic-panel mt-6 mb-8">
                <h2 class="mb-4"><span data-lang-de>${escapeHtml(topic.links.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(topic.links.titleEn)}</span></h2>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">`;
            topic.links.items.forEach(li => {
                const target = li.target ? ` target="${escapeHtml(li.target)}"` : '';
                html += `<a href="${escapeHtml(li.href)}"${target} class="quick-dial-btn">
                    <i class="fa-solid ${escapeHtml(li.icon)}"></i>
                    <span data-lang-de>${escapeHtml(li.labelDe)}</span>
                    <span data-lang-en style="display:none;">${escapeHtml(li.labelEn)}</span>
                </a>`;
            });
            html += `</div></section>`;
        }

        if (topic.footer) {
            html += `<footer class="mt-4 pt-4 pb-2 text-center text-[var(--text-muted)] text-xs border-t border-[var(--panel-border)] w-full">
                <span data-lang-de>${escapeHtml(topic.footer.textDe)}</span>
                <span data-lang-en style="display:none;">${escapeHtml(topic.footer.textEn)}</span>
            </footer>`;
        }

        return html;
    }

    /* ----------------------------------------------------------
       TOC builder
       ---------------------------------------------------------- */
    function buildTOCHtml(topic) {
        let html = `<div class="toc-heading font-bold text-[var(--heading-color)] mb-1.5 uppercase tracking-wider text-[10px]">
            <span data-lang-de>Inhaltsverzeichnis</span><span data-lang-en style="display:none;">Table of Contents</span>
        </div><ul class="space-y-0.5">`;

        html += `<li><a href="#top" class="toc-link flex items-center gap-1.5 py-1 px-1.5 rounded text-[var(--link-color)] hover:bg-[var(--code-bg)] font-medium" data-title-de="${escapeHtml(topic.titleDe)}" data-title-en="${escapeHtml(topic.titleEn)}">
            <i class="fa-solid fa-bookmark toc-icon"></i>
            <span data-lang-de>${escapeHtml(topic.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(topic.titleEn)}</span>
        </a></li>`;

        (topic.sections || []).forEach(sec => {
            html += `<li class="pt-1"><a href="#${escapeHtml(sec.id)}" class="toc-link flex items-center gap-1.5 py-1 px-1.5 rounded text-[var(--link-color)] hover:bg-[var(--code-bg)] font-medium" data-title-de="${escapeHtml(sec.titleDe)}" data-title-en="${escapeHtml(sec.titleEn)}">
                <i class="fa-solid fa-bookmark toc-icon"></i>
                <span data-lang-de>${escapeHtml(sec.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(sec.titleEn)}</span>
            </a>`;

            if (sec.subtopics && sec.subtopics.length) {
                html += `<ul class="pl-3 space-y-0.5 border-l border-[var(--border-color)] ml-2 mt-0.5">`;
                sec.subtopics.forEach(sub => {
                    html += `<li><a href="#${escapeHtml(sub.id)}" class="toc-link flex items-center gap-1.5 py-0.5 px-1 rounded text-[var(--text-muted)] hover:text-[var(--link-color)] hover:bg-[var(--code-bg)] text-[11px]" data-title-de="${escapeHtml(sub.titleDe)}" data-title-en="${escapeHtml(sub.titleEn)}">
                        <i class="fa-solid fa-minus toc-subicon" style="font-size: 0.25rem;"></i>
                        <span data-lang-de>${escapeHtml(sub.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(sub.titleEn)}</span>
                    </a></li>`;
                });
                html += `</ul>`;
            }
            html += `</li>`;
        });

        if (topic.illustrations && (topic.illustrations.animations || []).length) {
            html += `<li class="pt-1"><a href="#section-illustrations" class="toc-link flex items-center gap-1.5 py-1 px-1.5 rounded text-[var(--link-color)] hover:bg-[var(--code-bg)] font-medium" data-title-de="${escapeHtml(topic.illustrations.titleDe)}" data-title-en="${escapeHtml(topic.illustrations.titleEn)}">
                <i class="fa-solid fa-bookmark toc-icon"></i>
                <span data-lang-de>${escapeHtml(topic.illustrations.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(topic.illustrations.titleEn)}</span>
            </a><ul class="pl-3 space-y-0.5 border-l border-[var(--border-color)] ml-2 mt-0.5">`;
            topic.illustrations.animations.forEach(anim => {
                html += `<li><a href="#${escapeHtml(anim.id)}" class="toc-link flex items-center gap-1.5 py-0.5 px-1 rounded text-[var(--text-muted)] hover:text-[var(--link-color)] hover:bg-[var(--code-bg)] text-[11px]" data-title-de="${escapeHtml(anim.titleDe)}" data-title-en="${escapeHtml(anim.titleEn)}">
                    <i class="fa-solid fa-minus toc-subicon" style="font-size: 0.25rem;"></i>
                    <span data-lang-de>${escapeHtml(anim.titleDe)}</span><span data-lang-en style="display:none;">${escapeHtml(anim.titleEn)}</span>
                </a></li>`;
            });
            html += `</ul></li>`;
        }

        if (topic.links && (topic.links.items || []).length) {
            html += `<li class="pt-2 mt-2 border-t border-[var(--border-color)] toc-append-divider">
                <div class="toc-heading font-bold text-[var(--heading-color)] mb-1 uppercase tracking-wider text-[10px] pl-1.5">
                    <span data-lang-de>Links &amp; Quellen</span><span data-lang-en style="display:none;">Links &amp; Sources</span>
                </div>
                <a href="#section-links" class="ext-link flex items-center gap-1.5 py-0.5 px-1 rounded text-[var(--text-muted)] hover:text-[var(--link-color)] hover:bg-[var(--code-bg)] font-medium" data-title-de="Links" data-title-en="Links">
                    <i class="fa-solid fa-link toc-icon" style="font-size: 0.75rem;"></i>
                    <span data-lang-de>Externe Links</span><span data-lang-en style="display:none;">External Links</span>
                </a>
            </li>`;
        }

        html += `</ul>`;
        return html;
    }

    /* ----------------------------------------------------------
       Renderers
       ---------------------------------------------------------- */
    function renderDocView(topic) {
        const dv = document.getElementById('doc-view');
        if (!dv) return;
        dv.innerHTML = buildDocViewHtml(topic);
        dv.dataset.topicId = topic.id;
    }

    function renderTOC(topic) {
        const nav = document.getElementById('toc-nav');
        if (!nav) return;
        nav.innerHTML = buildTOCHtml(topic);
    }

    function renderSidebarHeader(topic) {
        const tDe = document.getElementById('headerTitleDe');
        const tEn = document.getElementById('headerTitleEn');
        const sDe = document.getElementById('headerSubtitleDe');
        const sEn = document.getElementById('headerSubtitleEn');
        const vEl = document.getElementById('headerVersion');
        const iconEl = document.getElementById('headerIcon');

        if (tDe) tDe.textContent = topic.sidebarTitleDe || topic.titleDe || '';
        if (tEn) tEn.textContent = topic.sidebarTitleEn || topic.titleEn || '';
        if (sDe) sDe.textContent = topic.sidebarSubtitleDe || '';
        if (sEn) sEn.textContent = topic.sidebarSubtitleEn || '';
        if (vEl) vEl.textContent = topic.sidebarVersion || '';
        if (iconEl && topic.icon) {
            iconEl.className = 'fa-solid ' + topic.icon +
                ' text-xl text-[var(--text-color)] opacity-80 header-icon';
        }
    }

    /* ----------------------------------------------------------
       Section observer for TOC highlighting
       ---------------------------------------------------------- */
    let tocObserver = null;

    function observeSections() {
        if (tocObserver) tocObserver.disconnect();

        tocObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
                if (entry.isIntersecting) {
                    document.querySelectorAll('.toc-link').forEach(link => link.classList.remove('active'));
                    if (tocLink) tocLink.classList.add('active');
                }
            });
        }, { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.1, 1] });

        document.querySelectorAll('#doc-view section, #doc-view h3[id]')
            .forEach(el => tocObserver.observe(el));
    }

    /* ----------------------------------------------------------
       Rendering guard (don't re-render if already showing)
       ---------------------------------------------------------- */
    function ensureTopicRendered(topicId) {
        const topic = getTopic(topicId);
        if (!topic) return false;

        const dv = document.getElementById('doc-view');
        if (dv && dv.dataset.topicId === topicId) return true;

        renderDocView(topic);
        renderTOC(topic);
        renderSidebarHeader(topic);
        App.i18n.applyLangToDOM();
        observeSections();

        if (typeof topic.onRender === 'function') {
            try { topic.onRender(dv); } catch (e) { console.warn('onRender:', e); }
        }
        return true;
    }

    /* ----------------------------------------------------------
       Navigation
       ---------------------------------------------------------- */
    function showDocView(topicId) {
        // If switching topics, let the old one clean up.
        if (topicId && state.currentTopicId && topicId !== state.currentTopicId) {
            const old = getTopic(state.currentTopicId);
            if (old && typeof old.onUnrender === 'function') {
                try { old.onUnrender(); } catch (e) { console.warn('onUnrender:', e); }
            }
        }

        if (topicId) state.currentTopicId = topicId;
        if (!state.currentTopicId) return;
        if (!ensureTopicRendered(state.currentTopicId)) return;

        document.body.classList.add('has-topic');

        const homeView = document.getElementById('home-view');
        const docView = document.getElementById('doc-view');
        if (homeView) homeView.style.display = 'none';
        if (docView) docView.style.display = 'block';

        window.scrollTo(0, 0);
    }

    function showHomeView() {
        const homeView = document.getElementById('home-view');
        const docView = document.getElementById('doc-view');
        if (homeView) homeView.style.display = 'flex';
        if (docView) docView.style.display = 'none';

        if (state.calYear === null && App.calendar && typeof App.calendar.today === 'function') {
            App.calendar.today();
        }
    }

    function openHome() {
        state.dashboardPath = [];
        state.dashboardSearchQuery = '';
        showHomeView();
        if (App.dashboard && typeof App.dashboard.updateAll === 'function') {
            App.dashboard.updateAll();
        }
        window.scrollTo(0, 0);
    }

    function closeTopic() {
        // Clear both search inputs.
        const mi = document.getElementById('wikiSearch');
        const fi = document.getElementById('floatingWikiSearch');
        if (mi) mi.value = '';
        if (fi) fi.value = '';

        // Remove highlights and restore visibility of all blocks.
        const mc = document.getElementById('main-content');
        if (App.search && typeof App.search.removeHighlights === 'function') {
            App.search.removeHighlights(mc);
        }
        document.querySelectorAll('.searchable-block').forEach(b => {
            b.style.display = '';
        });

        // Let the active topic clean up.
        const active = state.currentTopicId && getTopic(state.currentTopicId);
        if (active && typeof active.onUnrender === 'function') {
            try { active.onUnrender(); } catch (e) { console.warn('onUnrender:', e); }
        }

        document.body.classList.remove('has-topic');

        const fs = document.getElementById('floatingSearch');
        if (fs) fs.classList.add('hidden');

        // Reset doc view and TOC.
        const dv = document.getElementById('doc-view');
        if (dv) {
            dv.dataset.topicId = '';
            dv.innerHTML = '';
        }
        const nav = document.getElementById('toc-nav');
        if (nav) nav.innerHTML = '';

        state.currentTopicId = null;
        state.dashboardPath = [];
        state.dashboardSearchQuery = '';

        if (App.dashboard && typeof App.dashboard.updateAll === 'function') {
            App.dashboard.updateAll();
        }

        showHomeView();
        window.scrollTo(0, 0);
    }

    /* ----------------------------------------------------------
       i18n
       ---------------------------------------------------------- */
    function applyLangToDOM() {
        document.querySelectorAll('[data-lang-de]').forEach(el => {
            el.style.display = state.isGerman ? '' : 'none';
        });
        document.querySelectorAll('[data-lang-en]').forEach(el => {
            el.style.display = state.isGerman ? 'none' : '';
        });
        document.querySelectorAll('[data-title-de]').forEach(el => {
            el.title = state.isGerman
                ? el.getAttribute('data-title-de')
                : el.getAttribute('data-title-en');
        });
        document.body.setAttribute('data-active-lang', state.isGerman ? 'de' : 'en');
    }

    function applyLang() {
        applyLangToDOM();
        if (App.calendar && typeof App.calendar.updateAll === 'function') {
            App.calendar.updateAll();
        }
        if (App.dashboard && typeof App.dashboard.updateAll === 'function') {
            App.dashboard.updateAll();
        }
        if (App.themes && typeof App.themes.renderThemesGrid === 'function') {
            const tm = document.getElementById('themesModal');
            if (tm && tm.classList.contains('open')) App.themes.renderThemesGrid();
        }
        if (App.tour && state.tourActive && typeof App.tour.showStep === 'function') {
            App.tour.showStep(state.tourIndex);
        }
    }

    /* ----------------------------------------------------------
       Install real implementations (replaces state.js stubs)
       ---------------------------------------------------------- */
    App.topics.register = registerTopic;
    App.topics.getAll = getAllTopics;
    App.topics.get = getTopic;
    App.topics.loadTopicList = loadTopicList;
    App.topics.loadSingleTopic = loadSingleTopic;
    App.topics.loadAllTopics = loadAllTopics;

    App.nav.showDocView = showDocView;
    App.nav.showHomeView = showHomeView;
    App.nav.openHome = openHome;
    App.nav.closeTopic = closeTopic;

    App.i18n.applyLangToDOM = applyLangToDOM;
    App.i18n.applyLang = applyLang;

    App.topics.renderDocView = renderDocView;
    App.topics.renderTOC = renderTOC;
    App.topics.renderSidebarHeader = renderSidebarHeader;
    App.topics.buildDocViewHtml = buildDocViewHtml;
    App.topics.buildTOCHtml = buildTOCHtml;
    App.topics.renderAnimation = renderAnimation;
    App.topics.observeSections = observeSections;
    App.topics.ensureTopicRendered = ensureTopicRendered;
})();