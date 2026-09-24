// resources/topics/topic_samba.js
// Registers the Samba file server reference topic. Loaded via <script> injection.

/* ==================================================================
   SAMBA CODE-BLOCK COPY CONTROLLER
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
    id: 'Samba Overview',
    icon: 'fa-folder-open',
    titleDe: 'Samba',
    titleEn: 'Samba',
    descDe: 'SMB/CIFS Datei- und Druckdienste',
    descEn: 'SMB/CIFS File and Print Services',

    sidebarTitleDe: 'Samba',
    sidebarTitleEn: 'Samba',
    sidebarSubtitleDe: 'SMB/CIFS-Server für Linux',
    sidebarSubtitleEn: 'SMB/CIFS Server for Linux',
    sidebarVersion: 'v4.21+',

    hero: {
        titleDe: 'Samba: SMB-Dateidienste für Linux',
        titleEn: 'Samba: SMB File Services for Linux',
        introDe: 'Samba ist eine <strong>freie Open-Source-Implementierung des SMB/CIFS-Protokolls</strong>, mit der Linux- und Unix-Systeme Dateien und Drucker für Windows-, macOS- und Linux-Clients freigeben können. Es ist die Standardlösung für die Integration von Linux-Servern in Windows-Netzwerkumgebungen und wird seit 1992 aktiv entwickelt. <a href="https://www.samba.org/samba/docs/" target="_blank">Zur offiziellen Dokumentation</a>.',
        introEn: 'Samba is a <strong>free and open-source implementation of the SMB/CIFS protocol</strong> that allows Linux and Unix systems to share files and printers with Windows, macOS, and Linux clients. It is the de facto standard for integrating Linux servers into Windows network environments and has been actively developed since 1992. <a href="https://www.samba.org/samba/docs/" target="_blank">Visit the official documentation</a>.'
    },

    quickLinks: [
        { icon: 'fa-info-circle',       href: '#section1', switchToDoc: true, labelDe: 'Überblick',      labelEn: 'Overview' },
        { icon: 'fa-download',          href: '#section2', switchToDoc: true, labelDe: 'Installation',   labelEn: 'Installation' },
        { icon: 'fa-desktop',           href: '#section3', switchToDoc: true, labelDe: 'Clients',        labelEn: 'Clients' },
        { icon: 'fa-tachometer-alt',    href: '#section4', switchToDoc: true, labelDe: 'Performance',    labelEn: 'Performance' },
        { icon: 'fa-cubes',             href: '#section5', switchToDoc: true, labelDe: 'VFS-Module',     labelEn: 'VFS Modules' },
        { icon: 'fa-cog',               href: '#section6', switchToDoc: true, labelDe: 'Konfiguration',  labelEn: 'Configuration' },
        { icon: 'fa-external-link-alt', href: 'https://www.samba.org/samba/docs/', target: '_blank', labelDe: 'Offizielle Doku', labelEn: 'Official Docs' }
    ],

    sections: [
        /* ============ 1. ÜBERBLICK ============ */
        {
            id: 'section1',
            titleDe: '1. Überblick & Protokoll',
            titleEn: '1. Overview & Protocol',
            introDe: 'Samba implementiert das <strong>Server Message Block</strong> (SMB)-Protokoll, das ursprünglich von IBM entwickelt und später von Microsoft zum Standard für Windows-Dateifreigaben gemacht wurde. Die aktuelle Version SMB 3.1.1 bietet Verschlüsselung, Integritätsprüfung und Multipath-Unterstützung. Mehr dazu in der <a href="https://wiki.samba.org/index.php/User_Documentation" target="_blank">offiziellen Samba-Dokumentation</a>.',
            introEn: 'Samba implements the <strong>Server Message Block</strong> (SMB) protocol, originally developed by IBM and later standardized by Microsoft for Windows file sharing. The current SMB 3.1.1 version offers encryption, integrity checking, and multipath support. Learn more in the <a href="https://wiki.samba.org/index.php/User_Documentation" target="_blank">official Samba documentation</a>.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Samba?',
                    titleEn: 'What is Samba?',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Eigenschaft</th><th>Beschreibung</th></tr>
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Open-Source SMB/CIFS-Implementierung für Unix/Linux.</td></tr>
                    <tr><td><strong>Lizenz</strong></td><td class="text-[var(--text-muted)]">GPLv3 – vollständig frei, keine kommerzielle Einschränkung.</td></tr>
                    <tr><td><strong>Kosten</strong></td><td class="text-[var(--text-muted)]">Immer 0 € – es gibt keine Enterprise-Edition.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]">Linux, macOS, BSD, Solaris, AIX. Docker-Images verfügbar.</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Datei- und Druckerfreigabe für Windows-, macOS- und Linux-Clients.</td></tr>
                    <tr><td><strong>Protokolle</strong></td><td class="text-[var(--text-muted)]">SMB1 (veraltet), SMB2, SMB3 (3.0, 3.1.1). CIFS als ältere Bezeichnung.</td></tr>
                    <tr><td><strong>Services</strong></td><td class="text-[var(--text-muted)]"><code>smbd</code> (Datei/Druck), <code>nmbd</code> (NetBIOS-Namensauflösung), <code>winbindd</code> (AD-Integration).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Open-source SMB/CIFS implementation for Unix/Linux.</td></tr>
                    <tr><td><strong>License</strong></td><td class="text-[var(--text-muted)]">GPLv3 – fully free, no commercial restrictions.</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">Always $0 – there is no enterprise edition.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]">Linux, macOS, BSD, Solaris, AIX. Docker images available.</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">File and printer sharing for Windows, macOS, and Linux clients.</td></tr>
                    <tr><td><strong>Protocols</strong></td><td class="text-[var(--text-muted)]">SMB1 (deprecated), SMB2, SMB3 (3.0, 3.1.1). CIFS as older designation.</td></tr>
                    <tr><td><strong>Services</strong></td><td class="text-[var(--text-muted)]"><code>smbd</code> (file/print), <code>nmbd</code> (NetBIOS name resolution), <code>winbindd</code> (AD integration).</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Samba vs. NFS vs. Windows-Dateiserver',
                    titleEn: 'Samba vs. NFS vs. Windows File Server',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/4">Samba (SMB)</th><th class="w-1/4">NFS</th><th class="w-1/4">Windows Server</th></tr>
                    <tr><td><strong>Zielgruppe</strong></td><td class="text-[var(--text-muted)]">Linux-Server in Windows-Umgebungen</td><td class="text-[var(--text-muted)]">Unix/Linux zu Unix/Linux</td><td class="text-[var(--text-muted)]">Reine Windows-Domänen</td></tr>
                    <tr><td><strong>Client-Support</strong></td><td class="text-[var(--text-muted)]">Alle (Windows, macOS, Linux)</td><td class="text-[var(--text-muted)]">Unix/Linux/macOS (Windows nur mit Zusatz)</td><td class="text-[var(--text-muted)]">Windows, macOS, Linux (mit Zusatz)</td></tr>
                    <tr><td><strong>Authentifizierung</strong></td><td class="text-[var(--text-muted)]">Lokal, AD, LDAP, Kerberos</td><td class="text-[var(--text-muted)]">Kerberos, NIS, lokale UIDs</td><td class="text-[var(--text-muted)]">Active Directory</td></tr>
                    <tr><td><strong>Verschlüsselung</strong></td><td class="text-[var(--text-muted)]">SMB3: AES-128-GCM/CCM</td><td class="text-[var(--text-muted)]">Kerberos (krb5p)</td><td class="text-[var(--text-muted)]">SMB3</td></tr>
                    <tr><td><strong>Multipath</strong></td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td><td class="text-[var(--text-muted)]">pNFS (eingeschränkt)</td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td></tr>
                    <tr><td><strong>Kosten</strong></td><td class="text-[var(--text-muted)]">0 €</td><td class="text-[var(--text-muted)]">0 €</td><td class="text-[var(--text-muted)]">Lizenzkosten</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Samba ist die erste Wahl, wenn Linux-Server Dateien für gemischte Client-Umgebungen bereitstellen sollen – insbesondere mit Windows-Clients.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/4">Samba (SMB)</th><th class="w-1/4">NFS</th><th class="w-1/4">Windows Server</th></tr>
                    <tr><td><strong>Target</strong></td><td class="text-[var(--text-muted)]">Linux servers in Windows environments</td><td class="text-[var(--text-muted)]">Unix/Linux to Unix/Linux</td><td class="text-[var(--text-muted)]">Pure Windows domains</td></tr>
                    <tr><td><strong>Client support</strong></td><td class="text-[var(--text-muted)]">All (Windows, macOS, Linux)</td><td class="text-[var(--text-muted)]">Unix/Linux/macOS (Windows with add-on)</td><td class="text-[var(--text-muted)]">Windows, macOS, Linux (with add-on)</td></tr>
                    <tr><td><strong>Authentication</strong></td><td class="text-[var(--text-muted)]">Local, AD, LDAP, Kerberos</td><td class="text-[var(--text-muted)]">Kerberos, NIS, local UIDs</td><td class="text-[var(--text-muted)]">Active Directory</td></tr>
                    <tr><td><strong>Encryption</strong></td><td class="text-[var(--text-muted)]">SMB3: AES-128-GCM/CCM</td><td class="text-[var(--text-muted)]">Kerberos (krb5p)</td><td class="text-[var(--text-muted)]">SMB3</td></tr>
                    <tr><td><strong>Multipath</strong></td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td><td class="text-[var(--text-muted)]">pNFS (limited)</td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">$0</td><td class="text-[var(--text-muted)]">$0</td><td class="text-[var(--text-muted)]">Licensing costs</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2">Samba is the first choice when Linux servers need to provide files to mixed client environments – especially with Windows clients.</p>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: 'Samba ist in den offiziellen Repositories praktisch aller Linux-Distributionen enthalten und kann nativ oder per Docker installiert werden. Für Server-Deployments ist die Paketinstallation der empfohlene Weg, da sie Systemd-Integration und Logrotation mitbringt. Die vollständige Übersicht finden Sie im <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank">Samba-Wiki</a>.',
            introEn: 'Samba is included in the official repositories of virtually every Linux distribution and can be installed natively or via Docker. For server deployments, package installation is recommended as it includes systemd integration and log rotation. See the <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank">Samba wiki</a> for a full overview.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <style>
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
                        @media (max-width: 560px) {
                            .jf-code-inner { font-size: 0.66rem; padding: 0.7rem 0.8rem; }
                            .jf-copy-btn { opacity: 1; transform: translateY(0); }
                        }
                    </style>

                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank">Paketinstallation</a></strong></td><td class="text-[var(--text-muted)]">Empfohlen für Server. <code>samba</code>-Paket aus den Distributions-Repos. Enthält smbd, nmbd, winbind.</td></tr>
                    <tr><td><strong><a href="https://hub.docker.com/r/dockurr/samba" target="_blank">Docker</a></strong></td><td class="text-[var(--text-muted)]">Leichtgewichtige Alpine-basierte Images. Schnell testbar, aber weniger Kontrolle über smb.conf.</td></tr>
                    <tr><td><strong><a href="https://www.samba.org/samba/download/" target="_blank">Quellcode</a></strong></td><td class="text-[var(--text-muted)]">Kompilieren aus dem Quellcode für spezielle Anforderungen oder ältere Systeme.</td></tr>
                    <tr><td><strong>NAS-Distributionen</strong></td><td class="text-[var(--text-muted)]">TrueNAS, OpenMediaVault, Unraid bieten Samba mit Web-UI-Integration.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank">Package install</a></strong></td><td class="text-[var(--text-muted)]">Recommended for servers. <code>samba</code> package from distro repos. Includes smbd, nmbd, winbind.</td></tr>
                    <tr><td><strong><a href="https://hub.docker.com/r/dockurr/samba" target="_blank">Docker</a></strong></td><td class="text-[var(--text-muted)]">Lightweight Alpine-based images. Quick to test, but less control over smb.conf.</td></tr>
                    <tr><td><strong><a href="https://www.samba.org/samba/download/" target="_blank">Source code</a></strong></td><td class="text-[var(--text-muted)]">Compile from source for special requirements or older systems.</td></tr>
                    <tr><td><strong>NAS distributions</strong></td><td class="text-[var(--text-muted)]">TrueNAS, OpenMediaVault, Unraid offer Samba with web UI integration.</td></tr>
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
                    <p class="mb-2"><strong>Installation:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo apt update
