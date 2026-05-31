// ── ページロード ──
window.addEventListener('load', () => document.body.classList.add('loaded'));

// ── カスタムカーソル ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  ring.style.left   = rx + 'px';
  ring.style.top    = ry + 'px';
  requestAnimationFrame(animCursor);
})();

// ── ハンバーガーメニュー ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── ナビ縮小 ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── ヒーロー視差 ──
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
}, { passive: true });

// ── スクロールフェードイン ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains('gallery-cell')) {
      const siblings = [...el.parentElement.children];
      const idx = siblings.indexOf(el);
      setTimeout(() => el.classList.add('visible'), idx * 80);
    } else {
      el.classList.add('visible');
    }
    observer.unobserve(el);
  });
}, { threshold: 0.12 });

// fade-up クラスを付与してから監視
document.querySelectorAll(
  '.works-header, .contact h2, .contact p, .contact-links'
).forEach(el => el.classList.add('fade-up'));

// about は子要素を時間差でフェードイン
document.querySelectorAll('.about-img, .about-text').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${i * 0.18}s`;
});

document.querySelectorAll('.fade-up, .gallery-cell, .feature-shot')
  .forEach(el => observer.observe(el));
