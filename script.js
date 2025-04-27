/* ========== Navbar ========== */
navbarToggle = document.querySelector('.navbar-toggle');
navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});

/* ========== Smooth Scrolling ========== */
document.querySelectorAll('a [href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function () {
        preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });

        // document.querySelector(this.getAttribute('href')).scrollIntoView({
        //     behavior: 'smooth'
        // });
    });
});