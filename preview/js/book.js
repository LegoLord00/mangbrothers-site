/* "Now booking" call button: the line follows the calendar, the button slides in shortly after the page loads and steps aside at the call section */
(() => {
  const m = new Date().getMonth(); // 0 = January
  const line = m >= 7 && m <= 9 ? 'Now booking fall cleanups and snow'
    : m >= 10 || m === 0 ? 'Now booking snow removal'
    : m <= 3 ? 'Now booking spring cleanups and mowing'
    : 'Now booking weekly mowing';
  document.querySelectorAll('[data-book]').forEach(el => { el.textContent = line; });
  const btn = document.querySelector('.book'); if (!btn) return;
  let ready = false, atCta = false;
  const update = () => btn.classList.toggle('show', ready && !atCta);
  setTimeout(() => { ready = true; update(); }, 1200);
  const end = document.querySelectorAll('.cta, .foot');
  if ('IntersectionObserver' in window && end.length) {
    const seen = new Set();
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); atCta = seen.size > 0; update(); });
    end.forEach(el => io.observe(el));
  }
})();
