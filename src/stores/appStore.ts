import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  DEMO_CONVERSATIONS,
  DEMO_COMPANY_PROFILE,
  DEMO_INSIGHTS,
} from '../data/demoData';

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
  demoLoaded: boolean;

  setView: (view: ViewType) => void;
  setAgent: (agent: AgentType) => void;
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setLoading: (loading: boolean) => void;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  addInsight: (insight: Omit<HireInsight, 'id' | 'timestamp'>) => void;
  loadDemoData: () => void;
}

function buildDemoMessages(): ChatMessage[] {
  const base = Date.now() - 3600_000;
  return DEMO_CONVERSATIONS.map((m, i) => ({
    ...m,
    id: `demo-${i}`,
    timestamp: base + i * 30_000,
  }));
}

function buildDemoInsights() {
  const base = Date.now() - 7200_000;
  return DEMO_INSIGHTS.map((ins, i) => ({
    ...ins,
    id: `insight-${i}`,
    timestamp: base + i * 600_000,
  }));
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentView: 'dashboard',
      currentAgent: 'jd',
      chatHistory: buildDemoMessages(),
      companyProfile: DEMO_COMPANY_PROFILE,
      hireInsights: buildDemoInsights(),
      isLoading: false,
      demoLoaded: true,

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
      loadDemoData: () => {
        if (get().demoLoaded) return;
        set({
          chatHistory: buildDemoMessages(),
          companyProfile: DEMO_COMPANY_PROFILE,
          hireInsights: buildDemoInsights(),
          demoLoaded: true,
        });
      },
    }),
    { name: 'hire-easy-store-v2' },
  ),
);
