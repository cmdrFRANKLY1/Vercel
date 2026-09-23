/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './site_mainpage.html',   
        './resources/topics/**/*.js',
        './resources/topics/**/*.json'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'Consolas', 'monospace']
            }
        }
    },
    plugins: []
};
