import type { Metadata } from "next";
import { Suspense } from "react";
import Skills from "@/components/sections/Skills";
import { api } from "@/lib/api";

export const metadata: Metadata = {
    title: "Compétences | Zo Lantosoa",
    description:
        "Découvrez les compétences techniques, les technologies maîtrisées et les qualités humaines de Zo Lantosoa.",
};

async function SkillsContent() {
    const skills = await api.skills().catch((error) => {
        console.error("[Skills] Erreur de chargement des compétences :", error);
        return undefined;
    });

    return <Skills skills={skills} />;
}

function SkillsLoading() {
    return (
        <div className="mx-auto max-w-7xl animate-pulse px-5 py-20 sm:px-8 md:py-28">
            <div className="mx-auto h-8 w-40 rounded-full bg-text-secondary/10" />
            <div className="mx-auto mt-5 h-12 max-w-md rounded-xl bg-text-secondary/10" />
            <div className="mx-auto mt-4 h-5 max-w-xl rounded-lg bg-text-secondary/10" />

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-52 rounded-3xl border border-border bg-bg-card"
                    />
                ))}
            </div>
        </div>
    );
}

export default function SkillsPage() {
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

            <Suspense fallback={<SkillsLoading />}>
                <SkillsContent />
            </Suspense>
        </main>
    );
}