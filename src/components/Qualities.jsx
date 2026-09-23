const qualities = [
  'Créativité',
  "Capacité d'adaptation",
  'Excellentes compétences relationnelles',
  "Esprit d'équipe",
  'Sérieuse',
]

export default function Qualities() {
  return (
    <section id="qualities" className="scroll-mt-20 bg-bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:text-xs">
          My Qualities
        </span>
        <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          What I Bring to the Table
        </h2>

        {/* Badges arrondis */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {qualities.map((quality) => (
            <span
              key={quality}
              className="cursor-default rounded-full border border-accent-purple/30 bg-accent-purple/10 px-6 py-2.5 text-sm font-medium text-accent-purple transition-all hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-blue hover:text-white"
            >
              {quality}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
