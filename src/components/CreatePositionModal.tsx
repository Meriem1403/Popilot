import { useState, useEffect } from 'react';
import { X, Plus, X as XIcon, PlusCircle } from 'lucide-react';
import { Position, PositionCategory } from '../types/positions';
import { Project } from '../types';
import { CreateCategoryModal } from './CreateCategoryModal';

interface CreatePositionModalProps {
  project: Project;
  onClose: () => void;
  onSubmit: (position: Omit<Position, 'id' | 'assignedMembers' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  onCreateCategory?: (category: { name: string; description?: string; color: string }) => void;
  categories: PositionCategory[]; // Catégories créées dynamiquement
  editingPosition?: Position | null; // Poste en cours d'édition
  isViewMode?: boolean; // Mode consultation (lecture seule)
}

export function CreatePositionModal({ project, onClose, onSubmit, onCreateCategory, categories, editingPosition, isViewMode = false }: CreatePositionModalProps) {
  const [formData, setFormData] = useState({
    title: editingPosition?.title || '',
    category: editingPosition?.category || '',
    responsibilities: editingPosition?.responsibilities || [],
    requiredSkills: editingPosition?.requiredSkills || [],
  });
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  
  const [localCategories, setLocalCategories] = useState<PositionCategory[]>(categories);

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setFormData({
        ...formData,
        responsibilities: [...formData.responsibilities, newResponsibility.trim()],
      });
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter((_, i) => i !== index),
    });
  };

  const getColorClass = (color: string) => {
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

  // Mettre à jour les catégories locales quand les props changent
  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleCreateCategory = (categoryData: { name: string; description?: string; color: string }) => {
    const newCategory: PositionCategory = {
      id: `cat-${Date.now()}`,
      ...categoryData,
      createdAt: new Date().toISOString(),
    };
    setLocalCategories([...localCategories, newCategory]);
    setFormData({ ...formData, category: categoryData.name });
    setShowCreateCategoryModal(false);
    if (onCreateCategory) {
      onCreateCategory(categoryData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.category && formData.responsibilities.length > 0 && formData.requiredSkills.length > 0) {
      onSubmit({
        projectId: project.id,
        projectName: project.name,
        title: formData.title,
        category: formData.category,
        responsibilities: formData.responsibilities,
        requiredSkills: formData.requiredSkills,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isViewMode ? 'Détails du poste' : editingPosition ? 'Modifier le poste' : 'Créer un poste'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Projet : {project.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Titre du poste */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titre du poste *</label>
            <input
              type="text"
              required
              disabled={isViewMode}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Ex: Chef de projet / Product Owner (PO)"
            />
          </div>

          {/* Catégorie */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">Catégorie *</label>
              {!isViewMode && (
                <button
                  type="button"
                  onClick={() => setShowCreateCategoryModal(true)}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Créer une catégorie
                </button>
              )}
            </div>
            {localCategories.length > 0 ? (
              <>
                <select
                  required
                  disabled={isViewMode}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {localCategories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                {formData.category && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    {(() => {
                      const selectedCategory = localCategories.find(c => c.name === formData.category);
                      return selectedCategory ? (
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded ${getColorClass(selectedCategory.color)}`}></div>
                          <p className="text-xs text-gray-600">{selectedCategory.description || 'Aucune description'}</p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">
                  Aucune catégorie disponible. Créez d'abord une catégorie.
                </p>
                <button
                  type="button"
                  onClick={() => setShowCreateCategoryModal(true)}
                  className="text-sm text-yellow-700 hover:text-yellow-900 font-medium underline"
                >
                  Créer une catégorie maintenant
                </button>
              </div>
            )}
          </div>

          {/* Responsabilités */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Responsabilités *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addResponsibility();
                  }
                }}
                disabled={isViewMode}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Ex: Vision du produit"
              />
              <button
                type="button"
                onClick={addResponsibility}
                disabled={isViewMode}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="flex-1 text-sm text-gray-700">{resp}</span>
                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
                    className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {formData.responsibilities.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">Ajoutez au moins une responsabilité</p>
            )}
          </div>

          {/* Compétences requises */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Compétences requises *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                disabled={isViewMode}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Ex: Gestion projet agile"
              />
              <button
                type="button"
                onClick={addSkill}
                disabled={isViewMode}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.requiredSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-200">
                  <span className="flex-1 text-sm text-indigo-700">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {formData.requiredSkills.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">Ajoutez au moins une compétence</p>
            )}
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {isViewMode ? 'Fermer' : 'Annuler'}
            </button>
            {!isViewMode && (
              <button
                type="submit"
                disabled={formData.responsibilities.length === 0 || formData.requiredSkills.length === 0}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingPosition ? 'Modifier le poste' : 'Créer le poste'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Modal de création de catégorie */}
      {showCreateCategoryModal && (
        <CreateCategoryModal
          onClose={() => setShowCreateCategoryModal(false)}
          onSubmit={handleCreateCategory}
        />
      )}
    </div>
  );
}
