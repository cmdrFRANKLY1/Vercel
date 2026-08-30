window.packagesRegistry = window.packagesRegistry || {};

// Register the package
window.packagesRegistry['infoPopup'] = {
    name: 'infoPopup',
    description: 'Steam-style interactive welcome tour with a dynamic color-shifting blue highlight guiding you through the interface',
    preInstalledOn: ['default'],
    translations: {
        en: {
            infoPopupUsage: "Usage: infoPopup",
            infoPopupHelp: "Launches an interactive Steam-style welcome tour highlighting workspace controls, themes, and inputs.",
            welcomeTitle: "Welcome to sTerminal · Tour",
            nextStep: "Next Step ➔",
            prevStep: "⬅ Back",
            finishTour: "Start Exploring",
            loadingInfo: "Launching Steam-style welcome tour..."
        },
        de: {
            infoPopupUsage: "Verwendung: infoPopup",
            infoPopupHelp: "Startet eine interaktive Begrüßungstour im Steam-Stil zur Vorstellung von Simulation, Schaltern, Themes und Eingabefeld.",
            welcomeTitle: "Willkommen bei sTerminal · Tour",
            nextStep: "Weiter ➔",
            prevStep: "⬅ Zurück",
            finishTour: "Loslegen",
            loadingInfo: "Starte Begrüßungstour im Steam-Stil..."
        }
    },
    commandInfo: {
        en: "what is this command?\ninfoPopup\n\nwhat is it used for?\nLaunches an interactive Steam-style welcome tour highlighting workspace controls, themes, and inputs.",
        de: "Was ist dieser Befehl?\ninfoPopup\n\nWofür wird er verwendet?\nStartet eine interaktive Willkommenstour im Steam-Stil zur Erklärung von Bedienelementen, Themes und Eingabe."
    },

    commands: {
        // IMPORTANT: Terminal converts user input to lowercase. 
        // We MUST define 'infopopup' in all lowercase for manual execution to work.
        infopopup: function(args) {
            // Hide the autorun command log to keep the terminal clean
            if (this.outputDiv) {
                const historyLines = this.outputDiv.querySelectorAll('.history-line');
                for (let i = historyLines.length - 1; i >= Math.max(0, historyLines.length - 3); i--) {
                    if (historyLines[i].textContent.includes('[autorun]') && historyLines[i].textContent.includes('infoPopup')) {
                        historyLines[i].remove();
                        break;
                    }
                }
            }
            
            const existing = document.getElementById('steamWelcomeTourOverlay');
            if (existing) existing.remove();

            // Create Steam-style dark backdrop with pointer-events: none so clicks pass through spotlight
            const overlay = document.createElement('div');
            overlay.id = 'steamWelcomeTourOverlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.78);
                z-index: 999999;
                font-family: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                transition: background 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            `;

            // Spotlight box with dynamic color-shifting animation
            const styleTag = document.createElement('style');
            styleTag.innerHTML = `
                @keyframes spotlightGlow {
                    0% { border-color: #00d2ff; box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.78), 0 0 25px rgba(0, 210, 255, 0.6); }
                    33% { border-color: #00ff88; box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.78), 0 0 25px rgba(0, 255, 136, 0.6); }
                    66% { border-color: #0088ff; box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.78), 0 0 25px rgba(0, 136, 255, 0.6); }
                    100% { border-color: #00d2ff; box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.78), 0 0 25px rgba(0, 210, 255, 0.6); }
                }
                .dynamic-spotlight {
                    animation: spotlightGlow 6s infinite ease-in-out;
                }
                #tourBodyContent strong {
                    color: #00d2ff;
                }
                #tourCloseX:hover {
                    color: #00d2ff !important;
                }
                #tourPrevBtn:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                #tourNextBtn:hover {
                    background: #00e5ff;
                    transform: scale(1.02);
                }
                #tourNextBtn, #tourPrevBtn {
                    transition: all 0.2s ease;
                }
            `;
            document.head.appendChild(styleTag);

            const spotlight = document.createElement('div');
            spotlight.className = 'dynamic-spotlight';
            spotlight.style.cssText = `
                position: absolute;
                border: 2px solid #00d2ff;
                border-radius: 6px;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                pointer-events: none;
                background: transparent;
            `;
            overlay.appendChild(spotlight);

            const dialog = document.createElement('div');
            dialog.style.cssText = `
                position: absolute;
                background: var(--modal-bg, #1e1e1e);
                color: var(--text-color, #ffffff);
                border: 1px solid #00d2ff;
                width: 420px;
                padding: 24px;
                border-radius: 6px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85);
                display: flex;
                flex-direction: column;
                gap: 16px;
                z-index: 1000000;
                pointer-events: auto;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                max-width: 90vw;
            `;

            const header = document.createElement('div');
            header.style.cssText = `display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--modal-border, #444444); padding-bottom: 10px;`;
            header.innerHTML = `
                <div>
                    <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #00d2ff; font-weight: 700;">Welcome Tour · Step <span id="tourStepNum">1</span> of 5</div>
                    <div style="font-size: 16px; font-weight: 700; margin-top: 2px;" id="tourTitle">Hello!</div>
                </div>
                <button id="tourCloseX" style="background:transparent; border:none; color:var(--text-color,#fff); font-size:18px; cursor:pointer; padding: 4px 8px;">&times;</button>
            `;
            dialog.appendChild(header);

            const bodyContent = document.createElement('div');
            bodyContent.id = 'tourBodyContent';
            bodyContent.style.cssText = `font-size: 13.5px; line-height: 1.6; color: var(--text-color, #ffffff); min-height: 75px;`;
            dialog.appendChild(bodyContent);

            const footer = document.createElement('div');
            footer.style.cssText = `display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--modal-border, #444444); padding-top: 12px;`;
            footer.innerHTML = `
                <button id="tourPrevBtn" style="background: transparent; border: 1px solid var(--modal-border, #444444); color: var(--text-color, #ffffff); padding: 6px 14px; font-family: inherit; font-size: 12px; font-weight: 600; border-radius: 3px; cursor: pointer;">⬅ Back</button>
                <button id="tourNextBtn" style="background: #00d2ff; color: #000000; border: none; padding: 6px 16px; font-family: inherit; font-size: 12px; font-weight: 700; border-radius: 3px; cursor: pointer;">Next Step ➔</button>
            `;
            dialog.appendChild(footer);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            const steps = [
                {
                    title: "Welcome :)",
                    text: "<strong>Hello!</strong> This is a IdeaSpace! Let's take a quick tour of whats happening...",
                    getTarget: () => ({ top: window.innerHeight / 2, left: window.innerWidth / 2, width: 0, height: 0 })
                },
                {
                    title: "2. Theme Controls",
                    text: "<strong>Themes</strong>: Left Click the moon/sun icon to toggle between dark/light mode. Left Click the Fontname to cycle fonts. Right-click for more options.",
                    getTarget: () => {
                        const themeContainer = document.getElementById('infobar-theme') || document.getElementById('infobar') || document.body;
                        return themeContainer.getBoundingClientRect();
                    }
                },
                {
                    title: "3. Language & Font",
                    text: "<strong>Language and font</strong>: Adjust your preferred display language or customize your terminal font families here. Click the name to cycle through options or right-click for a dropdown menu.",
                    getTarget: () => {
                        const langContainer = document.getElementById('infobar-language') || document.body;
                        return langContainer.getBoundingClientRect();
                    }
                },
                {
                    title: "4. Command Input",
                    text: "<strong>Command input</strong>: This is where you type commands, run packages, and interact with the virtual file system. Try typing <strong>help</strong> to see available commands, or <strong>settings</strong> to open the settings window.",
                    getTarget: () => {
                        const activePrompt = document.querySelector('.terminal-instance.active-term .input-line .prompt') || document.querySelector('.input-line .prompt') || document.body;
                        return activePrompt.getBoundingClientRect();
                    }
                },
                {
                    title: "5. Have Fun!",
                    text: "You're all set up. <strong>Have fun!</strong> Explore commands, install packages, and enjoy building things. You can always run <strong>infoPopup</strong> again to retake this tour.",
                    getTarget: () => ({ top: window.innerHeight / 2, left: window.innerWidth / 2, width: 0, height: 0 })
                }
            ];

            let currentStep = 0;

            const updateTourStep = () => {
                document.getElementById('tourStepNum').innerText = currentStep + 1;
                document.getElementById('tourTitle').innerText = steps[currentStep].title;
                document.getElementById('tourBodyContent').innerHTML = steps[currentStep].text;

                const prevBtn = document.getElementById('tourPrevBtn');
                const nextBtn = document.getElementById('tourNextBtn');

                prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
                nextBtn.innerText = currentStep === steps.length - 1 ? "Start Exploring ➔" : "Next Step ➔";

                requestAnimationFrame(() => {
                    const rect = steps[currentStep].getTarget();
                    
                    if (rect.width === 0 && rect.height === 0) {
                        spotlight.style.opacity = '0';
                        overlay.style.background = 'rgba(0, 0, 0, 0.78)';
                        spotlight.style.top = (window.innerHeight / 2) + 'px';
                        spotlight.style.left = (window.innerWidth / 2) + 'px';
                        spotlight.style.width = '0px';
                        spotlight.style.height = '0px';

                        dialog.style.top = (window.innerHeight / 2 - 100) + 'px';
                        dialog.style.left = (window.innerWidth / 2 - 210) + 'px';
                    } else {
                        spotlight.style.opacity = '1';
                        overlay.style.background = 'transparent';
                        spotlight.style.top = (rect.top - 6) + 'px';
                        spotlight.style.left = (rect.left - 6) + 'px';
                        spotlight.style.width = (rect.width + 12) + 'px';
                        spotlight.style.height = (rect.height + 12) + 'px';

                        const dialogWidth = 420;
                        let dialogLeft = rect.left + (rect.width / 2) - (dialogWidth / 2);
                        dialogLeft = Math.max(20, Math.min(window.innerWidth - dialogWidth - 20, dialogLeft));
                        
                        let dialogTop = rect.bottom + 20;
                        if (dialogTop + 260 > window.innerHeight) {
                            dialogTop = rect.top - 270;
                        }
                        dialogTop = Math.max(20, dialogTop);

                        dialog.style.top = dialogTop + 'px';
                        dialog.style.left = dialogLeft + 'px';
                    }
                });
            };

            const closeTour = () => {
                overlay.remove();
                styleTag.remove();
                if (window._tourResizeHandler) {
                    window.removeEventListener('resize', window._tourResizeHandler);
                    window._tourResizeHandler = null;
                }
                if (window._tourKeyHandler) {
                    document.removeEventListener('keydown', window._tourKeyHandler);
                    window._tourKeyHandler = null;
                }
                const activeTerm = document.querySelector('.terminal-instance.active-term .cmd-input');
                if (activeTerm) {
                    setTimeout(() => activeTerm.focus(), 50);
                }
                
                // Safe check incase context changed
                if (typeof this.print === 'function') {
                    this.print("Steam-style welcome tour completed successfully.");
                    this.scrollToBottom();
                }
            };

            const keyHandler = (e) => {
                if (e.key === 'Escape') {
                    closeTour();
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (currentStep < steps.length - 1) {
                        currentStep++;
                        updateTourStep();
                    } else {
                        closeTour();
                    }
                } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
                    if (currentStep > 0) {
                        currentStep--;
                        updateTourStep();
                    }
                }
            };
            
            document.addEventListener('keydown', keyHandler);
            window._tourKeyHandler = keyHandler;
            window._tourResizeHandler = updateTourStep;
            window.addEventListener('resize', window._tourResizeHandler);

            document.getElementById('tourCloseX').addEventListener('click', closeTour);
            document.getElementById('tourPrevBtn').addEventListener('click', () => {
                if (currentStep > 0) { currentStep--; updateTourStep(); }
            });
            document.getElementById('tourNextBtn').addEventListener('click', () => {
                if (currentStep < steps.length - 1) { currentStep++; updateTourStep(); } else { closeTour(); }
            });
            
            updateTourStep();
        },

        // Alias for camelCase references if they are explicitly typed via internal terminal calls
        infoPopup: function(args) {
            this.commands.infopopup.call(this, args);
        },
        
        // System handler
        run: function(args) {
            this.commands.infopopup.call(this, args);
        }
    }
};

