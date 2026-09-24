// resources/topics/wiso/data/sections/01-codetermination.js

export const section = {
    id: 'mitbestimmung',
    titleDe: '1. Betriebliche Mitbestimmung',
    titleEn: '1. Corporate Co-determination',
    subtopics: [
        {
            id: 'betriebsrat',
            titleDe: '1.1 Der Betriebsrat (BetrVG)',
            titleEn: '1.1 The Works Council (BetrVG)',
            htmlDe: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-1/4">Stufe</th><th class="w-1/4">Alter</th><th>Rechtsfolge bei Verträgen</th></tr>
            <tr><td><strong>Geschäftsunfähigkeit</strong></td><td class="text-[var(--text-muted)]">Unter 7 Jahre</td><td class="text-[var(--text-muted)]">Willenserklärungen sind <strong>nichtig</strong>. Der gesetzliche Vertreter muss handeln.</td></tr>
            <tr><td><strong>Beschränkte Geschäftsfähigkeit</strong></td><td class="text-[var(--text-muted)]">7 bis vollendetes 18. Lebensjahr</td><td class="text-[var(--text-muted)]">Verträge sind <strong>schwebend unwirksam</strong>.<br><em>Ausnahmen:</em> Taschengeldparagraf (§ 110 BGB).</td></tr>
            <tr><td><strong>Volle Geschäftsfähigkeit</strong></td><td class="text-[var(--text-muted)]">Ab 18 Jahren</td><td class="text-[var(--text-muted)]">Verträge sind <strong>voll wirksam</strong>.</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-1/4">Level</th><th class="w-1/4">Age</th><th>Legal Consequence</th></tr>
            <tr><td><strong>Incapacity</strong></td><td class="text-[var(--text-muted)]">Under 7 years</td><td class="text-[var(--text-muted)]">Declarations of intent are <strong>void</strong>.</td></tr>
            <tr><td><strong>Limited Capacity</strong></td><td class="text-[var(--text-muted)]">7 to completed 18th year</td><td class="text-[var(--text-muted)]">Contracts are <strong>pending invalid</strong>.<br><em>Exceptions:</em> Pocket money paragraph.</td></tr>
            <tr><td><strong>Full Capacity</strong></td><td class="text-[var(--text-muted)]">From 18 years</td><td class="text-[var(--text-muted)]">Contracts are <strong>fully valid</strong>.</td></tr>
            </table></div>`
        },
        {
            id: 'nichtigkeit',
            titleDe: '1.2 Nichtigkeit und Anfechtbarkeit',
            titleEn: '1.2 Voidability & Nullity',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                    <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Nichtige Verträge</h4>
                    <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                        <li>Geschäftsunfähigkeit des Partners.</li>
                        <li>Scherz- oder Scheingeschäfte.</li>
                        <li>Verstoß gegen gesetzliche Verbote.</li>
                        <li>Sittenwidrigkeit / Wucher.</li>
                        <li>Formmangel (z.B. Hauskauf ohne Notar).</li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                    <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Anfechtbare Verträge</h4>
                    <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                        <li><strong>Inhaltsirrtum:</strong> Irrtum über die Bedeutung.</li>
                        <li><strong>Erklärungsirrtum:</strong> Verschreiben, Vertippen.</li>
                        <li><strong>Arglistige Täuschung:</strong> Bewusstes Verschweigen.</li>
                        <li><strong>Widerrechtliche Drohung:</strong> Zwang.</li>
                    </ul>
                </div>
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                    <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Void Contracts</h4>
                    <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                        <li>Incapacity of the partner.</li>
                        <li>Joke or sham transactions.</li>
                        <li>Violation of statutory prohibitions.</li>
                        <li>Immorality / Usury.</li>
                        <li>Form defect.</li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                    <h4 class="mt-0 text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2">Voidable Contracts</h4>
                    <ul class="list-disc pl-5 mt-2 space-y-1 text-[var(--text-muted)]">
                        <li><strong>Mistake in Content.</strong></li>
                        <li><strong>Mistake in Expression.</strong></li>
                        <li><strong>Fraudulent Misrepresentation.</strong></li>
                        <li><strong>Duress.</strong></li>
                    </ul>
                </div>
            </div>`
        }
    ]
};