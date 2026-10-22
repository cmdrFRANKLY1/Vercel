// resources/topics/topic_routing.js
// Registers a topic covering dynamic/static routing and link-state/distance-vector algorithms.

registerTopic({
    id: 'Routing',
    icon: 'fa-route',
    titleDe: 'Routing',
    titleEn: 'Routing',
    descDe: 'Statisches und dynamisches Routing, Link-State- und Distance-Vector-Verfahren.',
    descEn: 'Static and dynamic routing, link-state and distance-vector algorithms.',

    sidebarTitleDe: 'Routing',
    sidebarTitleEn: 'Routing',
    sidebarSubtitleDe: 'Wege durch das Netzwerk finden',
    sidebarSubtitleEn: 'Finding paths through the network',
    sidebarVersion: 'v1.0',

    hero: {
        titleDe: 'Routing: Statisch, Dynamisch, Link-State und Distance-Vector',
        titleEn: 'Routing: Static, Dynamic, Link-State and Distance-Vector',
        introDe: 'Routing ist der Prozess, bei dem ein Router entscheidet, über welchen Pfad ein Paket sein Ziel erreicht. Man unterscheidet statisches Routing (manuell konfigurierte Routen) und dynamisches Routing (Router tauschen Informationen aus und berechnen Routen automatisch). Die beiden wichtigsten Familien dynamischer Routing-Protokolle sind <strong>Distance-Vector</strong> (z. B. RIP) und <strong>Link-State</strong> (z. B. OSPF).',
        introEn: 'Routing is the process by which a router decides which path a packet takes to reach its destination. A distinction is made between static routing (manually configured routes) and dynamic routing (routers exchange information and compute routes automatically). The two main families of dynamic routing protocols are <strong>Distance-Vector</strong> (e.g., RIP) and <strong>Link-State</strong> (e.g., OSPF).'
    },

    quickLinks: [
        { icon: 'fa-anchor',          href: '#section1',     switchToDoc: true, labelDe: 'Grundlagen',            labelEn: 'Basics' },
        { icon: 'fa-sitemap',         href: '#section2',     switchToDoc: true, labelDe: 'Statisch vs. Dynamisch', labelEn: 'Static vs. Dynamic' },
        { icon: 'fa-project-diagram', href: '#section3',     switchToDoc: true, labelDe: 'Distance-Vector',       labelEn: 'Distance-Vector' },
        { icon: 'fa-network-wired',   href: '#section4',     switchToDoc: true, labelDe: 'Link-State',            labelEn: 'Link-State' },
        { icon: 'fa-balance-scale',   href: '#section5',     switchToDoc: true, labelDe: 'Vergleich',             labelEn: 'Comparison' },
        { icon: 'fa-lightbulb',       href: '#tldr-summary', switchToDoc: true, labelDe: 'TLDR',                  labelEn: 'TLDR' }
    ],

    sections: [
        // ─────────────────────────────────────────────
        // 1. Basics
        // ─────────────────────────────────────────────
        {
            id: 'section1',
            titleDe: 'Grundlagen des Routings',
            titleEn: 'Routing Basics',
            introDe: 'Bevor wir statisches und dynamisches Routing vergleichen, klären wir die wichtigsten Begriffe: Routing-Tabelle, Metrik, Administrative Distanz und Forwarding.',
            introEn: 'Before comparing static and dynamic routing, let us clarify the key terms: routing table, metric, administrative distance, and forwarding.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Routing-Tabelle & Forwarding',
                    titleEn: 'Routing Table & Forwarding',
                    htmlDe: `
                    <p class="text-xs">Jeder Router führt eine <strong>Routing-Tabelle</strong>. Sie enthält Einträge der Form <em>Zielnetz → Next-Hop / Interface</em>. Beim Empfang eines Pakets sucht der Router die <strong>längste passende Präfixlänge</strong> (Longest Prefix Match) und leitet das Paket entsprechend weiter.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Feld</th><th>Bedeutung</th></tr>
                    <tr><td><strong>Zielnetz</strong></td><td class="text-[var(--text-muted)]">IP-Adresse und Präfixlänge, z. B. 10.0.0.0/8</td></tr>
                    <tr><td><strong>Next-Hop</strong></td><td class="text-[var(--text-muted)]">IP-Adresse des nächsten Routers</td></tr>
                    <tr><td><strong>Interface</strong></td><td class="text-[var(--text-muted)]">Ausgangsschnittstelle</td></tr>
                    <tr><td><strong>Metrik</strong></td><td class="text-[var(--text-muted)]">Kosten / Distanz zum Ziel</td></tr>
                    <tr><td><strong>Administrative Distanz</strong></td><td class="text-[var(--text-muted)]">Vertrauenswürdigkeit der Route (niedriger = besser)</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs">Every router maintains a <strong>routing table</strong>. It contains entries of the form <em>destination network → next hop / interface</em>. When a packet arrives, the router looks for the <strong>longest matching prefix</strong> and forwards the packet accordingly.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Field</th><th>Meaning</th></tr>
                    <tr><td><strong>Destination</strong></td><td class="text-[var(--text-muted)]">IP address and prefix length, e.g., 10.0.0.0/8</td></tr>
                    <tr><td><strong>Next Hop</strong></td><td class="text-[var(--text-muted)]">IP address of the next router</td></tr>
                    <tr><td><strong>Interface</strong></td><td class="text-[var(--text-muted)]">Outgoing interface</td></tr>
                    <tr><td><strong>Metric</strong></td><td class="text-[var(--text-muted)]">Cost / distance to destination</td></tr>
                    <tr><td><strong>Administrative Distance</strong></td><td class="text-[var(--text-muted)]">Trustworthiness of the route (lower = better)</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Metrik & Administrative Distanz',
                    titleEn: 'Metric & Administrative Distance',
                    htmlDe: `
                    <p class="text-xs">Die <strong>Metrik</strong> bewertet die Kosten eines Pfades innerhalb eines Routing-Protokolls. Die <strong>Administrative Distanz (AD)</strong> hingegen bewertet die Vertrauenswürdigkeit verschiedener Routing-Quellen. Beispielwerte:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Connected:</strong> AD 0</li>
                    <li><strong>Static:</strong> AD 1</li>
                    <li><strong>eBGP:</strong> AD 20</li>
                    <li><strong>OSPF:</strong> AD 110</li>
                    <li><strong>RIP:</strong> AD 120</li>
                    </ul>
                    <p class="text-xs mt-2">Bei konkurrierenden Routen zu einem Ziel gewinnt die Route mit der <strong>niedrigeren AD</strong>. Bei gleicher AD entscheidet die <strong>Metrik</strong>.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs">The <strong>metric</strong> evaluates the cost of a path within a routing protocol. The <strong>administrative distance (AD)</strong>, on the other hand, evaluates the trustworthiness of different routing sources. Example values:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Connected:</strong> AD 0</li>
                    <li><strong>Static:</strong> AD 1</li>
                    <li><strong>eBGP:</strong> AD 20</li>
                    <li><strong>OSPF:</strong> AD 110</li>
                    <li><strong>RIP:</strong> AD 120</li>
                    </ul>
                    <p class="text-xs mt-2">When routes to the same destination compete, the route with the <strong>lower AD</strong> wins. If AD is equal, the <strong>metric</strong> decides.</p>
                    `
                }
            ]
        },

        // ─────────────────────────────────────────────
        // 2. Static vs. Dynamic
        // ─────────────────────────────────────────────
        {
            id: 'section2',
            titleDe: 'Statisches vs. Dynamisches Routing',
            titleEn: 'Static vs. Dynamic Routing',
            introDe: 'Der grundlegende Unterschied liegt darin, wer die Routen bestimmt: der Administrator (statisch) oder die Router selbst über Protokolle (dynamisch).',
            introEn: 'The fundamental difference lies in who determines the routes: the administrator (static) or the routers themselves via protocols (dynamic).',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Statisches Routing',
                    titleEn: 'Static Routing',
                    htmlDe: `
                    <p class="text-xs">Bei statischem Routing werden Routen <strong>manuell</strong> konfiguriert. Sie ändern sich nicht, solange der Administrator sie nicht anpasst.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Vorteile:</strong> Keine CPU-/Bandbreitenlast durch Protokolle, volle Kontrolle, vorhersehbar, sicher.</li>
                    <li><strong>Nachteile:</strong> Keine automatische Anpassung bei Ausfällen, hoher Administrationsaufwand in großen Netzen.</li>
                    <li><strong>Einsatz:</strong> Kleine Netze, Stub-Netze, Default-Routen, Backup-Routen.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs">With static routing, routes are configured <strong>manually</strong>. They do not change unless the administrator adjusts them.</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Pros:</strong> No CPU/bandwidth load from protocols, full control, predictable, secure.</li>
                    <li><strong>Cons:</strong> No automatic adaptation to failures, high administrative effort in large networks.</li>
                    <li><strong>Use cases:</strong> Small networks, stub networks, default routes, backup routes.</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Dynamisches Routing',
                    titleEn: 'Dynamic Routing',
                    htmlDe: `
                    <p class="text-xs">Bei dynamischem Routing tauschen Router über <strong>Routing-Protokolle</strong> Informationen aus und berechnen ihre Routen selbst. Fällt eine Verbindung aus, wird automatisch ein alternativer Pfad gefunden (<em>Konvergenz</em>).</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Kriterium</th><th>Statisch</th><th>Dynamisch</th></tr>
                    <tr><td><strong>Konfiguration</strong></td><td class="text-[var(--text-muted)]">Manuell</td><td class="text-[var(--text-muted)]">Automatisch</td></tr>
                    <tr><td><strong>Reaktion auf Ausfall</strong></td><td class="text-[var(--text-muted)]">Keine</td><td class="text-[var(--text-muted)]">Automatische Neuberechnung</td></tr>
                    <tr><td><strong>Skalierbarkeit</strong></td><td class="text-[var(--text-muted)]">Gering</td><td class="text-[var(--text-muted)]">Hoch</td></tr>
                    <tr><td><strong>Ressourcenverbrauch</strong></td><td class="text-[var(--text-muted)]">Sehr gering</td><td class="text-[var(--text-muted)]">Höher (CPU, Bandbreite)</td></tr>
                    <tr><td><strong>Kontrolle</strong></td><td class="text-[var(--text-muted)]">Vollständig</td><td class="text-[var(--text-muted)]">Eingeschränkt</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs">With dynamic routing, routers exchange information via <strong>routing protocols</strong> and compute their routes themselves. If a link fails, an alternative path is found automatically (<em>convergence</em>).</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Criterion</th><th>Static</th><th>Dynamic</th></tr>
                    <tr><td><strong>Configuration</strong></td><td class="text-[var(--text-muted)]">Manual</td><td class="text-[var(--text-muted)]">Automatic</td></tr>
                    <tr><td><strong>Reaction to failure</strong></td><td class="text-[var(--text-muted)]">None</td><td class="text-[var(--text-muted)]">Automatic recomputation</td></tr>
                    <tr><td><strong>Scalability</strong></td><td class="text-[var(--text-muted)]">Low</td><td class="text-[var(--text-muted)]">High</td></tr>
                    <tr><td><strong>Resource usage</strong></td><td class="text-[var(--text-muted)]">Very low</td><td class="text-[var(--text-muted)]">Higher (CPU, bandwidth)</td></tr>
                    <tr><td><strong>Control</strong></td><td class="text-[var(--text-muted)]">Complete</td><td class="text-[var(--text-muted)]">Limited</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        // ─────────────────────────────────────────────
        // 3. Distance-Vector
        // ─────────────────────────────────────────────
        {
            id: 'section3',
            titleDe: 'Distance-Vector-Routing',
            titleEn: 'Distance-Vector Routing',
            introDe: 'Distance-Vector-Protokolle wie RIP arbeiten nach dem Prinzip „Routing by rumor“: Jeder Router kennt nur seine direkten Nachbarn und deren Entfernungen. Er teilt seine gesamte Routing-Tabelle periodisch mit den Nachbarn.',
            introEn: 'Distance-vector protocols such as RIP work on the principle of "routing by rumor": each router knows only its direct neighbors and their distances. It periodically shares its entire routing table with its neighbors.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Grundprinzip & Bellman-Ford',
                    titleEn: 'Basic Principle & Bellman-Ford',
                    htmlDe: `
                    <p class="text-xs">Jeder Router führt eine Tabelle mit <em>Ziel → Kosten</em>. Er sendet diese Tabelle regelmäßig an alle Nachbarn. Ein Nachbar aktualisiert seine Einträge nach der <strong>Bellman-Ford-Gleichung</strong>:</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2" style="box-shadow: var(--control-shadow);">
                    <p class="text-center font-mono text-sm">D(x, y) = min<sub>v</sub> { c(x, v) + D(v, y) }</p>
                    <p class="mt-2">Dabei ist <em>c(x, v)</em> die Kosten der direkten Verbindung von x zu Nachbar v und <em>D(v, y)</em> die vom Nachbarn gemeldete Distanz zum Ziel y.</p>
                    </div>
                    <p class="text-xs mt-2">Der Router übernimmt die Route mit den geringsten Gesamtkosten. Dieses Verfahren konvergiert, kann aber langsam sein und temporär zu Schleifen führen.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs">Each router maintains a table of <em>destination → cost</em>. It periodically sends this table to all neighbors. A neighbor updates its entries according to the <strong>Bellman-Ford equation</strong>:</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2" style="box-shadow: var(--control-shadow);">
                    <p class="text-center font-mono text-sm">D(x, y) = min<sub>v</sub> { c(x, v) + D(v, y) }</p>
                    <p class="mt-2">Here, <em>c(x, v)</em> is the cost of the direct link from x to neighbor v, and <em>D(v, y)</em> is the distance to destination y as reported by the neighbor.</p>
                    </div>
                    <p class="text-xs mt-2">The router adopts the route with the lowest total cost. This method converges but can be slow and may temporarily create loops.</p>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Probleme: Count-to-Infinity & Gegenmaßnahmen',
                    titleEn: 'Problems: Count-to-Infinity & Countermeasures',
                    htmlDe: `
                    <p class="text-xs">Ein klassisches Problem von Distance-Vector ist der <strong>Count-to-Infinity</strong>-Effekt: Fällt eine Verbindung aus, können sich die Kosten künstlich aufschaukeln, weil Router sich gegenseitig falsche Informationen weitergeben. Gegenmaßnahmen sind:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Split Horizon:</strong> Eine Route wird nicht über die Schnittstelle zurückgemeldet, über die sie gelernt wurde.</li>
                    <li><strong>Route Poisoning:</strong> Eine ausgefallene Route wird mit unendlichen Kosten (z. B. 16 bei RIP) angekündigt.</li>
                    <li><strong>Poison Reverse:</strong> Kombination aus Split Horizon und Route Poisoning.</li>
                    <li><strong>Triggered Updates:</strong> Sofortige Aktualisierung bei Änderungen statt periodischer Timer.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs">A classic problem of distance-vector is the <strong>count-to-infinity</strong> effect: when a link fails, costs can artificially escalate because routers pass incorrect information to each other. Countermeasures include:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Split Horizon:</strong> A route is not advertised back out the interface through which it was learned.</li>
                    <li><strong>Route Poisoning:</strong> A failed route is advertised with infinite cost (e.g., 16 in RIP).</li>
                    <li><strong>Poison Reverse:</strong> Combination of split horizon and route poisoning.</li>
                    <li><strong>Triggered Updates:</strong> Immediate update on changes instead of periodic timers.</li>
                    </ul>
                    `
                }
            ]
        },

        // ─────────────────────────────────────────────
        // 4. Link-State
        // ─────────────────────────────────────────────
        {
            id: 'section4',
            titleDe: 'Link-State-Routing',
            titleEn: 'Link-State Routing',
            introDe: 'Link-State-Protokolle wie OSPF oder IS-IS arbeiten nach dem Prinzip „Jeder kennt das ganze Netz“: Jeder Router sammelt Informationen über alle Verbindungen und berechnet daraus mit dem Dijkstra-Algorithmus die kürzesten Pfade.',
            introEn: 'Link-state protocols such as OSPF or IS-IS work on the principle of "everyone knows the whole network": each router collects information about all links and uses Dijkstra\'s algorithm to compute the shortest paths.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Grundprinzip & Dijkstra',
                    titleEn: 'Basic Principle & Dijkstra',
                    htmlDe: `
                    <p class="text-xs">Jeder Router erzeugt <strong>Link-State-Advertisements (LSAs)</strong>, die seine direkten Verbindungen und deren Kosten beschreiben. Diese LSAs werden im gesamten Netz geflutet (<em>flooding</em>). So erhält jeder Router eine identische <strong>Link-State-Datenbank (LSDB)</strong>.</p>
                    <p class="text-xs mt-2">Auf Basis der LSDB berechnet jeder Router unabhängig den kürzesten Pfadbaum zu allen Zielen mit dem <strong>Dijkstra-Algorithmus</strong> (Shortest Path First).</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Vorteile:</strong> Schnelle Konvergenz, keine Schleifen, jeder Router hat vollständige Topologie-Sicht.</li>
                    <li><strong>Nachteile:</strong> Höherer Speicher- und CPU-Bedarf, komplexere Implementierung, Flutungsaufwand.</li>
                    <li><strong>Beispiele:</strong> OSPF (IP), IS-IS (IP), OLSR (Ad-hoc).</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs">Each router generates <strong>link-state advertisements (LSAs)</strong> describing its direct links and their costs. These LSAs are flooded throughout the network. This way, every router obtains an identical <strong>link-state database (LSDB)</strong>.</p>
                    <p class="text-xs mt-2">Based on the LSDB, each router independently computes the shortest path tree to all destinations using <strong>Dijkstra's algorithm</strong> (shortest path first).</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-2" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Pros:</strong> Fast convergence, loop-free, every router has a complete topology view.</li>
                    <li><strong>Cons:</strong> Higher memory and CPU requirements, more complex implementation, flooding overhead.</li>
                    <li><strong>Examples:</strong> OSPF (IP), IS-IS (IP), OLSR (ad-hoc).</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Hierarchie & Areas (OSPF)',
                    titleEn: 'Hierarchy & Areas (OSPF)',
                    htmlDe: `
                    <p class="text-xs">Um die Flutung zu begrenzen, wird ein Link-State-Netz in <strong>Areas</strong> unterteilt. OSPF verwendet Area 0 (Backbone) als Kern. Router innerhalb einer Area kennen nur die Topologie ihrer Area; Details anderer Areas werden über <strong>Area Border Router (ABR)</strong> zusammengefasst.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Rolle</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Internal Router</strong></td><td class="text-[var(--text-muted)]">Alle Interfaces in einer Area</td></tr>
                    <tr><td><strong>Area Border Router (ABR)</strong></td><td class="text-[var(--text-muted)]">Verbindet mehrere Areas mit Area 0</td></tr>
                    <tr><td><strong>Backbone Router</strong></td><td class="text-[var(--text-muted)]">Mindestens ein Interface in Area 0</td></tr>
                    <tr><td><strong>AS Boundary Router (ASBR)</strong></td><td class="text-[var(--text-muted)]">Verbindet OSPF mit anderen AS (z. B. BGP)</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs">To limit flooding, a link-state network is divided into <strong>areas</strong>. OSPF uses Area 0 (backbone) as the core. Routers within an area only know their area's topology; details of other areas are summarized via <strong>Area Border Routers (ABRs)</strong>.</p>
                    <div class="overflow-x-auto w-full mt-2">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Role</th><th>Description</th></tr>
                    <tr><td><strong>Internal Router</strong></td><td class="text-[var(--text-muted)]">All interfaces in one area</td></tr>
                    <tr><td><strong>Area Border Router (ABR)</strong></td><td class="text-[var(--text-muted)]">Connects multiple areas to Area 0</td></tr>
                    <tr><td><strong>Backbone Router</strong></td><td class="text-[var(--text-muted)]">At least one interface in Area 0</td></tr>
                    <tr><td><strong>AS Boundary Router (ASBR)</strong></td><td class="text-[var(--text-muted)]">Connects OSPF to other AS (e.g., BGP)</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        // ─────────────────────────────────────────────
        // 5. Comparison
        // ─────────────────────────────────────────────
        {
            id: 'section5',
            titleDe: 'Vergleich: Distance-Vector vs. Link-State',
            titleEn: 'Comparison: Distance-Vector vs. Link-State',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Gegenüberstellung',
                    titleEn: 'Side-by-Side',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/4">Aspekt</th>
                    <th>Distance-Vector</th>
                    <th>Link-State</th>
                    </tr>
                    <tr>
                    <td><strong>Informationsbasis</strong></td>
                    <td class="text-[var(--text-muted)]">Nur Nachbarn („Routing by rumor“)</td>
                    <td class="text-[var(--text-muted)]">Vollständige Topologie (LSDB)</td>
                    </tr>
                    <tr>
                    <td><strong>Austausch</strong></td>
                    <td class="text-[var(--text-muted)]">Gesamte Routing-Tabelle an Nachbarn</td>
                    <td class="text-[var(--text-muted)]">LSAs werden geflutet</td>
                    </tr>
                    <tr>
                    <td><strong>Algorithmus</strong></td>
                    <td class="text-[var(--text-muted)]">Bellman-Ford (verteilt)</td>
                    <td class="text-[var(--text-muted)]">Dijkstra (lokal)</td>
                    </tr>
                    <tr>
                    <td><strong>Konvergenz</strong></td>
                    <td class="text-[var(--text-muted)]">Langsam, schleifenanfällig</td>
                    <td class="text-[var(--text-muted)]">Schnell, schleifenfrei</td>
                    </tr>
                    <tr>
                    <td><strong>Ressourcen</strong></td>
                    <td class="text-[var(--text-muted)]">Gering</td>
                    <td class="text-[var(--text-muted)]">Höher (Speicher, CPU)</td>
                    </tr>
                    <tr>
                    <td><strong>Skalierbarkeit</strong></td>
                    <td class="text-[var(--text-muted)]">Begrenzt</td>
                    <td class="text-[var(--text-muted)]">Gut durch Hierarchie (Areas)</td>
                    </tr>
                    <tr>
                    <td><strong>Beispiele</strong></td>
                    <td class="text-[var(--text-muted)]">RIP, IGRP, EIGRP (hybrid)</td>
                    <td class="text-[var(--text-muted)]">OSPF, IS-IS</td>
                    </tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr>
                    <th class="w-1/4">Aspect</th>
                    <th>Distance-Vector</th>
                    <th>Link-State</th>
                    </tr>
                    <tr>
                    <td><strong>Information base</strong></td>
                    <td class="text-[var(--text-muted)]">Neighbors only ("routing by rumor")</td>
                    <td class="text-[var(--text-muted)]">Complete topology (LSDB)</td>
                    </tr>
                    <tr>
                    <td><strong>Exchange</strong></td>
                    <td class="text-[var(--text-muted)]">Entire routing table to neighbors</td>
                    <td class="text-[var(--text-muted)]">LSAs are flooded</td>
                    </tr>
                    <tr>
                    <td><strong>Algorithm</strong></td>
                    <td class="text-[var(--text-muted)]">Bellman-Ford (distributed)</td>
                    <td class="text-[var(--text-muted)]">Dijkstra (local)</td>
                    </tr>
                    <tr>
                    <td><strong>Convergence</strong></td>
                    <td class="text-[var(--text-muted)]">Slow, prone to loops</td>
                    <td class="text-[var(--text-muted)]">Fast, loop-free</td>
                    </tr>
                    <tr>
                    <td><strong>Resources</strong></td>
                    <td class="text-[var(--text-muted)]">Low</td>
                    <td class="text-[var(--text-muted)]">Higher (memory, CPU)</td>
                    </tr>
                    <tr>
                    <td><strong>Scalability</strong></td>
                    <td class="text-[var(--text-muted)]">Limited</td>
                    <td class="text-[var(--text-muted)]">Good through hierarchy (areas)</td>
                    </tr>
                    <tr>
                    <td><strong>Examples</strong></td>
                    <td class="text-[var(--text-muted)]">RIP, IGRP, EIGRP (hybrid)</td>
                    <td class="text-[var(--text-muted)]">OSPF, IS-IS</td>
                    </tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        // ─────────────────────────────────────────────
        // TLDR
        // ─────────────────────────────────────────────
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten Punkte zu Routing, statisch/dynamisch sowie Distance-Vector und Link-State in Kurzform.',
            introEn: 'The key points on routing, static/dynamic, and distance-vector vs. link-state in brief.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-anchor opacity-70"></i>
                                <span>1. Routing-Grundlagen</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Router nutzen die Routing-Tabelle mit Longest-Prefix-Match. Metrik = Kosten im Protokoll, Administrative Distanz = Vertrauen zwischen Quellen.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-sitemap opacity-70"></i>
                                <span>2. Statisch vs. Dynamisch</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Statisch: manuell, vorhersehbar, aber nicht skalierbar. Dynamisch: automatisch, skalierbar, aber ressourcenintensiver und komplexer.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-project-diagram opacity-70"></i>
                                <span>3. Distance-Vector</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Jeder kennt nur Nachbarn. Bellman-Ford, periodische Updates, anfällig für Count-to-Infinity. Maßnahmen: Split Horizon, Poison Reverse. Beispiel: RIP.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-network-wired opacity-70"></i>
                                <span>4. Link-State</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Jeder kennt die ganze Topologie (LSDB). LSAs fluten, Dijkstra berechnet kürzeste Pfade. Schnelle Konvergenz, schleifenfrei. Beispiel: OSPF.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-anchor opacity-70"></i>
                                <span>1. Routing Basics</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Routers use the routing table with longest prefix match. Metric = cost within a protocol, administrative distance = trust between sources.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-sitemap opacity-70"></i>
                                <span>2. Static vs. Dynamic</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Static: manual, predictable, but not scalable. Dynamic: automatic, scalable, but more resource-intensive and complex.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-project-diagram opacity-70"></i>
                                <span>3. Distance-Vector</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Each router knows only neighbors. Bellman-Ford, periodic updates, prone to count-to-infinity. Countermeasures: split horizon, poison reverse. Example: RIP.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-network-wired opacity-70"></i>
                                <span>4. Link-State</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Each router knows the full topology (LSDB). LSAs flood, Dijkstra computes shortest paths. Fast convergence, loop-free. Example: OSPF.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    // ═════════════════════════════════════════════════════════════
    // ILLUSTRATIONS — Topic-specific routing animations
    // Each animation has a `renderer` field telling the engine which
    // drawing function to invoke from window.RoutingIllustrations.
    // ═════════════════════════════════════════════════════════════
    illustrations: {
        titleDe: 'Routing-Illustrationen',
        titleEn: 'Routing Illustrations',
        introDe: 'Interaktive Animationen, die zeigen, wie Pakete weitergeleitet werden, wie statisches und dynamisches Routing auf Ausfälle reagieren, wie Distance-Vector konvergiert, wie Link-State flutet und wie Dijkstra den kürzesten Pfad berechnet.',
        introEn: 'Interactive animations showing how packets are forwarded, how static and dynamic routing react to failures, how distance-vector converges, how link-state floods, and how Dijkstra computes the shortest path.',

        animations: [
            // ─────────────────────────────────────────────
            // 1. Packet Flow
            // ─────────────────────────────────────────────
            {
                id: 'illustration-packet-flow',
                type: 'packet-flow',
                renderer: 'renderPacketFlow',
                titleDe: 'Paketfluss durch ein Netz',
                titleEn: 'Packet Flow Through a Network',
                descDe: 'Ein Paket wird von Host A über mehrere Router zu Host B gesendet. Bei jedem Router wird die Routing-Tabelle konsultiert (Longest Prefix Match) und das Paket an den nächsten Hop weitergeleitet.',
                descEn: 'A packet is sent from Host A through several routers to Host B. At each router, the routing table is consulted (longest prefix match) and the packet is forwarded to the next hop.',
                config: {
                    nodes: [
                        { id: 'HostA', x: 60,  y: 160, icon: 'fa-desktop', label: 'Host A',   color: 'blue'  },
                        { id: 'R1',    x: 200, y: 160, icon: 'fa-router',  label: 'Router 1', color: 'green' },
                        { id: 'R2',    x: 340, y: 160, icon: 'fa-router',  label: 'Router 2', color: 'green' },
                        { id: 'R3',    x: 480, y: 160, icon: 'fa-router',  label: 'Router 3', color: 'green' },
                        { id: 'HostB', x: 620, y: 160, icon: 'fa-server',  label: 'Host B',   color: 'blue'  }
                    ],
                    links: [
                        { from: 'HostA', to: 'R1' },
                        { from: 'R1',    to: 'R2' },
                        { from: 'R2',    to: 'R3' },
                        { from: 'R3',    to: 'HostB' }
                    ],
                    routingTables: {
                        R1: [
                            { dest: '10.0.0.0/8', nextHop: 'HostA (direct)', metric: 0, active: false },
                            { dest: '20.0.0.0/8', nextHop: 'R2',             metric: 1, active: true  },
                            { dest: '30.0.0.0/8', nextHop: 'R2',             metric: 2, active: false },
                            { dest: '0.0.0.0/0',  nextHop: 'R2',             metric: 3, active: false }
                        ],
                        R2: [
                            { dest: '10.0.0.0/8', nextHop: 'R1',             metric: 1, active: false },
                            { dest: '20.0.0.0/8', nextHop: 'R1',             metric: 0, active: false },
                            { dest: '30.0.0.0/8', nextHop: 'R3',             metric: 1, active: true  },
                            { dest: '0.0.0.0/0',  nextHop: 'R3',             metric: 2, active: false }
                        ],
                        R3: [
                            { dest: '10.0.0.0/8', nextHop: 'R2',             metric: 2, active: false },
                            { dest: '20.0.0.0/8', nextHop: 'R2',             metric: 1, active: false },
                            { dest: '30.0.0.0/8', nextHop: 'HostB (direct)', metric: 0, active: true  },
                            { dest: '0.0.0.0/0',  nextHop: 'HostB',          metric: 1, active: false }
                        ]
                    },
                    packetLabel: 'ICMP Echo Request',
                    speed: 2000
                }
            },

            // ─────────────────────────────────────────────
            // 2. Static Routing — failure, no reaction
            // ─────────────────────────────────────────────
            {
                id: 'illustration-static-failure',
                type: 'static-vs-dynamic',
                variant: 'static',
                renderer: 'renderStaticVsDynamic',
                titleDe: 'Statisches Routing: Ausfall ohne Reaktion',
                titleEn: 'Static Routing: Failure Without Reaction',
                descDe: 'In diesem Netz sind alle Routen manuell konfiguriert. Der Router R1 hat eine statische Route zu Netz C über R2. Fällt die Verbindung R2–R3 aus, bleibt die statische Route bestehen, weil sie nicht automatisch angepasst wird. Das Paket wird ins Leere geleitet und geht verloren — der Administrator muss manuell eingreifen.',
                descEn: 'In this network, all routes are manually configured. Router R1 has a static route to network C via R2. If the link R2–R3 fails, the static route remains because it is not automatically adjusted. The packet is sent into a black hole and is lost — the administrator must intervene manually.',
                config: {
                    nodes: [
                        { id: 'HostA', x: 60,  y: 160, icon: 'fa-desktop', label: 'Host A', color: 'blue'  },
                        { id: 'R1',    x: 200, y: 160, icon: 'fa-router',  label: 'R1',     color: 'green' },
                        { id: 'R2',    x: 360, y: 60,  icon: 'fa-router',  label: 'R2',     color: 'green' },
                        { id: 'R4',    x: 360, y: 260, icon: 'fa-router',  label: 'R4',     color: 'green' },
                        { id: 'R3',    x: 520, y: 160, icon: 'fa-router',  label: 'R3',     color: 'green' },
                        { id: 'HostB', x: 660, y: 160, icon: 'fa-server',  label: 'Host B', color: 'blue'  }
                    ],
                    links: [
                        { from: 'HostA', to: 'R1',    status: 'up' },
                        { from: 'R1',    to: 'R2',    status: 'up' },
                        { from: 'R1',    to: 'R4',    status: 'up' },
                        { from: 'R2',    to: 'R3',    status: 'up' },
                        { from: 'R4',    to: 'R3',    status: 'up' },
                        { from: 'R3',    to: 'HostB', status: 'up' }
                    ],
                    staticRoute: {
                        router: 'R1',
                        entry:        { dest: 'Net C (Host B)', nextHop: 'R2', metric: '—', type: 'static' },
                        afterFailure: { dest: 'Net C (Host B)', nextHop: 'R2', metric: '—', type: 'static', note: 'unchanged!' }
                    },
                    phases: [
                        {
                            phase: 1,
                            labelDe: 'Normalbetrieb',
                            labelEn: 'Normal operation',
                            descriptionDe: 'R1 leitet Pakete an R2 weiter (statische Route). R2 gibt sie an R3 weiter.',
                            descriptionEn: 'R1 forwards packets to R2 (static route). R2 passes them to R3.',
                            path: ['HostA', 'R1', 'R2', 'R3', 'HostB'],
                            linkStates: { 'R2-R3': 'up' },
                            packetStatus: 'delivered'
                        },
                        {
                            phase: 2,
                            labelDe: 'Ausfall der Verbindung R2–R3',
                            labelEn: 'Failure of link R2–R3',
                            descriptionDe: 'Die Verbindung R2–R3 fällt aus. Es gäbe einen alternativen Pfad über R4, aber die statische Route auf R1 kennt ihn nicht.',
                            descriptionEn: 'The link R2–R3 fails. An alternative path via R4 exists, but the static route on R1 does not know it.',
                            linkStates: { 'R2-R3': 'down', 'R4-R3': 'up' },
                            packetStatus: 'none'
                        },
                        {
                            phase: 3,
                            labelDe: 'Paketverlust (Blackhole)',
                            labelEn: 'Packet loss (black hole)',
                            descriptionDe: 'R1 sendet das Paket weiterhin an R2 (statische Route unverändert). R2 kann es nicht an R3 zustellen — das Paket geht verloren. Der Administrator muss die Route manuell ändern.',
                            descriptionEn: 'R1 still sends the packet to R2 (static route unchanged). R2 cannot deliver it to R3 — the packet is lost. The administrator must manually change the route.',
                            path: ['HostA', 'R1', 'R2'],
                            linkStates: { 'R2-R3': 'down', 'R4-R3': 'up' },
                            packetStatus: 'lost',
                            blackhole: 'R2'
                        }
                    ],
                    highlightAltPath: false,
                    packetLabel: 'Data',
                    speed: 2200
                }
            },

            // ─────────────────────────────────────────────
            // 3. Dynamic Routing — automatic reroute
            // ─────────────────────────────────────────────
            {
                id: 'illustration-dynamic-failure',
                type: 'static-vs-dynamic',
                variant: 'dynamic',
                renderer: 'renderStaticVsDynamic',
                titleDe: 'Dynamisches Routing: Automatische Umleitung',
                titleEn: 'Dynamic Routing: Automatic Reroute',
                descDe: 'Dasselbe Netz, aber mit einem dynamischen Routing-Protokoll (z. B. OSPF). Fällt die Verbindung R2–R3 aus, erkennen die Router dies über fehlende Hello-Pakete. R1 berechnet die Topologie neu und findet den alternativen Pfad über R4. Das Paket wird automatisch umgeleitet — ohne manuellen Eingriff.',
                descEn: 'The same network, but with a dynamic routing protocol (e.g., OSPF). If the link R2–R3 fails, the routers detect this via missing hello packets. R1 recomputes the topology and finds the alternative path via R4. The packet is rerouted automatically — without manual intervention.',
                config: {
                    nodes: [
                        { id: 'HostA', x: 60,  y: 160, icon: 'fa-desktop', label: 'Host A', color: 'blue'  },
                        { id: 'R1',    x: 200, y: 160, icon: 'fa-router',  label: 'R1',     color: 'green' },
                        { id: 'R2',    x: 360, y: 60,  icon: 'fa-router',  label: 'R2',     color: 'green' },
                        { id: 'R4',    x: 360, y: 260, icon: 'fa-router',  label: 'R4',     color: 'green' },
                        { id: 'R3',    x: 520, y: 160, icon: 'fa-router',  label: 'R3',     color: 'green' },
                        { id: 'HostB', x: 660, y: 160, icon: 'fa-server',  label: 'Host B', color: 'blue'  }
                    ],
                    links: [
                        { from: 'HostA', to: 'R1',    status: 'up' },
                        { from: 'R1',    to: 'R2',    status: 'up' },
                        { from: 'R1',    to: 'R4',    status: 'up' },
                        { from: 'R2',    to: 'R3',    status: 'up' },
                        { from: 'R4',    to: 'R3',    status: 'up' },
                        { from: 'R3',    to: 'HostB', status: 'up' }
                    ],
                    staticRoute: {
                        router: 'R1',
                        entry: { dest: 'Net C (Host B)', nextHop: 'R2 (OSPF)', metric: '2', type: 'OSPF' }
                    },
                    helloTimer: {
                        intervalMs: 1000,
                        missedHellosBeforeFailure: 3,
                        descriptionDe: 'Router senden periodisch Hello-Pakete. Bleiben sie aus, gilt der Nachbar als ausgefallen.',
                        descriptionEn: 'Routers periodically send hello packets. If they stop, the neighbor is considered down.'
                    },
                    phases: [
                        {
                            phase: 1,
                            labelDe: 'Normalbetrieb',
                            labelEn: 'Normal operation',
                            descriptionDe: 'R1 nutzt die dynamisch gelernte Route über R2 (Kosten 2). Hello-Pakete laufen regelmäßig.',
                            descriptionEn: 'R1 uses the dynamically learned route via R2 (cost 2). Hello packets flow regularly.',
                            path: ['HostA', 'R1', 'R2', 'R3', 'HostB'],
                            linkStates: { 'R2-R3': 'up' },
                            routeUsed: 'via R2',
                            packetStatus: 'delivered',
                            helloPackets: true
                        },
                        {
                            phase: 2,
                            labelDe: 'Ausfall erkannt',
                            labelEn: 'Failure detected',
                            descriptionDe: 'Die Verbindung R2–R3 fällt aus. Hello-Pakete bleiben aus. R1 und R4 erkennen den Ausfall nach 3 verpassten Hellos.',
                            descriptionEn: 'The link R2–R3 fails. Hello packets stop. R1 and R4 detect the failure after 3 missed hellos.',
                            linkStates: { 'R2-R3': 'down' },
                            helloPackets: false,
                            packetStatus: 'none'
                        },
                        {
                            phase: 3,
                            labelDe: 'Neuberechnung (Konvergenz)',
                            labelEn: 'Recomputation (convergence)',
                            descriptionDe: 'R1 berechnet die Topologie neu (Dijkstra). Die Route über R2 ist nicht mehr erreichbar; der alternative Pfad über R4 (Kosten 3) wird installiert.',
                            descriptionEn: 'R1 recomputes the topology (Dijkstra). The route via R2 is no longer reachable; the alternative path via R4 (cost 3) is installed.',
                            linkStates: { 'R2-R3': 'down', 'R4-R3': 'up' },
                            routeUsed: 'via R4',
                            packetStatus: 'none',
                            convergence: true
                        },
                        {
                            phase: 4,
                            labelDe: 'Automatische Umleitung',
                            labelEn: 'Automatic reroute',
                            descriptionDe: 'R1 leitet Pakete nun automatisch über R4 und R3 zum Ziel. Kein manueller Eingriff nötig — das Netz hat sich selbst geheilt.',
                            descriptionEn: 'R1 now automatically forwards packets via R4 and R3 to the destination. No manual intervention needed — the network has healed itself.',
                            path: ['HostA', 'R1', 'R4', 'R3', 'HostB'],
                            linkStates: { 'R2-R3': 'down', 'R4-R3': 'up' },
                            routeUsed: 'via R4',
                            packetStatus: 'delivered',
                            rerouted: true
                        }
                    ],
                    highlightAltPath: true,
                    packetLabel: 'Data',
                    speed: 2200
                }
            },

            // ─────────────────────────────────────────────
            // 4. Distance-Vector Convergence
            // ─────────────────────────────────────────────
            {
                id: 'illustration-distance-vector',
                type: 'distance-vector-convergence',
                renderer: 'renderDistanceVector',
                titleDe: 'Distance-Vector-Konvergenz',
                titleEn: 'Distance-Vector Convergence',
                descDe: 'Zeigt, wie Router in einem Distance-Vector-Netz (z. B. RIP) ihre Routing-Tabellen periodisch austauschen. Jeder Router sendet seine Distanzvektoren an die Nachbarn, die daraufhin ihre Tabellen nach Bellman-Ford aktualisieren. Die Animation zeigt mehrere Runden, bis das Netz konvergiert ist.',
                descEn: 'Shows how routers in a distance-vector network (e.g., RIP) periodically exchange their routing tables. Each router sends its distance vectors to its neighbors, which then update their tables according to Bellman-Ford. The animation shows several rounds until the network converges.',
                config: {
                    topology: 'diamond',
                    nodes: [
                        { id: 'A', x: 100, y: 160, label: 'A' },
                        { id: 'B', x: 300, y: 60,  label: 'B' },
                        { id: 'C', x: 300, y: 260, label: 'C' },
                        { id: 'D', x: 500, y: 160, label: 'D' }
                    ],
                    links: [
                        { from: 'A', to: 'B', cost: 1 },
                        { from: 'A', to: 'C', cost: 4 },
                        { from: 'B', to: 'D', cost: 2 },
                        { from: 'C', to: 'D', cost: 1 }
                    ],
                    destination: 'D',
                    rounds: [
                        {
                            round: 1,
                            descriptionDe: 'Initial: Jeder Router kennt nur seine direkten Nachbarn.',
                            descriptionEn: 'Initial: Each router knows only its direct neighbors.',
                            tables: {
                                A: { B: 1, C: 4, D: '∞' },
                                B: { A: 1, D: 2 },
                                C: { A: 4, D: 1 },
                                D: { B: 2, C: 1 }
                            },
                            messages: [
                                { from: 'B', to: 'A', payload: 'D=2' },
                                { from: 'C', to: 'A', payload: 'D=1' },
                                { from: 'A', to: 'B', payload: 'C=4' },
                                { from: 'D', to: 'B', payload: 'C=1' },
                                { from: 'A', to: 'C', payload: 'B=1' },
                                { from: 'D', to: 'C', payload: 'B=2' }
                            ]
                        },
                        {
                            round: 2,
                            descriptionDe: 'Update: A erfährt über B die Distanz zu D (1+2=3) und über C (4+1=5). A wählt den günstigeren Pfad über B.',
                            descriptionEn: 'Update: A learns via B the distance to D (1+2=3) and via C (4+1=5). A chooses the cheaper path via B.',
                            tables: {
                                A: { B: 1, C: 4, D: 3 },
                                B: { A: 1, D: 2, C: 3 },
                                C: { A: 4, D: 1, B: 3 },
                                D: { B: 2, C: 1, A: 3 }
                            },
                            messages: [
                                { from: 'A', to: 'B', payload: 'D=3' },
                                { from: 'A', to: 'C', payload: 'D=3' },
                                { from: 'B', to: 'A', payload: 'C=3' },
                                { from: 'C', to: 'A', payload: 'B=3' }
                            ]
                        },
                        {
                            round: 3,
                            descriptionDe: 'Konvergenz: Alle Router haben die optimalen Kosten zu allen Zielen. Keine weiteren Änderungen.',
                            descriptionEn: 'Convergence: All routers have optimal costs to all destinations. No further changes.',
                            tables: {
                                A: { B: 1, C: 3, D: 3 },
                                B: { A: 1, D: 2, C: 3 },
                                C: { A: 3, D: 1, B: 2 },
                                D: { B: 2, C: 1, A: 3 }
                            },
                            messages: []
                        }
                    ]
                }
            },

            // ─────────────────────────────────────────────
            // 5. Link-State Flooding
            // ─────────────────────────────────────────────
            {
                id: 'illustration-link-state-flooding',
                type: 'link-state-flooding',
                renderer: 'renderLinkStateFlooding',
                titleDe: 'Link-State-Flutung (LSA Flooding)',
                titleEn: 'Link-State Flooding (LSA Flooding)',
                descDe: 'Ein Router erzeugt ein Link-State Advertisement (LSA) und flutet es im gesamten Netz. Jeder Router leitet das LSA an alle Nachbarn weiter (außer dem, von dem er es empfangen hat). So erhalten alle Router eine identische Link-State-Datenbank (LSDB).',
                descEn: 'A router generates a Link-State Advertisement (LSA) and floods it throughout the network. Each router forwards the LSA to all neighbors (except the one it received it from). This way, all routers obtain an identical link-state database (LSDB).',
                config: {
                    topology: 'mesh',
                    nodes: [
                        { id: 'R1', x: 100, y: 160, label: 'R1', origin: true },
                        { id: 'R2', x: 280, y: 60,  label: 'R2' },
                        { id: 'R3', x: 280, y: 260, label: 'R3' },
                        { id: 'R4', x: 460, y: 60,  label: 'R4' },
                        { id: 'R5', x: 460, y: 260, label: 'R5' },
                        { id: 'R6', x: 640, y: 160, label: 'R6' }
                    ],
                    links: [
                        { from: 'R1', to: 'R2' },
                        { from: 'R1', to: 'R3' },
                        { from: 'R2', to: 'R3' },
                        { from: 'R2', to: 'R4' },
                        { from: 'R3', to: 'R5' },
                        { from: 'R4', to: 'R5' },
                        { from: 'R4', to: 'R6' },
                        { from: 'R5', to: 'R6' }
                    ],
                    originNode: 'R1',
                    lsaId: 'LSA-R1-001',
                    steps: [
                        { step: 1, from: 'R1', to: ['R2', 'R3'],     descriptionDe: 'R1 erzeugt LSA und sendet an alle direkten Nachbarn.',                                 descriptionEn: 'R1 generates LSA and sends to all direct neighbors.' },
                        { step: 2, from: 'R2', to: ['R3', 'R4'],     descriptionDe: 'R2 empfängt LSA, sendet an alle Nachbarn außer R1.',                                     descriptionEn: 'R2 receives LSA, sends to all neighbors except R1.' },
                        { step: 3, from: 'R3', to: ['R5'],           descriptionDe: 'R3 empfängt LSA, sendet an alle Nachbarn außer R1 und R2 (bereits versorgt).',            descriptionEn: 'R3 receives LSA, sends to all neighbors except R1 and R2 (already served).' },
                        { step: 4, from: 'R4', to: ['R5', 'R6'],     descriptionDe: 'R4 empfängt LSA, sendet an R5 und R6.',                                                  descriptionEn: 'R4 receives LSA, sends to R5 and R6.' },
                        { step: 5, from: 'R5', to: ['R6'],           descriptionDe: 'R5 empfängt LSA, sendet an R6.',                                                         descriptionEn: 'R5 receives LSA, sends to R6.' },
                        { step: 6, from: 'R6', to: [],               descriptionDe: 'R6 empfängt LSA. Flutung abgeschlossen — alle Router haben die LSDB.',                    descriptionEn: 'R6 receives LSA. Flooding complete — all routers have the LSDB.' }
                    ]
                }
            },

            // ─────────────────────────────────────────────
            // 6. Dijkstra Shortest Path
            // ─────────────────────────────────────────────
            {
                id: 'illustration-dijkstra',
                type: 'dijkstra-shortest-path',
                renderer: 'renderDijkstra',
                titleDe: 'Dijkstra: Kürzester Pfad',
                titleEn: 'Dijkstra: Shortest Path',
                descDe: 'Schrittweise Ausführung des Dijkstra-Algorithmus auf einem gewichteten Graphen. Beginnend beim Quellknoten werden die Distanzen zu allen anderen Knoten relaxiert, bis der kürzeste Pfadbaum entsteht. Die finale Route zum Zielknoten wird hervorgehoben.',
                descEn: 'Step-by-step execution of Dijkstra\'s algorithm on a weighted graph. Starting from the source node, distances to all other nodes are relaxed until the shortest path tree is built. The final route to the destination node is highlighted.',
                config: {
                    nodes: [
                        { id: 'A', x: 80,  y: 160, label: 'A (start)' },
                        { id: 'B', x: 240, y: 60,  label: 'B' },
                        { id: 'C', x: 240, y: 260, label: 'C' },
                        { id: 'D', x: 400, y: 160, label: 'D' },
                        { id: 'E', x: 560, y: 60,  label: 'E' },
                        { id: 'F', x: 560, y: 260, label: 'F (goal)' }
                    ],
                    links: [
                        { from: 'A', to: 'B', cost: 2 },
                        { from: 'A', to: 'C', cost: 5 },
                        { from: 'B', to: 'C', cost: 2 },
                        { from: 'B', to: 'D', cost: 4 },
                        { from: 'C', to: 'D', cost: 1 },
                        { from: 'D', to: 'E', cost: 3 },
                        { from: 'D', to: 'F', cost: 7 },
                        { from: 'E', to: 'F', cost: 2 }
                    ],
                    source: 'A',
                    target: 'F',
                    steps: [
                        {
                            step: 1,
                            visited: ['A'],
                            distances: { A: 0, B: 2, C: 5, D: '∞', E: '∞', F: '∞' },
                            highlight: ['A-B', 'A-C'],
                            descriptionDe: 'Start: A hat Distanz 0. Nachbarn B (2) und C (5) werden relaxiert.',
                            descriptionEn: 'Start: A has distance 0. Neighbors B (2) and C (5) are relaxed.'
                        },
                        {
                            step: 2,
                            visited: ['A', 'B'],
                            distances: { A: 0, B: 2, C: 4, D: 6, E: '∞', F: '∞' },
                            highlight: ['B-C', 'B-D'],
                            descriptionDe: 'B ist der nächste Knoten (2). C wird auf 4 verbessert (über B), D auf 6.',
                            descriptionEn: 'B is the next node (2). C is improved to 4 (via B), D to 6.'
                        },
                        {
                            step: 3,
                            visited: ['A', 'B', 'C'],
                            distances: { A: 0, B: 2, C: 4, D: 5, E: '∞', F: '∞' },
                            highlight: ['C-D'],
                            descriptionDe: 'C ist der nächste Knoten (4). D wird auf 5 verbessert (über C).',
                            descriptionEn: 'C is the next node (4). D is improved to 5 (via C).'
                        },
                        {
                            step: 4,
                            visited: ['A', 'B', 'C', 'D'],
                            distances: { A: 0, B: 2, C: 4, D: 5, E: 8, F: 12 },
                            highlight: ['D-E', 'D-F'],
                            descriptionDe: 'D ist der nächste Knoten (5). E wird auf 8, F auf 12 gesetzt.',
                            descriptionEn: 'D is the next node (5). E is set to 8, F to 12.'
                        },
                        {
                            step: 5,
                            visited: ['A', 'B', 'C', 'D', 'E'],
                            distances: { A: 0, B: 2, C: 4, D: 5, E: 8, F: 10 },
                            highlight: ['E-F'],
                            descriptionDe: 'E ist der nächste Knoten (8). F wird auf 10 verbessert (über E).',
                            descriptionEn: 'E is the next node (8). F is improved to 10 (via E).'
                        },
                        {
                            step: 6,
                            visited: ['A', 'B', 'C', 'D', 'E', 'F'],
                            distances: { A: 0, B: 2, C: 4, D: 5, E: 8, F: 10 },
                            highlight: ['A-B', 'B-C', 'C-D', 'D-E', 'E-F'],
                            finalPath: ['A', 'B', 'C', 'D', 'E', 'F'],
                            descriptionDe: 'Fertig! Kürzester Pfad: A → B → C → D → E → F mit Gesamtkosten 10.',
                            descriptionEn: 'Done! Shortest path: A → B → C → D → E → F with total cost 10.'
                        }
                    ]
                }
            }
        ]
    },

    links: {
        titleDe: 'Weiterführende Links',
        titleEn: 'Further Links',
        items: [
            { icon: 'fa-globe',         href: 'https://en.wikipedia.org/wiki/Routing', target: '_blank', labelDe: 'Routing (Wikipedia)', labelEn: 'Routing (Wikipedia)' },
            { icon: 'fa-link',          href: 'https://en.wikipedia.org/wiki/Distance-vector_routing_protocol', target: '_blank', labelDe: 'Distance-Vector (Wikipedia)', labelEn: 'Distance-Vector (Wikipedia)' },
            { icon: 'fa-external-link', href: 'https://en.wikipedia.org/wiki/Link-state_routing_protocol', target: '_blank', labelDe: 'Link-State (Wikipedia)', labelEn: 'Link-State (Wikipedia)' },
            { icon: 'fa-paperclip',     href: 'https://www.rfc-editor.org/rfc/rfc2453', target: '_blank', labelDe: 'RIP v2 (RFC 2453)', labelEn: 'RIP v2 (RFC 2453)' }
        ]
    },

    footer: {
        textDe: 'Routing Thema 2026',
        textEn: 'Routing Topic 2026'
    }
});
