// Character Generator Package
(function() {
    // Prevent multiple registrations
    if (window.packagesRegistry && window.packagesRegistry['chargen']) return;
    
    // Register the package
    window.packagesRegistry = window.packagesRegistry || {};
    window.packagesRegistry['chargen'] = {
        name: 'chargen',
        description: 'D&D Character Generator',
        preInstalledOn: ['default'],
        commands: {
            chargen: function(args) {
                return generateCharacter.call(this, args);
            }
        },
        commandInfo: {
            chargen: "what is this command?\nchargen\n\nwhat is it used for?\nGenerates a random D&D-style character with stats, biography, birthplace, and idol.\n\nUsage:\n  chargen [options]\n\nOptions:\n  -o, --output <file>   Write output to a text file (creates/overwrites)\n  -a, --append <file>   Append output to a text file\n  -h, --help            Show help\n  -v, --version         Show version"
        }
    };

    // Helper functions
    function randomPick(arr) {
        if (!arr || arr.length === 0) {
            console.warn('Empty array passed to randomPick');
            return null;
        }
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Main character generation function
    function generateCharacter(args) {
        const term = this;
        
        let showHelp = false;
        let showVersion = false;
        let outputFile = null;
        let appendMode = false;

        // Parse arguments
        if (args) {
            for (let i = 0; i < args.length; i++) {
                const arg = args[i].toLowerCase();
                if (arg === '-h' || arg === '--help' || arg === '-help') {
                    showHelp = true;
                } else if (arg === '-v' || arg === '--version' || arg === '-version') {
                    showVersion = true;
                } else if (arg === '-o' || arg === '--output' || arg === '-output') {
                    if (i + 1 < args.length) {
                        outputFile = args[++i];
                    }
                } else if (arg === '-a' || arg === '--append' || arg === '-append') {
                    if (i + 1 < args.length) {
                        outputFile = args[++i];
                        appendMode = true;
                    }
                }
            }
        }

        // Handle help first
        if (showHelp) {
            term.print("Usage: chargen [options]");
            term.print("Options:");
            term.print("  -o, --output <file>   Write output to a text file (creates/overwrites)");
            term.print("  -a, --append <file>   Append output to a text file");
            term.print("  -h, --help            Show this help message");
            term.print("  -v, --version         Show version information");
            term.scrollToBottom();
            return;
        }
        
        // Handle version
        if (showVersion) {
            const rV = () => Math.floor(Math.random() * 10);
            term.print(`chargen version ${rV()}.${rV()}.${rV()}`);
            term.scrollToBottom();
            return;
        }

        // Check if we have the data loaded already
        if (window._chargenData) {
            displayCharacter(term, window._chargenData, outputFile, appendMode);
            return;
        }

        term.print('Loading character data from resources/dnd/...');
        
        const files = [
            { name: 'rndAttributes.json', key: 'attributes' },
            { name: 'rndBiography.json', key: 'biography' },
            { name: 'rndBirthplaces.json', key: 'birthplaces' },
            { name: 'rndIdols.json', key: 'idols' },
            { name: 'rndNames.json', key: 'names' }
        ];
        
        const basePath = 'resources/dnd/';
        const loadedData = {};
        let loadErrors = [];
        let completed = 0;

        files.forEach((file) => {
            fetch(basePath + file.name)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    loadedData[file.key] = data;
                    completed++;
                    if (completed === files.length) {
                        // All files loaded
                        if (loadErrors.length > 0) {
                            term.print(`Error loading ${loadErrors.length} file(s):`);
                            loadErrors.forEach(e => term.print(`  - ${e.file}: ${e.error}`));
                            return;
                        }
                        window._chargenData = loadedData;
                        term.print('All files loaded successfully.\n');
                        displayCharacter(term, loadedData, outputFile, appendMode);
                    }
                })
                .catch(err => {
                    loadErrors.push({ file: file.name, error: err.message });
                    completed++;
                    if (completed === files.length) {
                        term.print(`Error loading ${loadErrors.length} file(s):`);
                        loadErrors.forEach(e => term.print(`  - ${e.file}: ${e.error}`));
                    }
                });
        });
    }

    function displayCharacter(term, data, outputFile, appendMode) {
        const { attributes, biography, birthplaces, idols, names } = data;

        // Generate character
        const name = randomPick(names) || 'Unknown';
        
        const statKeys = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
        const stats = {};
        statKeys.forEach(key => {
            const options = attributes[key] || [];
            const selected = randomPick(options) || 'Average';
            const value = Math.floor(Math.random() * 20) + 1;
            stats[key] = { value, trait: selected };
        });

        const reputation = randomPick(biography.reputation) || '';
        const background = randomPick(biography.background) || '';
        const motivation = randomPick(biography.motivation) || '';
        const secret = randomPick(biography.secrets) || '';

        const birthplace = randomPick(birthplaces);
        const birthPlaceName = birthplace ? birthplace.name : 'Unknown';
        const birthOrigin = birthplace && birthplace.origin ? birthplace.origin : null;

        const idol = randomPick(idols);
        const idolName = idol ? idol.name : 'Unknown';
        const idolOrigin = idol && idol.origin ? idol.origin : null;

        // Build output - text only, no icons or box chars
        const output = [];
        
        // Header
        const headerLine = '='.repeat(50);
        output.push(headerLine);
        output.push(`  CHARACTER SHEET: ${name}`);
        output.push(headerLine);
        output.push('');
        
        // Statistics
        output.push('  STATISTICS:');
        output.push('  ' + '-'.repeat(40));
        for (const [stat, statData] of Object.entries(stats)) {
            const statDisplay = stat.padEnd(14);
            const valueDisplay = statData.value.toString().padStart(2);
            const traitDisplay = statData.trait;
            output.push(`  ${statDisplay}  ${valueDisplay}  (${traitDisplay})`);
        }
        output.push('');
        
        // Biography
        output.push('  BIOGRAPHY:');
        output.push('  ' + '-'.repeat(40));
        output.push(`  Reputation:   ${reputation}`);
        output.push(`  Background:   ${background}`);
        output.push(`  Motivation:   ${motivation}`);
        output.push(`  Secret:       ${secret}`);
        output.push('');
        
        // Birthplace
        output.push('  BIRTHPLACE:');
        output.push('  ' + '-'.repeat(40));
        output.push(`  Location:     ${birthPlaceName}`);
        if (birthOrigin) {
            output.push(`  Origin:       ${birthOrigin}`);
        }
        output.push('');
        
        // Idol
        output.push('  IDOL:');
        output.push('  ' + '-'.repeat(40));
        output.push(`  Name:         ${idolName}`);
        if (idolOrigin) {
            output.push(`  Origin:       ${idolOrigin}`);
        }
        output.push('');
        
        // Footer
        output.push(`  Generated:    ${new Date().toISOString()}`);
        output.push(headerLine);

        let message = output.join('\n');

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
                    pathArray = [...term.currentPath, ...filePath.split('/').filter(p => p !== '')];
                }

                // Build the path to the file
                let parentPath = [...pathArray];
                let fileName = parentPath.pop();
                
                // Validate file name
                if (!fileName || fileName === '') {
                    term.print("Error: Invalid file name.", 'error');
                    term.scrollToBottom();
                    return;
                }

                // Get the parent directory node
                let parentNode = term.getNodeByPathArray(parentPath);
                if (!parentNode || parentNode.type !== 'dir') {
                    term.print(`Error: Directory '${parentPath.join('/') || '/'}' does not exist.`, 'error');
                    term.scrollToBottom();
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
                    term.print(`Error: File '${fileName}' does not exist. Use -o to create it first.`, 'error');
                    term.scrollToBottom();
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
                    description: `Text file containing generated character`,
                    content: newContent
                };

                // Save the VFS
                if (typeof saveVFS === 'function') {
                    saveVFS();
                } else {
                    localStorage.setItem('sTerminal_vfs', JSON.stringify(typeof vfs !== 'undefined' ? vfs : {}));
                }

                // Show success message
                const displayPath = (outputFile.startsWith('/') || outputFile.startsWith('~/')) ? outputFile : pathArray.join('/') + '/' + fileName;
                if (appendMode) {
                    term.print(`Appended to '${displayPath}' successfully.`);
                } else {
                    term.print(`Wrote to '${displayPath}' successfully.`);
                }
            } catch (error) {
                term.print(`Error writing to file: ${error.message}`, 'error');
            }
        } else {
            // No file output - just display the message
            output.forEach(line => term.print(line));
            term.print('');
        }
        
        term.scrollToBottom();
    }
})();