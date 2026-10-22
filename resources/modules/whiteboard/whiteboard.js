// resources/modules/whiteboard/whiteboard.js
// Classic script → exposes App.whiteboard.
// Features: Infinite pannable canvas, monochrome icons, undo/redo, pen/shapes, and DOM nodes.

(function () {
    'use strict';

    var STORAGE_KEY = 'whiteboard-v5';

    var state = {
        open: false,
        zoom: 1,
        panX: 0,
        panY: 0,
        tool: 'select', // select, pen, rect, ellipse
        color: 'var(--text-color)',
        nodes: [],       // { id, type, x, y, w, h, text, url }
        connections: [], // { id, fromId, toId }
        strokes: [],     // { id, type, x, y, w, h, points, color }
        drawing: null,
        history: [],
        historyIndex: -1
    };

    var el = {}; // DOM references

    // ---------- styles ----------
    function injectStyles() {
        if (document.getElementById('wb-style')) return;
        var s = document.createElement('style');
        s.id = 'wb-style';
        s.textContent = `
            #whiteboardModal {
                position: fixed; z-index: 900; display: none;
                background: var(--bg-color); color: var(--text-color);
            }
            #whiteboardModal.is-open { display: flex; flex-direction: column; }
            #whiteboardModal .wb-header {
                display: flex; justify-content: space-between; align-items: center;
                padding: 0.6rem 1rem; border-bottom: 1px solid var(--border-color);
                background: var(--panel-color); flex-shrink: 0; z-index: 10;
            }
            #whiteboardModal .wb-title { font-weight: 700; color: var(--heading-color); display: flex; align-items: center; gap: 0.5rem; }
            #whiteboardModal .wb-btn {
                display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
                padding: 0.4rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-color);
                background: var(--code-bg); color: var(--text-color); font-size: 0.75rem; font-weight: 600;
                cursor: pointer; transition: 0.15s;
            }
            #whiteboardModal .wb-btn:hover { border-color: var(--link-color); color: var(--link-color); }
            #whiteboardModal .wb-btn:disabled { opacity: 0.4; cursor: not-allowed; }
            #whiteboardModal .wb-btn.is-active { background: var(--link-color); color: #fff; border-color: var(--link-color); }
            
            #whiteboardModal .wb-main { display: flex; flex: 1 1 auto; min-height: 0; overflow: hidden; }
            
            /* Infinite Canvas Area */
            #whiteboardModal .wb-canvas-wrap {
                flex: 1 1 auto; position: relative; min-width: 0; min-height: 0;
                overflow: hidden; cursor: crosshair; background-color: var(--bg-color);
                background-image: radial-gradient(var(--border-color) 1px, transparent 1px);
                background-size: 20px 20px;
            }
            #whiteboardModal .wb-canvas-wrap.is-panning { cursor: grab; }
            #whiteboardModal .wb-canvas-wrap.is-panning:active { cursor: grabbing; }
            
            #whiteboardModal .wb-stage {
                position: absolute; top: 0; left: 0; width: 1px; height: 1px;
                transform-origin: 0 0; pointer-events: none;
            }
            #whiteboardModal .wb-draw-canvas {
                position: absolute; inset: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: 1;
            }
            #whiteboardModal .wb-layer { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
            #whiteboardModal .wb-layer > * { pointer-events: auto; }

            /* SVG Connection Layer */
            #whiteboardModal .wb-svg-layer {
                position: absolute; top: 0; left: 0; width: 10000px; height: 10000px;
                pointer-events: none; overflow: visible; z-index: 3;
            }
            #whiteboardModal .wb-conn-path { fill: none; stroke-width: 3px; }

            /* Right Sidebar */
            #whiteboardModal .wb-right-sidebar {
                width: 260px; flex-shrink: 0; background: var(--panel-color);
                border-left: 1px solid var(--border-color); display: flex; flex-direction: column;
                padding: 1rem; gap: 1rem; z-index: 10;
            }
            #whiteboardModal .wb-tool-group { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
            
            /* Nodes (Cards) */
            #whiteboardModal .wb-node {
                position: absolute; display: flex; flex-direction: column;
                border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: box-shadow 0.2s, outline 0.1s; min-width: 100px; min-height: 60px;
            }
            #whiteboardModal .wb-node:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
            #whiteboardModal .wb-node.is-selected { outline: 2px solid var(--link-color); outline-offset: 2px; z-index: 100; }
            
            /* Resize & Connect Handles */
            #whiteboardModal .wb-resize-handle {
                position: absolute; bottom: -6px; right: -6px; width: 14px; height: 14px;
                background: var(--link-color); border: 2px solid var(--bg-color); border-radius: 50%;
                cursor: se-resize; z-index: 20; opacity: 0; transition: opacity 0.2s;
            }
            #whiteboardModal .wb-node:hover .wb-resize-handle,
            #whiteboardModal .wb-node.is-selected .wb-resize-handle { opacity: 1; }

            #whiteboardModal .wb-connect-handle {
                position: absolute; top: 50%; right: -10px; transform: translateY(-50%);
                width: 20px; height: 20px; background: var(--link-color); border-radius: 50%;
                color: var(--bg-color); display: flex; align-items: center; justify-content: center;
                font-size: 10px; cursor: crosshair; opacity: 0; transition: opacity 0.2s; z-index: 20;
            }
            #whiteboardModal .wb-node:hover .wb-connect-handle { opacity: 1; }

            #whiteboardModal .wb-node-del {
                position: absolute; top: -8px; right: -8px; background: #e0685a; color: #fff;
                border: 2px solid var(--bg-color); border-radius: 50%; width: 22px; height: 22px;
                font-weight: bold; cursor: pointer; z-index: 20; display: flex; align-items: center; justify-content: center;
                opacity: 0; transition: opacity 0.2s;
            }
            #whiteboardModal .wb-node:hover .wb-node-del { opacity: 1; }
            #whiteboardModal .wb-node-del:hover { background: #c94b3e; }

            /* Node Styles */
            #whiteboardModal .wb-node.note { background: var(--panel-color); border: 1px solid var(--border-color); padding: 0.8rem; }
            #whiteboardModal .wb-node.note textarea {
                flex: 1; border: 0; background: transparent; resize: none; font: inherit;
                font-size: 0.9rem; line-height: 1.4; color: var(--text-color); outline: none;
            }
            #whiteboardModal .wb-node.text { background: transparent; box-shadow: none; padding: 0.2rem; }
            #whiteboardModal .wb-node.text textarea {
                flex: 1; border: 0; background: transparent; resize: none; font: inherit;
                font-size: 1.2rem; font-weight: bold; line-height: 1.3; color: var(--text-color); outline: none; text-align: center;
            }
            #whiteboardModal .wb-node.link {
                background: var(--code-bg); border: 2px solid var(--link-color);
                border-radius: 20px; padding: 0 1rem; display: flex; flex-direction: row;
                align-items: center; justify-content: center; color: var(--link-color); font-weight: bold; text-decoration: none;
            }
            #whiteboardModal .wb-node.link:hover { background: var(--link-color); color: var(--bg-color); }
        `;
        document.head.appendChild(s);
    }

    // ---------- persistence & history ----------
    function save() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes: state.nodes, connections: state.connections, strokes: state.strokes })); } catch (_) {}
    }
    function load() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var data = JSON.parse(raw);
            state.nodes = data.nodes || [];
            state.connections = data.connections || [];
            state.strokes = data.strokes || [];
        } catch (_) {}
    }
    
    function pushHistory() {
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(JSON.stringify({ nodes: state.nodes, connections: state.connections, strokes: state.strokes }));
        state.historyIndex++;
        updateUndoRedoBtns();
        save();
    }

    function undo() {
        if (state.historyIndex > 0) {
            state.historyIndex--;
            var data = JSON.parse(state.history[state.historyIndex]);
            state.nodes = data.nodes; state.connections = data.connections; state.strokes = data.strokes;
            updateUndoRedoBtns(); render(); save();
        }
    }

    function redo() {
        if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
            var data = JSON.parse(state.history[state.historyIndex]);
            state.nodes = data.nodes; state.connections = data.connections; state.strokes = data.strokes;
            updateUndoRedoBtns(); render(); save();
        }
    }
    
    function updateUndoRedoBtns() {
        if (el.btnUndo) el.btnUndo.disabled = state.historyIndex <= 0;
        if (el.btnRedo) el.btnRedo.disabled = state.historyIndex >= state.history.length - 1;
    }

    // ---------- DOM Builder ----------
    function build() {
        var modal = document.createElement('div');
        modal.id = 'whiteboardModal';
        modal.innerHTML = `
            <div class="wb-header">
                <div class="wb-title"><i class="fa-solid fa-chalkboard"></i> Whiteboard</div>
                <div style="display:flex; gap:0.5rem; align-items:center;">
                    <button type="button" class="wb-btn" id="wb-undo" onclick="App.whiteboard.undo()"><i class="fa-solid fa-rotate-left"></i></button>
                    <button type="button" class="wb-btn" id="wb-redo" onclick="App.whiteboard.redo()"><i class="fa-solid fa-rotate-right"></i></button>
                    <button type="button" class="wb-btn" onclick="App.whiteboard.clear()" style="color:#e0685a; border-color:#e0685a;"><i class="fa-solid fa-trash"></i></button>
                    
                    <div style="width:1px; height:20px; background:var(--border-color); margin:0 0.5rem;"></div>
                    
                    <button type="button" class="wb-btn" onclick="App.whiteboard.zoom(-0.1)"><i class="fa-solid fa-search-minus"></i></button>
                    <span style="font-size:0.8rem; width:40px; text-align:center; font-weight:bold;" id="wb-zoom-level">100%</span>
                    <button type="button" class="wb-btn" onclick="App.whiteboard.zoom(0.1)"><i class="fa-solid fa-search-plus"></i></button>
                    
                    <button type="button" class="wb-btn" style="margin-left:1rem; background:#e0685a; color:white; border-color:#c94b3e;" onclick="App.whiteboard.close()"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div class="wb-main">
                <div class="wb-canvas-wrap" id="wb-pan-area">
                    <div class="wb-stage" id="wb-stage">
                        <canvas class="wb-draw-canvas" id="wb-draw"></canvas>
                        <svg class="wb-svg-layer" id="wb-svg">
                            <defs>
                                <marker id="wb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                    <path d="M0,0 L10,5 L0,10 Z" fill="var(--link-color)" />
                                </marker>
                            </defs>
                        </svg>
                        <div class="wb-layer" id="wb-layer"></div>
                    </div>
                </div>
                <div class="wb-right-sidebar">
                    <div style="font-size:0.75rem; font-weight:bold; color:var(--text-muted); text-transform:uppercase;">Tools</div>
                    <div class="wb-tool-group">
                        <button type="button" class="wb-btn" data-tool="select" onclick="App.whiteboard.setTool('select')"><i class="fa-solid fa-arrow-pointer"></i> Select</button>
                        <button type="button" class="wb-btn" data-tool="pen" onclick="App.whiteboard.setTool('pen')"><i class="fa-solid fa-pen"></i> Pen</button>
                        <button type="button" class="wb-btn" data-tool="rect" onclick="App.whiteboard.setTool('rect')"><i class="fa-regular fa-square"></i> Rect</button>
                        <button type="button" class="wb-btn" data-tool="ellipse" onclick="App.whiteboard.setTool('ellipse')"><i class="fa-regular fa-circle"></i> Ellipse</button>
                    </div>
                    
                    <div style="font-size:0.75rem; font-weight:bold; color:var(--text-muted); text-transform:uppercase; margin-top:0.5rem;">Add</div>
                    <div class="wb-tool-group">
                        <button type="button" class="wb-btn" onclick="App.whiteboard.addNode('note', 0, 0)"><i class="fa-solid fa-note-sticky"></i> Note</button>
                        <button type="button" class="wb-btn" onclick="App.whiteboard.addNode('text', 0, 0)"><i class="fa-solid fa-font"></i> Text</button>
                        <button type="button" class="wb-btn" style="grid-column: span 2;" onclick="App.whiteboard.addHyperlink()"><i class="fa-solid fa-link"></i> URL</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        el.modal = modal;
        el.panArea = modal.querySelector('#wb-pan-area');
        el.stage = modal.querySelector('#wb-stage');
        el.drawCanvas = modal.querySelector('#wb-draw');
        el.svg = modal.querySelector('#wb-svg');
        el.layer = modal.querySelector('#wb-layer');
        el.btnUndo = modal.querySelector('#wb-undo');
        el.btnRedo = modal.querySelector('#wb-redo');

        setupCanvas();
        setupPanning();
        
        // Init history
        pushHistory();
    }

    // ---------- Canvas Drawing (Pen & Shapes) ----------
    function setupCanvas() {
        function pt(e) {
            var r = el.panArea.getBoundingClientRect();
            return { x: (e.clientX - r.left - state.panX) / state.zoom, y: (e.clientY - r.top - state.panY) / state.zoom };
        }

        el.panArea.addEventListener('pointerdown', function(e) {
            if (e.target.closest('.wb-node') || state.tool === 'select') return; // Let nodes or panning handle it
            
            el.panArea.setPointerCapture(e.pointerId);
            var p = pt(e);
            
            if (state.tool === 'pen') {
                state.drawing = { id: 's'+Date.now(), type: 'pen', points: [p], color: state.color };
            } else if (['rect', 'ellipse'].includes(state.tool)) {
                state.drawing = { id: 's'+Date.now(), type: state.tool, x: p.x, y: p.y, w: 0, h: 0, color: state.color };
            }
            renderCanvas();
        });

        el.panArea.addEventListener('pointermove', function(e) {
            if (!state.drawing) return;
            var p = pt(e);
            if (state.tool === 'pen') {
                state.drawing.points.push(p);
            } else {
                state.drawing.w = p.x - state.drawing.x;
                state.drawing.h = p.y - state.drawing.y;
            }
            renderCanvas();
        });

        el.panArea.addEventListener('pointerup', function(e) {
            if (!state.drawing) return;
            state.strokes.push(state.drawing);
            state.drawing = null;
            pushHistory();
            renderCanvas();
        });
    }

    function renderCanvas() {
        var dpr = window.devicePixelRatio || 1;
        // Match canvas size to the 10000x10000 stage
        if (el.drawCanvas.width !== 10000 * dpr) {
            el.drawCanvas.width = 10000 * dpr;
            el.drawCanvas.height = 10000 * dpr;
            el.drawCanvas.style.width = '10000px';
            el.drawCanvas.style.height = '10000px';
        }
        
        var ctx = el.drawCanvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, 10000, 10000);

        var drawStroke = function(st) {
            ctx.save();
            ctx.strokeStyle = st.color === 'var(--text-color)' ? getComputedStyle(document.body).color : st.color;
            ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            
            if (st.type === 'pen') {
                if (st.points.length < 2) { ctx.restore(); return; }
                ctx.beginPath(); ctx.moveTo(st.points[0].x, st.points[0].y);
                st.points.forEach(function(p) { ctx.lineTo(p.x, p.y); });
                ctx.stroke();
            } else if (st.type === 'rect') {
                ctx.strokeRect(st.x, st.y, st.w, st.h);
            } else if (st.type === 'ellipse') {
                ctx.beginPath(); ctx.ellipse(st.x + st.w/2, st.y + st.h/2, Math.abs(st.w/2), Math.abs(st.h/2), 0, 0, Math.PI*2); ctx.stroke();
            }
            ctx.restore();
        };

        state.strokes.forEach(drawStroke);
        if (state.drawing) drawStroke(state.drawing);
    }

    // ---------- Panning & Zooming ----------
    function setupPanning() {
        var isDragging = false;
        var startX, startY, startPanX, startPanY;

        el.panArea.addEventListener('pointerdown', function(e) {
            if (e.target.closest('.wb-node')) return;
            if (state.tool !== 'select') return; // Don't pan if drawing
            
            isDragging = true;
            el.panArea.classList.add('is-panning');
            startX = e.clientX; startY = e.clientY;
            startPanX = state.panX; startPanY = state.panY;
            el.panArea.setPointerCapture(e.pointerId);
        });

        el.panArea.addEventListener('pointermove', function(e) {
            if (!isDragging) return;
            state.panX = startPanX + (e.clientX - startX);
            state.panY = startPanY + (e.clientY - startY);
            updateStageTransform();
        });

        el.panArea.addEventListener('pointerup', function(e) {
            isDragging = false;
            el.panArea.classList.remove('is-panning');
            el.panArea.releasePointerCapture(e.pointerId);
        });

        el.panArea.addEventListener('wheel', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                App.whiteboard.zoom(e.deltaY > 0 ? -0.1 : 0.1);
            }
        }, { passive: false });
    }

    function updateStageTransform() {
        el.stage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
        document.getElementById('wb-zoom-level').textContent = Math.round(state.zoom * 100) + '%';
    }

    // ---------- Rendering Nodes ----------
    function render() {
        if (!el.stage) return;
        updateStageTransform();
        renderCanvas();

        // 1. Connections
        el.svg.innerHTML = `
            <defs>
                <marker id="wb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="var(--link-color)" />
                </marker>
            </defs>
        `;
        state.connections.forEach(function(c) {
            var n1 = state.nodes.find(function(n) { return n.id === c.fromId; });
            var n2 = state.nodes.find(function(n) { return n.id === c.toId; });
            if (!n1 || !n2) return;
            
            var cx1 = n1.x + n1.w/2, cy1 = n1.y + n1.h/2;
            var cx2 = n2.x + n2.w/2, cy2 = n2.y + n2.h/2;
            
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            var dist = Math.hypot(cx2-cx1, cy2-cy1);
            var curv = Math.min(dist * 0.4, 100);
            var pathD = `M${cx1},${cy1} C${cx1+curv},${cy1} ${cx2-curv},${cy2} ${cx2},${cy2}`;
            
            path.setAttribute('d', pathD);
            path.setAttribute('class', 'wb-conn-path');
            path.setAttribute('marker-end', 'url(#wb-arrow)');
            path.setAttribute('stroke', 'var(--link-color)');
            el.svg.appendChild(path);
        });

        // 2. Nodes
        el.layer.innerHTML = '';
        state.nodes.forEach(function(n) {
            var nodeEl = document.createElement('div');
            nodeEl.className = 'wb-node ' + n.type;
            nodeEl.style.cssText = `left:${n.x}px; top:${n.y}px; width:${n.w}px; height:${n.h}px;`;
            nodeEl.dataset.id = n.id;

            // Drag
            nodeEl.addEventListener('pointerdown', function(e) {
                if (e.target.classList.contains('wb-resize-handle') || 
                    e.target.classList.contains('wb-connect-handle') || 
                    e.target.classList.contains('wb-node-del') ||
                    e.target.tagName === 'TEXTAREA') return;
                
                e.stopPropagation();
                nodeEl.setPointerCapture(e.pointerId);
                var sx = e.clientX, sy = e.clientY, ox = n.x, oy = n.y;
                
                function move(ev) {
                    n.x = ox + (ev.clientX - sx) / state.zoom;
                    n.y = oy + (ev.clientY - sy) / state.zoom;
                    nodeEl.style.left = n.x + 'px';
                    nodeEl.style.top = n.y + 'px';
                    renderConnections(); // Only update lines while dragging
                }
                function up() {
                    nodeEl.releasePointerCapture(e.pointerId);
                    document.removeEventListener('pointermove', move);
                    document.removeEventListener('pointerup', up);
                    pushHistory();
                }
                document.addEventListener('pointermove', move);
                document.addEventListener('pointerup', up);
            });

            // Content
            if (n.type === 'note' || n.type === 'text') {
                var ta = document.createElement('textarea');
                ta.value = n.text || '';
                ta.placeholder = n.type === 'note' ? 'Type here...' : 'Heading...';
                ta.oninput = function() { n.text = ta.value; }; // No re-render, just save state
                ta.onblur = function() { pushHistory(); };
                nodeEl.appendChild(ta);
            } 
            else if (n.type === 'link') {
                var a = document.createElement('a');
                a.href = n.url; a.target = '_blank';
                a.style.cssText = 'text-decoration:none; color:inherit; display:flex; align-items:center; justify-content:center; width:100%; height:100%;';
                a.innerHTML = '<i class="fa-solid fa-link" style="margin-right:0.5rem;"></i> ' + (n.text || n.url);
                nodeEl.appendChild(a);
            }

            // Connect Handle
            var connHandle = document.createElement('div');
            connHandle.className = 'wb-connect-handle';
            connHandle.innerHTML = '<i class="fa-solid fa-link"></i>';
            connHandle.addEventListener('pointerdown', function(e) {
                e.stopPropagation();
                var startX = n.x + n.w, startY = n.y + n.h/2;
                var tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                tempPath.setAttribute('class', 'wb-conn-path');
                tempPath.setAttribute('stroke', 'var(--link-color)');
                tempPath.setAttribute('stroke-dasharray', '5,5');
                el.svg.appendChild(tempPath);

                function onMove(ev) {
                    var rect = el.panArea.getBoundingClientRect();
                    var mx = (ev.clientX - rect.left - state.panX) / state.zoom;
                    var my = (ev.clientY - rect.top - state.panY) / state.zoom;
                    tempPath.setAttribute('d', `M${startX},${startY} L${mx},${my}`);
                }
                function onUp(ev) {
                    document.removeEventListener('pointermove', onMove);
                    document.removeEventListener('pointerup', onUp);
                    tempPath.remove();
                    
                    var hovered = document.elementFromPoint(ev.clientX, ev.clientY);
                    var targetNode = hovered ? hovered.closest('.wb-node') : null;
                    
                    if (targetNode && targetNode.dataset.id !== n.id) {
                        state.connections.push({ id: 'c'+Date.now(), fromId: n.id, toId: targetNode.dataset.id });
                        pushHistory();
                        render();
                    }
                }
                document.addEventListener('pointermove', onMove);
                document.addEventListener('pointerup', onUp);
            });
            nodeEl.appendChild(connHandle);

            // Resize Handle
            var resizeHandle = document.createElement('div');
            resizeHandle.className = 'wb-resize-handle';
            resizeHandle.addEventListener('pointerdown', function(e) {
                e.stopPropagation();
                nodeEl.setPointerCapture(e.pointerId);
                var sx = e.clientX, sy = e.clientY, ow = n.w, oh = n.h;
                function move(ev) {
                    n.w = Math.max(100, ow + (ev.clientX - sx) / state.zoom);
                    n.h = Math.max(60, oh + (ev.clientY - sy) / state.zoom);
                    nodeEl.style.width = n.w + 'px';
                    nodeEl.style.height = n.h + 'px';
                    renderConnections();
                }
                function up() {
                    nodeEl.releasePointerCapture(e.pointerId);
                    document.removeEventListener('pointermove', move);
                    document.removeEventListener('pointerup', up);
                    pushHistory();
                }
                document.addEventListener('pointermove', move);
                document.addEventListener('pointerup', up);
            });
            nodeEl.appendChild(resizeHandle);

            // Delete Handle
            var del = document.createElement('button');
            del.className = 'wb-node-del'; del.innerHTML = '×';
            del.onclick = function(e) {
                e.stopPropagation();
                state.nodes = state.nodes.filter(function(x) { return x.id !== n.id; });
                state.connections = state.connections.filter(function(c) { return c.fromId !== n.id && c.toId !== n.id; });
                pushHistory(); render();
            };
            nodeEl.appendChild(del);

            el.layer.appendChild(nodeEl);
        });
    }

    function renderConnections() {
        el.svg.innerHTML = `
            <defs>
                <marker id="wb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="var(--link-color)" />
                </marker>
            </defs>
        `;
        state.connections.forEach(function(c) {
            var n1 = state.nodes.find(function(n) { return n.id === c.fromId; });
            var n2 = state.nodes.find(function(n) { return n.id === c.toId; });
            if (!n1 || !n2) return;
            var cx1 = n1.x + n1.w/2, cy1 = n1.y + n1.h/2;
            var cx2 = n2.x + n2.w/2, cy2 = n2.y + n2.h/2;
            var dist = Math.hypot(cx2-cx1, cy2-cy1);
            var curv = Math.min(dist * 0.4, 100);
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M${cx1},${cy1} C${cx1+curv},${cy1} ${cx2-curv},${cy2} ${cx2},${cy2}`);
            path.setAttribute('class', 'wb-conn-path');
            path.setAttribute('marker-end', 'url(#wb-arrow)');
            path.setAttribute('stroke', 'var(--link-color)');
            el.svg.appendChild(path);
        });
    }

    // ---------- Actions ----------
    function addNode(type, x, y, extra) {
        if (x === 0 && y === 0) {
            var rect = el.panArea.getBoundingClientRect();
            x = (-state.panX + rect.width/2) / state.zoom - 100;
            y = (-state.panY + rect.height/2) / state.zoom - 50;
        }
        var n = Object.assign({
            id: 'n' + Date.now(), type: type, x: x, y: y,
            w: type === 'text' ? 200 : 250, h: type === 'text' ? 60 : 150, text: ''
        }, extra);
        state.nodes.push(n);
        pushHistory(); render();
    }

    function addHyperlink() {
        var url = prompt('URL:', 'https://');
        if (!url) return;
        var label = prompt('Label:', url);
        addNode('link', 0, 0, { url: url, text: label || url, w: 180, h: 50 });
    }

    window.App = window.App || {};
    App.whiteboard = {
        open: function() {
            injectStyles();
            if (!el.modal) build();
            var main = document.getElementById('main-content'); if (main) {
                var r = main.getBoundingClientRect();
                el.modal.style.cssText = `top:${r.top}px; left:${r.left}px; width:${r.width}px; height:${r.height}px;`;
            }
            el.modal.classList.add('is-open');
            state.open = true;
            load();
            state.history = []; state.historyIndex = -1; pushHistory();
            render();
        },
        close: function() { if (el.modal) el.modal.classList.remove('is-open'); state.open = false; },
        toggle: function() { if (state.open) this.close(); else this.open(); },
        addNode: addNode,
        addHyperlink: addHyperlink,
        setTool: function(t) {
            state.tool = t;
            el.modal.querySelectorAll('[data-tool]').forEach(function(b) {
                b.classList.toggle('is-active', b.dataset.tool === t);
            });
        },
        zoom: function(delta) {
            state.zoom = Math.max(0.2, Math.min(3, state.zoom + delta));
            updateStageTransform();
        },
        undo: undo,
        redo: redo,
        clear: function() {
            if (!confirm('Clear the entire board?')) return;
            state.nodes = []; state.connections = []; state.strokes = [];
            pushHistory(); render();
        }
    };

    document.addEventListener('click', function(e) {
        if (!state.open) return;
        if (e.target.closest('#whiteboardModal')) return;
        var sidebar = document.getElementById('appSidebar');
        if (!sidebar || !sidebar.contains(e.target)) return;
        if (e.target.closest('button[onclick*="App.whiteboard"]')) return;
        App.whiteboard.close();
    }, true);
    
    document.addEventListener('keydown', function(e) {
        if (!state.open) return;
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z') { e.preventDefault(); undo(); }
            if (e.key === 'y') { e.preventDefault(); redo(); }
        }
        if (e.key === 'Escape') App.whiteboard.close();
    });

    console.log('[whiteboard] ready.');
})();