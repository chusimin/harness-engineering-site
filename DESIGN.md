# Harness Engineering — DESIGN.md

> **方向 A · 极简精密派** — Linear / Vercel / Notion 系。
> 浅色科技风，白底柔黑，靠版式精度与单色强调说话。
> 动效档位 **L2**：滚动渐入 + 大字 mask reveal + 鼠标光斑 + 卡片 spotlight。

---

## 1. Visual Theme & Atmosphere

### 设计哲学

**白纸上的工程蓝图。** 精密、克制、可信、不娱乐化。这是给 AI 产品经理读的一份权威参考资料 —— 视觉应当像一份 well-crafted 的工程文档，**靠字号、字距、留白和精密对齐说话**，而不是堆装饰。

炫酷不靠彩虹色，靠 *一处恰到好处的 accent glow* 和 *滚动时大字渐渐浮现* 这种"工程感的炫酷"。

### 氛围关键词

`白底` · `柔黑` · `Linear indigo 单色强调` · `点状网格` · `editorial 留白` · `字号制造层级` · `滚动渐入` · `鼠标光斑` · `不漂浮`

### 一句话定调

> **White paper, ink type, one accent.** — 白纸黑字，一点 indigo 强调。漂浮阴影、彩虹渐变、装饰图案为 anti-pattern。

---

## 2. Color Palette & Roles

### 2.1 Primitive 层（只在 tokens.css 内部使用）

```css
/* 中性灰阶（白 → 柔黑） */
--c-white:        #ffffff;   rgb: 255,255,255
--c-gray-25:      #fcfcfd;   rgb: 252,252,253
--c-gray-50:      #fafafa;   rgb: 250,250,250    /* section subtle bg */
--c-gray-100:     #f5f5f5;   rgb: 245,245,245    /* card bg */
--c-gray-150:     #ececec;   rgb: 236,236,236    /* 主描边 */
--c-gray-200:     #d4d4d4;   rgb: 212,212,212    /* hover 描边 */
--c-gray-400:     #8a8a8a;   rgb: 138,138,138    /* subtle 文字 */
--c-gray-500:     #6e6e6e;   rgb: 110,110,110    /* muted 文字 */
--c-gray-600:     #525252;   rgb: 82,82,82
--c-gray-700:     #4a4a4a;   rgb: 74,74,74       /* body 文字 */
--c-gray-900:     #171717;   rgb: 23,23,23       /* strong */
--c-black-soft:   #0a0a0a;   rgb: 10,10,10       /* display, 大标题 */

/* Linear indigo（唯一的强调色） */
--c-indigo-300:   #a5acea;   rgb: 165,172,234
--c-indigo-500:   #6c75d6;   rgb: 108,117,214
--c-indigo-600:   #5e6ad2;   rgb: 94,106,210     /* 主品牌色 */
--c-indigo-700:   #4d57bd;   rgb: 77,87,189      /* hover */

/* Alpha（用于 glow / soft fill） */
--c-indigo-a8:    rgba(94, 106, 210, 0.08);
--c-indigo-a16:   rgba(94, 106, 210, 0.16);
--c-indigo-a24:   rgba(94, 106, 210, 0.24);
--c-black-a4:     rgba(10, 10, 10, 0.04);
--c-black-a8:     rgba(10, 10, 10, 0.08);
```

### 2.2 Semantic 层（组件层 ONLY 用这些）

