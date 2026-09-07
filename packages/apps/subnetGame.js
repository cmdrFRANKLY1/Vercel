const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subnet Master: Host Identification Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            /* Fallback KDE Plasma inspired colors if parent env variables are missing */
            --kde-bg: #1a1b1e;
            --kde-panel: #232629;
            --kde-accent: #3daee9;
            --kde-text: #eff0f1;
            --kde-window-bg: #31363b;
            --kde-window-border: #1d2023;
            
            --success-color: #27ae60;
            --error-color: #e74c3c;
            --warning-color: #f39c12;
            --network-color: #9b59b6; /* Color to visually represent network bits */
            --host-color: #3498db;    /* Color to visually represent host bits */
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            /* Prevent selection globally for app-like feel, but override for inputs below */
            user-select: none;
            -webkit-user-select: none;
        }

        /* FIX: Allow selection and interactions on standard form elements */
        input, textarea, select, button, .selectable-text {
            user-select: text !important;
            -webkit-user-select: text !important;
            /* Ensure pointer events are active */
            pointer-events: auto !important; 
        }

        /* Specifically for range inputs to ensure dragability */
        input[type="range"] {
            cursor: pointer;
        }

        body, html {
            height: 100vh;
            width: 100vw;
            background-color: var(--kde-bg);
            color: var(--kde-text);
            font-family: 'Inter', 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            font-size: 14px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .code-font {
            font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
        }
 
        #app-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: var(--kde-window-bg);
            position: relative;
        }

        #toolbar {
            height: 48px;
            background-color: var(--kde-panel);
            border-bottom: 1px solid var(--kde-window-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            flex-shrink: 0;
        }

        .tool-btn {
            background: transparent;
            border: 1px solid transparent;
            color: var(--kde-text);
            border-radius: 4px;
            padding: 6px 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 13px;
        }

        .tool-btn:hover {
            background-color: rgba(61, 174, 233, 0.15);
            color: var(--kde-accent);
        }

        #workspace {
            display: flex;
            flex-grow: 1;
            overflow-y: auto;
            justify-content: center;
            align-items: flex-start;
            padding: 2rem;
            background-color: var(--kde-window-bg);
        }

        .game-panel {
            width: 100%;
            max-width: 600px;
            background-color: var(--kde-panel);
            border: 1px solid var(--kde-window-border);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake-animation {
            animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes popIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .pop-in {
            animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        input[type="number"] {
            -moz-appearance: textfield;
            background-color: var(--kde-bg);
            border: 2px solid var(--kde-window-border);
            color: var(--kde-text);
            outline: none;
            transition: border-color 0.2s;
        }
        input[type="number"]:focus {
            border-color: var(--kde-accent);
        }
        input[type="number"]::-webkit-inner-spin-button, 
        input[type="number"]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }

        .primary-btn {
            background-color: var(--kde-accent);
            color: #fff;
            border: none;
            transition: filter 0.2s;
        }
        .primary-btn:hover {
            filter: brightness(1.1);
        }
        .primary-btn:active {
            transform: scale(0.98);
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--kde-bg); }
        ::-webkit-scrollbar-thumb { background: var(--kde-window-border); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--kde-accent); }

        #status-bar {
            height: 24px;
            background-color: var(--kde-panel);
            border-top: 1px solid var(--kde-window-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            font-size: 11px;
            color: #888;
            flex-shrink: 0;
        }

        .modal-overlay {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
        }
        .modal-content {
            background-color: var(--kde-window-bg);
            border: 1px solid var(--kde-window-border);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .bit-box {
            width: 12px;
            height: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid var(--kde-window-border);
            margin: 1px;
            transition: all 0.3s ease;
            position: relative;
            /* Make sure bits don't block interactions if ever needed */
            pointer-events: none; 
        }
        .bit-box.network {
            background-color: rgba(155, 89, 182, 0.2);
            border-color: var(--network-color);
            color: #e0b0ff;
        }
        .bit-box.host {
            background-color: rgba(52, 152, 219, 0.2);
            border-color: var(--host-color);
            color: #add8e6;
        }
        .octet-divider {
            display: inline-block;
            width: 4px;
            height: 24px;
            background-color: var(--kde-window-border);
            margin: 0 4px;
            vertical-align: top;
            margin-top: 1px;
        }
    </style>
</head>
<body>
    <div id="app-container">
        
        <div id="toolbar">
            <div class="flex items-center gap-2">
                <span class="font-bold tracking-wide text-[var(--kde-accent)] text-lg" data-i18n="title">Subnet Master</span>
            </div>
            <div class="flex items-center gap-2">
                <button id="langBtn" class="tool-btn font-bold tracking-wider" title="Toggle Language">🇩🇪 DE</button>
                <button id="helpBtn" class="tool-btn" title="How to calculate">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span data-i18n="cheatSheet">Help / Cheat Sheet</span>
                </button>
                <button id="resetBtn" class="tool-btn" title="Reset stats">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span data-i18n="reset">Reset</span>
                </button>
            </div>
        </div>

        <div id="workspace">
            <div class="game-panel pop-in" id="gameContainer">
                
                <div class="flex justify-between items-center p-4 border-b" style="border-color: var(--kde-window-border);">
                    <div class="flex flex-col">
                        <span class="text-xs uppercase tracking-wider font-semibold opacity-60" data-i18n="score">Score</span>
                        <span id="scoreDisplay" class="text-2xl font-bold code-font" style="color: var(--success-color);">0</span>
                    </div>
                    <div class="flex flex-col items-end">
                        <span class="text-xs uppercase tracking-wider font-semibold opacity-60" data-i18n="streak">Streak</span>
                        <span id="streakDisplay" class="text-2xl font-bold code-font" style="color: var(--warning-color);">0</span>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center p-8 space-y-8">
                    
                    <div class="text-center space-y-3 w-full">
                        <h2 class="text-sm font-medium opacity-80 uppercase tracking-wide" data-i18n="calcFor">Calculate Usable Hosts For:</h2>
                        <div class="py-6 rounded-lg shadow-inner w-full flex justify-center items-center border" style="background-color: var(--kde-bg); border-color: var(--kde-window-border);">
                            <span id="questionMask" class="text-6xl sm:text-7xl font-bold code-font text-white drop-shadow-md">
                                /24
                            </span>
                        </div>
                    </div>

                    <div class="w-full max-w-[280px] space-y-4">
                        <div class="relative">
                            <input type="number" id="answerInput" 
                                class="block w-full rounded-md px-4 py-3 text-center text-2xl font-semibold code-font shadow-inner" 
                                data-i18n-placeholder="placeholder"
                                placeholder="Enter answer..."
                                autocomplete="off">
                        </div>
                        <button id="submitBtn" data-i18n="submit"
                            class="primary-btn w-full rounded-md px-6 py-3 text-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all">
                            Submit
                        </button>
                    </div>
                </div>

                <div id="feedbackContainer" class="min-h-[80px] flex flex-col items-center justify-center p-4 border-t transition-all bg-black/20 rounded-b-lg" style="border-color: var(--kde-window-border);">
                    <p class="text-sm opacity-60 animate-pulse text-center" data-i18n="awaiting">Awaiting calculation...</p>
                </div>
            </div>
        </div>

        <div id="status-bar">
            <div>
                <span id="status-msg" data-i18n="ready">Ready</span>
            </div>
            <div>
                <span data-i18n="module">Module: SubnetHostCalc</span>
            </div>
        </div>

        <div id="helpModal" class="modal-overlay fixed inset-0 z-50 hidden items-center justify-center p-4 opacity-0 transition-opacity duration-200">
            <div class="modal-content rounded-lg p-0 max-w-3xl w-full relative flex flex-col max-h-[90vh]">
                
                <div class="flex justify-between items-center p-4 border-b" style="border-color: var(--kde-window-border); background-color: var(--kde-panel);">
                    <h3 class="text-xl font-bold" data-i18n="modalTitle">How to Calculate Hosts & Identify Networks</h3>
                    <button id="closeHelpBtn" class="text-gray-400 hover:text-white transition-colors p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-6 overflow-y-auto space-y-8 text-sm sm:text-base">
                    
                    <div class="p-4 rounded-md border" style="background-color: var(--kde-bg); border-color: var(--kde-window-border);">
                        <h4 class="font-bold text-lg mb-2 text-center" data-i18n="visualTitle">Visualizing the 32 Bits</h4>
                        <p class="opacity-80 text-center mb-4 text-sm" data-i18n="visualDesc">Adjust the slider to see how the subnet mask (/) divides the 32 bits of an IP address into <strong style="color: var(--network-color);">Network</strong> and <strong style="color: var(--host-color);">Host</strong> portions.</p>
                        
                        <div class="flex flex-col items-center space-y-4">
                            <div class="flex items-center gap-4 w-full max-w-md">
                                <span class="font-bold text-lg code-font w-16 text-right">/ <span id="visualSliderVal">24</span></span>
                                <!-- Ensure the slider is clickable -->
                                <input type="range" id="visualizerSlider" min="16" max="31" value="24" class="w-full cursor-pointer accent-[var(--kde-accent)]" style="pointer-events: auto;">
                            </div>

                            <div class="w-full flex justify-center items-center overflow-x-auto pb-2">
                                <div id="bitContainer" class="flex items-center whitespace-nowrap bg-black/30 p-2 rounded border border-[var(--kde-window-border)]">
                                    <!-- Bits will be injected here by JS -->
                                </div>
                            </div>

                            <div class="flex justify-between w-full max-w-md text-sm font-semibold opacity-90 mt-2">
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded" style="background-color: var(--network-color);"></div>
                                    <span data-i18n="networkBitsLabel">Network Bits (Masked)</span>: <span id="networkBitsCount">24</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded" style="background-color: var(--host-color);"></div>
                                    <span data-i18n="hostBitsLabel">Host Bits (Remaining)</span>: <span id="hostBitsCount">8</span>
                                </div>
                            </div>
                            <div class="text-center text-sm p-2 rounded bg-black/20 border border-[var(--kde-window-border)] mt-2">
                                <span data-i18n="usableHostsLabel">Usable Hosts (2<sup>Host Bits</sup> - 2): </span>
                                <strong class="text-[var(--kde-accent)] text-lg ml-1" id="visualUsableHosts">254</strong>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--kde-accent); color: white;">1</div>
                            <div>
                                <h4 class="font-bold mb-1" data-i18n="step1Title">Identify the Network Portion (The Mask)</h4>
                                <p class="opacity-80 mb-1" data-i18n="step1Desc1">The slash number (e.g., <strong>/24</strong>) tells you exactly how many of the 32 bits belong to the network.</p>
                                <p class="opacity-60 text-sm" data-i18n="step1Desc2">These bits are "locked" and identify the network itself. They cannot be assigned to devices.</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--kde-accent); color: white;">2</div>
                            <div>
                                <h4 class="font-bold mb-1" data-i18n="step2Title">Find the Remaining Host Bits</h4>
                                <p class="opacity-80 mb-2" data-i18n="step2Desc">Subtract the network bits from the total 32 bits to find out how many bits are left for your devices (hosts).</p>
                                <div class="font-mono px-3 py-1 rounded inline-block shadow-inner text-sm" style="background-color: var(--kde-bg); border: 1px solid var(--kde-window-border);" data-i18n="step2Math">
                                    32 bits total - 24 network bits = <strong>8</strong> host bits left
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--kde-accent); color: white;">3</div>
                            <div>
                                <h4 class="font-bold mb-1" data-i18n="step3Title">Calculate Total IPs (The Power of 2)</h4>
                                <p class="opacity-80 mb-2" data-i18n="step3Desc">Calculate 2 to the power of the remaining host bits (2<sup>8</sup>).</p>
                                <div class="font-mono px-3 py-1 rounded inline-block shadow-inner text-sm" style="background-color: var(--kde-bg); border: 1px solid var(--kde-window-border);" data-i18n="step3Math">
                                    2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>256</strong> total IPs
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--error-color); color: white;">4</div>
                            <div>
                                <h4 class="font-bold mb-1" style="color: var(--error-color);" data-i18n="step4Title">Subtract 2 (Network & Broadcast)</h4>
                                <p class="opacity-80 mb-2" data-i18n="step4Desc">You must subtract 2 from the total. The very first IP identifies the <strong>Network Address</strong>, and the last IP is the <strong>Broadcast Address</strong>.</p>
                                <div class="font-mono px-3 py-2 rounded inline-block shadow text-base font-bold" style="background-color: var(--kde-panel); border: 1px solid var(--success-color); color: var(--success-color);" data-i18n="step4Math">
                                    256 - 2 = 254 Usable Hosts
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 p-4 rounded-md border" style="background-color: var(--kde-bg); border-color: var(--kde-window-border);">
                        <h4 class="font-bold mb-3 text-center opacity-80 uppercase tracking-wider text-xs" data-i18n="quickRef">Quick Reference Cheat Sheet</h4>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm font-mono">
                            <div class="p-2 rounded border border-transparent bg-black/20">/30 = <span style="color: var(--success-color);">2</span></div>
                            <div class="p-2 rounded border border-transparent bg-black/20">/29 = <span style="color: var(--success-color);">6</span></div>
                            <div class="p-2 rounded border border-transparent bg-black/20">/28 = <span style="color: var(--success-color);">14</span></div>
                            <div class="p-2 rounded border border-transparent bg-black/20">/27 = <span style="color: var(--success-color);">30</span></div>
                            <div class="p-2 rounded border border-transparent bg-black/20">/26 = <span style="color: var(--success-color);">62</span></div>
                            <div class="p-2 rounded border border-transparent bg-black/20">/25 = <span style="color: var(--success-color);">126</span></div>
                            <div class="p-2 rounded shadow-sm" style="background-color: rgba(61, 174, 233, 0.1); border: 1px solid var(--kde-accent);">/24 = <span style="color: var(--success-color); font-weight: bold;">254</span></div>
                            <div class="p-2 rounded border border-transparent bg-black/20">/23 = <span style="color: var(--success-color);">510</span></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</body>
