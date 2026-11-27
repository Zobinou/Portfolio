import type { Metadata } from "next";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Qualities from "@/components/sections/Qualities";
import { api } from "@/lib/api";

export const metadata: Metadata = {
    title: "À propos | Zo Lantosoa",
    description:
        "Découvrez le parcours, la formation académique et les expériences professionnelles de Zo Lantosoa.",
};

export default async function AboutPage() {
    const [education, experience, qualities] = await Promise.all([
        api.education(),
        api.experience(),
        api.qualities(),
    ]);

    return (
        <main className="relative min-h-screen overflow-hidden pt-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-40 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[120px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-[55%] -z-10 h-96 w-96 rounded-full bg-accent-blue/5 blur-[120px]"
            />

            <About />

            <Education education={education} />

            <Experience experience={experience} />

            <Qualities qualities={qualities.map((quality) => quality.label)} />
        </main>
    );
}