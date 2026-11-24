import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Experience from '@/components/sections/Experience'
import { api } from '@/lib/api'

export const metadata = {
    title: 'À propos | Niritsiafoy Lantosoa',
    description: 'Parcours, formation et expérience professionnelle.',
}

export default async function AboutPage() {
    const [education, experience] = await Promise.all([
        api.education(),
        api.experience(),
    ])

    return (
        <div className="pt-12">
            <About />
            <Education education={education} />
            <Experience experience={experience} />
        </div>
    )
}