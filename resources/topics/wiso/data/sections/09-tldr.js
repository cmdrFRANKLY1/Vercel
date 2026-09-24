// resources/topics/wiso/data/sections/09-tldr.js

export const section = {
    id: 'tldr-summary',
    titleDe: '9. TLDR',
    titleEn: '9. TLDR',
    introDe: 'Die wichtigsten WiSo-Themen kompakt auf einen Blick.',
    introEn: 'The most important WiSo topics compactly at a glance.',
    subtopics: [
        {
            id: 'tldr-grid',
            titleDe: '9.1 Auf einen Blick',
            titleEn: '9.1 At a Glance',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-heart opacity-70"></i><span>Sozialversicherung</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>KV, UV, RV, ALV, PV</li>
                        <li>UV: nur Arbeitgeber</li>
                        <li>Rest: 50/50 AG &amp; AN</li>
                        <li>Umlageverfahren</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-building opacity-70"></i><span>Unternehmensformen</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Einzelunternehmen: unbeschränkt</li>
                        <li>OHG: alle Vollhafter</li>
                        <li>KG: Komplementär + Kommanditist</li>
                        <li>GmbH: ab 25.000 € Stammkapital</li>
                        <li>AG: ab 50.000 € Grundkapital</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chess-knight opacity-70"></i><span>Markttypen</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Polypol: viele/viele, P = MC</li>
                        <li>Monopol: einer/viele, MR = MC</li>
                        <li>Oligopol: wenige/viele, Spieltheorie</li>
                        <li>Monopson: viele/einer</li>
                        <li>Lerner-Index &amp; HHI</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chart-line opacity-70"></i><span>Angebot &amp; Nachfrage</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Q<sub>D</sub> = a − b·P (fallend)</li>
                        <li>Q<sub>S</sub> = c + d·P (steigend)</li>
                        <li>Gleichgewicht: Q<sub>D</sub> = Q<sub>S</sub></li>
                        <li>Elastizität ε = %ΔQ / %ΔP</li>
                        <li>KR + PR = Wohlfahrt</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-scale-balanced opacity-70"></i><span>Handelsrecht</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Istkaufmann: § 1 HGB, deklaratorisch</li>
                        <li>Kannkaufmann: § 2 HGB, konstitutiv</li>
                        <li>Formkaufmann: § 6 HGB</li>
                        <li>HRA: Einzel/OHG/KG</li>
                        <li>HRB: GmbH/UG/AG</li>
                    </ul>
                </div>
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-heart opacity-70"></i><span>Social Security</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>KV, UV, RV, ALV, PV</li>
                        <li>UV: employer only</li>
                        <li>Rest: 50/50 employer &amp; employee</li>
                        <li>Pay-as-you-go system</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-building opacity-70"></i><span>Corporate Forms</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Sole proprietorship: unlimited</li>
                        <li>OHG: all fully liable</li>
                        <li>KG: general partner + limited partner</li>
                        <li>GmbH: from €25,000 share capital</li>
                        <li>AG: from €50,000 share capital</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chess-knight opacity-70"></i><span>Market Structures</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Polypoly: many/many, P = MC</li>
                        <li>Monopoly: one/many, MR = MC</li>
                        <li>Oligopoly: few/many, game theory</li>
                        <li>Monopsony: many/one</li>
                        <li>Lerner index &amp; HHI</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-chart-line opacity-70"></i><span>Supply &amp; Demand</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Q<sub>D</sub> = a − b·P (falling)</li>
                        <li>Q<sub>S</sub> = c + d·P (rising)</li>
                        <li>Equilibrium: Q<sub>D</sub> = Q<sub>S</sub></li>
                        <li>Elasticity ε = %ΔQ / %ΔP</li>
                        <li>CS + PS = welfare</li>
                    </ul>
                </div>
                <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-scale-balanced opacity-70"></i><span>Commercial Law</span></div>
                    <ul class="text-xs text-[var(--text-muted)] list-disc pl-4 space-y-1">
                        <li>Actual merchant: § 1 HGB, declaratory</li>
                        <li>Optional merchant: § 2 HGB, constitutive</li>
                        <li>Formal merchant: § 6 HGB</li>
                        <li>HRA: sole/OHG/KG</li>
                        <li>HRB: GmbH/UG/AG</li>
                    </ul>
                </div>
            </div>`
        }
    ]
};