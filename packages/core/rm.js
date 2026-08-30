window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['rm'] = {
    name: 'rm',
    description: 'Remove files or directories',
    preInstalledOn: ['default'],
    translations: {
        en: {
            rmUsage: "rm: usage: rm [-rf] [file...]",
            noSuchFileOrDir: "rm: cannot remove '{0}': No such file or directory",
            isADirectory: "rm: cannot remove '{0}': Is a directory (use -r)"
        },
        de: {
            rmUsage: "rm: Verwendung: rm [-rf] [datei...]",
            noSuchFileOrDir: "rm: '{0}' kann nicht entfernt werden: Keine solche Datei oder kein solches Verzeichnis",
            isADirectory: "rm: '{0}' kann nicht entfernt werden: Ist ein Verzeichnis (verwenden Sie -r)"
        },
        fr: {
            rmUsage: "rm: utilisation: rm [-rf] [fichier...]",
            noSuchFileOrDir: "rm: impossible de supprimer '{0}': Aucun fichier ou dossier de ce type",
            isADirectory: "rm: impossible de supprimer '{0}': C'est un dossier (utilisez -r)"
        },
        it: {
            rmUsage: "rm: uso: rm [-rf] [file...]",
            noSuchFileOrDir: "rm: impossibile rimuovere '{0}': Nessun file o directory",
            isADirectory: "rm: impossibile rimuovere '{0}': È una directory (usa -r)"
        },
        tr: {
            rmUsage: "rm: kullanım: rm [-rf] [dosya...]",
            noSuchFileOrDir: "rm: '{0}' silinemiyor: Böyle bir dosya veya dizin yok",
            isADirectory: "rm: '{0}' silinemiyor: Bir dizin (-r kullanın)"
        }
    },
    commandInfo: {
        en: "what is this command?\nrm [-rf] [file...]\n\nwhat is it used for?\nRemoves (deletes) files or directories from the virtual file system.",
        de: "Was ist dieser Befehl?\nrm [-rf] [datei...]\n\nWofür wird er verwendet?\nEntfernt (löscht) Dateien oder Verzeichnisse aus dem virtuellen Dateisystem.",
        fr: "Qu'est-ce que cette commande ?\nrm [-rf] [fichier...]\n\nA quoi sert-elle ?\nSupprime des fichiers ou des dossiers du système de fichiers virtuel.",
        it: "Cos'è questo comando?\nrm [-rf] [file...]\n\nA cosa serve?\nRimuove (elimina) file o directory dal file system virtuale.",
        tr: "Bu komut nedir?\nrm [-rf] [dosya...]\n\nNe işe yarar?\nSanal dosya sisteminden dosyaları veya dizinleri kaldırır (siler)."
    },
    commands: {
        rm: function(args) {
            if (!args || args.length === 0) {
                this.printTranslatable("rm: usage: rm [-rf] [file...]", 'error');
                return;
            }

            let recursive = false;
            let targetArgs = [];

            for (let arg of args) {
                if (arg.startsWith('-')) {
                    if (arg.includes('r') || arg.includes('R') || arg.includes('f')) {
                        recursive = true;
                    }
                } else {
                    targetArgs.push(arg);
                }
            }

            if (targetArgs.length === 0) {
                this.printTranslatable("rm: usage: rm [-rf] [file...]", 'error');
                return;
            }

            for (let targetPath of targetArgs) {
                const { parent, name } = this.getParentNodeAndTargetName(targetPath);

                if (!parent || parent.type !== 'dir' || parent.children[name] === undefined) {
                    this.printTranslatable("rm: cannot remove '{0}': No such file or directory", 'error', false, [targetPath]);
                    continue;
                }

                const targetNode = parent.children[name];
                if (targetNode.type === 'dir' && !recursive) {
                    this.printTranslatable("rm: cannot remove '{0}': Is a directory (use -r)", 'error', false, [targetPath]);
                    continue;
                }

                delete parent.children[name];

                if (typeof saveVFS === 'function') {
                    saveVFS();
                }
            }
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'rm', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['rm'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\nrm [file...]\n\nwhat is it used for?\nRemoves files or directories.";
        },
        configurable: true
    });
}
