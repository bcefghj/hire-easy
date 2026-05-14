import { useAppStore, type AgentType } from '../stores/appStore';
import { AGENTS } from '../data/agents';
import {
  Users,
  FileText,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const STAT_CARDS = [
  { label: '已处理岗位', value: '0', icon: <FileText size={20} />, color: '#0067ED' },
  { label: '已筛简历', value: '0', icon: <Users size={20} />, color: '#10B981' },
  { label: '合规检查', value: '0', icon: <ShieldCheck size={20} />, color: '#EF4444' },
  { label: '招聘效率提升', value: '60%', icon: <TrendingUp size={20} />, color: '#F59E0B' },
];

export function Dashboard() {
  const { setAgent } = useAppStore();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          欢迎使用聘易 HireEasy
        </h2>
        <p className="text-gray-500 mt-1">
          为没有专职HR的中小企业，提供AI驱动的招聘全流程助手
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.color + '15', color: card.color }}
              >
                {card.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Agent 团队</h3>
        <div className="grid grid-cols-2 gap-4">
          {(Object.keys(AGENTS) as AgentType[]).map((key) => {
            const agent = AGENTS[key];
            return (
              <button
                key={key}
                onClick={() => setAgent(key)}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--brand)] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{agent.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[var(--brand)] transition-colors">
                      {agent.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {agent.description}
                    </p>
                    <div className="flex gap-4 mt-3">
                      {agent.stats.map((s) => (
                        <div key={s.label} className="text-xs">
                          <span className="font-semibold text-gray-700">{s.value}</span>
                          <span className="text-gray-400 ml-1">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-2">
          💡 技术架构亮点
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">Harness 架构</p>
            <p className="text-gray-500 mt-1">
              借鉴 Claude Code 的 QueryEngine 编排模式，实现多Agent协同工作
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">四层记忆系统</p>
            <p className="text-gray-500 mt-1">
              融合 Hermes Agent 的自学习模式，企业招聘知识持续积累进化
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">合规引擎</p>
            <p className="text-gray-500 mt-1">
              基于《个人信息保护法》和 EU AI Act，内置偏见检测与80%规则
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
