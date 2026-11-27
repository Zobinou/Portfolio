import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EntityForm from '@/components/admin/EntityForm'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const item = await prisma.testimonial.findUnique({ where: { id } })
    if (!item) notFound()

    return (
        <EntityForm
            entity="testimonials"
            title="Modifier le témoignage"
            defaults={{ order: 0 }}
            initial={item}
            id={id}
            fields={[
                { name: 'quote', label: 'Citation', type: 'textarea', required: true },
                { name: 'name', label: 'Nom', type: 'text', required: true },
                { name: 'poste', label: 'Poste', type: 'text', required: true },
                { name: 'photo', label: 'URL photo', type: 'text' },
                { name: 'order', label: 'Ordre', type: 'number' },
            ]}
        />
    )
}