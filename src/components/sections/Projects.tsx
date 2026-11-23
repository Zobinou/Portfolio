'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup'

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
              Featured Projects
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Quelques-uns de mes travaux récents
            </h2>
          </div>
        </FadeIn>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20">
                  {/* ✅ relative + aspect-ratio : parent obligatoire pour fill */}
                  <div className="relative aspect-4/3 overflow-hidden bg-bg-secondary">
                    <Image
                      src={project.image}
                      alt={project.titre}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 z-10">{project.numero}</Badge>
                  </div>

                  <CardContent>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {project.titre}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                      Voir le projet <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Voir tous les projets <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}