import { ViewType } from '../App';
import { LayoutDashboard, FolderKanban, CheckSquare, Users, FileText, DollarSign, Shield, User, Rocket, Package, BookOpen, Calendar, Eye, TrendingUp, Smile, Award } from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'my-dashboard' as ViewType, label: 'Mon tableau de bord', icon: User, section: 'personal' },
    { id: 'dashboard' as ViewType, label: 'Vue d\'ensemble', icon: LayoutDashboard, section: 'management' },
    { id: 'projects' as ViewType, label: 'Portfolio projets', icon: FolderKanban, section: 'management' },
    { id: 'process' as ViewType, label: 'Approche processus', icon: Rocket, section: 'management' },
    { id: 'pipeline' as ViewType, label: 'Pipeline & Étapes', icon: Package, section: 'management' },
    { id: 'tasks' as ViewType, label: 'Tâches', icon: CheckSquare, section: 'management' },
    { id: 'team' as ViewType, label: 'Équipe', icon: Users, section: 'management' },
    { id: 'meetings' as ViewType, label: 'Réunions & CR', icon: FileText, section: 'management' },
    { id: 'calendar' as ViewType, label: 'Planning', icon: Calendar, section: 'management' },
    { id: 'budget' as ViewType, label: 'Budget', icon: DollarSign, section: 'management' },
    { id: 'risks' as ViewType, label: 'Risques', icon: Shield, section: 'management' },
    { id: 'veille' as ViewType, label: 'Veille ISO', icon: Eye, section: 'quality' },
    { id: 'marketing' as ViewType, label: 'Stratégie Marketing', icon: TrendingUp, section: 'quality' },
    { id: 'satisfaction' as ViewType, label: 'Satisfaction Client', icon: Smile, section: 'quality' },
    { id: 'audit' as ViewType, label: 'Audit ISO 9001', icon: Award, section: 'quality' },
    { id: 'documentation' as ViewType, label: 'Documentation', icon: BookOpen, section: 'quality' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-900 to-purple-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-indigo-700/50">
        <h1 className="text-2xl font-bold">POPILOT</h1>
        <p className="text-indigo-200 text-sm mt-1">ISO 9001 Certified</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Section Personnelle */}
        <div className="mb-4">
          <div className="text-xs uppercase text-indigo-300 font-semibold mb-2 px-4">Mon espace</div>
          {menuItems
            .filter((item) => item.section === 'personal')
            .map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white font-medium shadow-lg'
                      : 'text-indigo-100 hover:bg-indigo-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
        </div>

        {/* Section Management */}
        <div>
          <div className="text-xs uppercase text-indigo-300 font-semibold mb-2 px-4">Management</div>
          {menuItems
            .filter((item) => item.section === 'management')
            .map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white font-medium shadow-lg'
                      : 'text-indigo-100 hover:bg-indigo-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
        </div>

        {/* Section Quality */}
        <div>
          <div className="text-xs uppercase text-indigo-300 font-semibold mb-2 px-4">Qualité</div>
          {menuItems
            .filter((item) => item.section === 'quality')
            .map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white font-medium shadow-lg'
                      : 'text-indigo-100 hover:bg-indigo-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-indigo-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-semibold">
            JD
          </div>
          <div>
            <div className="font-medium">Jean Dupont</div>
            <div className="text-xs text-indigo-200">Chef de projet</div>
          </div>
        </div>
      </div>
    </aside>
  );
}