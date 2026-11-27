import EntityForm from '@/components/admin/EntityForm'

export default function NewTestimonialPage() {
    return (
        <EntityForm
            entity="testimonials"
            title="Nouveau témoignage"
            defaults={{ order: 0 }}
            fields={[
                { name: 'quote', label: 'Citation', type: 'textarea', required: true },
                { name: 'name', label: 'Nom', type: 'text', required: true },
                { name: 'poste', label: 'Poste', type: 'text', required: true },
                { name: 'photo', label: 'URL photo', type: 'text' },
                { name: 'order', label: 'Ordre', type: 'number' },
            ]}
        />
    )
}