// resources/topics/wiso/data/illustrations/market-power.js
// Market power ladder: polypoly → oligopoly → monopoly.

export const marketPower = {
    id: 'wiso-vis-market-power',
    titleDe: 'Marktmacht-Skala',
    titleEn: 'Market Power Ladder',
    descDe: 'Von Polypol (viele kleine Firmen) über Oligopol (wenige große) bis Monopol (eine einzige).',
    descEn: 'From polypoly (many small firms) through oligopoly (a few big) to monopoly (one single firm).',
    html: `
    <style>
        .wiso-mp-wrap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.55rem;
            max-width: 560px;
            margin: 0.5rem auto;
        }
        .wiso-mp-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 0.9rem 0.4rem 0.7rem;
            border-radius: 0.6rem;
            border: 1.5px solid var(--border-color);
            background: var(--code-bg);
            animation: wiso-mp-glow 7.2s ease-in-out infinite;
            will-change: transform, border-color, box-shadow;
        }
        .wiso-mp-card:nth-child(1) { animation-delay: 0s;   --wiso-mp-c: #5fd39a; }
        .wiso-mp-card:nth-child(2) { animation-delay: 2.4s; --wiso-mp-c: #e0b64a; }
        .wiso-mp-card:nth-child(3) { animation-delay: 4.8s; --wiso-mp-c: #e0685a; }
        @keyframes wiso-mp-glow {
            0%, 100% { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
            6%, 18%  { transform: scale(1.04); border-color: var(--wiso-mp-c);   box-shadow: 0 0 24px -6px var(--wiso-mp-c); }
            30%      { transform: scale(1);    border-color: var(--border-color); box-shadow: none; }
        }
        .wiso-mp-dots {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            justify-content: center;
            align-items: center;
            min-height: 62px;
            max-width: 88px;
        }
        .wiso-mp-dot {
            background: var(--wiso-mp-c);
            border-radius: 50%;
            box-shadow: 0 0 6px -1px var(--wiso-mp-c);
        }
        .wiso-mp-card:nth-child(1) .wiso-mp-dot { width: 8px;  height: 8px; }
        .wiso-mp-card:nth-child(2) .wiso-mp-dot { width: 18px; height: 18px; }
        .wiso-mp-card:nth-child(3) .wiso-mp-dot { width: 52px; height: 52px; }
        .wiso-mp-name {
            font-size: 0.82rem;
            font-weight: 800;
            color: var(--wiso-mp-c);
        }
        .wiso-mp-sub {
            font-size: 0.62rem;
            font-weight: 600;
            color: var(--text-muted);
            text-align: center;
            line-height: 1.25;
        }
        @media (prefers-reduced-motion: reduce) {
            .wiso-mp-card { animation: none !important; }
        }
    </style>
    <div class="wiso-mp-wrap">
        <div class="wiso-mp-card">
            <div class="wiso-mp-dots">
                <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
                <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
                <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
            </div>
            <div class="wiso-mp-name">Polypol</div>
            <div class="wiso-mp-sub">
                <span data-lang-de>Viele kleine Firmen.<br>Keiner bestimmt den Preis.</span>
                <span data-lang-en style="display:none;">Many small firms.<br>None sets the price.</span>
            </div>
        </div>
        <div class="wiso-mp-card">
            <div class="wiso-mp-dots">
                <div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div><div class="wiso-mp-dot"></div>
            </div>
            <div class="wiso-mp-name">Oligopol</div>
            <div class="wiso-mp-sub">
                <span data-lang-de>Wenige große Firmen.<br>Sie beeinflussen den Preis.</span>
                <span data-lang-en style="display:none;">A few big firms.<br>They influence the price.</span>
            </div>
        </div>
        <div class="wiso-mp-card">
            <div class="wiso-mp-dots">
                <div class="wiso-mp-dot"></div>
            </div>
            <div class="wiso-mp-name">Monopol</div>
            <div class="wiso-mp-sub">
                <span data-lang-de>Eine einzige Firma.<br>Sie bestimmt den Preis allein.</span>
                <span data-lang-en style="display:none;">One single firm.<br>It sets the price alone.</span>
            </div>
        </div>
    </div>
    `
};