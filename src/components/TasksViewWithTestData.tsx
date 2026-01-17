import { useState } from 'react';
import { Plus, Filter, Calendar, User, AlertCircle, Link2, CheckSquare, Square, ChevronDown, ChevronUp, ArrowLeft, FolderKanban } from 'lucide-react';
import { TEST_TASKS, TEST_TEAM_MEMBERS, calculateTaskProgress, getTasksByProject } from '../data/testData';
import { useApi } from '../hooks/useApi';
import { Project } from '../types';

export function TasksViewWithTestData() {
  const { data: projects, loading: projectsLoading } = useApi<Project[]>('/projects');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Si aucun projet sélectionné, afficher la vue de sélection
  if (!selectedProject) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tâches</h1>
          <p className="text-gray-600 mt-1">
            Sélectionnez un projet pour voir ses tâches
          </p>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {TEST_TASKS.filter((t) => t.status === 'todo').length}
            </div>
            <div className="text-sm text-gray-600">À faire (tous projets)</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200 bg-blue-50">
            <div className="text-2xl font-bold text-blue-900">
              {TEST_TASKS.filter((t) => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-blue-700">En cours</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200 bg-red-50">
            <div className="text-2xl font-bold text-red-900">
              {TEST_TASKS.filter((t) => t.status === 'blocked').length}
            </div>
            <div className="text-sm text-red-700">Bloquées</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
            <div className="text-2xl font-bold text-green-900">
              {TEST_TASKS.filter((t) => t.status === 'done').length}
            </div>
            <div className="text-sm text-green-700">Terminées</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-200 bg-purple-50">
            <div className="text-2xl font-bold text-purple-900">
              {TEST_TASKS.filter((t) => t.linkedToProcesses && t.linkedToProcesses.length > 0).length}
            </div>
            <div className="text-sm text-purple-700 flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              Liées à des processus
            </div>
          </div>
        </div>

        {/* Sélection de projet */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sélectionnez un projet</h2>
          
          {projectsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Chargement des projets...</p>
            </div>
          ) : !projects || projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-semibold">Aucun projet trouvé</p>
              <p className="text-sm mt-2">Créez un projet pour commencer</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => {
                // Pour le mode test, on affiche les stats des tâches de test pour tous les projets
                const completedTasks = TEST_TASKS.filter(t => t.status === 'done').length;
                const inProgressTasks = TEST_TASKS.filter(t => t.status === 'in-progress').length;
                const linkedToProcesses = TEST_TASKS.filter(t => t.linkedToProcesses && t.linkedToProcesses.length > 0).length;

                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-lg hover:border-indigo-500 transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FolderKanban className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                          {project.name}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Total de tâches (test)</span>
                            <span className="font-bold text-gray-900">{TEST_TASKS.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">✓ Terminées</span>
                            <span className="font-bold text-green-600">{completedTasks}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">⚡ En cours</span>
                            <span className="font-bold text-blue-600">{inProgressTasks}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">🔗 Liées processus</span>
                            <span className="font-bold text-purple-600">{linkedToProcesses}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Projet sélectionné : afficher les tâches
  // Pour le mode test, on affiche toutes les tâches de test pour n'importe quel projet
  const tasks = TEST_TASKS.map(task => ({
    ...task,
    projectId: selectedProject // On force le projectId à être celui sélectionné
  }));
  const selectedProjectData = projects?.find(p => p.id === selectedProject);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'todo':
        return { label: '⏳ À faire', color: 'bg-gray-100 text-gray-800 border-gray-200' };
      case 'in-progress':
        return { label: '⚡ En cours', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'blocked':
        return { label: '🚫 Bloquée', color: 'bg-red-100 text-red-800 border-red-200' };
      case 'done':
        return { label: '✓ Terminée', color: 'bg-green-100 text-green-800 border-green-200' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { label: '🔴 Haute', color: 'text-red-600', bgColor: 'bg-red-100' };
      case 'medium':
        return { label: '🟡 Moyenne', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      case 'low':
        return { label: '🟢 Basse', color: 'text-green-600', bgColor: 'bg-green-100' };
      default:
        return { label: priority, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // Filtrer les tâches
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header avec bouton retour */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedProject(null)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Retour à la sélection de projet"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tâches - {selectedProjectData?.name}</h1>
            <p className="text-gray-600 mt-1">
              Gérez et suivez toutes les tâches en cours
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Nouvelle tâche
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filtrer
        </button>
        
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="todo">À faire</option>
          <option value="in-progress">En cours</option>
          <option value="blocked">Bloquée</option>
          <option value="done">Terminée</option>
        </select>
        
        <select 
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Toutes les priorités</option>
          <option value="high">Haute</option>
          <option value="medium">Moyenne</option>
          <option value="low">Basse</option>
        </select>

        <div className="ml-auto text-sm text-gray-600">
          {filteredTasks.length} tâche{filteredTasks.length > 1 ? 's' : ''} affichée{filteredTasks.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {tasks.filter((t) => t.status === 'todo').length}
          </div>
          <div className="text-sm text-gray-600">À faire</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200 bg-blue-50">
          <div className="text-2xl font-bold text-blue-900">
            {tasks.filter((t) => t.status === 'in-progress').length}
          </div>
          <div className="text-sm text-blue-700">En cours</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-200 bg-red-50">
          <div className="text-2xl font-bold text-red-900">
            {tasks.filter((t) => t.status === 'blocked').length}
          </div>
          <div className="text-sm text-red-700">Bloquées</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="text-2xl font-bold text-green-900">
            {tasks.filter((t) => t.status === 'done').length}
          </div>
          <div className="text-sm text-green-700">Terminées</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200 bg-purple-50">
          <div className="text-2xl font-bold text-purple-900">
            {tasks.filter((t) => t.linkedToProcesses && t.linkedToProcesses.length > 0).length}
          </div>
          <div className="text-sm text-purple-700 flex items-center gap-1">
            <Link2 className="w-3 h-3" />
            Liées à des processus
          </div>
        </div>
      </div>

      {/* Tasks Cards avec sous-tâches expandables */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const statusConfig = getStatusConfig(task.status);
          const priorityConfig = getPriorityConfig(task.priority);
          const overdue = isOverdue(task.dueDate) && task.status !== 'done';
          const isExpanded = expandedTask === task.id;
          const calculatedProgress = calculateTaskProgress(task);
          const teamMember = TEST_TEAM_MEMBERS.find(m => m.id === task.assignedTo);

          return (
            <div key={task.id} className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-md transition-all overflow-hidden">
              {/* Main task info */}
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm flex items-center justify-center font-bold shadow-lg">
                      {teamMember?.initials || 'XX'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      </div>
                      <button
                        onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>

                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityConfig.bgColor} ${priorityConfig.color}`}>
                        {priorityConfig.label}
                      </span>

                      <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        <User className="w-3 h-3" />
                        {task.assignedToName}
                      </span>

                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        overdue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <Calendar className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                        {overdue && ' (En retard!)'}
                      </span>

                      {task.linkedToProcesses && task.linkedToProcesses.length > 0 && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          <Link2 className="w-3 h-3" />
                          {task.linkedToProcesses.length} processus
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progression</span>
                        <span className="font-bold text-indigo-600">{calculatedProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            calculatedProgress === 100 ? 'bg-green-500' :
                            calculatedProgress > 50 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${calculatedProgress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} sous-tâches terminées
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded content: Sous-tâches */}
              {isExpanded && (
                <div className="border-t-2 border-gray-200 bg-gray-50 p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                    Sous-tâches ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
                  </h4>
                  <div className="space-y-2">
                    {task.subtasks.map((subtask) => (
                      <div 
                        key={subtask.id} 
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          subtask.completed 
                            ? 'bg-green-50 border-green-300' 
                            : 'bg-white border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                          subtask.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {subtask.completed && <CheckSquare className="w-4 h-4 text-white" />}
                        </div>
                        <span className={`flex-1 text-sm ${
                          subtask.completed 
                            ? 'text-gray-600 line-through' 
                            : 'text-gray-900 font-medium'
                        }`}>
                          {subtask.title}
                        </span>
                        {subtask.completed && (
                          <span className="text-xs text-green-600 font-semibold">✓</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Linked processes */}
                  {task.linkedToProcesses && task.linkedToProcesses.length > 0 && (
                    <div className="mt-4 pt-4 border-t-2 border-gray-300">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-purple-600" />
                        Processus liés ({task.linkedToProcesses.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {task.linkedToProcesses.map((processId) => (
                          <div 
                            key={processId}
                            className="px-3 py-2 bg-purple-100 border-2 border-purple-300 rounded-lg text-sm font-medium text-purple-800"
                          >
                            🔗 {processId}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Cette tâche est liée à des étapes de processus ISO 9001. Voir l'onglet "Approche processus" pour plus de détails.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-semibold">Aucune tâche trouvée</p>
            <p className="text-sm mt-2">Ajustez vos filtres ou créez une nouvelle tâche</p>
          </div>
        )}
      </div>
    </div>
  );
}