import { FaCode, FaUsers, FaLayerGroup, FaRocket } from 'react-icons/fa'

const stats = [
  { Icon: FaCode, value: '5+', label: 'Projects Completed' },
  { Icon: FaUsers, value: '3+', label: 'Team Projects' },
  { Icon: FaLayerGroup, value: '6', label: 'Technologies' },
  { Icon: FaRocket, value: '100%', label: 'Passion & Dedication' },
]

function goTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        {/* Gauche */}
        <div className="text-center md:text-left">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:text-xs">
            About Me
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            I&apos;m passionate about creating digital solutions
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-gray-400 sm:text-base">
            Étudiante en L2 informatique à la Haute École d&apos;Informatique (HEI), je me
            spécialise en développement frontend. J&apos;aime transformer des idées en interfaces
            modernes, accessibles et performantes. Actuellement à la recherche d&apos;une
            alternance, je souhaite mettre mes compétences au service de projets concrets tout en
            continuant à apprendre au quotidien.
          </p>
          <button
            onClick={() => goTo('contact')}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent-purple px-7 py-3 text-sm font-semibold text-accent-purple transition-colors hover:bg-accent-purple hover:text-white"
          >
            Learn More About Me
          </button>
        </div>

        {/* Droite : grille de stats 2x2 */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center gap-4 ${
                i % 2 === 0 ? 'sm:border-r sm:border-white/10 sm:pr-8' : 'sm:pl-8'
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-purple/15 text-xl text-accent-purple">
                <stat.Icon />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white md:text-3xl">{stat.value}</p>
                <p className="text-xs text-gray-400 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
