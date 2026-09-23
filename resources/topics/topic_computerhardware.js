// resources/topics/topic_computerhardware.js
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
       ILLUSTRATIONS — three animated diagrams
       Panel 1 — Hardware layers       (3D perspective, LED status)
       Panel 2 — Firmware boot chain   (console header, progress bar)
       Panel 3 — Data flow through HW  (input/output rails, packets)
       ============================================================= */
    illustrations: {
        titleDe: 'Hardware-Illustrationen',
        titleEn: 'Hardware Illustrations',
        introDe: 'Drei animierte Blockdiagramme mit sichtbarem Fluss: Hardware-Schichten (aufwärts, 3D), Firmware-Startkette BIOS → OS (aufwärts, mit Boot-Progress) und Datenfluss durch die Hardware (abwärts, mit Datenpaketen).',
        introEn: 'Three animated block diagrams with visible flow: hardware layers (upward, 3D), firmware boot chain BIOS → OS (upward, with boot progress), and data flow through hardware (downward, with data packets).',
        animations: [

            /* ============================================================
               1) HARDWARE LAYERS — UPWARD FLOW, 3D PERSPECTIVE
               ============================================================ */
            {
                id: 'hardware-vis-hardware-layers',
                titleDe: 'Hardware-Schichten',
                titleEn: 'Hardware Layers',
                descDe: 'Der physische Aufbau eines Computers mit sichtbarem Fluss von unten nach oben: Stromversorgung → Mainboard & Chipsatz → CPU → RAM → Speicher. Jede Schicht hat eine Status-LED; der leuchtende Impuls zeigt die Richtung (Strom & Signale steigen die Schichten hinauf).',
                descEn: 'The physical build-up of a computer with visible flow from bottom to top: Power Supply → Motherboard & Chipset → CPU → RAM → Storage. Each layer has a status LED; the glowing pulse shows the direction (power & signals climb the layers).',
                html: `
                <style>
                    .hw-lay {
                        position: relative;
                        max-width: 680px;
                        margin: 1rem auto 0.5rem;
                        padding-left: 3rem;
                        display: flex;
                        flex-direction: column-reverse;
                        gap: 11px;
                        --pulse: #f59e0b;
                        perspective: 1000px;
                    }
                    .hw-lay-rail {
                        position: absolute;
                        left: 16px; top: 6px; bottom: 6px;
                        width: 4px;
                        border-radius: 4px;
                        background: linear-gradient(to top,
                            #ef4444 0%, #6366f1 25%, #3b82f6 50%, #10b981 75%, #f59e0b 100%);
                        opacity: 0.4;
                        overflow: hidden;
                        box-shadow: 0 0 20px rgba(255,255,255,0.08);
                    }
                    .hw-lay-rail::after {
                        content: '';
                        position: absolute;
                        left: 0; right: 0; height: 42%;
                        background: linear-gradient(to top,
                            transparent, rgba(255,255,255,0.75) 50%, transparent);
                        animation: hw-lay-shim 4.5s linear infinite;
                    }
                    @keyframes hw-lay-shim { 0% { top: 100%; } 100% { top: -42%; } }

                    .hw-lay-pulse,
                    .hw-lay-pulse-trail {
                        position: absolute;
                        left: 10px;
                        border-radius: 50%;
                        background: #fff;
                        pointer-events: none;
                        z-index: 3;
                    }
                    .hw-lay-pulse {
                        width: 16px; height: 16px;
                        box-shadow:
                            0 0 14px 4px rgba(255,255,255,0.95),
                            0 0 28px 10px var(--pulse);
                        animation: hw-lay-travel 15s linear infinite;
                    }
                    .hw-lay-pulse-trail {
                        width: 12px; height: 12px;
                        background: var(--pulse);
                        opacity: 0.55;
                        filter: blur(3px);
                        animation: hw-lay-travel 15s linear infinite;
                        animation-delay: 0.15s;
                    }
                    @keyframes hw-lay-travel {
                        0%   { top: calc(100% - 22px); opacity: 0; }
                        5%   { top: calc(100% - 22px); opacity: 1; }
                        87%  { top: 6px;               opacity: 1; }
                        95%  { top: 6px;               opacity: 0; }
                        100% { top: calc(100% - 22px); opacity: 0; }
                    }

                    .hw-lay-block {
                        display: grid;
                        grid-template-columns: 2.3rem 1fr auto auto;
                        align-items: center;
                        gap: 0.85rem;
                        padding: 0.7rem 0.9rem 0.7rem 0.7rem;
                        border-radius: 0.65rem;
                        border: 1.5px solid var(--border-color);
                        background: linear-gradient(135deg,
                            color-mix(in srgb, var(--c) 6%, var(--code-bg)),
                            var(--code-bg));
                        color: var(--text-color);
                        font-size: 0.78rem;
                        font-weight: 700;
                        position: relative;
                        overflow: hidden;
                        animation: hw-lay-glow 15s ease-in-out infinite;
                        animation-delay: calc(var(--i) * 3s);
                        will-change: transform, border-color, box-shadow;
                        transform-style: preserve-3d;
                    }
                    .hw-lay-block .ico {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 2.3rem; height: 2.3rem;
                        border-radius: 0.5rem;
                        background: color-mix(in srgb, var(--c) 15%, transparent);
                        color: var(--c);
                        font-size: 1rem;
                        box-shadow: inset 0 0 8px color-mix(in srgb, var(--c) 25%, transparent);
                    }
                    .hw-lay-info { line-height: 1.25; min-width: 0; }
                    .hw-lay-info .t { display: block; font-weight: 800; }
                    .hw-lay-info .s {
                        display: block;
                        font-size: 0.62rem;
                        font-weight: 500;
                        color: var(--text-muted);
                        margin-top: 2px;
                    }
                    .hw-lay-led {
                        width: 8px; height: 8px;
                        border-radius: 50%;
                        background: var(--c);
                        box-shadow: 0 0 6px var(--c);
                        opacity: 0.35;
                        animation: hw-lay-led 15s ease-in-out infinite;
                        animation-delay: calc(var(--i) * 3s);
                    }
                    @keyframes hw-lay-led {
                        0%, 100% { opacity: 0.3; box-shadow: 0 0 4px var(--c); }
                        5%, 20%  { opacity: 1;   box-shadow: 0 0 14px var(--c), inset 0 0 4px rgba(255,255,255,0.7); }
                        30%      { opacity: 0.3; box-shadow: 0 0 4px var(--c); }
                    }
                    .hw-lay-num {
                        font-size: 0.58rem;
                        font-weight: 800;
                        letter-spacing: 0.08em;
                        color: var(--text-muted);
                        opacity: 0.6;
                    }
                    .hw-lay-block::before {
                        content: '';
                        position: absolute;
                        left: 0; top: 0; bottom: 0;
                        width: 4px;
                        background: var(--c);
                        box-shadow: 0 0 8px var(--c);
                    }
                    @keyframes hw-lay-glow {
                        0%, 100% {
                            transform: translateX(0) translateZ(0) rotateY(0deg);
                            border-color: var(--border-color);
                            box-shadow: none;
                        }
                        3%, 17% {
                            transform: translateX(8px) translateZ(20px) rotateY(-1.2deg);
                            border-color: var(--c);
                            box-shadow:
                                0 10px 30px -8px var(--c),
                                0 0 0 1px color-mix(in srgb, var(--c) 35%, transparent);
                        }
                        22% {
                            transform: translateX(0) translateZ(0) rotateY(0deg);
                            border-color: var(--border-color);
                            box-shadow: none;
                        }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .hw-lay-block, .hw-lay-pulse, .hw-lay-pulse-trail,
                        .hw-lay-rail::after, .hw-lay-led { animation: none !important; }
                    }
                    @media (max-width: 480px) {
                        .hw-lay { padding-left: 2.4rem; }
                        .hw-lay-block {
                            grid-template-columns: 1.9rem 1fr auto;
                            gap: 0.6rem;
                            padding: 0.55rem 0.7rem;
                        }
                        .hw-lay-block .ico { width: 1.9rem; height: 1.9rem; font-size: 0.85rem; }
                        .hw-lay-info .s { display: none; }
                        .hw-lay-num { display: none; }
                    }
                </style>

                <div class="hw-lay">
                    <div class="hw-lay-rail"></div>
                    <div class="hw-lay-pulse"></div>
                    <div class="hw-lay-pulse-trail"></div>

                    <!-- DOM order = bottom → top (with column-reverse) -->
                    <div class="hw-lay-block" style="--i:0; --c:#ef4444;">
                        <span class="ico"><i class="fa-solid fa-bolt"></i></span>
                        <span class="hw-lay-info">
                            <span class="t">
                                <span data-lang-de>Stromversorgung (Netzteil)</span>
                                <span data-lang-en style="display:none;">Power Supply</span>
                            </span>
                            <span class="s">
                                <span data-lang-de>Wandelt Netzspannung in stabile Gleichspannung für alle Komponenten.</span>
                                <span data-lang-en style="display:none;">Converts mains AC into stable DC for all components.</span>
                            </span>
                        </span>
                        <span class="hw-lay-led"></span>
                        <span class="hw-lay-num">01</span>
                    </div>

                    <div class="hw-lay-block" style="--i:1; --c:#6366f1;">
                        <span class="ico"><i class="fa-solid fa-server"></i></span>
                        <span class="hw-lay-info">
                            <span class="t">
                                <span data-lang-de>Mainboard &amp; Chipsatz</span>
                                <span data-lang-en style="display:none;">Motherboard &amp; Chipset</span>
                            </span>
                            <span class="s">
                                <span data-lang-de>Verteilt Strom und Signale an CPU, RAM, Speicher und Firmware-Chip.</span>
                                <span data-lang-en style="display:none;">Distributes power and signals to CPU, RAM, storage, and the firmware chip.</span>
                            </span>
                        </span>
                        <span class="hw-lay-led"></span>
                        <span class="hw-lay-num">02</span>
                    </div>

                    <div class="hw-lay-block" style="--i:2; --c:#3b82f6;">
                        <span class="ico"><i class="fa-solid fa-microchip"></i></span>
                        <span class="hw-lay-info">
                            <span class="t">
                                <span data-lang-de>CPU (Prozessor, Recheneinheit)</span>
                                <span data-lang-en style="display:none;">CPU (Processor, Processing Unit)</span>
                            </span>
                            <span class="s">
                                <span data-lang-de>Führt alle Berechnungen und logischen Operationen aus.</span>
                                <span data-lang-en style="display:none;">Performs all calculations and logical operations.</span>
                            </span>
                        </span>
                        <span class="hw-lay-led"></span>
                        <span class="hw-lay-num">03</span>
                    </div>

                    <div class="hw-lay-block" style="--i:3; --c:#10b981;">
                        <span class="ico"><i class="fa-solid fa-memory"></i></span>
                        <span class="hw-lay-info">
                            <span class="t">
                                <span data-lang-de>RAM (Arbeitsspeicher, Kurzzeitspeicher)</span>
                                <span data-lang-en style="display:none;">RAM (Memory, Short-term)</span>
                            </span>
                            <span class="s">
                                <span data-lang-de>Hält aktive Programme und Daten für schnellen CPU-Zugriff.</span>
                                <span data-lang-en style="display:none;">Holds active programs and data for fast CPU access.</span>
                            </span>
                        </span>
                        <span class="hw-lay-led"></span>
                        <span class="hw-lay-num">04</span>
                    </div>

                    <div class="hw-lay-block" style="--i:4; --c:#f59e0b;">
                        <span class="ico"><i class="fa-solid fa-hard-drive"></i></span>
                        <span class="hw-lay-info">
                            <span class="t">
                                <span data-lang-de>Speicher (SSD/HDD, Langzeitspeicher)</span>
                                <span data-lang-en style="display:none;">Storage (SSD/HDD, Long-term)</span>
                            </span>
                            <span class="s">
                                <span data-lang-de>Speichert BIOS/UEFI, Bootloader, OS und alle Daten dauerhaft.</span>
                                <span data-lang-en style="display:none;">Stores BIOS/UEFI, bootloader, OS, and all data permanently.</span>
                            </span>
                        </span>
                        <span class="hw-lay-led"></span>
                        <span class="hw-lay-num">05</span>
                    </div>
                </div>
                `
            },

            /* ============================================================
               2) FIRMWARE BOOT CHAIN — CONSOLE HEADER + BOOT PROGRESS
               ============================================================ */
            {
                id: 'hardware-vis-firmware-flow',
                titleDe: 'Firmware-Startkette: von BIOS bis OS',
                titleEn: 'Firmware Boot Chain: BIOS to OS',
                descDe: 'Der Startvorgang eines Computers als gerichteter Fluss von unten nach oben. Der Konsolen-Kopf oben zeigt den POST-Status, der Fortschrittsbalken den Boot-Fortschritt. Jede Stufe erhält nacheinander die Kontrolle: BIOS/UEFI (Firmware) → Bootloader → Betriebssystem-Kernel → Betriebssystem → Anwendungen.',
                descEn: 'The computer boot process as a directed flow from bottom to top. The console header at the top shows POST status; the progress bar shows boot progress. Each stage receives control in turn: BIOS/UEFI (firmware) → Bootloader → OS Kernel → Operating System → Applications.',
                html: `
                <style>
                    .hw-boot {
                        position: relative;
                        max-width: 680px;
                        margin: 1rem auto 0.5rem;
                        --pulse: #a855f7;
                    }
                    /* ---- console-style header ---- */
                    .hw-boot-head {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        padding: 0.55rem 0.85rem;
                        background: color-mix(in srgb, var(--code-bg) 70%, #000);
                        border: 1px solid var(--border-color);
                        border-radius: 0.55rem 0.55rem 0 0;
                        font-family: 'Courier New', 'Menlo', monospace;
                        font-size: 0.66rem;
                        letter-spacing: 0.03em;
                        color: var(--text-muted);
                        margin-bottom: 0.7rem;
                    }
                    .hw-boot-head .power {
                        width: 9px; height: 9px;
                        border-radius: 50%;
                        background: #ef4444;
                        box-shadow: 0 0 8px #ef4444;
                        animation: hw-boot-power 15s ease-in-out infinite;
                        flex-shrink: 0;
                    }
                    @keyframes hw-boot-power {
                        0%      { background: #ef4444; box-shadow: 0 0 10px #ef4444; }
                        4%      { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }
                        8%, 90% { background: #10b981; box-shadow: 0 0 10px #10b981; }
                        94%     { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }
                        100%    { background: #ef4444; box-shadow: 0 0 10px #ef4444; }
                    }
                    .hw-boot-head .msg { flex: 1; color: var(--text-color); opacity: 0.85; }
                    .hw-boot-head .counter {
                        font-weight: 800;
                        color: var(--text-color);
                        letter-spacing: 0.05em;
                    }
                    /* ---- progress bar ---- */
                    .hw-boot-progress {
                        position: relative;
                        height: 3px;
                        background: var(--border-color);
                        border-radius: 2px;
                        overflow: hidden;
                        margin: 0 0 0.9rem;
                    }
                    .hw-boot-progress::after {
                        content: '';
                        position: absolute;
                        left: 0; top: 0; bottom: 0;
                        width: 0%;
                        background: linear-gradient(to right,
                            #14b8a6, #0ea5e9, #6366f1, #8b5cf6, #a855f7);
                        animation: hw-boot-fill 15s ease-in-out infinite;
                    }
                    @keyframes hw-boot-fill {
                        0%, 5%   { width: 0%; }
                        85%      { width: 100%; }
                        92%      { width: 100%; }
                        100%     { width: 0%; }
                    }
                    /* ---- rail + wrap ---- */
                    .hw-boot-wrap {
                        position: relative;
                        padding-left: 3rem;
                        display: flex;
                        flex-direction: column-reverse;
                        gap: 10px;
                    }
                    .hw-boot-rail {
                        position: absolute;
                        left: 16px; top: 6px; bottom: 6px;
                        width: 4px;
                        border-radius: 4px;
                        background: linear-gradient(to top,
                            #14b8a6 0%, #0ea5e9 25%, #6366f1 50%, #8b5cf6 75%, #a855f7 100%);
                        opacity: 0.4;
                        overflow: hidden;
                    }
                    .hw-boot-rail::after {
                        content: '';
                        position: absolute;
                        left: 0; right: 0; height: 42%;
                        background: linear-gradient(to top,
                            transparent, rgba(255,255,255,0.75) 50%, transparent);
                        animation: hw-boot-shim 4s linear infinite;
                    }
                    @keyframes hw-boot-shim { 0% { top: 100%; } 100% { top: -42%; } }
                    /* ---- pulse ---- */
                    .hw-boot-pulse,
                    .hw-boot-pulse-trail {
                        position: absolute;
                        left: 10px;
                        border-radius: 50%;
                        background: #fff;
                        pointer-events: none;
                        z-index: 3;
                    }
                    .hw-boot-pulse {
                        width: 16px; height: 16px;
                        box-shadow:
                            0 0 14px 4px rgba(255,255,255,0.95),
                            0 0 28px 10px var(--pulse);
                        animation: hw-boot-travel 15s linear infinite;
                    }
                    .hw-boot-pulse-trail {
                        width: 12px; height: 12px;
                        background: var(--pulse);
                        opacity: 0.55;
                        filter: blur(3px);
                        animation: hw-boot-travel 15s linear infinite;
                        animation-delay: 0.15s;
                    }
                    @keyframes hw-boot-travel {
                        0%   { top: calc(100% - 22px); opacity: 0; }
                        5%   { top: calc(100% - 22px); opacity: 1; }
                        87%  { top: 6px;               opacity: 1; }
                        95%  { top: 6px;               opacity: 0; }
                        100% { top: calc(100% - 22px); opacity: 0; }
                    }
                    /* ---- blocks ---- */
                    .hw-boot-block {
                        display: grid;
                        grid-template-columns: 2.3rem 1fr auto;
                        align-items: center;
                        gap: 0.85rem;
                        padding: 0.7rem 0.9rem 0.7rem 0.7rem;
                        border-radius: 0.65rem;
                        border: 1.5px solid var(--border-color);
                        background: linear-gradient(135deg,
                            color-mix(in srgb, var(--c) 6%, var(--code-bg)),
                            var(--code-bg));
                        font-size: 0.78rem;
                        font-weight: 700;
                        position: relative;
                        overflow: hidden;
                        animation: hw-boot-glow 15s ease-in-out infinite;
                        animation-delay: calc(var(--i) * 3s);
                        will-change: transform, border-color, box-shadow;
                    }
                    .hw-boot-block .ico {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 2.3rem; height: 2.3rem;
                        border-radius: 0.5rem;
                        background: color-mix(in srgb, var(--c) 15%, transparent);
                        color: var(--c);
                        font-size: 1rem;
                        box-shadow: inset 0 0 8px color-mix(in srgb, var(--c) 25%, transparent);
                    }
                    .hw-boot-info { line-height: 1.25; min-width: 0; }
                    .hw-boot-info .t { display: block; font-weight: 800; }
                    .hw-boot-info .s {
                        display: block;
                        font-size: 0.62rem;
                        font-weight: 500;
                        color: var(--text-muted);
                        margin-top: 2px;
                    }
                    .hw-boot-status {
                        font-family: 'Courier New', 'Menlo', monospace;
                        font-size: 0.6rem;
                        font-weight: 800;
                        letter-spacing: 0.05em;
                        color: var(--c);
                        padding: 0.2rem 0.5rem;
                        border-radius: 0.3rem;
                        background: color-mix(in srgb, var(--c) 10%, transparent);
                        opacity: 0.4;
                        animation: hw-boot-status 15s ease-in-out infinite;
                        animation-delay: calc(var(--i) * 3s);
                        white-space: nowrap;
                    }
                    @keyframes hw-boot-status {
                        0%, 100% { opacity: 0.4; }
                        3%, 17%  { opacity: 1; }
                        22%      { opacity: 0.4; }
                    }
                    .hw-boot-block::before {
                        content: '';
                        position: absolute;
                        left: 0; top: 0; bottom: 0;
                        width: 4px;
                        background: var(--c);
                        box-shadow: 0 0 8px var(--c);
                    }
                    @keyframes hw-boot-glow {
                        0%, 100% {
                            transform: translateX(0);
                            border-color: var(--border-color);
                            box-shadow: none;
                        }
                        3%, 17% {
                            transform: translateX(8px);
                            border-color: var(--c);
                            box-shadow:
                                0 10px 30px -8px var(--c),
                                0 0 0 1px color-mix(in srgb, var(--c) 35%, transparent);
                        }
                        22% {
                            transform: translateX(0);
                            border-color: var(--border-color);
                            box-shadow: none;
                        }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .hw-boot-block, .hw-boot-pulse, .hw-boot-pulse-trail,
                        .hw-boot-rail::after, .hw-boot-progress::after,
                        .hw-boot-head .power, .hw-boot-status { animation: none !important; }
                    }
                    @media (max-width: 480px) {
                        .hw-boot-wrap { padding-left: 2.4rem; }
                        .hw-boot-block {
                            grid-template-columns: 1.9rem 1fr auto;
                            gap: 0.6rem;
                            padding: 0.55rem 0.7rem;
                        }
                        .hw-boot-block .ico { width: 1.9rem; height: 1.9rem; font-size: 0.85rem; }
                        .hw-boot-info .s { display: none; }
                        .hw-boot-head { font-size: 0.58rem; }
                    }
                </style>

                <div class="hw-boot">
                    <div class="hw-boot-head">
                        <span class="power"></span>
                        <span class="msg">
                            <span data-lang-de>POST · Hardware-Initialisierung läuft</span>
                            <span data-lang-en style="display:none;">POST · hardware initialisation running</span>
                        </span>
                        <span class="counter">BIOS → OS</span>
                    </div>
                    <div class="hw-boot-progress"></div>

                    <div class="hw-boot-wrap">
                        <div class="hw-boot-rail"></div>
                        <div class="hw-boot-pulse"></div>
                        <div class="hw-boot-pulse-trail"></div>

                        <!-- DOM order = bottom → top (with column-reverse) -->
                        <div class="hw-boot-block" style="--i:0; --c:#14b8a6;">
                            <span class="ico"><i class="fa-solid fa-microchip"></i></span>
                            <span class="hw-boot-info">
                                <span class="t">
                                    <span data-lang-de>BIOS / UEFI (Firmware)</span>
                                    <span data-lang-en style="display:none;">BIOS / UEFI (Firmware)</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Erste Software nach dem Einschalten. Führt den POST aus und initialisiert die Hardware.</span>
                                    <span data-lang-en style="display:none;">First software after power-on. Runs POST and initialises hardware.</span>
                                </span>
                            </span>
                            <span class="hw-boot-status">STEP 1/5</span>
                        </div>

                        <div class="hw-boot-block" style="--i:1; --c:#0ea5e9;">
                            <span class="ico"><i class="fa-solid fa-boot"></i></span>
                            <span class="hw-boot-info">
                                <span class="t">
                                    <span data-lang-de>Bootloader</span>
                                    <span data-lang-en style="display:none;">Bootloader</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>GRUB, Windows Boot Manager – lädt den Kernel vom Speicher in den RAM.</span>
                                    <span data-lang-en style="display:none;">GRUB, Windows Boot Manager — loads the kernel from storage into RAM.</span>
                                </span>
                            </span>
                            <span class="hw-boot-status">STEP 2/5</span>
                        </div>

                        <div class="hw-boot-block" style="--i:2; --c:#6366f1;">
                            <span class="ico"><i class="fa-solid fa-gears"></i></span>
                            <span class="hw-boot-info">
                                <span class="t">
                                    <span data-lang-de>Betriebssystem-Kernel</span>
                                    <span data-lang-en style="display:none;">OS Kernel</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Übernimmt die Kontrolle – verwaltet CPU, Speicher und Geräte.</span>
                                    <span data-lang-en style="display:none;">Takes over control — manages CPU, memory, and devices.</span>
                                </span>
                            </span>
                            <span class="hw-boot-status">STEP 3/5</span>
                        </div>

                        <div class="hw-boot-block" style="--i:3; --c:#8b5cf6;">
                            <span class="ico"><i class="fa-solid fa-desktop"></i></span>
                            <span class="hw-boot-info">
                                <span class="t">
                                    <span data-lang-de>Betriebssystem (OS)</span>
                                    <span data-lang-en style="display:none;">Operating System (OS)</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Windows, Linux, macOS – Dateisystem, Treiber, Benutzeroberfläche.</span>
                                    <span data-lang-en style="display:none;">Windows, Linux, macOS — file system, drivers, user interface.</span>
                                </span>
                            </span>
                            <span class="hw-boot-status">STEP 4/5</span>
                        </div>

                        <div class="hw-boot-block" style="--i:4; --c:#a855f7;">
                            <span class="ico"><i class="fa-solid fa-window-maximize"></i></span>
                            <span class="hw-boot-info">
                                <span class="t">
                                    <span data-lang-de>Anwendungen</span>
                                    <span data-lang-en style="display:none;">Applications</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Browser, Office, Spiele – nutzen das OS über APIs.</span>
                                    <span data-lang-en style="display:none;">Browser, Office, games — use the OS via APIs.</span>
                                </span>
                            </span>
                            <span class="hw-boot-status">STEP 5/5</span>
                        </div>
                    </div>
                </div>
                `
            },

            /* ============================================================
               3) DATA FLOW — DOWNWARD FLOW WITH I/O RAILS + PACKETS
               ============================================================ */
            {
                id: 'hardware-vis-data-flow',
                titleDe: 'Datenfluss durch die Hardwareschichten',
                titleEn: 'Data Flow Through Hardware Layers',
                descDe: 'Wie Daten durch die Hardwareschichten fließen – von oben nach unten: Eingabe (Tastatur/Maus) → RAM (Pufferung) → CPU (Verarbeitung) → Speicher (Ablage) → Ausgabe (Monitor). Der Hauptimpuls und die kleinen Datenpakete wandern abwärts und zeigen so den Weg der Daten. Links die INPUT-, rechts die OUTPUT-Seite.',
                descEn: 'How data flows through the hardware layers — from top to bottom: Input (keyboard/mouse) → RAM (buffering) → CPU (processing) → Storage (saving) → Output (monitor). The main pulse and small data packets travel downward to show the data path. INPUT side on the left, OUTPUT side on the right.',
                html: `
                <style>
                    .hw-data {
                        max-width: 720px;
                        margin: 1rem auto 0.5rem;
                        display: grid;
                        grid-template-columns: auto 1fr auto;
                        gap: 0.7rem;
                        align-items: stretch;
                        --pulse: #8b5cf6;
                    }
                    .hw-data-side {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.55rem;
                        font-weight: 800;
                        letter-spacing: 0.18em;
                        text-transform: uppercase;
                        color: var(--text-muted);
                        opacity: 0.65;
                        writing-mode: vertical-rl;
                        padding: 0.5rem 0;
                    }
                    .hw-data-side.left { transform: rotate(180deg); }
                    .hw-data-side .lbl {
                        padding: 0.4rem 0.15rem;
                        border-radius: 0.35rem;
                        background: color-mix(in srgb, var(--sc) 10%, transparent);
                        color: var(--sc);
                    }
                    .hw-data-side.left .lbl  { --sc: #ec4899; }
                    .hw-data-side.right .lbl { --sc: #8b5cf6; }

                    .hw-data-wrap {
                        position: relative;
                        padding-left: 3rem;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .hw-data-rail {
                        position: absolute;
                        left: 16px; top: 6px; bottom: 6px;
                        width: 4px;
                        border-radius: 4px;
                        background: linear-gradient(to bottom,
                            #ec4899 0%, #10b981 25%, #3b82f6 50%, #f59e0b 75%, #8b5cf6 100%);
                        opacity: 0.4;
                        overflow: hidden;
                    }
                    .hw-data-rail::after {
                        content: '';
                        position: absolute;
                        left: 0; right: 0; height: 42%;
                        background: linear-gradient(to bottom,
                            transparent, rgba(255,255,255,0.75) 50%, transparent);
                        animation: hw-data-shim 4.5s linear infinite;
                    }
                    @keyframes hw-data-shim { 0% { top: -42%; } 100% { top: 100%; } }

                    /* main pulse */
                    .hw-data-pulse,
                    .hw-data-pulse-trail {
                        position: absolute;
                        left: 10px;
                        border-radius: 50%;
                        background: #fff;
                        pointer-events: none;
                        z-index: 4;
                    }
                    .hw-data-pulse {
                        width: 16px; height: 16px;
                        box-shadow:
                            0 0 14px 4px rgba(255,255,255,0.95),
                            0 0 28px 10px var(--pulse);
                        animation: hw-data-travel 15s linear infinite;
                    }
                    .hw-data-pulse-trail {
                        width: 12px; height: 12px;
                        background: var(--pulse);
                        opacity: 0.55;
                        filter: blur(3px);
                        animation: hw-data-travel 15s linear infinite;
                        animation-delay: 0.15s;
                    }
                    @keyframes hw-data-travel {
                        0%   { top: 6px;               opacity: 0; }
                        5%   { top: 6px;               opacity: 1; }
                        87%  { top: calc(100% - 22px); opacity: 1; }
                        95%  { top: calc(100% - 22px); opacity: 0; }
                        100% { top: 6px;               opacity: 0; }
                    }

                    /* small data packets alongside the main rail */
                    .hw-data-packet {
                        position: absolute;
                        left: 11px;
                        width: 8px; height: 8px;
                        border-radius: 50%;
                        background: var(--pk, #fff);
                        box-shadow: 0 0 8px var(--pk, #fff);
                        opacity: 0;
                        animation: hw-data-pk 15s linear infinite;
                        animation-delay: var(--pk-delay, 0s);
                        z-index: 2;
                    }
                    @keyframes hw-data-pk {
                        0%   { top: 4%;  opacity: 0; }
                        6%   { opacity: 0.9; }
                        94%  { opacity: 0.9; }
                        100% { top: 96%; opacity: 0; }
                    }

                    /* blocks */
                    .hw-data-block {
                        display: grid;
                        grid-template-columns: 2.3rem 1fr auto;
                        align-items: center;
                        gap: 0.85rem;
                        padding: 0.7rem 0.9rem 0.7rem 0.7rem;
                        border-radius: 0.65rem;
                        border: 1.5px solid var(--border-color);
                        background: linear-gradient(135deg,
                            color-mix(in srgb, var(--c) 6%, var(--code-bg)),
                            var(--code-bg));
                        font-size: 0.78rem;
                        font-weight: 700;
                        position: relative;
                        overflow: hidden;
                        animation: hw-data-glow 15s ease-in-out infinite;
                        animation-delay: calc(var(--i) * 3s);
                        will-change: transform, border-color, box-shadow;
                    }
                    .hw-data-block .ico {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 2.3rem; height: 2.3rem;
                        border-radius: 0.5rem;
                        background: color-mix(in srgb, var(--c) 15%, transparent);
                        color: var(--c);
                        font-size: 1rem;
                        box-shadow: inset 0 0 8px color-mix(in srgb, var(--c) 25%, transparent);
                    }
                    .hw-data-info { line-height: 1.25; min-width: 0; }
                    .hw-data-info .t { display: block; font-weight: 800; }
                    .hw-data-info .s {
                        display: block;
                        font-size: 0.62rem;
                        font-weight: 500;
                        color: var(--text-muted);
                        margin-top: 2px;
                    }
                    .hw-data-tag {
                        font-size: 0.58rem;
                        font-weight: 800;
                        letter-spacing: 0.08em;
                        color: var(--text-muted);
                        opacity: 0.6;
                    }
                    .hw-data-block::before {
                        content: '';
                        position: absolute;
                        left: 0; top: 0; bottom: 0;
                        width: 4px;
                        background: var(--c);
                        box-shadow: 0 0 8px var(--c);
                    }
                    @keyframes hw-data-glow {
                        0%, 100% {
                            transform: translateX(0);
                            border-color: var(--border-color);
                            box-shadow: none;
                        }
                        3%, 17% {
                            transform: translateX(8px);
                            border-color: var(--c);
                            box-shadow:
                                0 10px 30px -8px var(--c),
                                0 0 0 1px color-mix(in srgb, var(--c) 35%, transparent);
                        }
                        22% {
                            transform: translateX(0);
                            border-color: var(--border-color);
                            box-shadow: none;
                        }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .hw-data-block, .hw-data-pulse, .hw-data-pulse-trail,
                        .hw-data-rail::after, .hw-data-packet { animation: none !important; }
                    }
                    @media (max-width: 640px) {
                        .hw-data { grid-template-columns: 1fr; }
                        .hw-data-side { display: none; }
                    }
                    @media (max-width: 480px) {
                        .hw-data-wrap { padding-left: 2.4rem; }
                        .hw-data-block {
                            grid-template-columns: 1.9rem 1fr auto;
                            gap: 0.6rem;
                            padding: 0.55rem 0.7rem;
                        }
                        .hw-data-block .ico { width: 1.9rem; height: 1.9rem; font-size: 0.85rem; }
                        .hw-data-info .s { display: none; }
                    }
                </style>

                <div class="hw-data">
                    <div class="hw-data-side left">
                        <span class="lbl">
                            <span data-lang-de>Eingabe</span>
                            <span data-lang-en style="display:none;">Input</span>
                        </span>
                    </div>

                    <div class="hw-data-wrap">
                        <div class="hw-data-rail"></div>
                        <div class="hw-data-pulse"></div>
                        <div class="hw-data-pulse-trail"></div>
                        <div class="hw-data-packet" style="--pk:#ec4899; --pk-delay:0.8s;"></div>
                        <div class="hw-data-packet" style="--pk:#10b981; --pk-delay:3.8s;"></div>
                        <div class="hw-data-packet" style="--pk:#3b82f6; --pk-delay:6.8s;"></div>
                        <div class="hw-data-packet" style="--pk:#f59e0b; --pk-delay:9.8s;"></div>
                        <div class="hw-data-packet" style="--pk:#8b5cf6; --pk-delay:12.8s;"></div>

                        <!-- DOM order = top → bottom -->
                        <div class="hw-data-block" style="--i:0; --c:#ec4899;">
                            <span class="ico"><i class="fa-solid fa-keyboard"></i></span>
                            <span class="hw-data-info">
                                <span class="t">
                                    <span data-lang-de>Eingabe: Tastatur / Maus</span>
                                    <span data-lang-en style="display:none;">Input: Keyboard / Mouse</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Der Benutzer gibt Daten ein – Startpunkt des Datenwegs.</span>
                                    <span data-lang-en style="display:none;">The user enters data — the starting point of the data path.</span>
                                </span>
                            </span>
                            <span class="hw-data-tag">01</span>
                        </div>

                        <div class="hw-data-block" style="--i:1; --c:#10b981;">
                            <span class="ico"><i class="fa-solid fa-memory"></i></span>
                            <span class="hw-data-info">
                                <span class="t">
                                    <span data-lang-de>RAM: Zwischenspeicherung</span>
                                    <span data-lang-en style="display:none;">RAM: temporary buffering</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Die Eingabe wird kurzzeitig im Arbeitsspeicher gepuffert.</span>
                                    <span data-lang-en style="display:none;">The input is briefly buffered in memory.</span>
                                </span>
                            </span>
                            <span class="hw-data-tag">02</span>
                        </div>

                        <div class="hw-data-block" style="--i:2; --c:#3b82f6;">
                            <span class="ico"><i class="fa-solid fa-microchip"></i></span>
                            <span class="hw-data-info">
                                <span class="t">
                                    <span data-lang-de>CPU: Verarbeitung &amp; Berechnung</span>
                                    <span data-lang-en style="display:none;">CPU: processing &amp; computation</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Der Prozessor führt die nötigen Operationen aus.</span>
                                    <span data-lang-en style="display:none;">The processor performs the required operations.</span>
                                </span>
                            </span>
                            <span class="hw-data-tag">03</span>
                        </div>

                        <div class="hw-data-block" style="--i:3; --c:#f59e0b;">
                            <span class="ico"><i class="fa-solid fa-hard-drive"></i></span>
                            <span class="hw-data-info">
                                <span class="t">
                                    <span data-lang-de>Speicher: dauerhafte Ablage (SSD/HDD)</span>
                                    <span data-lang-en style="display:none;">Storage: permanent save (SSD/HDD)</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Ergebnisse werden dauerhaft auf SSD/HDD geschrieben.</span>
                                    <span data-lang-en style="display:none;">Results are written permanently to SSD/HDD.</span>
                                </span>
                            </span>
                            <span class="hw-data-tag">04</span>
                        </div>

                        <div class="hw-data-block" style="--i:4; --c:#8b5cf6;">
                            <span class="ico"><i class="fa-solid fa-display"></i></span>
                            <span class="hw-data-info">
                                <span class="t">
                                    <span data-lang-de>Ausgabe: Monitor zeigt das Ergebnis</span>
                                    <span data-lang-en style="display:none;">Output: monitor shows the result</span>
                                </span>
                                <span class="s">
                                    <span data-lang-de>Der Benutzer sieht das verarbeitete Ergebnis.</span>
                                    <span data-lang-en style="display:none;">The user sees the processed result.</span>
                                </span>
                            </span>
                            <span class="hw-data-tag">05</span>
                        </div>
                    </div>

                    <div class="hw-data-side right">
                        <span class="lbl">
                            <span data-lang-de>Ausgabe</span>
                            <span data-lang-en style="display:none;">Output</span>
                        </span>
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
            { icon: 'fa-globe',         href: 'https://de.wikipedia.org/wiki/Hardware',           target: '_blank', labelDe: 'Wikipedia: Hardware',              labelEn: 'Wikipedia: Hardware' },
            { icon: 'fa-link',          href: 'https://de.wikipedia.org/wiki/Netzwerkhardware',  target: '_blank', labelDe: 'Wikipedia: Netzwerkhardware',      labelEn: 'Wikipedia: Network Hardware' },
            { icon: 'fa-external-link', href: 'https://www.computerhope.com/',                    target: '_blank', labelDe: 'Computer Hope',                    labelEn: 'Computer Hope' },
            { icon: 'fa-paperclip',     href: 'https://www.tomshardware.com/',                    target: '_blank', labelDe: 'Tom\'s Hardware',                  labelEn: 'Tom\'s Hardware' }
        ]
    },

    footer: {
        textDe: 'Hardware-Übersicht 2026',
        textEn: 'Hardware Overview 2026'
    }
});