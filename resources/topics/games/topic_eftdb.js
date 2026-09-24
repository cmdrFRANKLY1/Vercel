// resources/topics/topic_eftdb.js
// Registers a live Escape From Tarkov database powered entirely by the free tarkov.dev API.

registerTopic({
    parentId: 'Games',
    id: 'EFT Database',
    icon: 'fa-crosshairs',
    titleDe: 'EFT Datenbank',
    titleEn: 'EFT Database',
    descDe: 'Live Flohmarkt-Preise, Items, Händler und Karten via API.',
    descEn: 'Live flea market prices, items, traders, and maps via API.',

    // Sidebar header panel
    sidebarTitleDe: 'Tarkov Datenbank',
    sidebarTitleEn: 'Tarkov Database',
    sidebarSubtitleDe: 'Powered by tarkov.dev',
    sidebarSubtitleEn: 'Powered by tarkov.dev',
    sidebarVersion: 'Live API v1',

    // Hero / intro panel at the top of the topic view
    hero: {
        titleDe: 'Escape From Tarkov Live-Datenbank',
        titleEn: 'Escape From Tarkov Live Database',
        introDe: 'Diese Datenbank nutzt ausschließlich die freie GraphQL-API von <strong>tarkov.dev</strong>. Alle angezeigten Daten (Flohmarkt-Preise, Händler-Restocks, Karteninformationen) werden live und ohne hartcodierte Informationen abgerufen.',
        introEn: 'This database relies entirely on the free <strong>tarkov.dev</strong> GraphQL API. All displayed data (flea market prices, trader restocks, map info) is fetched live without any hardcoded information.'
    },

    // Quick-links grid
    quickLinks: [
        { icon: 'fa-magnifying-glass',    href: '#section-search',  switchToDoc: true, labelDe: 'Item Suche', labelEn: 'Item Search' },
        { icon: 'fa-people-group',        href: '#section-traders', switchToDoc: true, labelDe: 'Händler', labelEn: 'Traders' },
        { icon: 'fa-map-location-dot',    href: '#section-maps',    switchToDoc: true, labelDe: 'Karten', labelEn: 'Maps' },
        { icon: 'fa-external-link-alt',   href: 'https://tarkov.dev/', target: '_blank', labelDe: 'API Quelle',  labelEn: 'API Source' }
    ],

    // Content sections
    sections: [
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
                    <div class="mb-5 relative">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-[var(--text-muted)]"></i>
                        <input type="text" id="eftSearchInput" placeholder="Item suchen (z.B. LedX, M4A1, Salewa)..." class="w-full pl-9 pr-4 py-2 bg-[var(--code-bg)] border border-[var(--border-color)] rounded shadow-[var(--input-shadow)] focus:outline-none focus:border-[var(--link-color)] focus:shadow-[var(--input-shadow-focus)] text-[var(--text-color)] transition-all">
                    </div>
                    <div id="eftSearchResults" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="text-[var(--text-muted)] text-sm col-span-full italic">Geben Sie mindestens 3 Zeichen ein, um die API abzufragen...</div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="mb-5 relative">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-[var(--text-muted)]"></i>
                        <input type="text" id="eftSearchInput" placeholder="Search item (e.g. LedX, M4A1, Salewa)..." class="w-full pl-9 pr-4 py-2 bg-[var(--code-bg)] border border-[var(--border-color)] rounded shadow-[var(--input-shadow)] focus:outline-none focus:border-[var(--link-color)] focus:shadow-[var(--input-shadow-focus)] text-[var(--text-color)] transition-all">
                    </div>
                    <div id="eftSearchResults" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="text-[var(--text-muted)] text-sm col-span-full italic">Enter at least 3 characters to query the API...</div>
                    </div>
                    `
                }
            ]
        },

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
                    htmlDe: `
                    <div id="eftTradersContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="text-[var(--text-muted)] text-sm col-span-full animate-pulse"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Lade Händler-Daten via API...</div>
                    </div>
                    `,
                    htmlEn: `
                    <div id="eftTradersContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="text-[var(--text-muted)] text-sm col-span-full animate-pulse"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading trader data via API...</div>
                    </div>
                    `
                }
            ]
        },

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
                    htmlDe: `
                    <div id="eftMapsContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="text-[var(--text-muted)] text-sm col-span-full animate-pulse"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Lade Karten-Daten via API...</div>
                    </div>
                    `,
                    htmlEn: `
                    <div id="eftMapsContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="text-[var(--text-muted)] text-sm col-span-full animate-pulse"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading map data via API...</div>
                    </div>
                    `
                }
            ]
        }
    ],

    // External links block
    links: {
        titleDe: 'Ressourcen',
        titleEn: 'Resources',
        items: [
            { icon: 'fa-code',          href: 'https://tarkov.dev/api/', target: '_blank', labelDe: 'GraphQL API', labelEn: 'GraphQL API' },
            { icon: 'fa-globe',         href: 'https://tarkov.dev/', target: '_blank', labelDe: 'Tarkov.dev', labelEn: 'Tarkov.dev' }
        ]
    },

    footer: {
        textDe: 'Daten bereitgestellt von der tarkov.dev Community API',
        textEn: 'Data provided by the tarkov.dev community API'
    },

    // --- DYNAMIC RENDERING SCRIPT ---
    // This executes when the user clicks the topic, binding search events and fetching initial data.
    onRender: function(container) {
        
        // Helper to query tarkov.dev GraphQL API
        async function queryTarkovAPI(query, variables = {}) {
            try {
                const response = await fetch('https://api.tarkov.dev/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({ query, variables })
                });
                if (!response.ok) {
                    throw new Error(`API returned status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error('Tarkov API Live Error:', error);
                throw error;
            }
        }

        const isDe = document.body.getAttribute('data-active-lang') === 'de';

        // 1. Setup Item Search
        const searchInput = document.getElementById('eftSearchInput');
        const searchResults = document.getElementById('eftSearchResults');
        let searchTimeout;

        if (searchInput && searchResults) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const val = e.target.value.trim();
                
                if (val.length < 3) {
                    searchResults.innerHTML = `<div class="text-[var(--text-muted)] text-sm col-span-full italic">${isDe ? 'Geben Sie mindestens 3 Zeichen ein...' : 'Enter at least 3 characters...'}</div>`;
                    return;
                }
                
                searchResults.innerHTML = `<div class="text-[var(--link-color)] text-sm col-span-full animate-pulse"><i class="fa-solid fa-spinner fa-spin mr-2"></i> ${isDe ? 'Suche in der API...' : 'Searching the API...'}</div>`;
                
                // Debounce search query to prevent spamming the API
                searchTimeout = setTimeout(async () => {
                    const itemQuery = `
                        query getItems($name: String!) {
                            items(name: $name, limit: 12) {
                                id
                                name
                                shortName
                                avg24hPrice
                                basePrice
                                iconLink
                                width
                                height
                                sellFor {
                                    price
                                    vendor { name }
                                }
                            }
                        }
                    `;
                    
                    try {
                        const data = await queryTarkovAPI(itemQuery, { name: val });
                        
                        if (!data.data || !data.data.items || data.data.items.length === 0) {
                            searchResults.innerHTML = `<div class="text-[var(--text-muted)] text-sm col-span-full">${isDe ? 'Keine Items gefunden.' : 'No items found.'}</div>`;
                            return;
                        }
                        
                        searchResults.innerHTML = data.data.items.map(item => {
                            // Determine flea price
                            const fleaPrice = item.avg24hPrice || item.basePrice || 0;
                            
                            // Determine best trader sell price
                            const sellOptions = item.sellFor || [];
                            // Exclude flea market from vendors to find best standard trader
                            const traderOptions = sellOptions.filter(s => s.vendor.name !== 'Flea Market');
                            traderOptions.sort((a, b) => b.price - a.price);
                            const bestSell = traderOptions[0];
                            
                            const traderName = bestSell ? bestSell.vendor.name : 'N/A';
                            const traderPrice = bestSell ? bestSell.price : 0;
                            
                            return `
                            <div class="flex gap-3 p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--panel-color)] shadow-[var(--control-shadow)] hover:border-[var(--link-color)] transition-colors">
                                <div class="w-16 h-16 shrink-0 flex items-center justify-center bg-[var(--info-box)] rounded border border-[var(--border-color)]">
                                    <img src="${item.iconLink}" alt="${item.shortName}" class="max-w-full max-h-full object-contain" onerror="this.style.display='none'">
                                </div>
                                <div class="flex-1 min-w-0 flex flex-col justify-center">
                                    <div class="font-bold text-sm text-[var(--heading-color)] truncate mb-1" title="${item.name}">${item.shortName}</div>
                                    <div class="text-xs text-[var(--text-muted)] flex justify-between items-center mb-0.5">
                                        <span>Flea:</span> 
                                        <span class="text-[var(--heading-color)] font-mono font-semibold">₽${fleaPrice.toLocaleString()}</span>
                                    </div>
                                    <div class="text-xs text-[var(--text-muted)] flex justify-between items-center">
                                        <span class="truncate pr-2">${traderName}:</span> 
                                        <span class="text-[var(--heading-color)] font-mono font-semibold">₽${traderPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            `;
                        }).join('');
                        
                    } catch (err) {
                        searchResults.innerHTML = `<div class="text-red-500 text-sm col-span-full border border-red-500/30 bg-red-500/10 p-3 rounded"><i class="fa-solid fa-triangle-exclamation mr-1"></i> ${isDe ? 'API-Fehler beim Abrufen der Items.' : 'API Error fetching items.'}</div>`;
                    }
                }, 600);
            });
        }

        // 2. Fetch Traders
        const tradersContainer = document.getElementById('eftTradersContainer');
        if (tradersContainer) {
            const tradersQuery = `
                query {
                    traders {
                        name
                        resetTime
                        currency { name }
                    }
                }
            `;
            queryTarkovAPI(tradersQuery).then(data => {
                if(!data.data || !data.data.traders) throw new Error("No traders data");
                
                tradersContainer.innerHTML = data.data.traders.map(t => {
                    const resetDate = new Date(t.resetTime);
                    const isFuture = resetDate.getTime() > Date.now();
                    const timeStr = resetDate.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' });
                    const dateStr = resetDate.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
                    
                    return `
                    <div class="p-3 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-[var(--control-shadow)] flex flex-col">
                        <div class="font-bold text-sm text-[var(--heading-color)] mb-2 flex items-center gap-2">
                            <i class="fa-solid fa-user-tie text-[var(--text-muted)]"></i> ${t.name}
                        </div>
                        <div class="text-xs text-[var(--text-muted)] mt-auto flex justify-between items-end">
                            <span>Reset:</span>
                            <div class="text-right">
                                <span class="${isFuture ? 'text-[var(--link-color)]' : 'text-orange-400'} font-mono font-semibold">${timeStr}</span>
                                <div class="text-[10px] opacity-70">${dateStr}</div>
                            </div>
                        </div>
                    </div>`;
                }).join('');
            }).catch(err => {
                tradersContainer.innerHTML = `<div class="text-red-500 text-sm col-span-full border border-red-500/30 bg-red-500/10 p-3 rounded"><i class="fa-solid fa-triangle-exclamation mr-1"></i> ${isDe ? 'API-Fehler beim Laden der Händler.' : 'API Error loading traders.'}</div>`;
            });
        }

        // 3. Fetch Maps
        const mapsContainer = document.getElementById('eftMapsContainer');
        if (mapsContainer) {
            const mapsQuery = `
                query {
                    maps {
                        name
                        raidDuration
                        players
                    }
                }
            `;
            queryTarkovAPI(mapsQuery).then(data => {
                if(!data.data || !data.data.maps) throw new Error("No maps data");
                
                // Filter out utility pseudo-maps like 'hideout'
                const validMaps = data.data.maps.filter(m => m.name.toLowerCase() !== 'hideout' && m.name.toLowerCase() !== 'private sector');
                
                mapsContainer.innerHTML = validMaps.map(m => {
                    const playersStr = m.players || '1-?';
                    const durationStr = m.raidDuration ? m.raidDuration + ' min' : 'N/A';
                    
                    return `
                    <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-[var(--control-shadow)] flex flex-col gap-2">
                        <div class="font-bold text-sm text-[var(--heading-color)] border-b border-[var(--border-color)] pb-2 mb-1 flex items-center gap-2">
                            <i class="fa-solid fa-map text-[var(--text-muted)]"></i> ${m.name}
                        </div>
                        <div class="text-xs flex justify-between items-center text-[var(--text-muted)]">
                            <span>Dauer / Duration:</span> 
                            <span class="text-[var(--text-color)] font-mono font-semibold">${durationStr}</span>
                        </div>
                        <div class="text-xs flex justify-between items-center text-[var(--text-muted)]">
                            <span>Spieler / Players:</span> 
                            <span class="text-[var(--text-color)] font-mono font-semibold">${playersStr}</span>
                        </div>
                    </div>`;
                }).join('');
            }).catch(err => {
                mapsContainer.innerHTML = `<div class="text-red-500 text-sm col-span-full border border-red-500/30 bg-red-500/10 p-3 rounded"><i class="fa-solid fa-triangle-exclamation mr-1"></i> ${isDe ? 'API-Fehler beim Laden der Karten.' : 'API Error loading maps.'}</div>`;
            });
        }
    }
});