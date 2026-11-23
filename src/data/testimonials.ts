const driveImage = (id: string, size = 200) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`

export interface Testimonial {
  quote: string
  name: string
  poste: string
  photo: string
}

export const testimonialsData: Testimonial[] = [
  {
    quote:
      "Niritsiafoy est une développeuse frontend talentueuse et rigoureuse. Elle transforme ses idées en interfaces modernes, intuitives et performantes. Un vrai plaisir de collaborer avec elle !",
    name: 'Jean Rakoto',
    poste: 'Chef de Projet · HEI',
    photo: driveImage('1CT12YIeF0xcc8cwhBpvR-Oq0AFOABwsw', 200),
  },
]