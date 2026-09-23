// resources/topics/topic_internetprotocols.js

registerTopic({
    id: 'Internet Protocols',

    // ── SUB-CATEGORY ────────────────────────────────────────────
    parentId: 'IT',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-network-wired',
    titleDe: 'Internet-Protokolle',
    titleEn: 'Internet Protocols',
    descDe: 'Wie Daten wirklich durchs Netz wandern — von IP und TCP bis QUIC und HTTP/3.',
    descEn: 'How data actually travels across networks — from IP and TCP to QUIC and HTTP/3.',

    sidebarTitleDe: 'Internet-Protokolle',
    sidebarTitleEn: 'Internet Protocols',
    sidebarSubtitleDe: 'Moderner Netzwerk-Stack',
    sidebarSubtitleEn: 'Modern Network Stack',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'Internet-Protokolle',
        titleEn: 'Internet Protocols',
        introDe: 'Das Internet basiert auf einem geschichteten Protokoll-Stack. Jede Schicht löst ein klar umrissenes Problem — von der physikalischen Übertragung bis zur Anwendung. Was sich zuletzt bewegt hat: <strong>QUIC</strong> und <strong>HTTP/3</strong> verdrängen zunehmend klassisches TCP+TLS, <strong>TLS 1.3</strong> ist Standard, <strong>IPv6</strong> wächst stetig und <strong>DNS-over-HTTPS</strong> schützt Anfragen vor Mithörern. Diese Seite fasst zusammen, wie der Stack heute funktioniert und wo die Reise hingeht.',
        introEn: 'The Internet runs on a layered protocol stack. Each layer solves a well-defined problem — from physical transmission up to the application. What has shifted recently: <strong>QUIC</strong> and <strong>HTTP/3</strong> are displacing classic TCP+TLS, <strong>TLS 1.3</strong> is the default, <strong>IPv6</strong> keeps growing, and <strong>DNS-over-HTTPS</strong> protects queries from eavesdroppers. This page summarizes how the stack works today and where it is heading.'
    },

    quickLinks: [
        { icon: 'fa-layer-group',    href: '#section1', switchToDoc: true, labelDe: 'Schichten',       labelEn: 'Layers' },
        { icon: 'fa-diagram-project',href: '#section2', switchToDoc: true, labelDe: 'Kern-Protokolle', labelEn: 'Core Protocols' },
        { icon: 'fa-sitemap',        href: '#section3', switchToDoc: true, labelDe: 'IP & Subnetting', labelEn: 'IP & Subnetting' },
        { icon: 'fa-globe',          href: '#section4', switchToDoc: true, labelDe: 'Anwendungen',     labelEn: 'Applications' },
        { icon: 'fa-bolt',           href: '#section5', switchToDoc: true, labelDe: 'Modernes',        labelEn: 'Modern' },
        { icon: 'fa-palette',        href: '#section-illustrations', switchToDoc: true, labelDe: 'Visualisierungen', labelEn: 'Visuals' }
    ],

    sections: [
        /* ============================================================
           SECTION 1 — LAYERS
           ============================================================ */
        {
            id: 'section1',
            titleDe: 'Schichtenmodelle',
            titleEn: 'Layer Models',
            introDe: 'Netzwerke werden in Schichten gedacht. Jede Schicht bietet der darüberliegenden einen Dienst an und nutzt selbst den Dienst der darunterliegenden. Das bekannteste Modell ist das OSI-Modell mit 7 Schichten; in der Praxis arbeiten wir meist mit dem 4-schichtigen TCP/IP-Modell.',
            introEn: 'Networks are organized in layers. Each layer offers a service to the one above and uses the service of the one below. The best-known model is the 7-layer OSI model; in practice we mostly work with the 4-layer TCP/IP model.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'OSI vs. TCP/IP',
                    titleEn: 'OSI vs. TCP/IP',
                    htmlDe: `
                    <p class="text-xs mb-2">Das OSI-Modell ist ein Lehr- und Referenzmodell. Das TCP/IP-Modell ist das, was tatsächlich im Internet läuft. Die Zuordnung ist nicht 1:1, aber nah genug.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>OSI-Schicht</th><th>TCP/IP</th><th>Beispiele</th></tr>
                    <tr><td>7</td><td><strong>Application</strong></td><td rowspan="3" class="text-center align-middle text-[var(--text-muted)]">Application</td><td class="text-[var(--text-muted)]">HTTP, DNS, SSH, SMTP</td></tr>
                    <tr><td>6</td><td><strong>Presentation</strong></td><td class="text-[var(--text-muted)]">TLS, Encoding, Kompression</td></tr>
                    <tr><td>5</td><td><strong>Session</strong></td><td class="text-[var(--text-muted)]">Sitzungsverwaltung</td></tr>
                    <tr><td>4</td><td><strong>Transport</strong></td><td class="text-center text-[var(--text-muted)]">Transport</td><td class="text-[var(--text-muted)]">TCP, UDP, QUIC</td></tr>
                    <tr><td>3</td><td><strong>Network</strong></td><td class="text-center text-[var(--text-muted)]">Internet</td><td class="text-[var(--text-muted)]">IP (v4/v6), ICMP, ARP*</td></tr>
                    <tr><td>2</td><td><strong>Data Link</strong></td><td rowspan="2" class="text-center align-middle text-[var(--text-muted)]">Network Access</td><td class="text-[var(--text-muted)]">Ethernet, Wi-Fi, MAC</td></tr>
                    <tr><td>1</td><td><strong>Physical</strong></td><td class="text-[var(--text-muted)]">Kabel, Funk, Lichtwellenleiter</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">* ARP liegt streng genommen zwischen L2 und L3 — die Zuordnung variiert je nach Lehrbuch.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">The OSI model is a teaching and reference model. The TCP/IP model is what actually runs on the Internet. The mapping is not 1:1, but close enough.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>#</th><th>OSI Layer</th><th>TCP/IP</th><th>Examples</th></tr>
                    <tr><td>7</td><td><strong>Application</strong></td><td rowspan="3" class="text-center align-middle text-[var(--text-muted)]">Application</td><td class="text-[var(--text-muted)]">HTTP, DNS, SSH, SMTP</td></tr>
                    <tr><td>6</td><td><strong>Presentation</strong></td><td class="text-[var(--text-muted)]">TLS, encoding, compression</td></tr>
                    <tr><td>5</td><td><strong>Session</strong></td><td class="text-[var(--text-muted)]">Session management</td></tr>
                    <tr><td>4</td><td><strong>Transport</strong></td><td class="text-center text-[var(--text-muted)]">Transport</td><td class="text-[var(--text-muted)]">TCP, UDP, QUIC</td></tr>
                    <tr><td>3</td><td><strong>Network</strong></td><td class="text-center text-[var(--text-muted)]">Internet</td><td class="text-[var(--text-muted)]">IP (v4/v6), ICMP, ARP*</td></tr>
                    <tr><td>2</td><td><strong>Data Link</strong></td><td rowspan="2" class="text-center align-middle text-[var(--text-muted)]">Network Access</td><td class="text-[var(--text-muted)]">Ethernet, Wi-Fi, MAC</td></tr>
                    <tr><td>1</td><td><strong>Physical</strong></td><td class="text-[var(--text-muted)]">Cable, radio, fiber</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">* ARP sits strictly between L2 and L3 — placement varies by textbook.</p>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Kapselung: Was auf die Reise geht',
                    titleEn: 'Encapsulation: What Actually Travels',
                    htmlDe: `
                    <p class="text-xs mb-2">Beim Durchlaufen der Schichten wird jede Nutzlast in einen Header der jeweiligen Schicht eingepackt — das nennt man <strong>Kapselung</strong>. Beim Empfänger wird Schicht für Schicht wieder ausgepackt (<em>De-Kapselung</em>).</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Schicht</th><th>Dateneinheit</th><th>Was wird hinzugefügt?</th></tr>
                    <tr><td>Application</td><td class="text-[var(--text-muted)]">Data</td><td class="text-[var(--text-muted)]">Nutzdaten (z.B. HTTP-Request)</td></tr>
                    <tr><td>Transport</td><td class="text-[var(--text-muted)]">Segment (TCP) / Datagram (UDP)</td><td class="text-[var(--text-muted)]">Ports, Sequenznummern, Flags</td></tr>
                    <tr><td>Internet</td><td class="text-[var(--text-muted)]">Paket</td><td class="text-[var(--text-muted)]">Quell- und Ziel-IP, TTL, Protokollnummer</td></tr>
                    <tr><td>Netzzugang</td><td class="text-[var(--text-muted)]">Frame</td><td class="text-[var(--text-muted)]">MAC-Adressen, Prüfsumme (FCS)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">Ein Ethernet-Frame mit einem HTTP-Request trägt also <em>vier</em> ineinander verschachtelte Header. Der Anhang der Visualisierung unten zeigt diesen Weg.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">As data moves down the layers, each payload gets wrapped in a header of that layer — this is called <strong>encapsulation</strong>. On the receiver, it is unwrapped layer by layer (<em>de-encapsulation</em>).</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Layer</th><th>Data Unit</th><th>What is added?</th></tr>
                    <tr><td>Application</td><td class="text-[var(--text-muted)]">Data</td><td class="text-[var(--text-muted)]">Payload (e.g. HTTP request)</td></tr>
                    <tr><td>Transport</td><td class="text-[var(--text-muted)]">Segment (TCP) / Datagram (UDP)</td><td class="text-[var(--text-muted)]">Ports, sequence numbers, flags</td></tr>
                    <tr><td>Internet</td><td class="text-[var(--text-muted)]">Packet</td><td class="text-[var(--text-muted)]">Source/target IP, TTL, protocol number</td></tr>
                    <tr><td>Network Access</td><td class="text-[var(--text-muted)]">Frame</td><td class="text-[var(--text-muted)]">MAC addresses, checksum (FCS)</td></tr>
                    </table>
                    </div>
                    <p class="text-xs mt-2 text-[var(--text-muted)]">An Ethernet frame carrying an HTTP request thus has <em>four</em> nested headers. The visualization below shows this path.</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 2 — CORE PROTOCOLS
           ============================================================ */
        {
            id: 'section2',
            titleDe: 'Kern-Protokolle',
            titleEn: 'Core Protocols',
            introDe: 'Diese Protokolle begegnen jedem Paket. Wer sie versteht, versteht das Internet.',
            introEn: 'These protocols touch every packet. Understanding them means understanding the Internet.',
            subtopics: [

                /* ---------- TCP ---------- */
                {
                    id: 'subsection2_tcp',
                    titleDe: 'TCP — Transmission Control Protocol',
                    titleEn: 'TCP — Transmission Control Protocol',
                    htmlDe: `
                    <p class="text-xs mb-2"><strong>TCP</strong> ist der zuverlässige, verbindungsorientierte Transportdienst des Internets. Es sorgt dafür, dass Bytes vollständig, in der richtigen Reihenfolge und ohne Duplikate beim Empfänger ankommen — auch wenn das Netzwerk Pakete verliert, verdoppelt oder umsortiert.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Wie TCP arbeitet</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Verbindungsaufbau (3-Way-Handshake):</strong> Client sendet SYN → Server antwortet SYN/ACK → Client bestätigt mit ACK. Erst danach fließen Daten.</li>
                        <li><strong class="text-[var(--text-color)]">Sequenznummern:</strong> Jedes Byte bekommt eine Nummer. Der Empfänger kann fehlende Bytes erkennen und neu anfordern.</li>
                        <li><strong class="text-[var(--text-color)]">Bestätigungen (ACKs):</strong> Der Empfänger bestätigt den Empfang. Bleibt ein ACK aus, sendet der Sender das Segment erneut (Retransmission).</li>
                        <li><strong class="text-[var(--text-color)]">Flusskontrolle:</strong> Über die <em>Window Size</em> teilt der Empfänger mit, wie viele Bytes er noch puffern kann — der Sender bremst entsprechend.</li>
                        <li><strong class="text-[var(--text-color)]">Überlastkontrolle:</strong> Algorithmen wie <em>Slow Start</em> und <em>AIMD</em> verhindern, dass das Netz überlastet wird.</li>
                        <li><strong class="text-[var(--text-color)]">Verbindungsabbau:</strong> FIN → ACK → FIN → ACK (4-Way-Teardown) oder RST zum sofortigen Abbruch.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Header (20–60 Byte)</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Feld</th><th>Zweck</th></tr>
                    <tr><td><strong>Source / Dest Port</strong></td><td class="text-[var(--text-muted)]">16 Bit je Port — identifiziert Anwendung (z.B. 443 für HTTPS).</td></tr>
                    <tr><td><strong>Sequence Number</strong></td><td class="text-[var(--text-muted)]">32 Bit — Position des ersten Bytes im Segment.</td></tr>
                    <tr><td><strong>Acknowledgment Number</strong></td><td class="text-[var(--text-muted)]">32 Bit — nächstes erwartetes Byte.</td></tr>
                    <tr><td><strong>Flags</strong></td><td class="text-[var(--text-muted)]">SYN, ACK, FIN, RST, PSH, URG — steuern Auf- und Abbau.</td></tr>
                    <tr><td><strong>Window Size</strong></td><td class="text-[var(--text-muted)]">Empfangspuffer in Byte (16 Bit, erweiterbar über TCP Window Scaling).</td></tr>
                    <tr><td><strong>Checksum</strong></td><td class="text-[var(--text-muted)]">Prüfsumme über Header und Nutzdaten.</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">Typische Einsatzgebiete</h4>
                    <p class="text-xs text-[var(--text-muted)]">HTTP/1.1 und HTTP/2, SSH, SFTP, SMTP/IMAP, Datenbankverbindungen, klassisches VPN. Überall dort, wo Korrektheit wichtiger ist als die letzte Millisekunde Latenz.</p>

                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Schwachpunkt:</strong> TCP hat <em>Head-of-Line-Blocking</em>. Ein einziges verlorenes Segment blockiert alle nachfolgenden, auch wenn sie zu anderen Streams gehören — das ist der Hauptgrund für die Entwicklung von QUIC.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>TCP</strong> is the Internet's reliable, connection-oriented transport service. It ensures bytes arrive complete, in order, and without duplicates — even if the network loses, duplicates, or reorders packets.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">How TCP works</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Connection setup (3-way handshake):</strong> Client sends SYN → server replies SYN/ACK → client confirms with ACK. Only then does data flow.</li>
                        <li><strong class="text-[var(--text-color)]">Sequence numbers:</strong> Every byte gets a number. The receiver can detect missing bytes and request them again.</li>
                        <li><strong class="text-[var(--text-color)]">Acknowledgments (ACKs):</strong> The receiver confirms receipt. If no ACK arrives, the sender retransmits the segment.</li>
                        <li><strong class="text-[var(--text-color)]">Flow control:</strong> The <em>window size</em> tells the sender how many bytes the receiver can still buffer.</li>
                        <li><strong class="text-[var(--text-color)]">Congestion control:</strong> Algorithms like <em>slow start</em> and <em>AIMD</em> prevent network overload.</li>
                        <li><strong class="text-[var(--text-color)]">Teardown:</strong> FIN → ACK → FIN → ACK (4-way teardown) or RST for immediate abort.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Header (20–60 bytes)</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Field</th><th>Purpose</th></tr>
                    <tr><td><strong>Source / Dest Port</strong></td><td class="text-[var(--text-muted)]">16 bits each — identifies the application (e.g. 443 for HTTPS).</td></tr>
                    <tr><td><strong>Sequence Number</strong></td><td class="text-[var(--text-muted)]">32 bits — position of the first byte in the segment.</td></tr>
                    <tr><td><strong>Acknowledgment Number</strong></td><td class="text-[var(--text-muted)]">32 bits — next expected byte.</td></tr>
                    <tr><td><strong>Flags</strong></td><td class="text-[var(--text-muted)]">SYN, ACK, FIN, RST, PSH, URG — drive setup and teardown.</td></tr>
                    <tr><td><strong>Window Size</strong></td><td class="text-[var(--text-muted)]">Receive buffer in bytes (16 bits, extendable via TCP window scaling).</td></tr>
                    <tr><td><strong>Checksum</strong></td><td class="text-[var(--text-muted)]">Checksum over header and payload.</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">Typical use cases</h4>
                    <p class="text-xs text-[var(--text-muted)]">HTTP/1.1 and HTTP/2, SSH, SFTP, SMTP/IMAP, database connections, classic VPN. Anywhere correctness matters more than the last millisecond of latency.</p>

                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Weakness:</strong> TCP has <em>head-of-line blocking</em>. A single lost segment blocks all following ones, even if they belong to other streams — this is the main reason QUIC was developed.
                    </div>
                    `
                },

                /* ---------- UDP ---------- */
                {
                    id: 'subsection2_udp',
                    titleDe: 'UDP — User Datagram Protocol',
                    titleEn: 'UDP — User Datagram Protocol',
                    htmlDe: `
                    <p class="text-xs mb-2"><strong>UDP</strong> ist das Gegenteil von TCP: verbindungslos, minimal, ohne Garantien. Es schickt Datagramme so schnell es geht los und kümmert sich weder um Reihenfolge, Verlust noch Duplikate. Dafür ist es schnell, schlank und überall dort ideal, wo die Anwendung selbst weiß, was zu tun ist.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Wie UDP arbeitet</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Kein Handshake:</strong> Ein UDP-Paket ist sofort ein Datagramm. Kein Verbindungsaufbau, kein Zustand.</li>
                        <li><strong class="text-[var(--text-color)]">Keine Bestätigungen:</strong> Der Sender erfährt nie, ob das Paket angekommen ist.</li>
                        <li><strong class="text-[var(--text-color)]">Keine Reihenfolge:</strong> Pakete können durcheinander ankommen — oder gar nicht.</li>
                        <li><strong class="text-[var(--text-color)]">Kein Fluss- oder Staukontrolle:</strong> UDP prüft nicht, ob das Netz überlastet ist. Bei Überlastung werden Pakete einfach verworfen.</li>
                        <li><strong class="text-[var(--text-color)]">Verantwortung liegt bei der Anwendung:</strong> Wenn Zuverlässigkeit gebraucht wird, muss sie oberhalb von UDP implementiert werden (wie es QUIC tut).</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Header (nur 8 Byte, fix)</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Feld</th><th>Zweck</th></tr>
                    <tr><td><strong>Source Port</strong></td><td class="text-[var(--text-muted)]">16 Bit — optional (0 wenn nicht benötigt).</td></tr>
                    <tr><td><strong>Dest Port</strong></td><td class="text-[var(--text-muted)]">16 Bit — Zielanwendung.</td></tr>
                    <tr><td><strong>Length</strong></td><td class="text-[var(--text-muted)]">16 Bit — Länge von Header plus Nutzdaten.</td></tr>
                    <tr><td><strong>Checksum</strong></td><td class="text-[var(--text-muted)]">16 Bit — optional bei IPv4, verpflichtend bei IPv6.</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">Zum Vergleich: TCP-Header sind 20–60 Byte — UDP-Header nur 8. Weniger Overhead, weniger Latenz.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Typische Einsatzgebiete</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Anwendung</th><th>Warum UDP?</th></tr>
                    <tr><td><strong>DNS</strong></td><td class="text-[var(--text-muted)]">Ein einzelner Request/Response — Handshake wäre Verschwendung.</td></tr>
                    <tr><td><strong>DHCP</strong></td><td class="text-[var(--text-muted)]">Client hat noch keine IP — Broadcast über UDP.</td></tr>
                    <tr><td><strong>VoIP / Video</strong></td><td class="text-[var(--text-muted)]">Ein verlorenes Paket ist besser als ein verspätetes. Latenz schlägt Vollständigkeit.</td></tr>
                    <tr><td><strong>Online-Gaming</strong></td><td class="text-[var(--text-muted)]">Position aktualisiert sich ständig — alte Pakete sind nutzlos.</td></tr>
                    <tr><td><strong>NTP</strong></td><td class="text-[var(--text-muted)]">Zeitsynchronisation in Millisekunden.</td></tr>
                    <tr><td><strong>SNMP / TFTP</strong></td><td class="text-[var(--text-muted)]">Netzwerkmanagement und Firmware-Updates im LAN.</td></tr>
                    <tr><td><strong>QUIC / HTTP/3</strong></td><td class="text-[var(--text-muted)]">QUIC baut Zuverlässigkeit selbst über UDP auf.</td></tr>
                    </table>
                    </div>

                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Missverständnis:</strong> "UDP ist unzuverlässig" heißt nicht "UDP verliert ständig Daten". Im LAN verliert UDP praktisch nichts. In Weitverkehrsnetzen kann es verlieren — und dann ist es die Aufgabe der Anwendung, damit umzugehen.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>UDP</strong> is the opposite of TCP: connectionless, minimal, no guarantees. It fires datagrams out as fast as possible and never worries about order, loss, or duplicates. In exchange it is fast, lean, and perfect wherever the application itself knows what to do.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">How UDP works</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">No handshake:</strong> A UDP packet is immediately a datagram. No connection setup, no state.</li>
                        <li><strong class="text-[var(--text-color)]">No acknowledgments:</strong> The sender never learns whether the packet arrived.</li>
                        <li><strong class="text-[var(--text-color)]">No ordering:</strong> Packets may arrive out of order — or not at all.</li>
                        <li><strong class="text-[var(--text-color)]">No flow or congestion control:</strong> UDP doesn't check for overload. Under congestion, packets are simply dropped.</li>
                        <li><strong class="text-[var(--text-color)]">Responsibility lies with the application:</strong> If reliability is needed, it must be implemented above UDP (which is exactly what QUIC does).</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Header (only 8 bytes, fixed)</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Field</th><th>Purpose</th></tr>
                    <tr><td><strong>Source Port</strong></td><td class="text-[var(--text-muted)]">16 bits — optional (0 when not needed).</td></tr>
                    <tr><td><strong>Dest Port</strong></td><td class="text-[var(--text-muted)]">16 bits — target application.</td></tr>
                    <tr><td><strong>Length</strong></td><td class="text-[var(--text-muted)]">16 bits — length of header plus payload.</td></tr>
                    <tr><td><strong>Checksum</strong></td><td class="text-[var(--text-muted)]">16 bits — optional for IPv4, mandatory for IPv6.</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">For comparison: TCP headers are 20–60 bytes — UDP headers only 8. Less overhead, less latency.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Typical use cases</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Application</th><th>Why UDP?</th></tr>
                    <tr><td><strong>DNS</strong></td><td class="text-[var(--text-muted)]">A single request/response — a handshake would be a waste.</td></tr>
                    <tr><td><strong>DHCP</strong></td><td class="text-[var(--text-muted)]">Client has no IP yet — broadcasts over UDP.</td></tr>
                    <tr><td><strong>VoIP / Video</strong></td><td class="text-[var(--text-muted)]">A lost packet is better than a delayed one. Latency beats completeness.</td></tr>
                    <tr><td><strong>Online Gaming</strong></td><td class="text-[var(--text-muted)]">Position updates constantly — old packets are useless.</td></tr>
                    <tr><td><strong>NTP</strong></td><td class="text-[var(--text-muted)]">Time sync in milliseconds.</td></tr>
                    <tr><td><strong>SNMP / TFTP</strong></td><td class="text-[var(--text-muted)]">Network management and firmware updates on the LAN.</td></tr>
                    <tr><td><strong>QUIC / HTTP/3</strong></td><td class="text-[var(--text-muted)]">QUIC builds reliability itself on top of UDP.</td></tr>
                    </table>
                    </div>

                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Misconception:</strong> "UDP is unreliable" does not mean "UDP constantly loses data". On a LAN, UDP loses practically nothing. On wide-area networks it can lose — and then it is the application's job to deal with it.
                    </div>
                    `
                },

                /* ---------- DHCP ---------- */
                {
                    id: 'subsection2_dhcp',
                    titleDe: 'DHCP — Dynamic Host Configuration Protocol',
                    titleEn: 'DHCP — Dynamic Host Configuration Protocol',
                    htmlDe: `
                    <p class="text-xs mb-2"><strong>DHCP</strong> verteilt automatisch Netzwerkkonfiguration an Geräte: eine IP-Adresse, die Subnetzmaske, das Standard-Gateway, DNS-Server und eine <em>Lease Time</em>. Ohne DHCP müsste man jedes Gerät manuell konfigurieren — bei hunderten Geräten in einem Firmennetz unmöglich.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Der DORA-Ablauf</h4>
                    <p class="text-xs mb-2">Ein DHCP-Client sendet vier Nachrichten in genau dieser Reihenfolge:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Schritt</th><th>Nachricht</th><th>Richtung</th></tr>
                    <tr><td><strong>D</strong>iscover</td><td class="text-[var(--text-muted)]">DHCPDISCOVER</td><td class="text-[var(--text-muted)]">Client → Broadcast (255.255.255.255)</td></tr>
                    <tr><td><strong>O</strong>ffer</td><td class="text-[var(--text-muted)]">DHCPOFFER</td><td class="text-[var(--text-muted)]">Server → Client (Unicast)</td></tr>
                    <tr><td><strong>R</strong>equest</td><td class="text-[var(--text-muted)]">DHCPREQUEST</td><td class="text-[var(--text-muted)]">Client → Broadcast</td></tr>
                    <tr><td><strong>A</strong>cknowledge</td><td class="text-[var(--text-muted)]">DHCPACK</td><td class="text-[var(--text-muted)]">Server → Client (Unicast)</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">Der Client sendet die DHCPREQUEST als Broadcast, damit alle DHCP-Server im Netz erfahren, welchen Offer der Client angenommen hat.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Was DHCP übergibt</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">IP-Adresse:</strong> dynamisch (aus einem Pool) oder reserviert (MAC-Bindung).</li>
                        <li><strong class="text-[var(--text-color)]">Subnetzmaske:</strong> z.B. 255.255.255.0.</li>
                        <li><strong class="text-[var(--text-color)]">Standard-Gateway:</strong> typischerweise der Router.</li>
                        <li><strong class="text-[var(--text-color)]">DNS-Server:</strong> ein oder mehrere.</li>
                        <li><strong class="text-[var(--text-color)]">Lease Time:</strong> Gültigkeitsdauer der Konfiguration (typisch 8h–24h, manchmal Tage).</li>
                        <li><strong class="text-[var(--text-color)]">Optional:</strong> NTP-Server, TFTP-Adresse (PXE-Boot), WINS, Domain-Name, Boot-Optionen.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Lease-Verlängerung</h4>
                    <p class="text-xs text-[var(--text-muted)] mb-2">Die Lease läuft nicht einfach ab — der Client versucht sie zu erneuern:</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">T1 (50 % der Lease):</strong> Client sendet Unicast-DHCPREQUEST an den ursprünglichen Server.</li>
                        <li><strong class="text-[var(--text-color)]">T2 (87,5 %):</strong> Kein Erfolg → Client broadcastet die DHCPREQUEST an alle Server (Rebinding).</li>
                        <li><strong class="text-[var(--text-color)]">100 %:</strong> Keine Antwort → Client muss die IP-Adresse aufgeben und neu mit DHCPDISCOVER beginnen.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Wichtige Details</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Ports:</strong> Server 67/udp, Client 68/udp.</li>
                        <li><strong class="text-[var(--text-color)]">DHCP-Relay:</strong> Ein Agent auf dem Router leitet DHCP-Anfragen an einen zentralen Server in einem anderen Subnetz weiter — sonst müsste jede Broadcast-Domäne einen eigenen DHCP-Server haben.</li>
                        <li><strong class="text-[var(--text-color)]">DHCPv6:</strong> Für IPv6 gibt es zwei Wege — SLAAC (Router Advertisement, meist ausreichend) oder DHCPv6 (wenn zusätzliche Optionen wie DNS übergeben werden müssen). Oft laufen beide parallel.</li>
                        <li><strong class="text-[var(--text-color)]">Sicherheit:</strong> Ohne Schutz kann ein rogue DHCP-Server falsche Gateways verteilen — <em>DHCP Snooping</em> auf Switches verhindert das.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>DHCP</strong> automatically distributes network configuration to devices: an IP address, subnet mask, default gateway, DNS servers, and a <em>lease time</em>. Without DHCP, every device would need manual configuration — impossible with hundreds of devices in a corporate network.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">The DORA sequence</h4>
                    <p class="text-xs mb-2">A DHCP client sends four messages in exactly this order:</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Step</th><th>Message</th><th>Direction</th></tr>
                    <tr><td><strong>D</strong>iscover</td><td class="text-[var(--text-muted)]">DHCPDISCOVER</td><td class="text-[var(--text-muted)]">Client → broadcast (255.255.255.255)</td></tr>
                    <tr><td><strong>O</strong>ffer</td><td class="text-[var(--text-muted)]">DHCPOFFER</td><td class="text-[var(--text-muted)]">Server → client (unicast)</td></tr>
                    <tr><td><strong>R</strong>equest</td><td class="text-[var(--text-muted)]">DHCPREQUEST</td><td class="text-[var(--text-muted)]">Client → broadcast</td></tr>
                    <tr><td><strong>A</strong>cknowledge</td><td class="text-[var(--text-muted)]">DHCPACK</td><td class="text-[var(--text-muted)]">Server → client (unicast)</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">The client sends DHCPREQUEST as a broadcast so that every DHCP server on the network learns which offer the client accepted.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">What DHCP delivers</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">IP address:</strong> dynamic (from a pool) or reserved (MAC binding).</li>
                        <li><strong class="text-[var(--text-color)]">Subnet mask:</strong> e.g. 255.255.255.0.</li>
                        <li><strong class="text-[var(--text-color)]">Default gateway:</strong> typically the router.</li>
                        <li><strong class="text-[var(--text-color)]">DNS servers:</strong> one or more.</li>
                        <li><strong class="text-[var(--text-color)]">Lease time:</strong> validity duration of the configuration (typically 8h–24h, sometimes days).</li>
                        <li><strong class="text-[var(--text-color)]">Optional:</strong> NTP server, TFTP address (PXE boot), WINS, domain name, boot options.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Lease renewal</h4>
                    <p class="text-xs text-[var(--text-muted)] mb-2">The lease doesn't just expire — the client tries to renew it:</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">T1 (50% of lease):</strong> Client sends unicast DHCPREQUEST to the original server.</li>
                        <li><strong class="text-[var(--text-color)]">T2 (87.5%):</strong> No success → client broadcasts DHCPREQUEST to all servers (rebinding).</li>
                        <li><strong class="text-[var(--text-color)]">100%:</strong> No answer → client must give up the IP address and restart with DHCPDISCOVER.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Important details</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Ports:</strong> server 67/udp, client 68/udp.</li>
                        <li><strong class="text-[var(--text-color)]">DHCP relay:</strong> an agent on the router forwards DHCP requests to a central server in another subnet — otherwise every broadcast domain would need its own DHCP server.</li>
                        <li><strong class="text-[var(--text-color)]">DHCPv6:</strong> for IPv6 there are two paths — SLAAC (router advertisements, usually sufficient) or DHCPv6 (when extra options like DNS must be delivered). Often both run in parallel.</li>
                        <li><strong class="text-[var(--text-color)]">Security:</strong> without protection, a rogue DHCP server can hand out false gateways — <em>DHCP snooping</em> on switches prevents this.</li>
                    </ul>
                    `
                },

                /* ---------- IP / ICMP / ARP short table ---------- */
                {
                    id: 'subsection2_misc',
                    titleDe: 'Weitere Kern-Protokolle',
                    titleEn: 'Other Core Protocols',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Protokoll</th><th>Zweck</th></tr>
                    <tr><td><strong>IP (Internet Protocol)</strong></td><td class="text-[var(--text-muted)]">Adressierung und Routing. IPv4 ist noch weit verbreitet, IPv6 wächst stetig und löst Adressknappheit — mehr dazu im nächsten Abschnitt.</td></tr>
                    <tr><td><strong>ICMP</strong></td><td class="text-[var(--text-muted)]">Steuer- und Fehlermeldungen. Basis für <code>ping</code> (Echo Request/Reply) und <code>traceroute</code> (Time Exceeded). ICMPv6 übernimmt zusätzlich Aufgaben wie Neighbor Discovery und Router Advertisement.</td></tr>
                    <tr><td><strong>ARP / NDP</strong></td><td class="text-[var(--text-muted)]">Auflösung von IP-Adresse zu MAC-Adresse im lokalen Netz. IPv4 nutzt ARP, IPv6 nutzt NDP (Neighbor Discovery Protocol) über ICMPv6.</td></tr>
                    <tr><td><strong>QUIC</strong></td><td class="text-[var(--text-muted)]">Moderner Transport über UDP mit eingebautem TLS, Multiplexing ohne Head-of-Line-Blocking. Basis für HTTP/3 — mehr dazu in Abschnitt 5.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Protocol</th><th>Purpose</th></tr>
                    <tr><td><strong>IP (Internet Protocol)</strong></td><td class="text-[var(--text-muted)]">Addressing and routing. IPv4 is still widely deployed, IPv6 keeps growing and solves address exhaustion — more in the next section.</td></tr>
                    <tr><td><strong>ICMP</strong></td><td class="text-[var(--text-muted)]">Control and error messages. Basis for <code>ping</code> (echo request/reply) and <code>traceroute</code> (time exceeded). ICMPv6 also handles neighbor discovery and router advertisements.</td></tr>
                    <tr><td><strong>ARP / NDP</strong></td><td class="text-[var(--text-muted)]">Resolves IP address to MAC address on the local network. IPv4 uses ARP, IPv6 uses NDP (Neighbor Discovery Protocol) over ICMPv6.</td></tr>
                    <tr><td><strong>QUIC</strong></td><td class="text-[var(--text-muted)]">Modern transport over UDP with built-in TLS, multiplexing without head-of-line blocking. Basis for HTTP/3 — more in section 5.</td></tr>
                    </table>
                    </div>
                    `
                },

                /* ---------- Ports table ---------- */
                {
                    id: 'subsection2_ports',
                    titleDe: 'Ports & Adressierung',
                    titleEn: 'Ports & Addressing',
                    htmlDe: `
                    <p class="text-xs mb-2">Eine IP-Adresse identifiziert ein Gerät, ein Port identifiziert den Dienst darauf. Die Kombination heißt <strong>Socket</strong>.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Port</th><th>Protokoll</th><th>Dienst</th></tr>
                    <tr><td>20/21</td><td>TCP</td><td class="text-[var(--text-muted)]">FTP (Daten / Steuerung)</td></tr>
                    <tr><td>22</td><td>TCP</td><td class="text-[var(--text-muted)]">SSH, SCP, SFTP</td></tr>
                    <tr><td>25 / 587 / 465</td><td>TCP</td><td class="text-[var(--text-muted)]">SMTP (klassisch / Submission / SMTPS)</td></tr>
                    <tr><td>53</td><td>UDP + TCP</td><td class="text-[var(--text-muted)]">DNS</td></tr>
                    <tr><td>67 / 68</td><td>UDP</td><td class="text-[var(--text-muted)]">DHCP (Server / Client)</td></tr>
                    <tr><td>80</td><td>TCP</td><td class="text-[var(--text-muted)]">HTTP</td></tr>
                    <tr><td>123</td><td>UDP</td><td class="text-[var(--text-muted)]">NTP (Zeitsynchronisation)</td></tr>
                    <tr><td>143 / 993</td><td>TCP</td><td class="text-[var(--text-muted)]">IMAP / IMAPS</td></tr>
                    <tr><td>443</td><td>TCP / UDP</td><td class="text-[var(--text-muted)]">HTTPS (UDP = HTTP/3 via QUIC)</td></tr>
                    <tr><td>1194</td><td>UDP</td><td class="text-[var(--text-muted)]">OpenVPN</td></tr>
                    <tr><td>51820</td><td>UDP</td><td class="text-[var(--text-muted)]">WireGuard</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Port-Bereiche:</strong> 0–1023 = well-known, 1024–49151 = registered, 49152–65535 = dynamic/ephemeral.
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">An IP address identifies a device, a port identifies the service on it. The combination is called a <strong>socket</strong>.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Port</th><th>Protocol</th><th>Service</th></tr>
                    <tr><td>20/21</td><td>TCP</td><td class="text-[var(--text-muted)]">FTP (data / control)</td></tr>
                    <tr><td>22</td><td>TCP</td><td class="text-[var(--text-muted)]">SSH, SCP, SFTP</td></tr>
                    <tr><td>25 / 587 / 465</td><td>TCP</td><td class="text-[var(--text-muted)]">SMTP (classic / submission / SMTPS)</td></tr>
                    <tr><td>53</td><td>UDP + TCP</td><td class="text-[var(--text-muted)]">DNS</td></tr>
                    <tr><td>67 / 68</td><td>UDP</td><td class="text-[var(--text-muted)]">DHCP (server / client)</td></tr>
                    <tr><td>80</td><td>TCP</td><td class="text-[var(--text-muted)]">HTTP</td></tr>
                    <tr><td>123</td><td>UDP</td><td class="text-[var(--text-muted)]">NTP (time sync)</td></tr>
                    <tr><td>143 / 993</td><td>TCP</td><td class="text-[var(--text-muted)]">IMAP / IMAPS</td></tr>
                    <tr><td>443</td><td>TCP / UDP</td><td class="text-[var(--text-muted)]">HTTPS (UDP = HTTP/3 via QUIC)</td></tr>
                    <tr><td>1194</td><td>UDP</td><td class="text-[var(--text-muted)]">OpenVPN</td></tr>
                    <tr><td>51820</td><td>UDP</td><td class="text-[var(--text-muted)]">WireGuard</td></tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Port ranges:</strong> 0–1023 = well-known, 1024–49151 = registered, 49152–65535 = dynamic/ephemeral.
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 3 — IP ADDRESSING & SUBNETTING
           ============================================================ */
        {
            id: 'section3',
            titleDe: 'IP-Adressierung & Subnetting',
            titleEn: 'IP Addressing & Subnetting',
            introDe: 'IP-Adressen identifizieren Geräte weltweit. Sie zu verstehen heißt, Netzwerke planen, segmentieren und absichern zu können. Dieser Abschnitt erklärt IPv4, IPv6, CIDR und Subnetting in moderner Praxis.',
            introEn: 'IP addresses identify devices worldwide. Understanding them means being able to plan, segment, and secure networks. This section explains IPv4, IPv6, CIDR, and subnetting in modern practice.',
            subtopics: [

                /* ---------- IPv4 ---------- */
                {
                    id: 'subsection3_ipv4',
                    titleDe: 'IPv4 — Das Fundament',
                    titleEn: 'IPv4 — The Foundation',
                    htmlDe: `
                    <p class="text-xs mb-2"><strong>IPv4</strong> ist seit 1983 der Standard des Internets und wird es auch 2026 in großen Teilen noch sein. Eine Adresse ist <strong>32 Bit</strong> lang und wird in vier Dezimalblöcke geschrieben: <code>192.168.1.1</code>.</p>
                    <p class="text-xs mb-3">Der Adressraum umfasst ca. <strong>4,3 Milliarden</strong> Adressen — das war Anfang der 1980er großzügig, ist heute aber längst erschöpft (IANA-Adresspool seit 2011 leer). Die Welt hilft sich mit <em>NAT</em> und <em>IPv6</em>.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Adressklassen (historisch)</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Klasse</th><th>Erstes Oktett</th><th>Netzwerk-Bits</th><th>Standardmaske</th></tr>
                    <tr><td>A</td><td class="text-[var(--text-muted)]">1–126</td><td class="text-[var(--text-muted)]">8</td><td class="text-[var(--text-muted)]">255.0.0.0</td></tr>
                    <tr><td>B</td><td class="text-[var(--text-muted)]">128–191</td><td class="text-[var(--text-muted)]">16</td><td class="text-[var(--text-muted)]">255.255.0.0</td></tr>
                    <tr><td>C</td><td class="text-[var(--text-muted)]">192–223</td><td class="text-[var(--text-muted)]">24</td><td class="text-[var(--text-muted)]">255.255.255.0</td></tr>
                    <tr><td>D</td><td class="text-[var(--text-muted)]">224–239</td><td colspan="2" class="text-[var(--text-muted)]">Multicast</td></tr>
                    <tr><td>E</td><td class="text-[var(--text-muted)]">240–255</td><td colspan="2" class="text-[var(--text-muted)]">Reserviert / Experimentell</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">Klassen sind heute obsolet — seit 1993 arbeitet das Internet mit <em>CIDR</em> (Classless Inter-Domain Routing), das beliebige Präfixlängen erlaubt.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Private Bereiche (RFC 1918)</h4>
                    <p class="text-xs mb-2">Diese Adressen werden nie im öffentlichen Internet geroutet — sie sind für lokale Netze reserviert und werden typischerweise hinter NAT verwendet.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Bereich</th><th>CIDR</th><th>Adressen</th><th>Typisch für</th></tr>
                    <tr><td>10.0.0.0 – 10.255.255.255</td><td><code>10.0.0.0/8</code></td><td class="text-[var(--text-muted)]">~16,7 Mio.</td><td class="text-[var(--text-muted)]">Große Firmennetze</td></tr>
                    <tr><td>172.16.0.0 – 172.31.255.255</td><td><code>172.16.0.0/12</code></td><td class="text-[var(--text-muted)]">~1 Mio.</td><td class="text-[var(--text-muted)]">Mittlere Firmennetze</td></tr>
                    <tr><td>192.168.0.0 – 192.168.255.255</td><td><code>192.168.0.0/16</code></td><td class="text-[var(--text-muted)]">65.536</td><td class="text-[var(--text-muted)]">Heim- und Kleinbetriebsnetze</td></tr>
                    <tr><td>169.254.0.0 – 169.254.255.255</td><td><code>169.254.0.0/16</code></td><td class="text-[var(--text-muted)]">65.536</td><td class="text-[var(--text-muted)]">Link-Local (APIPA, wenn DHCP ausfällt)</td></tr>
                    <tr><td>127.0.0.0 – 127.255.255.255</td><td><code>127.0.0.0/8</code></td><td class="text-[var(--text-muted)]">~16,7 Mio.</td><td class="text-[var(--text-muted)]">Loopback (localhost)</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">NAT — Warum das Internet noch läuft</h4>
                    <p class="text-xs text-[var(--text-muted)]">Network Address Translation übersetzt private Adressen beim Verlassen des Netzes in eine öffentliche Adresse. Ein Heimrouter macht das für alle Geräte hinter ihm. Das hat IPv4 um Jahrzehnte verlängert — bringt aber Probleme: eingehende Verbindungen werden schwierig, Peer-to-Peer leidet, und Logging/Tracing wird komplex.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>IPv4</strong> has been the Internet standard since 1983 and, in 2026, still is across much of the world. An address is <strong>32 bits</strong> long, written as four decimal blocks: <code>192.168.1.1</code>.</p>
                    <p class="text-xs mb-3">The address space holds about <strong>4.3 billion</strong> addresses — generous in the early 1980s, long since exhausted (IANA pool empty since 2011). The world copes with <em>NAT</em> and <em>IPv6</em>.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Address classes (historical)</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Class</th><th>First octet</th><th>Network bits</th><th>Default mask</th></tr>
                    <tr><td>A</td><td class="text-[var(--text-muted)]">1–126</td><td class="text-[var(--text-muted)]">8</td><td class="text-[var(--text-muted)]">255.0.0.0</td></tr>
                    <tr><td>B</td><td class="text-[var(--text-muted)]">128–191</td><td class="text-[var(--text-muted)]">16</td><td class="text-[var(--text-muted)]">255.255.0.0</td></tr>
                    <tr><td>C</td><td class="text-[var(--text-muted)]">192–223</td><td class="text-[var(--text-muted)]">24</td><td class="text-[var(--text-muted)]">255.255.255.0</td></tr>
                    <tr><td>D</td><td class="text-[var(--text-muted)]">224–239</td><td colspan="2" class="text-[var(--text-muted)]">Multicast</td></tr>
                    <tr><td>E</td><td class="text-[var(--text-muted)]">240–255</td><td colspan="2" class="text-[var(--text-muted)]">Reserved / experimental</td></tr>
                    </table>
                    </div>
                    <p class="text-[11px] text-[var(--text-muted)] italic mt-2">Classes are obsolete — since 1993 the Internet uses <em>CIDR</em> (Classless Inter-Domain Routing), which allows arbitrary prefix lengths.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Private ranges (RFC 1918)</h4>
                    <p class="text-xs mb-2">These addresses are never routed on the public Internet — reserved for local networks and typically used behind NAT.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Range</th><th>CIDR</th><th>Addresses</th><th>Typical use</th></tr>
                    <tr><td>10.0.0.0 – 10.255.255.255</td><td><code>10.0.0.0/8</code></td><td class="text-[var(--text-muted)]">~16.7 M</td><td class="text-[var(--text-muted)]">Large corporate networks</td></tr>
                    <tr><td>172.16.0.0 – 172.31.255.255</td><td><code>172.16.0.0/12</code></td><td class="text-[var(--text-muted)]">~1 M</td><td class="text-[var(--text-muted)]">Mid-size corporate networks</td></tr>
                    <tr><td>192.168.0.0 – 192.168.255.255</td><td><code>192.168.0.0/16</code></td><td class="text-[var(--text-muted)]">65,536</td><td class="text-[var(--text-muted)]">Home and small office networks</td></tr>
                    <tr><td>169.254.0.0 – 169.254.255.255</td><td><code>169.254.0.0/16</code></td><td class="text-[var(--text-muted)]">65,536</td><td class="text-[var(--text-muted)]">Link-local (APIPA when DHCP fails)</td></tr>
                    <tr><td>127.0.0.0 – 127.255.255.255</td><td><code>127.0.0.0/8</code></td><td class="text-[var(--text-muted)]">~16.7 M</td><td class="text-[var(--text-muted)]">Loopback (localhost)</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">NAT — Why the Internet still runs</h4>
                    <p class="text-xs text-[var(--text-muted)]">Network Address Translation rewrites private addresses to a public one when leaving the network. A home router does this for every device behind it. It bought IPv4 decades — but brings problems: inbound connections become difficult, peer-to-peer suffers, and logging/tracing becomes complex.</p>
                    `
                },

                /* ---------- IPv6 ---------- */
                {
                    id: 'subsection3_ipv6',
                    titleDe: 'IPv6 — Der Nachfolger',
                    titleEn: 'IPv6 — The Successor',
                    htmlDe: `
                    <p class="text-xs mb-2"><strong>IPv6</strong> ist seit 1998 spezifiziert und wächst seit Jahren stetig. Eine Adresse ist <strong>128 Bit</strong> lang, geschrieben in acht Hexadezimalblöcken: <code>2001:0db8:0000:0000:0000:0000:0000:0001</code>.</p>
                    <p class="text-xs mb-3">Der Adressraum umfasst 2<sup>128</sup> ≈ <strong>3,4 × 10<sup>38</sup></strong> Adressen — genug, um jedes Sandkorn der Erde mehrfach zu adressieren. Adressknappheit ist damit kein Thema mehr.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Kurzschreibweise</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Führende Nullen</strong> in jedem Block dürfen weg: <code>0db8</code> → <code>db8</code>.</li>
                        <li><strong class="text-[var(--text-color)]">Zusammenhängende Nullblöcke</strong> werden durch <code>::</code> ersetzt — <em>nur einmal</em> pro Adresse.</li>
                        <li>Beispiel: <code>2001:0db8:0000:0000:0000:0000:0000:0001</code> → <code>2001:db8::1</code>.</li>
                        <li>Groß- und Kleinschreibung ist egal, Standard ist Kleinschreibung.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Wichtige Adressbereiche</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Präfix</th><th>Bedeutung</th></tr>
                    <tr><td><code>::1/128</code></td><td class="text-[var(--text-muted)]">Loopback (entspricht 127.0.0.1)</td></tr>
                    <tr><td><code>fe80::/10</code></td><td class="text-[var(--text-muted)]">Link-Local — immer automatisch vorhanden, nur im lokalen Segment gültig</td></tr>
                    <tr><td><code>2000::/3</code></td><td class="text-[var(--text-muted)]">Global Unicast — die öffentlich routbaren Adressen</td></tr>
                    <tr><td><code>fc00::/7</code></td><td class="text-[var(--text-muted)]">Unique Local — das IPv6-Äquivalent zu RFC 1918</td></tr>
                    <tr><td><code>ff00::/8</code></td><td class="text-[var(--text-muted)]">Multicast (IPv6 kennt keine Broadcasts mehr)</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">Was IPv6 besser macht</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Kein NAT nötig:</strong> Jedes Gerät kann eine öffentliche Adresse haben — Firewalls regeln den Zugriff sauber.</li>
                        <li><strong class="text-[var(--text-color)]">SLAAC:</strong> Stateless Address Autoconfiguration — Geräte bilden ihre Adresse selbst aus dem Router-Präfix und ihrer MAC (bzw. einem zufälligen Interface Identifier).</li>
                        <li><strong class="text-[var(--text-color)]">Vereinfachter Header:</strong> feste 40 Byte, keine Fragmentierung unterwegs, kein Header-Checksum (darum kümmert sich L2/L4).</li>
                        <li><strong class="text-[var(--text-color)]">Kein Broadcast:</strong> Multicast übernimmt — weniger Netzlast, gezieltere Adressierung.</li>
                        <li><strong class="text-[var(--text-color)]">Integriertes IPsec:</strong> war ursprünglich verpflichtend, heute optional, aber fest im Design vorgesehen.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Wie der Übergang läuft</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Dual Stack:</strong> Geräte haben IPv4 <em>und</em> IPv6 — die häufigste Lösung.</li>
                        <li><strong class="text-[var(--text-color)]">Tunneling:</strong> IPv6-Pakete werden in IPv4 verpackt (z.B. 6in4, DS-Lite).</li>
                        <li><strong class="text-[var(--text-color)]">Translation:</strong> NAT64/DNS64 für Netze, die noch kein IPv6 sprechen.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2"><strong>IPv6</strong> has been specified since 1998 and has been growing steadily for years. An address is <strong>128 bits</strong> long, written as eight hexadecimal blocks: <code>2001:0db8:0000:0000:0000:0000:0000:0001</code>.</p>
                    <p class="text-xs mb-3">The address space holds 2<sup>128</sup> ≈ <strong>3.4 × 10<sup>38</sup></strong> addresses — enough to address every grain of sand on Earth several times over. Address exhaustion is no longer an issue.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">Short notation</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)] mb-3">
                        <li><strong class="text-[var(--text-color)]">Leading zeros</strong> in each block may be dropped: <code>0db8</code> → <code>db8</code>.</li>
                        <li><strong class="text-[var(--text-color)]">Consecutive zero blocks</strong> are replaced by <code>::</code> — <em>only once</em> per address.</li>
                        <li>Example: <code>2001:0db8:0000:0000:0000:0000:0000:0001</code> → <code>2001:db8::1</code>.</li>
                        <li>Case doesn't matter, lowercase is standard.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">Important ranges</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Prefix</th><th>Meaning</th></tr>
                    <tr><td><code>::1/128</code></td><td class="text-[var(--text-muted)]">Loopback (equivalent to 127.0.0.1)</td></tr>
                    <tr><td><code>fe80::/10</code></td><td class="text-[var(--text-muted)]">Link-local — always present automatically, valid only on the local segment</td></tr>
                    <tr><td><code>2000::/3</code></td><td class="text-[var(--text-muted)]">Global unicast — the publicly routable addresses</td></tr>
                    <tr><td><code>fc00::/7</code></td><td class="text-[var(--text-muted)]">Unique local — IPv6's equivalent of RFC 1918</td></tr>
                    <tr><td><code>ff00::/8</code></td><td class="text-[var(--text-muted)]">Multicast (IPv6 has no broadcast anymore)</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">What IPv6 does better</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">No NAT needed:</strong> every device can have a public address — firewalls handle access cleanly.</li>
                        <li><strong class="text-[var(--text-color)]">SLAAC:</strong> stateless address autoconfiguration — devices form their address from the router prefix and their MAC (or a random interface identifier).</li>
                        <li><strong class="text-[var(--text-color)]">Simplified header:</strong> fixed 40 bytes, no in-flight fragmentation, no header checksum (L2/L4 handle that).</li>
                        <li><strong class="text-[var(--text-color)]">No broadcast:</strong> multicast takes over — less network load, more targeted addressing.</li>
                        <li><strong class="text-[var(--text-color)]">Integrated IPsec:</strong> originally mandatory, now optional, but designed in from the start.</li>
                    </ul>

                    <h4 class="text-xs font-bold mt-3 mb-1">How the transition works</h4>
                    <ul class="list-disc pl-4 space-y-0.5 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Dual stack:</strong> devices have IPv4 <em>and</em> IPv6 — the most common approach.</li>
                        <li><strong class="text-[var(--text-color)]">Tunneling:</strong> IPv6 packets are wrapped in IPv4 (e.g. 6in4, DS-Lite).</li>
                        <li><strong class="text-[var(--text-color)]">Translation:</strong> NAT64/DNS64 for networks not yet speaking IPv6.</li>
                    </ul>
                    `
                },

                /* ---------- Subnetting ---------- */
                {
                    id: 'subsection3_subnetting',
                    titleDe: 'Subnetting & CIDR',
                    titleEn: 'Subnetting & CIDR',
                    htmlDe: `
                    <p class="text-xs mb-2">Subnetting heißt, ein größeres Netz in kleinere, logisch getrennte Netze aufzuteilen. Das bringt: bessere Performance (kleinere Broadcast-Domänen), mehr Sicherheit (Trennung von Abteilungen), sauberes Routing und einfachere Firewall-Regeln.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">CIDR-Schreibweise</h4>
                    <p class="text-xs mb-2">Statt Subnetzmasken schreiben wir heute <strong>CIDR</strong>: <code>192.168.1.0/24</code> — die Zahl nach dem Schrägstrich gibt an, wie viele Bits das Netzwerkpräfix hat.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>CIDR</th><th>Subnetzmaske</th><th>Hosts</th><th>Typisch</th></tr>
                    <tr><td><code>/8</code></td><td>255.0.0.0</td><td class="text-[var(--text-muted)]">16.777.214</td><td class="text-[var(--text-muted)]">Sehr große Netzwerke</td></tr>
                    <tr><td><code>/16</code></td><td>255.255.0.0</td><td class="text-[var(--text-muted)]">65.534</td><td class="text-[var(--text-muted)]">Standort-Netz</td></tr>
                    <tr><td><code>/24</code></td><td>255.255.255.0</td><td class="text-[var(--text-muted)]">254</td><td class="text-[var(--text-muted)]">Klassisches LAN</td></tr>
                    <tr><td><code>/25</code></td><td>255.255.255.128</td><td class="text-[var(--text-muted)]">126</td><td class="text-[var(--text-muted)]">Zwei Hälften eines /24</td></tr>
                    <tr><td><code>/26</code></td><td>255.255.255.192</td><td class="text-[var(--text-muted)]">62</td><td class="text-[var(--text-muted)]">Abteilungsnetz</td></tr>
                    <tr><td><code>/27</code></td><td>255.255.255.224</td><td class="text-[var(--text-muted)]">30</td><td class="text-[var(--text-muted)]">Kleines Team</td></tr>
                    <tr><td><code>/28</code></td><td>255.255.255.240</td><td class="text-[var(--text-muted)]">14</td><td class="text-[var(--text-muted)]">Servergruppe</td></tr>
                    <tr><td><code>/29</code></td><td>255.255.255.248</td><td class="text-[var(--text-muted)]">6</td><td class="text-[var(--text-muted)]">Mini-Netz</td></tr>
                    <tr><td><code>/30</code></td><td>255.255.255.252</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">Punkt-zu-Punkt-Verbindungen</td></tr>
                    <tr><td><code>/31</code></td><td>255.255.255.254</td><td class="text-[var(--text-muted)]">2 (RFC 3021)</td><td class="text-[var(--text-muted)]">Router-Links (ohne Broadcast)</td></tr>
                    <tr><td><code>/32</code></td><td>255.255.255.255</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">Einzelne IP (Host-Route, Loopback)</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">Die Formel</h4>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] shadow-[var(--control-shadow)] mb-3">
                        <div class="mb-1"><strong class="text-[var(--text-color)]">Anzahl Hosts</strong> = 2<sup>(32 − Präfix)</sup> − 2</div>
                        <div class="mb-1"><strong class="text-[var(--text-color)]">Anzahl Subnetze</strong> = 2<sup>(neuer Präfix − alter Präfix)</sup></div>
                        <div>Die <em>− 2</em> kommt daher, dass Netzwerkadresse (alle Host-Bits = 0) und Broadcast (alle Host-Bits = 1) nicht an Hosts vergeben werden dürfen.</div>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">Praxisbeispiel: /24 in vier /26 aufteilen</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Subnetz</th><th>Netzwerk</th><th>Erste Host-IP</th><th>Letzte Host-IP</th><th>Broadcast</th></tr>
                    <tr><td>1</td><td>192.168.1.0/26</td><td>192.168.1.1</td><td>192.168.1.62</td><td>192.168.1.63</td></tr>
                    <tr><td>2</td><td>192.168.1.64/26</td><td>192.168.1.65</td><td>192.168.1.126</td><td>192.168.1.127</td></tr>
                    <tr><td>3</td><td>192.168.1.128/26</td><td>192.168.1.129</td><td>192.168.1.190</td><td>192.168.1.191</td></tr>
                    <tr><td>4</td><td>192.168.1.192/26</td><td>192.168.1.193</td><td>192.168.1.254</td><td>192.168.1.255</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">VLSM — Variable Length Subnet Mask</h4>
                    <p class="text-xs text-[var(--text-muted)]">In der Praxis verschwendet man keine Adressen. Man vergibt pro Segment genau so viele Bits, wie nötig: ein /30 für einen Router-Link, ein /27 für ein kleines Team, ein /24 für eine ganze Abteilung. Das nennt man <em>VLSM</em>. Moderne Tools und IPAM-Systeme übernehmen das heute automatisch.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">IPv6-Subnetting</h4>
                    <p class="text-xs text-[var(--text-muted)]">Bei IPv6 funktioniert Subnetting genauso, aber großzügiger: ein Haushalt bekommt typischerweise ein <code>/64</code> — das entspricht 2<sup>64</sup> Adressen pro Subnetz. ISPs vergeben meist ein <code>/56</code> oder <code>/48</code> pro Kunde. Das /64 ist bewusst gewählt, weil SLAAC genau 64 Host-Bits erwartet.</p>
                    `,
                    htmlEn: `
                    <p class="text-xs mb-2">Subnetting means dividing a larger network into smaller, logically separated ones. This brings better performance (smaller broadcast domains), more security (department separation), cleaner routing, and simpler firewall rules.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">CIDR notation</h4>
                    <p class="text-xs mb-2">Instead of subnet masks we now write <strong>CIDR</strong>: <code>192.168.1.0/24</code> — the number after the slash says how many bits the network prefix has.</p>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>CIDR</th><th>Subnet mask</th><th>Hosts</th><th>Typical</th></tr>
                    <tr><td><code>/8</code></td><td>255.0.0.0</td><td class="text-[var(--text-muted)]">16,777,214</td><td class="text-[var(--text-muted)]">Very large networks</td></tr>
                    <tr><td><code>/16</code></td><td>255.255.0.0</td><td class="text-[var(--text-muted)]">65,534</td><td class="text-[var(--text-muted)]">Site network</td></tr>
                    <tr><td><code>/24</code></td><td>255.255.255.0</td><td class="text-[var(--text-muted)]">254</td><td class="text-[var(--text-muted)]">Classic LAN</td></tr>
                    <tr><td><code>/25</code></td><td>255.255.255.128</td><td class="text-[var(--text-muted)]">126</td><td class="text-[var(--text-muted)]">Half of a /24</td></tr>
                    <tr><td><code>/26</code></td><td>255.255.255.192</td><td class="text-[var(--text-muted)]">62</td><td class="text-[var(--text-muted)]">Department network</td></tr>
                    <tr><td><code>/27</code></td><td>255.255.255.224</td><td class="text-[var(--text-muted)]">30</td><td class="text-[var(--text-muted)]">Small team</td></tr>
                    <tr><td><code>/28</code></td><td>255.255.255.240</td><td class="text-[var(--text-muted)]">14</td><td class="text-[var(--text-muted)]">Server group</td></tr>
                    <tr><td><code>/29</code></td><td>255.255.255.248</td><td class="text-[var(--text-muted)]">6</td><td class="text-[var(--text-muted)]">Mini network</td></tr>
                    <tr><td><code>/30</code></td><td>255.255.255.252</td><td class="text-[var(--text-muted)]">2</td><td class="text-[var(--text-muted)]">Point-to-point links</td></tr>
                    <tr><td><code>/31</code></td><td>255.255.255.254</td><td class="text-[var(--text-muted)]">2 (RFC 3021)</td><td class="text-[var(--text-muted)]">Router links (no broadcast)</td></tr>
                    <tr><td><code>/32</code></td><td>255.255.255.255</td><td class="text-[var(--text-muted)]">1</td><td class="text-[var(--text-muted)]">Single IP (host route, loopback)</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">The formula</h4>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] shadow-[var(--control-shadow)] mb-3">
                        <div class="mb-1"><strong class="text-[var(--text-color)]">Host count</strong> = 2<sup>(32 − prefix)</sup> − 2</div>
                        <div class="mb-1"><strong class="text-[var(--text-color)]">Subnet count</strong> = 2<sup>(new prefix − old prefix)</sup></div>
                        <div>The <em>− 2</em> is because network address (all host bits = 0) and broadcast (all host bits = 1) cannot be assigned to hosts.</div>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">Practical example: split a /24 into four /26</h4>
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Subnet</th><th>Network</th><th>First host</th><th>Last host</th><th>Broadcast</th></tr>
                    <tr><td>1</td><td>192.168.1.0/26</td><td>192.168.1.1</td><td>192.168.1.62</td><td>192.168.1.63</td></tr>
                    <tr><td>2</td><td>192.168.1.64/26</td><td>192.168.1.65</td><td>192.168.1.126</td><td>192.168.1.127</td></tr>
                    <tr><td>3</td><td>192.168.1.128/26</td><td>192.168.1.129</td><td>192.168.1.190</td><td>192.168.1.191</td></tr>
                    <tr><td>4</td><td>192.168.1.192/26</td><td>192.168.1.193</td><td>192.168.1.254</td><td>192.168.1.255</td></tr>
                    </table>
                    </div>

                    <h4 class="text-xs font-bold mt-3 mb-1">VLSM — Variable Length Subnet Mask</h4>
                    <p class="text-xs text-[var(--text-muted)]">In practice you don't waste addresses. You allocate per segment exactly as many bits as needed: a /30 for a router link, a /27 for a small team, a /24 for a whole department. This is <em>VLSM</em>. Modern tools and IPAM systems handle this automatically today.</p>

                    <h4 class="text-xs font-bold mt-3 mb-1">IPv6 subnetting</h4>
                    <p class="text-xs text-[var(--text-muted)]">With IPv6, subnetting works the same way but more generously: a household typically gets a <code>/64</code> — that is 2<sup>64</sup> addresses per subnet. ISPs usually hand out a <code>/56</code> or <code>/48</code> per customer. The /64 is deliberate, because SLAAC expects exactly 64 host bits.</p>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 4 — APPLICATION PROTOCOLS
           ============================================================ */
        {
            id: 'section4',
            titleDe: 'Anwendungsprotokolle',
            titleEn: 'Application Protocols',
            introDe: 'Was Nutzer tatsächlich erleben — Surfen, Mail, Namensauflösung, Fernzugriff.',
            introEn: 'What users actually experience — browsing, email, name resolution, remote access.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'DNS, HTTP/S',
                    titleEn: 'DNS, HTTP/S',
                    htmlDe: `
                    <ul class="list-disc pl-4 mt-1.5 mb-3 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">DNS</strong> — löst Namen in IP-Adressen auf. Hierarchisch: Root → TLD → Authoritative. Moderne Variante: DoH (DNS over HTTPS) und DoT (DNS over TLS) verschlüsseln Anfragen.</li>
                        <li><strong class="text-[var(--text-color)]">HTTP/1.1</strong> — klassisch, textbasiert, eine Verbindung pro Request (bzw. Keep-Alive).</li>
                        <li><strong class="text-[var(--text-color)]">HTTP/2</strong> — binär, gemultiplexed, Header-Komprimierung (HPACK). Läuft über TCP.</li>
                        <li><strong class="text-[var(--text-color)]">HTTP/3</strong> — läuft über <strong>QUIC</strong> (UDP), kein Head-of-Line-Blocking, schnellere Verbindungsherstellung.</li>
                        <li><strong class="text-[var(--text-color)]">HTTPS</strong> — HTTP über TLS. Seit TLS 1.3 standardmäßig Forward Secrecy, 1-RTT-Handshake (oder 0-RTT bei Wiederaufnahme).</li>
                    </ul>
                    `,
                    htmlEn: `
                    <ul class="list-disc pl-4 mt-1.5 mb-3 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">DNS</strong> — resolves names into IP addresses. Hierarchical: root → TLD → authoritative. Modern variants: DoH (DNS over HTTPS) and DoT (DNS over TLS) encrypt queries.</li>
                        <li><strong class="text-[var(--text-color)]">HTTP/1.1</strong> — classic, text-based, one connection per request (or keep-alive).</li>
                        <li><strong class="text-[var(--text-color)]">HTTP/2</strong> — binary, multiplexed, header compression (HPACK). Runs over TCP.</li>
                        <li><strong class="text-[var(--text-color)]">HTTP/3</strong> — runs over <strong>QUIC</strong> (UDP), no head-of-line blocking, faster connection setup.</li>
                        <li><strong class="text-[var(--text-color)]">HTTPS</strong> — HTTP over TLS. Since TLS 1.3 with forward secrecy by default, 1-RTT handshake (or 0-RTT on resumption).</li>
                    </ul>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Mail & Fernzugriff',
                    titleEn: 'Mail & Remote Access',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Protokoll</th><th>Rolle</th></tr>
                    <tr><td><strong>SMTP</strong></td><td class="text-[var(--text-muted)]">Versand und Weiterleitung von E-Mails (Server → Server, Client → Server).</td></tr>
                    <tr><td><strong>IMAP</strong></td><td class="text-[var(--text-muted)]">Mail bleibt auf dem Server, Client synchronisiert. Standard auf mehreren Geräten.</td></tr>
                    <tr><td><strong>POP3</strong></td><td class="text-[var(--text-muted)]">Lädt Mails herunter und löscht sie meist vom Server. Nur für Einzelgerät sinnvoll.</td></tr>
                    <tr><td><strong>SSH</strong></td><td class="text-[var(--text-muted)]">Verschlüsselter Fernzugriff auf Shells, Tunneling, Portweiterleitung, Dateitransfer (SFTP/SCP).</td></tr>
                    <tr><td><strong>FTP / FTPS / SFTP</strong></td><td class="text-[var(--text-muted)]">Dateitransfer. FTP unverschlüsselt, FTPS = FTP über TLS, SFTP = SSH-basiert (bevorzugt).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Protocol</th><th>Role</th></tr>
                    <tr><td><strong>SMTP</strong></td><td class="text-[var(--text-muted)]">Sending and relaying email (server → server, client → server).</td></tr>
                    <tr><td><strong>IMAP</strong></td><td class="text-[var(--text-muted)]">Mail stays on the server, client syncs. Standard for multiple devices.</td></tr>
                    <tr><td><strong>POP3</strong></td><td class="text-[var(--text-muted)]">Downloads mails and usually deletes them from the server. Only sensible for single-device setups.</td></tr>
                    <tr><td><strong>SSH</strong></td><td class="text-[var(--text-muted)]">Encrypted remote access to shells, tunneling, port forwarding, file transfer (SFTP/SCP).</td></tr>
                    <tr><td><strong>FTP / FTPS / SFTP</strong></td><td class="text-[var(--text-muted)]">File transfer. FTP unencrypted, FTPS = FTP over TLS, SFTP = SSH-based (preferred).</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           SECTION 5 — MODERN
           ============================================================ */
        {
            id: 'section5',
            titleDe: 'Modernes: QUIC, HTTP/3, TLS 1.3',
            titleEn: 'Modern: QUIC, HTTP/3, TLS 1.3',
            introDe: 'Der Stack verändert sich. Was vor fünf Jahren noch Standard war, ist heute oft schon Legacy.',
            introEn: 'The stack is shifting. What was standard five years ago is often legacy today.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Was sich verändert hat',
                    titleEn: 'What Has Changed',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Thema</th><th>Vorher</th><th>Heute</th></tr>
                    <tr>
                    <td><strong>Transport</strong></td>
                    <td class="text-[var(--text-muted)]">TCP für alles Zuverlässige.</td>
                    <td class="text-[var(--text-muted)]">QUIC auf UDP — Reliability, Multiplexing und Verschlüsselung eingebaut.</td>
                    </tr>
                    <tr>
                    <td><strong>HTTP</strong></td>
                    <td class="text-[var(--text-muted)]">HTTP/1.1, oft mit mehreren parallelen TCP-Verbindungen.</td>
                    <td class="text-[var(--text-muted)]">HTTP/2 über TCP, zunehmend HTTP/3 über QUIC.</td>
                    </tr>
                    <tr>
                    <td><strong>TLS</strong></td>
                    <td class="text-[var(--text-muted)]">TLS 1.2, 2-RTT-Handshake, RSA-Key-Exchange optional.</td>
                    <td class="text-[var(--text-muted)]">TLS 1.3, 1-RTT (oder 0-RTT), Forward Secrecy Pflicht.</td>
                    </tr>
                    <tr>
                    <td><strong>DNS</strong></td>
                    <td class="text-[var(--text-muted)]">Klartext auf UDP/53.</td>
                    <td class="text-[var(--text-muted)]">Immer häufiger DoH / DoT, verschlüsselt und schwer abhörbar.</td>
                    </tr>
                    <tr>
                    <td><strong>Adressierung</strong></td>
                    <td class="text-[var(--text-muted)]">IPv4 mit NAT überall.</td>
                    <td class="text-[var(--text-muted)]">IPv6 wächst, viele Provider liefern dual-stack.</td>
                    </tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Warum QUIC so wichtig ist:</strong> Klassisches TCP hat Head-of-Line-Blocking — ein verlorenes Paket blockiert alle Streams. QUIC multiplexed Streams unabhängig voneinander, ist in Userspace implementierbar und bringt TLS direkt mit.
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Topic</th><th>Before</th><th>Today</th></tr>
                    <tr>
                    <td><strong>Transport</strong></td>
                    <td class="text-[var(--text-muted)]">TCP for anything reliable.</td>
                    <td class="text-[var(--text-muted)]">QUIC over UDP — reliability, multiplexing, and encryption built in.</td>
                    </tr>
                    <tr>
                    <td><strong>HTTP</strong></td>
                    <td class="text-[var(--text-muted)]">HTTP/1.1, often with multiple parallel TCP connections.</td>
                    <td class="text-[var(--text-muted)]">HTTP/2 over TCP, increasingly HTTP/3 over QUIC.</td>
                    </tr>
                    <tr>
                    <td><strong>TLS</strong></td>
                    <td class="text-[var(--text-muted)]">TLS 1.2, 2-RTT handshake, RSA key exchange optional.</td>
                    <td class="text-[var(--text-muted)]">TLS 1.3, 1-RTT (or 0-RTT), forward secrecy mandatory.</td>
                    </tr>
                    <tr>
                    <td><strong>DNS</strong></td>
                    <td class="text-[var(--text-muted)]">Plaintext on UDP/53.</td>
                    <td class="text-[var(--text-muted)]">Increasingly DoH / DoT, encrypted and harder to eavesdrop on.</td>
                    </tr>
                    <tr>
                    <td><strong>Addressing</strong></td>
                    <td class="text-[var(--text-muted)]">IPv4 with NAT everywhere.</td>
                    <td class="text-[var(--text-muted)]">IPv6 growing, many providers deliver dual-stack.</td>
                    </tr>
                    </table>
                    </div>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)] mt-3 shadow-[var(--control-shadow)]">
                        <strong class="text-[var(--text-color)]">Why QUIC matters:</strong> Classic TCP has head-of-line blocking — one lost packet stalls all streams. QUIC multiplexes streams independently, can be implemented in userspace, and ships TLS directly.
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
            titleDe: 'TLDR – Netzwerke in vier Sätzen',
            titleEn: 'TLDR – Networking in Four Sentences',
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
                                <i class="fa-solid fa-layer-group text-lg opacity-90"></i>
                                <span>1. Schichten & Kapselung</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Netzwerke sind <strong>geschichtet</strong>. Jede Schicht verpackt die Daten weiter, die darunterliegende transportiert sie. OSI = 7 Schichten, TCP/IP = 4.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-right-left text-lg opacity-90"></i>
                                <span>2. TCP vs UDP</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>TCP:</strong> Handshake, ACKs, Reihenfolge, Flusskontrolle — zuverlässig.<br><strong>UDP:</strong> kein Handshake, keine ACKs, minimal — schnell.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-sitemap text-lg opacity-90"></i>
                                <span>3. IP & Subnetting</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>IPv4:</strong> 32 Bit, erschöpft, NAT überall. <strong>IPv6:</strong> 128 Bit, kein NAT nötig. <strong>Subnetting:</strong> Hosts = 2<sup>(32−Prefix)</sup> − 2.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-bolt text-lg opacity-90"></i>
                                <span>4. Modernes</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>QUIC</strong> + <strong>HTTP/3</strong> über UDP, <strong>TLS 1.3</strong> mit 1-RTT, <strong>DoH/DoT</strong> verschlüsselt DNS. Der Stack wird schneller und sicherer.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-layer-group text-lg opacity-90"></i>
                                <span>1. Layers & Encapsulation</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Networks are <strong>layered</strong>. Each layer wraps the data further, the one below transports it. OSI = 7 layers, TCP/IP = 4.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-right-left text-lg opacity-90"></i>
                                <span>2. TCP vs UDP</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>TCP:</strong> handshake, ACKs, ordering, flow control — reliable.<br><strong>UDP:</strong> no handshake, no ACKs, minimal — fast.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-sitemap text-lg opacity-90"></i>
                                <span>3. IP & Subnetting</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>IPv4:</strong> 32 bits, exhausted, NAT everywhere. <strong>IPv6:</strong> 128 bits, no NAT needed. <strong>Subnetting:</strong> hosts = 2<sup>(32−prefix)</sup> − 2.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-bolt text-lg opacity-90"></i>
                                <span>4. Modern</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <strong>QUIC</strong> + <strong>HTTP/3</strong> over UDP, <strong>TLS 1.3</strong> with 1-RTT, <strong>DoH/DoT</strong> encrypts DNS. The stack is getting faster and safer.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    /* ============================================================
       ILLUSTRATIONS — 6 pure-CSS animations (Inter font)
       ============================================================ */
    illustrations: {
        titleDe: 'Visualisierungen & Grafiken',
        titleEn: 'Visualizations & Graphics',
        introDe: 'Sechs kurze Animationen, die die wichtigsten Netzwerk-Konzepte zeigen.',
        introEn: 'Six short animations illustrating the most important networking concepts.',
        animations: [

            /* 1 — LAYER STACK */
            {
                id: 'vis-layer-stack',
                titleDe: 'Schichten & Kapselung',
                titleEn: 'Layers & Encapsulation',
                descDe: 'Ein Datenpaket wandert von der Anwendung nach unten durch alle Schichten.',
                descEn: 'A data packet travels from the application down through every layer.',
                html: `
                <style>
                    .pm-osi-stage { position: relative; padding: 1rem 0.5rem 1rem 3.5rem; max-width: 460px; margin: 0 auto; font-family: 'Inter', sans-serif; }
                    .pm-osi-stack { display: flex; flex-direction: column; gap: 6px; }
                    .pm-osi-layer {
                        display: flex; align-items: center; gap: 0.6rem;
                        padding: 0.55rem 0.75rem; border-radius: 0.45rem;
                        background: var(--bg-color); border: 1px solid var(--border-color);
                        font-size: 0.72rem; color: var(--text-color);
                        font-family: 'Inter', sans-serif;
                        will-change: transform, border-color, box-shadow, background;
                    }
                    .pm-osi-layer i { width: 1.1rem; text-align: center; opacity: 0.85; }
                    .pm-osi-layer strong { font-weight: 700; color: var(--heading-color); font-family: 'Inter', sans-serif; }
                    .pm-osi-layer span { color: var(--text-muted); font-size: 0.66rem; margin-left: auto; font-family: 'Inter', sans-serif; }
                    .pm-osi-layer:nth-child(1) { animation: pm-osi-blue   5s ease-in-out infinite; animation-delay: 0.3s; }
                    .pm-osi-layer:nth-child(2) { animation: pm-osi-cyan   5s ease-in-out infinite; animation-delay: 1.0s; }
                    .pm-osi-layer:nth-child(3) { animation: pm-osi-green  5s ease-in-out infinite; animation-delay: 1.7s; }
                    .pm-osi-layer:nth-child(4) { animation: pm-osi-purple 5s ease-in-out infinite; animation-delay: 2.4s; }
                    @keyframes pm-osi-blue   { 0%,100% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } 6%,22% { transform: translateX(8px); background: var(--code-bg); border-color: #3b82f6; box-shadow: 0 0 18px -6px #3b82f6; } 36% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } }
                    @keyframes pm-osi-cyan   { 0%,100% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } 6%,22% { transform: translateX(8px); background: var(--code-bg); border-color: #06b6d4; box-shadow: 0 0 18px -6px #06b6d4; } 36% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } }
                    @keyframes pm-osi-green  { 0%,100% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } 6%,22% { transform: translateX(8px); background: var(--code-bg); border-color: #10b981; box-shadow: 0 0 18px -6px #10b981; } 36% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } }
                    @keyframes pm-osi-purple { 0%,100% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } 6%,22% { transform: translateX(8px); background: var(--code-bg); border-color: #a855f7; box-shadow: 0 0 18px -6px #a855f7; } 36% { transform: translateX(0); background: var(--bg-color); border-color: var(--border-color); box-shadow: none; } }
                    .pm-osi-rail { position: absolute; left: 1.5rem; top: 1rem; bottom: 1rem; width: 2px; background: var(--border-color); border-radius: 2px; overflow: hidden; }
                    .pm-osi-rail-fill { position: absolute; left: -2px; width: 6px; height: 14px; border-radius: 3px; background: linear-gradient(180deg, #3b82f6, #06b6d4, #10b981, #a855f7); animation: pm-osi-travel 5s ease-in-out infinite; box-shadow: 0 0 10px rgba(59,130,246,0.7); }
                    @keyframes pm-osi-travel { 0%,6% { top: -14px; opacity: 0; } 10% { opacity: 1; } 80% { top: 100%; opacity: 1; } 86%,100% { top: 100%; opacity: 0; } }
                    @media (prefers-reduced-motion: reduce) { .pm-osi-layer, .pm-osi-rail-fill { animation: none !important; } }
                </style>
                <div class="pm-osi-stage">
                    <div class="pm-osi-rail"><div class="pm-osi-rail-fill"></div></div>
                    <div class="pm-osi-stack">
                        <div class="pm-osi-layer">
                            <i class="fa-solid fa-window-maximize"></i>
                            <strong data-lang-de>Application</strong><strong data-lang-en style="display:none;">Application</strong>
                            <span>HTTP · DNS · SSH</span>
                        </div>
                        <div class="pm-osi-layer">
                            <i class="fa-solid fa-right-left"></i>
                            <strong data-lang-de>Transport</strong><strong data-lang-en style="display:none;">Transport</strong>
                            <span>TCP · UDP · QUIC</span>
                        </div>
                        <div class="pm-osi-layer">
                            <i class="fa-solid fa-route"></i>
                            <strong data-lang-de>Internet</strong><strong data-lang-en style="display:none;">Internet</strong>
                            <span>IPv4 · IPv6 · ICMP</span>
                        </div>
                        <div class="pm-osi-layer">
                            <i class="fa-solid fa-ethernet"></i>
                            <strong data-lang-de>Netzzugang</strong><strong data-lang-en style="display:none;">Network Access</strong>
                            <span>Ethernet · Wi-Fi</span>
                        </div>
                    </div>
                </div>
                `
            },

            /* 2 — TCP HANDSHAKE */
            {
                id: 'vis-tcp-handshake',
                titleDe: 'TCP 3-Way Handshake',
                titleEn: 'TCP 3-Way Handshake',
                descDe: 'SYN, SYN/ACK, ACK — wie zwei Systeme eine zuverlässige Verbindung aufbauen.',
                descEn: 'SYN, SYN/ACK, ACK — how two systems establish a reliable connection.',
                html: `
                <style>
                    .pm-hs-stage { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; padding: 1rem 0.5rem 0.5rem; max-width: 460px; margin: 0 auto; min-height: 260px; font-family: 'Inter', sans-serif; }
                    .pm-hs-tower { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding-top: 1.2rem; position: relative; }
                    .pm-hs-tower .pm-hs-box { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; padding: 0.7rem 0.85rem; border-radius: 0.55rem; background: var(--panel-color); border: 1px solid var(--border-color); box-shadow: var(--control-shadow); font-size: 0.72rem; font-weight: 700; color: var(--heading-color); white-space: nowrap; font-family: 'Inter', sans-serif; }
                    .pm-hs-tower .pm-hs-box i { font-size: 1.3rem; color: var(--link-color); }
                    .pm-hs-track { position: absolute; top: 50%; height: 2px; width: 100%; pointer-events: none; }
                    .pm-hs-track-line { position: absolute; inset: 0; background: repeating-linear-gradient(90deg, var(--border-color) 0 6px, transparent 6px 12px); opacity: 0.7; }
                    .pm-hs-packet { position: absolute; top: 50%; left: 0; transform: translate(-50%, -50%); padding: 0.15rem 0.45rem; border-radius: 0.3rem; font-size: 0.58rem; font-weight: 800; font-family: 'Fira Code', monospace; letter-spacing: 0.04em; color: #fff; white-space: nowrap; opacity: 0; will-change: transform, opacity; }
                    .pm-hs-syn    { background: #3b82f6; box-shadow: 0 0 12px rgba(59,130,246,0.75); }
                    .pm-hs-synack { background: #a855f7; box-shadow: 0 0 12px rgba(168,85,247,0.75); }
                    .pm-hs-ack    { background: #10b981; box-shadow: 0 0 12px rgba(16,185,129,0.75); }
                    .pm-hs-syn    { animation: pm-hs-go-right 6s ease-in-out infinite; animation-delay: 0.3s; }
                    .pm-hs-synack { animation: pm-hs-go-left  6s ease-in-out infinite; animation-delay: 2.3s; }
                    .pm-hs-ack    { animation: pm-hs-go-right 6s ease-in-out infinite; animation-delay: 4.3s; }
                    @keyframes pm-hs-go-right { 0% { left: 0%; opacity: 0; transform: translate(-50%,-50%) scale(0.8); } 10% { left: 0%; opacity: 1; transform: translate(-50%,-50%) scale(1); } 40% { left: 100%; opacity: 1; transform: translate(-50%,-50%) scale(1); } 50% { left: 100%; opacity: 0; transform: translate(-50%,-50%) scale(0.8); } 100% { left: 100%; opacity: 0; } }
                    @keyframes pm-hs-go-left  { 0% { left: 100%; opacity: 0; transform: translate(-50%,-50%) scale(0.8); } 10% { left: 100%; opacity: 1; transform: translate(-50%,-50%) scale(1); } 40% { left: 0%; opacity: 1; transform: translate(-50%,-50%) scale(1); } 50% { left: 0%; opacity: 0; transform: translate(-50%,-50%) scale(0.8); } 100% { left: 0%; opacity: 0; } }
                    .pm-hs-legend { display: flex; justify-content: center; gap: 1rem; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 0.75rem; flex-wrap: wrap; font-family: 'Inter', sans-serif; }
                    .pm-hs-legend span { display: inline-flex; align-items: center; gap: 0.35rem; font-family: 'Inter', sans-serif; }
                    .pm-hs-legend i { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
                    .pm-hs-legend .l-syn    i { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
                    .pm-hs-legend .l-synack i { background: #a855f7; box-shadow: 0 0 8px #a855f7; }
                    .pm-hs-legend .l-ack    i { background: #10b981; box-shadow: 0 0 8px #10b981; }
                    .pm-hs-legend .l-syn    { color: #3b82f6; }
                    .pm-hs-legend .l-synack { color: #a855f7; }
                    .pm-hs-legend .l-ack    { color: #10b981; }
                    @media (prefers-reduced-motion: reduce) { .pm-hs-packet { animation: none !important; opacity: 1; left: 50% !important; } }
                </style>
                <div class="pm-hs-stage">
                    <div class="pm-hs-tower">
                        <div class="pm-hs-box">
                            <i class="fa-solid fa-laptop"></i>
                            <span data-lang-de>Client</span><span data-lang-en style="display:none;">Client</span>
                        </div>
                    </div>
                    <div class="pm-hs-tower">
                        <div class="pm-hs-box">
                            <i class="fa-solid fa-server"></i>
                            <span data-lang-de>Server</span><span data-lang-en style="display:none;">Server</span>
                        </div>
                    </div>
                    <div class="pm-hs-track" style="left: calc(50% - 1.75rem); width: 3.5rem;">
                        <div class="pm-hs-track-line"></div>
                        <div class="pm-hs-packet pm-hs-syn">SYN</div>
                    </div>
                    <div class="pm-hs-track" style="left: calc(50% - 1.75rem); width: 3.5rem;">
                        <div class="pm-hs-packet pm-hs-synack">SYN/ACK</div>
                    </div>
                    <div class="pm-hs-track" style="left: calc(50% - 1.75rem); width: 3.5rem;">
                        <div class="pm-hs-packet pm-hs-ack">ACK</div>
                    </div>
                </div>
                <div class="pm-hs-legend">
                    <span class="l-syn"><i></i>SYN</span>
                    <span class="l-synack"><i></i>SYN/ACK</span>
                    <span class="l-ack"><i></i>ACK</span>
                </div>
                `
            },

            /* 3 — DHCP DORA (fixed: horizontal tracks) */
            {
                id: 'vis-dhcp-dora',
                titleDe: 'DHCP — DORA-Ablauf',
                titleEn: 'DHCP — DORA Sequence',
                descDe: 'Discover, Offer, Request, Acknowledge — wie ein Gerät automatisch eine IP bekommt.',
                descEn: 'Discover, Offer, Request, Acknowledge — how a device gets an IP automatically.',
                html: `
                <style>
                    .pm-dora-stage {
                        position: relative;
                        display: grid;
                        grid-template-columns: auto 1fr auto;
                        gap: 0.9rem;
                        align-items: center;
                        max-width: 620px;
                        margin: 0 auto;
                        padding: 1rem 0.5rem;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-dora-tower {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.25rem;
                        padding: 0.7rem 0.85rem;
                        border-radius: 0.55rem;
                        background: var(--panel-color);
                        border: 1px solid var(--border-color);
                        box-shadow: var(--control-shadow);
                        font-size: 0.72rem;
                        font-weight: 700;
                        color: var(--heading-color);
                        white-space: nowrap;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-dora-tower i {
                        font-size: 1.25rem;
                        color: var(--link-color);
                    }
                    .pm-dora-tower span {
                        color: var(--text-muted);
                        font-size: 0.58rem;
                        font-weight: 600;
                        font-family: 'Inter', sans-serif;
                    }

                    .pm-dora-tracks {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        padding: 0.15rem 0;
                    }
                    .pm-dora-track {
                        position: relative;
                        height: 20px;
                    }
                    .pm-dora-track::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 0;
                        right: 0;
                        height: 2px;
                        background: repeating-linear-gradient(
                            90deg,
                            var(--border-color) 0 5px,
                            transparent 5px 10px
                        );
                        opacity: 0.55;
                        transform: translateY(-50%);
                        border-radius: 2px;
                    }

                    .pm-dora-pkt {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translate(-50%, -50%);
                        padding: 0.15rem 0.45rem;
                        border-radius: 0.3rem;
                        font-size: 0.58rem;
                        font-weight: 800;
                        font-family: 'Fira Code', monospace;
                        letter-spacing: 0.04em;
                        color: #fff;
                        white-space: nowrap;
                        opacity: 0;
                        will-change: left, opacity;
                    }
                    .pm-dora-d { background: #3b82f6; box-shadow: 0 0 12px rgba(59, 130, 246, 0.75); }
                    .pm-dora-o { background: #a855f7; box-shadow: 0 0 12px rgba(168, 85, 247, 0.75); }
                    .pm-dora-r { background: #f59e0b; box-shadow: 0 0 12px rgba(245, 158, 11, 0.75); }
                    .pm-dora-a { background: #10b981; box-shadow: 0 0 12px rgba(16, 185, 129, 0.75); }

                    .pm-dora-d { animation: pm-dora-right 8s ease-in-out infinite; animation-delay: 0s; }
                    .pm-dora-o { animation: pm-dora-left  8s ease-in-out infinite; animation-delay: 2s; }
                    .pm-dora-r { animation: pm-dora-right 8s ease-in-out infinite; animation-delay: 4s; }
                    .pm-dora-a { animation: pm-dora-left  8s ease-in-out infinite; animation-delay: 6s; }

                    @keyframes pm-dora-right {
                        0%, 4%    { left: 0%;   opacity: 0; }
                        10%       { left: 0%;   opacity: 1; }
                        22%       { left: 100%; opacity: 1; }
                        26%, 100% { left: 100%; opacity: 0; }
                    }
                    @keyframes pm-dora-left {
                        0%, 4%    { left: 100%; opacity: 0; }
                        10%       { left: 100%; opacity: 1; }
                        22%       { left: 0%;   opacity: 1; }
                        26%, 100% { left: 0%;   opacity: 0; }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .pm-dora-pkt { animation: none !important; opacity: 1; left: 50% !important; }
                    }
                </style>
                <div class="pm-dora-stage">
                    <div class="pm-dora-tower">
                        <i class="fa-solid fa-laptop"></i>
                        <span data-lang-de>Client</span><span data-lang-en style="display:none;">Client</span>
                    </div>
                    <div class="pm-dora-tracks">
                        <div class="pm-dora-track">
                            <div class="pm-dora-pkt pm-dora-d">DISCOVER →</div>
                        </div>
                        <div class="pm-dora-track">
                            <div class="pm-dora-pkt pm-dora-o">← OFFER</div>
                        </div>
                        <div class="pm-dora-track">
                            <div class="pm-dora-pkt pm-dora-r">REQUEST →</div>
                        </div>
                        <div class="pm-dora-track">
                            <div class="pm-dora-pkt pm-dora-a">← ACK</div>
                        </div>
                    </div>
                    <div class="pm-dora-tower">
                        <i class="fa-solid fa-server"></i>
                        <span data-lang-de>DHCP-Server</span><span data-lang-en style="display:none;">DHCP Server</span>
                    </div>
                </div>
                `
            },

            /* 4 — DNS CHAIN */
            {
                id: 'vis-dns-chain',
                titleDe: 'DNS-Auflösung',
                titleEn: 'DNS Resolution',
                descDe: 'Wie aus einem Namen (z.B. example.com) eine IP-Adresse wird — in fünf Schritten.',
                descEn: 'How a name (e.g. example.com) becomes an IP address — in five steps.',
                html: `
                <style>
                    .pm-dns-stage { padding: 1rem 0.5rem 0.5rem; max-width: 640px; margin: 0 auto; font-family: 'Inter', sans-serif; }
                    .pm-dns-row { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.4rem; padding-top: 1.4rem; }
                    .pm-dns-node { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; padding: 0.55rem 0.4rem; border-radius: 0.5rem; background: var(--bg-color); border: 1px solid var(--border-color); font-size: 0.66rem; font-weight: 700; color: var(--heading-color); text-align: center; will-change: transform, border-color, box-shadow; font-family: 'Inter', sans-serif; }
                    .pm-dns-node i { font-size: 1.05rem; opacity: 0.85; }
                    .pm-dns-node span { color: var(--text-muted); font-size: 0.55rem; font-weight: 600; font-family: 'Inter', sans-serif; }
                    .pm-dns-node:nth-child(1) { animation: pm-dns-pulse 8s ease-in-out infinite; animation-delay: 0.2s; }
                    .pm-dns-node:nth-child(2) { animation: pm-dns-pulse 8s ease-in-out infinite; animation-delay: 1.4s; }
                    .pm-dns-node:nth-child(3) { animation: pm-dns-pulse 8s ease-in-out infinite; animation-delay: 2.6s; }
                    .pm-dns-node:nth-child(4) { animation: pm-dns-pulse 8s ease-in-out infinite; animation-delay: 3.8s; }
                    .pm-dns-node:nth-child(5) { animation: pm-dns-pulse 8s ease-in-out infinite; animation-delay: 5.0s; }
                    @keyframes pm-dns-pulse { 0%,100% { transform: translateY(0); border-color: var(--border-color); box-shadow: none; } 6%,16% { transform: translateY(-4px); border-color: #3b82f6; box-shadow: 0 0 18px -6px #3b82f6; } 24% { transform: translateY(0); border-color: var(--border-color); box-shadow: none; } }
                    .pm-dns-track { position: absolute; top: 0.65rem; left: 8%; right: 8%; height: 2px; background: var(--border-color); border-radius: 2px; overflow: hidden; }
                    .pm-dns-query, .pm-dns-response { position: absolute; top: 50%; left: 0; width: 10px; height: 10px; margin-top: -5px; border-radius: 50%; transform: translateX(-50%); will-change: left, opacity; }
                    .pm-dns-query { background: #3b82f6; box-shadow: 0 0 10px #3b82f6; animation: pm-dns-go 8s ease-in-out infinite; }
                    .pm-dns-response { background: #10b981; box-shadow: 0 0 10px #10b981; animation: pm-dns-back 8s ease-in-out infinite; }
                    @keyframes pm-dns-go   { 0%,4% { left: 0%; opacity: 0; } 8% { opacity: 1; } 62% { left: 100%; opacity: 1; } 66% { opacity: 0; } 100% { left: 100%; opacity: 0; } }
                    @keyframes pm-dns-back { 0%,62% { left: 100%; opacity: 0; } 66% { opacity: 1; } 92% { left: 0%; opacity: 1; } 96% { opacity: 0; } 100% { left: 0%; opacity: 0; } }
                    @media (prefers-reduced-motion: reduce) { .pm-dns-node, .pm-dns-query, .pm-dns-response { animation: none !important; } .pm-dns-query, .pm-dns-response { opacity: 1; left: 50% !important; } }
                </style>
                <div class="pm-dns-stage">
                    <div class="pm-dns-track">
                        <div class="pm-dns-query"></div>
                        <div class="pm-dns-response"></div>
                    </div>
                    <div class="pm-dns-row">
                        <div class="pm-dns-node">
                            <i class="fa-solid fa-laptop"></i>
                            <span data-lang-de>Client</span><span data-lang-en style="display:none;">Client</span>
                        </div>
                        <div class="pm-dns-node">
                            <i class="fa-solid fa-tower-broadcast"></i>
                            <span data-lang-de>Resolver</span><span data-lang-en style="display:none;">Resolver</span>
                        </div>
                        <div class="pm-dns-node">
                            <i class="fa-solid fa-server"></i>
                            <span>Root</span>
                        </div>
                        <div class="pm-dns-node">
                            <i class="fa-solid fa-tree"></i>
                            <span>TLD (.com)</span>
                        </div>
                        <div class="pm-dns-node">
                            <i class="fa-solid fa-file-code"></i>
                            <span data-lang-de>Authoritativ</span><span data-lang-en style="display:none;">Authoritative</span>
                        </div>
                    </div>
                </div>
                `
            },

            /* 5 — TCP vs UDP (side by side) */
            {
                id: 'vis-tcp-udp',
                titleDe: 'TCP vs. UDP',
                titleEn: 'TCP vs. UDP',
                descDe: 'Zuverlässig mit Bestätigung (TCP) gegen schnell ohne Garantie (UDP).',
                descEn: 'Reliable with acknowledgment (TCP) versus fast without guarantees (UDP).',
                html: `
                <style>
                    .pm-udp-stage { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; padding: 0.5rem 0; max-width: 640px; margin: 0 auto; font-family: 'Inter', sans-serif; }
                    @media (max-width: 640px) { .pm-udp-stage { grid-template-columns: 1fr; } }
                    .pm-udp-col { position: relative; padding: 0.75rem 0.85rem; border-radius: 0.55rem; background: var(--panel-color); border: 1px solid var(--panel-border); box-shadow: var(--control-shadow); overflow: hidden; font-family: 'Inter', sans-serif; }
                    .pm-udp-title { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.5rem; font-family: 'Inter', sans-serif; }
                    .pm-udp-col.tcp .pm-udp-title i { color: #10b981; }
                    .pm-udp-col.udp .pm-udp-title i { color: #f59e0b; }
                    .pm-udp-line { position: relative; height: 44px; margin-top: 0.15rem; }
                    .pm-udp-line::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: repeating-linear-gradient(90deg, var(--border-color) 0 6px, transparent 6px 12px); opacity: 0.7; transform: translateY(-50%); }
                    .pm-udp-end { position: absolute; top: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; border-radius: 50%; background: var(--border-color); }
                    .pm-udp-end.left { left: 0%; }
                    .pm-udp-end.right { left: 100%; }
                    .pm-udp-pkt { position: absolute; top: 50%; left: 0; width: 12px; height: 12px; margin-top: -6px; border-radius: 3px; transform: translateX(-50%); opacity: 0; will-change: left, opacity; }
                    .tcp .pm-udp-pkt { background: #10b981; box-shadow: 0 0 10px #10b981; animation: pm-udp-tcp-go 4s ease-in-out infinite; }
                    .tcp .pm-udp-pkt:nth-of-type(1) { animation-delay: 0s; }
                    .tcp .pm-udp-pkt:nth-of-type(2) { animation-delay: 2s; }
                    .udp .pm-udp-pkt { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; animation: pm-udp-udp-go 1.4s linear infinite; }
                    .udp .pm-udp-pkt:nth-of-type(1) { animation-delay: 0s; }
                    .udp .pm-udp-pkt:nth-of-type(2) { animation-delay: 0.35s; }
                    .udp .pm-udp-pkt:nth-of-type(3) { animation-delay: 0.7s; }
                    .udp .pm-udp-pkt:nth-of-type(4) { animation-delay: 1.05s; }
                    @keyframes pm-udp-tcp-go { 0%,10% { left: 0%; opacity: 0; } 14% { opacity: 1; } 40% { left: 100%; opacity: 1; } 44% { opacity: 0; } 100% { left: 100%; opacity: 0; } }
                    @keyframes pm-udp-udp-go { 0% { left: 0%; opacity: 0; } 10% { opacity: 1; } 90% { left: 100%; opacity: 1; } 100% { left: 100%; opacity: 0; } }
                    .pm-udp-ack { position: absolute; top: calc(50% + 12px); right: 0; font-size: 0.5rem; font-weight: 800; font-family: 'Fira Code', monospace; color: #10b981; letter-spacing: 0.05em; animation: pm-udp-ack-pulse 2s ease-in-out infinite; }
                    @keyframes pm-udp-ack-pulse { 0%,100% { opacity: 0.15; transform: translateX(6px); } 40%,60% { opacity: 1; transform: translateX(0); } }
                    .pm-udp-caption { font-size: 0.6rem; color: var(--text-muted); line-height: 1.4; margin-top: 0.35rem; font-family: 'Inter', sans-serif; }
                    @media (prefers-reduced-motion: reduce) { .pm-udp-pkt, .pm-udp-ack { animation: none !important; opacity: 1; left: 50% !important; } }
                </style>
                <div class="pm-udp-stage">
                    <div class="pm-udp-col tcp">
                        <div class="pm-udp-title">
                            <i class="fa-solid fa-shield-halved"></i>
                            <span>TCP</span>
                        </div>
                        <div class="pm-udp-line">
                            <div class="pm-udp-end left"></div>
                            <div class="pm-udp-end right"></div>
                            <div class="pm-udp-pkt"></div>
                            <div class="pm-udp-pkt"></div>
                            <div class="pm-udp-ack">✓ ACK</div>
                        </div>
                        <p class="pm-udp-caption">
                            <span data-lang-de>Bestätigt jedes Paket — langsamer, aber zuverlässig.</span>
                            <span data-lang-en style="display:none;">Acknowledges every packet — slower, but reliable.</span>
                        </p>
                    </div>
                    <div class="pm-udp-col udp">
                        <div class="pm-udp-title">
                            <i class="fa-solid fa-bolt"></i>
                            <span>UDP</span>
                        </div>
                        <div class="pm-udp-line">
                            <div class="pm-udp-end left"></div>
                            <div class="pm-udp-end right"></div>
                            <div class="pm-udp-pkt"></div>
                            <div class="pm-udp-pkt"></div>
                            <div class="pm-udp-pkt"></div>
                            <div class="pm-udp-pkt"></div>
                        </div>
                        <p class="pm-udp-caption">
                            <span data-lang-de>Schickt einfach drauflos — schneller, aber ohne Garantie.</span>
                            <span data-lang-en style="display:none;">Just fires away — faster, but without guarantees.</span>
                        </p>
                    </div>
                </div>
                `
            },

            /* 6 — SUBNETTING / CIDR BAR */
            {
                id: 'vis-subnetting',
                titleDe: 'Subnetting mit CIDR',
                titleEn: 'Subnetting with CIDR',
                descDe: 'Ein /24 wird nacheinander in /25, /26, /27 und /28 aufgeteilt — die Netz- und Host-Bits verschieben sich sichtbar.',
                descEn: 'A /24 is successively split into /25, /26, /27 and /28 — the network and host bits visibly shift.',
                html: `
                <style>
                    .pm-sub-stage {
                        max-width: 560px;
                        margin: 0 auto;
                        padding: 0.75rem 0.5rem;
                        display: flex;
                        flex-direction: column;
                        gap: 0.75rem;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-sub-row {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                    }
                    .pm-sub-label {
                        flex-shrink: 0;
                        width: 3.5rem;
                        text-align: right;
                        font-family: 'Fira Code', monospace;
                        font-size: 0.72rem;
                        font-weight: 800;
                        color: var(--heading-color);
                        letter-spacing: 0.03em;
                    }
                    .pm-sub-bar {
                        position: relative;
                        flex: 1;
                        height: 26px;
                        border-radius: 0.3rem;
                        overflow: hidden;
                        display: flex;
                        border: 1px solid var(--border-color);
                        background: var(--bg-color);
                    }
                    .pm-sub-seg {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.55rem;
                        font-weight: 800;
                        letter-spacing: 0.04em;
                        text-transform: uppercase;
                        color: #fff;
                        border-right: 1px solid var(--bg-color);
                        font-family: 'Inter', sans-serif;
                        will-change: opacity;
                    }
                    .pm-sub-seg:last-child { border-right: none; }
                    .pm-sub-net { background: #3b82f6; }
                    .pm-sub-host { background: #10b981; }

                    .pm-sub-bar .pm-sub-net { animation: pm-sub-net-pulse 6s ease-in-out infinite; }
                    @keyframes pm-sub-net-pulse {
                        0%, 100% { opacity: 0.75; }
                        50%      { opacity: 1; }
                    }
                    .pm-sub-row:nth-child(1) .pm-sub-bar { animation-delay: 0s; }
                    .pm-sub-row:nth-child(2) .pm-sub-bar { animation-delay: 0.6s; }
                    .pm-sub-row:nth-child(3) .pm-sub-bar { animation-delay: 1.2s; }
                    .pm-sub-row:nth-child(4) .pm-sub-bar { animation-delay: 1.8s; }

                    .pm-sub-legend {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                        font-size: 0.62rem;
                        font-weight: 700;
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                        margin-top: 0.35rem;
                        font-family: 'Inter', sans-serif;
                    }
                    .pm-sub-legend span { display: inline-flex; align-items: center; gap: 0.35rem; font-family: 'Inter', sans-serif; }
                    .pm-sub-legend i {
                        width: 10px;
                        height: 10px;
                        border-radius: 2px;
                        display: inline-block;
                    }
                    .pm-sub-legend .l-net  i { background: #3b82f6; }
                    .pm-sub-legend .l-host i { background: #10b981; }
                    .pm-sub-legend .l-net  { color: #3b82f6; }
                    .pm-sub-legend .l-host { color: #10b981; }

                    @media (prefers-reduced-motion: reduce) {
                        .pm-sub-bar .pm-sub-net { animation: none !important; opacity: 1; }
                    }
                </style>
                <div class="pm-sub-stage">
                    <div class="pm-sub-row">
                        <div class="pm-sub-label">/24</div>
                        <div class="pm-sub-bar">
                            <div class="pm-sub-seg pm-sub-net" style="flex: 24;">Netz</div>
                            <div class="pm-sub-seg pm-sub-host" style="flex: 8;">Host</div>
                        </div>
                    </div>
                    <div class="pm-sub-row">
                        <div class="pm-sub-label">/25</div>
                        <div class="pm-sub-bar">
                            <div class="pm-sub-seg pm-sub-net" style="flex: 25;">Netz</div>
                            <div class="pm-sub-seg pm-sub-host" style="flex: 7;">Host</div>
                        </div>
                    </div>
                    <div class="pm-sub-row">
                        <div class="pm-sub-label">/26</div>
                        <div class="pm-sub-bar">
                            <div class="pm-sub-seg pm-sub-net" style="flex: 26;">Netz</div>
                            <div class="pm-sub-seg pm-sub-host" style="flex: 6;">Host</div>
                        </div>
                    </div>
                    <div class="pm-sub-row">
                        <div class="pm-sub-label">/28</div>
                        <div class="pm-sub-bar">
                            <div class="pm-sub-seg pm-sub-net" style="flex: 28;">Netz</div>
                            <div class="pm-sub-seg pm-sub-host" style="flex: 4;">Host</div>
                        </div>
                    </div>
                    <div class="pm-sub-legend">
                        <span class="l-net"><i></i><span data-lang-de>Netzwerk-Bits</span><span data-lang-en style="display:none;">Network bits</span></span>
                        <span class="l-host"><i></i><span data-lang-de>Host-Bits</span><span data-lang-en style="display:none;">Host bits</span></span>
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
            { icon: 'fa-book',          href: 'https://www.rfc-editor.org/', target: '_blank', labelDe: 'RFC Editor (alle Standards)', labelEn: 'RFC Editor (all standards)' },
            { icon: 'fa-globe',         href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', target: '_blank', labelDe: 'MDN: HTTP Übersicht', labelEn: 'MDN: HTTP Overview' },
            { icon: 'fa-bolt',          href: 'https://www.rfc-editor.org/rfc/rfc9000.html', target: '_blank', labelDe: 'RFC 9000 — QUIC', labelEn: 'RFC 9000 — QUIC' },
            { icon: 'fa-sitemap',       href: 'https://www.rfc-editor.org/rfc/rfc1918', target: '_blank', labelDe: 'RFC 1918 — Private Adressen', labelEn: 'RFC 1918 — Private addresses' },
            { icon: 'fa-wikipedia-w',   href: 'https://de.wikipedia.org/wiki/IPv6', target: '_blank', labelDe: 'Wikipedia: IPv6', labelEn: 'Wikipedia: IPv6' }
        ]
    },

    footer: {
        textDe: 'Internet-Protokolle · Moderne Praxis 2026',
        textEn: 'Internet Protocols · Modern Practice 2026'
    }
});