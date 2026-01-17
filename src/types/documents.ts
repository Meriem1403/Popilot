// Types pour la documentation ISO 9001 et études structurantes

export interface ISODocument {
  id: string;
  title: string;
  type: ISODocumentType;
  category: DocumentCategory;
  status: 'draft' | 'validated' | 'obsolete';
  responsible: string;
  responsibleName?: string;
  version: string;
  validUntil?: string;
  description?: string;
  content?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
  validatedBy?: string;
  validatedAt?: string;
  history: DocumentVersion[];
  linkedTo?: {
    projectId?: string;
    processId?: string;
    meetingId?: string;
    taskIds?: string[];
    decisionIds?: string[];
    riskIds?: string[];
    stageId?: string;
    objectiveIds?: string[];
  };
  tags?: string[];
  isCritical?: boolean; // Bloque le passage à l'étape suivante si absent
}

export type DocumentCategory =
  | 'feasibility'
  | 'conception'
  | 'financial'
  | 'marketing'
  | 'hr'
  | 'quality'
  | 'pilotage';

export type ISODocumentType =
  // Qualité & Pilotage
  | 'politique-qualite'
  | 'objectifs-qualite'
  | 'plan-projet'
  | 'compte-rendu'
  | 'registre-risques'
  | 'plan-actions'
  | 'procedure'
  | 'mode-operatoire'
  | 'engagement-signe'
  | 'preuve'
  | 'specification'
  | 'rapport-test'
  | 'decision-structurante'
  | 'reporting'
  // Études & Faisabilité
  | 'etude-faisabilite-technique'
  | 'etude-faisabilite-financiere'
  | 'etude-faisabilite-organisationnelle'
  | 'etude-faisabilite-reglementaire'
  | 'etude-marche'
  | 'analyse-besoins'
  | 'benchmark'
  // Conception
  | 'conception-fonctionnelle'
  | 'conception-technique'
  | 'architecture'
  | 'cas-usage'
  | 'criteres-acceptation'
  // Financier
  | 'etude-financiere-previsionnelle'
  | 'budget'
  | 'suivi-financier'
  | 'analyse-ecarts'
  // Marketing & Communication
  | 'strategie-marketing'
  | 'plan-communication'
  | 'positionnement'
  | 'proposition-valeur'
  // RH
  | 'plan-recrutement'
  | 'gestion-competences'
  | 'plan-formation';

export interface DocumentVersion {
  version: string;
  date: string;
  author: string;
  changes: string;
}

export interface ISOCompliance {
  category: string;
  requirement: string;
  status: 'compliant' | 'incomplete' | 'missing';
  documents: string[]; // IDs des documents associés
  lastCheck: string;
  notes?: string;
  isCritical?: boolean;
}

// Checklist de conformité ISO 9001
export const ISO_REQUIREMENTS: ISOCompliance[] = [
  {
    category: '§4.3 - Périmètre',
    requirement: 'Documentation du périmètre du SMQ',
    status: 'compliant',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: true,
  },
  {
    category: '§5.2 - Politique qualité',
    requirement: 'Politique qualité établie et communiquée',
    status: 'compliant',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: true,
  },
  {
    category: '§6.2 - Objectifs qualité',
    requirement: 'Objectifs qualité définis et mesurables',
    status: 'compliant',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: true,
  },
  {
    category: '§6.1 - Risques',
    requirement: 'Registre des risques et opportunités',
    status: 'incomplete',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: true,
  },
  {
    category: '§7.1 - Ressources',
    requirement: 'Maîtrise des ressources (budget, compétences)',
    status: 'incomplete',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: false,
  },
  {
    category: '§7.2 - Compétences',
    requirement: 'Gestion des compétences et formations',
    status: 'incomplete',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: false,
  },
  {
    category: '§7.5 - Informations documentées',
    requirement: 'Procédures et modes opératoires documentés',
    status: 'incomplete',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: false,
  },
  {
    category: '§8 - Réalisation',
    requirement: 'Plan projet et jalons documentés',
    status: 'compliant',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: true,
  },
  {
    category: '§9.3 - Revue de direction',
    requirement: 'Comptes rendus des revues de direction',
    status: 'compliant',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: true,
  },
  {
    category: '§10 - Amélioration',
    requirement: 'Plan d\'actions correctives et préventives',
    status: 'incomplete',
    documents: [],
    lastCheck: new Date().toISOString(),
    isCritical: false,
  },
];

export function getDocumentCategoryLabel(category: DocumentCategory): string {
  const labels: Record<DocumentCategory, string> = {
    feasibility: '📊 Études & Faisabilité',
    conception: '🧠 Conception',
    financial: '💰 Financier',
    marketing: '📣 Marketing & Communication',
    hr: '👥 Ressources Humaines',
    quality: '✅ Qualité',
    pilotage: '🎯 Pilotage',
  };
  return labels[category];
}

