// resources/topics/games/eftdb/topic_eftdb.js
// Escape From Tarkov live database — thin entry point.
//
// Layout:
//   ./meta.js                    → id, icon, titles, hero, quickLinks, links, footer
//   ./lifecycle.js               → onRender / onUnrender
//   ./data/queries.js            → GraphQL query strings
//   ./services/tarkov-api.js     → cached fetch wrapper
//   ./render/*.js                → HTML builders (search, traders, maps)
//   ./controllers/*.js           → self-bootstrapping DOM wiring
//
// Each controller attaches itself to a container ID that is defined in
// ./meta.js sections. They are imported for side effects only — no
// exports are consumed here.

/* ==================================================================
   CONTROLLERS — imported first so their DOMContentLoaded / interval
   hooks are installed before registerTopic() runs.
   ================================================================== */
import './controllers/eft-search.js';
import './controllers/eft-market.js';
import './controllers/eft-flea.js';
import './controllers/eft-ballistics.js';
import './controllers/eft-ammo.js';
import './controllers/eft-quests.js';     // ← plural, matches the file on disk
import './controllers/eft-items.js';
import './controllers/eft-traders.js';
import './controllers/eft-maps.js';

/* ==================================================================
   DATA
   ================================================================== */
import { meta } from './meta.js';
import { createLifecycle } from './lifecycle.js';

/* ==================================================================
   TOPIC REGISTRATION
   ================================================================== */
const { onRender, onUnrender } = createLifecycle();

registerTopic({
    parentId: 'Games',
    ...meta,
    onRender,
    onUnrender
});