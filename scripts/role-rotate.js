(function () {
    const el = document.getElementById('role-rotate');
    if (!el) return;

    const roles = [
        'Python Backend Developer',
        'IA Engineer',
        'Automatización con LLMs',
        'APIs · Docker · Cloud',
    ];
    let i = 0;

    setInterval(() => {
        i = (i + 1) % roles.length;
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = roles[i];
            el.style.opacity = '1';
        }, 280);
    }, 3200);
})();
