/* resources/modules/state.js
 * Global namespace + shared mutable state + constants.
 * Must be loaded AFTER util.js (util attaches to App.util) but BEFORE
 * every feature module (themes, sidebar, topics, dashboard, calendar, …).
 *
 * NOTE: This module does NOT touch the DOM and does NOT depend on any
 * other module besides util.js. It is safe to load as soon as the
 * <head> scripts (JSZip, pdf.js, mammoth) are present.
 */
(function () {
    'use strict';

    // --- Root namespace -------------------------------------------------
    window.App = window.App || {};

    // --- Constants ------------------------------------------------------
    // If util.js already created App.constants, merge rather than clobber.
    App.constants = Object.assign({
        GH_USER:    'cmdrFRANKLY1',
        GH_REPO:    'Viona',
        GH_BRANCH:  'main',
        REPORTS_FOLDER: 'Reports',
        SHARED_ROOT:    'SharedFiles',
        SHARED_SUBFOLDERS: {
            pdf:  'SharedFiles/PDFs',
            ppt:  'SharedFiles/PPTs',
            html: 'SharedFiles/HTMLs',
            doc:  'SharedFiles/DOCs',
            xls:  'SharedFiles/XLSs'
        },
        TOPIC_LIST_PATH: 'topicList.json',
        DEBUG_TOPIC_ID:  'Template Topic 1'
    }, App.constants || {});

    // Derived GitHub URLs (computed once so they stay consistent everywhere).
    if (!App.constants.GH_API) {
        App.constants.GH_API =
            `https://api.github.com/repos/${App.constants.GH_USER}/${App.constants.GH_REPO}`;
    }
    if (!App.constants.GH_RAW) {
        App.constants.GH_RAW =
            `https://raw.githubusercontent.com/${App.constants.GH_USER}/${App.constants.GH_REPO}/${App.constants.GH_BRANCH}`;
    }

    // --- Shared mutable state ------------------------------------------
    // Every module reads/writes through App.state.*, never through a local
    // `let`. This is what makes the namespace approach work without a
    // bundler: there is exactly one binding per field.
    App.state = {
        /* ----- Language & debug ----- */
        isGerman: true,
        debugMode: false,       // applied debug mode
        tempDebug: false,       // staging value inside the settings modal

        /* ----- Navigation / topic ----- */
        currentTopicId: null,
        dashboardPath: [],              // array of topic ids; [] = root
        dashboardSearchQuery: '',       // lowercase, trimmed

        /* ----- Sidebar ----- */
        sidebarCollapsed: false,

        /* ----- Calendar ----- */
        calYear: null,
        calMonth: null,

        /* ----- Work reports ----- */
        workReportEntries: {},          // { 'YYYY-MM-DD': { content, isHO, reportName } }
        workReportsLoaded: false,

        /* ----- Themes ----- */
        activeSchemeId: 'dark',
        lastDarkSchemeId: 'dark',
        lastLightSchemeId: 'light',

        /* ----- Shared files viewer ----- */
        sharedFilesInitialized: false,
        currentSharedType: 'all',
        sharedSearchQuery: '',
        currentSharedPdfDoc: null,
        sharedPdfScale: 1.2,

        /* ----- Tour ----- */
        tourActive: false,
        tourIndex: 0,
        tourAutoStarted: false
    };

    // --- Topic registry ------------------------------------------------
    // Replaces window.TEMPLATE_TOPICS. Exposed as App.topics._registry for
    // module-internal use; public accessors live on App.topics (defined in
    // topics.js).
    App.topics = App.topics || {};
    App.topics._registry = {};

    // --- i18n stubs -----------------------------------------------------
    // The actual implementations live in an i18n module (or in topics.js).
    // We register no-op fallbacks here so any module can safely call
    // App.i18n.applyLang()/applyLangToDOM() even before that module loads.
    App.i18n = App.i18n || {};
    if (typeof App.i18n.applyLang !== 'function') {
        App.i18n.applyLang = function () { /* no-op until real impl loads */ };
    }
    if (typeof App.i18n.applyLangToDOM !== 'function') {
        App.i18n.applyLangToDOM = function () { /* no-op until real impl loads */ };
    }

    // --- Navigation stubs ----------------------------------------------
    // showDocView/closeTopic/showHomeView are defined in topics.js. Provide
    // safe fallbacks so early callers (e.g. init.js) don't throw if the
    // module hasn't loaded yet.
    App.nav = App.nav || {};
    if (typeof App.nav.showDocView !== 'function') {
        App.nav.showDocView = function () {
            console.warn('[state] App.nav.showDocView not implemented yet.');
        };
    }
    if (typeof App.nav.showHomeView !== 'function') {
        App.nav.showHomeView = function () {
            console.warn('[state] App.nav.showHomeView not implemented yet.');
        };
    }
    if (typeof App.nav.closeTopic !== 'function') {
        App.nav.closeTopic = function () {
            console.warn('[state] App.nav.closeTopic not implemented yet.');
        };
    }
    if (typeof App.nav.openHome !== 'function') {
        App.nav.openHome = function () {
            App.state.dashboardPath = [];
            App.state.dashboardSearchQuery = '';
            App.nav.showHomeView();
            if (App.dashboard && typeof App.dashboard.updateAll === 'function') {
                App.dashboard.updateAll();
            }
            window.scrollTo(0, 0);
        };
    }

    // --- Topics stubs ---------------------------------------------------
    // topics.js replaces these with the real implementations.
    if (typeof App.topics.getAll !== 'function') {
        App.topics.getAll = function () { return App.topics._registry; };
    }
    if (typeof App.topics.register !== 'function') {
        App.topics.register = function (topic) {
            if (topic && topic.id) App.topics._registry[topic.id] = topic;
        };
    }

    /* --------------------------------------------------------------
       Optional convenience: a tiny event bus so modules can react
       to state changes without polling. Not required, but handy.
       -------------------------------------------------------------- */
    App.bus = App.bus || (function () {
        const listeners = {};
        return {
            on(event, fn) {
                (listeners[event] = listeners[event] || []).push(fn);
            },
            off(event, fn) {
                if (!listeners[event]) return;
                listeners[event] = listeners[event].filter(f => f !== fn);
            },
            emit(event, payload) {
                (listeners[event] || []).forEach(fn => {
                    try { fn(payload); }
                    catch (e) { console.warn('[bus] listener error for', event, e); }
                });
            }
        };
    })();

    // --- Debug logs (harmless, gated by a query flag) -------------------
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.has('debug')) {
            console.log('[state] App namespace initialised', App);
        }
    } catch (_) { /* URLSearchParams unavailable — ignore */ }
})();