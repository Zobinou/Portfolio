
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
    LayoutDashboard,
    Folder,
    Sparkles,
    Award,
    GraduationCap,
    Briefcase,
    MessageSquare,
    Star,
    LogOut,
    Menu,
    X,
    ChevronRight,
    ExternalLink,
    UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

// ============================================
// NAVIGATION LINKS
// ============================================

const links = [
    {
        title: "PRINCIPAL",
        items: [
            {
                href: "/admin",
                label: "Dashboard",
                Icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "GESTION DU PORTFOLIO",
        items: [
            { href: "/admin/projects", label: "Projets", Icon: Folder },
            { href: "/admin/skills", label: "Compétences", Icon: Sparkles },
            { href: "/admin/qualities", label: "Qualités", Icon: Award },
            { href: "/admin/education", label: "Formation", Icon: GraduationCap },
            { href: "/admin/experience", label: "Expérience", Icon: Briefcase },
            { href: "/admin/testimonials", label: "Témoignages", Icon: Star },
        ],
    },
    {
        title: "COMMUNICATION",
        items: [
            {
                href: "/admin/messages",
                label: "Messages",
                Icon: MessageSquare,
            },
        ],
    },
];

// ============================================
// ADMIN SIDEBAR
// ============================================

export default function AdminSidebar({
    user,
}: {
    user: { name?: string | null; email: string };
}) {
    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    // ========================================
    // LOGOUT
    // ========================================

    const logout = async () => {
        if (loggingOut) return;

        setLoggingOut(true);

        try {
            await authClient.signOut();

            router.replace("/login");
            router.refresh();
        } finally {
            setLoggingOut(false);
        }
    };

    const closeMenu = () => {
        setMobileOpen(false);
    };

    // ========================================
    // SHARED NAVIGATION CONTENT
    // ========================================

    const navigation = (
        <>
            {/* ==================================
                BRAND / LOGO
            ================================== */}

            <Link
                href="/admin"
                onClick={closeMenu}
                className="mb-9 flex items-center gap-3"
            >
                <Image
                    src="/favicon.jpeg"
                    alt="NiriDev Logo"
                    width={44}
                    height={44}
                    priority
                    className="h-11 w-11 shrink-0 rounded-xl border border-border object-cover shadow-lg shadow-primary/10"
                />

                <div className="min-w-0">
                    <p className="text-base font-bold text-text-primary">
                        Admin Panel
                    </p>

                    <p className="text-[11px] text-text-muted">
                        Portfolio Management
                    </p>
                </div>
            </Link>

            {/* ==================================
                NAVIGATION
            ================================== */}

            <nav className="flex-1 space-y-7">

                {links.map((group) => (
                    <div key={group.title}>

                        <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.14em] text-text-muted">
                            {group.title}
                        </p>

                        <div className="space-y-1">

                            {group.items.map(({ href, label, Icon }) => {

                                const active =
                                    href === "/admin"
                                        ? pathname === "/admin"
                                        : pathname === href ||
                                        pathname.startsWith(`${href}/`);

                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={closeMenu}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={`group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all ${active
                                                ? "bg-primary/10 text-primary"
                                                : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">

                                            <Icon
                                                size={18}
                                                className={
                                                    active
                                                        ? "text-primary"
                                                        : "text-text-muted group-hover:text-primary"
                                                }
                                            />

                                            {label}

                                        </span>

                                        {active && (
                                            <ChevronRight size={15} />
                                        )}

                                    </Link>
                                );
                            })}

                        </div>

                    </div>
                ))}

            </nav>

            {/* ==================================
                USER PROFILE AND ACTIONS
            ================================== */}

            <div className="mt-8 border-t border-border pt-5">

                {/* Portfolio link */}

                <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
                >
                    <ExternalLink size={17} />
                    Voir le portfolio
                </Link>

                {/* User information */}

                <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-primary p-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound size={19} />
                    </div>

                    <div className="min-w-0 flex-1">

                        <p className="truncate text-xs font-semibold text-text-primary">
                            {user.name || "Administrateur"}
                        </p>

                        <p className="truncate text-[10px] text-text-muted">
                            {user.email}
                        </p>

                    </div>

                </div>

                {/* Logout */}

                <button
                    type="button"
                    onClick={() => void logout()}
                    disabled={loggingOut}
                    className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <LogOut size={17} />

                    {loggingOut
                        ? "Déconnexion..."
                        : "Déconnexion"
                    }
                </button>

            </div>
        </>
    );

    // ========================================
    // RENDER
    // ========================================

    return (
        <>

            {/* ==================================
                MOBILE TOP BAR
            ================================== */}

            <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-bg-card px-4 md:hidden">

                <Link
                    href="/admin"
                    className="flex items-center gap-2.5 font-bold text-text-primary"
                >
                    <Image
                        src="/favicon.jpeg"
                        alt="NiriDev Logo"
                        width={36}
                        height={36}
                        priority
                        className="h-9 w-9 rounded-lg border border-border object-cover"
                    />

                    Admin Panel
                </Link>

                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Ouvrir le menu"
                    aria-expanded={mobileOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-primary transition-colors hover:border-primary hover:text-primary"
                >
                    <Menu size={20} />
                </button>

            </div>

            {/* ==================================
                DESKTOP SIDEBAR
            ================================== */}

            <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-bg-card p-5 md:flex">
                {navigation}
            </aside>

            {/* ==================================
                MOBILE SIDEBAR
            ================================== */}

            {mobileOpen && (

                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={closeMenu}
                >

                    <aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation administrateur"
                        onClick={(event) => event.stopPropagation()}
                        className="flex h-full w-[min(300px,85vw)] flex-col overflow-y-auto border-r border-border bg-bg-card p-5 shadow-2xl"
                    >

                        <div className="mb-5 flex justify-end">

                            <button
                                type="button"
                                onClick={closeMenu}
                                aria-label="Fermer le menu"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {navigation}

                    </aside>

                </div>
            )}

        </>
    );
}