import { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  Shield,
  Plus,
  Filter,
  Search,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Link,
  Activity,
  AlertCircle,
  Lightbulb,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  Risk,
  RiskCategory,
  AutoRiskSuggestion,
  calculateCriticality,
  getRiskCategoryLabel,
  getRiskStrategyLabel,
  getCriticalityColor,
  getCriticalityIcon,
  generateAutoRiskSuggestions,
} from '../types/risks';

export function RisksView() {
  const [activeTab, setActiveTab] = useState<'registry' | 'matrix' | 'suggestions' | 'indicators'>('registry');
  const [filterCategory, setFilterCategory] = useState<RiskCategory | 'all'>('all');
  const [filterType, setFilterType] = useState<'all' | 'risk' | 'opportunity'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Données de démonstration
  const risks: Risk[] = [
    {
      id: 'risk-1',
      title: 'Retard approvisionnement capteurs ToF',
      description: 'Le fournisseur principal de capteurs ToF (VL53L1X) a annoncé des délais de 8 semaines au lieu de 4.',
      category: 'supply-chain',
      type: 'risk',
      status: 'in-treatment',
      probability: 4,
      impacts: { cost: 3, delay: 5, quality: 2, security: 1, image: 2 },
      criticality: 'critical',
      criticalityScore: 20,
      strategy: 'reduce',
      actions: [
        {
          id: 'action-1',
          title: 'Identifier fournisseur alternatif',
          type: 'preventive',
          responsible: 'user-2',
          responsibleName: 'Alice Chevalier',
          dueDate: '2026-01-25',
          status: 'in-progress',
          createdAt: '2026-01-10',
        },
        {
          id: 'action-2',
          title: 'Négocier livraison express',
          type: 'corrective',
          responsible: 'user-1',
          responsibleName: 'Jean Dupont',
          dueDate: '2026-01-20',
          status: 'done',
          createdAt: '2026-01-10',
          completedAt: '2026-01-18',
        },
      ],
      origin: 'field-feedback',
      detectedBy: 'user-2',
      detectedByName: 'Alice Chevalier',
      detectedAt: '2026-01-08',
      owner: 'user-2',
      ownerName: 'Alice Chevalier',
      visibility: 'steering',
      history: [
        {
          date: '2026-01-08',
          author: 'user-2',
          authorName: 'Alice Chevalier',
          action: 'created',
          description: 'Risque identifié suite à l\'email du fournisseur',
        },
        {
          date: '2026-01-10',
          author: 'user-1',
          authorName: 'Jean Dupont',
          action: 'strategy-changed',
          description: 'Stratégie définie en comité de pilotage',
          oldValue: null,
          newValue: 'reduce',
        },
      ],
      linkedTo: {
        taskIds: ['task-3', 'task-4'],
        stageId: 'stage-2',
        meetingIds: ['meeting-2'],
      },
      createdAt: '2026-01-08',
      updatedAt: '2026-01-18',
      tags: ['hardware', 'approvisionnement', 'critique'],
    },
    {
      id: 'risk-2',
      title: 'Compétence IA embarquée manquante',
      description: 'L\'équipe n\'a pas d\'expert en optimisation IA pour systèmes embarqués contraints (Raspberry Pi).',
      category: 'hr',
      type: 'risk',
      status: 'open',
      probability: 3,
      impacts: { cost: 3, delay: 4, quality: 5, security: 1, image: 2 },
      criticality: 'high',
      criticalityScore: 15,
      strategy: 'reduce',
      actions: [
        {
          id: 'action-3',
          title: 'Recruter expert IA embarquée',
          type: 'preventive',
          responsible: 'user-7',
          responsibleName: 'Aline Moreau',
          dueDate: '2026-02-15',
          status: 'pending',
          createdAt: '2026-01-12',
        },
        {
          id: 'action-4',
          title: 'Formation équipe sur TensorFlow Lite',
          type: 'preventive',
          responsible: 'user-3',
          responsibleName: 'Thomas Serrano',
          dueDate: '2026-01-30',
          status: 'in-progress',
          linkedTaskId: 'task-training-1',
          createdAt: '2026-01-12',
        },
      ],
      origin: 'review',
      detectedBy: 'user-3',
      detectedByName: 'Thomas Serrano',
      detectedAt: '2026-01-12',
      owner: 'user-7',
      ownerName: 'Aline Moreau',
      visibility: 'management',
      history: [
        {
          date: '2026-01-12',
          author: 'user-3',
          authorName: 'Thomas Serrano',
          action: 'created',
          description: 'Risque identifié lors de la revue technique',
        },
      ],
      linkedTo: {
        taskIds: ['task-training-1'],
        competenceIds: ['comp-ia-embedded'],
      },
      createdAt: '2026-01-12',
      updatedAt: '2026-01-12',
      tags: ['RH', 'compétences', 'formation'],
    },
    {
      id: 'risk-3',
      title: 'Non-conformité EN71 - Matériaux',
      description: 'Risque que certains matériaux du boîtier ne passent pas les tests EN71 (sécurité jouets enfants).',
      category: 'security',
      type: 'risk',
      status: 'open',
      probability: 2,
      impacts: { cost: 4, delay: 5, quality: 5, security: 5, image: 5 },
      criticality: 'high',
      criticalityScore: 10,
      strategy: 'avoid',
      actions: [
        {
          id: 'action-5',
          title: 'Pré-qualification matériaux certifiés EN71',
          type: 'preventive',
          responsible: 'user-2',
          responsibleName: 'Alice Chevalier',
          dueDate: '2026-01-28',
          status: 'in-progress',
          createdAt: '2026-01-14',
        },
        {
          id: 'action-6',
          title: 'Audit fournisseur matériaux',
          type: 'preventive',
          responsible: 'user-7',
          responsibleName: 'Aline Moreau',
          dueDate: '2026-02-05',
          status: 'pending',
          createdAt: '2026-01-14',
        },
      ],
      origin: 'study',
      detectedBy: 'user-2',
      detectedByName: 'Alice Chevalier',
      detectedAt: '2026-01-14',
      owner: 'user-2',
      ownerName: 'Alice Chevalier',
      visibility: 'management',
      history: [
        {
          date: '2026-01-14',
          author: 'user-2',
          authorName: 'Alice Chevalier',
          action: 'created',
          description: 'Risque identifié dans l\'étude de faisabilité réglementaire',
        },
      ],
      linkedTo: {
        documentIds: ['doc-4'],
        stageId: 'stage-2',
      },
      createdAt: '2026-01-14',
      updatedAt: '2026-01-14',
      tags: ['sécurité', 'conformité', 'EN71'],
    },
    {
      id: 'risk-4',
      title: 'Dépassement budget hardware',
      description: 'Le coût des composants hardware (Raspberry Pi, capteurs, batterie) pourrait dépasser le budget prévu.',
      category: 'financial',
      type: 'risk',
      status: 'accepted',
      probability: 3,
      impacts: { cost: 4, delay: 2, quality: 1, security: 1, image: 2 },
      criticality: 'medium',
      criticalityScore: 12,
      strategy: 'accept',
      actions: [
        {
          id: 'action-7',
          title: 'Monitoring mensuel budget hardware',
          type: 'monitoring',
          responsible: 'user-1',
          responsibleName: 'Jean Dupont',
          dueDate: '2026-12-31',
          status: 'in-progress',
          createdAt: '2026-01-05',
        },
      ],
      origin: 'study',
      detectedBy: 'user-1',
      detectedByName: 'Jean Dupont',
      detectedAt: '2026-01-05',
      owner: 'user-1',
      ownerName: 'Jean Dupont',
      visibility: 'steering',
      history: [
        {
          date: '2026-01-05',
          author: 'user-1',
          authorName: 'Jean Dupont',
          action: 'created',
          description: 'Risque identifié dans l\'étude financière prévisionnelle',
        },
        {
          date: '2026-01-06',
          author: 'user-1',
          authorName: 'Jean Dupont',
          action: 'strategy-changed',
          description: 'Décision d\'accepter le risque avec monitoring',
          oldValue: null,
          newValue: 'accept',
        },
      ],
      linkedTo: {
        documentIds: ['doc-10', 'doc-11'],
      },
      createdAt: '2026-01-05',
      updatedAt: '2026-01-06',
      tags: ['budget', 'hardware'],
    },
    {
      id: 'opp-1',
      title: 'Partenariat distribution Amazon',
      description: 'Opportunité de signer un partenariat avec Amazon pour la distribution européenne de POPY.',
      category: 'communication',
      type: 'opportunity',
      status: 'in-treatment',
      probability: 3,
      impacts: { cost: 2, delay: 1, quality: 1, security: 1, image: 5 },
      criticality: 'high',
      criticalityScore: 15,
      strategy: 'reduce',
      actions: [
        {
          id: 'action-8',
          title: 'Préparer dossier partenariat',
          type: 'preventive',
          responsible: 'user-1',
          responsibleName: 'Jean Dupont',
          dueDate: '2026-02-10',
          status: 'in-progress',
          linkedTaskId: 'task-amazon-partnership',
          createdAt: '2026-01-15',
        },
      ],
      origin: 'meeting',
      detectedBy: 'user-1',
      detectedByName: 'Jean Dupont',
      detectedAt: '2026-01-15',
      owner: 'user-1',
      ownerName: 'Jean Dupont',
      visibility: 'management',
      history: [
        {
          date: '2026-01-15',
          author: 'user-1',
          authorName: 'Jean Dupont',
          action: 'created',
          description: 'Opportunité identifiée lors du comité stratégique',
        },
      ],
      linkedTo: {
        meetingIds: ['meeting-3'],
      },
      createdAt: '2026-01-15',
      updatedAt: '2026-01-15',
      tags: ['partenariat', 'distribution', 'opportunité'],
    },
    {
      id: 'risk-5',
      title: 'Dépendance fournisseur unique IA',
      description: 'Le projet repose sur un unique fournisseur pour les services cloud IA (reconnaissance émotions).',
      category: 'technical',
      type: 'risk',
      status: 'open',
      probability: 2,
      impacts: { cost: 3, delay: 4, quality: 3, security: 2, image: 2 },
      criticality: 'medium',
      criticalityScore: 8,
      strategy: 'transfer',
      actions: [
        {
          id: 'action-9',
          title: 'Étudier architecture multi-cloud',
          type: 'preventive',
          responsible: 'user-3',
          responsibleName: 'Thomas Serrano',
          dueDate: '2026-02-20',
          status: 'pending',
          createdAt: '2026-01-16',
        },
      ],
      origin: 'auto-detection',
      detectedBy: 'system',
      detectedByName: 'POPILOT Auto-detection',
      detectedAt: '2026-01-16',
      owner: 'user-3',
      ownerName: 'Thomas Serrano',
      visibility: 'team',
      history: [
        {
          date: '2026-01-16',
          author: 'system',
          authorName: 'POPILOT',
          action: 'created',
          description: 'Risque détecté automatiquement par analyse des dépendances',
        },
      ],
      autoDetected: true,
      autoDetectionSource: 'Analyse des fournisseurs et dépendances techniques',
      createdAt: '2026-01-16',
      updatedAt: '2026-01-16',
      tags: ['cloud', 'dépendance', 'auto-détecté'],
    },
  ];

  // Suggestions automatiques
  const autoSuggestions: AutoRiskSuggestion[] = generateAutoRiskSuggestions({
    lateTasks: [{ id: 'task-late-1', title: 'Tests capteurs ToF' }],
    budgetStatus: { overrun: 12 },
    missingDocs: ['Étude de faisabilité réglementaire', 'Rapport tests EN71'],
    missingCompetences: ['IA embarquée', 'Design UX enfants'],
  });

  // Statistiques
  const stats = {
    total: risks.length,
    risks: risks.filter((r) => r.type === 'risk').length,
    opportunities: risks.filter((r) => r.type === 'opportunity').length,
    open: risks.filter((r) => r.status === 'open').length,
    inTreatment: risks.filter((r) => r.status === 'in-treatment').length,
    closed: risks.filter((r) => r.status === 'closed').length,
    critical: risks.filter((r) => r.criticality === 'critical').length,
    high: risks.filter((r) => r.criticality === 'high').length,
    medium: risks.filter((r) => r.criticality === 'medium').length,
    low: risks.filter((r) => r.criticality === 'low').length,
  };

  // Filtres
  const filteredRisks = risks
    .filter((r) => filterCategory === 'all' || r.category === filterCategory)
    .filter((r) => filterType === 'all' || r.type === filterType)
    .filter((r) => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'open') return r.status === 'open' || r.status === 'in-treatment';
      return r.status === 'closed';
    })
    .filter(
      (r) =>
        searchQuery === '' ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-600" />
            Gestion des Risques & Opportunités
          </h1>
          <p className="text-gray-600 mt-1">
            ISO 9001 §6.1 - Registre central, analyse, traitement et traçabilité
          </p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5" />
          Nouveau risque
        </button>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <Shield className="w-10 h-10 text-blue-600 bg-blue-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Risques</p>
              <p className="text-2xl font-bold text-red-600">{stats.risks}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600 bg-red-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Opportunités</p>
              <p className="text-2xl font-bold text-green-600">{stats.opportunities}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600 bg-green-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ouverts</p>
              <p className="text-2xl font-bold text-orange-600">{stats.open}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-600 bg-orange-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En traitement</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.inTreatment}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600 bg-yellow-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critiques</p>
              <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600 bg-red-100 p-2 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Répartition par criticité */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
        <h3 className="font-semibold text-red-900 text-lg mb-4">
          🎯 Répartition par criticité
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-red-200 text-center">
            <div className="text-3xl mb-2">🔴</div>
            <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
            <div className="text-sm text-gray-600">Critique</div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-orange-200 text-center">
            <div className="text-3xl mb-2">🟠</div>
            <div className="text-2xl font-bold text-orange-600">{stats.high}</div>
            <div className="text-sm text-gray-600">Élevé</div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-yellow-200 text-center">
            <div className="text-3xl mb-2">🟡</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
            <div className="text-sm text-gray-600">Modéré</div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-green-200 text-center">
            <div className="text-3xl mb-2">🟢</div>
            <div className="text-2xl font-bold text-green-600">{stats.low}</div>
            <div className="text-sm text-gray-600">Faible</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('registry')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'registry'
                  ? 'border-b-2 border-red-600 text-red-600 bg-red-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Shield className="w-5 h-5 inline mr-2" />
              Registre central
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'matrix'
                  ? 'border-b-2 border-red-600 text-red-600 bg-red-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Target className="w-5 h-5 inline mr-2" />
              Matrice risques
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'suggestions'
                  ? 'border-b-2 border-red-600 text-red-600 bg-red-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Lightbulb className="w-5 h-5 inline mr-2" />
              Suggestions auto ({autoSuggestions.length})
            </button>
            <button
              onClick={() => setActiveTab('indicators')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'indicators'
                  ? 'border-b-2 border-red-600 text-red-600 bg-red-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Activity className="w-5 h-5 inline mr-2" />
              Indicateurs
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tab: Registre central */}
          {activeTab === 'registry' && (
            <div className="space-y-6">
              {/* Filtres */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un risque..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">Tous types</option>
                  <option value="risk">Risques</option>
                  <option value="opportunity">Opportunités</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">Toutes catégories</option>
                  <option value="technical">🔧 Technique</option>
                  <option value="quality">✅ Qualité</option>
                  <option value="planning">📅 Planning</option>
                  <option value="financial">💰 Financier</option>
                  <option value="hr">👥 RH</option>
                  <option value="security">🔒 Sécurité</option>
                  <option value="legal">⚖️ Juridique</option>
                  <option value="supply-chain">📦 Supply Chain</option>
                  <option value="communication">📣 Communication</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">Tous statuts</option>
                  <option value="open">Ouverts</option>
                  <option value="closed">Fermés</option>
                </select>
              </div>

              {/* Liste des risques */}
              <div className="space-y-4">
                {filteredRisks.map((risk) => (
                  <div
                    key={risk.id}
                    className={`border-2 rounded-xl p-6 hover:shadow-md transition-shadow ${
                      risk.type === 'opportunity'
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {risk.type === 'risk' ? (
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                          ) : (
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          )}
                          <h4 className="text-lg font-bold text-gray-900">{risk.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCriticalityColor(risk.criticality)} border`}>
                            {getCriticalityIcon(risk.criticality)} {risk.criticality.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {getRiskCategoryLabel(risk.category)}
                          </span>
                          {risk.autoDetected && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                              🤖 Auto-détecté
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{risk.description}</p>
                        
                        {/* Métriques */}
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">Probabilité</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-red-600 h-full"
                                  style={{ width: `${(risk.probability / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold">{risk.probability}/5</span>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">Impact max</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-orange-600 h-full"
                                  style={{
                                    width: `${(Math.max(...Object.values(risk.impacts)) / 5) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-bold">
                                {Math.max(...Object.values(risk.impacts))}/5
                              </span>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">Stratégie</div>
                            <div className="text-sm font-bold text-blue-700">
                              {getRiskStrategyLabel(risk.strategy)}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                          <div className="text-xs font-semibold text-gray-700 mb-2">
                            Actions ({risk.actions.length})
                          </div>
                          <div className="space-y-1">
                            {risk.actions.map((action) => (
                              <div key={action.id} className="flex items-center gap-2 text-sm">
                                {action.status === 'done' ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : action.status === 'in-progress' ? (
                                  <Clock className="w-4 h-4 text-yellow-600" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-gray-400" />
                                )}
                                <span className="flex-1">{action.title}</span>
                                <span className="text-xs text-gray-500">
                                  {action.responsibleName} - {new Date(action.dueDate).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Métadonnées */}
                        <div className="flex items-center gap-6 text-xs text-gray-600">
                          <span>
                            Propriétaire : <strong>{risk.ownerName}</strong>
                          </span>
                          <span>
                            Détecté le : <strong>{new Date(risk.detectedAt).toLocaleDateString('fr-FR')}</strong>
                          </span>
                          <span>
                            Statut : <strong className="text-blue-700">{risk.status}</strong>
                          </span>
                        </div>

                        {/* Liens */}
                        {risk.linkedTo && (
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            <Link className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 font-medium">Lié à :</span>
                            {risk.linkedTo.stageId && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                Étape pipeline
                              </span>
                            )}
                            {risk.linkedTo.taskIds && risk.linkedTo.taskIds.length > 0 && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {risk.linkedTo.taskIds.length} tâche(s)
                              </span>
                            )}
                            {risk.linkedTo.documentIds && risk.linkedTo.documentIds.length > 0 && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                                {risk.linkedTo.documentIds.length} document(s)
                              </span>
                            )}
                            {risk.linkedTo.meetingIds && risk.linkedTo.meetingIds.length > 0 && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                                {risk.linkedTo.meetingIds.length} réunion(s)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors ml-4">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Matrice risques */}
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 border-2 border-red-200 rounded-xl p-6">
                <h3 className="font-semibold text-red-900 text-lg mb-2">
                  🎯 Matrice Probabilité / Impact
                </h3>
                <p className="text-sm text-red-800">
                  Visualisation des risques selon leur probabilité et leur impact maximal.
                </p>
              </div>

              {/* Matrice 5x5 */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="grid grid-cols-6 gap-2">
                  {/* Header */}
                  <div className="col-span-1"></div>
                  <div className="text-center text-xs font-semibold text-gray-700">Impact 1</div>
                  <div className="text-center text-xs font-semibold text-gray-700">Impact 2</div>
                  <div className="text-center text-xs font-semibold text-gray-700">Impact 3</div>
                  <div className="text-center text-xs font-semibold text-gray-700">Impact 4</div>
                  <div className="text-center text-xs font-semibold text-gray-700">Impact 5</div>

                  {/* Lignes */}
                  {[5, 4, 3, 2, 1].map((prob) => (
                    <>
                      <div key={`prob-${prob}`} className="text-xs font-semibold text-gray-700 flex items-center">
                        Prob {prob}
                      </div>
                      {[1, 2, 3, 4, 5].map((impact) => {
                        const score = prob * impact;
                        let bgColor = 'bg-green-100';
                        if (score > 15) bgColor = 'bg-red-200';
                        else if (score > 10) bgColor = 'bg-orange-200';
                        else if (score > 5) bgColor = 'bg-yellow-200';

                        const risksInCell = risks.filter((r) => {
                          const maxImpact = Math.max(...Object.values(r.impacts));
                          return r.probability === prob && maxImpact === impact && r.type === 'risk';
                        });

                        return (
                          <div
                            key={`${prob}-${impact}`}
                            className={`${bgColor} border border-gray-300 rounded p-2 min-h-[80px] hover:shadow-md transition-shadow`}
                          >
                            <div className="text-xs font-semibold text-gray-700 mb-1">
                              Score: {score}
                            </div>
                            {risksInCell.length > 0 && (
                              <div className="text-xs space-y-1">
                                {risksInCell.map((r) => (
                                  <div key={r.id} className="text-gray-800 truncate" title={r.title}>
                                    • {r.title.substring(0, 20)}...
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>

              {/* Légende */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-red-200 rounded-lg p-3 border border-red-300">
                  <div className="text-sm font-bold text-red-900">Critique (16-25)</div>
                  <div className="text-xs text-red-800">Action immédiate requise</div>
                </div>
                <div className="bg-orange-200 rounded-lg p-3 border border-orange-300">
                  <div className="text-sm font-bold text-orange-900">Élevé (11-15)</div>
                  <div className="text-xs text-orange-800">Plan d'action prioritaire</div>
                </div>
                <div className="bg-yellow-200 rounded-lg p-3 border border-yellow-300">
                  <div className="text-sm font-bold text-yellow-900">Modéré (6-10)</div>
                  <div className="text-xs text-yellow-800">Surveillance active</div>
                </div>
                <div className="bg-green-200 rounded-lg p-3 border border-green-300">
                  <div className="text-sm font-bold text-green-900">Faible (1-5)</div>
                  <div className="text-xs text-green-800">Surveillance standard</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Suggestions auto */}
          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-600 text-white rounded-lg">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-purple-900 text-lg mb-2">
                      🤖 Détection automatique de risques
                    </h3>
                    <p className="text-sm text-purple-800 mb-3">
                      POPILOT analyse en continu le projet et suggère des risques potentiels basés sur :
                      tâches en retard, dépassements budget, documents manquants, compétences absentes,
                      dépendances fournisseurs...
                    </p>
                    <p className="text-xs text-purple-700">
                      ✅ Vous validez ou ignorez chaque suggestion
                    </p>
                  </div>
                </div>
              </div>

              {/* Liste des suggestions */}
              <div className="space-y-4">
                {autoSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Lightbulb className="w-6 h-6 text-purple-600" />
                          <h4 className="text-lg font-bold text-gray-900">{suggestion.title}</h4>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            {getRiskCategoryLabel(suggestion.category)}
                          </span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            🤖 SUGGESTION
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{suggestion.description}</p>
                        
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="text-xs text-gray-600 mb-1">
                            <strong>Source :</strong> {suggestion.sourceDetails}
                          </div>
                          <div className="text-xs text-gray-600">
                            <strong>Détecté le :</strong>{' '}
                            {new Date(suggestion.detectedAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>

                        {/* Métriques suggérées */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">Probabilité suggérée</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-purple-600 h-full"
                                  style={{ width: `${(suggestion.suggestedProbability / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold">{suggestion.suggestedProbability}/5</span>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">Impact max suggéré</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-orange-600 h-full"
                                  style={{
                                    width: `${(Math.max(...Object.values(suggestion.suggestedImpacts)) / 5) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-bold">
                                {Math.max(...Object.values(suggestion.suggestedImpacts))}/5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                          ✓ Créer risque
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                          ✗ Ignorer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Indicateurs */}
          {activeTab === 'indicators' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 text-lg mb-2 flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Indicateurs de pilotage des risques
                </h3>
                <p className="text-sm text-blue-800">
                  Pilotage factuel et amélioration continue de la gestion des risques (ISO 9001 §9).
                </p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                  <div className="text-sm text-gray-600 mb-2">Taux de traitement</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round((stats.closed / stats.total) * 100)}%
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                    <ArrowUp className="w-4 h-4" />
                    <span>+5% vs mois dernier</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
                  <div className="text-sm text-gray-600 mb-2">Risques critiques ouverts</div>
                  <div className="text-3xl font-bold text-orange-600">{stats.critical}</div>
                  <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
                    <ArrowUp className="w-4 h-4" />
                    <span>Action requise</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                  <div className="text-sm text-gray-600 mb-2">Temps moyen de fermeture</div>
                  <div className="text-3xl font-bold text-green-600">12j</div>
                  <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                    <ArrowDown className="w-4 h-4" />
                    <span>-3j vs mois dernier</span>
                  </div>
                </div>
              </div>

              {/* Évolution dans le temps (mockup) */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Évolution des risques (6 derniers mois)</h4>
                <div className="h-64 flex items-end justify-around gap-2">
                  {['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév'].map((month, idx) => {
                    const heights = [40, 55, 45, 60, 50, 35];
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-red-400 rounded-t"
                          style={{ height: `${heights[idx]}%` }}
                        />
                        <div className="text-xs text-gray-600">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Répartition par catégorie */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Répartition par catégorie</h4>
                <div className="space-y-3">
                  {[
                    { cat: 'supply-chain', count: 1, label: '📦 Supply Chain' },
                    { cat: 'hr', count: 1, label: '👥 RH' },
                    { cat: 'security', count: 1, label: '🔒 Sécurité' },
                    { cat: 'financial', count: 1, label: '💰 Financier' },
                    { cat: 'technical', count: 1, label: '🔧 Technique' },
                    { cat: 'communication', count: 1, label: '📣 Communication' },
                  ].map((item) => (
                    <div key={item.cat} className="flex items-center gap-3">
                      <div className="w-32 text-sm font-medium text-gray-700">{item.label}</div>
                      <div className="flex-1 bg-gray-200 h-6 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full flex items-center justify-end pr-2"
                          style={{ width: `${(item.count / stats.total) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">{item.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info ISO */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-600 text-white rounded-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 text-lg mb-2">
              ✅ Conformité ISO 9001 §6.1
            </h3>
            <p className="text-sm text-green-800 mb-3">
              L'onglet RISQUES de POPILOT constitue le registre officiel des risques et opportunités,
              garantissant :
            </p>
            <ul className="text-sm text-green-800 space-y-1">
              <li>✓ Identification systématique des risques et opportunités</li>
              <li>✓ Évaluation objective (probabilité, impact, criticité)</li>
              <li>✓ Plans d'action documentés et tracés</li>
              <li>✓ Suivi et amélioration continue</li>
              <li>✓ Traçabilité totale (historique, décisions, responsabilités)</li>
              <li>✓ Liens transversaux avec tâches, documents, réunions, pipeline</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
