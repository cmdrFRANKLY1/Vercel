registerTopic({
    id: 'MathsIPv4Subnetting',
    parentId: 'Mathematics',
    icon: 'fa-network-wired',
    titleDe: 'IPv4-Subnetting',
    titleEn: 'IPv4 subnetting',
    descDe: 'IPv4-Subnetzmasken und CIDR-Präfixe berechnen und verstehen – mit einer animierten Schritt-für-Schritt-Erklärung.',
    descEn: 'Understand and calculate IPv4 subnet masks and CIDR prefixes with a step-by-step animation.',

    sidebarTitleDe: 'IPv4-Subnetting',
    sidebarTitleEn: 'IPv4 subnetting',
    sidebarSubtitleDe: 'Subnetzmasken',
    sidebarSubtitleEn: 'Subnet masks',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'IPv4-Subnetting',
        titleEn: 'IPv4 subnetting',
        introDe: 'Eine IPv4-Subnetzmaske teilt die 32 Bit einer Adresse in Netzwerk- und Hostanteil. Lerne, wie CIDR-Präfixe in Masken umgerechnet werden und wie daraus Netzadresse, Broadcast und Hostbereich folgen.',
        introEn: 'An IPv4 subnet mask divides the 32 bits of an address into network and host portions. Learn to convert CIDR prefixes into masks and derive the network address, broadcast, and host range.'
    },

    quickLinks: [
        { icon: 'fa-lightbulb', href: '#section1', switchToDoc: true, labelDe: 'Grundlagen', labelEn: 'Basics' },
        { icon: 'fa-calculator', href: '#section2', switchToDoc: true, labelDe: 'Rechenbeispiel', labelEn: 'Worked example' },
        { icon: 'fa-film', href: '#section3', switchToDoc: true, labelDe: 'Animation', labelEn: 'Animation' }
    ],

    sections: [
        {
            id: 'section1',
            titleDe: 'Grundlagen',
            titleEn: 'Basics',
            introDe: 'Das Präfix zählt die Netzwerkbits von links; die übrigen Bits stehen für Adressen innerhalb des Subnetzes.',
            introEn: 'The prefix counts network bits from the left; the remaining bits represent addresses within the subnet.',
            subtopics: [
                {
                    id: 'ipv4-prefix-mask',
                    titleDe: 'CIDR-Präfix und Subnetzmaske',
                    titleEn: 'CIDR prefix and subnet mask',
                    htmlDe: '<p class="text-xs mb-2">IPv4-Adressen bestehen aus 32 Bits. Bei <code>/27</code> sind die ersten 27 Bits Netzwerkbits und die restlichen 5 Hostbits. Die Maske lautet binär <code>11111111.11111111.11111111.11100000</code>, also dezimal <code>255.255.255.224</code>.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">Hostbits = 32 − Präfix<br>Adressen = 2<sup>Hostbits</sup></div><p class="text-xs text-[var(--text-muted)]">In einem üblichen IPv4-Subnetz mit Broadcastadresse sind zwei Adressen für Netzwerk und Broadcast reserviert.</p>',
                    htmlEn: '<p class="text-xs mb-2">IPv4 addresses contain 32 bits. With <code>/27</code>, the first 27 bits are network bits and the remaining 5 are host bits. The mask is <code>11111111.11111111.11111111.11100000</code> in binary, or <code>255.255.255.224</code> in decimal.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">Host bits = 32 − prefix<br>Addresses = 2<sup>host bits</sup></div><p class="text-xs text-[var(--text-muted)]">In a typical IPv4 subnet with a broadcast address, two addresses are reserved for the network and broadcast.</p>'
                }
            ]
        },
        {
            id: 'section2',
            titleDe: 'Rechenbeispiel',
            titleEn: 'Worked example',
            introDe: 'Für 192.168.10.45/27 lässt sich die letzte Oktettgrenze mit der Blockgröße bestimmen.',
            introEn: 'For 192.168.10.45/27, use the block size to find the subnet boundary in the last octet.',
            subtopics: [
                {
                    id: 'ipv4-network-range',
                    titleDe: 'Netzadresse und Hostbereich',
                    titleEn: 'Network address and host range',
                    htmlDe: '<p class="text-xs">Die Maske <code>255.255.255.224</code> hat im letzten Oktett den Wert 224. Die Blockgröße ist <code>256 − 224 = 32</code>. Die 45 liegt im Block 32–63: Netzadresse <code>192.168.10.32</code>, nutzbare Hosts <code>192.168.10.33–192.168.10.62</code> und Broadcast <code>192.168.10.63</code>. Das sind <code>2<sup>5</sup> − 2 = 30</code> nutzbare Hostadressen.</p>',
                    htmlEn: '<p class="text-xs">The mask <code>255.255.255.224</code> has a value of 224 in the last octet. The block size is <code>256 − 224 = 32</code>. The address 45 falls in the 32–63 block: network <code>192.168.10.32</code>, usable hosts <code>192.168.10.33–192.168.10.62</code>, and broadcast <code>192.168.10.63</code>. That gives <code>2<sup>5</sup> − 2 = 30</code> usable host addresses.</p>'
                }
            ]
        },
        {
            id: 'section3',
            titleDe: 'Handschriftliche Animation',
            titleEn: 'Handwritten animation',
            introDe: 'Die Animation rechnet das Beispiel 192.168.10.45/27 in fünf Schritten durch und übernimmt Sprache und Darstellung aus den globalen Einstellungen.',
            introEn: 'The animation works through 192.168.10.45/27 in five steps and follows the global language and appearance settings.',
            subtopics: [
                {
                    id: 'ipv4-subnet-animation',
                    titleDe: 'IPv4-Subnetzmaske – Animation',
                    titleEn: 'IPv4 subnet mask – animation',
                    htmlDe: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handschriftliche IPv4-Subnetting-Animation" src="resources/animations/subnet_ipv4_animation.html?lang=de" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div>',
                    htmlEn: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handwritten IPv4 subnetting animation" src="resources/animations/subnet_ipv4_animation.html?lang=en" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div>'
                }
            ]
        }
    ],

    footer: {
        textDe: 'Mathematik · IPv4-Subnetting · 2026',
        textEn: 'Mathematics · IPv4 subnetting · 2026'
    }
});
