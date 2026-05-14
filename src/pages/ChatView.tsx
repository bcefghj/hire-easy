import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import { AGENTS } from '../data/agents';
import { chatCompletion } from '../lib/api';
import { Send, Sparkles, Loader2, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ChatView() {
  const {
    currentAgent,
    chatHistory,
    isLoading,
    addMessage,
    setLoading,
    clearChat,
  } = useAppStore();
  const [input, setInput] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);
  const agent = AGENTS[currentAgent];
  const agentMessages = chatHistory.filter((m) => m.agent === currentAgent);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [agentMessages.length]);

  async function handleSend(text?: string) {
    const msg = text ?? input.trim();
    if (!msg || isLoading) return;
    setInput('');
    addMessage({ role: 'user', content: msg, agent: currentAgent });
    setLoading(true);

    try {
      const history = [
        ...agentMessages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        { role: 'user' as const, content: msg },
      ];
      const reply = await chatCompletion(history, agent.systemPrompt);
      addMessage({ role: 'assistant', content: reply, agent: currentAgent });
    } catch (err) {
      addMessage({
        role: 'assistant',
        content: `抱歉，出现了错误：${err instanceof Error ? err.message : '未知错误'}`,
        agent: currentAgent,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header
        className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-white"
      >
        <span className="text-2xl">{agent.icon}</span>
        <div>
          <h2 className="font-semibold text-gray-900">{agent.title}</h2>
          <p className="text-xs text-gray-400">{agent.description}</p>
        </div>
        <div className="flex-1" />
        <button
          onClick={clearChat}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          title="清空对话"
        >
          <Trash2 size={16} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50/50">
        {agentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-5xl mb-4">{agent.icon}</span>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {agent.title}
            </h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              {agent.description}。选择下方快捷操作开始，或直接输入您的需求。
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {agent.quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSend(action.prompt)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600 hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors shadow-sm"
                >
                  <Sparkles size={14} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {agentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-[var(--brand)] text-white rounded-br-md whitespace-pre-wrap'
                      : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md prose prose-sm max-w-none'
                    }`}
                >
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-[var(--brand)]" />
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="max-w-3xl mx-auto flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`向${agent.title}提问...`}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-light)] transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 rounded-xl bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
