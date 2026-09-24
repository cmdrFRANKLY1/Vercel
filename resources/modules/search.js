/* resources/modules/search.js
 * Wiki search: filter .searchable-block elements in the doc view,
 * highlight matches, and clean up highlights.
 * Depends on: state.js (App.state.currentTopicId)
 *             topics.js (App.nav.showDocView)
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[search] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;

    /* ----------------------------------------------------------
       Escape a string for safe use inside a RegExp
       ---------------------------------------------------------- */
    function escapeRegExp(s) {
        return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /* ----------------------------------------------------------
       Remove all .search-match spans, restoring plain text nodes
       ---------------------------------------------------------- */
    function removeHighlights(root) {
        if (!root) return;
        root.querySelectorAll('.search-match').forEach(span => {
            const p = span.parentNode;
            if (!p) return;
            p.replaceChild(document.createTextNode(span.textContent), span);
            p.normalize();
        });
    }

    /* ----------------------------------------------------------
       Wrap every occurrence of `keyword` in .search-match spans
       ---------------------------------------------------------- */
    function highlightText(element, keyword) {
        if (!keyword || !element) return;

        const tw = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToReplace = [];
        let node;
        const lowerKw = keyword.toLowerCase();

        while ((node = tw.nextNode())) {
            const tag = node.parentNode && node.parentNode.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE') continue;
            if (node.nodeValue.toLowerCase().includes(lowerKw)) {
                nodesToReplace.push(node);
            }
        }

        nodesToReplace.forEach(textNode => {
            const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi');
            const fragment = document.createDocumentFragment();
            const text = textNode.nodeValue;
            let match;
            let lastIndex = 0;

            while ((match = regex.exec(text)) !== null) {
                fragment.appendChild(
                    document.createTextNode(text.substring(lastIndex, match.index))
                );
                const span = document.createElement('span');
                span.className = 'search-match font-semibold';
                span.textContent = match[0];
                fragment.appendChild(span);
                lastIndex = regex.lastIndex;
            }

            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));

            if (textNode.parentNode) {
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
    }

    /* ----------------------------------------------------------
       Main filter — invoked by the sidebar + floating search inputs
       ---------------------------------------------------------- */
    function filterWiki(val) {
        // Make sure a topic is visible before searching.
        if (App.nav && typeof App.nav.showDocView === 'function') {
            App.nav.showDocView();
        }

        // If called without an argument (e.g. from a click handler),
        // fall back to the sidebar input's current value.
        if (typeof val !== 'string') {
            const mi = document.getElementById('wikiSearch');
            val = mi ? mi.value : '';
        }

        // Keep the two search inputs in sync.
        const mi = document.getElementById('wikiSearch');
        const fi = document.getElementById('floatingWikiSearch');
        if (mi && mi.value !== val) mi.value = val;
        if (fi && fi.value !== val) fi.value = val;

        const filter = val.toLowerCase();
        const blocks = document.querySelectorAll('.searchable-block');
        const mc = document.getElementById('main-content');

        removeHighlights(mc);

        if (!filter) {
            blocks.forEach(b => { b.style.display = ''; });
            return;
        }

        blocks.forEach(block => {
            const t = block.innerText.toLowerCase();
            if (t.includes(filter)) {
                block.style.display = '';
                highlightText(block, val);
            } else {
                block.style.display = 'none';
            }
        });
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.search = {
        filterWiki,
        highlightText,
        removeHighlights,
        escapeRegExp
    };
})();