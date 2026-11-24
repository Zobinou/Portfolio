import Skills from '@/components/sections/Skills'
import Qualities from '@/components/sections/Qualities'

export const metadata = {
    title: 'Compétences | Niritsiafoy Lantosoa',
    description: 'Technologies maîtrisées et qualités humaines.',
}

export default function SkillsPage() {
    return (
        <div className="pt-12">
            <Skills />
            <Qualities />
        </div>
    )
}