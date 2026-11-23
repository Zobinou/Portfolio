'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Accueil', href: '/home' },
  { label: 'À propos', href: '/about' },
  { label: 'Compétences', href: '/skills' },
  { label: 'Projets', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

const subscribeToNothing = () => () => {}
const getMountedSnapshot = () => true
const getServerSnapshot = () => false

const subscribeToScroll = (callback: () => void) => {
  window.addEventListener('scroll', callback)
  return () => window.removeEventListener('scroll', callback)
}
const getScrollSnapshot = () => window.scrollY > 20

export default function Header() {
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getServerSnapshot)
  const mounted = useSyncExternalStore(subscribeToNothing, getMountedSnapshot, getServerSnapshot)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-bg-primary/80 shadow-lg shadow-black/5 backdrop-blur-md dark:shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-text-primary"
        >
          <span className="text-primary">&lt;/&gt;</span>
          <span>NiriDev</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Changer de thème"
              className="relative"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          )}

          <Link
            href="/#contact"
            className="hidden items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 md:inline-flex"
          >
            Me contacter ↗
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg-primary/95 backdrop-blur-md md:hidden">
          <ul className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-text-secondary hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
              >
                Me contacter ↗
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}