(function() {
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['kde'] = {
            name: 'KDE Plasma Desktop',
            version: '1.0.0',
            description: 'A KDE Plasma desktop experience simulation',
            preInstalledOn: ['default'],
            translations: {},
            commands: {
                kde: function(args) {
                    const wrapperName = 'kde';
                    const hasNt = args && args.includes('-nt');
                    const hasNw = args && args.includes('-nw');

                    // Extract the true workspace base URL to fix Blob environment pathing issues
                    let baseUrl = window.location.href.split('#')[0].split('?')[0];
                    baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);

                    const htmlContent = generateKdeHTML(baseUrl);
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
                kde: "what is this command?\nkde\n\nwhat is it used for?\nOpens a simulated KDE Plasma desktop environment."
            }
        };
    }

    function generateKdeHTML(baseUrl = '') {
        const baseTag = baseUrl ? `<base href="${baseUrl}">\r\n` : '';
        const baseScript = baseUrl ? `<script>window.KDE_BASE_URL = "${baseUrl}";</script>\r\n` : '';

        let html = '<!DOCTYPE html>\r\n' +
'<html lang="en">\r\n' +
'<head>\r\n' +
'    <meta charset="UTF-8">\r\n' +
'    ' + baseTag +
'    ' + baseScript +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\r\n' +
'    <title>KDE Plasma Desktop Experience</title>\r\n' +
'    \r\n' +
'    <script src="../../colors/colorsKde.js"></script>\r\n' +
'\r\n' +
'    <script src="https://cdn.tailwindcss.com"></script>\r\n' +
'    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\r\n' +
'\r\n' +
'    <script>\r\n' +
'        const defaultKdeColors = {\r\n' +
'            \'kde-bg\': \'#1a1b1e\', \r\n' +
'            \'kde-panel\': \'rgba(35, 38, 41, 0.85)\', \r\n' +
'            \'kde-panel-hover\': \'rgba(255, 255, 255, 0.1)\',\r\n' +
'            \'kde-accent\': \'#3daee9\', \r\n' +
'            \'kde-text\': \'#eff0f1\',\r\n' +
'            \'kde-window-bg\': \'#31363b\',\r\n' +
'            \'kde-window-border\': \'#1d2023\',\r\n' +
'        };\r\n' +
'\r\n' +
'        tailwind.config = {\r\n' +
'            theme: {\r\n' +
'                extend: {\r\n' +
'                    colors: window.kdeThemeColors || defaultKdeColors,\r\n' +
'                    fontFamily: {\r\n' +
'                        sans: [\'Noto Sans\', \'Segoe UI\', \'Roboto\', \'Helvetica\', \'Arial\', \'sans-serif\'],\r\n' +
'                    }\r\n' +
'                }\r\n' +
'            }\r\n' +
'        }\r\n' +
'    </script>\r\n' +
'    \r\n' +
'    <style>\r\n' +
'        body {\r\n' +
'            overflow: hidden;\r\n' +
'            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);\r\n' +
'            background-size: cover;\r\n' +
'            background-position: center;\r\n' +
'        }\r\n' +
'\r\n' +
'        .glass-effect {\r\n' +
'            backdrop-filter: blur(12px);\r\n' +
'            -webkit-backdrop-filter: blur(12px);\r\n' +
'        }\r\n' +
'\r\n' +
'        .desktop-icon {\r\n' +
'            transition: background-color 0.15s ease;\r\n' +
'        }\r\n' +
'        .desktop-icon:hover {\r\n' +
'            background-color: rgba(255, 255, 255, 0.15);\r\n' +
'            border-radius: 0.5rem;\r\n' +
'        }\r\n' +
'        \r\n' +
'        #app-launcher {\r\n' +
'            transition: opacity 0.2s ease, transform 0.2s ease;\r\n' +
'            transform-origin: bottom left;\r\n' +
'        }\r\n' +
'        #app-launcher.hidden {\r\n' +
'            opacity: 0;\r\n' +
'            transform: scale(0.95);\r\n' +
'            pointer-events: none;\r\n' +
'        }\r\n' +
'        #app-launcher.visible {\r\n' +
'            opacity: 1;\r\n' +
'            transform: scale(1);\r\n' +
'            pointer-events: auto;\r\n' +
'        }\r\n' +
'\r\n' +
'        .window {\r\n' +
'            box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px var(--tw-colors-kde-window-border);\r\n' +
'            transition: transform 0.1s ease, box-shadow 0.1s ease;\r\n' +
'        }\r\n' +
'        .window.minimized {\r\n' +
'            display: none !important;\r\n' +
'        }\r\n' +
'        .window.maximized {\r\n' +
'            top: 0 !important;\r\n' +
'            left: 0 !important;\r\n' +
'            width: 100vw !important;\r\n' +
'            height: calc(100vh - 48px) !important;\r\n' +
'            border-radius: 0 !important;\r\n' +
'        }\r\n' +
'        .window-header {\r\n' +
'            cursor: move;\r\n' +
'        }\r\n' +
'    </style>\r\n' +
'</head>\r\n' +
'<body class="text-kde-text h-screen w-screen relative select-none font-sans">\r\n';

        html += '\r\n' +
'    <div id="desktop-area" class="w-full h-[calc(100vh-48px)] absolute top-0 left-0 p-4 flex flex-col flex-wrap items-start gap-2 z-0">\r\n' +
'    </div>\r\n' +
'\r\n' +
'    <div id="windows-container" class="absolute top-0 left-0 w-full h-[calc(100vh-48px)] pointer-events-none z-10">\r\n' +
'    </div>\r\n' +
'\r\n' +
'    <div id="app-launcher" class="hidden absolute bottom-12 left-0 mb-1 ml-2 w-96 h-[32rem] bg-kde-panel glass-effect border border-gray-600/50 rounded-lg shadow-2xl z-50 flex flex-col text-sm text-gray-200">\r\n' +
'        <div class="p-3 border-b border-gray-600/50">\r\n' +
'            <div class="bg-gray-800/80 rounded-full px-3 py-1.5 flex items-center border border-gray-600/30 focus-within:border-kde-accent focus-within:ring-1 focus-within:ring-kde-accent transition-all">\r\n' +
'                <i class="fa-solid fa-magnifying-glass text-gray-400 mr-2"></i>\r\n' +
'                <input type="text" id="app-search-input" placeholder="Search apps..." class="bg-transparent border-none outline-none w-full text-sm placeholder-gray-400" oninput="filterApps(this.value)">\r\n' +
'            </div>\r\n' +
'        </div>\r\n' +
'        \r\n' +
'        <div class="flex flex-1 overflow-hidden">\r\n' +
'            <div class="w-1/3 border-r border-gray-600/50 flex flex-col">\r\n' +
'                <button class="text-left px-4 py-2 hover:bg-white/10 bg-white/5 border-l-2 border-kde-accent"><i class="fa-solid fa-desktop w-6 text-gray-400"></i> Applications</button>\r\n' +
'                <button onclick="window.location.href=\'../../index.html\'" class="text-left px-4 py-2 hover:bg-white/10 mt-auto"><i class="fa-solid fa-power-off w-6 text-red-400"></i> Leave</button>\r\n' +
'            </div>\r\n' +
'            \r\n' +
'            <div class="w-2/3 p-2 overflow-y-auto flex flex-col gap-1" id="apps-container">\r\n' +
'                <div class="p-4 text-center text-gray-500 italic mt-10" id="no-apps-message">\r\n' +
'                    Loading applications...\r\n' +
'                </div>\r\n' +
'            </div>\r\n' +
'        </div>\r\n' +
'        \r\n' +
'        <div class="p-3 border-t border-gray-600/50 flex justify-between items-center bg-gray-900/30 rounded-b-lg">\r\n' +
'            <div class="flex items-center gap-2">\r\n' +
'                <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center border border-gray-500">\r\n' +
'                    <i class="fa-solid fa-user text-gray-300"></i>\r\n' +
'                </div>\r\n' +
'                <span class="font-semibold text-sm">Plasma User</span>\r\n' +
'            </div>\r\n' +
'            <div class="flex gap-2 text-gray-400">\r\n' +
'                <button class="hover:text-white p-1"><i class="fa-solid fa-lock"></i></button>\r\n' +
'                <button class="hover:text-red-400 p-1" onclick="window.location.href=\'../../index.html\'"><i class="fa-solid fa-power-off"></i></button>\r\n' +
'            </div>\r\n' +
'        </div>\r\n' +
'    </div>\r\n' +
'\r\n' +
'    <div id="panel" class="absolute bottom-0 left-0 w-full h-12 bg-kde-panel glass-effect border-t border-white/5 flex items-center px-1 z-50">\r\n' +
'        \r\n' +
'        <button id="launcher-btn" class="h-10 w-10 mx-1 flex items-center justify-center rounded hover:bg-kde-panel-hover transition-colors" onclick="toggleLauncher(event)">\r\n' +
'            <svg class="w-6 h-6 text-kde-accent drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">\r\n' +
'                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />\r\n' +
'            </svg>\r\n' +
'        </button>\r\n' +
'\r\n' +
'        <div id="task-manager" class="flex-1 h-full flex items-center px-2 gap-1 overflow-x-hidden">\r\n' +
'        </div>\r\n' +
'\r\n' +
'        <div class="flex items-center h-full px-2 gap-3 text-sm text-gray-300">\r\n' +
'            <div class="cursor-pointer hover:text-white px-1 relative group">\r\n' +
'                <i class="fa-solid fa-volume-high"></i>\r\n' +
'            </div>\r\n' +
'\r\n' +
'            <div id="clock" class="font-semibold text-center cursor-pointer hover:bg-kde-panel-hover px-2 py-1 rounded select-none flex flex-col justify-center leading-tight">\r\n' +
'                <span id="time" class="text-[13px]">00:00 AM</span>\r\n' +
'                <span id="date" class="text-[10px] text-gray-400">Date</span>\r\n' +
'            </div>\r\n' +
'        </div>\r\n' +
'    </div>\r\n';

        html += '    <script>\r\n' +
'        function updateClock() {\r\n' +
'            const now = new Date();\r\n' +
'            let hours = now.getHours();\r\n' +
'            let minutes = now.getMinutes();\r\n' +
'            const ampm = hours >= 12 ? \'PM\' : \'AM\';\r\n' +
'            \r\n' +
'            hours = hours % 12;\r\n' +
'            hours = hours ? hours : 12;\r\n' +
'            minutes = minutes < 10 ? \'0\' + minutes : minutes;\r\n' +
'            \r\n' +
'            const timeString = hours + \':\' + minutes + \' \' + ampm;\r\n' +
'            const options = { weekday: \'short\', month: \'short\', day: \'numeric\' };\r\n' +
'            const dateString = now.toLocaleDateString(undefined, options);\r\n' +
'\r\n' +
'            document.getElementById(\'time\').textContent = timeString;\r\n' +
'            document.getElementById(\'date\').textContent = dateString;\r\n' +
'        }\r\n' +
'\r\n' +
'        setInterval(updateClock, 1000);\r\n' +
'        updateClock();\r\n' +
'\r\n' +
'        const launcher = document.getElementById(\'app-launcher\');\r\n' +
'        const launcherBtn = document.getElementById(\'launcher-btn\');\r\n' +
'        let availableApps = [];\r\n' +
'\r\n' +
'        function toggleLauncher(e) {\r\n' +
'            if(e) e.stopPropagation();\r\n' +
'            if (launcher.classList.contains(\'hidden\')) {\r\n' +
'                launcher.classList.remove(\'hidden\');\r\n' +
'                setTimeout(() => launcher.classList.add(\'visible\'), 10);\r\n' +
'            } else {\r\n' +
'                launcher.classList.remove(\'visible\');\r\n' +
'                setTimeout(() => launcher.classList.add(\'hidden\'), 200);\r\n' +
'            }\r\n' +
'        }\r\n' +
'\r\n' +
'        document.addEventListener(\'click\', (event) => {\r\n' +
'            if (launcher.classList.contains(\'visible\') && \r\n' +
'                !launcher.contains(event.target) && \r\n' +
'                !launcherBtn.contains(event.target)) {\r\n' +
'                toggleLauncher();\r\n' +
'            }\r\n' +
'        });\r\n' +
'\r\n' +
'        function formatAppName(name) {\r\n' +
'            if (!name) return \'\';\r\n' +
'            return name\r\n' +
'                .replace(/([a-z])([A-Z])/g, \'$1 $2\')\r\n' +
'                .replace(/[-_]/g, \' \')\r\n' +
'                .replace(/^./, str => str.toUpperCase());\r\n' +
'        }\r\n' +
'\r\n' +
'        document.addEventListener(\'DOMContentLoaded\', () => {\r\n' +
'            const appsContainer = document.getElementById(\'apps-container\');\r\n' +
'            const noAppsMessage = document.getElementById(\'no-apps-message\');\r\n' +
'            \r\n' +
'            // Strictly default to fireFox if registry parsing fails\r\n' +
'            const fallbackRegistry = {\r\n' +
'                "apps": [\r\n' +
'                    "fireFox"\r\n' +
'                ]\r\n' +
'            };\r\n' +
'\r\n' +
'            const possiblePaths = [\r\n' +
'                \'../../registry.json\',\r\n' +
'                \'../registry.json\',\r\n' +
'                \'./registry.json\',\r\n' +
'                \'/registry.json\'\r\n' +
'            ];\r\n' +
'\r\n' +
'            async function loadRegistry() {\r\n' +
'                for (const path of possiblePaths) {\r\n' +
'                    try {\r\n' +
'                        const response = await fetch(path);\r\n' +
'                        if (response.ok) {\r\n' +
'                            const data = await response.json();\r\n' +
'                            if (data && Array.isArray(data.apps)) {\r\n' +
'                                // Strictly filter ONLY apps. Ignore "wrapper" entirely.\r\n' +
'                                return { apps: data.apps };\r\n' +
'                            }\r\n' +
'                        }\r\n' +
'                    } catch (err) {}\r\n' +
'                }\r\n' +
'                return fallbackRegistry;\r\n' +
'            }\r\n' +
'\r\n' +
'            loadRegistry().then(registry => {\r\n' +
'                availableApps = registry.apps || [];\r\n' +
'                renderAppList(availableApps);\r\n' +
'            });\r\n' +
'        });\r\n' +
'\r\n' +
'        function renderAppList(apps) {\r\n' +
'            const appsContainer = document.getElementById(\'apps-container\');\r\n' +
'            const noAppsMessage = document.getElementById(\'no-apps-message\');\r\n' +
'            \r\n' +
'            const existingItems = appsContainer.querySelectorAll(\'button:not(#no-apps-message)\');\r\n' +
'            existingItems.forEach(item => item.remove());\r\n' +
'\r\n' +
'            if (apps && apps.length > 0) {\r\n' +
'                if (noAppsMessage) noAppsMessage.style.display = \'none\';\r\n' +
'                \r\n' +
'                apps.forEach(app => {\r\n' +
'                    const btn = document.createElement(\'button\');\r\n' +
'                    btn.className = \'text-left px-3 py-2 rounded hover:bg-white/10 flex items-center gap-3 transition-colors\';\r\n' +
'                    btn.innerHTML = `\r\n' +
'                        <div class="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-kde-accent shadow-inner">\r\n' +
'                            <i class="fa-solid fa-window-maximize text-xs"></i>\r\n' +
'                        </div>\r\n' +
'                        <span class="capitalize text-sm font-medium">${formatAppName(app)}</span>\r\n' +
'                    `;\r\n' +
'                    btn.onclick = () => {\r\n' +
'                        launchApp(app);\r\n' +
'                        toggleLauncher();\r\n' +
'                    };\r\n' +
'                    appsContainer.appendChild(btn);\r\n' +
'                });\r\n' +
'            } else {\r\n' +
'                if (noAppsMessage) {\r\n' +
'                    noAppsMessage.style.display = \'block\';\r\n' +
'                    noAppsMessage.textContent = \'No applications found\';\r\n' +
'                }\r\n' +
'            }\r\n' +
'        }\r\n' +
'\r\n' +
'        function filterApps(query) {\r\n' +
'            const filtered = availableApps.filter(app => \r\n' +
'                formatAppName(app).toLowerCase().includes(query.toLowerCase())\r\n' +
'            );\r\n' +
'            renderAppList(filtered);\r\n' +
'        }\r\n';

        html += '        const windows = {};\r\n' +
'        const zIndexBase = 100;\r\n' +
'        let currentZIndex = zIndexBase;\r\n' +
'\r\n' +
'        async function resolveAppJsUrl(appName) {\r\n' +
'            const exact = `${appName}.js`;\r\n' +
'            const lower = `${appName.toLowerCase()}.js`;\r\n' +
'            \r\n' +
'            const paths = [\r\n' +
'                exact,\r\n' +
'                lower,\r\n' +
'                `./${exact}`,\r\n' +
'                `./${lower}`,\r\n' +
'                `../../packages/apps/${exact}`,\r\n' +
'                `../../packages/apps/${lower}`,\r\n' +
'                `../apps/${exact}`,\r\n' +
'                `../apps/${lower}`\r\n' +
'            ];\r\n' +
'            \r\n' +
'            for (const path of paths) {\r\n' +
'                try {\r\n' +
'                    const res = await fetch(path, { method: \'HEAD\' });\r\n' +
'                    if (res.ok) return path;\r\n' +
'                } catch(e) {}\r\n' +
'            }\r\n' +
'            \r\n' +
'            // Fallback that specifically allows fireFox mapping to firefox.js\r\n' +
'            return lower;\r\n' +
'        }\r\n' +
'\r\n' +
'        async function launchApp(appName) {\r\n' +
'            const winId = `window-${appName}`;\r\n' +
'            \r\n' +
'            if (windows[winId]) {\r\n' +
'                if (windows[winId].isMinimized) {\r\n' +
'                    openWindow(appName);\r\n' +
'                } else {\r\n' +
'                    bringToFront(winId);\r\n' +
'                }\r\n' +
'                return;\r\n' +
'            }\r\n' +
'\r\n' +
'            const winDiv = document.createElement(\'div\');\r\n' +
'            winDiv.id = winId;\r\n' +
'            winDiv.className = \'window absolute bg-kde-window-bg border border-kde-window-border rounded-lg shadow-2xl flex flex-col overflow-hidden transition-transform duration-100 ease-out pointer-events-auto\';\r\n' +
'            \r\n' +
'            const offset = (Object.keys(windows).length * 30) + 50;\r\n' +
'            winDiv.style.width = \'800px\';\r\n' +
'            winDiv.style.height = \'540px\';\r\n' +
'            winDiv.style.top = `${offset}px`;\r\n' +
'            winDiv.style.left = `${offset}px`;\r\n' +
'            \r\n' +
'            winDiv.innerHTML = `\r\n' +
'                <div class="window-header h-9 bg-gray-800 flex justify-between items-center select-none group border-b border-gray-900">\r\n' +
'                    <div class="flex items-center gap-2 px-3 text-gray-300">\r\n' +
'                        <i class="fa-solid fa-window-maximize text-kde-accent text-xs"></i>\r\n' +
'                        <span class="capitalize font-semibold text-sm tracking-wide drop-shadow-md">${formatAppName(appName)}</span>\r\n' +
'                    </div>\r\n' +
'                    <div class="flex h-full">\r\n' +
'                        <button onclick="minimizeWindow(\'${winId}\')" class="w-12 hover:bg-gray-600 flex items-center justify-center transition-colors text-gray-400 hover:text-white" title="Minimize"><i class="fa-solid fa-minus text-xs"></i></button>\r\n' +
'                        <button onclick="maximizeWindow(\'${winId}\')" class="w-12 hover:bg-gray-600 flex items-center justify-center transition-colors text-gray-400 hover:text-white" title="Maximize"><i class="fa-regular fa-square text-xs max-icon"></i></button>\r\n' +
'                        <button onclick="closeApp(\'${winId}\')" class="w-12 hover:bg-red-600 flex items-center justify-center transition-colors text-gray-400 hover:text-white" title="Close"><i class="fa-solid fa-xmark text-sm"></i></button>\r\n' +
'                    </div>\r\n' +
'                </div>\r\n' +
'                <div class="flex-1 relative bg-kde-window-bg">\r\n' +
'                    <div class="iframe-glass absolute inset-0 z-10 hidden"></div>\r\n' +
'                    <iframe id="iframe-${winId}" class="w-full h-full border-none bg-kde-window-bg block"></iframe>\r\n' +
'                </div>\r\n' +
'            `;\r\n' +
'            \r\n' +
'            document.getElementById(\'windows-container\').appendChild(winDiv);\r\n' +
'            \r\n' +
'            const jsUrl = await resolveAppJsUrl(appName);\r\n' +
'            const iframe = winDiv.querySelector(\'iframe\');\r\n' +
'            \r\n' +
'            // Construct iframe injecting base URL to fix inner script resolution\r\n' +
'            const iframeContent = `<!DOCTYPE html>\r\n' +
'            <html lang="en" class="h-full">\r\n' +
'            <head>\r\n' +
'                <meta charset="UTF-8">\r\n' +
'                ${window.KDE_BASE_URL ? `<base href="${window.KDE_BASE_URL}">` : \'\'}\r\n' +
'                <script src="../../colors/colorsKde.js"><\\/script>\r\n' +
'                <script src="https://cdn.tailwindcss.com"><\\/script>\r\n' +
'                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\r\n' +
'                <style>\r\n' +
'                    body { background-color: #31363b; color: #eff0f1; margin: 0; font-family: \\\'Noto Sans\\\', sans-serif; overflow: hidden; height: 100vh; display: flex; flex-direction: column; }\r\n' +
'                    /* Hybrid UI Tokens for hosted apps */\r\n' +
'                    #app { display: flex; flex-direction: column; height: 100vh; width: 100vw; box-sizing: border-box; }\r\n' +
'                    #menubar { display: flex; background: rgba(35, 38, 41, 0.95); border-bottom: 1px solid #1d2023; padding: 2px 6px; font-size: 12px; gap: 4px; user-select: none; }\r\n' +
'                    .menu-btn { background: transparent; border: none; color: #eff0f1; padding: 4px 8px; border-radius: 3px; cursor: pointer; }\r\n' +
'                    .menu-btn:hover { background: rgba(255,255,255,0.1); }\r\n' +
'                    .menu-dropdown { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; background: #31363b; border: 1px solid #1d2023; border-radius: 4px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 100; min-width: 140px; padding: 4px; }\r\n' +
'                    .group:hover .menu-dropdown { display: flex; }\r\n' +
'                    .dropdown-item { background: transparent; border: none; color: #eff0f1; padding: 6px 10px; text-align: left; border-radius: 3px; cursor: pointer; font-size: 12px; display: flex; align-items: center; }\r\n' +
'                    .dropdown-item:hover { background: #3daee9; color: #000; }\r\n' +
'                </style>\r\n' +
'            </head>\r\n' +
'            <body>\r\n' +
'                <script src="${jsUrl}"><\\/script>\r\n' +
'            </body>\r\n' +
'            </html>`;\r\n' +
'\r\n' +
'            iframe.srcdoc = iframeContent;\r\n' +
'\r\n' +
'            windows[winId] = {\r\n' +
'                element: winDiv,\r\n' +
'                isOpen: true,\r\n' +
'                isMinimized: false,\r\n' +
'                isMaximized: false,\r\n' +
'                appName: appName,\r\n' +
'                iconClass: \'fa-window-maximize\',\r\n' +
'                iconColor: \'text-kde-accent\',\r\n' +
'                title: formatAppName(appName)\r\n' +
'            };\r\n' +
'\r\n' +
'            makeDraggable(winDiv);\r\n' +
'            winDiv.addEventListener(\'mousedown\', () => bringToFront(winId));\r\n' +
'            \r\n' +
'            createTaskbarItem(winId);\r\n' +
'            bringToFront(winId);\r\n' +
'        }\r\n' +
'\r\n' +
'        function openWindow(appName) {\r\n' +
'            const winId = `window-${appName}`;\r\n' +
'            if (!windows[winId]) return; \r\n' +
'\r\n' +
'            windows[winId].element.classList.remove(\'minimized\');\r\n' +
'            windows[winId].isMinimized = false;\r\n' +
'            updateTaskbarItemState(winId);\r\n' +
'            bringToFront(winId);\r\n' +
'        }\r\n' +
'\r\n' +
'        function closeApp(winId) {\r\n' +
'            if (windows[winId]) {\r\n' +
'                windows[winId].element.remove();\r\n' +
'                delete windows[winId];\r\n' +
'                removeTaskbarItem(winId);\r\n' +
'            }\r\n' +
'        }\r\n' +
'\r\n' +
'        function minimizeWindow(winId) {\r\n' +
'            if (windows[winId]) {\r\n' +
'                windows[winId].element.classList.add(\'minimized\');\r\n' +
'                windows[winId].isMinimized = true;\r\n' +
'                updateTaskbarItemState(winId);\r\n' +
'            }\r\n' +
'        }\r\n' +
'\r\n' +
'        function maximizeWindow(winId) {\r\n' +
'             if (windows[winId]) {\r\n' +
'                const win = windows[winId].element;\r\n' +
'                const icon = win.querySelector(\'.max-icon\');\r\n' +
'                if(windows[winId].isMaximized) {\r\n' +
'                    win.classList.remove(\'maximized\');\r\n' +
'                    windows[winId].isMaximized = false;\r\n' +
'                    if(icon) { icon.classList.remove(\'fa-clone\'); icon.classList.add(\'fa-square\'); }\r\n' +
'                } else {\r\n' +
'                    win.classList.add(\'maximized\');\r\n' +
'                    windows[winId].isMaximized = true;\r\n' +
'                    if(icon) { icon.classList.remove(\'fa-square\'); icon.classList.add(\'fa-clone\'); }\r\n' +
'                }\r\n' +
'                bringToFront(winId);\r\n' +
'            }\r\n' +
'        }\r\n' +
'\r\n' +
'        function bringToFront(winId) {\r\n' +
'            if (windows[winId]) {\r\n' +
'                currentZIndex++;\r\n' +
'                windows[winId].element.style.zIndex = currentZIndex;\r\n' +
'                updateTaskbarItemState(winId); \r\n' +
'            }\r\n' +
'        }\r\n';

        html += '\r\n' +
'        const taskManager = document.getElementById(\'task-manager\');\r\n' +
'\r\n' +
'        function createTaskbarItem(winId) {\r\n' +
'            const winInfo = windows[winId];\r\n' +
'            const taskBtn = document.createElement(\'button\');\r\n' +
'            taskBtn.id = `task-${winId}`;\r\n' +
'            taskBtn.className = `h-10 px-3 flex items-center gap-2 rounded transition-colors max-w-[150px] overflow-hidden whitespace-nowrap border-b-2`;\r\n' +
'            taskBtn.innerHTML = `\r\n' +
'                <i class="fa-solid ${winInfo.iconClass} ${winInfo.iconColor}"></i>\r\n' +
'                <span class="text-sm truncate">${winInfo.title}</span>\r\n' +
'            `;\r\n' +
'            \r\n' +
'            taskBtn.onclick = () => {\r\n' +
'                if (winInfo.isMinimized) {\r\n' +
'                    openWindow(winInfo.appName);\r\n' +
'                } else if (winInfo.element.style.zIndex == currentZIndex) {\r\n' +
'                    minimizeWindow(winId);\r\n' +
'                } else {\r\n' +
'                    bringToFront(winId);\r\n' +
'                }\r\n' +
'            };\r\n' +
'            \r\n' +
'            taskManager.appendChild(taskBtn);\r\n' +
'            updateTaskbarItemState(winId);\r\n' +
'        }\r\n' +
'\r\n' +
'        function removeTaskbarItem(winId) {\r\n' +
'            const taskBtn = document.getElementById(`task-${winId}`);\r\n' +
'            if (taskBtn) taskBtn.remove();\r\n' +
'        }\r\n' +
'\r\n' +
'        function updateTaskbarItemState(winId) {\r\n' +
'            Object.keys(windows).forEach(id => {\r\n' +
'                const btn = document.getElementById(`task-${id}`);\r\n' +
'                if (btn) {\r\n' +
'                    btn.className = `h-10 px-3 flex items-center gap-2 rounded transition-colors max-w-[150px] overflow-hidden whitespace-nowrap border-b-2 border-transparent hover:bg-kde-panel-hover text-gray-300 pointer-events-auto`;\r\n' +
'                    \r\n' +
'                    if (id === winId) {\r\n' +
'                        if (windows[id].isMinimized) {\r\n' +
'                            btn.classList.add(\'opacity-50\');\r\n' +
'                        } else if (windows[id].element.style.zIndex == currentZIndex) {\r\n' +
'                            btn.classList.remove(\'border-transparent\', \'hover:bg-kde-panel-hover\', \'text-gray-300\');\r\n' +
'                            btn.classList.add(\'bg-white/10\', \'border-kde-accent\', \'text-white\');\r\n' +
'                        }\r\n' +
'                    }\r\n' +
'                }\r\n' +
'            });\r\n' +
'        }\r\n' +
'\r\n' +
'        function makeDraggable(element) {\r\n' +
'            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;\r\n' +
'            const header = element.querySelector(\'.window-header\');\r\n' +
'            \r\n' +
'            if (header) {\r\n' +
'                header.onmousedown = dragMouseDown;\r\n' +
'            } else {\r\n' +
'                element.onmousedown = dragMouseDown;\r\n' +
'            }\r\n' +
'\r\n' +
'            function dragMouseDown(e) {\r\n' +
'                if(e.target.tagName === \'BUTTON\' || e.target.closest(\'button\')) return;\r\n' +
'                const winId = element.id;\r\n' +
'                if(windows[winId] && windows[winId].isMaximized) return;\r\n' +
'\r\n' +
'                e = e || window.event;\r\n' +
'                e.preventDefault();\r\n' +
'                pos3 = e.clientX;\r\n' +
'                pos4 = e.clientY;\r\n' +
'                document.onmouseup = closeDragElement;\r\n' +
'                document.onmousemove = elementDrag;\r\n' +
'                \r\n' +
'                const glass = element.querySelector(\'.iframe-glass\');\r\n' +
'                if(glass) glass.classList.remove(\'hidden\');\r\n' +
'                \r\n' +
'                bringToFront(element.id);\r\n' +
'            }\r\n' +
'\r\n' +
'            function elementDrag(e) {\r\n' +
'                e = e || window.event;\r\n' +
'                e.preventDefault();\r\n' +
'                pos1 = pos3 - e.clientX;\r\n' +
'                pos2 = pos4 - e.clientY;\r\n' +
'                pos3 = e.clientX;\r\n' +
'                pos4 = e.clientY;\r\n' +
'                \r\n' +
'                let newTop = element.offsetTop - pos2;\r\n' +
'                let newLeft = element.offsetLeft - pos1;\r\n' +
'                \r\n' +
'                if(newTop < 0) newTop = 0;\r\n' +
'                const panelHeight = document.getElementById(\'panel\').offsetHeight;\r\n' +
'                if(newTop > window.innerHeight - panelHeight - 30) newTop = window.innerHeight - panelHeight - 30;\r\n' +
'\r\n' +
'                element.style.top = newTop + "px";\r\n' +
'                element.style.left = newLeft + "px";\r\n' +
'            }\r\n' +
'\r\n' +
'            function closeDragElement() {\r\n' +
'                document.onmouseup = null;\r\n' +
'                document.onmousemove = null;\r\n' +
'                \r\n' +
'                const glass = element.querySelector(\'.iframe-glass\');\r\n' +
'                if(glass) glass.classList.add(\'hidden\');\r\n' +
'            }\r\n' +
'        }\r\n' +
'    </script>\r\n' +
'</body>\r\n' +
'</html>';

        return html;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            generateKdeHTML,
            package: {
                name: 'kde',
                version: '1.0.0',
                description: 'A KDE Plasma desktop experience simulation'
            }
        };
    }
})();