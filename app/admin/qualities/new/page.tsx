import EntityForm from '@/components/admin/EntityForm'

export default function NewQualityPage() {
    return (
        <EntityForm
            entity="qualities"
            title="Nouvelle qualité"
            defaults={{ order: 0 }}
            fields={[
                { name: 'label', label: 'Libellé', type: 'text', required: true },
                { name: 'order', label: 'Ordre', type: 'number' },
            ]}
        />
    )
}