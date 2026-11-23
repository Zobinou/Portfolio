import {
  SiReact,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiFigma,
  SiNextdotjs,
  SiTypescript,
} from 'react-icons/si'
import { FaCss3 } from "react-icons/fa";
import type { IconType } from 'react-icons'

export interface Skill {
  name: string
  icon: IconType
  percent: number
}

export const skillsData: Skill[] = [
  { name: 'React.js', icon: SiReact, percent: 85 },
  { name: 'Next.js', icon: SiNextdotjs, percent: 75 },
  { name: 'HTML', icon: SiHtml5, percent: 90 },
  { name: 'CSS', icon: FaCss3, percent: 85 },
  { name: 'JavaScript', icon: SiJavascript, percent: 80 },
  { name: 'TypeScript', icon: SiTypescript, percent: 70 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, percent: 85 },
  { name: 'Node.js', icon: SiNodedotjs, percent: 60 },
  { name: 'Git', icon: SiGit, percent: 80 },
  { name: 'Figma', icon: SiFigma, percent: 70 },
]