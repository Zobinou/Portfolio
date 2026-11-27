const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

async function fetcher<T>(path: string, revalidate = 60): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate } })
    if (!res.ok) throw new Error(`API ${path} → ${res.status} ${res.statusText}`)
    return res.json()
}

// ---------- Types renvoyés par l'API ----------
export interface ApiProject {
    id: string
    slug: string
    numero: string
    titre: string
    description: string
    descriptionLongue: string
    image: string
    lien: string
    technologies: string[]
    drivePhotos: string[]
    featured: boolean
    order: number
}
export interface ApiSkill { id: string; name: string; percent: number; icon: string; order: number }
export interface ApiQuality { id: string; label: string; order: number }
export interface ApiEducation {
    id: string; titre: string; organisation: string; lieu: string;
    periode: string; current: boolean; order: number
}
export interface ApiExperience {
    id: string; titre: string; organisation: string | null;
    description: string; periode: string; current: boolean; order: number
}
export interface ApiTestimonial {
    id: string; quote: string; name: string; poste: string;
    photo: string | null; order: number
}

export const api = {
    projects: () => fetcher<ApiProject[]>('/api/projects'),
    project: (slug: string) => fetcher<ApiProject>(`/api/projects/${slug}`),
    skills: () => fetcher<ApiSkill[]>('/api/skills'),
    qualities: () => fetcher<ApiQuality[]>('/api/qualities'),
    education: () => fetcher<ApiEducation[]>('/api/education'),
    experience: () => fetcher<ApiExperience[]>('/api/experience'),
    testimonials: () => fetcher<ApiTestimonial[]>('/api/testimonials'),
}