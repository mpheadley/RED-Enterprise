// ─── Nav scroll behavior ───
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Mobile menu ───
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');

function openMobileMenu() {
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileCloseBtn.addEventListener('click', closeMobileMenu);

mobileOverlay.addEventListener('click', (e) => {
  if (e.target === mobileOverlay) closeMobileMenu();
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
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

if (isHomePage) {
  // Scroll spy for homepage anchor links
  const navSections = ['hero', 'portfolio', 'why-red', 'contact'].map(id => ({
    id,
    el: document.getElementById(id),
  })).filter(s => s.el);

  const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = navSections[0]?.id;
    navSections.forEach(({ id, el }) => {
      if (el.offsetTop <= scrollY) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
} else {
  // Page-based active state for inner pages
  document.querySelectorAll('.desktop-nav a:not(.btn), .mobile-nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    link.classList.toggle('active', href === currentPage);
  });
}

// ─── Hide scroll cue after user scrolls ───
const scrollCue = document.querySelector('.scroll-cue');
if (scrollCue) {
  window.addEventListener('scroll', () => {
    scrollCue.classList.toggle('hidden', window.scrollY > 80);
  }, { passive: true });
}

// ─── CTA background zoom on scroll ───
var ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) ctaSection.classList.add('in-view');
  }, { threshold: 0.15 }).observe(ctaSection);
}

// ─── Footer year ───
document.getElementById('year').textContent = new Date().getFullYear();

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

