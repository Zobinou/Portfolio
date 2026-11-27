import EntityTable from '@/components/admin/EntityTable'

export default function EducationPage() {
    return (
        <EntityTable
            entity="education"
            title="Formation"
            columns={[
                { key: 'titre', label: 'Titre' },
                { key: 'organisation', label: 'Organisation' },
                { key: 'periode', label: 'Période' },
            ]}
        />
    )
}