// resources/topics/mukb/topic_mukb.js
// MuKb topic, Markt & Kundenbeziehungen, v1.0
// Thin entry point. All data and controllers live alongside this file.
//
// Layout:
//   ./meta.js                          → id, icon, titles, hero, quickLinks, links, footer
//   ./data/sections.js                 → assembles sections from ./data/sections/*
//   ./controllers/mukb-interactions.js → side-effect IIFE (notes, quizzes)

/* ==================================================================
   CONTROLLERS, imported first so their DOMContentLoaded / interval
   hooks are installed before registerTopic() runs.
   ================================================================== */
import './controllers/mukb-interactions.js';

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
    illustrations: null,
    links,
    footer
});
