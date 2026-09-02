(function() {
    "use strict";

    // Register the package for the external desktop environment
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['factorsquiz'] = {
            name: 'Factors of Production Quiz',
            version: '1.0.0',
            description: 'Economics Quiz Game',
            preInstalledOn: ['default'],
            commands: {
                factorsquiz: function(args) {
                    if (typeof window.launchApp === 'function') {
                        window.launchApp('factorsquiz');
                    } else {
                        console.log("Factors Quiz invoked.");
                    }
                }
            },
            commandInfo: {
                factorsquiz: "what is this command?\nfactorsquiz\n\nwhat is it used for?\nOpens the 3 Factors of Production Quiz app."
            }
        };
    }

    // Execute immediately when script loads
    (function init() {
        if (typeof document === 'undefined' || !document.body) return;

        // Prevent double initialization
        if (document.getElementById('factors-quiz-app')) return;

        const rawData = {
          "categories": {
            "Land": {
              "name_en": "Land", "name_de": "Boden",
              "description_en": "Natural resources and location-based factors used in production.",
              "description_de": "Natürliche Ressourcen und standortbezogene Faktoren, die bei der Produktion genutzt werden.",
              "examples": [
                { "en": "Iron ore", "de": "Eisenerz" }, { "en": "Coal", "de": "Kohle" }, { "en": "Crude oil", "de": "Rohöl" },
                { "en": "Natural gas", "de": "Erdgas" }, { "en": "Water (rivers, lakes, groundwater)", "de": "Wasser (Flüsse, Seen, Grundwasser)" },
                { "en": "Solar energy", "de": "Sonnenenergie" }, { "en": "Wind energy", "de": "Windenergie" },
                { "en": "Geothermal energy", "de": "Geothermie / Erdwärme" }, { "en": "Agricultural land / fields", "de": "Ackerland / Felder" },
                { "en": "Forests / timber", "de": "Wälder / Holz" }, { "en": "Fish stocks in oceans", "de": "Fischbestände in den Ozeanen" },
                { "en": "Minerals (gold, silver, copper)", "de": "Mineralien (Gold, Silber, Kupfer)" }
              ]
            },
            "Labor": {
              "name_en": "Labor", "name_de": "Arbeit",
              "description_en": "Human physical and mental work applied in production.",
              "description_de": "Körperliche und geistige Leistung von Menschen, die in der Produktion eingesetzt wird.",
              "examples": [
                { "en": "Machine operator", "de": "Maschinenbediener" }, { "en": "Steelworker at a blast furnace", "de": "Stahlarbeiter am Hochofen" },
                { "en": "Truck driver", "de": "Lkw-Fahrer" }, { "en": "Warehouse worker", "de": "Lagerarbeiter" },
                { "en": "Construction worker", "de": "Bauarbeiter" }, { "en": "Software developer", "de": "Softwareentwickler" },
                { "en": "Teacher", "de": "Lehrer" }, { "en": "Doctor", "de": "Arzt" }, { "en": "Farmer", "de": "Bauer / Landwirt" }
              ]
            },
            "Kapital": {
              "name_en": "Capital", "name_de": "Kapital",
              "description_en": "Man-made production goods used to produce other goods or services.",
              "description_de": "Hergestellte Produktionsmittel, die zur Herstellung weiterer Güter oder Dienstleistungen genutzt werden.",
              "examples": [
                { "en": "Blast furnace", "de": "Hochofen" }, { "en": "Crane", "de": "Kran" }, { "en": "Forklift", "de": "Gabelstapler" },
                { "en": "Conveyor belt", "de": "Förderband" }, { "en": "Assembly line robot", "de": "Fließbandroboter" },
                { "en": "Server", "de": "Server" }, { "en": "Laptop", "de": "Laptop" }, { "en": "3D printer", "de": "3D-Drucker" },
                { "en": "Truck / lorry", "de": "Lastwagen / Lkw" }, { "en": "Warehouse shelving / racking", "de": "Lagerregale" }
              ]
            }
          },
          "quiz_config": {
            "instructions_en": "For each example, decide whether it belongs to Land, Labor, or Capital.",
            "instructions_de": "Entscheide bei jedem Beispiel, ob es zu Boden, Arbeit oder Kapital gehört.",
            "category_labels_en": { "Land": "Land", "Labor": "Labor", "Kapital": "Capital" },
            "category_labels_de": { "Land": "Boden", "Labor": "Arbeit", "Kapital": "Kapital" }
          }
        };

        const questionPool = [];
        for (const [catKey, catData] of Object.entries(rawData.categories)) {
            catData.examples.forEach(ex => {
                questionPool.push({
                    categoryId: catKey,
                    example_en: ex.en,
                    example_de: ex.de,
                    catName_en: catData.name_en,
                    catName_de: catData.name_de,
                    desc_en: catData.description_en,
                    desc_de: catData.description_de
                });
            });
        }

        let currentLang = 'en';
        let score = 0;
        let currentQuestion = null;
        let timeLeft = 180; // 3 minutes gamification
        let timerInterval = null;
        let quizActive = true;
        let answerHistory = [];

        let kdeColors = {
            bg: '#1a1b1e',
            panel: '#232629',
            accent: '#3daee9',
            text: '#eff0f1',
            windowBg: '#31363b',
            windowBorder: '#1d2023',
            success: 'rgba(39, 174, 96, 0.2)',
            successBorder: '#27ae60',
            successText: '#2ecc71',
            error: 'rgba(231, 76, 60, 0.2)',
            errorBorder: '#c0392b',
            errorText: '#e74c3c'
        };

        // Determine container (mimicking KCalc structure)
        let container = document.getElementById('app-container-factorsquiz');
        if (!container) container = document.body;
        container.innerHTML = '';

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

        const app = el('div', { 
            id: 'factors-quiz-app',
            style: `display:flex;flex-direction:column;height:100%;width:100%;box-sizing:border-box;background-color:${kdeColors.windowBg};color:${kdeColors.text};font-family:"Noto Sans",sans-serif;user-select:none;overflow:hidden;position:absolute;top:0;left:0;` 
        });

        const mainArea = el('div', {
            style: `display:flex;flex:1;background-color:${kdeColors.windowBg};overflow-y:auto;`
        });

        // Quiz Body - Fills the window naturally
        const quizBody = el('div', {
            style: `width:100%;display:flex;flex-direction:column;`
        });

        const header = el('div', { style: `padding:16px 20px;background-color:${kdeColors.panel};border-bottom:1px solid ${kdeColors.windowBorder};display:flex;justify-content:space-between;align-items:center;` });
        const title = el('h2', { text: 'Factors of Production', style: 'font-size:16px;font-weight:600;margin:0;' });
        
        const controls = el('div', { style: 'display:flex;gap:12px;align-items:center;' });
        
        const timerNum = el('span', { text: '03:00' });
        const timerBoard = el('div', { id: 'fop-timer-board', style: `font-size:14px;color:#f39c12;font-weight:bold;padding:6px 12px;background:rgba(243,156,18,0.1);border-radius:12px;border:1px solid rgba(243,156,18,0.3);transition:all 0.3s;` }, [
            el('span', { text: '⏱ ' }), timerNum
        ]);

        const scoreNum = el('span', { text: '0000' });
        const scoreBoard = el('div', { style: `font-size:14px;color:${kdeColors.accent};font-weight:bold;padding:6px 12px;background:rgba(61,174,233,0.1);border-radius:12px;border:1px solid rgba(61,174,233,0.3);` }, [
            el('span', { text: 'Score: ' }), scoreNum
        ]);

        const btnEn = el('button', { text: 'EN', style: `background:${kdeColors.accent};color:#000;border:1px solid ${kdeColors.accent};padding:4px 8px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:bold;` });
        const btnDe = el('button', { text: 'DE', style: `background:transparent;color:${kdeColors.text};border:1px solid ${kdeColors.windowBorder};padding:4px 8px;border-radius:4px;cursor:pointer;font-size:12px;` });
        
        controls.appendChild(timerBoard);
        controls.appendChild(scoreBoard);
        controls.appendChild(btnEn);
        controls.appendChild(btnDe);
        header.appendChild(title);
        header.appendChild(controls);

        const contentWrapper = el('div', { style: 'display:flex;flex:1;align-items:center;justify-content:center;padding:24px;' });
        const contentArea = el('div', { style: 'width:100%;max-width:600px;text-align:center;display:flex;flex-direction:column;' });
        
        const instructionText = el('div', { style: 'font-size:14px;color:#888;margin-bottom:24px;' });
        const exampleText = el('div', { text: 'Loading...', style: `font-size:26px;font-weight:bold;color:${kdeColors.text};margin-bottom:30px;min-height:70px;display:flex;align-items:center;justify-content:center;` });
        
        const optionsContainer = el('div', { style: 'display:flex;gap:12px;justify-content:center;margin-bottom:24px;' });
        
        const baseBtnStyle = `flex:1;padding:12px 0;background-color:${kdeColors.panel};border:1px solid ${kdeColors.windowBorder};color:${kdeColors.text};border-radius:6px;font-size:14px;font-weight:bold;cursor:pointer;transition:all 0.15s;`;
        
        const btnLand = el('button', { style: baseBtnStyle });
        const btnLabor = el('button', { style: baseBtnStyle });
        const btnCapital = el('button', { style: baseBtnStyle });
        const optionBtns = [btnLand, btnLabor, btnCapital];

        optionsContainer.appendChild(btnLand);
        optionsContainer.appendChild(btnLabor);
        optionsContainer.appendChild(btnCapital);

        const endScreenContainer = el('div', { style: 'display:none; width:100%; max-width:800px; flex-direction:column; text-align:left; max-height:60vh; overflow-y:auto; padding-right:8px; margin-top:10px;' });

        contentArea.appendChild(instructionText);
        contentArea.appendChild(exampleText);
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
                        // Pulse effect for last 10 seconds
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
            optionBtns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; b.style.cursor = 'not-allowed'; });

            instructionText.style.display = 'none';
            exampleText.style.display = 'none';
            optionsContainer.style.display = 'none';
            endScreenContainer.style.display = 'flex';

            endScreenContainer.innerHTML = ''; // Safely clear

            const titleStr = currentLang === 'en' ? "⏱ Time's up! Final Score: " : "⏱ Zeit abgelaufen! Endergebnis: ";
            const headerEl = el('h3', { text: titleStr + formatScore(score), style: `color:${kdeColors.accent}; margin-bottom: 24px; text-align:center; font-size: 22px;` });
            endScreenContainer.appendChild(headerEl);

            if (answerHistory.length === 0) {
                const noAnsStr = currentLang === 'en' ? "No questions answered." : "Keine Fragen beantwortet.";
                endScreenContainer.appendChild(el('div', { text: noAnsStr, style: 'text-align:center; color:#888;' }));
            } else {
                // Render the answer log
                answerHistory.forEach(record => {
                    const row = el('div', {
                        style: `display:flex; justify-content:space-between; align-items:center; padding: 12px 16px; background:${kdeColors.panel}; border-left: 4px solid ${record.isCorrect ? kdeColors.successBorder : kdeColors.errorBorder}; border-radius: 4px; margin-bottom: 8px;`
                    });

                    const qText = currentLang === 'en' ? record.question_en : record.question_de;
                    const correctCatLabel = rawData.quiz_config[`category_labels_${currentLang}`][record.correctAnswer];
                    const userCatLabel = rawData.quiz_config[`category_labels_${currentLang}`][record.userAnswer];

                    const leftDiv = el('div', { style: 'flex: 1;' });
                    leftDiv.appendChild(el('strong', { text: qText, style: `font-size: 15px; color:${kdeColors.text};` }));

                    let detailsText = currentLang === 'en'
                        ? `Your Answer: ${userCatLabel}`
                        : `Deine Antwort: ${userCatLabel}`;
                        
                    if (!record.isCorrect) {
                        detailsText += currentLang === 'en'
                            ? ` | Correct: ${correctCatLabel}`
                            : ` | Richtig: ${correctCatLabel}`;
                    }

                    leftDiv.appendChild(el('div', {
                        text: detailsText,
                        style: 'color:#888; font-size: 12px; margin-top: 6px;'
                    }));

                    const rightDiv = el('div', {
                        text: (record.points > 0 ? '+' : '') + record.points,
                        style: `font-weight:bold; font-size: 16px; color: ${record.isCorrect ? kdeColors.successText : kdeColors.errorText}; width: 60px; text-align:right;`
                    });

                    row.appendChild(leftDiv);
                    row.appendChild(rightDiv);
                    endScreenContainer.appendChild(row);
                });
            }
        }

        function setLanguage(lang) {
            currentLang = lang;
            if (lang === 'en') {
                btnEn.style.background = kdeColors.accent; btnEn.style.color = '#000'; btnEn.style.border = `1px solid ${kdeColors.accent}`;
                btnDe.style.background = 'transparent'; btnDe.style.color = kdeColors.text; btnDe.style.border = `1px solid ${kdeColors.windowBorder}`;
            } else {
                btnDe.style.background = kdeColors.accent; btnDe.style.color = '#000'; btnDe.style.border = `1px solid ${kdeColors.accent}`;
                btnEn.style.background = 'transparent'; btnEn.style.color = kdeColors.text; btnEn.style.border = `1px solid ${kdeColors.windowBorder}`;
            }
            updateLanguageUI();
        }

        function updateLanguageUI() {
            instructionText.textContent = rawData.quiz_config[`instructions_${currentLang}`];
            btnLand.textContent = rawData.quiz_config[`category_labels_${currentLang}`]["Land"];
            btnLabor.textContent = rawData.quiz_config[`category_labels_${currentLang}`]["Labor"];
            btnCapital.textContent = rawData.quiz_config[`category_labels_${currentLang}`]["Kapital"];
            
            if (!quizActive) {
                endQuiz(); // Re-render end screen in new language
                return;
            }

            if (currentQuestion) {
                exampleText.textContent = currentQuestion[`example_${currentLang}`];
            }
        }

        function loadNextQuestion() {
            if (!quizActive) return;
            const randomIndex = Math.floor(Math.random() * questionPool.length);
            currentQuestion = questionPool[randomIndex];
            exampleText.textContent = currentQuestion[`example_${currentLang}`];
        }

        function handleAnswer(selectedCategory) {
            if (!quizActive) return;
            const isCorrect = selectedCategory === currentQuestion.categoryId;
            
            const pointsChange = isCorrect ? 25 : -20;
            score += pointsChange;
            
            scoreNum.textContent = formatScore(score);
            
            // Log the answer
            answerHistory.push({
                question_en: currentQuestion.example_en,
                question_de: currentQuestion.example_de,
                userAnswer: selectedCategory,
                correctAnswer: currentQuestion.categoryId,
                points: pointsChange,
                isCorrect: isCorrect
            });
            
            // Auto-advance without waiting
            loadNextQuestion();
        }

        btnEn.addEventListener('click', () => setLanguage('en'));
        btnDe.addEventListener('click', () => setLanguage('de'));
        
        btnLand.addEventListener('click', () => handleAnswer('Land'));
        btnLabor.addEventListener('click', () => handleAnswer('Labor'));
        btnCapital.addEventListener('click', () => handleAnswer('Kapital'));
        
        // Add hover effects for option buttons
        optionBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (!btn.disabled) {
                    btn.style.borderColor = kdeColors.accent;
                    btn.style.backgroundColor = 'rgba(61,174,233,0.15)';
                    btn.style.color = kdeColors.accent;
                }
            });
            btn.addEventListener('mouseleave', () => {
                if (!btn.disabled) {
                    btn.style.borderColor = kdeColors.windowBorder;
                    btn.style.backgroundColor = kdeColors.panel;
                    btn.style.color = kdeColors.text;
                }
            });
        });

        // Initialize App
        updateLanguageUI();
        loadNextQuestion();
        startTimer();

    })();
})();