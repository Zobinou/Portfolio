'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    LayoutDashboard, Folder, Sparkles, Award,
    GraduationCap, Briefcase, MessageSquare, Star, LogOut
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

const links = [
    { href: '/admin', label: 'Dashboard', Icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projets', Icon: Folder },
    { href: '/admin/skills', label: 'Compétences', Icon: Sparkles },
    { href: '/admin/qualities', label: 'Qualités', Icon: Award },
    { href: '/admin/education', label: 'Formation', Icon: GraduationCap },
    { href: '/admin/experience', label: 'Expérience', Icon: Briefcase },
    { href: '/admin/testimonials', label: 'Témoignages', Icon: Star },
    { href: '/admin/messages', label: 'Messages', Icon: MessageSquare },
]

export default function AdminSidebar({ user }: { user: { name?: string | null; email: string } }) {
    const pathname = usePathname()
    const router = useRouter()

    const logout = async () => {
        await authClient.signOut()
        router.push('/login')
    }

    return (
        <aside className="hidden w-64 flex-col border-r border-border bg-bg-card p-6 md:flex">
            <Link href="/admin" className="mb-8 flex items-center gap-2 text-lg font-bold text-text-primary">
                <span className="text-primary">&lt;/&gt;</span> Admin
            </Link>
            <nav className="flex-1 space-y-1">
                {links.map(({ href, label, Icon }) => {
                    const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${active
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Link>
                    )
                })}
            </nav>
            <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs text-text-muted">{user.email}</p>
                <Button variant="ghost" size="sm" onClick={logout} className="mt-2 w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" /> Déconnexion
                </Button>
            </div>
        </aside>
    )
}