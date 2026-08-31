window.packagesRegistry['mc'] = {
    name: 'Midnight Commander (sTerminal Edition)',
    description: 'Classic TUI visual dual-pane file manager',
    commandInfo: {
        mc: "what is this command?\nmc\n\nwhat is it used for?\nLaunches a classic TUI-style dual-pane file manager. Navigate with arrows, switch panes with Tab, and use the bottom bar actions."
    },
    commands: {
        mc: async function(args) {
            // 'this' refers to the Terminal instance calling the command

            this.promptSpan.style.display = 'none';
            this.cmdInput.style.display = 'none';
            this.cmdSuggestion.style.display = 'none';

            const originalOverflow = this.el.style.overflow;
            this.el.style.overflow = 'hidden';

            const mcContainer = document.createElement('div');
            mcContainer.style.display = 'flex';
            mcContainer.style.flexDirection = 'column';
            
            // Utilizing ColorAPI via injected CSS variables for dynamic theming
            mcContainer.style.backgroundColor = 'var(--bg-color)';
            mcContainer.style.color = 'var(--text-color)';
            mcContainer.style.fontFamily = 'var(--font-family)';
            mcContainer.style.fontSize = 'var(--font-size)';
            mcContainer.style.lineHeight = '1.2';
            
            mcContainer.style.outline = 'none';
            mcContainer.style.boxSizing = 'border-box';
            
            // Fullscreen positioning inside the terminal tab
            mcContainer.style.position = 'absolute';
            mcContainer.style.top = '0';
            mcContainer.style.left = '0';
            mcContainer.style.width = '100%';
            mcContainer.style.height = '100%';
            mcContainer.style.zIndex = '100';
            mcContainer.style.padding = '4px'; // Outer margin in TUI
            mcContainer.tabIndex = 0; // Make focusable for key events

            // Append to terminal element (fullscreen override)
            this.el.appendChild(mcContainer);

            let state = {
                activePane: 'left',
                left: { path: [...this.currentPath], index: 0, items: [], scrollPos: 0 },
                right: { path: [...this.currentPath], index: 0, items: [], scrollPos: 0 },
                isRunning: true
            };

            const formatSize = (bytes) => {
                if (bytes === '<DIR>' || bytes === '<UP--DIR>') return bytes;
                if (bytes < 1024) return bytes + ' B';
                if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' K';
                return (bytes / (1024 * 1024)).toFixed(1) + ' M';
            };

            const getDirContents = (pathArr) => {
                const node = this.getNodeByPathArray(pathArr);
                if (!node || node.type !== 'dir') return [];
                let items = [];
                if (pathArr.length > 0) items.push({ name: '/..', type: 'dir', size: '<UP--DIR>', rawSize: -1 });
                
                Object.keys(node.children || {}).forEach(k => {
                    const child = node.children[k];
                    let rawSize = child.type === 'dir' ? 0 : (child.content ? child.content.length : 0);
                    items.push({ 
                        name: (child.type === 'dir' ? '/' : '') + k, 
                        type: child.type,
                        size: child.type === 'dir' ? '<DIR>' : formatSize(rawSize),
                        rawSize: rawSize,
                        node: child
                    });
                });
                
                return items.sort((a, b) => {
                    if (a.name === '/..') return -1;
                    if (b.name === '/..') return 1;
                    if (a.type === 'dir' && b.type !== 'dir') return -1;
                    if (a.type !== 'dir' && b.type === 'dir') return 1;
                    return a.name.localeCompare(b.name);
                });
            };

            const refreshData = () => {
                state.left.items = getDirContents(state.left.path);
                state.right.items = getDirContents(state.right.path);
                if (state.left.index >= state.left.items.length) state.left.index = Math.max(0, state.left.items.length - 1);
                if (state.right.index >= state.right.items.length) state.right.index = Math.max(0, state.right.items.length - 1);
            };

            // Classic TUI Top Menu Bar (Inverted Colors)
            const menuBar = document.createElement('div');
            menuBar.style.display = 'flex';
            menuBar.style.backgroundColor = 'var(--text-color)';
            menuBar.style.color = 'var(--bg-color)';
            menuBar.style.padding = '0 10px';
            menuBar.style.gap = '20px';
            menuBar.style.fontWeight = 'bold';
            menuBar.style.userSelect = 'none';
            // Classic MC underline hotkeys
            menuBar.innerHTML = '<span><span style="text-decoration:underline;">L</span>eft</span>' + 
                                '<span><span style="text-decoration:underline;">F</span>ile</span>' + 
                                '<span><span style="text-decoration:underline;">C</span>ommand</span>' + 
                                '<span><span style="text-decoration:underline;">O</span>ptions</span>' + 
                                '<span><span style="text-decoration:underline;">R</span>ight</span>';
            mcContainer.appendChild(menuBar);

            // Panes Container
            const panesContainer = document.createElement('div');
            panesContainer.style.display = 'flex';
            panesContainer.style.flex = '1';
            panesContainer.style.gap = '4px';
            panesContainer.style.padding = '4px 2px';
            panesContainer.style.overflow = 'hidden';
            mcContainer.appendChild(panesContainer);

            const createPane = (side) => {
                const pane = document.createElement('div');
                pane.style.flex = '1';
                pane.style.display = 'flex';
                pane.style.flexDirection = 'column';
                // Double border for that sweet classic DOS/TUI look
                pane.style.border = '3px double var(--modal-border-start)'; 
                pane.style.position = 'relative';
                pane.style.overflow = 'hidden';
                pane.style.boxSizing = 'border-box';
                
                // Centered TUI Title cutting through the top border
                const header = document.createElement('div');
                header.style.position = 'absolute';
                header.style.top = '-0.6em';
                header.style.left = '50%';
                header.style.transform = 'translateX(-50%)';
                header.style.backgroundColor = 'var(--bg-color)';
                header.style.padding = '0 8px';
                header.style.fontWeight = 'bold';
                header.style.whiteSpace = 'nowrap';
                header.style.zIndex = '2';
                
                // Column Headers
                const cols = document.createElement('div');
                cols.style.display = 'flex';
                cols.style.borderBottom = '1px solid var(--modal-border-start)';
                cols.style.padding = '2px 5px';
                cols.style.marginTop = '8px'; // Push down past the absolute title
                cols.style.color = 'var(--hint-color)';
                cols.innerHTML = '<span style="flex:1">Name</span><span style="width:70px; text-align:right;">Size</span>';
                
                const list = document.createElement('div');
                list.style.flex = '1';
                list.style.overflowY = 'auto';
                list.style.padding = '2px 0';
                list.style.outline = 'none';
                
                // Custom scrollbar hiding for cleaner TUI look
                list.style.scrollbarWidth = 'none'; // Firefox
                list.className = 'mc-pane-list';

                pane.appendChild(header);
                pane.appendChild(cols);
                pane.appendChild(list);
                
                return { container: pane, header, list };
            };

            const leftPane = createPane('left');
            const rightPane = createPane('right');
            panesContainer.appendChild(leftPane.container);
            panesContainer.appendChild(rightPane.container);

            // Fake Terminal Prompt above bottom bar (Classic MC feature)
            const promptBar = document.createElement('div');
            promptBar.style.display = 'flex';
            promptBar.style.padding = '2px 5px';
            promptBar.style.color = 'var(--text-color)';
            promptBar.innerHTML = `<span style="color:var(--prompt-user);font-weight:bold;">${this.promptUserSpan ? this.promptUserSpan.innerText : 'user'}</span>:<span style="color:var(--prompt-path);font-weight:bold;">~</span>$ <span style="animation: blink 1s step-end infinite;">_</span>`;
            mcContainer.appendChild(promptBar);

            // Bottom Command Bar
            const bottomBar = document.createElement('div');
            bottomBar.style.display = 'flex';
            bottomBar.style.backgroundColor = 'var(--bg-color)';
            bottomBar.style.padding = '0';
            bottomBar.style.gap = '2px';
            bottomBar.style.flexWrap = 'wrap';
            
            const actions = [
                { key: '1', name: 'Help', code: 'F1' },
                { key: '2', name: 'Menu', code: 'F2' },
                { key: '3', name: 'View', code: 'F3' },
                { key: '4', name: 'Edit', code: 'F4' },
                { key: '5', name: 'Copy', code: 'F5' },
                { key: '6', name: 'RenMov', code: 'F6' },
                { key: '7', name: 'Mkdir', code: 'F7' },
                { key: '8', name: 'Delete', code: 'F8' },
                { key: '9', name: 'PullDn', code: 'F9' },
                { key: '10', name: 'Quit', code: 'F10' }
            ];

            actions.forEach(act => {
                const btn = document.createElement('div');
                btn.style.flex = '1';
                btn.style.textAlign = 'center';
                btn.style.cursor = 'pointer';
                btn.style.userSelect = 'none';
                btn.style.padding = '1px 2px';
                btn.style.minWidth = '40px';
                btn.style.whiteSpace = 'nowrap';
                
                // Classic MC formatting: Number is inverted, text is normal
                btn.innerHTML = `<span style="background-color: var(--text-color); color: var(--bg-color); padding: 0 4px; display: inline-block;">${act.key}</span>${act.name}`;
                
                btn.onmouseover = () => { btn.style.backgroundColor = 'var(--text-color)'; btn.style.color = 'var(--bg-color)'; };
                btn.onmouseout = () => { btn.style.backgroundColor = 'transparent'; btn.style.color = 'var(--text-color)'; };
                btn.onclick = () => handleAction(act.code);
                bottomBar.appendChild(btn);
            });
            mcContainer.appendChild(bottomBar);

            const renderPane = (side) => {
                const pState = state[side];
                const pUI = side === 'left' ? leftPane : rightPane;
                const isActive = state.activePane === side;

                // Format Path & Title
                let pathStr = '/' + pState.path.join('/');
                if (pathStr === '') pathStr = '/';
                pUI.header.innerText = ` .< ${pathStr} >. `;
                
                // Highlight active panel border
                pUI.container.style.border = isActive ? '3px double var(--text-color)' : '3px double var(--modal-border-start)';
                pUI.header.style.color = isActive ? 'var(--text-color)' : 'var(--hint-color)';

                // Render List
                pUI.list.innerHTML = '';
                pState.items.forEach((item, idx) => {
                    const row = document.createElement('div');
                    row.style.display = 'flex';
                    row.style.justifyContent = 'space-between';
                    row.style.padding = '0 5px';
                    row.style.cursor = 'pointer';
                    row.style.whiteSpace = 'pre';
                    row.style.height = '1.2em'; // Fixed height for grid-like feel
                    
                    if (idx === pState.index) {
                        if (isActive) {
                            // Active selection: Inverted colors
                            row.style.backgroundColor = 'var(--text-color)'; 
                            row.style.color = 'var(--bg-color)';
                        } else {
                            // Inactive selection: subtle highlight
                            row.style.border = '1px dashed var(--modal-border-start)';
                            row.style.boxSizing = 'border-box';
                            row.style.padding = '0 4px'; // adjust for border
                        }
                    } else {
                        row.style.padding = '0 5px';
                    }

                    const nameSpan = document.createElement('span');
                    nameSpan.innerText = item.name;
                    nameSpan.style.overflow = 'hidden';
                    nameSpan.style.textOverflow = 'ellipsis';
                    
                    const sizeSpan = document.createElement('span');
                    sizeSpan.innerText = item.size;
                    sizeSpan.style.textAlign = 'right';
                    sizeSpan.style.minWidth = '70px';

                    row.appendChild(nameSpan);
                    row.appendChild(sizeSpan);

                    row.onclick = () => {
                        state.activePane = side;
                        pState.index = idx;
                        render();
                        mcContainer.focus();
                    };
                    
                    row.ondblclick = () => handleEnter();

                    pUI.list.appendChild(row);
                    
                    // Scroll into view logic ensuring TUI-like snapping
                    if (idx === pState.index) {
                        setTimeout(() => {
                            row.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                        }, 0);
                    }
                });
            };

            const render = () => {
                if (!state.isRunning) return;
                refreshData();
                renderPane('left');
                renderPane('right');
                
                // Update fake prompt path
                let activePathStr = '/' + state[state.activePane].path.join('/');
                if (activePathStr === '') activePathStr = '/';
                const promptPathSpan = promptBar.querySelector('span:nth-child(2)');
                if(promptPathSpan) promptPathSpan.innerText = activePathStr;
            };

            const cleanupExit = () => {
                state.isRunning = false;
                mcContainer.remove();
                this.promptSpan.style.display = '';
                this.cmdInput.style.display = '';
                this.cmdSuggestion.style.display = '';
                this.el.style.overflow = originalOverflow;
                this.cmdInput.focus();
                this.scrollToBottom();
                this.killProcess(processId);
            };

            const getActiveState = () => state[state.activePane];
            const getInactiveState = () => state[state.activePane === 'left' ? 'right' : 'left'];
            const getSelectedItem = () => {
                const s = getActiveState();
                return s.items[s.index];
            };

            const openEditor = async (item, isReadOnly) => {
                return new Promise((resolve) => {
                    mcContainer.style.display = 'none';

                    const editorContainer = document.createElement('div');
                    editorContainer.className = 'mc-editor-container';
                    editorContainer.style.position = 'absolute';
                    editorContainer.style.top = '0';
                    editorContainer.style.left = '0';
                    editorContainer.style.width = '100%';
                    editorContainer.style.height = '100%';
                    editorContainer.style.zIndex = '150';
                    editorContainer.style.display = 'flex';
                    editorContainer.style.flexDirection = 'column';
                    editorContainer.style.backgroundColor = 'var(--bg-color)';
                    editorContainer.style.color = 'var(--text-color)';
                    editorContainer.style.boxSizing = 'border-box';
                    editorContainer.style.padding = '4px';

                    // Top Bar
                    const topBar = document.createElement('div');
                    topBar.style.backgroundColor = 'var(--text-color)';
                    topBar.style.color = 'var(--bg-color)';
                    topBar.style.padding = '0 5px';
                    topBar.style.fontWeight = 'bold';
                    topBar.innerText = `${isReadOnly ? 'View' : 'Edit'}: ${item.name.replace(/^\//, '')}`;
                    editorContainer.appendChild(topBar);

                    // Text Area
                    const textArea = document.createElement('textarea');
                    textArea.style.flex = '1';
                    textArea.style.backgroundColor = 'var(--bg-color)';
                    textArea.style.color = 'var(--text-color)';
                    textArea.style.border = 'none';
                    textArea.style.outline = 'none';
                    textArea.style.resize = 'none';
                    textArea.style.padding = '5px 0';
                    textArea.style.fontFamily = 'inherit';
                    textArea.style.fontSize = 'inherit';
                    textArea.value = item.node.content || '';
                    if (isReadOnly) {
                        textArea.readOnly = true;
                    }
                    editorContainer.appendChild(textArea);

                    // Bottom Bar
                    const bottomBar = document.createElement('div');
                    bottomBar.style.backgroundColor = 'var(--bg-color)';
                    bottomBar.style.display = 'flex';
                    bottomBar.style.gap = '10px';
                    bottomBar.style.padding = '2px 0';
                    bottomBar.innerHTML = isReadOnly ? 
                        `<span><span style="background-color: var(--text-color); color: var(--bg-color); padding: 0 4px; display: inline-block;">Esc</span> Quit</span>` :
                        `<span><span style="background-color: var(--text-color); color: var(--bg-color); padding: 0 4px; display: inline-block;">F2</span> Save</span>
                         <span><span style="background-color: var(--text-color); color: var(--bg-color); padding: 0 4px; display: inline-block;">Esc</span> Quit</span>`;
                    editorContainer.appendChild(bottomBar);

                    this.el.appendChild(editorContainer);
                    textArea.focus();
                    textArea.selectionStart = 0;
                    textArea.selectionEnd = 0;

                    let originalContent = textArea.value;

                    const closeEditor = () => {
                        editorContainer.remove();
                        mcContainer.style.display = 'flex';
                        mcContainer.focus();
                        resolve();
                    };

                    textArea.addEventListener('keydown', async (e) => {
                        if (e.key === 'Escape' || e.key === 'F10') {
                            e.preventDefault();
                            if (!isReadOnly && textArea.value !== originalContent) {
                                const ans = await customPrompt("Save changes? (y/n):");
                                if (ans && ans.toLowerCase() === 'y') {
                                    item.node.content = textArea.value;
                                    if (typeof saveVFS === 'function') saveVFS();
                                } else if (ans === null) {
                                    textArea.focus();
                                    return; // Cancel close if Esc was pressed in prompt
                                }
                            }
                            closeEditor();
                        } else if (e.key === 'F2' && !isReadOnly) {
                            e.preventDefault();
                            item.node.content = textArea.value;
                            originalContent = textArea.value;
                            if (typeof saveVFS === 'function') saveVFS();
                            const oldText = topBar.innerText;
                            topBar.innerText = `${oldText} [Saved]`;
                            setTimeout(() => { topBar.innerText = oldText; }, 1000);
                        } else if (['F1', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'].includes(e.key)) {
                            e.preventDefault();
                        }
                    });
                });
            };

            const customPrompt = async (message) => {
                let overlay = mcContainer;
                const ed = this.el.querySelector('.mc-editor-container');
                if (ed) overlay = ed;
                
                // Dim active overlay and show native prompt above it in absolute position
                overlay.style.opacity = '0.5';
                
                const origPos = this.inputLine.style.position;
                const origBottom = this.inputLine.style.bottom;
                const origLeft = this.inputLine.style.left;
                const origWidth = this.inputLine.style.width;
                const origZIndex = this.inputLine.style.zIndex;
                const origBg = this.inputLine.style.backgroundColor;
                const origPadding = this.inputLine.style.padding;
                const origBoxSizing = this.inputLine.style.boxSizing;

                this.inputLine.style.position = 'absolute';
                this.inputLine.style.bottom = '0';
                this.inputLine.style.left = '0';
                this.inputLine.style.width = '100%';
                this.inputLine.style.zIndex = '200';
                this.inputLine.style.backgroundColor = 'var(--modal-bg)';
                this.inputLine.style.padding = '4px 10px';
                this.inputLine.style.boxSizing = 'border-box';
                
                const input = await this.promptUserInput(`[MC] ${message}`);
                
                this.inputLine.style.position = origPos;
                this.inputLine.style.bottom = origBottom;
                this.inputLine.style.left = origLeft;
                this.inputLine.style.width = origWidth;
                this.inputLine.style.zIndex = origZIndex;
                this.inputLine.style.backgroundColor = origBg;
                this.inputLine.style.padding = origPadding;
                this.inputLine.style.boxSizing = origBoxSizing;

                // Re-hide inputs if MC or Editor is still actively displayed
                if (overlay.style.display !== 'none') {
                    this.promptSpan.style.display = 'none';
                    this.cmdInput.style.display = 'none';
                    this.cmdSuggestion.style.display = 'none';
                }

                overlay.style.opacity = '1';
                if (ed) ed.querySelector('textarea').focus();
                else mcContainer.focus();
                
                return input;
            };

            const handleAction = async (code) => {
                const active = getActiveState();
                const inactive = getInactiveState();
                const item = getSelectedItem();

                switch (code) {
                    case 'F1': // Help
                        await customPrompt("Help: Use arrows to move, Tab to switch panes, F-keys for actions. Enter to return.");
                        break;
                    case 'F2': // Menu (Unimplemented in simple clone)
                    case 'F9': // PullDn (Unimplemented in simple clone)
                        await customPrompt("Feature not available in this simplified clone. Press Enter.");
                        break;
                    case 'F3': // View
                        if (item && item.type === 'file' && item.node) {
                            await openEditor(item, true);
                        }
                        break;
                    case 'F4': // Edit
                        if (item && item.type === 'file' && item.node) {
                            await openEditor(item, false);
                        }
                        break;
                    case 'F5': // Copy
                        if (item && item.name !== '/..') {
                            const pureName = item.name.replace(/^\//, '');
                            const destPathStr = '/' + inactive.path.join('/');
                            const ans = await customPrompt(`Copy "${pureName}" to ${destPathStr}? (y/n):`);
                            if (ans && ans.toLowerCase() === 'y') {
                                const sourceNode = this.getNodeByPathArray(active.path);
                                const destNode = this.getNodeByPathArray(inactive.path);
                                if (sourceNode && destNode && destNode.type === 'dir') {
                                    if (destNode.children[pureName]) {
                                        await customPrompt("Error: Target already exists. Press Enter.");
                                    } else {
                                        destNode.children[pureName] = JSON.parse(JSON.stringify(sourceNode.children[pureName]));
                                        if (typeof saveVFS === 'function') saveVFS();
                                        render();
                                    }
                                }
                            }
                        }
                        break;
                    case 'F6': // RenMov
                        if (item && item.name !== '/..') {
                            const pureName = item.name.replace(/^\//, '');
                            const newName = await customPrompt(`Rename/Move "${pureName}" to:`);
                            if (newName && newName.trim() !== '') {
                                const sourceNode = this.getNodeByPathArray(active.path);
                                if (sourceNode && sourceNode.type === 'dir') {
                                    const objToMove = sourceNode.children[pureName];
                                    if (!newName.includes('/')) {
                                        if (sourceNode.children[newName]) {
                                            await customPrompt("Error: Target name exists. Press Enter.");
                                        } else {
                                            sourceNode.children[newName] = objToMove;
                                            delete sourceNode.children[pureName];
                                            if (typeof saveVFS === 'function') saveVFS();
                                            render();
                                        }
                                    } else {
                                        await customPrompt("Complex paths not supported yet. Press Enter.");
                                    }
                                }
                            }
                        }
                        break;
                    case 'F7': // Mkdir
                        const dirName = await customPrompt("Create directory name:");
                        if (dirName && dirName.trim() !== '') {
                            const targetNode = this.getNodeByPathArray(active.path);
                            if (targetNode && targetNode.type === 'dir') {
                                if (!targetNode.children[dirName]) {
                                    targetNode.children[dirName] = { type: 'dir', children: {} };
                                    if (typeof saveVFS === 'function') saveVFS();
                                    render();
                                } else {
                                    await customPrompt("Error: Name already exists. Press Enter.");
                                }
                            }
                        }
                        break;
                    case 'F8': // Delete
                        if (item && item.name !== '/..') {
                            const pureName = item.name.replace(/^\//, '');
                            const ans = await customPrompt(`Delete "${pureName}"? (y/n):`);
                            if (ans && ans.toLowerCase() === 'y') {
                                const targetNode = this.getNodeByPathArray(active.path);
                                if (targetNode && targetNode.type === 'dir') {
                                    delete targetNode.children[pureName];
                                    if (typeof saveVFS === 'function') saveVFS();
                                    if (active.index >= active.items.length - 1) active.index = Math.max(0, active.index - 1);
                                    render();
                                }
                            }
                        }
                        break;
                    case 'F10':
                    case 'q':
                    case 'Escape':
                        cleanupExit();
                        break;
                }
            };

            const handleEnter = () => {
                const item = getSelectedItem();
                if (!item) return;
                
                if (item.type === 'dir') {
                    const active = getActiveState();
                    if (item.name === '/..') {
                        if (active.path.length > 0) active.path.pop();
                    } else {
                        // Strip leading slash added for visual clarity
                        active.path.push(item.name.replace(/^\//, ''));
                    }
                    active.index = 0; // Reset index on directory change
                    render();
                } else if (item.type === 'file') {
                    handleAction('F3'); // View by default on enter
                }
            };

            mcContainer.addEventListener('keydown', (e) => {
                if (!state.isRunning) return;
                
                // Prevent default scrolling and browser defaults for TUI keys
                if (['ArrowUp', 'ArrowDown', ' ', 'Tab', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'].includes(e.key)) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                const active = getActiveState();

                switch (e.key) {
                    case 'ArrowDown':
                        if (active.index < active.items.length - 1) active.index++;
                        renderPane(state.activePane);
                        break;
                    case 'ArrowUp':
                        if (active.index > 0) active.index--;
                        renderPane(state.activePane);
                        break;
                    case 'PageDown':
                        active.index = Math.min(active.items.length - 1, active.index + 10);
                        renderPane(state.activePane);
                        break;
                    case 'PageUp':
                        active.index = Math.max(0, active.index - 10);
                        renderPane(state.activePane);
                        break;
                    case 'Home':
                        active.index = 0;
                        renderPane(state.activePane);
                        break;
                    case 'End':
                        active.index = active.items.length - 1;
                        renderPane(state.activePane);
                        break;
                    case 'Tab':
                        state.activePane = state.activePane === 'left' ? 'right' : 'left';
                        render();
                        break;
                    case 'Enter':
                        handleEnter();
                        break;
                    case 'Escape':
                        handleAction('F10');
                        break;
                    case 'q':
                    case 'Q':
                        handleAction('F10');
                        break;
                    case 'F1': case 'F2': case 'F3': case 'F4': case 'F5': 
                    case 'F6': case 'F7': case 'F8': case 'F9': case 'F10':
                        handleAction(e.key);
                        break;
                }
            });

            // Register process to allow termination via external clear/kill commands
            const processId = this.registerProcess('mc', () => {
                if (state.isRunning) cleanupExit();
            });

            render();
            
            // Need a slight delay to ensure the element is painted before focusing
            setTimeout(() => {
                mcContainer.focus();
            }, 10);
        }
    }
};