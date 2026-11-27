import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { api } from "@/lib/api";

export const metadata: Metadata = {
    title: "Contact | Zo Lantosoa",
    description:
        "Contactez Zo Lantosoa pour discuter d'un projet, d'une alternance ou d'une opportunité de collaboration.",
};

export default async function ContactPage() {
    const testimonials = await api.testimonials();

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

            <Contact testimonials={testimonials} />
        </main>
    );
}
