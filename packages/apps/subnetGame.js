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
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }

        input, textarea, .selectable-text {
            user-select: text !important;
            -webkit-user-select: text !important;
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

        /* Toolbar/Header styling mimicking textEditor.js */
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
            background-color: rgba(61, 174, 233, 0.15); /* Hover based on accent */
            color: var(--kde-accent);
        }

        /* Main Content Area */
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

        /* Custom Input Styling */
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

        /* Buttons */
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

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--kde-bg); }
        ::-webkit-scrollbar-thumb { background: var(--kde-window-border); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--kde-accent); }

        /* Status Bar */
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

        /* Modal Overlays */
        .modal-overlay {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
        }
        .modal-content {
            background-color: var(--kde-window-bg);
            border: 1px solid var(--kde-window-border);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
    </style>
</head>
<body>
    <div id="app-container">
        
        <!-- App Toolbar -->
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
                    <span data-i18n="cheatSheet">Cheat Sheet</span>
                </button>
                <button id="resetBtn" class="tool-btn" title="Reset stats">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span data-i18n="reset">Reset</span>
                </button>
            </div>
        </div>

        <!-- Main Workspace Area -->
        <div id="workspace">
            <div class="game-panel pop-in" id="gameContainer">
                
                <!-- Score Header -->
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

                <!-- Active Game Area -->
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

                <!-- Feedback Area -->
                <div id="feedbackContainer" class="min-h-[80px] flex flex-col items-center justify-center p-4 border-t transition-all bg-black/20 rounded-b-lg" style="border-color: var(--kde-window-border);">
                    <p class="text-sm opacity-60 animate-pulse text-center" data-i18n="awaiting">Awaiting calculation...</p>
                </div>
            </div>
        </div>

        <!-- Status Bar -->
        <div id="status-bar">
            <div>
                <span id="status-msg" data-i18n="ready">Ready</span>
            </div>
            <div>
                <span data-i18n="module">Module: SubnetHostCalc</span>
            </div>
        </div>

        <!-- Help/Cheat Sheet Modal Overlay -->
        <div id="helpModal" class="modal-overlay fixed inset-0 z-50 hidden items-center justify-center p-4 opacity-0 transition-opacity duration-200">
            <div class="modal-content rounded-lg p-0 max-w-2xl w-full relative flex flex-col max-h-[85vh]">
                
                <!-- Modal Header -->
                <div class="flex justify-between items-center p-4 border-b" style="border-color: var(--kde-window-border); background-color: var(--kde-panel);">
                    <h3 class="text-xl font-bold" data-i18n="modalTitle">How to Calculate Hosts</h3>
                    <button id="closeHelpBtn" class="text-gray-400 hover:text-white transition-colors p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Modal Body (Scrollable) -->
                <div class="p-6 overflow-y-auto space-y-6 text-sm sm:text-base">
                    
                    <div class="p-4 rounded-md border text-center" style="background-color: var(--kde-bg); border-color: var(--kde-window-border);">
                        <h4 class="font-bold text-lg mb-1" style="color: var(--kde-accent);" data-i18n="magic32Title">The Magic Number is 32</h4>
                        <p class="opacity-80" data-i18n="magic32Desc">Every IPv4 address has exactly <strong>32 puzzle pieces</strong> (bits).</p>
                    </div>

                    <div class="space-y-5">
                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--kde-accent); color: white;">1</div>
                            <div>
                                <h4 class="font-bold mb-1" data-i18n="step1Title">Look at the Slash Number</h4>
                                <p class="opacity-80 mb-1" data-i18n="step1Desc1">If the game asks for <strong>/24</strong>...</p>
                                <p class="opacity-60 text-sm" data-i18n="step1Desc2">That means 24 pieces are locked for the network. You can't use them for computers.</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--kde-accent); color: white;">2</div>
                            <div>
                                <h4 class="font-bold mb-1" data-i18n="step2Title">Subtract from 32</h4>
                                <p class="opacity-80 mb-2" data-i18n="step2Desc">Find out how many pieces are left for your computers (hosts).</p>
                                <div class="font-mono px-3 py-1 rounded inline-block shadow-inner text-sm" style="background-color: var(--kde-bg); border: 1px solid var(--kde-window-border);" data-i18n="step2Math">
                                    32 - 24 = <strong>8</strong> pieces left
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--kde-accent); color: white;">3</div>
                            <div>
                                <h4 class="font-bold mb-1" data-i18n="step3Title">Multiply the 2s (The Power of 2)</h4>
                                <p class="opacity-80 mb-2" data-i18n="step3Desc">Multiply 2 by itself for every piece you have left (2<sup>8</sup>).</p>
                                <div class="font-mono px-3 py-1 rounded inline-block shadow-inner text-sm" style="background-color: var(--kde-bg); border: 1px solid var(--kde-window-border);" data-i18n="step3Math">
                                    2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>256</strong> total IPs
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="font-bold rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 shadow" style="background-color: var(--error-color); color: white;">4</div>
                            <div>
                                <h4 class="font-bold mb-1" style="color: var(--error-color);" data-i18n="step4Title">ALWAYS Subtract 2!</h4>
                                <p class="opacity-80 mb-2" data-i18n="step4Desc">You must throw away the very first IP (Network) and the very last IP (Broadcast). You can never assign them to a host.</p>
                                <div class="font-mono px-3 py-2 rounded inline-block shadow text-base font-bold" style="background-color: var(--kde-panel); border: 1px solid var(--success-color); color: var(--success-color);" data-i18n="step4Math">
                                    256 - 2 = 254 Usable Hosts
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Reference Table -->
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

