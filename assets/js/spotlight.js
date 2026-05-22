/* =========================================================
   Spotlight · 通用鼠标光斑绑定
   给 .group-card / .he-group-card / .he-card-spot 加 --mx/--my
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const els = document.querySelectorAll('.group-card, .he-group-card, .he-card-spot');
  els.forEach((el) => {
    let ticking = false;
    el.addEventListener('pointermove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        ticking = false;
      });
    }, { passive: true });
  });
});
