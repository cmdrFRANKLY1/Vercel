// resources/topics/topic_tailscale.js
// Registers the Tailscale mesh VPN reference topic. Loaded via <script> injection.

/* ==================================================================
   TAILSCALE CODE-BLOCK COPY CONTROLLER
   ================================================================== */
(function () {
    'use strict';

    function deepQueryAll(root, selector, out) {
        out = out || [];
        try {
            root.querySelectorAll(selector).forEach(function (el) { out.push(el); });
            var all = root.querySelectorAll('*');
            for (var i = 0; i < all.length; i++) {
                if (all[i].shadowRoot) deepQueryAll(all[i].shadowRoot, selector, out);
            }
        } catch (_) {}
        return out;
    }
    function allDocuments() {
        var docs = [document];
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            try {
                if (iframes[i].contentDocument) docs.push(iframes[i].contentDocument);
            } catch (_) {}
        }
        return docs;
    }

    function flashButton(btn, ok) {
        var original = btn.getAttribute('data-label') || 'Copy';
        btn.textContent = ok ? '✓ Copied!' : '⚠ Failed';
        btn.classList.add(ok ? 'is-copied' : 'is-failed');
        setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove('is-copied', 'is-failed');
        }, 1500);
    }

    function attachCopyButton(block) {
        if (!block || block.__jfWired) return;
        block.__jfWired = true;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'jf-copy-btn';
        btn.setAttribute('data-label', 'Copy');
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        block.appendChild(btn);

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var target = block.querySelector('pre, code, .jf-code-inner');
            var text = target ? (target.innerText || target.textContent || '') : '';
            text = text.replace(/\s+$/, '');

            var done = function (ok) { flashButton(btn, ok); };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(function () { done(true); })
                    .catch(function () { fallbackCopy(text, done); });
            } else {
                fallbackCopy(text, done);
            }
        });
    }

    function fallbackCopy(text, done) {
        try {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, 99999);
            var ok = document.execCommand('copy');
            document.body.removeChild(ta);
            done(ok);
        } catch (_) {
            done(false);
        }
    }

    function scan() {
        allDocuments().forEach(function (doc) {
            try {
                deepQueryAll(doc, '.jf-code').forEach(attachCopyButton);
            } catch (_) {}
        });
    }

    function start() {
        scan();
        setInterval(scan, 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();


/* ==================================================================
   TOPIC REGISTRATION
   ================================================================== */
registerTopic({
    parentId: 'Programme',
    id: 'Tailscale Overview',
    icon: 'fa-network-wired',
    titleDe: 'Tailscale',
    titleEn: 'Tailscale',
    descDe: 'Zero-Trust Mesh-VPN auf WireGuard-Basis',
    descEn: 'Zero Trust Mesh VPN based on WireGuard',

    sidebarTitleDe: 'Tailscale',
    sidebarTitleEn: 'Tailscale',
    sidebarSubtitleDe: 'Mesh-VPN für moderne Infrastrukturen',
    sidebarSubtitleEn: 'Mesh VPN for Modern Infrastructure',
    sidebarVersion: 'v1.94+',

    hero: {
        titleDe: 'Tailscale: Das Mesh-VPN ohne Konfiguration',
        titleEn: 'Tailscale: The Zero-Config Mesh VPN',
        introDe: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> ist eine <strong>Zero-Trust identity-basierte Konnektivitätsplattform</strong>, die Ihr Legacy-<a href="https://en.wikipedia.org/wiki/Virtual_private_network" target="_blank" class="topic-link">VPN</a>, <a href="https://en.wikipedia.org/wiki/Secure_access_service_edge" target="_blank" class="topic-link">SASE</a> und <a href="https://en.wikipedia.org/wiki/Privileged_access_management" target="_blank" class="topic-link">PAM</a> ersetzt und Remote-Teams, Multi-Cloud-Umgebungen, CI/CD-Pipelines, Edge- und IoT-Geräte sowie KI-Workloads verbindet. Basierend auf dem <strong><a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a>-Protokoll</strong> ermöglicht es verschlüsselte Punkt-zu-Punkt-Verbindungen ohne komplexe Netzwerkkonfiguration. <a href="https://tailscale.com/docs/" target="_blank" class="topic-link">Zur offiziellen Dokumentation</a>.',
        introEn: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> is a <strong>Zero Trust identity-based connectivity platform</strong> that replaces your legacy <a href="https://en.wikipedia.org/wiki/Virtual_private_network" target="_blank" class="topic-link">VPN</a>, <a href="https://en.wikipedia.org/wiki/Secure_access_service_edge" target="_blank" class="topic-link">SASE</a>, and <a href="https://en.wikipedia.org/wiki/Privileged_access_management" target="_blank" class="topic-link">PAM</a> and connects remote teams, multi-cloud environments, CI/CD pipelines, Edge & IoT devices, and AI workloads. Built on the <strong><a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard protocol</a></strong>, it enables encrypted point-to-point connections without complex network configuration. <a href="https://tailscale.com/docs/" target="_blank" class="topic-link">Visit the official documentation</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-route',             href: '#section3', switchToDoc: true, labelDe: 'Subnet Router',  labelEn: 'Subnet Router' },
        { icon: 'fa-lock',              href: '#section4', switchToDoc: true, labelDe: 'ACLs',           labelEn: 'ACLs' },
        { icon: 'fa-docker',            href: '#section5', switchToDoc: true, labelDe: 'Docker',         labelEn: 'Docker' },
        { icon: 'fa-cog',               href: '#section6', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://tailscale.com/docs/', target: '_blank', labelDe: 'Offizielle Doku', labelEn: 'Official Docs' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Architektur',
            titleEn: '1. Overview & Architecture',
            introDe: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> implementiert ein <strong>Mesh-Netzwerk</strong> (auch bekannt als "tailnet"), in dem jedes Gerät direkt mit jedem anderen kommunizieren kann. Der zentrale Koordinationsserver verwaltet die Netzwerktopologie und Schlüssel, transportiert aber <strong>keinen Nutzdatenverkehr</strong>. Die eigentliche Datenübertragung erfolgt direkt zwischen den Geräten über <a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a>. Mehr dazu in den <a href="https://tailscale.com/docs/concepts" target="_blank" class="topic-link">technischen Übersichten</a>.',
            introEn: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> implements a <strong>mesh network</strong> (also known as a "tailnet") where every device can communicate directly with every other device. The central coordination server manages network topology and keys but <strong>carries no user traffic</strong>. Actual data transfer happens directly between devices over <a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a>. Learn more in the <a href="https://tailscale.com/docs/concepts" target="_blank" class="topic-link">technical overviews</a>.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Tailscale?',
                    titleEn: 'What is Tailscale?',
                    htmlDe: `
                    <style>
                        /* ---------- scoped topic styles ---------- */
                        .jf-code {
                            position: relative;
                            background: #06080b;
                            border: 1px solid var(--border-color);
                            border-radius: 0.45rem;
                            margin: 0.55rem 0;
                            overflow: hidden;
                            box-shadow: inset 0 1px 0 rgba(255,255,255,0.04),
                                        0 1px 2px rgba(0,0,0,0.35);
                        }
                        .jf-code-inner {
                            display: block;
                            padding: 0.85rem 1rem;
                            font-family: 'Courier New', Menlo, Consolas, monospace;
                            font-size: 0.72rem;
                            line-height: 1.55;
                            color: var(--text-color);
                            white-space: pre;
                            overflow-x: auto;
                            margin: 0;
                            tab-size: 4;
                            background: transparent;
                        }
                        .jf-copy-btn {
                            position: absolute;
                            top: 0.5rem;
                            right: 0.5rem;
                            padding: 0.35rem 0.7rem;
                            font-size: 0.62rem;
                            font-weight: 800;
                            letter-spacing: 0.03em;
                            border-radius: 0.35rem;
                            border: 1px solid var(--border-color);
                            background: var(--panel-color);
                            color: var(--text-color);
                            cursor: pointer;
                            opacity: 0;
                            transform: translateY(-4px);
                            transition: opacity 0.2s ease, transform 0.2s ease, background 0.15s ease, border-color 0.15s ease;
                            z-index: 2;
                            user-select: none;
                            font-family: inherit;
                        }
                        .jf-code:hover .jf-copy-btn,
                        .jf-copy-btn:focus {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        .jf-copy-btn:hover {
                            background: color-mix(in srgb, var(--link-color) 15%, var(--panel-color));
                            border-color: var(--link-color);
                        }
                        .jf-copy-btn.is-copied {
                            background: #10b981;
                            border-color: #10b981;
                            color: #fff;
                        }
                        .jf-copy-btn.is-failed {
                            background: #ef4444;
                            border-color: #ef4444;
                            color: #fff;
                        }

                        /* ---------- HIGHLIGHTED HYPERLINKS ---------- */
                        /* Only EXTERNAL links (href starting with http) inside */
                        /* the topic body get the high-visibility treatment.    */
                        /* Navigation anchors (href="#sectionN") are excluded.  */
                        .wikitable a[href^="http"],
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"] {
                            color: var(--link-color);
                            text-decoration: underline;
                            text-decoration-thickness: 2px;
                            text-underline-offset: 2px;
                            font-weight: 600;
                            transition: color 0.15s ease, background 0.15s ease, text-decoration-color 0.15s ease;
                            border-radius: 0.2rem;
                            padding: 0.05rem 0.15rem;
                        }
                        .wikitable a[href^="http"]:hover,
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"]:hover {
                            color: var(--link-hover-color, var(--link-color));
                            background: color-mix(in srgb, var(--link-color) 18%, transparent);
                            text-decoration-thickness: 3px;
                        }
                        .wikitable a[href^="http"]:visited,
                        .bg-\\[var\\(--panel-color\\)\\] a[href^="http"]:visited {
                            color: var(--link-color);
                            opacity: 0.85;
                        }

                        /* External links get a small arrow */
                        a[target="_blank"].topic-link::after,
                        .wikitable a[target="_blank"]::after {
                            content: "\\2197";              /* ↗ */
                            display: inline-block;
                            margin-left: 0.2em;
                            font-size: 0.75em;
                            opacity: 0.75;
                            transition: transform 0.15s ease, opacity 0.15s ease;
                        }
                        a[target="_blank"].topic-link:hover::after,
                        .wikitable a[target="_blank"]:hover::after {
                            transform: translate(1px, -1px);
                            opacity: 1;
                        }

                        /* Links inside <code> keep monospace but stay clickable */
                        code a,
                        .jf-code-inner a {
                            font-family: inherit;
                            color: var(--link-color);
                            text-decoration: underline;
                            text-underline-offset: 2px;
                            font-weight: 600;
                        }

                        /* Neutralize navigation anchors */
                        a[href^="#"] {
                            text-decoration: none;
                            background: none;
                            padding: 0;
                        }

                        @media (max-width: 560px) {
                            .jf-code-inner { font-size: 0.66rem; padding: 0.7rem 0.8rem; }
                            .jf-copy-btn { opacity: 1; transform: translateY(0); }
                        }
                    </style>

                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Zero-Trust Identity-basierte Mesh-<a href="https://en.wikipedia.org/wiki/Virtual_private_network" target="_blank" class="topic-link">VPN</a>-Plattform.</td></tr>
                    <tr><td><strong>Protokoll</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a> (<a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a>, modern, kryptographisch sicher).</td></tr>
                    <tr><td><strong>Modell</strong></td><td class="text-[var(--text-muted)]">Peer-to-Peer Mesh. Koordinationsserver nur für Topologie & Keys.</td></tr>
                    <tr><td><strong>NAT-Traversal</strong></td><td class="text-[var(--text-muted)]">Automatisch via DERP-Relays und <a href="https://en.wikipedia.org/wiki/STUN" target="_blank" class="topic-link">STUN</a>. Keine Portfreigaben nötig.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>, tvOS, <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>, <a href="https://kubernetes.io/" target="_blank" class="topic-link">Kubernetes</a>.</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Sichere Verbindung zwischen allen Geräten, Subnet-Routing, Exit Nodes, <a href="https://en.wikipedia.org/wiki/Secure_Shell" target="_blank" class="topic-link">SSH</a>.</td></tr>
                    <tr><td><strong>Preismodell</strong></td><td class="text-[var(--text-muted)]">Kostenlos für bis zu 3 Nutzer / 100 Geräte. Premium-Pläne für Teams.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Zero Trust identity-based mesh <a href="https://en.wikipedia.org/wiki/Virtual_private_network" target="_blank" class="topic-link">VPN</a> platform.</td></tr>
                    <tr><td><strong>Protocol</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a> (<a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a>, modern, cryptographically secure).</td></tr>
                    <tr><td><strong>Model</strong></td><td class="text-[var(--text-muted)]">Peer-to-peer mesh. Coordination server only for topology & keys.</td></tr>
                    <tr><td><strong>NAT traversal</strong></td><td class="text-[var(--text-muted)]">Automatic via DERP relays and <a href="https://en.wikipedia.org/wiki/STUN" target="_blank" class="topic-link">STUN</a>. No port forwarding required.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>, tvOS, <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>, <a href="https://kubernetes.io/" target="_blank" class="topic-link">Kubernetes</a>.</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">Secure connection between all devices, subnet routing, exit nodes, <a href="https://en.wikipedia.org/wiki/Secure_Shell" target="_blank" class="topic-link">SSH</a>.</td></tr>
                    <tr><td><strong>Pricing</strong></td><td class="text-[var(--text-muted)]">Free for up to 3 users / 100 devices. Premium plans for teams.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Architektur: Koordinationsserver & DERP',
                    titleEn: 'Architecture: Coordination Server & DERP',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Zentrale Komponenten:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Koordinationsserver:</strong> Verwaltet öffentliche Schlüssel, Netzwerktopologie und ACLs. <em>Transportiert keine Nutzdaten.</em></li>
                    <li><strong>DERP (Designated Encrypted Relay for Packets):</strong> Relay-Server, die zum Einsatz kommen, wenn eine direkte Verbindung nicht möglich ist (z.B. bei symmetrischem <a href="https://en.wikipedia.org/wiki/Network_address_translation" target="_blank" class="topic-link">NAT</a>). Die Ende-zu-Ende-Verschlüsselung bleibt erhalten.</li>
                    <li><strong><a href="https://en.wikipedia.org/wiki/STUN" target="_blank" class="topic-link">STUN</a>:</strong> Wird für NAT-Traversal verwendet, um die öffentliche IP und den Port eines Geräts zu ermitteln.</li>
                    <li><strong><a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a>:</strong> Das zugrundeliegende VPN-Protokoll. Schnell, modern und im <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Kernel integriert.</li>
                    </ul>
                    <p class="mt-3"><strong>Mental Model:</strong> Stellen Sie sich ein privates U-Bahn-System vor. Jede Station (Gerät) kennt jede andere. Züge (Pakete) fahren direkt zwischen den Stationen. Der Netzplan (Koordinationsserver) wird zentral verwaltet, befördert aber keine Passagiere. Mehr Details in der <a href="https://tailscale.com/blog/how-tailscale-works" target="_blank" class="topic-link">offiziellen Architektur-Erklärung</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Core components:</strong></p>
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Coordination server:</strong> Manages public keys, network topology, and ACLs. <em>Carries no user traffic.</em></li>
                    <li><strong>DERP (Designated Encrypted Relay for Packets):</strong> Relay servers used when a direct connection is not possible (e.g., symmetric <a href="https://en.wikipedia.org/wiki/Network_address_translation" target="_blank" class="topic-link">NAT</a>). End-to-end encryption is preserved.</li>
                    <li><strong><a href="https://en.wikipedia.org/wiki/STUN" target="_blank" class="topic-link">STUN</a>:</strong> Used for NAT traversal to discover a device's public IP and port.</li>
                    <li><strong><a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a>:</strong> The underlying VPN protocol. Fast, modern, and integrated into the <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> kernel.</li>
                    </ul>
                    <p class="mt-3"><strong>Mental model:</strong> Think of it as your own private subway system. Every station (device) knows where every other station is. Trains (packets) travel directly between stations. The map (coordination server) is maintained centrally but carries zero passengers. More details in the <a href="https://tailscale.com/blog/how-tailscale-works" target="_blank" class="topic-link">official architecture explanation</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> ist für praktisch alle gängigen Plattformen verfügbar. Die Installation erfolgt über Paketmanager, Installer oder <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>-Images. Nach der Installation wird <code>tailscale up</code> ausgeführt, um sich im Netzwerk zu authentifizieren. Weitere Details in der <a href="https://tailscale.com/download" target="_blank" class="topic-link">offiziellen Download-Seite</a>.',
            introEn: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> is available for virtually all common platforms. Installation is done via package managers, installers, or <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> images. After installation, run <code>tailscale up</code> to authenticate with the network. See the <a href="https://tailscale.com/download" target="_blank" class="topic-link">official download page</a> for details.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/linux" target="_blank" class="topic-link">Linux</a></strong></td><td class="text-[var(--text-muted)]">Offizielle Repositories für <a href="https://www.debian.org/" target="_blank" class="topic-link">Debian</a>/<a href="https://ubuntu.com/" target="_blank" class="topic-link">Ubuntu</a>, <a href="https://fedoraproject.org/" target="_blank" class="topic-link">Fedora</a>, <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch</a>, <a href="https://www.opensuse.org/" target="_blank" class="topic-link">openSUSE</a>. Installation via <code>apt</code>, <code>dnf</code>, <code>pacman</code>, <code>zypper</code>.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer (MSI) oder portable Version. GUI und CLI verfügbar.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/mac" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG-Installer oder Mac App Store. Native GUI-Integration.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/ios" target="_blank" class="topic-link">iOS / iPadOS</a></strong></td><td class="text-[var(--text-muted)]">App Store. Volle Integration mit iOS-Netzwerkerweiterungen.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/android" target="_blank" class="topic-link">Android</a></strong></td><td class="text-[var(--text-muted)]">Google Play oder F-Droid. VPN-Dienst-Integration.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/docker" target="_blank" class="topic-link">Docker</a></strong></td><td class="text-[var(--text-muted)]">Offizielles Image <code>tailscale/tailscale</code>. Für Container-Workloads.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/linux" target="_blank" class="topic-link">Linux</a></strong></td><td class="text-[var(--text-muted)]">Official repos for <a href="https://www.debian.org/" target="_blank" class="topic-link">Debian</a>/<a href="https://ubuntu.com/" target="_blank" class="topic-link">Ubuntu</a>, <a href="https://fedoraproject.org/" target="_blank" class="topic-link">Fedora</a>, <a href="https://archlinux.org/" target="_blank" class="topic-link">Arch</a>, <a href="https://www.opensuse.org/" target="_blank" class="topic-link">openSUSE</a>. Install via <code>apt</code>, <code>dnf</code>, <code>pacman</code>, <code>zypper</code>.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Installer (MSI) or portable version. GUI and CLI available.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/mac" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">DMG installer or Mac App Store. Native GUI integration.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/ios" target="_blank" class="topic-link">iOS / iPadOS</a></strong></td><td class="text-[var(--text-muted)]">App Store. Full integration with iOS network extensions.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/android" target="_blank" class="topic-link">Android</a></strong></td><td class="text-[var(--text-muted)]">Google Play or F-Droid. VPN service integration.</td></tr>
                    <tr><td><strong><a href="https://tailscale.com/download/docker" target="_blank" class="topic-link">Docker</a></strong></td><td class="text-[var(--text-muted)]">Official image <code>tailscale/tailscale</code>. For container workloads.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Debian / Ubuntu Installation',
                    titleEn: 'Debian / Ubuntu Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Installation über das offizielle Skript:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">curl -fsSL https://tailscale.com/install.sh | sh</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Starten und authentifizieren:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>IP-Adresse anzeigen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">tailscale ip -4</pre>
                    </div>
                    <p class="mt-3">Nach dem Start wird ein Authentifizierungs-URL ausgegeben. Diese im Browser öffnen und mit dem <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a>-Konto anmelden. Weitere Details in der <a href="https://tailscale.com/docs/install/linux" target="_blank" class="topic-link">offiziellen Linux-Installationsanleitung</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Installation via the official script:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">curl -fsSL https://tailscale.com/install.sh | sh</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Start and authenticate:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Show IP address:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">tailscale ip -4</pre>
                    </div>
                    <p class="mt-3">After starting, an authentication URL is displayed. Open it in a browser and sign in with your <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> account. See the <a href="https://tailscale.com/docs/install/linux" target="_blank" class="topic-link">official Linux installation guide</a> for details.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. SUBNET ROUTER ============ */
        {
            id: 'section3',
            titleDe: '3. Subnet Router',
            titleEn: '3. Subnet Router',
            introDe: 'Ein <strong>Subnet Router</strong> ist ein Gerät in Ihrem lokalen Netzwerk, das <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> ausführt und das lokale Subnetz für Ihr Tailnet bewirbt. Dadurch können alle Geräte in Ihrem Tailnet auf jede IP-Adresse im beworbenen Subnetz zugreifen – ohne dass auf den Zielgeräten <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> installiert sein muss.',
            introEn: 'A <strong>subnet router</strong> is a device on your local network that runs <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> and advertises the local subnet to your tailnet. This allows any device on your tailnet to reach every IP address on that subnet – without requiring <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> to be installed on the target devices.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Subnet Router einrichten',
                    titleEn: 'Configure a Subnet Router',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Schritte auf <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mb-3">
                    <li>IP-Forwarding aktivieren:</li>
                    </ol>
                    <div class="jf-code">
                        <pre class="jf-code-inner">echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf</pre>
                    </div>
                    <ol class="list-decimal pl-5 space-y-2 mb-3" start="2">
                    <li>Subnetzrouten bewerben:</li>
                    </ol>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale set --advertise-routes=192.0.2.0/24,198.51.100.0/24</pre>
                    </div>
                    <p class="mt-3"><strong>Routen in der Admin-Konsole genehmigen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Zur <a href="https://console.tailscale.com/admin/machines" target="_blank" class="topic-link">Machines-Seite</a> navigieren.</li>
                    <li>Das Gerät mit dem <strong>Subnets</strong>-Badge finden.</li>
                    <li>Menü öffnen → <strong>Edit route settings</strong> → Routen aktivieren → <strong>Save</strong>.</li>
                    </ul>
                    <p class="mt-3"><strong>Routen auf Client-Seite akzeptieren (Linux):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --accept-routes</pre>
                    </div>
                    <p class="mt-3">Weitere Details in der <a href="https://tailscale.com/kb/1019/subnets" target="_blank" class="topic-link">offiziellen Subnet-Router-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Steps on <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>:</strong></p>
                    <ol class="list-decimal pl-5 space-y-2 mb-3">
                    <li>Enable IP forwarding:</li>
                    </ol>
                    <div class="jf-code">
                        <pre class="jf-code-inner">echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf</pre>
                    </div>
                    <ol class="list-decimal pl-5 space-y-2 mb-3" start="2">
                    <li>Advertise subnet routes:</li>
                    </ol>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale set --advertise-routes=192.0.2.0/24,198.51.100.0/24</pre>
                    </div>
                    <p class="mt-3"><strong>Approve routes in the admin console:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Go to the <a href="https://console.tailscale.com/admin/machines" target="_blank" class="topic-link">Machines page</a>.</li>
                    <li>Find the device with the <strong>Subnets</strong> badge.</li>
                    <li>Open menu → <strong>Edit route settings</strong> → enable routes → <strong>Save</strong>.</li>
                    </ul>
                    <p class="mt-3"><strong>Accept routes on the client side (Linux):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --accept-routes</pre>
                    </div>
                    <p class="mt-3">More details in the <a href="https://tailscale.com/kb/1019/subnets" target="_blank" class="topic-link">official subnet router documentation</a>.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Exit Node (gesamten Traffic routen)',
                    titleEn: 'Exit Node (Route All Traffic)',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Exit Node einrichten:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --advertise-exit-node</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Exit Node in der Admin-Konsole genehmigen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Machines-Seite → Gerät auswählen → <strong>Edit route settings</strong> → Exit Node aktivieren.</li>
                    </ul>
                    <p class="mb-2 mt-3"><strong>Exit Node auf Client nutzen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --exit-node=100.x.y.z</pre>
                    </div>
                    <p class="mt-3">Der gesamte Internet-Traffic des Clients wird nun über den Exit Node geroutet. Die IP-Adresse des Exit Nodes finden Sie mit <code>tailscale ip -4</code> auf dem entsprechenden Gerät. Weitere Details in der <a href="https://tailscale.com/kb/1103/exit-nodes" target="_blank" class="topic-link">offiziellen Exit-Node-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Set up an exit node:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --advertise-exit-node</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Approve exit node in the admin console:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-1">
                    <li>Machines page → select device → <strong>Edit route settings</strong> → enable Exit Node.</li>
                    </ul>
                    <p class="mb-2 mt-3"><strong>Use exit node on client:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --exit-node=100.x.y.z</pre>
                    </div>
                    <p class="mt-3">All internet traffic from the client is now routed through the exit node. Find the exit node's IP with <code>tailscale ip -4</code> on that device. See the <a href="https://tailscale.com/kb/1103/exit-nodes" target="_blank" class="topic-link">official exit node documentation</a> for details.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. ACLs ============ */
        {
            id: 'section4',
            titleDe: '4. Access Control Lists (ACLs)',
            titleEn: '4. Access Control Lists (ACLs)',
            introDe: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> verwendet ein <strong>deny-by-default</strong>-Modell für die Zugriffskontrolle. ACLs werden in der <strong>Tailnet Policy File</strong> mit huJSON-Syntax definiert und auf jedem Gerät lokal durchgesetzt. <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> empfiehlt mittlerweile die Migration zu <strong>Grants</strong>, einer moderneren Syntax mit erweiterten Möglichkeiten. Siehe <a href="https://tailscale.com/kb/1018/acls" target="_blank" class="topic-link">ACL-Dokumentation</a>.',
            introEn: '<a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> uses a <strong>deny-by-default</strong> model for access control. ACLs are defined in the <strong>tailnet policy file</strong> using huJSON syntax and enforced locally on each device. <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> now recommends migrating to <strong>Grants</strong>, a more modern syntax with additional capabilities. See <a href="https://tailscale.com/kb/1018/acls" target="_blank" class="topic-link">ACL documentation</a>.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'ACL-Grundlagen',
                    titleEn: 'ACL Basics',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Prinzip</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Deny-by-default</strong></td><td class="text-[var(--text-muted)]">Ohne explizite ACL ist keine Kommunikation zwischen Geräten erlaubt.</td></tr>
                    <tr><td><strong>Directional</strong></td><td class="text-[var(--text-muted)]">Eine Erlaubnis von A nach B bedeutet nicht automatisch B nach A.</td></tr>
                    <tr><td><strong>Locally enforced</strong></td><td class="text-[var(--text-muted)]">Jedes Gerät setzt eingehende Verbindungen basierend auf den verteilten Regeln durch.</td></tr>
                    <tr><td><strong>Kein Einfluss auf lokales Netz</strong></td><td class="text-[var(--text-muted)]">ACLs regeln nur den Tailnet-Verkehr, nicht lokale LAN-Zugriffe.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Wenn Sie keine ACLs definieren, gilt die <strong>Default Allow All Policy</strong> – alle Geräte können auf alle zugreifen. Um allen Verkehr zu verbieten, verwenden Sie ein leeres <code>acls</code>-Objekt. Siehe <a href="https://tailscale.com/kb/1018/acls" target="_blank" class="topic-link">ACL-Dokumentation</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Principle</th><th>Description</th></tr>
                    <tr><td><strong>Deny-by-default</strong></td><td class="text-[var(--text-muted)]">Without an explicit ACL, no communication between devices is allowed.</td></tr>
                    <tr><td><strong>Directional</strong></td><td class="text-[var(--text-muted)]">Allowing A to B does not automatically allow B to A.</td></tr>
                    <tr><td><strong>Locally enforced</strong></td><td class="text-[var(--text-muted)]">Each device enforces incoming connections based on distributed rules.</td></tr>
                    <tr><td><strong>No effect on local network</strong></td><td class="text-[var(--text-muted)]">ACLs only govern tailnet traffic, not local LAN access.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">If you don't define any ACLs, the <strong>default allow all policy</strong> applies – all devices can access all others. To deny all traffic, use an empty <code>acls</code> object. See <a href="https://tailscale.com/kb/1018/acls" target="_blank" class="topic-link">ACL documentation</a>.</p>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'ACL-Beispiele',
                    titleEn: 'ACL Examples',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Beispiel: Tag-basierter Zugriff</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">{
  "acls": [
    {
      "action": "accept",
      "src": ["tag:frontend"],
      "dst": ["tag:backend:*"]
    },
    {
      "action": "accept",
      "src": ["tag:backend"],
      "dst": ["tag:logging:*"]
    }
  ]
}</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Beispiel: Gruppenbasierter Zugriff</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">{
  "groups": {
    "group:engineering": [
      "alice@example.com",
      "bob@example.com"
    ]
  },
  "acls": [
    {
      "action": "accept",
      "src": ["group:engineering"],
      "dst": ["tag:frontend:*"]
    }
  ]
}</pre>
                    </div>
                    <p class="mt-3">ACLs können in der Admin-Konsole unter <strong>Access Controls</strong> bearbeitet werden. Weitere Beispiele finden Sie in den <a href="https://tailscale.com/kb/1018/acls" target="_blank" class="topic-link">offiziellen ACL-Beispielen</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Example: Tag-based access</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">{
  "acls": [
    {
      "action": "accept",
      "src": ["tag:frontend"],
      "dst": ["tag:backend:*"]
    },
    {
      "action": "accept",
      "src": ["tag:backend"],
      "dst": ["tag:logging:*"]
    }
  ]
}</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Example: Group-based access</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">{
  "groups": {
    "group:engineering": [
      "alice@example.com",
      "bob@example.com"
    ]
  },
  "acls": [
    {
      "action": "accept",
      "src": ["group:engineering"],
      "dst": ["tag:frontend:*"]
    }
  ]
}</pre>
                    </div>
                    <p class="mt-3">ACLs can be edited in the admin console under <strong>Access Controls</strong>. See the <a href="https://tailscale.com/kb/1018/acls" target="_blank" class="topic-link">official ACL examples</a> for more.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. DOCKER ============ */
        {
            id: 'section5',
            titleDe: '5. Tailscale in Docker',
            titleEn: '5. Tailscale in Docker',
            introDe: 'Das offizielle <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>-Image <code>tailscale/tailscale</code> ermöglicht es, Container in Ihr Tailnet einzubinden. Dies ist besonders nützlich für CI/CD-Pipelines, Microservices und Workloads, die keinen direkten Netzwerkzugriff haben sollen. Ein <strong>Auth Key</strong> wird für die automatische Authentifizierung empfohlen. Siehe <a href="https://tailscale.com/kb/1282/docker" target="_blank" class="topic-link">Docker-Dokumentation</a>.',
            introEn: 'The official <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> image <code>tailscale/tailscale</code> lets you connect containers to your tailnet. This is especially useful for CI/CD pipelines, microservices, and workloads that should not have direct network access. An <strong>auth key</strong> is recommended for automatic authentication. See <a href="https://tailscale.com/kb/1282/docker" target="_blank" class="topic-link">Docker documentation</a>.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Docker-Container starten',
                    titleEn: 'Run a Docker Container',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Image herunterladen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker pull tailscale/tailscale:latest</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Container starten (automatische Authentifizierung):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -d \\
  --name tailscale \\
  --hostname tailscale-nginx \\
  -e TS_AUTHKEY=tskey-auth-xxxxx \\
  -e TS_STATE_DIR=/var/lib/tailscale \\
  -v ./tailscale-state:/var/lib/tailscale \\
  --cap-add=net_admin \\
  --cap-add=net_raw \\
  --restart unless-stopped \\
  tailscale/tailscale:latest</pre>
                    </div>
                    <p class="mt-3"><strong>Wichtige Umgebungsvariablen:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li><code>TS_AUTHKEY</code>: Auth Key für automatische Anmeldung.</li>
                    <li><code>TS_STATE_DIR</code>: Persistenter Speicherort für den Node-State.</li>
                    <li><code>TS_ROUTES</code>: Subnetzrouten bewerben (z.B. <code>192.168.1.0/24</code>).</li>
                    <li><code>TS_EXTRA_ARGS</code>: Zusätzliche <code>tailscale up</code>-Flags.</li>
                    </ul>
                    <p class="mt-3">Weitere Details in der <a href="https://tailscale.com/kb/1282/docker" target="_blank" class="topic-link">offiziellen Docker-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Pull the image:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker pull tailscale/tailscale:latest</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Run the container (automatic auth):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -d \\
  --name tailscale \\
  --hostname tailscale-nginx \\
  -e TS_AUTHKEY=tskey-auth-xxxxx \\
  -e TS_STATE_DIR=/var/lib/tailscale \\
  -v ./tailscale-state:/var/lib/tailscale \\
  --cap-add=net_admin \\
  --cap-add=net_raw \\
  --restart unless-stopped \\
  tailscale/tailscale:latest</pre>
                    </div>
                    <p class="mt-3"><strong>Key environment variables:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li><code>TS_AUTHKEY</code>: Auth key for automatic login.</li>
                    <li><code>TS_STATE_DIR</code>: Persistent state storage location.</li>
                    <li><code>TS_ROUTES</code>: Advertise subnet routes (e.g., <code>192.168.1.0/24</code>).</li>
                    <li><code>TS_EXTRA_ARGS</code>: Additional <code>tailscale up</code> flags.</li>
                    </ul>
                    <p class="mt-3">More details in the <a href="https://tailscale.com/kb/1282/docker" target="_blank" class="topic-link">official Docker documentation</a>.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'Docker Compose Sidecar',
                    titleEn: 'Docker Compose Sidecar',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Sidecar-Pattern: <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> + Anwendung</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">services:
  tailscale:
    image: tailscale/tailscale:latest
    container_name: ts-sidecar
    hostname: my-app-node
    environment:
      - TS_AUTHKEY=\${TS_AUTHKEY}
      - TS_STATE_DIR=/var/lib/tailscale
      - TS_USERSPACE=false
      - TS_EXTRA_ARGS=--advertise-tags=tag:container
    volumes:
      - ts-state:/var/lib/tailscale
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    restart: unless-stopped

  my-app:
    image: my-app:latest
    network_mode: service:tailscale
    depends_on:
      - tailscale

volumes:
  ts-state:</pre>
                    </div>
                    <p class="mt-3">Die Anwendung teilt sich den Netzwerk-Namespace mit dem <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a>-Sidecar und ist dadurch über die <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a>-IP erreichbar.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Sidecar pattern: <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> + application</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">services:
  tailscale:
    image: tailscale/tailscale:latest
    container_name: ts-sidecar
    hostname: my-app-node
    environment:
      - TS_AUTHKEY=\${TS_AUTHKEY}
      - TS_STATE_DIR=/var/lib/tailscale
      - TS_USERSPACE=false
      - TS_EXTRA_ARGS=--advertise-tags=tag:container
    volumes:
      - ts-state:/var/lib/tailscale
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    restart: unless-stopped

  my-app:
    image: my-app:latest
    network_mode: service:tailscale
    depends_on:
      - tailscale

volumes:
  ts-state:</pre>
                    </div>
                    <p class="mt-3">The application shares the network namespace with the <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> sidecar and is reachable via the <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> IP.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. KONFIGURATION ============ */
        {
            id: 'section6',
            titleDe: '6. Konfiguration & Befehle',
            titleEn: '6. Configuration & Commands',
            introDe: 'Die <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> CLI bietet umfangreiche Steuerungsmöglichkeiten. Wichtige Befehle umfassen <code>tailscale up</code> (Verbindung herstellen), <code>tailscale status</code> (Netzwerkstatus), <code>tailscale ip</code> (IP-Adressen) und <code>tailscale ping</code> (Konnektivität testen). Weitere Details in der <a href="https://tailscale.com/kb/1080/cli" target="_blank" class="topic-link">CLI-Referenz</a>.',
            introEn: 'The <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> CLI offers extensive control options. Key commands include <code>tailscale up</code> (connect), <code>tailscale status</code> (network status), <code>tailscale ip</code> (IP addresses), and <code>tailscale ping</code> (test connectivity). See the <a href="https://tailscale.com/kb/1080/cli" target="_blank" class="topic-link">CLI reference</a> for details.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Wichtige CLI-Befehle',
                    titleEn: 'Key CLI Commands',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Befehl</th><th>Beschreibung</th></tr>
                    <tr><td><code>tailscale up</code></td><td class="text-[var(--text-muted)]">Verbindung zum Tailnet herstellen und authentifizieren.</td></tr>
                    <tr><td><code>tailscale status</code></td><td class="text-[var(--text-muted)]">Status aller Geräte im Tailnet anzeigen.</td></tr>
                    <tr><td><code>tailscale ip -4</code></td><td class="text-[var(--text-muted)]">Eigene <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> IPv4-Adresse anzeigen.</td></tr>
                    <tr><td><code>tailscale ping &lt;host&gt;</code></td><td class="text-[var(--text-muted)]">Konnektivität zu einem anderen Gerät testen.</td></tr>
                    <tr><td><code>tailscale set --advertise-routes=...</code></td><td class="text-[var(--text-muted)]">Subnetzrouten bewerben.</td></tr>
                    <tr><td><code>tailscale up --accept-routes</code></td><td class="text-[var(--text-muted)]">Beworbene Routen anderer Subnet Router akzeptieren.</td></tr>
                    <tr><td><code>tailscale up --exit-node=...</code></td><td class="text-[var(--text-muted)]">Gesamten Traffic über einen Exit Node routen.</td></tr>
                    <tr><td><code>tailscale down</code></td><td class="text-[var(--text-muted)]">Verbindung zum Tailnet trennen.</td></tr>
                    <tr><td><code>tailscale logout</code></td><td class="text-[var(--text-muted)]">Vom Tailnet abmelden und Node entfernen.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Vollständige Liste in der <a href="https://tailscale.com/kb/1080/cli" target="_blank" class="topic-link">offiziellen CLI-Referenz</a>.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Command</th><th>Description</th></tr>
                    <tr><td><code>tailscale up</code></td><td class="text-[var(--text-muted)]">Connect to tailnet and authenticate.</td></tr>
                    <tr><td><code>tailscale status</code></td><td class="text-[var(--text-muted)]">Show status of all devices in the tailnet.</td></tr>
                    <tr><td><code>tailscale ip -4</code></td><td class="text-[var(--text-muted)]">Show your own <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> IPv4 address.</td></tr>
                    <tr><td><code>tailscale ping &lt;host&gt;</code></td><td class="text-[var(--text-muted)]">Test connectivity to another device.</td></tr>
                    <tr><td><code>tailscale set --advertise-routes=...</code></td><td class="text-[var(--text-muted)]">Advertise subnet routes.</td></tr>
                    <tr><td><code>tailscale up --accept-routes</code></td><td class="text-[var(--text-muted)]">Accept routes advertised by other subnet routers.</td></tr>
                    <tr><td><code>tailscale up --exit-node=...</code></td><td class="text-[var(--text-muted)]">Route all traffic through an exit node.</td></tr>
                    <tr><td><code>tailscale down</code></td><td class="text-[var(--text-muted)]">Disconnect from tailnet.</td></tr>
                    <tr><td><code>tailscale logout</code></td><td class="text-[var(--text-muted)]">Log out and remove node from tailnet.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Full list in the <a href="https://tailscale.com/kb/1080/cli" target="_blank" class="topic-link">official CLI reference</a>.</p>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'Key Expiry verwalten',
                    titleEn: 'Manage Key Expiry',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Key Expiry:</strong> Geräte müssen sich regelmäßig neu authentifizieren. Für Server, NAS-Geräte und andere dauerhaft verbundene Systeme kann dies deaktiviert werden.</p>
                    <p class="mb-2 mt-3"><strong>Key Expiry deaktivieren:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li>Zur <a href="https://console.tailscale.com/admin/machines" target="_blank" class="topic-link">Machines-Seite</a> navigieren.</li>
                    <li>Das Gerät auswählen.</li>
                    <li>Auf das <strong>...</strong>-Menü klicken und <strong>Disable key expiry</strong> wählen.</li>
                    </ol>
                    <p class="mb-2 mt-3"><strong>Erzwungene Re-Authentifizierung:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --force-reauth</pre>
                    </div>
                    <p class="mt-3"><strong>Warnung:</strong> Das Deaktivieren der Key Expiry reduziert die Sicherheit. Nur für vertrauenswürdige Geräte verwenden. Siehe <a href="https://tailscale.com/kb/1028/key-expiry" target="_blank" class="topic-link">Key-Expiry-Dokumentation</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Key expiry:</strong> Devices must periodically re-authenticate. For servers, NAS devices, and other continuously connected systems, this can be disabled.</p>
                    <p class="mb-2 mt-3"><strong>Disable key expiry:</strong></p>
                    <ol class="list-decimal pl-5 space-y-1 mt-1">
                    <li>Go to the <a href="https://console.tailscale.com/admin/machines" target="_blank" class="topic-link">Machines page</a>.</li>
                    <li>Select the device.</li>
                    <li>Click the <strong>...</strong> menu and select <strong>Disable key expiry</strong>.</li>
                    </ol>
                    <p class="mb-2 mt-3"><strong>Force re-authentication:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo tailscale up --force-reauth</pre>
                    </div>
                    <p class="mt-3"><strong>Warning:</strong> Disabling key expiry reduces security. Only do this for trusted devices. See <a href="https://tailscale.com/kb/1028/key-expiry" target="_blank" class="topic-link">key expiry documentation</a>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-halved opacity-70"></i><span>1. Zero-Trust & Identity</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Identity-basierte Konnektivität statt IP-basierter Regeln. <a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a>-Verschlüsselung, deny-by-default ACLs.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-network-wired opacity-70"></i><span>2. Mesh statt Stern</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Direkte Peer-to-Peer-Verbindungen. Koordinationsserver transportiert keine Nutzdaten. DERP nur als Fallback.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-route opacity-70"></i><span>3. Subnet Router & Exit Nodes</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Zugriff auf ganze Subnetze ohne <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> auf Zielgeräten. Exit Nodes für gesamten Internet-Traffic.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-docker opacity-70"></i><span>4. Docker & Kubernetes</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Sidecar-Pattern für Container, <a href="https://kubernetes.io/" target="_blank" class="topic-link">Kubernetes</a> Operator für Cluster-Integration. Auth Keys für Automatisierung.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-shield-halved opacity-70"></i><span>1. Zero Trust & Identity</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Identity-based connectivity instead of IP-based rules. <a href="https://www.wireguard.com/" target="_blank" class="topic-link">WireGuard</a> encryption, deny-by-default ACLs.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-network-wired opacity-70"></i><span>2. Mesh, not Star</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Direct peer-to-peer connections. Coordination server carries no user traffic. DERP only as fallback.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-route opacity-70"></i><span>3. Subnet Router & Exit Nodes</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Access entire subnets without <a href="https://tailscale.com/" target="_blank" class="topic-link">Tailscale</a> on target devices. Exit nodes for all internet traffic.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-docker opacity-70"></i><span>4. Docker & Kubernetes</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Sidecar pattern for containers, <a href="https://kubernetes.io/" target="_blank" class="topic-link">Kubernetes</a> Operator for cluster integration. Auth keys for automation.</p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    links: {
        titleDe: 'Referenzen & Downloads',
        titleEn: 'References & Downloads',
        items: [
            { icon: 'fa-globe',    href: 'https://tailscale.com/docs/',                     target: '_blank', labelDe: 'Offizielle Dokumentation', labelEn: 'Official Documentation' },
            { icon: 'fa-download', href: 'https://tailscale.com/download',                  target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-github',   href: 'https://github.com/tailscale/tailscale',          target: '_blank', labelDe: 'GitHub Repository',         labelEn: 'GitHub Repository' },
            { icon: 'fa-book',     href: 'https://tailscale.com/kb/',                       target: '_blank', labelDe: 'Knowledge Base',             labelEn: 'Knowledge Base' },
            { icon: 'fa-comments', href: 'https://forum.tailscale.com/',                    target: '_blank', labelDe: 'Community Forum',            labelEn: 'Community Forum' }
        ]
    },

    footer: {
        textDe: 'Tailscale Referenz · v1.0 · Dual Lang',
        textEn: 'Tailscale Reference · v1.0 · Dual Lang'
    }
});