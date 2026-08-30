window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['mkdir'] = {
    name: 'mkdir',
    description: 'Create the directory(ies), if they do not already exist',
    preInstalledOn: ['default'],
    translations: {
        en: {
            mkdirUsage: "mkdir: usage: mkdir [directory...]",
            fileOrDirExists: "mkdir: cannot create directory '{0}': File exists",
            noSuchFileOrDir: "mkdir: cannot create directory '{0}': No such file or directory"
        },
        de: {
            mkdirUsage: "mkdir: Verwendung: mkdir [verzeichnis...]",
            fileOrDirExists: "mkdir: Verzeichnis '{0}' kann nicht erstellt werden: Datei existiert bereits",
            noSuchFileOrDir: "mkdir: Verzeichnis '{0}' kann nicht erstellt werden: Keine solche Datei oder kein solches Verzeichnis"
        },
        fr: {
            mkdirUsage: "mkdir: utilisation: mkdir [dossier...]",
            fileOrDirExists: "mkdir: impossible de créer le dossier '{0}': Le fichier existe",
            noSuchFileOrDir: "mkdir: impossible de créer le dossier '{0}': Aucun fichier ou dossier de ce type"
        },
        it: {
            mkdirUsage: "mkdir: uso: mkdir [directory...]",
            fileOrDirExists: "mkdir: impossibile creare la directory '{0}': Il file esiste",
            noSuchFileOrDir: "mkdir: impossibile creare la directory '{0}': Nessun file o directory"
        },
        tr: {
            mkdirUsage: "mkdir: kullanım: mkdir [dizin...]",
            fileOrDirExists: "mkdir: '{0}' dizini oluşturulamıyor: Dosya mevcut",
            noSuchFileOrDir: "mkdir: '{0}' dizini oluşturulamıyor: Böyle bir dosya veya dizin yok"
        }
    },
    commandInfo: {
        en: "what is this command?\nmkdir [dir...]\n\nwhat is it used for?\nCreates new directories at the specified paths.",
        de: "Was ist dieser Befehl?\nmkdir [verzeichnis...]\n\nWofür wird er verwendet?\nErstellt neue Verzeichnisse an den angegebenen Pfaden.",
        fr: "Qu'est-ce que cette commande ?\nmkdir [dossier...]\n\nA quoi sert-elle ?\nCrée de nouveaux dossiers aux emplacements spécifiés.",
        it: "Cos'è questo comando?\nmkdir [directory...]\n\nA cosa serve?\nCrea nuove directory nei percorsi specificati.",
        tr: "Bu komut nedir?\nmkdir [dizin...]\n\nNe işe yarar?\nBelirtilen yollarda yeni dizinler oluşturur."
    },
    commands: {
        mkdir: function(args) {
            if (!args || args.length === 0) {
                this.printTranslatable("mkdir: usage: mkdir [directory...]", 'error');
                return;
            }

            for (let dirPath of args) {
                const { parent, name } = this.getParentNodeAndTargetName(dirPath);

                if (!parent || parent.type !== 'dir') {
                    this.printTranslatable("mkdir: cannot create directory '{0}': No such file or directory", 'error', false, [dirPath]);
                    continue;
                }

                if (parent.children[name] !== undefined) {
                    this.printTranslatable("mkdir: cannot create directory '{0}': File exists", 'error', false, [dirPath]);
                    continue;
                }

                parent.children[name] = {
                    type: 'dir',
                    description: 'User created directory.',
                    children: {}
                };

                if (typeof saveVFS === 'function') {
                    saveVFS();
                }
            }
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'mkdir', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['mkdir'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\nmkdir [dir...]\n\nwhat is it used for?\nCreates new directories.";
        },
        configurable: true
    });
}
