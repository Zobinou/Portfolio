export interface Education {
  periode: string
  titre: string
  organisation: string
  lieu: string
  current?: boolean
}

export const educationData: Education[] = [
  {
    periode: '2024 - 2027',
    titre: 'Licence en Informatique',
    organisation: "Haute École d'Informatique (HEI)",
    lieu: 'Ivandry - Madagascar',
    current: true,
  },
]