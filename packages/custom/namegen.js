/**
 * Name Generator Package for sTerminal
 * Location: packages/custom/namegen.js
 * 
 * Randomly selects a name from resources/dnd/rndNames.json
 */

if (!window.packagesRegistry) {
    window.packagesRegistry = {};
}

window.packagesRegistry['namegen'] = {
    // Automatically install this package on these system profiles
    preInstalledOn: ['default', 'Debian', 'Ubuntu'],
    
    // Info displayed when the user types 'help namegen'
    commandInfo: {
        namegen: "what is this command?\nnamegen\n\nwhat is it used for?\nGenerates random names from the D&D resources library.\n\nUsage:\n  namegen [options]\n\nOptions:\n  -n, -names <int>    Set amount of words per name\n  -l, -lock <pos>     Lock 'first' or 'last' name\n  -a, -amount <int>   Total amount of names to generate\n  -h, -help           Show help\n  -v, -version        Show version"
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

                for (let i = 0; i < args.length; i++) {
                    const arg = args[i].toLowerCase();
                    if (arg === '-h' || arg === '-help' || arg === '--help') {
                        this.print("Usage: namegen [options]");
                        this.print("Options:");
                        this.print("  -n, -names <int>    Set amount of words per name (default: 2)");
                        this.print("  -l, -lock <pos>     Lock 'first' or 'last' name");
                        this.print("  -a, -amount <int>   Total amount of names to generate (default: 9)");
                        this.print("  -h, -help           Show this help message");
                        this.print("  -v, -version        Show version");
                        return;
                    } else if (arg === '-v' || arg === '-version' || arg === '--version') {
                        const rV = () => Math.floor(Math.random() * 10);
                        this.print(`namegen version ${rV()}.${rV()}.${rV()}`);
                        return;
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
                    }
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

                for (let i = 0; i < allGeneratedNames.length; i += namesPerLine) {
                    let lineOutput = [];
                    for (let j = 0; j < namesPerLine; j++) {
                        if (i + j < allGeneratedNames.length) {
                            lineOutput.push(allGeneratedNames[i + j].padEnd(25, ' '));
                        }
                    }
                    this.print(lineOutput.join(' '));
                }

                this.scrollToBottom();
                
            } catch (err) {
                this.print(`Error executing namegen: ${err.message}`, 'error');
            }
        }
    }
};