</html>
`;

document.open();
document.write(htmlContent);
document.close();

function initApp() {

    function applyTheme() {
        let themeColors = window.kdeThemeColors;
        
        if (!themeColors) {
            try {
                themeColors = window.parent && window.parent.kdeThemeColors;
            } catch (e) {
                console.warn("Cross-origin restriction prevented accessing parent theme colors.");
            }
        }

        if (themeColors) {
            const root = document.documentElement;
            if (themeColors['kde-bg']) root.style.setProperty('--kde-bg', themeColors['kde-bg']);
            if (themeColors['kde-panel']) root.style.setProperty('--kde-panel', themeColors['kde-panel']);
            if (themeColors['kde-accent']) root.style.setProperty('--kde-accent', themeColors['kde-accent']);
            if (themeColors['kde-text']) root.style.setProperty('--kde-text', themeColors['kde-text']);
            if (themeColors['kde-window-bg']) root.style.setProperty('--kde-window-bg', themeColors['kde-window-bg']);
            if (themeColors['kde-window-border']) root.style.setProperty('--kde-window-border', themeColors['kde-window-border']);
        }
    }
    applyTheme();

    const i18n = {
        en: {
            title: "Subnet Master",
            cheatSheet: "Help / Cheat Sheet",
            reset: "Reset",
            score: "Score",
            streak: "Streak",
            calcFor: "Calculate Usable Hosts For:",
            placeholder: "Enter answer...",
            submit: "Submit",
            awaiting: "Awaiting calculation...",
            ready: "Ready",
            module: "Module: SubnetHostCalc",
            modalTitle: "How to Calculate Hosts & Identify Networks",
            visualTitle: "Visualizing the 32 Bits",
            visualDesc: "Adjust the slider to see how the subnet mask (/) divides the 32 bits of an IP address into <strong style='color: var(--network-color);'>Network</strong> and <strong style='color: var(--host-color);'>Host</strong> portions.",
            networkBitsLabel: "Network Bits (Masked)",
            hostBitsLabel: "Host Bits (Remaining)",
            usableHostsLabel: "Usable Hosts (2<sup>Host Bits</sup> - 2): ",
            step1Title: "Identify the Network Portion (The Mask)",
            step1Desc1: "The slash number (e.g., <strong>/24</strong>) tells you exactly how many of the 32 bits belong to the network.",
            step1Desc2: "These bits are 'locked' and identify the network itself. They cannot be assigned to devices.",
            step2Title: "Find the Remaining Host Bits",
            step2Desc: "Subtract the network bits from the total 32 bits to find out how many bits are left for your devices (hosts).",
            step2Math: "32 bits total - 24 network bits = <strong>8</strong> host bits left",
            step3Title: "Calculate Total IPs (The Power of 2)",
            step3Desc: "Calculate 2 to the power of the remaining host bits (2<sup>8</sup>).",
            step3Math: "2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>256</strong> total IPs",
            step4Title: "Subtract 2 (Network & Broadcast)",
            step4Desc: "You must subtract 2 from the total. The very first IP identifies the <strong>Network Address</strong>, and the last IP is the <strong>Broadcast Address</strong>.",
            step4Math: "256 - 2 = 254 Usable Hosts",
            quickRef: "Quick Reference Cheat Sheet",
            waitInput: "Waiting for input...",
            enterNum: "Please enter a number.",
            invalidNum: "Invalid input. Numbers only.",
            correctInfo: "Answer correct!",
            incorrectInfo: "Answer incorrect.",
            viewCheat: "Viewing Help Modal",
            statsReset: "Stats Reset.",
            statsResetMsg: "Game stats have been reset.",
            correctMsg: (ips, hosts) => `Correct! ${ips} IPs - 2 = <strong>${hosts}</strong> usable hosts.`,
            incorrectMsg: (cidr, hosts, ans) => `Incorrect. /${cidr} has <strong>${hosts}</strong> usable hosts.<br><span class="opacity-70 text-xs mt-1 block">Your answer: ${ans}</span>`
        },
        de: {
            title: "Subnetz-Meister",
            cheatSheet: "Hilfe / Spickzettel",
            reset: "Neustart",
            score: "Punkte",
            streak: "Serie",
            calcFor: "Berechne nutzbare Hosts für:",
            placeholder: "Antwort eingeben...",
            submit: "Bestätigen",
            awaiting: "Warte auf Berechnung...",
            ready: "Bereit",
            module: "Modul: SubnetzHostRechner",
            modalTitle: "Hosts berechnen & Netzwerke identifizieren",
            visualTitle: "Visualisierung der 32 Bits",
            visualDesc: "Bewege den Regler, um zu sehen, wie die Subnetzmaske (/) die 32 Bits einer IP-Adresse in <strong style='color: var(--network-color);'>Netzwerk</strong>- und <strong style='color: var(--host-color);'>Host</strong>-Teile trennt.",
            networkBitsLabel: "Netzwerk-Bits (Maskiert)",
            hostBitsLabel: "Host-Bits (Verbleibend)",
            usableHostsLabel: "Nutzbare Hosts (2<sup>Host-Bits</sup> - 2): ",
            step1Title: "Netzwerk-Teil identifizieren (Die Maske)",
            step1Desc1: "Die Slash-Zahl (z.B. <strong>/24</strong>) sagt dir genau, wie viele der 32 Bits zum Netzwerk gehören.",
            step1Desc2: "Diese Bits sind 'gesperrt' und identifizieren das Netzwerk selbst. Sie können keinen Geräten zugewiesen werden.",
            step2Title: "Finde die verbleibenden Host-Bits",
            step2Desc: "Subtrahiere die Netzwerk-Bits von den gesamten 32 Bits, um herauszufinden, wie viele Bits für deine Geräte (Hosts) übrig sind.",
            step2Math: "32 Bits gesamt - 24 Netzwerk-Bits = <strong>8</strong> Host-Bits übrig",
            step3Title: "Berechne gesamte IPs (Zweierpotenz)",
            step3Desc: "Berechne 2 hoch die verbleibenden Host-Bits (2<sup>8</sup>).",
            step3Math: "2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>256</strong> gesamte IPs",
            step4Title: "2 Abziehen (Netzwerk & Broadcast)",
            step4Desc: "Du musst 2 von der Gesamtzahl abziehen. Die allererste IP identifiziert die <strong>Netzwerkadresse</strong>, und die letzte IP ist die <strong>Broadcast-Adresse</strong>.",
            step4Math: "256 - 2 = 254 Nutzbare Hosts",
            quickRef: "Schnellreferenz-Spickzettel",
            waitInput: "Warte auf Eingabe...",
            enterNum: "Bitte gib eine Zahl ein.",
            invalidNum: "Ungültige Eingabe. Nur Zahlen.",
            correctInfo: "Antwort richtig!",
            incorrectInfo: "Antwort falsch.",
            viewCheat: "Zeige Hilfefenster",
            statsReset: "Statistiken zurückgesetzt.",
            statsResetMsg: "Spielstatistiken wurden zurückgesetzt.",
            correctMsg: (ips, hosts) => `Richtig! ${ips} IPs - 2 = <strong>${hosts}</strong> nutzbare Hosts.`,
            incorrectMsg: (cidr, hosts, ans) => `Falsch. /${cidr} hat <strong>${hosts}</strong> nutzbare Hosts.<br><span class="opacity-70 text-xs mt-1 block">Deine Antwort: ${ans}</span>`
        }
    };

    const gameState = {
        score: 0,
        streak: 0,
        currentCidr: 0,
        correctAnswer: 0,
        isAnswering: true,
        language: 'en'
    };

    const commonCidrs = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    const els = {
        container: document.getElementById('gameContainer'),
        questionMask: document.getElementById('questionMask'),
        answerInput: document.getElementById('answerInput'),
        submitBtn: document.getElementById('submitBtn'),
        scoreDisplay: document.getElementById('scoreDisplay'),
        streakDisplay: document.getElementById('streakDisplay'),
        feedbackContainer: document.getElementById('feedbackContainer'),
        helpBtn: document.getElementById('helpBtn'),
        langBtn: document.getElementById('langBtn'),
        helpModal: document.getElementById('helpModal'),
        closeHelpBtn: document.getElementById('closeHelpBtn'),
        resetBtn: document.getElementById('resetBtn'),
        statusMsg: document.getElementById('status-msg'),
        
        visualizerSlider: document.getElementById('visualizerSlider'),
        visualSliderVal: document.getElementById('visualSliderVal'),
        bitContainer: document.getElementById('bitContainer'),
        networkBitsCount: document.getElementById('networkBitsCount'),
        hostBitsCount: document.getElementById('hostBitsCount'),
        visualUsableHosts: document.getElementById('visualUsableHosts')
    };

    function renderBits(cidr) {
        els.bitContainer.innerHTML = '';
        for (let i = 0; i < 32; i++) {
            const isNetwork = i < cidr;
            const bitSpan = document.createElement('span');
            bitSpan.className = `bit-box ${isNetwork ? 'network' : 'host'}`;
            bitSpan.textContent = isNetwork ? 'N' : 'H';
            bitSpan.title = isNetwork ? `Bit ${i+1}: Network` : `Bit ${i+1}: Host`;
            
            els.bitContainer.appendChild(bitSpan);

            // Add octet divider every 8 bits (except the last one)
            if ((i + 1) % 8 === 0 && i !== 31) {
                const divider = document.createElement('span');
                divider.className = 'octet-divider';
                els.bitContainer.appendChild(divider);
            }
        }
    }

    function updateVisualizer(cidr) {
        els.visualSliderVal.textContent = cidr;
        els.networkBitsCount.textContent = cidr;
        
        const hostBits = 32 - cidr;
        els.hostBitsCount.textContent = hostBits;
        
        const usable = calculateUsableHosts(cidr);
        els.visualUsableHosts.textContent = usable.toLocaleString();
        
        renderBits(cidr);
    }

    function updateLanguageUI() {
        const t = i18n[gameState.language];
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.innerHTML = t[key];
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) el.placeholder = t[key];
        });
        
        els.langBtn.innerHTML = gameState.language === 'en' ? '🇩🇪 DE' : '🇬🇧 EN';
    }

    function calculateUsableHosts(cidr) {
        if (cidr >= 31) return 0;
        if (cidr === 32) return 1; 
        const hostBits = 32 - cidr;
        return Math.pow(2, hostBits) - 2;
    }

    function generateQuestion() {
        const randomIndex = Math.floor(Math.random() * commonCidrs.length);
        gameState.currentCidr = commonCidrs[randomIndex];
        gameState.correctAnswer = calculateUsableHosts(gameState.currentCidr);

        els.questionMask.textContent = `/${gameState.currentCidr}`;
        els.answerInput.value = '';
        els.answerInput.focus();
        gameState.isAnswering = true;
        els.answerInput.disabled = false;
        
        const t = i18n[gameState.language];
        els.feedbackContainer.innerHTML = `<p class="text-sm opacity-60 animate-pulse text-center" data-i18n="awaiting">${t.awaiting}</p>`;
        els.statusMsg.textContent = t.waitInput;
    }

    function submitAnswer() {
        if (!gameState.isAnswering) return;
        
        const t = i18n[gameState.language];
        const userInputStr = els.answerInput.value.trim();
        
        if (userInputStr === '') {
            showFeedback('warning', t.enterNum);
            return;
        }

        const userAnswer = parseInt(userInputStr, 10);
        
        if (isNaN(userAnswer)) {
            showFeedback('warning', t.invalidNum);
            return;
        }

        gameState.isAnswering = false;
        els.answerInput.disabled = true;

        if (userAnswer === gameState.correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer(userAnswer);
        }
    }

    function handleCorrectAnswer() {
        const t = i18n[gameState.language];
        gameState.score += 10 + (gameState.streak * 2); 
        gameState.streak += 1;
        updateStatsUI();
        
        els.statusMsg.textContent = t.correctInfo;
        const totalIPs = Math.pow(2, 32 - gameState.currentCidr);
        showFeedback('success', t.correctMsg(totalIPs, gameState.correctAnswer));

        setTimeout(generateQuestion, 2000);
    }

    function handleIncorrectAnswer(userAnswer) {
        const t = i18n[gameState.language];
        gameState.streak = 0; 
        updateStatsUI();
        
        els.answerInput.classList.add('shake-animation');
        setTimeout(() => {
            els.answerInput.classList.remove('shake-animation');
        }, 400);

        els.statusMsg.textContent = t.incorrectInfo;
        showFeedback('error', t.incorrectMsg(gameState.currentCidr, gameState.correctAnswer, userAnswer));

        setTimeout(generateQuestion, 3500);
    }

    function showFeedback(type, message) {
        let colorVar, icon;
        
        switch(type) {
            case 'success':
                colorVar = 'var(--success-color)';
                icon = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
                break;
            case 'error':
                colorVar = 'var(--error-color)';
                icon = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
                break;
            case 'warning':
                colorVar = 'var(--warning-color)';
                icon = `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
                break;
        }

        els.feedbackContainer.innerHTML = `
            <div class="flex items-center gap-3 w-full px-4 py-3 rounded border pop-in" style="background-color: rgba(0,0,0,0.3); border-color: ${colorVar}; color: ${colorVar};">
                ${icon}
                <div class="text-sm">${message}</div>
            </div>
        `;
    }

    function updateStatsUI() {
        els.scoreDisplay.textContent = gameState.score;
        els.streakDisplay.textContent = gameState.streak;
        
        els.scoreDisplay.classList.remove('pop-in');
        void els.scoreDisplay.offsetWidth; 
        els.scoreDisplay.classList.add('pop-in');
    }

    els.langBtn.addEventListener('click', () => {
        gameState.language = gameState.language === 'en' ? 'de' : 'en';
        updateLanguageUI();
        
        if (gameState.isAnswering) {
            const t = i18n[gameState.language];
            els.feedbackContainer.innerHTML = `<p class="text-sm opacity-60 animate-pulse text-center" data-i18n="awaiting">${t.awaiting}</p>`;
            els.statusMsg.textContent = t.waitInput;
        }
    });

    els.submitBtn.addEventListener('click', submitAnswer);

    els.answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitAnswer();
        }
    });

    // Handle slider input
    els.visualizerSlider.addEventListener('input', (e) => {
        const cidr = parseInt(e.target.value, 10);
        updateVisualizer(cidr);
    });

    // Modal controls
    els.helpBtn.addEventListener('click', () => {
        els.helpModal.classList.remove('hidden');
        els.helpModal.classList.add('flex');
        
        const targetCidr = gameState.currentCidr || 24;
        els.visualizerSlider.value = targetCidr;
        updateVisualizer(targetCidr);

        setTimeout(() => {
            els.helpModal.classList.remove('opacity-0');
            els.helpModal.classList.add('opacity-100');
        }, 10);
        els.statusMsg.textContent = i18n[gameState.language].viewCheat;
    });

    const closeHelp = () => {
        els.helpModal.classList.remove('opacity-100');
        els.helpModal.classList.add('opacity-0');
        setTimeout(() => {
            els.helpModal.classList.remove('flex');
            els.helpModal.classList.add('hidden');
            els.statusMsg.textContent = i18n[gameState.language].waitInput;
            els.answerInput.focus();
        }, 200); 
    };

    els.closeHelpBtn.addEventListener('click', closeHelp);
    
    els.helpModal.addEventListener('click', (e) => {
        if (e.target === els.helpModal) {
            closeHelp();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !els.helpModal.classList.contains('hidden')) {
            closeHelp();
        }
    });

    els.resetBtn.addEventListener('click', () => {
        const t = i18n[gameState.language];
        gameState.score = 0;
        gameState.streak = 0;
        updateStatsUI();
        generateQuestion();
        els.statusMsg.textContent = t.statsReset;
        showFeedback('warning', t.statsResetMsg);
        setTimeout(() => { 
            if(gameState.isAnswering) {
                els.feedbackContainer.innerHTML = `<p class="text-sm opacity-60 animate-pulse text-center" data-i18n="awaiting">${i18n[gameState.language].awaiting}</p>`; 
            }
        }, 2000);
    });

    // Initialize state
    updateLanguageUI();
    updateVisualizer(24);
    generateQuestion();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}