/* ========== Navbar ========== */

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});


/* ========== Scrolling Function & Auto Close Navbar ========== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }

        if (window.innerWidth <= 800) {
          navbarMenu.classList.remove('active');
          navbarToggle.classList.remove('active');
        }
    });
});

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
  openAppOrWeb('instagram://user?username=cdr9311', 'https://www.instagram.com/cdr9311')
});

document.getElementById('discord').addEventListener('click', function(e) {
    e.preventDefault();
    openAppOrWeb('discord://users/1167427800916041780', 'https://discord.com/users/1167427800916041780');
});

document.getElementById('facebook').addEventListener('click', function(e) {
    e.preventDefault();
    openAppOrWeb('fb://profile/100019100501787', 'https://www.facebook.com/CDR9311');
});
