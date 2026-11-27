"use client";

import {
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";
import { qualities as staticQualities } from "@/data/qualities";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/animations/StaggerGroup";
import FadeIn from "@/components/animations/FadeIn";

export default function Qualities({
  qualities,
}: {
  qualities?: string[];
}) {
  const data = qualities?.length ? qualities : staticQualities;

  return (
    <section
      id="qualities"
      className="relative isolate scroll-mt-20 overflow-hidden border-y border-border/40 bg-bg-secondary/20 py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <FadeIn direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <HeartHandshake className="h-4 w-4 text-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                My Qualities
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Ce que j&apos;apporte{" "}
              <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                à chaque projet
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-text-secondary sm:text-base sm:leading-9">
              Au-delà des compétences techniques, mes qualités humaines
              contribuent à ma manière de travailler, de collaborer et
              d&apos;aborder chaque nouveau défi.
            </p>
          </div>
        </FadeIn>

        {data.length > 0 ? (
          <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
            {data.map((quality, index) => (
              <StaggerItem key={`${quality}-${index}`}>
                <article className="group relative flex min-h-36.25 h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-bg-card/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-colors duration-500 group-hover:bg-primary/15"
                  />

                  <div className="relative flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <span className="font-display text-sm font-bold tracking-widest text-text-secondary/30 transition-colors duration-300 group-hover:text-primary/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mt-7 flex items-start justify-between gap-3">
                    <h3 className="text-sm font-bold leading-relaxed text-text-primary transition-colors duration-300 group-hover:text-primary sm:text-base">
                      {quality}
                    </h3>

                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-text-secondary/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-accent-blue transition-all duration-500 group-hover:w-full" />
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <div className="mt-14 rounded-3xl border border-border bg-bg-card p-10 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-primary/50" />

            <p className="mt-4 text-sm text-text-secondary">
              Les qualités humaines seront bientôt disponibles.
            </p>
          </div>
        )}

        <FadeIn direction="up">
          <div className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 text-center">
            <Sparkles className="h-5 w-5 shrink-0 text-primary" />

            <p className="text-xs font-medium leading-relaxed text-text-secondary sm:text-sm">
              Des compétences qui évoluent, une motivation qui grandit.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}