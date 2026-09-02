(function() {
    "use strict";

    // Load JSZip library for DOCX parsing
    if (typeof JSZip === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = function() {
            console.log('JSZip library loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load JSZip library');
        };
        document.head.appendChild(script);
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
        input, textarea, .day-content, .day-content *, .modal-body, .modal-body * {
            user-select: text !important;
            -webkit-user-select: text !important;
        }
        
        :root {
            --bg-color: #31363b;
            --text-color: #eff0f1;
            --font-family: 'Noto Sans', 'Segoe UI', 'Roboto', sans-serif;
            --font-size: 13px;
            --border-solid: #1d2023;
            --accent-color: #3daee9;
            --warning-color: #f67400;
            --danger-color: #da4453;
            --success-color: #27ae60;
            --sub-color: #888888;
            --modal-bg: #232629;
            --panel-bg: #2a2e32;
        }

        body, html {
            height: 100vh;
            background: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: var(--font-size);
            line-height: 1.5;
            overflow: hidden;
            margin: 0;
            padding: 0;
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #232629; }
        ::-webkit-scrollbar-thumb { background: #4d5052; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }
        
        #app {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            background: var(--bg-color);
            overflow: hidden;
        }

        /* Waybar KDE Plasma Header */
        #waybar {
            height: 36px;
            min-height: 36px;
            width: 100%;
            background: var(--panel-bg);
            color: var(--text-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px solid var(--border-solid);
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            flex-shrink: 0;
            z-index: 100;
        }

        .waybar-group {
            display: flex;
            align-items: center;
            gap: 4px;
            height: 100%;
        }

        .waybar-btn {
            cursor: pointer;
            padding: 0 10px;
            height: 28px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 500;
            color: var(--text-color);
            background: transparent;
            border: 1px solid transparent;
            border-radius: 4px;
            font-family: inherit;
            font-size: 12px;
            transition: all 0.15s ease;
        }
        .waybar-btn:hover {
            background: rgba(61, 174, 233, 0.15);
            border-color: rgba(61, 174, 233, 0.3);
        }
        .waybar-btn svg {
            width: 14px;
            height: 14px;
            fill: currentColor;
            flex-shrink: 0;
        }

        .view-btn-active {
            background: var(--accent-color);
            color: #ffffff;
            border-color: #2980b9;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
        }

        /* Search input KDE Plasma style */
        #searchContainer {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 0 8px;
            background: #232629;
            border: 1px solid #4d5052;
            border-radius: 4px;
            height: 26px;
            min-width: 180px;
            max-width: 260px;
            transition: border-color 0.15s, box-shadow 0.15s;
        }
        #searchContainer:focus-within {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 1px var(--accent-color);
        }
        #searchInput {
            background: transparent;
            border: none;
            color: var(--text-color);
            font-family: inherit;
            font-size: 12px;
            outline: none;
            width: 100%;
        }
        #searchInput::placeholder {
            color: var(--sub-color);
        }
        .search-clear {
            cursor: pointer;
            color: var(--sub-color);
            font-weight: bold;
            font-size: 13px;
            display: none;
        }
        .search-clear:hover {
            color: var(--text-color);
        }
        .search-count {
            color: var(--sub-color);
            font-size: 11px;
            white-space: nowrap;
        }

        /* Main Workspace Area */
        #terminal-grid {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #232629;
            min-height: 0;
            padding: 12px;
            overflow: hidden;
        }
        .term-pane {
            background: var(--bg-color);
            border: 1px solid var(--border-solid);
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            padding: 16px;
            height: 100%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .output-area {
            display: flex;
            flex-direction: column;
            gap: 12px;
            flex: 1;
        }
        
        .banner {
            color: var(--sub-color);
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            margin-bottom: 4px;
        }
        
        /* Report Cards */
        .report-card {
            background: var(--panel-bg);
            border: 1px solid var(--border-solid);
            border-left: 3px solid var(--accent-color);
            border-radius: 4px;
            transition: border-color 0.15s, box-shadow 0.15s;
            margin-bottom: 12px;
        }
        .report-card:hover {
            border-color: var(--accent-color);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 14px;
            cursor: pointer;
            background: rgba(255,255,255,0.02);
            border-bottom: 1px solid var(--border-solid);
            font-weight: 600;
        }
        .card-header:hover {
            background: rgba(61, 174, 233, 0.1);
        }
        .card-title {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .card-badges {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .badge {
            font-size: 10px;
            font-weight: 700;
            color: var(--accent-color);
            background: rgba(61, 174, 233, 0.1);
            border: 1px solid rgba(61, 174, 233, 0.3);
            padding: 1px 6px;
            border-radius: 3px;
        }
        .badge-ho {
            color: var(--warning-color);
            background: rgba(246, 116, 0, 0.1);
            border: 1px solid rgba(246, 116, 0, 0.3);
            padding: 1px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 700;
        }
        .chevron {
            font-family: monospace;
            font-size: 13px;
            color: var(--sub-color);
        }
        .chevron::after { content: "▼"; }
        .report-card.collapsed .chevron::after { content: "▶"; }
        .report-card.collapsed .card-body { display: none; }
        .report-card.collapsed .card-header { border-bottom: none; }
        
        .card-body { padding: 12px; }
        .day-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
        }
        .day-card {
            background: #232629;
            border: 1px solid var(--border-solid);
            border-radius: 4px;
            padding: 10px;
            display: flex;
            flex-direction: column;
        }
        .day-card.ho-day {
            border-color: var(--warning-color);
        }
        .day-name {
            font-weight: 700;
            font-size: 11px;
            text-transform: uppercase;
            color: var(--accent-color);
            border-bottom: 1px solid var(--border-solid);
            padding-bottom: 4px;
            margin-bottom: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .day-date-sub {
            font-size: 10px;
            color: var(--sub-color);
            font-weight: normal;
        }
        .day-content {
            font-size: 12px;
            color: #d1d2d3;
            white-space: pre-wrap;
            word-break: break-word;
            line-height: 1.4;
            max-height: 120px;
            overflow-y: auto;
        }
        .day-content .highlight {
            background: var(--accent-color);
            color: #ffffff;
            padding: 0 3px;
            border-radius: 2px;
        }
        .day-empty {
            color: var(--sub-color);
            font-style: italic;
            font-size: 11px;
        }

        /* Calendar Styling */
        .calendar-container {
            background: var(--panel-bg);
            border: 1px solid var(--border-solid);
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 16px;
        }
        .calendar-header-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 14px;
        }
        .cal-nav-group { display: none; gap: 4px; }
        .cal-nav-btn {
            background: #232629;
            border: 1px solid #4d5052;
            color: var(--text-color);
            padding: 4px 12px;
            font-weight: 600;
            cursor: pointer;
            border-radius: 4px;
            font-size: 12px;
        }
        .cal-nav-btn:hover {
            background: rgba(61, 174, 233, 0.15);
            border-color: var(--accent-color);
        }
        #calendarMonthTitle {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 2px;
            background: var(--border-solid);
            border: 1px solid var(--border-solid);
            border-radius: 4px;
            overflow: hidden;
        }
        .cal-day-header {
            text-align: center;
            font-weight: 700;
            font-size: 11px;
            background: #2980b9;
            color: #ffffff;
            padding: 6px 0;
        }
        .cal-cell {
            background: #232629;
            min-height: 80px;
            padding: 6px;
            position: relative;
        }
        .cal-cell.empty { background: rgba(0,0,0,0.2); }
        .cal-cell.today { box-shadow: inset 0 0 0 2px var(--accent-color); }
        .cal-cell.has-entry { cursor: pointer; }
        .cal-cell.has-entry:hover { background: rgba(61, 174, 233, 0.15); }
        .cal-cell.weekend { opacity: 0.4; }
        .cal-cell.holiday { 
            background: rgba(255, 200, 0, 0.1) !important;
            border: 1px solid rgba(255, 200, 0, 0.3) !important;
        }
        .cal-date { font-weight: 700; font-size: 12px; }
        .cal-preview {
            font-size: 10px;
            color: var(--sub-color);
            margin-top: 3px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .cal-cell.search-match { border: 1px solid var(--accent-color); }

        /* Timers / Detailed View */
        .detailed-container {
            background: var(--panel-bg);
            border: 1px solid var(--border-solid);
            border-radius: 6px;
            padding: 16px;
        }
        .analytics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        .analytics-card {
            background: #232629;
            border: 1px solid var(--border-solid);
            border-left: 3px solid var(--accent-color);
            padding: 12px 14px;
            border-radius: 4px;
        }
        .analytics-card h3 {
            font-size: 11px;
            color: var(--sub-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        .timer-display {
            font-family: 'JetBrains Mono', monospace;
            font-size: 15px;
            font-weight: 700;
            color: var(--text-color);
        }

        /* Stats View */
        .stats-container {
            background: var(--panel-bg);
            border: 1px solid var(--border-solid);
            border-radius: 6px;
            padding: 16px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 14px;
        }
        .stat-card {
            background: #232629;
            border: 1px solid var(--border-solid);
            border-left: 3px solid var(--accent-color);
            padding: 14px;
            border-radius: 4px;
            text-align: center;
        }
        .stat-number {
            font-size: 28px;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            color: var(--text-color);
        }
        .stat-label {
            font-size: 11px;
            color: var(--sub-color);
            text-transform: uppercase;
            margin-top: 4px;
        }
        .stat-progress {
            margin-top: 8px;
            height: 4px;
            background: var(--border-solid);
            border-radius: 2px;
            overflow: hidden;
        }
        .stat-progress-fill {
            height: 100%;
            background: var(--accent-color);
            border-radius: 2px;
            transition: width 0.4s ease;
        }

        /* Modal KDE Window Style */
        #calendarModal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(3px);
        }
        .modal-box {
            background: var(--bg-color);
            border: 1px solid var(--border-solid);
            border-radius: 6px;
            width: 100%;
            max-width: 520px;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 12px 36px rgba(0,0,0,0.6);
        }
        .modal-header {
            padding: 10px 14px;
            background: var(--panel-bg);
            border-bottom: 1px solid var(--border-solid);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h3 {
            font-size: 13px;
            font-weight: 700;
        }
        .modal-actions {
            display: flex;
            gap: 6px;
            align-items: center;
        }
        .modal-actions button {
            background: #232629;
            border: 1px solid #4d5052;
            color: var(--text-color);
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            border-radius: 3px;
        }
        .modal-actions button:hover {
            background: rgba(61, 174, 233, 0.15);
            border-color: var(--accent-color);
        }
        .modal-body {
            padding: 16px;
            overflow-y: auto;
            font-size: 13px;
            line-height: 1.5;
            white-space: pre-wrap;
        }
        .empty-state {
            text-align: center;
            padding: 50px 16px;
            color: var(--sub-color);
        }
        .search-info {
            color: var(--sub-color);
            font-size: 12px;
            padding: 6px 10px;
            background: var(--panel-bg);
            border: 1px dashed var(--border-solid);
            border-radius: 4px;
            margin-bottom: 10px;
        }

        @media (max-width: 900px) {
            .day-grid { grid-template-columns: repeat(2, 1fr); }
            .analytics-grid { grid-template-columns: 1fr; }
        }
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
    <div id="app">
        <div id="waybar">
            <div class="waybar-group">
                <button class="waybar-btn view-btn-active" id="viewListBtn">
                    <svg viewBox="0 0 24 24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
                    LIST
                </button>
                <button class="waybar-btn" id="viewCalBtn">
                    <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 12H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
                    CAL
                </button>
                <button class="waybar-btn" id="viewDetailBtn">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>
                    TIMERS
                </button>
                <button class="waybar-btn" id="viewTimelineBtn">
                    <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                    TIMELINE
                </button>
            </div>
            <div class="waybar-group">
                <div id="searchContainer">
                    <svg style="width:13px;height:13px;fill:var(--sub-color);" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <input type="text" id="searchInput" placeholder="search reports..." />
                    <span class="search-clear" id="searchClear">×</span>
                    <span class="search-count" id="searchCount"></span>
                </div>
                <button class="waybar-btn" id="refreshBtn" title="Refresh Reports">
                    <svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                </button>
            </div>
        </div>

        <div id="terminal-grid">
            <div class="term-pane" id="mainPane">
                <div class="output-area" id="outputArea">
                    <div class="banner">&gt; Initializing Plasma Berichtsheft viewer v2.5...</div>
                </div>
            </div>
        </div>
    </div>

    <div id="calendarModal">
        <div class="modal-box">
            <div class="modal-header">
                <h3 id="modalTitle">Day Entry</h3>
                <div class="modal-actions">
                    <button id="copyModalBtn">Copy</button>
                    <button class="modal-close" id="closeModalBtn">Close</button>
                </div>
            </div>
            <div class="modal-body" id="modalContent"></div>
        </div>
    </div>
    `;

    (function() {
        "use strict";

        const strings = {
            daysList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            shortDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            monthNames: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
            noReports: "NO REPORTS FOUND",
            searchResults: "results",
            noSearchResults: "no results",
            ho: "HOME OFFICE",
            fetching: "Fetching repository report files...",
            parsing: "Parsing DOCX table structures...",
            done: "Loading complete."
        };

        // German holidays for 2024-2026
        const germanHolidays = {
            '2024-01-01': 'New Year',
            '2024-02-14': 'Valentine',
            '2024-03-29': 'Good Friday',
            '2024-04-01': 'Easter Monday',
            '2024-05-01': 'Labor Day',
            '2024-05-09': 'Ascension',
            '2024-05-20': 'Whit Monday',
            '2024-05-30': 'Corpus Christi',
            '2024-10-03': 'German Unity',
            '2024-12-25': 'Christmas',
            '2024-12-26': 'Boxing Day',
            '2025-01-01': 'New Year',
            '2025-02-14': 'Valentine',
            '2025-04-18': 'Good Friday',
            '2025-04-21': 'Easter Monday',
            '2025-05-01': 'Labor Day',
            '2025-05-29': 'Ascension',
            '2025-06-09': 'Whit Monday',
            '2025-06-19': 'Corpus Christi',
            '2025-10-03': 'German Unity',
            '2025-12-25': 'Christmas',
            '2025-12-26': 'Boxing Day',
            '2026-01-01': 'New Year',
            '2026-02-14': 'Valentine',
            '2026-04-10': 'Good Friday',
            '2026-04-13': 'Easter Monday',
            '2026-05-01': 'Labor Day',
            '2026-05-21': 'Ascension',
            '2026-06-01': 'Whit Monday',
            '2026-06-11': 'Corpus Christi',
            '2026-10-03': 'German Unity',
            '2026-12-25': 'Christmas',
            '2026-12-26': 'Boxing Day'
        };

        let allReports = [];
        let expandedCards = new Set();
        let currentView = 'list';
        let calendarYear = new Date().getFullYear();
        let calendarMonth = new Date().getMonth();
        let searchTerm = '';
        let isLoading = false;

        const PARSE_DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
        const STOP_DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

        const output = document.getElementById('outputArea');
        const mainPane = document.getElementById('mainPane');
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        const searchCount = document.getElementById('searchCount');
        const refreshBtn = document.getElementById('refreshBtn');
        const viewListBtn = document.getElementById('viewListBtn');
        const viewCalBtn = document.getElementById('viewCalBtn');
        const viewDetailBtn = document.getElementById('viewDetailBtn');
        const viewStatsBtn = document.getElementById('viewStatsBtn');
        const viewTimelineBtn = document.getElementById('viewTimelineBtn');

        function printHTML(html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            output.appendChild(div);
            mainPane.scrollTop = mainPane.scrollHeight;
        }

        function clearOutput() {
            output.innerHTML = '';
        }

        function escapeHTML(str) {
            if (!str) return '';
            const d = document.createElement('div');
            d.textContent = str;
            return d.innerHTML;
        }

        function extractDayContent(text, dayName) {
            const patterns = [
                new RegExp(dayName + '[\\s\\-:;]*([\\s\\S]*?)(?=\\n\\s*(?:' + STOP_DAY_NAMES.join('|') + ')|$)', 'i'),
                new RegExp('\\|\\s*' + dayName + '\\s*\\|([^|]*)\\|', 'i'),
                new RegExp(dayName + '\\s*[-–]\\s*([\\s\\S]*?)(?=\\n\\s*(?:' + STOP_DAY_NAMES.join('|') + ')|$)', 'i')
            ];
            
            for (const pattern of patterns) {
                const match = text.match(pattern);
                if (match) {
                    let content = match[1].trim();
                    content = content
                        .replace(/(?:\n|^)\s*(?:Samstag|Sonntag)\b[\s\S]*$/i, '')
                        .replace(/\b\d+\s*(?:h|Std\.|Stunden)\b/gi, '')
                        .replace(/[–\-]\s*Selbständig.*$/gim, '')
                        .replace(/\d{2}\.\d{2}\.\d{4}\s*$/g, '')
                        .replace(/\s+\b8\b.*$/gm, '')
                        .replace(/\|\s*$/, '')
                        .replace(/^[•\-*+]\s*/, '')
                        .trim();
                    
                    const lines = content.split('\n')
                        .map(l => l.trim())
                        .filter(l => l && !l.match(/^[-–]{3,}$/))
                        .map(l => l.replace(/^[-*•+]\s*/, '• '));
                    
                    const hasHO = lines.some(l => /^HO$/i.test(l) || /home office/i.test(l));
                    const filteredLines = lines.filter(l => !/^HO$/i.test(l) && !/home office/i.test(l));
                    
                    if (filteredLines.length === 0 && hasHO) {
                        return { content: '🏠 ' + strings.ho, isHO: true };
                    }
                    
                    return { content: filteredLines.join('\n') || '—', isHO: hasHO };
                }
            }
            return { content: '—', isHO: false };
        }

        async function fetchAndParseDocx(report) {
            try {
                // Wait for JSZip to be available
                let attempts = 0;
                while (typeof JSZip === 'undefined' && attempts < 50) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }
                if (typeof JSZip === 'undefined') {
                    console.error('JSZip failed to load');
                    return;
                }

                // Try primary fetch, then fallback through CORS proxy
                let resp = await fetch(report.url);
                if (!resp.ok) {
                    resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(report.url));
                }
                if (!resp.ok) {
                    // Try another CORS proxy
                    resp = await fetch('https://cors-anywhere.herokuapp.com/' + report.url);
                }
                if (!resp.ok) return;

                let arrayBuffer;
                try {
                    arrayBuffer = await resp.arrayBuffer();
                } catch (e) {
                    console.warn('Failed to get array buffer:', e);
                    return;
                }

                if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                    console.warn('Empty array buffer for:', report.name);
                    return;
                }

                const zip = await JSZip.loadAsync(arrayBuffer);
                const docFile = zip.file('word/document.xml');
                if (!docFile) return;
                const xml = await docFile.async('string');

                // Extract all table rows (<w:tr>) and cells (<w:tc>) for robust table mapping
                const trRegex = /<w:tr[^>]*>([\s\S]*?)<\/w:tr>/g;
                let rows = [], trMatch;
                while ((trMatch = trRegex.exec(xml)) !== null) {
                    const tcRegex = /<w:tc[^>]*>([\s\S]*?)<\/w:tc>/g;
                    let cells = [], tcMatch;
                    while ((tcMatch = tcRegex.exec(trMatch[1])) !== null) {
                        const cellXml = tcMatch[1];
                        const textContent = (cellXml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [])
                            .map(x => x.replace(/<[^>]*>/g, '').trim())
                            .filter(Boolean);
                        cells.push(textContent.join(' '));
                    }
                    if (cells.length > 0) {
                        rows.push(cells);
                    }
                }

                // Extract paragraph text for fallback & date detection
                const pRegex = /<w:p[^>]*>([\s\S]*?)<\/w:p>/g;
                let paragraphs = [], pMatch;
                while ((pMatch = pRegex.exec(xml)) !== null) {
                    const textContent = (pMatch[1].match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [])
                        .map(x => x.replace(/<[^>]*>/g, '').trim())
                        .filter(Boolean);
                    if (textContent.length) {
                        paragraphs.push(textContent.join(' '));
                    }
                }
                const fullText = paragraphs.join('\n');

                const days = {};
                for (const dayName of PARSE_DAY_NAMES) {
                    days[dayName] = { content: '—', isHO: false };
                }

                // Map table rows to days
                for (const row of rows) {
                    let foundDay = null;
                    let contentColText = '';

                    for (let c = 0; c < row.length; c++) {
                        const cellText = row[c].trim();
                        for (const dayName of PARSE_DAY_NAMES) {
                            if (new RegExp('^' + dayName + '$', 'i').test(cellText)) {
                                foundDay = dayName;
                                if (c + 1 < row.length) {
                                    contentColText = row[c + 1].trim();
                                }
                                break;
                            }
                        }
                        if (foundDay) break;
                    }

                    if (foundDay) {
                        let content = contentColText;
                        if (!content || content === '8' || content === '—') {
                            content = row.filter(cell => !new RegExp('^(' + PARSE_DAY_NAMES.join('|') + ')$', 'i').test(cell.trim()) && cell.trim() !== '8' && cell.trim() !== '—').join(' ');
                        }

                        if (content && content.trim()) {
                            content = content.replace(/^[•\-*+]\s*/gm, '').trim();
                            const lines = content.split('\n')
                                .map(l => l.trim())
                                .filter(l => l && !l.match(/^[-–]{3,}$/))
                                .map(l => l.replace(/^[-*•+]\s*/, '• '));

                            const hasHO = lines.some(l => /^HO$/i.test(l) || /home office/i.test(l));
                            const filteredLines = lines.filter(l => !/^HO$/i.test(l) && !/home office/i.test(l));

                            if (filteredLines.length === 0 && hasHO) {
                                days[foundDay] = { content: '🏠 ' + strings.ho, isHO: true };
                            } else {
                                days[foundDay] = { content: filteredLines.join('\n') || content, isHO: hasHO };
                            }
                        }
                    }
                }

                // Fallback text regex extraction for any missing days
                for (const dayName of PARSE_DAY_NAMES) {
                    if (!days[dayName] || days[dayName].content === '—') {
                        const res = extractDayContent(fullText, dayName);
                        if (res.content !== '—') {
                            days[dayName] = res;
                        }
                    }
                }

                report.days = days;

                const dateMatch = fullText.match(/(?:vom|Ausbildungswoche vom)[:\s]*(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/i) ||
                                  fullText.match(/(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/);
                if (dateMatch) {
                    let d = parseInt(dateMatch[1]), mo = parseInt(dateMatch[2]) - 1, y = parseInt(dateMatch[3]);
                    if (y < 100) y += 2000;
                    const parsed = new Date(y, mo, d);
                    if (!isNaN(parsed.getTime())) {
                        const day = parsed.getDay();
                        const diff = parsed.getDate() - day + (day === 0 ? -6 : 1);
                        report.mondayDate = new Date(parsed.setDate(diff));
                    }
                }
            } catch (e) {
                console.warn('Parse error', report.name, e);
            }
        }

        function performSearch(term) {
            if (!term || term.trim().length < 2) return allReports;
            const lowerTerm = term.toLowerCase().trim();
            return allReports.filter(report => {
                let matchFound = false;
                if (report.days) {
                    Object.entries(report.days).forEach(([dayName, dayData]) => {
                        if (dayData && dayData.content && dayData.content !== '—') {
                            if (dayData.content.toLowerCase().includes(lowerTerm)) {
                                matchFound = true;
                            }
                        }
                    });
                }
                if (report.name && report.name.toLowerCase().includes(lowerTerm)) {
                    matchFound = true;
                }
                return matchFound;
            });
        }

        function highlightText(text, term) {
            if (!term || term.trim().length < 2 || !text) return escapeHTML(text);
            const lowerText = text.toLowerCase();
            const lowerTerm = term.toLowerCase().trim();
            const indices = [];
            let startIndex = 0;

            while (true) {
                const idx = lowerText.indexOf(lowerTerm, startIndex);
                if (idx === -1) break;
                indices.push(idx);
                startIndex = idx + lowerTerm.length;
            }

            if (indices.length === 0) return escapeHTML(text);

            let result = '';
            let lastEnd = 0;
            indices.forEach(idx => {
                result += escapeHTML(text.substring(lastEnd, idx));
                result += `<span class="highlight">${escapeHTML(text.substring(idx, idx + lowerTerm.length))}</span>`;
                lastEnd = idx + lowerTerm.length;
            });
            result += escapeHTML(text.substring(lastEnd));
            return result;
        }

        refreshBtn.addEventListener('click', () => {
            if (!isLoading) loadData();
        });

        function switchView(view) {
            currentView = view;
            clearOutput();
            [viewListBtn, viewCalBtn, viewDetailBtn, viewTimelineBtn].forEach(btn => {
                btn.classList.remove('view-btn-active');
            });
            if (document.getElementById('viewStatsBtn')) {
                document.getElementById('viewStatsBtn').classList.remove('view-btn-active');
            }

            switch (view) {
                case 'list': viewListBtn.classList.add('view-btn-active'); renderListView(); break;
                case 'calendar': viewCalBtn.classList.add('view-btn-active'); renderCalendarView(); break;
                case 'detailed': viewDetailBtn.classList.add('view-btn-active'); renderDetailedStatsView(); break;
                case 'timeline': viewTimelineBtn.classList.add('view-btn-active'); renderTimelineView(); break;
            }
        }

        function refreshCurrentView() {
            switchView(currentView);
        }

        viewListBtn.addEventListener('click', () => switchView('list'));
        viewCalBtn.addEventListener('click', () => switchView('calendar'));
        viewDetailBtn.addEventListener('click', () => switchView('detailed'));
        if (document.getElementById('viewStatsBtn')) {
            document.getElementById('viewStatsBtn').addEventListener('click', () => switchView('detailed'));
        }
        viewTimelineBtn.addEventListener('click', () => switchView('timeline'));

        function handleSearch() {
            const term = searchInput.value;
            searchTerm = term;
            if (term.trim().length < 2) {
                searchClear.style.display = 'none';
                searchCount.textContent = '';
                refreshCurrentView();
                return;
            }
            searchClear.style.display = 'inline';
            const results = performSearch(term);
            searchCount.textContent = results.length > 0 ? `${results.length}` : '';
            refreshCurrentView();
        }

        function clearSearch() {
            searchInput.value = '';
            searchTerm = '';
            searchClear.style.display = 'none';
            searchCount.textContent = '';
            refreshCurrentView();
        }

        searchInput.addEventListener('input', handleSearch);
        searchClear.addEventListener('click', clearSearch);

        function renderListView() {
            let reports = allReports;
            let searchActive = false;

            if (searchTerm && searchTerm.trim().length >= 2) {
                reports = performSearch(searchTerm);
                searchActive = true;
                if (reports.length > 0) {
                    printHTML(`<div class="search-info">&gt; ${reports.length} ${strings.searchResults} for "${escapeHTML(searchTerm)}"</div>`);
                } else {
                    printHTML(`<div class="search-info">&gt; "${escapeHTML(searchTerm)}": ${strings.noSearchResults}</div>`);
                }
            }

            if (!reports || !reports.length) {
                printHTML('<div class="empty-state"><div style="font-size:28px;margin-bottom:8px;">📁</div><div>' + strings.noReports + '</div></div>');
                return;
            }

            for (const r of reports) {
                const collapsed = expandedCards.has(r.name) ? '' : 'collapsed';
                let title = r.name.replace(/\.docx?$/i, '');
                if (r.mondayDate) {
                    const end = new Date(r.mondayDate);
                    end.setDate(end.getDate() + 4);
                    const fmt = (d) => String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getDate()).padStart(2, '0') + '/' + String(d.getFullYear()).slice(-2);
                    title = 'Week: ' + fmt(r.mondayDate) + ' → ' + fmt(end);
                }

                let html = '<div class="report-card ' + collapsed + '" data-name="' + escapeHTML(r.name) + '">' +
                    '<div class="card-header">' +
                    '<div class="card-title"><span style="color:var(--accent-color);">📄</span> ' + escapeHTML(title) + '</div>' +
                    '<div class="card-badges">' +
                    (r.isFisi ? '<span class="badge">[FISI]</span>' : '') +
                    '<span class="chevron"></span>' +
                    '</div></div>' +
                    '<div class="card-body"><div class="day-grid">';

                for (let i = 0; i < PARSE_DAY_NAMES.length; i++) {
                    const dayName = PARSE_DAY_NAMES[i];
                    const d = r.days ? r.days[dayName] : null;
                    const has = d && d.content && d.content !== '—';
                    let dateSub = '';
                    if (r.mondayDate) {
                        const dd = new Date(r.mondayDate);
                        dd.setDate(dd.getDate() + i);
                        dateSub = String(dd.getMonth() + 1).padStart(2, '0') + '/' + String(dd.getDate()).padStart(2, '0') + '/' + String(dd.getFullYear()).slice(-2);
                    }

                    let contentHTML = '';
                    const isHO = d && d.isHO;
                    const hoBadge = isHO ? ' <span class="badge-ho">[HO]</span>' : '';

                    if (has) {
                        contentHTML = (searchActive && searchTerm) ? highlightText(d.content, searchTerm) : escapeHTML(d.content);
                    } else {
                        contentHTML = '<span class="day-empty">NO ENTRY</span>';
                    }

                    const dayClass = isHO ? 'day-card ho-day' : 'day-card';
                    html += '<div class="' + dayClass + '">' +
                        '<div class="day-name"><span>[' + strings.daysList[i].toUpperCase() + ']</span>' +
                        (dateSub ? '<span class="day-date-sub">' + dateSub + '</span>' : '') +
                        '</div>' +
                        hoBadge +
                        '<div class="day-content">' + contentHTML + '</div></div>';
                }
                html += '</div></div></div>';
                printHTML(html);
            }

            document.querySelectorAll('.card-header').forEach(h => {
                h.addEventListener('click', function() {
                    const card = this.closest('.report-card');
                    const name = card.dataset.name;
                    if (card.classList.contains('collapsed')) {
                        document.querySelectorAll('.report-card').forEach(c => c.classList.add('collapsed'));
                        expandedCards.clear();
                        card.classList.remove('collapsed');
                        expandedCards.add(name);
                    } else {
                        card.classList.add('collapsed');
                        expandedCards.delete(name);
                    }
                });
            });
            mainPane.scrollTop = mainPane.scrollHeight;
        }

        function renderCalendarView() {
            clearOutput();

            if (searchTerm && searchTerm.trim().length >= 2) {
                const results = performSearch(searchTerm);
                printHTML(`<div class="search-info">&gt; ${results.length} ${strings.searchResults} for "${escapeHTML(searchTerm)}"</div>`);
            }

            // Get all unique months with data
            const monthsWithData = new Map();
            for (const r of allReports) {
                if (!r.mondayDate || !r.days) continue;
                PARSE_DAY_NAMES.forEach((dayName, dayIndex) => {
                    const d = r.days[dayName];
                    if (d && d.content && d.content !== '—') {
                        const exact = new Date(r.mondayDate);
                        exact.setDate(exact.getDate() + dayIndex);
                        const key = exact.getFullYear() + '-' + exact.getMonth();
                        if (!monthsWithData.has(key)) {
                            monthsWithData.set(key, { year: exact.getFullYear(), month: exact.getMonth() });
                        }
                    }
                });
            }

            if (monthsWithData.size === 0) {
                printHTML('<div class="empty-state"><div>📁</div><div>NO CALENDAR DATA AVAILABLE</div></div>');
                return;
            }

            // Sort months chronologically
            const sortedMonths = Array.from(monthsWithData.values()).sort((a, b) => {
                const aKey = a.year * 12 + a.month;
                const bKey = b.year * 12 + b.month;
                return aKey - bKey;
            });

            // Render all months
            sortedMonths.forEach(({ year, month }) => {
                const container = document.createElement('div');
                container.className = 'calendar-container';
                output.appendChild(container);

                const header = document.createElement('div');
                header.className = 'calendar-header-controls';
                header.innerHTML = `<span id="calendarMonthTitle">&gt; ${strings.monthNames[month]} ${year} &lt;</span>`;
                container.appendChild(header);

                const grid = document.createElement('div');
                grid.className = 'calendar-grid';
                container.appendChild(grid);

                buildCalendarGridForMonth(grid, year, month);
            });
        }

        function buildCalendarGrid(grid) {
            const now = new Date();
            const entryMap = {};
            const searchTermLower = searchTerm ? searchTerm.toLowerCase().trim() : '';

            for (const r of allReports) {
                if (!r.mondayDate || !r.days) continue;
                PARSE_DAY_NAMES.forEach((dayName, dayIndex) => {
                    const d = r.days[dayName];
                    if (d && d.content && d.content !== '—') {
                        const exact = new Date(r.mondayDate);
                        exact.setDate(exact.getDate() + dayIndex);
                        const k = exact.getFullYear() + '-' + exact.getMonth() + '-' + exact.getDate();
                        entryMap[k] = { content: d.content, isHO: d.isHO || false };
                    }
                });
            }

            const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
            // For weekday-only grid (Mon-Fri): calculate empty slots before 1st
            // If month starts on Sat/Sun, add 5 empty slots; otherwise offset based on day
            const emptySlots = (firstDayOfMonth === 0 || firstDayOfMonth === 6) ? 5 : (firstDayOfMonth - 1);
            const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

            let html = strings.daysList.map(d => '<div class="cal-day-header">' + d.toUpperCase() + '</div>').join('');
            // Add empty cells before the 1st of the month to maintain alignment
            for (let e = 0; e < emptySlots; e++) {
                html += '<div class="cal-cell empty"></div>';
            }
            for (let i = 1; i <= daysInMonth; i++) {
                const dateObj = new Date(calendarYear, calendarMonth, i);
                const dayOfWeek = dateObj.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                
                if (!isWeekend) {
                    const isToday = now.getFullYear() === calendarYear && now.getMonth() === calendarMonth && now.getDate() === i;
                    const key = calendarYear + '-' + calendarMonth + '-' + i;
                    const entry = entryMap[key] || null;
                    const content = entry ? entry.content : null;
                    const isHO = entry ? entry.isHO : false;
                    const holidayKey = calendarYear + '-' + String(calendarMonth + 1).padStart(2, '0') + '-' + String(i).padStart(2, '0');
                    const holiday = germanHolidays[holidayKey];

                    let isSearchMatch = (content && searchTermLower && searchTermLower.length >= 2) ? content.toLowerCase().includes(searchTermLower) : false;

                    html += '<div class="cal-cell ' + (isToday ? 'today' : '') + ' ' + (content ? 'has-entry' : '') + (isSearchMatch ? ' search-match' : '') + (holiday ? ' holiday' : '') + '" ' +
                        (content ? 'data-key="' + key + '"' : '') + ' title="' + (holiday ? holiday : '') + '">' +
                        '<div class="cal-date">' + (i < 10 ? '0' + i : i) + (isHO ? ' 🏠' : '') + (holiday ? ' 🎄' : '') + '</div>' +
                        (content ? '<div class="cal-preview">' + escapeHTML(content.substring(0, 50)) + '</div>' : '') +
                        '</div>';
                }
            }
            grid.innerHTML = html;

            grid.querySelectorAll('.has-entry').forEach(cell => {
                cell.addEventListener('click', () => {
                    const k = cell.dataset.key;
                    const parts = k.split('-');
                    const d = new Date(parts[0], parts[1], parts[2]);
                    document.getElementById('modalTitle').textContent = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
                    document.getElementById('modalContent').textContent = entryMap[k] ? entryMap[k].content : '';
                    document.getElementById('calendarModal').style.display = 'flex';
                });
            });
        }

        function buildCalendarGridForMonth(grid, year, month) {
            const now = new Date();
            const entryMap = {};
            const searchTermLower = searchTerm ? searchTerm.toLowerCase().trim() : '';

            for (const r of allReports) {
                if (!r.mondayDate || !r.days) continue;
                PARSE_DAY_NAMES.forEach((dayName, dayIndex) => {
                    const d = r.days[dayName];
                    if (d && d.content && d.content !== '—') {
                        const exact = new Date(r.mondayDate);
                        exact.setDate(exact.getDate() + dayIndex);
                        const k = exact.getFullYear() + '-' + exact.getMonth() + '-' + exact.getDate();
                        entryMap[k] = { content: d.content, isHO: d.isHO || false };
                    }
                });
            }

            const firstDayOfMonth = new Date(year, month, 1).getDay();
            // For weekday-only grid (Mon-Fri): calculate empty slots before 1st
            // If month starts on Sat/Sun, add 5 empty slots; otherwise offset based on day
            const emptySlots = (firstDayOfMonth === 0 || firstDayOfMonth === 6) ? 5 : (firstDayOfMonth - 1);
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            let html = strings.daysList.map(d => '<div class="cal-day-header">' + d.toUpperCase() + '</div>').join('');
            // Add empty cells before the 1st of the month to maintain alignment
            for (let e = 0; e < emptySlots; e++) {
                html += '<div class="cal-cell empty"></div>';
            }
            for (let i = 1; i <= daysInMonth; i++) {
                const dateObj = new Date(year, month, i);
                const dayOfWeek = dateObj.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                
                if (!isWeekend) {
                    const isToday = now.getFullYear() === year && now.getMonth() === month && now.getDate() === i;
                    const key = year + '-' + month + '-' + i;
                    const entry = entryMap[key] || null;
                    const content = entry ? entry.content : null;
                    const isHO = entry ? entry.isHO : false;
                    const holidayKey = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(i).padStart(2, '0');
                    const holiday = germanHolidays[holidayKey];

                    let isSearchMatch = (content && searchTermLower && searchTermLower.length >= 2) ? content.toLowerCase().includes(searchTermLower) : false;

                    html += '<div class="cal-cell ' + (isToday ? 'today' : '') + ' ' + (content ? 'has-entry' : '') + (isSearchMatch ? ' search-match' : '') + (holiday ? ' holiday' : '') + '" ' +
                        (content ? 'data-key="' + key + '"' : '') + ' title="' + (holiday ? holiday : '') + '">' +
                        '<div class="cal-date">' + (i < 10 ? '0' + i : i) + (isHO ? ' 🏠' : '') + (holiday ? ' 🎄' : '') + '</div>' +
                        (content ? '<div class="cal-preview">' + escapeHTML(content.substring(0, 50)) + '</div>' : '') +
                        '</div>';
                }
            }
            grid.innerHTML = html;

            grid.querySelectorAll('.has-entry').forEach(cell => {
                cell.addEventListener('click', () => {
                    const k = cell.dataset.key;
                    const parts = k.split('-');
                    const d = new Date(parts[0], parts[1], parts[2]);
                    document.getElementById('modalTitle').textContent = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
                    document.getElementById('modalContent').textContent = entryMap[k] ? entryMap[k].content : '';
                    document.getElementById('calendarModal').style.display = 'flex';
                });
            });
        }

        function getMinMaxDates() {
            const valid = allReports.map(r => r.mondayDate?.getTime()).filter(t => !isNaN(t));
            if (!valid.length) return { min: new Date(), max: new Date() };
            return { min: new Date(Math.min(...valid)), max: new Date(Math.max(...valid)) };
        }

        function renderDetailedStatsView() {
            clearOutput();
            const container = document.createElement('div');
            container.className = 'detailed-container';
            output.appendChild(container);

            // Timers Section Title
            const timerTitle = document.createElement('div');
            timerTitle.style.cssText = 'font-size:12px;font-weight:700;color:var(--sub-color);text-transform:uppercase;margin-bottom:12px;letter-spacing:0.5px;';
            timerTitle.innerHTML = '&gt; TIMERS';
            container.appendChild(timerTitle);

            const timerGrid = document.createElement('div');
            timerGrid.className = 'analytics-grid';
            container.appendChild(timerGrid);

            const timerItems = [
                { id: 'timerStart', label: 'START' },
                { id: 'timerCompletion', label: 'COMPLETION' },
                { id: 'timerFeierabend', label: 'WORKDAY END' },
                { id: 'timerWeekend', label: 'NEXT WEEKEND' }
            ];

            timerItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'analytics-card';
                card.innerHTML = `<h3>${item.label}</h3><div class="timer-display" id="${item.id}">--</div>`;
                timerGrid.appendChild(card);
            });
            updateDetailedTimers();

            // Stats Section Title
            const statsTitle = document.createElement('div');
            statsTitle.style.cssText = 'font-size:12px;font-weight:700;color:var(--sub-color);text-transform:uppercase;margin-top:20px;margin-bottom:12px;letter-spacing:0.5px;';
            statsTitle.innerHTML = '&gt; STATISTICS';
            container.appendChild(statsTitle);

            const totalWeeks = allReports.length;
            const totalEntries = allReports.reduce((acc, r) => acc + Object.values(r.days || {}).filter(d => d && d.content && d.content !== '—').length, 0);
            const maxPossible = totalWeeks * 5;
            const completionRate = maxPossible > 0 ? Math.round((totalEntries / maxPossible) * 100) : 0;
            const progress = totalWeeks > 0 ? Math.round((totalWeeks / 104) * 100) : 0;

            const statsGrid = document.createElement('div');
            statsGrid.className = 'analytics-grid';
            statsGrid.innerHTML = `
                <div class="analytics-card">
                    <h3>TOTAL WEEKS</h3>
                    <div class="timer-display">${totalWeeks}</div>
                    <div class="stat-progress"><div class="stat-progress-fill" style="width:${Math.min(100, (totalWeeks/104)*100)}%"></div></div>
                </div>
                <div class="analytics-card">
                    <h3>COMPLETION</h3>
                    <div class="timer-display">${completionRate}%</div>
                    <div class="stat-progress"><div class="stat-progress-fill" style="width:${completionRate}%"></div></div>
                </div>
                <div class="analytics-card">
                    <h3>ENTRIES</h3>
                    <div class="timer-display">${totalEntries}</div>
                    <div class="stat-progress"><div class="stat-progress-fill" style="width:${Math.min(100, (totalEntries/maxPossible)*100)}%"></div></div>
                </div>
                <div class="analytics-card">
                    <h3>PROGRESS</h3>
                    <div class="timer-display">${progress}%</div>
                    <div class="stat-progress"><div class="stat-progress-fill" style="width:${progress}%"></div></div>
                </div>
            `;
            container.appendChild(statsGrid);
        }

        function updateDetailedTimers() {
            const validDates = allReports.map(r => r.mondayDate?.getTime()).filter(t => !isNaN(t));
            const earliest = validDates.length ? new Date(Math.min(...validDates)) : new Date();
            const now = new Date();
            const daysAgo = Math.floor((now.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));
            
            const target = new Date(earliest);
            target.setFullYear(target.getFullYear() + 2);
            const daysLeft = Math.floor((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            const el = (id) => document.getElementById(id);
            if (el('timerStart')) el('timerStart').textContent = `-${Math.max(0, daysAgo)} DAYS`;
            if (el('timerCompletion')) el('timerCompletion').textContent = `+${Math.max(0, daysLeft)} DAYS`;

            const dow = now.getDay();
            const ft = new Date(now); ft.setHours(16, 0, 0, 0);
            const fd = ft.getTime() - now.getTime();
            if (el('timerFeierabend')) el('timerFeierabend').textContent = fd > 0 ? `+${Math.floor(fd/3600000)}h` : 'REACHED';

            const nw = new Date(now);
            let daysUntilFri = (5 - dow + 7) % 7;
            nw.setDate(now.getDate() + daysUntilFri); nw.setHours(16, 0, 0, 0);
            if (el('timerWeekend')) el('timerWeekend').textContent = `+${Math.max(0, Math.floor((nw.getTime() - now.getTime())/3600000))}h`;
        }

        // Removed: renderStatsView - now combined with renderDetailedStatsView for compact display

        function renderTimelineView() {
            clearOutput();
            const allEntries = [];
            allReports.forEach(r => {
                if (!r.mondayDate || !r.days) return;
                PARSE_DAY_NAMES.forEach((dayName, dayIndex) => {
                    const dayData = r.days[dayName];
                    if (dayData && dayData.content && dayData.content !== '—') {
                        const date = new Date(r.mondayDate);
                        date.setDate(date.getDate() + dayIndex);
                        allEntries.push({ date, report: r, content: dayData.content, isHO: dayData.isHO || false });
                    }
                });
            });

            allEntries.sort((a, b) => b.date.getTime() - a.date.getTime());

            if (!allEntries.length) {
                printHTML('<div class="empty-state"><div>📁</div><div>NO ENTRIES FOUND</div></div>');
                return;
            }

            const container = document.createElement('div');
            container.className = 'detailed-container';
            container.innerHTML = `<div style="font-size:14px;font-weight:700;margin-bottom:12px;">&gt; TIMELINE</div>`;

            let filteredEntries = allEntries;
            if (searchTerm && searchTerm.trim().length >= 2) {
                const lowerTerm = searchTerm.toLowerCase().trim();
                filteredEntries = allEntries.filter(e => e.content.toLowerCase().includes(lowerTerm));
                const searchDiv = document.createElement('div');
                searchDiv.className = 'search-info';
                searchDiv.innerHTML = `&gt; ${filteredEntries.length} matches for "${escapeHTML(searchTerm)}"`;
                container.appendChild(searchDiv);
            }

            filteredEntries.slice(0, 30).forEach(entry => {
                const dateStr = entry.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
                const card = document.createElement('div');
                card.style.cssText = 'background:#232629;border:1px solid var(--border-solid);padding:10px;margin-bottom:8px;border-radius:4px;';
                card.innerHTML = `
                    <div style="font-size:11px;color:var(--accent-color);margin-bottom:4px;font-weight:600;">[${dateStr}] ${entry.report.name} ${entry.isHO ? '🏠 [HO]' : ''}</div>
                    <div style="font-size:12px;color:#d1d2d3;white-space:pre-wrap;">${escapeHTML(entry.content)}</div>
                `;
                container.appendChild(card);
            });

            output.appendChild(container);
        }

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            document.getElementById('calendarModal').style.display = 'none';
        });
        document.getElementById('calendarModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) document.getElementById('calendarModal').style.display = 'none';
        });
        document.getElementById('copyModalBtn').addEventListener('click', () => {
            const text = document.getElementById('modalContent').textContent;
            navigator.clipboard?.writeText(text).catch(() => {});
        });

        async function fetchReportFiles() {
            let resp = await fetch('https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/Reports');
            if (!resp.ok) {
                resp = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/Reports'));
            }
            if (!resp.ok) throw new Error('API error ' + resp.status);
            const data = await resp.json();
            const docFiles = data.filter(i => i.type === 'file' && /\.docx?$/i.test(i.name));
            
            return docFiles.map(item => {
                const rawUrl = 'https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/Reports/' + encodeURIComponent(item.name);
                let mondayDate = null;
                const m = item.name.match(/(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/);
                if (m) {
                    let d = parseInt(m[1]), mo = parseInt(m[2]) - 1, y = parseInt(m[3]);
                    if (y < 100) y += 2000;
                    const parsed = new Date(y, mo, d);
                    if (!isNaN(parsed.getTime())) {
                        const day = parsed.getDay();
                        const diff = parsed.getDate() - day + (day === 0 ? -6 : 1);
                        mondayDate = new Date(parsed.setDate(diff));
                    }
                }
                return { name: item.name, url: rawUrl, mondayDate, isFisi: /fisi/i.test(item.name), days: {} };
            }).sort((a, b) => (a.mondayDate?.getTime() || 0) - (b.mondayDate?.getTime() || 0));
        }

        async function loadData() {
            if (isLoading) return;
            isLoading = true;
            try {
                clearOutput();
                printHTML('<div style="color:var(--accent-color);">&gt; ' + strings.fetching + '</div>');

                const reports = await fetchReportFiles();
                if (!reports.length) throw new Error('No report files located in repository');
                
                allReports = reports;
                printHTML(`<div style="color:var(--sub-color);">&gt; Found ${reports.length} report files. ${strings.parsing}</div>`);

                let successCount = 0;
                for (let i = 0; i < allReports.length; i++) {
                    await fetchAndParseDocx(allReports[i]);
                    if (allReports[i].days && Object.keys(allReports[i].days).length > 0) {
                        successCount++;
                    }
                }

                if (successCount === 0) {
                    throw new Error('No reports could be parsed. Check if JSZip loaded correctly.');
                }

                printHTML(`<div style="color:var(--success-color);font-weight:700;">&gt; ${strings.done} (${successCount}/${allReports.length} parsed)</div>`);
                switchView('list');
            } catch (err) {
                clearOutput();
                printHTML('<div style="color:var(--danger-color);font-weight:700;">&gt; ERROR: ' + escapeHTML(err.message) + '</div>');
                printHTML('<div style="color:var(--sub-color);margin-top:6px;">Please check your connection and click Refresh.</div>');
                console.error('Data load error:', err);
            } finally {
                isLoading = false;
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
            if (e.key === 'Escape') {
                clearSearch();
                searchInput.blur();
                document.getElementById('calendarModal').style.display = 'none';
            }
        });

        loadData();

    })();

})();