// resources/topics/dataprotection/services/jszip-loader.js
// Lazy-loaded JSZip, once per page load.

let jszipPromise = null;

export function loadJSZip() {
    if (window.JSZip) return Promise.resolve(window.JSZip);
    if (jszipPromise) return jszipPromise;

    jszipPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        s.onload = () => resolve(window.JSZip);
        s.onerror = () => { jszipPromise = null; reject(new Error('Failed to load JSZip')); };
        document.head.appendChild(s);
    });
    return jszipPromise;
}