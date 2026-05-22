/* =========================================================
   Harness Engineering · Layout
   注入 Nav (6 项) + Sidebar (板块页) + Footer + reveal observer
   ========================================================= */

// ---- 5 分组定义（顶级 nav 项 + 分组首页 + 子板块） ----
const GROUPS = [
  { key: 'intro',    label: '入门', slug: 'intro',     sub: 'INTRO',
    title: '先建立坐标', desc: '0 基础进来，把"驾驭工程"这个概念立住' },
  { key: 'survey',   label: '全景', slug: 'survey',    sub: 'SURVEY',
    title: '一眼看清这个领域', desc: '看主流厂商、看中文圈，建立全局印象' },
  { key: 'deep',     label: '深入', slug: 'deep',      sub: 'DEEP DIVE',
    title: '把它拆开来看', desc: '组件级深拆、方法论、未解难题' },
  { key: 'practice', label: '实战', slug: 'practice',  sub: 'PRACTICE',
    title: 'PM 能上手做的事', desc: '真实可 fork 的 harness 模板仓库' },
  { key: 'res',      label: '资源', slug: 'resources', sub: 'RESOURCES',
    title: '职业、术语、来源', desc: '面试、35 个术语速查、一手来源库' },
];

const SECTIONS = [
  { num: '01', slug: '01-what-is-it', title: '它是什么',  desc: '定义、构成、三个尺度',         group: 'intro' },
  { num: '02', slug: '02-history',    title: '它从哪来',  desc: '从 prompt 到 harness 的谱系',  group: 'intro' },
  { num: '04', slug: '04-vendors',    title: '厂商全景',  desc: '五款主流 Agent 的对照',         group: 'survey' },
  { num: '07', slug: '07-chinese',    title: '中文语境',  desc: '国内厂商、译法、本土实践',      group: 'survey' },
  { num: '03', slug: '03-anatomy',    title: '解剖学',    desc: '组件深拆：转·知·做·检',         group: 'deep' },
  { num: '05', slug: '05-how-to',     title: '怎么做',    desc: '方法论与最佳实践',              group: 'deep' },
  { num: '09', slug: '09-frontier',   title: '前沿与未解', desc: '5 个未解难题与未来',           group: 'deep' },
  { num: '06', slug: '06-practice',   title: '实战',      desc: 'pm-docs-harness 模板与案例',    group: 'practice' },
  { num: '08', slug: '08-career',     title: '职业 & 面试', desc: 'AIPM 就业地图与面试题',       group: 'res' },
  { num: '00', slug: '00-glossary',   title: '术语表',    desc: '35 术语 + 一手来源',           group: 'res' },
];

// ---- Helpers ----
function getBasePath() {
  return /\/pages\//.test(window.location.pathname) ? '../' : './';
}
function currentSlug() {
  // 兼容带 .html 和不带 .html（npx serve 等静态服务器会省略后缀）
  const m = window.location.pathname.match(/\/([\w-]+?)(?:\.html)?$/);
  return m ? m[1] : '';
}
function resolveContext() {
  const slug = currentSlug();
  // 是分组首页？
  let group = GROUPS.find(g => g.slug === slug);
  let section = null;
  let isGroupHome = !!group;
  if (!group) {
    section = SECTIONS.find(s => s.slug === slug);
    if (section) group = GROUPS.find(g => g.key === section.group);
  }
  return { slug, group, section, isGroupHome };
}
function groupIndex(key) {
  return GROUPS.findIndex(g => g.key === key);
}
function nextGroup(currentKey) {
  const i = groupIndex(currentKey);
  return GROUPS[i + 1] || null;
}

