'use client'

import Link from 'next/link'
import { Code2, Users, Layers, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup'

const stats = [
  { Icon: Code2, value: '5+', label: 'Projets réalisés' },
  { Icon: Users, value: '3+', label: 'Projets en équipe' },
  { Icon: Layers, value: '10+', label: 'Technologies' },
  { Icon: Rocket, value: '100%', label: 'Passion & Dévotion' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        <FadeIn direction="right">
          <div className="text-center md:text-left">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
              About Me
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-4xl">
              Je suis passionnée par la création de solutions digitales
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary sm:text-base">
              Étudiante en L2 informatique à la Haute École d&apos;Informatique (HEI),
              je me spécialise en développement frontend. J&apos;aime transformer des
              idées en interfaces modernes, accessibles et performantes. Actuellement à
              la recherche d&apos;une alternance, je souhaite mettre mes compétences au
              service de projets concrets tout en continuant à apprendre au quotidien.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button>En savoir plus</Button>
            </Link>
          </div>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <div
                className={`flex items-center gap-4 ${
                  i % 2 === 0
                    ? 'sm:border-r sm:border-border sm:pr-8'
                    : 'sm:pl-8'
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
                  <stat.Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-text-primary md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-secondary sm:text-sm">{stat.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}