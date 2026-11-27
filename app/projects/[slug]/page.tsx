import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Images } from "lucide-react";
import { api } from "@/lib/api";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

interface ProjectDetail {
    slug?: string;
    numero?: string | number;
    titre?: string;
    description?: string;
    image?: string;
    technologies?: string[];
    drivePhotos?: string[];
}

function driveThumbnail(url: string, size = 1200): string {
    try {
        const parsedUrl = new URL(url);

        const fileId =
            parsedUrl.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ??
            parsedUrl.searchParams.get("id");

        if (
            fileId &&
            parsedUrl.hostname.includes("drive.google.com")
        ) {
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
        }

        return url;
    } catch {
        return url;
    }
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const project = (await api.project(slug)) as ProjectDetail | null;

        if (!project) {
            return {
                title: "Projet introuvable | Zo Lantosoa",
                description: "Ce projet est introuvable.",
            };
        }

        return {
            title: `${project.titre ?? "Projet"} | Zo Lantosoa`,
            description:
                project.description ??
                "Découvrez les réalisations de Zo Lantosoa.",
            openGraph: {
                title: `${project.titre ?? "Projet"} | Zo Lantosoa`,
                description:
                    project.description ??
                    "Découvrez les réalisations de Zo Lantosoa.",
                ...(project.image && {
                    images: [driveThumbnail(project.image)],
                }),
            },
        };
    } catch (error) {
        console.error(
            "[ProjectDetail] Erreur lors de la génération des métadonnées :",
            error,
        );

        return {
            title: "Projet | Zo Lantosoa",
            description: "Découvrez les réalisations de Zo Lantosoa.",
        };
    }
}

async function ProjectDetailContent({ params }: PageProps) {
    const { slug } = await params;

    const project = (await api.project(slug).catch((error) => {
        console.error("[ProjectDetail] Erreur :", error);
        return null;
    })) as ProjectDetail | null;

    if (!project) {
        notFound();
    }

    const title = project.titre ?? "Projet sans titre";
    const description =
        project.description ?? "Aucune description disponible pour ce projet.";

    const technologies = Array.isArray(project.technologies)
        ? project.technologies.filter(
              (technology): technology is string =>
                  typeof technology === "string",
          )
        : [];

    const drivePhotos = Array.isArray(project.drivePhotos)
        ? project.drivePhotos.filter(
              (photo): photo is string =>
                  typeof photo === "string" && photo.length > 0,
          )
        : [];

    const coverImage = project.image
        ? driveThumbnail(project.image)
        : drivePhotos.length > 0
          ? driveThumbnail(drivePhotos[0])
          : null;

    const galleryPhotos = drivePhotos
        .map((photo) => driveThumbnail(photo))
        .filter((photo) => photo !== coverImage);

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-bg-primary px-5 pb-20 pt-28 sm:px-8 lg:px-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-[45%] -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
            />

            <div className="mx-auto max-w-6xl">
                <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 rounded-full border border-text-secondary/10 bg-bg-card px-5 py-3 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-primary/40 hover:text-primary"
                >
                    <ArrowLeft
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    Retour aux projets
                </Link>

                <section className="mt-12">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            Projet
                        </span>

                        {project.numero !== undefined && (
                            <span className="text-sm font-medium text-text-secondary">
                                Réalisation n° {project.numero}
                            </span>
                        )}
                    </div>

                    <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
                        {description}
                    </p>

                    {technologies.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-2">
                            {technologies.map((technology, index) => (
                                <span
                                    key={`${technology}-${index}`}
                                    className="rounded-full border border-text-secondary/10 bg-bg-card px-4 py-2 text-xs font-medium text-text-secondary transition-colors duration-300 hover:border-primary/40 hover:text-primary sm:text-sm"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    )}
                </section>

                {coverImage && (
                    <section className="mt-14">
                        <div className="group relative aspect-video overflow-hidden rounded-2xl border border-text-secondary/10 bg-bg-card shadow-2xl shadow-black/10 sm:rounded-3xl">
                            <Image
                                src={coverImage}
                                alt={`Aperçu du projet ${title}`}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />

                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                    </section>
                )}

                {galleryPhotos.length > 0 && (
                    <section className="mt-16">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <div className="mb-3 flex items-center gap-2 text-primary">
                                    <Images size={19} />
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                                        Galerie
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
                                    Aperçus du projet
                                </h2>

                                <p className="mt-2 text-sm text-text-secondary">
                                    Découvrez les différentes interfaces et
                                    réalisations de ce projet.
                                </p>
                            </div>

                            <span className="rounded-full border border-text-secondary/10 bg-bg-card px-4 py-2 text-xs font-medium text-text-secondary">
                                {galleryPhotos.length + (coverImage ? 1 : 0)} images
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {galleryPhotos.map((photo, index) => (
                                <div
                                    key={`${photo}-${index}`}
                                    className="group relative aspect-video overflow-hidden rounded-2xl border border-text-secondary/10 bg-bg-card"
                                >
                                    <Image
                                        src={photo}
                                        alt={`Capture ${index + 1} du projet ${title}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                        Aperçu {index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {!coverImage && galleryPhotos.length === 0 && (
                    <div className="mt-14 rounded-2xl border border-dashed border-text-secondary/20 bg-bg-card p-10 text-center">
                        <Images
                            size={36}
                            className="mx-auto text-text-secondary/50"
                        />
                        <p className="mt-4 text-sm text-text-secondary">
                            Aucune image n&apos;est disponible pour ce projet.
                        </p>
                    </div>
                )}

                <div className="mt-20 border-t border-text-secondary/10 pt-10">
                    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                                Découvrir d&apos;autres réalisations ?
                            </h2>
                            <p className="mt-2 text-sm text-text-secondary">
                                Retrouvez les autres projets dans le portfolio.
                            </p>
                        </div>

                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                        >
                            Tous les projets
                            <ArrowUpRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ProjectDetailLoading() {
    return (
        <main className="min-h-screen animate-pulse bg-bg-primary px-5 pt-32 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="h-10 w-44 rounded-full bg-text-secondary/10" />

                <div className="mt-12 h-5 w-28 rounded-full bg-text-secondary/10" />

                <div className="mt-6 h-12 max-w-xl rounded-xl bg-text-secondary/10 sm:h-16" />

                <div className="mt-6 h-5 max-w-3xl rounded-lg bg-text-secondary/10" />
                <div className="mt-3 h-5 max-w-2xl rounded-lg bg-text-secondary/10" />

                <div className="mt-8 flex gap-3">
                    <div className="h-9 w-24 rounded-full bg-text-secondary/10" />
                    <div className="h-9 w-28 rounded-full bg-text-secondary/10" />
                    <div className="h-9 w-24 rounded-full bg-text-secondary/10" />
                </div>

                <div className="mt-12 aspect-video rounded-3xl bg-bg-card" />

                <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="aspect-video rounded-2xl bg-bg-card" />
                    <div className="aspect-video rounded-2xl bg-bg-card" />
                </div>
            </div>
        </main>
    );
}

export default function ProjectDetailPage({ params }: PageProps) {
    return (
        <Suspense fallback={<ProjectDetailLoading />}>
            <ProjectDetailContent params={params} />
        </Suspense>
    );
}