
"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import {
    Search,
    RefreshCw,
    Mail,
    MailOpen,
    Inbox,
    Check,
    Clock,
    MessageSquare,
    CalendarDays,
    CircleCheck,
    AlertCircle,
    X,
    ArrowUpRight,
    Send,
    Filter,
} from "lucide-react";
import Link from "next/link";

interface Msg {
    id: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
    createdAt: string;
}

type MessageFilter = "all" | "unread" | "read";

function formatDate(date: string): string {
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "Date inconnue";
    }

    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(value);
}

function formatTime(date: string): string {
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(value);
}

function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "?";
}

function MessageCard({
    message,
    updating,
    onToggleRead,
}: {
    message: Msg;
    updating: boolean;
    onToggleRead: (id: string, read: boolean) => void;
}) {
    const isUnread = !message.read;

    return (
        <article
            className={`group relative overflow-hidden rounded-2xl border bg-bg-card transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 ${isUnread
                ? "border-primary/35"
                : "border-border hover:border-primary/25"
                }`}
        >
            {isUnread && (
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
            )}
            <div className="p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex min-w-0 items-start gap-3">
                        <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${isUnread
                                ? "bg-primary/10 text-primary"
                                : "bg-bg-primary text-text-secondary"
                                }`}
                        >
                            {getInitials(message.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="wrap-break-word font-semibold text-text-primary">
                                    {message.name}
                                </h3>
                                {isUnread && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        Nouveau
                                    </span>
                                )}
                                {!isUnread && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-500">
                                        <Check size={11} />
                                        Lu
                                    </span>
                                )}
                            </div>

                            <Link
                                href={`mailto:${message.email}`}
                                className="mt-1 inline-flex max-w-full items-center gap-1.5 break-all text-xs text-text-secondary transition-colors hover:text-primary"
                            >
                                <Mail size={13} className="shrink-0" />
                                {message.email}
                                <ArrowUpRight size={11} className="shrink-0" />
                            </Link>
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs text-text-muted sm:flex-col sm:items-end sm:gap-1">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={13} />
                            {formatDate(message.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock size={13} />
                            {formatTime(message.createdAt)}
                        </span>
                    </div>
                </div>
                <div className="mt-5 rounded-xl border border-border/70 bg-bg-primary/40 p-4 sm:p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-text-secondary">
                        <MessageSquare size={14} className="text-primary" />
                        Contenu du message
                    </div>
                    <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-text-secondary">
                        {message.message}
                    </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href={`mailto:${message.email}`}
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-medium text-text-secondary transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                        <Send size={15} />
                        Répondre
                    </Link>
                    <button
                        type="button"
                        onClick={() =>
                            onToggleRead(message.id, !message.read)
                        }
                        disabled={updating}
                        className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${isUnread
                            ? "bg-primary text-white hover:opacity-90"
                            : "border border-border text-text-secondary hover:border-primary hover:bg-primary/5 hover:text-primary"
                            }`}
                    >
                        {updating ? (
                            <RefreshCw
                                size={15}
                                className="animate-spin"
                            />
                        ) : isUnread ? (
                            <MailOpen size={15} />
                        ) : (
                            <Mail size={15} />
                        )}
                        {updating
                            ? "Mise à jour..."
                            : isUnread
                                ? "Marquer comme lu"
                                : "Marquer non lu"
                        }
                    </button>
                </div>
            </div>
        </article>
    );
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    color,
}: {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
    color: "primary" | "amber" | "emerald";
}) {
    const colorClasses = {
        primary: "bg-primary/10 text-primary",
        amber: "bg-amber-500/10 text-amber-500",
        emerald: "bg-emerald-500/10 text-emerald-500",
    };

    return (
        <div className="rounded-2xl border border-border bg-bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClasses[color]}`}>
                    <Icon size={21} />
                </div>
                <span className="text-xs font-medium text-text-muted">
                    Messages
                </span>
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums tracking-tight text-text-primary">
                {value}
            </p>
            <p className="mt-1 text-sm font-medium text-text-secondary">
                {title}
            </p>
            <p className="mt-1 text-xs text-text-muted">
                {description}
            </p>
        </div>
    );
}

function MessageSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-2xl border border-border bg-bg-card p-5"
                >
                    <div className="flex gap-3">
                        <div className="h-12 w-12 animate-pulse rounded-xl bg-text-secondary/10" />
                        <div className="flex-1 space-y-2 pt-1">
                            <div className="h-4 w-36 animate-pulse rounded bg-text-secondary/10" />
                            <div className="h-3 w-52 animate-pulse rounded bg-text-secondary/10" />
                        </div>
                    </div>
                    <div className="mt-5 space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-text-secondary/10" />
                        <div className="h-3 w-5/6 animate-pulse rounded bg-text-secondary/10" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-text-secondary/10" />
                    </div>
                    <div className="mt-5 flex justify-between">
                        <div className="h-10 w-28 animate-pulse rounded-xl bg-text-secondary/10" />
                        <div className="h-10 w-36 animate-pulse rounded-xl bg-text-secondary/10" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function MessagesPage() {
    const router = useRouter();

    const [items, setItems] = useState<Msg[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<MessageFilter>("all");

    useEffect(() => {
        let cancelled = false;

        const controller = new AbortController();

        fetch("/api/admin/messages", {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
        })
            .then(async (response): Promise<Msg[] | null> => {
                if (response.status === 401) {
                    if (!cancelled) {
                        router.replace(
                            "/login?callbackUrl=/admin/messages"
                        );
                    }

                    return null;
                }

                if (!response.ok) {
                    throw new Error(
                        "Impossible de récupérer les messages."
                    );
                }

                const data: unknown = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error(
                        "Le format des messages reçu est invalide."
                    );
                }

                return data as Msg[];
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

    const refresh = async () => {
        setRefreshing(true);
        setError(null);

        try {
            const response = await fetch(
                "/api/admin/messages",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            if (response.status === 401) {
                router.replace(
                    "/login?callbackUrl=/admin/messages"
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Impossible d'actualiser les messages."
                );
            }

            const data: unknown = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Format des messages invalide.");
            }

            setItems(data as Msg[]);
            setError(null);

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Une erreur est survenue."
            );
        } finally {
            setRefreshing(false);
        }
    };

    const markRead = async (id: string, read: boolean) => {
        setUpdatingId(id);
        setError(null);

        try {
            const response = await fetch(
                `/api/admin/messages/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ read }),
                }
            );

            if (response.status === 401) {
                router.replace(
                    "/login?callbackUrl=/admin/messages"
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Impossible de modifier le statut du message."
                );
            }

            setItems((previous) =>
                previous.map((message) =>
                    message.id === id
                        ? { ...message, read }
                        : message
                )
            );

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Une erreur est survenue."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const unreadCount = useMemo(
        () => items.filter((message) => !message.read).length,
        [items]
    );

    const readCount = items.length - unreadCount;

    const filteredMessages = useMemo(() => {
        const query = search.trim().toLowerCase();

        return items.filter((message) => {

            const matchesFilter =
                filter === "all" ||
                (filter === "unread" && !message.read) ||
                (filter === "read" && message.read);

            const matchesSearch =
                !query ||
                message.name.toLowerCase().includes(query) ||
                message.email.toLowerCase().includes(query) ||
                message.message.toLowerCase().includes(query);

            return matchesFilter && matchesSearch;
        });
    }, [items, filter, search]);

    const filters: {
        key: MessageFilter;
        label: string;
        count: number;
    }[] = [
            {
                key: "all",
                label: "Tous",
                count: items.length,
            },
            {
                key: "unread",
                label: "Non lus",
                count: unreadCount,
            },
            {
                key: "read",
                label: "Lus",
                count: readCount,
            },
        ];

    return (
        <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-10">
            <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-text-muted">
                        <Inbox size={14} />
                        Administration
                        <span>/</span>
                        Communication
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                        Messages
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                        Consultez les messages envoyés depuis votre portfolio,
                        suivez leur statut et contactez directement leurs expéditeurs.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => void refresh()}
                    disabled={refreshing || loading}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-4 text-sm font-medium text-text-secondary transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <RefreshCw
                        size={16}
                        className={
                            refreshing ? "animate-spin" : ""
                        }
                    />
                    Actualiser
                </button>
            </header>

            <section className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-7">
                <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <MessageSquare size={27} />
                        </div>
                        <div>
                            <div className="mb-1 flex items-center gap-2">
                                <h2 className="text-lg font-bold text-text-primary">
                                    Centre de messagerie
                                </h2>
                                <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                                    Administration
                                </span>
                            </div>
                            <p className="text-sm text-text-secondary">
                                Centralisez et gérez toutes les demandes de contact.
                            </p>
                        </div>
                    </div>

                    <div className="relative flex items-center gap-3 rounded-xl border border-border bg-bg-primary/60 px-4 py-3">
                        <div className="relative">
                            <Mail size={20} className="text-primary" />
                            {unreadCount > 0 && (
                                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-bg-primary bg-red-500" />
                            )}
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">
                                Messages en attente
                            </p>
                            <p className="text-lg font-bold tabular-nums text-text-primary">
                                {unreadCount}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-text-primary">
                        Vue générale
                    </h2>

                    <p className="mt-1 text-xs text-text-muted">
                        Suivi de votre activité de communication.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <StatCard
                        title="Total des messages"
                        value={items.length}
                        description="Tous les messages reçus"
                        icon={Inbox}
                        color="primary"
                    />

                    <StatCard
                        title="Messages non lus"
                        value={unreadCount}
                        description="Messages nécessitant votre attention"
                        icon={Mail}
                        color="amber"
                    />

                    <StatCard
                        title="Messages lus"
                        value={readCount}
                        description="Messages déjà consultés"
                        icon={CircleCheck}
                        color="emerald"
                    />
                </div>
            </section>

            <section className="space-y-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="text-lg font-bold text-text-primary">
                            Boîte de réception
                        </h2>
                        <p className="mt-1 text-xs text-text-muted">
                            {filteredMessages.length} message(s) affiché(s)
                            sur {items.length}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-bg-card p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="mr-1 flex items-center gap-2 text-xs font-semibold text-text-muted">
                                <Filter size={14} />
                                Filtrer :
                            </div>

                            {filters.map((item) => {
                                const active = filter === item.key;
                                return (
                                    <button
                                        key={item.key}
                                        type="button"
                                        onClick={() =>
                                            setFilter(item.key)
                                        }
                                        className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition-all ${active
                                            ? "bg-primary text-white shadow-sm shadow-primary/20"
                                            : "border border-border text-text-secondary hover:border-primary/40 hover:text-primary"
                                            }`}
                                    >
                                        {item.label}
                                        <span
                                            className={`rounded-md px-1.5 py-0.5 text-[10px] tabular-nums ${active
                                                ? "bg-white/20 text-white"
                                                : "bg-bg-primary text-text-muted"
                                                }`}
                                        >
                                            {item.count}
                                        </span>
                                    </button>
                                );
                            })}

                        </div>
                        <div className="relative w-full lg:max-w-sm">
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
                                placeholder="Rechercher un message..."
                                aria-label="Rechercher un message"
                                className="h-10 w-full rounded-xl border border-border bg-bg-primary pl-10 pr-9 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-primary"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Effacer la recherche"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500"
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
                                {error}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => void refresh()}
                            className="text-xs font-semibold underline"
                        >
                            Réessayer
                        </button>
                    </div>
                )}

                {loading ? (
                    <MessageSkeleton />
                ) : error && items.length === 0 ? (
                    <div className="rounded-2xl border border-border bg-bg-card px-5 py-16 text-center">
                        <AlertCircle
                            size={32}
                            className="mx-auto text-red-500"
                        />
                        <h3 className="mt-4 font-semibold text-text-primary">
                            Impossible de charger les messages
                        </h3>
                        <button
                            type="button"
                            onClick={() => void refresh()}
                            className="mt-4 text-sm font-semibold text-primary hover:underline"
                        >
                            Réessayer
                        </button>
                    </div>

                ) : filteredMessages.length > 0 ? (
                    <div className="space-y-4">
                        {filteredMessages.map((message) => (
                            <MessageCard
                                key={message.id}
                                message={message}
                                updating={updatingId === message.id}
                                onToggleRead={markRead}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-border bg-bg-card px-5 py-16 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">

                            {search ? (
                                <Search size={28} />
                            ) : filter === "unread" ? (
                                <MailOpen size={28} />
                            ) : filter === "read" ? (
                                <CircleCheck size={28} />
                            ) : (
                                <Inbox size={28} />
                            )}

                        </div>

                        <h3 className="mt-4 font-semibold text-text-primary">
                            {search
                                ? "Aucun résultat trouvé"
                                : filter === "unread"
                                    ? "Aucun message non lu"
                                    : filter === "read"
                                        ? "Aucun message lu"
                                        : "Votre boîte de réception est vide"
                            }
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">
                            {search
                                ? "Essayez de rechercher avec un autre nom, une adresse e-mail ou un mot-clé."
                                : "Les messages envoyés depuis le formulaire de contact de votre portfolio apparaîtront ici."
                            }
                        </p>

                        {(search || filter !== "all") && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setFilter("all");
                                }}
                                className="mt-5 text-sm font-semibold text-primary hover:underline"
                            >
                                Réinitialiser les filtres
                            </button>
                        )}

                    </div>

                )}

            </section>

        </div>
    );
}