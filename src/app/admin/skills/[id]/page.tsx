import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EntityForm from '@/components/admin/EntityForm'

export const instant = false

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const item = await prisma.skill.findUnique({ where: { id } })
    if (!item) notFound()

    return (
        <EntityForm
            entity="skills"
            title="Modifier la compétence"
            defaults={{ percent: 0, order: 0 }}
            initial={item}
            id={id}
            fields={[
                { name: 'name', label: 'Nom', type: 'text', required: true },
                { name: 'percent', label: 'Pourcentage', type: 'number', required: true },
                { name: 'icon', label: 'Icône', type: 'icon', required: true }, // ✅ type changé
                { name: 'order', label: 'Ordre', type: 'number' },
            ]}
        />
    )
}