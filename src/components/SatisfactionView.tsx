import { useState } from 'react';
import {
  Smile,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Users,
  Calendar,
  BarChart3,
  Plus,
  Download,
  Filter,
  Search,
  Link as LinkIcon,
  Zap,
  Target,
  Heart,
  Meh,
  Frown,
  Star,
  ArrowRight,
  Bell,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';

type SurveyPhase = 'study' | 'prototype' | 'launch' | 'post-delivery' | 'continuous';
type RespondentType = 'parent' | 'child' | 'teacher' | 'expert' | 'other';
type SatisfactionLevel = 'very-satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very-dissatisfied';

interface SurveyResponse {
  id: string;
  surveyId: string;
  surveyTitle: string;
  phase: SurveyPhase;
  date: string;
  respondent: string;
  respondentType: RespondentType;
  csat: number; // 1-5
  ces?: number; // 1-7 (Customer Effort Score)
  nps?: number; // 0-10 (Net Promoter Score)
  verbatim: string;
  keyTopics: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  linkedTasks?: string[];
  linkedRisks?: string[];
  status: 'new' | 'analyzing' | 'action-planned' | 'resolved';
}

interface FeedbackInsight {
  topic: string;
  count: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  impact: 'low' | 'medium' | 'high';
  examples: string[];
}

export function SatisfactionView() {
  const [activePhase, setActivePhase] = useState<SurveyPhase | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);

  const phases = [
    {
      id: 'study' as SurveyPhase,
      label: 'Étude & Conception',
      icon: Target,
      color: 'purple',
      description: 'Validation concept, besoins',
    },
    {
      id: 'prototype' as SurveyPhase,
      label: 'Prototype & Tests',
      icon: Zap,
      color: 'orange',
      description: 'Tests terrain, retours enfants',
    },
    {
      id: 'launch' as SurveyPhase,
      label: 'Lancement Produit',
      icon: Star,
      color: 'blue',
      description: 'Onboarding, premières impressions',
    },
    {
      id: 'post-delivery' as SurveyPhase,
      label: 'Post-Livraison',
      icon: CheckCircle,
      color: 'green',
      description: 'Satisfaction long terme',
    },
    {
      id: 'continuous' as SurveyPhase,
      label: 'Feedback Continu',
      icon: TrendingUp,
      color: 'indigo',
      description: 'Améliorations, idées',
    },
  ];

  const [responses, setResponses] = useState<SurveyResponse[]>([
    {
      id: 'r1',
      surveyId: 's1',
      surveyTitle: 'Validation concept POPY',
      phase: 'study',
      date: '2026-01-10',
      respondent: 'Marie L. (Parent)',
      respondentType: 'parent',
      csat: 5,
      verbatim: 'Le concept est génial ! Mon fils de 7 ans adore les robots et apprendre en s\'amusant. Par contre, je m\'inquiète du prix si c\'est trop élevé.',
      keyTopics: ['Concept séduisant', 'Prix préoccupant', 'Apprentissage ludique'],
      sentiment: 'positive',
      status: 'analyzing',
    },
    {
      id: 'r2',
      surveyId: 's2',
      surveyTitle: 'Test prototype v0.1',
      phase: 'prototype',
      date: '2026-01-12',
      respondent: 'Lucas (9 ans)',
      respondentType: 'child',
      csat: 4,
      ces: 2,
      verbatim: 'C\'est trop cool ! Mais des fois il comprend pas ce que je dis. J\'aime bien les yeux qui changent de couleur.',
      keyTopics: ['Engagement élevé', 'Reconnaissance vocale à améliorer', 'Design apprécié'],
      sentiment: 'positive',
      status: 'action-planned',
      linkedTasks: ['task-ia-speech-1'],
    },
    {
      id: 'r3',
      surveyId: 's2',
      surveyTitle: 'Test prototype v0.1',
      phase: 'prototype',
      date: '2026-01-13',
      respondent: 'Sophie M. (Enseignante)',
      respondentType: 'teacher',
      csat: 5,
      nps: 9,
      verbatim: 'Excellent outil pédagogique ! Les enfants restent concentrés et progressent. Il manque peut-être un tableau de bord pour suivre leur progression.',
      keyTopics: ['Valeur pédagogique confirmée', 'Besoin tableau de bord enseignant'],
      sentiment: 'positive',
      status: 'action-planned',
      linkedTasks: ['task-dashboard-teacher'],
    },
    {
      id: 'r4',
      surveyId: 's3',
      surveyTitle: 'Onboarding J+7',
      phase: 'launch',
      date: '2026-01-15',
      respondent: 'Thomas B. (Parent)',
      respondentType: 'parent',
      csat: 3,
      ces: 5,
      verbatim: 'La configuration initiale était un peu complexe. Une fois lancé, c\'est bien, mais j\'ai dû appeler le support.',
      keyTopics: ['Onboarding complexe', 'Support efficace', 'Produit satisfaisant'],
      sentiment: 'neutral',
      status: 'action-planned',
      linkedTasks: ['task-onboarding-simplification'],
      linkedRisks: ['risk-ux-1'],
    },
    {
      id: 'r5',
      surveyId: 's4',
      surveyTitle: 'Satisfaction M+3',
      phase: 'post-delivery',
      date: '2026-01-16',
      respondent: 'Céline D. (Parent)',
      respondentType: 'parent',
      csat: 5,
      nps: 10,
      verbatim: 'Ma fille l\'utilise tous les jours depuis 3 mois ! Elle a progressé en maths et adore les défis. Meilleur achat de l\'année. Je recommande à tous mes amis.',
      keyTopics: ['Usage quotidien', 'Progrès constatés', 'Ambassadeur enthousiaste'],
      sentiment: 'positive',
      status: 'resolved',
    },
    {
      id: 'r6',
      surveyId: 's5',
      surveyTitle: 'Feedback continu - Idées',
      phase: 'continuous',
      date: '2026-01-17',
      respondent: 'Pierre R. (Parent)',
      respondentType: 'parent',
      csat: 4,
      verbatim: 'Super produit ! Une suggestion : ajouter un mode "contrôle parental" pour limiter le temps d\'utilisation quotidien.',
      keyTopics: ['Contrôle parental demandé', 'Satisfaction globale'],
      sentiment: 'positive',
      status: 'new',
    },
  ]);

  // Calculs KPIs
  const avgCSAT = (
    responses.reduce((sum, r) => sum + r.csat, 0) / responses.length
  ).toFixed(1);
  
  const responsesWithNPS = responses.filter(r => r.nps !== undefined);
  const promoters = responsesWithNPS.filter(r => r.nps! >= 9).length;
  const detractors = responsesWithNPS.filter(r => r.nps! <= 6).length;
  const npsScore = responsesWithNPS.length > 0 
    ? Math.round(((promoters - detractors) / responsesWithNPS.length) * 100)
    : 0;

  const responsesWithCES = responses.filter(r => r.ces !== undefined);
  const avgCES = responsesWithCES.length > 0
    ? (responsesWithCES.reduce((sum, r) => sum + r.ces!, 0) / responsesWithCES.length).toFixed(1)
    : 'N/A';

  const positiveResponses = responses.filter(r => r.sentiment === 'positive').length;
  const satisfactionRate = Math.round((positiveResponses / responses.length) * 100);

  // Insights automatiques
  const insights: FeedbackInsight[] = [
    {
      topic: 'Reconnaissance vocale',
      count: 3,
      sentiment: 'neutral',
      impact: 'high',
      examples: ['Parfois il comprend pas ce que je dis', 'Problème détection voix enfant'],
    },
    {
      topic: 'Valeur pédagogique',
      count: 8,
      sentiment: 'positive',
      impact: 'high',
      examples: ['Excellent outil pédagogique', 'Enfants progressent', 'Concentrés et engagés'],
    },
    {
      topic: 'Contrôle parental',
      count: 5,
      sentiment: 'neutral',
      impact: 'medium',
      examples: ['Mode contrôle parental souhaité', 'Limiter temps d\'utilisation'],
    },
    {
      topic: 'Onboarding complexe',
      count: 4,
      sentiment: 'negative',
      impact: 'medium',
      examples: ['Configuration initiale complexe', 'Documentation pas claire'],
    },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-600" />;
      case 'neutral':
        return <Meh className="w-5 h-5 text-yellow-600" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'analyzing':
        return 'bg-yellow-100 text-yellow-700';
      case 'action-planned':
        return 'bg-orange-100 text-orange-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nouveau';
      case 'analyzing':
        return 'En analyse';
      case 'action-planned':
        return 'Action planifiée';
      case 'resolved':
        return 'Résolu';
      default:
        return status;
    }
  };

  const filteredResponses = responses.filter((r) => {
    const matchesPhase = activePhase === 'all' || r.phase === activePhase;
    const matchesSearch =
      searchQuery === '' ||
      r.verbatim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.respondent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Satisfaction Client & Feedback</h1>
          <p className="text-gray-600 mt-1">
            Écoute continue, analyse automatique et amélioration • ISO §9.1.2
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5" />
            Export satisfaction
          </button>
          <button
            onClick={() => setShowNewSurveyModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouveau sondage
          </button>
        </div>
      </div>

      {/* KPIs Satisfaction */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">CSAT Global</div>
            <Smile className="w-6 h-6" />
          </div>
          <div className="text-4xl font-bold">{avgCSAT}/5</div>
          <div className="text-sm mt-2 opacity-90">
            {satisfactionRate}% satisfaits
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">NPS Score</div>
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div className="text-4xl font-bold">{npsScore}</div>
          <div className="text-sm mt-2 opacity-90">
            {promoters} promoteurs • {detractors} détracteurs
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">CES (Effort)</div>
            <Zap className="w-6 h-6" />
          </div>
          <div className="text-4xl font-bold">{avgCES}/7</div>
          <div className="text-sm mt-2 opacity-90">
            {avgCES !== 'N/A' ? 'Facilité moyenne' : 'Pas de données'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Réponses totales</div>
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="text-4xl font-bold">{responses.length}</div>
          <div className="text-sm mt-2 opacity-90">
            {responses.filter(r => r.status === 'new' || r.status === 'analyzing').length} à traiter
          </div>
        </div>
      </div>

      {/* Évolution satisfaction par phase */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Satisfaction par phase du projet
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {phases.map((phase) => {
            const Icon = phase.icon;
            const phaseResponses = responses.filter((r) => r.phase === phase.id);
            const phaseCSAT = phaseResponses.length > 0
              ? (phaseResponses.reduce((sum, r) => sum + r.csat, 0) / phaseResponses.length).toFixed(1)
              : 'N/A';
            
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  activePhase === phase.id
                    ? `border-${phase.color}-500 bg-${phase.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-${phase.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${phase.color}-600`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{phaseResponses.length}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{phase.label}</h3>
                <p className="text-xs text-gray-600 mb-2">{phase.description}</p>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-700">{phaseCSAT}/5</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Insights automatiques */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            🧠 Insights automatiques (thèmes récurrents)
          </h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Voir analyse complète →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSentimentIcon(insight.sentiment)}
                  <h3 className="font-semibold text-gray-900">{insight.topic}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  Impact {insight.impact === 'high' ? 'élevé' : insight.impact === 'medium' ? 'moyen' : 'faible'}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Mentionné <span className="font-semibold">{insight.count} fois</span>
              </div>
              <div className="space-y-1">
                {insight.examples.slice(0, 2).map((example, i) => (
                  <div key={i} className="text-xs text-gray-600 italic">
                    "...{example}..."
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                Créer action d'amélioration
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans les feedbacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setActivePhase('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activePhase === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes phases ({responses.length})
        </button>
      </div>

      {/* Liste des feedbacks */}
      <div className="space-y-4">
        {filteredResponses.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun feedback trouvé</h3>
            <p className="text-gray-600">Créez un nouveau sondage pour recueillir des retours</p>
          </div>
        ) : (
          filteredResponses.map((response) => {
            const phaseInfo = phases.find(p => p.id === response.phase);
            const PhaseIcon = phaseInfo?.icon || MessageSquare;
            
            return (
              <div
                key={response.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg bg-${phaseInfo?.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <PhaseIcon className={`w-6 h-6 text-${phaseInfo?.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{response.surveyTitle}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(response.status)}`}>
                          {getStatusLabel(response.status)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(response.sentiment)}`}>
                          {response.sentiment === 'positive' ? '😊 Positif' : response.sentiment === 'negative' ? '😞 Négatif' : '😐 Neutre'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">{response.respondent}</span> •{' '}
                        {response.respondentType === 'parent' ? '👨‍👩‍👧 Parent' :
                         response.respondentType === 'child' ? '👦 Enfant' :
                         response.respondentType === 'teacher' ? '👩‍🏫 Enseignant' :
                         response.respondentType === 'expert' ? '🎓 Expert' : 'Autre'} •{' '}
                        {new Date(response.date).toLocaleDateString('fr-FR')}
                      </div>

                      {/* Scores */}
                      <div className="flex gap-4 mb-3">
                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded">
                          <Star className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-900">
                            CSAT: {response.csat}/5
                          </span>
                        </div>
                        {response.ces && (
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded">
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-900">
                              CES: {response.ces}/7
                            </span>
                          </div>
                        )}
                        {response.nps !== undefined && (
                          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded">
                            <ThumbsUp className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-semibold text-purple-900">
                              NPS: {response.nps}/10
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Verbatim */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                        <p className="text-gray-700 italic">"{response.verbatim}"</p>
                      </div>

                      {/* Topics clés */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {response.keyTopics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Liens */}
                      {(response.linkedTasks || response.linkedRisks) && (
                        <div className="flex gap-2">
                          {response.linkedTasks && response.linkedTasks.length > 0 && (
                            <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              <LinkIcon className="w-3 h-3" />
                              {response.linkedTasks.length} tâche(s)
                            </div>
                          )}
                          {response.linkedRisks && response.linkedRisks.length > 0 && (
                            <div className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                              <LinkIcon className="w-3 h-3" />
                              {response.linkedRisks.length} risque(s)
                            </div>
                          )}
                        </div>
                      )}
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

                {/* Actions suggérées */}
                {response.status === 'new' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Actions suggérées</span>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded text-sm hover:bg-green-50 transition-colors">
                          <span className="text-gray-700">→ Créer une tâche d'amélioration</span>
                          <ArrowRight className="w-4 h-4 text-green-600" />
                        </button>
                        {response.sentiment === 'negative' && (
                          <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded text-sm hover:bg-green-50 transition-colors">
                            <span className="text-gray-700">→ Créer un risque qualité</span>
                            <ArrowRight className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Graphique évolution temporelle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Évolution de la satisfaction dans le temps
        </h2>
        <div className="h-64 flex items-end gap-3">
          {[4.2, 4.5, 4.8, 4.6, 4.9, 5.0, 4.8].map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg relative"
                style={{ height: `${(value / 5) * 100}%` }}
              >
                <div className="absolute -top-6 left-0 right-0 text-center text-sm font-bold text-gray-900">
                  {value}
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-2">S{idx + 1}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          Moyenne CSAT par semaine (7 dernières semaines)
        </div>
      </div>

      {/* Automatisations */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900">Automatisations actives</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">📧 Sondages déclenchés</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Fin de phase projet</li>
              <li>✓ Livraison prototype</li>
              <li>✓ J+7 et J+30 post-achat</li>
              <li>✓ Après incident support</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🧠 Analyse intelligente</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Détection thèmes récurrents</li>
              <li>✓ Analyse de sentiment</li>
              <li>✓ Priorisation par impact</li>
              <li>✓ Alertes satisfaction ↓</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🔁 Boucle qualité PDCA</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Feedback → Analyse</li>
              <li>✓ Analyse → Action</li>
              <li>✓ Action → Mesure</li>
              <li>✓ Mesure → Amélioration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
