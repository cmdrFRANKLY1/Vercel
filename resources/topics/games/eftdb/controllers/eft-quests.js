// resources/topics/games/eftdb/controllers/eft-quest.js

import { queryTarkovAPI } from '../services/tarkov-api.js';
import { isGerman, loadingHtml, errorHtml, escapeHtml } from './_shared.js';

(function () {
    'use strict';

    const QUESTS_QUERY = `
        query {
            tasks {
                id
                name
                minPlayerLevel
                kappaRequired
                wikiLink
                trader { name }
                map { name }
            }
        }
    `;

    let allTasks = [];
    let activeTrader = '__all__';
    let searchTerm = '';

    function renderQuests(isDe) {
        const filtered = allTasks.filter(t => {
            if (activeTrader !== '__all__' && (t.trader?.name || '') !== activeTrader) return false;
            if (searchTerm && !t.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });

        if (!filtered.length) {
            return `<div class="eft-search-empty">${isDe ? 'Keine Quests gefunden.' : 'No quests found.'}</div>`;
        }

        return `
        <div class="eft-quest-list">
            ${filtered.map(t => `
                <a href="${escapeHtml(t.wikiLink || '#')}" target="_blank" rel="noopener" class="eft-quest-card">
                    <div class="eft-quest-head">
                        <span class="eft-quest-name">${escapeHtml(t.name)}</span>
                        ${t.kappaRequired ? '<span class="eft-quest-kappa">KAPPA</span>' : ''}
                    </div>
                    <div class="eft-quest-meta">
                        <span><i class="fa-solid fa-user-tie"></i> ${escapeHtml(t.trader?.name || '—')}</span>
                        <span><i class="fa-solid fa-map"></i> ${escapeHtml(t.map?.name || '—')}</span>
                        <span><i class="fa-solid fa-signal"></i> Lv ${t.minPlayerLevel ?? '—'}</span>
                    </div>
                </a>
            `).join('')}
        </div>`;
    }

    function renderControls(isDe) {
        const traders = [...new Set(allTasks.map(t => t.trader?.name).filter(Boolean))].sort();
        return `
        <div class="eft-quest-controls">
            <div class="eft-quest-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="eftQuestSearchInput"
                       placeholder="${isDe ? 'Quest suchen…' : 'Search quests…'}"
                       value="${escapeHtml(searchTerm)}">
            </div>
            <select id="eftQuestTraderFilter" class="eft-quest-select">
                <option value="__all__">${isDe ? 'Alle Händler' : 'All traders'}</option>
                ${traders.map(t => `<option value="${escapeHtml(t)}" ${t === activeTrader ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('')}
            </select>
        </div>`;
    }

    function wireControls(container, isDe) {
        const search = container.querySelector('#eftQuestSearchInput');
        const filter = container.querySelector('#eftQuestTraderFilter');
        const list = container.querySelector('#eftQuestList');
        const rerender = () => { list.innerHTML = renderQuests(isDe); };
        search?.addEventListener('input', e => { searchTerm = e.target.value; rerender(); });
        filter?.addEventListener('change', e => { activeTrader = e.target.value; rerender(); });
    }

    async function init() {
        const container = document.getElementById('eftQuestContainer');
        if (!container || container.__eftQuest) return;
        container.__eftQuest = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Quests');

        try {
            const data = await queryTarkovAPI(QUESTS_QUERY);
            allTasks = (data.data && data.data.tasks) || [];
            container.innerHTML = `
                ${renderControls(isDe)}
                <div id="eftQuestList">${renderQuests(isDe)}</div>
            `;
            wireControls(container, isDe);
        } catch (err) {
            console.error('[eft-quest]', err);
            container.innerHTML = errorHtml(isDe, 'Quests');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();