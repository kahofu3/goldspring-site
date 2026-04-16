/* app.js — Gold Spring Group */
(function() {
  'use strict';

  // ===== HEADER SCROLL BEHAVIOR =====
  var header = document.getElementById('site-header');
  var lastScroll = 0;

  function onScroll() {
    var currentScroll = window.scrollY;
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== ACTIVE NAV LINK =====
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    // Only do scroll-based active nav on index page (pages with hash-based nav)
    var hasHashNav = false;
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        hasHashNav = true;
      }
    });
    if (!hasHashNav) return;

    var scrollPos = window.scrollY + 120;

    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function(link) {
          var href = link.getAttribute('href');
          if (href === '#' + id) {
            link.classList.add('active');
          } else if (href && href.charAt(0) === '#') {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===== MOBILE MENU =====
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    var mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');

    function openMenu() {
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', function() {
      if (mobileNav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
  }

  // ===== SCROLL REVEAL (JS FALLBACK) =====
  var supportsScrollTimeline = CSS.supports && CSS.supports('animation-timeline', 'scroll()');

  if (!supportsScrollTimeline) {
    var fadeElements = document.querySelectorAll('.js-fade');
    var staggerElements = document.querySelectorAll('.stagger');

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(function(el) {
      fadeObserver.observe(el);
    });

    staggerElements.forEach(function(el) {
      fadeObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.js-fade').forEach(function(el) {
      el.classList.add('fade-in');
      el.classList.remove('js-fade');
    });
    document.querySelectorAll('.stagger').forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ===== CONTACT FORM HANDLER =====
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    var btn = e.target.querySelector('.form-submit');
    var originalText = btn.textContent;
    btn.textContent = '已發送 Sent ✓';
    btn.style.background = '#2d6a2e';
    btn.disabled = true;
    setTimeout(function() {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  };

  // ===== SMOOTH SCROLL FOR HASH LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
