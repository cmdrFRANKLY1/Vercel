// resources/topics/games/eftdb/controllers/eft-ammo.js

import { queryTarkovAPI } from '../services/tarkov-api.js';
import { isGerman, loadingHtml, errorHtml, escapeHtml } from './_shared.js';

(function () {
    'use strict';

    const AMMO_QUERY = `
        query {
            items(categoryNames: [Ammo], limit: 200) {
                id
                name
                shortName
                iconLink
                properties {
                    ... on ItemPropertiesAmmo {
                        caliber
                        damage
                        penetrationPower
                        armorDamage
                        fragmentationChance
                        initialSpeed
                    }
                }
            }
        }
    `;

    function penColor(pen) {
        if (pen >= 40) return 'var(--accent-green)';
        if (pen >= 30) return 'var(--accent-blue)';
        if (pen >= 20) return 'var(--accent-amber)';
        return 'var(--accent-red)';
    }

    function renderAmmo(items, isDe) {
        if (!items || !items.length) {
            return `<div class="eft-search-empty">${isDe ? 'Keine Munitions-Daten.' : 'No ammo data.'}</div>`;
        }
        const sorted = items.slice().sort((a, b) => {
            const ca = a.properties?.caliber || '';
            const cb = b.properties?.caliber || '';
            if (ca !== cb) return ca.localeCompare(cb);
            return (b.properties?.penetrationPower || 0) - (a.properties?.penetrationPower || 0);
        });

        return `
        <div class="eft-ammo-shell">
            <div class="eft-ammo-head">
                <span>${isDe ? 'Kaliber' : 'Caliber'}</span>
                <span>${isDe ? 'Munition' : 'Cartridge'}</span>
                <span>Dmg</span>
                <span>Pen</span>
                <span>Armor %</span>
                <span>Frag %</span>
            </div>
            <div class="eft-ammo-body">
                ${sorted.map(item => {
                    const p = item.properties || {};
                    const pen = p.penetrationPower ?? 0;
                    const frag = p.fragmentationChance != null ? (p.fragmentationChance * 100).toFixed(0) : '—';
                    const armorDmg = p.armorDamage != null ? p.armorDamage.toFixed(0) : '—';
                    return `
                    <div class="eft-ammo-row">
                        <span class="eft-ammo-cal">${escapeHtml(p.caliber || '—')}</span>
                        <span class="eft-ammo-name">
                            <img src="${item.iconLink}" alt="" loading="lazy" onerror="this.style.display='none'">
                            ${escapeHtml(item.shortName || item.name)}
                        </span>
                        <span class="eft-ammo-num">${p.damage ?? '—'}</span>
                        <span class="eft-ammo-num" style="color:${penColor(pen)}">${pen}</span>
                        <span class="eft-ammo-num">${armorDmg}</span>
                        <span class="eft-ammo-num">${frag}</span>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    }

    async function init() {
        const container = document.getElementById('eftAmmoContainer');
        if (!container || container.__eftAmmo) return;
        container.__eftAmmo = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Munition / ammo');

        try {
            const data = await queryTarkovAPI(AMMO_QUERY);
            const items = (data.data && data.data.items) || [];
            container.innerHTML = renderAmmo(items, isDe);
        } catch (err) {
            console.error('[eft-ammo]', err);
            container.innerHTML = errorHtml(isDe, 'Ammo');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();