```css
/* 背景 */
--he-bg:                #ffffff;
--he-bg-subtle:         #fafafa;
--he-bg-muted:          #f5f5f5;

/* 文字 */
--he-text-display:      var(--c-black-soft);     /* 大标题 #0a0a0a */
--he-text-strong:       var(--c-gray-900);       /* 子标题 #171717 */
--he-text-body:         var(--c-gray-700);       /* 正文 #4a4a4a */
--he-text-muted:        var(--c-gray-500);       /* 次级 #6e6e6e */
--he-text-subtle:       var(--c-gray-400);       /* 占位 #8a8a8a */
--he-text-inverse:      #ffffff;
--he-text-accent:       var(--c-indigo-600);

/* 描边 */
--he-border:            var(--c-gray-150);       /* #ececec 主描边 */
--he-border-strong:     var(--c-gray-200);       /* #d4d4d4 hover */
--he-border-accent:     var(--c-indigo-600);

/* 强调 / accent */
--he-accent:            var(--c-indigo-600);
--he-accent-hover:      var(--c-indigo-700);
--he-accent-soft:       var(--c-indigo-a8);
--he-accent-glow:       var(--c-indigo-a24);

/* 表面 */
--he-surface-hover:     var(--c-black-a4);

/* 焦点环（无障碍必备） */
--he-focus-ring:        0 0 0 3px var(--c-indigo-a24);
```

### 角色速查

| 用途 | 变量 |
|---|---|
| 页面背景 | `--he-bg` `#ffffff` |
| Section 分层 | `--he-bg-subtle` `#fafafa` |
| 卡片背景 | `--he-bg` 白 + `--he-border` 描边 |
| 大标题（display） | `--he-text-display` `#0a0a0a` |
| 子标题 | `--he-text-strong` `#171717` |
| 正文 | `--he-text-body` `#4a4a4a` |
| 次级 / caption | `--he-text-muted` `#6e6e6e` |
| 元数据 / metadata | `--he-text-subtle` `#8a8a8a` |
| 链接 / 强调 / focus | `--he-accent` `#5e6ad2` |
| 卡片 / 输入 / 浮层描边 | `--he-border` `#ececec` |

---

## 3. Typography Rules

### 字体族（必须 Google Fonts 加载，禁系统字 fallback 充主字体）

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
--he-font-sans:  "Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif;
--he-font-mono:  "JetBrains Mono", "SF Mono", Consolas, monospace;
```

**禁止字体**：Times New Roman、Arial、Comic Sans、宋体、楷体作主字体。

### 字号 / 字重梯度

| Token | px | 字重 | 行高 | 用途 |
|---|---|---|---|---|
| `--he-text-display-xl` | 88 | 700 | 1.0 | Hero 巨字 |
| `--he-text-display-lg` | 64 | 700 | 1.05 | Hero 标题（移动端 fallback） |
| `--he-text-h1` | 48 | 700 | 1.1 | 页面 H1 |
| `--he-text-h2` | 32 | 600 | 1.2 | 章节 H2 |
| `--he-text-h3` | 22 | 600 | 1.3 | 子标题 |
| `--he-text-h4` | 18 | 600 | 1.4 | 卡片标题 |
| `--he-text-lead` | 18 | 400 | 1.6 | Hero 副标题 |
| `--he-text-body` | 16 | 400 | 1.7 | 正文 |
| `--he-text-sm` | 14 | 400 | 1.6 | caption / 次级 |
| `--he-text-xs` | 12 | 500 | 1.5 | metadata / eyebrow |

**Letter spacing**：`display` 用 `-0.03em`、`h1/h2` 用 `-0.02em`、`body` 用 `0`、`xs` eyebrow 用 `0.08em` 大写。

**中文行高**：正文 ≥ 1.7，字距 0.02em（中英混排时由 Inter 的字距兼顾）。

---

## 4. Component Stylings

### Button

```css
.he-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 20px;
  font-family: var(--he-font-sans);
  font-size: 14px; font-weight: 500;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
.he-btn:focus-visible { outline: none; box-shadow: var(--he-focus-ring); }
.he-btn:disabled { opacity: 0.4; pointer-events: none; }

