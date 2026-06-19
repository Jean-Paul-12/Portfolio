(function () {
    const canvas = document.getElementById('neural-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const CONFIG = {
        nodeCount: 58,
        maxDistance: 175,
        lineOpacity: 0.14,
        nodeOpacity: 0.35,
        speed: 0.18,
        colors: [
            [56, 189, 248],
            [129, 140, 248],
            [148, 163, 184],
        ],
    };

    let nodes = [];
    let width = 0;
    let height = 0;
    let animationId = null;

    function rgba(rgb, alpha) {
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createNodes() {
        nodes = Array.from({ length: CONFIG.nodeCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * CONFIG.speed,
            vy: (Math.random() - 0.5) * CONFIG.speed,
            radius: Math.random() * 1.2 + 0.8,
            color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
        }));
    }

    function updateNodes() {
        nodes.forEach((node) => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x <= 0 || node.x >= width) node.vx *= -1;
            if (node.y <= 0 || node.y >= height) node.vy *= -1;

            node.x = Math.max(0, Math.min(width, node.x));
            node.y = Math.max(0, Math.min(height, node.y));
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.hypot(dx, dy);

                if (distance < CONFIG.maxDistance) {
                    const alpha = (1 - distance / CONFIG.maxDistance) * CONFIG.lineOpacity;
                    ctx.strokeStyle = rgba(nodes[i].color, alpha);
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        nodes.forEach((node) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = rgba(node.color, CONFIG.nodeOpacity);
            ctx.fill();
        });
    }

    function animate() {
        updateNodes();
        draw();
        animationId = requestAnimationFrame(animate);
    }

    function init() {
        resize();
        createNodes();
        draw();

        if (!reducedMotion) {
            animate();
        }
    }

    window.addEventListener('resize', () => {
        resize();
        createNodes();
        if (reducedMotion) draw();
    });

    init();
})();
