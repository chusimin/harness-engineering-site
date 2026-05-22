/* =========================================================
   Harness Engineering · Home Script
   1. Hero 鼠标光斑（rAF 节流；初始/离开回归中央）
   2. 5 分组卡片 spotlight glow
   3. 5 分组卡片动态渲染（基于 HE_GROUPS / HE_SECTIONS）
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. Hero 鼠标光斑 ----
  const hero = document.querySelector('.he-hero');
  const canHover = window.matchMedia('(hover: hover)').matches;

  if (hero && canHover) {
    const setSpot = (x, y) => {
      hero.style.setProperty('--mx', `${x}px`);
      hero.style.setProperty('--my', `${y}px`);
    };

    const center = () => {
      const r = hero.getBoundingClientRect();
      setSpot(r.width / 2, r.height * 0.4);   // 中央偏上（覆盖标题区）
    };
    center();
    window.addEventListener('resize', center, { passive: true });

    let ticking = false;
    hero.addEventListener('pointermove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        setSpot(e.clientX - r.left, e.clientY - r.top);
        ticking = false;
      });
    }, { passive: true });

    // 离开 hero 时回归中央（CSS transition 会平滑过渡）
    hero.addEventListener('pointerleave', center);
  }

  // ---- 2. 5 分组卡片动态渲染 ----
  const groupsGrid = document.getElementById('groups-grid');
  if (groupsGrid && window.HE_GROUPS && window.HE_SECTIONS) {
    groupsGrid.innerHTML = window.HE_GROUPS.map((g, i) => {
      const items = window.HE_SECTIONS.filter(s => s.group === g.key);
      return `
        <a href="pages/${g.slug}.html"
           class="he-group-card he-reveal he-reveal-d${(i % 4) + 1}">
          <div class="he-group-num">${String(i + 1).padStart(2, '0')} · ${g.sub}</div>
          <div>
            <div class="he-group-title">${g.label}</div>
            <p class="he-group-desc">${g.desc}</p>
          </div>
          <ul class="he-group-list">
            ${items.map(s => `<li data-num="${s.num}">${s.title}</li>`).join('')}
          </ul>
        </a>
      `;
    }).join('');

    // 给新加的卡片绑定鼠标光斑
    if (canHover) {
      groupsGrid.querySelectorAll('.he-group-card').forEach((card) => {
        let ticking = false;
        card.addEventListener('pointermove', (e) => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
            ticking = false;
          });
        }, { passive: true });
      });
    }

    // 让新加的 reveal 元素被 observer 看到
    if (window.HE_initReveal) window.HE_initReveal();
  }
});
