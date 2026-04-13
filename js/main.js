/* ============================================================
   Chiesa ADI Palermo Noce — Main JavaScript
   ============================================================ */

/* ── GSAP ScrollTrigger setup ── */
document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* Mobile nav toggle */
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    /* Close on link click */
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* Mark active nav link */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* GSAP animations */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* Animate .fade-up elements */
    gsap.utils.toArray('.fade-up').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: .7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    /* Animate .fade-in elements */
    gsap.utils.toArray('.fade-in').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: .8,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    /* Stagger card grids */
    document.querySelectorAll('.activities-grid, .video-grid, .blog-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.activity-card, .video-card, .blog-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: .6,
          stagger: .1,
          ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 88%', once: true }
        }
      );
    });

    /* Hero content entrance */
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.fromTo(heroContent,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: .2 }
      );
    }
  }

  /* Form mailto submit */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = contactForm.querySelector('[name="name"]').value;
      const email   = contactForm.querySelector('[name="email"]').value;
      const message = contactForm.querySelector('[name="message"]').value;
      const subject = encodeURIComponent('Messaggio dal sito — ' + name);
      const body    = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:info@adipalermo.it?subject=${subject}&body=${body}`;
    });
  }
});
