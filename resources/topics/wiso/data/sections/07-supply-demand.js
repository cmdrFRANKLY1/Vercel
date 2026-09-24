// resources/topics/wiso/data/sections/07-supply-demand.js

export const section = {
    id: 'angebot-nachfrage',
    titleDe: '7. Angebot, Nachfrage & Marktgleichgewicht',
    titleEn: '7. Supply, Demand & Market Equilibrium',
    introDe: 'Das Modell von <strong>Angebot und Nachfrage</strong> ist Fundament der Mikroökonomie: Preise und Mengen entstehen durch das Zusammenspiel von Konsumenten und Unternehmen.',
    introEn: 'The model of <strong>supply and demand</strong> is the foundation of microeconomics: prices and quantities emerge from the interaction of consumers and firms.',
    subtopics: [
        {
            id: 'nachfrage-angebot-funktionen',
            titleDe: '7.1 Nachfrage- und Angebotsfunktion',
            titleEn: '7.1 Demand and Supply Functions',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Nachfrage</p>
                    <div class="text-center text-xl font-mono text-[var(--accent-amber)] mb-2">Q<sub>D</sub> = a − b · P</div>
                    <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                        <li><strong>a</strong> = Maximaler Bedarf (bei P = 0)</li>
                        <li><strong>b</strong> = Preisreaktion (Käuferflucht)</li>
                        <li>Negativer Zusammenhang</li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Angebot</p>
                    <div class="text-center text-xl font-mono text-[var(--accent-blue)] mb-2">Q<sub>S</sub> = c + d · P</div>
                    <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                        <li><strong>c</strong> = Fixterm (oft negativ)</li>
                        <li><strong>d</strong> = Preisreaktion (Produktionsanstieg)</li>
                        <li>Positiver Zusammenhang</li>
                    </ul>
                </div>
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Demand</p>
                    <div class="text-center text-xl font-mono text-[var(--accent-amber)] mb-2">Q<sub>D</sub> = a − b · P</div>
                    <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                        <li><strong>a</strong> = Maximum demand (at P = 0)</li>
                        <li><strong>b</strong> = Price sensitivity</li>
                        <li>Negative relationship</li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <p class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-1">Supply</p>
                    <div class="text-center text-xl font-mono text-[var(--accent-blue)] mb-2">Q<sub>S</sub> = c + d · P</div>
                    <ul class="text-xs text-[var(--text-muted)] space-y-1 list-disc pl-5">
                        <li><strong>c</strong> = Intercept (often negative)</li>
                        <li><strong>d</strong> = Price sensitivity</li>
                        <li>Positive relationship</li>
                    </ul>
                </div>
            </div>`
        },
        {
            id: 'gleichgewicht-shocks',
            titleDe: '7.2 Marktgleichgewicht und Shocks',
            titleEn: '7.2 Equilibrium and Shocks',
            htmlDe: `
            <p>Gleichgewicht: Q<sub>D</sub> = Q<sub>S</sub> ⇒ P* = (a−c)/(b+d).</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-amber)]">Nachfrageschock</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Rechtsverschiebung (Einkommen, Trends) → Preis ↑ und Menge ↑.</p>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-blue)]">Angebotsschock</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Kostenerhöhung → Linksverschiebung → Preis ↑, Menge ↓.</p>
                </div>
            </div>`,
            htmlEn: `
            <p>Equilibrium: Q<sub>D</sub> = Q<sub>S</sub> ⇒ P* = (a−c)/(b+d).</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-amber)]">Demand Shock</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Rightward shift (income, trends) → price ↑, quantity ↑.</p>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-blue)]">Supply Shock</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Cost increase → leftward shift → price ↑, quantity ↓.</p>
                </div>
            </div>`
        },
        {
            id: 'elastizitaet-rente',
            titleDe: '7.3 Elastizität und Wohlfahrtsrenten',
            titleEn: '7.3 Elasticity and Welfare Surpluses',
            htmlDe: `
            <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)] text-center mb-3">
                <div class="text-xl font-mono text-[var(--accent-violet)]">ε = (% ΔQ<sub>D</sub>) / (% ΔP)</div>
            </div>
            <ul class="list-disc pl-5 text-sm text-[var(--text-muted)] space-y-1">
                <li><strong>|ε| &gt; 1:</strong> elastisch – Luxusgüter</li>
                <li><strong>|ε| &lt; 1:</strong> unelastisch – Brot, Medikamente</li>
                <li><strong>|ε| = 1:</strong> proportional</li>
            </ul>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Konsumentenrente (KR)</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Fläche unter Nachfragekurve, über dem Preis.</p>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Produzentenrente (PR)</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Fläche über Angebotskurve, unter dem Preis.</p>
                </div>
            </div>`,
            htmlEn: `
            <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)] text-center mb-3">
                <div class="text-xl font-mono text-[var(--accent-violet)]">ε = (% ΔQ<sub>D</sub>) / (% ΔP)</div>
            </div>
            <ul class="list-disc pl-5 text-sm text-[var(--text-muted)] space-y-1">
                <li><strong>|ε| &gt; 1:</strong> elastic – luxury goods</li>
                <li><strong>|ε| &lt; 1:</strong> inelastic – bread, medicine</li>
                <li><strong>|ε| = 1:</strong> proportional</li>
            </ul>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Consumer Surplus (CS)</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Area below demand, above price.</p>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Producer Surplus (PS)</h4>
                    <p class="text-sm text-[var(--text-muted)] mt-2 mb-0">Area above supply, below price.</p>
                </div>
            </div>`
        }
    ]
};