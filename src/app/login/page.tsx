'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { FaGithub } from 'react-icons/fa'
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
        <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-bg-card p-8 shadow-xl"
            >
                <div className="text-center">
                    <h1 className="font-display text-2xl font-bold text-text-primary">Admin Access</h1>
                    <p className="mt-2 text-sm text-text-secondary">
                        Connectez-vous avec GitHub pour gérer le portfolio
                    </p>
                </div>
                <Button onClick={signIn} disabled={loading} className="w-full" size="lg">
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