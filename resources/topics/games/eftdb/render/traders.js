// resources/topics/games/eftdb/render/traders.js
// Renders the trader cards grid. Consumed by controllers/eft-traders.js.

export function renderTraders(traders, isDe) {
    if (!traders || !traders.length) {
        return `<div class="eft-search-empty">
            ${isDe ? 'Keine Händler-Daten.' : 'No trader data.'}
        </div>`;
    }

    // Stable alphabetical order.
    const sorted = traders.slice().sort((a, b) =>
        (a.name || '').localeCompare(b.name || '')
    );

    return sorted.map(t => {
        const resetDate = t.resetTime ? new Date(t.resetTime) : null;
        const isFuture  = resetDate ? resetDate.getTime() > Date.now() : false;

        const timeStr = resetDate
            ? resetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '—';
        const dateStr = resetDate
            ? resetDate.toLocaleDateString([], { month: 'numeric', day: 'numeric' })
            : '';

        const currencyName = t.currency && t.currency.name ? t.currency.name : '';

        return `
        <div class="eft-trader-card">
            <div class="eft-trader-name">
                <i class="fa-solid fa-user-tie"></i> ${escapeHtml(t.name || 'Unknown')}
            </div>
            ${currencyName ? `
            <div class="eft-trader-row">
                <span>${isDe ? 'Währung' : 'Currency'}</span>
                <span class="eft-trader-value">${escapeHtml(currencyName)}</span>
            </div>` : ''}
            <div class="eft-trader-reset ${isFuture ? 'is-future' : 'is-past'}">
                <span class="eft-trader-reset-label">Reset</span>
                <span class="eft-trader-reset-time">${timeStr}</span>
                <span class="eft-trader-reset-date">${dateStr}</span>
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