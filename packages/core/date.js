window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['date'] = {
    name: 'date',
    description: 'Display or set the system date and time',
    preInstalledOn: ['default'],
    translations: {
        en: {
            dateUsage: "date: usage: date [+%format]"
        },
        de: {
            dateUsage: "date: Verwendung: date [+%format]"
        },
        fr: {
            dateUsage: "date: utilisation: date [+%format]"
        },
        it: {
            dateUsage: "date: uso: date [+%format]"
        },
        tr: {
            dateUsage: "date: kullanım: date [+%format]"
        }
    },
    commandInfo: {
        en: "what is this command?\ndate [+%format]\n\nwhat is it used for?\nDisplays the current system date and time in the given format.",
        de: "Was ist dieser Befehl?\ndate [+%format]\n\nWofür wird er verwendet?\nZeigt das aktuelle Systemdatum und die Uhrzeit im angegebenen Format an.",
        fr: "Qu'est-ce que cette commande ?\ndate [+%format]\n\nA quoi sert-elle ?\nAffiche la date et l'heure actuelles du système dans le format donné.",
        it: "Cos'è questo comando?\ndate [+%format]\n\nA cosa serve?\nVisualizza la data e l'ora corrente del sistema nel formato specificato.",
        tr: "Bu komut nedir?\ndate [+%format]\n\nNe işe yarar?\nMevcut sistem tarihini ve saatini verilen biçimde gösterir."
    },
    commands: {
        date: function(args) {
            const now = new Date();
            const lang = window.termSettings?.language || 'en';
            const localeMap = { de: 'de-DE', fr: 'fr-FR', it: 'it-IT', tr: 'tr-TR', en: 'en-US' };
            const locale = localeMap[lang] || 'en-US';

            if (args && args.length > 0 && args[0].startsWith('+')) {
                // Basic format support like '+%Y-%m-%d' or similar strings
                let fmt = args[0].substring(1);
                let formatted = fmt
                .replace('%Y', now.getFullYear())
                .replace('%m', String(now.getMonth() + 1).padStart(2, '0'))
                .replace('%d', String(now.getDate()).padStart(2, '0'))
                .replace('%H', String(now.getHours()).padStart(2, '0'))
                .replace('%M', String(now.getMinutes()).padStart(2, '0'))
                .replace('%S', String(now.getSeconds()).padStart(2, '0'));
                this.print(formatted);
                return;
            }

            this.print(now.toLocaleString(locale, { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }));
        }
    }
};

if (typeof commandInfo !== 'undefined') {
    Object.defineProperty(commandInfo, 'date', {
        get: function() {
            const lang = window.termSettings?.language || 'en';
            const pkg = window.packagesRegistry['date'];
            return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\ndate [+%format]\n\nwhat is it used for?\nDisplays the current system date and time.";
        },
        configurable: true
    });
}
