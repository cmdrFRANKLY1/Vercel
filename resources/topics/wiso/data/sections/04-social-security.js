// resources/topics/wiso/data/sections/04-social-security.js

export const section = {
    id: 'sozialversicherung',
    titleDe: '4. Das System der Sozialversicherungen',
    titleEn: '4. The Social Security System',
    introDe: 'Das deutsche Sozialversicherungssystem folgt dem Solidaritätsprinzip. Beiträge werden paritätisch (50/50) getragen (Ausnahme: Unfallversicherung).',
    introEn: 'The German social security system follows solidarity. Contributions are split 50/50 (exception: accident insurance).',
    subtopics: [
        {
            id: 'sv-zweige',
            titleDe: '4.1 Die 5 Säulen',
            titleEn: '4.1 The 5 Pillars',
            htmlDe: `
            <div class="overflow-x-auto w-full"><table class="wikitable min-w-[600px]">
            <tr><th>Versicherung</th><th>Einführung</th><th>Träger</th><th>Beitragszahler</th><th>Leistungen</th></tr>
            <tr><td><strong>Krankenversicherung (KV)</strong></td><td class="text-center font-mono">1883</td><td class="text-[var(--text-muted)]">Krankenkassen</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">Behandlung, Medikamente, Krankengeld.</td></tr>
            <tr><td><strong>Unfallversicherung (UV)</strong></td><td class="text-center font-mono">1884</td><td class="text-[var(--text-muted)]">Berufsgenossenschaften</td><td class="text-[var(--text-muted)]"><strong>Nur Arbeitgeber</strong> (100%)</td><td class="text-[var(--text-muted)]">Arbeits- und Wegeunfälle.</td></tr>
            <tr><td><strong>Rentenversicherung (RV)</strong></td><td class="text-center font-mono">1889</td><td class="text-[var(--text-muted)]">Deutsche Rentenversicherung</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">Altersrente, Erwerbsminderung.</td></tr>
            <tr><td><strong>Arbeitslosenversicherung (ALV)</strong></td><td class="text-center font-mono">1927</td><td class="text-[var(--text-muted)]">Bundesagentur für Arbeit</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">ALG I, Kurzarbeitergeld.</td></tr>
            <tr><td><strong>Pflegeversicherung (PV)</strong></td><td class="text-center font-mono">1995</td><td class="text-[var(--text-muted)]">Pflegekassen</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)*</td><td class="text-[var(--text-muted)]">Pflegegeld.</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full"><table class="wikitable min-w-[600px]">
            <tr><th>Insurance</th><th>Est.</th><th>Carrier</th><th>Payers</th><th>Benefits</th></tr>
            <tr><td><strong>Health (KV)</strong></td><td class="text-center font-mono">1883</td><td class="text-[var(--text-muted)]">Health Funds</td><td class="text-[var(--text-muted)]">AG &amp; AN (50/50)</td><td class="text-[var(--text-muted)]">Treatment, medication.</td></tr>
            <tr><td><strong>Accident (UV)</strong></td><td class="text-center font-mono">1884</td><td class="text-[var(--text-muted)]">Trade Associations</td><td class="text-[var(--text-muted)]"><strong>Employer only</strong></td><td class="text-[var(--text-muted)]">Work / commuting accidents.</td></tr>
            <tr><td><strong>Pension (RV)</strong></td><td class="text-center font-mono">1889</td><td class="text-[var(--text-muted)]">German Pension Ins.</td><td class="text-[var(--text-muted)]">AG &amp; AN</td><td class="text-[var(--text-muted)]">Old-age pension.</td></tr>
            <tr><td><strong>Unemployment (ALV)</strong></td><td class="text-center font-mono">1927</td><td class="text-[var(--text-muted)]">Federal Employment Agency</td><td class="text-[var(--text-muted)]">AG &amp; AN</td><td class="text-[var(--text-muted)]">Unemployment benefits I.</td></tr>
            <tr><td><strong>Long-term Care (PV)</strong></td><td class="text-center font-mono">1995</td><td class="text-[var(--text-muted)]">Care Funds</td><td class="text-[var(--text-muted)]">AG &amp; AN</td><td class="text-[var(--text-muted)]">Care allowance.</td></tr>
            </table></div>`
        },
        {
            id: 'generationenvertrag',
            titleDe: '4.2 Generationenvertrag (Rentenversicherung)',
            titleEn: '4.2 Generational Contract (Pension)',
            htmlDe: `
            <div class="text-[var(--text-muted)] bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                <p>Das Rentensystem basiert auf dem <strong>Umlageverfahren</strong>: Die arbeitende Generation zahlt direkt an die jetzigen Rentner.</p>
                <p class="mb-0"><strong class="text-[var(--heading-color)] block mt-2">Problem (Demografischer Wandel):</strong> Überalterung → weniger Beitragszahler, mehr Rentner → finanzieller Druck.</p>
            </div>`,
            htmlEn: `
            <div class="text-[var(--text-muted)] bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded">
                <p>Pension system is <strong>pay-as-you-go</strong>: the working generation pays directly to current retirees.</p>
                <p class="mb-0"><strong class="text-[var(--heading-color)] block mt-2">Problem (Demographic Change):</strong> Aging society → fewer contributors, more retirees → financial pressure.</p>
            </div>`
        }
    ]
};