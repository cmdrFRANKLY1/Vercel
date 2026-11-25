window.addEventListener('message', event => {
    if (event.source !== window.parent || event.data?.type !== 'app-theme') return;

    const isDark = event.data.dark === true;
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
});
