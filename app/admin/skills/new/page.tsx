import EntityForm from '@/components/admin/EntityForm'

export default function NewSkillPage() {
    return (
        <EntityForm
            entity="skills"
            title="Nouvelle compétence"
            defaults={{ percent: 0, order: 0, icon: 'SiReact' }}
            fields={[
                { name: 'name', label: 'Nom', type: 'text', required: true },
                { name: 'percent', label: 'Pourcentage', type: 'number', required: true },
                { name: 'icon', label: 'Icône', type: 'icon', required: true },
                { name: 'order', label: 'Ordre', type: 'number' },
            ]}
        />
    )
}