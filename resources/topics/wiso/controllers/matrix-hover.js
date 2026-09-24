// resources/topics/wiso/controllers/matrix-hover.js
// WiSo 3×3 matrix hover controller.
// Auto-cycles nine cells (5 s each); hover pauses + highlights; leaving resumes.
// Uses event delegation + a global tick, so it survives re-renders.
//
// Loaded as a side-effect module from topic_wiso.js. No exports needed.

(function () {
    'use strict';
    var SLOT = 5000;    // 5 s per cell
    var TICK = 100;     // tick interval

    /* ---------- deep query (shadow DOM + same-origin iframes) ---------- */
    function deepQueryAll(root, selector, out) {
        out = out || [];
        try {
            root.querySelectorAll(selector).forEach(function (el) { out.push(el); });
            var all = root.querySelectorAll('*');
            for (var i = 0; i < all.length; i++) {
                if (all[i].shadowRoot) deepQueryAll(all[i].shadowRoot, selector, out);
            }
        } catch (_) {}
        return out;
    }
    function allDocuments() {
        var docs = [document];
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            try {
                if (iframes[i].contentDocument) docs.push(iframes[i].contentDocument);
            } catch (_) {}
        }
        return docs;
    }

    /* ---------- per-layout init ---------- */
    function initLayout(layout) {
        if (layout.__wisoMatrix) return;
        var cells = Array.prototype.slice.call(layout.querySelectorAll('.wiso-mm-cell'));
        var descs = Array.prototype.slice.call(layout.querySelectorAll('.wiso-mm-desc'));
        if (cells.length !== 9 || descs.length !== 9) return;

        var state = {
            cells: cells,
            descs: descs,
            idx: 0,
            paused: false,
            lastAdvance: (window.performance && performance.now) ? performance.now() : Date.now()
        };
        layout.__wisoMatrix = state;

        // switch OFF the pure-CSS fallback animation
        layout.classList.add('js-driven');

        function setActive(n) {
            state.idx = n;
            state.cells.forEach(function (c, i) { c.classList.toggle('is-active', i === n); });
            state.descs.forEach(function (d, i) { d.classList.toggle('is-active', i === n); });
        }

        /* ---------- delegation: bubble-phase listener on the layout ---------- */
        layout.addEventListener('mouseover', function (e) {
            var t = e.target;
            while (t && t !== layout) {
                if (t.classList && t.classList.contains('wiso-mm-cell')) {
                    var i = state.cells.indexOf(t);
                    if (i >= 0) {
                        state.paused = true;
                        setActive(i);
                    }
                    return;
                }
                t = t.parentNode;
            }
        });
        layout.addEventListener('mousemove', function (e) {
            var t = e.target;
            while (t && t !== layout) {
                if (t.classList && t.classList.contains('wiso-mm-cell')) {
                    var i = state.cells.indexOf(t);
                    if (i >= 0 && state.idx !== i) {
                        state.paused = true;
                        setActive(i);
                    }
                    return;
                }
                t = t.parentNode;
            }
        });

        /* ---------- resume when leaving the whole layout ---------- */
        layout.addEventListener('mouseleave', function () {
            state.paused = false;
            state.lastAdvance = (window.performance && performance.now) ? performance.now() : Date.now();
        });

        /* ---------- tick callback invoked by the global loop ---------- */
        state.tick = function () {
            if (state.paused) return;
            var now = (window.performance && performance.now) ? performance.now() : Date.now();
            if (now - state.lastAdvance >= SLOT) {
                state.lastAdvance = now;
                setActive((state.idx + 1) % 9);
            }
        };

        setActive(0);
    }

    /* ---------- scan + tick ---------- */
    function scan() {
        allDocuments().forEach(function (doc) {
            deepQueryAll(doc, '.wiso-mm-layout').forEach(function (l) {
                try { initLayout(l); } catch (_) {}
            });
        });
    }
    function globalTick() {
        allDocuments().forEach(function (doc) {
            deepQueryAll(doc, '.wiso-mm-layout').forEach(function (l) {
                if (l.__wisoMatrix && l.__wisoMatrix.tick) {
                    try { l.__wisoMatrix.tick(); } catch (_) {}
                }
            });
        });
    }

    function start() {
        scan();
        setInterval(scan, 300);
        setInterval(globalTick, TICK);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();