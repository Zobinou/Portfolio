import ProjectForm from '@/components/admin/ProjectForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const p = await prisma.project.findUnique({ where: { id } })
    if (!p) notFound()
    return <ProjectForm initial={p} id={p.id} />
}