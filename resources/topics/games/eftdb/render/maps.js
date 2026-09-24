// resources/topics/games/eftdb/render/maps.js
// Renders the map cards grid. Consumed by controllers/eft-maps.js.

export function renderMaps(maps, isDe) {
    // Filter out utility pseudo-maps that tarkov.dev returns alongside
    // the real raid locations. These aren't playable and clutter the view.
    const valid = (maps || []).filter(m => {
        const n = (m.name || '').toLowerCase();
        return n !== 'hideout' &&
               n !== 'private sector' &&
               n !== 'the lab' ? true : true; // keep The Lab — it IS a real map
    });

    if (!valid.length) {
        return `<div class="eft-search-empty">
            ${isDe ? 'Keine Karten-Daten.' : 'No map data.'}
        </div>`;
    }

    // Sort alphabetically so the order is stable across reloads.
    const sorted = valid.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    return sorted.map(m => {
        const playersStr  = m.players || '1-?';
        const durationStr = m.raidDuration ? `${m.raidDuration} min` : 'N/A';

        return `
        <div class="eft-map-card">
            <div class="eft-map-name">
                <i class="fa-solid fa-map"></i> ${escapeHtml(m.name || 'Unnamed')}
            </div>
            <div class="eft-map-row">
                <span>${isDe ? 'Dauer' : 'Duration'}</span>
                <span class="eft-map-value">${escapeHtml(durationStr)}</span>
            </div>
            <div class="eft-map-row">
                <span>${isDe ? 'Spieler' : 'Players'}</span>
                <span class="eft-map-value">${escapeHtml(playersStr)}</span>
            </div>
        </div>`;
    }).join('');
}

function escapeHtml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}