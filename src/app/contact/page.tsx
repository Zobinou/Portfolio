import Contact from '@/components/sections/Contact'
import { api } from '@/lib/api'

export const metadata = {
    title: 'Contact | Niritsiafoy Lantosoa',
    description: "Contactez-moi pour discuter d'un projet ou d'une alternance.",
}

export default async function ContactPage() {
    const testimonials = await api.testimonials()

    return (
        <div className="pt-12">
            <Contact testimonials={testimonials} />
        </div>
    )
}