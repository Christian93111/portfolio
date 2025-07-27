/* ========== Navbar ========== */

navbarToggle = document.querySelector('.navbar-toggle');
navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
  navbarToggle.classList.toggle("active");
});

/* ========== Scrolling Function & Auto Close Navbar ========== */

class ScrollToSection {
  constructor() {
    this.navbarMenu = document.querySelector('.navbar-menu');
    this.navbarToggle = document.querySelector('.navbar-toggle');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

/* ========== In case the smooth scroll won't work properly ========== */

        // if (targetElement) {
        //   window.scrollTo({
        //     top: targetElement.offsetTop - 80,
        //     behavior: 'smooth'
        //   });
        // }

/* ==================================================================== */

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }

        if (window.innerWidth <= 800) {
          this.navbarMenu.classList.remove('active');
          this.navbarToggle.classList.remove('active');
        }
      });
    });
  }
}

/* ========== Link Functions if Desktop or Mobile ========== */

function openAppOrWeb (appUrl, webUrl) {
  const mobile = /Android|iPhone|iPad|BlackBerry|IEMobile/i.test(navigator.userAgent);

  if (mobile) {
    window.location.href = appUrl;

    setTimeout(function() {
      window.open(webUrl, '_blank');
    }, 2000);
  }

  else {
    window.open(webUrl, '_blank');
  }
}

document.getElementById('github').addEventListener('click', function(e) {
  e.preventDefault();
  openAppOrWeb('github://user/Christian93111', 'https://github.com/Christian93111')
});

document.getElementById('instagram').addEventListener('click', function(e) {
  e.preventDefault();
  openAppOrWeb('http://192.168.100.31:5500', 'http://192.168.100.31:5500')
  // openAppOrWeb('instagram://user?username=cdr9311', 'https://www.instagram.com/cdr9311')
});

document.getElementById('discord').addEventListener('click', function(e) {
    e.preventDefault();
    openAppOrWeb('discord://users/1167427800916041780', 'https://discord.com/users/1167427800916041780');
});

document.getElementById('facebook').addEventListener('click', function(e) {
    e.preventDefault();
    openAppOrWeb('fb://profile/100019100501787', 'https://www.facebook.com/CDR9311');
});

document.getElementById('tiktok').addEventListener('click', function(e) {
  e.preventDefault();
  openAppOrWeb('tiktok://user/@cdr9311','https://www.tiktok.com/@cdr9311');
});

/* ========== Light Mode Function ========== */

class lightMode {
  constructor() {
    this.body = document.body;
    this.toggle = document.getElementById('light-mode');
    this.navbar = document.querySelector('.navbar');
    this.navbarLogo = document.querySelector('.navbar-logo');
    this.navbarContainer = document.querySelector('.navbar-container');
    this.navbarMenu = document.querySelector('.navbar-menu');
    this.navbarBar = document.querySelectorAll('span.bar');
    this.navbarToggle = document.querySelectorAll('.navbar-toggle');
    this.comment = document.querySelector('.comment');
    this.type = document.querySelectorAll('.type');
    this.description = document.querySelectorAll('.description');
    this.brace = document.querySelectorAll('.braces');
    this.comma = document.querySelectorAll('.comma');
    this.about = document.querySelector('.about-section');
    this.linkTitle = document.querySelector('.link-title');
    this.projectTitle = document.querySelector('.project-title');
    this.contactSection = document.querySelector('.contact-section');
    this.inputFields = document.querySelectorAll('input, textarea');
    this.contactSubmit = document.querySelector('.contact-submit');
    this.textArea = document.querySelector('textarea');

    this.toggle.addEventListener('click', this.toggleLightMode.bind(this));
    this.saveTheme();
  }

  toggleLightMode() {
      this.body.classList.toggle('light-mode');
      this.navbar.classList.toggle('navbar-light');
      this.navbarLogo.classList.toggle('navbar-logo-light');
      this.navbarContainer.classList.toggle('navbar-container-light');
      this.navbarMenu.classList.toggle('navbar-menu-light');

      this.navbarBar.forEach(bars => {
          bars.classList.toggle('bar-light');
      });

      this.comment.classList.toggle('comment-light');

      this.type.forEach(types => {
          types.classList.toggle('type-light');
      });

      this.description.forEach(descriptions => {
          descriptions.classList.toggle('description-light');
      });

      this.brace.forEach(braces => {
          braces.classList.toggle('braces-light');
      });

      this.comma.forEach(commas => {
          commas.classList.toggle('comma-light');
      });

      this.about.classList.toggle('about-section-light');
      this.linkTitle.classList.toggle('link-title-light');
      this.projectTitle.classList.toggle('project-title-light');

      const lightMode = this.body.classList.contains('light-mode');
      if (lightMode) {
        localStorage.setItem('theme', 'light');
      }
      else {
        localStorage.setItem('theme', 'dark');
      }

      this.contactSection.classList.toggle('contact-section-light');
      this.inputFields.forEach(input => {
        input.classList.toggle('input-light');
      });
      this.contactSubmit.classList.toggle('contact-submit-light');
      this.textArea.classList.toggle('textarea-light')
  }

  saveTheme() {
    const saveTheme = localStorage.getItem('theme');

    if (saveTheme === 'light') {
      this.toggle.checked = true;
      this.toggleLightMode();
    }

    else {
      this.toggle.checked = false;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ScrollToSection();
  new lightMode();
});