/* header: a sliding marker under the current season, and a season-colored rule that follows the scroll */
(() => {
  const nav = document.querySelector('.hdr .nav'), ind = nav && nav.querySelector('.nav-ind'), hdr = document.querySelector('.hdr');
  if (!nav || !ind) return;
  const seasons = ['summer', 'fall', 'winter'];
  const place = () => {
    const cur = nav.querySelector('a[aria-current]');
    if (!cur) { ind.style.opacity = 0; return; }
    const r = cur.getBoundingClientRect(), n = nav.getBoundingClientRect();
    ind.style.opacity = 1;
    ind.style.transform = `translateX(${r.left - n.left}px)`;
    ind.style.width = r.width + 'px';
    const links = [...nav.querySelectorAll('a')], i = links.indexOf(cur);
    hdr.dataset.season = seasons[i] || 'summer';
  };
  new MutationObserver(place).observe(nav, { subtree: true, attributes: true, attributeFilter: ['aria-current'] });
  addEventListener('resize', place);
  if (document.fonts) document.fonts.ready.then(place);
  place();
})();

/* parallax: far layers drift slower than the yard, the truck drifts the other way */
(() => {
  const track = document.getElementById('track'), stage = document.getElementById('stage');
  const layers = [...document.querySelectorAll('#scene .par')].map(g => [g, +g.dataset.par]);
  if (!track || !layers.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let queued = false;
  const run = () => {
    queued = false;
    const r = track.getBoundingClientRect(), top = parseFloat(getComputedStyle(stage).top) || 0, span = track.offsetHeight - stage.clientHeight;
    const p = span > 1 ? Math.min(1, Math.max(0, (top - r.top) / span)) : 0;
    layers.forEach(([g, f]) => g.setAttribute('transform', `translate(${((p - .5) * f).toFixed(2)} 0)`));
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(run); } }, { passive: true });
  run();
})();
