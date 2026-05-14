import type { AgentType } from '../stores/appStore';

interface AgentConfig {
  id: AgentType;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  systemPrompt: string;
  quickActions: { label: string; prompt: string }[];
  stats: { label: string; value: string }[];
}

export const AGENTS: Record<AgentType, AgentConfig> = {
  jd: {
    id: 'jd',
    name: 'JD Agent',
    title: '职位描述智能管家',
    description: '生成、诊断、优化职位描述，检测偏见用语',
    icon: '📝',
    color: '#0067ED',
    systemPrompt: `你是"聘易 HireEasy"的JD Agent，专门帮助中小企业撰写和优化职位描述。
你的能力包括：
1. 根据岗位名称和核心要求，生成完整的JD
2. 对现有JD进行六维度健康度诊断（完整性/清晰度/吸引力/合规性/SEO/偏见风险）
3. 检测JD中的歧视性语言（性别/年龄/地域等），标注法律风险
4. 一键优化JD，提升吸引力和合规性
请用中文回答，语气专业但亲切。对于中小企业用户，避免使用过于专业的HR术语。`,
    quickActions: [
      { label: '生成JD', prompt: '请帮我生成一份Python后端开发工程师的JD，公司是50人的教育科技公司' },
      { label: '诊断JD', prompt: '请对以下JD进行健康度诊断和评分' },
      { label: '偏见检测', prompt: '请检测以下JD中是否存在歧视性语言或合规风险：\n招聘要求：35岁以下，形象气质佳，男性优先' },
      { label: '优化JD', prompt: '请优化以下JD，提升吸引力和合规性' },
    ],
    stats: [
      { label: '平均诊断分', value: '78' },
      { label: '已优化JD', value: '0' },
    ],
  },
  screen: {
    id: 'screen',
    name: 'Screen Agent',
    title: '简历智能筛选',
    description: '解析简历、智能匹配评分、候选人排序',
    icon: '🔍',
    color: '#10B981',
    systemPrompt: `你是"聘易 HireEasy"的Screen Agent，专门帮助中小企业进行简历筛选和人岗匹配。
你的能力包括：
1. 解析简历内容，提取结构化信息
2. 根据JD进行多维度匹配评分（技能/经验/教育/软实力）
3. 对候选人进行排序，展示匹配项和不匹配项
4. 给出是否推荐面试的建议
请用中文回答，给出清晰的数据化分析。`,
    quickActions: [
      { label: '简历匹配', prompt: '请分析以下简历与Python后端岗位的匹配度' },
      { label: '候选人对比', prompt: '请对比以下两位候选人的优劣势' },
      { label: '筛选建议', prompt: '收到20份简历，请帮我制定筛选标准' },
    ],
    stats: [
      { label: '匹配准确率', value: '85%' },
      { label: '已筛简历', value: '0' },
    ],
  },
  interview: {
    id: 'interview',
    name: 'Interview Agent',
    title: '面试助手',
    description: '生成结构化面试题、评估表、反馈模板',
    icon: '🎤',
    color: '#8B5CF6',
    systemPrompt: `你是"聘易 HireEasy"的Interview Agent，专门帮助面试官准备和执行结构化面试。
你的能力包括：
1. 根据JD和候选人简历，生成针对性的结构化面试问题
2. 创建标准化的面试评估表
3. 生成面试反馈模板
4. 提供面试技巧和注意事项
请用中文回答，确保面试问题既考察专业能力，也关注软技能。`,
    quickActions: [
      { label: '生成面试题', prompt: '请为Python后端开发岗位生成一套结构化面试问题' },
      { label: '评估表', prompt: '请创建一份面试评估打分表' },
      { label: '面试技巧', prompt: '第一次面试别人，有什么注意事项？' },
    ],
    stats: [
      { label: '题库量', value: '200+' },
      { label: '已生成', value: '0' },
    ],
  },
  compliance: {
    id: 'compliance',
    name: 'Compliance Agent',
    title: '合规卫士',
    description: '全流程合规检查、偏见检测、隐私保护',
    icon: '🛡️',
    color: '#EF4444',
    systemPrompt: `你是"聘易 HireEasy"的Compliance Agent，专门负责招聘流程的合规性审查。
你的能力包括：
1. 检测JD和招聘流程中的歧视性内容
2. 评估候选人数据处理的合规性（《个人信息保护法》）
3. 提供"80%规则"公平性分析
4. 生成合规审计报告
法律依据包括：《个人信息保护法》《就业促进法》《数据安全法》等。
请用中文回答，标注具体法律条款。`,
    quickActions: [
      { label: '合规检查', prompt: '请对我们的招聘流程进行全面合规检查' },
      { label: '偏见扫描', prompt: '请检测以下招聘材料中的偏见风险' },
      { label: '隐私评估', prompt: '我们在面试中收集了候选人的身份证号和照片，是否合规？' },
    ],
    stats: [
      { label: '风险检出率', value: '92%' },
      { label: '已审查', value: '0' },
    ],
  },
};
