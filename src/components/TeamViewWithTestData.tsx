import { useState } from 'react';
import { Plus, Mail, Phone, Award, Upload, Users, MoreVertical, Eye, Pencil, Trash, ChevronRight, ArrowLeft, UserPlus, Briefcase, UserCheck, X } from 'lucide-react';
import { TEST_POSITIONS, TEST_MEMBERS, TEST_POSITION_CATEGORIES, getPositionsByProject, getMembersByPosition, getCategories } from '../data/testPositions';
import { MemberDetailsModal } from './MemberDetailsModal';
import { CreateMemberModal } from './CreateMemberModal';
import { CreatePositionModal } from './CreatePositionModal';
import { CreateCategoryModal } from './CreateCategoryModal';
import { AssignMemberToPositionModal } from './AssignMemberToPositionModal';
import { PositionCategory } from '../types/positions';
import { useApi } from '../hooks/useApi';
import { Project } from '../types';
import { Position, TeamMember } from '../types/positions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TeamViewWithTestData() {
  const { data: projects, loading: projectsLoading, error: projectsError } = useApi<Project[]>('/projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewingMember, setViewingMember] = useState<TeamMember | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [viewingPosition, setViewingPosition] = useState<Position | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState<'positions' | 'members'>('members');
  
  // Modals
  const [showCreateMemberModal, setShowCreateMemberModal] = useState(false);
  const [showCreatePositionModal, setShowCreatePositionModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState<Position | null>(null);

  // Initialize state with test data
  const [positions, setPositions] = useState<Position[]>(TEST_POSITIONS);
  const [members, setMembers] = useState<TeamMember[]>(TEST_MEMBERS);
  const [categories, setCategories] = useState<PositionCategory[]>(TEST_POSITION_CATEGORIES); // Catégories de test + créées dynamiquement

  // Handlers
  const handleCreateMember = (memberData: any) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `member-${Date.now()}`,
      assignedPositions: [],
      workload: 0,
      createdAt: new Date().toISOString(),
    };
    setMembers([...members, newMember]);
    alert('✅ Membre créé avec succès !');
  };

  const handleUpdateMember = (memberData: any) => {
    if (!editingMember) return;
    const updatedMember: TeamMember = {
      ...editingMember,
      ...memberData,
      updatedAt: new Date().toISOString(),
    };
    setMembers(members.map(m => m.id === editingMember.id ? updatedMember : m));
    setEditingMember(null);
    alert('✅ Membre modifié avec succès !');
  };

  const handleDeleteMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le membre "${member.name}" ? Cette action est irréversible.`)) {
      return;
    }

    // Retirer le membre des postes assignés
    setPositions(positions.map(pos => ({
      ...pos,
      assignedMembers: pos.assignedMembers.filter(id => id !== memberId)
    })));

    // Supprimer le membre
    setMembers(members.filter(m => m.id !== memberId));
    alert('✅ Membre supprimé avec succès !');
  };

  const handleCreateCategory = (categoryData: { name: string; description?: string; color: string }) => {
    const newCategory: PositionCategory = {
      id: `cat-${Date.now()}`,
      ...categoryData,
      createdAt: new Date().toISOString(),
    };
    setCategories([...categories, newCategory]);
    alert('✅ Catégorie créée avec succès !');
  };

  const handleCreatePosition = (positionData: any) => {
    if (!selectedProject) return;
    const newPosition: Position = {
      ...positionData,
      id: `position-${Date.now()}`,
      assignedMembers: [],
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setPositions([...positions, newPosition]);
    alert('✅ Poste créé avec succès !');
  };

  const handleUpdatePosition = (positionData: any) => {
    if (!editingPosition) return;
    setPositions(positions.map(pos => 
      pos.id === editingPosition.id 
        ? { ...pos, ...positionData, updatedAt: new Date().toISOString() }
        : pos
    ));
    setEditingPosition(null);
    alert('✅ Poste modifié avec succès !');
  };

  const handleDeletePosition = (positionId: string) => {
    const position = positions.find(p => p.id === positionId);
    if (!position) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le poste "${position.title}" ? Cette action est irréversible.`)) {
      return;
    }

    // Retirer le poste des membres assignés
    setMembers(members.map(mem => ({
      ...mem,
      assignedPositions: mem.assignedPositions.filter(id => id !== positionId)
    })));

    // Supprimer le poste
    setPositions(positions.filter(p => p.id !== positionId));
    alert('✅ Poste supprimé avec succès !');
  };

  const handleAssignMember = (positionId: string, memberId: string) => {
    setPositions(positions.map(pos => {
      if (pos.id === positionId) {
        const newAssigned = [...pos.assignedMembers, memberId];
        return {
          ...pos,
          assignedMembers: newAssigned,
          status: newAssigned.length > 0 ? 'filled' : 'open',
        };
      }
      return pos;
    }));
    setMembers(members.map(mem => {
      if (mem.id === memberId) {
        return {
          ...mem,
          assignedPositions: [...mem.assignedPositions, positionId],
        };
      }
      return mem;
    }));
  };

  const handleUnassignMember = (positionId: string, memberId: string) => {
    setPositions(positions.map(pos => {
      if (pos.id === positionId) {
        const newAssigned = pos.assignedMembers.filter(id => id !== memberId);
        return {
          ...pos,
          assignedMembers: newAssigned,
          status: newAssigned.length > 0 ? 'filled' : 'open',
        };
      }
      return pos;
    }));
    setMembers(members.map(mem => {
      if (mem.id === memberId) {
        return {
          ...mem,
          assignedPositions: mem.assignedPositions.filter(id => id !== positionId),
        };
      }
      return mem;
    }));
  };

  // Get positions for selected project
  // En mode test, on affiche toutes les positions de test pour n'importe quel projet
  const projectPositions = selectedProject
    ? positions.filter(p => p.projectId === selectedProject.id || p.projectId === 'popy')
    : [];

  const dynamicCategories = Array.from(new Set(projectPositions.map(p => p.category)));

  // Helper function to get members by position (using local state)
  const getMembersByPositionLocal = (positionId: string): TeamMember[] => {
    const position = positions.find(p => p.id === positionId);
    if (!position) return [];
    return members.filter(m => position.assignedMembers.includes(m.id));
  };


  const getStatusColor = (status: string) => {
    if (status === 'filled') return 'bg-green-100 text-green-700 border-green-300';
    if (status === 'partial') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability === 'Surchargé') return 'bg-red-100 text-red-700 border-red-300';
    if (availability === 'En congé') return 'bg-gray-100 text-gray-700 border-gray-300';
    return 'bg-green-100 text-green-700 border-green-300';
  };

  const getCategoryColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      indigo: 'bg-indigo-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      teal: 'bg-teal-500',
      cyan: 'bg-cyan-500',
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getCategoryColorHex = (color: string) => {
    const colorMap: Record<string, string> = {
      indigo: '#6366f1',
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#a855f7',
      pink: '#ec4899',
      orange: '#f97316',
      red: '#ef4444',
      yellow: '#eab308',
      teal: '#14b8a6',
      cyan: '#06b6d4',
    };
    return colorMap[color] || '#6b7280';
  };

  // Vue de sélection de projet
  if (!selectedProject) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Équipe POPY</h1>
          <p className="text-gray-600 mt-1">
            Sélectionnez un projet pour voir l'équipe qui travaille dessus
          </p>
        </div>

        {/* Project Selection */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projectsLoading ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Chargement des projets...
            </div>
          ) : projectsError ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-600 mb-2">Erreur lors du chargement des projets</p>
              <p className="text-sm text-gray-500">{projectsError}</p>
            </div>
          ) : projects && projects.length > 0 ? (
            projects.map((project) => {
              // En mode test, on affiche toutes les positions de test pour n'importe quel projet
              const projectPositions = positions.filter(p => p.projectId === project.id || p.projectId === 'popy');
              const totalMembers = new Set(
                projectPositions.flatMap(p => p.assignedMembers)
              ).size;

              return (
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
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{projectPositions.length} poste{projectPositions.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{totalMembers} membre{totalMembers > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucun projet disponible
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vue de l'équipe du projet sélectionné
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Retour à la sélection de projet"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Équipe - {selectedProject.name}</h1>
            <p className="text-gray-600 mt-1">
              Membres travaillant sur ce projet
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            onClick={() => setShowCreateMemberModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-medium"
          >
            <UserPlus className="w-5 h-5" />
            Créer un membre
          </button>
          {selectedProject && (
            <>
        <button
                onClick={() => setShowCreateCategoryModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-medium"
        >
          <Plus className="w-5 h-5" />
                Créer une catégorie
              </button>
              <button
                onClick={() => {
                  setEditingPosition(null);
                  setShowCreatePositionModal(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-medium"
              >
                <Briefcase className="w-5 h-5" />
                Créer un poste
        </button>
            </>
          )}
        </div>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{projectPositions.length}</div>
          <div className="text-sm text-gray-600">Postes</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
          <div className="text-2xl font-bold text-green-900">
            {projectPositions.filter(p => p.status === 'filled').length}
          </div>
          <div className="text-sm text-green-700">Postes pourvus</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">
            {projectPositions.filter(p => p.status === 'open').length}
          </div>
          <div className="text-sm text-gray-700">Postes vacants</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 shadow-sm">
          <div className="text-2xl font-bold text-indigo-900">
            {new Set(projectPositions.flatMap(p => p.assignedMembers)).size}
          </div>
          <div className="text-sm text-indigo-700">Membres assignés</div>
        </div>
      </div>

      {/* Onglets */}
      <div className="w-full">
        <div className="flex items-center gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'members'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Membres
          </button>
          <button
            onClick={() => setActiveTab('positions')}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'positions'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Postes
          </button>
        </div>

        {activeTab === 'positions' && (
          <div className="space-y-6">

          {/* Message si aucun poste */}
          {projectPositions.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Aucun poste créé pour ce projet</p>
              <button
                onClick={() => setShowCreatePositionModal(true)}
                className="text-indigo-600 hover:underline"
              >
                Créer un premier poste
              </button>
            </div>
          )}

      {/* Filtres par catégorie */}
          {projectPositions.length > 0 && (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === null
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
        >
                <Briefcase className="w-4 h-4 inline mr-2" />
                Tous ({projectPositions.length})
        </button>
        {dynamicCategories.map(category => {
                const count = projectPositions.filter(p => p.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>
          )}

          {/* Postes par catégorie */}
          {projectPositions.length > 0 && (
      <div className="space-y-6">
          {dynamicCategories
            .filter(cat => !selectedCategory || cat === selectedCategory)
            .map(category => {
              const categoryPositions = projectPositions.filter(p => p.category === category);

          return (
            <div key={category} className="space-y-4">
              {/* Titre de catégorie */}
              {(() => {
                const categoryInfo = categories.find(c => c.name === category);
                const categoryColorHex = categoryInfo ? getCategoryColorHex(categoryInfo.color) : '#6366f1';
                return (
              <div className="flex items-center gap-3">
                    <div 
                      className="h-1 flex-1 rounded"
                      style={{ backgroundColor: categoryColorHex }}
                    ></div>
                    <div className="flex items-center gap-2">
                      {categoryInfo && (
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: categoryColorHex }}
                        ></div>
                      )}
                <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                  {category}
                </h2>
                    </div>
                    <div 
                      className="h-1 flex-1 rounded"
                      style={{ backgroundColor: categoryColorHex }}
                    ></div>
              </div>
                );
              })()}

              {/* Cartes des postes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryPositions.map((position) => {
                  const assignedMembers = getMembersByPositionLocal(position.id);
                  return (
                  <div
                    key={position.id}
                    className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all p-5 relative group"
                  >

                    {/* Header du poste */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h3 className="font-bold text-lg text-gray-900 flex-1">{position.title}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(position.status)} whitespace-nowrap`}>
                            {position.status === 'filled' ? 'Pourvu' : position.status === 'partial' ? 'Partiel' : 'Vacant'}
                          </span>
                          {/* Menu contextuel (3 points) */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem onClick={() => setViewingPosition(position)} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                                Consulter
                          </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setEditingPosition(position);
                                  setShowCreatePositionModal(true);
                                }} 
                                className="cursor-pointer"
                              >
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setShowAssignModal(position)} className="cursor-pointer">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Assigner des membres
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeletePosition(position.id)} 
                                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                              >
                            <Trash className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                        </div>
                      </div>
                      {(() => {
                        const categoryInfo = categories.find(c => c.name === position.category);
                        return categoryInfo ? (
                          <div className="flex items-center gap-2 mt-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getCategoryColorHex(categoryInfo.color) }}
                            ></div>
                            <span className="text-xs text-gray-600">{position.category}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-600 mt-2">{position.category}</span>
                        );
                      })()}
                    </div>

                    {/* Membres assignés */}
                    {assignedMembers.length > 0 ? (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Membres assignés ({assignedMembers.length})</h4>
                        <div className="space-y-2">
                          {assignedMembers.map((member) => (
                            <div key={member.id} className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                                  className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
                            {member.initials}
                          </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                                {member.company && (
                                  <p className="text-xs text-gray-600 truncate">{member.company}</p>
                        )}
                      </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => setViewingMember(member)}
                                  className="p-1 text-indigo-600 hover:bg-indigo-100 rounded transition-colors"
                                  title="Consulter"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleUnassignMember(position.id, member.id)}
                                  className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                  title="Retirer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                      </div>
                    </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
                        <p className="text-xs text-gray-500 mb-2">Aucun membre assigné</p>
                        <button
                          onClick={() => setShowAssignModal(position)}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Assigner un membre
                        </button>
                      </div>
                    )}

                    {/* Responsabilités */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Responsabilités</h4>
                      <ul className="space-y-1">
                        {position.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span className="flex-1">{resp}</span>
                          </li>
                        ))}
                      </ul>
                      {position.responsibilities.length > 3 && (
                        <p className="text-xs text-gray-500 mt-1">+ {position.responsibilities.length - 3} de plus</p>
                      )}
                    </div>

                    {/* Compétences requises */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Compétences requises</h4>
                      <div className="flex flex-wrap gap-1">
                        {position.requiredSkills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium border border-indigo-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {position.requiredSkills.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            +{position.requiredSkills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
          )}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Liste des membres */}
            {members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => {
                  const assignedPositions = positions.filter(p => p.assignedMembers.includes(member.id));
                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all p-5 relative group"
                    >
                      {/* Menu contextuel (3 points) */}
                      <div className="absolute top-4 right-4 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => setViewingMember(member)} className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              Consulter
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setEditingMember(member);
                                setShowCreateMemberModal(true);
                              }} 
                              className="cursor-pointer"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteMember(member.id)} 
                              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Header du membre */}
                      <div className="flex items-start gap-4 mb-4 pr-8">
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xl">
                            {member.initials}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 truncate">{member.name}</h3>
                          <p className="text-sm text-indigo-600 font-medium">{member.email}</p>
                          {member.company && (
                            <p className="text-xs text-gray-600 mt-1">{member.company}</p>
                          )}
                          <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold border ${getAvailabilityColor(member.availability)}`}>
                            {member.availability}
                          </span>
                        </div>
                      </div>

                      {/* Postes assignés */}
                      {assignedPositions.length > 0 ? (
                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Postes assignés ({assignedPositions.length})</h4>
                          <div className="space-y-1">
                            {assignedPositions.slice(0, 3).map((position) => (
                              <div key={position.id} className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                                <Briefcase className="w-3 h-3 text-indigo-600" />
                                <span className="text-xs text-gray-700 truncate">{position.title}</span>
                              </div>
                            ))}
                            {assignedPositions.length > 3 && (
                              <p className="text-xs text-gray-500 mt-1">+ {assignedPositions.length - 3} autre{assignedPositions.length - 3 > 1 ? 's' : ''}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
                          <p className="text-xs text-gray-500">Aucun poste assigné</p>
                        </div>
                      )}

                      {/* Informations de contact */}
                      <div className="pt-4 border-t border-gray-200">
                        {member.phone && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                            <Phone className="w-3 h-3" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{member.email}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Aucun membre dans l'équipe</p>
                <button
                  onClick={() => setShowCreateMemberModal(true)}
                  className="text-indigo-600 hover:underline"
                >
                  Créer un premier membre
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateMemberModal && (
        <CreateMemberModal
          onClose={() => {
            setShowCreateMemberModal(false);
            setEditingMember(null);
          }}
          onSubmit={editingMember ? handleUpdateMember : handleCreateMember}
          editingMember={editingMember}
        />
      )}

      {showCreateCategoryModal && (
        <CreateCategoryModal
          onClose={() => setShowCreateCategoryModal(false)}
          onSubmit={handleCreateCategory}
        />
      )}

      {showCreatePositionModal && selectedProject && (
        <CreatePositionModal
          project={selectedProject}
          onClose={() => {
            setShowCreatePositionModal(false);
            setEditingPosition(null);
          }}
          onSubmit={editingPosition ? handleUpdatePosition : handleCreatePosition}
          onCreateCategory={handleCreateCategory}
          categories={categories}
          editingPosition={editingPosition}
        />
      )}

      {viewingPosition && selectedProject && (
        <CreatePositionModal
          project={selectedProject}
          onClose={() => setViewingPosition(null)}
          onSubmit={() => {}}
          onCreateCategory={handleCreateCategory}
          categories={categories}
          editingPosition={viewingPosition}
          isViewMode={true}
        />
      )}

      {showAssignModal && (
        <AssignMemberToPositionModal
          position={showAssignModal}
          members={members}
          assignedMemberIds={showAssignModal.assignedMembers}
          onClose={() => setShowAssignModal(null)}
          onAssign={(memberId) => handleAssignMember(showAssignModal.id, memberId)}
          onUnassign={(memberId) => handleUnassignMember(showAssignModal.id, memberId)}
        />
      )}

      {viewingMember && (
        <MemberDetailsModal
          member={viewingMember}
          onClose={() => setViewingMember(null)}
        />
      )}
    </div>
  );
}


