import EntityForm from '@/components/admin/EntityForm'

export default function NewEducationPage() {
    return (
        <EntityForm
            entity="education"
            title="Nouvelle formation"
            defaults={{ current: false, order: 0 }}
            fields={[
                { name: 'titre', label: 'Titre', type: 'text', required: true },
                { name: 'organisation', label: 'Organisation', type: 'text', required: true },
                { name: 'lieu', label: 'Lieu', type: 'text', required: true },
                { name: 'periode', label: 'Période', type: 'text', required: true, placeholder: '2024 - 2027' },
                { name: 'current', label: 'En cours', type: 'checkbox' },
                { name: 'order', label: 'Ordre', type: 'number' },
            ]}
        />
    )
}