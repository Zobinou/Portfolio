import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Images,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";
import { api } from "@/lib/api";
import { driveThumbnail } from "@/lib/drive";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await api.project(slug);

    return {
      title: `${project.titre} | Niritsiafoy Lantosoa`,
      description: project.description,
      openGraph: {
        title: project.titre,
        description: project.description,
        images: [project.image],
      },
    };
  } catch {
    return {
      title: "Projet introuvable",
    };
  }
}

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = await api.project(slug).catch(() => null);

  if (!project) {
    notFound();
  }

  const drivePhotos = (project.drivePhotos ?? [])
    .map((url) => ({
      url,
      thumb: driveThumbnail(url, 1200),
    }))
    .filter(
      (photo): photo is { url: string; thumb: string } =>
        photo.thumb !== null
    );

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-bg-primary pb-24 pt-32 md:pt-36 md:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[50%] -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg-card/70 px-4 py-2.5 text-sm font-medium text-text-secondary shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Retour aux projets
        </Link>

        <header className="mt-10 md:mt-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-bold tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {project.numero}
            </span>

            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
              <Code2 className="h-4 w-4 text-primary" />
              Project showcase
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                {project.titre}
              </h1>

              <p className="mt-6 max-w-3xl text-sm leading-8 text-text-secondary sm:text-base sm:leading-9">
                {project.descriptionLongue}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-border/70 bg-bg-card/80 px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Layers3 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-lg font-extrabold text-text-primary">
                  {project.technologies.length}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                  Technologies
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />

              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Technologies utilisées
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-primary/15 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-12 md:mt-16">
          <div className="group relative aspect-video overflow-hidden rounded-3xl border border-border/70 bg-bg-secondary shadow-xl shadow-black/5">
            <Image
              src={project.image}
              alt={`Aperçu principal du projet ${project.titre}`}
              fill
              sizes="(max-width: 1024px) 100vw, 1152px"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6">
              <Sparkles className="h-3.5 w-3.5" />
              Aperçu du projet
            </span>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-5 rounded-3xl border border-border/70 bg-bg-card/80 p-5 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
              Découvrez le projet en action
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Consultez la réalisation directement depuis son environnement en ligne.
            </p>
          </div>

          <Link
            href={project.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Voir le projet en ligne
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </section>

        {drivePhotos.length > 0 && (
          <section className="mt-20 md:mt-24">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5">
                  <Images className="h-4 w-4 text-primary" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                    Project gallery
                  </span>
                </div>

                <h2 className="font-display text-2xl font-extrabold text-text-primary sm:text-3xl lg:text-4xl">
                  Galerie du{" "}
                  <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                    projet
                  </span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-text-secondary">
                  Découvrez quelques aperçus et captures d&apos;écran
                  de cette réalisation.
                </p>
              </div>

              <span className="rounded-full border border-border/70 bg-bg-card px-4 py-2 text-xs font-semibold text-text-secondary">
                {drivePhotos.length} photo{drivePhotos.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {drivePhotos.map((photo, index) => (
                <a
                  key={photo.url}
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ouvrir la photo ${index + 1} de ${project.titre}`}
                  className="group relative block aspect-4/3 overflow-hidden rounded-2xl border border-border/70 bg-bg-secondary shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Image
                    src={photo.thumb}
                    alt={`${project.titre} — aperçu ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute bottom-4 left-4 text-xs font-bold tracking-wider text-white">
                    IMAGE / {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 flex justify-center border-t border-border/60 pt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 rounded-xl border border-border bg-bg-card px-6 py-3 text-sm font-semibold text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/5"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Tous les projets
          </Link>
        </div>
      </div>
    </main>
  );
}