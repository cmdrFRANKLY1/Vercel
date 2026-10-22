// resources/topics/topic_nat.js
// Registers a topic explaining Network Address Translation (NAT).
// Loaded via <script> injection.

registerTopic({
    id: 'NAT',
    parentId: 'Networks',
    // parentId: 'Networking', // Uncomment and set to nest under a parent topic

    icon: 'fa-right-left',
    titleDe: 'NAT (Network Address Translation)',
    titleEn: 'NAT (Network Address Translation)',
    descDe: 'Wie private IP-Adressen in öffentliche umgewandelt werden – Grundlagen, Arten und Funktionsweise.',
    descEn: 'How private IP addresses are translated into public ones – fundamentals, types, and operation.',

    // Sidebar header panel
    sidebarTitleDe: 'NAT',
    sidebarTitleEn: 'NAT',
    sidebarSubtitleDe: 'Network Address Translation',
    sidebarSubtitleEn: 'Network Address Translation',
    sidebarVersion: 'NAT v1.0',

    // Hero / intro panel at the top of the topic view
    hero: {
        titleDe: 'Network Address Translation (NAT)',
        titleEn: 'Network Address Translation (NAT)',
        introDe: 'NAT ist ein Verfahren in Computernetzen, bei dem IP-Adressen in Datenpaketen durch andere ersetzt werden. Es ermöglicht mehreren Geräten in einem privaten Netzwerk, über eine einzige öffentliche IP-Adresse auf das Internet zuzugreifen. Eine Einführung in verwandte Konzepte finden Sie unter <a href="#subsection4_1">Weiterführende Konzepte</a>.',
        introEn: 'NAT is a method in computer networks where IP addresses in data packets are replaced by other addresses. It allows multiple devices in a private network to access the internet through a single public IP address. An introduction to related concepts can be found under <a href="#subsection4_1">Related Concepts</a>.'
    },

    // Quick-links grid
    quickLinks: [
        { icon: 'fa-bookmark',            href: '#section1', switchToDoc: true, labelDe: 'Grundlagen', labelEn: 'Fundamentals' },
        { icon: 'fa-layer-group',         href: '#section2', switchToDoc: true, labelDe: 'NAT-Arten', labelEn: 'NAT Types' },
        { icon: 'fa-chart-pie',           href: '#section3', switchToDoc: true, labelDe: 'Funktionsweise', labelEn: 'Operation' },
        { icon: 'fa-external-link-alt',   href: 'https://en.wikipedia.org/wiki/Network_address_translation', target: '_blank', labelDe: 'Wikipedia', labelEn: 'Wikipedia' }
    ],

    // Content sections
    sections: [
        {
            id: 'section1',
            titleDe: 'Grundlagen von NAT',
            titleEn: 'Fundamentals of NAT',
            introDe: 'NAT wurde entwickelt, um den Mangel an öffentlichen IPv4-Adressen zu beheben. Es trennt private Netzwerke vom öffentlichen Internet, indem es die Quell- oder Ziel-IP-Adressen in IP-Paketen modifiziert.',
            introEn: 'NAT was developed to address the shortage of public IPv4 addresses. It separates private networks from the public internet by modifying the source or destination IP addresses in IP packets.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Warum NAT?',
                    titleEn: 'Why NAT?',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/3">Problem</th>
                    <th>Lösung durch NAT</th>
                    </tr>
                    <tr>
                    <td><strong>IPv4-Adressmangel</strong></td>
                    <td class="text-[var(--text-muted)]">Mehrere Geräte teilen sich eine öffentliche IP-Adresse.</td>
                    </tr>
                    <tr>
                    <td><strong>Sicherheit</strong></td>
                    <td class="text-[var(--text-muted)]">Interne Strukturen bleiben von außen verborgen.</td>
                    </tr>
                    <tr>
                    <td><strong>Flexibilität</strong></td>
                    <td class="text-[var(--text-muted)]">Internes Adressschema kann unabhängig vom ISP gewählt werden.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/3">Problem</th>
                    <th>Solution via NAT</th>
                    </tr>
                    <tr>
                    <td><strong>IPv4 address shortage</strong></td>
                    <td class="text-[var(--text-muted)]">Multiple devices share a single public IP address.</td>
                    </tr>
                    <tr>
                    <td><strong>Security</strong></td>
                    <td class="text-[var(--text-muted)]">Internal structures remain hidden from the outside.</td>
                    </tr>
                    <tr>
                    <td><strong>Flexibility</strong></td>
                    <td class="text-[var(--text-muted)]">Internal addressing scheme can be chosen independently of the ISP.</td>
                    </tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Private IP-Adressbereiche',
                    titleEn: 'Private IP Address Ranges',
                    htmlDe: `
                    <p class="text-xs">Die RFC 1918 definiert folgende private Adressbereiche, die typischerweise hinter NAT verwendet werden:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>10.0.0.0/8:</strong> 10.0.0.0 – 10.255.255.255</li>
                    <li><strong>172.16.0.0/12:</strong> 172.16.0.0 – 172.31.255.255</li>
                    <li><strong>192.168.0.0/16:</strong> 192.168.0.0 – 192.168.255.255</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs">RFC 1918 defines the following private address ranges typically used behind NAT:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>10.0.0.0/8:</strong> 10.0.0.0 – 10.255.255.255</li>
                    <li><strong>172.16.0.0/12:</strong> 172.16.0.0 – 172.31.255.255</li>
                    <li><strong>192.168.0.0/16:</strong> 192.168.0.0 – 192.168.255.255</li>
                    </ul>
                    `
                }
            ]
        },

        {
            id: 'section2',
            titleDe: 'NAT-Arten',
            titleEn: 'NAT Types',
            introDe: 'Es gibt verschiedene Varianten von NAT, die sich in Richtung, Anzahl der Adressen und Portbehandlung unterscheiden.',
            introEn: 'There are several variants of NAT that differ in direction, number of addresses, and port handling.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Statisches NAT',
                    titleEn: 'Static NAT',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Merkmal</th><th>Beschreibung</th></tr>
                    <tr>
                    <td><strong>Zuordnung</strong></td>
                    <td class="text-[var(--text-muted)]">1:1 – eine private IP wird dauerhaft einer öffentlichen IP zugeordnet.</td>
                    </tr>
                    <tr>
                    <td><strong>Verwendung</strong></td>
                    <td class="text-[var(--text-muted)]">Server, die von außen erreichbar sein müssen.</td>
                    </tr>
                    <tr>
                    <td><strong>Richtung</strong></td>
                    <td class="text-[var(--text-muted)]">Eingehend und ausgehend.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Feature</th><th>Description</th></tr>
                    <tr>
                    <td><strong>Mapping</strong></td>
                    <td class="text-[var(--text-muted)]">1:1 – one private IP is permanently mapped to one public IP.</td>
                    </tr>
                    <tr>
                    <td><strong>Use case</strong></td>
                    <td class="text-[var(--text-muted)]">Servers that need to be reachable from outside.</td>
                    </tr>
                    <tr>
                    <td><strong>Direction</strong></td>
                    <td class="text-[var(--text-muted)]">Inbound and outbound.</td>
                    </tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Dynamisches NAT',
                    titleEn: 'Dynamic NAT',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Pool:</strong> Eine Gruppe öffentlicher IP-Adressen wird definiert.</li>
                    <li><strong>Zuordnung:</strong> Private IPs erhalten bei Bedarf eine freie öffentliche IP aus dem Pool.</li>
                    <li><strong>Einschränkung:</strong> Die Anzahl gleichzeitiger Verbindungen ist durch die Poolgröße begrenzt.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Pool:</strong> A group of public IP addresses is defined.</li>
                    <li><strong>Mapping:</strong> Private IPs are assigned a free public IP from the pool on demand.</li>
                    <li><strong>Limitation:</strong> The number of simultaneous connections is limited by the pool size.</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection2_3',
                    titleDe: 'PAT / NAT Overload',
                    titleEn: 'PAT / NAT Overload',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Aspekt</th><th>Details</th></tr>
                    <tr>
                    <td><strong>Port Address Translation</strong></td>
                    <td class="text-[var(--text-muted)]">Viele private IPs teilen sich eine öffentliche IP; Unterscheidung erfolgt über Portnummern.</td>
                    </tr>
                    <tr>
                    <td><strong>Typisch</strong></td>
                    <td class="text-[var(--text-muted)]">Standard in Heimroutern und kleinen Büros.</td>
                    </tr>
                    <tr>
                    <td><strong>Skalierung</strong></td>
                    <td class="text-[var(--text-muted)]">Bis zu ~65.000 gleichzeitige Verbindungen pro öffentlicher IP.</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Aspect</th><th>Details</th></tr>
                    <tr>
                    <td><strong>Port Address Translation</strong></td>
                    <td class="text-[var(--text-muted)]">Many private IPs share one public IP; differentiation is done via port numbers.</td>
                    </tr>
                    <tr>
                    <td><strong>Typical</strong></td>
                    <td class="text-[var(--text-muted)]">Standard in home routers and small offices.</td>
                    </tr>
                    <tr>
                    <td><strong>Scaling</strong></td>
                    <td class="text-[var(--text-muted)]">Up to ~65,000 simultaneous connections per public IP.</td>
                    </tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section3',
            titleDe: 'Funktionsweise',
            titleEn: 'How It Works',
            introDe: 'NAT arbeitet transparent auf IP-Ebene. Der Router oder die Firewall führt eine Übersetzungstabelle, um Rückantworten korrekt zuzuordnen.',
            introEn: 'NAT operates transparently at the IP layer. The router or firewall maintains a translation table to correctly map return traffic.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Ablauf einer ausgehenden Verbindung',
                    titleEn: 'Outbound Connection Flow',
                    htmlDe: `
                    <ol class="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                    <li>Ein Client (192.168.1.10:12345) sendet ein Paket an einen Webserver (93.184.216.34:80).</li>
                    <li>Der NAT-Router ersetzt die Quell-IP durch seine öffentliche IP (203.0.113.5) und vergibt einen neuen Quellport (z.&nbsp;B. 54321).</li>
                    <li>Der Router speichert die Zuordnung: 192.168.1.10:12345 ↔ 203.0.113.5:54321.</li>
                    <li>Der Webserver antwortet an 203.0.113.5:54321.</li>
                    <li>Der Router schlägt die Zuordnung nach und leitet das Paket an 192.168.1.10:12345 weiter.</li>
                    </ol>
                    `,
                    htmlEn: `
                    <ol class="list-decimal pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                    <li>A client (192.168.1.10:12345) sends a packet to a web server (93.184.216.34:80).</li>
                    <li>The NAT router replaces the source IP with its public IP (203.0.113.5) and assigns a new source port (e.g., 54321).</li>
                    <li>The router stores the mapping: 192.168.1.10:12345 ↔ 203.0.113.5:54321.</li>
                    <li>The web server replies to 203.0.113.5:54321.</li>
                    <li>The router looks up the mapping and forwards the packet to 192.168.1.10:12345.</li>
                    </ol>
                    `
                }
            ]
        },

        {
            id: 'section4',
            titleDe: 'Weiterführende Konzepte',
            titleEn: 'Related Concepts',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Verwandte Themen',
                    titleEn: 'Related Topics',
                    htmlDe: `<p class="text-xs">NAT steht in engem Zusammenhang mit <a href="#subsection2_3">PAT</a>, Firewalls und der IPv6-Einführung. Bei IPv6 wird NAT seltener benötigt, da der Adressraum deutlich größer ist.</p>`,
                    htmlEn: `<p class="text-xs">NAT is closely related to <a href="#subsection2_3">PAT</a>, firewalls, and the adoption of IPv6. With IPv6, NAT is less necessary due to the vastly larger address space.</p>`
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
                    htmlDe: `<p class="text-xs">NAT ist eine Schlüsseltechnologie, die IPv4 bis heute am Leben hält. Es spart öffentliche Adressen, erhöht die Sicherheit und ist in fast jedem Heimnetzwerk im Einsatz. Gehen Sie nach <a href="#top">oben</a> für einen Neuanfang.</p>`,
                    htmlEn: `<p class="text-xs">NAT is a key technology that keeps IPv4 alive to this day. It conserves public addresses, enhances security, and is deployed in almost every home network. Go to the <a href="#top">top</a> for a fresh start.</p>`
                }
            ]
        },

        // --- TLDR TEMPLATE SECTION ---
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Eine kurze, einfache Zusammenfassung der NAT-Inhalte.',
            introEn: 'A short, easy summary of the NAT contents.',
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
                                <span>1. Was ist NAT?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                NAT übersetzt private IP-Adressen in öffentliche, damit viele Geräte eine einzige Internetverbindung nutzen können.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-layer-group opacity-70"></i>
                                <span>2. NAT-Arten</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Statisches NAT (1:1), dynamisches NAT (Pool) und PAT (Port-basiert, Standard im Heimrouter).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-shapes opacity-70"></i>
                                <span>3. Wie funktioniert es?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Der Router ersetzt Quell-IP und Port, speichert die Zuordnung in einer Tabelle und leitet Antworten korrekt zurück.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-puzzle-piece opacity-70"></i>
                                <span>4. Warum wichtig?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                NAT spart IPv4-Adressen, verbirgt interne Netzwerke und ist aus modernen Netzen nicht wegzudenken.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-cube opacity-70"></i>
                                <span>1. What is NAT?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                NAT translates private IP addresses to public ones, allowing many devices to share a single internet connection.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-layer-group opacity-70"></i>
                                <span>2. NAT Types</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Static NAT (1:1), dynamic NAT (pool), and PAT (port-based, standard in home routers).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-shapes opacity-70"></i>
                                <span>3. How does it work?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                The router replaces source IP and port, stores the mapping in a table, and forwards replies correctly.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-puzzle-piece opacity-70"></i>
                                <span>4. Why important?</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                NAT conserves IPv4 addresses, hides internal networks, and is indispensable in modern networking.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    // Static illustrations (replaces animated illustrations)
    illustrations: {
        titleDe: 'NAT Illustrationen',
        titleEn: 'NAT Illustrations',
        introDe: 'Statische Darstellungen zur Veranschaulichung der NAT-Funktionsweise.',
        introEn: 'Static illustrations to visualize how NAT works.',
        images: [
            {
                id: 'illustration-1',
                src: 'resources/images/nat-packet-flow.png',
                altDe: 'Paketfluss durch NAT',
                altEn: 'Packet Flow Through NAT',
                captionDe: 'Zeigt, wie ein Paket vom internen Client über den NAT-Router zum externen Server und zurück fließt, inklusive Adress- und Portübersetzung.',
                captionEn: 'Shows how a packet flows from an internal client through the NAT router to an external server and back, including address and port translation.'
            },
            {
                id: 'illustration-2',
                src: 'resources/images/nat-layers.png',
                altDe: 'NAT-Übersetzungsschichten',
                altEn: 'NAT Translation Layers',
                captionDe: 'Veranschaulicht die Schichten, auf denen NAT operiert: IP-Adresse, Port und die Zuordnungstabelle im Router.',
                captionEn: 'Illustrates the layers on which NAT operates: IP address, port, and the mapping table in the router.'
            }
        ]
    },

    // External links block
    links: {
        titleDe: 'NAT Links',
        titleEn: 'NAT Links',
        items: [
            { icon: 'fa-globe',         href: 'https://en.wikipedia.org/wiki/Network_address_translation', target: '_blank', labelDe: 'Wikipedia: NAT', labelEn: 'Wikipedia: NAT' },
            { icon: 'fa-link',          href: 'https://datatracker.ietf.org/doc/html/rfc1918', target: '_blank', labelDe: 'RFC 1918', labelEn: 'RFC 1918' },
            { icon: 'fa-external-link', href: 'https://datatracker.ietf.org/doc/html/rfc3022', target: '_blank', labelDe: 'RFC 3022', labelEn: 'RFC 3022' },
            { icon: 'fa-paperclip',     href: 'https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/26704-nat-faq-00.html', target: '_blank', labelDe: 'Cisco NAT FAQ', labelEn: 'Cisco NAT FAQ' }
        ]
    },

    footer: {
        textDe: 'NAT Thema 2026',
        textEn: 'NAT Topic 2026'
    }
});