/* resources/modules/themes.js
 * Color schemes: load from resources/colorSchemes.json, apply to :root,
 * toggle light/dark, render the themes modal grid.
 *
 * v3:
 *   - Themes modal splits schemes into Dark / Light / Custom sections.
 *   - "Edit colors" opens a SEPARATE popup (#customColorsModal).
 *   - That popup does NOT dim the background.
 *   - Color changes are previewed LIVE on the page.
 *   - Only "Apply" commits them; closing by any other means reverts.
 *   - While open, all other popups are hidden (and restored on cancel).
 *
 * Depends on: util.js (escapeHtml)
 *             state.js (App.state.activeSchemeId, App.state.lastDarkSchemeId,
 *                       App.state.lastLightSchemeId)
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[themes] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;
    const { escapeHtml } = App.util;

    /* ----------------------------------------------------------
       Built-in schemes (always present)
       ---------------------------------------------------------- */
    const BUILTIN_SCHEMES = [
        {
            id: 'dark',
            name: { de: 'Dunkel (Monochrom)', en: 'Dark (Monochrome)' },
            dark: true,
            builtin: true,
            preview: {
                'bg-color': '#121212',
                'panel-color': '#1e1e1e',
                'border-color': '#333333',
                'link-color': '#b0b0b0',
                'heading-color': '#ffffff'
            }
        },
        {
            id: 'light',
            name: { de: 'Hell (Monochrom)', en: 'Light (Monochrome)' },
            dark: false,
            builtin: true,
            preview: {
                'bg-color': '#f5f5f5',
                'panel-color': '#ffffff',
                'border-color': '#d8d8d8',
                'link-color': '#424242',
                'heading-color': '#000000'
            }
        }
    ];

    /* ----------------------------------------------------------
       Custom scheme constants
       ---------------------------------------------------------- */
    const CUSTOM_SCHEME_ID = 'custom';
    const CUSTOM_STORAGE_KEY = 'cheatSheetCustom';

    const CUSTOM_FIELDS = [
        { key: 'bg-color',       labelDe: 'Hintergrund',      labelEn: 'Background' },
        { key: 'panel-color',    labelDe: 'Panel',            labelEn: 'Panel' },
        { key: 'sidebar-color',  labelDe: 'Sidebar',          labelEn: 'Sidebar' },
        { key: 'border-color',   labelDe: 'Rahmen',           labelEn: 'Border' },
        { key: 'text-color',     labelDe: 'Text',             labelEn: 'Text' },
        { key: 'text-muted',     labelDe: 'Text (gedämpft)',  labelEn: 'Text (muted)' },
        { key: 'link-color',     labelDe: 'Link',             labelEn: 'Link' },
        { key: 'link-hover',     labelDe: 'Link (Hover)',     labelEn: 'Link (hover)' },
        { key: 'heading-color',  labelDe: 'Überschrift',      labelEn: 'Heading' },
        { key: 'subtitle-color', labelDe: 'Untertitel',       labelEn: 'Subtitle' },
        { key: 'code-bg',        labelDe: 'Code-Hintergrund', labelEn: 'Code background' },
        { key: 'info-box',       labelDe: 'Info-Box',         labelEn: 'Info box' }
    ];

    const CUSTOM_DEFAULTS = {
        'bg-color': '#121212',
        'panel-color': '#1e1e1e',
        'sidebar-color': '#181818',
        'border-color': '#333333',
        'text-color': '#e0e0e0',
        'text-muted': '#9e9e9e',
        'link-color': '#b0b0b0',
        'link-hover': '#ffffff',
        'heading-color': '#ffffff',
        'subtitle-color': '#e0e0e0',
        'code-bg': '#2a2a2a',
        'info-box': '#252525'
    };

    /* ----------------------------------------------------------
       Module-local state
       ---------------------------------------------------------- */
    let allSchemes = [...BUILTIN_SCHEMES];
    const appliedInlineVars = new Set();
    let customScheme = null;    // { id, name, dark, custom:true, colors:{...} }
    let editSnapshot = null;    // snapshot taken when the color editor opens

    /* ----------------------------------------------------------
       Custom scheme persistence
       ---------------------------------------------------------- */
    function loadCustomScheme() {
        let raw = null;
        try { raw = localStorage.getItem(CUSTOM_STORAGE_KEY); } catch (_) {}

        let colors = { ...CUSTOM_DEFAULTS };
        let dark = true;

        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') {
                    if (parsed.colors && typeof parsed.colors === 'object') {
                        colors = { ...CUSTOM_DEFAULTS, ...parsed.colors };
                    }
                    if (typeof parsed.dark === 'boolean') dark = parsed.dark;
                }
            } catch (_) { /* ignore */ }
        }

        customScheme = {
            id: CUSTOM_SCHEME_ID,
            name: { de: 'Benutzerdefiniert', en: 'Custom' },
            dark,
            custom: true,
            colors
        };
    }

    function saveCustomScheme() {
        if (!customScheme) return;
        try {
            localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify({
                dark: customScheme.dark,
                colors: customScheme.colors
            }));
        } catch (_) { /* ignore */ }
    }

    /* ----------------------------------------------------------
       Load custom schemes from resources/colorSchemes.json
       ---------------------------------------------------------- */
    async function loadColorSchemes() {
        try {
            const res = await fetch('resources/colorSchemes.json', { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);

            const data = await res.json();
            const builtinIds = new Set(BUILTIN_SCHEMES.map(s => s.id));
            const custom = (Array.isArray(data.schemes) ? data.schemes : [])
                .filter(s => s && s.id && !builtinIds.has(s.id) && s.id !== CUSTOM_SCHEME_ID && s.colors);

            allSchemes = [...BUILTIN_SCHEMES, ...custom];
        } catch (err) {
            console.warn('colorSchemes.json load failed:', err);
        }
    }

    function getSchemeById(id) {
        if (id === CUSTOM_SCHEME_ID) return customScheme;
        return allSchemes.find(s => s.id === id) || null;
    }

    /* ----------------------------------------------------------
       Derived CSS vars for non-builtin schemes
       ---------------------------------------------------------- */
    function expandSchemeColors(scheme) {
        const c = { ...(scheme.colors || {}) };
        const isDark = !!scheme.dark;

        c['panel-border'] = c['panel-border'] || c['border-color'] || (isDark ? '#333333' : '#d8d8d8');
        c['table-alt'] = c['table-alt'] || (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.025)');
        c['search-match'] = c['search-match'] || (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)');
        c['search-text'] = c['search-text'] || (isDark ? '#ffffff' : '#000000');
        c['shadow-color'] = c['shadow-color'] || (isDark ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.15)');
        c['shadow-color-strong'] = c['shadow-color-strong'] || (isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.3)');
        c['input-shadow'] = c['input-shadow'] || (isDark
            ? '0 1px 2px rgba(0,0,0,0.3)'
            : '0 1px 4px rgba(0,0,0,0.14)');
        c['input-shadow-focus'] = c['input-shadow-focus'] || (isDark
            ? '0 0 0 3px rgba(255,255,255,0.06), 0 2px 6px rgba(0,0,0,0.4)'
            : '0 0 0 4px rgba(0,0,0,0.07), 0 4px 14px rgba(0,0,0,0.16)');
        c['control-shadow'] = c['control-shadow'] || c['input-shadow'];
        c['sidebar-shadow'] = c['sidebar-shadow'] || (isDark
            ? '0 4px 12px rgba(0,0,0,0.35)'
            : '0 4px 14px rgba(0,0,0,0.18)');
        c['card-shadow'] = c['card-shadow'] ||
            `0 0 22px 0 ${c['shadow-color']}, 0 0 10px 0 ${c['shadow-color']}, 0 4px 24px 0 ${c['shadow-color']}`;
        c['card-shadow-hover'] = c['card-shadow-hover'] ||
            `0 0 40px 0 ${c['shadow-color-strong']}, 0 0 18px 0 ${c['shadow-color-strong']}, 0 8px 36px 0 ${c['shadow-color-strong']}`;
        return c;
    }

    /* ----------------------------------------------------------
       Apply a scheme
       ---------------------------------------------------------- */
    function clearInlineSchemeVars() {
        appliedInlineVars.forEach(k => document.documentElement.style.removeProperty('--' + k));
        appliedInlineVars.clear();
    }

    function applyColorScheme(id) {
        const scheme = getSchemeById(id);
        if (!scheme) return;

        clearInlineSchemeVars();
        document.documentElement.classList.toggle('light', !scheme.dark);

        if (!scheme.builtin) {
            const colors = expandSchemeColors(scheme);
            Object.entries(colors).forEach(([k, v]) => {
                if (v == null) return;
                document.documentElement.style.setProperty('--' + k, String(v));
                appliedInlineVars.add(k);
            });
        }

        if (scheme.dark) state.lastDarkSchemeId = scheme.id;
        else             state.lastLightSchemeId = scheme.id;

        state.activeSchemeId = scheme.id;

        try { localStorage.setItem('cheatSheetScheme', scheme.id); } catch (_) {}

        updateThemeToggleIcon(scheme.dark);
        renderThemesGrid();
    }

    /* ----------------------------------------------------------
       Light / dark toggle
       ---------------------------------------------------------- */
    function toggleDarkLight() {
        const current = getSchemeById(state.activeSchemeId);
        if (!current) return;

        if (current.dark) {
            const t = getSchemeById(state.lastLightSchemeId) || getSchemeById('light');
            if (t) applyColorScheme(t.id);
        } else {
            const t = getSchemeById(state.lastDarkSchemeId) || getSchemeById('dark');
            if (t) applyColorScheme(t.id);
        }
    }

    /* ----------------------------------------------------------
       Initial theme
       ---------------------------------------------------------- */
    function initTheme() {
        loadCustomScheme();

        let stored = null;
        try { stored = localStorage.getItem('cheatSheetScheme'); } catch (_) {}
        if (!stored) {
            try {
                stored = localStorage.getItem('cheatSheetTheme') === 'light' ? 'light' : 'dark';
            } catch (_) { stored = 'dark'; }
        }
        if (!getSchemeById(stored)) stored = 'dark';
        applyColorScheme(stored);
    }

    function updateThemeToggleIcon(isDark) {
        const icon = document.getElementById('themeToggleIcon');
        if (!icon) return;
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    /* ----------------------------------------------------------
       Themes modal
       ---------------------------------------------------------- */
    function openModal() {
        renderThemesGrid();
        const m = document.getElementById('themesModal');
        if (m) m.classList.add('open');
    }

    function closeModal() {
        const m = document.getElementById('themesModal');
        if (m) m.classList.remove('open');
    }

    /* ----------------------------------------------------------
       Themes grid — Dark / Light / Custom sections
       ---------------------------------------------------------- */
    function renderThemesGrid() {
        const grid = document.getElementById('themesGrid');
        if (!grid) return;
        grid.innerHTML = '';
        grid.className = 'themes-grid';
        grid.style.display = 'block';
        grid.style.gridTemplateColumns = '';

        const darkSchemes  = allSchemes.filter(s => s.dark);
        const lightSchemes = allSchemes.filter(s => !s.dark);

        grid.appendChild(buildSection('fa-solid fa-moon', 'Dark', 'Dunkel', darkSchemes));
        grid.appendChild(buildSection('fa-solid fa-sun', 'Light', 'Hell', lightSchemes));
        grid.appendChild(buildCustomSection());

        if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
            App.i18n.applyLangToDOM();
        }
    }

    function buildSection(iconClass, labelEn, labelDe, schemes) {
        const wrap = document.createElement('div');
        wrap.className = 'themes-section';
        wrap.style.marginBottom = '1rem';

        const head = document.createElement('div');
        head.style.display = 'flex';
        head.style.alignItems = 'center';
        head.style.gap = '0.5rem';
        head.style.margin = '0.25rem 0 0.6rem';
        head.style.paddingBottom = '0.4rem';
        head.style.borderBottom = '1px solid var(--border-color)';
        head.innerHTML =
            `<i class="${iconClass}" style="font-size:0.8rem;color:var(--link-color);opacity:0.85;"></i>` +
            `<span style="font-size:0.68rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--heading-color);" data-lang-de>${escapeHtml(labelDe)}</span>` +
            `<span style="font-size:0.68rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--heading-color);display:none;" data-lang-en>${escapeHtml(labelEn)}</span>` +
            `<span style="font-size:0.6rem;font-family:'Fira Code',monospace;color:var(--text-muted);background:var(--code-bg);border:1px solid var(--border-color);border-radius:0.6rem;padding:0.05rem 0.4rem;line-height:1.3;">${schemes.length}</span>`;
        wrap.appendChild(head);

        const inner = document.createElement('div');
        inner.style.display = 'grid';
        inner.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
        inner.style.gap = '0.6rem';
        schemes.forEach(scheme => inner.appendChild(buildSchemeCard(scheme)));
        wrap.appendChild(inner);

        return wrap;
    }

    function buildSchemeCard(scheme) {
        const swatchKeys = ['bg-color', 'panel-color', 'border-color', 'link-color', 'heading-color'];

        const preview = scheme.builtin
            ? scheme.preview
            : {
                'bg-color':      (scheme.colors && scheme.colors['bg-color'])      || '#121212',
                'panel-color':   (scheme.colors && scheme.colors['panel-color'])   || '#1e1e1e',
                'border-color':  (scheme.colors && scheme.colors['border-color'])  || '#333333',
                'link-color':    (scheme.colors && scheme.colors['link-color'])    || '#b0b0b0',
                'heading-color': (scheme.colors && scheme.colors['heading-color']) || '#ffffff'
            };

        const swatches = swatchKeys
            .map(k => `<span style="background:${preview[k]};"></span>`)
            .join('');

        const nameDe = (scheme.name && scheme.name.de) || scheme.id;
        const nameEn = (scheme.name && scheme.name.en) || nameDe;

        const tagDe = scheme.builtin ? 'Standard' : (scheme.dark ? 'Dunkel' : 'Hell');
        const tagEn = scheme.builtin ? 'Built-in' : (scheme.dark ? 'Dark' : 'Light');

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'theme-card' + (scheme.id === state.activeSchemeId ? ' active' : '');
        btn.innerHTML =
            `<div class="theme-swatches">${swatches}</div>` +
            `<div class="theme-name"><span data-lang-de>${escapeHtml(nameDe)}</span><span data-lang-en style="display:none;">${escapeHtml(nameEn)}</span></div>` +
            `<div class="theme-tag"><span data-lang-de>${escapeHtml(tagDe)}</span><span data-lang-en style="display:none;">${escapeHtml(tagEn)}</span></div>`;

        btn.addEventListener('click', () => {
            applyColorScheme(scheme.id);
            if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
                App.i18n.applyLangToDOM();
            }
        });

        return btn;
    }

    /* ----------------------------------------------------------
       Custom section — Custom card + "Edit colors" button
       ---------------------------------------------------------- */
    function buildCustomSection() {
        const wrap = document.createElement('div');
        wrap.className = 'themes-section';
        wrap.style.marginTop = '0.5rem';

        const head = document.createElement('div');
        head.style.display = 'flex';
        head.style.alignItems = 'center';
        head.style.gap = '0.5rem';
        head.style.margin = '0.25rem 0 0.6rem';
        head.style.paddingBottom = '0.4rem';
        head.style.borderBottom = '1px solid var(--border-color)';
        head.innerHTML =
            `<i class="fa-solid fa-sliders" style="font-size:0.8rem;color:var(--link-color);opacity:0.85;"></i>` +
            `<span style="font-size:0.68rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--heading-color);" data-lang-de>Benutzerdefiniert</span>` +
            `<span style="font-size:0.68rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--heading-color);display:none;" data-lang-en>Custom</span>`;
        wrap.appendChild(head);

        const topRow = document.createElement('div');
        topRow.style.display = 'grid';
        topRow.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
        topRow.style.gap = '0.6rem';

        topRow.appendChild(buildSchemeCard(customScheme));

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'theme-card';
        editBtn.style.alignItems = 'center';
        editBtn.style.justifyContent = 'center';
        editBtn.innerHTML =
            `<i class="fa-solid fa-pen-to-square" style="font-size:1.1rem;color:var(--link-color);opacity:0.85;"></i>` +
            `<div class="theme-name" style="text-align:center;"><span data-lang-de>Farben bearbeiten</span><span data-lang-en style="display:none;">Edit colors</span></div>`;
        editBtn.addEventListener('click', () => openCustomColorsModal());
        topRow.appendChild(editBtn);

        wrap.appendChild(topRow);
        return wrap;
    }

    /* ----------------------------------------------------------
       Custom Colors popup (separate modal, no dim, live preview,
       hides all other popups while open, centered)
       ---------------------------------------------------------- */
    function ensureCustomColorsModal() {
        if (document.getElementById('customColorsModal')) return;

        const modal = document.createElement('div');
        modal.id = 'customColorsModal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'customColorsTitle');

        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.display = 'none';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '700';
        modal.style.padding = '2rem 1rem 2.5rem';
        modal.style.overflowY = 'auto';
        modal.style.background = 'transparent';
        modal.style.pointerEvents = 'auto';

        modal.innerHTML = `
            <div id="customColorsDialog"
                 style="background:var(--panel-color);border:1px solid var(--panel-border);box-shadow:var(--card-shadow-hover);border-radius:0.75rem;width:92%;max-width:640px;padding:1.25rem;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.85rem;padding-bottom:0.5rem;border-bottom:1px solid var(--border-color);">
                    <h3 id="customColorsTitle" style="font-size:0.95rem;font-weight:700;margin:0;color:var(--heading-color);">
                        <i class="fa-solid fa-pen-to-square" style="margin-right:0.4rem;opacity:0.8;"></i>
                        <span data-lang-de>Farben bearbeiten</span>
                        <span data-lang-en style="display:none;">Edit colors</span>
                    </h3>
                    <button type="button" id="customColorsCloseBtn" class="ctrl-btn" style="flex:0 0 auto;padding:0.25rem 0.5rem;font-size:0.8rem;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div id="customColorsFields"
                     style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0.5rem;"></div>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid var(--border-color);">
                    <button type="button" id="customColorsResetBtn" class="cal-nav-btn">
                        <i class="fa-solid fa-rotate-left"></i>
                        <span data-lang-de>Zurücksetzen</span><span data-lang-en style="display:none;">Reset</span>
                    </button>
                    <button type="button" id="customColorsCancelBtn" class="cal-nav-btn" style="margin-left:auto;">
                        <i class="fa-solid fa-xmark"></i>
                        <span data-lang-de>Abbrechen</span><span data-lang-en style="display:none;">Cancel</span>
                    </button>
                    <button type="button" id="customColorsApplyBtn" class="cal-nav-btn"
                            style="color:var(--link-color);border-color:var(--link-color);">
                        <i class="fa-solid fa-check"></i>
                        <span data-lang-de>Übernehmen</span><span data-lang-en style="display:none;">Apply</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#customColorsCloseBtn').addEventListener('click', () => closeCustomColorsModal(false));
        modal.querySelector('#customColorsCancelBtn').addEventListener('click', () => closeCustomColorsModal(false));
        modal.querySelector('#customColorsApplyBtn').addEventListener('click', () => closeCustomColorsModal(true));

        modal.querySelector('#customColorsResetBtn').addEventListener('click', () => {
            customScheme.colors = { ...CUSTOM_DEFAULTS };
            renderCustomColorFields();
            previewLive();
        });

        modal.addEventListener('mousedown', (e) => {
            if (e.target === modal) e.preventDefault();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                e.preventDefault();
                closeCustomColorsModal(false);
            }
        });
    }

    /* ----------------------------------------------------------
       Hide / restore all other popups while the color editor is open
       ---------------------------------------------------------- */
    const OTHER_POPUP_IDS = [
        'themesModal',
        'settingsModal',
        'impressumModal',
        'calendarModal',
        'dashboardModal',
        'sharedFilesModal',
        'reportModal'
    ];

    function hideOtherPopups() {
        const wasOpen = [];
        OTHER_POPUP_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.classList.contains('open')) {
                wasOpen.push(id);
                el.classList.remove('open');
            }
        });
        return wasOpen;
    }

    function restorePopups(ids) {
        (ids || []).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('open');
        });
    }

    /* ----------------------------------------------------------
       Open / close the color editor
       ---------------------------------------------------------- */
    function openCustomColorsModal() {
        ensureCustomColorsModal();

        editSnapshot = {
            colors: { ...customScheme.colors },
            dark: customScheme.dark,
            activeSchemeId: state.activeSchemeId,
            hiddenPopups: hideOtherPopups()
        };

        renderCustomColorFields();

        const modal = document.getElementById('customColorsModal');
        if (modal) modal.style.display = 'flex';

        if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
            App.i18n.applyLangToDOM();
        }
    }

    function closeCustomColorsModal(commit) {
        const modal = document.getElementById('customColorsModal');
        if (!modal) return;
        modal.style.display = 'none';

        if (commit) {
            saveCustomScheme();
            applyColorScheme(CUSTOM_SCHEME_ID);

            ['themesModal', 'settingsModal'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('open');
            });
        } else {
            if (editSnapshot) {
                customScheme.colors = { ...editSnapshot.colors };
                customScheme.dark = editSnapshot.dark;

                applyColorScheme(editSnapshot.activeSchemeId);
                restorePopups(editSnapshot.hiddenPopups);
            }
        }

        editSnapshot = null;
        if (App.i18n && typeof App.i18n.applyLangToDOM === 'function') {
            App.i18n.applyLangToDOM();
        }
    }

    /* ----------------------------------------------------------
       Live preview (no persistence, no activeSchemeId change)
       ---------------------------------------------------------- */
    function previewLive() {
        clearInlineSchemeVars();
        document.documentElement.classList.toggle('light', !customScheme.dark);

        const colors = expandSchemeColors(customScheme);
        Object.entries(colors).forEach(([k, v]) => {
            if (v == null) return;
            document.documentElement.style.setProperty('--' + k, String(v));
            appliedInlineVars.add(k);
        });
    }

    function renderCustomColorFields() {
        const container = document.getElementById('customColorsFields');
        if (!container) return;
        container.innerHTML = '';

        CUSTOM_FIELDS.forEach(field => {
            container.appendChild(buildColorField(field));
        });
    }

        /* ----------------------------------------------------------
       Live-poll a color swatch while the user is interacting with
       the native picker. Chrome/Edge fire `input` continuously;
       Firefox/Safari do not, so we also rAF-poll while focused.
       ---------------------------------------------------------- */
    function startSwatchPolling(swatch, text, onLive) {
        let raf = 0;
        let last = swatch.value;

        const tick = () => {
            if (swatch.value !== last) {
                last = swatch.value;
                text.value = last;
                onLive(last);
            }
            raf = requestAnimationFrame(tick);
        };

        swatch.addEventListener('focus', () => {
            last = swatch.value;
            if (!raf) raf = requestAnimationFrame(tick);
        });

        swatch.addEventListener('blur', () => {
            if (raf) { cancelAnimationFrame(raf); raf = 0; }
        });
    }

        /* ----------------------------------------------------------
       Color helpers for the custom inline picker
       ---------------------------------------------------------- */
    function hexToHsl(hex) {
        hex = String(hex || '#000000').replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        if (hex.length === 8) hex = hex.slice(0, 6);
        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function hslToHex(h, s, l) {
        h = ((h % 360) + 360) % 360;
        s = Math.max(0, Math.min(100, s)) / 100;
        l = Math.max(0, Math.min(100, l)) / 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
        return '#' + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
    }

    /* ----------------------------------------------------------
       Custom inline HSL picker — truly live, no native dialog.
       Every drag event fires previewLive() immediately.
       ---------------------------------------------------------- */
    function buildColorField(field) {
        const wrap = document.createElement('div');
        wrap.style.display = 'grid';
        wrap.style.gridTemplateColumns = '5rem 1fr 1fr 5.5rem';
        wrap.style.alignItems = 'center';
        wrap.style.gap = '0.5rem';
        wrap.style.fontSize = '0.72rem';
        wrap.style.color = 'var(--text-color)';

        const initial = customScheme.colors[field.key] || CUSTOM_DEFAULTS[field.key] || '#000000';
        const hsl = hexToHsl(initial);

        // --- Label ---
        const label = document.createElement('span');
        label.style.flex = '0 0 auto';
        label.innerHTML =
            `<span data-lang-de>${escapeHtml(field.labelDe)}</span>` +
            `<span data-lang-en style="display:none;">${escapeHtml(field.labelEn)}</span>`;

        // --- Preview swatch (not an <input type="color">, just a div) ---
        // Rendering a div instead of an <input type="color"> guarantees the
        // OS dialog never opens, so the only way to change the color is
        // through the sliders below — which fire input events live.
        const swatch = document.createElement('div');
        swatch.style.width = '100%';
        swatch.style.height = '22px';
        swatch.style.border = '1px solid var(--border-color)';
        swatch.style.borderRadius = '0.3rem';
        swatch.style.background = initial;
        swatch.style.cursor = 'default';

        // --- Hue slider ---
        const hue = document.createElement('input');
        hue.type = 'range';
        hue.min = '0'; hue.max = '360'; hue.step = '1';
        hue.value = String(hsl.h);
        hue.style.width = '100%';
        hue.style.cursor = 'pointer';
        hue.style.appearance = 'none';
        hue.style.height = '14px';
        hue.style.borderRadius = '0.3rem';
        hue.style.background = 'linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)';

        // --- Lightness slider ---
        const light = document.createElement('input');
        light.type = 'range';
        light.min = '0'; light.max = '100'; light.step = '1';
        light.value = String(hsl.l);
        light.style.width = '100%';
        light.style.cursor = 'pointer';
        light.style.appearance = 'none';
        light.style.height = '14px';
        light.style.borderRadius = '0.3rem';
        light.style.background = 'linear-gradient(to right,#000,#888,#fff)';

        // --- Hex text field ---
        const text = document.createElement('input');
        text.type = 'text';
        text.value = initial;
        text.style.width = '100%';
        text.style.fontSize = '0.7rem';
        text.style.fontFamily = "'Fira Code', monospace";
        text.style.padding = '0.2rem 0.4rem';
        text.style.borderRadius = '0.3rem';
        text.style.border = '1px solid var(--border-color)';
        text.style.background = 'var(--panel-color)';
        text.style.color = 'var(--text-color)';

        const commit = (val) => {
            customScheme.colors[field.key] = val;
            previewLive();
        };

        // Sliders → recompute hex → update swatch, text, preview. `input`
        // fires continuously while dragging, so preview is truly live.
        const fromSliders = () => {
            const hex = hslToHex(parseInt(hue.value, 10), 100, parseInt(light.value, 10));
            swatch.style.background = hex;
            text.value = hex;
            commit(hex);
        };
        hue.addEventListener('input', fromSliders);
        light.addEventListener('input', fromSliders);

        // Typing a hex → live preview on every keystroke that yields valid hex.
        text.addEventListener('input', () => {
            const v = text.value.trim();
            if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) {
                const expanded = v.length === 4
                    ? '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3]
                    : v;
                const h2 = hexToHsl(expanded);
                hue.value = String(h2.h);
                light.value = String(h2.l);
                swatch.style.background = expanded;
                commit(expanded);
            }
        });

        wrap.appendChild(label);
        wrap.appendChild(swatch);
        wrap.appendChild(hue);
        wrap.appendChild(light);
        wrap.appendChild(text);
        return wrap;
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.themes = {
        loadColorSchemes,
        applyColorScheme,
        toggleDarkLight,
        initTheme,
        openModal,
        closeModal,
        renderThemesGrid,
        getSchemeById,
        getAllSchemes: () => allSchemes.slice(),
        openCustomColorsModal,
        closeCustomColorsModal,
        CUSTOM_SCHEME_ID
    };
})();