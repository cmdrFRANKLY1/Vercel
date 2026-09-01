(function() {
    "use strict";

    const style = document.createElement('style');
    style.textContent = `
        /* ===== KDE THEMED RESET & GLOBAL ===== */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }
        
        input, textarea, .modal-body, .modal-body * {
            user-select: text !important;
            -webkit-user-select: text !important;
        }

        :root {
            --bg-color: #1a1b1e;
            --panel-bg: #232629;
            --text-color: #eff0f1;
            --text-muted: #888888;
            --accent-color: #3daee9;
            --accent-hover: #1d99d6;
            --border-color: #31363b;
            --hover-bg: rgba(61, 174, 233, 0.15);
            --selected-bg: rgba(61, 174, 233, 0.3);
            --font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            --icon-color-folder: #3daee9;
            --icon-color-file: #eff0f1;
            --warning-color: #f67400;
        }

        body, html {
            height: 100vh;
            width: 100vw;
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: 14px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-color); }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }

        #app {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: var(--bg-color);
        }

        /* Toolbar */
        #toolbar {
            height: 48px;
            background-color: var(--panel-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 12px;
            gap: 6px;
            flex-shrink: 0;
            flex-wrap: nowrap;
            overflow-x: auto;
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

        .toolbar-separator {
            width: 1px;
            height: 24px;
            background-color: var(--border-color);
            margin: 0 4px;
            flex-shrink: 0;
        }

        /* Breadcrumb Path Bar */
        #path-bar {
            flex-grow: 1;
            display: flex;
            align-items: center;
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            height: 32px;
            padding: 0 8px;
            overflow-x: auto;
            white-space: nowrap;
            min-width: 120px;
        }

        .breadcrumb {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            padding: 2px 6px;
            border-radius: 3px;
            transition: background 0.2s;
            font-size: 13px;
        }

        .breadcrumb:hover {
            background-color: var(--hover-bg);
            color: var(--accent-color);
        }

        .breadcrumb-sep {
            color: var(--text-muted);
            margin: 0 4px;
            font-size: 12px;
        }

        #main-container {
            display: flex;
            flex-grow: 1;
            overflow: hidden;
        }

        /* Places Sidebar */
        #sidebar {
            width: 200px;
            background-color: var(--panel-bg);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            flex-shrink: 0;
        }

        .sidebar-group {
            margin-top: 12px;
            margin-bottom: 4px;
            padding: 0 16px;
            font-size: 11px;
            text-transform: uppercase;
            color: var(--text-muted);
            font-weight: bold;
            letter-spacing: 0.05em;
        }

        .sidebar-item {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            cursor: pointer;
            gap: 12px;
            transition: background 0.2s;
        }

        .sidebar-item:hover {
            background-color: var(--hover-bg);
        }
        
        .sidebar-item.active {
            background-color: var(--selected-bg);
            color: var(--accent-color);
            border-left: 3px solid var(--accent-color);
            padding-left: 13px;
        }

        .sidebar-item svg {
            width: 18px;
            height: 18px;
            stroke: currentColor;
            stroke-width: 2;
            fill: none;
        }

        /* Split View Containers */
        #split-container {
            flex-grow: 1;
            display: flex;
            height: 100%;
            overflow: hidden;
            background-color: var(--bg-color);
        }

        .pane {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            position: relative;
        }

        .pane.active-pane {
            box-shadow: inset 0 0 0 2px var(--accent-color);
        }

        .split-divider {
            width: 4px;
            background-color: var(--border-color);
            cursor: ew-resize;
            flex-shrink: 0;
            z-index: 10;
            transition: background-color 0.2s;
        }

        .split-divider:hover {
            background-color: var(--accent-color);
        }

        /* Detailed File View Area */
        .file-view {
            flex-grow: 1;
            background-color: var(--bg-color);
            padding: 8px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .list-header {
            display: flex;
            padding: 8px 12px;
            font-weight: bold;
            color: var(--text-muted);
            border-bottom: 1px solid var(--border-color);
            font-size: 12px;
            text-transform: uppercase;
        }

        .item-card {
            width: 100%;
            display: flex;
            flex-direction: row;
            padding: 6px 12px;
            gap: 12px;
            text-align: left;
            align-items: center;
            border-radius: 4px;
            height: 36px;
            cursor: pointer;
            border: 1px solid transparent;
            transition: all 0.15s;
        }

        .item-card:hover {
            background-color: var(--hover-bg);
            border-color: rgba(61, 174, 233, 0.3);
        }

        .item-card.selected {
            background-color: var(--selected-bg);
            border-color: var(--accent-color);
        }

        .item-icon {
            width: 20px;
            height: 20px;
            margin-bottom: 0;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .item-icon svg {
            width: 100%;
            height: 100%;
            stroke-width: 1.5;
            fill: none;
        }

        .item-icon.dir svg { stroke: var(--icon-color-folder); fill: rgba(61, 174, 233, 0.1); }
        .item-icon.file svg { stroke: var(--icon-color-file); }

        .item-name {
            font-size: 13px;
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .item-meta {
            font-size: 12px;
            color: var(--text-muted);
            width: 120px;
            text-align: right;
        }

        .empty-state {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--text-muted);
            font-style: italic;
        }

        /* Context Menu */
        .context-menu {
            position: fixed;
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
            display: none;
            flex-direction: column;
            z-index: 9999;
            min-width: 180px;
            padding: 4px 0;
        }

        .context-menu-item {
            padding: 8px 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 13px;
            color: var(--text-color);
            transition: background 0.15s;
        }

        .context-menu-item:hover:not(.disabled) {
            background-color: var(--accent-color);
            color: #000;
        }

        .context-menu-item.disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .context-menu-item svg {
            width: 14px;
            height: 14px;
            stroke: currentColor;
            stroke-width: 2;
            fill: none;
        }

        .context-menu-sep {
            height: 1px;
            background-color: var(--border-color);
            margin: 4px 0;
        }

        /* Editor Modal */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.6);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(2px);
        }

        .modal {
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            width: 80%;
            max-width: 800px;
            height: 80vh;
            max-height: 800px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .modal-header {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
        }

        .modal-close {
            background: transparent;
            border: none;
            color: var(--text-color);
            font-size: 20px;
            cursor: pointer;
            line-height: 1;
        }
        
        .modal-close:hover { color: #ff5555; }

        .modal-body {
            padding: 16px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .modal-body textarea {
            width: 100%;
            height: 100%;
            background: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            padding: 12px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            resize: none;
            outline: none;
        }
        
        .modal-body textarea:focus {
            border-color: var(--accent-color);
        }

        .modal-footer {
            padding: 12px 16px;
            border-top: 1px solid var(--border-color);
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        .btn {
            background: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-family: inherit;
            font-size: 13px;
            transition: all 0.2s;
        }

        .btn:hover { background: var(--hover-bg); border-color: var(--accent-color); }
        .btn.primary { background: var(--accent-color); color: #000; border-color: var(--accent-color); font-weight: bold;}
        .btn.primary:hover { background: var(--accent-hover); }

        /* Notification Toast */
        #toast {
            position: fixed;
            bottom: 20px;
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
        const kdeColors = window.kdeThemeColors || {
            'kde-bg': '#1a1b1e',
            'kde-panel': '#232629',
            'kde-accent': '#3daee9',
            'kde-text': '#eff0f1',
            'kde-window-bg': '#31363b',
            'kde-window-border': '#1d2023',
        };

        const root = document.documentElement;
        root.style.setProperty('--bg-color', kdeColors['kde-bg']);
        root.style.setProperty('--panel-bg', kdeColors['kde-panel']);
        root.style.setProperty('--text-color', kdeColors['kde-text']);
        root.style.setProperty('--border-color', kdeColors['kde-window-border']);
        root.style.setProperty('--accent-color', kdeColors['kde-accent']);
        root.style.setProperty('--icon-color-folder', kdeColors['kde-accent']);
    }
    applyKDEColors();

    document.body.innerHTML = `
    <div id="app">
        <!-- Toolbar -->
        <div id="toolbar">
            <button class="tool-btn" id="btn-back" title="Back" disabled>
                <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="tool-btn" id="btn-forward" title="Forward" disabled>
                <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="tool-btn" id="btn-up" title="Up">
                <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
            <button class="tool-btn" id="btn-refresh" title="Refresh">
                <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </button>
            
            <div id="path-bar"></div>

            <div class="toolbar-separator"></div>

            <button class="tool-btn" id="btn-new-folder" title="Create New Folder">
                <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
            </button>
            <button class="tool-btn" id="btn-new-file" title="Create New File">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
            </button>
            <button class="tool-btn" id="btn-delete" title="Delete Selected">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>

            <div class="toolbar-separator"></div>

            <button class="tool-btn" id="btn-split-view" title="Toggle Split View">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>
            </button>
        </div>

        <!-- Main Content -->
        <div id="main-container">
            <!-- Sidebar Places -->
            <div id="sidebar">
                <div class="sidebar-group">Places</div>
                <div class="sidebar-item" data-path="home,user">
                    <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Home
                </div>
                <div class="sidebar-item" data-path="">
                    <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>
                    Root System
                </div>
                <div class="sidebar-item" data-path="home,user,Documents">
                    <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Documents
                </div>
                <div class="sidebar-item" data-path="home,user,Desktop">
                    <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    Desktop
                </div>
                <div class="sidebar-item" data-path="home,user,Downloads">
                    <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Downloads
                </div>
                <div class="sidebar-item" data-path="var,log">
                    <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    System Logs
                </div>
                
                <div class="sidebar-group">Devices</div>
                <div class="sidebar-item" data-path="mnt">
                    <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    Mounts
                </div>
            </div>

            <!-- Split View Host Container -->
            <div id="split-container"></div>
        </div>
    </div>

    <!-- Context Menu -->
    <div id="context-menu" class="context-menu">
        <div class="context-menu-item" id="ctx-open">
            <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            Open
        </div>
        <div class="context-menu-sep"></div>
        <div class="context-menu-item" id="ctx-copy">
            <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy
        </div>
        <div class="context-menu-item" id="ctx-paste">
            <svg viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            Paste
        </div>
        <div class="context-menu-sep"></div>
        <div class="context-menu-item" id="ctx-rename">
            <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Rename
        </div>
        <div class="context-menu-item" id="ctx-delete">
            <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
        </div>
    </div>

    <!-- File Editor Modal -->
    <div class="modal-overlay" id="editor-modal">
        <div class="modal">
            <div class="modal-header">
                <span id="editor-title">Editing: file.txt</span>
                <button class="modal-close" id="editor-close">&times;</button>
            </div>
            <div class="modal-body">
                <textarea id="editor-content" spellcheck="false"></textarea>
            </div>
            <div class="modal-footer">
                <span id="editor-status" style="flex-grow:1; color:var(--text-muted); align-self:center; font-size:12px;"></span>
                <button class="btn" id="editor-cancel">Close</button>
                <button class="btn primary" id="editor-save">Save changes</button>
            </div>
        </div>
    </div>

    <!-- Notification Toast -->
    <div id="toast">Saved successfully!</div>
    `;

    let vfs = null;
    let currentEditingFile = null;
    let isSplitView = false;
    let clipboard = null; // { type: 'copy'|'cut', path: [...], name: '...' }
    let contextMenuTarget = { pane: null, itemName: null, isBackground: false };

    class DolphinPane {
        constructor(containerEl, initialPath = ['home', 'user']) {
            this.container = containerEl;
            this.currentPath = [...initialPath];
            this.history = [[...initialPath]];
            this.historyIndex = 0;
            this.selectedItemName = null;

            this.buildDOM();
            this.updateUI();
        }

        buildDOM() {
            this.container.innerHTML = `<div class="file-view" tabindex="0"></div>`;
            this.viewEl = this.container.querySelector('.file-view');

            this.viewEl.addEventListener('click', (e) => {
                if (e.target === this.viewEl) {
                    this.clearSelection();
                }
                setActivePane(this);
                hideContextMenu();
            });

            this.viewEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                setActivePane(this);
                const card = e.target.closest('.item-card');
                if (card) {
                    const itemName = card.dataset.name;
                    this.clearSelection();
                    card.classList.add('selected');
                    this.selectedItemName = itemName;
                    showContextMenu(e.clientX, e.clientY, this, itemName, false);
                } else {
                    this.clearSelection();
                    showContextMenu(e.clientX, e.clientY, this, null, true);
                }
            });

            this.container.addEventListener('click', () => setActivePane(this));
        }

        clearSelection() {
            this.selectedItemName = null;
            this.viewEl.querySelectorAll('.item-card').forEach(c => c.classList.remove('selected'));
        }

        navigate(newPath, recordHistory = true) {
            const node = getNodeByPath(newPath);
            if (!node || node.type !== 'dir') {
                showToast("Directory not found or access denied.");
                return;
            }

            if (recordHistory) {
                if (this.historyIndex < this.history.length - 1) {
                    this.history = this.history.slice(0, this.historyIndex + 1);
                }
                this.history.push([...newPath]);
                this.historyIndex = this.history.length - 1;
            }

            this.currentPath = [...newPath];
            this.clearSelection();
            this.updateUI();
            logDolphinAction(`Navigated to: /${this.currentPath.join('/')}`);
        }

        goBack() {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.navigate(this.history[this.historyIndex], false);
            }
        }

        goForward() {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.navigate(this.history[this.historyIndex], false);
            }
        }

        goUp() {
            if (this.currentPath.length > 0) {
                const upPath = this.currentPath.slice(0, -1);
                this.navigate(upPath);
            }
        }

        refresh() {
            loadVFS();
            this.renderDirectory();
            showToast("Filesystem refreshed");
        }

        updateUI() {
            if (activePane === this) {
                updateToolbarNavState();
                renderBreadcrumbs();
                renderSidebarHighlight();
            }
            this.renderDirectory();
        }

        renderDirectory() {
            this.viewEl.innerHTML = '';
            const node = getNodeByPath(this.currentPath);

            const header = document.createElement('div');
            header.className = 'list-header';
            header.innerHTML = `<span style="flex-grow:1">Name</span><span style="width:120px; text-align:right">Type</span>`;
            this.viewEl.appendChild(header);
            
            if (!node || !node.children || Object.keys(node.children).length === 0) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'empty-state';
                emptyDiv.innerText = 'Folder is empty';
                this.viewEl.appendChild(emptyDiv);
                return;
            }

            const keys = Object.keys(node.children).sort((a, b) => {
                const nodeA = node.children[a];
                const nodeB = node.children[b];
                if (nodeA.type === nodeB.type) return a.localeCompare(b);
                return nodeA.type === 'dir' ? -1 : 1;
            });

            keys.forEach(key => {
                const child = node.children[key];
                const isDir = child.type === 'dir';
                
                let iconSVG = isDir ? svgFolder : svgFile;
                if (!isDir && (key.endsWith('.bin') || key.endsWith('.exe') || key.endsWith('.sh') || key.endsWith('.js'))) {
                    iconSVG = svgBinary;
                }

                const card = document.createElement('div');
                card.className = 'item-card';
                card.dataset.name = key;
                if (this.selectedItemName === key) card.classList.add('selected');
                card.title = child.description || (isDir ? 'Directory' : 'File');
                
                card.innerHTML = `
                    <div class="item-icon ${isDir ? 'dir' : 'file'}">${iconSVG}</div>
                    <div class="item-name">${key}</div>
                    <div class="item-meta">${isDir ? 'Folder' : 'File'}</div>
                `;

                let clickTimeout = null;
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setActivePane(this);
                    this.clearSelection();
                    card.classList.add('selected');
                    this.selectedItemName = key;

                    if (clickTimeout) {
                        clearTimeout(clickTimeout);
                        clickTimeout = null;
                        this.handleItemOpen(key, child);
                    } else {
                        clickTimeout = setTimeout(() => {
                            clickTimeout = null;
                        }, 250);
                    }
                });

                this.viewEl.appendChild(card);
            });
        }

        handleItemOpen(name, nodeData) {
            if (nodeData.type === 'dir') {
                this.navigate([...this.currentPath, name]);
            } else if (nodeData.type === 'file') {
                openFileEditor(name, nodeData);
            }
        }
    }

    const svgFolder = `<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
    const svgFile = `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    const svgBinary = `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`;

    let panes = [];
    let activePane = null;

    const pathBar = document.getElementById('path-bar');
    const btnBack = document.getElementById('btn-back');
    const btnForward = document.getElementById('btn-forward');
    const btnUp = document.getElementById('btn-up');
    const btnRefresh = document.getElementById('btn-refresh');
    const btnNewFolder = document.getElementById('btn-new-folder');
    const btnNewFile = document.getElementById('btn-new-file');
    const btnDelete = document.getElementById('btn-delete');
    const btnSplitView = document.getElementById('btn-split-view');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const splitContainer = document.getElementById('split-container');
    const contextMenu = document.getElementById('context-menu');
    
    const editorModal = document.getElementById('editor-modal');
    const editorTitle = document.getElementById('editor-title');
    const editorContent = document.getElementById('editor-content');
    const btnSave = document.getElementById('editor-save');
    const btnCancel = document.getElementById('editor-cancel');
    const btnClose = document.getElementById('editor-close');
    const editorStatus = document.getElementById('editor-status');
    const toast = document.getElementById('toast');

    function loadVFS() {
        try {
            const savedVFS = localStorage.getItem('sTerminal_vfs');
            if (savedVFS) {
                vfs = JSON.parse(savedVFS);
            } else {
                vfs = {
                    type: 'dir', description: 'Root', children: {
                        'home': { type: 'dir', children: {
                            'user': { type: 'dir', children: {
                                'Documents': { type: 'dir', children: {
                                    'Logs': { type: 'dir', children: {} },
                                    'readme.txt': { type: 'file', content: 'Welcome to Dolphin VFS browser.' }
                                }},
                                '.bashrc': { type: 'file', content: '# alias ls="ls -la"' }
                            }}
                        }},
                        'var': { type: 'dir', children: {
                            'log': { type: 'dir', children: {
                                'syslog': { type: 'file', content: 'System started successfully.'}
                            }}
                        }}
                    }
                };
            }
        } catch (e) {
            console.error("Failed to load VFS:", e);
        }
    }

    function saveVFS() {
        if (vfs) {
            localStorage.setItem('sTerminal_vfs', JSON.stringify(vfs));
        }
    }

    function logDolphinAction(message) {
        try {
            if (!vfs) loadVFS();
            const logPath = ['home', 'user', 'Documents', 'Logs'];
            const logFileName = 'logDolphin.txt';

            let node = vfs;
            for (const p of logPath) {
                if (!node.children[p]) {
                    node.children[p] = { type: 'dir', description: 'Auto-created logs directory', children: {} };
                }
                node = node.children[p];
            }

            if (!node.children[logFileName]) {
                node.children[logFileName] = { type: 'file', description: 'Dolphin file manager activity log', content: '' };
            }

            const timestamp = new Date().toISOString();
            node.children[logFileName].content += `[${timestamp}] ${message}\n`;
            saveVFS();
        } catch (err) {
            console.error("Failed to log dolphin action:", err);
        }
    }

    function getNodeByPath(pathArray) {
        if (!vfs) return null;
        let node = vfs;
        for (let p of pathArray) {
            if (p === '') continue;
            if (node.type !== 'dir' || !node.children || !node.children[p]) {
                return null;
            }
            node = node.children[p];
        }
        return node;
    }

    function setActivePane(pane) {
        panes.forEach(p => p.container.classList.remove('active-pane'));
        pane.container.classList.add('active-pane');
        activePane = pane;
        pane.updateUI();
        hideContextMenu();
    }

    function updateToolbarNavState() {
        if (!activePane) return;
        btnBack.disabled = activePane.historyIndex <= 0;
        btnForward.disabled = activePane.historyIndex >= activePane.history.length - 1;
        btnUp.disabled = activePane.currentPath.length === 0;
        renderBreadcrumbs();
        renderSidebarHighlight();
    }

    function renderBreadcrumbs() {
        if (!activePane) return;
        pathBar.innerHTML = '';
        
        const rootCrumb = document.createElement('div');
        rootCrumb.className = 'breadcrumb';
        rootCrumb.innerText = 'Root';
        rootCrumb.onclick = () => activePane.navigate([]);
        pathBar.appendChild(rootCrumb);

        let buildPath = [];
        for (let i = 0; i < activePane.currentPath.length; i++) {
            const sep = document.createElement('span');
            sep.className = 'breadcrumb-sep';
            sep.innerText = '>';
            pathBar.appendChild(sep);

            buildPath.push(activePane.currentPath[i]);
            const currentBuildPath = [...buildPath];
            
            const crumb = document.createElement('div');
            crumb.className = 'breadcrumb';
            crumb.innerText = activePane.currentPath[i];
            crumb.onclick = () => activePane.navigate(currentBuildPath);
            pathBar.appendChild(crumb);
        }
        
        pathBar.scrollLeft = pathBar.scrollWidth;
    }

    function renderSidebarHighlight() {
        if (!activePane) return;
        sidebarItems.forEach(item => item.classList.remove('active'));
        const pathStr = activePane.currentPath.join(',');
        const matchingItem = Array.from(sidebarItems).find(i => i.dataset.path === pathStr);
        if (matchingItem) {
            matchingItem.classList.add('active');
        }
    }

    function showToast(msg) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function showContextMenu(x, y, pane, itemName, isBackground) {
        contextMenuTarget = { pane, itemName, isBackground };
        
        const openItem = document.getElementById('ctx-open');
        const copyItem = document.getElementById('ctx-copy');
        const pasteItem = document.getElementById('ctx-paste');
        const renameItem = document.getElementById('ctx-rename');
        const deleteItem = document.getElementById('ctx-delete');

        if (isBackground) {
            openItem.style.display = 'none';
            copyItem.style.display = 'none';
            renameItem.style.display = 'none';
            deleteItem.style.display = 'none';
            pasteItem.style.display = 'flex';
            if (!clipboard) {
                pasteItem.classList.add('disabled');
            } else {
                pasteItem.classList.remove('disabled');
            }
        } else {
            openItem.style.display = 'flex';
            copyItem.style.display = 'flex';
            renameItem.style.display = 'flex';
            deleteItem.style.display = 'flex';
            pasteItem.style.display = 'none';
        }

        contextMenu.style.display = 'flex';
        const maxX = window.innerWidth - contextMenu.offsetWidth - 10;
        const maxY = window.innerHeight - contextMenu.offsetHeight - 10;
        contextMenu.style.left = Math.min(x, maxX) + 'px';
        contextMenu.style.top = Math.min(y, maxY) + 'px';
    }

    function hideContextMenu() {
        contextMenu.style.display = 'none';
    }

    document.addEventListener('click', () => hideContextMenu());
    window.addEventListener('blur', () => hideContextMenu());

    document.getElementById('ctx-open').addEventListener('click', () => {
        const { pane, itemName } = contextMenuTarget;
        if (pane && itemName) {
            const node = getNodeByPath(pane.currentPath);
            if (node && node.children && node.children[itemName]) {
                pane.handleItemOpen(itemName, node.children[itemName]);
            }
        }
        hideContextMenu();
    });

    document.getElementById('ctx-copy').addEventListener('click', () => {
        const { pane, itemName } = contextMenuTarget;
        if (pane && itemName) {
            clipboard = { path: [...pane.currentPath], name: itemName };
            showToast(`Copied: ${itemName}`);
            logDolphinAction(`Copied item /${[...pane.currentPath, itemName].join('/')}`);
        }
        hideContextMenu();
    });

    document.getElementById('ctx-paste').addEventListener('click', () => {
        const { pane } = contextMenuTarget;
        if (pane && clipboard) {
            const sourceParent = getNodeByPath(clipboard.path);
            const targetParent = getNodeByPath(pane.currentPath);
            if (sourceParent && sourceParent.children && sourceParent.children[clipboard.name] && targetParent && targetParent.children) {
                let destName = clipboard.name;
                let counter = 1;
                while (targetParent.children[destName]) {
                    const parts = clipboard.name.split('.');
                    if (parts.length > 1) {
                        const ext = parts.pop();
                        destName = `${parts.join('.')}_${counter}.${ext}`;
                    } else {
                        destName = `${clipboard.name}_${counter}`;
                    }
                    counter++;
                }
                targetParent.children[destName] = JSON.parse(JSON.stringify(sourceParent.children[clipboard.name]));
                saveVFS();
                pane.refresh();
                showToast(`Pasted: ${destName}`);
                logDolphinAction(`Pasted item to /${[...pane.currentPath, destName].join('/')}`);
            }
        }
        hideContextMenu();
    });

    document.getElementById('ctx-rename').addEventListener('click', () => {
        const { pane, itemName } = contextMenuTarget;
        if (pane && itemName) {
            const newName = prompt("Enter new name:", itemName);
            if (newName && newName !== itemName) {
                const parentNode = getNodeByPath(pane.currentPath);
                if (parentNode && parentNode.children) {
                    if (parentNode.children[newName]) {
                        showToast("An item with this name already exists.");
                        return;
                    }
                    parentNode.children[newName] = parentNode.children[itemName];
                    delete parentNode.children[itemName];
                    saveVFS();
                    pane.refresh();
                    showToast(`Renamed to ${newName}`);
                    logDolphinAction(`Renamed /${[...pane.currentPath, itemName].join('/')} to ${newName}`);
                }
            }
        }
        hideContextMenu();
    });

    document.getElementById('ctx-delete').addEventListener('click', () => {
        const { pane, itemName } = contextMenuTarget;
        if (pane && itemName) {
            if (confirm(`Are you sure you want to delete '${itemName}'?`)) {
                const parentNode = getNodeByPath(pane.currentPath);
                if (parentNode && parentNode.children && parentNode.children[itemName]) {
                    delete parentNode.children[itemName];
                    saveVFS();
                    pane.selectedItemName = null;
                    pane.refresh();
                    showToast(`Deleted ${itemName}`);
                    logDolphinAction(`Deleted /${[...pane.currentPath, itemName].join('/')}`);
                }
            }
        }
        hideContextMenu();
    });

    btnBack.addEventListener('click', () => { if (activePane) activePane.goBack(); });
    btnForward.addEventListener('click', () => { if (activePane) activePane.goForward(); });
    btnUp.addEventListener('click', () => { if (activePane) activePane.goUp(); });
    btnRefresh.addEventListener('click', () => { if (activePane) activePane.refresh(); });

    btnNewFolder.addEventListener('click', () => {
        if (!activePane) return;
        const folderName = prompt("Enter new folder name:");
        if (!folderName) return;
        const parentNode = getNodeByPath(activePane.currentPath);
        if (parentNode && parentNode.children) {
            if (parentNode.children[folderName]) {
                showToast("Item already exists!");
                return;
            }
            parentNode.children[folderName] = { type: 'dir', description: 'User created directory', children: {} };
            saveVFS();
            logDolphinAction(`Created directory /${[...activePane.currentPath, folderName].join('/')}`);
            activePane.refresh();
            showToast(`Created folder: ${folderName}`);
        }
    });

    btnNewFile.addEventListener('click', () => {
        if (!activePane) return;
        const fileName = prompt("Enter new file name:");
        if (!fileName) return;
        const parentNode = getNodeByPath(activePane.currentPath);
        if (parentNode && parentNode.children) {
            if (parentNode.children[fileName]) {
                showToast("Item already exists!");
                return;
            }
            parentNode.children[fileName] = { type: 'file', description: 'User created file', content: '' };
            saveVFS();
            logDolphinAction(`Created file /${[...activePane.currentPath, fileName].join('/')}`);
            activePane.refresh();
            showToast(`Created file: ${fileName}`);
        }
    });

    btnDelete.addEventListener('click', () => {
        if (!activePane || !activePane.selectedItemName) {
            showToast("No item selected for deletion.");
            return;
        }
        const itemName = activePane.selectedItemName;
        if (confirm(`Are you sure you want to delete '${itemName}'?`)) {
            const parentNode = getNodeByPath(activePane.currentPath);
            if (parentNode && parentNode.children && parentNode.children[itemName]) {
                delete parentNode.children[itemName];
                saveVFS();
                logDolphinAction(`Deleted /${[...activePane.currentPath, itemName].join('/')}`);
                activePane.selectedItemName = null;
                activePane.refresh();
                showToast(`Deleted ${itemName}`);
            }
        }
    });

    btnSplitView.addEventListener('click', () => {
        isSplitView = !isSplitView;
        if (isSplitView) {
            if (panes.length === 1) {
                const dividerEl = document.createElement('div');
                dividerEl.className = 'split-divider';
                
                let isResizing = false;
                dividerEl.addEventListener('mousedown', (e) => {
                    isResizing = true;
                    e.preventDefault();
                });

                window.addEventListener('mousemove', (e) => {
                    if (!isResizing || panes.length < 2) return;
                    const containerRect = splitContainer.getBoundingClientRect();
                    const offsetX = e.clientX - containerRect.left;
                    const percent = Math.max(20, Math.min(80, (offsetX / containerRect.width) * 100));
                    panes[0].container.style.flex = `0 0 ${percent}%`;
                    panes[1].container.style.flex = `0 0 ${100 - percent}%`;
                });

                window.addEventListener('mouseup', () => {
                    isResizing = false;
                });

                const paneEl2 = document.createElement('div');
                paneEl2.className = 'pane';
                const pane2 = new DolphinPane(paneEl2, activePane.currentPath);
                
                panes[0].container.style.flex = '1 1 50%';
                paneEl2.style.flex = '1 1 50%';

                splitContainer.appendChild(panes[0].container);
                splitContainer.appendChild(dividerEl);
                splitContainer.appendChild(paneEl2);
                panes.push(pane2);
            }
            showToast("Split View Enabled");
            logDolphinAction("Enabled split view mode");
        } else {
            if (panes.length > 1) {
                splitContainer.querySelector('.split-divider')?.remove();
                panes[1].container.remove();
                panes[0].container.style.flex = '1 1 100%';
                panes = [panes[0]];
                setActivePane(panes[0]);
            }
            showToast("Split View Disabled");
            logDolphinAction("Disabled split view mode");
        }
    });

    function openFileEditor(name, fileNode) {
        currentEditingFile = { name: name, node: fileNode };
        editorTitle.innerText = `Editing: ${name}`;
        editorContent.value = fileNode.content || '';
        
        const isBin = name.endsWith('.bin') || name.endsWith('.exe');
        if (isBin) {
            editorStatus.innerText = "Warning: Modifying binary files may corrupt them.";
            editorStatus.style.color = "var(--warning-color)";
        } else {
            editorStatus.innerText = "";
            editorStatus.style.color = "var(--text-muted)";
        }

        editorModal.style.display = 'flex';
        logDolphinAction(`Opened file editor for: ${name}`);
        setTimeout(() => editorContent.focus(), 50);
    }

    function closeFileEditor() {
        editorModal.style.display = 'none';
        currentEditingFile = null;
    }

    function saveFile() {
        if (currentEditingFile && currentEditingFile.node) {
            currentEditingFile.node.content = editorContent.value;
            saveVFS();
            logDolphinAction(`Saved file: ${currentEditingFile.name}`);
            showToast("File saved successfully");
            closeFileEditor();
            if (activePane) activePane.refresh();
        }
    }

    btnClose.addEventListener('click', closeFileEditor);
    btnCancel.addEventListener('click', closeFileEditor);
    btnSave.addEventListener('click', saveFile);

    editorModal.addEventListener('click', (e) => {
        if (e.target === editorModal) closeFileEditor();
    });

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!activePane) return;
            const pathStr = item.dataset.path;
            const newPath = pathStr ? pathStr.split(',') : [];
            activePane.navigate(newPath);
        });
    });

    window.addEventListener('keydown', (e) => {
        if (editorModal.style.display === 'flex') {
            if (e.ctrlKey && e.key.toLowerCase() === 's') {
                e.preventDefault();
                saveFile();
            }
            if (e.key === 'Escape') {
                closeFileEditor();
            }
        } else {
            if (e.altKey && e.key === 'ArrowLeft' && activePane) activePane.goBack();
            if (e.altKey && e.key === 'ArrowRight' && activePane) activePane.goForward();
            if (e.altKey && e.key === 'ArrowUp' && activePane) activePane.goUp();
        }
    });

    loadVFS();
    logDolphinAction("KDE Dolphin File Manager initialized with context menus.");

    const paneEl1 = document.createElement('div');
    paneEl1.className = 'pane active-pane';
    paneEl1.style.flex = '1 1 100%';
    splitContainer.appendChild(paneEl1);
    const pane1 = new DolphinPane(paneEl1, ['home', 'user']);
    panes.push(pane1);
    setActivePane(pane1);

})();