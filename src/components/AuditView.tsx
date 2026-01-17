import { useState } from 'react';
import {
  Shield,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Users,
  Target,
  Zap,
  FileText,
  BarChart3,
  Heart,
  RefreshCw,
  Download,
  Calendar,
  Eye,
  Link as LinkIcon,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Plus,
  Filter,
  Award,
} from 'lucide-react';

type AuditBlock = 
  | 'context'
  | 'leadership'
  | 'planning'
  | 'execution'
  | 'documentation'
  | 'satisfaction'
  | 'improvement'
  | 'continuous';

type ComplianceStatus = 'compliant' | 'partial' | 'non-compliant' | 'not-applicable';

interface AuditCriterion {
  id: string;
  title: string;
  description: string;
  status: ComplianceStatus;
  score: number; // 0-100
  evidence: string[];
  gaps: string[];
  actions: string[];
  linkedModules: string[];
  lastReview: string;
  isoRef: string;
}

interface AuditBlockData {
  id: AuditBlock;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  isoRef: string;
  score: number;
  criteria: AuditCriterion[];
  keyQuestion: string;
}

export function AuditView() {
  const [expandedBlock, setExpandedBlock] = useState<AuditBlock | null>('context');
  const [showExportModal, setShowExportModal] = useState(false);

  const auditBlocks: AuditBlockData[] = [
    {
      id: 'context',
      title: 'Contexte & Stratégie',
      subtitle: 'Vision, objectifs et parties intéressées',
      icon: Target,
      color: 'purple',
      isoRef: 'ISO §4',
      score: 92,
      keyQuestion: 'Pourquoi ce projet existe-t-il et à quels besoins répond-il ?',
      criteria: [
        {
          id: 'c1',
          title: 'Vision du projet formalisée',
          description: 'Le projet POPY dispose d\'une vision claire et documentée',
          status: 'compliant',
          score: 100,
          evidence: [
            'Stratégie marketing complète avec positionnement premium',
            'Roadmap 5 ans détaillée',
            'Étude de marché documentée',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['marketing', 'documentation'],
          lastReview: '2026-01-17',
          isoRef: '§4.1',
        },
        {
          id: 'c2',
          title: 'Objectifs clairs et mesurables',
          description: 'Les objectifs du projet sont SMART et suivis',
          status: 'compliant',
          score: 95,
          evidence: [
            'Pipeline POPY avec 5 étapes majeures',
            'KPIs définis par phase (coût, volume, marge)',
            'Planning auto-généré type Gantt',
          ],
          gaps: ['Quelques indicateurs de performance qualité à compléter'],
          actions: ['task-kpi-quality-1'],
          linkedModules: ['pipeline', 'popy-project'],
          lastReview: '2026-01-16',
          isoRef: '§4.2',
        },
        {
          id: 'c3',
          title: 'Parties intéressées identifiées',
          description: 'Les parties prenantes et leurs attentes sont documentées',
          status: 'partial',
          score: 75,
          evidence: [
            'Financements identifiés (6 sources)',
            'Liste fournisseurs avec fiches détaillées',
          ],
          gaps: [
            'Cartographie complète des parties intéressées manquante',
            'Attentes formalisées partiellement',
          ],
          actions: ['task-stakeholder-mapping'],
          linkedModules: ['budget', 'team'],
          lastReview: '2026-01-15',
          isoRef: '§4.2',
        },
      ],
    },
    {
      id: 'leadership',
      title: 'Leadership & Organisation',
      subtitle: 'Rôles, responsabilités et décisions',
      icon: Users,
      color: 'blue',
      isoRef: 'ISO §5',
      score: 88,
      keyQuestion: 'Qui décide, sur quoi, et comment est-ce tracé ?',
      criteria: [
        {
          id: 'l1',
          title: 'Rôles et responsabilités définis',
          description: 'Chaque membre a un rôle clair avec compétences associées',
          status: 'compliant',
          score: 95,
          evidence: [
            'Système de compétences par membre (automatique via tâches)',
            'Onboarding intelligent configuré',
            'Assignation claire sur chaque tâche',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['team', 'tasks', 'popy-project'],
          lastReview: '2026-01-17',
          isoRef: '§5.3',
        },
        {
          id: 'l2',
          title: 'Décisions tracées',
          description: 'Les décisions importantes sont documentées et accessibles',
          status: 'compliant',
          score: 90,
          evidence: [
            'Comptes rendus de 18 réunions avec décisions',
            'Système de veille avec décisions documentées',
            'Historique des changements dans documentation',
          ],
          gaps: ['Quelques décisions informelles non tracées'],
          actions: ['task-formal-decisions'],
          linkedModules: ['meetings', 'veille', 'documentation'],
          lastReview: '2026-01-16',
          isoRef: '§5.1',
        },
        {
          id: 'l3',
          title: 'Communication interne efficace',
          description: 'Les informations circulent correctement dans l\'équipe',
          status: 'partial',
          score: 80,
          evidence: [
            'Réunions régulières avec CR systématiques',
            'Calendrier partagé avec événements',
          ],
          gaps: [
            'Pas de canal de communication instantanée formalisé',
            'Flux d\'information à optimiser',
          ],
          actions: ['task-comm-channel'],
          linkedModules: ['meetings', 'calendar'],
          lastReview: '2026-01-15',
          isoRef: '§5.1.1',
        },
      ],
    },
    {
      id: 'planning',
      title: 'Planification & Risques',
      subtitle: 'Objectifs, risques et opportunités',
      icon: Shield,
      color: 'orange',
      isoRef: 'ISO §6',
      score: 85,
      keyQuestion: 'Comment anticipez-vous les problèmes ?',
      criteria: [
        {
          id: 'p1',
          title: 'Registre des risques à jour',
          description: 'Les risques sont identifiés, évalués et suivis',
          status: 'compliant',
          score: 90,
          evidence: [
            'Module Risques avec 24 risques actifs',
            'Évaluation probabilité × impact',
            'Plans de mitigation définis',
          ],
          gaps: ['Certains risques sans action de mitigation'],
          actions: ['task-risk-mitigation-complete'],
          linkedModules: ['risks'],
          lastReview: '2026-01-17',
          isoRef: '§6.1',
        },
        {
          id: 'p2',
          title: 'Opportunités identifiées',
          description: 'Les opportunités d\'amélioration sont détectées et exploitées',
          status: 'compliant',
          score: 85,
          evidence: [
            'Veille technologique avec opportunités',
            'Feedback clients générant des idées',
            'Analyse concurrentielle',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['veille', 'satisfaction'],
          lastReview: '2026-01-16',
          isoRef: '§6.1',
        },
        {
          id: 'p3',
          title: 'Objectifs projet suivis',
          description: 'L\'avancement par rapport aux objectifs est mesuré',
          status: 'partial',
          score: 80,
          evidence: [
            'Pipeline avec jalons',
            'Budget tracké avec écarts',
          ],
          gaps: ['Pas de tableau de bord unifié des objectifs'],
          actions: ['task-unified-dashboard'],
          linkedModules: ['pipeline', 'budget'],
          lastReview: '2026-01-15',
          isoRef: '§6.2',
        },
      ],
    },
    {
      id: 'execution',
      title: 'Exécution & Ressources',
      subtitle: 'Compétences, budget et maîtrise',
      icon: Zap,
      color: 'green',
      isoRef: 'ISO §7 & §8',
      score: 91,
      keyQuestion: 'Avez-vous les moyens humains, techniques et financiers ?',
      criteria: [
        {
          id: 'e1',
          title: 'Compétences adaptées aux tâches',
          description: 'L\'équipe possède les compétences nécessaires',
          status: 'compliant',
          score: 95,
          evidence: [
            'Système de compétences auto-généré',
            'Détection des écarts de compétences',
            'Plan de formation identifié',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['team', 'tasks', 'veille'],
          lastReview: '2026-01-17',
          isoRef: '§7.2',
        },
        {
          id: 'e2',
          title: 'Maîtrise du budget',
          description: 'Les ressources financières sont planifiées et suivies',
          status: 'compliant',
          score: 92,
          evidence: [
            'BOM intelligente avec 45 composants',
            'Suivi budgétaire avec KPIs',
            '6 sources de financement trackées',
            'Fiches fournisseurs détaillées',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['budget'],
          lastReview: '2026-01-16',
          isoRef: '§7.1.3',
        },
        {
          id: 'e3',
          title: 'Maîtrise des fournisseurs',
          description: 'Les fournisseurs sont sélectionnés et évalués',
          status: 'partial',
          score: 85,
          evidence: [
            'Fiches fournisseurs avec critères',
            'Historique des commandes',
          ],
          gaps: ['Pas d\'évaluation formelle des fournisseurs'],
          actions: ['task-supplier-evaluation'],
          linkedModules: ['budget'],
          lastReview: '2026-01-15',
          isoRef: '§8.4',
        },
      ],
    },
    {
      id: 'documentation',
      title: 'Documentation & Traçabilité',
      subtitle: 'Documents, versions et preuves',
      icon: FileText,
      color: 'indigo',
      isoRef: 'ISO §7.5',
      score: 94,
      keyQuestion: 'Pouvez-vous prouver ce que vous avez fait ?',
      criteria: [
        {
          id: 'd1',
          title: 'Documents obligatoires présents',
          description: 'Les 7 catégories documentaires ISO sont présentes',
          status: 'compliant',
          score: 95,
          evidence: [
            '7 catégories ISO complètes',
            'Documentation technique avancée',
            'Procédures et modes opératoires',
            'Enregistrements qualité',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['documentation'],
          lastReview: '2026-01-17',
          isoRef: '§7.5.3',
        },
        {
          id: 'd2',
          title: 'Versioning maîtrisé',
          description: 'Les versions des documents sont tracées',
          status: 'compliant',
          score: 100,
          evidence: [
            'Système de versions automatique',
            'Historique complet',
            'Validation des documents',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['documentation'],
          lastReview: '2026-01-16',
          isoRef: '§7.5.3',
        },
        {
          id: 'd3',
          title: 'Accès maîtrisé',
          description: 'Les documents sont accessibles aux bonnes personnes',
          status: 'partial',
          score: 85,
          evidence: ['Système de tags et catégories'],
          gaps: ['Gestion des droits d\'accès à formaliser'],
          actions: ['task-access-control'],
          linkedModules: ['documentation'],
          lastReview: '2026-01-15',
          isoRef: '§7.5.3',
        },
      ],
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction & Retours',
      subtitle: 'Écoute client et feedback',
      icon: Heart,
      color: 'pink',
      isoRef: 'ISO §9.1.2',
      score: 87,
      keyQuestion: 'Comment savez-vous si le produit répond aux attentes ?',
      criteria: [
        {
          id: 's1',
          title: 'Mesure de la satisfaction client',
          description: 'La satisfaction est mesurée à chaque phase',
          status: 'compliant',
          score: 90,
          evidence: [
            'Système de feedback 5 phases',
            'KPIs CSAT, NPS, CES',
            'Satisfaction par phase mesurée',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['satisfaction'],
          lastReview: '2026-01-17',
          isoRef: '§9.1.2',
        },
        {
          id: 's2',
          title: 'Analyse des retours',
          description: 'Les feedbacks sont analysés et exploités',
          status: 'compliant',
          score: 85,
          evidence: [
            'Insights automatiques par thème',
            'Analyse de sentiment',
            'Priorisation par impact',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['satisfaction'],
          lastReview: '2026-01-16',
          isoRef: '§9.1.2',
        },
        {
          id: 's3',
          title: 'Actions issues des feedbacks',
          description: 'Les retours clients génèrent des améliorations',
          status: 'partial',
          score: 85,
          evidence: ['Liens satisfaction → tâches', 'Boucle PDCA configurée'],
          gaps: ['Certains feedbacks sans action planifiée'],
          actions: ['task-feedback-actions'],
          linkedModules: ['satisfaction', 'tasks'],
          lastReview: '2026-01-15',
          isoRef: '§10.2',
        },
      ],
    },
    {
      id: 'improvement',
      title: 'Amélioration Continue',
      subtitle: 'Non-conformités et actions',
      icon: TrendingUp,
      color: 'teal',
      isoRef: 'ISO §9 & §10',
      score: 82,
      keyQuestion: 'Comment progressez-vous concrètement ?',
      criteria: [
        {
          id: 'i1',
          title: 'Suivi des indicateurs',
          description: 'Des KPIs sont définis et suivis dans le temps',
          status: 'compliant',
          score: 85,
          evidence: [
            'KPIs budgétaires',
            'KPIs satisfaction',
            'KPIs marketing',
            'Évolution temporelle trackée',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['budget', 'satisfaction', 'marketing'],
          lastReview: '2026-01-17',
          isoRef: '§9.1',
        },
        {
          id: 'i2',
          title: 'Traitement des non-conformités',
          description: 'Les écarts et problèmes sont documentés et traités',
          status: 'partial',
          score: 75,
          evidence: ['Système de risques avec actions'],
          gaps: ['Registre formel des non-conformités manquant'],
          actions: ['task-nc-register'],
          linkedModules: ['risks'],
          lastReview: '2026-01-15',
          isoRef: '§10.2',
        },
        {
          id: 'i3',
          title: 'Capitalisation des retours',
          description: 'Les apprentissages sont documentés et réutilisés',
          status: 'partial',
          score: 85,
          evidence: [
            'Veille avec analyse d\'impact',
            'Feedback → amélioration',
            'Stratégie Learning Curve',
          ],
          gaps: ['Base de connaissances à structurer'],
          actions: ['task-knowledge-base'],
          linkedModules: ['veille', 'satisfaction', 'marketing'],
          lastReview: '2026-01-16',
          isoRef: '§7.1.6',
        },
      ],
    },
    {
      id: 'continuous',
      title: 'Audit Continu',
      subtitle: 'Surveillance permanente',
      icon: RefreshCw,
      color: 'cyan',
      isoRef: 'ISO §9.2',
      score: 90,
      keyQuestion: 'L\'audit est-il intégré au quotidien ?',
      criteria: [
        {
          id: 'ac1',
          title: 'Audit alimenté en continu',
          description: 'L\'audit se met à jour automatiquement',
          status: 'compliant',
          score: 95,
          evidence: [
            'Connexions automatiques entre modules',
            'Mise à jour temps réel des scores',
            'Alertes sur non-conformités',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['all'],
          lastReview: '2026-01-17',
          isoRef: '§9.2',
        },
        {
          id: 'ac2',
          title: 'Traçabilité complète',
          description: 'Chaque action alimente l\'audit',
          status: 'compliant',
          score: 90,
          evidence: [
            'Réunions → CR → décisions → tâches',
            'Veille → risques → actions',
            'Feedback → amélioration → mesure',
          ],
          gaps: [],
          actions: [],
          linkedModules: ['all'],
          lastReview: '2026-01-16',
          isoRef: '§9.2',
        },
        {
          id: 'ac3',
          title: 'Génération automatique de preuves',
          description: 'Les preuves ISO sont générées automatiquement',
          status: 'partial',
          score: 85,
          evidence: ['Export de rapports', 'Historiques complets'],
          gaps: ['Package complet audit à finaliser'],
          actions: ['task-audit-package'],
          linkedModules: ['all'],
          lastReview: '2026-01-15',
          isoRef: '§9.2',
        },
      ],
    },
  ];

  const globalScore = Math.round(
    auditBlocks.reduce((sum, block) => sum + block.score, 0) / auditBlocks.length
  );

  const totalCriteria = auditBlocks.reduce((sum, block) => sum + block.criteria.length, 0);
  const compliantCriteria = auditBlocks.reduce(
    (sum, block) => sum + block.criteria.filter((c) => c.status === 'compliant').length,
    0
  );
  const partialCriteria = auditBlocks.reduce(
    (sum, block) => sum + block.criteria.filter((c) => c.status === 'partial').length,
    0
  );
  const nonCompliantCriteria = auditBlocks.reduce(
    (sum, block) => sum + block.criteria.filter((c) => c.status === 'non-compliant').length,
    0
  );

  const getStatusColor = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-700';
      case 'partial':
        return 'bg-yellow-100 text-yellow-700';
      case 'non-compliant':
        return 'bg-red-100 text-red-700';
      case 'not-applicable':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant':
        return 'Conforme';
      case 'partial':
        return 'Partiel';
      case 'non-compliant':
        return 'Non conforme';
      case 'not-applicable':
        return 'N/A';
    }
  };

  const getStatusIcon = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'non-compliant':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'not-applicable':
        return <div className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Global ISO 9001</h1>
          <p className="text-gray-600 mt-1">
            Conformité en temps réel • Amélioration continue • Projet POPY
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export rapport audit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Eye className="w-5 h-5" />
            Vue synthétique
          </button>
        </div>
      </div>

      {/* Score global */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-10 h-10" />
              <div>
                <h2 className="text-2xl font-bold">Score de maturité ISO 9001</h2>
                <p className="text-indigo-200">Projet POPY • Évaluation en temps réel</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm mb-1">Critères conformes</div>
                <div className="text-3xl font-bold">{compliantCriteria}/{totalCriteria}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm mb-1">Conformité partielle</div>
                <div className="text-3xl font-bold">{partialCriteria}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm mb-1">Non-conformités</div>
                <div className="text-3xl font-bold">{nonCompliantCriteria}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm mb-1">Dernière MAJ</div>
                <div className="text-xl font-bold">Temps réel</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="white"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(globalScore / 100) * 553} 553`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold">{globalScore}%</div>
                <div className="text-sm">Conformité</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scores par bloc */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          8 Blocs d'audit ISO 9001
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {auditBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <button
                key={block.id}
                onClick={() => setExpandedBlock(block.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                  expandedBlock === block.id
                    ? `border-${block.color}-500 bg-${block.color}-50`
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-${block.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${block.color}-600`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(block.score)}`}>
                      {block.score}%
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{block.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{block.subtitle}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-600 font-medium">{block.isoRef}</span>
                  <span className="text-gray-500">{block.criteria.length} critères</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Détail du bloc sélectionné */}
      {expandedBlock && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {auditBlocks
            .filter((b) => b.id === expandedBlock)
            .map((block) => {
              const Icon = block.icon;
              return (
                <div key={block.id}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-${block.color}-100 flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 text-${block.color}-600`} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{block.title}</h2>
                        <p className="text-gray-600">{block.subtitle}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                            {block.isoRef}
                          </span>
                          <span className={`text-sm font-bold ${getScoreColor(block.score)}`}>
                            Score: {block.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-900 font-medium italic">
                      🎯 Question audit clé : "{block.keyQuestion}"
                    </p>
                  </div>

                  {/* Critères */}
                  <div className="space-y-4">
                    {block.criteria.map((criterion) => (
                      <div
                        key={criterion.id}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            {getStatusIcon(criterion.status)}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">{criterion.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(criterion.status)}`}>
                                  {getStatusLabel(criterion.status)}
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {criterion.isoRef}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{criterion.description}</p>

                              {/* Score */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-600">Score de conformité</span>
                                  <span className={`font-bold ${getScoreColor(criterion.score)}`}>
                                    {criterion.score}%
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      criterion.score >= 90 ? 'bg-green-500' :
                                      criterion.score >= 75 ? 'bg-yellow-500' :
                                      criterion.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${criterion.score}%` }}
                                  />
                                </div>
                              </div>

                              {/* Preuves */}
                              {criterion.evidence.length > 0 && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                  <div className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Preuves de conformité
                                  </div>
                                  <ul className="space-y-1">
                                    {criterion.evidence.map((ev, idx) => (
                                      <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                                        <span className="text-green-600">✓</span>
                                        <span>{ev}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Écarts */}
                              {criterion.gaps.length > 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                                  <div className="flex items-center gap-2 text-sm font-medium text-yellow-900 mb-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Écarts identifiés
                                  </div>
                                  <ul className="space-y-1">
                                    {criterion.gaps.map((gap, idx) => (
                                      <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
                                        <span className="text-yellow-600">⚠</span>
                                        <span>{gap}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Actions */}
                              {criterion.actions.length > 0 && (
                                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-3">
                                  <div className="flex items-center gap-2 text-sm font-medium text-indigo-900 mb-2">
                                    <ArrowRight className="w-4 h-4" />
                                    Actions planifiées
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {criterion.actions.map((action, idx) => (
                                      <span
                                        key={idx}
                                        className="px-3 py-1 bg-white text-indigo-700 rounded text-xs font-medium"
                                      >
                                        {action}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Modules liés */}
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <LinkIcon className="w-3 h-3" />
                                <span>Modules liés: {criterion.linkedModules.join(', ')}</span>
                                <span className="ml-auto">
                                  Dernière revue: {new Date(criterion.lastReview).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Plan d'actions consolidé */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Plan d'actions consolidé (amélioration)
        </h2>
        <div className="space-y-3">
          {auditBlocks
            .flatMap((block) =>
              block.criteria
                .filter((c) => c.actions.length > 0)
                .map((c) => ({ block: block.title, criterion: c }))
            )
            .map(({ block, criterion }, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{criterion.title}</div>
                  <div className="text-sm text-gray-600">
                    {block} • {criterion.isoRef}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {criterion.actions.map((action, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm font-medium"
                    >
                      {action}
                    </span>
                  ))}
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Créer tâche
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Différenciateur audit continu */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="w-8 h-8" />
          <div>
            <h3 className="text-2xl font-bold">Audit continu en temps réel</h3>
            <p className="text-cyan-100">Le différenciateur POPILOT</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm mb-2">Mise à jour automatique</div>
            <div className="text-xl font-bold">Chaque action alimente l'audit</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm mb-2">Plus jamais d'audit subi</div>
            <div className="text-xl font-bold">Preuves générées en continu</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm mb-2">Traçabilité totale</div>
            <div className="text-xl font-bold">Réunions → CR → Décisions → Tâches</div>
          </div>
        </div>
      </div>
    </div>
  );
}