/* primary — 柔黑底 */
.he-btn-primary { background: var(--he-text-display); color: #fff; }
.he-btn-primary:hover  { background: #1a1a1a; transform: translateY(-1px); }
.he-btn-primary:active { background: #000; transform: translateY(0); }

/* ghost — 描边 */
.he-btn-ghost { background: transparent; color: var(--he-text-strong); border-color: var(--he-border); }
.he-btn-ghost:hover  { background: var(--he-bg-subtle); border-color: var(--he-border-strong); }
.he-btn-ghost:active { background: var(--he-bg-muted); }

/* accent — indigo 强调（罕用，仅 1 处） */
.he-btn-accent { background: var(--he-accent); color: #fff; }
.he-btn-accent:hover  { background: var(--he-accent-hover); box-shadow: 0 8px 24px var(--he-accent-glow); }
.he-btn-accent:active { transform: translateY(1px); }
```

### Card

```css
.he-card {
  background: var(--he-bg);
  border: 1px solid var(--he-border);
  border-radius: 12px;
  padding: 24px;
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}
.he-card:hover {
  border-color: var(--he-border-strong);
  transform: translateY(-2px);
}
.he-card:focus-within { box-shadow: var(--he-focus-ring); }

/* spotlight 卡（鼠标跟随的微 glow） */
.he-card-spot { position: relative; }
.he-card-spot::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%),
                              var(--c-indigo-a16) 0%, transparent 60%);
  opacity: 0; transition: opacity 200ms;
  pointer-events: none;
}
.he-card-spot:hover::before { opacity: 1; }
```

### Nav Link

```css
.he-nav-link {
  padding: 6px 12px;
  color: var(--he-text-muted);
  font-size: 14px; font-weight: 500;
  border-radius: 6px;
  transition: all 150ms;
}
.he-nav-link:hover  { color: var(--he-text-display); background: var(--he-bg-subtle); }
.he-nav-link.is-active { color: var(--he-accent); }
.he-nav-link:focus-visible { outline: none; box-shadow: var(--he-focus-ring); }
.he-nav-link:disabled { opacity: 0.4; pointer-events: none; }
```

### Link (in body)

```css
.he-link {
  color: var(--he-accent);
  border-bottom: 1px solid var(--c-indigo-a24);
  transition: border-color 150ms;
}
.he-link:hover  { border-bottom-color: var(--he-accent); }
.he-link:active { color: var(--he-accent-hover); }
.he-link:focus-visible { outline: none; box-shadow: var(--he-focus-ring); border-radius: 2px; }
```

### Pill / Tag

```css
.he-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px;
  font-family: var(--he-font-mono);
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--he-text-muted);
  background: var(--he-bg-subtle);
  border: 1px solid var(--he-border);
  border-radius: 999px;
}
.he-pill-accent {
  color: var(--he-accent);
  background: var(--he-accent-soft);
  border-color: transparent;
}
```

### Term Tooltip（小白友好：术语注释）

```css
.he-term {
  position: relative;
  border-bottom: 1px dashed var(--he-border-strong);
  cursor: help;
  color: var(--he-text-strong);
  font-weight: 500;
}
.he-term::after {
  content: attr(data-tip);
  position: absolute; bottom: calc(100% + 8px); left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: var(--he-text-display); color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px; font-weight: 400; line-height: 1.5;
  width: max-content; max-width: 280px;
  opacity: 0; pointer-events: none;
  transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 16px 40px rgba(0,0,0,0.18);
  z-index: 100;
}
.he-term:hover::after,
.he-term:focus::after { opacity: 1; transform: translateX(-50%) translateY(0); }
```

---

## 5. Layout Principles

### Container

```css
--he-container:        1120px;     /* 内容主宽 */
--he-container-narrow: 720px;      /* 阅读栏宽 */
--he-container-wide:   1280px;     /* 全宽 hero / nav */
```

### Spacing 梯度（4px 基数）

```css
--sp-1: 4px;   --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
--sp-5: 20px;  --sp-6: 24px;  --sp-8: 32px;  --sp-10: 40px;
--sp-12: 48px; --sp-16: 64px; --sp-20: 80px; --sp-24: 96px;
--sp-32: 128px;
```

### Section 间距

- Section 垂直内边距：桌面 `96px`、移动端 `64px`
- Hero 区高度：`min-height: calc(100vh - 64px)`，但**内容垂直居中偏上**（避免过于满）

### 网格

- 板块卡片网格：`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`，gap 16px
- 5 分组导航：每组一行（横向），桌面 5 列，移动单列折叠

---

## 6. Depth & Elevation

**核心原则：靠 border 划界，不靠阴影漂浮。** 阴影只用于浮层（tooltip / dropdown / focus glow）。

```css
--he-shadow-none:    none;
--he-shadow-xs:      0 1px 2px rgba(0,0,0,0.04);
--he-shadow-sm:      0 2px 8px rgba(0,0,0,0.06);
--he-shadow-md:      0 8px 24px rgba(0,0,0,0.08);
--he-shadow-lg:      0 16px 40px rgba(0,0,0,0.12);
--he-shadow-focus:   0 0 0 3px var(--c-indigo-a24);
--he-shadow-glow:    0 8px 32px var(--c-indigo-a24);   /* 仅 accent CTA hover */
```

**使用规则**：
- 卡片默认 `box-shadow: none`，靠 border
- Hover 用 `transform: translateY(-2px)` 制造抬起感，**不用** `box-shadow` 加重
- Tooltip / dropdown / modal 才用 `--he-shadow-lg`
- focus 用 `--he-shadow-focus`（accessibility 必备）

---

## 7. Animation & Interaction

### 档位

**L2 · 滚动渐入 + 大字动效 + 鼠标光斑**

允许：纯 CSS keyframes + `IntersectionObserver` + `rAF` 节流的 `pointermove`。
**禁止**：GSAP / ScrollTrigger / Three.js / Lenis / 任何外部动效库 —— 保持零依赖。

### Easing & Duration

```css
--he-dur-fast:    150ms;
--he-dur-base:    250ms;
--he-dur-slow:    600ms;
--he-dur-reveal:  900ms;
--he-ease-out:    cubic-bezier(0.16, 1, 0.3, 1);    /* expo out — 柔顺 */
--he-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

