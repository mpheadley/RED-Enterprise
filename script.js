// ─── Nav scroll behavior ───
const header = document.getElementById('site-header');

// ─── Mobile menu ───
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');

function openMobileMenu() {
  if (!mobileOverlay) return;
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (!mobileOverlay) return;
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) closeMobileMenu();
  });
}

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileOverlay && mobileOverlay.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ─── Scroll-triggered animations ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ─── Active nav: page-based on inner pages, scroll spy on home ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const isHomePage = currentPage === 'index.html' || currentPage === '';

const spyLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
const navSections = Array.from(spyLinks).map(link => {
  const id = link.getAttribute('href').slice(1);
  return { id, el: document.getElementById(id) };
}).filter(s => s.el);

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let current = navSections[0]?.id;
  navSections.forEach(({ id, el }) => {
    if (el.offsetTop <= scrollY) current = id;
  });
  spyLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

if (!isHomePage) {
  document.querySelectorAll('.desktop-nav a:not(.btn), .mobile-nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    link.classList.toggle('active', href === currentPage);
  });
}

// ─── Consolidated scroll handler with rAF throttle ───
const scrollCue = document.querySelector('.scroll-cue');

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (scrollCue) scrollCue.classList.toggle('hidden', y > 80);
    if (isHomePage && navSections.length) updateActiveNav();
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
if (isHomePage && navSections.length) updateActiveNav();

// ─── CTA background zoom on scroll ───
var ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) ctaSection.classList.add('in-view');
  }, { threshold: 0.15 }).observe(ctaSection);
}

// ─── Footer year ───
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Cookie Consent + GA4 ───
(function () {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  var GA4_ID = banner.getAttribute('data-ga4');
  var hasTracking = GA4_ID && GA4_ID !== 'NONE';

  // No tracking configured — hide banner entirely, nothing to consent to
  if (!hasTracking) return;

  var consent = localStorage.getItem('cookie_consent');

  // If already decided, don't show banner
  if (consent === 'accepted') { loadGA4(); return; }
  if (consent === 'declined') return;

  // Show banner after short delay (avoids CLS on load)
  setTimeout(function () { banner.classList.add('visible'); }, 800);

  banner.querySelector('.cookie-btn-accept').addEventListener('click', function () {
    localStorage.setItem('cookie_consent', 'accepted');
    banner.classList.remove('visible');
    loadGA4();
  });

  banner.querySelector('.cookie-btn-decline').addEventListener('click', function () {
    localStorage.setItem('cookie_consent', 'declined');
    banner.classList.remove('visible');
  });

  function loadGA4() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID, { anonymize_ip: true });

    // ─── GA4 event tracking (fires only after consent) ───
    // Phone link clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        gtag('event', 'phone_click', {
          event_category: 'contact',
          event_label: link.href.replace('tel:', '')
        });
      });
    });

    // Form submissions
    document.querySelectorAll('form').forEach(function (form) {
      form.addEventListener('submit', function () {
        gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: window.location.pathname
        });
      });
    });

    // CTA button clicks
    document.querySelectorAll('.btn-primary, .cta-button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        gtag('event', 'cta_click', {
          event_category: 'engagement',
          event_label: btn.textContent.trim()
        });
      });
    });
  }
})();

// ─── Gallery carousel (peek/slide style) ───
(function () {
  var wrap = document.querySelector('.gallery-wrap');
  if (!wrap) return;
  var track = wrap.querySelector('.gallery-track');
  if (!track) return;
  var slides = track.querySelectorAll('.gallery-slide');
  var currentEl = wrap.querySelector('.gallery-current');
  var prevBtn = wrap.querySelector('.gallery-prev');
  var nextBtn = wrap.querySelector('.gallery-next');
  var thumbsEl = document.querySelector('.gallery-thumbs');
  var thumbs = thumbsEl ? thumbsEl.querySelectorAll('.gallery-thumb') : [];
  var thumbPrev = document.querySelector('.gallery-thumb-prev');
  var thumbNext = document.querySelector('.gallery-thumb-next');
  var total = slides.length;
  var idx = 0;
  var touchStartX = 0;
  var GAP = 12;

  function getOffset(i) {
    var sw = slides[i].offsetWidth;
    var sum = 0;
    for (var j = 0; j < i; j++) { sum += slides[j].offsetWidth + GAP; }
    return (wrap.offsetWidth - sw) / 2 - sum;
  }

  function syncThumbs(i) {
    thumbs.forEach(function (t, j) { t.classList.toggle('active', j === i); });
    if (thumbsEl && thumbs[i]) {
      var thumb = thumbs[i];
      var centerOffset = thumb.offsetLeft - (thumbsEl.offsetWidth - thumb.offsetWidth) / 2;
      thumbsEl.scrollTo({ left: centerOffset, behavior: 'smooth' });
    }
  }

  function goTo(n) {
    slides[idx].classList.remove('active');
    idx = (n + total) % total;
    slides[idx].classList.add('active');
    track.style.transform = 'translateX(' + getOffset(idx) + 'px)';
    if (currentEl) currentEl.textContent = idx + 1;
    syncThumbs(idx);
  }

  // Set initial position without transition
  track.style.transition = 'none';
  track.style.transform = 'translateX(' + getOffset(0) + 'px)';
  requestAnimationFrame(function () { track.style.transition = ''; });

  // Auto-advance
  var autoTimer = null;
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(idx + 1); }, 4000);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }
  startAuto();
  wrap.addEventListener('mouseenter', stopAuto);
  wrap.addEventListener('mouseleave', startAuto);

  prevBtn.addEventListener('click', function () { stopAuto(); goTo(idx - 1); startAuto(); });
  nextBtn.addEventListener('click', function () { stopAuto(); goTo(idx + 1); startAuto(); });

  // Click a dimmed slide to navigate to it
  slides.forEach(function (slide, i) {
    slide.addEventListener('click', function () {
      if (i !== idx) goTo(i);
    });
  });

  // Thumbnail clicks
  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
  });

  // Thumbnail strip scroll buttons
  if (thumbPrev && thumbsEl) {
    thumbPrev.addEventListener('click', function () {
      thumbsEl.scrollBy({ left: -195, behavior: 'smooth' });
    });
  }
  if (thumbNext && thumbsEl) {
    thumbNext.addEventListener('click', function () {
      thumbsEl.scrollBy({ left: 195, behavior: 'smooth' });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!document.querySelector('.gallery-wrap')) return;
    if (e.key === 'ArrowLeft') goTo(idx - 1);
    if (e.key === 'ArrowRight') goTo(idx + 1);
  });

  wrap.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  wrap.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { stopAuto(); dx < 0 ? goTo(idx + 1) : goTo(idx - 1); startAuto(); }
  }, { passive: true });

  window.addEventListener('resize', function () {
    track.style.transition = 'none';
    track.style.transform = 'translateX(' + getOffset(idx) + 'px)';
    requestAnimationFrame(function () { track.style.transition = ''; });
  });
})();

