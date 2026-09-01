(function() {
    "use strict";

    // Register the package for the external desktop environment
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['radioPlayer'] = {
            name: 'Radio Player',
            version: '1.1.0',
            description: 'Compact KDE Winamp Internet Radio Player',
            preInstalledOn: ['default'],
            commands: {
                radioPlayer: function(args) {
                    if (typeof window.launchApp === 'function') {
                        window.launchApp('radioPlayer');
                    } else {
                        console.log("Radio Player invoked.");
                    }
                }
            },
            commandInfo: {
                radioPlayer: "what is this command?\nradioPlayer\n\nwhat is it used for?\nOpens the compact KDE Winamp Internet Radio Player."
            }
        };
    }

    const style = document.createElement('style');
    style.textContent = `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }

        input, textarea, .station-desc, .station-desc * {
            user-select: text !important;
            -webkit-user-select: text !important;
        }

        :root {
            --bg-color: #1a1b1e;
            --panel-bg: #232629;
            --toolbar-bg: #31363b;
            --text-color: #eff0f1;
            --text-muted: #888888;
            --accent-color: #3daee9;
            --accent-hover: #1d99d6;
            --border-color: #31363b;
            --hover-bg: rgba(61, 174, 233, 0.15);
            --selected-bg: rgba(61, 174, 233, 0.3);
            --font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            --winamp-bg: #1f2225;
            --winamp-screen: #0a0c0e;
            --winamp-led: #3daee9;
            --winamp-led-dim: #1e3a4c;
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-color); }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }

        #radio-app {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            background-color: transparent; /* Let parent background show through if needed */
            color: var(--text-color);
            font-family: var(--font-family);
            user-select: none;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            align-items: center;
            justify-content: center;
            padding: 0; /* Remove padding to fit tightly */
        }

        #winamp-app {
            width: 380px;
            height: 460px;
            background: var(--winamp-bg);
            border: 2px solid var(--border-color);
            border-radius: 6px;
            box-shadow: 0 12px 36px rgba(0,0,0,0.6);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            flex-shrink: 0;
        }

        /* Main Deck Area - No titlebar */
        #winamp-titlebar {
            background: linear-gradient(to bottom, var(--toolbar-bg), var(--panel-bg));
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8px;
            font-weight: bold;
            font-size: 11px;
            color: var(--text-color);
            flex-shrink: 0;
            height: 24px;
        }

        .winamp-title-icon {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .winamp-title-icon svg {
            width: 12px;
            height: 12px;
            stroke: var(--accent-color);
            stroke-width: 2;
            fill: none;
        }

        /* Main Deck Area */
        #winamp-deck {
            padding: 8px 10px; /* Reduced padding */
            display: flex;
            flex-direction: column;
            gap: 6px; /* Tighter layout */
            background: var(--panel-bg);
            border-bottom: 1px solid var(--border-color);
            flex-shrink: 0;
        }

        /* LED Display Screen */
        #winamp-display {
            background: var(--winamp-screen);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 4px 6px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            position: relative;
            overflow: hidden;
        }

        .display-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .led-timer {
            font-family: 'Courier New', Courier, monospace;
            font-size: 18px; /* Slightly smaller */
            font-weight: bold;
            color: var(--winamp-led);
            text-shadow: 0 0 8px rgba(61, 174, 233, 0.6);
            letter-spacing: 1px;
        }

        .led-info {
            font-family: 'Courier New', Courier, monospace;
            font-size: 8px; /* Smaller text */
            color: var(--text-muted);
            display: flex;
            gap: 4px;
        }

        .led-ticker-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            background: #000;
            padding: 1px 4px;
            border-radius: 2px;
            border: 1px inset var(--border-color);
        }

        .led-ticker {
            font-family: 'Courier New', Courier, monospace;
            font-size: 9px;
            color: var(--winamp-led);
            display: inline-block;
            animation: ticker 12s linear infinite;
        }

        @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }

        /* Visualizer Canvas */
        #visualizer-canvas {
            width: 100%;
            height: 20px; /* More compact canvas */
            background: #000;
            border-radius: 2px;
            border: 1px inset var(--border-color);
            display: block;
        }

        /* Sliders Section */
        .winamp-sliders {
            display: flex;
            justify-content: center;
            padding: 2px 0;
        }

        .slider-group {
            width: 100%; /* Volume takes full width now */
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .slider-label {
            font-size: 8px;
            text-transform: uppercase;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
        }

        .winamp-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 4px;
            background: var(--winamp-screen);
            border-radius: 2px;
            border: 1px solid var(--border-color);
            outline: none;
        }

        .winamp-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 2px;
            background: var(--accent-color);
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        /* Transport Buttons Deck */
        #winamp-buttons {
            display: flex;
            justify-content: center;
            gap: 2px; /* Tighter button grouping */
            padding-top: 2px;
        }

        .winamp-btn {
            background: linear-gradient(to bottom, var(--toolbar-bg), var(--bg-color));
            border: 1px solid var(--border-color);
            color: var(--text-color);
            width: 36px;
            height: 22px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 10px;
            font-weight: bold;
            transition: all 0.1s;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .winamp-btn:hover {
            background: var(--hover-bg);
            border-color: var(--accent-color);
            color: var(--accent-color);
        }

        .winamp-btn:active {
            background: var(--selected-bg);
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.6);
        }

        .winamp-btn svg {
            width: 9px;
            height: 9px;
            stroke: currentColor;
            stroke-width: 2.5;
            fill: none;
        }

        /* Playlist / Station Drawer */
        #winamp-playlist {
            background: var(--bg-color);
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
            border-top: 1px solid var(--border-color);
        }

        .playlist-header {
            padding: 6px 8px;
            background: var(--toolbar-bg);
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: flex;
            flex-direction: column; /* Stacked for compact layout */
            gap: 6px;
            border-bottom: 1px solid var(--border-color);
            flex-shrink: 0;
        }

        #genre-tabs {
            display: flex;
            gap: 3px;
            flex-wrap: wrap; /* Allows genre tags to wrap cleanly */
        }

        .genre-tab {
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            padding: 1px 5px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 8px;
            transition: all 0.2s;
        }

        .genre-tab:hover {
            color: var(--text-color);
            border-color: var(--accent-color);
        }

        .genre-tab.active {
            background-color: var(--accent-color);
            color: #000;
            border-color: var(--accent-color);
            font-weight: bold;
        }

        .playlist-items {
            flex: 1;
            overflow-y: auto;
            padding: 2px;
            display: flex;
            flex-direction: column;
            gap: 1px;
            min-height: 0;
        }

        .playlist-item {
            padding: 3px 5px;
            border-radius: 3px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 9px;
            border: 1px solid transparent;
            transition: all 0.15s;
        }

        .playlist-item:hover {
            background-color: var(--hover-bg);
            border-color: rgba(61, 174, 233, 0.3);
        }

        .playlist-item.playing {
            background-color: var(--selected-bg);
            border-color: var(--accent-color);
            color: var(--accent-color);
            font-weight: bold;
        }

        .playlist-item-meta {
            display: flex;
            flex-direction: column;
            gap: 1px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
        }

        .playlist-item-title {
            font-weight: bold;
            font-size: 10px;
        }

        .playlist-item-genre {
            font-size: 7px;
            color: var(--text-muted);
            text-transform: uppercase;
        }

        .playlist-item-arrow {
            font-size: 9px;
            color: var(--accent-color);
            flex-shrink: 0;
            margin-left: 5px;
        }

        /* Notification Toast */
        #toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--accent-color);
            color: #000;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 20000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        #toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    function applyKDEColors() {
        const kdeColors = window.kdeThemeColors || window.parent?.kdeThemeColors || {
            'kde-bg': '#1a1b1e',
            'kde-panel': '#232629',
            'kde-accent': '#3daee9',
            'kde-text': '#eff0f1',
            'kde-window-border': '#31363b',
        };

        const root = document.documentElement;
        root.style.setProperty('--bg-color', kdeColors['kde-bg']);
        root.style.setProperty('--panel-bg', kdeColors['kde-panel']);
        root.style.setProperty('--text-color', kdeColors['kde-text']);
        root.style.setProperty('--border-color', kdeColors['kde-window-border']);
        root.style.setProperty('--accent-color', kdeColors['kde-accent']);
        root.style.setProperty('--winamp-led', kdeColors['kde-accent']);
    }
    applyKDEColors();

    (function init() {
        if (typeof document === 'undefined' || !document.body) return;
        if (document.getElementById('radio-app')) return;

        try {
            let container = document.getElementById('app-container-radioPlayer');
            if (!container) container = document.body;
            container.innerHTML = '';

            const app = document.createElement('div');
            app.id = 'radio-app';

            const winampApp = document.createElement('div');
            winampApp.id = 'winamp-app';

            const titlebar = document.createElement('div');
            titlebar.id = 'winamp-titlebar';
            titlebar.innerHTML = `
                <div class="winamp-title-icon">
                    <svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    KDE Radio Edition
                </div>
                <div style="font-size:9px;color:var(--text-muted);">v3.0</div>
            `;

            // Removed Balance slider, leaving only Volume for a compact view
            const deck = document.createElement('div');
            deck.id = 'winamp-deck';
            deck.innerHTML = `
                <div id="winamp-display">
                    <div class="display-row">
                        <div class="led-timer" id="led-timer">00:00</div>
                        <div class="led-info">
                            <span>128 kbps</span>
                            <span>44 kHz</span>
                            <span id="stereo-indicator" style="color:var(--winamp-led);">STEREO</span>
                        </div>
                    </div>
                    <div class="led-ticker-container">
                        <div class="led-ticker" id="led-ticker">KDE Winamp Internet Radio Player - Select a station to stream</div>
                    </div>
                    <canvas id="visualizer-canvas"></canvas>
                </div>

                <div class="winamp-sliders">
                    <div class="slider-group">
                        <div class="slider-label">
                            <span>Volume</span>
                            <span id="vol-val">80%</span>
                        </div>
                        <input type="range" class="winamp-slider" id="volume-slider" min="0" max="1" step="0.05" value="0.8">
                    </div>
                </div>

                <div id="winamp-buttons">
                    <button class="winamp-btn" id="btn-prev" title="Previous Station">
                        <svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="4" x2="5" y2="20"></line></svg>
                    </button>
                    <button class="winamp-btn" id="btn-play" title="Play">
                        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                    <button class="winamp-btn" id="btn-pause" title="Pause">
                        <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    </button>
                    <button class="winamp-btn" id="btn-stop" title="Stop">
                        <svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12"></rect></svg>
                    </button>
                    <button class="winamp-btn" id="btn-eject" title="Refresh Playlist">
                        <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                    </button>
                </div>
            `;

            const playlist = document.createElement('div');
            playlist.id = 'winamp-playlist';
            playlist.innerHTML = `
                <div class="playlist-header">
                    <span id="playlist-count">Playlist</span>
                    <div id="genre-tabs">
                        <button class="genre-tab active" data-genre="all">All</button>
                        <button class="genre-tab" data-genre="ambient">Ambient</button>
                        <button class="genre-tab" data-genre="electronic">Electro</button>
                        <button class="genre-tab" data-genre="rock">Rock</button>
                        <button class="genre-tab" data-genre="pop">Pop</button>
                        <button class="genre-tab" data-genre="jazz">Jazz</button>
                        <button class="genre-tab" data-genre="classical">Classic</button>
                        <button class="genre-tab" data-genre="news">News</button>
                    </div>
                </div>
                <div class="playlist-items" id="playlist-container"></div>
            `;

            winampApp.appendChild(titlebar);
            winampApp.appendChild(deck);
            winampApp.appendChild(playlist);
            app.appendChild(winampApp);

            const toast = document.createElement('div');
            toast.id = 'toast';
            toast.textContent = 'Notice';
            app.appendChild(toast);

            container.innerHTML = '';
            container.appendChild(app);

            // Set container to match player width perfectly or fill available space
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.position = 'relative';
            container.style.overflow = 'hidden';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.margin = '0';
            container.style.backgroundColor = 'var(--bg-color)'; // Apply bg here instead of app

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
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.position = 'relative';
                container.style.overflow = 'hidden';
            }

            initializeRadio();

        } catch (error) {
            console.error('Error initializing Radio Player:', error);
            const container = document.getElementById('app-container-radioPlayer') || document.body;
            container.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#eff0f1;background:#1e1e1e;flex-direction:column;padding:20px;text-align:center;">
                    <h2 style="color:#da4453;">Error Loading Radio Player</h2>
                    <p style="color:#aaa;">${error.message}</p>
                </div>
            `;
        }
    })();

    function initializeRadio() {
        const stations = [
            { id: 'somafm_groove', name: 'SomaFM: Groove Salad', genre: 'ambient', desc: 'A nicely chilled plate of ambient/downtempo grooves and melodic acid jazz.', url: 'https://ice2.somafm.com/groovesalad-128-mp3' },
            { id: 'somafm_drone', name: 'SomaFM: Drone Zone', genre: 'ambient', desc: 'Atmospheric textures with minimal beats.', url: 'https://ice1.somafm.com/dronezone-128-mp3' },
            { id: 'lofi_chill', name: 'Lofi Hip Hop Radio', genre: 'ambient', desc: 'Relaxing beats to study, code, and relax to in high fidelity.', url: 'https://stream.zeno.fm/f3wvbbqmdg8uv' },
            
            { id: 'somafm_secret', name: 'SomaFM: Secret Agent', genre: 'electronic', desc: 'The soundtrack for your stylish, mysterious, adventurous undercover life.', url: 'https://ice1.somafm.com/secretagent-128-mp3' },
            { id: 'somafm_defcon', name: 'SomaFM: DEF CON Radio', genre: 'electronic', desc: 'Music for hacking. Chill chiptunes, industrial, and electronic beats.', url: 'https://ice4.somafm.com/defcon-128-mp3' },
            { id: 'synthwave', name: 'Synthwave / Retro Electro', genre: 'electronic', desc: 'Blast from the past - 80s inspired synthwave and retrowave.', url: 'https://stream.zeno.fm/7xrxw9p45mruv' },

            { id: 'somafm_bagel', name: 'SomaFM: BAGeL Radio', genre: 'rock', desc: 'What alternative rock radio should sound like.', url: 'https://ice1.somafm.com/bagel-128-mp3' },
            { id: 'rock_fm', name: 'Classic Rock FM', genre: 'rock', desc: 'The greatest classic rock hits of all time.', url: 'https://stream.zeno.fm/8x9b04x6zrquv' },

            { id: 'somafm_indie', name: 'SomaFM: Indie Pop Rocks!', genre: 'pop', desc: 'New and classic favorite indie pop tracks.', url: 'https://ice1.somafm.com/indiepop-128-mp3' },
            { id: 'pop_hits', name: 'Global Pop Hits', genre: 'pop', desc: 'Top charting pop hits from around the globe.', url: 'https://stream.zeno.fm/3uaz507pq2zuv' },

            { id: 'jazz_radio', name: 'Jazz Radio - Classic', genre: 'jazz', desc: 'The finest timeless jazz classics from legendary performers.', url: 'https://icecast.jazzradio.com/stream/1/mp3' },
            
            { id: 'classical_public', name: 'Classical Public Radio', genre: 'classical', desc: 'Orchestral masterpieces, symphonies, and chamber music.', url: 'https://radio.classicalgpr.org/stream' },

            { id: 'bbc_world', name: 'BBC World Service News', genre: 'news', desc: 'Global breaking news and insightful investigative reporting.', url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service' }
        ];

        let currentStation = null;
        let currentStationIndex = 0;
        const audioElement = new Audio();
        audioElement.crossOrigin = "anonymous";

        let vfs = null;
        function loadVFS() {
            try {
                const savedVFS = localStorage.getItem('sTerminal_vfs');
                if (savedVFS) vfs = JSON.parse(savedVFS);
            } catch (e) {
                console.error("Failed to load VFS:", e);
            }
        }

        function logRadioAction(message) {
            try {
                loadVFS();
                if (!vfs) return;
                const logPath = ['home', 'user', 'Documents', 'Logs'];
                let node = vfs;
                for (const p of logPath) {
                    if (!node.children[p]) {
                        node.children[p] = { type: 'dir', description: 'Logs directory', children: {} };
                    }
                    node = node.children[p];
                }
                if (!node.children['logRadio.txt']) {
                    node.children['logRadio.txt'] = { type: 'file', description: 'Radio player activity logs', content: '' };
                }
                const timestamp = new Date().toISOString();
                node.children['logRadio.txt'].content += `[${timestamp}] ${message}\n`;
                localStorage.setItem('sTerminal_vfs', JSON.stringify(vfs));
            } catch (err) {
                console.error("Failed to log radio action:", err);
            }
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            toast.innerText = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // Timer Counter
        let secondsElapsed = 0;
        let timerInterval = null;

        function startTimer() {
            clearInterval(timerInterval);
            secondsElapsed = 0;
            timerInterval = setInterval(() => {
                if (!audioElement.paused) {
                    secondsElapsed++;
                    const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
                    const secs = String(secondsElapsed % 60).padStart(2, '0');
                    document.getElementById('led-timer').innerText = `${mins}:${secs}`;
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval);
            document.getElementById('led-timer').innerText = '00:00';
        }

        const canvas = document.getElementById('visualizer-canvas');
        const updateCanvasSize = () => {
            const containerWidth = canvas.parentElement.clientWidth - 12;
            canvas.width = containerWidth || 300;
            canvas.height = 20;
        };
        updateCanvasSize();
        const ctx = canvas.getContext('2d');

        function drawVisualizer() {
            requestAnimationFrame(drawVisualizer);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const isPlaying = !audioElement.paused;
            const barWidth = 3;
            const gap = 1;
            const numBars = Math.floor(canvas.width / (barWidth + gap));

            for (let i = 0; i < numBars; i++) {
                const height = isPlaying ? Math.random() * (canvas.height - 2) + 1 : 1;
                const x = i * (barWidth + gap);
                const y = canvas.height - height;

                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, '#1e3a4c');
                gradient.addColorStop(0.7, '#3daee9');
                gradient.addColorStop(1, '#ffffff');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth, height);
            }
        }
        drawVisualizer();

        window.addEventListener('resize', updateCanvasSize);

        function renderPlaylist(filterGenre = 'all') {
            const container = document.getElementById('playlist-container');
            container.innerHTML = '';

            const filtered = filterGenre === 'all' ? stations : stations.filter(s => s.genre === filterGenre);
            
            document.getElementById('playlist-count').innerText = `Playlist (${filtered.length} stations)`;

            filtered.forEach((station, idx) => {
                const item = document.createElement('div');
                item.className = 'playlist-item';
                if (currentStation && currentStation.id === station.id) {
                    item.classList.add('playing');
                }

                item.innerHTML = `
                    <div class="playlist-item-meta">
                        <span class="playlist-item-title">${idx + 1}. ${station.name}</span>
                        <span class="playlist-item-genre">${station.genre} • ${station.desc.substring(0, 40)}...</span>
                    </div>
                    <span class="playlist-item-arrow">▶</span>
                `;

                item.addEventListener('click', () => playStation(station));
                container.appendChild(item);
            });
        }

        function playStation(station) {
            currentStation = station;
            currentStationIndex = stations.indexOf(station);
            audioElement.src = station.url;
            audioElement.play().then(() => {
                document.getElementById('led-ticker').innerText = `NOW STREAMING: ${station.name} - ${station.desc}`;
                showToast(`Now Playing: ${station.name}`);
                logRadioAction(`Started streaming station: ${station.name} (${station.url})`);
                startTimer();
                renderPlaylist(activeGenreFilter);
            }).catch(err => {
                console.error("Audio playback error:", err);
                document.getElementById('led-ticker').innerText = `ERROR: UNABLE TO CONNECT TO STREAM`;
                showToast('Unable to connect to audio stream');
                logRadioAction(`Failed to stream station: ${station.name}`);
            });
        }

        function stopPlayback() {
            audioElement.pause();
            audioElement.src = '';
            document.getElementById('led-ticker').innerText = 'PLAYBACK STOPPED - READY';
            stopTimer();
            currentStation = null;
            logRadioAction('Stopped audio playback');
            renderPlaylist(activeGenreFilter);
        }

        function togglePause() {
            if (!currentStation) {
                playStation(stations[0]);
                return;
            }
            if (audioElement.paused) {
                audioElement.play();
                document.getElementById('led-ticker').innerText = `RESUMED: ${currentStation.name}`;
                logRadioAction(`Resumed streaming: ${currentStation.name}`);
            } else {
                audioElement.pause();
                document.getElementById('led-ticker').innerText = `PAUSED: ${currentStation.name}`;
                logRadioAction(`Paused streaming: ${currentStation.name}`);
            }
        }

        function playNext() {
            currentStationIndex = (currentStationIndex + 1) % stations.length;
            playStation(stations[currentStationIndex]);
        }

        function playPrev() {
            currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
            playStation(stations[currentStationIndex]);
        }

        let activeGenreFilter = 'all';
        document.querySelectorAll('.genre-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.genre-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeGenreFilter = tab.dataset.genre;
                renderPlaylist(activeGenreFilter);
            });
        });

        document.getElementById('btn-play').addEventListener('click', () => {
            if (currentStation) {
                if (audioElement.paused) audioElement.play();
            } else {
                playStation(stations[0]);
            }
        });
        document.getElementById('btn-pause').addEventListener('click', togglePause);
        document.getElementById('btn-stop').addEventListener('click', stopPlayback);
        document.getElementById('btn-prev').addEventListener('click', playPrev);
        document.getElementById('btn-eject').addEventListener('click', () => {
            loadVFS();
            renderPlaylist(activeGenreFilter);
            showToast("Playlist refreshed");
        });

        const volumeSlider = document.getElementById('volume-slider');
        volumeSlider.addEventListener('input', (e) => {
            const vol = parseFloat(e.target.value);
            audioElement.volume = vol;
            document.getElementById('vol-val').innerText = Math.round(vol * 100) + '%';
        });
        audioElement.volume = parseFloat(volumeSlider.value);

        // Initial render
        loadVFS();
        renderPlaylist('all');
        logRadioAction("KDE Winamp Internet Radio Player initialized.");
    }

    // Node.js module export fallback
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            package: {
                name: 'radioPlayer',
                version: '1.1.0',
                description: 'Compact KDE Winamp Internet Radio Player'
            }
        };
    }
})();