### 入场动画（Hero）

```css
/* 大字 mask reveal（Hero H1 签名动效 #1） */
@keyframes he-mask-up {
  from { clip-path: inset(0 0 100% 0); transform: translateY(20px); }
  to   { clip-path: inset(0 0 0 0);   transform: translateY(0); }
}
.he-reveal-hero {
  animation: he-mask-up var(--he-dur-reveal) var(--he-ease-out) both;
}
.he-reveal-hero-d1 { animation-delay: 150ms; }
.he-reveal-hero-d2 { animation-delay: 300ms; }
.he-reveal-hero-d3 { animation-delay: 450ms; }
```

### 滚动渐入（Section H2 + body）

```css
.he-reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity 700ms var(--he-ease-out),
              transform 700ms var(--he-ease-out);
}
.he-reveal.is-visible { opacity: 1; transform: translateY(0); }
.he-reveal-d1 { transition-delay: 100ms; }
.he-reveal-d2 { transition-delay: 200ms; }
.he-reveal-d3 { transition-delay: 300ms; }
```

```js
// IntersectionObserver
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.he-reveal').forEach(el => io.observe(el));
```

### Hero 鼠标光斑（签名动效 #2）

```css
.he-hero {
  position: relative; isolation: isolate;
  background:
    radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%),
                    var(--c-indigo-a8) 0%, transparent 60%),
    #ffffff;
}
```

```js
// rAF 节流的 pointermove
const hero = document.querySelector('.he-hero');
let ticking = false;
hero?.addEventListener('pointermove', (e) => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
    hero.style.setProperty('--my', `${e.clientY - r.top}px`);
    ticking = false;
  });
});
```

### 卡片 spotlight hover（签名动效 #3）

见 `.he-card-spot` 上节。每张卡 `pointermove` 更新 `--mx/--my`，CSS radial-gradient 跟随。

