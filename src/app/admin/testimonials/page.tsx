import EntityTable from '@/components/admin/EntityTable'

export default function TestimonialsPage() {
    return (
        <EntityTable
            entity="testimonials"
            title="Témoignages"
            columns={[
                { key: 'name', label: 'Nom' },
                { key: 'poste', label: 'Poste' },
            ]}
        />
    )
}