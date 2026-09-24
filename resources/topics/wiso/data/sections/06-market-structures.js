// resources/topics/wiso/data/sections/06-market-structures.js

export const section = {
    id: 'markttypen',
    titleDe: '6. Markttypen & Marktformen',
    titleEn: '6. Market Types & Structures',
    introDe: 'Märkte werden nach der <strong>Anzahl der Marktteilnehmer</strong> klassifiziert (Stackelberg-Matrix). Die Struktur bestimmt Marktmacht und Preisbildung.',
    introEn: 'Markets are classified by <strong>number of participants</strong> (Stackelberg matrix). Structure dictates market power and pricing.',
    subtopics: [
        {
            id: 'markt-matrix',
            titleDe: '6.1 Die 3×3 Markt-Matrix',
            titleEn: '6.1 The 3×3 Market Matrix',
            htmlDe: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Form</th><th>Anbieter / Nachfrager</th><th>Beispiel</th></tr>
            <tr><td><strong>Polypol</strong></td><td>viele / viele</td><td class="text-[var(--text-muted)]">Aktienmarkt, Weizenmarkt</td></tr>
            <tr><td><strong>Oligopol</strong></td><td>wenige / viele</td><td class="text-[var(--text-muted)]">Mobilfunk, Tankstellen</td></tr>
            <tr><td><strong>Monopol</strong></td><td>einer / viele</td><td class="text-[var(--text-muted)]">Bahnnetz, Patentinhaber</td></tr>
            <tr><td><strong>Monopson</strong></td><td>viele / einer</td><td class="text-[var(--text-muted)]">Staat als Rüstungskäufer</td></tr>
            <tr><td><strong>Oligopson</strong></td><td>viele / wenige</td><td class="text-[var(--text-muted)]">Milchbauern &amp; Supermarktketten</td></tr>
            <tr><td><strong>Bilaterales Monopol</strong></td><td>einer / einer</td><td class="text-[var(--text-muted)]">Gewerkschaft vs. AG-Verband</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Form</th><th>Sellers / Buyers</th><th>Example</th></tr>
            <tr><td><strong>Perfect Competition</strong></td><td>many / many</td><td class="text-[var(--text-muted)]">Stock market, wheat market</td></tr>
            <tr><td><strong>Oligopoly</strong></td><td>few / many</td><td class="text-[var(--text-muted)]">Telecoms, gas stations</td></tr>
            <tr><td><strong>Monopoly</strong></td><td>one / many</td><td class="text-[var(--text-muted)]">Rail network, patents</td></tr>
            <tr><td><strong>Monopsony</strong></td><td>many / one</td><td class="text-[var(--text-muted)]">State as arms buyer</td></tr>
            <tr><td><strong>Oligopsony</strong></td><td>many / few</td><td class="text-[var(--text-muted)]">Dairy farmers &amp; supermarket chains</td></tr>
            <tr><td><strong>Bilateral Monopoly</strong></td><td>one / one</td><td class="text-[var(--text-muted)]">Union vs. employers' association</td></tr>
            </table></div>`
        },
        {
            id: 'polypol-monopol-oligopol',
            titleDe: '6.2 Polypol, Monopol und Oligopol',
            titleEn: '6.2 Polypoly, Monopoly and Oligopoly',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-green)]">Polypol</h4>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Viele Anbieter / viele Nachfrager</li>
                        <li>Homogene Güter, volle Transparenz</li>
                        <li>Freier Marktzutritt</li>
                        <li><strong>P = MC</strong></li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-red)]">Monopol</h4>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Ein Anbieter / viele Nachfrager</li>
                        <li>Preissetzer, keine Substitute</li>
                        <li><strong>MR = MC → P(1+1/ε) = MC</strong></li>
                        <li>Wohlfahrtsverlust</li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-amber)]">Oligopol</h4>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Wenige Anbieter / viele Nachfrager</li>
                        <li>Interdependenz, Kartellgefahr</li>
                        <li>Cournot (Menge) oder Bertrand (Preis)</li>
                        <li>Spieltheorie</li>
                    </ul>
                </div>
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-green)]">Polypoly</h4>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Many sellers / many buyers</li>
                        <li>Homogeneous goods, full transparency</li>
                        <li>Free market entry</li>
                        <li><strong>P = MC</strong></li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-red)]">Monopoly</h4>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>One seller / many buyers</li>
                        <li>Price maker, no substitutes</li>
                        <li><strong>MR = MC → P(1+1/ε) = MC</strong></li>
                        <li>Deadweight loss</li>
                    </ul>
                </div>
                <div class="bg-[var(--panel-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--accent-amber)]">Oligopoly</h4>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Few sellers / many buyers</li>
                        <li>Interdependence, cartel risk</li>
                        <li>Cournot (quantity) or Bertrand (price)</li>
                        <li>Game theory</li>
                    </ul>
                </div>
            </div>`
        },
        {
            id: 'marktmacht',
            titleDe: '6.3 Kennzahlen der Marktmacht (Lerner, HHI)',
            titleEn: '6.3 Market Power Metrics (Lerner, HHI)',
            htmlDe: `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Lerner-Index (L)</h4>
                    <p class="text-sm text-[var(--text-muted)]">Misst Marktmacht: Aufschlag des Preises über die Grenzkosten.</p>
                    <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">L = (P − MC) / P = −1/ε</div>
                    <ul class="text-xs space-y-1 text-[var(--text-muted)] pl-4 list-disc">
                        <li>L = 0 → keine Marktmacht (Polypol)</li>
                        <li>L → 1 → hohe Marktmacht (Monopol)</li>
                    </ul>
                </div>
                <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Herfindahl-Hirschman-Index (HHI)</h4>
                    <p class="text-sm text-[var(--text-muted)]">Misst Marktkonzentration (Kartellamt).</p>
                    <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">HHI = Σ sᵢ²</div>
                    <p class="text-xs text-[var(--text-muted)]">sᵢ = Marktanteil in %. HHI = 10.000 → Monopol. HHI &lt; 1.500 → wettbewerblich.</p>
                </div>
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Lerner Index (L)</h4>
                    <p class="text-sm text-[var(--text-muted)]">Measures market power: mark-up of price over marginal cost.</p>
                    <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">L = (P − MC) / P = −1/ε</div>
                    <ul class="text-xs space-y-1 text-[var(--text-muted)] pl-4 list-disc">
                        <li>L = 0 → no market power</li>
                        <li>L → 1 → high market power</li>
                    </ul>
                </div>
                <div class="bg-[var(--bg-color)] p-4 rounded-lg border border-[var(--panel-border)]">
                    <h4 class="mt-0 text-[var(--link-color)]">Herfindahl-Hirschman Index (HHI)</h4>
                    <p class="text-sm text-[var(--text-muted)]">Measures market concentration (antitrust).</p>
                    <div class="bg-[var(--panel-color)] p-3 rounded text-center text-lg font-mono my-2">HHI = Σ sᵢ²</div>
                    <p class="text-xs text-[var(--text-muted)]">sᵢ = market share %. HHI = 10,000 → monopoly. HHI &lt; 1,500 → competitive.</p>
                </div>
            </div>`
        }
    ]
};