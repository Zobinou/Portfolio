import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) redirect('/login')
    return (
        <div className="flex min-h-screen bg-bg-primary">
            <AdminSidebar user={session.user} />
            <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
        </div>
    )
}