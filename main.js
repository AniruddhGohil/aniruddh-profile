/* ============================================================
   main.js — Homepage JavaScript
   Handles: navbar scroll, scroll reveal, tool switcher,
            portfolio dropdown, case studies filter
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll effect ── */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Scroll reveal ── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── Tool preview switcher ── */
  var toolItems = document.querySelectorAll('.tool-item');
  var previewTitle = document.getElementById('previewTitle');
  var previewDesc = document.getElementById('previewDesc');
  var previewPoints = document.getElementById('previewPoints');

  if (toolItems.length && previewTitle) {
    toolItems.forEach(function (item) {
      item.addEventListener('click', function () {
        toolItems.forEach(function (btn) { btn.classList.remove('active'); });
        item.classList.add('active');
        previewTitle.textContent = item.dataset.title;
        previewDesc.textContent = item.dataset.desc;
        previewPoints.innerHTML =
          '<li>' + item.dataset.pointA + '</li>' +
          '<li>' + item.dataset.pointB + '</li>' +
          '<li>' + item.dataset.pointC + '</li>';
      });
    });
  }


  /* ── Desktop portfolio dropdown — hover ── */
  var portfolioToggle = document.getElementById('portfolioToggle');
  var portfolioMenu   = document.getElementById('portfolioMenu');
  var portfolioWrap   = portfolioToggle ? portfolioToggle.closest('.nav-dropdown-wrap') : null;

  if (portfolioWrap && portfolioMenu) {
    var closeTimer;
    portfolioWrap.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
      portfolioMenu.classList.add('open');
      portfolioToggle.classList.add('open');
    });
    portfolioWrap.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        portfolioMenu.classList.remove('open');
        portfolioToggle.classList.remove('open');
      }, 150);
    });
    portfolioMenu.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
    portfolioMenu.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        portfolioMenu.classList.remove('open');
        portfolioToggle.classList.remove('open');
      }, 150);
    });
    document.addEventListener('click', function (e) {
      if (!portfolioWrap.contains(e.target)) {
        portfolioMenu.classList.remove('open');
        portfolioToggle.classList.remove('open');
      }
    });
  }

  /* ── Mobile drawer ── */
  var hamburger  = document.getElementById('navHamburger');
  var drawer     = document.getElementById('navDrawer');
  var overlay    = document.getElementById('navOverlay');
  var navClose   = document.getElementById('navClose');
  var mobilePortfolioToggle = document.getElementById('mobilePortfolioToggle');
  var mobilePortfolioSub    = document.getElementById('mobilePortfolioSub');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) { hamburger.addEventListener('click', function () { drawer.classList.contains('open') ? closeDrawer() : openDrawer(); }); }
  if (overlay)   { overlay.addEventListener('click', closeDrawer); }
  if (navClose)  { navClose.addEventListener('click', closeDrawer); }

  /* Mobile portfolio sub-menu toggle */
  if (mobilePortfolioToggle && mobilePortfolioSub) {
    mobilePortfolioToggle.addEventListener('click', function () {
      mobilePortfolioSub.classList.toggle('open');
    });
  }

  /* Close drawer when a link inside it is clicked */
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

}());
