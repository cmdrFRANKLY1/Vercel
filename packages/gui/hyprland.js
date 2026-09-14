(function() {
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['hyprland'] = {
            name: 'Hyprland Desktop',
            version: '1.2.0',
            description: 'A sleek, modern Hyprland-inspired window manager experience with tiling and workspaces',
            preInstalledOn: ['default'],
            translations: {},
            commands: {
                hyprland: function(args) {
                    const wrapperName = 'hyprland';
                    const hasNt = args && args.includes('-nt');
                    const hasNw = args && args.includes('-nw');

                    try {
                        if (this && this.currentPath && this.getNodeByPathArray) {
                            const parentNode = this.getNodeByPathArray(this.currentPath);
                            if (parentNode && parentNode.type === 'dir') {
                                parentNode.children['hyprland.log'] = {
                                    type: 'file',
                                    description: 'Hyprland System Log',
                                    content: `=== Hyprland Desktop Log ===\nStarted at: ${new Date().toISOString()}\nArguments: ${args ? args.join(' ') : 'none'}\nLaunch Mode: ${hasNw ? 'New Window' : (hasNt ? 'New Tab' : 'Embedded')}\nStatus: Successfully initialized compositor.\n`
                                };
                                
                                if (typeof saveVFS === 'function') {
                                    saveVFS();
                                } else if (typeof vfs !== 'undefined') {
                                    localStorage.setItem('sTerminal_vfs', JSON.stringify(vfs));
                                }
                            }
                        }
                    } catch (err) {
                        console.warn("Failed to write hyprland.log:", err);
                    }

                    let baseUrl = window.location.href.split('#')[0].split('?')[0];
                    baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);

                    const htmlContent = generateHyprlandHTML(baseUrl);
                    if (hasNw || hasNt) {
                        const win = window.open('', '_blank', hasNw ? 'width=1024,height=768,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes' : '');
                        if (win) {
                            win.document.write(htmlContent);
                            win.document.close();
                        }
                    } else {
                        if (typeof window.createWrapperTab !== 'undefined') {
                            const blob = new Blob([htmlContent], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            window.createWrapperTab(wrapperName, url);
                        } else if (typeof window.openWrapperWindow !== 'undefined') {
                            const blob = new Blob([htmlContent], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            window.openWrapperWindow(wrapperName, url);
                        } else {
                            const win = window.open('', '_blank');
                            if (win) {
                                win.document.write(htmlContent);
                                win.document.close();
                            }
                        }
                    }
                }
            },
            commandInfo: {
                hyprland: "what is this command?\nhyprland\n\nwhat is it used for?\nOpens a simulated Hyprland window manager environment."
            }
        };
    }

    function generateHyprlandHTML(baseUrl = '') {
        const baseTag = baseUrl ? `<base href="${baseUrl}">\r\n` : '';
        const baseScript = baseUrl ? `<script>window.HYPR_BASE_URL = "${baseUrl}";<\/script>\r\n` : '';

        let html = '<!DOCTYPE html>\r\n' +
'<html lang="en">\r\n' +
'<head>\r\n' +
'    <meta charset="UTF-8">\r\n' +
'    ' + baseTag +
'    ' + baseScript +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\r\n' +
'    <title>Hyprland Experience</title>\r\n' +
'    \r\n' +
'    <script src="https://cdn.tailwindcss.com"><\/script>\r\n' +
'    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\r\n' +
'\r\n';

        html += '    <script>\r\n' +
'        const monochromeTheme = {\r\n' +
'            \'hypr-bg\': \'#000000\', \r\n' +
'            \'hypr-base\': \'#0a0a0a\', \r\n' +
'            \'hypr-surface0\': \'#1a1a1a\', \r\n' +
'            \'hypr-surface1\': \'#2a2a2a\', \r\n' +
'            \'hypr-text\': \'#f5f5f5\',\r\n' +
'            \'hypr-subtext\': \'#a3a3a3\',\r\n' +
'            \'hypr-accent\': \'#ffffff\',\r\n' +
'            \'hypr-red\': \'#555555\',\r\n' +
'            \'hypr-green\': \'#cccccc\',\r\n' +
'        };\r\n' +
'\r\n' +
'        tailwind.config = {\r\n' +
'            theme: {\r\n' +
'                extend: {\r\n' +
'                    colors: monochromeTheme,\r\n' +
'                    fontFamily: {\r\n' +
'                        sans: [\'Fira Code\', \'JetBrains Mono\', \'Noto Sans\', \'sans-serif\'],\r\n' +
'                    }\r\n' +
'                }\r\n' +
'            }\r\n' +
'        }\r\n' +
'    <\/script>\r\n' +
'    \r\n';

        html += '    <style>\r\n' +
'        @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap");\r\n' +
'        :root {\r\n' +
'            --hypr-border-width: 2px;\r\n' +
'            --hypr-border-radius: 12px;\r\n' +
'        }\r\n' +
'        body {\r\n' +
'            overflow: hidden;\r\n' +
'            background-color: #000000;\r\n' +
'            font-family: \'Fira Code\', monospace;\r\n' +
'        }\r\n' +
'\r\n' +
'        #hypr-root {\r\n' +
'            width: 100vw;\r\n' +
'            height: 100vh;\r\n' +
'            transform-origin: top left;\r\n' +
'            transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease;\r\n' +
'        }\r\n' +
'\r\n' +
'        .glass-effect {\r\n' +
'            background: rgba(10, 10, 10, 0.6);\r\n' +
'            backdrop-filter: blur(16px);\r\n' +
'            -webkit-backdrop-filter: blur(16px);\r\n' +
'        }\r\n' +
'\r\n' +
'        #waybar {\r\n' +
'            box-shadow: 0 4px 20px rgba(0,0,0,0.8);\r\n' +
'        }\r\n' +
'\r\n' +
'        .window {\r\n' +
'            background-color: var(--tw-colors-hypr-base);\r\n' +
'            border: var(--hypr-border-width) solid var(--tw-colors-hypr-surface1);\r\n' +
'            border-radius: var(--hypr-border-radius);\r\n' +
'            box-shadow: 0 10px 40px rgba(0,0,0,0.8);\r\n' +
'            transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease, border-width 0.2s ease, border-radius 0.2s ease, width 0.2s ease, height 0.2s ease, top 0.2s ease, left 0.2s ease;\r\n' +
'        }\r\n' +
'        .window.active-window {\r\n' +
'            border-color: var(--tw-colors-hypr-accent);\r\n' +
'            box-shadow: 0 10px 40px rgba(255, 255, 255, 0.1), 0 0 0 1px var(--tw-colors-hypr-accent);\r\n' +
'            z-index: 50;\r\n' +
'        }\r\n' +
'        .window.minimized {\r\n' +
'            opacity: 0;\r\n' +
'            transform: scale(0.9);\r\n' +
'            pointer-events: none;\r\n' +
'        }\r\n' +
'        .window-header {\r\n' +
'            cursor: move;\r\n' +
'            border-top-left-radius: calc(var(--hypr-border-radius) - 2px);\r\n' +
'            border-top-right-radius: calc(var(--hypr-border-radius) - 2px);\r\n' +
'        }\r\n' +
'        \r\n' +
'        #wofi-launcher {\r\n' +
'            transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);\r\n' +
'        }\r\n' +
'        #wofi-launcher.hidden {\r\n' +
'            opacity: 0;\r\n' +
'            transform: translate(-50%, -40%) scale(0.95);\r\n' +
'            pointer-events: none;\r\n' +
'        }\r\n' +
'        #wofi-launcher.visible {\r\n' +
'            opacity: 1;\r\n' +
'            transform: translate(-50%, -50%) scale(1);\r\n' +
'            pointer-events: auto;\r\n' +
'        }\r\n' +
'\r\n' +
'        ::-webkit-scrollbar { width: 6px; }\r\n' +
'        ::-webkit-scrollbar-track { background: transparent; }\r\n' +
'        ::-webkit-scrollbar-thumb { background: var(--tw-colors-hypr-surface1); border-radius: 3px; }\r\n' +
'        ::-webkit-scrollbar-thumb:hover { background: var(--tw-colors-hypr-accent); }\r\n' +
'    <\/style>\r\n' +
'<\/head>\r\n' +
'<body class="text-hypr-text h-screen w-screen overflow-hidden bg-black select-none">\r\n' +
'    <div id="hypr-root" class="relative w-full h-full">\r\n';

        html += '\r\n' +
'        <!-- Desktop Background clickable area to open launcher -->\r\n' +
'        <div id="desktop-area" class="w-full h-full absolute top-0 left-0 z-0" onclick="if(!document.getElementById(\'wofi-launcher\').classList.contains(\'hidden\')) toggleLauncher()">\r\n' +
'        <\/div>\r\n' +
'\r\n' +
'        <!-- Windows Container -->\r\n' +
'        <div id="windows-container" class="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">\r\n' +
'        <\/div>\r\n' +
'\r\n' +
'        <!-- Waybar (Top Bar) -->\r\n' +
'        <div id="waybar" class="absolute top-2 left-2 right-2 h-9 glass-effect rounded-full border border-hypr-surface1 flex items-center justify-between px-4 z-50">\r\n' +
'            <div class="flex items-center gap-2 h-full">\r\n' +
'                <button id="launcher-btn" class="text-hypr-accent hover:text-white transition-colors mr-2" onclick="toggleLauncher(event)" title="Launcher (Ctrl+Space)">\r\n' +
'                    <i class="fa-brands fa-linux text-lg"><\/i>\r\n' +
'                <\/button>\r\n' +
'                <div class="flex gap-1 items-center" id="workspace-container">\r\n' +
'                    <div class="ws-btn w-6 h-6 rounded-full bg-hypr-accent text-black flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" data-ws="1" onclick="switchWorkspace(1)">1<\/div>\r\n' +
'                    <div class="ws-btn w-6 h-6 rounded-full hover:bg-hypr-surface1 text-hypr-subtext flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" data-ws="2" onclick="switchWorkspace(2)">2<\/div>\r\n' +
'                    <div class="ws-btn w-6 h-6 rounded-full hover:bg-hypr-surface1 text-hypr-subtext flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" data-ws="3" onclick="switchWorkspace(3)">3<\/div>\r\n' +
'                    <div class="ws-btn w-6 h-6 rounded-full hover:bg-hypr-surface1 text-hypr-subtext flex items-center justify-center text-xs font-bold cursor-pointer transition-colors" data-ws="4" onclick="switchWorkspace(4)">4<\/div>\r\n' +
'                <\/div>\r\n' +
'            <\/div>\r\n' +
'\r\n' +
'            <div id="active-window-title" class="text-sm font-medium text-hypr-text truncate max-w-[30%] opacity-80">\r\n' +
'                ~\r\n' +
'            <\/div>\r\n' +
'\r\n' +
'            <div class="flex items-center h-full gap-4 text-sm text-hypr-subtext">\r\n' +
'                <i class="fa-solid fa-gear hover:text-white cursor-pointer transition-colors" onclick="openSettings()" title="Hyprland Settings"><\/i>\r\n' +
'                <div id="clock" class="font-medium text-hypr-text bg-hypr-surface0 px-3 py-0.5 rounded-full border border-hypr-surface1 cursor-pointer hover:border-hypr-accent transition-colors">\r\n' +
'                    <span id="time">00:00<\/span>\r\n' +
'                <\/div>\r\n' +
'            <\/div>\r\n' +
'        <\/div>\r\n';

        html += '\r\n' +
'        <!-- Wofi Launcher -->\r\n' +
'        <div id="wofi-launcher" class="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-h-[60vh] bg-hypr-base glass-effect border-2 border-hypr-accent rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] z-[60] flex flex-col overflow-hidden">\r\n' +
'            <div class="p-4 border-b border-hypr-surface1 bg-hypr-base/50">\r\n' +
'                <div class="relative">\r\n' +
'                    <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-hypr-subtext"><\/i>\r\n' +
'                    <input type="text" id="wofi-search" placeholder="Search apps..." class="w-full bg-hypr-surface0 text-hypr-text rounded-lg py-3 pl-12 pr-4 outline-none border border-transparent focus:border-hypr-accent transition-colors" style="font-family: inherit;">\r\n' +
'                <\/div>\r\n' +
'            <\/div>\r\n' +
'            <div class="overflow-y-auto flex-1 p-2 grid grid-cols-2 gap-2" id="apps-container">\r\n' +
'                <div class="col-span-2 p-8 text-center text-hypr-subtext italic" id="no-apps-message">\r\n' +
'                    Loading applications...\r\n' +
'                <\/div>\r\n' +
'            <\/div>\r\n' +
'        <\/div>\r\n' +
'    <\/div>\r\n';

        html += '    <script>\r\n' +
'        let GAP = 12;\r\n' +
'        const WAYBAR_HEIGHT = 44; // 36px height + 8px top margin\r\n' +
'        let activeWindowId = null;\r\n' +
'        let currentWorkspace = 1;\r\n' +
'\r\n' +
'        window.hyprConfig = {\r\n' +
'            borderWidth: 2,\r\n' +
'            borderRadius: 12,\r\n' +
'            gap: 12,\r\n' +
'            autoTiling: true,\r\n' +
'            launcherHotkey: { key: " ", ctrl: true, alt: false, meta: false },\r\n' +
'            scale: 1.0,\r\n' +
'            font: "\'Fira Code\', monospace"\r\n' +
'        };\r\n' +
'\r\n' +
'        function getScrW() { return window.innerWidth / window.hyprConfig.scale; }\r\n' +
'        function getScrH() { return window.innerHeight / window.hyprConfig.scale; }\r\n' +
'\r\n' +
'        window.tileWindows = function() {\r\n' +
'            if (!window.hyprConfig.autoTiling) return;\r\n' +
'            const openWins = Object.values(windows).filter(w => w.isOpen && !w.isMinimized && w.workspace === currentWorkspace);\r\n' +
'            if (openWins.length === 0) return;\r\n' +
'            \r\n' +
'            const maxW = getScrW() - (GAP * 2);\r\n' +
'            const maxH = getScrH() - WAYBAR_HEIGHT - (GAP * 2);\r\n' +
'            \r\n' +
'            if (openWins.length === 1) {\r\n' +
'                const el = openWins[0].element;\r\n' +
'                el.style.top = (WAYBAR_HEIGHT + GAP) + "px";\r\n' +
'                el.style.left = GAP + "px";\r\n' +
'                el.style.width = maxW + "px";\r\n' +
'                el.style.height = maxH + "px";\r\n' +
'                return;\r\n' +
'            }\r\n' +
'            \r\n' +
'            // Master / Stack layout logic\r\n' +
'            const master = openWins[0].element;\r\n' +
'            const masterW = (maxW - GAP) / 2;\r\n' +
'            master.style.top = (WAYBAR_HEIGHT + GAP) + "px";\r\n' +
'            master.style.left = GAP + "px";\r\n' +
'            master.style.width = masterW + "px";\r\n' +
'            master.style.height = maxH + "px";\r\n' +
'            \r\n' +
'            const stackCount = openWins.length - 1;\r\n' +
'            const stackW = (maxW - GAP) / 2;\r\n' +
'            const stackH = (maxH - (GAP * (stackCount - 1))) / stackCount;\r\n' +
'            \r\n' +
'            for (let i = 1; i < openWins.length; i++) {\r\n' +
'                const el = openWins[i].element;\r\n' +
'                el.style.left = (GAP + masterW + GAP) + "px";\r\n' +
'                el.style.top = (WAYBAR_HEIGHT + GAP + (i - 1) * (stackH + GAP)) + "px";\r\n' +
'                el.style.width = stackW + "px";\r\n' +
'                el.style.height = stackH + "px";\r\n' +
'            }\r\n' +
'        };\r\n' +
'\r\n' +
'        window.addEventListener("resize", () => { if(window.hyprConfig.autoTiling) window.tileWindows(); });\r\n' +
'\r\n';

        html += '\r\n' +
'        window.switchWorkspace = function(ws) {\r\n' +
'            currentWorkspace = ws;\r\n' +
'            document.querySelectorAll(\'.ws-btn\').forEach(btn => {\r\n' +
'                if (parseInt(btn.getAttribute(\'data-ws\')) === ws) {\r\n' +
'                    btn.className = \'ws-btn w-6 h-6 rounded-full bg-hypr-accent text-black flex items-center justify-center text-xs font-bold cursor-pointer transition-colors\';\r\n' +
'                } else {\r\n' +
'                    btn.className = \'ws-btn w-6 h-6 rounded-full hover:bg-hypr-surface1 text-hypr-subtext flex items-center justify-center text-xs font-bold cursor-pointer transition-colors\';\r\n' +
'                }\r\n' +
'            });\r\n' +
'            Object.values(windows).forEach(w => {\r\n' +
'                if(w.workspace === ws && !w.isMinimized) {\r\n' +
'                    w.element.style.display = \'flex\';\r\n' +
'                } else {\r\n' +
'                    w.element.style.display = \'none\';\r\n' +
'                }\r\n' +
'            });\r\n' +
'            window.tileWindows();\r\n' +
'        }\r\n' +
'\r\n' +
'        document.addEventListener("keydown", (e) => {\r\n' +
'            const hk = window.hyprConfig.launcherHotkey;\r\n' +
'            if (e.key.toLowerCase() === hk.key.toLowerCase() && \r\n' +
'                e.ctrlKey === hk.ctrl && \r\n' +
'                e.altKey === hk.alt && \r\n' +
'                e.metaKey === hk.meta) {\r\n' +
'                e.preventDefault();\r\n' +
'                toggleLauncher();\r\n' +
'            }\r\n' +
'        });\r\n' +
'\r\n' +
'        window.updateHyprConfig = function(key, value) {\r\n' +
'            if (key === "autoTiling") {\r\n' +
'                window.hyprConfig.autoTiling = value;\r\n' +
'                if (value) window.tileWindows();\r\n' +
'            } else if (key === "scale") {\r\n' +
'                window.hyprConfig.scale = parseFloat(value);\r\n' +
'                document.getElementById("set-scale-val").textContent = window.hyprConfig.scale.toFixed(1);\r\n' +
'                const root = document.getElementById("hypr-root");\r\n' +
'                root.style.transform = `scale(${window.hyprConfig.scale})`;\r\n' +
'                root.style.width = `${100 / window.hyprConfig.scale}%`;\r\n' +
'                root.style.height = `${100 / window.hyprConfig.scale}%`;\r\n' +
'                window.tileWindows();\r\n' +
'            } else if (key === "font") {\r\n' +
'                window.hyprConfig.font = value;\r\n' +
'                document.body.style.fontFamily = value;\r\n' +
'            } else {\r\n' +
'                window.hyprConfig[key] = parseInt(value);\r\n' +
'                if (key === "borderWidth") {\r\n' +
'                    document.getElementById("set-bw-val").textContent = value;\r\n' +
'                    document.documentElement.style.setProperty("--hypr-border-width", value + "px");\r\n' +
'                } else if (key === "borderRadius") {\r\n' +
'                    document.getElementById("set-br-val").textContent = value;\r\n' +
'                    document.documentElement.style.setProperty("--hypr-border-radius", value + "px");\r\n' +
'                } else if (key === "gap") {\r\n' +
'                    document.getElementById("set-gap-val").textContent = value;\r\n' +
'                    GAP = parseInt(value);\r\n' +
'                    if (window.hyprConfig.autoTiling) window.tileWindows();\r\n' +
'                }\r\n' +
'            }\r\n' +
'        };\r\n' +
'\r\n' +
'        window.formatHotkey = function(hk) {\r\n' +
'            let str = [];\r\n' +
'            if (hk.ctrl) str.push("Ctrl");\r\n' +
'            if (hk.alt) str.push("Alt");\r\n' +
'            if (hk.meta) str.push("Meta");\r\n' +
'            if (hk.key === " ") str.push("Space");\r\n' +
'            else str.push(hk.key.toUpperCase());\r\n' +
'            return str.join("+");\r\n' +
'        };\r\n';

        html += '\r\n' +
'        function updateClock() {\r\n' +
'            const now = new Date();\r\n' +
'            const timeString = now.toLocaleTimeString([], { hour: \'2-digit\', minute: \'2-digit\' });\r\n' +
'            document.getElementById(\'time\').textContent = timeString;\r\n' +
'        }\r\n' +
'        setInterval(updateClock, 1000);\r\n' +
'        updateClock();\r\n' +
'\r\n' +
'        const launcher = document.getElementById(\'wofi-launcher\');\r\n' +
'        const searchInput = document.getElementById(\'wofi-search\');\r\n' +
'        let availableApps = [];\r\n' +
'\r\n' +
'        function toggleLauncher(e) {\r\n' +
'            if(e) e.stopPropagation();\r\n' +
'            if (launcher.classList.contains(\'hidden\')) {\r\n' +
'                launcher.classList.remove(\'hidden\');\r\n' +
'                setTimeout(() => {\r\n' +
'                    launcher.classList.add(\'visible\');\r\n' +
'                    searchInput.focus();\r\n' +
'                    searchInput.value = \'\';\r\n' +
'                    filterApps(\'\');\r\n' +
'                }, 10);\r\n' +
'            } else {\r\n' +
'                launcher.classList.remove(\'visible\');\r\n' +
'                setTimeout(() => launcher.classList.add(\'hidden\'), 200);\r\n' +
'            }\r\n' +
'        }\r\n' +
'\r\n' +
'        searchInput.addEventListener(\'input\', (e) => filterApps(e.target.value));\r\n' +
'\r\n' +
'        function filterApps(query) {\r\n' +
'            query = query.toLowerCase();\r\n' +
'            const btns = document.querySelectorAll(\'.app-btn\');\r\n' +
'            btns.forEach(btn => {\r\n' +
'                const name = btn.getAttribute(\'data-name\').toLowerCase();\r\n' +
'                if (name.includes(query)) btn.style.display = \'flex\';\r\n' +
'                else btn.style.display = \'none\';\r\n' +
'            });\r\n' +
'        }\r\n' +
'\r\n' +
'        function formatAppName(name) {\r\n' +
'            if (!name) return \'\';\r\n' +
'            let cleanName = name.replace(/\\.html$/i, \'\');\r\n' +
'            return cleanName.replace(/([a-z])([A-Z])/g, \'$1 $2\').replace(/[-_]/g, \' \').replace(/^./, str => str.toUpperCase());\r\n' +
'        }\r\n';

        html += '\r\n' +
'        document.addEventListener(\'DOMContentLoaded\', () => {\r\n' +
'            const fallbackRegistry = {\r\n' +
'                "apps": ["textureEditor", "blackjack", "calculator", "textEditor", "fileBrowser", "viona", "quiz", "blackboard"],\r\n' +
'                "desktop": ["ipv4", "wiso", "ipv6", "netsim"]\r\n' +
'            };\r\n' +
'            const possiblePaths = [\'../../registry.json\', \'../registry.json\', \'./registry.json\', \'/registry.json\'];\r\n' +
'\r\n' +
'            async function loadRegistry() {\r\n' +
'                for (const path of possiblePaths) {\r\n' +
'                    try {\r\n' +
'                        const response = await fetch(path);\r\n' +
'                        if (response.ok) {\r\n' +
'                            const data = await response.json();\r\n' +
'                            if (data && (data.apps || data.desktop)) return data;\r\n' +
'                        }\r\n' +
'                    } catch (err) {}\r\n' +
'                }\r\n' +
'                return fallbackRegistry;\r\n' +
'            }\r\n' +
'\r\n' +
'            loadRegistry().then(registry => {\r\n' +
'                const allApps = [...new Set([...(registry.apps || fallbackRegistry.apps), ...(registry.desktop || fallbackRegistry.desktop)])];\r\n' +
'                window.hyprlandApps = registry.desktop || fallbackRegistry.desktop;\r\n' +
'                renderAppList(allApps);\r\n' +
'            });\r\n' +
'        });\r\n' +
'\r\n' +
'        function renderAppList(apps) {\r\n' +
'            const container = document.getElementById(\'apps-container\');\r\n' +
'            container.innerHTML = \'\';\r\n' +
'            if (apps && apps.length > 0) {\r\n' +
'                apps.forEach(app => {\r\n' +
'                    const btn = document.createElement(\'button\');\r\n' +
'                    btn.className = \'app-btn flex items-center gap-3 p-3 rounded-lg hover:bg-hypr-surface1 transition-colors text-left border border-transparent hover:border-hypr-surface1 outline-none focus:border-hypr-accent group\';\r\n' +
'                    btn.setAttribute(\'data-name\', formatAppName(app));\r\n' +
'                    btn.innerHTML = `\r\n' +
'                        <div class="w-10 h-10 rounded bg-hypr-surface0 flex items-center justify-center text-hypr-accent group-hover:scale-110 transition-transform">\r\n' +
'                            <i class="fa-solid fa-terminal"><\/i>\r\n' +
'                        <\/div>\r\n' +
'                        <span class="font-medium text-sm text-hypr-text">${formatAppName(app)}<\/span>\r\n' +
'                    `;\r\n' +
'                    btn.onclick = () => {\r\n' +
'                        launchApp(app);\r\n' +
'                        toggleLauncher();\r\n' +
'                    };\r\n' +
'                    container.appendChild(btn);\r\n' +
'                });\r\n' +
'            } else {\r\n' +
'                container.innerHTML = \'<div class="col-span-2 p-8 text-center text-hypr-subtext">No apps found<\/div>\';\r\n' +
'            }\r\n' +
'        }\r\n';

        html += '        const windows = {};\r\n' +
'        const zIndexBase = 100;\r\n' +
'        let currentZIndex = zIndexBase;\r\n' +
'\r\n' +
'        const appConfig = {\r\n' +
'            \'kcalc\': { width: 400, height: 560, maxizable: false },\r\n' +
'            \'kate\': { width: 800, height: 540, maxizable: true },\r\n' +
'            \'radioPlayer\': { width: 460, height: 600, maxizable: false },\r\n' +
'            \'ipv4\': { width: 1000, height: 700, maxizable: true },\r\n' +
'            \'wiso\': { width: 1200, height: 800, maxizable: true }\r\n' +
'        };\r\n' +
'\r\n' +
'        function htmlAppCandidates(appName, primaryUrl) {\r\n' +
'            const v = Array.from(new Set([appName, appName.toLowerCase(), appName.charAt(0).toUpperCase() + appName.slice(1)]));\r\n' +
'            const list = primaryUrl ? [primaryUrl] : [];\r\n' +
'            v.forEach(x => { if(x) { list.push(`packages/desktop/${x}.html`); list.push(`../desktop/${x}.html`); } });\r\n' +
'            return list.filter(Boolean);\r\n' +
'        }\r\n' +
'\r\n' +
'        async function findFirstExistingHtml(candidates) {\r\n' +
'            for (const url of candidates) {\r\n' +
'                try { if ((await fetch(url, { method: \'HEAD\' })).ok) return url; } catch (e) {}\r\n' +
'            }\r\n' +
'            return null;\r\n' +
'        }\r\n' +
'\r\n' +
'        window.openSettings = function() {\r\n' +
'            const winId = "window-settings";\r\n' +
'            if (windows[winId]) {\r\n' +
'                if(windows[winId].workspace !== currentWorkspace) {\r\n' +
'                    window.switchWorkspace(windows[winId].workspace);\r\n' +
'                }\r\n' +
'                bringToFront(winId);\r\n' +
'                return;\r\n' +
'            }\r\n' +
'            \r\n' +
'            const winDiv = document.createElement("div");\r\n' +
'            winDiv.id = winId;\r\n' +
'            winDiv.className = "window absolute flex flex-col overflow-hidden pointer-events-auto no-maximize";\r\n' +
'            winDiv.style.width = "400px";\r\n' +
'            winDiv.style.height = "550px";\r\n' +
'            winDiv.style.top = (WAYBAR_HEIGHT + GAP) + "px";\r\n' +
'            winDiv.style.left = GAP + "px";\r\n' +
'            \r\n' +
'            winDiv.innerHTML = `\r\n' +
'                <div class="window-header h-8 bg-hypr-surface0 flex justify-between items-center px-3 border-b border-hypr-surface1 select-none">\r\n' +
'                    <span class="text-xs font-semibold tracking-wider text-hypr-subtext truncate">Hyprland Settings</span>\r\n' +
'                    <div class="flex gap-2 items-center">\r\n' +
'                        <div class="w-3 h-3 rounded-full bg-hypr-red cursor-pointer hover:opacity-80" onclick="closeApp(\'${winId}\')"></div>\r\n' +
'                    </div>\r\n' +
'                </div>\r\n' +
'                <div class="flex-1 bg-hypr-base p-5 overflow-y-auto">\r\n' +
'                    <div class="flex flex-col gap-5">\r\n' +
'                        <div class="flex flex-col gap-1">\r\n' +
'                            <label class="flex items-center gap-2 cursor-pointer">\r\n' +
'                                <input type="checkbox" id="set-tiling" ${window.hyprConfig.autoTiling ? \'checked\' : \'\'} onchange="updateHyprConfig(\'autoTiling\', this.checked)">\r\n' +
'                                <span class="text-sm text-hypr-subtext font-semibold">Enable Master/Stack Auto-Tiling</span>\r\n' +
'                            </label>\r\n' +
'                        </div>\r\n' +
'                        <div class="flex flex-col gap-1">\r\n' +
'                            <label class="text-hypr-subtext font-semibold">Border Width (<span id="set-bw-val">${window.hyprConfig.borderWidth}</span>px)</label>\r\n' +
'                            <input type="range" min="0" max="10" value="${window.hyprConfig.borderWidth}" oninput="updateHyprConfig(\'borderWidth\', this.value)" class="w-full">\r\n' +
'                        </div>\r\n' +
'                        <div class="flex flex-col gap-1">\r\n' +
'                            <label class="text-hypr-subtext font-semibold">Border Radius (<span id="set-br-val">${window.hyprConfig.borderRadius}</span>px)</label>\r\n' +
'                            <input type="range" min="0" max="30" value="${window.hyprConfig.borderRadius}" oninput="updateHyprConfig(\'borderRadius\', this.value)" class="w-full">\r\n' +
'                        </div>\r\n' +
'                        <div class="flex flex-col gap-1">\r\n' +
'                            <label class="text-hypr-subtext font-semibold">Gaps In/Out (<span id="set-gap-val">${window.hyprConfig.gap}</span>px)</label>\r\n' +
'                            <input type="range" min="0" max="40" value="${window.hyprConfig.gap}" onchange="updateHyprConfig(\'gap\', this.value)" class="w-full">\r\n' +
'                        </div>\r\n' +
'                        <div class="flex flex-col gap-1">\r\n' +
'                            <label class="text-hypr-subtext font-semibold">Global Scale (<span id="set-scale-val">${window.hyprConfig.scale.toFixed(1)}</span>x)</label>\r\n' +
'                            <input type="range" min="0.5" max="2.0" step="0.1" value="${window.hyprConfig.scale}" oninput="updateHyprConfig(\'scale\', this.value)" class="w-full">\r\n' +
'                        </div>\r\n' +
'                        <div class="flex flex-col gap-1">\r\n' +
'                            <label class="text-hypr-subtext font-semibold">System Font</label>\r\n' +
'                            <select onchange="updateHyprConfig(\'font\', this.value)" class="w-full bg-hypr-surface0 border border-hypr-surface1 text-hypr-text text-sm rounded p-2 focus:outline-none focus:border-hypr-accent">\r\n' +
'                                <option value="\'Fira Code\', monospace" ${window.hyprConfig.font.includes(\'Fira\') ? \'selected\' : \'\'}>Fira Code</option>\r\n' +
'                                <option value="\'JetBrains Mono\', monospace" ${window.hyprConfig.font.includes(\'JetBrains\') ? \'selected\' : \'\'}>JetBrains Mono</option>\r\n' +
'                                <option value="Consolas, monospace" ${window.hyprConfig.font.includes(\'Consolas\') ? \'selected\' : \'\'}>Consolas</option>\r\n' +
'                                <option value="\'Courier New\', monospace" ${window.hyprConfig.font.includes(\'Courier\') ? \'selected\' : \'\'}>Courier New</option>\r\n' +
'                                <option value="sans-serif" ${window.hyprConfig.font === \'sans-serif\' ? \'selected\' : \'\'}>Sans-Serif</option>\r\n' +
'                            </select>\r\n' +
'                        </div>\r\n' +
'                        <div class="flex flex-col gap-1 mt-1">\r\n' +
'                            <label class="text-hypr-subtext font-semibold">Launcher Hotkey</label>\r\n' +
'                            <button id="hotkey-btn" class="px-4 py-2 mt-1 bg-hypr-surface0 border border-hypr-surface1 rounded text-sm text-hypr-text hover:border-hypr-accent transition-colors w-full text-left flex justify-between items-center">\r\n' +
'                                <span id="hotkey-display">${formatHotkey(window.hyprConfig.launcherHotkey)}</span>\r\n' +
'                                <i class="fa-solid fa-keyboard text-hypr-subtext"></i>\r\n' +
'                            </button>\r\n' +
'                        </div>\r\n' +
'                    </div>\r\n' +
'                </div>\r\n' +
'            `;\r\n' +
'            \r\n' +
'            document.getElementById(\'windows-container\').appendChild(winDiv);\r\n' +
'            \r\n' +
'            setTimeout(() => {\r\n' +
'                const hkBtn = document.getElementById(\'hotkey-btn\');\r\n' +
'                if(hkBtn) {\r\n' +
'                    hkBtn.addEventListener(\'click\', () => {\r\n' +
'                        hkBtn.innerHTML = \'<span class="text-hypr-accent animate-pulse">Press any key combination...</span>\';\r\n' +
'                        const captureKey = (e) => {\r\n' +
'                            e.preventDefault();\r\n' +
'                            if (e.key !== \'Control\' && e.key !== \'Alt\' && e.key !== \'Shift\' && e.key !== \'Meta\') {\r\n' +
'                                window.hyprConfig.launcherHotkey = { key: e.key, ctrl: e.ctrlKey, alt: e.altKey, meta: e.metaKey };\r\n' +
'                                hkBtn.innerHTML = `<span id="hotkey-display">${formatHotkey(window.hyprConfig.launcherHotkey)}</span><i class="fa-solid fa-keyboard text-hypr-subtext"></i>`;\r\n' +
'                                document.removeEventListener(\'keydown\', captureKey);\r\n' +
'                            }\r\n' +
'                        };\r\n' +
'                        document.addEventListener(\'keydown\', captureKey);\r\n' +
'                    });\r\n' +
'                }\r\n' +
'            }, 100);\r\n' +
'\r\n' +
'            windows[winId] = {\r\n' +
'                element: winDiv, isOpen: true, isMaximized: false, isSnapped: false,\r\n' +
'                appName: "settings", title: "Hyprland Settings", config: {maxizable: false},\r\n' +
'                workspace: currentWorkspace\r\n' +
'            };\r\n' +
'            makeDraggable(winDiv);\r\n' +
'            winDiv.addEventListener("mousedown", () => bringToFront(winId));\r\n' +
'            bringToFront(winId);\r\n' +
'            window.tileWindows();\r\n' +
'        };\r\n';

        html += '\r\n' +
'        function launchApp(appName) {\r\n' +
'            try {\r\n' +
'                const winId = `window-${appName}`;\r\n' +
'                if (windows[winId]) {\r\n' +
'                    if(windows[winId].workspace !== currentWorkspace) {\r\n' +
'                        window.switchWorkspace(windows[winId].workspace);\r\n' +
'                    }\r\n' +
'                    if (windows[winId].isMinimized) openWindow(winId);\r\n' +
'                    bringToFront(winId);\r\n' +
'                    return;\r\n' +
'                }\r\n' +
'\r\n' +
'                let config = appConfig[appName.toLowerCase()] || appConfig[appName] || { width: 800, height: 600, maxizable: true };\r\n' +
'                let isHtmlApp = window.hyprlandApps && window.hyprlandApps.includes(appName) || appName.toLowerCase().endsWith(\'.html\');\r\n' +
'                \r\n' +
'                const winDiv = document.createElement(\'div\');\r\n' +
'                winDiv.id = winId;\r\n' +
'                winDiv.className = \'window absolute flex flex-col overflow-hidden pointer-events-auto \' + (!config.maxizable ? \'no-maximize\' : \'\');\r\n' +
'                \r\n' +
'                const maxW = getScrW() - (GAP * 2);\r\n' +
'                const maxH = getScrH() - WAYBAR_HEIGHT - (GAP * 2);\r\n' +
'                const w = Math.min(config.width, maxW);\r\n' +
'                const h = Math.min(config.height, maxH);\r\n' +
'                \r\n' +
'                winDiv.style.width = `${w}px`;\r\n' +
'                winDiv.style.height = `${h}px`;\r\n' +
'                winDiv.style.top = `${WAYBAR_HEIGHT + GAP + (Math.random() * 40)}px`;\r\n' +
'                winDiv.style.left = `${(getScrW() - w)/2 + (Math.random() * 40 - 20)}px`;\r\n' +
'                \r\n' +
'                winDiv.innerHTML = `\r\n' +
'                    <div class="window-header h-8 bg-hypr-surface0 flex justify-between items-center px-3 border-b border-hypr-surface1 select-none">\r\n' +
'                        <span class="text-xs font-semibold tracking-wider text-hypr-subtext truncate">${formatAppName(appName)}<\/span>\r\n' +
'                        <div class="flex gap-2 items-center">\r\n' +
'                            <div class="w-3 h-3 rounded-full bg-hypr-green cursor-pointer hover:opacity-80" onclick="maximizeWindow(\'${winId}\')"><\/div>\r\n' +
'                            <div class="w-3 h-3 rounded-full bg-hypr-red cursor-pointer hover:opacity-80" onclick="closeApp(\'${winId}\')"><\/div>\r\n' +
'                        <\/div>\r\n' +
'                    <\/div>\r\n' +
'                    <div class="flex-1 relative bg-hypr-base">\r\n' +
'                        <div class="iframe-glass absolute inset-0 z-10 hidden"><\/div>\r\n' +
'                        <iframe id="iframe-${winId}" class="w-full h-full border-none block"><\/iframe>\r\n' +
'                    <\/div>\r\n' +
'                `;\r\n' +
'                document.getElementById(\'windows-container\').appendChild(winDiv);\r\n' +
'                \r\n' +
'                const iframe = winDiv.querySelector(\'iframe\');\r\n';

        html += '                if (isHtmlApp) {\r\n' +
'                    const htmlUrl = `packages/desktop/${appName}.html`;\r\n' +
'                    findFirstExistingHtml(htmlAppCandidates(appName, htmlUrl)).then(found => {\r\n' +
'                        if (found) iframe.src = found;\r\n' +
'                        else iframe.srcdoc = `<body style="background:#0a0a0a;color:#f5f5f5;font-family:monospace;padding:2rem;">App not found: ${appName}<\/body>`;\r\n' +
'                    });\r\n' +
'                } else {\r\n' +
'                    const iframeContent = `<!DOCTYPE html>\r\n' +
'                    <html lang="en" class="h-full">\r\n' +
'                    <head>\r\n' +
'                        <meta charset="UTF-8">\r\n' +
'                        ${window.HYPR_BASE_URL ? `<base href="${window.HYPR_BASE_URL}">` : \'\'}\r\n' +
'                        <style>html, body { height: 100%; margin: 0; background: #0a0a0a; color: #f5f5f5; font-family: sans-serif; }<\/style>\r\n' +
'                    <\/head>\r\n' +
'                    <body>\r\n' +
'                        <script>\r\n' +
'                            (function() {\r\n' +
'                                const paths = ["packages/apps/${appName}.js", "../apps/${appName}.js", "${appName}.js"];\r\n' +
'                                let idx = 0;\r\n' +
'                                function load() {\r\n' +
'                                    if(idx >= paths.length) return document.body.innerHTML = "Failed to load script.";\r\n' +
'                                    const s = document.createElement(\'script\');\r\n' +
'                                    s.src = paths[idx];\r\n' +
'                                    s.onerror = () => { idx++; load(); };\r\n' +
'                                    document.body.appendChild(s);\r\n' +
'                                }\r\n' +
'                                load();\r\n' +
'                            })();\r\n' +
'                        <\\/script>\r\n' +
'                    <\/body><\/html>`;\r\n' +
'                    iframe.srcdoc = iframeContent;\r\n' +
'                }\r\n' +
'\r\n' +
'                windows[winId] = {\r\n' +
'                    element: winDiv, isOpen: true, isMaximized: false, isSnapped: false,\r\n' +
'                    appName: appName, title: formatAppName(appName), config: config,\r\n' +
'                    workspace: currentWorkspace\r\n' +
'                };\r\n' +
'                makeDraggable(winDiv);\r\n' +
'                winDiv.addEventListener(\'mousedown\', () => bringToFront(winId));\r\n' +
'                bringToFront(winId);\r\n' +
'                window.tileWindows();\r\n' +
'            } catch (err) {\r\n' +
'                console.error(err);\r\n' +
'            }\r\n' +
'        }\r\n';

        html += '\r\n' +
'        function closeApp(winId) {\r\n' +
'            if (windows[winId]) { windows[winId].element.remove(); delete windows[winId]; }\r\n' +
'            const remaining = Object.keys(windows).filter(id => windows[id].workspace === currentWorkspace);\r\n' +
'            if(remaining.length > 0) bringToFront(remaining[remaining.length - 1]);\r\n' +
'            else document.getElementById(\'active-window-title\').textContent = \'~\';\r\n' +
'            window.tileWindows();\r\n' +
'        }\r\n' +
'\r\n' +
'        function bringToFront(winId) {\r\n' +
'            if (windows[winId]) {\r\n' +
'                currentZIndex++;\r\n' +
'                windows[winId].element.style.zIndex = currentZIndex;\r\n' +
'                \r\n' +
'                Object.values(windows).forEach(w => w.element.classList.remove(\'active-window\'));\r\n' +
'                windows[winId].element.classList.add(\'active-window\');\r\n' +
'                document.getElementById(\'active-window-title\').textContent = windows[winId].title;\r\n' +
'                activeWindowId = winId;\r\n' +
'            }\r\n' +
'        }\r\n' +
'\r\n' +
'        function maximizeWindow(winId) {\r\n' +
'            if (window.hyprConfig.autoTiling) return;\r\n' +
'            const w = windows[winId];\r\n' +
'            if (!w || (w.config && !w.config.maxizable)) return;\r\n' +
'            const el = w.element;\r\n' +
'            \r\n' +
'            if(w.isMaximized) {\r\n' +
'                w.isMaximized = false;\r\n' +
'                el.style.width = w.preSnapWidth + \'px\';\r\n' +
'                el.style.height = w.preSnapHeight + \'px\';\r\n' +
'                el.style.top = w.preSnapTop + \'px\';\r\n' +
'                el.style.left = w.preSnapLeft + \'px\';\r\n' +
'                el.style.borderRadius = window.hyprConfig.borderRadius + \'px\';\r\n' +
'            } else {\r\n' +
'                if(!w.isSnapped) {\r\n' +
'                    w.preSnapWidth = el.offsetWidth; w.preSnapHeight = el.offsetHeight;\r\n' +
'                    w.preSnapTop = el.offsetTop; w.preSnapLeft = el.offsetLeft;\r\n' +
'                }\r\n' +
'                w.isMaximized = true; w.isSnapped = false;\r\n' +
'                el.style.top = WAYBAR_HEIGHT + GAP + \'px\';\r\n' +
'                el.style.left = GAP + \'px\';\r\n' +
'                el.style.width = (getScrW() - GAP * 2) + \'px\';\r\n' +
'                el.style.height = (getScrH() - WAYBAR_HEIGHT - GAP * 2) + \'px\';\r\n' +
'            }\r\n' +
'            bringToFront(winId);\r\n' +
'        }\r\n';

        html += '\r\n' +
'        function makeDraggable(element) {\r\n' +
'            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;\r\n' +
'            const header = element.querySelector(\'.window-header\');\r\n' +
'            const winId = element.id;\r\n' +
'            let snapPreview = document.getElementById(\'snap-preview\');\r\n' +
'            if (!snapPreview) {\r\n' +
'                snapPreview = document.createElement(\'div\');\r\n' +
'                snapPreview.id = \'snap-preview\';\r\n' +
'                snapPreview.className = \'absolute bg-hypr-accent/20 border-2 border-hypr-accent hidden z-40 transition-all duration-150 pointer-events-none rounded-xl\';\r\n' +
'                document.getElementById(\'windows-container\').appendChild(snapPreview);\r\n' +
'            }\r\n' +
'            header.onmousedown = dragMouseDown;\r\n' +
'            let currentSnap = \'\';\r\n' +
'\r\n' +
'            function dragMouseDown(e) {\r\n' +
'                if(e.target.tagName === \'DIV\' && e.target.classList.contains(\'cursor-pointer\')) return;\r\n' +
'                const scale = window.hyprConfig.scale;\r\n' +
'                const w = windows[winId];\r\n' +
'                if(w && (w.isMaximized || w.isSnapped) && !window.hyprConfig.autoTiling) {\r\n' +
'                    const rect = element.getBoundingClientRect();\r\n' +
'                    const ratio = (e.clientX - rect.left) / rect.width;\r\n' +
'                    w.isMaximized = false; w.isSnapped = false;\r\n' +
'                    element.style.width = w.preSnapWidth + \'px\';\r\n' +
'                    element.style.height = w.preSnapHeight + \'px\';\r\n' +
'                    element.style.left = ((e.clientX / scale) - (w.preSnapWidth * ratio)) + \'px\';\r\n' +
'                    element.style.top = ((e.clientY / scale) - 15) + \'px\';\r\n' +
'                }\r\n' +
'                e.preventDefault();\r\n' +
'                pos3 = e.clientX; pos4 = e.clientY;\r\n' +
'                document.onmouseup = closeDragElement;\r\n' +
'                document.onmousemove = elementDrag;\r\n' +
'                const glass = element.querySelector(\'.iframe-glass\');\r\n' +
'                if(glass) glass.classList.remove(\'hidden\');\r\n' +
'                bringToFront(winId);\r\n' +
'            }\r\n' +
'\r\n' +
'            function elementDrag(e) {\r\n' +
'                e.preventDefault();\r\n' +
'                if (window.hyprConfig.autoTiling) return;\r\n' +
'                const scale = window.hyprConfig.scale;\r\n' +
'                pos1 = (pos3 - e.clientX) / scale; \r\n' +
'                pos2 = (pos4 - e.clientY) / scale;\r\n' +
'                pos3 = e.clientX; \r\n' +
'                pos4 = e.clientY;\r\n' +
'                \r\n' +
'                let newTop = element.offsetTop - pos2;\r\n' +
'                if(newTop < WAYBAR_HEIGHT) newTop = WAYBAR_HEIGHT;\r\n' +
'                element.style.top = newTop + "px";\r\n' +
'                element.style.left = (element.offsetLeft - pos1) + "px";\r\n' +
'\r\n' +
'                const snapZone = 20;\r\n' +
'                let sLeft = e.clientX < snapZone;\r\n' +
'                let sRight = e.clientX > window.innerWidth - snapZone;\r\n' +
'\r\n' +
'                currentSnap = \'\';\r\n' +
'                snapPreview.classList.add(\'hidden\');\r\n' +
'                \r\n' +
'                if(windows[winId] && windows[winId].config && windows[winId].config.maxizable) {\r\n' +
'                    if (sLeft) currentSnap = \'left\';\r\n' +
'                    else if (sRight) currentSnap = \'right\';\r\n' +
'                    \r\n' +
'                    if (currentSnap) {\r\n' +
'                        snapPreview.classList.remove(\'hidden\');\r\n' +
'                        const h = getScrH() - WAYBAR_HEIGHT - (GAP * 2);\r\n' +
'                        const w = (getScrW() / 2) - (GAP * 1.5);\r\n' +
'                        snapPreview.style.top = WAYBAR_HEIGHT + GAP + \'px\';\r\n' +
'                        snapPreview.style.width = w + \'px\';\r\n' +
'                        snapPreview.style.height = h + \'px\';\r\n' +
'                        if(currentSnap === \'left\') snapPreview.style.left = GAP + \'px\';\r\n' +
'                        if(currentSnap === \'right\') snapPreview.style.left = (getScrW()/2 + GAP/2) + \'px\';\r\n' +
'                    }\r\n' +
'                }\r\n' +
'            }\r\n' +
'\r\n' +
'            function closeDragElement() {\r\n' +
'                document.onmouseup = null; document.onmousemove = null;\r\n' +
'                const glass = element.querySelector(\'.iframe-glass\');\r\n' +
'                if(glass) glass.classList.add(\'hidden\');\r\n' +
'                \r\n' +
'                if (currentSnap && !window.hyprConfig.autoTiling) {\r\n' +
'                    snapPreview.classList.add(\'hidden\');\r\n' +
'                    const wInfo = windows[winId];\r\n' +
'                    if (!wInfo.isMaximized && !wInfo.isSnapped) {\r\n' +
'                        wInfo.preSnapWidth = element.offsetWidth;\r\n' +
'                        wInfo.preSnapHeight = element.offsetHeight;\r\n' +
'                        wInfo.preSnapTop = element.offsetTop;\r\n' +
'                        wInfo.preSnapLeft = element.offsetLeft;\r\n' +
'                    }\r\n' +
'                    wInfo.isSnapped = true; wInfo.isMaximized = false;\r\n' +
'                    \r\n' +
'                    const h = getScrH() - WAYBAR_HEIGHT - (GAP * 2);\r\n' +
'                    const w = (getScrW() / 2) - (GAP * 1.5);\r\n' +
'                    element.style.top = WAYBAR_HEIGHT + GAP + \'px\';\r\n' +
'                    element.style.height = h + \'px\';\r\n' +
'                    element.style.width = w + \'px\';\r\n' +
'                    \r\n' +
'                    if (currentSnap === \'left\') element.style.left = GAP + \'px\';\r\n' +
'                    if (currentSnap === \'right\') element.style.left = (getScrW()/2 + GAP/2) + \'px\';\r\n' +
'                }\r\n' +
'                currentSnap = \'\';\r\n' +
'            }\r\n' +
'        }\r\n' +
'    <\/script>\r\n' +
'<\/body>\r\n' +
'<\/html>';

        return html;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            generateHyprlandHTML,
            package: {
                name: 'hyprland',
                version: '1.2.0',
                description: 'A sleek, modern Hyprland-inspired window manager experience with auto-tiling and workspaces'
            }
        };
    }
})();