// ---- 注入 NAV (6 项顶级) ----
function injectNav() {
  const base = getBasePath();
  const ctx = resolveContext();
  const isHome = window.location.pathname === '/' ||
                 window.location.pathname.endsWith('/index.html') ||
                 (!/\/pages\//.test(window.location.pathname) && ctx.slug === '');

  const navItems = GROUPS.map(g => {
    const active = ctx.group?.key === g.key;
    return `<a href="${base}pages/${g.slug}.html"
               class="he-nav-link ${active ? 'is-active' : ''}">${g.label}</a>`;
  }).join('');

  const nav = `
    <nav class="he-nav">
      <div class="he-nav-inner">
        <a href="${base}index.html" class="he-nav-brand">
          <span class="he-nav-brand-mark">H</span>
          <span>Harness Engineering</span>
          <span class="he-nav-brand-zh">驾驭工程</span>
        </a>
        <div class="he-nav-menu">
          <a href="${base}index.html" class="he-nav-link ${isHome ? 'is-active' : ''}">首页</a>
          ${navItems}
          <a href="https://github.com" target="_blank" rel="noreferrer"
             class="he-nav-link he-nav-cta" title="GitHub" aria-label="GitHub">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', nav);
}

// ---- 注入 SIDEBAR（仅在板块页 / 分组首页生效） ----
function injectSidebar() {
  const layout = document.querySelector('.page-layout');
  if (!layout) return;
  const ctx = resolveContext();
  if (!ctx.group) return;

  const items = SECTIONS.filter(s => s.group === ctx.group.key);
  const idx = groupIndex(ctx.group.key);
  const next = nextGroup(ctx.group.key);

  const sidebar = `
    <aside class="page-side">
      <div class="page-side-inner">
        <div class="page-side-meta">
          <span class="page-side-step">0${idx + 1} / ${GROUPS.length}</span>
          <span class="page-side-sub">${ctx.group.sub}</span>
        </div>
        <div class="page-side-group">${ctx.group.label}</div>
        <nav class="page-side-list" aria-label="本组板块">
          <a href="${ctx.group.slug}.html"
             class="page-side-link page-side-link-home ${ctx.isGroupHome ? 'is-active' : ''}">
            <span class="page-side-link-icon" aria-hidden="true">⌂</span>本组总览
          </a>
          ${items.map(s => `
            <a href="${s.slug}.html"
               class="page-side-link ${s.slug === ctx.slug ? 'is-active' : ''}">
              <span class="page-side-link-num">${s.num}</span>
              <span class="page-side-link-title">${s.title}</span>
            </a>
          `).join('')}
        </nav>
        ${next ? `
          <a href="${next.slug}.html" class="page-side-next">
            <span class="page-side-next-label">下一组</span>
            <span class="page-side-next-name">${next.label} →</span>
          </a>
        ` : `
          <a href="../index.html" class="page-side-next">
            <span class="page-side-next-label">读完了</span>
            <span class="page-side-next-name">回首页 →</span>
          </a>
        `}
      </div>
    </aside>
  `;
  layout.insertAdjacentHTML('afterbegin', sidebar);
}

// ---- 注入 FOOTER ----
function injectFooter() {
  const base = getBasePath();
  const linksByGroup = (keys) =>
    keys.flatMap(k => SECTIONS.filter(s => s.group === k))
        .map(s => `<a href="${base}pages/${s.slug}.html" class="he-footer-link">${s.num} · ${s.title}</a>`)
        .join('');

  const groupLinks = GROUPS.map(g =>
    `<a href="${base}pages/${g.slug}.html" class="he-footer-link">${g.label}</a>`
  ).join('');

  const footer = `
    <footer class="he-footer">
      <div class="he-container-wide">
        <div class="he-footer-grid">
          <div>
            <div class="he-nav-brand" style="margin-bottom: var(--sp-4);">
              <span class="he-nav-brand-mark">H</span>
              <span>Harness Engineering</span>
            </div>
            <p class="he-caption" style="max-width: 320px; line-height: 1.7;">
              一份关于<strong>驾驭工程（Harness Engineering）</strong>的最全参考资料。
              面向 AI 产品经理，覆盖该概念的全生命周期。
            </p>
          </div>
          <div>
            <div class="he-footer-col-title">分组</div>
            ${groupLinks}
          </div>
          <div>
            <div class="he-footer-col-title">入门 · 全景</div>
            ${linksByGroup(['intro', 'survey'])}
          </div>
          <div>
            <div class="he-footer-col-title">一手来源</div>
            <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps"
               target="_blank" rel="noreferrer" class="he-footer-link">Anthropic ↗</a>
            <a href="https://openai.com/index/harness-engineering/"
               target="_blank" rel="noreferrer" class="he-footer-link">OpenAI ↗</a>
            <a href="https://www.langchain.com/blog/the-anatomy-of-an-agent-harness"
               target="_blank" rel="noreferrer" class="he-footer-link">LangChain ↗</a>
            <a href="https://martinfowler.com/articles/harness-engineering.html"
               target="_blank" rel="noreferrer" class="he-footer-link">Martin Fowler ↗</a>
          </div>
        </div>
        <div class="he-footer-bottom">
          <span>© 2026 Harness Engineering · 思敏出品</span>
          <span>所有论断挂一手来源 · CC BY 4.0</span>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footer);
}

