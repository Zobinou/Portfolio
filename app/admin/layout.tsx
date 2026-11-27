import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminBackground from "@/components/3d/AdminBackground";

export const metadata: Metadata = {
    title: "Admin Dashboard de Zo Lantosoa | Data, technologie et innovation numérique",
    description:
        "Section admin pour la gestion du Portfolio de Zo Lantosoa",
    icons: {
        icon: [
            {
                url: "/favicon.jpeg",
                type: "image/jpeg",
            },
        ],
        shortcut: "/favicon.jpeg",
        apple: [
            {
                url: "/favicon.jpeg",
                type: "image/jpeg",
            },
        ],
    },
};

async function AdminContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="relative z-10 flex min-h-screen">
            <AdminSidebar user={session.user} />

            <main className="min-w-0 flex-1 overflow-y-auto bg-bg-primary/25 p-6 backdrop-blur-[1px] lg:p-10">
                {children}
            </main>
        </div>
    );
}

function AdminSkeleton() {
    return (
        <div className="relative z-10 flex min-h-screen">
            <div className="hidden w-64 border-r border-border bg-bg-card/80 p-6 backdrop-blur-xl md:block">
                <div className="h-6 w-24 animate-pulse rounded bg-text-secondary/10" />

                <div className="mt-8 space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-9 w-full animate-pulse rounded bg-text-secondary/10"
                        />
                    ))}
                </div>
            </div>

            <main className="flex-1 bg-bg-primary/25 p-6 backdrop-blur-[1px] lg:p-10">
                <div className="h-8 w-48 animate-pulse rounded bg-text-secondary/10" />
            </main>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative isolate min-h-screen">
            {/* Background 3D */}
            <AdminBackground />

            {/* Dashboard */}
            <Suspense fallback={<AdminSkeleton />}>
                <AdminContent>{children}</AdminContent>
            </Suspense>
        </div>
    );
}