"use client";

import {
  Briefcase,
  CalendarDays,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { experienceData as staticData } from "@/data/experience";
import FadeIn from "@/components/animations/FadeIn";

export interface ExperienceItem {
  periode: string;
  titre: string;
  organisation?: string | null;
  description: string;
  current?: boolean;
}

export default function Experience({
  experience,
}: {
  experience?: ExperienceItem[];
}) {
  const data = experience?.length ? experience : staticData;

  return (
    <section
      id="experience"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <FadeIn direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Briefcase className="h-4 w-4 text-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                Experience
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Mon parcours{" "}
              <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                professionnel
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Mes expériences professionnelles, les projets auxquels
              j&apos;ai contribué et les compétences développées au fil
              de mon parcours.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
          <div className="relative space-y-6 sm:space-y-8">

            <span
              aria-hidden="true"
              className="absolute bottom-8 left-4.25 top-8 w-px bg-linear-to-b from-primary via-accent-blue to-transparent sm:left-4.75"
            />

            {data.map((exp, index) => (
              <FadeIn
                key={`${exp.periode}-${exp.titre}-${index}`}
                delay={index * 0.1}
                direction="left"
              >
                <div className="group relative pl-12 sm:pl-16">

                  <div className="absolute left-0 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-bg-primary bg-accent-blue text-white shadow-lg shadow-accent-blue/20 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <Briefcase className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>

                  <article className="relative overflow-hidden rounded-3xl border border-border/70 bg-bg-card/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7">

                    <div
                      aria-hidden="true"
                      className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-blue/5 blur-3xl transition-colors duration-500 group-hover:bg-accent-blue/15"
                    />

                    <div className="relative">

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {exp.periode}
                        </span>

                        {exp.current && (
                          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                            Présent
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-xl">
                          {exp.titre}
                        </h3>

                        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-text-secondary/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                      </div>

                      {exp.organisation && (
                        <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-xl border border-border/60 bg-bg-secondary/60 px-3 py-2">
                          <Building2 className="h-4 w-4 shrink-0 text-primary" />
                          <span className="truncate text-sm font-semibold text-text-secondary">
                            {exp.organisation}
                          </span>
                        </div>
                      )}

                      <p className="mt-5 text-sm leading-8 text-text-secondary sm:text-base">
                        {exp.description}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-accent-blue transition-all duration-500 group-hover:w-full" />
                  </article>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}