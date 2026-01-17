import { useState } from 'react';
import { X, User, Users, Check, CheckCircle2 } from 'lucide-react';
import { Position, TeamMember } from '../types/positions';

interface AssignMemberToPositionModalProps {
  position: Position;
  members: TeamMember[];
  assignedMemberIds: string[];
  onClose: () => void;
  onAssign: (memberId: string) => void;
  onUnassign: (memberId: string) => void;
}

export function AssignMemberToPositionModal({
  position,
  members,
  assignedMemberIds,
  onClose,
  onAssign,
  onUnassign,
}: AssignMemberToPositionModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [justAssigned, setJustAssigned] = useState<string[]>([]);
  
  const availableMembers = members.filter(m => !assignedMemberIds.includes(m.id));
  const assignedMembers = members.filter(m => assignedMemberIds.includes(m.id));

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleAssignSelected = () => {
    selectedMembers.forEach(memberId => {
      onAssign(memberId);
      setJustAssigned(prev => [...prev, memberId]);
    });
    setSelectedMembers([]);
    // Retirer le feedback après 2 secondes
    setTimeout(() => {
      setJustAssigned([]);
    }, 2000);
  };

  const handleAssignSingle = (memberId: string) => {
    onAssign(memberId);
    setJustAssigned([memberId]);
    setTimeout(() => {
      setJustAssigned([]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Assigner des membres au poste</h2>
            <p className="text-sm text-gray-600 mt-1">{position.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Membres assignés */}
          {assignedMembers.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                Membres assignés ({assignedMembers.length})
              </h3>
              <div className="space-y-2">
                {assignedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                          {member.initials}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.email}</p>
                        {member.company && (
                          <p className="text-xs text-gray-500">{member.company}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onUnassign(member.id)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Membres disponibles */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                Membres disponibles ({availableMembers.length})
              </h3>
              {selectedMembers.length > 0 && (
                <button
                  onClick={handleAssignSelected}
                  className="px-4 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                >
                  Assigner {selectedMembers.length} membre{selectedMembers.length > 1 ? 's' : ''}
                </button>
              )}
            </div>
            {availableMembers.length > 0 ? (
              <div className="space-y-2">
                {availableMembers.map((member) => {
                  const isSelected = selectedMembers.includes(member.id);
                  const isJustAssigned = justAssigned.includes(member.id);
                  
                  return (
                    <div
                      key={member.id}
                      onClick={() => toggleMemberSelection(member.id)}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-400 shadow-md'
                          : isJustAssigned
                          ? 'bg-green-50 border-green-400'
                          : 'bg-white border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                            {member.initials}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{member.name}</p>
                            {isJustAssigned && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{member.email}</p>
                          {member.company && (
                            <p className="text-xs text-gray-500">{member.company}</p>
                          )}
                        </div>
                      </div>
                      {!isSelected && !isJustAssigned && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignSingle(member.id);
                          }}
                          className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ml-2"
                        >
                          Assigner
                        </button>
                      )}
                      {isJustAssigned && (
                        <span className="px-3 py-1.5 text-sm text-green-700 bg-green-100 rounded-lg font-medium ml-2">
                          Assigné ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Tous les membres sont déjà assignés à ce poste</p>
              </div>
            )}
          </div>

          {/* Bouton fermer */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
