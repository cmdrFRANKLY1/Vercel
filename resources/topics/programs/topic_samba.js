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
        introDe: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> ist eine <strong>freie Open-Source-Implementierung des <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB/CIFS-Protokolls</a></strong>, mit der <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>- und Unix-Systeme Dateien und Drucker für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>- und <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Clients freigeben können. Es ist die Standardlösung für die Integration von <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Servern in Windows-Netzwerkumgebungen und wird seit 1992 aktiv entwickelt. <a href="https://www.samba.org/samba/docs/" target="_blank" class="topic-link">Zur offiziellen Dokumentation</a>.',
        introEn: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> is a <strong>free and open-source implementation of the <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB/CIFS protocol</a></strong> that allows <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> and Unix systems to share files and printers with <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, and <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> clients. It is the de facto standard for integrating <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> servers into Windows network environments and has been actively developed since 1992. <a href="https://www.samba.org/samba/docs/" target="_blank" class="topic-link">Visit the official documentation</a>.'
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
            introDe: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> implementiert das <strong>Server Message Block</strong> (<a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a>)-Protokoll, das ursprünglich von <a href="https://www.ibm.com/" target="_blank" class="topic-link">IBM</a> entwickelt und später von <a href="https://www.microsoft.com/" target="_blank" class="topic-link">Microsoft</a> zum Standard für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-Dateifreigaben gemacht wurde. Die aktuelle Version SMB 3.1.1 bietet Verschlüsselung, Integritätsprüfung und Multipath-Unterstützung. Mehr dazu in der <a href="https://wiki.samba.org/index.php/User_Documentation" target="_blank" class="topic-link">offiziellen Samba-Dokumentation</a>.',
            introEn: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> implements the <strong>Server Message Block</strong> (<a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a>) protocol, originally developed by <a href="https://www.ibm.com/" target="_blank" class="topic-link">IBM</a> and later standardized by <a href="https://www.microsoft.com/" target="_blank" class="topic-link">Microsoft</a> for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> file sharing. The current SMB 3.1.1 version offers encryption, integrity checking, and multipath support. Learn more in the <a href="https://wiki.samba.org/index.php/User_Documentation" target="_blank" class="topic-link">official Samba documentation</a>.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Was ist Samba?',
                    titleEn: 'What is Samba?',
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
                    <tr><td><strong>Typ</strong></td><td class="text-[var(--text-muted)]">Open-Source <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB/CIFS</a>-Implementierung für Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>.</td></tr>
                    <tr><td><strong>Lizenz</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" class="topic-link">GPLv3</a> – vollständig frei, keine kommerzielle Einschränkung.</td></tr>
                    <tr><td><strong>Kosten</strong></td><td class="text-[var(--text-muted)]">Immer 0 € – es gibt keine Enterprise-Edition.</td></tr>
                    <tr><td><strong>Plattformen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, BSD, Solaris, AIX. <a href="https://hub.docker.com/r/dockurr/samba" target="_blank" class="topic-link">Docker-Images</a> verfügbar.</td></tr>
                    <tr><td><strong>Kernfunktion</strong></td><td class="text-[var(--text-muted)]">Datei- und Druckerfreigabe für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>- und <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Clients.</td></tr>
                    <tr><td><strong>Protokolle</strong></td><td class="text-[var(--text-muted)]">SMB1 (veraltet), SMB2, SMB3 (3.0, 3.1.1). CIFS als ältere Bezeichnung.</td></tr>
                    <tr><td><strong>Services</strong></td><td class="text-[var(--text-muted)]"><code>smbd</code> (Datei/Druck), <code>nmbd</code> (<a href="https://en.wikipedia.org/wiki/NetBIOS" target="_blank" class="topic-link">NetBIOS</a>-Namensauflösung), <code>winbindd</code> (<a href="https://en.wikipedia.org/wiki/Active_Directory" target="_blank" class="topic-link">AD</a>-Integration).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Attribute</th><th>Description</th></tr>
                    <tr><td><strong>Type</strong></td><td class="text-[var(--text-muted)]">Open-source <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB/CIFS</a> implementation for Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>.</td></tr>
                    <tr><td><strong>License</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" class="topic-link">GPLv3</a> – fully free, no commercial restrictions.</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">Always $0 – there is no enterprise edition.</td></tr>
                    <tr><td><strong>Platforms</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, BSD, Solaris, AIX. <a href="https://hub.docker.com/r/dockurr/samba" target="_blank" class="topic-link">Docker images</a> available.</td></tr>
                    <tr><td><strong>Core function</strong></td><td class="text-[var(--text-muted)]">File and printer sharing for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, and <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> clients.</td></tr>
                    <tr><td><strong>Protocols</strong></td><td class="text-[var(--text-muted)]">SMB1 (deprecated), SMB2, SMB3 (3.0, 3.1.1). CIFS as older designation.</td></tr>
                    <tr><td><strong>Services</strong></td><td class="text-[var(--text-muted)]"><code>smbd</code> (file/print), <code>nmbd</code> (<a href="https://en.wikipedia.org/wiki/NetBIOS" target="_blank" class="topic-link">NetBIOS</a> name resolution), <code>winbindd</code> (<a href="https://en.wikipedia.org/wiki/Active_Directory" target="_blank" class="topic-link">AD</a> integration).</td></tr>
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
                    <tr><th class="w-1/5">Merkmal</th><th class="w-1/4"><a href="https://www.samba.org/" target="_blank" class="topic-link">Samba (SMB)</a></th><th class="w-1/4"><a href="https://nfs.sourceforge.net/" target="_blank" class="topic-link">NFS</a></th><th class="w-1/4"><a href="https://www.microsoft.com/en-us/windows-server" target="_blank" class="topic-link">Windows Server</a></th></tr>
                    <tr><td><strong>Zielgruppe</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Server in <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-Umgebungen</td><td class="text-[var(--text-muted)]">Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> zu Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td><td class="text-[var(--text-muted)]">Reine <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-Domänen</td></tr>
                    <tr><td><strong>Client-Support</strong></td><td class="text-[var(--text-muted)]">Alle (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>)</td><td class="text-[var(--text-muted)]">Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> nur mit Zusatz)</td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> (mit Zusatz)</td></tr>
                    <tr><td><strong>Authentifizierung</strong></td><td class="text-[var(--text-muted)]">Lokal, <a href="https://en.wikipedia.org/wiki/Active_Directory" target="_blank" class="topic-link">AD</a>, <a href="https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol" target="_blank" class="topic-link">LDAP</a>, <a href="https://en.wikipedia.org/wiki/Kerberos_(protocol)" target="_blank" class="topic-link">Kerberos</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Kerberos_(protocol)" target="_blank" class="topic-link">Kerberos</a>, <a href="https://en.wikipedia.org/wiki/Network_Information_Service" target="_blank" class="topic-link">NIS</a>, lokale UIDs</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Active_Directory" target="_blank" class="topic-link">Active Directory</a></td></tr>
                    <tr><td><strong>Verschlüsselung</strong></td><td class="text-[var(--text-muted)]">SMB3: <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" class="topic-link">AES</a>-128-GCM/CCM</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Kerberos_(protocol)" target="_blank" class="topic-link">Kerberos</a> (krb5p)</td><td class="text-[var(--text-muted)]">SMB3</td></tr>
                    <tr><td><strong>Multipath</strong></td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td><td class="text-[var(--text-muted)]">pNFS (eingeschränkt)</td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td></tr>
                    <tr><td><strong>Kosten</strong></td><td class="text-[var(--text-muted)]">0 €</td><td class="text-[var(--text-muted)]">0 €</td><td class="text-[var(--text-muted)]">Lizenzkosten</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> ist die erste Wahl, wenn <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Server Dateien für gemischte Client-Umgebungen bereitstellen sollen – insbesondere mit <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-Clients.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Feature</th><th class="w-1/4"><a href="https://www.samba.org/" target="_blank" class="topic-link">Samba (SMB)</a></th><th class="w-1/4"><a href="https://nfs.sourceforge.net/" target="_blank" class="topic-link">NFS</a></th><th class="w-1/4"><a href="https://www.microsoft.com/en-us/windows-server" target="_blank" class="topic-link">Windows Server</a></th></tr>
                    <tr><td><strong>Target</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> servers in <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> environments</td><td class="text-[var(--text-muted)]">Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> to Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a></td><td class="text-[var(--text-muted)]">Pure <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> domains</td></tr>
                    <tr><td><strong>Client support</strong></td><td class="text-[var(--text-muted)]">All (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>)</td><td class="text-[var(--text-muted)]">Unix/<a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>/<a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> (<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> with add-on)</td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> (with add-on)</td></tr>
                    <tr><td><strong>Authentication</strong></td><td class="text-[var(--text-muted)]">Local, <a href="https://en.wikipedia.org/wiki/Active_Directory" target="_blank" class="topic-link">AD</a>, <a href="https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol" target="_blank" class="topic-link">LDAP</a>, <a href="https://en.wikipedia.org/wiki/Kerberos_(protocol)" target="_blank" class="topic-link">Kerberos</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Kerberos_(protocol)" target="_blank" class="topic-link">Kerberos</a>, <a href="https://en.wikipedia.org/wiki/Network_Information_Service" target="_blank" class="topic-link">NIS</a>, local UIDs</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Active_Directory" target="_blank" class="topic-link">Active Directory</a></td></tr>
                    <tr><td><strong>Encryption</strong></td><td class="text-[var(--text-muted)]">SMB3: <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" class="topic-link">AES</a>-128-GCM/CCM</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Kerberos_(protocol)" target="_blank" class="topic-link">Kerberos</a> (krb5p)</td><td class="text-[var(--text-muted)]">SMB3</td></tr>
                    <tr><td><strong>Multipath</strong></td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td><td class="text-[var(--text-muted)]">pNFS (limited)</td><td class="text-[var(--text-muted)]">SMB3 Multichannel</td></tr>
                    <tr><td><strong>Cost</strong></td><td class="text-[var(--text-muted)]">$0</td><td class="text-[var(--text-muted)]">$0</td><td class="text-[var(--text-muted)]">Licensing costs</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> is the first choice when <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> servers need to provide files to mixed client environments – especially with <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> clients.</p>
                    `
                }
            ]
        },

        /* ============ 2. INSTALLATION ============ */
        {
            id: 'section2',
            titleDe: '2. Installation',
            titleEn: '2. Installation',
            introDe: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> ist in den offiziellen Repositories praktisch aller <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-Distributionen enthalten und kann nativ oder per <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a> installiert werden. Für Server-Deployments ist die Paketinstallation der empfohlene Weg, da sie <a href="https://systemd.io/" target="_blank" class="topic-link">Systemd</a>-Integration und Logrotation mitbringt. Die vollständige Übersicht finden Sie im <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank" class="topic-link">Samba-Wiki</a>.',
            introEn: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> is included in the official repositories of virtually every <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> distribution and can be installed natively or via <a href="https://www.docker.com/" target="_blank" class="topic-link">Docker</a>. For server deployments, package installation is recommended as it includes <a href="https://systemd.io/" target="_blank" class="topic-link">systemd</a> integration and log rotation. See the <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank" class="topic-link">Samba wiki</a> for a full overview.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Installationsmethoden',
                    titleEn: 'Installation Methods',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Methode</th><th>Beschreibung</th></tr>
                    <tr><td><strong><a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank" class="topic-link">Paketinstallation</a></strong></td><td class="text-[var(--text-muted)]">Empfohlen für Server. <code>samba</code>-Paket aus den Distributions-Repos. Enthält smbd, nmbd, winbind.</td></tr>
                    <tr><td><strong><a href="https://hub.docker.com/r/dockurr/samba" target="_blank" class="topic-link">Docker</a></strong></td><td class="text-[var(--text-muted)]">Leichtgewichtige <a href="https://alpinelinux.org/" target="_blank" class="topic-link">Alpine</a>-basierte Images. Schnell testbar, aber weniger Kontrolle über smb.conf.</td></tr>
                    <tr><td><strong><a href="https://www.samba.org/samba/download/" target="_blank" class="topic-link">Quellcode</a></strong></td><td class="text-[var(--text-muted)]">Kompilieren aus dem Quellcode für spezielle Anforderungen oder ältere Systeme.</td></tr>
                    <tr><td><strong>NAS-Distributionen</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.truenas.com/" target="_blank" class="topic-link">TrueNAS</a>, <a href="https://www.openmediavault.org/" target="_blank" class="topic-link">OpenMediaVault</a>, <a href="https://unraid.net/" target="_blank" class="topic-link">Unraid</a> bieten <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> mit Web-UI-Integration.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Method</th><th>Description</th></tr>
                    <tr><td><strong><a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank" class="topic-link">Package install</a></strong></td><td class="text-[var(--text-muted)]">Recommended for servers. <code>samba</code> package from distro repos. Includes smbd, nmbd, winbind.</td></tr>
                    <tr><td><strong><a href="https://hub.docker.com/r/dockurr/samba" target="_blank" class="topic-link">Docker</a></strong></td><td class="text-[var(--text-muted)]">Lightweight <a href="https://alpinelinux.org/" target="_blank" class="topic-link">Alpine</a>-based images. Quick to test, but less control over smb.conf.</td></tr>
                    <tr><td><strong><a href="https://www.samba.org/samba/download/" target="_blank" class="topic-link">Source code</a></strong></td><td class="text-[var(--text-muted)]">Compile from source for special requirements or older systems.</td></tr>
                    <tr><td><strong>NAS distributions</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.truenas.com/" target="_blank" class="topic-link">TrueNAS</a>, <a href="https://www.openmediavault.org/" target="_blank" class="topic-link">OpenMediaVault</a>, <a href="https://unraid.net/" target="_blank" class="topic-link">Unraid</a> offer <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> with web UI integration.</td></tr>
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
                    <p class="mt-3">Nach der Installation die Konfiguration unter <code>/etc/samba/smb.conf</code> anpassen. Weitere Details im <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank" class="topic-link">Samba-Wiki</a>.</p>
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
                    <p class="mt-3">After installation, edit the configuration at <code>/etc/samba/smb.conf</code>. See the <a href="https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server" target="_blank" class="topic-link">Samba wiki</a> for more details.</p>
                    </div>
                    `
                },
                {
                    id: 'subsection2_3',
                    titleDe: 'Docker-Installation',
                    titleEn: 'Docker Installation',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Schnellstart mit <a href="https://docs.docker.com/compose/" target="_blank" class="topic-link">Docker Compose</a>:</strong></p>
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
                    <p class="mt-3">Der Container lauscht standardmäßig auf Port 445. Für Multi-User-Betrieb kann eine <code>users.conf</code> eingebunden werden. Weitere Details im <a href="https://hub.docker.com/r/dockurr/samba" target="_blank" class="topic-link">Docker Hub</a>.</p>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <p class="mb-3"><strong>Quick start with <a href="https://docs.docker.com/compose/" target="_blank" class="topic-link">Docker Compose</a>:</strong></p>
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
                    <p class="mt-3">The container listens on port 445 by default. For multi-user operation, a <code>users.conf</code> can be mounted. See the <a href="https://hub.docker.com/r/dockurr/samba" target="_blank" class="topic-link">Docker Hub</a> for more details.</p>
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
            introDe: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> ist kompatibel mit praktisch jedem Client, der das <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a>-Protokoll spricht. Die Auswahl des richtigen SMB-Dialekts ist entscheidend für Sicherheit und Performance. Eine Übersicht der SMB-Dialekte finden Sie in der <a href="https://wiki.samba.org/index.php/Samba_Features_added/changed_(by_release)" target="_blank" class="topic-link">Samba-Feature-Matrix</a>.',
            introEn: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> is compatible with virtually any client that speaks the <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> protocol. Choosing the right SMB dialect is critical for security and performance. See the <a href="https://wiki.samba.org/index.php/Samba_Features_added/changed_(by_release)" target="_blank" class="topic-link">Samba feature matrix</a> for a dialect overview.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Unterstützte Clients',
                    titleEn: 'Supported Clients',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Plattform</th><th>Client &amp; Zugriffspfad</th></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Explorer: <code>\\\\server\\share</code>. <a href="https://learn.microsoft.com/en-us/powershell/" target="_blank" class="topic-link">PowerShell</a>: <code>net use Z: \\\\server\\share</code>. SMB2/3 nativ.</td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">Finder: <code>Cmd+K</code> &rarr; <code>smb://server/share</code>. SMB2/3 mit Apple-Extensions.</td></tr>
                    <tr><td><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> (<a href="https://www.gnome.org/" target="_blank" class="topic-link">GNOME</a>/<a href="https://kde.org/" target="_blank" class="topic-link">KDE</a>)</strong></td><td class="text-[var(--text-muted)]"><a href="https://apps.gnome.org/Nautilus/" target="_blank" class="topic-link">Nautilus</a>/<a href="https://apps.kde.org/dolphin/" target="_blank" class="topic-link">Dolphin</a>: <code>smb://server/share</code>. Mount via <code>mount -t cifs</code>.</td></tr>
                    <tr><td><strong><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>/<a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>, <a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a>, Files by Google, nPlayer. SMB2/3-Unterstützung je nach App.</td></tr>
                    <tr><td><strong><a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a> / <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a></strong></td><td class="text-[var(--text-muted)]">Direkter <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a>-Zugriff für Media-Streaming. Empfehlung: SMB2+ für Performance.</td></tr>
                    <tr><td><strong>NAS-Systeme</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.truenas.com/" target="_blank" class="topic-link">TrueNAS</a>, <a href="https://www.synology.com/" target="_blank" class="topic-link">Synology</a>, <a href="https://www.qnap.com/" target="_blank" class="topic-link">QNAP</a> können <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a>-Shares als Remote-Storage einbinden.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Platform</th><th>Client &amp; Access Path</th></tr>
                    <tr><td><strong><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a></strong></td><td class="text-[var(--text-muted)]">Explorer: <code>\\\\server\\share</code>. <a href="https://learn.microsoft.com/en-us/powershell/" target="_blank" class="topic-link">PowerShell</a>: <code>net use Z: \\\\server\\share</code>. SMB2/3 native.</td></tr>
                    <tr><td><strong><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a></strong></td><td class="text-[var(--text-muted)]">Finder: <code>Cmd+K</code> &rarr; <code>smb://server/share</code>. SMB2/3 with Apple extensions.</td></tr>
                    <tr><td><strong><a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a> (<a href="https://www.gnome.org/" target="_blank" class="topic-link">GNOME</a>/<a href="https://kde.org/" target="_blank" class="topic-link">KDE</a>)</strong></td><td class="text-[var(--text-muted)]"><a href="https://apps.gnome.org/Nautilus/" target="_blank" class="topic-link">Nautilus</a>/<a href="https://apps.kde.org/dolphin/" target="_blank" class="topic-link">Dolphin</a>: <code>smb://server/share</code>. Mount via <code>mount -t cifs</code>.</td></tr>
                    <tr><td><strong><a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>/<a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a></strong></td><td class="text-[var(--text-muted)]"><a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>, <a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a>, Files by Google, nPlayer. SMB2/3 support varies by app.</td></tr>
                    <tr><td><strong><a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a> / <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a></strong></td><td class="text-[var(--text-muted)]">Direct <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> access for media streaming. Recommendation: SMB2+ for performance.</td></tr>
                    <tr><td><strong>NAS systems</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.truenas.com/" target="_blank" class="topic-link">TrueNAS</a>, <a href="https://www.synology.com/" target="_blank" class="topic-link">Synology</a>, <a href="https://www.qnap.com/" target="_blank" class="topic-link">QNAP</a> can mount <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> shares as remote storage.</td></tr>
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
                    <tr><td><strong>SMB1 (CIFS)</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> NT</td><td class="text-[var(--text-muted)]"><strong>Veraltet</strong> – nicht mehr verwenden. <a href="https://en.wikipedia.org/wiki/WannaCry_ransomware_attack" target="_blank" class="topic-link">WannaCry</a>-Exploit. Deaktiviert per Default ab <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> 4.11.</td></tr>
                    <tr><td><strong>SMB2</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> Vista / Server 2008</td><td class="text-[var(--text-muted)]">Basis-Support. Keine Verschlüsselung. Für Legacy-Clients akzeptabel.</td></tr>
                    <tr><td><strong>SMB3.0</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 8 / Server 2012</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" class="topic-link">AES</a>-128-CCM Verschlüsselung, Multichannel, SMB Direct (<a href="https://en.wikipedia.org/wiki/Remote_direct_memory_access" target="_blank" class="topic-link">RDMA</a>).</td></tr>
                    <tr><td><strong>SMB3.1.1</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 10 / Server 2016</td><td class="text-[var(--text-muted)]"><strong>Empfohlen</strong> – <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" class="topic-link">AES</a>-128-GCM, Integritätsprüfung, Pre-Auth-Integrität.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Sicherheitshinweis:</strong> <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> sollte <strong>niemals</strong> direkt aus dem Internet erreichbar sein. Für Remote-Zugriff immer <a href="https://en.wikipedia.org/wiki/Virtual_private_network" target="_blank" class="topic-link">VPN</a> oder andere Tunnel-Lösungen verwenden.</p>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/5">Dialect</th><th class="w-1/4">Introduced</th><th>Status &amp; Recommendation</th></tr>
                    <tr><td><strong>SMB1 (CIFS)</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> NT</td><td class="text-[var(--text-muted)]"><strong>Deprecated</strong> – do not use. <a href="https://en.wikipedia.org/wiki/WannaCry_ransomware_attack" target="_blank" class="topic-link">WannaCry</a> exploit. Disabled by default since <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> 4.11.</td></tr>
                    <tr><td><strong>SMB2</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> Vista / Server 2008</td><td class="text-[var(--text-muted)]">Basic support. No encryption. Acceptable for legacy clients.</td></tr>
                    <tr><td><strong>SMB3.0</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 8 / Server 2012</td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" class="topic-link">AES</a>-128-CCM encryption, multichannel, SMB Direct (<a href="https://en.wikipedia.org/wiki/Remote_direct_memory_access" target="_blank" class="topic-link">RDMA</a>).</td></tr>
                    <tr><td><strong>SMB3.1.1</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> 10 / Server 2016</td><td class="text-[var(--text-muted)]"><strong>Recommended</strong> – <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" class="topic-link">AES</a>-128-GCM, integrity checking, pre-auth integrity.</td></tr>
                    </table>
                    </div>
                    <p class="text-xs text-[var(--text-muted)] mt-2"><strong>Security note:</strong> <a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> should <strong>never</strong> be directly exposed to the internet. Always use <a href="https://en.wikipedia.org/wiki/Virtual_private_network" target="_blank" class="topic-link">VPN</a> or other tunneling solutions for remote access.</p>
                    `
                }
            ]
        },

        /* ============ 4. PERFORMANCE ============ */
        {
            id: 'section4',
            titleDe: '4. Performance-Tuning',
            titleEn: '4. Performance Tuning',
            introDe: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> kann für hohe Durchsätze optimiert werden, insbesondere in <a href="https://en.wikipedia.org/wiki/10_Gigabit_Ethernet" target="_blank" class="topic-link">10GbE</a>-Umgebungen. Die wichtigsten Hebel sind SMB3 Multichannel, asynchrones I/O und Socket-Puffer. Eine detaillierte Anleitung finden Sie im <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank" class="topic-link">Samba Performance Tuning Guide</a>.',
            introEn: '<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> can be optimized for high throughput, especially in <a href="https://en.wikipedia.org/wiki/10_Gigabit_Ethernet" target="_blank" class="topic-link">10GbE</a> environments. The key levers are SMB3 Multichannel, asynchronous I/O, and socket buffers. See the <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank" class="topic-link">Samba Performance Tuning Guide</a> for detailed instructions.',
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
                    <li><strong><a href="https://en.wikipedia.org/wiki/Jumbo_frame" target="_blank" class="topic-link">Jumbo Frames</a> (MTU 9000)</strong> aktivieren – erfordert Unterstützung auf Switch und Clients.</li>
                    <li><strong>server signing = default</strong> statt <code>mandatory</code>, wenn keine strikte Signierung benötigt wird.</li>
                    <li><strong>Verschlüsselung</strong> nur wenn nötig – kostet <a href="https://en.wikipedia.org/wiki/Central_processing_unit" target="_blank" class="topic-link">CPU</a>-Leistung. <a href="https://en.wikipedia.org/wiki/AES_instruction_set" target="_blank" class="topic-link">AES-NI</a>-fähige CPUs verwenden.</li>
                    </ul>
                    <p class="mt-3">Weitere Details im <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank" class="topic-link">Samba Performance Tuning Guide</a>.</p>
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
                    <li><strong><a href="https://en.wikipedia.org/wiki/Jumbo_frame" target="_blank" class="topic-link">Jumbo Frames</a> (MTU 9000)</strong> – requires switch and client support.</li>
                    <li><strong>server signing = default</strong> instead of <code>mandatory</code> if strict signing is not required.</li>
                    <li><strong>Encryption</strong> only when necessary – costs <a href="https://en.wikipedia.org/wiki/Central_processing_unit" target="_blank" class="topic-link">CPU</a>. Use <a href="https://en.wikipedia.org/wiki/AES_instruction_set" target="_blank" class="topic-link">AES-NI</a> capable CPUs.</li>
                    </ul>
                    <p class="mt-3">More details in the <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank" class="topic-link">Samba Performance Tuning Guide</a>.</p>
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
                    <p class="mt-3">Nach dem Debugging Log-Level wieder auf <code>0</code> oder <code>1</code> zurücksetzen. Weitere Details im <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank" class="topic-link">Samba Performance Tuning Guide</a>.</p>
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
                    <p class="mt-3">After debugging, reset log level back to <code>0</code> or <code>1</code>. More details in the <a href="https://wiki.samba.org/index.php/Performance_Tuning" target="_blank" class="topic-link">Samba Performance Tuning Guide</a>.</p>
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
            introDe: 'VFS-Module (Virtual File System) erweitern <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> um zusätzliche Funktionen wie Papierkorb, Virenscan oder Quota-Unterstützung. Sie werden pro Share in der <code>smb.conf</code> aktiviert. Die vollständige Liste finden Sie in der <a href="https://www.samba.org/samba/docs/current/man-html/vfs_module.8.html" target="_blank" class="topic-link">vfs_module Manpage</a>.',
            introEn: 'VFS modules (Virtual File System) extend <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> with additional features like recycle bin, virus scanning, or quota support. They are enabled per share in <code>smb.conf</code>. See the <a href="https://www.samba.org/samba/docs/current/man-html/vfs_module.8.html" target="_blank" class="topic-link">vfs_module manpage</a> for the full list.',
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
                    <tr><td><strong>acl_xattr</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/POSIX" target="_blank" class="topic-link">POSIX</a>-<a href="https://en.wikipedia.org/wiki/Access-control_list" target="_blank" class="topic-link">ACLs</a> als Extended Attributes speichern (für <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-ACL-Kompatibilität).</td></tr>
                    <tr><td><strong>streams_xattr</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> Alternate Data Streams (ADS) auf xattrs abbilden.</td></tr>
                    <tr><td><strong>catia</strong></td><td class="text-[var(--text-muted)]">Sonderzeichen-Mapping für <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>-Kompatibilität (z.B. <code>?</code> &rarr; <code>_</code>).</td></tr>
                    <tr><td><strong>fruit</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>-Kompatibilität (<a href="https://support.apple.com/en-us/104984" target="_blank" class="topic-link">Time Machine</a>, Resource Forks, <a href="https://en.wikipedia.org/wiki/Spotlight_(software)" target="_blank" class="topic-link">Spotlight</a>).</td></tr>
                    <tr><td><strong>io_uring</strong></td><td class="text-[var(--text-muted)]">Async I/O mit <a href="https://en.wikipedia.org/wiki/Io_uring" target="_blank" class="topic-link">io_uring</a> (<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> 4.12+). <code>vfs objects = io_uring</code></td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Module</th><th>Function &amp; Example</th></tr>
                    <tr><td><strong>recycle</strong></td><td class="text-[var(--text-muted)]">Recycle bin for deleted files. <code>vfs objects = recycle</code></td></tr>
                    <tr><td><strong>full_audit</strong></td><td class="text-[var(--text-muted)]">Audit log for all file operations. <code>vfs objects = full_audit</code></td></tr>
                    <tr><td><strong>acl_xattr</strong></td><td class="text-[var(--text-muted)]">Store <a href="https://en.wikipedia.org/wiki/POSIX" target="_blank" class="topic-link">POSIX</a> <a href="https://en.wikipedia.org/wiki/Access-control_list" target="_blank" class="topic-link">ACLs</a> as extended attributes (for <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> ACL compatibility).</td></tr>
                    <tr><td><strong>streams_xattr</strong></td><td class="text-[var(--text-muted)]">Map <a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> Alternate Data Streams (ADS) to xattrs.</td></tr>
                    <tr><td><strong>catia</strong></td><td class="text-[var(--text-muted)]">Special character mapping for <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> compatibility (e.g., <code>?</code> &rarr; <code>_</code>).</td></tr>
                    <tr><td><strong>fruit</strong></td><td class="text-[var(--text-muted)]"><a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> compatibility (<a href="https://support.apple.com/en-us/104984" target="_blank" class="topic-link">Time Machine</a>, resource forks, <a href="https://en.wikipedia.org/wiki/Spotlight_(software)" target="_blank" class="topic-link">Spotlight</a>).</td></tr>
                    <tr><td><strong>io_uring</strong></td><td class="text-[var(--text-muted)]">Async I/O with <a href="https://en.wikipedia.org/wiki/Io_uring" target="_blank" class="topic-link">io_uring</a> (<a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> 4.12+). <code>vfs objects = io_uring</code></td></tr>
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
                    <p class="mt-3">Nach Änderungen an VFS-Konfiguration <code>sudo testparm</code> ausführen und Dienste neu laden (<code>sudo systemctl reload smbd</code>). Siehe <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf-Manpage</a>.</p>
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
                    <p class="mt-3">After VFS configuration changes, run <code>sudo testparm</code> and reload services (<code>sudo systemctl reload smbd</code>). See the <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf manpage</a>.</p>
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
            introDe: 'Die zentrale Konfigurationsdatei ist <code>/etc/samba/smb.conf</code>. Sie besteht aus einer <code>[global]</code>-Sektion und beliebig vielen Share-Definitionen. Nach jeder Änderung sollte <code>testparm</code> zur Validierung ausgeführt werden. Weitere Details in der <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf Manpage</a>.',
            introEn: 'The central configuration file is <code>/etc/samba/smb.conf</code>. It consists of a <code>[global]</code> section and any number of share definitions. After each change, <code>testparm</code> should be run for validation. See the <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf manpage</a> for details.',
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
                    <tr><td><strong>Passwörter</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/private/passdb.tdb</code></td><td class="text-[var(--text-muted)]"><a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a>-Passwortdatenbank (TDB).</td></tr>
                    <tr><td><strong>Logs</strong></td><td class="text-[var(--text-muted)]"><code>/var/log/samba/</code></td><td class="text-[var(--text-muted)]">Server-Logs pro Client (log.%m).</td></tr>
                    <tr><td><strong>State</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/</code></td><td class="text-[var(--text-muted)]">Laufzeitdaten (Locking, Registry).</td></tr>
                    <tr><td><strong>Port 445</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> über <a href="https://en.wikipedia.org/wiki/Internet_protocol_suite" target="_blank" class="topic-link">TCP/IP</a> (moderner Standard).</td></tr>
                    <tr><td><strong>Port 139</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> über <a href="https://en.wikipedia.org/wiki/NetBIOS" target="_blank" class="topic-link">NetBIOS</a> (Legacy).</td></tr>
                    <tr><td><strong>Port 137/138</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/NetBIOS" target="_blank" class="topic-link">NetBIOS</a> Name Service &amp; Datagram (nmbd).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Category</th><th class="w-1/4">Path/Port</th><th>Purpose</th></tr>
                    <tr><td><strong>Configuration</strong></td><td class="text-[var(--text-muted)]"><code>/etc/samba/smb.conf</code></td><td class="text-[var(--text-muted)]">Main configuration file.</td></tr>
                    <tr><td><strong>Passwords</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/private/passdb.tdb</code></td><td class="text-[var(--text-muted)]"><a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> password database (TDB).</td></tr>
                    <tr><td><strong>Logs</strong></td><td class="text-[var(--text-muted)]"><code>/var/log/samba/</code></td><td class="text-[var(--text-muted)]">Server logs per client (log.%m).</td></tr>
                    <tr><td><strong>State</strong></td><td class="text-[var(--text-muted)]"><code>/var/lib/samba/</code></td><td class="text-[var(--text-muted)]">Runtime data (locking, registry).</td></tr>
                    <tr><td><strong>Port 445</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> over <a href="https://en.wikipedia.org/wiki/Internet_protocol_suite" target="_blank" class="topic-link">TCP/IP</a> (modern standard).</td></tr>
                    <tr><td><strong>Port 139</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol" target="_blank" class="topic-link">TCP</a></td><td class="text-[var(--text-muted)]"><a href="https://learn.microsoft.com/en-us/windows/win32/fileio/microsoft-smb-protocol-and-cifs-protocol-overview" target="_blank" class="topic-link">SMB</a> over <a href="https://en.wikipedia.org/wiki/NetBIOS" target="_blank" class="topic-link">NetBIOS</a> (legacy).</td></tr>
                    <tr><td><strong>Port 137/138</strong></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" class="topic-link">UDP</a></td><td class="text-[var(--text-muted)]"><a href="https://en.wikipedia.org/wiki/NetBIOS" target="_blank" class="topic-link">NetBIOS</a> Name Service &amp; Datagram (nmbd).</td></tr>
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
                    <p class="mt-3">Nach Passwortänderungen <code>smbpasswd -a username</code> ausführen. Für Gruppenzugriff <code>sudo groupadd smbgroup</code> und <code>sudo usermod -aG smbgroup username</code>. Siehe <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf-Manpage</a>.</p>
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
                    <p class="mt-3">After password changes run <code>smbpasswd -a username</code>. For group access, run <code>sudo groupadd smbgroup</code> and <code>sudo usermod -aG smbgroup username</code>. See the <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" class="topic-link">smb.conf manpage</a>.</p>
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
            introDe: 'Die wichtigsten <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a>-Aspekte auf einen Blick.',
            introEn: 'The key <a href="https://www.samba.org/" target="_blank" class="topic-link">Samba</a> aspects at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Kostenlos & Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" class="topic-link">GPLv3</a>, seit 1992 entwickelt. Standard für <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>-Integration. Keine Lizenzkosten, volle Kontrolle.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-desktop opacity-70"></i><span>2. Universelle Clients</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, <a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a>, <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>. SMB2/3 mit Verschlüsselung und Multichannel.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>3. Performance-Tuning</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">SMB3 Multichannel, <a href="https://en.wikipedia.org/wiki/Io_uring" target="_blank" class="topic-link">io_uring</a>, Socket-Puffer, Sendfile. Für <a href="https://en.wikipedia.org/wiki/10_Gigabit_Ethernet" target="_blank" class="topic-link">10GbE</a> optimierbar mit <a href="https://en.wikipedia.org/wiki/Jumbo_frame" target="_blank" class="topic-link">Jumbo Frames</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cubes opacity-70"></i><span>4. VFS-Module</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Recycle Bin, Audit-Log, ACL-Mapping, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>-Kompatibilität. Per Share in smb.conf aktivierbar.</p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-heart opacity-70"></i><span>1. Free & Open Source</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" class="topic-link">GPLv3</a>, developed since 1992. Standard for <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>-<a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a> integration. No license costs, full control.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-desktop opacity-70"></i><span>2. Universal Clients</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed"><a href="https://www.microsoft.com/windows" target="_blank" class="topic-link">Windows</a>, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a>, <a href="https://www.linux.org/" target="_blank" class="topic-link">Linux</a>, <a href="https://www.android.com/" target="_blank" class="topic-link">Android</a>, <a href="https://www.apple.com/ios/" target="_blank" class="topic-link">iOS</a>, <a href="https://kodi.tv/" target="_blank" class="topic-link">Kodi</a>, <a href="https://www.videolan.org/vlc/" target="_blank" class="topic-link">VLC</a>. SMB2/3 with encryption and multichannel.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-tachometer-alt opacity-70"></i><span>3. Performance Tuning</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">SMB3 Multichannel, <a href="https://en.wikipedia.org/wiki/Io_uring" target="_blank" class="topic-link">io_uring</a>, socket buffers, sendfile. Optimizable for <a href="https://en.wikipedia.org/wiki/10_Gigabit_Ethernet" target="_blank" class="topic-link">10GbE</a> with <a href="https://en.wikipedia.org/wiki/Jumbo_frame" target="_blank" class="topic-link">Jumbo Frames</a>.</p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm"><i class="fa-solid fa-cubes opacity-70"></i><span>4. VFS Modules</span></div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">Recycle bin, audit log, ACL mapping, <a href="https://www.apple.com/macos/" target="_blank" class="topic-link">macOS</a> compatibility. Enable per share in smb.conf.</p>
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