import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AgentType = 'jd' | 'screen' | 'interview' | 'compliance';
export type ViewType = 'dashboard' | 'chat' | 'memory' | 'about';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent: AgentType;
  timestamp: number;
}

interface CompanyProfile {
  name: string;
  industry: string;
  size: string;
  preferences: string;
}

interface HireInsight {
  id: string;
  type: 'jd_pattern' | 'screening_insight' | 'interview_tip';
  content: string;
  timestamp: number;
}

interface AppState {
  currentView: ViewType;
  currentAgent: AgentType;
  chatHistory: ChatMessage[];
  companyProfile: CompanyProfile;
  hireInsights: HireInsight[];
  isLoading: boolean;

  setView: (view: ViewType) => void;
  setAgent: (agent: AgentType) => void;
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setLoading: (loading: boolean) => void;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  addInsight: (insight: Omit<HireInsight, 'id' | 'timestamp'>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentView: 'dashboard',
      currentAgent: 'jd',
      chatHistory: [],
      companyProfile: {
        name: '',
        industry: '',
        size: '',
        preferences: '',
      },
      hireInsights: [],
      isLoading: false,

      setView: (view) => set({ currentView: view }),
      setAgent: (agent) => set({ currentAgent: agent, currentView: 'chat' }),
      addMessage: (msg) =>
        set((s) => ({
          chatHistory: [
            ...s.chatHistory,
            { ...msg, id: crypto.randomUUID(), timestamp: Date.now() },
          ],
        })),
      clearChat: () => set({ chatHistory: [] }),
      setLoading: (loading) => set({ isLoading: loading }),
      updateCompanyProfile: (profile) =>
        set((s) => ({
          companyProfile: { ...s.companyProfile, ...profile },
        })),
      addInsight: (insight) =>
        set((s) => ({
          hireInsights: [
            ...s.hireInsights,
            { ...insight, id: crypto.randomUUID(), timestamp: Date.now() },
          ],
        })),
    }),
    { name: 'hire-easy-store' },
  ),
);
