# Harness Engineering · 官网

纯静态站点。零构建、零依赖、GitHub Pages 一键部署。

## 文件结构

```
harness-site/
├── index.html              首页（炫酷浅色科技感）
├── pages/
│   ├── _template.html      新板块模板 — 加内容时复制这个
│   ├── 01-what-is-it.html  ← 后续板块逐个加入这里
│   └── ...
├── assets/
│   ├── css/
│   │   ├── tokens.css      设计 Token（Primitive + Semantic 双层）
│   │   ├── base.css        Reset、typography、按钮、卡片、nav、footer
│   │   ├── home.css        首页专属（hero、同心圆、卡片网格）
│   │   └── page.css        子页专属（page hero、main body 排版）
│   └── js/
│       ├── layout.js       自动注入 nav + footer（含 10 板块清单）
│       └── home.js         首页板块卡片动态渲染
└── README.md               本文件
```

## 本地预览

任选一种：

```bash
# 方式 A：Python（系统自带）
cd harness-site
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000

# 方式 B：直接双击 index.html（90% 功能正常，nav 注入需要 server）
```

## 扩展（加新板块 / 新实战案例）

3 步：

1. **复制模板**：`cp pages/_template.html pages/10-新板块.html`
2. **改内容**：改 `<title>` / `.page-eyebrow` / `.page-title` / `.page-lead` 和 `<main>` 里的正文
3. **注册到导航**：在 [`assets/js/layout.js`](assets/js/layout.js) 的 `SECTIONS` 数组里加一条：

```js
{ num: '10', slug: '10-新板块', title: '新板块',
  desc: '一句话描述', group: '深入' },
```

加完自动出现在：顶部 nav 下拉、首页卡片网格、footer 链接 —— **不需要改任何 HTML**。

## 设计 Token 改色 / 改字号

只改 [`assets/css/tokens.css`](assets/css/tokens.css) 一个文件 —— 全站跟随。

- 改主色：`--color-indigo-600`
- 改背景：`--he-bg`
- 改字号：`--he-text-*`

## 部署到 GitHub Pages（框架定稿后）

```bash
cd harness-site
git init && git add . && git commit -m "init"
gh repo create harness-engineering --public --source=. --push
# GitHub 仓库 Settings → Pages → Source: main / root
```

## 小白友好的设计约定

- **名词必须带注释**：用 `<span class="he-term" data-tip="解释">术语</span>`，鼠标悬浮显示
- **图多文少**：长段文字必须配可视化（同心圆 / 流程图 / 对照表）
- **每页底部要有上一篇 / 下一篇导航**：用 `.page-nav` 组件
- **每个论断挂一手来源**：用 `<a href="...">[来源]</a>`，CLAUDE.md 的红线
