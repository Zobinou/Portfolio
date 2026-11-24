import {
    SiReact, SiHtml5, SiJavascript, SiNodedotjs,
    SiTailwindcss, SiGit, SiFigma, SiNextdotjs, SiTypescript,
} from 'react-icons/si'
import { FaCss3 } from 'react-icons/fa'
import { Code2 } from 'lucide-react'
import type { IconType } from 'react-icons'

export const iconMap = {
    SiReact, SiHtml5, SiJavascript, SiNodedotjs,
    SiTailwindcss, SiGit, SiFigma, SiNextdotjs, SiTypescript,
    FaCss3,
} as const satisfies Record<string, IconType>

export type IconName = keyof typeof iconMap

export function getIcon(name?: string | null): IconType {
    if (!name) return Code2 as unknown as IconType
    return iconMap[name as IconName] ?? (Code2 as unknown as IconType)
}

/** Extrait le nom d'un composant react-icons pour le stockage en DB */
export function getIconName(icon: IconType): IconName {
    const n = (icon as unknown as { displayName?: string; name?: string })
    const label = n.displayName ?? n.name ?? 'SiReact'
    return (label in iconMap ? label : 'SiReact') as IconName
}