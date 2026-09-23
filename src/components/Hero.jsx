import { useState } from 'react'
import {
  FaReact,
  FaHtml5,
  FaCss3,
  FaJs,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaUserCircle,
  FaArrowRight,
  FaDownload,
} from 'react-icons/fa'
import profilePhoto from '../assets/images/profile/photo.jpg'
import cvPdf from '../assets/documents/CV-Niritsiafoy-Lantosoa.png'

const techIcons = [
  { Icon: FaReact, label: 'React' },
  { Icon: FaHtml5, label: 'HTML5' },
  { Icon: FaCss3, label: 'CSS3' },
  { Icon: FaJs, label: 'JavaScript' },
  { Icon: FaNodeJs, label: 'Node.js' },
  { Icon: FaGitAlt, label: 'Git' },
  { Icon: FaFigma, label: 'Figma' },
]

function goTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="home" className="isolate relative overflow-hidden bg-bg-primary pb-24 pt-32 md:pb-32 md:pt-40">
      {/* Décor radial */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-12 lg:px-8">
        {/* ===== Colonne gauche ===== */}
        <div className="text-center md:text-left">
          <span className="inline-flex items-center rounded-full border border-accent-purple/40 bg-accent-purple/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:text-xs">
            Frontend Developer
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
              Niritsiafoy
            </span>
          </h1>

          <h2 className="font-display mt-3 text-xl font-semibold text-gray-200 sm:text-2xl lg:text-3xl">
            I build things for the web.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
            Étudiante en L2 informatique, spécialisée en développement frontend, passionnée par la
            création d&apos;interfaces modernes et performantes avec React.js, à la recherche
            d&apos;une alternance.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
            <button
              onClick={() => goTo('projects')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-purple/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-purple/50"
            >
              View My Work <FaArrowRight />
            </button>
            <a
              href={cvPdf}
              download="CV-Niritsiafoy-Lantosoa.png"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-accent-purple hover:text-accent-purple"
            >
              <FaDownload /> Download CV
            </a>
          </div>

          {/* Icônes technos */}
          <div className="mt-10 flex items-center justify-center gap-5 md:justify-start">
            {techIcons.map(({ Icon, label }) => (
              <span
                key={label}
                title={label}
                className="text-2xl text-gray-400 transition-all hover:scale-110 hover:text-accent-purple"
              >
                <Icon />
              </span>
            ))}
          </div>
        </div>

        {/* ===== Colonne droite : photo ===== */}
        <div className="relative isolate flex justify-center md:justify-end">
          {/* Points décoratifs */}
          <div aria-hidden className="absolute -top-6 -right-2 grid grid-cols-3 gap-2 md:right-6">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-accent-purple/60" />
            ))}
          </div>

          {/* Halo */}.
          
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-gradient-to-br from-accent-purple to-accent-blue opacity-60 blur-[80px] md:h-[480px] md:w-[480px]"
          />

          {/* Anneau lumineux + photo */}
          <div
            className="relative h-[260px] w-[260px] animate-float rounded-full p-[3px] md:h-[380px] md:w-[380px]"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
              boxShadow:
                '0 0 40px rgba(124, 58, 237, 0.45), 0 0 120px rgba(79, 70, 229, 0.25)',
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full bg-[#1e2337]">
              {imgError ? (
                <div className="flex h-full w-full items-center justify-center">
                  <FaUserCircle className="h-32 w-32 text-gray-600 md:h-44 md:w-44" />
                </div>
              ) : (
                <img
                  src={profilePhoto}
                  alt="Niritsiafoy Lantosoa"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Encart flottant façon code */}
          <div className="relative mx-auto mt-6 w-full max-w-[320px] md:absolute md:right-0 md:bottom-0 md:mt-0">
            <div className="rounded-xl border border-white/10 bg-bg-card p-4 shadow-xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span aria-hidden className="ml-auto h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />
              </div>
              <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-gray-300 sm:text-xs">
                <code>
                  <span className="text-accent-purple">const</span> <span className="text-sky-400">dev</span> = {'{'}
                  {'\n'}
                  {'  '}
                  <span className="text-sky-400">name</span>: <span className="text-green-400">&apos;Niritsiafoy&apos;</span>,{'\n'}
                  {'  '}
                  <span className="text-sky-400">skills</span>: [<span className="text-green-400">&apos;React&apos;</span>,{' '}
                  <span className="text-green-400">&apos;JS&apos;</span>, <span className="text-green-400">&apos;CSS&apos;</span>],{'\n'}
                  {'  '}
                  <span className="text-sky-400">passion</span>: <span className="text-green-400">&apos;Building UI&apos;</span>{'\n'}
                  {'}'};
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
