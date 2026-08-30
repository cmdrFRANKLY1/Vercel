window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['cd'] = {
    name: 'cd',
    description: 'Change the shell working directory',
    preInstalledOn: ['default'],
    translations: {
        en: {
            cdUsage: "cd: usage: cd [dir]",
            notADirectory: "cd: {0}: Not a directory",
            noSuchFileOrDir: "cd: {0}: No such file or directory"
        },
        de: {
            cdUsage: "cd: Verwendung: cd [verzeichnis]",
            notADirectory: "cd: {0}: Kein Verzeichnis",
            noSuchFileOrDir: "cd: {0}: Keine solche Datei oder kein solches Verzeichnis"
        },
        fr: {
            cdUsage: "cd: utilisation: cd [dossier]",
            notADirectory: "cd: {0}: Ce n'est pas un dossier",
            noSuchFileOrDir: "cd: {0}: Aucun fichier ou dossier de ce type"
        },
        it: {
            cdUsage: "cd: uso: cd [directory]",
            notADirectory: "cd: {0}: Non è una directory",
            noSuchFileOrDir: "cd: {0}: Nessun file o directory"
        },
        tr: {
            cdUsage: "cd: kullanım: cd [dizin]",
            notADirectory: "cd: {0}: Bir dizin değil",
            noSuchFileOrDir: "cd: {0}: Böyle bir dosya veya dizin yok"
        }
    },
    commandInfo: {
        en: "what is this command?\ncd [dir]\n\nwhat is it used for?\nChanges the current working directory of the terminal shell.",
        de: "Was ist dieser Befehl?\ncd [verzeichnis]\n\nWofür wird er verwendet?\nÄndert das aktuelle Arbeitsverzeichnis des Terminals.",
        fr: "Qu'est-ce que cette commande ?\ncd [dossier]\n\nA quoi sert-elle ?\nModifie le dossier de travail actuel du terminal.",
        it: "Cos'è questo comando?\ncd [directory]\n\nA cosa serve?\nCambia la directory di lavoro corrente del terminale.",
        tr: "Bu komut nedir?\ncd [dizin]\n\nNe işe yarar?\nTerminalin mevcut çalışma dizinini değiştirir."
    },
    commands: {
        cd: function(args) {
            let targetPath = args && args.length > 0 ? args[0] : '~';
            const newPathArr = this.getAbsolutePathArray(targetPath);
            const node = this.getNodeByPathArray(newPathArr);

            if (!node) {
                this.printTranslatable("cd: {0}: No such file or directory", 'error', false, [targetPath]);
                return;
            }

            if (node.type !== 'dir') {
                this.printTranslatable("cd: {0}: Not a directory", 'error', false, [targetPath]);
                return;
            }

            this.currentPath = newPathArr;
            this.formatPromptPath();
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'cd', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['cd'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\ncd [dir]\n\nwhat is it used for?\nChanges the current working directory of the terminal shell.";
        },
        configurable: true
    });
}
