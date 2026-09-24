// resources/topics/dataprotection/data/law-configs.js

export const GII_BASE = 'https://www.gesetze-im-internet.de';

export const LAW_CONFIGS = [
    {
        code: 'dsgvo_2018',
        title: { de: 'DSGVO – Datenschutz-Grundverordnung', en: 'GDPR – General Data Protection Regulation' },
        icon: 'fa-scale-balanced',
        sections: [
            { id: 'dsgvo-grundlagen', title: { de: '1. DSGVO Grundlagen & Grundsätze', en: '1. GDPR Principles' },              icon: 'fa-list-check',     norms: ['art:5', 'art:6'] },
            { id: 'dsgvo-rechte',     title: { de: '2. DSGVO Betroffenenrechte',       en: '2. GDPR Data Subject Rights' },     icon: 'fa-user-shield',    norms: ['art:15', 'art:16', 'art:17', 'art:20', 'art:21'] },
            { id: 'dsgvo-pflichten',  title: { de: '3. DSGVO Pflichten & Rollen',      en: '3. GDPR Duties & Roles' },          icon: 'fa-clipboard-check', norms: ['art:28', 'art:30', 'art:32', 'art:33', 'art:35'] }
        ]
    },
    {
        code: 'bdsg_2018',
        title: { de: 'BDSG – Bundesdatenschutzgesetz', en: 'BDSG – Federal Data Protection Act' },
        icon: 'fa-gavel',
        sections: [
            { id: 'bdsg-beschaeftigte', title: { de: '4. BDSG – Beschäftigtenschutz',   en: '4. BDSG – Employee Privacy' },      icon: 'fa-users',                 norms: ['par:26'] },
            { id: 'bdsg-sanktionen',    title: { de: '5. BDSG – Sanktionen & Aufsicht', en: '5. BDSG – Sanctions & Supervision' }, icon: 'fa-triangle-exclamation', norms: ['par:38', 'par:42', 'par:43'] }
        ]
    },
    {
        code: 'ttdsg',
        title: { de: 'TTDSG – Telemedien-Datenschutz', en: 'TTDSG – Telemedia Privacy' },
        icon: 'fa-cookie',
        sections: [
            { id: 'ttdsg-cookies', title: { de: '6. TTDSG – Cookies & Telemedien', en: '6. TTDSG – Cookies & Telemedia' }, icon: 'fa-cookie', norms: ['par:1', 'par:25'] }
        ]
    },
    {
        code: 'tkg_2021',
        title: { de: 'TKG – Telekommunikationsgesetz', en: 'TKG – Telecommunications Act' },
        icon: 'fa-tower-broadcast',
        sections: [
            { id: 'tkg-schutz', title: { de: '7. TKG – Fernmeldegeheimnis', en: '7. TKG – Telecommunications Privacy' }, icon: 'fa-phone', norms: ['par:3', 'par:91'] }
        ]
    }
];