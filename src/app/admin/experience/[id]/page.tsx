import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EntityForm from '@/components/admin/EntityForm'

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const item = await prisma.experience.findUnique({ where: { id } })
    if (!item) notFound()

    return (
        <EntityForm
            entity="experience"
            title="Modifier l'expérience"
            defaults={{ current: false, order: 0 }}
            initial={item}
            id={id}
            fields={[
                { name: 'titre', label: 'Titre', type: 'text', required: true },
                { name: 'organisation', label: 'Organisation', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea', required: true },
                { name: 'periode', label: 'Période', type: 'text', required: true },
                { name: 'current', label: 'En cours', type: 'checkbox' },
                { name: 'order', label: 'Ordre', type: 'number' },
            ]}
        />
    )
}