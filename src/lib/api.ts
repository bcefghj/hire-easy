const API_KEY = import.meta.env.VITE_MINIMAX_API_KEY || '';
const API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_v2';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatCompletion(
  messages: Message[],
  systemPrompt?: string,
): Promise<string> {
  if (!API_KEY) {
    return simulateResponse(messages);
  }

  const body = {
    model: 'MiniMax-M2.7-highspeed',
    messages: systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
      : messages,
    temperature: 0.7,
    max_tokens: 4096,
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

function simulateResponse(messages: Message[]): string {
  const last = messages[messages.length - 1]?.content ?? '';

  if (last.includes('生成') && last.includes('JD')) {
    return DEMO_JD;
  }
  if (last.includes('诊断') || last.includes('评分')) {
    return DEMO_DIAGNOSIS;
  }
  if (last.includes('偏见') || last.includes('合规')) {
    return DEMO_COMPLIANCE;
  }
  if (last.includes('优化') || last.includes('改写')) {
    return DEMO_OPTIMIZED;
  }
  if (last.includes('面试')) {
    return DEMO_INTERVIEW;
  }
  if (last.includes('简历') || last.includes('匹配')) {
    return DEMO_SCREENING;
  }
  return '您好！我是聘易 HireEasy，您的 AI 招聘助手。我可以帮您生成和优化职位描述、筛选简历、生成面试题、检测合规风险。请告诉我您需要什么帮助？';
}

const DEMO_JD = `# Python后端开发工程师

## 岗位职责
1. 负责公司核心业务系统的后端架构设计与开发
2. 使用 Python/Django/FastAPI 构建高性能 RESTful API
3. 参与数据库设计与优化，确保系统稳定性和可扩展性
4. 编写单元测试和集成测试，保障代码质量
5. 与前端工程师和产品经理紧密协作，推动项目交付

## 任职要求
1. 计算机相关专业本科及以上学历
2. 2年以上 Python 后端开发经验
3. 熟练掌握 Django 或 FastAPI 框架
4. 熟悉 MySQL、PostgreSQL、Redis 等数据库
5. 了解 Docker、CI/CD 等 DevOps 实践
6. 具备良好的沟通能力和团队协作精神

## 薪资福利
- 月薪 15K-25K，13薪
- 五险一金、补充医疗保险
- 弹性工作制、每年15天带薪年假
- 技术书籍补贴、培训机会`;

const DEMO_DIAGNOSIS = `## JD 健康度诊断报告

### 总分：78/100 ⭐⭐⭐⭐

| 维度 | 得分 | 评价 |
|------|------|------|
| 完整性 | 85/100 | ✅ 岗位职责和任职要求完整 |
| 清晰度 | 80/100 | ✅ 职责描述明确，量化指标可增加 |
| 吸引力 | 70/100 | ⚠️ 福利亮点不够突出，建议增加团队文化描述 |
| 合规性 | 90/100 | ✅ 未发现明显歧视性表述 |
| SEO友好度 | 65/100 | ⚠️ 关键词覆盖不足，建议增加技术栈标签 |
| 偏见风险 | 80/100 | ✅ 低风险，"本科及以上"属常见要求 |

### 优化建议
1. **增强吸引力**：在福利部分增加团队氛围、成长空间描述
2. **提升SEO**：标题增加"远程"、"Python"等高频搜索词
3. **量化职责**：如"支撑日活100万用户的系统"增加说服力`;

const DEMO_COMPLIANCE = `## 合规与偏见检测报告

### 检测结果：⚠️ 发现 2 项风险

| # | 风险文本 | 风险类型 | 风险等级 | 法律依据 |
|---|---------|---------|---------|---------|
| 1 | "35岁以下" | 年龄歧视 | 🔴 高 | 《就业促进法》第3条 |
| 2 | "形象气质佳" | 性别歧视暗示 | 🟡 中 | 《就业促进法》第27条 |

### 修改建议
1. ❌ "35岁以下" → ✅ 删除年龄限制，改为"具备X年相关经验"
2. ❌ "形象气质佳" → ✅ "具备良好的职业素养和沟通能力"

### 80% 规则检测
当前 JD 预估的群体通过率比值：82% ✅ 达标`;

const DEMO_OPTIMIZED = `# Python后端开发工程师 | 远程友好 | 技术驱动团队

## 关于我们
我们是一家专注于教育科技的创新公司，团队20人，产品服务超过50万用户。技术团队氛围开放，鼓励技术探索和分享。

## 岗位职责
1. 主导核心业务系统后端架构设计，支撑日活10万+用户的高并发场景
2. 使用 Python (Django/FastAPI) 构建高性能 RESTful API，保障99.9%可用性
3. 设计并优化数据库方案（MySQL/PostgreSQL），提升查询效率30%+
4. 建立自动化测试体系，推动代码覆盖率达到80%以上
5. 与产品和前端深度协作，每两周一次迭代交付

## 你将获得
- 💰 月薪 15K-25K，13薪 + 年度绩效奖金
- 🏥 五险一金 + 补充商业医疗保险
- 🕐 弹性工作制，支持每周2天远程办公
- 📚 每年3000元技术书籍/课程补贴
- 🚀 扁平管理，技术方案你说了算

## 我们期望你
- 计算机相关专业，2年以上 Python 后端经验
- 熟练掌握 Django 或 FastAPI，有实际项目经验
- 熟悉 MySQL/PostgreSQL/Redis，能独立完成数据库设计
- 了解 Docker 和 CI/CD 流程
- 善于沟通，享受小团队的高效协作

*我们重视能力而非背景，欢迎自学成才的开发者投递。*`;

const DEMO_INTERVIEW = `## 结构化面试问题（Python后端开发）

### 第一轮：技术基础（20分钟）

1. **请介绍一个你主导设计的后端系统架构，以及你做出关键技术决策的思考过程。**
   - 考察点：系统设计能力、技术决策力
   - 评分标准：能清晰阐述需求分析→方案对比→最终选择的完整过程

2. **在高并发场景下，你是如何优化数据库查询性能的？请举一个具体例子。**
   - 考察点：性能优化经验、SQL调优
   - 评分标准：能说出索引优化、查询重构、缓存策略等具体手段

3. **Django 和 FastAPI 的核心区别是什么？在什么场景下你会选择哪个？**
   - 考察点：技术广度、框架理解深度

### 第二轮：问题解决（15分钟）

4. **假设线上系统突然出现响应时间从100ms飙升到5s，你会如何排查？**
   - 考察点：线上问题排查能力、系统化思维

5. **如果让你设计一个消息推送系统，支持10万用户实时通知，你会怎么设计？**
   - 考察点：系统设计、技术选型

### 第三轮：软技能（10分钟）

6. **描述一次你与产品经理在需求上产生分歧的经历，你是如何解决的？**
   - 考察点：沟通协调、跨职能协作`;

const DEMO_SCREENING = `## 简历匹配分析报告

### 候选人：张三
### 匹配岗位：Python后端开发工程师
### 综合匹配度：85% ⭐⭐⭐⭐

| 维度 | 匹配度 | 详情 |
|------|--------|------|
| 技术技能 | 90% | ✅ Python 3年 / Django 2年 / FastAPI 1年 / MySQL / Redis |
| 项目经验 | 85% | ✅ 有高并发系统经验（日活5万），接近目标要求 |
| 教育背景 | 80% | ✅ 计算机科学本科，符合要求 |
| 工作年限 | 90% | ✅ 3年后端开发经验，超出最低要求 |
| 软技能 | 75% | ⚠️ 简历未充分体现团队协作经验 |

### 亮点
- 有开源项目贡献经历（GitHub 500+ stars）
- 前公司从0到1搭建过微服务架构

### 关注点
- 没有 Docker/CI/CD 相关描述（建议面试确认）
- 跳槽频率偏高（2年内2家公司）

### 建议
✅ **推荐面试** — 技术匹配度高，建议在面试中重点了解 DevOps 经验和职业稳定性`;
