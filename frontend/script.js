/* ════════════════════════════════════════════
   IDEAS STUDIO NEXT — script.js
   Global / Landing Page Scripts Only
   Login logic has been moved to auth/login.js
════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. NAVBAR — sticky scroll style
  ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ─────────────────────────────────────────
     2. MOBILE MENU TOGGLE
  ───────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));

      const spans = navToggle.querySelectorAll('span');

      if (spans.length === 3) {
        const [s1, s2, s3] = spans;

        if (isOpen) {
          s1.style.transform = 'translateY(7px) rotate(45deg)';
          s2.style.opacity = '0';
          s3.style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
          s1.style.transform = '';
          s2.style.opacity = '';
          s3.style.transform = '';
        }
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar || !navbar.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }


  /* ─────────────────────────────────────────
     3. DS CARD TAB SWITCHING
  ───────────────────────────────────────── */
  document.querySelectorAll('.ds-tab').forEach(tab => {
    tab.addEventListener('click', () => {

      document.querySelectorAll('.ds-tab')
        .forEach(t => t.classList.remove('active'));

      document.querySelectorAll('.ds-panel')
        .forEach(p => p.classList.remove('active'));

      tab.classList.add('active');

      const panel = document.getElementById(`tab-${tab.dataset.tab}`);

      if (panel) panel.classList.add('active');
    });
  });


  /* ─────────────────────────────────────────
     4. STAT COUNTER ANIMATION
  ───────────────────────────────────────── */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersTriggered = false;

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';

    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);

      el.textContent =
        Math.round(easeOutQuart(progress) * target) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };

    requestAnimationFrame(tick);
  };

  const statsSection = document.getElementById('stats');

  if (statsSection) {
    new IntersectionObserver((entries, obs) => {

      if (entries[0].isIntersecting && !countersTriggered) {

        countersTriggered = true;

        statNumbers.forEach(el => animateCounter(el));

        obs.disconnect();
      }

    }, { threshold: 0.3 }).observe(statsSection);
  }


  /* ─────────────────────────────────────────
     5. FADE-IN SCROLL ANIMATIONS
  ───────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObs = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const el = entry.target;

      const siblings = el.parentElement
        ? [...el.parentElement.querySelectorAll('.fade-in')]
        : [];

      const delay = siblings.indexOf(el) * 80;

      setTimeout(() => el.classList.add('visible'), delay);

      fadeObs.unobserve(el);
    });

  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  fadeEls.forEach(el => fadeObs.observe(el));


  /* ─────────────────────────────────────────
     6. SMOOTH SCROLL
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', (e) => {

      const href = anchor.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {

        e.preventDefault();

        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }

    });

  });


  /* ─────────────────────────────────────────
     7. HERO TEXT FADE-IN
  ───────────────────────────────────────── */
  document.querySelectorAll('.hero .fade-in')
    .forEach((el, i) => {

      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + i * 200);

    });


  /* ─────────────────────────────────────────
     8. BUTTON RIPPLE EFFECT
  ───────────────────────────────────────── */
  const injectStyle = (id, css) => {

    if (!document.getElementById(id)) {

      const s = document.createElement('style');
      s.id = id;
      s.textContent = css;

      document.head.appendChild(s);
    }
  };

  injectStyle('ripple-style', `
    @keyframes rippleAnim {
      to { transform: scale(1); opacity: 0; }
    }
  `);

  document.querySelectorAll('.btn-primary, .btn-outline')
    .forEach(btn => {

      btn.addEventListener('click', function(e) {

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height) * 2;

        const ripple = document.createElement('span');

        ripple.classList.add('ripple');

        Object.assign(ripple.style, {

          position: 'absolute',
          width: size + 'px',
          height: size + 'px',

          left: (e.clientX - rect.left - size / 2) + 'px',
          top: (e.clientY - rect.top - size / 2) + 'px',

          background: 'rgba(255,255,255,0.25)',
          borderRadius: '50%',

          transform: 'scale(0)',
          animation: 'rippleAnim 0.5s linear',
          pointerEvents: 'none'

        });

        if (getComputedStyle(this).position === 'static')
          this.style.position = 'relative';

        this.style.overflow = 'hidden';

        this.appendChild(ripple);

        ripple.addEventListener('animationend', () => ripple.remove());

      });

    });

});