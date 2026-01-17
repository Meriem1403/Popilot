import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  Users,
  BarChart3,
  Smartphone,
  Globe,
  Award,
  TrendingDown,
  ArrowRight,
  CheckCircle,
  Calendar,
  FileText,
  Link as LinkIcon,
  Plus,
  Download,
  Edit,
  Instagram,
  Facebook,
  Linkedin,
  Video,
  MessageCircle,
} from 'lucide-react';

type MarketingPhase = 'year1' | 'year2' | 'year3' | 'year4-5';

interface RoadmapPhase {
  id: MarketingPhase;
  year: string;
  label: string;
  volume: string;
  unitCost: string;
  sellingPrice?: string;
  margin?: string;
  color: string;
  objectives: string[];
  marketing: string[];
  risks: string[];
  linkedTasks?: string[];
}

export function MarketingStrategyView() {
  const [activePhase, setActivePhase] = useState<MarketingPhase>('year1');

  const roadmapPhases: RoadmapPhase[] = [
    {
      id: 'year1',
      year: 'Année 1',
      label: 'Conception & Prototype',
      volume: '1 unité',
      unitCost: '750–850 €',
      color: 'yellow',
      objectives: [
        'Créer un robot full premium',
        'Valider la faisabilité technique à 90%',
        'Crédibiliser le projet auprès des financeurs',
      ],
      marketing: [
        'Storytelling R&D authentique',
        'Communication "coulisses" du développement',
        'Preuves techniques et démonstrations',
        'Création des premiers contenus vidéo',
      ],
      risks: ['Dépassement budget prototype', 'Complexité technique sous-estimée'],
      linkedTasks: ['task-proto-v1', 'task-tests-initial'],
    },
    {
      id: 'year2',
      year: 'Année 2',
      label: 'Pré-série artisanale',
      volume: '5–10 unités',
      unitCost: '550–600 €',
      color: 'orange',
      objectives: [
        'Recueillir retours parents et enfants',
        'Créer des démonstrateurs fonctionnels',
        'Obtenir premières certifications (CE)',
      ],
      marketing: [
        'Programme ambassadeurs (early adopters)',
        'Tests terrain filmés et documentés',
        'Communication pédagogique (bénéfices éducatifs)',
        'Partenariats écoles pilotes',
      ],
      risks: ['Retours utilisateurs négatifs', 'Délais certification'],
      linkedTasks: ['task-pre-serie', 'task-certification'],
    },
    {
      id: 'year3',
      year: 'Année 3',
      label: 'Pré-série semi-industrielle',
      volume: '200–5 000 unités',
      unitCost: '240–290 €',
      sellingPrice: '699–899 €',
      margin: '+450–560 €',
      color: 'blue',
      objectives: [
        'Industrialiser la production',
        'Atteindre rentabilité opérationnelle',
        'Établir présence marché éducatif',
      ],
      marketing: [
        'Partenariats écoles et institutions',
        'Presse spécialisée (EdTech, robotique)',
        'Campagne crowdfunding (validation marché)',
        'Salons éducatifs et tech',
      ],
      risks: ['Qualité industrialisation', 'Concurrence émergente'],
      linkedTasks: ['task-industrialisation', 'task-crowdfunding'],
    },
    {
      id: 'year4-5',
      year: 'Années 4-5',
      label: 'Grande série & Internationalisation',
      volume: '5 000 → 50 000 unités',
      unitCost: '150–200 €',
      sellingPrice: '499–699 €',
      margin: '+350–500 €',
      color: 'green',
      objectives: [
        'Économies d\'échelle maximales',
        'Optimisation complète supply chain',
        'Expansion internationale',
        'Marque reconnue dans l\'éducation',
      ],
      marketing: [
        'Image de marque établie',
        'Communication institutionnelle',
        'Expansion européenne puis mondiale',
        'Partenariats majeurs (Microsoft Education, Google for Education)',
      ],
      risks: ['Saturation marché local', 'Barrières réglementaires export'],
    },
  ];

  const strategies = [
    {
      id: 'entry',
      title: 'Stratégie d\'entrée',
      subtitle: 'High-End Entry Strategy',
      icon: Award,
      color: 'purple',
      principle: 'Entrer par le premium pour rendre l\'excellence accessible',
      description:
        'Lancement avec un prototype premium techniquement avancé pour démontrer la faisabilité et crédibiliser le projet',
      advantages: [
        'Forte différenciation vs concurrence',
        'Attractivité pour financeurs et incubateurs',
        'Réduction du risque technique long terme',
        'Base technologique solide pour industrialisation',
      ],
      isoLink: '§5.1.2 — Orientation client',
    },
    {
      id: 'pricing',
      title: 'Stratégie de prix',
      subtitle: 'Skimming Pricing Strategy',
      icon: DollarSign,
      color: 'green',
      principle: 'Le prix suit la maturité industrielle, pas l\'inverse',
      description:
        'Prix initial élevé justifié par R&D et faible volume, puis baisse progressive grâce aux économies d\'échelle',
      advantages: [
        'Financement de la R&D par early adopters',
        'Valorisation de l\'innovation',
        'Baisse progressive = accessibilité croissante',
        'Marges élevées pour réinvestissement',
      ],
      isoLink: '§7.1.3 — Ressources financières',
    },
    {
      id: 'manufacturing',
      title: 'Stratégie de coûts',
      subtitle: 'Lean Manufacturing & Automation',
      icon: Zap,
      color: 'orange',
      principle: 'Moins de variabilité = plus de qualité = moins de SAV',
      description:
        'Standardisation des composants, automatisation des process, réduction continue des coûts unitaires',
      advantages: [
        'Réduction des coûts de 70% (850€ → 250€)',
        'Amélioration continue de la qualité',
        'Fiabilité accrue du produit',
        'Scalabilité industrielle',
      ],
      isoLink: '§8.5 — Production et service',
    },
    {
      id: 'growth',
      title: 'Stratégie de croissance',
      subtitle: 'Economies of Scale',
      icon: TrendingUp,
      color: 'blue',
      principle: 'Plus on produit, moins ça coûte, mieux c\'est fabriqué',
      description:
        'Chaque palier de volume (x10) débloque des optimisations industrielles significatives',
      advantages: [
        'x10 unités → négociation fournisseurs',
        'x100 unités → injection plastique rentable',
        'x1000 unités → PCB custom + tests auto',
        'x10000 unités → optimisation logistique complète',
      ],
      isoLink: '§7.1 — Ressources',
    },
    {
      id: 'learning',
      title: 'Stratégie d\'apprentissage',
      subtitle: 'Learning Curve Effect',
      icon: BarChart3,
      color: 'indigo',
      principle: 'Chaque robot produit améliore le suivant',
      description:
        'Capitalisation des apprentissages à chaque itération pour optimiser design, process et coûts',
      advantages: [
        'Réduction temps d\'assemblage (-40% en 1 an)',
        'Simplification architecture produit',
        'Suppression composants redondants',
        'Optimisation IA / énergie / mécanique',
      ],
      isoLink: '§7.1.6 — Connaissances organisationnelles',
    },
  ];

  const digitalChannels = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'pink',
      target: 'Parents jeunes, éducateurs',
      content: 'Coulisses, design, tests enfants, valeurs',
      frequency: '3-4 posts/semaine',
      priority: 'high',
    },
    {
      name: 'TikTok',
      icon: Video,
      color: 'purple',
      target: 'Grand public, viral',
      content: 'Démonstrations, réactions enfants, pédagogie ludique',
      frequency: '5-7 vidéos/semaine',
      priority: 'high',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'blue',
      target: 'Parents, enseignants, institutions',
      content: 'Articles de fond, témoignages, événements',
      frequency: '2-3 posts/semaine',
      priority: 'medium',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'indigo',
      target: 'Incubateurs, financeurs, B2B',
      content: 'Actualités projet, levées de fonds, partenariats',
      frequency: '1-2 posts/semaine',
      priority: 'low',
    },
  ];

  const kpis = [
    {
      label: 'Coût unitaire cible (An 3)',
      value: '240–290 €',
      trend: 'down',
      color: 'green',
      evolution: '-65% vs An 1',
    },
    {
      label: 'Prix de vente cible (An 3)',
      value: '699–899 €',
      trend: 'neutral',
      color: 'blue',
      evolution: 'Positionnement premium',
    },
    {
      label: 'Marge brute cible (An 3)',
      value: '+450–560 €',
      trend: 'up',
      color: 'purple',
      evolution: '+60-65%',
    },
    {
      label: 'Volume cible (An 3)',
      value: '200–5 000 unités',
      trend: 'up',
      color: 'orange',
      evolution: 'x20-500 vs An 2',
    },
  ];

  const currentPhase = roadmapPhases.find((p) => p.id === activePhase);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stratégie Marketing & Communication</h1>
          <p className="text-gray-600 mt-1">
            Positionnement premium, pricing skimming, industrialisation progressive • Projet POPY
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5" />
            Export stratégie
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-5 h-5" />
            Ajouter action
          </button>
        </div>
      </div>

      {/* KPIs Marketing */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-${kpi.color}-500 to-${kpi.color}-600 rounded-xl p-6 text-white`}
          >
            <div className="text-sm font-medium mb-2">{kpi.label}</div>
            <div className="text-3xl font-bold mb-2">{kpi.value}</div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              {kpi.trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {kpi.trend === 'down' && <TrendingDown className="w-4 h-4" />}
              <span>{kpi.evolution}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Positionnement stratégique */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Positionnement stratégique POPY</h2>
        </div>
        <p className="text-xl mb-6 font-medium">
          "Entrer par le premium pour rendre l'excellence accessible"
        </p>
        <div className="grid grid-cols-5 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">🔝</div>
            <div className="text-sm font-medium">Premium au départ</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">⚙️</div>
            <div className="text-sm font-medium">Industriel dans l'ADN</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">📉</div>
            <div className="text-sm font-medium">Coûts décroissants</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">📈</div>
            <div className="text-sm font-medium">Qualité croissante</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">❤️</div>
            <div className="text-sm font-medium">Humain & pédagogique</div>
          </div>
        </div>
      </div>

      {/* 5 Stratégies clés */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">5 Piliers stratégiques</h2>
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          return (
            <div key={strategy.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-${strategy.color}-100 flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-7 h-7 text-${strategy.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{strategy.title}</h3>
                      <p className="text-sm text-gray-600">{strategy.subtitle}</p>
                    </div>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                      {strategy.isoLink}
                    </span>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-900 font-medium italic">"{strategy.principle}"</p>
                  </div>

                  <p className="text-gray-700 mb-4">{strategy.description}</p>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Avantages clés</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {strategy.advantages.map((advantage, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Roadmap 5 ans */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Feuille de route Marketing & Produit (5 ans)
        </h2>

        {/* Timeline navigation */}
        <div className="flex gap-3 mb-6">
          {roadmapPhases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                activePhase === phase.id
                  ? `border-${phase.color}-500 bg-${phase.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">{phase.year}</div>
              <div className="text-sm text-gray-600">{phase.label}</div>
              <div className="text-xs text-gray-500 mt-1">{phase.volume}</div>
            </button>
          ))}
        </div>

        {/* Phase détaillée */}
        {currentPhase && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Volume de production</div>
                <div className="text-xl font-bold text-gray-900">{currentPhase.volume}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Coût unitaire</div>
                <div className="text-xl font-bold text-gray-900">{currentPhase.unitCost}</div>
              </div>
              {currentPhase.sellingPrice && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Prix de vente</div>
                  <div className="text-xl font-bold text-gray-900">
                    {currentPhase.sellingPrice}
                  </div>
                </div>
              )}
              {currentPhase.margin && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Marge brute</div>
                  <div className="text-xl font-bold text-green-600">{currentPhase.margin}</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Objectifs
                </h4>
                <ul className="space-y-2">
                  {currentPhase.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Actions Marketing
                </h4>
                <ul className="space-y-2">
                  {currentPhase.marketing.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Risques associés
                </h4>
                <ul className="space-y-2">
                  {currentPhase.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-orange-600" />
                      </div>
                      <span className="text-sm text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {currentPhase.linkedTasks && currentPhase.linkedTasks.length > 0 && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-900 mb-2">
                  <LinkIcon className="w-4 h-4" />
                  Tâches liées dans POPILOT
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPhase.linkedTasks.map((taskId) => (
                    <span
                      key={taskId}
                      className="px-3 py-1 bg-white text-indigo-700 rounded text-xs font-medium"
                    >
                      {taskId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Communication digitale */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Stratégie Communication Digitale</h2>
            <p className="text-gray-600 mt-1">
              Créer une communauté engagée et faire vivre le projet publiquement
            </p>
          </div>
          <Smartphone className="w-8 h-8 text-purple-600" />
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <p className="text-purple-900 font-medium">
            📣 Communication authentique, pas publicitaire — Montrer les coulisses, les défis, les
            apprentissages
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {digitalChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.name}
                className={`border-2 rounded-xl p-5 ${
                  channel.priority === 'high'
                    ? `border-${channel.color}-400 bg-${channel.color}-50`
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${channel.color}-100 flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 text-${channel.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        channel.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : channel.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {channel.priority === 'high'
                        ? 'Prioritaire'
                        : channel.priority === 'medium'
                        ? 'Moyen'
                        : 'Optionnel'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Cible :</span>{' '}
                    <span className="text-gray-600">{channel.target}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Contenu :</span>{' '}
                    <span className="text-gray-600">{channel.content}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fréquence :</span>{' '}
                    <span className="text-gray-600">{channel.frequency}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Contenus créés</div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs mt-1 opacity-90">Ce mois-ci</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Engagement</div>
            <div className="text-2xl font-bold">245</div>
            <div className="text-xs mt-1 opacity-90">Interactions/post</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Abonnés</div>
            <div className="text-2xl font-bold">1 234</div>
            <div className="text-xs mt-1 opacity-90">+12% ce mois</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Portée</div>
            <div className="text-2xl font-bold">8 456</div>
            <div className="text-xs mt-1 opacity-90">Personnes touchées</div>
          </div>
        </div>
      </div>

      {/* Graphique évolution coûts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Évolution Coût unitaire vs Prix de vente
        </h2>
        <div className="h-64 flex items-end justify-between gap-2">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg relative" style={{ height: '85%' }}>
              <div className="absolute -top-6 left-0 right-0 text-center font-bold text-gray-900">
                850 €
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2">An 1</div>
            <div className="text-xs text-gray-500">1 unité</div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg relative" style={{ height: '65%' }}>
              <div className="absolute -top-6 left-0 right-0 text-center font-bold text-gray-900">
                575 €
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2">An 2</div>
            <div className="text-xs text-gray-500">5-10 unités</div>
          </div>

          <div className="flex-1 flex flex-col items-center relative">
            <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg relative" style={{ height: '30%' }}>
              <div className="absolute -top-6 left-0 right-0 text-center font-bold text-gray-900">
                265 €
              </div>
            </div>
            <div className="w-full border-2 border-green-500 border-dashed rounded-t-lg absolute bottom-16" style={{ height: '75%' }}>
              <div className="absolute -top-8 left-0 right-0 text-center font-bold text-green-600">
                799 €
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2">An 3</div>
            <div className="text-xs text-gray-500">200-5K unités</div>
          </div>

          <div className="flex-1 flex flex-col items-center relative">
            <div className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg relative" style={{ height: '18%' }}>
              <div className="absolute -top-6 left-0 right-0 text-center font-bold text-gray-900">
                175 €
              </div>
            </div>
            <div className="w-full border-2 border-green-500 border-dashed rounded-t-lg absolute bottom-16" style={{ height: '60%' }}>
              <div className="absolute -top-8 left-0 right-0 text-center font-bold text-green-600">
                599 €
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2">An 4-5</div>
            <div className="text-xs text-gray-500">5-50K unités</div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded" />
            <span className="text-sm text-gray-600">Coût unitaire</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500 border-dashed rounded" />
            <span className="text-sm text-gray-600">Prix de vente</span>
          </div>
        </div>
      </div>

      {/* Connexions avec autres modules */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <LinkIcon className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900">Connexions avec POPILOT</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-gray-600 mb-1">Budget & BOM</div>
            <div className="text-2xl font-bold text-indigo-600">12</div>
            <div className="text-xs text-gray-500 mt-1">Composants trackés</div>
          </button>
          <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-gray-600 mb-1">Risques</div>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-xs text-gray-500 mt-1">Risques identifiés</div>
          </button>
          <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-gray-600 mb-1">Tâches</div>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-xs text-gray-500 mt-1">Actions marketing</div>
          </button>
          <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-gray-600 mb-1">Documentation</div>
            <div className="text-2xl font-bold text-purple-600">6</div>
            <div className="text-xs text-gray-500 mt-1">Docs stratégiques</div>
          </button>
        </div>
      </div>
    </div>
  );
}