// CRITICAL FIX: Since autorun scripts load *after* the terminal's initial boot sequence, 
// we must actively force-inject the new commands into all currently active tabs and sessions immediately.
if (typeof tabs !== 'undefined' && tabs.length > 0) {
    tabs.forEach(tab => {
        if (tab && tab.terminals) {
            tab.terminals.forEach(term => {
                if (term && term.commands) {
                    term.commands.infopopup = window.packagesRegistry['infoPopup'].commands.infopopup.bind(term);
                    term.commands.infoPopup = window.packagesRegistry['infoPopup'].commands.infoPopup.bind(term);
                }
            });
        }
    });
}

// Register command info with proper case sensitivity
if (typeof commandInfo !== 'undefined') {
    ['infoPopup', 'infopopup'].forEach(cmdName => {
        if (!commandInfo.hasOwnProperty(cmdName)) {
            Object.defineProperty(commandInfo, cmdName, {
                get: function() {
                    const lang = window.termSettings?.language || 'en';
                    const pkg = window.packagesRegistry['infoPopup'];
                    return pkg?.commandInfo?.[lang] || pkg?.commandInfo?.en || "what is this command?\ninfoPopup\n\nwhat is it used for?\nLaunches Steam-style welcome tour.";
                },
                configurable: true
            });
        }
    });
}

