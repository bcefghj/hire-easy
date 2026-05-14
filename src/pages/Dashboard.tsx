import { useAppStore, type AgentType } from '../stores/appStore';
import { AGENTS } from '../data/agents';
import { DEMO_JOB_LIST } from '../data/demoData';
import {
  Users,
  FileText,
  ShieldCheck,
  TrendingUp,
  Clock,
  ChevronRight,
  CheckCircle,
  PauseCircle,
  XCircle,
} from 'lucide-react';

const STAT_CARDS = [
  { label: '在招岗位', value: '3', delta: '+2 本周', icon: <FileText size={20} />, color: '#0067ED' },
  { label: '收到简历', value: '153', delta: '+45 本周', icon: <Users size={20} />, color: '#10B981' },
  { label: '合规检查', value: '12', delta: '0 风险', icon: <ShieldCheck size={20} />, color: '#EF4444' },
  { label: '效率提升', value: '60%', delta: '对比传统', icon: <TrendingUp size={20} />, color: '#F59E0B' },
];

const STATUS_MAP = {
  active: { label: '招聘中', color: '#10B981', icon: <CheckCircle size={14} /> },
  paused: { label: '已暂停', color: '#F59E0B', icon: <PauseCircle size={14} /> },
  closed: { label: '已关闭', color: '#94A3B8', icon: <XCircle size={14} /> },
} as const;

export function Dashboard() {
  const { setAgent, chatHistory } = useAppStore();

  const jdChats = chatHistory.filter(m => m.agent === 'jd').length;
  const screenChats = chatHistory.filter(m => m.agent === 'screen').length;
  const interviewChats = chatHistory.filter(m => m.agent === 'interview').length;
  const complianceChats = chatHistory.filter(m => m.agent === 'compliance').length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          欢迎回来，星辰教育
        </h2>
        <p className="text-gray-500 mt-1">
          您的 AI 招聘团队已就绪，目前有 3 个岗位正在招聘中
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
              <span className="text-xs text-green-500 font-medium">{card.delta}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">岗位管理</h3>
            <span className="text-xs text-gray-400">{DEMO_JOB_LIST.length} 个岗位</span>
          </div>
          <div className="divide-y divide-gray-50">
            {DEMO_JOB_LIST.map((job) => {
              const st = STATUS_MAP[job.status as keyof typeof STATUS_MAP];
              return (
                <div key={job.title} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{job.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1" style={{ color: st.color }}>
                        {st.icon} {st.label}
                      </span>
                      <span>{job.candidates} 份简历</span>
                      <span className="text-[var(--brand)]">{job.matched} 人匹配</span>
                      <span className="flex items-center gap-0.5"><Clock size={11} /> {job.days} 天</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAgent('screen')}
                    className="text-xs text-[var(--brand)] hover:underline flex items-center gap-0.5"
                  >
                    查看 <ChevronRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900">Agent 活跃度</h3>
          </div>
          <div className="p-5 space-y-4">
            {([
              { key: 'jd' as AgentType, count: jdChats },
              { key: 'screen' as AgentType, count: screenChats },
              { key: 'interview' as AgentType, count: interviewChats },
              { key: 'compliance' as AgentType, count: complianceChats },
            ]).map(({ key, count }) => {
              const agent = AGENTS[key];
              const maxCount = Math.max(jdChats, screenChats, interviewChats, complianceChats, 1);
              const pct = (count / maxCount) * 100;
              return (
                <button
                  key={key}
                  onClick={() => setAgent(key)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 group-hover:text-[var(--brand)] transition-colors">
                      {agent.icon} {agent.title}
                    </span>
                    <span className="text-xs text-gray-400">{count} 条对话</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: agent.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
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
                    <p className="text-xs text-[var(--brand)] mt-2">
                      点击查看示例对话 →
                    </p>
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
