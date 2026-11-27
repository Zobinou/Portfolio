import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

async function AdminContent({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) redirect('/login')

    return (
        <div className="flex min-h-screen bg-bg-primary">
            <AdminSidebar user={session.user} />
            <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
        </div>
    )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<AdminSkeleton />}>
            <AdminContent>{children}</AdminContent>
        </Suspense>
    )
}

function AdminSkeleton() {
    return (
        <div className="flex min-h-screen bg-bg-primary">
            <div className="hidden w-64 border-r border-border bg-bg-card p-6 md:block">
                <div className="h-6 w-24 animate-pulse rounded bg-text-secondary/10" />
                <div className="mt-8 space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-9 w-full animate-pulse rounded bg-text-secondary/10" />
                    ))}
                </div>
            </div>
            <main className="flex-1 p-6 lg:p-10">
                <div className="h-8 w-48 animate-pulse rounded bg-text-secondary/10" />
            </main>
        </div>
    )
}