// resources/topics/games/eftdb/meta.js
// Static identity + all sections and quick links for the EFT Database topic.
// Container IDs referenced here are the ones the controllers look for.

export const meta = {
    id: 'EFT Database',
    icon: 'fa-crosshairs',
    titleDe: 'EFT Datenbank',
    titleEn: 'EFT Database',
    descDe: 'Live Flohmarkt-Preise, Items, Händler und Karten via API.',
    descEn: 'Live flea market prices, items, traders, and maps via API.',

    sidebarTitleDe: 'Tarkov Datenbank',
    sidebarTitleEn: 'Tarkov Database',
    sidebarSubtitleDe: 'Powered by tarkov.dev',
    sidebarSubtitleEn: 'Powered by tarkov.dev',
    sidebarVersion: 'v2 — Google-style search',

    hero: {
        titleDe: 'Escape From Tarkov Live-Datenbank',
        titleEn: 'Escape From Tarkov Live Database',
        introDe: 'Diese Datenbank nutzt ausschließlich die freie GraphQL-API von <strong>tarkov.dev</strong>. Alle angezeigten Daten (Flohmarkt-Preise, Händler-Restocks, Karteninformationen) werden live und ohne hartcodierte Informationen abgerufen.',
        introEn: 'This database relies entirely on the free <strong>tarkov.dev</strong> GraphQL API. All displayed data (flea market prices, trader restocks, map info) is fetched live without any hardcoded information.'
    },

    quickLinks: [
        { icon: 'fa-magnifying-glass',  href: '#section-search',     switchToDoc: true, labelDe: 'Item Suche',    labelEn: 'Item Search' },
        { icon: 'fa-chart-line',        href: '#section-market',     switchToDoc: true, labelDe: 'Markt',         labelEn: 'Market' },
        { icon: 'fa-fire',              href: '#section-flea',       switchToDoc: true, labelDe: 'Flohmarkt',     labelEn: 'Flea Market' },
        { icon: 'fa-shield-halved',     href: '#section-ballistics', switchToDoc: true, labelDe: 'Ballistik',     labelEn: 'Ballistics' },
        { icon: 'fa-bullseye',          href: '#section-ammo',       switchToDoc: true, labelDe: 'Munition',      labelEn: 'Ammo' },
        { icon: 'fa-list-check',        href: '#section-quests',     switchToDoc: true, labelDe: 'Quests',        labelEn: 'Quests' },
        { icon: 'fa-cube',              href: '#section-items',      switchToDoc: true, labelDe: 'Items',         labelEn: 'Items' },
        { icon: 'fa-people-group',      href: '#section-traders',    switchToDoc: true, labelDe: 'Händler',       labelEn: 'Traders' },
        { icon: 'fa-map-location-dot',  href: '#section-maps',       switchToDoc: true, labelDe: 'Karten',        labelEn: 'Maps' },
        { icon: 'fa-external-link-alt', href: 'https://tarkov.dev/', target: '_blank',  labelDe: 'API Quelle',    labelEn: 'API Source' }
    ],

    sections: [

        /* ============================================================
           1. Item Search (Google-style)
           ============================================================ */
        {
            id: 'section-search',
            titleDe: 'Live Markt & Item Suche',
            titleEn: 'Live Market & Item Search',
            introDe: 'Suchen Sie nach Waffen, Munition, Schlüsseln oder Barter-Items. Die Preise werden in Echtzeit aktualisiert.',
            introEn: 'Search for weapons, ammo, keys, or barter items. Prices are updated in real-time.',
            subtopics: [
                {
                    id: 'sub-search-ui',
                    titleDe: 'Datenbankabfrage',
                    titleEn: 'Database Query',
                    htmlDe: `
                    <div class="eft-search-shell" id="eftSearchShell">
                        <div class="eft-search-input-wrap">
                            <i class="fa-solid fa-magnifying-glass eft-search-icon"></i>
                            <input type="text" id="eftSearchInput" autocomplete="off" spellcheck="false"
                                   placeholder="Item suchen (z.B. LedX, M4A1, Salewa)…"
                                   class="eft-search-input">
                            <span class="eft-search-hint" id="eftSearchHint">
                                <kbd>↑</kbd><kbd>↓</kbd> · <kbd>Enter</kbd> · <kbd>Esc</kbd>
                            </span>
                        </div>
                        <div id="eftSearchResults" class="eft-search-results">
                            <div class="eft-search-empty">
                                Geben Sie mindestens 3 Zeichen ein, um die API abzufragen…
                            </div>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="eft-search-shell" id="eftSearchShell">
                        <div class="eft-search-input-wrap">
                            <i class="fa-solid fa-magnifying-glass eft-search-icon"></i>
                            <input type="text" id="eftSearchInput" autocomplete="off" spellcheck="false"
                                   placeholder="Search item (e.g. LedX, M4A1, Salewa)…"
                                   class="eft-search-input">
                            <span class="eft-search-hint" id="eftSearchHint">
                                <kbd>↑</kbd><kbd>↓</kbd> · <kbd>Enter</kbd> · <kbd>Esc</kbd>
                            </span>
                        </div>
                        <div id="eftSearchResults" class="eft-search-results">
                            <div class="eft-search-empty">
                                Enter at least 3 characters to query the API…
                            </div>
                        </div>
                    </div>
                    `
                }
            ]
        },

        /* ============================================================
           2. Market Summary (top gainers / losers / stats)
           ============================================================ */
        {
            id: 'section-market',
            titleDe: 'Markt-Übersicht',
            titleEn: 'Market Overview',
            introDe: 'Zusammenfassung des Flohmarkts: Top-Preise, größte Gewinner und Verlierer der letzten 48 Stunden.',
            introEn: 'Flea market summary: top prices, biggest gainers and losers over the last 48 hours.',
            subtopics: [
                {
                    id: 'sub-market-ui',
                    titleDe: 'Markt Zusammenfassung',
                    titleEn: 'Market Summary',
                    htmlDe: `<div id="eftMarketContainer" class="eft-card-grid"></div>`,
                    htmlEn: `<div id="eftMarketContainer" class="eft-card-grid"></div>`
                }
            ]
        },

        /* ============================================================
           3. Flea Market Top-30
           ============================================================ */
        {
            id: 'section-flea',
            titleDe: 'Flohmarkt Top-30',
            titleEn: 'Flea Market Top-30',
            introDe: 'Die 30 teuersten Items auf dem Flohmarkt, sortiert nach dem 24-Stunden-Durchschnittspreis.',
            introEn: 'The 30 most expensive items on the flea market, sorted by 24-hour average price.',
            subtopics: [
                {
                    id: 'sub-flea-ui',
                    titleDe: 'Top Items',
                    titleEn: 'Top Items',
                    htmlDe: `<div id="eftFleaContainer"></div>`,
                    htmlEn: `<div id="eftFleaContainer"></div>`
                }
            ]
        },

        /* ============================================================
           4. Ballistics (armor)
           ============================================================ */
        {
            id: 'section-ballistics',
            titleDe: 'Ballistik',
            titleEn: 'Ballistics',
            introDe: 'Rüstungen und Chest Rigs mit Schutzklasse, Haltbarkeit, Material und Trefferzonen.',
            introEn: 'Armor and chest rigs with protection class, durability, material and hit zones.',
            subtopics: [
                {
                    id: 'sub-ballistics-ui',
                    titleDe: 'Rüstungen & Panzerung',
                    titleEn: 'Armor & Plating',
                    htmlDe: `<div id="eftBallisticsContainer" class="eft-card-grid"></div>`,
                    htmlEn: `<div id="eftBallisticsContainer" class="eft-card-grid"></div>`
                }
            ]
        },

        /* ============================================================
           5. Ammunition
           ============================================================ */
        {
            id: 'section-ammo',
            titleDe: 'Munition',
            titleEn: 'Ammunition',
            introDe: 'Alle Munitionstypen mit Schaden, Panzerungsdurchdringung, Panzerungsschaden und Fragmentierungswahrscheinlichkeit.',
            introEn: 'All cartridge types with damage, penetration power, armor damage and fragmentation chance.',
            subtopics: [
                {
                    id: 'sub-ammo-ui',
                    titleDe: 'Munitions-Tabelle',
                    titleEn: 'Ammo Table',
                    htmlDe: `<div id="eftAmmoContainer"></div>`,
                    htmlEn: `<div id="eftAmmoContainer"></div>`
                }
            ]
        },

        /* ============================================================
           6. Quests
           ============================================================ */
        {
            id: 'section-quests',
            titleDe: 'Quests',
            titleEn: 'Quests',
            introDe: 'Vollständige Quest-Liste mit Händler, Mindestlevel und Kappa-Anforderung. Filterbar nach Händler und Suchbegriff.',
            introEn: 'Complete quest list with trader, minimum level and Kappa requirement. Filterable by trader and search term.',
            subtopics: [
                {
                    id: 'sub-quests-ui',
                    titleDe: 'Quest Liste',
                    titleEn: 'Quest List',
                    htmlDe: `<div id="eftQuestContainer"></div>`,
                    htmlEn: `<div id="eftQuestContainer"></div>`
                }
            ]
        },

        /* ============================================================
           7. Item Catalog
           ============================================================ */
        {
            id: 'section-items',
            titleDe: 'Item Katalog',
            titleEn: 'Item Catalog',
            introDe: 'Durchsuchbarer Katalog aller Items, gruppiert nach Kategorie. Kategorien wechseln lädt die jeweilige Liste neu.',
            introEn: 'Browsable catalog of all items, grouped by category. Switching category reloads the respective list.',
            subtopics: [
                {
                    id: 'sub-items-ui',
                    titleDe: 'Kategorien',
                    titleEn: 'Categories',
                    htmlDe: `<div id="eftItemsContainer"></div>`,
                    htmlEn: `<div id="eftItemsContainer"></div>`
                }
            ]
        },

        /* ============================================================
           8. Traders
           ============================================================ */
        {
            id: 'section-traders',
            titleDe: 'Händler & Restock-Zeiten',
            titleEn: 'Traders & Restock Times',
            introDe: 'Live-Übersicht aller Händler in Tarkov und wann ihr Inventar das nächste Mal zurückgesetzt wird.',
            introEn: 'Live overview of all traders in Tarkov and when their inventory resets next.',
            subtopics: [
                {
                    id: 'sub-traders-ui',
                    titleDe: 'Händler Übersicht',
                    titleEn: 'Traders Overview',
                    htmlDe: `<div id="eftTradersContainer" class="eft-card-grid"></div>`,
                    htmlEn: `<div id="eftTradersContainer" class="eft-card-grid"></div>`
                }
            ]
        },

        /* ============================================================
           9. Maps
           ============================================================ */
        {
            id: 'section-maps',
            titleDe: 'Karteninformationen',
            titleEn: 'Map Information',
            introDe: 'Dynamische Liste aller verfügbaren Locations inklusive Raid-Dauer und maximaler Spieleranzahl.',
            introEn: 'Dynamic list of all available locations including raid duration and max player count.',
            subtopics: [
                {
                    id: 'sub-maps-ui',
                    titleDe: 'Locations',
                    titleEn: 'Locations',
                    htmlDe: `<div id="eftMapsContainer" class="eft-card-grid"></div>`,
                    htmlEn: `<div id="eftMapsContainer" class="eft-card-grid"></div>`
                }
            ]
        }
    ],

    links: {
        titleDe: 'Ressourcen',
        titleEn: 'Resources',
        items: [
            { icon: 'fa-code',  href: 'https://tarkov.dev/api/', target: '_blank', labelDe: 'GraphQL API', labelEn: 'GraphQL API' },
            { icon: 'fa-globe', href: 'https://tarkov.dev/',     target: '_blank', labelDe: 'Tarkov.dev',  labelEn: 'Tarkov.dev' }
        ]
    },

    footer: {
        textDe: 'Daten bereitgestellt von der tarkov.dev Community API',
        textEn: 'Data provided by the tarkov.dev community API'
    }
};