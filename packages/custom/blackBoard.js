(function() {
    if (typeof window.packagesRegistry !== 'undefined') {
        window.packagesRegistry['blackboard'] = {
            name: 'Blackboard',
            version: '1.0.3',
            description: 'A drawing board with shape tools and image search',
            preInstalledOn: ['default'],
            translations: {},
            commands: {
                blackboard: function(args) {
                    const wrapperName = 'blackboard';
                    const hasNt = args && args.includes('-nt');
                    const hasNw = args && args.includes('-nw');
                    
                    const htmlContent = generateBlackboardHTML();
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
                blackboard: "what is this command?\nblackboard\n\nwhat is it used for?\nOpens the Blackboard drawing application where you can draw, add shapes, and insert images from Wikimedia Commons."
            }
        };
    }

    function generateBlackboardHTML() {
        return '<' + '!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'    <meta charset="UTF-8">\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n' +
'    <title>WebBoard · sTerminal Edition</title>\n' +
'    <style>\n' +
'        :root {\n' +
'            --bg-color: #000000;\n' +
'            --text-color: #ffffff;\n' +
'            --font-family: \'Courier New\', Courier, monospace;\n' +
'            --font-size: 12px;\n' +
'            --infobar-size: 20px;\n' +
'        }\n' +
'        body.inverted {\n' +
'            --bg-color: #ffffff;\n' +
'            --text-color: #000000;\n' +
'        }\n' +
'        body, html {\n' +
'            margin: 0;\n' +
'            padding: 0;\n' +
'            height: 100vh;\n' +
'            background-color: var(--bg-color);\n' +
'            color: var(--text-color);\n' +
'            font-family: var(--font-family);\n' +
'            font-size: var(--font-size);\n' +
'            box-sizing: border-box;\n' +
'            overflow: hidden;\n' +
'            display: flex;\n' +
'            flex-direction: column;\n' +
'            user-select: none;\n' +
'        }\n' +
'        #infobar {\n' +
'            height: var(--infobar-size);\n' +
'            width: 100vw;\n' +
'            background-color: var(--bg-color);\n' +
'            color: var(--text-color);\n' +
'            flex-shrink: 0;\n' +
'            display: flex;\n' +
'            justify-content: space-between;\n' +
'            align-items: center;\n' +
'            box-sizing: border-box;\n' +
'            font-size: max(12px, calc(var(--font-size) - 2px));\n' +
'            z-index: 1000;\n' +
'            border-bottom: 1px solid var(--text-color);\n' +
'        }\n' +
'        .infobar-modules-left { display: flex; height: 100%; }\n' +
'        .infobar-modules-right { padding: 0 8px; font-weight: bold; }\n' +
'        #tabs-bar {\n' +
'            height: var(--infobar-size);\n' +
'            width: 100vw;\n' +
'            background-color: var(--bg-color);\n' +
'            color: var(--text-color);\n' +
'            flex-shrink: 0;\n' +
'            display: flex;\n' +
'            align-items: center;\n' +
'            box-sizing: border-box;\n' +
'            font-size: max(12px, calc(var(--font-size) - 2px));\n' +
'            border-top: 1px solid var(--text-color);\n' +
'            z-index: 1001;\n' +
'            overflow-x: auto;\n' +
'        }\n' +
'        .term-btn {\n' +
'            background: transparent;\n' +
'            color: var(--text-color);\n' +
'            border: none;\n' +
'            border-right: 1px solid var(--text-color);\n' +
'            padding: 0 6px;\n' +
'            height: 100%;\n' +
'            display: flex;\n' +
'            align-items: center;\n' +
'            cursor: pointer;\n' +
'            font-family: inherit;\n' +
'            font-size: inherit;\n' +
'            font-weight: bold;\n' +
'            transition: background-color 0.2s, color 0.2s;\n' +
'            white-space: nowrap;\n' +
'        }\n' +
'        .term-btn:hover, .term-btn.active {\n' +
'            background-color: var(--text-color);\n' +
'            color: var(--bg-color);\n' +
'        }\n' +
'        #workspace-container {\n' +
'            flex-grow: 1;\n' +
'            height: 0;\n' +
'            position: relative;\n' +
'            background-color: var(--bg-color);\n' +
'            cursor: crosshair;\n' +
'        }\n' +
'        canvas {\n' +
'            display: block;\n' +
'            position: absolute;\n' +
'            top: 0;\n' +
'            left: 0;\n' +
'            width: 100%;\n' +
'            height: 100%;\n' +
'            touch-action: none;\n' +
'        }\n' +
'        .toolbar-group {\n' +
'            display: flex;\n' +
'            align-items: center;\n' +
'            height: 100%;\n' +
'            padding: 0 8px;\n' +
'            border-right: 1px solid var(--text-color);\n' +
'            gap: 8px;\n' +
'        }\n' +
'        input[type=range] {\n' +
'            -webkit-appearance: none;\n' +
'            appearance: none;\n' +
'            width: 60px;\n' +
'            background: transparent;\n' +
'            height: 100%;\n' +
'            display: flex;\n' +
'            align-items: center;\n' +
'        }\n' +
'        input[type=range]:focus { outline: none; }\n' +
'        input[type=range]::-webkit-slider-runnable-track {\n' +
'            width: 100%;\n' +
'            height: 1px;\n' +
'            background: var(--text-color);\n' +
'            cursor: pointer;\n' +
'        }\n' +
'        input[type=range]::-webkit-slider-thumb {\n' +
'            -webkit-appearance: none;\n' +
'            appearance: none;\n' +
'            height: 12px;\n' +
'            width: 6px;\n' +
'            background: var(--text-color);\n' +
'            cursor: pointer;\n' +
'            margin-top: -5px;\n' +
'            border-radius: 0;\n' +
'        }\n' +
'        .color-btn {\n' +
'            width: 12px;\n' +
'            height: 12px;\n' +
'            cursor: pointer;\n' +
'            border: 1px solid var(--text-color);\n' +
'            box-sizing: border-box;\n' +
'        }\n' +
'        .color-btn.active {\n' +
'            border: 2px solid var(--bg-color);\n' +
'            outline: 1px solid var(--text-color);\n' +
'        }\n' +
'        input[type="color"]#color-picker {\n' +
'            -webkit-appearance: none;\n' +
'            appearance: none;\n' +
'            border: 1px solid var(--text-color);\n' +
'            width: 14px;\n' +
'            height: 14px;\n' +
'            padding: 0;\n' +
'            background: transparent;\n' +
'            cursor: pointer;\n' +
'            box-sizing: border-box;\n' +
'        }\n' +
'        input[type="color"]#color-picker::-webkit-color-swatch-wrapper { padding: 0; }\n' +
'        input[type="color"]#color-picker::-webkit-color-swatch { border: none; }\n' +
'        input[type="color"]#color-picker.active {\n' +
'            border: 2px solid var(--bg-color);\n' +
'            outline: 1px solid var(--text-color);\n' +
'        }\n' +
'        .blink {\n' +
'            animation: blinker 1s linear infinite;\n' +
'        }\n' +
'        @keyframes blinker {\n' +
'            50% { opacity: 0; }\n' +
'        }\n' +
'        #shape-context-menu {\n' +
'            position: fixed;\n' +
'            display: none;\n' +
'            flex-direction: column;\n' +
'            background-color: var(--bg-color);\n' +
'            border: 1px solid var(--text-color);\n' +
'            z-index: 2000;\n' +
'            font-family: inherit;\n' +
'            font-size: var(--font-size);\n' +
'            min-width: 120px;\n' +
'        }\n' +
'        .ctx-item {\n' +
'            padding: 4px 10px;\n' +
'            cursor: pointer;\n' +
'            user-select: none;\n' +
'            border-bottom: 1px solid var(--text-color);\n' +
'        }\n' +
'        .ctx-item:last-child { border-bottom: none; }\n' +
'        .ctx-item:hover, .ctx-item.active {\n' +
'            background-color: var(--text-color);\n' +
'            color: var(--bg-color);\n' +
'        }\n' +
'        #image-search-panel {\n' +
'            position: absolute;\n' +
'            bottom: var(--infobar-size);\n' +
'            left: 0;\n' +
'            width: 100vw;\n' +
'            height: 250px;\n' +
'            background-color: var(--bg-color);\n' +
'            border-top: 1px solid var(--text-color);\n' +
'            display: none;\n' +
'            flex-direction: column;\n' +
'            z-index: 1500;\n' +
'        }\n' +
'        .search-header {\n' +
'            display: flex;\n' +
'            padding: 4px 8px;\n' +
'            border-bottom: 1px solid var(--text-color);\n' +
'            gap: 8px;\n' +
'            align-items: center;\n' +
'        }\n' +
'        .search-header input {\n' +
'            background: transparent;\n' +
'            border: 1px solid var(--text-color);\n' +
'            color: var(--text-color);\n' +
'            font-family: inherit;\n' +
'            font-size: inherit;\n' +
'            padding: 2px 4px;\n' +
'            flex-grow: 1;\n' +
'            outline: none;\n' +
'        }\n' +
'        #image-search-results {\n' +
'            display: flex;\n' +
'            flex-wrap: wrap;\n' +
'            gap: 10px;\n' +
'            padding: 10px;\n' +
'            overflow-y: auto;\n' +
'            overflow-x: hidden;\n' +
'            flex-grow: 1;\n' +
'            align-items: flex-start;\n' +
'            justify-content: center;\n' +
'            align-content: flex-start;\n' +
'        }\n' +
'        .search-result-img {\n' +
'            max-height: 100px;\n' +
'            cursor: pointer;\n' +
'            border: 1px solid transparent;\n' +
'        }\n' +
'        .search-result-img:hover {\n' +
'            border: 1px solid var(--text-color);\n' +
'        }\n' +
'        .floating-img-wrapper {\n' +
'            position: absolute;\n' +
'            border: 1px dashed var(--text-color);\n' +
'            box-sizing: border-box;\n' +
'            z-index: 100;\n' +
'        }\n' +
'        .floating-img-wrapper.locked {\n' +
'            border: 1px solid transparent;\n' +
'            pointer-events: none;\n' +
'        }\n' +
'        .floating-img-wrapper img {\n' +
'            width: 100%;\n' +
'            height: 100%;\n' +
'            object-fit: fill;\n' +
'            pointer-events: none;\n' +
'            display: block;\n' +
'        }\n' +
'        body.inverted .floating-img-wrapper img { filter: invert(1); }\n' +
'        .floating-controls {\n' +
'            position: absolute;\n' +
'            top: -16px; right: -1px;\n' +
'            display: flex;\n' +
'            pointer-events: auto;\n' +
'        }\n' +
'        .floating-btn {\n' +
'            background: var(--bg-color);\n' +
'            color: var(--text-color);\n' +
'            border: 1px solid var(--text-color);\n' +
'            font-family: inherit;\n' +
'            font-size: 10px;\n' +
'            font-weight: bold;\n' +
'            cursor: pointer;\n' +
'            padding: 0 4px;\n' +
'            height: 16px;\n' +
'            user-select: none;\n' +
'        }\n' +
'        .floating-btn:hover {\n' +
'            background: var(--text-color);\n' +
'            color: var(--bg-color);\n' +
'        }\n' +
'        .resize-handle {\n' +
'            position: absolute;\n' +
'            bottom: -5px; right: -5px;\n' +
'            width: 10px; height: 10px;\n' +
'            background: var(--text-color);\n' +
'            cursor: se-resize;\n' +
'            pointer-events: auto;\n' +
'        }\n' +
'        .drag-area {\n' +
'            position: absolute;\n' +
'            inset: 0;\n' +
'            cursor: move;\n' +
'            z-index: 1;\n' +
'            pointer-events: auto;\n' +
'        }\n' +
'        .floating-img-wrapper.locked .resize-handle,\n' +
'        .floating-img-wrapper.locked .drag-area,\n' +
'        .floating-img-wrapper.locked .delete-btn { display: none; }\n' +
'        .floating-img-wrapper.locked .floating-controls {\n' +
'            opacity: 0.2;\n' +
'            transition: opacity 0.2s;\n' +
'        }\n' +
'        .floating-img-wrapper.locked:hover .floating-controls,\n' +
'        .floating-img-wrapper.locked .floating-controls:hover { opacity: 1; }\n' +
'    </style>\n' +
'</head>\n' +
'<body>\n' +
'    <div id="infobar">\n' +
'        <div class="infobar-modules-left">\n' +
'            <button id="theme-toggle" class="term-btn" title="Toggle Theme">INV</button>\n' +
'            <button id="undo-btn" class="term-btn" title="Undo">UNDO</button>\n' +
'            <button id="redo-btn" class="term-btn" title="Redo">REDO</button>\n' +
'            <button id="clear-btn" class="term-btn" title="Clear Board">CLR</button>\n' +
'            <button id="download-btn" class="term-btn" title="Save Image">SAVE</button>\n' +
'        </div>\n' +
'        <div class="infobar-modules-right">\n' +
'            <span id="msg-text">SYSTEM.READY</span><span class="blink">_</span>\n' +
'        </div>\n' +
'    </div>\n' +
'    <div id="workspace-container">\n' +
'        <canvas id="board"></canvas>\n' +
'    </div>\n' +
'    <div id="shape-context-menu">\n' +
'        <div class="ctx-item" data-tool="pen">PENCIL</div>\n' +
'        <div class="ctx-item" data-tool="rect">RECTANGLE</div>\n' +
'        <div class="ctx-item" data-tool="square">SQUARE</div>\n' +
'        <div class="ctx-item" data-tool="circle">CIRCLE</div>\n' +
'        <div class="ctx-item" data-tool="triangle">TRIANGLE</div>\n' +
'        <div class="ctx-item" id="ctx-pictures">PICTURES</div>\n' +
'    </div>\n' +
'    <div id="image-search-panel">\n' +
'        <div class="search-header">\n' +
'            <span>IMG_SEARCH:</span>\n' +
'            <input type="text" id="image-search-input" placeholder="Enter query...">\n' +
'            <button id="image-search-btn" class="term-btn">SEARCH</button>\n' +
'            <button id="image-search-close" class="term-btn">CLOSE</button>\n' +
'        </div>\n' +
'        <div id="image-search-results"></div>\n' +
'    </div>\n' +
'    <div id="tabs-bar">\n' +
'        <button class="term-btn main-tool active" data-tool="pen">PEN</button>\n' +
'        <button class="term-btn main-tool" data-tool="eraser">ERASE</button>\n' +
'        <div class="toolbar-group" title="Stroke Width">\n' +
'            <span>SZ:</span>\n' +
'            <input type="range" id="size-slider" min="1" max="50" value="3">\n' +
'            <span id="size-display" style="width: 2ch; text-align: right;">03</span>\n' +
'        </div>\n' +
'        <div class="toolbar-group" id="color-palette">\n' +
'            <div class="color-btn active" style="background:#ffffff;" data-color="#ffffff" title="White"></div>\n' +
'            <div class="color-btn" style="background:#ff0000;" data-color="#ff0000" title="Red"></div>\n' +
'            <div class="color-btn" style="background:#00ff00;" data-color="#00ff00" title="Green"></div>\n' +
'            <div class="color-btn" style="background:#0000ff;" data-color="#0000ff" title="Blue"></div>\n' +
'            <div class="color-btn" style="background:#ffff00;" data-color="#ffff00" title="Yellow"></div>\n' +
'            <div class="color-btn" style="background:#ff00ff;" data-color="#ff00ff" title="Magenta"></div>\n' +
'            <div class="color-btn" style="background:#00ffff;" data-color="#00ffff" title="Cyan"></div>\n' +
'            <div style="width: 1px; height: 12px; background: var(--text-color); margin: 0 5px;"></div>\n' +
'            <input type="color" id="color-picker" title="Custom Color" value="#ff0000">\n' +
'        </div>\n' +
'    </div>\n' +
'    <script>\n' +
'        (function() {\n' +
'            const canvas = document.getElementById(\'board\');\n' +
'            const ctx = canvas.getContext(\'2d\', { willReadFrequently: true });\n' +
'            const container = document.getElementById(\'workspace-container\');\n' +
'            const msgText = document.getElementById(\'msg-text\');\n' +
'            let isDrawing = false, lastX = 0, lastY = 0, startX = 0, startY = 0;\n' +
'            let draftState = null, currentTool = \'pen\', currentColor = \'#ffffff\', currentSize = 3;\n' +
'            let undoStack = [], redoStack = [], msgTimer = null;\n' +
'            function updateClock() {\n' +
'                if (msgTimer !== null) return;\n' +
'                const now = new Date();\n' +
'                msgText.textContent = now.toLocaleString(\'en-US\', {\n' +
'                    weekday: \'short\', year: \'numeric\', month: \'short\', day: \'2-digit\',\n' +
'                    hour: \'2-digit\', minute: \'2-digit\', second: \'2-digit\'\n' +
'                }).toUpperCase();\n' +
'            }\n' +
'            function showMessage(msg) {\n' +
'                msgText.textContent = msg.toUpperCase();\n' +
'                clearTimeout(msgTimer);\n' +
'                msgTimer = setTimeout(() => { msgTimer = null; updateClock(); }, 2000);\n' +
'            }\n' +
'            setInterval(updateClock, 1000);\n' +
'            updateClock();\n' +
'            function resizeCanvas() {\n' +
'                const rect = container.getBoundingClientRect();\n' +
'                const dpr = window.devicePixelRatio || 1;\n' +
'                let tempCanvas = null;\n' +
'                if (canvas.width > 0 && canvas.height > 0) {\n' +
'                    tempCanvas = document.createElement(\'canvas\');\n' +
'                    tempCanvas.width = canvas.width;\n' +
'                    tempCanvas.height = canvas.height;\n' +
'                    tempCanvas.getContext(\'2d\').drawImage(canvas, 0, 0);\n' +
'                }\n' +
'                canvas.width = rect.width * dpr;\n' +
'                canvas.height = rect.height * dpr;\n' +
'                ctx.lineCap = \'square\';\n' +
'                ctx.lineJoin = \'miter\';\n' +
'                if (tempCanvas) {\n' +
'                    ctx.save();\n' +
'                    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);\n' +
'                    ctx.restore();\n' +
'                } else if (undoStack.length === 0) { saveState(); }\n' +
'                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n' +
'            }\n' +
'            resizeCanvas();\n' +
'            let resizeTimeout;\n' +
'            window.addEventListener(\'resize\', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(resizeCanvas, 150); });\n' +
'            function saveState() {\n' +
'                if (undoStack.length > 20) undoStack.shift();\n' +
'                undoStack.push(canvas.toDataURL());\n' +
'                redoStack = [];\n' +
'            }\n' +
'            function restoreState(dataUrl) {\n' +
'                const img = new Image();\n' +
'                img.src = dataUrl;\n' +
'                img.onload = () => {\n' +
'                    ctx.save();\n' +
'                    ctx.setTransform(1, 0, 0, 1, 0, 0);\n' +
'                    ctx.clearRect(0, 0, canvas.width, canvas.height);\n' +
'                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);\n' +
'                    ctx.restore();\n' +
'                };\n' +
'            }\n' +
'            function getCoords(e) {\n' +
'                const rect = container.getBoundingClientRect();\n' +
'                return { x: e.clientX - rect.left, y: e.clientY - rect.top };\n' +
'            }\n' +
'            function applyBrush() {\n' +
'                ctx.lineWidth = currentSize;\n' +
'                if (currentTool === \'eraser\') {\n' +
'                    ctx.globalCompositeOperation = \'destination-out\';\n' +
'                    ctx.strokeStyle = \'rgba(0,0,0,1);\';\n' +
'                } else {\n' +
'                    ctx.globalCompositeOperation = \'source-over\';\n' +
'                    ctx.strokeStyle = currentColor;\n' +
'                }\n' +
'            }\n' +
'            function startDrawing(e) {\n' +
'                if (e.target !== canvas || e.button === 2) return;\n' +
'                isDrawing = true;\n' +
'                const c = getCoords(e);\n' +
'                startX = c.x; startY = c.y; lastX = c.x; lastY = c.y;\n' +
'                draftState = ctx.getImageData(0, 0, canvas.width, canvas.height);\n' +
'                ctx.beginPath();\n' +
'                ctx.moveTo(lastX, lastY);\n' +
'                if ([\'pen\', \'eraser\'].includes(currentTool)) {\n' +
'                    ctx.lineTo(lastX, lastY);\n' +
'                    applyBrush();\n' +
'                    ctx.stroke();\n' +
'                }\n' +
'            }\n' +
'            function draw(e) {\n' +
'                if (!isDrawing) return;\n' +
'                e.preventDefault();\n' +
'                const c = getCoords(e);\n' +
'                if ([\'pen\', \'eraser\'].includes(currentTool)) {\n' +
'                    ctx.beginPath();\n' +
'                    ctx.moveTo(lastX, lastY);\n' +
'                    ctx.lineTo(c.x, c.y);\n' +
'                    applyBrush();\n' +
'                    ctx.stroke();\n' +
'                    lastX = c.x; lastY = c.y;\n' +
'                } else {\n' +
'                    ctx.putImageData(draftState, 0, 0);\n' +
'                    ctx.beginPath();\n' +
'                    applyBrush();\n' +
'                    const dx = c.x - startX, dy = c.y - startY;\n' +
'                    if (currentTool === \'rect\') {\n' +
'                        ctx.rect(startX, startY, dx, dy);\n' +
'                    } else if (currentTool === \'square\') {\n' +
'                        const side = Math.max(Math.abs(dx), Math.abs(dy));\n' +
'                        const signX = dx < 0 ? -1 : 1, signY = dy < 0 ? -1 : 1;\n' +
'                        ctx.rect(startX, startY, side * signX, side * signY);\n' +
'                    } else if (currentTool === \'circle\') {\n' +
'                        const radius = Math.hypot(dx, dy);\n' +
'                        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);\n' +
'                    } else if (currentTool === \'triangle\') {\n' +
'                        ctx.moveTo(startX + dx / 2, startY);\n' +
'                        ctx.lineTo(startX, startY + dy);\n' +
'                        ctx.lineTo(startX + dx, startY + dy);\n' +
'                        ctx.closePath();\n' +
'                    }\n' +
'                    ctx.stroke();\n' +
'                }\n' +
'            }\n' +
'            function stopDrawing() {\n' +
'                if (isDrawing) { isDrawing = false; saveState(); }\n' +
'            }\n' +
'            canvas.addEventListener(\'pointerdown\', startDrawing);\n' +
'            window.addEventListener(\'pointermove\', draw);\n' +
'            window.addEventListener(\'pointerup\', stopDrawing);\n' +
'            window.addEventListener(\'pointercancel\', stopDrawing);\n' +
'            window.addEventListener(\'wheel\', (e) => {\n' +
'                if (!isDrawing || [\'pen\', \'eraser\'].includes(currentTool)) return;\n' +
'                e.preventDefault();\n' +
'                const delta = Math.sign(e.deltaY) * -1;\n' +
'                currentSize = Math.max(1, Math.min(50, currentSize + delta));\n' +
'                document.getElementById(\'size-slider\').value = currentSize;\n' +
'                document.getElementById(\'size-display\').textContent = Math.round(currentSize).toString().padStart(2, \'0\');\n' +
'                draw(e);\n' +
'            }, { passive: false });\n' +
'            const ctxMenu = document.getElementById(\'shape-context-menu\');\n' +
'            canvas.addEventListener(\'contextmenu\', (e) => {\n' +
'                e.preventDefault();\n' +
'                ctxMenu.style.display = \'flex\';\n' +
'                let left = e.clientX, top = e.clientY;\n' +
'                if (left + ctxMenu.offsetWidth > window.innerWidth) left = window.innerWidth - ctxMenu.offsetWidth;\n' +
'                if (top + ctxMenu.offsetHeight > window.innerHeight) top = window.innerHeight - ctxMenu.offsetHeight;\n' +
'                ctxMenu.style.left = left + \'px\';\n' +
'                ctxMenu.style.top = top + \'px\';\n' +
'            });\n' +
'            window.addEventListener(\'pointerdown\', (e) => {\n' +
'                if (e.button !== 2 && !ctxMenu.contains(e.target)) { ctxMenu.style.display = \'none\'; }\n' +
'            });\n' +
'            document.querySelectorAll(\'.ctx-item\').forEach(item => {\n' +
'                item.addEventListener(\'click\', function() {\n' +
'                    if (this.id === \'ctx-pictures\') {\n' +
'                        document.getElementById(\'image-search-panel\').style.display = \'flex\';\n' +
'                        ctxMenu.style.display = \'none\';\n' +
'                        document.getElementById(\'image-search-input\').focus();\n' +
'                        return;\n' +
'                    }\n' +
'                    document.querySelectorAll(\'.main-tool\').forEach(b => b.classList.remove(\'active\'));\n' +
'                    document.querySelectorAll(\'.ctx-item\').forEach(b => b.classList.remove(\'active\'));\n' +
'                    this.classList.add(\'active\');\n' +
'                    currentTool = this.dataset.tool;\n' +
'                    showMessage(\'TOOL:\' + currentTool.toUpperCase());\n' +
'                    ctxMenu.style.display = \'none\';\n' +
'                });\n' +
'            });\n' +
'            const colorPicker = document.getElementById(\'color-picker\');\n' +
'            document.querySelectorAll(\'.color-btn\').forEach(btn => {\n' +
'                btn.addEventListener(\'click\', function() {\n' +
'                    document.querySelectorAll(\'.color-btn\').forEach(b => b.classList.remove(\'active\'));\n' +
'                    colorPicker.classList.remove(\'active\');\n' +
'                    this.classList.add(\'active\');\n' +
'                    currentColor = this.dataset.color;\n' +
'                    if (currentTool === \'eraser\') { document.querySelector(\'[data-tool="pen"]\')?.click(); }\n' +
'                    showMessage(\'COLOR:\' + currentColor);\n' +
'                });\n' +
'            });\n' +
'            colorPicker.addEventListener(\'input\', function(e) {\n' +
'                document.querySelectorAll(\'.color-btn\').forEach(b => b.classList.remove(\'active\'));\n' +
'                this.classList.add(\'active\');\n' +
'                currentColor = e.target.value;\n' +
'                if (currentTool === \'eraser\') { document.querySelector(\'[data-tool="pen"]\')?.click(); }\n' +
'                showMessage(\'COLOR:\' + currentColor);\n' +
'            });\n' +
'            const sizeDisplay = document.getElementById(\'size-display\');\n' +
'            document.getElementById(\'size-slider\').addEventListener(\'input\', e => {\n' +
'                currentSize = parseFloat(e.target.value);\n' +
'                sizeDisplay.textContent = Math.round(currentSize).toString().padStart(2, \'0\');\n' +
'            });\n' +
'            document.querySelectorAll(\'.main-tool\').forEach(btn => {\n' +
'                btn.addEventListener(\'click\', function() {\n' +
'                    document.querySelectorAll(\'.main-tool\').forEach(b => b.classList.remove(\'active\'));\n' +
'                    document.querySelectorAll(\'.ctx-item\').forEach(b => b.classList.remove(\'active\'));\n' +
'                    this.classList.add(\'active\');\n' +
'                    currentTool = this.dataset.tool;\n' +
'                    showMessage(\'TOOL:\' + currentTool.toUpperCase());\n' +
'                });\n' +
'            });\n' +
'            function undo() {\n' +
'                if (undoStack.length > 1) {\n' +
'                    redoStack.push(undoStack.pop());\n' +
'                    restoreState(undoStack[undoStack.length - 1]);\n' +
'                    showMessage(\'ACTION:UNDO\');\n' +
'                }\n' +
'            }\n' +
'            function redo() {\n' +
'                if (redoStack.length > 0) {\n' +
'                    const state = redoStack.pop();\n' +
'                    undoStack.push(state);\n' +
'                    restoreState(state);\n' +
'                    showMessage(\'ACTION:REDO\');\n' +
'                }\n' +
'            }\n' +
'            document.getElementById(\'undo-btn\').addEventListener(\'click\', undo);\n' +
'            document.getElementById(\'redo-btn\').addEventListener(\'click\', redo);\n' +
'            document.addEventListener(\'keydown\', e => {\n' +
'                if (e.ctrlKey || e.metaKey) {\n' +
'                    if (e.key === \'z\') { e.preventDefault(); undo(); }\n' +
'                    if (e.key === \'y\') { e.preventDefault(); redo(); }\n' +
'                }\n' +
'                if (e.key === \'Escape\') {\n' +
'                    const searchPanel = document.getElementById(\'image-search-panel\');\n' +
'                    if (searchPanel.style.display === \'flex\') searchPanel.style.display = \'none\';\n' +
'                    if (ctxMenu.style.display === \'flex\') ctxMenu.style.display = \'none\';\n' +
'                }\n' +
'            });\n' +
'            document.getElementById(\'clear-btn\').addEventListener(\'click\', () => {\n' +
'                ctx.save();\n' +
'                ctx.setTransform(1, 0, 0, 1, 0, 0);\n' +
'                ctx.clearRect(0, 0, canvas.width, canvas.height);\n' +
'                ctx.restore();\n' +
'                saveState();\n' +
'                document.querySelectorAll(\'.floating-img-wrapper\').forEach(el => el.remove());\n' +
'                showMessage(\'MEM:FLUSHED\');\n' +
'            });\n' +
'            document.getElementById(\'download-btn\').addEventListener(\'click\', () => {\n' +
'                const tmp = document.createElement(\'canvas\');\n' +
'                tmp.width = canvas.width; tmp.height = canvas.height;\n' +
'                const tctx = tmp.getContext(\'2d\');\n' +
'                const bg = window.getComputedStyle(document.body).getPropertyValue(\'--bg-color\').trim();\n' +
'                tctx.fillStyle = bg || \'#000000\';\n' +
'                tctx.fillRect(0, 0, tmp.width, tmp.height);\n' +
'                tctx.drawImage(canvas, 0, 0);\n' +
'                const dpr = window.devicePixelRatio || 1;\n' +
'                const cRect = canvas.getBoundingClientRect();\n' +
'                document.querySelectorAll(\'.floating-img-wrapper\').forEach(f => {\n' +
'                    const img = f.querySelector(\'img\');\n' +
'                    const rect = f.getBoundingClientRect();\n' +
'                    const x = (rect.left - cRect.left) * dpr;\n' +
'                    const y = (rect.top - cRect.top) * dpr;\n' +
'                    const w = rect.width * dpr, h = rect.height * dpr;\n' +
'                    tctx.filter = document.body.classList.contains(\'inverted\') ? \'invert(1)\' : \'none\';\n' +
'                    tctx.drawImage(img, x, y, w, h);\n' +
'                });\n' +
'                const link = document.createElement(\'a\');\n' +
'                link.download = \'sTERM_BOARD_\' + Math.floor(Date.now() / 1000) + \'.png\';\n' +
'                link.href = tmp.toDataURL(\'image/png\');\n' +
'                link.click();\n' +
'                showMessage(\'DATA:EXPORTED\');\n' +
'            });\n' +
'            const searchInput = document.getElementById(\'image-search-input\');\n' +
'            const searchBtn = document.getElementById(\'image-search-btn\');\n' +
'            const searchClose = document.getElementById(\'image-search-close\');\n' +
'            const searchResults = document.getElementById(\'image-search-results\');\n' +
'            async function searchImages(query) {\n' +
'                if (!query.trim()) return;\n' +
'                searchResults.innerHTML = \'<span style="padding:8px;">SEARCHING...</span>\';\n' +
'                try {\n' +
'                    const url = \'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=\' + encodeURIComponent(query) + \'&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|dimensions&iiurlwidth=200&format=json&origin=*\';\n' +
'                    const res = await fetch(url);\n' +
'                    const data = await res.json();\n' +
'                    searchResults.innerHTML = \'\';\n' +
'                    if (data.query && data.query.pages) {\n' +
'                        Object.values(data.query.pages).forEach(page => {\n' +
'                            if (page.imageinfo && page.imageinfo[0]) {\n' +
'                                const info = page.imageinfo[0];\n' +
'                                const thumbUrl = info.thumburl || info.url;\n' +
'                                const fullUrl = info.url;\n' +
'                                const img = document.createElement(\'img\');\n' +
'                                img.crossOrigin = \'Anonymous\';\n' +
'                                img.src = thumbUrl;\n' +
'                                img.className = \'search-result-img\';\n' +
'                                img.title = \'Click to insert\';\n' +
'                                img.addEventListener(\'click\', () => {\n' +
'                                    const rect = container.getBoundingClientRect();\n' +
'                                    const maxDim = Math.min(rect.width, rect.height) / 2;\n' +
'                                    let w = info.width || 100, h = info.height || 100;\n' +
'                                    if (w > maxDim || h > maxDim) {\n' +
'                                        const ratio = Math.min(maxDim / w, maxDim / h);\n' +
'                                        w *= ratio; h *= ratio;\n' +
'                                    }\n' +
'                                    const wrapper = document.createElement(\'div\');\n' +
'                                    wrapper.className = \'floating-img-wrapper\';\n' +
'                                    wrapper.style.width = w + \'px\';\n' +
'                                    wrapper.style.height = h + \'px\';\n' +
'                                    wrapper.style.left = (rect.width / 2 - w / 2) + \'px\';\n' +
'                                    wrapper.style.top = (rect.height / 2 - h / 2) + \'px\';\n' +
'                                    const innerImg = document.createElement(\'img\');\n' +
'                                    innerImg.crossOrigin = \'Anonymous\';\n' +
'                                    innerImg.src = fullUrl;\n' +
'                                    const dragArea = document.createElement(\'div\');\n' +
'                                    dragArea.className = \'drag-area\';\n' +
'                                    const resizeHandle = document.createElement(\'div\');\n' +
'                                    resizeHandle.className = \'resize-handle\';\n' +
'                                    const controls = document.createElement(\'div\');\n' +
'                                    controls.className = \'floating-controls\';\n' +
'                                    const lockBtn = document.createElement(\'button\');\n' +
'                                    lockBtn.className = \'floating-btn lock-btn\';\n' +
'                                    lockBtn.innerText = \'LOCK\';\n' +
'                                    const delBtn = document.createElement(\'button\');\n' +
'                                    delBtn.className = \'floating-btn delete-btn\';\n' +
'                                    delBtn.innerText = \'DEL\';\n' +
'                                    controls.appendChild(lockBtn);\n' +
'                                    controls.appendChild(delBtn);\n' +
'                                    wrapper.appendChild(innerImg);\n' +
'                                    wrapper.appendChild(dragArea);\n' +
'                                    wrapper.appendChild(resizeHandle);\n' +
'                                    wrapper.appendChild(controls);\n' +
'                                    container.appendChild(wrapper);\n' +
'                                    let isDragging = false, startX, startY, initL, initT;\n' +
'                                    dragArea.addEventListener(\'pointerdown\', e => {\n' +
'                                        isDragging = true;\n' +
'                                        startX = e.clientX; startY = e.clientY;\n' +
'                                        initL = parseFloat(wrapper.style.left) || 0;\n' +
'                                        initT = parseFloat(wrapper.style.top) || 0;\n' +
'                                        dragArea.setPointerCapture(e.pointerId);\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    dragArea.addEventListener(\'pointermove\', e => {\n' +
'                                        if (!isDragging) return;\n' +
'                                        wrapper.style.left = (initL + (e.clientX - startX)) + \'px\';\n' +
'                                        wrapper.style.top = (initT + (e.clientY - startY)) + \'px\';\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    dragArea.addEventListener(\'pointerup\', e => {\n' +
'                                        isDragging = false;\n' +
'                                        dragArea.releasePointerCapture(e.pointerId);\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    let isResizing = false, initW, initH;\n' +
'                                    resizeHandle.addEventListener(\'pointerdown\', e => {\n' +
'                                        isResizing = true;\n' +
'                                        startX = e.clientX; startY = e.clientY;\n' +
'                                        initW = parseFloat(wrapper.style.width) || 0;\n' +
'                                        initH = parseFloat(wrapper.style.height) || 0;\n' +
'                                        resizeHandle.setPointerCapture(e.pointerId);\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    resizeHandle.addEventListener(\'pointermove\', e => {\n' +
'                                        if (!isResizing) return;\n' +
'                                        wrapper.style.width = Math.max(30, initW + (e.clientX - startX)) + \'px\';\n' +
'                                        wrapper.style.height = Math.max(30, initH + (e.clientY - startY)) + \'px\';\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    resizeHandle.addEventListener(\'pointerup\', e => {\n' +
'                                        isResizing = false;\n' +
'                                        resizeHandle.releasePointerCapture(e.pointerId);\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    let isLocked = false;\n' +
'                                    lockBtn.addEventListener(\'click\', e => {\n' +
'                                        isLocked = !isLocked;\n' +
'                                        wrapper.classList.toggle(\'locked\', isLocked);\n' +
'                                        lockBtn.innerText = isLocked ? \'UNLOCK\' : \'LOCK\';\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    delBtn.addEventListener(\'click\', e => {\n' +
'                                        wrapper.remove();\n' +
'                                        e.stopPropagation();\n' +
'                                    });\n' +
'                                    showMessage(\'PICTURE:ADDED\');\n' +
'                                });\n' +
'                                searchResults.appendChild(img);\n' +
'                            }\n' +
'                        });\n' +
'                    } else {\n' +
'                        searchResults.innerHTML = \'<span style="padding:8px;">NO RESULTS FOUND.</span>\';\n' +
'                    }\n' +
'                } catch (e) {\n' +
'                    searchResults.innerHTML = \'<span style="padding:8px;">ERROR FETCHING RESULTS.</span>\';\n' +
'                }\n' +
'            }\n' +
'            searchBtn.addEventListener(\'click\', () => searchImages(searchInput.value));\n' +
'            searchInput.addEventListener(\'keydown\', (e) => {\n' +
'                if (e.key === \'Enter\') searchImages(searchInput.value);\n' +
'            });\n' +
'            searchClose.addEventListener(\'click\', () => {\n' +
'                document.getElementById(\'image-search-panel\').style.display = \'none\';\n' +
'            });\n' +
'            const themeToggle = document.getElementById(\'theme-toggle\');\n' +
'            let inverted = false;\n' +
'            themeToggle.addEventListener(\'click\', function() {\n' +
'                inverted = !inverted;\n' +
'                document.body.classList.toggle(\'inverted\', inverted);\n' +
'                const tmp = document.createElement(\'canvas\');\n' +
'                tmp.width = canvas.width; tmp.height = canvas.height;\n' +
'                const tctx = tmp.getContext(\'2d\');\n' +
'                tctx.drawImage(canvas, 0, 0);\n' +
'                ctx.save();\n' +
'                ctx.setTransform(1, 0, 0, 1, 0, 0);\n' +
'                ctx.clearRect(0, 0, canvas.width, canvas.height);\n' +
'                ctx.globalCompositeOperation = \'source-over\';\n' +
'                ctx.filter = \'invert(1)\';\n' +
'                ctx.drawImage(tmp, 0, 0);\n' +
'                ctx.restore();\n' +
'                function invertHex(hex) {\n' +
'                    if (!hex) return \'#ffffff\';\n' +
'                    let h = hex.replace(\'#\', \'\');\n' +
'                    if (h.length === 3) h = h.split(\'\').map(x => x + x).join(\'\');\n' +
'                    const r = (255 - parseInt(h.slice(0, 2), 16)).toString(16).padStart(2, \'0\');\n' +
'                    const g = (255 - parseInt(h.slice(2, 4), 16)).toString(16).padStart(2, \'0\');\n' +
'                    const b = (255 - parseInt(h.slice(4, 6), 16)).toString(16).padStart(2, \'0\');\n' +
'                    return \'#\' + r + g + b;\n' +
'                }\n' +
'                document.querySelectorAll(\'.color-btn\').forEach(btn => {\n' +
'                    const baseColor = btn.dataset.color;\n' +
'                    btn.style.background = inverted ? invertHex(baseColor) : baseColor;\n' +
'                });\n' +
'                colorPicker.value = invertHex(colorPicker.value);\n' +
'                currentColor = invertHex(currentColor);\n' +
'                while (undoStack.length > 0) undoStack.pop();\n' +
'                saveState();\n' +
'            });\n' +
'        })();\n' +
'    </script>\n' +
'</body>\n' +
'</html>';
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            generateBlackboardHTML,
            package: {
                name: 'blackboard',
                version: '1.0.3',
                description: 'A drawing board with shape tools and image search'
            }
        };
    }
})();