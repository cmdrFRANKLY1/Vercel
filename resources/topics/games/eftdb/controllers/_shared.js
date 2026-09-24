// resources/topics/games/eftdb/controllers/_shared.js

export function isGerman() {
    return document.body.getAttribute('data-active-lang') !== 'en';
}

export function loadingHtml(isDe, label) {
    return `<div class="eft-loading">
        <i class="fa-solid fa-spinner fa-spin"></i>
        ${isDe ? `Lade ${label}…` : `Loading ${label}…`}
    </div>`;
}

export function errorHtml(isDe, label) {
    return `<div class="eft-error">
        <i class="fa-solid fa-triangle-exclamation"></i>
        ${isDe ? `API-Fehler beim Laden: ${label}` : `API error loading: ${label}`}
    </div>`;
}

export function escapeHtml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}