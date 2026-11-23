'use client'

import { Briefcase } from 'lucide-react'
import { experienceData } from '@/data/experience'
import FadeIn from '@/components/animations/FadeIn'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
            <Briefcase className="h-4 w-4" /> Experience
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
            Mon parcours professionnel
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative space-y-10">
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-1.75 w-0.5 rounded-full bg-linear-to-b from-primary to-accent-blue"
            />

            {experienceData.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="left">
                <div className="relative pl-10">
                  <span
                    aria-hidden
                    className="absolute top-1 left-0 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20"
                  />
                  <div className="rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-primary/40">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {exp.periode}
                      </span>
                      {exp.current && (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                          Présent
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-text-primary">
                      {exp.titre}
                      {exp.organisation && (
                        <span className="font-normal text-text-secondary">
                          {' '}· {exp.organisation}
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}