// resources/topics/games/eftdb/controllers/eft-market.js

import { queryTarkovAPI } from '../services/tarkov-api.js';
import { isGerman, loadingHtml, errorHtml, escapeHtml } from './_shared.js';

(function () {
    'use strict';

    const MARKET_QUERY = `
        query {
            items(limit: 100, sortBy: [avg24hPrice]) {
                id
                name
                shortName
                iconLink
                avg24hPrice
                lastLowPrice
                changeLast48hPercent
            }
        }
    `;

    function computeSummary(items) {
        const withPrice = items.filter(i => i.avg24hPrice != null);
        const total = withPrice.reduce((sum, i) => sum + i.avg24hPrice, 0);
        const avg = withPrice.length ? Math.round(total / withPrice.length) : 0;
        const max = withPrice.reduce((m, i) => Math.max(m, i.avg24hPrice), 0);
        const upMovers = items.filter(i => (i.changeLast48hPercent || 0) > 0).length;
        const downMovers = items.filter(i => (i.changeLast48hPercent || 0) < 0).length;
        return { count: withPrice.length, avg, max, upMovers, downMovers };
    }

    function renderMarket(items, isDe) {
        if (!items || !items.length) {
            return `<div class="eft-search-empty">${isDe ? 'Keine Markt-Daten.' : 'No market data.'}</div>`;
        }
        const s = computeSummary(items);

        const gainers = items
            .filter(i => i.changeLast48hPercent != null)
            .sort((a, b) => (b.changeLast48hPercent || 0) - (a.changeLast48hPercent || 0))
            .slice(0, 5);
        const losers = items
            .filter(i => i.changeLast48hPercent != null)
            .sort((a, b) => (a.changeLast48hPercent || 0) - (b.changeLast48hPercent || 0))
            .slice(0, 5);

        return `
        <div class="eft-market-shell">
            <div class="eft-market-summary">
                <div class="eft-market-stat">
                    <div class="eft-market-stat-label">${isDe ? 'Items erfasst' : 'Items tracked'}</div>
                    <div class="eft-market-stat-value">${s.count}</div>
                </div>
                <div class="eft-market-stat">
                    <div class="eft-market-stat-label">${isDe ? 'Ø Preis' : 'Avg price'}</div>
                    <div class="eft-market-stat-value">₽${s.avg.toLocaleString()}</div>
                </div>
                <div class="eft-market-stat">
                    <div class="eft-market-stat-label">${isDe ? 'Höchster Preis' : 'Highest'}</div>
                    <div class="eft-market-stat-value">₽${s.max.toLocaleString()}</div>
                </div>
                <div class="eft-market-stat">
                    <div class="eft-market-stat-label">${isDe ? 'Gewinner / Verlierer' : 'Gainers / Losers'}</div>
                    <div class="eft-market-stat-value">
                        <span class="eft-market-up">▲ ${s.upMovers}</span>
                        <span class="eft-market-down">▼ ${s.downMovers}</span>
                    </div>
                </div>
            </div>
            <div class="eft-market-two-col">
                <div class="eft-market-col">
                    <div class="eft-market-col-head">
                        <i class="fa-solid fa-arrow-trend-up"></i>
                        ${isDe ? 'Top Gewinner (48h)' : 'Top gainers (48h)'}
                    </div>
                    ${gainers.map(i => `
                        <div class="eft-market-row">
                            <img src="${i.iconLink}" alt="" loading="lazy" onerror="this.style.display='none'">
                            <span class="eft-market-row-name">${escapeHtml(i.shortName || i.name)}</span>
                            <span class="eft-market-row-value is-up">+${(i.changeLast48hPercent || 0).toFixed(1)}%</span>
                        </div>
                    `).join('')}
                </div>
                <div class="eft-market-col">
                    <div class="eft-market-col-head">
                        <i class="fa-solid fa-arrow-trend-down"></i>
                        ${isDe ? 'Top Verlierer (48h)' : 'Top losers (48h)'}
                    </div>
                    ${losers.map(i => `
                        <div class="eft-market-row">
                            <img src="${i.iconLink}" alt="" loading="lazy" onerror="this.style.display='none'">
                            <span class="eft-market-row-name">${escapeHtml(i.shortName || i.name)}</span>
                            <span class="eft-market-row-value is-down">${(i.changeLast48hPercent || 0).toFixed(1)}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
    }

    async function init() {
        const container = document.getElementById('eftMarketContainer');
        if (!container || container.__eftMarket) return;
        container.__eftMarket = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Markt / market');

        try {
            const data = await queryTarkovAPI(MARKET_QUERY);
            const items = (data.data && data.data.items) || [];
            container.innerHTML = renderMarket(items, isDe);
        } catch (err) {
            console.error('[eft-market]', err);
            container.innerHTML = errorHtml(isDe, 'Market');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();