// resources/topics/games/eftdb/controllers/eft-maps.js

import { MAPS_QUERY } from '../data/queries.js';
import { queryTarkovAPI } from '../services/tarkov-api.js';
import { renderMaps } from '../render/maps.js';
import { isGerman, loadingHtml, errorHtml } from './_shared.js';

(function () {
    'use strict';

    async function init() {
        const container = document.getElementById('eftMapsContainer');
        if (!container || container.__eftMaps) return;
        container.__eftMaps = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Karten / maps');

        try {
            const data = await queryTarkovAPI(MAPS_QUERY);
            const maps = (data.data && data.data.maps) || [];
            container.innerHTML = renderMaps(maps, isDe);
        } catch (err) {
            console.error('[eft-maps]', err);
            container.innerHTML = errorHtml(isDe, 'Maps');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();