import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ProjectView } from './components/ProjectView';
import { TasksViewWithTestData } from './components/TasksViewWithTestData';
import { TeamViewWithTestData } from './components/TeamViewWithTestData';
import { BudgetView } from './components/BudgetView';
import { MeetingsView } from './components/MeetingsView';
import { ProcessView } from './components/ProcessView';
import { MyDashboard } from './components/MyDashboard';
import { PipelineView } from './components/PipelineView';
import { DocumentationView } from './components/DocumentationView';
import { RisksView } from './components/RisksView';
import { Calendar } from './components/Calendar';
import { VeilleView } from './components/VeilleView';
import { MarketingStrategyView } from './components/MarketingStrategyView';
import { SatisfactionView } from './components/SatisfactionView';
import { AuditView } from './components/AuditView';

export type ViewType =
  | 'my-dashboard'
  | 'dashboard'
  | 'projects'
  | 'tasks'
  | 'team'
  | 'budget'
  | 'meetings'
  | 'process'
  | 'pipeline'
  | 'documentation'
  | 'risks'
  | 'calendar'
  | 'veille'
  | 'marketing'
  | 'satisfaction'
  | 'audit';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('my-dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'my-dashboard':
        return <MyDashboard />;
      case 'dashboard':
        return <Dashboard />;
      case 'process':
        return <ProcessView />;
      case 'pipeline':
        return <PipelineView />;
      case 'projects':
        return <ProjectView />;
      case 'tasks':
        return <TasksViewWithTestData />;
      case 'team':
        return <TeamViewWithTestData />;
      case 'meetings':
        return <MeetingsView />;
      case 'budget':
        return <BudgetView />;
      case 'risks':
        return <RisksView />;
      case 'documentation':
        return <DocumentationView />;
      case 'calendar':
        return <Calendar />;
      case 'veille':
        return <VeilleView />;
      case 'marketing':
        return <MarketingStrategyView />;
      case 'satisfaction':
        return <SatisfactionView />;
      case 'audit':
        return <AuditView />;
      default:
        return <MyDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}