// Store multiple KDE themes globally
window.kdeThemes = {
    'Breeze Dark': {
        'kde-bg': '#1a1b1e',                    
        'kde-panel': 'rgba(35, 38, 41, 0.85)',   
        'kde-panel-hover': 'rgba(255, 255, 255, 0.1)', 
        'kde-accent': '#3daee9',               
        'kde-text': '#eff0f1',                 
        'kde-window-bg': '#31363b',            
        'kde-window-border': '#1d2023',        
    },
    'Breeze Light': {
        'kde-bg': '#fcfcfc',
        'kde-panel': 'rgba(239, 240, 241, 0.85)',
        'kde-panel-hover': 'rgba(0, 0, 0, 0.05)',
        'kde-accent': '#3daee9',
        'kde-text': '#232629',
        'kde-window-bg': '#eff0f1',
        'kde-window-border': '#bdc3c7',
    },
    'Dracula': {
        'kde-bg': '#282a36',
        'kde-panel': 'rgba(40, 42, 54, 0.85)',
        'kde-panel-hover': 'rgba(255, 255, 255, 0.1)',
        'kde-accent': '#bd93f9',
        'kde-text': '#f8f8f2',
        'kde-window-bg': '#44475a',
        'kde-window-border': '#6272a4',
    },
    'Nord': {
        'kde-bg': '#2e3440',
        'kde-panel': 'rgba(46, 52, 64, 0.85)',
        'kde-panel-hover': 'rgba(255, 255, 255, 0.1)',
        'kde-accent': '#88c0d0',
        'kde-text': '#eceff4',
        'kde-window-bg': '#3b4252',
        'kde-window-border': '#4c566a',
    }
};

// Function to apply a specific theme across the document and its iframes
window.applyKdeTheme = function(themeName, broadcast = true) {
    const theme = window.kdeThemes[themeName] || window.kdeThemes['Breeze Dark'];
    const root = document.documentElement;
    
    // Set dynamic CSS variables for tailwind to pick up
    for (const [key, value] of Object.entries(theme)) {
        root.style.setProperty(`--color-${key}`, value);
    }
    
    // Remember preference
    try {
        localStorage.setItem('kde-theme', themeName);
    } catch (e) {}

    // Broadcast change to active app iframes for instant updates
    if (broadcast) {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                if (iframe.contentWindow && iframe.contentWindow.applyKdeTheme) {
                    iframe.contentWindow.applyKdeTheme(themeName, false);
                }
            } catch(e) {
                // Ignore cross-origin issues
            }
        });
    }
};

// Keep old fallback for any code that hasn't migrated to CSS variables yet
window.kdeThemeColors = window.kdeThemes['Breeze Dark'];

// Immediately apply saved theme on load to prevent flash of unstyled colors
(function() {
    let savedTheme = 'Breeze Dark';
    try {
        savedTheme = localStorage.getItem('kde-theme') || 'Breeze Dark';
    } catch(e) {}
    
    if (document.documentElement) {
        window.applyKdeTheme(savedTheme, false);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            window.applyKdeTheme(savedTheme, false);
        });
    }
})();