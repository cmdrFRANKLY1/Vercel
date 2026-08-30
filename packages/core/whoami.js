window.packagesRegistry = window.packagesRegistry || {};

window.packagesRegistry['whoami'] = {
    name: 'whoami',
    description: 'Print effective userid',
    // Automatically make it available on these systems without needing apt install
    preInstalledOn: ['default', 'debug', 'Debian', 'Ubuntu', 'Alpine', 'Arch'],

    commands: {
        whoami: function(args) {
            // 'this' refers to the Terminal instance.
            // Print the default user, utilizing the translation function for English/German support.
            this.printTranslatable("user", "benutzer");
        }
    },

    commandInfo: {
        whoami: {
            en: "what is this command?\nwhoami\n\nwhat is it used for?\nDisplays the username of the currently logged-in user account.",
            de: "Was ist das für ein Befehl?\nwhoami\n\nWofür wird er verwendet?\nZeigt den Benutzernamen des aktuell angemeldeten Benutzerkontos an."
        }
    }
};
