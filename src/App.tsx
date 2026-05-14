import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ChatView } from './pages/ChatView';
import { MemoryView } from './pages/MemoryView';
import { AboutView } from './pages/AboutView';
import { useAppStore } from './stores/appStore';

function App() {
  const { currentView } = useAppStore();

  return (
    <div className="flex min-h-screen bg-[var(--surface)]">
      <Sidebar />
      <main className="flex-1 ml-64">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'chat' && <ChatView />}
        {currentView === 'memory' && <MemoryView />}
        {currentView === 'about' && <AboutView />}
      </main>
    </div>
  );
}

export default App;
