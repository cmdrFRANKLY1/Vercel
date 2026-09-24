// resources/topics/dataprotection/data/illustrations/datenschutz-flow.js
// Markup for the canvas animation shell (.viz-shell wrapper).

export const datenschutzFlowHtml = `
    <style>
        .viz-shell { position: relative; width: 100%; height: 50vh; min-height: 400px; background: var(--bg-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; margin-top: 0.75rem; }
        .canvas-wrap { position: absolute; inset: 0; background: var(--bg-color); }
        .canvas-wrap canvas { display: block; width: 100%; height: 100%; }
        .title-tag { position: absolute; top: .8rem; left: 50%; transform: translateX(-50%); padding: .45rem .9rem .5rem .9rem; background: var(--panel-color); opacity: 0.95; border: 1px solid var(--border-color); border-radius: .6rem; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 25; pointer-events: none; text-align: center; box-shadow: var(--card-shadow); white-space: nowrap; }
        .title-tag .t1 { display: block; font-size: .8rem; font-weight: 800; color: var(--heading-color); line-height: 1.2; }
        .title-tag .t2 { display: block; font-size: .55rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: var(--text-muted); margin-top: .2rem; }
        .loading-bar-container { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: var(--border-color); z-index: 40; overflow: hidden; }
        .loading-bar-fill { height: 100%; width: 0%; background: var(--link-color); transition: width 0.1s linear; }
        @media (max-width: 600px) {
            .title-tag { top: .6rem; padding: .4rem .7rem .45rem .7rem; }
            .title-tag .t1 { font-size: .7rem; }
            .title-tag .t2 { font-size: .48rem; }
        }
    </style>
    <div class="viz-shell">
        <div class="canvas-wrap" id="dsgCanvasWrapper">
            <canvas id="dsgCanvas"></canvas>
            <div class="title-tag">
                <span data-lang-de class="block">
                    <span class="t1">Der Weg des Datenschutzes</span>
                    <span class="t2">In 6 einfachen Schritten</span>
                </span>
                <span data-lang-en style="display:none;" class="block">
                    <span class="t1">The Path of Data Protection</span>
                    <span class="t2">In 6 simple steps</span>
                </span>
            </div>
        </div>
        <div class="loading-bar-container">
            <div class="loading-bar-fill" id="dsgLoadingBar"></div>
        </div>
    </div>
`;