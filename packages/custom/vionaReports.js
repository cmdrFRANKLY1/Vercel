(function() {
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['vionareports'] = {
            name: 'Viona Reports',
            version: '2.2.0',
            description: 'CFCC Berichtsheft advanced terminal report viewer',
            preInstalledOn: ['default'],
            translations: {},
            commands: {
                vionareports: function(args) {
                    const wrapperName = 'vionareports';
                    const hasNt = args && args.includes('-nt');
                    const hasNw = args && args.includes('-nw');

                    const htmlContent = generateVionaReportsHTML();
                    if (hasNw || hasNt) {
                        const win = window.open('', '_blank', hasNw ? 'width=1024,height=768,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes' : '');
                        if (win) {
                            win.document.write(htmlContent);
                            win.document.close();
                        }
                    } else {
                        if (typeof window.createWrapperTab !== 'undefined') {
                            const blob = new Blob([htmlContent], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            window.createWrapperTab(wrapperName, url);
                        } else if (typeof window.openWrapperWindow !== 'undefined') {
                            const blob = new Blob([htmlContent], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            window.openWrapperWindow(wrapperName, url);
                        } else {
                            const win = window.open('', '_blank');
                            if (win) {
                                win.document.write(htmlContent);
                                win.document.close();
                            }
                        }
                    }
                }
            },
            commandInfo: {
                vionareports: "what is this command?\nvionareports\n\nwhat is it used for?\nOpens the Viona Berichtsheft report terminal, which pulls weekly report .docx files from the GitHub repository and displays them as list, calendar, timer, stats, and timeline views."
            }
        };
    }

    function generateVionaReportsHTML() {
        let bgColor = '#000000', textColor = '#ffffff', fontFamily = 'Arial, Helvetica, sans-serif', fontSize = '15px';
        let borderStart = '#ffffff', borderEnd = '#555555', borderSolid = '#444444', hintColor = '#888888';
        
        if (typeof document !== 'undefined' && document.documentElement) {
            const getVar = (name, fallback) => {
                let val = document.documentElement.style.getPropertyValue(name).trim();
                if (!val && typeof getComputedStyle !== 'undefined') {
                    val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
                }
                return val || fallback;
            };
            bgColor = getVar('--bg-color', bgColor);
            textColor = getVar('--text-color', textColor);
            fontFamily = getVar('--font-family', fontFamily);
            fontSize = getVar('--font-size', fontSize);
            borderStart = getVar('--modal-border-start', getVar('--border-start', borderStart));
            borderEnd = getVar('--modal-border-end', getVar('--border-end', borderEnd));
            hintColor = getVar('--hint-color', hintColor);
            borderSolid = getVar('--modal-border', hintColor);
        }

        return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>CFCC · Berichtsheft · Advanced Terminal</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">\n' +
'  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>\n' +
'  \n' +
'  <style>\n' +
'    /* ===== MONOCHROME RESET & GLOBAL ===== */\n' +
'    * {\n' +
'      box-sizing: border-box;\n' +
'      margin: 0;\n' +
'      padding: 0;\n' +
'      user-select: none;\n' +
'      -webkit-user-select: none;\n' +
'    }\n' +
'    input, textarea, .day-content, .day-content * {\n' +
'      user-select: text !important;\n' +
'      -webkit-user-select: text !important;\n' +
'    }\n' +
'    \n' +
'    :root {\n' +
'      --bg-color: ' + bgColor + ';\n' +
'      --text-color: ' + textColor + ';\n' +
'      --font-family: ' + fontFamily + ';\n' +
'      --font-size: ' + fontSize + ';\n' +
'      --border-start: ' + borderStart + ';\n' +
'      --border-end: ' + borderEnd + ';\n' +
'      --border-solid: ' + borderSolid + ';\n' +
'      --hint-color: ' + hintColor + ';\n' +
'      --hover-bg: ' + textColor + ';\n' +
'      --hover-text: ' + bgColor + ';\n' +
'      --scrollbar-thumb: ' + borderEnd + ';\n' +
'    }\n' +
'\n' +
'    body, html {\n' +
'      height: 100vh;\n' +
'      background: var(--bg-color);\n' +
'      color: var(--text-color);\n' +
'      font-family: var(--font-family);\n' +
'      font-size: var(--font-size);\n' +
'      line-height: 1.5;\n' +
'      overflow: hidden;\n' +
'    }\n' +
'\n' +
'    ::-webkit-scrollbar { width: 6px; height: 6px; }\n' +
'    ::-webkit-scrollbar-track { background: var(--bg-color); }\n' +
'    ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 0; }\n' +
'    \n' +
'    #app {\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      height: 100vh;\n' +
'      width: 100vw;\n' +
'      background: var(--bg-color);\n' +
'      overflow: hidden;\n' +
'    }\n' +
'\n' +
'    /* ===== TERMINAL HEADER ===== */\n' +
'    #waybar {\n' +
'      height: 28px;\n' +
'      min-height: 28px;\n' +
'      width: 100%;\n' +
'      background: var(--bg-color);\n' +
'      color: var(--text-color);\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      padding: 0 14px;\n' +
'      font-family: var(--font-family);\n' +
'      font-size: 13px;\n' +
'      flex-shrink: 0;\n' +
'      z-index: 100;\n' +
'      border-bottom: 1px solid transparent;\n' +
'      border-image: linear-gradient(90deg, var(--border-start), var(--border-end)) 1;\n' +
'    }\n' +
'    \n' +
'    .waybar-btn {\n' +
'      cursor: pointer;\n' +
'      padding: 0 8px;\n' +
'      transition: background 0.15s, color 0.15s;\n' +
'      height: 100%;\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      font-weight: 600;\n' +
'      color: var(--text-color);\n' +
'      background: transparent;\n' +
'      border: none;\n' +
'      font-family: inherit;\n' +
'      font-size: 13px;\n' +
'    }\n' +
'    .waybar-btn:hover {\n' +
'      background: var(--hover-bg);\n' +
'      color: var(--hover-text);\n' +
'    }\n' +
'\n' +
'    .view-btn-active {\n' +
'      background: var(--text-color);\n' +
'      color: var(--bg-color);\n' +
'    }\n' +
'\n' +
'    /* ===== SEARCH BAR - TERMINAL STYLE ===== */\n' +
'    #searchContainer {\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      gap: 4px;\n' +
'      padding: 2px 8px;\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid var(--border-solid);\n' +
'      height: 24px;\n' +
'      min-width: 180px;\n' +
'      max-width: 300px;\n' +
'    }\n' +
'    #searchInput {\n' +
'      background: transparent;\n' +
'      border: none;\n' +
'      color: var(--text-color);\n' +
'      font-family: var(--font-family);\n' +
'      font-size: 12px;\n' +
'      outline: none;\n' +
'      width: 100%;\n' +
'      min-width: 80px;\n' +
'      padding: 0;\n' +
'      height: 100%;\n' +
'    }\n' +
'    #searchInput::placeholder {\n' +
'      color: var(--hint-color);\n' +
'      font-style: italic;\n' +
'    }\n' +
'    .search-prompt {\n' +
'      color: var(--hint-color);\n' +
'      font-weight: bold;\n' +
'      font-size: 13px;\n' +
'      flex-shrink: 0;\n' +
'    }\n' +
'    .search-clear {\n' +
'      cursor: pointer;\n' +
'      color: var(--hint-color);\n' +
'      font-weight: bold;\n' +
'      padding: 0 2px;\n' +
'      font-size: 14px;\n' +
'      flex-shrink: 0;\n' +
'      display: none;\n' +
'    }\n' +
'    .search-clear:hover {\n' +
'      color: var(--text-color);\n' +
'    }\n' +
'    .search-count {\n' +
'      color: var(--hint-color);\n' +
'      font-size: 10px;\n' +
'      white-space: nowrap;\n' +
'      flex-shrink: 0;\n' +
'      min-width: 20px;\n' +
'      text-align: right;\n' +
'    }\n' +
'\n' +
'    /* ===== MAIN TERMINAL PANEL ===== */\n' +
'    #terminal-grid {\n' +
'      flex: 1;\n' +
'      display: grid;\n' +
'      grid-template-columns: 1fr;\n' +
'      grid-template-rows: 1fr;\n' +
'      background: var(--border-end);\n' +
'      min-height: 0;\n' +
'    }\n' +
'    .term-pane {\n' +
'      background: var(--bg-color);\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      overflow-y: auto;\n' +
'      padding: 12px 16px;\n' +
'      position: relative;\n' +
'    }\n' +
'    .output-area {\n' +
'      white-space: pre-wrap;\n' +
'      word-wrap: break-word;\n' +
'      flex: 1;\n' +
'    }\n' +
'    \n' +
'    .banner { color: var(--hint-color); margin-bottom: 15px; font-weight: bold; }\n' +
'    \n' +
'    /* ===== REPORT CARD ===== */\n' +
'    .report-card {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid var(--border-solid);\n' +
'      border-left: 2px solid var(--text-color);\n' +
'      margin: 10px 0;\n' +
'      padding: 0;\n' +
'      transition: border-color 0.1s;\n' +
'    }\n' +
'    .report-card:hover { border-color: var(--text-color); }\n' +
'    .card-header {\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      padding: 8px 12px;\n' +
'      cursor: pointer;\n' +
'      border-bottom: 1px dashed var(--border-solid);\n' +
'      font-weight: bold;\n' +
'      font-size: 14px;\n' +
'      flex-wrap: wrap;\n' +
'      gap: 8px;\n' +
'    }\n' +
'    .card-header:hover { background: rgba(255,255,255,0.05); }\n' +
'    .card-title { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }\n' +
'    .card-badges { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }\n' +
'    .badge {\n' +
'      font-size: 12px;\n' +
'      font-weight: bold;\n' +
'      color: var(--text-color);\n' +
'      letter-spacing: 1px;\n' +
'    }\n' +
'    .badge-ho {\n' +
'      color: #ffaa00;\n' +
'      border: 1px solid #ffaa00;\n' +
'      padding: 0 6px;\n' +
'      font-size: 10px;\n' +
'    }\n' +
'    .chevron::after { content: "[-]"; font-family: monospace; }\n' +
'    .report-card.collapsed .chevron::after { content: "[+]"; }\n' +
'    .report-card.collapsed .card-body { display: none; }\n' +
'    .report-card.collapsed .card-header { border-bottom: none; }\n' +
'    \n' +
'    .card-body { padding: 12px; }\n' +
'    .day-grid {\n' +
'      display: grid;\n' +
'      grid-template-columns: repeat(5, 1fr);\n' +
'      gap: 12px;\n' +
'    }\n' +
'    .day-card {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid var(--border-solid);\n' +
'      padding: 8px;\n' +
'      position: relative;\n' +
'    }\n' +
'    .day-card.ho-day {\n' +
'      border-color: #ffaa00;\n' +
'    }\n' +
'    .day-name {\n' +
'      font-weight: 700;\n' +
'      font-size: 13px;\n' +
'      margin-bottom: 6px;\n' +
'      color: var(--text-color);\n' +
'      border-bottom: 1px solid var(--border-solid);\n' +
'      padding-bottom: 4px;\n' +
'    }\n' +
'    .day-date-sub { font-size: 11px; color: var(--hint-color); float: right; }\n' +
'    .day-content {\n' +
'      font-size: 13px;\n' +
'      color: var(--text-color);\n' +
'      opacity: 0.85;\n' +
'      white-space: pre-wrap;\n' +
'      word-break: break-word;\n' +
'      max-height: 120px;\n' +
'      overflow-y: auto;\n' +
'      line-height: 1.4;\n' +
'      margin-top: 4px;\n' +
'    }\n' +
'    .day-content .highlight {\n' +
'      background: var(--text-color);\n' +
'      color: var(--bg-color);\n' +
'      padding: 0 2px;\n' +
'    }\n' +
'    .day-empty { color: var(--hint-color); font-style: italic; font-size: 12px; }\n' +
'    .empty-state {\n' +
'      text-align: center;\n' +
'      padding: 40px 16px;\n' +
'      color: var(--hint-color);\n' +
'    }\n' +
'    .search-info {\n' +
'      color: var(--hint-color);\n' +
'      margin-bottom: 10px;\n' +
'      font-size: 13px;\n' +
'    }\n' +
'\n' +
'    /* ===== CALENDAR ===== */\n' +
'    .calendar-container {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid transparent;\n' +
'      border-image: linear-gradient(90deg, var(--border-start), var(--border-end)) 1;\n' +
'      padding: 16px;\n' +
'      margin: 10px 0;\n' +
'    }\n' +
'    .calendar-header-controls {\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      flex-wrap: wrap;\n' +
'      gap: 8px;\n' +
'      margin-bottom: 16px;\n' +
'    }\n' +
'    .cal-nav-group { display: flex; gap: 6px; align-items: center; }\n' +
'    .cal-nav-btn {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid var(--border-solid);\n' +
'      color: var(--text-color);\n' +
'      padding: 4px 12px;\n' +
'      font-family: var(--font-family);\n' +
'      font-size: 13px;\n' +
'      font-weight: bold;\n' +
'      cursor: pointer;\n' +
'      min-width: 44px;\n' +
'      text-align: center;\n' +
'    }\n' +
'    .cal-nav-btn:hover { background: var(--hover-bg); color: var(--hover-text); }\n' +
'    #calendarMonthTitle {\n' +
'      font-size: 15px;\n' +
'      font-weight: bold;\n' +
'      letter-spacing: 1px;\n' +
'    }\n' +
'    .calendar-grid {\n' +
'      display: grid;\n' +
'      grid-template-columns: repeat(7, 1fr);\n' +
'      gap: 1px;\n' +
'      background: var(--border-solid);\n' +
'      border: 1px solid var(--border-solid);\n' +
'    }\n' +
'    .cal-day-header {\n' +
'      text-align: center;\n' +
'      font-weight: bold;\n' +
'      font-size: 12px;\n' +
'      color: var(--bg-color);\n' +
'      background: var(--text-color);\n' +
'      padding: 4px 0;\n' +
'    }\n' +
'    .cal-cell {\n' +
'      background: var(--bg-color);\n' +
'      min-height: 75px;\n' +
'      padding: 6px;\n' +
'      position: relative;\n' +
'    }\n' +
'    .cal-cell.empty { background: rgba(255,255,255,0.02); }\n' +
'    .cal-cell.today { box-shadow: inset 0 0 0 1px var(--text-color); }\n' +
'    .cal-cell.has-entry { cursor: pointer; }\n' +
'    .cal-cell.has-entry:hover {\n' +
'      background: var(--text-color);\n' +
'      color: var(--bg-color);\n' +
'    }\n' +
'    .cal-cell.has-entry:hover .cal-date, .cal-cell.has-entry:hover .cal-preview {\n' +
'      color: var(--bg-color);\n' +
'    }\n' +
'    .cal-cell.weekend {\n' +
'      opacity: 0.3;\n' +
'    }\n' +
'    .cal-date { font-size: 13px; font-weight: bold; }\n' +
'    .cal-preview {\n' +
'      font-size: 11px;\n' +
'      color: var(--text-color);\n' +
'      opacity: 0.7;\n' +
'      line-height: 1.2;\n' +
'      margin-top: 4px;\n' +
'      overflow: hidden;\n' +
'      display: -webkit-box;\n' +
'      -webkit-line-clamp: 3;\n' +
'      -webkit-box-orient: vertical;\n' +
'      word-break: break-word;\n' +
'    }\n' +
'    .cal-cell.search-match {\n' +
'      border: 1px solid var(--text-color);\n' +
'    }\n' +
'    .cal-cell.search-match .cal-date {\n' +
'      color: var(--text-color);\n' +
'    }\n' +
'\n' +
'    /* ===== DETAILED VIEW ===== */\n' +
'    .detailed-container {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid transparent;\n' +
'      border-image: linear-gradient(90deg, var(--border-start), var(--border-end)) 1;\n' +
'      padding: 16px;\n' +
'      margin: 10px 0;\n' +
'    }\n' +
'    .analytics-grid {\n' +
'      display: grid;\n' +
'      grid-template-columns: repeat(2, 1fr);\n' +
'      gap: 16px;\n' +
'    }\n' +
'    .analytics-card {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid var(--border-solid);\n' +
'      border-left: 3px solid var(--text-color);\n' +
'      padding: 12px 14px;\n' +
'    }\n' +
'    .analytics-card h3 {\n' +
'      font-size: 13px;\n' +
'      font-weight: bold;\n' +
'      color: var(--text-color);\n' +
'      margin-bottom: 8px;\n' +
'      text-transform: uppercase;\n' +
'      letter-spacing: 0.5px;\n' +
'    }\n' +
'    .timer-display {\n' +
'      font-family: var(--font-family);\n' +
'      font-size: 18px;\n' +
'      font-weight: bold;\n' +
'      color: var(--text-color);\n' +
'      padding: 8px 12px;\n' +
'      background: transparent;\n' +
'      border: 1px dashed var(--border-solid);\n' +
'      text-align: center;\n' +
'    }\n' +
'\n' +
'    /* ===== STATS VIEW ===== */\n' +
'    .stats-container {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid transparent;\n' +
'      border-image: linear-gradient(90deg, var(--border-start), var(--border-end)) 1;\n' +
'      padding: 16px;\n' +
'      margin: 10px 0;\n' +
'    }\n' +
'    .stats-grid {\n' +
'      display: grid;\n' +
'      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n' +
'      gap: 16px;\n' +
'      margin-bottom: 20px;\n' +
'    }\n' +
'    .stat-card {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid var(--border-solid);\n' +
'      border-left: 3px solid var(--text-color);\n' +
'      padding: 12px 14px;\n' +
'      text-align: center;\n' +
'    }\n' +
'    .stat-number {\n' +
'      font-size: 32px;\n' +
'      font-weight: bold;\n' +
'      color: var(--text-color);\n' +
'    }\n' +
'    .stat-label {\n' +
'      font-size: 12px;\n' +
'      color: var(--hint-color);\n' +
'      margin-top: 4px;\n' +
'      text-transform: uppercase;\n' +
'      letter-spacing: 0.5px;\n' +
'    }\n' +
'    .stat-progress {\n' +
'      margin-top: 10px;\n' +
'      height: 4px;\n' +
'      background: var(--border-solid);\n' +
'    }\n' +
'    .stat-progress-fill {\n' +
'      height: 100%;\n' +
'      background: var(--text-color);\n' +
'      transition: width 0.5s;\n' +
'    }\n' +
'\n' +
'    /* ===== TIMELINE SEARCH HIGHLIGHT ===== */\n' +
'    .timeline-entry.search-match {\n' +
'      border-left: 2px solid var(--text-color) !important;\n' +
'      padding-left: 8px !important;\n' +
'    }\n' +
'\n' +
'    /* ===== MODAL ===== */\n' +
'    #calendarModal {\n' +
'      display: none;\n' +
'      position: fixed;\n' +
'      top: 0; left: 0; width: 100%; height: 100%;\n' +
'      background: rgba(0,0,0,0.8);\n' +
'      z-index: 2000;\n' +
'      align-items: center;\n' +
'      justify-content: center;\n' +
'      padding: 20px;\n' +
'    }\n' +
'    #calendarModal .modal-box {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid transparent;\n' +
'      border-image: linear-gradient(90deg, var(--border-start), var(--border-end)) 1;\n' +
'      width: 100%;\n' +
'      max-width: 500px;\n' +
'      max-height: 80vh;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      box-shadow: 0 8px 24px rgba(0,0,0,0.8);\n' +
'    }\n' +
'    .modal-header {\n' +
'      padding: 12px 16px;\n' +
'      border-bottom: 1px dashed var(--border-solid);\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'    }\n' +
'    .modal-header h3 { font-size: 14px; font-weight: bold; }\n' +
'    .modal-close {\n' +
'      background: none; border: none;\n' +
'      color: var(--text-color); font-size: 20px;\n' +
'      cursor: pointer; font-family: monospace; font-weight: bold;\n' +
'    }\n' +
'    .modal-close:hover { color: #ff5555; }\n' +
'    .modal-body {\n' +
'      padding: 16px;\n' +
'      overflow-y: auto;\n' +
'      font-size: 14px;\n' +
'      color: var(--text-color);\n' +
'      opacity: 0.9;\n' +
'      white-space: pre-wrap;\n' +
'      line-height: 1.6;\n' +
'    }\n' +
'    .modal-actions button {\n' +
'      background: var(--bg-color);\n' +
'      border: 1px solid var(--border-solid);\n' +
'      color: var(--text-color);\n' +
'      cursor: pointer;\n' +
'      padding: 4px 8px;\n' +
'      font-family: inherit; font-size: 13px; font-weight: bold;\n' +
'      margin-right: 10px;\n' +
'    }\n' +
'    .modal-actions button:hover { background: var(--text-color); color: var(--bg-color); }\n' +
'\n' +
'    /* ===== RESPONSIVE ===== */\n' +
'    @media (max-width: 900px) {\n' +
'      .day-grid { grid-template-columns: repeat(3, 1fr); }\n' +
'      .analytics-grid { grid-template-columns: 1fr; }\n' +
'      .calendar-grid { grid-template-columns: repeat(1, 1fr); gap: 0; }\n' +
'      .cal-day-header { display: none; }\n' +
'      .cal-cell { min-height: 50px; border-bottom: 1px solid var(--border-solid); }\n' +
'      .calendar-header-controls { flex-direction: column; align-items: stretch; gap: 8px; }\n' +
'      .cal-nav-group { justify-content: center; }\n' +
'      #searchContainer { min-width: 120px; max-width: 180px; }\n' +
'      #searchInput { min-width: 50px; font-size: 11px; }\n' +
'    }\n' +
'    @media (max-width: 600px) {\n' +
'      .day-grid { grid-template-columns: 1fr; }\n' +
'      .stats-grid { grid-template-columns: 1fr 1fr; }\n' +
'      #waybar { flex-wrap: wrap; height: auto; min-height: 28px; padding: 4px 8px; gap: 4px; }\n' +
'      .waybar-btn { font-size: 11px; padding: 0 4px; }\n' +
'      #searchContainer { min-width: 80px; max-width: 140px; padding: 2px 4px; }\n' +
'      #searchInput { font-size: 10px; min-width: 40px; }\n' +
'      .search-prompt { font-size: 11px; }\n' +
'      .search-count { font-size: 9px; min-width: 15px; }\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'\n' +
'<div id="app">\n' +
'  <!-- waybar -->\n' +
'  <div id="waybar">\n' +
'    <div style="display:flex; align-items:center; gap:4px; height: 100%; flex-wrap: wrap;">\n' +
'      <span class="waybar-btn" id="viewListBtn">[LISTVIEW]</span>\n' +
'      <span class="waybar-btn" id="viewCalBtn">[CALENDER]</span>\n' +
'      <span class="waybar-btn" id="viewDetailBtn">[TIMERS]</span>\n' +
'      <span class="waybar-btn" id="viewStatsBtn">[STATISTICS]</span>\n' +
'      <span class="waybar-btn" id="viewTimelineBtn">[TIMELINE]</span>\n' +
'    </div>\n' +
'    <div style="display:flex; align-items:center; gap:8px; height: 100%; flex-wrap: wrap;">\n' +
'      <div id="searchContainer">\n' +
'        <span class="search-prompt">/</span>\n' +
'        <input type="text" id="searchInput" placeholder="search..." />\n' +
'        <span class="search-clear" id="searchClear">✕</span>\n' +
'        <span class="search-count" id="searchCount"></span>\n' +
'      </div>\n' +
'      <span class="waybar-btn" id="langToggle">EN</span>\n' +
'    </div>\n' +
'  </div>\n' +
'\n' +
'  <div id="terminal-grid">\n' +
'    <div class="term-pane" id="mainPane">\n' +
'      <div class="output-area" id="outputArea">\n' +
'        <div class="banner">> init Berichtsheft module v2.2...</div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n' +
'\n' +
'<div id="calendarModal">\n' +
'  <div class="modal-box">\n' +
'    <div class="modal-header">\n' +
'      <h3 id="modalTitle">Day</h3>\n' +
'      <div class="modal-actions">\n' +
'        <button id="copyModalBtn">[COPY]</button>\n' +
'        <button class="modal-close" id="closeModalBtn">[X]</button>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div class="modal-body" id="modalContent"></div>\n' +
'  </div>\n' +
'</div>\n' +
'\n' +
'<script>\n' +
'  (function(){\n' +
'    "use strict";\n' +
'\n' +
'    function syncStyles() {\n' +
'      try {\n' +
'        if (window.parent && window.parent !== window && window.parent.document) {\n' +
'          const pStyle = window.parent.getComputedStyle(window.parent.document.documentElement);\n' +
'          const root = document.documentElement;\n' +
'          const getVar = (n) => window.parent.document.documentElement.style.getPropertyValue(n) || pStyle.getPropertyValue(n);\n' +
'          \n' +
'          const bg = getVar("--bg-color");\n' +
'          if (bg) root.style.setProperty("--bg-color", bg);\n' +
'          const txt = getVar("--text-color");\n' +
'          if (txt) {\n' +
'            root.style.setProperty("--text-color", txt);\n' +
'            root.style.setProperty("--hover-bg", txt);\n' +
'          }\n' +
'          if (bg) root.style.setProperty("--hover-text", bg);\n' +
'          const font = getVar("--font-family");\n' +
'          if (font) root.style.setProperty("--font-family", font);\n' +
'          const fSize = getVar("--font-size");\n' +
'          if (fSize) root.style.setProperty("--font-size", fSize);\n' +
'          const hint = getVar("--hint-color");\n' +
'          if (hint) root.style.setProperty("--hint-color", hint);\n' +
'          \n' +
'          const bStart = getVar("--modal-border-start") || getVar("--border-start");\n' +
'          if (bStart) root.style.setProperty("--border-start", bStart);\n' +
'          const bEnd = getVar("--modal-border-end") || getVar("--border-end");\n' +
'          if (bEnd) {\n' +
'            root.style.setProperty("--border-end", bEnd);\n' +
'            root.style.setProperty("--scrollbar-thumb", bEnd);\n' +
'          }\n' +
'          const mBorder = getVar("--modal-border") || hint;\n' +
'          if (mBorder) root.style.setProperty("--border-solid", mBorder);\n' +
'        }\n' +
'      } catch(e) {}\n' +
'    }\n' +
'    setInterval(syncStyles, 1000);\n' +
'\n' +
'    const i18n = {\n' +
'      en: {\n' +
'        label: "EN", daysList: [\'Mon\',\'Tue\',\'Wed\',\'Thu\',\'Fri\'],\n' +
'        shortDays: [\'Mon\',\'Tue\',\'Wed\',\'Thu\',\'Fri\',\'Sat\',\'Sun\'],\n' +
'        monthNames: ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"],\n' +
'        noReports: "NO REPORTS FOUND", errorLoading: "ERROR LOADING DATA",\n' +
'        start: "APPRENTICESHIP START", completion: "APPRENTICESHIP COMPLETION",\n' +
'        feierabend: "TIME TO END OF WORKDAY", weekend: "TIME TO NEXT WEEKEND",\n' +
'        topicProject: "PROJECT MANAGEMENT", topicSelfLearning: "LAST INDEPENDENT LEARNING",\n' +
'        topicSecurity: "IT-SECURITY", topicTechnology: "IT-TECHNOLOGY",\n' +
'        neverLogged: "NEVER LOGGED", weekendReached: "WEEKEND REACHED",\n' +
'        today: "TODAY", totalWeeks: "TOTAL WEEKS", totalEntries: "TOTAL ENTRIES",\n' +
'        completionRate: "COMPLETION RATE", progress: "PROGRESS",\n' +
'        timeline: "TIMELINE", \n' +
'        searchPlaceholder: "search...", searchResults: "results",\n' +
'        noSearchResults: "no results", ho: "HOME OFFICE"\n' +
'      },\n' +
'      de: {\n' +
'        label: "DE", daysList: [\'Mon\',\'Die\',\'Mit\',\'Don\',\'Fre\'],\n' +
'        shortDays: [\'Mo\',\'Di\',\'Mi\',\'Do\',\'Fr\',\'Sa\',\'So\'],\n' +
'        monthNames: ["JANUAR","FEBRUAR","MÄRZ","APRIL","MAI","JUNI","JULI","AUGUST","SEPTEMBER","OKTOBER","NOVEMBER","DEZEMBER"],\n' +
'        noReports: "KEINE BERICHTE GEFUNDEN", errorLoading: "FEHLER BEIM LADEN",\n' +
'        start: "AUSBILDUNGSBEGINN", completion: "AUSBILDUNGSENDE",\n' +
'        feierabend: "ZEIT BIS FEIERABEND", weekend: "ZEIT BIS WOCHENENDE",\n' +
'        topicProject: "PROJEKTMANAGEMENT", topicSelfLearning: "LETZTES SELBST. LERNEN",\n' +
'        topicSecurity: "IT-SICHERHEIT", topicTechnology: "IT-TECHNOLOGIE",\n' +
'        neverLogged: "NIE ERFASST", weekendReached: "WOCHENENDE ERREICHT",\n' +
'        today: "HEUTE", totalWeeks: "WOCHEN INSGESAMT", totalEntries: "EINTRÄGE INSGESAMT",\n' +
'        completionRate: "FERTIGSTELLUNGSRATE", progress: "FORTSCHRITT",\n' +
'        timeline: "ZEITLINIE",\n' +
'        searchPlaceholder: "suchen...", searchResults: "Ergebnisse",\n' +
'        noSearchResults: "keine Ergebnisse", ho: "HAUSARBEIT"\n' +
'      }\n' +
'    };\n' +
'\n' +
'    let currentLang = "en";\n' +
'    let allReports = [];\n' +
'    let expandedCards = new Set();\n' +
'    let currentView = \'list\';\n' +
'    let calendarYear = new Date().getFullYear();\n' +
'    let calendarMonth = new Date().getMonth();\n' +
'    let searchTerm = \'\';\n' +
'    const PARSE_DAY_NAMES = [\'Montag\', \'Dienstag\', \'Mittwoch\', \'Donnerstag\', \'Freitag\'];\n' +
'    const STOP_DAY_NAMES = [\'Montag\', \'Dienstag\', \'Mittwoch\', \'Donnerstag\', \'Freitag\', \'Samstag\', \'Sonntag\'];\n' +
'    const DAY_MAP = {\n' +
'      \'montag\': \'Montag\',\n' +
'      \'dienstag\': \'Dienstag\',\n' +
'      \'mittwoch\': \'Mittwoch\',\n' +
'      \'donnerstag\': \'Donnerstag\',\n' +
'      \'freitag\': \'Freitag\'\n' +
'    };\n' +
'\n' +
'    // DOM refs\n' +
'    const output = document.getElementById(\'outputArea\');\n' +
'    const mainPane = document.getElementById(\'mainPane\');\n' +
'    const searchInput = document.getElementById(\'searchInput\');\n' +
'    const searchClear = document.getElementById(\'searchClear\');\n' +
'    const searchCount = document.getElementById(\'searchCount\');\n' +
'    const langToggle = document.getElementById(\'langToggle\');\n' +
'    const viewListBtn = document.getElementById(\'viewListBtn\');\n' +
'    const viewCalBtn = document.getElementById(\'viewCalBtn\');\n' +
'    const viewDetailBtn = document.getElementById(\'viewDetailBtn\');\n' +
'    const viewStatsBtn = document.getElementById(\'viewStatsBtn\');\n' +
'    const viewTimelineBtn = document.getElementById(\'viewTimelineBtn\');\n' +
'\n' +
'    // ----- helper functions -----\n' +
'    function printHTML(html) {\n' +
'      const div = document.createElement(\'div\');\n' +
'      div.innerHTML = html;\n' +
'      output.appendChild(div);\n' +
'      mainPane.scrollTop = mainPane.scrollHeight;\n' +
'    }\n' +
'\n' +
'    function clearOutput() {\n' +
'      output.innerHTML = \'\';\n' +
'    }\n' +
'\n' +
'    // ----- improved text extraction -----\n' +
'    function extractDayContent(text, dayName) {\n' +
'      // Look for day name followed by content, handling various formats, stopping at ANY day including weekends\n' +
'      const patterns = [\n' +
'        // Pattern: "Montag" followed by content until next day or end\n' +
'        new RegExp(dayName + \'[\\\\s\\\\-:;]*([\\\\s\\\\S]*?)(?=\\\\n\\\\s*(?:\' + STOP_DAY_NAMES.join(\'|\') + \')|$)\', \'i\'),\n' +
'        // Pattern: "| Montag | content |" (table format)\n' +
'        new RegExp(\'\\\\|\\\\s*\' + dayName + \'\\\\s*\\\\|([^|]*)\\\\|\', \'i\'),\n' +
'        // Pattern: "Montag - content" \n' +
'        new RegExp(dayName + \'\\\\s*[-–]\\\\s*([\\\\s\\\\S]*?)(?=\\\\n\\\\s*(?:\' + STOP_DAY_NAMES.join(\'|\') + \')|$)\', \'i\')\n' +
'      ];\n' +
'      \n' +
'      for (const pattern of patterns) {\n' +
'        const match = text.match(pattern);\n' +
'        if (match) {\n' +
'          let content = match[1].trim();\n' +
'          // Clean up the content\n' +
'          content = content\n' +
'            .replace(/(?:\\n|^)\\s*(?:Samstag|Sonntag)\\b[\\s\\S]*$/i, \'\') // Force strip weekend blocks from bleed over\n' +
'            .replace(/\\b\\d+\\s*(?:h|Std\\.|Stunden)\\b/gi, \'\') // Remove hours\n' +
'            .replace(/[–\\-]\\s*Selbständig.*$/gim, \'\') // Remove "Selbständig" references\n' +
'            .replace(/\\d{2}\\.\\d{2}\\.\\d{4}\\s*$/g, \'\') // Remove dates at end\n' +
'            .replace(/\\s+\\b8\\b.*$/gm, \'\') // Remove "8" at end\n' +
'            .replace(/\\|\\s*$/, \'\') // Remove trailing pipe\n' +
'            .replace(/^[•\\-*+]\\s*/, \'\') // Remove bullet points\n' +
'            .trim();\n' +
'          \n' +
'          // Split by common separators and clean\n' +
'          const lines = content.split(\'\\n\')\n' +
'            .map(l => l.trim())\n' +
'            .filter(l => l && !l.match(/^[-–]{3,}$/))\n' +
'            .map(l => l.replace(/^[-*•+]\\s*/, \'• \'));\n' +
'          \n' +
'          // Filter out lines that are just "HO" or "Home Office" - we\'ll mark these specially\n' +
'          const hasHO = lines.some(l => /^HO$/i.test(l) || /home office/i.test(l));\n' +
'          const filteredLines = lines.filter(l => !/^HO$/i.test(l) && !/home office/i.test(l));\n' +
'          \n' +
'          if (filteredLines.length === 0 && hasHO) {\n' +
'            return { content: \'🏠 \' + i18n[currentLang].ho, isHO: true };\n' +
'          }\n' +
'          \n' +
'          return { content: filteredLines.join(\'\\n\') || \'—\', isHO: hasHO };\n' +
'        }\n' +
'      }\n' +
'      return { content: \'—\', isHO: false };\n' +
'    }\n' +
'\n' +
'    // ----- improved DOCX parsing -----\n' +
'    async function fetchAndParseDocx(report) {\n' +
'      try {\n' +
'        const resp = await fetch(report.url);\n' +
'        if (!resp.ok) return;\n' +
'        const zip = await JSZip.loadAsync(await resp.arrayBuffer());\n' +
'        const docFile = zip.file(\'word/document.xml\');\n' +
'        if (!docFile) return;\n' +
'        const xml = await docFile.async(\'string\');\n' +
'        \n' +
'        // Extract all text content preserving structure\n' +
'        const pRegex = /<w:p[^>]*>([\\s\\S]*?)<\\/w:p>/g;\n' +
'        let paragraphs = [], m;\n' +
'        while ((m = pRegex.exec(xml)) !== null) {\n' +
'          const textContent = (m[1].match(/<w:t[^>]*>([^<]*)<\\/w:t>/g) || [])\n' +
'            .map(x => x.replace(/<[^>]*>/g, \'\').trim())\n' +
'            .filter(Boolean);\n' +
'          if (textContent.length) {\n' +
'            paragraphs.push(textContent.join(\' \'));\n' +
'          }\n' +
'        }\n' +
'        \n' +
'        const fullText = paragraphs.join(\'\\n\');\n' +
'        \n' +
'        // Parse each day\n' +
'        const days = {};\n' +
'        for (const dayName of PARSE_DAY_NAMES) {\n' +
'          const result = extractDayContent(fullText, dayName);\n' +
'          days[dayName] = result;\n' +
'        }\n' +
'        \n' +
'        report.days = days;\n' +
'        \n' +
'        // Try to extract week dates from the document\n' +
'        const dateMatch = fullText.match(/(\\d{1,2})[\\.\\/](\\d{1,2})[\\.\\/](\\d{2,4})/);\n' +
'        if (dateMatch) {\n' +
'          let d = parseInt(dateMatch[1]), mo = parseInt(dateMatch[2])-1, y = parseInt(dateMatch[3]);\n' +
'          if (y < 100) y += 2000;\n' +
'          const parsed = new Date(y, mo, d);\n' +
'          if (!isNaN(parsed.getTime())) {\n' +
'            // Check if this is a Monday, if not find the Monday of that week\n' +
'            const day = parsed.getDay();\n' +
'            const diff = parsed.getDate() - day + (day === 0 ? -6 : 1);\n' +
'            report.mondayDate = new Date(parsed.setDate(diff));\n' +
'          }\n' +
'        }\n' +
'      } catch(e) { \n' +
'        console.warn(\'Parse error\', report.name, e); \n' +
'      }\n' +
'    }\n' +
'\n' +
'    // ----- search functions -----\n' +
'    function performSearch(term) {\n' +
'      if (!term || term.trim().length < 2) return allReports;\n' +
'      \n' +
'      const lowerTerm = term.toLowerCase().trim();\n' +
'      const matchedReports = allReports.filter(report => {\n' +
'        let matchFound = false;\n' +
'        \n' +
'        Object.entries(report.days).forEach(([dayName, dayData]) => {\n' +
'          if (dayData.content && dayData.content !== \'—\') {\n' +
'            const contentLower = dayData.content.toLowerCase();\n' +
'            if (contentLower.includes(lowerTerm)) {\n' +
'              matchFound = true;\n' +
'              if (!report._matches) report._matches = [];\n' +
'              report._matches.push({ day: dayName, content: dayData.content });\n' +
'            }\n' +
'          }\n' +
'        });\n' +
'        \n' +
'        if (report.name.toLowerCase().includes(lowerTerm)) {\n' +
'          matchFound = true;\n' +
'        }\n' +
'        \n' +
'        return matchFound;\n' +
'      });\n' +
'      \n' +
'      return matchedReports;\n' +
'    }\n' +
'\n' +
'    function highlightText(text, term) {\n' +
'      if (!term || term.trim().length < 2 || !text) return text;\n' +
'      \n' +
'      const lowerText = text.toLowerCase();\n' +
'      const lowerTerm = term.toLowerCase().trim();\n' +
'      const indices = [];\n' +
'      let startIndex = 0;\n' +
'      \n' +
'      while (true) {\n' +
'        const idx = lowerText.indexOf(lowerTerm, startIndex);\n' +
'        if (idx === -1) break;\n' +
'        indices.push(idx);\n' +
'        startIndex = idx + lowerTerm.length;\n' +
'      }\n' +
'      \n' +
'      if (indices.length === 0) return text;\n' +
'      \n' +
'      let result = \'\';\n' +
'      let lastEnd = 0;\n' +
'      indices.forEach(idx => {\n' +
'        result += text.substring(lastEnd, idx);\n' +
'        result += `<span class="highlight">${text.substring(idx, idx + lowerTerm.length)}</span>`;\n' +
'        lastEnd = idx + lowerTerm.length;\n' +
'      });\n' +
'      result += text.substring(lastEnd);\n' +
'      \n' +
'      return result;\n' +
'    }\n' +
'\n' +
'    // ----- update UI -----\n' +
'    function updateStaticUIText() {\n' +
'      langToggle.textContent = i18n[currentLang].label;\n' +
'      searchInput.placeholder = i18n[currentLang].searchPlaceholder;\n' +
'    }\n' +
'\n' +
'    langToggle.addEventListener(\'click\', ()=>{\n' +
'      currentLang = currentLang === \'en\' ? \'de\' : \'en\';\n' +
'      updateStaticUIText();\n' +
'      refreshCurrentView();\n' +
'    });\n' +
'\n' +
'    // ----- view switching -----\n' +
'    function switchView(view) {\n' +
'      currentView = view;\n' +
'      clearOutput();\n' +
'      \n' +
'      [viewListBtn, viewCalBtn, viewDetailBtn, viewStatsBtn, viewTimelineBtn].forEach(btn => {\n' +
'        btn.classList.remove(\'view-btn-active\');\n' +
'      });\n' +
'      \n' +
'      switch(view) {\n' +
'        case \'list\': viewListBtn.classList.add(\'view-btn-active\'); renderListView(); break;\n' +
'        case \'calendar\': viewCalBtn.classList.add(\'view-btn-active\'); renderCalendarView(); break;\n' +
'        case \'detailed\': viewDetailBtn.classList.add(\'view-btn-active\'); renderDetailedView(); break;\n' +
'        case \'stats\': viewStatsBtn.classList.add(\'view-btn-active\'); renderStatsView(); break;\n' +
'        case \'timeline\': viewTimelineBtn.classList.add(\'view-btn-active\'); renderTimelineView(); break;\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function refreshCurrentView() {\n' +
'      switchView(currentView);\n' +
'    }\n' +
'\n' +
'    viewListBtn.addEventListener(\'click\', ()=>switchView(\'list\'));\n' +
'    viewCalBtn.addEventListener(\'click\', ()=>switchView(\'calendar\'));\n' +
'    viewDetailBtn.addEventListener(\'click\', ()=>switchView(\'detailed\'));\n' +
'    viewStatsBtn.addEventListener(\'click\', ()=>switchView(\'stats\'));\n' +
'    viewTimelineBtn.addEventListener(\'click\', ()=>switchView(\'timeline\'));\n' +
'\n' +
'    // ----- search handlers -----\n' +
'    function handleSearch() {\n' +
'      const term = searchInput.value;\n' +
'      searchTerm = term;\n' +
'      \n' +
'      if (term.trim().length < 2) {\n' +
'        searchClear.style.display = \'none\';\n' +
'        searchCount.textContent = \'\';\n' +
'        refreshCurrentView();\n' +
'        return;\n' +
'      }\n' +
'      \n' +
'      searchClear.style.display = \'inline\';\n' +
'      const results = performSearch(term);\n' +
'      searchCount.textContent = results.length > 0 ? `${results.length}` : \'\';\n' +
'      refreshCurrentView();\n' +
'    }\n' +
'\n' +
'    function clearSearch() {\n' +
'      searchInput.value = \'\';\n' +
'      searchTerm = \'\';\n' +
'      searchClear.style.display = \'none\';\n' +
'      searchCount.textContent = \'\';\n' +
'      refreshCurrentView();\n' +
'    }\n' +
'\n' +
'    searchInput.addEventListener(\'input\', handleSearch);\n' +
'    searchClear.addEventListener(\'click\', clearSearch);\n' +
'    searchInput.addEventListener(\'keydown\', (e) => {\n' +
'      if (e.key === \'Escape\') clearSearch();\n' +
'    });\n' +
'\n' +
'    // ----- render list view -----\n' +
'    function renderListView() {\n' +
'      const lang = i18n[currentLang];\n' +
'      \n' +
'      let reports = allReports;\n' +
'      let searchActive = false;\n' +
'      \n' +
'      if (searchTerm && searchTerm.trim().length >= 2) {\n' +
'        reports = performSearch(searchTerm);\n' +
'        searchActive = true;\n' +
'        if (reports.length > 0) {\n' +
'          printHTML(`<div class="search-info">> ${reports.length} ${lang.searchResults} for "${searchTerm}"</div>`);\n' +
'        } else {\n' +
'          printHTML(`<div class="search-info">> ${searchTerm}: ${lang.noSearchResults}</div>`);\n' +
'        }\n' +
'      }\n' +
'      \n' +
'      if (!reports || !reports.length) {\n' +
'        printHTML(\'<div class="empty-state"><div>[!]</div><div>\'+lang.noReports+\'</div></div>\');\n' +
'        return;\n' +
'      }\n' +
'\n' +
'      for (const r of reports) {\n' +
'        const collapsed = expandedCards.has(r.name) ? \'\' : \'collapsed\';\n' +
'        let title = r.name.replace(/\\.docx?$/i,\'\');\n' +
'        if (r.mondayDate) {\n' +
'          const end = new Date(r.mondayDate); end.setDate(end.getDate()+4);\n' +
'          const fmt = (d)=> currentLang===\'en\' ?\n' +
'            (String(d.getMonth()+1).padStart(2,\'0\')+\'/\'+String(d.getDate()).padStart(2,\'0\')+\'/\'+String(d.getFullYear()).slice(-2)) :\n' +
'            d.toLocaleDateString(\'de-DE\',{day:\'2-digit\',month:\'2-digit\',year:\'numeric\'});\n' +
'          title = \'> \'+fmt(r.mondayDate)+\' TO \'+fmt(end);\n' +
'        }\n' +
'        \n' +
'        let html = \'<div class="report-card \'+collapsed+\'" data-name="\'+r.name+\'">\'+\n' +
'          \'<div class="card-header">\'+\n' +
'          \'<div class="card-title"><span>📄</span> \'+title+\'</div>\'+\n' +
'          \'<div class="card-badges">\'+\n' +
'          (r.isFisi?\'<span class="badge">[FISI]</span>\':\'\')+\n' +
'          \'<span class="chevron"></span>\'+\n' +
'          \'</div></div>\'+\n' +
'          \'<div class="card-body"><div class="day-grid">\';\n' +
'        \n' +
'        for (let i=0; i<PARSE_DAY_NAMES.length; i++) {\n' +
'          const dayName = PARSE_DAY_NAMES[i];\n' +
'          const d = r.days[dayName];\n' +
'          const has = d && d.content && d.content !== \'—\';\n' +
'          let dateSub = \'\';\n' +
'          if (r.mondayDate) {\n' +
'            const dd = new Date(r.mondayDate); dd.setDate(dd.getDate()+i);\n' +
'            dateSub = currentLang===\'en\' ?\n' +
'              (String(dd.getMonth()+1).padStart(2,\'0\')+\'/\'+String(dd.getDate()).padStart(2,\'0\')+\'/\'+String(dd.getFullYear()).slice(-2)) :\n' +
'              dd.toLocaleDateString(\'de-DE\',{day:\'2-digit\',month:\'2-digit\',year:\'numeric\'});\n' +
'          }\n' +
'          \n' +
'          let contentHTML = \'\';\n' +
'          const isHO = d && d.isHO;\n' +
'          const hoBadge = isHO ? \' <span class="badge-ho">[HO]</span>\' : \'\';\n' +
'          \n' +
'          if (has) {\n' +
'            if (searchActive && searchTerm) {\n' +
'              contentHTML = d.content.toLowerCase().includes(searchTerm.toLowerCase().trim()) ? \n' +
'                highlightText(d.content, searchTerm) : d.content;\n' +
'            } else {\n' +
'              contentHTML = d.content;\n' +
'            }\n' +
'          } else {\n' +
'            contentHTML = \'<span class="day-empty">NO ENTRY</span>\';\n' +
'          }\n' +
'          \n' +
'          const dayClass = isHO ? \'day-card ho-day\' : \'day-card\';\n' +
'          html += \'<div class="\'+dayClass+\'">\'+\n' +
'            \'<div class="day-name">[\'+lang.daysList[i].toUpperCase()+\']\'+\n' +
'            (dateSub?\' <span class="day-date-sub">\'+dateSub+\'</span>\':\'\')+\n' +
'            hoBadge+\n' +
'            \'</div>\'+\n' +
'            \'<div class="day-content">\'+(has ? contentHTML : \'<span class="day-empty">NO ENTRY</span>\')+\'</div></div>\';\n' +
'        }\n' +
'        html += \'</div></div></div>\';\n' +
'        printHTML(html);\n' +
'      }\n' +
'      \n' +
'      document.querySelectorAll(\'.card-header\').forEach(h => {\n' +
'        h.addEventListener(\'click\', function(e) {\n' +
'          const card = this.closest(\'.report-card\');\n' +
'          const name = card.dataset.name;\n' +
'          if (card.classList.contains(\'collapsed\')) {\n' +
'            document.querySelectorAll(\'.report-card\').forEach(c => c.classList.add(\'collapsed\'));\n' +
'            expandedCards.clear();\n' +
'            card.classList.remove(\'collapsed\');\n' +
'            expandedCards.add(name);\n' +
'          } else {\n' +
'            card.classList.add(\'collapsed\');\n' +
'            expandedCards.delete(name);\n' +
'          }\n' +
'        });\n' +
'      });\n' +
'    }\n' +
'\n' +
'    // ----- calendar view -----\n' +
'    function renderCalendarView() {\n' +
'      const lang = i18n[currentLang];\n' +
'      clearOutput();\n' +
'      \n' +
'      if (searchTerm && searchTerm.trim().length >= 2) {\n' +
'        const results = performSearch(searchTerm);\n' +
'        printHTML(`<div class="search-info">> ${results.length} ${lang.searchResults} for "${searchTerm}"</div>`);\n' +
'      }\n' +
'      \n' +
'      const container = document.createElement(\'div\');\n' +
'      container.className = \'calendar-container\';\n' +
'      container.id = \'calContainer\';\n' +
'      output.appendChild(container);\n' +
'\n' +
'      const header = document.createElement(\'div\');\n' +
'      header.className = \'calendar-header-controls\';\n' +
'\n' +
'      const leftGroup = document.createElement(\'div\');\n' +
'      leftGroup.className = \'cal-nav-group\';\n' +
'      leftGroup.innerHTML = `\n' +
'        <button class="cal-nav-btn" id="firstMonthBtn">[<<]</button>\n' +
'        <button class="cal-nav-btn" id="prevMonthBtn">[<]</button>\n' +
'        <button class="cal-nav-btn" id="todayBtn">[${lang.today}]</button>\n' +
'      `;\n' +
'\n' +
'      const titleSpan = document.createElement(\'span\');\n' +
'      titleSpan.id = \'calendarMonthTitle\';\n' +
'      titleSpan.textContent = `> ${lang.monthNames[calendarMonth]} ${calendarYear} <`;\n' +
'\n' +
'      const rightGroup = document.createElement(\'div\');\n' +
'      rightGroup.className = \'cal-nav-group\';\n' +
'      rightGroup.innerHTML = `\n' +
'        <button class="cal-nav-btn" id="nextMonthBtn">[>]</button>\n' +
'        <button class="cal-nav-btn" id="lastMonthBtn">[>>]</button>\n' +
'      `;\n' +
'\n' +
'      header.appendChild(leftGroup);\n' +
'      header.appendChild(titleSpan);\n' +
'      header.appendChild(rightGroup);\n' +
'      container.appendChild(header);\n' +
'\n' +
'      const grid = document.createElement(\'div\');\n' +
'      grid.className = \'calendar-grid\';\n' +
'      grid.id = \'calGrid\';\n' +
'      container.appendChild(grid);\n' +
'\n' +
'      buildCalendarGrid(grid);\n' +
'\n' +
'      document.getElementById(\'firstMonthBtn\').addEventListener(\'click\', ()=>{\n' +
'        const {min} = getMinMaxDates();\n' +
'        if (!isNaN(min.getTime())) { calendarYear=min.getFullYear(); calendarMonth=min.getMonth(); renderCalendarView(); }\n' +
'      });\n' +
'      document.getElementById(\'lastMonthBtn\').addEventListener(\'click\', ()=>{\n' +
'        const {max} = getMinMaxDates();\n' +
'        if (!isNaN(max.getTime())) { calendarYear=max.getFullYear(); calendarMonth=max.getMonth(); renderCalendarView(); }\n' +
'      });\n' +
'      document.getElementById(\'prevMonthBtn\').addEventListener(\'click\', ()=>{\n' +
'        let m=calendarMonth-1, y=calendarYear;\n' +
'        if (m<0) { m=11; y--; }\n' +
'        const {min} = getMinMaxDates();\n' +
'        if (y>min.getFullYear() || (y===min.getFullYear() && m>=min.getMonth())) {\n' +
'          calendarMonth=m; calendarYear=y; renderCalendarView();\n' +
'        }\n' +
'      });\n' +
'      document.getElementById(\'nextMonthBtn\').addEventListener(\'click\', ()=>{\n' +
'        let m=calendarMonth+1, y=calendarYear;\n' +
'        if (m>11) { m=0; y++; }\n' +
'        const {max} = getMinMaxDates();\n' +
'        if (y<max.getFullYear() || (y===max.getFullYear() && m<=max.getMonth())) {\n' +
'          calendarMonth=m; calendarYear=y; renderCalendarView();\n' +
'        }\n' +
'      });\n' +
'      document.getElementById(\'todayBtn\').addEventListener(\'click\', ()=>{\n' +
'        const now = new Date(); calendarYear=now.getFullYear(); calendarMonth=now.getMonth(); renderCalendarView();\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function buildCalendarGrid(grid) {\n' +
'      const lang = i18n[currentLang];\n' +
'      const now = new Date();\n' +
'      const entryMap = {};\n' +
'      const searchTermLower = searchTerm ? searchTerm.toLowerCase().trim() : \'\';\n' +
'      \n' +
'      for (const r of allReports) {\n' +
'        if (!r.mondayDate) continue;\n' +
'        for (let i=0; i<5; i++) {\n' +
'          const d = r.days[PARSE_DAY_NAMES[i]];\n' +
'          if (d && d.content && d.content !== \'—\') {\n' +
'            const exact = new Date(r.mondayDate); exact.setDate(exact.getDate()+i);\n' +
'            const k = exact.getFullYear()+\'-\'+exact.getMonth()+\'-\'+exact.getDate();\n' +
'            entryMap[k] = { content: d.content, isHO: d.isHO || false };\n' +
'          }\n' +
'        }\n' +
'      }\n' +
'      \n' +
'      const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();\n' +
'      const offset = firstDay===0 ? 6 : firstDay-1;\n' +
'      const daysInMonth = new Date(calendarYear, calendarMonth+1, 0).getDate();\n' +
'\n' +
'      let html = lang.shortDays.map(d => \'<div class="cal-day-header">\'+d.toUpperCase()+\'</div>\').join(\'\');\n' +
'      for (let i=0; i<offset; i++) html += \'<div class="cal-cell empty"></div>\';\n' +
'      for (let i=1; i<=daysInMonth; i++) {\n' +
'        const dateObj = new Date(calendarYear, calendarMonth, i);\n' +
'        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;\n' +
'        const isToday = now.getFullYear()===calendarYear && now.getMonth()===calendarMonth && now.getDate()===i;\n' +
'        const key = calendarYear+\'-\'+calendarMonth+\'-\'+i;\n' +
'        const entry = entryMap[key] || null;\n' +
'        const content = entry ? entry.content : null;\n' +
'        const isHO = entry ? entry.isHO : false;\n' +
'        \n' +
'        let isSearchMatch = false;\n' +
'        if (content && searchTermLower && searchTermLower.length >= 2) {\n' +
'          isSearchMatch = content.toLowerCase().includes(searchTermLower);\n' +
'        }\n' +
'        \n' +
'        const weekendClass = isWeekend ? \' weekend\' : \'\';\n' +
'        const hoIndicator = isHO ? \' 🏠\' : \'\';\n' +
'        \n' +
'        html += \'<div class="cal-cell \'+(isToday?\'today\':\'\')+\' \'+(content?\'has-entry\':\'\')+ (isSearchMatch?\' search-match\':\'\') + weekendClass + \'" \'+\n' +
'          (content ? \'data-key="\'+key+\'"\' : \'\') +\'>\'+\n' +
'          \'<div class="cal-date">\'+(i<10?\'0\'+i:i)+hoIndicator+\'</div>\'+\n' +
'          (content ? \'<div class="cal-preview">\'+content.replace(/<[^>]*>/g,\'\')+\'</div>\' : \'\')+\n' +
'          \'</div>\';\n' +
'      }\n' +
'      grid.innerHTML = html;\n' +
'      \n' +
'      grid.querySelectorAll(\'.has-entry\').forEach(cell => {\n' +
'        cell.addEventListener(\'click\', ()=>{\n' +
'          const k = cell.dataset.key;\n' +
'          const parts = k.split(\'-\');\n' +
'          const d = new Date(parts[0], parts[1], parts[2]);\n' +
'          document.getElementById(\'modalTitle\').textContent = "> " + d.toLocaleDateString(currentLang===\'en\'?\'en-US\':\'de-DE\', { weekday:\'long\', year:\'numeric\', month:\'long\', day:\'numeric\' }).toUpperCase();\n' +
'          \n' +
'          let content = entryMap[k] ? entryMap[k].content : \'\';\n' +
'          if (searchTerm && searchTerm.trim().length >= 2) {\n' +
'            content = highlightText(content, searchTerm);\n' +
'          }\n' +
'          document.getElementById(\'modalContent\').innerHTML = content;\n' +
'          document.getElementById(\'calendarModal\').style.display = \'flex\';\n' +
'        });\n' +
'      });\n' +
'    }\n' +
'\n' +
'    function getMinMaxDates() {\n' +
'      const valid = allReports.map(r => r.mondayDate?.getTime()).filter(t => !isNaN(t));\n' +
'      if (!valid.length) return { min: new Date(), max: new Date() };\n' +
'      return { min: new Date(Math.min(...valid)), max: new Date(Math.max(...valid)) };\n' +
'    }\n' +
'\n' +
'    // ----- detailed/timers view (unchanged) -----\n' +
'    function renderDetailedView() {\n' +
'      clearOutput();\n' +
'      \n' +
'      if (searchTerm && searchTerm.trim().length >= 2) {\n' +
'        const results = performSearch(searchTerm);\n' +
'        const lang = i18n[currentLang];\n' +
'        printHTML(`<div class="search-info">> ${results.length} ${lang.searchResults} for "${searchTerm}"</div>`);\n' +
'      }\n' +
'      \n' +
'      const container = document.createElement(\'div\');\n' +
'      container.className = \'detailed-container\';\n' +
'      output.appendChild(container);\n' +
'      const grid = document.createElement(\'div\');\n' +
'      grid.className = \'analytics-grid\';\n' +
'      container.appendChild(grid);\n' +
'      \n' +
'      const items = [\n' +
'        { id:\'timerStart\', label:\'start\' },\n' +
'        { id:\'timerCompletion\', label:\'completion\' },\n' +
'        { id:\'timerFeierabend\', label:\'feierabend\' },\n' +
'        { id:\'timerWeekend\', label:\'weekend\' },\n' +
'        { id:\'timerProject\', label:\'topicProject\' },\n' +
'        { id:\'timerSelfLearning\', label:\'topicSelfLearning\' },\n' +
'        { id:\'timerSecurity\', label:\'topicSecurity\' },\n' +
'        { id:\'timerTechnology\', label:\'topicTechnology\' }\n' +
'      ];\n' +
'      for (const item of items) {\n' +
'        const card = document.createElement(\'div\');\n' +
'        card.className = \'analytics-card\';\n' +
'        card.innerHTML = `<h3><span id="${item.id}Label">${i18n[currentLang][item.label]}</span></h3>\n' +
'        <div class="timer-display" id="${item.id}">--</div>`;\n' +
'        grid.appendChild(card);\n' +
'      }\n' +
'      updateDetailedTimers();\n' +
'    }\n' +
'\n' +
'    function findLatestDateForTopic(regex) {\n' +
'      let latest = null;\n' +
'      for (const r of allReports) {\n' +
'        if (!r.mondayDate) continue;\n' +
'        for (let i=0; i<5; i++) {\n' +
'          const c = r.days[PARSE_DAY_NAMES[i]]?.content;\n' +
'          if (c && c!==\'—\' && regex.test(c)) {\n' +
'            const d = new Date(r.mondayDate); d.setDate(d.getDate()+i);\n' +
'            if (!latest || d>latest) latest = d;\n' +
'          }\n' +
'        }\n' +
'      }\n' +
'      return latest;\n' +
'    }\n' +
'\n' +
'    function formatAgo(diffMs) {\n' +
'      if (diffMs < 0) return currentLang===\'en\' ? \'-00:00:00 AGO\' : \'-00:00:00 VORHER\';\n' +
'      const secs = Math.floor(diffMs/1000);\n' +
'      const h = Math.floor(secs/3600);\n' +
'      const m = String(Math.floor((secs%3600)/60)).padStart(2,\'0\');\n' +
'      const s = String(secs%60).padStart(2,\'0\');\n' +
'      return currentLang===\'en\' ? \'-\'+h+\':\'+m+\':\'+s+\' AGO\' : \'-\'+h+\':\'+m+\':\'+s+\' ZUVOR\';\n' +
'    }\n' +
'\n' +
'    function formatCountdown(diffMs) {\n' +
'      if (diffMs <= 0) return i18n[currentLang].weekendReached;\n' +
'      const secs = Math.floor(diffMs/1000);\n' +
'      const h = Math.floor(secs/3600);\n' +
'      const m = String(Math.floor((secs%3600)/60)).padStart(2,\'0\');\n' +
'      const s = String(secs%60).padStart(2,\'0\');\n' +
'      return \'+\'+h+\':\'+m+\':\'+s;\n' +
'    }\n' +
'\n' +
'    function updateDetailedTimers() {\n' +
'      const lang = i18n[currentLang];\n' +
'      const earliest = getEarliestDate();\n' +
'      const now = new Date();\n' +
'      const diff = now.getTime() - earliest.getTime();\n' +
'      const daysAgo = diff >= 0 ? Math.floor(diff/(1000*60*60*24)) : 0;\n' +
'      const target = new Date(earliest); target.setFullYear(target.getFullYear()+2);\n' +
'      const left = target.getTime() - now.getTime();\n' +
'      const daysLeft = left >= 0 ? Math.floor(left/(1000*60*60*24)) : 0;\n' +
'\n' +
'      const el = (id) => document.getElementById(id);\n' +
'      if (el(\'timerStart\')) el(\'timerStart\').textContent = currentLang===\'en\' ? \'-\'+daysAgo+\' DAYS\' : \'-\'+daysAgo+\' TAGE\';\n' +
'      if (el(\'timerCompletion\')) el(\'timerCompletion\').textContent = currentLang===\'en\' ? \'+\'+daysLeft+\' DAYS\' : \'+\'+daysLeft+\' TAGE\';\n' +
'\n' +
'      const dow = now.getDay();\n' +
'      const ft = new Date(now); \n' +
'      ft.setHours(16, 0, 0, 0);\n' +
'      const fd = ft.getTime() - now.getTime();\n' +
'\n' +
'      if (dow >= 1 && dow <= 5 && fd > 0) {\n' +
'        if (el(\'timerFeierabendLabel\')) el(\'timerFeierabendLabel\').textContent = i18n[currentLang].feierabend;\n' +
'        if (el(\'timerFeierabend\')) el(\'timerFeierabend\').textContent = formatCountdown(fd);\n' +
'      } else {\n' +
'        if (el(\'timerFeierabendLabel\')) {\n' +
'          el(\'timerFeierabendLabel\').textContent = currentLang === \'en\' ? \'START OF NEXT WORKDAY\' : \'BEGINN DES NÄCHSTEN ARBEITSTAGES\';\n' +
'        }\n' +
'        let nextStart = new Date(now);\n' +
'        if (dow === 5 && fd <= 0) {\n' +
'          nextStart.setDate(now.getDate() + 3);\n' +
'        } else if (dow === 6) {\n' +
'          nextStart.setDate(now.getDate() + 2);\n' +
'        } else if (dow === 0) {\n' +
'          nextStart.setDate(now.getDate() + 1);\n' +
'        } else {\n' +
'          nextStart.setDate(now.getDate() + 1);\n' +
'        }\n' +
'        nextStart.setHours(8, 0, 0, 0);\n' +
'        const nextFd = nextStart.getTime() - now.getTime();\n' +
'        if (el(\'timerFeierabend\')) el(\'timerFeierabend\').textContent = formatCountdown(nextFd);\n' +
'      }\n' +
'\n' +
'      const nw = new Date(now);\n' +
'      let daysUntilFri = (5 - dow + 7) % 7;\n' +
'      if (daysUntilFri===0 && (now.getHours()>16 || (now.getHours()===16 && now.getMinutes()>0))) daysUntilFri=7;\n' +
'      nw.setDate(now.getDate()+daysUntilFri); nw.setHours(16,0,0,0);\n' +
'      const wd = nw.getTime() - now.getTime();\n' +
'      if (el(\'timerWeekend\')) el(\'timerWeekend\').textContent = formatCountdown(wd);\n' +
'\n' +
'      const project = findLatestDateForTopic(/\\b(?:projektmanagement|projekt\\s+management|project\\s+management)\\b/i);\n' +
'      if (el(\'timerProject\')) el(\'timerProject\').textContent = project ? formatAgo(now.getTime()-project.getTime()) : lang.neverLogged;\n' +
'      const self = findLatestDateForTopic(/\\b(?:selbstständiges\\s*lernen|selbstaendiges\\s*lernen|eigenstudium|recherche)\\b/i);\n' +
'      if (el(\'timerSelfLearning\')) el(\'timerSelfLearning\').textContent = self ? formatAgo(now.getTime()-self.getTime()) : lang.neverLogged;\n' +
'      const sec = findLatestDateForTopic(/\\b(?:it\\s*[-–]?\\s*security|it\\s*[-–]?\\s*sicherheit)\\b/i);\n' +
'      if (el(\'timerSecurity\')) el(\'timerSecurity\').textContent = sec ? formatAgo(now.getTime()-sec.getTime()) : lang.neverLogged;\n' +
'      const tech = findLatestDateForTopic(/\\b(?:it\\s*[-–]?\\s*technology|it\\s*[-–]?\\s*technologie)\\b/i);\n' +
'      if (el(\'timerTechnology\')) el(\'timerTechnology\').textContent = tech ? formatAgo(now.getTime()-tech.getTime()) : lang.neverLogged;\n' +
'    }\n' +
'\n' +
'    function getEarliestDate() {\n' +
'      const valid = allReports.map(r => r.mondayDate?.getTime()).filter(t => !isNaN(t));\n' +
'      return valid.length ? new Date(Math.min(...valid)) : new Date();\n' +
'    }\n' +
'\n' +
'    // ----- stats view -----\n' +
'    function renderStatsView() {\n' +
'      const lang = i18n[currentLang];\n' +
'      clearOutput();\n' +
'      \n' +
'      if (searchTerm && searchTerm.trim().length >= 2) {\n' +
'        const results = performSearch(searchTerm);\n' +
'        printHTML(`<div class="search-info">> ${results.length} ${lang.searchResults} for "${searchTerm}"</div>`);\n' +
'      }\n' +
'      \n' +
'      const totalWeeks = allReports.length;\n' +
'      const totalEntries = allReports.reduce((acc, r) => {\n' +
'        return acc + Object.values(r.days).filter(d => d.content && d.content !== \'—\').length;\n' +
'      }, 0);\n' +
'      const maxPossible = totalWeeks * 5;\n' +
'      const completionRate = maxPossible > 0 ? Math.round((totalEntries / maxPossible) * 100) : 0;\n' +
'      const progress = totalWeeks > 0 ? Math.round((totalWeeks / 104) * 100) : 0;\n' +
'      \n' +
'      const container = document.createElement(\'div\');\n' +
'      container.className = \'stats-container\';\n' +
'      \n' +
'      const statsHTML = `\n' +
'        <div class="stats-grid">\n' +
'          <div class="stat-card">\n' +
'            <div class="stat-number">${totalWeeks}</div>\n' +
'            <div class="stat-label">${lang.totalWeeks}</div>\n' +
'            <div class="stat-progress"><div class="stat-progress-fill" style="width:${Math.min(100, (totalWeeks/104)*100)}%"></div></div>\n' +
'          </div>\n' +
'          <div class="stat-card">\n' +
'            <div class="stat-number">${totalEntries}</div>\n' +
'            <div class="stat-label">${lang.totalEntries}</div>\n' +
'            <div class="stat-progress"><div class="stat-progress-fill" style="width:${completionRate}%"></div></div>\n' +
'          </div>\n' +
'          <div class="stat-card">\n' +
'            <div class="stat-number">${completionRate}%</div>\n' +
'            <div class="stat-label">${lang.completionRate}</div>\n' +
'            <div class="stat-progress"><div class="stat-progress-fill" style="width:${completionRate}%"></div></div>\n' +
'          </div>\n' +
'          <div class="stat-card">\n' +
'            <div class="stat-number">${progress}%</div>\n' +
'            <div class="stat-label">${lang.progress}</div>\n' +
'            <div class="stat-progress"><div class="stat-progress-fill" style="width:${progress}%"></div></div>\n' +
'          </div>\n' +
'        </div>\n' +
'      `;\n' +
'      \n' +
'      container.innerHTML = statsHTML;\n' +
'      output.appendChild(container);\n' +
'    }\n' +
'\n' +
'    // ----- timeline view -----\n' +
'    function renderTimelineView() {\n' +
'      const lang = i18n[currentLang];\n' +
'      clearOutput();\n' +
'      \n' +
'      const allEntries = [];\n' +
'      allReports.forEach(r => {\n' +
'        if (!r.mondayDate) return;\n' +
'        Object.entries(r.days).forEach(([dayName, dayData], index) => {\n' +
'          if (dayData.content && dayData.content !== \'—\') {\n' +
'            const date = new Date(r.mondayDate);\n' +
'            date.setDate(date.getDate() + index);\n' +
'            allEntries.push({\n' +
'              date: date,\n' +
'              report: r,\n' +
'              day: dayName,\n' +
'              content: dayData.content,\n' +
'              isHO: dayData.isHO || false\n' +
'            });\n' +
'          }\n' +
'        });\n' +
'      });\n' +
'      \n' +
'      allEntries.sort((a, b) => b.date.getTime() - a.date.getTime());\n' +
'      \n' +
'      if (!allEntries.length) {\n' +
'        printHTML(\'<div class="empty-state">[!] NO ENTRIES FOUND</div>\');\n' +
'        return;\n' +
'      }\n' +
'      \n' +
'      const container = document.createElement(\'div\');\n' +
'      container.className = \'detailed-container\';\n' +
'      container.innerHTML = `<h2 style="font-size:16px;font-weight:bold;margin-bottom:12px;">> ${lang.timeline}</h2>`;\n' +
'      \n' +
'      let filteredEntries = allEntries;\n' +
'      let searchMatches = 0;\n' +
'      if (searchTerm && searchTerm.trim().length >= 2) {\n' +
'        const lowerTerm = searchTerm.toLowerCase().trim();\n' +
'        filteredEntries = allEntries.filter(entry => {\n' +
'          const match = entry.content.toLowerCase().includes(lowerTerm);\n' +
'          if (match) searchMatches++;\n' +
'          return match;\n' +
'        });\n' +
'        \n' +
'        printHTML(`<div class="search-info">> ${searchMatches} ${lang.searchResults} for "${searchTerm}"</div>`);\n' +
'        \n' +
'        if (!filteredEntries.length) {\n' +
'          printHTML(\'<div class="empty-state">[!] NO MATCHING ENTRIES</div>\');\n' +
'          return;\n' +
'        }\n' +
'      }\n' +
'      \n' +
'      const weekGroups = {};\n' +
'      filteredEntries.forEach(entry => {\n' +
'        const weekKey = entry.report.name;\n' +
'        if (!weekGroups[weekKey]) weekGroups[weekKey] = [];\n' +
'        weekGroups[weekKey].push(entry);\n' +
'      });\n' +
'      \n' +
'      const groupKeys = Object.keys(weekGroups);\n' +
'      \n' +
'      const lowerTerm = searchTerm ? searchTerm.toLowerCase().trim() : \'\';\n' +
'      \n' +
'      groupKeys.slice(0, 20).forEach(weekKey => {\n' +
'        const entries = weekGroups[weekKey];\n' +
'        const weekDiv = document.createElement(\'div\');\n' +
'        weekDiv.style.cssText = \'border:1px solid var(--border-solid);margin-bottom:12px;padding:12px;\';\n' +
'        \n' +
'        const header = document.createElement(\'div\');\n' +
'        header.style.cssText = \'font-weight:bold;font-size:14px;margin-bottom:8px;border-bottom:1px solid var(--border-solid);padding-bottom:4px;\';\n' +
'        header.textContent = `> ${weekKey}`;\n' +
'        weekDiv.appendChild(header);\n' +
'        \n' +
'        entries.forEach(entry => {\n' +
'          const dateStr = entry.date.toLocaleDateString(currentLang === \'en\' ? \'en-US\' : \'de-DE\', {\n' +
'            weekday: \'short\',\n' +
'            month: \'short\',\n' +
'            day: \'numeric\'\n' +
'          });\n' +
'          \n' +
'          let displayContent = entry.content;\n' +
'          let isMatch = false;\n' +
'          const hoIndicator = entry.isHO ? \' 🏠\' : \'\';\n' +
'          \n' +
'          if (lowerTerm && lowerTerm.length >= 2) {\n' +
'            isMatch = entry.content.toLowerCase().includes(lowerTerm);\n' +
'            if (isMatch) {\n' +
'              displayContent = highlightText(entry.content, searchTerm);\n' +
'            }\n' +
'          }\n' +
'          \n' +
'          const entryDiv = document.createElement(\'div\');\n' +
'          entryDiv.style.cssText = \'padding:4px 0;font-size:13px;color:var(--text-color);opacity:0.85;border-bottom:1px solid var(--border-solid);\' + (isMatch ? \'border-left:2px solid var(--text-color);padding-left:8px;\' : \'\');\n' +
'          entryDiv.innerHTML = `\n' +
'            <span style="color:var(--hint-color);font-size:11px;">[${dateStr}]${hoIndicator}</span>\n' +
'            <span>${displayContent.substring(0, 100)}${displayContent.length > 100 ? \'...\' : \'\'}</span>\n' +
'          `;\n' +
'          weekDiv.appendChild(entryDiv);\n' +
'        });\n' +
'        \n' +
'        container.appendChild(weekDiv);\n' +
'      });\n' +
'      \n' +
'      output.appendChild(container);\n' +
'    }\n' +
'\n' +
'    // ----- modal -----\n' +
'    document.getElementById(\'closeModalBtn\').addEventListener(\'click\', ()=>{\n' +
'      document.getElementById(\'calendarModal\').style.display = \'none\';\n' +
'    });\n' +
'    document.getElementById(\'calendarModal\').addEventListener(\'click\', (e)=>{\n' +
'      if (e.target === e.currentTarget) document.getElementById(\'calendarModal\').style.display = \'none\';\n' +
'    });\n' +
'    document.getElementById(\'copyModalBtn\').addEventListener(\'click\', ()=>{\n' +
'      const title = document.getElementById(\'modalTitle\').textContent;\n' +
'      const content = document.getElementById(\'modalContent\').textContent;\n' +
'      const txt = title + \'\\n\' + content;\n' +
'      navigator.clipboard?.writeText(txt).catch(()=>{});\n' +
'    });\n' +
'\n' +
'    // ----- fetch reports -----\n' +
'    async function fetchReportFiles() {\n' +
'      const resp = await fetch(\'https://api.github.com/repos/cmdrFRANKLY1/Viona/contents/Reports\');\n' +
'      if (!resp.ok) throw new Error(\'API error \'+resp.status);\n' +
'      const data = await resp.json();\n' +
'      const docFiles = data.filter(i => i.type === \'file\' && /\\.docx?$/i.test(i.name));\n' +
'      return docFiles.map(item => {\n' +
'        const rawUrl = \'https://raw.githubusercontent.com/cmdrFRANKLY1/Viona/main/Reports/\' + encodeURIComponent(item.name);\n' +
'        let mondayDate = null;\n' +
'        // Try to extract date from filename\n' +
'        const m = item.name.match(/(\\d{1,2})[\\.\\/](\\d{1,2})[\\.\\/](\\d{2,4})/);\n' +
'        if (m) {\n' +
'          let d=parseInt(m[1]), mo=parseInt(m[2])-1, y=parseInt(m[3]);\n' +
'          if (y<100) y+=2000;\n' +
'          const parsed = new Date(y, mo, d);\n' +
'          if (!isNaN(parsed.getTime())) {\n' +
'            const day = parsed.getDay();\n' +
'            const diff = parsed.getDate() - day + (day===0 ? -6 : 1);\n' +
'            mondayDate = new Date(parsed.setDate(diff));\n' +
'          }\n' +
'        }\n' +
'        return { \n' +
'          name: item.name, \n' +
'          url: rawUrl, \n' +
'          mondayDate, \n' +
'          isFisi: /fisi/i.test(item.name), \n' +
'          days: {} \n' +
'        };\n' +
'      }).sort((a,b) => (a.mondayDate?.getTime()||0) - (b.mondayDate?.getTime()||0));\n' +
'    }\n' +
'\n' +
'    // ----- load data -----\n' +
'    async function loadData() {\n' +
'      try {\n' +
'        clearOutput();\n' +
'        printHTML(\'<div style="color:var(--text-color);">> _ Loading remote repository data...</div>\');\n' +
'        const reports = await fetchReportFiles();\n' +
'        if (!reports.length) throw new Error(\'NO FILES FOUND IN PATH\');\n' +
'        allReports = reports;\n' +
'        for (let i=0; i<allReports.length; i++) {\n' +
'          await fetchAndParseDocx(allReports[i]);\n' +
'        }\n' +
'        switchView(\'list\');\n' +
'      } catch(err) {\n' +
'        clearOutput();\n' +
'        printHTML(\'<div style="color:#ff5555;">> ERR: \'+err.message+\'</div>\');\n' +
'      }\n' +
'    }\n' +
'\n' +
'    // ----- init -----\n' +
'    updateStaticUIText();\n' +
'    loadData();\n' +
'  })();\n' +
'</script>\n' +
'</body>\n' +
'</html>';
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            generateVionaReportsHTML,
            package: {
                name: 'vionareports',
                version: '2.2.0',
                description: 'CFCC Berichtsheft advanced terminal report viewer'
            }
        };
    }
})();