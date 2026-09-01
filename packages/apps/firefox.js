(function() {
    "use strict";

    // Inject KDE Firefox theme and styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }

        input, textarea, iframe, .wiki-body, .wiki-body * {
            user-select: text !important;
            -webkit-user-select: text !important;
        }

        :root {
            --bg-color: #1a1b1e;
            --panel-bg: #232629;
            --toolbar-bg: #31363b;
            --text-color: #eff0f1;
            --text-muted: #888888;
            --accent-color: #3daee9;
            --accent-hover: #1d99d6;
            --border-color: #1d2023;
            --hover-bg: rgba(61, 174, 233, 0.15);
            --selected-bg: rgba(61, 174, 233, 0.3);
            --font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            --wiki-bg: #121212;
            --wiki-card: #1e1e1e;
            --wiki-text: #e0e0e0;
            --wiki-link: #569cd6;
        }

        body, html {
            height: 100vh;
            width: 100vw;
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: 13px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-color); }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }

        #firefox-app {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: var(--bg-color);
        }

        /* Tabs Bar */
        #tabs-bar {
            height: 36px;
            background-color: var(--panel-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 4px;
            gap: 2px;
            overflow-x: auto;
            flex-shrink: 0;
        }

        .browser-tab {
            display: flex;
            align-items: center;
            height: 30px;
            padding: 0 12px;
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-bottom: none;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            gap: 8px;
            cursor: pointer;
            font-size: 12px;
            color: var(--text-muted);
            transition: all 0.15s;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .browser-tab.active {
            background-color: var(--toolbar-bg);
            color: var(--text-color);
            border-color: var(--accent-color);
            border-top: 2px solid var(--accent-color);
        }

        .browser-tab:hover {
            color: var(--text-color);
            background-color: rgba(255, 255, 255, 0.05);
        }

        .tab-close {
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            width: 16px;
            height: 16px;
        }

        .tab-close:hover {
            background-color: rgba(255, 85, 85, 0.2);
            color: #ff5555;
        }

        .tab-new-btn {
            background: transparent;
            border: none;
            color: var(--text-color);
            width: 28px;
            height: 28px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.15s;
        }

        .tab-new-btn:hover {
            background-color: var(--hover-bg);
            color: var(--accent-color);
        }

        /* Navigation Toolbar */
        #toolbar {
            height: 44px;
            background-color: var(--toolbar-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 10px;
            gap: 6px;
            flex-shrink: 0;
        }

        .tool-btn {
            background: transparent;
            border: 1px solid transparent;
            color: var(--text-color);
            border-radius: 4px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            flex-shrink: 0;
        }

        .tool-btn:hover:not(:disabled) {
            background-color: var(--hover-bg);
            border-color: var(--accent-color);
        }

        .tool-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        .tool-btn svg {
            width: 16px;
            height: 16px;
            stroke: currentColor;
            stroke-width: 2;
            fill: none;
        }

        /* URL Bar */
        #url-bar-container {
            flex-grow: 1;
            display: flex;
            align-items: center;
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            height: 32px;
            padding: 0 12px;
            gap: 8px;
            transition: border-color 0.2s;
        }

        #url-bar-container:focus-within {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 1px var(--accent-color);
        }

        #url-input {
            flex-grow: 1;
            background: transparent;
            border: none;
            color: var(--text-color);
            font-family: inherit;
            font-size: 13px;
            outline: none;
        }

        /* Viewport / Browser Content Area */
        #viewport-container {
            flex-grow: 1;
            display: flex;
            position: relative;
            overflow: hidden;
            background-color: var(--wiki-bg);
        }

        .browser-page {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            display: none;
            overflow-y: auto;
            background-color: var(--wiki-bg);
            color: var(--wiki-text);
        }

        .browser-page.active {
            display: block;
        }

        .browser-iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: #ffffff;
        }

        /* Wikipedia Dark Mode Styling */
        .wiki-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 30px;
            font-family: sans-serif;
            line-height: 1.6;
        }

        .wiki-header {
            border-bottom: 1px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .wiki-title {
            font-size: 36px;
            font-weight: normal;
            color: #ffffff;
            font-family: 'Linux Libertine', Georgia, serif;
            margin-bottom: 6px;
        }

        .wiki-subtitle {
            font-size: 13px;
            color: #888;
        }

        .wiki-search-box {
            display: flex;
            background: #232629;
            border: 1px solid #444;
            border-radius: 4px;
            overflow: hidden;
        }

        .wiki-search-input {
            background: transparent;
            border: none;
            color: #fff;
            padding: 8px 12px;
            font-size: 13px;
            outline: none;
            width: 220px;
        }

        .wiki-search-btn {
            background: #3daee9;
            color: #000;
            border: none;
            padding: 0 14px;
            font-weight: bold;
            cursor: pointer;
        }

        .wiki-content {
            display: flex;
            gap: 30px;
        }

        .wiki-main {
            flex-grow: 1;
        }

        .wiki-sidebar {
            width: 280px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .wiki-card {
            background: var(--wiki-card);
            border: 1px solid #333;
            border-radius: 6px;
            padding: 16px;
        }

        .wiki-card-title {
            font-size: 15px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 10px;
            border-bottom: 1px solid #333;
            padding-bottom: 6px;
        }

        .wiki-p {
            margin-bottom: 16px;
            font-size: 14px;
            color: var(--wiki-text);
        }

        .wiki-link {
            color: var(--wiki-link);
            text-decoration: none;
            cursor: pointer;
        }

        .wiki-link:hover {
            text-decoration: underline;
        }

        /* Status Bar */
        #status-bar {
            height: 22px;
            background-color: var(--panel-bg);
            border-top: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-size: 11px;
            color: var(--text-muted);
            flex-shrink: 0;
        }

        /* Notification Toast */
        #toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--accent-color);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: bold;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 20000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        #toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    function applyKDEColors() {
        const kdeColors = window.kdeThemeColors || window.parent?.kdeThemeColors || {
            'kde-bg': '#1a1b1e',
            'kde-panel': '#232629',
            'kde-accent': '#3daee9',
            'kde-text': '#eff0f1',
            'kde-window-border': '#1d2023',
        };

        const root = document.documentElement;
        root.style.setProperty('--bg-color', kdeColors['kde-bg']);
        root.style.setProperty('--panel-bg', kdeColors['kde-panel']);
        root.style.setProperty('--text-color', kdeColors['kde-text']);
        root.style.setProperty('--border-color', kdeColors['kde-window-border']);
        root.style.setProperty('--accent-color', kdeColors['kde-accent']);
    }
    applyKDEColors();

    document.body.innerHTML = `
    <div id="firefox-app">
        <!-- Tabs Bar -->
        <div id="tabs-bar">
            <div id="tabs-container" style="display:flex; gap:2px; align-items:center; flex-grow:1; overflow-x:auto;"></div>
            <button class="tab-new-btn" id="btn-new-tab" title="Open New Tab (Ctrl+T)">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
        </div>

        <!-- Navigation Toolbar -->
        <div id="toolbar">
            <button class="tool-btn" id="btn-back" title="Back" disabled>
                <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="tool-btn" id="btn-forward" title="Forward" disabled>
                <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="tool-btn" id="btn-reload" title="Reload">
                <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </button>
            <button class="tool-btn" id="btn-home" title="Wikipedia Homepage">
                <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </button>

            <!-- URL Bar -->
            <div id="url-bar-container">
                <svg viewBox="0 0 24 24" style="width:14px; height:14px; stroke:var(--text-muted); stroke-width:2; fill:none;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input type="text" id="url-input" spellcheck="false" placeholder="Enter URL or search Wikipedia...">
            </div>
        </div>

        <!-- Viewport Container -->
        <div id="viewport-container"></div>

        <!-- Status Bar -->
        <div id="status-bar">
            <span id="status-text">Connected via KDE Web Engine (Dark Mode)</span>
        </div>
    </div>

    <!-- Notification Toast -->
    <div id="toast">Notice</div>
    `;

    let tabs = [];
    let activeTab = null;
    let vfs = null;

    function loadVFS() {
        try {
            const savedVFS = localStorage.getItem('sTerminal_vfs');
            if (savedVFS) vfs = JSON.parse(savedVFS);
        } catch (e) {
            console.error("Failed to load VFS:", e);
        }
    }

    function logFirefoxAction(message) {
        try {
            loadVFS();
            if (!vfs) return;
            const logPath = ['home', 'user', 'Documents', 'Logs'];
            let node = vfs;
            for (const p of logPath) {
                if (!node.children[p]) {
                    node.children[p] = { type: 'dir', description: 'Logs directory', children: {} };
                }
                node = node.children[p];
            }
            if (!node.children['logFirefox.txt']) {
                node.children['logFirefox.txt'] = { type: 'file', description: 'Firefox browser logs', content: '' };
            }
            const timestamp = new Date().toISOString();
            node.children['logFirefox.txt'].content += `[${timestamp}] ${message}\n`;
            localStorage.setItem('sTerminal_vfs', JSON.stringify(vfs));
        } catch (err) {
            console.error("Failed to log firefox action:", err);
        }
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    class BrowserTab {
        constructor(url = 'https://www.wikipedia.com/') {
            this.id = 'tab_' + Math.random().toString(36).substr(2, 9);
            this.url = url;
            this.history = [url];
            this.historyIndex = 0;
            this.title = 'Wikipedia';

            this.buildDOM();
            this.navigateTo(url, false);
        }

        buildDOM() {
            this.tabEl = document.createElement('div');
            this.tabEl.className = 'browser-tab';
            this.tabEl.innerHTML = `
                <span class="tab-title" style="flex-grow:1; overflow:hidden; text-overflow:ellipsis;">Wikipedia</span>
                <button class="tab-close" title="Close Tab">&times;</button>
            `;

            this.tabEl.addEventListener('click', () => switchTab(this));
            this.tabEl.querySelector('.tab-close').addEventListener('click', (e) => {
                e.stopPropagation();
                closeTab(this);
            });

            document.getElementById('tabs-container').appendChild(this.tabEl);

            this.pageEl = document.createElement('div');
            this.pageEl.className = 'browser-page';
            document.getElementById('viewport-container').appendChild(this.pageEl);
        }

        async navigateTo(url, recordHistory = true) {
            let cleanUrl = url.trim();
            if (cleanUrl === 'www.wikipedia.com' || cleanUrl === 'wikipedia.com' || cleanUrl === 'https://www.wikipedia.com' || cleanUrl === 'https://www.wikipedia.com/' || cleanUrl === 'http://www.wikipedia.com/' || cleanUrl === 'http://www.wikipedia.com') {
                cleanUrl = 'https://www.wikipedia.com/';
            }

            if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
                if (cleanUrl.includes('.') && !cleanUrl.includes(' ')) {
                    cleanUrl = 'https://' + cleanUrl;
                } else {
                    cleanUrl = `https://en.wikipedia.org/wiki/Special:Search?search=` + encodeURIComponent(cleanUrl);
                }
            }

            this.url = cleanUrl;
            if (recordHistory) {
                if (this.historyIndex < this.history.length - 1) {
                    this.history = this.history.slice(0, this.historyIndex + 1);
                }
                this.history.push(cleanUrl);
                this.historyIndex = this.history.length - 1;
            }

            await this.renderPage();
            if (activeTab === this) {
                updateToolbarState();
            }
            logFirefoxAction(`Navigated to: ${cleanUrl}`);
        }

        goBack() {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.navigateTo(this.history[this.historyIndex], false);
            }
        }

        goForward() {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.navigateTo(this.history[this.historyIndex], false);
            }
        }

        async renderPage() {
            // Check if it's the Wikipedia Homepage (`https://www.wikipedia.com/`)
            if (this.url === 'https://www.wikipedia.com/' || this.url === 'https://www.wikipedia.com') {
                this.title = 'Wikipedia, the free encyclopedia';
                this.tabEl.querySelector('.tab-title').innerText = 'Wikipedia';
                
                this.pageEl.innerHTML = `
                    <div class="wiki-container">
                        <div class="wiki-header">
                            <div>
                                <div class="wiki-title">Wikipedia</div>
                                <div class="wiki-subtitle">The Free Encyclopedia</div>
                            </div>
                            <div class="wiki-search-box">
                                <input type="text" class="wiki-search-input" id="wiki-main-search" placeholder="Search Wikipedia...">
                                <button class="wiki-search-btn" id="wiki-main-search-btn">Search</button>
                            </div>
                        </div>
                        <div class="wiki-content">
                            <div class="wiki-main">
                                <h3 style="color:var(--accent-color); margin-bottom:12px; font-size:18px;">Welcome to Wikipedia</h3>
                                <p class="wiki-p">The free encyclopedia that anyone can edit. Explore millions of articles across science, history, arts, and culture.</p>
                                
                                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px;">
                                    <div class="wiki-card">
                                        <div class="wiki-card-title">Featured Article</div>
                                        <p class="wiki-p" style="font-size:13px;">Explore featured content across science, history, geography, and arts. Wikipedia provides comprehensive encyclopedic knowledge sourced from reliable academic references.</p>
                                        <a class="wiki-link" onclick="window.navigateWiki('Science')">→ Read about Science</a>
                                    </div>
                                    <div class="wiki-card">
                                        <div class="wiki-card-title">Technology & Linux</div>
                                        <p class="wiki-p" style="font-size:13px;">...that KDE Plasma is one of the most customizable, modern Linux desktop environments available today, built on Qt technology?</p>
                                        <a class="wiki-link" onclick="window.navigateWiki('KDE')">→ Learn more about KDE</a>
                                    </div>
                                </div>
                            </div>
                            <div class="wiki-sidebar">
                                <div class="wiki-card">
                                    <div class="wiki-card-title">Explore Topics</div>
                                    <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:13px;">
                                        <li><a class="wiki-link" onclick="window.navigateWiki('Mathematics')">Mathematics</a></li>
                                        <li><a class="wiki-link" onclick="window.navigateWiki('Physics')">Physics</a></li>
                                        <li><a class="wiki-link" onclick="window.navigateWiki('Computer Science')">Computer Science</a></li>
                                        <li><a class="wiki-link" onclick="window.navigateWiki('History')">History</a></li>
                                        <li><a class="wiki-link" onclick="window.navigateWiki('Astronomy')">Astronomy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    const searchInput = this.pageEl.querySelector('#wiki-main-search');
                    const searchBtn = this.pageEl.querySelector('#wiki-main-search-btn');
                    const doSearch = () => {
                        const query = searchInput.value.trim();
                        if (query) this.navigateTo(query);
                    };
                    searchBtn.onclick = doSearch;
                    searchInput.onkeydown = (e) => { if (e.key === 'Enter') doSearch(); };
                }, 50);
                return;
            }

            // Check if it's a Wikipedia article URL or Search
            if (this.url.includes('wikipedia.org/wiki/')) {
                const titleMatch = this.url.split('/wiki/')[1]?.split('#')[0] || 'Main_Page';
                
                if (titleMatch.startsWith('Special:Search')) {
                    const urlParams = new URLSearchParams(this.url.split('?')[1]);
                    const searchQuery = urlParams.get('search') || '';
                    this.title = `Search: ${searchQuery}`;
                    this.tabEl.querySelector('.tab-title').innerText = this.title;

                    this.pageEl.innerHTML = `
                        <div class="wiki-container">
                            <div class="wiki-header">
                                <div class="wiki-title">Search results</div>
                                <div class="wiki-subtitle">Results for "${searchQuery}"</div>
                            </div>
                            <div class="wiki-content">
                                <div class="wiki-main">
                                    <p class="wiki-p">Direct article match for <a class="wiki-link" onclick="window.navigateWiki('${searchQuery}')"><b>${searchQuery}</b></a></p>
                                    <p class="wiki-p">Click above to view detailed Wikipedia encyclopedia documentation on this subject.</p>
                                </div>
                            </div>
                        </div>
                    `;
                    return;
                }

                try {
                    const apiEndpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titleMatch)}`;
                    const response = await fetch(apiEndpoint);
                    if (response.ok) {
                        const data = await response.json();
                        this.title = data.title || titleMatch;
                        this.tabEl.querySelector('.tab-title').innerText = this.title;
                        
                        let thumbnailHTML = '';
                        if (data.thumbnail && data.thumbnail.source) {
                            thumbnailHTML = `<img src="${data.thumbnail.source}" alt="${data.title}" style="max-width:100%; border-radius:6px; margin-bottom:16px;">`;
                        }

                        this.pageEl.innerHTML = `
                            <div class="wiki-container">
                                <div class="wiki-header">
                                    <div>
                                        <div class="wiki-title">${data.title}</div>
                                        <div class="wiki-subtitle">From Wikipedia, the free encyclopedia • <a href="${data.content_urls?.desktop?.page || this.url}" target="_blank" style="color:var(--accent-color)">Open on Wikipedia</a></div>
                                    </div>
                                    <a class="wiki-link" onclick="window.navigateWiki('https://www.wikipedia.com/')" style="font-weight:bold;">← Return to Main Page</a>
                                </div>
                                <div class="wiki-content">
                                    <div class="wiki-main">
                                        ${thumbnailHTML}
                                        <p class="wiki-p" style="font-size: 16px; line-height: 1.7;"><b>${data.description || ''}</b></p>
                                        <p class="wiki-p" style="font-size: 14px; line-height: 1.7;">${data.extract || 'No summary available.'}</p>
                                        <div style="margin-top:40px; padding-top:15px; border-top:1px solid #333; font-size:12px; color:#888;">
                                            Content fetched live from Wikimedia REST API under CC BY-SA License.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        return;
                    }
                } catch(e) {
                    console.warn("Wiki API fetch fallback:", e);
                }
            }

            // Fallback general web view using an iframe
            this.tabEl.querySelector('.tab-title').innerText = this.url;
            this.pageEl.innerHTML = `
                <div style="width:100%; height:100%; display:flex; flex-direction:column;">
                    <div style="background:#232629; padding:6px 12px; font-size:12px; color:#aaa; border-bottom:1px solid #31363b; display:flex; justify-content:space-between;">
                        <span>Displaying external web content in sandboxed browser container.</span>
                        <a href="${this.url}" target="_blank" style="color:var(--accent-color)">Open in new tab ↗</a>
                    </div>
                    <iframe class="browser-iframe" src="${this.url}" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
                </div>
            `;
        }
    }

    window.navigateWiki = function(topic) {
        if (activeTab) {
            if (topic === 'https://www.wikipedia.com/' || topic === 'Main_Page') {
                activeTab.navigateTo('https://www.wikipedia.com/');
            } else {
                activeTab.navigateTo(`https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`);
            }
            updateToolbarState();
        }
    };

    function createTab(url = 'https://www.wikipedia.com/') {
        const tab = new BrowserTab(url);
        tabs.push(tab);
        switchTab(tab);
    }

    function switchTab(tab) {
        tabs.forEach(t => {
            t.tabEl.classList.remove('active');
            t.pageEl.classList.remove('active');
        });

        activeTab = tab;
        tab.tabEl.classList.add('active');
        tab.pageEl.classList.add('active');

        document.getElementById('url-input').value = tab.url;
        updateToolbarState();
    }

    function closeTab(tab) {
        const idx = tabs.indexOf(tab);
        if (idx === -1) return;

        tab.tabEl.remove();
        tab.pageEl.remove();
        tabs.splice(idx, 1);

        if (tabs.length === 0) {
            createTab('https://www.wikipedia.com/');
        } else {
            switchTab(tabs[Math.max(0, idx - 1)]);
        }
    }

    function updateToolbarState() {
        if (!activeTab) return;
        document.getElementById('btn-back').disabled = activeTab.historyIndex <= 0;
        document.getElementById('btn-forward').disabled = activeTab.historyIndex >= activeTab.history.length - 1;
        document.getElementById('url-input').value = activeTab.url;
    }

    document.getElementById('btn-new-tab').addEventListener('click', () => createTab('https://www.wikipedia.com/'));
    document.getElementById('btn-back').addEventListener('click', () => { if (activeTab) { activeTab.goBack(); updateToolbarState(); } });
    document.getElementById('btn-forward').addEventListener('click', () => { if (activeTab) { activeTab.goForward(); updateToolbarState(); } });
    document.getElementById('btn-reload').addEventListener('click', () => { if (activeTab) activeTab.renderPage(); });
    document.getElementById('btn-home').addEventListener('click', () => { if (activeTab) { activeTab.navigateTo('https://www.wikipedia.com/'); updateToolbarState(); } });

    const urlInput = document.getElementById('url-input');
    urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = urlInput.value.trim();
            if (activeTab && val) {
                activeTab.navigateTo(val);
                updateToolbarState();
            }
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            createTab('https://www.wikipedia.com/');
        }
        if (e.ctrlKey && e.key.toLowerCase() === 'w') {
            e.preventDefault();
            if (activeTab) closeTab(activeTab);
        }
        if (e.key === 'F5') {
            e.preventDefault();
            if (activeTab) activeTab.renderPage();
        }
    });

    loadVFS();
    createTab('https://www.wikipedia.com/');
    logFirefoxAction("KDE Firefox Web Browser initialized with startpage https://www.wikipedia.com/.");

})();