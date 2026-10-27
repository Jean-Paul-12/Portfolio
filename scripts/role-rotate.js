(function () {
    const el = document.getElementById('role-rotate');
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const roles = [
        'Software Engineer',
        'IA Engineer',
        'Backend · Python',
        'Agentic AI · MCP · RAG',
    ];

    /** Tiempo con la frase completa visible antes de borrar */
    const HOLD_TYPED_MS = 4800;
    /** Pausa mínima con el campo vacío antes de tipear la siguiente */
    const PAUSE_BEFORE_TYPE_MS = 220;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tickDelay() {
        if (reducedMotion) return 0;
        if (deleting) {
            return 10 + Math.random() * 12;
        }
        return 42 + Math.random() * 28;
    }

    function step() {
        const current = roles[roleIndex];

        if (!deleting) {
            charIndex += 1;
            el.textContent = current.slice(0, charIndex);

            if (charIndex >= current.length) {
                setTimeout(() => {
                    deleting = true;
                    step();
                }, reducedMotion ? 120 : HOLD_TYPED_MS);
                return;
            }
        } else {
            charIndex -= 1;
            el.textContent = current.slice(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(step, reducedMotion ? 120 : PAUSE_BEFORE_TYPE_MS);
                return;
            }
        }

        setTimeout(step, tickDelay());
    }

    if (reducedMotion) {
        el.textContent = roles[0];
    } else {
        step();
    }
})();
