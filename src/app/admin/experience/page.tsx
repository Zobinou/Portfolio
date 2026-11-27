import EntityTable from '@/components/admin/EntityTable'

export default function ExperiencePage() {
    return (
        <EntityTable
            entity="experience"
            title="Expérience"
            columns={[
                { key: 'titre', label: 'Titre' },
                { key: 'organisation', label: 'Organisation' },
                { key: 'periode', label: 'Période' },
            ]}
        />
    )
}