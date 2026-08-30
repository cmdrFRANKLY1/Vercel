window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['pwd'] = {
    name: 'pwd',
    description: 'Print name of current/working directory',
    preInstalledOn: ['default'],
    translations: {
        en: {
            pwdUsage: "pwd: usage: pwd"
        },
        de: {
            pwdUsage: "pwd: Verwendung: pwd"
        },
        fr: {
            pwdUsage: "pwd: utilisation: pwd"
        },
        it: {
            pwdUsage: "pwd: uso: pwd"
        },
        tr: {
            pwdUsage: "pwd: kullanım: pwd"
        }
    },
    commandInfo: {
        en: "what is this command?\npwd\n\nwhat is it used for?\nPrints the absolute path of the current working directory.",
        de: "Was ist dieser Befehl?\npwd\n\nWofür wird er verwendet?\nGibt den absoluten Pfad des aktuellen Arbeitsverzeichnisses aus.",
        fr: "Qu'est-ce que cette commande ?\npwd\n\nA quoi sert-elle ?\nAffiche le chemin absolu du dossier de travail actuel.",
        it: "Cos'è questo comando?\npwd\n\nA cosa serve?\nStampa il percorso assoluto della directory di lavoro corrente.",
        tr: "Bu komut nedir?\npwd\n\nNe işe yarar?\nMevcut çalışma dizininin mutlak yolunu yazdırır."
    },
    commands: {
        pwd: function(args) {
            let pathStr = '/' + this.currentPath.join('/');
            if (pathStr === '') pathStr = '/';
            this.print(pathStr);
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'pwd', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['pwd'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\npwd\n\nwhat is it used for?\nPrints the current working directory.";
        },
        configurable: true
    });
}
