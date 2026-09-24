// resources/topics/wiso/data/illustrations/matrix.js
// 3×3 market matrix — 5 s per cell, hover to inspect.

export const matrix = {
    id: 'wiso-vis-matrix',
    titleDe: '3×3 Markt-Matrix',
    titleEn: '3×3 Market Matrix',
    descDe: 'Die neun Markttypen nach Stackelberg. Jede Zelle wird 5 Sekunden lang hervorgehoben und erklärt – Maus drauf halten, um sie festzuhalten.',
    descEn: 'The nine market types after Stackelberg. Each cell is highlighted and explained for 5 seconds — hover to hold it.',
    html: `
    <style>
        .wiso-mm-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
            gap: 1rem;
            align-items: center;
            max-width: 820px;
            margin: 0.5rem auto;
        }
        @media (max-width: 700px) {
            .wiso-mm-layout { grid-template-columns: 1fr; gap: 0.75rem; }
        }

        /* ---------- 4×4 grid ---------- */
        .wiso-mm-matrix {
            display: grid;
            grid-template-columns: auto repeat(3, 1fr);
            grid-template-rows: auto repeat(3, 1fr);
            gap: 5px;
        }
        .wiso-mm-corner {
            display: flex; flex-direction: column;
            justify-content: flex-end; align-items: flex-end;
            text-align: right; padding: 0 0.35rem 0.1rem 0;
            font-size: 0.52rem; font-weight: 800;
            color: var(--text-muted); line-height: 1.25;
            letter-spacing: 0.04em; text-transform: uppercase;
            white-space: nowrap;
        }
        .wiso-mm-col, .wiso-mm-row {
            display: flex; align-items: center; justify-content: center;
            font-size: 0.58rem; font-weight: 800;
            text-transform: uppercase; letter-spacing: 0.07em;
            color: var(--text-muted);
        }
        .wiso-mm-row { justify-content: flex-end; padding-right: 0.35rem; }

        /* ---------- cells ---------- */
        .wiso-mm-cell {
            position: relative;
            aspect-ratio: 1.3 / 1;
            display: flex; align-items: center; justify-content: center;
            text-align: center; padding: 0.3rem;
            border-radius: 0.5rem;
            border: 1.5px solid var(--border-color);
            background: var(--code-bg);
            color: var(--text-color);
            font-size: 0.66rem; font-weight: 700;
            line-height: 1.15; overflow: hidden;
            cursor: pointer;
            transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
            /* --- pure-CSS fallback: 5 s per cell --- */
            animation: wiso-mm-cell-pulse 45s ease-in-out infinite;
            animation-delay: calc(var(--wiso-mm-i) * 5s);
            will-change: transform, border-color, box-shadow;
        }
        .wiso-mm-cell::before {
            content: ''; position: absolute; inset: 0;
            background: var(--wiso-mm-c, transparent);
            opacity: 0;
            transition: opacity 0.35s ease;
            animation: wiso-mm-fill 45s ease-in-out infinite;
            animation-delay: calc(var(--wiso-mm-i) * 5s);
            pointer-events: none;
        }
        .wiso-mm-cell > span { position: relative; z-index: 1; }

        /* JS-driven: disable base keyframes, rely on .is-active */
        .wiso-mm-layout.js-driven .wiso-mm-cell,
        .wiso-mm-layout.js-driven .wiso-mm-cell::before,
        .wiso-mm-layout.js-driven .wiso-mm-desc { animation: none; }

        /* active / hovered highlight */
        .wiso-mm-cell.is-active,
        .wiso-mm-layout:not(.js-driven) .wiso-mm-cell:hover {
            transform: scale(1.06);
            border-color: var(--wiso-mm-c);
            box-shadow: 0 0 24px -4px var(--wiso-mm-c);
        }
        .wiso-mm-cell.is-active::before,
        .wiso-mm-layout:not(.js-driven) .wiso-mm-cell:hover::before { opacity: 0.22; }

        @keyframes wiso-mm-cell-pulse {
            0%    { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
            1.5%  { transform: scale(1.06); border-color: var(--wiso-mm-c);    box-shadow: 0 0 24px -4px var(--wiso-mm-c); }
            9.5%  { transform: scale(1.06); border-color: var(--wiso-mm-c);    box-shadow: 0 0 24px -4px var(--wiso-mm-c); }
            11%   { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
            100%  { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
        }
        @keyframes wiso-mm-fill {
            0%    { opacity: 0; }
            1.5%  { opacity: 0.22; }
            9.5%  { opacity: 0.22; }
            11%   { opacity: 0; }
            100%  { opacity: 0; }
        }

        /* ---------- description panel ---------- */
        .wiso-mm-side { position: relative; min-height: 240px; }
        .wiso-mm-desc {
            position: absolute; inset: 0;
            display: flex; flex-direction: column;
            justify-content: center; gap: 0.4rem;
            padding: 0.85rem 0.95rem;
            background: var(--code-bg);
            border: 1px solid var(--border-color);
            border-left: 3px solid var(--wiso-mm-dc, var(--link-color));
            border-radius: 0.5rem;
            font-size: 0.72rem; line-height: 1.45;
            color: var(--text-muted);
            opacity: 0;
            transition: opacity 0.35s ease;
            /* --- pure-CSS fallback --- */
            animation: wiso-mm-desc-pulse 45s linear infinite;
            animation-delay: calc(var(--wiso-mm-i) * 5s);
            pointer-events: none;
        }
        .wiso-mm-desc.is-active { opacity: 1; }

        .wiso-mm-desc h5 {
            font-size: 0.86rem; font-weight: 800;
            color: var(--wiso-mm-dc, var(--heading-color));
            margin: 0; letter-spacing: 0.01em;
        }
        .wiso-mm-desc .tag {
            font-size: 0.56rem; font-weight: 700;
            letter-spacing: 0.09em; text-transform: uppercase;
            color: var(--text-muted); opacity: 0.7;
        }
        .wiso-mm-desc p { margin: 0; font-size: 0.72rem; line-height: 1.45; }
        .wiso-mm-desc .ex {
            color: var(--text-color); opacity: 0.75;
            font-style: italic; font-size: 0.67rem;
        }

        @keyframes wiso-mm-desc-pulse {
            0%    { opacity: 0; }
            1.5%  { opacity: 1; }
            9.5%  { opacity: 1; }
            11%   { opacity: 0; }
            100%  { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
            .wiso-mm-cell, .wiso-mm-cell::before, .wiso-mm-desc {
                animation: none !important;
            }
            .wiso-mm-desc:not(:first-child) { display: none; }
            .wiso-mm-desc:first-child { opacity: 1; }
        }
        @media (max-width: 480px) {
            .wiso-mm-cell { font-size: 0.58rem; padding: 0.2rem; }
            .wiso-mm-col, .wiso-mm-row { font-size: 0.52rem; }
        }
    </style>

    <div class="wiso-mm-layout">

        <!-- ============ LEFT: 4×4 grid ============ -->
        <div class="wiso-mm-matrix">

            <div class="wiso-mm-corner">
                <span><span data-lang-de>Anbieter ↓</span><span data-lang-en style="display:none;">Sellers ↓</span></span>
                <span><span data-lang-de>Nachfrager →</span><span data-lang-en style="display:none;">Buyers →</span></span>
            </div>

            <div class="wiso-mm-col"><span data-lang-de>Viele</span><span data-lang-en style="display:none;">Many</span></div>
            <div class="wiso-mm-col"><span data-lang-de>Wenige</span><span data-lang-en style="display:none;">Few</span></div>
            <div class="wiso-mm-col"><span data-lang-de>Einer</span><span data-lang-en style="display:none;">One</span></div>

            <div class="wiso-mm-row"><span data-lang-de>Viele</span><span data-lang-en style="display:none;">Many</span></div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#5fd39a; --wiso-mm-i:0;">
                <span data-lang-de>Polypol</span><span data-lang-en style="display:none;">Perfect Comp.</span>
            </div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#5b8def; --wiso-mm-i:1;">
                <span data-lang-de>Nachfrage-Oligopol</span><span data-lang-en style="display:none;">Oligopsony</span>
            </div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#c58af9; --wiso-mm-i:2;">
                <span data-lang-de>Monopson</span><span data-lang-en style="display:none;">Monopsony</span>
            </div>

            <div class="wiso-mm-row"><span data-lang-de>Wenige</span><span data-lang-en style="display:none;">Few</span></div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#5b8def; --wiso-mm-i:3;">
                <span data-lang-de>Oligopol</span><span data-lang-en style="display:none;">Oligopoly</span>
            </div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#e0b64a; --wiso-mm-i:4;">
                <span data-lang-de>Bilaterales Oligopol</span><span data-lang-en style="display:none;">Bilateral Oligop.</span>
            </div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#f0a35e; --wiso-mm-i:5;">
                <span data-lang-de>Beschr. Monopson</span><span data-lang-en style="display:none;">Restr. Monopsony</span>
            </div>

            <div class="wiso-mm-row"><span data-lang-de>Einer</span><span data-lang-en style="display:none;">One</span></div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#e0685a; --wiso-mm-i:6;">
                <span data-lang-de>Monopol</span><span data-lang-en style="display:none;">Monopoly</span>
            </div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#e0685a; --wiso-mm-i:7;">
                <span data-lang-de>Beschr. Monopol</span><span data-lang-en style="display:none;">Restr. Monopoly</span>
            </div>
            <div class="wiso-mm-cell" style="--wiso-mm-c:#e0685a; --wiso-mm-i:8;">
                <span data-lang-de>Bilaterales Monopol</span><span data-lang-en style="display:none;">Bilateral Monop.</span>
            </div>

        </div>

        <!-- ============ RIGHT: 9 descriptions ============ -->
        <div class="wiso-mm-side">

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#5fd39a; --wiso-mm-i:0;">
                <span class="tag">01 · Markt</span>
                <h5><span data-lang-de>Polypol</span><span data-lang-en style="display:none;">Perfect Competition</span></h5>
                <p>
                    <span data-lang-de>Viele Anbieter und viele Nachfrager. Keiner kann den Preis allein bestimmen – er bildet sich aus dem Zusammenspiel.</span>
                    <span data-lang-en style="display:none;">Many sellers and many buyers. No single player can set the price — it emerges from the interaction.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Aktienmarkt, Weizenmarkt</span><span data-lang-en style="display:none;">Example: stock market, wheat market</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#5b8def; --wiso-mm-i:1;">
                <span class="tag">02 · Nachfrage</span>
                <h5><span data-lang-de>Nachfrage-Oligopol (Oligopson)</span><span data-lang-en style="display:none;">Oligopsony</span></h5>
                <p>
                    <span data-lang-de>Viele Anbieter, aber nur wenige Nachfrager. Die wenigen Käufer haben die Macht und können die Preise drücken.</span>
                    <span data-lang-en style="display:none;">Many sellers but only a few buyers. The few buyers hold the power and can push prices down.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Milchbauern ↔ Supermarktketten</span><span data-lang-en style="display:none;">Example: dairy farmers ↔ supermarket chains</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#c58af9; --wiso-mm-i:2;">
                <span class="tag">03 · Nachfrage</span>
                <h5><span data-lang-de>Monopson</span><span data-lang-en style="display:none;">Monopsony</span></h5>
                <p>
                    <span data-lang-de>Viele Anbieter, aber nur <em>ein einziger</em> Nachfrager. Der eine Käufer diktiert den Preis.</span>
                    <span data-lang-en style="display:none;">Many sellers but only <em>one single</em> buyer. The sole buyer dictates the price.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Staat als einziger Rüstungskäufer</span><span data-lang-en style="display:none;">Example: state as sole arms buyer</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#5b8def; --wiso-mm-i:3;">
                <span class="tag">04 · Angebot</span>
                <h5><span data-lang-de>Oligopol</span><span data-lang-en style="display:none;">Oligopoly</span></h5>
                <p>
                    <span data-lang-de>Wenige Anbieter, viele Nachfrager. Die Anbieter beobachten sich gegenseitig und reagieren aufeinander.</span>
                    <span data-lang-en style="display:none;">Few sellers, many buyers. The sellers watch each other and react to each other's moves.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Mobilfunk, Tankstellen</span><span data-lang-en style="display:none;">Example: telecoms, gas stations</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0b64a; --wiso-mm-i:4;">
                <span class="tag">05 · Mitte</span>
                <h5><span data-lang-de>Bilaterales Oligopol</span><span data-lang-en style="display:none;">Bilateral Oligopoly</span></h5>
                <p>
                    <span data-lang-de>Wenige Anbieter, wenige Nachfrager. Beide Seiten sind stark und verhandeln auf Augenhöhe.</span>
                    <span data-lang-en style="display:none;">Few sellers, few buyers. Both sides are strong and negotiate on equal footing.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Flugzeugbauer ↔ Fluglinien</span><span data-lang-en style="display:none;">Example: aircraft makers ↔ airlines</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#f0a35e; --wiso-mm-i:5;">
                <span class="tag">06 · Nachfrage</span>
                <h5><span data-lang-de>Beschränktes Monopson</span><span data-lang-en style="display:none;">Restricted Monopsony</span></h5>
                <p>
                    <span data-lang-de>Wenige Anbieter, ein Nachfrager. Der Käufer hat viel Macht – aber die wenigen Anbieter haben auch etwas Einfluss.</span>
                    <span data-lang-en style="display:none;">Few sellers, one buyer. The buyer has a lot of power — but the few sellers have some influence too.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Staat kauft Polizeiautos</span><span data-lang-en style="display:none;">Example: state buys police cars</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0685a; --wiso-mm-i:6;">
                <span class="tag">07 · Angebot</span>
                <h5><span data-lang-de>Monopol</span><span data-lang-en style="display:none;">Monopoly</span></h5>
                <p>
                    <span data-lang-de>Ein einziger Anbieter, viele Nachfrager. Der Monopolist kann Preis oder Menge allein bestimmen – Kunden haben keine Alternative.</span>
                    <span data-lang-en style="display:none;">One single seller, many buyers. The monopolist can set price or quantity alone — customers have no alternative.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Bahnnetz, Patentinhaber</span><span data-lang-en style="display:none;">Example: rail network, patent holder</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0685a; --wiso-mm-i:7;">
                <span class="tag">08 · Angebot</span>
                <h5><span data-lang-de>Beschränktes Monopol</span><span data-lang-en style="display:none;">Restricted Monopoly</span></h5>
                <p>
                    <span data-lang-de>Ein Anbieter, wenige Nachfrager. Der Anbieter hat Macht, ist aber auf die wenigen großen Kunden angewiesen.</span>
                    <span data-lang-en style="display:none;">One seller, few buyers. The seller has power but relies on the few large clients.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Spezialscanner ↔ 4 Kliniken</span><span data-lang-en style="display:none;">Example: specialised scanner ↔ 4 clinics</span></span>
            </div>

            <div class="wiso-mm-desc" style="--wiso-mm-dc:#e0685a; --wiso-mm-i:8;">
                <span class="tag">09 · Mitte</span>
                <h5><span data-lang-de>Bilaterales Monopol</span><span data-lang-en style="display:none;">Bilateral Monopoly</span></h5>
                <p>
                    <span data-lang-de>Ein Anbieter, ein Nachfrager. Ein reines Kräftemessen – beide Seiten sind absolut voneinander abhängig.</span>
                    <span data-lang-en style="display:none;">One seller, one buyer. A pure test of strength — both sides are absolutely mutually dependent.</span>
                </p>
                <span class="ex"><span data-lang-de>Beispiel: Gewerkschaft ↔ Arbeitgeberverband</span><span data-lang-en style="display:none;">Example: union ↔ employers' association</span></span>
            </div>

        </div>
    </div>
    `
};