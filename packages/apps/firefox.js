// firefox.js - Firefox-like Browser with AdBlocking for KDE Plasma
// Integrates with colorsKde.js for consistent theming
// Bookmarks loaded from resources/browserBookmarks.json

(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFirefox);
    } else {
        initFirefox();
    }

    // AdBlocking Engine
    class AdBlocker {
        constructor() {
            this.filters = {
                domains: [
                    'doubleclick.net', 'googleadservices.com', 'googlesyndication.com', 'adservice.google.com',
                    'pagead2.googlesyndication.com', 'ads.google.com', 'google-analytics.com', 'googletagmanager.com',
                    'facebook.com/tr', 'connect.facebook.net', 'platform.twitter.com/widgets', 'syndication.twitter.com',
                    'ads.twitter.com', 't.co', 'amazon-adsystem.com', 'ads.amazon.com', 'aax.amazon-adsystem.com',
                    'adnxs.com', 'adzerk.net', 'scorecardresearch.com', 'outbrain.com', 'taboola.com', 'revcontent.com',
                    'popads.net', 'exoclick.com', 'adroll.com', 'adform.net', 'criteo.com', 'casalemedia.com', 'adap.tv',
                    'adsrvr.org', 'advertising.com', 'atdmt.com', 'doubleverify.com', 'fastclick.net', 'flashtalking.com',
                    'innovid.com', 'invitemedia.com', 'moatads.com', 'openx.net', 'pubmatic.com', 'rhythmone.com',
                    'rubiconproject.com', 'sharethrough.com', 'sovrn.com', 'spotx.tv', 'springserve.com', 'stickyadstv.com',
                    'tremorhub.com', 'undertone.com', 'videoamp.com', 'yieldmo.com', 'yldbt.com', 'zeotap.com'
                ],
                patterns: [
                    /\/ad[s]?[0-9]*\//i, /\/banner[s]?[0-9]*\//i, /\/popup[s]?[0-9]*\//i, /\/tracking\/?/i,
                    /\/analytics\/?/i, /\/metrics\/?/i, /\/telemetry\/?/i, /\/beacon\/?/i, /\/pixel\/?/i,
                    /\/impression\/?/i, /\/click\/?/i, /\/conversion\/?/i, /\/retargeting\/?/i, /\/remarketing\/?/i,
                    /\/sponsored\/?/i, /\/promoted\/?/i, /\/adserver\/?/i, /\/admanager\/?/i, /\/adservice\/?/i,
                    /\/adsense\/?/i, /\/adwords\/?/i
                ],
                selectors: [
                    '[id*="ad" i]', '[id*="banner" i]', '[id*="sponsored" i]', '[id*="promoted" i]',
                    '[class*="ad" i]', '[class*="banner" i]', '[class*="sponsored" i]', '[class*="promoted" i]',
                    '#player-ads', '#masthead-ad', '#feed-pyv-container', '#ytd-promoted-video-renderer',
                    '.ytd-promoted-sparkles-text-search-renderer', '.ytd-display-ad-renderer', '#tads', '#taw',
                    '#bottomads', '.ads-ad', '.ads-panel', '.adsbygoogle', '[data-testid="ad-preview"]',
                    '[data-testid="fb-ads-ad"]', '.sponsored-post', '[data-testid="placementTracking"]',
                    '.promoted-tweet', '.ad-container', '.ad-wrapper', '.ad-box', '.ad-frame', '.ad-slot',
                    '.ad-unit', '.advertisement', '.advertising', '.sponsored-content', '.promoted-content'
                ]
            };

            this.stats = {
                blocked: 0,
                allowed: 0
            };

            this.loadCustomFilters();
        }

        loadCustomFilters() {
            try {
                const saved = localStorage.getItem('adblock_filters');
                if (saved) {
                    const custom = JSON.parse(saved);
                    if (custom.domains) this.filters.domains.push(...custom.domains);
                    if (custom.selectors) this.filters.selectors.push(...custom.selectors);
                }
            } catch(e) {}
        }

        shouldBlockUrl(url) {
            if (!url) return false;
            
            if (url.startsWith('http://') || url.startsWith('https://')) {
                for (const domain of this.filters.domains) {
                    if (url.includes(domain)) {
                        this.stats.blocked++;
                        return true;
                    }
                }
                
                for (const pattern of this.filters.patterns) {
                    if (pattern.test(url)) {
                        this.stats.blocked++;
                        return true;
                    }
                }
            }
            
            this.stats.allowed++;
            return false;
        }

        cleanHtml(html) {
            if (!html) return html;
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            for (const selector of this.filters.selectors) {
                try {
                    const elements = doc.querySelectorAll(selector);
                    elements.forEach(el => {
                        el.remove();
                        this.stats.blocked++;
                    });
                } catch(e) {}
            }
            
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                const src = script.getAttribute('src') || '';
                const content = script.textContent || '';
                
                for (const domain of this.filters.domains) {
                    if (src.includes(domain) || content.includes(domain)) {
                        script.remove();
                        this.stats.blocked++;
                        break;
                    }
                }
                
                for (const pattern of this.filters.patterns) {
                    if (pattern.test(content)) {
                        script.remove();
                        this.stats.blocked++;
                        break;
                    }
                }
            });
            
            const iframes = doc.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const src = iframe.getAttribute('src') || '';
                for (const domain of this.filters.domains) {
                    if (src.includes(domain)) {
                        iframe.remove();
                        this.stats.blocked++;
                        break;
                    }
                }
            });
            
            return doc.documentElement.outerHTML;
        }

        getStats() {
            return {
                total: this.stats.blocked + this.stats.allowed,
                blocked: this.stats.blocked,
                allowed: this.stats.allowed,
                blockRate: this.stats.total > 0 ? 
                    Math.round((this.stats.blocked / this.stats.total) * 100) : 0
            };
        }

        addFilter(type, value) {
            if (type === 'domain' && !this.filters.domains.includes(value)) {
                this.filters.domains.push(value);
                this.saveFilters();
                return true;
            }
            if (type === 'selector' && !this.filters.selectors.includes(value)) {
                this.filters.selectors.push(value);
                this.saveFilters();
                return true;
            }
            return false;
        }

        saveFilters() {
            try {
                localStorage.setItem('adblock_filters', JSON.stringify({
                    domains: this.filters.domains,
                    selectors: this.filters.selectors
                }));
            } catch(e) {}
        }

        resetStats() {
            this.stats.blocked = 0;
            this.stats.allowed = 0;
        }
    }

    // Bookmark Manager - Loads from JSON file
    class BookmarkManager {
        constructor() {
            this.bookmarks = {};
            this.loaded = false;
            this.loadBookmarks();
        }

        async loadBookmarks() {
            try {
                // Try to load from JSON file
                const response = await fetch('resources/browserBookmarks.json');
                if (response.ok) {
                    this.bookmarks = await response.json();
                    this.loaded = true;
                    console.log('Bookmarks loaded from resources/browserBookmarks.json');
                } else {
                    // Fallback to default bookmarks
                    this.loadDefaultBookmarks();
                }
            } catch(e) {
                console.warn('Failed to load bookmarks JSON, using defaults:', e);
                this.loadDefaultBookmarks();
            }
            
            // Also try to load custom bookmarks from localStorage
            this.loadCustomBookmarks();
        }

        loadDefaultBookmarks() {
            this.bookmarks = {
                'Tools': {
                    'Wikipedia': 'https://www.wikipedia.org',
                    'Google': 'https://www.google.com'
                },
                'Social Media': {
                    'YouTube': 'https://www.youtube.com',
                    'Twitch': 'https://www.twitch.tv'
                },
                'Shops': {
                    'Amazon': 'https://www.amazon.com'
                },
                'Games': {
                    'Steam': 'https://store.steampowered.com'
                }
            };
            this.loaded = true;
        }

        loadCustomBookmarks() {
            try {
                const saved = localStorage.getItem('firefox_bookmarks_custom');
                if (saved) {
                    const custom = JSON.parse(saved);
                    // Merge custom bookmarks with loaded ones
                    this.mergeBookmarks(this.bookmarks, custom);
                }
            } catch(e) {}
        }

        mergeBookmarks(target, source) {
            for (const [key, value] of Object.entries(source)) {
                if (typeof value === 'string') {
                    target[key] = value;
                } else if (typeof value === 'object') {
                    if (!target[key]) target[key] = {};
                    this.mergeBookmarks(target[key], value);
                }
            }
        }

        saveCustomBookmarks() {
            try {
                // Only save custom additions, not the entire bookmarks
                localStorage.setItem('firefox_bookmarks_custom', JSON.stringify(this.bookmarks));
            } catch(e) {}
        }

        getAllBookmarks() {
            return this.bookmarks;
        }

        getFlatBookmarks() {
            const flat = [];
            
            function traverse(obj, path = '') {
                if (typeof obj === 'string') {
                    flat.push({ name: path, url: obj });
                } else if (typeof obj === 'object') {
                    for (const [key, value] of Object.entries(obj)) {
                        traverse(value, path ? `${path} > ${key}` : key);
                    }
                }
            }
            
            traverse(this.bookmarks);
            return flat;
        }

        addBookmark(name, url, category = null) {
            if (category) {
                const parts = category.split(' > ');
                let current = this.bookmarks;
                for (const part of parts) {
                    if (!current[part]) {
                        current[part] = {};
                    }
                    current = current[part];
                }
                if (typeof current === 'object') {
                    current[name] = url;
                }
            } else {
                this.bookmarks[name] = url;
            }
            this.saveCustomBookmarks();
            return true;
        }

        removeBookmark(name, category = null) {
            if (category) {
                const parts = category.split(' > ');
                let current = this.bookmarks;
                for (let i = 0; i < parts.length - 1; i++) {
                    if (current[parts[i]]) {
                        current = current[parts[i]];
                    } else {
                        return false;
                    }
                }
                const lastPart = parts[parts.length - 1];
                if (current[lastPart] && current[lastPart][name]) {
                    delete current[lastPart][name];
                    this.saveCustomBookmarks();
                    return true;
                }
            } else {
                if (this.bookmarks[name]) {
                    delete this.bookmarks[name];
                    this.saveCustomBookmarks();
                    return true;
                }
            }
            return false;
        }
    }

    function getThemeColors() {
        if (window.kdeThemeColors) {
            return {
                bg: window.kdeThemeColors['kde-bg'] || '#1a1b1e',
                panel: window.kdeThemeColors['kde-panel'] || 'rgba(35, 38, 41, 0.85)',
                panelHover: window.kdeThemeColors['kde-panel-hover'] || 'rgba(255, 255, 255, 0.1)',
                accent: window.kdeThemeColors['kde-accent'] || '#3daee9',
                text: window.kdeThemeColors['kde-text'] || '#eff0f1',
                windowBg: window.kdeThemeColors['kde-window-bg'] || '#31363b',
                windowBorder: window.kdeThemeColors['kde-window-border'] || '#1d2023'
            };
        }
        return {
            bg: '#1a1b1e',
            panel: 'rgba(35, 38, 41, 0.85)',
            panelHover: 'rgba(255, 255, 255, 0.1)',
            accent: '#3daee9',
            text: '#eff0f1',
            windowBg: '#31363b',
            windowBorder: '#1d2023'
        };
    }

    function initFirefox() {
        const colors = getThemeColors();
        
        // Initialize adblocker and bookmarks
        const adBlocker = new AdBlocker();
        const bookmarkManager = new BookmarkManager();
        
        // Create the app container
        const appContainer = document.createElement('div');
        appContainer.id = 'app';
        appContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            box-sizing: border-box;
            background: ${colors.windowBg};
            color: ${colors.text};
            font-family: 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        `;

        // Helper function to build bookmark menu items
        function buildBookmarkMenu(obj, depth = 0) {
            let html = '';
            const indent = depth * 12;
            
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'string') {
                    // Leaf node - actual bookmark
                    html += `
                        <button class="dropdown-item" onclick="window.navigateTo('${value}')" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px 6px ${10 + indent}px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            width: 100%;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-link" style="width:14px; font-size:10px;"></i> ${key}
                        </button>
                    `;
                } else if (typeof value === 'object') {
                    // Folder - create submenu
                    const submenuId = `submenu-${key.replace(/\s+/g, '-')}-${depth}`;
                    html += `
                        <div class="menu-group" style="position:relative; width:100%;">
                            <button class="dropdown-item" onclick="window.toggleSubmenu('${submenuId}')" style="
                                background: transparent;
                                border: none;
                                color: ${colors.text};
                                padding: 6px 10px 6px ${10 + indent}px;
                                text-align: left;
                                border-radius: 3px;
                                cursor: pointer;
                                font-size: 12px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                gap: 8px;
                                width: 100%;
                            " onmouseover="this.style.background='${colors.panelHover}'" 
                               onmouseout="this.style.background='transparent'">
                                <span><i class="fa-solid fa-folder" style="width:14px; font-size:10px;"></i> ${key}</span>
                                <i class="fa-solid fa-chevron-right" style="font-size:10px;"></i>
                            </button>
                            <div id="${submenuId}" class="menu-dropdown submenu" style="
                                display: none;
                                flex-direction: column;
                                position: absolute;
                                top: 0;
                                left: 100%;
                                background: ${colors.windowBg};
                                border: 1px solid ${colors.windowBorder};
                                border-radius: 4px;
                                box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                                z-index: 100;
                                min-width: 200px;
                                max-height: 400px;
                                overflow-y: auto;
                                padding: 4px;
                                margin-left: 2px;
                            ">
                                ${buildBookmarkMenu(value, depth + 1)}
                            </div>
                        </div>
                    `;
                }
            }
            return html;
        }

        appContainer.innerHTML = `
            <!-- Firefox-style Menu Bar -->
            <div id="menubar" style="
                display: flex;
                background: ${colors.panel};
                border-bottom: 1px solid ${colors.windowBorder};
                padding: 2px 6px;
                font-size: 12px;
                gap: 2px;
                user-select: none;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            ">
                <div class="menu-group" style="position:relative;">
                    <button class="menu-btn" style="
                        background: transparent;
                        border: none;
                        color: ${colors.text};
                        padding: 4px 8px;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 12px;
                    " onmouseover="this.style.background='${colors.panelHover}'" 
                       onmouseout="this.style.background='transparent'">
                        File
                    </button>
                    <div class="menu-dropdown" style="
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background: ${colors.windowBg};
                        border: 1px solid ${colors.windowBorder};
                        border-radius: 4px;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                        z-index: 100;
                        min-width: 180px;
                        padding: 4px;
                    ">
                        <button class="dropdown-item" onclick="window.navigateTo('https://www.google.com')" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-window-restore" style="width:16px;"></i> New Window
                        </button>
                        <button class="dropdown-item" onclick="window.reloadPage()" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-rotate" style="width:16px;"></i> Reload
                        </button>
                        <button class="dropdown-item" onclick="window.navigateTo('https://www.google.com')" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-home" style="width:16px;"></i> Home
                        </button>
                        <div style="height:1px; background:${colors.windowBorder}; margin:3px 0;"></div>
                        <button class="dropdown-item" onclick="window.closeApp()" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='#e74c3c'; this.style.color='#fff'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-xmark" style="width:16px;"></i> Close
                        </button>
                    </div>
                </div>
                <div class="menu-group" style="position:relative;">
                    <button class="menu-btn" style="
                        background: transparent;
                        border: none;
                        color: ${colors.text};
                        padding: 4px 8px;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 12px;
                    " onmouseover="this.style.background='${colors.panelHover}'" 
                       onmouseout="this.style.background='transparent'">
                        View
                    </button>
                    <div class="menu-dropdown" style="
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background: ${colors.windowBg};
                        border: 1px solid ${colors.windowBorder};
                        border-radius: 4px;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                        z-index: 100;
                        min-width: 180px;
                        padding: 4px;
                    ">
                        <button class="dropdown-item" onclick="window.toggleFullscreen()" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-expand" style="width:16px;"></i> Fullscreen
                        </button>
                        <button class="dropdown-item" onclick="window.zoomIn()" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-plus" style="width:16px;"></i> Zoom In
                        </button>
                        <button class="dropdown-item" onclick="window.zoomOut()" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-minus" style="width:16px;"></i> Zoom Out
                        </button>
                        <button class="dropdown-item" onclick="window.zoomReset()" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-rotate-right" style="width:16px;"></i> Reset Zoom
                        </button>
                        <div style="height:1px; background:${colors.windowBorder}; margin:3px 0;"></div>
                        <button class="dropdown-item" onclick="window.toggleAdBlock()" style="
                            background: transparent;
                            border: none;
                            color: ${colors.text};
                            padding: 6px 10px;
                            text-align: left;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                           onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                            <i class="fa-solid fa-shield-halved" style="width:16px;" id="adblock-icon"></i> <span id="adblock-status">AdBlock: On</span>
                        </button>
                    </div>
                </div>
                <div class="menu-group" style="position:relative;">
                    <button class="menu-btn" style="
                        background: transparent;
                        border: none;
                        color: ${colors.text};
                        padding: 4px 8px;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 12px;
                    " onmouseover="this.style.background='${colors.panelHover}'" 
                       onmouseout="this.style.background='transparent'">
                        Bookmarks
                    </button>
                    <div class="menu-dropdown" style="
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background: ${colors.windowBg};
                        border: 1px solid ${colors.windowBorder};
                        border-radius: 4px;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                        z-index: 100;
                        min-width: 220px;
                        max-height: 500px;
                        overflow-y: auto;
                        padding: 4px;
                    " id="bookmarks-menu">
                        <div id="bookmarks-loading" style="padding:20px;text-align:center;color:${colors.text};opacity:0.6;">
                            <i class="fa-solid fa-spinner fa-spin"></i> Loading bookmarks...
                        </div>
                    </div>
                </div>
                <div style="margin-left:auto; font-size:11px; color:${colors.text}; opacity:0.6; padding:4px 8px;" id="ad-stats">
                    Ads blocked: 0
                </div>
            </div>

            <!-- Firefox-style Navigation Toolbar -->
            <div id="nav-toolbar" style="
                display: flex;
                align-items: center;
                padding: 4px 8px;
                background: ${colors.panel};
                border-bottom: 1px solid ${colors.windowBorder};
                gap: 4px;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            ">
                <button onclick="window.goBack()" id="back-btn" style="
                    background: transparent;
                    border: none;
                    color: ${colors.text};
                    cursor: pointer;
                    padding: 4px 6px;
                    border-radius: 3px;
                    opacity: 0.6;
                " onmouseover="this.style.background='${colors.panelHover}'; this.style.opacity='1'" 
                   onmouseout="this.style.background='transparent'; this.style.opacity='0.6'">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button onclick="window.goForward()" id="forward-btn" style="
                    background: transparent;
                    border: none;
                    color: ${colors.text};
                    cursor: pointer;
                    padding: 4px 6px;
                    border-radius: 3px;
                    opacity: 0.6;
                " onmouseover="this.style.background='${colors.panelHover}'; this.style.opacity='1'" 
                   onmouseout="this.style.background='transparent'; this.style.opacity='0.6'">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                <button onclick="window.reloadPage()" style="
                    background: transparent;
                    border: none;
                    color: ${colors.text};
                    cursor: pointer;
                    padding: 4px 6px;
                    border-radius: 3px;
                " onmouseover="this.style.background='${colors.panelHover}'" 
                   onmouseout="this.style.background='transparent'">
                    <i class="fa-solid fa-rotate"></i>
                </button>
                <button onclick="window.navigateTo('https://www.google.com')" style="
                    background: transparent;
                    border: none;
                    color: ${colors.text};
                    cursor: pointer;
                    padding: 4px 6px;
                    border-radius: 3px;
                " onmouseover="this.style.background='${colors.panelHover}'" 
                   onmouseout="this.style.background='transparent'">
                    <i class="fa-solid fa-house"></i>
                </button>
                
                <!-- URL Bar -->
                <div style="flex:1; position:relative; display:flex; align-items:center;">
                    <div style="
                        position: absolute;
                        left: 8px;
                        color: ${colors.text};
                        opacity: 0.6;
                        font-size: 11px;
                    ">
                        <i class="fa-solid fa-shield-halved" id="security-icon" style="color:${colors.accent};"></i>
                    </div>
                    <input type="text" id="url-input" placeholder="Search or enter address..." 
                        style="
                            width: 100%;
                            background: ${colors.bg};
                            border: 1px solid ${colors.windowBorder};
                            border-radius: 20px;
                            color: ${colors.text};
                            padding: 5px 12px 5px 30px;
                            font-size: 13px;
                            outline: none;
                            transition: border-color 0.2s, box-shadow 0.2s;
                        "
                        onfocus="this.style.borderColor='${colors.accent}'; this.style.boxShadow='0 0 0 2px ${colors.accent}33'"
                        onblur="this.style.borderColor='${colors.windowBorder}'; this.style.boxShadow='none'"
                        onkeydown="if(event.key==='Enter') window.navigate()">
                </div>
                
                <button onclick="window.navigate()" style="
                    background: ${colors.accent};
                    border: none;
                    border-radius: 20px;
                    color: #000;
                    padding: 4px 14px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 12px;
                    transition: opacity 0.2s;
                " onmouseover="this.style.opacity='0.9'" 
                   onmouseout="this.style.opacity='1'">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                
                <button onclick="window.showAddBookmarkDialog()" style="
                    background: transparent;
                    border: none;
                    color: ${colors.text};
                    cursor: pointer;
                    padding: 4px 6px;
                    border-radius: 3px;
                " onmouseover="this.style.background='${colors.panelHover}'" 
                   onmouseout="this.style.background='transparent'" title="Add Bookmark (Ctrl+D)">
                    <i class="fa-regular fa-star"></i>
                </button>
            </div>

            <!-- Browser Content -->
            <div id="browser-content" style="
                flex: 1;
                position: relative;
                background: #ffffff;
                overflow: hidden;
            ">
                <iframe id="browser-frame" 
                    style="
                        width: 100%;
                        height: 100%;
                        border: none;
                        background: #ffffff;
                    "
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
                    loading="lazy">
                </iframe>
                
                <!-- Loading indicator -->
                <div id="loading-indicator" style="
                    display: none;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: ${colors.accent};
                    font-size: 14px;
                    text-align: center;
                ">
                    <i class="fa-solid fa-spinner fa-spin" style="font-size: 24px; display: block; margin-bottom: 8px;"></i>
                    Loading...
                </div>
            </div>

            <!-- Firefox-style Status Bar -->
            <div id="status-bar" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 2px 8px;
                background: ${colors.panel};
                border-top: 1px solid ${colors.windowBorder};
                font-size: 11px;
                color: ${colors.text};
                opacity: 0.8;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            ">
                <span id="status-text">Ready</span>
                <div style="display: flex; gap: 12px;">
                    <span id="zoom-level">100%</span>
                    <span id="adblock-status-bar" style="color:${colors.accent};">🛡️ AdBlock Active</span>
                </div>
            </div>
        `;

        document.body.appendChild(appContainer);
        
        // Initialize browser
        const iframe = document.getElementById('browser-frame');
        const urlInput = document.getElementById('url-input');
        const statusText = document.getElementById('status-text');
        const loadingIndicator = document.getElementById('loading-indicator');
        const zoomLevel = document.getElementById('zoom-level');
        const adStats = document.getElementById('ad-stats');
        const adblockStatus = document.getElementById('adblock-status');
        const adblockStatusBar = document.getElementById('adblock-status-bar');
        const bookmarksMenu = document.getElementById('bookmarks-menu');
        
        // AdBlock state
        let adBlockEnabled = true;
        
        // Set default URL
        const defaultUrl = 'https://www.google.com';
        iframe.src = defaultUrl;
        urlInput.value = defaultUrl;

        // Browser state
        window.browserHistory = [defaultUrl];
        window.browserHistoryIndex = 0;
        window.zoom = 1;

        // Function to update bookmark menu
        function updateBookmarkMenu() {
            if (!bookmarksMenu) return;
            
            const bookmarks = bookmarkManager.getAllBookmarks();
            const loadingEl = document.getElementById('bookmarks-loading');
            
            if (loadingEl) {
                loadingEl.remove();
            }
            
            // Build the menu
            const menuHtml = buildBookmarkMenu(bookmarks);
            
            // Add separator and add bookmark button
            const addButton = `
                <div style="height:1px; background:${colors.windowBorder}; margin:3px 0;"></div>
                <button class="dropdown-item" onclick="window.showAddBookmarkDialog()" style="
                    background: transparent;
                    border: none;
                    color: ${colors.text};
                    padding: 6px 10px;
                    text-align: left;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                " onmouseover="this.style.background='${colors.accent}'; this.style.color='#000'" 
                   onmouseout="this.style.background='transparent'; this.style.color='${colors.text}'">
                    <i class="fa-solid fa-plus" style="width:16px;"></i> Add Bookmark
                </button>
            `;
            
            bookmarksMenu.innerHTML = menuHtml + addButton;
        }

        // Function to update ad stats display
        function updateAdStats() {
            const stats = adBlocker.getStats();
            if (adStats) {
                adStats.textContent = `🛡️ Ads blocked: ${stats.blocked}`;
            }
            if (adblockStatusBar) {
                adblockStatusBar.textContent = adBlockEnabled ? '🛡️ AdBlock Active' : '⚠️ AdBlock Off';
                adblockStatusBar.style.color = adBlockEnabled ? colors.accent : '#e74c3c';
            }
            if (adblockStatus) {
                adblockStatus.textContent = adBlockEnabled ? 'AdBlock: On' : 'AdBlock: Off';
            }
            const icon = document.getElementById('adblock-icon');
            if (icon) {
                icon.style.color = adBlockEnabled ? colors.accent : '#e74c3c';
            }
        }

        // Show add bookmark dialog
        window.showAddBookmarkDialog = function() {
            const currentUrl = iframe.src || urlInput.value;
            const title = prompt('Enter bookmark name:', currentUrl);
            if (title && title.trim()) {
                const category = prompt('Enter category (optional, use > for subcategories):', '');
                if (bookmarkManager.addBookmark(title.trim(), currentUrl, category || null)) {
                    statusText.textContent = `✅ Bookmark added: ${title}`;
                    updateBookmarkMenu();
                } else {
                    statusText.textContent = '❌ Failed to add bookmark';
                }
            }
        };

        // Toggle AdBlock
        window.toggleAdBlock = function() {
            adBlockEnabled = !adBlockEnabled;
            updateAdStats();
            if (iframe.src && iframe.src !== 'about:blank') {
                window.reloadPage();
            }
        };

        // Toggle submenu
        window.toggleSubmenu = function(id) {
            const el = document.getElementById(id);
            if (el) {
                const isVisible = el.style.display === 'flex';
                // Close all other submenus
                document.querySelectorAll('.submenu').forEach(sub => {
                    if (sub.id !== id) sub.style.display = 'none';
                });
                el.style.display = isVisible ? 'none' : 'flex';
            }
        };

        // Close app function (Calls parent's closeApp to close the iframe wrapper)
        window.closeApp = function() {
            const winId = window.frameElement ? window.frameElement.id : null;
            if (winId && window.parent && window.parent.closeApp) {
                window.parent.closeApp(winId);
            }
        };

        // Enhanced navigation with ad blocking
        window.navigate = function() {
            let url = urlInput.value.trim();
            if (!url) return;
            
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                if (url.includes(' ') || !url.includes('.')) {
                    url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
                } else {
                    url = `https://${url}`;
                }
            }
            
            window.navigateTo(url);
        };

        window.navigateTo = function(url) {
            if (!url) return;
            
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = `https://${url}`;
            }
            
            if (adBlockEnabled && adBlocker.shouldBlockUrl(url)) {
                statusText.textContent = '⛔ Ad blocked!';
                loadingIndicator.style.display = 'none';
                
                // Note: The inner iframe's parent is the app iframe, 
                // so window.parent.navigateTo inside blockedHtml correctly calls the app iframe's navigateTo.
                const blockedHtml = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#1a1b1e;color:#eff0f1;font-family:sans-serif;padding:20px;">
                        <div style="font-size:64px;margin-bottom:20px;">🛡️</div>
                        <h1 style="font-size:24px;margin-bottom:10px;">Ad Blocked</h1>
                        <p style="color:#9ca3af;text-align:center;max-width:400px;margin-bottom:20px;">
                            This ad was blocked by the KDE AdBlocker.<br>
                            <span style="font-size:12px;">URL: ${url}</span>
                        </p>
                        <button onclick="window.parent.navigateTo('${url}')" 
                            style="background:#3daee9;border:none;padding:8px 16px;border-radius:4px;color:#000;font-weight:600;cursor:pointer;">
                            Continue anyway
                        </button>
                    </div>
                `;
                iframe.srcdoc = blockedHtml;
                updateAdStats();
                return;
            }
            
            // Clear srcdoc if it was previously set
            iframe.removeAttribute('srcdoc');
            iframe.src = url;
            urlInput.value = url;
            loadingIndicator.style.display = 'block';
            statusText.textContent = 'Loading...';
            
            if (window.browserHistory[window.browserHistoryIndex] !== url) {
                window.browserHistory = window.browserHistory.slice(0, window.browserHistoryIndex + 1);
                window.browserHistory.push(url);
                window.browserHistoryIndex++;
            }
            updateNavButtons();
        };

        // Override iframe load to clean content
        iframe.addEventListener('load', function() {
            loadingIndicator.style.display = 'none';
            statusText.textContent = 'Done';
            
            try {
                const currentUrl = iframe.contentWindow.location.href;
                if (currentUrl && currentUrl !== 'about:blank' && !currentUrl.startsWith('blob:')) {
                    urlInput.value = currentUrl;
                    
                    if (window.browserHistory[window.browserHistoryIndex] !== currentUrl) {
                        window.browserHistory = window.browserHistory.slice(0, window.browserHistoryIndex + 1);
                        window.browserHistory.push(currentUrl);
                        window.browserHistoryIndex++;
                    }
                    updateNavButtons();
                    
                    if (adBlockEnabled) {
                        try {
                            const html = iframe.contentDocument.documentElement.outerHTML;
                            const cleaned = adBlocker.cleanHtml(html);
                            if (cleaned !== html) {
                                iframe.contentDocument.open();
                                iframe.contentDocument.write(cleaned);
                                iframe.contentDocument.close();
                                statusText.textContent = '✅ Ads removed!';
                            }
                            updateAdStats();
                        } catch(e) {
                            statusText.textContent = '✅ AdBlock active (cross-origin)';
                        }
                    }
                }
            } catch(e) {
                // Cross origin frame - cannot access contentWindow.location
                statusText.textContent = 'Loaded';
            }
        });

        // Navigation functions
        window.goBack = function() {
            if (window.browserHistoryIndex > 0) {
                window.browserHistoryIndex--;
                const url = window.browserHistory[window.browserHistoryIndex];
                iframe.removeAttribute('srcdoc');
                iframe.src = url;
                urlInput.value = url;
                loadingIndicator.style.display = 'block';
                statusText.textContent = 'Loading...';
                updateNavButtons();
            }
        };

        window.goForward = function() {
            if (window.browserHistoryIndex < window.browserHistory.length - 1) {
                window.browserHistoryIndex++;
                const url = window.browserHistory[window.browserHistoryIndex];
                iframe.removeAttribute('srcdoc');
                iframe.src = url;
                urlInput.value = url;
                loadingIndicator.style.display = 'block';
                statusText.textContent = 'Loading...';
                updateNavButtons();
            }
        };

        window.reloadPage = function() {
            if (adBlockEnabled) {
                const currentUrl = iframe.src;
                if (currentUrl && currentUrl !== 'about:blank') {
                    window.navigateTo(currentUrl);
                }
            } else {
                iframe.src = iframe.src;
            }
            loadingIndicator.style.display = 'block';
            statusText.textContent = 'Reloading...';
        };

        function updateNavButtons() {
            const backBtn = document.getElementById('back-btn');
            const forwardBtn = document.getElementById('forward-btn');
            
            if (backBtn) {
                backBtn.style.opacity = window.browserHistoryIndex > 0 ? '1' : '0.6';
            }
            if (forwardBtn) {
                forwardBtn.style.opacity = window.browserHistoryIndex < window.browserHistory.length - 1 ? '1' : '0.6';
            }
        }

        // Zoom functions
        window.zoomIn = function() {
            window.zoom = Math.min(window.zoom + 0.1, 2);
            iframe.style.zoom = window.zoom;
            zoomLevel.textContent = `${Math.round(window.zoom * 100)}%`;
        };

        window.zoomOut = function() {
            window.zoom = Math.max(window.zoom - 0.1, 0.5);
            iframe.style.zoom = window.zoom;
            zoomLevel.textContent = `${Math.round(window.zoom * 100)}%`;
        };

        window.zoomReset = function() {
            window.zoom = 1;
            iframe.style.zoom = 1;
            zoomLevel.textContent = '100%';
        };

        window.toggleFullscreen = function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        };

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey && e.key === 'l') || (e.metaKey && e.key === 'l')) {
                e.preventDefault();
                urlInput.focus();
                urlInput.select();
            }
            if (e.key === 'F5') {
                e.preventDefault();
                window.reloadPage();
            }
            if ((e.altKey && e.key === 'ArrowLeft') || (e.key === 'Backspace' && e.altKey)) {
                e.preventDefault();
                window.goBack();
            }
            if (e.altKey && e.key === 'ArrowRight') {
                e.preventDefault();
                window.goForward();
            }
            if (e.ctrlKey && e.key === '=') {
                e.preventDefault();
                window.zoomIn();
            }
            if (e.ctrlKey && e.key === '-') {
                e.preventDefault();
                window.zoomOut();
            }
            if (e.ctrlKey && e.key === '0') {
                e.preventDefault();
                window.zoomReset();
            }
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                window.showAddBookmarkDialog();
            }
        });

        // Handle dropdown menus
        document.querySelectorAll('.menu-group').forEach(group => {
            const btn = group.querySelector('.menu-btn');
            const dropdown = group.querySelector('.menu-dropdown');
            
            if (btn && dropdown) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isVisible = dropdown.style.display === 'flex';
                    // Close other dropdowns
                    document.querySelectorAll('.menu-dropdown').forEach(d => {
                        if (d !== dropdown) d.style.display = 'none';
                    });
                    dropdown.style.display = isVisible ? 'none' : 'flex';
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.menu-group')) {
                document.querySelectorAll('.menu-dropdown').forEach(d => {
                    d.style.display = 'none';
                });
                document.querySelectorAll('.submenu').forEach(d => {
                    d.style.display = 'none';
                });
            }
        });

        // Initialize ad stats and bookmarks
        updateAdStats();
        updateNavButtons();
        
        // Wait for bookmarks to load then update menu
        setTimeout(() => {
            if (bookmarkManager.loaded) {
                updateBookmarkMenu();
            } else {
                // Check again after a delay
                const checkLoaded = setInterval(() => {
                    if (bookmarkManager.loaded) {
                        clearInterval(checkLoaded);
                        updateBookmarkMenu();
                    }
                }, 100);
            }
        }, 200);

        console.log('Firefox-style browser with AdBlock and Bookmarks initialized');
        console.log('Using KDE colors:', colors);
    }
})();