import { useState } from 'react';
import {
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Users,
  DollarSign,
  Zap,
  FileText,
  BarChart3,
  Link as LinkIcon,
  Calendar,
  Bell,
  ArrowRight,
  Edit,
  Trash2,
} from 'lucide-react';

type VeilleType =
  | 'regulatory'
  | 'market'
  | 'technology'
  | 'economic'
  | 'hr'
  | 'risks'
  | 'internal';

type VeilleFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'continuous';

type VeilleStatus = 'new' | 'analyzing' | 'action-required' | 'monitoring' | 'closed';

type VeilleDecision = 'pending' | 'accepted' | 'rejected' | 'action-planned';

interface VeilleEntry {
  id: string;
  type: VeilleType;
  source: string;
  date: string;
  subject: string;
  description: string;
  impactAnalysis: string;
  decision: VeilleDecision;
  decisionNotes?: string;
  status: VeilleStatus;
  responsible: string;
  linkedRisks?: string[];
  linkedTasks?: string[];
  linkedDocs?: string[];
  nextReviewDate?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export function VeilleView() {
  const [activeFilter, setActiveFilter] = useState<VeilleType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  const veilleTypes = [
    {
      id: 'regulatory' as VeilleType,
      label: 'Réglementaire & Normative',
      icon: Shield,
      color: 'red',
      frequency: 'quarterly' as VeilleFrequency,
      description: 'ISO 9001, RGPD, normes CE, sécurité',
      isoRef: '§4.1, §4.2',
    },
    {
      id: 'market' as VeilleType,
      label: 'Marché & Client',
      icon: TrendingUp,
      color: 'blue',
      frequency: 'continuous' as VeilleFrequency,
      description: 'Besoins clients, retours terrain, usages',
      isoRef: '§5.1.2',
    },
    {
      id: 'technology' as VeilleType,
      label: 'Technologique',
      icon: Zap,
      color: 'purple',
      frequency: 'monthly' as VeilleFrequency,
      description: 'Hardware, IA, obsolescence composants',
      isoRef: '§7.1.5',
    },
    {
      id: 'economic' as VeilleType,
      label: 'Économique & Fournisseurs',
      icon: DollarSign,
      color: 'green',
      frequency: 'monthly' as VeilleFrequency,
      description: 'Prix, dépendances, approvisionnement',
      isoRef: '§7.1.3',
    },
    {
      id: 'hr' as VeilleType,
      label: 'RH & Compétences',
      icon: Users,
      color: 'orange',
      frequency: 'quarterly' as VeilleFrequency,
      description: 'Compétences émergentes, talents',
      isoRef: '§7.2',
    },
    {
      id: 'risks' as VeilleType,
      label: 'Risques & Opportunités',
      icon: AlertCircle,
      color: 'yellow',
      frequency: 'continuous' as VeilleFrequency,
      description: 'Nouveaux risques, signaux faibles',
      isoRef: '§6.1',
    },
    {
      id: 'internal' as VeilleType,
      label: 'Interne (Performance)',
      icon: BarChart3,
      color: 'indigo',
      frequency: 'monthly' as VeilleFrequency,
      description: 'KPIs, non-conformités, écarts',
      isoRef: '§9',
    },
  ];

  const [veilleEntries, setVeilleEntries] = useState<VeilleEntry[]>([
    {
      id: 'v1',
      type: 'regulatory',
      source: 'Journal Officiel UE',
      date: '2026-01-15',
      subject: 'Nouvelle directive sur les batteries lithium-ion',
      description: 'Nouvelles exigences de sécurité pour les batteries Li-ion dans les produits éducatifs',
      impactAnalysis: 'Impact CRITIQUE sur POPY : nécessité de revoir le système de gestion de batterie et d\'ajouter des protections supplémentaires',
      decision: 'action-planned',
      decisionNotes: 'Créer tâche de mise en conformité + mise à jour documentation technique',
      status: 'action-required',
      responsible: 'Jean Dupont',
      linkedRisks: ['risk-3'],
      linkedTasks: ['task-42'],
      linkedDocs: ['doc-tech-5'],
      nextReviewDate: '2026-02-15',
      priority: 'critical',
    },
    {
      id: 'v2',
      type: 'market',
      source: 'Retour atelier utilisateurs',
      date: '2026-01-12',
      subject: 'Demande récurrente : contrôle parental',
      description: '8/10 parents lors des tests souhaitent un système de contrôle parental pour limiter le temps d\'usage',
      impactAnalysis: 'Opportunité d\'amélioration produit. Aligné avec tendance marché. Peut devenir USP.',
      decision: 'accepted',
      decisionNotes: 'Ajout au backlog produit pour version V2',
      status: 'monitoring',
      responsible: 'Marie Martin',
      linkedTasks: ['task-78'],
      nextReviewDate: '2026-03-01',
      priority: 'medium',
    },
    {
      id: 'v3',
      type: 'technology',
      source: 'Veille tech - IEEE',
      date: '2026-01-10',
      subject: 'Nouveaux NPU ARM Cortex-M85 avec accélération ML',
      description: 'Nouvelle génération de microcontrôleurs ARM avec NPU intégré, 3x plus performant pour l\'inférence IA',
      impactAnalysis: 'Opportunité d\'amélioration des performances IA de POPY sans augmenter les coûts',
      decision: 'pending',
      status: 'analyzing',
      responsible: 'Sophie Bernard',
      nextReviewDate: '2026-01-25',
      priority: 'medium',
    },
    {
      id: 'v4',
      type: 'economic',
      source: 'Fournisseur Kubii',
      date: '2026-01-08',
      subject: 'Augmentation prix Raspberry Pi 5 (+15%)',
      description: 'Notification fournisseur : prix Raspberry Pi 5 passe de 85€ à 98€ à partir de mars 2026',
      impactAnalysis: 'Impact budget : +13€ par unité = +130€ pour 10 prototypes',
      decision: 'action-planned',
      decisionNotes: 'Explorer alternatives ou négocier volume. Mise à jour BOM.',
      status: 'action-required',
      responsible: 'Pierre Dubois',
      linkedTasks: ['task-budget-1'],
      linkedDocs: ['bom-1'],
      nextReviewDate: '2026-02-01',
      priority: 'high',
    },
    {
      id: 'v5',
      type: 'hr',
      source: 'Analyse compétences',
      date: '2026-01-05',
      subject: 'Besoin compétence cybersécurité IoT',
      description: 'Aucun membre de l\'équipe n\'a de compétence avancée en sécurité IoT',
      impactAnalysis: 'Risque de vulnérabilité produit. Formation nécessaire ou recrutement.',
      decision: 'accepted',
      decisionNotes: 'Planifier formation cybersécurité pour 2 membres de l\'équipe',
      status: 'action-required',
      responsible: 'Jean Dupont',
      linkedRisks: ['risk-5'],
      linkedTasks: ['task-formation-1'],
      nextReviewDate: '2026-02-28',
      priority: 'high',
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    type: 'regulatory' as VeilleType,
    source: '',
    subject: '',
    description: '',
    impactAnalysis: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
  });

  const getTypeColor = (type: VeilleType) => {
    const typeConfig = veilleTypes.find((t) => t.id === type);
    return typeConfig?.color || 'gray';
  };

  const getTypeLabel = (type: VeilleType) => {
    const typeConfig = veilleTypes.find((t) => t.id === type);
    return typeConfig?.label || type;
  };

  const getStatusColor = (status: VeilleStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'analyzing':
        return 'bg-yellow-100 text-yellow-700';
      case 'action-required':
        return 'bg-red-100 text-red-700';
      case 'monitoring':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: VeilleStatus) => {
    switch (status) {
      case 'new':
        return 'Nouveau';
      case 'analyzing':
        return 'En analyse';
      case 'action-required':
        return 'Action requise';
      case 'monitoring':
        return 'Suivi';
      case 'closed':
        return 'Clôturé';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getFrequencyLabel = (freq: VeilleFrequency) => {
    switch (freq) {
      case 'daily':
        return 'Quotidienne';
      case 'weekly':
        return 'Hebdomadaire';
      case 'monthly':
        return 'Mensuelle';
      case 'quarterly':
        return 'Trimestrielle';
      case 'continuous':
        return 'Continue';
      default:
        return freq;
    }
  };

  const filteredEntries = veilleEntries.filter((entry) => {
    const matchesFilter = activeFilter === 'all' || entry.type === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      entry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatsForType = (type: VeilleType) => {
    return veilleEntries.filter((e) => e.type === type).length;
  };

  const handleAddEntry = () => {
    const entry: VeilleEntry = {
      id: `v${Date.now()}`,
      type: newEntry.type,
      source: newEntry.source,
      date: new Date().toISOString().split('T')[0],
      subject: newEntry.subject,
      description: newEntry.description,
      impactAnalysis: newEntry.impactAnalysis,
      decision: 'pending',
      status: 'new',
      responsible: 'Jean Dupont',
      priority: newEntry.priority,
    };

    setVeilleEntries([entry, ...veilleEntries]);
    setShowNewEntryModal(false);
    setNewEntry({
      type: 'regulatory',
      source: '',
      subject: '',
      description: '',
      impactAnalysis: '',
      priority: 'medium',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Veille ISO 9001</h1>
          <p className="text-gray-600 mt-1">
            Surveillance réglementaire, marché, technologique et interne • Exigence ISO §4.1, §4.2
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => alert('Export registre de veille pour audit ISO')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export audit
          </button>
          <button
            onClick={() => setShowNewEntryModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouvelle veille
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium mb-2">Actions requises</div>
          <div className="text-3xl font-bold">
            {veilleEntries.filter((e) => e.status === 'action-required').length}
          </div>
          <div className="text-sm mt-2 opacity-90">À traiter</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium mb-2">En analyse</div>
          <div className="text-3xl font-bold">
            {veilleEntries.filter((e) => e.status === 'analyzing').length}
          </div>
          <div className="text-sm mt-2 opacity-90">En cours</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium mb-2">En suivi</div>
          <div className="text-3xl font-bold">
            {veilleEntries.filter((e) => e.status === 'monitoring').length}
          </div>
          <div className="text-sm mt-2 opacity-90">Monitoring</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium mb-2">Total veilles</div>
          <div className="text-3xl font-bold">{veilleEntries.length}</div>
          <div className="text-sm mt-2 opacity-90">Registre complet</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium mb-2">Critiques</div>
          <div className="text-3xl font-bold">
            {veilleEntries.filter((e) => e.priority === 'critical').length}
          </div>
          <div className="text-sm mt-2 opacity-90">Priorité haute</div>
        </div>
      </div>

      {/* Types de veille avec fréquence */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          7 types de veille ISO 9001
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {veilleTypes.map((type) => {
            const Icon = type.icon;
            const count = getStatsForType(type.id);
            return (
              <button
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                  activeFilter === type.id
                    ? `border-${type.color}-500 bg-${type.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${type.color}-100 flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 text-${type.color}-600`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{count}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{type.label}</h3>
                <p className="text-xs text-gray-600 mb-2">{type.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {getFrequencyLabel(type.frequency)}
                  </span>
                  <span className="text-indigo-600 font-medium">{type.isoRef}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une veille..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tout voir ({veilleEntries.length})
        </button>
      </div>

      {/* Liste des veilles */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune veille trouvée</h3>
            <p className="text-gray-600">
              Commencez par créer une nouvelle entrée de veille
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const TypeIcon = veilleTypes.find((t) => t.id === entry.type)?.icon || Eye;
            return (
              <div
                key={entry.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-lg bg-${getTypeColor(
                        entry.type
                      )}-100 flex items-center justify-center flex-shrink-0`}
                    >
                      <TypeIcon
                        className={`w-6 h-6 text-${getTypeColor(entry.type)}-600`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{entry.subject}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            entry.status
                          )}`}
                        >
                          {getStatusLabel(entry.status)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            entry.priority
                          )} bg-gray-100`}
                        >
                          {entry.priority === 'critical'
                            ? '🔴 Critique'
                            : entry.priority === 'high'
                            ? '🟠 Haute'
                            : entry.priority === 'medium'
                            ? '🟡 Moyenne'
                            : '🟢 Basse'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">{getTypeLabel(entry.type)}</span> •{' '}
                        {entry.source} • {new Date(entry.date).toLocaleDateString('fr-FR')}
                      </div>
                      <p className="text-gray-700 mb-3">{entry.description}</p>

                      {/* Impact Analysis */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-yellow-900 mb-1">
                              Analyse d'impact
                            </div>
                            <p className="text-sm text-yellow-800">{entry.impactAnalysis}</p>
                          </div>
                        </div>
                      </div>

                      {/* Decision */}
                      {entry.decision !== 'pending' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-green-900 mb-1">
                                Décision :{' '}
                                {entry.decision === 'accepted'
                                  ? 'Acceptée'
                                  : entry.decision === 'rejected'
                                  ? 'Rejetée'
                                  : 'Action planifiée'}
                              </div>
                              {entry.decisionNotes && (
                                <p className="text-sm text-green-800">{entry.decisionNotes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Liens automatiques */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {entry.linkedRisks && entry.linkedRisks.length > 0 && (
                          <div className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            <LinkIcon className="w-3 h-3" />
                            {entry.linkedRisks.length} risque(s)
                          </div>
                        )}
                        {entry.linkedTasks && entry.linkedTasks.length > 0 && (
                          <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            <LinkIcon className="w-3 h-3" />
                            {entry.linkedTasks.length} tâche(s)
                          </div>
                        )}
                        {entry.linkedDocs && entry.linkedDocs.length > 0 && (
                          <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            <LinkIcon className="w-3 h-3" />
                            {entry.linkedDocs.length} document(s)
                          </div>
                        )}
                        {entry.nextReviewDate && (
                          <div className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            <Calendar className="w-3 h-3" />
                            Prochain suivi : {new Date(entry.nextReviewDate).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-gray-600">
                        Responsable : <span className="font-medium">{entry.responsible}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Actions automatiques suggérées */}
                {entry.status === 'action-required' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-900">
                          Actions automatiques suggérées
                        </span>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded text-sm hover:bg-indigo-50 transition-colors">
                          <span className="text-gray-700">→ Créer une tâche de mise en conformité</span>
                          <ArrowRight className="w-4 h-4 text-indigo-600" />
                        </button>
                        <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded text-sm hover:bg-indigo-50 transition-colors">
                          <span className="text-gray-700">→ Lier à un risque existant ou nouveau</span>
                          <ArrowRight className="w-4 h-4 text-indigo-600" />
                        </button>
                        <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded text-sm hover:bg-indigo-50 transition-colors">
                          <span className="text-gray-700">→ Mettre à jour la documentation</span>
                          <ArrowRight className="w-4 h-4 text-indigo-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal Nouvelle veille */}
      {showNewEntryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">Nouvelle entrée de veille</h2>
              <button
                onClick={() => setShowNewEntryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de veille
                </label>
                <select
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value as VeilleType })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {veilleTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <input
                  type="text"
                  value={newEntry.source}
                  onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value })}
                  placeholder="Ex: Journal Officiel UE, Retour client, Veille tech..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                <input
                  type="text"
                  value={newEntry.subject}
                  onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
                  placeholder="Titre court de la veille"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                  rows={3}
                  placeholder="Description détaillée de l'élément de veille"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analyse d'impact sur POPY
                </label>
                <textarea
                  value={newEntry.impactAnalysis}
                  onChange={(e) => setNewEntry({ ...newEntry, impactAnalysis: e.target.value })}
                  rows={3}
                  placeholder="Quel est l'impact sur le projet POPY ? Risques ? Opportunités ?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                <select
                  value={newEntry.priority}
                  onChange={(e) =>
                    setNewEntry({
                      ...newEntry,
                      priority: e.target.value as 'low' | 'medium' | 'high' | 'critical',
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="low">🟢 Basse</option>
                  <option value="medium">🟡 Moyenne</option>
                  <option value="high">🟠 Haute</option>
                  <option value="critical">🔴 Critique</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowNewEntryModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddEntry}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Créer l'entrée
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
