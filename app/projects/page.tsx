
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  FolderOpen,
  Sparkles,
  Monitor,
} from "lucide-react";

import { api } from "@/lib/api";
import { projects as staticProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projets | Zo Lantosoa",
  description:
    "Découvrez les projets de Niritsiafoy Lantosoa, ses réalisations et les technologies utilisées.",
};

interface ProjectCard {
  id?: string;
  slug: string;
  numero?: string;
  titre: string;
  description: string;
  image: string;
  typeProjet?: string | null;
  typeApplication?: string | null;
  technologies?: string[];
  featured?: boolean;
}

const projectTypeLabels: Record<string, string> = {
  PERSONNEL: "Personnel",
  SCOLAIRE: "Scolaire",
  ENTREPRISE: "Entreprise",
  OPEN_SOURCE: "Open source",
  INSTITUTIONNEL: "Institutionnel",
};

const applicationTypeLabels: Record<string, string> = {
  WEB: "Web",
  MOBILE: "Mobile",
  DESKTOP: "Desktop",
  API: "API / Backend",
  LIBRARY: "Bibliothèque",
  GAME: "Jeu",
  OTHER: "Autre",
};

async function ProjectsContent() {
  const projects = (await api.projects().catch((error) => {
    console.error(
      "[Projects] Erreur de chargement des projets :",
      error
    );

    return staticProjects;
  })) as ProjectCard[];

  return (
    <>
      {/* En-tête */}
      <div className="mx-auto mt-12 max-w-3xl text-center md:mt-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-primary" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
            Mes Réalisations
          </span>
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Tous mes{" "}
          <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
            projets
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-text-secondary sm:text-base sm:leading-9">
          Explorez les projets sur lesquels j&apos;ai travaillé,
          les solutions que j&apos;ai conçues et les technologies
          utilisées pour donner vie à chaque idée.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg-card/80 px-4 py-2.5 shadow-sm">
          <FolderOpen className="h-4 w-4 text-primary" />

          <span className="text-xs font-semibold text-text-secondary">
            {projects.length} projet
            {projects.length > 1 ? "s" : ""} disponible
            {projects.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Grille des projets */}
      {projects.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-7">
          {projects.map((project, index) => {
            const technologies = project.technologies ?? [];

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                aria-label={`Découvrir le projet ${project.titre}`}
                className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-bg-card shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10">

                  {/* Image */}
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

                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-xs font-bold tracking-wider text-white shadow-lg backdrop-blur-md">
                      {project.numero ?? `0${index + 1}`}
                    </span>

                    {project.featured && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-black/40 px-3 py-1.5 text-[10px] font-bold text-amber-300 backdrop-blur-md">
                        <Sparkles size={12} />
                        Vedette
                      </span>
                    )}

                    <span className="absolute bottom-4 left-5 text-xs font-bold tracking-[0.2em] text-white/75">
                      PROJECT / {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h2 className="font-display text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-xl">
                      {project.titre}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">
                      {project.description}
                    </p>

                    {/* Types du projet */}
                    {(project.typeProjet || project.typeApplication) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.typeProjet && (
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-semibold text-primary">
                            {projectTypeLabels[project.typeProjet] ??
                              project.typeProjet}
                          </span>
                        )}

                        {project.typeApplication && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1.5 text-[10px] font-semibold text-accent-blue">
                            <Monitor size={11} />

                            {applicationTypeLabels[project.typeApplication] ??
                              project.typeApplication}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Technologies */}
                    {technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {technologies.map((technology, techIndex) => (
                          <span
                            key={`${technology}-${techIndex}`}
                            className="rounded-lg border border-border/70 bg-bg-secondary/70 px-2.5 py-1.5 text-[10px] font-semibold text-text-secondary transition-colors duration-300 group-hover:border-primary/20 sm:text-xs"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-5">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 group-hover:gap-3">
                        Découvrir le projet
                        <ArrowRight className="h-4 w-4" />
                      </span>

                      <Code2 className="h-4 w-4 text-text-secondary/40 transition-colors group-hover:text-primary" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-accent-blue transition-all duration-500 group-hover:w-full" />
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto mt-16 max-w-xl rounded-3xl border border-border bg-bg-card p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FolderOpen className="h-7 w-7" />
          </div>

          <h2 className="mt-5 font-display text-xl font-bold text-text-primary">
            Aucun projet disponible
          </h2>

          <p className="mt-2 text-sm leading-7 text-text-secondary">
            Les projets seront affichés ici dès qu&apos;ils seront disponibles.
          </p>
        </div>
      )}
    </>
  );
}

function ProjectsLoading() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="mx-auto h-12 max-w-md rounded-xl bg-text-secondary/10" />
      <div className="mx-auto mt-5 h-5 max-w-xl rounded-lg bg-text-secondary/10" />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-105 rounded-3xl border border-border bg-bg-card"
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden pb-24 pt-32 md:pb-32 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[55%] -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsContent />
        </Suspense>
      </div>
    </main>
  );
}