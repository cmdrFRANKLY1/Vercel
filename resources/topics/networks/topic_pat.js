// resources/topics/topic_pat.js
// Registers a topic explaining Port Address Translation (PAT).
// Loaded via <script> injection.

registerTopic({
    id: 'PAT',
    // parentId: 'NAT', // Uncomment and set to nest under the NAT topic

    icon: 'fa-shuffle',
    titleDe: 'PAT (Port Address Translation)',
    titleEn: 'PAT (Port Address Translation)',
    descDe: 'Wie viele Geräte sich eine öffentliche IP-Adresse teilen – Port-basierte Übersetzung, Funktionsweise und Grenzen.',
    descEn: 'How many devices share a single public IP address – port-based translation, operation, and limits.',

    // Sidebar header panel
    sidebarTitleDe: 'PAT',
    sidebarTitleEn: 'PAT',
    sidebarSubtitleDe: 'Port Address Translation',
    sidebarSubtitleEn: 'Port Address Translation',
    sidebarVersion: 'PAT v1.0',

    // Hero / intro panel at the top of the topic view
    hero: {
        titleDe: 'Port Address Translation (PAT)',
        titleEn: 'Port Address Translation (PAT)',
        introDe: 'PAT, auch bekannt als NAT Overload, ist eine Variante von NAT, bei der mehrere private IP-Adressen über eine einzige öffentliche IP-Adresse kommunizieren. Die Unterscheidung erfolgt über eindeutige Portnummern. Eine Einführung in die Grundlagen finden Sie unter <a href="#subsection4_1">Verwandte Konzepte</a>.',
        introEn: 'PAT, also known as NAT Overload, is a variant of NAT in which multiple private IP addresses communicate through a single public IP address. Differentiation is achieved through unique port numbers. An introduction to the fundamentals can be found under <a href="#subsection4_1">Related Concepts</a>.'
    },

    // Quick-links grid
    quickLinks: [
        { icon: 'fa-bookmark',            href: '#section1', switchToDoc: true, labelDe: 'Grundlagen', labelEn: 'Fundamentals' },
        { icon: 'fa-layer-group',         href: '#section2', switchToDoc: true, labelDe: 'Funktionsweise', labelEn: 'Operation' },
        { icon: 'fa-chart-pie',           href: '#section3', switchToDoc: true, labelDe: 'Portbereiche', labelEn: 'Port Ranges' },
        { icon: 'fa-external-link-alt',   href: 'https://en.wikipedia.org/wiki/Network_address_translation#Port_address_translation', target: '_blank', labelDe: 'Wikipedia', labelEn: 'Wikipedia' }
    ],

    // Content sections
    sections: [
        {
            id: 'section1',
            titleDe: 'Grundlagen von PAT',
            titleEn: 'Fundamentals of PAT',
            introDe: 'PAT ist die praktisch bedeutsamste Form von NAT. Während klassisches NAT nur IP-Adressen übersetzt, bezieht PAT auch die Portnummern in die Übersetzung ein. Dadurch können tausende Geräte gleichzeitig über eine einzige öffentliche IPv4-Adresse kommunizieren.',
            introEn: 'PAT is the most practically significant form of NAT. While classic NAT only translates IP addresses, PAT also includes port numbers in the translation. This allows thousands of devices to communicate simultaneously through a single public IPv4 address.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Warum PAT?',
                    titleEn: 'Why PAT?',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/3">Problem</th>
                    <th>Lösung durch PAT</th>
                    </tr>
                    <tr>
                    <td><strong>IPv4-Adressknappheit</strong></td>
                    <td class="text-[var(--text-muted)]">Tausende Geräte teilen sich eine einzige öffentliche IP-Adresse.</td>
                    </tr>
                    <tr>
                    <td><strong>Kosteneinsparung</strong></td>
                    <td class="text-[var(--text-muted)]">ISPs müssen weniger öffentliche Adressen pro Kunde bereitstellen.</td>
                    </tr>
                    <tr>
                    <td><strong>Sicherheit</strong></td>
                    <td class="text-[var(--text-muted)]">Eingehende Verbindungen werden nur bei bestehender Zuordnung durchgelassen.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/3">Problem</th>
                    <th>Solution via PAT</th>
                    </tr>
                    <tr>
                    <td><strong>IPv4 address scarcity</strong></td>
                    <td class="text-[var(--text-muted)]">Thousands of devices share a single public IP address.</td>
                    </tr>
                    <tr>
                    <td><strong>Cost savings</strong></td>
                    <td class="text-[var(--text-muted)]">ISPs need to provide fewer public addresses per customer.</td>
                    </tr>
                    <tr>
                    <td><strong>Security</strong></td>
                    <td class="text-[var(--text-muted)]">Inbound connections are only allowed when a mapping exists.</td>
                    </tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'PAT vs. NAT',
                    titleEn: 'PAT vs. NAT',
                    htmlDe: `
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>NAT (statisch/dynamisch):</strong> Übersetzt nur IP-Adressen, 1:1 oder n:m Zuordnung ohne Portbetrachtung.</li>
                    <li><strong>PAT:</strong> Übersetzt zusätzlich die Portnummern und ermöglicht n:1 Zuordnung (viele private IPs → eine öffentliche IP).</li>
                    <li><strong>Beides zusammen:</strong> In der Praxis wird PAT fast immer gemeinsam mit NAT eingesetzt, weshalb die Begriffe oft synonym verwendet werden.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>NAT (static/dynamic):</strong> Translates only IP addresses, 1:1 or n:m mapping without port consideration.</li>
                    <li><strong>PAT:</strong> Additionally translates port numbers and enables n:1 mapping (many private IPs → one public IP).</li>
                    <li><strong>Together:</strong> In practice, PAT is almost always used together with NAT, which is why the terms are often used synonymously.</li>
                    </ul>
                    `
                }
            ]
        },

        {
            id: 'section2',
            titleDe: 'Funktionsweise',
            titleEn: 'How It Works',
            introDe: 'PAT arbeitet mit einer Übersetzungstabelle, die IP-Adresse und Portnummer kombiniert. Jede ausgehende Verbindung erhält einen eindeutigen Quellport, sodass Rückantworten korrekt zugeordnet werden können.',
            introEn: 'PAT uses a translation table that combines IP address and port number. Each outbound connection receives a unique source port so that return traffic can be correctly mapped.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Ablauf einer Verbindung',
                    titleEn: 'Connection Flow',
                    htmlDe: `
                    <ol class="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                    <li>Client A (192.168.1.10:12345) sendet eine Anfrage an einen Webserver (93.184.216.34:80).</li>
                    <li>Der PAT-Router ersetzt die Quell-IP durch seine öffentliche IP (203.0.113.5) und den Quellport durch einen freien Port (z.&nbsp;B. 50001).</li>
                    <li>Der Router speichert: 192.168.1.10:12345 ↔ 203.0.113.5:50001.</li>
                    <li>Client B (192.168.1.11:12345) sendet ebenfalls eine Anfrage – gleicher Quellport, aber andere private IP.</li>
                    <li>Der Router vergibt einen anderen öffentlichen Port (z.&nbsp;B. 50002) und speichert: 192.168.1.11:12345 ↔ 203.0.113.5:50002.</li>
                    <li>Antworten an 203.0.113.5:50001 gehen an Client A, Antworten an Port 50002 an Client B.</li>
                    </ol>
                    `,
                    htmlEn: `
                    <ol class="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                    <li>Client A (192.168.1.10:12345) sends a request to a web server (93.184.216.34:80).</li>
                    <li>The PAT router replaces the source IP with its public IP (203.0.113.5) and the source port with a free port (e.g., 50001).</li>
                    <li>The router stores: 192.168.1.10:12345 ↔ 203.0.113.5:50001.</li>
                    <li>Client B (192.168.1.11:12345) also sends a request – same source port but different private IP.</li>
                    <li>The router assigns a different public port (e.g., 50002) and stores: 192.168.1.11:12345 ↔ 203.0.113.5:50002.</li>
                    <li>Replies to 203.0.113.5:50001 go to Client A, replies to port 50002 go to Client B.</li>
                    </ol>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Die Übersetzungstabelle',
                    titleEn: 'The Translation Table',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Interne IP:Port</strong> – die ursprüngliche Quelle im privaten Netz.</li>
                    <li><strong>Externe IP:Port</strong> – die übersetzte Quelle im öffentlichen Netz.</li>
                    <li><strong>Ziel-IP:Port</strong> – der entfernte Kommunikationspartner.</li>
                    <li><strong>Timeout:</strong> Einträge werden nach Inaktivität entfernt (typisch 24&nbsp;h für TCP, 30–120&nbsp;s für UDP).</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Internal IP:Port</strong> – the original source in the private network.</li>
                    <li><strong>External IP:Port</strong> – the translated source in the public network.</li>
                    <li><strong>Destination IP:Port</strong> – the remote communication partner.</li>
                    <li><strong>Timeout:</strong> Entries are removed after inactivity (typically 24&nbsp;h for TCP, 30–120&nbsp;s for UDP).</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section3',
            titleDe: 'Portbereiche und Grenzen',
            titleEn: 'Port Ranges and Limits',
            introDe: 'PAT ist durch die verfügbaren Portnummern begrenzt. Ein Verständnis der Portbereiche hilft, Skalierungsgrenzen einzuschätzen.',
            introEn: 'PAT is limited by the available port numbers. Understanding port ranges helps assess scaling limits.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Portnummern im Überblick',
                    titleEn: 'Port Numbers Overview',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[25%]">Bereich</th><th class="w-[15%]">Größe</th><th>Verwendung</th></tr>
                    <tr>
                    <td><strong>0 – 1023</strong></td>
                    <td class="text-[var(--text-muted)]">1.024</td>
                    <td class="text-[var(--text-muted)]">Well-known Ports (Systemdienste, nur mit Root-Rechten bindbar).</td>
                    </tr>
                    <tr>
                    <td><strong>1024 – 49151</strong></td>
                    <td class="text-[var(--text-muted)]">48.128</td>
                    <td class="text-[var(--text-muted)]">Registered Ports (Anwendungen, Dienste).</td>
                    </tr>
                    <tr>
                    <td><strong>49152 – 65535</strong></td>
                    <td class="text-[var(--text-muted)]">16.384</td>
                    <td class="text-[var(--text-muted)]">Ephemeral / Dynamic Ports – hier vergibt PAT typischerweise seine Übersetzungsports.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[25%]">Range</th><th class="w-[15%]">Size</th><th>Usage</th></tr>
                    <tr>
                    <td><strong>0 – 1023</strong></td>
                    <td class="text-[var(--text-muted)]">1,024</td>
                    <td class="text-[var(--text-muted)]">Well-known ports (system services, bindable only with root privileges).</td>
                    </tr>
                    <tr>
                    <td><strong>1024 – 49151</strong></td>
                    <td class="text-[var(--text-muted)]">48,128</td>
                    <td class="text-[var(--text-muted)]">Registered ports (applications, services).</td>
                    </tr>
                    <tr>
                    <td><strong>49152 – 65535</strong></td>
                    <td class="text-[var(--text-muted)]">16,384</td>
                    <td class="text-[var(--text-muted)]">Ephemeral / dynamic ports – PAT typically assigns its translation ports here.</td>
                    </tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Skalierungsgrenzen',
                    titleEn: 'Scaling Limits',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Aspekt</th><th>Details</th></tr>
                    <tr>
                    <td><strong>Theoretisches Maximum</strong></td>
                    <td class="text-[var(--text-muted)]">Ca. 65.535 gleichzeitige Verbindungen pro öffentlicher IP-Adresse (begrenzt durch 16-Bit-Portfeld).</td>
                    </tr>
                    <tr>
                    <td><strong>Praktisches Maximum</strong></td>
                    <td class="text-[var(--text-muted)]">Deutlich niedriger, da Ports wiederverwendet werden müssen und das Betriebssystem Reservierungen vornimmt.</td>
                    </tr>
                    <tr>
                    <td><strong>Erweiterung</strong></td>
                    <td class="text-[var(--text-muted)]">Mehrere öffentliche IPs oder CGNAT (Carrier-Grade NAT) bei ISPs.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Aspect</th><th>Details</th></tr>
                    <tr>
                    <td><strong>Theoretical maximum</strong></td>
                    <td class="text-[var(--text-muted)]">Approx. 65,535 simultaneous connections per public IP address (limited by 16-bit port field).</td>
                    </tr>
                    <tr>
                    <td><strong>Practical maximum</strong></td>
                    <td class="text-[var(--text-muted)]">Significantly lower, as ports must be reused and the operating system makes reservations.</td>
                    </tr>
                    <tr>
                    <td><strong>Extension</strong></td>
                    <td class="text-[var(--text-muted)]">Multiple public IPs or CGNAT (Carrier-Grade NAT) at ISPs.</td>
                    </tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section4',
            titleDe: 'Verwandte Konzepte',
            titleEn: 'Related Concepts',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Weiterführende Themen',
                    titleEn: 'Further Topics',
                    htmlDe: `<p class="text-xs">PAT baut direkt auf <a href="#section1">NAT</a> auf und ist eng mit Firewalls, CGNAT und der Portweiterleitung (Port Forwarding) verwandt. Bei IPv6 entfällt PAT weitgehend, da jedes Gerät eine eigene globale Adresse erhalten kann.</p>`,
                    htmlEn: `<p class="text-xs">PAT builds directly on <a href="#section1">NAT</a> and is closely related to firewalls, CGNAT, and port forwarding. With IPv6, PAT is largely eliminated, as every device can receive its own global address.</p>`
                }
            ]
        },

        {
            id: 'section5',
            titleDe: 'Zusammenfassung',
            titleEn: 'Summary',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Fazit',
                    titleEn: 'Conclusion',
                    htmlDe: `<p class="text-xs">PAT ist die Technik, die das moderne Internet am Laufen hält: Millionen von Geräten teilen sich eine begrenzte Anzahl öffentlicher IPv4-Adressen. Ohne PAT wäre der Adressmangel längst kritisch geworden. Gehen Sie nach <a href="#top">oben</a> für einen Neuanfang.</p>`,
                    htmlEn: `<p class="text-xs">PAT is the technique that keeps the modern internet running: millions of devices share a limited number of public IPv4 addresses. Without PAT, the address shortage would have become critical long ago. Go to the <a href="#top">top</a> for a fresh start.</p>`
                }
            ]
        },

        // --- TLDR SECTION ---
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Eine kurze, einfache Zusammenfassung der PAT-Inhalte.',
            introEn: 'A short, easy summary of the PAT contents.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-cube opacity-70"></i>
                                <span>1. Was ist PAT?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                PAT (NAT Overload) übersetzt IP-Adressen UND Portnummern, damit viele Geräte eine öffentliche IP teilen können.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-layer-group opacity-70"></i>
                                <span>2. Wie funktioniert es?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Jede ausgehende Verbindung erhält einen eindeutigen Quellport. Der Router speichert die Zuordnung in einer Tabelle.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-shapes opacity-70"></i>
                                <span>3. Grenzen</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Maximal ca. 65.535 gleichzeitige Verbindungen pro öffentlicher IP – praktisch oft weniger. CGNAT erweitert die Kapazität.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-puzzle-piece opacity-70"></i>
                                <span>4. Warum wichtig?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                PAT ist der Grund, warum das IPv4-Internet trotz Adressmangels bis heute funktioniert.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-cube opacity-70"></i>
                                <span>1. What is PAT?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                PAT (NAT Overload) translates IP addresses AND port numbers so many devices can share one public IP.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-layer-group opacity-70"></i>
                                <span>2. How does it work?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Each outbound connection receives a unique source port. The router stores the mapping in a table.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-shapes opacity-70"></i>
                                <span>3. Limits</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Max. ~65,535 simultaneous connections per public IP – often less in practice. CGNAT extends capacity.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-puzzle-piece opacity-70"></i>
                                <span>4. Why important?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                PAT is the reason the IPv4 internet still works today despite the address shortage.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    // Static illustrations
    illustrations: {
        titleDe: 'PAT Illustrationen',
        titleEn: 'PAT Illustrations',
        introDe: 'Statische Darstellungen zur Veranschaulichung der PAT-Funktionsweise.',
        introEn: 'Static illustrations to visualize how PAT works.',
        images: [
            {
                id: 'illustration-1',
                src: 'resources/images/pat-translation-table.png',
                altDe: 'PAT-Übersetzungstabelle',
                altEn: 'PAT Translation Table',
                captionDe: 'Zeigt, wie mehrere private IP-Adressen mit gleichem Quellport über unterschiedliche öffentliche Ports einer einzigen öffentlichen IP-Adresse zugeordnet werden.',
                captionEn: 'Shows how multiple private IP addresses with the same source port are mapped to different public ports of a single public IP address.'
            },
            {
                id: 'illustration-2',
                src: 'resources/images/pat-port-ranges.png',
                altDe: 'Portbereiche für PAT',
                altEn: 'Port Ranges for PAT',
                captionDe: 'Veranschaulicht die drei Portbereiche (well-known, registered, ephemeral) und zeigt, dass PAT seine Übersetzungsports typischerweise aus dem ephemeral-Bereich bezieht.',
                captionEn: 'Illustrates the three port ranges (well-known, registered, ephemeral) and shows that PAT typically draws its translation ports from the ephemeral range.'
            }
        ]
    },

    // External links block
    links: {
        titleDe: 'PAT Links',
        titleEn: 'PAT Links',
        items: [
            { icon: 'fa-globe',         href: 'https://en.wikipedia.org/wiki/Network_address_translation#Port_address_translation', target: '_blank', labelDe: 'Wikipedia: PAT', labelEn: 'Wikipedia: PAT' },
            { icon: 'fa-link',          href: 'https://datatracker.ietf.org/doc/html/rfc3022', target: '_blank', labelDe: 'RFC 3022', labelEn: 'RFC 3022' },
            { icon: 'fa-external-link', href: 'https://datatracker.ietf.org/doc/html/rfc6888', target: '_blank', labelDe: 'RFC 6888 (CGNAT)', labelEn: 'RFC 6888 (CGNAT)' },
            { icon: 'fa-paperclip',     href: 'https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/26704-nat-faq-00.html', target: '_blank', labelDe: 'Cisco NAT FAQ', labelEn: 'Cisco NAT FAQ' }
        ]
    },

    footer: {
        textDe: 'PAT Thema 2026',
        textEn: 'PAT Topic 2026'
    }
});