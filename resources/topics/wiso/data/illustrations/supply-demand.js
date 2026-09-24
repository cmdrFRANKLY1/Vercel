// resources/topics/wiso/data/illustrations/supply-demand.js
// Supply & demand graph, 8 scenarios incl. Festpreis.

export const supplyDemand = {
    id: 'wiso-vis-supply-demand',
    titleDe: 'Angebot & Nachfrage',
    titleEn: 'Supply & Demand',
    descDe: 'Acht typische Marktsituationen – Kurven gleiten zu neuen Positionen, inkl. Festpreis mit Über-/Unterangebot.',
    descEn: 'Eight typical market situations — curves glide to new positions, incl. fixed price with surplus/shortage.',
    html: `
    <style>
        .wiso-sd-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
            gap: 1rem;
            align-items: center;
            max-width: 780px;
            margin: 0.5rem auto;
        }
        @media (max-width: 700px) {
            .wiso-sd-layout { grid-template-columns: 1fr; gap: 0.75rem; }
        }
        .wiso-sd-graph {
            background: var(--code-bg);
            border: 1px solid var(--border-color);
            border-radius: 0.6rem;
            padding: 0.5rem;
            box-shadow: var(--control-shadow);
        }
        .wiso-sd-svg { display: block; width: 100%; height: auto; }

        .wiso-sd-svg .ax    { stroke: var(--text-muted); stroke-width: 1.5; stroke-linecap: round; }
        .wiso-sd-svg .arw   { fill: var(--text-muted); }
        .wiso-sd-svg .grid  { stroke: var(--border-color); stroke-width: 0.5; stroke-dasharray: 2 3; opacity: 0.5; }
        .wiso-sd-svg .supply{ stroke: #5b8def; stroke-width: 3; stroke-linecap: round; }
        .wiso-sd-svg .demand{ stroke: #e0b64a; stroke-width: 3; stroke-linecap: round; }
        .wiso-sd-svg .guide { fill: none; stroke: #10b981; stroke-width: 1.2; stroke-dasharray: 3 3; opacity: 0.55; }
        .wiso-sd-svg .eq    { fill: #10b981; }
        .wiso-sd-svg .eqhalo{ fill: none; stroke: #10b981; stroke-width: 1.5; opacity: 0.5; }
        .wiso-sd-svg .festp { stroke: #c58af9; stroke-width: 2.5; stroke-dasharray: 6 4; stroke-linecap: round; }
        .wiso-sd-svg .zone  { fill: rgba(224,104,90,0.22); stroke: #e0685a; stroke-width: 1; stroke-dasharray: 3 2; }
        .wiso-sd-svg .xdot  { fill: #c58af9; stroke: #0e0e0e; stroke-width: 1; }
        .wiso-sd-svg .lbl   { font: 700 9px Inter, sans-serif; }
        .wiso-sd-svg .lblS  { fill: #5b8def; font-weight: 800; font-size: 10px; }
        .wiso-sd-svg .lblD  { fill: #e0b64a; font-weight: 800; font-size: 10px; }
        .wiso-sd-svg .lblF  { fill: #c58af9; font-weight: 800; }
        .wiso-sd-svg .lblZ  { fill: #e0685a; font-weight: 800; }
        .wiso-sd-svg .lblAx { fill: var(--text-muted); font-weight: 700; font-size: 10px; }

        /* ---- description panel (right side) ---- */
        .wiso-sd-side {
            position: relative;
            min-height: 240px;
        }
        .wiso-sd-desc {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.4rem;
            padding: 0.8rem 0.9rem;
            background: var(--code-bg);
            border: 1px solid var(--border-color);
            border-left: 3px solid var(--wiso-c, var(--link-color));
            border-radius: 0.5rem;
            font-size: 0.72rem;
            line-height: 1.45;
            color: var(--text-muted);
            opacity: 0;
            animation: wiso-sd-show 56s linear infinite;
            will-change: opacity;
        }
        .wiso-sd-desc h5 {
            font-size: 0.82rem;
            font-weight: 800;
            color: var(--wiso-c, var(--heading-color));
            margin: 0;
            letter-spacing: 0.01em;
        }
        .wiso-sd-desc .wiso-sd-tag {
            font-size: 0.58rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--text-muted);
            opacity: 0.7;
            margin-bottom: 0.1rem;
        }
        .wiso-sd-desc.s1 { animation-delay: 0s;  --wiso-c: #10b981; }
        .wiso-sd-desc.s2 { animation-delay: 7s;  --wiso-c: #e0b64a; }
        .wiso-sd-desc.s3 { animation-delay: 14s; --wiso-c: #a855f7; }
        .wiso-sd-desc.s4 { animation-delay: 21s; --wiso-c: #5b8def; }
        .wiso-sd-desc.s5 { animation-delay: 28s; --wiso-c: #e0685a; }
        .wiso-sd-desc.s6 { animation-delay: 35s; --wiso-c: #c58af9; }
        .wiso-sd-desc.s7 { animation-delay: 42s; --wiso-c: #c58af9; }
        .wiso-sd-desc.s8 { animation-delay: 49s; --wiso-c: #14b8a6; }

        @keyframes wiso-sd-show {
            0%    { opacity: 0; }
            1%    { opacity: 1; }
            12%   { opacity: 1; }
            13%   { opacity: 0; }
            100%  { opacity: 0; }
        }
        /* JS-driven sync: descriptions follow the SVG's SMIL clock */
            .wiso-sd-layout.js-driven .wiso-sd-desc {
                animation: none;
                opacity: 0;
                transition: opacity 0.4s ease;
            }
            .wiso-sd-layout.js-driven .wiso-sd-desc.is-active {
                opacity: 1;
            }
        @media (prefers-reduced-motion: reduce) {
            .wiso-sd-desc { animation: none !important; opacity: 1; }
            .wiso-sd-desc:not(.s1) { display: none; }
        }
    </style>

    <div class="wiso-sd-layout">

        <!-- ==================== GRAPH ==================== -->
        <div class="wiso-sd-graph">
        <svg class="wiso-sd-svg" viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

            <!-- grid -->
            <line class="grid" x1="100" y1="30" x2="100" y2="180"/>
            <line class="grid" x1="170" y1="30" x2="170" y2="180"/>
            <line class="grid" x1="240" y1="30" x2="240" y2="180"/>
            <line class="grid" x1="40" y1="67"  x2="300" y2="67"/>
            <line class="grid" x1="40" y1="105" x2="300" y2="105"/>
            <line class="grid" x1="40" y1="142" x2="300" y2="142"/>

            <!-- axes -->
            <line class="ax" x1="40" y1="30" x2="40" y2="180"/>
            <line class="ax" x1="40" y1="180" x2="300" y2="180"/>
            <polygon class="arw" points="40,25 37,33 43,33"/>
            <polygon class="arw" points="305,180 297,177 297,183"/>

            <!-- guide (L-shape to equilibrium) -->
            <path class="guide" d="M 40,105 L 170,105 L 170,180" fill="none">
                <animate attributeName="d" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,92 L 194,92 L 194,180;M 40,92 L 194,92 L 194,180;M 40,110 L 160,110 L 160,180;M 40,110 L 160,110 L 160,180;M 40,119 L 195,119 L 195,180;M 40,119 L 195,119 L 195,180;M 40,98 L 157,98 L 157,180;M 40,98 L 157,98 L 157,180;M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,105 L 170,105 L 170,180;M 40,100 L 180,100 L 180,180;M 40,100 L 180,100 L 180,180;M 40,105 L 170,105 L 170,180"/>
            </path>

            <!-- surplus/shortage zone (only s6+s7 = Festpreis) -->
            <rect class="zone" x="105" y="65" width="130" height="10" rx="3" opacity="0">
                <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="65;65;65;65;65;65;65;65;65;65;65;65;135;135;65;65;65"/>
                <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
            </rect>

            <!-- zone labels: "Überschuss" (s6) / "Mangel" (s7) -->
            <text class="lbl lblZ" x="170" y="60" text-anchor="middle" opacity="0">
                <tspan data-lang-de>Überschuss</tspan><tspan data-lang-en style="display:none;">Surplus</tspan>
                <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="0;0;0;0;0;0;0;0;0;0;1;1;0;0;0;0;0"/>
            </text>
            <text class="lbl lblZ" x="170" y="158" text-anchor="middle" opacity="0">
                <tspan data-lang-de>Mangel</tspan><tspan data-lang-en style="display:none;">Shortage</tspan>
                <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="0;0;0;0;0;0;0;0;0;0;0;0;1;1;0;0;0"/>
            </text>

            <!-- ================= supply line ================= -->
            <line class="supply" x1="50" y1="170" x2="290" y2="40">
                <animate attributeName="x1" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="50;50;50;50;50;50;110;110;50;50;50;50;50;50;50;50;50"/>
                <animate attributeName="y1" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="170;170;170;170;170;170;170;170;170;170;170;170;170;170;170;170;170"/>
                <animate attributeName="x2" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="290;290;290;290;290;290;290;290;250;250;290;290;290;290;290;290;290"/>
                <animate attributeName="y2" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="40;40;40;40;40;40;62;62;35;35;40;40;40;40;40;40;40"/>
            </line>

            <!-- ================= demand line ================= -->
            <line class="demand" x1="50" y1="40" x2="290" y2="170">
                <animate attributeName="x1" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="50;50;50;50;50;50;50;50;50;50;50;50;50;50;150;150;50"/>
                <animate attributeName="y1" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="40;40;20;20;55;55;40;40;40;40;40;40;40;40;40;40;40"/>
                <animate attributeName="x2" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="290;290;290;290;290;290;290;290;290;290;290;290;290;290;220;220;290"/>
                <animate attributeName="y2" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="170;170;140;140;175;175;170;170;170;170;170;170;170;170;180;180;170"/>
            </line>

            <!-- ============ Festpreis line (only s6/s7) ============ -->
            <line class="festp" x1="50" y1="-10" x2="290" y2="-10" opacity="0">
                <animate attributeName="y1" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="-10;-10;-10;-10;-10;-10;-10;-10;-10;-10;70;70;140;140;-10;-10;-10"/>
                <animate attributeName="y2" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="-10;-10;-10;-10;-10;-10;-10;-10;-10;-10;70;70;140;140;-10;-10;-10"/>
                <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
            </line>

            <!-- Festpreis intersection dots -->
            <circle class="xdot" cx="105" cy="70" r="3.5" opacity="0">
                <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="105;105;105;105;105;105;105;105;105;105;105;105;234;234;105;105;105"/>
                <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="70;70;70;70;70;70;70;70;70;70;70;70;140;140;70;70;70"/>
                <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
            </circle>
            <circle class="xdot" cx="234" cy="70" r="3.5" opacity="0">
                <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="234;234;234;234;234;234;234;234;234;234;234;234;105;105;234;234;234"/>
                <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="70;70;70;70;70;70;70;70;70;70;70;70;140;140;70;70;70"/>
                <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
            </circle>

            <!-- Festpreis label on y-axis -->
            <text class="lbl lblF" x="38" y="70" text-anchor="end" opacity="0">
                <tspan data-lang-de>Pfix</tspan><tspan data-lang-en style="display:none;">Pfix</tspan>
                <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="70;70;70;70;70;70;70;70;70;70;70;70;140;140;70;70;70"/>
                <animate attributeName="opacity" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;0;0;0"/>
            </text>

            <!-- equilibrium halo + dot -->
            <circle class="eqhalo" cx="170" cy="105" r="6">
                <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="170;170;194;194;160;160;195;195;157;157;170;170;170;170;180;180;170"/>
                <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="105;105;92;92;110;110;119;119;98;98;105;105;105;105;100;100;105"/>
                <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.55;0;0.55" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle class="eq" cx="170" cy="105" r="6">
                <animate attributeName="cx" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="170;170;194;194;160;160;195;195;157;157;170;170;170;170;180;180;170"/>
                <animate attributeName="cy" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="105;105;92;92;110;110;119;119;98;98;105;105;105;105;100;100;105"/>
            </circle>

            <!-- ============ Curve labels (full words, glide with curves) ============ -->
            <text class="lbl lblS" x="288" y="34" text-anchor="end">
                <tspan data-lang-de>Angebot</tspan><tspan data-lang-en style="display:none;">Supply</tspan>
                <animate attributeName="x" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="288;288;288;288;288;288;288;288;248;248;288;288;288;288;288;288;288"/>
                <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="34;34;34;34;34;34;56;56;29;29;34;34;34;34;34;34;34"/>
            </text>
            <text class="lbl lblD" x="288" y="178" text-anchor="end">
                <tspan data-lang-de>Nachfrage</tspan><tspan data-lang-en style="display:none;">Demand</tspan>
                <animate attributeName="x" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="288;288;288;288;288;288;288;288;288;288;288;288;288;288;218;218;288"/>
                <animate attributeName="y" dur="56s" repeatCount="indefinite" calcMode="linear"
                    keyTimes="0;0.107;0.125;0.232;0.25;0.357;0.375;0.482;0.5;0.607;0.625;0.732;0.75;0.857;0.875;0.982;1"
                    values="178;178;148;148;183;183;178;178;178;178;178;178;178;178;188;188;178"/>
            </text>

            <!-- ============ Axis labels (spelled out) ============ -->
            <text class="lbl lblAx" x="18" y="105" text-anchor="middle" transform="rotate(-90 18 105)">
                <tspan data-lang-de>Preis (P) →</tspan><tspan data-lang-en style="display:none;">Price (P) →</tspan>
            </text>
            <text class="lbl lblAx" x="170" y="200" text-anchor="middle">
                <tspan data-lang-de>Menge (Q) →</tspan><tspan data-lang-en style="display:none;">Quantity (Q) →</tspan>
            </text>
        </svg>
        </div>

        <!-- ==================== SIDE / DESCRIPTION ==================== -->
        <div class="wiso-sd-side">

            <div class="wiso-sd-desc s1">
                <span class="wiso-sd-tag">01 · Markt</span>
                <h5><span data-lang-de>Gleichgewicht</span><span data-lang-en style="display:none;">Equilibrium</span></h5>
                <p><span data-lang-de>Angebot und Nachfrage sind im Einklang. Der Marktpreis stellt sich genau in der Mitte ein – niemand kann ihn allein diktieren.</span><span data-lang-en style="display:none;">Supply and demand are in balance. Price settles in the middle — nobody can dictate it.</span></p>
            </div>

            <div class="wiso-sd-desc s2">
                <span class="wiso-sd-tag">02 · Nachfrage</span>
                <h5><span data-lang-de>Nachfrage-Boom</span><span data-lang-en style="display:none;">Demand Boom</span></h5>
                <p><span data-lang-de><strong>Alle wollen kaufen.</strong> Die Nachfragekurve rückt nach rechts → Preis <em>und</em> Menge steigen. <em>Beispiel: Konzerttickets, Weihnachtsgeschenke.</em></span><span data-lang-en style="display:none;"><strong>Everyone wants to buy.</strong> Demand shifts right → price <em>and</em> quantity rise. <em>Example: concert tickets, holiday shopping.</em></span></p>
            </div>

            <div class="wiso-sd-desc s3">
                <span class="wiso-sd-tag">03 · Nachfrage</span>
                <h5><span data-lang-de>Nachfrage-Rückgang</span><span data-lang-en style="display:none;">Demand Crash</span></h5>
                <p><span data-lang-de><strong>Das Interesse sinkt.</strong> Die Nachfragekurve rückt nach links → Preis <em>und</em> Menge fallen. <em>Beispiel: Produkte, die aus der Mode kommen.</em></span><span data-lang-en style="display:none;"><strong>Interest drops.</strong> Demand shifts left → price <em>and</em> quantity fall. <em>Example: products that went out of fashion.</em></span></p>
            </div>

            <div class="wiso-sd-desc s4">
                <span class="wiso-sd-tag">04 · Angebot</span>
                <h5><span data-lang-de>Angebots-Überfluss</span><span data-lang-en style="display:none;">Supply Surplus</span></h5>
                <p><span data-lang-de><strong>Zu viel produziert.</strong> Die Angebotskurve rückt nach rechts → Preis fällt, Menge steigt. <em>Beispiel: Saisonschlussverkauf.</em></span><span data-lang-en style="display:none;"><strong>Overproduction.</strong> Supply shifts right → price falls, quantity rises. <em>Example: end-of-season sales.</em></span></p>
            </div>

            <div class="wiso-sd-desc s5">
                <span class="wiso-sd-tag">05 · Angebot</span>
                <h5><span data-lang-de>Angebots-Engpass</span><span data-lang-en style="display:none;">Supply Shortage</span></h5>
                <p><span data-lang-de><strong>Rohstoffe oder Bauteile fehlen.</strong> Die Angebotskurve rückt nach links → Preis steigt, Menge sinkt. <em>Beispiel: Chip-Krise, Ernteausfall.</em></span><span data-lang-en style="display:none;"><strong>Inputs are missing.</strong> Supply shifts left → price rises, quantity falls. <em>Example: chip shortage, crop failure.</em></span></p>
            </div>

            <div class="wiso-sd-desc s6">
                <span class="wiso-sd-tag">06 · Staat</span>
                <h5><span data-lang-de>Festpreis zu hoch</span><span data-lang-en style="display:none;">Fixed Price too High</span></h5>
                <p><span data-lang-de>Der Staat setzt einen <strong>Mindestpreis über dem Gleichgewicht</strong> (z.B. Mindestlohn). Anbieter wollen viel produzieren – aber Käufer bleiben aus. Es entsteht ein <strong class="text-red-400">Überschuss</strong> (lila Linie = Festpreis).</span><span data-lang-en style="display:none;">The state sets a <strong>minimum price above equilibrium</strong> (e.g. minimum wage). Sellers want to produce a lot — but buyers stay away. A <strong class="text-red-400">surplus</strong> appears (purple line = fixed price).</span></p>
            </div>

            <div class="wiso-sd-desc s7">
                <span class="wiso-sd-tag">07 · Staat</span>
                <h5><span data-lang-de>Festpreis zu niedrig</span><span data-lang-en style="display:none;">Fixed Price too Low</span></h5>
                <p><span data-lang-de>Der Staat setzt einen <strong>Höchstpreis unter dem Gleichgewicht</strong> (z.B. Mietpreisbremse). Käufer wollen viel kaufen – aber Anbieter liefern zu wenig. Es entsteht ein <strong class="text-red-400">Mangel</strong>.</span><span data-lang-en style="display:none;">The state sets a <strong>maximum price below equilibrium</strong> (e.g. rent control). Buyers want a lot — but sellers supply too little. A <strong class="text-red-400">shortage</strong> appears.</span></p>
            </div>

            <div class="wiso-sd-desc s8">
                <span class="wiso-sd-tag">08 · Sonderfall</span>
                <h5><span data-lang-de>Unelastische Nachfrage</span><span data-lang-en style="display:none;">Inelastic Demand</span></h5>
                <p><span data-lang-de><strong>Beispiel: Medikamente.</strong> Die Nachfragekurve ist steil – Käufer reagieren kaum auf den Preis. Sie zahlen fast jeden Preis.</span><span data-lang-en style="display:none;"><strong>Example: medicines.</strong> The demand curve is steep — buyers barely react to price. They will pay almost any price.</span></p>
            </div>

        </div>
    </div>
    `
};