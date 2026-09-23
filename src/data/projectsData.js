import project1 from '../assets/images/projects/project1.jpg'
import project2 from '../assets/images/projects/project2.jpg'
import project3 from '../assets/images/projects/project3.jpg'

// ============================================
// PROJETS
// ============================================
// Pour ajouter un nouveau projet, copiez/collez un objet
// du tableau ci-dessous et modifiez ses champs.
// - numero: numéro affiché sur le badge du projet
// - titre: nom du projet
// - description: courte description
// - image: importez une nouvelle image puis référencez-la ici
// - lien: URL du projet en ligne (GitHub, Vercel, etc.)
// - technologies: liste des technologies utilisées
// ============================================
export const projectsData = [
  {
    numero: '01',
    titre: 'Landing Page Moderne',
    description:
      "Landing page responsive et animée pour une startup, réalisée avec React et Tailwind CSS.",
    image: project1,
    lien: 'https://github.com',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
  },
  {
    numero: '02',
    titre: 'Dashboard Analytics',
    description:
      'Tableau de bord interactif avec graphiques, filtres et composants réutilisables.',
    image: project2,
    lien: 'https://github.com',
    technologies: ['React', 'CSS', 'Node.js'],
  },
  {
    numero: '03',
    titre: 'Site Vitrine E-commerce',
    description:
      "Interface e-commerce moderne avec catalogue de produits et panier côté frontend.",
    image: project3,
    lien: 'https://github.com',
    technologies: ['React', 'JavaScript', 'CSS'],
  },
]