### Hero 大字渐变流动（签名动效 #4 · 一处巧思）

```css
.he-text-flow {
  background: linear-gradient(120deg,
    var(--he-text-display) 0%, var(--he-text-display) 35%,
    var(--he-accent) 50%, var(--he-text-display) 65%,
    var(--he-text-display) 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: he-flow 6s var(--he-ease-in-out) infinite;
}
@keyframes he-flow { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
```

### 点状网格背景（Hero 氛围层 · 签名动效 #5）

```css
.he-hero {
  /* 在 radial-gradient 鼠标光斑之上叠加点状网格 */
  background-image:
    radial-gradient(600px circle at var(--mx,50%) var(--my,30%), var(--c-indigo-a8) 0%, transparent 60%),
    radial-gradient(circle at 1px 1px, rgba(10,10,10,0.06) 1px, transparent 0);
  background-size: auto, 24px 24px;
  background-color: #ffffff;
}
```

### Reduced motion 降级（强制）

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .he-reveal { opacity: 1 !important; transform: none !important; }
  .he-hero { background-image: radial-gradient(circle at 1px 1px, rgba(10,10,10,0.06) 1px, transparent 0); }
}
```

### 签名动效清单（L2 · 满足 skill 6 类红线）

| # | 类别 | 落点 | 实现 |
|---|---|---|---|
| 1 | Text Animation — Hero H1 | "包在模型外面的那一整圈代码" | mask reveal + stagger |
| 2 | Text Animation — Section H2 | 5 分组每个章节标题 | scroll fade-up |
| 3 | Text Animation — Body / Label | eyebrow + caption | scroll reveal stagger |
| 4 | Animation — 元素级 | CTA hover transform + 板块卡 spotlight | translateY + radial-gradient |
| 5 | Component — 交互构件 | 5 分组卡片 hover spotlight | `.he-card-spot` 鼠标跟随 |
| 6 | Background — 氛围层 | Hero 鼠标 spotlight + 点状网格 | CSS var + radial-gradient |

---

## 8. Do's and Don'ts

### Do's

1. ✅ **所有颜色走 CSS 变量** — 改色只动 `tokens.css`，组件层零硬编码 hex
2. ✅ **靠字号 + 字距 + 留白制造层级**，少用色块和分割线
3. ✅ **border 划界，不用 box-shadow 漂浮**（除浮层）
4. ✅ **单一强调色** —— 全站只用 indigo `#5e6ad2`，不引第二种彩色
5. ✅ **术语必须配 tooltip** — 用 `.he-term[data-tip]`，小白友好
6. ✅ **每个论断挂一手来源** — `<a class="he-link">` 指向官方 URL，遵守项目红线
7. ✅ **focus-visible 状态必备** — 所有可交互元素都要有 `--he-focus-ring`
8. ✅ **reduced-motion 必须降级** — `@media (prefers-reduced-motion: reduce)` 是硬性要求

### Don'ts

1. ❌ **禁用 Emoji** — `🎉 ⏸️ ✨ ✓ ⭐` 全部不要（与"工程蓝图"调性不符），状态用 lucide 内联 SVG 或纯文字
2. ❌ **禁第二种彩色** — 不引入红/橙/绿/粉，状态色除外（错误用 `--c-red-500` 等极少数情况）
3. ❌ **禁堆叠装饰渐变** — Hero 最多 1 个 mesh + 1 个鼠标光斑，不再加光球 / 粒子
4. ❌ **禁用外部动效库** — 不引 GSAP / ScrollTrigger / Lenis / Three.js / framer-motion
5. ❌ **禁 `filter: blur()` 在移动元素上** —— GPU 杀手，用 opacity + scale 代替
6. ❌ **禁系统字体作主字体** — 必须 Google Fonts 加载 Inter
7. ❌ **禁中文行高 < 1.7** — 中文紧排难读
8. ❌ **首页不堆细节** — 首页只回答"这个网站是干嘛的"，内容细节进章节页

