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

  /* ── Portfolio dropdown — hover triggered ── */
  var portfolioToggle = document.getElementById('portfolioToggle');
  var portfolioMenu = document.getElementById('portfolioMenu');
  var portfolioWrap = portfolioToggle ? portfolioToggle.closest('.nav-dropdown-wrap') : null;

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
      }, 180);
    });

    portfolioMenu.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
    });

    portfolioMenu.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        portfolioMenu.classList.remove('open');
        portfolioToggle.classList.remove('open');
      }, 180);
    });

    /* Keep click working for keyboard/touch users */
    portfolioToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = portfolioMenu.classList.toggle('open');
      portfolioToggle.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', function (e) {
      if (!portfolioWrap.contains(e.target)) {
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

}());
