import Skills from '@/components/sections/Skills'
import Qualities from '@/components/sections/Qualities'
import { api } from '@/lib/api'

export const metadata = {
    title: 'Compétences | Niritsiafoy Lantosoa',
    description: 'Technologies maîtrisées et qualités humaines.',
}

export default async function SkillsPage() {
    const [skills, qualities] = await Promise.all([api.skills(), api.qualities()])

    return (
        <div className="pt-12">
            <Skills skills={skills} />
            <Qualities qualities={qualities.map((q) => q.label)} />
        </div>
    )
}