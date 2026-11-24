import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
    const [projects, skills, messages, testimonials] = await Promise.all([
        prisma.project.count(),
        prisma.skill.count(),
        prisma.contactMessage.count({ where: { read: false } }),
        prisma.testimonial.count(),
    ])

    const cards = [
        { label: 'Projets', value: projects, href: '/admin/projects' },
        { label: 'Compétences', value: skills, href: '/admin/skills' },
        { label: 'Messages non lus', value: messages, href: '/admin/messages' },
        { label: 'Témoignages', value: testimonials, href: '/admin/testimonials' },
    ]

    return (
        <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">Dashboard</h1>
            <p className="mt-1 text-sm text-text-secondary">Vue d&apos;ensemble du portfolio</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((c) => (
                    <a
                        key={c.label}
                        href={c.href}
                        className="rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-primary/40"
                    >
                        <p className="text-sm text-text-secondary">{c.label}</p>
                        <p className="mt-2 text-3xl font-bold text-text-primary">{c.value}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}