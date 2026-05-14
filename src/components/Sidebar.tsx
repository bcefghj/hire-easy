import { useAppStore, type ViewType, type AgentType } from '../stores/appStore';
import { AGENTS } from '../data/agents';
import {
  LayoutDashboard,
  Brain,
  Info,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS: { id: ViewType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: '仪表盘', icon: <LayoutDashboard size={18} /> },
  { id: 'memory', label: '记忆系统', icon: <Brain size={18} /> },
  { id: 'about', label: '关于', icon: <Info size={18} /> },
];

export function Sidebar() {
  const { currentView, currentAgent, setView, setAgent } = useAppStore();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10">
      <div className="p-5 border-b border-gray-100">
        <h1 className="text-xl font-bold" style={{ color: 'var(--brand)' }}>
          聘易
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">HireEasy · AI招聘助手</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <div className="px-3 mb-1">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
            导航
          </p>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5
                ${currentView === item.id && currentView !== 'chat'
                  ? 'bg-[var(--brand-light)] text-[var(--brand)] font-medium'
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="px-3 mt-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
            AI Agents
          </p>
          {(Object.keys(AGENTS) as AgentType[]).map((key) => {
            const agent = AGENTS[key];
            const isActive = currentView === 'chat' && currentAgent === key;
            return (
              <button
                key={key}
                onClick={() => setAgent(key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 group
                  ${isActive
                    ? 'bg-[var(--brand-light)] text-[var(--brand)] font-medium'
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <span className="text-base">{agent.icon}</span>
                <div className="flex-1 text-left">
                  <div className="text-sm">{agent.title}</div>
                </div>
                <ChevronRight
                  size={14}
                  className="opacity-0 group-hover:opacity-50 transition-opacity"
                />
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
        <p>聘易 HireEasy v1.0</p>
        <p className="mt-0.5">智联招聘AI创新大赛</p>
      </div>
    </aside>
  );
}
