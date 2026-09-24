// resources/topics/games/eftdb/lifecycle.js
// onRender / onUnrender wiring for the EFT Database topic.
//
// The nine controllers under ./controllers/ self-bootstrap: each waits
// for its container to exist, sets a loading state, fetches from
// tarkov.dev, and renders. They re-run every 500 ms via their own
// intervals, so they survive the topic being closed and reopened.
//
// That means lifecycle.js has almost nothing to do. It exists as a
// hook for future work (focusing the search input, warming the cache
// on open) and to satisfy the contract that topic_eftdb.js expects.

export function createLifecycle() {
    return {
        onRender: function (rootEl) {
            // Controllers are already running their own init loops.
            // Focus the search input so the user can type immediately.
            const input = rootEl.querySelector('#eftSearchInput');
            if (input) {
                requestAnimationFrame(() => input.focus());
            }
        },

        onUnrender: function () {
            // The module-scoped API cache in services/tarkov-api.js
            // deliberately survives onUnrender, so re-opening the topic
            // renders instantly from cache instead of re-fetching.
        }
    };
}