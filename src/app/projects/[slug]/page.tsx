import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { api } from '@/lib/api'
import { Badge } from '@/components/ui/badge'

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  try {
    const project = await api.project(slug)
    return { title: `${project.titre} | Niritsiafoy Lantosoa`, description: project.description }
  } catch {
    return { title: 'Projet introuvable' }
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  let project
  try {
    project = await api.project(slug)
  } catch {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Retour aux projets
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge>{project.numero}</Badge>
          <span className="text-sm text-text-muted">Featured project</span>
        </div>
        <h1 className="font-display mt-4 text-3xl font-bold text-text-primary md:text-5xl">
          {project.titre}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          {project.descriptionLongue}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
        </div>
        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image src={project.image} alt={project.titre} fill className="object-cover" />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={project.lien} target="_blank" rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Voir le projet en ligne <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}