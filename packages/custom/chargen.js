window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['pwgen'] = {
    name: 'pwgen',
    description: 'Generate secure random passwords',
    preInstalledOn: ['default'],
    translations: {
        en: {
            pwgenUsage: "Usage: pwgen [ OPTIONS ] [ pw_length ] [ num_pw ]",
            pwgenHelp: "Usage: pwgen [ OPTIONS ] [ pw_length ] [ num_pw ]\n\nOptions:\n  -c, --capitalize     Include at least one capital letter\n  -A, --no-capitalize  Do not include capital letters\n  -n, --numerals       Include at least one number\n  -0, --no-numerals    Do not include numbers\n  -y, --symbols        Include at least one symbol\n  -s, --secure         Generate completely random passwords\n  -B, --ambiguous      Avoid ambiguous characters\n  -1, --one-per-line   Print one password per line\n  -C, --columns        Print passwords in columns\n  -o, --output         Output to specific terminal instance (e.g., -o 2)\n  -h, --help           Show this help",
            invalidLength: "pwgen: invalid password length '{0}'",
            invalidCount: "pwgen: invalid password count '{0}'",
            invalidOption: "pwgen: invalid option '{0}'",
            invalidTerminal: "pwgen: terminal instance '{0}' not found",
            outputToTerminal: "Outputting to terminal instance {0}"
        },
        de: {
            pwgenUsage: "Verwendung: pwgen [ OPTIONEN ] [ länge ] [ anzahl ]",
            pwgenHelp: "Verwendung: pwgen [ OPTIONEN ] [ länge ] [ anzahl ]\n\nOptionen:\n  -c, --capitalize     Mindestens einen Großbuchstaben verwenden\n  -A, --no-capitalize  Keine Großbuchstaben verwenden\n  -n, --numerals       Mindestens eine Zahl verwenden\n  -0, --no-numerals    Keine Zahlen verwenden\n  -y, --symbols        Mindestens ein Symbol verwenden\n  -s, --secure         Vollständig zufällige Passwörter erzeugen\n  -B, --ambiguous      Mehrdeutige Zeichen vermeiden\n  -1, --one-per-line   Ein Passwort pro Zeile ausgeben\n  -C, --columns        Passwörter in Spalten ausgeben\n  -o, --output         Ausgabe in bestimmte Terminal-Instanz (z.B. -o 2)\n  -h, --help           Diese Hilfe anzeigen",
            invalidLength: "pwgen: Ungültige Passwortlänge '{0}'",
            invalidCount: "pwgen: Ungültige Passwortanzahl '{0}'",
            invalidOption: "pwgen: Ungültige Option '{0}'",
            invalidTerminal: "pwgen: Terminal-Instanz '{0}' nicht gefunden",
            outputToTerminal: "Ausgabe in Terminal-Instanz {0}"
        },
        fr: {
            pwgenUsage: "Utilisation : pwgen [ OPTIONS ] [ longueur ] [ nombre ]",
            pwgenHelp: "Utilisation : pwgen [ OPTIONS ] [ longueur ] [ nombre ]\n\nOptions :\n  -c, --capitalize     Inclure une majuscule\n  -A, --no-capitalize  Ne pas inclure de majuscules\n  -n, --numerals       Inclure un chiffre\n  -0, --no-numerals    Ne pas inclure de chiffres\n  -y, --symbols        Inclure un symbole\n  -s, --secure         Generer des mots de passe completement aleatoires\n  -B, --ambiguous      Eviter les caracteres ambigus\n  -1, --one-per-line   Un mot de passe par ligne\n  -C, --columns        Afficher en colonnes\n  -o, --output         Sortie vers une instance terminal specifique (ex: -o 2)\n  -h, --help           Afficher cette aide",
            invalidLength: "pwgen: longueur de mot de passe invalide '{0}'",
            invalidCount: "pwgen: nombre de mots de passe invalide '{0}'",
            invalidOption: "pwgen: option invalide '{0}'",
            invalidTerminal: "pwgen: instance terminal '{0}' introuvable",
            outputToTerminal: "Sortie vers l'instance terminal {0}"
        },
        it: {
            pwgenUsage: "Uso: pwgen [ OPZIONI ] [ lunghezza ] [ numero ]",
            pwgenHelp: "Uso: pwgen [ OPZIONI ] [ lunghezza ] [ numero ]\n\nOpzioni:\n  -c, --capitalize     Includi almeno una maiuscola\n  -A, --no-capitalize  Non usare maiuscole\n  -n, --numerals       Includi almeno un numero\n  -0, --no-numerals    Non usare numeri\n  -y, --symbols        Includi almeno un simbolo\n  -s, --secure         Genera password completamente casuali\n  -B, --ambiguous      Evita caratteri ambigui\n  -1, --one-per-line   Una password per riga\n  -C, --columns        Stampa in colonne\n  -o, --output         Output verso istanza terminale specifica (es: -o 2)\n  -h, --help           Mostra questo aiuto",
            invalidLength: "pwgen: lunghezza password non valida '{0}'",
            invalidCount: "pwgen: conteggio password non valido '{0}'",
            invalidOption: "pwgen: opzione non valida '{0}'",
            invalidTerminal: "pwgen: istanza terminale '{0}' non trovata",
            outputToTerminal: "Output verso l'istanza terminale {0}"
        },
        tr: {
            pwgenUsage: "Kullanim: pwgen [ SECENEKLER ] [ uzunluk ] [ adet ]",
            pwgenHelp: "Kullanim: pwgen [ SECENEKLER ] [ uzunluk ] [ adet ]\n\nSecenekler:\n  -c, --capitalize     En az bir buyuk harf ekle\n  -A, --no-capitalize  Buyuk harf kullanma\n  -n, --numerals       En az bir rakam ekle\n  -0, --no-numerals    Rakam kullanma\n  -y, --symbols        En az bir sembol ekle\n  -s, --secure         Tamamen rastgele parola uret\n  -B, --ambiguous      Belirsiz karakterlerden kacın\n  -1, --one-per-line   Her satira bir parola\n  -C, --columns        Sutunlar halinde yazdir\n  -o, --output         Belirli bir terminal ornegine cikti (ornegin: -o 2)\n  -h, --help           Bu yardimi goster",
            invalidLength: "pwgen: geçersiz parola uzunluğu '{0}'",
            invalidCount: "pwgen: geçersiz parola adedi '{0}'",
            invalidOption: "pwgen: geçersiz seçenek '{0}'",
            invalidTerminal: "pwgen: terminal ornegi '{0}' bulunamadi",
            outputToTerminal: "Terminal ornegi {0}'a cikti veriliyor"
        }
    },
    commandInfo: {
        en: "what is this command?\npwgen [length] [count] [-s] [-n] [-o N]\n\nwhat is it used for?\nGenerates secure random passwords with options for length, symbols, and numbers. Use -o N to output to terminal instance N.",
        de: "Was ist dieser Befehl?\npwgen [länge] [anzahl] [-s] [-n] [-o N]\n\nWofür wird er verwendet?\nErstellt sichere Passwörter mit Optionen für Länge, Symbole und Zahlen. Verwenden Sie -o N für die Ausgabe in Terminal-Instanz N.",
        fr: "Qu'est-ce que cette commande ?\npwgen [longueur] [nombre] [-s] [-n] [-o N]\n\nA quoi sert-elle ?\nGénère des mots de passe aléatoires sécurisés avec des options de longueur, symboles et chiffres. Utilisez -o N pour la sortie vers l'instance terminal N.",
        it: "Cos'è questo comando?\npwgen [lunghezza] [conteggio] [-s] [-n] [-o N]\n\nA cosa serve?\nGenera password casuali sicure con opzioni per lunghezza, simboli e numeri. Usa -o N per l'output verso l'istanza terminale N.",
        tr: "Bu komut nedir?\npwgen [uzunluk] [adet] [-s] [-n] [-o N]\n\nNe işe yarar?\nUzunluk, sembol ve sayı seçenekleriyle güvenli rastgele parolalar üretir. Çıktı için -o N kullanın (N terminal örneği)."
    },
    commands: {
        pwgen: function(args) {
            const options = {
                capitalize: null,
                numerals: null,
                symbols: false,
                secure: false,
                ambiguous: false,
                onePerLine: false,
                columns: false,
                numberOfPasswords: null,
                outputTerminal: null
            };
            const positional = [];
            const longOptions = {
                '--capitalize': 'c', '--no-capitalize': 'A', '--numerals': 'n',
                '--no-numerals': '0', '--symbols': 'y', '--secure': 's',
                '--ambiguous': 'B', '--one-per-line': '1', '--columns': 'C'
            };
            const shortOptions = {
                c: () => { options.capitalize = true; },
                A: () => { options.capitalize = false; },
                n: () => { options.numerals = true; },
                0: () => { options.numerals = false; },
                y: () => { options.symbols = true; },
                s: () => { options.secure = true; },
                B: () => { options.ambiguous = true; },
                1: () => { options.onePerLine = true; },
                C: () => { options.columns = true; }
            };

            const rawArgs = args || [];
            for (let argIndex = 0; argIndex < rawArgs.length; argIndex++) {
                const arg = rawArgs[argIndex];
                if (arg === '--') { positional.push(...rawArgs.slice(argIndex + 1)); break; }
                if (arg === '-h' || arg === '--help') {
                    this.printTranslatable('pwgenHelp');
                    return;
                }
                if (arg === '-N' || arg === '--num-passwords') {
                    const value = rawArgs[++argIndex];
                    if (value === undefined) {
                        this.printTranslatable('invalidCount', 'error', false, ['']);
                        return;
                    }
                    options.numberOfPasswords = value;
                    continue;
                }
                if (arg.startsWith('--num-passwords=')) {
                    options.numberOfPasswords = arg.substring('--num-passwords='.length);
                    continue;
                }
                // Handle -o option
                if (arg === '-o' || arg === '--output') {
                    const value = rawArgs[++argIndex];
                    if (value === undefined) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    options.outputTerminal = parseInt(value);
                    if (isNaN(options.outputTerminal) || options.outputTerminal < 0) {
                        this.printTranslatable('invalidOption', 'error', false, [arg + ' ' + value]);
                        return;
                    }
                    continue;
                }
                if (arg.startsWith('--output=')) {
                    const value = arg.substring('--output='.length);
                    options.outputTerminal = parseInt(value);
                    if (isNaN(options.outputTerminal) || options.outputTerminal < 0) {
                        this.printTranslatable('invalidOption', 'error', false, [arg]);
                        return;
                    }
                    continue;
                }
                if (longOptions[arg]) {
                    shortOptions[longOptions[arg]]();
                    continue;
                }
                if (arg.startsWith('--')) {
                    this.printTranslatable('invalidOption', 'error', false, [arg]);
                    return;
                }
                if (arg.startsWith('-') && arg.length > 1) {
                    for (const option of arg.slice(1)) {
                        if (!shortOptions[option]) {
                            this.printTranslatable('invalidOption', 'error', false, [`-${option}`]);
                            return;
                        }
                        shortOptions[option]();
                    }
                    continue;
                }
                positional.push(arg);
            }

            // Default: length=8, count=16 (4 lines x 4 passwords)
            const length = positional.length > 0 ? Number(positional[0]) : 8;
            const positionalCount = positional.length > 1 ? Number(positional[1]) : 16; // Changed default to 16
            const count = options.numberOfPasswords !== null ? Number(options.numberOfPasswords) : positionalCount;
            if (!/^\d+$/.test(String(positional[0] ?? length)) || length < 4 || length > 128) {
                this.printTranslatable('invalidLength', 'error', false, [positional[0] ?? length]);
                return;
            }
            if (!/^\d+$/.test(String(positional[1] ?? count)) || count < 1 || count > 1000) {
                this.printTranslatable('invalidCount', 'error', false, [options.numberOfPasswords ?? positional[1] ?? count]);
                return;
            }
            if (positional.length > 2) {
                this.printTranslatable('pwgenUsage', 'error');
                return;
            }

            // Find the target terminal if -o is specified
            let targetTerminal = this;
            if (options.outputTerminal !== null) {
                const allTerminals = [];
                if (typeof tabs !== 'undefined') {
                    tabs.forEach(tab => {
                        tab.terminals.forEach(term => {
                            allTerminals.push(term);
                        });
                    });
                }
                
                // Terminal index is 1-based (e.g., -o 2 means the second terminal)
                if (options.outputTerminal >= 1 && options.outputTerminal <= allTerminals.length) {
                    targetTerminal = allTerminals[options.outputTerminal - 1];
                    targetTerminal.printTranslatable('outputToTerminal', '', false, [options.outputTerminal]);
                } else {
                    this.printTranslatable('invalidTerminal', 'error', false, [options.outputTerminal]);
                    return;
                }
            }

            const randomIndex = (max) => {
                const values = new Uint32Array(1);
                crypto.getRandomValues(values);
                return Math.floor((values[0] / 4294967296) * max);
            };
            const lower = 'abcdefghijklmnopqrstuvwxyz';
            const upper = options.capitalize === false ? '' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numerals = options.numerals === false ? '' : '0123456789';
            const symbols = options.symbols ? '!@#$%^&*()-_=+[]{}:,.?/' : '';
            const ambiguous = 'Il1O0o|`\'"';
            const filterAmbiguous = (value) => options.ambiguous ? [...value].filter(char => !ambiguous.includes(char)).join('') : value;
            const pools = [filterAmbiguous(lower), filterAmbiguous(upper), filterAmbiguous(numerals), filterAmbiguous(symbols)].filter(Boolean);
            const requiredPools = [
                options.capitalize === true ? filterAmbiguous(upper) : '',
                options.numerals === true ? filterAmbiguous(numerals) : '',
                options.symbols === true ? filterAmbiguous(symbols) : ''
            ].filter(Boolean);
            const charset = pools.join('');
            const results = [];

            for (let passwordNumber = 0; passwordNumber < count; passwordNumber++) {
                const chars = requiredPools.map(pool => pool[randomIndex(pool.length)]);
                while (chars.length < length) chars.push(charset[randomIndex(charset.length)]);
                for (let index = chars.length - 1; index > 0; index--) {
                    const swapIndex = randomIndex(index + 1);
                    [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
                }
                results.push(chars.slice(0, length).join(''));
            }

            // Output to the target terminal
            if (options.onePerLine) {
                targetTerminal.print(results.join('\n'));
            } else {
                // Default: 4 columns (4 passwords per line)
                const columns = Math.max(1, Math.floor(80 / (length + 2)));
                const lines = [];
                for (let index = 0; index < results.length; index += columns) {
                    lines.push(results.slice(index, index + columns).join('  '));
                }
                targetTerminal.print(lines.join('\n'));
            }
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'pwgen', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['pwgen'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\npwgen\n\nwhat is it used for?\nGenerates secure random passwords.";
        },
        configurable: true
    });
}