(function() {
    // Register the package for the external desktop environment
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['kcalc'] = {
            name: 'KCalc',
            version: '1.0.0',
            description: 'KDE Scientific Calculator Simulation',
            preInstalledOn: ['default'],
            commands: {
                kcalc: function(args) {
                    if (typeof window.launchApp === 'function') {
                        window.launchApp('kcalc');
                    } else {
                        console.log("KCalc invoked.");
                    }
                }
            },
            commandInfo: {
                kcalc: "what is this command?\nkcalc\n\nwhat is it used for?\nOpens the KCalc Calculator app."
            }
        };
    }

    // Execute immediately when script loads
    (function init() {
        // Check if we're in a browser environment
        if (typeof document === 'undefined' || !document.body) {
            return;
        }

        // Prevent double initialization - check if app already exists
        if (document.getElementById('kcalc-app')) {
            return;
        }

        try {
            // Get KDE colors from the parent window or use defaults
            let kdeColors = {};
            try {
                // Try to get colors from parent window
                if (window.parent && window.parent !== window) {
                    const parentStyles = window.parent.getComputedStyle(window.parent.document.documentElement);
                    kdeColors = {
                        bg: parentStyles.getPropertyValue('--kde-bg').trim() || '#1a1b1e',
                        panel: parentStyles.getPropertyValue('--kde-panel').trim() || 'rgba(35, 38, 41, 0.85)',
                        panelHover: parentStyles.getPropertyValue('--kde-panel-hover').trim() || 'rgba(255, 255, 255, 0.1)',
                        accent: parentStyles.getPropertyValue('--kde-accent').trim() || '#3daee9',
                        text: parentStyles.getPropertyValue('--kde-text').trim() || '#eff0f1',
                        windowBg: parentStyles.getPropertyValue('--kde-window-bg').trim() || '#31363b',
                        windowBorder: parentStyles.getPropertyValue('--kde-window-border').trim() || '#1d2023'
                    };
                }
            } catch(e) {
                // Use defaults if we can't access parent styles
                kdeColors = {
                    bg: '#1a1b1e',
                    panel: 'rgba(35, 38, 41, 0.85)',
                    panelHover: 'rgba(255, 255, 255, 0.1)',
                    accent: '#3daee9',
                    text: '#eff0f1',
                    windowBg: '#31363b',
                    windowBorder: '#1d2023'
                };
            }

            // Find the container div created by kde.js
            let container = document.getElementById('app-container-kcalc');
            
            // If container doesn't exist, use the body
            if (!container) {
                container = document.body;
            }

            // Clear the container
            container.innerHTML = '';

            // Build main application container
            const app = document.createElement('div');
            app.id = 'kcalc-app';
            app.style.cssText = `display:flex;flex-direction:column;height:100vh;width:100vw;box-sizing:border-box;background-color:${kdeColors.windowBg};color:${kdeColors.text};font-family:"Noto Sans",sans-serif;user-select:none;overflow:hidden;position:absolute;top:0;left:0;`;

            // Main content area (Centered Calculator) - No toolbar
            const mainArea = document.createElement('div');
            mainArea.style.cssText = `display:flex;flex:1;align-items:center;justify-content:center;background-color:${kdeColors.bg};padding:16px;`;

            // Calculator Body - Flexible Size
            const calcBody = document.createElement('div');
            calcBody.style.cssText = `width:100%;max-width:380px;height:100%;max-height:580px;background-color:${kdeColors.windowBg};border-radius:8px;box-shadow:0 8px 16px rgba(0,0,0,0.5);border:1px solid ${kdeColors.windowBorder};padding:16px;display:flex;flex-direction:column;gap:12px;flex:1;`;

            // Displays
            const displayContainer = document.createElement('div');
            displayContainer.style.cssText = `background-color:${kdeColors.bg};border-radius:4px;padding:12px 16px;text-align:right;border:1px solid ${kdeColors.windowBorder};box-shadow:inset 0 2px 4px rgba(0,0,0,0.2);min-height:80px;display:flex;flex-direction:column;justify-content:flex-end;flex-shrink:0;`;
            
            const previousDisplay = document.createElement('div');
            previousDisplay.id = 'previous-display';
            previousDisplay.style.cssText = `min-height:20px;color:#7a7a7a;font-size:14px;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;`;
            previousDisplay.innerText = '';
            
            const currentDisplay = document.createElement('div');
            currentDisplay.id = 'current-display';
            currentDisplay.style.cssText = `color:${kdeColors.text};font-size:36px;font-weight:bold;overflow:hidden;text-overflow:ellipsis;`;
            currentDisplay.innerText = '0';

            displayContainer.appendChild(previousDisplay);
            displayContainer.appendChild(currentDisplay);
            calcBody.appendChild(displayContainer);

            // Buttons Grid
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:8px;flex:1;';

            const buttonConfigs = [
                { text: 'AC', type: 'action' },
                { text: 'C', type: 'action' },
                { text: '%', type: 'op' },
                { text: '÷', type: 'op' },
                { text: '7', type: 'num' },
                { text: '8', type: 'num' },
                { text: '9', type: 'num' },
                { text: '×', type: 'op' },
                { text: '4', type: 'num' },
                { text: '5', type: 'num' },
                { text: '6', type: 'num' },
                { text: '-', type: 'op' },
                { text: '1', type: 'num' },
                { text: '2', type: 'num' },
                { text: '3', type: 'num' },
                { text: '+', type: 'op' },
                { text: '0', type: 'num', span: 2 },
                { text: '.', type: 'num' },
                { text: '=', type: 'equal', span: 2 }
            ];

            // Calculator state
            let currentOperand = '';
            let previousOperand = '';
            let operation = null;
            let shouldResetScreen = false;

            function updateDisplay() {
                currentDisplay.innerText = currentOperand || '0';
                previousDisplay.innerText = operation !== null ? `${previousOperand} ${operation}` : '';
            }

            function handleNumber(num) {
                if (currentOperand.length > 12) return;
                if (shouldResetScreen) {
                    currentOperand = '';
                    shouldResetScreen = false;
                }
                if (num === '.' && currentOperand.includes('.')) return;
                currentOperand += num;
                updateDisplay();
            }

            function handleOperator(op) {
                if (currentOperand === '' && previousOperand === '') return;
                if (currentOperand === '') {
                    operation = op;
                    updateDisplay();
                    return;
                }
                if (previousOperand !== '') {
                    calculate();
                }
                operation = op;
                previousOperand = currentOperand;
                currentOperand = '';
                updateDisplay();
            }

            function calculate() {
                const prev = parseFloat(previousOperand);
                const current = parseFloat(currentOperand);
                if (isNaN(prev) || isNaN(current)) return;

                let result;
                switch (operation) {
                    case '+': result = prev + current; break;
                    case '-': result = prev - current; break;
                    case '×': result = prev * current; break;
                    case '÷':
                        if (current === 0) {
                            alert('Cannot divide by zero.');
                            handleAllClear();
                            return;
                        }
                        result = prev / current;
                        break;
                    case '%': result = prev % current; break;
                    default: return;
                }

                result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
                currentOperand = result.toString();
                operation = null;
                previousOperand = '';
                updateDisplay();
            }

            function handleEqual() {
                if (currentOperand === '' || previousOperand === '') return;
                calculate();
                shouldResetScreen = true;
                updateDisplay();
            }

            function handleAllClear() {
                currentOperand = '';
                previousOperand = '';
                operation = null;
                updateDisplay();
            }

            function handleClear() {
                currentOperand = currentOperand.slice(0, -1);
                if (currentOperand === '') {
                    currentOperand = '0';
                    shouldResetScreen = true;
                }
                updateDisplay();
            }

            // Create buttons
            buttonConfigs.forEach(config => {
                const btn = document.createElement('button');
                btn.innerText = config.text;
                btn.style.cssText = `
                    padding:12px 0;
                    font-size:18px;
                    font-weight:bold;
                    border:none;
                    border-radius:4px;
                    cursor:pointer;
                    transition:background-color 0.1s, transform 0.1s;
                    min-height:48px;
                `;
                
                if (config.span) {
                    btn.style.gridColumn = `span ${config.span}`;
                }

                // Styling based on type with KDE colors
                const styles = {
                    num: { bg: '#31363b', color: kdeColors.text, hover: '#3d4045' },
                    op: { bg: '#4d5057', color: kdeColors.text, hover: '#5d6067' },
                    action: { bg: '#da4453', color: '#ffffff', hover: '#e85563' },
                    equal: { bg: kdeColors.accent, color: '#ffffff', hover: '#4db8f0' }
                };

                const style = styles[config.type] || styles.num;
                btn.style.backgroundColor = style.bg;
                btn.style.color = style.color;

                btn.onmouseover = () => btn.style.backgroundColor = style.hover;
                btn.onmouseout = () => btn.style.backgroundColor = style.bg;
                btn.onmousedown = () => btn.style.transform = 'scale(0.95)';
                btn.onmouseup = () => btn.style.transform = 'scale(1)';
                btn.onmouseleave = () => {
                    btn.style.transform = 'scale(1)';
                    btn.style.backgroundColor = style.bg;
                };

                // Click handler
                btn.onclick = function(e) {
                    e.stopPropagation();
                    const text = config.text;
                    if (config.type === 'num') handleNumber(text);
                    else if (config.type === 'op') handleOperator(text);
                    else if (config.type === 'action' && text === 'AC') handleAllClear();
                    else if (config.type === 'action' && text === 'C') handleClear();
                    else if (config.type === 'equal') handleEqual();
                };

                grid.appendChild(btn);
            });

            calcBody.appendChild(grid);
            mainArea.appendChild(calcBody);
            app.appendChild(mainArea);

            // Clear container and append app
            container.innerHTML = '';
            container.appendChild(app);
            
            // Ensure container takes full height
            if (container === document.body) {
                document.body.style.margin = '0';
                document.body.style.padding = '0';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.margin = '0';
                document.documentElement.style.padding = '0';
                document.documentElement.style.overflow = 'hidden';
                document.documentElement.style.height = '100%';
                document.body.style.height = '100%';
            } else {
                // If we're in a container div, make sure it fills the parent
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.position = 'relative';
                container.style.overflow = 'hidden';
            }

            // Initialize display
            updateDisplay();

            // Keyboard support
            document.addEventListener('keydown', function(e) {
                const key = e.key;
                if (key >= '0' && key <= '9') {
                    e.preventDefault();
                    handleNumber(key);
                } else if (key === '.') {
                    e.preventDefault();
                    handleNumber('.');
                } else if (key === '=' || key === 'Enter') {
                    e.preventDefault();
                    handleEqual();
                } else if (key === 'Backspace') {
                    e.preventDefault();
                    handleClear();
                } else if (key === 'Escape') {
                    e.preventDefault();
                    handleAllClear();
                } else if (key === '+' || key === '-') {
                    e.preventDefault();
                    handleOperator(key);
                } else if (key === '*') {
                    e.preventDefault();
                    handleOperator('×');
                } else if (key === '/') {
                    e.preventDefault();
                    handleOperator('÷');
                } else if (key === '%') {
                    e.preventDefault();
                    handleOperator('%');
                }
            });

            console.log('KCalc initialized successfully');

        } catch (error) {
            console.error('Error initializing KCalc:', error);
            // Show error in a non-intrusive way
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `display:flex;align-items:center;justify-content:center;height:100vh;color:#eff0f1;background:#1e1e1e;font-family:sans-serif;flex-direction:column;padding:20px;text-align:center;`;
            errorDiv.innerHTML = `
                <h2 style="color:#da4453;">Error Loading Calculator</h2>
                <p style="color:#aaa;max-width:400px;">${error.message}</p>
                <button onclick="location.reload()" style="margin-top:20px;padding:10px 20px;background:#3daee9;border:none;border-radius:4px;color:#000;cursor:pointer;font-size:14px;">Reload</button>
            `;
            const container = document.getElementById('app-container-kcalc') || document.body;
            container.innerHTML = '';
            container.appendChild(errorDiv);
        }
    })();

    // Node.js module export fallback structure 
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            package: {
                name: 'kcalc',
                version: '1.0.0',
                description: 'KDE Scientific Calculator Simulation'
            }
        };
    }
})();