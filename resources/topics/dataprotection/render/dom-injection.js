// resources/topics/dataprotection/render/dom-injection.js
// Injects rendered sections into the topic DOM and rebuilds the TOC.

export function injectIntoSections(rootEl, illustrationSection, payload, topicDef) {
    // Remove any previously injected sections (idempotent re-render).
    rootEl.querySelectorAll('.dsg-injected').forEach(el => el.remove());

    if (payload.html) {
        const container = document.createElement('div');
        container.innerHTML = payload.html;
        while (container.firstChild) {
            illustrationSection.parentNode.insertBefore(container.firstChild, illustrationSection);
        }
    }

    // Host-page integration hooks. These globals are provided by the shell.
    if (typeof renderTOC === 'function') {
        const tocTopic = Object.assign({}, topicDef, { sections: payload.sections });
        try { renderTOC(tocTopic); }
        catch (e) { console.warn('TOC rebuild failed:', e); }
    }
    if (typeof applyLangToDOM === 'function') applyLangToDOM();
    if (typeof observeSections === 'function') observeSections();
}

export function createLoadingPanel() {
    const panel = document.createElement('div');
    panel.id = 'dsg-loading-panel';
    panel.className = 'searchable-block topic-panel mt-6';
    panel.innerHTML = `
        <style>
            #dsg-loading-panel .dsg-spinner {
                display: inline-block; width: 14px; height: 14px;
                border: 2px solid var(--border-color);
                border-top-color: var(--link-color);
                border-radius: 50%;
                animation: dsg-spin 0.7s linear infinite;
                vertical-align: middle;
            }
            @keyframes dsg-spin { to { transform: rotate(360deg); } }
        </style>
        <h2>
            <span data-lang-de>Rechtsdaten werden geladen…</span>
            <span data-lang-en style="display:none;">Loading legal data…</span>
        </h2>
        <div class="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span class="dsg-spinner"></span>
            <span data-lang-de>Aktuelle DSGVO, BDSG, TTDSG und TKG Daten werden aus öffentlichen Quellen abgerufen..</span>
            <span data-lang-en style="display:none;">Fetching current GDPR, BDSG, TTDSG and TKG data from public sources…</span>
        </div>
    `;
    return panel;
}