// ── ページロード ──
window.addEventListener('load', () => document.body.classList.add('loaded'));

// ── 数字カウントアップ ──
function countUp(el, target, suffix, duration) {
  const start = performance.now();
  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counters = [
  { sel: '.meta-item:nth-child(1) .n', target: 12,   suffix: '' },
  { sel: '.meta-item:nth-child(2) .n', target: 2000, suffix: '+' },
  { sel: '.meta-item:nth-child(3) .n', target: 150,  suffix: '+' },
];
const metaEl = document.querySelector('.hero-meta');
const metaObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  counters.forEach(c => {
    const el = document.querySelector(c.sel);
    if (el) countUp(el, c.target, c.suffix, 1400);
  });
  metaObserver.disconnect();
}, { threshold: 0.5 });
if (metaEl) metaObserver.observe(metaEl);

// ── スクロールフェードイン ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains('work-item')) {
      const siblings = [...el.parentElement.querySelectorAll('.work-item')];
      const idx = siblings.indexOf(el);
      setTimeout(() => el.classList.add('visible'), idx * 60);
    } else {
      el.classList.add('visible');
    }
    observer.unobserve(el);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.work-item').forEach(el => observer.observe(el));
document.querySelectorAll('.works-header, .about, .contact').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── ギャラリーフィルター ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.textContent.toLowerCase();
    document.querySelectorAll('.work-item').forEach(item => {
      const cats = (item.dataset.cat || '').toLowerCase();
      const show = filter === 'all' || cats.includes(filter);
      item.classList.toggle('hidden', !show);
    });
  });
});
