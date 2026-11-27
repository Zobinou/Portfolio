"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";

import { projects as staticProjects } from "@/data/projects";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/animations/StaggerGroup";

export interface ProjectItem {
  slug: string;
  numero: string;
  titre: string;
  description: string;
  image: string;
  technologies: string[];
}

export default function Projects({
  projects,
}: {
  projects?: ProjectItem[];
}) {
  const data = projects?.length ? projects : staticProjects;

  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <FadeIn direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                Featured Projects
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Quelques-uns de mes{" "}
              <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                travaux récents
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-text-secondary sm:text-base sm:leading-9">
              Découvrez une sélection de projets réalisés autour du
              développement web, des technologies numériques et de la
              conception de solutions adaptées à différents besoins.
            </p>
          </div>
        </FadeIn>

        {data.length > 0 ? (
          <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {data.map((project) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`Découvrir le projet ${project.titre}`}
                  className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                >
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-bg-card shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10">

                    <div className="relative aspect-16/11 overflow-hidden bg-bg-secondary">
                      <Image
                        src={project.image}
                        alt={`Aperçu du projet ${project.titre}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-xs font-bold tracking-wider text-white shadow-lg backdrop-blur-md">
                        {project.numero}
                      </span>

                      <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                          <Code2 className="h-3.5 w-3.5" />
                          Project showcase
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-xl">
                        {project.titre}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">
                        {project.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-border/70 bg-bg-secondary/70 px-2.5 py-1.5 text-[10px] font-semibold text-text-secondary transition-colors duration-300 group-hover:border-primary/20 sm:text-xs"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-5">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 group-hover:gap-3">
                          Découvrir le projet
                          <ArrowRight className="h-4 w-4" />
                        </span>

                        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/50">
                          En savoir plus
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-accent-blue transition-all duration-500 group-hover:w-full" />
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <div className="mt-14 rounded-3xl border border-border bg-bg-card p-10 text-center">
            <Code2 className="mx-auto h-10 w-10 text-primary/50" />
            <p className="mt-4 text-sm text-text-secondary">
              Les projets seront bientôt disponibles.
            </p>
          </div>
        )}

        <FadeIn delay={0.25} direction="up">
          <div className="mt-14 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex h-12 items-center gap-3 rounded-xl border border-primary/40 bg-primary/5 px-6 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Voir tous les projets
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}