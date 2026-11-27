"use client";

import { useEffect } from "react";
import {
    AlertTriangle,
    Home,
    RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface GlobalErrorProps {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}

export default function GlobalError({
    error,
    reset,
}: GlobalErrorProps) {
    useEffect(() => {
        console.error("Global Application Error:", error);
    }, [error]);

    return (
        <html lang="fr">
            <body className="bg-[#0b1020] font-sans text-white antialiased">
                <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10">
                        <AlertTriangle className="h-9 w-9 text-cyan-400" />
                    </div>

                    <span className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                        Erreur globale
                    </span>

                    <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
                        Une erreur inattendue !
                    </h1>

                    <p className="mt-5 max-w-md text-sm leading-8 text-slate-400 sm:text-base">
                        L&apos;application a rencontré un problème inattendu.
                        Veuillez réessayer ou retourner à l&apos;accueil.
                    </p>

                    {error.digest && (
                        <p className="mt-4 text-xs text-slate-500">
                            Référence : {error.digest}
                        </p>
                    )}

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={() => reset()}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Réessayer
                        </button>

                        <Link
                            href="/"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold transition-colors hover:bg-white/10"
                        >
                            <Home className="h-4 w-4" />
                            Retour à l&apos;accueil
                        </Link>
                    </div>
                </main>
            </body>
        </html>
    );
}
