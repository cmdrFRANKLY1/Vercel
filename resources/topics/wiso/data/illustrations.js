// resources/topics/wiso/data/illustrations.js
// Assembles the animated illustrations from ./illustrations/*.

import { matrix } from './illustrations/matrix.js';
import { supplyDemand } from './illustrations/supply-demand.js';
import { marketPower } from './illustrations/market-power.js';

export const illustrations = {
    titleDe: 'Visualisierungen & Grafiken',
    titleEn: 'Visualizations & Graphics',
    introDe: 'Drei einfache, animierte Grafiken zu Markttypen und Angebot/Nachfrage.',
    introEn: 'Three simple animated graphics on market structures and supply/demand.',
    animations: [matrix, supplyDemand, marketPower]
};