// ---- Scroll reveal observer ----
function initReveal() {
  const els = document.querySelectorAll('.he-reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ---- 二级目录（TOC）：扫描当前页 .page-section，插入到 sidebar 当前 link 下 ----
function buildToc() {
  const ctx = resolveContext();
  if (ctx.isGroupHome || !ctx.section) return;

  const sections = document.querySelectorAll('.page-main .page-section');
  if (!sections.length) return;

  // 给没 id 的 section 自动加 id
  sections.forEach((sec, i) => {
    if (!sec.id) sec.id = `sec-${i + 1}`;
  });

  // 提取每节 label：优先 data-toc，否则取 h2 文本
  const tocItems = Array.from(sections).map((sec) => {
    const dataLabel = sec.dataset.toc;
    if (dataLabel) return { id: sec.id, label: dataLabel };
    const h2 = sec.querySelector('h2');
    if (!h2) return null;
    const text = h2.textContent
      .replace(/\s+/g, ' ')
      .replace(/[。.]\s*$/, '')
      .trim();
    // 截断到首个标点（让 toc 简短）
    const short = text.split(/[，,?？:：]/)[0].trim();
    return { id: sec.id, label: short };
  }).filter(Boolean);

  if (!tocItems.length) return;

  // 找当前激活的 sidebar 链接（板块链接，不是「本组总览」）
  const activeLink = document.querySelector(
    '.page-side-link.is-active:not(.page-side-link-home)'
  );
  if (!activeLink) return;

  // 插入二级目录
  const tocHtml = `
    <ul class="page-side-toc" aria-label="本页目录">
      ${tocItems.map((t, i) => `
        <li>
          <a href="#${t.id}" class="page-side-toc-link" data-toc-id="${t.id}">
            <span class="page-side-toc-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="page-side-toc-label">${t.label}</span>
          </a>
        </li>
      `).join('')}
    </ul>
  `;
  activeLink.insertAdjacentHTML('afterend', tocHtml);

  // Scroll spy：滚动时高亮当前小节
  initTocSpy(tocItems);
}

function initTocSpy(items) {
  if (!('IntersectionObserver' in window)) return;
  const links = document.querySelectorAll('.page-side-toc-link');
  const setActive = (id) => {
    links.forEach(l => l.classList.toggle('is-active', l.dataset.tocId === id));
  };

  // viewport 顶部 30% 处作为"激活区"，避免多个同时高亮
  const io = new IntersectionObserver((entries) => {
    // 找最靠上的 intersecting section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

  items.forEach(t => {
    const el = document.getElementById(t.id);
    if (el) io.observe(el);
  });

  // 初始：默认高亮第一个
  if (items[0]) setActive(items[0].id);
}

// ---- 注入 CHAPTER SIDEBAR（合并组页面 · 手风琴） ----
function injectChapterSidebar() {
  const layout = document.querySelector('.page-layout');
  if (!layout) return;

  const chapters = document.querySelectorAll('.page-chapter');
  if (!chapters.length) return;

  const ctx = resolveContext();
  if (!ctx.group) return;

  const idx = groupIndex(ctx.group.key);
  const next = nextGroup(ctx.group.key);

  // 从 DOM 读取章节结构
  const chapterData = Array.from(chapters).map(ch => {
    const num = ch.querySelector('.page-chapter-num')?.textContent.trim() || '';
    const title = ch.querySelector('.page-chapter-title')?.textContent.trim() || '';
    const sections = Array.from(ch.querySelectorAll('.page-section')).map(sec => ({
      id: sec.id,
      label: sec.dataset.toc || (() => {
        const h2 = sec.querySelector('h2');
        if (!h2) return '';
        return h2.textContent.replace(/\s+/g, ' ').replace(/[。.]\s*$/, '').trim().split(/[，,?？:：]/)[0].trim();
      })()
    })).filter(s => s.label);
    return { id: ch.id, num, title, sections };
  });

  const sidebar = `
    <aside class="page-side">
      <div class="page-side-inner">
        <div class="page-side-meta">
          <span class="page-side-step">0${idx + 1} / ${GROUPS.length}</span>
          <span class="page-side-sub">${ctx.group.sub}</span>
        </div>
        <div class="page-side-group">${ctx.group.label}</div>
        <nav class="page-side-list" aria-label="本组板块">
          ${chapterData.map((ch, i) => `
            <div class="page-side-chapter ${i === 0 ? 'is-active' : ''}" data-chapter-id="${ch.id}">
              <a href="#${ch.id}" class="page-side-chapter-link">
                <span class="page-side-link-num">${ch.num}</span>
                <span class="page-side-link-title">${ch.title}</span>
              </a>
              ${ch.sections.length ? `
                <ul class="page-side-toc" ${i === 0 ? '' : 'style="display:none"'}>
                  ${ch.sections.map((s, j) => `
                    <li><a href="#${s.id}" class="page-side-toc-link" data-toc-id="${s.id}">
                      <span class="page-side-toc-num">${String(j + 1).padStart(2, '0')}</span>
                      <span class="page-side-toc-label">${s.label}</span>
                    </a></li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </nav>
        ${next ? `
          <a href="${next.slug}.html" class="page-side-next">
            <span class="page-side-next-label">下一组</span>
            <span class="page-side-next-name">${next.label} →</span>
          </a>
        ` : `
          <a href="../index.html" class="page-side-next">
            <span class="page-side-next-label">读完了</span>
            <span class="page-side-next-name">回首页 →</span>
          </a>
        `}
      </div>
    </aside>
  `;
  layout.insertAdjacentHTML('afterbegin', sidebar);
  initChapterAccordion(chapters, chapterData);
}

function initChapterAccordion(chapters, chapterData) {
  const sideChapters = document.querySelectorAll('.page-side-chapter');

  function openChapter(ch) {
    // 关闭所有
    chapters.forEach(c => c.classList.remove('is-open'));
    sideChapters.forEach(sc => {
      sc.classList.remove('is-active');
      const toc = sc.querySelector('.page-side-toc');
      if (toc) toc.style.display = 'none';
    });
    // 打开目标
    ch.classList.add('is-open');
    const sc = document.querySelector(`[data-chapter-id="${ch.id}"]`);
    if (sc) {
      sc.classList.add('is-active');
      const toc = sc.querySelector('.page-side-toc');
      if (toc) toc.style.display = '';
    }
    // 重新触发 reveal 动画
    if (window.HE_initReveal) window.HE_initReveal();
  }

  // 点击章节 header 切换
  chapters.forEach(ch => {
    const header = ch.querySelector('.page-chapter-header');
    if (!header) return;
    header.addEventListener('click', () => {
      if (ch.classList.contains('is-open')) {
        ch.classList.remove('is-open');
        const sc = document.querySelector(`[data-chapter-id="${ch.id}"]`);
        if (sc) {
          sc.classList.remove('is-active');
          const toc = sc.querySelector('.page-side-toc');
          if (toc) toc.style.display = 'none';
        }
      } else {
        openChapter(ch);
        setTimeout(() => ch.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
    });
  });

  // 点击侧栏章节链接
  sideChapters.forEach(sc => {
    const link = sc.querySelector('.page-side-chapter-link');
    if (!link) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const ch = document.getElementById(sc.dataset.chapterId);
      if (!ch) return;
      openChapter(ch);
      setTimeout(() => ch.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    });
  });

  // Scroll spy: 高亮当前可见小节
  initChapterTocSpy(chapterData);
}

function initChapterTocSpy(chapterData) {
  if (!('IntersectionObserver' in window)) return;
  const tocLinks = document.querySelectorAll('.page-side-toc-link');
  const setActive = (id) => {
    tocLinks.forEach(l => l.classList.toggle('is-active', l.dataset.tocId === id));
  };
  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

  chapterData.forEach(ch => {
    ch.sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
  });
}

// 暴露给页面
window.HE_GROUPS = GROUPS;
window.HE_SECTIONS = SECTIONS;
window.HE_initReveal = initReveal;
window.HE_resolveContext = resolveContext;
window.HE_groupIndex = groupIndex;
window.HE_nextGroup = nextGroup;

document.addEventListener('DOMContentLoaded', () => {
  injectNav();

  // 检测：是否为手风琴章节页面
  const hasChapters = document.querySelectorAll('.page-chapter').length > 0;
  if (hasChapters) {
    injectChapterSidebar();
  } else {
    injectSidebar();
    buildToc();
  }

  injectFooter();
  initReveal();
});
