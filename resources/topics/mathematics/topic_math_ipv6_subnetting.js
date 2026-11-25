registerTopic({
    id: 'MathsIPv6Subnetting',
    parentId: 'Mathematics',
    icon: 'fa-diagram-project',
    titleDe: 'IPv6-Subnetting',
    titleEn: 'IPv6 subnetting',
    descDe: 'IPv6-Präfixe und Subnetz-IDs verstehen – mit einer animierten Schritt-für-Schritt-Erklärung.',
    descEn: 'Understand IPv6 prefixes and subnet IDs with a step-by-step animation.',

    sidebarTitleDe: 'IPv6-Subnetting',
    sidebarTitleEn: 'IPv6 subnetting',
    sidebarSubtitleDe: 'Subnetzpräfixe',
    sidebarSubtitleEn: 'Subnet prefixes',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'IPv6-Subnetting',
        titleEn: 'IPv6 subnetting',
        introDe: 'IPv6-Präfixe markieren die Netzwerkbits einer 128-Bit-Adresse. Lerne, wie ein zugewiesenes Präfix in Subnetze unterteilt wird und warum /64 für viele lokale Netze üblich ist.',
        introEn: 'IPv6 prefixes mark the network bits of a 128-bit address. Learn how an allocated prefix is divided into subnets and why /64 is common for many local networks.'
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
            introDe: 'IPv6 verwendet Präfixlängen statt einer dezimalen Subnetzmaske wie IPv4.',
            introEn: 'IPv6 uses prefix lengths rather than a dotted-decimal subnet mask like IPv4.',
            subtopics: [
                {
                    id: 'ipv6-prefix',
                    titleDe: 'Präfixlängen und Hextetts',
                    titleEn: 'Prefix lengths and hextets',
                    htmlDe: '<p class="text-xs mb-2">Eine IPv6-Adresse hat 128 Bits und wird in acht Hextetts zu je 16 Bits geschrieben. Ein Präfix wie <code>/48</code> legt die ersten 48 Bits als Netzpräfix fest; weitere Präfixbits können Subnetze kennzeichnen.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">Subnetzbits = Zielpräfix − Ausgangspräfix<br>/64 − /48 = 16 Bit</div><p class="text-xs text-[var(--text-muted)]">IPv6 verwendet keine Broadcastadressen. Ein /64 lässt 64 Bits für den Interface-Identifier und wird für viele SLAAC-fähige lokale Netze verwendet.</p>',
                    htmlEn: '<p class="text-xs mb-2">An IPv6 address has 128 bits, written as eight 16-bit hextets. A prefix such as <code>/48</code> fixes the first 48 bits as the network prefix; additional prefix bits can identify subnets.</p><div class="bg-[var(--code-bg)] p-3 rounded text-sm font-mono leading-6 text-[var(--text-color)] mb-3">Subnet bits = target prefix − base prefix<br>/64 − /48 = 16 bits</div><p class="text-xs text-[var(--text-muted)]">IPv6 has no broadcast addresses. A /64 leaves 64 bits for the interface identifier and is used by many SLAAC-capable local networks.</p>'
                }
            ]
        },
        {
            id: 'section2',
            titleDe: 'Rechenbeispiel',
            titleEn: 'Worked example',
            introDe: 'Ein Provider-Präfix /48 kann in /64-Netze für einzelne Standorte unterteilt werden.',
            introEn: 'A provider-assigned /48 prefix can be divided into /64 networks for individual sites.',
            subtopics: [
                {
                    id: 'ipv6-subnet-count',
                    titleDe: 'Anzahl der /64-Subnetze',
                    titleEn: 'Number of /64 subnets',
                    htmlDe: '<p class="text-xs">Zwischen <code>/48</code> und <code>/64</code> liegen 16 Subnetzbits. Damit entstehen <code>2<sup>16</sup> = 65.536</code> mögliche /64-Subnetze. Beim Beispielpräfix <code>2001:db8:1234::/48</code> kann das vierte Hextett die Subnetz-ID tragen, etwa <code>2001:db8:1234:1::/64</code>.</p>',
                    htmlEn: '<p class="text-xs">There are 16 subnet bits between <code>/48</code> and <code>/64</code>, giving <code>2<sup>16</sup> = 65,536</code> possible /64 subnets. With the example prefix <code>2001:db8:1234::/48</code>, the fourth hextet can hold the subnet ID, such as <code>2001:db8:1234:1::/64</code>.</p>'
                }
            ]
        },
        {
            id: 'section3',
            titleDe: 'Handschriftliche Animation',
            titleEn: 'Handwritten animation',
            introDe: 'Verfolge die Aufteilung eines /48-Präfixes in /64-Netze. Die Animation übernimmt Sprache und Darstellung aus den globalen Einstellungen.',
            introEn: 'Follow a /48 prefix as it is divided into /64 networks. The animation follows the global language and appearance settings.',
            subtopics: [
                {
                    id: 'ipv6-subnet-animation',
                    titleDe: 'IPv6-Subnetzpräfix – Animation',
                    titleEn: 'IPv6 subnet prefix – animation',
                    htmlDe: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handschriftliche IPv6-Subnetting-Animation" src="resources/animations/subnet_ipv6_animation.html?lang=de" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div>',
                    htmlEn: '<div class="overflow-hidden rounded-xl border border-[var(--panel-border)] shadow-[var(--control-shadow)]" style="height: min(90vh, 900px); min-height: 480px;"><iframe title="Handwritten IPv6 subnetting animation" src="resources/animations/subnet_ipv6_animation.html?lang=en" loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" class="block w-full" style="height: 100%;" data-global-theme-sync onload="App.themes.syncFrame(this)"></iframe></div>'
                }
            ]
        }
    ],

    footer: {
        textDe: 'Mathematik · IPv6-Subnetting · 2026',
        textEn: 'Mathematics · IPv6 subnetting · 2026'
    }
});
