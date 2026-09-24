// resources/topics/games/eftdb/services/tarkov-api.js
// Cached wrapper around tarkov.dev GraphQL with a JSON API fallback.
//
// The GraphQL API (api.tarkov.dev/graphql) is the primary source.
// When it is unavailable (503, CORS failure, network error), we fall
// back to the flat JSON API at json.tarkov.dev/regular/{dataset}.
//
// The JSON API returns the entire dataset at once, so controllers
// that rely on the fallback may need to slice/filter client-side.

const GRAPHQL_ENDPOINT = 'https://api.tarkov.dev/graphql';
const JSON_API_BASE = 'https://json.tarkov.dev/regular';

// Map GraphQL queries to a JSON dataset name.
function getJsonDatasetFromQuery(query) {
    if (query.includes('itemCategories')) return null;         // no JSON equivalent
    if (query.includes('items(')) return 'items';
    if (query.includes('traders')) return 'traders';
    if (query.includes('maps')) return 'maps';
    if (query.includes('tasks')) return 'tasks';
    return null;
}

// Wrap the flat JSON response so callers see the same shape as GraphQL.
function wrapJsonResponse(dataset, data) {
    const key = dataset === 'tasks' ? 'tasks' : dataset;
    return { data: { [key]: data } };
}

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function cacheKey(query, variables) {
    return query + '|' + JSON.stringify(variables || {});
}

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
            throw new Error(`GraphQL error: ${json.errors.map(e => e.message).join('; ')}`);
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

    const data = await res.json();
    const wrapped = wrapJsonResponse(dataset, data);

    cache.set(key, { data: wrapped, fetchedAt: Date.now() });
    return wrapped;
}

export function clearTarkovCache() {
    cache.clear();
}