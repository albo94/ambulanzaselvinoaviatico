/* ============================================================
   Ambulanza Selvino-Aviatico – Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. HAMBURGER MENU TOGGLE
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------------
     2. ACTIVE NAV LINK HIGHLIGHT
  ---------------------------------------------------------- */
  (function highlightActiveLink() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-links a, .footer-nav a');

    allNavLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkFile = href.split('/').pop().split('#')[0];
      const isCurrent =
        linkFile === currentFile ||
        (currentFile === '' && linkFile === 'index.html') ||
        (currentFile === 'index.html' && (href === './' || href === '#' || href === '' || linkFile === 'index.html'));
      if (isCurrent) {
        link.classList.add('active');
      }
    });
  })();

  /* ----------------------------------------------------------
     3. SMOOTH SCROLL for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 0;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     4. STATS COUNTER ANIMATION (IntersectionObserver)
  ---------------------------------------------------------- */
  const statsObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  function animateCounter(el, target, suffix, duration) {
    const start = 0;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix, 1800);
          statsObserver.unobserve(el);
        }
      });
    }, statsObserverOptions);

    statNumbers.forEach(function (el) {
      statsObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------
     5. SCROLL REVEAL ANIMATION (fade-in on scroll)
  ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.service-card, .volunteer-card, .timeline-item, .gallery-item, .dona-box'
  );

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el, index) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease ' + (index % 4) * 0.1 + 's, transform 0.5s ease ' + (index % 4) * 0.1 + 's';
      revealObserver.observe(el);
    });

    // Add CSS for revealed state
    var style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }

  /* ----------------------------------------------------------
     6. CAROUSEL
  ---------------------------------------------------------- */
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    const track    = carousel.querySelector('.carousel-track');
    const slides   = carousel.querySelectorAll('.carousel-slide');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    const prevBtn  = carousel.querySelector('.carousel-prev');
    const nextBtn  = carousel.querySelector('.carousel-next');

    if (!track || slides.length === 0) return;

    let current = 0;
    let timer;

    // Build dots
    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Vai alla foto ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); resetTimer(); });
      dotsWrap.appendChild(dot);
    });

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + current * 100 + '%)';
      carousel.querySelectorAll('.carousel-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 4500);
    }

    prevBtn && prevBtn.addEventListener('click', function () { goTo(current - 1); resetTimer(); });
    nextBtn && nextBtn.addEventListener('click', function () { goTo(current + 1); resetTimer(); });

    // Touch swipe
    var touchX = 0;
    carousel.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
    }, { passive: true });

    // Pause on hover
    carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
    carousel.addEventListener('mouseleave', resetTimer);

    resetTimer();
  });

  /* ----------------------------------------------------------
     7. HEADER SHADOW on scroll
  ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      } else {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
      }
    }, { passive: true });
  }

});
