# 聘易 HireEasy — 中小企业AI招聘全流程助手

> 🏆 智联招聘首届全国AI创新大赛 · AI+招聘赛道参赛作品  
> 📍 在线体验：[https://bcefghj.github.io/hire-easy/](https://bcefghj.github.io/hire-easy/)

---

## 项目简介

**聘易 HireEasy** 是面向中小企业的 AI 招聘全流程助手。中国 90% 的企业是中小微企业，贡献了 80% 的城镇就业，但 78% 的中小企业年度招聘预算不到 5 万元，大多没有专职 HR。

聘易通过 **四个专业化 AI Agent** 组成虚拟招聘团队，让企业主像跟 HR 对话一样完成从发布职位到录用候选人的全流程。

### 核心理念

> 不是一个工具，是一整个 AI 招聘团队。

---

## 功能特性

### 🤖 四大 AI Agent

| Agent | 名称 | 核心功能 |
|-------|------|----------|
| 📝 JD Agent | 职位描述智能管家 | JD 智能生成、六维健康度诊断（完整性/清晰度/吸引力/合规性/SEO/偏见风险）、偏见扫描、一键优化 |
| 🔍 Screen Agent | 简历智能筛选 | 简历解析（PDF/Word）、多维度匹配评分（技能/经验/教育/软实力）、候选人排序、批量处理 |
| 🎤 Interview Agent | 面试助手 | 结构化面试题生成、面试评估表、反馈模板、面试技巧指导 |
| 🛡️ Compliance Agent | 合规卫士 | JD 合规检查、偏见检测（年龄/性别/地域歧视）、数据安全评估、"80% 规则"公平性监控 |

### 🧠 四层记忆系统

借鉴 [Claude Code](https://code.claude.com/) 和 [Hermes Agent](https://hermes-agent.nousresearch.com/) 的先进记忆架构：

| 层级 | 文件 | 功能 | 参考来源 |
|------|------|------|----------|
| 层 1：静态规则 | `company-profile.md` | 企业基本信息、行业、招聘偏好 | Claude Code 的 CLAUDE.md |
| 层 2：会话记忆 | Session Memory | 当前岗位对话历史和决策记录 | Claude Code Session Memory |
| 层 3：自动记忆 | `hire-insights.json` | 自动积累的招聘洞察 | Hermes Agent MEMORY.md |
| 层 4：学习进化 | `recruitment-skills/` | 从成功案例中提炼的可复用模式 | Hermes Agent Skills |

### ⚖️ 合规引擎

基于中国法律法规的招聘合规保障：

- **《个人信息保护法》第 28 条**：敏感信息单独同意
- **《就业促进法》**：禁止就业歧视
- **EU AI Act（2026.8.2 生效）**：招聘 AI 高风险系统要求
- **"80% 规则"仪表盘**：监控群体通过率公平性

---

## 技术架构

### Agent = Model + Harness

借鉴 2026 年 Agent 工程核心共识（来源：[Zylos Research](https://zylos.ai/research/2026-03-31-agent-harness-design-patterns)）：

```
用户界面层
    ↓
QueryEngine 编排引擎（会话生命周期管理、ReAct 循环）
    ↓
Tools 工具系统（每个工具独立 schema / 权限 / 并发控制）
    ↓
Context / Memory / State（四层记忆 + 三级压缩）
    ↓
Agent Collaboration（coordinatorMode 纯 prompt 编排多 Agent）
    ↓
Security Governance（权限门控 + 审计日志）
```

### Claude Code 架构映射

| Claude Code 模式 | 聘易 HireEasy 对应 |
|---|---|
| QueryEngine（46K 行，AsyncGenerator 接口） | 招聘会话引擎：管理从发 JD 到发 offer 的全流程状态 |
| Tool Protocol（独立 schema + 权限） | 招聘工具集：JD 生成/简历解析/匹配打分/合规检测 |
| StreamingToolExecutor（读写分离并发） | 并行处理多候选人简历筛选，JD 修改串行 |
| coordinatorMode.ts（纯 prompt 编排） | 招聘协调器：用 prompt 编排各子 Agent |
| bashSecurity.ts（23 项安全检查） | 候选人数据操作权限检查 |

---

## 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 前端框架 | React 19 + Vite 8 + TypeScript 6 | 类型安全，极速构建 |
| UI | Tailwind CSS 4 + Lucide Icons | 现代化设计系统 |
| AI 引擎 | MiniMax M2.7 API | 100 TPS 极速推理 |
| 状态管理 | Zustand + localStorage | 轻量级，支持记忆持久化 |
| 部署 | GitHub Pages (gh-pages) | 免费稳定 |

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装运行

```bash
# 克隆项目
git clone https://github.com/bcefghj/hire-easy.git
cd hire-easy

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 即可体验。

### 配置 AI API（可选）

创建 `.env` 文件：

```env
VITE_MINIMAX_API_KEY=your_minimax_api_key_here
```

未配置 API Key 时，系统使用内置示例数据演示完整功能。

### 部署到 GitHub Pages

```bash
npm run deploy
```

---

## 项目结构

```
hire-easy/
├── src/
│   ├── App.tsx                 # 主入口
│   ├── components/
│   │   └── Sidebar.tsx         # 侧边导航栏
│   ├── pages/
│   │   ├── Dashboard.tsx       # 仪表盘首页
│   │   ├── ChatView.tsx        # Agent 对话界面
│   │   ├── MemoryView.tsx      # 四层记忆系统
│   │   └── AboutView.tsx       # 关于页面
│   ├── stores/
│   │   └── appStore.ts         # Zustand 全局状态
│   ├── lib/
│   │   └── api.ts              # MiniMax API / 示例数据
│   └── data/
│       └── agents.ts           # Agent 配置定义
├── vite.config.ts              # Vite 配置（含 base path）
├── index.html
└── package.json
```

---

## 市场数据

| 指标 | 数据 | 来源 |
|------|------|------|
| 中小微企业占比 | 90% | 中国经济网 |
| 在线招聘市场规模（2026） | 2507 亿元 | 行研图表 |
| 中小企业招聘预算 < 5 万 | 78% | i人事 |
| 每岗平均无效简历 | 127 份 | i人事系统报告 |
| 传统招聘平均周期 | 45 天 | i人事系统报告 |
| 小微企业在线招聘渗透率 | 38.5% | 行研图表 |

### 使用聘易后效果预估

| 指标 | 提升幅度 |
|------|----------|
| 招聘周期 | **-60%**（45 天 → 19 天） |
| 招聘成本 | **-45%**（2 万 → 5400 元） |
| 人岗匹配率 | **+42%** |

---

## 对标产品

| 产品 | 定位 | 我们的差异 |
|------|------|------------|
| [Atlast](https://atlasthq.com) | AI-Native Hiring for Small Teams | 聘易面向中国市场，合规中国法律 |
| [AiTento](https://aitento.com) | AI-Powered Hiring Without a TA Team | 聘易借鉴 Claude Code 架构 |
| [Aurelia](https://aurelia.jobs) | 50-200 人企业招聘 | 聘易面向更小规模企业 |
| [Mosaic](https://gomosaic.me) | AI 语音面试 + 技能筛选 | 聘易提供完整招聘流程 |

---

## 商业模式

| 套餐 | 价格 | 功能 |
|------|------|------|
| 基础版 | 免费 | JD 生成/诊断（5 次/月），偏见检测 |
| 专业版 | ¥99/月 | 无限 JD + 简历筛选 + 面试题 |
| 企业版 | ¥299/月 | 全部功能 + 记忆系统 + 合规报告 |

---

## 参赛信息

| 项目 | 详情 |
|------|------|
| 大赛 | 智联招聘首届全国AI创新大赛 |
| 赛道 | AI + 招聘 |
| 参赛者 | 戴尚好 |
| 院校 | 中国科学技术大学 |
| 联系方式 | bcefghj@163.com |

---

## 参考文献

### 技术架构参考

- [Claude Code 源码分析](https://dev.to/lien_jp_db54b8b7fd9fa0118/claude-code-source-analysis-series-chapter-1-architecture-48d7) - DEV Community
- [Hermes Agent 记忆系统](https://vectorize.io/articles/hermes-agent-memory-explained) - vectorize.io
- [Agent Harness 设计模式](https://zylos.ai/research/2026-03-31-agent-harness-design-patterns) - Zylos Research
- [Production AI Agent Architecture](https://artinoid.com/blog/production-ai-agent-architecture-claude-code-lessons) - Artinoid
- [We Removed 80% of Our Agent's Tools](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools) - Vercel Engineering

### 合规法规参考

- 《中华人民共和国个人信息保护法》（2021）
- 《中华人民共和国就业促进法》（2015 修订）
- [EU AI Act](https://www.amcham.ro/business-intelligence/the-use-of-ai-systems-in-recruitment)（2026.8.2 生效）

### 市场数据来源

- [中国经济网 - 中小微企业就业数据](http://www.ce.cn/xwzx/gnsz/gdxw/202503/24/t20250324_39329282.shtml)
- [i人事 - 中小企业招聘效率报告](https://docs.ihr360.com/hr/374465)
- [凤凰网 - 主流招聘平台测评](https://biz.ifeng.com/c/8qAe3QdNgcg)

---

## License

MIT

---

<p align="center">
  <strong>聘易 HireEasy</strong> · 让每家小企业都有自己的 AI 招聘官
</p>
