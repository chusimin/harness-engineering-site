/* =========================================================
   Harness Engineering · Subpage JS
   Cursor glow, TOC scroll spy, tile glow follower
   ========================================================= */

// ---- Cursor glow ----
(function cursorGlow() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let raf = null;

  document.addEventListener('mouseenter', () => glow.classList.add('is-on'));
  document.addEventListener('mouseleave', () => glow.classList.remove('is-on'));

  document.addEventListener('pointermove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });

  function update() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    if (Math.abs(mx - cx) > 0.5 || Math.abs(my - cy) > 0.5) {
      raf = requestAnimationFrame(update);
    } else {
      raf = null;
    }
  }

  // Initial show
  setTimeout(() => glow.classList.add('is-on'), 200);
})();

// ---- Tile mouse glow (cards within content) ----
document.querySelectorAll('.tile, [data-glow]').forEach(el => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// ---- TOC scroll spy ----
(function tocSpy() {
  const links = document.querySelectorAll('.toc-link');
  if (!links.length) return;

  const sections = Array.from(links).map(l => {
    const id = l.getAttribute('href')?.replace('#', '');
    return id ? document.getElementById(id) : null;
  }).filter(Boolean);

  if (!sections.length) return;

  function setActive(id) {
    links.forEach(l => {
      const lid = l.getAttribute('href')?.replace('#', '');
      l.classList.toggle('is-active', lid === id);
    });
  }

  const obs = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));

  if (sections[0]) setActive(sections[0].id);
})();
