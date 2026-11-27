import EntityForm from '@/components/admin/EntityForm'

export default function NewExperiencePage() {
    return (
        <EntityForm
            entity="experience"
            title="Nouvelle expérience"
            defaults={{ current: false, order: 0 }}
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