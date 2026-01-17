import { useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';
import { useApi, apiPost } from '../hooks/useApi';
import { Project } from '../types';

export function Dashboard() {
  const { data: projects, loading, error } = useApi<Project[]>('/projects');

  // Initialize sample data on first load
  useEffect(() => {
    const initData = async () => {
      try {
        await apiPost('/init-sample-data', {});
        console.log('Sample data initialized');
      } catch (err) {
        console.log('Sample data init error (this is normal on first load):', err);
      }
    };
    initData();
  }, []);

  const kpis = [
    {
      label: 'Projets actifs',
      value: String(projects?.length || 0),
      change: '+2',
      trend: 'up',
      icon: Target,
      color: 'blue',
    },
    {
      label: 'Tâches en cours',
      value: '87',
      change: '-5',
      trend: 'down',
      icon: Clock,
      color: 'orange',
    },
    {
      label: 'Taux de réussite',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
    },
    {
      label: 'Alertes critiques',
      value: '3',
      change: '+1',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'Dans les temps';
      case 'at-risk':
        return 'À risque';
      case 'delayed':
        return 'En retard';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Haute';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Basse';
      default:
        return priority;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de vos projets et indicateurs clés</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor =
            kpi.trend === 'up'
              ? kpi.color === 'red'
                ? 'text-red-600'
                : 'text-green-600'
              : kpi.color === 'green'
              ? 'text-red-600'
              : 'text-green-600';

          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                    <span className={`text-sm font-medium ${trendColor}`}>{kpi.change}</span>
                    <span className="text-xs text-gray-500 ml-1">vs. mois dernier</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${kpi.color}-100`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts Section */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Alertes critiques</h3>
            <ul className="mt-2 space-y-1 text-sm text-red-800">
              <li>• Migration infrastructure cloud : retard de 2 semaines détecté</li>
              <li>• Application mobile interne : dépassement budget prévu à 105%</li>
              <li>• 5 tâches bloquées nécessitent une action immédiate</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Projets en cours</h2>
        </div>

        {error && (
          <div className="p-6 text-center">
            <p className="text-red-600">Erreur de chargement: {error}</p>
            <p className="text-sm text-gray-500 mt-2">Vérifiez la console pour plus de détails</p>
          </div>
        )}

        {loading && !error && (
          <div className="p-12 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            Chargement des projets...
          </div>
        )}

        {!loading && !error && (!projects || projects.length === 0) && (
          <div className="p-12 text-center text-gray-500">
            <p>Aucun projet pour le moment</p>
            <p className="text-sm mt-2">Les données d'exemple sont en cours d'initialisation...</p>
          </div>
        )}

        {!loading && !error && projects && projects.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avancement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priorité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Échéance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{project.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                        {getPriorityLabel(project.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(project.deadline).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <span className="text-gray-900 font-medium">
                          {(project.budget.used / 1000).toFixed(0)}k€
                        </span>
                        <span className="text-gray-500"> / {(project.budget.total / 1000).toFixed(0)}k€</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-blue-600 text-white p-6 rounded-xl shadow-sm hover:bg-blue-700 transition-colors text-left">
          <h3 className="font-semibold">Créer un nouveau projet</h3>
          <p className="text-sm text-blue-100 mt-1">Démarrer un projet avec objectifs et planning</p>
        </button>
        <button className="bg-white border-2 border-gray-300 p-6 rounded-xl shadow-sm hover:border-blue-500 transition-colors text-left">
          <h3 className="font-semibold text-gray-900">Rapport hebdomadaire</h3>
          <p className="text-sm text-gray-600 mt-1">Générer le rapport de la semaine</p>
        </button>
        <button className="bg-white border-2 border-gray-300 p-6 rounded-xl shadow-sm hover:border-blue-500 transition-colors text-left">
          <h3 className="font-semibold text-gray-900">Planifier une réunion</h3>
          <p className="text-sm text-gray-600 mt-1">Organiser un point projet ou décision</p>
        </button>
      </div>
    </div>
  );
}
