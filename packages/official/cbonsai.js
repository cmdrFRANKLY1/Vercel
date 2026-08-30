window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['cbonsai'] = {
    name: 'cbonsai',
    description: 'Grow a bonsai tree in your terminal',
    preInstalledOn: ['default'],
    translations: {
        en: {
            cbonsaiUsage: "cbonsai: usage: cbonsai [OPTIONS]",
            cbonsaiHelp: "Usage: cbonsai [OPTIONS]\n\nOptions:\n  -l, --live          Live mode - watch the tree grow in real-time\n  -t, --time SECONDS  Time in seconds between growth steps (default: 0.1)\n  -i, --infinite      Infinite mode - keep growing forever\n  -w, --wait SECONDS  Wait time before starting (default: 0)\n  -S, --seed SEED     Seed the random number generator\n  -b, --base          Show trunk base\n  -c, --color         Colorized output\n  -m, --message MSG   Display a message at the bottom\n  -o, --output N      Output to terminal instance N (e.g., -o 2)\n  -v, --version       Display version information\n  -h, --help          Show this help",
            cbonsaiVersion: "cbonsai version 1.3.0",
            invalidOption: "cbonsai: invalid option '{0}'",
            invalidTime: "cbonsai: invalid time value '{0}'",
            invalidSeed: "cbonsai: invalid seed value '{0}'",
            outputToTerminal: "Outputting to terminal instance {0}",
            invalidTerminal: "cbonsai: terminal instance '{0}' not found"
        },
        de: {
            cbonsaiUsage: "cbonsai: Verwendung: cbonsai [OPTIONEN]",
            cbonsaiHelp: "Verwendung: cbonsai [OPTIONEN]\n\nOptionen:\n  -l, --live          Live-Modus - Baum in Echtzeit wachsen sehen\n  -t, --time SEKUNDEN Zeit zwischen Wachstumsschritten (Standard: 0.1)\n  -i, --infinite      Unendlicher Modus - wächst für immer weiter\n  -w, --wait SEKUNDEN Wartezeit vor dem Start (Standard: 0)\n  -S, --seed SEED     Zufallsgenerator initialisieren\n  -b, --base          Stammbasis anzeigen\n  -c, --color         Farbige Ausgabe\n  -m, --message NACHRICHT Nachricht am unteren Rand anzeigen\n  -o, --output N      Ausgabe in Terminal-Instanz N (z.B. -o 2)\n  -v, --version       Versionsinformation anzeigen\n  -h, --help          Diese Hilfe anzeigen",
            invalidOption: "cbonsai: Ungültige Option '{0}'",
            invalidTime: "cbonsai: Ungültiger Zeitwert '{0}'",
            invalidSeed: "cbonsai: Ungültiger Seed-Wert '{0}'",
            outputToTerminal: "Ausgabe in Terminal-Instanz {0}",
            invalidTerminal: "cbonsai: Terminal-Instanz '{0}' nicht gefunden"
        },
        fr: {
            cbonsaiUsage: "cbonsai: utilisation: cbonsai [OPTIONS]",
            cbonsaiHelp: "Utilisation: cbonsai [OPTIONS]\n\nOptions:\n  -l, --live          Mode live - regardez l'arbre grandir en temps réel\n  -t, --time SECONDES Temps entre les étapes de croissance (défaut: 0.1)\n  -i, --infinite      Mode infini - continue de grandir pour toujours\n  -w, --wait SECONDES Temps d'attente avant de commencer (défaut: 0)\n  -S, --seed GRAINE   Initialiser le générateur aléatoire\n  -b, --base          Afficher la base du tronc\n  -c, --color         Sortie colorée\n  -m, --message MSG   Afficher un message en bas\n  -o, --output N      Sortie vers l'instance terminal N (ex: -o 2)\n  -v, --version       Afficher les informations de version\n  -h, --help          Afficher cette aide",
            invalidOption: "cbonsai: option invalide '{0}'",
            invalidTime: "cbonsai: valeur de temps invalide '{0}'",
            invalidSeed: "cbonsai: valeur de graine invalide '{0}'",
            outputToTerminal: "Sortie vers l'instance terminal {0}",
            invalidTerminal: "cbonsai: instance terminal '{0}' introuvable"
        },
        it: {
            cbonsaiUsage: "cbonsai: uso: cbonsai [OPZIONI]",
            cbonsaiHelp: "Uso: cbonsai [OPZIONI]\n\nOpzioni:\n  -l, --live          Modalità live - guarda l'albero crescere in tempo reale\n  -t, --time SECONDI  Tempo tra i passaggi di crescita (default: 0.1)\n  -i, --infinite      Modalità infinita - cresce per sempre\n  -w, --wait SECONDI  Tempo di attesa prima di iniziare (default: 0)\n  -S, --seed SEME     Inizializza il generatore casuale\n  -b, --base          Mostra la base del tronco\n  -c, --color         Output colorato\n  -m, --message MSG   Mostra un messaggio in basso\n  -o, --output N      Output verso l'istanza terminal N (es: -o 2)\n  -v, --version       Mostra informazioni versione\n  -h, --help          Mostra questo aiuto",
            invalidOption: "cbonsai: opzione non valida '{0}'",
            invalidTime: "cbonsai: valore tempo non valido '{0}'",
            invalidSeed: "cbonsai: valore seme non valido '{0}'",
            outputToTerminal: "Output verso l'istanza terminale {0}",
            invalidTerminal: "cbonsai: istanza terminale '{0}' non trovata"
        },
        tr: {
            cbonsaiUsage: "cbonsai: kullanım: cbonsai [SECENEKLER]",
            cbonsaiHelp: "Kullanım: cbonsai [SECENEKLER]\n\nSecenekler:\n  -l, --live          Canlı mod - ağacın gerçek zamanlı büyümesini izle\n  -t, --time SANIYE  Büyüme adımları arasındaki süre (varsayılan: 0.1)\n  -i, --infinite      Sonsuz mod - sonsuza kadar büyümeye devam et\n  -w, --wait SANIYE   Başlamadan önce bekleme süresi (varsayılan: 0)\n  -S, --seed TOHUM    Rastgele sayı üretecini tohumla\n  -b, --base          Gövde tabanını göster\n  -c, --color         Renkli çıktı\n  -m, --message MSG   Altta bir mesaj göster\n  -o, --output N      Terminal örneği N'ye çıktı ver (ör: -o 2)\n  -v, --version       Sürüm bilgilerini göster\n  -h, --help          Bu yardımı göster",
            invalidOption: "cbonsai: geçersiz seçenek '{0}'",
            invalidTime: "cbonsai: geçersiz zaman değeri '{0}'",
            invalidSeed: "cbonsai: geçersiz tohum değeri '{0}'",
            outputToTerminal: "Terminal örneği {0}'a çıktı veriliyor",
            invalidTerminal: "cbonsai: terminal örneği '{0}' bulunamadı"
        }
    },
    commandInfo: {
        en: "what is this command?\ncbonsai [OPTIONS]\n\nwhat is it used for?\nGrows a beautiful ASCII bonsai tree in your terminal with real-time animation and customization options.",
        de: "Was ist dieser Befehl?\ncbonsai [OPTIONEN]\n\nWofür wird er verwendet?\nZüchtet einen schönen ASCII-Bonsaibaum in Ihrem Terminal mit Echtzeit-Animation und Anpassungsoptionen.",
        fr: "Qu'est-ce que cette commande ?\ncbonsai [OPTIONS]\n\nA quoi sert-elle ?\nFait pousser un magnifique bonsaï ASCII dans votre terminal avec animation en temps réel et options de personnalisation.",
        it: "Cos'è questo comando?\ncbonsai [OPZIONI]\n\nA cosa serve?\nColtiva un bellissimo bonsai ASCII nel tuo terminale con animazione in tempo reale e opzioni di personalizzazione.",
        tr: "Bu komut nedir?\ncbonsai [SECENEKLER]\n\nNe işe yarar?\nTerminalinizde gerçek zamanlı animasyon ve özelleştirme seçenekleriyle güzel bir ASCII bonsai ağacı yetiştirir."
    },
    commands: {
        cbonsai: function(args) {
            let liveMode = false;
            let timeStep = 0.1;
            let infinite = false;
            let waitTime = 0;
            let seed = null;
            let showBase = false;
            let colorized = false;
            let message = null;
            let outputTerminal = null;
            let showHelp = false;
            let showVersion = false;

            // Parse arguments
            const rawArgs = args || [];
            for (let i = 0; i < rawArgs.length; i++) {
                const arg = rawArgs[i];
                
                // Help
                if (arg === '-h' || arg === '--help') {
                    showHelp = true;
                    break;
                }
                
                // Version
                if (arg === '-v' || arg === '--version') {
                    showVersion = true;
                    break;
                }
                
                // Live mode
                if (arg === '-l' || arg === '--live') {
                    liveMode = true;
                    continue;
                }
                
                // Time
                if (arg === '-t' || arg === '--time') {
                    if (i + 1 >= rawArgs.length) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    const value = parseFloat(rawArgs[++i]);
                    if (isNaN(value) || value < 0) {
                        this.printTranslatable('invalidTime', 'error', false, [rawArgs[i]]);
                        return;
                    }
                    timeStep = value;
                    continue;
                }
                
                // Infinite
                if (arg === '-i' || arg === '--infinite') {
                    infinite = true;
                    continue;
                }
                
                // Wait
                if (arg === '-w' || arg === '--wait') {
                    if (i + 1 >= rawArgs.length) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    const value = parseFloat(rawArgs[++i]);
                    if (isNaN(value) || value < 0) {
                        this.printTranslatable('invalidTime', 'error', false, [rawArgs[i]]);
                        return;
                    }
                    waitTime = value;
                    continue;
                }
                
                // Seed
                if (arg === '-S' || arg === '--seed') {
                    if (i + 1 >= rawArgs.length) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    const value = parseInt(rawArgs[++i]);
                    if (isNaN(value)) {
                        this.printTranslatable('invalidSeed', 'error', false, [rawArgs[i]]);
                        return;
                    }
                    seed = value;
                    continue;
                }
                
                // Base
                if (arg === '-b' || arg === '--base') {
                    showBase = true;
                    continue;
                }
                
                // Color
                if (arg === '-c' || arg === '--color') {
                    colorized = true;
                    continue;
                }
                
                // Message
                if (arg === '-m' || arg === '--message') {
                    if (i + 1 >= rawArgs.length) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    message = rawArgs[++i];
                    continue;
                }
                
                // Output terminal
                if (arg === '-o' || arg === '--output') {
                    if (i + 1 >= rawArgs.length) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    const value = rawArgs[++i];
                    outputTerminal = parseInt(value);
                    if (isNaN(outputTerminal) || outputTerminal < 1) {
                        this.printTranslatable('invalidOption', 'error', false, [arg + ' ' + value]);
                        return;
                    }
                    continue;
                }
                if (arg.startsWith('--output=')) {
                    const value = arg.substring('--output='.length);
                    outputTerminal = parseInt(value);
                    if (isNaN(outputTerminal) || outputTerminal < 1) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    continue;
                }
                
                // Unknown option
                if (arg.startsWith('-')) {
                    this.printTranslatable('invalidOption', 'error', false, [arg]);
                    return;
                }
            }

            // Handle help and version
            if (showHelp) {
                this.printTranslatable('cbonsaiHelp');
                return;
            }
            if (showVersion) {
                this.printTranslatable('cbonsaiVersion');
                return;
            }

            // Find the target terminal if -o is specified
            let targetTerminal = this;
            if (outputTerminal !== null) {
                const allTerminals = [];
                if (typeof tabs !== 'undefined') {
                    tabs.forEach(tab => {
                        tab.terminals.forEach(term => {
                            allTerminals.push(term);
                        });
                    });
                }
                
                if (outputTerminal >= 1 && outputTerminal <= allTerminals.length) {
                    targetTerminal = allTerminals[outputTerminal - 1];
                    targetTerminal.printTranslatable('outputToTerminal', '', false, [outputTerminal]);
                } else {
                    this.printTranslatable('invalidTerminal', 'error', false, [outputTerminal]);
                    return;
                }
            }

            // Seed the random generator if provided
            if (seed !== null) {
                // Simple seeded random implementation
                let seedValue = seed;
                const seededRandom = function() {
                    seedValue = (seedValue * 9301 + 49297) % 233280;
                    return seedValue / 233280;
                };
                // Use this for random generation in the tree growth
                window._cbonsaiRandom = seededRandom;
            } else {
                window._cbonsaiRandom = Math.random;
            }

            // Bonsai tree generation
            const container = targetTerminal.el;
            
            // Create overlay for the bonsai display
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = '#000000';
            overlay.style.zIndex = '999999';
            overlay.style.overflow = 'hidden';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.padding = '20px';
            overlay.style.boxSizing = 'border-box';

            const pre = document.createElement('pre');
            pre.style.color = colorized ? '#00ff66' : '#ffffff';
            pre.style.fontFamily = 'monospace';
            pre.style.fontSize = '14px';
            pre.style.lineHeight = '1.2';
            pre.style.margin = '0';
            pre.style.whiteSpace = 'pre-wrap';
            pre.style.wordWrap = 'break-word';
            pre.style.maxWidth = '100%';
            pre.style.maxHeight = '100%';
            pre.style.overflow = 'auto';
            overlay.appendChild(pre);
            container.appendChild(overlay);

            // Bonsai tree generator
            class BonsaiTree {
                constructor() {
                    this.lines = [];
                    this.width = 60;
                    this.height = 40;
                    this.age = 0;
                    this.maxAge = infinite ? Infinity : 100;
                    this.growing = true;
                    this.branches = [];
                    this.random = window._cbonsaiRandom || Math.random;
                    
                    // Initialize the tree
                    this.trunk = { x: Math.floor(this.width / 2), y: this.height - 5, length: 6, angle: -Math.PI / 2, thickness: 4 };
                    this.branches.push(this.trunk);
                    this.generateTree();
                }

                generateTree() {
                    // Simple recursive tree generation
                    const generateBranch = (branch, depth) => {
                        if (depth > 6 || !this.growing) return;
                        
                        const segments = branch.length;
                        let x = branch.x;
                        let y = branch.y;
                        const angle = branch.angle;
                        const length = branch.length;
                        const thickness = branch.thickness;
                        
                        // Draw this branch segment by segment
                        for (let i = 0; i < segments; i++) {
                            const newX = x + Math.cos(angle) * (i + 1) * 0.8;
                            const newY = y + Math.sin(angle) * (i + 1) * 0.8;
                            
                            const lineX = Math.floor(x);
                            const lineY = Math.floor(y);
                            const newLineX = Math.floor(newX);
                            const newLineY = Math.floor(newY);
                            
                            // Draw line between points
                            const dx = newLineX - lineX;
                            const dy = newLineY - lineY;
                            const steps = Math.max(Math.abs(dx), Math.abs(dy));
                            
                            for (let s = 0; s <= steps; s++) {
                                const t = steps === 0 ? 1 : s / steps;
                                const px = Math.floor(lineX + dx * t);
                                const py = Math.floor(lineY + dy * t);
                                
                                if (px >= 0 && px < this.width && py >= 0 && py < this.height) {
                                    const char = this.getCharForThickness(thickness);
                                    if (!this.lines[py]) this.lines[py] = [];
                                    this.lines[py][px] = char;
                                }
                            }
                            
                            x = newX;
                            y = newY;
                        }
                        
                        // Generate sub-branches
                        if (depth < 5 && this.random() < 0.3 + (depth * 0.05)) {
                            const numBranches = Math.floor(this.random() * 2) + 1;
                            for (let i = 0; i < numBranches; i++) {
                                const newAngle = angle + (this.random() - 0.5) * 1.2;
                                const newLength = Math.max(2, length * (0.5 + this.random() * 0.3));
                                const newThickness = Math.max(1, thickness - 0.5 - this.random() * 0.5);
                                
                                const subBranch = {
                                    x: x,
                                    y: y,
                                    angle: newAngle,
                                    length: Math.floor(newLength),
                                    thickness: Math.floor(newThickness)
                                };
                                
                                if (depth < 6) {
                                    generateBranch(subBranch, depth + 1);
                                }
                            }
                        }
                        
                        // Add leaves when tree is mature enough
                        if (depth > 3 && this.age > 20) {
                            for (let i = 0; i < 3; i++) {
                                const lx = Math.floor(x + (this.random() - 0.5) * 3);
                                const ly = Math.floor(y + (this.random() - 0.5) * 3);
                                if (lx >= 0 && lx < this.width && ly >= 0 && ly < this.height) {
                                    if (!this.lines[ly]) this.lines[ly] = [];
                                    this.lines[ly][lx] = this.getLeafChar();
                                }
                            }
                        }
                    };

                    // Start generating from trunk
                    generateBranch(this.trunk, 0);
                }

                getCharForThickness(thickness) {
                    const chars = [' ', '│', '╎', '┃', '╏', '║'];
                    return chars[Math.min(thickness, chars.length - 1)] || '│';
                }

                getLeafChar() {
                    const leaves = ['*', '°', '•', '♦', '♣'];
                    return leaves[Math.floor(this.random() * leaves.length)] || '*';
                }

                grow() {
                    this.age++;
                    if (this.age > this.maxAge) {
                        this.growing = false;
                        return;
                    }
                    
                    // Regenerate the tree with slight variations
                    this.lines = [];
                    this.branches = [];
                    this.trunk.length = Math.min(10, 6 + this.age * 0.1);
                    this.branches.push(this.trunk);
                    this.generateTree();
                }

                render() {
                    let output = '';
                    for (let y = 0; y < this.height; y++) {
                        for (let x = 0; x < this.width; x++) {
                            const char = this.lines[y]?.[x] || ' ';
                            output += char;
                        }
                        output += '\n';
                    }
                    
                    // Add message if provided
                    if (message) {
                        const padding = Math.floor((this.width - message.length) / 2);
                        output += '\n' + ' '.repeat(Math.max(0, padding)) + message;
                    }
                    
                    // Add age information
                    if (liveMode) {
                        const ageInfo = `Age: ${this.age}`;
                        const padding = Math.floor((this.width - ageInfo.length) / 2);
                        output += '\n' + ' '.repeat(Math.max(0, padding)) + ageInfo;
                    }
                    
                    return output;
                }

                isComplete() {
                    return !this.growing;
                }
            }

            // Initialize the bonsai
            const bonsai = new BonsaiTree();
            let animationRunning = true;
            
            // Display initial tree
            pre.textContent = bonsai.render();

            // Animation loop for live mode or growth
            let intervalId = null;
            
            const growStep = () => {
                if (!animationRunning || !overlay.parentNode) {
                    cleanupCbonsai();
                    return;
                }
                
                if (!bonsai.isComplete()) {
                    bonsai.grow();
                    pre.textContent = bonsai.render();
                } else if (!infinite) {
                    // Tree is complete, stop growing
                    cleanupCbonsai();
                    return;
                }
            };

            // Wait before starting if specified
            if (waitTime > 0) {
                setTimeout(() => {
                    if (liveMode || infinite) {
                        intervalId = setInterval(growStep, timeStep * 1000);
                    } else {
                        // Grow to completion
                        while (!bonsai.isComplete()) {
                            bonsai.grow();
                        }
                        pre.textContent = bonsai.render();
                    }
                }, waitTime * 1000);
            } else {
                if (liveMode || infinite) {
                    intervalId = setInterval(growStep, timeStep * 1000);
                } else {
                    // Grow to completion
                    while (!bonsai.isComplete()) {
                        bonsai.grow();
                    }
                    pre.textContent = bonsai.render();
                }
            }

            const cleanupCbonsai = () => {
                if (!animationRunning) return;
                animationRunning = false;
                if (intervalId) {
                    clearInterval(intervalId);
                }
                window.removeEventListener('keydown', keyListener, true);
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            };

            const keyListener = (e) => {
                e.preventDefault();
                e.stopPropagation();
                cleanupCbonsai();
                targetTerminal.cmdInput.focus();
            };

            window.addEventListener('keydown', keyListener, { capture: true });
            overlay.addEventListener('click', () => {
                cleanupCbonsai();
                targetTerminal.cmdInput.focus();
            });

            targetTerminal.registerProcess('cbonsai', cleanupCbonsai);
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'cbonsai', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['cbonsai'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\ncbonsai\n\nwhat is it used for?\nGrows an ASCII bonsai tree in your terminal.";
        },
        configurable: true
    });
}