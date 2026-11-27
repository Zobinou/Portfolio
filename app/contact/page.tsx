import type { Metadata } from "next";
import { Suspense } from "react";

import Contact from "@/components/sections/Contact";
import { api } from "@/lib/api";

export const metadata: Metadata = {
    title: "Contact | Zo Lantosoa",
    description:
        "Contactez Zo Lantosoa pour discuter d'un projet, d'une alternance ou d'une opportunité de collaboration.",
};

async function ContactContent() {
    const testimonials = await api.testimonials().catch((error) => {
        console.error(
            "[Contact] Erreur de chargement des témoignages :",
            error
        );

        return undefined;
    });

    return <Contact testimonials={testimonials} />;
}

function ContactLoading() {
    return (
        <div className="mx-auto max-w-7xl animate-pulse px-5 py-20 sm:px-8 md:py-28">
            <div className="mx-auto h-10 max-w-md rounded-xl bg-text-secondary/10" />
            <div className="mx-auto mt-5 h-5 max-w-xl rounded-lg bg-text-secondary/10" />

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                    <div className="h-48 rounded-3xl border border-border bg-bg-card" />
                    <div className="h-36 rounded-3xl border border-border bg-bg-card" />
                </div>

                <div className="h-137.5 rounded-3xl border border-border bg-bg-card" />
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="relative isolate min-h-screen overflow-hidden pt-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-[55%] -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
            />

            <Suspense fallback={<ContactLoading />}>
                <ContactContent />
            </Suspense>
        </main>
    );
}