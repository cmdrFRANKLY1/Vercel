// resources/topics/topic_voiceattack.js
// Registers the VoiceAttack reference topic with the complete token list.
// Loaded via <script> injection.

registerTopic({
    parentId: 'Programme',
    id: 'VoiceAttack Overview',
    icon: 'fa-microphone',
    titleDe: 'VoiceAttack',
    titleEn: 'VoiceAttack',
    descDe: 'Alle ~300 VoiceAttack-Tokens nach Kategorien sortiert: Befehls-, Status-, Variablen-, Pfad- und Zeit-Tokens.',
    descEn: 'All ~300 VoiceAttack tokens organized by category: command, state, variable, path, and time tokens.',

    sidebarTitleDe: 'VoiceAttack',
    sidebarTitleEn: 'VoiceAttack',
    sidebarSubtitleDe: 'Komplette Token-Liste',
    sidebarSubtitleEn: 'Complete Token List',
    sidebarVersion: 'v2.2+',

    hero: {
        titleDe: 'VoiceAttack Token-Referenz',
        titleEn: 'VoiceAttack Token Reference',
        introDe: 'VoiceAttack stellt <strong>fast 300 Tokens</strong> zur Verfügung – Platzhalter in geschweiften Klammern, die zur Laufzeit durch Werte ersetzt werden. Diese Referenz listet alle Tokens nach Kategorie sortiert auf. Tokens sind <em>case-sensitive</em>: <code>{TIME}</code> und <code>{time}</code> sind verschieden. Eine vollständige Übersicht der Plugins und Proxy-Methoden finden Sie in der offiziellen Hilfe.',
        introEn: 'VoiceAttack provides <strong>close to 300 tokens</strong> – placeholders in curly braces that are replaced with values at runtime. This reference lists all tokens organized by category. Tokens are <em>case-sensitive</em>: <code>{TIME}</code> and <code>{time}</code> are different. A complete overview of plugins and proxy methods can be found in the official help.'
    },

    quickLinks: [
        { icon: 'fa-terminal',         href: '#section1',  switchToDoc: true, labelDe: 'Befehls-Tokens',      labelEn: 'Command Tokens' },
        { icon: 'fa-code-branch',      href: '#section2',  switchToDoc: true, labelDe: 'Befehlshistorie',     labelEn: 'Command History' },
        { icon: 'fa-route',            href: '#section3',  switchToDoc: true, labelDe: 'Profil & Queue',      labelEn: 'Profile & Queue' },
        { icon: 'fa-clock',            href: '#section4',  switchToDoc: true, labelDe: 'Zeit & Datum',        labelEn: 'Time & Date' },
        { icon: 'fa-database',         href: '#section5',  switchToDoc: true, labelDe: 'Variablen',           labelEn: 'Variables' },
        { icon: 'fa-font',             href: '#section6',  switchToDoc: true, labelDe: 'Text-Funktionen',     labelEn: 'Text Functions' },
        { icon: 'fa-microchip',        href: '#section7',  switchToDoc: true, labelDe: 'System & State',      labelEn: 'System & State' },
        { icon: 'fa-gamepad',          href: '#section8',  switchToDoc: true, labelDe: 'Joystick State',      labelEn: 'Joystick State' },
        { icon: 'fa-window-restore',   href: '#section9',  switchToDoc: true, labelDe: 'Fenster & Prozesse',  labelEn: 'Windows & Processes' },
        { icon: 'fa-volume-up',        href: '#section10', switchToDoc: true, labelDe: 'Audio',               labelEn: 'Audio' },
        { icon: 'fa-folder',           href: '#section11', switchToDoc: true, labelDe: 'Pfade',               labelEn: 'Paths' },
        { icon: 'fa-bolt',             href: '#section12', switchToDoc: true, labelDe: 'Maus & Sonstiges',    labelEn: 'Mouse & Misc' }
    ],

    sections: [
        /* ============================================================
           SECTION 1 — COMMAND TOKENS
           ============================================================ */
        {
            id: 'section1',
            titleDe: '1. Befehls-Tokens',
            titleEn: '1. Command Tokens',
            introDe: 'Tokens, die sich auf den aktuell ausgeführten Befehl beziehen.',
            introEn: 'Tokens relating to the currently executing command.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Befehls-Identität & Ausführung',
                    titleEn: 'Command Identity & Execution',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{CMD}</strong></td><td class="text-[var(--text-muted)]">Name des aktuell ausgeführten Befehls (gesprochene Phrase oder Name).</td></tr>
                    <tr><td><strong>{CMDALIAS}</strong></td><td class="text-[var(--text-muted)]">Der Recognition Alias des Befehls, falls gesetzt.</td></tr>
                    <tr><td><strong>{CMDWHENISAY}</strong></td><td class="text-[var(--text-muted)]">Der vollständige Inhalt des "When I Say"-Feldes.</td></tr>
                    <tr><td><strong>{CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Kategorie des ausgeführten Befehls (bei Komposita: Präfix + Suffix).</td></tr>
                    <tr><td><strong>{PREFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Präfix-Kategorie bei zusammengesetzten Befehlen.</td></tr>
                    <tr><td><strong>{SUFFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Suffix-Kategorie bei zusammengesetzten Befehlen.</td></tr>
                    <tr><td><strong>{CMDSEGMENT:n}</strong></td><td class="text-[var(--text-muted)]">Einzelner Teil eines dynamischen Befehls (n ist 0-basiert).</td></tr>
                    <tr><td><strong>{ISCOMPOSITE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn zusammengesetzter Befehl, sonst "0".</td></tr>
                    <tr><td><strong>{PREFIX}</strong></td><td class="text-[var(--text-muted)]">Präfix-Teil eines zusammengesetzten Befehls.</td></tr>
                    <tr><td><strong>{SUFFIX}</strong></td><td class="text-[var(--text-muted)]">Suffix-Teil eines zusammengesetzten Befehls.</td></tr>
                    <tr><td><strong>{COMPOSITEGROUP}</strong></td><td class="text-[var(--text-muted)]">Gruppenname eines zusammengesetzten Befehls.</td></tr>
                    <tr><td><strong>{CMDACTION}</strong></td><td class="text-[var(--text-muted)]">Auslösemethode: Spoken, Keyboard, Joystick, Mouse, Profile, External, Unrecognized, ProfileUnloadChange, ProfileUnloadClose, DictationRecognized, Plugin, ExecOnCommandRecognized, Other.</td></tr>
                    <tr><td><strong>{CMDCOUNT}</strong></td><td class="text-[var(--text-muted)]">Anzahl ausgeführter Top-Level-Befehle seit Programmstart.</td></tr>
                    <tr><td><strong>{CMDLASTUSEREXEC}</strong></td><td class="text-[var(--text-muted)]">Sekunden seit dem letzten benutzerausgelösten Befehl.</td></tr>
                    <tr><td><strong>{ISLISTENINGOVERRIDE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn durch Listening-Override ausgelöst, sonst "0".</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{CMD}</strong></td><td class="text-[var(--text-muted)]">Name of the currently executing command (spoken phrase or name).</td></tr>
                    <tr><td><strong>{CMDALIAS}</strong></td><td class="text-[var(--text-muted)]">The command's Recognition Alias, if set.</td></tr>
                    <tr><td><strong>{CMDWHENISAY}</strong></td><td class="text-[var(--text-muted)]">The full content of the "When I Say" field.</td></tr>
                    <tr><td><strong>{CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Category of the executing command (composite: prefix + suffix).</td></tr>
                    <tr><td><strong>{PREFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Prefix category of a composite command.</td></tr>
                    <tr><td><strong>{SUFFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Suffix category of a composite command.</td></tr>
                    <tr><td><strong>{CMDSEGMENT:n}</strong></td><td class="text-[var(--text-muted)]">Single portion of a dynamic command (n is zero-based).</td></tr>
                    <tr><td><strong>{ISCOMPOSITE}</strong></td><td class="text-[var(--text-muted)]">"1" if composite, otherwise "0".</td></tr>
                    <tr><td><strong>{PREFIX}</strong></td><td class="text-[var(--text-muted)]">Prefix part of a composite command.</td></tr>
                    <tr><td><strong>{SUFFIX}</strong></td><td class="text-[var(--text-muted)]">Suffix part of a composite command.</td></tr>
                    <tr><td><strong>{COMPOSITEGROUP}</strong></td><td class="text-[var(--text-muted)]">Group name of a composite command.</td></tr>
                    <tr><td><strong>{CMDACTION}</strong></td><td class="text-[var(--text-muted)]">Trigger method: Spoken, Keyboard, Joystick, Mouse, Profile, External, Unrecognized, ProfileUnloadChange, ProfileUnloadClose, DictationRecognized, Plugin, ExecOnCommandRecognized, Other.</td></tr>
                    <tr><td><strong>{CMDCOUNT}</strong></td><td class="text-[var(--text-muted)]">Number of top-level commands executed since launch.</td></tr>
                    <tr><td><strong>{CMDLASTUSEREXEC}</strong></td><td class="text-[var(--text-muted)]">Seconds since the last user-triggered command.</td></tr>
                    <tr><td><strong>{ISLISTENINGOVERRIDE}</strong></td><td class="text-[var(--text-muted)]">"1" if invoked via listening override, otherwise "0".</td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Konfidenz & Ausführungs-Status',
                    titleEn: 'Confidence & Execution State',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{CMDCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Konfidenz der Spracherkennung (0–100).</td></tr>
                    <tr><td><strong>{CMDMINCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Erforderliches Minimum an Konfidenz für diesen Befehl.</td></tr>
                    <tr><td><strong>{CMDEXECREJECTED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn trotz zu geringer Konfidenz ausgeführt, sonst "0".</td></tr>
                    <tr><td><strong>{CMDALREADYEXECUTING}</strong></td><td class="text-[var(--text-muted)]">"1" wenn der Befehl bereits in einer anderen Instanz läuft.</td></tr>
                    <tr><td><strong>{CMDISSUBCOMMAND}</strong></td><td class="text-[var(--text-muted)]">"1" wenn als Subcommand ausgeführt, sonst "0".</td></tr>
                    <tr><td><strong>{CMDDOUBLETAPINVOKED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn durch Doppeltipp ausgelöst, sonst "0".</td></tr>
                    <tr><td><strong>{CMDLONGPRESSINVOKED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn durch langen Druck ausgelöst, sonst "0".</td></tr>
                    <tr><td><strong>{CMDACTIVE:name}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Befehl "name" gerade läuft.</td></tr>
                    <tr><td><strong>{CMDACTIVECOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Anzahl aktiver Instanzen von Befehl "name".</td></tr>
                    <tr><td><strong>{CMDEXISTS:name}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Befehl "name" existiert (nicht für Komposita).</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{CMDCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Speech recognition confidence (0–100).</td></tr>
                    <tr><td><strong>{CMDMINCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Minimum confidence required for this command.</td></tr>
                    <tr><td><strong>{CMDEXECREJECTED}</strong></td><td class="text-[var(--text-muted)]">"1" if executed despite low confidence, otherwise "0".</td></tr>
                    <tr><td><strong>{CMDALREADYEXECUTING}</strong></td><td class="text-[var(--text-muted)]">"1" if the command is already running in another instance.</td></tr>
                    <tr><td><strong>{CMDISSUBCOMMAND}</strong></td><td class="text-[var(--text-muted)]">"1" if executed as a subcommand, otherwise "0".</td></tr>
                    <tr><td><strong>{CMDDOUBLETAPINVOKED}</strong></td><td class="text-[var(--text-muted)]">"1" if invoked via double tap, otherwise "0".</td></tr>
                    <tr><td><strong>{CMDLONGPRESSINVOKED}</strong></td><td class="text-[var(--text-muted)]">"1" if invoked via long press, otherwise "0".</td></tr>
                    <tr><td><strong>{CMDACTIVE:name}</strong></td><td class="text-[var(--text-muted)]">"1" if command "name" is currently active.</td></tr>
                    <tr><td><strong>{CMDACTIVECOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Number of active instances of command "name".</td></tr>
                    <tr><td><strong>{CMDEXISTS:name}</strong></td><td class="text-[var(--text-muted)]">"1" if command "name" exists (not for composites).</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 2 — COMMAND HISTORY
           ============================================================ */
        {
            id: 'section2',
            titleDe: '2. Befehlshistorie & Wildcards',
            titleEn: '2. Command History & Wildcards',
            introDe: 'Tokens zur Auswertung früherer Befehle und Wildcard-Fragmente.',
            introEn: 'Tokens for evaluating previous commands and wildcard fragments.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Sprachhistorie',
                    titleEn: 'Speech History',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{LASTSPOKENCMD}</strong></td><td class="text-[var(--text-muted)]">Zuletzt gesprochene Befehlsphrase.</td></tr>
                    <tr><td><strong>{PREVIOUSSPOKENCMD}</strong></td><td class="text-[var(--text-muted)]">Vorherige gesprochene Befehlsphrase.</td></tr>
                    <tr><td><strong>{SPOKENCMD:n}</strong></td><td class="text-[var(--text-muted)]">Befehl n aus der Historie (0 = letzter).</td></tr>
                    <tr><td><strong>{LASTSPOKEN}</strong></td><td class="text-[var(--text-muted)]">Zuletzt erkannter Text (auch wenn nicht als Befehl erkannt).</td></tr>
                    <tr><td><strong>{PREVIOUSSPOKEN}</strong></td><td class="text-[var(--text-muted)]">Vorheriger erkannter Text (auch wenn nicht als Befehl erkannt).</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{LASTSPOKENCMD}</strong></td><td class="text-[var(--text-muted)]">Last spoken command phrase.</td></tr>
                    <tr><td><strong>{PREVIOUSSPOKENCMD}</strong></td><td class="text-[var(--text-muted)]">Previous spoken command phrase.</td></tr>
                    <tr><td><strong>{SPOKENCMD:n}</strong></td><td class="text-[var(--text-muted)]">Command n from history (0 = latest).</td></tr>
                    <tr><td><strong>{LASTSPOKEN}</strong></td><td class="text-[var(--text-muted)]">Last recognized text (even if not recognized as a command).</td></tr>
                    <tr><td><strong>{PREVIOUSSPOKEN}</strong></td><td class="text-[var(--text-muted)]">Previous recognized text (even if not recognized as a command).</td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Wildcard-Fragmente',
                    titleEn: 'Wildcard Fragments',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{CMD_BEFORE}</strong></td><td class="text-[var(--text-muted)]">Text vor der Wildcard-Phrase.</td></tr>
                    <tr><td><strong>{CMD_AFTER}</strong></td><td class="text-[var(--text-muted)]">Text nach der Wildcard-Phrase.</td></tr>
                    <tr><td><strong>{CMD_WILDCARDKEY}</strong></td><td class="text-[var(--text-muted)]">Der feste Teil der Wildcard-Phrase.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{CMD_BEFORE}</strong></td><td class="text-[var(--text-muted)]">Text before the wildcard phrase.</td></tr>
                    <tr><td><strong>{CMD_AFTER}</strong></td><td class="text-[var(--text-muted)]">Text after the wildcard phrase.</td></tr>
                    <tr><td><strong>{CMD_WILDCARDKEY}</strong></td><td class="text-[var(--text-muted)]">The fixed portion of the wildcard phrase.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 3 — PROFILE, QUEUE, NEXTPROFILE
           ============================================================ */
        {
            id: 'section3',
            titleDe: '3. Profil-, Queue- & NEXTPROFILE-Tokens',
            titleEn: '3. Profile, Queue & NEXTPROFILE Tokens',
            introDe: 'Tokens zu Profilen, deren Historie, Autorfeldern und Command-Queues.',
            introEn: 'Tokens for profiles, their history, author fields, and command queues.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Profil-Tokens',
                    titleEn: 'Profile Tokens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{PROFILE}</strong></td><td class="text-[var(--text-muted)]">Name des aktuell geladenen Profils.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE}</strong></td><td class="text-[var(--text-muted)]">Name des zuvor geladenen Profils.</td></tr>
                    <tr><td><strong>{PROFILE:n}</strong></td><td class="text-[var(--text-muted)]">Profil n aus der Historie (0 = aktuell).</td></tr>
                    <tr><td><strong>{NEXTPROFILE}</strong></td><td class="text-[var(--text-muted)]">Profil, das nach dem Entladen geladen wird (nur in Unload-Command).</td></tr>
                    <tr><td><strong>{PROFILE_AT1}</strong></td><td class="text-[var(--text-muted)]">AuthorTag1 des aktuellen Profils.</td></tr>
                    <tr><td><strong>{PROFILE_AT2}</strong></td><td class="text-[var(--text-muted)]">AuthorTag2 des aktuellen Profils.</td></tr>
                    <tr><td><strong>{PROFILE_AT3}</strong></td><td class="text-[var(--text-muted)]">AuthorTag3 des aktuellen Profils.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE_AT1}</strong></td><td class="text-[var(--text-muted)]">AuthorTag1 des vorherigen Profils.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE_AT2}</strong></td><td class="text-[var(--text-muted)]">AuthorTag2 des vorherigen Profils.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE_AT3}</strong></td><td class="text-[var(--text-muted)]">AuthorTag3 des vorherigen Profils.</td></tr>
                    <tr><td><strong>{NEXTPROFILE_AT1}</strong></td><td class="text-[var(--text-muted)]">AuthorTag1 des nächsten Profils (nur Unload-Command).</td></tr>
                    <tr><td><strong>{NEXTPROFILE_AT2}</strong></td><td class="text-[var(--text-muted)]">AuthorTag2 des nächsten Profils (nur Unload-Command).</td></tr>
                    <tr><td><strong>{NEXTPROFILE_AT3}</strong></td><td class="text-[var(--text-muted)]">AuthorTag3 des nächsten Profils (nur Unload-Command).</td></tr>
                    <tr><td><strong>{PROFILE_AT1:n}</strong> etc.</td><td class="text-[var(--text-muted)]">Historie der AuthorTags (n = Index).</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{PROFILE}</strong></td><td class="text-[var(--text-muted)]">Name of the currently loaded profile.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE}</strong></td><td class="text-[var(--text-muted)]">Name of the previously loaded profile.</td></tr>
                    <tr><td><strong>{PROFILE:n}</strong></td><td class="text-[var(--text-muted)]">Profile n from history (0 = current).</td></tr>
                    <tr><td><strong>{NEXTPROFILE}</strong></td><td class="text-[var(--text-muted)]">Profile loading after unload (unload-command only).</td></tr>
                    <tr><td><strong>{PROFILE_AT1}</strong></td><td class="text-[var(--text-muted)]">AuthorTag1 of the current profile.</td></tr>
                    <tr><td><strong>{PROFILE_AT2}</strong></td><td class="text-[var(--text-muted)]">AuthorTag2 of the current profile.</td></tr>
                    <tr><td><strong>{PROFILE_AT3}</strong></td><td class="text-[var(--text-muted)]">AuthorTag3 of the current profile.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE_AT1}</strong></td><td class="text-[var(--text-muted)]">AuthorTag1 of the previous profile.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE_AT2}</strong></td><td class="text-[var(--text-muted)]">AuthorTag2 of the previous profile.</td></tr>
                    <tr><td><strong>{PREVIOUSPROFILE_AT3}</strong></td><td class="text-[var(--text-muted)]">AuthorTag3 of the previous profile.</td></tr>
                    <tr><td><strong>{NEXTPROFILE_AT1}</strong></td><td class="text-[var(--text-muted)]">AuthorTag1 of the next profile (unload only).</td></tr>
                    <tr><td><strong>{NEXTPROFILE_AT2}</strong></td><td class="text-[var(--text-muted)]">AuthorTag2 of the next profile (unload only).</td></tr>
                    <tr><td><strong>{NEXTPROFILE_AT3}</strong></td><td class="text-[var(--text-muted)]">AuthorTag3 of the next profile (unload only).</td></tr>
                    <tr><td><strong>{PROFILE_AT1:n}</strong> etc.</td><td class="text-[var(--text-muted)]">AuthorTag history (n = index).</td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Queue-Tokens',
                    titleEn: 'Queue Tokens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{QUEUESTATUS:name}</strong></td><td class="text-[var(--text-muted)]">Status einer Queue: Not Initialized, Running, Idle, Paused, Stopped.</td></tr>
                    <tr><td><strong>{QUEUECMDCOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Anzahl der Befehle in der Queue.</td></tr>
                    <tr><td><strong>{QUEUEACTIVECMD:name}</strong></td><td class="text-[var(--text-muted)]">Name des aktuell in der Queue laufenden Befehls.</td></tr>
                    <tr><td><strong>{QUEUECOUNT}</strong></td><td class="text-[var(--text-muted)]">Anzahl existierender Command-Queues.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{QUEUESTATUS:name}</strong></td><td class="text-[var(--text-muted)]">Queue status: Not Initialized, Running, Idle, Paused, Stopped.</td></tr>
                    <tr><td><strong>{QUEUECMDCOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Number of commands in the queue.</td></tr>
                    <tr><td><strong>{QUEUEACTIVECMD:name}</strong></td><td class="text-[var(--text-muted)]">Name of the currently executing command in the queue.</td></tr>
                    <tr><td><strong>{QUEUECOUNT}</strong></td><td class="text-[var(--text-muted)]">Number of existing command queues.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 4 — TIME & DATE
           ============================================================ */
        {
            id: 'section4',
            titleDe: '4. Zeit- & Datums-Tokens',
            titleEn: '4. Time & Date Tokens',
            introDe: 'Tokens für aktuelle Zeit und Datum sowie für Date-Variablen.',
            introEn: 'Tokens for current time and date, as well as date variables.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Zeit-Tokens',
                    titleEn: 'Time Tokens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{TIME}</strong></td><td class="text-[var(--text-muted)]">Aktuelle Zeit im 24-Stunden-Format.</td></tr>
                    <tr><td><strong>{time}</strong></td><td class="text-[var(--text-muted)]">Aktuelle Zeit im 12-Stunden-Format.</td></tr>
                    <tr><td><strong>{TIME:dateVariableName}</strong></td><td class="text-[var(--text-muted)]">Zeit der Date-Variable (24h).</td></tr>
                    <tr><td><strong>{time:dateVariableName}</strong></td><td class="text-[var(--text-muted)]">Zeit der Date-Variable (12h).</td></tr>
                    <tr><td><strong>{TIMEHOUR}</strong></td><td class="text-[var(--text-muted)]">Stunde (12h-Format).</td></tr>
                    <tr><td><strong>{TIMEHOUR24}</strong></td><td class="text-[var(--text-muted)]">Stunde (24h-Format).</td></tr>
                    <tr><td><strong>{TIMEMINUTE}</strong></td><td class="text-[var(--text-muted)]">Minute.</td></tr>
                    <tr><td><strong>{TIMESECOND}</strong></td><td class="text-[var(--text-muted)]">Sekunde.</td></tr>
                    <tr><td><strong>{TIMEMILLISECOND}</strong></td><td class="text-[var(--text-muted)]">Millisekunde.</td></tr>
                    <tr><td><strong>{TIMEAMPM}</strong></td><td class="text-[var(--text-muted)]">AM/PM-Kennzeichnung (lokalisiert).</td></tr>
                    <tr><td><strong>{TIMESTAMP}</strong></td><td class="text-[var(--text-muted)]">Zeitstempel: JJJJMMTTHHmmssfff.</td></tr>
                    <tr><td><strong>{TIMESTAMP:dateVar}</strong></td><td class="text-[var(--text-muted)]">Zeitstempel der Date-Variable.</td></tr>
                    <tr><td colspan="2" class="text-[var(--text-muted)]"><em>Jedes Zeit-Token mit <code>:dateVariableName</code> funktioniert analog zu <code>{TIMEHOUR:dateVar}</code> usw.</em></td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{TIME}</strong></td><td class="text-[var(--text-muted)]">Current time in 24-hour format.</td></tr>
                    <tr><td><strong>{time}</strong></td><td class="text-[var(--text-muted)]">Current time in 12-hour format.</td></tr>
                    <tr><td><strong>{TIME:dateVariableName}</strong></td><td class="text-[var(--text-muted)]">Time of the date variable (24h).</td></tr>
                    <tr><td><strong>{time:dateVariableName}</strong></td><td class="text-[var(--text-muted)]">Time of the date variable (12h).</td></tr>
                    <tr><td><strong>{TIMEHOUR}</strong></td><td class="text-[var(--text-muted)]">Hour (12h format).</td></tr>
                    <tr><td><strong>{TIMEHOUR24}</strong></td><td class="text-[var(--text-muted)]">Hour (24h format).</td></tr>
                    <tr><td><strong>{TIMEMINUTE}</strong></td><td class="text-[var(--text-muted)]">Minute.</td></tr>
                    <tr><td><strong>{TIMESECOND}</strong></td><td class="text-[var(--text-muted)]">Second.</td></tr>
                    <tr><td><strong>{TIMEMILLISECOND}</strong></td><td class="text-[var(--text-muted)]">Millisecond.</td></tr>
                    <tr><td><strong>{TIMEAMPM}</strong></td><td class="text-[var(--text-muted)]">AM/PM designation (localized).</td></tr>
                    <tr><td><strong>{TIMESTAMP}</strong></td><td class="text-[var(--text-muted)]">Timestamp: YYYYMMDDHHmmssfff.</td></tr>
                    <tr><td><strong>{TIMESTAMP:dateVar}</strong></td><td class="text-[var(--text-muted)]">Timestamp of the date variable.</td></tr>
                    <tr><td colspan="2" class="text-[var(--text-muted)]"><em>Any time token with <code>:dateVariableName</code> works the same way as <code>{TIMEHOUR:dateVar}</code>, etc.</em></td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Datums-Tokens',
                    titleEn: 'Date Tokens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{DATE}</strong></td><td class="text-[var(--text-muted)]">Aktuelles Datum, z. B. "April 3, 2026".</td></tr>
                    <tr><td><strong>{DATE:dateVariableName}</strong></td><td class="text-[var(--text-muted)]">Datum der Date-Variable.</td></tr>
                    <tr><td><strong>{DATEYEAR}</strong></td><td class="text-[var(--text-muted)]">Aktuelles Jahr (4-stellig).</td></tr>
                    <tr><td><strong>{DATEDAY}</strong></td><td class="text-[var(--text-muted)]">Tag des Monats.</td></tr>
                    <tr><td><strong>{DATEMONTH}</strong></td><td class="text-[var(--text-muted)]">Monatsname (ausgeschrieben).</td></tr>
                    <tr><td><strong>{DATEMONTHNUMERIC}</strong></td><td class="text-[var(--text-muted)]">Monat als Zahl (1–12).</td></tr>
                    <tr><td><strong>{DATEDAYOFWEEK}</strong></td><td class="text-[var(--text-muted)]">Wochentag ausgeschrieben.</td></tr>
                    <tr><td><strong>{DATETICKS}</strong></td><td class="text-[var(--text-muted)]">Datum als Ticks (numerisch).</td></tr>
                    <tr><td><strong>{DATETIMEFORMAT:format}</strong></td><td class="text-[var(--text-muted)]">Aktuelles Datum/Zeit mit Format-String aus der Text-Variable.</td></tr>
                    <tr><td><strong>{DATETIMEFORMAT:dateVar:format}</strong></td><td class="text-[var(--text-muted)]">Date-Variable formatiert.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{DATE}</strong></td><td class="text-[var(--text-muted)]">Current date, e.g. "April 3, 2026".</td></tr>
                    <tr><td><strong>{DATE:dateVariableName}</strong></td><td class="text-[var(--text-muted)]">Date of the date variable.</td></tr>
                    <tr><td><strong>{DATEYEAR}</strong></td><td class="text-[var(--text-muted)]">Current year (4-digit).</td></tr>
                    <tr><td><strong>{DATEDAY}</strong></td><td class="text-[var(--text-muted)]">Day of the month.</td></tr>
                    <tr><td><strong>{DATEMONTH}</strong></td><td class="text-[var(--text-muted)]">Month name (spelled out).</td></tr>
                    <tr><td><strong>{DATEMONTHNUMERIC}</strong></td><td class="text-[var(--text-muted)]">Month as number (1–12).</td></tr>
                    <tr><td><strong>{DATEDAYOFWEEK}</strong></td><td class="text-[var(--text-muted)]">Day of the week spelled out.</td></tr>
                    <tr><td><strong>{DATETICKS}</strong></td><td class="text-[var(--text-muted)]">Date as ticks (numeric).</td></tr>
                    <tr><td><strong>{DATETIMEFORMAT:format}</strong></td><td class="text-[var(--text-muted)]">Current date/time with format string from text variable.</td></tr>
                    <tr><td><strong>{DATETIMEFORMAT:dateVar:format}</strong></td><td class="text-[var(--text-muted)]">Formatted date variable.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 5 — VARIABLES
           ============================================================ */
        {
            id: 'section5',
            titleDe: '5. Variablen-Tokens',
            titleEn: '5. Variable Tokens',
            introDe: 'Tokens zum Auslesen von Variablen aller Datentypen – jeweils mit optionalem Default-Wert.',
            introEn: 'Tokens for reading variables of all data types – each with an optional default value.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Standard-Variablen',
                    titleEn: 'Standard Variables',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{TXT:name}</strong></td><td class="text-[var(--text-muted)]">Text-Variable auslesen.</td></tr>
                    <tr><td><strong>{TXT:name:default}</strong></td><td class="text-[var(--text-muted)]">Text-Variable mit Default-Wert bei "Not set".</td></tr>
                    <tr><td><strong>{TXTURL:name}</strong></td><td class="text-[var(--text-muted)]">Text-Variable, URL-codiert.</td></tr>
                    <tr><td><strong>{INT:name}</strong></td><td class="text-[var(--text-muted)]">Integer-Variable auslesen.</td></tr>
                    <tr><td><strong>{INT:name:default}</strong></td><td class="text-[var(--text-muted)]">Integer mit Default-Wert.</td></tr>
                    <tr><td><strong>{INTFORMAT:name}</strong></td><td class="text-[var(--text-muted)]">Integer mit Komma-Formatierung.</td></tr>
                    <tr><td><strong>{INTFORMATUSER:name:fmt}</strong></td><td class="text-[var(--text-muted)]">Integer mit benutzerdefinierter C#-Formatierung.</td></tr>
                    <tr><td><strong>{INTDEFAULTFORMATUSER:name:default:fmt}</strong></td><td class="text-[var(--text-muted)]">Wie INTFORMATUSER, aber mit Default-Wert.</td></tr>
                    <tr><td><strong>{DEC:name}</strong></td><td class="text-[var(--text-muted)]">Decimal-Variable (kulturabhängig).</td></tr>
                    <tr><td><strong>{DEC:name:default}</strong></td><td class="text-[var(--text-muted)]">Decimal mit Default.</td></tr>
                    <tr><td><strong>{DECINV:name}</strong></td><td class="text-[var(--text-muted)]">Decimal in invarianter Kultur (Punkt).</td></tr>
                    <tr><td><strong>{DECINV:name:default}</strong></td><td class="text-[var(--text-muted)]">Decimal invariant mit Default.</td></tr>
                    <tr><td><strong>{DECFORMATUSER:name:fmt}</strong></td><td class="text-[var(--text-muted)]">Decimal mit Formatierung.</td></tr>
                    <tr><td><strong>{DECINVFORMATUSER:name:fmt}</strong></td><td class="text-[var(--text-muted)]">Decimal invariant mit Formatierung.</td></tr>
                    <tr><td><strong>{DECINVDEFAULTFORMATUSER:name:default:fmt}</strong></td><td class="text-[var(--text-muted)]">Wie oben, mit Default.</td></tr>
                    <tr><td><strong>{BOOL:name}</strong></td><td class="text-[var(--text-muted)]">Boolean-Variable ("True"/"False").</td></tr>
                    <tr><td><strong>{BOOL:name:default}</strong></td><td class="text-[var(--text-muted)]">Boolean mit Default.</td></tr>
                    <tr><td><strong>{SMALL:name}</strong></td><td class="text-[var(--text-muted)]">Small-Integer (Legacy).</td></tr>
                    <tr><td><strong>{SMALLFORMAT:name}</strong></td><td class="text-[var(--text-muted)]">Small-Integer mit Komma-Formatierung (Legacy).</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{TXT:name}</strong></td><td class="text-[var(--text-muted)]">Read text variable.</td></tr>
                    <tr><td><strong>{TXT:name:default}</strong></td><td class="text-[var(--text-muted)]">Text variable with default value when "Not set".</td></tr>
                    <tr><td><strong>{TXTURL:name}</strong></td><td class="text-[var(--text-muted)]">Text variable, URL-encoded.</td></tr>
                    <tr><td><strong>{INT:name}</strong></td><td class="text-[var(--text-muted)]">Read integer variable.</td></tr>
                    <tr><td><strong>{INT:name:default}</strong></td><td class="text-[var(--text-muted)]">Integer with default value.</td></tr>
                    <tr><td><strong>{INTFORMAT:name}</strong></td><td class="text-[var(--text-muted)]">Integer with comma formatting.</td></tr>
                    <tr><td><strong>{INTFORMATUSER:name:fmt}</strong></td><td class="text-[var(--text-muted)]">Integer with custom C# formatting.</td></tr>
                    <tr><td><strong>{INTDEFAULTFORMATUSER:name:default:fmt}</strong></td><td class="text-[var(--text-muted)]">Like INTFORMATUSER with default value.</td></tr>
                    <tr><td><strong>{DEC:name}</strong></td><td class="text-[var(--text-muted)]">Decimal variable (culture-aware).</td></tr>
                    <tr><td><strong>{DEC:name:default}</strong></td><td class="text-[var(--text-muted)]">Decimal with default.</td></tr>
                    <tr><td><strong>{DECINV:name}</strong></td><td class="text-[var(--text-muted)]">Decimal in invariant culture (dot).</td></tr>
                    <tr><td><strong>{DECINV:name:default}</strong></td><td class="text-[var(--text-muted)]">Decimal invariant with default.</td></tr>
                    <tr><td><strong>{DECFORMATUSER:name:fmt}</strong></td><td class="text-[var(--text-muted)]">Decimal with formatting.</td></tr>
                    <tr><td><strong>{DECINVFORMATUSER:name:fmt}</strong></td><td class="text-[var(--text-muted)]">Decimal invariant with formatting.</td></tr>
                    <tr><td><strong>{DECINVDEFAULTFORMATUSER:name:default:fmt}</strong></td><td class="text-[var(--text-muted)]">As above, with default.</td></tr>
                    <tr><td><strong>{BOOL:name}</strong></td><td class="text-[var(--text-muted)]">Boolean variable ("True"/"False").</td></tr>
                    <tr><td><strong>{BOOL:name:default}</strong></td><td class="text-[var(--text-muted)]">Boolean with default.</td></tr>
                    <tr><td><strong>{SMALL:name}</strong></td><td class="text-[var(--text-muted)]">Small integer (legacy).</td></tr>
                    <tr><td><strong>{SMALLFORMAT:name}</strong></td><td class="text-[var(--text-muted)]">Small integer with comma formatting (legacy).</td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Text-Funktionen',
                    titleEn: 'Text Functions',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{TXTTRANDOM:a;b;c}</strong></td><td class="text-[var(--text-muted)]">Zufällige Auswahl aus den Werten.</td></tr>
                    <tr><td><strong>{TXTLEN:name}</strong></td><td class="text-[var(--text-muted)]">Länge eines Textes.</td></tr>
                    <tr><td><strong>{TXTUPPER:name}</strong></td><td class="text-[var(--text-muted)]">Text in Großbuchstaben.</td></tr>
                    <tr><td><strong>{TXTLOWER:name}</strong></td><td class="text-[var(--text-muted)]">Text in Kleinbuchstaben.</td></tr>
                    <tr><td><strong>{TXTTRIM:name}</strong></td><td class="text-[var(--text-muted)]">Leerzeichen am Rand entfernen.</td></tr>
                    <tr><td><strong>{TXTREPLACEVAR:src:from:to}</strong></td><td class="text-[var(--text-muted)]">Text ersetzen (Variablen).</td></tr>
                    <tr><td><strong>{TXTREGEXREPLACE:src:from:to}</strong></td><td class="text-[var(--text-muted)]">Regex-Ersetzung.</td></tr>
                    <tr><td><strong>{TXTNUM:name}</strong></td><td class="text-[var(--text-muted)]">Nur Ziffern behalten.</td></tr>
                    <tr><td><strong>{TXTALPHA:name}</strong></td><td class="text-[var(--text-muted)]">Nur Buchstaben behalten.</td></tr>
                    <tr><td><strong>{TXTWORDTONUM:name:sel}</strong></td><td class="text-[var(--text-muted)]">Zahlwörter → Ziffern.</td></tr>
                    <tr><td><strong>{TXTNATOALPHA:name}</strong></td><td class="text-[var(--text-muted)]">NATO-Wort → Buchstabe.</td></tr>
                    <tr><td><strong>{TXTALPHANATO:name}</strong></td><td class="text-[var(--text-muted)]">Buchstabe → NATO-Wort.</td></tr>
                    <tr><td><strong>{TXTTITLE:name}</strong></td><td class="text-[var(--text-muted)]">Title-Case.</td></tr>
                    <tr><td><strong>{TXTCONCAT:a:b}</strong></td><td class="text-[var(--text-muted)]">Zwei Texte verketten.</td></tr>
                    <tr><td><strong>{TXTSUBSTR:t:start:len}</strong></td><td class="text-[var(--text-muted)]">Teilstring (0-basiert).</td></tr>
                    <tr><td><strong>{TXTPOS:a:b:start}</strong></td><td class="text-[var(--text-muted)]">Erste Position von a in b.</td></tr>
                    <tr><td><strong>{TXTLASTPOS:a:b}</strong></td><td class="text-[var(--text-muted)]">Letzte Position von a in b.</td></tr>
                    <tr><td><strong>{TXTOCCURRENCES:a:b}</strong></td><td class="text-[var(--text-muted)]">Anzahl Vorkommen von a in b.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{TXTTRANDOM:a;b;c}</strong></td><td class="text-[var(--text-muted)]">Random selection from values.</td></tr>
                    <tr><td><strong>{TXTLEN:name}</strong></td><td class="text-[var(--text-muted)]">Length of a text.</td></tr>
                    <tr><td><strong>{TXTUPPER:name}</strong></td><td class="text-[var(--text-muted)]">Text in uppercase.</td></tr>
                    <tr><td><strong>{TXTLOWER:name}</strong></td><td class="text-[var(--text-muted)]">Text in lowercase.</td></tr>
                    <tr><td><strong>{TXTTRIM:name}</strong></td><td class="text-[var(--text-muted)]">Trim leading/trailing spaces.</td></tr>
                    <tr><td><strong>{TXTREPLACEVAR:src:from:to}</strong></td><td class="text-[var(--text-muted)]">Replace text (variables).</td></tr>
                    <tr><td><strong>{TXTREGEXREPLACE:src:from:to}</strong></td><td class="text-[var(--text-muted)]">Regex replace.</td></tr>
                    <tr><td><strong>{TXTNUM:name}</strong></td><td class="text-[var(--text-muted)]">Keep only digits.</td></tr>
                    <tr><td><strong>{TXTALPHA:name}</strong></td><td class="text-[var(--text-muted)]">Keep only letters.</td></tr>
                    <tr><td><strong>{TXTWORDTONUM:name:sel}</strong></td><td class="text-[var(--text-muted)]">Number words → digits.</td></tr>
                    <tr><td><strong>{TXTNATOALPHA:name}</strong></td><td class="text-[var(--text-muted)]">NATO word → letter.</td></tr>
                    <tr><td><strong>{TXTALPHANATO:name}</strong></td><td class="text-[var(--text-muted)]">Letter → NATO word.</td></tr>
                    <tr><td><strong>{TXTTITLE:name}</strong></td><td class="text-[var(--text-muted)]">Title case.</td></tr>
                    <tr><td><strong>{TXTCONCAT:a:b}</strong></td><td class="text-[var(--text-muted)]">Concatenate two texts.</td></tr>
                    <tr><td><strong>{TXTSUBSTR:t:start:len}</strong></td><td class="text-[var(--text-muted)]">Substring (0-based).</td></tr>
                    <tr><td><strong>{TXTPOS:a:b:start}</strong></td><td class="text-[var(--text-muted)]">First position of a in b.</td></tr>
                    <tr><td><strong>{TXTLASTPOS:a:b}</strong></td><td class="text-[var(--text-muted)]">Last position of a in b.</td></tr>
                    <tr><td><strong>{TXTOCCURRENCES:a:b}</strong></td><td class="text-[var(--text-muted)]">Occurrences of a in b.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 6 — MATH & MISC
           ============================================================ */
        {
            id: 'section6',
            titleDe: '6. Mathe & sonstige Tokens',
            titleEn: '6. Math & Misc Tokens',
            introDe: 'Ausdrücke, Zufallszahlen, GUIDs und Sonderzeichen.',
            introEn: 'Expressions, random numbers, GUIDs, and special characters.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Ausdrücke & Zufall',
                    titleEn: 'Expressions & Random',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{EXP:expression}</strong></td><td class="text-[var(--text-muted)]">Mathematischer/vergleichender Ausdruck (kulturabhängig).</td></tr>
                    <tr><td><strong>{EXPDECINV:expression}</strong></td><td class="text-[var(--text-muted)]">Ausdruck mit invariantem Dezimalpunkt.</td></tr>
                    <tr><td><strong>{RANDOM:low:high}</strong></td><td class="text-[var(--text-muted)]">Zufällige Ganzzahl zwischen low und high.</td></tr>
                    <tr><td><strong>{RANDOMDEC:low:high}</strong></td><td class="text-[var(--text-muted)]">Zufällige Dezimalzahl.</td></tr>
                    <tr><td><strong>{RANDOM:low:high}</strong> (Alias)</td><td class="text-[var(--text-muted)]">Siehe oben.</td></tr>
                    <tr><td><strong>{GUID}</strong></td><td class="text-[var(--text-muted)]">Neue GUID (36 Zeichen mit Bindestrichen).</td></tr>
                    <tr><td><strong>{GUIDCLEAN}</strong></td><td class="text-[var(--text-muted)]">GUID ohne Bindestriche (32 Zeichen).</td></tr>
                    <tr><td><strong>{ASCII:n}</strong></td><td class="text-[var(--text-muted)]">ASCII-Zeichen (0–127) als Text.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{EXP:expression}</strong></td><td class="text-[var(--text-muted)]">Math/comparison expression (culture-aware).</td></tr>
                    <tr><td><strong>{EXPDECINV:expression}</strong></td><td class="text-[var(--text-muted)]">Expression with invariant decimal point.</td></tr>
                    <tr><td><strong>{RANDOM:low:high}</strong></td><td class="text-[var(--text-muted)]">Random integer between low and high.</td></tr>
                    <tr><td><strong>{RANDOMDEC:low:high}</strong></td><td class="text-[var(--text-muted)]">Random decimal.</td></tr>
                    <tr><td><strong>{RANDOM:low:high}</strong> (alias)</td><td class="text-[var(--text-muted)]">See above.</td></tr>
                    <tr><td><strong>{GUID}</strong></td><td class="text-[var(--text-muted)]">New GUID (36 chars with dashes).</td></tr>
                    <tr><td><strong>{GUIDCLEAN}</strong></td><td class="text-[var(--text-muted)]">GUID without dashes (32 chars).</td></tr>
                    <tr><td><strong>{ASCII:n}</strong></td><td class="text-[var(--text-muted)]">ASCII character (0–127) as text.</td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Sonderzeichen',
                    titleEn: 'Special Characters',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{SPACE}</strong></td><td class="text-[var(--text-muted)]">Ein einzelnes Leerzeichen.</td></tr>
                    <tr><td><strong>{NEWLINE}</strong></td><td class="text-[var(--text-muted)]">Zeilenumbruch.</td></tr>
                    <tr><td><strong>{TAB}</strong></td><td class="text-[var(--text-muted)]">Tabulatorzeichen.</td></tr>
                    <tr><td><strong>{DOUBLEQUOTE}</strong></td><td class="text-[var(--text-muted)]">Doppeltes Anführungszeichen.</td></tr>
                    <tr><td><strong>{CLIP}</strong></td><td class="text-[var(--text-muted)]">Inhalt der Windows-Zwischenablage.</td></tr>
                    <tr><td><strong>{DICTATION}</strong></td><td class="text-[var(--text-muted)]">Inhalt des Diktierpuffers.</td></tr>
                    <tr><td><strong>{DICTATION:options}</strong></td><td class="text-[var(--text-muted)]">Diktat mit Optionen (PERIOD, CAPITAL, LATEST, UPPERCASE, LOWERCASE, NEWLINE, SPACEn).</td></tr>
                    <tr><td><strong>{DICTATIONMODE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Diktat aktiv, sonst "0".</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[28%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{SPACE}</strong></td><td class="text-[var(--text-muted)]">Single space.</td></tr>
                    <tr><td><strong>{NEWLINE}</strong></td><td class="text-[var(--text-muted)]">Newline.</td></tr>
                    <tr><td><strong>{TAB}</strong></td><td class="text-[var(--text-muted)]">Tab character.</td></tr>
                    <tr><td><strong>{DOUBLEQUOTE}</strong></td><td class="text-[var(--text-muted)]">Double quote.</td></tr>
                    <tr><td><strong>{CLIP}</strong></td><td class="text-[var(--text-muted)]">Windows clipboard contents.</td></tr>
                    <tr><td><strong>{DICTATION}</strong></td><td class="text-[var(--text-muted)]">Dictation buffer contents.</td></tr>
                    <tr><td><strong>{DICTATION:options}</strong></td><td class="text-[var(--text-muted)]">Dictation with options (PERIOD, CAPITAL, LATEST, UPPERCASE, LOWERCASE, NEWLINE, SPACEn).</td></tr>
                    <tr><td><strong>{DICTATIONMODE}</strong></td><td class="text-[var(--text-muted)]">"1" if dictation is on, otherwise "0".</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 7 — STATE / SYSTEM
           ============================================================ */
        {
            id: 'section7',
            titleDe: '7. State- & System-Tokens',
            titleEn: '7. State & System Tokens',
            introDe: 'Tokens zu Geräten, Tastatur, Maus, VoiceAttack-Status, CPU, RAM und Dateien.',
            introEn: 'Tokens for devices, keyboard, mouse, VoiceAttack state, CPU, RAM, and files.',
            subtopics: [
                {
                    id: 'subsection7_1',
                    titleDe: 'VoiceAttack-Status',
                    titleEn: 'VoiceAttack State',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{STATE_LISTENING}</strong></td><td class="text-[var(--text-muted)]">"1" wenn VA gerade zuhört.</td></tr>
                    <tr><td><strong>{STATE_SPEECHACTIVE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn gerade Sprache erkannt wird.</td></tr>
                    <tr><td><strong>{STATE_SPEECHENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Spracherkennung verfügbar ist.</td></tr>
                    <tr><td><strong>{STATE_SPEECHCULTURE}</strong></td><td class="text-[var(--text-muted)]">Sprache der Spracherkennung.</td></tr>
                    <tr><td><strong>{STATE_SPEECHINSTALLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Speech Platform 11 genutzt wird.</td></tr>
                    <tr><td><strong>{STATE_SHORTCUTS}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Tastatur-Shortcuts aktiv.</td></tr>
                    <tr><td><strong>{STATE_MOUSESHORTCUTS}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Maus-Shortcuts aktiv.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKSHORTCUTS}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Joystick-Shortcuts aktiv.</td></tr>
                    <tr><td><strong>{STATE_KEYBOARDHOOKENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Tastatur-Hook aktiv.</td></tr>
                    <tr><td><strong>{STATE_MOUSEHOOKENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Maus-Hook aktiv.</td></tr>
                    <tr><td><strong>{STATE_LASTINPUT}</strong></td><td class="text-[var(--text-muted)]">Sekunden seit letzter Windows-Eingabe.</td></tr>
                    <tr><td><strong>{STATE_AUDIOLEVEL}</strong></td><td class="text-[var(--text-muted)]">Aktueller Audio-Pegel (0–100).</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION}</strong></td><td class="text-[var(--text-muted)]">Vollständige VA-Version, z. B. "1.5.12.15".</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION_MAJOR}</strong> / MINOR / BUILD / REVISION</td><td class="text-[var(--text-muted)]">Einzelne Versionskomponenten.</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION_ISRELEASE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Release, "0" wenn Beta.</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION_COMPARE:ver}</strong></td><td class="text-[var(--text-muted)]">"1" wenn VA-Version >= ver.</td></tr>
                    <tr><td><strong>{STATE_VA_PLUGINSENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Plugins aktiviert.</td></tr>
                    <tr><td><strong>{STATE_VA_NESTEDTOKENSENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn verschachtelte Tokens aktiviert.</td></tr>
                    <tr><td><strong>{STATE_VA_IS64BIT}</strong></td><td class="text-[var(--text-muted)]">"1" wenn VA als 64-Bit läuft.</td></tr>
                    <tr><td><strong>{STATE_VA_DARKMODE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Dark Mode aktiv.</td></tr>
                    <tr><td><strong>{STATE_VA_LOGREVERSED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Log umgekehrt sortiert.</td></tr>
                    <tr><td><strong>{STATE_VA_UPTIME}</strong></td><td class="text-[var(--text-muted)]">Laufzeit als "D H:MM:SS".</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{STATE_LISTENING}</strong></td><td class="text-[var(--text-muted)]">"1" if VA is listening.</td></tr>
                    <tr><td><strong>{STATE_SPEECHACTIVE}</strong></td><td class="text-[var(--text-muted)]">"1" if speech is currently detected.</td></tr>
                    <tr><td><strong>{STATE_SPEECHENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if speech recognition is available.</td></tr>
                    <tr><td><strong>{STATE_SPEECHCULTURE}</strong></td><td class="text-[var(--text-muted)]">Culture of the speech engine.</td></tr>
                    <tr><td><strong>{STATE_SPEECHINSTALLED}</strong></td><td class="text-[var(--text-muted)]">"1" if Speech Platform 11 is used.</td></tr>
                    <tr><td><strong>{STATE_SHORTCUTS}</strong></td><td class="text-[var(--text-muted)]">"1" if keyboard shortcuts enabled.</td></tr>
                    <tr><td><strong>{STATE_MOUSESHORTCUTS}</strong></td><td class="text-[var(--text-muted)]">"1" if mouse shortcuts enabled.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKSHORTCUTS}</strong></td><td class="text-[var(--text-muted)]">"1" if joystick shortcuts enabled.</td></tr>
                    <tr><td><strong>{STATE_KEYBOARDHOOKENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if keyboard hook is active.</td></tr>
                    <tr><td><strong>{STATE_MOUSEHOOKENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if mouse hook is active.</td></tr>
                    <tr><td><strong>{STATE_LASTINPUT}</strong></td><td class="text-[var(--text-muted)]">Seconds since last Windows input.</td></tr>
                    <tr><td><strong>{STATE_AUDIOLEVEL}</strong></td><td class="text-[var(--text-muted)]">Current audio level (0–100).</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION}</strong></td><td class="text-[var(--text-muted)]">Full VA version, e.g. "1.5.12.15".</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION_MAJOR}</strong> / MINOR / BUILD / REVISION</td><td class="text-[var(--text-muted)]">Individual version components.</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION_ISRELEASE}</strong></td><td class="text-[var(--text-muted)]">"1" if release, "0" if beta.</td></tr>
                    <tr><td><strong>{STATE_VA_VERSION_COMPARE:ver}</strong></td><td class="text-[var(--text-muted)]">"1" if VA version >= ver.</td></tr>
                    <tr><td><strong>{STATE_VA_PLUGINSENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if plugins are enabled.</td></tr>
                    <tr><td><strong>{STATE_VA_NESTEDTOKENSENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if nested tokens are enabled.</td></tr>
                    <tr><td><strong>{STATE_VA_IS64BIT}</strong></td><td class="text-[var(--text-muted)]">"1" if VA runs as 64-bit.</td></tr>
                    <tr><td><strong>{STATE_VA_DARKMODE}</strong></td><td class="text-[var(--text-muted)]">"1" if dark mode is on.</td></tr>
                    <tr><td><strong>{STATE_VA_LOGREVERSED}</strong></td><td class="text-[var(--text-muted)]">"1" if log is reversed.</td></tr>
                    <tr><td><strong>{STATE_VA_UPTIME}</strong></td><td class="text-[var(--text-muted)]">Uptime as "D H:MM:SS".</td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection7_2',
                    titleDe: 'Tastatur, Maus & Systemressourcen',
                    titleEn: 'Keyboard, Mouse & System Resources',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{STATE_KEYSTATE:key}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Taste gedrückt (z. B. F10, A, LCTRL).</td></tr>
                    <tr><td><strong>{STATE_ANYKEYDOWN}</strong></td><td class="text-[var(--text-muted)]">"1" wenn irgendeine Taste gedrückt.</td></tr>
                    <tr><td><strong>{STATE_KEYCAPTION:n}</strong></td><td class="text-[var(--text-muted)]">Textbezeichnung eines virtuellen Tastencodes.</td></tr>
                    <tr><td><strong>{STATE_LEFTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn linke Maustaste gedrückt.</td></tr>
                    <tr><td><strong>{STATE_RIGHTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn rechte Maustaste gedrückt.</td></tr>
                    <tr><td><strong>{STATE_MIDDLEMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn mittlere Maustaste gedrückt.</td></tr>
                    <tr><td><strong>{STATE_FORWARDMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn vordere Maustaste gedrückt.</td></tr>
                    <tr><td><strong>{STATE_BACKMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn hintere Maustaste gedrückt.</td></tr>
                    <tr><td><strong>{STATE_ANYMOUSEDOWN}</strong></td><td class="text-[var(--text-muted)]">"1" wenn eine beliebige Maustaste gedrückt.</td></tr>
                    <tr><td><strong>{STATE_CPU}</strong></td><td class="text-[var(--text-muted)]">CPU-Auslastung gesamt (0–100).</td></tr>
                    <tr><td><strong>{STATE_CPU:n}</strong></td><td class="text-[var(--text-muted)]">CPU-Auslastung Kern n.</td></tr>
                    <tr><td><strong>{STATE_RAMTOTAL}</strong></td><td class="text-[var(--text-muted)]">Gesamter RAM in Bytes.</td></tr>
                    <tr><td><strong>{STATE_RAMAVAILABLE}</strong></td><td class="text-[var(--text-muted)]">Verfügbarer RAM in Bytes.</td></tr>
                    <tr><td><strong>{STATE_SYSDIR}</strong></td><td class="text-[var(--text-muted)]">Pfad zum Systemverzeichnis.</td></tr>
                    <tr><td><strong>{STATE_WINDIR}</strong></td><td class="text-[var(--text-muted)]">Pfad zum Windows-Verzeichnis.</td></tr>
                    <tr><td><strong>{STATE_ENV:name}</strong></td><td class="text-[var(--text-muted)]">Windows-Umgebungsvariable.</td></tr>
                    <tr><td><strong>{STATE_CULTURE}</strong></td><td class="text-[var(--text-muted)]">Benutzer-Locale.</td></tr>
                    <tr><td><strong>{STATE_UICULTURE}</strong></td><td class="text-[var(--text-muted)]">UI-Sprache.</td></tr>
                    <tr><td><strong>{STATE_FILEEXISTS:path}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Datei existiert.</td></tr>
                    <tr><td><strong>{STATE_DIRECTORYEXISTS:path}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Ordner existiert.</td></tr>
                    <tr><td><strong>{STATE_DIRECTORYHASFILES:path}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Ordner Dateien enthält.</td></tr>
                    <tr><td><strong>{CAPSLOCKON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Caps Lock aktiv.</td></tr>
                    <tr><td><strong>{NUMLOCKON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Num Lock aktiv.</td></tr>
                    <tr><td><strong>{SCROLLLOCKON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Scroll Lock aktiv.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{STATE_KEYSTATE:key}</strong></td><td class="text-[var(--text-muted)]">"1" if key is down (e.g. F10, A, LCTRL).</td></tr>
                    <tr><td><strong>{STATE_ANYKEYDOWN}</strong></td><td class="text-[var(--text-muted)]">"1" if any key is down.</td></tr>
                    <tr><td><strong>{STATE_KEYCAPTION:n}</strong></td><td class="text-[var(--text-muted)]">Caption for a virtual key code.</td></tr>
                    <tr><td><strong>{STATE_LEFTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" if left mouse button is down.</td></tr>
                    <tr><td><strong>{STATE_RIGHTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" if right mouse button is down.</td></tr>
                    <tr><td><strong>{STATE_MIDDLEMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" if middle mouse button is down.</td></tr>
                    <tr><td><strong>{STATE_FORWARDMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" if forward mouse button is down.</td></tr>
                    <tr><td><strong>{STATE_BACKMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" if back mouse button is down.</td></tr>
                    <tr><td><strong>{STATE_ANYMOUSEDOWN}</strong></td><td class="text-[var(--text-muted)]">"1" if any mouse button is down.</td></tr>
                    <tr><td><strong>{STATE_CPU}</strong></td><td class="text-[var(--text-muted)]">Total CPU usage (0–100).</td></tr>
                    <tr><td><strong>{STATE_CPU:n}</strong></td><td class="text-[var(--text-muted)]">CPU usage of core n.</td></tr>
                    <tr><td><strong>{STATE_RAMTOTAL}</strong></td><td class="text-[var(--text-muted)]">Total RAM in bytes.</td></tr>
                    <tr><td><strong>{STATE_RAMAVAILABLE}</strong></td><td class="text-[var(--text-muted)]">Available RAM in bytes.</td></tr>
                    <tr><td><strong>{STATE_SYSDIR}</strong></td><td class="text-[var(--text-muted)]">System directory path.</td></tr>
                    <tr><td><strong>{STATE_WINDIR}</strong></td><td class="text-[var(--text-muted)]">Windows directory path.</td></tr>
                    <tr><td><strong>{STATE_ENV:name}</strong></td><td class="text-[var(--text-muted)]">Windows environment variable.</td></tr>
                    <tr><td><strong>{STATE_CULTURE}</strong></td><td class="text-[var(--text-muted)]">User locale.</td></tr>
                    <tr><td><strong>{STATE_UICULTURE}</strong></td><td class="text-[var(--text-muted)]">UI culture.</td></tr>
                    <tr><td><strong>{STATE_FILEEXISTS:path}</strong></td><td class="text-[var(--text-muted)]">"1" if file exists.</td></tr>
                    <tr><td><strong>{STATE_DIRECTORYEXISTS:path}</strong></td><td class="text-[var(--text-muted)]">"1" if directory exists.</td></tr>
                    <tr><td><strong>{STATE_DIRECTORYHASFILES:path}</strong></td><td class="text-[var(--text-muted)]">"1" if directory has files.</td></tr>
                    <tr><td><strong>{CAPSLOCKON}</strong></td><td class="text-[var(--text-muted)]">"1" if Caps Lock is on.</td></tr>
                    <tr><td><strong>{NUMLOCKON}</strong></td><td class="text-[var(--text-muted)]">"1" if Num Lock is on.</td></tr>
                    <tr><td><strong>{SCROLLLOCKON}</strong></td><td class="text-[var(--text-muted)]">"1" if Scroll Lock is on.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 8 — JOYSTICK STATE
           ============================================================ */
        {
            id: 'section8',
            titleDe: '8. Joystick-State-Tokens',
            titleEn: '8. Joystick State Tokens',
            introDe: 'Tokens zu Joystick-Buttons, POV-Switches, Achsen und Gamepad-Triggern.',
            introEn: 'Tokens for joystick buttons, POV switches, axes, and gamepad triggers.',
            subtopics: [
                {
                    id: 'subsection8_1',
                    titleDe: 'Joystick-Buttons & POV',
                    titleEn: 'Joystick Buttons & POV',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{STATE_JOYSTICKnENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Joystick n (1–8) aktiviert ist.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKANYENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn irgendein Joystick aktiviert ist.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnISGAMEPAD}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Joystick n als Gamepad deklariert ist.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnBUTTON:m}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Button m auf Joystick n gedrückt ist.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnANYBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" wenn irgendein Button auf Joystick n gedrückt ist.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn POV an Joystick n aktiviert ist.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVmTYPE}</strong></td><td class="text-[var(--text-muted)]">POV-Typ: -1 (n/a), 0 (aus), 1 (on/off), 2 (2-Wege), 4 (4-Wege), 8 (8-Wege).</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVm}</strong></td><td class="text-[var(--text-muted)]">Richtung als Text: CENTER, UP, UPRIGHT, RIGHT, DOWNRIGHT, DOWN, DOWNLEFT, LEFT, UPLEFT.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVm_NUMERIC}</strong></td><td class="text-[var(--text-muted)]">Numerischer POV-Wert (-1 oder 0–35999).</td></tr>
                    </table></div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><em>Hinweis: Ersetzen Sie <code>n</code> durch 1–8 und <code>m</code> durch 1–4.</em></p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{STATE_JOYSTICKnENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if joystick n (1–8) is enabled.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKANYENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if any joystick is enabled.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnISGAMEPAD}</strong></td><td class="text-[var(--text-muted)]">"1" if joystick n is declared as gamepad.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnBUTTON:m}</strong></td><td class="text-[var(--text-muted)]">"1" if button m on joystick n is down.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnANYBUTTON}</strong></td><td class="text-[var(--text-muted)]">"1" if any button on joystick n is down.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVENABLED}</strong></td><td class="text-[var(--text-muted)]">"1" if POV on joystick n is enabled.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVmTYPE}</strong></td><td class="text-[var(--text-muted)]">POV type: -1 (n/a), 0 (off), 1 (on/off), 2 (2-way), 4 (4-way), 8 (8-way).</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVm}</strong></td><td class="text-[var(--text-muted)]">Direction as text: CENTER, UP, UPRIGHT, RIGHT, DOWNRIGHT, DOWN, DOWNLEFT, LEFT, UPLEFT.</td></tr>
                    <tr><td><strong>{STATE_JOYSTICKnPOVm_NUMERIC}</strong></td><td class="text-[var(--text-muted)]">Numeric POV value (-1 or 0–35999).</td></tr>
                    </table></div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><em>Note: Replace <code>n</code> with 1–8 and <code>m</code> with 1–4.</em></p>
                    `
                },
                {
                    id: 'subsection8_2',
                    titleDe: 'Joystick-Achsen',
                    titleEn: 'Joystick Axes',
                    htmlDe: `
                    <p class="text-xs">Alle Achsen-Tokens haben das Muster <code>{STATE_JOYSTICKn&lt;AXIS&gt;}</code> mit <code>n</code> = 1–8. Wert typisch 0–65535, oder -1 wenn nicht verfügbar.</p>
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Achse</th><th>Beschreibung</th></tr>
                    <tr><td><strong>X / Y / Z</strong></td><td class="text-[var(--text-muted)]">Hauptachsen (0–65535).</td></tr>
                    <tr><td><strong>ROTATIONX / ROTATIONY / ROTATIONZ</strong></td><td class="text-[var(--text-muted)]">Rotationsachsen (0–65535).</td></tr>
                    <tr><td><strong>SLIDER1 / SLIDER2</strong></td><td class="text-[var(--text-muted)]">Slider-Achsen.</td></tr>
                    <tr><td><strong>ACCELERATIONX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Beschleunigungswerte.</td></tr>
                    <tr><td><strong>ANGULARACCELERATIONX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Winkelbeschleunigung.</td></tr>
                    <tr><td><strong>ANGULARVELOCITYX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Winkelgeschwindigkeit.</td></tr>
                    <tr><td><strong>VELOCITYX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Geschwindigkeit.</td></tr>
                    <tr><td><strong>FORCEX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Kraft.</td></tr>
                    <tr><td><strong>TORQUEX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Drehmoment.</td></tr>
                    <tr><td><strong>ACCELERATIONSLIDER1/2</strong></td><td class="text-[var(--text-muted)]">Beschleunigung der Slider.</td></tr>
                    <tr><td><strong>FORCESLIDER1/2</strong></td><td class="text-[var(--text-muted)]">Kraft der Slider.</td></tr>
                    <tr><td><strong>VELOCITYSLIDER1/2</strong></td><td class="text-[var(--text-muted)]">Geschwindigkeit der Slider.</td></tr>
                    <tr><td><strong>LEFTTRIGGER / RIGHTTRIGGER</strong></td><td class="text-[var(--text-muted)]">Nur Gamepads: Trigger-Wert 0–255.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <p class="text-xs">All axis tokens follow the pattern <code>{STATE_JOYSTICKn&lt;AXIS&gt;}</code> with <code>n</code> = 1–8. Value typically 0–65535, or -1 if unavailable.</p>
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Axis</th><th>Description</th></tr>
                    <tr><td><strong>X / Y / Z</strong></td><td class="text-[var(--text-muted)]">Main axes (0–65535).</td></tr>
                    <tr><td><strong>ROTATIONX / ROTATIONY / ROTATIONZ</strong></td><td class="text-[var(--text-muted)]">Rotation axes (0–65535).</td></tr>
                    <tr><td><strong>SLIDER1 / SLIDER2</strong></td><td class="text-[var(--text-muted)]">Slider axes.</td></tr>
                    <tr><td><strong>ACCELERATIONX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Acceleration values.</td></tr>
                    <tr><td><strong>ANGULARACCELERATIONX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Angular acceleration.</td></tr>
                    <tr><td><strong>ANGULARVELOCITYX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Angular velocity.</td></tr>
                    <tr><td><strong>VELOCITYX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Velocity.</td></tr>
                    <tr><td><strong>FORCEX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Force.</td></tr>
                    <tr><td><strong>TORQUEX/Y/Z</strong></td><td class="text-[var(--text-muted)]">Torque.</td></tr>
                    <tr><td><strong>ACCELERATIONSLIDER1/2</strong></td><td class="text-[var(--text-muted)]">Slider acceleration.</td></tr>
                    <tr><td><strong>FORCESLIDER1/2</strong></td><td class="text-[var(--text-muted)]">Slider force.</td></tr>
                    <tr><td><strong>VELOCITYSLIDER1/2</strong></td><td class="text-[var(--text-muted)]">Slider velocity.</td></tr>
                    <tr><td><strong>LEFTTRIGGER / RIGHTTRIGGER</strong></td><td class="text-[var(--text-muted)]">Gamepads only: trigger value 0–255.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 9 — WINDOWS & PROCESSES
           ============================================================ */
        {
            id: 'section9',
            titleDe: '9. Fenster- & Prozess-Tokens',
            titleEn: '9. Window & Process Tokens',
            introDe: 'Tokens für das aktive Fenster sowie für Prozess- und Fensterabfragen.',
            introEn: 'Tokens for the active window and process/window queries.',
            subtopics: [
                {
                    id: 'subsection9_1',
                    titleDe: 'Aktives Fenster',
                    titleEn: 'Active Window',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{ACTIVEWINDOWTITLE}</strong></td><td class="text-[var(--text-muted)]">Titel des aktiven Fensters.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWPROCESSNAME}</strong></td><td class="text-[var(--text-muted)]">Prozessname des aktiven Fensters.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWPROCESSID}</strong></td><td class="text-[var(--text-muted)]">Prozess-ID des aktiven Fensters.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWPATH}</strong></td><td class="text-[var(--text-muted)]">Pfad der ausführbaren Datei.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWWIDTH}</strong></td><td class="text-[var(--text-muted)]">Breite des aktiven Fensters.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWHEIGHT}</strong></td><td class="text-[var(--text-muted)]">Höhe des aktiven Fensters.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWLEFT}</strong></td><td class="text-[var(--text-muted)]">Linke X-Koordinate.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWTOP}</strong></td><td class="text-[var(--text-muted)]">Obere Y-Koordinate.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWRIGHT}</strong></td><td class="text-[var(--text-muted)]">Rechte X-Koordinate (left + width).</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWBOTTOM}</strong></td><td class="text-[var(--text-muted)]">Untere Y-Koordinate (top + height).</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{ACTIVEWINDOWTITLE}</strong></td><td class="text-[var(--text-muted)]">Title of the active window.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWPROCESSNAME}</strong></td><td class="text-[var(--text-muted)]">Process name of the active window.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWPROCESSID}</strong></td><td class="text-[var(--text-muted)]">Process ID of the active window.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWPATH}</strong></td><td class="text-[var(--text-muted)]">Executable path.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWWIDTH}</strong></td><td class="text-[var(--text-muted)]">Active window width.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWHEIGHT}</strong></td><td class="text-[var(--text-muted)]">Active window height.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWLEFT}</strong></td><td class="text-[var(--text-muted)]">Left X coordinate.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWTOP}</strong></td><td class="text-[var(--text-muted)]">Top Y coordinate.</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWRIGHT}</strong></td><td class="text-[var(--text-muted)]">Right X (left + width).</td></tr>
                    <tr><td><strong>{ACTIVEWINDOWBOTTOM}</strong></td><td class="text-[var(--text-muted)]">Bottom Y (top + height).</td></tr>
                    </table></div>
                    `
                },
                {
                    id: 'subsection9_2',
                    titleDe: 'Prozess- & Fensterabfragen',
                    titleEn: 'Process & Window Queries',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{PROCESSEXISTS:name}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Prozess existiert (Wildcards erlaubt).</td></tr>
                    <tr><td><strong>{PROCESSCOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Anzahl Prozessinstanzen (Wildcards erlaubt).</td></tr>
                    <tr><td><strong>{PROCESSFOREGROUND:name}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Prozess im Vordergrund.</td></tr>
                    <tr><td><strong>{PROCESSMINIMIZED:name}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Prozess minimiert.</td></tr>
                    <tr><td><strong>{PROCESSMAXIMIZED:name}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Prozess maximiert.</td></tr>
                    <tr><td><strong>{WINDOWEXISTS:title}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Fenster existiert (Wildcards erlaubt).</td></tr>
                    <tr><td><strong>{WINDOWFOREGROUND:title}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Fenster im Vordergrund.</td></tr>
                    <tr><td><strong>{WINDOWMINIMIZED:title}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Fenster minimiert.</td></tr>
                    <tr><td><strong>{WINDOWMAXIMIZED:title}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Fenster maximiert.</td></tr>
                    <tr><td><strong>{WINDOWCOUNT:title}</strong></td><td class="text-[var(--text-muted)]">Anzahl Fenster mit passendem Titel.</td></tr>
                    <tr><td><strong>{WINDOWTITLEUNDERMOUSE}</strong></td><td class="text-[var(--text-muted)]">Titel des Fensters unter dem Cursor.</td></tr>
                    <tr><td><strong>{WINDOWPROCESSUNDERMOUSE}</strong></td><td class="text-[var(--text-muted)]">Prozessname des Fensters unter dem Cursor.</td></tr>
                    <tr><td><strong>{CMDARTGETFOREGROUND}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Command-Target im Vordergrund.</td></tr>
                    <tr><td><strong>{CMDARTGETMINIMIZED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Command-Target minimiert.</td></tr>
                    <tr><td><strong>{CMDARTGETMAXIMIZED}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Command-Target maximiert.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{PROCESSEXISTS:name}</strong></td><td class="text-[var(--text-muted)]">"1" if process exists (wildcards allowed).</td></tr>
                    <tr><td><strong>{PROCESSCOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Number of process instances (wildcards allowed).</td></tr>
                    <tr><td><strong>{PROCESSFOREGROUND:name}</strong></td><td class="text-[var(--text-muted)]">"1" if process is foreground.</td></tr>
                    <tr><td><strong>{PROCESSMINIMIZED:name}</strong></td><td class="text-[var(--text-muted)]">"1" if process is minimized.</td></tr>
                    <tr><td><strong>{PROCESSMAXIMIZED:name}</strong></td><td class="text-[var(--text-muted)]">"1" if process is maximized.</td></tr>
                    <tr><td><strong>{WINDOWEXISTS:title}</strong></td><td class="text-[var(--text-muted)]">"1" if window exists (wildcards allowed).</td></tr>
                    <tr><td><strong>{WINDOWFOREGROUND:title}</strong></td><td class="text-[var(--text-muted)]">"1" if window is foreground.</td></tr>
                    <tr><td><strong>{WINDOWMINIMIZED:title}</strong></td><td class="text-[var(--text-muted)]">"1" if window is minimized.</td></tr>
                    <tr><td><strong>{WINDOWMAXIMIZED:title}</strong></td><td class="text-[var(--text-muted)]">"1" if window is maximized.</td></tr>
                    <tr><td><strong>{WINDOWCOUNT:title}</strong></td><td class="text-[var(--text-muted)]">Number of windows with matching title.</td></tr>
                    <tr><td><strong>{WINDOWTITLEUNDERMOUSE}</strong></td><td class="text-[var(--text-muted)]">Title of the window under the cursor.</td></tr>
                    <tr><td><strong>{WINDOWPROCESSUNDERMOUSE}</strong></td><td class="text-[var(--text-muted)]">Process name of the window under the cursor.</td></tr>
                    <tr><td><strong>{CMDARTGETFOREGROUND}</strong></td><td class="text-[var(--text-muted)]">"1" if command target is foreground.</td></tr>
                    <tr><td><strong>{CMDARTGETMINIMIZED}</strong></td><td class="text-[var(--text-muted)]">"1" if command target is minimized.</td></tr>
                    <tr><td><strong>{CMDARTGETMAXIMIZED}</strong></td><td class="text-[var(--text-muted)]">"1" if command target is maximized.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 10 — AUDIO
           ============================================================ */
        {
            id: 'section10',
            titleDe: '10. Audio-Tokens',
            titleEn: '10. Audio Tokens',
            introDe: 'Tokens zu Wiedergabegeräten, Aufnahmegeräten und Audio-Streams.',
            introEn: 'Tokens for playback devices, recording devices, and audio streams.',
            subtopics: [
                {
                    id: 'subsection10_1',
                    titleDe: 'Audio-Geräte & Streams',
                    titleEn: 'Audio Devices & Streams',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{STATE_DEFAULTPLAYBACK}</strong></td><td class="text-[var(--text-muted)]">Standard-Wiedergabegerät.</td></tr>
                    <tr><td><strong>{STATE_DEFAULTPLAYBACKCOMMS}</strong></td><td class="text-[var(--text-muted)]">Standard-Kommunikations-Wiedergabegerät.</td></tr>
                    <tr><td><strong>{STATE_PLAYBACKDEVICECOUNT}</strong></td><td class="text-[var(--text-muted)]">Anzahl Wiedergabegeräte.</td></tr>
                    <tr><td><strong>{STATE_PLAYBACKDEVICE:n}</strong></td><td class="text-[var(--text-muted)]">Name des n-ten Wiedergabegeräts (0-basiert).</td></tr>
                    <tr><td><strong>{STATE_DEFAULTRECORDING}</strong></td><td class="text-[var(--text-muted)]">Standard-Aufnahmegerät.</td></tr>
                    <tr><td><strong>{STATE_DEFAULTRECORDINGCOMMS}</strong></td><td class="text-[var(--text-muted)]">Standard-Kommunikations-Aufnahmegerät.</td></tr>
                    <tr><td><strong>{STATE_RECORDINGDEVICECOUNT}</strong></td><td class="text-[var(--text-muted)]">Anzahl Aufnahmegeräte.</td></tr>
                    <tr><td><strong>{STATE_RECORDINGDEVICE:n}</strong></td><td class="text-[var(--text-muted)]">Name des n-ten Aufnahmegeräts.</td></tr>
                    <tr><td><strong>{STATE_AUDIOOUTPUTTYPE}</strong></td><td class="text-[var(--text-muted)]">Legacy, Windows oder Integrated.</td></tr>
                    <tr><td><strong>{STATE_AUDIOCOUNT}</strong></td><td class="text-[var(--text-muted)]">Anzahl laufender Audio-Streams.</td></tr>
                    <tr><td><strong>{STATE_AUDIOCOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Anzahl Instanzen einer bestimmten Datei.</td></tr>
                    <tr><td><strong>{STATE_AUDIOPOS:name}</strong></td><td class="text-[var(--text-muted)]">Aktuelle Abspielposition (Sekunden).</td></tr>
                    <tr><td><strong>{STATE_AUDIOLASTFILE}</strong></td><td class="text-[var(--text-muted)]">Pfad der zuletzt gespielten Datei.</td></tr>
                    <tr><td><strong>{STATE_TTSCOUNT}</strong></td><td class="text-[var(--text-muted)]">Anzahl laufender TTS-Instanzen (-1 bei Fehler).</td></tr>
                    <tr><td><strong>{STATE_SYSVOL}</strong></td><td class="text-[var(--text-muted)]">Systemlautstärke (0–100).</td></tr>
                    <tr><td><strong>{STATE_SYSMUTE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn System stumm.</td></tr>
                    <tr><td><strong>{STATE_MICVOL}</strong></td><td class="text-[var(--text-muted)]">Mikrofonlautstärke (0–100).</td></tr>
                    <tr><td><strong>{STATE_MICMUTE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Mikrofon stumm.</td></tr>
                    <tr><td><strong>{STATE_APPVOL:app}</strong></td><td class="text-[var(--text-muted)]">Lautstärke einer Anwendung (0–100 oder -1).</td></tr>
                    <tr><td><strong>{STATE_APPMUTE:app}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Anwendung stumm.</td></tr>
                    <tr><td><strong>{STATE_SPEECHDEVICEMUTE}</strong></td><td class="text-[var(--text-muted)]">"1" wenn Speech-Device stumm.</td></tr>
                    <tr><td><strong>{STATE_SPEECHDEVICEVOL}</strong></td><td class="text-[var(--text-muted)]">Lautstärke des Speech-Devices (0–100).</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{STATE_DEFAULTPLAYBACK}</strong></td><td class="text-[var(--text-muted)]">Default playback device.</td></tr>
                    <tr><td><strong>{STATE_DEFAULTPLAYBACKCOMMS}</strong></td><td class="text-[var(--text-muted)]">Default communications playback device.</td></tr>
                    <tr><td><strong>{STATE_PLAYBACKDEVICECOUNT}</strong></td><td class="text-[var(--text-muted)]">Number of playback devices.</td></tr>
                    <tr><td><strong>{STATE_PLAYBACKDEVICE:n}</strong></td><td class="text-[var(--text-muted)]">Name of the nth playback device (0-based).</td></tr>
                    <tr><td><strong>{STATE_DEFAULTRECORDING}</strong></td><td class="text-[var(--text-muted)]">Default recording device.</td></tr>
                    <tr><td><strong>{STATE_DEFAULTRECORDINGCOMMS}</strong></td><td class="text-[var(--text-muted)]">Default communications recording device.</td></tr>
                    <tr><td><strong>{STATE_RECORDINGDEVICECOUNT}</strong></td><td class="text-[var(--text-muted)]">Number of recording devices.</td></tr>
                    <tr><td><strong>{STATE_RECORDINGDEVICE:n}</strong></td><td class="text-[var(--text-muted)]">Name of the nth recording device.</td></tr>
                    <tr><td><strong>{STATE_AUDIOOUTPUTTYPE}</strong></td><td class="text-[var(--text-muted)]">Legacy, Windows, or Integrated.</td></tr>
                    <tr><td><strong>{STATE_AUDIOCOUNT}</strong></td><td class="text-[var(--text-muted)]">Number of active audio streams.</td></tr>
                    <tr><td><strong>{STATE_AUDIOCOUNT:name}</strong></td><td class="text-[var(--text-muted)]">Number of instances of a specific file.</td></tr>
                    <tr><td><strong>{STATE_AUDIOPOS:name}</strong></td><td class="text-[var(--text-muted)]">Current playback position (seconds).</td></tr>
                    <tr><td><strong>{STATE_AUDIOLASTFILE}</strong></td><td class="text-[var(--text-muted)]">Path of the last played file.</td></tr>
                    <tr><td><strong>{STATE_TTSCOUNT}</strong></td><td class="text-[var(--text-muted)]">Number of running TTS instances (-1 on error).</td></tr>
                    <tr><td><strong>{STATE_SYSVOL}</strong></td><td class="text-[var(--text-muted)]">System volume (0–100).</td></tr>
                    <tr><td><strong>{STATE_SYSMUTE}</strong></td><td class="text-[var(--text-muted)]">"1" if system is muted.</td></tr>
                    <tr><td><strong>{STATE_MICVOL}</strong></td><td class="text-[var(--text-muted)]">Microphone volume (0–100).</td></tr>
                    <tr><td><strong>{STATE_MICMUTE}</strong></td><td class="text-[var(--text-muted)]">"1" if microphone is muted.</td></tr>
                    <tr><td><strong>{STATE_APPVOL:app}</strong></td><td class="text-[var(--text-muted)]">Application volume (0–100 or -1).</td></tr>
                    <tr><td><strong>{STATE_APPMUTE:app}</strong></td><td class="text-[var(--text-muted)]">"1" if application is muted.</td></tr>
                    <tr><td><strong>{STATE_SPEECHDEVICEMUTE}</strong></td><td class="text-[var(--text-muted)]">"1" if speech device is muted.</td></tr>
                    <tr><td><strong>{STATE_SPEECHDEVICEVOL}</strong></td><td class="text-[var(--text-muted)]">Speech device volume (0–100).</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 11 — PATHS
           ============================================================ */
        {
            id: 'section11',
            titleDe: '11. Pfad-Tokens',
            titleEn: '11. Path Tokens',
            introDe: 'Tokens für Verzeichnispfade innerhalb von VoiceAttack und im Benutzerprofil.',
            introEn: 'Tokens for directory paths inside VoiceAttack and in the user profile.',
            subtopics: [
                {
                    id: 'subsection11_1',
                    titleDe: 'VoiceAttack-Pfade',
                    titleEn: 'VoiceAttack Paths',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{VA_DIR}</strong></td><td class="text-[var(--text-muted)]">Installationsverzeichnis von VoiceAttack.</td></tr>
                    <tr><td><strong>{VA_APPDATA}</strong></td><td class="text-[var(--text-muted)]">%APPDATA%\\VoiceAttack2.</td></tr>
                    <tr><td><strong>{VA_SOUNDS}</strong></td><td class="text-[var(--text-muted)]">Sounds-Verzeichnis.</td></tr>
                    <tr><td><strong>{VA_APPDATA_SOUNDS}</strong></td><td class="text-[var(--text-muted)]">Sounds im Benutzerprofil.</td></tr>
                    <tr><td><strong>{VA_APPS}</strong></td><td class="text-[var(--text-muted)]">Apps-Verzeichnis (Plugins, EXE).</td></tr>
                    <tr><td><strong>{VA_APPDATA_APPS}</strong></td><td class="text-[var(--text-muted)]">Apps im Benutzerprofil.</td></tr>
                    <tr><td><strong>{VA_ASSEMBLIES}</strong></td><td class="text-[var(--text-muted)]">Shared\\Assemblies im Installationsordner.</td></tr>
                    <tr><td><strong>{VA_APPDATA_ASSEMBLIES}</strong></td><td class="text-[var(--text-muted)]">Shared\\Assemblies im Benutzerprofil.</td></tr>
                    <tr><td><strong>{VA_APPDIR}</strong></td><td class="text-[var(--text-muted)]">VoiceAttack Installationsverzeichnis (Alias).</td></tr>
                    <tr><td><strong>{VA_APPDIR_SOUNDS}</strong></td><td class="text-[var(--text-muted)]">Standard-Sounds-Ordner (empfohlen).</td></tr>
                    <tr><td><strong>{VA_APPDIR_APPS}</strong></td><td class="text-[var(--text-muted)]">Standard-Apps-Ordner (empfohlen).</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{VA_DIR}</strong></td><td class="text-[var(--text-muted)]">VoiceAttack installation directory.</td></tr>
                    <tr><td><strong>{VA_APPDATA}</strong></td><td class="text-[var(--text-muted)]">%APPDATA%\\VoiceAttack2.</td></tr>
                    <tr><td><strong>{VA_SOUNDS}</strong></td><td class="text-[var(--text-muted)]">Sounds directory.</td></tr>
                    <tr><td><strong>{VA_APPDATA_SOUNDS}</strong></td><td class="text-[var(--text-muted)]">Sounds in the user profile.</td></tr>
                    <tr><td><strong>{VA_APPS}</strong></td><td class="text-[var(--text-muted)]">Apps directory (plugins, EXE).</td></tr>
                    <tr><td><strong>{VA_APPDATA_APPS}</strong></td><td class="text-[var(--text-muted)]">Apps in the user profile.</td></tr>
                    <tr><td><strong>{VA_ASSEMBLIES}</strong></td><td class="text-[var(--text-muted)]">Shared\\Assemblies in the install folder.</td></tr>
                    <tr><td><strong>{VA_APPDATA_ASSEMBLIES}</strong></td><td class="text-[var(--text-muted)]">Shared\\Assemblies in the user profile.</td></tr>
                    <tr><td><strong>{VA_APPDIR}</strong></td><td class="text-[var(--text-muted)]">VoiceAttack install dir (alias).</td></tr>
                    <tr><td><strong>{VA_APPDIR_SOUNDS}</strong></td><td class="text-[var(--text-muted)]">Default Sounds folder (recommended).</td></tr>
                    <tr><td><strong>{VA_APPDIR_APPS}</strong></td><td class="text-[var(--text-muted)]">Default Apps folder (recommended).</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 12 — MOUSE & MISC
           ============================================================ */
        {
            id: 'section12',
            titleDe: '12. Maus- & sonstige Tokens',
            titleEn: '12. Mouse & Misc Tokens',
            introDe: 'Mausposition, Tastaturstatus und weitere Sondertokens.',
            introEn: 'Mouse position, keyboard state, and other special tokens.',
            subtopics: [
                {
                    id: 'subsection12_1',
                    titleDe: 'Mausposition & Sonstiges',
                    titleEn: 'Mouse Position & Miscellaneous',
                    htmlDe: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{MOUSESCREENX}</strong></td><td class="text-[var(--text-muted)]">X-Position der Maus auf dem Bildschirm.</td></tr>
                    <tr><td><strong>{MOUSESCREENY}</strong></td><td class="text-[var(--text-muted)]">Y-Position der Maus auf dem Bildschirm.</td></tr>
                    <tr><td><strong>{MOUSEWINDOWX}</strong></td><td class="text-[var(--text-muted)]">X-Position der Maus relativ zum aktiven Fenster.</td></tr>
                    <tr><td><strong>{MOUSEWINDOWY}</strong></td><td class="text-[var(--text-muted)]">Y-Position der Maus relativ zum aktiven Fenster.</td></tr>
                    <tr><td><strong>{CLIP}</strong></td><td class="text-[var(--text-muted)]">Inhalt der Windows-Zwischenablage (Text).</td></tr>
                    <tr><td><strong>{DICTATION}</strong></td><td class="text-[var(--text-muted)]">Inhalt des Diktierpuffers.</td></tr>
                    </table></div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full"><table class="wikitable">
                    <tr><th class="w-[30%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{MOUSESCREENX}</strong></td><td class="text-[var(--text-muted)]">Mouse X position on screen.</td></tr>
                    <tr><td><strong>{MOUSESCREENY}</strong></td><td class="text-[var(--text-muted)]">Mouse Y position on screen.</td></tr>
                    <tr><td><strong>{MOUSEWINDOWX}</strong></td><td class="text-[var(--text-muted)]">Mouse X position relative to the active window.</td></tr>
                    <tr><td><strong>{MOUSEWINDOWY}</strong></td><td class="text-[var(--text-muted)]">Mouse Y position relative to the active window.</td></tr>
                    <tr><td><strong>{CLIP}</strong></td><td class="text-[var(--text-muted)]">Windows clipboard contents (text).</td></tr>
                    <tr><td><strong>{DICTATION}</strong></td><td class="text-[var(--text-muted)]">Dictation buffer contents.</td></tr>
                    </table></div>
                    `
                }
            ]
        },

        /* ============================================================
           TLDR
           ============================================================ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten Token-Kategorien auf einen Blick.',
            introEn: 'The most important token categories at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-terminal opacity-70"></i><span>1. Befehl</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{CMD}</code>, <code>{CATEGORY}</code>, <code>{CMDACTION}</code>, <code>{CMDCONFIDENCE}</code>, <code>{CMDSEGMENT:n}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-clock opacity-70"></i><span>2. Zeit</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{TIME}</code>, <code>{DATE}</code>, <code>{TIMESTAMP}</code>, <code>{DATEYEAR}</code> – alle auch mit <code>:dateVariableName</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-database opacity-70"></i><span>3. Variablen</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{TXT:n}</code>, <code>{INT:n}</code>, <code>{DEC:n}</code>, <code>{BOOL:n}</code>, <code>{SMALL:n}</code> – alle mit optionalem Default.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>4. System-State</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{STATE_LISTENING}</code>, <code>{STATE_CPU}</code>, <code>{STATE_RAMAVAILABLE}</code>, <code>{STATE_KEYSTATE:F10}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>5. Joystick</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{STATE_JOYSTICK1BUTTON:1}</code>, <code>{STATE_JOYSTICK1X}</code>, <code>{STATE_JOYSTICK1POV1}</code>, <code>{STATE_JOYSTICK1LEFTTRIGGER}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-window-restore opacity-70"></i><span>6. Fenster</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{ACTIVEWINDOWTITLE}</code>, <code>{PROCESSEXISTS:n}</code>, <code>{WINDOWEXISTS:title}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-folder opacity-70"></i><span>7. Pfade</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{VA_DIR}</code>, <code>{VA_APPDATA}</code>, <code>{VA_SOUNDS}</code>, <code>{VA_APPS}</code>, <code>{VA_APPDIR_SOUNDS}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-bolt opacity-70"></i><span>8. Mathe & Sonstiges</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{EXP:...}</code>, <code>{RANDOM:a:b}</code>, <code>{GUID}</code>, <code>{CLIP}</code>, <code>{DICTATION}</code>.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-terminal opacity-70"></i><span>1. Command</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{CMD}</code>, <code>{CATEGORY}</code>, <code>{CMDACTION}</code>, <code>{CMDCONFIDENCE}</code>, <code>{CMDSEGMENT:n}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-clock opacity-70"></i><span>2. Time</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{TIME}</code>, <code>{DATE}</code>, <code>{TIMESTAMP}</code>, <code>{DATEYEAR}</code> – all also with <code>:dateVariableName</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-database opacity-70"></i><span>3. Variables</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{TXT:n}</code>, <code>{INT:n}</code>, <code>{DEC:n}</code>, <code>{BOOL:n}</code>, <code>{SMALL:n}</code> – all with optional default.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>4. System State</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{STATE_LISTENING}</code>, <code>{STATE_CPU}</code>, <code>{STATE_RAMAVAILABLE}</code>, <code>{STATE_KEYSTATE:F10}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-gamepad opacity-70"></i><span>5. Joystick</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{STATE_JOYSTICK1BUTTON:1}</code>, <code>{STATE_JOYSTICK1X}</code>, <code>{STATE_JOYSTICK1POV1}</code>, <code>{STATE_JOYSTICK1LEFTTRIGGER}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-window-restore opacity-70"></i><span>6. Windows</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{ACTIVEWINDOWTITLE}</code>, <code>{PROCESSEXISTS:n}</code>, <code>{WINDOWEXISTS:title}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-folder opacity-70"></i><span>7. Paths</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{VA_DIR}</code>, <code>{VA_APPDATA}</code>, <code>{VA_SOUNDS}</code>, <code>{VA_APPS}</code>, <code>{VA_APPDIR_SOUNDS}</code>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-bolt opacity-70"></i><span>8. Math & Misc</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><code>{EXP:...}</code>, <code>{RANDOM:a:b}</code>, <code>{GUID}</code>, <code>{CLIP}</code>, <code>{DICTATION}</code>.</p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    links: {
        titleDe: 'Referenzen',
        titleEn: 'References',
        items: [
            { icon: 'fa-globe',  href: 'http://voiceattack.com/forum',   target: '_blank', labelDe: 'VoiceAttack Forum', labelEn: 'VoiceAttack Forum' },
            { icon: 'fa-comments', href: 'http://voiceattack.com/discord', target: '_blank', labelDe: 'Discord Server',   labelEn: 'Discord Server' },
            { icon: 'fa-book',   href: 'http://www.voiceattack.com/helpv2', target: '_blank', labelDe: 'Online-Hilfe',    labelEn: 'Online Help' }
        ]
    },

    footer: {
        textDe: 'Aus VoiceAttack Help V2 extrahiert · ~300 Tokens',
        textEn: 'Extracted from VoiceAttack Help V2 · ~300 tokens'
    }
});