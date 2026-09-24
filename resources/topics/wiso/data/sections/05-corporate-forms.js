// resources/topics/wiso/data/sections/05-corporate-forms.js

export const section = {
    id: 'rechtsformen',
    titleDe: '5. Unternehmensformen',
    titleEn: '5. Corporate Forms',
    introDe: 'Man unterscheidet Einzelunternehmen, Personengesellschaften und Kapitalgesellschaften.',
    introEn: 'Distinction between sole proprietorships, partnerships and corporations.',
    subtopics: [
        {
            id: 'einzelunternehmen',
            titleDe: '5.1 Einzelunternehmen',
            titleEn: '5.1 Sole Proprietorship',
            htmlDe: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-[20%]">Merkmal</th><th>Details</th></tr>
            <tr><td><strong>Gründer</strong></td><td class="text-[var(--text-muted)]">Eine natürliche Person.</td></tr>
            <tr><td><strong>Kapital</strong></td><td class="text-[var(--text-muted)]">Kein Mindestkapital.</td></tr>
            <tr><td><strong>Haftung</strong></td><td class="text-[var(--text-muted)]"><strong>Unbeschränkt</strong> (Geschäfts- und Privatvermögen).</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-[20%]">Feature</th><th>Details</th></tr>
            <tr><td><strong>Founder</strong></td><td class="text-[var(--text-muted)]">Single natural person.</td></tr>
            <tr><td><strong>Capital</strong></td><td class="text-[var(--text-muted)]">No minimum capital.</td></tr>
            <tr><td><strong>Liability</strong></td><td class="text-[var(--text-muted)]"><strong>Unlimited</strong>.</td></tr>
            </table></div>`
        },
        {
            id: 'personengesellschaften',
            titleDe: '5.2 Personengesellschaften (OHG, KG)',
            titleEn: '5.2 Partnerships (OHG, KG)',
            htmlDe: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-[20%]">Rechtsform</th><th>Merkmale</th></tr>
            <tr><td><strong>OHG</strong></td><td class="text-[var(--text-muted)]">Mind. 2 Gesellschafter. Alle haften <strong>unbeschränkt</strong>.</td></tr>
            <tr><td><strong>KG</strong></td><td class="text-[var(--text-muted)]">Komplementär (unbeschränkt) + Kommanditist (beschränkt auf Einlage).</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-[20%]">Form</th><th>Features</th></tr>
            <tr><td><strong>OHG</strong></td><td class="text-[var(--text-muted)]">Min. 2 partners. All have <strong>unlimited</strong> liability.</td></tr>
            <tr><td><strong>KG</strong></td><td class="text-[var(--text-muted)]">General partner (unlimited) + limited partner (contribution).</td></tr>
            </table></div>`
        },
        {
            id: 'kapitalgesellschaften',
            titleDe: '5.3 Kapitalgesellschaften (GmbH, AG)',
            titleEn: '5.3 Corporations (GmbH, AG)',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Kapitalgesellschaften sind juristische Personen, Haftung auf Gesellschaftsvermögen beschränkt.</p>
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-[20%]">Rechtsform</th><th>Merkmale</th></tr>
            <tr><td><strong>GmbH</strong></td><td class="text-[var(--text-muted)]"><strong>Stammkapital:</strong> ab 25.000 €. Organe: Geschäftsführer, Gesellschafterversammlung.</td></tr>
            <tr><td><strong>AG</strong></td><td class="text-[var(--text-muted)]"><strong>Grundkapital:</strong> ab 50.000 €. Organe: Vorstand, Aufsichtsrat, Hauptversammlung.</td></tr>
            </table></div>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">Corporations are legal entities, liability limited to corporate assets.</p>
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-[20%]">Form</th><th>Features</th></tr>
            <tr><td><strong>GmbH</strong></td><td class="text-[var(--text-muted)]"><strong>Share capital:</strong> from €25,000. Organs: MD, shareholders' meeting.</td></tr>
            <tr><td><strong>AG</strong></td><td class="text-[var(--text-muted)]"><strong>Share capital:</strong> from €50,000. Organs: board, supervisory board, general meeting.</td></tr>
            </table></div>`
        }
    ]
};