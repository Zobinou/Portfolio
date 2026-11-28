"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    Trash2,
    Pencil,
    Search,
    FolderKanban,
    Star,
    ArrowUpRight,
    RefreshCw,
    Layers3,
    X,
    Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
    id: string;
    slug: string;
    titre: string;
    description: string;
    numero?: string;
    typeProjet?: string | null;
    typeApplication?: string | null;
    technologies?: string[];
    featured?: boolean | null;
}

const projectTypeLabels: Record<string, string> = {
    PERSONNEL: "Personnel",
    SCOLAIRE: "Scolaire",
    ENTREPRISE: "Entreprise",
    OPEN_SOURCE: "Open source",
    INSTITUTIONNEL: "Institutionnel",
};

const applicationTypeLabels: Record<string, string> = {
    WEB: "Application web",
    MOBILE: "Application mobile",
    DESKTOP: "Application desktop",
    API: "API / Backend",
    LIBRARY: "Bibliothèque",
    GAME: "Jeu",
    OTHER: "Autre",
};

export default function AdminProjects() {
    const router = useRouter();

    const [items, setItems] = useState<Project[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Chargement initial
    useEffect(() => {
        let cancelled = false;

        const controller = new AbortController();

        fetch("/api/admin/projects", {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
        })
            .then(async (response): Promise<Project[] | null> => {
                if (response.status === 401) {
                    router.replace(
                        "/login?callbackUrl=/admin/projects"
                    );

                    return null;
                }

                if (!response.ok) {
                    throw new Error(
                        "Erreur lors du chargement des projets."
                    );
                }

                return (await response.json()) as Project[];
            })
            .then((data) => {
                if (cancelled || data === null) return;

                setItems(data);
                setError(null);
            })
            .catch((err: unknown) => {
                if (
                    cancelled ||
                    (err instanceof Error && err.name === "AbortError")
                ) {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Une erreur est survenue."
                );
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [router]);

    // Actualiser la liste
    const refresh = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/admin/projects", {
                method: "GET",
                cache: "no-store",
            });

            if (response.status === 401) {
                router.replace(
                    "/login?callbackUrl=/admin/projects"
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Impossible d'actualiser les projets."
                );
            }

            const data: Project[] = await response.json();

            setItems(data);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Une erreur est survenue."
            );
        } finally {
            setLoading(false);
        }
    };

    // Recherche par titre, slug, description, type et technologie
    const filteredItems = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return items;

        return items.filter((project) => {
            const projectType = project.typeProjet
                ? projectTypeLabels[project.typeProjet] ??
                  project.typeProjet
                : "";

            const applicationType = project.typeApplication
                ? applicationTypeLabels[project.typeApplication] ??
                  project.typeApplication
                : "";

            return (
                project.titre.toLowerCase().includes(query) ||
                project.slug.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                projectType.toLowerCase().includes(query) ||
                applicationType.toLowerCase().includes(query) ||
                project.technologies?.some((tech) =>
                    tech.toLowerCase().includes(query)
                )
            );
        });
    }, [items, search]);

    const featuredCount = items.filter(
        (item) => item.featured
    ).length;

    // Supprimer un projet
    const remove = async (id: string) => {
        const confirmed = window.confirm(
            "Voulez-vous vraiment supprimer ce projet ? Cette action est irréversible."
        );

        if (!confirmed) return;

        setDeleting(id);

        try {
            const response = await fetch(
                `/api/admin/projects/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.status === 401) {
                router.replace(
                    "/login?callbackUrl=/admin/projects"
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "La suppression du projet a échoué."
                );
            }

            setItems((previous) =>
                previous.filter(
                    (project) => project.id !== id
                )
            );
        } catch (err) {
            window.alert(
                err instanceof Error
                    ? err.message
                    : "Une erreur est survenue."
            );
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-10">

            {/* En-tête */}
            <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-2 text-xs font-medium text-text-muted">
                        Administration / Contenu
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                        Gestion des projets
                    </h1>

                    <p className="mt-2 text-sm text-text-secondary">
                        Gérez, organisez et mettez à jour les réalisations de votre portfolio.
                    </p>
                </div>

                <Link href="/admin/projects/new">
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Nouveau projet
                    </Button>
                </Link>
            </header>

            {/* Statistiques */}
            <section className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FolderKanban size={23} />
                    </div>

                    <div>
                        <p className="text-sm text-text-secondary">
                            Total des projets
                        </p>

                        <p className="mt-1 text-2xl font-bold text-text-primary">
                            {items.length}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                        <Star size={23} />
                    </div>

                    <div>
                        <p className="text-sm text-text-secondary">
                            Projets mis en avant
                        </p>

                        <p className="mt-1 text-2xl font-bold text-text-primary">
                            {featuredCount}
                        </p>
                    </div>
                </div>
            </section>

            {/* Liste des projets */}
            <section className="overflow-hidden rounded-2xl border border-border bg-bg-card">

                {/* Barre de recherche */}
                <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-semibold text-text-primary">
                            Tous les projets
                        </h2>

                        <p className="mt-1 text-xs text-text-muted">
                            {filteredItems.length} résultat(s)
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Rechercher un projet..."
                                aria-label="Rechercher un projet"
                                className="h-10 w-full rounded-xl border border-border bg-bg-primary pl-10 pr-9 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-primary sm:w-72"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                                    aria-label="Effacer la recherche"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => void refresh()}
                            disabled={loading}
                            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-3 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                        >
                            <RefreshCw
                                size={15}
                                className={
                                    loading ? "animate-spin" : ""
                                }
                            />
                            Actualiser
                        </button>
                    </div>
                </div>

                {/* Erreur */}
                {error && (
                    <div
                        role="alert"
                        className="m-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500"
                    >
                        {error}

                        <button
                            type="button"
                            onClick={() => void refresh()}
                            className="ml-2 font-semibold underline"
                        >
                            Réessayer
                        </button>
                    </div>
                )}

                {/* Chargement */}
                {loading ? (
                    <div className="space-y-3 p-5">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-28 animate-pulse rounded-xl bg-text-secondary/10"
                            />
                        ))}
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="divide-y divide-border">

                        {filteredItems.map((project) => (
                            <article
                                key={project.id}
                                className="group flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-primary/5 sm:flex-row sm:items-center"
                            >
                                {/* Informations */}
                                <div className="flex min-w-0 items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                                        {project.numero || (
                                            <Layers3 size={19} />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-semibold text-text-primary">
                                                {project.titre}
                                            </h3>

                                            {project.featured && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-500">
                                                    <Star size={10} />
                                                    Vedette
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1 truncate text-xs text-text-muted">
                                            /{project.slug}
                                        </p>

                                        {/* Classifications */}
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {project.typeProjet && (
                                                <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                                                    {projectTypeLabels[project.typeProjet] ??
                                                        project.typeProjet}
                                                </span>
                                            )}

                                            {project.typeApplication && (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 px-2.5 py-1 text-[10px] font-semibold text-accent-blue">
                                                    <Monitor size={11} />

                                                    {applicationTypeLabels[project.typeApplication] ??
                                                        project.typeApplication}
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-text-secondary">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        {project.technologies &&
                                            project.technologies.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {project.technologies
                                                        .slice(0, 5)
                                                        .map((tech, index) => (
                                                            <span
                                                                key={`${tech}-${index}`}
                                                                className="rounded-md border border-border bg-bg-primary px-2 py-1 text-[10px] font-medium text-text-secondary"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}

                                                    {project.technologies.length > 5 && (
                                                        <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] text-primary">
                                                            +{project.technologies.length - 5}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        aria-label={`Modifier ${project.titre}`}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                                    >
                                        <Pencil size={16} />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            void remove(project.id)
                                        }
                                        disabled={deleting === project.id}
                                        aria-label={`Supprimer ${project.titre}`}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {deleting === project.id ? (
                                            <RefreshCw
                                                size={16}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                    </button>

                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        aria-label={`Ouvrir ${project.titre}`}
                                        className="hidden h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white sm:flex"
                                    >
                                        <ArrowUpRight size={17} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    /* Liste vide */
                    <div className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            {search ? (
                                <Search size={27} />
                            ) : (
                                <FolderKanban size={27} />
                            )}
                        </div>

                        <h3 className="mt-4 font-semibold text-text-primary">
                            {search
                                ? "Aucun résultat trouvé"
                                : "Votre liste de projets est vide"}
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted">
                            {search
                                ? "Essayez avec un autre titre, un type ou une technologie."
                                : "Ajoutez votre première réalisation pour commencer à construire votre portfolio."}
                        </p>

                        {search ? (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="mt-5 text-sm font-semibold text-primary hover:underline"
                            >
                                Effacer la recherche
                            </button>
                        ) : (
                            <Link
                                href="/admin/projects/new"
                                className="mt-5 inline-block"
                            >
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajouter mon premier projet
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}