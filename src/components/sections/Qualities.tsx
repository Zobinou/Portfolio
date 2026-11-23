'use client'

import { qualities } from '@/data/qualities'
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup'
import FadeIn from '@/components/animations/FadeIn'

export default function Qualities() {
  return (
    <section className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <FadeIn>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
            My Qualities
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
            Ce que j&apos;apporte
          </h2>
        </FadeIn>

        <StaggerGroup className="mt-10 flex flex-wrap justify-center gap-3">
          {qualities.map((quality) => (
            <StaggerItem key={quality}>
              <span className="inline-block cursor-default rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium text-primary transition-all hover:bg-linear-to-r hover:from-primary hover:to-accent-blue hover:text-white">
                {quality}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}