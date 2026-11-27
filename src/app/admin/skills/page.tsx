import EntityTable from '@/components/admin/EntityTable'

export default function SkillsPage() {
    return (
        <EntityTable
            entity="skills"
            title="Compétences"
            columns={[
                { key: 'name', label: 'Nom' },
                { key: 'percent', label: '%' },
                { key: 'icon', label: 'Icône' },
                { key: 'order', label: 'Ordre' },
            ]}
        />
    )
}