
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FolderKanban,
    Sparkles,
    Award,
    GraduationCap,
    BriefcaseBusiness,
    MessageSquareQuote,
    Plus,
    ArrowUpRight,
    ExternalLink,
    RefreshCw,
    LayoutDashboard,
    Layers3,
    Activity,
    Code2,
    Eye,
    Star,
} from "lucide-react";

interface DashboardData {
    stats: {
        projects: number;
        featuredProjects: number;
        skills: number;
        qualities: number;
        education: number;
        experience: number;
        testimonials: number;
    };
    distribution: {
        name: string;
        value: number;
    }[];
    technologies: {
        name: string;
        count: number;
    }[];
    recentProjects: {
        id: string;
        titre: string;
        slug: string;
        description: string;
        numero: string;
        technologies: string[];
        featured: boolean | null;
    }[];
}

const sections = [
    {
        title: "Projets",
        key: "projects",
        description: "Réalisations du portfolio",
        href: "/admin/projects",
        Icon: FolderKanban,
    },
    {
        title: "Compétences",
        key: "skills",
        description: "Technologies et savoir-faire",
        href: "/admin/skills",
        Icon: Sparkles,
    },
    {
        title: "Qualités",
        key: "qualities",
        description: "Qualités professionnelles",
        href: "/admin/qualities",
        Icon: Award,
    },
    {
        title: "Formations",
        key: "education",
        description: "Parcours académique",
        href: "/admin/education",
        Icon: GraduationCap,
    },
    {
        title: "Expériences",
        key: "experience",
        description: "Parcours professionnel",
        href: "/admin/experience",
        Icon: BriefcaseBusiness,
    },
    {
        title: "Témoignages",
        key: "testimonials",
        description: "Retours et recommandations",
        href: "/admin/testimonials",
        Icon: MessageSquareQuote,
    },
] as const;

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    href,
}: {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="group rounded-2xl border border-border bg-bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
        >
            <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={21} />
                </div>
                <ArrowUpRight
                    size={18}
                    className="text-text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                />
            </div>

            <p className="mt-5 text-sm font-medium text-text-secondary">
                {title}
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
                {value}
            </p>

            <p className="mt-2 text-xs text-text-muted">{description}</p>
        </Link>
    );
}

