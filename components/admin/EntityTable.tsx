"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    RefreshCw,
    X,
    ArrowUpRight,
    Layers3,
    Database,
    FilePlus2,
    AlertCircle,
    Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EntityKey } from "@/lib/admin/schemas";

interface Column {
    key: string;
    label: string;
}

interface Row {
    id: string;
    [key: string]: unknown;
}

interface Props {
    entity: EntityKey;
    title: string;
    columns: Column[];
}

interface EntitySnapshot {
    entity: EntityKey;
    items: Row[];
}

interface LoadError {
    entity: EntityKey;
    message: string;
}

function formatValue(value: unknown): string {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    if (typeof value === "boolean") {
        return value ? "Oui" : "Non";
    }

    if (Array.isArray(value)) {
        return value.map((item) => formatValue(item)).join(", ") || "—";
    }

    if (typeof value === "object") {
        try {
            return JSON.stringify(value) ?? "—";
        } catch {
            return "—";
        }
    }

    return String(value);
}

export default function EntityTable({
    entity,
    title,
    columns,
}: Props) {
    const router = useRouter();
    const [snapshot, setSnapshot] =
        useState<EntitySnapshot | null>(null);
    const [loadError, setLoadError] =
        useState<LoadError | null>(null);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const items = useMemo(
        () =>
            snapshot?.entity === entity
                ? snapshot.items
                : [],
        [snapshot, entity]
    );
    const loading =
        (!snapshot || snapshot.entity !== entity) &&
        (!loadError || loadError.entity !== entity);
    const error =
        loadError?.entity === entity
            ? loadError.message
            : null;

    useEffect(() => {
        let cancelled = false;

        const controller = new AbortController();

        fetch(`/api/admin/${entity}`, {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
        })
            .then(async (response): Promise<Row[] | null> => {
                if (response.status === 401) {
                    if (!cancelled) {
                        router.replace(
                            `/login?callbackUrl=${encodeURIComponent(
                                `/admin/${entity}`
                            )}`
                        );
                    }
                    return null;
                }

                if (!response.ok) {
                    throw new Error(
                        "Erreur lors du chargement des données."
                    );
                }

                const data: unknown = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error(
                        "Le format des données reçu est invalide."
                    );
                }

                return data as Row[];
            })
            .then((data) => {
                if (cancelled || data === null) return;

                setSnapshot({
                    entity,
                    items: data,
                });

                setLoadError(null);
            })
            .catch((err: unknown) => {
                if (
                    cancelled ||
                    (err instanceof Error && err.name === "AbortError")
                ) {
                    return;
                }

                setLoadError({
                    entity,
                    message:
                        err instanceof Error
                            ? err.message
                            : "Une erreur est survenue.",
                });
            });

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [entity, router]);

    const refresh = async () => {
        setRefreshing(true);
        setActionError(null);

        try {
            const response = await fetch(`/api/admin/${entity}`, {
                method: "GET",
                cache: "no-store",
            });

            if (response.status === 401) {
                router.replace(
                    `/login?callbackUrl=${encodeURIComponent(
                        `/admin/${entity}`
                    )}`
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Impossible d'actualiser les données."
                );
            }

            const data: unknown = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Format de données invalide.");
            }

            setSnapshot({
                entity,
                items: data as Row[],
            });

            setLoadError(null);
        } catch (err) {
            setActionError(
                err instanceof Error
                    ? err.message
                    : "Une erreur est survenue."
            );
        } finally {
            setRefreshing(false);
        }
    };

    const filteredItems = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return items;

        return items.filter((row) =>
            columns.some((column) =>
                formatValue(row[column.key])
                    .toLowerCase()
                    .includes(query)
            )
        );
    }, [items, columns, search]);

    const remove = async (id: string) => {
        const confirmed = window.confirm(
            `Voulez-vous vraiment supprimer cet élément de ${title} ? Cette action est irréversible.`
        );

        if (!confirmed) return;

        setDeleting(id);
        setActionError(null);

        try {
            const response = await fetch(
                `/api/admin/${entity}/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.status === 401) {
                router.replace(
                    `/login?callbackUrl=${encodeURIComponent(
                        `/admin/${entity}`
                    )}`
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "La suppression de cet élément a échoué."
                );
            }

            setSnapshot((previous) => {
                if (!previous || previous.entity !== entity) {
                    return previous;
                }

                return {
                    ...previous,
                    items: previous.items.filter(
                        (item) => item.id !== id
                    ),
                };
            });
        } catch (err) {
            setActionError(
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
            <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-text-muted">
                        <Database size={14} />
                        Administration
                        <span>/</span>
                        <span>Gestion du contenu</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                        {title}
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                        Consultez, recherchez et gérez les informations
                        enregistrées dans cette section de votre portfolio.
                    </p>
                </div>
                <Link
                    href={`/admin/${entity}/new`}
                    className="shrink-0"
                >
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un élément
                    </Button>
                </Link>
            </header>

            <section className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-bg-card p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Layers3 size={21} />
                        </div>
                        <span className="text-xs font-medium text-text-muted">
                            Total
                        </span>
                    </div>
                    <p className="mt-4 text-3xl font-bold tabular-nums text-text-primary">
                        {loading ? "—" : items.length}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                        Éléments enregistrés
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-bg-card p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                            <Search size={21} />
                        </div>
                        <span className="text-xs font-medium text-text-muted">
                            Recherche
                        </span>
                    </div>
                    <p className="mt-4 text-3xl font-bold tabular-nums text-text-primary">
                        {loading ? "—" : filteredItems.length}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                        Résultats correspondants
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-bg-card p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                            <FilePlus2 size={21} />
                        </div>
                        <span className="text-xs font-medium text-text-muted">
                            Structure
                        </span>
                    </div>
                    <p className="mt-4 text-3xl font-bold tabular-nums text-text-primary">
                        {columns.length}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                        Colonnes d&apos;informations
                    </p>
                </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-border bg-bg-card">
                <div className="flex flex-col justify-between gap-4 border-b border-border p-5 lg:flex-row lg:items-center">
                    <div>
                        <h2 className="font-semibold text-text-primary">
                            Liste des éléments
                        </h2>
                        <p className="mt-1 text-xs text-text-muted">
                            {loading
                                ? "Chargement des données..."
                                : `${filteredItems.length} élément(s) affiché(s) sur ${items.length}`
                            }
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative flex-1">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder={`Rechercher dans ${title.toLowerCase()}...`}
                                aria-label={`Rechercher dans ${title}`}
                                className="h-10 w-full rounded-xl border border-border bg-bg-primary pl-10 pr-9 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-primary sm:w-72"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Effacer la recherche"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-primary"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => void refresh()}
                            disabled={refreshing || loading}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RefreshCw
                                size={15}
                                className={
                                    refreshing ? "animate-spin" : ""
                                }
                            />
                            Actualiser
                        </button>
                    </div>
                </div>

                {(error || actionError) && (
                    <div
                        role="alert"
                        className="m-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500"
                    >
                        <AlertCircle
                            size={18}
                            className="mt-0.5 shrink-0"
                        />
                        <div className="flex-1">
                            <p className="font-semibold">
                                Une erreur est survenue
                            </p>
                            <p className="mt-1">
                                {error || actionError}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setActionError(null);
                                void refresh();
                            }}
                            className="text-xs font-semibold underline"
                        >
                            Réessayer
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="space-y-4 p-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-20 animate-pulse rounded-xl bg-text-secondary/10"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="px-5 py-16 text-center">
                        <AlertCircle
                            size={32}
                            className="mx-auto text-red-500"
                        />
                        <p className="mt-4 font-semibold text-text-primary">
                            Impossible de charger les données
                        </p>
                        <button
                            type="button"
                            onClick={() => void refresh()}
                            className="mt-4 text-sm font-semibold text-primary hover:underline"
                        >
                            Réessayer
                        </button>
                    </div>

                ) : filteredItems.length > 0 ? (
                    <>
                        <div className="hidden overflow-x-auto lg:block">
                            <table className="w-full min-w-175 text-sm">
                                <thead className="border-b border-border bg-bg-primary/60">
                                    <tr>
                                        {columns.map((column) => (
                                            <th
                                                key={column.key}
                                                scope="col"
                                                className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary"
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                        <th
                                            scope="col"
                                            className="w-32 px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-text-secondary"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-border">
                                    {filteredItems.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="group transition-colors hover:bg-primary/2.5"
                                        >
                                            {columns.map((column) => (
                                                <td
                                                    key={column.key}
                                                    className="max-w-xs px-5 py-4 text-text-secondary"
                                                >
                                                    <span
                                                        className="block truncate"
                                                        title={formatValue(row[column.key])}
                                                    >
                                                        {formatValue(row[column.key])}
                                                    </span>
                                                </td>
                                            ))}

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/${entity}/${row.id}`}
                                                        aria-label={`Modifier ${row.id}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                                                    >
                                                        <Pencil size={15} />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => void remove(row.id)}
                                                        disabled={deleting === row.id}
                                                        aria-label={`Supprimer ${row.id}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                                                    >
                                                        {deleting === row.id ? (
                                                            <RefreshCw
                                                                size={15}
                                                                className="animate-spin"
                                                            />
                                                        ) : (
                                                            <Trash2 size={15} />
                                                        )}
                                                    </button>
                                                    <Link
                                                        href={`/admin/${entity}/${row.id}`}
                                                        aria-label={`Ouvrir ${row.id}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                                                    >
                                                        <ArrowUpRight size={15} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-3 p-4 lg:hidden">

                            {filteredItems.map((row, index) => (
                                <article
                                    key={row.id}
                                    className="rounded-xl border border-border bg-bg-primary/40 p-4"
                                >
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Layers3 size={19} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs text-text-muted">
                                                    Élément {index + 1}
                                                </p>
                                                <p className="truncate text-xs font-medium text-text-secondary">
                                                    ID : {row.id}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowUpRight
                                            size={16}
                                            className="shrink-0 text-text-muted"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        {columns.map((column) => (
                                            <div
                                                key={column.key}
                                                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-3 border-t border-border/60 pt-3"
                                            >
                                                <span className="text-xs font-medium text-text-muted">
                                                    {column.label}
                                                </span>
                                                <span className="wrap-break-word text-right text-sm text-text-primary">
                                                    {formatValue(row[column.key])}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex gap-2 border-t border-border/60 pt-4">
                                        <Link
                                            href={`/admin/${entity}/${row.id}`}
                                            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary"
                                        >
                                            <Pencil size={15} />
                                            Modifier
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => void remove(row.id)}
                                            disabled={deleting === row.id}
                                            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/20 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                                        >
                                            {deleting === row.id ? (
                                                <RefreshCw
                                                    size={15}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <Trash2 size={15} />
                                            )}
                                            Supprimer
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            {search ? (
                                <Search size={27} />
                            ) : (
                                <Inbox size={27} />
                            )}
                        </div>
                        <h3 className="mt-4 font-semibold text-text-primary">
                            {search
                                ? "Aucun résultat trouvé"
                                : `Aucun élément dans ${title.toLowerCase()}`
                            }
                        </h3>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">
                            {search
                                ? "Essayez avec un autre terme de recherche."
                                : "Commencez à enrichir votre portfolio en ajoutant votre premier élément."
                            }
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
                                href={`/admin/${entity}/new`}
                                className="mt-5 inline-block"
                            >
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajouter un élément
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}