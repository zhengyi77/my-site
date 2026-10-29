/* ==========================================================================
   ZHENG Yi — personal portfolio
   One script for four pages. Everything below is optional decoration:
   with JavaScript off the site still reads and navigates fine.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- 1. Theme (light / dark, remembered) ------------------------- */
  var THEME_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    root.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#12100e' : '#f7f3ec');
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }

  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode */ }
    });
  }

  /* ---------- 2. Mobile navigation ---------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 700) closeNav();
    });
  }

  /* ---------- 3. Mark the current page in the navigation ------------------- */
  var page = document.body.dataset.page;
  if (page) {
    var current = document.querySelector('[data-nav="' + page + '"]');
    if (current) current.setAttribute('aria-current', 'page');
  }

  /* ---------- 4. Footer year ---------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- 5. Project filter ------------------------------------------- */
  var filterButtons = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('[data-project-grid] .work-card');
  var counter = document.querySelector('[data-filter-count]');

  function applyFilter(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var tags = (card.dataset.tags || '').split(/\s+/);
      var match = filter === 'all' || tags.indexOf(filter) !== -1;
      card.hidden = !match;
      if (match) shown += 1;
    });

    filterButtons.forEach(function (btn) {
      var active = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    if (counter) {
      counter.textContent = filter === 'all'
        ? 'Showing all ' + shown + ' projects'
        : 'Showing ' + shown + ' of ' + cards.length + ' projects';
    }
  }

  if (filterButtons.length && cards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () { applyFilter(btn.dataset.filter); });
    });
    applyFilter('all');
  }

  /* ---------- 6. Contact form: validate, then hand over to the mail app ---- */
  var form = document.querySelector('[data-contact-form]');

  if (form) {
    var status = form.querySelector('[data-form-status]');

    var rules = {
      name: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      message: function (v) { return v.trim().length >= 10; }
    };

    function fieldOf(input) { return input.closest('.field'); }

    function setError(input, invalid) {
      var field = fieldOf(input);
      var error = field ? field.querySelector('.error') : null;
      if (field) field.classList.toggle('has-error', invalid);
      if (error) error.hidden = !invalid;
      input.setAttribute('aria-invalid', String(invalid));
    }

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        if (fieldOf(input) && fieldOf(input).classList.contains('has-error')) {
          setError(input, !rules[input.name](input.value));
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      var data = {};

      Object.keys(rules).forEach(function (key) {
        var input = form.elements[key];
        if (!input) return;
        var ok = rules[key](input.value);
        setError(input, !ok);
        if (!ok) valid = false;
        data[key] = input.value.trim();
      });

      if (!valid) {
        var firstInvalid = form.querySelector('.has-error input, .has-error textarea');
        if (firstInvalid) firstInvalid.focus();
        if (status) {
          status.textContent = 'Please check the highlighted fields.';
          status.classList.remove('is-ok');
        }
        return;
      }

      var subject = encodeURIComponent('Hello from ' + data.name);
      var body = encodeURIComponent(data.message + '\n\n— ' + data.name + ' (' + data.email + ')');

      // The real address lives in one place: the mail link in the sidebar.
      var mailLink = document.querySelector('.contact-list a[href^="mailto:"]');
      var target = mailLink
        ? mailLink.getAttribute('href').replace(/^mailto:/, '').split('?')[0]
        : '';

      if (status) {
        status.textContent = 'Looks good — opening your email app to send it.';
        status.classList.add('is-ok');
      }

      window.location.href = 'mailto:' + target + '?subject=' + subject + '&body=' + body;
      form.reset();
      form.querySelectorAll('.field').forEach(function (field) {
        field.classList.remove('has-error');
        var error = field.querySelector('.error');
        if (error) error.hidden = true;
      });
    });
  }

  /* ---------- 7. Gentle reveal on scroll ---------------------------------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.card, .work-card, .timeline li, .rule-list li');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();
