window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['ls'] = {
    name: 'ls',
    description: 'List directory contents',
    preInstalledOn: ['default'],
    translations: {
        en: {
            lsUsage: "ls: usage: ls [dir]"
        },
        de: {
            lsUsage: "ls: Verwendung: ls [verzeichnis]"
        },
        fr: {
            lsUsage: "ls: utilisation: ls [dossier]"
        },
        it: {
            lsUsage: "ls: uso: ls [directory]"
        },
        tr: {
            lsUsage: "ls: kullanım: ls [dizin]"
        }
    },
    commandInfo: {
        en: "what is this command?\nls [dir]\n\nwhat is it used for?\nLists directory contents, files, and folders.",
        de: "Was ist dieser Befehl?\nls [verzeichnis]\n\nWofür wird er verwendet?\nListet Verzeichnisinhalte, Dateien und Ordner auf.",
        fr: "Qu'est-ce que cette commande ?\nls [dossier]\n\nA quoi sert-elle ?\nListe le contenu d'un dossier, fichiers et dossiers.",
        it: "Cos'è questo comando?\nls [directory]\n\nA cosa serve?\nElenca il contenuto della directory, file e cartelle.",
        tr: "Bu komut nedir?\nls [dizin]\n\nNe işe yarar?\nDizin içeriğini, dosyaları ve klasörleri listeler."
    },
    commands: {
        ls: function(args) {
            let targetPath = args && args.length > 0 ? args[0] : null;
            let targetArr = targetPath ? this.getAbsolutePathArray(targetPath) : [...this.currentPath];
            let node = this.getNodeByPathArray(targetArr);

            if (!node) {
                this.print(`ls: ${targetPath}: No such file or directory`, 'error');
                return;
            }

            if (node.type !== 'dir') {
                this.print(targetPath);
                return;
            }

            const children = node.children || {};
            const names = Object.keys(children).sort();

            if (names.length === 0) return;

            let outputParts = [];
            for (let name of names) {
                let child = children[name];
                let isDir = child.type === 'dir';
                let desc = child.description || '';
                if (isDir) {
                    outputParts.push(`<span class="dir-color os-item" data-type="dir" data-name="${name}" data-desc="${desc}">${name}/</span>`);
                } else {
                    outputParts.push(`<span class="os-item" data-type="file" data-name="${name}" data-desc="${desc}">${name}</span>`);
                }
            }

            this.printHTML(outputParts.join('  ') + '<br>');
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'ls', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['ls'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\nls [dir]\n\nwhat is it used for?\nLists directory contents.";
        },
        configurable: true
    });
}
