window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['echo'] = {
    name: 'echo',
    description: 'Display a line of text',
    preInstalledOn: ['default'],
    translations: {
        en: {
            echoUsage: "echo: usage: echo [string...]"
        },
        de: {
            echoUsage: "echo: Verwendung: echo [text...]"
        },
        fr: {
            echoUsage: "echo: utilisation: echo [texte...]"
        },
        it: {
            echoUsage: "echo: uso: echo [testo...]"
        },
        tr: {
            echoUsage: "echo: kullanım: echo [metin...]"
        }
    },
    commandInfo: {
        en: "what is this command?\necho [string...]\n\nwhat is it used for?\nOutputs the given arguments to standard output.",
        de: "Was ist dieser Befehl?\necho [text...]\n\nWofür wird er verwendet?\nGibt die angegebenen Argumente auf der Standardausgabe aus.",
        fr: "Qu'est-ce que cette commande ?\necho [texte...]\n\nA quoi sert-elle ?\nAffiche les arguments donnés sur la sortie standard.",
        it: "Cos'è questo comando?\necho [testo...]\n\nA cosa serve?\nVisualizza gli argomenti forniti sullo standard output.",
        tr: "Bu komut nedir?\necho [metin...]\n\nNe işe yarar?\nVerilen argümanları standart çıktıya yansıtır."
    },
    commands: {
        echo: function(args) {
            if (!args || args.length === 0) {
                this.print("");
                return;
            }
            this.print(args.join(' '));
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'echo', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['echo'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\necho [string...]\n\nwhat is it used for?\nOutputs the given arguments to standard output.";
        },
        configurable: true
    });
}
