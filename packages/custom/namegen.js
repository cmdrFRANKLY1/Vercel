/**
 * Name Generator Package for sTerminal
 * Location: packages/custom/namegen.js
 * 
 * Randomly selects a name from resources/dnd/rndNames.json
 * Supports outputting to virtual filesystem text files
 */

if (!window.packagesRegistry) {
    window.packagesRegistry = {};
}

window.packagesRegistry['namegen'] = {
    // Automatically install this package on these system profiles
    preInstalledOn: ['default', 'Debian', 'Ubuntu'],
    
    // Info displayed when the user types 'help namegen'
    commandInfo: {
        namegen: "what is this command?\nnamegen\n\nwhat is it used for?\nGenerates random names from the D&D resources library.\n\nUsage:\n  namegen [options]\n\nOptions:\n  -n, --names <int>     Set amount of words per name (default: 2)\n  -l, --lock <pos>      Lock 'first' or 'last' name\n  -a, --amount <int>    Total amount of names to generate (default: 9)\n  -o, --output <file>   Write output to a text file (creates/overwrites)\n  -p, --append <file>   Append output to a text file\n  -h, --help            Show help\n  -v, --version         Show version"
    },
    
    // Command functions mapped to the terminal
    commands: {
        namegen: async function(args) {
            try {
                // Fetch the JSON array of names
                const response = await fetch('resources/dnd/rndNames.json');
                
                if (!response.ok) {
                    this.print(`Failed to load names: HTTP ${response.status}`, 'error');
                    return;
                }
                
                const names = await response.json();
                
                if (!Array.isArray(names) || names.length === 0) {
                    this.print("Error: rndNames.json is empty or not a valid array.", 'error');
                    return;
                }

                let wordsPerName = 2;
                let totalAmount = 9;
                let namesPerLine = 3;
                let lockMode = null;
                let outputFile = null;
                let appendMode = false;
                let showHelp = false;
                let showVersion = false;

                // Parse arguments
                for (let i = 0; i < args.length; i++) {
                    const arg = args[i].toLowerCase();
                    if (arg === '-h' || arg === '-help' || arg === '--help') {
                        showHelp = true;
                    } else if (arg === '-v' || arg === '-version' || arg === '--version') {
                        showVersion = true;
                    } else if (arg === '-n' || arg === '-names' || arg === '--names') {
                        if (i + 1 < args.length) {
                            wordsPerName = parseInt(args[++i]);
                            if (isNaN(wordsPerName) || wordsPerName < 1) wordsPerName = 2;
                        }
                    } else if (arg === '-a' || arg === '-amount' || arg === '--amount') {
                        if (i + 1 < args.length) {
                            totalAmount = parseInt(args[++i]);
                            if (isNaN(totalAmount) || totalAmount < 1) totalAmount = 9;
                        }
                    } else if (arg === '-l' || arg === '-lock' || arg === '--lock') {
                        if (i + 1 < args.length) {
                            const val = args[++i].toLowerCase();
                            if (val === 'first' || val === 'last') lockMode = val;
                        }
                    } else if (arg === '-o' || arg === '--output' || arg === '-output') {
                        if (i + 1 < args.length) {
                            outputFile = args[++i];
                        }
                    } else if (arg === '-p' || arg === '--append' || arg === '-append') {
                        // Note: Using -p for append since -a is used for amount
                        if (i + 1 < args.length) {
                            outputFile = args[++i];
                            appendMode = true;
                        }
                    }
                }

                // Handle help first
                if (showHelp) {
                    this.print("Usage: namegen [options]");
                    this.print("Options:");
                    this.print("  -n, --names <int>     Set amount of words per name (default: 2)");
                    this.print("  -l, --lock <pos>      Lock 'first' or 'last' name");
                    this.print("  -a, --amount <int>    Total amount of names to generate (default: 9)");
                    this.print("  -o, --output <file>   Write output to a text file (creates/overwrites)");
                    this.print("  -p, --append <file>   Append output to a text file (using -p to avoid conflict with -amount)");
                    this.print("  -h, --help            Show this help message");
                    this.print("  -v, --version         Show version");
                    this.scrollToBottom();
                    return;
                }
                
                // Handle version
                if (showVersion) {
                    const rV = () => Math.floor(Math.random() * 10);
                    this.print(`namegen version ${rV()}.${rV()}.${rV()}`);
                    this.scrollToBottom();
                    return;
                }

                let lockedWord = "";
                if (lockMode) {
                    lockedWord = names[Math.floor(Math.random() * names.length)];
                }

                let allGeneratedNames = [];
                for (let i = 0; i < totalAmount; i++) {
                    let nameWords = [];
                    
                    for (let k = 0; k < wordsPerName; k++) {
                        if (lockMode === 'first' && k === 0) {
                            nameWords.push(lockedWord);
                        } else if (lockMode === 'last' && k === wordsPerName - 1) {
                            nameWords.push(lockedWord);
                        } else {
                            const randomIndex = Math.floor(Math.random() * names.length);
                            nameWords.push(names[randomIndex]);
                        }
                    }
                    
                    allGeneratedNames.push(nameWords.join(' '));
                }

                let outputLines = [];
                for (let i = 0; i < allGeneratedNames.length; i += namesPerLine) {
                    let lineOutput = [];
                    for (let j = 0; j < namesPerLine; j++) {
                        if (i + j < allGeneratedNames.length) {
                            lineOutput.push(allGeneratedNames[i + j].padEnd(25, ' '));
                        }
                    }
                    outputLines.push(lineOutput.join(' '));
                }
                
                let message = outputLines.join('\n');

                // Handle file output
                if (outputFile) {
                    try {
                        // Resolve the file path (supports relative, absolute, and ~)
                        let filePath = outputFile;
                        let fileExists = false;
                        let existingContent = '';

                        // Handle ~ expansion
                        if (filePath.startsWith('~/')) {
                            filePath = filePath.replace(/^~/, '/home/user');
                        }

                        // Handle absolute vs relative paths
                        let pathArray;
                        if (filePath.startsWith('/')) {
                            // Absolute path - remove leading slash and split
                            pathArray = filePath.substring(1).split('/').filter(p => p !== '');
                        } else {
                            // Relative path - use current directory
                            pathArray = [...this.currentPath, ...filePath.split('/').filter(p => p !== '')];
                        }

                        // Build the path to the file
                        let parentPath = [...pathArray];
                        let fileName = parentPath.pop();
                        
                        // Validate file name
                        if (!fileName || fileName === '') {
                            this.print("Error: Invalid file name.", 'error');
                            this.scrollToBottom();
                            return;
                        }

                        // Get the parent directory node
                        let parentNode = this.getNodeByPathArray(parentPath);
                        if (!parentNode || parentNode.type !== 'dir') {
                            this.print(`Error: Directory '${parentPath.join('/') || '/'}' does not exist.`, 'error');
                            this.scrollToBottom();
                            return;
                        }

                        // Check if file already exists
                        if (parentNode.children && parentNode.children[fileName]) {
                            fileExists = true;
                            if (!appendMode) {
                                // In overwrite mode, we'll replace the content
                                existingContent = '';
                            } else {
                                // In append mode, get existing content
                                const existingFile = parentNode.children[fileName];
                                if (existingFile.type === 'file' && existingFile.content !== undefined) {
                                    existingContent = existingFile.content || '';
                                } else {
                                    // If it's not a file or has no content, treat as empty
                                    existingContent = '';
                                }
                            }
                        } else if (appendMode) {
                            // Trying to append to a file that doesn't exist
                            this.print(`Error: File '${fileName}' does not exist. Use -o to create it first.`, 'error');
                            this.scrollToBottom();
                            return;
                        }

                        // Prepare the content
                        let newContent;
                        if (appendMode) {
                            // Add a newline if existing content doesn't end with one
                            const separator = existingContent && !existingContent.endsWith('\n') ? '\n' : '';
                            newContent = existingContent + separator + message + '\n';
                        } else {
                            // Overwrite mode
                            newContent = message + '\n';
                        }

                        // Create or update the file
                        parentNode.children[fileName] = {
                            type: 'file',
                            description: `Text file containing generated names`,
                            content: newContent
                        };

                        // Save the VFS
                        if (typeof saveVFS === 'function') {
                            saveVFS();
                        } else {
                            localStorage.setItem('sTerminal_vfs', JSON.stringify(vfs));
                        }

                        // Show success message
                        const displayPath = (outputFile.startsWith('/') || outputFile.startsWith('~/')) ? outputFile : pathArray.join('/') + '/' + fileName;
                        if (appendMode) {
                            this.print(`Appended to '${displayPath}' successfully.`);
                        } else {
                            this.print(`Wrote to '${displayPath}' successfully.`);
                        }
                    } catch (error) {
                        this.print(`Error writing to file: ${error.message}`, 'error');
                    }
                } else {
                    // No file output - just display the message
                    for (let line of outputLines) {
                        this.print(line);
                    }
                }

                this.scrollToBottom();
                
            } catch (err) {
                this.print(`Error executing namegen: ${err.message}`, 'error');
            }
        }
    }
};