// Initialize the game logic
function initApp() {

    // Apply theme colors dynamically if provided by parent (KDE wrapper)
    function applyTheme() {
        let themeColors = window.kdeThemeColors;
        
        if (!themeColors) {
            try {
                // Wrap parent access in try-catch to prevent cross-origin SecurityErrors
                themeColors = window.parent && window.parent.kdeThemeColors;
            } catch (e) {
                console.warn("Cross-origin restriction prevented accessing parent theme colors. Using defaults.");
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
            cheatSheet: "Cheat Sheet",
            reset: "Reset",
            score: "Score",
            streak: "Streak",
            calcFor: "Calculate Usable Hosts For:",
            placeholder: "Enter answer...",
            submit: "Submit",
            awaiting: "Awaiting calculation...",
            ready: "Ready",
            module: "Module: SubnetHostCalc",
            modalTitle: "How to Calculate Hosts",
            magic32Title: "The Magic Number is 32",
            magic32Desc: "Every IPv4 address has exactly <strong>32 puzzle pieces</strong> (bits).",
            step1Title: "Look at the Slash Number",
            step1Desc1: "If the game asks for <strong>/24</strong>...",
            step1Desc2: "That means 24 pieces are locked for the network. You can't use them for computers.",
            step2Title: "Subtract from 32",
            step2Desc: "Find out how many pieces are left for your computers (hosts).",
            step2Math: "32 - 24 = <strong>8</strong> pieces left",
            step3Title: "Multiply the 2s (The Power of 2)",
            step3Desc: "Multiply 2 by itself for every piece you have left (2<sup>8</sup>).",
            step3Math: "2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>256</strong> total IPs",
            step4Title: "ALWAYS Subtract 2!",
            step4Desc: "You must throw away the very first IP (Network) and the very last IP (Broadcast). You can never assign them to a host.",
            step4Math: "256 - 2 = 254 Usable Hosts",
            quickRef: "Quick Reference Cheat Sheet",
            waitInput: "Waiting for input...",
            enterNum: "Please enter a number.",
            invalidNum: "Invalid input. Numbers only.",
            correctInfo: "Answer correct!",
            incorrectInfo: "Answer incorrect.",
            viewCheat: "Viewing Cheat Sheet",
            statsReset: "Stats Reset.",
            statsResetMsg: "Game stats have been reset.",
            correctMsg: (ips, hosts) => `Correct! ${ips} IPs - 2 = <strong>${hosts}</strong> usable hosts.`,
            incorrectMsg: (cidr, hosts, ans) => `Incorrect. /${cidr} has <strong>${hosts}</strong> usable hosts.<br><span class="opacity-70 text-xs mt-1 block">Your answer: ${ans}</span>`
        },
        de: {
            title: "Subnetz-Meister",
            cheatSheet: "Spickzettel",
            reset: "Neustart",
            score: "Punkte",
            streak: "Serie",
            calcFor: "Berechne nutzbare Hosts für:",
            placeholder: "Antwort eingeben...",
            submit: "Bestätigen",
            awaiting: "Warte auf Berechnung...",
            ready: "Bereit",
            module: "Modul: SubnetzHostRechner",
            modalTitle: "Wie man Hosts berechnet",
            magic32Title: "Die magische Zahl ist 32",
            magic32Desc: "Jede IPv4-Adresse hat genau <strong>32 Puzzleteile</strong> (Bits).",
            step1Title: "Schau dir die Slash-Zahl an",
            step1Desc1: "Wenn das Spiel nach <strong>/24</strong> fragt...",
            step1Desc2: "Das bedeutet, 24 Teile sind für das Netzwerk gesperrt. Du kannst sie nicht für Computer verwenden.",
            step2Title: "Von 32 subtrahieren",
            step2Desc: "Finde heraus, wie viele Teile für deine Computer (Hosts) übrig sind.",
            step2Math: "32 - 24 = <strong>8</strong> Teile übrig",
            step3Title: "Multipliziere die 2er (Zweierpotenz)",
            step3Desc: "Multipliziere 2 mit sich selbst für jedes übrig gebliebene Teil (2<sup>8</sup>).",
            step3Math: "2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = <strong>256</strong> gesamte IPs",
            step4Title: "IMMER 2 abziehen!",
            step4Desc: "Du musst die allererste IP (Netzwerk) und die allerletzte IP (Broadcast) wegwerfen. Sie können niemals einem Host zugewiesen werden.",
            step4Math: "256 - 2 = 254 Nutzbare Hosts",
            quickRef: "Schnellreferenz-Spickzettel",
            waitInput: "Warte auf Eingabe...",
            enterNum: "Bitte gib eine Zahl ein.",
            invalidNum: "Ungültige Eingabe. Nur Zahlen.",
            correctInfo: "Antwort richtig!",
            incorrectInfo: "Antwort falsch.",
            viewCheat: "Zeige Spickzettel",
            statsReset: "Statistiken zurückgesetzt.",
            statsResetMsg: "Spielstatistiken wurden zurückgesetzt.",
            correctMsg: (ips, hosts) => `Richtig! ${ips} IPs - 2 = <strong>${hosts}</strong> nutzbare Hosts.`,
            incorrectMsg: (cidr, hosts, ans) => `Falsch. /${cidr} hat <strong>${hosts}</strong> nutzbare Hosts.<br><span class="opacity-70 text-xs mt-1 block">Deine Antwort: ${ans}</span>`
        }
    };

    // Game State
    const gameState = {
        score: 0,
        streak: 0,
        currentCidr: 0,
        correctAnswer: 0,
        isAnswering: true,
        language: 'en'
    };

    const commonCidrs = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    // DOM Elements
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
        statusMsg: document.getElementById('status-msg')
    };

    function updateLanguageUI() {
        const t = i18n[gameState.language];
        
        // Update all translated nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.innerHTML = t[key];
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) el.placeholder = t[key];
        });
        
        // Update language toggle button text (show the opposite of current)
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

    // Language Toggle Listener
    els.langBtn.addEventListener('click', () => {
        gameState.language = gameState.language === 'en' ? 'de' : 'en';
        updateLanguageUI();
        
        // If we are waiting for an answer, dynamically update the feedback message block text
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

    // Modal Controls
    els.helpBtn.addEventListener('click', () => {
        els.helpModal.classList.remove('hidden');
        els.helpModal.classList.add('flex');
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

    // Reset
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

    // Initialization
    updateLanguageUI();
    generateQuestion();
}

// Run immediately if DOM is already parsed (e.g., when injected dynamically), else wait.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}