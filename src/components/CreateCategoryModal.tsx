import { useState } from 'react';
import { X, Palette } from 'lucide-react';
import { PositionCategory } from '../types/positions';

interface CreateCategoryModalProps {
  onClose: () => void;
  onSubmit: (category: Omit<PositionCategory, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function CreateCategoryModal({ onClose, onSubmit }: CreateCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'indigo',
  });

  const colors = [
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500', hex: '#6366f1' },
    { value: 'blue', label: 'Bleu', class: 'bg-blue-500', hex: '#3b82f6' },
    { value: 'green', label: 'Vert', class: 'bg-green-500', hex: '#10b981' },
    { value: 'purple', label: 'Violet', class: 'bg-purple-500', hex: '#a855f7' },
    { value: 'pink', label: 'Rose', class: 'bg-pink-500', hex: '#ec4899' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500', hex: '#f97316' },
    { value: 'red', label: 'Rouge', class: 'bg-red-500', hex: '#ef4444' },
    { value: 'yellow', label: 'Jaune', class: 'bg-yellow-500', hex: '#eab308' },
    { value: 'teal', label: 'Sarcelle', class: 'bg-teal-500', hex: '#14b8a6' },
    { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500', hex: '#06b6d4' },
  ];

  // Fonction pour obtenir la classe de couleur
  const getColorClass = (colorValue: string) => {
    return colors.find(c => c.value === colorValue)?.class || 'bg-gray-500';
  };

  // Fonction pour obtenir la couleur hex
  const getColorHex = (colorValue: string) => {
    return colors.find(c => c.value === colorValue)?.hex || '#6b7280';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        color: formData.color,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Créer une catégorie de poste</h2>
            <p className="text-sm text-gray-600 mt-1">Définissez une nouvelle catégorie pour organiser les postes</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nom de la catégorie */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de la catégorie *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: Direction & Coordination"
            />
            <p className="text-xs text-gray-500 mt-1">Nom qui apparaîtra dans la liste des catégories</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Décrivez le type de postes que cette catégorie regroupe..."
            />
            <p className="text-xs text-gray-500 mt-1">Description optionnelle pour clarifier le rôle de cette catégorie</p>
          </div>

          {/* Couleur */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Couleur de la catégorie *
            </label>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => {
                const isSelected = formData.color === color.value;
                return (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={`relative p-3 rounded-lg border-2 transition-all bg-white ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-200 shadow-md'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <div 
                      className="w-full h-16 rounded-md mb-2 shadow-sm"
                      style={{ 
                        minHeight: '64px',
                        backgroundColor: color.hex
                      }}
                    ></div>
                    <p className="text-xs font-semibold text-gray-800 text-center">{color.label}</p>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">La couleur sera utilisée pour identifier visuellement cette catégorie</p>
          </div>

          {/* Aperçu */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Aperçu :</p>
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-full shadow-sm"
                style={{ backgroundColor: getColorHex(formData.color) }}
              ></div>
              <div>
                <p className="font-medium text-gray-900">{formData.name || 'Nom de la catégorie'}</p>
                {formData.description && (
                  <p className="text-sm text-gray-600">{formData.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg"
            >
              Créer la catégorie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
