// resources/topics/topic_voiceattack.js
// Registers the VoiceAttack reference topic. Loaded via <script> injection.

registerTopic({
    parentId: 'Programme',
    id: 'VoiceAttack Overview',
    icon: 'fa-microphone',
    titleDe: 'VoiceAttack Übersicht & Token-Referenz',
    titleEn: 'VoiceAttack Overview & Token Reference',
    descDe: 'Vollständige Referenz aller VoiceAttack-Tokens und wichtigen Informationen.',
    descEn: 'Complete reference of all VoiceAttack tokens and important information.',

    // Sidebar header panel
    sidebarTitleDe: 'VoiceAttack',
    sidebarTitleEn: 'VoiceAttack',
    sidebarSubtitleDe: 'Vollständige Token-Liste',
    sidebarSubtitleEn: 'Complete Token List',
    sidebarVersion: 'v2.2+',

    // Hero / intro panel at the top of the topic view
    hero: {
        titleDe: 'VoiceAttack Token-Referenz',
        titleEn: 'VoiceAttack Token Reference',
        introDe: 'Diese Sektion enthält alle in VoiceAttack verfügbaren Tokens (Befehls-Tokens, Status-Tokens, Variablen-Tokens, Pfad-Tokens und mehr)[cite: 2].',
        introEn: 'This section contains all tokens available in VoiceAttack (command tokens, state tokens, variable tokens, path tokens, and more)[cite: 2].'
    },

    // Quick-links grid
    quickLinks: [
        { icon: 'fa-comment',             href: '#section1', switchToDoc: true, labelDe: 'Befehle', labelEn: 'Commands' },
        { icon: 'fa-code',                href: '#section2', switchToDoc: true, labelDe: 'System- & Befehls-Tokens', labelEn: 'System & Command Tokens' },
        { icon: 'fa-database',            href: '#section3', switchToDoc: true, labelDe: 'Variablen & Pfad-Tokens', labelEn: 'Variable & Path Tokens' },
        { icon: 'fa-external-link-alt',   href: 'http://www.voiceattack.com/helpv2', target: '_blank', labelDe: 'Online-Hilfe',  labelEn: 'Online Help' }
    ],

    // Content sections
    sections: [
        {
            id: 'section1',
            titleDe: 'Befehle und Struktur',
            titleEn: 'Commands and Structure',
            introDe: 'Informationen zur Strukturierung und Auslösung von Befehlen.',
            introEn: 'Information on how commands are structured and triggered.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Dynamische Befehle und Platzhalter',
                    titleEn: 'Dynamic Commands and Wildcards',
                    htmlDe: `
                    <p class="text-xs">Befehle können mit dynamischen Abschnitten strukturiert werden:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Dynamische Abschnitte:</strong> Umschließen Sie abweichende Befehlsteile mit eckigen Klammern, getrennt durch ein Semikolon, z. B. <code>[Hello; Greetings]computer</code>[cite: 2].</li>
                    <li><strong>Numerische Bereiche:</strong> Fügen Sie Minimal- und Maximalwerte ein, die durch Auslassungspunkte getrennt sind, z. B. <code>[1..100]</code>[cite: 2].</li>
                    <li><strong>Multiplikatoren:</strong> Verwendet in numerischen Bereichen, z. B. ergibt <code>[1..5,10]</code> 10, 20, 30, 40, 50[cite: 2].</li>
                    <li><strong>Platzhalter (Wildcards):</strong> Verwenden Sie Sternchen um Phrasen herum, um "enthält" (<code>*attack*</code>), "beginnt mit" (<code>attack*</code>) oder "endet mit" (<code>*attack</code>) anzuzeigen[cite: 2].</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs">Commands can be structured using dynamic sections:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Dynamic Sections:</strong> Enclose varying command parts in square brackets separated by a semicolon, e.g., <code>[Hello; Greetings]computer</code>[cite: 2].</li>
                    <li><strong>Numeric Ranges:</strong> Include minimum and maximum values separated by an ellipsis, e.g., <code>[1..100]</code>[cite: 2].</li>
                    <li><strong>Multipliers:</strong> Used in numeric ranges, e.g., <code>[1..5,10]</code> yields 10, 20, 30, 40, 50[cite: 2].</li>
                    <li><strong>Wildcards:</strong> Use asterisks around phrases to indicate "contains" (<code>*attack*</code>), "starts with" (<code>attack*</code>), or "ends with" (<code>*attack</code>)[cite: 2].</li>
                    </ul>
                    `
                }
            ]
        },

        {
            id: 'section2',
            titleDe: 'System- und Befehls-Tokens',
            titleEn: 'System and Command Tokens',
            introDe: 'Tokens zur Auswertung von Befehlsmerkmalen, Aliases und Statuswerten.',
            introEn: 'Tokens for evaluating command attributes, aliases, and status values.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Befehls- und Ausführungs-Tokens',
                    titleEn: 'Command and Execution Tokens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[35%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{CMD}</strong></td><td class="text-[var(--text-muted)]">Nimmt den nicht erkannten Wert oder den erkannten Befehlssatz an[cite: 2].</td></tr>
                    <tr><td><strong>{CMDALIAS}</strong></td><td class="text-[var(--text-muted)]">Ruft den Alias für den erkannten Befehl ab[cite: 2].</td></tr>
                    <tr><td><strong>{CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Erbt den gerenderten Wert der Kategorie des gesprochenen Befehls[cite: 2].</td></tr>
                    <tr><td><strong>{CMDSEGMENT:}</strong></td><td class="text-[var(--text-muted)]">Ruft einzelne Teile eines Befehls mit dynamischen Abschnitten ab[cite: 2].</td></tr>
                    <tr><td><strong>{CMD_BEFORE}</strong></td><td class="text-[var(--text-muted)]">Erbt Werte vor dem Befehl[cite: 2].</td></tr>
                    <tr><td><strong>{CMD_AFTER}</strong></td><td class="text-[var(--text-muted)]">Erbt Werte nach dem Befehl[cite: 2].</td></tr>
                    <tr><td><strong>{CMD_WILDCARDKEY}</strong></td><td class="text-[var(--text-muted)]">Erbt den gerenderten Wert für Platzhalter-Befehle[cite: 2].</td></tr>
                    <tr><td><strong>{ISLISTENINGOVERRIDE}</strong></td><td class="text-[var(--text-muted)]">Erbt den Listening-Override Status[cite: 2].</td></tr>
                    <tr><td><strong>{ISCOMPOSITE}</strong></td><td class="text-[var(--text-muted)]">Gibt den Status eines zusammengesetzten Befehls zurück[cite: 2].</td></tr>
                    <tr><td><strong>{PREFIX}</strong></td><td class="text-[var(--text-muted)]">Erbt den Wert des Präfix-Befehls[cite: 2].</td></tr>
                    <tr><td><strong>{SUFFIX}</strong></td><td class="text-[var(--text-muted)]">Erbt den Wert des Suffix-Befehls[cite: 2].</td></tr>
                    <tr><td><strong>{PREFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Gibt die Kategorie des Präfix-Befehls zurück[cite: 2].</td></tr>
                    <tr><td><strong>{SUFFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Gibt die Kategorie des Suffix-Befehls zurück[cite: 2].</td></tr>
                    <tr><td><strong>{COMPOSITEGROUP}</strong></td><td class="text-[var(--text-muted)]">Erbt den Wert der Verbundgruppe[cite: 2].</td></tr>
                    <tr><td><strong>{CMDALREADYEXECUTING}</strong></td><td class="text-[var(--text-muted)]">Zeigt an, ob der Befehl bereits ausgeführt wird[cite: 2].</td></tr>
                    <tr><td><strong>{CMDCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Gibt das Vertrauensniveau des erkannten Befehls zurück[cite: 2].</td></tr>
                    <tr><td><strong>{CMDMINCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Gibt das erforderliche Mindestvertrauensniveau zurück[cite: 2].</td></tr>
                    <tr><td><strong>{CMDEXECREJECTED}</strong></td><td class="text-[var(--text-muted)]">Gibt '1' zurück, wenn trotz geringer Zuverlässigkeit ausgeführt, '0' wenn Zuverlässigkeit erreicht[cite: 2].</td></tr>
                    <tr><td><strong>{CMDACTION}</strong></td><td class="text-[var(--text-muted)]">Unterscheidet zwischen den Arten der Profilentladung[cite: 2].</td></tr>
                    <tr><td><strong>{CMDDOUBLETAPINVOKED}</strong></td><td class="text-[var(--text-muted)]">Gibt '1' zurück, wenn als Doppeltippen ausgeführt, andernfalls '0'[cite: 2].</td></tr>
                    <tr><td><strong>{CMDLONGPRESSINVOKED}</strong></td><td class="text-[var(--text-muted)]">Gibt '1' zurück, wenn als langer Druck ausgeführt, andernfalls '0'[cite: 2].</td></tr>
                    <tr><td><strong>NEXTPROFILE (Gruppe)</strong></td><td class="text-[var(--text-muted)]">Informationen über das Profil, das nach dem Entladen geladen wird[cite: 2].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[35%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{CMD}</strong></td><td class="text-[var(--text-muted)]">Takes on the unrecognized value or the recognized command phrase[cite: 2].</td></tr>
                    <tr><td><strong>{CMDALIAS}</strong></td><td class="text-[var(--text-muted)]">Retrieves the alias for the recognized command[cite: 2].</td></tr>
                    <tr><td><strong>{CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Inherits the rendered category value from the spoken command[cite: 2].</td></tr>
                    <tr><td><strong>{CMDSEGMENT:}</strong></td><td class="text-[var(--text-muted)]">Retrieves individual portions of a command that contains dynamic sections[cite: 2].</td></tr>
                    <tr><td><strong>{CMD_BEFORE}</strong></td><td class="text-[var(--text-muted)]">Inherits values before the command[cite: 2].</td></tr>
                    <tr><td><strong>{CMD_AFTER}</strong></td><td class="text-[var(--text-muted)]">Inherits values after the command[cite: 2].</td></tr>
                    <tr><td><strong>{CMD_WILDCARDKEY}</strong></td><td class="text-[var(--text-muted)]">Inherits the rendered value for wildcard commands[cite: 2].</td></tr>
                    <tr><td><strong>{ISLISTENINGOVERRIDE}</strong></td><td class="text-[var(--text-muted)]">Inherits the listening override state[cite: 2].</td></tr>
                    <tr><td><strong>{ISCOMPOSITE}</strong></td><td class="text-[var(--text-muted)]">Returns the state of a composite command[cite: 2].</td></tr>
                    <tr><td><strong>{PREFIX}</strong></td><td class="text-[var(--text-muted)]">Inherits the value of the prefix command[cite: 2].</td></tr>
                    <tr><td><strong>{SUFFIX}</strong></td><td class="text-[var(--text-muted)]">Inherits the value of the suffix command[cite: 2].</td></tr>
                    <tr><td><strong>{PREFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Returns the category of the prefix command[cite: 2].</td></tr>
                    <tr><td><strong>{SUFFIX_CATEGORY}</strong></td><td class="text-[var(--text-muted)]">Returns the category of the suffix command[cite: 2].</td></tr>
                    <tr><td><strong>{COMPOSITEGROUP}</strong></td><td class="text-[var(--text-muted)]">Inherits the value of the composite group[cite: 2].</td></tr>
                    <tr><td><strong>{CMDALREADYEXECUTING}</strong></td><td class="text-[var(--text-muted)]">Indicates if the command is already executing[cite: 2].</td></tr>
                    <tr><td><strong>{CMDCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Returns the confidence level of the recognized command[cite: 2].</td></tr>
                    <tr><td><strong>{CMDMINCONFIDENCE}</strong></td><td class="text-[var(--text-muted)]">Returns the minimum confidence level required[cite: 2].</td></tr>
                    <tr><td><strong>{CMDEXECREJECTED}</strong></td><td class="text-[var(--text-muted)]">Returns '1' if executed despite low confidence, '0' if confidence met[cite: 2].</td></tr>
                    <tr><td><strong>{CMDACTION}</strong></td><td class="text-[var(--text-muted)]">Distinguishes between types of profile unloading[cite: 2].</td></tr>
                    <tr><td><strong>{CMDDOUBLETAPINVOKED}</strong></td><td class="text-[var(--text-muted)]">Returns '1' if executed as a double tap, '0' if single tap[cite: 2].</td></tr>
                    <tr><td><strong>{CMDLONGPRESSINVOKED}</strong></td><td class="text-[var(--text-muted)]">Returns '1' if executed as a long press, '0' if short/standard press[cite: 2].</td></tr>
                    <tr><td><strong>NEXTPROFILE (Set)</strong></td><td class="text-[var(--text-muted)]">Information about the profile loading after unloading[cite: 2].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Status-, Hardware- und Audio-Tokens',
                    titleEn: 'State, Hardware, and Audio Tokens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[35%]">Token</th><th>Beschreibung</th></tr>
                    <tr><td><strong>{STATE_LEFTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">Status der linken Maustaste[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_RIGHTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">Status der rechten Maustaste[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_MIDDLEMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">Status der mittleren Maustaste[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_FORWARDMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">Status der vorderen Maustaste[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_BACKMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">Status der hinteren Maustaste[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_ANYMOUSEDOWN}</strong></td><td class="text-[var(--text-muted)]">Gibt zurück, ob eine beliebige Maustaste gedrückt ist[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_DEFAULTPLAYBACK}</strong></td><td class="text-[var(--text-muted)]">Standard-Audiowiedergabegerät[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_DEFAULTRECORDING}</strong></td><td class="text-[var(--text-muted)]">Standard-Audioaufnahmegerät[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_AUDIOCOUNT}</strong></td><td class="text-[var(--text-muted)]">Anzahl aktiver Audiowiedergaben[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_AUDIOPOS}</strong></td><td class="text-[var(--text-muted)]">Aktuelle Audio-Abspielposition[cite: 2].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[35%]">Token</th><th>Description</th></tr>
                    <tr><td><strong>{STATE_LEFTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">State of the left mouse button[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_RIGHTMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">State of the right mouse button[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_MIDDLEMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">State of the middle mouse button[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_FORWARDMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">State of the forward mouse button[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_BACKMOUSEBUTTON}</strong></td><td class="text-[var(--text-muted)]">State of the back mouse button[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_ANYMOUSEDOWN}</strong></td><td class="text-[var(--text-muted)]">Returns whether any mouse button is down[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_DEFAULTPLAYBACK}</strong></td><td class="text-[var(--text-muted)]">Default audio playback device[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_DEFAULTRECORDING}</strong></td><td class="text-[var(--text-muted)]">Default audio recording device[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_AUDIOCOUNT}</strong></td><td class="text-[var(--text-muted)]">Count of active audio streams[cite: 2].</td></tr>
                    <tr><td><strong>{STATE_AUDIOPOS}</strong></td><td class="text-[var(--text-muted)]">Current audio playback position[cite: 2].</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section3',
            titleDe: 'Variablen-, Puffer- und Pfad-Tokens',
            titleEn: 'Variable, Buffer, and Path Tokens',
            introDe: 'Zugriff auf Variablen, Diktatpuffer, Zwischenablage, Ausdrücke und Pfade.',
            introEn: 'Accessing variables, dictation buffers, clipboard, expressions, and paths.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Daten-, Puffer- und Funktions-Tokens',
                    titleEn: 'Data, Buffer, and Function Tokens',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[35%]">Token-Format</th><th>Details</th></tr>
                    <tr><td><strong>{DICTATION}</strong> / <strong>{DICTATION:options}</strong></td><td class="text-[var(--text-muted)]">Inhalt des Diktierpuffers[cite: 2].</td></tr>
                    <tr><td><strong>{CLIP}</strong></td><td class="text-[var(--text-muted)]">Wert in der Windows-Zwischenablage[cite: 2].</td></tr>
                    <tr><td><strong>{TXT:variable name}</strong></td><td class="text-[var(--text-muted)]">Greift auf Textvariablen zu[cite: 2].</td></tr>
                    <tr><td><strong>{INT:variable name}</strong></td><td class="text-[var(--text-muted)]">Greift auf Ganzzahlvariablen zu[cite: 2].</td></tr>
                    <tr><td><strong>{DEC:variable name}</strong></td><td class="text-[var(--text-muted)]">Greift auf Dezimalvariablen zu[cite: 2].</td></tr>
                    <tr><td><strong>{BOOL:variable name}</strong></td><td class="text-[var(--text-muted)]">Greift auf Boolesche Variablen zu[cite: 2].</td></tr>
                    <tr><td><strong>{DATE:variable name}</strong></td><td class="text-[var(--text-muted)]">Greift auf Datums-/Uhrzeitvariablen zu[cite: 2].</td></tr>
                    <tr><td><strong>{EXP:expression}</strong></td><td class="text-[var(--text-muted)]">Mathematischer Ausdruck / Berechnungen[cite: 2].</td></tr>
                    <tr><td><strong>{TXTRANDOM:true;false}</strong></td><td class="text-[var(--text-muted)]">Zufällige Textauswahl[cite: 2].</td></tr>
                    <tr><td><strong>{TIMESTAMP}</strong></td><td class="text-[var(--text-muted)]">Generiert Zeitstempel für Dateien[cite: 2].</td></tr>
                    <tr><td><strong>{GUID}</strong></td><td class="text-[var(--text-muted)]">Eindeutige ID für Dateinamen[cite: 2].</td></tr>
                    <tr><td><strong>{NEWLINE}</strong></td><td class="text-[var(--text-muted)]">Fügt einen Zeilenumbruch ein[cite: 2].</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[35%]">Token Format</th><th>Details</th></tr>
                    <tr><td><strong>{DICTATION}</strong> / <strong>{DICTATION:options}</strong></td><td class="text-[var(--text-muted)]">Content of the dictation buffer[cite: 2].</td></tr>
                    <tr><td><strong>{CLIP}</strong></td><td class="text-[var(--text-muted)]">Value in the Windows clipboard[cite: 2].</td></tr>
                    <tr><td><strong>{TXT:variable name}</strong></td><td class="text-[var(--text-muted)]">Accesses text variables[cite: 2].</td></tr>
                    <tr><td><strong>{INT:variable name}</strong></td><td class="text-[var(--text-muted)]">Accesses integer variables[cite: 2].</td></tr>
                    <tr><td><strong>{DEC:variable name}</strong></td><td class="text-[var(--text-muted)]">Accesses decimal variables[cite: 2].</td></tr>
                    <tr><td><strong>{BOOL:variable name}</strong></td><td class="text-[var(--text-muted)]">Accesses boolean variables[cite: 2].</td></tr>
                    <tr><td><strong>{DATE:variable name}</strong></td><td class="text-[var(--text-muted)]">Accesses date/time variables[cite: 2].</td></tr>
                    <tr><td><strong>{EXP:expression}</strong></td><td class="text-[var(--text-muted)]">Mathematical expression / evaluations[cite: 2].</td></tr>
                    <tr><td><strong>{TXTRANDOM:true;false}</strong></td><td class="text-[var(--text-muted)]">Random text selection[cite: 2].</td></tr>
                    <tr><td><strong>{TIMESTAMP}</strong></td><td class="text-[var(--text-muted)]">Generates timestamps for files[cite: 2].</td></tr>
                    <tr><td><strong>{GUID}</strong></td><td class="text-[var(--text-muted)]">Unique ID for file names[cite: 2].</td></tr>
                    <tr><td><strong>{NEWLINE}</strong></td><td class="text-[var(--text-muted)]">Inserts a line break[cite: 2].</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'VoiceAttack Path Tokens (Verzeichnispfade)',
                    titleEn: 'VoiceAttack Path Tokens',
                    htmlDe: `
                    <p class="text-xs">Spezielle Pfad-Tokens zur Verwendung in Dateipfaden, Sound- und Anwendungspfaden:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>{VA_PATH}</strong> – Installationsverzeichnis von VoiceAttack[cite: 2].</li>
                    <li><strong>{VA_APPS}</strong> – Anwendungsverzeichnis[cite: 2].</li>
                    <li><strong>{VA_DOCS}</strong> – Dokumentenverzeichnis[cite: 2].</li>
                    <li><strong>{VA_PROFILES}</strong> – Profilverzeichnis[cite: 2].</li>
                    <li><strong>{VA_SOUNDS}</strong> – Sound-Verzeichnis[cite: 2].</li>
                    <li><strong>{VA_PLUGINS}</strong> – Plugin-Verzeichnis[cite: 2].</li>
                    <li><strong>{VA_TEMP}</strong> – Temporäres Verzeichnis[cite: 2].</li>
                    <li><strong>{VA_DATA}</strong> – Datenverzeichnis[cite: 2].</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs">Special path tokens used in file paths, sounds, and application paths:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>{VA_PATH}</strong> – VoiceAttack installation directory[cite: 2].</li>
                    <li><strong>{VA_APPS}</strong> – Applications directory[cite: 2].</li>
                    <li><strong>{VA_DOCS}</strong> – Documents directory[cite: 2].</li>
                    <li><strong>{VA_PROFILES}</strong> – Profiles directory[cite: 2].</li>
                    <li><strong>{VA_SOUNDS}</strong> – Sounds directory[cite: 2].</li>
                    <li><strong>{VA_PLUGINS}</strong> – Plugins directory[cite: 2].</li>
                    <li><strong>{VA_TEMP}</strong> – Temporary directory[cite: 2].</li>
                    <li><strong>{VA_DATA}</strong> – Data directory[cite: 2].</li>
                    </ul>
                    `
                }
            ]
        },

        // --- TLDR TEMPLATE SECTION ---
        {
            id: 'tldr-summary',
            titleDe: 'TLDR – Kurz Übersicht',
            titleEn: 'TLDR – Quick Overview',
            introDe: 'Die wichtigsten VoiceAttack-Mechaniken auf einen Blick.',
            introEn: 'The core VoiceAttack mechanics at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-microphone opacity-70"></i>
                                <span>1. Auslöser</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Befehle werden durch Sprechen, Tastenkombinationen, Joystick-Tasten oder Mausklicks ausgelöst[cite: 2].
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-bolt opacity-70"></i>
                                <span>2. Makro Aktionen</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Befehle führen Aktionen wie Tastendrücke, Pausen, das Ausführen von Anwendungen oder das Abspielen von Tönen aus[cite: 2].
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-code opacity-70"></i>
                                <span>3. Dynamische Sätze</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Sparen Sie Zeit durch dynamische Befehle wie <code>[Hello; Greetings]computer</code>[cite: 2].
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-database opacity-70"></i>
                                <span>4. Vollständige Tokens</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Nutzen Sie alle 297 Tokens einschließlich Text, Variablen, Status, Ausdrücken und Pfaden[cite: 2].
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-microphone opacity-70"></i>
                                <span>1. Triggers</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Commands are triggered by spoken phrases, keyboard shortcuts, joystick buttons, or mouse clicks[cite: 2].
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-bolt opacity-70"></i>
                                <span>2. Macro Actions</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Commands perform actions like key presses, pauses, application launches, or sound playback[cite: 2].
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-code opacity-70"></i>
                                <span>3. Dynamic Phrases</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Save time building phrases using dynamic commands like <code>[Hello; Greetings]computer</code>[cite: 2].
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-database opacity-70"></i>
                                <span>4. Complete Tokens</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Leverage all 297 tokens including text, variables, states, expressions, and paths[cite: 2].
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    // External links block
    links: {
        titleDe: 'Referenzen',
        titleEn: 'References',
        items: [
            { icon: 'fa-globe',         href: 'http://voiceattack.com/forum', target: '_blank', labelDe: 'VoiceAttack Forum', labelEn: 'VoiceAttack Forum' },
            { icon: 'fa-globe',         href: 'http://voiceattack.com/discord', target: '_blank', labelDe: 'Discord Server', labelEn: 'Discord Server' }
        ]
    },

    footer: {
        textDe: 'Aus VoiceAttack Help V2 Extrahiert',
        textEn: 'Extracted from VoiceAttack Help V2'
    }
});