function TechnologyChart({
    data,
}: {
    data: DashboardData["technologies"];
}) {
    const maximum = Math.max(...data.map((item) => item.count), 1);

    if (!data.length) {
        return (
            <div className="flex min-h-48 items-center justify-center text-sm text-text-muted">
                Aucune technologie enregistrée.
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {data.map((item) => (
                <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-medium text-text-primary">
                            {item.name}
                        </span>
                        <span className="text-xs font-semibold tabular-nums text-text-secondary">
                            {item.count} projet{item.count > 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-bg-primary">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-700"
                            style={{
                                width: `${(item.count / maximum) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function DistributionChart({
    data,
}: {
    data: DashboardData["distribution"];
}) {
    const colors = [
        "#6366f1",
        "#06b6d4",
        "#10b981",
        "#f59e0b",
        "#ec4899",
        "#8b5cf6",
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    let currentAngle = 0;

    const gradient = data
        .filter((item) => item.value > 0)
        .map((item) => {
            const start = currentAngle;
            const percentage = (item.value / Math.max(total, 1)) * 100;
            currentAngle += percentage;

            return `${colors[data.indexOf(item)]} ${start}% ${currentAngle}%`;
        })
        .join(", ");

    return (
        <div className="flex flex-col items-center gap-7 sm:flex-row">
            <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            total > 0
                                ? `conic-gradient(${gradient})`
                                : "var(--chart-empty, #64748b22)",
                    }}
                />
                <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-bg-card">
                    <span className="text-3xl font-bold text-text-primary">
                        {total}
                    </span>
                    <span className="mt-1 text-xs text-text-muted">
                        Éléments
                    </span>
                </div>
            </div>

            <div className="w-full flex-1 space-y-3">
                {data.map((item, index) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between gap-3"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: colors[index] }}
                            />
                            <span className="text-sm text-text-secondary">
                                {item.name}
                            </span>
                        </div>
                        <span className="text-sm font-semibold tabular-nums text-text-primary">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const router = useRouter();

    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDashboard = useCallback(async () => {
        try {
            const response = await fetch("/api/admin/dashboard", {
                cache: "no-store",
            });

            if (response.status === 401) {
                router.replace("/login?callbackUrl=/admin");
                return;
            }

            if (!response.ok) {
                throw new Error("Impossible de charger les statistiques.");
            }

            const result: DashboardData = await response.json();
            setData(result);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Une erreur est survenue."
            );
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void loadDashboard();
        }, 0);

        return () => window.clearTimeout(timer);
    }, [loadDashboard]);

    if (loading && !data) {
        return (
            <div className="space-y-7">
                <div className="h-10 w-64 animate-pulse rounded-lg bg-text-secondary/10" />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-40 animate-pulse rounded-2xl border border-border bg-bg-card"
                        />
                    ))}
                </div>
                <div className="h-72 animate-pulse rounded-2xl bg-text-secondary/10" />
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                <Activity className="mx-auto mb-3 text-red-500" size={32} />
                <h2 className="font-semibold text-text-primary">
                    Impossible de charger le dashboard
                </h2>
                <p className="mt-2 text-sm text-text-secondary">{error}</p>
                <button
                    onClick={() => {
                        setLoading(true);
                        setError(null);
                        void loadDashboard();
                    }}
                    className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="mx-auto w-full max-w-[1600px] space-y-8 pb-10">
            <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-text-muted">
                        <LayoutDashboard size={14} />
                        Administration
                        <span>/</span>
                        Dashboard
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                        Tableau de bord
                    </h1>

                    <p className="mt-2 text-sm text-text-secondary">
                        Vue d&apos;ensemble de votre portfolio et de son contenu.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => {
                            setLoading(true);
                            setError(null);
                            void loadDashboard();
                        }}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-primary/40 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                        Actualiser
                    </button>

                    <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90"
                    >
                        <Plus size={17} />
                        Nouveau projet
                    </Link>
                </div>
            </header>

            {/* Welcome banner */}
            <section className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <Sparkles size={13} />
                            Espace administrateur
                        </div>

                        <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                            Gérez votre portfolio en toute simplicité.
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
                            Retrouvez toutes vos informations, gérez vos réalisations
                            et maintenez votre présence professionnelle à jour.
                        </p>
                    </div>

                    <Link
                        href="/"
                        target="_blank"
                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-border px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary sm:self-center"
                    >
                        <Eye size={17} />
                        Voir le portfolio
                        <ExternalLink size={14} />
                    </Link>
                </div>
            </section>

            {/* Main statistics */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-text-primary">
                            Vue générale
                        </h2>
                        <p className="mt-1 text-xs text-text-muted">
                            Nombre d&apos;éléments enregistrés dans votre portfolio.
                        </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Données réelles
                    </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {sections.map(({ title, key, description, href, Icon }) => (
                        <StatCard
                            key={key}
                            title={title}
                            value={data.stats[key]}
                            description={
                                key === "projects"
                                    ? `${data.stats.featuredProjects} mis en avant`
                                    : description
                            }
                            icon={Icon}
                            href={href}
                        />
                    ))}
                </div>
            </section>

            {/* Charts */}
            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-text-primary">
                        Analyse du contenu
                    </h2>
                    <p className="mt-1 text-xs text-text-muted">
                        Visualisation de la composition de votre portfolio.
                    </p>
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-bg-card p-5 sm:p-6">
                        <div className="mb-7 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-text-primary">
                                    Répartition des contenus
                                </h3>
                                <p className="mt-1 text-xs text-text-muted">
                                    Ensemble des éléments enregistrés
                                </p>
                            </div>
                            <Layers3 className="text-primary" size={21} />
                        </div>

                        <DistributionChart data={data.distribution} />
                    </div>

                    <div className="rounded-2xl border border-border bg-bg-card p-5 sm:p-6">
                        <div className="mb-7 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-text-primary">
                                    Technologies utilisées
                                </h3>
                                <p className="mt-1 text-xs text-text-muted">
                                    Nombre de projets par technologie
                                </p>
                            </div>
                            <Code2 className="text-primary" size={21} />
                        </div>

                        <TechnologyChart data={data.technologies} />
                    </div>
                </div>
            </section>

            {/* Recent projects and quick actions */}
            <section className="grid gap-5 xl:grid-cols-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-bg-card xl:col-span-2">
                    <div className="flex items-center justify-between border-b border-border p-5">
                        <div>
                            <h3 className="font-semibold text-text-primary">
                                Projets enregistrés
                            </h3>
                            <p className="mt-1 text-xs text-text-muted">
                                Aperçu de vos projets
                            </p>
                        </div>

                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                            Tout voir
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>

                    {data.recentProjects.length > 0 ? (
                        <div className="divide-y divide-border">
                            {data.recentProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/admin/projects/${project.id}`}
                                    className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-primary/5"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                                            {project.numero || "PR"}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-text-primary">
                                                {project.titre}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-text-muted">
                                                /{project.slug}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                        {project.featured && (
                                            <span className="hidden items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-500 sm:inline-flex">
                                                <Star size={11} />
                                                Vedette
                                            </span>
                                        )}
                                        <ArrowUpRight
                                            size={17}
                                            className="text-text-muted"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <FolderKanban
                                className="mx-auto mb-3 text-text-muted"
                                size={32}
                            />
                            <p className="font-medium text-text-primary">
                                Aucun projet pour le moment
                            </p>
                            <p className="mt-1 text-sm text-text-muted">
                                Commencez par ajouter votre première réalisation.
                            </p>
                            <Link
                                href="/admin/projects/new"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                            >
                                <Plus size={16} />
                                Ajouter un projet
                            </Link>
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-border bg-bg-card p-5">
                    <h3 className="font-semibold text-text-primary">
                        Actions rapides
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">
                        Accédez rapidement à la gestion de votre contenu.
                    </p>

                    <div className="mt-5 space-y-2">
                        {[
                            {
                                label: "Ajouter un projet",
                                href: "/admin/projects/new",
                                Icon: FolderKanban,
                            },
                            {
                                label: "Gérer les compétences",
                                href: "/admin/skills",
                                Icon: Sparkles,
                            },
                            {
                                label: "Ajouter une formation",
                                href: "/admin/education",
                                Icon: GraduationCap,
                            },
                            {
                                label: "Gérer les expériences",
                                href: "/admin/experience",
                                Icon: BriefcaseBusiness,
                            },
                            {
                                label: "Consulter les messages",
                                href: "/admin/messages",
                                Icon: MessageSquareQuote,
                            },
                        ].map(({ label, href, Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="group flex items-center justify-between rounded-xl border border-border p-3 transition-all hover:border-primary/40 hover:bg-primary/5"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={17} className="text-primary" />
                                    <span className="text-sm font-medium text-text-primary">
                                        {label}
                                    </span>
                                </div>
                                <ArrowUpRight
                                    size={15}
                                    className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}