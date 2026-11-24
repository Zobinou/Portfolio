import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Experience from '@/components/sections/Experience'

export const metadata = {
    title: 'À propos | Zo Lantosoa',
    description: 'Parcours, formation et expérience professionnelle.',
}

export default function AboutPage() {
    return (
        <div className="pt-12">
            <About />
            <Education />
            <Experience />
        </div>
    )
}