export function getDocumentTypeLabel(type: ISODocumentType): string {
  const labels: Record<ISODocumentType, string> = {
    // Qualité & Pilotage
    'politique-qualite': 'Politique qualité',
    'objectifs-qualite': 'Objectifs qualité',
    'plan-projet': 'Plan projet',
    'compte-rendu': 'Compte rendu',
    'registre-risques': 'Registre des risques',
    'plan-actions': 'Plan d\'actions',
    'procedure': 'Procédure',
    'mode-operatoire': 'Mode opératoire',
    'engagement-signe': 'Engagement signé',
    'preuve': 'Preuve / Validation',
    'specification': 'Spécification technique',
    'rapport-test': 'Rapport de test',
    'decision-structurante': 'Décision structurante',
    'reporting': 'Reporting / Indicateurs',
    // Études & Faisabilité
    'etude-faisabilite-technique': 'Étude de faisabilité technique',
    'etude-faisabilite-financiere': 'Étude de faisabilité financière',
    'etude-faisabilite-organisationnelle': 'Étude de faisabilité organisationnelle',
    'etude-faisabilite-reglementaire': 'Étude de faisabilité réglementaire',
    'etude-marche': 'Étude de marché',
    'analyse-besoins': 'Analyse des besoins',
    'benchmark': 'Benchmark concurrence',
    // Conception
    'conception-fonctionnelle': 'Conception fonctionnelle',
    'conception-technique': 'Conception technique',
    'architecture': 'Architecture technique',
    'cas-usage': 'Cas d\'usage',
    'criteres-acceptation': 'Critères d\'acceptation',
    // Financier
    'etude-financiere-previsionnelle': 'Étude financière prévisionnelle',
    'budget': 'Budget',
    'suivi-financier': 'Suivi financier',
    'analyse-ecarts': 'Analyse des écarts',
    // Marketing & Communication
    'strategie-marketing': 'Stratégie marketing',
    'plan-communication': 'Plan de communication',
    'positionnement': 'Positionnement',
    'proposition-valeur': 'Proposition de valeur',
    // RH
    'plan-recrutement': 'Plan de recrutement',
    'gestion-competences': 'Gestion des compétences',
    'plan-formation': 'Plan de formation',
  };
  return labels[type];
}

export function getDocumentTypeColor(type: ISODocumentType): string {
  const colors: Record<ISODocumentType, string> = {
    // Qualité & Pilotage
    'politique-qualite': 'bg-purple-100 text-purple-800',
    'objectifs-qualite': 'bg-blue-100 text-blue-800',
    'plan-projet': 'bg-green-100 text-green-800',
    'compte-rendu': 'bg-gray-100 text-gray-800',
    'registre-risques': 'bg-red-100 text-red-800',
    'plan-actions': 'bg-orange-100 text-orange-800',
    'procedure': 'bg-indigo-100 text-indigo-800',
    'mode-operatoire': 'bg-cyan-100 text-cyan-800',
    'engagement-signe': 'bg-pink-100 text-pink-800',
    'preuve': 'bg-yellow-100 text-yellow-800',
    'specification': 'bg-teal-100 text-teal-800',
    'rapport-test': 'bg-lime-100 text-lime-800',
    'decision-structurante': 'bg-purple-100 text-purple-800',
    'reporting': 'bg-blue-100 text-blue-800',
    // Études & Faisabilité
    'etude-faisabilite-technique': 'bg-indigo-100 text-indigo-800',
    'etude-faisabilite-financiere': 'bg-green-100 text-green-800',
    'etude-faisabilite-organisationnelle': 'bg-blue-100 text-blue-800',
    'etude-faisabilite-reglementaire': 'bg-red-100 text-red-800',
    'etude-marche': 'bg-purple-100 text-purple-800',
    'analyse-besoins': 'bg-cyan-100 text-cyan-800',
    'benchmark': 'bg-teal-100 text-teal-800',
    // Conception
    'conception-fonctionnelle': 'bg-blue-100 text-blue-800',
    'conception-technique': 'bg-indigo-100 text-indigo-800',
    'architecture': 'bg-purple-100 text-purple-800',
    'cas-usage': 'bg-cyan-100 text-cyan-800',
    'criteres-acceptation': 'bg-green-100 text-green-800',
    // Financier
    'etude-financiere-previsionnelle': 'bg-emerald-100 text-emerald-800',
    'budget': 'bg-green-100 text-green-800',
    'suivi-financier': 'bg-lime-100 text-lime-800',
    'analyse-ecarts': 'bg-yellow-100 text-yellow-800',
    // Marketing & Communication
    'strategie-marketing': 'bg-pink-100 text-pink-800',
    'plan-communication': 'bg-rose-100 text-rose-800',
    'positionnement': 'bg-fuchsia-100 text-fuchsia-800',
    'proposition-valeur': 'bg-purple-100 text-purple-800',
    // RH
    'plan-recrutement': 'bg-amber-100 text-amber-800',
    'gestion-competences': 'bg-orange-100 text-orange-800',
    'plan-formation': 'bg-yellow-100 text-yellow-800',
  };
  return colors[type];
}

// Checker si un document est critique pour le passage à l'étape suivante
export function isCriticalDocumentMissing(
  documents: ISODocument[],
  stageId: string
): { missing: boolean; missingDocs: string[] } {
  // Logique de vérification des documents critiques par étape
  const criticalDocsByStage: Record<string, ISODocumentType[]> = {
    'stage-1': ['plan-projet', 'etude-faisabilite-technique', 'budget'],
    'stage-2': ['conception-fonctionnelle', 'conception-technique', 'architecture'],
    'stage-3': ['specification', 'plan-actions'],
    'stage-4': ['rapport-test', 'preuve'],
    'stage-5': ['politique-qualite', 'objectifs-qualite'],
  };

  const requiredDocs = criticalDocsByStage[stageId] || [];
  const existingTypes = documents
    .filter((d) => d.status === 'validated')
    .map((d) => d.type);

  const missingDocs = requiredDocs.filter((type) => !existingTypes.includes(type));

  return {
    missing: missingDocs.length > 0,
    missingDocs: missingDocs.map((type) => getDocumentTypeLabel(type)),
  };
}