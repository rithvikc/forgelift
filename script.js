/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(l => {
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
}, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ===== STAT COUNTERS ===== */
function runCounter(el, target) {
  let v = 0;
  const step = target / 60;
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v);
    if (v >= target) clearInterval(t);
  }, 20);
}
const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) {
  const co = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.count').forEach(el => runCounter(el, +el.dataset.target));
    co.disconnect();
  }, { threshold: 0.5 });
  co.observe(statsStrip);
}

/* ===== FLEET TABS ===== */
document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.fpanel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active');
  });
});

/* ===== HERO SEARCH → scroll to contact ===== */
const heroSearch = document.querySelector('.hero-search button');
if (heroSearch) {
  heroSearch.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ===== FORM — sends to info@forgelifts.com.au via Formsubmit ===== */
document.getElementById('quoteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const fd = new FormData(form);
  const payload = {
    _subject: 'New Enquiry — Forge Lift Forklifts',
    _captcha: 'false',
    name:    fd.get('name')    || '',
    company: fd.get('company') || '',
    phone:   fd.get('phone')   || '',
    email:   fd.get('email')   || '',
    service: fd.get('service') || '',
    message: fd.get('message') || '',
  };

  fetch('https://formsubmit.co/ajax/info@forgelifts.com.au', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(r => r.json())
    .then(() => {
      form.innerHTML = `
        <div class="form-success">
          <div class="si">
            <svg viewBox="0 0 24 24" fill="none" width="28"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h4>Enquiry Sent!</h4>
          <p>We'll be in touch shortly. For urgent jobs call <a href="tel:1300000000">1300 FOR LIFT</a>.</p>
        </div>`;
    })
    .catch(() => {
      btn.textContent = orig;
      btn.disabled = false;
      alert('Something went wrong. Please email us directly at info@forgelifts.com.au or call 1300 FOR LIFT.');
    });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});
