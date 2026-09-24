// resources/topics/wiso/data/sections/02-labor-law.js

export const section = {
    id: 'arbeitsrecht',
    titleDe: '2. Arbeitsrecht',
    titleEn: '2. Labor Law',
    subtopics: [
        {
            id: 'arbeitsvertrag',
            titleDe: '2.1 Der Arbeitsvertrag',
            titleEn: '2.1 The Employment Contract',
            htmlDe: `<p class="mb-0">Ein Arbeitsvertrag kann grundsätzlich formfrei (auch mündlich) geschlossen werden. Gemäß Nachweisgesetz muss der Arbeitgeber die wesentlichen Bedingungen jedoch spätestens nach einem Monat schriftlich niederlegen.</p>`,
            htmlEn: `<p class="mb-0">An employment contract can generally be concluded without any formal requirements (even verbally). However, the employer must put the essential conditions in writing no later than one month after commencement.</p>`
        },
        {
            id: 'kuendigung',
            titleDe: '2.2 Kündigung und Kündigungsschutz',
            titleEn: '2.2 Termination and Dismissal Protection',
            htmlDe: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-1/4">Art der Kündigung</th><th>Voraussetzungen &amp; Fristen</th></tr>
            <tr><td><strong>Ordentliche Kündigung</strong></td><td class="text-[var(--text-muted)]">Schriftlich. Grundfrist: 4 Wochen zum 15. oder Monatsende (§ 622 BGB).</td></tr>
            <tr><td><strong>Außerordentliche Kündigung</strong></td><td class="text-[var(--text-muted)]">Erfordert <strong>wichtigen Grund</strong>. Innerhalb 2 Wochen nach Bekanntwerden.</td></tr>
            <tr><td><strong>KSchG</strong></td><td class="text-[var(--text-muted)]">Ab <strong>&gt;10 MA</strong> und <strong>&gt;6 Monate</strong> Betriebszugehörigkeit. Klagefrist: 3 Wochen.</td></tr>
            <tr><td><strong>Besonderer Kündigungsschutz</strong></td><td class="text-[var(--text-muted)]">Schwangere, Schwerbehinderte, Betriebsräte, JAV, Azubis nach Probezeit.</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full"><table class="wikitable">
            <tr><th class="w-1/4">Type of Termination</th><th>Conditions &amp; Deadlines</th></tr>
            <tr><td><strong>Ordinary Termination</strong></td><td class="text-[var(--text-muted)]">In writing. Basic period: 4 weeks to the 15th or month-end.</td></tr>
            <tr><td><strong>Extraordinary Dismissal</strong></td><td class="text-[var(--text-muted)]">Requires <strong>important reason</strong>. Within 2 weeks of awareness.</td></tr>
            <tr><td><strong>Dismissal Protection Act</strong></td><td class="text-[var(--text-muted)]">From <strong>&gt;10 employees</strong> and <strong>&gt;6 months</strong> tenure. Suit deadline: 3 weeks.</td></tr>
            <tr><td><strong>Special Protection</strong></td><td class="text-[var(--text-muted)]">Pregnant women, severely disabled, works council, trainees after probation.</td></tr>
            </table></div>`
        },
        {
            id: 'jugendarbeit',
            titleDe: '2.3 Jugendarbeitsschutzgesetz (JArbSchG)',
            titleEn: '2.3 Youth Employment Act (JArbSchG)',
            htmlDe: `
            <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded text-[var(--text-muted)]">
                <p>Gilt für alle unter <strong>18 Jahren</strong>.</p>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Arbeitszeit:</strong> Max. 8 Std./Tag, max. 40 Std./Woche. Nur 5-Tage-Woche.</li>
                    <li><strong>Pausen:</strong> Min. 30 Min. bei 4,5–6 Std.; min. 60 Min. bei &gt;6 Std.</li>
                    <li><strong>Nachtruhe:</strong> Verbot von 20:00 bis 06:00 Uhr.</li>
                    <li><strong>Urlaub:</strong> min. 30 Werktage unter 16 J., min. 25 unter 18 J.</li>
                </ul>
            </div>`,
            htmlEn: `
            <div class="bg-[var(--panel-color)] p-4 border border-[var(--panel-border)] rounded text-[var(--text-muted)]">
                <p>Applies to everyone under <strong>18 years</strong>.</p>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Hours:</strong> Max. 8 hrs/day, max. 40 hrs/week. 5-day week only.</li>
                    <li><strong>Breaks:</strong> Min. 30 mins for 4.5–6 hrs; 60 mins for &gt;6 hrs.</li>
                    <li><strong>Night Rest:</strong> Prohibited 8 PM – 6 AM.</li>
                    <li><strong>Vacation:</strong> min. 30 days under 16, min. 25 under 18.</li>
                </ul>
            </div>`
        }
    ]
};