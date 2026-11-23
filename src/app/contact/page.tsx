import Contact from '@/components/sections/Contact'

export const metadata = {
    title: 'Contact | Niritsiafoy Lantosoa',
    description: "Contactez-moi pour discuter d'un projet ou d'une alternance.",
}

export default function ContactPage() {
    return (
        <div className="pt-12">
            <Contact />
        </div>
    )
}