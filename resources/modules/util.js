/* resources/modules/util.js
 * Shared helpers + window.App namespace bootstrap + constants.
 * MUST be loaded FIRST — every other module assumes window.App exists.
 *
 * Exposes:
 *   App.util  — escapeHtml, pad2, ymd, addDays, nthWeekday, lastWeekday,
 *               ghFetch, fetchRawBuffer, escapeRegExp
 *   App.constants — GH_USER, GH_REPO, GH_BRANCH, GH_API, GH_RAW,
 *                   REPORTS_FOLDER, SHARED_ROOT, SHARED_SUBFOLDERS,
 *                   TOPIC_LIST_PATH, DEBUG_TOPIC_ID
 *
 * state.js will merge into App.constants and App.util — this file is
 * authoritative for the values it defines, but never clobbers what was
 * already there.
 */
(function () {
    'use strict';

    /* ----------------------------------------------------------
       Root namespace
       ---------------------------------------------------------- */
    window.App = window.App || {};

    /* ----------------------------------------------------------
       Constants
       ---------------------------------------------------------- */
    App.constants = Object.assign({
        GH_USER:   'cmdrFRANKLY1',
        GH_REPO:   'Viona',
        GH_BRANCH: 'main',

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

    // Derived GitHub URLs (computed once so every module agrees).
    if (!App.constants.GH_API) {
        App.constants.GH_API =
            `https://api.github.com/repos/${App.constants.GH_USER}/${App.constants.GH_REPO}`;
    }
    if (!App.constants.GH_RAW) {
        App.constants.GH_RAW =
            `https://raw.githubusercontent.com/${App.constants.GH_USER}/${App.constants.GH_REPO}/${App.constants.GH_BRANCH}`;
    }

    /* ----------------------------------------------------------
       String / HTML helpers
       ---------------------------------------------------------- */
    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, ch => (
            { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
        ));
    }

    function escapeRegExp(s) {
        return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /* ----------------------------------------------------------
       Date helpers
       ---------------------------------------------------------- */
    function pad2(n) {
        return String(n).padStart(2, '0');
    }

    // Returns 'YYYY-MM-DD' in local time.
    function ymd(d) {
        return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    }

    // Returns a new Date offset by `days` from `date` (time-of-day reset).
    function addDays(date, days) {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        d.setDate(d.getDate() + days);
        return d;
    }

    // Nth weekday of a month. weekday: 0=Sun … 6=Sat. n: 1-based.
    function nthWeekday(year, month, weekday, n) {
        const first = new Date(year, month, 1);
        const offset = (weekday - first.getDay() + 7) % 7;
        return new Date(year, month, 1 + offset + (n - 1) * 7);
    }

    // Last given weekday of a month. weekday: 0=Sun … 6=Sat.
    function lastWeekday(year, month, weekday) {
        const last = new Date(year, month + 1, 0);
        const offset = (last.getDay() - weekday + 7) % 7;
        return new Date(year, month, last.getDate() - offset);
    }

    /* ----------------------------------------------------------
       GitHub helpers
       ---------------------------------------------------------- */

    // Fetch the contents listing for a repo path. Falls back to a
    // CORS proxy (allorigins) if the direct API call fails.
    async function ghFetch(path) {
        try {
            const res = await fetch(`${App.constants.GH_API}/contents/${path}`);
            if (res.ok) return await res.json();
        } catch (e) { /* fall through to proxy */ }

        try {
            const res = await fetch(
                'https://api.allorigins.win/raw?url=' +
                encodeURIComponent(`${App.constants.GH_API}/contents/${path}`)
            );
            if (res.ok) return await res.json();
        } catch (e) { /* ignore */ }

        throw new Error(`GitHub fetch failed for ${path}`);
    }

    // Fetch a raw file as an ArrayBuffer. Falls back to a CORS proxy.
    async function fetchRawBuffer(url) {
        try {
            const res = await fetch(url);
            if (res.ok) return await res.arrayBuffer();
        } catch (e) { /* fall through */ }

        const res = await fetch(
            'https://api.allorigins.win/raw?url=' + encodeURIComponent(url)
        );
        if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
        return await res.arrayBuffer();
    }

    /* ----------------------------------------------------------
       Export
       ---------------------------------------------------------- */
    App.util = Object.assign({
        escapeHtml,
        escapeRegExp,
        pad2,
        ymd,
        addDays,
        nthWeekday,
        lastWeekday,
        ghFetch,
        fetchRawBuffer
    }, App.util || {});
})();