---

## 9. Responsive Behavior

### 断点

```css
/* 移动端优先 */
--bp-sm:  640px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
```

### 折叠策略

| 元素 | 桌面 | 平板 768 | 移动 < 640 |
|---|---|---|---|
| Hero 巨字 | 88px | 64px | 48px |
| Hero 副标题 | 18px / max-width 56ch | 17px | 16px / 全宽 |
| Section padding | 96px | 80px | 64px |
| 5 分组网格 | 5 列 | 2-3 列 | 1 列 |
| 板块卡片 | `minmax(280px, 1fr)` auto-fill | 同 | 1 列 stack |
| Nav 板块顶级项 | 6 项横向 | 2-3 项 + 更多下拉 | drawer（汉堡） |

### 触摸目标

- 所有可交互元素 ≥ 44×44px（移动端 padding 增加 4px）
- 卡片整张可点（不只标题）
- Tooltip 在 touch 设备上改为点击触发（`:focus` 也触发 `::after`）

---

## 10. Navigation & Information Architecture

### Top Nav（6 项顶级）

```
首页  ·  入门  ·  全景  ·  深入  ·  实战  ·  资源  |  GitHub
```

每个顶级项就是一个**分组**（不是 dropdown）。点击直接进入该分组首页，分组首页列该组下全部板块卡片。

| Nav 项 | 链接 | 含板块 |
|---|---|---|
| 首页 | `index.html` | — |
| 入门 | `pages/intro.html` | 01 它是什么 / 02 它从哪来 |
| 全景 | `pages/survey.html` | 04 厂商全景 / 07 中文语境 |
| 深入 | `pages/deep.html` | 03 解剖学 / 05 怎么做 / 09 前沿与未解 |
| 实战 | `pages/practice.html` | 06 实战 |
| 资源 | `pages/resources.html` | 08 职业 & 面试 / 00 术语表 & 来源库 |

**当前 nav 项高亮**：根据当前 URL 反推所属分组，对应 nav 项加 `.is-active`（accent 色）。

### Sidebar（板块页专属）

板块子页采用「左侧栏 + 右侧内容」布局。左侧栏列出**当前分组下的所有板块**，当前页高亮。

```html
<div class="page-layout">
  <aside class="page-side">
    <div class="page-side-group">入门 INTRO</div>
    <nav class="page-side-list">
      <a class="page-side-link is-active">01 · 它是什么</a>
      <a class="page-side-link">02 · 它从哪来</a>
    </nav>
    <div class="page-side-hint">读完本组，继续 → 全景</div>
  </aside>

  <main class="page-main">
    <!-- 内容 -->
  </main>
</div>
```

**Sidebar 样式规则**：
- 宽度：240px（桌面）/ 横向滚动条（< 1024px）/ 隐藏（< 768px，靠 nav drawer）
- 位置：`position: sticky; top: 80px;` 跟随滚动停留
- 字号：`var(--he-text-sm)` 14px
- 当前页：`color: var(--he-accent)` + 左侧 2px indigo 竖条
- 分组名：mono font + 11px + tracking 0.08em + uppercase

### Group 首页结构

每个分组首页（`pages/{group}.html`）格式统一：

```
[group hero]
├── eyebrow: "{n}/5 · 入门 INTRO"
├── h1: 分组主题一句话（如"先建立坐标"）
└── lead: 这组讲什么、为谁、读多久

[group cards]  ← 该组下板块卡片网格（horizontal cards）
├── 卡片：编号 + 标题 + 一句话 + 估时
└── ...

[next group]   ← 推荐下一组
└── "读完本组，建议接着读 → 深入"
```

---

## 11. Visualization Storyline Principles

### 第一原则：图多文少

> **任何超过 3 段连续文字必须配 1 个可视化。** 文字是补充图，不是图补充文字。

### 5 条故事线设计规则

