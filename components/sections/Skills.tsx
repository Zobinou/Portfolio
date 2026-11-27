"use client";

import { createElement, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Sparkles,
  ArrowUpRight,
  Layers3,
} from "lucide-react";

import { skillsData } from "@/data/skills";
import { getIcon, getIconName } from "@/lib/icon-map";
import FadeIn from "@/components/animations/FadeIn";

export interface SkillItem {
  name: string;
  percent: number;
  icon: string;
}

function SkillCard({
  skill,
  index,
}: {
  skill: SkillItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const percent = Math.min(100, Math.max(0, skill.percent));

  return (
    <FadeIn delay={index * 0.06}>
      <article
        ref={ref}
        className="group relative flex h-full min-h-51.25 flex-col overflow-hidden rounded-3xl border border-border/70 bg-bg-card/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-colors duration-500 group-hover:bg-primary/15"
        />

        {/* Card header */}
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {/* Technology icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent-blue text-white shadow-lg shadow-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              {createElement(getIcon(skill.icon), {
                className: "h-6 w-6",
                "aria-hidden": true,
              })}
            </div>

            <h3 className="truncate text-base font-bold text-text-primary sm:text-lg">
              {skill.name}
            </h3>
          </div>

          <ArrowUpRight className="h-5 w-5 shrink-0 text-text-secondary/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        <div className="relative mt-auto pt-8">
          <div className="mb-3 flex items-end justify-between gap-3">
            <span className="text-xs font-medium text-text-secondary">
              Niveau de maîtrise
            </span>

            <span className="font-display text-2xl font-extrabold tracking-tight text-text-primary">
              {percent}
              <span className="ml-0.5 text-sm font-bold text-primary">%</span>
            </span>
          </div>

          <div
            role="progressbar"
            aria-label={`Niveau de maîtrise de ${skill.name}`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2.5 w-full overflow-hidden rounded-full bg-text-secondary/10"
          >
            <motion.div
              className="relative h-full rounded-full bg-linear-to-r from-primary to-accent-blue"
              initial={{ width: "0%" }}
              animate={{
                width: inView ? `${percent}%` : "0%",
              }}
              transition={{
                duration: 1.3,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-white/20"
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-accent-blue transition-all duration-500 group-hover:w-full" />
      </article>
    </FadeIn>
  );
}

export default function Skills({
  skills,
}: {
  skills?: SkillItem[];
}) {
  const data: SkillItem[] = skills?.length
    ? skills
    : skillsData.map((skill) => ({
      name: skill.name,
      percent: skill.percent,
      icon: getIconName(skill.icon),
    }));

  return (
    <section
      id="skills"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <FadeIn direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Code2 className="h-4 w-4 text-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                My Skills
              </span>
            </div>

            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Technologies que je{" "}
              <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                maîtrise
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-text-secondary sm:text-base sm:leading-9">
              Un ensemble de compétences techniques et d&apos;outils
              que je développe et mobilise pour concevoir des solutions
              numériques modernes, performantes et adaptées aux besoins.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg-card/80 px-4 py-2 shadow-sm">
              <Layers3 className="h-4 w-4 text-primary" />

              <span className="text-xs font-semibold text-text-secondary">
                {data.length} compétences présentées
              </span>

              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>
        </FadeIn>

        {data.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {data.map((skill, index) => (
              <SkillCard
                key={`${skill.name}-${index}`}
                skill={skill}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-3xl border border-border bg-bg-card p-10 text-center">
            <Code2 className="mx-auto h-10 w-10 text-primary/50" />

            <p className="mt-4 text-sm text-text-secondary">
              Les compétences seront bientôt disponibles.
            </p>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-3 opacity-60">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-primary" />
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="h-px w-12 bg-linear-to-l from-transparent to-primary" />
        </div>
      </div>
    </section>
  );
}