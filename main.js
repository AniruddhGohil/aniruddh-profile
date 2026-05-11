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
    }, { threshold: 0.05 });
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


  /* ── Helper: wire up a desktop hover dropdown ── */
  function initDesktopDropdown(toggleId, menuId) {
    var toggle = document.getElementById(toggleId);
    var menu   = document.getElementById(menuId);
    var wrap   = toggle ? toggle.closest('.nav-dropdown-wrap') : null;
    if (!wrap || !menu) return;
    var timer;
    wrap.addEventListener('mouseenter', function () {
      clearTimeout(timer);
      menu.classList.add('open'); toggle.classList.add('open');
    });
    wrap.addEventListener('mouseleave', function () {
      timer = setTimeout(function () {
        menu.classList.remove('open'); toggle.classList.remove('open');
      }, 150);
    });
    menu.addEventListener('mouseenter', function () { clearTimeout(timer); });
    menu.addEventListener('mouseleave', function () {
      timer = setTimeout(function () {
        menu.classList.remove('open'); toggle.classList.remove('open');
      }, 150);
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        menu.classList.remove('open'); toggle.classList.remove('open');
      }
    });
  }

  /* ── Desktop dropdowns ── */
  initDesktopDropdown('portfolioToggle', 'portfolioMenu');
  initDesktopDropdown('servicesToggle',  'servicesMenu');

  /* ── Mobile drawer ── */
  var hamburger  = document.getElementById('navHamburger');
  var drawer     = document.getElementById('navDrawer');
  var overlay    = document.getElementById('navOverlay');
  var navClose   = document.getElementById('navClose');
  var mobilePortfolioToggle = document.getElementById('mobilePortfolioToggle');
  var mobilePortfolioSub    = document.getElementById('mobilePortfolioSub');
  var mobileServicesToggle  = document.getElementById('mobileServicesToggle');
  var mobileServicesSub     = document.getElementById('mobileServicesSub');

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

  /* Mobile services sub-menu toggle */
  if (mobileServicesToggle && mobileServicesSub) {
    mobileServicesToggle.addEventListener('click', function () {
      mobileServicesSub.classList.toggle('open');
    });
  }

  /* Close drawer when a link inside it is clicked */
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

}());
