import { FaArrowRight } from 'react-icons/fa'
import { projectsData } from '../data/projectsData'

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 bg-bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:text-xs">
            Featured Projects
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Some of My Recent Work
          </h2>
        </div>

        {/* Grille : 1 / 2 / 3 colonnes */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <article
              key={project.numero}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-bg-card transition-all duration-300 hover:scale-[1.03] hover:border-accent-purple/40 hover:shadow-2xl hover:shadow-accent-purple/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.titre}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-3 py-1 text-xs font-bold text-white">
                  {project.numero}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{project.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.lien}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-purple transition-all hover:gap-3"
                >
                  View Project <FaArrowRight />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Dots de pagination */}
        <div aria-hidden className="mt-10 flex justify-center gap-2">
          <span className="h-2 w-6 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  )
}
