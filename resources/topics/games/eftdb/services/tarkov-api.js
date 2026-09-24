// resources/topics/games/eftdb/services/tarkov-api.js
//
// Cached wrapper around the tarkov.dev GraphQL endpoint, with a JSON
// API fallback for outages.
//
// Primary:  https://api.tarkov.dev/graphql           (full GraphQL)
// Fallback: https://json.tarkov.dev/regular/{dataset} (flat JSON)
//
// The JSON API returns datasets as objects keyed by numeric strings
// (e.g. { "0": {...}, "1": {...}, "_id": "tasks" }). We normalize them
// to arrays here so every caller sees a consistent shape.

const GRAPHQL_ENDPOINT = 'https://api.tarkov.dev/graphql';
const JSON_API_BASE    = 'https://json.tarkov.dev/regular';

const CACHE_TTL = 5 * 60 * 1000;    // 5 minutes
const cache = new Map();            // key → { data, fetchedAt }

/* ============================================================
   Query → JSON dataset mapping
   ============================================================ */
function getJsonDatasetFromQuery(query) {
    if (!query) return null;
    if (query.includes('itemCategories')) return null;   // no JSON equivalent
    if (query.includes('items('))  return 'items';
    if (query.includes('traders')) return 'traders';
    if (query.includes('maps'))    return 'maps';
    if (query.includes('tasks'))   return 'tasks';
    return null;
}

/* ============================================================
   JSON → array normalization
   ============================================================ */
function normalizeToArray(data) {
    if (Array.isArray(data)) return data;
    if (!data || typeof data !== 'object') return [];

    // The JSON API stores datasets as { "0": {...}, "1": {...}, "_id": "tasks" }.
    // Extract the values (skipping metadata keys that start with underscore).
    const keys = Object.keys(data).filter(k => !k.startsWith('_'));
    const allNumeric = keys.length > 0 && keys.every(k => /^\d+$/.test(k));
    if (allNumeric) {
        return keys
            .sort((a, b) => +a - +b)
            .map(k => data[k]);
    }

    // Some endpoints may return { items: [...] } directly.
    if (Array.isArray(data.items)) return data.items;
    return [];
}

/* ============================================================
   Cache helpers
   ============================================================ */
function cacheKey(query, variables) {
    return query + '|' + JSON.stringify(variables || {});
}

export function clearTarkovCache() {
    cache.clear();
}

/* ============================================================
   Public API
   ============================================================ */
export async function queryTarkovAPI(query, variables = {}) {
    const key = cacheKey(query, variables);
    const hit = cache.get(key);
    if (hit && Date.now() - hit.fetchedAt < CACHE_TTL) {
        return hit.data;
    }

    // --- 1. Primary: GraphQL ---
    try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ query, variables })
        });

        if (!res.ok) {
            throw new Error(`GraphQL returned ${res.status}`);
        }

        const json = await res.json();

        if (json.errors && json.errors.length) {
            const msg = json.errors.map(e => e.message).join('; ');
            throw new Error(`GraphQL error: ${msg}`);
        }

        cache.set(key, { data: json, fetchedAt: Date.now() });
        return json;
    } catch (graphqlErr) {
        console.warn('GraphQL API failed, trying JSON API fallback:', graphqlErr.message);
    }

    // --- 2. Fallback: JSON API ---
    const dataset = getJsonDatasetFromQuery(query);
    if (!dataset) {
        throw new Error('No JSON fallback available for this query.');
    }

    const url = `${JSON_API_BASE}/${dataset}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`JSON API returned ${res.status} for ${dataset}`);
    }

    const raw = await res.json();

    // json.tarkov.dev wraps its payload as { data: { dataset: ... } }
    // in most cases, but some endpoints return the dataset directly.
    let payload = raw;
    if (raw && raw.data && raw.data[dataset]) {
        payload = raw.data[dataset];
    } else if (raw && raw[dataset]) {
        payload = raw[dataset];
    }

    const list = normalizeToArray(payload);
    const wrapped = { data: { [dataset]: list } };

    cache.set(key, { data: wrapped, fetchedAt: Date.now() });
    return wrapped;
}