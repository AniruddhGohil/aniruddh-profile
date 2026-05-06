/* ============================================================
   analytics.js — Analytics Portfolio pages JavaScript
   Handles: navbar scroll, scroll reveal, quiz table render,
            portfolio dropdown (analytics.html parent only)
   Used by: analytics.html, analytics-*.html
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
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── Portfolio dropdown — hover triggered ── */
  var portfolioToggle = document.getElementById('portfolioToggle');
  var portfolioMenu = document.getElementById('portfolioMenu');
  var portfolioWrap = portfolioToggle ? portfolioToggle.closest('.nav-dropdown') : null;

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

  /* ── Quiz events table renderer (analytics-higeia.html only) ── */
  var quizContainer = document.getElementById('quiz-events');
  if (quizContainer) {
    var quizEvents = [
      { num: 1,  event: 'startwelcome',  btn: 'Next',      page: '/start_welcome' },
      { num: 2,  event: '5_percent',     btn: 'Next',      page: '/start_welcome' },
      { num: 3,  event: '6_percent',     btn: 'Next',      page: '/start_welcome' },
      { num: 4,  event: '7_percent',     btn: 'Next',      page: '/start_welcome' },
      { num: 5,  event: '8_percent',     btn: 'Next',      page: '/start_welcome' },
      { num: 6,  event: '9_percent',     btn: 'Next',      page: '/start_welcome' },
      { num: 7,  event: '10_percent',    btn: 'Next',      page: '/start_welcome' },
      { num: 8,  event: '12_percent',    btn: 'Next',      page: '/start_welcome' },
      { num: 9,  event: 'startwelcome3', btn: "Let's go!", page: '/start_welcome' },
      { num: 10, event: '15_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 11, event: '20_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 12, event: '25_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 13, event: '27_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 14, event: '30_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 15, event: '35_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 16, event: '45_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 17, event: '55_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 18, event: '57_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 19, event: '59_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 20, event: '60_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 21, event: '65_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 22, event: '73_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 23, event: '75_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 24, event: '80_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 25, event: '85_percent',    btn: 'Next',      page: '/startwelcome3' },
      { num: 26, event: '99_percent',    btn: 'Next',      page: '/startwelcome3' }
    ];

    var fragment = document.createDocumentFragment();
    quizEvents.forEach(function (ev) {
      var row = document.createElement('div');
      row.className = 'table-row';
      row.innerHTML =
        '<span class="table-row__num">' + String(ev.num).padStart(2, '0') + '</span>' +
        '<span class="table-row__event">' + ev.event + '</span>' +
        '<span class="table-row__btn">' + ev.btn + '</span>' +
        '<span class="table-row__page">' + ev.page + '</span>';
      fragment.appendChild(row);
    });
    quizContainer.appendChild(fragment);
  }

}());