function autoStartTour() {
    const hasSeenTour = localStorage.getItem('sTerminal_tourSeen');
    
    if (hasSeenTour) {
        console.log('Tour already seen - not auto-starting (run "infoPopup" manually to retake the tour)');
        return;
    }

    function checkTerminalAndStart() {
        if (typeof tabs !== 'undefined' && tabs.length > 0) {
            const firstTab = tabs[0];
            if (firstTab && firstTab.terminals && firstTab.terminals.length > 0) {
                const firstTerm = firstTab.terminals[0];
                
                // Extra check in case the force-inject missed a loading race condition
                if (!firstTerm.commands.infopopup && window.packagesRegistry['infoPopup']) {
                     firstTerm.commands.infopopup = window.packagesRegistry['infoPopup'].commands.infopopup.bind(firstTerm);
                }

                if (firstTerm && firstTerm.commands && typeof firstTerm.commands.infopopup === 'function') {
                    console.log('First-time visit detected - auto-starting welcome tour...');
                    localStorage.setItem('sTerminal_tourSeen', 'true');
                    setTimeout(() => {
                        firstTerm.commands.infopopup.call(firstTerm, []);
                    }, 300);
                    return true;
                }
            }
        }
        return false;
    }

    if (checkTerminalAndStart()) return;

    let attempts = 0;
    const maxAttempts = 20; 
    
    const intervalId = setInterval(() => {
        attempts++;
        if (checkTerminalAndStart()) {
            clearInterval(intervalId);
        } else if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            console.warn('Could not auto-start tour - terminal not ready after max attempts');
            localStorage.setItem('sTerminal_tourSeen', 'true');
        }
    }, 500);
}

autoStartTour();

console.log('✅ infoPopup package loaded successfully!');
console.log('📖 Type "infoPopup" in the terminal to launch the welcome tour.');