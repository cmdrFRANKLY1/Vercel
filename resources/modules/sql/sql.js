/**
 * resources/modules/sql/sql.js
 * 
 * Interactive SQL "TryIt" module, full-canvas view.
 * Dynamically loads AlaSQL and features random data generation.
 * Features a dual-column layout, dynamic relational diagram, and deep color-coding.
 */

window.App = window.App || {};

App.sql = (function() {
    let engineLoaded = false;
    let isInitializing = false;
    let currentDbData = {};
    
    // Global tracker for active tokens for dynamic highlighting
    let activeTokens = { tables: new Set(), columns: new Set(), values: new Set() };

    // Colors mapping for distinct UI highlighting
    const COLORS = {
        customers: '#ec4899', // Pink
        products: '#10b981',  // Green
        orders: '#3b82f6',    // Blue
        cmd: '#569cd6',       // VS Code Blue
        str: '#ce9178',       // String orange
        num: '#b5cea8',       // Number green
        logic: '#c586c0'      // Logic purple
    };

    // ------------------------------------------------------------------
    // JOIN visualiser state
    // ------------------------------------------------------------------
    let currentJoinState = {
        kind: 'none',
        leftLabel: 'A',
        rightLabel: 'B',
        raw: ''
    };

    function loadEngine() {
        return new Promise((resolve, reject) => {
            if (window.alasql) {
                engineLoaded = true;
                return resolve();
            }
            if (isInitializing) return;
            
            isInitializing = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/alasql@4.2.2/dist/alasql.min.js';
            script.onload = () => {
                engineLoaded = true;
                isInitializing = false;
                
                alasql('CREATE DATABASE IF NOT EXISTS TryItDB');
                alasql('USE TryItDB');
                
                generateAndLoadRandomDB();
                resolve();
            };
            script.onerror = () => {
                isInitializing = false;
                reject(new Error('Failed to load SQL engine'));
            };
            document.head.appendChild(script);
        });
    }

    function generateAndLoadRandomDB() {
        const fnames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
        const lnames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
        const cities = ['Berlin', 'London', 'Paris', 'New York', 'Tokyo', 'Sydney', 'Rome', 'Madrid', 'Vienna', 'Oslo'];
        const pnames = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Desk', 'Chair', 'Headset', 'Webcam', 'Tablet', 'Stylus'];

        const customers = [];
        for (let i = 1; i <= 10; i++) {
            customers.push({
                CustomerID: i,
                CustomerName: fnames[Math.floor(Math.random() * fnames.length)] + ' ' + lnames[Math.floor(Math.random() * lnames.length)],
                City: cities[Math.floor(Math.random() * cities.length)],
                Score: Math.floor(Math.random() * 100)
            });
        }

        const products = [];
        for (let i = 1; i <= 10; i++) {
            products.push({
                ProductID: i,
                ProductName: pnames[Math.floor(Math.random() * pnames.length)] + ' (Gen ' + (Math.floor(Math.random() * 5) + 1) + ')',
                Price: parseFloat((Math.random() * 800 + 10).toFixed(2))
            });
        }

        const orders = [];
        for (let i = 1; i <= 10; i++) {
            orders.push({
                OrderID: 1000 + i,
                CustomerID: customers[Math.floor(Math.random() * customers.length)].CustomerID,
                ProductID: products[Math.floor(Math.random() * products.length)].ProductID,
                Quantity: Math.floor(Math.random() * 5) + 1,
                OrderDate: `2026-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
        }

        currentDbData = { Customers: customers, Products: products, Orders: orders };
        initDatabase(currentDbData);
        renderSchemaList();
        
        const queryInput = document.getElementById('sqlQueryInput');
        if (queryInput) {
            queryInput.value = 'SELECT * FROM Customers;';
            handleInput(queryInput);
            runQuery();
        }
    }

    function initDatabase(dbObject) {
        if (!window.alasql) return;
        try {
            alasql('USE TryItDB');
            for (const [tableName, data] of Object.entries(dbObject)) {
                alasql(`DROP TABLE IF EXISTS ${tableName}`);
                alasql(`CREATE TABLE ${tableName}`);
                alasql(`SELECT * INTO ${tableName} FROM ?`, [data]);
            }
        } catch (e) {
            console.error("Error init database: ", e);
        }
    }

    function handleInput(el) {
        const query = (el && typeof el === 'object') ? (el.value || '') : (el || '');
        
        const tables = Object.keys(currentDbData);
        const columns = new Set();
        tables.forEach(t => {
            if (currentDbData[t] && currentDbData[t].length > 0) {
                Object.keys(currentDbData[t][0]).forEach(c => columns.add(c));
            }
        });
        
        activeTokens = { tables: new Set(), columns: new Set(), values: new Set() };
        
        // Match string/number values
        const stringMatches = query.match(/'([^']+)'/g) || query.match(/"([^"]+)"/g) || [];
        stringMatches.forEach(m => activeTokens.values.add(m.replace(/['"]/g, '').toLowerCase()));
        
        const numberMatches = query.match(/\b(\d+(?:\.\d+)?)\b/g) || [];
        numberMatches.forEach(m => activeTokens.values.add(m));

        // Detect active tables & columns
        tables.forEach(t => {
            if (new RegExp(`\\b${t}\\b`, 'i').test(query)) activeTokens.tables.add(t.toLowerCase());
        });
        columns.forEach(c => {
            if (new RegExp(`\\b${c}\\b`, 'i').test(query)) activeTokens.columns.add(c.toLowerCase());
        });
        
        // Parse JOIN info for the Venn diagram
        currentJoinState = detectJoin(query, tables);

        updateSyntaxHighlighter(query, tables, Array.from(columns));
        updateExplainer(query, Array.from(columns));
        updateJoinDiagram();
        renderSchemaList();
    }

    // ------------------------------------------------------------------
    // JOIN DETECTION
    // ------------------------------------------------------------------
    function detectJoin(query, tables) {
        const q = query.replace(/\s+/g, ' ').trim();
        if (!q) return { kind: 'none', leftLabel: 'A', rightLabel: 'B', raw: '' };

        const joinRe = /\b(INNER|LEFT(?:\s+OUTER)?|RIGHT(?:\s+OUTER)?|FULL(?:\s+OUTER)?|CROSS)?\s*JOIN\s+([A-Za-z_][A-Za-z0-9_]*)/i;
        const m = q.match(joinRe);

        let leftTable = null;
        const fromMatch = q.match(/\bFROM\s+([A-Za-z_][A-Za-z0-9_]*)/i);
        if (fromMatch) leftTable = fromMatch[1];

        if (!m) {
            const mentioned = tables.filter(t => new RegExp(`\\b${t}\\b`, 'i').test(q));
            const leftLabel = leftTable || mentioned[0] || 'A';
            const rightLabel = mentioned.find(t => t.toLowerCase() !== (leftLabel || '').toLowerCase()) || 'B';
            return { kind: 'none', leftLabel, rightLabel, raw: '' };
        }

        const typeRaw = (m[1] || 'INNER').toUpperCase().replace(/\s+/g, ' ');
        const rightTable = m[2];

        let kind = 'inner';
        if (/^LEFT/.test(typeRaw))  kind = 'left';
        else if (/^RIGHT/.test(typeRaw)) kind = 'right';
        else if (/^FULL/.test(typeRaw))  kind = 'full';
        else if (/^CROSS/.test(typeRaw)) kind = 'cross';
        else kind = 'inner';

        const leftLabel = leftTable || 'A';
        const rightLabel = rightTable || 'B';

        return { kind, leftLabel, rightLabel, raw: typeRaw + ' JOIN' };
    }

    // ------------------------------------------------------------------
    // SYNTAX HIGHLIGHTING
    // ------------------------------------------------------------------
    function updateSyntaxHighlighter(query, tables, columnsArray) {
        const highlighter = document.getElementById('sqlHighlighter');
        if (!highlighter) return;
        
        let html = query.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        html = html.replace(/('[^']*')/g, `<span style="color: ${COLORS.str};">$1</span>`);
        html = html.replace(/("[^"]*")/g, `<span style="color: ${COLORS.str};">$1</span>`);
        html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color: ${COLORS.num};">$1</span>`);
        
        const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'ON', 'AS', 'GROUP BY', 'ORDER BY', 'LIMIT', 'COUNT', 'MAX', 'MIN', 'AVG', 'SUM'];
        keywords.sort((a,b) => b.length - a.length).forEach(kw => {
            const regex = new RegExp(`\\b(${kw.replace(/ /g, '\\s+')})\\b`, 'gi');
            html = html.replace(regex, `<strong style="color: ${COLORS.cmd};">$1</strong>`);
        });

        const logicKws = ['AND', 'OR', 'NOT', 'IS NULL', 'IS NOT NULL'];
        logicKws.sort((a,b) => b.length - a.length).forEach(kw => {
            const regex = new RegExp(`\\b(${kw.replace(/ /g, '\\s+')})\\b`, 'gi');
            html = html.replace(regex, `<strong style="color: ${COLORS.logic};">$1</strong>`);
        });

        tables.forEach(tbl => {
            const tblRegex = new RegExp(`\\b(${tbl})\\b`, 'gi');
            const color = COLORS[tbl.toLowerCase()] || '#ffffff';
            html = html.replace(tblRegex, `<span style="color: ${color}; font-weight: bold;">$1</span>`);
        });

        columnsArray.forEach(col => {
            const colRegex = new RegExp(`\\b(${col})\\b`, 'gi');
            let hash = 0;
            for (let i = 0; i < col.length; i++) { hash = col.charCodeAt(i) + ((hash << 5) - hash); }
            const hue = Math.abs(hash) % 360;
            const colColor = `hsl(${hue}, 70%, 70%)`;
            html = html.replace(colRegex, `<span style="color: ${colColor};">$1</span>`);
        });

        if (query.endsWith('\n')) html += ' ';
        highlighter.innerHTML = html;
    }

    // ------------------------------------------------------------------
    // EXPLAINER
    // ------------------------------------------------------------------
    function updateExplainer(query, columnsArray) {
        const explainPanel = document.getElementById('sqlExplainPanel');
        if (!explainPanel) return;

        if (!query.trim()) {
            explainPanel.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Warte auf Eingabe...</span>`;
            return;
        }

        // Strip quotes and trailing semicolons for the explanation
        const cleanQuery = query.replace(/['"]/g, '').replace(/;/g, '');

        // Safe humanizer that skips HTML tags
        const humanizeOperators = (str) => {
            const tags = [];
            let safeStr = str.replace(/<[^>]+>/g, (match) => {
                tags.push(match);
                return `___TAG_${tags.length - 1}___`;
            });

            safeStr = safeStr.replace(/(\s*)(>=|<=|!=|<>|>|<|=|LIKE|IN|BETWEEN|AND|OR)(\s*)/gi, (match, p1, op, p2) => {
                const upperOp = op.toUpperCase();
                const spacing = (p1 || ' ') + ' ';
                switch (upperOp) {
                    case '>=': return spacing + '<em>größer oder gleich</em> ';
                    case '<=': return spacing + '<em>kleiner oder gleich</em> ';
                    case '!=':
                    case '<>': return spacing + '<em>ungleich</em> ';
                    case '>':  return spacing + '<em>größer als</em> ';
                    case '<':  return spacing + '<em>kleiner als</em> ';
                    case '=':  return spacing + '<em>gleich</em> ';
                    case 'LIKE': return spacing + '<em>enthält das Muster</em> ';
                    case 'IN': return spacing + '<em>ist enthalten in</em> ';
                    case 'BETWEEN': return spacing + '<em>liegt zwischen</em> ';
                    case 'AND': return spacing + '<em>und</em> ';
                    case 'OR': return spacing + '<em>oder</em> ';
                    default: return match;
                }
            });

            return safeStr.replace(/___TAG_(\d+)___/g, (match, index) => tags[parseInt(index)]);
        };

        const colorizeTokens = (text) => {
            if (text === '*') return '<em>alle Spalten</em>';
            
            const dict = {};
            Object.keys(currentDbData).forEach(tbl => {
                const color = COLORS[tbl.toLowerCase()] || '#ffffff';
                dict[tbl] = `<strong style="color: ${color};">${tbl}</strong>`;
            });
            columnsArray.forEach(c => {
                let hash = 0;
                for (let i = 0; i < c.length; i++) { hash = c.charCodeAt(i) + ((hash << 5) - hash); }
                const hue = Math.abs(hash) % 360;
                dict[c] = `<span style="color: hsl(${hue}, 70%, 70%); font-weight: bold;">${c}</span>`;
            });

            const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
            if (keys.length === 0) return text;

            const regex = new RegExp(`\\b(?:${keys.join('|')})\\b`, 'gi');
            
            return text.replace(regex, (match) => {
                const key = keys.find(k => k.toLowerCase() === match.toLowerCase());
                return key ? dict[key] : match;
            });
        };

        // Helper to make columns sound natural
        const describeColumns = (colsStr) => {
            if (colsStr === '*') return 'alle Spalten';
            const parts = colsStr.split(',').map(s => s.trim());
            return parts.map(p => {
                if (p.includes('.')) {
                    const [tbl, col] = p.split('.');
                    return `${colorizeTokens(col)} von ${colorizeTokens(tbl)}`;
                }
                return colorizeTokens(p);
            }).join(', ');
        };

        const lines = cleanQuery.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let htmlParts = [];

        lines.forEach((line) => {
            let explanation = '';

            if (/^CREATE\s+(TABLE|DATABASE)\s+([a-zA-Z0-9_]+)/i.test(line)) {
                const m = line.match(/^CREATE\s+(TABLE|DATABASE)\s+([a-zA-Z0-9_]+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Erstellt</strong> ${m[1].toLowerCase()} ${colorizeTokens(m[2])}`;
            }
            else if (/^DROP\s+(TABLE|DATABASE)\s+([a-zA-Z0-9_]+)/i.test(line)) {
                const m = line.match(/^DROP\s+(TABLE|DATABASE)\s+([a-zA-Z0-9_]+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Löscht</strong> ${m[1].toLowerCase()} ${colorizeTokens(m[2])}`;
            }
            else if (/^ALTER\s+TABLE\s+([a-zA-Z0-9_]+)\s+(ADD|DROP|RENAME)/i.test(line)) {
                const m = line.match(/^ALTER\s+TABLE\s+([a-zA-Z0-9_]+)\s+(.+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Ändert</strong> Tabelle ${colorizeTokens(m[1])}: ${m[2]}`;
            }
            else if (/^INSERT\s+INTO\s+([a-zA-Z0-9_]+)/i.test(line)) {
                const m = line.match(/^INSERT\s+INTO\s+([a-zA-Z0-9_]+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Fügt Daten ein</strong> in Tabelle ${colorizeTokens(m[1])}`;
                if (/VALUES/i.test(line)) {
                    const vals = line.split(/VALUES/i)[1];
                    explanation += ` mit den Werten ${colorizeTokens(vals)}`;
                }
            }
            else if (/^UPDATE\s+([a-zA-Z0-9_]+)/i.test(line)) {
                const m = line.match(/^UPDATE\s+([a-zA-Z0-9_]+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Aktualisiert</strong> Tabelle ${colorizeTokens(m[1])}`;
                if (/SET\s+(.+?)(?:\s+WHERE|$)/i.test(line)) {
                    const s = line.match(/SET\s+(.+?)(?:\s+WHERE|$)/i)[1];
                    explanation += ` und setzt ${describeColumns(s)}`;
                }
            }
            else if (/^DELETE\s+FROM\s+([a-zA-Z0-9_]+)/i.test(line)) {
                const m = line.match(/^DELETE\s+FROM\s+([a-zA-Z0-9_]+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Löscht Zeilen</strong> aus Tabelle ${colorizeTokens(m[1])}`;
            }
            else if (/^SELECT\s+(.+)/i.test(line)) {
                const m = line.match(/^SELECT\s+(.+)/i);
                let cols = m[1].trim();
                let distinct = false;
                if (/^DISTINCT\s+/i.test(cols)) {
                    distinct = true;
                    cols = cols.replace(/^DISTINCT\s+/i, '');
                }

                let fromTable = null;
                const fromMatch = cols.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
                if (fromMatch) {
                    fromTable = fromMatch[1];
                    cols = cols.split(/\bFROM\b/i)[0].trim();
                }

                let aggText = '';
                const aggMatch = cols.match(/\b(COUNT|SUM|AVG|MIN|MAX)\s*\((.+?)\)/gi);
                if (aggMatch) {
                    aggText = ` und aggregiert mit ${aggMatch.map(a => colorizeTokens(a)).join(', ')}`;
                }

                const colText = describeColumns(cols);
                if (cols === '*') {
                    explanation = `<strong style="color: ${COLORS.cmd};">Holt</strong> alle Spalten`;
                } else {
                    explanation = `<strong style="color: ${COLORS.cmd};">Holt</strong> ${distinct ? '<em>einzigartige</em> ' : ''}${colText}${aggText}`;
                }

                if (fromTable) {
                    explanation += ` aus Tabelle ${colorizeTokens(fromTable)}`;
                }
            }
            else if (/^FROM\s+([a-zA-Z0-9_]+)/i.test(line)) {
                const m = line.match(/^FROM\s+([a-zA-Z0-9_]+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">aus</strong> Tabelle ${colorizeTokens(m[1])}`;
            }
            else if (/(INNER|LEFT|RIGHT|FULL|CROSS)?\s*JOIN\s+([a-zA-Z0-9_]+)/i.test(line)) {
                const m = line.match(/\b(INNER|LEFT(?:\s+OUTER)?|RIGHT(?:\s+OUTER)?|FULL(?:\s+OUTER)?|CROSS)?\s*JOIN\s+([a-zA-Z0-9_]+)/i);
                const type = (m[1] || 'INNER').toUpperCase();
                explanation = `<strong style="color: ${COLORS.cmd};">Verknüpft (${type} JOIN)</strong> mit Tabelle ${colorizeTokens(m[2])}`;
            }
            else if (/^ON\s+(.+)/i.test(line)) {
                const m = line.match(/^ON\s+(.+)/i);
                const cond = m[1].trim();
                const eqMatch = cond.match(/([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)/);
                if (eqMatch) {
                    explanation = `wobei ${colorizeTokens(eqMatch[2])} von ${colorizeTokens(eqMatch[1])} mit ${colorizeTokens(eqMatch[4])} von ${colorizeTokens(eqMatch[3])} übereinstimmen muss`;
                } else {
                    explanation = `unter der Bedingung: ${colorizeTokens(cond)}`;
                }
            }
            else if (/^WHERE\s+(.+)/i.test(line)) {
                const m = line.match(/^WHERE\s+(.+)/i);
                const colored = colorizeTokens(m[1]);
                explanation = `<strong style="color: ${COLORS.logic};">Filtert</strong> nach: ${humanizeOperators(colored)}`;
            }
            else if (/^GROUP\s+BY\s+(.+)/i.test(line)) {
                const m = line.match(/^GROUP\s+BY\s+(.+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Gruppiert</strong> nach ${describeColumns(m[1])}`;
            }
            else if (/^HAVING\s+(.+)/i.test(line)) {
                const m = line.match(/^HAVING\s+(.+)/i);
                const colored = colorizeTokens(m[1]);
                explanation = `<strong style="color: ${COLORS.logic};">Filtert</strong> (nach Gruppierung): ${humanizeOperators(colored)}`;
            }
            else if (/^ORDER\s+BY\s+(.+)/i.test(line)) {
                const m = line.match(/^ORDER\s+BY\s+(.+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Sortiert</strong> nach ${describeColumns(m[1])}`;
            }
            else if (/^LIMIT\s+(\d+)/i.test(line)) {
                const m = line.match(/^LIMIT\s+(\d+)/i);
                explanation = `<strong style="color: ${COLORS.cmd};">Limitiert</strong> auf die ersten ${colorizeTokens(m[1])} Zeilen`;
            }
            else if (/^UNION(\s+ALL)?/i.test(line)) {
                const isAll = /ALL/i.test(line);
                explanation = `<strong style="color: ${COLORS.cmd};">Vereinigt</strong> die Ergebnisse (${isAll ? 'mit' : 'ohne'} Duplikate)`;
            }

            if (!explanation) {
                explanation = `<span style="color: var(--text-muted); opacity: 0.7;">${colorizeTokens(line)}</span>`;
            }

            htmlParts.push(`<div style="margin-bottom: 0.25rem; line-height: 1.5;">${explanation}</div>`);
        });

        explainPanel.innerHTML = htmlParts.join('');
    }

    // ------------------------------------------------------------------
    // TWO-CIRCLE VENN JOIN VISUALISER
    // ------------------------------------------------------------------
    function updateJoinDiagram() {
        const leftCircle  = document.getElementById('join-circle-left');
        const rightCircle = document.getElementById('join-circle-right');
        const interPath   = document.getElementById('join-intersection');
        const leftStroke  = document.getElementById('join-circle-left-stroke');
        const rightStroke = document.getElementById('join-circle-right-stroke');
        const labelLeft   = document.getElementById('join-label-left');
        const labelRight  = document.getElementById('join-label-right');
        const badge       = document.getElementById('join-type-badge');

        if (!leftCircle || !rightCircle || !interPath) return;

        const dim = 0.06;
        const lit = 0.55;

        const LEFT_COLOR  = '#3b82f6';
        const RIGHT_COLOR = '#ec4899';
        const INTER_COLOR = '#a855f7';

        leftCircle.setAttribute('fill', LEFT_COLOR);
        rightCircle.setAttribute('fill', RIGHT_COLOR);
        leftCircle.setAttribute('fill-opacity', dim);
        rightCircle.setAttribute('fill-opacity', dim);
        interPath.setAttribute('fill', INTER_COLOR);
        interPath.setAttribute('fill-opacity', 0);

        if (leftStroke)  leftStroke.setAttribute('stroke', 'var(--panel-border)');
        if (rightStroke) rightStroke.setAttribute('stroke', 'var(--panel-border)');

        const kind = currentJoinState.kind;

        switch (kind) {
            case 'inner':
                interPath.setAttribute('fill-opacity', lit);
                if (leftStroke)  leftStroke.setAttribute('stroke', LEFT_COLOR);
                if (rightStroke) rightStroke.setAttribute('stroke', RIGHT_COLOR);
                break;
            case 'left':
                leftCircle.setAttribute('fill-opacity', lit);
                interPath.setAttribute('fill-opacity', lit);
                if (leftStroke)  leftStroke.setAttribute('stroke', LEFT_COLOR);
                break;
            case 'right':
                rightCircle.setAttribute('fill-opacity', lit);
                interPath.setAttribute('fill-opacity', lit);
                if (rightStroke) rightStroke.setAttribute('stroke', RIGHT_COLOR);
                break;
            case 'full':
                leftCircle.setAttribute('fill-opacity', lit);
                rightCircle.setAttribute('fill-opacity', lit);
                interPath.setAttribute('fill-opacity', lit);
                if (leftStroke)  leftStroke.setAttribute('stroke', LEFT_COLOR);
                if (rightStroke) rightStroke.setAttribute('stroke', RIGHT_COLOR);
                break;
            case 'cross':
                leftCircle.setAttribute('fill-opacity', lit);
                rightCircle.setAttribute('fill-opacity', lit);
                interPath.setAttribute('fill-opacity', lit);
                if (leftStroke)  leftStroke.setAttribute('stroke', LEFT_COLOR);
                if (rightStroke) rightStroke.setAttribute('stroke', RIGHT_COLOR);
                break;
            case 'none':
            default:
                break;
        }

        if (labelLeft)  labelLeft.textContent  = currentJoinState.leftLabel  || 'A';
        if (labelRight) labelRight.textContent = currentJoinState.rightLabel || 'B';

        if (badge) {
            const map = {
                inner: 'INNER JOIN',
                left:  'LEFT JOIN',
                right: 'RIGHT JOIN',
                full:  'FULL OUTER JOIN',
                cross: 'CROSS JOIN',
                none:  '— kein JOIN —'
            };
            badge.textContent = map[kind] || '—';
            const badgeColor = kind === 'none' ? 'var(--text-muted)'
                : kind === 'inner' ? '#a855f7'
                : kind === 'left'  ? LEFT_COLOR
                : kind === 'right' ? RIGHT_COLOR
                : kind === 'full'  ? '#f59e0b'
                : '#06b6d4';
            badge.style.color = badgeColor;
            badge.style.borderColor = badgeColor + '60';
            badge.style.background = badgeColor + '15';
        }
    }

    // ------------------------------------------------------------------
    // QUERY RUNNER
    // ------------------------------------------------------------------
    function runQuery() {
        const queryInput = document.getElementById('sqlQueryInput');
        const resultsContainer = document.getElementById('sqlResultsArea');
        
        if (!queryInput || !resultsContainer) return;
        if (!engineLoaded || !window.alasql) {
            resultsContainer.innerHTML = '<div style="padding:1rem; text-align:center; color:#ef4444;">Engine loading...</div>';
            return;
        }

        const query = queryInput.value.trim();
        if (!query) {
            resultsContainer.innerHTML = '<div style="padding:1rem; text-align:center; color:var(--text-muted); font-style:italic;">Bitte Befehl eingeben.</div>';
            return;
        }

        try {
            alasql('USE TryItDB');
            const res = alasql(query);
            
            if (Array.isArray(res) && res.length > 0) {
                renderResultTable(res, resultsContainer);
            } else if (Array.isArray(res) && res.length === 0) {
                resultsContainer.innerHTML = `
                    <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-style: italic;">
                        Keine Ergebnisse gefunden. (0 Zeilen)
                    </div>
                `;
            } else {
                resultsContainer.innerHTML = `
                    <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
                        <i class="fa-solid fa-check" style="color: #10b981; margin-right: 0.5rem;"></i> Datenbank aktualisiert.
                    </div>
                `;
                updateSchemaFromEngine();
            }
        } catch (error) {
            resultsContainer.innerHTML = `
                <div style="padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-family: monospace; font-size: 0.8rem; border-radius: 0.25rem;">
                    Error: ${error.message}
                </div>
            `;
        }
    }

    function updateSchemaFromEngine() {
        try {
            const tables = alasql('SHOW TABLES');
            const newDbData = {};
            tables.forEach(t => {
                const tableName = t.tableid;
                const rows = alasql(`SELECT * FROM ${tableName}`);
                newDbData[tableName] = rows;
            });
            currentDbData = newDbData;
            renderSchemaList();
        } catch(e) {}
    }

    function renderResultTable(data, container) {
        if (!data || data.length === 0) return;
        const columns = Object.keys(data[0]);
        
        let html = `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.75rem;">
                <thead style="position: sticky; top: 0; background: var(--panel-color); z-index: 10; box-shadow: 0 1px 0 var(--border-color);">
                    <tr>
                        ${columns.map(col => `<th style="padding: 0.5rem 1rem; font-weight: 600; color: var(--heading-color);">${col}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(row => {
            html += `<tr style="border-bottom: 1px solid var(--panel-border); background: var(--bg-color);">`;
            columns.forEach(col => {
                html += `<td style="padding: 0.4rem 1rem; color: var(--text-color);">${row[col] !== null ? row[col] : '<em>null</em>'}</td>`;
            });
            html += `</tr>`;
        });

        html += `</tbody></table>`;
        container.innerHTML = html;
    }

    function renderSchemaList() {
        ['Customers', 'Products', 'Orders'].forEach(tableName => {
            const container = document.getElementById(`schema-table-${tableName.toLowerCase()}`);
            if (container && currentDbData[tableName]) {
                const data = currentDbData[tableName];
                const columns = data.length > 0 ? Object.keys(data[0]) : [];
                
                let html = `
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.7rem;">
                        <thead style="position: sticky; top: 0; background: var(--panel-color); z-index: 5; box-shadow: 0 1px 0 var(--border-color);">
                            <tr>
                                ${columns.map(col => {
                                    const isColActive = activeTokens.columns.has(col.toLowerCase());
                                    const activeStyle = isColActive ? `background: var(--code-bg); color: ${COLORS[tableName.toLowerCase()]};` : `color: var(--heading-color);`;
                                    return `<th style="padding: 0.4rem 0.5rem; font-weight: 600; transition: all 0.2s; ${activeStyle}">${col}</th>`;
                                }).join('')}
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.forEach(row => {
                    html += `<tr style="border-bottom: 1px solid var(--panel-border); background: var(--bg-color); transition: background 0.2s;" onmouseover="this.style.background='var(--code-bg)'" onmouseout="this.style.background='var(--bg-color)'">`;
                    columns.forEach(col => {
                        const cellValue = row[col];
                        const valStr = cellValue !== null && cellValue !== undefined ? cellValue.toString().toLowerCase() : '';
                        const isValActive = valStr && activeTokens.values.has(valStr);
                        const cellStyle = isValActive ? `font-weight: bold; color: ${COLORS[tableName.toLowerCase()]}; background: rgba(255,255,255,0.05);` : `color: var(--text-color);`;
                        html += `<td style="padding: 0.35rem 0.5rem; white-space: nowrap; ${cellStyle}">${cellValue !== null ? cellValue : 'NULL'}</td>`;
                    });
                    html += `</tr>`;
                });

                html += `</tbody></table>`;
                container.innerHTML = html;
            }
        });
    }

    function insertSnippet(textToInsert) {
        const input = document.getElementById('sqlQueryInput');
        if (input) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = input.value;
            input.value = text.substring(0, start) + textToInsert + text.substring(end);
            input.selectionStart = input.selectionEnd = start + textToInsert.length;
            input.focus();
            handleInput(input);
        }
    }

    // ------------------------------------------------------------------
    // DOM CREATION
    // ------------------------------------------------------------------
    function createViewDOM() {
        if (document.getElementById('sql-view')) return;

        const sqlCommands = window.App?.sql_cmd || [
            'SELECT', 'FROM', 'WHERE', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 
            'CREATE TABLE', 'DROP TABLE', 'ALTER TABLE', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
            'FULL OUTER JOIN', 'ON', 'AS', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'IN', 
            'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'AND', 'OR', 'NOT', 'UNION', 'UNION ALL', 
            'COUNT()', 'MAX()', 'MIN()', 'AVG()', 'SUM()'
        ];
        
        const commandChipsHtml = sqlCommands.map(cmd => 
            `<button type="button" onclick="App.sql.insertSnippet('${cmd.replace('()', '()')} ')" style="padding: 0.35rem 0.5rem; text-align: left; background: var(--bg-color); border: 1px solid var(--panel-border); border-radius: 0.25rem; font-family: 'Fira Code', monospace; font-size: 0.65rem; color: var(--text-color); cursor: pointer; transition: all 0.2s; flex-shrink: 0;" onmouseover="this.style.borderColor='${COLORS.cmd}'; this.style.color='${COLORS.cmd}'" onmouseout="this.style.borderColor='var(--panel-border)'; this.style.color='var(--text-color)'">${cmd}</button>`
        ).join('');

        const editorStyles = "position: absolute; inset: 0; margin: 0; padding: 1rem; font-family: 'Fira Code', monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; box-sizing: border-box; border: none;";

        const viewHtml = `
            <div id="sql-view" style="display: none; flex-direction: column; width: 100%; height: 100%; padding: 1rem; gap: 1rem; box-sizing: border-box; background: var(--bg-color); overflow: hidden;">
                
                <!-- TOP ROW: Editor & Explainer -->
                <div style="display: flex; gap: 1rem; min-height: 14rem; flex-shrink: 0;">
                    
                    <!-- Editor Panel -->
                    <div style="flex: 1; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow);">
                        <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--heading-color); letter-spacing: 0.05em;"><i class="fa-solid fa-code" style="margin-right: 0.4rem; opacity: 0.7;"></i> SQL ANWEISUNG</div>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <span style="font-family: 'Fira Code', monospace; font-size: 0.65rem; color: var(--text-muted); background: var(--bg-color); padding: 0.15rem 0.4rem; border-radius: 0.25rem; border: 1px solid var(--border-color);">Ctrl + Enter</span>
                                <button onclick="App.sql.run()" style="background: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color); font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 0.35rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;"><i class="fa-solid fa-play" style="color: ${COLORS.cmd};"></i> Run SQL</button>
                            </div>
                        </div>
                        <div style="position: relative; flex: 1; background: var(--bg-color); min-height: 0;">
                            <pre id="sqlHighlighter" aria-hidden="true" style="${editorStyles} color: var(--text-color); background: transparent; overflow-y: auto; overflow-x: hidden; z-index: 1; pointer-events: none;"></pre>
                            <textarea id="sqlQueryInput" spellcheck="false" style="${editorStyles} color: transparent !important; caret-color: var(--heading-color); background: transparent; outline: none !important; resize: none; overflow-y: auto; overflow-x: hidden; z-index: 2;" oninput="App.sql.onInput(this)" onscroll="document.getElementById('sqlHighlighter').scrollTop = this.scrollTop; document.getElementById('sqlHighlighter').scrollLeft = this.scrollLeft;" onkeydown="if(event.ctrlKey && event.key === 'Enter') { App.sql.run(); }">SELECT * FROM Customers;</textarea>
                        </div>
                    </div>

                    <!-- Explainer Panel -->
                    <div style="flex: 1; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow);">
                        <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); flex-shrink: 0;">
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--heading-color); letter-spacing: 0.05em;"><i class="fa-solid fa-wand-magic-sparkles" style="margin-right: 0.4rem; opacity: 0.7;"></i> ERKLÄRUNG</div>
                        </div>
                        <div id="sqlExplainPanel" style="padding: 1rem; font-size: 0.85rem; font-family: 'Fira Code', monospace; line-height: 1.6; color: var(--text-color); overflow-y: auto; background: var(--bg-color); flex: 1; min-height: 0;">
                            Befehl wird analysiert...
                        </div>
                    </div>
                </div>

                <!-- MIDDLE ROW: Results & JOIN VENN (Strictly 14rem height) -->
                <div style="display: flex; gap: 1rem; height: 14rem; flex-shrink: 0; overflow: hidden;">
                    
                    <!-- Results Panel -->
                    <div style="flex: 1; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow);">
                        <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); flex-shrink: 0;">
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--heading-color); letter-spacing: 0.05em;"><i class="fa-solid fa-table" style="margin-right: 0.4rem; opacity: 0.7;"></i> ERGEBNIS</div>
                        </div>
                        <div id="sqlResultsArea" style="flex: 1; min-height: 0; overflow-y: auto; background: var(--bg-color);">
                            <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-style: italic;">Run SQL um Ergebnisse anzuzeigen.</div>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: JOIN VENN ONLY -->
                    <div style="width: 320px; flex-shrink: 0; display: flex; flex-direction: column;">
                        <div style="flex: 1; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow);">
                            <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                                <div style="font-size: 0.75rem; font-weight: 700; color: var(--heading-color); letter-spacing: 0.05em;"><i class="fa-solid fa-circle-nodes" style="margin-right: 0.4rem; opacity: 0.7;"></i> JOIN TYP</div>
                                <span id="join-type-badge" style="font-family: 'Fira Code', monospace; font-size: 0.6rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 0.25rem; border: 1px solid var(--border-color); color: var(--text-muted); background: transparent;">— kein JOIN —</span>
                            </div>
                            <div style="position: relative; flex: 1; background: var(--bg-color); display: flex; align-items: center; justify-content: center; padding: 1rem; min-height: 0;">
                                <svg id="join-venn" viewBox="0 0 200 120" style="width: 100%; height: 100%; max-height: 200px;">
                                    <defs>
                                        <clipPath id="clip-left">
                                            <circle cx="72" cy="60" r="40"/>
                                        </clipPath>
                                    </defs>
                                    <!-- Base circles (dim) -->
                                    <circle id="join-circle-left"  cx="72"  cy="60" r="40" fill="#3b82f6" fill-opacity="0.06" stroke="none"/>
                                    <circle id="join-circle-right" cx="128" cy="60" r="40" fill="#ec4899" fill-opacity="0.06" stroke="none"/>
                                    <!-- Intersection lens (clipped to left circle) -->
                                    <g clip-path="url(#clip-left)">
                                        <circle id="join-intersection" cx="128" cy="60" r="40" fill="#a855f7" fill-opacity="0" stroke="none"/>
                                    </g>
                                    <!-- Strokes on top -->
                                    <circle id="join-circle-left-stroke"  cx="72"  cy="60" r="40" fill="none" stroke="var(--panel-border)" stroke-width="1.5"/>
                                    <circle id="join-circle-right-stroke" cx="128" cy="60" r="40" fill="none" stroke="var(--panel-border)" stroke-width="1.5"/>
                                    <!-- Labels -->
                                    <text id="join-label-left"  x="30" y="64" text-anchor="middle" font-family="'Fira Code', monospace" font-size="7" fill="var(--heading-color)" font-weight="700">A</text>
                                    <text id="join-label-right" x="170" y="64" text-anchor="middle" font-family="'Fira Code', monospace" font-size="7" fill="var(--heading-color)" font-weight="700">B</text>
                                    <text x="100" y="16" text-anchor="middle" font-family="'Fira Code', monospace" font-size="6" fill="var(--text-muted)">A ∩ B</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- BOTTOM ROW: 3 Tables & SQL Reference (Strictly bounded height) -->
                <div style="display: flex; gap: 1rem; height: 40vh; flex-shrink: 0; min-height: 0; overflow: hidden;">
                    
                    <!-- The 3 Tables Container -->
                    <div style="flex: 1; display: flex; gap: 1rem; min-width: 0; min-height: 0;">
                        
                        <!-- Customers Table -->
                        <div style="flex: 1; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow); min-height: 0;">
                            <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                                <div style="font-size: 0.75rem; font-weight: 700; color: ${COLORS.customers}; letter-spacing: 0.05em; text-transform: uppercase;"><i class="fa-solid fa-users" style="margin-right: 0.4rem; opacity: 0.7;"></i> Customers</div>
                            </div>
                            <div id="schema-table-customers" style="flex: 1; min-height: 0; overflow-y: auto; background: var(--bg-color);"></div>
                        </div>

                        <!-- Products Table -->
                        <div style="flex: 1; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow); min-height: 0;">
                            <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                                <div style="font-size: 0.75rem; font-weight: 700; color: ${COLORS.products}; letter-spacing: 0.05em; text-transform: uppercase;"><i class="fa-solid fa-box" style="margin-right: 0.4rem; opacity: 0.7;"></i> Products</div>
                            </div>
                            <div id="schema-table-products" style="flex: 1; min-height: 0; overflow-y: auto; background: var(--bg-color);"></div>
                        </div>

                        <!-- Orders Table -->
                        <div style="flex: 1; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow); min-height: 0;">
                            <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                                <div style="font-size: 0.75rem; font-weight: 700; color: ${COLORS.orders}; letter-spacing: 0.05em; text-transform: uppercase;"><i class="fa-solid fa-cart-shopping" style="margin-right: 0.4rem; opacity: 0.7;"></i> Orders</div>
                            </div>
                            <div id="schema-table-orders" style="flex: 1; min-height: 0; overflow-y: auto; background: var(--bg-color);"></div>
                        </div>

                    </div>

                    <!-- SQL Reference Right Sidebar -->
                    <div style="width: 250px; flex-shrink: 0; display: flex; flex-direction: column; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; box-shadow: var(--control-shadow); min-height: 0;">
                        <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--info-box); flex-shrink: 0;">
                            <div style="font-size: 0.75rem; font-weight: 700; color: var(--heading-color); letter-spacing: 0.05em;"><i class="fa-solid fa-book" style="margin-right: 0.4rem; opacity: 0.7;"></i> SQL REFERENZ</div>
                        </div>
                        <div style="flex: 1; min-height: 0; overflow-y: auto; background: var(--bg-color); padding: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
                            ${commandChipsHtml}
                        </div>
                    </div>

                </div>
            </div>
        `;

        document.getElementById('main-content').insertAdjacentHTML('beforeend', viewHtml);
    }

    function open() {
        createViewDOM();
        
        const homeView = document.getElementById('home-view');
        const docView = document.getElementById('doc-view');
        if (homeView) homeView.style.display = 'none';
        if (docView) docView.style.display = 'none';

        const sqlView = document.getElementById('sql-view');
        if (sqlView) {
            sqlView.style.display = 'flex';
            
            const qInput = document.getElementById('sqlQueryInput');
            if (qInput) handleInput(qInput);
            
            if (!engineLoaded) {
                loadEngine().catch(() => {});
            } else {
                renderSchemaList();
                updateJoinDiagram();
            }
        }
    }

    function close() {
        const sqlView = document.getElementById('sql-view');
        if (sqlView) {
            sqlView.style.display = 'none';
        }
        if (App.nav && typeof App.nav.openHome === 'function') {
            App.nav.openHome();
        }
    }

    return {
        open,
        close,
        run: runQuery,
        onInput: handleInput,
        insertSnippet: insertSnippet
    };
})();