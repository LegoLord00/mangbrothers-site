(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeIO = t => -(Math.cos(Math.PI * t) - 1) / 2;
  const smooth = k => k * k * (3 - 2 * k);
  const lerp = (a, b, t) => a + (b - a) * t;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mixA = (A, B, t) => A.map((v, i) => lerp(v, B[i], t));
  const rgb = (c, k = 1, a = 1) => `rgba(${c.map(v => Math.round(clamp(v * k, 0, 255))).join(',')},${a})`;
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* ---------- scene parts ---------- */
  // mower stripes across the front lawn, drawn by one pass on load
  const stripes = $('stripes'), stripeSet = $('stripeSet');
  for (let i = -4; i < 15; i++) {
    const x = i * 96, p = document.createElementNS(NS, 'path');
    p.setAttribute('d', `M${x} 518 L${x + 48} 518 L${x + 48 + (i - 5) * 9} 604 L${x + (i - 5) * 9} 604Z`);
    p.setAttribute('fill', '#8BC566'); p.setAttribute('opacity', '.4'); stripeSet.appendChild(p);
  }
  const mowRect = $('mowRect');
  if (reduce) mowRect.setAttribute('width', 1700);
  else { const t0 = performance.now(); const mow = now => { const k = clamp((now - t0 - 400) / 2000); mowRect.setAttribute('width', 1700 * easeIO(k)); if (k < 1) requestAnimationFrame(mow); }; requestAnimationFrame(mow); }

  // leaves scattered on the lawn in fall
  const fallCols = ['#C9561F', '#E1912E', '#B33B1B', '#E8B53C', '#D06A22', '#9E3418'].map(hex);
  const gl = $('groundLeaves'), groundLeaves = [];
  for (let i = 0; i < 90; i++) {
    const e = document.createElementNS(NS, 'path'), cx = -200 + rnd() * 1400, cy = 524 + Math.pow(rnd(), .8) * 74, s = .55 + (cy - 520) / 80 * .7;
    e.setAttribute('d', `M${-7 * s} 0 Q0 ${-4 * s} ${7 * s} 0 Q0 ${4 * s} ${-7 * s} 0Z`);
    e.setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${(rnd() * 180).toFixed(0)})`);
    e.setAttribute('fill', rgb(fallCols[i % 6])); e.setAttribute('opacity', 0);
    gl.appendChild(e); groundLeaves.push([e, rnd() * .7]);
  }

  // Christmas lights strung along each roofline marked data-roof
  const bulbCols = ['#F2C14E', '#E4572E', '#3BB273', '#4F9DDE', '#F7F3E3'], bulbEls = [], bulbGroups = [...document.querySelectorAll('.bulbs')];
  bulbGroups.forEach(g => {
    g.getAttribute('data-roof').split('M').forEach(run => {
      const pts = run.trim().split(/\s+/).map(p => p.split(',').map(Number));
      for (let j = 0; j < pts.length - 1; j++) {
        const [x0, y0] = pts[j], [x1, y1] = pts[j + 1], n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / 11));
        for (let i = 0; i < n; i++) {
          const u = i / n, c = document.createElementNS(NS, 'circle'), k = bulbEls.length;
          c.setAttribute('cx', (x0 + (x1 - x0) * u).toFixed(1)); c.setAttribute('cy', (y0 + (y1 - y0) * u + 2.5).toFixed(1)); c.setAttribute('r', 3);
          c.setAttribute('fill', bulbCols[k % 5]); c.setAttribute('stroke', bulbCols[k % 5]); c.setAttribute('stroke-opacity', '.35'); c.setAttribute('stroke-width', '3');
          g.appendChild(c); bulbEls.push(c);
        }
      }
    });
    g.setAttribute('opacity', 0);
  });

  /* every element marked data-fill, data-stop, or data-op carries its summer, fall, and winter value */
  const tri3 = (arr, k1, k2) => k2 > 0 ? lerp(arr[1], arr[2], k2) : lerp(arr[0], arr[1], k1);
  const triC = (arr, k1, k2) => k2 > 0 ? mixA(arr[1], arr[2], k2) : mixA(arr[0], arr[1], k1);
  const fills = [...document.querySelectorAll('[data-fill]')].map(el => ({ el, v: el.getAttribute('data-fill').split(',').map(hex) }));
  const stops = [...document.querySelectorAll('[data-stop]')].map(el => ({ el, v: el.getAttribute('data-stop').split(',').map(hex) }));
  const ops = [...document.querySelectorAll('[data-op]')].map(el => ({ el, v: el.getAttribute('data-op').split(',').map(Number) }));
  const paintSeason = (k1, k2) => {
    fills.forEach(f => f.el.setAttribute('fill', rgb(triC(f.v, k1, k2))));
    stops.forEach(f => f.el.setAttribute('stop-color', rgb(triC(f.v, k1, k2))));
    ops.forEach(f => f.el.setAttribute('opacity', tri3(f.v, smooth(k1), smooth(k2)).toFixed(3)));
  };
  const scene = $('scene');
  const stageEl = $('stage');

  /* ---------- the oak ---------- */
  const tcv = $('treeCv'), tc = tcv.getContext('2d'), treeEl = $('tree');
  const greens = ['#2E6A2A', '#3B7C33', '#4C8F3D', '#2A5F27', '#45863A', '#5A9A44'].map(hex);
  const clusters = [];
  for (let i = 0; i < 84; i++) {
    const th = rnd() * Math.PI * 2, u = rnd(), ph = Math.acos(1 - 1.7 * u), shell = i < 20 ? .5 : .84 + rnd() * .18;
    let x = Math.sin(ph) * Math.cos(th) * shell * 1.02, y = -Math.cos(ph) * shell * .64, z = Math.sin(ph) * Math.sin(th) * shell * .85;
    y = Math.min(y, .2);
    clusters.push({ x, y, z, r: .14 + rnd() * .08, pts: Array.from({ length: 14 }, () => .9 + rnd() * .16), g: greens[i % 6], f: fallCols[(i * 7) % 6], hl: rnd(), d: rnd() * .5, d2: rnd() * .55 });
  }
  // branch skeleton in 3D: limbs from the fork, twigs off each limb
  const fork = [0, .12, 0], segs = [];
  const limbEnds = [[-.66, -.06, .2], [.62, -.1, -.16], [-.22, -.46, -.36], [.27, -.44, .32], [0, -.6, 0], [-.48, -.32, -.42], [.5, -.27, .44]];
  for (const e of limbEnds) {
    const mid = [e[0] * .45, fork[1] + (e[1] - fork[1]) * .5 - .04, e[2] * .45];
    segs.push({ a: fork, c: mid, b: e, w: .075 });
    for (let k = 0; k < 3; k++) {
      const from = k === 0 ? mid : e, len = .22 + rnd() * .2, ang = rnd() * 6.28;
      const to = [from[0] + e[0] * .35 + Math.cos(ang) * len * .6, from[1] - .1 - rnd() * .22, from[2] + e[2] * .35 + Math.sin(ang) * len * .6];
      const ctrl = [(from[0] + to[0]) / 2 + (rnd() - .5) * .08, (from[1] + to[1]) / 2 - .03, (from[2] + to[2]) / 2];
      segs.push({ a: from, c: ctrl, b: to, w: .034 });
      for (let j = 0; j < 2; j++) {
        const t2 = [to[0] + (rnd() - .5) * .3, to[1] - .06 - rnd() * .14, to[2] + (rnd() - .5) * .3];
        segs.push({ a: to, c: [(to[0] + t2[0]) / 2, (to[1] + t2[1]) / 2 - .02, (to[2] + t2[2]) / 2], b: t2, w: .016 });
      }
    }
  }
  let tw = 1, th = 1;
  const blob = (cx, cy, r, pts) => {
    const n = pts.length, P = pts.map((k, i) => [cx + Math.cos(i / n * 6.2832) * r * k, cy + Math.sin(i / n * 6.2832) * r * k]);
    const mid = i => { const a = P[i % n], b = P[(i + 1) % n]; return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
    tc.beginPath(); let m = mid(n - 1); tc.moveTo(m[0], m[1]);
    for (let i = 0; i < n; i++) { m = mid(i); tc.quadraticCurveTo(P[i][0], P[i][1], m[0], m[1]); }
    tc.closePath(); tc.fill();
  };
  const drawTree = (ang, k1, k2, hop) => {
    tc.clearRect(0, 0, tw, th);
    const R = Math.min(tw * .44, th * .39), cx = tw / 2, baseY = th * .975, cy = th * .40 + hop, forkY = cy + R * .12;
    const ca = Math.cos(ang), sa = Math.sin(ang);
    tc.fillStyle = `rgba(25,45,18,${.22 * (1 - k2 * .4)})`; tc.beginPath(); tc.ellipse(cx + R * .15, baseY, R * 1.1 * (1 - Math.abs(hop) * .004), R * .13, 0, 0, 6.283); tc.fill();
    const proj = (x, y, z) => [cx + (x * ca + z * sa) * R, cy + y * R, -x * sa + z * ca];
    const bw = R * .21, tw2 = R * .11, bark = [74, 50, 36];
    const tg = tc.createLinearGradient(cx - bw, 0, cx + bw, 0), lit = .5 + .5 * Math.sin(ang + .8);
    tg.addColorStop(0, rgb(bark, .78 + lit * .25)); tg.addColorStop(.6, rgb(bark, 1.1)); tg.addColorStop(1, rgb(bark, 1.05 - lit * .25));
    tc.fillStyle = tg; tc.beginPath();
    tc.moveTo(cx - bw * 1.3, baseY); tc.quadraticCurveTo(cx - bw * .55, baseY - R * .14, cx - tw2, forkY + R * .1);
    tc.lineTo(cx + tw2, forkY + R * .1); tc.quadraticCurveTo(cx + bw * .55, baseY - R * .14, cx + bw * 1.3, baseY); tc.closePath(); tc.fill();
    if (k2 > 0) { tc.fillStyle = `rgba(255,255,255,${.85 * k2})`; tc.beginPath(); tc.ellipse(cx, baseY - 2, bw * 1.5, R * .03, 0, 0, 6.283); tc.fill(); }
    const P = segs.map(s => ({ s, A: proj(...s.a), C: proj(...s.c), B: proj(...s.b) }));
    const drawWood = front => {
      tc.lineCap = 'round';
      for (const { s, A, C, B } of P) {
        if ((B[2] >= 0) !== front) continue;
        const vis = s.w > .05 ? 1 : smooth(clamp((k2 - .05) / .45));
        if (vis <= .01) continue;
        tc.globalAlpha = vis; tc.strokeStyle = rgb(bark, .95); tc.lineWidth = Math.max(1, R * s.w);
        tc.beginPath(); tc.moveTo(A[0], A[1] + (s.a === fork ? R * .1 : 0)); tc.quadraticCurveTo(C[0], C[1], B[0], B[1]); tc.stroke();
        if (k2 > .05) {
          tc.strokeStyle = `rgba(255,255,255,${.9 * smooth(clamp((k2 - .3) / .5))})`; tc.lineWidth = Math.max(.8, R * s.w * .45);
          tc.beginPath(); tc.moveTo(A[0], A[1] - R * s.w * .4); tc.quadraticCurveTo(C[0], C[1] - R * s.w * .4, B[0], B[1] - R * s.w * .4); tc.stroke();
        }
        tc.globalAlpha = 1;
      }
    };
    const items = clusters.map(c => { const [X, Y, Z] = proj(c.x, c.y, c.z); return { c, X, Y, Z }; }).sort((a, b) => a.Z - b.Z);
    const drawCluster = ({ c, X, Y, Z }) => {
      const sc = 1 - smooth(clamp((k2 - c.d2) / .4)) - (k1 >= 1 && c.d > .42 ? 0 : 0);
      if (sc <= .02) return;
      const kf = smooth(clamp((k1 - c.d) / .5)), col = mixA(c.g, c.f, kf);
      const depth = .8 + .22 * (Z + 1) / 2, top = 1 + Math.max(0, -c.y) * .12, r = c.r * R * sc;
      tc.fillStyle = rgb(col, depth * .84); blob(X + r * .08, Y + r * .1, r, c.pts);
      tc.fillStyle = rgb(col, depth * top); blob(X, Y, r * .9, c.pts);
      tc.fillStyle = rgb(col, depth * top * 1.14, .85); blob(X - r * .22, Y - r * .24, r * .55, c.pts);
      if (c.hl > .6 && c.y < 0) { tc.fillStyle = rgb(col, depth * 1.3, .5); blob(X - r * .34, Y - r * .4, r * .22, c.pts); }
    };
    items.filter(i => i.Z < 0).forEach(drawCluster); drawWood(false); drawWood(true); items.filter(i => i.Z >= 0).forEach(drawCluster);
    return { cx, cy, R };
  };

  /* ---------- particles ---------- */
  const cv = $('fx'), ctx = cv.getContext('2d');
  let W = 1, H = 1, mobile = false;
  const glow = document.createElement('canvas'); glow.width = glow.height = 64;
  { const g = glow.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,250,220,1)'); gr.addColorStop(.35, 'rgba(250,246,200,.55)'); gr.addColorStop(1, 'rgba(220,240,170,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); }
  const flake = document.createElement('canvas'); flake.width = flake.height = 32;
  { const g = flake.getContext('2d'), gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.5, 'rgba(255,255,255,.75)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 32, 32); }
  const sprite = (img, x, y, r, a) => { if (a <= .01) return; ctx.globalAlpha = a; ctx.drawImage(img, x - r, y - r, r * 2, r * 2); };
  const leaf = (x, y, s, rot, flip, col, a) => {
    const f = Math.cos(flip), k = f < 0 ? .78 : 1;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, Math.max(.12, Math.abs(f))); ctx.globalAlpha = a;
    ctx.fillStyle = rgb(col, k); ctx.beginPath(); ctx.moveTo(-s * 1.9, 0);
    ctx.bezierCurveTo(-s, -s * 1.15, s * .9, -s * .95, s * 1.9, 0); ctx.bezierCurveTo(s * .9, s * .95, -s, s * 1.15, -s * 1.9, 0); ctx.fill();
    ctx.strokeStyle = rgb(col, .55, .7); ctx.lineWidth = Math.max(.6, s * .14); ctx.beginPath(); ctx.moveTo(-s * 2.5, 0); ctx.lineTo(s * 1.7, 0); ctx.stroke();
    ctx.restore();
  };
  const motes = Array.from({ length: 30 }, () => ({ x: rnd(), y: .05 + rnd() * .85, z: .4 + rnd() * 1.2, ph: rnd() * 6.28, vx: (rnd() - .5) * .000018, vy: -(.000006 + rnd() * .00001) }));
  const snow = Array.from({ length: 140 }, () => ({ x: rnd(), y: rnd(), z: .4 + rnd() * 1.1, ph: rnd() * 6.28 }));
  const edge = Array.from({ length: 24 }, (_, i) => ({ s: i / 24 + rnd() * .03, d: 14 + rnd() * 50, z: .55 + rnd(), ph: rnd() * 6.28, col: fallCols[i % 6], rot: rnd() * 6.28, flip: rnd() * 6.28, fs: .002 + rnd() * .003 }));
  const falling = [];
  const perim = (s, i) => {
    const w = W - 2 * i, h = H - 2 * i, L = 2 * (w + h); let d = ((s % 1) + 1) % 1 * L;
    if (d < w) return [i + d, i]; d -= w; if (d < h) return [W - i, i + d]; d -= h; if (d < w) return [W - i - d, H - i]; d -= w; return [i, H - i - d];
  };

  /* ---------- scroll ---------- */
  const track = $('track');
  const span = () => track.offsetHeight - stageEl.clientHeight;
  const stickTop = () => parseFloat(getComputedStyle(stageEl).top) || 0;
  const progress = () => { const r = track.getBoundingClientRect(), s = span(); const v = s > 1 ? clamp((stickTop() - r.top) / s) : 0; return Number.isFinite(v) ? v : 0; };
  const STOPS = [.04, .5, .95];
  document.querySelectorAll('[data-go]').forEach(a => a.addEventListener('click', ev => {
    ev.preventDefault();
    const top = track.getBoundingClientRect().top + scrollY - stickTop() + STOPS[+a.dataset.go] * span();
    scrollTo({ top: Math.max(0, top - 1), behavior: reduce ? 'auto' : 'smooth' });
  }));
  // arriving from a season page (index.html#fall): land on that season's stop
  const jumpToHash = () => {
    const i = { '#summer': 0, '#fall': 1, '#winter': 2 }[location.hash];
    if (i === undefined) return;
    scrollTo({ top: Math.max(0, track.getBoundingClientRect().top + scrollY - stickTop() + STOPS[i] * span() - 1), behavior: 'auto' });
  };
  if ('scrollRestoration' in history && location.hash) history.scrollRestoration = 'manual';
  jumpToHash(); addEventListener('load', jumpToHash); addEventListener('hashchange', jumpToHash);

  const contents = [$('c0'), $('c1'), $('c2')], peeks = [$('k0'), $('k1'), $('k2')];
  const navLinks = document.querySelectorAll('.nav [data-go]'), dotLinks = document.querySelectorAll('.dots [data-go]');
  let shown = -1;
  const barSee = $('barSee'), seePages = [['spring-summer.html', 'Lawn prices'], ['fall-cleanup.html', 'Fall prices'], ['snow-and-lights.html', 'Lights & snow prices']];
  const setActive = i => {
    if (i === shown) return; shown = i;
    if (barSee) { barSee.href = seePages[i][0]; barSee.textContent = seePages[i][1]; }
    contents.forEach((c, j) => { c.classList.toggle('on', j === i); if (j === i) c.removeAttribute('inert'); else c.setAttribute('inert', ''); });
    peeks.forEach((k, j) => { k.classList.toggle('on', j === i); k.tabIndex = j === i ? 0 : -1; });
    [navLinks, dotLinks].forEach(list => list.forEach((a, j) => { if (j === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }));
  };

  // page-to-page: hand the season card and the scene to the season page (and back)
  const tag = (i, on) => { const c = contents[i]; if (!c) return; c.style.viewTransitionName = on ? 'card' : ''; stageEl.style.viewTransitionName = on ? 'scene' : ''; };
  document.querySelectorAll('.stub, #barSee').forEach(a => a.addEventListener('click', () => tag(shown, true)));
  addEventListener('pageshow', () => contents.forEach((c, i) => tag(i, false)));
  addEventListener('pagereveal', e => {
    const i = { '#summer': 0, '#fall': 1, '#winter': 2 }[location.hash];
    if (!e.viewTransition || i === undefined) return;
    jumpToHash(); setActive(i); tag(i, true);
    e.viewTransition.finished.finally(() => tag(i, false));
  });

  const size = () => {
    const d = Math.min(2, devicePixelRatio || 1);
    W = stageEl.clientWidth || 1; H = stageEl.clientHeight || 1; mobile = W < 820;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    { const sv = $('scene'), sw = sv.clientWidth || W, sh = sv.clientHeight || H, sc = Math.max(sw / 1000, sh / 700), lawnY = sh - (700 - 590) * sc; treeEl.style.bottom = Math.max(0, H - lawnY) + 'px'; }
    tw = treeEl.clientWidth || 1; th = treeEl.clientHeight || 1; tcv.width = tw * d; tcv.height = th * d; tc.setTransform(d, 0, 0, d, 0, 0);
    dirty = true;
  };
  let dirty = true;
  size(); addEventListener('resize', size);
  if ('ResizeObserver' in window) { const ro = new ResizeObserver(size); ro.observe(stageEl); ro.observe(treeEl); }

  // before and after sliders
  document.querySelectorAll('.ba').forEach(box => {
    const input = box.querySelector('input'), set = () => box.style.setProperty('--x', input.value + '%');
    input.addEventListener('input', set); set();
  });

  const c1 = $('cloud1'), c2 = $('cloud2'), c3 = $('cloud3');
  { const t = $('today'); if (t) { const n = new Date(), dim = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate(); t.style.setProperty('--t', (n.getMonth() + (n.getDate() - 1) / dim).toFixed(3)); } }
  let seasonKey = '', p = progress(), lastY = scrollY, vel = 0, last = performance.now(), crown = { cx: 0, cy: 0, R: 1 }, lastKey = '';
  const frame = now => {
    const dt = Math.min(50, now - last); last = now;
    if (stageEl.clientWidth !== W || stageEl.clientHeight !== H || treeEl.clientWidth !== tw) size();
    vel = lerp(vel, (scrollY - lastY) / Math.max(dt, 1), .12); lastY = scrollY; if (!Number.isFinite(vel)) vel = 0;
    p = reduce ? progress() : lerp(p, progress(), .11); if (!Number.isFinite(p)) p = progress();
    const k1 = ease(clamp((p - .14) / .28)), k2 = ease(clamp((p - .58) / .28));

    // colours
    if (seasonKey !== `${k1.toFixed(4)}|${k2.toFixed(4)}`) { paintSeason(k1, k2); seasonKey = `${k1.toFixed(4)}|${k2.toFixed(4)}`; }
    $('sun').setAttribute('cy', lerp(160, 250, k1) - 50 * k2);
    stripes.setAttribute('opacity', 1 - k1);
    const gOn = 1 - smooth(clamp(k2 * 1.6));
    groundLeaves.forEach(([e, d]) => e.setAttribute('opacity', clamp((k1 - d) / .3) * gOn));
    const lOn = smooth(clamp((k2 - .6) / .35));
    bulbGroups.forEach(g => g.setAttribute('opacity', lOn));
    if (lOn > 0 && !reduce) bulbEls.forEach((b, i) => b.setAttribute('opacity', .6 + .4 * Math.sin(now * .004 + i * 1.7)));
    if (!reduce) { c1.setAttribute('transform', `translate(${(now * .004) % 1400 - 250} 0)`); c2.setAttribute('transform', `translate(${(now * .0025) % 1400 - 650} 0)`); if (c3) c3.setAttribute('transform', `translate(${(now * .0018) % 1400 - 900} 0)`); }

    // oak: left for summer, right for fall, left again for winter, one full turn each change
    const x0 = mobile ? -tw * .08 : W * .03, x1 = mobile ? W - tw * .92 : W * .97 - tw;
    treeEl.style.transform = `translate3d(${lerp(x0, x1, k1 - k2)}px,0,0)`;
    const still = k1 <= 0 || (k1 >= 1 && k2 <= 0) || k2 >= 1;
    const sway = reduce ? 0 : (still ? Math.sin(now * .00035) * .12 : 0);
    const spin = reduce ? .35 : .35 + (k1 + k2) * Math.PI * 2 + sway;
    const hop = reduce ? 0 : -(Math.sin(Math.PI * k1) + Math.sin(Math.PI * k2)) * (mobile ? 14 : 24);
    const key = `${spin.toFixed(3)}|${k1.toFixed(3)}|${k2.toFixed(3)}|${hop.toFixed(1)}`;
    if (dirty || key !== lastKey) { crown = drawTree(spin, k1, k2, hop); lastKey = key; dirty = false; }

    // copy and labels
    const o0 = 1 - clamp(k1 / .35), o1 = clamp((k1 - .65) / .35) * (1 - clamp(k2 / .35)), o2 = clamp((k2 - .65) / .35);
    [o0, o1, o2].forEach((o, i) => {
      const c = contents[i]; c.style.opacity = o;
      c.style.transform = mobile ? `translateY(${(1 - o) * 14}px)` : `translateY(${(1 - o) * 18}px)`;
    });
    setActive(k2 >= .5 ? 2 : k1 >= .5 ? 1 : 0);

    // particles
    ctx.clearRect(0, 0, W, H);
    if (!reduce) {
      const pollen = 1 - k1;
      if (pollen > .01) for (const m of motes) {
        m.x = (m.x + m.vx * dt + 1) % 1; m.y += m.vy * dt * m.z; if (m.y < .03) m.y = .9;
        sprite(glow, m.x * W, m.y * H, (1.4 * m.z + (m.z > 1.3 ? 4 : 0)) * 2.4, pollen * (.3 + .3 * Math.sin(now * .0016 + m.ph)) * (m.z > 1.3 ? .35 : 1));
      }
      const snowA = smooth(clamp((k2 - .15) / .5));
      if (snowA > .01) for (const f of snow) {
        f.y += dt * .00005 * f.z; f.x += Math.sin(now * .0008 + f.ph) * .00012 + vel * .00002; if (f.y > 1.02) { f.y = -.02; f.x = rnd(); }
        sprite(flake, ((f.x % 1) + 1) % 1 * W, f.y * H, 2.4 * f.z, snowA * .9);
      }
      const n = mobile ? 14 : 24, leafA = k1 * (1 - k2);
      for (let i = 0; i < n; i++) {
        const q = edge[i];
        q.s += dt * (0.000011 + vel * 0.000004) / q.z; q.rot += dt * .0012 * (1 + Math.abs(vel)); q.flip += dt * q.fs * (1 + Math.abs(vel) * 1.5);
        const [x, y] = perim(q.s, q.d + Math.sin(now * .001 + q.ph) * 8);
        if (pollen > .02) sprite(glow, x, y, 2.2 * q.z * 2.2, pollen * .6);
        if (leafA > .02) leaf(x, y, 3.4 * q.z, q.rot, q.flip, q.col, leafA * .9);
      }
      const tr = treeEl.getBoundingClientRect(), sr = stageEl.getBoundingClientRect();
      const rate = (k1 > .25 && k2 < .6) ? (k2 > 0 ? .012 : k1 < 1 ? .005 : .0016) + Math.abs(vel) * .015 : 0;
      if (falling.length < 70 && Math.random() < rate * dt) {
        const a = Math.random() * 6.283, rr = Math.sqrt(Math.random()) * crown.R;
        falling.push({ x: tr.left - sr.left + crown.cx + Math.cos(a) * rr, y: tr.top - sr.top + crown.cy + Math.sin(a) * rr * .6, vx: (Math.random() - .3) * .035, vy: .025 + Math.random() * .035,
          sw: Math.random() * 6.28, flip: Math.random() * 6.28, fs: .004 + Math.random() * .004, z: .7 + Math.random() * .8, col: fallCols[(Math.random() * 6) | 0] });
      }
      for (let i = falling.length - 1; i >= 0; i--) {
        const f = falling[i]; f.sw += dt * .0022; f.flip += dt * f.fs;
        f.x += (f.vx + Math.cos(f.sw) * .045 + vel * .008) * dt; f.y += (f.vy + Math.abs(Math.sin(f.sw)) * .02) * dt;
        if (f.y > H + 20 || k1 < .1) { falling.splice(i, 1); continue; }
        leaf(f.x, f.y, 4 * f.z, Math.sin(f.sw) * .9, f.flip, f.col, Math.min(1, k1 * 1.4) * (1 - smooth(clamp((k2 - .55) / .3))));
      }
      ctx.globalAlpha = 1;
    }
    if (onScreen && !reduce) requestAnimationFrame(frame); else running = false;
  };
  // only animate while the scene is on screen; with reduced motion, draw once per scroll or resize
  let running = false, onScreen = true;
  const wake = () => { if (running || !onScreen) return; running = true; last = performance.now(); requestAnimationFrame(frame); };
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { onScreen = es[0].isIntersecting; wake(); }).observe(track);
  addEventListener('scroll', wake, { passive: true }); addEventListener('resize', wake);
  wake();
})();
