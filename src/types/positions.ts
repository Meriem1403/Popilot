// Types pour les postes et assignations

export interface PositionCategory {
  id: string;
  name: string; // Ex: "Direction & Coordination"
  description?: string; // Description de la catégorie
  color: string; // Couleur pour l'affichage (ex: "indigo", "blue", "green")
  icon?: string; // Nom de l'icône (optionnel)
  createdAt?: string;
  updatedAt?: string;
}

export interface Position {
  id: string;
  projectId: string;
  projectName: string;
  title: string; // Ex: "Chef de projet / Product Owner (PO)"
  category: string; // ID ou nom de la catégorie
  responsibilities: string[]; // Liste des responsabilités
  requiredSkills: string[]; // Compétences requises
  assignedMembers: string[]; // IDs des membres assignés (peut être vide)
  status: 'open' | 'filled' | 'partial'; // vacant, rempli, partiellement rempli
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // firstName + lastName combinés
  initials: string;
  email: string;
  phone?: string;
  company?: string; // Entreprise pour laquelle il travaille
  photoUrl?: string;
  assignedPositions: string[]; // IDs des postes assignés
  availability: 'Disponible' | 'Occupé' | 'Surchargé' | 'En congé';
  workload: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PositionAssignment {
  id: string;
  positionId: string;
  memberId: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive';
  allocation: number; // Pourcentage d'allocation (0-100)
}
