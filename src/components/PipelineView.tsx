import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  Target,
  Package,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { PipelineStage } from '../types/planning';

export function PipelineView() {
  // Pipeline du projet POPY
  const popyPipeline: PipelineStage[] = [
    {
      id: 'stage-1',
      name: 'Cadrage',
      order: 1,
      status: 'completed',
      progress: 100,
      objectives: [
        'Définir le périmètre du projet',
        'Identifier les parties prenantes',
        'Établir le budget prévisionnel',
      ],
      deliverables: [
        'Charte projet validée',
        'Budget approuvé',
        'Équipe constituée',
      ],
      exitCriteria: [
        'Comité de pilotage approuve le cadrage',
        'Budget validé par la direction',
        'Équipe affectée au projet',
      ],
      tasks: ['task-1', 'task-2', 'task-3'],
      startDate: '2025-10-01',
      endDate: '2025-10-31',
      estimatedDuration: 30,
    },
    {
      id: 'stage-2',
      name: 'Conception',
      order: 2,
      status: 'in-progress',
      progress: 65,
      objectives: [
        'Concevoir l\'architecture hardware',
        'Développer l\'IA de reconnaissance émotionnelle',
        'Designer l\'interface utilisateur',
      ],
      deliverables: [
        'Schémas électroniques validés',
        'Modèle IA entraîné (v1)',
        'Maquettes UX/UI validées',
      ],
      exitCriteria: [
        'Tous les schémas approuvés par l\'équipe technique',
        'IA atteint 80% de précision minimum',
        'Tests utilisateurs positifs sur les maquettes',
      ],
      tasks: ['task-4', 'task-5', 'task-6', 'task-7'],
      startDate: '2025-11-01',
      endDate: '2026-02-28',
      estimatedDuration: 120,
    },
    {
      id: 'stage-3',
      name: 'Développement',
      order: 3,
      status: 'in-progress',
      progress: 40,
      objectives: [
        'Assembler les prototypes hardware',
        'Intégrer le firmware embarqué',
        'Développer l\'application mobile',
      ],
      deliverables: [
        '3 prototypes fonctionnels',
        'Firmware V1 opérationnel',
        'Application mobile beta',
      ],
      exitCriteria: [
        'Prototypes passent les tests fonctionnels de base',
        'Firmware stable sans crash critique',
        'Application mobile installable et fonctionnelle',
      ],
      tasks: ['task-8', 'task-9', 'task-10'],
      startDate: '2026-01-15',
      endDate: '2026-04-15',
      estimatedDuration: 90,
    },
    {
      id: 'stage-4',
      name: 'Tests & Validation',
      order: 4,
      status: 'not-started',
      progress: 0,
      objectives: [
        'Effectuer les tests fonctionnels complets',
        'Valider la conformité sécurité EN71',
        'Réaliser les tests utilisateurs avec enfants',
      ],
      deliverables: [
        'Rapport de tests fonctionnels',
        'Certificat de conformité EN71',
        'Rapport tests utilisateurs (20 enfants)',
      ],
      exitCriteria: [
        '95% des tests fonctionnels réussis',
        'Conformité EN71 obtenue',
        'Satisfaction utilisateurs > 4/5',
      ],
      tasks: [],
      startDate: '2026-04-16',
      endDate: '2026-06-15',
      estimatedDuration: 60,
    },
    {
      id: 'stage-5',
      name: 'Validation finale',
      order: 5,
      status: 'not-started',
      progress: 0,
      objectives: [
        'Corriger les défauts identifiés',
        'Finaliser la documentation',
        'Préparer la livraison',
      ],
      deliverables: [
        'Prototype final validé',
        'Documentation technique complète',
        'Présentation finale au comité',
      ],
      exitCriteria: [
        'Tous les défauts critiques corrigés',
        'Documentation qualité complète et validée',
        'Comité de pilotage valide la livraison',
      ],
      tasks: [],
      startDate: '2026-06-16',
      endDate: '2026-06-30',
      estimatedDuration: 14,
    },
  ];

  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'blocked':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'in-progress':
        return 'border-blue-500 bg-blue-50';
      case 'blocked':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const overallProgress = Math.round(
    popyPipeline.reduce((acc, stage) => acc + stage.progress, 0) / popyPipeline.length
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-8 h-8 text-purple-600" />
          Pipeline du Projet POPY
        </h1>
        <p className="text-gray-600 mt-1">
          Vision macro : grandes étapes, objectifs, livrables et critères de sortie
        </p>
      </div>

      {/* Progression globale */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Avancement global du projet</h2>
            <p className="text-purple-100 mt-1">
              {popyPipeline.filter((s) => s.status === 'completed').length} / {popyPipeline.length}{' '}
              étapes complétées
            </p>
          </div>
          <div className="text-5xl font-bold">{overallProgress}%</div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-4">
          <div
            className="bg-white h-4 rounded-full transition-all"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Pipeline visuel */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Flux du projet</h2>
        
        <div className="relative">
          {/* Ligne de connexion */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 z-0"></div>
          
          {/* Étapes */}
          <div className="relative z-10 flex justify-between">
            {popyPipeline.map((stage, idx) => (
              <div key={stage.id} className="flex flex-col items-center" style={{ width: '18%' }}>
                {/* Icône de l'étape */}
                <button
                  onClick={() => setSelectedStage(stage)}
                  className={`w-24 h-24 rounded-full border-4 ${getStatusColor(stage.status)} flex items-center justify-center mb-3 hover:scale-110 transition-transform cursor-pointer shadow-lg`}
                >
                  {getStatusIcon(stage.status)}
                </button>
                
                {/* Nom de l'étape */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 mb-1">{stage.name}</h3>
                  <div className="text-xs text-gray-600 mb-2">
                    {stage.startDate && stage.endDate && (
                      <>
                        {new Date(stage.startDate).toLocaleDateString('fr-FR', { month: 'short' })} -{' '}
                        {new Date(stage.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                      </>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-blue-600">{stage.progress}%</div>
                </div>

                {/* Flèche */}
                {idx < popyPipeline.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 absolute" style={{ left: '50%', transform: 'translateX(50px) translateY(-36px)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Détails de l'étape sélectionnée */}
      {selectedStage && (
        <div className="bg-white rounded-xl border-2 border-blue-300 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedStage.name}</h2>
                <p className="text-blue-100 mt-1">
                  Étape {selectedStage.order} / {popyPipeline.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{selectedStage.progress}%</div>
                <div className="text-blue-100">Progression</div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Objectifs */}
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-blue-600" />
                Objectifs
              </h3>
              <ul className="space-y-2">
                {selectedStage.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Livrables */}
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-purple-600" />
                Livrables attendus
              </h3>
              <ul className="space-y-2">
                {selectedStage.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critères de sortie (Definition of Done) */}
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Critères de sortie (Definition of Done)
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 mb-3">
                  L'étape sera automatiquement marquée comme "Complétée" quand tous ces critères
                  seront remplis :
                </p>
                <ul className="space-y-2">
                  {selectedStage.exitCriteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Informations complémentaires */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Durée estimée</div>
                <div className="text-xl font-bold text-gray-900">
                  {selectedStage.estimatedDuration} jours
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Tâches associées</div>
                <div className="text-xl font-bold text-gray-900">{selectedStage.tasks.length}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Statut</div>
                <div className="text-sm font-bold">
                  {selectedStage.status === 'completed'
                    ? '✓ Complété'
                    : selectedStage.status === 'in-progress'
                    ? '🔄 En cours'
                    : selectedStage.status === 'blocked'
                    ? '🚫 Bloqué'
                    : '⏳ À venir'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info automatisation */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-600 text-white rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 text-lg mb-2">
              🎯 Progression automatique du pipeline
            </h3>
            <p className="text-sm text-green-800 mb-3">
              POPILOT surveille en temps réel l'avancement de chaque étape. Quand tous les critères
              de sortie sont remplis, l'étape passe automatiquement à "Complétée" et le projet
              avance visuellement dans le pipeline.
            </p>
            <ul className="text-sm text-green-800 space-y-1">
              <li>✓ Les tâches complétées mettent à jour la progression de l'étape</li>
              <li>✓ Les livrables validés sont comptabilisés automatiquement</li>
              <li>
                ✓ Alerte si une étape ne progresse plus depuis X jours (risque de blocage)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alertes si des étapes sont bloquées */}
      {popyPipeline.some((s) => s.status === 'blocked') && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 text-lg mb-2">⚠️ Étapes bloquées</h3>
              <p className="text-sm text-red-800">
                Certaines étapes sont bloquées et nécessitent une intervention immédiate :
              </p>
              <ul className="mt-2 space-y-1">
                {popyPipeline
                  .filter((s) => s.status === 'blocked')
                  .map((stage) => (
                    <li key={stage.id} className="text-sm text-red-800">
                      • <strong>{stage.name}</strong> - Action requise
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
