// resources/topics/dataprotection/lifecycle.js
// onRender / onUnrender wiring for the Datenschutz topic.

import { meta } from './meta.js';
import { startAnimation, stopAnimation } from './controllers/datenschutz-flow.js';
import { ensureLegalData, hasCachedLegalData } from './services/law-data.js';
import { buildSectionsDataAndHtml } from './render/html-builders.js';
import { injectIntoSections, createLoadingPanel } from './render/dom-injection.js';
import { datenschutzFlowHtml } from './data/illustrations/datenschutz-flow.js';

// Patch the illustration markup into meta at load time. meta.js deliberately
// leaves animations[0].html empty to keep the style block out of meta.js.
if (meta.illustrations && meta.illustrations.animations && meta.illustrations.animations[0]) {
    meta.illustrations.animations[0].html = datenschutzFlowHtml;
}

// The full topic definition object, used by injectIntoSections() when it
// rebuilds the TOC after injecting the dynamically fetched law sections.
const topicDef = {
    ...meta,
    onRender: null,
    onUnrender: null
};

export function createLifecycle() {
    return {
        onRender: async function (rootEl) {
            // 1. Always (re)start the animation for this fresh DOM.
            startAnimation(rootEl);

            const illustrationSection = rootEl.querySelector('#section-illustrations');
            if (!illustrationSection || !illustrationSection.parentNode) return;

            // ---- Loading panel: only shown when the cache is cold ----
            let loadingPanel = null;
            if (!hasCachedLegalData()) {
                loadingPanel = createLoadingPanel();
                illustrationSection.parentNode.insertBefore(loadingPanel, illustrationSection);
            }

            // ---- Fetch (or return cached) ----
            let cached;
            try {
                cached = await ensureLegalData();
            } catch (err) {
                console.warn('Failed to load legal data:', err);
                if (loadingPanel && loadingPanel.isConnected) {
                    loadingPanel.innerHTML = `
                        <h2>
                            <span data-lang-de>Fehler beim Laden</span>
                            <span data-lang-en style="display:none;">Loading error</span>
                        </h2>
                        <p class="text-xs text-[var(--text-muted)]">
                            <span data-lang-de>Die Rechtsdaten konnten nicht geladen werden. Bitte später erneut versuchen.</span>
                            <span data-lang-en style="display:none;">Could not load the legal data. Please try again later.</span>
                        </p>
                    `;
                }
                return;
            }

            // If the user already navigated away, don't inject. The cache
            // still holds the payload for the next open.
            if (!rootEl.isConnected) return;

            if (loadingPanel) loadingPanel.remove();

            // ---- Build the section payload and inject it ----
            const payload = buildSectionsDataAndHtml(cached.allNorms, cached.anyFallback);
            injectIntoSections(rootEl, illustrationSection, payload, topicDef);
        },

        onUnrender: function () {
            stopAnimation();
            // Note: the services/law-data cache deliberately survives.
            // Next open injects instantly from the module-scoped cache.
        }
    };
}