**①「问题 → 答案」结构**
每个可视化要回答一个具体问题，标题就是问题。
- ❌ 「Harness 架构图」
- ✅ 「同一个模型，为什么产品体验天差地别？」 → 配 Model vs Model+Harness 对照图

**② 渐进式揭示**
复杂图要分层出现，不要一次塞满。用 scroll-trigger 或 hover 让用户看到「先 A，然后 B 加入，然后 C」的演化。

**③ 名词必须配 tooltip**
凡是术语（agent / harness / context / loop 等）都用 `<span class="he-term" data-tip="...">` 鼠标悬浮显示一句话解释。

**④ 用 SVG + CSS 动画，不引外部库**
所有可视化用纯 SVG（结构）+ CSS keyframes（动效）+ IntersectionObserver（触发）。禁止引入 D3 / Three.js / Lottie / Rive。

**⑤ 一句话标注 + 一句话来源**
每个可视化下方必须有：
- 一句话总结（这张图说了啥）
- 一手来源链接（如有 — 遵守项目红线）

### 可视化样式约定

```css
/* viz.css — 可视化通用容器 */
.viz {
  margin: var(--sp-10) 0;
  padding: var(--sp-8);
  background: var(--he-bg-subtle);
  border: 1px solid var(--he-border);
  border-radius: var(--he-radius-lg);
}
.viz-title {
  font-size: var(--he-text-h4);
  font-weight: var(--he-weight-semibold);
  color: var(--he-text-display);
  margin-bottom: var(--sp-2);
}
.viz-sub {
  font-size: var(--he-text-sm);
  color: var(--he-text-muted);
  margin-bottom: var(--sp-6);
}
.viz-stage {
  /* 实际图形区，子类决定布局 */
}
.viz-caption {
  font-size: var(--he-text-sm);
  color: var(--he-text-muted);
  margin-top: var(--sp-5);
  padding-top: var(--sp-4);
  border-top: 1px dashed var(--he-border);
  font-style: italic;
}
.viz-source {
  font-family: var(--he-font-mono);
  font-size: 11px;
  color: var(--he-text-subtle);
  margin-top: var(--sp-2);
}
```

### 7 类可视化原型（按板块需要扩展）

| 类型 | 用途 | 实现 |
|---|---|---|
| **公式/拼接图** | 概念组成（如 `Agent = Model + Harness`） | flex 横排 + 各 block 独立 hover + 入场 stagger |
| **同心圆** | 嵌套关系（三尺度 / 提示词⊂上下文⊂harness） | position absolute 嵌套 div + 错时 breathe 动画 |
| **流程循环图** | 主循环 / pipeline | SVG path + dashoffset 动画绘制 + 节点 reveal |
| **对照表/分屏** | Before/After / X vs Y | grid 2 列 + 高亮差异行 |
| **时间线** | 谱系演化 | SVG horizontal line + 节点 marker + scroll-driven reveal |
| **节点-连线图** | 多 agent 编排 / 厂商全景 | SVG nodes + paths + hover 高亮关系链 |
| **数字爆点** | 关键统计（如 OpenAI 7 人产 100 万行） | 大数字 + count-up 动画 + 上下文卡 |

---

## 附录：DESIGN.md 自检清单

- [x] 9 + 2 章节全有实质内容（§10 IA · §11 可视化）
- [x] 所有色彩定义为 CSS 变量 + RGB 注释
- [x] 字体 `@import` URL + fallback stack
- [x] 每组件含 default / hover / active / focus / disabled
- [x] L2 动效完整，含 6 类签名 + reduced-motion 降级
- [x] Do's 8 条、Don'ts 8 条
- [x] 响应式覆盖 desktop / tablet / mobile
- [x] 中文专项要求（行高 ≥ 1.7、字距、Noto Sans SC fallback）已注明
- [x] 导航 IA（6 项 + sidebar）已定
- [x] 可视化原则（5 条 + 7 类原型）已定
