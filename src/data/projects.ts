// ✅ Endpoint AFFICHAGE (thumbnail) pour les images
const driveImage = (id: string, size = 800) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`

// ✅ Endpoint TÉLÉCHARGEMENT (garde-le si tu ajoutes un bouton "Télécharger")
export const driveDownload = (id: string) =>
  `https://drive.google.com/uc?export=download&id=${id}`

export interface Project {
  slug: string
  numero: string
  titre: string
  description: string
  descriptionLongue: string
  image: string
  lien: string
  technologies: string[]
}

export const projects: Project[] = [
  {
    slug: 'landing-page-moderne',
    numero: '01',
    titre: 'Landing Page Moderne',
    description:
      'Landing page responsive et animée pour une startup, réalisée avec React et Tailwind CSS.',
    descriptionLongue:
      "Ce projet consistait à concevoir et développer une landing page moderne pour une startup tech. L'objectif était de créer une expérience utilisateur fluide avec des animations subtiles, un design épuré et une structure optimisée pour la conversion. J'ai utilisé React pour les composants, Tailwind CSS pour le styling et Framer Motion pour les animations d'entrée.",
    image: driveImage('1CT12YIeF0xcc8cwhBpvR-Oq0AFOABwsw', 800),
    lien: 'https://github.com/NiriDev',
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Framer Motion'],
  },
  {
    slug: 'dashboard-analytics',
    numero: '02',
    titre: 'Dashboard Analytics',
    description:
      'Tableau de bord interactif avec graphiques, filtres et composants réutilisables.',
    descriptionLongue:
      "Dashboard analytics avec visualisation de données en temps réel. Le projet inclut des graphiques interactifs, des filtres dynamiques et une architecture de composants réutilisables. Construit avec React pour l'interface, Node.js pour l'API et CSS personnalisé pour le styling.",
    image: driveImage('1CT12YIeF0xcc8cwhBpvR-Oq0AFOABwsw', 800),
    lien: 'https://github.com/NiriDev',
    technologies: ['React', 'CSS', 'Node.js', 'Chart.js'],
  },
  {
    slug: 'site-vitrine-ecommerce',
    numero: '03',
    titre: 'Site Vitrine E-commerce',
    description:
      'Interface e-commerce moderne avec catalogue de produits et panier côté frontend.',
    descriptionLongue:
      "Interface e-commerce moderne comprenant un catalogue de produits filtrable, un panier persistant et une experience d'achat fluide. Focus particulier sur l'accessibilité et la performance côté frontend, avec React et JavaScript.",
    image: driveImage('1CT12YIeF0xcc8cwhBpvR-Oq0AFOABwsw', 800),
    lien: 'https://github.com/NiriDev',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'],
  },
]