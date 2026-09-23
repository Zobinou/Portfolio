import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-bg-primary/90 shadow-lg shadow-black/30 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNav('home')
          }}
          className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-white"
          aria-label="NiriDev - retour à l'accueil"
        >
          <span className="text-accent-purple">&lt;/&gt;</span>
          <span>NiriDev</span>
        </a>

        {/* Desktop nav (centered) */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => handleNav(link.target)}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Hire Me */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNav('contact')
            }}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-purple/30 transition-all hover:-translate-y-0.5 hover:shadow-accent-purple/50 md:inline-flex"
          >
            Hire Me <span aria-hidden>&#8599;</span>
          </a>

          {/* Burger */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-xl text-white transition-colors hover:border-accent-purple/50 hover:text-accent-purple md:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-bg-primary/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-6 pb-6">
          {navLinks.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => handleNav(link.target)}
                className="w-full rounded-lg px-3 py-3 text-left text-base font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-accent-purple"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('contact')
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-purple/30"
            >
              Hire Me <span aria-hidden>&#8599;</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
