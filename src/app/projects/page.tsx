import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { api } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Projets | Niritsiafoy Lantosoa',
  description: 'Tous les projets de Niritsiafoy Lantosoa.',
}

export default async function ProjectsPage() {
  const projects = await api.projects()

  return (
    <div className="pt-20 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Retour à l&apos;accueil
        </Link>
        <h1 className="font-display mt-6 text-center text-3xl font-bold text-text-primary md:text-4xl">
          Tous mes projets
        </h1>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="block h-full">
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20">
                <div className="relative aspect-4/3 overflow-hidden bg-bg-secondary">
                  <Image src={p.image} alt={p.titre} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge className="absolute top-3 left-3 z-10">{p.numero}</Badge>
                </div>
                <CardContent>
                  <h3 className="text-lg font-semibold text-text-primary">{p.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.technologies.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    Voir le projet <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}