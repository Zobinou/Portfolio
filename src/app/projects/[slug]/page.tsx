import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { projects } from '@/data/projects'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return { title: 'Projet introuvable' }
  }

  return {
    title: `${project.titre} | Niritsiafoy Lantosoa`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary"
          >
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
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.image}
              alt={project.titre}
              className="w-full object-cover"
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={project.lien}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Voir le projet en ligne <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Tous les projets
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}