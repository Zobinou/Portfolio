"use client";

import {
  GraduationCap,
  CalendarDays,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import { educationData as staticData } from "@/data/education";
import FadeIn from "@/components/animations/FadeIn";

export interface EducationItem {
  periode: string;
  titre: string;
  organisation: string;
  lieu: string;
  current?: boolean;
}

export default function Education({
  education,
}: {
  education?: EducationItem[];
}) {
  const data = education?.length ? education : staticData;

  return (
    <section
      id="education"
      className="relative isolate scroll-mt-20 overflow-hidden border-y border-border/40 bg-bg-secondary/20 py-20 md:py-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}
        <FadeIn direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <GraduationCap className="h-4 w-4 text-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                Education
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Ma formation{" "}
              <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                académique
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Les différentes étapes de mon parcours académique,
              à travers lesquelles je développe mes connaissances
              et mes compétences.
            </p>
          </div>
        </FadeIn>

        {/* EDUCATION TIMELINE */}
        <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
          <div className="relative space-y-6 sm:space-y-8">

            {/* Timeline line */}
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-4.25 top-8 w-px bg-linear-to-b from-primary via-accent-blue to-transparent sm:left-4.75"
            />

            {data.map((edu, index) => (
              <FadeIn
                key={`${edu.periode}-${edu.titre}-${index}`}
                delay={index * 0.1}
                direction="left"
              >
                <div className="group relative pl-12 sm:pl-16">

                  {/* Timeline marker */}
                  <div className="absolute left-0 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-bg-secondary bg-primary text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <GraduationCap className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>

                  {/* Education card */}
                  <article className="relative overflow-hidden rounded-3xl border border-border/70 bg-bg-card/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7">

                    {/* Card decoration */}
                    <div
                      aria-hidden="true"
                      className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-colors duration-500 group-hover:bg-primary/10"
                    />

                    <div className="relative">

                      {/* Period and status */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {edu.periode}
                        </span>

                        {edu.current && (
                          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                            En cours
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="mt-5 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-xl">
                            {edu.titre}
                          </h3>

                          <p className="mt-2 text-sm font-semibold leading-relaxed text-text-secondary sm:text-base">
                            {edu.organisation}
                          </p>
                        </div>

                        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-text-secondary/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                      </div>

                      {/* Location */}
                      <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-text-secondary sm:text-sm">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span>{edu.lieu}</span>
                      </div>
                    </div>

                    {/* Bottom accent */}
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