// resources/topics/games/eftdb/controllers/eft-flea.js

import { queryTarkovAPI } from '../services/tarkov-api.js';
import { isGerman, loadingHtml, errorHtml, escapeHtml } from './_shared.js';

(function () {
    'use strict';

    const TOP_QUERY = `
        query {
            items(limit: 30, sortBy: [avg24hPrice]) {
                id
                name
                shortName
                iconLink
                avg24hPrice
                lastLowPrice
                changeLast48hPercent
                width
                height
            }
        }
    `;

    function renderFlea(items, isDe) {
        if (!items || !items.length) {
            return `<div class="eft-search-empty">${isDe ? 'Keine Flohmarkt-Daten.' : 'No flea market data.'}</div>`;
        }

        return `
        <div class="eft-flea-shell">
            <div class="eft-flea-head">
                <div class="eft-flea-head-title">
                    <i class="fa-solid fa-arrow-trend-up"></i>
                    ${isDe ? 'Top 30 nach 24h-Durchschnittspreis' : 'Top 30 by 24h average price'}
                </div>
                <div class="eft-flea-head-sub">
                    ${isDe ? 'Live von tarkov.dev' : 'Live from tarkov.dev'}
                </div>
            </div>
            <div class="eft-flea-list">
                ${items.map((item, i) => {
                    const price = item.avg24hPrice || 0;
                    const last = item.lastLowPrice || 0;
                    const change = item.changeLast48hPercent;
                    const changeCls = change == null ? '' : (change >= 0 ? 'is-up' : 'is-down');
                    const changeTxt = change == null ? '' : (change >= 0 ? '▲' : '▼') + Math.abs(change).toFixed(1) + '%';

                    return `
                    <div class="eft-flea-row">
                        <div class="eft-flea-rank">#${i + 1}</div>
                        <div class="eft-flea-thumb">
                            <img src="${item.iconLink}" alt="" loading="lazy" onerror="this.style.display='none'">
                        </div>
                        <div class="eft-flea-meta">
                            <div class="eft-flea-name">${escapeHtml(item.shortName || item.name)}</div>
                            <div class="eft-flea-full">${escapeHtml(item.name)} · ${item.width}×${item.height}</div>
                        </div>
                        <div class="eft-flea-price-col">
                            <div class="eft-flea-price">
                                <span class="eft-flea-price-label">avg</span>
                                <span class="eft-flea-price-value">₽${price.toLocaleString()}</span>
                            </div>
                            <div class="eft-flea-price-sub">
                                <span class="eft-flea-price-label">low</span>
                                <span class="eft-flea-price-value">₽${last.toLocaleString()}</span>
                                <span class="eft-flea-change ${changeCls}">${changeTxt}</span>
                            </div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    }

    async function init() {
        const container = document.getElementById('eftFleaContainer');
        if (!container || container.__eftFlea) return;
        container.__eftFlea = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Flohmarkt-Daten / flea market');

        try {
            const data = await queryTarkovAPI(TOP_QUERY);
            const items = (data.data && data.data.items) || [];
            container.innerHTML = renderFlea(items, isDe);
        } catch (err) {
            console.error('[eft-flea]', err);
            container.innerHTML = errorHtml(isDe, 'Flea Market');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();