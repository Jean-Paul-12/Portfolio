const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('scroll-top--visible', window.scrollY > 500);
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
