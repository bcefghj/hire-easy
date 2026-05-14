import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { Save, Database, BookOpen, Cpu, FileText } from 'lucide-react';

export function MemoryView() {
  const { companyProfile, hireInsights, updateCompanyProfile } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(companyProfile);

  function handleSave() {
    updateCompanyProfile(form);
    setEditing(false);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">四层记忆系统</h2>
      <p className="text-gray-500 text-sm mb-6">
        借鉴 Claude Code 和 Hermes Agent 的记忆架构，聘易会持续学习您的招聘偏好
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          {
            icon: <FileText size={20} />,
            title: '层 1：静态规则',
            subtitle: 'company-profile.md',
            desc: '企业基本信息与招聘偏好（类似 Claude Code 的 CLAUDE.md）',
            ref: 'Claude Code CLAUDE.md',
            color: '#0067ED',
            count: companyProfile.name ? '已配置' : '未配置',
          },
          {
            icon: <Database size={20} />,
            title: '层 2：会话记忆',
            subtitle: 'Session Memory',
            desc: '当前招聘岗位的对话历史和决策记录（上下文窗口内）',
            ref: 'Claude Code Session Memory',
            color: '#10B981',
            count: '实时',
          },
          {
            icon: <BookOpen size={20} />,
            title: '层 3：自动记忆',
            subtitle: 'hire-insights.json',
            desc: '自动积累的招聘洞察：哪些JD转化率高、面试问题区分度好',
            ref: 'Hermes Agent MEMORY.md',
            color: '#8B5CF6',
            count: `${hireInsights.length} 条洞察`,
          },
          {
            icon: <Cpu size={20} />,
            title: '层 4：学习进化',
            subtitle: 'recruitment-skills/',
            desc: '从成功案例中提炼可复用模式（如：Python后端岗最佳JD模板）',
            ref: 'Hermes Agent Skills',
            color: '#F59E0B',
            count: '自动生成',
          },
        ].map((layer) => (
          <div
            key={layer.title}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: layer.color + '15',
                  color: layer.color,
                }}
              >
                {layer.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {layer.title}
                </h4>
                <p className="text-xs text-gray-400 font-mono">
                  {layer.subtitle}
                </p>
              </div>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: layer.color + '15',
                  color: layer.color,
                }}
              >
                {layer.count}
              </span>
            </div>
            <p className="text-sm text-gray-500">{layer.desc}</p>
            <p className="text-xs text-gray-300 mt-2">参考：{layer.ref}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            企业招聘档案（层 1：静态规则）
          </h3>
          {!editing ? (
            <button
              onClick={() => {
                setForm(companyProfile);
                setEditing(true);
              }}
              className="text-sm text-[var(--brand)] hover:underline"
            >
              编辑
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 text-sm bg-[var(--brand)] text-white px-3 py-1.5 rounded-lg hover:bg-[var(--brand-dark)] transition-colors"
            >
              <Save size={14} />
              保存
            </button>
          )}
        </div>
        {!editing ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">企业名称</p>
              <p className="text-gray-700">
                {companyProfile.name || '未设置'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">所属行业</p>
              <p className="text-gray-700">
                {companyProfile.industry || '未设置'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">企业规模</p>
              <p className="text-gray-700">
                {companyProfile.size || '未设置'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">招聘偏好</p>
              <p className="text-gray-700">
                {companyProfile.preferences || '未设置'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {([
              ['name', '企业名称', '如：XX科技有限公司'],
              ['industry', '所属行业', '如：教育科技、电子商务'],
              ['size', '企业规模', '如：20人、50-100人'],
              ['preferences', '招聘偏好', '如：偏好有项目经验的候选人，看重学习能力'],
            ] as const).map(([key, label, placeholder]) => (
              <div key={key}>
                <label className="text-gray-500 text-xs mb-1 block">
                  {label}
                </label>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
