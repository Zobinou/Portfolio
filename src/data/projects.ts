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
    description: 'Landing page responsive et animée pour une startup, réalisée avec React et Tailwind CSS.',
    descriptionLongue: "Ce projet consistait à concevoir et développer une landing page moderne pour une startup tech...",
    image: '/assets/images/projects/project1.jpg',
    lien: 'https://github.com/Zobinou',
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Framer Motion'],
  },
  {
    slug: 'dashboard-analytics',
    numero: '02',
    titre: 'Dashboard Analytics',
    description: 'Tableau de bord interactif avec graphiques, filtres et composants réutilisables.',
    descriptionLongue: "Dashboard analytics avec visualisation de données en temps réel...",
    image: '/assets/images/projects/project2.jpg',
    lien: 'https://github.com/Zobinou',
    technologies: ['React', 'CSS', 'Node.js', 'Chart.js'],
  },
  {
    slug: 'site-vitrine-ecommerce',
    numero: '03',
    titre: 'Site Vitrine E-commerce',
    description: 'Interface e-commerce moderne avec catalogue de produits et panier côté frontend.',
    descriptionLongue: "Interface e-commerce moderne comprenant un catalogue de produits filtrable...",
    image: '/assets/images/projects/project3.jpg',
    lien: 'https://github.com/Zobinou',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'],
  },
]