// ============================================
// EXPÉRIENCES
// ============================================
// Pour ajouter une nouvelle expérience, copiez/collez
// un objet du tableau et modifiez ses champs.
// - periode: période au format "Mois/Année - Mois/Année"
// - titre: intitulé du poste / du projet
// - organisation: nom de l'organisation (optionnel)
// - description: description des missions
// - current: true si l'expérience est en cours (affiche un badge)
// ============================================
export const experienceData = [
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
      'Bénévolat : gestion des communications, de la stratégie de contenu et de la visibilité de l’association.',
    current: true,
  },
]
