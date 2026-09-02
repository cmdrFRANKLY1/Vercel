(function() {
    "use strict";

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        /* ===== GENERIC THEMED RESET & GLOBAL ===== */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }
        
        input, textarea, .editor-textarea, .editor-textarea * {
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
            --code-font: 'Courier New', Courier, monospace;
            --line-num-bg: #1f2225;
            --line-num-color: #656c76;
            --line-num-active: #eff0f1;
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

        #textEditor-app {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: var(--bg-color);
        }

        /* Menu Bar */
        #menu-bar {
            height: 28px;
            background-color: var(--panel-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 8px;
            gap: 4px;
            flex-shrink: 0;
        }

        .menu-item {
            padding: 4px 8px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
            color: var(--text-color);
            transition: background 0.15s;
        }

        .menu-item:hover {
            background-color: var(--hover-bg);
            color: var(--accent-color);
        }

        /* Toolbar */
        #toolbar {
            height: 40px;
            background-color: var(--panel-bg);
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
            width: 30px;
            height: 30px;
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
            height: 20px;
            background-color: var(--border-color);
            margin: 0 4px;
            flex-shrink: 0;
        }

        /* Main Workspace Layout */
        #workspace {
            display: flex;
            flex-grow: 1;
            overflow: hidden;
        }

        /* Sidebar / File Tree */
        #sidebar {
            width: 240px;
            background-color: var(--panel-bg);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            flex-shrink: 0;
        }

        .sidebar-header {
            padding: 8px 12px;
            font-size: 11px;
            text-transform: uppercase;
            color: var(--text-muted);
            font-weight: bold;
            border-bottom: 1px solid var(--border-color);
            letter-spacing: 0.05em;
        }

        .sidebar-tree {
            flex-grow: 1;
            overflow-y: auto;
            padding: 6px;
        }

        .tree-node {
            display: flex;
            align-items: center;
            padding: 5px 8px;
            border-radius: 4px;
            cursor: pointer;
            gap: 8px;
            font-size: 12px;
            color: var(--text-color);
            transition: background 0.15s;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .tree-node:hover {
            background-color: var(--hover-bg);
        }

        .tree-node.selected {
            background-color: var(--selected-bg);
            color: var(--accent-color);
        }

        .tree-node svg {
            width: 14px;
            height: 14px;
            stroke: currentColor;
            stroke-width: 2;
            fill: none;
            flex-shrink: 0;
        }

        .tree-children {
            padding-left: 14px;
            display: none;
        }

        .tree-node.open + .tree-children {
            display: block;
        }

        /* Editor Area Container */
        #editor-container {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            background-color: var(--bg-color);
        }

        /* Tabs Bar */
        #tabs-bar {
            height: 34px;
            background-color: var(--panel-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 4px;
            gap: 2px;
            overflow-x: auto;
            flex-shrink: 0;
        }

        .editor-tab {
            display: flex;
            align-items: center;
            height: 28px;
            padding: 0 12px;
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-bottom: none;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            gap: 8px;
            cursor: pointer;
            font-size: 12px;
            color: var(--text-muted);
            transition: all 0.15s;
            max-width: 180px;
        }

        .editor-tab.active {
            background-color: var(--bg-color);
            color: var(--text-color);
            border-color: var(--accent-color);
            border-top: 2px solid var(--accent-color);
        }

        .editor-tab:hover {
            color: var(--text-color);
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

        /* Editor Pane with Line Numbers */
        .editor-pane-host {
            flex-grow: 1;
            display: flex;
            position: relative;
            overflow: hidden;
        }

        .line-numbers {
            width: 48px;
            background-color: var(--line-num-bg);
            color: var(--line-num-color);
            font-family: var(--code-font);
            font-size: 12px;
            padding: 12px 6px 12px 0;
            text-align: right;
            user-select: none;
            overflow: hidden;
            border-right: 1px solid var(--border-color);
            line-height: 1.5;
            flex-shrink: 0;
        }

        .editor-textarea {
            flex-grow: 1;
            background-color: var(--bg-color);
            color: var(--text-color);
            border: none;
            padding: 12px;
            font-family: var(--code-font);
            font-size: 13px;
            line-height: 1.5;
            resize: none;
            outline: none;
            white-space: pre;
            overflow: wrap;
            tab-size: 4;
            overflow-x: auto;
        }

        /* Status Bar */
        #status-bar {
            height: 24px;
            background-color: var(--panel-bg);
            border-top: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            font-size: 11px;
            color: var(--text-muted);
            flex-shrink: 0;
        }

        .status-group {
            display: flex;
            align-items: center;
            gap: 16px;
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
            min-width: 160px;
            padding: 4px 0;
        }

        .context-menu-item {
            padding: 7px 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 12px;
            color: var(--text-color);
            transition: background 0.15s;
        }

        .context-menu-item:hover {
            background-color: var(--accent-color);
            color: #000;
        }

        .context-menu-sep {
            height: 1px;
            background-color: var(--border-color);
            margin: 4px 0;
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

    // Apply Theme Colors from parent environment if present
    function applyColors() {
        const themeColors = window.themeColors || window.parent?.themeColors || {
            'bg': '#1a1b1e',
            'panel': '#232629',
            'accent': '#3daee9',
            'text': '#eff0f1',
            'border': '#31363b',
        };

        const root = document.documentElement;
        root.style.setProperty('--bg-color', themeColors['bg']);
        root.style.setProperty('--panel-bg', themeColors['panel']);
        root.style.setProperty('--text-color', themeColors['text']);
        root.style.setProperty('--border-color', themeColors['border']);
        root.style.setProperty('--accent-color', themeColors['accent']);
    }
    applyColors();

    // Render UI Skeleton
    document.body.innerHTML = `
    <div id="textEditor-app">
        <!-- Menu Bar -->
        <div id="menu-bar">
            <div class="menu-item" id="menu-file">File</div>
            <div class="menu-item" id="menu-edit">Edit</div>
            <div class="menu-item" id="menu-view">View</div>
            <div class="menu-item" id="menu-help">Help</div>
        </div>

        <!-- Toolbar -->
        <div id="toolbar">
            <button class="tool-btn" id="btn-new" title="New File (Ctrl+N)">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
            </button>
            <button class="tool-btn" id="btn-save" title="Save File (Ctrl+S)">
                <svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            </button>
            <div class="toolbar-separator"></div>
            <button class="tool-btn" id="btn-undo" title="Undo">
                <svg viewBox="0 0 24 24"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
            </button>
            <button class="tool-btn" id="btn-redo" title="Redo">
                <svg viewBox="0 0 24 24"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path></svg>
            </button>
            <div class="toolbar-separator"></div>
            <button class="tool-btn" id="btn-refresh-tree" title="Refresh Filesystem Tree">
                <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </button>
        </div>

        <!-- Main Workspace -->
        <div id="workspace">
            <!-- Sidebar File Browser -->
            <div id="sidebar">
                <div class="sidebar-header">Documents</div>
                <div class="sidebar-tree" id="file-tree"></div>
            </div>

            <!-- Editor Area -->
            <div id="editor-container">
                <div id="tabs-bar"></div>
                <div class="editor-pane-host" id="editor-pane-host">
                    <div class="line-numbers" id="line-numbers">1</div>
                    <textarea class="editor-textarea" id="editor-textarea" spellcheck="false" placeholder="Select a file from the sidebar or create a new one..."></textarea>
                </div>
            </div>
        </div>

        <!-- Status Bar -->
        <div id="status-bar">
            <div class="status-group">
                <span id="status-file-info">No file open</span>
                <span id="status-modified" style="color:var(--accent-color); display:none;">[Modified]</span>
            </div>
            <div class="status-group">
                <span id="status-cursor">Ln 1, Col 1</span>
                <span id="status-encoding">UTF-8</span>
                <span id="status-mode">Plain Text</span>
            </div>
        </div>
    </div>

    <!-- Context Menu -->
    <div id="context-menu" class="context-menu">
        <div class="context-menu-item" id="ctx-open">Open in Editor</div>
        <div class="context-menu-item" id="ctx-new-file">New File Here</div>
        <div class="context-menu-item" id="ctx-new-folder">New Folder Here</div>
        <div class="context-menu-sep"></div>
        <div class="context-menu-item" id="ctx-rename">Rename</div>
        <div class="context-menu-item" id="ctx-delete">Delete</div>
    </div>

    <!-- Notification Toast -->
    <div id="toast">Saved successfully!</div>
    `;

    // State variables
    let vfs = null;
    let openTabs = [];
    let activeTab = null;
    let contextMenuTargetPath = null;
    let contextMenuIsFolder = false;

    // DOM Elements
    const fileTreeEl = document.getElementById('file-tree');
    const tabsBarEl = document.getElementById('tabs-bar');
    const textareaEl = document.getElementById('editor-textarea');
    const lineNumbersEl = document.getElementById('line-numbers');
    const statusFileInfo = document.getElementById('status-file-info');
    const statusModified = document.getElementById('status-modified');
    const statusCursor = document.getElementById('status-cursor');
    const statusMode = document.getElementById('status-mode');
    const contextMenu = document.getElementById('context-menu');
    const toast = document.getElementById('toast');

    // SVG Icons
    const svgFolder = `<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
    const svgFile = `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`;

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
                                    'readme.txt': { type: 'file', content: 'Welcome to the Text Editor.' }
                                }},
                                '.bashrc': { type: 'file', content: '# alias ls="ls -la"' }
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

    function logAction(message) {
        try {
            if (!vfs) loadVFS();
            const logPath = ['home', 'user', 'Documents', 'Logs'];
            const logFileName = 'logEditor.txt';

            let node = vfs;
            for (const p of logPath) {
                if (!node.children[p]) {
                    node.children[p] = { type: 'dir', description: 'Auto-created logs directory', children: {} };
                }
                node = node.children[p];
            }

            if (!node.children[logFileName]) {
                node.children[logFileName] = { type: 'file', description: 'Editor activity log', content: '' };
            }

            const timestamp = new Date().toISOString();
            node.children[logFileName].content += `[${timestamp}] ${message}\n`;
            saveVFS();
        } catch (err) {
            console.error("Failed to log action:", err);
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

    function showToast(msg) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Render File Tree Sidebar
    function renderFileTree() {
        loadVFS();
        fileTreeEl.innerHTML = '';
        renderSubTree(vfs, [], fileTreeEl);
    }

    function renderSubTree(parentNode, parentPathArray, containerEl) {
        if (!parentNode || !parentNode.children) return;

        const keys = Object.keys(parentNode.children).sort((a, b) => {
            const nodeA = parentNode.children[a];
            const nodeB = parentNode.children[b];
            if (nodeA.type === nodeB.type) return a.localeCompare(b);
            return nodeA.type === 'dir' ? -1 : 1;
        });

        keys.forEach(key => {
            const childNode = parentNode.children[key];
            const isDir = childNode.type === 'dir';
            const currentPath = [...parentPathArray, key];

            const nodeEl = document.createElement('div');
            nodeEl.className = 'tree-node';
            if (isDir) nodeEl.classList.add('open');
            
            if (activeTab && JSON.stringify(activeTab.pathArray) === JSON.stringify(currentPath)) {
                nodeEl.classList.add('selected');
            }

            nodeEl.innerHTML = `${isDir ? svgFolder : svgFile}<span>${key}</span>`;

            nodeEl.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isDir) {
                    nodeEl.classList.toggle('open');
                } else {
                    openFile(currentPath, key, childNode);
                }
            });

            nodeEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showContextMenu(e.clientX, e.clientY, currentPath, isDir);
            });

            containerEl.appendChild(nodeEl);

            if (isDir) {
                const childrenContainer = document.createElement('div');
                childrenContainer.className = 'tree-children';
                containerEl.appendChild(childrenContainer);
                renderSubTree(childNode, currentPath, childrenContainer);
            }
        });
    }

    // Open File in Tab
    function openFile(pathArray, name, fileNode) {
        let existing = openTabs.find(t => JSON.stringify(t.pathArray) === JSON.stringify(pathArray));
        if (existing) {
            switchTab(existing);
            return;
        }

        const newTab = {
            pathArray: pathArray,
            name: name,
            content: fileNode.content || '',
            originalContent: fileNode.content || '',
            fileNode: fileNode
        };

        openTabs.push(newTab);
        switchTab(newTab);
        renderFileTree();
        logAction(`Opened file: /${pathArray.join('/')}`);
    }

    function switchTab(tab) {
        if (activeTab && activeTab !== tab) {
            activeTab.content = textareaEl.value;
        }

        activeTab = tab;
        textareaEl.value = tab.content;
        textareaEl.disabled = false;
        updateLineNumbers();
        updateTabsUI();
        updateStatusInfo();
        renderFileTree();
        textareaEl.focus();
    }

    function closeTab(tab) {
        if (tab.content !== tab.originalContent) {
            if (!confirm(`File '${tab.name}' has unsaved changes. Close without saving?`)) {
                return;
            }
        }

        const idx = openTabs.indexOf(tab);
        if (idx !== -1) {
            openTabs.splice(idx, 1);
        }

        if (openTabs.length === 0) {
            activeTab = null;
            textareaEl.value = '';
            textareaEl.disabled = true;
            lineNumbersEl.innerText = '1';
            statusFileInfo.innerText = 'No file open';
            statusModified.style.display = 'none';
        } else {
            const nextTab = openTabs[Math.max(0, idx - 1)];
            switchTab(nextTab);
        }
        updateTabsUI();
        renderFileTree();
    }

    function updateTabsUI() {
        tabsBarEl.innerHTML = '';
        openTabs.forEach(tab => {
            const isModified = tab.content !== tab.originalContent;
            const tabEl = document.createElement('div');
            tabEl.className = 'editor-tab';
            if (tab === activeTab) tabEl.classList.add('active');

            tabEl.innerHTML = `
                <span>${tab.name}${isModified ? ' *' : ''}</span>
                <button class="tab-close" title="Close">&times;</button>
            `;

            tabEl.addEventListener('click', () => switchTab(tab));
            tabEl.querySelector('.tab-close').addEventListener('click', (e) => {
                e.stopPropagation();
                closeTab(tab);
            });

            tabsBarEl.appendChild(tabEl);
        });
    }

    function updateLineNumbers() {
        const lines = textareaEl.value.split('\n').length;
        let nums = '';
        for (let i = 1; i <= lines; i++) {
            nums += i + '\n';
        }
        lineNumbersEl.innerText = nums;
    }

    function updateStatusInfo() {
        if (!activeTab) {
            statusFileInfo.innerText = 'No file open';
            statusModified.style.display = 'none';
            return;
        }

        statusFileInfo.innerText = `/${activeTab.pathArray.join('/')}`;
        const isModified = activeTab.content !== activeTab.originalContent;
        statusModified.style.display = isModified ? 'inline' : 'none';

        const name = activeTab.name.toLowerCase();
        if (name.endsWith('.js')) statusMode.innerText = 'JavaScript';
        else if (name.endsWith('.html')) statusMode.innerText = 'HTML';
        else if (name.endsWith('.css')) statusMode.innerText = 'CSS';
        else if (name.endsWith('.json')) statusMode.innerText = 'JSON';
        else if (name.endsWith('.py')) statusMode.innerText = 'Python';
        else if (name.endsWith('.txt')) statusMode.innerText = 'Plain Text';
        else statusMode.innerText = 'Source Code';
    }

    function updateCursorPosition() {
        if (!activeTab) return;
        const text = textareaEl.value;
        const pos = textareaEl.selectionStart;
        const lines = text.substr(0, pos).split('\n');
        const ln = lines.length;
        const col = lines[lines.length - 1].length + 1;
        statusCursor.innerText = `Ln ${ln}, Col ${col}`;
    }

    function saveCurrentFile() {
        if (!activeTab) return;
        activeTab.content = textareaEl.value;
        activeTab.originalContent = activeTab.content;
        activeTab.fileNode.content = activeTab.content;
        saveVFS();
        updateTabsUI();
        updateStatusInfo();
        showToast(`Saved '${activeTab.name}'`);
        logAction(`Saved file: /${activeTab.pathArray.join('/')}`);
    }

    // Context Menu Handling
    function showContextMenu(x, y, pathArray, isFolder) {
        contextMenuTargetPath = pathArray;
        contextMenuIsFolder = isFolder;

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

    document.getElementById('ctx-open').addEventListener('click', () => {
        if (contextMenuTargetPath && !contextMenuIsFolder) {
            const node = getNodeByPath(contextMenuTargetPath);
            if (node) {
                openFile(contextMenuTargetPath, contextMenuTargetPath[contextMenuTargetPath.length - 1], node);
            }
        }
        hideContextMenu();
    });

    document.getElementById('ctx-new-file').addEventListener('click', () => {
        if (!contextMenuTargetPath) return;
        const targetDirArray = contextMenuIsFolder ? contextMenuTargetPath : contextMenuTargetPath.slice(0, -1);
        const parentNode = getNodeByPath(targetDirArray);
        if (parentNode && parentNode.children) {
            const fileName = prompt("Enter new file name:");
            if (fileName) {
                if (parentNode.children[fileName]) {
                    showToast("Item already exists!");
                    return;
                }
                parentNode.children[fileName] = { type: 'file', description: 'User created file', content: '' };
                saveVFS();
                renderFileTree();
                showToast(`Created file: ${fileName}`);
                logAction(`Created file: /${[...targetDirArray, fileName].join('/')}`);
            }
        }
        hideContextMenu();
    });

    document.getElementById('ctx-new-folder').addEventListener('click', () => {
        if (!contextMenuTargetPath) return;
        const targetDirArray = contextMenuIsFolder ? contextMenuTargetPath : contextMenuTargetPath.slice(0, -1);
        const parentNode = getNodeByPath(targetDirArray);
        if (parentNode && parentNode.children) {
            const folderName = prompt("Enter new folder name:");
            if (folderName) {
                if (parentNode.children[folderName]) {
                    showToast("Item already exists!");
                    return;
                }
                parentNode.children[folderName] = { type: 'dir', description: 'User created folder', children: {} };
                saveVFS();
                renderFileTree();
                showToast(`Created folder: ${folderName}`);
                logAction(`Created folder: /${[...targetDirArray, folderName].join('/')}`);
            }
        }
        hideContextMenu();
    });

    document.getElementById('ctx-rename').addEventListener('click', () => {
        if (!contextMenuTargetPath || contextMenuTargetPath.length === 0) return;
        const itemName = contextMenuTargetPath[contextMenuTargetPath.length - 1];
        const parentPathArray = contextMenuTargetPath.slice(0, -1);
        const parentNode = getNodeByPath(parentPathArray);

        if (parentNode && parentNode.children) {
            const newName = prompt("Enter new name:", itemName);
            if (newName && newName !== itemName) {
                if (parentNode.children[newName]) {
                    showToast("An item with this name already exists.");
                    return;
                }
                parentNode.children[newName] = parentNode.children[itemName];
                delete parentNode.children[itemName];
                saveVFS();
                renderFileTree();
                showToast(`Renamed to ${newName}`);
                logAction(`Renamed /${contextMenuTargetPath.join('/')} to ${newName}`);
            }
        }
        hideContextMenu();
    });

    document.getElementById('ctx-delete').addEventListener('click', () => {
        if (!contextMenuTargetPath || contextMenuTargetPath.length === 0) return;
        const itemName = contextMenuTargetPath[contextMenuTargetPath.length - 1];
        const parentPathArray = contextMenuTargetPath.slice(0, -1);
        const parentNode = getNodeByPath(parentPathArray);

        if (parentNode && parentNode.children) {
            if (confirm(`Are you sure you want to delete '${itemName}'?`)) {
                delete parentNode.children[itemName];
                saveVFS();
                renderFileTree();
                showToast(`Deleted ${itemName}`);
                logAction(`Deleted /${contextMenuTargetPath.join('/')}`);
            }
        }
        hideContextMenu();
    });

    // Toolbar Event Listeners
    document.getElementById('btn-new').addEventListener('click', () => {
        const parentNode = getNodeByPath(['home', 'user', 'Documents']);
        if (parentNode) {
            const fileName = prompt("Enter new file name:");
            if (fileName) {
                parentNode.children[fileName] = { type: 'file', description: 'User created file', content: '' };
                saveVFS();
                renderFileTree();
                openFile(['home', 'user', 'Documents', fileName], fileName, parentNode.children[fileName]);
                showToast(`Created file: ${fileName}`);
            }
        }
    });

    document.getElementById('btn-save').addEventListener('click', () => saveCurrentFile());
    document.getElementById('btn-refresh-tree').addEventListener('click', () => {
        renderFileTree();
        showToast("File tree refreshed");
    });

    // Textarea sync events
    textareaEl.addEventListener('input', () => {
        if (activeTab) {
            activeTab.content = textareaEl.value;
            updateLineNumbers();
            updateTabsUI();
            updateStatusInfo();
        }
    });

    textareaEl.addEventListener('scroll', () => {
        lineNumbersEl.scrollTop = textareaEl.scrollTop;
    });

    textareaEl.addEventListener('click', updateCursorPosition);
    textareaEl.addEventListener('keyup', updateCursorPosition);

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            saveCurrentFile();
        }
        if (e.ctrlKey && e.key.toLowerCase() === 'n') {
            e.preventDefault();
            document.getElementById('btn-new').click();
        }
    });

    // Initialize Editor
    loadVFS();
    renderFileTree();
    logAction("Text Editor initialized.");

})();