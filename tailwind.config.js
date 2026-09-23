module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./resources/**/*.js",
    "./resources/**/*.json"
  ],
  safelist: [
    "grid-cols-2",
    "sm:grid-cols-4"
  ],
  theme: { extend: {} },
  plugins: []
};