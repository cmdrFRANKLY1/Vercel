window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['touch'] = {
    name: 'touch',
    description: 'Create empty file(s) or update modification timestamps',
    preInstalledOn: ['default'],
    translations: {
        en: {
            touchUsage: "touch: usage: touch [file...]",
            noSuchFileOrDir: "touch: cannot touch '{0}': No such file or directory",
            isADirectory: "touch: cannot touch '{0}': Is a directory"
        },
        de: {
            touchUsage: "touch: Verwendung: touch [datei...]",
            noSuchFileOrDir: "touch: '{0}' kann nicht berührt werden: Keine solche Datei oder kein solches Verzeichnis",
            isADirectory: "touch: '{0}' kann nicht berührt werden: Ist ein Verzeichnis"
        },
        fr: {
            touchUsage: "touch: utilisation: touch [fichier...]",
            noSuchFileOrDir: "touch: impossible de toucher '{0}': Aucun fichier ou dossier de ce type",
            isADirectory: "touch: impossible de toucher '{0}': C'est un dossier"
        },
        it: {
            touchUsage: "touch: uso: touch [file...]",
            noSuchFileOrDir: "touch: impossibile toccare '{0}': Nessun file o directory",
            isADirectory: "touch: impossibile toccare '{0}': È una directory"
        },
        tr: {
            touchUsage: "touch: kullanım: touch [dosya...]",
            noSuchFileOrDir: "touch: '{0}' dosyasına dokunulamıyor: Böyle bir dosya veya dizin yok",
            isADirectory: "touch: '{0}' dosyasına dokunulamıyor: Bir dizin"
        }
    },
    commandInfo: {
        en: "what is this command?\ntouch [file...]\n\nwhat is it used for?\nCreates empty files or updates existing file modification timestamps.",
        de: "Was ist dieser Befehl?\ntouch [datei...]\n\nWofür wird er verwendet?\nErstellt leere Dateien oder aktualisiert Zeitstempel.",
        fr: "Qu'est-ce que cette commande ?\ntouch [fichier...]\n\nA quoi sert-elle ?\nCrée des fichiers vides ou met à jour les horodatages.",
        it: "Cos'è questo comando?\ntouch [file...]\n\nA cosa serve?\nCrea file vuoti o aggiorna i timestamp.",
        tr: "Bu komut nedir?\ntouch [dosya...]\n\nNe işe yarar?\nBoş dosyalar oluşturur veya zaman damgalarını günceller."
    },
    commands: {
        touch: function(args) {
            if (!args || args.length === 0) {
                this.printTranslatable("touch: usage: touch [file...]", 'error');
                return;
            }

            for (let targetPath of args) {
                const { parent, name } = this.getParentNodeAndTargetName(targetPath);

                if (!parent || parent.type !== 'dir') {
                    this.printTranslatable("touch: cannot touch '{0}': No such file or directory", 'error', false, [targetPath]);
                    continue;
                }

                if (parent.children[name] !== undefined) {
                    const targetNode = parent.children[name];
                    if (targetNode.type === 'dir') {
                        this.printTranslatable("touch: cannot touch '{0}': Is a directory", 'error', false, [targetPath]);
                        continue;
                    }
                    // Update timestamp simulation if it exists
                    targetNode.updatedAt = new Date().toISOString();
                } else {
                    // Create new empty file
                    parent.children[name] = {
                        type: 'file',
                        description: 'User created empty file.',
                        content: '',
                        createdAt: new Date().toISOString()
                    };
                }

                if (typeof saveVFS === 'function') {
                    saveVFS();
                }
            }
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'touch', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['touch'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\ntouch [file...]\n\nwhat is it used for?\nCreates empty files.";
        },
        configurable: true
    });
}
