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
