/* ==========================================================================
   Hummelhof – Interaktionen
   Kleines, abhängigkeitsfreies Script: Navigation, Scroll-Effekte,
   Galerie-Lightbox, Öffnungszeiten-Hervorhebung, Kontaktformular.
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Mobile Navigation
     ---------------------------------------------------------------------- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ----------------------------------------------------------------------
     Header-Schatten beim Scrollen
     ---------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Einblenden beim Scrollen
     ---------------------------------------------------------------------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (el) { observer.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ----------------------------------------------------------------------
     Galerie-Lightbox
     ---------------------------------------------------------------------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (galleryItems.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Bildansicht');
    box.innerHTML =
      '<button type="button" class="lightbox__close" aria-label="Schließen">&times;</button>' +
      '<div><img alt=""><p class="lightbox__caption"></p></div>';
    document.body.appendChild(box);

    var boxImg = box.querySelector('img');
    var boxCaption = box.querySelector('.lightbox__caption');
    var boxClose = box.querySelector('.lightbox__close');
    var lastFocused = null;

    function openBox(src, alt, caption, thumb) {
      lastFocused = thumb || null;
      boxImg.src = src;
      boxImg.alt = alt || '';
      boxCaption.textContent = caption || '';
      boxCaption.hidden = !caption;
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      boxClose.focus();
    }

    function closeBox() {
      box.classList.remove('is-open');
      boxImg.removeAttribute('src');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        openBox(
          item.getAttribute('data-full') || (img && img.currentSrc) || (img && img.src) || '',
          img ? img.alt : '',
          item.getAttribute('data-caption') || '',
          item
        );
      });
    });

    boxClose.addEventListener('click', closeBox);
    box.addEventListener('click', function (event) {
      if (event.target === box) closeBox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && box.classList.contains('is-open')) closeBox();
    });
  }

  /* ----------------------------------------------------------------------
     Öffnungszeiten: heutigen Tag hervorheben
     ---------------------------------------------------------------------- */
  var hoursTable = document.querySelector('[data-hours]');
  if (hoursTable) {
    var today = new Date().getDay(); // 0 = Sonntag
    var row = hoursTable.querySelector('tr[data-day="' + today + '"]');
    if (row) {
      row.querySelectorAll('th, td').forEach(function (cell) { cell.classList.add('is-today'); });
    }
  }

  /* ----------------------------------------------------------------------
     Kontaktformular (statische Seite: öffnet das E-Mail-Programm)
     ---------------------------------------------------------------------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('.form__status');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var recipient = form.getAttribute('data-mailto') || 'hallo@hummelhof.at';
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var phone = (data.get('phone') || '').toString().trim();
      var topic = (data.get('topic') || 'Anfrage').toString();
      var date = (data.get('date') || '').toString();
      var guests = (data.get('guests') || '').toString();
      var message = (data.get('message') || '').toString().trim();

      var subject = '[Website] ' + topic + (name ? ' – ' + name : '');
      var body = [
        'Name: ' + name,
        'E-Mail: ' + email,
        phone ? 'Telefon: ' + phone : null,
        date ? 'Datum: ' + date : null,
        guests ? 'Personen: ' + guests : null,
        '',
        message
      ].filter(Boolean).join('\n');

      window.location.href = 'mailto:' + recipient +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (status) status.textContent = 'Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage.';
    });
  }

  /* ----------------------------------------------------------------------
     Jahr im Footer
     ---------------------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
