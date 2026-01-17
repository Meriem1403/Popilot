import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { Project } from '../types';
import { ChevronRight, Plus, GitBranch, Target, Package, LifeBuoy, Shield, TrendingUp, Activity, Edit2, Trash2, Filter } from 'lucide-react';
import { CreateProcessModalWithTestData } from './CreateProcessModalWithTestData';
import { ProcessDetailModal } from './ProcessDetailModal';
import { TEST_PROCESSES, getProcessesByProject, ProcessData } from '../data/testProcesses';

export function ProcessView() {
  const { data: projects, loading } = useApi<Project[]>('/projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<ProcessData | null>(null);
  const [processes, setProcesses] = useState<ProcessData[]>([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string | null>(null);
  const [processToEdit, setProcessToEdit] = useState<ProcessData | null>(null);

  // Charger les données de test quand un projet est sélectionné
  useEffect(() => {
    if (selectedProject) {
      // Pour le mode test, on charge tous les processus de test et on affiche un badge
      // Les processus de test sont liés au projet "popy" mais on les affiche pour tous les projets
      const testProcesses = TEST_PROCESSES.map(p => ({
        ...p,
        projectId: selectedProject.id // On force le projectId à être celui du projet sélectionné
      }));
      setProcesses(testProcesses);
    }
  }, [selectedProject]);

  // Fonction pour supprimer un processus
  const handleDeleteProcess = (processId: string, processTitle: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le processus "${processTitle}" ?\n\nCette action est irréversible.`)) {
      setProcesses(processes.filter(p => p.id !== processId));
    }
  };

  // Fonction pour modifier un processus
  const handleEditProcess = (process: ProcessData) => {
    setProcessToEdit(process);
    setShowCreateModal(true);
  };

  const processTypes = [
    { 
      type: 'pilotage' as const, 
      label: 'Processus de pilotage', 
      subtitle: 'DÉCIDER', 
      icon: Target,
      color: 'indigo',
      description: 'Donner la direction et arbitrer'
    },
    { 
      type: 'realisation' as const, 
      label: 'Processus de réalisation', 
      subtitle: 'FAIRE', 
      icon: Package,
      color: 'blue',
      description: 'Construire le robot et les outils'
    },
    { 
      type: 'support' as const, 
      label: 'Processus support', 
      subtitle: 'PERMETTRE', 
      icon: LifeBuoy,
      color: 'green',
      description: 'Soutenir sans bloquer'
    },
    { 
      type: 'qualite' as const, 
      label: 'Processus qualité & risques', 
      subtitle: 'SÉCURISER', 
      icon: Shield,
      color: 'orange',
      description: 'Empêcher les mauvaises surprises'
    },
    { 
      type: 'amelioration' as const, 
      label: 'Processus d\'amélioration continue', 
      subtitle: 'AMÉLIORER', 
      icon: TrendingUp,
      color: 'purple',
      description: 'Apprendre et corriger'
    },
    { 
      type: 'indicateurs' as const, 
      label: 'Indicateurs de suivi', 
      subtitle: 'MESURER', 
      icon: Activity,
      color: 'pink',
      description: 'Piloter avec des faits'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-900', hover: 'hover:bg-indigo-100' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', hover: 'hover:bg-green-100' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', hover: 'hover:bg-orange-100' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', hover: 'hover:bg-purple-100' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-900', hover: 'hover:bg-pink-100' },
    };
    return colors[color] || colors.indigo;
  };

  if (!selectedProject) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approche processus</h1>
          <p className="text-gray-600 mt-1">
            Sélectionnez un projet pour voir et gérer ses processus ISO 9001
          </p>
        </div>

        {/* Project Selection */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Chargement des projets...
            </div>
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-all hover:border-indigo-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <GitBranch className="w-4 h-4" />
                  <span>Voir les processus</span>
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucun projet disponible
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vue du projet sélectionné avec ses processus
  return (
    <div className="p-6 space-y-6">
      {/* Header avec breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setSelectedProject(null)}
            className="text-sm text-indigo-600 hover:text-indigo-800 mb-2 flex items-center gap-1"
          >
            ← Retour aux projets
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{selectedProject.name}</h1>
          <p className="text-gray-600 mt-1">Cartographie des processus ISO 9001</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Créer un processus
        </button>
      </div>

      {/* Cartographie globale */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl border-2 border-indigo-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-indigo-600" />
          Cartographie globale des processus
        </h2>
        <p className="text-sm text-gray-700 mb-6 leading-relaxed">
          Vue macro – L'approche processus ISO 9001 structure le projet en 4 grandes catégories. 
          <strong> Cliquez sur une catégorie pour voir les processus associés.</strong>
        </p>

        {/* Schéma visuel interactif */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Bloc 1: Pilotage */}
          <button
            onClick={() => setSelectedTypeFilter(selectedTypeFilter === 'pilotage' ? null : 'pilotage')}
            className={`bg-white rounded-lg border-2 p-5 text-left transition-all hover:shadow-lg ${
              selectedTypeFilter === 'pilotage' 
                ? 'border-indigo-500 shadow-lg ring-2 ring-indigo-200' 
                : 'border-indigo-300 hover:border-indigo-400'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-indigo-900">Processus de pilotage</h3>
                <p className="text-xs text-indigo-600">DÉCIDER</p>
              </div>
              {processes.filter(p => p.projectId === selectedProject.id && p.type === 'pilotage').length > 0 && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  {processes.filter(p => p.projectId === selectedProject.id && p.type === 'pilotage').length}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Direction stratégique, planification et arbitrages
            </p>
          </button>

          {/* Bloc 2: Réalisation */}
          <button
            onClick={() => setSelectedTypeFilter(selectedTypeFilter === 'realisation' ? null : 'realisation')}
            className={`bg-white rounded-lg border-2 p-5 text-left transition-all hover:shadow-lg ${
              selectedTypeFilter === 'realisation' 
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                : 'border-blue-300 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900">Processus de réalisation</h3>
                <p className="text-xs text-blue-600">FAIRE</p>
              </div>
              {processes.filter(p => p.projectId === selectedProject.id && p.type === 'realisation').length > 0 && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {processes.filter(p => p.projectId === selectedProject.id && p.type === 'realisation').length}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Construction des livrables et développement
            </p>
          </button>

          {/* Bloc 3: Support */}
          <button
            onClick={() => setSelectedTypeFilter(selectedTypeFilter === 'support' ? null : 'support')}
            className={`bg-white rounded-lg border-2 p-5 text-left transition-all hover:shadow-lg ${
              selectedTypeFilter === 'support' 
                ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                : 'border-green-300 hover:border-green-400'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                <LifeBuoy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900">Processus support</h3>
                <p className="text-xs text-green-600">PERMETTRE</p>
              </div>
              {processes.filter(p => p.projectId === selectedProject.id && p.type === 'support').length > 0 && (
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                  {processes.filter(p => p.projectId === selectedProject.id && p.type === 'support').length}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Ressources et infrastructure nécessaires
            </p>
          </button>

          {/* Bloc 4: Amélioration */}
          <button
            onClick={() => setSelectedTypeFilter(selectedTypeFilter === 'amelioration' ? null : 'amelioration')}
            className={`bg-white rounded-lg border-2 p-5 text-left transition-all hover:shadow-lg ${
              selectedTypeFilter === 'amelioration' 
                ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' 
                : 'border-purple-300 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900">Processus d'amélioration</h3>
                <p className="text-xs text-purple-600">AMÉLIORER</p>
              </div>
              {processes.filter(p => p.projectId === selectedProject.id && p.type === 'amelioration').length > 0 && (
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                  {processes.filter(p => p.projectId === selectedProject.id && p.type === 'amelioration').length}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Apprentissage continu et corrections
            </p>
          </button>
        </div>

        {/* Texte explicatif */}
        <div className="mt-6 bg-white/60 rounded-lg p-4 border border-indigo-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-indigo-900">Logique ISO 9001 :</strong> Les processus de pilotage donnent la direction, 
            les processus de réalisation produisent les livrables, les processus support fournissent les moyens nécessaires, 
            et les processus d'amélioration garantissent la performance et l'apprentissage continu. 
            Chaque processus est documenté, mesuré et amélioré.
          </p>
        </div>
      </div>

      {/* Liste des processus par type */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Processus détaillés</h2>
          {selectedTypeFilter && (
            <button
              onClick={() => setSelectedTypeFilter(null)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              ✕ Afficher tous les processus
            </button>
          )}
        </div>
        
        {processTypes
          .filter(typeConfig => !selectedTypeFilter || typeConfig.type === selectedTypeFilter)
          .map((typeConfig) => {
          const typeProcesses = processes.filter(p => p.projectId === selectedProject.id && p.type === typeConfig.type);
          const colors = getColorClasses(typeConfig.color);
          const Icon = typeConfig.icon;

          return (
            <div key={typeConfig.type} className={`bg-white rounded-xl border ${colors.border} overflow-hidden ${
              selectedTypeFilter === typeConfig.type ? 'ring-2 ring-offset-2 ring-' + typeConfig.color + '-400' : ''
            }`}>
              <div className={`${colors.bg} px-6 py-4 border-b ${colors.border}`}>
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                  <div className="flex-1">
                    <h3 className={`font-bold ${colors.text}`}>{typeConfig.label}</h3>
                    <p className="text-sm text-gray-600">{typeConfig.subtitle} • {typeConfig.description}</p>
                  </div>
                  {typeProcesses.length > 0 && (
                    <div className={`px-3 py-1 rounded-full ${colors.bg} ${colors.border} border`}>
                      <span className={`text-sm font-semibold ${colors.text}`}>
                        {typeProcesses.length} processus
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setShowCreateModal(true);
                      // On pourrait pré-sélectionner le type ici
                    }}
                    className={`text-sm px-3 py-1.5 ${colors.bg} ${colors.border} border rounded-lg ${colors.hover} transition-colors`}
                  >
                    + Ajouter
                  </button>
                </div>
              </div>

              {typeProcesses.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  Aucun processus créé pour cette catégorie
                  <div className="mt-3">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      + Créer le premier processus
                    </button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {typeProcesses.map((process) => (
                    <div key={process.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <button
                          onClick={() => setSelectedProcess(process)}
                          className="flex-1 text-left"
                        >
                          <h4 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                            {process.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">🎯 {process.objective}</p>
                          
                          {/* Schéma mini des étapes */}
                          <div className="flex items-center gap-1 mt-3 mb-2">
                            {process.steps.slice(0, 8).map((step, idx) => (
                              <div
                                key={step.id}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                  step.status === 'done'
                                    ? 'bg-green-500 text-white'
                                    : step.status === 'in-progress'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                                title={step.title}
                              >
                                {idx + 1}
                              </div>
                            ))}
                            {process.steps.length > 8 && (
                              <span className="text-xs text-gray-500 ml-1">
                                +{process.steps.length - 8}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                              👤 {process.responsible}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              {process.steps.filter(s => s.status === 'done').length}/{process.steps.length} étapes validées
                            </span>
                            {process.contributors.slice(0, 2).map((contributor, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                {contributor}
                              </span>
                            ))}
                            {process.contributors.length > 2 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                +{process.contributors.length - 2} autres
                              </span>
                            )}
                          </div>
                        </button>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleEditProcess(process)}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteProcess(process.id, process.title)}
                            className="p-2 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateProcessModalWithTestData
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          onClose={() => {
            setShowCreateModal(false);
            setProcessToEdit(null);
          }}
          onSuccess={(newProcess) => {
            if (processToEdit) {
              // Mode édition : remplacer le processus existant
              setProcesses(processes.map(p => p.id === processToEdit.id ? newProcess : p));
            } else {
              // Mode création : ajouter un nouveau processus
              setProcesses([...processes, newProcess]);
            }
            setShowCreateModal(false);
            setProcessToEdit(null);
          }}
          processToEdit={processToEdit}
        />
      )}

      {selectedProcess && (
        <ProcessDetailModal
          process={selectedProcess}
          onClose={() => setSelectedProcess(null)}
        />
      )}
    </div>
  );
}