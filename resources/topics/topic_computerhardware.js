// resources/topics/topic_hardwarehardware.js
// Registers a topic covering computer hardware and network hardware.
// Loaded via <script> injection.

registerTopic({
    id: 'Hardware',
    // parentId: 'IT Basics', // Uncomment and set if you want to nest this under a parent topic.

    icon: 'fa-microchip',
    titleDe: 'Computer & Hardware',
    titleEn: 'Computer & Hardware',
    descDe: 'Computer-Hardware und Netzwerk-Hardware im Überblick.',
    descEn: 'An overview of computer hardware and network hardware.',

    sidebarTitleDe: 'Hardware',
    sidebarTitleEn: 'Hardware',
    sidebarSubtitleDe: 'Computer & Netzwerk',
    sidebarSubtitleEn: 'Computer & Network',
    sidebarVersion: 'Hardware v1.0',

    hero: {
        titleDe: 'Hardware: Computer und Netzwerk',
        titleEn: 'Hardware: Computer and Network',
        introDe: 'Hardware bezeichnet alle physischen Komponenten eines Computersystems oder Netzwerks. Dazu gehören interne Bauteile wie CPU, RAM und Mainboard sowie externe Geräte wie Tastatur, Maus und Monitor. Netzwerk-Hardware umfasst Geräte wie Router, Switches und Netzwerkkabel, die die Kommunikation zwischen Computern ermöglichen. Dieser Überblick zeigt die wichtigsten Komponenten und ihre Funktionen. Ein Beispiel für eine <a href="#subsection4_1">interne Referenz</a> finden Sie hier.',
        introEn: 'Hardware refers to all physical components of a computer system or network. This includes internal parts such as CPU, RAM, and motherboard, as well as external devices like keyboard, mouse, and monitor. Network hardware includes devices such as routers, switches, and network cables that enable communication between computers. This overview shows the most important components and their functions. An example of an <a href="#subsection4_1">internal reference</a> can be found here.'
    },

    quickLinks: [
        { icon: 'fa-desktop',           href: '#section1', switchToDoc: true, labelDe: 'Computer-Hardware', labelEn: 'Computer Hardware' },
        { icon: 'fa-network-wired',     href: '#section2', switchToDoc: true, labelDe: 'Netzwerk-Hardware', labelEn: 'Network Hardware' },
        { icon: 'fa-exchange-alt',      href: '#section3', switchToDoc: true, labelDe: 'Zusammenspiel', labelEn: 'Interaction' },
        { icon: 'fa-external-link-alt', href: 'https://de.wikipedia.org/wiki/Hardware', target: '_blank', labelDe: 'Wikipedia: Hardware', labelEn: 'Wikipedia: Hardware' }
    ],

    sections: [
        {
            id: 'section1',
            titleDe: 'Computer-Hardware',
            titleEn: 'Computer Hardware',
            introDe: 'Computer-Hardware umfasst alle physischen Bestandteile eines Computers. Man unterscheidet interne Komponenten, die sich im Gehäuse befinden, und Peripheriegeräte, die extern angeschlossen werden.',
            introEn: 'Computer hardware includes all physical components of a computer. A distinction is made between internal components located inside the case and peripheral devices connected externally.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Interne Komponenten',
                    titleEn: 'Internal Components',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Komponente</th><th>Funktion</th></tr>
                    <tr><td><strong>CPU (Prozessor)</strong></td><td class="text-[var(--text-muted)]">Führt Berechnungen und logische Operationen aus. Das "Gehirn" des Computers.</td></tr>
                    <tr><td><strong>RAM (Arbeitsspeicher)</strong></td><td class="text-[var(--text-muted)]">Speichert temporär Daten und Programme, auf die die CPU schnell zugreifen muss.</td></tr>
                    <tr><td><strong>Mainboard (Hauptplatine)</strong></td><td class="text-[var(--text-muted)]">Verbindet alle Komponenten miteinander und ermöglicht die Kommunikation.</td></tr>
                    <tr><td><strong>GPU (Grafikkarte)</strong></td><td class="text-[var(--text-muted)]">Berechnet grafische Inhalte und gibt sie an den Monitor aus.</td></tr>
                    <tr><td><strong>Netzteil</strong></td><td class="text-[var(--text-muted)]">Versorgt alle Komponenten mit Strom.</td></tr>
                    <tr><td><strong>Festplatte / SSD</strong></td><td class="text-[var(--text-muted)]">Speichert Daten dauerhaft, auch wenn der Computer ausgeschaltet ist.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Component</th><th>Function</th></tr>
                    <tr><td><strong>CPU (Processor)</strong></td><td class="text-[var(--text-muted)]">Performs calculations and logical operations. The "brain" of the computer.</td></tr>
                    <tr><td><strong>RAM (Memory)</strong></td><td class="text-[var(--text-muted)]">Temporarily stores data and programs that the CPU needs to access quickly.</td></tr>
                    <tr><td><strong>Motherboard</strong></td><td class="text-[var(--text-muted)]">Connects all components and enables communication between them.</td></tr>
                    <tr><td><strong>GPU (Graphics Card)</strong></td><td class="text-[var(--text-muted)]">Computes graphical content and outputs it to the monitor.</td></tr>
                    <tr><td><strong>Power Supply</strong></td><td class="text-[var(--text-muted)]">Supplies power to all components.</td></tr>
                    <tr><td><strong>Hard Drive / SSD</strong></td><td class="text-[var(--text-muted)]">Stores data permanently, even when the computer is turned off.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Peripheriegeräte',
                    titleEn: 'Peripheral Devices',
                    htmlDe: `
                    <p class="text-xs">Peripheriegeräte werden extern an den Computer angeschlossen und erweitern dessen Funktionen:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Eingabegeräte:</strong> Tastatur, Maus, Scanner, Mikrofon, Webcam.</li>
                    <li><strong>Ausgabegeräte:</strong> Monitor, Drucker, Lautsprecher, Projektor.</li>
                    <li><strong>Speichergeräte:</strong> Externe Festplatten, USB-Sticks, Speicherkarten.</li>
                    <li><strong>Kommunikationsgeräte:</strong> Netzwerkadapter, Modems, Router (siehe Netzwerk-Hardware).</li>
                    </ul>
                    `,
                    htmlEn: `
                    <p class="text-xs">Peripheral devices are connected externally to the computer and extend its functions:</p>
                    <ul class="list-disc pl-4 mt-1.5 space-y-0.5 text-xs text-[var(--text-muted)]">
                    <li><strong>Input devices:</strong> Keyboard, mouse, scanner, microphone, webcam.</li>
                    <li><strong>Output devices:</strong> Monitor, printer, speakers, projector.</li>
                    <li><strong>Storage devices:</strong> External hard drives, USB sticks, memory cards.</li>
                    <li><strong>Communication devices:</strong> Network adapters, modems, routers (see Network Hardware).</li>
                    </ul>
                    `
                }
            ]
        },

        {
            id: 'section2',
            titleDe: 'Netzwerk-Hardware',
            titleEn: 'Network Hardware',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Netzwerkgeräte',
                    titleEn: 'Network Devices',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Gerät</th><th>Funktion</th></tr>
                    <tr><td><strong>Router</strong></td><td class="text-[var(--text-muted)]">Verbindet verschiedene Netzwerke (z. B. Heimnetz mit Internet) und leitet Datenpakete weiter.</td></tr>
                    <tr><td><strong>Switch</strong></td><td class="text-[var(--text-muted)]">Verbindet Geräte innerhalb eines Netzwerks und leitet Daten gezielt an den richtigen Port weiter.</td></tr>
                    <tr><td><strong>Hub</strong></td><td class="text-[var(--text-muted)]">Verbindet Geräte, leitet Daten aber an alle Ports weiter (veraltet, meist durch Switches ersetzt).</td></tr>
                    <tr><td><strong>Modem</strong></td><td class="text-[var(--text-muted)]">Wandelt Signale für die Übertragung über Telefon-, Kabel- oder Glasfaserleitungen um.</td></tr>
                    <tr><td><strong>Access Point</strong></td><td class="text-[var(--text-muted)]">Ermöglicht drahtlosen Zugang (WLAN) zum Netzwerk.</td></tr>
                    <tr><td><strong>Netzwerkkarte (NIC)</strong></td><td class="text-[var(--text-muted)]">Ermöglicht einem Computer die Verbindung zum Netzwerk (kabelgebunden oder drahtlos).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Device</th><th>Function</th></tr>
                    <tr><td><strong>Router</strong></td><td class="text-[var(--text-muted)]">Connects different networks (e.g., home network to the internet) and forwards data packets.</td></tr>
                    <tr><td><strong>Switch</strong></td><td class="text-[var(--text-muted)]">Connects devices within a network and forwards data specifically to the correct port.</td></tr>
                    <tr><td><strong>Hub</strong></td><td class="text-[var(--text-muted)]">Connects devices but forwards data to all ports (outdated, mostly replaced by switches).</td></tr>
                    <tr><td><strong>Modem</strong></td><td class="text-[var(--text-muted)]">Converts signals for transmission over telephone, cable, or fiber optic lines.</td></tr>
                    <tr><td><strong>Access Point</strong></td><td class="text-[var(--text-muted)]">Enables wireless access (Wi-Fi) to the network.</td></tr>
                    <tr><td><strong>Network Interface Card (NIC)</strong></td><td class="text-[var(--text-muted)]">Enables a computer to connect to the network (wired or wireless).</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Netzwerkkabel und Übertragungsmedien',
                    titleEn: 'Network Cables and Transmission Media',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Ethernet-Kabel (Twisted Pair):</strong> Am häufigsten verwendet, z. B. Cat 5e, Cat 6, Cat 7. Bietet hohe Geschwindigkeiten (1 Gbit/s bis 10 Gbit/s).</li>
                    <li><strong>Glasfaserkabel:</strong> Überträgt Daten als Lichtsignale. Sehr hohe Geschwindigkeiten und große Reichweiten, aber teurer.</li>
                    <li><strong>Koaxialkabel:</strong> Wird oft für Kabelinternet und Fernsehen verwendet. Robust, aber geringere Geschwindigkeiten als Glasfaser.</li>
                    <li><strong>WLAN (Funk):</strong> Drahtlose Übertragung über Funkwellen. Standard: IEEE 802.11 (a/b/g/n/ac/ax).</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>Ethernet Cable (Twisted Pair):</strong> Most commonly used, e.g., Cat 5e, Cat 6, Cat 7. Provides high speeds (1 Gbit/s to 10 Gbit/s).</li>
                    <li><strong>Fiber Optic Cable:</strong> Transmits data as light signals. Very high speeds and long ranges, but more expensive.</li>
                    <li><strong>Coaxial Cable:</strong> Often used for cable internet and television. Robust, but lower speeds than fiber optic.</li>
                    <li><strong>Wi-Fi (Wireless):</strong> Wireless transmission via radio waves. Standard: IEEE 802.11 (a/b/g/n/ac/ax).</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section3',
            titleDe: 'Zusammenspiel von Computer- und Netzwerk-Hardware',
            titleEn: 'Interaction of Computer and Network Hardware',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Wie alles zusammenarbeitet',
                    titleEn: 'How Everything Works Together',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[20%]">Ebene</th><th>Komponenten</th></tr>
                    <tr><td><strong>Client</strong></td><td class="text-[var(--text-muted)]">Computer mit CPU, RAM, Netzwerkkarte und Betriebssystem, der Dienste anfordert.</td></tr>
                    <tr><td><strong>Netzwerk</strong></td><td class="text-[var(--text-muted)]">Router, Switches, Kabel und Access Points, die Daten zwischen Clients und Servern transportieren.</td></tr>
                    <tr><td><strong>Server</strong></td><td class="text-[var(--text-muted)]">Leistungsstarker Computer, der Dienste wie Webseiten, E-Mail oder Dateispeicher bereitstellt.</td></tr>
                    <tr><td><strong>Peripherie</strong></td><td class="text-[var(--text-muted)]">Drucker, Scanner und externe Speicher, die über das Netzwerk gemeinsam genutzt werden können.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-[20%]">Layer</th><th>Components</th></tr>
                    <tr><td><strong>Client</strong></td><td class="text-[var(--text-muted)]">Computer with CPU, RAM, network card, and operating system that requests services.</td></tr>
                    <tr><td><strong>Network</strong></td><td class="text-[var(--text-muted)]">Routers, switches, cables, and access points that transport data between clients and servers.</td></tr>
                    <tr><td><strong>Server</strong></td><td class="text-[var(--text-muted)]">High-performance computer that provides services such as websites, email, or file storage.</td></tr>
                    <tr><td><strong>Peripherals</strong></td><td class="text-[var(--text-muted)]">Printers, scanners, and external storage that can be shared over the network.</td></tr>
                    </table>
                    </div>
                    `
                }
            ]
        },

        {
            id: 'section4',
            titleDe: 'Referenzen',
            titleEn: 'References',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Interne Referenzen',
                    titleEn: 'Internal References',
                    htmlDe: `<p class="text-xs">Weitere Details zu Netzwerkgeräten finden Sie in <a href="#subsection2_1">Netzwerkgeräte</a>. Informationen zu Peripheriegeräten finden Sie in <a href="#subsection1_2">Peripheriegeräte</a>.</p>`,
                    htmlEn: `<p class="text-xs">For more details on network devices, see <a href="#subsection2_1">Network Devices</a>. For information on peripheral devices, see <a href="#subsection1_2">Peripheral Devices</a>.</p>`
                }
            ]
        },

        {
            id: 'section5',
            titleDe: 'Fazit',
            titleEn: 'Conclusion',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Zusammenfassung',
                    titleEn: 'Summary',
                    htmlDe: `<p class="text-xs">Computer-Hardware und Netzwerk-Hardware bilden gemeinsam die physische Grundlage moderner IT-Systeme. Während Computer-Hardware die Rechenleistung und Speicherung bereitstellt, ermöglicht Netzwerk-Hardware die Kommunikation und den Datenaustausch zwischen Geräten. Gehen Sie nach <a href="#top">oben</a> für einen Neuanfang.</p>`,
                    htmlEn: `<p class="text-xs">Computer hardware and network hardware together form the physical foundation of modern IT systems. While computer hardware provides computing power and storage, network hardware enables communication and data exchange between devices. Go to the <a href="#top">top</a> for a fresh start.</p>`
                }
            ]
        },

        /* --- TLDR --- */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Eine kurze, einfache Zusammenfassung der Hardware-Grundlagen.',
            introEn: 'A short, easy summary of the hardware basics.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Computer-Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Interne Komponenten wie CPU, RAM, Mainboard und GPU sowie Peripheriegeräte wie Tastatur, Maus und Monitor.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-network-wired opacity-70"></i><span>2. Netzwerk-Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Router, Switches, Modems, Access Points und Netzwerkkabel ermöglichen die Kommunikation zwischen Geräten.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-exchange-alt opacity-70"></i><span>3. Zusammenspiel</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Clients, Netzwerk und Server arbeiten zusammen, um Dienste wie Webseiten, E-Mail und Dateiaustausch zu ermöglichen.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>4. Grundlage der IT</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Computer- und Netzwerk-Hardware bilden die physische Basis für alle modernen IT-Systeme und Anwendungen.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-microchip opacity-70"></i><span>1. Computer Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Internal components like CPU, RAM, motherboard, and GPU, as well as peripherals like keyboard, mouse, and monitor.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-network-wired opacity-70"></i><span>2. Network Hardware</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Routers, switches, modems, access points, and network cables enable communication between devices.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-exchange-alt opacity-70"></i><span>3. Interaction</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Clients, network, and servers work together to enable services like websites, email, and file sharing.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-puzzle-piece opacity-70"></i><span>4. Foundation of IT</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Computer and network hardware form the physical basis for all modern IT systems and applications.</p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    /* =============================================================
       ILLUSTRATIONS — pure CSS/SVG block-layer-stack animations
       ============================================================= */
    illustrations: {
        titleDe: 'Hardware-Illustrationen',
        titleEn: 'Hardware Illustrations',
        introDe: 'Zwei animierte Blockdiagramme: der Schichtenaufbau eines Computers und der Datenfluss durch die Hardwareschichten.',
        introEn: 'Two animated block diagrams: the layered structure of a computer and the data flow through the hardware layers.',
        animations: [

            /* ============================================================
               1) BLOCK-LAYER-STACK — How a Computer Works
               Bottom → top: Power → Mainboard → CPU → RAM → Storage →
               I/O → OS/Apps. Each block pulses in sequence.
               ============================================================ */
           
               {
    id: 'hardware-vis-layer-stack',
    titleDe: 'Wie ein Computer funktioniert',
    titleEn: 'How a Computer Works',
    descDe: 'Der schichtweise Aufbau eines Computers – vom Einschalten bis zum laufenden Betriebssystem. Von unten nach oben: Stromversorgung → Mainboard & Chipsatz → CPU (Recheneinheit) → RAM (Kurzzeitspeicher) → Speicher (SSD/HDD) → BIOS/UEFI (Firmware) → Bootloader → Betriebssystem-Kernel → Betriebssystem → Anwendungen. Jede Schicht baut auf der darunterliegenden auf und übergibt die Kontrolle an die nächste.',
    descEn: 'The layered structure of a computer — from power-on to a running operating system. From bottom to top: Power Supply → Motherboard & Chipset → CPU (Processing Unit) → RAM (Short-term Memory) → Storage (SSD/HDD) → BIOS/UEFI (Firmware) → Bootloader → OS Kernel → Operating System → Applications. Each layer builds upon the one below and hands control to the next.',
    html: `
    <style>
        .hw-ls-wrap {
            max-width: 620px;
            margin: 0.5rem auto;
            display: flex;
            flex-direction: column-reverse;   /* bottom-up stacking */
            gap: 5px;
        }
        .hw-ls-block {
            display: flex;
            align-items: center;
            gap: 0.7rem;
            padding: 0.55rem 0.85rem;
            border-radius: 0.55rem;
            border: 1.5px solid var(--border-color);
            background: var(--code-bg);
            color: var(--text-color);
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.01em;
            position: relative;
            overflow: hidden;
            animation: hw-ls-glow 20s ease-in-out infinite;
            animation-delay: calc(var(--hw-ls-i) * 2s);
            will-change: transform, border-color, box-shadow;
        }
        .hw-ls-block i {
            font-size: 0.9rem;
            opacity: 0.85;
            color: var(--hw-ls-c);
            width: 1.1rem;
            text-align: center;
            flex-shrink: 0;
        }
        .hw-ls-block .hw-ls-label {
            flex: 1;
            line-height: 1.25;
        }
        .hw-ls-block .hw-ls-sub {
            display: block;
            font-size: 0.62rem;
            font-weight: 500;
            color: var(--text-muted);
            margin-top: 1px;
            letter-spacing: 0;
        }
        .hw-ls-block .hw-ls-tag {
            font-size: 0.55rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--text-muted);
            opacity: 0.7;
            flex-shrink: 0;
        }
        .hw-ls-block::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 4px;
            background: var(--hw-ls-c);
            opacity: 0.85;
        }
        /* upward connector between layers */
        .hw-ls-block::after {
            content: '';
            position: absolute;
            left: 1.5rem;
            top: -5px;
            width: 2px;
            height: 5px;
            background: linear-gradient(to top, var(--hw-ls-c), transparent);
            opacity: 0.55;
        }
        .hw-ls-wrap > .hw-ls-block:first-child::after { display: none; }

        /* visual separation: hardware vs firmware vs software */
        .hw-ls-sep {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 4px 0;
            padding: 0 0.2rem;
            font-size: 0.55rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--text-muted);
            opacity: 0.75;
        }
        .hw-ls-sep::before,
        .hw-ls-sep::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--border-color);
        }

        @keyframes hw-ls-glow {
            0%, 100% { transform: translateX(0);    border-color: var(--border-color); box-shadow: none; }
            1.2%, 3.8% { transform: translateX(6px); border-color: var(--hw-ls-c);    box-shadow: 0 0 22px -6px var(--hw-ls-c); }
            5%       { transform: translateX(0);    border-color: var(--border-color); box-shadow: none; }
        }

        @media (prefers-reduced-motion: reduce) {
            .hw-ls-block { animation: none !important; }
        }
        @media (max-width: 480px) {
            .hw-ls-block { font-size: 0.68rem; padding: 0.45rem 0.65rem; }
            .hw-ls-block .hw-ls-tag { display: none; }
            .hw-ls-block .hw-ls-sub { font-size: 0.58rem; }
        }
    </style>

    <div class="hw-ls-wrap">
        <!-- order in DOM: top → bottom, but column-reverse flips it visually.
             Animation delay increases going UP the visual stack. -->

        <!-- ===================== APPLICATIONS ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:9; --hw-ls-c:#a855f7;">
            <i class="fa-solid fa-window-maximize"></i>
            <span class="hw-ls-label">
                <span data-lang-de>Anwendungen</span>
                <span data-lang-en style="display:none;">Applications</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Browser, Office, Spiele – nutzen das OS über APIs.</span>
                    <span data-lang-en style="display:none;">Browser, Office, games — use the OS via APIs.</span>
                </span>
            </span>
            <span class="hw-ls-tag">10</span>
        </div>

        <!-- ===================== OPERATING SYSTEM ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:8; --hw-ls-c:#8b5cf6;">
            <i class="fa-solid fa-desktop"></i>
            <span class="hw-ls-label">
                <span data-lang-de>Betriebssystem (OS)</span>
                <span data-lang-en style="display:none;">Operating System (OS)</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Windows, Linux, macOS – Dateisystem, Treiber, Benutzeroberfläche.</span>
                    <span data-lang-en style="display:none;">Windows, Linux, macOS — file system, drivers, UI.</span>
                </span>
            </span>
            <span class="hw-ls-tag">09</span>
        </div>

        <!-- ===================== KERNEL ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:7; --hw-ls-c:#6366f1;">
            <i class="fa-solid fa-gears"></i>
            <span class="hw-ls-label">
                <span data-lang-de>Betriebssystem-Kernel</span>
                <span data-lang-en style="display:none;">OS Kernel</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Verwaltet CPU, Speicher und Geräte – Herzstück des OS.</span>
                    <span data-lang-en style="display:none;">Manages CPU, memory, and devices — the core of the OS.</span>
                </span>
            </span>
            <span class="hw-ls-tag">08</span>
        </div>

        <!-- ===================== BOOTLOADER ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:6; --hw-ls-c:#0ea5e9;">
            <i class="fa-solid fa-boot"></i>
            <span class="hw-ls-label">
                <span data-lang-de>Bootloader</span>
                <span data-lang-en style="display:none;">Bootloader</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>GRUB, Windows Boot Manager – lädt den Kernel in den RAM.</span>
                    <span data-lang-en style="display:none;">GRUB, Windows Boot Manager — loads the kernel into RAM.</span>
                </span>
            </span>
            <span class="hw-ls-tag">07</span>
        </div>

        <!-- ===================== BIOS / UEFI ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:5; --hw-ls-c:#14b8a6;">
            <i class="fa-solid fa-microchip"></i>
            <span class="hw-ls-label">
                <span data-lang-de>BIOS / UEFI (Firmware)</span>
                <span data-lang-en style="display:none;">BIOS / UEFI (Firmware)</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Erste Software nach dem Einschalten – initialisiert Hardware (POST).</span>
                    <span data-lang-en style="display:none;">First software after power-on — initialises hardware (POST).</span>
                </span>
            </span>
            <span class="hw-ls-tag">06</span>
        </div>

        <!-- ---------- separation: firmware vs hardware ---------- -->
        <div class="hw-ls-sep">
            <span data-lang-de>Firmware ↑ · Hardware ↓</span>
            <span data-lang-en style="display:none;">Firmware ↑ · Hardware ↓</span>
        </div>

        <!-- ===================== STORAGE ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:4; --hw-ls-c:#f59e0b;">
            <i class="fa-solid fa-hard-drive"></i>
            <span class="hw-ls-label">
                <span data-lang-de>Speicher (SSD/HDD, Langzeitspeicher)</span>
                <span data-lang-en style="display:none;">Storage (SSD/HDD, Long-term Memory)</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Enthält BIOS/UEFI, Bootloader, OS und alle Daten dauerhaft.</span>
                    <span data-lang-en style="display:none;">Holds BIOS/UEFI, bootloader, OS, and all data permanently.</span>
                </span>
            </span>
            <span class="hw-ls-tag">05</span>
        </div>

        <!-- ===================== RAM ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:3; --hw-ls-c:#10b981;">
            <i class="fa-solid fa-memory"></i>
            <span class="hw-ls-label">
                <span data-lang-de>RAM (Arbeitsspeicher, Kurzzeitspeicher)</span>
                <span data-lang-en style="display:none;">RAM (Memory, Short-term)</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Hier wird der OS-Kernel nach dem Bootvorgang geladen.</span>
                    <span data-lang-en style="display:none;">The OS kernel is loaded here after the boot process.</span>
                </span>
            </span>
            <span class="hw-ls-tag">04</span>
        </div>

        <!-- ===================== CPU ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:2; --hw-ls-c:#3b82f6;">
            <i class="fa-solid fa-microchip"></i>
            <span class="hw-ls-label">
                <span data-lang-de>CPU (Prozessor, Recheneinheit)</span>
                <span data-lang-en style="display:none;">CPU (Processor, Processing Unit)</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Führt den BIOS-Code und später den OS-Kernel aus.</span>
                    <span data-lang-en style="display:none;">Executes the BIOS code and later the OS kernel.</span>
                </span>
            </span>
            <span class="hw-ls-tag">03</span>
        </div>

        <!-- ===================== MAINBOARD ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:1; --hw-ls-c:#6366f1;">
            <i class="fa-solid fa-server"></i>
            <span class="hw-ls-label">
                <span data-lang-de>Mainboard &amp; Chipsatz</span>
                <span data-lang-en style="display:none;">Motherboard &amp; Chipset</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Verbindet CPU, RAM, Speicher und Firmware-Chip (BIOS/UEFI).</span>
                    <span data-lang-en style="display:none;">Connects CPU, RAM, storage, and the firmware chip (BIOS/UEFI).</span>
                </span>
            </span>
            <span class="hw-ls-tag">02</span>
        </div>

        <!-- ===================== POWER ===================== -->
        <div class="hw-ls-block" style="--hw-ls-i:0; --hw-ls-c:#ef4444;">
            <i class="fa-solid fa-bolt"></i>
            <span class="hw-ls-label">
                <span data-lang-de>Stromversorgung (Netzteil)</span>
                <span data-lang-en style="display:none;">Power Supply</span>
                <span class="hw-ls-sub">
                    <span data-lang-de>Liefert Strom – der Startpunkt des Bootvorgangs.</span>
                    <span data-lang-en style="display:none;">Supplies power — the starting point of the boot process.</span>
                </span>
            </span>
            <span class="hw-ls-tag">01</span>
        </div>
    </div>
    `
},

            /* ============================================================
               2) BLOCK-LAYER-STACK — Data Flow Through Hardware Layers
               Input → RAM → CPU → Storage → Output. Blocks pulse in
               the order data actually travels.
               ============================================================ */
            {
                id: 'hardware-vis-data-flow',
                titleDe: 'Datenfluss durch die Hardwareschichten',
                titleEn: 'Data Flow Through Hardware Layers',
                descDe: 'Wie Daten durch die Hardwareschichten fließen: Eine Eingabe (z. B. Tastendruck) gelangt über die Peripherie in den RAM, wird von der CPU verarbeitet, im Speicher abgelegt und schließlich über die Ausgabe (z. B. Monitor) sichtbar gemacht. Die Blöcke leuchten in der Reihenfolge des Datenwegs auf.',
                descEn: 'How data flows through the hardware layers: An input (e.g., key press) enters via peripherals into RAM, is processed by the CPU, stored in storage, and finally made visible via output (e.g., monitor). The blocks light up in the order of the data path.',
                html: `
                <style>
                    .hw-df-wrap {
                        max-width: 560px;
                        margin: 0.5rem auto;
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                    }
                    .hw-df-block {
                        display: flex;
                        align-items: center;
                        gap: 0.7rem;
                        padding: 0.6rem 0.85rem;
                        border-radius: 0.55rem;
                        border: 1.5px solid var(--border-color);
                        background: var(--code-bg);
                        color: var(--text-color);
                        font-size: 0.78rem;
                        font-weight: 700;
                        position: relative;
                        overflow: hidden;
                        animation: hw-df-glow 15s ease-in-out infinite;
                        animation-delay: calc(var(--hw-df-i) * 2.5s);
                        will-change: transform, border-color, box-shadow;
                    }
                    .hw-df-block i {
                        font-size: 0.95rem;
                        opacity: 0.85;
                        color: var(--hw-df-c);
                        width: 1.1rem;
                        text-align: center;
                        flex-shrink: 0;
                    }
                    .hw-df-block .hw-df-label { flex: 1; line-height: 1.25; }
                    .hw-df-block .hw-df-step {
                        font-size: 0.55rem;
                        font-weight: 800;
                        letter-spacing: 0.08em;
                        text-transform: uppercase;
                        color: var(--hw-df-c);
                        opacity: 0.9;
                        flex-shrink: 0;
                    }
                    .hw-df-block::before {
                        content: '';
                        position: absolute;
                        left: 0; top: 0; bottom: 0;
                        width: 4px;
                        background: var(--hw-df-c);
                        opacity: 0.85;
                    }
                    /* downward arrow connector */
                    .hw-df-block::after {
                        content: '↓';
                        position: absolute;
                        left: 50%;
                        bottom: -14px;
                        transform: translateX(-50%);
                        font-size: 0.8rem;
                        color: var(--hw-df-c);
                        opacity: 0.6;
                        line-height: 1;
                    }
                    .hw-df-wrap > .hw-df-block:last-child::after { display: none; }

                    @keyframes hw-df-glow {
                        0%, 100% { transform: translateY(0);    border-color: var(--border-color); box-shadow: none; }
                        2%, 6%   { transform: translateY(-2px); border-color: var(--hw-df-c);    box-shadow: 0 0 22px -6px var(--hw-df-c); }
                        9%       { transform: translateY(0);    border-color: var(--border-color); box-shadow: none; }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .hw-df-block { animation: none !important; }
                    }
                    @media (max-width: 480px) {
                        .hw-df-block { font-size: 0.7rem; padding: 0.5rem 0.7rem; }
                        .hw-df-block .hw-df-step { display: none; }
                    }
                </style>

                <div class="hw-df-wrap">
                    <div class="hw-df-block" style="--hw-df-i:0; --hw-df-c:#ec4899;">
                        <i class="fa-solid fa-keyboard"></i>
                        <span class="hw-df-label">
                            <span data-lang-de>Eingabe: Tastatur / Maus</span>
                            <span data-lang-en style="display:none;">Input: Keyboard / Mouse</span>
                        </span>
                        <span class="hw-df-step">01</span>
                    </div>
                    <div class="hw-df-block" style="--hw-df-i:1; --hw-df-c:#10b981;">
                        <i class="fa-solid fa-memory"></i>
                        <span class="hw-df-label">
                            <span data-lang-de>RAM: Daten werden kurzzeitig gepuffert</span>
                            <span data-lang-en style="display:none;">RAM: data is buffered temporarily</span>
                        </span>
                        <span class="hw-df-step">02</span>
                    </div>
                    <div class="hw-df-block" style="--hw-df-i:2; --hw-df-c:#3b82f6;">
                        <i class="fa-solid fa-microchip"></i>
                        <span class="hw-df-label">
                            <span data-lang-de>CPU: Verarbeitung &amp; Berechnung</span>
                            <span data-lang-en style="display:none;">CPU: processing &amp; computation</span>
                        </span>
                        <span class="hw-df-step">03</span>
                    </div>
                    <div class="hw-df-block" style="--hw-df-i:3; --hw-df-c:#f59e0b;">
                        <i class="fa-solid fa-hard-drive"></i>
                        <span class="hw-df-label">
                            <span data-lang-de>Speicher: dauerhafte Ablage (SSD/HDD)</span>
                            <span data-lang-en style="display:none;">Storage: permanent save (SSD/HDD)</span>
                        </span>
                        <span class="hw-df-step">04</span>
                    </div>
                    <div class="hw-df-block" style="--hw-df-i:4; --hw-df-c:#8b5cf6;">
                        <i class="fa-solid fa-display"></i>
                        <span class="hw-df-label">
                            <span data-lang-de>Ausgabe: Monitor zeigt das Ergebnis</span>
                            <span data-lang-en style="display:none;">Output: monitor shows the result</span>
                        </span>
                        <span class="hw-df-step">05</span>
                    </div>
                </div>
                `
            }
        ]
    },

    links: {
        titleDe: 'Hardware-Links',
        titleEn: 'Hardware Links',
        items: [
            { icon: 'fa-globe',         href: 'https://de.wikipedia.org/wiki/Hardware', target: '_blank', labelDe: 'Wikipedia: Hardware', labelEn: 'Wikipedia: Hardware' },
            { icon: 'fa-link',          href: 'https://de.wikipedia.org/wiki/Netzwerkhardware', target: '_blank', labelDe: 'Wikipedia: Netzwerkhardware', labelEn: 'Wikipedia: Network Hardware' },
            { icon: 'fa-external-link', href: 'https://www.computerhope.com/', target: '_blank', labelDe: 'Computer Hope', labelEn: 'Computer Hope' },
            { icon: 'fa-paperclip',     href: 'https://www.tomshardware.com/', target: '_blank', labelDe: 'Tom\'s Hardware', labelEn: 'Tom\'s Hardware' }
        ]
    },

    footer: {
        textDe: 'Hardware-Übersicht 2026',
        textEn: 'Hardware Overview 2026'
    }
});