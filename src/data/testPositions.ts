// Données de test pour les postes du projet POPY

import { Position, TeamMember, PositionCategory } from '../types/positions';

export const TEST_POSITION_CATEGORIES: PositionCategory[] = [
  {
    id: 'cat-1',
    name: 'Direction & Coordination',
    description: 'Postes de direction, coordination et pilotage du projet',
    color: 'indigo',
    createdAt: '2025-01-01',
  },
  {
    id: 'cat-2',
    name: 'Hardware & IoT',
    description: 'Postes liés au développement hardware, électronique et IoT',
    color: 'blue',
    createdAt: '2025-01-01',
  },
  {
    id: 'cat-3',
    name: 'Intelligence Artificielle',
    description: 'Postes spécialisés en IA, machine learning et vision par ordinateur',
    color: 'purple',
    createdAt: '2025-01-01',
  },
  {
    id: 'cat-4',
    name: 'Cybersécurité & protection enfant',
    description: 'Postes dédiés à la sécurité et à la protection des données enfants',
    color: 'red',
    createdAt: '2025-01-01',
  },
  {
    id: 'cat-5',
    name: 'Cloud, Backend & Big Data',
    description: 'Postes liés au développement backend, cloud et traitement de données',
    color: 'green',
    createdAt: '2025-01-01',
  },
];

