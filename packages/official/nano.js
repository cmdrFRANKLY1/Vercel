window.packagesRegistry['nano'] = {
    name: 'Nano Text Editor',
    description: 'A small, friendly, TUI-based text editor',
    commandInfo: {
        nano: "what is this command?\nnano\n\nwhat is it used for?\nA simple and user-friendly command-line text editor. Use ^O to save and ^X to exit."
    },
    commands: {
        nano: async function(args) {
            // 'this' refers to the Terminal instance calling the command
            const term = this;

            // Hide normal terminal inputs
            term.promptSpan.style.display = 'none';
            term.cmdInput.style.display = 'none';
            term.cmdSuggestion.style.display = 'none';

            // Lock scrolling on the terminal body
            const originalOverflow = term.el.style.overflow;
            term.el.style.overflow = 'hidden';

            let targetPathStr = args[0] || '';
            let fileName = 'New Buffer';
            let fileContent = '';
            let targetNode = null;
            let parentNode = null;
            let exactName = '';

            if (targetPathStr) {
                const parsedInfo = term.getParentNodeAndTargetName(targetPathStr);
                parentNode = parsedInfo.parent;
                exactName = parsedInfo.name;

                if (parentNode && parentNode.type === 'dir' && exactName) {
                    fileName = targetPathStr;
                    targetNode = parentNode.children[exactName];
                    if (targetNode) {
                        if (targetNode.type === 'dir') {
                            term.print(`nano: ${targetPathStr}: Is a directory`, 'error');
                            cleanupExit(true);
                            return;
                        }
                        fileContent = targetNode.content || '';
                    }
                } else {
                    fileName = targetPathStr;
                }
            }

            const nanoContainer = document.createElement('div');
            nanoContainer.style.display = 'flex';
            nanoContainer.style.flexDirection = 'column';
            nanoContainer.style.backgroundColor = 'var(--bg-color)';
            nanoContainer.style.color = 'var(--text-color)';
            nanoContainer.style.fontFamily = 'var(--font-family)';
            nanoContainer.style.fontSize = 'var(--font-size)';
            nanoContainer.style.lineHeight = '1.2';
            nanoContainer.style.boxSizing = 'border-box';
            nanoContainer.style.position = 'absolute';
            nanoContainer.style.top = '0';
            nanoContainer.style.left = '0';
            nanoContainer.style.width = '100%';
            nanoContainer.style.height = '100%';
            nanoContainer.style.zIndex = '100';

            // Top Title Bar (Inverted)
            const topBar = document.createElement('div');
            topBar.style.display = 'flex';
            topBar.style.justifyContent = 'space-between';
            topBar.style.backgroundColor = 'var(--text-color)';
            topBar.style.color = 'var(--bg-color)';
            topBar.style.padding = '2px 8px';
            topBar.style.fontWeight = 'bold';
            topBar.style.userSelect = 'none';
            topBar.style.whiteSpace = 'pre';
            
            const leftTitle = document.createElement('span');
            leftTitle.innerText = '  nano  ';
            const centerTitle = document.createElement('span');
            centerTitle.innerText = `File: ${fileName}`;
            const rightTitle = document.createElement('span');
            rightTitle.innerText = '                  '; // Balances the center title

            topBar.appendChild(leftTitle);
            topBar.appendChild(centerTitle);
            topBar.appendChild(rightTitle);
            nanoContainer.appendChild(topBar);

            const textArea = document.createElement('textarea');
            textArea.style.flex = '1';
            textArea.style.backgroundColor = 'var(--bg-color)';
            textArea.style.color = 'var(--text-color)';
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.resize = 'none';
            textArea.style.padding = '4px 8px';
            textArea.style.fontFamily = 'inherit';
            textArea.style.fontSize = 'inherit';
            textArea.style.lineHeight = '1.4';
            textArea.style.whiteSpace = 'pre'; // standard nano doesn't always wrap, but pre handles spaces well
            textArea.value = fileContent;
            
            // Custom scrollbar hiding for cleaner TUI look
            textArea.style.scrollbarWidth = 'none'; 
            nanoContainer.appendChild(textArea);

            const messageBar = document.createElement('div');
            messageBar.style.padding = '2px 8px';
            messageBar.style.minHeight = '1.2em';
            messageBar.style.display = 'flex';
            messageBar.style.alignItems = 'center';
            messageBar.style.backgroundColor = 'var(--bg-color)';
            messageBar.style.color = 'var(--text-color)';
            messageBar.style.whiteSpace = 'pre';
            
            const messageText = document.createElement('span');
            messageText.style.flex = '1';
            messageBar.appendChild(messageText);
            
            // The input used for prompting file names
            const promptInput = document.createElement('input');
            promptInput.type = 'text';
            promptInput.style.display = 'none';
            promptInput.style.flex = '1';
            promptInput.style.backgroundColor = 'var(--text-color)';
            promptInput.style.color = 'var(--bg-color)';
            promptInput.style.border = 'none';
            promptInput.style.outline = 'none';
            promptInput.style.fontFamily = 'inherit';
            promptInput.style.fontSize = 'inherit';
            promptInput.style.padding = '0 4px';
            messageBar.appendChild(promptInput);

            nanoContainer.appendChild(messageBar);

            const shortcutsBar = document.createElement('div');
            shortcutsBar.style.display = 'grid';
            shortcutsBar.style.gridTemplateColumns = 'repeat(6, 1fr)';
            shortcutsBar.style.gap = '2px 10px';
            shortcutsBar.style.padding = '4px 8px';
            shortcutsBar.style.userSelect = 'none';
            shortcutsBar.style.backgroundColor = 'var(--bg-color)';
            
            const renderShortcuts = (mode) => {
                shortcutsBar.innerHTML = '';
                let items = [];
                if (mode === 'default') {
                    items = [
                        { key: '^G', label: 'Get Help' }, { key: '^O', label: 'Write Out' },
                        { key: '^W', label: 'Where Is' }, { key: '^K', label: 'Cut Text' },
                        { key: '^J', label: 'Justify' },  { key: '^C', label: 'Cur Pos' },
                        { key: '^X', label: 'Exit' },     { key: '^R', label: 'Read File' },
                        { key: '^\\', label: 'Replace' }, { key: '^U', label: 'Uncut Text' },
                        { key: '^T', label: 'To Spell' }, { key: '^_', label: 'Go To Line' }
                    ];
                } else if (mode === 'save_prompt') {
                    items = [
                        { key: 'Y', label: 'Yes' }, { key: 'N', label: 'No' }, { key: '^C', label: 'Cancel' }
                    ];
                } else if (mode === 'filename_prompt') {
                    items = [
                        { key: 'Enter', label: 'Save' }, { key: '^C', label: 'Cancel' }
                    ];
                }

                items.forEach(item => {
                    const wrap = document.createElement('div');
                    wrap.style.display = 'flex';
                    wrap.style.gap = '6px';
                    wrap.style.whiteSpace = 'nowrap';
                    
                    const k = document.createElement('span');
                    k.innerText = item.key;
                    k.style.backgroundColor = 'var(--text-color)';
                    k.style.color = 'var(--bg-color)';
                    k.style.padding = '0 4px';
                    k.style.fontWeight = 'bold';
                    
                    const l = document.createElement('span');
                    l.innerText = item.label;
                    l.style.color = 'var(--text-color)';
                    
                    wrap.appendChild(k);
                    wrap.appendChild(l);
                    shortcutsBar.appendChild(wrap);
                });
            };

            renderShortcuts('default');
            nanoContainer.appendChild(shortcutsBar);
            term.el.appendChild(nanoContainer);

            let originalContent = fileContent;
            let promptState = null; // 'confirm_exit', 'write_filename', null
            let isExiting = false;

            const showMessage = (msg) => {
                messageText.innerText = msg;
                messageText.style.display = 'block';
                promptInput.style.display = 'none';
                setTimeout(() => { if (promptState === null && messageText.innerText === msg) messageText.innerText = ''; }, 3000);
            };

            const cleanupExit = (aborted = false) => {
                nanoContainer.remove();
                term.promptSpan.style.display = '';
                term.cmdInput.style.display = '';
                term.cmdSuggestion.style.display = '';
                term.el.style.overflow = originalOverflow;
                
                if (!aborted) {
                    const lines = textArea.value.split('\n').length;
                    const promptHTML = term.getPromptHTML();
                    term.printHTML(`<div class="history-line"><span class="prompt">${promptHTML}</span> nano ${args.join(' ')}</div>`);
                }
                
                term.cmdInput.focus();
                term.scrollToBottom();
                term.killProcess(processId);
            };

            const writeOut = (pathStr) => {
                if (!pathStr) {
                    showMessage("Error: No file name provided.");
                    return false;
                }
                const pInfo = term.getParentNodeAndTargetName(pathStr);
                if (!pInfo.parent || pInfo.parent.type !== 'dir') {
                    showMessage("Error: Directory does not exist.");
                    return false;
                }
                if (!pInfo.name) {
                    showMessage("Error: Invalid file name.");
                    return false;
                }
                if (pInfo.parent.children[pInfo.name] && pInfo.parent.children[pInfo.name].type === 'dir') {
                    showMessage("Error: Target is a directory.");
                    return false;
                }

                pInfo.parent.children[pInfo.name] = { type: 'file', content: textArea.value };
                if (typeof saveVFS === 'function') saveVFS();
                
                originalContent = textArea.value;
                centerTitle.innerText = `File: ${pathStr}`;
                fileName = pathStr;
                exactName = pInfo.name;
                
                const linesCount = textArea.value.split('\n').length;
                showMessage(`[ Wrote ${linesCount} lines ]`);
                return true;
            };

            const handlePromptInput = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const attemptSave = writeOut(promptInput.value.trim());
                    if (attemptSave) {
                        endPrompt();
                        if (isExiting) cleanupExit();
                    }
                } else if (e.key === 'c' && e.ctrlKey) {
                    e.preventDefault();
                    showMessage("Cancelled");
                    endPrompt();
                }
            };

            const startWritePrompt = () => {
                promptState = 'write_filename';
                renderShortcuts('filename_prompt');
                messageText.innerText = 'File Name to Write: ';
                promptInput.value = fileName === 'New Buffer' ? '' : fileName;
                promptInput.style.display = 'block';
                promptInput.focus();
                promptInput.setSelectionRange(promptInput.value.length, promptInput.value.length);
                promptInput.addEventListener('keydown', handlePromptInput);
            };

            const endPrompt = () => {
                promptState = null;
                isExiting = false;
                renderShortcuts('default');
                promptInput.removeEventListener('keydown', handlePromptInput);
                promptInput.style.display = 'none';
                if (messageText.innerText.startsWith('File Name') || messageText.innerText.startsWith('Save modified')) {
                    messageText.innerText = '';
                }
                textArea.focus();
            };

            textArea.addEventListener('keydown', (e) => {
                // Intercept ^C if in exit prompt
                if (promptState === 'confirm_exit') {
                    e.preventDefault();
                    const key = e.key.toLowerCase();
                    if (key === 'y') {
                        startWritePrompt();
                    } else if (key === 'n') {
                        cleanupExit();
                    } else if (key === 'c' && e.ctrlKey) {
                        showMessage("Cancelled");
                        endPrompt();
                    }
                    return;
                }

                // Normal editing shortcuts
                if (e.ctrlKey) {
                    const key = e.key.toLowerCase();
                    switch (key) {
                        case 'x':
                            e.preventDefault();
                            if (textArea.value !== originalContent) {
                                promptState = 'confirm_exit';
                                isExiting = true;
                                renderShortcuts('save_prompt');
                                showMessage("Save modified buffer?  (Y/N) ");
                            } else {
                                cleanupExit();
                            }
                            break;
                        case 'o':
                            e.preventDefault();
                            isExiting = false;
                            startWritePrompt();
                            break;
                        case 'k': // Cut current line
                            e.preventDefault();
                            const start = textArea.selectionStart;
                            const end = textArea.selectionEnd;
                            const lines = textArea.value.split('\n');
                            let currentLine = textArea.value.substr(0, start).split('\n').length - 1;
                            
                            if (start === end) {
                                // Cut whole line
                                const cutText = lines.splice(currentLine, 1).join('');
                                textArea.value = lines.join('\n');
                                // Move cursor
                                const newPos = lines.slice(0, currentLine).join('\n').length + (currentLine > 0 ? 1 : 0);
                                textArea.selectionStart = textArea.selectionEnd = newPos;
                                navigator.clipboard.writeText(cutText + '\n').catch(()=>{}); // Try to put in real clipboard
                            }
                            break;
                        case 'g':
                            e.preventDefault();
                            showMessage("Nano clone: basic text editing, ^O to save, ^X to exit.");
                            break;
                        case 'w':
                        case 'c':
                        case 'r':
                        case 'j':
                        case 't':
                        case 'u':
                            // Prevent defaults for other nano shortcuts to avoid browser clashes
                            e.preventDefault();
                            showMessage(`Shortcut ^${key.toUpperCase()} not implemented in this clone.`);
                            break;
                    }
                }
            });

            // Prevent tab from shifting focus
            textArea.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && promptState === null) {
                    e.preventDefault();
                    const start = textArea.selectionStart;
                    const end = textArea.selectionEnd;
                    textArea.value = textArea.value.substring(0, start) + "    " + textArea.value.substring(end);
                    textArea.selectionStart = textArea.selectionEnd = start + 4;
                }
            });

            // Register process to allow termination via external clear/kill commands
            const processId = term.registerProcess('nano', () => {
                cleanupExit(true);
            });

            // Focus textarea slightly after render
            setTimeout(() => {
                textArea.focus();
                textArea.selectionStart = textArea.selectionEnd = 0;
                
                if (args[0] && targetNode === null && fileName !== 'New Buffer') {
                    // Check if parent directory exists for new file path warning
                    if (parentNode && parentNode.type === 'dir') {
                        showMessage(`[ New File ]`);
                    } else {
                        showMessage(`[ Directory '${args[0].substring(0, args[0].lastIndexOf('/'))}' does not exist ]`);
                    }
                } else if (targetNode !== null) {
                    const linesCount = fileContent.split('\n').length;
                    showMessage(`[ Read ${linesCount} lines ]`);
                }

            }, 10);
        }
    }
};