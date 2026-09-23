import { FaBriefcase } from 'react-icons/fa'
import { experienceData } from '../data/experienceData'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:text-xs">
            <FaBriefcase /> Experience
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            My Professional Journey
          </h2>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative space-y-10">
            {/* Ligne verticale */}
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded-full bg-gradient-to-b from-accent-purple to-accent-blue"
            />

            {experienceData.map((exp, i) => (
              <div key={i} className="relative pl-10">
                {/* Point */}
                <span
                  aria-hidden
                  className="absolute top-1 left-0 h-4 w-4 rounded-full bg-accent-purple ring-4 ring-accent-purple/20"
                />
                <div className="rounded-2xl border border-white/5 bg-bg-card p-6 transition-colors hover:border-accent-purple/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent-purple">
                      {exp.periode}
                    </span>
                    {exp.current && (
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-400">
                        Présent
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {exp.titre}
                    {exp.organisation && (
                      <span className="font-normal text-gray-400"> · {exp.organisation}</span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
