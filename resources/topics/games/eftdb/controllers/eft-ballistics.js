// resources/topics/games/eftdb/controllers/eft-ballistics.js

import { queryTarkovAPI } from '../services/tarkov-api.js';
import { isGerman, loadingHtml, errorHtml, escapeHtml } from './_shared.js';

(function () {
    'use strict';

    const ARMOR_QUERY = `
        query {
            items(categoryNames: [Armor, ChestRig], limit: 40) {
                id
                name
                shortName
                iconLink
                weight
                properties {
                    ... on ItemPropertiesArmor {
                        class
                        durability
                        material { name }
                        zones
                    }
                    ... on ItemPropertiesChestRig {
                        class
                        durability
                        material { name }
                        zones
                    }
                }
            }
        }
    `;

    function classColor(cls) {
        const map = {
            1: 'var(--text-muted)',
            2: '#5fd39a',
            3: '#5b8def',
            4: '#e0b64a',
            5: '#f0a35e',
            6: '#e0685a'
        };
        return map[cls] || 'var(--text-muted)';
    }

    function renderBallistics(items, isDe) {
        if (!items || !items.length) {
            return `<div class="eft-search-empty">${isDe ? 'Keine Ballistik-Daten.' : 'No ballistics data.'}</div>`;
        }
        return `
        <div class="eft-card-grid">
            ${items.map(item => {
                const p = item.properties || {};
                const cls = p.class || '?';
                const clsColor = classColor(cls);
                const zones = (p.zones || []).join(', ') || '—';
                return `
                <div class="eft-armor-card">
                    <div class="eft-armor-head">
                        <div class="eft-armor-thumb">
                            <img src="${item.iconLink}" alt="" loading="lazy" onerror="this.style.display='none'">
                        </div>
                        <div class="eft-armor-meta">
                            <div class="eft-armor-name">${escapeHtml(item.shortName || item.name)}</div>
                            <div class="eft-armor-class" style="color:${clsColor}">
                                ${isDe ? 'Klasse' : 'Class'} ${cls}
                            </div>
                        </div>
                    </div>
                    <div class="eft-armor-row">
                        <span>${isDe ? 'Haltbarkeit' : 'Durability'}</span>
                        <span class="eft-armor-value">${p.durability ?? '—'}</span>
                    </div>
                    <div class="eft-armor-row">
                        <span>${isDe ? 'Material' : 'Material'}</span>
                        <span class="eft-armor-value">${escapeHtml((p.material && p.material.name) || '—')}</span>
                    </div>
                    <div class="eft-armor-row">
                        <span>${isDe ? 'Zonen' : 'Zones'}</span>
                        <span class="eft-armor-value eft-armor-zones">${escapeHtml(zones)}</span>
                    </div>
                </div>`;
            }).join('')}
        </div>`;
    }

    async function init() {
        const container = document.getElementById('eftBallisticsContainer');
        if (!container || container.__eftBallistics) return;
        container.__eftBallistics = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Ballistik / ballistics');

        try {
            const data = await queryTarkovAPI(ARMOR_QUERY);
            const items = (data.data && data.data.items) || [];
            container.innerHTML = renderBallistics(items, isDe);
        } catch (err) {
            console.error('[eft-ballistics]', err);
            container.innerHTML = errorHtml(isDe, 'Ballistics');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();