import { useState } from 'react';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Eye,
  Download,
  Clock,
  Shield,
  Filter,
  Search,
  Link,
  Target,
  AlertCircle,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import {
  ISODocument,
  ISODocumentType,
  DocumentCategory,
  ISO_REQUIREMENTS,
  getDocumentTypeLabel,
  getDocumentTypeColor,
  getDocumentCategoryLabel,
  isCriticalDocumentMissing,
} from '../types/documents';

export function DocumentationView() {
  const [activeTab, setActiveTab] = useState<'library' | 'compliance' | 'links'>('library');
  const [filterCategory, setFilterCategory] = useState<DocumentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Données de démonstration enrichies
  const documents: ISODocument[] = [
    // === QUALITÉ & PILOTAGE ===
    {
      id: 'doc-1',
      title: 'Politique Qualité POPILOT',
      type: 'politique-qualite',
      category: 'quality',
      status: 'validated',
      responsible: 'user-1',
      responsibleName: 'Jean Dupont',
      version: '2.1',
      validUntil: '2026-12-31',
      description: 'Politique qualité de l\'entreprise conforme ISO 9001',
      createdAt: '2025-01-15',
      updatedAt: '2026-01-10',
      validatedBy: 'Direction',
      validatedAt: '2026-01-10',
      history: [
        { version: '2.1', date: '2026-01-10', author: 'Jean Dupont', changes: 'Mise à jour objectifs 2026' },
      ],
      linkedTo: { projectId: 'popy' },
      isCritical: true,
    },
    {
      id: 'doc-2',
      title: 'Plan Projet POPY',
      type: 'plan-projet',
      category: 'pilotage',
      status: 'validated',
      responsible: 'user-1',
      responsibleName: 'Jean Dupont',
      version: '3.4',
      validUntil: '2026-06-30',
      description: 'Plan complet du projet POPY avec jalons et livrables',
      createdAt: '2025-10-01',
      updatedAt: '2026-01-15',
      validatedBy: 'Comité pilotage',
      validatedAt: '2026-01-05',
      history: [],
      linkedTo: { projectId: 'popy', stageId: 'stage-1' },
      isCritical: true,
    },
    {
      id: 'doc-3',
      title: 'Registre des Risques POPY',
      type: 'registre-risques',
      category: 'pilotage',
      status: 'validated',
      responsible: 'user-7',
      responsibleName: 'Aline Moreau',
      version: '1.8',
      description: 'Registre complet des risques identifiés et plans de mitigation',
      createdAt: '2025-10-15',
      updatedAt: '2026-01-16',
      validatedBy: 'Responsable Qualité',
      validatedAt: '2026-01-16',
      history: [],
      linkedTo: { projectId: 'popy', riskIds: ['risk-1', 'risk-2', 'risk-3'] },
      isCritical: true,
    },
    // === ÉTUDES & FAISABILITÉ ===
    {
      id: 'doc-4',
      title: 'Étude de Faisabilité Technique POPY',
      type: 'etude-faisabilite-technique',
      category: 'feasibility',
      status: 'validated',
      responsible: 'user-2',
      responsibleName: 'Alice Chevalier',
      version: '1.0',
      description: 'Analyse complète de la faisabilité technique : hardware, IA, capteurs',
      createdAt: '2025-09-01',
      updatedAt: '2025-10-15',
      validatedBy: 'Comité technique',
      validatedAt: '2025-10-15',
      history: [],
      linkedTo: { projectId: 'popy', stageId: 'stage-1', decisionIds: ['dec-1'] },
      isCritical: true,
    },
    {
      id: 'doc-5',
      title: 'Étude de Marché - Robots Éducatifs IA',
      type: 'etude-marche',
      category: 'feasibility',
      status: 'validated',
      responsible: 'user-1',
      responsibleName: 'Jean Dupont',
      version: '1.2',
      description: 'Analyse du marché des robots éducatifs avec IA, taille, concurrence',
      createdAt: '2025-08-01',
      updatedAt: '2025-09-20',
      validatedBy: 'Direction Marketing',
      validatedAt: '2025-09-20',
      history: [],
      linkedTo: { projectId: 'popy' },
      tags: ['marché', 'concurrence', 'opportunité'],
    },
    {
      id: 'doc-6',
      title: 'Analyse des Besoins Utilisateurs',
      type: 'analyse-besoins',
      category: 'feasibility',
      status: 'validated',
      responsible: 'user-5',
      responsibleName: 'Marie Laurent',
      version: '2.0',
      description: 'Besoins des parents et enfants (3-8 ans), persona, journeys',
      createdAt: '2025-08-15',
      updatedAt: '2025-10-01',
      validatedBy: 'Équipe UX',
      validatedAt: '2025-10-01',
      history: [],
      linkedTo: { projectId: 'popy', taskIds: ['task-1', 'task-2'] },
    },
    // === CONCEPTION ===
    {
      id: 'doc-7',
      title: 'Conception Fonctionnelle POPY',
      type: 'conception-fonctionnelle',
      category: 'conception',
      status: 'validated',
      responsible: 'user-5',
      responsibleName: 'Marie Laurent',
      version: '3.1',
      description: 'Spécifications fonctionnelles détaillées, user stories, wireframes',
      createdAt: '2025-10-20',
      updatedAt: '2026-01-10',
      validatedBy: 'Product Owner',
      validatedAt: '2026-01-10',
      history: [],
      linkedTo: { projectId: 'popy', stageId: 'stage-2', taskIds: ['task-4', 'task-5'] },
      isCritical: true,
    },
    {
      id: 'doc-8',
      title: 'Architecture Technique POPY',
      type: 'architecture',
      category: 'conception',
      status: 'validated',
      responsible: 'user-3',
      responsibleName: 'Thomas Serrano',
      version: '2.5',
      description: 'Architecture globale : Raspberry Pi, capteurs ToF, IA embarquée, cloud',
      createdAt: '2025-11-01',
      updatedAt: '2026-01-12',
      validatedBy: 'Architecte technique',
      validatedAt: '2026-01-12',
      history: [],
      linkedTo: { projectId: 'popy', stageId: 'stage-2', decisionIds: ['dec-2', 'dec-3'] },
      isCritical: true,
    },
    {
      id: 'doc-9',
      title: 'Cas d\'Usage et Scénarios',
      type: 'cas-usage',
      category: 'conception',
      status: 'draft',
      responsible: 'user-5',
      responsibleName: 'Marie Laurent',
      version: '1.0-draft',
      description: 'Cas d\'usage détaillés : jeu, apprentissage, feedback émotionnel',
      createdAt: '2026-01-05',
      updatedAt: '2026-01-16',
      history: [],
      linkedTo: { projectId: 'popy', stageId: 'stage-2' },
    },
    // === FINANCIER ===
    {
      id: 'doc-10',
      title: 'Étude Financière Prévisionnelle POPY',
      type: 'etude-financiere-previsionnelle',
      category: 'financial',
      status: 'validated',
      responsible: 'user-1',
      responsibleName: 'Jean Dupont',
      version: '1.1',
      description: 'Business plan, prévisionnel sur 3 ans, seuil de rentabilité',
      createdAt: '2025-09-10',
      updatedAt: '2025-10-25',
      validatedBy: 'Direction Financière',
      validatedAt: '2025-10-25',
      history: [],
      linkedTo: { projectId: 'popy' },
      isCritical: true,
    },
    {
      id: 'doc-11',
      title: 'Budget Détaillé POPY 2026',
      type: 'budget',
      category: 'financial',
      status: 'validated',
      responsible: 'user-1',
      responsibleName: 'Jean Dupont',
      version: '2.0',
      validUntil: '2026-12-31',
      description: 'Budget 2026 : CAPEX, OPEX, salaires, achats hardware',
      createdAt: '2025-12-01',
      updatedAt: '2026-01-05',
      validatedBy: 'Direction',
      validatedAt: '2026-01-05',
      history: [],
      linkedTo: { projectId: 'popy', stageId: 'stage-1' },
      isCritical: true,
    },
    {
      id: 'doc-12',
      title: 'Suivi Financier Q1 2026',
      type: 'suivi-financier',
      category: 'financial',
      status: 'draft',
      responsible: 'user-1',
      responsibleName: 'Jean Dupont',
      version: '1.0-draft',
      description: 'Suivi budgétaire T1 2026 avec analyse des écarts',
      createdAt: '2026-01-02',
      updatedAt: '2026-01-16',
      history: [],
      linkedTo: { projectId: 'popy' },
    },
    // === MARKETING & COMMUNICATION ===
    {
      id: 'doc-13',
      title: 'Stratégie Marketing POPY',
      type: 'strategie-marketing',
      category: 'marketing',
      status: 'validated',
      responsible: 'user-1',
      responsibleName: 'Jean Dupont',
      version: '1.0',
      description: 'Positionnement, cibles, proposition de valeur, canaux de distribution',
      createdAt: '2025-09-15',
      updatedAt: '2025-10-20',
      validatedBy: 'Direction Marketing',
      validatedAt: '2025-10-20',
      history: [],
      linkedTo: { projectId: 'popy' },
    },
    {
      id: 'doc-14',
      title: 'Plan de Communication POPY',
      type: 'plan-communication',
      category: 'marketing',
      status: 'draft',
      responsible: 'user-6',
      responsibleName: 'Paul Leblanc',
      version: '0.5-draft',
      description: 'Plan de communication : messages, canaux, calendrier éditorial',
      createdAt: '2026-01-10',
      updatedAt: '2026-01-16',
      history: [],
      linkedTo: { projectId: 'popy' },
    },
    // === RH ===
    {
      id: 'doc-15',
      title: 'Plan de Recrutement POPY 2026',
      type: 'plan-recrutement',
      category: 'hr',
      status: 'validated',
      responsible: 'user-7',
      responsibleName: 'Aline Moreau',
      version: '1.0',
      description: 'Profils recherchés : dev IA, ingénieur hardware, designer',
      createdAt: '2025-11-01',
      updatedAt: '2025-12-15',
      validatedBy: 'DRH',
      validatedAt: '2025-12-15',
      history: [],
      linkedTo: { projectId: 'popy' },
    },
    {
      id: 'doc-16',
      title: 'Plan de Formation & Compétences',
      type: 'plan-formation',
      category: 'hr',
      status: 'draft',
      responsible: 'user-7',
      responsibleName: 'Aline Moreau',
      version: '1.0-draft',
      description: 'Plan de montée en compétences de l\'équipe POPY',
      createdAt: '2026-01-08',
      updatedAt: '2026-01-16',
      history: [],
      linkedTo: { projectId: 'popy', taskIds: ['task-onboarding'] },
    },
  ];

  // Statistiques par catégorie
  const statsByCategory = {
    feasibility: documents.filter((d) => d.category === 'feasibility').length,
    conception: documents.filter((d) => d.category === 'conception').length,
    financial: documents.filter((d) => d.category === 'financial').length,
    marketing: documents.filter((d) => d.category === 'marketing').length,
    hr: documents.filter((d) => d.category === 'hr').length,
    quality: documents.filter((d) => d.category === 'quality').length,
    pilotage: documents.filter((d) => d.category === 'pilotage').length,
  };

  const stats = {
    total: documents.length,
    validated: documents.filter((d) => d.status === 'validated').length,
    draft: documents.filter((d) => d.status === 'draft').length,
    obsolete: documents.filter((d) => d.status === 'obsolete').length,
    critical: documents.filter((d) => d.isCritical).length,
  };

  const complianceStats = {
    compliant: ISO_REQUIREMENTS.filter((r) => r.status === 'compliant').length,
    incomplete: ISO_REQUIREMENTS.filter((r) => r.status === 'incomplete').length,
    missing: ISO_REQUIREMENTS.filter((r) => r.status === 'missing').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'draft':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'obsolete':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'incomplete':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'missing':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const filteredDocuments = documents
    .filter((doc) => filterCategory === 'all' || doc.category === filterCategory)
    .filter((doc) =>
      searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Grouper les documents par catégorie
  const documentsByCategory = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<DocumentCategory, ISODocument[]>);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Documentation Projet - Mémoire Stratégique
          </h1>
          <p className="text-gray-600 mt-1">
            Études, faisabilité, conception, financier, marketing, RH, qualité & pilotage
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Nouveau document
        </button>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total documents</p>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-600 bg-blue-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Validés</p>
              <p className="text-2xl font-bold text-green-600">{stats.validated}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 bg-green-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Brouillons</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
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
            <AlertCircle className="w-10 h-10 text-red-600 bg-red-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conformité ISO</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((complianceStats.compliant / ISO_REQUIREMENTS.length) * 100)}%
              </p>
            </div>
            <Shield className="w-10 h-10 text-purple-600 bg-purple-100 p-2 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Stats par catégorie */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 text-lg mb-4">
          📚 Répartition par catégorie documentaire
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {Object.entries(statsByCategory).map(([category, count]) => (
            <div key={category} className="bg-white rounded-lg p-3 border border-blue-200 text-center">
              <div className="text-2xl mb-1">
                {getDocumentCategoryLabel(category as DocumentCategory).split(' ')[0]}
              </div>
              <div className="text-xs text-gray-600 mb-1">
                {getDocumentCategoryLabel(category as DocumentCategory).split(' ').slice(1).join(' ')}
              </div>
              <div className="text-lg font-bold text-blue-600">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('library')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'library'
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5 inline mr-2" />
              Bibliothèque complète
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'compliance'
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Shield className="w-5 h-5 inline mr-2" />
              Conformité ISO 9001
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'links'
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Link className="w-5 h-5 inline mr-2" />
              Liens automatiques
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tab: Bibliothèque */}
          {activeTab === 'library' && (
            <div className="space-y-6">
              {/* Filtres et recherche */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un document..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="feasibility">📊 Études & Faisabilité</option>
                  <option value="conception">🧠 Conception</option>
                  <option value="financial">💰 Financier</option>
                  <option value="marketing">📣 Marketing & Communication</option>
                  <option value="hr">👥 Ressources Humaines</option>
                  <option value="quality">✅ Qualité</option>
                  <option value="pilotage">🎯 Pilotage</option>
                </select>
              </div>

              {/* Documents groupés par catégorie */}
              {Object.entries(documentsByCategory).map(([category, docs]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    {getDocumentCategoryLabel(category as DocumentCategory)}
                    <span className="text-sm font-normal text-gray-500">
                      ({docs.length} document{docs.length > 1 ? 's' : ''})
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {docs.map((doc) => (
                      <div
                        key={doc.id}
                        className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(doc.status)}
                              <h4 className="text-lg font-bold text-gray-900">{doc.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDocumentTypeColor(doc.type)}`}>
                                {getDocumentTypeLabel(doc.type)}
                              </span>
                              {doc.isCritical && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold border border-red-200">
                                  ⚠️ CRITIQUE
                                </span>
                              )}
                            </div>
                            {doc.description && (
                              <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                            )}
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <span>Version : <strong>{doc.version}</strong></span>
                              <span>Responsable : <strong>{doc.responsibleName}</strong></span>
                              {doc.validUntil && (
                                <span>
                                  Valide jusqu'au :{' '}
                                  <strong>{new Date(doc.validUntil).toLocaleDateString('fr-FR')}</strong>
                                </span>
                              )}
                              {doc.validatedBy && (
                                <span className="text-green-600">
                                  ✓ Validé par {doc.validatedBy}
                                </span>
                              )}
                            </div>
                            {/* Liens */}
                            {doc.linkedTo && (
                              <div className="mt-3 flex items-center gap-2 text-xs">
                                <Link className="w-4 h-4 text-blue-600" />
                                <span className="text-blue-600 font-medium">Lié à :</span>
                                {doc.linkedTo.stageId && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                    Étape pipeline
                                  </span>
                                )}
                                {doc.linkedTo.taskIds && doc.linkedTo.taskIds.length > 0 && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                    {doc.linkedTo.taskIds.length} tâche(s)
                                  </span>
                                )}
                                {doc.linkedTo.decisionIds && doc.linkedTo.decisionIds.length > 0 && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                                    {doc.linkedTo.decisionIds.length} décision(s)
                                  </span>
                                )}
                                {doc.linkedTo.riskIds && doc.linkedTo.riskIds.length > 0 && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                                    {doc.linkedTo.riskIds.length} risque(s)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Voir">
                              <Eye className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Télécharger">
                              <Download className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Conformité ISO (inchangé) */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 text-lg mb-2 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Checklist de conformité ISO 9001
                </h3>
                <p className="text-sm text-blue-800 mb-3">
                  Suivi automatique des exigences documentaires ISO 9001. POPILOT vérifie que tous
                  les documents requis existent, sont à jour et validés.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{complianceStats.compliant}</div>
                    <div className="text-xs text-green-700">✅ Conforme</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{complianceStats.incomplete}</div>
                    <div className="text-xs text-yellow-700">⚠️ Incomplet</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{complianceStats.missing}</div>
                    <div className="text-xs text-red-700">❌ Manquant</div>
                  </div>
                </div>
              </div>

              {/* Liste des exigences */}
              <div className="space-y-3">
                {ISO_REQUIREMENTS.map((req, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-xl p-5 ${
                      req.status === 'compliant'
                        ? 'border-green-200 bg-green-50'
                        : req.status === 'incomplete'
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getComplianceIcon(req.status)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              {req.category}
                              {req.isCritical && (
                                <span className="px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs font-bold">
                                  CRITIQUE
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-700 mt-1">{req.requirement}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                              req.status === 'compliant'
                                ? 'bg-green-200 text-green-800'
                                : req.status === 'incomplete'
                                ? 'bg-yellow-200 text-yellow-800'
                                : 'bg-red-200 text-red-800'
                            }`}
                          >
                            {req.status === 'compliant'
                              ? '✓ Conforme'
                              : req.status === 'incomplete'
                              ? '⚠ Incomplet'
                              : '✗ Manquant'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Liens automatiques */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-600 text-white rounded-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 text-lg mb-2">
                      🔗 Traçabilité complète automatique
                    </h3>
                    <p className="text-sm text-green-800 mb-3">
                      POPILOT connecte automatiquement chaque document aux éléments du projet :
                      étapes pipeline, tâches, décisions, risques, objectifs.
                    </p>
                    <div className="text-sm text-green-800 space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <strong>Vision → Décisions → Exécution</strong>
                      </div>
                      <p className="text-xs">
                        Exemple : Étude de faisabilité technique → liée à Étape "Cadrage" → liée à
                        Décision "Choix architecture" → liée à Tâches de développement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exemples de liens */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Exemples de traçabilité automatique
                </h3>
                
                {/* Exemple 1 */}
                <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
                  <div className="font-semibold text-blue-900 mb-3">
                    📄 Étude de Faisabilité Technique POPY
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <strong className="text-blue-700">Liée à l'étape :</strong> Cadrage (stage-1)
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <strong className="text-green-700">Liée à la décision :</strong> Choix architecture hardware
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <strong className="text-purple-700">Impact :</strong> Permet le passage à l'étape "Conception"
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exemple 2 */}
                <div className="bg-white border-2 border-green-200 rounded-xl p-5">
                  <div className="font-semibold text-green-900 mb-3">
                    💰 Budget Détaillé POPY 2026
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <strong className="text-blue-700">Liée à l'étape :</strong> Cadrage (stage-1)
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div>
                        <strong className="text-orange-700">Document critique :</strong> Bloque le passage à la
                        prochaine étape si non validé
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exemple 3 */}
                <div className="bg-white border-2 border-purple-200 rounded-xl p-5">
                  <div className="font-semibold text-purple-900 mb-3">
                    🧠 Architecture Technique POPY
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <strong className="text-blue-700">Liée à l'étape :</strong> Conception (stage-2)
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <strong className="text-green-700">Liée aux décisions :</strong> Choix Raspberry Pi 4, Choix
                        capteurs ToF
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <strong className="text-blue-700">Liée aux tâches :</strong> 8 tâches de développement
                        hardware
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Automatisations info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-600 text-white rounded-lg">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900 text-lg mb-2">
              🤖 Automatisations documentaires
            </h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>✓ Création automatique des dossiers requis à la création du projet</li>
              <li>✓ Alertes si documents manquants ou périmés</li>
              <li>✓ Blocage du passage à l'étape suivante si document critique absent</li>
              <li>✓ Génération automatique de la checklist audit ISO</li>
              <li>✓ Liens automatiques avec pipeline, tâches, décisions, risques</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}