export const TEST_POSITIONS: Position[] = [
  // Direction & Coordination
  {
    id: 'position-1',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Chef de projet / Product Owner (PO)',
    category: 'Direction & Coordination',
    responsibilities: [
      'Vision du produit',
      'Gestion du planning (2 ans)',
      'Coordination des équipes',
      'Validation technique + UX'
    ],
    requiredSkills: [
      'Gestion projet agile',
      'Documentation',
      'Communication / Leadership',
      'Connaissance hardware + IA'
    ],
    assignedMembers: ['member-fabio', 'member-meriem'],
    status: 'filled',
    createdAt: '2025-01-01',
  },
  {
    id: 'position-2',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Responsable Qualité & Processus (QA / QMS)',
    category: 'Direction & Coordination',
    responsibilities: [
      'Standardisation du code',
      'Standardisation de l\'assemblage robot',
      'Processus sécurité enfant',
      'Tests, validation, certifications'
    ],
    requiredSkills: [
      'Gestion qualité (ISO-like)',
      'Tests automatisés',
      'Documentation technique',
      'Sécurité / Conformité RGPD'
    ],
    assignedMembers: [],
    status: 'open',
    createdAt: '2025-01-01',
  },
  // Hardware & IoT
  {
    id: 'position-3',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur IoT / Électronique',
    category: 'Hardware & IoT',
    responsibilities: [
      'Design circuits électroniques',
      'Gestion sensors : ToF, IMU, caméra, servos',
      'Optimisation consommation énergétique',
      'Intégration Raspberry Pi + NPU'
    ],
    requiredSkills: [
      'C / Python',
      'Protocoles (I2C, UART, SPI, GPIO)',
      'PCB design (KiCAD)',
      'Capteurs & robotique'
    ],
    assignedMembers: ['member-erwan'],
    status: 'filled',
    createdAt: '2025-01-01',
  },
  {
    id: 'position-4',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur mécatronique / robotique',
    category: 'Hardware & IoT',
    responsibilities: [
      'Moteurs, servos, cinématique',
      'Conception structure interne',
      'Impression 3D',
      'Prototypes physiques'
    ],
    requiredSkills: [
      'Fusion360 / SolidWorks',
      'Servo tuning',
      'Montages mécaniques',
      'Autonomie / gestion batterie'
    ],
    assignedMembers: [],
    status: 'open',
    createdAt: '2025-01-01',
  },
  {
    id: 'position-5',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur IoT système embarqué',
    category: 'Hardware & IoT',
    responsibilities: [
      'OS embarqué',
      'Communication entre modules',
      'Intégration des capteurs dans le système',
      'Drivers, optimisation'
    ],
    requiredSkills: [
      'Linux embarqué',
      'Optimisations bas niveau',
      'Traitement signal',
      'Python C++'
    ],
    assignedMembers: [],
    status: 'open',
    createdAt: '2025-01-01',
  },
  // Intelligence Artificielle
  {
    id: 'position-6',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur IA / Séries temporelles & comportement',
    category: 'Intelligence Artificielle',
    responsibilities: [
      'Analyse émotionnelle continue',
      'Suivi attentionnel / fatigue',
      'Modèles comportementaux'
    ],
    requiredSkills: [
      'Machine learning',
      'Data modeling',
      'Modèles hybrides IA + règles',
      'Python / MLflow'
    ],
    assignedMembers: ['member-shirel'],
    status: 'filled',
    createdAt: '2025-01-01',
  },
  {
    id: 'position-7',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur IA / NLP (Langage & voix)',
    category: 'Intelligence Artificielle',
    responsibilities: [
      'Compréhension du langage',
      'Wake word "POPY écoute"',
      'Conversations enfant',
      'TTS + STT offline'
    ],
    requiredSkills: [
      'Transformers (Mistral)',
      'NLP embarqué',
      'Fine-tuning voix enfant',
      'Modèles légers (GGUF / ONNX)'
    ],
    assignedMembers: ['member-sonia'],
    status: 'filled',
    createdAt: '2025-01-01',
  },
  {
    id: 'position-8',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur IA / Vision (Computer Vision)',
    category: 'Intelligence Artificielle',
    responsibilities: [
      'Détection émotions',
      'Vision 1080p',
      'Object detection',
      'Tracking enfant'
    ],
    requiredSkills: [
      'OpenCV, PyTorch',
      'CNN, pose estimation',
      'Optimisation modèle (Quantization, pruning)',
      'Pipelines IA embarquée'
    ],
    assignedMembers: ['member-sonia', 'member-shirel'],
    status: 'filled',
    createdAt: '2025-01-01',
  },
  // Cloud, Backend & Big Data
  {
    id: 'position-9',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur Cloud / DevOps',
    category: 'Cloud, Backend & Big Data',
    responsibilities: [
      'API parentale',
      'Interface web',
      'Serveur mises à jour',
      'Pipelines CI/CD'
    ],
    requiredSkills: [
      'Docker / Kubernetes',
      'API Node / Python',
      'Monitoring',
      'Backend sécurisé'
    ],
    assignedMembers: [],
    status: 'open',
    createdAt: '2025-01-01',
  },
  {
    id: 'position-10',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Data Engineer / Big Data',
    category: 'Cloud, Backend & Big Data',
    responsibilities: [
      'Stockage métriques apprentissage',
      'Stats enseignants',
      'Analytics émotionnels anonymisés',
      'Modèles pédagogiques'
    ],
    requiredSkills: [
      'ETL (Python)',
      'Data pipelines',
      'Bases de données (PostgreSQL / MongoDB)',
      'Visualisation (Dash / Superset)'
    ],
    assignedMembers: ['member-claude'],
    status: 'filled',
    createdAt: '2025-01-01',
  },
  // Cybersécurité & protection enfant
  {
    id: 'position-11',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Ingénieur Cybersécurité',
    category: 'Cybersécurité & protection enfant',
    responsibilities: [
      'Sécurité du robot',
      'Chiffrement total',
      'Audits sécurité',
      'Anti-intrusion / firmware sécurisé'
    ],
    requiredSkills: [
      'Pentest IoT',
      'Chiffrement (AES, RSA)',
      'OTA sécurisé',
      'Sécurité vocal / caméra'
    ],
    assignedMembers: ['member-yacine'],
    status: 'filled',
    createdAt: '2025-01-01',
  },
  {
    id: 'position-12',
    projectId: 'popy',
    projectName: 'Projet POPY - Robot Éducatif',
    title: 'Responsable protection des données (RGPD / Enfant)',
    category: 'Cybersécurité & protection enfant',
    responsibilities: [
      'Conformité totale',
      'Gestion données locales',
      'Privacy by design',
      'Protocole parental'
    ],
    requiredSkills: [
      'RGPD',
      'Politique retention data',
      'Gestion accès / comptes enfants',
      'Documentation légale'
    ],
    assignedMembers: [],
    status: 'open',
    createdAt: '2025-01-01',
  },
];

