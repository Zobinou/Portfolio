import type { Metadata } from "next";
import { Suspense } from "react";

import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import { api } from "@/lib/api";

export const metadata: Metadata = {
    title: "À propos | Niritsiafoy Lantosoa",
    description:
        "Découvrez le parcours, la formation et l'expérience professionnelle de Niritsiafoy Lantosoa.",
};

async function AboutContent() {
    const [educationResult, experienceResult] = await Promise.all([
        api.education().catch((error) => {
            console.error("[About] Erreur lors du chargement des formations :", error);
            return undefined;
        }),

        api.experience().catch((error) => {
            console.error(
                "[About] Erreur lors du chargement des expériences :",
                error
            );
            return undefined;
        }),
    ]);

    return (
        <div className="pt-12">
            <About />

            <Education education={educationResult} />

            <Experience experience={experienceResult} />
        </div>
    );
}

function AboutLoading() {
    return (
        <main className="min-h-screen space-y-16 px-5 pb-20 pt-32 sm:px-8">
            <div className="mx-auto max-w-7xl animate-pulse">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div className="space-y-5">
                        <div className="h-7 w-36 rounded-full bg-text-secondary/10" />
                        <div className="h-12 max-w-lg rounded-xl bg-text-secondary/10" />
                        <div className="h-5 max-w-xl rounded-lg bg-text-secondary/10" />
                        <div className="h-5 max-w-md rounded-lg bg-text-secondary/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-40 rounded-3xl border border-border bg-bg-card"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function AboutPage() {
    return (
        <Suspense fallback={<AboutLoading />}>
            <AboutContent />
        </Suspense>
    );
}