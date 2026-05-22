/* =========================================================
   Harness Engineering · Generative UI Simulators v2
   3 scales with detailed case-based steps showing harness work
   ========================================================= */

(function () {

  // ============================================
  // STEP COMPONENT — 6 大组件标签
  // 1=上下文管理 2=记忆系统 3=Agent 循环 4=执行边界 5=工具生态 6=评测+可观测
  // ============================================

  // ============== SIM 1: 组件级 · 电商客服查耳机 ==============
  const COMP_STEPS = [
    {
      n: 1, comp: '上下文管理', tag: '装桌面',
      title: '装桌面',
      text: '把 <code>system prompt</code>（"你是 XX 品牌客服，语气亲切，不准透露内部系统名"）+ 用户这句话 + 可用工具列表，装进上下文窗口。',
      duration: 1400
    },
    {
      n: 2, comp: '记忆系统', tag: '补背景',
      title: '补背景',
      text: '查记忆库，发现：<mark>"该用户上周投诉过物流慢，VIP 等级"</mark>。补入上下文 —— 模型知道要语气更小心、优先给解决方案。',
      duration: 1600
    },
    {
      n: 3, comp: 'Agent 循环', tag: '模型想',
      title: '模型想',
      text: '模型看完桌面，决定：<mark>调用「订单查询 API」</mark>，参数是用户手机号 + 最近订单。输出一个 tool call。',
      duration: 1600
    },
    {
      n: 4, comp: '执行边界', tag: '过安检',
      title: '过安检',
      text: '沙箱：<mark>订单查询是只读接口，放行</mark>。审批策略：不需要问人。Hook：检查参数里没带敏感字段，放行。',
      duration: 1500
    },
    {
      n: 5, comp: '工具生态', tag: '动手',
      title: '动手',
      text: '订单 API 返回：<mark>"已发货，顺丰 SF1234567，预计明天到"</mark>。结果回流进上下文。',
      duration: 1700
    },
    {
      n: 3, comp: 'Agent 循环', tag: '模型再想', loop: '↻ 第 2 圈',
      title: '模型再想',
      text: '模型拿到物流信息，组织一段话回复用户。判断<mark>任务完成，循环停</mark>。总共只转了 <b>2 圈</b>。',
      duration: 1800
    },
    {
      n: 6, comp: '评测 + 可观测', tag: '全程记账',
      title: '全程记账',
      text: '记录：响应耗时 1.2s、消耗 850 tokens、调了 1 次工具。用户点了「已解决」→ 这条进 CSAT 指标。',
      duration: 1400
    },
  ];

  const COMP_REPLY = '您好！您上周下单的耳机已发货 ✨ 顺丰快递 SF1234567，预计<b>明天</b>送达。前几天的物流问题已经反馈给运营，给您 VIP 加 30 积分以表歉意 🙏';

  // ============== SIM 2: 任务级 · Claude Code 修 bug ==============
  const TASK_STEPS = [
    {
      n: 1, comp: '上下文管理', tag: '装桌面',
      title: '装桌面',
      text: '装入 <code>CLAUDE.md</code>（项目规则："用 TypeScript，pnpm 不用 npm，PR 前必须跑 lint"）+ 用户指令 + 代码仓库目录结构 + 工具列表。',
      duration: 1500
    },
    {
      n: 2, comp: '记忆系统', tag: '补背景',
      title: '补背景',
      text: '查 <code>MEMORY.md</code>，发现："上次改过 auth 模块，用的 JWT + refresh token 方案；登录逻辑在 <code>src/auth/login.ts</code>"。补入上下文，省得从头翻仓库。',
      duration: 1700
    },
    {
      n: 3, comp: 'Agent 循环', tag: '模型规划',
      title: '模型规划',
      text: '模型制定计划：<mark>读错误日志 → 定位报错文件 → 读代码 → 修复 → 跑测试</mark>。第一步：调用 Bash 工具读日志。',
      duration: 1800
    },
    {
      n: 4, comp: '执行边界', tag: '过安检',
      title: '过安检',
      text: '读日志是只读操作，<mark>放行</mark>。但如果后面模型要跑 <code>rm</code> 或改 production config，沙箱会拦截、审批策略会弹窗问人。',
      duration: 1500
    },
    {
      n: 5, comp: '工具生态', tag: '动手',
      title: '动手',
      text: 'Bash 执行，日志返回：<mark>"TokenExpiredError at login.ts:42"</mark>。结果回流进上下文。',
      duration: 1700
    },
    {
      loop: '↻ 第 2 圈',
      n: 3, comp: 'Agent 循环', tag: '模型再想',
      title: '模型再想',
      text: '看到错误定位，决定：<mark>读 <code>login.ts</code> 第 42 行附近代码</mark>。',
      duration: 1500
    },
    {
      loop: '↻ 第 3–4 圈',
      n: 3, comp: 'Agent 循环', tag: '修复',
      title: '修复',
      text: '读完代码发现 token 过期判断写反了。模型决定<mark>调用 Edit 工具改代码</mark>。→ 执行边界：写操作，<b>弹窗问人确认</b> → 用户同意 → 写入。',
      duration: 2000
    },
    {
      loop: '↻ 第 5–6 圈',
      n: 3, comp: 'Agent 循环', tag: '验证',
      title: '验证',
      text: '模型跑 <code>pnpm test</code>（记得 CLAUDE.md 说不用 npm）→ 测试全过 → 跑 lint → 通过。判断<mark>任务完成，循环停</mark>。总共转了 <b>约 6 圈</b>。',
      duration: 1900
    },
    {
      n: 6, comp: '评测 + 可观测', tag: '全程记账',
      title: '全程记账',
      text: 'Trace 记录了完整修复路径（6 步、4 次工具调用、花了 <b>12K tokens</b>）。Golden set 里有"登录相关 bug"的回归用例，下次发版前自动跑一遍确认不会改回去。',
      duration: 1500
    },
  ];

  // ============== SIM 3: 组织级 · 电商 AI 客服平台 ==============
  const ORG_STEPS = [
    {
      n: 1, comp: '上下文管理', tag: '装桌面 · 路由层',
      title: '装桌面 · 路由层',
      text: '路由 agent 先判断意图：<mark>这条涉及退货 + 投诉 + VIP 补偿</mark>，需要调度给「退货专员 agent」和「投诉专员 agent」。每个子 agent 被装入各自的专业 prompt（退货政策 / 补偿权限表）。',
      duration: 1900
    },
    {
      n: 2, comp: '记忆系统', tag: '多层记忆',
      title: '多层记忆',
      text: '<b>组织级记忆</b>：退货政策文档、物流合作方列表（所有 agent 共享）。<br><b>用户级记忆</b>：该用户是 VIP3、上月买过两部手机、上次投诉给了 50 元券。<br>两层记忆分别注入对应的子 agent 上下文。',
      duration: 2200
    },
    {
      n: 3, comp: 'Agent 循环', tag: '多 agent 协作',
      title: '多 agent 协作',
      text: '退货专员 agent 自己转了 <b>3 圈</b>（查订单 → 生成退货单 → 安排取件）。投诉专员 agent 转了 <b>2 圈</b>（查补偿记录 → 决定补偿方案）。<mark>路由 agent 汇总两边结果</mark>，合成一条完整回复。',
      duration: 2400
    },
    {
      n: 4, comp: '执行边界', tag: '组织级策略',
      title: '组织级策略',
      text: '<b>硬规则</b>：退款 > 500 元必须人工审批 → 这单手机 3999 元，<mark>自动升级给人工主管</mark>。<br><b>Hook</b>：所有回复经过合规检查 —— 不准透露内部系统名、不准承诺超出政策的补偿。<br><b>沙箱</b>：agent 只能调退货系统和 CRM，碰不到财务系统。',
      duration: 2400
    },
    {
      n: 5, comp: '工具生态', tag: '十几个系统',
      title: '十几个系统',
      text: '订单系统、物流 API、CRM、退款接口、优惠券系统、工单系统、短信网关…… <mark>十几个工具</mark>，按角色分配给不同子 agent（退货专员只能碰订单+物流，碰不到优惠券）。',
      duration: 2000
    },
    {
      n: 6, comp: '评测 + 可观测', tag: '全局仪表盘',
      title: '全局仪表盘',
      text: '<b>全链路 trace</b>：一个用户请求串起路由 agent + 2 个子 agent + 1 次人工升级，带同一个 trace ID。<br><b>成本归因</b>：按团队、按功能、按用户等级分别统计 token 消耗。<br><b>质量仪表盘</b>：自动解决率 72%、人工升级率 18%、CSAT 4.2/5、平均处理时长 45s。<br><b>异常告警</b>：退货专员 agent 的失败率突然从 3% 涨到 15% —— 物流 API 挂了，自动告警。',
      duration: 2400
    },
  ];

  // Org-level live metrics (run during sim)
  const ORG_AGENTS_DATA = [
    { id: 'router',    name: '路由 agent',       role: '意图分类', state: 'idle' },
    { id: 'refund',    name: '退货专员',          role: '查订单→退货单→取件', state: 'idle' },
    { id: 'complaint', name: '投诉专员',          role: '查补偿记录→方案',     state: 'idle' },
    { id: 'compliance',name: '合规 Hook',         role: '合规检查',             state: 'idle' },
    { id: 'human',     name: '人工主管',          role: '高金额审批',           state: 'idle' },
  ];

  // ============== RENDER HELPERS ==============

  const COMP_COLORS = {
    1: '#a5acea', 2: '#fbbf24', 3: '#DEDBC8', 4: '#f87171', 5: '#4ade80', 6: '#94a3b8'
  };

  function renderStep(step, idx, isActive) {
    const color = COMP_COLORS[step.n] || '#DEDBC8';
    return `
      <div class="step ${isActive ? 'is-active' : ''}" data-idx="${idx}">
        ${step.loop ? `<div class="step-loop">${step.loop}</div>` : ''}
        <div class="step-row">
          <div class="step-badge" style="background: ${color};">${step.n}</div>
          <div class="step-body">
            <div class="step-head">
              <span class="step-comp" style="color: ${color};">${step.comp}</span>
              <span class="step-dot">·</span>
              <span class="step-title">${step.title}</span>
            </div>
            <div class="step-text">${step.text}</div>
          </div>
        </div>
      </div>
    `;
  }

  function buildSim(simEl, steps, opts) {
    opts = opts || {};
    const container = simEl.querySelector('.sim-steps');
    const btn = simEl.querySelector('.sim-btn');
    const aside = simEl.querySelector('.sim-aside');
    const progress = simEl.querySelector('.sim-progress-fill');

    container.innerHTML = steps.map((s, i) => renderStep(s, i, false)).join('');

    let running = false;
    let timers = [];
    let currentIdx = -1;

    function clearTimers() { timers.forEach(t => clearTimeout(t)); timers = []; }

    function reset() {
      clearTimers();
      running = false;
      currentIdx = -1;
      container.querySelectorAll('.step').forEach(el => {
        el.classList.remove('is-active', 'is-done');
      });
      if (progress) progress.style.width = '0%';
      if (aside && opts.resetAside) opts.resetAside(aside);
      btn.classList.remove('is-running', 'is-done');
      btn.innerHTML = '▶ 启动模拟';
    }

    function step(i) {
      if (i >= steps.length) {
        btn.classList.remove('is-running');
        btn.classList.add('is-done');
        btn.innerHTML = '✓ 演示完成 · 重新运行';
        running = false;
        if (opts.onDone) opts.onDone(aside);
        return;
      }
      const stepEl = container.children[i];
      // Mark prev done
      if (i > 0) {
        const prev = container.children[i - 1];
        prev.classList.remove('is-active');
        prev.classList.add('is-done');
      }
      stepEl.classList.add('is-active');

      // Scroll into view
      stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Update progress
      if (progress) {
        const pct = ((i + 1) / steps.length) * 100;
        progress.style.width = pct + '%';
      }

      // Side effect callback
      if (opts.onStep) opts.onStep(steps[i], i, aside);

      currentIdx = i;
      const dur = steps[i].duration || 1500;
      const t = setTimeout(() => step(i + 1), dur);
      timers.push(t);
    }

    btn.addEventListener('click', () => {
      if (running) { reset(); return; }
      reset();
      running = true;
      btn.classList.add('is-running');
      btn.innerHTML = '● 运行中…';
      step(0);
    });

    reset();
  }

  // ============== INIT EACH SIM ==============

  function initSim1() {
    const sim = document.getElementById('sim-comp');
    if (!sim) return;

    buildSim(sim, COMP_STEPS, {
      resetAside(aside) {
        aside.querySelector('.reply-content').innerHTML = '<div class="reply-placeholder">等待 agent 回复…</div>';
        aside.querySelectorAll('.meta-val').forEach(el => el.textContent = '—');
      },
      onStep(s, i, aside) {
        // Show running metric updates
        const cost = aside.querySelector('[data-meta="cost"]');
        const tokens = aside.querySelector('[data-meta="tokens"]');
        const tools = aside.querySelector('[data-meta="tools"]');
        const time = aside.querySelector('[data-meta="time"]');
        if (cost) cost.textContent = '¥' + (0.012 * (i + 1)).toFixed(3);
        if (tokens) tokens.textContent = (120 * (i + 1)) + '';
        if (tools) tools.textContent = (i >= 4 ? '1' : '0') + '';
        if (time) time.textContent = (0.15 * (i + 1)).toFixed(2) + 's';
      },
      onDone(aside) {
        aside.querySelector('.reply-content').innerHTML = COMP_REPLY;
        const time = aside.querySelector('[data-meta="time"]');
        const tokens = aside.querySelector('[data-meta="tokens"]');
        if (time) time.textContent = '1.2s';
        if (tokens) tokens.textContent = '850';
      }
    });
  }

  function initSim2() {
    const sim = document.getElementById('sim-task');
    if (!sim) return;

    buildSim(sim, TASK_STEPS, {
      resetAside(aside) {
        aside.querySelector('.fs-content').innerHTML = '<div class="fs-placeholder">等待修复…</div>';
        aside.querySelectorAll('.meta-val').forEach(el => el.textContent = '—');
        // reset loop counter
        const loop = aside.querySelector('[data-meta="loop"]');
        if (loop) loop.textContent = '0';
      },
      onStep(s, i, aside) {
        const loop = aside.querySelector('[data-meta="loop"]');
        const tokens = aside.querySelector('[data-meta="tokens"]');
        const tools = aside.querySelector('[data-meta="tools"]');
        const cost = aside.querySelector('[data-meta="cost"]');

        // Determine loop count from steps marked with loop label
        let loopCount = 1;
        for (let j = 0; j <= i; j++) {
          const ll = TASK_STEPS[j].loop;
          if (ll) {
            const m = ll.match(/(\d+)/g);
            if (m) loopCount = parseInt(m[m.length - 1]);
          }
        }
        if (loop) loop.textContent = loopCount;
        if (tokens) tokens.textContent = (1800 * (i + 1) + Math.floor(Math.random() * 400)) + '';
        if (tools) tools.textContent = Math.min(i + 1, 4) + '';
        if (cost) cost.textContent = '¥' + (0.05 * (i + 1)).toFixed(3);

        // Update file system view based on step
        const fs = aside.querySelector('.fs-content');
        if (i === 4 && fs) {
          fs.innerHTML = `
            <div class="fs-line is-current">📄 src/auth/<b>login.ts</b>:42</div>
            <div class="fs-line">  ⚠ TokenExpiredError</div>
            <div class="fs-line is-comment">  // 错误：判断写反了</div>
          `;
        }
        if (i === 6 && fs) {
          fs.innerHTML = `
            <div class="fs-line is-edit">📝 src/auth/<b>login.ts</b>:42 · 编辑</div>
            <div class="fs-line is-removed">- if (token.exp > now) throw new TokenExpiredError</div>
            <div class="fs-line is-added">+ if (token.exp < now) throw new TokenExpiredError</div>
          `;
        }
        if (i === 7 && fs) {
          fs.innerHTML = `
            <div class="fs-line is-ok">✓ pnpm test · 142 passed</div>
            <div class="fs-line is-ok">✓ pnpm lint · clean</div>
            <div class="fs-line is-ok">✓ 任务完成</div>
          `;
        }
      },
      onDone(aside) {
        const tokens = aside.querySelector('[data-meta="tokens"]');
        const tools = aside.querySelector('[data-meta="tools"]');
        const cost = aside.querySelector('[data-meta="cost"]');
        const loop = aside.querySelector('[data-meta="loop"]');
        if (tokens) tokens.textContent = '12,083';
        if (tools) tools.textContent = '4';
        if (cost) cost.textContent = '¥0.36';
        if (loop) loop.textContent = '6';
      }
    });
  }

  function initSim3() {
    const sim = document.getElementById('sim-org');
    if (!sim) return;

    // Render agent network in aside
    const aside = sim.querySelector('.sim-aside');
    if (aside) {
      const agentsHtml = `
        <div class="org-aside-h">
          <span class="org-aside-h-label">AGENT 网络</span>
          <span class="org-aside-h-pulse"></span>
        </div>
        <div class="org-agents" id="org-agents">
          ${ORG_AGENTS_DATA.map(a => `
            <div class="org-agent" data-id="${a.id}">
              <div class="org-agent-name">${a.name}</div>
              <div class="org-agent-role">${a.role}</div>
              <div class="org-agent-state">IDLE</div>
            </div>
          `).join('')}
        </div>
        <div class="org-aside-h">
          <span class="org-aside-h-label">实时仪表盘</span>
        </div>
        <div class="org-metrics">
          <div class="org-metric"><div class="org-metric-label">自动解决率</div><div class="org-metric-val" data-meta="solve">—</div></div>
          <div class="org-metric"><div class="org-metric-label">人工升级</div><div class="org-metric-val" data-meta="escalate">—</div></div>
          <div class="org-metric"><div class="org-metric-label">CSAT</div><div class="org-metric-val" data-meta="csat">—</div></div>
          <div class="org-metric"><div class="org-metric-label">耗时</div><div class="org-metric-val" data-meta="dur">—</div></div>
        </div>
        <div class="org-aside-h">
          <span class="org-aside-h-label">最终回复</span>
        </div>
        <div class="org-reply" id="org-reply"><div class="reply-placeholder">等待 agent 队伍处理…</div></div>
      `;
      aside.innerHTML = agentsHtml;
    }

    buildSim(sim, ORG_STEPS, {
      resetAside(aside) {
        if (!aside) return;
        aside.querySelectorAll('.org-agent').forEach(a => {
          a.classList.remove('is-active', 'is-done');
          a.querySelector('.org-agent-state').textContent = 'IDLE';
        });
        aside.querySelectorAll('[data-meta]').forEach(el => el.textContent = '—');
        const reply = aside.querySelector('#org-reply');
        if (reply) reply.innerHTML = '<div class="reply-placeholder">等待 agent 队伍处理…</div>';
      },
      onStep(s, i, aside) {
        if (!aside) return;
        const agents = aside.querySelectorAll('.org-agent');
        // Activate different agents at different steps
        const sequences = [
          ['router'],                                          // step 0: routing
          ['router'],                                          // step 1: memory load
          ['refund', 'complaint'],                             // step 2: multi-agent
          ['compliance', 'human'],                             // step 3: boundary
          ['refund', 'complaint'],                             // step 4: tools
          ['router'],                                          // step 5: monitoring
        ];
        const activeIds = sequences[i] || [];
        agents.forEach(a => {
          const id = a.dataset.id;
          if (activeIds.includes(id)) {
            a.classList.add('is-active');
            a.querySelector('.org-agent-state').textContent = 'RUNNING';
          } else if (a.classList.contains('is-active')) {
            a.classList.remove('is-active');
            a.classList.add('is-done');
            a.querySelector('.org-agent-state').textContent = 'DONE';
          }
        });

        // Update metrics on last step
        if (i >= 5) {
          const solve = aside.querySelector('[data-meta="solve"]');
          const escalate = aside.querySelector('[data-meta="escalate"]');
          const csat = aside.querySelector('[data-meta="csat"]');
          const dur = aside.querySelector('[data-meta="dur"]');
          if (solve) solve.textContent = '72%';
          if (escalate) escalate.textContent = '18%';
          if (csat) csat.textContent = '4.2';
          if (dur) dur.textContent = '45s';
        }
      },
      onDone(aside) {
        if (!aside) return;
        aside.querySelectorAll('.org-agent').forEach(a => {
          a.classList.remove('is-active');
          a.classList.add('is-done');
          a.querySelector('.org-agent-state').textContent = 'DONE';
        });
        const reply = aside.querySelector('#org-reply');
        if (reply) {
          reply.innerHTML = `
            <p>您好！抱歉给您带来困扰。鉴于您是 VIP3 客户：</p>
            <p style="margin-top: 8px;">✓ <b>退货单已生成</b>，顺丰明日上门取件</p>
            <p>✓ <b>补偿方案</b>：50 元代金券已发放到账户</p>
            <p>✓ 因金额较大已升级<b>人工主管</b>处理，1 小时内联系您</p>
          `;
        }
      }
    });
  }

  // ============== TAB SWITCHER ==============

  function initTabs() {
    const tabs = document.querySelectorAll('.sim-tab');
    const sims = document.querySelectorAll('.sim');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        sims.forEach(s => {
          s.style.display = (s.id === target) ? 'block' : 'none';
        });
      });
    });

    // Init
    sims.forEach((s, i) => { s.style.display = (i === 0) ? 'block' : 'none'; });
    if (tabs[0]) tabs[0].classList.add('is-active');
  }

  // ============== HISTORY EVOLUTION SIMULATOR ==============
  // For history.html — demonstrate why each layer was insufficient

  const HIST_PROMPT_STEPS = [
    { actor: 'USER',   text: '帮我修一下登录页 500 错误。' },
    { actor: 'PROMPT', text: '【提示词】请扮演一个高级工程师，帮我分析这个 500 错误可能是什么原因。' },
    { actor: 'MODEL',  text: '500 错误通常意味着服务端异常。可能原因：① 数据库连接失败 ② 未捕获的异常 ③ 配置错误…',
                       gap: true, gapText: '⚠ 但模型不知道你的代码长什么样、不能读日志、不能跑测试。'},
  ];

  const HIST_CONTEXT_STEPS = [
    { actor: 'USER',   text: '帮我修一下登录页 500 错误。' },
    { actor: 'CTX',    text: '【上下文工程】检索代码库 → 找到 login.ts → 检索最近报错日志 → 拼成上下文。' },
    { actor: 'MODEL',  text: '根据 login.ts 第 42 行和日志 TokenExpiredError，问题在 token 过期判断写反了。建议改成 `<`。',
                       gap: true, gapText: '⚠ 但模型只能"建议"，不能真的去改代码、跑测试、回滚错误的修改。'},
  ];

  const HIST_HARNESS_STEPS = [
    { actor: 'USER',    text: '帮我修一下登录页 500 错误。' },
    { actor: 'HARNESS', text: '装桌面 + 补记忆 → 模型规划 → 调 Bash 读日志 → 过沙箱审批 → 读 login.ts → 模型修复 → 弹窗问人 → Edit 工具改码 → 跑 test → 跑 lint。' },
    { actor: 'MODEL',   text: '已修复，跑过所有 142 个测试。trace ID #abc123，token 用量 12K。',
                        success: true }
  ];

  function buildHistEvo(simId, steps, layerName) {
    const sim = document.getElementById(simId);
    if (!sim) return;
    const container = sim.querySelector('.evo-steps');
    const btn = sim.querySelector('.sim-btn');
    if (!container || !btn) return;

    function reset() {
      container.innerHTML = '';
      btn.classList.remove('is-running', 'is-done');
      btn.innerHTML = '▶ 启动模拟';
    }

    function run() {
      reset();
      btn.classList.add('is-running');
      btn.innerHTML = '● 运行中…';

      steps.forEach((s, i) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'evo-step';
          div.innerHTML = `
            <div class="evo-actor">${s.actor}</div>
            <div class="evo-bubble ${s.success ? 'is-success' : ''}">${s.text}</div>
          `;
          container.appendChild(div);

          if (s.gap) {
            setTimeout(() => {
              const gap = document.createElement('div');
              gap.className = 'evo-gap';
              gap.innerHTML = s.gapText;
              container.appendChild(gap);
            }, 600);
          }

          if (i === steps.length - 1) {
            setTimeout(() => {
              btn.classList.remove('is-running');
              btn.classList.add('is-done');
              btn.innerHTML = '✓ 演示完成 · 重新运行';
            }, 600);
          }
        }, i * 1300);
      });
    }

    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-running')) return;
      run();
    });
    reset();
  }

  function initHistEvo() {
    buildHistEvo('hist-prompt',  HIST_PROMPT_STEPS,  '提示词工程');
    buildHistEvo('hist-context', HIST_CONTEXT_STEPS, '上下文工程');
    buildHistEvo('hist-harness', HIST_HARNESS_STEPS, '驾驭工程');
  }

  // ============== VENDOR SIMULATOR ==============
  // For vendors.html — each vendor has a click-to-run mini demo

  const VENDOR_SIMS = {
    'claude-code': [
      '装桌面：CLAUDE.md + 用户指令 + 仓库目录',
      '调度 sub-agent：「设计-架构师」并行思考 3 种方案',
      'Agent 循环：选定方案，Plan mode 输出计划',
      '执行边界：危险命令弹窗确认',
      '工具：Edit / Bash / Read / Glob / Grep',
      '观测：所有操作进 trace + 可回滚',
      '✓ Anthropic harness 三个尺度全覆盖（组件→任务→组织）'
    ],
    'codex': [
      '云端启动沙箱容器（每次干净环境）',
      '装桌面：repo + 用户 issue',
      'Agent 循环：自主多步骤，无人值守',
      '工具：Shell / Editor / Browser',
      '执行边界：容器隔离 + 时间预算',
      '输出：PR-style diff 给人审',
      '✓ 任务级 harness 标杆（独立任务自闭环）'
    ],
    'cursor': [
      '装桌面：当前文件 + 仓库索引',
      'Agent 循环：Composer 模式可多文件改',
      '工具：Edit / Search / Lint',
      '上下文：@ 提及调出文件、符号、文档',
      '执行边界：diff 视图人审',
      '✓ 组件级深度集成 IDE（强 PM-AI 同屏体验）'
    ],
    'windsurf': [
      '装桌面：当前编辑会话 + Memories',
      'Cascade 模式：多步推理跨文件',
      '工具：Edit / Run / Search',
      '记忆系统：Flow Memories（持久跨会话）',
      '执行边界：写操作 review',
      '✓ 任务级 harness（强记忆持续性）'
    ],
    'devin': [
      '云端完整工程师工作台启动',
      '装桌面：项目克隆 + Shell + 浏览器 + 编辑器',
      'Agent 循环：长任务 1-8 小时自主推进',
      '工具：Shell / Editor / Browser（全栈）',
      '执行边界：人类可中断 + Slack 通信',
      '观测：实时视频回放 + 任务进度',
      '✓ 组织级 harness 雏形（长期独立 SWE）'
    ]
  };

  function initVendorSims() {
    document.querySelectorAll('[data-vendor-sim]').forEach(el => {
      const vendorKey = el.dataset.vendorSim;
      const steps = VENDOR_SIMS[vendorKey];
      if (!steps) return;

      const btn = el.querySelector('.vsim-btn');
      const log = el.querySelector('.vsim-log');
      if (!btn || !log) return;

      let timers = [];

      function reset() {
        timers.forEach(t => clearTimeout(t));
        timers = [];
        log.innerHTML = '<div class="vsim-empty">点击启动看一次完整运行…</div>';
        btn.classList.remove('is-running', 'is-done');
        btn.innerHTML = '▶ 模拟运行';
      }

      function run() {
        log.innerHTML = '';
        btn.classList.add('is-running');
        btn.innerHTML = '● 运行中…';

        steps.forEach((text, i) => {
          const t = setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'vsim-line';
            const isLast = (i === steps.length - 1);
            if (isLast) line.classList.add('is-result');
            line.innerHTML = `<span class="vsim-num">${String(i + 1).padStart(2, '0')}</span><span class="vsim-text">${text}</span>`;
            log.appendChild(line);
            log.scrollTop = log.scrollHeight;

            if (isLast) {
              setTimeout(() => {
                btn.classList.remove('is-running');
                btn.classList.add('is-done');
                btn.innerHTML = '✓ 完成 · 重新运行';
              }, 400);
            }
          }, i * 700);
          timers.push(t);
        });
      }

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-running')) { reset(); return; }
        if (btn.classList.contains('is-done')) { run(); return; }
        run();
      });
      reset();
    });
  }

  // ============== INIT ==============
  document.addEventListener('DOMContentLoaded', () => {
    initSim1();
    initSim2();
    initSim3();
    initTabs();
    initHistEvo();
    initVendorSims();
  });
})();
