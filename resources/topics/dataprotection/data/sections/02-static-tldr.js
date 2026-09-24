// resources/topics/dataprotection/data/sections/02-static-tldr.js
// "TL;DR: Datenschutz für Systemintegratoren" — six-card grid.

export const section = {
    id: 'tldr-summary',
    titleDe: 'TLDR',
    titleEn: 'TLDR',
    headingDe: 'TL;DR: Datenschutz für Systemintegratoren',
    headingEn: 'TL;DR: Data Protection for System Integrators',
    introDe: 'Kurz zusammengefasst: Was bedeuten diese ganzen Gesetze ganz konkret für die tägliche Arbeit in der IT-Abteilung? Hier sind die wichtigsten Regeln für die IT-Praxis.',
    introEn: 'In a nutshell: What do all these laws mean specifically for daily work in the IT department? Here are the most important practical rules.',
    subtopics: [],
    html: `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-hard-drive opacity-70"></i>
                    <span data-lang-de>1. Löschen &amp; Minimieren</span>
                    <span data-lang-en style="display:none;">1. Delete &amp; Minimize</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Speichere nur das, was wirklich nötig ist. Wenn ein Server abgeschaltet wird oder ein Mitarbeiter geht: Daten löschen (Crypto-Erase)! <strong>Achtung bei Backups:</strong> Auch hier müssen Löschkonzepte greifen.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Only store what is truly necessary. When a server is shut down or an employee leaves: delete data (Crypto-Erase)! <strong>Careful with backups:</strong> Deletion concepts must apply here too.
                </p>
            </div>

            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-shield-halved opacity-70"></i>
                    <span data-lang-de>2. Security (TOMs) ist unser Job</span>
                    <span data-lang-en style="display:none;">2. Security (TOMs) is our job</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Die IT setzt "Vertraulichkeit, Integrität, Verfügbarkeit" (CIA-Triade) praktisch um. Heißt: <strong>Zutritt (Raum), Zugang (Passwort/MFA), Zugriff (NTFS/RBAC)</strong> streng regulieren.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    IT practically implements "Confidentiality, Integrity, Availability" (CIA Triad). Meaning: strictly regulate <strong>Admission (Room), Access (Password/MFA), Authorization (NTFS/RBAC)</strong>.
                </p>
            </div>

            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-user-cog opacity-70"></i>
                    <span data-lang-de>3. Admin-Rechte = Verantwortung</span>
                    <span data-lang-en style="display:none;">3. Admin Rights = Responsibility</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Nur weil wir Root/Domain-Admin sind, dürfen wir nicht die E-Mails oder die Surf-Historie der Kollegen mitlesen (Totalüberwachung verboten). <strong>Least Privilege</strong> Prinzip anwenden.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Just because we are root/domain admins doesn't mean we can read colleagues' emails or browsing history (total surveillance is forbidden). Apply the <strong>Least Privilege</strong> principle.
                </p>
            </div>

            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-server opacity-70"></i>
                    <span data-lang-de>4. IT für Betroffenenrechte</span>
                    <span data-lang-en style="display:none;">4. IT for Data Subject Rights</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Wenn ein User Auskunft will oder gelöscht werden möchte, muss die IT das technisch umsetzen. Wir müssen wissen, in welchen DBs, AD-Feldern oder Archiven diese Daten liegen.
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    If a user wants information or to be deleted, IT must implement this technically. We need to know in which DBs, AD fields, or archives this data is located.
                </p>
            </div>

            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-cloud-arrow-up opacity-70"></i>
                    <span data-lang-de>5. Erst fragen, dann deployen</span>
                    <span data-lang-en style="display:none;">5. Ask first, then deploy</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    Neue Software ausrollen? Neues SaaS-Tool anbinden? Vorher klären, ob es einen <strong>AV-Vertrag</strong> gibt. Architektur sicher designen (<strong>Privacy by Design/Default</strong>).
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Rolling out new software? Connecting a new SaaS tool? Clarify beforehand if there is a <strong>DPA (AV-Vertrag)</strong>. Design the architecture securely (<strong>Privacy by Design/Default</strong>).
                </p>
            </div>

            <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                    <i class="fa-solid fa-triangle-exclamation opacity-70"></i>
                    <span data-lang-de>6. Pannen sofort melden</span>
                    <span data-lang-en style="display:none;">6. Report incidents immediately</span>
                </div>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-de>
                    USB-Stick verloren? Ransomware hat den Server verschlüsselt? Sofort den DSB informieren! Es gilt eine <strong>72-Stunden Meldepflicht</strong> an die Behörde (LfDI).
                </p>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed" data-lang-en style="display:none;">
                    Lost a USB drive? Ransomware encrypted the server? Inform the DPO immediately! There is a <strong>72-hour reporting obligation</strong> to the authority.
                </p>
            </div>

        </div>
    `
};