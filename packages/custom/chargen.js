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
                return generateCharacter.call(this);
            }
        },
        commandInfo: {
            chargen: "what is this command?\nchargen\n\nwhat is it used for?\nGenerates a random D&D-style character with stats, biography, birthplace, and idol."
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
    function generateCharacter() {
        const term = this;
        
        // Check if we have the data loaded already
        if (window._chargenData) {
            displayCharacter(term, window._chargenData);
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

        files.forEach((file, index) => {
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
                        displayCharacter(term, loadedData);
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

    function displayCharacter(term, data) {
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

        // Print each line
        output.forEach(line => term.print(line));
        term.print('');
        term.scrollToBottom();
    }
})();