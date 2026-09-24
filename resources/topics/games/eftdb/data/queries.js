// resources/topics/games/eftdb/data/queries.js
// GraphQL query strings for tarkov.dev.
// Field names mirror the live schema at https://tarkov.dev/api/.
// If a query starts erroring, diff its fields against the schema —
// tarkov.dev occasionally renames or removes properties.

/* ============================================================
   SEARCH — item lookup by partial name (min 3 chars)
   ============================================================ */
export const ITEM_SEARCH_QUERY = `
    query getItems($name: String!) {
        items(name: $name, limit: 20) {
            id
            name
            shortName
            avg24hPrice
            basePrice
            iconLink
            width
            height
            categories { name }
            sellFor {
                price
                vendor { name }
            }
        }
    }
`;

/* ============================================================
   MARKET — top-priced items for the summary panel
   ============================================================ */
export const MARKET_QUERY = `
    query {
        items(limit: 100, sortBy: [avg24hPrice]) {
            id
            name
            shortName
            iconLink
            avg24hPrice
            lastLowPrice
            changeLast48hPercent
        }
    }
`;

/* ============================================================
   FLEA — top 30 by 24h average price, richest item info
   ============================================================ */
export const FLEA_QUERY = `
    query {
        items(limit: 30, sortBy: [avg24hPrice]) {
            id
            name
            shortName
            iconLink
            avg24hPrice
            lastLowPrice
            changeLast48hPercent
            width
            height
        }
    }
`;

/* ============================================================
   BALLISTICS — armor and chest rigs with protection properties
   ============================================================ */
export const BALLISTICS_QUERY = `
    query {
        items(categoryNames: [Armor, ChestRig], limit: 40) {
            id
            name
            shortName
            iconLink
            weight
            properties {
                ... on ItemPropertiesArmor {
                    class
                    durability
                    material { name }
                    zones
                }
                ... on ItemPropertiesChestRig {
                    class
                    durability
                    material { name }
                    zones
                }
            }
        }
    }
`;

/* ============================================================
   AMMO — all cartridges with ballistic properties
   ============================================================ */
export const AMMO_QUERY = `
    query {
        items(categoryNames: [Ammo], limit: 200) {
            id
            name
            shortName
            iconLink
            properties {
                ... on ItemPropertiesAmmo {
                    caliber
                    damage
                    penetrationPower
                    armorDamage
                    fragmentationChance
                    initialSpeed
                }
            }
        }
    }
`;

/* ============================================================
   QUESTS — full task list with trader, level, map, Kappa flag
   ============================================================ */
export const QUESTS_QUERY = `
    query {
        tasks {
            id
            name
            minPlayerLevel
            kappaRequired
            wikiLink
            trader { name }
            map { name }
        }
    }
`;

/* ============================================================
   ITEMS — category catalogue
   ============================================================ */

// Categories list (used to build the filter tabs)
export const ITEM_CATEGORIES_QUERY = `
    query {
        itemCategories { id name }
    }
`;

// Items within one category. $name is passed from the selected tab.
export const ITEMS_BY_CATEGORY_QUERY = `
    query($name: String!) {
        items(categoryNames: [$name], limit: 100) {
            id
            name
            shortName
            iconLink
            basePrice
            avg24hPrice
            weight
        }
    }
`;

/* ============================================================
   TRADERS — names + reset times + currency
   ============================================================ */
export const TRADERS_QUERY = `
    query {
        traders {
            name
            resetTime
            currency { name }
        }
    }
`;

/* ============================================================
   MAPS — location names + raid duration + player range
   ============================================================ */
export const MAPS_QUERY = `
    query {
        maps {
            name
            raidDuration
            players
        }
    }
`;