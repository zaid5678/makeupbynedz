/* ============================================================
   MAKE UP BY NEDZ — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Nav scroll behaviour ─────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const heroPresent = document.querySelector('.hero');
    function updateNav() {
      const scrolled = window.scrollY > 60;
      nav.classList.toggle('scrolled', scrolled);
      // On light-bg pages (no hero), always show light nav
      if (!heroPresent) {
        nav.classList.add('on-light');
      } else {
        nav.classList.toggle('on-light', scrolled);
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile hamburger ─────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay   = document.querySelector('.nav-overlay');
  if (hamburger && overlay) {
    function toggleMenu(open) {
      hamburger.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    hamburger.addEventListener('click', () => toggleMenu(!overlay.classList.contains('open')));
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
  }

  /* ── Active nav link ──────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll-triggered fade-in ─────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up, .fade-in').forEach((el, i) => {
    observer.observe(el);
  });

})();
