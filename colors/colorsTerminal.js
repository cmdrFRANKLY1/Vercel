// terminalColors.js
// A collection of terminal color schemes categorized by dark/light themes

window.ColorAPI = window.ColorAPI || {};

// Register all color schemes
(function() {
    // Helper function to register themes
    function registerTheme(name, colors) {
        if (window.ColorAPI.registerTheme) {
            window.ColorAPI.registerTheme(name, colors);
        }
    }

    // Helper function to register fonts
    function registerFont(fontValue) {
        if (window.ColorAPI.registerFont) {
            window.ColorAPI.registerFont(fontValue);
        }
    }

    // ============================================
    // DARK THEMES
    // ============================================

    // 1. Classic Dark
    registerTheme('classicdark', {
        bg: '#1e1e1e',
        text: '#d4d4d4',
        user: '#569cd6',
        path: '#6a9955',
        hint: '#858585',
        modalBg: '#252526',
        modalBorder: '#3c3c3c',
        name: 'Classic Dark'
    });

    // 2. Dracula
    registerTheme('dracula', {
        bg: '#282a36',
        text: '#f8f8f2',
        user: '#bd93f9',
        path: '#50fa7b',
        hint: '#6272a4',
        modalBg: '#44475a',
        modalBorder: '#6272a4',
        name: 'Dracula'
    });

    // 3. One Dark Pro
    registerTheme('onedarkpro', {
        bg: '#282c34',
        text: '#abb2bf',
        user: '#61afef',
        path: '#98c379',
        hint: '#5c6370',
        modalBg: '#21252b',
        modalBorder: '#3e4451',
        name: 'One Dark Pro'
    });

    // 4. Solarized Dark
    registerTheme('solarizeddark', {
        bg: '#002b36',
        text: '#839496',
        user: '#268bd2',
        path: '#859900',
        hint: '#586e75',
        modalBg: '#073642',
        modalBorder: '#586e75',
        name: 'Solarized Dark'
    });

    // 5. Nord
    registerTheme('nord', {
        bg: '#2e3440',
        text: '#d8dee9',
        user: '#88c0d0',
        path: '#a3be8c',
        hint: '#4c566a',
        modalBg: '#3b4252',
        modalBorder: '#4c566a',
        name: 'Nord'
    });

    // 6. Monokai
    registerTheme('monokai', {
        bg: '#272822',
        text: '#f8f8f2',
        user: '#66d9ef',
        path: '#a6e22e',
        hint: '#75715e',
        modalBg: '#3e3d32',
        modalBorder: '#75715e',
        name: 'Monokai'
    });

    // 7. Tokyo Night
    registerTheme('tokyonight', {
        bg: '#1a1b26',
        text: '#c0caf5',
        user: '#7aa2f7',
        path: '#9ece6a',
        hint: '#565f89',
        modalBg: '#24283b',
        modalBorder: '#3b4261',
        name: 'Tokyo Night'
    });

    // 8. Catppuccin Mocha
    registerTheme('catppuccinmocha', {
        bg: '#1e1e2e',
        text: '#cdd6f4',
        user: '#89b4fa',
        path: '#a6e3a1',
        hint: '#6c7086',
        modalBg: '#313244',
        modalBorder: '#45475a',
        name: 'Catppuccin Mocha'
    });

    // 9. Gruvbox Dark
    registerTheme('gruvboxdark', {
        bg: '#282828',
        text: '#ebdbb2',
        user: '#458588',
        path: '#98971a',
        hint: '#928374',
        modalBg: '#3c3836',
        modalBorder: '#504945',
        name: 'Gruvbox Dark'
    });

    // 10. Deep Ocean
    registerTheme('deepocean', {
        bg: '#0b1021',
        text: '#c8d6e5',
        user: '#48dbfb',
        path: '#1dd1a1',
        hint: '#576574',
        modalBg: '#0a0f1f',
        modalBorder: '#1e2a4a',
        name: 'Deep Ocean'
    });

    // 11. Matrix
    registerTheme('matrix', {
        bg: '#0d0d0d',
        text: '#00ff41',
        user: '#00cc33',
        path: '#00ff66',
        hint: '#003300',
        modalBg: '#0a0a0a',
        modalBorder: '#00ff41',
        name: 'Matrix'
    });

    // 12. Synthwave
    registerTheme('synthwave', {
        bg: '#1a1a2e',
        text: '#f5f5f5',
        user: '#ff6ec7',
        path: '#72f1b8',
        hint: '#a3a3c2',
        modalBg: '#16213e',
        modalBorder: '#ff6ec7',
        name: 'Synthwave'
    });

    // 13. Midnight
    registerTheme('midnight', {
        bg: '#0c0c0c',
        text: '#e0e0e0',
        user: '#8ab4f8',
        path: '#7cb342',
        hint: '#5f6368',
        modalBg: '#1a1a1a',
        modalBorder: '#333333',
        name: 'Midnight'
    });

    // 14. Cyberpunk
    registerTheme('cyberpunk', {
        bg: '#0f0a1a',
        text: '#00fff9',
        user: '#ff00ff',
        path: '#00ff00',
        hint: '#6600ff',
        modalBg: '#1a0a2e',
        modalBorder: '#ff00ff',
        name: 'Cyberpunk'
    });

    // 15. Octane
    registerTheme('octane', {
        bg: '#121212',
        text: '#ffffff',
        user: '#ff6b35',
        path: '#f7c948',
        hint: '#7a7a7a',
        modalBg: '#1e1e1e',
        modalBorder: '#ff6b35',
        name: 'Octane'
    });

    // 16. Space Gray
    registerTheme('spacegray', {
        bg: '#1e1e24',
        text: '#e6e6e6',
        user: '#5f9ea0',
        path: '#8fbc8f',
        hint: '#7f8c8d',
        modalBg: '#2c2c34',
        modalBorder: '#4a4a5a',
        name: 'Space Gray'
    });

    // 17. VSCode Dark+
    registerTheme('vscodedark', {
        bg: '#1e1e1e',
        text: '#d4d4d4',
        user: '#4fc1ff',
        path: '#b5cea8',
        hint: '#808080',
        modalBg: '#252526',
        modalBorder: '#3c3c3c',
        name: 'VSCode Dark+'
    });

    // 18. GitHub Dark
    registerTheme('githubdark', {
        bg: '#0d1117',
        text: '#c9d1d9',
        user: '#58a6ff',
        path: '#3fb950',
        hint: '#8b949e',
        modalBg: '#161b22',
        modalBorder: '#30363d',
        name: 'GitHub Dark'
    });

    // 19. Cobalt
    registerTheme('cobalt', {
        bg: '#002240',
        text: '#e1efff',
        user: '#ff9d00',
        path: '#3ad900',
        hint: '#4b6b8a',
        modalBg: '#00315e',
        modalBorder: '#ff9d00',
        name: 'Cobalt'
    });

    // 20. Moonlight
    registerTheme('moonlight', {
        bg: '#1f2032',
        text: '#e1e1e1',
        user: '#b2a1ff',
        path: '#7ad0b0',
        hint: '#6b6b7b',
        modalBg: '#292a3e',
        modalBorder: '#4a4b66',
        name: 'Moonlight'
    });

    // ============================================
    // LIGHT THEMES
    // ============================================

    // 1. Classic Light
    registerTheme('classiclight', {
        bg: '#ffffff',
        text: '#333333',
        user: '#0066cc',
        path: '#2e7d32',
        hint: '#888888',
        modalBg: '#f5f5f5',
        modalBorder: '#cccccc',
        name: 'Classic Light'
    });

    // 2. Solarized Light
    registerTheme('solarizedlight', {
        bg: '#fdf6e3',
        text: '#657b83',
        user: '#268bd2',
        path: '#859900',
        hint: '#93a1a1',
        modalBg: '#eee8d5',
        modalBorder: '#93a1a1',
        name: 'Solarized Light'
    });

    // 3. GitHub Light
    registerTheme('githublight', {
        bg: '#ffffff',
        text: '#24292f',
        user: '#0969da',
        path: '#1a7f37',
        hint: '#57606a',
        modalBg: '#f6f8fa',
        modalBorder: '#d0d7de',
        name: 'GitHub Light'
    });

    // 4. Catppuccin Latte
    registerTheme('catppuccinlatte', {
        bg: '#eff1f5',
        text: '#4c4f69',
        user: '#1e66f5',
        path: '#40a02b',
        hint: '#9ca0b0',
        modalBg: '#e6e9ef',
        modalBorder: '#ccd0da',
        name: 'Catppuccin Latte'
    });

    // 5. One Light
    registerTheme('onelight', {
        bg: '#fafafa',
        text: '#383a42',
        user: '#4078f2',
        path: '#50a14f',
        hint: '#a0a1a7',
        modalBg: '#f0f0f0',
        modalBorder: '#d0d0d0',
        name: 'One Light'
    });

    // 6. Gruvbox Light
    registerTheme('gruvboxlight', {
        bg: '#fbf1c7',
        text: '#3c3836',
        user: '#458588',
        path: '#98971a',
        hint: '#928374',
        modalBg: '#f2e5bc',
        modalBorder: '#d5c4a1',
        name: 'Gruvbox Light'
    });

    // 7. Nord Light
    registerTheme('nordlight', {
        bg: '#e5e9f0',
        text: '#2e3440',
        user: '#5e81ac',
        path: '#8fbcbb',
        hint: '#8b9bb5',
        modalBg: '#d8dee9',
        modalBorder: '#b0bccb',
        name: 'Nord Light'
    });

    // 8. Paper
    registerTheme('paper', {
        bg: '#f5f5f0',
        text: '#333333',
        user: '#005f87',
        path: '#4e9a06',
        hint: '#8a8a8a',
        modalBg: '#e8e8e0',
        modalBorder: '#b0b0a8',
        name: 'Paper'
    });

    // 9. Whiteboard
    registerTheme('whiteboard', {
        bg: '#fcfcfc',
        text: '#2c2c2c',
        user: '#0066cc',
        path: '#2e7d32',
        hint: '#999999',
        modalBg: '#f0f0f0',
        modalBorder: '#dddddd',
        name: 'Whiteboard'
    });

    // 10. Rose Pine Dawn
    registerTheme('rosepinedawn', {
        bg: '#faf4ed',
        text: '#575279',
        user: '#286983',
        path: '#907aa9',
        hint: '#9893a5',
        modalBg: '#f2e9e1',
        modalBorder: '#d8d0c8',
        name: 'Rose Pine Dawn'
    });

    // 11. Everforest Light
    registerTheme('everforestlight', {
        bg: '#f3f0e6',
        text: '#5c6a72',
        user: '#7fbbb3',
        path: '#83c092',
        hint: '#9da9a0',
        modalBg: '#e8e5d9',
        modalBorder: '#c6c5b9',
        name: 'Everforest Light'
    });

    // 12. Tokyo Night Light
    registerTheme('tokyonightlight', {
        bg: '#d5d6e0',
        text: '#343b58',
        user: '#34548a',
        path: '#33635c',
        hint: '#9699a8',
        modalBg: '#c0c1cc',
        modalBorder: '#a8a9b5',
        name: 'Tokyo Night Light'
    });

    // 13. Minimal
    registerTheme('minimal', {
        bg: '#f8f8f8',
        text: '#222222',
        user: '#0077cc',
        path: '#008844',
        hint: '#aaaaaa',
        modalBg: '#eeeeee',
        modalBorder: '#cccccc',
        name: 'Minimal'
    });

    // 14. VSCode Light+
    registerTheme('vscodelight', {
        bg: '#ffffff',
        text: '#333333',
        user: '#007acc',
        path: '#008000',
        hint: '#6a6a6a',
        modalBg: '#f3f3f3',
        modalBorder: '#d4d4d4',
        name: 'VSCode Light+'
    });

    // 15. Squirrel
    registerTheme('squirrel', {
        bg: '#f4ede8',
        text: '#3a3a3a',
        user: '#cc6633',
        path: '#669933',
        hint: '#9b8a7a',
        modalBg: '#e8dfd8',
        modalBorder: '#c5b8aa',
        name: 'Squirrel'
    });

    // 16. Warm Light
    registerTheme('warmlight', {
        bg: '#fcf6ec',
        text: '#4a3f35',
        user: '#b85a3a',
        path: '#5a8a4a',
        hint: '#a89880',
        modalBg: '#f5ede0',
        modalBorder: '#d5c8b8',
        name: 'Warm Light'
    });

    // 17. Cool Light
    registerTheme('coollight', {
        bg: '#f0f4f8',
        text: '#2c3e50',
        user: '#3498db',
        path: '#27ae60',
        hint: '#95a5a6',
        modalBg: '#e8edf2',
        modalBorder: '#bdc3c7',
        name: 'Cool Light'
    });

    // 18. Google Light
    registerTheme('googlelight', {
        bg: '#ffffff',
        text: '#202124',
        user: '#1a73e8',
        path: '#0d652d',
        hint: '#5f6368',
        modalBg: '#f1f3f4',
        modalBorder: '#dadce0',
        name: 'Google Light'
    });

    // 19. Ivory
    registerTheme('ivory', {
        bg: '#fffff0',
        text: '#3a3a3a',
        user: '#8b4513',
        path: '#6b8e23',
        hint: '#a9a9a9',
        modalBg: '#f5f5e8',
        modalBorder: '#d4c8b0',
        name: 'Ivory'
    });

    // 20. Breeze Light
    registerTheme('breezelight', {
        bg: '#eff0f1',
        text: '#31363b',
        user: '#2980b9',
        path: '#27ae60',
        hint: '#7f8c8d',
        modalBg: '#e2e4e6',
        modalBorder: '#bdc3c7',
        name: 'Breeze Light'
    });

    // ============================================
    // FONTS
    // ============================================

    // --- Monospace / Coding fonts ---
    registerFont("'Courier New', Courier, monospace");
    registerFont("Consolas, monospace");
    registerFont("'Lucida Console', monospace");
    registerFont("'Fira Code', monospace");
    registerFont("'Cascadia Code', monospace");
    registerFont("'Cascadia Mono', monospace");
    registerFont("'JetBrains Mono', monospace");
    registerFont("'Source Code Pro', monospace");
    registerFont("'Ubuntu Mono', monospace");
    registerFont("'Roboto Mono', monospace");
    registerFont("'IBM Plex Mono', monospace");
    registerFont("'Space Mono', monospace");
    registerFont("'Inconsolata', monospace");
    registerFont("'Anonymous Pro', monospace");
    registerFont("'Hack', monospace");
    registerFont("'Monaco', monospace");
    registerFont("'Menlo', monospace");
    registerFont("'DejaVu Sans Mono', monospace");
    registerFont("'Droid Sans Mono', monospace");
    registerFont("'PT Mono', monospace");
    registerFont("'Overpass Mono', monospace");
    registerFont("'Noto Sans Mono', monospace");
    registerFont("'Red Hat Mono', monospace");
    registerFont("'Victor Mono', monospace");
    registerFont("'Fira Mono', monospace");
    registerFont("'Input Mono', monospace");
    registerFont("'Operator Mono', monospace");
    registerFont("'Terminus', monospace");
    registerFont("'Courier Prime', monospace");
    registerFont("monospace");

    // --- Sans-serif fonts ---
    registerFont("Arial, sans-serif");
    registerFont("Verdana, sans-serif");
    registerFont("Tahoma, sans-serif");
    registerFont("'Trebuchet MS', sans-serif");
    registerFont("Helvetica, sans-serif");
    registerFont("'Segoe UI', sans-serif");
    registerFont("Calibri, sans-serif");
    registerFont("'Century Gothic', sans-serif");
    registerFont("Roboto, sans-serif");
    registerFont("'Open Sans', sans-serif");
    registerFont("Lato, sans-serif");
    registerFont("Montserrat, sans-serif");
    registerFont("'Noto Sans', sans-serif");
    registerFont("Poppins, sans-serif");
    registerFont("Inter, sans-serif");
    registerFont("'Source Sans Pro', sans-serif");
    registerFont("Ubuntu, sans-serif");
    registerFont("Raleway, sans-serif");
    registerFont("'Work Sans', sans-serif");
    registerFont("Nunito, sans-serif");

    // --- Serif fonts ---
    registerFont("'Times New Roman', serif");
    registerFont("Georgia, serif");
    registerFont("Garamond, serif");
    registerFont("'Palatino Linotype', serif");
    registerFont("Cambria, serif");
    registerFont("'Book Antiqua', serif");
    registerFont("'Playfair Display', serif");
    registerFont("Merriweather, serif");
    registerFont("Lora, serif");
    registerFont("'PT Serif', serif");

    // --- Display / decorative fonts ---
    registerFont("'Comic Sans MS', cursive");
    registerFont("Impact, sans-serif");
    registerFont("'Brush Script MT', cursive");
    registerFont("Papyrus, fantasy");
    registerFont("'Press Start 2P', monospace");
    registerFont("'Bungee', cursive");
    registerFont("'Orbitron', sans-serif");
    registerFont("'Permanent Marker', cursive");
    registerFont("'VT323', monospace");
    registerFont("'Silkscreen', monospace");
})();

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.ColorAPI;
}