import { useState } from 'react';
import { Plus, Mail, Phone, Award, Upload, Users } from 'lucide-react';
import { TEST_TEAM_MEMBERS, calculateMemberWorkload, getMembersByCategory, getCategories, TeamMemberData } from '../data/testTeamData';
import { TEST_TASKS } from '../data/testData';

export function TeamViewWithTestData() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAddMember = (data: any) => {
    console.log('Nouveau membre ajouté:', data);
    alert('✅ Membre ajouté avec succès !\n\n📋 Plan d\'onboarding généré automatiquement\n🎓 Tâches d\'intégration créées\n🔔 Notifications envoyées');
    setShowAddModal(false);
  };

  // Calculer la charge de travail pour chaque membre
  const totalTasks = TEST_TASKS.length;
  const membersWithWorkload = TEST_TEAM_MEMBERS.map(member => ({
    ...member,
    workload: calculateMemberWorkload(member.id, totalTasks)
  }));

  const categories = getCategories();
  const filteredMembers = selectedCategory 
    ? membersWithWorkload.filter(m => m.category === selectedCategory)
    : membersWithWorkload;

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'text-red-600 bg-red-100';
    if (workload >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability === 'Surchargé') return 'bg-red-100 text-red-700 border-red-300';
    if (availability === 'En congé') return 'bg-gray-100 text-gray-700 border-gray-300';
    return 'bg-green-100 text-green-700 border-green-300';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Équipe POPY</h1>
          <p className="text-gray-600 mt-1">
            Gérez votre équipe, suivez la charge de travail et les compétences
            <span className="ml-2 text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-medium">
              🧪 MODE TEST - Données de démonstration
            </span>
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Ajouter un membre
        </button>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{membersWithWorkload.length}</div>
          <div className="text-sm text-gray-600">Membres de l'équipe</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
          <div className="text-2xl font-bold text-green-900">
            {membersWithWorkload.filter(m => m.availability === 'Disponible').length}
          </div>
          <div className="text-sm text-green-700">Disponibles</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm">
          <div className="text-2xl font-bold text-red-900">
            {membersWithWorkload.filter(m => m.workload >= 80).length}
          </div>
          <div className="text-sm text-red-700">Surchargés (&gt;80%)</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 shadow-sm">
          <div className="text-2xl font-bold text-indigo-900">{categories.length}</div>
          <div className="text-sm text-indigo-700">Catégories</div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Tous ({membersWithWorkload.length})
        </button>
        {categories.map(category => {
          const count = membersWithWorkload.filter(m => m.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Membres de l'équipe par catégorie */}
      <div className="space-y-6">
        {categories.filter(cat => !selectedCategory || cat === selectedCategory).map(category => {
          const categoryMembers = membersWithWorkload.filter(m => m.category === category);
          
          return (
            <div key={category} className="space-y-4">
              {/* Titre de catégorie */}
              <div className="flex items-center gap-3">
                <div className="h-1 flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded"></div>
                <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                  {category}
                </h2>
                <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded"></div>
              </div>

              {/* Cartes des membres */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all p-5"
                  >
                    {/* Header avec photo et info */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Photo de profil */}
                      <div className="flex-shrink-0">
                        {member.photoUrl ? (
                          <img 
                            src={member.photoUrl} 
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-indigo-100"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl flex items-center justify-center font-bold shadow-lg ring-4 ring-indigo-100">
                            {member.initials}
                          </div>
                        )}
                      </div>

                      {/* Info de base */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 truncate">{member.name}</h3>
                        <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold border ${getAvailabilityColor(member.availability)}`}>
                          {member.availability}
                        </span>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-1 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-indigo-500" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      {member.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4 text-indigo-500" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Charge de travail */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-700 font-semibold">Charge de travail</span>
                        <span className={`font-bold px-2 py-1 rounded ${getWorkloadColor(member.workload)}`}>
                          {member.workload}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            member.workload >= 80 ? 'bg-red-500' :
                            member.workload >= 50 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${member.workload}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {member.assignedTasks.length} tâche{member.assignedTasks.length > 1 ? 's' : ''} assignée{member.assignedTasks.length > 1 ? 's' : ''} / {totalTasks} totales
                      </div>
                    </div>

                    {/* Responsabilités */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Rôle</h4>
                      <ul className="space-y-1">
                        {member.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span className="flex-1">{resp}</span>
                          </li>
                        ))}
                      </ul>
                      {member.responsibilities.length > 3 && (
                        <button className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 font-medium">
                          + {member.responsibilities.length - 3} de plus
                        </button>
                      )}
                    </div>

                    {/* Compétences */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Compétences</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium border border-indigo-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Trophées */}
                    {member.trophies.length > 0 && (
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <div className="flex flex-wrap gap-1">
                            {member.trophies.map((trophy, idx) => (
                              <span 
                                key={idx}
                                className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-200 font-medium"
                              >
                                {trophy}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal d'ajout de membre */}
      {showAddModal && (
        <AddMemberModalWithPhoto 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMember}
        />
      )}
    </div>
  );
}

// Modal pour ajouter un membre avec upload de photo
function AddMemberModalWithPhoto({ onClose, onAdd }: { onClose: () => void; onAdd: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    category: 'Direction & Coordination',
    photoUrl: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  const categories = getCategories();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un membre de l'équipe</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
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
                    <Upload className="w-8 h-8 text-gray-600" />
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

            {/* Nom */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: Alice Dupont"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="alice@popy-robot.com"
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

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Rôle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle / Fonction *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: Ingénieur IoT / Électronique"
              />
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
                Ajouter le membre
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
