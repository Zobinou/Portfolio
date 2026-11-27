'use client';

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { FaGithub } from 'react-icons/fa'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const params = useSearchParams()
    const callbackUrl = params.get('callbackUrl') ?? '/admin'

    const signIn = async () => {
        setLoading(true)

        await authClient.signIn.social({
            provider: 'github',
            callbackURL: callbackUrl,
        })
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-bg-primary px-4">
            <Link
                href="/"
                className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/80 px-4 py-2.5 text-sm font-medium text-text-secondary shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary sm:left-8 sm:top-8"
            >
                <ArrowLeft className="h-4 w-4" />
                <Home className="h-4 w-4" />
                <span>Retour à l&apos;accueil</span>
            </Link>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-bg-card p-8 shadow-xl"
            >
                <div className="text-center">
                    <h1 className="font-display text-2xl font-bold text-text-primary">
                        Admin Access
                    </h1>
                    <p className="mt-2 text-sm text-text-secondary">
                        Connectez-vous avec GitHub pour gérer le portfolio
                    </p>
                </div>
                <Button
                    onClick={signIn}
                    disabled={loading}
                    className="w-full"
                    size="lg"
                >
                    <FaGithub className="mr-2 h-5 w-5" />
                    {loading ? 'Redirection...' : 'Continuer avec GitHub'}
                </Button>
                <p className="text-center text-xs text-text-muted">
                    Seul le compte autorisé peut se connecter.
                </p>
            </motion.div>
        </div>
    )
}