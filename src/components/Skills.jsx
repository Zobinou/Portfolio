import { useEffect, useRef, useState } from 'react'
import { skillsData } from '../data/skillsData'

// Hook IntersectionObserver : détecte quand l'élément entre dans le viewport
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

function SkillCard({ skill }) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/5 bg-bg-card p-6 transition-colors hover:border-accent-purple/40"
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue text-xl text-white">
          <skill.icon />
        </div>
        <h3 className="font-semibold text-white">{skill.name}</h3>
      </div>

      {/* Barre de progression animée au scroll */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue transition-[width] duration-1000 ease-out"
          style={{ width: inView ? `${skill.percent}%` : '0%' }}
        />
      </div>
      <p className="mt-2 text-right text-sm text-gray-400">{skill.percent}%</p>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:text-xs">
            My Skills
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Technologies I Master
          </h2>
        </div>

        {/* Grille : 1 colonne mobile, 3 colonnes desktop */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {skillsData.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
