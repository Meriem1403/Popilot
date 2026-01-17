import { useState } from 'react';
import { 
  Target, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Award, 
  TrendingUp, 
  Calendar,
  FileText,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { DeclareBlockageModal } from './DeclareBlockageModal';

export function MyDashboard() {
  const [showBlockageModal, setShowBlockageModal] = useState(false);
  
  // Données personnelles du membre connecté (Jean Dupont)
  const myData = {
    name: 'Jean Dupont',
    role: 'Chef de projet',
    workload: 85,
    myTasks: [
      {
        id: 1,
        title: 'Finaliser spécifications techniques POPY',
        project: 'POPY',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-01-20',
        progress: 75,
      },
      {
        id: 2,
        title: 'Validation prototype capteurs de mouvement',
        project: 'POPY',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-01-22',
        progress: 60,
      },
      {
        id: 3,
        title: 'Organiser réunion validation design UX',
        project: 'POPY',
        status: 'todo',
        priority: 'medium',
        dueDate: '2026-01-18',
        progress: 0,
      },
      {
        id: 4,
        title: 'Revue risques projet avec équipe qualité',
        project: 'POPY',
        status: 'todo',
        priority: 'medium',
        dueDate: '2026-01-19',
        progress: 0,
      },
    ],
    objectives: [
      {
        id: 1,
        name: 'Livrer prototype POPY V1 dans les temps',
        progress: 67,
        target: 100,
        deadline: '2026-03-15',
      },
      {
        id: 2,
        name: 'Maintenir satisfaction équipe > 4/5',
        progress: 80,
        target: 100,
        deadline: '2026-06-30',
      },
      {
        id: 3,
        name: 'Respecter budget POPY ±5%',
        progress: 85,
        target: 100,
        deadline: '2026-03-15',
      },
    ],
    recentTrophies: [
      { name: 'Leadership', earnedAt: '2026-01-10', icon: '👑' },
      { name: 'Respect délais', earnedAt: '2026-01-08', icon: '⏰' },
      { name: 'Innovation', earnedAt: '2025-12-15', icon: '💡' },
    ],
    upcomingMeetings: [
      {
        id: 1,
        title: 'Point POPY - Sprint Review',
        date: '2026-01-17',
        time: '14:00',
        participants: 5,
      },
      {
        id: 2,
        title: 'Comité pilotage POPY',
        date: '2026-01-20',
        time: '10:00',
        participants: 8,
      },
    ],
    recentActions: [
      {
        id: 1,
        from: 'Réunion Sprint #12',
        description: 'Valider les choix de capteurs avec Thomas',
        dueDate: '2026-01-18',
        status: 'pending',
      },
      {
        id: 2,
        from: 'Réunion Qualité',
        description: 'Compléter documentation risques sécurité enfants',
        dueDate: '2026-01-19',
        status: 'pending',
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'done':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'blocked':
        return 'Bloqué';
      default:
        return 'À faire';
    }
  };

  const tasksInProgress = myData.myTasks.filter((t) => t.status === 'in-progress').length;
  const tasksCompleted = myData.myTasks.filter((t) => t.status === 'done').length;
  const urgentTasks = myData.myTasks.filter((t) => {
    const daysUntilDue = Math.ceil(
      (new Date(t.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilDue <= 3 && t.status !== 'done';
  }).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header avec message de bienvenue */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl">
        <h1 className="text-3xl font-bold">Bonjour {myData.name.split(' ')[0]} 👋</h1>
        <p className="mt-2 text-blue-100">
          Voici votre tableau de bord personnel. POPILOT est là pour vous guider.
        </p>
      </div>

      {/* KPIs personnels */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Tâches en cours</p>
              <p className="text-3xl font-bold mt-2 text-blue-600">{tasksInProgress}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-600 bg-blue-100 p-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Tâches terminées</p>
              <p className="text-3xl font-bold mt-2 text-green-600">{tasksCompleted}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 bg-green-100 p-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Tâches urgentes</p>
              <p className="text-3xl font-bold mt-2 text-red-600">{urgentTasks}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600 bg-red-100 p-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Charge de travail</p>
              <p className="text-3xl font-bold mt-2 text-orange-600">{myData.workload}%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-600 bg-orange-100 p-2 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Question clé : Que dois-je faire maintenant ? */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2 mb-4">
          <Target className="w-6 h-6" />
          Que dois-je faire maintenant ?
        </h2>
        <div className="space-y-3">
          {myData.myTasks
            .filter((t) => t.status !== 'done')
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 3)
            .map((task) => {
              const daysUntilDue = Math.ceil(
                (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              const isUrgent = daysUntilDue <= 3;

              return (
                <div
                  key={task.id}
                  className={`bg-white p-4 rounded-lg border-2 ${
                    isUrgent ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <span className="text-gray-600">Projet: {task.project}</span>
                        <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'Priorité haute' : 'Priorité moyenne'}
                        </span>
                        <span className={isUrgent ? 'text-red-600 font-medium' : 'text-gray-600'}>
                          {isUrgent ? `⚠️ Dans ${daysUntilDue}j` : `Échéance: ${daysUntilDue}j`}
                        </span>
                      </div>
                      {/* Barre de progression */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Progression</span>
                          <span className="text-xs font-medium text-gray-700">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Section à deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mes objectifs personnels */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Mes objectifs
            </h2>
          </div>
          <div className="space-y-4">
            {myData.objectives.map((objective) => (
              <div key={objective.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{objective.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Échéance: {new Date(objective.deadline).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{objective.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      objective.progress >= 80
                        ? 'bg-green-500'
                        : objective.progress >= 50
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${objective.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mes trophées */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-600" />
            Mes trophées
          </h2>
          <div className="space-y-3">
            {myData.recentTrophies.map((trophy, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg border border-amber-200 flex items-center gap-3"
              >
                <div className="text-3xl">{trophy.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{trophy.name}</h3>
                  <p className="text-xs text-gray-500">
                    Obtenu le {new Date(trophy.earnedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-amber-700">
            🎉 Continuez comme ça ! Votre travail est reconnu.
          </div>
        </div>
      </div>

      {/* Réunions à venir */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          Mes prochaines réunions
        </h2>
        <div className="space-y-3">
          {myData.upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-center">
                  <div className="text-xs font-semibold">
                    {new Date(meeting.date).toLocaleDateString('fr-FR', { day: '2-digit' })}
                  </div>
                  <div className="text-xs">
                    {new Date(meeting.date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                  <p className="text-sm text-gray-600">
                    {meeting.time} • {meeting.participants} participants
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions assignées depuis les réunions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          Actions qui me sont assignées
        </h2>
        <div className="space-y-3">
          {myData.recentActions.map((action) => (
            <div
              key={action.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
            >
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">De: {action.from}</div>
                <h3 className="font-medium text-gray-900">{action.description}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Échéance: {new Date(action.dueDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Marquer comme fait
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton Je suis bloqué */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 text-lg">Vous rencontrez un blocage ?</h3>
              <p className="text-sm text-red-700 mt-1">
                N'attendez pas ! Signalez-le immédiatement pour qu'on puisse vous aider.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowBlockageModal(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <AlertTriangle className="w-5 h-5" />
            Je suis bloqué
          </button>
        </div>
      </div>

      {/* Assistant POPILOT */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-purple-600 text-white p-3 rounded-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900 text-lg mb-2">
              🤖 Assistant POPILOT - Votre copilote personnel
            </h3>
            <p className="text-sm text-purple-700 mb-3">
              Posez-moi vos questions sur vos tâches, vos priorités ou l'état du projet POPY.
            </p>
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <input
                type="text"
                placeholder="Ex: Sur quoi je dois me concentrer aujourd'hui ?"
                className="w-full outline-none text-gray-700"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-white border border-purple-300 rounded-full text-xs text-purple-700 hover:bg-purple-50">
                Sur quoi me concentrer ?
              </button>
              <button className="px-3 py-1 bg-white border border-purple-300 rounded-full text-xs text-purple-700 hover:bg-purple-50">
                Quel est l'impact si je suis en retard ?
              </button>
              <button className="px-3 py-1 bg-white border border-purple-300 rounded-full text-xs text-purple-700 hover:bg-purple-50">
                Dernières décisions du projet ?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de déclaration de blocage */}
      {showBlockageModal && <DeclareBlockageModal onClose={() => setShowBlockageModal(false)} />}
    </div>
  );
}
