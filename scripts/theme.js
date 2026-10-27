(function () {
    const STORAGE_KEY = 'portfolio-theme';
    const themes = ['nexus', 'carbon', 'violet'];
    const buttons = document.querySelectorAll('[data-theme-set]');

    function applyTheme(name) {
        if (!themes.includes(name)) name = 'nexus';
        document.documentElement.setAttribute('data-theme', name);
        localStorage.setItem(STORAGE_KEY, name);
        buttons.forEach((btn) => {
            btn.classList.toggle('is-active', btn.dataset.themeSet === name);
        });
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.themeSet));
    });

    applyTheme(localStorage.getItem(STORAGE_KEY) || 'nexus');
})();
