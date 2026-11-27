"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
    AlertTriangle,
    ArrowLeft,
    Home,
    RefreshCw,
    Sparkles,
} from "lucide-react";

interface ErrorPageProps {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}

export default function ErrorPage({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error("Application Error:", error);
    }, [error]);

    return (
        <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary px-6 py-16 text-center">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
            />

            <div className="relative mx-auto w-full max-w-lg">
                <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/20 to-accent-blue/20 blur-xl" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-bg-card shadow-xl shadow-primary/10">
                        <AlertTriangle className="h-9 w-9 text-primary" />
                    </div>
                    <Sparkles className="absolute -right-3 -top-2 h-6 w-6 text-accent-blue" />
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    Une erreur est survenue
                </span>

                <h1 className="font-display mt-7 text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
                    Oups ! Quelque chose{" "}
                    <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                        s&apos;est mal passé.
                    </span>
                </h1>

                <p className="mx-auto mt-5 max-w-md text-sm leading-8 text-text-secondary sm:text-base">
                    Une erreur inattendue est survenue lors du chargement de cette page.
                    Vous pouvez réessayer ou retourner à la page d&apos;accueil.
                </p>

                {error.digest && (
                    <p className="mt-5 text-xs text-text-secondary/60">
                        Référence : {error.digest}
                    </p>
                )}

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                        Réessayer
                    </button>

                    <Link
                        href="/"
                        className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-border bg-bg-card px-6 text-sm font-semibold text-text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <Home className="h-4 w-4" />
                        Retour à l&apos;accueil
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    </Link>
                </div>

                <div className="mt-14 flex items-center justify-center gap-3 opacity-50">
                    <span className="h-px w-10 bg-linear-to-r from-transparent to-primary" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
                        Une expérience numérique
                    </span>

                    <span className="h-px w-10 bg-linear-to-l from-transparent to-primary" />
                </div>
            </div>
        </main>
    );
}