export const TEST_MEMBERS: TeamMember[] = [
  {
    id: 'member-fabio',
    firstName: 'Fabio',
    lastName: '',
    name: 'Fabio',
    initials: 'FA',
    email: 'fabio@popy-robot.com',
    phone: '+33 6 12 34 56 01',
    company: 'POPY Robot',
    photoUrl: undefined,
    assignedPositions: ['position-1'],
    availability: 'Disponible',
    workload: 75,
    createdAt: '2025-01-01',
  },
  {
    id: 'member-meriem',
    firstName: 'Mériem',
    lastName: '',
    name: 'Mériem',
    initials: 'ME',
    email: 'meriem@popy-robot.com',
    phone: '+33 6 12 34 56 02',
    company: 'POPY Robot',
    photoUrl: undefined,
    assignedPositions: ['position-1'],
    availability: 'Disponible',
    workload: 70,
    createdAt: '2025-01-01',
  },
  {
    id: 'member-erwan',
    firstName: 'Erwan',
    lastName: '',
    name: 'Erwan',
    initials: 'ER',
    email: 'erwan@popy-robot.com',
    phone: '+33 6 12 34 56 03',
    company: 'POPY Robot',
    photoUrl: undefined,
    assignedPositions: ['position-3'],
    availability: 'Disponible',
    workload: 80,
    createdAt: '2025-01-01',
  },
  {
    id: 'member-shirel',
    firstName: 'SHIREL',
    lastName: '',
    name: 'SHIREL',
    initials: 'SH',
    email: 'shirel@popy-robot.com',
    phone: '+33 6 12 34 56 04',
    company: 'POPY Robot',
    photoUrl: undefined,
    assignedPositions: ['position-6', 'position-8'],
    availability: 'Disponible',
    workload: 85,
    createdAt: '2025-01-01',
  },
  {
    id: 'member-sonia',
    firstName: 'Sonia',
    lastName: '',
    name: 'Sonia',
    initials: 'SO',
    email: 'sonia@popy-robot.com',
    phone: '+33 6 12 34 56 05',
    company: 'POPY Robot',
    photoUrl: undefined,
    assignedPositions: ['position-7', 'position-8'],
    availability: 'Disponible',
    workload: 75,
    createdAt: '2025-01-01',
  },
  {
    id: 'member-claude',
    firstName: 'Claude',
    lastName: '',
    name: 'Claude',
    initials: 'CL',
    email: 'claude@popy-robot.com',
    phone: '+33 6 12 34 56 06',
    company: 'POPY Robot',
    photoUrl: undefined,
    assignedPositions: ['position-10'],
    availability: 'Disponible',
    workload: 70,
    createdAt: '2025-01-01',
  },
  {
    id: 'member-yacine',
    firstName: 'Yacine',
    lastName: '',
    name: 'Yacine',
    initials: 'YA',
    email: 'yacine@popy-robot.com',
    phone: '+33 6 12 34 56 07',
    company: 'POPY Robot',
    photoUrl: undefined,
    assignedPositions: ['position-11'],
    availability: 'Disponible',
    workload: 75,
    createdAt: '2025-01-01',
  },
];

// Fonctions utilitaires
export function getPositionsByProject(projectId: string): Position[] {
  return TEST_POSITIONS.filter(p => p.projectId === projectId);
}

export function getMembersByPosition(positionId: string): TeamMember[] {
  const position = TEST_POSITIONS.find(p => p.id === positionId);
  if (!position) return [];
  return TEST_MEMBERS.filter(m => position.assignedMembers.includes(m.id));
}

export function getPositionsByCategory(category: string): Position[] {
  return TEST_POSITIONS.filter(p => p.category === category);
}

export function getCategories(): string[] {
  return Array.from(new Set(TEST_POSITIONS.map(p => p.category)));
}

export function getCategoryById(categoryId: string): PositionCategory | undefined {
  return TEST_POSITION_CATEGORIES.find(c => c.id === categoryId);
}

export function getCategoryByName(categoryName: string): PositionCategory | undefined {
  return TEST_POSITION_CATEGORIES.find(c => c.name === categoryName);
}

export function getAllCategories(): PositionCategory[] {
  return TEST_POSITION_CATEGORIES;
}
