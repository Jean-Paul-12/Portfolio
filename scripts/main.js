const toggle = document.querySelector('.header__toggle');
const menu = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.header__menu a');
const scrollTopBtn = document.querySelector('.scroll-top');

toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('header__menu--open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('header__menu--open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
    scrollTopBtn.classList.toggle('scroll-top--visible', window.scrollY > 500);

    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 700,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic',
    });
}
