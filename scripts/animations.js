(function () {
    if (typeof gsap === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero__copy > *', {
        opacity: 0,
        x: -24,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
    });

    gsap.from('.hero__console-stage', {
        opacity: 0,
        x: 32,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.25,
    });

    gsap.utils.toArray('.section-reveal').forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 32,
            duration: 0.65,
            ease: 'power2.out',
        });
    });
})();
