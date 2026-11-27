"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Users,
  Layers,
  Rocket,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/animations/StaggerGroup";

const stats = [
  {
    Icon: Code2,
    value: "5+",
    label: "Projets réalisés",
    description: "Des idées transformées en solutions.",
  },
  {
    Icon: Users,
    value: "3+",
    label: "Projets en équipe",
    description: "Collaboration et partage.",
  },
  {
    Icon: Layers,
    value: "10+",
    label: "Technologies",
    description: "Un environnement technique varié.",
  },
  {
    Icon: Rocket,
    value: "100%",
    label: "Passion & Dévotion",
    description: "Motivation et apprentissage continu.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-20 lg:px-10">

        <FadeIn direction="right">
          <div className="relative text-center md:text-left">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                About Me
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-[3.25rem]">
              Je suis passionnée par la création de{" "}
              <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                solutions digitales
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-text-secondary sm:text-base sm:leading-9 md:mx-0">
              Étudiante en L2 informatique à la Haute École d&apos;Informatique
              (HEI), je me spécialise en développement frontend. J&apos;aime
              transformer des idées en interfaces modernes, accessibles et
              performantes. Actuellement à la recherche d&apos;une alternance,
              je souhaite mettre mes compétences au service de projets concrets
              tout en continuant à apprendre au quotidien.
            </p>

            <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-2xl border border-border/70 bg-bg-card/70 p-4 text-left shadow-sm backdrop-blur-sm md:mx-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Rocket className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-text-primary">
                  Toujours prête à apprendre
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                  Curiosité, créativité et amélioration continue.
                </p>
              </div>
            </div>

            <div className="mt-9 flex justify-center md:justify-start">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="group h-12 gap-3 rounded-xl px-6 text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/30"
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5">
          {stats.map((stat) => {
            const Icon = stat.Icon;

            return (
              <StaggerItem key={stat.label}>
                <div className="group relative flex h-full min-h-47.5 flex-col overflow-hidden rounded-3xl border border-border/70 bg-bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-6">

                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-opacity duration-500 group-hover:bg-primary/15"
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-text-secondary/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  <div className="relative mt-6">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-sm font-bold text-text-primary">
                      {stat.label}
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                      {stat.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-accent-blue transition-all duration-500 group-hover:w-full" />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}