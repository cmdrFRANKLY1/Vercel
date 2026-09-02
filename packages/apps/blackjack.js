(function() {
    "use strict";

    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['blackjack'] = {
            name: 'Blackjack',
            version: '2.7.0',
            description: 'KDE-styled Multiplayer Table Blackjack with 4 CPU Opponents, Staggered Turns, Action Popups, Theme Toggle, Verdana Font, and Auto-Closing Round Results',
            preInstalledOn: ['default'],
            commands: {
                blackjack: function(args) {
                    if (typeof window.launchApp === 'function') {
                        window.launchApp('blackjack');
                    } else {
                        console.log("Blackjack invoked.");
                    }
                }
            },
            commandInfo: {
                blackjack: "what is this command?\nblackjack\n\nwhat is it used for?\nLaunches the KDE Blackjack table card game with animated CPU turns, action popups, Verdana typography, and auto-closing round results."
            }
        };
    }

    (function init() {
        if (typeof document === 'undefined' || !document.body) return;
        if (document.getElementById('blackjack-app')) return;

        let kdeColors = {};
        try {
            if (window.parent && window.parent !== window) {
                const parentStyles = window.parent.getComputedStyle(window.parent.document.documentElement);
                kdeColors = {
                    bg: parentStyles.getPropertyValue('--kde-bg').trim() || '#1a1b1e',
                    panel: parentStyles.getPropertyValue('--kde-panel').trim() || 'rgba(35, 38, 41, 0.85)',
                    accent: parentStyles.getPropertyValue('--kde-accent').trim() || '#3daee9',
                    text: parentStyles.getPropertyValue('--kde-text').trim() || '#eff0f1',
                    windowBg: parentStyles.getPropertyValue('--kde-window-bg').trim() || '#31363b',
                    windowBorder: parentStyles.getPropertyValue('--kde-window-border').trim() || '#1d2023'
                };
            }
        } catch(e) {
            kdeColors = {
                bg: '#1a1b1e',
                panel: 'rgba(35, 38, 41, 0.85)',
                accent: '#3daee9',
                text: '#eff0f1',
                windowBg: '#31363b',
                windowBorder: '#1d2023'
            };
        }

        let container = document.getElementById('app-container-blackjack');
        if (!container) container = document.body;
        container.innerHTML = '';

        const style = document.createElement('style');
        style.textContent = `
            * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-user-select: none; }
            #blackjack-app {
                display: flex; flex-direction: column; height: 100%; width: 100%;
                background-color: ${kdeColors.bg}; color: ${kdeColors.text};
                font-family: 'Verdana', sans-serif; font-size: 14px; overflow: hidden; position: absolute; top: 0; left: 0;
            }
            #blackjack-header {
                height: 52px; background-color: ${kdeColors.panel}; border-bottom: 1px solid ${kdeColors.windowBorder};
                display: flex; align-items: center; justify-content: space-between; padding: 0 16px; flex-shrink: 0; z-index: 10;
            }
            .bj-btn {
                background: ${kdeColors.windowBg}; color: ${kdeColors.text}; border: 1px solid ${kdeColors.windowBorder};
                padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s;
                font-family: 'Verdana', sans-serif;
            }
            .bj-btn:hover:not(:disabled) { background: ${kdeColors.accent}; color: #000; border-color: ${kdeColors.accent}; }
            .bj-btn:disabled { opacity: 0.4; cursor: not-allowed; }
            
            #blackjack-main {
                display: flex; flex-direction: column; flex-grow: 1; padding: 14px; gap: 10px; overflow-y: auto; align-items: center; justify-content: space-between;
                background: radial-gradient(circle at center, var(--table-felt-inner, #0f3d24) 0%, var(--table-felt-outer, #082213) 100%);
                border: 8px solid var(--table-felt-border, #14281b); box-shadow: inset 0 0 40px rgba(0,0,0,0.6);
                transition: background 0.3s ease, border-color 0.3s ease;
                position: relative;
            }

            .bj-table-felt {
                width: 100%; max-width: 900px; display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: space-evenly; flex-grow: 1;
                position: relative;
            }

            /* Round Result Auto-Closing Popup */
            .bj-result-popup {
                position: absolute;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.6);
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
                color: #facc15;
                padding: 18px 32px;
                border-radius: 10px;
                font-size: 20px;
                font-weight: 900;
                box-shadow: 0 8px 30px rgba(0,0,0,0.7);
                border: 2px solid rgba(250, 204, 21, 0.5);
                z-index: 50;
                display: none;
                animation: resultPopupBounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-family: 'Verdana', sans-serif;
            }
            .bj-result-popup.active { display: block; }

            @keyframes resultPopupBounce {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }

            .bj-dealer-zone {
                display: flex; flex-direction: column; align-items: center; gap: 4px; width: 100%;
            }

            .bj-cpus-grid {
                display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; width: 100%;
            }

            .bj-seat {
                background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 6px; padding: 6px;
                display: flex; flex-direction: column; align-items: center; gap: 4px; min-height: 95px;
                transition: border-color 0.2s, background 0.2s;
                position: relative;
            }
            .bj-seat.thinking {
                border-color: #38bdf8;
                background: rgba(56, 189, 248, 0.15);
                box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
            }

            /* CPU Action Popup */
            .bj-cpu-action-popup {
                position: absolute;
                top: -26px;
                left: 50%;
                transform: translateX(-50%) scale(0.6);
                background: #facc15;
                color: #0f172a;
                font-size: 12px;
                font-weight: 900;
                padding: 3px 10px;
                border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.4);
                opacity: 0;
                pointer-events: none;
                transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                text-transform: uppercase;
                z-index: 30;
                white-space: nowrap;
                font-family: 'Verdana', sans-serif;
            }
            .bj-cpu-action-popup.show {
                opacity: 1;
                transform: translateX(-50%) scale(1) translateY(-4px);
            }

            .bj-seat-title { font-size: 11px; font-weight: bold; color: #a3e635; text-align: center; }
            .bj-seat-cards { display: flex; gap: 3px; min-height: 45px; align-items: center; justify-content: center; }
            .bj-seat-score { font-size: 11px; color: #cbd5e1; }

            .bj-player-zone {
                width: 100%; max-width: 620px; background: rgba(0, 0, 0, 0.55); border: 2px solid ${kdeColors.accent};
                border-radius: 10px; padding: 14px 20px; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            }
            .bj-section-title { font-size: 14px; font-weight: bold; color: ${kdeColors.accent}; text-transform: uppercase; display: flex; justify-content: space-between; }
            
            .bj-cards-container { display: flex; gap: 10px; flex-wrap: wrap; min-height: 135px; align-items: center; justify-content: center; }
            
            .bj-card {
                width: 82px; height: 118px; background: #ffffff; color: #111111; border-radius: 6px; border: 1px solid #ccc;
                display: flex; flex-direction: column; justify-content: space-between; padding: 8px; font-weight: bold; font-size: 15px;
                box-shadow: 0 4px 14px rgba(0,0,0,0.4); animation: cardPop 0.2s ease-out; font-family: 'Verdana', sans-serif;
            }
            .bj-card.red { color: #dc2626; }
            .bj-card.hidden-card { background: #1e3a8a; color: #60a5fa; align-items: center; justify-content: center; font-size: 22px; }
            
            @keyframes cardPop {
                0% { transform: scale(0.8) translateY(-8px); opacity: 0; }
                100% { transform: scale(1) translateY(0); opacity: 1; }
            }

            .bj-controls { display: flex; gap: 10px; justify-content: center; width: 100%; padding-bottom: 4px; flex-shrink: 0; }
            .bj-status-bar {
                background: rgba(15, 23, 42, 0.9); border: 1px solid ${kdeColors.windowBorder}; border-radius: 6px;
                padding: 8px 14px; width: 100%; max-width: 500px; text-align: center; font-weight: 600; font-size: 13px; color: #facc15;
            }
        `;
        document.head.appendChild(style);

        const app = document.createElement('div');
        app.id = 'blackjack-app';

        app.innerHTML = `
            <div id="blackjack-header">
                <div style="display:flex; align-items:center; gap:12px;">
                    <button class="bj-btn" id="blackjack-back">Back</button>
                    <span style="font-weight:600; font-size:15px;">KDE Multiplayer Blackjack</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                    <button class="bj-btn" id="btn-theme-toggle" title="Toggle Felt Theme">Dark Mode</button>
                    <div id="bj-money" style="font-weight:bold; color:#22c55e; font-size:15px;">Chips: $1000</div>
                </div>
            </div>
            <div id="blackjack-main" style="--table-felt-inner: #0f3d24; --table-felt-outer: #082213; --table-felt-border: #14281b;">
                <!-- Round Result Auto-Closing Popup -->
                <div class="bj-result-popup" id="result-popup">Round Result</div>

                <div class="bj-table-felt">
                    <!-- Dealer Section -->
                    <div class="bj-dealer-zone">
                        <div style="font-size:11px; font-weight:bold; color:#fde047; text-transform:uppercase;">Dealer Hand (<span id="dealer-score">?</span>)</div>
                        <div class="bj-cards-container" id="dealer-cards" style="min-height:85px;"></div>
                    </div>

                    <!-- 4 CPU Competitors -->
                    <div class="bj-cpus-grid">
                        <div class="bj-seat" id="cpu-seat-0">
                            <div class="bj-cpu-action-popup" id="cpu-action-0">Hit!</div>
                            <div class="bj-seat-title" id="cpu-title-0">CPU 1</div>
                            <div class="bj-seat-cards" id="cpu-cards-0"></div>
                            <div class="bj-seat-score" id="cpu-score-0">0</div>
                        </div>
                        <div class="bj-seat" id="cpu-seat-1">
                            <div class="bj-cpu-action-popup" id="cpu-action-1">Hit!</div>
                            <div class="bj-seat-title" id="cpu-title-1">CPU 2</div>
                            <div class="bj-seat-cards" id="cpu-cards-1"></div>
                            <div class="bj-seat-score" id="cpu-score-1">0</div>
                        </div>
                        <div class="bj-seat" id="cpu-seat-2">
                            <div class="bj-cpu-action-popup" id="cpu-action-2">Hit!</div>
                            <div class="bj-seat-title" id="cpu-title-2">CPU 3</div>
                            <div class="bj-seat-cards" id="cpu-cards-2"></div>
                            <div class="bj-seat-score" id="cpu-score-2">0</div>
                        </div>
                        <div class="bj-seat" id="cpu-seat-3">
                            <div class="bj-cpu-action-popup" id="cpu-action-3">Hit!</div>
                            <div class="bj-seat-title" id="cpu-title-3">CPU 4</div>
                            <div class="bj-seat-cards" id="cpu-cards-3"></div>
                            <div class="bj-seat-score" id="cpu-score-3">0</div>
                        </div>
                    </div>

                    <div class="bj-status-bar" id="bj-msg">Place your bet ($50) to start playing!</div>

                    <!-- Player Section -->
                    <div class="bj-player-zone">
                        <div class="bj-section-title">
                            <span>Your Hand</span>
                            <span id="player-score">Score: 0</span>
                        </div>
                        <div class="bj-cards-container" id="player-cards"></div>
                    </div>
                </div>

                <div class="bj-controls">
                    <button class="bj-btn" id="btn-deal" style="background:${kdeColors.accent}; color:#000;">Deal ($50)</button>
                    <button class="bj-btn" id="btn-hit" disabled>Hit</button>
                    <button class="bj-btn" id="btn-stand" disabled>Stand</button>
                </div>
            </div>
        `;

        container.appendChild(app);

        let deck = [];
        let playerHand = [];
        let dealerHand = [];
        let cpus = [
            { id: 0, name: 'CPU 1', hand: [] },
            { id: 1, name: 'CPU 2', hand: [] },
            { id: 2, name: 'CPU 3', hand: [] },
            { id: 3, name: 'CPU 4', hand: [] }
        ];
        let chips = 1000;
        let betAmount = 50;
        let gameActive = false;
        let isDarkMode = false;
        let resultTimeout = null;

        document.getElementById('btn-theme-toggle').onclick = () => {
            isDarkMode = !isDarkMode;
            const mainContainer = document.getElementById('blackjack-main');
            const themeBtn = document.getElementById('btn-theme-toggle');
            if (isDarkMode) {
                mainContainer.style.setProperty('--table-felt-inner', '#1e293b');
                mainContainer.style.setProperty('--table-felt-outer', '#0f172a');
                mainContainer.style.setProperty('--table-felt-border', '#334155');
                themeBtn.textContent = 'Green Felt';
            } else {
                mainContainer.style.setProperty('--table-felt-inner', '#0f3d24');
                mainContainer.style.setProperty('--table-felt-outer', '#082213');
                mainContainer.style.setProperty('--table-felt-border', '#14281b');
                themeBtn.textContent = 'Dark Mode';
            }
        };

        function createDeck() {
            const suits = ['♠', '♣', '♥', '♦'];
            const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            let newDeck = [];
            for (let suit of suits) {
                for (let val of values) {
                    newDeck.push({ suit, val });
                }
            }
            for (let i = newDeck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
            }
            return newDeck;
        }

        function calculateScore(hand) {
            let score = 0;
            let aces = 0;
            for (let card of hand) {
                if (card.val === 'A') {
                    aces++;
                    score += 11;
                } else if (['K', 'Q', 'J', '10'].includes(card.val)) {
                    score += 10;
                } else {
                    score += parseInt(card.val);
                }
            }
            while (score > 21 && aces > 0) {
                score -= 10;
                aces--;
            }
            return score;
        }

        function renderMiniCards(hand, containerEl) {
            containerEl.innerHTML = '';
            hand.forEach((card) => {
                const cardEl = document.createElement('div');
                const isRed = ['♥', '♦'].includes(card.suit);
                cardEl.className = `bj-card ${isRed ? 'red' : ''}`;
                cardEl.style.width = '30px';
                cardEl.style.height = '44px';
                cardEl.style.fontSize = '10px';
                cardEl.style.padding = '2px';
                cardEl.innerHTML = `
                    <div>${card.val}</div>
                    <div style="font-size:13px; text-align:center;">${card.suit}</div>
                `;
                containerEl.appendChild(cardEl);
            });
        }

        function renderCards(hand, containerEl, hideFirst = false) {
            containerEl.innerHTML = '';
            hand.forEach((card, index) => {
                const cardEl = document.createElement('div');
                const isRed = ['♥', '♦'].includes(card.suit);
                if (hideFirst && index === 0) {
                    cardEl.className = 'bj-card hidden-card';
                    cardEl.style.width = '82px';
                    cardEl.style.height = '118px';
                    cardEl.textContent = '?';
                } else {
                    cardEl.className = `bj-card ${isRed ? 'red' : ''}`;
                    cardEl.innerHTML = `
                        <div>${card.val}</div>
                        <div style="font-size:32px; text-align:center;">${card.suit}</div>
                        <div style="transform: rotate(180deg);">${card.val}</div>
                    `;
                }
                containerEl.appendChild(cardEl);
            });
        }

        function updateUI(hideDealerCard = true) {
            renderCards(playerHand, document.getElementById('player-cards'));
            renderCards(dealerHand, document.getElementById('dealer-cards'), hideDealerCard);

            cpus.forEach((cpu, idx) => {
                renderMiniCards(cpu.hand, document.getElementById(`cpu-cards-${idx}`));
                const score = calculateScore(cpu.hand);
                document.getElementById(`cpu-score-${idx}`).textContent = score > 21 ? 'Bust!' : `Score: ${score}`;
            });

            document.getElementById('player-score').textContent = `Score: ${calculateScore(playerHand)}`;
            if (hideDealerCard && dealerHand.length > 0) {
                const visibleCard = dealerHand[1];
                let visibleScore = ['K', 'Q', 'J', '10'].includes(visibleCard.val) ? 10 : (visibleCard.val === 'A' ? 11 : parseInt(visibleCard.val));
                document.getElementById('dealer-score').textContent = `${visibleScore} + ?`;
            } else {
                document.getElementById('dealer-score').textContent = `${calculateScore(dealerHand)}`;
            }
            document.getElementById('bj-money').textContent = `Chips: $${chips}`;
        }

        function showResultPopup(message) {
            const popup = document.getElementById('result-popup');
            popup.textContent = message;
            popup.classList.add('active');

            if (resultTimeout) clearTimeout(resultTimeout);
            resultTimeout = setTimeout(() => {
                popup.classList.remove('active');
                startDeal(); // Automatically start a new round
            }, 2000);
        }

        function showCpuActionPopup(cpuIndex, text) {
            const popup = document.getElementById(`cpu-action-${cpuIndex}`);
            if (popup) {
                popup.textContent = text;
                popup.classList.add('show');
                setTimeout(() => {
                    popup.classList.remove('show');
                }, 2000);
            }
        }

        function startDeal() {
            if (chips < betAmount) {
                document.getElementById('bj-msg').textContent = "Not enough chips to play!";
                document.getElementById('btn-deal').disabled = false;
                return;
            }
            if (resultTimeout) {
                clearTimeout(resultTimeout);
                resultTimeout = null;
            }
            document.getElementById('result-popup').classList.remove('active');

            chips -= betAmount;
            deck = createDeck();
            
            playerHand = [deck.pop(), deck.pop()];
            dealerHand = [deck.pop(), deck.pop()];
            cpus.forEach((cpu, idx) => {
                cpu.hand = [deck.pop(), deck.pop()];
                const popup = document.getElementById(`cpu-action-${idx}`);
                if (popup) popup.classList.remove('show');
            });

            gameActive = false;

            document.getElementById('btn-deal').disabled = true;
            document.getElementById('btn-hit').disabled = true;
            document.getElementById('btn-stand').disabled = true;

            updateUI(true);
            document.getElementById('bj-msg').textContent = "Competitors are making their moves...";

            processCpuTurn(0);
        }

        function processCpuTurn(cpuIndex) {
            if (cpuIndex >= cpus.length) {
                // All CPUs finished, now player turn
                gameActive = true;
                document.getElementById('bj-msg').textContent = "Your turn: Hit or Stand?";
                document.getElementById('btn-hit').disabled = false;
                document.getElementById('btn-stand').disabled = false;

                if (calculateScore(playerHand) === 21) {
                    playerStand();
                }
                return;
            }

            const cpu = cpus[cpuIndex];
            const seatEl = document.getElementById(`cpu-seat-${cpuIndex}`);
            const titleEl = document.getElementById(`cpu-title-${cpuIndex}`);
            
            seatEl.classList.add('thinking');
            titleEl.textContent = `${cpu.name} (Thinking...)`;
            document.getElementById('bj-msg').textContent = `${cpu.name} is making a decision...`;

            // Random delay between 3 to 7 seconds (3000ms - 7000ms)
            const randomDelay = Math.floor(Math.random() * 4000) + 3000;

            setTimeout(() => {
                let hitCount = 0;
                while (calculateScore(cpu.hand) < 17) {
                    cpu.hand.push(deck.pop());
                    hitCount++;
                    // Instantly update mini cards so they appear immediately as it hits
                    renderMiniCards(cpu.hand, document.getElementById(`cpu-cards-${cpuIndex}`));
                }

                seatEl.classList.remove('thinking');
                const finalScore = calculateScore(cpu.hand);
                titleEl.textContent = `${cpu.name} (${finalScore > 21 ? 'Bust' : 'Done'})`;
                
                showCpuActionPopup(cpuIndex, hitCount > 0 ? "Hit!" : "Stand!");

                renderMiniCards(cpu.hand, document.getElementById(`cpu-cards-${cpuIndex}`));
                document.getElementById(`cpu-score-${cpuIndex}`).textContent = finalScore > 21 ? 'Bust!' : `Score: ${finalScore}`;

                processCpuTurn(cpuIndex + 1);
            }, randomDelay);
        }

        function playerHit() {
            if (!gameActive) return;
            playerHand.push(deck.pop());
            updateUI(true);
            if (calculateScore(playerHand) > 21) {
                endGame("Bust! You lose.");
            }
        }

        function playerStand() {
            if (!gameActive) return;
            gameActive = false;

            while (calculateScore(dealerHand) < 17) {
                dealerHand.push(deck.pop());
            }

            updateUI(false);

            const pScore = calculateScore(playerHand);
            const dScore = calculateScore(dealerHand);

            if (pScore > 21) {
                endGame("Bust! You lose.");
                return;
            }

            let summaryMsg = "";
            if (dScore > 21) {
                chips += betAmount * 2;
                summaryMsg = "Dealer Busts! You Win!";
            } else if (dScore > pScore) {
                summaryMsg = "Dealer Wins!";
            } else if (pScore > dScore) {
                chips += betAmount * 2;
                summaryMsg = "You Win!";
            } else {
                chips += betAmount;
                summaryMsg = "Push (Tie)!";
            }

            document.getElementById('bj-msg').textContent = summaryMsg;
            showResultPopup(summaryMsg);
        }

        function endGame(message) {
            gameActive = false;
            updateUI(false);
            document.getElementById('bj-msg').textContent = message;
            document.getElementById('btn-deal').disabled = false;
            document.getElementById('btn-hit').disabled = true;
            document.getElementById('btn-stand').disabled = true;
            showResultPopup(message);
        }

        document.getElementById('btn-deal').onclick = startDeal;
        document.getElementById('btn-hit').onclick = playerHit;
        document.getElementById('btn-stand').onclick = playerStand;

        document.getElementById('blackjack-back').onclick = () => {
            if (container === document.body) window.location.href = 'about:blank';
            else app.remove();
        };

        console.log("Multiplayer Blackjack initialized with Verdana font, CPU action popups, and auto-closing round results.");
    })();
})();