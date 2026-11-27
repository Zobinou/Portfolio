'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FaGithub } from 'react-icons/fa';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import AdminBackground from '@/components/3d/AdminBackground';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const params = useSearchParams();
    const callbackUrl = params.get('callbackUrl') ?? '/admin';

    const signIn = async () => {
        setLoading(true);

        try {
            await authClient.signIn.social({
                provider: 'github',
                callbackURL: callbackUrl,
            });
        } catch (error) {
            console.error('Erreur de connexion GitHub :', error);
            setLoading(false);
        }
    };

    return (
        <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary/20 px-4">
            <AdminBackground />
            <Link
                href="/"
                className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/80 px-4 py-2.5 text-sm font-medium text-text-secondary shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary sm:left-8 sm:top-8"
            >
                <ArrowLeft className="h-4 w-4" />
                <Home className="h-4 w-4" />
                <span>Retour à l&apos;accueil</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 w-full max-w-md space-y-6 rounded-2xl border border-border/70 bg-bg-card/80 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl"
                />

                <div className="text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-lg shadow-primary/10">
                        <FaGithub className="h-7 w-7" />
                    </div>

                    <h1 className="font-display text-2xl font-bold text-text-primary">
                        Admin Access
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                        Connectez-vous avec GitHub pour gérer le portfolio.
                    </p>
                </div>

                <Button
                    onClick={signIn}
                    disabled={loading}
                    className="w-full"
                    size="lg"
                >
                    <FaGithub className="mr-2 h-5 w-5" />

                    {loading
                        ? 'Redirection...'
                        : 'Continuer avec GitHub'}
                </Button>

                <p className="text-center text-xs text-text-muted">
                    Seul le compte autorisé peut se connecter.
                </p>
            </motion.div>
        </main>
    );
}