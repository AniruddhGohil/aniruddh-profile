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

  if (mobilePortfolioToggle && mobilePortfolioSub) {
    mobilePortfolioToggle.addEventListener('click', function () {
      mobilePortfolioSub.classList.toggle('open');
    });
  }

  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* ── Estimated reading time ── */
  var readingTimeEl = document.getElementById('readingTime');
  if (readingTimeEl) {
    var rtContent = '';
    document.querySelectorAll('.cs-hero__summary, .challenge-card__desc, .timeline-desc, .result-card__desc, .takeaway__text').forEach(function (el) {
      rtContent += ' ' + (el.innerText || el.textContent || '');
    });
    var rtWords   = rtContent.trim().split(/\s+/).filter(Boolean).length;
    var rtMinutes = Math.max(1, Math.ceil(rtWords / 230));
    readingTimeEl.textContent = rtMinutes + ' min read';
  }

  /* ── Case study prev / next navigation ── */
  var caseStudyNav = document.getElementById('caseStudyNav');
  if (caseStudyNav) {
    var studies = [
      { url: 'case-study-rugsdirect.html',   title: 'Rugs Direct',     label: 'ANZ · +238% Revenue'      },
      { url: 'case-study-rivoli.html',        title: 'Rivoli',          label: 'UAE · +30% Traffic'        },
      { url: 'case-study-clarks.html',        title: 'Clarks UAE',      label: 'UAE · Local SEO'           },
      { url: 'case-study-rasasi.html',        title: 'Rasasi',          label: 'UAE · +20% in 3 Months'   },
      { url: 'case-study-cheapestrugs.html',  title: 'Cheapest Rugs',   label: 'ANZ · Crawl Recovery'      },
      { url: 'case-study-optislim.html',      title: 'Optislim',        label: 'ANZ · AI Clustering'       }
    ];
    var currentFile = window.location.pathname.split('/').pop();
    var idx = -1;
    studies.forEach(function (s, i) { if (s.url === currentFile) { idx = i; } });
    if (idx > -1) {
      var prev = idx > 0 ? studies[idx - 1] : null;
      var next = idx < studies.length - 1 ? studies[idx + 1] : null;
      var navHtml = '';
      if (prev) {
        navHtml += '<a href="' + prev.url + '" class="cs-nav-link cs-nav-link--prev reveal">' +
          '<span class="cs-nav-link__dir">← Previous</span>' +
          '<span class="cs-nav-link__title">' + prev.title + '</span>' +
          '<span class="cs-nav-link__label">' + prev.label + '</span>' +
          '</a>';
      }
      if (next) {
        navHtml += '<a href="' + next.url + '" class="cs-nav-link cs-nav-link--next reveal">' +
          '<span class="cs-nav-link__dir">Next →</span>' +
          '<span class="cs-nav-link__title">' + next.title + '</span>' +
          '<span class="cs-nav-link__label">' + next.label + '</span>' +
          '</a>';
      }
      if (!prev || !next) { caseStudyNav.classList.add('cs-nav-wrap--single'); }
      caseStudyNav.innerHTML = navHtml;
      /* Re-observe new reveal elements */
      if (typeof revealObserver !== 'undefined') {
        caseStudyNav.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
      }
    }
  }

  /* ── Reading progress bar ── */
  var progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0) + '%';
    }, { passive: true });
  }

  /* ── Back to top ── */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Share bar ── */
  var linkedinShare = document.getElementById('linkedinShare');
  var copyLinkBtn   = document.getElementById('copyLinkBtn');
  var nativeShare   = document.getElementById('nativeShare');
  var shareButtons  = document.getElementById('shareButtons');

  if (linkedinShare) {
    linkedinShare.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href);
  }

  /* On mobile where Web Share API is available, show native share + hide LinkedIn button.
     Native share opens the OS share sheet → LinkedIn app is already logged in there. */
  if (nativeShare && navigator.share && shareButtons) {
    shareButtons.classList.add('has-native');
    nativeShare.style.display = 'inline-flex';
    if (linkedinShare) { linkedinShare.style.display = 'none'; }
    nativeShare.addEventListener('click', function () {
      navigator.share({
        title: document.title,
        url: window.location.href
      }).catch(function () { /* dismissed */ });
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function () {
      var span = copyLinkBtn.querySelector('span');
      var url  = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { showCopied(); }).catch(fallbackCopy);
      } else { fallbackCopy(); }
      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = url; ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta); showCopied();
      }
      function showCopied() {
        copyLinkBtn.classList.add('copied'); span.textContent = 'Copied ✓';
        setTimeout(function () { copyLinkBtn.classList.remove('copied'); span.textContent = 'Copy Link'; }, 2200);
      }
    });
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