sudo apt install samba</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Firewall konfigurieren (UFW):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo ufw allow Samba
sudo ufw allow ssh</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Dienste verwalten:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo systemctl enable --now smbd
sudo systemctl enable --now nmbd</pre>
                    </div>
                    <p class="mt-3">Nach der Installation die Konfiguration unter <code>/etc/samba/smb.conf</code> anpassen. Weitere Details im <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank">Samba-Wiki</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Installation:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo apt update
sudo apt install samba</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Configure firewall (UFW):</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo ufw allow Samba
sudo ufw allow ssh</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Manage services:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">sudo systemctl enable --now smbd
sudo systemctl enable --now nmbd</pre>
                    </div>
                    <p class="mt-3">After installation, edit the configuration at <code>/etc/samba/smb.conf</code>. See the <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank">Samba wiki</a> for more details.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_3',
                    titleDe: 'Docker-Installation',
                    titleEn: 'Docker Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Schnellstart mit Docker Compose:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">services:
  samba:
    image: dockurr/samba
    container_name: samba
    environment:
      NAME: "Shared"
      USER: "samba"
      PASS: "secret"
    ports:
      - "445:445"
    volumes:
      - ./data:/shared
    restart: always</pre>
                    </div>
                    <p class="mt-3"><strong>Alternativ: Docker CLI:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -it --rm --name samba \\
  -p 445:445 \\
  -e "NAME=Shared" \\
  -e "USER=samba" \\
  -e "PASS=secret" \\
  -v "$PWD/data:/shared" \\
  docker.io/dockurr/samba</pre>
                    </div>
                    <p class="mt-3">Der Container lauscht standardmäßig auf Port 445. Für Multi-User-Betrieb kann eine <code>users.conf</code> eingebunden werden. Weitere Details im <a href="https://hub.docker.com/r/dockurr/samba" target="_blank">Docker Hub</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Quick start with Docker Compose:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">services:
  samba:
    image: dockurr/samba
    container_name: samba
    environment:
      NAME: "Shared"
      USER: "samba"
      PASS: "secret"
    ports:
      - "445:445"
    volumes:
      - ./data:/shared
    restart: always</pre>
                    </div>
                    <p class="mt-3"><strong>Alternatively: Docker CLI:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">docker run -it --rm --name samba \\
  -p 445:445 \\
  -e "NAME=Shared" \\
  -e "USER=samba" \\
  -e "PASS=secret" \\
  -v "$PWD/data:/shared" \\
  docker.io/dockurr/samba</pre>
                    </div>
                    <p class="mt-3">The container listens on port 445 by default. For multi-user operation, a <code>users.conf</code> can be mounted. See the <a href="https://hub.docker.com/r/dockurr/samba" target="_blank">Docker Hub</a> for more details.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. CLIENTS ============ */
        {
            id: 'section3',
            titleDe: '3. Clients & Kompatibilität',
            titleEn: '3. Clients & Compatibility',
            introDe: 'Samba ist kompatibel mit praktisch jedem Client, der das SMB-Protokoll spricht. Die Auswahl des richtigen SMB-Dialekts ist entscheidend für Sicherheit und Performance. Eine Übersicht der SMB-Dialekte finden Sie in der <a href="https://wiki.samba.org/index.php/Samba_Features_added/changed_(by_release)" target="_blank">Samba-Feature-Matrix</a>.',
            introEn: 'Samba is compatible with virtually any client that speaks the SMB protocol. Choosing the right SMB dialect is critical for security and performance. See the <a href="https://wiki.samba.org/index.php/Samba_Features_added/changed_(by_release)" target="_blank">Samba feature matrix</a> for a dialect overview.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Unterstützte Clients',
                    titleEn: 'Supported Clients',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Client &amp; Zugriffspfad</th></tr>
                    <tr><td><strong>Windows</strong></td><td class="text-[var(--text-muted)]">Explorer: <code>\\\\server\\share</code>. PowerShell: <code>net use Z: \\\\server\\share</code>. SMB2/3 nativ.</td></tr>
                    <tr><td><strong>macOS</strong></td><td class="text-[var(--text-muted)]">Finder: <code>Cmd+K</code> &rarr; <code>smb://server/share</code>. SMB2/3 mit Apple-Extensions.</td></tr>
                    <tr><td><strong>Linux (GNOME/KDE)</strong></td><td class="text-[var(--text-muted)]">Nautilus/Dolphin: <code>smb://server/share</code>. Mount via <code>mount -t cifs</code>.</td></tr>
                    <tr><td><strong>Android/iOS</strong></td><td class="text-[var(--text-muted)]">VLC, Kodi, Files by Google, nPlayer. SMB2/3-Unterstützung je nach App.</td></tr>
                    <tr><td><strong>Kodi / VLC</strong></td><td class="text-[var(--text-muted)]">Direkter SMB-Zugriff für Media-Streaming. Empfehlung: SMB2+ für Performance.</td></tr>
                    <tr><td><strong>NAS-Systeme</strong></td><td class="text-[var(--text-muted)]">TrueNAS, Synology, QNAP können Samba-Shares als Remote-Storage einbinden.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Client &amp; Access Path</th></tr>
                    <tr><td><strong>Windows</strong></td><td class="text-[var(--text-muted)]">Explorer: <code>\\\\server\\share</code>. PowerShell: <code>net use Z: \\\\server\\share</code>. SMB2/3 native.</td></tr>
                    <tr><td><strong>macOS</strong></td><td class="text-[var(--text-muted)]">Finder: <code>Cmd+K</code> &rarr; <code>smb://server/share</code>. SMB2/3 with Apple extensions.</td></tr>
                    <tr><td><strong>Linux (GNOME/KDE)</strong></td><td class="text-[var(--text-muted)]">Nautilus/Dolphin: <code>smb://server/share</code>. Mount via <code>mount -t cifs</code>.</td></tr>
                    <tr><td><strong>Android/iOS</strong></td><td class="text-[var(--text-muted)]">VLC, Kodi, Files by Google, nPlayer. SMB2/3 support varies by app.</td></tr>
                    <tr><td><strong>Kodi / VLC</strong></td><td class="text-[var(--text-muted)]">Direct SMB access for media streaming. Recommendation: SMB2+ for performance.</td></tr>
                    <tr><td><strong>NAS systems</strong></td><td class="text-[var(--text-muted)]">TrueNAS, Synology, QNAP can mount Samba shares as remote storage.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'SMB-Dialekte & Sicherheit',
                    titleEn: 'SMB Dialects & Security',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Dialekt</th><th class="w-1/4">Einführung</th><th>Status &amp; Empfehlung</th></tr>
                    <tr><td><strong>SMB1 (CIFS)</strong></td><td class="text-[var(--text-muted)]">Windows NT</td><td class="text-[var(--text-muted)]"><strong>Veraltet</strong> – nicht mehr verwenden. WannaCry-Exploit. Deaktiviert per Default ab Samba 4.11.</td></tr>
                    <tr><td><strong>SMB2</strong></td><td class="text-[var(--text-muted)]">Windows Vista / Server 2008</td><td class="text-[var(--text-muted)]">Basis-Support. Keine Verschlüsselung. Für Legacy-Clients akzeptabel.</td></tr>
                    <tr><td><strong>SMB3.0</strong></td><td class="text-[var(--text-muted)]">Windows 8 / Server 2012</td><td class="text-[var(--text-muted)]">AES-128-CCM Verschlüsselung, Multichannel, SMB Direct (RDMA).</td></tr>
                    <tr><td><strong>SMB3.1.1</strong></td><td class="text-[var(--text-muted)]">Windows 10 / Server 2016</td><td class="text-[var(--text-muted)]"><strong>Empfohlen</strong> – AES-128-GCM, Integritätsprüfung, Pre-Auth-Integrität.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Sicherheitshinweis:</strong> SMB sollte <strong>niemals</strong> direkt aus dem Internet erreichbar sein. Für Remote-Zugriff immer VPN oder andere Tunnel-Lösungen verwenden.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Dialect</th><th class="w-1/4">Introduced</th><th>Status &amp; Recommendation</th></tr>
                    <tr><td><strong>SMB1 (CIFS)</strong></td><td class="text-[var(--text-muted)]">Windows NT</td><td class="text-[var(--text-muted)]"><strong>Deprecated</strong> – do not use. WannaCry exploit. Disabled by default since Samba 4.11.</td></tr>
                    <tr><td><strong>SMB2</strong></td><td class="text-[var(--text-muted)]">Windows Vista / Server 2008</td><td class="text-[var(--text-muted)]">Basic support. No encryption. Acceptable for legacy clients.</td></tr>
                    <tr><td><strong>SMB3.0</strong></td><td class="text-[var(--text-muted)]">Windows 8 / Server 2012</td><td class="text-[var(--text-muted)]">AES-128-CCM encryption, multichannel, SMB Direct (RDMA).</td></tr>
                    <tr><td><strong>SMB3.1.1</strong></td><td class="text-[var(--text-muted)]">Windows 10 / Server 2016</td><td class="text-[var(--text-muted)]"><strong>Recommended</strong> – AES-128-GCM, integrity checking, pre-auth integrity.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Security note:</strong> SMB should <strong>never</strong> be directly exposed to the internet. Always use VPN or other tunneling solutions for remote access.</p>
                    `
                }
            ]
        },

        /* ============ 4. PERFORMANCE ============ */
        {
            id: 'section4',
            titleDe: '4. Performance-Tuning',
            titleEn: '4. Performance Tuning',
            introDe: 'Samba kann für hohe Durchsätze optimiert werden, insbesondere in 10GbE-Umgebungen. Die wichtigsten Hebel sind SMB3 Multichannel, asynchrones I/O und Socket-Puffer. Eine detaillierte Anleitung finden Sie im <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank">Samba Performance Tuning Guide</a>.',
            introEn: 'Samba can be optimized for high throughput, especially in 10GbE environments. The key levers are SMB3 Multichannel, asynchronous I/O, and socket buffers. See the <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank">Samba Performance Tuning Guide</a> for detailed instructions.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Empfohlene Optimierungen',
                    titleEn: 'Recommended Optimizations',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>smb.conf Parameter für hohe Durchsätze:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">[global]
# SMB3 Multichannel für 10GbE+
server multi channel support = yes

# Asynchrones I/O (Samba 4.12+)
aio read size = 1
aio write size = 1

# Socket-Puffer für 10GbE (BDP-basiert)
socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=262144 SO_SNDBUF=262144

# Sendfile für Zero-Copy
use sendfile = yes

# Cache-Einstellungen
read cache size = 33554432
write cache size = 16777216

# Maximale Dateihandles
max open files = 65535</pre>
                    </div>
                    <p class="mt-3"><strong>Wichtige Hinweise:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li><strong>Jumbo Frames (MTU 9000)</strong> aktivieren – erfordert Unterstützung auf Switch und Clients.</li>
                    <li><strong>server signing = default</strong> statt <code>mandatory</code>, wenn keine strikte Signierung benötigt wird.</li>
                    <li><strong>Verschlüsselung</strong> nur wenn nötig – kostet CPU-Leistung. AES-NI-fähige CPUs verwenden.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>smb.conf parameters for high throughput:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">[global]
# SMB3 Multichannel for 10GbE+
server multi channel support = yes

# Async I/O (Samba 4.12+)
aio read size = 1
aio write size = 1

# Socket buffers for 10GbE (BDP-based)
socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=262144 SO_SNDBUF=262144

# Sendfile for zero-copy
use sendfile = yes

# Cache settings
read cache size = 33554432
write cache size = 16777216

# Maximum file handles
max open files = 65535</pre>
                    </div>
                    <p class="mt-3"><strong>Important notes:</strong></p>
                    <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li><strong>Enable Jumbo Frames (MTU 9000)</strong> – requires switch and client support.</li>
                    <li><strong>server signing = default</strong> instead of <code>mandatory</code> if strict signing is not required.</li>
                    <li><strong>Encryption</strong> only when necessary – costs CPU. Use AES-NI capable CPUs.</li>
                    </ul>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'Benchmarking & Monitoring',
                    titleEn: 'Benchmarking & Monitoring',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Durchsatz messen mit smbclient:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">smbclient //server/share -U user%pass -c "put /dev/zero testfile"</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Log-Level temporär erhöhen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">smbcontrol all debug 10</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Status abfragen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">smbstatus</pre>
                    </div>
                    <p class="mt-3">Nach dem Debugging Log-Level wieder auf <code>0</code> oder <code>1</code> zurücksetzen.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Measure throughput with smbclient:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">smbclient //server/share -U user%pass -c "put /dev/zero testfile"</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Temporarily increase log level:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">smbcontrol all debug 10</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Query status:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">smbstatus</pre>
                    </div>
                    <p class="mt-3">After debugging, reset log level back to <code>0</code> or <code>1</code>.</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. VFS-MODULE ============ */
        {
            id: 'section5',
            titleDe: '5. VFS-Module & Erweiterungen',
            titleEn: '5. VFS Modules & Extensions',
            introDe: 'VFS-Module (Virtual File System) erweitern Samba um zusätzliche Funktionen wie Papierkorb, Virenscan oder Quota-Unterstützung. Sie werden pro Share in der <code>smb.conf</code> aktiviert. Die vollständige Liste finden Sie in der <a href="https://www.samba.org/samba/docs/current/man-html/vfs_module.8.html" target="_blank">vfs_module Manpage</a>.',
            introEn: 'VFS modules (Virtual File System) extend Samba with additional features like recycle bin, virus scanning, or quota support. They are enabled per share in <code>smb.conf</code>. See the <a href="https://www.samba.org/samba/docs/current/man-html/vfs_module.8.html" target="_blank">vfs_module manpage</a> for the full list.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Nützliche VFS-Module',
                    titleEn: 'Useful VFS Modules',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Modul</th><th>Funktion &amp; Beispiel</th></tr>
                    <tr><td><strong>recycle</strong></td><td class="text-[var(--text-muted)]">Papierkorb für gelöschte Dateien. <code>vfs objects = recycle</code></td></tr>
                    <tr><td><strong>full_audit</strong></td><td class="text-[var(--text-muted)]">Audit-Log für alle Dateioperationen. <code>vfs objects = full_audit</code></td></tr>
                    <tr><td><strong>acl_xattr</strong></td><td class="text-[var(--text-muted)]">POSIX-ACLs als Extended Attributes speichern (für Windows-ACL-Kompatibilität).</td></tr>
                    <tr><td><strong>streams_xattr</strong></td><td class="text-[var(--text-muted)]">Windows Alternate Data Streams (ADS) auf xattrs abbilden.</td></tr>
                    <tr><td><strong>catia</strong></td><td class="text-[var(--text-muted)]">Sonderzeichen-Mapping für macOS-Kompatibilität (z.B. <code>?</code> &rarr; <code>_</code>).</td></tr>
                    <tr><td><strong>fruit</strong></td><td class="text-[var(--text-muted)]">macOS-Kompatibilität (Time Machine, Resource Forks, Spotlight).</td></tr>
                    <tr><td><strong>io_uring</strong></td><td class="text-[var(--text-muted)]">Async I/O mit io_uring (Samba 4.12+). <code>vfs objects = io_uring</code></td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Module</th><th>Function &amp; Example</th></tr>
                    <tr><td><strong>recycle</strong></td><td class="text-[var(--text-muted)]">Recycle bin for deleted files. <code>vfs objects = recycle</code></td></tr>
                    <tr><td><strong>full_audit</strong></td><td class="text-[var(--text-muted)]">Audit log for all file operations. <code>vfs objects = full_audit</code></td></tr>
                    <tr><td><strong>acl_xattr</strong></td><td class="text-[var(--text-muted)]">Store POSIX ACLs as extended attributes (for Windows ACL compatibility).</td></tr>
                    <tr><td><strong>streams_xattr</strong></td><td class="text-[var(--text-muted)]">Map Windows Alternate Data Streams (ADS) to xattrs.</td></tr>
                    <tr><td><strong>catia</strong></td><td class="text-[var(--text-muted)]">Special character mapping for macOS compatibility (e.g., <code>?</code> &rarr; <code>_</code>).</td></tr>
                    <tr><td><strong>fruit</strong></td><td class="text-[var(--text-muted)]">macOS compatibility (Time Machine, resource forks, Spotlight).</td></tr>
                    <tr><td><strong>io_uring</strong></td><td class="text-[var(--text-muted)]">Async I/O with io_uring (Samba 4.12+). <code>vfs objects = io_uring</code></td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection5_2',
                    titleDe: 'VFS-Module konfigurieren',
                    titleEn: 'Configuring VFS Modules',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Beispiel: Share mit Papierkorb und Audit-Log</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">[shared]
path = /srv/samba/shared
read only = no
valid users = @smbgroup

vfs objects = recycle full_audit
recycle:repository = .recycle
recycle:keeptree = yes
recycle:versions = yes

full_audit:prefix = %u|%I|%m|%S
full_audit:success = connect opendir write unlink
full_audit:failure = none
full_audit:facility = LOCAL5
full_audit:priority = NOTICE</pre>
                    </div>
                    <p class="mt-3">Nach Änderungen an VFS-Konfiguration <code>sudo testparm</code> ausführen und Dienste neu laden (<code>sudo systemctl reload smbd</code>).</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Example: Share with recycle bin and audit log</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">[shared]
path = /srv/samba/shared
read only = no
valid users = @smbgroup

vfs objects = recycle full_audit
recycle:repository = .recycle
recycle:keeptree = yes
recycle:versions = yes

full_audit:prefix = %u|%I|%m|%S
full_audit:success = connect opendir write unlink
full_audit:failure = none
full_audit:facility = LOCAL5
full_audit:priority = NOTICE</pre>
                    </div>
                    <p class="mt-3">After VFS configuration changes, run <code>sudo testparm</code> and reload services (<code>sudo systemctl reload smbd</code>).</p>
                    </div>
                    `
                }
            ]
        },

        /* ============ 6. KONFIGURATION ============ */
        {
            id: 'section6',
            titleDe: '6. Konfiguration & Pfade',
            titleEn: '6. Configuration & Paths',
            introDe: 'Die zentrale Konfigurationsdatei ist <code>/etc/samba/smb.conf</code>. Sie besteht aus einer <code>[global]</code>-Sektion und beliebig vielen Share-Definitionen. Nach jeder Änderung sollte <code>testparm</code> zur Validierung ausgeführt werden. Weitere Details in der <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank">smb.conf Manpage</a>.',
            introEn: 'The central configuration file is <code>/etc/samba/smb.conf</code>. It consists of a <code>[global]</code> section and any number of share definitions. After each change, <code>testparm</code> should be run for validation. See the <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank">smb.conf manpage</a> for details.',
            subtopics: [
                {
                    id: 'subsection6_1',
                    titleDe: 'Wichtige Verzeichnisse & Ports',
                    titleEn: 'Important Directories & Ports',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Kategorie</th><th class="w-1/4">Pfad/Port</th><th>Verwendung</th></tr>
                    <tr><td><strong>Konfiguration</strong></td><td class="text-[var(--text-muted)]"><code>/etc/samba/smb.conf</code></td><td class="text-[var(--text-muted)]">Hauptkonfigurationsdatei.</td></tr>
                    <tr><td><strong>Passwörter</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/private/passdb.tdb</code></td><td class="text-[var(--text-muted)]">Samba-Passwortdatenbank (TDB).</td></tr>
                    <tr><td><strong>Logs</strong></td><td class="text-[var(--text-muted)]"><code>/var/log/samba/</code></td><td class="text-[var(--text-muted)]">Server-Logs pro Client (log.%m).</td></tr>
                    <tr><td><strong>State</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/</code></td><td class="text-[var(--text-muted)]">Laufzeitdaten (Locking, Registry).</td></tr>
                    <tr><td><strong>Port 445</strong></td><td class="text-[var(--text-muted)]">TCP</td><td class="text-[var(--text-muted)]">SMB über TCP/IP (moderner Standard).</td></tr>
                    <tr><td><strong>Port 139</strong></td><td class="text-[var(--text-muted)]">TCP</td><td class="text-[var(--text-muted)]">SMB über NetBIOS (Legacy).</td></tr>
                    <tr><td><strong>Port 137/138</strong></td><td class="text-[var(--text-muted)]">UDP</td><td class="text-[var(--text-muted)]">NetBIOS Name Service &amp; Datagram (nmbd).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Category</th><th class="w-1/4">Path/Port</th><th>Purpose</th></tr>
                    <tr><td><strong>Configuration</strong></td><td class="text-[var(--text-muted)]"><code>/etc/samba/smb.conf</code></td><td class="text-[var(--text-muted)]">Main configuration file.</td></tr>
                    <tr><td><strong>Passwords</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/private/passdb.tdb</code></td><td class="text-[var(--text-muted)]">Samba password database (TDB).</td></tr>
                    <tr><td><strong>Logs</strong></td><td class="text-[var(--text-muted)]"><code>/var/log/samba/</code></td><td class="text-[var(--text-muted)]">Server logs per client (log.%m).</td></tr>
                    <tr><td><strong>State</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/</code></td><td class="text-[var(--text-muted)]">Runtime data (locking, registry).</td></tr>
                    <tr><td><strong>Port 445</strong></td><td class="text-[var(--text-muted)]">TCP</td><td class="text-[var(--text-muted)]">SMB over TCP/IP (modern standard).</td></tr>
                    <tr><td><strong>Port 139</strong></td><td class="text-[var(--text-muted)]">TCP</td><td class="text-[var(--text-muted)]">SMB over NetBIOS (legacy).</td></tr>
                    <tr><td><strong>Port 137/138</strong></td><td class="text-[var(--text-muted)]">UDP</td><td class="text-[var(--text-muted)]">NetBIOS Name Service &amp; Datagram (nmbd).</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection6_2',
                    titleDe: 'smb.conf Grundgerüst',
                    titleEn: 'smb.conf Skeleton',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Minimales funktionierendes smb.conf:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">[global]
workgroup = WORKGROUP
server string = Samba Server %v
security = user
map to guest = bad user
log file = /var/log/samba/log.%m
max log size = 1000
logging = file
panic action = /usr/share/samba/panic-action %d

[shared]
comment = Shared Folder
path = /srv/samba/shared
browsable = yes
read only = no
guest ok = no
valid users = @smbgroup

[public]
comment = Public Folder
path = /srv/samba/public
browsable = yes
read only = no
guest ok = yes
force user = nobody</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Validierung und Neuladen:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">testparm
sudo systemctl reload smbd</pre>
                    </div>
                    <p class="mt-3">Nach Passwortänderungen <code>smbpasswd -a username</code> ausführen. Für Gruppenzugriff <code>sudo groupadd smbgroup</code> und <code>sudo usermod -aG smbgroup username</code>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-2"><strong>Minimal working smb.conf:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">[global]
workgroup = WORKGROUP
server string = Samba Server %v
security = user
map to guest = bad user
log file = /var/log/samba/log.%m
max log size = 1000
logging = file
panic action = /usr/share/samba/panic-action %d

[shared]
comment = Shared Folder
path = /srv/samba/shared
browsable = yes
read only = no
guest ok = no
valid users = @smbgroup

[public]
comment = Public Folder
path = /srv/samba/public
browsable = yes
read only = no
guest ok = yes
force user = nobody</pre>
                    </div>
                    <p class="mb-2 mt-3"><strong>Validation and reload:</strong></p>
                    <div class="jf-code">
                        <pre class="jf-code-inner">testparm
sudo systemctl reload smbd</pre>
                    </div>
                    <p class="mt-3">After password changes run <code>smbpasswd -a username</code>. For group access, run <code>sudo groupadd smbgroup</code> and <code>sudo usermod -aG smbgroup username</code>.</p>
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
            introDe: 'Die wichtigsten Samba-Aspekte auf einen Blick.',
            introEn: 'The key Samba aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Kostenlos &amp; Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">GPLv3, seit 1992 entwickelt. Standard für Linux-Windows-Integration. Keine Lizenzkosten, volle Kontrolle.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-desktop opacity-70"></i><span>2. Universelle Clients</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Windows, macOS, Linux, Android, iOS, Kodi, VLC. SMB2/3 mit Verschlüsselung und Multichannel.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>3. Performance-Tuning</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">SMB3 Multichannel, io_uring, Socket-Puffer, Sendfile. Für 10GbE optimierbar mit Jumbo Frames.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cubes opacity-70"></i><span>4. VFS-Module</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Recycle Bin, Audit-Log, ACL-Mapping, macOS-Kompatibilität. Per Share in smb.conf aktivierbar.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Free &amp; Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">GPLv3, developed since 1992. Standard for Linux-Windows integration. No license costs, full control.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-desktop opacity-70"></i><span>2. Universal Clients</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Windows, macOS, Linux, Android, iOS, Kodi, VLC. SMB2/3 with encryption and multichannel.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>3. Performance Tuning</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">SMB3 Multichannel, io_uring, socket buffers, sendfile. Optimizable for 10GbE with Jumbo Frames.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cubes opacity-70"></i><span>4. VFS Modules</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Recycle bin, audit log, ACL mapping, macOS compatibility. Enable per share in smb.conf.</p>
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
            { icon: 'fa-globe',    href: 'https://www.samba.org/samba/docs/',                   target: '_blank', labelDe: 'Offizielle Dokumentation', labelEn: 'Official Documentation' },
            { icon: 'fa-download', href: 'https://www.samba.org/samba/download/',               target: '_blank', labelDe: 'Downloads',                 labelEn: 'Downloads' },
            { icon: 'fa-github',   href: 'https://gitlab.com/samba-team/samba',                 target: '_blank', labelDe: 'GitLab Repository',         labelEn: 'GitLab Repository' },
            { icon: 'fa-book',     href: 'https://wiki.samba.org/index.php/User_Documentation', target: '_blank', labelDe: 'Samba Wiki',               labelEn: 'Samba Wiki' },
            { icon: 'fa-comments', href: 'https://lists.samba.org/',                             target: '_blank', labelDe: 'Mailinglisten',             labelEn: 'Mailing Lists' }
        ]
    },

    footer: {
        textDe: 'Samba Referenz · v1.0 · Dual Lang',
        textEn: 'Samba Reference · v1.0 · Dual Lang'
    }
});