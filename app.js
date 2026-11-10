(function () {
  'use strict';

  document.documentElement.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.reveal').forEach(function (el) {
    el.setAttribute('data-reveal', '');
  });

  if (!reduce && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  window.requestAnimationFrame(function () {
    document.documentElement.classList.add('motif-ready');
  });

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var form = document.getElementById('contact-form');
  if (!form) return;

  var errorBox = form.querySelector('.form-error');
  var DESTINATAIRE = 'axesrh.adm@gmail.com';

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorBox.hidden = true;

    var nom = form.nom.value.trim();
    var email = form.email.value.trim();
    var besoin = form.besoin.value.trim();

    if (!nom || !email || !besoin) {
      showError('Merci de renseigner au moins votre nom et prénom, votre adresse e-mail et votre besoin.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Votre adresse e-mail semble incomplète.');
      return;
    }

    var lignes = [
      'Nom et prénom : ' + nom,
      'Fonction : ' + form.fonction.value.trim(),
      'Entreprise : ' + form.entreprise.value.trim(),
      'Adresse e-mail : ' + email,
      'Téléphone : ' + form.telephone.value.trim(),
      '',
      'Votre besoin :',
      besoin
    ];

    var sujet = 'Demande de contact depuis le site AXES RH';
    var href = 'mailto:' + DESTINATAIRE +
      '?subject=' + encodeURIComponent(sujet) +
      '&body=' + encodeURIComponent(lignes.join('\n'));

    window.location.href = href;
  });
})();
