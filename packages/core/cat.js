window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['cat'] = {
    name: 'cat',
    description: 'Concatenate files and print on the standard output',
    preInstalledOn: ['default'],
    translations: {
        en: {
            catUsage: "cat: usage: cat <file>",
            fileNotFound: "cat: {0}: No such file or directory",
            isADirectory: "cat: {0}: Is a directory"
        },
        de: {
            catUsage: "cat: Verwendung: cat <datei>",
            fileNotFound: "cat: {0}: Keine solche Datei oder kein solches Verzeichnis",
            isADirectory: "cat: {0}: Ist ein Verzeichnis"
        },
        fr: {
            catUsage: "cat: utilisation: cat <fichier>",
            fileNotFound: "cat: {0}: Aucun fichier ou dossier de ce type",
            isADirectory: "cat: {0}: C'est un dossier"
        },
        it: {
            catUsage: "cat: uso: cat <file>",
            fileNotFound: "cat: {0}: Nessun file o directory",
            isADirectory: "cat: {0}: È una directory"
        },
        tr: {
            catUsage: "cat: kullanım: cat <dosya>",
            fileNotFound: "cat: {0}: Böyle bir dosya veya dizin yok",
            isADirectory: "cat: {0}: Bir dizin"
        }
    },
    commandInfo: {
        en: "what is this command?\ncat <file>\n\nwhat is it used for?\nConcatenates and displays file contents to standard output.",
        de: "Was ist dieser Befehl?\ncat <datei>\n\nWofür wird er verwendet?\nFührt Dateinhalte zusammen und gibt sie auf der Standardausgabe aus.",
        fr: "Qu'est-ce que cette commande ?\ncat <fichier>\n\nA quoi sert-elle ?\nConcatène et affiche le contenu des fichiers sur la sortie standard.",
        it: "Cos'è questo comando?\ncat <file>\n\nA cosa serve?\nConcatena e visualizza il contenuto dei file sullo standard output.",
        tr: "Bu komut nedir?\ncat <dosya>\n\nNe işe yarar?\nDosya içeriklerini birleştirir ve standart çıktıya yansıtır."
    },
    commands: {
        cat: function(args) {
            if (!args || args.length === 0) {
                this.printTranslatable("cat: usage: cat <file>", 'error', false);
                return;
            }

            const filePath = args[0];
            const arr = this.getAbsolutePathArray(filePath);
            const node = this.getNodeByPathArray(arr);

            if (!node) {
                this.printTranslatable("cat: {0}: No such file or directory", 'error', false, [filePath]);
                return;
            }

            if (node.type === 'dir') {
                this.printTranslatable("cat: {0}: Is a directory", 'error', false, [filePath]);
                return;
            }

            if (node.content !== undefined) {
                this.print(node.content);
            }
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'cat', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['cat'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\ncat <file>\n\nwhat is it used for?\nConcatenates and displays file contents to standard output.";
        },
        configurable: true
    });
}
