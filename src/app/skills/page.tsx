import type { Metadata } from "next";
import Skills from "@/components/sections/Skills";
import { api } from "@/lib/api";

export const metadata: Metadata = {
    title: "Compétences | Zo Lantosoa",
    description:
        "Découvrez les compétences techniques, les technologies maîtrisées et les qualités humaines de Zo Lantosoa.",
};

export default async function SkillsPage() {
    const [skills] = await Promise.all([
        api.skills(),
    ]);

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

            <Skills skills={skills} />
        </main>
    );
}