// resources/topics/games/eftdb/controllers/eft-traders.js

import { TRADERS_QUERY } from '../data/queries.js';
import { queryTarkovAPI } from '../services/tarkov-api.js';
import { renderTraders } from '../render/traders.js';
import { isGerman, loadingHtml, errorHtml } from './_shared.js';

(function () {
    'use strict';

    async function init() {
        const container = document.getElementById('eftTradersContainer');
        if (!container || container.__eftTraders) return;
        container.__eftTraders = true;

        const isDe = isGerman();
        container.innerHTML = loadingHtml(isDe, 'Händler / traders');

        try {
            const data = await queryTarkovAPI(TRADERS_QUERY);
            const traders = (data.data && data.data.traders) || [];
            container.innerHTML = renderTraders(traders, isDe);
        } catch (err) {
            console.error('[eft-traders]', err);
            container.innerHTML = errorHtml(isDe, 'Traders');
        }
    }

    function start() { init(); setInterval(init, 500); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();