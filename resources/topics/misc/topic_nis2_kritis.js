// resources/topics/topic_nis2_kritis.js

registerTopic({
    id: 'NIS2 and KRITIS',

    // ── SUB-CATEGORY ────────────────────────────────────────────
    // ────────────────────────────────────────────────────────────

    icon: 'fa-shield-halved',
    titleDe: 'NIS2 & KRITIS',
    titleEn: 'NIS2 & KRITIS',
    descDe: 'Kritische Infrastrukturen und die EU-Cybersicherheitsrichtlinie — Sektoren, Schwellenwerte und Pflichten.',
    descEn: 'Critical infrastructures and the EU cybersecurity directive — sectors, thresholds, and obligations.',

    sidebarTitleDe: 'NIS2 & KRITIS',
    sidebarTitleEn: 'NIS2 & KRITIS',
    sidebarSubtitleDe: 'Datenschutz Teil 3.6',
    sidebarSubtitleEn: 'Data Protection Part 3.6',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'NIS2 & KRITIS',
        titleEn: 'NIS2 & KRITIS',
        introDe: 'Kritische Infrastrukturen (KRITIS) sind Organisationen, deren Ausfall das Gemeinwesen erheblich gefährden würde. <strong>KRITIS</strong> regelt dies national für Deutschland, <strong>NIS2</strong> setzt den Rahmen EU-weit. Seit dem 07.11.2024 gilt die Durchführungsverordnung (EU) 2024/2690, die Mindestanforderungen an Risikomanagement und die Meldepflichten für erhebliche Sicherheitsvorfälle konkretisiert. Diese Seite fasst Sektoren, Schwellenwerte, Betroffene und Pflichten zusammen.',
        introEn: 'Critical infrastructures (KRITIS) are organizations whose failure would significantly endanger the public. <strong>KRITIS</strong> regulates this nationally for Germany, <strong>NIS2</strong> sets the framework EU-wide. Since 07.11.2024, Implementing Regulation (EU) 2024/2690 has been in force, specifying minimum requirements for risk management and reporting obligations for significant security incidents. This page summarizes sectors, thresholds, affected entities, and obligations.'
    },

    quickLinks: [
        { icon: 'fa-industry',        href: '#section1', switchToDoc: true, labelDe: 'KRITIS',           labelEn: 'KRITIS' },
        { icon: 'fa-scale-balanced',  href: '#section2', switchToDoc: true, labelDe: 'BSIG & Verordnung', labelEn: 'BSIG & Regulation' },
        { icon: 'fa-globe',           href: '#section3', switchToDoc: true, labelDe: 'NIS2',             labelEn: 'NIS2' },
        { icon: 'fa-list-check',      href: '#section4', switchToDoc: true, labelDe: 'Anforderungen',     labelEn: 'Requirements' },
        { icon: 'fa-triangle-exclamation', href: '#section5', switchToDoc: true, labelDe: 'Sicherheitsvorfall', labelEn: 'Incident' },
        { icon: 'fa-palette',         href: '#section-illustrations', switchToDoc: true, labelDe: 'Visualisierungen', labelEn: 'Visuals' }
    ],

    sections: [
        /* ============================================================
           SECTION 1 — KRITIS
           ============================================================ */
        {
            id: 'section1',
            titleDe: 'KRITIS — Kritische Infrastrukturen',
            titleEn: 'KRITIS — Critical Infrastructures',
            introDe: 'Kritische Infrastrukturen sind Organisationen und Einrichtungen mit wichtiger Bedeutung für das staatliche Gemeinwesen. Bei ihrem Ausfall oder ihrer Beeinträchtigung würden nachhaltig wirkende Versorgungsengpässe, erhebliche Störungen der öffentlichen Sicherheit oder andere dramatische Folgen eintreten.',
            introEn: 'Critical infrastructures are organizations and institutions of vital importance to the state. Their failure or impairment would cause sustained supply shortages, significant disruptions to public security, or other dramatic consequences.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Die Sektoren',
                    titleEn: 'The Sectors',
                    htmlDe: `
                    <p class="text-xs mb-2">KRITIS umfasst zehn Sektoren. Zwei davon — <strong>Staat und Verwaltung</strong> sowie <strong>Medien und Kultur</strong> — unterliegen jedoch nicht der Regulierung durch das BSIG.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Sektor</th><th>Regulierung durch BSIG</th></tr>
                    <tr><td><strong>Energie</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Informationstechnik und Telekommunikation</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Transport und Verkehr</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Gesundheit</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Wasser</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Ernährung</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Finanz- und Versicherungswesen</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Siedlungsabfallentsorgung</strong></td><td class="text-[var(--text-muted)]">Ja</td></tr>
                    <tr><td><strong>Staat und Verwaltung</strong></td><td class="text-[var(--text-muted)]">Nein</td></tr>
                    <tr><td><strong>Medien und Kultur</strong></td><td class="text-[var(--text-muted)]">Nein</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">KRITIS gilt für Deutschland. NIS2 gilt EU-weit.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">KRITIS covers ten sectors. Two of them — <strong>government and administration</strong> as well as <strong>media and culture</strong> — are not subject to regulation under the BSIG.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Sector</th><th>Regulated by BSIG</th></tr>
                    <tr><td><strong>Energy</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Information technology and telecommunications</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Transport and traffic</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Health</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Water</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Food</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Finance and insurance</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Municipal waste disposal</strong></td><td class="text-[var(--text-muted)]">Yes</td></tr>
                    <tr><td><strong>Government and administration</strong></td><td class="text-[var(--text-muted)]">No</td></tr>
                    <tr><td><strong>Media and culture</strong></td><td class="text-[var(--text-muted)]">No</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">KRITIS applies to Germany. NIS2 applies EU-wide.</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Schwellenwerte & Betreiberpflichten',
                    titleEn: 'Thresholds & Operator Obligations',
                    htmlDe: `
                    <p class="text-xs mb-2">Ob ein bedeutender Versorgungsgrad vorliegt, hängt vom Erreichen oder Überschreiten von <strong>Schwellenwerten</strong> ab, die in der BSI-Kritisverordnung definiert sind. Werden diese erreicht, gelten für KRITIS-Betreiber die gesetzlichen <strong>Melde- und Nachweispflichten</strong> des BSIG.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Wichtig:</strong> Alle Organisationen aus den regulierten Sektoren zählen unabhängig von ihrer Größe zu den Kritischen Infrastrukturen — sofern sie die Schwellenwerte erreichen oder überschreiten.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Whether a significant supply level exists depends on reaching or exceeding <strong>thresholds</strong> defined in the BSI-Kritisverordnung. If reached, KRITIS operators are subject to the statutory <strong>reporting and verification obligations</strong> of the BSIG.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Important:</strong> All organizations in the regulated sectors count as critical infrastructures regardless of their size — provided they reach or exceed the thresholds.
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 2 — BSIG / BSI-KRITISV
           ============================================================ */
        {
            id: 'section2',
            titleDe: 'BSI-Gesetz & BSI-KRITIS-Verordnung',
            titleEn: 'BSI Act & BSI-KRITIS Regulation',
            introDe: 'Das BSIG definiert, was Kritische Infrastrukturen sind. Die BSI-Kritisverordnung legt die konkreten Anlagenkategorien und Schwellenwerte fest — insbesondere für den Sektor Informationstechnik und Telekommunikation.',
            introEn: 'The BSIG defines what critical infrastructures are. The BSI-Kritisverordnung sets the specific system categories and thresholds — especially for the information technology and telecommunications sector.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Rechtliche Definition',
                    titleEn: 'Legal Definition',
                    htmlDe: `
                    <p class="text-xs mb-2">Gemäß <strong>§ 2 (10) BSIG</strong> sind Kritische Infrastrukturen Einrichtungen, Anlagen oder Teile davon, die den Sektoren Energie, Informationstechnik und Telekommunikation, Transport und Verkehr, Gesundheit, Wasser, Ernährung, Finanz- und Versicherungswesen sowie Siedlungsabfallentsorgung angehören und von hoher Bedeutung für das Funktionieren des Gemeinwesens sind.</p>
                    <p class="text-xs mb-2">Die Kritischen Infrastrukturen im Sinne dieses Gesetzes werden durch die Rechtsverordnung nach <strong>§ 10 (1) BSIG</strong> (BSI-Kritisverordnung) näher bestimmt.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">According to <strong>§ 2 (10) BSIG</strong>, critical infrastructures are facilities, systems, or parts thereof belonging to the sectors energy, information technology and telecommunications, transport and traffic, health, water, food, finance and insurance, and municipal waste disposal, and are of high importance for the functioning of the public.</p>
                    <p class="text-xs mb-2">The critical infrastructures within the meaning of this act are further specified by the statutory regulation under <strong>§ 10 (1) BSIG</strong> (BSI-Kritisverordnung).</p>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Sektor IT & Telekommunikation — Schwellenwerte',
                    titleEn: 'IT & Telecommunications Sector — Thresholds',
                    htmlDe: `
                    <p class="text-xs mb-2">Im Sektor Informationstechnik und Telekommunikation sind folgende kritische Dienstleistungen definiert:</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Sprach- und Datenübertragung</strong> — in den Bereichen Zugang, Übertragung, Vermittlung und Steuerung.</li>
                        <li><strong class="text-[var(--text-color)]">Datenspeicherung und -verarbeitung</strong> — in den Bereichen Housing, IT-Hosting und Vertrauensdienste.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Schwellenwerte im Detail</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Anlagenkategorie</th><th>Bemessungskriterium</th><th>Schwellenwert</th></tr>
                    <tr><td>Zugangsnetz</td><td class="text-[var(--text-muted)]">Teilnehmeranschlüsse</td><td class="text-[var(--text-muted)]">100.000</td></tr>
                    <tr><td>Übertragungsnetz</td><td class="text-[var(--text-muted)]">Vertragspartner des Dienstes</td><td class="text-[var(--text-muted)]">100.000</td></tr>
                    <tr><td>Seekabelanlandestation</td><td class="text-[var(--text-muted)]">Angebundene Seekabel</td><td class="text-[var(--text-muted)]">1</td></tr>
                    <tr><td>IXP (Internet Exchange Point)</td><td class="text-[var(--text-muted)]">Angeschlossene autonome Systeme (Jahresdurchschnitt)</td><td class="text-[var(--text-muted)]">100</td></tr>
                    <tr><td>DNS-Resolver</td><td class="text-[var(--text-muted)]">Vertragspartner des Zugangsnetzes</td><td class="text-[var(--text-muted)]">100.000</td></tr>
                    <tr><td>Autoritativer DNS-Server</td><td class="text-[var(--text-muted)]">Domains, für die der Server autoritativ ist</td><td class="text-[var(--text-muted)]">250.000</td></tr>
                    <tr><td>Top-Level-Domain-Registry</td><td class="text-[var(--text-muted)]">Verwaltete/betriebene Domains</td><td class="text-[var(--text-muted)]">250.000</td></tr>
                    <tr><td>Rechenzentrum (Housing)</td><td class="text-[var(--text-muted)]">Vertraglich vereinbarte Leistung in MW</td><td class="text-[var(--text-muted)]">3,5</td></tr>
                    <tr><td>Serverfarm (Hosting)</td><td class="text-[var(--text-muted)]">Physische Instanzen (Jahresdurchschnitt)</td><td class="text-[var(--text-muted)]">10.000</td></tr>
                    <tr><td>Serverfarm (Hosting)</td><td class="text-[var(--text-muted)]">Virtuelle Instanzen (Jahresdurchschnitt)</td><td class="text-[var(--text-muted)]">15.000</td></tr>
                    <tr><td>Content Delivery Network</td><td class="text-[var(--text-muted)]">Ausgeliefertes Datenvolumen (TByte/Jahr)</td><td class="text-[var(--text-muted)]">75.000</td></tr>
                    <tr><td>Vertrauensdienste</td><td class="text-[var(--text-muted)]">Ausgegebene qualifizierte Zertifikate</td><td class="text-[var(--text-muted)]">500.000</td></tr>
                    <tr><td>Vertrauensdienste</td><td class="text-[var(--text-muted)]">Serverzertifikate (TLS/SSL)</td><td class="text-[var(--text-muted)]">10.000</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">In the information technology and telecommunications sector, the following critical services are defined:</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Voice and data transmission</strong> — in the areas of access, transmission, switching, and control.</li>
                        <li><strong class="text-[var(--text-color)]">Data storage and processing</strong> — in the areas of housing, IT hosting, and trust services.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Thresholds in detail</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>System category</th><th>Measurement criterion</th><th>Threshold</th></tr>
                    <tr><td>Access network</td><td class="text-[var(--text-muted)]">Subscriber lines</td><td class="text-[var(--text-muted)]">100,000</td></tr>
                    <tr><td>Transmission network</td><td class="text-[var(--text-muted)]">Contract partners of the service</td><td class="text-[var(--text-muted)]">100,000</td></tr>
                    <tr><td>Submarine cable landing station</td><td class="text-[var(--text-muted)]">Connected submarine cables</td><td class="text-[var(--text-muted)]">1</td></tr>
                    <tr><td>IXP (Internet Exchange Point)</td><td class="text-[var(--text-muted)]">Connected autonomous systems (annual average)</td><td class="text-[var(--text-muted)]">100</td></tr>
                    <tr><td>DNS resolver</td><td class="text-[var(--text-muted)]">Contract partners of the access network</td><td class="text-[var(--text-muted)]">100,000</td></tr>
                    <tr><td>Authoritative DNS server</td><td class="text-[var(--text-muted)]">Domains for which the server is authoritative</td><td class="text-[var(--text-muted)]">250,000</td></tr>
                    <tr><td>Top-level domain registry</td><td class="text-[var(--text-muted)]">Managed/operated domains</td><td class="text-[var(--text-muted)]">250,000</td></tr>
                    <tr><td>Data center (housing)</td><td class="text-[var(--text-muted)]">Contractually agreed capacity in MW</td><td class="text-[var(--text-muted)]">3.5</td></tr>
                    <tr><td>Server farm (hosting)</td><td class="text-[var(--text-muted)]">Physical instances (annual average)</td><td class="text-[var(--text-muted)]">10,000</td></tr>
                    <tr><td>Server farm (hosting)</td><td class="text-[var(--text-muted)]">Virtual instances (annual average)</td><td class="text-[var(--text-muted)]">15,000</td></tr>
                    <tr><td>Content delivery network</td><td class="text-[var(--text-muted)]">Delivered data volume (TByte/year)</td><td class="text-[var(--text-muted)]">75,000</td></tr>
                    <tr><td>Trust services</td><td class="text-[var(--text-muted)]">Issued qualified certificates</td><td class="text-[var(--text-muted)]">500,000</td></tr>
                    <tr><td>Trust services</td><td class="text-[var(--text-muted)]">Server certificates (TLS/SSL)</td><td class="text-[var(--text-muted)]">10,000</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 3 — NIS2
           ============================================================ */
        {
            id: 'section3',
            titleDe: 'NIS2 — Network and Information Security 2',
            titleEn: 'NIS2 — Network and Information Security 2',
            introDe: 'Mit dem Ziel, ein hohes gemeinsames Cybersicherheitsniveau in der Europäischen Union zu etablieren, trat zum 07.11.2024 die Durchführungsverordnung (EU) 2024/2690 in Kraft. Sie formuliert EU-weite Mindestanforderungen an Risikomanagementmaßnahmen und präzisiert, ab wann ein Sicherheitsvorfall als erheblich gilt.',
            introEn: 'With the goal of establishing a high common level of cybersecurity in the European Union, Implementing Regulation (EU) 2024/2690 entered into force on 07.11.2024. It formulates EU-wide minimum requirements for risk management measures and specifies when a security incident is considered significant.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Betroffene Anbieter und Dienste',
                    titleEn: 'Affected Providers and Services',
                    htmlDe: `
                    <p class="text-xs mb-2">Die Verordnung richtet sich insbesondere an Anbieter digitaler Infrastrukturen und digitaler Dienste. Dazu zählen:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Kategorie</th><th>Beispiele</th></tr>
                    <tr><td><strong>DNS-Dienste</strong></td><td class="text-[var(--text-muted)]">DNS-Diensteanbieter, TLD-Namenregister</td></tr>
                    <tr><td><strong>Cloud & Rechenzentrum</strong></td><td class="text-[var(--text-muted)]">Cloud-Computing-Dienste, Rechenzentrumsdienste, Content Delivery Networks</td></tr>
                    <tr><td><strong>Managed Services</strong></td><td class="text-[var(--text-muted)]">MSP (Managed Service Provider), MSSP (Managed Security Service Provider)</td></tr>
                    <tr><td><strong>Online-Plattformen</strong></td><td class="text-[var(--text-muted)]">Online-Marktplätze, Online-Suchmaschinen, soziale Netzwerke</td></tr>
                    <tr><td><strong>Vertrauensdienste</strong></td><td class="text-[var(--text-muted)]">Zeitstempel, elektronische Signatur</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The regulation targets in particular providers of digital infrastructures and digital services. These include:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Category</th><th>Examples</th></tr>
                    <tr><td><strong>DNS services</strong></td><td class="text-[var(--text-muted)]">DNS service providers, TLD name registries</td></tr>
                    <tr><td><strong>Cloud & data center</strong></td><td class="text-[var(--text-muted)]">Cloud computing services, data center services, content delivery networks</td></tr>
                    <tr><td><strong>Managed services</strong></td><td class="text-[var(--text-muted)]">MSP (Managed Service Provider), MSSP (Managed Security Service Provider)</td></tr>
                    <tr><td><strong>Online platforms</strong></td><td class="text-[var(--text-muted)]">Online marketplaces, online search engines, social networks</td></tr>
                    <tr><td><strong>Trust services</strong></td><td class="text-[var(--text-muted)]">Time stamps, electronic signatures</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Umsetzung in Deutschland',
                    titleEn: 'Implementation in Germany',
                    htmlDe: `
                    <p class="text-xs mb-2">Die Durchführungsverordnung gilt <strong>unmittelbar</strong>. Eine nationalgesetzliche Ausgestaltung in Deutschland liegt seit Mitte 2025 vor und wurde vom BSI in der Folge des Inkrafttretens dringend erwartet.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>Die Verordnung präzisiert die Mindestanforderungen für Risikomanagementmaßnahmen aus <strong>Artikel 21 der NIS-2-Richtlinie</strong>.</li>
                        <li>Sie konkretisiert, welche Sicherheitsvorfälle nach <strong>Artikel 23 der NIS-2-Richtlinie</strong> als "erheblich" gelten.</li>
                        <li>Sobald die NIS-2-Richtlinie in nationales Recht umgesetzt ist, gelten für die betroffenen Sektoren die Regelungen der Durchführungsverordnung.</li>
                        <li>Deren Mindestanforderungen können durch nationales Recht oder durch Vorgaben des BSI <strong>weiter angehoben</strong> werden.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The Implementing Regulation applies <strong>directly</strong>. National legislation in Germany has been in place since mid-2025 and was urgently awaited from the BSI following its entry into force.</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li>The regulation specifies the minimum requirements for risk management measures from <strong>Article 21 of the NIS-2 Directive</strong>.</li>
                        <li>It specifies which security incidents are considered "significant" under <strong>Article 23 of the NIS-2 Directive</strong>.</li>
                        <li>Once the NIS-2 Directive is transposed into national law, the provisions of the Implementing Regulation apply to the affected sectors.</li>
                        <li>Its minimum requirements can be <strong>raised further</strong> by national law or by BSI specifications.</li>
                    </ul>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 4 — REQUIREMENTS
           ============================================================ */
        {
            id: 'section4',
            titleDe: 'Anforderungen von NIS2',
            titleEn: 'NIS2 Requirements',
            introDe: 'Die technischen und methodischen Anforderungen der Risikomanagementmaßnahmen beruhen auf europäischen und internationalen Normen. Sie umfassen Risikobewertung, Sicherheitsmaßnahmen, Dokumentation und Schulung.',
            introEn: 'The technical and methodological requirements of the risk management measures are based on European and international standards. They include risk assessment, security measures, documentation, and training.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Überblick der Maßnahmen',
                    titleEn: 'Overview of Measures',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Bereich</th><th>Anforderung</th></tr>
                    <tr><td><strong>Risikobewertung</strong></td><td class="text-[var(--text-muted)]">Regelmäßige Durchführung zur Identifikation potenzieller Sicherheitsrisiken.</td></tr>
                    <tr><td><strong>Sicherheitsmaßnahmen</strong></td><td class="text-[var(--text-muted)]">Implementierung geeigneter technischer und organisatorischer Maßnahmen auf Basis der Risikobewertung.</td></tr>
                    <tr><td><strong>Dokumentation</strong></td><td class="text-[var(--text-muted)]">Nachverfolgbarkeit der Risikomanagementprozesse und implementierten Maßnahmen.</td></tr>
                    <tr><td><strong>Schulung</strong></td><td class="text-[var(--text-muted)]">Sensibilisierung und Schulung des Personals.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Area</th><th>Requirement</th></tr>
                    <tr><td><strong>Risk assessment</strong></td><td class="text-[var(--text-muted)]">Regular execution to identify potential security risks.</td></tr>
                    <tr><td><strong>Security measures</strong></td><td class="text-[var(--text-muted)]">Implementation of suitable technical and organizational measures based on the risk assessment.</td></tr>
                    <tr><td><strong>Documentation</strong></td><td class="text-[var(--text-muted)]">Traceability of risk management processes and implemented measures.</td></tr>
                    <tr><td><strong>Training</strong></td><td class="text-[var(--text-muted)]">Awareness and training of personnel.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Ziele im Detail',
                    titleEn: 'Objectives in Detail',
                    htmlDe: `
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Risikoanalyse und Sicherheit für Informationssysteme:</strong> Konzepte erstellen und pflegen.</li>
                        <li><strong class="text-[var(--text-color)]">Bewältigung von Sicherheitsvorfällen:</strong> Prozesse für Erkennung, Reaktion und Wiederherstellung.</li>
                        <li><strong class="text-[var(--text-color)]">Aufrechterhaltung des Betriebs:</strong> Backup-Management, Wiederherstellung nach Notfällen, Krisenmanagement.</li>
                        <li><strong class="text-[var(--text-color)]">Sicherheit der Lieferkette:</strong> Sicherheitsaspekte in Beziehungen zu unmittelbaren Anbietern und Diensteanbietern.</li>
                        <li><strong class="text-[var(--text-color)]">Sicherheitsmaßnahmen bei Erwerb, Entwicklung und Wartung:</strong> Management und Offenlegung von Schwachstellen.</li>
                        <li><strong class="text-[var(--text-color)]">Wirksamkeitsbewertung:</strong> Konzepte und Verfahren zur Bewertung der Risikomanagementmaßnahmen.</li>
                        <li><strong class="text-[var(--text-color)]">Cyberhygiene und Schulung:</strong> Grundlegende Verfahren und Schulungen im Bereich Cybersicherheit.</li>
                        <li><strong class="text-[var(--text-color)]">Kryptografie und Verschlüsselung:</strong> Konzepte und Verfahren für den Einsatz von Kryptografie.</li>
                        <li><strong class="text-[var(--text-color)]">Personalsicherheit, Zugriffskontrolle, Anlagenmanagement:</strong> Sicherheit des Personals und Management von Anlagen.</li>
                        <li><strong class="text-[var(--text-color)]">Multi-Faktor-Authentifizierung:</strong> MFA oder kontinuierliche Authentifizierung, gesicherte Sprach-, Video- und Textkommunikation sowie Notfallkommunikationssysteme.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Risk analysis and information system security:</strong> create and maintain concepts.</li>
                        <li><strong class="text-[var(--text-color)]">Incident handling:</strong> processes for detection, response, and recovery.</li>
                        <li><strong class="text-[var(--text-color)]">Business continuity:</strong> backup management, disaster recovery, crisis management.</li>
                        <li><strong class="text-[var(--text-color)]">Supply chain security:</strong> security aspects in relationships with direct suppliers and service providers.</li>
                        <li><strong class="text-[var(--text-color)]">Security in acquisition, development, and maintenance:</strong> management and disclosure of vulnerabilities.</li>
                        <li><strong class="text-[var(--text-color)]">Effectiveness assessment:</strong> concepts and procedures for evaluating risk management measures.</li>
                        <li><strong class="text-[var(--text-color)]">Cyber hygiene and training:</strong> basic procedures and training in cybersecurity.</li>
                        <li><strong class="text-[var(--text-color)]">Cryptography and encryption:</strong> concepts and procedures for using cryptography.</li>
                        <li><strong class="text-[var(--text-color)]">Personnel security, access control, asset management:</strong> security of personnel and management of assets.</li>
                        <li><strong class="text-[var(--text-color)]">Multi-factor authentication:</strong> MFA or continuous authentication, secured voice, video, and text communication, and emergency communication systems.</li>
                    </ul>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 5 — INCIDENT
           ============================================================ */
        {
            id: 'section5',
            titleDe: 'Der erhebliche Sicherheitsvorfall',
            titleEn: 'The Significant Security Incident',
            introDe: 'Ein Sicherheitsvorfall gilt nach der Verordnung unter anderem als erheblich, wenn er potenziell eine Beeinträchtigung kritischer Dienste zur Folge hat und substanzielle Auswirkungen auf die Vertraulichkeit, Integrität oder Verfügbarkeit von Netz- und Informationssystemen drohen.',
            introEn: 'Under the regulation, a security incident is considered significant, among other things, if it potentially impairs critical services and threatens substantial impacts on the confidentiality, integrity, or availability of network and information systems.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Kriterien und Schwellenwerte',
                    titleEn: 'Criteria and Thresholds',
                    htmlDe: `
                    <p class="text-xs mb-2">Die festgelegten Kriterien wie <strong>Ausfallzeit</strong> und <strong>Nutzerbetroffenheit</strong> und deren Schwellenwerte für die Einstufung eines Vorfalls als erheblich können je nach Sektor und Art der Dienstleistung variieren.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Wichtig:</strong> Sobald die NIS-2-Richtlinie in nationales Recht umgesetzt ist, gelten für die betroffenen Sektoren die Regelungen der Durchführungsverordnung. Deren Mindestanforderungen können durch nationales Recht oder durch Vorgaben des BSI weiter angehoben werden.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The defined criteria such as <strong>downtime</strong> and <strong>user impact</strong> and their thresholds for classifying an incident as significant may vary depending on the sector and type of service.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Important:</strong> Once the NIS-2 Directive is transposed into national law, the provisions of the Implementing Regulation apply to the affected sectors. Its minimum requirements can be raised further by national law or by BSI specifications.
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           TLDR
           ============================================================ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Das Wichtigste an einem Ort.',
            introEn: 'The most important points in one place.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-industry text-lg opacity-90"></i>
                                <span>1. KRITIS</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>KRITIS</strong> gilt national für Deutschland. Zehn Sektoren, davon acht reguliert durch das BSIG. Schwellenwerte entscheiden über die Betreiberpflichten.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-globe text-lg opacity-90"></i>
                                <span>2. NIS2</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>NIS2</strong> gilt EU-weit. Seit 07.11.2024 gilt die Durchführungsverordnung (EU) 2024/2690 mit Mindestanforderungen an Risikomanagement und Meldepflichten.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-list-check text-lg opacity-90"></i>
                                <span>3. Anforderungen</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Risikobewertung, technische und organisatorische Maßnahmen, Dokumentation, Schulung. Die Anforderungen beruhen auf europäischen und internationalen Normen.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-triangle-exclamation text-lg opacity-90"></i>
                                <span>4. Sicherheitsvorfall</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Erheblich, wenn kritische Dienste beeinträchtigt und Vertraulichkeit, Integrität oder Verfügbarkeit substanziell gefährdet sind. Schwellenwerte variieren nach Sektor.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-industry text-lg opacity-90"></i>
                                <span>1. KRITIS</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>KRITIS</strong> applies nationally to Germany. Ten sectors, eight regulated by the BSIG. Thresholds determine operator obligations.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-globe text-lg opacity-90"></i>
                                <span>2. NIS2</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>NIS2</strong> applies EU-wide. Since 07.11.2024, Implementing Regulation (EU) 2024/2690 sets minimum requirements for risk management and reporting.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-list-check text-lg opacity-90"></i>
                                <span>3. Requirements</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Risk assessment, technical and organizational measures, documentation, training. Requirements are based on European and international standards.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-triangle-exclamation text-lg opacity-90"></i>
                                <span>4. Security Incident</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Significant if critical services are impaired and confidentiality, integrity, or availability are substantially threatened. Thresholds vary by sector.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    /* ============================================================
       ILLUSTRATIONS — 4 pure-CSS animations
       ============================================================ */
    illustrations: {
        titleDe: 'Visualisierungen & Grafiken',
        titleEn: 'Visualizations & Graphics',
        introDe: 'Vier kurze Animationen zu den wichtigsten Konzepten von KRITIS und NIS2.',
        introEn: 'Four short animations illustrating the most important KRITIS and NIS2 concepts.',
        animations: [
            /* 1 — KRITIS SECTORS */
            {
                id: 'vis-kritis-sectors',
                titleDe: 'KRITIS-Sektoren',
                titleEn: 'KRITIS Sectors',
                descDe: 'Die zehn Sektoren, die zu Kritischen Infrastrukturen zählen — mit Markierung der nicht durch das BSIG regulierten Bereiche.',
                descEn: 'The ten sectors that count as critical infrastructures — highlighting those not regulated by the BSIG.',
                html: `
                <style>
                    .pm-kritis-stage { max-width: 560px; margin: 0 auto; padding: 1rem 0.5rem; font-family: 'Inter', sans-serif; }
                    .pm-kritis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
                    .pm-kritis-item {
                        display: flex; align-items: center; gap: 0.6rem;
                        padding: 0.6rem 0.75rem; border-radius: 0.45rem;
                        background: var(--bg-color); border: 1px solid var(--border-color);
                        font-size: 0.7rem; font-weight: 600; color: var(--text-color);
                        will-change: transform, border-color, box-shadow;
                    }
                    .pm-kritis-item i { width: 1.1rem; text-align: center; opacity: 0.85; color: var(--link-color); }
                    .pm-kritis-item span { font-family: 'Inter', sans-serif; }
                    .pm-kritis-item .pm-kritis-badge {
                        margin-left: auto; font-size: 0.55rem; font-weight: 800; letter-spacing: 0.04em;
                        text-transform: uppercase; padding: 0.1rem 0.35rem; border-radius: 0.25rem;
                        font-family: 'Fira Code', monospace;
                    }
                    .pm-kritis-reg { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
                    .pm-kritis-noreg { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
                    .pm-kritis-item:nth-child(1) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 0s; }
                    .pm-kritis-item:nth-child(2) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 0.4s; }
                    .pm-kritis-item:nth-child(3) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 0.8s; }
                    .pm-kritis-item:nth-child(4) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 1.2s; }
                    .pm-kritis-item:nth-child(5) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 1.6s; }
                    .pm-kritis-item:nth-child(6) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 2.0s; }
                    .pm-kritis-item:nth-child(7) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 2.4s; }
                    .pm-kritis-item:nth-child(8) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 2.8s; }
                    .pm-kritis-item:nth-child(9) { animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 3.2s; }
                    .pm-kritis-item:nth-child(10){ animation: pm-kritis-pulse 6s ease-in-out infinite; animation-delay: 3.6s; }
                    @keyframes pm-kritis-pulse {
                        0%, 100% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                        6%, 18% { transform: translateX(6px); border-color: #3b82f6; box-shadow: 0 0 16px -6px #3b82f6; }
                        30% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                    }
                    @media (max-width: 480px) { .pm-kritis-grid { grid-template-columns: 1fr; } }
                    @media (prefers-reduced-motion: reduce) { .pm-kritis-item { animation: none !important; } }
                </style>
                <div class="pm-kritis-stage">
                    <div class="pm-kritis-grid">
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-bolt"></i>
                            <span data-lang-de>Energie</span><span data-lang-en style="display:none;">Energy</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-network-wired"></i>
                            <span data-lang-de>IT & Telekom</span><span data-lang-en style="display:none;">IT & Telecom</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-truck"></i>
                            <span data-lang-de>Transport</span><span data-lang-en style="display:none;">Transport</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-heart-pulse"></i>
                            <span data-lang-de>Gesundheit</span><span data-lang-en style="display:none;">Health</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-water"></i>
                            <span data-lang-de>Wasser</span><span data-lang-en style="display:none;">Water</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-wheat-awn"></i>
                            <span data-lang-de>Ernährung</span><span data-lang-en style="display:none;">Food</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-building-columns"></i>
                            <span data-lang-de>Finanzen</span><span data-lang-en style="display:none;">Finance</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-recycle"></i>
                            <span data-lang-de>Abfall</span><span data-lang-en style="display:none;">Waste</span>
                            <span class="pm-kritis-badge pm-kritis-reg">BSIG</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-landmark"></i>
                            <span data-lang-de>Staat</span><span data-lang-en style="display:none;">Government</span>
                            <span class="pm-kritis-badge pm-kritis-noreg">–</span>
                        </div>
                        <div class="pm-kritis-item">
                            <i class="fa-solid fa-photo-film"></i>
                            <span data-lang-de>Medien</span><span data-lang-en style="display:none;">Media</span>
                            <span class="pm-kritis-badge pm-kritis-noreg">–</span>
                        </div>
                    </div>
                </div>
                `
            },

            /* 2 — DORA STYLE NIS2 vs KRITIS */
            {
                id: 'vis-nis2-kritis-scope',
                titleDe: 'NIS2 vs. KRITIS',
                titleEn: 'NIS2 vs. KRITIS',
                descDe: 'KRITIS gilt national für Deutschland. NIS2 gilt EU-weit und umfasst zusätzliche Sektoren sowie Anbieter digitaler Dienste.',
                descEn: 'KRITIS applies nationally to Germany. NIS2 applies EU-wide and covers additional sectors and digital service providers.',
                html: `
                <style>
                    .pm-scope-stage { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; padding: 0.5rem 0; max-width: 560px; margin: 0 auto; font-family: 'Inter', sans-serif; }
                    @media (max-width: 560px) { .pm-scope-stage { grid-template-columns: 1fr; } }
                    .pm-scope-col {
                        padding: 0.85rem; border-radius: 0.55rem;
                        background: var(--panel-color); border: 1px solid var(--panel-border);
                        box-shadow: var(--control-shadow); overflow: hidden;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-scope-title {
                        display: inline-flex; align-items: center; gap: 0.4rem;
                        font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em;
                        text-transform: uppercase; margin-bottom: 0.5rem;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-scope-col.kritis .pm-scope-title i { color: #3b82f6; }
                    .pm-scope-col.nis2 .pm-scope-title i { color: #a855f7; }
                    .pm-scope-list { list-style: none; padding: 0; margin: 0; }
                    .pm-scope-list li {
                        display: flex; align-items: center; gap: 0.4rem;
                        padding: 0.3rem 0; font-size: 0.65rem;
                        color: var(--text-muted); font-family: 'Inter', sans-serif;
                        border-bottom: 1px solid var(--border-color);
                    }
                    .pm-scope-list li:last-child { border-bottom: none; }
                    .pm-scope-list li i { width: 0.9rem; text-align: center; opacity: 0.7; font-size: 0.55rem; }
                    .pm-scope-list li .pm-scope-check { color: #10b981; }
                    .pm-scope-list li .pm-scope-cross { color: #ef4444; }
                    .pm-scope-list li .pm-scope-add { color: #a855f7; }
                    .pm-scope-note { font-size: 0.55rem; color: var(--text-muted); margin-top: 0.5rem; font-style: italic; font-family: 'Inter', sans-serif; }
                    @media (prefers-reduced-motion: reduce) { .pm-scope-col { animation: none !important; } }
                </style>
                <div class="pm-scope-stage">
                    <div class="pm-scope-col kritis">
                        <div class="pm-scope-title">
                            <i class="fa-solid fa-industry"></i>
                            <span>KRITIS</span>
                        </div>
                        <ul class="pm-scope-list">
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Energie</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> IT & Telekom</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Transport</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Gesundheit</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Wasser</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Ernährung</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Finanzen</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Abfall</li>
                            <li><i class="fa-solid fa-xmark pm-scope-cross"></i> Staat (nicht BSIG)</li>
                            <li><i class="fa-solid fa-xmark pm-scope-cross"></i> Medien (nicht BSIG)</li>
                        </ul>
                        <p class="pm-scope-note">National · Deutschland</p>
                    </div>
                    <div class="pm-scope-col nis2">
                        <div class="pm-scope-title">
                            <i class="fa-solid fa-globe"></i>
                            <span>NIS2</span>
                        </div>
                        <ul class="pm-scope-list">
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Energie</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> IT & Telekom</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Transport</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Gesundheit</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Wasser</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Ernährung</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Finanzen</li>
                            <li><i class="fa-solid fa-check pm-scope-check"></i> Abfall</li>
                            <li><i class="fa-solid fa-plus pm-scope-add"></i> Staat & Verwaltung</li>
                            <li><i class="fa-solid fa-plus pm-scope-add"></i> Medien & Kultur</li>
                            <li><i class="fa-solid fa-plus pm-scope-add"></i> Digitale Dienste</li>
                            <li><i class="fa-solid fa-plus pm-scope-add"></i> Weltraum</li>
                        </ul>
                        <p class="pm-scope-note">EU-weit · Richtlinie</p>
                    </div>
                </div>
                `
            },

            /* 3 — NIS2 REQUIREMENTS CYCLE */
            {
                id: 'vis-nis2-requirements',
                titleDe: 'NIS2-Anforderungen',
                titleEn: 'NIS2 Requirements',
                descDe: 'Die zentralen Maßnahmen im Kreislauf: Risikobewertung, Maßnahmen, Dokumentation, Schulung.',
                descEn: 'The core measures in a cycle: risk assessment, measures, documentation, training.',
                html: `
                <style>
                    .pm-req-stage { max-width: 500px; margin: 0 auto; padding: 1rem 0.5rem; font-family: 'Inter', sans-serif; }
                    .pm-req-cycle { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
                    .pm-req-item {
                        display: flex; flex-direction: column; gap: 0.4rem;
                        padding: 0.85rem; border-radius: 0.55rem;
                        background: var(--bg-color); border: 1px solid var(--border-color);
                        will-change: transform, border-color, box-shadow;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-req-item i { font-size: 1.3rem; color: var(--link-color); opacity: 0.9; }
                    .pm-req-item strong { font-size: 0.72rem; font-weight: 700; color: var(--heading-color); font-family: 'Inter', sans-serif; }
                    .pm-req-item span { font-size: 0.62rem; color: var(--text-muted); line-height: 1.4; font-family: 'Inter', sans-serif; }
                    .pm-req-item:nth-child(1) { animation: pm-req-pulse 6s ease-in-out infinite; animation-delay: 0s; }
                    .pm-req-item:nth-child(2) { animation: pm-req-pulse 6s ease-in-out infinite; animation-delay: 1.5s; }
                    .pm-req-item:nth-child(3) { animation: pm-req-pulse 6s ease-in-out infinite; animation-delay: 3.0s; }
                    .pm-req-item:nth-child(4) { animation: pm-req-pulse 6s ease-in-out infinite; animation-delay: 4.5s; }
                    @keyframes pm-req-pulse {
                        0%, 100% { transform: translateY(0); border-color: var(--border-color); box-shadow: none; }
                        10%, 30% { transform: translateY(-4px); border-color: #a855f7; box-shadow: 0 0 20px -8px #a855f7; }
                        45% { transform: translateY(0); border-color: var(--border-color); box-shadow: none; }
                    }
                    @media (prefers-reduced-motion: reduce) { .pm-req-item { animation: none !important; } }
                </style>
                <div class="pm-req-stage">
                    <div class="pm-req-cycle">
                        <div class="pm-req-item">
                            <i class="fa-solid fa-magnifying-glass-chart"></i>
                            <strong data-lang-de>Risikobewertung</strong><strong data-lang-en style="display:none;">Risk Assessment</strong>
                            <span data-lang-de>Regelmäßige Identifikation potenzieller Sicherheitsrisiken.</span>
                            <span data-lang-en style="display:none;">Regular identification of potential security risks.</span>
                        </div>
                        <div class="pm-req-item">
                            <i class="fa-solid fa-shield-halved"></i>
                            <strong data-lang-de>Sicherheitsmaßnahmen</strong><strong data-lang-en style="display:none;">Security Measures</strong>
                            <span data-lang-de>Technische und organisatorische Maßnahmen implementieren.</span>
                            <span data-lang-en style="display:none;">Implement technical and organizational measures.</span>
                        </div>
                        <div class="pm-req-item">
                            <i class="fa-solid fa-file-lines"></i>
                            <strong data-lang-de>Dokumentation</strong><strong data-lang-en style="display:none;">Documentation</strong>
                            <span data-lang-de>Nachverfolgbarkeit von Prozessen und Maßnahmen.</span>
                            <span data-lang-en style="display:none;">Traceability of processes and measures.</span>
                        </div>
                        <div class="pm-req-item">
                            <i class="fa-solid fa-graduation-cap"></i>
                            <strong data-lang-de>Schulung</strong><strong data-lang-en style="display:none;">Training</strong>
                            <span data-lang-de>Sensibilisierung und Schulung des Personals.</span>
                            <span data-lang-en style="display:none;">Awareness and training of personnel.</span>
                        </div>
                    </div>
                </div>
                `
            },

            /* 4 — INCIDENT SEVERITY */
            {
                id: 'vis-incident-severity',
                titleDe: 'Erheblicher Sicherheitsvorfall',
                titleEn: 'Significant Security Incident',
                descDe: 'Kriterien wie Ausfallzeit und Nutzerbetroffenheit bestimmen die Einstufung als erheblich — abhängig von Sektor und Dienstleistung.',
                descEn: 'Criteria such as downtime and user impact determine classification as significant — depending on sector and service.',
                html: `
                <style>
                    .pm-inc-stage { max-width: 540px; margin: 0 auto; padding: 1rem 0.5rem; font-family: 'Inter', sans-serif; }
                    .pm-inc-flow { display: flex; flex-direction: column; gap: 0.6rem; position: relative; padding-left: 1.8rem; }
                    .pm-inc-flow::before {
                        content: ''; position: absolute; left: 0.6rem; top: 0.5rem; bottom: 0.5rem;
                        width: 2px; background: var(--border-color); border-radius: 2px;
                    }
                    .pm-inc-step {
                        position: relative; display: flex; align-items: flex-start; gap: 0.6rem;
                        padding: 0.6rem 0.75rem; border-radius: 0.45rem;
                        background: var(--bg-color); border: 1px solid var(--border-color);
                        font-size: 0.68rem; color: var(--text-color);
                        will-change: transform, border-color, box-shadow;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-inc-step::before {
                        content: ''; position: absolute; left: -1.35rem; top: 0.75rem;
                        width: 0.55rem; height: 0.55rem; border-radius: 50%;
                        background: var(--border-color); border: 2px solid var(--bg-color);
                        box-shadow: 0 0 0 2px var(--border-color);
                    }
                    .pm-inc-step i { width: 1rem; text-align: center; opacity: 0.8; color: var(--link-color); flex-shrink: 0; }
                    .pm-inc-step span { font-family: 'Inter', sans-serif; }
                    .pm-inc-step strong { font-weight: 700; color: var(--heading-color); font-family: 'Inter', sans-serif; }
                    .pm-inc-step:nth-child(1) { animation: pm-inc-pulse 6s ease-in-out infinite; animation-delay: 0s; }
                    .pm-inc-step:nth-child(2) { animation: pm-inc-pulse 6s ease-in-out infinite; animation-delay: 1.5s; }
                    .pm-inc-step:nth-child(3) { animation: pm-inc-pulse 6s ease-in-out infinite; animation-delay: 3.0s; }
                    .pm-inc-step:nth-child(4) { animation: pm-inc-pulse 6s ease-in-out infinite; animation-delay: 4.5s; }
                    @keyframes pm-inc-pulse {
                        0%, 100% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                        10%, 30% { transform: translateX(6px); border-color: #ef4444; box-shadow: 0 0 16px -6px #ef4444; }
                        45% { transform: translateX(0); border-color: var(--border-color); box-shadow: none; }
                    }
                    @media (prefers-reduced-motion: reduce) { .pm-inc-step { animation: none !important; } }
                </style>
                <div class="pm-inc-stage">
                    <div class="pm-inc-flow">
                        <div class="pm-inc-step">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <span data-lang-de><strong>Vorfall tritt ein</strong> — Sicherheitsvorfall in Netz- und Informationssystemen.</span>
                            <span data-lang-en style="display:none;"><strong>Incident occurs</strong> — security incident in network and information systems.</span>
                        </div>
                        <div class="pm-inc-step">
                            <i class="fa-solid fa-clock"></i>
                            <span data-lang-de><strong>Ausfallzeit</strong> — Dauer der Beeinträchtigung kritischer Dienste.</span>
                            <span data-lang-en style="display:none;"><strong>Downtime</strong> — duration of impairment of critical services.</span>
                        </div>
                        <div class="pm-inc-step">
                            <i class="fa-solid fa-users"></i>
                            <span data-lang-de><strong>Nutzerbetroffenheit</strong> — Anzahl und Umfang betroffener Nutzer.</span>
                            <span data-lang-en style="display:none;"><strong>User impact</strong> — number and extent of affected users.</span>
                        </div>
                        <div class="pm-inc-step">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <span data-lang-de><strong>Erheblich</strong> — wenn kritische Dienste beeinträchtigt und Vertraulichkeit, Integrität oder Verfügbarkeit substanziell gefährdet sind.</span>
                            <span data-lang-en style="display:none;"><strong>Significant</strong> — if critical services are impaired and confidentiality, integrity, or availability are substantially threatened.</span>
                        </div>
                    </div>
                </div>
                `
            }
        ]
    },

    links: {
        titleDe: 'Weiterführende Ressourcen',
        titleEn: 'Further Resources',
        items: [
            { icon: 'fa-book',          href: 'https://www.bsi.bund.de/DE/Themen/KRITIS-und-Regulierte-Unternehmen/Kritische-Infrastrukturen/kritische-infrastrukturen_node.html', target: '_blank', labelDe: 'BSI: Kritische Infrastrukturen', labelEn: 'BSI: Critical Infrastructures' },
            { icon: 'fa-globe',         href: 'https://www.bsi.bund.de/DE/Themen/NIS-2/nis-2_node.html', target: '_blank', labelDe: 'BSI: NIS-2', labelEn: 'BSI: NIS-2' },
            { icon: 'fa-scale-balanced', href: 'https://www.gesetze-im-internet.de/bsig_2021/', target: '_blank', labelDe: 'BSIG (Gesetzestext)', labelEn: 'BSIG (legal text)' },
            { icon: 'fa-file-lines',    href: 'https://eur-lex.europa.eu/eli/reg_impl/2024/2690/oj', target: '_blank', labelDe: 'Durchführungsverordnung (EU) 2024/2690', labelEn: 'Implementing Regulation (EU) 2024/2690' },
            { icon: 'fa-wikipedia-w',   href: 'https://de.wikipedia.org/wiki/NIS-2-Richtlinie', target: '_blank', labelDe: 'Wikipedia: NIS-2-Richtlinie', labelEn: 'Wikipedia: NIS-2 Directive' }
        ]
    },

    footer: {
        textDe: 'NIS2 & KRITIS · Datenschutz Teil 3.6',
        textEn: 'NIS2 & KRITIS · Data Protection Part 3.6'
    }
});