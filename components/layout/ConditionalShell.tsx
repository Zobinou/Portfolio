'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BabylonScene from '@/components/3d/BabylonScene'
import AdminBackground from '@/components/3d/AdminBackground'

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminOrAuth =
        pathname.startsWith('/admin') || pathname.startsWith('/login')

    return (
        <>
            {isAdminOrAuth ? (
                <AdminBackground />
            ) : (
                <>
                    <div className="fixed inset-0 -z-10 pointer-events-none opacity-60 dark:opacity-40">
                        <BabylonScene />
                    </div>
                    <div className="fixed inset-0 -z-10 bg-bg-primary/50 backdrop-blur-[2px] pointer-events-none" />
                </>
            )}

            <div className="relative z-10 min-h-screen">
                {isAdminOrAuth ? (
                    children
                ) : (
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                )}
            </div>
        </>
    )
}