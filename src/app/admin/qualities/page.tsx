import EntityTable from '@/components/admin/EntityTable'

export default function QualitiesPage() {
    return (
        <EntityTable
            entity="qualities"
            title="Qualités"
            columns={[
                { key: 'label', label: 'Libellé' },
                { key: 'order', label: 'Ordre' },
            ]}
        />
    )
}