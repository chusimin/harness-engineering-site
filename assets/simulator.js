/* =========================================================
   Harness Engineering · Generative UI Simulators
   3 scales: Component / Task / Organizational
   ========================================================= */

(function () {
  // ============== SIM 1: COMPONENT-LEVEL ==============
  const COMP_STEPS = [
    { actor: 'USER',         text: '<span class="h">写一段 Python 代码，读取 sales.csv 并算月度总和</span>',     tool: null },
    { actor: 'HARNESS',      text: '注入 system prompt + 加载历史会话上下文',                                  tool: 'context_loader' },
    { actor: 'HARNESS',      text: '准备工具集：<span class="c">read_file, write_file, exec_python</span>',     tool: 'tool_registry' },
    { actor: 'MODEL',        text: '思考：需要先读文件结构 → 调用 <span class="c">read_file(sales.csv)</span>', tool: 'read_file' },
    { actor: 'HARNESS',      text: '解析 tool_call → 鉴权（在白名单内）→ 执行',                                 tool: 'read_file' },
    { actor: 'TOOL',         text: '✓ 读取 1,234 行，列：[date, product, amount]',                              tool: 'read_file' },
    { actor: 'MODEL',        text: '生成 pandas 代码并 <span class="c">exec_python(...)</span>',                tool: 'exec_python' },
    { actor: 'HARNESS',      text: '沙箱内执行 → 超时 5s → 资源限制 256MB',                                     tool: 'exec_python' },
    { actor: 'TOOL',         text: '✓ 输出：12 行月度汇总。token: 1,847 · 耗时 2.1s',                          tool: 'exec_python' },
    { actor: 'HARNESS',      text: '上报 trace → 评测指标 +1 成功',                                              tool: 'observability' },
    { actor: 'MODEL',        text: '<span class="h">完成。已生成 monthly_sales 表，含 2026 年 12 个月数据。</span>', tool: null },
  ];

  const COMP_TOOLS = [
    { id: 'context_loader', label: 'context_loader' },
    { id: 'tool_registry',  label: 'tool_registry' },
    { id: 'read_file',      label: 'read_file' },
    { id: 'write_file',     label: 'write_file' },
    { id: 'exec_python',    label: 'exec_python' },
    { id: 'observability',  label: 'observability' },
  ];

  function initComp() {
    const log = document.getElementById('sim-comp-log');
    const tools = document.getElementById('sim-comp-tools');
    const btn = document.getElementById('sim-comp-btn');
    if (!log || !btn) return;

    // Render tool palette
    if (tools) {
      tools.innerHTML = COMP_TOOLS.map(t => `
        <div class="sim-tool" data-tool="${t.id}">
          <span class="sim-tool-icon"></span>${t.label}
        </div>
      `).join('');
    }

    let running = false;
    let timers = [];

    function reset() {
      log.innerHTML = '';
      timers.forEach(t => clearTimeout(t));
      timers = [];
      btn.classList.remove('is-running', 'is-done');
      btn.textContent = '▶ 启动模拟';
      document.querySelectorAll('#sim-comp-tools .sim-tool').forEach(t => t.classList.remove('is-active'));
      running = false;
    }

    function run() {
      if (running) { reset(); return; }
      reset();
      running = true;
      btn.classList.add('is-running');
      btn.textContent = '● 运行中…';

      COMP_STEPS.forEach((step, i) => {
        const t = setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'sim-log-line is-active';
          line.innerHTML = `
            <span class="sim-log-step">${i + 1}</span>
            <div class="sim-log-content">
              <div class="sim-log-actor">${step.actor}</div>
              <div class="sim-log-text">${step.text}</div>
            </div>
          `;
          log.appendChild(line);
          log.scrollTop = log.scrollHeight;

          requestAnimationFrame(() => line.classList.add('is-in'));

          // Highlight tool
          document.querySelectorAll('#sim-comp-tools .sim-tool').forEach(el => el.classList.remove('is-active'));
          if (step.tool) {
            const el = document.querySelector(`#sim-comp-tools .sim-tool[data-tool="${step.tool}"]`);
            if (el) el.classList.add('is-active');
          }

          // Mark previous step as done
          const prev = log.children[i - 1];
          if (prev) { prev.classList.remove('is-active'); prev.classList.add('is-done'); }

          // Done
          if (i === COMP_STEPS.length - 1) {
            setTimeout(() => {
              line.classList.remove('is-active');
              line.classList.add('is-done');
              btn.classList.remove('is-running');
              btn.classList.add('is-done');
              btn.textContent = '✓ 完成 · 重新运行';
              document.querySelectorAll('#sim-comp-tools .sim-tool').forEach(el => el.classList.remove('is-active'));
              running = false;
            }, 800);
          }
        }, i * 750);
        timers.push(t);
      });
    }

    btn.addEventListener('click', run);
  }

  // ============== SIM 2: TASK-LEVEL ==============
  const TASK_AGENTS = [
    { name: 'PLANNER',     role: '分解任务', dur: 1200 },
    { name: 'READER',      role: '读 CSV',   dur: 1200 },
    { name: 'CLASSIFIER',  role: '分类反馈', dur: 1600 },
    { name: 'SUMMARIZER',  role: '生成摘要', dur: 1400 },
    { name: 'WRITER',      role: '写成报告', dur: 1800 },
  ];

  const TASK_OUTPUT = [
    { delay: 0,    text: '\n# 用户反馈洞察报告\n\n' },
    { delay: 600,  text: '## 概览\n· 共处理 1,234 条反馈\n' },
    { delay: 1000, text: '· 时间窗口：2026 Q1\n· 处理耗时：6.8s\n\n' },
    { delay: 1400, text: '## 主题分布\n· 性能问题 38%\n' },
    { delay: 1700, text: '· 功能请求 27%\n· UI 体验 19%\n· Bug 报告 16%\n\n' },
    { delay: 2100, text: '## 关键洞察\n1. 性能投诉集中在大文件上传\n' },
    { delay: 2400, text: '2. 用户要求"批量导出"功能高频\n3. 移动端 UI 体验显著差于桌面\n' },
  ];

  function initTask() {
    const flow = document.getElementById('sim-task-flow');
    const output = document.getElementById('sim-task-output');
    const btn = document.getElementById('sim-task-btn');
    if (!flow || !btn) return;

    flow.innerHTML = TASK_AGENTS.map(a => `
      <div class="sim-agent" data-name="${a.name}">
        <div class="sim-agent-name">${a.name}</div>
        <div class="sim-agent-role">${a.role}</div>
        <div class="sim-agent-status">IDLE</div>
      </div>
    `).join('');

    let running = false;
    let timers = [];

    function reset() {
      timers.forEach(t => clearTimeout(t));
      timers = [];
      flow.querySelectorAll('.sim-agent').forEach(el => {
        el.classList.remove('is-running', 'is-done');
        el.querySelector('.sim-agent-status').textContent = 'IDLE';
      });
      output.innerHTML = '<div class="sim-task-output-label">FINAL REPORT</div><div class="sim-task-output-text"></div>';
      btn.classList.remove('is-running', 'is-done');
      btn.textContent = '▶ 启动模拟';
      running = false;
    }

    function run() {
      if (running) { reset(); return; }
      reset();
      running = true;
      btn.classList.add('is-running');
      btn.textContent = '● 运行中…';

      let acc = 0;
      const els = flow.querySelectorAll('.sim-agent');
      TASK_AGENTS.forEach((a, i) => {
        const t1 = setTimeout(() => {
          els[i].classList.add('is-running');
          els[i].querySelector('.sim-agent-status').textContent = 'RUNNING';
        }, acc);
        timers.push(t1);
        const t2 = setTimeout(() => {
          els[i].classList.remove('is-running');
          els[i].classList.add('is-done');
          els[i].querySelector('.sim-agent-status').textContent = 'DONE';
        }, acc + a.dur);
        timers.push(t2);
        acc += a.dur;
      });

      // Stream output
      const outputText = output.querySelector('.sim-task-output-text');
      const cursor = document.createElement('span');
      cursor.className = 'sim-task-output-cursor';
      outputText.parentElement.appendChild(cursor);

      let buffer = '';
      const startStream = acc - 1800; // start streaming during last agent
      TASK_OUTPUT.forEach(seg => {
        const t = setTimeout(() => {
          buffer += seg.text;
          outputText.innerHTML = `<span class="typed">${buffer.replace(/\n/g, '<br>')}</span>`;
        }, startStream + seg.delay);
        timers.push(t);
      });

      const tDone = setTimeout(() => {
        cursor.remove();
        btn.classList.remove('is-running');
        btn.classList.add('is-done');
        btn.textContent = '✓ 完成 · 重新运行';
        running = false;
      }, acc + 1200);
      timers.push(tDone);
    }

    btn.addEventListener('click', run);
  }

  // ============== SIM 3: ORGANIZATIONAL ==============
  const ORG_EVENTS = [
    { tag: 't-ok',   text: 'Agent #042 完成任务 [pricing/analyze] · 1,832 tokens' },
    { tag: 't-info', text: 'A/B 实验「new_prompt_v3」分流 5% 流量启动' },
    { tag: 't-ok',   text: 'Agent #017 完成任务 [user/onboarding] · 4,210 tokens' },
    { tag: 't-warn', text: 'Agent #023 重试 [retry 1/3] · 网络超时' },
    { tag: 't-ok',   text: 'Agent #023 重试成功 · 2,104 tokens' },
    { tag: 't-info', text: '评测集 eval_set_q1 跑分：92.3 (+1.4 vs baseline)' },
    { tag: 't-ok',   text: 'Agent #088 完成任务 [report/weekly] · 6,872 tokens' },
    { tag: 't-err',  text: 'Agent #051 [permission_denied] · 已转人工' },
    { tag: 't-ok',   text: 'Agent #102 完成任务 [data/clean] · 3,156 tokens' },
    { tag: 't-info', text: '上线 prompt_v3.2 · 灰度 100%' },
    { tag: 't-ok',   text: 'Agent #009 完成任务 [code/review] · 2,498 tokens' },
    { tag: 't-warn', text: 'Token 用量预警：本小时已达预算 78%' },
    { tag: 't-ok',   text: 'Agent #033 完成任务 [doc/summary] · 1,654 tokens' },
    { tag: 't-info', text: '新 Agent 部署：support_bot_v2 · 已上线' },
  ];

  function initOrg() {
    const feed = document.getElementById('sim-org-feed');
    const btn = document.getElementById('sim-org-btn');
    const mActive = document.getElementById('m-active');
    const mQps = document.getElementById('m-qps');
    const mSuccess = document.getElementById('m-success');
    const mTokens = document.getElementById('m-tokens');
    const bars = document.getElementById('sim-org-bars');
    if (!feed || !btn) return;

    let running = false;
    let timers = [];

    function setBars(values) {
      bars.innerHTML = values.map(v => `<div class="sim-bar" style="height: ${v}%;"></div>`).join('');
    }

    function reset() {
      timers.forEach(t => clearTimeout(t));
      timers = [];
      // Reset to "asleep" state
      feed.innerHTML = '<div class="sim-feed-label">LIVE AGENT FEED · 等待启动…</div>';
      if (mActive) mActive.textContent = '0';
      if (mQps) mQps.textContent = '0';
      if (mSuccess) mSuccess.textContent = '—';
      if (mTokens) mTokens.textContent = '0';
      setBars([5,8,6,10,7,9,5,11,8,6,9,7]);
      btn.classList.remove('is-running', 'is-done');
      btn.textContent = '▶ 启动模拟';
      running = false;
    }

    function pushFeed() {
      const items = feed.querySelectorAll('.sim-feed-item');
      if (items.length > 12) items[items.length - 1].remove();

      const evt = ORG_EVENTS[Math.floor(Math.random() * ORG_EVENTS.length)];
      const now = new Date();
      const time = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0') + ':' + String(now.getSeconds()).padStart(2,'0');
      const item = document.createElement('div');
      item.className = 'sim-feed-item';
      item.innerHTML = `
        <span class="sim-feed-time">${time}</span>
        <span class="sim-feed-tag ${evt.tag}">${evt.tag.replace('t-','').toUpperCase()}</span>
        <span class="sim-feed-text">${evt.text}</span>
      `;
      const label = feed.querySelector('.sim-feed-label');
      label.insertAdjacentElement('afterend', item);
    }

    function updateMetrics(t) {
      // Live metrics over time
      const active = 38 + Math.floor(Math.sin(t * 0.5) * 6 + Math.random() * 4);
      const qps = 18 + Math.floor(Math.sin(t * 0.8) * 5 + Math.random() * 4);
      const success = (96.5 + Math.sin(t * 0.3) * 1.4 + Math.random() * 0.6).toFixed(1);
      const tokens = (1.2 + t * 0.04 + Math.random() * 0.05).toFixed(2);
      if (mActive) mActive.textContent = active;
      if (mQps) mQps.textContent = qps;
      if (mSuccess) mSuccess.textContent = success + '%';
      if (mTokens) mTokens.textContent = tokens + 'M';

      // Bars
      const vals = [];
      for (let i = 0; i < 12; i++) {
        vals.push(20 + Math.sin(t * 0.4 + i * 0.6) * 25 + Math.random() * 30 + 20);
      }
      setBars(vals);
    }

    function run() {
      if (running) { reset(); return; }
      reset();
      running = true;
      btn.classList.add('is-running');
      btn.textContent = '● 实时监控中…';

      feed.innerHTML = '<div class="sim-feed-label">LIVE AGENT FEED · 实时</div>';

      let tick = 0;
      const tickInterval = setInterval(() => {
        tick++;
        updateMetrics(tick);
        if (tick % 2 === 0) pushFeed();

        if (tick > 16) {
          clearInterval(tickInterval);
          btn.classList.remove('is-running');
          btn.classList.add('is-done');
          btn.textContent = '✓ 演示完成 · 重新运行';
          running = false;
        }
      }, 700);
      timers.push({ clear: () => clearInterval(tickInterval) });
    }

    reset();
    btn.addEventListener('click', run);
  }

  // ============== TAB SWITCHER ==============
  function initTabs() {
    const tabs = document.querySelectorAll('.sim-tab');
    const panels = document.querySelectorAll('.sim');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        panels.forEach((p, j) => {
          p.style.display = (j === i) ? 'block' : 'none';
        });
      });
    });

    // Init: show first
    panels.forEach((p, j) => { p.style.display = (j === 0) ? 'block' : 'none'; });
    if (tabs[0]) tabs[0].classList.add('is-active');
  }

  // ============== INIT ALL ==============
  document.addEventListener('DOMContentLoaded', () => {
    initComp();
    initTask();
    initOrg();
    initTabs();
  });
})();
