/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ===== SCROLL REVEAL ===== */
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = parseInt(e.target.dataset.delay || 0);
    setTimeout(() => e.target.classList.add('visible'), delay);
    ro.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ===== COUNTER ANIMATION ===== */
function runCounter(el, target) {
  let v = 0;
  const step = target / 80;
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v);
    if (v >= target) clearInterval(t);
  }, 16);
}

const statBar = document.querySelector('.hero-stats-bar');
if (statBar) {
  const co = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    statBar.querySelectorAll('[data-target]').forEach(el => runCounter(el, +el.dataset.target));
    co.disconnect();
  }, { threshold: 0.6 });
  co.observe(statBar);
}

/* ===== FLEET TABS ===== */
document.querySelectorAll('.ft').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ft').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.fp').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    // Re-trigger reveals for new panel
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).querySelectorAll('.reveal:not(.visible)').forEach(el => {
      setTimeout(() => el.classList.add('visible'), parseInt(el.dataset.delay || 0));
    });
  });
});

/* ===== FORM SUBMISSION ===== */
document.getElementById('quoteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    e.target.innerHTML = `
      <div class="form-success">
        <div class="si">
          <svg viewBox="0 0 24 24" fill="none" width="30" height="30">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h4>Enquiry Received!</h4>
        <p>We'll be in touch shortly. For urgent jobs call <a href="tel:1300000000">1300 FOR LIFT</a>.</p>
      </div>
    `;
  }, 1100);
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});
