// resources/topics/dataprotection/topic_dataprotection.js
// IHK Datenschutz (DSGVO / BDSG) reference — v3.1
// Thin entry point. All data, services, renderers and the animation
// live alongside this file.
//
// Layout:
//   ./meta.js
//   ./lifecycle.js
//   ./data/sections.js
//   ./data/illustrations.js
//   ./controllers/datenschutz-flow.js
//   ./services/*.js
//   ./render/*.js

import { meta } from './meta.js';
import { createLifecycle } from './lifecycle.js';

const { onRender, onUnrender } = createLifecycle();

registerTopic({
    ...meta,
    onRender,
    onUnrender
});