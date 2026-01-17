import { X, Mail, Phone, Award, Target, Briefcase, User, CheckCircle2, BookOpen, Tag } from 'lucide-react';

interface MemberDetailsModalProps {
    member: any;
    onClose: () => void;
}

export function MemberDetailsModal({ member, onClose }: MemberDetailsModalProps) {
    if (!member) return null;

    // Fonction pour obtenir la couleur de la charge de travail
    const getWorkloadColor = (workload: number) => {
        if (workload >= 90) return { bg: 'bg-red-100', bar: 'bg-red-600', text: 'text-red-800' };
        if (workload >= 75) return { bg: 'bg-orange-100', bar: 'bg-orange-600', text: 'text-orange-800' };
        if (workload >= 60) return { bg: 'bg-yellow-100', bar: 'bg-yellow-600', text: 'text-yellow-800' };
        return { bg: 'bg-green-100', bar: 'bg-green-600', text: 'text-green-800' };
    };

    // Fonction pour obtenir la couleur de disponibilité
    const getAvailabilityColor = (availability: string) => {
        if (availability === 'Surchargé') return 'bg-red-100 text-red-800 border-red-200';
        if (availability === 'Occupé') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    const workloadColors = getWorkloadColor(member.workload || 0);
    const availabilityColor = getAvailabilityColor(member.availability || 'Disponible');

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl flex items-center justify-center font-bold flex-shrink-0 shadow-lg ring-4 ring-indigo-100">
                                {member.photoUrl ? (
                                    <img src={member.photoUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    member.initials || member.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '?'
                                )}
                            </div>
                            
                            {/* Nom et rôle */}
                            <div className="flex-1 min-w-0">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h2>
                                <p className="text-indigo-600 font-semibold text-base mb-2">{member.role}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                    {member.category && (
                                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
                                            {member.category}
                                        </span>
                                    )}
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${availabilityColor}`}>
                                        {member.availability || 'Disponible'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Bouton fermer */}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Contenu */}
                <div className="p-6 space-y-6">
                    {/* Contact */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-indigo-500" />
                            Informations de contact
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                                    {member.email}
                                </a>
                            </div>
                            {member.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span>{member.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Charge de travail */}
                    <div className={`rounded-lg p-4 border ${workloadColors.bg} border-gray-200`}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-indigo-500" />
                                Charge de travail
                            </h3>
                            <span className={`text-sm font-bold ${workloadColors.text}`}>
                                {member.workload || 0}%
                            </span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-3">
                            <div
                                className={`${workloadColors.bar} h-3 rounded-full transition-all`}
                                style={{ width: `${member.workload || 0}%` }}
                            ></div>
                        </div>
                        {member.assignedTasks && member.assignedTasks.length > 0 && (
                            <p className="text-xs text-gray-600 mt-2">
                                {member.assignedTasks.length} tâche{member.assignedTasks.length > 1 ? 's' : ''} assignée{member.assignedTasks.length > 1 ? 's' : ''}
                            </p>
                        )}
                    </div>

                    {/* Responsabilités */}
                    {member.responsibilities && member.responsibilities.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-indigo-500" />
                                Responsabilités principales
                            </h3>
                            <div className="space-y-2">
                                {member.responsibilities.map((responsibility: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                            <span className="flex-1">{responsibility}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Compétences */}
                    {member.skills && member.skills.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-indigo-500" />
                                Compétences
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tâches assignées */}
                    {member.assignedTasks && member.assignedTasks.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                Tâches assignées
                            </h3>
                            <div className="space-y-2">
                                {member.assignedTasks.map((task: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
                                    >
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                            <span className="flex-1">{task}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projets assignés */}
                    {member.projects && member.projects.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-indigo-500" />
                                Projets assignés
                            </h3>
                            <div className="space-y-2">
                                {member.projects.map((project: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                            <span>{project}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Objectifs individuels */}
                    {member.objectives && member.objectives.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4 text-indigo-500" />
                                Objectifs individuels
                            </h3>
                            <div className="space-y-4">
                                {member.objectives.map((objective: any, idx: number) => (
                                    <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{objective.name}</span>
                                            <span className="text-xs font-semibold text-gray-600">
                                                {objective.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all ${
                                                    objective.progress === 100
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
                    )}

                    {/* Trophées */}
                    {member.trophies && member.trophies.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <Award className="w-4 h-4 text-amber-500" />
                                Distinctions
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {member.trophies.map((trophy: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200 flex items-center gap-1.5"
                                    >
                                        <Award className="w-3.5 h-3.5 text-amber-500" />
                                        {trophy}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Message si aucune donnée supplémentaire */}
                    {(!member.projects || member.projects.length === 0) &&
                        (!member.objectives || member.objectives.length === 0) &&
                        (!member.trophies || member.trophies.length === 0) &&
                        (!member.responsibilities || member.responsibilities.length === 0) &&
                        (!member.skills || member.skills.length === 0) &&
                        (!member.assignedTasks || member.assignedTasks.length === 0) && (
                            <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
                                <p className="text-sm text-gray-500">Aucune information supplémentaire disponible</p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
