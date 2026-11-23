import About from '@/components/sections/About'

export const metadata = {
    title: 'À propos | Niritsiafoy Lantosoa',
    description: 'Découvrez mon parcours et ma passion pour le développement frontend.',
}

export default function AboutPage() {
    return (
        <div className="pt-12">
            <About />
        </div>
    )
}