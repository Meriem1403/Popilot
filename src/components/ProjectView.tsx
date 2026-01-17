import { useState } from 'react';
import { Plus, Filter, MoreVertical, Calendar, Users as UsersIcon, DollarSign, Edit2, Trash2, Archive } from 'lucide-react';
import { useApi, apiDelete, apiPut } from '../hooks/useApi';
import { Project } from '../types';
import { CreateProjectModal } from './CreateProjectModal';
import { EditProjectModal } from './EditProjectModal';

export function ProjectView() {
  const { data: projects, loading, refetch } = useApi<Project[]>('/projects');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleDeleteProject = async (projectId: string, projectName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le projet "${projectName}" ? Cette action est irréversible.`)) {
      return;
    }
    
    try {
      await apiDelete(`/projects/${projectId}`);
      refetch();
      setOpenMenuId(null);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Erreur lors de la suppression du projet');
    }
  };

  const handleArchiveProject = async (project: Project) => {
    if (!confirm(`Êtes-vous sûr de vouloir archiver le projet "${project.name}" ?`)) {
      return;
    }
    
    try {
      await apiPut(`/projects/${project.id}`, {
        ...project,
        status: 'archived',
      });
      refetch();
      setOpenMenuId(null);
    } catch (error) {
      console.error('Error archiving project:', error);
      alert('Erreur lors de l\'archivage du projet');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  // Filtrage des projets
  const filteredProjects = projects?.filter(project => {
    if (statusFilter === 'all') return true;
    return project.status === statusFilter;
  }) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-600 mt-1">Gérez et suivez l'avancement de vos projets</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-5 h-5" />
          Nouveau projet
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Tous les statuts</option>
          <option value="on-track">Dans les temps</option>
          <option value="at-risk">À risque</option>
          <option value="delayed">En retard</option>
        </select>
        {statusFilter !== 'all' && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <span className="text-blue-700 font-medium">{filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''}</span>
            <button
              onClick={() => setStatusFilter('all')}
              className="text-blue-600 hover:text-blue-800"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-gray-500">Chargement...</div>
        ) : !projects || projects.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Aucun projet créé</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-blue-600 hover:underline"
            >
              Créer votre premier projet
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative"
            >
              {/* Project Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <div className="relative">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded transition-colors" 
                      onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openMenuId === project.id && (
                      <>
                        {/* Overlay pour fermer le menu */}
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg border border-gray-200 z-20 min-w-[180px]">
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors text-left text-sm"
                            onClick={() => {
                              setOpenMenuId(null);
                              setEditingProject(project);
                            }}
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">Modifier</span>
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors text-left text-sm border-t border-gray-100"
                            onClick={() => handleArchiveProject(project)}
                          >
                            <Archive className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">Archiver</span>
                          </button>
                          <button 
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 transition-colors text-left text-sm border-t border-gray-100"
                            onClick={() => handleDeleteProject(project.id, project.name)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                            <span className="text-red-600">Supprimer</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Avancement global</span>
                  <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Meta */}
              <div className="px-6 py-4 grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500 text-xs">Échéance</div>
                    <div className="font-medium text-gray-900">
                      {new Date(project.deadline).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500 text-xs">Budget</div>
                    <div className="font-medium text-gray-900">
                      {((project.budget.used / project.budget.total) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500 text-xs">Équipe</div>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center border-2 border-white font-medium"
                        >
                          {member}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center border-2 border-white font-medium">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={refetch}
        />
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}