// resources/topics/games/eftdb/controllers/eft-items.js

import { queryTarkovAPI } from '../services/tarkov-api.js';
import { isGerman, loadingHtml, errorHtml, escapeHtml } from './_shared.js';

(function () {
    'use strict';

    const CATEGORIES_QUERY = `
        query {
            itemCategories { id name }
        }
    `;

    const ITEMS_BY_CATEGORY_QUERY = `
        query($name: String!) {
            items(categoryNames: [$name], limit: 100) {
                id
                name
                shortName
                iconLink
                basePrice
                avg24hPrice
                weight
            }
        }
    `;

    let activeCategory = 'Weapon';

    function renderCategories(cats, isDe) {
        return `
        <div class="eft-items-cats">
            ${cats.map(c => `
                <button type="button" class="eft-items-cat ${c.name === activeCategory ? 'is-active' : ''}"
                        data-cat="${escapeHtml(c.name)}">
                    ${escapeHtml(c.name)}
                </button>
            `).join('')}
        </div>`;
    }

    function renderItems(items, isDe) {
        if (!items || !items.length) {
            return `<div class="eft-search-empty">${isDe ? 'Keine Items.' : 'No items.'}</div>`;
        }
        return `
        <div class="eft-card-grid">
            ${items.map(item => {
                const flea = item.avg24hPrice || 0;
                return `
                <div class="eft-item-card">
                    <div class="eft-item-thumb">
                        <img src="${item.iconLink}" alt="" loading="lazy" onerror="this.style.display='none'">
                    </div>
                    <div class="eft-item-meta">
                        <div class="eft-item-name">${escapeHtml(item.shortName || item.name)}</div>
                        <div class="eft-item-full">${escapeHtml(item.name)}</div>
                        <div class="eft-item-price">
                            <span>₽${flea.toLocaleString()}</span>
                            ${item.weight != null ? `<span class="eft-item-weight">${item.weight.toFixed(2)} kg</span>` : ''}
                        </div>
                    </div>
                </div>`;
            }).join('')}
        </div>`;
    }

    function wireCategories(container, isDe) {
        const itemsBox = container.querySelector('#eftItemsList');
        container.querySelectorAll('.eft-items-cat').forEach(btn => {
            btn.addEventListener('click', async () => {
                activeCategory = btn.dataset.cat;
                container.querySelectorAll('.eft-items-cat').forEach(b => b.classList.toggle('is-active', b === btn));
                itemsBox.innerHTML = loadingHtml(isDe, activeCategory);
                try {
                    const data = await queryTarkovAPI(ITEMS_BY_CATEGORY_QUERY, { name: activeCategory });
                    const items = (data.data && data.data.items) || [];
                    itemsBox.innerHTML = renderItems(items, isDe);
                } catch (err) {
                    console.error('[eft-items]', err);
                    itemsBox.innerHTML = errorHtml(isDe, activeCategory);
                }
            });
        });
    }

    async function init() {
        const container = document.getElementById('eftItemsContainer');
        if (!container || container.__eftItems) return;
        container.__eftItems = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Items');

        try {
            const catData = await queryTarkovAPI(CATEGORIES_QUERY);
            const cats = (catData.data && catData.data.itemCategories) || [];
            container.innerHTML = `
                ${renderCategories(cats, isDe)}
                <div id="eftItemsList">${loadingHtml(isDe, activeCategory)}</div>
            `;
            const itemData = await queryTarkovAPI(ITEMS_BY_CATEGORY_QUERY, { name: activeCategory });
            const items = (itemData.data && itemData.data.items) || [];
            container.querySelector('#eftItemsList').innerHTML = renderItems(items, isDe);
            wireCategories(container, isDe);
        } catch (err) {
            console.error('[eft-items]', err);
            container.innerHTML = errorHtml(isDe, 'Items');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();