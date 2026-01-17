import { useState } from 'react';
import { X, Upload, User } from 'lucide-react';
import { TeamMember } from '../types/positions';

interface CreateMemberModalProps {
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id' | 'initials' | 'name' | 'assignedPositions' | 'workload' | 'createdAt' | 'updatedAt'>) => void;
  editingMember?: TeamMember | null;
}

export function CreateMemberModal({ onClose, onSubmit, editingMember }: CreateMemberModalProps) {
  const [formData, setFormData] = useState({
    firstName: editingMember?.firstName || '',
    lastName: editingMember?.lastName || '',
    email: editingMember?.email || '',
    phone: editingMember?.phone || '',
    company: editingMember?.company || '',
    photoUrl: editingMember?.photoUrl,
    availability: (editingMember?.availability || 'Disponible') as 'Disponible' | 'Occupé' | 'Surchargé' | 'En congé',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(editingMember?.photoUrl || null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData({ ...formData, photoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Générer les initiales
  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName.charAt(0).toUpperCase();
    const second = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + second || first;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const initials = getInitials(formData.firstName, formData.lastName);
    
    onSubmit({
      ...formData,
      name,
      initials,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingMember ? 'Modifier le membre' : 'Créer un membre de l\'équipe'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Upload de photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Photo de profil</label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Prévisualisation"
                  className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-indigo-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
              )}
              <div className="flex-1">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium">
                  <Upload className="w-4 h-4" />
                  Choisir une photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF (max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: Jean"
            />
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: Dupont"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="jean.dupont@company.com"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          {/* Entreprise */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Entreprise</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: POPY Robot"
            />
          </div>

          {/* Disponibilité */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Disponibilité</label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Disponible">Disponible</option>
              <option value="Occupé">Occupé</option>
              <option value="Surchargé">Surchargé</option>
              <option value="En congé">En congé</option>
            </select>
          </div>

          {/* Aperçu des initiales */}
          {formData.firstName && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">
                  {getInitials(formData.firstName, formData.lastName)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{formData.email}</p>
                </div>
              </div>
            </div>
          )}

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
              {editingMember ? 'Modifier le membre' : 'Créer le membre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
