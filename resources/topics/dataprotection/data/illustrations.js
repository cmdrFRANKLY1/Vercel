// resources/topics/dataprotection/data/illustrations.js
// Assembles the animations array for the Datenschutz topic.

import { datenschutzFlowHtml } from './illustrations/datenschutz-flow.js';

export const animations = [
    {
        id: 'illustration-dsg-flow',
        type: 'custom',
        titleDe: 'Der Datenfluss in 6 Schritten',
        titleEn: 'The Data Flow in 6 Steps',
        descDe: 'Von der EU-Gesetzgebung bis zum Bußgeld — die komplette Kette in einer Endlosschleife.',
        descEn: 'From EU legislation to fines — the complete chain in one continuous loop.',
        html: datenschutzFlowHtml
    }
];