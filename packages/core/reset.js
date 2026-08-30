window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['reset'] = {
    name: 'reset',
    description: 'Reset the terminal screen',
    preInstalledOn: ['default'],
    translations: {
        en: {
            resetUsage: "reset: usage: reset"
        },
        de: {
            resetUsage: "reset: Verwendung: reset"
        },
        fr: {
            resetUsage: "reset: utilisation: reset"
        },
        it: {
            resetUsage: "reset: uso: reset"
        },
        tr: {
            resetUsage: "reset: kullanım: reset"
        }
    },
    commandInfo: {
        en: "what is this command?\nreset\n\nwhat is it used for?\nClears the terminal screen and resets the terminal attributes.",
        de: "Was ist dieser Befehl?\nreset\n\nWofür wird er verwendet?\nLöscht den Terminalbildschirm und setzt die Terminalattribute zurück.",
        fr: "Qu'est-ce que cette commande ?\nreset\n\nA quoi sert-elle ?\nEfface l'écran du terminal et réinitialise ses attributs.",
        it: "Cos'è questo comando?\nreset\n\nA cosa serve?\nPulisce lo schermo del terminale e ripristina gli attributi.",
        tr: "Bu komut nedir?\nreset\n\nNe işe yarar?\nTerminal ekranını temizler ve terminal özelliklerini sıfırlar."
    },
    commands: {
        reset: function(args) {
            if (typeof this.killAllProcesses === 'function') {
                this.killAllProcesses();
            }
            if (this.outputDiv) {
                this.outputDiv.innerHTML = '';
            }
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'reset', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['reset'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\nreset\n\nwhat is it used for?\nResets the terminal screen.";
        },
        configurable: true
    });
}
