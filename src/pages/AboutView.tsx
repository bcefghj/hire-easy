import { ExternalLink } from 'lucide-react';

export function AboutView() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        关于聘易 HireEasy
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        智联招聘首届全国AI创新大赛 · AI+招聘赛道
      </p>

      <div className="space-y-6">
        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">项目简介</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            聘易 HireEasy 是面向中小企业的 AI 招聘全流程助手。中国 90% 的企业是中小微企业，
            但 78% 年度招聘预算低于 5 万元，大多没有专职 HR。聘易通过四个 AI Agent 
            （JD Agent / Screen Agent / Interview Agent / Compliance Agent）组成虚拟招聘团队，
            让企业主像跟 HR 对话一样完成从发布职位到录用候选人的全流程。
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">三大技术创新</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                1. Harness 架构（借鉴 Claude Code）
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                参考 Anthropic Claude Code 的 QueryEngine 编排模式（46K 行 TypeScript）、
                Tool Protocol 权限门控、StreamingToolExecutor 读写分离并发、
                coordinatorMode 纯 prompt 多 Agent 编排等工程模式，
                构建招聘场景下的 Agent Harness 框架。
              </p>
              <p className="text-xs text-gray-400 mt-1">
                参考来源：DEV Community 源码分析 / Artinoid / Zylos Research
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                2. 四层记忆系统（融合 Claude Code + Hermes Agent）
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                静态规则（company-profile.md，类似 CLAUDE.md）→ 会话记忆 → 
                自动招聘洞察（hire-insights.json，类似 Auto-Memory / MEMORY.md）→ 
                可复用招聘技能（recruitment-skills/，类似 Hermes Skills 自动生成）。
                记忆达 80% 容量时自动整合（参考 Hermes Agent 整合机制）。
              </p>
              <p className="text-xs text-gray-400 mt-1">
                参考来源：Claude Wiki / Hermes Agent 文档 / vectorize.io / mem0.ai
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                3. 合规引擎
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                基于中国《个人信息保护法》第28条、《就业促进法》和 EU AI Act（2026.8.2生效），
                内置 JD 偏见检测器、候选人数据最小化策略、操作审计日志和"80% 规则"公平性仪表盘。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">市场数据</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '90%', label: '中小微企业占比' },
              { value: '2507亿', label: '2026年在线招聘市场' },
              { value: '78%', label: '企业年度招聘预算<5万' },
              { value: '127份', label: '每岗平均无效简历' },
              { value: '45天', label: '传统招聘平均周期' },
              { value: '38.5%', label: '小企在线招聘渗透率' },
            ].map((item) => (
              <div key={item.label} className="py-3">
                <p className="text-xl font-bold" style={{ color: 'var(--brand)' }}>
                  {item.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-300 mt-3">
            数据来源：i人事 / 中国经济网 / 凤凰网 / 行研图表
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">对标产品</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { name: 'Atlast', desc: 'AI-Native Hiring for Small Teams, 多Agent架构', url: 'https://atlasthq.com' },
              { name: 'AiTento', desc: 'AI-Powered Hiring Without a TA Team', url: 'https://aitento.com' },
              { name: 'Aurelia', desc: '50-200人企业招聘方案, 18h/岗→7h/岗', url: 'https://aurelia.jobs' },
              { name: 'Mosaic', desc: 'AI语音面试+15亿profiles, $149-699/月', url: 'https://gomosaic.me' },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-3 rounded-lg border border-gray-100 hover:border-[var(--brand)] transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                </div>
                <ExternalLink size={14} className="text-gray-300 mt-0.5" />
              </a>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">参赛信息</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs">参赛者</p>
              <p className="text-gray-700">戴尚好</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">院校</p>
              <p className="text-gray-700">中国科学技术大学</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">赛道</p>
              <p className="text-gray-700">AI + 招聘</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">技术栈</p>
              <p className="text-gray-700">React + Vite + TypeScript + MiniMax API</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
