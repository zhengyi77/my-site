/* ==========================================================================
   nav.js — one navigation for four pages (item 3 of the assignment)

   The links live in nav.html, in one place. This file copies them into every
   page. Add a page later? You edit nav.html once, not four files.

   Note: fetch() needs a server. In VS Code use the "Live Server" extension
   (right-click index.html -> Open with Live Server). Opening the file with a
   double-click (file://) will not load the navigation.
   ========================================================================== */
(function () {
  'use strict';

  var slot = document.getElementById('nav-slot');
  if (!slot) return;

  /* Mark the link of the page we are on, so it looks active and screen
     readers announce it. */
  function markCurrentPage() {
    var here = window.location.pathname.split('/').pop() || 'index.html';
    var links = slot.querySelectorAll('.site-nav a');

    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('href') === here) {
        links[i].setAttribute('aria-current', 'page');
      }
    }
  }

  /* The burger button only exists on small screens. The CSS hides it on
     desktop; the click handler is harmless there. */
  function wireMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  fetch('nav.html')
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.text();
    })
    .then(function (html) {
      slot.innerHTML = html;
      markCurrentPage();
      wireMobileMenu();
    })
    .catch(function (error) {
      slot.innerHTML =
        '<p class="nav-error">The navigation could not load (' + error.message +
        '). Open the site through a local server — see README.md.</p>';
    });
})();
