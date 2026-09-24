// resources/topics/games/eftdb/controllers/eft-items.js
//
// Item catalog with category tabs. Loads a category list once, then
// swaps the item grid when the user clicks a category.
//
// The tarkov.dev GraphQL API exposes item categories, but the JSON
// fallback (json.tarkov.dev) does not. So this controller ships a
// hardcoded fallback category list. If the API is up, we use its list;
// otherwise the fallback keeps the panel functional during outages.

import { ITEM_CATEGORIES_QUERY, ITEMS_BY_CATEGORY_QUERY } from '../data/queries.js';
import { queryTarkovAPI } from '../services/tarkov-api.js';
import { isGerman, loadingHtml, errorHtml, escapeHtml } from './_shared.js';

(function () {
    'use strict';

    // Hardcoded categories. Names match tarkov.dev's category identifiers.
    // Only used when the category-list query fails.
    const FALLBACK_CATEGORIES = [
        { id: 'weapon',      name: 'Weapon' },
        { id: 'ammo',        name: 'Ammo' },
        { id: 'armor',       name: 'Armor' },
        { id: 'helmet',      name: 'Helmet' },
        { id: 'rig',         name: 'ChestRig' },
        { id: 'backpack',    name: 'Backpack' },
        { id: 'headphones',  name: 'Headphones' },
        { id: 'mods',        name: 'Mods' },
        { id: 'keys',        name: 'Keys' },
        { id: 'barter',      name: 'BarterItem' },
        { id: 'meds',        name: 'MedKit' },
        { id: 'provisions',  name: 'FoodDrink' },
        { id: 'grenade',     name: 'Grenade' },
        { id: 'magazines',   name: 'Magazine' },
        { id: 'containers',  name: 'Inventory' }
    ];

    let activeCategory = 'Weapon';
    const itemCache = new Map();     // category name → items array

    function renderCategories(cats) {
        return `
        <div class="eft-items-cats">
            ${cats.map(c => `
                <button type="button"
                        class="eft-items-cat ${c.name === activeCategory ? 'is-active' : ''}"
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
            ${items.slice(0, 100).map(item => {
                const flea = item.avg24hPrice || item.basePrice || 0;
                const weight = item.weight != null ? item.weight.toFixed(2) + ' kg' : '';
                return `
                <div class="eft-item-card">
                    <div class="eft-item-thumb">
                        <img src="${escapeHtml(item.iconLink || '')}" alt=""
                             loading="lazy"
                             onerror="this.style.display='none'">
                    </div>
                    <div class="eft-item-meta">
                        <div class="eft-item-name">${escapeHtml(item.shortName || item.name || '')}</div>
                        <div class="eft-item-full">${escapeHtml(item.name || '')}</div>
                        <div class="eft-item-price">
                            <span>₽${flea.toLocaleString()}</span>
                            ${weight ? `<span class="eft-item-weight">${weight}</span>` : ''}
                        </div>
                    </div>
                </div>`;
            }).join('')}
        </div>`;
    }

    async function loadCategory(cats, itemsBox, isDe) {
        // If cached, render immediately
        if (itemCache.has(activeCategory)) {
            itemsBox.innerHTML = renderItems(itemCache.get(activeCategory), isDe);
            return;
        }

        itemsBox.innerHTML = loadingHtml(isDe, activeCategory);
        try {
            const data = await queryTarkovAPI(ITEMS_BY_CATEGORY_QUERY, { name: activeCategory });
            const items = (data.data && data.data.items) || [];
            itemCache.set(activeCategory, items);
            itemsBox.innerHTML = renderItems(items, isDe);
        } catch (err) {
            console.error('[eft-items]', err);
            itemsBox.innerHTML = errorHtml(isDe, activeCategory);
        }
    }

    function wireCategories(container, cats, isDe) {
        const itemsBox = container.querySelector('#eftItemsList');
        container.querySelectorAll('.eft-items-cat').forEach(btn => {
            btn.addEventListener('click', async () => {
                activeCategory = btn.dataset.cat;
                container.querySelectorAll('.eft-items-cat')
                    .forEach(b => b.classList.toggle('is-active', b === btn));
                await loadCategory(cats, itemsBox, isDe);
            });
        });
    }

    async function init() {
        const container = document.getElementById('eftItemsContainer');
        if (!container || container.__eftItems) return;
        container.__eftItems = true;

        const isDe = isGerman();

        // --- 1. Category list. Try the API, fall back to the static list. ---
        let cats;
        try {
            const catData = await queryTarkovAPI(ITEM_CATEGORIES_QUERY);
            const apiCats = (catData.data && catData.data.itemCategories) || [];
            cats = apiCats.length ? apiCats : FALLBACK_CATEGORIES;
        } catch (err) {
            console.warn('[eft-items] using fallback category list:', err.message);
            cats = FALLBACK_CATEGORIES;
        }

        // Make sure the initial category exists in whatever list we got.
        const names = cats.map(c => c.name);
        if (!names.includes(activeCategory)) {
            activeCategory = names[0] || 'Weapon';
        }

        // --- 2. Render the shell: tabs + item grid placeholder. ---
        container.innerHTML = `
            ${renderCategories(cats)}
            <div id="eftItemsList">${loadingHtml(isDe, activeCategory)}</div>
        `;

        // --- 3. Load the first category. ---
        const itemsBox = container.querySelector('#eftItemsList');
        await loadCategory(cats, itemsBox, isDe);

        // --- 4. Wire tab clicks. ---
        wireCategories(container, cats, isDe);
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();