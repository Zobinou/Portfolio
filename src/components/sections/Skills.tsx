'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillsData, type Skill } from '@/data/skills'
import FadeIn from '@/components/animations/FadeIn'

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = skill.icon

  return (
    <FadeIn delay={index * 0.05}>
      <div
        ref={ref}
        className="rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-primary/40"
      >
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent-blue text-xl text-white">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-text-primary">{skill.name}</h3>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-text-secondary/10">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-primary to-accent-blue"
            initial={{ width: 0 }}
            animate={{ width: inView ? `${skill.percent}%` : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="mt-2 text-right text-sm text-text-secondary">{skill.percent}%</p>
      </div>
    </FadeIn>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
            My Skills
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
            Technologies que je maîtrise
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {skillsData.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}