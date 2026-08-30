/**
 * Template Package for sTerminal
 * Location: packages/custom/template.js
 * 
 * A template package demonstrating basic command structure with output, help, and version options
 * Supports outputting to virtual filesystem text files
 */

if (!window.packagesRegistry) {
    window.packagesRegistry = {};
}

window.packagesRegistry['template'] = {
    // Automatically install this package on these system profiles
    preInstalledOn: ['default', 'Debian', 'Ubuntu'],
    
    // Info displayed when the user types 'help template'
    commandInfo: {
        template: "what is this command?\ntemplate\n\nwhat is it used for?\nA template package demonstrating basic command structure with output, help, and version options.\n\nUsage:\n  template [options] [text]\n\nOptions:\n  -o, --output <file>   Write output to a text file (creates/overwrites)\n  -a, --append <file>   Append output to a text file\n  -h, --help            Show this help message\n  -v, --version         Show version information\n\nExamples:\n  template                        # Displays default greeting\n  template -o output.txt          # Writes default message to output.txt\n  template -o myfile.txt \"Hello\"  # Writes \"Hello\" to myfile.txt\n  template -a log.txt \"New entry\" # Appends to log.txt\n  template \"Custom message\"       # Displays custom message (no file)"
    },
    
    // Command functions mapped to the terminal
    commands: {
        template: async function(args) {
            let outputText = null;
            let showHelp = false;
            let showVersion = false;
            let outputFile = null;
            let appendMode = false;
            let customMessage = null;

            // Parse arguments
            for (let i = 0; i < args.length; i++) {
                const arg = args[i].toLowerCase();
                
                if (arg === '-h' || arg === '--help' || arg === '-help') {
                    showHelp = true;
                } else if (arg === '-v' || arg === '--version' || arg === '-version') {
                    showVersion = true;
                } else if (arg === '-o' || arg === '--output') {
                    if (i + 1 < args.length) {
                        outputFile = args[++i];
                        // Check if there's another argument (the message)
                        if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
                            customMessage = args[++i];
                        }
                    }
                } else if (arg === '-a' || arg === '--append') {
                    if (i + 1 < args.length) {
                        outputFile = args[++i];
                        appendMode = true;
                        if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
                            customMessage = args[++i];
                        }
                    }
                } else if (!arg.startsWith('-') && customMessage === null) {
                    // If it's not a flag, treat it as a message
                    customMessage = args[i];
                }
            }

            // Handle help first
            if (showHelp) {
                this.print("Usage: template [options] [text]");
                this.print("");
                this.print("Options:");
                this.print("  -o, --output <file>   Write output to a text file (creates/overwrites)");
                this.print("  -a, --append <file>   Append output to a text file");
                this.print("  -h, --help            Show this help message");
                this.print("  -v, --version         Show version information");
                this.print("");
                this.print("Examples:");
                this.print("  template                        # Displays default greeting");
                this.print("  template -o output.txt          # Writes default message to output.txt");
                this.print("  template -o myfile.txt \"Hello\"  # Writes \"Hello\" to myfile.txt");
                this.print("  template -a log.txt \"New entry\" # Appends to log.txt");
                this.print("  template \"Custom message\"       # Displays custom message (no file)");
                this.print("  template -o /home/user/readme.txt \"Hello World\"  # Writes to absolute path");
                this.print("  template -o ~/docs/notes.txt \"Note\"  # Writes to home directory");
                this.scrollToBottom();
                return;
            }

            // Handle version
            if (showVersion) {
                const rV = () => Math.floor(Math.random() * 10);
                this.print(`template version ${rV()}.${rV()}.${rV()}`);
                this.scrollToBottom();
                return;
            }

            // Determine the text to output
            let message = customMessage !== null ? customMessage : "Hello from template package! Use -h or --help to see available options.";

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
                        description: `Text file containing template output`,
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
                this.print(message);
            }
            
            this.scrollToBottom();
        }
    }
};

console.log('✅ Template package loaded successfully!');
console.log('📖 Type "template" in the terminal to test it out.');