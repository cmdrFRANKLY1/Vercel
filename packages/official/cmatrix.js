window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['cmatrix'] = {
    name: 'cmatrix',
    description: 'Simulate the falling matrix code screensaver in the terminal',
    preInstalledOn: ['default'],
    translations: {
        en: { 
            cmatrixUsage: "cmatrix: usage: cmatrix [-abBfls] [-u delay] [-C color] [-o terminal]",
            cmatrixHelp: "Usage: cmatrix [OPTIONS]\n\nOptions:\n  -a, --ascii         Use ASCII characters only\n  -b, --bold          Use bold characters\n  -B, --no-bold       Disable bold characters\n  -f, --flip          Flip the rain direction (rain falls up)\n  -l, --loop          Loop mode (restart when reaching bottom)\n  -s, --slow          Slow mode (doubles the delay)\n  -u, --delay DELAY   Set delay in milliseconds (default: 50, min: 10)\n  -C, --color COLOR   Set color (green, red, blue, white, yellow, cyan, magenta)\n  -o, --output N      Output to terminal instance N (e.g., -o 2)\n  -v, --version       Display version information\n  -h, --help          Show this help",
            cmatrixVersion: "cmatrix version 2.0.1",
            invalidOption: "cmatrix: invalid option '{0}'",
            invalidColor: "cmatrix: invalid color '{0}'",
            invalidDelay: "cmatrix: invalid delay value '{0}'",
            outputToTerminal: "Outputting to terminal instance {0}",
            invalidTerminal: "cmatrix: terminal instance '{0}' not found"
        },
        de: { 
            cmatrixUsage: "cmatrix: Verwendung: cmatrix [-abBfls] [-u verzögerung] [-C farbe] [-o terminal]",
            cmatrixHelp: "Verwendung: cmatrix [OPTIONEN]\n\nOptionen:\n  -a, --ascii         Nur ASCII-Zeichen verwenden\n  -b, --bold          Fette Zeichen verwenden\n  -B, --no-bold       Fette Zeichen deaktivieren\n  -f, --flip          Regenrichtung umkehren (Regen fällt nach oben)\n  -l, --loop          Schleifenmodus (Neustart bei Erreichen des Bodens)\n  -s, --slow          Langsamer Modus (verdoppelt die Verzögerung)\n  -u, --delay DELAY   Verzögerung in Millisekunden (Standard: 50, min: 10)\n  -C, --color FARBE   Farbe einstellen (green, red, blue, white, yellow, cyan, magenta)\n  -o, --output N      Ausgabe in Terminal-Instanz N (z.B. -o 2)\n  -v, --version       Versionsinformation anzeigen\n  -h, --help          Diese Hilfe anzeigen",
            invalidOption: "cmatrix: Ungültige Option '{0}'",
            invalidColor: "cmatrix: Ungültige Farbe '{0}'",
            invalidDelay: "cmatrix: Ungültiger Verzögerungswert '{0}'",
            outputToTerminal: "Ausgabe in Terminal-Instanz {0}",
            invalidTerminal: "cmatrix: Terminal-Instanz '{0}' nicht gefunden"
        },
        fr: { 
            cmatrixUsage: "cmatrix: utilisation: cmatrix [-abBfls] [-u délai] [-C couleur] [-o terminal]",
            cmatrixHelp: "Utilisation: cmatrix [OPTIONS]\n\nOptions:\n  -a, --ascii         Utiliser uniquement des caractères ASCII\n  -b, --bold          Utiliser des caractères gras\n  -B, --no-bold       Désactiver les caractères gras\n  -f, --flip          Inverser la direction de la pluie (pluie monte)\n  -l, --loop          Mode boucle (redémarre en atteignant le bas)\n  -s, --slow          Mode lent (double le délai)\n  -u, --delay DELAI   Définir le délai en millisecondes (défaut: 50, min: 10)\n  -C, --color COULEUR Définir la couleur (green, red, blue, white, yellow, cyan, magenta)\n  -o, --output N      Sortie vers l'instance terminal N (ex: -o 2)\n  -v, --version       Afficher les informations de version\n  -h, --help          Afficher cette aide",
            invalidOption: "cmatrix: option invalide '{0}'",
            invalidColor: "cmatrix: couleur invalide '{0}'",
            invalidDelay: "cmatrix: valeur de délai invalide '{0}'",
            outputToTerminal: "Sortie vers l'instance terminal {0}",
            invalidTerminal: "cmatrix: instance terminal '{0}' introuvable"
        },
        it: { 
            cmatrixUsage: "cmatrix: uso: cmatrix [-abBfls] [-u ritardo] [-C colore] [-o terminale]",
            cmatrixHelp: "Uso: cmatrix [OPZIONI]\n\nOpzioni:\n  -a, --ascii         Usa solo caratteri ASCII\n  -b, --bold          Usa caratteri in grassetto\n  -B, --no-bold       Disabilita caratteri in grassetto\n  -f, --flip          Inverti la direzione della pioggia (pioggia sale)\n  -l, --loop          Modalità loop (riavvia quando raggiunge il fondo)\n  -s, --slow          Modalità lenta (raddoppia il ritardo)\n  -u, --delay RITARDO Imposta ritardo in millisecondi (default: 50, min: 10)\n  -C, --color COLORE  Imposta colore (green, red, blue, white, yellow, cyan, magenta)\n  -o, --output N      Output verso l'istanza terminal N (es: -o 2)\n  -v, --version       Mostra informazioni versione\n  -h, --help          Mostra questo aiuto",
            invalidOption: "cmatrix: opzione non valida '{0}'",
            invalidColor: "cmatrix: colore non valido '{0}'",
            invalidDelay: "cmatrix: valore ritardo non valido '{0}'",
            outputToTerminal: "Output verso l'istanza terminale {0}",
            invalidTerminal: "cmatrix: istanza terminale '{0}' non trovata"
        },
        tr: { 
            cmatrixUsage: "cmatrix: kullanım: cmatrix [-abBfls] [-u gecikme] [-C renk] [-o terminal]",
            cmatrixHelp: "Kullanım: cmatrix [SECENEKLER]\n\nSecenekler:\n  -a, --ascii         Sadece ASCII karakterleri kullan\n  -b, --bold          Kalın karakterleri kullan\n  -B, --no-bold       Kalın karakterleri devre dışı bırak\n  -f, --flip          Yağmur yönünü ters çevir (yağmur yukarı düşer)\n  -l, --loop          Döngü modu (tabana ulaşınca yeniden başlat)\n  -s, --slow          Yavaş mod (gecikmeyi iki katına çıkar)\n  -u, --delay GECIKME Gecikmeyi milisaniye cinsinden ayarla (varsayılan: 50, min: 10)\n  -C, --color RENK    Renk ayarla (green, red, blue, white, yellow, cyan, magenta)\n  -o, --output N      Terminal örneği N'ye çıktı ver (ör: -o 2)\n  -v, --version       Sürüm bilgilerini göster\n  -h, --help          Bu yardımı göster",
            invalidOption: "cmatrix: geçersiz seçenek '{0}'",
            invalidColor: "cmatrix: geçersiz renk '{0}'",
            invalidDelay: "cmatrix: geçersiz gecikme değeri '{0}'",
            outputToTerminal: "Terminal örneği {0}'a çıktı veriliyor",
            invalidTerminal: "cmatrix: terminal örneği '{0}' bulunamadı"
        }
    },
    commandInfo: {
        en: "what is this command?\ncmatrix [OPTIONS]\n\nwhat is it used for?\nSimulates a falling matrix digital rain screensaver right inside your terminal window. Use -o N to output to terminal instance N.",
        de: "Was ist dieser Befehl?\ncmatrix [OPTIONEN]\n\nWofür wird er verwendet?\nSimuliert einen digitalen Matrix-Regen als Bildschirmschoner im Terminal. Verwenden Sie -o N für die Ausgabe in Terminal-Instanz N.",
        fr: "Qu'est-ce que cette commande ?\ncmatrix [OPTIONS]\n\nA quoi sert-elle ?\nSimule un écran de veille de pluie numérique Matrix directement dans votre terminal. Utilisez -o N pour la sortie vers l'instance terminal N.",
        it: "Cos'è questo comando?\ncmatrix [OPZIONI]\n\nA cosa serve?\nSimula un salvaschermo con pioggia digitale Matrix direttamente all'interno del terminale. Usa -o N per l'output verso l'istanza terminale N.",
        tr: "Bu komut nedir?\ncmatrix [SECENEKLER]\n\nNe işe yarar?\nTerminal pencerenizin içinde akan Matrix dijital yağmur ekran koruyucusunu simüle eder. Çıktı için -o N kullanın (N terminal örneği)."
    },
    commands: {
        cmatrix: function(args) {
            let color = 'green';
            let delay = 50;
            let outputTerminal = null;
            let showHelp = false;
            let showVersion = false;
            let asciiOnly = false;
            let bold = false;
            let noBold = false;
            let flip = false;
            let loop = false;
            let slow = false;

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
                
                // Color
                if (arg === '-C' || arg === '--color') {
                    if (i + 1 >= rawArgs.length) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    color = rawArgs[++i].toLowerCase();
                    const validColors = ['green', 'red', 'blue', 'white', 'yellow', 'cyan', 'magenta'];
                    if (!validColors.includes(color)) {
                        this.printTranslatable('invalidColor', 'error', false, [color]);
                        return;
                    }
                    continue;
                }
                
                // Delay
                if (arg === '-u' || arg === '--delay') {
                    if (i + 1 >= rawArgs.length) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    let parsedDelay = parseInt(rawArgs[++i]);
                    if (isNaN(parsedDelay) || parsedDelay < 10) {
                        this.printTranslatable('invalidDelay', 'error', false, [rawArgs[i]]);
                        return;
                    }
                    delay = parsedDelay;
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
                
                // ASCII only
                if (arg === '-a' || arg === '--ascii') {
                    asciiOnly = true;
                    continue;
                }
                
                // Bold
                if (arg === '-b' || arg === '--bold') {
                    bold = true;
                    noBold = false;
                    continue;
                }
                
                // No bold
                if (arg === '-B' || arg === '--no-bold') {
                    noBold = true;
                    bold = false;
                    continue;
                }
                
                // Flip
                if (arg === '-f' || arg === '--flip') {
                    flip = true;
                    continue;
                }
                
                // Loop
                if (arg === '-l' || arg === '--loop') {
                    loop = true;
                    continue;
                }
                
                // Slow
                if (arg === '-s' || arg === '--slow') {
                    slow = true;
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
                this.printTranslatable('cmatrixHelp');
                return;
            }
            if (showVersion) {
                this.printTranslatable('cmatrixVersion');
                return;
            }

            // Apply slow mode (double the delay)
            if (slow) {
                delay = delay * 2;
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
                
                // Terminal index is 1-based (e.g., -o 2 means the second terminal)
                if (outputTerminal >= 1 && outputTerminal <= allTerminals.length) {
                    targetTerminal = allTerminals[outputTerminal - 1];
                    targetTerminal.printTranslatable('outputToTerminal', '', false, [outputTerminal]);
                } else {
                    this.printTranslatable('invalidTerminal', 'error', false, [outputTerminal]);
                    return;
                }
            }

            const container = targetTerminal.el;
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

            const canvas = document.createElement('canvas');
            canvas.style.display = 'block';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            overlay.appendChild(canvas);
            container.appendChild(overlay);

            const ctx = canvas.getContext('2d');
            let width = (canvas.width = container.clientWidth);
            let height = (canvas.height = container.clientHeight);

            const handleResize = () => {
                if (!canvas.parentNode) return;
                width = canvas.width = container.clientWidth;
                height = canvas.height = container.clientHeight;
            };
            window.addEventListener('resize', handleResize);

            const fontSize = 16;
            const columns = Math.floor(width / fontSize);
            
            const drops = [];
            const speeds = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -100);
                speeds[i] = Math.random() * 0.7 + 0.3;
            }

            // Character set based on -a flag
            let chars;
            if (asciiOnly) {
                chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
            } else {
                chars = "ｦｱｳｴｵｶｷｹｺｻシスセソﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }

            let colorMap = {
                green: '#00ff66',
                red: '#ff0033',
                blue: '#0066ff',
                white: '#ffffff',
                yellow: '#ffff00',
                cyan: '#00ffff',
                magenta: '#ff00ff'
            };
            let primaryColor = colorMap[color] || colorMap['green'];

            let animationRunning = true;
            let resetCounter = 0;
            
            const draw = () => {
                if (!animationRunning || !canvas.parentNode) return;

                ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
                ctx.fillRect(0, 0, width, height);

                // Apply bold if requested
                let fontStyle = `${fontSize}px monospace`;
                if (bold) {
                    ctx.font = `bold ${fontSize}px monospace`;
                } else if (noBold) {
                    ctx.font = `${fontSize}px monospace`;
                } else {
                    ctx.font = `bold ${fontSize}px monospace`; // default bold
                }

                // Apply flip direction
                const direction = flip ? -1 : 1;

                for (let i = 0; i < drops.length; i++) {
                    const text = chars.charAt(Math.floor(Math.random() * chars.length));
                    const x = i * fontSize;
                    const y = Math.floor(drops[i]) * fontSize;

                    // Authentic visual: Color the *previous* character in the primary color (fixes the tail)
                    ctx.fillStyle = primaryColor;
                    ctx.fillText(text, x, y - (fontSize * direction));

                    // Authentic visual: Draw the *new* leading character in white
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(text, x, y);

                    // Reset conditions with loop support
                    if (direction === 1) {
                        // Falling down (normal)
                        if (y > height && (Math.random() > 0.975 || loop)) {
                            if (loop) {
                                drops[i] = 0;
                            } else {
                                drops[i] = 0;
                            }
                            speeds[i] = Math.random() * 0.7 + 0.3;
                        }
                        drops[i] += speeds[i];
                    } else {
                        // Falling up (flip)
                        if (y < -fontSize && (Math.random() > 0.975 || loop)) {
                            if (loop) {
                                drops[i] = height / fontSize;
                            } else {
                                drops[i] = height / fontSize;
                            }
                            speeds[i] = Math.random() * 0.7 + 0.3;
                        }
                        drops[i] -= speeds[i];
                    }
                }
            };

            const intervalId = setInterval(draw, delay);

            const cleanupCmatrix = () => {
                if (!animationRunning) return;
                animationRunning = false;
                clearInterval(intervalId);
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('keydown', keyListener, true);
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            };

            const keyListener = (e) => {
                e.preventDefault();
                e.stopPropagation();
                cleanupCmatrix();
                targetTerminal.cmdInput.focus();
            };

            window.addEventListener('keydown', keyListener, { capture: true });
            overlay.addEventListener('click', () => {
                cleanupCmatrix();
                targetTerminal.cmdInput.focus();
            });

            targetTerminal.registerProcess('cmatrix', cleanupCmatrix);
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'cmatrix', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['cmatrix'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\ncmatrix\n\nwhat is it used for?\nSimulates the matrix digital rain screensaver.";
        },
        configurable: true
    });
}