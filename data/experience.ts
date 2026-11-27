export interface Experience {
  periode: string
  titre: string
  organisation?: string
  description: string
  current?: boolean
}

export const experienceData: Experience[] = [
  {
    periode: '2024 - 2025',
    titre: 'Projet Web institutionnel',
    organisation: 'HEI',
    description:
      "Conception de l'UI/UX sur Figma, intégration en HTML/CSS/JS, tests et optimisation de l'expérience utilisateur.",
  },
  {
    periode: '2025 - Présent',
    titre: 'Projet académique React.js',
    organisation: 'HEI',
    description:
      'Création de composants réutilisables, travail en équipe avec Git/GitHub et optimisation des performances.',
    current: true,
  },
  {
    periode: 'Mars 2025 - Présent',
    titre: 'Responsable Communications',
    organisation: 'Creative Minds',
    description:
      "Bénévolat : gestion des communications, de la stratégie de contenu et de la visibilité de l'association.",
    current: true,
  },
]