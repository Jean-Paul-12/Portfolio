(function () {
    const typedEl = document.getElementById('console-typed');
    const logEl = document.getElementById('console-log');
    if (!typedEl || !logEl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const script = [
        'init agent_orchestrator --env production',
        'connect openai.api · model=gpt-4o-mini',
        'spawn workflow · n8n.trigger("ticket_triage")',
        'inject context · rag.retrieve(docs)',
        'route response · django.rest/webhook',
        'deploy agent · vercel + render pipeline',
        'monitor traces · latency < 800ms',
        'scale llm pipeline · queue=healthy',
    ];

    const MAX_LOG = 5;
    let lineIndex = 0;
    let charIndex = 0;

    function pushLog(text, status) {
        const li = document.createElement('li');
        li.className = status === 'ok' ? 'log-ok' : 'log-run';
        li.innerHTML =
            status === 'ok'
                ? `<span class="ok">✓</span> ${text}`
                : `<span class="run">›</span> ${text}`;
        logEl.appendChild(li);
        while (logEl.children.length > MAX_LOG) {
            logEl.removeChild(logEl.firstChild);
        }
        logEl.scrollTop = logEl.scrollHeight;
    }

    function typeNextChar() {
        const line = script[lineIndex];
        typedEl.textContent = line.slice(0, charIndex + 1);
        charIndex += 1;

        if (charIndex < line.length) {
            setTimeout(typeNextChar, reducedMotion ? 0 : 28 + Math.random() * 22);
            return;
        }

        setTimeout(() => {
            pushLog(line, lineIndex % 2 === 0 ? 'run' : 'ok');
            typedEl.textContent = '';
            charIndex = 0;
            lineIndex = (lineIndex + 1) % script.length;
            setTimeout(typeNextChar, reducedMotion ? 200 : 650);
        }, reducedMotion ? 100 : 420);
    }

    if (reducedMotion) {
        script.slice(0, 4).forEach((line, i) => pushLog(line, i % 2 ? 'ok' : 'run'));
        typedEl.textContent = script[4];
    } else {
        typeNextChar();
    }
})();
