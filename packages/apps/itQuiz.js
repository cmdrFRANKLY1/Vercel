(function() {
    "use strict";

    // Register the package for the external desktop environment
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['itquiz'] = {
            name: 'IT & Linux Befehle Quiz',
            version: '1.1.0',
            description: 'IT Commands Quiz Game (Dynamic Fetch)',
            preInstalledOn: ['default'],
            commands: {
                itquiz: function(args) {
                    if (typeof window.launchApp === 'function') {
                        window.launchApp('itquiz');
                    } else {
                        console.log("IT Quiz invoked.");
                    }
                }
            },
            commandInfo: {
                itquiz: "what is this command?\nitquiz\n\nwhat is it used for?\nOpens the IT & Linux Befehle Quiz app."
            }
        };
    }

    // Execute immediately when script loads
    (function init() {
        if (typeof document === 'undefined' || !document.body) return;

        // Prevent double initialization
        if (document.getElementById('it-quiz-app')) return;

        let rawData = [];
        let score = 0;
        let currentQuestion = null;
        let timeLeft = 180; // 3 minutes gamification
        let timerInterval = null;
        let quizActive = false; // Starts false until fetch completes
        let answerHistory = [];

        // Try to fetch colors from parent, or use KDE default dark theme
        let kdeColors = {
            bg: '#1a1b1e',
            panel: '#232629',
            accent: '#3daee9',
            text: '#eff0f1',
            windowBg: '#31363b',
            windowBorder: '#1d2023',
            successBorder: '#27ae60',
            successText: '#2ecc71',
            errorBorder: '#c0392b',
            errorText: '#e74c3c'
        };

        // Determine container (KCalc-like injection)
        let container = document.getElementById('app-container-itquiz');
        if (!container) container = document.body;
        
        // Clear children without innerHTML
        while(container.firstChild) container.removeChild(container.firstChild);

        // Helper to safely create DOM elements without innerHTML (Bypasses Trusted Types)
        function el(tag, props, children) {
            const e = document.createElement(tag);
            for (let k in props) {
                if (k === 'text') e.textContent = props[k];
                else if (k === 'className') e.className = props[k];
                else if (k === 'style') e.style.cssText = props[k];
                else if (k.startsWith('on') && typeof props[k] === 'function') {
                    e.addEventListener(k.substring(2).toLowerCase(), props[k]);
                } else {
                    e.setAttribute(k, props[k]);
                }
            }
            if (children) children.forEach(c => c && e.appendChild(c));
            return e;
        }

        // Main App Container
        const app = el('div', { 
            id: 'it-quiz-app',
            style: `display:flex;flex-direction:column;height:100%;width:100%;box-sizing:border-box;background-color:${kdeColors.windowBg};color:${kdeColors.text};font-family:"Noto Sans",sans-serif;user-select:none;overflow:hidden;position:absolute;top:0;left:0;` 
        });

        const mainArea = el('div', {
            style: `display:flex;flex:1;background-color:${kdeColors.windowBg};overflow-y:auto;`
        });

        // Quiz Body - Fills the window naturally
        const quizBody = el('div', {
            style: `width:100%;display:flex;flex-direction:column;`
        });

        const header = el('div', { style: `padding:16px 20px;background-color:${kdeColors.panel};border-bottom:1px solid ${kdeColors.windowBorder};display:flex;justify-content:space-between;align-items:center;flex-shrink:0;` });
        const title = el('h2', { text: 'IT & Linux Befehle Quiz', style: 'font-size:16px;font-weight:600;margin:0;' });
        
        const controls = el('div', { style: 'display:flex;gap:12px;align-items:center;' });
        
        const timerNum = el('span', { text: '03:00' });
        const timerBoard = el('div', { id: 'it-timer-board', style: `font-size:14px;color:#f39c12;font-weight:bold;padding:6px 12px;background:rgba(243,156,18,0.1);border-radius:12px;border:1px solid rgba(243,156,18,0.3);transition:all 0.3s;` }, [
            el('span', { text: '⏱ ' }), timerNum
        ]);

        const scoreNum = el('span', { text: '0000' });
        const scoreBoard = el('div', { style: `font-size:14px;color:${kdeColors.accent};font-weight:bold;padding:6px 12px;background:rgba(61,174,233,0.1);border-radius:12px;border:1px solid rgba(61,174,233,0.3);` }, [
            el('span', { text: 'Punkte: ' }), scoreNum
        ]);
        
        controls.appendChild(timerBoard);
        controls.appendChild(scoreBoard);
        header.appendChild(title);
        header.appendChild(controls);

        const contentWrapper = el('div', { style: 'display:flex;flex:1;align-items:center;justify-content:center;padding:24px;overflow-y:auto;' });
        const contentArea = el('div', { style: 'width:100%;max-width:700px;display:flex;flex-direction:column;' });
        
        const instructionText = el('div', { text: 'Wähle die richtige Antwort für die folgende Frage aus:', style: 'font-size:14px;color:#888;margin-bottom:16px;text-align:center;display:none;' });
        
        // Starts as loading text
        const questionText = el('div', { text: 'Lade Fragen...', style: `font-size:22px;font-weight:bold;color:${kdeColors.text};margin-bottom:32px;min-height:50px;text-align:center;line-height:1.4;` });
        
        const optionsContainer = el('div', { style: 'display:flex;flex-direction:column;gap:12px;margin-bottom:24px;' });
        const endScreenContainer = el('div', { style: 'display:none; width:100%; flex-direction:column; text-align:left; max-height:70vh; overflow-y:auto; padding-right:8px;' });

        contentArea.appendChild(instructionText);
        contentArea.appendChild(questionText);
        contentArea.appendChild(optionsContainer);
        contentArea.appendChild(endScreenContainer);

        contentWrapper.appendChild(contentArea);
        quizBody.appendChild(header);
        quizBody.appendChild(contentWrapper);
        mainArea.appendChild(quizBody);
        app.appendChild(mainArea);
        container.appendChild(app);

        // Ensure container takes full size naturally
        if (container === document.body) {
            document.body.style.margin = '0';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.height = '100%';
        } else {
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.position = 'relative';
        }

        function formatScore(val) {
            return (val < 0 ? '-' : '') + Math.abs(val).toString().padStart(4, '0');
        }

        function formatTime(seconds) {
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    timerNum.textContent = formatTime(timeLeft);
                    if (timeLeft <= 10) {
                        timerBoard.style.color = '#e74c3c';
                        timerBoard.style.backgroundColor = 'rgba(231,76,60,0.1)';
                        timerBoard.style.borderColor = 'rgba(231,76,60,0.3)';
                        timerBoard.style.opacity = (timeLeft % 2 === 0) ? '0.5' : '1';
                    }
                } else {
                    endQuiz();
                }
            }, 1000);
        }

        function endQuiz() {
            clearInterval(timerInterval);
            quizActive = false;
            timerBoard.style.opacity = '1';

            instructionText.style.display = 'none';
            questionText.style.display = 'none';
            optionsContainer.style.display = 'none';
            endScreenContainer.style.display = 'flex';

            // Clear without innerHTML
            while(endScreenContainer.firstChild) endScreenContainer.removeChild(endScreenContainer.firstChild);

            const headerEl = el('h3', { text: "⏱ Zeit abgelaufen! Endergebnis: " + formatScore(score), style: `color:${kdeColors.accent}; margin-bottom: 24px; text-align:center; font-size: 22px;` });
            endScreenContainer.appendChild(headerEl);

            if (answerHistory.length === 0) {
                endScreenContainer.appendChild(el('div', { text: "Keine Fragen beantwortet.", style: 'text-align:center; color:#888;' }));
            } else {
                answerHistory.forEach(record => {
                    const row = el('div', {
                        style: `display:flex; justify-content:space-between; align-items:center; padding: 14px 16px; background:${kdeColors.panel}; border-left: 4px solid ${record.isCorrect ? kdeColors.successBorder : kdeColors.errorBorder}; border-radius: 4px; margin-bottom: 8px;`
                    });

                    const leftDiv = el('div', { style: 'flex: 1; padding-right: 12px;' });
                    leftDiv.appendChild(el('strong', { text: record.question, style: `font-size: 15px; color:${kdeColors.text};` }));

                    let detailsText = `Deine Antwort: ${record.userAnswer}`;
                    
                    // Conditionally append "Richtig" only if they got it wrong
                    if (!record.isCorrect) {
                        detailsText += ` | Richtig: ${record.correctAnswer}`;
                    }

                    leftDiv.appendChild(el('div', {
                        text: detailsText,
                        style: 'color:#888; font-size: 13px; margin-top: 6px; line-height: 1.4;'
                    }));

                    const rightDiv = el('div', {
                        text: (record.points > 0 ? '+' : '') + record.points,
                        style: `font-weight:bold; font-size: 16px; color: ${record.isCorrect ? kdeColors.successText : kdeColors.errorText}; width: 60px; text-align:right; flex-shrink: 0;`
                    });

                    row.appendChild(leftDiv);
                    row.appendChild(rightDiv);
                    endScreenContainer.appendChild(row);
                });
            }
        }

        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        function loadNextQuestion() {
            if (!quizActive || rawData.length === 0) return;
            
            const randomIndex = Math.floor(Math.random() * rawData.length);
            currentQuestion = rawData[randomIndex];
            
            questionText.textContent = currentQuestion.frage;
            instructionText.style.display = 'block';
            
            // Clean up old options
            while(optionsContainer.firstChild) optionsContainer.removeChild(optionsContainer.firstChild);
            
            // Prepare answers: 1 right, 3 wrong (or fewer if dataset is small)
            let answers = [
                { text: currentQuestion.richtigeAntwort, isCorrect: true }
            ];
            
            if (currentQuestion.falscheAntworten && currentQuestion.falscheAntworten.length > 0) {
                currentQuestion.falscheAntworten.forEach(wrong => {
                    answers.push({ text: wrong, isCorrect: false });
                });
            }
            
            answers = shuffle(answers);
            
            answers.forEach(ans => {
                const btn = el('button', {
                    text: ans.text,
                    style: `padding:14px 16px; background-color:${kdeColors.panel}; border:1px solid ${kdeColors.windowBorder}; color:${kdeColors.text}; border-radius:6px; font-size:14px; font-weight:500; cursor:pointer; text-align:left; transition:all 0.15s; line-height:1.4;`,
                    onmouseenter: function() {
                        this.style.borderColor = kdeColors.accent;
                        this.style.backgroundColor = 'rgba(61,174,233,0.15)';
                    },
                    onmouseleave: function() {
                        this.style.borderColor = kdeColors.windowBorder;
                        this.style.backgroundColor = kdeColors.panel;
                    },
                    onclick: () => handleAnswer(ans.text, ans.isCorrect, currentQuestion.richtigeAntwort)
                });
                optionsContainer.appendChild(btn);
            });
        }

        function handleAnswer(selectedText, isCorrect, correctText) {
            if (!quizActive) return;
            
            const pointsChange = isCorrect ? 25 : -20;
            score += pointsChange;
            scoreNum.textContent = formatScore(score);
            
            // Log the answer
            answerHistory.push({
                question: currentQuestion.frage,
                userAnswer: selectedText,
                correctAnswer: correctText,
                points: pointsChange,
                isCorrect: isCorrect
            });
            
            // Auto-advance without waiting
            loadNextQuestion();
        }

        function fetchQuestionsAndStart() {
            fetch('resources/quiz/itquestions.json')
                .then(response => {
                    if (!response.ok) throw new Error("HTTP Status " + response.status);
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        rawData = data;
                        quizActive = true;
                        loadNextQuestion();
                        startTimer();
                    } else {
                        questionText.textContent = "Die geladenen Fragen sind leer oder fehlerhaft formatiert.";
                    }
                })
                .catch(error => {
                    console.error("IT Quiz Fetch Error:", error);
                    questionText.textContent = "Fehler beim Laden der Fragen. Bitte überprüfe, ob 'resources/quiz/itquestions.json' existiert.";
                    questionText.style.color = kdeColors.errorText;
                });
        }

        // Initialize Fetch Sequence
        fetchQuestionsAndStart();

    })();
})();