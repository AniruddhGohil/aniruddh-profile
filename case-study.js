/* ============================================================
   case-study.js — SEO Case Study pages JavaScript
   Handles: navbar scroll, scroll reveal, filter (parent page)
   Used by: case-study.html, case-study-*.html
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

  /* ── Case Studies filter (parent listing page only) ── */
  var filterBtns = document.querySelectorAll('.cs-filter');
  var featured = document.querySelector('.cs-featured');
  var cards = document.querySelectorAll('.cs-grid .cs-card');

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

        if (featured) {
          var ftags = featured.dataset.tags || '';
          featured.style.display = (filter === 'all' || ftags.includes(filter)) ? '' : 'none';
        }

        cards.forEach(function (card) {
          var tags = card.dataset.tags || '';
          card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
        });
      });
    });
  }

}());
