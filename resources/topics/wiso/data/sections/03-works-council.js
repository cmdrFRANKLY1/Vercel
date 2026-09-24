// resources/topics/wiso/data/sections/03-works-council.js

export const section = {
    id: 'mitbestimmung-gremien',
    titleDe: '3. Betriebliche Mitbestimmung',
    titleEn: '3. Corporate Co-determination',
    subtopics: [
        {
            id: 'betriebsrat-rechte',
            titleDe: '3.1 Der Betriebsrat (BetrVG)',
            titleEn: '3.1 The Works Council (BetrVG)',
            htmlDe: `
            <p>Der Betriebsrat vertritt die Interessen der Arbeitnehmer. Wählbar in Betrieben mit <strong>mind. 5 ständigen wahlberechtigten Arbeitnehmern</strong>.</p>
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-1/4">Recht</th><th>Erklärung</th></tr>
            <tr><td><strong>Mitbestimmungsrecht</strong> (stärkstes)</td><td class="text-[var(--text-muted)]">AG <em>muss</em> Zustimmung einholen (Arbeitszeit, Urlaub, Überwachung).</td></tr>
            <tr><td><strong>Mitwirkungsrecht</strong></td><td class="text-[var(--text-muted)]">BR muss angehört werden (z.B. vor Kündigung).</td></tr>
            <tr><td><strong>Informationsrecht</strong> (schwächstes)</td><td class="text-[var(--text-muted)]">AG muss rechtzeitig informieren.</td></tr>
            </table></div>`,
            htmlEn: `
            <p>The works council represents employee interests. Can be elected with <strong>at least 5 permanent eligible employees</strong>.</p>
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-1/4">Right</th><th>Explanation</th></tr>
            <tr><td><strong>Co-determination</strong> (strongest)</td><td class="text-[var(--text-muted)]">Employer <em>must</em> obtain consent (working hours, vacation, monitoring).</td></tr>
            <tr><td><strong>Participation</strong></td><td class="text-[var(--text-muted)]">Council must be heard (e.g. before dismissal).</td></tr>
            <tr><td><strong>Information</strong> (weakest)</td><td class="text-[var(--text-muted)]">Employer must inform in a timely manner.</td></tr>
            </table></div>`
        },
        {
            id: 'jav',
            titleDe: '3.2 Jugend- und Auszubildendenvertretung (JAV)',
            titleEn: '3.2 Youth and Trainee Representation (JAV)',
            htmlDe: `<p class="mb-0">Die JAV vertritt die Interessen der jugendlichen Arbeitnehmer (unter 18) und Azubis (unter 25). Voraussetzung: bestehender Betriebsrat und mind. 5 Jugendliche/Azubis.</p>`,
            htmlEn: `<p class="mb-0">The JAV represents young employees (under 18) and trainees (under 25). Requires an existing works council and at least 5 young employees/trainees.</p>`
        }
    ]
};