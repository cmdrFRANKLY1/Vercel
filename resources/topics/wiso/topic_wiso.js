// resources/topics/wiso/topic_wiso.js
// WiSo topic — v3.6
// Thin entry point. All data and controllers live alongside this file.
//
// Layout:
//   ./meta.js                          → id, icon, titles, hero, quickLinks, links, footer
//   ./data/sections.js                 → assembles 9 sections from ./data/sections/*
//   ./data/illustrations.js            → assembles animations from ./data/illustrations/*
//   ./controllers/matrix-hover.js      → side-effect IIFE (3×3 matrix)
//   ./controllers/handelsrecht.js      → side-effect IIFE (quiz, textareas, Firmenbaukasten)

/* ==================================================================
   CONTROLLERS — imported first so their DOMContentLoaded / interval
   hooks are installed before registerTopic() runs.
   ================================================================== */
import './controllers/matrix-hover.js';
import './controllers/handelsrecht.js';

/* ==================================================================
   DATA
   ================================================================== */
import {
    id,
    icon,
    titleDe,
    titleEn,
    descDe,
    descEn,
    sidebarTitleDe,
    sidebarTitleEn,
    sidebarSubtitleDe,
    sidebarSubtitleEn,
    sidebarVersion,
    hero,
    quickLinks,
    links,
    footer
} from './meta.js';

import { sections } from './data/sections.js';
import { illustrations } from './data/illustrations.js';

/* ==================================================================
   TOPIC REGISTRATION
   ================================================================== */
registerTopic({
    id,
    icon,
    titleDe,
    titleEn,
    descDe,
    descEn,

    sidebarTitleDe,
    sidebarTitleEn,
    sidebarSubtitleDe,
    sidebarSubtitleEn,
    sidebarVersion,

    hero,
    quickLinks,
    sections,
    illustrations,
    links,
    footer
});