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

  /* ── Portfolio dropdown — hover on desktop, click on mobile ── */
  var portfolioToggle = document.getElementById('portfolioToggle');
  var portfolioMenu   = document.getElementById('portfolioMenu');
  var portfolioWrap   = portfolioToggle ? portfolioToggle.closest('.nav-dropdown-wrap') : null;

  if (portfolioWrap && portfolioMenu) {
    var closeTimer;
    var isMobile = function () { return window.innerWidth <= 900; };

    /* Desktop: hover */
    portfolioWrap.addEventListener('mouseenter', function () {
      if (isMobile()) return;
      clearTimeout(closeTimer);
      portfolioMenu.classList.add('open');
      portfolioToggle.classList.add('open');
    });
    portfolioWrap.addEventListener('mouseleave', function () {
      if (isMobile()) return;
      closeTimer = setTimeout(function () {
        portfolioMenu.classList.remove('open');
        portfolioToggle.classList.remove('open');
      }, 180);
    });
    portfolioMenu.addEventListener('mouseenter', function () {
      if (isMobile()) return;
      clearTimeout(closeTimer);
    });
    portfolioMenu.addEventListener('mouseleave', function () {
      if (isMobile()) return;
      closeTimer = setTimeout(function () {
        portfolioMenu.classList.remove('open');
        portfolioToggle.classList.remove('open');
      }, 180);
    });

    /* Both: click toggle */
    portfolioToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = portfolioMenu.classList.toggle('open');
      portfolioToggle.classList.toggle('open', isOpen);
    });

    /* Desktop only: close on outside click */
    document.addEventListener('click', function (e) {
      if (!isMobile() && !portfolioWrap.contains(e.target)) {
        portfolioMenu.classList.remove('open');
        portfolioToggle.classList.remove('open');
      }
    });
  }

  /* ── Case Studies filter ── */
  var filterBtns = document.querySelectorAll('.cs-filter');
  var featuredCard = document.querySelector('.cs-featured');
  var gridCards = document.querySelectorAll('.cs-grid .cs-card');
  var emptyState = document.querySelector('.cs-empty');

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;

        filterBtns.forEach(function (b) {
          b.classList.remove('cs-filter--active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('cs-filter--active');
        btn.setAttribute('aria-selected', 'true');

        if (featuredCard) {
          var ftags = featuredCard.dataset.tags || '';
          featuredCard.style.display = (filter === 'all' || ftags.includes(filter)) ? '' : 'none';
        }

        var visibleCount = 0;
        gridCards.forEach(function (card) {
          var tags = card.dataset.tags || '';
          var match = filter === 'all' || tags.includes(filter);
          card.style.display = match ? '' : 'none';
          if (match) visibleCount++;
        });

        if (emptyState) {
          var featuredVisible = !featuredCard || (featuredCard.dataset.tags || '').includes(filter) || filter === 'all';
          emptyState.hidden = featuredVisible || visibleCount > 0;
        }
      });
    });
  }

  /* ── Hamburger menu ── */
  var hamburger = document.getElementById('navHamburger');
  var navLinks  = document.getElementById('navLinks');
  var overlay   = document.getElementById('navOverlay');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }
  /* Close menu when a nav link is clicked */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

}());
