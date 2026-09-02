(function() {
    "use strict";

    // Register the package for the external desktop environment
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['quizmasswrapper'] = {
            name: 'Quiz Master',
            version: '2.6.0',
            description: 'Dynamic Quiz App Wrapper with Colored Gravity Debris and Vacuum Score Animation',
            preInstalledOn: ['default'],
            commands: {
                quiz: function(args) {
                    if (typeof window.launchApp === 'function') {
                        window.launchApp('quizmasswrapper');
                    } else {
                        console.log("Quiz Master invoked.");
                    }
                }
            },
            commandInfo: {
                quiz: "what is this command?\nquiz\n\nwhat is it used for?\nOpens the Quiz Master application."
            }
        };
    }

    // Execute immediately when script loads
    (function init() {
        if (typeof document === 'undefined' || !document.body) return;

        // Prevent double initialization
        if (document.getElementById('quiz-master-app')) return;

        // Configuration
        const quizFiles = ['zufälligeFragen.json','windowsSicherheit.json','windowsKommandozeile.json', 'windowsNetzwerk.json', 'hyper-v.json'];
        
        let rawData = [];
        let score = 0;
        let displayedScore = 0;
        let currentQuestion = null;
        
        let globalTimeLeft = 180; // 3 minutes
        let globalTimerInterval = null;
        
        let questionTimeLeft = 30; // 30 seconds per question
        let questionTimerInterval = null;
        
        let quizActive = false;
        let isZenMode = false;
        let answerHistory = [];

        // Production Minigame state variables
        let questionsSinceLastProductionEvent = 0;
        let nextProductionEventThreshold = Math.floor(Math.random() * 9) + 7; // Random between 7 and 15
        let productionQuestionsData = null;
        let scoreMultiplier = 1;
        let multiplierTimeLeft = 0;
        let multiplierInterval = null;

        // KDE default dark theme colors
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

        let container = document.getElementById('app-container-quizmasswrapper');
        if (!container) container = document.body;
        while(container.firstChild) container.removeChild(container.firstChild);

        // Helper Fisher-Yates shuffle algorithm
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        // Safely create DOM elements
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

        const app = el('div', { 
            id: 'quiz-master-app',
            style: `display:flex;flex-direction:column;height:100%;width:100%;box-sizing:border-box;background-color:${kdeColors.bg};color:${kdeColors.text};font-family:"Noto Sans",sans-serif;user-select:none;overflow:hidden;position:absolute;top:0;left:0;` 
        });

        const mainArea = el('div', { style: `display:flex;flex:1;background-color:${kdeColors.bg};overflow-y:auto;position:relative;` });
        const quizBody = el('div', { style: `width:100%;display:flex;flex-direction:column;` });
        const header = el('div', { style: `padding:16px 20px;background-color:${kdeColors.panel};border-bottom:1px solid ${kdeColors.windowBorder};display:grid;grid-template-columns:1fr auto 1fr;align-items:center;flex-shrink:0;` });
        
        const leftControls = el('div', { style: 'display:flex;justify-content:flex-start;' });
        const title = el('h2', { text: 'Quiz Master', style: 'font-size:16px;font-weight:600;margin:0;text-align:center;' });
        const rightControls = el('div', { style: 'display:flex;justify-content:flex-end;gap:12px;align-items:center;' });
        
        // Zen Mode Button
        const zenModeBtn = el('button', {
            text: 'Zen Mode',
            style: `padding:6px 12px; background-color:transparent; border:1px solid ${kdeColors.windowBorder}; color:${kdeColors.text}; border-radius:12px; cursor:pointer; font-weight:bold; font-size:12px; transition:all 0.2s;`,
            onclick: function() {
                isZenMode = !isZenMode;
                if (isZenMode) {
                    this.style.backgroundColor = kdeColors.accent;
                    this.style.color = '#000';
                    this.style.borderColor = kdeColors.accent;
                } else {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = kdeColors.text;
                    this.style.borderColor = kdeColors.windowBorder;
                }
            }
        });

        // Back Button
        const backBtn = el('button', {
            text: '← Zurück',
            style: `display:none; padding:6px 12px; background-color:transparent; border:1px solid ${kdeColors.windowBorder}; color:${kdeColors.text}; border-radius:12px; cursor:pointer; font-weight:bold; font-size:12px; transition:all 0.2s;`,
            onclick: () => resetToTopicSelection(),
            onmouseenter: function() { this.style.backgroundColor = 'rgba(255,255,255,0.1)'; },
            onmouseleave: function() { this.style.backgroundColor = 'transparent'; }
        });

        // End Quiz Button
        const endQuizBtn = el('button', {
            text: 'Quiz beenden',
            style: `display:none; padding:6px 12px; background-color:transparent; border:1px solid ${kdeColors.errorBorder}; color:${kdeColors.errorText}; border-radius:12px; cursor:pointer; font-weight:bold; font-size:12px; transition:all 0.2s;`,
            onclick: () => endQuiz(),
            onmouseenter: function() { this.style.backgroundColor = 'rgba(231,76,60,0.1)'; },
            onmouseleave: function() { this.style.backgroundColor = 'transparent'; }
        });

        leftControls.appendChild(backBtn);
        rightControls.appendChild(zenModeBtn);
        rightControls.appendChild(endQuizBtn);
        
        header.appendChild(leftControls);
        header.appendChild(title);
        header.appendChild(rightControls);

        const timerNum = el('span', { text: '03:00' });
        const timerBoard = el('div', { style: `display:flex;font-size:16px;color:#f39c12;font-weight:bold;padding:8px 16px;background:rgba(243,156,18,0.1);border-radius:16px;border:1px solid rgba(243,156,18,0.3);transition:all 0.3s;` }, [
            el('span', { text: '⏱ ' }), timerNum
        ]);

        const scoreNum = el('span', { text: '0000' });
        const scoreBoard = el('div', { style: `font-size:20px;color:${kdeColors.accent};font-weight:bold;padding:10px 24px;background:rgba(61,174,233,0.1);border-radius:16px;border:1px solid rgba(61,174,233,0.3);` }, [
            el('span', { text: 'Score: ' }), scoreNum
        ]);

        const multiplierBadge = el('div', {
            style: `display:none; align-items:center; gap:6px; font-size:13px; font-weight:bold; color:#f1c40f; background:rgba(241,196,15,0.15); padding:6px 14px; border-radius:16px; border:1px solid rgba(241,196,15,0.4);`
        });
        const multiplierText = el('span', { text: '2x Multiplier (60s)' });
        multiplierBadge.appendChild(multiplierText);

        const statsContainer = el('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:12px;margin-bottom:24px;width:100%;' });
        statsContainer.appendChild(scoreBoard);
        statsContainer.appendChild(timerBoard);
        statsContainer.appendChild(multiplierBadge);

        const contentWrapper = el('div', { style: 'display:flex;flex:1;align-items:center;justify-content:center;padding:24px;overflow-y:auto;position:relative;' });
        
        // View 1: Topic Selection
        const topicContainer = el('div', { style: 'width:100%; max-width:600px; display:flex; flex-direction:column; gap:16px; align-items:center;' });
        const topicTitle = el('h3', { text: 'Wähle ein Quiz-Thema:', style: 'font-size:20px; margin-bottom:16px;' });
        const topicGrid = el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:16px; width:100%;' });

        function formatTopicName(filename) {
            let name = filename.replace(/\.json$/i, ''); 
            if (name.toLowerCase() === 'hyper-v') {
                return 'Hyper-V';
            }
            name = name.replace(/([a-z])([A-Z])/g, '$1 $2'); 
            name = name.charAt(0).toUpperCase() + name.slice(1); 
            return name;
        }

        const randomizedQuizFiles = shuffle([...quizFiles]);

        randomizedQuizFiles.forEach(file => {
            const btn = el('button', {
                text: formatTopicName(file),
                style: `padding:24px; background-color:${kdeColors.panel}; border:1px solid ${kdeColors.windowBorder}; color:${kdeColors.text}; border-radius:8px; cursor:pointer; font-size:16px; font-weight:bold; transition:all 0.2s;`,
                onmouseenter: function() { this.style.borderColor = kdeColors.accent; this.style.backgroundColor = 'rgba(61,174,233,0.1)'; },
                onmouseleave: function() { this.style.borderColor = kdeColors.windowBorder; this.style.backgroundColor = kdeColors.panel; },
                onclick: () => fetchQuestionsAndStart(file)
            });
            topicGrid.appendChild(btn);
        });

        topicContainer.appendChild(topicTitle);
        topicContainer.appendChild(topicGrid);

        // View 2: Quiz Gameplay
        const contentArea = el('div', { style: 'width:100%;max-width:700px;display:none;flex-direction:column;align-items:stretch;' });
        
        const categoryBadge = el('div', { style: `align-self:center; font-size:12px; font-weight:bold; color:${kdeColors.accent}; background:rgba(61,174,233,0.1); padding:4px 8px; border-radius:4px; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;` });
        
        const questionTimerBarContainer = el('div', { style: `width:100%; height:4px; background-color:${kdeColors.panel}; border-radius:2px; margin-bottom:24px; overflow:hidden;` });
        const questionTimerBar = el('div', { style: `height:100%; width:100%; background-color:${kdeColors.accent}; transition:width 0.1s linear, background-color 0.3s;` });
        questionTimerBarContainer.appendChild(questionTimerBar);

        const questionText = el('div', { text: '', style: `font-size:20px;font-weight:bold;color:${kdeColors.text};margin-bottom:32px;text-align:center;line-height:1.4;` });
        const optionsContainer = el('div', { style: 'display:flex;flex-direction:column;gap:12px;margin-bottom:24px;' });
        const endScreenContainer = el('div', { style: 'display:none; width:100%; flex-direction:column; text-align:left; max-height:60vh; overflow-y:auto; padding-right:8px;' });

        contentArea.appendChild(statsContainer);
        contentArea.appendChild(categoryBadge);
        contentArea.appendChild(questionTimerBarContainer);
        contentArea.appendChild(questionText);
        contentArea.appendChild(optionsContainer);
        contentArea.appendChild(endScreenContainer);

        contentWrapper.appendChild(topicContainer);
        contentWrapper.appendChild(contentArea);
        quizBody.appendChild(header);
        quizBody.appendChild(contentWrapper);
        mainArea.appendChild(quizBody);
        app.appendChild(mainArea);
        container.appendChild(app);

        // Preload Production Questions JSON
        fetch('resources/quiz/productionQuestions.json')
            .then(res => res.json())
            .then(data => { productionQuestionsData = data; })
            .catch(err => console.log('Could not load productionQuestions.json', err));

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
            const s = Math.floor(seconds % 60);
            return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }

        // Physics Explosion (1s) followed by Vacuum Animation + Gravity-only debris
        function physicsExplosionThenVacuum(buttonEl, pointsToAdd) {
            if (!buttonEl) return;
            const rect = buttonEl.getBoundingClientRect();
            const scoreRect = scoreBoard.getBoundingClientRect();
            const targetX = scoreRect.left + scoreRect.width / 2;
            const targetY = scoreRect.top + scoreRect.height / 2;

            const totalParticles = 20;
            let finishedCount = 0;
            const pointsPerParticle = pointsToAdd / totalParticles;

            // 1. Vacuum Score Particles (Green / Gold)
            for (let i = 0; i < totalParticles; i++) {
                const particle = document.createElement('div');
                const isTopBottom = Math.random() > 0.5;
                let startX, startY;
                if (isTopBottom) {
                    startX = rect.left + Math.random() * rect.width;
                    startY = Math.random() > 0.5 ? rect.top : rect.bottom;
                } else {
                    startX = Math.random() > 0.5 ? rect.left : rect.right;
                    startY = rect.top + Math.random() * rect.height;
                }

                particle.style.position = 'fixed';
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.backgroundColor = scoreMultiplier > 1 ? '#f1c40f' : (kdeColors.successText || '#2ecc71');
                particle.style.borderRadius = '2px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                document.body.appendChild(particle);

                const vx = (Math.random() - 0.5) * 300;
                const vy = (Math.random() * -250) - 80;
                const peakX = startX + vx;
                const peakY = startY + vy + 120;

                const phase1Anim = particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${vx * 0.5}px, ${vy * 0.5}px) scale(1.2)`, opacity: 0.9 },
                    { transform: `translate(${peakX - startX}px, ${peakY - startY}px) scale(1)`, opacity: 0.8 }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)'
                });

                phase1Anim.onfinish = () => {
                    const currentRect = particle.getBoundingClientRect();
                    const currentX = currentRect.left;
                    const currentY = currentRect.top;

                    const dx = targetX - currentX;
                    const dy = targetY - currentY;

                    const phase2Anim = particle.animate([
                        { transform: 'translate(0, 0) scale(1)', opacity: 0.8 },
                        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 40}px) scale(1.3)`, opacity: 0.6 },
                        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.1 }
                    ], {
                        duration: 450 + Math.random() * 200,
                        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                        fill: 'forwards'
                    });

                    phase2Anim.onfinish = () => {
                        particle.remove();
                        displayedScore += pointsPerParticle;
                        scoreNum.textContent = formatScore(Math.round(displayedScore));
                        
                        finishedCount++;
                        if (finishedCount === totalParticles) {
                            displayedScore = score;
                            scoreNum.textContent = formatScore(score);
                            scoreBoard.animate([
                                { transform: 'scale(1)', backgroundColor: 'rgba(61,174,233,0.1)' },
                                { transform: 'scale(1.12)', backgroundColor: 'rgba(46,204,113,0.35)' },
                                { transform: 'scale(1)', backgroundColor: 'rgba(61,174,233,0.1)' }
                            ], { duration: 250 });
                        }
                    };
                };
            }

            // 2. Randomly Colored Gravity-Only Debris Pixels
            const randomColors = ['#e74c3c', '#3498db', '#9b59b6', '#e67e22', '#1abc9c', '#f1c40f', '#e91e63'];
            const debrisCount = 15;

            for (let d = 0; d < debrisCount; d++) {
                const debris = document.createElement('div');
                const startX = rect.left + rect.width / 2;
                const startY = rect.top + rect.height / 2;

                debris.style.position = 'fixed';
                debris.style.left = startX + 'px';
                debris.style.top = startY + 'px';
                debris.style.width = '5px';
                debris.style.height = '5px';
                debris.style.backgroundColor = randomColors[Math.floor(Math.random() * randomColors.length)];
                debris.style.borderRadius = '2px';
                debris.style.pointerEvents = 'none';
                debris.style.zIndex = '9998';
                document.body.appendChild(debris);

                const dvx = (Math.random() - 0.5) * 350;
                const dvy = (Math.random() * -300) - 100;
                const steps = 25;
                const keyframes = [];
                let curX = 0;
                let curY = 0;
                let currentVy = dvy;
                const gravity = 38;

                for (let s = 0; s <= steps; s++) {
                    keyframes.push({
                        transform: `translate(${curX}px, ${curY}px) scale(${1 - s / (steps * 1.3)})`,
                        opacity: 1 - (s / steps)
                    });
                    curX += dvx / steps;
                    curY += currentVy / steps;
                    currentVy += gravity;
                }

                const debrisAnim = debris.animate(keyframes, {
                    duration: 800 + Math.random() * 400,
                    easing: 'linear',
                    fill: 'forwards'
                });

                debrisAnim.onfinish = () => debris.remove();
            }
        }

        function spawnWrongParticles(buttonEl) {
            if (!buttonEl) return;
            const rect = buttonEl.getBoundingClientRect();
            
            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                const isTopBottom = Math.random() > 0.5;
                let startX, startY;
                if (isTopBottom) {
                    startX = rect.left + Math.random() * rect.width;
                    startY = Math.random() > 0.5 ? rect.top : rect.bottom;
                } else {
                    startX = Math.random() > 0.5 ? rect.left : rect.right;
                    startY = rect.top + Math.random() * rect.height;
                }

                particle.style.position = 'fixed';
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.backgroundColor = kdeColors.errorText || '#e74c3c';
                particle.style.borderRadius = '2px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                document.body.appendChild(particle);

                const keyframes = [];
                const steps = 15;
                const vx = (Math.random() - 0.5) * 350; 
                let vy = (Math.random() - 250) - 100;  
                const gravity = 35; 
                
                let currentX = 0;
                let currentY = 0;
                
                for (let j = 0; j <= steps; j++) {
                    keyframes.push({
                        transform: `translate(${currentX}px, ${currentY}px) scale(${1 - j/(steps * 1.5)})`,
                        opacity: 1 - (j/steps)
                    });
                    currentX += vx / steps;
                    currentY += vy / steps;
                    vy += gravity; 
                }

                const anim = particle.animate(keyframes, {
                    duration: 500 + Math.random() * 300,
                    easing: 'linear',
                    fill: 'forwards'
                });

                anim.onfinish = () => particle.remove();
            }
        }

        function resetToTopicSelection() {
            clearInterval(globalTimerInterval);
            clearInterval(questionTimerInterval);
            clearInterval(multiplierInterval);
            quizActive = false;
            scoreMultiplier = 1;
            multiplierTimeLeft = 0;
            multiplierBadge.style.display = 'none';
            
            contentArea.style.display = 'none';
            backBtn.style.display = 'none';
            endQuizBtn.style.display = 'none';
            
            topicContainer.style.display = 'flex';
            zenModeBtn.style.display = 'block';
        }

        function startGlobalTimer() {
            if (globalTimerInterval) clearInterval(globalTimerInterval);
            globalTimerInterval = setInterval(() => {
                if (globalTimeLeft > 0) {
                    globalTimeLeft--;
                    timerNum.textContent = formatTime(globalTimeLeft);
                    if (globalTimeLeft <= 10) {
                        timerBoard.style.color = '#e74c3c';
                        timerBoard.style.backgroundColor = 'rgba(231,76,60,0.1)';
                        timerBoard.style.borderColor = 'rgba(231,76,60,0.3)';
                        timerBoard.style.opacity = (globalTimeLeft % 2 === 0) ? '0.5' : '1';
                    } else {
                        timerBoard.style.color = '#f39c12';
                        timerBoard.style.backgroundColor = 'rgba(243,156,18,0.1)';
                        timerBoard.style.borderColor = 'rgba(243,156,18,0.3)';
                        timerBoard.style.opacity = '1';
                    }
                } else {
                    endQuiz();
                }
            }, 1000);
        }

        function resetQuestionTimer() {
            if (questionTimerInterval) clearInterval(questionTimerInterval);
            questionTimeLeft = 30;
            
            if (isZenMode) return; 

            const updateQuestionTimerUI = () => {
                const pct = (questionTimerBarContainer.style.display === 'none') ? 100 : (questionTimeLeft / 30) * 100;
                questionTimerBar.style.width = `${Math.max(0, pct)}%`;
                if (questionTimeLeft <= 5) {
                    questionTimerBar.style.backgroundColor = kdeColors.errorText;
                } else if (questionTimeLeft <= 10) {
                    questionTimerBar.style.backgroundColor = '#f39c12';
                } else {
                    questionTimerBar.style.backgroundColor = kdeColors.accent;
                }
            };

            updateQuestionTimerUI();
            questionTimerInterval = setInterval(() => {
                questionTimeLeft -= 0.1;
                updateQuestionTimerUI();
                if (questionTimeLeft <= 0) {
                    clearInterval(questionTimerInterval);
                    handleTimeout();
                }
            }, 100);
        }

        function handleTimeout() {
            score -= 20;
            displayedScore = score;
            scoreNum.textContent = formatScore(score);
            answerHistory.push({
                question: currentQuestion.frage,
                userAnswer: "Zeit abgelaufen",
                correctAnswer: currentQuestion.richtigeAntwort,
                points: -20,
                isCorrect: false
            });
            checkAndTriggerProductionEvent();
            loadNextQuestion();
        }

        function endQuiz() {
            clearInterval(globalTimerInterval);
            clearInterval(questionTimerInterval);
            clearInterval(multiplierInterval);
            quizActive = false;
            scoreMultiplier = 1;
            multiplierBadge.style.display = 'none';
            
            endQuizBtn.style.display = 'none';
            statsContainer.style.display = 'none'; 
            questionTimerBarContainer.style.display = 'none';
            categoryBadge.style.display = 'none';
            questionText.style.display = 'none';
            optionsContainer.style.display = 'none';
            
            endScreenContainer.style.display = 'flex';
            while(endScreenContainer.firstChild) endScreenContainer.removeChild(endScreenContainer.firstChild);

            const headerEl = el('h3', { text: "⏱ Spiel beendet! Endergebnis: " + formatScore(score), style: `color:${kdeColors.accent}; margin-bottom: 24px; text-align:center; font-size: 22px;` });
            endScreenContainer.appendChild(headerEl);

            if (answerHistory.length === 0) {
                endScreenContainer.appendChild(el('div', { text: "Keine Fragen beantwortet.", style: 'text-align:center; color:#888;' }));
            } else {
                answerHistory.forEach(record => {
                    const row = el('div', {
                        style: `display:flex; justify-content:space-between; align-items:center; padding: 14px 16px; background:${kdeColors.panel}; border-left: 4px solid ${record.isCorrect ? kdeColors.successBorder : kdeColors.errorBorder}; border-radius: 4px; margin-bottom: 8px;`
                    });

                    const leftDiv = el('div', { style: 'flex: 1; padding-right: 12px;' });
                    leftDiv.appendChild(el('strong', { text: record.question, style: `font-size: 15px; color:${kdeColors.text}; line-height:1.4; display:block; margin-bottom:4px;` }));

                    let detailsText = `Deine Antwort: ${record.userAnswer}`;
                    if (!record.isCorrect) {
                        detailsText += ` | Richtig: ${record.correctAnswer}`;
                    }

                    leftDiv.appendChild(el('div', {
                        text: detailsText,
                        style: 'color:#888; font-size: 13px; line-height: 1.4;'
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

        // --- Production Factor Pop-up Minigame Logic with 10s Timer ---
        function checkAndTriggerProductionEvent() {
            questionsSinceLastProductionEvent++;
            if (questionsSinceLastProductionEvent >= nextProductionEventThreshold) {
                questionsSinceLastProductionEvent = 0;
                nextProductionEventThreshold = Math.floor(Math.random() * 9) + 7;
                triggerProductionModal();
            }
        }

        function triggerProductionModal() {
            if (!productionQuestionsData || !productionQuestionsData.categories) return;

            if (questionTimerInterval) clearInterval(questionTimerInterval);

            const categoriesKeys = Object.keys(productionQuestionsData.categories);
            const randomCatKey = categoriesKeys[Math.floor(Math.random() * categoriesKeys.length)];
            const catObj = productionQuestionsData.categories[randomCatKey];
            const randomExample = catObj.examples[Math.floor(Math.random() * catObj.examples.length)];

            const modalOverlay = el('div', {
                style: 'position:absolute; inset:0; background:rgba(0,0,0,0.85); z-index:1000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); padding:20px;'
            });

            const modalBox = el('div', {
                style: `background:${kdeColors.windowBg}; border:1px solid ${kdeColors.accent}; border-radius:12px; width:100%; max-width:480px; padding:24px; display:flex; flex-direction:column; box-shadow:0 10px 30px rgba(0,0,0,0.8);`
            });

            const popTimerBarContainer = el('div', { style: `width:100%; height:4px; background-color:${kdeColors.panel}; border-radius:2px; margin-bottom:16px; overflow:hidden;` });
            const popTimerBar = el('div', { style: `height:100%; width:100%; background-color:#f1c40f; transition:width 0.1s linear;` });
            popTimerBarContainer.appendChild(popTimerBar);

            modalBox.appendChild(popTimerBarContainer);
            modalBox.appendChild(el('div', {
                text: '⚡ BONUS-HERAUSFORDERUNG (10s) ⚡',
                style: `font-size:14px; font-weight:bold; color:#f1c40f; text-transform:uppercase; margin-bottom:8px; text-align:center; letter-spacing:0.05em;`
            }));

            modalBox.appendChild(el('div', {
                text: `Zu welcher Produktionsfaktor-Kategorie gehört folgendes Beispiel?`,
                style: `font-size:13px; color:#aaa; text-align:center; margin-bottom:12px;`
            }));

            modalBox.appendChild(el('div', {
                text: `„${randomExample}”`,
                style: `font-size:20px; font-weight:bold; color:${kdeColors.text}; text-align:center; background:rgba(61,174,233,0.1); border:1px solid rgba(61,174,233,0.3); border-radius:8px; padding:16px; margin-bottom:20px;`
            }));

            const btnContainer = el('div', { style: 'display:flex; flex-direction:column; gap:10px;' });

            let popInterval = null;
            let popTimeLeft = 10.0;

            const closeModalAndResume = (message, isSuccess) => {
                if (popInterval) clearInterval(popInterval);
                modalOverlay.remove();
                if (message) {
                    showBannerNotification(message, isSuccess);
                }
                resetQuestionTimer();
            };

            categoriesKeys.forEach(catKey => {
                const categoryNameDe = productionQuestionsData.categories[catKey].name_de || catKey;
                const optionBtn = el('button', {
                    text: `${catKey} (${categoryNameDe})`,
                    style: `padding:14px; background:${kdeColors.panel}; border:1px solid ${kdeColors.windowBorder}; color:${kdeColors.text}; border-radius:6px; font-weight:bold; font-size:15px; cursor:pointer; text-align:left; transition:all 0.2s;`,
                    onmouseenter: function() { this.style.borderColor = kdeColors.accent; this.style.backgroundColor = 'rgba(61,174,233,0.15)'; },
                    onmouseleave: function() { this.style.borderColor = kdeColors.windowBorder; this.style.backgroundColor = kdeColors.panel; },
                    onclick: function() {
                        if (catKey === randomCatKey) {
                            applyScoreMultiplier();
                            closeModalAndResume("Richtig! 2x Score Multiplier aktiv für 60 Sekunden!", true);
                        } else {
                            closeModalAndResume(`Falsch! Es gehört zu ${randomCatKey} (${categoryNameDe}).`, false);
                        }
                    }
                });
                btnContainer.appendChild(optionBtn);
            });

            modalBox.appendChild(btnContainer);
            modalOverlay.appendChild(modalBox);
            contentWrapper.appendChild(modalOverlay);

            popInterval = setInterval(() => {
                popTimeLeft -= 0.1;
                const pct = (popTimeLeft / 10.0) * 100;
                popTimerBar.style.width = `${Math.max(0, pct)}%`;
                
                if (popTimeLeft <= 3.0) {
                    popTimerBar.style.backgroundColor = kdeColors.errorText;
                }

                if (popTimeLeft <= 0) {
                    closeModalAndResume("Zeit abgelaufen für die Bonus-Herausforderung!", false);
                }
            }, 100);
        }

        function applyScoreMultiplier() {
            scoreMultiplier *= 2;
            multiplierTimeLeft = 60;
            multiplierBadge.style.display = 'flex';
            multiplierText.textContent = `${scoreMultiplier}x Multiplier (${multiplierTimeLeft}s)`;

            if (multiplierInterval) clearInterval(multiplierInterval);
            multiplierInterval = setInterval(() => {
                multiplierTimeLeft--;
                if (multiplierTimeLeft > 0) {
                    multiplierText.textContent = `${scoreMultiplier}x Multiplier (${multiplierTimeLeft}s)`;
                } else {
                    clearInterval(multiplierInterval);
                    scoreMultiplier = 1;
                    multiplierBadge.style.display = 'none';
                }
            }, 1000);
        }

        function showBannerNotification(text, isSuccess) {
            const banner = el('div', {
                text: text,
                style: `position:absolute; top:20px; left:50%; transform:translateX(-50%); background:${isSuccess ? 'rgba(39, 174, 96, 0.95)' : 'rgba(192, 57, 43, 0.95)'}; color:#fff; padding:12px 24px; border-radius:8px; font-weight:bold; font-size:14px; z-index:1100; box-shadow:0 4px 12px rgba(0,0,0,0.4); text-align:center;`
            });
            contentWrapper.appendChild(banner);
            setTimeout(() => banner.remove(), 3500);
        }
        // ----------------------------------------------------

        function handleAnswer(selectedText, isCorrect, correctText, btnEl) {
            if (!quizActive) return;
            
            let pointsEarned = 0;
            if (isCorrect) {
                pointsEarned = 25 * scoreMultiplier;
                score += pointsEarned;
                physicsExplosionThenVacuum(btnEl, pointsEarned); // Physics explosion + vacuum + colored gravity debris
                
                let timeBonus = 0;
                if (currentQuestion.schwierigkeit === 'leicht') timeBonus = 7;
                else if (currentQuestion.schwierigkeit === 'mittel') timeBonus = 13;
                else if (currentQuestion.schwierigkeit === 'schwer') timeBonus = 17;
                
                if (!isZenMode && timeBonus > 0) {
                    globalTimeLeft += timeBonus;
                    timerNum.textContent = formatTime(globalTimeLeft);
                }
            } else {
                spawnWrongParticles(btnEl);
                pointsEarned = -20;
                score += pointsEarned;
                displayedScore = score;
                scoreNum.textContent = formatScore(score); // Instantly update for penalties
                
                let timePenalty = 0;
                if (currentQuestion.schwierigkeit === 'leicht') timePenalty = 6;
                else if (currentQuestion.schwierigkeit === 'mittel') timePenalty = 3;
                else if (currentQuestion.schwierigkeit === 'schwer') timePenalty = 2;
                
                if (!isZenMode && timePenalty > 0) {
                    globalTimeLeft -= timePenalty;
                    if (globalTimeLeft <= 0) globalTimeLeft = 0;
                    timerNum.textContent = formatTime(globalTimeLeft);
                    
                    if (globalTimeLeft === 0) {
                        scoreNum.textContent = formatScore(score);
                        answerHistory.push({
                            question: currentQuestion.frage,
                            userAnswer: selectedText,
                            correctAnswer: correctText,
                            points: pointsEarned,
                            isCorrect: false
                        });
                        endQuiz();
                        return;
                    }
                }
            }
            
            answerHistory.push({
                question: currentQuestion.frage,
                userAnswer: selectedText,
                correctAnswer: correctText,
                points: pointsEarned,
                isCorrect: isCorrect
            });
            
            checkAndTriggerProductionEvent();
            loadNextQuestion();
        }

        function loadNextQuestion() {
            if (!quizActive || rawData.length === 0) return;
            
            const randomIndex = Math.floor(Math.random() * rawData.length);
            currentQuestion = rawData[randomIndex];
            
            if (currentQuestion.kategorie) {
                categoryBadge.style.display = 'block';
                categoryBadge.textContent = currentQuestion.kategorie;
            } else {
                categoryBadge.style.display = 'none';
            }

            questionText.textContent = currentQuestion.frage;
            while(optionsContainer.firstChild) optionsContainer.removeChild(optionsContainer.firstChild);
            
            let answers = [{ text: currentQuestion.richtigeAntwort, isCorrect: true }];
            if (currentQuestion.falscheAntworten && currentQuestion.falscheAntworten.length > 0) {
                let shuffledWrongs = shuffle([...currentQuestion.falscheAntworten]).slice(0, 3);
                shuffledWrongs.forEach(wrong => {
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
                    onclick: function() { handleAnswer(ans.text, ans.isCorrect, currentQuestion.richtigeAntwort, this); }
                });
                optionsContainer.appendChild(btn);
            });

            resetQuestionTimer();
        }

        function fetchQuestionsAndStart(fileName) {
            globalTimeLeft = 180;
            score = 0;
            displayedScore = 0;
            scoreMultiplier = 1;
            multiplierTimeLeft = 0;
            multiplierBadge.style.display = 'none';
            questionsSinceLastProductionEvent = 0;
            nextProductionEventThreshold = Math.floor(Math.random() * 9) + 7;

            scoreNum.textContent = formatScore(score);
            timerNum.textContent = formatTime(globalTimeLeft);
            answerHistory = [];

            timerBoard.style.color = '#f39c12';
            timerBoard.style.backgroundColor = 'rgba(243,156,18,0.1)';
            timerBoard.style.borderColor = 'rgba(243,156,18,0.3)';
            timerBoard.style.opacity = '1';

            topicContainer.style.display = 'none';
            zenModeBtn.style.display = 'none';
            
            backBtn.style.display = 'block';
            contentArea.style.display = 'flex';
            statsContainer.style.display = 'flex';
            
            categoryBadge.style.display = 'none';
            questionText.style.display = 'block';
            optionsContainer.style.display = 'flex';
            endScreenContainer.style.display = 'none';
            
            if (isZenMode) {
                timerBoard.style.display = 'none';
                questionTimerBarContainer.style.display = 'none';
                endQuizBtn.style.display = 'block';
            } else {
                timerBoard.style.display = 'flex';
                questionTimerBarContainer.style.display = 'block';
                endQuizBtn.style.display = 'none';
            }

            questionText.textContent = "Lade Fragen...";

            fetch(`resources/quiz/${fileName}`)
                .then(response => {
                    if (!response.ok) throw new Error("HTTP Status " + response.status);
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        rawData = data;
                        quizActive = true;
                        loadNextQuestion();
                        if (!isZenMode) startGlobalTimer();
                    } else {
                        questionText.textContent = "Die geladenen Fragen sind leer oder fehlerhaft formatiert.";
                    }
                })
                .catch(error => {
                    console.error("Quiz Fetch Error:", error);
                    questionText.textContent = `Fehler beim Laden von 'resources/quiz/${fileName}'.`;
                    questionText.style.color = kdeColors.errorText;
                });
        }

    })();
})();