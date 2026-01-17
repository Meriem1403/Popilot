import { useState } from 'react';
import { Plus, Mail, Phone, MoreVertical, Award, Target, Eye, Pencil, Trash, ChevronRight, Users, ArrowLeft } from 'lucide-react';
import { TeamMemberModal } from './TeamMemberModal';
import { MemberDetailsModal } from './MemberDetailsModal';
import { useApi } from '../hooks/useApi';
import { Project } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TeamView() {
  const { data: projects, loading: projectsLoading } = useApi<Project[]>('/projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false); // For Add/Edit
  const [editingMember, setEditingMember] = useState<any>(null);
  const [viewingMember, setViewingMember] = useState<any>(null);

  const initialMembers = [
    {
      id: 1,
      name: 'Jean Dupont',
      initials: 'JD',
      role: 'Chef de projet',
      email: 'jean.dupont@company.com',
      phone: '+33 6 12 34 56 78',
      workload: 85,
      projects: ['Refonte plateforme digitale', 'Migration infrastructure cloud', 'Certification ISO 27001'],
      objectives: [
        { name: 'Livrer 3 projets dans les temps', progress: 67 },
        { name: 'Maintenir satisfaction équipe > 4/5', progress: 80 },
      ],
      trophies: ['Leadership', 'Respect délais'],
      availability: 'Disponible',
    },
    {
      id: 2,
      name: 'Marie Laurent',
      initials: 'ML',
      role: 'Designer UX/UI',
      email: 'marie.laurent@company.com',
      phone: '+33 6 23 45 67 89',
      workload: 60,
      projects: ['Refonte plateforme digitale', 'Application mobile interne'],
      objectives: [
        { name: 'Finaliser 50 maquettes', progress: 85 },
        { name: 'Formation Figma avancé', progress: 100 },
      ],
      trophies: ['Qualité constante', 'Innovation'],
      availability: 'Disponible',
    },
    {
      id: 3,
      name: 'Thomas Serrano',
      initials: 'TS',
      role: 'Architecte Cloud',
      email: 'thomas.serrano@company.com',
      phone: '+33 6 34 56 78 90',
      workload: 95,
      projects: ['Migration infrastructure cloud'],
      objectives: [
        { name: 'Migration cloud complète', progress: 45 },
        { name: 'Certification AWS Solutions Architect', progress: 60 },
      ],
      trophies: ['Expertise technique'],
      availability: 'Surchargé',
    },
    {
      id: 4,
      name: 'Aline Moreau',
      initials: 'AM',
      role: 'Responsable Qualité',
      email: 'aline.moreau@company.com',
      phone: '+33 6 45 67 89 01',
      workload: 70,
      projects: ['Certification ISO 27001'],
      objectives: [
        { name: 'Obtenir certification ISO 27001', progress: 82 },
        { name: 'Former 10 collaborateurs à la qualité', progress: 70 },
      ],
      trophies: ['Respect des normes', 'Leadership'],
      availability: 'Disponible',
    },
    {
      id: 5,
      name: 'Paul Leblanc',
      initials: 'PL',
      role: 'Développeur Full-Stack',
      email: 'paul.leblanc@company.com',
      phone: '+33 6 56 78 90 12',
      workload: 80,
      projects: ['Refonte plateforme digitale', 'Application mobile interne'],
      objectives: [
        { name: 'Développer 100 user stories', progress: 55 },
        { name: 'Réduire dette technique de 30%', progress: 40 },
      ],
      trophies: ['Qualité code', 'Entraide'],
      availability: 'Disponible',
    },
    {
      id: 6,
      name: 'Alice Chevalier',
      initials: 'AC',
      role: 'Ingénieure QA',
      email: 'alice.chevalier@company.com',
      phone: '+33 6 67 89 01 23',
      workload: 55,
      projects: ['Refonte plateforme digitale'],
      objectives: [
        { name: 'Automatiser 80% des tests', progress: 65 },
        { name: 'Zéro bug critique en production', progress: 90 },
      ],
      trophies: ['Zéro bug', 'Qualité constante'],
      availability: 'Disponible',
    },
    {
      id: 7,
      name: 'Karim Benali',
      initials: 'KB',
      role: 'DBA Senior',
      email: 'karim.benali@company.com',
      phone: '+33 6 78 90 12 34',
      workload: 75,
      projects: ['Migration infrastructure cloud'],
      objectives: [
        { name: 'Migration BDD sans perte données', progress: 30 },
        { name: 'Optimiser performances de 50%', progress: 45 },
      ],
      trophies: ['Expertise technique'],
      availability: 'Disponible',
    },
    {
      id: 8,
      name: 'Nadia Cohen',
      initials: 'NC',
      role: 'Designer Mobile',
      email: 'nadia.cohen@company.com',
      phone: '+33 6 89 01 23 45',
      workload: 50,
      projects: ['Application mobile interne'],
      objectives: [
        { name: 'Créer design system mobile', progress: 75 },
        { name: 'Tests utilisateurs > 4.5/5', progress: 80 },
      ],
      trophies: ['Innovation', 'Qualité design'],
      availability: 'Disponible',
    },
  ];

  const [teamMembers, setTeamMembers] = useState(initialMembers);

  const calculateAvailability = (workload: number) => {
    if (workload >= 90) return 'Surchargé';
    if (workload >= 70) return 'Occupé';
    return 'Disponible';
  };

  const handleSaveMember = (data: any) => {
    if (editingMember) {
      // Update existing
      setTeamMembers(teamMembers.map(m =>
        m.id === editingMember.id ? {
          ...m,
          ...data,
          availability: calculateAvailability(data.workload)
        } : m
      ));
      console.log('Membre modifié:', data);
    } else {
      // Add new
      const newMember = {
        ...data,
        id: Math.max(...teamMembers.map(m => m.id)) + 1,
        projects: [], // Default
        objectives: [], // Default
        trophies: [], // Default
        availability: calculateAvailability(data.workload)
      };
      setTeamMembers([...teamMembers, newMember]);
      console.log('Nouveau membre ajouté:', newMember);
      alert('✅ Membre ajouté avec succès !\n\n📋 Plan d\'onboarding généré automatiquement\n🎓 Tâches d\'intégration créées\n🔔 Notifications envoyées');
    }
    setShowModal(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      setTeamMembers(teamMembers.filter(m => m.id !== id));
    }
  };

  const openEditModal = (member: any) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingMember(null);
    setShowModal(true);
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return { bg: 'bg-red-100', bar: 'bg-red-600', text: 'text-red-800' };
    if (workload >= 75) return { bg: 'bg-orange-100', bar: 'bg-orange-600', text: 'text-orange-800' };
    if (workload >= 60) return { bg: 'bg-yellow-100', bar: 'bg-yellow-600', text: 'text-yellow-800' };
    return { bg: 'bg-green-100', bar: 'bg-green-600', text: 'text-green-800' };
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability === 'Surchargé') return 'bg-red-100 text-red-800 border-red-200';
    if (availability === 'Occupé') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  // Filtrer les membres par projet sélectionné
  const filteredMembers = selectedProject
    ? teamMembers.filter(member => 
        member.projects && member.projects.some(project => 
          project === selectedProject.name || project.toLowerCase().includes(selectedProject.name.toLowerCase())
        )
      )
    : [];

  // Vue de sélection de projet
  if (!selectedProject) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Équipe</h1>
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
          ) : projects && projects.length > 0 ? (
            projects.map((project) => {
              // Compter les membres du projet
              const projectMembers = teamMembers.filter(member =>
                member.projects && member.projects.some(p =>
                  p === project.name || p.toLowerCase().includes(project.name.toLowerCase())
                )
              );

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
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{projectMembers.length} membre{projectMembers.length > 1 ? 's' : ''} dans l'équipe</span>
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
            <p className="text-gray-600 mt-1">Membres travaillant sur ce projet</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={openAddModal}>
          <Plus className="w-5 h-5" />
          Ajouter un membre
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{filteredMembers.length}</div>
          <div className="text-sm text-gray-600">Membres actifs</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="text-2xl font-bold text-green-900">
            {filteredMembers.filter((m) => m.availability === 'Disponible').length}
          </div>
          <div className="text-sm text-green-700">Disponibles</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-200 bg-red-50">
          <div className="text-2xl font-bold text-red-900">
            {filteredMembers.filter((m) => m.workload >= 90).length}
          </div>
          <div className="text-sm text-red-700">Surchargés</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {filteredMembers.length > 0 ? Math.round(filteredMembers.reduce((acc, m) => acc + m.workload, 0) / filteredMembers.length) : 0}%
          </div>
          <div className="text-sm text-gray-600">Charge moyenne</div>
        </div>
      </div>

      {/* Message si aucun membre */}
      {filteredMembers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucun membre assigné à ce projet</p>
          <button
            onClick={openAddModal}
            className="text-blue-600 hover:underline"
          >
            Ajouter un membre à l'équipe
          </button>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMembers.map((member) => {
          const workloadColors = getWorkloadColor(member.workload);

          return (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Member Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-xl flex items-center justify-center font-semibold flex-shrink-0">
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewingMember(member)} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Consulter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditModal(member)} className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteMember(member.id)} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                            <Trash className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(member.availability)}`}>
                        {member.availability}
                      </span>
                      {member.trophies.map((trophy, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          {trophy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Workload */}
              <div className={`px-6 py-4 ${workloadColors.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${workloadColors.text}`}>
                    Charge de travail
                  </span>
                  <span className={`text-sm font-bold ${workloadColors.text}`}>
                    {member.workload}%
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2.5">
                  <div
                    className={`${workloadColors.bar} h-2.5 rounded-full transition-all`}
                    style={{ width: `${member.workload}%` }}
                  ></div>
                </div>
              </div>

              {/* Contact */}
              <div className="px-6 py-4 border-b border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{member.phone}</span>
                </div>
              </div>

              {/* Projects */}
              {member.projects && member.projects.length > 0 && (
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Projets assignés</h4>
                  <div className="space-y-1">
                    {member.projects.map((project, idx) => {
                      const isSelectedProject = project === selectedProject.name || 
                        project.toLowerCase().includes(selectedProject.name.toLowerCase());
                      return (
                        <div 
                          key={idx} 
                          className={`text-sm ${isSelectedProject ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}
                        >
                          • {project}
                          {isSelectedProject && (
                            <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                              Actuel
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Objectives */}
              <div className="px-6 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-gray-600" />
                  <h4 className="text-sm font-semibold text-gray-700">Objectifs individuels</h4>
                </div>
                <div className="space-y-3">
                  {member.objectives.map((objective, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{objective.name}</span>
                        <span className="text-xs font-medium text-gray-500">
                          {objective.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${objective.progress === 100
                              ? 'bg-green-500'
                              : objective.progress >= 70
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
            </div>
          );
        })}
      </div>

      {/* Team Member Modal (Add/Edit) */}
      {showModal && (
        <TeamMemberModal
          member={editingMember}
          onClose={() => {
            setShowModal(false);
            setEditingMember(null);
          }}
          onSubmit={handleSaveMember}
        />
      )}

      {/* Member Details Modal (View) */}
      {viewingMember && (
        <MemberDetailsModal
          member={viewingMember}
          onClose={() => setViewingMember(null)}
        />
      )}
    </div>
  );
}